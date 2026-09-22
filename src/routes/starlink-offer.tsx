import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/starlink-offer")({
  component: OfferPage,
  head: () => ({ meta: [{ title: "Starlink referral offer | VINCONNECT" }] }),
});

function OfferPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="kicker">Starlink referral</p>
        <h1 className="mt-3 font-display text-4xl">Check your eligibility for one month free.</h1>
        <p className="mt-4 text-muted">
          Open the Starlink referral offer before ordering. Eligible plans and the benefit must be
          confirmed at Starlink checkout. VINCONNECT may receive a referral payment. This is not a
          VINCONNECT labour discount and it is not a Starlink promotional installation price.
        </p>
        <p className="mt-4 text-muted">
          Hardware, subscription and promotional terms are controlled by Starlink. Confirm your
          offer before paying.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href="https://www.starlink.com" target="_blank" rel="noreferrer">
              Check current Starlink terms
            </a>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/estimate">VINCONNECT install price</Link>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
