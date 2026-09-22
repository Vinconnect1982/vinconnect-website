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
          VINCONNECT uses the details you send — name, phone, email, suburb, installation address and the message — to reply to an enquiry, prepare a quote, or book an installation. Sending an enquiry does not put you on a marketing list.
        </p>
        <h2 className="mt-8 font-display text-2xl">What is sent</h2>
        <p className="mt-3 text-muted">
          Enquiry forms, the install estimator and the property planner are submitted to VINCONNECT. Netlify hosts this website and stores the form submission. When email delivery is configured, Resend sends a copy to vince@vinconnect.com.au. The estimator reference is also saved in your browser so you can return to it. That browser copy is not the quote we work from.
        </p>
        <p className="mt-3 text-muted">
          The estimator does not upload photos. If we ask for roof or property photos, email them or send them when we call. Do not include passwords, payment card numbers or copies of other people’s paperwork.
        </p>
        <h2 className="mt-8 font-display text-2xl">Address search and maps</h2>
        <p className="mt-3 text-muted">
          Address suggestions are looked up from the website server using the Photon address service (OpenStreetMap data), biased toward Cranbourne. The property planner can request an aerial image for the sketch. Map tiles on the work-areas pages are loaded from the map provider when you open those pages. If address search fails, you can type a full Victorian address. We then confirm the location before the price is final.
        </p>
        <h2 className="mt-8 font-display text-2xl">What we do not publish</h2>
        <p className="mt-3 text-muted">
          We do not publish your name, street address, phone number, photos or work-order numbers on the website. Circl work orders stay between you, Circl and VINCONNECT.
        </p>
        <h2 className="mt-8 font-display text-2xl">Access and correction</h2>
        <p className="mt-3 text-muted">
          To ask what we hold, or to correct or delete an enquiry, email{" "}
          <a href={EMAIL_MAILTO} className="text-mint">{EMAIL}</a>. We keep enquiry records for as long as needed to quote, install and handle a warranty question, then delete them when they are no longer required.
        </p>
      </div>
    </SiteShell>
  );
}
