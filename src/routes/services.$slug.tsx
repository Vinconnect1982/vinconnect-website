import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EnquiryForm } from "@/components/enquiry-form";
import { RelatedLinks } from "@/components/related-links";
import { StarlinkOfferCta } from "@/components/starlink-offer-cta";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { SERVICES, SITE_URL, findService } from "@/lib/content";
import { COMMERCIAL_RELATED } from "@/lib/pages";

const GUIDE_LINKS: Record<string, { href: string; label: string; copy?: string }[]> = {
  "starlink-installation": [
    { href: "/vinready", label: "VINREADY for new homes", copy: "Starlink-ready infrastructure during construction." },
    { href: "/resources/choosing-a-starlink-mount", label: "Choosing a mount" },
    { href: "/resources/where-should-the-router-go", label: "Where the router should go" },
    { href: "/resources/starlink-power-outage", label: "Starlink in a power outage" },
    { href: "/resources/fixed-wireless-vs-starlink", label: "Fixed wireless or Starlink" },
    { href: "/resources/trees-and-starlink", label: "Trees and obstructions" },
    { href: "/resources/external-or-concealed-cabling", label: "External or concealed cable" },
    { href: "/resources/house-or-shed", label: "House or shed?" },
  ],
  "whole-property-wifi": [
    { href: "/resources/wifi-into-a-shed", label: "Wi-Fi into a shed" },
    { href: "/resources/mesh-vs-wireless-bridge", label: "Mesh or a wireless bridge?" },
  ],
  "wireless-links": [
    { href: "/resources/point-to-point-wireless", label: "Point-to-point, explained" },
    { href: "/resources/mesh-vs-wireless-bridge", label: "Mesh or a wireless bridge?" },
    { href: "/resources/wifi-into-a-shed", label: "Wi-Fi into a shed" },
  ],
  "equestrian-connectivity": [
    { href: "/resources/connected-horse-property", label: "The connected horse property" },
    { href: "/resources/wifi-into-a-shed", label: "Wi-Fi into a shed or stable" },
    { href: "/security/stable-cctv", label: "Stable cameras" },
  ],
  "starlink-caravan-installation": [
    { href: "/resources/caravan-internet-guide", label: "Caravan internet and Starlink" },
  ],
  "cctv": [
    { href: "/resources/rural-cctv", label: "CCTV for rural properties" },
    { href: "/resources/cctv-on-starlink", label: "CCTV on Starlink" },
  ],
};

export const Route = createFileRoute("/services/$slug")({
  component: ServicePage,
  loader: ({ params }) => {
    const page = findService(params.slug);
    if (!page || !SERVICES.some((s) => s.slug === params.slug)) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Service"} | VINCONNECT` },
      { name: "description", content: loaderData?.lede },
    ],
    links: loaderData ? [{ rel: "canonical", href: `${SITE_URL}/services/${loaderData.slug}` }] : [],
  }),
});

function ServicePage() {
  const page = Route.useLoaderData();
  const related = COMMERCIAL_RELATED[`/services/${page.slug}`] ?? [
    { href: "/starlink", label: "Starlink guides" },
    { href: "/property-networks", label: "Property networks" },
    { href: "/customer-help", label: "Customer help" },
    { href: "/estimate", label: "Check My Install Price" },
  ];
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: page.kicker },
          ]}
        />
        <p className="kicker mt-6">{page.kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">{page.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{page.lede}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/estimate">Check My Install Price</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/property-planner">Plan My Property</Link>
          </Button>
        </div>
        {page.image && (
          <div className="mt-10 overflow-hidden rounded-xl border border-line bg-ink">
            <img
              src={page.image}
              alt=""
              className="aspect-[16/9] h-auto w-full object-cover object-center"
            />
          </div>
        )}
        <ul className="facts mt-10 grid sm:grid-cols-2 sm:gap-x-10">
          {page.points.map((p) => (
            <li key={p} className="text-sm">
              {p}
            </li>
          ))}
        </ul>
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
            <h2 className="font-display text-xl">Tell us about the job.</h2>
            <div className="mt-4">
              <EnquiryForm selectedPackage={page.kicker} buttonLabel="Request a quote" />
            </div>
          </div>
        </div>
        {["starlink-installation", "starlink-caravan-installation", "starlink-mini-installation", "rural-connectivity"].includes(page.slug) && (
          <StarlinkOfferCta />
        )}
        <RelatedLinks items={[...related, ...(GUIDE_LINKS[page.slug] ?? [])]} title="Helpful guides" />
      </div>
    </SiteShell>
  );
}
