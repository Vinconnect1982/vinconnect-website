import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticlePage, articleHead } from "@/components/article-page";
import { clusterHub } from "@/lib/pages";

export const Route = createFileRoute("/journal/")({
  loader: () => {
    const page = clusterHub("journal");
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => (loaderData ? articleHead(loaderData) : {}),
  component: () => <ArticlePage page={Route.useLoaderData()} />,
});
