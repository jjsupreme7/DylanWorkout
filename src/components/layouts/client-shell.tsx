"use client";

import { BottomNav } from "@/components/ui/bottom-nav";
import { Avatar } from "@/components/ui/avatar";
import { Bell, Dumbbell, Home, LineChart, BookOpen, Settings } from "lucide-react";
import Link from "next/link";
import type { Tables } from "@/lib/types/database";

const navItems = [
  { href: "/client/dashboard", label: "Home", icon: Home },
  { href: "/client/workout", label: "Workout", icon: Dumbbell },
  { href: "/client/progress", label: "Progress", icon: LineChart },
  { href: "/client/learn", label: "Learn", icon: BookOpen },
  { href: "/client/settings", label: "Settings", icon: Settings },
];

interface ClientShellProps {
  profile: Tables<"profiles">;
  unreadCount?: number;
  children: React.ReactNode;
}

export function ClientShell({ profile, unreadCount = 0, children }: ClientShellProps) {
  return (
    <div className="min-h-[100dvh] pb-20">
      {/* Top header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-bg/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar src={profile.avatar_url} name={profile.full_name} size="sm" />
            <div>
              <p className="font-heading text-sm font-semibold">{profile.full_name}</p>
              <p className="text-[11px] text-text-muted">Client</p>
            </div>
          </div>
          <Link
            href="/client/notifications"
            className="relative rounded-[--radius-md] p-2.5 hover:bg-surface transition-colors"
          >
            <Bell className="h-5 w-5 text-text-secondary" strokeWidth={1.5} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main className="px-4 py-5">{children}</main>

      {/* Bottom nav */}
      <BottomNav items={navItems} />
    </div>
  );
}
