export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const LOCAL_BUSINESS_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "VINCONNECT",
  url: "https://vinconnect.com.au",
  telephone: "+61408559555",
  email: "vince@vinconnect.com.au",
  image: "https://vinconnect.com.au/og.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cranbourne",
    addressRegion: "VIC",
    postalCode: "3977",
    addressCountry: "AU",
  },
  areaServed: [
    "Casey",
    "Cardinia",
    "Mornington Peninsula",
    "Bass Coast",
    "South Gippsland",
    "West Gippsland",
    "Latrobe Valley",
  ],
  description:
    "Professional Starlink installation, whole-property Wi-Fi, wireless links and HiLook CCTV across South East Melbourne, the Peninsula, Bass Coast and Gippsland. Independent installer based in Cranbourne. Standard Starlink labour from $300 in the local work area.",
  sameAs: ["https://www.facebook.com/people/Vinconnect-Starlink-Solutions/61589183530269/"],
};
