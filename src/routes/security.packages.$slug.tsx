import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/enquiry-form";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { HILOOK_PACKAGES, PRICE_NOTE, packageBySlug } from "@/lib/packages";

export const Route = createFileRoute("/security/packages/$slug")({
  component: PackagePage,
  loader: ({ params }) => {
    const pkg = packageBySlug(params.slug);
    if (!pkg) throw notFound();
    const others = HILOOK_PACKAGES.filter((p) => p.slug !== pkg.slug);
    return { pkg, others };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.pkg.name ?? "HiLook"} CCTV package | VINCONNECT`,
      },
      { name: "description", content: loaderData?.pkg.lede },
    ],
  }),
});

function aud(n: number) {
  return `$${n.toLocaleString("en-AU")}`;
}

function PackagePage() {
  const { pkg, others } = Route.useLoaderData();
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">
          <Link to="/security/$slug" params={{ slug: "hilook-cctv-packages" }} className="hover:text-mint">
            HiLook CCTV
          </Link>
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">{pkg.name}.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{pkg.lede}</p>
        <img src={pkg.image} alt="" className="mt-8 h-72 w-full rounded-xl object-cover sm:h-96" />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-mint">Hardware from</p>
            <p className="mt-2 font-display text-3xl">{aud(pkg.hardwareFrom)}</p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-mint">Labour from</p>
            <p className="mt-2 font-display text-3xl">{aud(pkg.labourFrom)}</p>
          </div>
          <div className="rounded-xl border border-mint bg-surface p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-mint">Typical supply & install</p>
            <p className="mt-2 font-display text-3xl">{aud(pkg.packageFrom)}</p>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted">{PRICE_NOTE}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-10">
            <section>
              <h2 className="font-display text-2xl">What is in the kit</h2>
              <ul className="mt-4 space-y-2 text-muted">
                <li>{pkg.cameras}</li>
                <li>{pkg.nvr}</li>
                <li>{pkg.storage}</li>
              </ul>
            </section>
            <section>
              <h2 className="font-display text-2xl">Suitable uses</h2>
              <p className="mt-2 text-sm text-muted">{pkg.bestFor}</p>
              <ul className="facts mt-4 grid sm:grid-cols-2 sm:gap-x-10">
                {pkg.uses.map((u) => (
                  <li key={u} className="text-sm">
                    {u}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-display text-2xl">Planned views</h2>
              <p className="mt-3 text-muted">{pkg.views.join(" · ")}</p>
            </section>
            <section>
              <h2 className="font-display text-2xl">Specs</h2>
              <dl className="mt-4 divide-y divide-line rounded-xl border border-line">
                {pkg.specs.map((s) => (
                  <div key={s.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[10rem_minmax(0,1fr)]">
                    <dt className="text-sm text-mint">{s.label}</dt>
                    <dd className="text-sm text-muted">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section>
              <h2 className="font-display text-2xl">Included in a VINCONNECT install</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
                {pkg.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <h3 className="mt-6 font-display text-xl">Not included unless quoted</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
                {pkg.notIncluded.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-display text-2xl">Other HiLook packages</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      to="/security/packages/$slug"
                      params={{ slug: o.slug }}
                      className="link-card rounded-xl border border-line bg-surface p-4"
                    >
                      <span className="font-display">{o.name}</span>
                      <span className="mt-1 block text-sm text-muted">{aud(o.packageFrom)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <p className="text-sm">
              <Link to="/resources/downloads/$slug" params={{ slug: "hilook-package-sheet" }} className="text-mint">
                Download the comparison sheet →
              </Link>
            </p>
          </div>
          <div>
            <EnquiryForm
              selectedPackage={pkg.name}
              buttonLabel="Request this package quote"
              initialMessage={`Interested in ${pkg.name}.`}
            />
            <Button asChild variant="ghost" className="mt-4 w-full">
              <Link to="/property-planner">Mark camera views on the planner</Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
