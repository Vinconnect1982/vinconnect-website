# VINCONNECT Website Recovery Source

This is a standalone recovery build of the VINCONNECT website, reconstructed from the active ChatGPT Sites projection, publicly indexed VINCONNECT pages, and VINCONNECT assets already stored in the account library.

## Why this exists
The original ChatGPT Sites project reached its message limit and could not be exported as raw source. This package moves the website into ordinary files that can be owned in GitHub and edited by any coding AI or developer.

## Included
- Responsive VINCONNECT home page and navigation
- Installation estimator using the agreed base prices
- Optional Google Places address autocomplete
- Server-side Netlify estimator function for location/travel calculation
- Property-planner sketch fallback with up to 12 points and link lines
- Services pages for Starlink, Wi-Fi, wireless links and CCTV
- Completed projects page
- Service-area page
- About and contact pages
- Recovered VINCONNECT marketing imagery
- Netlify configuration

## Pricing currently coded
- Single storey: $300
- Double storey: $550
- Conduit: +$120
- Router in data cabinet/garage: +$150
- Travel is calculated only in the server-side function and is not displayed separately to the customer.

## Run locally
No package install is required.

```bash
python3 -m http.server 8080
```
Then open http://localhost:8080

The estimator works in fallback mode locally. Server-side location pricing requires a Netlify deployment.

## Google address autocomplete
Create a browser-restricted Google Maps JavaScript API key and add it to:

`assets/config.js`

Restrict the key to your production domain and enable Places/Maps JavaScript APIs as required.

## Server-side distance calculation
In Netlify, add the secret environment variable:

`GOOGLE_MAPS_SERVER_KEY`

Enable the Google Routes API for that server key. Do not put this server key in client-side JavaScript.

## Deploy on Netlify
1. Create a private GitHub repository.
2. Upload this project to the repository.
3. Connect the repository to Netlify.
4. Set `GOOGLE_MAPS_SERVER_KEY` in Netlify environment variables.
5. Add the browser-restricted key to `assets/config.js`.
6. Deploy and test on the Netlify URL.
7. Only after testing, point `vinconnect.com.au` to the new Netlify site.

## Important recovery limitation
This is a reconstructed source project, not a byte-for-byte export of the inaccessible ChatGPT Sites internal source. Visual content, business copy and core workflows have been recovered, but any unpublished/internal code from the original Sites project could not be extracted.

## Recommended AI handoff prompt
Use this with Antigravity, Cursor, Copilot or another coding agent:

> Treat this repository as the authoritative VINCONNECT website source. Preserve the existing VINCONNECT branding, SEO structure and mobile responsiveness. Before changing estimator or planner logic, inspect README.md and the existing implementation. Keep address autocomplete resilient with manual fallback, keep the map visible on desktop, and never expose internal travel pricing as a separate customer-facing line item. Test desktop and mobile before committing changes.
