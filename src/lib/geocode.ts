import { createServerFn } from "@tanstack/react-start";

export type AddressHit = {
  address: string;
  lat: number;
  lng: number;
  suburb: string;
  postcode: string;
  located: boolean;
};

type PhotonFeature = {
  geometry?: { coordinates?: [number, number] };
  properties?: {
    name?: string;
    housenumber?: string;
    street?: string;
    district?: string;
    city?: string;
    suburb?: string;
    town?: string;
    state?: string;
    postcode?: string;
    country?: string;
    countrycode?: string;
  };
};

export function manualVictorianAddress(q: string): AddressHit | null {
  const address = q.trim().replace(/\s+/g, " ");
  if (address.length < 8) return null;
  const postcode = address.match(/\b(3\d{3})\b/);
  const vic = /\bvic(?:toria)?\b/i.test(address) || Boolean(postcode);
  if (!vic) return null;
  const suburb = address
    .split(",")
    .slice(1)
    .join(" ")
    .replace(/\b(victoria|vic|australia|\d{4})\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  return {
    address,
    lat: 0,
    lng: 0,
    suburb,
    postcode: postcode?.[1] ?? "",
    located: false,
  };
}

function formatPhoton(f: PhotonFeature): AddressHit | null {
  const p = f.properties ?? {};
  const coords = f.geometry?.coordinates;
  if (!coords || coords.length < 2) return null;
  if (p.countrycode && p.countrycode.toUpperCase() !== "AU") return null;
  const line = [
    [p.housenumber, p.street || p.name].filter(Boolean).join(" "),
    p.district || p.suburb || p.town,
    p.city,
    p.state,
    p.postcode,
    p.country || "Australia",
  ]
    .filter(Boolean)
    .join(", ");
  if (!line) return null;
  return {
    address: line,
    lat: coords[1],
    lng: coords[0],
    suburb: p.district || p.suburb || p.town || p.city || "",
    postcode: p.postcode || "",
    located: true,
  };
}

export const searchAddresses = createServerFn({ method: "POST" })
  .validator((input: { q: string }) => input)
  .handler(async ({ data }): Promise<AddressHit[]> => {
    const q = data.q.trim();
    if (q.length < 3) return [];

    const params = new URLSearchParams({
      q,
      limit: "8",
      lang: "en",
      lat: "-38.106",
      lon: "145.283",
    });
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    try {
      const res = await fetch(`https://photon.komoot.io/api/?${params}`, {
        headers: { Accept: "application/json" },
        signal: ctrl.signal,
      });
      if (!res.ok) throw new Error("unavailable");
      const body = (await res.json()) as { features?: PhotonFeature[] };
      const hits = (body.features ?? [])
        .map(formatPhoton)
        .filter((h): h is AddressHit => Boolean(h));
      const seen = new Set<string>();
      return hits.filter((h) => {
        if (seen.has(h.address)) return false;
        seen.add(h.address);
        return true;
      });
    } catch {
      throw new Error("Address suggestions are unavailable. You can still use a full Victorian address.");
    } finally {
      clearTimeout(timer);
    }
  });
