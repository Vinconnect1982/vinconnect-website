import { createFileRoute, Link } from "@tanstack/react-router";
import { CoverageMap } from "@/components/coverage-map";
import { EnquiryForm } from "@/components/enquiry-form";
import { SiteShell } from "@/components/site-shell";
import { WorkAreasDiagram } from "@/components/work-areas-diagram";
import { AREAS, REGIONS } from "@/lib/areas";
import { PROJECTS } from "@/lib/content";

export const Route = createFileRoute("/service-areas/")({
  component: AreasIndex,
  head: () => ({
    meta: [
      { title: "Starlink installation areas | Cranbourne, Peninsula & Gippsland | VINCONNECT" },
      {
        name: "description",
        content:
          "VINCONNECT installs Starlink, Wi-Fi, wireless links and CCTV across Casey, Cardinia, Mornington Peninsula, Bass Coast, South Gippsland and the Latrobe Valley. Map the suburbs we work.",
      },
    ],
  }),
});

function AreasIndex() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">Work areas</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">
          South East Melbourne, the Peninsula, Bass Coast and Gippsland.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Based in Cranbourne. Every suburb below has its own page for Starlink installation, Wi-Fi
          and cameras. Travel is calculated from the address you enter in the estimator — you do
          not work out kilometres.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <WorkAreasDiagram />
          <CoverageMap height={420} />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REGIONS.map((r) => (
            <Link
              key={r.slug}
              to="/service-areas/region/$slug"
              params={{ slug: r.slug }}
              className="overflow-hidden rounded-xl border border-line bg-surface hover:border-mint"
            >
              <img src={r.image} alt="" className="h-40 w-full object-cover" />
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-mint">{r.short}</p>
                <h2 className="mt-2 font-display text-2xl">{r.name}</h2>
                <p className="mt-2 text-sm text-muted">{r.blurb}</p>
                <p className="mt-3 text-sm text-mint">
                  {AREAS.filter((a) => a.region === r.slug).length} suburbs →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="mt-16 font-display text-3xl">All suburbs</h2>
        <p className="mt-2 max-w-2xl text-muted">
          Each page is written for people searching Starlink installation, rural Wi-Fi or cameras
          in that place — and links to nearby jobs and neighbouring suburbs.
        </p>
        <div className="mt-8 columns-1 gap-8 sm:columns-2 lg:columns-3">
          {REGIONS.map((r) => (
            <div key={r.slug} className="mb-8 break-inside-avoid">
              <p className="kicker mb-3">{r.short}</p>
              <ul className="space-y-2 text-sm">
                {AREAS.filter((a) => a.region === r.slug).map((a) => (
                  <li key={a.slug}>
                    <Link
                      to="/service-areas/$slug"
                      params={{ slug: a.slug }}
                      className="text-fg/90 hover:text-mint"
                    >
                      {a.name}{" "}
                      <span className="text-muted">{a.postcode}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="text-sm text-muted">
            {PROJECTS.length} completed projects on the books, each tied back to its suburb page.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <h2 className="font-display text-2xl">Not sure if we come to you?</h2>
            <p className="mt-3 text-muted">
              If your place is on the map, we quote it. If it is further — Wilsons Prom, East
              Gippsland, the high country — say so. Some jobs are a fair day trip; we will tell you
              before anyone drives.
            </p>
          </div>
          <EnquiryForm selectedPackage="Service area enquiry" buttonLabel="Ask about my suburb" />
        </div>
      </div>
    </SiteShell>
  );
}
