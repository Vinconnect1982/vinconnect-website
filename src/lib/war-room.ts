export type WarItem = {
  title: string;
  detail: string;
  status: "Now" | "Waiting" | "Planned";
  lane: string;
};

export const WAR_NOW: WarItem[] = [
  {
    title: "Measure the Starlink Mini barrel",
    detail: "Confirm the DC barrel inner diameter from a real unit before any production release. This stays unconfirmed until it is measured.",
    status: "Now",
    lane: "Engineering",
  },
  {
    title: "Order Prototype 1 donor parts",
    detail: "Barrel reference, a 100W 20V 5A PD trigger path, a 5A e-marked cable and a test meter. The prototype answers fit and voltage drop faster than more drawings.",
    status: "Now",
    lane: "Prototype",
  },
  {
    title: "Lock the sealed ends",
    detail: "Starlink-style ribbed gland on the DC end and a weather-sealed USB-C end. Final sizes wait on a physical fit and the cable diameter.",
    status: "Now",
    lane: "Engineering",
  },
];

export const WAR_WAITING: WarItem[] = [
  {
    title: "LINKSTRONG drawing and quote",
    detail: "Review the drawing and quotation when it arrives.",
    status: "Waiting",
    lane: "Sourcing",
  },
  {
    title: "E-Best 100W adapter",
    detail: "Check the vehicle-adapter reply and the sample price.",
    status: "Waiting",
    lane: "Sourcing",
  },
  {
    title: "DAMAVO feasibility pack",
    detail: "Review the pack when their engineering is finished.",
    status: "Waiting",
    lane: "Sourcing",
  },
  {
    title: "First launch channel",
    detail: "Progress the first channel test before talking about a launch date.",
    status: "Waiting",
    lane: "Commercial",
  },
];

export const WAR_PLANNED: WarItem[] = [
  {
    title: "Thinner blue-only glow",
    detail: "Keep this as a fallback if the full illumination route is too thick.",
    status: "Planned",
    lane: "Sourcing",
  },
  {
    title: "Another Sunntc contact",
    detail: "Find a second route if the current contact stalls.",
    status: "Planned",
    lane: "Sourcing",
  },
];

export const WAR_STAGES = [
  { title: "Product definition", state: "Done" },
  { title: "Supplier engineering", state: "In progress" },
  { title: "Prototype and physical test", state: "In progress" },
  { title: "Sample approval", state: "Next" },
  { title: "Commercial test", state: "In progress" },
  { title: "Production and launch", state: "Later" },
];
