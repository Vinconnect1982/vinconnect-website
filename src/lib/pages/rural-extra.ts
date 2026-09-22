import type { Article } from "./types";
import { HELP_CTA } from "./types";

const crumbs = (label: string): Article["crumbs"] => [
  { label: "Rural Connections", href: "/rural-connections" },
  { label },
];

function page(partial: Omit<Article, "cluster" | "cta" | "form" | "related"> & { related?: Article["related"]; form?: Article["form"] }): Article {
  return {
    cluster: "rural",
    cta: HELP_CTA,
    form: { type: "contact", package: partial.title, button: "Ask VINCONNECT", messageLabel: "Event, community or property — how can we help?" },
    ...partial,
  };
}

export const RURAL_EXTRA: Article[] = [
  page({
    path: "/rural-connections/visiting-the-hub",
    slug: "visiting-the-hub",
    kicker: "Roadshow",
    title: "Visiting the Rural Connection Hub",
    lede: "Shade, a seat, free Wi-Fi and a conversation that does not start with a sales pitch. Come for the event. Stay if the information is useful.",
    description:
      "What to expect at a VINCONNECT Rural Connections Roadshow hub: free Wi-Fi, demonstrations, farmer-health resources, no marketing opt-in.",
    crumbs: crumbs("Visiting the hub"),
    image: "/scenes-new/roadshow-hub.jpg",
    sections: [
      {
        heading: "People first",
        copy: [
          "The Roadshow sits inside agricultural shows, field days and rural community events. It is a place to sit down, get online, and pick up practical information. Commercial Starlink work is available if you ask. It is not the door fee.",
        ],
      },
      {
        heading: "What you will not be asked for",
        copy: [
          "An email to get on the Wi-Fi. A quote before you can sit down. A grant application filled in on your behalf.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to book a seat?",
        a: "No. Host-event entry is whatever that show already requires. The hub itself is drop-in.",
      },
    ],
    related: [
      { href: "/rural-connections/roadshow", label: "Roadshow hub" },
      { href: "/rural-connections/roadshow-dates", label: "Indicative dates" },
      { href: "/event-link", label: "Event Link" },
      { href: "/rural-connections/wellbeing-resources", label: "Wellbeing resources" },
    ],
  }),
  page({
    path: "/rural-connections/roadshow-dates",
    slug: "roadshow-dates",
    kicker: "Roadshow",
    title: "Roadshow dates 2026–27",
    lede: "An indicative pathway through Gippsland and Cardinia shows. Dates remain subject to confirmation with host events. This is not a ticketed VINCONNECT tour.",
    description:
      "Indicative VINCONNECT Rural Connections Roadshow dates from Korumburra Sheepdog Trials in November 2026 through Bunyip Show in April 2027.",
    crumbs: crumbs("Roadshow dates"),
    image: "/scenes-new/roadshow-hub.jpg",
    sections: [
      {
        heading: "Indicative pathway",
        copy: [
          "November 2026 — Korumburra Sheepdog Trials. January 2027 — Lang Lang Show. February 2027 — Korumburra Show. March 2027 — Warragul Show and Farm World at Lardner Park. April 2027 — Bunyip Show. Horse and rural-property events roll through Gippsland, Cardinia and Bass Coast.",
          "Participation is always subject to the host. If a date moves, it moves. We will not pretend a maybe is a booking.",
        ],
      },
      {
        heading: "If you run one of these events",
        copy: [
          "Talk to us about the hub and, separately, about Event Link if you need the kit itself. Connectivity on site is not automatic just because the Roadshow is listed.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is Farm World confirmed?",
        a: "It is listed as a major field-day opportunity. Confirmation sits with the host event.",
      },
    ],
    related: [
      { href: "/rural-connections/roadshow", label: "Roadshow hub" },
      { href: "/rural-connections/visiting-the-hub", label: "Visiting the hub" },
      { href: "/event-link/organisers", label: "Event organisers" },
    ],
  }),
  page({
    path: "/rural-connections/community-wifi",
    slug: "community-wifi",
    kicker: "Rural Connections",
    title: "Community Wi-Fi at the hub",
    lede: "Free, no marketing opt-in, sized for the hub — not a promise to cover the whole showgrounds. That distinction matters and we will keep repeating it.",
    description:
      "Community Wi-Fi at VINCONNECT Rural Connection Hubs. No email capture. Not a showgrounds-wide network.",
    crumbs: crumbs("Community Wi-Fi"),
    image: "/scenes-new/rural-event.jpg",
    sections: [
      {
        heading: "The rule",
        copy: [
          "If you are sitting in the hub, you should be able to get online without handing over an email for a newsletter. If an organiser wants Event Link for a larger area, that is a scoped activation with a different conversation.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will you see what I browse?",
        a: "The hub is not a surveillance product. Use it like any public Wi-Fi: do not do your banking on a showgrounds network if you would not do it at a cafe.",
      },
    ],
    related: [
      { href: "/rural-connections/visiting-the-hub", label: "Visiting the hub" },
      { href: "/event-link", label: "Event Link" },
      { href: "/event-link/what-is-included", label: "What Event Link includes" },
    ],
  }),
  page({
    path: "/rural-connections/wellbeing-resources",
    slug: "wellbeing-resources",
    kicker: "Rural Connections",
    title: "Farmer and community wellbeing resources",
    lede: "We host recognised material and point at recognised services. VINCONNECT is not a health provider, a counsellor, or a substitute for 000.",
    description:
      "Farmer wellbeing and community resources at VINCONNECT Rural Connection Hubs. Links to recognised services only. VINCONNECT is not a health provider.",
    crumbs: crumbs("Wellbeing resources"),
    image: "/scenes-new/info-hub-farmer.jpg",
    sections: [
      {
        heading: "What the hub offers",
        copy: [
          "Printed and linked material from recognised farmer-health and community services, available without a sales conversation. Look Over the Farm Gate is one Victorian program we align with as information — not as a claim that a grant has been approved.",
        ],
      },
      {
        heading: "If you need help now",
        copy: [
          "In an emergency call 000. For crisis support in Australia, Lifeline is 13 11 14. For farmer-specific wellbeing, ask at the hub for the current recognised service list — we will not invent a hotline on this page.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can VINCONNECT apply for a wellbeing grant for my event?",
        a: "Eligibility sits with the program and the applicant. We can talk about alignment. We do not sell grant outcomes.",
      },
    ],
    related: [
      { href: "/rural-connections", label: "Rural Connections" },
      { href: "/rural-connections/roadshow", label: "Roadshow" },
      { href: "/rural-connections/advocacy", label: "Advocacy" },
    ],
  }),
];
