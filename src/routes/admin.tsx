import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listQuotes, type Submission } from "@/lib/submissions";
import { formatAud } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "VINCONNECT quotes" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AdminPage() {
  const [password, setPassword] = useState("");
  const [rows, setRows] = useState<Submission[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function open(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      setRows(await listQuotes({ data: { password } }));
    } catch (err) {
      setRows(null);
      setError(err instanceof Error ? err.message : "Could not open the quotes.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <p className="kicker">VINCONNECT</p>
        <h1 className="mt-3 font-display text-4xl">Quotes and enquiries</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Website quotes and form enquiries saved from today onward. This page is not linked in the public menu.
        </p>
        <form onSubmit={open} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Dashboard password" autoComplete="current-password" className="border-line bg-raised" />
          <Button type="submit" disabled={busy}>{busy ? "Opening…" : "Open"}</Button>
        </form>
        {error && <p className="mt-3 text-sm text-danger">{error}</p>}
        {rows && (
          <div className="mt-8 overflow-x-auto">
            <p className="text-sm text-muted">{rows.length} saved</p>
            <table className="mt-3 w-full min-w-[720px] text-left text-sm">
              <thead className="text-muted">
                <tr>
                  <th className="py-2 pr-3 font-normal">When</th>
                  <th className="py-2 pr-3 font-normal">Code</th>
                  <th className="py-2 pr-3 font-normal">Who</th>
                  <th className="py-2 pr-3 font-normal">Address</th>
                  <th className="py-2 pr-3 font-normal">Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-line align-top">
                    <td className="py-3 pr-3">{new Date(row.createdAt).toLocaleString("en-AU")}</td>
                    <td className="py-3 pr-3">
                      {row.id}
                      <span className="mt-1 block text-xs text-muted">{row.kind}</span>
                    </td>
                    <td className="py-3 pr-3">
                      {row.name}
                      <span className="mt-1 block text-muted">{row.email}</span>
                      <span className="block text-muted">{row.phone}</span>
                    </td>
                    <td className="py-3 pr-3">
                      {row.address || row.suburb}
                      <span className="mt-1 block max-w-sm whitespace-pre-wrap text-xs text-muted">{row.summary}</span>
                    </td>
                    <td className="py-3 pr-3">{row.total != null ? formatAud(row.total) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SiteShell>
  );
}
