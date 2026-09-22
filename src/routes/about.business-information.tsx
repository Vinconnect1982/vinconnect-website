import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticlePage, articleHead } from "@/components/article-page";
import { findArticle } from "@/lib/pages";

export const Route = createFileRoute("/about/business-information")({
  loader: () => {
    const page = findArticle("/about/business-information");
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => (loaderData ? articleHead(loaderData) : {}),
  component: () => <ArticlePage page={Route.useLoaderData()} />,
});
