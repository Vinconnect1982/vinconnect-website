import type { RelatedLink } from "./pages/types";

export type ProjectKind = "home" | "rural" | "commercial" | "club" | "coastal";

export type ProjectDetail = {
  kind: ProjectKind;
  mount?: string;
  works: string[];
  note: string;
  guides: RelatedLink[];
};

const HOME: RelatedLink[] = [
  { href: "/starlink/home-installation", label: "Home Starlink" },
  { href: "/customer-help/standard-install-scope", label: "Standard install scope" },
  { href: "/estimate", label: "Check My Install Price" },
];

const RURAL: RelatedLink[] = [
  { href: "/starlink/rural-properties", label: "Rural Starlink" },
  { href: "/property-networks", label: "Property networks" },
  { href: "/solutions/rural-properties", label: "Rural solutions" },
];

const COASTAL: RelatedLink[] = [
  { href: "/starlink/roof-wall-and-tripod", label: "Roof, wall and tripod" },
  { href: "/starlink/double-storey", label: "Double-storey" },
  { href: "/solutions/homes", label: "Home solutions" },
];

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "cranbourne-cricket-club": {
    kind: "club",
    mount: "Installed into the club’s existing data rack",
    works: [
      "Starlink as the upstream internet",
      "Ubiquiti Wi-Fi for the rooms that needed coverage",
      "FrogBox streaming integrated with the existing rack",
      "Replaced a Telstra 4G connection that had been carrying the club",
    ],
    note: "A community venue, not a house. Guest Wi-Fi and the club’s own network stay apart — the same idea as Event Link, on a permanent site.",
    guides: [
      { href: "/solutions/businesses-and-clubs", label: "Businesses and clubs" },
      { href: "/services/community-connectivity", label: "Community networks" },
      { href: "/event-link", label: "Event Link" },
    ],
  },
  "somerville-tripod-install": {
    kind: "home",
    mount: "Astrogear tripod — no roof penetrations",
    works: ["Starlink on a non-penetrating tripod", "Secure mount chosen instead of a tile hole"],
    note: "Tripod mounts are how we keep a roof intact when the structure, the landlord or the look of the place asks for it.",
    guides: [
      { href: "/starlink/roof-wall-and-tripod", label: "Roof, wall and tripod" },
      ...HOME,
    ],
  },
  "nyora-new-home-cctv": {
    kind: "rural",
    mount: "Non-penetrating mount on a newly occupied home",
    works: ["Starlink at a new home", "Mount without roof penetrations", "Connected to the existing CCTV"],
    note: "A new house still needs a sky view and a cable route. Cameras only help if they sit on a network that stays up.",
    guides: [
      { href: "/resources/cctv-on-starlink", label: "CCTV on Starlink" },
      { href: "/security", label: "CCTV cluster" },
      ...RURAL,
    ],
  },
  "pakenham-commercial-factory": {
    kind: "commercial",
    mount: "Factory rooftop",
    works: ["Rooftop Starlink mount", "Cable runs through commissioning", "A working commercial connection, not a consumer router on a windowsill"],
    note: "Commercial roofs have wind, access and existing plant to work around. This page is the finished job, not a price list.",
    guides: [
      { href: "/solutions/businesses-and-clubs", label: "Businesses and clubs" },
      { href: "/services/starlink-installation", label: "Starlink installation" },
      { href: "/property-networks/network-cabinets", label: "Network cabinets" },
    ],
  },
  "pearcedale-five-acre-property": {
    kind: "rural",
    mount: "Starlink on the house verandah beam, then the rest of the property",
    works: ["Starlink at the house", "Extended Wi-Fi to the shed and workshop", "Five-acre distances treated as a network, not a bigger mesh kit"],
    note: "Acreage fails at the second building, not at the dish. The planner is how we talk about that before anyone quotes a radio.",
    guides: RURAL,
  },
  "safety-beach-concealed-install": {
    kind: "coastal",
    mount: "Astrogear tripod on a double-storey flat roof with concealed gutters",
    works: ["Non-penetrating tripod", "Double-storey access", "Concealed-gutter detailing instead of a default fascia clip"],
    note: "Concealed gutters and flat roofs are why we ask for photos. A standard fascia clip is not a plan.",
    guides: COASTAL,
  },
  "red-hill-multi-level-home": {
    kind: "coastal",
    mount: "Tripod on the metal roof, looking over the bay",
    works: ["Replaced unreliable fixed wireless", "Sky view over a bay-facing multi-level home"],
    note: "Fixed wireless that looks fine on a map is often not fine on a hill. This was the installation at that house. It is not a promise about every tree on the ridge.",
    guides: [
      { href: "/resources/fixed-wireless-vs-starlink", label: "Fixed wireless vs Starlink" },
      ...COASTAL,
    ],
  },
  "botanic-ridge-double-storey": {
    kind: "home",
    mount: "Double-storey fascia, connected to the customer’s existing UPS",
    works: ["Fascia mount on a double-storey home", "Starlink powered through the existing UPS"],
    note: "Book double-storey as double-storey. UPS is useful only if the dish and the router are actually on it.",
    guides: [
      { href: "/starlink/double-storey", label: "Double-storey" },
      { href: "/customer-help/double-storey-and-access", label: "Access on the day" },
      ...HOME,
    ],
  },
  "bittern-copper-nbn-upgrade": {
    kind: "home",
    mount: "Roof-mounted Starlink",
    works: ["Professional roof mount", "Replaced an ageing copper NBN service"],
    note: "Copper that still has a light on the socket is not the same as a connection you can work on. Hardware and the Starlink plan stay on the customer’s account.",
    guides: [
      { href: "/starlink/existing-nbn", label: "Living with existing NBN" },
      ...HOME,
    ],
  },
  "sorrento-coastal-home": {
    kind: "coastal",
    mount: "Mounted Starlink on an architectural coastal home",
    works: ["Replaced an unreliable copper connection", "Mount chosen for a coastal, architectural roof"],
    note: "Coastal wind and a roof that was designed to be looked at both matter. We do not default to the cheapest bracket.",
    guides: COASTAL,
  },
  "caldermeade-rural-property": {
    kind: "rural",
    mount: "Rural Starlink after slow, dropout-prone fixed wireless",
    works: ["Starlink on a large rural lot", "Addressed slow fixed wireless and frequent dropouts"],
    note: "Cardinia swamp country and long lots are why a house-only install is sometimes only step one.",
    guides: RURAL,
  },
  "clyde-new-estate-home": {
    kind: "home",
    mount: "Pole mount on the concrete tile roof",
    works: ["Connected a new home", "NBN and OptiComm were not yet available"],
    note: "Estates in Clyde and Cranbourne East often need a working connection before the street is finished. That is the installation. It is not a date for when NBN will arrive.",
    guides: [
      { href: "/solutions/new-estates", label: "New estates" },
      ...HOME,
    ],
  },
  "lyndhurst-rental-home": {
    kind: "home",
    mount: "Fascia bracket under the gutter, cable into the existing cabinet",
    works: ["Non-destructive mounting approach", "Internal finish into an existing cabinet"],
    note: "Rentals and body corporate rules belong in the enquiry, not as a surprise on the ladder.",
    guides: [
      { href: "/starlink/roof-wall-and-tripod", label: "Roof, wall and tripod" },
      { href: "/property-networks/network-cabinets", label: "Network cabinets" },
      ...HOME,
    ],
  },
  "nyora-fixed-wireless-upgrade": {
    kind: "rural",
    mount: "Roof-mounted Starlink at a rural home",
    works: ["Replaced an unreliable fixed-wireless connection", "Roof mount chosen for the sky view on site"],
    note: "South Gippsland fixed wireless is a recurring story. The photograph is the job; the street address stays off the page.",
    guides: [
      { href: "/resources/fixed-wireless-vs-starlink", label: "Fixed wireless vs Starlink" },
      ...RURAL,
    ],
  },
  "tooradin-rural-install": {
    kind: "rural",
    mount: "Roof-mounted Starlink on a large rural property",
    works: ["Roof-mounted Starlink", "Internet to a large rural property on Western Port"],
    note: "A large property still starts with sky view at the dish. Sheds and gates are a separate conversation if they need coverage of their own.",
    guides: RURAL,
  },
  "cranbourne-east-upgrade": {
    kind: "home",
    mount: "Gable mount on the metal roof",
    works: ["Addressed intermittent dropouts", "Removed a bottleneck in the previous connection"],
    note: "Dropouts in a new estate are often the service, the Wi-Fi, or both. The visit is how we tell the difference.",
    guides: HOME,
  },
  "somerville-starlink-install": {
    kind: "home",
    mount: "Fascia mount on the alfresco",
    works: ["Starlink installed in Somerville"],
    note: "The mount and cable were confirmed on site. This page shows that installation.",
    guides: HOME,
  },
  "cranbourne-west-roof-mount": {
    kind: "home",
    mount: "Pole mount on the concrete tile roof",
    works: ["Double-storey access", "Pole mount on the tile roof"],
    note: "The photograph shows a pole on the tiles, not a tripod. Double-storey still has to be booked as double-storey.",
    guides: [
      { href: "/starlink/double-storey", label: "Double-storey" },
      { href: "/starlink/roof-wall-and-tripod", label: "Roof, wall and tripod" },
      ...HOME,
    ],
  },
};

export const REGION_RELATED: Record<string, RelatedLink[]> = {
  "casey-south-east": [
    { href: "/solutions/new-estates", label: "New estates", copy: "When NBN or OptiComm has not turned up." },
    { href: "/starlink/double-storey", label: "Double-storey installs" },
    { href: "/starlink/home-installation", label: "Home Starlink" },
    { href: "/customer-help", label: "Customer help" },
  ],
  cardinia: [
    { href: "/solutions/rural-properties", label: "Rural properties" },
    { href: "/solutions/businesses-and-clubs", label: "Commercial sites" },
    { href: "/property-networks", label: "Property networks" },
    { href: "/rural-connections", label: "Rural Connections" },
  ],
  "mornington-peninsula": [
    { href: "/starlink/roof-wall-and-tripod", label: "Tripod and coastal roofs" },
    { href: "/starlink/existing-nbn", label: "Copper and NBN upgrades" },
    { href: "/starlink/double-storey", label: "Double-storey" },
    { href: "/solutions/homes", label: "Home solutions" },
  ],
  "western-port-bass-coast": [
    { href: "/starlink/rural-properties", label: "Rural Starlink" },
    { href: "/solutions/rural-properties", label: "Rural solutions" },
    { href: "/security/solar-and-gate", label: "Gates and remote cameras" },
    { href: "/rural-connections", label: "Rural Connections" },
  ],
  "south-gippsland": [
    { href: "/solutions/horse-properties", label: "Horse properties" },
    { href: "/resources/fixed-wireless-vs-starlink", label: "Fixed wireless vs Starlink" },
    { href: "/rural-connections/roadshow-dates", label: "Roadshow dates" },
    { href: "/property-networks/equestrian", label: "Equestrian networks" },
  ],
  "west-gippsland-latrobe": [
    { href: "/rural-connections", label: "Rural Connections" },
    { href: "/event-link", label: "Event Link" },
    { href: "/solutions/rural-properties", label: "Rural properties" },
    { href: "/starlink/rural-properties", label: "Rural Starlink" },
  ],
  "inner-south-east": [
    { href: "/starlink/home-installation", label: "Home Starlink" },
    { href: "/property-networks/network-cabinets", label: "Cabinets" },
    { href: "/security/home-and-acreage", label: "Home cameras" },
    { href: "/customer-help", label: "Customer help" },
  ],
};
