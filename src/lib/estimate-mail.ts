import { createServerFn } from "@tanstack/react-start";

export const emailEstimate = createServerFn({ method: "POST" })
  .validator(
    (input: { to: string; subject: string; html: string; pdfBase64: string; filename: string }) => input,
  )
  .handler(async ({ data }) => {
    const { sendBrandedEstimate } = await import("./estimate-mail.server");
    return sendBrandedEstimate(data);
  });
