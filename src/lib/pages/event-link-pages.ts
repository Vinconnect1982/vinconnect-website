import type { Article } from "./types";

const CTA = {
  primary: { label: "Request Event Connectivity", href: "/event-link/organisers" },
  secondary: { label: "Call 0408 559 555", href: "tel:0408559555" },
};

const crumbs = (label: string): Article["crumbs"] => [
  { label: "Event Link", href: "/event-link" },
  { label },
];

function page(partial: Omit<Article, "cluster" | "cta" | "form" | "related"> & { related?: Article["related"]; form?: Article["form"] }): Article {
  return {
    cluster: "event-link",
    cta: CTA,
    form: {
      type: "event-link",
      package: partial.title,
      button: "Request event connectivity",
      messageLabel: "Event, dates, expected people, and what has to stay online",
    },
    ...partial,
  };
}

export const EVENT_LINK_PAGES: Article[] = [
  page({
    path: "/event-link/mini",
    slug: "mini",
    kicker: "Event Link Mini",
    title: "Event Link Mini",
    lede: "A smaller Starlink and Wi-Fi kit for club days, trials and committee areas. We can plan it with you. It is not a finished showgrounds network, and it is not something you can buy off the shelf.",
    description:
      "VINCONNECT Event Link Mini: compact event connectivity for rural clubs and smaller gatherings. Design and proposal examples only. Not a certified product.",
    image: "/scenes-new/event-link-kit.jpg",
    crumbs: crumbs("Mini"),
    status:
      "Event Link Mini is the smaller end of the 2026–27 pilot. There is no public price list and no certification claim. A layout drawn for a particular event stays private until that event is booked and delivered.",
    points: [
      "Starlink upstream, usually a Mini or residential kit as scoped",
      "A short guest Wi-Fi umbrella for the hub or committee area",
      "Pack-down that a volunteer can repeat",
      "Not a carrier-grade showgrounds network",
    ],
    sections: [
      {
        heading: "What Mini is for",
        copy: [
          "Sheepdog trials, club meetings, a field-day hub, a site office. Places where a phone hotspot is the current plan and a labelled case would already be an improvement.",
        ],
      },
      {
        heading: "What Mini is not",
        copy: [
          "It is not a promise to cover an entire showgrounds. It is not a substitute for a venue’s existing paid Wi-Fi contract. It is not a finished product with a waterproof rating, a launch date or a public price.",
          "A layout prepared for one event stays a proposal until that event is booked and delivered. We will not show it here as a finished job.",
        ],
      },
      {
        heading: "How it sits with Event Link",
        copy: [
          "The main Event Link page is the pilot brief. Organisers register interest there. Mini is the smaller end of the same thinking. The full platform page is a longer-term development concept, not something you can order this season.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you quote Mini for our show?",
        a: "Yes, as a scoped job for that event. There is no public price card. Tell us the dates, how many people, and what has to stay online.",
      },
      {
        q: "Is Mini a product I can order?",
        a: "Not yet. It is part of the 2026–27 pilot. We quote it for a specific event. We do not sell it as a boxed product.",
      },
    ],
    related: [
      { href: "/event-link", label: "Event Link pilot" },
      { href: "/event-link/organisers", label: "For organisers" },
      { href: "/event-link/platform", label: "Event Link platform" },
      { href: "/event-link/community-events", label: "Community events" },
      { href: "/rural-connections/roadshow", label: "Rural Connections Roadshow" },
    ],
  }),
  page({
    path: "/event-link/platform",
    slug: "platform",
    kicker: "Development concept",
    title: "Event Link platform",
    lede: "A longer-term idea: repeatable event connectivity with labelled hardware, guest and operations networks, and a pack-down that does not live in one person’s head. It is a development concept, not a certified product you can buy this week.",
    description:
      "VINCONNECT Event Link platform is a development concept for repeatable rural event connectivity. Not certified, not priced, not available to order as a product.",
    crumbs: crumbs("Platform"),
    image: "/scenes-new/event-link-kit.jpg",
    status:
      "Development concept only. No certification, IP rating, launch date, price or availability is claimed. The 2026–27 pilot and organiser register are the live conversation.",
    sections: [
      {
        heading: "Not a product yet",
        copy: [
          "Organisers ask whether Event Link becomes something you can buy. Not yet. The pilot is how we learn what a Victorian showground actually needs.",
        ],
      },
      {
        heading: "What the concept includes on paper",
        copy: [
          "Starlink upstream, managed Wi-Fi, a guest network kept apart from operations, labelled cases, and a handover a volunteer can run. Community Wi-Fi does not require a marketing opt-in.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can we wait for the platform instead of the pilot?",
        a: "If you have a 2026–27 date, talk to us about the pilot. Waiting on an uncertified concept is how a show day arrives with a hotspot.",
      },
    ],
    related: [
      { href: "/event-link", label: "Event Link pilot" },
      { href: "/event-link/mini", label: "Event Link Mini" },
      { href: "/event-link/organisers", label: "For organisers" },
      { href: "/rural-connections", label: "Rural Connections" },
    ],
  }),
  page({
    path: "/event-link/community-events",
    slug: "community-events",
    kicker: "Event Link",
    title: "Community events and field days",
    lede: "Shows, trials, club days and rural gatherings that currently run on a phone. Event Link is the connectivity conversation. The Roadshow is the in-person hub. They are related, not the same booking.",
    description:
      "Event connectivity for Victorian agricultural shows, field days, sheepdog trials and rural club events. VINCONNECT Event Link pilot.",
    crumbs: crumbs("Community events"),
    image: "/scenes-new/rural-event.jpg",
    sections: [
      {
        heading: "What we need from an organiser",
        copy: [
          "Date, venue, expected people, whether the hub is public or committee-only, and whether you already have a Starlink plan. Power on site. A contact who will be there when we stand it up.",
        ],
      },
      {
        heading: "Roadshow versus Event Link",
        copy: [
          "Rural Connections Roadshow is people, shade, free Wi-Fi and farmer-health resources inside an existing event. Event Link is the kit that can make that Wi-Fi exist. Booking one is not automatic booking of the other.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is this free because it is community?",
        a: "Community Wi-Fi at a Roadshow hub is not a lead-capture product. Standing up Event Link for an organiser is a scoped activation and is quoted.",
      },
    ],
    related: [
      { href: "/event-link", label: "Event Link" },
      { href: "/event-link/organisers", label: "For organisers" },
      { href: "/rural-connections/roadshow", label: "Roadshow hub" },
      { href: "/resources/downloads/event-link-onepager", label: "Event Link one-pager" },
    ],
  }),
  page({
    path: "/event-link/what-is-included",
    slug: "what-is-included",
    kicker: "Event Link",
    title: "What an Event Link activation includes",
    lede: "Starlink upstream, managed Wi-Fi for the agreed area, a labelled case, guest kept apart from operations, pack-down and a short handover. Coverage outside that area is not implied.",
    description:
      "Scope of a VINCONNECT Event Link activation: what is included, what is quoted extra, and what is never promised.",
    crumbs: crumbs("What is included"),
    image: "/scenes-new/event-link-kit.jpg",
    sections: [
      {
        heading: "In a typical activation",
        copy: [],
        list: [
          "Starlink as upstream — organiser plan or included in the quote",
          "Managed Wi-Fi for the hub, committee area or seating you named",
          "Guest network separate from operations",
          "Labelled hardware in a case, not a table of consumer routers",
          "Pack-down and handover notes for the next volunteer",
        ],
      },
      {
        heading: "Not included unless quoted",
        copy: [],
        list: [
          "Whole-showgrounds coverage",
          "Replacing a venue’s existing paid Wi-Fi contract",
          "Overnight security of hardware you asked us to leave",
          "A marketing captive portal or an email-harvesting splash page",
        ],
      },
    ],
    faqs: [
      {
        q: "Do visitors have to give an email for Wi-Fi?",
        a: "No. Community Wi-Fi at a VINCONNECT hub does not require a marketing opt-in.",
      },
    ],
    related: [
      { href: "/event-link", label: "Event Link pilot" },
      { href: "/event-link/mini", label: "Mini" },
      { href: "/event-link/organisers", label: "For organisers" },
    ],
  }),
];
