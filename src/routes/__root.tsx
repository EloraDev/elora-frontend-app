// import { getQueryClient, QueryProviders } from "~/providers/query.provider";
// import { AuthProvider } from "~/providers/auth.provider";
// import { TooltipProvider } from "@workspace/web-ui/components/tooltip";
// import { Toaster } from "@workspace/web-ui/components/sonner";
// import { NotFound } from "~/components/not-found";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import {
  QueryProviders,
  type getQueryClient,
} from "../providers/query.provider";
import type { AuthContextType } from "../providers/auth.provider";
import { Toaster } from "sonner";
import { NotFound } from "../components/not-found";
// import { SidebarProvider } from "@workspace/web-ui/components/sidebar";
// import { AuthContextType } from '~/providers/auth.provider'

interface RouterContext {
  auth: AuthContextType | null;
  queryClient: ReturnType<typeof getQueryClient>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  errorComponent: ({ error }: { error: Error }) => (
    <div role="alert" className="p-4">
      <h1>Error</h1>
      <pre>{error.message}</pre>
    </div>
  ),
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <main
      className="flex min-h-screen flex-col w-full"
      role="main"
      aria-label="Main application layout"
    >
      <QueryProviders>
        {/* <TooltipProvider delayDuration={200}> */}
        {/* <AuthProvider> */}
        {/* <SidebarProvider> */}
        <Outlet />
        <Toaster position="top-right" />
        {/* </SidebarProvider> */}
        {/* </AuthProvider> */}
        {/* </TooltipProvider> */}
      </QueryProviders>
    </main>
  );
}
