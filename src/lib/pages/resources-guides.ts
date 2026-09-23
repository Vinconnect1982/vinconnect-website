import type { Article } from "./types";
import { HELP_CTA, PLAN_CTA } from "./types";

const crumbs = (label: string): Article["crumbs"] => [
  { label: "Guides", href: "/resources" },
  { label },
];

function page(partial: Omit<Article, "cluster" | "form"> & { cta?: Article["cta"] }): Article {
  return {
    cluster: "resources",
    cta: partial.cta ?? HELP_CTA,
    form: { type: "contact", package: partial.title, button: "Ask VINCONNECT", messageLabel: "What do you want to understand?" },
    ...partial,
  };
}

export const RESOURCE_GUIDES: Article[] = [
  page({
    path: "/resources/starlink-delivery-installation",
    slug: "starlink-delivery-installation",
    kicker: "Guides",
    title: "Starlink delivery and installation",
    lede: "If you ordered Starlink yourself, the kit comes from Starlink and the VINCONNECT quote sets the mount and the visit. If Circl coordinated the job and allocated it to us, the Starlink carton and the mounting hardware can arrive as two deliveries. Direct bookings are the usual path.",
    description:
      "What happens between a Starlink kit arriving in Victoria and VINCONNECT completing the installation. Two deliveries, sealed box, booking scope.",
    crumbs: crumbs("Delivery and installation"),
    image: "/scenes/starlink-home.webp",
    sections: [
      {
        heading: "Delivery is not installation",
        copy: [
          "Starlink (or Circl) can put a carton on the verandah. VINCONNECT puts it on the building. If the carton is late, the visit moves. Photograph boxes. Leave the Starlink carton sealed.",
        ],
      },
      {
        heading: "Circl versus direct",
        copy: [
          "Circl jobs often have two deliveries and Circl tracking on 1800 950 493. Direct jobs usually mean you purchased the kit yourself. The physical install is similar. The phone tree is not.",
        ],
      },
    ],
    faqs: [
      {
        q: "The courier left it in the rain.",
        a: "Photograph it, dry it, and tell whoever sent the kit. Tell us if the appointment is close. Do not power a wet carton.",
      },
    ],
    related: [
      { href: "/circl-starlink-installations/two-deliveries", label: "Circl two deliveries" },
      { href: "/customer-help/before-your-install", label: "Before your install" },
      { href: "/starlink", label: "Starlink guides" },
      { href: "/install-terms-and-conditions", label: "Install terms" },
    ],
  }),
  page({
    path: "/resources/standard-install-explained",
    slug: "standard-install-explained",
    kicker: "Guides",
    title: "Standard Starlink install, explained",
    lede: "A longer plain-language version of the scope: visible cable, one hole, router at the wall. Use it with the terms page, not instead of it.",
    description:
      "Plain-language explanation of a VINCONNECT standard Starlink installation in Victoria, including optional conduit and cabinet extras.",
    crumbs: crumbs("Standard install explained"),
    image: "/media/projects/botanic-ridge-double-storey-hero-v4.webp",
    sections: [
      {
        heading: "The five parts",
        copy: [],
        list: [
          "A mount the building can live with",
          "A visible clipped outdoor cable",
          "One sealed penetration",
          "A brush plate inside",
          "The router on that wall, near power",
        ],
      },
      {
        heading: "The two common extras",
        copy: [
          "Conduit $120. Garage or cabinet router $150. Direct bookings only, and only when agreed. Circl jobs follow the work order, not these extras, unless they are separately quoted.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is the cable visible?",
        a: "Because concealing it is different labour. We will hide it when that labour is in the booking.",
      },
    ],
    related: [
      { href: "/customer-help/standard-install-scope", label: "Standard scope" },
      { href: "/install-terms-and-conditions", label: "Install terms" },
      { href: "/starlink/cable-entry-and-router", label: "Cable entry" },
    ],
  }),
  page({
    path: "/resources/wifi-calling",
    slug: "wifi-calling",
    kicker: "Guides",
    title: "Wi-Fi calling after Starlink",
    lede: "Once the internet is reliable, many mobiles will make calls over Wi-Fi. That is a handset and carrier setting, not a VINCONNECT product, and not a replacement we can guarantee for every number.",
    description:
      "Wi-Fi calling on a Starlink connection in rural Victoria. What VINCONNECT can set up, and what sits with your mobile carrier.",
    crumbs: crumbs("Wi-Fi calling"),
    image: "/scenes/whole-home-wifi.webp",
    sections: [
      {
        heading: "What we can do",
        copy: [
          "Give you a working indoor service and, on a whole-property job, coverage in the rooms you named. We can check that a phone on site places a Wi-Fi call if your carrier and handset already support it.",
        ],
      },
      {
        heading: "What we cannot do",
        copy: [
          "Port your landline, promise every handset, or argue with a carrier about a number that will not register. Confirm Wi-Fi calling with your mobile provider.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will this replace the copper phone?",
        a: "For some households, yes, once they confirm with their carrier. We will not tell you to cancel copper until you have tested it.",
      },
    ],
    related: [
      { href: "/services/whole-property-wifi", label: "Whole-property Wi-Fi" },
      { href: "/starlink/existing-nbn", label: "Starlink and NBN" },
      { href: "/customer-help/after-your-install", label: "After your install" },
    ],
  }),
  page({
    path: "/resources/fixed-wireless-vs-starlink",
    slug: "fixed-wireless-vs-starlink",
    kicker: "Guides",
    title: "Fixed wireless versus Starlink",
    lede: "Tired fixed wireless is a common reason we are called. This page is a practical comparison for a Victorian property, not a speed-test war.",
    description:
      "When rural Victorian households move from NBN fixed wireless to Starlink, and when they should not. Independent installer notes.",
    crumbs: crumbs("Fixed wireless vs Starlink"),
    image: "/guides/vinconnect-starlink-fixed-wireless-comparison.webp",
    imageAlt: "Illustrative comparison of fixed wireless and Starlink at a rural property.",
    sections: [
      {
        heading: "The usual complaint",
        copy: [
          "nbn technology is not a suburb label. Check the nbn address checker and Starlink availability for the same property. Evening slowdown and weather dropouts are the usual complaint. Completed jobs in Nyora, Caldermeade and Red Hill started with unreliable fixed wireless at those properties — not a claim that the whole town is on fixed wireless.",
        ],
      },
      {
        heading: "What Starlink does not fix",
        copy: [
          "A house with dead Wi-Fi rooms. A shed 180 metres away. A camera plan with no recorder. Those are property-network jobs on top of the dish.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I keep fixed wireless as backup?",
        a: "Sometimes, for a business that cannot be off-air. Most homes do not. It is extra monthly cost for a reason you should be able to name.",
      },
    ],
    related: [
      { href: "/starlink-offer", label: "One month of Starlink free" },
      { href: "/service-areas/nyora", label: "Nyora" },
      { href: "/service-areas/caldermeade", label: "Caldermeade" },
      { href: "/service-areas/red-hill", label: "Red Hill" },
      { href: "/estimate", label: "Check My Install Price" },
    ],
  }),
  page({
    path: "/resources/planning-a-property-network",
    slug: "planning-a-property-network",
    kicker: "Guides",
    title: "Planning a property network",
    lede: "Mark the buildings. Write the distances. Name the jobs each building has to do. Then we talk hardware. The planner exists so this conversation is not a guess.",
    description:
      "How to plan a whole-property network in Victoria before buying Starlink accessories or cameras. VINCONNECT property planner.",
    crumbs: crumbs("Planning a property network"),
    cta: PLAN_CTA,
    image: "/scenes-new/acreage-network.webp",
    sections: [
      {
        heading: "A usable sketch",
        copy: [
          "House, shed, stables, gate, power at each, and a note if trees sit in the path. That is enough to quote a first stage. Photos from each end of a proposed link help.",
        ],
      },
      {
        heading: "Do not start in the shopping cart",
        copy: [
          "Cameras, mesh nodes and a dish bought on three different weekends is how you end up with four passwords and no recorder. Plan, then buy, then we install.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I have to use the planner?",
        a: "No. A marked aerial printout or a phone video walking the place is fine. The planner just makes the distances honest.",
      },
    ],
    related: [
      { href: "/property-planner", label: "Property planner" },
      { href: "/property-networks", label: "Property networks" },
      { href: "/resources/downloads/property-wifi-checklist", label: "Wi-Fi checklist PDF" },
    ],
  }),
  page({
    path: "/resources/cctv-on-starlink",
    slug: "cctv-on-starlink",
    kicker: "Guides",
    title: "CCTV on a Starlink connection",
    lede: "Cameras need a network, a recorder, power and an upstream that stays up. Starlink can be that upstream. It is not a camera system by itself.",
    description:
      "Running HiLook CCTV over Starlink on Victorian rural properties. Recording on site, remote view, and why the network plan comes first.",
    crumbs: crumbs("CCTV on Starlink"),
    image: "/scenes-new/property-cctv.webp",
    sections: [
      {
        heading: "Record locally",
        copy: [
          "Remote view is a bonus. Recording should still happen on the property if the sky or the app has a bad night. Retention and a recorder that stays powered are part of the camera conversation.",
        ],
      },
      {
        heading: "Bandwidth is not the first question",
        copy: [
          "Views, power and the link to the recorder are. We can talk remote playback once those exist. Do not point eight cameras at a house mesh and a residential dish and call it designed.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you supply HiLook?",
        a: "Packages are specified with hardware and labour starting prices. We are not Hikvision or HiLook, and we are not officially endorsed by them.",
      },
    ],
    related: [
      { href: "/security", label: "CCTV cluster" },
      { href: "/security/hilook-cctv-packages", label: "HiLook packages" },
      { href: "/property-networks", label: "Property networks" },
    ],
  }),
  page({
    path: "/resources/rural-connectivity-options",
    slug: "rural-connectivity-options",
    kicker: "Guides",
    title: "Rural connectivity options",
    lede: "Fibre, fixed wireless, mobile, and LEO satellite each have a job. VINCONNECT installs Starlink and the network behind it. We do not pretend satellite replaces every other build.",
    description:
      "Rural internet options in Victoria in plain language: where Starlink fits, and where fibre, mobile or fixed wireless still matter.",
    crumbs: crumbs("Rural connectivity options"),
    image: "/scenes-new/gippsland-farm.webp",
    sections: [
      {
        heading: "A toolkit, not a religion",
        copy: [
          "If fibre is at the gate, that conversation is different. If the tower does not serve the house, Starlink is often the practical path. Mobile remains the backup a lot of properties already have in their pocket.",
        ],
      },
      {
        heading: "After the internet arrives",
        copy: [
          "On-farm networking is the part people skip. Sheds, cameras and a gate hut do not get online because the dish is pretty. Rural Connections is the community side of the same observation.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you get me a grant?",
        a: "No. We can point at published programs as information. Eligibility sits with the program. Grants are not the public story of Rural Connections.",
      },
    ],
    related: [
      { href: "/services/rural-connectivity", label: "Rural connectivity service" },
      { href: "/rural-connections", label: "Rural Connections" },
      { href: "/rural-connections/info-hub", label: "Info hub" },
      { href: "/starlink/rural-properties", label: "Rural Starlink guide" },
    ],
  }),
  page({
    path: "/resources/starlink-referral-free-month",
    slug: "starlink-referral-free-month",
    kicker: "Guides",
    title: "How the Starlink free-month referral offer works",
    lede: "The offer is one month of Starlink service credit for an eligible new customer. It is not a free dish, and it is not a discount on VINCONNECT installation.",
    description:
      "How the Starlink free-month referral works in Australia: who may qualify, why a shop-bought kit may not, and how VINCONNECT installation fits after you order.",
    crumbs: crumbs("Starlink free-month referral"),
    image: "/scenes/starlink-home.webp",
    imageAlt: "Starlink dish on a Victorian home, used as an illustrative install scene.",
    cta: {
      primary: { label: "Get one month free", href: "/starlink-offer" },
      secondary: { label: "Check My Install Price", href: "/estimate" },
    },
    sections: [
      {
        heading: "What the offer is",
        copy: [
          "If you order through the VINCONNECT referral link, Starlink may apply one month of service credit to an eligible new Residential or Roam subscription. You still buy the kit and you still pay the first service invoice. The credit, when it is accepted, is applied later under Starlink’s rules.",
          "VINCONNECT does not issue that credit. Starlink shows the current offer at checkout. If the checkout page does not show it, do not assume it applies.",
        ],
      },
      {
        heading: "Who may qualify",
        copy: [
          "Starlink’s published referral terms say the customer needs to be new to Starlink, ordering on starlink.com through that specific link, on a qualifying plan. Existing and returning customers are excluded. Plans outside the Residential and Roam list Starlink publishes may not qualify. Waitlisted addresses can also be excluded.",
          "A kit from a retailer, reseller or account transfer is a common reason a referral is refused, even if the link was opened. Order on starlink.com if the credit matters to you.",
        ],
      },
      {
        heading: "Ordering Starlink and booking the install are two steps",
        copy: [
          "Starlink supplies the hardware, the account and the monthly service. VINCONNECT mounts the dish, routes the cable, places the router and can extend the network to the rest of the property. You can book the install once the kit is on the way, or once it has arrived.",
          "Direct customers do not need a Circl allocation. If your paperwork already says Circl arranged the visit, use the Circl help pages for delivery and booking instead of this offer.",
        ],
      },
      {
        heading: "After the hardware arrives",
        copy: [
          "Leave the kit accessible, know where the power and the router wall should be, and tell us about storeys, tile or Colorbond, and any second building. The delivery guide covers the sequence. The install terms cover what a standard visit includes.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the Starlink kit free?",
        a: "No. The referral is a service credit on an eligible plan, not free hardware.",
      },
      {
        q: "Does VINCONNECT guarantee the free month?",
        a: "No. Starlink decides eligibility, timing and whether the credit is applied.",
      },
      {
        q: "Can I use a kit I bought at a shop?",
        a: "You can still book VINCONNECT to install it. The referral credit often will not apply to retailer or transferred kits.",
      },
    ],
    related: [
      { href: "/starlink-offer", label: "Open the referral offer" },
      { href: "/services/starlink-installation", label: "Starlink installation" },
      { href: "/estimate", label: "Check My Install Price" },
      { href: "/resources/starlink-delivery-installation", label: "Delivery and installation" },
      { href: "/starlink/roof-wall-and-tripod", label: "Mounts" },
      { href: "/install-terms-and-conditions", label: "Install terms" },
    ],
  }),
];
