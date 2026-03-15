"use client";

import { BottomNav } from "@/components/ui/bottom-nav";
import { Avatar } from "@/components/ui/avatar";
import { Bell, Dumbbell, Home, LineChart, Apple, Users } from "lucide-react";
import Link from "next/link";
import type { Tables } from "@/lib/types/database";

const navItems = [
  { href: "/client/dashboard", label: "Home", icon: Home },
  { href: "/client/workout", label: "Workout", icon: Dumbbell },
  { href: "/client/nutrition", label: "Nutrition", icon: Apple },
  { href: "/client/progress", label: "Progress", icon: LineChart },
  { href: "/client/community", label: "Community", icon: Users },
];

interface ClientShellProps {
  profile: Tables<"profiles">;
  children: React.ReactNode;
}

export function ClientShell({ profile, children }: ClientShellProps) {
  return (
    <div className="min-h-screen pb-20">
      {/* Top header */}
      <header className="sticky top-0 z-30 border-b border-border bg-bg/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar src={profile.avatar_url} name={profile.full_name} size="sm" />
            <div>
              <p className="text-sm font-medium">{profile.full_name}</p>
              <p className="text-xs text-text-muted">Client</p>
            </div>
          </div>
          <Link
            href="/client/notifications"
            className="relative rounded-lg p-2 hover:bg-surface transition-colors"
          >
            <Bell className="h-5 w-5 text-text-secondary" />
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main className="px-4 py-4">{children}</main>

      {/* Bottom nav */}
      <BottomNav items={navItems} />
    </div>
  );
}
