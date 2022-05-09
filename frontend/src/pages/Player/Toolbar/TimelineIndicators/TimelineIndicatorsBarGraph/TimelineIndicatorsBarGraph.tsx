import GoToButton from '@components/Button/GoToButton';
import SessionComment from '@components/Comment/SessionComment/SessionComment';
import Histogram from '@components/Histogram/Histogram';
import { EventsForTimeline } from '@pages/Player/PlayerHook/utils';
import usePlayerConfiguration from '@pages/Player/PlayerHook/utils/usePlayerConfiguration';
import {
    ParsedErrorObject,
    ParsedHighlightEvent,
    ParsedSessionComment,
    ParsedSessionInterval,
    useReplayerContext,
} from '@pages/Player/ReplayerContext';
import {
    getEventRenderDetails,
    getPlayerEventIcon,
} from '@pages/Player/StreamElement/StreamElement';
import StreamElementPayload from '@pages/Player/StreamElement/StreamElementPayload';
import { DevToolTabType } from '@pages/Player/Toolbar/DevToolsContext/DevToolsContext';
import { useResourceOrErrorDetailPanel } from '@pages/Player/Toolbar/DevToolsWindow/ResourceOrErrorDetailPanel/ResourceOrErrorDetailPanel';
import { getTimelineEventDisplayName } from '@pages/Player/Toolbar/TimelineAnnotationsSettings/TimelineAnnotationsSettings';
import { getAnnotationColor } from '@pages/Player/Toolbar/Toolbar';
import { useToolbarItemsContext } from '@pages/Player/Toolbar/ToolbarItemsContext/ToolbarItemsContext';
import { useParams } from '@util/react-router/useParams';
import { playerTimeToSessionAbsoluteTime } from '@util/session/utils';
import { MillisToMinutesAndSeconds } from '@util/time';
import React, { useEffect } from 'react';

import timelineAnnotationStyles from '../../TimelineAnnotation/TimelineAnnotation.module.scss';
import { TimelineAnnotationColors } from '../../Toolbar';
import styles from '../../Toolbar.module.scss';

interface Props {
    sessionIntervals: ParsedSessionInterval[];
    selectedTimelineAnnotationTypes: string[];
}

const TimelineIndicatorsBarGraph = React.memo(
    ({ sessionIntervals, selectedTimelineAnnotationTypes }: Props) => {
        const {
            zoomAreaLeft,
            setZoomAreaLeft,
            zoomAreaRight,
            setZoomAreaRight,
        } = useToolbarItemsContext();
        const {
            showPlayerAbsoluteTime,
            setShowDevTools,
            setSelectedDevToolsTab,
        } = usePlayerConfiguration();
        const { sessionMetadata } = useReplayerContext();
        const { setErrorPanel } = useResourceOrErrorDetailPanel();
        const { session_secure_id } = useParams<{
            session_secure_id: string;
        }>();

        useEffect(() => {
            setZoomAreaLeft(0);
            setZoomAreaRight(100);
        }, [session_secure_id, setZoomAreaLeft, setZoomAreaRight]);

        if (sessionIntervals.length === 0) {
            return null;
        }

        const numberOfBars = 50;
        const percentPerBar = 1 / numberOfBars;

        const startTime = sessionIntervals[0].startTime;
        const endTime = sessionIntervals[sessionIntervals.length - 1].endTime;

        const combined = sessionIntervals.reduce(
            (acc, interval) => {
                return {
                    ...acc,
                    errors: [
                        ...acc.errors,
                        ...interval.errors.map((e) => ({
                            ...e,
                            relativeIntervalPercentage:
                                interval.startPercent * 100 +
                                (interval.endPercent - interval.startPercent) *
                                    (e.relativeIntervalPercentage ?? 0),
                        })),
                    ],
                    sessionEvents: [
                        ...acc.sessionEvents,
                        ...interval.sessionEvents.map((e) => ({
                            ...e,
                            relativeIntervalPercentage:
                                interval.startPercent * 100 +
                                (interval.endPercent - interval.startPercent) *
                                    (e.relativeIntervalPercentage ?? 0),
                        })),
                    ],
                    comments: [
                        ...acc.comments,
                        ...interval.comments.map((e) => ({
                            ...e,
                            relativeIntervalPercentage:
                                interval.startPercent * 100 +
                                (interval.endPercent - interval.startPercent) *
                                    (e.relativeIntervalPercentage ?? 0),
                        })),
                    ],
                };
            },
            {
                startTime,
                endTime,
                duration: endTime - startTime,
                active: true,
                startPercent: 0,
                endPercent: 1,
                errors: [],
                sessionEvents: [],
                comments: [],
            }
        );

        // If a left and right zoom areas are defined, filter the events
        // and map to a new relativeIntervalPercentage (since the window size has shrunk)
        if (zoomAreaLeft !== undefined && zoomAreaRight !== undefined) {
            const filterAndMap = <
                T extends { relativeIntervalPercentage?: number }
            >(
                events: T[]
            ): T[] =>
                events
                    .filter(
                        (e) =>
                            e.relativeIntervalPercentage !== undefined &&
                            e.relativeIntervalPercentage >= zoomAreaLeft &&
                            e.relativeIntervalPercentage <= zoomAreaRight
                    )
                    .map((e) => ({
                        ...e,
                        relativeIntervalPercentage:
                            ((e.relativeIntervalPercentage! - zoomAreaLeft) /
                                (zoomAreaRight - zoomAreaLeft)) *
                            100,
                    }));

            combined.errors = filterAndMap(combined.errors);
            combined.sessionEvents = filterAndMap(combined.sessionEvents);
            combined.comments = filterAndMap(combined.comments);
        }

        const getTimeFromPercent = (percent: number): number | undefined => {
            for (const interval of sessionIntervals) {
                if (
                    interval.startPercent * 100 <= percent &&
                    interval.endPercent * 100 >= percent
                ) {
                    const globalPctInInterval =
                        percent - interval.startPercent * 100;
                    const intervalOffset =
                        globalPctInInterval /
                        (interval.endPercent - interval.startPercent) /
                        100;
                    const timeOffset =
                        (interval.endTime - interval.startTime) *
                        intervalOffset;
                    return interval.startTime + timeOffset;
                }
            }
        };

        // const zoomTimeLeft = getTimeFromPercent(zoomAreaLeft ?? 0);
        // const zoomTimeRight = getTimeFromPercent(zoomAreaRight ?? 0);

        const chartData = getEventsInTimeBucket(
            combined,
            selectedTimelineAnnotationTypes,
            percentPerBar
        );

        const series = EventsForTimeline.map((eventType) => ({
            label: eventType,
            color: getAnnotationColor(eventType),
            counts: new Array<number>(),
        }));

        for (const d of chartData) {
            for (const s of series) {
                s.counts.push(d[s.label] || 0);
            }
        }

        const scale = (zoomAreaRight ?? 100) - (zoomAreaLeft ?? 0);
        const bucketTimes = [];
        for (let i = 0; i <= numberOfBars; i++) {
            const p = i * percentPerBar * scale + (zoomAreaLeft ?? 0);
            bucketTimes.push(getTimeFromPercent(p) ?? 0);
        }

        const displayEvent = (e: ParsedHighlightEvent) => {
            const details = getEventRenderDetails(e);
            const Icon = getPlayerEventIcon(
                details.title || '',
                details.payload
            );
            return (
                <>
                    <span className={timelineAnnotationStyles.title}>
                        <span
                            className={timelineAnnotationStyles.iconContainer}
                            style={{
                                background: `var(${
                                    // @ts-ignore
                                    TimelineAnnotationColors[details.title]
                                })`,
                            }}
                        >
                            {Icon}
                        </span>
                        {getTimelineEventDisplayName(details.title || '')}
                    </span>
                    <div key={e.timestamp} className={styles.popoverContent}>
                        <StreamElementPayload
                            payload={
                                typeof details.payload === 'object'
                                    ? JSON.stringify(details.payload)
                                    : typeof details.payload === 'boolean' &&
                                      details.title?.includes('Tab')
                                    ? details.payload
                                        ? 'The user switched away from this tab.'
                                        : 'The user is currently active on this tab.'
                                    : details.payload
                            }
                        />
                    </div>
                </>
            );
        };

        const displayError = (e: ParsedErrorObject) => {
            return (
                <div className={styles.popoverContent}>
                    {e.source}
                    <div className={styles.buttonContainer}>
                        <GoToButton
                            onClick={() => {
                                setShowDevTools(true);
                                setSelectedDevToolsTab(DevToolTabType.Errors);
                                setErrorPanel(e);
                            }}
                            label="More info"
                        />
                    </div>
                </div>
            );
        };

        const displayComment = (c: ParsedSessionComment) => {
            return (
                <div className={styles.popoverContent}>
                    <SessionComment comment={c} />
                </div>
            );
        };

        const displayAggregate = (count: number, eventType: string) => {
            const Icon = getPlayerEventIcon(eventType);
            return (
                <>
                    <div className={timelineAnnotationStyles.title}>
                        <span
                            className={timelineAnnotationStyles.iconContainer}
                            style={{
                                background: `var(${
                                    // @ts-ignore
                                    TimelineAnnotationColors[eventType]
                                })`,
                            }}
                        >
                            {Icon}
                        </span>
                        {getTimelineEventDisplayName(eventType || '')} x {count}
                    </div>
                </>
            );
        };

        const tooltipContent = (bucketIndex: number | undefined) => {
            if (bucketIndex === undefined) {
                return;
            }
            const bucket = chartData[bucketIndex];
            const labels = [];
            for (const e of EventsForTimeline) {
                const count = bucket[e];
                if (count > 0) {
                    if (count > 2) {
                        labels.push(displayAggregate(count, e));
                    } else {
                        if (e === 'Errors') {
                            labels.push(bucket.errors.map(displayError));
                        } else if (e === 'Comments') {
                            labels.push(bucket.comments.map(displayComment));
                        } else {
                            labels.push(bucket.events.map(displayEvent));
                        }
                    }
                }
            }
            return labels;
        };

        const timeFormatter = (t: number) =>
            showPlayerAbsoluteTime
                ? playerTimeToSessionAbsoluteTime({
                      sessionStartTime: sessionMetadata.startTime,
                      relativeTime: t,
                  }).toString()
                : MillisToMinutesAndSeconds(t);

        return (
            <Histogram
                startTime={combined.startTime}
                endTime={combined.endTime}
                onAreaChanged={(left, right) => {
                    setZoomAreaLeft(
                        ((zoomAreaRight ?? 100) - (zoomAreaLeft ?? 0)) *
                            left *
                            percentPerBar +
                            (zoomAreaLeft ?? 0)
                    );
                    setZoomAreaRight(
                        ((zoomAreaRight ?? 100) - (zoomAreaLeft ?? 0)) *
                            (right * percentPerBar + percentPerBar) +
                            (zoomAreaLeft ?? 0)
                    );
                }}
                seriesList={series}
                timeFormatter={timeFormatter}
                bucketTimes={bucketTimes}
                tooltipContent={tooltipContent}
            />
        );
    }
);

export default TimelineIndicatorsBarGraph;

const getBucketKey = (
    event: { relativeIntervalPercentage?: number },
    numberOfBuckets: number
) => {
    let bucketKey = Math.floor(
        ((event.relativeIntervalPercentage ?? 0) * numberOfBuckets) / 100
    );
    if (bucketKey >= numberOfBuckets) {
        bucketKey = numberOfBuckets - 1;
    }
    if (bucketKey < 0) {
        bucketKey = 0;
    }
    return bucketKey;
};

const getEventsInTimeBucket = (
    interval: ParsedSessionInterval,
    selectedTimelineAnnotationTypes: string[],
    percentPerBar: number
) => {
    const numberOfBuckets = Math.round(
        (interval.endPercent - interval.startPercent) / percentPerBar
    );
    const data: { [key: string]: any } = {};

    for (let i = 0; i < numberOfBuckets; i++) {
        data[i.toString()] = { events: [], errors: [], comments: [] };
    }

    interval.sessionEvents.forEach((event) => {
        if (event.type === 5 && event.relativeIntervalPercentage) {
            const eventType = event.data.tag;

            if (!selectedTimelineAnnotationTypes.includes(eventType)) {
                return;
            }

            const bucketKey = getBucketKey(event, numberOfBuckets);

            if (!(eventType in data[bucketKey])) {
                data[bucketKey][eventType] = 1;
            } else {
                data[bucketKey][eventType]++;
            }
            data[bucketKey].events.push(event);
        }
    });

    if (selectedTimelineAnnotationTypes.includes('Errors')) {
        interval.errors.forEach((error) => {
            if (error.relativeIntervalPercentage === undefined) {
                return;
            }

            const bucketKey = getBucketKey(error, numberOfBuckets);

            if (!('Errors' in data[bucketKey])) {
                data[bucketKey]['Errors'] = 1;
            } else {
                data[bucketKey]['Errors']++;
            }
            data[bucketKey].errors.push(error);
        });
    }

    if (selectedTimelineAnnotationTypes.includes('Comments')) {
        interval.comments.forEach((comment) => {
            if (comment.relativeIntervalPercentage === undefined) {
                return;
            }

            const bucketKey = getBucketKey(comment, numberOfBuckets);

            if (!('Comments' in data[bucketKey])) {
                data[bucketKey]['Comments'] = 1;
            } else {
                data[bucketKey]['Comments']++;
            }
            data[bucketKey].comments.push(comment);
        });
    }

    const res = Object.keys(data).map((key) => ({
        ...data[key],
    }));

    return res;
};
