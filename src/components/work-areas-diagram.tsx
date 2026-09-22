import { Link } from "@tanstack/react-router";
import { REGIONS } from "@/lib/areas";

const NODES = [
  { slug: "inner-south-east", x: 310, y: 58, label: "Inner SE", home: false },
  { slug: "casey-south-east", x: 338, y: 168, label: "Casey", home: true },
  { slug: "cardinia", x: 470, y: 148, label: "Cardinia", home: false },
  { slug: "mornington-peninsula", x: 168, y: 248, label: "Peninsula", home: false },
  { slug: "western-port-bass-coast", x: 360, y: 368, label: "Bass Coast", home: false },
  { slug: "south-gippsland", x: 545, y: 318, label: "South Gippsland", home: false },
  { slug: "west-gippsland-latrobe", x: 680, y: 188, label: "West Gippsland", home: false },
] as const;

const EDGES: [string, string][] = [
  ["inner-south-east", "casey-south-east"],
  ["casey-south-east", "cardinia"],
  ["casey-south-east", "mornington-peninsula"],
  ["casey-south-east", "western-port-bass-coast"],
  ["cardinia", "west-gippsland-latrobe"],
  ["cardinia", "south-gippsland"],
  ["western-port-bass-coast", "south-gippsland"],
  ["south-gippsland", "west-gippsland-latrobe"],
];

function node(slug: string) {
  return NODES.find((n) => n.slug === slug)!;
}

export function WorkAreasDiagram() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink-2">
      <svg
        viewBox="0 0 820 460"
        className="h-auto w-full text-mint"
        role="img"
        aria-label="VINCONNECT work regions from Cranbourne across the Peninsula, Bass Coast and Gippsland"
      >
        <defs>
          <radialGradient id="glow" cx="42%" cy="38%" r="55%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="820" height="460" className="fill-ink-2" />
        <circle cx="338" cy="168" r="220" fill="url(#glow)" />
        {EDGES.map(([a, b]) => {
          const from = node(a);
          const to = node(b);
          return (
            <line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className="stroke-mint"
              strokeOpacity="0.35"
              strokeWidth="1.5"
            />
          );
        })}
        {NODES.map((n) => (
          <a key={n.slug} href={`/service-areas/region/${n.slug}`}>
            <g className="cursor-pointer">
              <circle
                cx={n.x}
                cy={n.y}
                r={n.home ? 11 : 8}
                className={n.home ? "fill-mint stroke-mint" : "fill-surface stroke-mint"}
                strokeWidth="2"
              />
              <text
                x={n.x}
                y={n.y + 26}
                textAnchor="middle"
                className="fill-fg"
                fontFamily="Outfit, sans-serif"
                fontSize="13"
                fontWeight="600"
              >
                {n.label}
              </text>
            </g>
          </a>
        ))}
        <text
          x="338"
          y="198"
          textAnchor="middle"
          className="fill-muted"
          fontFamily="Source Sans 3, sans-serif"
          fontSize="11"
        >
          Cranbourne home base
        </text>
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-line px-4 py-3 text-xs text-muted">
        {REGIONS.map((r) => (
          <Link
            key={r.slug}
            to="/service-areas/region/$slug"
            params={{ slug: r.slug }}
            className="hover:text-mint"
          >
            {r.short}
          </Link>
        ))}
      </div>
    </div>
  );
}
