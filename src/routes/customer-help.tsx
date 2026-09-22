import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/customer-help")({
  component: () => <Outlet />,
});
