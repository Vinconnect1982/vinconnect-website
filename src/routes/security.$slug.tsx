import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArticlePage, articleHead } from "@/components/article-page";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EnquiryForm } from "@/components/enquiry-form";
import { RelatedLinks } from "@/components/related-links";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { SECURITY } from "@/lib/content";
import { articleBySlug, COMMERCIAL_RELATED } from "@/lib/pages";
import { HILOOK_PACKAGES } from "@/lib/packages";

export const Route = createFileRoute("/security/$slug")({
  component: SecurityRoute,
  loader: ({ params }) => {
    const commercial = SECURITY.find((s) => s.slug === params.slug);
    if (commercial) return { kind: "commercial" as const, commercial };
    const article = articleBySlug("security", params.slug);
    if (article) return { kind: "article" as const, article };
    throw notFound();
  },
  head: ({ loaderData }) => {
    if (loaderData?.kind === "article") return articleHead(loaderData.article);
    return { meta: [{ title: `${loaderData?.commercial.title ?? "Security"} | VINCONNECT` }] };
  },
});

function SecurityRoute() {
  const data = Route.useLoaderData();
  if (data.kind === "article") return <ArticlePage page={data.article} />;
  const page = data.commercial;
  const related = COMMERCIAL_RELATED[`/security/${page.slug}`] ?? [
    { href: "/security", label: "CCTV cluster" },
    { href: "/security/hilook-cctv-packages", label: "HiLook packages" },
    { href: "/resources/cctv-on-starlink", label: "CCTV on Starlink" },
  ];
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "CCTV", href: "/security" },
            { label: page.kicker },
          ]}
        />
        <p className="kicker mt-6">{page.kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{page.lede}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/property-planner">Plan My Property</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/contact">Ask about cameras</Link>
          </Button>
        </div>
        {page.image && (
          <img src={page.image} alt="" className="mt-10 w-full rounded-xl border border-line object-cover" />
        )}
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {page.points.map((p) => (
            <li key={p} className="rounded-lg border border-line bg-surface px-4 py-3 text-sm">
              {p}
            </li>
          ))}
        </ul>

        {page.slug === "hilook-cctv-packages" && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {HILOOK_PACKAGES.map((pkg) => (
              <Link
                key={pkg.slug}
                to="/security/packages/$slug"
                params={{ slug: pkg.slug }}
                className="overflow-hidden rounded-xl border border-line hover:border-mint"
              >
                <img src={pkg.image} alt="" className="h-44 w-full object-cover" />
                <div className="p-5">
                  <h2 className="font-display text-2xl">{pkg.name}</h2>
                  <p className="mt-2 text-sm text-muted">{pkg.lede}</p>
                  <p className="mt-3 text-sm text-mint">
                    From ${pkg.packageFrom.toLocaleString("en-AU")} supply & install →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-8">
            {page.body.map((block) => (
              <section key={block.heading}>
                <h2 className="font-display text-2xl">{block.heading}</h2>
                <p className="mt-3 text-muted">{block.copy}</p>
              </section>
            ))}
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <EnquiryForm selectedPackage={page.kicker} buttonLabel="Request a camera quote" />
          </div>
        </div>
        <RelatedLinks items={related} title="Keep reading" />
      </div>
    </SiteShell>
  );
}
