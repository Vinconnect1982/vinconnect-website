import type { Article } from "./types";
import { DISCUSS_CTA } from "./types";

const crumbs = (label: string): Article["crumbs"] => [
  { label: "Solutions", href: "/solutions" },
  { label },
];

function page(partial: Omit<Article, "cluster" | "cta" | "form" | "related"> & { related?: Article["related"]; form?: Article["form"] }): Article {
  return {
    cluster: "solutions",
    cta: DISCUSS_CTA,
    form: { type: "contact", package: partial.title, button: "Discuss my project", messageLabel: "Tell us about the property and what has to work" },
    ...partial,
  };
}

export const SOLUTIONS: Article[] = [
  page({
    path: "/solutions",
    slug: "index",
    kicker: "Solutions",
    title: "Built around the property, not a product name",
    lede: "Homes, rural acreage, horse properties, small businesses, clubs and caravans use the same trades — Starlink, Wi-Fi, wireless links, CCTV — in different combinations. Start here if you think in property type rather than product.",
    description:
      "VINCONNECT solutions by property type: homes, rural properties, horse properties, businesses and clubs, caravans and new estates across South East Victoria.",
    image: "/scenes-new/acreage-network.webp",
    crumbs: [{ label: "Solutions" }],
    children: [
      { href: "/solutions/homes", title: "Homes", copy: "Estates, rentals and family houses that need the internet to work." },
      { href: "/solutions/rural-properties", title: "Rural properties", copy: "House plus the buildings that earn their keep." },
      { href: "/solutions/horse-properties", title: "Horse properties", copy: "Stables, yards, house and gate on one plan." },
      { href: "/solutions/businesses-and-clubs", title: "Businesses and clubs", copy: "Workshops, factories, cricket clubs, site offices." },
      { href: "/solutions/caravans-and-touring", title: "Caravans and touring", copy: "Parked use and power, not a house kit on a hitch." },
      { href: "/solutions/new-estates", title: "New estates", copy: "When NBN or OptiComm has not turned up yet." },
    ],
    sections: [
      {
        heading: "How to use this cluster",
        copy: [
          "These pages are the map. The service pages are how we quote. Customer Help is how the visit runs. If you already know you want a dish on the roof, Check My Install Price is the faster door.",
        ],
      },
    ],
    related: [
      { href: "/services", label: "All services" },
      { href: "/projects", label: "Completed installations" },
      { href: "/property-planner", label: "Property planner" },
      { href: "/estimate", label: "Check My Install Price" },
    ],
  }),
  page({
    path: "/solutions/homes",
    slug: "homes",
    kicker: "Solutions",
    title: "Homes",
    lede: "A working connection for work, school and calls. Then Wi-Fi that reaches the rooms you use, and cameras if you asked for them — not a stack of kits you cannot name.",
    description:
      "Starlink, Wi-Fi and CCTV for homes across Casey, Cardinia, the Mornington Peninsula and Gippsland.",
    crumbs: crumbs("Homes"),
    image: "/scenes-new/peninsula-home.webp",
    sections: [
      {
        heading: "Typical shape",
        copy: [
          "Starlink or an existing service at the wall, whole-home Wi-Fi if the retailer mesh is not cutting it, and a Home Watch or Property Guard camera kit if you want recording. Staged is fine.",
        ],
      },
    ],
    related: [
      { href: "/services/starlink-installation", label: "Starlink installation" },
      { href: "/security/home-cctv", label: "Home CCTV" },
      { href: "/security/packages/home-watch", label: "Home Watch 4" },
      { href: "/projects", label: "Home projects" },
    ],
  }),
  page({
    path: "/solutions/rural-properties",
    slug: "rural-properties",
    kicker: "Solutions",
    title: "Rural properties",
    lede: "The house is one building. The place is several. Dish, links, Wi-Fi and cameras only make sense on a sketch with distances on it.",
    description:
      "Rural connectivity solutions for Victorian farms and acreage: Starlink, wireless links, whole-property Wi-Fi and CCTV.",
    crumbs: crumbs("Rural properties"),
    image: "/scenes-new/cattle-farm.webp",
    sections: [
      {
        heading: "Start with what must stay up",
        copy: [
          "Office, pumps, cameras, a second dwelling, the gate. Everything else can wait a stage. Rural Connections exists if you also want the community conversation — grants are not the public story, people are.",
        ],
      },
    ],
    related: [
      { href: "/services/rural-connectivity", label: "Rural connectivity" },
      { href: "/property-networks", label: "Property networks" },
      { href: "/rural-connections", label: "Rural Connections" },
      { href: "/security/packages/acreage", label: "Acreage 8 cameras" },
    ],
  }),
  page({
    path: "/solutions/horse-properties",
    slug: "horse-properties",
    kicker: "Solutions",
    title: "Horse properties",
    lede: "Stables at 2am, a gate on a public road, and a house that still needs to take a call. Equestrian work is a property network with animals in the plan.",
    description:
      "Connectivity and CCTV for horse properties in Cardinia, the Peninsula, Bass Coast and Gippsland.",
    crumbs: crumbs("Horse properties"),
    image: "/scenes-new/stable-cameras-day.webp",
    sections: [
      {
        heading: "Design around the yards",
        copy: [
          "Metal sheds, dust, and radios that have to live outside. Indoor mesh from the kitchen will not cover a foaling stable. Tell us which buildings matter overnight.",
        ],
      },
    ],
    related: [
      { href: "/services/equestrian-connectivity", label: "Equestrian connectivity" },
      { href: "/property-networks/equestrian", label: "Equestrian networks" },
      { href: "/security/stable-cctv", label: "Stable CCTV" },
      { href: "/security/packages/stable-yard", label: "Stable & Yard package" },
    ],
  }),
  page({
    path: "/solutions/businesses-and-clubs",
    slug: "businesses-and-clubs",
    kicker: "Solutions",
    title: "Businesses and clubs",
    lede: "A factory roof, a cricket club streaming a match, a workshop that still runs on a hotspot. Commercial work gets a cabinet, a label, and a handover someone else can follow.",
    description:
      "Starlink, Wi-Fi and CCTV for small commercial sites, workshops and community clubs in South East Victoria.",
    crumbs: crumbs("Businesses and clubs"),
    image: "/media/projects/cranbourne-cricket-club.webp",
    sections: [
      {
        heading: "Examples already on the site",
        copy: [
          "Cranbourne Cricket Club — Starlink and Wi-Fi into an existing rack, FrogBox streaming. Pakenham factory — rooftop dish, cable, commissioning. Those are completed jobs.",
        ],
      },
      {
        heading: "Committees and quotes",
        copy: [
          "Capability statement and the Event Link one-pager exist for meetings. Event connectivity for shows and field days sits under Event Link, not under this page.",
        ],
      },
    ],
    related: [
      { href: "/services/community-connectivity", label: "Business and community networks" },
      { href: "/security/business-cctv", label: "Business CCTV" },
      { href: "/event-link", label: "Event Link" },
      { href: "/about/capability", label: "Capability statement" },
    ],
  }),
  page({
    path: "/solutions/caravans-and-touring",
    slug: "caravans-and-touring",
    kicker: "Solutions",
    title: "Caravans and touring",
    lede: "Parked use, power that will last the night, and a Mini kit when that is honestly enough. Not a residential install glued to a van.",
    description:
      "Starlink for caravans and touring: portable versus permanent, power, and Mini kits. VINCONNECT, Victoria.",
    crumbs: crumbs("Caravans and touring"),
    image: "/travel/caravan-river.webp",
    sections: [
      {
        heading: "Tell us how you travel",
        copy: [
          "Weekenders on a driveway are a different job to months off-grid. Power is half of it. The caravan service pages and the Mini guide split the rest.",
        ],
      },
    ],
    related: [
      { href: "/services/starlink-caravan-installation", label: "Caravan Starlink" },
      { href: "/services/caravan-starlink-power", label: "Caravan power" },
      { href: "/starlink/mini", label: "Starlink Mini" },
      { href: "/starlink/caravan-and-touring", label: "Touring guide" },
    ],
  }),
  page({
    path: "/solutions/new-estates",
    slug: "new-estates",
    kicker: "Solutions",
    title: "New estates",
    lede: "The house is finished. The pit is not. Starlink is often the working answer until NBN or OptiComm turns up — and sometimes it stays.",
    description:
      "Starlink for new estate homes in Clyde, Cranbourne and Casey South East while NBN or OptiComm is not yet available.",
    crumbs: crumbs("New estates"),
    image: "/media/projects/clyde-new-estate-home.webp",
    sections: [
      {
        heading: "What we need to know",
        copy: [
          "Storey count, whether you rent or own, and whether the dish has to come off later. A tripod can be the civil answer on a new roof someone still has a warranty on.",
        ],
      },
    ],
    related: [
      { href: "/starlink/home-installation", label: "Home Starlink guide" },
      { href: "/service-areas/region/casey-south-east", label: "Casey & South East" },
      { href: "/projects/clyde-new-estate-home", label: "Clyde estate project" },
      { href: "/estimate", label: "Check My Install Price" },
    ],
  }),
];
