import { priceEstimate, pricePropertyPlan, quoteFigure, reviseInstall, type InstallEstimate } from "@/lib/install-estimate";
import { formatAud } from "@/lib/utils";
import type { EstimateInput } from "@/lib/pricing";

const cranbourne = { lat: -38.106, lng: 145.283, located: true, address: "Cranbourne VIC" };

function input(patch: Partial<EstimateInput> = {}): EstimateInput {
  return {
    service: "starlink",
    property: "residential",
    depth: "detailed",
    storeys: "single",
    day: "weekday",
    internal: false,
    cabinet: false,
    roof: "metal",
    mountNeed: "no",
    ...cranbourne,
    ...patch,
  };
}

function money(install: InstallEstimate, kind: "materials" | "equipment") {
  const mount = install.materials.find((item) => item.id === "mount")?.sell ?? 0;
  if (kind === "equipment") {
    const radios = install.materials.some((item) => item.id.startsWith("link-") && item.sell == null);
    const mountAssessment = install.materials.some((item) => item.id === "mount" && item.disposition === "assessment");
    const mountText =
      install.completeness === "range"
        ? `${formatAud(install.equipmentLow)}–${formatAud(install.equipmentHigh)} standard mounts`
        : mount > 0
          ? formatAud(mount)
          : mountAssessment
            ? "Mount assessment"
            : "—";
    if (radios) return mount > 0 ? `${formatAud(mount)} mount. Radios not priced` : "Radios not priced";
    return mountText;
  }
  const included = install.materials.some((item) => item.disposition === "package");
  const waiting = install.materials.some((item) => item.disposition === "assessment" && item.id !== "mount");
  if (waiting && included) return "Package items included. Endpoint materials awaiting assessment";
  if (waiting) return "Awaiting assessment";
  if (included) return "Included in the package";
  return formatAud(Math.max(0, install.materialsAmount - mount));
}

function totalCell(install: InstallEstimate) {
  const shown = quoteFigure({
    completeness: install.completeness,
    openEnded: install.openEnded,
    total: install.total ?? install.low,
    estimatedLow: install.low,
    estimatedHigh: install.high ?? install.low,
  });
  return `${shown.label}: ${shown.figure}`;
}

export function pricingExampleRows() {
  const customerMount = priceEstimate(input()).install!;
  const standardMount = priceEstimate(input({ mountNeed: "yes" })).install!;
  const unknownMount = priceEstimate(input({ mountNeed: "unknown" })).install!;
  const doubleStorey = priceEstimate(input({ storeys: "double" })).install!;
  const cabinet = priceEstimate(input({ routerOnEntryWall: "no", cabinet: true })).install!;
  const conduit = priceEstimate(input({ conduit: true })).install!;
  const existing = priceEstimate(input({ starlink: "existing" })).install!;
  const shed = pricePropertyPlan({
    ...cranbourne,
    internet: "starlink",
    storeys: "single",
    roof: "metal",
    mountNeed: "yes",
    cableRoute: "external",
    places: [
      { label: "House", kind: "house", lat: -38.106, lng: 145.283, power: true, isSource: true },
      { label: "Shed", kind: "shed", lat: -38.1072, lng: 145.283, power: true, isSource: false },
    ],
  });
  const shared = pricePropertyPlan({
    ...cranbourne,
    internet: "starlink",
    storeys: "single",
    roof: "metal",
    mountNeed: "no",
    cableRoute: "external",
    places: [
      { label: "House", kind: "house", lat: -38.1, lng: 145.28, power: true, isSource: true },
      { label: "Shed", kind: "shed", lat: -38.102, lng: 145.28, power: true, isSource: false },
      { label: "Stable", kind: "stable", lat: -38.103, lng: 145.281, power: false, isSource: false },
    ],
  });
  const missing = priceEstimate(input({ mountNeed: "yes", powerAtRouter: "no", cableRoute: "unknown" })).install!;
  const saved = priceEstimate(input()).install!;
  const revised = reviseInstall(saved, { reason: "Extra hour agreed before resend", labourHours: 4 });
  const laterVisit = priceEstimate(input({ starlink: "existing" }), { labourRateAud: 160 }).install!;

  const rows = [
    ["Standard install, customer mount", customerMount, "Starlink kit"],
    ["Standard mount supplied", standardMount, "Starlink kit"],
    ["Unknown or specialist mount", unknownMount, "Starlink kit. Mount not capped"],
    ["Double storey, customer mount", doubleStorey, "Starlink kit"],
    ["Cabinet and router relocation", cabinet, "Starlink kit. $120 not added"],
    ["Conduit", conduit, "Starlink kit. Conduit materials inside the $120"],
    ["Existing dish", existing, "Not a published service"],
    ["House-to-shed link", shed, "Starlink kit, radios, both endpoint materials"],
    ["Two links, one without power", shared, "Starlink kit, radios, no power at Stable"],
    ["No power, unknown cable route", missing, "Electrician and cable route"],
    ["Saved quote after the rate changes", revised, `Resend stays on the saved $100 rate (${formatAud(revised.labourAmount)}). A new existing-dish quote at $160/h would be ${formatAud(laterVisit.labourAmount)} and is not resent.`],
  ] as const;

  return rows.map(([name, install, exclusions]) => ({
    name,
    hours: install.labourHours.toFixed(2),
    labour: formatAud(install.labourAmount),
    materials: money(install, "materials"),
    equipment: money(install, "equipment"),
    other: formatAud(install.otherAmount),
    total: totalCell(install),
    exclusions,
  }));
}

export function PricingExamples() {
  const rows = pricingExampleRows();
  return (
    <section className="mt-12" aria-labelledby="pricing-review-title">
      <h2 id="pricing-review-title" className="font-display text-2xl tracking-tight">Worked examples</h2>
      <p className="mt-2 max-w-3xl text-sm text-muted">
        These use the same calculation as the quote, the stored record, the PDF and the email. A partial estimate is not an installed total. Travel is included in the local examples and the rate is not shown. Nothing here is a new published price.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <th className="py-2 pr-3 font-medium">Example</th>
              <th className="py-2 pr-3 font-medium">Hours</th>
              <th className="py-2 pr-3 font-medium">Package or task labour</th>
              <th className="py-2 pr-3 font-medium">Materials</th>
              <th className="py-2 pr-3 font-medium">Equipment</th>
              <th className="py-2 pr-3 font-medium">Other</th>
              <th className="py-2 pr-3 font-medium">Total</th>
              <th className="py-2 font-medium">Exclusions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-line align-top">
                <th className="py-3 pr-3 font-display text-base font-medium">{row.name}</th>
                <td className="py-3 pr-3 tabular-nums">{row.hours}</td>
                <td className="py-3 pr-3 tabular-nums">{row.labour}</td>
                <td className="py-3 pr-3">{row.materials}</td>
                <td className="py-3 pr-3">{row.equipment}</td>
                <td className="py-3 pr-3 tabular-nums">{row.other}</td>
                <td className="py-3 pr-3">{row.total}</td>
                <td className="py-3">{row.exclusions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
