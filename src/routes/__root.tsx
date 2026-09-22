import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { AppLink } from "@/components/app-link";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteShell } from "@/components/site-shell";
import appCss from "../styles.css?url";

const APP_NAME = "VINCONNECT";
const BUILD_ID = "2026-09-23-o";

const CACHE_BUST = `(function(){
  try {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(rs){
        rs.forEach(function(r){ r.unregister(); });
      });
      navigator.serviceWorker.register("/sw.js").catch(function(){});
    }
    if (window.caches) {
      caches.keys().then(function(keys){
        keys.forEach(function(k){ caches.delete(k); });
      });
    }
  } catch (e) {}
})();`;

export const Route = createRootRoute({
  notFoundComponent: () => (
    <SiteShell>
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="kicker">404</p>
        <h1 className="mt-3 font-display text-4xl">That page is not here.</h1>
        <p className="mt-3 text-muted">Try the estimator, customer help, or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link to="/" className="text-mint">
            Home
          </Link>
          <Link to="/estimate" className="text-mint">
            Check My Install Price
          </Link>
          <AppLink to="/customer-help" className="text-mint">
            Customer help
          </AppLink>
        </div>
      </div>
    </SiteShell>
  ),
  headers: () => ({
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    Pragma: "no-cache",
    Expires: "0",
    "Clear-Site-Data": '"cache"',
  }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "VINCONNECT installs Starlink, Wi-Fi, wireless links and CCTV across South East Melbourne, Mornington Peninsula, Bass Coast and Gippsland. Call 0408 559 555.",
      },
      { name: "theme-color", content: "#071112" },
      { httpEquiv: "Cache-Control", content: "no-store, no-cache, must-revalidate" },
      { httpEquiv: "Pragma", content: "no-cache" },
      { name: "vinconnect-build", content: BUILD_ID },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en-AU" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: CACHE_BUST }} />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
