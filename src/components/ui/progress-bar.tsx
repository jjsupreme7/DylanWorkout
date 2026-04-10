import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: "brand" | "success" | "warning" | "danger" | "gold";
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

const colorStyles: Record<string, string> = {
  brand: "bg-brand",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  gold: "bg-gold",
};

export function ProgressBar({
  value,
  max = 100,
  color = "brand",
  size = "md",
  showLabel,
  className,
}: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex-1 rounded-[--radius-full] bg-surface overflow-hidden",
          size === "sm" ? "h-1.5" : "h-2.5"
        )}
      >
        <div
          className={cn(
            "h-full rounded-[--radius-full] transition-all duration-500 ease-out",
            colorStyles[color]
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium font-mono tabular-nums text-text-secondary min-w-[3ch] text-right">
          {Math.round(percent)}%
        </span>
      )}
    </div>
  );
}
