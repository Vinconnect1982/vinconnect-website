import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { EnquiryForm } from "@/components/enquiry-form";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { EVENT_LINK } from "@/lib/rural";

const UNITS = [
  {
    name: "Event Link Mini",
    photo: "/media/event-link/mini.webp",
    alt: "Design concept of the compact Event Link Mini trailer in a horse paddock.",
    elevation: "/media/event-link/mini-elevation.webp",
    elevationAlt: "Side elevation of the Event Link Mini trailer.",
    copy: "The small single-axle trailer. One dish, a short mast and a small solar panel. For a club day, a trials hub or a committee area.",
    href: "/event-link/mini",
    link: "About Mini",
  },
  {
    name: "Event Link",
    photo: "/media/event-link/show.webp",
    alt: "Design concept of an Event Link trailer beside marquees at a country show.",
    elevation: "/media/event-link/event-link-elevation.webp",
    elevationAlt: "Side elevation of the Event Link trailer.",
    copy: "The mid-size trailer for a show or field day. Solar on the roof, one mast, and Wi-Fi for the area you actually name.",
    href: "/event-link/organisers",
    link: "Talk to us about an event",
  },
  {
    name: "Event Link Platform",
    photo: "/media/event-link/platform-hero.webp",
    alt: "Design concept of the larger dual-axle Event Link Platform trailer.",
    elevation: "/media/event-link/platform-elevation.webp",
    elevationAlt: "Side elevation of the Event Link Platform trailer.",
    copy: "The larger dual-axle concept from the brochure. More solar, two dishes and a taller mast. A development idea, not a unit you can book this season.",
    href: "/event-link/platform",
    link: "About the platform concept",
  },
];

const SCENES = [
  { src: "/media/event-link/coast.webp", alt: "Design concept of an Event Link trailer above an Australian beach.", caption: "Coastal events, where the existing network fills up." },
  { src: "/media/event-link/motorsport.webp", alt: "Design concept of an Event Link trailer beside a motocross track.", caption: "Motorsport and other spread-out sporting events." },
  { src: "/media/event-link/mast.webp", alt: "Design concept of a raised Event Link mast at dusk.", caption: "A mast for the area that needs coverage, not the whole district." },
  { src: "/media/event-link/solar.webp", alt: "Close view of solar panels and a rectangular Starlink dish on a trailer roof.", caption: "Solar and Starlink on the roof, so the kit can work away from town power." },
];

export const Route = createFileRoute("/event-link/")({
  component: EventLinkPage,
  head: () => ({
    meta: [
      { title: "Event Link | Rapid rural event Wi-Fi | VINCONNECT" },
      {
        name: "description",
        content:
          "VINCONNECT Event Link is a 2026–27 pilot: rapidly deployable Starlink and managed Wi-Fi for agricultural shows, field days, clubs and rural community events.",
      },
    ],
  }),
});

function EventLinkPage() {
  return (
    <SiteShell>
      <div className="relative overflow-hidden">
        <img src={EVENT_LINK.image} alt="Design concept of the Event Link Platform trailer at sunset." className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="kicker">{EVENT_LINK.kicker}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl sm:text-6xl">{EVENT_LINK.name}.</h1>
          <p className="mt-5 max-w-2xl text-lg text-fg/85">{EVENT_LINK.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/event-link/organisers">For organisers</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <AppLink to="/event-link/mini">Event Link Mini</AppLink>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link to="/resources/downloads/$slug" params={{ slug: "event-link-brochure" }}>Brochure</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="note text-sm">{EVENT_LINK.status}</p>
        <p className="mt-4 max-w-3xl text-sm text-muted">
          The photographs and side elevations on this page are design concepts from the Event Link brochure. They are not photos of a finished fleet, and they are not records of events already delivered.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-3xl">Three ways to stand it up</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Same idea at three sizes. Mini for a club day. Event Link for a show. Platform for a larger site. None of them is a product you can buy off the shelf.
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {UNITS.map((unit) => (
              <article key={unit.name}>
                <img src={unit.photo} alt={unit.alt} className="aspect-[16/9] w-full rounded-xl object-cover" loading="lazy" decoding="async" />
                <h3 className="mt-4 font-display text-2xl">{unit.name}</h3>
                <p className="mt-2 text-sm text-muted">{unit.copy}</p>
                <img src={unit.elevation} alt={unit.elevationAlt} className="mt-4 w-full rounded-xl bg-ink" loading="lazy" decoding="async" />
                <AppLink to={unit.href} className="mt-3 inline-block text-sm text-mint">{unit.link}</AppLink>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl">The kind of event it is aimed at</h2>
          <p className="mt-3 max-w-2xl text-muted">
            A country show, a beach crowd, a motorsport round, or a dusk setup in the paddock. These pictures show the design in those settings. They are not claimed jobs.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {SCENES.map((scene) => (
              <figure key={scene.src}>
                <img src={scene.src} alt={scene.alt} className="aspect-[16/9] w-full rounded-xl object-cover" loading="lazy" decoding="async" />
                <figcaption className="mt-2 text-sm text-muted">{scene.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <figure className="mt-14">
          <img
            src="/media/downloads/event-link-brochure-desk.webp"
            alt="The Event Link brochure printed and lying on a desk."
            className="aspect-[16/10] w-full rounded-xl object-cover"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
            <span>The Event Link brochure, ready to download.</span>
            <Link to="/resources/downloads/$slug" params={{ slug: "event-link-brochure" }} className="text-mint">
              Download the brochure
            </Link>
          </figcaption>
        </figure>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <section>
            <h2 className="font-display text-2xl">What stands up in the paddock</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {EVENT_LINK.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-2xl">Where it is used</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {EVENT_LINK.useCases.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-2xl">What it is not</h2>
          <ul className="facts mt-4">
            {EVENT_LINK.not.map((i) => (
              <li key={i} className="text-sm text-muted">
                {i}
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-muted">
          Event Link sits inside{" "}
          <Link to="/rural-connections" className="text-mint">
            Rural Connections
          </Link>
          . The public Wi-Fi at a hub does not require a marketing opt-in. If you want Starlink or
          cameras at home instead, use the{" "}
          <Link to="/estimate" className="text-mint">
            estimator
          </Link>
          . Related:{" "}
          <AppLink to="/event-link/mini" className="text-mint">
            Mini
          </AppLink>
          ,{" "}
          <AppLink to="/event-link/platform" className="text-mint">
            platform concept
          </AppLink>
          ,{" "}
          <AppLink to="/event-link/community-events" className="text-mint">
            community events
          </AppLink>
          ,{" "}
          <AppLink to="/event-link/what-is-included" className="text-mint">
            what is included
          </AppLink>
          .
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <h2 className="font-display text-2xl">Register interest for 2026–27.</h2>
            <p className="mt-3 text-muted">
              Tell us the event, the dates, and whether you need Wi-Fi for the public, the committee, or both. There is no set price list yet.
            </p>
          </div>
          <EnquiryForm type="event-link" selectedPackage="Event Link pilot" buttonLabel="Request Event Connectivity" />
        </div>
      </div>
    </SiteShell>
  );
}
