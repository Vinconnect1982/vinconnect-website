import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { EnquiryForm } from "@/components/enquiry-form";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { EVENT_LINK } from "@/lib/rural";

export const Route = createFileRoute("/event-link/")({
  component: EventLinkPage,
  head: () => ({
    meta: [
      { title: "Event Link | Rapid rural event Wi-Fi | VINCONNECT" },
      {
        name: "description",
        content:
          "VINCONNECT Event Link is a 2026–27 pilot: rapidly deployable Starlink and managed Wi-Fi for agricultural shows, field days, clubs and rural community events.",
      },
    ],
  }),
});

function EventLinkPage() {
  return (
    <SiteShell>
      <div className="relative overflow-hidden">
        <img src={EVENT_LINK.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="kicker">{EVENT_LINK.kicker}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl sm:text-6xl">{EVENT_LINK.name}.</h1>
          <p className="mt-5 max-w-2xl text-lg text-fg/85">{EVENT_LINK.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/event-link/organisers">For organisers</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <AppLink to="/event-link/mini">Event Link Mini</AppLink>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/resources/downloads/$slug" params={{ slug: "event-link-onepager" }}>One-pager PDF</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="rounded-xl border border-line bg-surface p-5 text-sm text-muted">{EVENT_LINK.status}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <section>
            <h2 className="font-display text-2xl">What stands up in the paddock</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {EVENT_LINK.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-2xl">Where it is used</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {EVENT_LINK.useCases.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl">What it is not</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {EVENT_LINK.not.map((i) => (
              <li key={i} className="rounded-xl border border-line bg-surface p-4 text-sm text-muted">
                {i}
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-muted">
          Event Link sits inside{" "}
          <Link to="/rural-connections" className="text-mint">
            Rural Connections
          </Link>
          . The public Wi-Fi at a hub does not require a marketing opt-in. If you want Starlink or
          cameras at home instead, use the{" "}
          <Link to="/estimate" className="text-mint">
            estimator
          </Link>
          . Related:{" "}
          <AppLink to="/event-link/mini" className="text-mint">
            Mini
          </AppLink>
          ,{" "}
          <AppLink to="/event-link/platform" className="text-mint">
            platform concept
          </AppLink>
          ,{" "}
          <AppLink to="/event-link/community-events" className="text-mint">
            community events
          </AppLink>
          ,{" "}
          <AppLink to="/event-link/what-is-included" className="text-mint">
            what is included
          </AppLink>
          .
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <h2 className="font-display text-2xl">Register interest for 2026–27.</h2>
            <p className="mt-3 text-muted">
              Tell us the event, the dates, and whether you need Wi-Fi for the public, the committee, or both. There is no set price list yet.
            </p>
          </div>
          <EnquiryForm type="event-link" selectedPackage="Event Link pilot" buttonLabel="Request Event Connectivity" />
        </div>
      </div>
    </SiteShell>
  );
}
