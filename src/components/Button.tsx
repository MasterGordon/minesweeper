import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../lib/utils";

const buttonVariants = cva("font-semibold py-2 px-4 rounded-md flex gap-2", {
  variants: {
    variant: {
      default: "bg-gray-900 text-white/95",
      ghost: "bg-transparent text-white/95 hover:bg-white/05",
      outline:
        "bg-transparent text-white/95 hover:bg-white/05 border-white/10 border-1",
      primary:
        "[background:var(--bg-brand)] text-white/95 hover:bg-white/05 hover:animate-gradientmove",
    },
    size: {
      default: "h-10 py-2 px-4",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    as?: React.FC;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, as: Comp = "button" as const, ...props },
    ref,
  ) => {
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
