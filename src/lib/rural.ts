export const RURAL_PAGES = [
  {
    slug: "hub",
    title: "Rural Connections",
    kicker: "Communities, not just connections",
    lede: "A practical Victorian initiative: meet people at shows and field days, keep useful information online, and document the connectivity gaps rural communities keep repeating.",
    image: "/scenes-new/rural-event.webp",
  },
] as const;

export const RURAL_PILLARS = [
  {
    slug: "roadshow",
    title: "Rural Connection Hub",
    kicker: "In person",
    lede: "A travelling hub inside established agricultural shows, field days and rural community events. Free temporary Wi-Fi, shade, practical demonstrations and farmer-health resources without a sales pitch at the door.",
    image: "/scenes-new/roadshow-hub.webp",
    points: [
      "Welcome, seating and free Wi-Fi",
      "Demonstrations of rural digital access",
      "Trusted wellbeing resources, no pressure",
      "Commercial enquiries only if you choose them",
    ],
  },
  {
    slug: "info-hub",
    title: "Rural & Remote Info Hub",
    kicker: "Online",
    lede: "A free, non-gated resource: Starlink and Wi-Fi in plain English, grants and rebates, digital safety, CCTV and remote monitoring, and links to recognised health and community services.",
    image: "/scenes-new/info-hub-farmer.webp",
    points: [
      "Guides you can use without creating an account",
      "Grants and rebate pathways, dated when we checked them",
      "Wellbeing and emergency links to recognised services",
      "Feedback on coverage gaps, aggregated — not a lead form in disguise",
    ],
  },
  {
    slug: "advocacy",
    title: "Connectivity advocacy",
    kicker: "System level",
    lede: "Listen locally, write down recurring barriers, and take practical evidence to councils, industry and government. Rapidly deployable LEO satellite is one option in the toolkit — not a replacement for fibre, mobile or fixed wireless.",
    image: "/scenes-new/advocacy-table.webp",
    points: [
      "Documented rural barriers, in aggregate",
      "Fast-to-deploy Starlink where terrestrial build is uneconomic",
      "On-farm networking after the internet arrives",
      "Public benefit first; commercial work stays separate",
    ],
  },
];

export const ROADSHOW_DATES = [
  { when: "Nov 2026", where: "Korumburra Sheepdog Trials", note: "Potential wellbeing / community pilot" },
  { when: "Jan 2027", where: "Lang Lang Show", note: "Rural connection activation" },
  { when: "Feb 2027", where: "Korumburra Show", note: "Agricultural show activation" },
  { when: "Mar 2027", where: "Warragul Show", note: "Regional activation" },
  { when: "Mar 2027", where: "Farm World — Lardner Park", note: "Major field-day opportunity" },
  { when: "Apr 2027", where: "Bunyip Show", note: "Cardinia rural activation" },
  { when: "Rolling", where: "Horse and rural-property events", note: "Gippsland / Cardinia / Bass Coast" },
];

export const EVENT_LINK = {
  name: "VINCONNECT Event Link",
  kicker: "Pilot product · 2026–27",
  lede: "A rapidly deployable Starlink and managed Wi-Fi kit for agricultural shows, field days, clubs and rural community events. The same thinking as a property network — packed so it can stand up in a paddock.",
  image: "/media/event-link/platform-hero.webp",
  status:
    "Event Link is a 2026–27 pilot. Organisers can register interest. It is not for sale as a product, and it is not a promise to cover an entire showgrounds.",
  includes: [
    "Starlink as the upstream internet (organiser supplies an eligible plan, or we include it in the activation quote)",
    "Managed outdoor-capable Wi-Fi for the hub, committee area or public seating",
    "A labelled network case, not a tangle of consumer routers",
    "Guest network kept apart from operations",
    "Pack-down and a short handover so the next volunteer is not guessing",
  ],
  useCases: [
    "Agricultural shows and field days",
    "Sheepdog trials, horse events, campdrafts",
    "Club rooms that currently run on a phone hotspot",
    "Temporary site office / emergency information point",
  ],
  not: [
    "A guaranteed public carrier-grade network for an entire showgrounds",
    "A substitute for the venue’s existing paid Wi-Fi contract unless scoped",
    "Free marketing access to visitor details — community Wi-Fi does not require a marketing opt-in",
  ],
};

export const GRANT_NOTES = [
  {
    title: "Look Over the Farm Gate",
    copy: "Victorian farmer-wellbeing events. Current published range $1,500–$5,000 per eligible activity; funded activities currently to be completed before 31 Dec 2026. Alignment only — not a claim of approval.",
  },
  {
    title: "Regional Events Fund — Stream 3",
    copy: "Visit Victoria pathway up to $50,000 for eligible event capability. Visitor Economy Partnership engagement is required. Timing matters: an event cannot start before the expected decision window.",
  },
  {
    title: "On Farm Connectivity Program — Round 3",
    copy: "Primary producers apply through Approved Suppliers. Rebates $1,000–$20,000 for eligible expenditure. VINCONNECT can help you understand the on-farm networking side; eligibility sits with the program.",
  },
  {
    title: "FRRR Strengthening Rural Communities",
    copy: "Small & Vital grants up to $10,000; larger digital leverage grants may suit eligible community-led partners.",
  },
];
