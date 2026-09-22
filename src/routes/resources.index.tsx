import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { SiteShell } from "@/components/site-shell";
import { DOWNLOADS } from "@/lib/downloads";

export const Route = createFileRoute("/resources/")({
  component: ResourcesPage,
  head: () => ({ meta: [{ title: "Guides & answers | VINCONNECT" }] }),
});

const GROUPS: { title: string; items: { href: string; title: string; copy: string; image?: string }[] }[] = [
  {
    title: "Starlink",
    items: [
      { href: "/resources/choosing-a-starlink-mount", title: "Choosing a Starlink mount", copy: "Fascia, tripod, pole or roof.", image: "/guides/vinconnect-starlink-mount-guide.webp" },
      { href: "/resources/where-should-the-router-go", title: "Where the router should go", copy: "Open room, not a shut metal cupboard.", image: "/guides/vinconnect-router-placement-guide.webp" },
      { href: "/resources/starlink-power-outage", title: "Starlink in a power outage", copy: "What a small UPS can and cannot keep on.", image: "/guides/vinconnect-starlink-ups-power-backup.webp" },
      { href: "/resources/standard-install-explained", title: "What a standard install includes", copy: "Visible cable, one entry, router at the wall." },
      { href: "/resources/starlink-delivery-installation", title: "Equipment and delivery", copy: "What happens between the carton and the visit." },
      { href: "/resources/trees-and-starlink", title: "Trees and obstructions", copy: "Clear sky matters more than a tidy spot.", image: "/guides/vinconnect-trees-and-starlink.webp" },
      { href: "/resources/new-home-starlink-ready", title: "New homes", copy: "Leave a cable path before the plaster is finished.", image: "/guides/vinconnect-new-home-starlink.webp" },
      { href: "/resources/starlink-for-acreage", title: "Farms and acreage", copy: "The dish is the start. The shed is the rest.", image: "/guides/vinconnect-starlink-acreage.webp" },
      { href: "/resources/house-or-shed", title: "House or shed?", copy: "Where the dish should actually sit.", image: "/guides/vinconnect-house-or-shed.webp" },
      { href: "/resources/external-or-concealed-cabling", title: "External or concealed cable", copy: "A visible clipped run, or a hidden one you ask for.", image: "/guides/vinconnect-starlink-cable-route.webp" },
      { href: "/resources/fixed-wireless-vs-starlink", title: "Fixed wireless or Starlink", copy: "When a rural connection is not doing the job.", image: "/guides/vinconnect-starlink-fixed-wireless-comparison.webp" },
      { href: "/starlink-offer", title: "One month of Starlink free", copy: "Check the referral offer before you order." },
    ],
  },
  {
    title: "Wi-Fi and property networks",
    items: [
      { href: "/resources/wifi-into-a-shed", title: "Wi-Fi into a shed", copy: "When the house signal stops at the Colorbond.", image: "/guides/vinconnect-wifi-to-shed.webp" },
      { href: "/resources/mesh-vs-wireless-bridge", title: "Mesh or a wireless bridge?", copy: "One building, or two.", image: "/guides/vinconnect-mesh-vs-wireless-bridge.webp" },
      { href: "/resources/point-to-point-wireless", title: "Point-to-point wireless", copy: "A link instead of a trench." },
      { href: "/resources/planning-a-property-network", title: "Planning a property network", copy: "Sketch the buildings before anyone buys hardware." },
      { href: "/property-planner", title: "Property planner", copy: "Mark the house, shed and stable on a map." },
    ],
  },
  {
    title: "Rural and horse properties",
    items: [
      { href: "/resources/connected-horse-property", title: "The connected horse property", copy: "House, stables, arena and gate.", image: "/guides/vinconnect-horse-property-network.webp" },
      { href: "/services/equestrian-connectivity", title: "Horse property installation", copy: "The service behind the guide." },
      { href: "/resources/rural-connectivity-options", title: "Rural connectivity options", copy: "Satellite is one tool, not the whole toolkit." },
    ],
  },
  {
    title: "CCTV and security",
    items: [
      { href: "/resources/rural-cctv", title: "CCTV for rural properties", copy: "Record locally. Reach the shed on purpose.", image: "/guides/vinconnect-rural-cctv.webp" },
      { href: "/resources/cctv-on-starlink", title: "CCTV on Starlink", copy: "Record on site. View remotely when the link is up." },
      { href: "/security", title: "CCTV packages", copy: "Home, acreage and stable starting points." },
    ],
  },
  {
    title: "Caravans and travel",
    items: [
      { href: "/resources/caravan-internet-guide", title: "Caravan internet and Starlink", copy: "Park Wi-Fi, mobile, and a Roam setup.", image: "/guides/vinconnect-starlink-caravan-guide.webp" },
      { href: "/services/starlink-caravan-installation", title: "Caravan installation", copy: "Book the setup, not just the reading." },
      { href: "/services/starlink-mini-installation", title: "Starlink Mini", copy: "The smaller kit, installed properly." },
    ],
  },
  {
    title: "Customer help",
    items: [
      { href: "/customer-help", title: "Customer help", copy: "From booking through to handover." },
      { href: "/install-terms-and-conditions", title: "Install terms", copy: "What a standard visit includes." },
      { href: "/circl-starlink-installations", title: "If Circl arranged your install", copy: "Delivery and booking notes. Not the way to hire VINCONNECT." },
    ],
  },
];

function ResourcesPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">Information hub</p>
        <h1 className="mt-3 font-display text-4xl">Guides and advice.</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Practical notes for a Starlink install, a shed that has no Wi-Fi, a horse property, or a caravan. The menu stays short. The detail lives here, next to the job it belongs to.
        </p>
        {GROUPS.map((group) => (
          <section key={group.title} className="mt-12">
            <h2 className="font-display text-2xl">{group.title}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {group.items.map((g) => (
                <AppLink key={g.href} to={g.href} className="link-card overflow-hidden rounded-xl border border-line bg-surface">
                  {g.image && <img src={g.image} alt="" className="h-36 w-full object-cover" loading="lazy" decoding="async" />}
                  <div className="p-5">
                    <h3 className="font-display text-xl">{g.title}</h3>
                    <p className="mt-2 text-sm text-muted">{g.copy}</p>
                  </div>
                </AppLink>
              ))}
            </div>
          </section>
        ))}
        <h2 className="mt-14 font-display text-2xl">PDFs</h2>
        <ul className="mt-4 space-y-2">
          {DOWNLOADS.map((d) => (
            <li key={d.slug}>
              <AppLink to={`/resources/downloads/${d.slug}`} className="text-mint">
                {d.title} →
              </AppLink>
            </li>
          ))}
        </ul>
      </div>
    </SiteShell>
  );
}
