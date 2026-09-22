import { createServerFn } from "@tanstack/react-start";
import { haversineKm } from "@/lib/utils";

export type Ring = [number, number][];

export type BuildingTrace = {
  ring: Ring;
  centroid: { lat: number; lng: number };
  kind: string;
  areaM2: number;
  heightM: number;
};

export type PropertyTrace = {
  house: BuildingTrace | null;
  buildings: BuildingTrace[];
  boundary: Ring | null;
  boundarySource: "mapped" | "estimated" | "none";
};

function attrs(tag: string) {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/(\w+)="([^"]*)"/g)) out[m[1]] = m[2];
  return out;
}

function parseOsm(xml: string) {
  const nodes = new Map<string, [number, number]>();
  for (const m of xml.matchAll(/<node\b([^>]*)\/?>/g)) {
    const a = attrs(m[1]);
    if (a.id && a.lat && a.lon) nodes.set(a.id, [Number(a.lat), Number(a.lon)]);
  }
  const ways: { tags: Record<string, string>; ring: Ring }[] = [];
  for (const block of xml.split(/<way\b/).slice(1)) {
    const body = block.slice(0, block.indexOf("</way>"));
    const tags: Record<string, string> = {};
    for (const t of body.matchAll(/<tag k="([^"]+)" v="([^"]*)"/g)) tags[t[1]] = t[2];
    const ring: Ring = [];
    for (const nd of body.matchAll(/<nd ref="(\d+)"/g)) {
      const pt = nodes.get(nd[1]);
      if (pt) ring.push(pt);
    }
    if (ring.length >= 3) {
      const first = ring[0];
      const last = ring[ring.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) ring.push(first);
      ways.push({ tags, ring });
    }
  }
  return ways;
}

export function centroid(ring: Ring) {
  let lat = 0;
  let lng = 0;
  const n = Math.max(1, ring.length - 1);
  for (let i = 0; i < n; i++) {
    lat += ring[i][0];
    lng += ring[i][1];
  }
  return { lat: lat / n, lng: lng / n };
}

export function areaM2(ring: Ring) {
  if (ring.length < 4) return 0;
  const lat0 = ring[0][0] * (Math.PI / 180);
  const mLat = 111320;
  const mLng = 111320 * Math.cos(lat0);
  let sum = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const x1 = ring[i][1] * mLng;
    const y1 = ring[i][0] * mLat;
    const x2 = ring[i + 1][1] * mLng;
    const y2 = ring[i + 1][0] * mLat;
    sum += x1 * y2 - x2 * y1;
  }
  return Math.abs(sum) / 2;
}

function contains(ring: Ring, lat: number, lng: number) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const yi = ring[i][0];
    const xi = ring[i][1];
    const yj = ring[j][0];
    const xj = ring[j][1];
    const intersect = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi + 1e-12) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function expandBbox(ring: Ring, meters: number): Ring {
  let minLat = 90;
  let maxLat = -90;
  let minLng = 180;
  let maxLng = -180;
  for (const [lat, lng] of ring) {
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
  }
  const padLat = meters / 111320;
  const padLng = meters / (111320 * Math.cos(((minLat + maxLat) / 2) * (Math.PI / 180)));
  return [
    [minLat - padLat, minLng - padLng],
    [minLat - padLat, maxLng + padLng],
    [maxLat + padLat, maxLng + padLng],
    [maxLat + padLat, minLng - padLng],
    [minLat - padLat, minLng - padLng],
  ];
}

function rectAround(lat: number, lng: number, widthM: number, depthM: number): Ring {
  const dLat = depthM / 2 / 111320;
  const dLng = widthM / 2 / (111320 * Math.cos(lat * (Math.PI / 180)));
  return [
    [lat - dLat, lng - dLng],
    [lat - dLat, lng + dLng],
    [lat + dLat, lng + dLng],
    [lat + dLat, lng - dLng],
    [lat - dLat, lng - dLng],
  ];
}

function buildingHeight(tags: Record<string, string>, area: number, kind: string) {
  const named = Number(tags.height);
  if (named > 1.5 && named < 40) return named;
  const levels = Number(tags["building:levels"]);
  if (levels >= 1 && levels < 12) return Math.max(2.4, levels * 2.8);
  if (kind.includes("shed") || kind.includes("garage") || kind.includes("carport") || kind.includes("hut")) {
    return 2.6;
  }
  if (kind.includes("greenhouse") || kind.includes("barn")) return kind.includes("barn") ? 4.2 : 2.5;
  if (area > 220) return 6.2;
  return 3.4;
}

function estimateLot(house: BuildingTrace, others: BuildingTrace[]): Ring {
  let clearance = house.areaM2 > 350 ? 16 : 11;
  for (const o of others) {
    const d = haversineKm(house.centroid, o.centroid) * 1000;
    const gap = d / 2 - Math.sqrt(o.areaM2) / 3;
    if (gap > 5) clearance = Math.min(clearance, gap);
  }
  const nearby = others.filter((o) => haversineKm(house.centroid, o.centroid) * 1000 < 90);
  if (nearby.length === 0) clearance = Math.max(clearance, 28);
  clearance = Math.max(7, Math.min(clearance, 42));
  return expandBbox(house.ring, clearance);
}

function fromGeoJson(geom: { type?: string; coordinates?: unknown }): Ring[] {
  const rings: Ring[] = [];
  if (geom.type === "Polygon" && Array.isArray(geom.coordinates)) {
    const outer = geom.coordinates[0] as [number, number][] | undefined;
    if (outer) rings.push(outer.map(([lng, lat]) => [lat, lng]));
  }
  if (geom.type === "MultiPolygon" && Array.isArray(geom.coordinates)) {
    for (const poly of geom.coordinates as [number, number][][][]) {
      const outer = poly[0];
      if (outer) rings.push(outer.map(([lng, lat]) => [lat, lng]));
    }
  }
  return rings.filter((r) => r.length >= 4);
}

function toMercator(lng: number, lat: number) {
  const x = (lng * 20037508.34) / 180;
  const y =
    (Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180)) * (20037508.34 / 180);
  return { x, y };
}

async function vicmapBoundary(lat: number, lng: number): Promise<Ring | null> {
  const { x, y } = toMercator(lng, lat);
  const params = new URLSearchParams({
    geometry: JSON.stringify({ x, y, spatialReference: { wkid: 3857 } }),
    geometryType: "esriGeometryPoint",
    inSR: "3857",
    distance: "25",
    units: "esriSRUnit_Meter",
    spatialRel: "esriSpatialRelIntersects",
    outFields: "prop_propnum,prop_property_type,prop_status",
    returnGeometry: "true",
    outSR: "4326",
    f: "geojson",
    resultRecordCount: "4",
  });
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 2500);
  try {
    const res = await fetch(
      `https://services-ap1.arcgis.com/P744lA0wf4LlBZ84/ArcGIS/rest/services/Vicmap_Property/FeatureServer/0/query?${params}`,
      { headers: { Accept: "application/json" }, signal: ctrl.signal },
    );
    if (!res.ok) return null;
    const body = (await res.json()) as {
      features?: { geometry?: { type?: string; coordinates?: unknown } }[];
    };
    const candidates = (body.features ?? [])
      .flatMap((f) => fromGeoJson(f.geometry ?? {}))
      .map((ring) => ({ ring, area: areaM2(ring) }))
      .filter((p) => p.area > 80 && p.area < 2_000_000 && contains(p.ring, lat, lng))
      .sort((a, b) => a.area - b.area);
    return candidates[0]?.ring ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

export const traceProperty = createServerFn({ method: "POST" })
  .validator((input: { lat: number; lng: number }) => input)
  .handler(async ({ data }): Promise<PropertyTrace> => {
    const pad = 0.0024;
    const bbox = `${data.lng - pad},${data.lat - pad},${data.lng + pad},${data.lat + pad}`;
    const [osmRes, mapped] = await Promise.all([
      fetch(`https://api.openstreetmap.org/api/0.6/map?bbox=${bbox}`, {
        headers: {
          Accept: "application/xml",
          "User-Agent": "VINCONNECT-planner/1.0 (https://vinconnect.com.au)",
        },
      }),
      vicmapBoundary(data.lat, data.lng),
    ]);

    const buildings: BuildingTrace[] = [];
    if (osmRes.ok) {
      const ways = parseOsm(await osmRes.text());
      for (const w of ways) {
        if (!w.tags.building || w.tags.building === "no") continue;
        const area = areaM2(w.ring);
        if (area <= 12 || area >= 12000) continue;
        const kind = w.tags.building === "yes" ? "building" : w.tags.building;
        buildings.push({
          ring: w.ring,
          centroid: centroid(w.ring),
          kind,
          areaM2: area,
          heightM: buildingHeight(w.tags, area, kind),
        });
      }
      buildings.sort(
        (a, b) =>
          haversineKm(a.centroid, data) - haversineKm(b.centroid, data) || b.areaM2 - a.areaM2,
      );
    }

    let house = buildings[0] ?? null;
    if (!house) {
      const ring = rectAround(data.lat, data.lng, 14, 11);
      house = {
        ring,
        centroid: { lat: data.lat, lng: data.lng },
        kind: "house",
        areaM2: areaM2(ring),
        heightM: 3.4,
      };
      buildings.unshift(house);
    }

    const others = buildings.filter((b) => b !== house);
    let boundary = mapped;
    let boundarySource: PropertyTrace["boundarySource"] = mapped ? "mapped" : "none";
    if (boundary && areaM2(boundary) > 25000 && others.some((o) => haversineKm(o.centroid, house.centroid) * 1000 < 40)) {
      // Huge mapped polygon swallowing neighbours — fall back to a house-based lot.
      boundary = null;
    }
    if (!boundary) {
      boundary = estimateLot(house, others);
      boundarySource = "estimated";
    }

    const lotM = Math.sqrt(areaM2(boundary));
    const onSite = buildings.filter((b) => {
      const d = haversineKm(b.centroid, house.centroid) * 1000;
      return b === house || contains(boundary!, b.centroid.lat, b.centroid.lng) || d < Math.max(28, lotM * 0.55);
    });

    return {
      house,
      buildings: onSite.slice(0, 10),
      boundary,
      boundarySource,
    };
  });
