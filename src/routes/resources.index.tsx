import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { SiteShell } from "@/components/site-shell";
import { DOWNLOADS } from "@/lib/downloads";

export const Route = createFileRoute("/resources/")({
  component: ResourcesPage,
  head: () => ({ meta: [{ title: "Guides & answers | VINCONNECT" }] }),
});

const GUIDES = [
  { href: "/customer-help", title: "Customer help", copy: "The booking journey, from confirm to handover." },
  { href: "/install-terms-and-conditions", title: "Install terms", copy: "The stable page linked from booking SMS." },
  { href: "/starlink-offer", title: "One month of Starlink free", copy: "Check the referral offer before you order. Then book the install." },
  { href: "/resources/starlink-referral-free-month", title: "How the free month works", copy: "Who may qualify, and why a shop-bought kit may not." },
  { href: "/resources/starlink-delivery-installation", title: "Starlink delivery and installation", copy: "What happens between the carton and the visit." },
  { href: "/resources/standard-install-explained", title: "Standard install explained", copy: "Visible cable, one hole, router at the wall." },
  { href: "/starlink", title: "Starlink guides", copy: "Home, rural, mounts, Mini and caravan." },
  { href: "/property-planner", title: "Property planner", copy: "Mark buildings and measured links before you quote." },
  { href: "/resources/planning-a-property-network", title: "Planning a property network", copy: "Sketch first, shopping cart second." },
  { href: "/resources/wifi-calling", title: "Wi-Fi calling", copy: "What we can set up, and what sits with your carrier." },
  { href: "/resources/fixed-wireless-vs-starlink", title: "Fixed wireless vs Starlink", copy: "When rural households make the move." },
  { href: "/resources/cctv-on-starlink", title: "CCTV on Starlink", copy: "Record locally, view remotely." },
  { href: "/resources/rural-connectivity-options", title: "Rural connectivity options", copy: "Satellite is one tool, not the whole toolkit." },
  { href: "/estimate", title: "Installation estimate", copy: "Address-based labour range with travel included." },
  { href: "/security", title: "CCTV cluster", copy: "Planning pages and HiLook packages." },
  { href: "/rural-connections", title: "Rural Connections", copy: "Community hubs, info resource and advocacy." },
  { href: "/event-link", title: "Event Link", copy: "Pilot Starlink/Wi-Fi kit for shows and field days." },
  { href: "/vingear", title: "VIN Gear", copy: "Products in development. Interest list only." },
  { href: "/about/capability", title: "Capability statement", copy: "Credentials, regions and how we quote." },
  { href: "/about/safety-and-credentials", title: "Safety & credentials", copy: "Open cabler, heights, White Card, insurance." },
  { href: "/circl-starlink-installations", title: "If Circl arranged your install", copy: "Delivery and booking notes for Circl-allocated work only." },
  { href: "/service-areas", title: "Service areas", copy: "South East Melbourne, the Peninsula, Bass Coast and Gippsland." },
];

function ResourcesPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">Information hub</p>
        <h1 className="mt-3 font-display text-4xl">Guides & answers.</h1>
        <p className="mt-4 text-muted">
          Practical pages for people planning a Starlink, Wi-Fi or camera job in Victoria — plus
          PDFs you can take to a committee meeting.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {GUIDES.map((g) => (
            <AppLink key={g.href} to={g.href} className="link-card rounded-xl border border-line bg-surface p-5">
              <h2 className="font-display text-xl">{g.title}</h2>
              <p className="mt-2 text-sm text-muted">{g.copy}</p>
            </AppLink>
          ))}
        </div>
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
