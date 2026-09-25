import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listMediaDrafts, saveMediaDraft, type MediaDraft } from "@/lib/media";
import { WAR_NOW, WAR_PLANNED, WAR_STAGES, WAR_WAITING } from "@/lib/war-room";
import { DOWNLOADS } from "@/lib/downloads";
import { PROJECTS, SITE_URL, SOCIALS } from "@/lib/content";
import { followSavedQuote, listQuotes, removeQuote, resendSavedQuote, setQuote, type Submission } from "@/lib/submissions";
import { formatAud } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  headers: () => ({
    "Cache-Control": "private, no-store, max-age=0, must-revalidate",
    "Netlify-CDN-Cache-Control": "no-store",
  }),
  head: () => ({
    meta: [
      { title: "VINCONNECT control room" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

type Desk = "home" | "leads" | "resources" | "marketing" | "war" | "finance" | "restore";

const DESKS: { id: Desk; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "leads", label: "Leads" },
  { id: "resources", label: "Resources" },
  { id: "marketing", label: "Media" },
  { id: "war", label: "War room" },
  { id: "finance", label: "Finance" },
  { id: "restore", label: "Restore" },
];
type Status = "open" | "won" | "lost" | "deleted";
const TABS: { id: Status; label: string }[] = [
  { id: "open", label: "Open" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Not won" },
  { id: "deleted", label: "Deleted" },
];

function AdminPage() {
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Submission[] | null>(null);
  const [desk, setDesk] = useState<Desk>("home");
  const [tab, setTab] = useState<Status>("open");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load(nextPassword = password) {
    setRows(await listQuotes({ data: { password: nextPassword } }));
  }

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((reg) => reg.unregister()));
    }
    if ("caches" in window) {
      caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
    }
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("vc-admin");
    if (!saved) return;
    setPassword(saved);
    listQuotes({ data: { password: saved } })
      .then(setRows)
      .catch(() => sessionStorage.removeItem("vc-admin"));
  }, []);

  async function open(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await load();
      sessionStorage.setItem("vc-admin", password);
    } catch (err) {
      setRows(null);
      setError(err instanceof Error ? err.message : "Could not open the quotes.");
    } finally {
      setBusy(false);
    }
  }

  function lock() {
    sessionStorage.removeItem("vc-admin");
    setRows(null);
    setPassword("");
  }

  async function act(id: string, run: () => Promise<unknown>) {
    setError("");
    try {
      await run();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "That did not save.");
    }
  }

  const visible = (rows ?? []).filter((row) => (row.status ?? "open") === tab);
  const room = DESKS.find((item) => item.id === desk)?.label ?? "Home";

  if (!rows) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-ink px-4 text-fg">
        <form onSubmit={open} className="w-full max-w-sm border border-line bg-ink-2 p-6">
          <p className="font-display text-2xl">VINCONNECT</p>
          <p className="mt-1 text-sm text-muted">Control room</p>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Dashboard password" autoComplete="current-password" className="mt-6 border-line bg-raised" />
          <Button type="submit" disabled={busy} className="mt-3 w-full">{busy ? "Opening…" : "Open"}</Button>
          {error && <p className="mt-3 text-sm text-danger">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-ink text-fg">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-line bg-ink-2 md:flex">
        <div className="border-b border-line px-5 py-6">
          <p className="font-display text-lg tracking-wide">VINCONNECT</p>
          <p className="text-xs text-muted">Control room</p>
          <p className="mt-2 text-xs text-muted">Build 2026-09-25-dash</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Dashboard">
          {DESKS.map((item) => (
            <button key={item.id} type="button" onClick={() => setDesk(item.id)} className={`px-3 py-2 text-left text-sm ${desk === item.id ? "bg-raised text-mint" : "text-fg"}`}>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <div className="md:pl-60">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-ink px-4 py-3">
          <p className="font-display text-xl">{room}</p>
          <div className="flex gap-2">
            <Button type="button" variant="ink" onClick={() => load()}>Refresh</Button>
            <Button type="button" variant="ink" onClick={lock}>Lock</Button>
          </div>
        </header>
        <nav className="flex gap-2 overflow-x-auto border-b border-line px-3 py-2 md:hidden" aria-label="Dashboard">
          {DESKS.map((item) => (
            <button key={item.id} type="button" onClick={() => setDesk(item.id)} className={`shrink-0 border px-3 py-2 text-sm ${desk === item.id ? "border-mint-deep text-mint" : "border-line"}`}>
              {item.label}
            </button>
          ))}
        </nav>
        {error && <p className="px-4 pt-4 text-sm text-danger sm:px-8">{error}</p>}
        <main className="px-4 py-6 sm:px-8">
          {desk === "home" && <HomeRoom rows={rows} onOpen={setDesk} />}
          {desk === "resources" && <ResourcesRoom />}
          {desk === "marketing" && <MarketingRoom password={password} />}
          {desk === "war" && <WarRoom />}
          {desk === "finance" && <FinanceRoom rows={rows} />}
          {desk === "restore" && <RestoreRoom />}
          {desk === "leads" && (
            <>
              <div className="flex flex-wrap gap-2">
                {TABS.map((item) => (
                  <button key={item.id} type="button" onClick={() => setTab(item.id)} className={`border px-3 py-2 text-sm ${tab === item.id ? "border-mint-deep text-mint" : "border-line"}`}>
                    {item.label} ({rows.filter((row) => (row.status ?? "open") === item.id).length})
                  </button>
                ))}
              </div>
              <div className="mt-4 grid gap-3">
                {visible.length === 0 && <p className="text-sm text-muted">Nothing in {TABS.find((item) => item.id === tab)?.label.toLowerCase()}.</p>}
                {visible.map((row) => (
                  <QuoteCard key={row.id} row={row} password={password} onAct={act} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

const PACKS = [
  ...DOWNLOADS.map((doc) => ({ title: doc.title, file: doc.file, lede: doc.lede })),
  { title: "VinReady builder pack", file: "/downloads/vinready-builder-pack.pdf", lede: "The builder pack for display suites and land offices." },
  { title: "Event Link brochure", file: "/downloads/eventlink-brochure.pdf", lede: "The three Event Link trailers and how an organiser books." },
];

function HomeRoom({ rows, onOpen }: { rows: Submission[]; onOpen: (desk: Desk) => void }) {
  const open = rows.filter((row) => (row.status ?? "open") === "open").length;
  const won = rows.filter((row) => row.status === "won").length;
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {[
        ["Leads", `${open} open quotes. Won, not won, resend and follow-up live here.`, "leads"],
        ["Resources", "Download the service PDFs.", "resources"],
        ["Media", "Published jobs, captions, and links out to Facebook, Instagram and Google.", "marketing"],
        ["War room", "VinGear actions and stages.", "war"],
        ["Finance", "Quote pipeline from the leads already saved. Not a set of accounts.", "finance"],
        ["Restore", "GitHub and the Google Drive restore folder.", "restore"],
      ].map(([label, copy, id]) => (
        <button key={id} type="button" onClick={() => onOpen(id as Desk)} className="border border-line p-4 text-left">
          <span className="font-display text-2xl">{label}</span>
          <span className="mt-2 block text-sm text-muted">{copy}</span>
          {label === "Leads" && <span className="mt-2 block text-sm">{won} won</span>}
        </button>
      ))}
    </div>
  );
}

function ResourcesRoom() {
  return (
    <div className="mt-6 grid gap-3">
      {PACKS.map((doc) => (
        <a key={doc.file} href={doc.file} className="border border-line p-4 no-underline" download>
          <span className="font-display text-xl">{doc.title}</span>
          <span className="mt-1 block text-sm text-muted">{doc.lede}</span>
        </a>
      ))}
    </div>
  );
}

function captionFor(project: (typeof PROJECTS)[number]) {
  return `${project.title}, ${project.place}.\n\n${project.summary}\n\nVINCONNECT. Starlink installed properly, from south-east Melbourne through Gippsland.\n${SITE_URL}/projects/${project.slug}`;
}

function MarketingRoom({ password }: { password: string }) {
  const [drafts, setDrafts] = useState<MediaDraft[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    listMediaDrafts({ data: { password } })
      .then(setDrafts)
      .catch(() => setNote("Saved posts could not be loaded."));
  }, [password]);

  async function keep(project: (typeof PROJECTS)[number], status: MediaDraft["status"]) {
    const draft: MediaDraft = {
      id: project.slug,
      createdAt: new Date().toISOString(),
      title: project.title,
      place: project.place,
      url: `${SITE_URL}/projects/${project.slug}`,
      caption: captionFor(project),
      status,
    };
    const saved = await saveMediaDraft({ data: { password, draft } });
    setDrafts((current) => [saved, ...current.filter((row) => row.id !== saved.id)]);
    setNote(status === "posted" ? "Marked as posted." : "Draft saved.");
  }

  async function copy(text: string) {
    await navigator.clipboard.writeText(text);
    setNote("Caption copied.");
  }

  return (
    <div className="mt-6">
      <p className="max-w-2xl text-sm text-muted">Published jobs. Copy the caption, open Facebook or Instagram, then mark it posted.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {SOCIALS.map((item) => (
          <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="border border-line px-3 py-2 text-sm no-underline">{item.label}</a>
        ))}
      </div>
      {note && <p className="mt-3 text-sm">{note}</p>}
      <div className="mt-4 grid gap-3">
        {PROJECTS.filter((project) => project.image).map((project) => {
          const url = `${SITE_URL}/projects/${project.slug}`;
          const saved = drafts.find((row) => row.id === project.slug);
          return (
            <article key={project.slug} className="grid gap-3 border border-line p-3 sm:grid-cols-[8rem_1fr]">
              <img src={project.image} alt="" className="h-24 w-full object-cover" />
              <div>
                <p className="font-display text-lg">{project.title}</p>
                <p className="mt-1 text-sm text-muted">{project.place}. {saved ? (saved.status === "posted" ? "Posted." : "Draft saved.") : "Not posted yet."}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button type="button" variant="ink" onClick={() => copy(captionFor(project))}>Copy caption</Button>
                  <Button asChild variant="ink"><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">Facebook</a></Button>
                  <Button asChild variant="ink"><a href="https://www.instagram.com/vinconnectsolutions/" target="_blank" rel="noreferrer">Instagram</a></Button>
                  <Button asChild variant="ink"><a href={url} target="_blank" rel="noreferrer">Open page</a></Button>
                  <Button type="button" variant="ink" onClick={() => keep(project, "draft")}>Save draft</Button>
                  <Button type="button" onClick={() => keep(project, "posted")}>Mark posted</Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function FinanceRoom({ rows }: { rows: Submission[] }) {
  const sum = (status: Status) => rows.filter((row) => (row.status ?? "open") === status).reduce((total, row) => total + (row.total ?? 0), 0);
  return (
    <div className="mt-6">
      <p className="max-w-2xl text-sm text-muted">Quote totals from the website. This is not the bank account.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {(["open", "won", "lost"] as Status[]).map((status) => (
          <div key={status} className="border border-line p-4">
            <p className="text-sm text-muted">{status === "lost" ? "Not won" : status === "open" ? "Open" : "Won"}</p>
            <p className="mt-2 font-display text-3xl">{formatAud(sum(status))}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RestoreRoom() {
  return (
    <div className="mt-6 grid gap-3">
      <a href="https://github.com/Vinconnect1982/vinconnect-website" target="_blank" rel="noreferrer" className="border border-line p-4 no-underline">
        <span className="font-display text-xl">Live site source</span>
        <span className="mt-1 block text-sm text-muted">vinconnect.com.au publishes from this repository.</span>
      </a>
      <a href="https://drive.google.com/drive/folders/15wjwTYPP10W5se8p35ZvAfZWfLGK1S_4" target="_blank" rel="noreferrer" className="border border-line p-4 no-underline">
        <span className="font-display text-xl">Google Drive restore folder</span>
        <span className="mt-1 block text-sm text-muted">VINCONNECT Restore, inside the Vinconnect Drive folder.</span>
      </a>
    </div>
  );
}

function WarRoom() {
  return (
    <div className="mt-6">
      <p className="max-w-2xl text-sm text-muted">VinGear Pulse. Nothing is framed. Do not place a production order from a donor-part test alone.</p>
      <ol className="mt-6 grid gap-2 sm:grid-cols-2">
        {WAR_STAGES.map((stage, index) => (
          <li key={stage.title} className="flex items-baseline justify-between gap-3 border border-line px-3 py-2 text-sm">
            <span>{index + 1}. {stage.title}</span>
            <span className="text-muted">{stage.state}</span>
          </li>
        ))}
      </ol>
      <WarList title="Do now" items={WAR_NOW} />
      <WarList title="Waiting on someone else" items={WAR_WAITING} />
      <WarList title="Planned" items={WAR_PLANNED} />
    </div>
  );
}

function WarList({ title, items }: { title: string; items: { title: string; detail: string; lane: string }[] }) {
  return (
    <section className="mt-8">
      <h2 className="font-display text-2xl">{title}</h2>
      <div className="mt-3 grid gap-3">
        {items.map((item) => (
          <article key={item.title} className="border border-line p-4">
            <p className="text-xs text-muted">{item.lane}</p>
            <h3 className="mt-1 font-display text-xl">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function QuoteCard({
  row,
  password,
  onAct,
}: {
  row: Submission;
  password: string;
  onAct: (id: string, run: () => Promise<unknown>) => Promise<void>;
}) {
  const [note, setNote] = useState(row.note ?? "");
  const [name, setName] = useState(row.name);
  const [email, setEmail] = useState(row.email);
  const [phone, setPhone] = useState(row.phone);
  const status = row.status ?? "open";

  return (
    <article className="border border-line p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-xl">{row.id}</p>
          <p className="text-sm text-muted">{new Date(row.createdAt).toLocaleString("en-AU")}</p>
        </div>
        <p className="font-display text-2xl">{row.total != null ? formatAud(row.total) : "—"}</p>
      </div>
      <p className="mt-3">{row.address || row.suburb}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <Input value={name} onChange={(e) => setName(e.target.value)} className="border-line bg-raised" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} className="border-line bg-raised" />
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="border-line bg-raised" />
      </div>
      <p className="mt-3 text-xs text-muted">{row.photos?.length ?? 0} photos{row.followedUpAt ? ` · Followed up ${new Date(row.followedUpAt).toLocaleDateString("en-AU")}` : ""}</p>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Internal note" className="mt-3 w-full border border-line bg-raised px-3 py-2 text-sm" />
      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" variant="ink" onClick={() => onAct(row.id, () => setQuote({ data: { password, id: row.id, note, name, email, phone } }))}>Save</Button>
        {status !== "won" && <Button type="button" onClick={() => onAct(row.id, () => setQuote({ data: { password, id: row.id, status: "won" } }))}>Won</Button>}
        {status !== "lost" && status !== "deleted" && <Button type="button" variant="ink" onClick={() => onAct(row.id, () => setQuote({ data: { password, id: row.id, status: "lost" } }))}>Not won</Button>}
        {status !== "open" && <Button type="button" variant="ink" onClick={() => onAct(row.id, () => setQuote({ data: { password, id: row.id, status: "open" } }))}>Reopen</Button>}
        <Button type="button" variant="ink" onClick={() => onAct(row.id, () => resendSavedQuote({ data: { password, id: row.id } }))}>Resend</Button>
        {(status === "lost" || status === "open") && <Button type="button" variant="ink" onClick={() => onAct(row.id, () => followSavedQuote({ data: { password, id: row.id } }))}>Follow up</Button>}
        {status !== "deleted" && <Button type="button" variant="ink" onClick={() => onAct(row.id, () => setQuote({ data: { password, id: row.id, status: "deleted" } }))}>Delete</Button>}
        {status === "deleted" && (
          <Button type="button" variant="ink" onClick={() => { if (!confirm(`Permanently remove ${row.id}?`)) return; return onAct(row.id, () => removeQuote({ data: { password, id: row.id } })); }}>Purge</Button>
        )}
        {row.token && (
          <Button asChild variant="ink"><a href={`/quote/${row.token}`} target="_blank" rel="noreferrer">Customer link</a></Button>
        )}
      </div>
    </article>
  );
}
