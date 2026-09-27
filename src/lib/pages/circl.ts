import type { Article } from "./types";

const CTA = {
  primary: { label: "Ask VINCONNECT", href: "/contact" },
  secondary: { label: "Call 0408 559 555", href: "tel:0408559555" },
};

const crumbs = (label: string): Article["crumbs"] => [
  { label: "Circl installations", href: "/circl-starlink-installations" },
  { label },
];

const related: Article["related"] = [
  { href: "/circl-starlink-installations/two-deliveries", label: "Two deliveries", copy: "Starlink kit and Circl mounts often arrive separately." },
  { href: "/circl-starlink-installations/leave-the-starlink-box-sealed", label: "Leave the Starlink box sealed" },
  { href: "/circl-starlink-installations/tracking-and-support", label: "Tracking and support", copy: "Circl 1800 950 493 · VINCONNECT 0408 559 555" },
  { href: "/customer-help", label: "Customer help", copy: "The visit itself, for every booking path." },
  { href: "/install-terms-and-conditions", label: "Install terms" },
];

function page(partial: Omit<Article, "cluster" | "cta" | "form" | "related"> & { related?: Article["related"]; form?: Article["form"] }): Article {
  return {
    cluster: "circl",
    cta: CTA,
    form: {
      type: "circl",
      package: partial.title,
      button: "Circl install support",
      messageLabel: "Circl work-order or suburb, and how we can help",
    },
    ...partial,
    related: partial.related ?? related,
  };
}

export const CIRCL: Article[] = [
  page({
    path: "/circl-starlink-installations",
    slug: "index",
    kicker: "Circl-coordinated installs",
    title: "Starlink installation for Circl customers",
    lede: "If Circl allocated your Starlink install to VINCONNECT, this hub is for you. Standard labour inside the approved work order has no direct customer payment to us. Kit tracking stays with Circl.",
    description:
      "VINCONNECT installs Starlink for Circl-allocated customers in Victoria. Two deliveries, leave the Starlink box sealed, Circl tracking 1800 950 493, standard scope inside the approved work order.",
    image: "/scenes/starlink-home.webp",
    crumbs: [{ label: "Circl installations" }],
    status:
      "VINCONNECT is an independent installer performing Circl-allocated work. We are not Circl, and Circl is not VINCONNECT. Spelling is Circl — not Circle.",
    points: [
      "Photograph every box that arrives — there are often two deliveries",
      "Leave the Starlink carton sealed until the installer opens it",
      "Circl tracking and kit logistics: 1800 950 493",
      "VINCONNECT labour on the day: 0408 559 555",
    ],
    children: [
      { href: "/circl-starlink-installations/what-to-expect", title: "What to expect", copy: "The visit, the work order, and who is in the conversation." },
      { href: "/circl-starlink-installations/two-deliveries", title: "Two deliveries", copy: "Starlink kit versus Circl mounts." },
      { href: "/circl-starlink-installations/leave-the-starlink-box-sealed", title: "Leave the Starlink box sealed", copy: "Do not unbox the dish before we arrive." },
      { href: "/circl-starlink-installations/tracking-and-support", title: "Tracking and support", copy: "Circl for freight. VINCONNECT for the visit." },
      { href: "/circl-starlink-installations/standard-install-scope", title: "Standard Circl install scope", copy: "What the approved work order usually covers." },
      { href: "/circl-starlink-installations/after-your-install", title: "After your Circl install", copy: "Handover and who owns which problem." },
    ],
    sections: [
      {
        heading: "Why this hub exists",
        copy: [
          "Circl customers keep asking the same practical questions: two parcels turned up, the dish box looks tempting to open, and it is not obvious whether to call Circl or the installer. This cluster answers those questions without mixing them into a sales page.",
          "If you booked VINCONNECT yourself and Circl is not in your paperwork, use Customer Help instead. This hub is only for Circl-allocated work.",
        ],
      },
      {
        heading: "Cost on a standard Circl install",
        copy: [
          "When the job stays inside the approved Circl work order, you do not pay VINCONNECT directly for that standard labour. Anything outside the order — extra penetrations, concealed cable, a cabinet router, a second building — is quoted or referred back to Circl. We do not add extras on the ladder and invoice you later as a surprise.",
        ],
      },
      {
        heading: "What we will never publish",
        copy: [
          "Work-order numbers, remittances, customer names, street addresses and phone numbers from Circl jobs stay off this website. If a page here uses an example, it is a process example, not your job.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is VINCONNECT part of Circl?",
        a: "No. We are contracted to perform allocated installs. Your commercial relationship for the Circl product remains with Circl.",
      },
      {
        q: "The courier only left one box.",
        a: "Photograph what arrived and call Circl on 1800 950 493. Tell VINCONNECT before the appointment if the dish or the mount is still missing.",
      },
    ],
  }),
  page({
    path: "/circl-starlink-installations/what-to-expect",
    slug: "what-to-expect",
    kicker: "Circl",
    title: "What to expect on a Circl Starlink install",
    lede: "Same practical visit as any other Starlink job: sky, mount, one tidy entry, router on the wall, handover. The difference is the paperwork and who tracks the freight.",
    description:
      "What Circl customers should expect when VINCONNECT attends a Circl-allocated Starlink installation in Victoria.",
    crumbs: crumbs("What to expect"),
    sections: [
      {
        heading: "Before we leave for site",
        copy: [
          "We work from the approved Circl work order. If your address, storey count or mount type in that order is wrong, say so before the day. We cannot invent a different job against Circl’s paperwork while standing in the driveway.",
        ],
      },
      {
        heading: "On site",
        copy: [
          "A responsible adult needs to be home. We agree the visible cable route and the single penetration, then we work. Typical time is two to three hours when the kit is complete and the building matches the order.",
        ],
      },
      {
        heading: "If the order is too small for the building",
        copy: [
          "Double-storey, concealed cable, cabinet placement and extra buildings are the usual gaps. We pause, explain, and either quote the extra or send it back to Circl. We do not ‘just quickly’ add them.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I still need the Starlink app?",
        a: "Yes, for handover. The service is still a Starlink account even when Circl coordinated the install.",
      },
    ],
  }),
  page({
    path: "/circl-starlink-installations/two-deliveries",
    slug: "two-deliveries",
    kicker: "Circl",
    title: "Two deliveries: kit and mounts",
    lede: "The Starlink kit and the Circl mount hardware often arrive on different days, in different boxes, from different senders. That is normal. It is not a reason to unbox everything on the verandah.",
    description:
      "Circl Starlink installs often involve two deliveries — the Starlink kit and Circl mounts. Photograph the boxes and tell VINCONNECT if one is missing.",
    crumbs: crumbs("Two deliveries"),
    points: [
      "Starlink carton and Circl mount carton are not the same parcel",
      "Photograph every box, including labels",
      "Missing dish or missing mount means we reschedule",
      "Circl tracks freight on 1800 950 493",
    ],
    sections: [
      {
        heading: "What each box is for",
        copy: [
          "The Starlink kit is the dish, router and Starlink cable. The Circl delivery is typically the mount and installer hardware Circl specified for the job. Opening the wrong carton, mixing parts, or assuming ‘the small box is extras’ is how dishes get powered up on the kitchen bench before we can check the kit.",
        ],
      },
      {
        heading: "What to do when a box arrives",
        copy: [
          "Photograph it. Store it dry. Leave the Starlink carton sealed. If the appointment is tomorrow and only one parcel has arrived, call Circl for tracking and message VINCONNECT so we are not already on the road.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can you install with a borrowed mount?",
        a: "Not against a Circl work order. The specified hardware is part of the job. Direct VINCONNECT bookings can discuss mounts separately.",
      },
    ],
  }),
  page({
    path: "/circl-starlink-installations/leave-the-starlink-box-sealed",
    slug: "leave-the-starlink-box-sealed",
    kicker: "Circl",
    title: "Leave the Starlink box sealed",
    lede: "Do not open the Starlink carton before the installer asks. Sealed packaging is how we confirm the kit is complete, undamaged and the right hardware for the work order.",
    description:
      "Circl Starlink customers should leave the Starlink box sealed until VINCONNECT arrives. Photograph boxes, store them dry, and do not power the dish on the bench.",
    crumbs: crumbs("Leave the Starlink box sealed"),
    sections: [
      {
        heading: "Why the seal matters",
        copy: [
          "An opened carton makes it harder to see what Circl sent, what Starlink sent, and what might already be missing. It also tempts a bench-top power-up, which is not an installation and can scramble the visit.",
        ],
      },
      {
        heading: "What you can do",
        copy: [
          "Photograph the closed boxes. Keep them out of weather and out of the way of dogs and kids. Have the Starlink app installed. That is enough.",
        ],
      },
    ],
    faqs: [
      {
        q: "I already opened it.",
        a: "Keep every part with the carton and tell us at the start of the visit. Do not throw the packaging out until we have checked the kit.",
      },
    ],
  }),
  page({
    path: "/circl-starlink-installations/tracking-and-support",
    slug: "tracking-and-support",
    kicker: "Circl",
    title: "Tracking and support",
    lede: "Circl tracks freight and the work order. VINCONNECT attends the property. Starlink runs the service. Three numbers, three jobs — mixing them up slows everyone down.",
    description:
      "Who to call for a Circl Starlink install in Victoria: Circl 1800 950 493 for tracking, VINCONNECT 0408 559 555 for the visit, Starlink for the account.",
    crumbs: crumbs("Tracking and support"),
    points: [
      "Circl 1800 950 493 — deliveries, tracking, work-order questions",
      "VINCONNECT 0408 559 555 — appointment, access, the labour on site",
      "Starlink support — plan, app, outage, kit warranty",
    ],
    sections: [
      {
        heading: "A simple split",
        copy: [
          "If the box is not there, call Circl. If the appointment needs to move, call VINCONNECT. If the dish is installed and the app will not sign in, that is Starlink — unless the cable we fitted is the problem, in which case it is us.",
        ],
      },
      {
        heading: "What not to send us",
        copy: [
          "Do not email work-order PDFs, invoices or copies of other customers’ paperwork to a public form and expect them to be published or forwarded as a ticket archive. Use the Circl support form on this page for a short description and a suburb. We will not put CG or WO numbers on the website.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can VINCONNECT see my Circl tracking?",
        a: "We see the allocation we need to attend. Live courier tracking sits with Circl.",
      },
    ],
  }),
  page({
    path: "/circl-starlink-installations/standard-install-scope",
    slug: "standard-install-scope",
    kicker: "Circl",
    title: "Standard Circl install scope",
    lede: "Inside the approved work order the labour is the same shape as a VINCONNECT standard install: mount, visible clipped cable, one penetration, router at the entry wall. Outside the order is extra.",
    description:
      "Standard Circl-allocated Starlink installation scope performed by VINCONNECT: mount, visible cable, one penetration, router placement. Extras quoted or referred to Circl.",
    crumbs: crumbs("Standard install scope"),
    sections: [
      {
        heading: "Usually included",
        copy: [],
        list: [
          "Wall or roof mount using the Circl-specified hardware",
          "Visible clipped external cable on the agreed route",
          "One sealed penetration and internal brush plate",
          "Router on the internal wall backing the exterior, near power",
          "Commissioning and handover",
        ],
      },
      {
        heading: "Usually not included",
        copy: [
          "Conduit, concealed cable, a data rack, extra storeys that were not in the order, wireless links and CCTV. Those are quoted or sent back to Circl. Direct VINCONNECT extras (internal walls from $150, data rack or cabinet $120, double storey $250, Saturday $150, plus a mount if we supply it) are a different booking path and are not assumed on Circl jobs.",
        ],
      },
      {
        heading: "No direct customer cost, inside the order",
        copy: [
          "Standard labour inside the approved Circl work order is not invoiced to you by VINCONNECT. That sentence does not cover extras, return visits caused by missing kit, or a building that does not match the order.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I add whole-property Wi-Fi while you are here?",
        a: "We can talk about it as a separate VINCONNECT quote. It is not part of a Circl Starlink work order.",
      },
    ],
  }),
  page({
    path: "/circl-starlink-installations/after-your-install",
    slug: "after-your-install",
    kicker: "Circl",
    title: "After your Circl install",
    lede: "You should have a working Starlink service and a clear split: VINCONNECT for the labour we performed, Circl for the product you bought from them, Starlink for the account.",
    description:
      "Handover after a Circl-allocated Starlink installation by VINCONNECT, including who to call for labour, freight and account issues.",
    crumbs: crumbs("After your install"),
    sections: [
      {
        heading: "Handover",
        copy: [
          "Same as any other visit: a device on site browsing, power and isolation explained, app on your phone. Photograph the finished work if you want it for your own records. We keep ours.",
        ],
      },
      {
        heading: "If it is not right",
        copy: [
          "Mount, cable, entry and the labour on the day — VINCONNECT 0408 559 555. Missing parts, Circl product questions, a work order you think is incomplete — Circl 1800 950 493. Plan, outage, app — Starlink.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will VINCONNECT bill me later?",
        a: "Not for standard labour inside the approved order. You would see a VINCONNECT quote before any extra work proceeds.",
      },
    ],
  }),
];
