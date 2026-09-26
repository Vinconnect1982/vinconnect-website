import { AppLink } from "@/components/app-link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AddressSearch } from "@/components/address-search";
import { SiteSketch } from "@/components/site-sketch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AddressHit } from "@/lib/geocode";
import { useSiteSession } from "@/lib/site-session";
import { traceProperty, type PropertyTrace } from "@/lib/site-trace";
import { haversineKm, formatAud } from "@/lib/utils";
import { emailEstimate } from "@/lib/estimate-mail";
import { pricePropertyPlan, quoteFigure, quotePropertyPlan } from "@/lib/install-estimate";
import { cn } from "@/lib/utils";
import { Map as MapIcon, Plus, Trash2 } from "lucide-react";

type Kind = "house" | "shed" | "stable" | "gate" | "office" | "accommodation" | "other";
type Place = {
  id: number;
  label: string;
  kind: Kind;
  lat: number;
  lng: number;
  power: boolean;
  sight: "clear" | "trees" | "unknown";
  camera: boolean;
};

const KINDS: Kind[] = ["house", "shed", "stable", "gate", "office", "accommodation", "other"];

function kindFromOsm(kind: string): Kind {
  if (kind.includes("garage") || kind.includes("shed") || kind.includes("carport")) return "shed";
  if (kind.includes("stable") || kind.includes("farm")) return "stable";
  if (kind.includes("office") || kind.includes("commercial")) return "office";
  if (kind.includes("house") || kind.includes("residential") || kind.includes("detached")) return "house";
  return "other";
}

function nextLabel(n: number): string {
  return ["House / internet", "Shed", "Stable", "Gate", "Office", "Arena"][n] ?? `Place ${n + 1}`;
}

function recommend(places: Place[], sourceId: number, internet: string, goal: string, address: string) {
  const source = places.find((p) => p.id === sourceId) ?? places[0];
  const others = places.filter((p) => p.id !== source?.id);
  const lines = others.map((p) => {
    const km = source ? haversineKm(source, p) : 0;
    const m = Math.round(km * 1000);
    let title = "Wi-Fi coverage";
    let body =
      "Give this building its own indoor coverage. A wireless bridge connects buildings but does not replace indoor Wi-Fi.";
    let href = "/services/whole-property-wifi";
    if (m > 40) {
      title = "Building-to-building wireless link";
      body = `About ${m} m from the internet source. A dedicated point-to-point link is usually cleaner than hoping house Wi-Fi will stretch.`;
      href = "/services/wireless-links";
    }
    if (p.camera || p.kind === "gate" || p.kind === "stable") {
      title = p.kind === "stable" ? "Stable camera planning" : "Camera at this location";
      body = `Plan the view, power and recording before choosing hardware. ${p.power ? "Power is marked as available." : "No power marked — solar or a new run may be needed."}`;
      href = p.kind === "stable" ? "/security/stable-cctv" : "/security/solar-cameras";
    }
    return { label: p.label, distance: `${m} m`, title, body, href };
  });
  const internetNote =
    internet === "none"
      ? "Start by checking fixed, mobile and Starlink availability at the property."
      : `Start by checking the speed and stability of your ${internet === "nbn" ? "fixed connection" : internet === "mobile" ? "mobile broadband" : "Starlink connection"}.`;
  const goalNote =
    goal === "business"
      ? "Separate guest and business access, consider backup power and agree support responsibilities."
      : goal === "cameras"
        ? "Plan camera views, recording retention and remote access before choosing camera counts."
        : "Give each connected building its own coverage plan; a wireless bridge connects buildings but does not replace indoor Wi-Fi.";
  return {
    address,
    internetNote,
    goalNote,
    lines,
    summary: `PROPERTY PLAN — traced outlines plus customer-placed points, not a survey. Address: ${address || "(not set)"}. Internet: ${internet}; goal: ${goal}. Confirm location, access, power and obstructions before quoting.`,
  };
}

function placesFromTrace(trace: PropertyTrace): Place[] {
  const list: Place[] = [];
  let id = 1;
  const house = trace.house;
  if (house) {
    list.push({
      id: id++,
      label: "House / internet",
      kind: "house",
      lat: house.centroid.lat,
      lng: house.centroid.lng,
      power: true,
      sight: "unknown",
      camera: false,
    });
  }
  for (const b of trace.buildings) {
    if (b === house) continue;
    if (list.length >= 8) break;
    list.push({
      id: id++,
      label: b.kind.replace(/_/g, " "),
      kind: kindFromOsm(b.kind),
      lat: b.centroid.lat,
      lng: b.centroid.lng,
      power: false,
      sight: "unknown",
      camera: false,
    });
  }
  return list;
}

export function PropertyPlanner({
  incoming,
}: {
  incoming?: { q?: string; lat?: number; lng?: number };
}) {
  const stored = useSiteSession((s) => s.address);
  const setStored = useSiteSession((s) => s.setAddress);
  const [address, setAddress] = useState<AddressHit | null>(null);
  const [internet, setInternet] = useState("starlink");
  const [goal, setGoal] = useState("wifi");
  const [places, setPlaces] = useState<Place[]>([]);
  const [sourceId, setSourceId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [placing, setPlacing] = useState(false);
  const [review, setReview] = useState(false);
  const [trace, setTrace] = useState<PropertyTrace | null>(null);
  const [tracing, setTracing] = useState(false);
  const [error, setError] = useState("");
  const [proposalNote, setProposalNote] = useState("");
  const [proposalBusy, setProposalBusy] = useState(false);
  const [proposalName, setProposalName] = useState("");
  const [proposalEmail, setProposalEmail] = useState("");
  const [proposalPhone, setProposalPhone] = useState("");
  const [storeys, setStoreys] = useState<"single" | "double">("single");
  const [roof, setRoof] = useState<"metal" | "tile" | "unknown">("unknown");
  const [mountNeed, setMountNeed] = useState<"yes" | "no" | "unknown">("unknown");
  const [cableRoute, setCableRoute] = useState<"external" | "unknown">("unknown");
  const nextId = useRef(1);
  const booted = useRef(false);

  const selected = places.find((p) => p.id === selectedId) ?? null;
  const source = places.find((p) => p.id === sourceId) ?? places[0] ?? null;
  const installed = useMemo(() => {
    if (!address) return null;
    return pricePropertyPlan({
      lat: address.lat,
      lng: address.lng,
      located: address.located,
      internet,
      storeys,
      roof,
      mountNeed,
      cableRoute,
      places: places.map((place) => ({
        label: place.label,
        kind: place.kind,
        lat: place.lat,
        lng: place.lng,
        power: place.power,
        isSource: place.id === (source?.id ?? places[0]?.id),
      })),
    });
  }, [address, internet, storeys, roof, mountNeed, cableRoute, places, source]);

  const applyAddress = useCallback(
    async (hit: AddressHit) => {
      setAddress(hit);
      setStored(hit);
      setError("");
      setReview(false);
      setTracing(true);
      try {
        const next = await traceProperty({ data: { lat: hit.lat, lng: hit.lng } });
        setTrace(next);
        const seeded = placesFromTrace(next);
        setPlaces(seeded);
        setSourceId(seeded[0]?.id ?? null);
        setSelectedId(seeded[0]?.id ?? null);
        nextId.current = (seeded.at(-1)?.id ?? 0) + 1;
      } catch {
        setTrace(null);
        setError("Map not working? Use sketch planner. You can still drop points on the plan.");
      } finally {
        setTracing(false);
      }
    },
    [setStored],
  );

  useEffect(() => {
    if (booted.current) return;
    const fromUrl =
      incoming?.lat && incoming?.lng
        ? {
            address: incoming.q || stored?.address || "Selected property",
            lat: incoming.lat,
            lng: incoming.lng,
            suburb: stored?.suburb || "",
            postcode: stored?.postcode || "",
            located: true,
          }
        : stored;
    if (fromUrl) {
      booted.current = true;
      void applyAddress(fromUrl);
    }
  }, [incoming, stored, applyAddress]);

  function dropPlace(lat: number, lng: number) {
    setPlaces((list) => {
      if (list.length >= 12) return list;
      const id = nextId.current++;
      const place: Place = {
        id,
        label: nextLabel(list.length),
        kind: list.length === 0 ? "house" : "shed",
        lat,
        lng,
        power: true,
        sight: "unknown",
        camera: false,
      };
      setSelectedId(id);
      if (list.length === 0) setSourceId(id);
      setPlacing(false);
      return [...list, place];
    });
  }

  function updatePlace(id: number, patch: Partial<Place>) {
    setPlaces((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function removePlace(id: number) {
    setPlaces((list) => list.filter((p) => p.id !== id));
    if (selectedId === id) setSelectedId(null);
    if (sourceId === id) setSourceId(places.find((p) => p.id !== id)?.id ?? null);
  }

  const plan = useMemo(
    () => recommend(places, sourceId ?? 0, internet, goal, address?.address || ""),
    [places, sourceId, internet, goal, address],
  );

  const field = "h-11 rounded-md border border-line bg-raised px-3 text-fg";

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_22.5rem]">
        <div className="relative min-h-80 bg-paper-2">
          <div className="h-[24rem] w-full lg:h-[42rem]">
            {address ? (
              <SiteSketch
                origin={address}
                trace={trace}
                places={places}
                sourceId={sourceId}
                selectedId={selectedId}
                placing={placing}
                onPickGround={dropPlace}
                onSelectPlace={setSelectedId}
              />
            ) : (
              <div className="grid h-full place-items-center bg-paper px-6 text-center text-ink-fg">
                <p className="max-w-sm font-display text-xl">Enter the address to draw the mud map.</p>
              </div>
            )}
          </div>
          {tracing && (
            <div className="absolute left-4 top-4 rounded-md bg-ink/85 px-3 py-2 text-sm text-mint">
              Tracing house and boundary…
            </div>
          )}
        </div>

        <aside className="flex max-h-[42rem] flex-col overflow-y-auto border-t border-line lg:border-l lg:border-t-0">
          <div className="border-b border-line px-4 py-4">
            <p className="kicker">Site console</p>
            <h2 className="mt-1 font-display text-xl">Mud map</h2>
            <p className="mt-1 text-sm text-muted">Address, places, then review the plan.</p>
          </div>

          <div className="grid gap-4 px-4 py-4">
            <AddressSearch
              label="Property address"
              variant="dark"
              selected={address}
              onSelect={(hit) => void applyAddress(hit)}
            />

            {trace && (
              <p className="text-xs text-muted">
                {trace.house ? "House outlined." : "Pin set at the address."}{" "}
                {trace.buildings.length > 1 ? `${trace.buildings.length} buildings. ` : ""}
                {trace.boundarySource === "mapped" ? "Boundary from Vicmap." : "Boundary estimated around the house."}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Label>
                Internet
                <select value={internet} onChange={(e) => setInternet(e.target.value)} className={field}>
                  <option value="starlink">Starlink</option>
                  <option value="nbn">NBN / fixed</option>
                  <option value="mobile">Mobile</option>
                  <option value="none">None yet</option>
                </select>
              </Label>
              <Label>
                Goal
                <select value={goal} onChange={(e) => setGoal(e.target.value)} className={field}>
                  <option value="wifi">Wi-Fi</option>
                  <option value="cameras">Cameras</option>
                  <option value="business">Business</option>
                </select>
              </Label>
            </div>

            <Button type="button" size="sm" onClick={() => setPlacing(true)} disabled={places.length >= 12}>
              <Plus className="size-4" />
              {places.length === 0 ? "Place house" : placing ? "Click the plan…" : "Add a place"}
            </Button>

            <ul className="grid gap-1">
              {places.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    aria-pressed={selectedId === p.id}
                    className={cn(
                      "flex min-h-11 w-full items-center justify-between rounded-md px-3 text-left text-sm",
                      selectedId === p.id ? "bg-raised text-mint" : "hover:bg-raised",
                    )}
                    onClick={() => setSelectedId(p.id)}
                  >
                    <span>{p.label}</span>
                    {source?.id === p.id && <span className="text-xs text-muted">source</span>}
                  </button>
                </li>
              ))}
            </ul>

            {selected && (
              <div className="grid gap-3 border-t border-line pt-4 text-sm">
                <Label>
                  Label
                  <Input
                    maxLength={35}
                    value={selected.label}
                    onChange={(e) => updatePlace(selected.id, { label: e.target.value })}
                  />
                </Label>
                <Label>
                  Kind
                  <select
                    value={selected.kind}
                    onChange={(e) => updatePlace(selected.id, { kind: e.target.value as Kind })}
                    className={field}
                  >
                    {KINDS.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </Label>
                <Label>
                  Power
                  <select
                    value={selected.power ? "yes" : "no"}
                    onChange={(e) => updatePlace(selected.id, { power: e.target.value === "yes" })}
                    className={field}
                  >
                    <option value="yes">Available</option>
                    <option value="no">Unknown / none</option>
                  </select>
                </Label>
                <label className="flex min-h-11 items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected.camera}
                    onChange={(e) => updatePlace(selected.id, { camera: e.target.checked })}
                    className="size-4 accent-mint"
                  />
                  Camera needed here
                </label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    disabled={sourceId === selected.id}
                    onClick={() => setSourceId(selected.id)}
                  >
                    Use as internet source
                  </Button>
                  <Button type="button" size="sm" variant="ghost" onClick={() => removePlace(selected.id)}>
                    <Trash2 className="size-4" />
                    Remove
                  </Button>
                </div>
              </div>
            )}

            {error && <p className="text-sm text-danger">{error}</p>}
          </div>

          <div className="mt-auto border-t border-line p-4">
            <Button className="w-full" type="button" disabled={places.length < 1} onClick={() => setReview(true)}>
              <MapIcon className="size-4" />
              Review my property plan
            </Button>
          </div>
        </aside>
      </div>

      {review && (
        <section className="border-t border-line p-6" aria-labelledby="plan-review-title">
          <h2 id="plan-review-title" className="font-display text-2xl">
            Your property connection plan.
          </h2>
          <p className="mt-2 text-muted">{plan.internetNote}</p>
          <p className="mt-2 text-muted">{plan.goalNote}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {plan.lines.map((line) => (
              <article key={line.label} className="rounded-lg border border-line p-4">
                <p className="text-xs text-muted">
                  {line.label} · {line.distance}
                </p>
                <h3 className="mt-1 font-display text-lg">{line.title}</h3>
                <p className="mt-2 text-sm text-muted">{line.body}</p>
                <AppLink to={line.href} className="mt-3 inline-block text-sm text-mint">
                  Understand your options →
                </AppLink>
              </article>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted">{plan.summary}</p>
          {installed && (
            <div className="mt-8 max-w-2xl rounded-lg border border-line p-4">
              <h3 className="font-display text-xl">
                {quoteFigure({
                  completeness: installed.completeness,
                  openEnded: installed.openEnded,
                  total: installed.total ?? installed.low,
                  estimatedLow: installed.low,
                  estimatedHigh: installed.high ?? installed.low,
                }).label}
              </h3>
              <p className="mt-2 font-display text-3xl tabular-nums">
                {quoteFigure({
                  completeness: installed.completeness,
                  openEnded: installed.openEnded,
                  total: installed.total ?? installed.low,
                  estimatedLow: installed.low,
                  estimatedHigh: installed.high ?? installed.low,
                }).figure}
              </p>
              <p className="mt-2 text-sm text-muted">{installed.gstLabel}</p>
              <p className="mt-2 text-sm text-muted">{installed.customerHeadline}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="text-sm">Storeys
                  <select value={storeys} onChange={(e) => setStoreys(e.target.value as "single" | "double")} className="mt-1 w-full border border-line bg-transparent px-2 py-2">
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                  </select>
                </label>
                <label className="text-sm">Roof
                  <select value={roof} onChange={(e) => setRoof(e.target.value as "metal" | "tile" | "unknown")} className="mt-1 w-full border border-line bg-transparent px-2 py-2">
                    <option value="unknown">Not sure</option>
                    <option value="metal">Colorbond / metal</option>
                    <option value="tile">Tile</option>
                  </select>
                </label>
                <label className="text-sm">Mount
                  <select value={mountNeed} onChange={(e) => setMountNeed(e.target.value as "yes" | "no" | "unknown")} className="mt-1 w-full border border-line bg-transparent px-2 py-2">
                    <option value="unknown">Not sure or specialist</option>
                    <option value="yes">We supply a standard mount</option>
                    <option value="no">I already have a suitable one</option>
                  </select>
                </label>
                <label className="text-sm">Cable route
                  <select value={cableRoute} onChange={(e) => setCableRoute(e.target.value as "external" | "unknown")} className="mt-1 w-full border border-line bg-transparent px-2 py-2">
                    <option value="unknown">Not confirmed</option>
                    <option value="external">Visible clipped run</option>
                  </select>
                </label>
              </div>
              <ul className="mt-4 divide-y divide-line text-sm">
                {installed.customerLines.map((line) => (
                  <li key={line.label} className="flex justify-between gap-3 py-2">
                    <span>{line.label}</span>
                    <span className="tabular-nums">{formatAud(line.amount)}</span>
                  </li>
                ))}
              </ul>
              {installed.reviews.slice(0, 4).map((review) => (
                <p key={review} className="mt-2 text-sm">{review}</p>
              ))}
              <p className="mt-3 text-xs text-muted">{installed.assumptions[0]}</p>
            </div>
          )}
          <div className="mt-8 max-w-lg">
            <h3 className="font-display text-xl">Request your installation proposal</h3>
            <p className="mt-2 text-sm text-muted">
              One PDF includes this estimate and the property plan. Unpriced radios, brackets or cable stay marked for review. They are not a complete installed quote.
            </p>
            <form
              className="mt-4 grid gap-3"
              onSubmit={async (event) => {
                event.preventDefault();
                if (!address || !installed) return;
                setProposalBusy(true);
                setProposalNote("");
                const notes = [plan.internetNote, plan.goalNote, ...plan.lines.map((line) => `${line.label}: ${line.title}. ${line.body}`), plan.summary]
                  .filter(Boolean)
                  .join("\n\n");
                try {
                  const frozen = quotePropertyPlan({
                    lat: address.lat,
                    lng: address.lng,
                    located: address.located,
                    internet,
                    storeys,
                    roof,
                    mountNeed,
                    cableRoute,
                    places: places.map((place) => ({
                      label: place.label,
                      kind: place.kind,
                      lat: place.lat,
                      lng: place.lng,
                      power: place.power,
                      isSource: place.id === (source?.id ?? places[0]?.id),
                    })),
                  });
                  const sent = await emailEstimate({
                    data: {
                      service: "starlink",
                      property: "residential",
                      depth: "detailed",
                      storeys,
                      day: "weekday",
                      internal: false,
                      cabinet: false,
                      roof,
                      mountNeed,
                      cableRoute,
                      starlink: internet === "nbn" || internet === "mobile" ? "none" : "new",
                      lat: address.lat,
                      lng: address.lng,
                      address: address.address,
                      located: address.located,
                      id: `VC-PLAN-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
                      name: proposalName,
                      email: proposalEmail,
                      phone: proposalPhone,
                      frozen,
                      planNotes: notes,
                    },
                  });
                  setProposalNote(
                    sent.emailed
                      ? "One proposal PDF is on its way, with the estimate and this property plan together."
                      : "The proposal is saved with VINCONNECT. If the email does not arrive, the plan is still on this page. Call 0408 559 555.",
                  );
                } catch {
                  setProposalNote("The plan is still on this page. Call 0408 559 555 and we will send the proposal.");
                } finally {
                  setProposalBusy(false);
                }
              }}
            >
              <Label className="text-sm">Name
                <Input required value={proposalName} onChange={(e) => setProposalName(e.target.value)} className="mt-1" />
              </Label>
              <Label className="text-sm">Email
                <Input required type="email" value={proposalEmail} onChange={(e) => setProposalEmail(e.target.value)} className="mt-1" />
              </Label>
              <Label className="text-sm">Mobile
                <Input required type="tel" value={proposalPhone} onChange={(e) => setProposalPhone(e.target.value)} className="mt-1" />
              </Label>
              <Button type="submit" disabled={proposalBusy || !address}>{proposalBusy ? "Sending…" : "Email my proposal"}</Button>
              {proposalNote && <p className="text-sm text-muted">{proposalNote}</p>}
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
