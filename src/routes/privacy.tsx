import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { EMAIL, EMAIL_MAILTO } from "@/lib/content";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({ meta: [{ title: "Privacy | VINCONNECT" }] }),
});

function PrivacyPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">Business information</p>
        <h1 className="mt-3 font-display text-4xl">Privacy</h1>
        <p className="mt-4 text-muted">
          VINCONNECT uses the details you send — name, contact, address and any photos — to respond
          to an installation enquiry. We do not put you on a marketing list as a condition of
          getting a quote.
        </p>
        <p className="mt-4 text-muted">
          Address search in this preview uses OpenStreetMap Nominatim. Map tiles are provided by
          Esri. Your estimate and enquiry are stored on this device so you can come back to them.
        </p>
        <p className="mt-4 text-muted">
          Questions: <a href={EMAIL_MAILTO} className="text-mint">{EMAIL}</a>
        </p>
      </div>
    </SiteShell>
  );
}
