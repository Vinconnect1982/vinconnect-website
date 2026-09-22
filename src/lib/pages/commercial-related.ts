import type { RelatedLink } from "./types";

export const COMMERCIAL_RELATED: Record<string, RelatedLink[]> = {
  "/services/starlink-installation": [
    { href: "/starlink", label: "Starlink guides", copy: "Mounts, cable, Mini and rural installs." },
    { href: "/customer-help/standard-install-scope", label: "Standard install scope" },
    { href: "/install-terms-and-conditions", label: "Install terms" },
    { href: "/circl-starlink-installations", label: "Circl customers" },
    { href: "/estimate", label: "Check My Install Price" },
  ],
  "/services/whole-property-wifi": [
    { href: "/property-networks/whole-property-wifi", label: "Whole-property Wi-Fi guide" },
    { href: "/property-planner", label: "Property planner" },
    { href: "/resources/wifi-calling", label: "Wi-Fi calling" },
    { href: "/solutions/homes", label: "Home solutions" },
  ],
  "/services/wireless-links": [
    { href: "/property-networks/wireless-building-links", label: "Building links guide" },
    { href: "/property-networks/point-to-point", label: "Point-to-point" },
    { href: "/property-planner", label: "Property planner" },
  ],
  "/services/rural-connectivity": [
    { href: "/starlink/rural-properties", label: "Rural Starlink" },
    { href: "/solutions/rural-properties", label: "Rural solutions" },
    { href: "/rural-connections", label: "Rural Connections" },
    { href: "/resources/rural-connectivity-options", label: "Rural options guide" },
  ],
  "/services/cctv": [
    { href: "/security", label: "CCTV cluster" },
    { href: "/security/hilook-cctv-packages", label: "HiLook packages" },
    { href: "/resources/cctv-on-starlink", label: "CCTV on Starlink" },
  ],
  "/services/equestrian-connectivity": [
    { href: "/property-networks/equestrian", label: "Equestrian networks" },
    { href: "/solutions/horse-properties", label: "Horse property solutions" },
    { href: "/security/stable-cctv", label: "Stable cameras" },
  ],
  "/services/starlink-caravan-installation": [
    { href: "/starlink/caravan-and-touring", label: "Touring guide" },
    { href: "/starlink/mini", label: "Starlink Mini" },
    { href: "/solutions/caravans-and-touring", label: "Caravan solutions" },
  ],
  "/services/starlink-mini-installation": [
    { href: "/starlink/mini", label: "Mini guide" },
    { href: "/event-link/mini", label: "Event Link Mini" },
    { href: "/starlink/caravan-and-touring", label: "Touring" },
  ],
  "/services/community-connectivity": [
    { href: "/solutions/businesses-and-clubs", label: "Businesses and clubs" },
    { href: "/event-link", label: "Event Link" },
    { href: "/rural-connections", label: "Rural Connections" },
  ],
  "/services/point-to-point-links": [
    { href: "/property-networks/point-to-point", label: "Point-to-point guide" },
    { href: "/property-networks/wireless-building-links", label: "Building links" },
    { href: "/property-planner", label: "Property planner" },
  ],
  "/services/multi-building-networks": [
    { href: "/property-networks/multi-building", label: "Multi-building guide" },
    { href: "/property-planner", label: "Property planner" },
    { href: "/solutions/rural-properties", label: "Rural solutions" },
  ],
  "/services/network-cabinets": [
    { href: "/property-networks/network-cabinets", label: "Cabinets guide" },
    { href: "/about/how-we-work", label: "How we work" },
  ],
  "/services/caravan-starlink-power": [
    { href: "/starlink/caravan-and-touring", label: "Caravan Starlink" },
    { href: "/services/starlink-caravan-installation", label: "Caravan installation" },
    { href: "/solutions/caravans-and-touring", label: "Caravan solutions" },
  ],
  "/security/hilook-cctv-packages": [
    { href: "/security", label: "CCTV cluster" },
    { href: "/security/how-cctv-is-planned", label: "How CCTV is planned" },
    { href: "/resources/cctv-on-starlink", label: "CCTV on Starlink" },
  ],
  "/security/stable-cctv": [
    { href: "/security/horse-properties", label: "Horse property cameras" },
    { href: "/solutions/horse-properties", label: "Horse property solutions" },
    { href: "/security/packages/stable-yard", label: "Stable & Yard package" },
  ],
  "/security/solar-cameras": [
    { href: "/security/solar-and-gate", label: "Solar and gate guide" },
    { href: "/security/how-cctv-is-planned", label: "Planning" },
  ],
  "/security/home-cctv": [
    { href: "/security/home-and-acreage", label: "Home and acreage guide" },
    { href: "/security/hilook-cctv-packages", label: "HiLook packages" },
    { href: "/security/packages/home-watch", label: "Home Watch 4" },
  ],
  "/security/business-cctv": [
    { href: "/solutions/businesses-and-clubs", label: "Businesses and clubs" },
    { href: "/security/hilook-cctv-packages", label: "HiLook packages" },
    { href: "/projects/cranbourne-cricket-club", label: "Cranbourne Cricket Club" },
  ],
  "/security/camera-planning": [
    { href: "/security/how-cctv-is-planned", label: "How CCTV is planned" },
    { href: "/property-planner", label: "Property planner" },
  ],
  "/security/cctv-recording": [
    { href: "/security/recording-and-playback", label: "Recording and playback" },
    { href: "/resources/cctv-on-starlink", label: "CCTV on Starlink" },
  ],
};
