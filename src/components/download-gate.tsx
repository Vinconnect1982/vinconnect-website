import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitLead } from "@/lib/leads";
import { deliverLeadEmail } from "@/lib/lead-mail";
import type { DownloadDoc } from "@/lib/downloads";
import { PHONE, PHONE_TEL } from "@/lib/content";

export function DownloadGate({ doc }: { doc: DownloadDoc }) {
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (String(fd.get("website") || "")) return;
    setStatus("saving");
    setError("");
    try {
      const payload = {
          type: "download",
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          suburb: String(fd.get("suburb") || ""),
          package: doc.title,
          message: `Requested download: ${doc.title} (${doc.file})`,
        };
      await submitLead({ data: payload });
      await deliverLeadEmail(payload);
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-line bg-surface p-6">
        <p className="kicker">Ready</p>
        <h2 className="mt-2 font-display text-2xl">Your copy of {doc.title}.</h2>
        <p className="mt-3 text-sm text-muted">
          Open the PDF below. If you want the same job scoped for your property, use the estimator
          or call {PHONE}.
        </p>
        <Button asChild className="mt-5">
          <a href={doc.file} download>
            Download PDF
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-xl border border-line bg-surface p-6">
      <input type="hidden" name="website" tabIndex={-1} autoComplete="off" />
      <p className="text-sm text-muted">
        Leave a name, email, phone and suburb. We email VINCONNECT so we can follow up if useful —
        the PDF itself is not paywalled.
      </p>
      <Label>
        Name
        <Input name="name" required autoComplete="name" maxLength={200} />
      </Label>
      <Label>
        Email
        <Input name="email" type="email" required autoComplete="email" maxLength={200} />
      </Label>
      <Label>
        Phone
        <Input name="phone" type="tel" required autoComplete="tel" maxLength={30} />
      </Label>
      <Label>
        Suburb
        <Input name="suburb" required autoComplete="address-level2" maxLength={200} />
      </Label>
      <Button type="submit" disabled={status === "saving"}>
        {status === "saving" ? "Sending…" : "Email me and show the PDF"}
      </Button>
      {status === "error" && (
        <p role="alert" className="text-sm text-danger">
          {error} Call <a href={PHONE_TEL}>{PHONE}</a>.
        </p>
      )}
    </form>
  );
}
