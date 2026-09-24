import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/lib/leads";
import { deliverLeadEmail } from "@/lib/lead-mail";
import { PHONE, PHONE_TEL, SITE_URL } from "@/lib/content";

export const Route = createFileRoute("/vinready")({
  component: VinreadyPage,
  head: () => ({
    meta: [
      { title: "VinReady for builders | Starlink ready homes | VINCONNECT" },
      {
        name: "description",
        content:
          "Offer Starlink as an upgrade or standard inclusion on your new homes. Your buyers activate on move-in day and you add your own margin on top.",
      },
      { property: "og:title", content: "VinReady: Starlink ready from day one" },
      {
        property: "og:description",
        content: "Your buyers can activate Starlink on move-in day, with no waiting on an NBN lead-in.",
      },
      { property: "og:image", content: `${SITE_URL}/vinready/vinready-estate-hero.webp` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/vinready` }],
  }),
});

const BUSINESS = [
  ["A new margin line.", "A strong margin opportunity. You set the price your buyers see."],
  ["Upgrade or inclusion.", "Sell it as an upgrade, or make it standard on every home."],
  ["A point of difference.", "Starlink is what buyers are asking about. It sets your homes apart."],
  ["Scheduled to your build.", "Our scheduling software ties installs to your build dates."],
  ["Fewer post-handover calls.", "The handover pack answers activation questions. Install or activation queries come to us on 0408 559 555."],
  ["Less lead-in hassle.", "Knockdown rebuilds skip lead-in reinstatement. On new builds, a forgotten conduit, a missing pull cord or a late NBN rollout will not hold up move-in."],
];

const BUYERS = [
  ["No lead-in wait.", "Nobody waits on an NBN lead-in, or for NBN or Opticomm to reach the estate."],
  ["Live at switch-on.", "The full kit is live the moment it is powered up, activated in the Starlink app."],
  ["Their choice.", "Starlink Ready homes can be NBN ready too."],
  ["Rural blocks covered.", "It works where there is no NBN or fibre."],
  ["Smoother settlement.", "Internet is sorted at handover, so there is nothing to chase before move-in."],
  ["Handover pack included.", "Every buyer gets a VinReady home-buyer handover pack."],
];

const STEPS = [
  ["01", "You add it.", "Upgrade or standard inclusion. Tell us the lot and the option."],
  ["02", "We schedule it.", "Our software ties the install to your build dates."],
  ["03", "We do the work.", "Starlink work is done during the build, through your site contact."],
  ["04", "Handover.", "Your buyer gets the handover pack. Option 1 is a final fit-off. Option 2 is self-activate."],
];

const FAQS = [
  ["What does it cost us?", "Your builder cost depends on the option and the home, and you add your own margin on top. The full pricing is in the builder pack. Leave your details and we will send it through."],
  ["Upgrade or standard inclusion?", "Either. Sell it as an upgrade, or make it standard on every home."],
  ["Who orders Starlink?", "Option 1: your buyer orders direct from Starlink and contacts us for final fit-off. Option 2: we supply a full hardware kit, dish included, and your buyer self-activates."],
  ["When can buyers get online?", "On move-in day, with no waiting on an NBN lead-in. With the full kit, your buyer taps Activate Starlink in the Starlink app and it is live the moment the dish is powered up."],
  ["How does it compare with NBN?", "It is another way to get online. Starlink is price-competitive with NBN plans, with no lead-in or estate rollout to wait on."],
  ["How do you fit in with our program?", "Our scheduling software ties installs to your build dates and manages build calendars for volume builders."],
  ["What does the buyer get at handover?", "A VinReady home-buyer handover pack, included."],
  ["Do you guarantee speeds?", "No. We do not quote speeds. Performance depends on Starlink's service at the address."],
  ["Is VINCONNECT part of Starlink or NBN?", "No. VINCONNECT is an independent installer. VinReady is our builder offer."],
  ["Our estate already has NBN or fibre.", "Starlink Ready works alongside NBN readiness. It adds a choice for your buyers and does not replace anything."],
  ["It is another trade to manage.", "It is one local installer, booked against your build calendar. Your supervisors do not chase an extra trade."],
  ["What about the roof?", "On tile roofs we use an under-tile J-pole (hockey-stick) mount. The bracket fixes to the side of a roof truss and the tile slides back over it, so no tiles are drilled. On Colorbond roofs we use a tripod tied down to the roof's existing screws, so there are no new holes. We never use ridge mounts. Talk to us about your roofing supplier's requirements."],
];

function VinreadyPage() {
  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "VinReady by VINCONNECT",
          serviceType: "Starlink-ready new homes for builders",
          areaServed: "Victoria, Australia",
          provider: { "@type": "LocalBusiness", name: "VINCONNECT", url: SITE_URL },
          description: "Builders offer VinReady so new homes can activate Starlink on move-in day.",
        }}
      />

      <section className="relative min-h-[28rem] overflow-hidden">
        <img
          src="/vinready/vinready-estate-hero.webp"
          alt="Illustrative new-home estate."
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="kicker">VinReady · For builders</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl tracking-tight sm:text-6xl">Starlink ready from day one</h1>
          <p className="mt-4 max-w-xl text-lg text-fg/90">
            The builder offer your buyers ask for, with margin built in. Your buyers can activate Starlink on move-in day.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild>
              <a href="#pack">Get the builder pack</a>
            </Button>
            <a className="text-sm text-fg/80" href={PHONE_TEL}>Prefer to talk? Call {PHONE}</a>
          </div>
          <p className="mt-6 text-xs text-muted">Image: illustrative</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl">Why builders add VinReady</h2>
        <p className="mt-3 text-muted">Internet stops being a build cost and starts earning.</p>
        <h3 className="mt-8 font-display text-xl">For your business</h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BUSINESS.map(([title, copy]) => (
            <li key={title} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-display text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted">{copy}</p>
            </li>
          ))}
        </ul>
        <h3 className="mt-10 font-display text-xl">For your buyers</h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BUYERS.map(([title, copy]) => (
            <li key={title} className="rounded-xl border border-line bg-surface p-5">
              <h3 className="font-display text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted">{copy}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-3xl">A strong margin opportunity</h2>
          <p className="mt-3 max-w-2xl text-muted">
            You set the price your buyers see. Your builder cost and a worked example are in the builder pack, not on this page.
          </p>
          <a href="#pack" className="mt-4 inline-block text-mint">Get the builder pack for pricing</a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl">Two ways to offer it</h2>
        <p className="mt-3 text-muted">Offer one option or both.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-display text-2xl">Option 1 · Starlink Ready</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>We make the home Starlink ready.</li>
              <li>Your buyer orders direct from Starlink.</li>
              <li>Your buyer contacts us for final fit-off.</li>
              <li>Activate on move-in day, with no NBN lead-in wait.</li>
              <li>Suits buyers who want to order their own Starlink, with the home NBN ready too.</li>
            </ul>
          </article>
          <article className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-display text-2xl">Option 2 · Full hardware kit</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>We supply a full hardware kit, dish included.</li>
              <li>Hardware is supplied by us.</li>
              <li>Your buyer self-activates.</li>
              <li>Live the moment it is powered up, with no NBN lead-in wait.</li>
              <li>Suits buyers who want it all in place, ready to switch on.</li>
            </ul>
          </article>
        </div>
        <p className="mt-4 max-w-2xl text-sm text-muted">
          Builder pricing for both options is in the builder pack. The Starlink subscription is always between your buyer and Starlink.
        </p>
      </section>

      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
          <img src="/vinready/vinready-prewire.webp" alt="Illustrative new home at frame stage." className="h-80 w-full rounded-xl object-cover" loading="lazy" />
          <div>
            <h2 className="font-display text-3xl">Built into your program</h2>
            <p className="mt-3 text-muted">Scheduled to your build dates, not squeezed in after.</p>
            <ol className="mt-6 space-y-4">
              {STEPS.map(([n, title, copy]) => (
                <li key={n}>
                  <p className="font-display text-mint">{n}</p>
                  <h3 className="font-display text-xl">{title}</h3>
                  <p className="text-sm text-muted">{copy}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted">Building at volume? Our scheduling software manages build calendars across your homes. Access and timing are set by your site team.</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img src="/vinready/vinready-builder-buyer.webp" alt="Illustrative conversation at a display home." className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/75" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-3xl">Your go-to Starlink answer</h2>
          <p className="mt-2 text-muted">When a buyer asks, your sales team has the answer.</p>
          <blockquote className="mt-6 font-display text-2xl leading-snug">
            “Yes. This home can be VinReady. It is set up for Starlink during the build, so you can activate it on the day you move in, with no waiting for an NBN lead-in.”
          </blockquote>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl">Keys in. Online today.</h2>
          <p className="mt-3 text-muted">Your buyers can activate Starlink the day they move in.</p>
        </div>
        <ul className="space-y-3 text-sm text-muted">
          <li>Starlink is an alternative to NBN at move-in.</li>
          <li>Full kit: buyers tap Activate Starlink in the Starlink app. It is live the moment it is powered up.</li>
          <li>The handover pack explains activation. Install or activation questions: {PHONE}.</li>
          <li>Starlink Ready leaves NBN open, so the buyer decides.</li>
          <li>It suits rural addresses without NBN or fibre.</li>
          <li>No guaranteed speeds. Performance depends on Starlink’s service at the address.</li>
        </ul>
      </section>

      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 className="font-display text-2xl">Where we work</h2>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {["Cranbourne", "Southeast Melbourne", "Western Port", "Mornington Peninsula", "Phillip Island and Bass Coast", "Gippsland"].map((place) => (
              <li key={place} className="rounded-full border border-line px-3 py-2">{place}</li>
            ))}
          </ul>
          <ul className="mt-4 flex flex-wrap gap-2 text-sm">
            {[
              ["clyde-north", "Clyde North"],
              ["clyde", "Clyde"],
              ["cranbourne-east", "Cranbourne East"],
              ["officer", "Officer"],
              ["pakenham", "Pakenham"],
            ].map(([slug, label]) => (
              <li key={slug}>
                <Link to="/service-areas/$slug" params={{ slug }} className="text-mint">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl">Common questions</h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {FAQS.map(([q, a]) => (
            <details key={q} className="py-3">
              <summary className="cursor-pointer font-display text-lg">{q}</summary>
              <p className="mt-2 text-sm text-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="pack" className="border-t border-line bg-ink-2">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <img src="/media/downloads/vinready-builder-pack-desk.webp" alt="The VinReady builder pack printed on a desk." className="aspect-[16/10] w-full rounded-xl object-cover" />
            <h2 className="mt-6 font-display text-3xl">Add VinReady to your homes</h2>
            <p className="mt-3 text-muted">Tell us where you build. We will show you how it fits.</p>
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
  const [intent, setIntent] = useState("pack");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (String(fd.get("website") || "")) return;
    setStatus("saving");
    setError("");
    const payload = {
      type: "vinready",
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      suburb: String(fd.get("area") || ""),
      package: "VinReady builder pack",
      message: [
        `Intent: ${intent}`,
        `Company: ${fd.get("company") || ""}`,
        `Role: ${fd.get("role") || ""}`,
        `Offer: ${fd.get("offer") || ""}`,
        `Build dates: ${fd.get("dates") || ""}`,
        "",
        String(fd.get("message") || "Builder pack request"),
      ].join("\n"),
    };
    try {
      const sent = await submitLead({ data: payload });
      if (!sent.emailed) await deliverLeadEmail(payload);
      e.currentTarget.reset();
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something didn't send.");
    }
  }

  const button =
    intent === "chat" ? "Request a chat about VinReady" : intent === "call" ? "Request a call back" : "Send me the builder pack";

  if (status === "done") {
    return (
      <div className="rounded-xl border border-line bg-surface p-5">
        <p className="text-sm text-ok">Thanks. Your details are with VINCONNECT. The builder pack, including the pricing, is ready below.</p>
        <Button asChild className="mt-4">
          <a href="/downloads/vinready-builder-pack.pdf" download>Download the builder pack</a>
        </Button>
        <p className="mt-3 text-sm text-muted">If you would rather talk now, call {PHONE}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-xl border border-line bg-surface p-5">
      <h3 className="font-display text-2xl">Get the VinReady builder pack</h3>
      <p className="text-sm text-muted">
        Eight pages on the two options, your cost and margin, how it compares with NBN, scheduling, the handover pack and common builder questions. Leave your details and we will send it through.
      </p>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <fieldset className="grid gap-2 text-sm">
        <legend className="font-display">What are you after?</legend>
        {[
          ["pack", "Send me the builder pack"],
          ["chat", "Talk about VinReady as an upgrade or standard inclusion"],
          ["call", "Call me back"],
        ].map(([value, label]) => (
          <label key={value} className="flex items-center gap-2">
            <input type="radio" name="intent" value={value} checked={intent === value} onChange={() => setIntent(value)} />
            {label}
          </label>
        ))}
      </fieldset>
      <Label>Your name<Input name="name" required autoComplete="name" placeholder="First and last" maxLength={200} className="border-line bg-raised" /></Label>
      <Label>Builder / company<Input name="company" required placeholder="Company name" maxLength={200} className="border-line bg-raised" /></Label>
      <Label>Your role<Input name="role" placeholder="Sales manager, estimator, site supervisor" maxLength={120} className="border-line bg-raised" /></Label>
      <Label>Work email<Input name="email" type="email" required autoComplete="email" placeholder="name@builder.com.au" maxLength={200} className="border-line bg-raised" /></Label>
      <Label>Mobile<Input name="phone" type="tel" required autoComplete="tel" placeholder="04xx xxx xxx" maxLength={30} className="border-line bg-raised" /></Label>
      <Label>Where you build<Input name="area" placeholder="Clyde North, Warragul" maxLength={200} className="border-line bg-raised" /></Label>
      <Label>
        How you'd offer it
        <select name="offer" className="mt-1 h-11 w-full rounded-md border border-line bg-raised px-3 text-sm">
          <option>Not sure yet</option>
          <option>Upgrade</option>
          <option>Standard inclusion</option>
        </select>
      </Label>
      <Label>Upcoming build dates<Input name="dates" placeholder="First homes at frame in November" maxLength={200} className="border-line bg-raised" /></Label>
      <Label>Anything we should know<Textarea name="message" placeholder="Display homes, questions" maxLength={4000} className="border-line bg-raised" /></Label>
      <p className="text-xs text-muted">We'll use your details to send the builder pack and follow up about VinReady. We don't sell your details.</p>
      <Button type="submit" disabled={status === "saving"}>{status === "saving" ? "Sending…" : button}</Button>
      {status === "error" && <p role="alert" className="text-sm text-danger">{error} Call {PHONE}.</p>}
      <p className="text-sm text-muted">Prefer to talk? <a className="text-mint" href={PHONE_TEL}>Call {PHONE}</a></p>
    </form>
  );
}
