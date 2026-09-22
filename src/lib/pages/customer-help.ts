import type { Article } from "./types";
import { HELP_CTA } from "./types";

const crumbs = (label: string): Article["crumbs"] => [
  { label: "Customer help", href: "/customer-help" },
  { label },
];

const related: Article["related"] = [
  { href: "/customer-help/before-your-install", label: "Before your install" },
  { href: "/customer-help/on-the-day", label: "On the day" },
  { href: "/customer-help/after-your-install", label: "After your install" },
  { href: "/install-terms-and-conditions", label: "Install terms" },
  { href: "/circl-starlink-installations", label: "Circl-allocated installs" },
  { href: "/estimate", label: "Check My Install Price" },
];

function page(partial: Omit<Article, "cluster" | "cta" | "form" | "related"> & { related?: Article["related"]; form?: Article["form"] }): Article {
  return {
    cluster: "customer-help",
    cta: HELP_CTA,
    form: partial.form ?? {
      type: "support",
      package: partial.title,
      button: "Ask VINCONNECT",
      messageLabel: "What do you need help with?",
    },
    ...partial,
    related: partial.related ?? related,
  };
}

export const CUSTOMER_HELP: Article[] = [
  page({
    path: "/customer-help",
    slug: "index",
    kicker: "Customer help",
    title: "Your installation, from booking to handover",
    lede: "Booked VINCONNECT directly? This is the path from estimate to handover. If Circl arranged the installation and allocated it to us, the Circl notes at the bottom explain delivery and booking. You do not need Circl to hire VINCONNECT.",
    description:
      "VINCONNECT customer help for Starlink installation in Victoria. Before the visit, on the day, after handover, standard scope, cancellations and Circl-allocated jobs.",
    image: "/scenes/starlink-home.webp",
    imageAlt: "Starlink dish installed on a Victorian home.",
    crumbs: [{ label: "Customer help" }],
    points: [
      "Direct bookings start with Check My Install Price",
      "Circl-arranged installs have a separate help page for delivery and booking",
      "Double-storey, conduit and cabinet router placement are not assumed",
      "One phone number for VINCONNECT labour: 0408 559 555",
    ],
    children: [
      { href: "/customer-help/before-your-install", title: "Before your install", copy: "Kit, access, power and the questions we ask." },
      { href: "/customer-help/what-to-have-ready", title: "What to have ready", copy: "A short list you can tick off the night before." },
      { href: "/customer-help/on-the-day", title: "On the day", copy: "How long we are there and what the visit looks like." },
      { href: "/customer-help/after-your-install", title: "After your install", copy: "Handover, photos and who to call for what." },
      { href: "/customer-help/standard-install-scope", title: "Standard install scope", copy: "Mount, cable, one penetration, router at the wall." },
      { href: "/customer-help/double-storey-and-access", title: "Double-storey and access", copy: "Book the building you actually have." },
      { href: "/customer-help/cancellations-and-changes", title: "Cancellations and changes", copy: "24-hour notice and weekend bookings." },
      { href: "/customer-help/booking-and-payment", title: "Booking and payment", copy: "Direct jobs, estimator ranges and Circl work orders." },
      { href: "/install-terms-and-conditions", title: "Install terms", copy: "The stable page linked from booking SMS." },
      { href: "/circl-starlink-installations", title: "Circl customers", copy: "Two deliveries, sealed box, Circl tracking." },
    ],
    sections: [
      {
        heading: "Two booking paths",
        copy: [
          "Most people reach VINCONNECT in one of two ways. You booked us directly — estimator, phone or a written quote — and you are paying VINCONNECT for labour. Or Circl allocated a Starlink install to us against an approved work order, and the standard labour inside that order has no direct customer payment to VINCONNECT.",
          "The physical work is similar. The paperwork and who you call for kit tracking is not. If you are not sure which path you are on, check the SMS or email that confirmed the visit.",
        ],
      },
      {
        heading: "What we will not surprise you with",
        copy: [
          "A standard install does not hide cables, run conduit, or relocate the router into a garage or cabinet unless that extra was agreed. A two-storey house booked as a single-storey job will be paused and re-quoted. Cancellation and weekend figures only apply when they were disclosed at booking.",
        ],
      },
      {
        heading: "Who we are not",
        copy: [
          "VINCONNECT is a family-run installer based in Cranbourne. We are not Starlink, SpaceX or Circl. We cannot change your Starlink plan, see your Starlink invoice, or move a Circl work order. We install, commission and hand over the job we were booked to do.",
        ],
      },
    ],
    faqs: [
      {
        q: "The SMS has a link to terms. Is that this site?",
        a: "Yes. /install-terms-and-conditions is the stable address used in booking messages. Bookmark it if you want the scope in writing.",
      },
      {
        q: "I have a Circl tracking number. Do I still use this hub?",
        a: "Use the Circl hub for kit logistics and the sealed-box rule. Use this hub for what the visit itself looks like.",
      },
    ],
  }),
  page({
    path: "/customer-help/before-your-install",
    slug: "before-your-install",
    kicker: "Customer help",
    title: "Before your Starlink install",
    lede: "The visit goes smoothly when the kit is on site, the sky view is honest, and someone who can make a decision is home.",
    description:
      "What to do before a VINCONNECT Starlink installation in Victoria: kit on site, access, power, pets and the questions we confirm.",
    crumbs: crumbs("Before your install"),
    image: "/scenes-new/peninsula-home.webp",
    points: [
      "Kit on site, Starlink box still sealed",
      "A responsible adult present for the visit",
      "Power where the router will live",
      "Pets, horses and locked gates mentioned in advance",
    ],
    sections: [
      {
        heading: "Confirm the building we are attending",
        copy: [
          "Single-storey or double-storey is not a detail we can guess from the street listing. If the dish is going on a two-storey wall or roof, the booking must say so. Split-level, steep pitch, brittle tiles and occupied rental properties are worth a photo before the day.",
        ],
      },
      {
        heading: "Kit and mounts",
        copy: [
          "Direct bookings: you supply the Starlink kit unless the quote says otherwise. Circl bookings: the Starlink kit and the Circl mount kit often arrive as two deliveries. Photograph both boxes. Leave the Starlink carton sealed.",
          "If only one box has turned up the morning of the visit, say so before we leave the shed. We cannot install a dish that is still on a truck.",
        ],
      },
      {
        heading: "Sky, trees and neighbours",
        copy: [
          "Starlink wants a clear view of the sky. We will not promise a tree-blocked corner of the roof. If you already know the only clear patch is over a second storey or a rented fascia, tell us when you book — not when we are on the ladder.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to activate Starlink before you arrive?",
        a: "Have the account and app ready if you already purchased the service. We can walk through first-time setup on site. We cannot create the Starlink account in your name.",
      },
      {
        q: "Can I be at work and leave a key?",
        a: "No. A responsible adult needs to be present for access, placement decisions and handover.",
      },
    ],
  }),
  page({
    path: "/customer-help/what-to-have-ready",
    slug: "what-to-have-ready",
    kicker: "Customer help",
    title: "What to have ready",
    lede: "A short list. Tick it off the night before and the visit stays a two-to-three hour job.",
    description:
      "Checklist for a VINCONNECT Starlink installation: kit, power, access, parking, pets and who needs to be home.",
    crumbs: crumbs("What to have ready"),
    sections: [
      {
        heading: "The night-before list",
        copy: ["Have these actually ready, not ‘in the garage somewhere’."],
        list: [
          "Starlink kit on site, box sealed",
          "Mount kit on site if it was a separate delivery",
          "A working power outlet on the internal wall where the router will sit",
          "Clear access to the wall or roof we discussed",
          "Gate codes, dog arrangements, and horse paddocks mentioned if they affect the work area",
          "Someone over 18 on site for the whole visit",
          "The Starlink app on your phone, or a laptop, for handover",
        ],
      },
      {
        heading: "Parking and neighbours",
        copy: [
          "We need somewhere to stand a ladder and unload. Tight townhouse parks, body-corporate rules and ‘no parking on the nature strip’ streets are solvable when we know about them. Surprise towing is not a good start.",
        ],
      },
    ],
    faqs: [
      {
        q: "What if the kit is delayed?",
        a: "Tell us as soon as you know. We would rather move the visit than attend an empty verandah. Circl kit tracking is 1800 950 493.",
      },
    ],
  }),
  page({
    path: "/customer-help/on-the-day",
    slug: "on-the-day",
    kicker: "Customer help",
    title: "On the day of the install",
    lede: "We look at the sky, agree the route, mount the dish, enter once, sit the router, and hand the service over. Typical time is two to three hours when the booking matches the property.",
    description:
      "What happens during a VINCONNECT Starlink installation visit in Victoria, including time on site and decisions we will not make for you.",
    crumbs: crumbs("On the day"),
    image: "/media/projects/somerville-starlink-install.webp",
    sections: [
      {
        heading: "Order of work",
        copy: [
          "We start with a walk-around. Mount choice, cable route and the single penetration are agreed before a drill comes out. If the site does not match the booking — extra storey, no kit, unsafe roof — we stop and talk, we do not improvise a different job on your invoice.",
        ],
      },
      {
        heading: "Noise, mess and occupied homes",
        copy: [
          "There will be a ladder, a drill and a short period of weather coming through the penetration until it is sealed. We tidy the work area. We do not unpack your garage or move furniture beyond what the agreed route needs.",
        ],
      },
      {
        heading: "Decisions that stay yours",
        copy: [
          "Where the dish sits, whether the cable stays visible, and whether the router stays on the entry wall are your calls inside the quoted scope. We will say when a choice is a bad idea. We will not hide a cable or shift a router into a cabinet because it ‘looks neater’ unless that extra is in the booking.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will you need Wi-Fi while you work?",
        a: "We commission Starlink on the new service. We do not need your existing NBN password. If you want the Starlink router bridged into something you already own, say so when you book — that is a different conversation.",
      },
    ],
  }),
  page({
    path: "/customer-help/after-your-install",
    slug: "after-your-install",
    kicker: "Customer help",
    title: "After your install",
    lede: "You should leave the visit knowing how the system is powered, how to isolate it, and which number to call for which problem.",
    description:
      "Handover after a VINCONNECT Starlink installation: power, isolation, photos, warranty of labour, and who handles Starlink or Circl issues.",
    crumbs: crumbs("After your install"),
    sections: [
      {
        heading: "Handover",
        copy: [
          "We confirm a device on site can browse, show you power and isolation, and leave the install tidy. If something we fitted is not right, call VINCONNECT. If the sky is fine and the kit will not authenticate, that conversation is with Starlink — or with Circl, if they own the work order.",
        ],
      },
      {
        heading: "Photos and records",
        copy: [
          "We keep install photos for our records. Project pages on this site use completed work with identifying detail removed. We do not publish customer names, street addresses, phone numbers, work-order numbers or invoices.",
        ],
      },
      {
        heading: "Who to call",
        copy: [],
        list: [
          "VINCONNECT 0408 559 555 — labour, mounting, cable entry, the visit we attended",
          "Starlink support — account, plan, app, network outage",
          "Circl 1800 950 493 — Circl tracking, kit deliveries, Circl work orders",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you come back if the dish needs tilting?",
        a: "If the mount we installed is wrong, that is on us. If trees grew, a new structure went up, or the kit itself has a hardware fault, that is a different job or a Starlink replacement.",
      },
    ],
  }),
  page({
    path: "/customer-help/standard-install-scope",
    slug: "standard-install-scope",
    kicker: "Customer help",
    title: "Standard install scope",
    lede: "Wall or roof mount, visible clipped cable, one penetration, brush plate, router on the internal wall backing the exterior near power. That is the job unless the booking says more.",
    description:
      "VINCONNECT standard Starlink installation scope: mount, visible cable, one penetration, router placement, and the optional extras of conduit and garage or cabinet router.",
    crumbs: crumbs("Standard install scope"),
    points: [
      "Visible clipped external cable on the agreed route",
      "One sealed penetration and an internal brush plate",
      "Router on the internal wall backing the exterior, near power",
      "Conduit $120 and garage or cabinet router $150 only if agreed",
    ],
    sections: [
      {
        heading: "The included labour",
        copy: [
          "A standard VINCONNECT Starlink installation is the labour to fit the dish to a wall or roof mount suited to the building, clip the outdoor cable on a visible route you agreed, enter the building once, finish the inside on a brush plate, and leave the router working on that same wall, near power.",
          "Commissioning and a short handover are included. Starlink hardware and the monthly service are not, unless a quote lists them separately.",
        ],
      },
      {
        heading: "Optional extras, only when agreed",
        copy: [
          "Conduit for the external run is $120 when it is in the booking. Relocating the router into a garage, cabinet or rack is $150 when it is in the booking. Neither is a default, and neither is added on the ladder.",
        ],
      },
      {
        heading: "The full terms",
        copy: [
          "The booking SMS points at the install terms page. That URL does not change. If this explanation and the terms ever feel like they disagree, the terms page is the one that applies.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can the cable go through the roof space?",
        a: "Not in a standard install. Concealed runs are a quoted extra because they change time, access and risk.",
      },
    ],
    related: [
      { href: "/install-terms-and-conditions", label: "Install terms", copy: "The booking SMS page." },
      { href: "/circl-starlink-installations/standard-install-scope", label: "Circl standard scope" },
      { href: "/services/starlink-installation", label: "Starlink installation" },
      { href: "/starlink/cable-entry-and-router", label: "Cable entry explained" },
    ],
  }),
  page({
    path: "/customer-help/double-storey-and-access",
    slug: "double-storey-and-access",
    kicker: "Customer help",
    title: "Double-storey and access",
    lede: "A two-storey wall is a different booking. So is a locked side gate, a dog that patrols the ladder, or a roof we will not stand on.",
    description:
      "VINCONNECT double-storey Starlink bookings, roof access, pets, horses and when a visit is paused.",
    crumbs: crumbs("Double-storey and access"),
    image: "/media/projects/botanic-ridge-double-storey.webp",
    sections: [
      {
        heading: "Book the storey you have",
        copy: [
          "Double-storey work uses different ladders, time and judgement. If the booking is silent and we arrive to a two-storey install, we may reschedule or quote the difference before continuing. Split-level and steep-pitch roofs should be mentioned up front — a photo in the enquiry is enough.",
        ],
      },
      {
        heading: "What ‘access’ means",
        copy: [
          "Clear ground for the ladder, a responsible adult on site, pets secured, and no surprise body-corporate rule that forbids a roof mount. Horse properties: tell us which paddocks we must not enter and where the dish can sit without becoming a curiosity for the yards.",
        ],
      },
      {
        heading: "Roofs we will not work",
        copy: [
          "Wet slate, broken tiles, advanced rust, no safe anchor, or a structure that moves underfoot. A tripod or fascia mount is often the cleaner answer. We will say so rather than leave you with a leaking roof.",
        ],
      },
    ],
    faqs: [
      {
        q: "The estimator did not ask how many storeys.",
        a: "Tell us in the notes or on the call. The estimator is a labour range, not a substitute for describing the building.",
      },
    ],
  }),
  page({
    path: "/customer-help/cancellations-and-changes",
    slug: "cancellations-and-changes",
    kicker: "Customer help",
    title: "Cancellations and changes",
    lede: "Move the visit as soon as you know. Late-cancel and weekend figures only apply when they were disclosed in the booking.",
    description:
      "VINCONNECT Starlink booking changes: 24-hour cancellation fee of $50 and weekend surcharge of $150 apply only if disclosed when you booked.",
    crumbs: crumbs("Cancellations and changes"),
    sections: [
      {
        heading: "When a fee applies",
        copy: [
          "If the booking communication disclosed a $50 fee for cancelling inside 24 hours, that fee applies. If it disclosed a $150 weekend surcharge, that surcharge applies to weekend attendance. If those figures were not in the booking, they are not charged.",
          "A no-show, a site without the kit, or a site without an adult present is treated as a late cancellation when a late-cancel fee was disclosed.",
        ],
      },
      {
        heading: "Changing the scope",
        copy: [
          "Adding conduit, a cabinet router, extra penetrations or a second building is a new quote, not a conversation on the roof. We would rather rewrite the booking than argue about it at the ladder.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I move a weekday booking to Saturday?",
        a: "Ask. Weekend attendance, when offered, carries the $150 surcharge only if that surcharge was disclosed for weekend work.",
      },
    ],
  }),
  page({
    path: "/customer-help/booking-and-payment",
    slug: "booking-and-payment",
    kicker: "Customer help",
    title: "Booking and payment",
    lede: "Direct VINCONNECT jobs are installation labour with travel in the estimator range. Circl-allocated standard installs have no direct customer payment to us inside the approved work order.",
    description:
      "How VINCONNECT quotes and books Starlink installation in Victoria, and how Circl work orders differ from a direct booking.",
    crumbs: crumbs("Booking and payment"),
    sections: [
      {
        heading: "Direct with VINCONNECT",
        copy: [
          "Use Check My Install Price for an address-based labour range, or call 0408 559 555. Hardware, mounts and Starlink subscriptions are separate from labour unless a quote lists them. We do not take a marketing subscription to book.",
        ],
      },
      {
        heading: "Circl-allocated work",
        copy: [
          "If Circl sent you to VINCONNECT, the approved work order is the scope. Standard labour inside that order is not invoiced to you by VINCONNECT. Extras outside the order are quoted or referred back to Circl.",
        ],
      },
      {
        heading: "Deposits and invoices",
        copy: [
          "Payment terms are on the quote you accepted. We do not publish customer invoices, work-order numbers or account details on this website.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the estimator charge my card?",
        a: "No. It is a labour range so you can decide whether to enquire. Nothing is booked until we confirm a time with you.",
      },
    ],
  }),
  page({
    path: "/customer-help/photos-and-handover",
    slug: "photos-and-handover",
    kicker: "Customer help",
    title: "Photos and handover",
    lede: "You get a working service and a short explanation. We keep a record of the finished install. We do not put your street address on the internet.",
    description:
      "VINCONNECT installation photos, project pages and handover: what we record and what we never publish.",
    crumbs: crumbs("Photos and handover"),
    sections: [
      {
        heading: "What we photograph",
        copy: [
          "Mount, cable route, penetration, router placement and a working light. Those photos live in our job record. When a similar install appears in Projects, names, street numbers, faces, number plates, work-order numbers and invoices are not included.",
        ],
      },
      {
        heading: "What handover covers",
        copy: [
          "Power, isolation, the app, and which number to call for labour versus account versus Circl tracking. If you want a family member walked through it, have them on site — we do not do a second handover by phone as a substitute for being there.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I opt out of project photos?",
        a: "Say so at booking. We still photograph the finished work for our own records and warranty of labour.",
      },
    ],
  }),
];
