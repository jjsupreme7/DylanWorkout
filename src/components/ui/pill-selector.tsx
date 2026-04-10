"use client";

import { cn } from "@/lib/utils/cn";

interface PillSelectorProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function PillSelector<T extends string>({
  options,
  value,
  onChange,
  className,
}: PillSelectorProps<T>) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-1 scrollbar-hide", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "shrink-0 rounded-[--radius-full] px-4 py-1.5 text-sm font-medium transition-all duration-150",
            value === option.value
              ? "bg-brand text-white shadow-[0_0_12px_rgba(192,25,46,0.2)]"
              : "bg-surface text-text-secondary hover:text-text hover:bg-surface-hover"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
