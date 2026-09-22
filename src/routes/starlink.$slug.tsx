import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArticlePage, articleHead } from "@/components/article-page";
import { articleBySlug } from "@/lib/pages";

export const Route = createFileRoute("/starlink/$slug")({
  loader: ({ params }) => {
    const page = articleBySlug("starlink", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => (loaderData ? articleHead(loaderData) : {}),
  component: () => <ArticlePage page={Route.useLoaderData()} />,
});
