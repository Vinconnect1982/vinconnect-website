import { createFileRoute, Link } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/enquiry-form";
import { ServiceNetworkMap } from "@/components/service-network-map";
import { SiteShell } from "@/components/site-shell";
import { areaBySlug } from "@/lib/areas";

export const Route = createFileRoute("/service-areas/")({
  component: AreasIndex,
  head: () => ({
    meta: [
      { title: "Service areas | Starlink installation from Cranbourne to Gippsland | VINCONNECT" },
      {
        name: "description",
        content:
          "VINCONNECT service areas from Cranbourne across South East Melbourne, Mornington Peninsula, Western Port, Bass Coast, South Gippsland and West Gippsland. Regional Victorian work by arrangement.",
      },
    ],
    links: [{ rel: "canonical", href: "https://vinconnect.com.au/service-areas" }],
  }),
});

const GROUPS: { title: string; region: string; copy: string; slugs: string[] }[] = [
  {
    title: "South East Melbourne",
    region: "casey-south-east",
    copy: "VINCONNECT is based in Cranbourne. The work here is estate homes, double-storey houses, club sites and the first acreage south of the freeway. A completed club job at Cranbourne Cricket Club replaced a Telstra 4G connection with Starlink and Wi-Fi into the existing rack.",
    slugs: ["cranbourne", "cranbourne-east", "cranbourne-west", "clyde", "clyde-north", "berwick", "officer", "pakenham", "langwarrin", "frankston"],
  },
  {
    title: "Mornington Peninsula",
    region: "mornington-peninsula",
    copy: "Coastal homes, concealed cable routes and the hinterland behind Red Hill. Completed jobs include a tripod at Somerville, a concealed-gutter install at Safety Beach, a multi-level home at Red Hill and a coastal house at Sorrento. Mounts are chosen for the roof and the weather, not from a default kit.",
    slugs: ["mornington", "mount-martha", "safety-beach", "red-hill", "dromana", "rosebud", "blairgowrie", "sorrento", "somerville", "frankston"],
  },
  {
    title: "Western Port & South Gippsland",
    region: "south-gippsland",
    copy: "Acreage, farms and horse properties, with sheds and gates a long way from the house. Nyora has completed Starlink work, including one job that replaced an unreliable fixed-wireless connection at that property. Korumburra and Warragul are also proposed Rural Connections stops. That program is separate from booking an installation.",
    slugs: ["tooradin", "koo-wee-rup", "lang-lang", "nyora", "poowong", "korumburra", "leongatha", "caldermeade"],
  },
  {
    title: "Bass Coast & Phillip Island",
    region: "western-port-bass-coast",
    copy: "Coastal wind, holiday homes and the farms behind Wonthaggi and Inverloch. Phillip Island work, including Cowes, is quoted from Cranbourne and includes the trip. Salt air is part of the mount choice. Cameras and venue Wi-Fi come up as often as a straight home install.",
    slugs: ["wonthaggi", "inverloch", "grantville", "bass", "san-remo", "cowes", "phillip-island"],
  },
  {
    title: "West Gippsland & Latrobe",
    region: "west-gippsland-latrobe",
    copy: "Farms, acreage and highway towns from Drouin and Warragul through Trafalgar to the Latrobe Valley. A house in town and a shed across a paddock are different jobs. Location is included when you enter the address. It is not the same conversation as a Cranbourne estate.",
    slugs: ["drouin", "warragul", "trafalgar", "yarragon", "moe", "morwell", "traralgon", "pakenham"],
  },
];

function AreasIndex() {
  return (
    <SiteShell>
      <ServiceNetworkMap
        kicker="VINCONNECT · Connecting Victoria"
        heading="From Cranbourne to the coast and Gippsland."
        lede="Professional Starlink installation, whole-property Wi-Fi, wireless links and CCTV across South East Melbourne, Mornington Peninsula, Western Port, Bass Coast, South Gippsland and West Gippsland, with regional work available by arrangement."
        headingLevel="h1"
        secondaryHref="#coverage"
        secondaryLabel="Find my area"
        showDirectory={false}
      />

      <div id="coverage" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="kicker">Our coverage</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">The corridors we actually work.</h2>
        <div className="mt-14 space-y-14">
          {GROUPS.map((group) => (
            <section key={group.title} className="border-t border-line pt-8">
              <h3 className="font-display text-2xl sm:text-3xl">
                <Link to="/service-areas/region/$slug" params={{ slug: group.region }} className="hover:text-mint">
                  {group.title}
                </Link>
              </h3>
              <p className="mt-4 text-muted">{group.copy}</p>
              <p className="mt-5 text-sm leading-7">
                {group.slugs.map((slug, i) => {
                  const area = areaBySlug(slug);
                  if (!area) return null;
                  return (
                    <span key={`${group.title}-${slug}`}>
                      {i > 0 && <span className="text-muted"> · </span>}
                      <Link to="/service-areas/$slug" params={{ slug }} className="text-fg hover:text-mint">
                        {area.name}
                      </Link>
                    </span>
                  );
                })}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <h2 className="font-display text-2xl">Not sure if we come to you?</h2>
          <p className="mt-3 text-muted">
            Enter the address in the estimator and location is included. If the property is further out — Wilsons Prom, East Gippsland, the high country — say so. Some jobs are a day trip. We will tell you before anyone drives.
          </p>
          <div className="mt-8 max-w-md">
            <EnquiryForm selectedPackage="Service area enquiry" buttonLabel="Ask about my suburb" />
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
