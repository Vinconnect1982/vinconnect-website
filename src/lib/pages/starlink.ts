import type { Article } from "./types";
import { DEFAULT_CTA } from "./types";

const crumbs = (label: string): Article["crumbs"] => [
  { label: "Starlink", href: "/starlink" },
  { label },
];

const related: Article["related"] = [
  { href: "/services/starlink-installation", label: "Starlink installation", copy: "Book the labour." },
  { href: "/customer-help/standard-install-scope", label: "Standard install scope" },
  { href: "/starlink/roof-wall-and-tripod", label: "Roof, wall and tripod" },
  { href: "/starlink/cable-entry-and-router", label: "Cable entry and router" },
  { href: "/estimate", label: "Check My Install Price" },
];

function page(partial: Omit<Article, "cluster" | "cta" | "form" | "related"> & { related?: Article["related"]; form?: Article["form"] }): Article {
  return {
    cluster: "starlink",
    cta: DEFAULT_CTA,
    form: { type: "contact", package: partial.title, button: "Ask about Starlink", messageLabel: "Property, storeys and what you need connected" },
    ...partial,
    related: partial.related ?? related,
  };
}

export const STARLINK: Article[] = [
  page({
    path: "/starlink",
    slug: "index",
    kicker: "Starlink, explained",
    title: "Starlink installation in Victoria, without the brochure language",
    lede: "How a dish actually goes on a Victorian home, rural property or caravan — mounts, cable entry, double-storey, Mini kits and what VINCONNECT will and will not claim.",
    description:
      "Independent Starlink installation guides for Victoria: home and rural installs, roof versus tripod, cable entry, double-storey, Mini and caravan. VINCONNECT is not Starlink or SpaceX.",
    image: "/scenes/starlink-home.webp",
    crumbs: [{ label: "Starlink" }],
    status:
      "VINCONNECT installs Starlink hardware. We do not sell Starlink plans, and we are not Starlink, SpaceX or Circl. Confirm current offers at Starlink checkout.",
    children: [
      { href: "/starlink/home-installation", title: "Home installation", copy: "Estates, rentals and the ordinary suburban roof." },
      { href: "/starlink/rural-properties", title: "Rural properties", copy: "Sheds, trees, long driveways and honest sky view." },
      { href: "/starlink/roof-wall-and-tripod", title: "Roof, wall and tripod", copy: "Why we do not default to a hole in the tile." },
      { href: "/starlink/cable-entry-and-router", title: "Cable entry and router", copy: "One penetration, brush plate, router at the wall." },
      { href: "/starlink/double-storey", title: "Double-storey", copy: "Book the building you actually have." },
      { href: "/starlink/caravan-and-touring", title: "Caravan and touring", copy: "Parked use, power and what a portable kit is not." },
      { href: "/starlink/mini", title: "Starlink Mini", copy: "When Mini is enough, and when it is not." },
      { href: "/starlink/existing-nbn", title: "Living with existing NBN", copy: "Keep it, replace it, or fail over." },
      { href: "/starlink/who-installs", title: "Who installs", copy: "Independent labour, credentials, service area." },
    ],
    sections: [
      {
        heading: "Start with the property, not the kit",
        copy: [
          "A Starlink carton does not know whether your fascia is brittle, your only clear sky is over a second storey, or the router needs to live next to an existing cabinet. That is the labour. Hardware and the monthly service stay with Starlink.",
        ],
      },
      {
        heading: "Two ways a visit gets booked",
        copy: [
          "Direct with VINCONNECT — estimator or a phone call — or Circl-allocated against a work order. Circl customers should read the Circl hub first. Everyone else can stay on this cluster and the customer-help pages.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you supply the dish?",
        a: "Only when a quote lists it. Most direct jobs are labour on a kit you already purchased. Circl jobs use the kit Circl sent.",
      },
    ],
  }),
  page({
    path: "/starlink/home-installation",
    slug: "home-installation",
    kicker: "Starlink",
    title: "Starlink on an ordinary home",
    lede: "New estates without NBN yet, copper that has given up, and rentals that will not accept a tile hole. The dish is the easy part. The entry and the router wall are the job.",
    description:
      "Starlink installation for suburban and estate homes across Casey, Cardinia and the Peninsula. Independent VINCONNECT labour, not a Starlink store.",
    crumbs: crumbs("Home installation"),
    image: "/media/clyde-new-estate-home.webp",
    sections: [
      {
        heading: "Where this is the right conversation",
        copy: [
          "New estates waiting on NBN or OptiComm, copper services that drop in the evening, and households that need a working connection for jobs, school and calls — not a weekend hobby antenna.",
        ],
      },
      {
        heading: "Rentals and body corporate",
        copy: [
          "Tripod and non-penetrating mounts exist for a reason. If the lease or the owners corporation forbids a roof hole, say so in the enquiry. A tidy visible cable is still a cable — some landlords care, some do not. That is your conversation; we will describe the mount honestly.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will Starlink replace the phone line?",
        a: "Starlink is internet. Wi-Fi calling can replace a copper voice service once the Wi-Fi is reliable. That is a configuration conversation, not a promise that every handset will behave.",
      },
    ],
  }),
  page({
    path: "/starlink/rural-properties",
    slug: "rural-properties",
    kicker: "Starlink",
    title: "Starlink on rural properties",
    lede: "Fixed wireless that fades when it rains, trees that grew into the only clear patch, and a shed that still runs on a phone hotspot. Rural installs start with sky view and end with whether the house is the only building that matters.",
    description:
      "Rural Starlink installation across Cardinia, Bass Coast, South Gippsland and West Gippsland. Sky view, mounts and what happens after the dish is up.",
    crumbs: crumbs("Rural properties"),
    image: "/scenes-new/gippsland-farm.jpg",
    sections: [
      {
        heading: "Sky view is not optional",
        copy: [
          "A picturesque tree line is a blocked dish. We will not promise a corner of the roof that looks at a cypress hedge. Tripods, a different building, or a conversation about the trees come first.",
        ],
      },
      {
        heading: "The dish is only the front door",
        copy: [
          "If the workshop, stable or gate hut also needs the service, that is a property network — wireless links, not a longer Starlink cable. Plan the property before we drill the house.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can one dish cover the whole acreage?",
        a: "The dish gets internet to one building. Getting it to the others is Wi-Fi and wireless links, quoted as a network.",
      },
    ],
    related: [
      { href: "/property-networks", label: "Property networks" },
      { href: "/solutions/rural-properties", label: "Rural property solutions" },
      { href: "/services/rural-connectivity", label: "Rural connectivity service" },
      { href: "/rural-connections", label: "Rural Connections" },
    ],
  }),
  page({
    path: "/starlink/roof-wall-and-tripod",
    slug: "roof-wall-and-tripod",
    kicker: "Starlink",
    title: "Roof, wall and tripod mounts",
    lede: "We do not default to a penetrating roof mount because it is the first accessory in the carton. The building, the wind and how you want the place to look decide.",
    description:
      "Starlink mount choices VINCONNECT actually uses: roof, fascia, wall and Astrogear tripod. Non-penetrating options for rentals and brittle roofs.",
    crumbs: crumbs("Roof, wall and tripod"),
    image: "/media/somerville-tripod-install.webp",
    sections: [
      {
        heading: "What we look at",
        copy: [
          "Structure, pitch, tiles or metal, eaves, prevailing wind, and whether a hole in the roof is a gift to the next leak. A wall or fascia mount is often cleaner. A tripod earns its keep on flat roofs, rentals and sites where the owner does not want penetrations.",
        ],
      },
      {
        heading: "Astrogear and non-penetrating",
        copy: [
          "Completed jobs in Somerville, Safety Beach and Cranbourne West used Astrogear tripods for a reason. They are not a fashion choice. They are a way to leave the waterproofing alone.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you supply the tripod?",
        a: "When the quote lists it. Circl jobs use the hardware Circl specified. Direct jobs can use a tripod you already have if it is suitable — we will say if it is not.",
      },
    ],
  }),
  page({
    path: "/starlink/cable-entry-and-router",
    slug: "cable-entry-and-router",
    kicker: "Starlink",
    title: "Cable entry and router placement",
    lede: "The weak point on a lot of DIY installs is the hole. One agreed route, one sealed penetration, a brush plate, and the router on that wall near power.",
    description:
      "How VINCONNECT enters a building with a Starlink cable: visible clipped route, one penetration, brush plate, and standard router placement.",
    crumbs: crumbs("Cable entry and router"),
    image: "/media/lyndhurst-rental-home.webp",
    sections: [
      {
        heading: "Visible on purpose",
        copy: [
          "Standard labour leaves the outdoor cable clipped and visible. Hidden in the wall or through a roof space is extra work because it is extra risk. Conduit is a $120 extra on direct bookings when it is agreed in advance.",
        ],
      },
      {
        heading: "Where the router lives",
        copy: [
          "On the internal wall that backs the exterior, near a power outlet. That is the standard. A garage, cabinet or rack is a $150 extra on direct bookings when agreed. Putting the router in a closed box with no ventilation is how hardware dies in summer.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you use an existing air-con hole?",
        a: "Sometimes. We will not force a cable through a hole that will not seal. Tell us what is already in the wall.",
      },
    ],
  }),
  page({
    path: "/starlink/double-storey",
    slug: "double-storey",
    kicker: "Starlink",
    title: "Double-storey Starlink installs",
    lede: "Two storeys change the ladder, the time and the judgement. Book it as double-storey or the visit gets paused.",
    description:
      "Double-storey Starlink installation in Victoria. Why VINCONNECT requires the booking to match the building, with examples from Botanic Ridge and Safety Beach.",
    crumbs: crumbs("Double-storey"),
    image: "/media/safety-beach-concealed-install.webp",
    sections: [
      {
        heading: "Why we are blunt about it",
        copy: [
          "A second storey is not ‘a bit more ladder’. It is access, wind, fall distance and time. The customer-help pages and the install terms say the same thing: book the building you have.",
        ],
      },
      {
        heading: "Flat roofs and concealed gutters",
        copy: [
          "Safety Beach is a useful example: double-storey, flat roof, concealed gutters, tripod rather than a hole. Those details belong in the enquiry, not in a surprise when we step out of the van.",
        ],
      },
    ],
    faqs: [
      {
        q: "The dish can go on the single-storey garage instead.",
        a: "That can be the right answer if the sky view is there and you accept the cable or a wireless hop to the house. Say so when you book.",
      },
    ],
  }),
  page({
    path: "/starlink/caravan-and-touring",
    slug: "caravan-and-touring",
    kicker: "Starlink",
    title: "Caravan and touring Starlink",
    lede: "Parked use, 12-volt reality, and a Mini kit that is not a house install on a hitch. Tell us how you actually travel.",
    description:
      "Starlink for caravans and touring in Victoria: portable versus permanent, power, and the limits of parked-use installs.",
    crumbs: crumbs("Caravan and touring"),
    image: "/travel/caravan-river.webp",
    sections: [
      {
        heading: "Parked versus rolling",
        copy: [
          "Most of the labour we are asked for is parked use: a site, a driveway, a farm stay. In-motion setups are a different product conversation and not a standard house-style install.",
        ],
      },
      {
        heading: "Power is half the job",
        copy: [
          "A dish that collapses the battery bank is not a connection. We will talk about how you already power the van before we talk about mounts. There is a separate service page for caravan Starlink power.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you roof-mount a van the same way as a house?",
        a: "No. Caravan skins, sealants and travel vibration are their own problem. We will not treat a van as a small house.",
      },
    ],
    related: [
      { href: "/services/starlink-caravan-installation", label: "Caravan Starlink service" },
      { href: "/services/caravan-starlink-power", label: "Caravan Starlink power" },
      { href: "/starlink/mini", label: "Starlink Mini" },
      { href: "/solutions/caravans-and-touring", label: "Caravan solutions" },
    ],
  }),
  page({
    path: "/starlink/mini",
    slug: "mini",
    kicker: "Starlink",
    title: "Starlink Mini",
    lede: "Smaller kit, smaller expectations. Mini is excellent when it matches how you work. It is a poor substitute for a residential dish on a family home that needs whole-house Wi-Fi.",
    description:
      "When Starlink Mini is the right kit, when VINCONNECT will talk you out of it, and how Mini installation differs from a residential dish.",
    crumbs: crumbs("Starlink Mini"),
    image: "/scenes-new/event-link-kit.jpg",
    sections: [
      {
        heading: "A good Mini job",
        copy: [
          "Temporary sites, touring, a site office, a second service on a property that already has a residential dish, or a household that truly only needs a room and a laptop.",
        ],
      },
      {
        heading: "A bad Mini job",
        copy: [
          "Trying to push Mini through a two-storey house, a stable block and a gate camera as if it were a residential kit with a smaller box. Buy the right dish, or plan a property network.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you install Mini on a house wall?",
        a: "We can mount and enter as a small kit. We will still tell you if a residential dish is the cheaper way to be happy in six months.",
      },
    ],
    related: [
      { href: "/services/starlink-mini-installation", label: "Mini installation service" },
      { href: "/starlink/caravan-and-touring", label: "Caravan and touring" },
      { href: "/event-link/mini", label: "EventLink Mini" },
      { href: "/services/starlink-installation", label: "Residential Starlink" },
    ],
  }),
  page({
    path: "/starlink/existing-nbn",
    slug: "existing-nbn",
    kicker: "Starlink",
    title: "Starlink beside an existing NBN service",
    lede: "Some households replace copper the same afternoon. Some keep NBN for failover. Neither is a moral position. It is a routing conversation.",
    description:
      "Using Starlink with existing NBN or OptiComm: replace, failover, or run them apart. Independent installer advice in Victoria.",
    crumbs: crumbs("Existing NBN"),
    image: "/media/bittern-copper-nbn-upgrade.webp",
    sections: [
      {
        heading: "Replace",
        copy: [
          "Copper and tired fixed wireless are the usual candidates. Once Starlink is commissioned we can leave the old modem in a box. Phone services move to Wi-Fi calling only if your handsets and numbers support it — confirm with your carrier, not with a slogan on this page.",
        ],
      },
      {
        heading: "Failover and two networks",
        copy: [
          "A small business or a rural property that cannot be off-air may want both. That is extra hardware and a clear explanation at handover, not a default on a standard install.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will you cancel my NBN?",
        a: "No. That is your account with your retailer. We install the new path.",
      },
    ],
  }),
  page({
    path: "/starlink/who-installs",
    slug: "who-installs",
    kicker: "Starlink",
    title: "Who installs Starlink at VINCONNECT",
    lede: "A Cranbourne-based installer, ACMA registered open cabler, working at heights, White Card, insured. Independent — not a Starlink employee and not a Circl store.",
    description:
      "VINCONNECT Starlink installer credentials, service area and independence from Starlink, SpaceX, TP-Link, Hikvision and Circl.",
    crumbs: crumbs("Who installs"),
    image: "/media/cranbourne-cricket-club.webp",
    sections: [
      {
        heading: "The work",
        copy: [
          "Vince De Stefano leads the installs, with assistance from Phoenix. Jobs are quoted with one point of contact. We work South East Melbourne, Mornington Peninsula, Bass Coast and Gippsland. Travel is in the estimator range for the address you enter.",
        ],
      },
      {
        heading: "Independence",
        copy: [
          "We install Starlink, TP-Link Omada, HiLook and related hardware. We are not those companies, and we are not officially endorsed by them. Circl-allocated work is contracted labour against a work order, not a franchise pitch.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I see credentials before the visit?",
        a: "Ask with the quote. The safety page lists what we hold. We do not publish licence or policy numbers on the website.",
      },
    ],
    related: [
      { href: "/about", label: "About VINCONNECT" },
      { href: "/about/safety-and-credentials", label: "Safety and credentials" },
      { href: "/about/how-we-work", label: "How we work" },
      { href: "/service-areas", label: "Work areas" },
    ],
  }),
];
