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
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">
          <Link to="/resources/downloads" className="hover:text-mint">
            Downloads
          </Link>
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl">{doc.title}.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{doc.lede}</p>
        <img
          src={doc.image}
          alt={`${doc.title} as a printed document on a desk`}
          className="mt-8 aspect-[16/10] w-full rounded-xl object-cover"
        />
        <p className="mt-3 text-sm text-muted">
          {doc.pages} · {doc.topics.join(" · ")}
        </p>
        <div className="mt-8">
          <DownloadGate doc={doc} />
        </div>
        <h2 className="mt-12 font-display text-2xl">Other guides</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {others.map((d) => (
            <li key={d.slug}>
              <Link to="/resources/downloads/$slug" params={{ slug: d.slug }} className="block overflow-hidden rounded-xl border border-line">
                <img src={d.image} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
                <span className="block p-3 text-sm text-mint">{d.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}
