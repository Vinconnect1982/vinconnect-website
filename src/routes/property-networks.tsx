import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/property-networks")({
  component: () => <Outlet />,
});
