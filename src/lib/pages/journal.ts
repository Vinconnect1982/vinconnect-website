import type { Article } from "./types";
import { DEFAULT_CTA } from "./types";

const crumbs = (label: string): Article["crumbs"] => [
  { label: "Field notes", href: "/journal" },
  { label },
];

function page(partial: Omit<Article, "cluster" | "cta" | "form">): Article {
  return {
    cluster: "journal",
    cta: DEFAULT_CTA,
    form: {
      type: "contact",
      package: partial.title,
      button: "Ask about this job type",
      messageLabel: "Suburb, roof type and what you need connected",
    },
    ...partial,
  };
}

export const JOURNAL: Article[] = [
  page({
    path: "/journal",
    slug: "index",
    kicker: "Field notes",
    title: "Notes from Victorian roofs, sheds and clubrooms",
    lede: "Longer versions of the jobs and questions VINCONNECT actually talks about — mounts, $300 local installs, Circl prep, and why house Wi-Fi never reaches the shed. Written from completed work and the install scope we already publish. Not a newsroom, and not invented case studies.",
    description:
      "VINCONNECT field notes from Starlink, Wi-Fi and CCTV jobs across Cranbourne, the Peninsula and Gippsland. Practical articles from completed installs.",
    image: "/media/projects/cranbourne-cricket-club-hero-v5.webp",
    imageAlt: "Cranbourne Cricket Club installation.",
    visual: "funnel",
    crumbs: [{ label: "Field notes" }],
    children: [
      { href: "/journal/what-300-starlink-labour-covers", title: "What $300 Starlink labour covers", copy: "The local number, written against the standard scope." },
      { href: "/journal/somerville-tripod-instead-of-a-tile-hole", title: "Somerville: a tripod instead of a tile hole", copy: "Completed job. Why we left the waterproofing alone." },
      { href: "/journal/cranbourne-cricket-club-off-4g", title: "Cranbourne Cricket Club off 4G", copy: "Starlink into an existing rack, FrogBox still streaming." },
      { href: "/journal/nyora-new-home-without-a-roof-penetration", title: "Nyora new home, no roof hole", copy: "New occupancy, existing cameras, non-penetrating mount." },
      { href: "/journal/pearcedale-five-acre-network", title: "Pearcedale five-acre network", copy: "House, shed and workshop — the dish was only the start." },
      { href: "/journal/house-wifi-will-not-reach-the-shed", title: "House Wi-Fi will not reach the shed", copy: "The conversation we have on most rural jobs." },
      { href: "/journal/colorbond-vs-tile-mounts", title: "Colorbond vs tile mounts", copy: "How we choose a mount for metal and tile." },
      { href: "/journal/night-before-a-circl-install", title: "The night before a Circl install", copy: "Sealed box, two deliveries, who to call." },
      { href: "/journal/diy-cable-entry-mistakes", title: "DIY cable-entry mistakes", copy: "The hole is the weak point. Here is why." },
      { href: "/journal/pakenham-factory-rooftop", title: "Pakenham factory rooftop", copy: "Commercial mount, cable, commission — completed." },
    ],
    sections: [
      {
        heading: "Why these notes exist",
        copy: [
          "Most Starlink installer sites in Melbourne hide the labour price, claim to be ‘certified Starlink’, and fill suburb pages with the same paragraph. VINCONNECT is an independent Cranbourne installer. These notes are the longer version of jobs we have already finished and questions we already answer in customer help.",
          "Facebook and Google posts from the van are short. The articles below keep the same facts, with room for the mount, the cable and the handover. If a job is only proposed or still in design, it is not here.",
        ],
      },
      {
        heading: "How to use this with the rest of the site",
        copy: [
          "Need a number? Check My Install Price. Already booked? Customer help. Circl allocated the visit? Circl hub. Planning sheds and cameras? Property planner. These notes sit beside that funnel — they are not a second quote path.",
        ],
      },
    ],
    related: [
      { href: "/estimate", label: "Check My Install Price" },
      { href: "/projects", label: "Completed installations" },
      { href: "/customer-help", label: "Customer help" },
      { href: "/resources", label: "Guides & answers" },
    ],
  }),
  page({
    path: "/journal/what-300-starlink-labour-covers",
    slug: "what-300-starlink-labour-covers",
    kicker: "Field notes",
    title: "What $300 Starlink labour covers in our area",
    lede: "In the local Cranbourne area, a straightforward single-storey Starlink install is $300. That covers the standard installation. It is not the Starlink kit, it is not a Saturday, and some roofs need more work.",
    description:
      "VINCONNECT local Starlink installation is $300 labour in the Cranbourne work area. What the standard scope includes and what is extra.",
    crumbs: crumbs("What $300 covers"),
    image: "/scenes/starlink-home.webp",
    visual: "install-steps",
    gallery: [
      { src: "/media/projects/clyde-new-estate-home-hero-v5.webp", alt: "Clyde estate Starlink install." },
      { src: "/media/projects/cranbourne-east-upgrade-hero-v5.webp", alt: "Cranbourne East mounted Starlink." },
    ],
    sections: [
      {
        heading: "The local number",
        copy: [
          "Direct VINCONNECT Starlink labour starts at $300 for a standard single-storey job in the local Cranbourne work area. Enter the address in the estimator — travel is added automatically when the property sits outside that local band. You do not work out kilometres.",
          "Circl-allocated standard installs are different: the approved work order is the scope, and that standard labour is not invoiced to you by VINCONNECT.",
        ],
      },
      {
        heading: "What sits in the $300",
        copy: [],
        list: [
          "Sky view and a mount the building can live with",
          "Visible clipped outdoor cable",
          "One sealed penetration and a brush plate",
          "Router on the backing interior wall, near power",
          "Commissioning and a short handover",
        ],
      },
      {
        heading: "What is not in the $300",
        copy: [
          "Starlink hardware and the monthly plan stay with Starlink. Conduit is $120 on direct jobs when it is agreed in advance. Moving the router into a garage or cabinet is $150 when agreed. Double-storey access, concealed internal routes, extra Wi-Fi areas and weekend attendance are extras — weekend $150 and a 24-hour change $50 only when those figures were disclosed at booking.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why do other Melbourne sites quote $399 to $549?",
        a: "Many packages bundle a mount kit or hide travel. Ours is labour on the standard scope. Compare written inclusions, not the first number on an ad.",
      },
    ],
    related: [
      { href: "/estimate", label: "Check My Install Price" },
      { href: "/customer-help/standard-install-scope", label: "Standard install scope" },
      { href: "/customer-help/booking-and-payment", label: "Booking and payment" },
      { href: "/install-terms-and-conditions", label: "Install terms" },
    ],
  }),
  page({
    path: "/journal/somerville-tripod-instead-of-a-tile-hole",
    slug: "somerville-tripod-instead-of-a-tile-hole",
    kicker: "Field notes",
    title: "Somerville: a tripod instead of a tile hole",
    lede: "A completed Starlink job on the Peninsula. The Astrogear tripod was not a style choice. It was how we kept the waterproofing intact.",
    description:
      "Completed VINCONNECT Starlink installation in Somerville using an Astrogear tripod mount without roof penetrations.",
    crumbs: crumbs("Somerville tripod"),
    image: "/media/projects/somerville-tripod-install-hero-v5.webp",
    visual: "diy-vs-pro",
    gallery: [
      { src: "/media/projects/somerville-starlink-install-hero-v5.webp", alt: "Completed Somerville Starlink installation." },
      { src: "/media/projects/cranbourne-west-roof-mount-hero-v5.webp", alt: "Cranbourne West pole mount on the tile roof." },
    ],
    sections: [
      {
        heading: "What was on site",
        copy: [
          "Somerville, on the Peninsula, used an Astrogear tripod so the dish had a clear view of the sky without drilling the roof. Safety Beach used the same idea on a flat roof with concealed gutters. Cranbourne West was a different mount: a pole on a concrete tile roof.",
        ],
      },
      {
        heading: "When a tripod is the right mount",
        copy: [
          "Rentals, brittle tiles, concealed gutters, and owners who do not want a penetration they will still be thinking about in ten years. A tripod still needs a plan for wind, cable strain and a tidy entry — it is not a dish balanced on a ladder.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you always use a tripod?",
        a: "No. Fascia, wall, pole and a well-chosen roof mount all earn their place. The building decides.",
      },
    ],
    related: [
      { href: "/projects/somerville-tripod-install", label: "Somerville project page" },
      { href: "/starlink/roof-wall-and-tripod", label: "Roof, wall and tripod" },
      { href: "/starlink/tile-and-colorbond", label: "Tile and Colorbond" },
      { href: "/estimate", label: "Check My Install Price" },
    ],
  }),
  page({
    path: "/journal/cranbourne-cricket-club-off-4g",
    slug: "cranbourne-cricket-club-off-4g",
    kicker: "Field notes",
    title: "Cranbourne Cricket Club: off 4G, into the existing rack",
    lede: "A completed clubrooms job. Starlink and Ubiquiti Wi-Fi replaced Telstra 4G. FrogBox kept streaming. We worked with the rack that was already there.",
    description:
      "Completed VINCONNECT Starlink and Wi-Fi installation at Cranbourne Cricket Club, including FrogBox streaming into the existing data rack.",
    crumbs: crumbs("Cranbourne Cricket Club"),
    image: "/media/projects/cranbourne-cricket-club-hero-v5.webp",
    visual: "network-stack",
    sections: [
      {
        heading: "Clubs are not houses",
        copy: [
          "Match days, volunteers, a rack that already has history, and a streaming box that cannot be ‘figured out later’. The Cranbourne Cricket Club job is the reference we point other committees at: keep guest and operations apart, label what you leave running, and do not throw away a working rack because a new dish arrived.",
        ],
      },
      {
        heading: "What we will not pretend",
        copy: [
          "This is one completed club. It is not a claim that VINCONNECT is the official installer for cricket Victoria, Starlink or Ubiquiti. Event Link is a separate pilot for shows and field days — not this job.",
        ],
      },
    ],
    related: [
      { href: "/projects/cranbourne-cricket-club", label: "Project page" },
      { href: "/services/community-connectivity", label: "Community connectivity" },
      { href: "/event-link", label: "Event Link for shows" },
      { href: "/contact", label: "Discuss a club job" },
    ],
  }),
  page({
    path: "/journal/nyora-new-home-without-a-roof-penetration",
    slug: "nyora-new-home-without-a-roof-penetration",
    kicker: "Field notes",
    title: "Nyora new home: connected without a roof hole",
    lede: "Newly occupied, cameras already on the walls, and a Starlink mount that did not put a hole through a new roof. Completed job in South Gippsland.",
    description:
      "Completed VINCONNECT Starlink installation at a Nyora new home using a non-penetrating mount and connection to existing CCTV.",
    crumbs: crumbs("Nyora new home"),
    image: "/media/projects/nyora-new-home-cctv-hero-v4.webp",
    gallery: [
      { src: "/media/projects/nyora-fixed-wireless-upgrade-hero-v6.webp", alt: "Separate Nyora rural home that moved off fixed wireless." },
      { src: "/media/projects/clyde-new-estate-home-hero-v5.webp", alt: "Clyde new estate home waiting on NBN." },
    ],
    sections: [
      {
        heading: "New occupancy is its own mess",
        copy: [
          "Builders, leftover copper, OptiComm that is ‘coming’, and a camera recorder that was never told about the new internet. At Nyora we mounted Starlink without a roof penetration and joined it to the cameras that were already there. A different Nyora job replaced tired fixed wireless on a rural roof — same town, different building, different mount.",
        ],
      },
      {
        heading: "If you are still building",
        copy: [
          "A Starlink-ready new home is a conduit, a labelled wall and a conversation before plaster. That is a planning job, not a $300 standard visit on a finished facade. Read the new-homes note in the Starlink guides.",
        ],
      },
    ],
    related: [
      { href: "/projects/nyora-new-home-cctv", label: "Nyora project page" },
      { href: "/starlink/new-homes-and-builders", label: "New homes and builders" },
      { href: "/security", label: "CCTV guides" },
      { href: "/estimate", label: "Check My Install Price" },
    ],
  }),
  page({
    path: "/journal/pearcedale-five-acre-network",
    slug: "pearcedale-five-acre-network",
    kicker: "Field notes",
    title: "Pearcedale: the five-acre job was a network",
    lede: "Completed work on a five-acre property. Starlink at the house, then Wi-Fi that actually reached the shed and workshop.",
    description:
      "Completed VINCONNECT Starlink and extended Wi-Fi on a Pearcedale five-acre property connecting home, shed and workshop.",
    crumbs: crumbs("Pearcedale five-acre"),
    image: "/media/projects/pearcedale-five-acre-property-hero-v5.webp",
    visual: "network-stack",
    gallery: [
      { src: "/scenes-new/acreage-network.webp", alt: "Acreage network scene." },
      { src: "/scenes/building-links.webp", alt: "Building-to-building wireless link." },
    ],
    sections: [
      {
        heading: "One dish, three buildings",
        copy: [
          "The internet arrived at the house. The work was getting it to the shed and workshop without pretending the kitchen mesh would jump a paddock. That is a property network: measured links, power at both ends, and a plan for cameras later if they want them.",
        ],
      },
      {
        heading: "Stage it if you need to",
        copy: [
          "Dish first, house Wi-Fi second, shed when the budget is there. We would rather stage Pearcedale-style work than sell a cabinet you do not need yet.",
        ],
      },
    ],
    related: [
      { href: "/projects/pearcedale-five-acre-property", label: "Project page" },
      { href: "/property-networks", label: "Property networks" },
      { href: "/property-planner", label: "Property planner" },
      { href: "/services/wireless-links", label: "Wireless links" },
    ],
  }),
  page({
    path: "/journal/house-wifi-will-not-reach-the-shed",
    slug: "house-wifi-will-not-reach-the-shed",
    kicker: "Field notes",
    title: "House Wi-Fi will not reach the shed",
    lede: "Brick, Colorbond, water tanks and eighty metres of driveway. Turning the lounge mesh up is not a link. This is the conversation on most rural jobs we quote.",
    description:
      "Why VINCONNECT uses dedicated wireless links for sheds and stables instead of stretching house Wi-Fi across Victorian acreage.",
    crumbs: crumbs("Wi-Fi will not reach the shed"),
    image: "/scenes/building-links.webp",
    visual: "network-stack",
    gallery: [
      { src: "/scenes-new/horse-property.webp", alt: "Horse property buildings." },
      { src: "/visuals/network-cutaway.webp", alt: "Property network concept illustration." },
    ],
    sections: [
      {
        heading: "Two different radios",
        copy: [
          "House Wi-Fi is for people in rooms. A point-to-point link is for a building you can see. Mixing them is how you get a camera that works until it rains and a tack-room laptop that never quite joins.",
        ],
      },
      {
        heading: "What we ask for",
        copy: [
          "A photo from each end, a sketch in the property planner, and what the far building actually does — four cameras is not the same as email in a lunchroom. Line of sight is not optional. Hay sheds appear after the quote if nobody walked the path.",
        ],
      },
    ],
    related: [
      { href: "/property-networks/wireless-building-links", label: "Wireless building links" },
      { href: "/property-planner", label: "Property planner" },
      { href: "/services/wireless-links", label: "Wireless links service" },
      { href: "/estimate", label: "Check My Install Price" },
    ],
  }),
  page({
    path: "/journal/colorbond-vs-tile-mounts",
    slug: "colorbond-vs-tile-mounts",
    kicker: "Field notes",
    title: "Colorbond vs tile: how we actually mount",
    lede: "Metal roofs and tiled roofs fail in different ways. VINCONNECT does not default to the first accessory in the Starlink carton.",
    description:
      "Starlink mount choices for Victorian Colorbond and tile roofs from VINCONNECT: fascia, wall, pole and non-penetrating tripods.",
    crumbs: crumbs("Colorbond vs tile"),
    image: "/media/projects/botanic-ridge-double-storey-hero-v5.webp",
    visual: "diy-vs-pro",
    gallery: [
      { src: "/media/projects/bittern-copper-nbn-upgrade-hero-v4.webp", alt: "Roof-mounted Starlink at Bittern." },
      { src: "/media/projects/safety-beach-concealed-install-hero-v5.webp", alt: "Safety Beach tripod on a flat roof." },
    ],
    sections: [
      {
        heading: "Tile",
        copy: [
          "Brittle, older, and unforgiving of a lazy hole. Fascia and tripod earn their keep. If a roof mount is the only honest sky view, the penetration is planned and sealed — not guessed from a YouTube short.",
        ],
      },
      {
        heading: "Colorbond",
        copy: [
          "Fixings, laps and wind matter more than people expect. Cable that flaps on metal is a noise complaint and a future leak. Clips, gland choice and a route that respects the sheets are the job.",
        ],
      },
      {
        heading: "Completed examples",
        copy: [
          "Botanic Ridge — double-storey fascia, existing UPS. Bittern — roof-mounted replacement of copper NBN. Safety Beach — tripod on a flat roof with concealed gutters. Different roofs, same rule: the building decides.",
        ],
      },
    ],
    related: [
      { href: "/starlink/tile-and-colorbond", label: "Tile and Colorbond guide" },
      { href: "/starlink/roof-wall-and-tripod", label: "Roof, wall and tripod" },
      { href: "/starlink/fascia-and-wall", label: "Fascia and wall" },
      { href: "/estimate", label: "Check My Install Price" },
    ],
  }),
  page({
    path: "/journal/night-before-a-circl-install",
    slug: "night-before-a-circl-install",
    kicker: "Field notes",
    title: "The night before a Circl-allocated install",
    lede: "Two deliveries. Sealed Starlink carton. Circl tracking if something is late. VINCONNECT is the labour on the work order — not Circl, and not Starlink support.",
    description:
      "How to prepare for a Circl-allocated VINCONNECT Starlink installation in Victoria: kit, access, power and who to call.",
    crumbs: crumbs("Night before Circl"),
    image: "/scenes/starlink-home.webp",
    visual: "funnel",
    sections: [
      {
        heading: "Leave the carton sealed",
        copy: [
          "Photograph boxes. Keep the Starlink carton sealed. If the courier left it in the rain, photograph that too and tell whoever sent the kit. We will not power a wet carton, and we will not unbox a kit ‘to have a look’ the night before.",
        ],
      },
      {
        heading: "Who you call",
        copy: [
          "Kit tracking and work-order changes sit with Circl on 1800 950 493. VINCONNECT labour is 0408 559 555. Starlink plans and invoices sit with Starlink. Mixing those three numbers is how jobs slip a day.",
        ],
      },
    ],
    related: [
      { href: "/circl-starlink-installations", label: "Circl customers" },
      { href: "/customer-help/what-to-have-ready", label: "What to have ready" },
      { href: "/customer-help/before-your-install", label: "Before your install" },
      { href: "/install-terms-and-conditions", label: "Install terms" },
    ],
  }),
  page({
    path: "/journal/diy-cable-entry-mistakes",
    slug: "diy-cable-entry-mistakes",
    kicker: "Field notes",
    title: "The cable entry is where DIY jobs come undone",
    lede: "A dish on the roof can look fine from the street. The hole, the strain relief and the router cupboard are where water and heat win.",
    description:
      "Common DIY Starlink cable-entry mistakes VINCONNECT sees in Victoria, and how a standard install is finished.",
    crumbs: crumbs("DIY cable entry"),
    image: "/media/projects/lyndhurst-rental-home-hero-v5.webp",
    visual: "diy-vs-pro",
    gallery: [
      { src: "/media/projects/lyndhurst-rental-home-hero-v5.webp", alt: "Lyndhurst rental with cabinet entry." },
      { src: "/scenes/starlink-home.webp", alt: "Residential Starlink scene." },
    ],
    sections: [
      {
        heading: "What we keep seeing",
        copy: [
          "A hole through a tile with silicone from the hardware aisle. Cable draped to a window and crushed in the sash. Router in a closed AV cabinet with no ventilation. Strain relief missing, so the first northerly leans on the connector.",
        ],
      },
      {
        heading: "The standard finish",
        copy: [
          "One agreed route, one sealed penetration, a brush plate, and the router on that wall near power. Hidden in the wall is extra because it is extra risk. A rental like Lyndhurst can use an existing Hills Home Hub when that is the honest path.",
        ],
      },
    ],
    related: [
      { href: "/starlink/cable-entry-and-router", label: "Cable entry and router" },
      { href: "/customer-help/standard-install-scope", label: "Standard scope" },
      { href: "/estimate", label: "Check My Install Price" },
    ],
  }),
  page({
    path: "/journal/pakenham-factory-rooftop",
    slug: "pakenham-factory-rooftop",
    kicker: "Field notes",
    title: "Pakenham factory: rooftop Starlink, then the cable, then commissioning",
    lede: "A completed commercial rooftop. Mount, cable run, commission. Not a house job with a longer ladder.",
    description:
      "Completed VINCONNECT factory rooftop Starlink installation in Pakenham, from mounting and cable runs through commissioning.",
    crumbs: crumbs("Pakenham factory"),
    image: "/media/projects/pakenham-commercial-factory-hero-v5.webp",
    sections: [
      {
        heading: "Access is the quote",
        copy: [
          "Factory roofs, operating hours, who holds the keys, and where the cable can land without becoming a trip hazard. Commercial Starlink labour is not the $300 local house figure. The estimator has a business / commercial option for a reason.",
        ],
      },
      {
        heading: "Independence",
        copy: [
          "We installed the labour. We are not Starlink, and we are not the factory’s IT provider unless a quote says so. Handover still covers isolation and who to call.",
        ],
      },
    ],
    related: [
      { href: "/projects/pakenham-commercial-factory", label: "Project page" },
      { href: "/solutions/business-and-community", label: "Business solutions" },
      { href: "/contact", label: "Discuss a commercial job" },
      { href: "/estimate", label: "Check My Install Price" },
    ],
  }),
];
