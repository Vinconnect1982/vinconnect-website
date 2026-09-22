import { createServerFn } from "@tanstack/react-start";

export type AddressHit = {
  address: string;
  lat: number;
  lng: number;
  suburb: string;
  postcode: string;
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
    const res = await fetch(`https://photon.komoot.io/api/?${params}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("Address search is temporarily unavailable.");
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
  });
