import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { fetchSiteAerial } from "@/lib/site-aerial";
import type { PropertyTrace, Ring } from "@/lib/site-trace";

export type SketchPlace = {
  id: number;
  label: string;
  kind: string;
  lat: number;
  lng: number;
};

type Props = {
  origin: { lat: number; lng: number } | null;
  trace: PropertyTrace | null;
  places: SketchPlace[];
  sourceId: number | null;
  selectedId: number | null;
  placing: boolean;
  onPickGround: (lat: number, lng: number) => void;
  onSelectPlace: (id: number) => void;
  onImageryStatus?: (status: "loaded" | "failed") => void;
};

type XY = { x: number; y: number };

type Box = { minX: number; minY: number; width: number; height: number };

function toXY(lat: number, lng: number, origin: { lat: number; lng: number }): XY {
  const mLat = 111320;
  const mLng = 111320 * Math.cos((origin.lat * Math.PI) / 180);
  return { x: (lng - origin.lng) * mLng, y: -(lat - origin.lat) * mLat };
}

function fromXY(x: number, y: number, origin: { lat: number; lng: number }) {
  const mLat = 111320;
  const mLng = 111320 * Math.cos((origin.lat * Math.PI) / 180);
  return { lat: origin.lat - y / mLat, lng: origin.lng + x / mLng };
}

function ringXY(ring: Ring, origin: { lat: number; lng: number }): XY[] {
  const pts = ring.map(([lat, lng]) => toXY(lat, lng, origin));
  if (pts.length > 1) {
    const a = pts[0];
    const b = pts[pts.length - 1];
    if (a.x === b.x && a.y === b.y) pts.pop();
  }
  return pts;
}

function pathD(pts: XY[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ") + " Z";
}

function centroidXY(pts: XY[]): XY {
  const n = Math.max(1, pts.length);
  return {
    x: pts.reduce((s, p) => s + p.x, 0) / n,
    y: pts.reduce((s, p) => s + p.y, 0) / n,
  };
}

function longAxis(pts: XY[]) {
  let best = { i: 0, j: 1, d: 0 };
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(pts[j].x - pts[i].x, pts[j].y - pts[i].y);
      if (d > best.d) best = { i, j, d };
    }
  }
  const a = pts[best.i];
  const b = pts[best.j];
  const len = Math.max(1, best.d);
  return { ux: (b.x - a.x) / len, uy: (b.y - a.y) / len, len };
}

function roofLines(foot: XY[]): XY[][] {
  if (foot.length < 3) return [];
  const axis = longAxis(foot);
  const c = centroidXY(foot);
  const ts = foot.map((p) => (p.x - c.x) * axis.ux + (p.y - c.y) * axis.uy);
  const tMin = Math.min(...ts);
  const tMax = Math.max(...ts);
  const inset = (tMax - tMin) * 0.08;
  const lines: XY[][] = [
    [
      { x: c.x + (tMin + inset) * axis.ux, y: c.y + (tMin + inset) * axis.uy },
      { x: c.x + (tMax - inset) * axis.ux, y: c.y + (tMax - inset) * axis.uy },
    ],
  ];
  const vx = -axis.uy;
  const vy = axis.ux;
  const us = foot.map((p) => (p.x - c.x) * vx + (p.y - c.y) * vy);
  const spread = Math.max(...us) - Math.min(...us);
  if (axis.len / Math.max(8, spread) < 1.75) {
    const uMin = Math.min(...us);
    const uMax = Math.max(...us);
    lines.push([
      { x: c.x + (uMin + 1.2) * vx, y: c.y + (uMin + 1.2) * vy },
      { x: c.x + (uMax - 1.2) * vx, y: c.y + (uMax - 1.2) * vy },
    ]);
  } else {
    const hips = foot.map((p) => {
      const t = (p.x - c.x) * axis.ux + (p.y - c.y) * axis.uy;
      const along = t < (tMin + tMax) / 2 ? tMin + inset : tMax - inset;
      return [p, { x: c.x + along * axis.ux, y: c.y + along * axis.uy }] as XY[];
    });
    const short = hips
      .map((ln) => ({ ln, d: Math.hypot(ln[1].x - ln[0].x, ln[1].y - ln[0].y) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const h of short) lines.push(h.ln);
  }
  return lines;
}

function geoBox(origin: { lat: number; lng: number }, box: Box) {
  const mLat = 111320;
  const mLng = 111320 * Math.cos((origin.lat * Math.PI) / 180);
  return {
    minLng: Number((origin.lng + box.minX / mLng).toFixed(6)),
    maxLng: Number((origin.lng + (box.minX + box.width) / mLng).toFixed(6)),
    maxLat: Number((origin.lat - box.minY / mLat).toFixed(6)),
    minLat: Number((origin.lat - (box.minY + box.height) / mLat).toFixed(6)),
    width: box.width,
    height: box.height,
  };
}

export function SiteSketch({
  origin,
  trace,
  places,
  sourceId,
  selectedId,
  placing,
  onPickGround,
  onSelectPlace,
  onImageryStatus,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const onImageryStatusRef = useRef(onImageryStatus);
  onImageryStatusRef.current = onImageryStatus;
  const [aerial, setAerial] = useState<string | null>(null);
  const [aerialFailed, setAerialFailed] = useState(false);

  const layout = useMemo(() => {
    if (!origin) return null;
    const pts: XY[] = [toXY(origin.lat, origin.lng, origin)];
    if (trace?.boundary) for (const pt of trace.boundary) pts.push(toXY(pt[0], pt[1], origin));
    const buildings = (trace?.buildings ?? []).map((b) => {
      const foot = ringXY(b.ring, origin);
      return { foot, ridge: roofLines(foot), isHouse: b === trace?.house };
    });
    for (const b of buildings) pts.push(...b.foot);
    for (const p of places) pts.push(toXY(p.lat, p.lng, origin));
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const p of pts) {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    }
    const span = Math.max(24, maxX - minX, maxY - minY);
    const pad = span * 0.1;
    const box: Box = {
      minX: minX - pad,
      minY: minY - pad,
      width: maxX - minX + pad * 2,
      height: maxY - minY + pad * 2,
    };
    return {
      buildings,
      boundary: trace?.boundary ? ringXY(trace.boundary, origin) : null,
      ...box,
      geo: geoBox(origin, box),
    };
  }, [origin, trace, places]);

  useEffect(() => {
    if (!layout) return;
    let cancelled = false;
    const t = window.setTimeout(() => {
      fetchSiteAerial({ data: layout.geo })
        .then((res) => {
          if (!cancelled) {
            setAerial(res.dataUrl);
            setAerialFailed(false);
            onImageryStatusRef.current?.(res.dataUrl ? "loaded" : "failed");
          }
        })
        .catch(() => {
          if (!cancelled) {
            setAerial(null);
            setAerialFailed(true);
            onImageryStatusRef.current?.("failed");
          }
        });
    }, 180);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [layout?.geo.minLat, layout?.geo.minLng, layout?.geo.maxLat, layout?.geo.maxLng]);

  function onSvgClick(e: MouseEvent<SVGSVGElement>) {
    if (!origin || !layout || !svgRef.current) return;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const loc = pt.matrixTransform(ctm.inverse());
    const target = e.target as SVGElement;
    const placeId = target.closest("[data-place]")?.getAttribute("data-place");
    if (placeId) {
      onSelectPlace(Number(placeId));
      return;
    }
    if (placing || places.length === 0) {
      const ll = fromXY(loc.x, loc.y, origin);
      onPickGround(ll.lat, ll.lng);
    }
  }

  if (!origin || !layout) return null;
  const originNow = origin;
  const sheet = layout;

  return (
    <div className="relative h-full min-h-80 w-full overflow-hidden bg-paper">
      {aerial && (
        <img src={aerial} alt="" className="planner-sat-watermark" decoding="async" />
      )}
      {aerialFailed && !aerial && (
        <p className="absolute left-3 top-3 z-[3] max-w-xs bg-paper/95 px-3 py-2 text-sm text-ink-fg">
          Map not working? Use sketch planner. Drop the house and buildings on this plan.
        </p>
      )}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-paper/20" />

      <svg
        ref={svgRef}
        viewBox={`${sheet.minX} ${sheet.minY} ${sheet.width} ${sheet.height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 z-[2] h-full w-full"
        role="img"
        aria-label="Mud map of the property"
        onClick={onSvgClick}
        style={{ cursor: placing || places.length === 0 ? "crosshair" : "default" }}
      >
        {sheet.boundary && (
          <path
            d={pathD(sheet.boundary)}
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth={1}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        )}
        {sheet.buildings.map((b, i) => (
          <g key={i}>
            <path
              d={pathD(b.foot)}
              fill="var(--color-paper-2)"
              fillOpacity={0.35}
              stroke="var(--color-ink)"
              strokeWidth={0.6}
              strokeLinejoin="miter"
              vectorEffect="non-scaling-stroke"
            />
            {b.ridge.map((ln, ri) => (
              <line
                key={ri}
                x1={ln[0].x}
                y1={ln[0].y}
                x2={ln[1].x}
                y2={ln[1].y}
                stroke="var(--color-ink)"
                strokeWidth={0.5}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        ))}
        {places.map((p) => {
          const pt = toXY(p.lat, p.lng, originNow);
          const hot = p.id === selectedId || p.id === sourceId;
          return (
            <circle
              key={p.id}
              data-place={p.id}
              cx={pt.x}
              cy={pt.y}
              r={hot ? 1.15 : 0.9}
              fill="var(--color-ink)"
              className="cursor-pointer"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
    </div>
  );
}
