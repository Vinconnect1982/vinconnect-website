import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppLink } from "@/components/app-link";
import { JsonLd } from "@/components/json-ld";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/content";
import { REFERRAL_NOTE, STARLINK_REFERRAL_URL, trackEvent } from "@/lib/referral";

export const Route = createFileRoute("/starlink-offer")({
  component: OfferPage,
  head: () => ({
    meta: [
      { title: "One Month Free Starlink Offer Australia | VINCONNECT Referral" },
      {
        name: "description",
        content:
          "Check the VINCONNECT Starlink referral link before you order. Eligible new customers may receive one month of service credit. VINCONNECT then installs it.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/starlink-offer` }],
  }),
});

function OfferPage() {
  useEffect(() => {
    trackEvent("starlink_offer_view");
  }, []);

  return (
    <SiteShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "One month free Starlink offer",
          url: `${SITE_URL}/starlink-offer`,
          description:
            "VINCONNECT referral page for Starlink. Eligibility, timing and the service credit are controlled by Starlink.",
        }}
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">Starlink referral</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Get one month of Starlink free.</h1>
        <p className="mt-4 text-lg text-muted">
          Planning to order Starlink? Use the VINCONNECT referral link before you purchase and check whether your order qualifies for one month of service credit.
        </p>
        <p className="mt-3 text-muted">Get connected. Then let VINCONNECT install it properly.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href={STARLINK_REFERRAL_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent("starlink_referral_click")}>
              Get one month free at Starlink
            </a>
          </Button>
          <Button asChild variant="ghost">
            <AppLink to="/estimate" onClick={() => trackEvent("estimate_start")}>
              Check My Install Price
            </AppLink>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted">{REFERRAL_NOTE}</p>

        <h2 className="mt-12 font-display text-2xl">How it works</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted">
          <li>Open the VINCONNECT Starlink referral link.</li>
          <li>Check the eligible offer displayed by Starlink.</li>
          <li>Order directly from Starlink.</li>
          <li>Book VINCONNECT for professional installation.</li>
          <li>Starlink applies the eligible referral benefit under its current terms.</li>
        </ol>

        <h2 className="mt-10 font-display text-2xl">Who can use the offer?</h2>
        <p className="mt-3 text-muted">
          Starlink’s current referral information says the person ordering needs to be a new customer, buying on starlink.com through the referral link. Qualifying plans are limited. Residential and some Roam plans are the ones Starlink lists. Kits bought from a retailer, a reseller, or moved across by account transfer may not qualify.
        </p>
        <p className="mt-3 text-muted">
          You pay the first service invoice. If the referral is accepted, the service credit is applied to a later invoice after Starlink’s activation rules are met. Starlink can change or end the program. The offer shown at checkout is the one that counts. This is one month of service credit, not a free Starlink kit.
        </p>

        <h2 className="mt-10 font-display text-2xl">What Starlink supplies, and what VINCONNECT does</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-line p-5">
            <h3 className="font-display text-xl">Starlink</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Hardware</li>
              <li>Account</li>
              <li>Subscription</li>
              <li>Referral promotion</li>
            </ul>
          </div>
          <div className="rounded-xl border border-line p-5">
            <h3 className="font-display text-xl">VINCONNECT</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
              <li>Professional mounting</li>
              <li>Cable routing</li>
              <li>Router setup</li>
              <li>Wi-Fi planning, links and cameras</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">
          VINCONNECT is an independent installer. We do not control the promotion, and we cannot issue the service credit ourselves. We may receive a referral payment from Starlink. That payment is not a discount on installation labour.
        </p>

        <h2 className="mt-10 font-display text-2xl">Ready to install?</h2>
        <p className="mt-3 text-muted">
          Already have the kit, or just want the labour price? The estimator covers a straightforward install. Whole-property Wi-Fi, a shed link or cameras are scoped separately.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <AppLink to="/estimate">Check My Install Price</AppLink>
          </Button>
          <Button asChild variant="ghost">
            <AppLink to="/resources/starlink-referral-free-month">How the free month works</AppLink>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
