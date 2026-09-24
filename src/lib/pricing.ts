import { haversineKm } from "./utils";

export const DEPOT = { lat: -38.106, lng: 145.283, label: "Cranbourne" };

export const STANDARD_INSTALL = 300;
export const DOUBLE_STOREY_ADD = 250;
export const INTERNAL_WALLS = 150;
export const DATA_CABINET = 120;
export const SATURDAY_INSTALL = 150;
export const MOUNT_TRIPOD = 170;
export const MOUNT_HOCKEY = 150;

export type ServiceId = "starlink";
export type StoreyId = "single" | "double";
export type RoofId = "metal" | "tile";
export type MountNeed = "no" | "yes";
export type PropertyKind = "residential" | "commercial";
export type QuoteDepth = "quick" | "detailed";
export type InstallDay = "weekday" | "saturday";

export type EstimateInput = {
  service: ServiceId;
  property: PropertyKind;
  depth: QuoteDepth;
  storeys: StoreyId;
  day: InstallDay;
  internal: boolean;
  cabinet: boolean;
  roof: RoofId | "unknown";
  mountNeed: MountNeed | "unknown";
  lat: number;
  lng: number;
  address: string;
  located: boolean;
};

export type LineItem = { label: string; amount: number; note?: string };

export type EstimateResult = {
  kind: "quote" | "callback";
  total: number;
  estimatedLow: number;
  estimatedHigh: number;
  labour: number;
  travel: number;
  extras: number;
  km: number;
  travelNote: string;
  paymentNote: string;
  lines: LineItem[];
  roofLabel: string;
  mountLabel: string;
};

export function mountQuote(input: { roof: RoofId; mountNeed: MountNeed }) {
  const roofLabel = input.roof === "tile" ? "Tile" : "Colorbond / metal";
  if (input.mountNeed === "no") {
    return { roofLabel, mountLabel: "You already have a mount", amount: 0, line: "" };
  }
  if (input.roof === "tile") {
    return {
      roofLabel,
      mountLabel: "Hockey stick mount and pole adaptor",
      amount: MOUNT_HOCKEY,
      line: "Hockey stick mount and pole adaptor",
    };
  }
  return {
    roofLabel,
    mountLabel: "Tripod mount and pole adaptor",
    amount: MOUNT_TRIPOD,
    line: "Tripod mount and pole adaptor",
  };
}

function travelAmount(km: number) {
  const billableKm = Math.max(0, km - 20);
  return Math.min(420, Math.round(billableKm * 1.8));
}

export function priceEstimate(input: EstimateInput): EstimateResult {
  const paymentNote = "Payment is due on the day of installation.";
  let km = 0;
  let travel = 0;
  if (input.located) {
    km = haversineKm(DEPOT, { lat: input.lat, lng: input.lng });
    travel = travelAmount(km);
  }

  if (input.property === "commercial") {
    return {
      kind: "callback",
      total: 0,
      estimatedLow: 0,
      estimatedHigh: 0,
      labour: 0,
      travel,
      extras: 0,
      km,
      travelNote: "Commercial properties are quoted individually. We will contact you. There is no online price for this job.",
      paymentNote,
      lines: [],
      roofLabel: "Commercial",
      mountLabel: "Quoted after we speak",
    };
  }

  const lines: LineItem[] = [
    {
      label: "Standard installation",
      amount: STANDARD_INSTALL,
      note: "Weekday. Cable down an external wall to a wall plate.",
    },
  ];

  let roofLabel = "Not selected";
  let mountLabel = "Not included in this quick quote";

  if (input.storeys === "double") {
    lines.push({ label: "Double storey", amount: DOUBLE_STOREY_ADD });
  }

  if (input.depth === "detailed") {
    if (input.roof !== "unknown" && input.mountNeed !== "unknown") {
      const mount = mountQuote({ roof: input.roof, mountNeed: input.mountNeed });
      roofLabel = mount.roofLabel;
      mountLabel = mount.mountLabel;
      if (mount.amount > 0 && mount.line) lines.push({ label: mount.line, amount: mount.amount });
    }
    if (input.internal) {
      lines.push({
        label: "Internal wall cable route",
        amount: INTERNAL_WALLS,
        note: "From $150. This can vary with the property.",
      });
    }
    if (input.cabinet) lines.push({ label: "Cable to a data rack or cabinet", amount: DATA_CABINET });
    if (input.day === "saturday") lines.push({ label: "Saturday installation", amount: SATURDAY_INSTALL });
  }

  if (travel > 0) lines.push({ label: "Travel", amount: travel });

  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  const travelNote = [
    !input.located
      ? "Travel is not in this figure yet. We will confirm it from the address."
      : travel === 0
        ? "Travel from Cranbourne is included for this address."
        : "Travel from Cranbourne is included in the quote.",
    input.depth === "quick"
      ? input.storeys === "double"
        ? "Double storey is included. No mount is included yet."
        : "This is a single-storey weekday install. No mount is included yet."
      : input.mountNeed === "no"
        ? "You are supplying the mount, so no mount is added."
        : input.mountNeed === "yes"
          ? "The mount for that roof is included."
          : "",
    input.internal ? "The internal wall figure is a starting price and can change once we see the property." : "",
    "The Starlink dish, router and monthly plan are separate.",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    kind: "quote",
    total,
    estimatedLow: total,
    estimatedHigh: total,
    labour: STANDARD_INSTALL,
    travel,
    extras: Math.max(0, total - STANDARD_INSTALL - travel),
    km,
    travelNote,
    paymentNote,
    lines,
    roofLabel,
    mountLabel,
  };
}
