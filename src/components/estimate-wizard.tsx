import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AddressSearch } from "@/components/address-search";
import { AppLink } from "@/components/app-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AddressHit } from "@/lib/geocode";
import { PHONE_TEL } from "@/lib/content";
import { submitLead } from "@/lib/leads";
import { quoteInstall } from "@/lib/pricing.server";
import {
  ESTIMATE_SERVICES,
  STOREYS,
  type EstimateResult,
  type ServiceId,
  type StoreyId,
} from "@/lib/pricing";
import { plannerHref, useSiteSession } from "@/lib/site-session";
import { formatAud } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Contact = { name: string; email: string; phone: string };

const STORAGE_KEY = "vinconnect-estimates";

export function EstimateWizard() {
  const setSiteAddress = useSiteSession((s) => s.setAddress);
  const storedAddress = useSiteSession((s) => s.address);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<AddressHit | null>(storedAddress);
  const [service, setService] = useState<ServiceId | "">("");
  const [storeys, setStoreys] = useState<StoreyId>("single");
  const [conduit, setConduit] = useState(false);
  const [cabinet, setCabinet] = useState(false);
  const [extension, setExtension] = useState(false);
  const [internal, setInternal] = useState(false);
  const [mesh, setMesh] = useState(0);
  const [contact, setContact] = useState<Contact>({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [enquiryId, setEnquiryId] = useState("");
  const [mailNote, setMailNote] = useState("");

  const rec = useMemo(
    () => ESTIMATE_SERVICES.find((s) => s.id === service)?.note,
    [service],
  );

  function next() {
    setError("");
    if (step === 1 && !address) {
      setError("Choose a suggested address, or use the address you typed.");
      return;
    }
    if (step === 2 && !service) {
      setError("Choose the option that best matches your job.");
      return;
    }
    setStep((s) => Math.min(4, s + 1));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!address || !service) return;
    if (!contact.name.trim() || !contact.email.trim() || !contact.phone.trim()) {
      setError("Add your name, email and mobile so we can send the estimate.");
      return;
    }
    setBusy(true);
    setError("");
    setMailNote("");
    try {
      const pricing = await quoteInstall({
        data: {
          service,
          storeys,
          conduit,
          cabinet,
          extension,
          internal,
          mesh,
          lat: address.lat,
          lng: address.lng,
          address: address.address,
          located: address.located !== false,
        },
      });
      const id = `VC-${Date.now().toString(36).toUpperCase()}`;
      const record = {
        id,
        createdAt: new Date().toISOString(),
        contact,
        address: address.address,
        suburb: address.suburb,
        service,
        storeys,
        conduit,
        cabinet,
        extension,
        internal,
        mesh,
        pricing,
      };
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as unknown[];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...prev].slice(0, 20)));
      setSiteAddress(address);
      setResult(pricing);
      setEnquiryId(id);
      setStep(5);
      try {
        await submitLead({
          data: {
            type: "estimate",
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            suburb: address.suburb,
            address: address.address,
            package: service,
            message: [
              `Estimate ${id}`,
              `Service: ${service}`,
              `Storeys: ${storeys}`,
              `Range: ${formatAud(pricing.estimatedLow)}–${formatAud(pricing.estimatedHigh)}`,
              pricing.travelNote,
              `Conduit: ${conduit ? "yes" : "no"}; cabinet router: ${cabinet ? "yes" : "no"}; extension: ${extension ? "yes" : "no"}; concealed: ${internal ? "yes" : "no"}; extra Wi-Fi areas: ${mesh}.`,
              address.located === false ? "Address was typed manually. Confirm the pin before quoting travel." : `Approx distance for internal quoting only: ${pricing.km.toFixed(0)} km.`,
            ].join("\n"),
          },
        });
        setMailNote("VINCONNECT has been emailed this estimate request.");
      } catch {
        setMailNote("Your price is ready. We could not email VINCONNECT automatically — please call 0408 559 555.");
      }
    } catch {
      setError("Unable to calculate your estimate. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="estimate-wizard rounded-xl border border-line-ink bg-paper p-5 text-ink-fg shadow-soft sm:p-8" aria-labelledby="estimate-title">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="kicker">Installation estimator</span>
          <h2 id="estimate-title" className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">
            Check what your installation is likely to cost.
          </h2>
        </div>
        <span className="text-sm text-muted-ink">{step < 5 ? `Step ${step} of 4` : "Estimate ready"}</span>
      </header>
      <div className="mt-5 h-1 overflow-hidden rounded-full bg-paper-2" aria-hidden="true">
        <span
          className="block h-full bg-mint-deep transition-[width] duration-250"
          style={{ width: `${Math.min(step, 4) * 25}%` }}
        />
      </div>

      <form className="mt-8" onSubmit={submit}>
        {step === 1 && (
          <div>
            <span className="font-display text-sm tracking-widest text-muted-ink">01</span>
            <h3 className="mt-1 font-display text-xl">Where is the installation?</h3>
            <p className="mt-2 max-w-xl text-muted-ink">
              Start typing and choose your address. Your location is included automatically in the estimate.
            </p>
            <div className="mt-5">
              <AddressSearch
                onSelect={(hit) => {
                  setAddress(hit);
                  setSiteAddress(hit);
                }}
                selected={address}
              />
            </div>
            {address && (
              <p className="mt-4 text-sm">
                <AppLink
                  to={plannerHref(address)}
                  onClick={() => setSiteAddress(address)}
                  className="text-mint-deep underline-offset-4 hover:underline"
                >
                  Plan this property on the site sketch →
                </AppLink>
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <span className="font-display text-sm tracking-widest text-muted-ink">02</span>
            <h3 className="mt-1 font-display text-xl">What would you like help with?</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {ESTIMATE_SERVICES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={service === item.id}
                  onClick={() => setService(item.id)}
                  className={cn(
                    "rounded-lg border px-4 py-4 text-left transition-colors",
                    service === item.id
                      ? "border-mint-deep bg-mint/20"
                      : "border-line-ink hover:border-ink-fg",
                  )}
                >
                  <strong className="block font-display">{item.title}</strong>
                  <span className="mt-1 block text-sm text-muted-ink">{item.hint}</span>
                </button>
              ))}
            </div>
            {rec && <p className="mt-4 text-sm text-muted-ink">{rec}</p>}
          </div>
        )}

        {step === 3 && (
          <div>
            <span className="font-display text-sm tracking-widest text-muted-ink">03</span>
            <h3 className="mt-1 font-display text-xl">Tell us about the property.</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {STOREYS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={storeys === item.id}
                  onClick={() => setStoreys(item.id)}
                  className={cn(
                    "rounded-lg border px-4 py-4 text-left",
                    storeys === item.id
                      ? "border-mint-deep bg-mint/20"
                      : "border-line-ink hover:border-ink-fg",
                  )}
                >
                  <strong className="block font-display">{item.title}</strong>
                  <span className="mt-1 block text-sm text-muted-ink">{item.hint}</span>
                </button>
              ))}
            </div>
            <h4 className="mt-8 font-display text-base">Anything else we should allow for?</h4>
            <div className="mt-3 grid gap-3">
              <label className="flex min-h-11 items-center gap-3 text-sm">
                <input type="checkbox" checked={conduit} onChange={(e) => setConduit(e.target.checked)} className="size-4 accent-mint-deep" />
                External conduit may be needed (+$120)
              </label>
              <label className="flex min-h-11 items-center gap-3 text-sm">
                <input type="checkbox" checked={cabinet} onChange={(e) => setCabinet(e.target.checked)} className="size-4 accent-mint-deep" />
                Router in the garage or data cabinet (+$150)
              </label>
              <label className="flex min-h-11 items-center gap-3 text-sm">
                <input type="checkbox" checked={extension} onChange={(e) => setExtension(e.target.checked)} className="size-4 accent-mint-deep" />
                Existing system extension or relocation
              </label>
              <label className="flex min-h-11 items-center gap-3 text-sm">
                <input type="checkbox" checked={internal} onChange={(e) => setInternal(e.target.checked)} className="size-4 accent-mint-deep" />
                Concealed internal cable route preferred
              </label>
              <label className="flex flex-col gap-1.5 text-sm sm:max-w-xs">
                Extra Wi-Fi areas
                <select
                  value={mesh}
                  onChange={(e) => setMesh(Number(e.target.value))}
                  className="h-11 rounded-md border border-line-ink bg-paper px-3"
                >
                  <option value={0}>None / not sure</option>
                  <option value={1}>One area</option>
                  <option value={2}>Two areas</option>
                  <option value={3}>Three or more</option>
                </select>
              </label>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <span className="font-display text-sm tracking-widest text-muted-ink">04</span>
            <h3 className="mt-1 font-display text-xl">Where should we send your estimate?</h3>
            <p className="mt-2 max-w-xl text-muted-ink">
              We use these details to show your price and follow up about the installation. You are not joining a marketing list.
            </p>
            <div className="mt-5 grid gap-4 sm:max-w-md">
              <Label className="text-ink-fg">
                Name
                <Input
                  required
                  autoComplete="name"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className="border-line-ink bg-paper text-ink-fg"
                />
              </Label>
              <Label className="text-ink-fg">
                Email
                <Input
                  required
                  type="email"
                  autoComplete="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="border-line-ink bg-paper text-ink-fg"
                />
              </Label>
              <Label className="text-ink-fg">
                Mobile
                <Input
                  required
                  type="tel"
                  autoComplete="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="border-line-ink bg-paper text-ink-fg"
                />
              </Label>
              <p className="text-xs text-muted-ink">
                VINCONNECT uses your details to respond to this enquiry. No marketing subscription is required.{" "}
                <Link to="/privacy" className="underline">
                  Privacy information
                </Link>
                .
              </p>
            </div>
          </div>
        )}

        {step === 5 && result && (
          <div>
            <span className="font-display text-sm tracking-widest text-muted-ink">Your estimate</span>
            <h3 className="mt-1 font-display text-xl">Likely installation range</h3>
            <p className="mt-4 font-display text-4xl tracking-tight tabular-nums">
              {formatAud(result.estimatedLow)}–{formatAud(result.estimatedHigh)}
            </p>
            <p className="mt-3 max-w-xl text-muted-ink">{result.travelNote}</p>
            <ul className="mt-5 divide-y divide-line-ink rounded-lg border border-line-ink text-sm">
              {result.lines.map((line) => (
                <li key={line.label} className="flex items-center justify-between px-4 py-2.5">
                  <span>{line.label}</span>
                  <span className="tabular-nums">{formatAud(line.amount)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ok">
              Enquiry #{enquiryId} is saved. {mailNote || "VINCONNECT has been emailed this request."}
            </p>
            <p className="mt-2 text-xs text-muted-ink">
              Labour range only. Starlink hardware, mounts, kits and electrician work are separately itemised.
            </p>
            <div className="mt-8 border border-line-ink p-4">
              <h4 className="font-display">Want us to confirm it faster?</h4>
              <p className="mt-1 text-sm text-muted-ink">
                Email a few photos of the building, the proposed dish or equipment location, roof access and the router area. Quote reference {enquiryId}.
              </p>
              <Button asChild className="mt-3" variant="ink">
                <a href={`mailto:vince@vinconnect.com.au?subject=${encodeURIComponent(`Photos for ${enquiryId}`)}`}>
                  Email photos for this estimate
                </a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href={PHONE_TEL}>Call VINCONNECT</a>
              </Button>
              <Button asChild variant="ink">
                <AppLink
                  to={address ? plannerHref(address) : "/property-planner"}
                  onClick={() => address && setSiteAddress(address)}
                >
                  Plan the whole property
                </AppLink>
              </Button>
            </div>
          </div>
        )}

        {error && (
          <p role="alert" className="mt-4 text-sm text-danger">
            {error}
          </p>
        )}

        {step < 5 && (
          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 1 ? (
              <Button type="button" variant="ink" onClick={() => { setError(""); setStep((s) => s - 1); }}>
                Back
              </Button>
            ) : (
              <span />
            )}
            {step < 4 ? (
              <Button type="button" onClick={next}>
                {step === 1 ? "Continue" : "Continue"}
              </Button>
            ) : (
              <Button type="submit" disabled={busy}>
                {busy ? "Checking…" : "Show My Install Price"}
              </Button>
            )}
          </div>
        )}
      </form>
    </section>
  );
}
