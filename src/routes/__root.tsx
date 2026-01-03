import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import {
  QueryProviders,
  type getQueryClient,
} from "../providers/query.provider";
import { AuthProvider, type AuthContextType } from "../providers/auth.provider";
import { Toaster } from "sonner";
import { NotFound } from "../components/not-found";

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
      className="flex min-h-screen w-full flex-col"
      role="main"
      aria-label="Main application layout"
    >
      <QueryProviders>
        <AuthProvider>
          <Outlet />
          <Toaster position="top-right" />
        </AuthProvider>
      </QueryProviders>
    </main>
  );
}
