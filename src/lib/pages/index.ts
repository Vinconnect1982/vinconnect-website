import { ABOUT_PAGES } from "./about-pages";
import { CIRCL } from "./circl";
import { CUSTOMER_HELP } from "./customer-help";
import { EVENT_LINK_PAGES } from "./event-link-pages";
import { INSTALL_TERMS } from "./install-terms";
import { PROPERTY_NETWORKS } from "./property-networks";
import { RESOURCE_GUIDES } from "./resources-guides";
import { RURAL_EXTRA } from "./rural-extra";
import { SECURITY_GUIDES } from "./security-guides";
import { SOLUTIONS } from "./solutions";
import { STARLINK } from "./starlink";
import type { Article } from "./types";
import { VINGEAR } from "./vingear";

export type { Article, RelatedLink } from "./types";
export { COMMERCIAL_RELATED } from "./commercial-related";

export const ARTICLES: Article[] = [
  INSTALL_TERMS,
  ...CUSTOMER_HELP,
  ...CIRCL,
  ...STARLINK,
  ...PROPERTY_NETWORKS,
  ...SECURITY_GUIDES,
  ...SOLUTIONS,
  ...EVENT_LINK_PAGES,
  ...VINGEAR,
  ...ABOUT_PAGES,
  ...RESOURCE_GUIDES,
  ...RURAL_EXTRA,
];

const byPath = new Map(ARTICLES.map((a) => [a.path, a]));

export function findArticle(path: string) {
  return byPath.get(path);
}

export function articleBySlug(cluster: string, slug: string) {
  return ARTICLES.find((a) => a.cluster === cluster && a.slug === slug);
}

export function clusterHub(cluster: string) {
  return ARTICLES.find((a) => a.cluster === cluster && a.slug === "index");
}

export function clusterChildren(cluster: string) {
  return ARTICLES.filter((a) => a.cluster === cluster && a.slug !== "index");
}

export const ARTICLE_PATHS = ARTICLES.map((a) => a.path);
