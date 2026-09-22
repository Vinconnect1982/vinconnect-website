import type { Article } from "./types";
import { PLAN_CTA } from "./types";

const crumbs = (label: string): Article["crumbs"] => [
  { label: "Property networks", href: "/property-networks" },
  { label },
];

const related: Article["related"] = [
  { href: "/services/whole-property-wifi", label: "Whole-property Wi-Fi" },
  { href: "/services/wireless-links", label: "Wireless building links" },
  { href: "/property-planner", label: "Property planner" },
  { href: "/solutions/rural-properties", label: "Rural property solutions" },
];

function page(partial: Omit<Article, "cluster" | "cta" | "form" | "related"> & { related?: Article["related"]; form?: Article["form"] }): Article {
  return {
    cluster: "property-networks",
    cta: PLAN_CTA,
    form: { type: "contact", package: partial.title, button: "Discuss my property", messageLabel: "Buildings, distances and what has to stay online" },
    ...partial,
    related: partial.related ?? related,
  };
}

export const PROPERTY_NETWORKS: Article[] = [
  page({
    path: "/property-networks",
    slug: "index",
    kicker: "Property networks",
    title: "Internet in the house is not the same as a property that works",
    lede: "Whole-property Wi-Fi, wireless links to sheds and stables, cabinets, and the difference between a mesh kit from a retailer and a network you can still explain in two years.",
    description:
      "Property network guides for Victorian homes, farms and horse properties: whole-property Wi-Fi, point-to-point links, multi-building networks and cabinets. Plan before you buy hardware.",
    image: "/scenes/whole-home-wifi.webp",
    crumbs: [{ label: "Property networks" }],
    children: [
      { href: "/property-networks/whole-property-wifi", title: "Whole-property Wi-Fi", copy: "Rooms, verandahs and the yard you actually use." },
      { href: "/property-networks/wireless-building-links", title: "Wireless building links", copy: "Internet to the shed without a 200-metre trench." },
      { href: "/property-networks/point-to-point", title: "Point-to-point", copy: "Dedicated links with a measured path." },
      { href: "/property-networks/multi-building", title: "Multi-building networks", copy: "House, workshop, stables, gate." },
      { href: "/property-networks/network-cabinets", title: "Network cabinets", copy: "A labelled box instead of a powerboard nest." },
      { href: "/property-networks/equestrian", title: "Equestrian properties", copy: "Yards, stables and the house on one plan." },
    ],
    sections: [
      {
        heading: "Starlink gets you to the wall",
        copy: [
          "After that, radio takes over. We use TP-Link Omada when a managed property network is the right tool. We are not TP-Link, and a consumer mesh from a retailer is still the right answer for some houses — we will say so.",
        ],
      },
      {
        heading: "Measure before you shop",
        copy: [
          "The property planner exists so you can mark buildings and distances before anyone talks hardware. A five-acre sketch beats a shopping list every time.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can this be staged?",
        a: "Yes. Dish first, house Wi-Fi second, shed link when the budget is there. We would rather stage it than oversell a cabinet you do not need yet.",
      },
    ],
  }),
  page({
    path: "/property-networks/whole-property-wifi",
    slug: "whole-property-wifi",
    kicker: "Property networks",
    title: "Whole-property Wi-Fi",
    lede: "The office, the back verandah, the kids’ rooms and the place you actually take calls. Coverage is a plan, not a bigger retail router.",
    description:
      "Whole-property Wi-Fi planning for Victorian homes and rural properties. VINCONNECT designs around how you live, then installs it.",
    crumbs: crumbs("Whole-property Wi-Fi"),
    image: "/scenes/whole-home-wifi.webp",
    sections: [
      {
        heading: "Start with rooms that matter",
        copy: [
          "A heat map of the hallway is useless if the dead zone is the office or the stables kitchen. Tell us where calls drop. That is the design brief.",
        ],
      },
      {
        heading: "Brick, metal and water tanks",
        copy: [
          "Victorian rural builds are hard on indoor Wi-Fi. Sometimes the honest answer is an outdoor access point or a dedicated link, not a third mesh node in the lounge.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will you reuse the nodes I already bought?",
        a: "If they are fit for the job. We will not build a property network on hardware that cannot be managed or replaced in a year.",
      },
    ],
  }),
  page({
    path: "/property-networks/wireless-building-links",
    slug: "wireless-building-links",
    kicker: "Property networks",
    title: "Internet to sheds and buildings",
    lede: "A dedicated wireless link is not ‘turning the house Wi-Fi up’. It is a planned path, two ends that can see each other, and power at both.",
    description:
      "Wireless building-to-building links for Victorian properties. VINCONNECT plans line of sight, power and what the far building actually needs.",
    crumbs: crumbs("Wireless building links"),
    image: "/scenes/building-links.webp",
    sections: [
      {
        heading: "Line of sight",
        copy: [
          "Trees, hay sheds and new barns appear in the path after the quote if nobody walked it. The planner and a site photo from each end save that argument.",
        ],
      },
      {
        heading: "What the far end needs",
        copy: [
          "A workshop with four cameras is not the same job as a tack room that needs email. We size the link and the far-end Wi-Fi to the building, not to a catalogue.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you run fibre instead?",
        a: "Sometimes, if there is an existing conduit and a reason. Most rural jobs are wireless because the trench is the expensive part.",
      },
    ],
  }),
  page({
    path: "/property-networks/point-to-point",
    slug: "point-to-point",
    kicker: "Property networks",
    title: "Point-to-point links",
    lede: "A measured path between two places that must stay up: house to gate, office to factory floor, clubrooms to the oval.",
    description:
      "Point-to-point wireless links installed by VINCONNECT across South East Melbourne, the Peninsula and Gippsland.",
    crumbs: crumbs("Point-to-point"),
    image: "/scenes/building-links.webp",
    sections: [
      {
        heading: "Dedicated on purpose",
        copy: [
          "Point-to-point is for when a shared Wi-Fi umbrella is the wrong tool. Cameras, a second dwelling, or a site that cannot share the house SSID.",
        ],
      },
      {
        heading: "Mounting and wind",
        copy: [
          "A dish on a pole that moves is a link that drops. Mounts and the structure they sit on are part of the quote, not an afterthought.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is this the same as Starlink?",
        a: "No. Starlink is the internet arriving from the sky. Point-to-point is how that internet crosses your place.",
      },
    ],
    related: [
      { href: "/services/point-to-point-links", label: "Point-to-point service" },
      { href: "/services/wireless-links", label: "Wireless links service" },
      { href: "/property-planner", label: "Property planner" },
    ],
  }),
  page({
    path: "/property-networks/multi-building",
    slug: "multi-building",
    kicker: "Property networks",
    title: "Multi-building networks",
    lede: "House, shed, stables, gate hut. One plan so you are not running four unrelated kits with four passwords.",
    description:
      "Multi-building property networks in Victoria: staged design from the house outwards, with Starlink or existing internet as the upstream.",
    crumbs: crumbs("Multi-building"),
    image: "/scenes-new/acreage-network.webp",
    sections: [
      {
        heading: "Name the buildings",
        copy: [
          "If it has power and a job to do, it belongs on the sketch. Guest Wi-Fi at the house can stay apart from cameras at the gate. That is a design choice, not a default.",
        ],
      },
      {
        heading: "Stage it",
        copy: [
          "Most properties do not need every building on day one. We will quote a backbone that can take the next hop without throwing the first cabinet out.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can cameras share the same links?",
        a: "Yes, when the link and the recorder are planned together. Do not add eight cameras to a house mesh and hope.",
      },
    ],
  }),
  page({
    path: "/property-networks/network-cabinets",
    slug: "network-cabinets",
    kicker: "Property networks",
    title: "Network cabinets",
    lede: "A labelled cabinet is how the next person — including you, in two years — understands the place. A powerboard behind the fridge is not a network.",
    description:
      "Network cabinet installation and dressing for homes, farms and small commercial sites in Victoria.",
    crumbs: crumbs("Network cabinets"),
    image: "/scenes-new/network-cabinet.webp",
    sections: [
      {
        heading: "What belongs in the box",
        copy: [
          "Router, switch, recorder, labelled patching, power that will survive a short outage if you asked for it. Ventilation. A door that closes.",
        ],
      },
      {
        heading: "Where it sits",
        copy: [
          "Not in a hot tin shed if we can help it, and not in a sealed TV cabinet. Garage and rack placement of a Starlink router is a specified extra on a standard dish install — it is not assumed.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you use the Hills Home Hub that is already there?",
        a: "Often. Lyndhurst is an example where an existing cabinet was the right entry. We will say if it is too small or too hot.",
      },
    ],
    related: [
      { href: "/services/network-cabinets", label: "Network cabinets service" },
      { href: "/starlink/cable-entry-and-router", label: "Router placement" },
      { href: "/security", label: "CCTV cluster" },
    ],
  }),
  page({
    path: "/property-networks/equestrian",
    slug: "equestrian",
    kicker: "Property networks",
    title: "Equestrian property networks",
    lede: "House, stables, yards and the gate. Cameras and Wi-Fi only work here if the plan respects horses, metal sheds and the way a property is actually ridden.",
    description:
      "Wi-Fi, wireless links and camera planning for horse properties across Cardinia, the Peninsula and Gippsland.",
    crumbs: crumbs("Equestrian"),
    image: "/scenes-new/horse-property.webp",
    sections: [
      {
        heading: "The property is the client",
        copy: [
          "A node in the lounge does not cover the foaling stable. Outdoor access and a dedicated link are the usual pattern. Tell us which buildings must stay up at 2am.",
        ],
      },
      {
        heading: "Cameras belong on the same sketch",
        copy: [
          "Stable CCTV without a network plan is how recorders end up on a tack-room shelf. Design both, even if you only buy cameras later.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will you work around horses on the day?",
        a: "Yes, if you tell us the paddock plan. We are not a surprise in the laneway.",
      },
    ],
    related: [
      { href: "/services/equestrian-connectivity", label: "Equestrian connectivity" },
      { href: "/security/stable-cctv", label: "Stable cameras" },
      { href: "/solutions/horse-properties", label: "Horse property solutions" },
      { href: "/security/packages/stable-yard", label: "Stable & Yard package" },
    ],
  }),
];
