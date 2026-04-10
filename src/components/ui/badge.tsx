import { cn } from "@/lib/utils/cn";

type BadgeVariant = "default" | "active" | "pending" | "attention" | "success" | "danger";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface text-text-secondary border-border",
  active: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  attention: "bg-brand-muted text-brand border-brand/20",
  success: "bg-success/10 text-success border-success/20",
  danger: "bg-danger/10 text-danger border-danger/20",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[--radius-full] border px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
