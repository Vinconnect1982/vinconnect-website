import { Link } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { Button } from "@/components/ui/button";
import { AREAS, EMAIL, EMAIL_MAILTO, FOOTER_AREAS, PHONE, PHONE_TEL, SOCIALS } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="font-display text-xl tracking-tight">
            Practical connections for the places you live, work and look after.
          </p>
          <a href={PHONE_TEL} className="mt-5 block font-display text-2xl text-mint">
            {PHONE}
          </a>
          <a href={EMAIL_MAILTO} className="mt-1 block text-muted">
            {EMAIL}
          </a>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {SOCIALS.map((s) => (
              <a key={s.href} href={s.href} className="text-mint hover:underline" target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </p>
          <Button asChild className="mt-6">
            <Link to="/estimate">Check My Install Price →</Link>
          </Button>
        </div>

        <div className="grid gap-8 text-sm sm:grid-cols-3 md:col-span-8">
          <div>
            <p className="kicker mb-3">Installations</p>
            <ul className="space-y-2 text-muted">
              <li><AppLink to="/services/starlink-installation" className="hover:text-fg">Home Starlink</AppLink></li>
              <li><Link to="/estimate" className="hover:text-fg">Check My Install Price</Link></li>
              <li><AppLink to="/starlink" className="hover:text-fg">Starlink guides</AppLink></li>
              <li><AppLink to="/services/whole-property-wifi" className="hover:text-fg">Whole-property Wi-Fi</AppLink></li>
              <li><AppLink to="/services/wireless-links" className="hover:text-fg">Building-to-building links</AppLink></li>
              <li><AppLink to="/services/equestrian-connectivity" className="hover:text-fg">Horse properties</AppLink></li>
              <li><AppLink to="/security/stable-cctv" className="hover:text-fg">Stable CCTV</AppLink></li>
              <li><AppLink to="/services/starlink-caravan-installation" className="hover:text-fg">Caravan Starlink</AppLink></li>
              <li><Link to="/services" className="hover:text-fg">All services</Link></li>
            </ul>
          </div>
          <div>
            <p className="kicker mb-3">Plan & prepare</p>
            <ul className="space-y-2 text-muted">
              <li><Link to="/property-planner" className="hover:text-fg">Property planner</Link></li>
              <li><Link to="/resources" className="hover:text-fg">Guides and advice</Link></li>
              <li><Link to="/starlink-offer" className="hover:text-fg">Starlink referral offer</Link></li>
              <li><AppLink to="/customer-help" className="hover:text-fg">Customer help</AppLink></li>
              <li><AppLink to="/install-terms-and-conditions" className="hover:text-fg">Install terms</AppLink></li>
              <li><AppLink to="/circl-starlink-installations" className="hover:text-fg">If Circl arranged your install</AppLink></li>
              <li><Link to="/resources/downloads" className="hover:text-fg">Downloads</Link></li>
              <li><Link to="/service-areas" className="hover:text-fg">Service areas</Link></li>
              <li><Link to="/projects" className="hover:text-fg">Completed installations</Link></li>
            </ul>
          </div>
          <div>
            <p className="kicker mb-3">VINCONNECT</p>
            <ul className="space-y-2 text-muted">
              <li><Link to="/about" className="hover:text-fg">About us</Link></li>
              <li><AppLink to="/about/how-we-work" className="hover:text-fg">How we work</AppLink></li>
              <li><Link to="/about/capability" className="hover:text-fg">Capability statement</Link></li>
              <li><Link to="/about/safety-and-credentials" className="hover:text-fg">Safety & credentials</Link></li>
              <li><Link to="/rural-connections" className="hover:text-fg">Rural Connections</Link></li>
              <li><Link to="/event-link" className="hover:text-fg">Event Link</Link></li>
              <li><AppLink to="/vingear" className="hover:text-fg">VIN Gear</AppLink></li>
              <li><Link to="/journal" className="hover:text-fg">Field notes</Link></li>
              <li><Link to="/contact" className="hover:text-fg">Contact us</Link></li>
              <li><Link to="/privacy" className="hover:text-fg">Privacy</Link></li>
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="hover:text-fg" target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-muted sm:px-6">
          <p className="kicker">Local installation coverage</p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            {FOOTER_AREAS.map((name) => {
              const area = AREAS.find((a) => a.name === name);
              return area ? (
                <Link key={name} to="/service-areas/$slug" params={{ slug: area.slug }} className="hover:text-mint">
                  {name}
                </Link>
              ) : (
                <span key={name}>{name}</span>
              );
            })}
            <Link to="/service-areas" className="text-mint">
              All service areas →
            </Link>
          </p>
          <p className="pt-2">
            VINCONNECT © 2026 · Based in Cranbourne · South East Melbourne, Mornington Peninsula, Bass Coast, Gippsland and regional Victoria by arrangement
          </p>
        </div>
      </div>
    </footer>
  );
}
