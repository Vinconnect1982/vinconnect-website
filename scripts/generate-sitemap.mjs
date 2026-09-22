import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const origin = "https://vinconnect.com.au";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = (p) => readFileSync(join(root, p), "utf8");

function slugs(text, re) {
  return [...text.matchAll(re)].map((m) => m[1]);
}

const areaSrc = src("src/lib/areas.ts");
const regionSlugs = slugs(areaSrc.split("export const AREAS")[0], /slug: "([^"]+)"/g);
const areaSlugs = slugs(areaSrc.split("export const AREAS")[1], /slug: "([^"]+)"/g);

const serviceSlugs = slugs(src("src/lib/content.ts").split("export const SECURITY")[0], /slug: "([^"]+)"/g);
const securitySlugs = slugs(src("src/lib/content.ts").split("export const SECURITY")[1].split("export function findService")[0], /slug: "([^"]+)"/g);
const projectSlugs = slugs(src("src/lib/content.ts").split("export const PROJECTS")[1], /slug: "([^"]+)"/g);
const packageSlugs = slugs(src("src/lib/packages.ts"), /slug: "([^"]+)"/g);
const ruralSlugs = slugs(src("src/lib/rural.ts").split("export const ROADSHOW")[0], /slug: "([^"]+)"/g).filter((s) => s !== "hub");
const downloadSlugs = slugs(src("src/lib/downloads.ts"), /slug: "([^"]+)"/g);

const pagesDir = join(root, "src/lib/pages");
const articlePaths = readdirSync(pagesDir)
  .filter((f) => f.endsWith(".ts") && f !== "types.ts" && f !== "index.ts" && f !== "commercial-related.ts")
  .flatMap((f) => slugs(readFileSync(join(pagesDir, f), "utf8"), /path: "(\/[^"]+)"/g));

const staticPaths = [
  "/",
  "/about",
  "/about/capability",
  "/about/safety-and-credentials",
  "/contact",
  "/estimate",
  "/event-link",
  "/event-link/organisers",
  "/privacy",
  "/property-planner",
  "/starlink-offer",
  "/projects",
  "/resources",
  "/resources/downloads",
  "/rural-connections",
  "/service-areas",
  "/services",
  "/security/hilook-cctv-packages",
];

const urls = [
  ...staticPaths,
  ...articlePaths,
  ...serviceSlugs.map((s) => `/services/${s}`),
  ...securitySlugs.map((s) => `/security/${s}`),
  ...packageSlugs.map((s) => `/security/packages/${s}`),
  ...projectSlugs.map((s) => `/projects/${s}`),
  ...regionSlugs.map((s) => `/service-areas/region/${s}`),
  ...areaSlugs.map((s) => `/service-areas/${s}`),
  ...ruralSlugs.map((s) => `/rural-connections/${s}`),
  ...downloadSlugs.map((s) => `/resources/downloads/${s}`),
];

const unique = [...new Set(urls)].sort();
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique
  .map(
    (u) => `  <url>
    <loc>${origin}${u}</loc>
    <changefreq>weekly</changefreq>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`sitemap: ${unique.length} urls`);
