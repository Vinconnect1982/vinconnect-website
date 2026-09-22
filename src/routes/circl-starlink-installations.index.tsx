import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticlePage, articleHead } from "@/components/article-page";
import { clusterHub } from "@/lib/pages";

export const Route = createFileRoute("/circl-starlink-installations/")({
  loader: () => {
    const page = clusterHub("circl");
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => (loaderData ? articleHead(loaderData) : {}),
  component: () => <ArticlePage page={Route.useLoaderData()} />,
});
