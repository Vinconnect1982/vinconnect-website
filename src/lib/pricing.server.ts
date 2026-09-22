import { haversineKm } from "./utils";
import {
  DEPOT,
  DOUBLE_STOREY_STARLINK,
  ESTIMATE_SERVICES,
  EXTRA_CABINET_ROUTER,
  EXTRA_CONDUIT,
  LOCAL_STARLINK_LABOUR,
  type EstimateInput,
  type EstimateResult,
  type LineItem,
} from "./pricing";

function roundTen(n: number) {
  return Math.max(LOCAL_STARLINK_LABOUR, Math.round(n / 10) * 10);
}

function travelAmount(km: number) {
  const billableKm = Math.max(0, km - 20);
  return Math.min(420, Math.round(billableKm * 1.8));
}

export function priceEstimate(input: EstimateInput): EstimateResult {
  const service = ESTIMATE_SERVICES.find((s) => s.id === input.service) ?? ESTIMATE_SERVICES[0];
  const lines: LineItem[] = [{ label: `${service.title} labour`, amount: service.labour }];

  if (input.service === "starlink" && input.storeys === "double") {
    lines.push({
      label: "Double storey",
      amount: DOUBLE_STOREY_STARLINK - LOCAL_STARLINK_LABOUR,
    });
  } else if (input.storeys === "double") {
    lines.push({ label: "Double storey access", amount: 180 });
  } else if (input.storeys === "commercial") {
    lines.push({ label: "Business / commercial access", amount: 320 });
  }

  if (input.conduit) lines.push({ label: "External conduit", amount: EXTRA_CONDUIT });
  if (input.cabinet) lines.push({ label: "Router in garage or cabinet", amount: EXTRA_CABINET_ROUTER });
  if (input.extension) lines.push({ label: "System extension / relocation", amount: 190 });
  if (input.internal) lines.push({ label: "Concealed internal route", amount: 160 });
  if (input.mesh > 0) {
    lines.push({
      label: `Extra Wi-Fi ${input.mesh === 1 ? "area" : "areas"} × ${input.mesh}`,
      amount: 170 * input.mesh,
    });
  }

  let travel = 0;
  let km = 0;
  if (input.located) {
    km = haversineKm(DEPOT, { lat: input.lat, lng: input.lng });
    travel = travelAmount(km);
    if (travel > 0) lines.push({ label: "Location", amount: travel });
  }

  const labour = lines.filter((l) => !l.label.startsWith("Location")).reduce((s, l) => s + l.amount, 0);
  const mid = lines.reduce((s, l) => s + l.amount, 0);
  const travelNote = input.located
    ? "Location is included in this range. Hardware, mounts and the Starlink plan are separate."
    : "We’ll confirm location from the address you typed before this price is final. Hardware and the Starlink plan are separate.";

  return {
    estimatedLow: roundTen(mid * 0.9),
    estimatedHigh: roundTen(mid * 1.25),
    labour,
    travel,
    extras: Math.max(0, mid - service.labour - travel),
    km,
    travelNote,
    lines,
  };
}
