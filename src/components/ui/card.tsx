import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevated, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[--radius-xl] border border-border bg-card p-5",
        elevated && "shadow-[--shadow-elevated]",
        interactive &&
          "hover:border-brand/25 hover:shadow-[0_0_20px_rgba(192,25,46,0.06)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer",
        className
      )}
      {...props}
    />
  )
);

Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mb-4", className)} {...props} />
  )
);

CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-heading text-lg font-semibold text-text", className)}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";
