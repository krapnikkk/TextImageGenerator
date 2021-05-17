import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import  App  from "./components/App";

Sentry.init({
    dsn: "https://50514024100e407cb6ad85ba7b1af83a@o643154.ingest.sentry.io/5758024",
    integrations: [new Integrations.BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);