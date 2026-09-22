import { AppLink } from "@/components/app-link";
import { Button } from "@/components/ui/button";
import { REFERRAL_NOTE, STARLINK_REFERRAL_URL, trackEvent } from "@/lib/referral";

export function StarlinkOfferCta({ suburb }: { suburb?: string }) {
  return (
    <section className="mt-12 rounded-xl border border-line bg-ink-2 p-6 sm:p-8">
      <p className="kicker">{suburb ? `Ordering Starlink in ${suburb}?` : "Ordering Starlink?"}</p>
      <h2 className="mt-2 max-w-2xl font-display text-2xl sm:text-3xl">Get one month of Starlink free*</h2>
      <p className="mt-3 max-w-2xl text-muted">
        Use the VINCONNECT referral link before you order. Then book us to mount, cable and configure the installation.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button asChild>
          <a
            href={STARLINK_REFERRAL_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("starlink_referral_click")}
          >
            Get one month free
          </a>
        </Button>
        <Button asChild variant="ghost">
          <AppLink to="/estimate" onClick={() => trackEvent("estimate_start")}>
            Check My Install Price
          </AppLink>
        </Button>
      </div>
      <p className="mt-4 max-w-2xl text-xs text-muted">{REFERRAL_NOTE}</p>
    </section>
  );
}
