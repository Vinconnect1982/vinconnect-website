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
          A quick, address-based estimate for Starlink installation, better Wi-Fi, building links,
          CCTV and data work. No travel calculations or technical guesswork.
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
        <div className="mt-8 rounded-lg border border-line bg-surface p-5 text-sm text-muted">
          <p className="font-display text-fg">What happens next?</p>
          <p className="mt-2">
            Your result is an indicative range based on the selected address and answers. Upload
            photos to help us confirm access, mounting and cable routes. VINCONNECT reviews the
            request before any work is booked.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
