import { createServerFn } from "@tanstack/react-start";

export type AerialBox = {
  minLng: number;
  minLat: number;
  maxLng: number;
  maxLat: number;
  width: number;
  height: number;
};

function exportUrl(host: string, box: AerialBox, w: number, h: number) {
  const params = new URLSearchParams({
    bbox: `${box.minLng},${box.minLat},${box.maxLng},${box.maxLat}`,
    bboxSR: "4326",
    imageSR: "3857",
    size: `${w},${h}`,
    format: "jpg",
    f: "image",
  });
  return `${host}/ArcGIS/rest/services/World_Imagery/MapServer/export?${params}`;
}

const HOSTS = ["https://server.arcgisonline.com", "https://services.arcgisonline.com"];

export const fetchSiteAerial = createServerFn({ method: "POST" })
  .validator((input: AerialBox) => input)
  .handler(async ({ data }): Promise<{ dataUrl: string | null }> => {
    const aspect = data.width / Math.max(1, data.height);
    const long = 1024;
    const w = aspect >= 1 ? long : Math.max(256, Math.round(long * aspect));
    const h = aspect >= 1 ? Math.max(256, Math.round(long / aspect)) : long;

    for (const host of HOSTS) {
      try {
        const res = await fetch(exportUrl(host, data, w, h), {
          headers: { Accept: "image/jpeg" },
        });
        const type = res.headers.get("content-type") ?? "";
        if (!res.ok || !type.includes("image")) continue;
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.byteLength < 800) continue;
        return { dataUrl: `data:image/jpeg;base64,${buf.toString("base64")}` };
      } catch {
        /* try next host */
      }
    }
    return { dataUrl: null };
  });
