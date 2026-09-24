import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AddressSearch } from "@/components/address-search";
import { AppLink } from "@/components/app-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AddressHit } from "@/lib/geocode";
import { PHONE_TEL } from "@/lib/content";
import { emailEstimate } from "@/lib/estimate-mail";
import { buildEstimatePdf } from "@/lib/estimate-pdf";
import { quoteInstall } from "@/lib/quote";
import { findQuote } from "@/lib/submissions";
import {
  DATA_CABINET,
  DOUBLE_STOREY_ADD,
  INTERNAL_WALLS,
  MOUNT_HOCKEY,
  MOUNT_TRIPOD,
  SATURDAY_INSTALL,
  priceEstimate,
  type EstimateInput,
  type EstimateResult,
  type InstallDay,
  type MountNeed,
  type PropertyKind,
  type QuoteDepth,
  type RoofId,
  type StoreyId,
} from "@/lib/pricing";
import { plannerHref, useSiteSession } from "@/lib/site-session";
import { REFERRAL_NOTE, STARLINK_REFERRAL_URL, trackEvent } from "@/lib/referral";
import { cn, formatAud } from "@/lib/utils";

type Contact = { name: string; email: string; phone: string };

const STORAGE_KEY = "vinconnect-estimates";

export function EstimateWizard() {
  const setSiteAddress = useSiteSession((s) => s.setAddress);
  const storedAddress = useSiteSession((s) => s.address);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<AddressHit | null>(storedAddress);
  const [property, setProperty] = useState<PropertyKind | "">("");
  const [depth, setDepth] = useState<QuoteDepth>("quick");
  const [storeys, setStoreys] = useState<StoreyId>("single");
  const [day, setDay] = useState<InstallDay>("weekday");
  const [mountNeed, setMountNeed] = useState<MountNeed>("yes");
  const [roof, setRoof] = useState<RoofId | "">("");
  const [cabinet, setCabinet] = useState(false);
  const [internal, setInternal] = useState(false);
  const [contact, setContact] = useState<Contact>({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [enquiryId, setEnquiryId] = useState("");
  const [mailNote, setMailNote] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  function buildInput(nextDepth: QuoteDepth): EstimateInput {
    return {
      service: "starlink",
      property: property === "commercial" ? "commercial" : "residential",
      depth: nextDepth,
      storeys: storeys === "double" ? "double" : "single",
      day: day === "saturday" ? "saturday" : "weekday",
      internal,
      cabinet,
      roof: roof || "unknown",
      mountNeed,
      lat: address?.lat ?? 0,
      lng: address?.lng ?? 0,
      address: address?.address ?? "",
      located: address?.located !== false && Boolean(address),
    };
  }

  const quickQuote = useMemo(
    () => (address && property === "residential" ? priceEstimate(buildInput("quick")) : null),
    [address, property, storeys],
  );
  const detailedQuote = useMemo(() => {
    if (!address || property !== "residential" || !roof || !storeys || !day) return null;
    return priceEstimate(buildInput("detailed"));
  }, [address, property, roof, mountNeed, storeys, day, internal, cabinet]);

  function next() {
    setError("");
    if (step === 1 && !address) {
      setError("Choose a suggested address, or use the address you typed.");
      return;
    }
    if (step === 2 && !property) {
      setError("Tell us whether the property is residential or commercial.");
      return;
    }
    if (step === 2 && property === "commercial") {
      setDepth("quick");
      setStep(5);
      return;
    }
    if (step === 4 && !roof) {
      setError("Tell us whether the roof is Colorbond / metal or tile.");
      return;
    }
    if (step === 4) setDepth("detailed");
    setStep((s) => Math.min(5, s + 1));
  }

  function back() {
    setError("");
    if (step === 5 && property === "commercial") {
      setStep(2);
      return;
    }
    if (step === 5 && depth === "detailed") {
      setStep(4);
      return;
    }
    setStep((s) => Math.max(1, s - 1));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!address || !property) return;
    if (property === "residential" && depth === "detailed" && !roof) return;
    if (!contact.name.trim() || !contact.email.trim() || !contact.phone.trim()) {
      setError("Add your name, email and mobile so we can send the quote.");
      return;
    }
    setBusy(true);
    setError("");
    setMailNote("");
    const input = buildInput(property === "commercial" ? "quick" : depth);
    try {
      const pricing = await quoteInstall({ data: input });
      const id = quoteCode();
      const record = {
        id,
        createdAt: new Date().toISOString(),
        contact,
        address: address.address,
        suburb: address.suburb,
        input,
        pricing,
      };
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as unknown[];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...prev].slice(0, 20)));
      setSiteAddress(address);
      setResult(pricing);
      setEnquiryId(id);
      setStep(6);
      setMailNote(pricing.kind === "callback" ? "Sending your details…" : "Sending your quote…");
      const doc = {
        id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        address: address.address,
        result: pricing,
      };
      try {
        const pdf = await buildEstimatePdf(doc);
        setPdfUrl(URL.createObjectURL(new Blob([Uint8Array.from(pdf)], { type: "application/pdf" })));
        const branded = await emailEstimate({ data: { ...input, id, name: contact.name, email: contact.email, phone: contact.phone } });
        setMailNote(
          branded.emailed
            ? pricing.kind === "callback"
              ? "We've emailed VINCONNECT. We'll contact you to quote the job."
              : "We've emailed this quote to you and to VINCONNECT, with the PDF attached."
            : "Your quote is saved with VINCONNECT. If the email doesn't arrive, call 0408 559 555.",
        );
      } catch {
        setMailNote("Your quote is ready. If the email doesn't arrive, call 0408 559 555.");
      }
    } catch {
      setError("Unable to prepare your quote. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const suppliedMount =
    mountNeed === "yes" && roof === "tile"
      ? `Hockey stick mount and pole adaptor, ${formatAud(MOUNT_HOCKEY)}`
      : mountNeed === "yes" && roof === "metal"
        ? `Tripod mount and pole adaptor, ${formatAud(MOUNT_TRIPOD)}`
        : "";

  return (
    <section className="estimate-wizard rounded-xl border border-line-ink bg-paper p-5 text-ink-fg shadow-soft sm:p-8" aria-labelledby="estimate-title">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="kicker">Installation quote</span>
          <h2 id="estimate-title" className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">
            Check what the installation will cost.
          </h2>
        </div>
        <span className="text-sm text-muted-ink">{step < 6 ? progressLabel(step, property) : "Quote ready"}</span>
      </header>

      <form className="mt-8" onSubmit={submit}>
        {step === 1 && (
          <div>
            <span className="font-display text-sm tracking-widest text-muted-ink">01</span>
            <h3 className="mt-1 font-display text-xl">Where is the installation?</h3>
            <p className="mt-2 max-w-xl text-muted-ink">
              Start typing and choose the address. Travel is worked into the quote from there.
            </p>
            <div className="mt-5">
              <AddressSearch
                onSelect={(hit) => {
                  setAddress(hit);
                  setSiteAddress(hit);
                  setError("");
                  setStep(2);
                }}
                selected={address}
              />
            </div>
            {address && (
              <p className="mt-4 text-sm text-ok">Address confirmed. Choose the property type next.</p>
            )}
            <FindQuote />
          </div>
        )}

        {step === 2 && (
          <div>
            <span className="font-display text-sm tracking-widest text-muted-ink">02</span>
            <h3 className="mt-1 font-display text-xl">Is the property residential or commercial?</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Choice pressed={property === "residential"} onClick={() => { setProperty("residential"); setError(""); setStep(3); }} title="Residential" hint="House, unit or farm home. You can get a quote now." />
              <Choice pressed={property === "commercial"} onClick={() => { setProperty("commercial"); setDepth("quick"); setError(""); setStep(5); }} title="Commercial" hint="We quote the job and contact you. No online price." />
            </div>
          </div>
        )}

        {step === 3 && quickQuote && (
          <div>
            <span className="font-display text-sm tracking-widest text-muted-ink">Quick quote</span>
            <h3 className="mt-1 font-display text-xl">Standard install at this address</h3>
            <StoreyToggle value={storeys} onChange={setStoreys} />
            <QuoteList result={quickQuote} />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button type="button" onClick={() => { setDepth("quick"); setError(""); setStep(5); }}>
                Email me this quote
              </Button>
              <Button type="button" variant="ink" onClick={() => { setError(""); setStep(4); }}>
                Make this quote more accurate
              </Button>
            </div>
            <p className="mt-4 max-w-xl text-sm text-muted-ink">
              This is the standard weekday install. Next you can add a mount, a longer cable run or a Saturday.
            </p>
          </div>
        )}

        {step === 4 && (
          <div>
            <span className="font-display text-sm tracking-widest text-muted-ink">Full quote</span>
            <h3 className="mt-1 font-display text-xl">Add anything that changes the job.</h3>
            <p className="mt-2 max-w-xl text-muted-ink">
              A standard install is already the cable down an external wall to a wall plate, on a weekday.
            </p>
            <StoreyToggle value={storeys} onChange={setStoreys} />
            <MountToggle value={mountNeed} onChange={setMountNeed} />

            <h4 className="mt-8 font-display text-base">What sort of roof is it?</h4>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Choice
                pressed={roof === "metal"}
                onClick={() => setRoof("metal")}
                title="Colorbond / metal"
                hint={mountNeed === "yes" ? `We supply a tripod and pole adaptor. Adds ${formatAud(MOUNT_TRIPOD)}.` : "No mount charge."}
              />
              <Choice
                pressed={roof === "tile"}
                onClick={() => setRoof("tile")}
                title="Tile"
                hint={mountNeed === "yes" ? `We supply a hockey-stick mount and pole adaptor. Adds ${formatAud(MOUNT_HOCKEY)}.` : "No mount charge."}
              />
            </div>
            {!roof && <p className="mt-3 text-sm text-muted-ink">Choose the roof to update the price.</p>}
            {suppliedMount && <p className="mt-4 text-sm">We will supply: {suppliedMount}.</p>}

            <h4 className="mt-8 font-display text-base">Does the cable need to go further than the wall plate?</h4>
            <div className="mt-3 grid gap-3">
              <label className="flex min-h-11 items-start gap-3 text-sm">
                <input type="checkbox" checked={internal} onChange={(e) => setInternal(e.target.checked)} className="mt-1 size-4 accent-mint-deep" />
                <span>
                  Through internal walls — from {formatAud(INTERNAL_WALLS)}
                  <span className="mt-1 block text-muted-ink">This price can vary with the property.</span>
                </span>
              </label>
              <label className="flex min-h-11 items-start gap-3 text-sm">
                <input type="checkbox" checked={cabinet} onChange={(e) => setCabinet(e.target.checked)} className="mt-1 size-4 accent-mint-deep" />
                <span>To a data rack or data cabinet — {formatAud(DATA_CABINET)}</span>
              </label>
            </div>

            <h4 className="mt-8 font-display text-base">When do you want it installed?</h4>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Choice pressed={day === "weekday"} onClick={() => setDay("weekday")} title="Weekday" hint="Included in the standard install." />
              <Choice pressed={day === "saturday"} onClick={() => setDay("saturday")} title="Saturday" hint={`Adds ${formatAud(SATURDAY_INSTALL)}.`} />
            </div>

            {detailedQuote && (
              <div className="mt-8">
                <p className="font-display text-sm tracking-widest text-muted-ink">Updated quote</p>
                <QuoteList result={detailedQuote} />
              </div>
            )}
          </div>
        )}

        {step === 5 && (
          <div>
            <span className="font-display text-sm tracking-widest text-muted-ink">Send it</span>
            <h3 className="mt-1 font-display text-xl">
              {property === "commercial" ? "Where should we contact you?" : "Where should we send the quote?"}
            </h3>
            <p className="mt-2 max-w-xl text-muted-ink">
              {property === "commercial"
                ? "Commercial jobs are quoted after we speak with you. You are not joining a marketing list."
                : "We use these details to email the quote and follow up about the installation. You are not joining a marketing list."}
            </p>
            <div className="mt-5 grid gap-4 sm:max-w-md">
              <Label className="text-ink-fg">
                Name
                <Input required autoComplete="name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} className="border-line-ink bg-paper text-ink-fg" />
              </Label>
              <Label className="text-ink-fg">
                Email
                <Input required type="email" autoComplete="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="border-line-ink bg-paper text-ink-fg" />
              </Label>
              <Label className="text-ink-fg">
                Mobile
                <Input required type="tel" autoComplete="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} className="border-line-ink bg-paper text-ink-fg" />
              </Label>
              <p className="text-xs text-muted-ink">
                VINCONNECT uses your details to respond to this enquiry. No marketing subscription is required.{" "}
                <Link to="/privacy" className="underline">Privacy information</Link>.
              </p>
            </div>
          </div>
        )}

        {step === 6 && result && (
          <div>
            {result.kind === "callback" ? (
              <>
                <span className="font-display text-sm tracking-widest text-muted-ink">Commercial</span>
                <h3 className="mt-1 font-display text-xl">We'll quote this job and contact you.</h3>
                <p className="mt-3 max-w-xl text-muted-ink">{result.travelNote}</p>
                <p className="mt-3 text-sm">{result.paymentNote}</p>
              </>
            ) : (
              <>
                <span className="font-display text-sm tracking-widest text-muted-ink">Your quote</span>
                <h3 className="mt-1 font-display text-xl">{depth === "quick" ? "Quick installation quote" : "Installation quote"}</h3>
                <p className="mt-3 text-sm">Roof: {result.roofLabel}. Mount: {result.mountLabel}.</p>
                <QuoteList result={result} />
              </>
            )}
            <p className="mt-4 text-sm text-ok">Quote {enquiryId} is saved. {mailNote}</p>
            <p className="mt-2 max-w-xl text-sm text-muted-ink">
              Keep that code. You can open the quote again with the code, or with the email and installation address you used.
            </p>
            {pdfUrl && (
              <Button asChild className="mt-4" variant="ink">
                <a href={pdfUrl} download={`VINCONNECT-${enquiryId}.pdf`}>Download the quote PDF</a>
              </Button>
            )}
            {property === "residential" && (
              <div className="mt-6 max-w-xl rounded-lg border border-line-ink p-4">
                <p className="font-display text-lg">Haven't ordered your kit yet?</p>
                <p className="mt-2 text-sm text-muted-ink">
                  Check the VINCONNECT Starlink referral offer before you buy. If you already have the equipment, you can ignore this.
                </p>
                <a href={STARLINK_REFERRAL_URL} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-mint underline" onClick={() => trackEvent("starlink_referral_click")}>
                  Get one month free
                </a>
                <p className="mt-2 text-xs text-muted-ink">{REFERRAL_NOTE}</p>
              </div>
            )}
            <div className="mt-8 border border-line-ink p-4">
              <h4 className="font-display">Want us to confirm it faster?</h4>
              <p className="mt-1 text-sm text-muted-ink">
                Email a few photos of the building, the proposed dish location, roof access and where the cable should finish. Quote reference {enquiryId}.
              </p>
              <Button asChild className="mt-3" variant="ink">
                <a href={`mailto:vince@vinconnect.com.au?subject=${encodeURIComponent(`Photos for ${enquiryId}`)}`}>Email photos for this quote</a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <a href={PHONE_TEL}>Call VINCONNECT</a>
              </Button>
              <Button asChild variant="ink">
                <AppLink to={address ? plannerHref(address) : "/property-planner"} onClick={() => address && setSiteAddress(address)}>
                  Plan the whole property
                </AppLink>
              </Button>
            </div>
          </div>
        )}

        {error && (
          <p role="alert" className="mt-4 text-sm text-danger">{error}</p>
        )}

        {step < 6 && step !== 3 && (
          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 1 ? (
              <Button type="button" variant="ink" onClick={back}>Back</Button>
            ) : (
              <span />
            )}
            {step < 5 ? (
              <Button type="button" onClick={next}>{step === 4 ? "Use this quote" : "Continue"}</Button>
            ) : (
              <Button type="submit" disabled={busy}>{busy ? "Sending…" : property === "commercial" ? "Send my details" : "Email my quote"}</Button>
            )}
          </div>
        )}
        {step === 3 && (
          <div className="mt-8">
            <Button type="button" variant="ink" onClick={back}>Back</Button>
          </div>
        )}
      </form>
    </section>
  );
}

function quoteCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return `VC-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
}

function progressLabel(step: number, property: PropertyKind | "") {
  if (property === "commercial" && step === 5) return "Step 3 of 3 · Your details";
  const labels = ["Address", "Property", "Quick quote", "Full quote", "Your details"];
  return `Step ${step} of 5 · ${labels[step - 1] ?? ""}`;
}

function MountToggle({ value, onChange }: { value: MountNeed; onChange: (value: MountNeed) => void }) {
  const supply = value !== "no";
  return (
    <button
      type="button"
      aria-pressed={supply}
      onClick={() => onChange(supply ? "no" : "yes")}
      className="mt-3 flex w-full items-center justify-between gap-4 rounded-lg border border-line-ink px-4 py-3 text-left"
    >
      <span>
        <strong className="font-display">{supply ? "We'll supply the mount" : "I already have a mount"}</strong>
        <span className="mt-1 block text-sm text-muted-ink">
          {supply
            ? "On. The mount is chosen from the roof and added to the quote. Switch off if you already have one."
            : "Off. No mount is added. Switch on if you need us to supply one."}
        </span>
      </span>
      <span className={cn("relative h-7 w-12 shrink-0 rounded-full", supply ? "bg-mint-deep" : "bg-line-ink")}>
        <span className={cn("absolute top-0.5 size-6 rounded-full bg-paper transition-transform", supply ? "left-5" : "left-0.5")} />
      </span>
    </button>
  );
}

function StoreyToggle({ value, onChange }: { value: StoreyId; onChange: (value: StoreyId) => void }) {
  const single = value !== "double";
  return (
    <button
      type="button"
      aria-pressed={!single}
      onClick={() => onChange(single ? "double" : "single")}
      className="mt-5 flex w-full items-center justify-between gap-4 rounded-lg border border-line-ink px-4 py-3 text-left"
    >
      <span>
        <strong className="font-display">{single ? "Single storey" : "Double storey"}</strong>
        <span className="mt-1 block text-sm text-muted-ink">
          {single ? `Included. Switch to double storey to add ${formatAud(DOUBLE_STOREY_ADD)}.` : `Adds ${formatAud(DOUBLE_STOREY_ADD)}. Switch back to single storey.`}
        </span>
      </span>
      <span className={cn("relative h-7 w-12 shrink-0 rounded-full", single ? "bg-line-ink" : "bg-mint-deep")}>
        <span className={cn("absolute top-0.5 size-6 rounded-full bg-paper transition-transform", single ? "left-0.5" : "left-5")} />
      </span>
    </button>
  );
}

function FindQuote() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  async function lookup() {
    setBusy(true);
    setNote("");
    try {
      const result = await findQuote({ data: { code, email, address } });
      if (!result.found) {
        setNote("No quote matched that code, or that email and address.");
        return;
      }
      const total = result.quote.total != null ? formatAud(result.quote.total) : "";
      setNote(`${result.quote.id} · ${result.quote.address || result.quote.suburb} · ${total}\n${result.quote.summary}`);
    } catch {
      setNote("The quote could not be opened. Call 0408 559 555.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <details className="mt-8 border-t border-line-ink pt-4">
      <summary className="cursor-pointer font-display text-lg">Already have a quote?</summary>
      <p className="mt-2 text-sm text-muted-ink">Enter the quote code from the email, or the same email and installation address.</p>
      <div className="mt-4 grid gap-3 sm:max-w-md">
        <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Quote code, for example VC-AB12CD34" className="border-line-ink bg-paper text-ink-fg" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Or email" className="border-line-ink bg-paper text-ink-fg" />
        <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="And installation address" className="border-line-ink bg-paper text-ink-fg" />
        <Button type="button" variant="ink" disabled={busy} onClick={lookup}>{busy ? "Looking…" : "Open my quote"}</Button>
      </div>
      {note && <p className="mt-3 whitespace-pre-wrap text-sm text-muted-ink">{note}</p>}
    </details>
  );
}

function Choice({ pressed, onClick, title, hint }: { pressed: boolean; onClick: () => void; title: string; hint?: string }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn("rounded-lg border px-4 py-4 text-left", pressed ? "border-mint-deep bg-mint/20" : "border-line-ink hover:border-ink-fg")}
    >
      <strong className="block font-display">{title}</strong>
      {hint && <span className="mt-1 block text-sm text-muted-ink">{hint}</span>}
    </button>
  );
}

function QuoteList({ result }: { result: EstimateResult }) {
  return (
    <div>
      <p className="mt-4 font-display text-4xl tracking-tight tabular-nums">{formatAud(result.total)}</p>
      <ul className="mt-5 divide-y divide-line-ink rounded-lg border border-line-ink text-sm">
        {result.lines.map((line) => (
          <li key={line.label} className="flex items-start justify-between gap-4 px-4 py-2.5">
            <span>
              {line.label}
              {line.note && <span className="mt-0.5 block text-xs text-muted-ink">{line.note}</span>}
            </span>
            <span className="tabular-nums">{formatAud(line.amount)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 max-w-xl text-sm text-muted-ink">{result.travelNote}</p>
      <p className="mt-2 text-sm">{result.paymentNote}</p>
    </div>
  );
}
