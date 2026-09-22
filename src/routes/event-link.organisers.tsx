import { createFileRoute, Link } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/enquiry-form";
import { SiteShell } from "@/components/site-shell";
import { ROADSHOW_DATES } from "@/lib/rural";

export const Route = createFileRoute("/event-link/organisers")({
  component: OrganisersPage,
  head: () => ({
    meta: [
      { title: "Event Link for organisers | VINCONNECT" },
      {
        name: "description",
        content:
          "How show societies, clubs and field-day organisers trial VINCONNECT Event Link: site needs, power, insurance, and how community Wi-Fi stays separate from sales.",
      },
    ],
  }),
});

function OrganisersPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">
          <Link to="/event-link" className="hover:text-mint">
            Event Link
          </Link>
        </p>
        <h1 className="mt-3 font-display text-4xl">For organisers.</h1>
        <p className="mt-4 text-lg text-muted">
          A short brief for people who already run a show, trial, field day or club fixture and
          want a connectivity hub that does not embarrass the committee.
        </p>
        <ol className="mt-10 space-y-6">
          <li>
            <h2 className="font-display text-2xl">1. Tell us the site</h2>
            <p className="mt-2 text-muted">
              Dates, expected visitors, whether you need public seating Wi-Fi, a committee office,
              POS, cameras or FrogBox-style streaming. Photos of the proposed patch of ground help.
            </p>
          </li>
          <li>
            <h2 className="font-display text-2xl">2. Power and sky</h2>
            <p className="mt-2 text-muted">
              Event Link assumes a sky view for Starlink and a known power story — generator,
              pavilion outlet or battery. We will not pretend a 100-metre extension lead is a plan.
            </p>
          </li>
          <li>
            <h2 className="font-display text-2xl">3. Insurance and integrity</h2>
            <p className="mt-2 text-muted">
              Public liability sits with VINCONNECT for our kit and our people. Community Wi-Fi
              does not harvest marketing consent. Sales conversations happen only when someone asks.
            </p>
          </li>
          <li>
            <h2 className="font-display text-2xl">4. Indicative calendar</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {ROADSHOW_DATES.map((d) => (
                <li key={d.where}>
                  <span className="text-mint">{d.when}</span> — {d.where}
                </li>
              ))}
            </ul>
          </li>
        </ol>
        <div className="mt-12">
          <EnquiryForm selectedPackage="Event Link — organiser" buttonLabel="Request an organiser call" />
        </div>
      </div>
    </SiteShell>
  );
}
