import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticlePage, articleHead } from "@/components/article-page";
import { articleBySlug } from "@/lib/pages";

export const Route = createFileRoute("/customer-help/$slug")({
  loader: ({ params }) => {
    const page = articleBySlug("customer-help", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => (loaderData ? articleHead(loaderData) : {}),
  component: () => <ArticlePage page={Route.useLoaderData()} />,
});
