"use client";

import { BottomNav } from "@/components/ui/bottom-nav";
import { Avatar } from "@/components/ui/avatar";
import { Bell, Dumbbell, Home, LineChart, BookOpen, LogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/lib/actions/auth";
import type { Tables } from "@/lib/types/database";

const navItems = [
  { href: "/client/dashboard", label: "Home", icon: Home },
  { href: "/client/workout", label: "Workout", icon: Dumbbell },
  { href: "/client/progress", label: "Progress", icon: LineChart },
  { href: "/client/learn", label: "Learn", icon: BookOpen },
];

interface ClientShellProps {
  profile: Tables<"profiles">;
  children: React.ReactNode;
}

export function ClientShell({ profile, children }: ClientShellProps) {
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
          <div className="flex items-center gap-1">
            <Link
              href="/client/notifications"
              className="relative rounded-[--radius-md] p-2.5 hover:bg-surface transition-colors"
            >
              <Bell className="h-5 w-5 text-text-secondary" strokeWidth={1.5} />
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-[--radius-md] p-2.5 hover:bg-surface transition-colors"
              >
                <LogOut className="h-5 w-5 text-text-secondary" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="px-4 py-5">{children}</main>

      {/* Bottom nav */}
      <BottomNav items={navItems} />
    </div>
  );
}
