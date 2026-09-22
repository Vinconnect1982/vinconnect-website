import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { SiteShell } from "@/components/site-shell";
import { PROJECTS } from "@/lib/content";

export const Route = createFileRoute("/projects/")({
  component: ProjectsIndex,
  head: () => ({
    meta: [{ title: "Starlink & Network Installation Projects in Victoria | VINCONNECT" }],
  }),
});

function ProjectsIndex() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">Completed projects</p>
        <h1 className="mt-3 font-display text-4xl">Connected in the real world.</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Recent Starlink, Wi-Fi and CCTV installations across South East Melbourne, the Peninsula
          and Gippsland. These are completed jobs — not proposals, and not Circl work-order records.
        </p>
        <p className="mt-3 text-sm">
          <AppLink to="/solutions" className="text-mint">
            Solutions by property type
          </AppLink>
          {" · "}
          <AppLink to="/starlink" className="text-mint">
            Starlink guides
          </AppLink>
          {" · "}
          <Link to="/service-areas" className="text-mint">
            Work areas
          </Link>
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="group">
              <img src={p.image} alt="" className="h-48 w-full rounded-xl object-cover" />
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-mint">{p.place}</p>
              <h2 className="mt-1 font-display text-xl">{p.title}</h2>
              <p className="mt-2 text-sm text-muted">{p.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
