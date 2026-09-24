import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/enquiry-form";
import { AppLink } from "@/components/app-link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { areasInRegion, regionBySlug } from "@/lib/areas";
import { PROJECTS, SITE_URL } from "@/lib/content";
import { REGION_LINKS, REGION_STORIES } from "@/lib/region-stories";

export const Route = createFileRoute("/service-areas/region/$slug")({
  component: RegionPage,
  loader: ({ params }) => {
    const region = regionBySlug(params.slug);
    if (!region) throw notFound();
    const areas = areasInRegion(region.slug);
    const projects = PROJECTS.filter((p) => areas.some((a) => a.slug === p.areaSlug));
    return { region, areas, projects };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Starlink installation ${loaderData?.region.name ?? "Victoria"} | VINCONNECT`,
      },
      {
        name: "description",
        content: loaderData?.region.blurb,
      },
    ],
    links: loaderData
      ? [{ rel: "canonical", href: `${SITE_URL}/service-areas/region/${loaderData.region.slug}` }]
      : [],
  }),
});

function RegionPage() {
  const { region, areas, projects } = Route.useLoaderData();
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs items={[{ label: "Service areas", href: "/service-areas" }, { label: region.short }]} />
        <h1 className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl">{region.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{region.blurb}</p>
        <div className="mt-6 max-w-2xl space-y-4 text-muted">
          {(REGION_STORIES[region.slug] ?? []).map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/estimate">Check My Install Price</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/service-areas">All service areas</Link>
          </Button>
        </div>
        {(REGION_LINKS[region.slug] ?? []).length > 0 && (
          <div className="mt-8">
            <h2 className="font-display text-xl">Related</h2>
            <ul className="mt-3 flex flex-wrap gap-2 text-sm">
              {REGION_LINKS[region.slug].map((item) => (
                <li key={item.href}>
                  <AppLink to={item.href} className="inline-flex rounded-full border border-line px-3 py-2 hover:border-mint">
                    {item.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        <h2 className="mt-14 font-display text-2xl">Suburbs in {region.short}</h2>
        <p className="mt-5 max-w-3xl text-sm leading-7">
          {areas.map((a, i) => (
            <span key={a.slug}>
              {i > 0 && <span className="text-muted"> · </span>}
              <Link to="/service-areas/$slug" params={{ slug: a.slug }} className="text-fg hover:text-mint">
                {a.name}
              </Link>
            </span>
          ))}
        </p>
        {projects.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl">Projects in this region</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="group block overflow-hidden rounded-xl border border-line hover:border-mint"
                  >
                    <img src={p.image} alt="" className="h-40 w-full object-cover" />
                    <div className="p-4">
                      <p className="text-xs uppercase tracking-[0.16em] text-mint">{p.place}</p>
                      <h3 className="mt-1 font-display text-lg">{p.title}</h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-12 max-w-md">
          <EnquiryForm selectedPackage={`${region.name} enquiry`} buttonLabel="Ask about this region" />
        </div>
      </div>
    </SiteShell>
  );
}
