import type { InstallEstimate } from "./install-estimate.ts";
import { haversineKm } from "./utils.ts";

export const DEPOT = { lat: -38.106, lng: 145.283, label: "Cranbourne" };

export const STANDARD_INSTALL = 300;
export const DOUBLE_STOREY_ADD = 250;
export const INTERNAL_WALLS = 150;
/** Historical scope-page figure. Not charged on new estimates. Cabinet placement uses the $150 router line. */
export const DATA_CABINET = 120;
export const SATURDAY_INSTALL = 150;
export const MOUNT_TRIPOD = 170;
export const MOUNT_HOCKEY = 150;
/** Published install terms: straightforward conduit, labour and materials together. */
export const CONDUIT_EXTRA = 120;
/** Published install terms: router moved off the entry wall. */
export const ROUTER_RELOCATION = 150;

export type ServiceId = "starlink";
export type StoreyId = "single" | "double";
export type RoofId = "metal" | "tile";
export type MountNeed = "no" | "yes" | "unknown";
export type PropertyKind = "residential" | "commercial";
export type QuoteDepth = "quick" | "detailed";
export type InstallDay = "weekday" | "saturday" | "sunday";
export type StarlinkSituation = "new" | "existing" | "none";
export type YesNoUnknown = "yes" | "no" | "unknown";
export type CableRoute = "external" | "internal" | "underground" | "unknown";
export type AccessDifficulty = "straightforward" | "difficult" | "unknown";

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
  /** Defaults preserve the published estimator: new dish, entry-wall router, no conduit. */
  starlink?: StarlinkSituation;
  routerOnEntryWall?: YesNoUnknown;
  conduit?: boolean;
  powerAtRouter?: YesNoUnknown;
  cableRoute?: CableRoute;
  access?: AccessDifficulty;
  /** Explicit person-hours for a second technician. Never assumed. */
  extraPersonHours?: number;
};

export type LineItem = { label: string; amount: number; note?: string };

export type EstimateResult = {
  kind: "quote" | "callback";
  total: number;
  estimatedLow: number;
  estimatedHigh: number;
  /** True when the top of the range is not known. */
  openEnded?: boolean;
  reviewRequired?: boolean;
  /** complete = every required labour, equipment and material is priced. range = a defended span. partial = not an installed total. */
  completeness?: "complete" | "range" | "partial";
  headline?: string;
  rangeExplanation?: string;
  labour: number;
  travel: number;
  extras: number;
  km: number;
  travelNote: string;
  paymentNote: string;
  lines: LineItem[];
  roofLabel: string;
  mountLabel: string;
  gstLabel?: string;
  assumptions?: string[];
  exclusions?: string[];
  install?: InstallEstimate;
};

export function mountQuote(input: { roof: RoofId; mountNeed: MountNeed }) {
  const roofLabel = input.roof === "tile" ? "Tile" : "Colorbond / metal";
  if (input.mountNeed === "no") {
    return { roofLabel, mountLabel: "You already have a mount", amount: 0, line: "" };
  }
  if (input.roof === "tile") {
    return {
      roofLabel,
      mountLabel: "Hockey-stick mount with compatible adapter",
      amount: MOUNT_HOCKEY,
      line: "Hockey-stick mount with compatible adapter",
    };
  }
  return {
    roofLabel,
    mountLabel: "Tripod with compatible adapter",
    amount: MOUNT_TRIPOD,
    line: "Tripod with compatible adapter",
  };
}

/** Internal only. Do not copy this formula into customer notes, PDFs or emails. */
export function travelAmount(km: number) {
  const billableKm = Math.max(0, km - 20);
  return Math.min(420, Math.round(billableKm * 1.8));
}

export function travelKm(input: { located: boolean; lat: number; lng: number }) {
  if (!input.located) return 0;
  return haversineKm(DEPOT, { lat: input.lat, lng: input.lng });
}

export { priceEstimate } from "./install-estimate.ts";
