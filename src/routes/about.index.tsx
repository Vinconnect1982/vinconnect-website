import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { SOCIALS } from "@/lib/content";

export const Route = createFileRoute("/about/")({
  component: AboutPage,
  head: () => ({
    meta: [{ title: "Local people. Practical connections. | VINCONNECT" }],
  }),
});

function AboutPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">About VINCONNECT</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
          Local people. Practical connections.
        </h1>
        <p className="mt-5 text-lg text-muted">
          VINCONNECT is a family-run installation business based in Cranbourne, South East Victoria,
          connecting homes, rural properties, businesses and communities with internet, Wi-Fi and
          cameras.
        </p>
        <p className="mt-4 text-muted">
          Led by Vince De Stefano, with assistance from Phoenix, the work is hands-on: practical
          experience, rural life knowledge, useful technology, clear communication, tidy
          presentation and making sure you understand the setup you are left with.
        </p>
        <p className="mt-4 text-muted">
          Services include Starlink installation, whole-property Wi-Fi, building-to-building
          wireless links and CCTV. Jobs can be scoped as a single project or built in stages.
        </p>
        <p className="mt-4 text-muted">
          We work across South East Melbourne, Mornington Peninsula, Bass Coast and Gippsland, with
          a focus on rural homes, horse properties and regional communities. Travel, access and
          availability are confirmed with quotes. One point of contact for the enquiry.
        </p>
        <p className="mt-4 text-muted">
          VINCONNECT is an independent installer. Starlink supplies the hardware, the subscription and any referral offer. We mount, cable and configure the installation, and we can extend it across the property. We are not Starlink, and we are not endorsed by them.
        </p>
        <p className="mt-4 text-sm">
          {SOCIALS.map((s, i) => (
            <span key={s.href}>
              {i > 0 ? " · " : "Find us on "}
              <a href={s.href} className="text-mint hover:underline" target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </span>
          ))}
          .
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/contact">Talk to VINCONNECT</Link>
          </Button>
          <Button asChild variant="ghost">
            <AppLink to="/about/how-we-work">How we work</AppLink>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/about/safety-and-credentials">Safety & credentials</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/about/capability">Capability statement</Link>
          </Button>
        </div>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 text-sm">
          <li><AppLink to="/about/support" className="text-mint">Support directory →</AppLink></li>
          <li><AppLink to="/about/business-information" className="text-mint">Business information →</AppLink></li>
          <li><AppLink to="/customer-help" className="text-mint">Customer help →</AppLink></li>
          <li><AppLink to="/install-terms-and-conditions" className="text-mint">Install terms →</AppLink></li>
        </ul>
      </div>
    </SiteShell>
  );
}
