import { AppLink } from "@/components/app-link";
import type { RelatedLink } from "@/lib/pages/types";

export function RelatedLinks({
  items,
  title = "Related",
}: {
  items: RelatedLink[];
  title?: string;
}) {
  if (!items.length) return null;
  return (
    <section className="mt-14">
      <h2 className="font-display text-2xl">{title}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <AppLink
              to={item.href}
              className="block rounded-xl border border-line bg-surface p-4 hover:border-mint"
            >
              <p className="font-display text-lg">{item.label}</p>
              {item.copy && <p className="mt-1 text-sm text-muted">{item.copy}</p>}
            </AppLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
