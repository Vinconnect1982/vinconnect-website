import { createServerFn } from "@tanstack/react-start";
import type { PipelineStage, QuoteStatus, Submission } from "./submissions.server";

export type { PipelineStage, Submission };

export const PIPELINE: { id: PipelineStage; label: string }[] = [
  { id: "new", label: "New" },
  { id: "awaiting", label: "Awaiting information" },
  { id: "ready", label: "Ready to quote" },
  { id: "quoted", label: "Quoted" },
  { id: "followup", label: "Follow-up" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Lost" },
  { id: "closed", label: "Closed" },
];

export function stageOf(row: { status?: string; stage?: string }): PipelineStage {
  if (PIPELINE.some((item) => item.id === row.stage)) return row.stage as PipelineStage;
  if (row.status === "won") return "won";
  if (row.status === "lost") return "lost";
  return "new";
}

export const findQuote = createServerFn({ method: "POST" })
  .validator((input: { code?: string; email?: string; address?: string }) => input)
  .handler(async ({ data }) => {
    const { findSubmission, publicQuote } = await import("./submissions.server");
    const row = await findSubmission(data);
    if (!row || row.kind !== "quote") return { found: false as const };
    return { found: true as const, quote: publicQuote(row) };
  });

export const openQuoteLink = createServerFn({ method: "POST" })
  .validator((token: string) => token)
  .handler(async ({ data }) => {
    const { findByToken, publicQuote } = await import("./submissions.server");
    const row = await findByToken(data);
    if (!row) return { found: false as const };
    return { found: true as const, quote: publicQuote(row) };
  });

export const uploadQuotePhoto = createServerFn({ method: "POST" })
  .validator((input: { token: string; name: string; type: string; base64: string }) => input)
  .handler(async ({ data }) => {
    const { addQuotePhoto } = await import("./submissions.server");
    const photoCount = await addQuotePhoto(data.token, data);
    return { photoCount };
  });

export const signInWithGoogle = createServerFn({ method: "POST" })
  .validator((idToken: string) => idToken)
  .handler(async ({ data }) => {
    const { signInWithGoogle: verify } = await import("./admin-auth.server");
    return verify(data);
  });

export const listQuotes = createServerFn({ method: "POST" })
  .validator((input: { password: string }) => input)
  .handler(async ({ data }) => {
    const { listSubmissions } = await import("./submissions.server");
    return listSubmissions(data.password);
  });

export const setQuote = createServerFn({ method: "POST" })
  .validator((input: { password: string; id: string; status?: QuoteStatus; stage?: PipelineStage; note?: string; name?: string; email?: string; phone?: string; followUpOn?: string; hasKit?: boolean; lostReason?: string }) => input)
  .handler(async ({ data }) => {
    const { updateQuote } = await import("./submissions.server");
    const { password, id, ...patch } = data;
    return updateQuote(password, id, patch);
  });

export const removeQuote = createServerFn({ method: "POST" })
  .validator((input: { password: string; id: string }) => input)
  .handler(async ({ data }) => {
    const { purgeQuote } = await import("./submissions.server");
    await purgeQuote(data.password, data.id);
    return { ok: true as const };
  });

export const resendSavedQuote = createServerFn({ method: "POST" })
  .validator((input: { password: string; id: string }) => input)
  .handler(async ({ data }) => {
    const { resendQuote } = await import("./submissions.server");
    return resendQuote(data.password, data.id);
  });

export const sendReferral = createServerFn({ method: "POST" })
  .validator((input: { password: string; id: string }) => input)
  .handler(async ({ data }) => {
    const { sendReferralOffer } = await import("./submissions.server");
    return sendReferralOffer(data.password, data.id);
  });

export const followSavedQuote = createServerFn({ method: "POST" })
  .validator((input: { password: string; id: string }) => input)
  .handler(async ({ data }) => {
    const { followUpQuote } = await import("./submissions.server");
    const emailed = await followUpQuote(data.password, data.id);
    return { emailed };
  });
