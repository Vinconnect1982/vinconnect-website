import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/about/safety-and-credentials")({
  component: SafetyPage,
  head: () => ({
    meta: [{ title: "Safety & credentials | VINCONNECT" }],
  }),
});

const ITEMS = [
  { title: "ACMA Registered Open Cabler", copy: "Cabling work is carried out as an ACMA registered open cabler." },
  { title: "Working at Heights", copy: "Roof and elevated work is planned with current working-at-heights competency." },
  { title: "White Card", copy: "Construction induction for sites that require it." },
  { title: "Public Liability & WorkCover", copy: "Insured for the work we quote. Certificates available on request." },
  { title: "Site conduct", copy: "Access, pets, horses and occupied homes are treated as part of the job plan, not an afterthought." },
];

function SafetyPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">Safety & credentials</p>
        <h1 className="mt-3 font-display text-4xl">Work that is insured, licensed and tidy.</h1>
        <p className="mt-4 text-muted">
          Credentials are how we get on a roof or into a rack without leaving you to guess. Ask for
          current tickets with the quote if you need them on file.
        </p>
        <ul className="mt-8 space-y-4">
          {ITEMS.map((item) => (
            <li key={item.title} className="rounded-lg border border-line bg-surface p-5">
              <h2 className="font-display text-xl">{item.title}</h2>
              <p className="mt-2 text-sm text-muted">{item.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}
