import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { CoverageMap } from "@/components/coverage-map";
import { EnquiryForm } from "@/components/enquiry-form";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { StarlinkOfferCta } from "@/components/starlink-offer-cta";
import { SuburbLanding } from "@/components/suburb-landing";
import { Button } from "@/components/ui/button";
import { areaBySlug, areaFaqs, nearbyAreas, regionBySlug, type Area, type Region } from "@/lib/areas";
import { LOCAL_NOTES, FIXED_WIRELESS_JOBS } from "@/lib/local-notes";
import { PROJECTS, SITE_URL, type Project } from "@/lib/content";
import { SUBURB_SEO } from "@/lib/suburb-seo";

const AREA_GUIDES: Record<string, { href: string; label: string }[]> = {
  nyora: [
    { href: "/resources/fixed-wireless-vs-starlink", label: "Starlink or nbn Fixed Wireless" },
    { href: "/resources/wifi-into-a-shed", label: "Wi-Fi into a shed" },
    { href: "/resources/connected-horse-property", label: "Horse property connectivity" },
  ],
  "red-hill": [
    { href: "/resources/trees-and-starlink", label: "Trees and obstructions" },
    { href: "/resources/choosing-a-starlink-mount", label: "Choosing a mount" },
    { href: "/resources/where-should-the-router-go", label: "Router placement" },
  ],
  pearcedale: [
    { href: "/resources/wifi-into-a-shed", label: "Wi-Fi into a shed" },
    { href: "/resources/point-to-point-wireless", label: "Point-to-point wireless" },
  ],
  clyde: [{ href: "/vinready", label: "VINREADY for new homes" }],
  "clyde-north": [{ href: "/vinready", label: "VINREADY for new homes" }],
  cranbourne: [{ href: "/vinready", label: "VINREADY for builders" }],
  "botanic-ridge": [{ href: "/vinready", label: "VINREADY for new homes" }],
  officer: [{ href: "/vinready", label: "VINREADY for new estates" }],
  pakenham: [{ href: "/vinready", label: "VINREADY for new homes" }],
  wonthaggi: [
    { href: "/resources/caravan-internet-guide", label: "Caravan internet" },
    { href: "/resources/rural-cctv", label: "Rural CCTV" },
  ],
};

export const Route = createFileRoute("/service-areas/$slug")({
  component: AreaPage,
  loader: ({ params }) => {
    const area = areaBySlug(params.slug);
    if (!area) throw notFound();
    const region = regionBySlug(area.region);
    const projects = PROJECTS.filter((p) => p.areaSlug === area.slug);
    const nearby = nearbyAreas(area);
    const faqs = SUBURB_SEO[area.slug]?.faqs ?? areaFaqs(area);
    return { area, region, projects, nearby, faqs };
  },
  head: ({ loaderData }) => {
    const area = loaderData?.area;
    const seo = area ? SUBURB_SEO[area.slug] : undefined;
    const name = area?.name ?? "Victoria";
    const pc = area?.postcode ?? "";
    return {
      meta: [
        { title: seo?.title ?? `Starlink installation ${name} ${pc} | VINCONNECT`.replace("  ", " ") },
        {
          name: "description",
          content:
            seo?.description ??
            `Starlink installation, whole-property Wi-Fi, wireless links and CCTV in ${name}, ${loaderData?.region?.name ?? "Victoria"}. Installer based in Cranbourne. ${area?.blurb ?? ""}`,
        },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/service-areas/${area?.slug ?? ""}` }],
    };
  },
});

function AreaPage() {
  const { area, region, projects, nearby, faqs } = Route.useLoaderData();
  const seo = SUBURB_SEO[area.slug];
  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Service areas", item: `${SITE_URL}/service-areas` },
            ...(region
              ? [{ "@type": "ListItem", position: 2, name: region.name, item: `${SITE_URL}/service-areas/region/${region.slug}` }]
              : []),
            { "@type": "ListItem", position: region ? 3 : 2, name: area.name, item: `${SITE_URL}/service-areas/${area.slug}` },
          ],
        }}
      />
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
          name: seo?.h1 ?? `Starlink installation in ${area.name}`,
          serviceType: "Starlink installation",
          areaServed: {
            "@type": "City",
            name: area.name,
            address: {
              "@type": "PostalAddress",
              addressLocality: area.name,
              postalCode: area.postcode,
              addressRegion: "VIC",
              addressCountry: "AU",
            },
          },
          provider: { "@type": "LocalBusiness", name: "VINCONNECT", telephone: "+61408559555", url: SITE_URL },
          url: `${SITE_URL}/service-areas/${area.slug}`,
        }}
      />
      {seo ? (
        <SuburbLanding area={area} region={region} seo={seo} />
      ) : (
        <LegacyArea area={area} region={region} projects={projects} nearby={nearby} faqs={faqs} />
      )}
    </SiteShell>
  );
}

function LegacyArea({
  area,
  region,
  projects,
  nearby,
  faqs,
}: {
  area: Area;
  region?: Region;
  projects: Project[];
  nearby: Area[];
  faqs: { q: string; a: string }[];
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="kicker">
        <Link to="/service-areas" className="hover:text-mint">Service areas</Link>
        {region && (
          <>
            {" / "}
            <Link to="/service-areas/region/$slug" params={{ slug: region.slug }} className="hover:text-mint">
              {region.short}
            </Link>
          </>
        )}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">Starlink installation in {area.name}.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{area.blurb}</p>
      <p className="mt-3 max-w-2xl text-muted">{area.focus} Enter your address and the quote includes travel.</p>
      {LOCAL_NOTES[area.slug] && <p className="mt-4 max-w-2xl text-muted">{LOCAL_NOTES[area.slug]}</p>}
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
            Sky view, mount choice, sealed cable entry and a router that covers the rooms you use. Hardware and the Starlink plan stay on your account.
          </p>
          <Link to="/services/$slug" params={{ slug: "starlink-installation" }} className="mt-3 inline-block text-sm text-mint">
            Starlink installation →
          </Link>
        </section>
        <section>
          <h2 className="font-display text-xl">Wi-Fi and building links</h2>
          <p className="mt-2 text-sm text-muted">
            Sheds, stables and workshops get a dedicated path when house Wi-Fi cannot reach them.
          </p>
          <Link to="/services/$slug" params={{ slug: "wireless-links" }} className="mt-3 inline-block text-sm text-mint">
            Wireless links →
          </Link>
        </section>
        <section>
          <h2 className="font-display text-xl">Cameras</h2>
          <p className="mt-2 text-sm text-muted">
            Cameras are planned around the views you need, with recording and remote access tested at handover.
          </p>
          <Link to="/security" className="mt-3 inline-block text-sm text-mint">CCTV →</Link>
        </section>
      </div>
      {projects.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-2xl">Work in {area.name}</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {projects.map((p) => (
              <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="overflow-hidden rounded-xl border border-line hover:border-mint">
                <img src={p.image} alt={`${p.title} in ${p.place}`} className="h-44 w-full object-cover" loading="lazy" decoding="async" />
                <div className="p-4">
                  <h3 className="font-display text-xl">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted">{p.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {FIXED_WIRELESS_JOBS.has(area.slug) && (
        <div className="note mt-10 max-w-2xl p-5">
          <h2 className="font-display text-xl">A finished job here replaced fixed wireless</h2>
          <p className="mt-3 text-sm text-muted">
            That was one property in {area.name}. Other addresses nearby can still be on a different service. nbn availability still depends on the address.
          </p>
          <AppLink to="/resources/fixed-wireless-vs-starlink" className="mt-3 inline-block text-sm text-mint">
            Compare Starlink and nbn Fixed Wireless
          </AppLink>
        </div>
      )}
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
      <StarlinkOfferCta suburb={area.name} />
      <div className="mt-8">
        <h2 className="font-display text-xl">Useful next steps</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li><AppLink to="/estimate" className="text-mint">Check My Install Price</AppLink></li>
          <li><AppLink to="/vinready" className="text-mint">VINREADY for new homes</AppLink></li>
          <li><AppLink to="/property-planner" className="text-mint">Plan the property</AppLink></li>
          <li><AppLink to="/resources/wifi-into-a-shed" className="text-mint">Getting Wi-Fi into a shed</AppLink></li>
          <li><AppLink to="/projects" className="text-mint">Completed projects</AppLink></li>
          {(AREA_GUIDES[area.slug] ?? []).map((g) => (
            <li key={g.href}>
              <AppLink to={g.href} className="text-mint">{g.label}</AppLink>
            </li>
          ))}
        </ul>
      </div>
      {nearby.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-2xl">Nearby suburbs</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {nearby.map((n) => (
              <li key={n.slug}>
                <Link to="/service-areas/$slug" params={{ slug: n.slug }} className="inline-flex rounded-full border border-line px-3 py-2 text-sm hover:border-mint">
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
          <p className="mt-3 text-muted">Address, what is failing, and whether a shed or camera is in scope.</p>
        </div>
        <EnquiryForm selectedPackage={`Starlink / network in ${area.name}`} buttonLabel={`Enquire from ${area.name}`} />
      </div>
    </div>
  );
}
