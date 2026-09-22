import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RelatedLinks } from "@/components/related-links";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { PROJECTS, SITE_URL } from "@/lib/content";
import { areaBySlug } from "@/lib/areas";
import { PROJECT_DETAILS } from "@/lib/project-details";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectPage,
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    const area = areaBySlug(project.areaSlug);
    const related = PROJECTS.filter((p) => p.areaSlug === project.areaSlug && p.slug !== project.slug);
    const nearby = PROJECTS.filter((p) => p.slug !== project.slug && p.areaSlug !== project.areaSlug).slice(0, 3);
    const detail = PROJECT_DETAILS[project.slug];
    return { project, area, related, nearby, detail };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.title ?? "Project"} | VINCONNECT` },
      { name: "description", content: loaderData?.project.summary },
    ],
    links: loaderData
      ? [{ rel: "canonical", href: `${SITE_URL}/projects/${loaderData.project.slug}` }]
      : [],
  }),
});

function ProjectPage() {
  const { project, area, related, nearby, detail } = Route.useLoaderData();
  const guides = detail?.guides ?? [
    { href: "/starlink", label: "Starlink guides" },
    { href: "/customer-help", label: "Customer help" },
    { href: "/estimate", label: "Check My Install Price" },
  ];
  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: project.title,
          description: project.summary,
          image: `${SITE_URL}${project.image}`,
          author: { "@type": "Organization", name: "VINCONNECT" },
        }}
      />
      <article>
        <div className="relative overflow-hidden">
          <img src={project.image} alt="" className="absolute inset-0 h-full min-h-[22rem] w-full object-cover object-[center_30%] sm:min-h-[28rem]" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <Breadcrumbs
              items={[
                { label: "Projects", href: "/projects" },
                { label: project.place, href: area ? `/service-areas/${area.slug}` : undefined },
                { label: project.title },
              ]}
            />
            <p className="kicker mt-8">Completed project</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-6xl">{project.title}</h1>
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-fg/80">{project.place}, Victoria</p>
            <p className="mt-4 max-w-2xl text-lg text-fg/85">{project.summary}</p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          {detail?.mount && (
            <p className="note text-sm">
              Mount / approach: <span className="text-mint">{detail.mount}</span>
            </p>
          )}

          {detail && (
            <section className="mt-10">
              <h2 className="font-display text-2xl">The installation</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {detail.works.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              <p className="mt-4 text-muted">{detail.note}</p>
            </section>
          )}

          <p className="mt-8 text-sm text-muted">
            Completed installation in {project.place}. The photos show finished work, not a quote. We do not list the customer’s name, street address or phone number.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/estimate">Check My Install Price</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/property-planner">Plan a similar project</Link>
            </Button>
            {area && (
              <Button asChild variant="ghost">
                <Link to="/service-areas/$slug" params={{ slug: area.slug }}>
                  Starlink in {area.name}
                </Link>
              </Button>
            )}
            <Button asChild variant="ghost">
              <AppLink to="/starlink">Starlink guides</AppLink>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/projects">All projects</Link>
            </Button>
          </div>

          <RelatedLinks items={guides} title="If you are planning similar work" />

          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl">More in {project.place}</h2>
              <ul className="mt-4 space-y-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link to="/projects/$slug" params={{ slug: p.slug }} className="text-mint">
                      {p.title} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {nearby.length > 0 && related.length === 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl">Other completed installs</h2>
              <ul className="mt-4 space-y-2">
                {nearby.map((p) => (
                  <li key={p.slug}>
                    <Link to="/projects/$slug" params={{ slug: p.slug }} className="text-mint">
                      {p.title} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </SiteShell>
  );
}
