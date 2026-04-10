"use client";

import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface BottomNavProps {
  items: NavItem[];
}

export function BottomNav({ items }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-md safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1.5">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 rounded-[--radius-md] px-3 py-1.5 text-[11px] font-medium transition-colors min-w-[56px]",
                isActive
                  ? "text-brand"
                  : "text-text-muted hover:text-text-secondary"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_6px_rgba(192,25,46,0.4)]")} strokeWidth={isActive ? 2 : 1.5} />
              <span>{item.label}</span>
              {isActive && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -bottom-1.5 h-[3px] w-4 rounded-full bg-brand shadow-[0_0_8px_rgba(192,25,46,0.5)]"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
