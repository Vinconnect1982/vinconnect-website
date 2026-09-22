import { AppLink } from "@/components/app-link";
import type { Crumb } from "@/lib/pages/types";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((item, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {last || !item.href ? (
                <span className={last ? "text-fg/80" : undefined}>{item.label}</span>
              ) : (
                <AppLink to={item.href} className="hover:text-mint">
                  {item.label}
                </AppLink>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
