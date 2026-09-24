import type { Article } from "./types";
import { HELP_CTA } from "./types";

export const INSTALL_TERMS: Article = {
  path: "/install-terms-and-conditions",
  slug: "install-terms-and-conditions",
  cluster: "legal",
  kicker: "Install terms",
  title: "Installation terms and conditions",
  lede: "The booking SMS links here so the scope you accepted is the same one we turn up with. Read it once. Ask before the visit if something on your property does not match.",
  description:
    "VINCONNECT Starlink installation terms: standard scope, optional extras, double-storey booking, cancellations, weekends and what is not included. Independent installer based in Cranbourne, Victoria.",
  crumbs: [{ label: "Customer help", href: "/customer-help" }, { label: "Install terms" }],
  image: "/media/projects/botanic-ridge-double-storey-hero-v5.webp",
  cta: HELP_CTA,
  form: {
    type: "contact",
    package: "Install terms question",
    button: "Ask about my booking",
    messageLabel: "What do you need clarified?",
  },
  points: [
    "Standard install is wall or roof mount, visible clipped cable, one penetration, brush plate, router on the internal wall backing the exterior near power",
    "Conduit and garage or cabinet router placement are extras, only if agreed in the booking",
    "Double-storey must be booked as double-storey",
    "A typical visit is two to three hours when the site matches the booking",
  ],
  sections: [
    {
      heading: "Who these terms cover",
      copy: [
        "These terms apply to Starlink installation labour booked directly with VINCONNECT, including jobs coordinated through the estimator, a phone booking, or a written quote that points at this page.",
        "Circl-allocated installations follow the approved work order from Circl. The Circl customer pages explain that pathway. Extra work outside an approved Circl work order is quoted separately and is not assumed.",
        "VINCONNECT is an independent Victorian installer. We are not Starlink, SpaceX, TP-Link, Hikvision, HiLook or Circl, and we are not officially endorsed by them.",
      ],
    },
    {
      heading: "Standard Starlink installation",
      copy: [
        "Unless the booking says otherwise, a standard installation includes the labour to mount the dish, run the cable the agreed visible route, enter the building once, and leave the router working on the internal wall that backs the exterior, close to a power outlet.",
      ],
      list: [
        "Wall or roof mount suited to the structure we inspected or you described",
        "External cable clipped and left visible on the agreed route",
        "One sealed penetration with an internal brush plate",
        "Router placed on the internal wall backing the exterior, near power",
        "Basic commissioning so the service authenticates and a device on site can browse",
        "A short handover covering power, isolation and the app",
      ],
      note: "Starlink hardware, mounts you purchase yourself, subscriptions and in-app offers are not VINCONNECT products. Confirm current Starlink pricing and eligibility at Starlink checkout.",
    },
    {
      heading: "What is not in a standard install",
      copy: ["The following is outside the standard labour unless it is written into the booking."],
      list: [
        "Concealed cabling through walls, ceiling cavities or roof spaces",
        "Conduit — optional extra of $120 when agreed before the visit",
        "Router relocation into a garage, cabinet, rack or another room — optional extra of $150 when agreed",
        "Additional penetrations, long internal runs, or data-cabinet dressing",
        "Whole-property Wi-Fi, wireless building links, or CCTV",
        "Electrical work, new power circuits, or working on a switchboard",
        "Tree lopping, roof repairs, or making good existing damage",
        "Supply of Starlink kits, mounts or subscriptions unless a quote lists them as a separate line",
      ],
    },
    {
      heading: "Double-storey and access",
      copy: [
        "A double-storey building must be booked as double-storey. Access, ladder setup and time are different. If we arrive to a two-storey job booked as single-storey, we may reschedule or quote the difference before work continues.",
        "You need to provide safe access: a clear work area, a responsible adult on site, pets secured, and roof or wall access that is not blocked by locked gates, aggressive animals or unsafe structure. We will not work on a roof we judge unsafe.",
      ],
    },
    {
      heading: "Time on site",
      copy: [
        "A typical standard install is two to three hours when the site matches the booking, the kit is on site, and the sky view is as described. Harder routes, occupied sites, extra storeys and add-on work take longer. We do not promise a clock-watched finish time.",
      ],
    },
    {
      heading: "Cancellations, no-shows and weekends",
      copy: [
        "If a cancellation fee or weekend surcharge was disclosed when you booked, it applies as disclosed. VINCONNECT’s disclosed figures, when they form part of the booking, are a $50 fee for cancelling inside 24 hours of the appointment, and a $150 weekend surcharge.",
        "If those figures were not disclosed in the booking communication, they are not charged. A no-show or a site that is not ready (no kit, no access, no adult on site) is treated as a late cancellation when a late-cancel fee was disclosed.",
      ],
    },
    {
      heading: "Your kit, your account",
      copy: [
        "You (or Circl, on Circl jobs) supply the Starlink kit unless the quote says we are supplying it. Leave the Starlink box sealed until the installer asks to open it. Photograph the boxes on arrival if two deliveries have turned up — the dish kit and the mount kit are often separate.",
        "The Starlink service is your account with Starlink. We install and commission. We cannot reset your Starlink password, change your plan, or speak to Starlink support as if we were you.",
      ],
    },
    {
      heading: "Payment and quotes",
      copy: [
        "Direct VINCONNECT jobs are quoted as installation labour. Travel is included in the estimator range for the address you entered. Hardware is itemised separately when we supply it.",
        "Circl-allocated standard installs have no direct customer payment to VINCONNECT when they stay inside the approved work order. Anything outside that order is quoted to you or referred back to Circl, depending on the job.",
      ],
    },
    {
      heading: "Photos, privacy and the site",
      copy: [
        "We photograph the finished install for our records and, with identifying detail removed, may use similar work as a project example. We do not publish your name, street address, phone number, work-order numbers or invoices.",
        "The privacy page explains how enquiry details are used. There is no marketing subscription required to book or to read this site.",
      ],
    },
    {
      heading: "If something is wrong after the visit",
      copy: [
        "Contact VINCONNECT on 0408 559 555 if the install we completed is not performing as handed over. App, account, subscription and Starlink-network issues sit with Starlink. Circl tracking and kit logistics sit with Circl on 1800 950 493.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does the standard price hide the dish?",
      a: "No. Cable is clipped and left visible on the agreed route unless concealment or conduit was quoted.",
    },
    {
      q: "Can you put the router in the garage on the day?",
      a: "Only if garage or cabinet placement was agreed ($150 when that extra is in the booking). Otherwise the router stays on the internal wall backing the exterior, near power.",
    },
    {
      q: "What if I cancel the night before?",
      a: "If a $50 late-cancel fee was disclosed when you booked, it applies inside 24 hours. If it was not disclosed, it is not charged.",
    },
  ],
  related: [
    { href: "/customer-help", label: "Customer help", copy: "The booking journey from confirm to handover." },
    { href: "/customer-help/standard-install-scope", label: "Standard install scope", copy: "The same scope in plain language." },
    { href: "/circl-starlink-installations", label: "Circl customers", copy: "If Circl allocated the install." },
    { href: "/services/starlink-installation", label: "Starlink installation", copy: "The commercial installation page." },
  ],
};
