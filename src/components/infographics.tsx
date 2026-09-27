import { cn } from "@/lib/utils";

const box = "border border-line/80 bg-transparent p-5 sm:p-6";

export function InstallStepsGraphic({ className }: { className?: string }) {
  const steps = [
    { n: "01", t: "Sky view", d: "We pick a mount the roof, wind and lease can live with." },
    { n: "02", t: "Cable route", d: "Clipped and visible unless conduit was quoted." },
    { n: "03", t: "One entry", d: "One sealed penetration and a brush plate inside." },
    { n: "04", t: "Router wall", d: "On the backing wall, near power — not in a hot cupboard." },
    { n: "05", t: "Handover", d: "Working service, isolation, and who to call for what." },
  ];
  return (
    <figure className={cn(box, className)}>
      <p className="kicker">Standard Starlink install</p>
      <h3 className="mt-2 font-display text-2xl">What $300 labour actually covers.</h3>
      <ol className="mt-6 grid gap-3 sm:grid-cols-5">
        {steps.map((s) => (
          <li key={s.n} className="rounded-lg border border-line bg-ink px-3 py-4">
            <p className="font-display text-mint">{s.n}</p>
            <p className="mt-2 font-display text-lg">{s.t}</p>
            <p className="mt-1 text-sm text-muted">{s.d}</p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-xs text-muted">
        Hardware, the Starlink plan, a mount, internal walls, a data cabinet, double storey, Saturday and travel are extra.
      </figcaption>
    </figure>
  );
}

export function NetworkStackGraphic({ className }: { className?: string }) {
  const layers = [
    { t: "Internet", d: "Starlink or NBN arriving at one building." },
    { t: "Cabinet / router", d: "A labelled, ventilated place the kit can live." },
    { t: "House Wi-Fi", d: "Rooms, verandah and the office you actually use." },
    { t: "Building links", d: "Shed, stable, gate hut — radio, not hope." },
    { t: "Cameras", d: "Views that sit on the network, not a separate mess." },
  ];
  return (
    <figure className={cn(box, className)}>
      <p className="kicker">Property network</p>
      <h3 className="mt-2 font-display text-2xl">The dish is the front door. The rest is the house.</h3>
      <ol className="mt-6 space-y-2">
        {layers.map((l, i) => (
          <li
            key={l.t}
            className="flex items-start gap-4 rounded-lg border border-line px-4 py-3"
            style={{ marginLeft: `${i * 8}px` }}
          >
            <span className="font-display text-mint">{String(i + 1).padStart(2, "0")}</span>
            <span>
              <span className="font-display text-lg">{l.t}</span>
              <span className="mt-1 block text-sm text-muted">{l.d}</span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function PricePathGraphic({ className }: { className?: string }) {
  return (
    <figure className={cn(box, className)}>
      <p className="kicker">How the number is built</p>
      <h3 className="mt-2 font-display text-2xl">Enter the address. We do the rest.</h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { t: "Local labour", d: "Standard Starlink install is $300. Weekday, down an external wall to a wall plate." },
          { t: "Your property", d: "Double storey adds $250. The mount follows the roof. Internal walls start at $150. A data cabinet is $120." },
          { t: "Your address", d: "Travel is added from the address. You do not work out the kilometres." },
        ].map((c) => (
          <div key={c.t} className="rounded-lg border border-line bg-ink px-4 py-4">
            <p className="font-display text-lg text-mint">{c.t}</p>
            <p className="mt-2 text-sm text-muted">{c.d}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}

export function DiyVsProGraphic({ className }: { className?: string }) {
  return (
    <figure className={cn(box, className)}>
      <p className="kicker">DIY versus installed</p>
      <h3 className="mt-2 font-display text-2xl">The carton is designed for a weekend. Victorian roofs are not.</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-line px-4 py-4">
          <p className="font-display text-lg">Typical DIY pain</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
            <li>Hole through the tile with no brush plate</li>
            <li>Router in a closed cabinet that cooks in summer</li>
            <li>Cable flapping on Colorbond</li>
            <li>Tripod sitting on tiles with no ballast plan</li>
          </ul>
        </div>
        <div className="rounded-lg border border-mint/40 bg-ink px-4 py-4">
          <p className="font-display text-lg text-mint">What we actually do</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
            <li>Mount chosen for the roof, not the first accessory in the box</li>
            <li>One sealed entry and a visible clipped run</li>
            <li>Router on the backing wall, near power</li>
            <li>Handover so you can isolate it without ringing us</li>
          </ul>
        </div>
      </div>
    </figure>
  );
}

export function FunnelGraphic({ className }: { className?: string }) {
  const steps = [
    { n: "1", t: "Check the price", d: "Address in, quote out. Standard Starlink install $300, then travel and extras." },
    { n: "2", t: "Send photos", d: "Roof, intended mount wall and the router room." },
    { n: "3", t: "Confirm the scope", d: "We write what is included before anyone books a day." },
    { n: "4", t: "Install & handover", d: "Working service, isolation, and a record of the job." },
  ];
  return (
    <figure className={cn(box, className)}>
      <p className="kicker">How a job starts</p>
      <h3 className="mt-2 font-display text-2xl">Four steps. One number to call.</h3>
      <ol className="mt-6 grid gap-3 sm:grid-cols-4">
        {steps.map((s) => (
          <li key={s.n} className="rounded-lg border border-line bg-ink px-4 py-4">
            <p className="font-display text-3xl text-mint">{s.n}</p>
            <p className="mt-2 font-display text-lg">{s.t}</p>
            <p className="mt-1 text-sm text-muted">{s.d}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function InfographicPhoto({ src, title, caption }: { src: string; title: string; caption: string }) {
  return (
    <figure className={cn(box, "overflow-hidden p-0")}>
      <img src={src} alt={title} className="w-full object-cover" loading="lazy" decoding="async" />
      <figcaption className="px-5 py-4 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

export function MountsGraphic({ className }: { className?: string }) {
  return (
    <div className={className}>
      <InfographicPhoto
        src="/visuals/mount-types.webp"
        title="Five ways a dish sits on a Victorian roof"
        caption="Tile, Colorbond fascia, Astrogear tripod, wall/gable and pole. The building decides — not the first accessory in the carton."
      />
    </div>
  );
}

export function CompareGraphic({ className }: { className?: string }) {
  return (
    <div className={className}>
      <InfographicPhoto
        src="/visuals/local-300.webp"
        title="Local Starlink labour is $300"
        caption="Typical Melbourne installer ads sit around $390–$549. VINCONNECT local labour is $300 for the published standard scope. Hardware and the monthly plan stay with Starlink."
      />
    </div>
  );
}

export function DoorsGraphic({ className }: { className?: string }) {
  return (
    <div className={className}>
      <InfographicPhoto
        src="/visuals/three-doors.webp"
        title="Three ways in"
        caption="Direct jobs use Check My Install Price. Circl-allocated visits use the Circl hub. Already booked? Customer help and the install terms."
      />
    </div>
  );
}

export function ArticleVisual({ name }: { name: NonNullable<import("@/lib/pages/types").Article["visual"]> }) {
  switch (name) {
    case "install-steps":
      return <InstallStepsGraphic className="mt-10" />;
    case "network-stack":
      return (
        <div className="mt-10 space-y-6">
          <InfographicPhoto
            src="/visuals/network-stack.webp"
            title="The dish is the front door"
            caption="Internet to one building, then cabinet, house Wi-Fi, a wireless link and cameras. Each hop is specified."
          />
          <NetworkStackGraphic />
        </div>
      );
    case "price-path":
      return (
        <div className="mt-10 space-y-6">
          <CompareGraphic />
          <PricePathGraphic />
        </div>
      );
    case "diy-vs-pro":
      return <DiyVsProGraphic className="mt-10" />;
    case "funnel":
      return (
        <div className="mt-10 space-y-6">
          <DoorsGraphic />
          <FunnelGraphic />
        </div>
      );
    case "mounts":
      return <MountsGraphic className="mt-10" />;
    case "compare":
      return <CompareGraphic className="mt-10" />;
    case "doors":
      return <DoorsGraphic className="mt-10" />;
    default:
      return null;
  }
}
