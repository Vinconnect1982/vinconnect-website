import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AddressHit } from "@/lib/geocode";

type SiteSession = {
  address: AddressHit | null;
  setAddress: (address: AddressHit | null) => void;
};

export const useSiteSession = create<SiteSession>()(
  persist(
    (set) => ({
      address: null,
      setAddress: (address) => set({ address }),
    }),
    { name: "vinconnect-site-session" },
  ),
);

export function plannerHref(hit: AddressHit) {
  return `/property-planner?q=${encodeURIComponent(hit.address)}&lat=${hit.lat}&lng=${hit.lng}`;
}
