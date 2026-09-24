import { createFileRoute } from "@tanstack/react-router";
import { EstimateWizard } from "@/components/estimate-wizard";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/estimate")({
  component: EstimatePage,
  head: () => ({
    meta: [{ title: "Check Your Starlink Installation Price | VINCONNECT" }],
  }),
});

function EstimatePage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">VINCONNECT · Connecting Victoria</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
          Check my install price.
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          A Starlink installation quote for the address. Standard labour is $300, then travel and any
          extras you add. Commercial properties are quoted personally. Payment is due on the day.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.16em] text-muted">
          <li>ACMA Registered Open Cabler</li>
          <li>Local Victorian installer</li>
          <li>Clean cable runs</li>
          <li>Professional site review</li>
        </ul>
        <div className="mt-10">
          <EstimateWizard />
        </div>
        <div className="note mt-8 text-sm">
          <p className="font-display text-fg">What happens next?</p>
          <p className="mt-2">
            The quote lists the standard install and the extras you select. The Starlink kit and
            monthly plan are separate. Payment is due on the day of installation. Photos help us
            confirm access, the mount and the cable route before the day is booked.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
