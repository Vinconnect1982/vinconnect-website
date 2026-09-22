import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-display font-medium transition-[transform,background-color,color,border-color,opacity] duration-150 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-mint text-ink hover:bg-mint-deep",
        paper: "bg-paper text-ink-fg hover:bg-paper-2",
        ember: "bg-ember text-paper hover:opacity-90",
        ghost:
          "border border-line bg-transparent text-fg hover:border-mint hover:text-mint",
        ink: "border border-line-ink bg-transparent text-ink-fg hover:bg-ink-fg hover:text-paper",
        link: "rounded-none px-0 text-mint underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 min-h-10 px-4 text-sm",
        md: "h-11 min-h-11 px-5 text-sm",
        lg: "h-12 min-h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
