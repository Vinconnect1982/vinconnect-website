export type HilookPackage = {
  slug: string;
  name: string;
  kicker: string;
  lede: string;
  image: string;
  cameras: string;
  nvr: string;
  storage: string;
  hardwareFrom: number;
  labourFrom: number;
  packageFrom: number;
  uses: string[];
  views: string[];
  specs: { label: string; value: string }[];
  includes: string[];
  notIncluded: string[];
  bestFor: string;
};

export const HILOOK_PACKAGES: HilookPackage[] = [
  {
    slug: "home-watch",
    name: "Home Watch 4",
    kicker: "HiLook 4-camera kit",
    lede: "Four 6MP turret cameras and a 4-channel PoE recorder for a typical house: front, rear, and both sides.",
    image: "/scenes-new/home-cctv-kit.webp",
    cameras: "4 × HiLook 6MP AI turret (IPC-T361H class)",
    nvr: "4-channel PoE NVR",
    storage: "2 TB surveillance HDD (~7–10 days continuous, longer with motion)",
    hardwareFrom: 740,
    labourFrom: 890,
    packageFrom: 1890,
    bestFor: "Suburban homes in Cranbourne, Clyde, Berwick and similar lots.",
    uses: [
      "Who is at the front door",
      "Driveway and cars",
      "Rear yard and side access",
      "Remote playback on the HiLook / Hik-Connect app",
    ],
    views: ["Front entry", "Driveway", "Rear yard", "Side / gate"],
    specs: [
      { label: "Resolution", value: "6MP (3200×1800 class) per camera" },
      { label: "Night", value: "IR to ~30 m, IP67 metal turret" },
      { label: "Detection", value: "Human / vehicle AI on supported models" },
      { label: "Audio", value: "Built-in microphone on turret cameras" },
      { label: "Power", value: "PoE from the NVR — one Cat cable each" },
      { label: "App", value: "Hik-Connect / HiLook, no monthly camera fee" },
      { label: "Warranty", value: "Australian HiLook / Hikvision hardware warranty" },
    ],
    includes: [
      "Supply of specified 4-camera kit and 2 TB HDD",
      "Camera placement walkthrough",
      "Cabling, mounting, recorder setup and app handover",
      "Remote access tested before we leave",
    ],
    notIncluded: [
      "Internal painting or chasing into finished plaster unless quoted",
      "Long external trenching",
      "A monitor (HDMI to your TV is fine)",
    ],
  },
  {
    slug: "property-guard",
    name: "Property Guard 6",
    kicker: "HiLook 6-camera kit",
    lede: "Six 6MP cameras on an 8-channel recorder so you can add the garage, side path or a shed later without replacing the NVR.",
    image: "/scenes-new/property-cctv.webp",
    cameras: "6 × HiLook 6MP AI turret",
    nvr: "8-channel PoE NVR (2 spare ports)",
    storage: "4 TB surveillance HDD",
    hardwareFrom: 1180,
    labourFrom: 1450,
    packageFrom: 2890,
    bestFor: "Larger homes, corner blocks and house-plus-garage layouts.",
    uses: [
      "Full house perimeter",
      "Garage / carport",
      "Rear paddock gate on a short block",
      "Room to add two cameras later",
    ],
    views: ["Four house corners", "Garage", "Rear access", "Two spare channels"],
    specs: [
      { label: "Resolution", value: "6MP AI turrets" },
      { label: "Recorder", value: "8-ch PoE, 4K HDMI" },
      { label: "Storage", value: "4 TB class, motion or continuous" },
      { label: "Expansion", value: "Two camera ports reserved" },
      { label: "Power", value: "PoE; UPS quoted if you want recording through a short outage" },
    ],
    includes: [
      "Specified 6-camera kit and 4 TB HDD",
      "Six mounted views agreed on site",
      "NVR in a ventilated, labelled location",
      "App and playback handover",
    ],
    notIncluded: [
      "The two spare cameras",
      "Wireless hops to a detached building — see Acreage 8 or a wireless link",
    ],
  },
  {
    slug: "acreage",
    name: "Acreage 8",
    kicker: "HiLook 8-camera kit",
    lede: "Eight cameras for a house, workshop and the first hundred metres of driveway. Built as part of the property network, not a separate box of cameras.",
    image: "/scenes-new/acreage-network.webp",
    cameras: "8 × HiLook 6MP or 8MP turrets (mix quoted)",
    nvr: "8-channel PoE NVR",
    storage: "4 TB or 6 TB HDD",
    hardwareFrom: 1680,
    labourFrom: 2200,
    packageFrom: 4200,
    bestFor: "Five-acre blocks, workshops and long drives in Pearcedale, Tooradin, Nyora and similar.",
    uses: [
      "House perimeter",
      "Workshop / shed interior or eave",
      "Driveway approach",
      "Yard and machinery",
    ],
    views: ["House ×4", "Shed ×2", "Driveway", "Yard / gate"],
    specs: [
      { label: "Resolution", value: "6MP standard, 8MP 4K on the long driveway if number plates matter" },
      { label: "Backhaul", value: "Cat6 where we can run it; Omada wireless bridge where we cannot" },
      { label: "Power", value: "PoE at each building; shed may need its own small switch" },
      { label: "Remote", value: "Playback from the house or the road" },
    ],
    includes: [
      "Eight-camera specified kit",
      "Network path between buildings (cabled or wireless, quoted)",
      "Recorder placement with ventilation and labelling",
      "Handover including how to export a clip",
    ],
    notIncluded: [
      "Civil trenching across a paddock unless quoted",
      "Mains electrical work — licensed electrician if a new circuit is required",
    ],
  },
  {
    slug: "stable-yard",
    name: "Stable & Yard",
    kicker: "HiLook + remote cameras",
    lede: "Cameras specified around horses, dust, metal sheds and odd power points — plus a solar or wireless option for the gate.",
    image: "/scenes-new/stable-night.webp",
    cameras: "4–6 × HiLook 6MP plus one solar / wireless gate camera",
    nvr: "8-channel PoE NVR at the house or stable cabinet",
    storage: "4 TB HDD",
    hardwareFrom: 1540,
    labourFrom: 2400,
    packageFrom: 4800,
    bestFor: "Horse properties, arenas, foaling stables and rural gates.",
    uses: [
      "Stable aisle and foaling box",
      "Arena / crush",
      "Tack room door",
      "Front gate after dark",
    ],
    views: ["Stable interior", "Aisle", "Arena", "Gate (solar or wireless)"],
    specs: [
      { label: "Environment", value: "IP67 turrets, dust and lighting taken seriously" },
      { label: "Stable link", value: "Usually an Omada point-to-point from the house" },
      { label: "Gate", value: "Solar/4G or long-range wireless — not house Wi-Fi" },
      { label: "Alerts", value: "Human/vehicle at the gate; continuous or event recording in the stable" },
    ],
    includes: [
      "Camera plan marked on your property sketch",
      "House–stable network path",
      "Specified HiLook kit and one remote/solar camera",
      "App handover for checking horses from the road",
    ],
    notIncluded: [
      "Veterinary monitoring systems",
      "Night-vision specialist foaling cameras unless specified",
    ],
  },
];

export function packageBySlug(slug: string) {
  return HILOOK_PACKAGES.find((p) => p.slug === slug);
}

export const PRICE_NOTE =
  "Prices are VINCONNECT starting figures in AUD including GST for a straightforward site. Hardware street prices move; we confirm the current kit before you order. Travel is calculated from the address in the estimator. Conduit, double-storey access, trenching and extra buildings are extras.";
