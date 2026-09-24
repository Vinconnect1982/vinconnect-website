import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { DOWNLOADS } from "@/lib/downloads";

export const Route = createFileRoute("/resources/downloads/")({
  component: DownloadsIndex,
  head: () => ({
    meta: [
      { title: "Guides to download | VINCONNECT" },
      {
        name: "description",
        content:
          "VINCONNECT PDFs: capability statement, Starlink install guide, Event Link brochure, camera worksheet and install-day prep.",
      },
    ],
  }),
});

function DownloadsIndex() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">Information hub</p>
        <h1 className="mt-3 font-display text-4xl">Downloadable guides.</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Practical PDFs you can print or keep. Leave your details once, then take the file.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {DOWNLOADS.map((d) => (
            <Link
              key={d.slug}
              to="/resources/downloads/$slug"
              params={{ slug: d.slug }}
              className="group overflow-hidden rounded-xl border border-line bg-surface"
            >
              <img
                src={d.image}
                alt={`${d.title} printed on a desk`}
                className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />
              <div className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-2xl">{d.title}</h2>
                  <span className="text-xs uppercase tracking-[0.16em] text-mint">{d.pages}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{d.lede}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
