export type Crumb = { label: string; href?: string };

export type RelatedLink = { label: string; href: string; copy?: string };

export type ArticleSection = {
  heading: string;
  copy: string[];
  list?: string[];
  note?: string;
};

export type Faq = { q: string; a: string };

export type ArticleCta = {
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export type ArticleForm = {
  type: string;
  package: string;
  button: string;
  messageLabel?: string;
};

export type ArticleChild = { href: string; title: string; copy: string };

export type Article = {
  path: string;
  slug: string;
  cluster: string;
  kicker: string;
  title: string;
  lede: string;
  description: string;
  image?: string;
  imageAlt?: string;
  status?: string;
  points?: string[];
  sections: ArticleSection[];
  faqs?: Faq[];
  related?: RelatedLink[];
  children?: ArticleChild[];
  cta?: ArticleCta;
  form?: ArticleForm;
  crumbs?: Crumb[];
};

export const DEFAULT_CTA: ArticleCta = {
  primary: { label: "Check My Install Price", href: "/estimate" },
  secondary: { label: "Call 0408 559 555", href: "tel:0408559555" },
};

export const PLAN_CTA: ArticleCta = {
  primary: { label: "Plan My Property", href: "/property-planner" },
  secondary: { label: "Check My Install Price", href: "/estimate" },
};

export const DISCUSS_CTA: ArticleCta = {
  primary: { label: "Discuss My Project", href: "/contact" },
  secondary: { label: "Call 0408 559 555", href: "tel:0408559555" },
};

export const HELP_CTA: ArticleCta = {
  primary: { label: "Ask VINCONNECT", href: "/contact" },
  secondary: { label: "Call 0408 559 555", href: "tel:0408559555" },
};
