import * as Sentry from "@sentry/react";

Sentry.init({
  debug: true,
  enabled: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  dsn: "https://f545fda2a92235eee127583550c5ffb2@o4509850866679808.ingest.us.sentry.io/4509878159605760",
  sendDefaultPii: true
});