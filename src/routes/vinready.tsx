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
          "Offer Starlink as an upgrade or standard inclusion on your new homes. Your buyers activate on move-in day. Builder pricing is in the pack.",
      },
      { property: "og:title", content: "VinReady: Starlink ready from day one" },
      {
        property: "og:description",
        content: "The builder offer your buyers ask for. Activate on move-in day.",
      },
      { property: "og:image", content: `${SITE_URL}/vinready/pack/cover.webp` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/vinready` }],
  }),
});

const WHY = [
  ["01", "A new margin line.", "You set the price your buyers see. Your cost and a worked example are in the builder pack."],
  ["02", "Upgrade or inclusion.", "Sell it as an upgrade, or make it standard on every home."],
  ["03", "Online on move-in day.", "Your buyers can activate Starlink the day they move in."],
  ["04", "No lead-in wait.", "Nobody waits on an NBN lead-in, or for the estate rollout to catch up."],
  ["05", "Scheduled to your build.", "Installs are tied to your build dates, not squeezed in after handover."],
  ["06", "Handover pack included.", "Every buyer gets a VinReady home-buyer handover pack."],
];

const STAGES = [
  ["1  Frame", "Mark the cable path while the frame is still open."],
  ["2  Lock-up", "Mount point and a weatherproof entry. No dish yet."],
  ["3  Near handover", "Rectangular dish on the roof. Router at the point inside."],
];

const FAQS = [
  ["What does it cost us?", "Your builder cost depends on the option and the home, and you add your own margin. The ranges and a worked example are in the builder pack, not on this page."],
  ["Upgrade or standard inclusion?", "Either. Sell it as an upgrade, or make it standard on every home."],
  ["Who orders Starlink?", "Option 1: your buyer orders direct from Starlink and contacts us for final fit-off. Option 2: we supply a full hardware kit, dish included, and your buyer self-activates."],
  ["When can buyers get online?", "On move-in day. With the full kit, they tap Activate Starlink in the app and it is live when the dish is powered up."],
  ["How does it compare with NBN?", "It is another way to get online. It does not replace NBN. Buyers can still choose NBN when it suits them."],
  ["What about the roof?", "Tile roofs use an under-tile J-pole. Colorbond uses a tripod on the existing screws. We do not use ridge mounts. Talk to us about your roofing supplier."],
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

      <section className="relative min-h-[34rem] overflow-hidden text-white">
        <img src="/vinready/pack/cover.webp" alt="Dusk street of new Australian homes, one rectangular Starlink dish on the nearest roof." className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071018]/80 via-[#071018]/35 to-[#071018]/70" />
        <div className="relative mx-auto flex min-h-[34rem] max-w-6xl flex-col justify-end px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#7fd4d0]">VINREADY · FOR BUILDERS</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl tracking-tight sm:text-7xl">Starlink ready<br />from day one</h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">The builder offer your buyers ask for, with margin built in.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild>
              <a href="#pack">Get the builder pack</a>
            </Button>
            <a className="text-sm text-white/80" href={PHONE_TEL}>Prefer to talk? Call {PHONE}</a>
          </div>
          <p className="mt-8 text-xs text-white/70">Cranbourne to Gippsland · Image: illustrative</p>
        </div>
      </section>

      <section id="why" className="bg-[#F6F4F0] text-[#102033]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[#149C9C]">WHY VINREADY</p>
            <h2 className="mt-2 font-display text-4xl">Why builders add VinReady</h2>
            <p className="mt-3 text-[#5C6770]">Internet stops being a build cost and starts earning.</p>
            <ol className="mt-8 grid gap-6 sm:grid-cols-2">
              {WHY.map(([n, title, copy]) => (
                <li key={n}>
                  <p className="font-display text-[#149C9C]">{n}</p>
                  <h3 className="font-display text-xl">{title}</h3>
                  <p className="mt-1 text-sm text-[#5C6770]">{copy}</p>
                </li>
              ))}
            </ol>
          </div>
          <figure>
            <img src="/vinready/pack/frame.webp" alt="Australian volume-builder home at timber frame stage." className="h-full max-h-[36rem] w-full object-cover" />
            <figcaption className="mt-2 text-xs text-[#5C6770]">Frame stage. The cable path goes in while the house is still open. Image: illustrative.</figcaption>
          </figure>
        </div>
      </section>

      <section className="border-y border-[#D9D4CC] bg-white text-[#102033]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#149C9C]">THE MARGIN</p>
          <h2 className="mt-2 font-display text-4xl">Your cost. Your margin.</h2>
          <p className="mt-3 max-w-2xl text-[#5C6770]">You set the price your buyers see. The builder cost, the margin range and a worked example are in the pack. They are not listed on this page.</p>
          <a href="#pack" className="mt-5 inline-block font-semibold text-[#0E7C7C]">Get the builder pack for pricing</a>
        </div>
      </section>

      <section id="options" className="bg-[#F6F4F0] text-[#102033]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#149C9C]">TWO OPTIONS</p>
          <h2 className="mt-2 font-display text-4xl">Two ways to offer it</h2>
          <p className="mt-3 text-[#5C6770]">Offer one option or both.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="bg-[#16324A] p-6 text-white">
              <p className="text-xs tracking-[0.14em] text-[#7fd4d0]">OPTION 1</p>
              <h3 className="mt-2 font-display text-3xl">Starlink Ready</h3>
              <ul className="mt-5 space-y-3 text-sm text-white/85">
                <li>We make the home Starlink ready.</li>
                <li>Your buyer orders direct from Starlink.</li>
                <li>Your buyer contacts us for final fit-off.</li>
                <li>Activate on move-in day. No lead-in wait.</li>
                <li>Suits buyers who want their own dish, with NBN still open.</li>
              </ul>
            </article>
            <article className="bg-[#149C9C] p-6 text-[#062226]">
              <p className="text-xs tracking-[0.14em]">OPTION 2</p>
              <h3 className="mt-2 font-display text-3xl">Full hardware kit</h3>
              <ul className="mt-5 space-y-3 text-sm">
                <li>We supply a full hardware kit, dish included.</li>
                <li>Hardware is supplied by us.</li>
                <li>Your buyer self-activates.</li>
                <li>Live when it is powered up. No lead-in wait.</li>
                <li>Suits buyers who want it in place, ready to switch on.</li>
              </ul>
            </article>
          </div>
          <p className="mt-4 text-sm text-[#5C6770]">Builder pricing for both options is in the pack. The Starlink subscription stays between your buyer and Starlink.</p>
        </div>
      </section>

      <section id="program" className="bg-white text-[#102033]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#149C9C]">HOW IT WORKS</p>
          <h2 className="mt-2 font-display text-4xl">Built into your program</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1", "You add it", "Upgrade or inclusion. Tell us the lot and the option."],
              ["2", "We schedule it", "The install is tied to your build dates."],
              ["3", "We do the work", "Done during the build, through your site contact."],
              ["4", "Handover", "Pack included. Option 1 is fit-off. Option 2 is self-activate."],
            ].map(([n, title, copy]) => (
              <li key={n}>
                <p className="font-display text-2xl text-[#149C9C]">{n}</p>
                <h3 className="font-display text-xl">{title}</h3>
                <p className="mt-1 text-sm text-[#5C6770]">{copy}</p>
              </li>
            ))}
          </ol>
          <ol className="mt-10 grid gap-3 md:grid-cols-3">
            {STAGES.map(([title, copy]) => (
              <li key={title} className="bg-[#F6F4F0] p-5">
                <h3 className="font-display text-xl">{title}</h3>
                <p className="mt-2 text-sm text-[#5C6770]">{copy}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <figure>
              <img src="/vinready/pack/frame.webp" alt="Timber frame on a new Australian estate." className="h-64 w-full object-cover" />
              <figcaption className="mt-2 text-xs text-[#5C6770]">Frame. Image: illustrative.</figcaption>
            </figure>
            <figure>
              <img src="/vinready/pack/home.webp" alt="Finished Australian project home with a rectangular Starlink dish on the roof." className="h-64 w-full object-cover" />
              <figcaption className="mt-2 text-xs text-[#5C6770]">Finished roof, rectangular dish. Image: illustrative.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="relative min-h-[28rem] overflow-hidden text-white">
        <img src="/vinready/pack/home.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#071018]/72" />
        <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#7fd4d0]">THE SALES ANSWER</p>
          <h2 className="mt-3 font-display text-4xl">Your go-to Starlink answer</h2>
          <blockquote className="mt-6 font-display text-2xl leading-snug sm:text-3xl">
            “Yes. This home can be VinReady. It is set up for Starlink during the build, so you can activate it on the day you move in, with no waiting for an NBN lead-in.”
          </blockquote>
          <ul className="mt-8 space-y-4 text-sm text-white/85">
            <li><strong className="text-white">How does it compare with NBN?</strong> Another way to get online. It does not replace NBN.</li>
            <li><strong className="text-white">Which option?</strong> Option 1: they order Starlink, we fit off. Option 2: the kit is supplied and they activate it.</li>
            <li><strong className="text-white">At handover?</strong> A VinReady home-buyer pack. Install questions come to {PHONE}.</li>
          </ul>
        </div>
      </section>

      <section className="bg-[#F6F4F0] text-[#102033]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.16em] text-[#149C9C]">MOVE-IN DAY</p>
          <h2 className="mt-2 font-display text-4xl">Keys in. Online today.</h2>
          <p className="mt-3 max-w-2xl text-[#5C6770]">Your buyers can activate Starlink the day they move in. With the full kit, it is live when the dish is powered up.</p>
          <img src="/vinready/pack/compare.webp" alt="VinReady during the build compared with a retrofit after handover." className="mt-8 w-full bg-white" />
          <p className="mt-2 text-xs text-[#5C6770]">Illustrative comparison. Not a promise about a particular estate.</p>
          <ul className="mt-6 max-w-2xl space-y-2 text-sm text-[#5C6770]">
            <li>Starlink is an alternative at move-in. NBN can stay available.</li>
            <li>No guaranteed speeds. Performance depends on Starlink at that address.</li>
            <li>VINCONNECT is an independent installer. Not part of Starlink or NBN.</li>
          </ul>
        </div>
      </section>

      <section className="bg-white text-[#102033]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <img src="/vinready/pack/pathway.webp" alt="Diagram of a cable path through an Australian timber frame, from the roof mount zone to an indoor point." className="w-full" />
          <p className="mt-2 text-xs text-[#5C6770]">Frame-stage pathway. Illustrative. One cable route, marked before the walls close.</p>
          <h2 className="mt-10 font-display text-3xl">Where we work</h2>
          <p className="mt-3 text-[#5C6770]">Cranbourne · Southeast Melbourne · Western Port · Mornington Peninsula · Phillip Island and Bass Coast · Gippsland</p>
          <ul className="mt-4 flex flex-wrap gap-3 text-sm">
            {[
              ["clyde-north", "Clyde North"],
              ["clyde", "Clyde"],
              ["officer", "Officer"],
              ["pakenham", "Pakenham"],
            ].map(([slug, label]) => (
              <li key={slug}>
                <Link to="/service-areas/$slug" params={{ slug }} className="text-[#0E7C7C]">{label}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 divide-y divide-[#D9D4CC] border-y border-[#D9D4CC]">
            {FAQS.map(([q, a]) => (
              <details key={q} className="py-3">
                <summary className="cursor-pointer font-display text-lg">{q}</summary>
                <p className="mt-2 text-sm text-[#5C6770]">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="pack" className="border-t border-line bg-ink-2">
        <img
          src="/media/downloads/vinready-pack-on-site.webp"
          alt="The VinReady builder pack standing on a site bench, with a house frame behind it."
          className="h-[46vh] min-h-72 w-full object-cover object-[center_30%]"
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">Add VinReady to your homes</h2>
            <p className="mt-3 text-muted">Tell us where you build. We will show you how it fits. Pricing stays in the pack, which opens after this form.</p>
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
      <p className="text-sm text-muted">Eight pages: the two options, how it fits the build, and the pricing. Leave your details and the pack opens here.</p>
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
