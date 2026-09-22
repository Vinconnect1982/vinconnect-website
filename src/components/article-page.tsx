import { ArticleVisual } from "@/components/infographics";
import { AppLink } from "@/components/app-link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EnquiryForm } from "@/components/enquiry-form";
import { JsonLd } from "@/components/json-ld";
import { RelatedLinks } from "@/components/related-links";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/content";
import { clusterChildren } from "@/lib/pages";
import { DEFAULT_CTA, type Article } from "@/lib/pages/types";

const CLUSTER_LABEL: Record<string, string> = {
  "customer-help": "Customer help",
  circl: "Circl installations",
  starlink: "Starlink guides",
  "property-networks": "Property networks",
  security: "CCTV",
  solutions: "Solutions",
  "event-link": "Event Link",
  vingear: "VIN Gear",
  about: "About",
  resources: "Guides",
  rural: "Rural Connections",
  journal: "Field notes",
  legal: "Terms",
};

export function articleHead(page: Article) {
  return {
    meta: [
      { title: `${page.title} | VINCONNECT` },
      { name: "description", content: page.description },
      { property: "og:title", content: `${page.title} | VINCONNECT` },
      { property: "og:description", content: page.description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${page.path}` }],
  };
}

function Ctas({ page }: { page: Article }) {
  const cta = page.cta ?? DEFAULT_CTA;
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Button asChild>
        <AppLink to={cta.primary.href}>{cta.primary.label}</AppLink>
      </Button>
      {cta.secondary &&
        (cta.secondary.href.startsWith("tel:") ? (
          <Button asChild variant="ghost">
            <a href={cta.secondary.href}>{cta.secondary.label}</a>
          </Button>
        ) : (
          <Button asChild variant="ghost">
            <AppLink to={cta.secondary.href}>{cta.secondary.label}</AppLink>
          </Button>
        ))}
    </div>
  );
}

export function ArticlePage({ page }: { page: Article }) {
  const crumbs = page.crumbs ?? [{ label: page.kicker }, { label: page.title }];
  const siblings = clusterChildren(page.cluster)
    .filter((a) => a.path !== page.path)
    .slice(0, 6);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.title,
      description: page.description,
      image: page.image ? `${SITE_URL}${page.image}` : `${SITE_URL}/og.jpg`,
      author: { "@type": "Organization", name: "VINCONNECT" },
      publisher: { "@type": "Organization", name: "VINCONNECT", url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}${page.path}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        ...crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: c.label,
          item: c.href ? `${SITE_URL}${c.href}` : `${SITE_URL}${page.path}`,
        })),
      ],
    },
    page.faqs?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null,
  ].filter(Boolean);

  return (
    <SiteShell>
      {jsonLd.map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}

      {page.image ? (
        <div className="relative overflow-hidden">
          <img
            src={page.image}
            alt={page.imageAlt || ""}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/55" />
          <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <Breadcrumbs items={crumbs} />
            <p className="kicker mt-6">{page.kicker}</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl tracking-tight sm:text-5xl">{page.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-fg/85">{page.lede}</p>
            <Ctas page={page} />
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
          <Breadcrumbs items={crumbs} />
          <p className="kicker mt-6">{page.kicker}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl tracking-tight sm:text-5xl">{page.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">{page.lede}</p>
          <Ctas page={page} />
        </div>
      )}

      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {page.status && (
          <p className="note text-sm">{page.status}</p>
        )}

        {page.points && page.points.length > 0 && (
          <ul className="facts mt-8 grid sm:grid-cols-2 sm:gap-x-10">
            {page.points.map((p) => (
              <li key={p} className="text-sm">
                {p}
              </li>
            ))}
          </ul>
        )}

        {page.visual && <ArticleVisual name={page.visual} />}

        {page.gallery && page.gallery.length > 0 && (
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {page.gallery.map((g) => (
              <figure key={g.src} className="overflow-hidden rounded-xl border border-line">
                <img src={g.src} alt={g.alt} className="h-56 w-full object-cover sm:h-64" loading="lazy" decoding="async" />
                <figcaption className="px-3 py-2 text-xs text-muted">{g.alt}</figcaption>
              </figure>
            ))}
          </div>
        )}

        {page.children && page.children.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl">In this section</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {page.children.map((child) => (
                <li key={child.href}>
                  <AppLink
                    to={child.href}
                    className="link-card h-full rounded-xl border border-line bg-surface p-5"
                  >
                    <h3 className="font-display text-xl">{child.title}</h3>
                    <p className="mt-2 text-sm text-muted">{child.copy}</p>
                  </AppLink>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-10">
            {page.sections.map((block) => (
              <section key={block.heading}>
                <h2 className="font-display text-2xl">{block.heading}</h2>
                {block.copy.map((para, i) => (
                  <p key={`${block.heading}-${i}`} className="mt-3 text-muted">
                    {para}
                  </p>
                ))}
                {block.list && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
                    {block.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {block.note && <p className="mt-3 text-sm text-fg/80">{block.note}</p>}
              </section>
            ))}

            {page.faqs && page.faqs.length > 0 && (
              <section>
                <h2 className="font-display text-2xl">Questions we are asked</h2>
                <dl className="faq mt-2">
                  {page.faqs.map((f) => (
                    <div key={f.q}>
                      <dt className="font-display text-lg">{f.q}</dt>
                      <dd className="mt-2 text-sm text-muted">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {page.slug !== "index" && siblings.length > 0 && (
              <section>
                <h2 className="font-display text-2xl">
                  Also in {CLUSTER_LABEL[page.cluster] ?? "this section"}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {siblings.map((s) => (
                    <li key={s.path}>
                      <AppLink
                        to={s.path}
                        className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-4 text-sm hover:border-mint"
                      >
                        {s.title}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="h-fit rounded-xl border border-line bg-surface p-5 lg:sticky lg:top-24">
            <h2 className="font-display text-xl">
              {page.form?.button ? "Send a note." : "Tell us about the job."}
            </h2>
            <p className="mt-2 text-sm text-muted">One point of contact. No marketing subscription.</p>
            <div className="mt-4">
              <EnquiryForm
                type={page.form?.type || "contact"}
                selectedPackage={page.form?.package || page.title}
                buttonLabel={page.form?.button || "Ask VINCONNECT"}
                messageLabel={page.form?.messageLabel || "How can we help?"}
              />
            </div>
          </aside>
        </div>

        <RelatedLinks items={page.related ?? []} title="Keep reading" />
      </article>
    </SiteShell>
  );
}
