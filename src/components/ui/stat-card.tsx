import { cn } from "@/lib/utils/cn";
import { Card } from "./card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "flat";
  trendValue?: string;
  className?: string;
}

export function StatCard({ label, value, trend, trendValue, className }: StatCardProps) {
  return (
    <Card className={cn("p-4", className)}>
      <p className="text-xs font-medium text-text-muted uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      {trend && (
        <div
          className={cn(
            "mt-1 flex items-center gap-1 text-xs font-medium",
            trend === "up" && "text-success",
            trend === "down" && "text-danger",
            trend === "flat" && "text-text-muted"
          )}
        >
          {trend === "up" && <TrendingUp className="h-3 w-3" />}
          {trend === "down" && <TrendingDown className="h-3 w-3" />}
          {trend === "flat" && <Minus className="h-3 w-3" />}
          {trendValue && <span>{trendValue}</span>}
        </div>
      )}
    </Card>
  );
}
