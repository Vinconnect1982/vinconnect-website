import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { EnquiryForm } from "@/components/enquiry-form";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { GRANT_NOTES, RURAL_PILLARS } from "@/lib/rural";

export const Route = createFileRoute("/rural-connections/")({
  component: RuralHub,
  head: () => ({
    meta: [
      { title: "Rural Connections | Community connectivity | VINCONNECT" },
      {
        name: "description",
        content:
          "VINCONNECT Rural Connections: travelling hubs at Victorian shows, a free online info resource, and practical advocacy for rural internet. Public benefit first.",
      },
    ],
  }),
});

function RuralHub() {
  return (
    <SiteShell>
      <div className="relative overflow-hidden">
        <img src="/scenes-new/rural-event.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="kicker">Rural Connections Initiative · Victoria 2026–27</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl sm:text-6xl">
            Connection is more than internet.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-fg/85">
            A practical community program: meet people at shows, keep useful information online, and
            take recurring rural connectivity barriers to people who can change them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/rural-connections/$slug" params={{ slug: "roadshow" }}>The travelling hub</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <AppLink to="/rural-connections/visiting-the-hub">Visiting the hub</AppLink>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/event-link">Event Link pilot</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="kicker">One program. Three ways to help.</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl">Meet locally. Keep learning online. Share the gaps.</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {RURAL_PILLARS.map((p) => (
            <Link
              key={p.slug}
              to="/rural-connections/$slug"
              params={{ slug: p.slug }}
              className="overflow-hidden rounded-xl border border-line bg-surface hover:border-mint"
            >
              <img src={p.image} alt="" className="h-44 w-full object-cover" />
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-mint">{p.kicker}</p>
                <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.lede}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl">Public benefit first.</h2>
            <p className="mt-3 text-muted">
              Core information stays freely accessible without marketing consent. Commercial
              enquiries are separate and voluntary. External resources link to recognised
              government, health and community services.
            </p>
            <p className="mt-3 text-muted">
              This is not a grant application and not a claim of funding eligibility. It is the
              public face of a discussion VINCONNECT is having with councils, event organisers and
              community partners.
            </p>
            <p className="mt-4 text-sm">
              <Link to="/resources/downloads/$slug" params={{ slug: "rural-connections-brief" }} className="text-mint">
                Download the Rural Connections brief →
              </Link>
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl">Pathways we are testing</h2>
            <p className="mt-2 text-sm text-muted">
              Alignment notes only — not eligibility, not an application service, and not why the
              Roadshow exists. The public story is people and community.
            </p>
            <ul className="mt-4 space-y-4">
              {GRANT_NOTES.map((g) => (
                <li key={g.title} className="rounded-xl border border-line bg-surface p-4">
                  <p className="font-display text-lg">{g.title}</p>
                  <p className="mt-2 text-sm text-muted">{g.copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <h2 className="font-display text-2xl">Partner, host or just ask.</h2>
            <p className="mt-3 text-muted">
              Councils, show societies, Visitor Economy Partnerships, farmer-health groups and
              landholders — tell us who you are. If you need an install instead, use the estimator.
            </p>
          </div>
          <EnquiryForm
            selectedPackage="Rural Connections partnership"
            buttonLabel="Start a community conversation"
          />
        </div>
      </div>
    </SiteShell>
  );
}
