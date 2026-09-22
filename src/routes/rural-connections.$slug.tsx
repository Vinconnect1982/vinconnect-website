import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { ArticlePage, articleHead } from "@/components/article-page";
import { EnquiryForm } from "@/components/enquiry-form";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { articleBySlug } from "@/lib/pages";
import { ROADSHOW_DATES, RURAL_PILLARS } from "@/lib/rural";

export const Route = createFileRoute("/rural-connections/$slug")({
  component: RuralRoute,
  loader: ({ params }) => {
    const pillar = RURAL_PILLARS.find((p) => p.slug === params.slug);
    if (pillar) return { kind: "pillar" as const, pillar };
    const article = articleBySlug("rural", params.slug);
    if (article) return { kind: "article" as const, article };
    throw notFound();
  },
  head: ({ loaderData }) => {
    if (loaderData?.kind === "article") return articleHead(loaderData.article);
    return {
      meta: [
        { title: `${loaderData?.pillar.title ?? "Rural Connections"} | VINCONNECT` },
        { name: "description", content: loaderData?.pillar.lede },
      ],
    };
  },
});

function RuralRoute() {
  const data = Route.useLoaderData();
  if (data.kind === "article") return <ArticlePage page={data.article} />;
  const page = data.pillar;
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">
          <Link to="/rural-connections" className="hover:text-mint">
            Rural Connections
          </Link>{" "}
          / {page.kicker}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">{page.title}.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{page.lede}</p>
        <img src={page.image} alt="" className="mt-8 h-72 w-full rounded-xl object-cover sm:h-96" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {page.points.map((p) => (
            <li key={p} className="rounded-lg border border-line bg-surface px-4 py-3 text-sm">
              {p}
            </li>
          ))}
        </ul>

        {page.slug === "roadshow" && (
          <div className="mt-12">
            <h2 className="font-display text-2xl">Indicative 2026–27 pathway</h2>
            <p className="mt-2 text-sm text-muted">
              Participation and dates remain subject to confirmation with host events. People and
              community first — grant programs are alignment notes, not the public story.
            </p>
            <ol className="mt-6 space-y-3">
              {ROADSHOW_DATES.map((d) => (
                <li key={d.where} className="grid gap-1 rounded-xl border border-line bg-surface px-4 py-3 sm:grid-cols-[7rem_minmax(0,1fr)]">
                  <span className="text-sm text-mint">{d.when}</span>
                  <span>
                    <span className="font-display">{d.where}</span>
                    <span className="mt-1 block text-sm text-muted">{d.note}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm">
              Connectivity on site is the{" "}
              <Link to="/event-link" className="text-mint">
                Event Link
              </Link>{" "}
              pilot kit. Visiting:{" "}
              <AppLink to="/rural-connections/visiting-the-hub" className="text-mint">
                what the hub feels like
              </AppLink>
              .
            </p>
          </div>
        )}

        {page.slug === "info-hub" && (
          <div className="mt-12 space-y-4 text-muted">
            <p>
              The online hub is this website’s guides, suburb pages, package sheets and downloadable
              PDFs. Nothing here requires a marketing subscription.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <Link to="/resources" className="text-mint">
                  Guides & answers
                </Link>
              </li>
              <li>
                <AppLink to="/resources/rural-connectivity-options" className="text-mint">
                  Rural connectivity options
                </AppLink>
              </li>
              <li>
                <Link to="/resources/downloads" className="text-mint">
                  Downloadable PDFs
                </Link>
              </li>
              <li>
                <Link to="/service-areas" className="text-mint">
                  Suburb-by-suburb work areas
                </Link>
              </li>
            </ul>
          </div>
        )}

        {page.slug === "advocacy" && (
          <div className="mt-12 space-y-4 text-muted">
            <p>
              Where an eligible rural premises cannot obtain adequate broadband economically through
              existing networks, a capped, outcomes-based subsidy for the fastest suitable
              technology — including LEO satellite — is a question worth testing. It should
              complement fibre, mobile, fixed-wireless and resilience investment, not replace them.
            </p>
            <p>
              A 2025 Senate committee recommended considering a co-funded rural connectivity-equipment
              program that expressly included Starlink or other LEO equipment. That is precedent for
              the conversation, not an adopted subsidy.
            </p>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/rural-connections">Back to Rural Connections</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/resources/downloads/$slug" params={{ slug: "rural-connections-brief" }}>Download the brief</Link>
          </Button>
        </div>

        <div className="mt-12 max-w-md">
          <EnquiryForm selectedPackage={`Rural Connections — ${page.title}`} buttonLabel="Talk to VINCONNECT" />
        </div>
      </div>
    </SiteShell>
  );
}
