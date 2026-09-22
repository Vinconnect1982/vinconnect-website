import { createFileRoute, Link } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/enquiry-form";
import { SiteShell } from "@/components/site-shell";
import { EMAIL, EMAIL_MAILTO, PHONE, PHONE_TEL, SOCIALS } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [{ title: "Contact VINCONNECT | Installation Enquiries" }],
  }),
});

function ContactPage() {
  return (
    <SiteShell>
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2">
        <div>
          <p className="kicker">VINCONNECT · Connecting Victoria</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            Let’s get your property connected.
          </h1>
          <p className="mt-4 text-muted">
            Tell us what isn’t working, what you’d like to connect and where you’re located. We’ll
            help you plan the next step.
          </p>
          <div className="mt-8">
            <p className="kicker">Talk to VINCONNECT</p>
            <h2 className="mt-2 font-display text-2xl">A practical conversation first.</h2>
            <p className="mt-2 text-muted">
              For installation questions, rural Wi-Fi, CCTV or a multi-building network, start here.
            </p>
            <a href={PHONE_TEL} className="mt-5 block font-display text-3xl text-mint">
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
            <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-muted">
              <li>Tell us about the property and your priorities.</li>
              <li>We clarify access, equipment and the proposed scope.</li>
              <li>You receive a quote to review before booking.</li>
            </ol>
            <p className="mt-4 text-sm">
              Just need a starting price for Starlink mounting?{" "}
              <Link to="/estimate" className="text-mint">
                Use the installation estimator →
              </Link>
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-line bg-surface p-6">
          <EnquiryForm buttonLabel="Send my project enquiry" />
        </div>
      </div>
    </SiteShell>
  );
}
