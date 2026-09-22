export const DEPOT = { lat: -38.106, lng: 145.283, label: "Cranbourne" };

export const LOCAL_STARLINK_LABOUR = 300;
export const DOUBLE_STOREY_STARLINK = 550;
export const EXTRA_CONDUIT = 120;
export const EXTRA_CABINET_ROUTER = 150;

export const ESTIMATE_SERVICES = [
  {
    id: "starlink",
    title: "Install my Starlink",
    hint: "From $300 single storey, or $550 double storey",
    note: "Standard labour for a straightforward install. Location is included when you enter the address. Hardware and the Starlink plan are separate.",
    labour: LOCAL_STARLINK_LABOUR,
  },
  {
    id: "wifi",
    title: "Fix weak Wi-Fi",
    hint: "Improve coverage through the home",
    note: "Poor coverage usually needs better Wi-Fi distribution, not another internet service.",
    labour: 480,
  },
  {
    id: "building-link",
    title: "Connect another building",
    hint: "Shed, stable, office or granny flat",
    note: "For a detached building, a point-to-point wireless link is often cleaner than trenching.",
    labour: 890,
  },
  {
    id: "cctv-data",
    title: "CCTV or data cabling",
    hint: "Reliable network and clean cable runs",
    note: "Camera reliability starts with power, cabling and network coverage at each location.",
    labour: 740,
  },
  {
    id: "unsure",
    title: "Help me choose",
    hint: "Tell us the problem and we will guide you",
    note: "We will look at the property before recommending hardware.",
    labour: 560,
  },
] as const;

export type ServiceId = (typeof ESTIMATE_SERVICES)[number]["id"];
export type StoreyId = "single" | "double" | "commercial";

export const STOREYS: { id: StoreyId; title: string; hint: string }[] = [
  { id: "single", title: "Single storey", hint: "Home, shed or small building" },
  { id: "double", title: "Double storey", hint: "Roof or cable access above one level" },
  { id: "commercial", title: "Business / commercial", hint: "Site access and operational planning" },
];

export type EstimateInput = {
  service: ServiceId;
  storeys: StoreyId;
  conduit: boolean;
  cabinet: boolean;
  extension: boolean;
  internal: boolean;
  mesh: number;
  lat: number;
  lng: number;
  address: string;
  located: boolean;
};

export type LineItem = { label: string; amount: number };

export type EstimateResult = {
  estimatedLow: number;
  estimatedHigh: number;
  labour: number;
  travel: number;
  extras: number;
  km: number;
  travelNote: string;
  lines: LineItem[];
};
