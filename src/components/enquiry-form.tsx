import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/lib/leads";
import { PHONE, PHONE_TEL } from "@/lib/content";
import { useSiteSession } from "@/lib/site-session";

export function EnquiryForm({
  type = "contact",
  selectedPackage = "",
  buttonLabel = "Send enquiry",
  messageLabel = "How can we help?",
  initialMessage = "",
  ink = false,
}: {
  type?: string;
  selectedPackage?: string;
  buttonLabel?: string;
  messageLabel?: string;
  initialMessage?: string;
  ink?: boolean;
}) {
  const siteAddress = useSiteSession((s) => s.address);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [emailed, setEmailed] = useState(true);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (String(fd.get("website") || "")) return;
    setStatus("saving");
    setError("");
    try {
      const sent = await submitLead({
        data: {
          type,
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          suburb: String(fd.get("suburb") || siteAddress?.suburb || ""),
          address: siteAddress?.address || "",
          package: selectedPackage,
          message: String(fd.get("message") || ""),
        },
      });
      setEmailed(sent.emailed);
      form.reset();
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Please try again.");
    }
  }

  const field = ink
    ? "border-line-ink bg-paper text-ink-fg"
    : "border-line bg-raised text-fg";

  return (
    <form onSubmit={submit} className="grid gap-4">
      <input type="hidden" name="website" tabIndex={-1} autoComplete="off" />
      {selectedPackage && (
        <p className="text-sm">
          Enquiry about: <strong>{selectedPackage}</strong>
        </p>
      )}
      <Label>
        Name
        <Input name="name" required autoComplete="name" maxLength={200} className={field} />
      </Label>
      <Label>
        Email
        <Input name="email" type="email" required autoComplete="email" maxLength={200} className={field} />
      </Label>
      <Label>
        Phone
        <Input name="phone" type="tel" required autoComplete="tel" maxLength={30} className={field} />
      </Label>
      <Label>
        Suburb
        <Input
          name="suburb"
          required
          autoComplete="address-level2"
          maxLength={200}
          defaultValue={siteAddress?.suburb || ""}
          className={field}
        />
      </Label>
      <Label>
        {messageLabel}
        <Textarea name="message" required maxLength={5000} defaultValue={initialMessage} className={field} />
      </Label>
      <p className="text-xs text-muted">
        VINCONNECT uses your details to respond to this enquiry. No marketing subscription is required.{" "}
        <Link to="/privacy" className="underline">
          Privacy information
        </Link>
        .
      </p>
      <Button type="submit" disabled={status === "done" || status === "saving"}>
        {status === "saving" ? "Sending…" : buttonLabel}
      </Button>
      {status === "done" && (
        <p className="text-sm text-ok">
          {emailed
            ? "Thanks. That enquiry is saved and VINCONNECT has been emailed."
            : "Thanks. The enquiry is saved. If you do not hear back shortly, call 0408 559 555."}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm text-danger">
          {error} Call <a href={PHONE_TEL}>{PHONE}</a> for help.
        </p>
      )}
    </form>
  );
}
