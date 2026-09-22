import { useEffect, useRef } from "react";
import { AREAS, REGIONS } from "@/lib/areas";

const REGION_COLOUR: Record<string, string> = {
  "casey-south-east": "#0d7a6e",
  cardinia: "#1f6f8b",
  "mornington-peninsula": "#2f5d8a",
  "western-port-bass-coast": "#0d7a6e",
  "south-gippsland": "#1f6f8b",
  "west-gippsland-latrobe": "#2f5d8a",
  "inner-south-east": "#5a6b70",
};

const REGION_RADIUS: Record<string, number> = {
  "casey-south-east": 12000,
  cardinia: 18000,
  "mornington-peninsula": 22000,
  "western-port-bass-coast": 28000,
  "south-gippsland": 22000,
  "west-gippsland-latrobe": 32000,
  "inner-south-east": 14000,
};

export function CoverageMap({
  focus,
  height = 420,
}: {
  focus?: { lat: number; lng: number; zoom?: number };
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let map: { remove: () => void; invalidateSize: () => void } | null = null;
    let cancelled = false;
    let ro: ResizeObserver | null = null;

    void (async () => {
      const L = await import("leaflet");
      if (cancelled || !el) return;
      const centre = focus ?? { lat: -38.28, lng: 145.45, zoom: 8 };
      const instance = L.map(el, { scrollWheelZoom: false, attributionControl: true }).setView(
        [centre.lat, centre.lng],
        centre.zoom ?? 8,
      );
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap &copy; CARTO",
        subdomains: "abcd",
        maxZoom: 18,
      }).addTo(instance);

      for (const region of REGIONS) {
        const colour = REGION_COLOUR[region.slug] ?? "#0d7a6e";
        L.circle([region.lat, region.lng], {
          radius: REGION_RADIUS[region.slug] ?? 16000,
          color: colour,
          weight: 2,
          fillColor: colour,
          fillOpacity: 0.18,
        }).addTo(instance);
      }

      for (const area of AREAS) {
        const colour = REGION_COLOUR[area.region] ?? "#0d7a6e";
        const marker = L.circleMarker([area.lat, area.lng], {
          radius: 7,
          color: "#071112",
          weight: 1,
          fillColor: colour,
          fillOpacity: 1,
        }).addTo(instance);
        marker.bindTooltip(area.name, { direction: "top", offset: [0, -8] });
        marker.bindPopup(
          `<a href="/service-areas/${area.slug}" style="color:#0d7a6e;font-weight:600">${area.name}</a><br/><span style="color:#52636b">${area.postcode} · Starlink, Wi-Fi, CCTV</span>`,
        );
      }
      map = instance;
      const resize = () => instance.invalidateSize();
      requestAnimationFrame(resize);
      setTimeout(resize, 250);
      ro = new ResizeObserver(resize);
      ro.observe(el);
    })();

    return () => {
      cancelled = true;
      ro?.disconnect();
      map?.remove();
    };
  }, [focus?.lat, focus?.lng, focus?.zoom]);

  return (
    <div className="coverage-map overflow-hidden rounded-xl border border-line bg-paper">
      <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5">
        <p className="text-sm font-medium text-fg">Work areas map</p>
        <p className="text-xs text-muted">Click a suburb</p>
      </div>
      <div ref={ref} style={{ height }} className="w-full bg-paper-2" />
      <div className="flex flex-wrap gap-3 border-t border-line bg-surface px-4 py-3 text-xs text-muted">
        {REGIONS.map((r) => (
          <span key={r.slug} className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ background: REGION_COLOUR[r.slug] }} />
            {r.short}
          </span>
        ))}
      </div>
    </div>
  );
}
