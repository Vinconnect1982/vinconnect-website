import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticlePage, articleHead } from "@/components/article-page";
import { articleBySlug } from "@/lib/pages";

export const Route = createFileRoute("/event-link/$slug")({
  loader: ({ params }) => {
    const page = articleBySlug("event-link", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => (loaderData ? articleHead(loaderData) : {}),
  component: () => <ArticlePage page={Route.useLoaderData()} />,
});
