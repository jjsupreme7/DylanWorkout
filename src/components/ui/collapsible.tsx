"use client";

import { cn } from "@/lib/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CollapsibleProps {
  open: boolean;
  onToggle: () => void;
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Collapsible({ open, onToggle, trigger, children, className }: CollapsibleProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left hover:bg-surface/50 transition-colors"
      >
        <div className="flex-1">{trigger}</div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-text-muted transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-border p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
