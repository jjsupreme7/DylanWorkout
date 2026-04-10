import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="mb-4 rounded-[--radius-xl] bg-surface p-4">
        <Icon className="h-7 w-7 text-text-muted" strokeWidth={1.5} />
      </div>
      <h3 className="font-heading text-base font-semibold">{title}</h3>
      {description && <p className="mt-1.5 text-sm text-text-secondary max-w-sm leading-relaxed">{description}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
