"use client";

import { cn } from "@/lib/utils/cn";
import { Card } from "./card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

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
      <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{label}</p>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-1.5 font-heading text-2xl font-bold tabular-nums"
      >
        {value}
      </motion.p>
      {trend && (
        <div
          className={cn(
            "mt-1.5 flex items-center gap-1 text-xs font-medium",
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
