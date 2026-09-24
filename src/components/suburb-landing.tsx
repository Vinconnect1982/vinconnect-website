import { Link } from "@tanstack/react-router";
import { CoverageMap } from "@/components/coverage-map";
import { EnquiryForm } from "@/components/enquiry-form";
import { StarlinkOfferCta } from "@/components/starlink-offer-cta";
import { Button } from "@/components/ui/button";
import { nearbyAreas, type Area, type Region } from "@/lib/areas";
import { PHONE_TEL, PROJECTS, type Project } from "@/lib/content";
import { GUIDE_CLUSTER, type SuburbSeo } from "@/lib/suburb-seo";

const GOOGLE_PROFILE = "https://share.google/trFzHOI7IVQMK9Gmf";

export function SuburbLanding({
  area,
  region,
  seo,
}: {
  area: Area;
  region?: Region;
  seo: SuburbSeo;
}) {
  const nearby = nearbyAreas(area);
  const here = PROJECTS.filter((p) => p.areaSlug === area.slug);
  const around = PROJECTS.filter(
    (p) => p.areaSlug !== area.slug && (area.nearby.includes(p.areaSlug) || seo.alsoNear?.includes(p.areaSlug)),
  ).slice(0, 4);

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
      <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">{seo.h1}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{seo.intro}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/estimate">Check My Install Price</Link>
        </Button>
        <Button asChild variant="ghost">
          <a href="#enquire">Request a quote</a>
        </Button>
        <Button asChild variant="ghost">
          <a href={PHONE_TEL}>Call VINCONNECT</a>
        </Button>
        {seo.vinready && (
          <Button asChild variant="ghost">
            <Link to="/vinready">Ask about VINREADY</Link>
          </Button>
        )}
      </div>

      <img
        src={seo.image}
        alt={seo.imageAlt}
        className="mt-10 aspect-[16/8] w-full rounded-xl border border-line object-cover"
        loading="lazy"
        decoding="async"
      />

      <div className="mt-12 max-w-3xl space-y-10">
        {seo.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-2xl">{section.heading}</h2>
            {section.copy.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="mt-3 text-muted">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Related services</h2>
        <ul className="mt-4 flex flex-wrap gap-2 text-sm">
          <li><Link to="/services/$slug" params={{ slug: "starlink-installation" }} className="text-mint">Starlink installation</Link></li>
          <li><Link to="/services/$slug" params={{ slug: "whole-property-wifi" }} className="text-mint">Whole-property Wi-Fi</Link></li>
          <li><Link to="/services/$slug" params={{ slug: "wireless-links" }} className="text-mint">Wireless links</Link></li>
          <li><Link to="/security" className="text-mint">CCTV</Link></li>
          <li><Link to="/estimate" className="text-mint">Installation quote</Link></li>
          <li><Link to="/property-planner" className="text-mint">Property planner</Link></li>
          <li><Link to="/projects" className="text-mint">Completed projects</Link></li>
          {seo.vinready && <li><Link to="/vinready" className="text-mint">VINREADY new homes</Link></li>}
        </ul>
        <ul className="mt-4 space-y-2 text-sm">
          {GUIDE_CLUSTER.map((guide) => (
            <li key={guide.href}>
              <Link to="/resources/$slug" params={{ slug: guide.href.replace("/resources/", "") }} className="text-mint">{guide.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      <ProjectBlock title={here.length ? `Completed installations in ${area.name}` : `Completed installations near ${area.name}`} empty={here.length === 0 && around.length === 0} projects={here.length ? here : around} note={here.length === 0 ? `These are finished jobs in neighbouring suburbs, shown here because ${area.name} does not have a published project yet.` : undefined} />
      {here.length > 0 && around.length > 0 && (
        <ProjectBlock title={`Also nearby`} projects={around} note="Finished jobs in neighbouring suburbs." />
      )}

      <div className="mt-12">
        <h2 className="font-display text-2xl">Where this sits</h2>
        <div className="mt-5">
          <CoverageMap focus={{ lat: area.lat, lng: area.lng, zoom: 11 }} height={320} />
        </div>
      </div>

      {nearby.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-2xl">Nearby areas</h2>
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

      <section className="mt-12 max-w-2xl">
        <h2 className="font-display text-2xl">Questions about {area.name}</h2>
        <dl className="faq mt-4">
          {seo.faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="font-display text-lg">{faq.q}</dt>
              <dd className="mt-2 text-sm text-muted">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 max-w-2xl border border-line p-5">
        <h2 className="font-display text-2xl">Google reviews</h2>
        <p className="mt-3 text-sm text-muted">
          VINCONNECT does not publish reviews that are not on Google. If we have installed at your place, a short review on the Google profile helps the next household looking for Starlink installation in {area.name}.
        </p>
        <a href={GOOGLE_PROFILE} className="mt-3 inline-block text-sm text-mint" target="_blank" rel="noreferrer">
          VINCONNECT on Google
        </a>
      </section>

      <StarlinkOfferCta suburb={area.name} />

      <section id="enquire" className="mt-12">
        <h2 className="font-display text-2xl">Get a Starlink installation quote</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Residential installs can be quoted online from the address. Commercial sites are quoted after we speak with you. Payment is due on the day of installation.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/estimate">Check My Install Price</Link>
          </Button>
          <Button asChild variant="ghost">
            <a href={PHONE_TEL}>Call to book</a>
          </Button>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <p className="text-sm text-muted">
            Tell us the address, the roof if you know it, and whether a shed or a new build is involved.{" "}
            <Link to="/services/$slug" params={{ slug: "starlink-installation" }} className="text-mint">Starlink installation</Link>
            {" · "}
            <Link to="/service-areas" className="text-mint">All service areas</Link>
          </p>
          <EnquiryForm selectedPackage={`Starlink installation in ${area.name}`} buttonLabel={`Enquire from ${area.name}`} />
        </div>
      </section>
    </div>
  );
}

function ProjectBlock({ title, projects, note, empty }: { title: string; projects: Project[]; note?: string; empty?: boolean }) {
  if (empty) {
    return (
      <section className="mt-12 max-w-2xl">
        <h2 className="font-display text-2xl">{title}</h2>
        <p className="mt-3 text-sm text-muted">No completed VINCONNECT job is published for this suburb or its immediate neighbours yet. We do not invent case studies.</p>
      </section>
    );
  }
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl">{title}</h2>
      {note && <p className="mt-2 max-w-2xl text-sm text-muted">{note}</p>}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <Link key={project.slug} to="/projects/$slug" params={{ slug: project.slug }} className="overflow-hidden rounded-xl border border-line hover:border-mint">
            <img src={project.image} alt={`${project.title} in ${project.place}`} className="h-44 w-full object-cover" loading="lazy" decoding="async" />
            <div className="p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">{project.place}</p>
              <h3 className="mt-1 font-display text-xl">{project.title}</h3>
              <p className="mt-2 text-sm text-muted">{project.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
