import assert from "node:assert/strict";
import test from "node:test";
import {
  LINK_KIT_HIGH,
  LINK_KIT_LOW,
  PACKAGE_HOURS,
  PROVISIONAL_ENDPOINT_CABLE_M,
  hideTravelFormula,
  priceEstimate,
  pricePropertyPlan,
  quoteFigure,
  reviseInstall,
} from "./install-estimate.ts";
import { CONDUIT_EXTRA, DATA_CABINET, ROUTER_RELOCATION, SATURDAY_INSTALL, travelAmount, type EstimateInput } from "./pricing.ts";

const cranbourne = { lat: -38.106, lng: 145.283, located: true, address: "Cranbourne VIC" };

function input(patch: Partial<EstimateInput> = {}): EstimateInput {
  return {
    service: "starlink",
    property: "residential",
    depth: "quick",
    storeys: "single",
    day: "weekday",
    internal: false,
    cabinet: false,
    roof: "unknown",
    mountNeed: "unknown",
    ...cranbourne,
    ...patch,
  };
}

function sum(lines: { amount: number }[]) {
  return lines.reduce((total, line) => total + line.amount, 0);
}

const supplied = () => input({ depth: "detailed", roof: "metal", mountNeed: "no" });

test("package hours explain the published $300 and are not a second charge", () => {
  assert.equal(PACKAGE_HOURS, 3);
  const split = 0.4 + 0.5 + 0.8 + 0.7 + 0.35 + 0.25;
  assert.ok(Math.abs(split - 3) < 0.001);
  const quote = priceEstimate(supplied());
  assert.equal(quote.completeness, "complete");
  assert.equal(quote.install?.total, 300);
  assert.equal(quote.labour, 300);
  assert.equal(sum(quote.lines), 300);
  assert.equal(quote.install?.tasks.filter((task) => task.charged).length, 0);
  assert.equal(quote.install?.materials.some((item) => item.id === "brush-plate" && item.disposition === "package"), true);
  assert.match(quote.lines[0]?.note ?? "", /clips/i);
  assert.equal(quote.gstLabel?.includes("include GST"), true);
  assert.equal(quote.lines.some((line) => line.amount === 59), false);
  assert.equal(quoteFigure(quote).label, "Indicative installed amount");
});

test("a quick quote is partial until the mount is confirmed", () => {
  const quote = priceEstimate(input());
  assert.equal(quote.completeness, "partial");
  assert.equal(quote.install?.total, null);
  assert.equal(quote.install?.high, null);
  assert.equal(quote.install?.low, 300);
  assert.match(quote.headline ?? "", /Mounting assessment required/);
  assert.equal(quoteFigure(quote).label, "Partial estimate — remaining items require review");
  assert.doesNotMatch(quoteFigure(quote).label, /Indicative installed amount/);
});

test("unknown mounting is not capped at the $170 tripod", () => {
  const quote = priceEstimate(input({ depth: "detailed", roof: "metal", mountNeed: "unknown" }));
  assert.equal(quote.completeness, "partial");
  assert.equal(quote.install?.total, null);
  assert.equal(quote.install?.high, null);
  assert.equal(quote.install?.low, 300);
  assert.match(quote.assumptions?.join(" ") ?? "", /not a cap/i);
});

test("a confirmed standard mount is a complete installed amount", () => {
  const mounted = priceEstimate(input({ depth: "detailed", roof: "metal", mountNeed: "yes" }));
  assert.equal(mounted.completeness, "complete");
  assert.equal(mounted.total, 470);
  assert.equal(mounted.install?.labourAmount, 300);
  assert.equal(mounted.install?.materialsAmount, 170);
  const tile = priceEstimate(input({ depth: "detailed", roof: "tile", mountNeed: "yes" }));
  assert.equal(tile.total, 450);
  assert.match(tile.lines.find((line) => /hockey/i.test(line.label))?.note ?? "", /not charged again/i);
  assert.equal(mounted.install?.materials.filter((item) => item.id === "mount").length, 1);
  assert.equal(mounted.install?.materials.filter((item) => item.id !== "mount" && /adapt/i.test(item.label)).length, 0);
});

test("standard mounts with the roof unchosen are a range, not a specialist cap", () => {
  const quote = priceEstimate(input({ depth: "detailed", roof: "unknown", mountNeed: "yes" }));
  assert.equal(quote.completeness, "range");
  assert.equal(quote.install?.low, 450);
  assert.equal(quote.install?.high, 470);
  assert.equal(quote.install?.total, null);
  assert.match(quote.rangeExplanation ?? "", /hockey-stick/);
  assert.match(quote.rangeExplanation ?? "", /not inside this range/);
  assert.equal(quoteFigure(quote).label, "Indicative range");
});

test("published extras stay on the published figures when the mount is confirmed", () => {
  assert.equal(priceEstimate(input({ depth: "detailed", storeys: "double", roof: "metal", mountNeed: "no" })).total, 550);
  const saturday = priceEstimate(input({ depth: "detailed", roof: "metal", mountNeed: "no", day: "saturday" }));
  const sunday = priceEstimate(input({ depth: "detailed", roof: "metal", mountNeed: "no", day: "sunday" }));
  assert.equal(saturday.total, 450);
  assert.equal(sunday.total, saturday.total);
  assert.equal(sunday.lines.filter((line) => line.amount === SATURDAY_INSTALL).length, 1);
  assert.match(sunday.assumptions?.join(" ") ?? "", /no extra Sunday rate/i);
});

test("internal walls and cabinet placement do not double charge", () => {
  const both = priceEstimate(input({ depth: "detailed", roof: "metal", mountNeed: "no", routerOnEntryWall: "no", cabinet: true }));
  assert.equal(both.install?.otherAmount, ROUTER_RELOCATION);
  assert.equal(both.lines.filter((line) => line.amount === DATA_CABINET).length, 0);
  assert.equal(both.lines.filter((line) => line.amount === ROUTER_RELOCATION).length, 1);
  assert.equal(both.completeness, "complete");
  assert.equal(both.total, 450);

  const cabinetOnly = priceEstimate(input({ depth: "detailed", roof: "metal", mountNeed: "no", cabinet: true }));
  assert.equal(cabinetOnly.total, 450);
  assert.equal(cabinetOnly.lines.some((line) => line.amount === DATA_CABINET), false);

  const internal = priceEstimate(input({ depth: "detailed", roof: "metal", mountNeed: "no", internal: true }));
  assert.equal(internal.completeness, "partial");
  assert.equal(internal.install?.total, null);
  assert.equal(internal.install?.low, 450);
  assert.match(internal.headline ?? "", /Additional cabling requires review/);
  assert.doesNotMatch(internal.headline ?? "", /Indicative installed amount/);

  const overlap = priceEstimate(input({ depth: "detailed", roof: "metal", mountNeed: "no", internal: true, routerOnEntryWall: "no", cabinet: true }));
  assert.equal(overlap.install?.otherAmount, ROUTER_RELOCATION);
  assert.equal(overlap.lines.filter((line) => line.amount === ROUTER_RELOCATION || line.amount === 150).length, 1);
  assert.equal(overlap.completeness, "partial");
  assert.equal(overlap.install?.low, 450);
});

test("router relocation is the published figure once", () => {
  const quote = priceEstimate(input({ depth: "detailed", roof: "metal", mountNeed: "yes", routerOnEntryWall: "no" }));
  assert.equal(quote.total, 470 + ROUTER_RELOCATION);
  assert.equal(quote.lines.filter((line) => line.amount === ROUTER_RELOCATION).length, 1);
});

test("conduit is a single published bundle, not labour plus materials again", () => {
  const quote = priceEstimate(input({ depth: "detailed", roof: "tile", mountNeed: "no", conduit: true }));
  assert.equal(quote.total, 300 + CONDUIT_EXTRA);
  assert.equal(quote.install?.materials.find((item) => item.id === "conduit")?.sell, 0);
  assert.equal(quote.install?.tasks.some((task) => task.charged && /conduit/i.test(task.label)), false);
});

test("existing dish is an internal allowance and not a published price", () => {
  const quote = priceEstimate(input({ depth: "detailed", starlink: "existing", roof: "metal", mountNeed: "no" }));
  assert.equal(quote.install?.labourAmount, 125);
  assert.equal(quote.install?.labourHours, 1.25);
  assert.equal(quote.completeness, "partial");
  assert.equal(quote.install?.total, null);
  assert.equal(quote.lines.some((line) => line.amount === 125), false);
  assert.equal(quote.lines.some((line) => line.label === "Standard installation package"), false);
  assert.match(quote.headline ?? "", /Service visit — quote required/);
  assert.equal(quoteFigure(quote).figure, "Quote required");
  assert.equal(quoteFigure(quote).label, "Partial estimate — remaining items require review");
});

test("no power or an unknown cable route blocks a complete total", () => {
  const power = priceEstimate(input({ depth: "detailed", roof: "metal", mountNeed: "yes", powerAtRouter: "no" }));
  assert.equal(power.completeness, "partial");
  assert.equal(power.install?.total, null);
  assert.match(power.exclusions?.join(" ") ?? "", /electrician/i);
  assert.ok(power.labour >= 300);
  const route = priceEstimate(input({ depth: "detailed", roof: "metal", mountNeed: "yes", cableRoute: "unknown" }));
  assert.equal(route.completeness, "partial");
  assert.equal(route.install?.total, null);
  assert.match(route.headline ?? "", /Cable route is not confirmed/);
});

test("a house-to-shed link prices both endpoints and does not price the map distance as cable", () => {
  const plan = pricePropertyPlan({
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
  const endpoints = plan.tasks.filter((item) => item.id.startsWith("p2p-") && item.id.includes("Shed") && !item.id.includes("config"));
  assert.equal(endpoints.length, 2);
  assert.equal(plan.tasks.filter((item) => item.id.includes("config")).length, 1);
  assert.equal(plan.tasks.find((item) => item.id === "setup")?.charged, false);
  assert.equal(plan.labourAmount, 300 + 220);
  assert.equal(plan.materialsAmount, 170);
  assert.equal(plan.low, 300 + 170 + 220);
  assert.equal(plan.high, null);
  assert.equal(plan.completeness, "partial");
  assert.equal(plan.materials.filter((item) => item.id.startsWith("bracket-")).length, 2);
  assert.equal(plan.materials.filter((item) => item.id.startsWith("cable-") && item.qty === PROVISIONAL_ENDPOINT_CABLE_M).length, 2);
  assert.equal(plan.supplierReferences.some((item) => item.amount === LINK_KIT_LOW && item.approval === "reference-only"), true);
  assert.equal(plan.supplierReferences.some((item) => item.amount === LINK_KIT_HIGH), true);
  const customer = JSON.stringify({
    assumptions: plan.assumptions,
    headline: plan.customerHeadline,
    lines: plan.customerLines,
    exclusions: plan.exclusions,
  });
  assert.equal(customer.includes(String(LINK_KIT_LOW)), false);
  assert.match(plan.assumptions.join(" "), /not a cable quantity/i);
  assert.match(plan.tasks.find((item) => item.id.startsWith("p2p-a-"))?.includes ?? "", /not the map distance/i);
});

test("two extra buildings share one visit", () => {
  const plan = pricePropertyPlan({
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
  assert.equal(plan.tasks.filter((item) => item.id === "setup").length, 1);
  assert.equal(plan.tasks.find((item) => item.id === "setup")?.charged, false);
  assert.equal(plan.tasks.filter((item) => item.id.includes("config")).length, 2);
  assert.equal(plan.tasks.filter((item) => item.id.startsWith("p2p-") && !item.id.includes("config")).length, 4);
  assert.match(plan.exclusions.join(" "), /No power marked at Stable/);
  assert.equal(plan.completeness, "partial");
});

test("travel amount stays in the quote and the formula stays out of customer text", () => {
  const away = priceEstimate(input({ lat: -37.88, lng: 145.165, address: "Glen Waverley VIC" }));
  assert.ok(away.travel > 0);
  assert.equal(away.travel, travelAmount(away.km));
  const blob = JSON.stringify({
    note: away.travelNote,
    lines: away.lines,
    assumptions: away.assumptions,
    headline: away.headline,
  });
  assert.equal(/per km/i.test(blob), false);
  assert.equal(blob.includes("1.80"), false);
  assert.equal(hideTravelFormula("Travel is 28 km at $1.80 per km"), "Travel is 28 km at");
});

test("a $59 equipment figure cannot be the installed total", () => {
  const quote = priceEstimate(supplied());
  assert.notEqual(quote.total, 59);
  assert.ok((quote.labour ?? 0) > 59);
  assert.equal(quote.lines.some((line) => line.amount === 59), false);
});

test("a later labour rate does not change a saved quote, and a revision keeps that rate", () => {
  const saved = priceEstimate(supplied());
  const laterPackage = priceEstimate(supplied(), { labourRateAud: 160 });
  assert.equal(saved.install?.labourRateAud, 100);
  assert.equal(laterPackage.install?.labourAmount, 300);
  const visit = priceEstimate(input({ depth: "detailed", starlink: "existing" }));
  const laterVisit = priceEstimate(input({ depth: "detailed", starlink: "existing" }), { labourRateAud: 160 });
  assert.equal(visit.install?.labourAmount, 125);
  assert.equal(laterVisit.install?.labourAmount, 200);
  assert.equal(visit.install?.labourAmount, 125);
  assert.throws(() => reviseInstall(saved.install!, { reason: "  " }), /why/i);
  const revised = reviseInstall(saved.install!, { reason: "Second cable run agreed on the phone", labourHours: 4 });
  assert.equal(revised.labourAmount, 400);
  assert.equal(revised.total, 400);
  assert.equal(revised.labourRateAud, 100);
  assert.equal(revised.customerLines[0]?.label, "Installation labour");
  assert.equal(revised.customerLines[0]?.amount, 400);
  assert.equal(revised.revisions[0]?.reason, "Second cable run agreed on the phone");
  assert.equal(revised.pricingVersion, saved.install?.pricingVersion);
  const revisedVisit = reviseInstall(visit.install!, { reason: "Keep the saved rate", labourHours: 2 });
  assert.equal(revisedVisit.labourAmount, 200);
  assert.equal(revisedVisit.completeness, "partial");
  assert.equal(revisedVisit.total, null);
});

test("extra technicians are explicit person-hours and are not assumed", () => {
  const quote = priceEstimate(input({ ...supplied(), extraPersonHours: 2 }));
  assert.equal(quote.install?.labourAmount, 500);
  assert.equal(quote.install?.crew.technicians, 2);
  assert.equal(quote.completeness, "complete");
  assert.equal(quote.total, 500);
  assert.match(quote.lines.map((line) => line.label).join(" "), /Additional technician/);
  const plain = priceEstimate(supplied());
  assert.equal(plain.install?.crew.technicians, 1);
});

test("difficult access is flagged and not stacked on the double-storey supplement", () => {
  const upper = priceEstimate(input({ depth: "detailed", storeys: "double", roof: "metal", mountNeed: "no", access: "difficult" }));
  assert.equal(upper.install?.tasks.some((task) => task.id === "access"), false);
  assert.equal(upper.install?.otherAmount, 250);
  assert.equal(upper.lines.some((line) => line.amount === 100), false);
  assert.equal(upper.completeness, "partial");
  assert.match(upper.install?.reviews.join(" ") ?? "", /not added automatically/i);
  const single = priceEstimate(input({ depth: "detailed", roof: "metal", mountNeed: "no", access: "difficult" }));
  assert.equal(single.completeness, "partial");
  assert.equal(single.lines.some((line) => /Difficult access/.test(line.label)), false);
});

test("production travel rule is unchanged and stays out of customer text", () => {
  assert.equal(travelAmount(0), 0);
  assert.equal(travelAmount(20), 0);
  assert.equal(travelAmount(21), Math.round(1.8));
  assert.equal(travelAmount(1000), 420);
  const away = priceEstimate(input({ depth: "detailed", roof: "metal", mountNeed: "no", lat: -37.88, lng: 145.165, address: "Glen Waverley VIC" }));
  assert.equal(away.travel, travelAmount(away.km));
  assert.ok(away.travel > 0);
  assert.equal(away.total, 300 + away.travel);
  const blob = JSON.stringify({ note: away.travelNote, lines: away.lines, assumptions: away.assumptions, headline: away.headline });
  assert.equal(/per km/i.test(blob), false);
  assert.equal(blob.includes("1.80"), false);
});
