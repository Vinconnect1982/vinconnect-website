import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AppLink } from "@/components/app-link";
import { EstimateWizard } from "@/components/estimate-wizard";
import { JsonLd, LOCAL_BUSINESS_LD } from "@/components/json-ld";
import { ServiceNetworkMap } from "@/components/service-network-map";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { PHONE, PHONE_TEL, PROJECTS } from "@/lib/content";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Starlink Installation, Wi-Fi & CCTV | Cranbourne & Gippsland | VINCONNECT" },
      {
        name: "description",
        content:
          "Starlink installation, whole-property Wi-Fi, wireless links and CCTV across South East Melbourne, Mornington Peninsula, Bass Coast and Gippsland. Based in Cranbourne. Regional Victorian work by arrangement.",
      },
    ],
  }),
});

const FEATURES = [
  {
    href: "/services/starlink-installation",
    kicker: "Starlink Installation",
    title: "Country living. Connected.",
    copy: "A considered Starlink installation brings work, calls and everyday life back within reach.",
    image: "/scenes/starlink-home.webp",
    cta: "See Starlink installation",
  },
  {
    href: "/services/whole-property-wifi",
    kicker: "Whole-Property Wi-Fi",
    title: "Room to live. Room to connect.",
    copy: "From the home office to the back verandah, give every space a reliable Wi-Fi plan.",
    image: "/scenes/whole-home-wifi.webp",
    cta: "See whole-property Wi-Fi options",
  },
  {
    href: "/services/wireless-links",
    kicker: "Building-to-building wireless links",
    title: "Connect the shed without trenching.",
    copy: "Connect the shed, stable, workshop or second building without digging a trench across the property.",
    image: "/scenes/building-links.webp",
    cta: "See how wireless links work",
  },
  {
    href: "/services/cctv",
    kicker: "CCTV & Remote Monitoring",
    title: "A little more peace of mind.",
    copy: "Thoughtful camera placement helps you check on home, entrances and the moments that matter.",
    image: "/scenes/home-cctv.webp",
    cta: "Plan my cameras",
  },
];

function Home() {
  return (
    <SiteShell>
      <JsonLd data={LOCAL_BUSINESS_LD} />
      <section className="relative overflow-hidden">
        <img
          src="/roadshow/paddocks.webp"
          alt="Rural Connections Roadshow at a country show."
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="kicker">Professional Starlink · Whole-property connectivity</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            Starlink installed properly. Every important place connected.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-fg/85">
            Professional Starlink installation and whole-property connectivity across South East
            Melbourne, Mornington Peninsula, Bass Coast and Gippsland, with regional Victorian
            projects available by arrangement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/estimate">Check My Install Price</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href={PHONE_TEL}>Call {PHONE}</a>
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.16em] text-fg/70">
            <li>ACMA Registered Open Cabler</li>
            <li>Working at Heights</li>
            <li>White Card</li>
            <li>Public Liability & WorkCover</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="kicker">Built around the property</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl sm:text-4xl">
          One network. Every important place.
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Start with the connection, then extend it cleanly to the house, shed, stable, arena, gate,
          cameras and accommodation.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {FEATURES.map((item) => (
            <AppLink
              key={item.href}
              to={item.href}
              className="group overflow-hidden rounded-xl border border-line bg-surface"
            >
              <img src={item.image} alt="" className="h-52 w-full object-cover sm:h-60" />
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-mint">{item.kicker}</p>
                <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.copy}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-mint">
                  {item.cta} <ArrowUpRight className="size-4" />
                </span>
              </div>
            </AppLink>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          Illustrative service scenes. Explore our completed projects for actual installation photography.
        </p>
      </section>

      <section className="border-y border-line bg-ink-2">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="kicker">Start here</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">What do you need to connect?</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/services/starlink-installation", title: "My home", copy: "Starlink, Wi-Fi and a router position that covers the rooms you use." },
              { href: "/services/wireless-links", title: "My shed or workshop", copy: "Extend the internet to another building without trenching." },
              { href: "/property-networks", title: "My stable or horse property", copy: "Wi-Fi, cameras and a link between the house and the yards." },
              { href: "/security/solar-cameras", title: "My gate or remote camera", copy: "See the gate, drive or paddock when it is beyond the house Wi-Fi." },
              { href: "/event-link", title: "My business or event", copy: "Commercial networks, and Event Link for shows, trials and temporary sites." },
              { href: "/estimate", title: "Just the install price", copy: "Enter the address. Location is included. Hardware stays separate." },
            ].map((item) => (
              <AppLink key={item.href} to={item.href} className="link-card rounded-xl border border-line bg-surface p-5">
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.copy}</p>
              </AppLink>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-2">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-2 lg:items-stretch">
          <div className="relative min-h-[22rem] overflow-hidden bg-ink lg:min-h-[32rem]">
            <img
              src="/visuals/network-cutaway.webp"
              alt="Property network concept illustration. Equipment is selected around your buildings and coverage needs."
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
          <div className="px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
            <p className="kicker">Whole-property connectivity</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">The internet is only the start.</h2>
            <p className="mt-4 text-muted">
              Homes and rural properties rarely fail because of the internet service alone. The weak
              point is often Wi-Fi placement, building materials, distance, cabling or a network that
              was never designed as one system.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>Starlink or an existing service, designed as one network</li>
              <li>A wireless link to the shed, stable or second building</li>
              <li>Wi-Fi that follows the rooms you actually use</li>
              <li>Cameras at the gate, stable or driveway</li>
              <li>Backup power and a handover you can use</li>
            </ul>
            <Button asChild className="mt-7">
              <Link to="/property-planner">Build your property plan →</Link>
            </Button>
            <p className="mt-4 text-xs text-muted">
              Property network concept illustration. Equipment is selected around your buildings and
              coverage needs.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="kicker">Technology with a purpose</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">Feel connected. Wherever life happens.</h2>
        <p className="mt-3 max-w-2xl text-muted">
          From keeping an eye on horses to checking the gate after dark, build a system around the
          moments that matter.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <AppLink to="/security/stable-cctv" className="overflow-hidden rounded-xl border border-line">
            <img src="/visuals/stable-cctv.webp" alt="" className="h-56 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-display text-2xl">Check the stable from the house.</h3>
              <p className="mt-2 text-sm text-muted">
                Plan cameras, recording and remote access for your horse property.
              </p>
              <span className="mt-3 inline-block text-sm text-mint">Plan stable cameras →</span>
            </div>
          </AppLink>
          <AppLink to="/security/solar-cameras" className="overflow-hidden rounded-xl border border-line">
            <img src="/visuals/solar-gate.webp" alt="" className="h-56 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-display text-2xl">See what’s happening at the gate.</h3>
              <p className="mt-2 text-sm text-muted">
                Explore solar and mobile-connected cameras for places beyond the home network.
              </p>
              <span className="mt-3 inline-block text-sm text-mint">See remote camera options →</span>
            </div>
          </AppLink>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img src="/travel/caravan-river.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="kicker">Take the long way home</p>
          <h2 className="mt-3 max-w-xl font-display text-3xl sm:text-5xl">
            Stay for the view. Call home from here.
          </h2>
          <p className="mt-4 max-w-lg text-fg/85">
            Caravan Starlink setups for the places you want to stop. Explore portable equipment,
            vehicle mounts and practical power planning.
          </p>
          <Button asChild className="mt-7" variant="paper">
            <AppLink to="/services/starlink-caravan-installation">See caravan Starlink setups →</AppLink>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="kicker">Recent work</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">Connected in the real world.</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PROJECTS.slice(0, 3).map((p) => (
            <Link key={p.slug} to="/projects/$slug" params={{ slug: p.slug }} className="group">
              <img src={p.image} alt="" className="h-48 w-full rounded-xl object-cover" />
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-mint">{p.place}</p>
              <h3 className="mt-1 font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.summary}</p>
              <span className="mt-3 inline-block text-sm text-mint">View {p.title} →</span>
            </Link>
          ))}
        </div>
      </section>

      <ServiceNetworkMap />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="kicker">Rural Connections</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl sm:text-4xl">
          Connection is more than internet.
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          A practical community program for shows, field days and rural towns — plus Event Link, a
          2026–27 pilot kit for rapidly deployable Starlink and Wi-Fi.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <AppLink to="/rural-connections" className="overflow-hidden rounded-xl border border-line">
            <img src="/scenes-new/rural-event.jpg" alt="" className="h-56 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-display text-2xl">Rural Connections</h3>
              <p className="mt-2 text-sm text-muted">
                Travelling hubs, a free info resource, and advocacy that stays separate from sales.
              </p>
              <span className="mt-3 inline-block text-sm text-mint">Read the Roadshow →</span>
            </div>
          </AppLink>
          <AppLink to="/event-link" className="overflow-hidden rounded-xl border border-line">
            <img src="/scenes-new/event-link-kit.jpg" alt="" className="h-56 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-display text-2xl">Event Link pilot</h3>
              <p className="mt-2 text-sm text-muted">
                Packed so it can stand up in a paddock. A 2026–27 pilot — organisers can register.
              </p>
              <span className="mt-3 inline-block text-sm text-mint">Plan event connectivity →</span>
            </div>
          </AppLink>
        </div>
      </section>

      <section className="bg-ink-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="kicker">Start with a simple estimate</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl sm:text-4xl">
            Check your likely install price.
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Enter the property address and answer a few practical questions. Location is included
            automatically, with no travel formula or technical terms to work through.
          </p>
          <div className="mt-8">
            <EstimateWizard />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="note p-6 sm:p-8">
          <h2 className="font-display text-2xl">Thinking about Starlink?</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Check your eligibility for one month free. Open our Starlink referral offer before
            ordering. Eligible plans and the benefit must be confirmed at Starlink checkout.
            VINCONNECT may receive a referral payment.
          </p>
          <Button asChild className="mt-5" variant="ghost">
            <Link to="/starlink-offer">View the Starlink referral offer →</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
