import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AppLink } from "@/components/app-link";
import { CoverageMap } from "@/components/coverage-map";
import { EstimateWizard } from "@/components/estimate-wizard";
import { JsonLd, LOCAL_BUSINESS_LD } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { WorkAreasDiagram } from "@/components/work-areas-diagram";
import { Button } from "@/components/ui/button";
import { PHONE, PHONE_TEL, PROJECTS } from "@/lib/content";
import { REGIONS } from "@/lib/areas";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Starlink Installation, Wi-Fi & CCTV | Cranbourne & Gippsland | VINCONNECT" },
      {
        name: "description",
        content:
          "VINCONNECT installs Starlink, whole-property Wi-Fi, wireless links and HiLook CCTV across Casey, Cardinia, Mornington Peninsula, Bass Coast and Gippsland. Based in Cranbourne.",
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
    cta: "Explore Starlink installation",
  },
  {
    href: "/services/whole-property-wifi",
    kicker: "Whole-Property Wi-Fi",
    title: "Room to live. Room to connect.",
    copy: "From the home office to the back verandah, give every space a reliable Wi-Fi plan.",
    image: "/scenes/whole-home-wifi.webp",
    cta: "Explore whole-property Wi-Fi",
  },
  {
    href: "/services/wireless-links",
    kicker: "TP-Link Omada Wireless Links",
    title: "Take the connection further.",
    copy: "Keep the workshop, stable or second building connected with a dedicated wireless link.",
    image: "/scenes/building-links.webp",
    cta: "Explore wireless links",
  },
  {
    href: "/services/cctv",
    kicker: "CCTV & Remote Monitoring",
    title: "A little more peace of mind.",
    copy: "Thoughtful camera placement helps you check on home, entrances and the moments that matter.",
    image: "/scenes/home-cctv.webp",
    cta: "Explore CCTV",
  },
];

function Home() {
  return (
    <SiteShell>
      <JsonLd data={LOCAL_BUSINESS_LD} />
      <section className="relative overflow-hidden">
        <img
          src="/roadshow/paddocks.webp"
          alt="Original VINCONNECT rural roadshow artwork."
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="kicker">Professional Starlink · Whole-property connectivity</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-6xl">
            Starlink installed properly. Every important place connected.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-fg/85">
            Professional Starlink installation and whole-property connectivity for homes, sheds,
            workshops, stables, offices, farms and businesses across Victoria.
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
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="kicker">Where to start</p>
          <h2 className="mt-3 font-display text-3xl">Pick the job you actually have.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/customer-help", title: "Customer help", copy: "What to have ready, what the visit includes, and who to call afterwards." },
              { href: "/circl-starlink-installations", title: "Circl customers", copy: "The kit and the mounts often arrive separately. Leave the Starlink box sealed until we are there." },
              { href: "/starlink", title: "Starlink guides", copy: "How the dish goes on a home, rural property or caravan, and what the labour includes." },
              { href: "/property-networks", title: "Property networks", copy: "Wi-Fi through the house, and a proper link to the shed, stable or second building." },
              { href: "/security", title: "CCTV", copy: "Camera views planned first. A package only when it fits the property." },
              { href: "/event-link", title: "Event Link", copy: "Temporary Starlink and Wi-Fi for shows, trials and club days. A 2026–27 pilot." },
              { href: "/rural-connections", title: "Rural Connections", copy: "A travelling hub at rural shows — shade, free Wi-Fi and useful information." },
              { href: "/vingear", title: "VIN Gear", copy: "Products we are still developing. Register interest. Nothing is for sale yet." },
            ].map((item) => (
              <AppLink key={item.href} to={item.href} className="link-card rounded-xl border border-line bg-surface p-4">
                <h3 className="font-display text-lg">{item.title}</h3>
                <p className="mt-1 text-sm text-muted">{item.copy}</p>
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
              <li>Starlink and NBN-ready network design</li>
              <li>TP-Link Omada wireless bridges</li>
              <li>Mesh and managed Wi-Fi</li>
              <li>HiLook CCTV and stable monitoring</li>
              <li>UPS and remote-support planning</li>
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
              <span className="mt-3 inline-block text-sm text-mint">Explore stable CCTV →</span>
            </div>
          </AppLink>
          <AppLink to="/security/solar-cameras" className="overflow-hidden rounded-xl border border-line">
            <img src="/visuals/solar-gate.webp" alt="" className="h-56 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-display text-2xl">See what’s happening at the gate.</h3>
              <p className="mt-2 text-sm text-muted">
                Explore solar and mobile-connected cameras for places beyond the home network.
              </p>
              <span className="mt-3 inline-block text-sm text-mint">Explore remote cameras →</span>
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
            <AppLink to="/services/starlink-caravan-installation">Explore caravan installations →</AppLink>
          </Button>
        </div>
      </section>

      <section className="bg-ink-2">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="kicker">Work areas</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl sm:text-4xl">
            From Cranbourne out through the Peninsula, Bass Coast and Gippsland.
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Every suburb on the map has its own page for Starlink, Wi-Fi and cameras. Travel is
            calculated from the address you enter — you do not work out kilometres.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <WorkAreasDiagram />
            <CoverageMap height={340} />
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {REGIONS.map((r) => (
              <Link
                key={r.slug}
                to="/service-areas/region/$slug"
                params={{ slug: r.slug }}
                className="link-card rounded-xl border border-line bg-surface p-4"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-mint">{r.short}</p>
                <p className="mt-2 font-display text-lg">{r.name}</p>
              </Link>
            ))}
          </div>
          <Link to="/service-areas" className="mt-6 inline-block text-sm text-mint">
            Open the full suburb map →
          </Link>
        </div>
      </section>

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
              <span className="mt-3 inline-block text-sm text-mint">Read the program →</span>
            </div>
          </AppLink>
          <AppLink to="/event-link" className="overflow-hidden rounded-xl border border-line">
            <img src="/scenes-new/event-link-kit.jpg" alt="" className="h-56 w-full object-cover" />
            <div className="p-5">
              <h3 className="font-display text-2xl">Event Link pilot</h3>
              <p className="mt-2 text-sm text-muted">
                Packed so it can stand up in a paddock. A 2026–27 pilot — organisers can register.
              </p>
              <span className="mt-3 inline-block text-sm text-mint">Event Link brief →</span>
            </div>
          </AppLink>
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
