import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      suppressHydrationWarning
      className={cn(
        "h-11 min-h-11 w-full rounded-md border border-line bg-raised px-3 text-base text-fg placeholder:text-muted",
        "focus:border-mint focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
