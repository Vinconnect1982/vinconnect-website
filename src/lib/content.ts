export const PHONE = "0408 559 555";
export const PHONE_TEL = "tel:0408559555";
export const EMAIL = "vince@vinconnect.com.au";
export const EMAIL_MAILTO = "mailto:vince@vinconnect.com.au";
export const SITE_URL = "https://vinconnect.com.au";

export const SOCIALS = [
  {
    label: "Google",
    href: "https://share.google/trFzHOI7IVQMK9Gmf",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Vinconnect-Starlink-Solutions/61589183530269/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/vinconnectsolutions/",
  },
] as const;

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  {
    label: "Starlink",
    href: "/services/starlink-installation",
    children: [
      { label: "Book an install", href: "/services/starlink-installation" },
      { label: "Starlink guides", href: "/starlink" },
      { label: "Standard install scope", href: "/customer-help/standard-install-scope" },
      { label: "Circl customers", href: "/circl-starlink-installations" },
      { label: "Caravan Starlink", href: "/services/starlink-caravan-installation" },
      { label: "Starlink Mini", href: "/services/starlink-mini-installation" },
    ],
  },
  {
    label: "Networks",
    href: "/property-networks",
    children: [
      { label: "Property network guides", href: "/property-networks" },
      { label: "Whole-property Wi-Fi", href: "/services/whole-property-wifi" },
      { label: "Internet to sheds & buildings", href: "/services/wireless-links" },
      { label: "Rural property connectivity", href: "/services/rural-connectivity" },
      { label: "Equestrian connectivity", href: "/services/equestrian-connectivity" },
      { label: "Business & community networks", href: "/services/community-connectivity" },
      { label: "Solutions by property type", href: "/solutions" },
    ],
  },
  {
    label: "CCTV",
    href: "/security",
    children: [
      { label: "CCTV guides", href: "/security" },
      { label: "HiLook CCTV packages", href: "/security/hilook-cctv-packages" },
      { label: "Home Watch 4", href: "/security/packages/home-watch" },
      { label: "Property Guard 6", href: "/security/packages/property-guard" },
      { label: "Acreage 8", href: "/security/packages/acreage" },
      { label: "Stable & Yard", href: "/security/packages/stable-yard" },
      { label: "Stable cameras", href: "/security/stable-cctv" },
      { label: "Solar & remote cameras", href: "/security/solar-cameras" },
    ],
  },
  {
    label: "Service areas",
    href: "/service-areas",
    children: [
      { label: "All service areas", href: "/service-areas" },
      { label: "Casey & South East", href: "/service-areas/region/casey-south-east" },
      { label: "Cardinia", href: "/service-areas/region/cardinia" },
      { label: "Mornington Peninsula", href: "/service-areas/region/mornington-peninsula" },
      { label: "Bass Coast", href: "/service-areas/region/western-port-bass-coast" },
      { label: "South Gippsland", href: "/service-areas/region/south-gippsland" },
      { label: "West Gippsland", href: "/service-areas/region/west-gippsland-latrobe" },
      { label: "Inner South East", href: "/service-areas/region/inner-south-east" },
    ],
  },
  {
    label: "Event Link",
    href: "/event-link",
    children: [
      { label: "Event Link pilot", href: "/event-link" },
      { label: "Event Link Mini", href: "/event-link/mini" },
      { label: "For organisers", href: "/event-link/organisers" },
      { label: "What is included", href: "/event-link/what-is-included" },
      { label: "Rural Connections", href: "/rural-connections" },
      { label: "Roadshow hub", href: "/rural-connections/roadshow" },
    ],
  },
  {
    label: "VIN Gear",
    href: "/vingear",
    children: [
      { label: "VIN Gear", href: "/vingear" },
      { label: "Pulse", href: "/vingear/pulse" },
      { label: "Early access", href: "/vingear/early-access" },
    ],
  },
  { label: "Projects", href: "/projects" },
  {
    label: "Help",
    href: "/customer-help",
    children: [
      { label: "Customer help", href: "/customer-help" },
      { label: "Field notes", href: "/journal" },
      { label: "Install terms", href: "/install-terms-and-conditions" },
      { label: "Circl installations", href: "/circl-starlink-installations" },
      { label: "Guides & answers", href: "/resources" },
      { label: "How we work", href: "/about/how-we-work" },
    ],
  },
];

export { AREAS, REGIONS, FOOTER_AREAS, areaBySlug, regionBySlug, areasInRegion } from "./areas";
export type { Area, Region } from "./areas";

export type ServicePage = {
  slug: string;
  group: "install" | "network" | "security" | "touring";
  kicker: string;
  title: string;
  lede: string;
  image?: string;
  points: string[];
  body: { heading: string; copy: string }[];
  cta?: string;
};

export const SERVICES: ServicePage[] = [
  {
    slug: "starlink-installation",
    group: "install",
    kicker: "Starlink installation",
    title: "Starlink installed properly.",
    lede: "A considered Starlink installation brings work, calls and everyday life back within reach — for homes, sheds, workshops, stables, offices, farms and businesses across South East Melbourne, the Peninsula, Bass Coast and Gippsland, with regional work by arrangement.",
    image: "/scenes/starlink-home.webp",
    points: [
      "Sky view and mount choice before a drill goes near the roof",
      "Agreed cable route, sealed entry and strain relief",
      "Router placement that actually covers the rooms you use",
      "Handover so you know how the system is powered and isolated",
    ],
    body: [
      {
        heading: "Mounting that respects the building",
        copy: "Roof, fascia, tripod and non-penetrating mounts are chosen for the structure, wind and how you want the place to look. We do not default to a penetrating mount when a tripod or fascia option is cleaner.",
      },
      {
        heading: "Cable entry that stays weather-tight",
        copy: "The weak point on many DIY installs is the hole. We agree the route, protect the penetration and finish the inside so the kit is accessible, ventilated and out of the way.",
      },
      {
        heading: "Starting labour, not a Starlink sale",
        copy: "VINCONNECT prices installation labour. Standard single-storey Starlink labour is $300 in the local Cranbourne work area. Starlink hardware, mounts and subscriptions are separately itemised. Travel is added automatically when the address sits outside that local band. Confirm current Starlink offers at checkout before you pay.",
      },
      {
        heading: "What the $300 includes",
        copy: "Sky view and a mount the building can live with, a visible clipped outdoor cable, one sealed penetration and a brush plate, the router on the backing interior wall near power, commissioning and a short handover. Conduit ($120), garage or cabinet router ($150), double-storey access and extra Wi-Fi areas are extras when they are agreed.",
      },
    ],
  },
  {
    slug: "whole-property-wifi",
    group: "network",
    kicker: "Whole-property Wi-Fi",
    title: "Room to live. Room to connect.",
    lede: "From the home office to the back verandah, give every space a reliable Wi-Fi plan — not another consumer mesh dropped in a cupboard.",
    image: "/scenes/whole-home-wifi.webp",
    points: [
      "Coverage mapped to how the property is actually used",
      "Access points placed for building materials, not guesswork",
      "Guest, work and camera traffic kept in their own lanes",
      "Works with Starlink or NBN as the upstream service",
    ],
    body: [
      {
        heading: "The internet is rarely the whole problem",
        copy: "Homes and rural properties rarely fail because of the internet service alone. The weak point is often Wi-Fi placement, brick, metal sheds, distance or a network that was never designed as one system.",
      },
      {
        heading: "Mesh when it earns its place",
        copy: "Extra nodes help a large home, but they do not replace a wireless link to a detached building. We specify each hop for the job it has to do.",
      },
    ],
  },
  {
    slug: "wireless-links",
    group: "network",
    kicker: "Building-to-building wireless links",
    title: "Take the connection further.",
    lede: "Keep the workshop, stable or second building connected with a dedicated wireless link instead of hoping the house Wi-Fi stretches across the paddock.",
    image: "/scenes/building-links.webp",
    points: [
      "Point-to-point links for sheds, stables, offices and granny flats",
      "Line-of-sight check before hardware is ordered",
      "Managed Omada gear that can be supported remotely",
      "Power and mounting planned with the rest of the property",
    ],
    body: [
      {
        heading: "A bridge is not indoor Wi-Fi",
        copy: "A wireless bridge carries the internet to the building. That building still needs its own access point if people, cameras or machinery need coverage inside.",
      },
      {
        heading: "When trenching is the wrong answer",
        copy: "Long trenches across driveways and paddocks are expensive, slow and easy to damage. A clean line-of-sight link is often the tidier, faster path.",
      },
      {
        heading: "Point-to-point is the same job with a longer name",
        copy: "If the shed is 80 metres away and house Wi-Fi dies at the clothesline, this is the page. We survey line of sight, specify managed radios, and plan grounding and mounting for Victorian weather. The property planner is the fastest way to drop both buildings before anyone quotes a cable length.",
      },
    ],
  },
  {
    slug: "rural-connectivity",
    group: "network",
    kicker: "Rural property connectivity",
    title: "Designed beyond the router.",
    lede: "Acreage, horse properties and farms need a network drawn around buildings, gates, arenas and the places you actually work — not a suburban floor plan.",
    image: "/visuals/network-cutaway.webp",
    points: [
      "Starlink and NBN-ready network design",
      "A wireless link when the shed is too far for house Wi-Fi",
      "Wi-Fi planned around the rooms and buildings you use",
      "Cameras at the stable, gate or driveway",
      "UPS and remote-support planning",
    ],
    body: [
      {
        heading: "One system, built in stages",
        copy: "Start with the connection, then extend it cleanly to the house, shed, stable, arena, gate, cameras and accommodation. You do not have to do everything on day one.",
      },
      {
        heading: "The dish only gets internet to one building",
        copy: "Starlink or NBN gets internet to one building. House Wi-Fi, a wireless link to the shed, and cameras are separate hops. Pearcedale, Tooradin and Caldermeade jobs all started with that conversation.",
      },
    ],
  },
  {
    slug: "community-connectivity",
    group: "network",
    kicker: "Business & community networks",
    title: "Shared spaces that stay online.",
    lede: "Clubs, villages and small commercial sites need a network that survives busy days, guest access and the existing rack — not a consumer router on a windowsill.",
    points: [
      "Integration with existing data racks",
      "Guest and operations Wi-Fi kept apart",
      "Streaming, POS and cameras planned as one job",
      "One point of contact for the committee or owner",
    ],
    body: [
      {
        heading: "Built for how the place is used",
        copy: "The Cranbourne Cricket Club job replaced Telstra 4G with Starlink and Ubiquiti Wi-Fi, with FrogBox streaming into the existing rack. That is the standard: work with what is already there.",
      },
    ],
  },
  {
    slug: "cctv",
    group: "security",
    kicker: "CCTV & remote monitoring",
    title: "A little more peace of mind.",
    lede: "Thoughtful camera placement helps you check on home, entrances and the moments that matter — with recording and remote access that actually work off-site.",
    image: "/scenes/home-cctv.webp",
    points: [
      "Views planned before camera counts",
      "Power, cabling and network at each location",
      "Recording retention agreed up front",
      "Remote access that does not depend on a lucky port-forward",
    ],
    body: [
      {
        heading: "Cameras live on the network",
        copy: "A camera that cannot reach a recorder or the internet is just a box on a wall. We treat CCTV as part of the property network, not a separate afterthought.",
      },
      {
        heading: "Views first, kit second",
        copy: "HiLook packages exist when they fit — Home Watch 4, Property Guard 6, Acreage 8, Stable & Yard. If the views you need do not match a kit, we plan cameras, power and recording instead of forcing a box count.",
      },
    ],
  },
  {
    slug: "starlink-caravan-installation",
    group: "touring",
    kicker: "Touring installation services",
    title: "Stay a little longer. Stay connected.",
    lede: "Starlink installation for caravans, motorhomes and touring vehicles across South East Victoria. A tidy setup for the trips you actually take.",
    image: "/travel/caravan-river.webp",
    points: [
      "Dish position with an unobstructed sky view",
      "Sealed cable entry and strain relief",
      "Equipment clear of everyday storage",
      "Power handover and pack-down walkthrough",
    ],
    body: [
      {
        heading: "Choose the setup that fits your travels",
        copy: "A removable dish lets you park in shade and position the antenna in a nearby clearing. A permanent vehicle mount reduces packing up, but the van itself must have a suitable view of the sky. Roam is a service plan; Mini and Standard are different hardware choices.",
      },
      {
        heading: "Clear installation starting prices",
        copy: "Portable setup and handover: labour from $300. Mount-and-cable installation: labour from $550. Mount, cable and a straightforward dedicated low-voltage power installation: labour from $850. Starlink equipment, mounts, adaptors, cable and power components are separately itemised.",
      },
      {
        heading: "What those starting prices assume",
        copy: "One accessible vehicle, one Starlink system and a straightforward agreed route. Custom fabrication, concealed cabinetry, long runs, battery upgrades, travel and any mains electrical work are quoted separately. Send van photos for a written total before booking.",
      },
      {
        heading: "Parked use is the starting point",
        copy: "A mounted antenna does not automatically make a setup suitable for use while driving. In-motion use requires an eligible plan, supported equipment, a suitable mount and compliance with current Starlink conditions.",
      },
    ],
  },
  {
    slug: "starlink-mini-installation",
    group: "install",
    kicker: "Starlink Mini",
    title: "Small kit. Same standards.",
    lede: "Mini hardware still needs a sky view, a safe mount and a cable route that will survive weather and travel. We treat it as a proper installation, not a windowsill experiment.",
    points: [
      "Mount and pole adaptor matched to Mini hardware",
      "Power from vehicle, battery or house supply",
      "Wi-Fi coverage for the van, cabin or small home",
    ],
    body: [
      {
        heading: "Mini is hardware, Roam is a plan",
        copy: "People mix these up. We confirm the kit you already have — or the kit you intend to buy — before quoting labour.",
      },
    ],
  },
  {
    slug: "equestrian-connectivity",
    group: "network",
    kicker: "Equestrian connectivity",
    title: "The horse property, connected.",
    lede: "Wi-Fi that reaches the arena, tack room and house, with cameras and recording planned around how the property is actually used.",
    image: "/scenes-new/horse-property.webp",
    points: [
      "Stable and arena camera views",
      "Wireless links where cabling cannot run",
      "Recording that you can check from the house or the road",
    ],
    body: [
      {
        heading: "Built around the horses",
        copy: "Dust, metal sheds, long runs and odd power points are normal on a horse property. The design starts there.",
      },
    ],
  },
  {
    slug: "point-to-point-links",
    group: "network",
    kicker: "Point-to-point",
    title: "A dedicated path between buildings.",
    lede: "When the shed is 80 metres away and the house Wi-Fi dies at the clothesline, a dedicated link is the grown-up answer. This is the same work as our wireless building links — one page, one job type.",
    image: "/scenes/building-links.webp",
    points: ["Line-of-sight survey", "Omada or equivalent managed radios", "Grounding and mounting for Victorian weather"],
    body: [
      {
        heading: "Same job as wireless building links",
        copy: "We keep this page so older bookmarks still work. The current guide, planner and quote path live on wireless building links. Use that page unless you arrived here from a printed note.",
      },
      {
        heading: "Measured, not guessed",
        copy: "Use the property planner to drop the house and the second building, then we will check whether a link, a trench or a hybrid is the honest recommendation.",
      },
    ],
  },
  {
    slug: "multi-building-networks",
    group: "network",
    kicker: "Multi-building networks",
    title: "One property. Several buildings. One plan.",
    lede: "Home, shed, stable, office, granny flat — each place gets the coverage it needs, joined by links that can be supported later.",
    points: ["Internet source chosen once", "Each building gets its own indoor coverage", "Cameras ride the same backbone"],
    body: [
      {
        heading: "Start on the map",
        copy: "The planner is the fastest way to show us what ‘the property’ actually means before anyone quotes a cable length.",
      },
    ],
  },
  {
    slug: "network-cabinets",
    group: "network",
    kicker: "Cabinets & racks",
    title: "A tidy home for the kit.",
    lede: "Routers, recorders, UPS and switches belong in a ventilated, labelled cabinet — not a tangle behind the TV.",
    image: "/scenes-new/network-cabinet.webp",
    points: ["Existing rack integration", "UPS planning", "Labelling and handover"],
    body: [
      {
        heading: "Presentation is part of the job",
        copy: "Clean cable runs and a cabinet you can open without dread are how the system stays supportable in two years’ time.",
      },
    ],
  },
  {
    slug: "caravan-starlink-power",
    group: "touring",
    kicker: "Van power",
    title: "Power the dish without guessing.",
    lede: "Low-voltage supply, isolation and pack-down for touring Starlink. Mains electrical work is separately scoped with a licensed electrician.",
    points: ["Dedicated low-voltage runs", "Isolation and fuse protection", "Handover for pack-down"],
    body: [
      {
        heading: "Labour from $850 when power is in scope",
        copy: "Mount, cable and a straightforward dedicated low-voltage power installation start from $850 labour. Battery upgrades and inverter work are quoted from photos.",
      },
    ],
  },
];

export const SECURITY: ServicePage[] = [
  {
    slug: "hilook-cctv-packages",
    group: "security",
    kicker: "HiLook CCTV",
    title: "Packages that match the property.",
    lede: "Four specified HiLook kits — from a four-camera home to stables and acreage — with labour and hardware starting prices, not a generic bundle dumped on the verandah.",
    image: "/scenes-new/home-cctv-kit.webp",
    points: ["Camera count from views, not a bundle", "Recorder and retention agreed", "Remote access included in the install"],
    body: [
      {
        heading: "Hardware follows the plan",
        copy: "We confirm power, network and mounting at each location before the kit is ordered. Compare Home Watch 4, Property Guard 6, Acreage 8 and Stable & Yard — they are starting specifications, not a promise that every property needs that camera count.",
      },
      {
        heading: "Labour and hardware, itemised",
        copy: "Package pages show starting prices for supply and install. Extra cable, extra height, solar at the gate and a recorder that has to live in a rack are quoted on top. VINCONNECT is not Hikvision or HiLook.",
      },
    ],
  },
  {
    slug: "stable-cctv",
    group: "security",
    kicker: "Stable cameras",
    title: "A closer eye on the stable.",
    lede: "Plan cameras, recording and remote access for your horse property.",
    image: "/scenes-new/stable-cameras-day.webp",
    points: ["Stable, arena and driveway views", "Dust and lighting taken seriously", "Alerts you can check from the house"],
    body: [
      {
        heading: "Part of the property network",
        copy: "Stable cameras only help if the link back to the house is reliable. Dust, metal sheds and odd power points are normal — the design starts there, not with a camera count from a catalogue.",
      },
      {
        heading: "Overnight is the point",
        copy: "If you cannot check a stall from the house or the road, the system is not finished. Recording and remote access are part of the same job.",
      },
    ],
  },
  {
    slug: "solar-cameras",
    group: "security",
    kicker: "Solar & remote cameras",
    title: "See what’s happening at the gate.",
    lede: "Solar and mobile-connected cameras for places beyond the home network — gates, dams, far paddocks.",
    image: "/scenes-new/gate-camera.webp",
    points: ["No trench to the front gate", "Mobile or long-range backhaul", "Power budget checked against shade"],
    body: [
      {
        heading: "Beyond the home network",
        copy: "If the house Wi-Fi cannot reach it, we do not pretend a mesh node will. Solar and mobile-connected cameras exist for gates, dams and far paddocks — with an honest power budget against shade.",
      },
      {
        heading: "Not a substitute for a property link",
        copy: "A solar camera at the gate is one view. It is not whole-property Wi-Fi. If you also need the shed online, that is a different radio.",
      },
    ],
  },
  {
    slug: "home-cctv",
    group: "security",
    kicker: "Home CCTV",
    title: "Entrances, yards and the driveway.",
    lede: "A home camera plan starts with the moments that matter: who is at the door, what is in the yard, and whether the cars are still there.",
    image: "/scenes-new/home-cctv-kit.webp",
    points: ["Front and rear coverage", "Recording you can review", "Clean internal routing"],
    body: [
      {
        heading: "Quiet and tidy",
        copy: "Cables and cameras should look like they belong on the house. Entrances, the driveway and the yard are the usual starting views — not a camera in every room.",
      },
      {
        heading: "Recording is the product",
        copy: "A live view on a phone is not a system. We agree retention and test playback before we leave.",
      },
    ],
  },
  {
    slug: "business-cctv",
    group: "security",
    kicker: "Business CCTV",
    title: "Operations you can review.",
    lede: "Small commercial sites, workshops and clubs need cameras that survive the working day and a recorder that is not sitting on the floor.",
    image: "/media/pakenham-commercial-factory.webp",
    points: ["Rack or cabinet placement", "Staff and public areas distinguished", "Retention to match the site"],
    body: [
      {
        heading: "Same standard as the home work",
        copy: "Presentation, labelling and a handover still apply. A recorder on the floor behind the counter is how footage disappears.",
      },
      {
        heading: "Clubs and workshops",
        copy: "The Cranbourne Cricket Club job is the reference: work with the rack that is already there, keep guest and operations apart, and write down what was left running.",
      },
    ],
  },
  {
    slug: "camera-planning",
    group: "security",
    kicker: "Camera planning",
    title: "Views first. Hardware second.",
    lede: "Mark the house, gate, stable and driveway on the planner, then we will talk camera counts with the distances in front of us.",
    image: "/scenes-new/property-cctv.webp",
    points: ["Use the property planner", "Note power at each place", "Decide recording before you buy cameras"],
    body: [
      {
        heading: "Bring a sketch",
        copy: "A marked plan beats a vague ‘four cameras out the front’ every time. Drop the house, gate, stable and driveway on the planner so distances are in front of both of us.",
      },
      {
        heading: "Counts come last",
        copy: "Home Watch 4, Property Guard 6 and Acreage 8 are starting kits. We will change a count when the views demand it, not to fill a carton.",
      },
    ],
  },
  {
    slug: "cctv-recording",
    group: "security",
    kicker: "Recording",
    title: "If it is not recorded, it did not happen.",
    lede: "Retention, remote playback and a recorder that stays powered through a short outage.",
    image: "/scenes-new/home-cctv-kit.webp",
    points: ["Days of retention agreed", "UPS considered with the rest of the network", "Remote playback tested at handover"],
    body: [
      {
        heading: "Power is part of security",
        copy: "A recorder that dies with the lights is not a security system. UPS is considered with the rest of the network, not as a surprise extra on the invoice.",
      },
      {
        heading: "Playback at handover",
        copy: "We test remote playback before we leave. If you cannot open the app on your own phone, the job is not finished.",
      },
    ],
  },
];

export function findService(slug: string) {
  return SERVICES.find((s) => s.slug === slug) ?? SECURITY.find((s) => s.slug === slug);
}

export type Project = {
  slug: string;
  place: string;
  areaSlug: string;
  title: string;
  summary: string;
  image: string;
};

export const PROJECTS: Project[] = [
  { slug: "cranbourne-cricket-club", place: "Cranbourne", areaSlug: "cranbourne", title: "Cranbourne Cricket Club", summary: "Starlink and Ubiquiti Wi-Fi replaced the club’s Telstra 4G connection, with FrogBox streaming and integration into the existing data rack.", image: "/media/cranbourne-cricket-club.webp" },
  { slug: "somerville-tripod-install", place: "Somerville", areaSlug: "somerville", title: "Somerville Tripod Installation", summary: "An Astrogear tripod mount provided a secure Starlink installation without roof penetrations.", image: "/media/somerville-tripod-install.webp" },
  { slug: "nyora-new-home-cctv", place: "Nyora", areaSlug: "nyora", title: "Nyora New Home & CCTV", summary: "Starlink was installed at a newly occupied home using a mount without roof penetrations and connected to the existing CCTV.", image: "/media/nyora-new-home-cctv.webp" },
  { slug: "pakenham-commercial-factory", place: "Pakenham", areaSlug: "pakenham", title: "Pakenham Commercial Factory", summary: "A factory rooftop Starlink installation, from mounting and cable runs through commissioning.", image: "/media/pakenham-commercial-factory.webp" },
  { slug: "pearcedale-five-acre-property", place: "Pearcedale", areaSlug: "pearcedale", title: "Pearcedale Five-Acre Property", summary: "Starlink and extended Wi-Fi connected the home, shed and workshop on a five-acre property.", image: "/media/pearcedale-five-acre-property.webp" },
  { slug: "safety-beach-concealed-install", place: "Safety Beach", areaSlug: "safety-beach", title: "Safety Beach Concealed Install", summary: "An Astrogear tripod installation on a double-storey, flat-roof home with concealed gutters.", image: "/media/safety-beach-concealed-install.webp" },
  { slug: "red-hill-multi-level-home", place: "Red Hill", areaSlug: "red-hill", title: "Red Hill Multi-Level Home", summary: "Starlink replaced unreliable fixed wireless at a large multi-level home overlooking the bay.", image: "/media/red-hill-multi-level-home.webp" },
  { slug: "botanic-ridge-double-storey", place: "Botanic Ridge", areaSlug: "botanic-ridge", title: "Botanic Ridge Double Storey", summary: "A double-storey fascia installation with Starlink connected to the customer’s existing UPS.", image: "/media/botanic-ridge-double-storey.webp" },
  { slug: "bittern-copper-nbn-upgrade", place: "Bittern", areaSlug: "bittern", title: "Bittern Copper NBN Upgrade", summary: "A professionally roof-mounted Starlink installation replaced an ageing copper NBN service.", image: "/media/bittern-copper-nbn-upgrade.webp" },
  { slug: "sorrento-coastal-home", place: "Sorrento", areaSlug: "sorrento", title: "Sorrento Coastal Home", summary: "A mounted Starlink system replaced an unreliable copper connection at an architectural coastal home.", image: "/media/sorrento-coastal-home.webp" },
  { slug: "caldermeade-rural-property", place: "Caldermeade", areaSlug: "caldermeade", title: "Caldermeade Rural Property", summary: "Starlink installed after the customer experienced slow fixed wireless and frequent dropouts.", image: "/media/caldermeade-rural-property.webp" },
  { slug: "clyde-new-estate-home", place: "Clyde", areaSlug: "clyde", title: "Clyde New Estate Home", summary: "A new home was connected where NBN and OptiComm infrastructure was not yet available.", image: "/media/clyde-new-estate-home.webp" },
  { slug: "lyndhurst-rental-home", place: "Lyndhurst", areaSlug: "lyndhurst", title: "Lyndhurst Rental Home", summary: "A rental-friendly mounting approach and cable entry through an existing Hills Home Hub cabinet.", image: "/media/lyndhurst-rental-home.webp" },
  { slug: "nyora-fixed-wireless-upgrade", place: "Nyora", areaSlug: "nyora", title: "Nyora Fixed Wireless Upgrade", summary: "A roof-mounted Starlink system replaced an unreliable fixed-wireless connection at a rural home.", image: "/media/nyora-fixed-wireless-upgrade.webp" },
  { slug: "tooradin-rural-install", place: "Tooradin", areaSlug: "tooradin", title: "Tooradin Rural Installation", summary: "Roof-mounted Starlink brought internet to a large rural property.", image: "/media/tooradin-rural-install.webp" },
  { slug: "cranbourne-east-upgrade", place: "Cranbourne East", areaSlug: "cranbourne-east", title: "Cranbourne East Upgrade", summary: "A mounted Starlink system addressed intermittent dropouts and a bottleneck in the home’s previous connection.", image: "/media/cranbourne-east-upgrade.webp" },
  { slug: "somerville-starlink-install", place: "Somerville", areaSlug: "somerville", title: "Somerville Starlink Installation", summary: "A completed Starlink installation in Somerville.", image: "/media/somerville-starlink-install.webp" },
  { slug: "cranbourne-west-roof-mount", place: "Cranbourne West", areaSlug: "cranbourne-west", title: "Cranbourne West Roof Mount", summary: "A double-storey installation using an Astrogear tripod roof mount without roof penetrations.", image: "/media/cranbourne-west-roof-mount.webp" },
];
