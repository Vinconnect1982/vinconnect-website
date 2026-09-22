import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/event-link")({
  component: () => <Outlet />,
});
