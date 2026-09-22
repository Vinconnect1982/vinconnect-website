import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/circl-starlink-installations")({
  component: () => <Outlet />,
});
