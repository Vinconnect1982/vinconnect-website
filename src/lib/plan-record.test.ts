import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { publicQuote, type Submission } from "./submissions.server.ts";
import { useSiteSession } from "./site-session.ts";
import { haversineKm } from "./utils.ts";
import {
  MAX_PLAN_BYTES,
  PLAN_SCHEMA_VERSION,
  acceptPersistedPlan,
  buildPersistedPlan,
  leadDeliveryFields,
  readPersistedPlan,
  type PlanCapture,
  type PlanRing,
} from "./plan-record.ts";

function box(lat: number, lng: number, size = 0.0002): PlanRing {
  return [
    [lat - size, lng - size],
    [lat - size, lng + size],
    [lat + size, lng + size],
    [lat + size, lng - size],
    [lat - size, lng - size],
  ];
}

function capture(overrides: Partial<PlanCapture> = {}): PlanCapture {
  const mapped = box(-37.81, 144.97, 0.0004);
  const house = box(-37.81, 144.97, 0.00008);
  const shed = box(-37.8096, 144.9704, 0.00005);
  return {
    address: {
      address: "1 Spring Street, Melbourne VIC 3000",
      suburb: "Melbourne",
      postcode: "3000",
      lat: -37.81,
      lng: 144.97,
    },
    trace: {
      boundary: mapped,
      boundarySource: "mapped",
      boundarySourceId: "1234567",
      buildings: [
        { ring: house, centroid: { lat: -37.81, lng: 144.97 }, kind: "house", source: "osm", sourceId: "9001" },
        { ring: shed, centroid: { lat: -37.8096, lng: 144.9704 }, kind: "shed", source: "osm", sourceId: "9002" },
      ],
    },
    places: [
      {
        id: 1,
        label: "House / internet",
        kind: "house",
        lat: -37.81,
        lng: 144.97,
        power: true,
        sight: "unknown",
        camera: false,
        origin: "trace",
        seedClass: "mapped",
      },
      {
        id: 2,
        label: "Shed",
        kind: "shed",
        lat: -37.8096,
        lng: 144.9704,
        power: false,
        sight: "trees",
        camera: true,
        origin: "customer",
      },
    ],
    sourcePlaceId: 1,
    imagery: { status: "loaded" },
    internet: "starlink",
    goal: "wifi",
    ...overrides,
  };
}

test("mapped Vicmap boundary is preserved with provider and source id", () => {
  const input = capture();
  const plan = buildPersistedPlan(input);
  assert.equal(plan.schemaVersion, PLAN_SCHEMA_VERSION);
  assert.equal(plan.schemaVersion, 1);
  assert.deepEqual(plan.property.boundary.mapped?.ring, input.trace?.boundary);
  assert.deepEqual(plan.property.boundary.mapped?.provenance, {
    sourceClass: "verified",
    provider: "vicmap",
    sourceId: "1234567",
  });
  assert.equal(plan.property.imagery.provider, "esri");
  assert.equal(plan.property.imagery.status, "loaded");
});

test("a customer boundary is stored separately and does not change the mapped ring", () => {
  const input = capture();
  const mapped = input.trace!.boundary!;
  const customer = box(-37.811, 144.971, 0.0003);
  const originalLat = mapped[0][0];
  const plan = buildPersistedPlan({
    ...input,
    customerBoundary: { id: "boundary-customer-1", ring: customer },
  });
  assert.equal(plan.property.boundary.customerOverride?.id, "boundary-customer-1");
  assert.equal(plan.property.boundary.customerOverride?.provenance.sourceClass, "customer");
  assert.equal(plan.property.boundary.customerOverride?.provenance.provider, undefined);
  assert.deepEqual(plan.property.boundary.customerOverride?.ring, customer);
  assert.deepEqual(plan.property.boundary.mapped?.ring, mapped);
  plan.property.boundary.customerOverride!.ring[0][0] = 1;
  customer[0][0] = 2;
  mapped[0][0] = 3;
  assert.equal(plan.property.boundary.mapped?.ring[0][0], originalLat);
  assert.notEqual(plan.property.boundary.customerOverride?.ring[0][0], 2);
});

test("a customer outline keeps its id and is not paired with a marker", () => {
  const plan = buildPersistedPlan({
    ...capture(),
    customerOutlines: [{ id: "outline-shed-7", kind: "shed", ring: box(-37.809, 144.971), label: "My shed" }],
  });
  const outline = plan.siteObjects.find((object) => object.id === "outline-shed-7");
  assert.ok(outline);
  assert.equal(outline?.provenance.sourceClass, "customer");
  assert.equal(outline?.polygon?.length, 5);
  assert.equal(outline?.coordinate, undefined);
  const marker = plan.siteObjects.find((object) => object.id === "place:2");
  assert.equal(marker?.provenance.sourceClass, "customer");
  assert.equal(marker?.polygon, undefined);
  assert.equal(JSON.stringify(outline).includes("place:2"), false);
});

test("a mapped building keeps provider and source id, and an estimated lot is not called Vicmap", () => {
  const mapped = buildPersistedPlan(capture());
  const house = mapped.siteObjects.find((object) => object.id === "building:osm:9001");
  assert.deepEqual(house?.provenance, { sourceClass: "mapped", provider: "osm", sourceId: "9001" });
  assert.deepEqual(house?.polygon, capture().trace?.buildings[0].ring);

  const estimatedRing = box(-37.5, 145.2, 0.001);
  const estimated = buildPersistedPlan(
    capture({
      trace: {
        boundary: estimatedRing,
        boundarySource: "estimated",
        buildings: [
          {
            ring: box(-37.5, 145.2, 0.0001),
            centroid: { lat: -37.5, lng: 145.2 },
            kind: "house",
            source: "estimated",
          },
        ],
      },
    }),
  );
  assert.equal(estimated.property.boundary.mapped, null);
  assert.equal(estimated.property.boundary.estimated?.provenance.sourceClass, "estimated");
  assert.equal(estimated.property.boundary.estimated?.provenance.provider, "vinconnect");
  assert.deepEqual(estimated.property.boundary.estimated?.ring, estimatedRing);
  assert.equal(estimated.siteObjects.find((object) => object.kind === "house" && object.polygon)?.provenance.sourceClass, "estimated");
});

test("no mapped boundary is stored as mapped null", () => {
  const plan = buildPersistedPlan(capture({ trace: null }));
  assert.equal(plan.property.boundary.mapped, null);
  assert.equal(plan.property.boundary.estimated, undefined);
  assert.equal(plan.property.boundary.customerOverride, undefined);
});

test("indicative links reproduce the current source-to-place distances", () => {
  const input = capture();
  const plan = buildPersistedPlan(input);
  assert.equal(plan.connections.length, 1);
  const link = plan.connections[0];
  assert.equal(link.fromId, "place:1");
  assert.equal(link.toId, "place:2");
  assert.equal(link.status, "indicative");
  assert.equal(link.distanceMetres, Math.round(haversineKm(input.places[0], input.places[1]) * 1000));
});

test("persisted geometry matches the trace and places the sketch is given", () => {
  const input = capture();
  const plan = buildPersistedPlan(input);
  assert.deepEqual(plan.property.coordinate, { lat: input.address.lat, lng: input.address.lng });
  input.trace?.buildings.forEach((building) => {
    const saved = plan.siteObjects.find((object) => object.provenance.sourceId === building.sourceId);
    assert.deepEqual(saved?.polygon, building.ring);
    assert.deepEqual(saved?.coordinate, building.centroid);
  });
  for (const place of input.places) {
    const saved = plan.siteObjects.find((object) => object.id === `place:${place.id}`);
    assert.deepEqual(saved?.coordinate, { lat: place.lat, lng: place.lng });
    assert.equal(saved?.label, place.label);
    assert.equal(saved?.power, place.power);
    assert.equal(saved?.camera, place.camera);
  }
});

test("old leads without a plan and unknown versions stay readable", () => {
  const legacy: Submission = {
    id: "EN-OLDLEAD",
    createdAt: "2026-04-01T00:00:00.000Z",
    kind: "enquiry",
    name: "Alex",
    email: "alex@example.com",
    phone: "0400000000",
    address: "10 Kelly Road",
    suburb: "Mansfield",
    type: "property-plan",
    summary: "Older enquiry",
  };
  assert.equal(legacy.plan, undefined);
  assert.equal(readPersistedPlan(legacy.plan), null);
  assert.equal(readPersistedPlan({ schemaVersion: 2, property: {} }), null);
  const pub = publicQuote(legacy);
  assert.equal(pub.id, "EN-OLDLEAD");
  assert.equal("plan" in pub, false);

  const withPlan = { ...legacy, plan: buildPersistedPlan({ ...capture(), id: "EN-OLDLEAD", createdAt: legacy.createdAt }) };
  const hidden = publicQuote(withPlan);
  assert.equal("plan" in hidden, false);
  assert.equal(hidden.summary, "Older enquiry");
  assert.equal(readPersistedPlan(withPlan.plan)?.schemaVersion, 1);
});

test("the address draft still stores only an address", () => {
  const source = readFileSync(new URL("./site-session.ts", import.meta.url), "utf8");
  assert.match(source, /name: "vinconnect-site-session"/);
  assert.match(source, /address: AddressHit \| null/);
  assert.equal(/plan\??\s*:/.test(source), false);
  useSiteSession.setState({
    address: {
      address: "1 Spring Street, Melbourne VIC 3000",
      lat: -37.815,
      lng: 144.974,
      suburb: "Melbourne",
      postcode: "3000",
      located: true,
    },
  });
  const address = useSiteSession.getState().address;
  assert.equal(address?.postcode, "3000");
  assert.equal(address && "plan" in address, false);
  useSiteSession.setState({ address: null });
});

test("delivery fields omit the plan, images and pdf bytes", () => {
  const plan = buildPersistedPlan(capture());
  const fields = leadDeliveryFields({
    name: "Vince",
    email: "vince@vinconnect.com.au",
    phone: "0408559555",
    suburb: "Melbourne",
    address: "1 Spring Street, Melbourne VIC 3000",
    type: "property-plan",
    package: "",
    message: "PROPERTY PLAN",
    plan,
  });
  assert.equal("plan" in fields, false);
  const encoded = JSON.stringify(fields);
  assert.equal(encoded.includes("vicmap"), false);
  assert.equal(encoded.includes("data:image"), false);
  assert.equal(encoded.includes("%PDF"), false);
  const saved = JSON.stringify(plan);
  assert.equal(saved.includes("data:image"), false);
  assert.equal(saved.includes("%PDF"), false);
  assert.equal(saved.includes("base64,"), false);
});

test("image payloads and oversized plans are refused", () => {
  const plan = buildPersistedPlan(capture());
  assert.throws(() => acceptPersistedPlan({ ...plan, property: { ...plan.property, address: "data:image/jpeg;base64,AAAA" } }), /image data/);
  const huge = { ...plan, property: { ...plan.property, address: "A".repeat(MAX_PLAN_BYTES) } };
  assert.throws(() => acceptPersistedPlan(huge), /too large/);
});

test("representative plans stay small enough for the submission blob", () => {
  const simple = JSON.stringify(buildPersistedPlan(capture()));
  const several = buildPersistedPlan(
    capture({
      trace: {
        boundary: box(-37.2, 145.4, 0.002),
        boundarySource: "mapped",
        boundarySourceId: "555",
        buildings: Array.from({ length: 6 }, (_, index) => ({
          ring: box(-37.2 + index * 0.0002, 145.4, 0.00005),
          centroid: { lat: -37.2 + index * 0.0002, lng: 145.4 },
          kind: index === 0 ? "house" : "building",
          source: "osm" as const,
          sourceId: `8${index}`,
        })),
      },
    }),
  );
  const places = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    label: index === 0 ? "House / internet" : `Place ${index + 1}`,
    kind: index === 0 ? "house" : "shed",
    lat: -37.7 + index * 0.0003,
    lng: 145.1 + index * 0.0003,
    power: index % 2 === 0,
    sight: "unknown" as const,
    camera: index % 3 === 0,
    origin: index < 10 ? ("trace" as const) : ("customer" as const),
    seedClass: index < 10 ? ("mapped" as const) : undefined,
  }));
  const maximum = buildPersistedPlan(
    capture({
      trace: {
        boundary: Array.from({ length: 80 }, (_, index) => [-37.7 + Math.sin(index) * 0.01, 145.1 + Math.cos(index) * 0.01] as [number, number]),
        boundarySource: "mapped",
        boundarySourceId: "999",
        buildings: Array.from({ length: 10 }, (_, index) => ({
          ring: box(-37.7 + index * 0.00015, 145.1, 0.00004),
          centroid: { lat: -37.7 + index * 0.00015, lng: 145.1 },
          kind: "building",
          source: "osm" as const,
          sourceId: `7${index}`,
        })),
      },
      places,
      sourcePlaceId: 1,
    }),
  );
  const sizes = {
    simple: simple.length,
    several: JSON.stringify(several).length,
    maximum: JSON.stringify(maximum).length,
  };
  console.log("persisted plan bytes", sizes);
  assert.ok(sizes.simple < 8_000);
  assert.ok(sizes.several < 16_000);
  assert.ok(sizes.maximum < MAX_PLAN_BYTES);
  assert.equal(maximum.connections.length, 11);
  assert.equal(acceptPersistedPlan(JSON.parse(JSON.stringify(maximum))).id, "");
});

test("the installation quote PDF path is unchanged and does not require a plan", () => {
  const mail = readFileSync(new URL("./estimate-mail.server.ts", import.meta.url), "utf8");
  const pdf = readFileSync(new URL("./estimate-pdf.ts", import.meta.url), "utf8");
  assert.match(mail, /buildEstimatePdf/);
  assert.match(mail, /application\/pdf/);
  assert.equal(mail.includes("plan"), false);
  assert.match(pdf, /export async function buildEstimatePdf/);
  const quote: Submission = {
    id: "VC-TEST1234",
    createdAt: "2026-09-01T00:00:00.000Z",
    kind: "quote",
    name: "Sam",
    email: "sam@example.com",
    phone: "0400000000",
    address: "5 Milla Way",
    suburb: "Koo Wee Rup",
    type: "quote",
    summary: "Installation quote",
    total: 450,
  };
  assert.equal(quote.plan, undefined);
  assert.equal(publicQuote(quote).total, 450);
});
