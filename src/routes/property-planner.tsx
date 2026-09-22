import { createFileRoute } from "@tanstack/react-router";
import { PropertyPlanner } from "@/components/property-planner";
import { SiteShell } from "@/components/site-shell";

type PlannerSearch = {
  q?: string;
  lat?: number;
  lng?: number;
};

export const Route = createFileRoute("/property-planner")({
  validateSearch: (raw: Record<string, unknown>): PlannerSearch => ({
    q: typeof raw.q === "string" ? raw.q : undefined,
    lat: raw.lat === undefined || raw.lat === "" ? undefined : Number(raw.lat),
    lng: raw.lng === undefined || raw.lng === "" ? undefined : Number(raw.lng),
  }),
  component: PlannerPage,
  head: () => ({
    meta: [{ title: "Interactive Rural Property Network Planner | VINCONNECT" }],
  }),
});

function PlannerPage() {
  const search = Route.useSearch();
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <p className="kicker">Your property · Mud map</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
          Address in. House and boundary drawn.
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          A light watermark aerial with hairline house, roof and boundary traces. Drop places from
          the console, then send the plan through for a quote.
        </p>
        <div className="mt-8">
          <PropertyPlanner incoming={search} />
        </div>
      </div>
    </SiteShell>
  );
}
