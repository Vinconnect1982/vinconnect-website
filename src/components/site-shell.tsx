import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { PHONE, PHONE_TEL } from "@/lib/content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { Button } from "./ui/button";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-ink text-fg">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-mint focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <SiteHeader />
      <div id="main-content" className="flex-1 pb-20 md:pb-0">
        {children}
      </div>
      <SiteFooter />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/95 p-3 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-6xl gap-2">
          <Button asChild className="flex-1">
            <Link to="/estimate">Check My Install Price</Link>
          </Button>
          <Button asChild variant="ghost" className="flex-1">
            <a href={PHONE_TEL}>Call {PHONE}</a>
          </Button>
        </div>
      </div>
    </div>
  );
}