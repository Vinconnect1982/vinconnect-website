import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { CoverageMap } from "@/components/coverage-map";
import { EnquiryForm } from "@/components/enquiry-form";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { areaBySlug, areaFaqs, nearbyAreas, regionBySlug } from "@/lib/areas";
import { LOCAL_NOTES } from "@/lib/local-notes";
import { PROJECTS, SITE_URL } from "@/lib/content";
import { HILOOK_PACKAGES } from "@/lib/packages";

export const Route = createFileRoute("/service-areas/$slug")({
  component: AreaPage,
  loader: ({ params }) => {
    const area = areaBySlug(params.slug);
    if (!area) throw notFound();
    const region = regionBySlug(area.region);
    const projects = PROJECTS.filter((p) => p.areaSlug === area.slug);
    const nearby = nearbyAreas(area);
    const faqs = areaFaqs(area);
    return { area, region, projects, nearby, faqs };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.area.name ?? "Victoria";
    const pc = loaderData?.area.postcode ?? "";
    return {
      meta: [
        { title: `Starlink installation ${name} ${pc} | VINCONNECT`.replace("  ", " ") },
        {
          name: "description",
          content: `Starlink installation, whole-property Wi-Fi, wireless links and HiLook CCTV in ${name}, ${loaderData?.region?.name ?? "Victoria"}. Local installer based in Cranbourne. ${loaderData?.area.blurb ?? ""}`,
        },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/service-areas/${loaderData?.area.slug ?? ""}` }],
    };
  },
});

function AreaPage() {
  const { area, region, projects, nearby, faqs } = Route.useLoaderData();
  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Starlink installation in ${area.name}`,
          areaServed: area.name,
          provider: { "@type": "LocalBusiness", name: "VINCONNECT" },
          url: `${SITE_URL}/service-areas/${area.slug}`,
        }}
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">
          <Link to="/service-areas" className="hover:text-mint">
            Work areas
          </Link>
          {region && (
            <>
              {" / "}
              <Link
                to="/service-areas/region/$slug"
                params={{ slug: region.slug }}
                className="hover:text-mint"
              >
                {region.short}
              </Link>
            </>
          )}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">
          Starlink installation in {area.name}.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{area.blurb}</p>
        <p className="mt-3 max-w-2xl text-muted">
          {area.focus} Enter your installation address and we’ll include location in your estimate.
        </p>
        {LOCAL_NOTES[area.slug] && (
          <p className="mt-4 max-w-2xl text-muted">{LOCAL_NOTES[area.slug]}</p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/estimate">Check My Install Price</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/property-planner">Plan this property</Link>
          </Button>
        </div>

        <div className="mt-10">
          <CoverageMap focus={{ lat: area.lat, lng: area.lng, zoom: 11 }} height={320} />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <section>
            <h2 className="font-display text-xl">Starlink in {area.name}</h2>
            <p className="mt-2 text-sm text-muted">
              Sky view, mount choice, sealed cable entry and a router that actually covers the
              rooms you use. Hardware and the Starlink subscription stay on your account.
            </p>
            <Link to="/services/$slug" params={{ slug: "starlink-installation" }} className="mt-3 inline-block text-sm text-mint">
              Starlink installation →
            </Link>
            <p className="mt-2">
              <AppLink to="/starlink" className="text-sm text-mint">
                Starlink guides →
              </AppLink>
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl">Wi-Fi & building links</h2>
            <p className="mt-2 text-sm text-muted">
              Sheds, stables, granny flats and offices get a dedicated path — not a mesh node
              hoping to jump a paddock. Typical in {area.name} when the house Wi-Fi dies at the
              shed.
            </p>
            <Link to="/services/$slug" params={{ slug: "wireless-links" }} className="mt-3 inline-block text-sm text-mint">
              Wireless links →
            </Link>
          </section>
          <section>
            <h2 className="font-display text-xl">Cameras</h2>
            <p className="mt-2 text-sm text-muted">
              HiLook kits specified around the views you need in {area.name}, with recording and
              remote access tested at handover.
            </p>
            <Link to="/security/$slug" params={{ slug: "hilook-cctv-packages" }} className="mt-3 inline-block text-sm text-mint">
              HiLook packages →
            </Link>
          </section>
        </div>

        {projects.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl">Work in {area.name}</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {projects.map((p) => (
                <Link
                  key={p.slug}
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="overflow-hidden rounded-xl border border-line hover:border-mint"
                >
                  <img src={p.image} alt="" className="h-44 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="font-display text-xl">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted">{p.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="font-display text-2xl">Camera packages that fit {area.name}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {HILOOK_PACKAGES.map((pkg) => (
              <li key={pkg.slug}>
                <Link
                  to="/security/packages/$slug"
                  params={{ slug: pkg.slug }}
                  className="link-card rounded-xl border border-line bg-surface px-4 py-3"
                >
                  <span className="font-display text-lg">{pkg.name}</span>
                  <span className="mt-1 block text-sm text-muted">
                    From ${pkg.packageFrom.toLocaleString("en-AU")} supply and install
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-2xl">Questions people ask about {area.name}</h2>
          <dl className="faq mt-2">
            {faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-display text-lg">{f.q}</dt>
                <dd className="mt-2 text-sm text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>

        {nearby.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-2xl">Nearby suburbs</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link
                    to="/service-areas/$slug"
                    params={{ slug: n.slug }}
                    className="inline-flex rounded-full border border-line px-3 py-2 text-sm hover:border-mint"
                  >
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <h2 className="font-display text-2xl">Tell us about a {area.name} property.</h2>
            <p className="mt-3 text-muted">
              Address, what is failing, and whether a shed or camera is in scope. We reply with a
              practical next step — not a script.
            </p>
            <p className="mt-4 text-sm">
              <Link to="/rural-connections" className="text-mint">
                Rural Connections
              </Link>{" "}
              if you are a club, show or community group in this region.{" "}
              <Link to="/resources/downloads" className="text-mint">
                Download guides
              </Link>{" "}
              before the visit.
            </p>
          </div>
          <EnquiryForm
            selectedPackage={`Starlink / network in ${area.name}`}
            buttonLabel={`Enquire from ${area.name}`}
          />
        </div>
      </div>
    </SiteShell>
  );
}
