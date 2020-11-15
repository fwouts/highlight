import { addCustomEvent, record } from 'rrweb';
import { detect } from 'detect-browser';
import {
  InMemoryCache,
  gql,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { eventWithTime } from 'rrweb/typings/types';
import { ConsoleListener } from './listeners/console-listener';
import { PathListener } from './listeners/path-listener';
import { AjaxListener } from './listeners/ajax-listener';

import {
  ConsoleMessage,
  NetworkResourceContent,
} from '../../frontend/src/util/shared-types';

class Logger {
  debug: boolean;
  constructor(debug: boolean) {
    this.debug = debug;
  }
  log(...data: any[]) {
    if (this.debug) {
      console.log.apply(console, data);
    }
  }
}

export type HighlightClassOptions = {
  debug?: boolean;
  backendUrl?: string;
};

export class Highlight {
  organizationID: number;
  client: ApolloClient<NormalizedCacheObject>;
  events: eventWithTime[];
  messages: ConsoleMessage[];
  networkContents: NetworkResourceContent[];
  sessionID: number;
  ready: boolean;
  logger: Logger;
  backendUrl: string;

  constructor(options?: HighlightClassOptions) {
    // If debug is set to false, disable all console
    this.ready = false;
    this.logger = new Logger(options?.debug ?? false);
    this.backendUrl =
      (options?.backendUrl
        ? options.backendUrl
        : process.env.BACKEND_URI || 'https://api.highlight.run') + '/client';
    this.client = new ApolloClient({
      uri: this.backendUrl,
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
        },
      },
      credentials: 'include',
    });
    this.organizationID = 0;
    this.sessionID = 0;
    this.events = [];
    this.networkContents = [];
    this.messages = [];
  }

  async identify(user_identifier: string, user_object = {}) {
    await this.client.mutate({
      mutation: gql`
        mutation identifySession(
          $session_id: ID!
          $user_identifier: String!
          $user_object: Any
        ) {
          identifySession(
            session_id: $session_id
            user_identifier: $user_identifier
            user_object: $user_object
          )
        }
      `,
      variables: {
        session_id: this.sessionID,
        user_identifier: user_identifier,
        user_object: user_object,
      },
    });
    this.logger.log(
      `Identify (${user_identifier}) w/ obj: ${JSON.stringify(user_object)} @ ${
        process.env.BACKEND_URI
      }`
    );
  }

  async addProperties(properties_obj = {}) {
    await this.client.mutate({
      mutation: gql`
        mutation addProperties($session_id: ID!, $properties_object: Any) {
          addProperties(
            session_id: $session_id
            properties_object: $properties_object
          )
        }
      `,
      variables: {
        session_id: this.sessionID,
        properties_object: properties_obj,
      },
    });
    this.logger.log(
      `AddProperties to session (${this.sessionID}) w/ obj: ${JSON.stringify(
        properties_obj
      )} @ ${process.env.BACKEND_URI}`
    );
  }

  async initialize(organizationID: number) {
    const browser = detect();
    if (!organizationID) {
      console.error('empty organization_id!');
      return;
    }
    this.organizationID = organizationID;
    let response = await fetch(`https://geolocation-db.com/json/`);
    let data = await response.json();
    let details = JSON.stringify({ ...data, browser });
    let gr = await this.client.mutate({
      mutation: gql`
        mutation initializeSession($organization_id: ID!, $details: String!) {
          initializeSession(
            organization_id: $organization_id
            details: $details
          ) {
            id
            user_id
            organization_id
            details
          }
        }
      `,
      variables: {
        organization_id: this.organizationID,
        details: details,
      },
    });
    this.sessionID = gr.data.initializeSession.id;
    this.logger.log(
      `Loaded Highlight
Remote: ${process.env.BACKEND_URI}
Org: ${this.organizationID}
Session Data: 
`,
      gr.data
    );
    setInterval(() => {
      this._save();
    }, 5 * 1000);
    const emit = (event: eventWithTime) => {
      this.events.push(event);
    };
    emit.bind(this);
    record({
      recordCanvas: true,
      emit,
    });

    // TODO: probably get rid of this.
    const highlightThis = this;
    var send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function (data) {
      setTimeout(() => {
        var obj: any;
        try {
          obj = JSON.parse(data?.toString() ?? '');
        } catch (e) {
          return;
        }
        if (obj.type === 'track') {
          const properties: { [key: string]: string } = {};
          properties['segment-event'] = obj.event;
          highlightThis.logger.log(
            `Adding (${JSON.stringify(properties)}) @ ${
              process.env.BACKEND_URI
            }, org: ${highlightThis.organizationID}`
          );
          addCustomEvent<string>(
            'Segment',
            JSON.stringify({
              event: obj.event,
              properties: obj.properties,
            })
          );
          highlightThis.addProperties(properties);
        }
      }, 100);
      send.call(this, data);
    };
    if (document.referrer) {
      addCustomEvent<string>('Referrer', document.referrer);
      highlightThis.addProperties({ referrer: document.referrer });
    }
    PathListener((url: string) => {
      addCustomEvent<string>('Navigate', url);
      highlightThis.addProperties({ 'visited-url': url });
    });
    AjaxListener((content: NetworkResourceContent) => {
      const url = content.request?.url;
      // size of content in megabytes.
      if (!url?.includes(this.backendUrl)) {
        highlightThis.networkContents.push(content);
      }
    });
    ConsoleListener((c: ConsoleMessage) => highlightThis.messages.push(c));
    this.ready = true;
  }

  // Reset the events array and push to a backend.
  async _save() {
    if (!this.sessionID) {
      return;
    }
    const resources = performance
      .getEntriesByType('resource')
      .filter((r) => !r.name.includes(this.backendUrl));
    const resourcesString = JSON.stringify({ resources: resources });
    const messagesString = JSON.stringify({ messages: this.messages });
    const eventsString = JSON.stringify({ events: this.events });
    const resourceContentsString = JSON.stringify({
      resourceContents: this.networkContents,
    });
    this.logger.log(
      `Sending: ${this.events.length} events, ${this.messages.length} messages, ${resources.length} resources, ${this.networkContents.length} resources contents \nTo: ${process.env.BACKEND_URI}\nOrg: ${this.organizationID}`
    );
    this.events = [];
    this.messages = [];
    this.networkContents = [];
    performance.clearResourceTimings();
    await this.client.mutate({
      mutation: gql`
        mutation PushPayload(
          $session_id: ID!
          $events: String!
          $messages: String!
          $resources: String!
          $resourceContents: String!
        ) {
          pushPayload(
            session_id: $session_id
            events: $events
            messages: $messages
            resources: $resources
            resourceContents: $resourceContents
          )
        }
      `,
      variables: {
        session_id: this.sessionID,
        events: eventsString,
        messages: messagesString,
        resources: resourcesString,
        resourceContents: resourceContentsString,
      },
    });
  }
}

(window as any).Highlight = Highlight;

declare global {
  interface Console {
    defaultLog: any;
    defaultError: any;
    defaultWarn: any;
    defaultDebug: any;
  }
}
