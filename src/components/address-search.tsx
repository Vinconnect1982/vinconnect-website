import { useEffect, useId, useRef, useState } from "react";
import { searchAddresses, type AddressHit } from "@/lib/geocode";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AddressSearch({
  label = "Installation address",
  onSelect,
  selected,
  variant = "paper",
}: {
  label?: string;
  onSelect: (hit: AddressHit) => void;
  selected: AddressHit | null;
  variant?: "paper" | "dark";
}) {
  const id = useId();
  const [query, setQuery] = useState(selected?.address ?? "");
  const [hits, setHits] = useState<AddressHit[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const dark = variant === "dark";

  useEffect(() => {
    if (selected?.address && selected.address !== query) setQuery(selected.address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.address]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 3 || (selected && q === selected.address)) {
      setHits([]);
      return;
    }
    const t = setTimeout(() => {
      setBusy(true);
      setError("");
      searchAddresses({ data: { q } })
        .then((rows) => {
          setHits(rows);
          setOpen(true);
          if (!rows.length) setError("No matching Australian address. Add the street number, suburb and postcode.");
        })
        .catch((err: unknown) => {
          setError(err instanceof Error ? err.message : "Address search is unavailable.");
        })
        .finally(() => setBusy(false));
    }, 350);
    return () => clearTimeout(t);
  }, [query, selected]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function pick(hit: AddressHit) {
    onSelect(hit);
    setQuery(hit.address);
    setOpen(false);
    setError("");
  }

  function useTyped() {
    const q = query.trim();
    if (q.length < 5) {
      setError("Enter a full street address with suburb and postcode.");
      return;
    }
    if (hits[0]) {
      pick(hits[0]);
      return;
    }
    setBusy(true);
    searchAddresses({ data: { q } })
      .then((rows) => {
        if (rows[0]) pick(rows[0]);
        else setError("We could not confirm that address. Add the street number, suburb and postcode.");
      })
      .catch(() => setError("We could not confirm that address. Add the street number, suburb and postcode."))
      .finally(() => setBusy(false));
  }

  const field = dark
    ? "border-line bg-raised text-fg placeholder:text-muted"
    : "border-line-ink bg-paper text-ink-fg placeholder:text-muted-ink";
  const menu = dark
    ? "border-line bg-ink text-fg"
    : "border-line-ink bg-paper text-ink-fg";
  const itemHover = dark ? "hover:bg-raised" : "hover:bg-paper-2";

  return (
    <div ref={boxRef} className="relative">
      <label htmlFor={id} className={cn("mb-1.5 block text-sm font-medium", dark ? "text-fg" : "text-ink-fg")}>
        {label}
      </label>
      <Input
        id={id}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            useTyped();
          }
        }}
        placeholder="Start typing your street address"
        autoComplete="street-address"
        className={field}
        aria-autocomplete="list"
        aria-expanded={open}
      />
      {open && hits.length > 0 && (
        <ul role="listbox" className={cn("absolute z-20 mt-1 max-h-64 w-full overflow-auto rounded-lg border py-1 shadow-soft", menu)}>
          {hits.map((hit) => (
            <li key={`${hit.lat}-${hit.lng}-${hit.address}`}>
              <button
                type="button"
                className={cn("flex w-full px-3 py-2.5 text-left text-sm", dark ? "text-fg" : "text-ink-fg", itemHover)}
                onClick={() => pick(hit)}
              >
                {hit.address}
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button type="button" variant={dark ? "ghost" : "ink"} size="sm" onClick={useTyped} disabled={busy || query.trim().length < 3}>
          {busy ? "Checking…" : "Confirm address"}
        </Button>
        {busy && <span className={cn("text-sm", dark ? "text-muted" : "text-muted-ink")}>Loading address suggestions…</span>}
      </div>
      {selected && <p className="mt-3 text-sm text-ok">Selected: {selected.address}</p>}
      {error && (
        <p role="alert" className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
