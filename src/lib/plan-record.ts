import { haversineKm } from "./utils.ts";

/** Saved property-plan shape. Version 2+ must be read or migrated on purpose, never guessed as version 1. */
export const PLAN_SCHEMA_VERSION = 1;

export const MAX_PLAN_BYTES = 80_000;

export type PlanSourceClass = "verified" | "mapped" | "customer" | "vinconnect" | "estimated";

export type PlanProvenance = {
  sourceClass: PlanSourceClass;
  provider?: "vicmap" | "osm" | "esri" | "vinconnect";
  sourceId?: string;
};

export type PlanRing = [number, number][];
export type PlanCoordinate = { lat: number; lng: number };

export type PlanBoundaryRecord = {
  ring: PlanRing;
  provenance: PlanProvenance;
};

export type PlanCustomerBoundary = {
  id: string;
  ring: PlanRing;
  provenance: PlanProvenance;
};

/**
 * Mapped and customer rings are stored side by side.
 * A customer override never replaces the mapped coordinates.
 * `mapped: null` means no authoritative boundary was returned.
 */
export type PlanBoundary = {
  mapped: PlanBoundaryRecord | null;
  customerOverride?: PlanCustomerBoundary;
  estimated?: PlanBoundaryRecord;
};

export type PlanSight = "clear" | "trees" | "unknown";

export type PlanSiteObject = {
  id: string;
  kind: string;
  label?: string;
  coordinate?: PlanCoordinate;
  polygon?: PlanRing;
  provenance: PlanProvenance;
  power?: boolean;
  camera?: boolean;
  sight?: PlanSight;
};

/** Straight-line link the review screen already shows. Not a surveyed route and not a multi-hop design. */
export type PlanConnection = {
  id: string;
  fromId: string;
  toId: string;
  distanceMetres: number;
  status: "indicative";
};

export type PersistedPlan = {
  schemaVersion: typeof PLAN_SCHEMA_VERSION;
  id: string;
  createdAt: string;
  property: {
    address: string;
    suburb?: string;
    postcode?: string;
    coordinate: PlanCoordinate;
    imagery: {
      status: "loaded" | "failed" | "unknown";
      provider?: "esri";
    };
    boundary: PlanBoundary;
  };
  siteObjects: PlanSiteObject[];
  connections: PlanConnection[];
  assessment?: {
    internet: string;
    goal: string;
  };
};

export type PlanCapture = {
  id?: string;
  createdAt?: string;
  address: {
    address: string;
    suburb?: string;
    postcode?: string;
    lat: number;
    lng: number;
  };
  trace: null | {
    boundary: PlanRing | null;
    boundarySource: "mapped" | "estimated" | "none";
    boundarySourceId?: string;
    buildings: {
      ring: PlanRing;
      centroid: PlanCoordinate;
      kind: string;
      source?: "osm" | "estimated";
      sourceId?: string;
    }[];
  };
  places: {
    id: number;
    label: string;
    kind: string;
    lat: number;
    lng: number;
    power: boolean;
    sight: PlanSight;
    camera: boolean;
    origin: "customer" | "trace";
    seedClass?: "mapped" | "estimated";
  }[];
  sourcePlaceId: number | null;
  /** Present only when the customer drew a boundary. Never inferred from the trace. */
  customerBoundary?: { id: string; ring: PlanRing } | null;
  /** Customer-drawn outlines. Not matched to markers by position. */
  customerOutlines?: { id: string; kind: string; ring: PlanRing; label?: string }[];
  imagery: { status: "loaded" | "failed" | "unknown" };
  internet?: string;
  goal?: string;
};

export class PlanPersistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PlanPersistError";
  }
}

const SOURCE_CLASS = new Set<PlanSourceClass>(["verified", "mapped", "customer", "vinconnect", "estimated"]);
const PROVIDER = new Set(["vicmap", "osm", "esri", "vinconnect"]);
const SIGHT = new Set<PlanSight>(["clear", "trees", "unknown"]);

function fail(message: string): never {
  throw new PlanPersistError(message);
}

function stripControls(value: string) {
  let out = "";
  for (const char of value) {
    if (char.charCodeAt(0) >= 32) out += char;
  }
  return out;
}

function text(value: unknown, max: number, label: string) {
  if (typeof value !== "string") fail(`${label} is missing.`);
  const clean = stripControls(value).trim();
  if (!clean || clean.length > max) fail(`${label} is not usable.`);
  if (clean.includes("data:") || clean.includes("base64,")) fail(`${label} cannot contain image data.`);
  return clean;
}

function optionalText(value: unknown, max: number) {
  if (value == null || value === "") return undefined;
  if (typeof value !== "string") fail("A plan label is not text.");
  const clean = stripControls(value).trim();
  if (!clean) return undefined;
  if (clean.length > max || clean.includes("data:") || clean.includes("base64,")) fail("A plan label is too long.");
  return clean;
}

function sourceId(value: unknown) {
  if (value == null || value === "") return undefined;
  if (typeof value !== "string" || !/^[A-Za-z0-9:._-]{1,80}$/.test(value)) return undefined;
  return value;
}

function coordinate(value: unknown, label: string): PlanCoordinate {
  if (!value || typeof value !== "object") fail(`${label} is missing.`);
  const point = value as { lat?: unknown; lng?: unknown };
  const lat = Number(point.lat);
  const lng = Number(point.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    fail(`${label} is not a coordinate.`);
  }
  return { lat, lng };
}

function ringOf(value: unknown, label: string): PlanRing {
  if (!Array.isArray(value) || value.length < 4 || value.length > 4000) fail(`${label} is not a ring.`);
  return value.map((point) => {
    if (!Array.isArray(point) || point.length < 2) fail(`${label} has a broken point.`);
    const lat = Number(point[0]);
    const lng = Number(point[1]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      fail(`${label} has a point off the map.`);
    }
    return [lat, lng] as [number, number];
  });
}

function provenanceOf(value: unknown): PlanProvenance {
  if (!value || typeof value !== "object") fail("Plan provenance is missing.");
  const raw = value as { sourceClass?: unknown; provider?: unknown; sourceId?: unknown };
  if (typeof raw.sourceClass !== "string" || !SOURCE_CLASS.has(raw.sourceClass as PlanSourceClass)) {
    fail("Plan provenance class is not recognised.");
  }
  const out: PlanProvenance = { sourceClass: raw.sourceClass as PlanSourceClass };
  if (raw.provider != null && raw.provider !== "") {
    if (typeof raw.provider !== "string" || !PROVIDER.has(raw.provider)) fail("Plan provider is not recognised.");
    out.provider = raw.provider as PlanProvenance["provider"];
  }
  const id = sourceId(raw.sourceId);
  if (id) out.sourceId = id;
  return out;
}

function placeId(id: number) {
  return `place:${id}`;
}

function buildingObjectId(
  building: { source?: "osm" | "estimated"; sourceId?: string },
  index: number,
) {
  if (building.source === "estimated") return `building:estimated:${index + 1}`;
  const id = sourceId(building.sourceId);
  if (building.source === "osm" && id) return `building:osm:${id}`;
  return `building:mapped:${index + 1}`;
}

function buildingProvenance(building: { source?: "osm" | "estimated"; sourceId?: string }): PlanProvenance {
  if (building.source === "estimated") return { sourceClass: "estimated", provider: "vinconnect" };
  if (building.source === "osm") {
    const id = sourceId(building.sourceId);
    return id ? { sourceClass: "mapped", provider: "osm", sourceId: id } : { sourceClass: "mapped", provider: "osm" };
  }
  return { sourceClass: "mapped" };
}

function placeProvenance(place: PlanCapture["places"][number]): PlanProvenance {
  if (place.origin === "customer") return { sourceClass: "customer" };
  if (place.seedClass === "estimated") return { sourceClass: "estimated", provider: "vinconnect" };
  return { sourceClass: "mapped", provider: "osm" };
}

/**
 * Converts the current planner state into the saved plan.
 * Building polygons and place markers are both kept. They are not paired by array position or by overlapping coordinates.
 */
export function buildPersistedPlan(capture: PlanCapture): PersistedPlan {
  const boundary: PlanBoundary = { mapped: null };
  if (capture.trace?.boundary && capture.trace.boundarySource === "mapped") {
    const id = sourceId(capture.trace.boundarySourceId);
    boundary.mapped = {
      ring: capture.trace.boundary.map(([lat, lng]) => [lat, lng]),
      provenance: id
        ? { sourceClass: "verified", provider: "vicmap", sourceId: id }
        : { sourceClass: "verified", provider: "vicmap" },
    };
  } else if (capture.trace?.boundary && capture.trace.boundarySource === "estimated") {
    boundary.estimated = {
      ring: capture.trace.boundary.map(([lat, lng]) => [lat, lng]),
      provenance: { sourceClass: "estimated", provider: "vinconnect" },
    };
  }

  if (capture.customerBoundary?.ring) {
    boundary.customerOverride = {
      id: capture.customerBoundary.id,
      ring: capture.customerBoundary.ring.map(([lat, lng]) => [lat, lng]),
      provenance: { sourceClass: "customer" },
    };
  }

  const siteObjects: PlanSiteObject[] = [];
  capture.trace?.buildings.forEach((building, index) => {
    siteObjects.push({
      id: buildingObjectId(building, index),
      kind: building.kind,
      coordinate: { lat: building.centroid.lat, lng: building.centroid.lng },
      polygon: building.ring.map(([lat, lng]) => [lat, lng]),
      provenance: buildingProvenance(building),
    });
  });

  for (const outline of capture.customerOutlines ?? []) {
    siteObjects.push({
      id: outline.id,
      kind: outline.kind,
      ...(outline.label ? { label: outline.label } : {}),
      polygon: outline.ring.map(([lat, lng]) => [lat, lng]),
      provenance: { sourceClass: "customer" },
    });
  }

  for (const place of capture.places) {
    siteObjects.push({
      id: placeId(place.id),
      kind: place.kind,
      label: place.label,
      coordinate: { lat: place.lat, lng: place.lng },
      provenance: placeProvenance(place),
      power: place.power,
      camera: place.camera,
      sight: place.sight,
    });
  }

  const source = capture.places.find((place) => place.id === capture.sourcePlaceId) ?? null;
  const connections: PlanConnection[] = [];
  if (source) {
    for (const place of capture.places) {
      if (place.id === source.id) continue;
      const fromId = placeId(source.id);
      const toId = placeId(place.id);
      connections.push({
        id: `connection:${fromId}:${toId}`,
        fromId,
        toId,
        distanceMetres: Math.round(haversineKm(source, place) * 1000),
        status: "indicative",
      });
    }
  }

  const assessment =
    capture.internet || capture.goal
      ? { internet: capture.internet ?? "", goal: capture.goal ?? "" }
      : undefined;

  return acceptPersistedPlan({
    schemaVersion: PLAN_SCHEMA_VERSION,
    id: capture.id ?? "",
    createdAt: capture.createdAt ?? "",
    property: {
      address: capture.address.address,
      ...(capture.address.suburb ? { suburb: capture.address.suburb } : {}),
      ...(capture.address.postcode ? { postcode: capture.address.postcode } : {}),
      coordinate: { lat: capture.address.lat, lng: capture.address.lng },
      imagery: {
        status: capture.imagery.status,
        ...(capture.imagery.status === "unknown" ? {} : { provider: "esri" as const }),
      },
      boundary,
    },
    siteObjects,
    connections,
    ...(assessment ? { assessment } : {}),
  });
}

export function acceptPersistedPlan(input: unknown): PersistedPlan {
  let encoded = "";
  try {
    encoded = JSON.stringify(input);
  } catch {
    fail("Property plan could not be saved.");
  }
  if (!encoded || encoded === "null" || encoded.length > MAX_PLAN_BYTES) fail("Property plan is too large to save.");
  if (encoded.includes("data:image") || encoded.includes("base64,")) fail("Property plan cannot contain image data.");

  const data = JSON.parse(encoded) as Record<string, unknown>;
  if (!data || typeof data !== "object" || Array.isArray(data)) fail("Property plan was not a record.");
  if (data.schemaVersion !== PLAN_SCHEMA_VERSION) fail("Property plan version is not supported.");

  const id = data.id == null || data.id === "" ? "" : text(data.id, 32, "Plan id");
  if (id && !/^[A-Za-z0-9-]{4,32}$/.test(id)) fail("Plan id is not usable.");
  const createdAt = data.createdAt == null || data.createdAt === "" ? "" : text(data.createdAt, 40, "Plan time");
  if (createdAt && Number.isNaN(Date.parse(createdAt))) fail("Plan time is not a date.");

  const property = data.property;
  if (!property || typeof property !== "object") fail("Property plan has no property.");
  const prop = property as Record<string, unknown>;
  const imageryRaw = prop.imagery;
  if (!imageryRaw || typeof imageryRaw !== "object") fail("Property plan has no imagery note.");
  const imageryStatus = (imageryRaw as { status?: unknown }).status;
  if (imageryStatus !== "loaded" && imageryStatus !== "failed" && imageryStatus !== "unknown") {
    fail("Imagery status is not recognised.");
  }
  const provider = (imageryRaw as { provider?: unknown }).provider;
  if (provider != null && provider !== "esri") fail("Imagery provider is not recognised.");

  const boundaryRaw = prop.boundary;
  if (!boundaryRaw || typeof boundaryRaw !== "object") fail("Property plan has no boundary.");
  const boundaryIn = boundaryRaw as Record<string, unknown>;
  const boundary: PlanBoundary = { mapped: null };
  if (boundaryIn.mapped != null) {
    const mapped = boundaryIn.mapped as Record<string, unknown>;
    const provenance = provenanceOf(mapped.provenance);
    if (provenance.sourceClass !== "verified" || provenance.provider !== "vicmap") {
      fail("A mapped boundary has to stay a Vicmap record.");
    }
    boundary.mapped = { ring: ringOf(mapped.ring, "Mapped boundary"), provenance };
  }
  if (boundaryIn.customerOverride != null) {
    const custom = boundaryIn.customerOverride as Record<string, unknown>;
    const provenance = provenanceOf(custom.provenance);
    if (provenance.sourceClass !== "customer") fail("A customer boundary was stored as mapped data.");
    boundary.customerOverride = {
      id: text(custom.id, 80, "Customer boundary"),
      ring: ringOf(custom.ring, "Customer boundary"),
      provenance: { sourceClass: "customer" },
    };
  }
  if (boundaryIn.estimated != null) {
    const estimated = boundaryIn.estimated as Record<string, unknown>;
    const provenance = provenanceOf(estimated.provenance);
    if (provenance.sourceClass !== "estimated") fail("An estimated boundary was stored as mapped data.");
    boundary.estimated = {
      ring: ringOf(estimated.ring, "Estimated boundary"),
      provenance: { sourceClass: "estimated", provider: "vinconnect" },
    };
  }

  if (!Array.isArray(data.siteObjects) || data.siteObjects.length > 40) fail("Property plan objects are not usable.");
  const siteObjects: PlanSiteObject[] = data.siteObjects.map((item) => {
    if (!item || typeof item !== "object") fail("A plan object is missing.");
    const row = item as Record<string, unknown>;
    const object: PlanSiteObject = {
      id: text(row.id, 80, "Plan object"),
      kind: text(row.kind, 40, "Plan object kind"),
      provenance: provenanceOf(row.provenance),
    };
    const label = optionalText(row.label, 80);
    if (label) object.label = label;
    if (row.coordinate != null) object.coordinate = coordinate(row.coordinate, object.id);
    if (row.polygon != null) object.polygon = ringOf(row.polygon, object.id);
    if (!object.coordinate && !object.polygon) fail("A plan object has no position.");
    if (row.power != null) {
      if (typeof row.power !== "boolean") fail("Power was not yes or no.");
      object.power = row.power;
    }
    if (row.camera != null) {
      if (typeof row.camera !== "boolean") fail("Camera was not yes or no.");
      object.camera = row.camera;
    }
    if (row.sight != null) {
      if (typeof row.sight !== "string" || !SIGHT.has(row.sight as PlanSight)) fail("Sight was not recognised.");
      object.sight = row.sight as PlanSight;
    }
    return object;
  });
  const ids = new Set(siteObjects.map((object) => object.id));
  if (ids.size !== siteObjects.length) fail("Plan object ids are not unique.");
  if (boundary.customerOverride && ids.has(boundary.customerOverride.id)) {
    fail("Customer boundary id clashes with a plan object.");
  }

  if (!Array.isArray(data.connections) || data.connections.length > 12) fail("Property plan links are not usable.");
  const connections: PlanConnection[] = data.connections.map((item) => {
    if (!item || typeof item !== "object") fail("A plan link is missing.");
    const row = item as Record<string, unknown>;
    const fromId = text(row.fromId, 80, "Plan link");
    const toId = text(row.toId, 80, "Plan link");
    if (!ids.has(fromId) || !ids.has(toId) || fromId === toId) fail("A plan link does not match a place.");
    if (row.status !== "indicative") fail("A plan link status is not the current straight-line link.");
    const distanceMetres = Number(row.distanceMetres);
    if (!Number.isInteger(distanceMetres) || distanceMetres < 0 || distanceMetres > 100_000) {
      fail("A plan distance is not usable.");
    }
    return { id: text(row.id, 180, "Plan link"), fromId, toId, distanceMetres, status: "indicative" };
  });

  let assessment: PersistedPlan["assessment"];
  if (data.assessment != null) {
    if (typeof data.assessment !== "object") fail("Plan assessment is not usable.");
    const raw = data.assessment as { internet?: unknown; goal?: unknown };
    assessment = {
      internet: raw.internet == null || raw.internet === "" ? "" : text(raw.internet, 40, "Internet"),
      goal: raw.goal == null || raw.goal === "" ? "" : text(raw.goal, 40, "Goal"),
    };
  }

  return {
    schemaVersion: PLAN_SCHEMA_VERSION,
    id,
    createdAt,
    property: {
      address: text(prop.address, 300, "Address"),
      ...(optionalText(prop.suburb, 120) ? { suburb: optionalText(prop.suburb, 120) } : {}),
      ...(optionalText(prop.postcode, 12) ? { postcode: optionalText(prop.postcode, 12) } : {}),
      coordinate: coordinate(prop.coordinate, "Property"),
      imagery: {
        status: imageryStatus,
        ...(imageryStatus === "unknown" || provider == null ? {} : { provider: "esri" as const }),
      },
      boundary,
    },
    siteObjects,
    connections,
    ...(assessment ? { assessment } : {}),
  };
}

/** Missing plans and unknown versions load as "no plan" so older leads keep opening. */
export function readPersistedPlan(value: unknown): PersistedPlan | null {
  if (value == null) return null;
  try {
    return acceptPersistedPlan(value);
  } catch {
    return null;
  }
}

/** Fields posted to the public enquiry form and the customer email. Geometry stays out of both. */
export function leadDeliveryFields(lead: {
  name: string;
  email: string;
  phone: string;
  suburb: string;
  address?: string;
  type: string;
  package?: string;
  message: string;
  plan?: unknown;
}) {
  return {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    suburb: lead.suburb,
    address: lead.address || "",
    type: lead.type,
    package: lead.package || "",
    message: lead.message,
  };
}
