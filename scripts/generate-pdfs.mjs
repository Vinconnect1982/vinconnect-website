import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = "/workspace/public/downloads";
const LOGO = "/workspace/public/media/logo.webp";

const DOCS = [
  {
    file: "vinconnect-capability-statement.pdf",
    title: "Capability statement",
    kicker: "VINCONNECT · Cranbourne VIC",
    body: `
      <p class="lede">Family-run installation business. One point of contact. Work scoped around the property, not a catalogue kit.</p>
      <h2>What we install</h2>
      <ul>
        <li>Starlink Standard, Mini and touring installations (labour; hardware on your account)</li>
        <li>Whole-property Wi-Fi and TP-Link Omada point-to-point links</li>
        <li>HiLook CCTV packages, stable and solar/gate cameras</li>
        <li>Cabinets, labelling, UPS planning and handover</li>
        <li>Event Link — rapidly deployable Starlink/Wi-Fi for rural events (pilot, 2026–27)</li>
      </ul>
      <h2>Credentials</h2>
      <ul>
        <li>ACMA Registered Open Cabler</li>
        <li>Working at Heights</li>
        <li>White Card</li>
        <li>Public Liability and WorkCover</li>
      </ul>
      <h2>Where we work</h2>
      <p>Casey & South East Melbourne (home base Cranbourne), Cardinia, Mornington Peninsula, Western Port & Bass Coast, South Gippsland, West Gippsland & Latrobe, plus Inner South East travel jobs.</p>
      <h2>How we quote</h2>
      <p>Address-based estimator for a labour range, then photos or a property plan before a written total. Travel from Cranbourne is in the number. We do not sell Starlink subscriptions.</p>
      <p class="foot">Vince De Stefano · 0408 559 555 · vince@vinconnect.com.au · vinconnect.com.au</p>
    `,
  },
  {
    file: "starlink-installation-guide.pdf",
    title: "Starlink installation guide",
    kicker: "Practical notes before the visit",
    body: `
      <p class="lede">Sky view, mount type, cable entry and router placement decide whether the kit works on day one and still looks tidy in two years.</p>
      <h2>1. Sky view</h2>
      <p>Use the Starlink app obstruction tool on the roof or the proposed tripod position — not from the backyard. Trees, neighbouring two-storey homes and the roof itself all count.</p>
      <h2>2. Mount types we actually use</h2>
      <ul>
        <li>Fascia / wall — often cleanest on new estates</li>
        <li>Tripod / non-penetrating — flat roofs, rentals, coastal presentation</li>
        <li>Roof / ridge — when that is the only honest sky view</li>
      </ul>
      <h2>3. Cable entry</h2>
      <p>Agree the route before a hole is made. Seal, strain-relief and an accessible indoor termination. The weak point on DIY jobs is almost always the penetration.</p>
      <h2>4. Router placement</h2>
      <p>Central, ventilated, not in a metal cabinet or a low cupboard. If the house is brick and two-storey, plan mesh or a second access point rather than hoping.</p>
      <h2>5. What VINCONNECT prices</h2>
      <p>Installation labour. Starlink hardware, mounts you supply or we itemise, and the monthly plan stay on your Starlink account. Confirm current offers at checkout.</p>
      <p class="foot">vinconnect.com.au/services/starlink-installation · 0408 559 555</p>
    `,
  },
  {
    file: "property-wifi-checklist.pdf",
    title: "Whole-property Wi-Fi checklist",
    kicker: "Fill this in before the quote call",
    body: `
      <p class="lede">A one-page walkthrough of house, shed, stable, gate and power.</p>
      <h2>Mark on a sketch or the online planner</h2>
      <ul>
        <li>House / internet source</li>
        <li>Shed, workshop, stable, granny flat, arena, gate</li>
        <li>Approximate distances (the planner measures them)</li>
        <li>Trees or hills between buildings</li>
      </ul>
      <h2>Power</h2>
      <p>Is there a power point at each building you want covered? Is the shed on the same switchboard? Do you want a UPS on the router and recorder?</p>
      <h2>Who uses what</h2>
      <p>Work from home, cameras, guests, machinery telemetry, kids on the back veranda — say so. Traffic types change the design.</p>
      <h2>Existing kit</h2>
      <p>NBN, OptiComm, Starlink already on site, mesh nodes, a data cabinet, CCTV that must stay. Photos of the rack save a conversation.</p>
      <p class="foot">Planner: vinconnect.com.au/property-planner</p>
    `,
  },
  {
    file: "hilook-package-comparison.pdf",
    title: "HiLook package comparison",
    kicker: "Starting prices · AUD inc GST",
    body: `
      <p class="lede">Hardware street prices move. We confirm the current kit before you order. Travel, trenching and extra buildings are extras.</p>
      <table>
        <thead>
          <tr><th></th><th>Home Watch 4</th><th>Property Guard 6</th><th>Acreage 8</th><th>Stable & Yard</th></tr>
        </thead>
        <tbody>
          <tr><td>Best for</td><td>Typical house</td><td>Larger home / garage</td><td>5-acre + shed</td><td>Horses, gate, dust</td></tr>
          <tr><td>Cameras</td><td>4 × 6MP turret</td><td>6 × 6MP turret</td><td>8 × 6/8MP mix</td><td>4–6 PoE + 1 solar/wireless</td></tr>
          <tr><td>NVR</td><td>4-ch PoE</td><td>8-ch (2 spare)</td><td>8-ch PoE</td><td>8-ch PoE</td></tr>
          <tr><td>Storage</td><td>2 TB</td><td>4 TB</td><td>4–6 TB</td><td>4 TB</td></tr>
          <tr><td>Hardware from</td><td>$740</td><td>$1,180</td><td>$1,680</td><td>$1,540</td></tr>
          <tr><td>Labour from</td><td>$890</td><td>$1,450</td><td>$2,200</td><td>$2,400</td></tr>
          <tr><td>Typical S&I</td><td>$1,890</td><td>$2,890</td><td>$4,200</td><td>$4,800</td></tr>
        </tbody>
      </table>
      <p>App: Hik-Connect / HiLook. No monthly camera fee. Australian hardware warranty. VINCONNECT does not sell Starlink subscriptions.</p>
      <p class="foot">vinconnect.com.au/security/hilook-cctv-packages · 0408 559 555</p>
    `,
  },
  {
    file: "rural-connections-brief.pdf",
    title: "Rural Connections brief",
    kicker: "Victoria 2026–27 · public benefit first",
    body: `
      <p class="lede">A practical community program: meet people at shows, keep useful information online, and take recurring rural connectivity barriers to people who can change them. This is not a grant application.</p>
      <h2>Three pillars</h2>
      <ul>
        <li><strong>Rural Connection Hub</strong> — travelling presence inside established agricultural shows. Free temporary Wi-Fi, shade, demonstrations, farmer-health resources. No sales pitch at the door.</li>
        <li><strong>Rural & Remote Info Hub</strong> — this website: guides, suburb pages, PDFs. Nothing requires a marketing subscription.</li>
        <li><strong>Advocacy</strong> — document gaps in aggregate. LEO satellite is one option, not a replacement for fibre, mobile or fixed wireless.</li>
      </ul>
      <h2>Indicative 2026–27 pathway</h2>
      <p>Nov 2026 Korumburra Sheepdog Trials · Jan 2027 Lang Lang Show · Feb 2027 Korumburra Show · Mar 2027 Warragul Show and Farm World (Lardner Park) · Apr 2027 Bunyip Show. Dates subject to host confirmation.</p>
      <h2>Pathways we are testing (alignment only)</h2>
      <p>Look Over the Farm Gate; Regional Events Fund Stream 3; On Farm Connectivity Program Round 3; FRRR Strengthening Rural Communities. Not a claim of approval or eligibility.</p>
      <p class="foot">vinconnect.com.au/rural-connections</p>
    `,
  },
  {
    file: "event-link-onepager.pdf",
    title: "Event Link one-pager",
    kicker: "Pilot product · 2026–27",
    body: `
      <p class="lede">VINCONNECT Event Link is a rapidly deployable Starlink and managed Wi-Fi kit for agricultural shows, field days, clubs and rural community events. There is no retail SKU yet.</p>
      <h2>What stands up in the paddock</h2>
      <ul>
        <li>Starlink as the upstream internet (organiser plan, or included in the activation quote)</li>
        <li>Managed outdoor-capable Wi-Fi for the hub, committee area or public seating</li>
        <li>Labelled network case; guest network kept apart from operations</li>
        <li>Pack-down and handover so the next volunteer is not guessing</li>
      </ul>
      <h2>What it is not</h2>
      <ul>
        <li>A carrier-grade network for an entire showgrounds</li>
        <li>A substitute for an existing paid venue Wi-Fi contract unless scoped</li>
        <li>A marketing list — community Wi-Fi does not require a marketing opt-in</li>
      </ul>
      <p>Drawn from VINCONNECT’s Rural Connections discussion paper. No separate Event Link brochure was on file; this is the public brief.</p>
      <p class="foot">vinconnect.com.au/event-link · organisers: vinconnect.com.au/event-link/organisers</p>
    `,
  },
  {
    file: "camera-planning-worksheet.pdf",
    title: "Camera planning worksheet",
    kicker: "Views first. Hardware second.",
    body: `
      <p class="lede">Mark views, power and recording days before anyone counts cameras.</p>
      <h2>Views (tick and note distance)</h2>
      <ul>
        <li>Front entry / doorbell line</li>
        <li>Driveway / cars</li>
        <li>Rear yard / side access</li>
        <li>Garage / carport</li>
        <li>Shed interior or eave</li>
        <li>Stable aisle / foaling box / arena</li>
        <li>Front gate after dark</li>
      </ul>
      <h2>Recording</h2>
      <p>Days of retention you actually need (motion vs continuous). Who reviews clips. Whether a UPS is worth it so the recorder survives a short outage.</p>
      <h2>Network</h2>
      <p>If a camera cannot reach a recorder or the internet it is just a box on a wall. Detached buildings usually need a wireless link or a trench — say which is realistic.</p>
      <p class="foot">Packages: vinconnect.com.au/security/hilook-cctv-packages</p>
    `,
  },
  {
    file: "install-day-prep.pdf",
    title: "Install-day preparation",
    kicker: "Short and practical",
    body: `
      <p class="lede">Access, pets, ladders, power isolation and who needs to be home.</p>
      <h2>Before we arrive</h2>
      <ul>
        <li>Someone 18+ on site who can approve the mount position</li>
        <li>Pets contained — roofs and cable runs are not a place for dogs underfoot</li>
        <li>Clear access to the roof, fascia, meter box / data cabinet and the indoor router location</li>
        <li>Starlink kit on site if you are supplying it, still in the box if possible</li>
        <li>Wi-Fi password and Starlink account login available for handover</li>
      </ul>
      <h2>We bring</h2>
      <p>Ladders, heights practice, cabling consumables, labelling. Mains electrical work is separately scoped with a licensed electrician if a new circuit is required.</p>
      <h2>Handover</h2>
      <p>You should leave knowing how the system is powered, isolated, and how to check the app. If that did not happen, say so before we drive off.</p>
      <p class="foot">0408 559 555 · vince@vinconnect.com.au</p>
    `,
  },
];

const css = `
  @page { size: A4; margin: 18mm 16mm; }
  html, body { margin: 0; padding: 0; background: #f3f1eb; color: #122026; font-family: "Source Sans 3", "Segoe UI", sans-serif; }
  .page { padding: 8px 4px; }
  .brand { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #62dfc8; padding-bottom: 10px; margin-bottom: 18px; }
  .brand img { height: 36px; }
  .kicker { font-family: Outfit, "Segoe UI", sans-serif; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #2fb9a8; }
  h1 { font-family: Outfit, "Segoe UI", sans-serif; font-size: 28px; letter-spacing: -0.03em; margin: 8px 0 12px; }
  h2 { font-family: Outfit, "Segoe UI", sans-serif; font-size: 16px; margin: 18px 0 6px; }
  p, li, td, th { font-size: 12.5px; line-height: 1.45; }
  .lede { font-size: 14px; color: #52636b; }
  ul { padding-left: 18px; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0; }
  th, td { border: 1px solid #d5d1c6; padding: 6px 8px; text-align: left; vertical-align: top; }
  th { background: #e7e4db; font-family: Outfit, sans-serif; font-size: 11px; }
  .foot { margin-top: 28px; font-size: 11px; color: #52636b; border-top: 1px solid #d5d1c6; padding-top: 10px; }
`;

function htmlFor(doc) {
  return `<!doctype html><html><head><meta charset="utf-8">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Source+Sans+3:wght@400;600&display=swap">
    <style>${css}</style></head>
    <body><div class="page">
      <div class="brand">
        <img src="file://${LOGO}" alt="VINCONNECT">
        <span class="kicker">${doc.kicker}</span>
      </div>
      <h1>${doc.title}</h1>
      ${doc.body}
    </div></body></html>`;
}

const browser = await chromium.launch({ args: ["--no-sandbox"] });
await mkdir(OUT, { recursive: true });
for (const doc of DOCS) {
  const htmlPath = path.join("/tmp", doc.file.replace(".pdf", ".html"));
  await writeFile(htmlPath, htmlFor(doc));
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
  await page.pdf({
    path: path.join(OUT, doc.file),
    format: "A4",
    printBackground: true,
  });
  await page.close();
  console.log("wrote", doc.file);
}
await browser.close();
