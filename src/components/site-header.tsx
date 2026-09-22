import { AppLink } from "@/components/app-link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NAV, PHONE, PHONE_TEL } from "@/lib/content";
import { cn } from "@/lib/utils";

function NavItems({ onNavigate, compact }: { onNavigate?: () => void; compact?: boolean }) {
  return (
    <>
      {NAV.map((item) =>
        item.children ? (
          <div key={item.label} className="group relative">
            <AppLink
              to={item.href}
              className={cn(
                "inline-flex items-center gap-1 rounded-full text-fg/85 hover:text-mint",
                compact ? "h-10 px-2.5 text-[13px]" : "min-h-11 py-2 text-base",
              )}
              onClick={onNavigate}
            >
              {item.label}
              <ChevronDown className="size-3.5 opacity-60" />
            </AppLink>
            <div className="invisible absolute left-0 top-full z-50 min-w-56 rounded-lg border border-line bg-surface p-2 opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {item.children.map((child) => (
                <AppLink
                  key={child.href}
                  to={child.href}
                  className="block rounded-md px-3 py-2.5 text-sm text-fg/90 hover:bg-raised hover:text-mint"
                  onClick={onNavigate}
                >
                  {child.label}
                </AppLink>
              ))}
            </div>
          </div>
        ) : (
          <AppLink
            key={item.href}
            to={item.href}
            className={cn(
              "inline-flex items-center rounded-full text-fg/85 hover:text-mint",
              compact ? "h-10 px-2.5 text-[13px]" : "min-h-11 py-2 text-base",
            )}
            onClick={onNavigate}
          >
            {item.label}
          </AppLink>
        ),
      )}
    </>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <AppLink to="/" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
          <img
            src="/media/logo.webp"
            alt="VINCONNECT"
            className="h-9 w-auto sm:h-10"
            width={180}
            height={40}
          />
        </AppLink>

        <div className="ml-auto flex items-center gap-2">
          <AppLink
            to="/property-planner"
            className="hidden h-11 items-center px-2 text-sm text-fg/80 hover:text-mint md:inline-flex"
          >
            Plan My Property
          </AppLink>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <AppLink to="/estimate">Check My Install Price</AppLink>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-fg lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        className="hidden border-t border-line/70 lg:block"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-0.5 px-4 sm:px-6">
          <NavItems compact />
        </div>
      </nav>

      <div
        className={cn(
          "border-t border-line bg-ink-2 lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
          {NAV.map((item) => (
            <div key={item.label} className="flex flex-col">
              <AppLink
                to={item.href}
                className="flex min-h-11 items-center py-2 text-base"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </AppLink>
              {item.children?.map((child) => (
                <AppLink
                  key={child.href}
                  to={child.href}
                  className="flex min-h-11 items-center py-2 pl-4 text-sm text-muted"
                  onClick={() => setOpen(false)}
                >
                  {child.label}
                </AppLink>
              ))}
            </div>
          ))}
          <AppLink
            to="/property-planner"
            className="flex min-h-11 items-center py-2"
            onClick={() => setOpen(false)}
          >
            Property Planner
          </AppLink>
          <AppLink
            to="/estimate"
            className="flex min-h-11 items-center py-2 text-mint"
            onClick={() => setOpen(false)}
          >
            Check My Install Price
          </AppLink>
          <a href={PHONE_TEL} className="flex min-h-11 items-center py-2 text-muted">
            Call {PHONE}
          </a>
        </nav>
      </div>
    </header>
  );
}
