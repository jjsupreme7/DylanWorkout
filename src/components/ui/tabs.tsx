"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab: controlledActive, onChange, className }: TabsProps) {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id);
  const activeTab = controlledActive ?? internalActive;

  return (
    <div className={cn("flex gap-1 rounded-[--radius-lg] bg-surface/60 p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setInternalActive(tab.id);
            onChange?.(tab.id);
          }}
          className={cn(
            "relative flex-1 px-4 py-2 text-sm font-medium transition-colors rounded-[--radius-md]",
            activeTab === tab.id ? "text-text" : "text-text-muted hover:text-text-secondary"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="tab-pill"
              className="absolute inset-0 rounded-[--radius-md] bg-card border border-brand/20 shadow-[0_0_12px_rgba(192,25,46,0.08)]"
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
