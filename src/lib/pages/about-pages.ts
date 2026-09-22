import type { Article } from "./types";
import { HELP_CTA } from "./types";

function page(partial: Omit<Article, "cluster" | "cta" | "form" | "related"> & { related?: Article["related"]; form?: Article["form"] }): Article {
  return {
    cluster: "about",
    cta: HELP_CTA,
    form: { type: "contact", package: partial.title, button: "Talk to VINCONNECT", messageLabel: "How can we help?" },
    ...partial,
  };
}

export const ABOUT_PAGES: Article[] = [
  page({
    path: "/about/how-we-work",
    slug: "how-we-work",
    kicker: "About",
    title: "How we work",
    lede: "One point of contact. A scope that matches the SMS. A tidy site. A handover you can repeat. That is the job, whether the booking came through the estimator or Circl.",
    description:
      "How VINCONNECT quotes, books and hands over Starlink, Wi-Fi and CCTV work in Victoria. Independent installer based in Cranbourne.",
    crumbs: [
      { label: "About", href: "/about" },
      { label: "How we work" },
    ],
    sections: [
      {
        heading: "Quote, then book",
        copy: [
          "The estimator is a labour range for an address. A conversation confirms storeys, mount, extras and access. Nothing is booked until a time is agreed. Circl-allocated jobs run against the approved work order instead of a VINCONNECT labour quote.",
        ],
      },
      {
        heading: "On site",
        copy: [
          "Walk-around first. Drill second. If the building does not match the booking we pause. We do not invent extras on the ladder.",
        ],
      },
      {
        heading: "After",
        copy: [
          "Handover, photos for our records, and a clear split of who to call. Customer Help and the install terms are the public version of that split.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I deal with a call centre?",
        a: "No. VINCONNECT is a family-run installer. 0408 559 555 is the number on the van.",
      },
    ],
    related: [
      { href: "/about", label: "About" },
      { href: "/about/support", label: "Support" },
      { href: "/customer-help", label: "Customer help" },
      { href: "/about/safety-and-credentials", label: "Safety and credentials" },
    ],
  }),
  page({
    path: "/about/support",
    slug: "support",
    kicker: "About",
    title: "Support",
    lede: "Call 0408 559 555 for VINCONNECT labour. Circl tracking is 1800 950 493. Starlink accounts stay with Starlink. This page is the directory, not a ticket portal.",
    description:
      "VINCONNECT support directory: installer labour, Circl tracking, Starlink accounts, Event Link organisers and VIN Gear interest.",
    crumbs: [
      { label: "About", href: "/about" },
      { label: "Support" },
    ],
    sections: [
      {
        heading: "Pick the right door",
        copy: [],
        list: [
          "VINCONNECT labour, booking, access — 0408 559 555 or the customer-help hub",
          "Circl freight and work orders — 1800 950 493 and the Circl hub",
          "Starlink plan, app, outage — Starlink support",
          "Event connectivity — Event Link for organisers",
          "VIN Gear Pulse — early access interest only",
        ],
      },
      {
        heading: "What we can actually fix",
        copy: [
          "Mounts, cable, entry, the visit we attended, a property network we installed. We cannot reset your Starlink password or move a Circl work order.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is there a helpdesk email?",
        a: "vince@vinconnect.com.au is monitored. The phone is faster on the day of a visit.",
      },
    ],
    related: [
      { href: "/customer-help", label: "Customer help" },
      { href: "/circl-starlink-installations", label: "Circl customers" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
    ],
  }),
  page({
    path: "/about/business-information",
    slug: "business-information",
    kicker: "About",
    title: "Business information",
    lede: "VINCONNECT is a Victorian installation business based in Cranbourne. Independent. Insured. Not Starlink, SpaceX, TP-Link, Hikvision, HiLook or Circl.",
    description:
      "VINCONNECT business information: who we are, where we work, independence from brands we install, and how to reach us. Licence numbers are not published here.",
    crumbs: [
      { label: "About", href: "/about" },
      { label: "Business information" },
    ],
    sections: [
      {
        heading: "The business",
        copy: [
          "Family-run, Cranbourne, Victoria. Starlink installation, whole-property Wi-Fi, wireless links and HiLook CCTV across Casey, Cardinia, Mornington Peninsula, Bass Coast and Gippsland. Led by Vince De Stefano, with assistance from Phoenix.",
        ],
      },
      {
        heading: "Credentials, without the numbers",
        copy: [
          "ACMA registered open cabler, working at heights, White Card, public liability and WorkCover. Certificates are available on request with a quote. We do not publish licence or policy numbers on this website.",
        ],
      },
      {
        heading: "Brands we work with, and are not",
        copy: [
          "We install Starlink, TP-Link Omada, HiLook and related hardware, and we perform Circl-allocated Starlink labour. Using those names describes the kit. It is not a claim of ownership, employment or official endorsement.",
        ],
      },
      {
        heading: "This website",
        copy: [
          "Canonical public site: vinconnect.com.au. The estimator and property planner are tools, not a store. VIN Gear is in development and is not sold here.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you have a shopfront?",
        a: "No. We come to the property. Meetings can be arranged. We are not a retail counter.",
      },
    ],
    related: [
      { href: "/about", label: "About" },
      { href: "/about/capability", label: "Capability statement" },
      { href: "/about/safety-and-credentials", label: "Safety and credentials" },
      { href: "/privacy", label: "Privacy" },
    ],
  }),
];
