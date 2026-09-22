import { createFileRoute, Link } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/enquiry-form";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { PHONE, PHONE_TEL, PROJECTS } from "@/lib/content";
import { REGIONS } from "@/lib/areas";

export const Route = createFileRoute("/about/capability")({
  component: CapabilityPage,
  head: () => ({
    meta: [
      { title: "Capability statement | VINCONNECT" },
      {
        name: "description",
        content:
          "VINCONNECT capability statement: ACMA Open Cabler, heights, White Card, insurance. Starlink, Omada wireless, HiLook CCTV across South East Victoria.",
      },
    ],
  }),
});

function CapabilityPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">About VINCONNECT</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Capability statement.</h1>
        <p className="mt-4 text-lg text-muted">
          Family-run installation business based in Cranbourne. One point of contact. Work scoped
          around the property, not a catalogue kit.
        </p>
        <Button asChild className="mt-6">
          <Link to="/resources/downloads/$slug" params={{ slug: "capability-statement" }}>Download the PDF</Link>
        </Button>

        <section className="mt-12">
          <h2 className="font-display text-2xl">What we install</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            <li>Starlink Standard, Mini and touring installations (labour; hardware on your account)</li>
            <li>Whole-property Wi-Fi and TP-Link Omada point-to-point links</li>
            <li>HiLook CCTV packages, stable and solar/gate cameras</li>
            <li>Cabinets, labelling, UPS planning and handover</li>
            <li>Event Link — rapidly deployable Starlink/Wi-Fi for rural events (pilot)</li>
          </ul>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl">Credentials</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            <li>ACMA Registered Open Cabler</li>
            <li>Working at Heights</li>
            <li>White Card</li>
            <li>Public Liability and WorkCover</li>
          </ul>
          <p className="mt-3 text-sm">
            <Link to="/about/safety-and-credentials" className="text-mint">
              Safety & credentials →
            </Link>
          </p>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl">Where we work</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {REGIONS.map((r) => (
              <li key={r.slug}>
                <Link to="/service-areas/region/$slug" params={{ slug: r.slug }} className="text-mint">
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl">How we quote</h2>
          <p className="mt-3 text-muted">
            Address-based estimator for a labour range, then photos or a property plan before a
            written total. Travel from Cranbourne is in the number. We do not sell Starlink
            subscriptions.
          </p>
        </section>
        <section className="mt-10">
          <h2 className="font-display text-2xl">Selected work</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {PROJECTS.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <Link to="/projects/$slug" params={{ slug: p.slug }} className="text-mint">
                  {p.title}
                </Link>{" "}
                <span className="text-muted">({p.place})</span>
              </li>
            ))}
          </ul>
        </section>
        <p className="mt-10 text-muted">
          Vince De Stefano · {PHONE} ·{" "}
          <a href={PHONE_TEL} className="text-mint">
            call
          </a>
        </p>
        <div className="mt-10 max-w-md">
          <EnquiryForm selectedPackage="Capability / procurement" buttonLabel="Request credentials pack" />
        </div>
      </div>
    </SiteShell>
  );
}
