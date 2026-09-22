import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AREAS } from "@/lib/areas";
import { VICTORIA_LAND } from "@/components/victoria-land";

const MIN_LNG = 140.613616;
const MAX_LNG = 150.226679;
const MIN_LAT = -39.349986;
const MAX_LAT = -33.800648;
const COS = Math.cos((((MIN_LAT + MAX_LAT) / 2) * Math.PI) / 180);
const VB_W = 1100;
const SPAN_X = (MAX_LNG - MIN_LNG) * COS;
const SPAN_Y = MAX_LAT - MIN_LAT;
const VB_H = (VB_W * SPAN_Y) / SPAN_X;

function project(lng: number, lat: number) {
  return {
    x: ((lng - MIN_LNG) * COS / SPAN_X) * VB_W,
    y: ((MAX_LAT - lat) / SPAN_Y) * VB_H,
  };
}

function curve(slugs: string[], bend: number) {
  const pts = slugs.map((slug) => {
    const town = TOWNS[slug];
    return project(town.lng, town.lat);
  });
  let d = "";
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const ox = (-dy / len) * bend;
    const oy = (dx / len) * bend;
    d += `${i === 0 ? `M ${a.x.toFixed(1)} ${a.y.toFixed(1)}` : ""} Q ${(mx + ox).toFixed(1)} ${(my + oy).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)} `;
  }
  return d.trim();
}

const TOWNS: Record<string, { lng: number; lat: number; rank: "origin" | "hub" | "town" }> = {
  cranbourne: { lng: 145.283, lat: -38.106, rank: "origin" },
  frankston: { lng: 145.123, lat: -38.144, rank: "hub" },
  langwarrin: { lng: 145.187, lat: -38.154, rank: "town" },
  mornington: { lng: 145.038, lat: -38.218, rank: "hub" },
  "mount-martha": { lng: 145.018, lat: -38.267, rank: "town" },
  dromana: { lng: 144.965, lat: -38.338, rank: "town" },
  "safety-beach": { lng: 144.996, lat: -38.315, rank: "town" },
  "red-hill": { lng: 145.016, lat: -38.311, rank: "town" },
  rosebud: { lng: 144.907, lat: -38.366, rank: "town" },
  blairgowrie: { lng: 144.773, lat: -38.361, rank: "town" },
  sorrento: { lng: 144.741, lat: -38.338, rank: "hub" },
  clyde: { lng: 145.333, lat: -38.133, rank: "town" },
  "clyde-north": { lng: 145.339, lat: -38.11, rank: "town" },
  berwick: { lng: 145.348, lat: -38.033, rank: "town" },
  officer: { lng: 145.411, lat: -38.059, rank: "town" },
  pakenham: { lng: 145.484, lat: -38.077, rank: "hub" },
  tooradin: { lng: 145.38, lat: -38.215, rank: "town" },
  "koo-wee-rup": { lng: 145.49, lat: -38.198, rank: "town" },
  "lang-lang": { lng: 145.563, lat: -38.266, rank: "hub" },
  nyora: { lng: 145.672, lat: -38.336, rank: "hub" },
  poowong: { lng: 145.758, lat: -38.344, rank: "town" },
  korumburra: { lng: 145.823, lat: -38.432, rank: "hub" },
  leongatha: { lng: 145.947, lat: -38.477, rank: "hub" },
  bass: { lng: 145.57, lat: -38.483, rank: "town" },
  grantville: { lng: 145.535, lat: -38.409, rank: "town" },
  "san-remo": { lng: 145.366, lat: -38.527, rank: "town" },
  cowes: { lng: 145.239, lat: -38.451, rank: "hub" },
  wonthaggi: { lng: 145.591, lat: -38.605, rank: "hub" },
  inverloch: { lng: 145.727, lat: -38.633, rank: "town" },
  drouin: { lng: 145.858, lat: -38.136, rank: "town" },
  warragul: { lng: 145.931, lat: -38.159, rank: "hub" },
  trafalgar: { lng: 146.154, lat: -38.209, rank: "town" },
  yarragon: { lng: 146.061, lat: -38.204, rank: "town" },
  traralgon: { lng: 146.54, lat: -38.196, rank: "hub" },
};

const CORRIDORS: { id: string; slugs: string[]; bend: number }[] = [
  { id: "peninsula", slugs: ["cranbourne", "frankston", "mornington", "dromana", "sorrento"], bend: 10 },
  { id: "island", slugs: ["cranbourne", "koo-wee-rup", "lang-lang", "bass", "san-remo", "cowes"], bend: -12 },
  { id: "gipps", slugs: ["cranbourne", "nyora", "poowong", "korumburra", "leongatha"], bend: 14 },
  { id: "valley", slugs: ["cranbourne", "pakenham", "drouin", "warragul", "trafalgar", "traralgon"], bend: -8 },
  { id: "bass", slugs: ["lang-lang", "grantville", "wonthaggi", "inverloch"], bend: 10 },
];

const MAP_REGIONS: {
  id: string;
  label: string;
  short: string;
  at: [number, number];
  towns: string[];
  corridors: string[];
}[] = [
  {
    id: "se",
    label: "South East Melbourne",
    short: "South East",
    at: [145.05, -37.9],
    towns: ["cranbourne", "clyde", "clyde-north", "berwick", "officer", "langwarrin", "frankston"],
    corridors: ["peninsula", "valley"],
  },
  {
    id: "peninsula",
    label: "Mornington Peninsula",
    short: "Peninsula",
    at: [144.78, -38.08],
    towns: ["mornington", "mount-martha", "dromana", "safety-beach", "red-hill", "rosebud", "blairgowrie", "sorrento"],
    corridors: ["peninsula"],
  },
  {
    id: "western",
    label: "Western Port",
    short: "Western Port",
    at: [145.72, -38.05],
    towns: ["tooradin", "koo-wee-rup", "lang-lang"],
    corridors: ["island"],
  },
  {
    id: "gipps",
    label: "South Gippsland",
    short: "South Gippsland",
    at: [146.05, -38.62],
    towns: ["nyora", "poowong", "korumburra", "leongatha"],
    corridors: ["gipps"],
  },
  {
    id: "bass",
    label: "Bass Coast",
    short: "Bass Coast",
    at: [145.85, -38.78],
    towns: ["wonthaggi", "inverloch", "grantville", "bass"],
    corridors: ["bass"],
  },
  {
    id: "island",
    label: "Phillip Island",
    short: "Phillip Island",
    at: [145.05, -38.62],
    towns: ["san-remo", "cowes"],
    corridors: ["island"],
  },
  {
    id: "west",
    label: "West Gippsland",
    short: "West Gippsland",
    at: [145.95, -37.92],
    towns: ["pakenham", "drouin", "warragul", "trafalgar", "yarragon"],
    corridors: ["valley"],
  },
  {
    id: "latrobe",
    label: "Latrobe Valley",
    short: "Latrobe Valley",
    at: [146.55, -37.95],
    towns: ["traralgon"],
    corridors: ["valley"],
  },
];

const GROUPS: { title: string; slugs: string[] }[] = [
  { title: "South East Melbourne", slugs: ["cranbourne", "clyde", "clyde-north", "berwick", "pakenham", "officer", "langwarrin", "frankston"] },
  { title: "Mornington Peninsula", slugs: ["mornington", "mount-martha", "dromana", "safety-beach", "red-hill", "rosebud", "blairgowrie", "sorrento"] },
  { title: "Western Port & South Gippsland", slugs: ["tooradin", "koo-wee-rup", "lang-lang", "nyora", "poowong", "korumburra", "leongatha"] },
  { title: "Bass Coast & Phillip Island", slugs: ["wonthaggi", "inverloch", "grantville", "bass", "san-remo", "cowes"] },
  { title: "West Gippsland", slugs: ["pakenham", "drouin", "warragul", "trafalgar", "yarragon", "traralgon"] },
];

function areaName(slug: string) {
  return AREAS.find((a) => a.slug === slug)?.name ?? slug;
}

const DESKTOP_VIEW = "448 568 380 222";
const MOBILE_VIEW = "458 585 340 200";

const REGION_LABELS: { id: string; text: string; x: number; y: number }[] = [
  { id: "peninsula", text: "PENINSULA", x: 456, y: 600 },
  { id: "se", text: "SOUTH EAST", x: 508, y: 592 },
  { id: "western", text: "WESTERN PORT", x: 548, y: 652 },
  { id: "gipps", text: "SOUTH GIPPSLAND", x: 612, y: 702 },
  { id: "bass", text: "BASS COAST", x: 500, y: 712 },
  { id: "island", text: "PHILLIP ISLAND", x: 492, y: 678 },
  { id: "west", text: "WEST GIPPSLAND", x: 618, y: 596 },
  { id: "latrobe", text: "LATROBE", x: 688, y: 614 },
];
function useNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return narrow;
}

export function ServiceNetworkMap({
  kicker = "Our service area",
  heading = "Connecting South East Melbourne, the Peninsula, Bass Coast & Gippsland.",
  lede = "VINCONNECT is based in Cranbourne and provides Starlink installation, whole-property Wi-Fi, wireless links and CCTV across South East Melbourne, Western Port, Mornington Peninsula, Bass Coast and Gippsland, with regional work available by arrangement.",
  headingLevel = "h2",
  secondaryHref = "/service-areas",
  secondaryLabel = "View all service areas",
  showDirectory = true,
}: {
  kicker?: string;
  heading?: string;
  lede?: string;
  headingLevel?: "h1" | "h2";
  secondaryHref?: string;
  secondaryLabel?: string;
  showDirectory?: boolean;
} = {}) {
  const [active, setActive] = useState<string | null>(null);
  const narrow = useNarrow();
  const region = MAP_REGIONS.find((r) => r.id === active) ?? null;
  const paths = useMemo(
    () => CORRIDORS.map((c) => ({ ...c, d: curve(c.slugs, c.bend) })),
    [],
  );
  const lit = new Set(region?.corridors ?? []);
  const litTowns = new Set(region?.towns ?? []);

  return (
    <section className="relative overflow-hidden bg-[#05080a] text-fg" aria-labelledby="service-network-heading">
      <div className="lg:grid lg:min-h-[88vh] lg:grid-cols-[minmax(18rem,26rem)_minmax(0,1fr)]">
        <div className="relative z-10 px-4 pb-2 pt-14 sm:px-6 lg:flex lg:flex-col lg:justify-center lg:px-10 lg:py-16">
          <div className="max-w-xl">
            <p className="kicker">{kicker}</p>
            {headingLevel === "h1" ? (
              <h1 id="service-network-heading" className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
                {heading}
              </h1>
            ) : (
              <h2 id="service-network-heading" className="mt-3 font-display text-3xl tracking-tight sm:text-5xl">
                {heading}
              </h2>
            )}
            <p className="mt-4 max-w-lg text-sm text-muted sm:text-base">{lede}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button asChild>
                <Link to="/estimate">Check My Install Price</Link>
              </Button>
              {secondaryHref.startsWith("#") ? (
                <a href={secondaryHref} className="text-sm text-mint">
                  {secondaryLabel}
                </a>
              ) : (
                <Link to={secondaryHref} className="text-sm text-mint">
                  {secondaryLabel}
                </Link>
              )}
            </div>
            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Service corridors">
              {MAP_REGIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`min-h-11 rounded-full px-3 text-sm ${
                    active === item.id ? "text-mint" : "text-muted hover:text-fg"
                  }`}
                  aria-pressed={active === item.id}
                  onMouseEnter={() => setActive(item.id)}
                  onFocus={() => setActive(item.id)}
                  onClick={() => setActive((current) => (current === item.id ? null : item.id))}
                >
                  {item.short}
                </button>
              ))}
            </div>
            {region && (
              <div className="mt-3 max-w-lg">
                <p className="text-xs uppercase tracking-[0.16em] text-mint">{region.label}</p>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {region.towns.map((slug) => (
                    <li key={slug}>
                      <Link to="/service-areas/$slug" params={{ slug }} className="text-sm text-fg">
                        {areaName(slug)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <svg
          viewBox={narrow ? MOBILE_VIEW : DESKTOP_VIEW}
          preserveAspectRatio="xMidYMid meet"
          className="block h-[64vh] w-full bg-[#05080a] lg:h-full lg:min-h-[88vh]"
          role="img"
          aria-label="Victoria service network. Cranbourne is the origin, with corridors to the Peninsula, Western Port, South Gippsland, Bass Coast and the Latrobe Valley."
        >
          <defs>
            <filter id="vc-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id="vc-land">
              <path d={VICTORIA_LAND} />
            </clipPath>
          </defs>
          <rect width={VB_W} height={VB_H} fill="#05080a" />
          <g clipPath="url(#vc-land)" opacity="0.55">
            {[180, 280, 390, 500, 610, 720].map((y) => (
              <path
                key={y}
                d={`M0 ${y} Q 280 ${y - 18} 560 ${y + 8} T 1100 ${y - 6}`}
                fill="none"
                stroke="#294047"
                strokeWidth="0.7"
              />
            ))}
          </g>
          <path d={VICTORIA_LAND} fill="#121c22" stroke="#294047" strokeWidth="0.8" />
          {paths.map((path) => {
            const on = !region || lit.has(path.id);
            return (
              <path
                key={path.id}
                d={path.d}
                fill="none"
                stroke="#62dfc8"
                strokeWidth={on && region ? 1.7 : 0.85}
                strokeLinecap="round"
                opacity={on ? 0.72 : 0.16}
                filter="url(#vc-glow)"
              />
            );
          })}
          {Object.entries(TOWNS).map(([slug, town]) => {
            const p = project(town.lng, town.lat);
            const on = !region || litTowns.has(slug) || slug === "cranbourne";
            const r = town.rank === "origin" ? 3.1 : town.rank === "hub" ? 2.1 : 1.35;
            const showName = slug === "cranbourne" || Boolean(region && litTowns.has(slug) && !narrow);
            return (
              <a key={slug} href={`/service-areas/${slug}`} aria-label={areaName(slug)}>
                {town.rank === "origin" && (
                  <circle className="hub-ring" cx={p.x} cy={p.y} r="7.5" fill="none" stroke="#62dfc8" strokeWidth="0.6" />
                )}
                <circle cx={p.x} cy={p.y} r={r} fill={on ? "#62dfc8" : "#3d555c"} />
                {showName && (
                  <text
                    x={p.x + 5}
                    y={p.y - 4}
                    fill="#eef3f4"
                    fontSize="4.6"
                    fontFamily="Outfit, sans-serif"
                  >
                    {areaName(slug)}
                  </text>
                )}
              </a>
            );
          })}
          {!narrow &&
            REGION_LABELS.map((item) => (
            <text
              key={item.id}
              x={item.x}
              y={item.y}
              fill={active === item.id ? "#62dfc8" : "#8ea3aa"}
              fontSize="4.4"
              letterSpacing="1.1"
              fontFamily="Outfit, sans-serif"
            >
              {item.text}
            </text>
          ))}
        </svg>
      </div>

      {showDirectory && (
      <div className="relative mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <details className="group border-t border-line pt-4">
          <summary className="cursor-pointer list-none font-display text-lg">
            Explore service areas
          </summary>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {GROUPS.map((group) => (
              <div key={group.title}>
                <p className="text-xs uppercase tracking-[0.16em] text-mint">{group.title}</p>
                <ul className="mt-3 space-y-1.5">
                  {group.slugs.map((slug) => (
                    <li key={`${group.title}-${slug}`}>
                      <Link to="/service-areas/$slug" params={{ slug }} className="text-sm text-fg">
                        {areaName(slug)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>
      )}
    </section>
  );
}
