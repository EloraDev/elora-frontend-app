import * as Sentry from "@sentry/react";
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
  Outlet,
  // createRouteMask
} from '@tanstack/react-router'

import { getQueryClient } from "./providers/query.provider";
import { routeTree } from './routeTree.gen'
import { useAuth } from "./providers/auth.provider";
// import { LoadingOverlay } from '@workspace/web-ui/components/loading-overlay';
// import { cn } from '@workspace/web-ui/lib/utils';

// import "@workspace/web-ui/globals.css";
import './index.css'
import { cn } from "./lib/utils";

export const queryClient = getQueryClient()

// const rescheduleBookingMask = createRouteMask({
//   routeTree,
//   from: "/dashboard/weight-loss/appointments/reschedule-booking",
//   to: "/dashboard/weight-loss/appointments/reschedule-booking",
//   search: (prev) => ({ ...prev, step: undefined, appointment_id: undefined, date: undefined, slot: undefined }),
// });

// const appointmentBookingMask = createRouteMask({
//   routeTree,
//   from: "/dashboard/weight-loss/appointments/booking",
//   to: "/dashboard/weight-loss/appointments/booking",
//   search: (prev) => ({ ...prev, step: undefined, date: undefined, slot: undefined }),
// });

// const bookingMask = createRouteMask({
//   routeTree,
//   from: "/appointments",
//   to: "/appointments",
//   search: (prev) => ({ ...prev, step: undefined, date: undefined, slot: undefined }),
// });

// const dashboardOnboardingMask = createRouteMask({
//   routeTree,
//   from: "/dashboard/onboarding",
//   to: "/dashboard/onboarding",
//   search: (prev) => ({ ...prev, step: undefined, submit: undefined }),
// });

// const welcomeOnboardingMask = createRouteMask({
//   routeTree,
//   from: "/welcome",
//   to: "/welcome",
//   search: (prev) => ({ ...prev, step: undefined, submit: undefined }),
// });

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className="relative flex min-h-screen flex-1" role="main">
      {/* <LoadingOverlay
        isLoading={true}
        showLoader={true}
        variant="light"
        aria-busy={true}
      /> */}
      <div
        className={cn(
          "flex w-full transition-opacity duration-200",
          {
            "pointer-events-none select-none opacity-50": true,
          }
        )}
        aria-hidden={true}
      >
        <Outlet />
      </div>
    </div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!,
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  // routeMasks: [bookingMask, appointmentBookingMask, rescheduleBookingMask, dashboardOnboardingMask, welcomeOnboardingMask],
})

Sentry.init({
  dsn: "https://5ec8ab5712347f03df31a903741d4968@o4509269617868800.ingest.us.sentry.io/4509270986063872",
  integrations: [Sentry.tanstackRouterBrowserTracingIntegration(router)],
  tracesSampleRate: 1.0,
  sendDefaultPii: true
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <>
      <RouterProvider
        router={router}
        defaultPreload="intent"
        context={{
          auth: useAuth(),
        }}
      />
    </>
  )
}

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement, {
    // Callback called when an error is thrown and not caught by an ErrorBoundary.
    onUncaughtError: Sentry.reactErrorHandler((error, errorInfo) => {
      console.warn('Uncaught error', error, errorInfo.componentStack);
    }),
    // Callback called when React catches an error in an ErrorBoundary.
    onCaughtError: Sentry.reactErrorHandler(),
    // Callback called when React automatically recovers from errors.
    onRecoverableError: Sentry.reactErrorHandler(),
  })
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}