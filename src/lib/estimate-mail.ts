import { createServerFn } from "@tanstack/react-start";
import type { EstimateMailInput } from "./estimate-mail.server";

export const emailEstimate = createServerFn({ method: "POST" })
  .validator((input: EstimateMailInput) => {
    const email = input.email?.trim() ?? "";
    if (!input.name?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Add your name and email so we can send the estimate.");
    }
    return { ...input, email };
  })
  .handler(async ({ data }) => {
    const { sendBrandedEstimate } = await import("./estimate-mail.server");
    return sendBrandedEstimate(data);
  });
