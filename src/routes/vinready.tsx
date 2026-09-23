import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/lib/leads";
import { PHONE, PHONE_TEL, SITE_URL } from "@/lib/content";

export const Route = createFileRoute("/vinready")({
  component: VinreadyPage,
  head: () => ({
    meta: [
      { title: "VINREADY by VINCONNECT | Starlink-ready new homes in Victoria" },
      {
        name: "description",
        content:
          "VINREADY prepares new Victorian homes for Starlink during construction. Builders add it as a variation. VINCONNECT handles the specialist pre-wire, fit-off and connection.",
      },
      { property: "og:title", content: "VINREADY by VINCONNECT" },
      {
        property: "og:description",
        content: "Built ready. Connected when you are. Starlink-ready new homes from construction to connection.",
      },
      { property: "og:image", content: `${SITE_URL}/vinready/vinready-estate-hero.webp` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/vinready` }],
  }),
});

const STEPS = [
  {
    n: "01",
    title: "Add VINREADY",
    copy: "Offer it during selections, sales or a contract variation. Your buyer gets another connectivity option before they move in.",
  },
  {
    n: "02",
    title: "Pre-wire",
    copy: "VINCONNECT attends at the right stage and runs the dedicated Starlink-ready cabling before the internal walls are closed.",
  },
  {
    n: "03",
    title: "Fit-off",
    copy: "Once the roof and external finishes are ready, we fit the mounting hardware and finish the internal connection point.",
  },
  {
    n: "04",
    title: "Connect",
    copy: "Around handover, the homeowner arranges Starlink activation. VINCONNECT can complete the equipment install and commissioning.",
  },
];

function VinreadyPage() {
  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "VINREADY by VINCONNECT",
          serviceType: "Starlink-ready new home preparation",
          areaServed: "Victoria, Australia",
          provider: { "@type": "LocalBusiness", name: "VINCONNECT", url: SITE_URL },
          description:
            "Starlink-ready infrastructure installed during construction so a new home can connect at handover. An option alongside NBN, not a replacement.",
        }}
      />

      <section className="relative min-h-[28rem] overflow-hidden">
        <img
          src="/vinready/vinready-estate-hero.webp"
          alt="Victorian new-home estate with houses at frame, lock-up and completion."
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="kicker">VINREADY by VINCONNECT</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl tracking-tight sm:text-6xl">
            Built ready. Connected when you are.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-fg/90">
            Starlink-ready new homes from construction to connection.
          </p>
          <p className="mt-4 max-w-xl text-muted">
            Offer VINREADY as a variation. VINCONNECT handles the specialist work during construction. Your customer moves into a professionally prepared Starlink-ready home.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#builder">Add VINREADY to your homes</a>
            </Button>
            <Button asChild variant="ghost">
              <a href="#process">See how it works</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="kicker">For builders and developers</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl sm:text-4xl">Another connectivity option, ready before move-in.</h2>
        <p className="mt-4 max-w-2xl text-muted">
          VINREADY does not replace NBN. It gives the homeowner a choice: NBN, Starlink, or both, depending on what is available and what they want. The specialist preparation happens while the house is being built, not as a retrofit after handover.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["A variation you can offer", "Add it to selections. Buyers see a finished technology option, not a problem to solve later."],
            ["You do not need to learn Starlink", "VINCONNECT manages the Starlink-specific cabling, mount and connection point."],
            ["Cleaner than a retrofit", "The path is in the wall before plaster, not chased through a finished home."],
            ["A point of difference", "Useful in new estates and regional or fringe areas where internet can be late or limited."],
            ["Documented work", "The home is left with a finished connection point and a record of what was installed."],
            ["Choice at handover", "The buyer can activate when they are ready. Current Starlink offers may vary and are subject to Starlink terms."],
          ].map(([title, copy]) => (
            <li key={title} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted">{copy}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-muted">
          VINREADY can be incorporated into your selections and variations process, giving builders another value-added technology option to offer buyers.
        </p>
      </section>

      <section id="process" className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="kicker">Four steps</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">From variation to connection.</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {STEPS.map((step) => (
              <li key={step.n} className="rounded-xl border border-line bg-surface p-5">
                <p className="font-display text-mint">{step.n}</p>
                <h3 className="mt-2 font-display text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
        <img
          src="/vinready/vinready-prewire.webp"
          alt="Communications cabling clipped through the timber frame of a new home before plaster."
          className="h-80 w-full rounded-xl object-cover"
          loading="lazy"
        />
        <div>
          <p className="kicker">Two ways to finish it</p>
          <h2 className="mt-3 font-display text-3xl">Where the connection lands.</h2>
          <p className="mt-3 text-muted">
            VINCONNECT agrees a suitable location with the builder before rough-in. Most homes use one of these two arrangements.
          </p>
          <div className="mt-6 space-y-5">
            <div>
              <h3 className="font-display text-xl">Data cabinet ready</h3>
              <p className="mt-1 text-sm text-muted">
                The Starlink-ready connection terminates in the home’s communications or data cabinet. Suits structured cabling, central networking, Wi-Fi access points, smart-home gear and CCTV.
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl">Dedicated router location</h3>
              <p className="mt-1 text-sm text-muted">
                The connection terminates at a chosen internal wall, on a finished plate near a suitable power point.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-2">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
          <figure>
            <img src="/vinready/vinready-roof-fitoff.webp" alt="Rectangular Starlink mount being fitted to a new Colorbond roof." className="h-56 w-full rounded-xl object-cover" loading="lazy" />
            <figcaption className="mt-3 text-sm text-muted">Mounting prepared once the roof is ready, not after the owner has moved in.</figcaption>
          </figure>
          <figure>
            <img src="/vinready/vinready-connection-plate.webp" alt="Finished internal connection plate beside an Australian power point." className="h-56 w-full rounded-xl object-cover" loading="lazy" />
            <figcaption className="mt-3 text-sm text-muted">A finished internal point, ready for the router when the home is occupied.</figcaption>
          </figure>
          <figure>
            <img src="/vinready/vinready-builder-buyer.webp" alt="A site supervisor speaking with buyers outside a nearly finished Australian home." className="h-56 w-full rounded-xl object-cover" loading="lazy" />
            <figcaption className="mt-3 text-sm text-muted">A straightforward upgrade to explain at selections or handover.</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl">What VINREADY may include</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            "Dedicated Starlink-compatible cabling",
            "A professionally finished internal connection point",
            "Weather-protected external cable termination",
            "Permanent roof or wall mounting preparation",
            "A pole or mount adaptor where the building needs one",
            "Cable protection and routing",
            "Installation documentation",
            "Final activation and commissioning support",
          ].map((item) => (
            <li key={item} className="border-l-2 border-mint pl-4 text-sm">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-muted">
          When the home is ready, the homeowner can scan their VINREADY activation code to view the current Starlink offer and continue with activation. Current Starlink offers may vary and are subject to Starlink terms.
        </p>
        <p className="mt-4 text-sm">
          <AppLink to="/starlink-offer" className="text-mint">View the current Starlink offer</AppLink>
          {" · "}
          <AppLink to="/resources/new-home-starlink-ready" className="text-mint">New-home notes</AppLink>
          {" · "}
          <AppLink to="/services/starlink-installation" className="text-mint">Starlink installation</AppLink>
        </p>
      </section>

      <section id="builder" className="border-t border-line bg-ink-2">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="kicker">Builders</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Talk to VINCONNECT about VINREADY.</h2>
            <p className="mt-4 text-muted">
              Tell us where you are building and roughly how many homes. We’ll explain how VINREADY fits your selections process. No public price list — the variation is quoted for the homes you are actually building.
            </p>
            <p className="mt-6 text-sm text-muted">
              Or call <a className="text-mint" href={PHONE_TEL}>{PHONE}</a>.
            </p>
          </div>
          <BuilderForm />
        </div>
      </section>
    </SiteShell>
  );
}

function BuilderForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (String(fd.get("website") || "")) return;
    const company = String(fd.get("company") || "").trim();
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const areas = String(fd.get("areas") || "").trim();
    const homes = String(fd.get("homes") || "").trim();
    const estates = String(fd.get("estates") || "").trim();
    const note = String(fd.get("message") || "").trim();
    setStatus("saving");
    setError("");
    try {
      await submitLead({
        data: {
          type: "vinready",
          name,
          email,
          phone,
          suburb: areas,
          package: "VINREADY builder",
          message: [
            `Company: ${company}`,
            homes ? `Homes per year: ${homes}` : "",
            estates ? `Developments: ${estates}` : "",
            "",
            note,
          ]
            .filter(Boolean)
            .join("\n"),
        },
      });
      e.currentTarget.reset();
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-xl border border-line bg-surface p-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <Label>
        Company name
        <Input name="company" required maxLength={200} className="border-line bg-raised" />
      </Label>
      <Label>
        Contact name
        <Input name="name" required autoComplete="name" maxLength={200} className="border-line bg-raised" />
      </Label>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label>
          Phone
          <Input name="phone" type="tel" required autoComplete="tel" maxLength={30} className="border-line bg-raised" />
        </Label>
        <Label>
          Email
          <Input name="email" type="email" required autoComplete="email" maxLength={200} className="border-line bg-raised" />
        </Label>
      </div>
      <Label>
        Areas or suburbs you are building in
        <Input name="areas" required maxLength={300} className="border-line bg-raised" />
      </Label>
      <div className="grid gap-4 sm:grid-cols-2">
        <Label>
          Approximate homes per year
          <Input name="homes" maxLength={40} className="border-line bg-raised" />
        </Label>
        <Label>
          Current developments or estates
          <Input name="estates" maxLength={200} className="border-line bg-raised" />
        </Label>
      </div>
      <Label>
        Message
        <Textarea name="message" required maxLength={4000} className="border-line bg-raised" />
      </Label>
      <Button type="submit" disabled={status === "saving" || status === "done"}>
        {status === "saving" ? "Sending…" : "Request builder information"}
      </Button>
      {status === "done" && <p className="text-sm text-ok">Thanks. VINCONNECT has your VINREADY enquiry.</p>}
      {status === "error" && (
        <p role="alert" className="text-sm text-danger">
          {error} Call {PHONE}.
        </p>
      )}
    </form>
  );
}
