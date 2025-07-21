import { createFileRoute, Outlet } from "@tanstack/react-router";

function PublicLayout() {
  return (
    <main
      className="flex h-full w-full flex-col"
      role="main"
      aria-label="Main content area"
    >
      <Outlet />
    </main>
  );
}

export const Route = createFileRoute("/(public)/_public")({
  component: PublicLayout,
  errorComponent: ({ error }) => (
    <div role="alert" className="p-4">
      <h1>Error</h1>
      <pre>{error.message}</pre>
    </div>
  ),
});
