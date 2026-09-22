import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-md border border-line bg-raised px-3 py-2.5 text-base text-fg placeholder:text-muted",
        "focus:border-mint focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
