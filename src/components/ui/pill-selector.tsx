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
            "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            value === option.value
              ? "bg-brand text-white"
              : "bg-surface text-text-secondary hover:text-text"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
