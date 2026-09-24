import { createServerFn } from "@tanstack/react-start";
import type { Submission } from "./submissions.server";

export type { Submission };

export const findQuote = createServerFn({ method: "POST" })
  .validator((input: { code?: string; email?: string; address?: string }) => input)
  .handler(async ({ data }) => {
    const { findSubmission } = await import("./submissions.server");
    const row = await findSubmission(data);
    if (!row || row.kind !== "quote") return { found: false as const };
    return { found: true as const, quote: row };
  });

export const listQuotes = createServerFn({ method: "POST" })
  .validator((input: { password: string }) => input)
  .handler(async ({ data }) => {
    const { listSubmissions } = await import("./submissions.server");
    return listSubmissions(data.password);
  });
