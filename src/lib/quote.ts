import { createServerFn } from "@tanstack/react-start";
import type { EstimateInput } from "./pricing";

export const quoteInstall = createServerFn({ method: "POST" })
  .validator((input: EstimateInput) => input)
  .handler(async ({ data }) => {
    const { priceEstimate } = await import("./pricing.server");
    return priceEstimate(data);
  });
