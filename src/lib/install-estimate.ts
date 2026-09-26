import {
  CONDUIT_EXTRA,
  DOUBLE_STOREY_ADD,
  INTERNAL_WALLS,
  MOUNT_HOCKEY,
  MOUNT_TRIPOD,
  ROUTER_RELOCATION,
  SATURDAY_INSTALL,
  STANDARD_INSTALL,
  mountQuote,
  travelAmount,
  travelKm,
  type AccessDifficulty,
  type CableRoute,
  type EstimateInput,
  type EstimateResult,
  type LineItem,
  type MountNeed,
  type RoofId,
  type StarlinkSituation,
  type YesNoUnknown,
} from "./pricing.ts";
import { formatAud, haversineKm } from "./utils.ts";

/**
 * One installation engine for the website, stored quote, admin, PDF and email.
 *
 * GST: published VINCONNECT prices are GST-inclusive. This engine does not add 10%.
 * The $100 figure is the provisional customer labour rate for task hours, not a wage.
 * The published $300 package is not recalculated when that rate changes.
 *
 * Installed amount =
 *   equipment sell + installation materials + labour + travel + other approved charges − discounts.
 * A fixed package replaces the task hours it already includes. Those hours are not charged again.
 * Travel maths stay in travelAmount. They are not copied into customer text.
 */
export const PRICING_VERSION = "2026-09-26-install-v2";
export const LABOUR_RATE_AUD = 100;
export const GST_LABEL = "Prices are in AUD and include GST. GST is not added on top.";

/** Person-hours for one technician unless extra person-hours are added on purpose. */
export const TASK_HOURS = {
  setup: 0.4,
  handover: 0.5,
  starlinkMount: 0.8,
  externalCable15: 0.7,
  penetration: 0.35,
  routerEntry: 0.25,
  alignCheck: 0.35,
  p2pEndpoint: 0.9,
  p2pConfig: 0.4,
  indoorAp: 0.6,
  difficultAccess: 1,
} as const;

export const TASK_INCLUDES: Record<keyof typeof TASK_HOURS, string> = {
  setup: "Once per visit. Arrive, check the sky and agree the route. Not repeated per building or per link.",
  handover: "Once per visit. Testing, labelling and handover. Not repeated per building.",
  starlinkMount: "Fit the dish to the agreed mount and align it. Does not include making a specialist mount.",
  externalCable15: "Clip a visible external cable up to 15 m to the entry wall. Not conduit, a roof-space chase, or a trench.",
  penetration: "One sealed building entry. A second entry is not included.",
  routerEntry: "Place the router on the inside of that entry wall, beside an existing power point. Not a new circuit and not another room.",
  alignCheck: "Check the aim of a dish that is already mounted. No new mount and no new cable.",
  p2pEndpoint:
    "One radio only: fit it to a bracket, make one weatherproof entry, and terminate up to 5 m of outdoor cable at that building. Not the map distance. Not a second technician.",
  p2pConfig: "Once per link. Pair the two radios. Not a second setup and not charged again per endpoint.",
  indoorAp: "Fit and configure one indoor access point. The access point itself is not priced.",
  difficultAccess: "One extra person-hour when access is harder than the booked storey. Provisional. Not automatically a second technician.",
};

/** The published package is 3.0 hours of explanation. It is not a second charge on top of $300. */
export const PACKAGE_HOURS = 3;
export const WIRELESS_FROM_M = 40;
/** Local drop at one wireless endpoint. Not the distance drawn on the map. */
export const PROVISIONAL_ENDPOINT_CABLE_M = 5;

/**
 * Supplier shelf references for an EAP215-Bridge KIT. Not VINCONNECT sell prices.
 * The lower figure was a temporary promotion and is not an ongoing selling price.
 */
export const LINK_KIT_LOW = 281;
export const LINK_KIT_HIGH = 370;

export type MaterialDisposition = "package" | "customer" | "with-equipment" | "separate" | "assessment";
export type Approval = "published" | "provisional" | "reference-only" | "unapproved";
export type Completeness = "complete" | "range" | "partial";

export type InstallTask = {
  id: string;
  label: string;
  personHours: number;
  charged: boolean;
  amount: number;
  provisional: boolean;
  includes: string;
  reason: string;
};

export type InstallMaterial = {
  id: string;
  taskId: string;
  label: string;
  qty: number;
  unit: string;
  sell: number | null;
  disposition: MaterialDisposition;
  source: string;
  sourceDate: string;
  approval: Approval;
  provisional: boolean;
};

export type SupplierReference = {
  id: string;
  label: string;
  amount: number;
  source: string;
  sourceDate: string;
  approval: "reference-only";
};

export type AllowanceRecord = {
  id: string;
  label: string;
  amount: number | null;
  source: string;
  sourceDate: string;
  approval: Approval;
};

const ON = "2026-09-26";

export const ALLOWANCES: Record<string, AllowanceRecord> = {
  standardPackage: {
    id: "standard-package",
    label: "Standard installation package",
    amount: STANDARD_INSTALL,
    source: "Published single-storey weekday package. Includes the visit, basic clips, sealant and one brush plate. Not a labour-only invoice.",
    sourceDate: ON,
    approval: "published",
  },
  labourRate: {
    id: "labour-rate",
    label: "Customer labour rate",
    amount: LABOUR_RATE_AUD,
    source: "Provisional customer charge for task hours outside the published package. Not a wage. No second margin.",
    sourceDate: ON,
    approval: "provisional",
  },
  doubleStorey: {
    id: "double-storey",
    label: "Double storey",
    amount: DOUBLE_STOREY_ADD,
    source: "Published access allowance. Not a second labour rate and not an extra technician.",
    sourceDate: ON,
    approval: "published",
  },
  internalWalls: {
    id: "internal-walls",
    label: "Internal walls",
    amount: INTERNAL_WALLS,
    source: "Customer help: internal walls from $150. The page says the figure can change, so it is not a fixed ceiling.",
    sourceDate: ON,
    approval: "published",
  },
  routerRelocation: {
    id: "router-relocation",
    label: "Router relocation",
    amount: ROUTER_RELOCATION,
    source: "Install terms: moving the router into a garage, cabinet, rack or another room.",
    sourceDate: ON,
    approval: "published",
  },
  dataCabinet: {
    id: "data-cabinet",
    label: "Data cabinet",
    amount: null,
    source: "The old $120 cabinet line is not used on new estimates. Placing the router in a garage or data cabinet is the same $150 placement as moving it off the entry wall.",
    sourceDate: ON,
    approval: "unapproved",
  },
  conduit: {
    id: "conduit",
    label: "Conduit",
    amount: CONDUIT_EXTRA,
    source: "Install terms: straightforward conduit, labour and basic materials together.",
    sourceDate: ON,
    approval: "published",
  },
  weekend: {
    id: "weekend",
    label: "Weekend surcharge",
    amount: SATURDAY_INSTALL,
    source: "Install terms: $150 weekend surcharge when it was disclosed. Saturday and Sunday are the same figure. No separate Sunday rate is published.",
    sourceDate: ON,
    approval: "published",
  },
  mountTripod: {
    id: "mount-tripod",
    label: "Tripod with compatible adapter",
    amount: MOUNT_TRIPOD,
    source: "VINCONNECT sell price. A Bunnings pipe-adapter shelf price is a supplier reference, not this price.",
    sourceDate: ON,
    approval: "published",
  },
  mountHockey: {
    id: "mount-hockey",
    label: "Hockey-stick mount with compatible adapter",
    amount: MOUNT_HOCKEY,
    source: "VINCONNECT sell price for a tile roof. Not a supplier shelf price.",
    sourceDate: ON,
    approval: "published",
  },
  linkKit: {
    id: "link-kit",
    label: "Wireless bridge kit",
    amount: null,
    source: "No approved VINCONNECT sell price. Supplier references are stored separately and are not a quote.",
    sourceDate: ON,
    approval: "unapproved",
  },
  serviceVisit: {
    id: "service-visit",
    label: "Existing-dish visit",
    amount: null,
    source: "No minimum service-visit charge is on file. Do not publish the hour arithmetic as a new service.",
    sourceDate: ON,
    approval: "unapproved",
  },
};

export type InstallEstimate = {
  pricingVersion: string;
  gstTreatment: "inclusive";
  gstLabel: string;
  labourRateAud: number;
  crew: { technicians: number; hoursAre: "person-hours" };
  mode: "package" | "task" | "review" | "callback";
  completeness: Completeness;
  tasks: InstallTask[];
  materials: InstallMaterial[];
  supplierReferences: SupplierReference[];
  allowances: AllowanceRecord[];
  inputs: {
    property: Job["property"];
    depth: Job["depth"];
    located: boolean;
    lat: number;
    lng: number;
    storeys: Job["storeys"];
    day: Job["day"];
    roof: Job["roof"];
    mountNeed: Job["mountNeed"];
    internal: boolean;
    cabinet: boolean;
    conduit: boolean;
    starlink: Job["starlink"];
    routerOnEntryWall: Job["routerOnEntryWall"];
    cableRoute: Job["cableRoute"];
    powerAtRouter: Job["powerAtRouter"];
    access: Job["access"];
    extraPersonHours: number;
    links: Job["links"];
  };
  labourHours: number;
  labourAmount: number;
  materialsAmount: number;
  equipmentLow: number;
  equipmentHigh: number;
  travelAmount: number;
  otherAmount: number;
  discounts: number;
  precise: boolean;
  openEnded: boolean;
  low: number;
  high: number | null;
  total: number | null;
  assumptions: string[];
  exclusions: string[];
  reviews: string[];
  inclusions: string[];
  decisions: string[];
  customerLines: LineItem[];
  customerHeadline: string;
  rangeExplanation: string | null;
  revisions: { at: string; reason: string }[];
};

export type PropertyPlanPlace = {
  label: string;
  kind: string;
  lat: number;
  lng: number;
  power: boolean;
  isSource: boolean;
};

type Job = {
  property: "residential" | "commercial";
  depth: "quick" | "detailed";
  located: boolean;
  lat: number;
  lng: number;
  storeys: "single" | "double";
  day: "weekday" | "saturday" | "sunday";
  roof: RoofId | "unknown";
  mountNeed: MountNeed;
  internal: boolean;
  cabinet: boolean;
  conduit: boolean;
  starlink: StarlinkSituation;
  routerOnEntryWall: YesNoUnknown;
  cableRoute: CableRoute;
  powerAtRouter: YesNoUnknown;
  access: AccessDifficulty;
  extraPersonHours: number;
  links: { label: string; straightLineM: number; method: "wireless" | "near"; power: boolean }[];
};

const PAYMENT = "Payment is due on the day of installation.";
const KIT = "Starlink hardware, the monthly plan and any in-app offer are not included.";

export type RateConfig = { labourRateAud?: number };

function money(hours: number, rate: number) {
  return Math.round(hours * rate);
}

function task(
  id: string,
  label: string,
  personHours: number,
  charged: boolean,
  provisional: boolean,
  includes: string,
  reason: string,
  rate: number,
): InstallTask {
  return { id, label, personHours, charged, amount: charged ? money(personHours, rate) : 0, provisional, includes, reason };
}

function mat(row: InstallMaterial): InstallMaterial {
  return row;
}

export function hideTravelFormula(text: string) {
  return text
    .replace(/\$?\d+(?:\.\d+)?\s*per\s*k(?:m|ilometre)/gi, "")
    .replace(/\b1\.80\b/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function customerTravelNote(located: boolean, travel: number) {
  const note = !located
    ? "Travel is not in this figure yet. We will confirm it from the address."
    : travel === 0
      ? "Travel from Cranbourne is included for this address."
      : "Travel from Cranbourne is included in the quote.";
  return hideTravelFormula(note);
}

export function jobFromEstimateInput(input: EstimateInput): Job {
  const detailed = input.depth === "detailed";
  return {
    property: input.property,
    depth: input.depth,
    located: input.located,
    lat: input.lat,
    lng: input.lng,
    storeys: input.storeys,
    day: detailed ? input.day : "weekday",
    roof: input.roof,
    mountNeed: detailed ? input.mountNeed : "unknown",
    internal: detailed && input.internal,
    cabinet: detailed && input.cabinet,
    conduit: detailed && (input.conduit ?? false),
    starlink: detailed ? input.starlink ?? "new" : "new",
    routerOnEntryWall: detailed ? input.routerOnEntryWall ?? "yes" : "yes",
    cableRoute: detailed ? input.cableRoute ?? (input.internal ? "internal" : "external") : "external",
    powerAtRouter: detailed ? input.powerAtRouter ?? "yes" : "yes",
    access: detailed ? input.access ?? "straightforward" : "straightforward",
    extraPersonHours: input.extraPersonHours ?? 0,
    links: [],
  };
}

export function jobFromPropertyPlan(input: {
  lat: number;
  lng: number;
  located: boolean;
  internet: string;
  storeys: "single" | "double";
  roof: RoofId | "unknown";
  mountNeed: MountNeed;
  cableRoute?: CableRoute;
  powerAtRouter?: YesNoUnknown;
  places: PropertyPlanPlace[];
}): Job {
  const source = input.places.find((place) => place.isSource) ?? input.places[0];
  const links = input.places
    .filter((place) => place !== source)
    .map((place) => {
      const metres = source ? Math.round(haversineKm(source, place) * 1000) : 0;
      return {
        label: place.label,
        straightLineM: metres,
        method: metres > WIRELESS_FROM_M ? ("wireless" as const) : ("near" as const),
        power: place.power,
      };
    });
  const starlink: StarlinkSituation = input.internet === "nbn" || input.internet === "mobile" ? "none" : "new";
  return {
    property: "residential",
    depth: "detailed",
    located: input.located,
    lat: input.lat,
    lng: input.lng,
    storeys: input.storeys,
    day: "weekday",
    roof: input.roof,
    mountNeed: input.mountNeed,
    internal: false,
    cabinet: false,
    conduit: false,
    starlink,
    routerOnEntryWall: "yes",
    cableRoute: input.cableRoute ?? "unknown",
    powerAtRouter: input.powerAtRouter ?? "yes",
    access: "unknown",
    extraPersonHours: 0,
    links,
  };
}

export function priceInstall(job: Job, config?: RateConfig): InstallEstimate {
  const rate = config?.labourRateAud ?? LABOUR_RATE_AUD;
  if (job.property === "commercial") return emptyCommercial(job, rate);

  const assumptions: string[] = [];
  const exclusions: string[] = [
    KIT,
    "Mains electrical work, switchboards and new circuits need a licensed electrician and are not in this figure.",
    "Tree work, roof repairs and making good existing damage are not included.",
  ];
  const reviews: string[] = [];
  const inclusions: string[] = [];
  const decisions: string[] = [];
  const tasks: InstallTask[] = [];
  const materials: InstallMaterial[] = [];
  const supplierReferences: SupplierReference[] = [];
  const blocks: string[] = [];
  const rangeBits: string[] = [];
  let otherAmount = 0;
  let rangeLow = 0;
  let rangeHigh = 0;
  const packageScope = job.starlink === "new";
  const used = new Set<keyof typeof ALLOWANCES>();
  const use = (key: keyof typeof ALLOWANCES) => used.add(key);

  if (packageScope) {
    use("standardPackage");
    inclusions.push(
      "Standard installation package: mount the dish, clip a visible cable to the entry wall, one sealed penetration, brush plate, and the router on that wall near power.",
      "Basic clips, sealant and the brush plate are inside the package. Commissioning and a short handover are included.",
    );
    const why = "Inside the published $300 package. The hour split explains that package. It is not a second charge.";
    tasks.push(
      task("setup", "Shared setup, sky check and agree the route", TASK_HOURS.setup, false, false, TASK_INCLUDES.setup, why, rate),
      task("starlink-mount", "Mount and align Starlink", TASK_HOURS.starlinkMount, false, false, TASK_INCLUDES.starlinkMount, why, rate),
      task("cable-15", "External clipped cable, up to 15 m", TASK_HOURS.externalCable15, false, false, TASK_INCLUDES.externalCable15, why, rate),
      task("penetration", "One sealed penetration and brush plate", TASK_HOURS.penetration, false, false, TASK_INCLUDES.penetration, why, rate),
      task("router-entry", "Router on the backing wall near power", TASK_HOURS.routerEntry, false, false, TASK_INCLUDES.routerEntry, why, rate),
      task("handover", "Testing, labelling and handover", TASK_HOURS.handover, false, false, TASK_INCLUDES.handover, "Once per visit, inside the package.", rate),
    );
    materials.push(
      mat({
        id: "clips",
        taskId: "cable-15",
        label: "Cable clips",
        qty: 1,
        unit: "set",
        sell: 0,
        disposition: "package",
        source: "Included in the $300 package. No separate sell price.",
        sourceDate: ON,
        approval: "published",
        provisional: false,
      }),
      mat({
        id: "sealant",
        taskId: "penetration",
        label: "Sealant",
        qty: 1,
        unit: "set",
        sell: 0,
        disposition: "package",
        source: "Included in the $300 package. No separate sell price.",
        sourceDate: ON,
        approval: "published",
        provisional: false,
      }),
      mat({
        id: "brush-plate",
        taskId: "penetration",
        label: "Brush plate",
        qty: 1,
        unit: "each",
        sell: 0,
        disposition: "package",
        source: "Included in the $300 package. No separate sell price.",
        sourceDate: ON,
        approval: "published",
        provisional: false,
      }),
      mat({
        id: "starlink-kit",
        taskId: "starlink-mount",
        label: "Starlink kit",
        qty: 1,
        unit: "kit",
        sell: null,
        disposition: "customer",
        source: "Supplied by the customer or by Circl. Excluded. Not entered as a $0 inclusion.",
        sourceDate: ON,
        approval: "published",
        provisional: false,
      }),
    );
    assumptions.push(
      "The published $300 is a standard installation package: the visit, basic clips, sealant and one brush plate. It is not a claim that every dollar is labour only. There is no approved split of that $300 into a labour invoice and a materials invoice.",
    );
  } else if (job.starlink === "existing") {
    use("serviceVisit");
    inclusions.push("Check the existing dish and hand over. No new mount and no new cable unless another line says so.");
    tasks.push(
      task("setup", "Shared setup and agree what is already installed", TASK_HOURS.setup, true, true, TASK_INCLUDES.setup, "Once per visit. Not the installation package.", rate),
      task("align-check", "Check alignment on the existing dish", TASK_HOURS.alignCheck, true, true, TASK_INCLUDES.alignCheck, "Provisional. Configuration only.", rate),
      task("handover", "Testing, labelling and handover", TASK_HOURS.handover, true, true, TASK_INCLUDES.handover, "Once per visit.", rate),
    );
    blocks.push("No minimum service-visit charge is confirmed. The hour arithmetic is not a published service.");
    decisions.push("Existing-dish visit: 1.25 person-hours is an internal provisional allowance only. No customer price until the condition, scope and any minimum are confirmed.");
    assumptions.push("The dish is already installed. This is not the $300 package and it is not a fixed-price service.");
  }

  if (job.storeys === "double" && packageScope) {
    use("doubleStorey");
    otherAmount += DOUBLE_STOREY_ADD;
    assumptions.push("Double storey uses the published $250 access allowance. It is not a second labour rate, and a second technician is not added on top.");
  }
  if (job.access === "difficult") {
    const issue =
      job.storeys === "double"
        ? "Access is harder than the double-storey supplement already covers. That extra hour is not added automatically."
        : "Access is beyond the standard package. No extra hour is added until the specific issue is reviewed.";
    reviews.push(issue);
    blocks.push(issue);
    assumptions.push("A second technician is not assumed. Extra person-hours are added only when they are set explicitly.");
  } else if (job.access === "unknown") {
    assumptions.push("Access is not confirmed. The price assumes a straightforward visit and changes if the roof is unsafe or blocked.");
  }
  if (job.extraPersonHours > 0) {
    use("labourRate");
    tasks.push(
      task(
        "extra-tech",
        "Additional technician",
        job.extraPersonHours,
        true,
        false,
        "Explicit person-hours only. Not assumed from the job type.",
        "Added because extra person-hours were set. One technician is the default.",
        rate,
      ),
    );
    assumptions.push("Additional technician hours were set explicitly. They are not an automatic second-person charge.");
  }

  const placement = job.routerOnEntryWall === "no" || job.cabinet;
  const sameCableRun = Boolean(job.internal && packageScope && placement);
  if (!placement && job.routerOnEntryWall === "unknown") {
    blocks.push("Router position is not confirmed. Another room, garage or cabinet is the $150 placement, and it has not been assumed.");
    reviews.push("Router location unknown.");
  } else if (sameCableRun) {
    use("routerRelocation");
    use("internalWalls");
    otherAmount += ROUTER_RELOCATION;
    inclusions.push("One $150 starting allowance covers the router moving off the entry wall, including a garage or data cabinet, and the internal cable run when that is the same work.");
    blocks.push("Additional cabling requires review. The $150 is a starting allowance, not a complete installed amount.");
    assumptions.push("Internal walls and router or cabinet placement were both selected. One $150 starting allowance is applied, not $150 plus $150, and not the old $120 cabinet figure.");
  } else if (job.internal && packageScope) {
    use("internalWalls");
    otherAmount += INTERNAL_WALLS;
    inclusions.push("Internal walls start at $150, subject to the route and access.");
    blocks.push("Additional cabling requires review. The internal-wall figure is a starting allowance, not a complete installed amount.");
  } else if (placement) {
    use("routerRelocation");
    otherAmount += ROUTER_RELOCATION;
    inclusions.push("Placing or relocating the router away from the entry wall, including a garage or data cabinet, is one $150 extra. The router on the wall behind the entry point stays included.");
    assumptions.push("The $120 cabinet option is not charged on new estimates.");
  }
  if (job.conduit && packageScope) {
    use("conduit");
    otherAmount += CONDUIT_EXTRA;
    inclusions.push("A straightforward conduit run is the published $120 extra. Basic conduit materials and the labour to fit them are both inside that figure.");
    materials.push(
      mat({
        id: "conduit",
        taskId: "cable-15",
        label: "Conduit for a straightforward agreed run",
        qty: 1,
        unit: "allowance",
        sell: 0,
        disposition: "package",
        source: "Included in the published $120. Not charged again as materials or as extra task hours.",
        sourceDate: ON,
        approval: "published",
        provisional: false,
      }),
    );
  }
  if (job.cableRoute === "underground") {
    exclusions.push("Underground cable and excavation are a separate assessment. They are not given a token price.");
    blocks.push("Underground route needs a site review before any installed total.");
    reviews.push("Underground route.");
  } else if (job.cableRoute === "unknown") {
    blocks.push("Cable route is not confirmed. A visible clipped run is the package assumption, not a complete total for an unknown route.");
    reviews.push("Cable route unknown.");
  } else if (job.cableRoute === "internal" && !job.internal && packageScope) {
    assumptions.push("The cable route was marked internal. The internal-wall starting figure applies only when that extra is selected.");
  }
  if (job.powerAtRouter === "no") {
    exclusions.push("No power was marked at the router. A new mains circuit is not included.");
    blocks.push("No power at the router. An electrician is required and that work is not priced.");
    reviews.push("No power at the router.");
  } else if (job.powerAtRouter === "unknown") {
    blocks.push("Power at the router is not confirmed, so this cannot be a complete installed total.");
    reviews.push("Power at the router is unknown.");
  }
  if (job.day === "saturday" || job.day === "sunday") {
    use("weekend");
    otherAmount += SATURDAY_INSTALL;
    assumptions.push("Saturday and Sunday each use the same $150 weekend supplement, once per job. There is no extra Sunday rate.");
  } else {
    assumptions.push("Weekend bookings attract a $150 supplement. It is not included unless the appointment is on Saturday or Sunday.");
  }
  if (!job.located) blocks.push("Travel is not in this figure yet.");

  const mount = quoteMount(job, materials, assumptions, reviews, blocks, rangeBits, (low, high) => {
    rangeLow += low;
    rangeHigh += high;
  });

  for (const link of job.links) {
    if (link.method === "wireless") {
      use("labourRate");
      use("linkKit");
      tasks.push(
        task(`p2p-a-${link.label}`, `First wireless endpoint at ${link.label}`, TASK_HOURS.p2pEndpoint, true, true, TASK_INCLUDES.p2pEndpoint, "Endpoint A. A link has two. Setup is not charged again.", rate),
        task(`p2p-b-${link.label}`, `Second wireless endpoint at ${link.label}`, TASK_HOURS.p2pEndpoint, true, true, TASK_INCLUDES.p2pEndpoint, "Endpoint B. Configuration is a separate shared task.", rate),
        task(`p2p-config-${link.label}`, `Configure the link to ${link.label}`, TASK_HOURS.p2pConfig, true, true, TASK_INCLUDES.p2pConfig, "Once per link, not once per endpoint.", rate),
      );
      for (const end of ["A", "B"] as const) {
        const endLabel = end === "A" ? "near" : "far";
        materials.push(
          mat({
            id: `bracket-${end}-${link.label}`,
            taskId: `p2p-${end === "A" ? "a" : "b"}-${link.label}`,
            label: `Mount or bracket, ${link.label} endpoint ${endLabel}`,
            qty: 1,
            unit: "each",
            sell: null,
            disposition: "assessment",
            source: "No approved VINCONNECT bracket price. Not assumed to be inside the radio kit.",
            sourceDate: ON,
            approval: "unapproved",
            provisional: true,
          }),
          mat({
            id: `cable-${end}-${link.label}`,
            taskId: `p2p-${end === "A" ? "a" : "b"}-${link.label}`,
            label: `Outdoor-rated cable, ${link.label} endpoint ${endLabel}`,
            qty: PROVISIONAL_ENDPOINT_CABLE_M,
            unit: "m provisional",
            sell: null,
            disposition: "assessment",
            source: `Provisional local allowance of ${PROVISIONAL_ENDPOINT_CABLE_M} m at this building. The map distance is not a cable length. No sell price per metre is approved.`,
            sourceDate: ON,
            approval: "provisional",
            provisional: true,
          }),
          mat({
            id: `term-${end}-${link.label}`,
            taskId: `p2p-${end === "A" ? "a" : "b"}-${link.label}`,
            label: `Termination, ${link.label} endpoint ${endLabel}`,
            qty: 1,
            unit: "each",
            sell: null,
            disposition: "assessment",
            source: "The labour to terminate is inside the endpoint allowance. The connector has no approved sell price.",
            sourceDate: ON,
            approval: "unapproved",
            provisional: true,
          }),
          mat({
            id: `weather-${end}-${link.label}`,
            taskId: `p2p-${end === "A" ? "a" : "b"}-${link.label}`,
            label: `Weatherproofing, ${link.label} endpoint ${endLabel}`,
            qty: 1,
            unit: "each",
            sell: null,
            disposition: "assessment",
            source: "No approved sell price. Not treated as included or free.",
            sourceDate: ON,
            approval: "unapproved",
            provisional: true,
          }),
          mat({
            id: `entry-${end}-${link.label}`,
            taskId: `p2p-${end === "A" ? "a" : "b"}-${link.label}`,
            label: `Building entry, ${link.label} endpoint ${endLabel}`,
            qty: 1,
            unit: "each",
            sell: null,
            disposition: "assessment",
            source: "One entry is inside the endpoint labour allowance. The gland or plate has no approved sell price.",
            sourceDate: ON,
            approval: "unapproved",
            provisional: true,
          }),
        );
      }
      materials.push(
        mat({
          id: `link-${link.label}`,
          taskId: `p2p-config-${link.label}`,
          label: `Point-to-point radios for ${link.label}`,
          qty: 1,
          unit: "kit",
          sell: null,
          disposition: "assessment",
          source: "No approved VINCONNECT sell price. Supplier shelf references are not this quote. Injectors that come with a chosen kit are not added again.",
          sourceDate: ON,
          approval: "unapproved",
          provisional: true,
        }),
      );
      supplierReferences.push(
        {
          id: `link-ref-promo-${link.label}`,
          label: `EAP215-Bridge KIT shelf reference for ${link.label}`,
          amount: LINK_KIT_LOW,
          source: "Everyday Rewards listing window 24–30 Sep 2026. Temporary promotion. Not a VINCONNECT sell price.",
          sourceDate: ON,
          approval: "reference-only",
        },
        {
          id: `link-ref-shelf-${link.label}`,
          label: `EAP215-Bridge KIT shelf reference for ${link.label}`,
          amount: LINK_KIT_HIGH,
          source: "Tech Support 365 shelf, page dated 5 Jan 2026 and still listed on 26 Sep 2026. Not a VINCONNECT sell price.",
          sourceDate: "2026-01-05",
          approval: "reference-only",
        },
      );
      assumptions.push(
        `${link.label} is about ${link.straightLineM} m in a straight line. That chooses a wireless link. It is not a cable quantity. Each endpoint has a provisional local cable allowance of ${PROVISIONAL_ENDPOINT_CABLE_M} m, which still has no sell price.`,
      );
      blocks.push(`Wireless link to ${link.label}: radios, brackets, outdoor cable, terminations, weatherproofing and building entries are not priced.`);
    } else {
      use("labourRate");
      tasks.push(
        task(`ap-${link.label}`, `Install and configure indoor coverage for ${link.label}`, TASK_HOURS.indoorAp, true, true, TASK_INCLUDES.indoorAp, "Close building. Provisional labour.", rate),
      );
      materials.push(
        mat({
          id: `ap-${link.label}`,
          taskId: `ap-${link.label}`,
          label: `Indoor access point for ${link.label}`,
          qty: 1,
          unit: "each",
          sell: null,
          disposition: "assessment",
          source: "No published VINCONNECT price. Not entered as $0.",
          sourceDate: ON,
          approval: "unapproved",
          provisional: true,
        }),
      );
      assumptions.push(`${link.label} is about ${link.straightLineM} m away. The straight line is not a cable length.`);
      blocks.push(`Access point for ${link.label} is not priced.`);
    }
    if (!link.power) {
      exclusions.push(`No power marked at ${link.label}. Power there is a separate electrician's job, not a zero-cost allowance.`);
      blocks.push(`No power at ${link.label}.`);
      reviews.push(`No power at ${link.label}.`);
    }
  }

  if (job.starlink === "none" && tasks.filter((item) => item.charged).length === 0 && otherAmount === 0 && !mount.priced) {
    blocks.push("No installation tasks yet. An equipment price alone is not an installed job.");
  }

  const chargedHours = roundHours(tasks.filter((item) => item.charged).reduce((sum, item) => sum + item.personHours, 0));
  const labourHours = roundHours((packageScope ? PACKAGE_HOURS : 0) + chargedHours);
  const labourFromPackage = packageScope ? STANDARD_INSTALL : 0;
  const labourFromTasks = tasks.filter((item) => item.charged).reduce((sum, item) => sum + item.amount, 0);
  const labourAmount = labourFromPackage + labourFromTasks;
  const materialsAmount = materials.reduce((sum, item) => sum + (item.sell ?? 0), 0);
  const travel = travelAmount(travelKm({ located: job.located, lat: job.lat, lng: job.lng }));
  if (!job.located) assumptions.push("Travel is not in this figure yet.");

  const amountOf = (pred: (item: InstallTask) => boolean) =>
    tasks.filter((item) => item.charged && pred(item)).reduce((sum, item) => sum + item.amount, 0);
  const visitLabour = amountOf((item) => job.starlink === "existing" && (item.id === "setup" || item.id === "align-check" || item.id === "handover"));
  const accessLabour = amountOf((item) => item.id === "access");
  const extraLabour = amountOf((item) => item.id === "extra-tech");
  const linkLabour = amountOf((item) => item.id.startsWith("p2p-") || item.id.startsWith("ap-"));
  const serviceVisitOnly = job.starlink === "existing" && linkLabour === 0 && otherAmount === 0 && materialsAmount === 0;
  const customerLabour = labourAmount - (job.starlink === "existing" ? visitLabour : 0);
  const customerTravel = serviceVisitOnly ? 0 : travel;
  const known = customerLabour + materialsAmount + customerTravel + otherAmount;
  const blocked = blocks.length > 0;
  const ranged = !blocked && rangeHigh > rangeLow;
  const low = known + (blocked ? 0 : rangeLow);
  const high = blocked ? null : known + (ranged ? rangeHigh : rangeLow);
  const completeness: Completeness = blocked ? "partial" : ranged ? "range" : "complete";
  const rangeExplanation = ranged ? rangeBits.join(" ") : null;
  const customerLines = customerLinesFor(job, {
    labourFromPackage,
    linkLabour,
    accessLabour,
    extraLabour,
    travel: customerTravel,
    mount,
    placement: placement && !sameCableRun,
    sameCableRun,
  });

  if (blocked && rangeBits.length) {
    assumptions.push(`${rangeBits.join(" ")} That range is not the total while something else is still unpriced.`);
  }
  const headline = hideTravelFormula(
    job.starlink === "existing"
      ? serviceVisitOnly
        ? "Service visit — quote required"
        : `Service visit — quote required. ${headlineFor(completeness, blocks, rangeExplanation)}`
      : headlineFor(completeness, blocks, rangeExplanation),
  );
  if (completeness === "partial") reviews.push("Priced lines are not the installed total.");

  return {
    pricingVersion: PRICING_VERSION,
    gstTreatment: "inclusive",
    gstLabel: GST_LABEL,
    labourRateAud: rate,
    crew: { technicians: job.extraPersonHours > 0 ? 2 : 1, hoursAre: "person-hours" },
    mode: completeness === "complete" && packageScope ? "package" : completeness === "complete" ? "task" : "review",
    completeness,
    tasks,
    materials,
    supplierReferences,
    allowances: [...used].map((id) => ALLOWANCES[id]).filter(Boolean),
    inputs: { ...job, links: job.links.map((link) => ({ ...link })) },
    labourHours,
    labourAmount,
    materialsAmount,
    equipmentLow: ranged ? rangeLow : mount.sell,
    equipmentHigh: ranged ? rangeHigh : mount.sell,
    travelAmount: travel,
    otherAmount,
    discounts: 0,
    precise: completeness === "complete",
    openEnded: completeness === "partial",
    low,
    high: completeness === "complete" ? low : high,
    total: completeness === "complete" ? low : null,
    assumptions: assumptions.map(hideTravelFormula),
    exclusions: exclusions.map(hideTravelFormula),
    reviews: [...new Set(reviews)].map(hideTravelFormula),
    inclusions: inclusions.map(hideTravelFormula),
    decisions,
    customerLines,
    customerHeadline: headline,
    rangeExplanation: rangeExplanation ? hideTravelFormula(rangeExplanation) : null,
    revisions: [],
  };
}

function emptyCommercial(job: Job, rate: number): InstallEstimate {
  const travel = travelAmount(travelKm(job));
  return {
    pricingVersion: PRICING_VERSION,
    gstTreatment: "inclusive",
    gstLabel: GST_LABEL,
    labourRateAud: rate,
    crew: { technicians: 1, hoursAre: "person-hours" },
    mode: "callback",
    completeness: "partial",
    tasks: [],
    materials: [],
    supplierReferences: [],
    allowances: [],
    inputs: { ...job, links: job.links.map((link) => ({ ...link })) },
    labourHours: 0,
    labourAmount: 0,
    materialsAmount: 0,
    equipmentLow: 0,
    equipmentHigh: 0,
    travelAmount: travel,
    otherAmount: 0,
    discounts: 0,
    precise: false,
    openEnded: true,
    low: 0,
    high: null,
    total: null,
    assumptions: [],
    exclusions: [],
    reviews: ["Commercial properties are quoted individually."],
    inclusions: [],
    decisions: [],
    customerLines: [],
    customerHeadline: "Commercial properties are quoted individually. There is no online installed price.",
    rangeExplanation: null,
    revisions: [],
  };
}

function quoteMount(
  job: Job,
  materials: InstallMaterial[],
  assumptions: string[],
  reviews: string[],
  blocks: string[],
  rangeBits: string[],
  addRange: (low: number, high: number) => void,
): { sell: number; line: LineItem | null; priced: boolean } {
  if (job.starlink !== "new") return { sell: 0, line: null, priced: false };
  if (job.mountNeed === "no") {
    materials.push(
      mat({
        id: "mount",
        taskId: "starlink-mount",
        label: "Mount supplied by the customer",
        qty: 1,
        unit: "each",
        sell: 0,
        disposition: "customer",
        source: "Customer confirmed a suitable mount. No second mount charge.",
        sourceDate: ON,
        approval: "published",
        provisional: false,
      }),
    );
    assumptions.push("You are supplying a suitable mount, so no mount is added.");
    return { sell: 0, line: null, priced: true };
  }
  if (job.mountNeed === "yes" && (job.roof === "metal" || job.roof === "tile")) {
    const quoted = mountQuote({ roof: job.roof, mountNeed: "yes" });
    materials.push(
      mat({
        id: "mount",
        taskId: "starlink-mount",
        label: quoted.line,
        qty: 1,
        unit: "each",
        sell: quoted.amount,
        disposition: "separate",
        source:
          job.roof === "tile"
            ? ALLOWANCES.mountHockey.source
            : `${ALLOWANCES.mountTripod.source} Shelf reference only: Starlink pipe adapter $105 at Bunnings, item 0644578, checked 26 Sep 2026. That reference is not added.`,
        sourceDate: ON,
        approval: "published",
        provisional: false,
      }),
    );
    if (job.roof === "metal") {
      assumptions.push("The tripod price includes the compatible pole adaptor. The adaptor is not added again.");
    } else {
      assumptions.push("The hockey-stick price includes the compatible pole adaptor. The adaptor is not added again.");
    }
    return {
      sell: quoted.amount,
      line: {
        label: quoted.line,
        amount: quoted.amount,
        note: "Includes the compatible pole adaptor. The adaptor is not charged again. VINCONNECT sell price, not a supplier shelf price.",
      },
      priced: true,
    };
  }
  if (job.mountNeed === "yes" && job.roof === "unknown") {
    const low = Math.min(MOUNT_HOCKEY, MOUNT_TRIPOD);
    const high = Math.max(MOUNT_HOCKEY, MOUNT_TRIPOD);
    addRange(low, high);
    rangeBits.push(
      `The lower mount figure is the tile hockey-stick and adaptor at the VINCONNECT sell price of ${formatAud(MOUNT_HOCKEY)}. The upper mount figure is the metal tripod and adaptor at ${formatAud(MOUNT_TRIPOD)}. Specialist or non-standard mounting is not inside this range.`,
    );
    materials.push(
      mat({
        id: "mount",
        taskId: "starlink-mount",
        label: "Standard mount, roof not yet chosen",
        qty: 1,
        unit: "each",
        sell: null,
        disposition: "separate",
        source: "Range is only the two published standard mounts. Not a cap on specialist mounting.",
        sourceDate: ON,
        approval: "published",
        provisional: false,
      }),
    );
    reviews.push("Standard mount range only. Specialist mounting is outside it.");
    return { sell: 0, line: null, priced: true };
  }
  assumptions.push(
    `Mounting is not confirmed. Nothing has been assumed. If a standard mount is confirmed later, the tile hockey-stick is ${formatAud(MOUNT_HOCKEY)} and the metal tripod is ${formatAud(MOUNT_TRIPOD)}. Those prices are not a cap on specialist mounting.`,
  );
  reviews.push("Mounting assessment required.");
  blocks.push("Mounting assessment required.");
  materials.push(
    mat({
      id: "mount",
      taskId: "starlink-mount",
      label: "Mount not yet chosen",
      qty: 1,
      unit: "each",
      sell: null,
      disposition: "assessment",
      source: "No mount price assumed. Standard sell prices are not a ceiling.",
      sourceDate: ON,
      approval: "unapproved",
      provisional: true,
    }),
  );
  return { sell: 0, line: null, priced: false };
}

function customerLinesFor(
  job: Job,
  parts: {
    labourFromPackage: number;
    linkLabour: number;
    accessLabour: number;
    extraLabour: number;
    travel: number;
    mount: { line: LineItem | null };
    placement: boolean;
    sameCableRun: boolean;
  },
): LineItem[] {
  const lines: LineItem[] = [];
  if (parts.labourFromPackage > 0) {
    lines.push({
      label: "Standard installation package",
      amount: parts.labourFromPackage,
      note: "Includes the visit, basic clips, sealant and one brush plate. Not labour only. The Starlink kit is not included.",
    });
  }
  if (job.storeys === "double" && job.starlink === "new") lines.push({ label: "Double storey", amount: DOUBLE_STOREY_ADD, note: "Published access allowance. Not a second technician, and not an extra difficult-access hour." });
  if (parts.mount.line) lines.push(parts.mount.line);
  if (parts.placement) {
    lines.push({
      label: "Router placement off the entry wall",
      amount: ROUTER_RELOCATION,
      note: "Includes a garage or data cabinet. Not a separate $120 cabinet charge. The entry-wall position stays included.",
    });
  }
  if (job.internal && job.starlink === "new") {
    lines.push({
      label: parts.sameCableRun ? "Router placement and internal cable route" : "Internal wall cable route",
      amount: INTERNAL_WALLS,
      note: parts.sameCableRun
        ? "One $150 starting allowance for the same cable run. Additional cabling requires review. Not a complete installed amount."
        : "From $150, subject to the route and access. Additional cabling requires review. Not a complete installed amount.",
    });
  }
  if (job.conduit && job.starlink === "new") {
    lines.push({ label: "Conduit", amount: CONDUIT_EXTRA, note: "Straightforward agreed run. Labour and basic conduit materials are both in this figure." });
  }
  if (parts.accessLabour > 0) lines.push({ label: "Difficult access allowance", amount: parts.accessLabour, note: "Provisional person-hour. Confirm on site." });
  if (parts.extraLabour > 0) lines.push({ label: "Additional technician", amount: parts.extraLabour, note: "Explicit person-hours. Not assumed." });
  if (parts.linkLabour > 0) {
    lines.push({
      label: "Other buildings",
      amount: parts.linkLabour,
      note: "Labour for the other buildings on this visit. Radios, brackets and cable are not included in this line.",
    });
  }
  if (job.day === "saturday" || job.day === "sunday") {
    lines.push({ label: "Weekend installation", amount: SATURDAY_INSTALL, note: "One $150 supplement for Saturday or Sunday. Not both." });
  }
  if (parts.travel > 0) lines.push({ label: "Travel", amount: parts.travel });
  return lines;
}

function headlineFor(completeness: Completeness, blocks: string[], rangeExplanation: string | null) {
  if (completeness === "complete") {
    return "Indicative installed amount for the work listed. It includes the known labour, equipment and installation materials in this scope. The Starlink kit is not included unless it is listed as a priced supply item.";
  }
  if (completeness === "range" && rangeExplanation) {
    return `Indicative range. ${rangeExplanation} The Starlink kit is not included.`;
  }
  const why = [...new Set(blocks)].slice(0, 2).join(" ");
  return `Partial estimate — remaining items require review. ${why} The priced lines are not a complete installed amount. The Starlink kit is not included.`;
}

function roundHours(value: number) {
  return Math.round(value * 100) / 100;
}

export function priceEstimate(input: EstimateInput, config?: RateConfig): EstimateResult {
  const install = input.property === "commercial" ? emptyCommercial(jobFromEstimateInput(input), config?.labourRateAud ?? LABOUR_RATE_AUD) : priceInstall(jobFromEstimateInput(input), config);
  return resultFromInstall(input, install);
}

function resultFromInstall(input: EstimateInput, install: InstallEstimate): EstimateResult {
  const km = travelKm(input);
  if (input.property === "commercial") {
    return {
      kind: "callback",
      total: 0,
      estimatedLow: 0,
      estimatedHigh: 0,
      openEnded: true,
      reviewRequired: true,
      completeness: "partial",
      headline: install.customerHeadline,
      labour: 0,
      travel: install.travelAmount,
      extras: 0,
      km,
      travelNote: "Commercial properties are quoted individually. We will contact you. There is no online price for this job.",
      paymentNote: PAYMENT,
      lines: [],
      roofLabel: "Commercial",
      mountLabel: "Quoted after we speak",
      gstLabel: GST_LABEL,
      assumptions: [],
      exclusions: [],
      install,
    };
  }
  const travelNote = hideTravelFormula(
    [
      customerTravelNote(input.located, install.travelAmount),
      input.depth === "quick" ? "The mount is not confirmed on this quick figure." : "",
      input.mountNeed === "no" && input.depth === "detailed" ? "You are supplying the mount, so no mount is added." : "",
      "The Starlink dish, router and monthly plan are separate.",
    ]
      .filter(Boolean)
      .join(" "),
  );
  return {
    kind: "quote",
    total: install.total ?? install.low,
    estimatedLow: install.low,
    estimatedHigh: install.high ?? install.low,
    openEnded: install.openEnded,
    reviewRequired: install.reviews.length > 0 || install.completeness !== "complete",
    completeness: install.completeness,
    headline: install.customerHeadline,
    rangeExplanation: install.rangeExplanation ?? undefined,
    labour: install.labourAmount,
    travel: install.travelAmount,
    extras: Math.max(0, install.low - install.labourAmount - install.travelAmount),
    km,
    travelNote,
    paymentNote: PAYMENT,
    lines: install.customerLines,
    roofLabel: input.roof === "tile" ? "Tile" : input.roof === "metal" ? "Colorbond / metal" : "Not selected",
    mountLabel:
      input.depth === "quick" || input.mountNeed === "unknown"
        ? "Mounting assessment required"
        : input.mountNeed === "no"
          ? "You already have a suitable mount"
          : input.roof === "tile"
            ? "Hockey-stick mount with compatible adapter"
            : input.roof === "metal"
              ? "Tripod with compatible adapter"
              : "Standard mounts only, roof not chosen",
    gstLabel: GST_LABEL,
    assumptions: install.assumptions,
    exclusions: install.exclusions,
    install,
  };
}

export function pricePropertyPlan(input: Parameters<typeof jobFromPropertyPlan>[0], config?: RateConfig) {
  const install = priceInstall(jobFromPropertyPlan(input), config);
  install.assumptions.unshift("House router power is assumed until you say otherwise. Other buildings use the power you marked.");
  return install;
}

export function applyInstall(result: EstimateResult, install: InstallEstimate): EstimateResult {
  const input: EstimateInput = {
    service: "starlink",
    property: result.kind === "callback" ? "commercial" : "residential",
    depth: "detailed",
    storeys: "single",
    day: "weekday",
    internal: false,
    cabinet: false,
    roof: "unknown",
    mountNeed: "unknown",
    lat: 0,
    lng: 0,
    address: "",
    located: install.travelAmount === 0,
  };
  const next = resultFromInstall(input, install);
  return {
    ...result,
    ...next,
    km: result.km,
    roofLabel: result.roofLabel,
    mountLabel: result.mountLabel,
    travelNote: hideTravelFormula(`${result.travelNote} ${install.customerHeadline}`),
  };
}

export function reviseInstall(
  base: InstallEstimate,
  revision: { reason: string; labourHours?: number; materials?: { id: string; sell: number }[] },
): InstallEstimate {
  const reason = revision.reason.trim();
  if (!reason) throw new Error("Say why the price changed.");
  const materials = base.materials.map((item) => {
    const next = revision.materials?.find((row) => row.id === item.id);
    return next ? { ...item, sell: next.sell, disposition: item.disposition === "assessment" ? "separate" as const : item.disposition, approval: "provisional" as const } : item;
  });
  const materialsAmount = materials.reduce((sum, item) => sum + (item.sell ?? 0), 0);
  const labourAmount = revision.labourHours == null ? base.labourAmount : money(revision.labourHours, base.labourRateAud);
  const delta = labourAmount - base.labourAmount + (materialsAmount - base.materialsAmount);
  const low = base.low + delta;
  const high = base.high == null ? null : base.high + delta;
  const labourLabels = new Set([
    "Standard installation package",
    "Provisional check of existing Starlink",
    "Other buildings",
    "Difficult access allowance",
    "Additional technician",
    "Installation labour",
  ]);
  const customerLines =
    revision.labourHours == null
      ? base.customerLines.map((line) => {
          const matched = materials.find((item) => item.label === line.label && item.sell != null);
          return matched ? { ...line, amount: matched.sell ?? line.amount } : line;
        })
      : [
          { label: "Installation labour", amount: labourAmount, note: reason },
          ...base.customerLines.filter((line) => !labourLabels.has(line.label)).map((line) => {
            const matched = materials.find((item) => item.label === line.label && item.sell != null);
            return matched ? { ...line, amount: matched.sell ?? line.amount } : line;
          }),
        ];
  const completeness = base.completeness;
  const precise = completeness === "complete";
  const total = precise ? low : null;
  return {
    ...base,
    materials,
    materialsAmount,
    labourHours: revision.labourHours ?? base.labourHours,
    labourAmount,
    low,
    high: completeness === "partial" ? null : completeness === "complete" ? low : high,
    total,
    precise,
    openEnded: completeness === "partial",
    customerLines,
    revisions: [...base.revisions, { at: new Date().toISOString(), reason }],
    customerHeadline: hideTravelFormula(`${base.customerHeadline} Revised: ${reason}`),
  };
}

export function storedSummary(install: InstallEstimate) {
  if (install.completeness === "complete" && install.total != null) {
    return `Indicative installed amount ${formatAud(install.total)}. ${install.customerHeadline}`;
  }
  if (install.completeness === "range" && install.high != null) {
    return `Indicative installed range ${formatAud(install.low)} – ${formatAud(install.high)}. ${install.customerHeadline}`;
  }
  return `Partial estimate — remaining items require review. Priced so far ${formatAud(install.low)}. Not a complete installed amount. ${install.customerHeadline}`;
}

export function quoteFigure(result: Pick<EstimateResult, "completeness" | "openEnded" | "total" | "estimatedLow" | "estimatedHigh">) {
  const mode = result.completeness ?? (result.openEnded ? "partial" : result.estimatedLow !== result.estimatedHigh ? "range" : "complete");
  if (mode === "complete") return { mode, label: "Indicative installed amount", figure: formatAud(result.total) };
  if (mode === "range") return { mode, label: "Indicative range", figure: `${formatAud(result.estimatedLow)} – ${formatAud(result.estimatedHigh)}` };
  if (result.estimatedLow === 0) return { mode, label: "Partial estimate — remaining items require review", figure: "Quote required" };
  return { mode, label: "Partial estimate — remaining items require review", figure: `Priced so far ${formatAud(result.estimatedLow)} — not the installed total` };
}

export function quotePropertyPlan(input: Parameters<typeof jobFromPropertyPlan>[0], config?: RateConfig) {
  const install = pricePropertyPlan(input, config);
  const estimateInput: EstimateInput = {
    service: "starlink",
    property: "residential",
    depth: "detailed",
    storeys: input.storeys,
    day: "weekday",
    internal: false,
    cabinet: false,
    roof: input.roof,
    mountNeed: input.mountNeed,
    lat: input.lat,
    lng: input.lng,
    address: "",
    located: input.located,
    cableRoute: input.cableRoute,
    starlink: input.internet === "nbn" || input.internet === "mobile" ? "none" : "new",
  };
  return resultFromInstall(estimateInput, install);
}
