package highlight

import (
	"context"
	"fmt"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace"
	"go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"
	"go.opentelemetry.io/otel/sdk/resource"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.17.0"
	"go.opentelemetry.io/otel/trace"
	"strings"
)

const OTLPDefaultEndpoint = "https://otel.highlight.io:4318"
const ProjectIDAttribute = "highlight_project_id"
const SessionIDAttribute = "highlight_session_id"
const RequestIDAttribute = "highlight_trace_id"

type OTLP struct {
	tracerProvider *sdktrace.TracerProvider
}

var (
	tracer = otel.GetTracerProvider().Tracer(
		"github.com/highlight",
		trace.WithInstrumentationVersion("v0.1.0"),
		trace.WithSchemaURL(semconv.SchemaURL),
	)
)

func StartOTLP() (*OTLP, error) {
	var options []otlptracehttp.Option
	if strings.HasPrefix(otlpEndpoint, "http://") {
		options = append(options, otlptracehttp.WithEndpoint(otlpEndpoint[7:]), otlptracehttp.WithInsecure())
	} else if strings.HasPrefix(otlpEndpoint, "https://") {
		options = append(options, otlptracehttp.WithEndpoint(otlpEndpoint[8:]))
	} else {
		logger.Errorf("an invalid otlp endpoint was configured %s", otlpEndpoint)
	}
	client := otlptracehttp.NewClient(options...)
	exporter, err := otlptrace.New(context.Background(), client)
	if err != nil {
		return nil, fmt.Errorf("creating OTLP trace exporter: %w", err)
	}
	resources, err := resource.New(context.Background(),
		resource.WithFromEnv(),
		resource.WithProcess(),
	)
	if err != nil {
		return nil, fmt.Errorf("creating OTLP resource context: %w", err)
	}
	h := &OTLP{
		tracerProvider: sdktrace.NewTracerProvider(
			sdktrace.WithSampler(sdktrace.AlwaysSample()),
			sdktrace.WithBatcher(exporter),
			sdktrace.WithResource(resources),
		),
	}
	otel.SetTracerProvider(h.tracerProvider)
	return h, nil
}

func (o *OTLP) shutdown() {
	err := o.tracerProvider.Shutdown(context.Background())
	if err != nil {
		logger.Error(err)
	}
}

func StartTrace(ctx context.Context, name string, tags ...attribute.KeyValue) (trace.Span, context.Context) {
	sessionID, requestID, _ := validateRequest(ctx)
	ctx, span := tracer.Start(ctx, name)
	attrs := []attribute.KeyValue{
		attribute.String(ProjectIDAttribute, projectID),
		attribute.String(SessionIDAttribute, sessionID),
		attribute.String(RequestIDAttribute, requestID),
	}
	attrs = append(attrs, tags...)
	span.SetAttributes(attrs...)
	return span, ctx
}

// RecordError processes `err` to be recorded as a part of the session or network request.
// Highlight session and trace are inferred from the context.
// If no sessionID is set, then the error is associated with the project without a session context.
func RecordError(ctx context.Context, err error, tags ...attribute.KeyValue) context.Context {
	span, ctx := StartTrace(ctx, "highlight-ctx", tags...)
	defer span.End(trace.WithStackTrace(true))
	span.RecordError(err, trace.WithStackTrace(true))
	return ctx
}
