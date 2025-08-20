import './index.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from '../routeTree.gen'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from './data/auth-config'
import { persistor, store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
// import './lib/sentry'

import * as Sentry from "@sentry/react";




// Create a new router instance
const router = createRouter({ routeTree })
const msalInstance = new PublicClientApplication(msalConfig)

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}


Sentry.init({
  debug: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration(),
    Sentry.tanstackRouterBrowserTracingIntegration(router)
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  dsn: "https://f545fda2a92235eee127583550c5ffb2@o4509850866679808.ingest.us.sentry.io/4509878159605760",
  sendDefaultPii: true
});


// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MsalProvider instance={msalInstance}>
                        <RouterProvider router={router} />
                    </MsalProvider>
                </PersistGate>
            </Provider>
        </StrictMode>
    )
}
