export const STARLINK_REFERRAL_URL =
  "https://starlink.com/?referral=RC-DF-12576466-54681-7&app_source=share";

export const REFERRAL_NOTE =
  "*Available to eligible new Starlink customers using the referral link. Starlink controls eligibility, timing and promotional terms. Check the offer displayed by Starlink before ordering.";

export function trackEvent(name: string) {
  if (typeof window === "undefined") return;
  const w = window as Window & { dataLayer?: Record<string, string>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: name });
}
