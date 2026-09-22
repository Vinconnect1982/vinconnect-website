import { haversineKm } from "./utils";

export const DEPOT = { lat: -38.106, lng: 145.283, label: "Cranbourne" };

export const ESTIMATE_SERVICES = [
  {
    id: "starlink",
    title: "Install my Starlink",
    hint: "Dish mounting, cable entry and setup",
    note: "We will check sky view, safe mounting, cable entry and router placement together.",
    labour: 620,
  },
  {
    id: "wifi",
    title: "Fix weak Wi-Fi",
    hint: "Improve coverage through the home",
    note: "Poor coverage usually needs better Wi-Fi distribution, not another internet service.",
    labour: 480,
  },
  {
    id: "building-link",
    title: "Connect another building",
    hint: "Shed, stable, office or granny flat",
    note: "For a detached building, a point-to-point wireless link is often cleaner than trenching.",
    labour: 890,
  },
  {
    id: "cctv-data",
    title: "CCTV or data cabling",
    hint: "Reliable network and clean cable runs",
    note: "Camera reliability starts with power, cabling and network coverage at each location.",
    labour: 740,
  },
  {
    id: "unsure",
    title: "Help me choose",
    hint: "Tell us the problem and we will guide you",
    note: "We will diagnose the property before recommending hardware.",
    labour: 560,
  },
] as const;

export type ServiceId = (typeof ESTIMATE_SERVICES)[number]["id"];
export type StoreyId = "single" | "double" | "commercial";

export const STOREYS: { id: StoreyId; title: string; hint: string; extra: number }[] = [
  { id: "single", title: "Single storey", hint: "Home, shed or small building", extra: 0 },
  { id: "double", title: "Double storey", hint: "Roof or cable access above one level", extra: 180 },
  { id: "commercial", title: "Business / commercial", hint: "Site access and operational planning", extra: 320 },
];

export type EstimateInput = {
  service: ServiceId;
  storeys: StoreyId;
  conduit: boolean;
  extension: boolean;
  internal: boolean;
  mesh: number;
  lat: number;
  lng: number;
  address: string;
};

export type LineItem = { label: string; amount: number };

export type EstimateResult = {
  estimatedLow: number;
  estimatedHigh: number;
  labour: number;
  travel: number;
  extras: number;
  km: number;
  travelNote: string;
  lines: LineItem[];
};

function roundTen(n: number) {
  return Math.max(300, Math.round(n / 10) * 10);
}

export function priceEstimate(input: EstimateInput): EstimateResult {
  const service = ESTIMATE_SERVICES.find((s) => s.id === input.service) ?? ESTIMATE_SERVICES[0];
  const storey = STOREYS.find((s) => s.id === input.storeys) ?? STOREYS[0];
  const km = haversineKm(DEPOT, { lat: input.lat, lng: input.lng });

  const lines: LineItem[] = [{ label: `${service.title} labour`, amount: service.labour }];
  if (storey.extra) lines.push({ label: storey.title, amount: storey.extra });
  if (input.conduit) lines.push({ label: "External conduit allowance", amount: 140 });
  if (input.extension) lines.push({ label: "System extension / relocation", amount: 190 });
  if (input.internal) lines.push({ label: "Concealed internal route", amount: 160 });
  if (input.mesh > 0) {
    lines.push({
      label: `Extra Wi-Fi ${input.mesh === 1 ? "area" : "areas"} × ${input.mesh}`,
      amount: 170 * input.mesh,
    });
  }

  const billableKm = Math.max(0, km - 20);
  const travel = Math.min(420, Math.round(billableKm * 1.8));
  if (travel > 0) {
    lines.push({
      label: `Travel from ${DEPOT.label} (${km.toFixed(0)} km)`,
      amount: travel,
    });
  }

  const extras = lines.reduce((s, l) => s + l.amount, 0) - service.labour - travel;
  const labour = service.labour + (storey.extra || 0);
  const mid = lines.reduce((s, l) => s + l.amount, 0);
  const estimatedLow = roundTen(mid * 0.9);
  const estimatedHigh = roundTen(mid * 1.25);

  const travelNote =
    travel === 0
      ? `Travel from Cranbourne is included — you are about ${km.toFixed(0)} km from the depot, inside the complimentary radius.`
      : `Travel from Cranbourne is included automatically (${km.toFixed(0)} km). Hardware, mounts, Starlink kits and any electrician work are separately itemised.`;

  return {
    estimatedLow,
    estimatedHigh,
    labour,
    travel,
    extras: Math.max(0, extras),
    km,
    travelNote,
    lines,
  };
}
