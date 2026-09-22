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
          "VINCONNECT PDFs: capability statement, Starlink install guide, HiLook comparison, Event Link one-pager, camera worksheet and install-day prep.",
      },
    ],
  }),
});

function DownloadsIndex() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">Information hub</p>
        <h1 className="mt-3 font-display text-4xl">Downloadable guides.</h1>
        <p className="mt-4 text-muted">
          Practical PDFs. Leave your details once, then keep the file. Nothing here is a paywall —
          it is so we know who in the region is planning work.
        </p>
        <div className="mt-10 grid gap-4">
          {DOWNLOADS.map((d) => (
            <Link
              key={d.slug}
              to="/resources/downloads/$slug"
              params={{ slug: d.slug }}
              className="rounded-xl border border-line bg-surface p-5 hover:border-mint"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-2xl">{d.title}</h2>
                <span className="text-xs uppercase tracking-[0.16em] text-mint">{d.pages}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{d.lede}</p>
              <p className="mt-3 text-xs text-muted">{d.topics.join(" · ")}</p>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
