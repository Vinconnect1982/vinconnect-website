export type DownloadDoc = {
  slug: string;
  title: string;
  lede: string;
  file: string;
  image: string;
  pages: string;
  topics: string[];
};

export const DOWNLOADS: DownloadDoc[] = [
  {
    slug: "capability-statement",
    title: "VINCONNECT capability statement",
    lede: "Who we are, where we work, credentials, typical scopes and how we quote. For committees, builders and procurement.",
    file: "/downloads/vinconnect-capability-statement.pdf",
    image: "/media/downloads/capability-statement-desk.webp",
    pages: "3 pages",
    topics: ["About", "Credentials", "Regions"],
  },
  {
    slug: "starlink-install-guide",
    title: "Starlink installation guide",
    lede: "Sky view, mount types, cable entry, router placement and what we need from you before the visit.",
    file: "/downloads/starlink-installation-guide.pdf",
    image: "/media/downloads/starlink-install-guide-desk.webp",
    pages: "4 pages",
    topics: ["Starlink", "Mounts", "Handover"],
  },
  {
    slug: "property-wifi-checklist",
    title: "Whole-property Wi-Fi checklist",
    lede: "A one-page walkthrough of house, shed, stable, gate and power — fill it in before the quote call.",
    file: "/downloads/property-wifi-checklist.pdf",
    image: "/media/downloads/property-wifi-checklist-desk.webp",
    pages: "2 pages",
    topics: ["Wi-Fi", "Rural", "Planner"],
  },
  {
    slug: "hilook-package-sheet",
    title: "HiLook package comparison",
    lede: "Home Watch 4, Property Guard 6, Acreage 8 and Stable & Yard — cameras, recorders, starting prices and suitable uses.",
    file: "/downloads/hilook-package-comparison.pdf",
    image: "/media/downloads/hilook-package-sheet-desk.webp",
    pages: "2 pages",
    topics: ["CCTV", "HiLook", "Pricing"],
  },
  {
    slug: "rural-connections-brief",
    title: "Rural Connections brief",
    lede: "Plain-English summary of the travelling hub, the online info resource and the 2026–27 event pathway.",
    file: "/downloads/rural-connections-brief.pdf",
    image: "/media/downloads/rural-connections-brief-desk.webp",
    pages: "3 pages",
    topics: ["Community", "Events", "Advocacy"],
  },
  {
    slug: "event-link-brochure",
    title: "Event Link brochure",
    lede: "The Event Link concept brochure: temporary connectivity for events and regional locations. Design concepts, not a record of completed deployments.",
    file: "/downloads/event-link-brochure.pdf",
    image: "/media/downloads/event-link-brochure-desk.webp",
    pages: "11 pages",
    topics: ["Event Link", "Events", "Brochure"],
  },
  {
    slug: "event-link-onepager",
    title: "Event Link one-pager",
    lede: "What the pilot kit is, what it is not, and how an organiser starts a conversation.",
    file: "/downloads/event-link-onepager.pdf",
    image: "/media/downloads/event-link-onepager-desk.webp",
    pages: "1 page",
    topics: ["Event Link", "Shows", "Wi-Fi"],
  },
  {
    slug: "camera-planning-worksheet",
    title: "Camera planning worksheet",
    lede: "Mark views, power and recording days before anyone counts cameras.",
    file: "/downloads/camera-planning-worksheet.pdf",
    image: "/media/downloads/camera-planning-worksheet-desk.webp",
    pages: "2 pages",
    topics: ["CCTV", "Planner"],
  },
  {
    slug: "install-day-prep",
    title: "Install-day preparation",
    lede: "Access, pets, ladders, power isolation and who needs to be home. Short and practical.",
    file: "/downloads/install-day-prep.pdf",
    image: "/media/downloads/install-day-prep-desk.webp",
    pages: "1 page",
    topics: ["Install", "Safety"],
  },
];

export function downloadBySlug(slug: string) {
  return DOWNLOADS.find((d) => d.slug === slug);
}
