import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CoverageMap } from "@/components/coverage-map";
import { EnquiryForm } from "@/components/enquiry-form";
import { RelatedLinks } from "@/components/related-links";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { areasInRegion, regionBySlug } from "@/lib/areas";
import { PROJECTS, SITE_URL } from "@/lib/content";
import { REGION_RELATED } from "@/lib/project-details";

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
  const related = REGION_RELATED[region.slug] ?? [
    { href: "/starlink", label: "Starlink guides" },
    { href: "/customer-help", label: "Customer help" },
    { href: "/estimate", label: "Check My Install Price" },
  ];
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs items={[{ label: "Work areas", href: "/service-areas" }, { label: region.short }]} />
        <h1 className="mt-6 max-w-3xl font-display text-4xl sm:text-5xl">{region.name}.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{region.blurb}</p>
        <img
          src={region.image}
          alt=""
          className="mt-8 h-64 w-full rounded-xl object-cover sm:h-80"
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/estimate">Check My Install Price</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/property-planner">Plan My Property</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/service-areas">All regions</Link>
          </Button>
        </div>
        <div className="mt-10">
          <CoverageMap focus={{ lat: region.lat, lng: region.lng, zoom: region.zoom }} height={360} />
        </div>

        <RelatedLinks items={related} title="Start with the job, not the suburb list" />

        <h2 className="mt-12 font-display text-2xl">Suburbs we work in {region.short}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a) => (
            <Link
              key={a.slug}
              to="/service-areas/$slug"
              params={{ slug: a.slug }}
              className="rounded-xl border border-line bg-surface p-5 hover:border-mint"
            >
              <p className="text-xs text-mint">{a.postcode}</p>
              <h3 className="mt-1 font-display text-xl">{a.name}</h3>
              <p className="mt-2 text-sm text-muted">{a.focus}</p>
            </Link>
          ))}
        </div>
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
