import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { SERVICES } from "@/lib/content";

export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
  head: () => ({ meta: [{ title: "Installation services | VINCONNECT" }] }),
});

function ServicesIndex() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">All services</p>
        <h1 className="mt-3 font-display text-4xl">Work scoped around the property.</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Starlink, Wi-Fi, wireless links, CCTV and touring installs — specified for the buildings
          you actually use.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="link-card rounded-xl border border-line bg-surface p-5"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-mint">{s.kicker}</p>
              <h2 className="mt-2 font-display text-2xl">{s.title}</h2>
              <p className="mt-2 text-sm text-muted">{s.lede}</p>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
