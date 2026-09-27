import type { Article } from "./types";
import { DEFAULT_CTA, DISCUSS_CTA, PLAN_CTA } from "./types";

const crumbs = (label: string): Article["crumbs"] => [
  { label: "Guides", href: "/resources" },
  { label },
];

function page(partial: Omit<Article, "cluster" | "form"> & { cta?: Article["cta"] }): Article {
  return {
    cluster: "resources",
    form: {
      type: "contact",
      package: partial.title,
      button: "Ask VINCONNECT",
      messageLabel: "Property and what you need connected",
    },
    ...partial,
    status: partial.status ?? "Illustrative example. Not a completed VINCONNECT installation.",
    cta: partial.cta ?? DEFAULT_CTA,
  };
}

export const LIBRARY: Article[] = [
  page({
    path: "/resources/wifi-into-a-shed",
    slug: "wifi-into-a-shed",
    kicker: "Property Wi-Fi",
    title: "How to get Wi-Fi into a shed",
    lede: "House Wi-Fi dies at a Colorbond wall. Distance and metal are the problem. The fix is a proper path to the shed, then coverage inside it.",
    description:
      "How to get reliable Wi-Fi into an Australian shed or workshop: when mesh fails, and when a wireless bridge is the right job.",
    image: "/guides/vinconnect-wifi-to-shed.webp",
    imageAlt: "Illustrative view of a rural Victorian house linked to a Colorbond shed.",
    cta: PLAN_CTA,
    sections: [
      {
        heading: "Why the house signal stops",
        copy: [
          "A metal shed is a poor place for a Wi-Fi signal to enter. Colorbond, distance and whatever sits between the house and the shed all take a cut. A mesh node in the shed only helps if it can still hear the house. Past the clothesline, it often cannot.",
          "A fast internet service at the house does not change that. The dish or the NBN connection can be fine while the workshop still has nothing usable.",
        ],
      },
      {
        heading: "What actually works",
        copy: [
          "Short distances with a clear path can use an outdoor access point or a cabled run. Once the shed is far enough that ordinary Wi-Fi fades, a dedicated point-to-point link carries the network across, and an access point inside the shed covers the people and the tools.",
          "Mesh is the right tool inside a large house. It is the wrong tool when the second building is a steel box across a paddock. If you are choosing between the two, read mesh or a wireless bridge.",
        ],
      },
      {
        heading: "What to tell us",
        copy: [
          "The useful facts are the distance, whether you can see the shed from the house, whether the shed has power, and what has to work there: a laptop, a camera, a gate controller, or all three. The property planner is there so those points are marked before anyone buys radios.",
        ],
        list: [
          "House to shed distance",
          "Power at the shed",
          "Clear view, or trees in the way",
          "Cameras or only Wi-Fi",
        ],
      },
    ],
    faqs: [
      {
        q: "Will another mesh node in the shed fix it?",
        a: "Only if that node still gets a strong signal from the house. In a metal shed at a real distance, it usually does not.",
      },
    ],
    related: [
      { href: "/services/wireless-links", label: "Building-to-building links", copy: "The install, not the theory." },
      { href: "/resources/mesh-vs-wireless-bridge", label: "Mesh or a wireless bridge?" },
      { href: "/projects/pearcedale-five-acre-property", label: "Pearcedale acreage", copy: "A real job that reached the shed." },
      { href: "/property-planner", label: "Plan my property" },
    ],
  }),
  page({
    path: "/resources/mesh-vs-wireless-bridge",
    slug: "mesh-vs-wireless-bridge",
    kicker: "Property Wi-Fi",
    title: "Mesh or a wireless bridge?",
    lede: "Mesh spreads Wi-Fi through one building. A wireless bridge carries the network to another building. They are not interchangeable.",
    description:
      "When a Victorian property needs mesh Wi-Fi, and when it needs a point-to-point wireless bridge to a shed, stable or office.",
    image: "/guides/vinconnect-mesh-vs-wireless-bridge.webp",
    imageAlt: "Illustrative wireless link between a rural house and a shed.",
    cta: PLAN_CTA,
    sections: [
      {
        heading: "Mesh",
        copy: [
          "Mesh nodes hand the connection around a house so you are not stuck on one router in a corner. It helps brick, a second storey and a long single building. Each hop still has to hear the last one. Metal, distance and trees spend that budget quickly.",
        ],
      },
      {
        heading: "A wireless bridge",
        copy: [
          "A bridge is a pair of outdoor radios aimed at each other. It is the stand-in for a trench. It does not, by itself, give you Wi-Fi inside the far building. That building still needs an access point, and cameras still need power and a recorder plan.",
          "If the shed, stable or granny flat is the thing that is offline, start with a bridge conversation, not another indoor node.",
        ],
      },
      {
        heading: "A simple way to choose",
        copy: [
          "Same roof, weak rooms: mesh or extra access points. Different building, especially steel: a link, then coverage inside. Both can exist on one property. The house can be meshed and the shed can sit on a bridge.",
        ],
      },
    ],
    related: [
      { href: "/services/whole-property-wifi", label: "Whole-property Wi-Fi" },
      { href: "/services/wireless-links", label: "Wireless links" },
      { href: "/resources/wifi-into-a-shed", label: "Wi-Fi into a shed" },
      { href: "/resources/point-to-point-wireless", label: "Point-to-point, explained" },
    ],
  }),
  page({
    path: "/resources/point-to-point-wireless",
    slug: "point-to-point-wireless",
    kicker: "Property Wi-Fi",
    title: "Point-to-point wireless, explained",
    lede: "A point-to-point link joins two buildings without a trench. It needs a line of sight, power at both ends, and a plan for what happens after the signal arrives.",
    description:
      "How a point-to-point wireless bridge connects a shed, stable, office or granny flat on a Victorian property.",
    image: "/guides/vinconnect-mesh-vs-wireless-bridge.webp",
    imageAlt: "Illustrative house-to-shed wireless bridge on an Australian acreage.",
    cta: PLAN_CTA,
    sections: [
      {
        heading: "What it is",
        copy: [
          "Two outdoor radios face each other. One sits at the building that already has internet. The other sits at the building that needs it. The link is the backhaul. Phones, laptops and cameras then use whatever network you build on the far side.",
        ],
      },
      {
        heading: "What it needs",
        copy: [
          "The radios need to see each other well enough. Trees in the path, a roof that grows a new shed in front of the shot, or no power at the far end all change the job. We check that before ordering hardware. Omada is one radio family we use. The brand is not the first decision. The path is.",
        ],
      },
      {
        heading: "What it is not",
        copy: [
          "It is not a promise that one router covers the whole farm. It is not a substitute for a camera recorder. And it is not always better than a short trench when the buildings are close and the ground is easy.",
        ],
      },
    ],
    related: [
      { href: "/services/wireless-links", label: "Book a building link" },
      { href: "/resources/wifi-into-a-shed", label: "Wi-Fi into a shed" },
      { href: "/projects/pearcedale-five-acre-property", label: "Pearcedale project" },
      { href: "/property-planner", label: "Plan my property" },
    ],
  }),
  page({
    path: "/resources/connected-horse-property",
    slug: "connected-horse-property",
    kicker: "Horse properties",
    title: "The connected horse property",
    lede: "House, stables, tack room, arena and gate do not share one Wi-Fi bubble. They share one network, built in pieces you can add as the property needs them.",
    description:
      "How a Victorian horse property connects the house, stables, arena and gate: Wi-Fi, wireless links and cameras on one network.",
    image: "/guides/vinconnect-horse-property-network.webp",
    imageAlt: "Illustrative Victorian horse property with house, stables and arena.",
    cta: PLAN_CTA,
    sections: [
      {
        heading: "Start with the places, not the router",
        copy: [
          "The useful map is the house, the stable block, the arena edge, the tack room and the front gate. Each one has a job: calls and admin in the house, cameras and a work phone in the stables, a view of the arena, and something at the gate that is more than a guess.",
          "A single indoor router will not do that list. Metal roofs and the walk between buildings see to that.",
        ],
      },
      {
        heading: "A sensible order",
        copy: [
          "Get a reliable internet source at the house. Link the stable block if it is out of Wi-Fi range. Put coverage inside the stables for the people who actually stand there. Add cameras where you need to see a horse, a yard or the gate, recorded locally so a dropout does not wipe the night.",
          "Cable around horses has to stay out of reach. That is a placement rule, not a slogan.",
        ],
      },
      {
        heading: "You do not have to do it in one visit",
        copy: [
          "Many properties start with the house connection, then add the stable link, then cameras. The planner is how we keep the second visit from fighting the first.",
        ],
      },
    ],
    related: [
      { href: "/services/equestrian-connectivity", label: "Horse property connectivity" },
      { href: "/security/stable-cctv", label: "Stable cameras" },
      { href: "/resources/wifi-into-a-shed", label: "Wi-Fi into a shed or stable" },
      { href: "/property-planner", label: "Plan my property" },
    ],
  }),
  page({
    path: "/resources/caravan-internet-guide",
    slug: "caravan-internet-guide",
    kicker: "Caravans",
    title: "Caravan internet and Starlink",
    lede: "Park Wi-Fi, a phone hotspot and a Starlink Roam setup solve different trips. The useful question is where you actually stop, and whether you have power.",
    description:
      "A practical guide to caravan internet in Australia: park Wi-Fi, mobile data, Starlink Roam and what VINCONNECT can install.",
    image: "/guides/vinconnect-starlink-caravan-guide.webp",
    imageAlt: "Illustrative Australian caravan camp with a Starlink dish in open sky.",
    cta: {
      primary: { label: "Ask about a caravan setup", href: "/contact" },
      secondary: { label: "Caravan installation", href: "/services/starlink-caravan-installation" },
    },
    sections: [
      {
        heading: "Three different connections",
        copy: [
          "Caravan-park Wi-Fi is convenient and often crowded. A phone hotspot is fine for maps and messages until the tower disappears. Starlink Roam is the option people look at when the trip leaves coverage, provided the plan they order is actually a Roam plan and they can power the kit.",
          "VINCONNECT does not sell the Starlink plan. If you are ordering, check the referral offer shown by Starlink before you pay. Not every mobile plan qualifies.",
        ],
      },
      {
        heading: "Placement and power",
        copy: [
          "The dish wants open sky. A dish parked under a dense canopy will complain, which is the same obstruction problem as a house under trees. Power has to be real: the van battery, a proper supply, or shore power. A hopeful USB lead is not a plan.",
          "A portable setup is not the same job as a dish mounted for a house. If the van is the home base and the dish lives there, say so. If it is a weekend kit, say that too.",
        ],
      },
      {
        heading: "Television and streaming",
        copy: [
          "Streaming needs both the internet and a screen that can actually use it. A smart TV or a small streaming device on the van network is the usual path. We do not pretend a dish replaces every broadcast antenna.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is this a completed VINCONNECT caravan job?",
        a: "No. The picture is an example of the setup, not a published install.",
      },
    ],
    related: [
      { href: "/services/starlink-caravan-installation", label: "Caravan Starlink installation" },
      { href: "/starlink/caravan-and-touring", label: "Caravan and touring notes" },
      { href: "/starlink/mini", label: "Starlink Mini" },
      { href: "/starlink-offer", label: "Check the referral offer" },
    ],
  }),
  page({
    path: "/resources/choosing-a-starlink-mount",
    slug: "choosing-a-starlink-mount",
    kicker: "Starlink",
    title: "Choosing the right Starlink mount",
    lede: "The mount is chosen for the building, the sky and whether you want a hole in the roof. There is no single correct bracket.",
    description:
      "How VINCONNECT chooses a Starlink mount in Victoria: fascia, tripod, pole, tile and Colorbond, without a default roof penetration.",
    image: "/guides/vinconnect-starlink-mount-guide.webp",
    imageAlt: "Illustrative Starlink mount on an Australian home in late-afternoon light.",
    sections: [
      {
        heading: "What we are choosing",
        copy: [
          "Sky view comes first. A neat mount under a tree is still a bad mount. After that we look at the structure: tile, Colorbond, a flat roof with a concealed gutter, a rental that will not accept a penetration, or a second storey where access is the real cost.",
        ],
      },
      {
        heading: "The usual options",
        copy: [
          "A fascia or wall mount keeps the dish off the tiles when the sky allows it. A non-penetrating tripod suits some flat roofs and rentals. A short pole is for places where the roof itself is the wrong height or the wrong shape. A penetrating roof mount is used when it is the honest option, not as the default.",
          "The mount hardware is itemised separately from labour. A standard install assumes a straightforward mount, not a custom fabrication.",
        ],
      },
      {
        heading: "Tell us before the visit",
        copy: [
          "Storeys, roof material, and whether anyone has already said “no holes”. Photos of the proposed spot save a second trip. The Starlink mount notes go further into roof, wall and tripod choices.",
        ],
      },
    ],
    related: [
      { href: "/starlink/roof-wall-and-tripod", label: "Roof, wall and tripod" },
      { href: "/services/starlink-installation", label: "Book the install" },
      { href: "/estimate", label: "Check My Install Price" },
      { href: "/projects/somerville-tripod-install", label: "Somerville tripod", copy: "A real no-penetration job." },
    ],
  }),
  page({
    path: "/resources/where-should-the-router-go",
    slug: "where-should-the-router-go",
    kicker: "Starlink",
    title: "Where should your Starlink router go?",
    lede: "The router wants an open spot near the rooms you use, with power and ventilation. A metal cabinet in the far corner of the garage is a hiding place, not a plan.",
    description:
      "Where to place a Starlink router in a Victorian home, and when a garage or data cabinet needs extra access points.",
    image: "/guides/vinconnect-router-placement-guide.webp",
    imageAlt: "Illustrative router in an open living area rather than a closed cabinet.",
    sections: [
      {
        heading: "A useful position",
        copy: [
          "On a standard install the router sits on the inside of the wall the cable comes through, close to power. That is simple and it works when that wall is near the living area. If the only sensible cable entry is a garage or a cupboard, the Wi-Fi will start in the garage. The rooms you care about may then need an access point, not a louder router.",
        ],
      },
      {
        heading: "Cabinet and garage",
        copy: [
          "A data cabinet is the right home for a tidy network, switches and a recorder. It is a poor home for the only Wi-Fi radio if the cabinet is steel and shut. We can put the router there when you want the cabling neat, and then place coverage where people actually sit. That is an extra, not part of the $300 standard labour.",
        ],
      },
      {
        heading: "What does not help",
        copy: [
          "Tucking the router behind a television, inside a metal meter box, or on the floor of a robes cupboard. The dish can be perfect and the house can still feel slow.",
        ],
      },
    ],
    related: [
      { href: "/starlink/cable-entry-and-router", label: "Cable entry and router" },
      { href: "/services/whole-property-wifi", label: "Whole-property Wi-Fi" },
      { href: "/estimate", label: "Check My Install Price" },
    ],
  }),
  page({
    path: "/resources/starlink-power-outage",
    slug: "starlink-power-outage",
    kicker: "Power",
    title: "Can Starlink work during a power outage?",
    lede: "Only if the dish, the router and anything else you still want online are on backup power. The satellite does not keep your house running.",
    description:
      "What stays online when the power drops: Starlink, a small UPS, and the limits of backup for Wi-Fi and cameras.",
    image: "/guides/vinconnect-starlink-ups-power-backup.webp",
    imageAlt: "Illustrative network cabinet with a compact UPS during a rural power outage.",
    sections: [
      {
        heading: "What has to stay powered",
        copy: [
          "The dish and the router both need power. If either one drops, the internet drops. A camera recorder only keeps recording if it is on the same backup, or it has its own. A small UPS can cover a short outage for that cupboard. It will not run a house, a pump or the air conditioner.",
        ],
      },
      {
        heading: "What a realistic backup is",
        copy: [
          "People usually want the internet, the Wi-Fi and sometimes the cameras through a brief blackout. That is a compact battery on the network gear, sized for those devices and for a few hours, not for the property. If you already have a generator or a solar battery, the network can sit on that circuit instead. We will not draw a diagram that pretends a shoebox battery feeds the farm.",
        ],
      },
      {
        heading: "Say it before install day",
        copy: [
          "If outage cover matters, tell us when you book. The cable route and the power point need to land where the backup actually is.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does Starlink include a battery?",
        a: "Do not assume it does. Plan power for the dish and the router separately from the kit.",
      },
    ],
    related: [
      { href: "/services/starlink-installation", label: "Starlink installation" },
      { href: "/estimate", label: "Check My Install Price" },
      { href: "/resources/where-should-the-router-go", label: "Router placement" },
    ],
  }),
  page({
    path: "/resources/rural-cctv",
    slug: "rural-cctv",
    kicker: "CCTV",
    title: "CCTV for rural properties",
    lede: "A rural camera plan starts with power, a recorder, and a way to reach the shed or the gate. Wi-Fi from the kitchen is not that plan.",
    description:
      "How VINCONNECT approaches CCTV on Victorian acreage: local recording, PoE, shed links and what Starlink does and does not do for cameras.",
    image: "/guides/vinconnect-rural-cctv.webp",
    imageAlt: "Illustrative camera on a Colorbond shed at a Victorian acreage.",
    cta: {
      primary: { label: "Discuss my CCTV project", href: "/contact" },
      secondary: { label: "CCTV packages", href: "/security" },
    },
    sections: [
      {
        heading: "Record it where you are",
        copy: [
          "Cameras should record on a recorder at the property. Remote viewing is a convenience on top of that. If the internet drops, the night should still be on the disk. That is why a Starlink connection is not a camera system by itself.",
        ],
      },
      {
        heading: "The far building",
        copy: [
          "A shed, stable or gate that is out of Wi-Fi range needs a real path: cable where it is short and safe, or a wireless link where it is not. The camera then needs power. PoE does both on one cable when the run is practical. A solar camera is the exception for a spot with no power, not the default for a powered shed.",
        ],
      },
      {
        heading: "A completed example",
        copy: [
          "The Nyora new-home job connected Starlink and the existing cameras. That is one property, not a template for every acreage. Packages on the CCTV pages are starting points. The visit still has to match the buildings.",
        ],
      },
    ],
    related: [
      { href: "/security", label: "CCTV and cameras" },
      { href: "/resources/cctv-on-starlink", label: "CCTV on Starlink" },
      { href: "/projects/nyora-new-home-cctv", label: "Nyora cameras", copy: "A completed job." },
      { href: "/security/stable-cctv", label: "Stable cameras" },
    ],
  }),
  page({
    path: "/resources/trees-and-starlink",
    slug: "trees-and-starlink",
    kicker: "Starlink",
    title: "Trees, obstructions and Starlink",
    lede: "Starlink needs a clear view of the sky. A tidy mount under a gum is still a bad mount if the canopy sits in the way.",
    description:
      "How trees and buildings affect a Starlink install in Victoria, and how VINCONNECT chooses a mount position before drilling.",
    image: "/guides/vinconnect-trees-and-starlink.webp",
    imageAlt: "Illustrative Starlink dish on a roof with open sky beside gum trees.",
    sections: [
      {
        heading: "What actually blocks it",
        copy: [
          "Leaves, a neighbour’s roof, a second storey, and a dense stand of gums all count. The dish does not need a bare paddock. It needs the part of the sky it uses to stay clear. Seasonal growth matters. A winter view and a summer canopy are not the same shot.",
        ],
      },
      {
        heading: "How we decide",
        copy: [
          "We look at the app obstruction check and at the building. Sometimes the clear sky is over the house. Sometimes it is further along the roof, or on a short pole, or on a fascia that faces the open side. We do not put a dish in a pretty spot and hope.",
          "If the only clear sky is awkward to reach, that becomes an access conversation, not a surprise on the day.",
        ],
      },
      {
        heading: "What you can check first",
        copy: [
          "Stand where you think the dish should go and look up. If you are under branches, it is probably the wrong place. Photos of the roof and the trees save time. Red Hill and other treed properties are where this question comes up most.",
        ],
      },
    ],
    related: [
      { href: "/resources/choosing-a-starlink-mount", label: "Choosing a mount" },
      { href: "/services/starlink-installation", label: "Book the install" },
      { href: "/service-areas/red-hill", label: "Red Hill" },
      { href: "/estimate", label: "Check My Install Price" },
    ],
  }),
  page({
    path: "/resources/new-home-starlink-ready",
    slug: "new-home-starlink-ready",
    kicker: "New homes",
    title: "Make a new home Starlink-ready",
    lede: "If the estate is still waiting on NBN or OptiComm, the useful work is a cable path and a router wall, not a hole drilled in a hurry after you move in.",
    description:
      "How builders and new-home owners in South East Victoria can leave a property ready for a professional Starlink install.",
    image: "/guides/vinconnect-new-home-starlink.webp",
    imageAlt: "Illustrative new estate home with a Starlink dish and open sky.",
    sections: [
      {
        heading: "What to leave in the build",
        copy: [
          "A path from the likely dish position to an internal wall with power. A brush plate or a planned penetration beats a later chase through new plaster. If there is a data cabinet, say where it is. If the router has to live in the garage, plan an access point for the rooms people actually use.",
        ],
      },
      {
        heading: "What not to assume",
        copy: [
          "A new house is not automatically an easy install. Double storeys, tile, and a roof that only has sky on the street side all change the labour. The Clyde job was a new estate waiting on infrastructure. That was one house. Your estate may be different.",
        ],
      },
      {
        heading: "Order and install are still separate",
        copy: [
          "Starlink supplies the kit and the service. VINCONNECT mounts and cables it. Builders who want the cabling and mount prepared during construction can offer VINREADY as a variation instead of a retrofit.",
        ],
      },
    ],
    related: [
      { href: "/projects/clyde-new-estate-home", label: "Clyde new estate", copy: "A completed job." },
      { href: "/vinready", label: "VINREADY for builders", copy: "Prepared during construction." },
      { href: "/services/starlink-installation", label: "Starlink installation" },
      { href: "/estimate", label: "Check My Install Price" },
    ],
  }),
  page({
    path: "/resources/starlink-for-acreage",
    slug: "starlink-for-acreage",
    kicker: "Rural",
    title: "Starlink for farms and acreage",
    lede: "On acreage the dish is the start. The shed, the yard and the second building are the rest of the job.",
    description:
      "How Starlink fits a Victorian farm or acreage: sky view at the house, then Wi-Fi and links to the buildings that matter.",
    image: "/guides/vinconnect-starlink-acreage.webp",
    imageAlt: "Illustrative Victorian acreage with a house, shed and Starlink dish.",
    cta: PLAN_CTA,
    sections: [
      {
        heading: "Put the internet where the sky is",
        copy: [
          "The dish belongs where the sky is clear and the building can hold the mount. That is often the house. It is not automatically the shed. Once the connection is in, the property network carries it to the places that were never going to hear a lounge-room router.",
        ],
      },
      {
        heading: "The buildings",
        copy: [
          "A workshop, stable, farm office or granny flat usually needs its own link and its own indoor coverage. Cameras ride that same path if you want them. Pearcedale is an example of a five-acre property where the house was not the only place that needed to be online.",
        ],
      },
      {
        heading: "Do it in an order",
        copy: [
          "Connection first. Then the building that matters most. Then cameras or a gate. The planner exists so the second visit does not undo the first.",
        ],
      },
    ],
    related: [
      { href: "/starlink/rural-properties", label: "Rural Starlink notes" },
      { href: "/resources/house-or-shed", label: "House or shed?" },
      { href: "/resources/wifi-into-a-shed", label: "Wi-Fi into a shed" },
      { href: "/projects/pearcedale-five-acre-property", label: "Pearcedale project" },
      { href: "/property-planner", label: "Plan my property" },
    ],
  }),
  page({
    path: "/resources/external-or-concealed-cabling",
    slug: "external-or-concealed-cabling",
    kicker: "Starlink",
    title: "External or concealed Starlink cabling",
    lede: "A standard install uses a visible, clipped outdoor cable and one sealed entry. A hidden route is a different job, and it is priced as one.",
    description:
      "The difference between a standard external Starlink cable route and a concealed internal run on a Victorian home.",
    image: "/guides/vinconnect-starlink-cable-route.webp",
    imageAlt: "Illustrative neat cable entry on an Australian home.",
    sections: [
      {
        heading: "The standard route",
        copy: [
          "Cable leaves the dish, is clipped so it cannot flap, and enters once through a sealed penetration with a brush plate. The router sits on the inside of that wall, near power. That is the labour behind the local single-storey price. Conduit, when the run needs it, is an extra.",
        ],
      },
      {
        heading: "A concealed route",
        copy: [
          "If you want the cable inside the wall, through a roof space, or out of sight on an architectural home, say so before the visit. It takes more time and sometimes a second person or a different entry. We do not start a concealed run on the ladder and invoice it afterwards as a surprise.",
        ],
      },
      {
        heading: "What to send",
        copy: [
          "A photo of the wall you care about, and a sentence on whether a visible clipped run is acceptable. The estimator has a tick for a concealed route. Use it if that is what you want.",
        ],
      },
    ],
    related: [
      { href: "/resources/standard-install-explained", label: "What a standard install includes" },
      { href: "/starlink/cable-entry-and-router", label: "Cable entry and router" },
      { href: "/install-terms-and-conditions", label: "Install terms" },
      { href: "/estimate", label: "Check My Install Price" },
    ],
  }),
  page({
    path: "/resources/house-or-shed",
    slug: "house-or-shed",
    kicker: "Starlink",
    title: "Should Starlink go on the house or the shed?",
    lede: "Put the dish where the sky is clear and the cable can reach a sensible router. That is usually the house. The shed gets a link, not a second internet service.",
    description:
      "How to choose whether a Starlink dish belongs on the house or the shed at a Victorian property.",
    image: "/guides/vinconnect-house-or-shed.webp",
    imageAlt: "Illustrative acreage with the dish on the house and a shed further away.",
    cta: PLAN_CTA,
    sections: [
      {
        heading: "Sky first",
        copy: [
          "If the house roof is under trees and the shed roof is open, the shed can be the better dish position. If both are open, the house is usually simpler: shorter cable, router near the rooms you live in, and a link onward to the shed.",
        ],
      },
      {
        heading: "Do not buy two services",
        copy: [
          "A shed that needs Wi-Fi does not need its own Starlink account. It needs a path from the dish you already have. That is a wireless bridge or a cable, then an access point inside the shed.",
        ],
      },
      {
        heading: "Cable length still matters",
        copy: [
          "A dish on a far shed means the router and the power start at the shed unless you design it otherwise. Say which building you actually work in. We will not hide the dish on a roof you cannot service.",
        ],
      },
    ],
    related: [
      { href: "/resources/wifi-into-a-shed", label: "Wi-Fi into a shed" },
      { href: "/resources/trees-and-starlink", label: "Trees and obstructions" },
      { href: "/services/starlink-installation", label: "Starlink installation" },
      { href: "/property-planner", label: "Plan my property" },
    ],
  }),
];
