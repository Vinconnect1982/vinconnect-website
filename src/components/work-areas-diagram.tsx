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
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <p className="text-sm font-medium text-fg">Work regions</p>
        <p className="text-xs text-muted">Cranbourne home base</p>
      </div>
      <svg
        viewBox="0 0 820 460"
        className="h-auto w-full"
        role="img"
        aria-label="VINCONNECT work regions from Cranbourne across the Peninsula, Bass Coast and Gippsland"
      >
        <rect width="820" height="460" fill="#0d181c" />
        <circle cx="338" cy="168" r="220" fill="#62dfc8" fillOpacity="0.08" />
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
              stroke="#62dfc8"
              strokeOpacity="0.7"
              strokeWidth="2"
            />
          );
        })}
        {NODES.map((n) => (
          <a key={n.slug} href={`/service-areas/region/${n.slug}`}>
            <g className="cursor-pointer">
              <circle
                cx={n.x}
                cy={n.y}
                r={n.home ? 14 : 10}
                fill={n.home ? "#62dfc8" : "#122026"}
                stroke="#62dfc8"
                strokeWidth="2.5"
              />
              <text
                x={n.x}
                y={n.y + 32}
                textAnchor="middle"
                fill="#eef3f4"
                fontFamily="Outfit, sans-serif"
                fontSize="15"
                fontWeight="600"
              >
                {n.label}
              </text>
            </g>
          </a>
        ))}
        <text
          x="338"
          y="204"
          textAnchor="middle"
          fill="#9aadb4"
          fontFamily="Source Sans 3, sans-serif"
          fontSize="12"
        >
          Cranbourne
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
