import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DownloadGate } from "@/components/download-gate";
import { SiteShell } from "@/components/site-shell";
import { downloadBySlug, DOWNLOADS } from "@/lib/downloads";

export const Route = createFileRoute("/resources/downloads/$slug")({
  component: DownloadPage,
  loader: ({ params }) => {
    const doc = downloadBySlug(params.slug);
    if (!doc) throw notFound();
    return doc;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Download"} | VINCONNECT` },
      { name: "description", content: loaderData?.lede },
    ],
  }),
});

function DownloadPage() {
  const doc = Route.useLoaderData();
  const others = DOWNLOADS.filter((d) => d.slug !== doc.slug).slice(0, 4);
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">
          <Link to="/resources/downloads" className="hover:text-mint">
            Downloads
          </Link>
        </p>
        <h1 className="mt-3 font-display text-4xl">{doc.title}.</h1>
        <p className="mt-4 text-lg text-muted">{doc.lede}</p>
        <p className="mt-2 text-sm text-muted">
          {doc.pages} · {doc.topics.join(" · ")}
        </p>
        <div className="mt-8">
          <DownloadGate doc={doc} />
        </div>
        <h2 className="mt-12 font-display text-2xl">Other guides</h2>
        <ul className="mt-4 space-y-2">
          {others.map((d) => (
            <li key={d.slug}>
              <Link to="/resources/downloads/$slug" params={{ slug: d.slug }} className="text-mint">
                {d.title} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}
