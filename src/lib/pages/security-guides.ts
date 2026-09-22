import type { Article } from "./types";
import { DISCUSS_CTA, PLAN_CTA } from "./types";

const crumbs = (label: string): Article["crumbs"] => [
  { label: "CCTV", href: "/security" },
  { label },
];

function page(partial: Omit<Article, "cluster" | "form"> & { cta?: Article["cta"] }): Article {
  return {
    cluster: "security",
    cta: partial.cta ?? DISCUSS_CTA,
    form: { type: "contact", package: partial.title, button: "Discuss cameras", messageLabel: "Views, power and what you want to review later" },
    ...partial,
  };
}

export const SECURITY_GUIDES: Article[] = [
  page({
    path: "/security",
    slug: "index",
    kicker: "CCTV & remote monitoring",
    title: "Cameras that match the property",
    lede: "Views first, hardware second. HiLook packages for homes, acreage and stables, plus the planning pages for people who are not ready to pick a kit. VINCONNECT is not Hikvision or HiLook.",
    description:
      "CCTV and remote monitoring for Victorian homes, rural properties and horse properties. HiLook packages, camera planning, solar and recording. Independent VINCONNECT installation.",
    image: "/scenes/home-cctv.webp",
    crumbs: [{ label: "CCTV" }],
    cta: PLAN_CTA,
    children: [
      { href: "/security/how-cctv-is-planned", title: "How CCTV is planned", copy: "Mark the views before you buy cameras." },
      { href: "/security/home-and-acreage", title: "Home and acreage", copy: "Driveway, house and the first paddock." },
      { href: "/security/horse-properties", title: "Horse properties", copy: "Stables and yards that have to work overnight." },
      { href: "/security/solar-and-gate", title: "Solar and gate", copy: "When there is no useful power at the view." },
      { href: "/security/recording-and-playback", title: "Recording and playback", copy: "If it is not recorded, it did not happen." },
      { href: "/security/hilook-cctv-packages", title: "HiLook packages", copy: "Four specified kits with starting prices." },
    ],
    sections: [
      {
        heading: "Packages versus planning",
        copy: [
          "Home Watch 4, Property Guard 6, Acreage 8 and Stable & Yard are specified kits with hardware and labour starting prices. If your place does not fit a kit, we plan cameras instead. Either way, the recorder and the network are part of the job.",
        ],
      },
      {
        heading: "Independence",
        copy: [
          "We install HiLook. We are not Hikvision, HiLook or any camera brand, and we are not officially endorsed by them. Remote view over Starlink is a property-network conversation as much as a camera conversation.",
        ],
      },
    ],
    related: [
      { href: "/security/hilook-cctv-packages", label: "HiLook CCTV packages" },
      { href: "/services/cctv", label: "CCTV service" },
      { href: "/resources/cctv-on-starlink", label: "CCTV on Starlink" },
      { href: "/property-planner", label: "Property planner" },
    ],
  }),
  page({
    path: "/security/how-cctv-is-planned",
    slug: "how-cctv-is-planned",
    kicker: "CCTV",
    title: "How CCTV is planned",
    lede: "Name the views. Note the power. Decide where the recorder lives. Then count cameras. A ‘four camera kit’ without those three facts is shopping, not a plan.",
    description:
      "Camera planning for Victorian properties: views, power, recording and how VINCONNECT uses the property planner before quoting CCTV.",
    crumbs: crumbs("How CCTV is planned"),
    cta: PLAN_CTA,
    image: "/scenes-new/gate-camera.jpg",
    sections: [
      {
        heading: "The order we use",
        copy: [
          "Gate, driveway, doors, stables, fuel, the side that nobody sees from the house. Power at each. A recorder that is not sitting on a floor. Then hardware.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I reuse cameras I already own?",
        a: "If they are compatible with a recorder we can support. Mixing leftover consumer cameras with a new recorder is often more grief than it is worth.",
      },
    ],
    related: [
      { href: "/security/camera-planning", label: "Camera planning service" },
      { href: "/property-planner", label: "Property planner" },
      { href: "/security/hilook-cctv-packages", label: "Packages" },
    ],
  }),
  page({
    path: "/security/home-and-acreage",
    slug: "home-and-acreage",
    kicker: "CCTV",
    title: "Home and acreage cameras",
    lede: "A suburban house and a five-acre block are not the same camera count. Distances, lighting and the gate change the kit.",
    description:
      "Home and acreage CCTV in Victoria. When Home Watch 4 is enough, when Property Guard or Acreage 8 is the honest kit.",
    crumbs: crumbs("Home and acreage"),
    image: "/scenes-new/property-cctv.jpg",
    sections: [
      {
        heading: "Start with the packages, then deviate",
        copy: [
          "Home Watch 4 is a house. Property Guard 6 covers a larger dwelling and the first outbuilding. Acreage 8 is for places where the gate is a walk, not a step. If you are between kits, we plan rather than upsell the next number.",
        ],
      },
    ],
    related: [
      { href: "/security/packages/home-watch", label: "Home Watch 4" },
      { href: "/security/packages/property-guard", label: "Property Guard 6" },
      { href: "/security/packages/acreage", label: "Acreage 8" },
      { href: "/security/home-cctv", label: "Home CCTV service" },
    ],
  }),
  page({
    path: "/security/horse-properties",
    slug: "horse-properties",
    kicker: "CCTV",
    title: "Cameras on horse properties",
    lede: "Stables, yards and a public-road gate. Dust, metal, animals and the 2am check. This is not a doorbell camera with a longer lead.",
    description:
      "Stable and yard CCTV for Victorian horse properties. VINCONNECT Stable & Yard package and planned camera jobs.",
    crumbs: crumbs("Horse properties"),
    image: "/visuals/stable-cctv.webp",
    sections: [
      {
        heading: "Overnight is the brief",
        copy: [
          "If you need to see a stable at 2am, the camera, the light, the network and the recorder all have to exist at 2am. A consumer cloud cam on house Wi-Fi will not.",
        ],
      },
    ],
    related: [
      { href: "/security/stable-cctv", label: "Stable CCTV" },
      { href: "/security/packages/stable-yard", label: "Stable & Yard" },
      { href: "/solutions/horse-properties", label: "Horse property solutions" },
      { href: "/property-networks/equestrian", label: "Equestrian networks" },
    ],
  }),
  page({
    path: "/security/solar-and-gate",
    slug: "solar-and-gate",
    kicker: "CCTV",
    title: "Solar and gate cameras",
    lede: "The view you care about is often the one without a powerpoint. Solar and wireless cameras are a tool, not a way to skip a network plan.",
    description:
      "Solar and remote gate cameras for Victorian rural properties. Power, recording and when a cable is still the better job.",
    crumbs: crumbs("Solar and gate"),
    image: "/visuals/solar-gate.webp",
    sections: [
      {
        heading: "When solar is honest",
        copy: [
          "A gate on a long driveway, a fuel tank, a lane that will never have power. Then we talk solar, mounting, theft, and where the footage lands.",
        ],
      },
      {
        heading: "When it is not",
        copy: [
          "If we can cable it, we should. Batteries and winter sun on a Gippsland south face are a design problem, not a brochure feature.",
        ],
      },
    ],
    related: [
      { href: "/security/solar-cameras", label: "Solar cameras service" },
      { href: "/security/camera-planning", label: "Camera planning" },
      { href: "/property-networks/wireless-building-links", label: "Wireless links" },
    ],
  }),
  page({
    path: "/security/recording-and-playback",
    slug: "recording-and-playback",
    kicker: "CCTV",
    title: "Recording and remote playback",
    lede: "Retention, a recorder that stays powered, and remote view that is a bonus rather than the only copy of the footage.",
    description:
      "CCTV recording, retention and remote playback on VINCONNECT installations, including recorders on Starlink-connected properties.",
    crumbs: crumbs("Recording and playback"),
    sections: [
      {
        heading: "On-site recording first",
        copy: [
          "If the internet drops, the recorder should still be writing. UPS with the rest of the network is part of that conversation. Cloud-only consumer cameras are a different product and not what we spec for rural places.",
        ],
      },
      {
        heading: "Remote view",
        copy: [
          "Works when the upstream works. Starlink is a capable upstream. It does not remove the need for a recorder, a password you can find, and a handover that tests playback before we leave.",
        ],
      },
    ],
    related: [
      { href: "/security/cctv-recording", label: "Recording service page" },
      { href: "/resources/cctv-on-starlink", label: "CCTV on Starlink" },
      { href: "/property-networks/network-cabinets", label: "Cabinets" },
    ],
  }),
];
