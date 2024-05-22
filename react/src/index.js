import { createInstance, MatomoProvider } from "@datapunt/matomo-tracker-react";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {
  REACT_APP_COMPLETE_DOMAIN,
  REACT_APP_MATOMO_ID,
  SENTRY_DSN,
} from "configuration";
import "nprogress/nprogress.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/CookieContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import store from "./store";
import * as Sentry from "@sentry/react";

let environment = undefined;
let tracePropagationTargets = [];
if (REACT_APP_COMPLETE_DOMAIN.includes("localhost")) {
  environment = "local";
  tracePropagationTargets = [
    "localhost",
    "http://localhost/auth",
    "http://localhost/coproduction",
    "me.greengage-project.eu",
  ];
}
if (REACT_APP_COMPLETE_DOMAIN.includes("demo")) {
  tracePropagationTargets = [
    "demo.greengage-project.eu",
    "https://demo.greengage-project.eu/auth",
    "https://demo.greengage-project.eu/coproduction",
    "me.greengage-project.eu",
  ];
  environment = "demo";
}

if (environment && SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN || "",
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets,
      }),
      new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

const instance = createInstance({
  urlBase: `${REACT_APP_COMPLETE_DOMAIN}/matomo/`,
  siteId: REACT_APP_MATOMO_ID,
  linkTracking: false,
});

ReactDOM.render(
  <StrictMode>
    <MatomoProvider value={instance}>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <StyledEngineProvider injectFirst>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SettingsProvider>
                <BrowserRouter>
                  <AuthProvider>
                    <App />
                  </AuthProvider>
                </BrowserRouter>
              </SettingsProvider>
            </LocalizationProvider>
          </StyledEngineProvider>
        </ReduxProvider>
      </HelmetProvider>
    </MatomoProvider>
  </StrictMode>,
  document.getElementById("root")
);
