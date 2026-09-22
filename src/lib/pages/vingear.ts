import type { Article } from "./types";

const CTA = {
  primary: { label: "Register interest", href: "/vingear/early-access" },
  secondary: { label: "Ask VINCONNECT", href: "/contact" },
};

const crumbs = (label: string): Article["crumbs"] => [
  { label: "VIN Gear", href: "/vingear" },
  { label },
];

function page(partial: Omit<Article, "cluster" | "cta" | "form" | "related"> & { related?: Article["related"]; form?: Article["form"] }): Article {
  return {
    cluster: "vingear",
    cta: CTA,
    form: {
      type: "vingear",
      package: partial.title,
      button: "Register VIN Gear interest",
      messageLabel: "What you would use it for, and how we can reach you",
    },
    ...partial,
  };
}

export const VINGEAR: Article[] = [
  page({
    path: "/vingear",
    slug: "index",
    kicker: "VIN Gear",
    title: "VIN Gear",
    lede: "Hardware VINCONNECT is developing for the way rural and touring connections actually get used. VINCONNECT remains the installation and service business. VIN Gear is the product line — and it is not for sale on this site yet.",
    description:
      "VIN Gear is VINCONNECT’s product line in development. Pulse cable lighting is in early access interest only. No price, launch date, IP rating or certification is claimed.",
    crumbs: [{ label: "VIN Gear" }],
    status:
      "VIN Gear products are in development. Nothing on these pages is an offer to sell, a certification claim, or a published specification. Shopify or any future store is a later conversation. VINCONNECT.com.au stays the install and service site.",
    children: [
      { href: "/vingear/pulse", title: "VIN Gear Pulse", copy: "Illuminated cable concept. In development." },
      { href: "/vingear/early-access", title: "Early access", copy: "Register interest. No deposit, no launch date." },
    ],
    sections: [
      {
        heading: "Two names, two jobs",
        copy: [
          "VINCONNECT installs Starlink, property networks and CCTV. VIN Gear is the name for products we are developing alongside that work. You cannot check out a Pulse cable here, and we will not pretend you can.",
        ],
      },
      {
        heading: "What you will not find on these pages",
        copy: [
          "Retail prices, IP ratings, power performance figures, certification marks, or a date you can circle. When those exist and are confirmed, they will be published as confirmed. Until then, early-access interest is the only public action.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I buy Pulse with my Starlink install?",
        a: "Not as a listed extra today. If you want to be told when a product is actually available, use early access.",
      },
    ],
    related: [
      { href: "/vingear/pulse", label: "Pulse" },
      { href: "/vingear/early-access", label: "Early access" },
      { href: "/about", label: "About VINCONNECT" },
      { href: "/services", label: "Installation services" },
    ],
  }),
  page({
    path: "/vingear/pulse",
    slug: "pulse",
    kicker: "VIN Gear Pulse",
    title: "VIN Gear Pulse",
    lede: "An illuminated cable concept for the kit you can trip over in the dark — touring, events, and the last metre to a dish. Pulse is in development. This page is a description, not a spec sheet.",
    description:
      "VIN Gear Pulse is an illuminated cable concept in development. No IP rating, power figures, certifications, price or availability are published.",
    crumbs: crumbs("Pulse"),
    status:
      "In development. Length options, lighting, power method and construction are being validated. No IP rating, electrical certification, launch date, RRP or availability is claimed on this website.",
    points: [
      "Concept: a cable you can see at night",
      "Interest list only — not an order",
      "Not a Starlink-branded accessory",
      "Not certified and not rated here",
    ],
    sections: [
      {
        heading: "The idea",
        copy: [
          "Rural setups and event kits get handled in the dark. Pulse is a cable you can see at night. How it is built, how it lights, and how it is powered are still being worked out. Those details are not specifications yet.",
        ],
      },
      {
        heading: "What we will not say yet",
        copy: [
          "There is no waterproof rating, power figure, confirmed length, price or shipping date on this page. We will only put those here once they are confirmed the same way we confirm an install.",
        ],
      },
      {
        heading: "Independence",
        copy: [
          "Pulse is a VIN Gear concept. It is not a Starlink, SpaceX, TP-Link or Circl product, and using it with those kits — if it ever ships — would not make VINCONNECT those companies.",
        ],
      },
    ],
    faqs: [
      {
        q: "I saw a length and a price in a private document.",
        a: "Anything you have seen privately is not a price or a specification. If it is not written here, it is not confirmed.",
      },
    ],
    related: [
      { href: "/vingear", label: "VIN Gear" },
      { href: "/vingear/early-access", label: "Early access" },
      { href: "/event-link", label: "Event Link" },
      { href: "/starlink/caravan-and-touring", label: "Touring Starlink" },
    ],
  }),
  page({
    path: "/vingear/early-access",
    slug: "early-access",
    kicker: "VIN Gear",
    title: "VIN Gear early access",
    lede: "Register interest in Pulse and later VIN Gear products. No deposit, no queue position that means anything, no launch date. We will only write when there is something real to say.",
    description:
      "Register interest in VIN Gear Pulse. Early access waitlist — no payment, no availability promise, no marketing subscription required.",
    crumbs: crumbs("Early access"),
    sections: [
      {
        heading: "What you are signing up for",
        copy: [
          "A note on our side that you asked about VIN Gear. We use the details to tell you if and when a product is actually available. That is not a marketing subscription, and it is not a pre-order.",
        ],
      },
      {
        heading: "What you are not signing up for",
        copy: [
          "A guaranteed unit, a discount, or a specification we have not finished yet.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will you sell my details?",
        a: "No. The privacy page covers how enquiry details are used. VIN Gear interest is an enquiry like any other.",
      },
    ],
    related: [
      { href: "/vingear/pulse", label: "Pulse" },
      { href: "/vingear", label: "VIN Gear" },
      { href: "/privacy", label: "Privacy" },
      { href: "/contact", label: "Contact" },
    ],
  }),
];
