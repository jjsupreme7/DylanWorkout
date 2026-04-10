"use client";

import { cn } from "@/lib/utils/cn";
import { BottomNav } from "@/components/ui/bottom-nav";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Dumbbell,
  FileText,
  Settings,
  Sparkles,
  Zap,
} from "lucide-react";
import type { Tables } from "@/lib/types/database";

const sidebarItems = [
  { href: "/coach/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/coach/clients", label: "Clients", icon: Users },
  { href: "/coach/programs", label: "Programs", icon: ClipboardList },
  { href: "/coach/ai-builder", label: "AI Builder", icon: Sparkles },
  { href: "/coach/autoflow", label: "Autoflow", icon: Zap },
  { href: "/coach/library", label: "Exercise Library", icon: Dumbbell },
  { href: "/coach/applications", label: "Applications", icon: FileText },
  { href: "/coach/settings", label: "Settings", icon: Settings },
];

const mobileNavItems = [
  { href: "/coach/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/coach/clients", label: "Clients", icon: Users },
  { href: "/coach/programs", label: "Programs", icon: ClipboardList },
  { href: "/coach/ai-builder", label: "AI", icon: Sparkles },
  { href: "/coach/settings", label: "More", icon: Settings },
];

interface CoachShellProps {
  profile: Tables<"profiles">;
  children: React.ReactNode;
}

export function CoachShell({ profile, children }: CoachShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[100dvh]">
      {/* Sidebar — desktop only */}
      <aside className="hidden lg:flex lg:w-[260px] lg:flex-col lg:border-r lg:border-border/60 lg:bg-card/50">
        <div className="p-5 border-b border-border/60">
          <h1 className="font-heading text-base font-bold tracking-tight">
            ENTER THE <span className="text-brand">DRAGON</span>
          </h1>
          <p className="text-[11px] text-text-muted mt-1">Coach Portal</p>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {sidebarItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-[--radius-md] px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-brand-muted text-brand"
                    : "text-text-secondary hover:bg-surface hover:text-text"
                )}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={isActive ? 2 : 1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/60 p-4">
          <div className="flex items-center gap-3">
            <Avatar src={profile.avatar_url} name={profile.full_name} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{profile.full_name}</p>
              <p className="text-[11px] text-text-muted truncate">{profile.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 pb-20 lg:pb-0">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 border-b border-border/60 bg-bg/80 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="font-heading text-sm font-bold tracking-tight">
              ENTER THE <span className="text-brand">DRAGON</span>
            </h1>
            <Avatar src={profile.avatar_url} name={profile.full_name} size="sm" />
          </div>
        </header>

        <main className="p-4 lg:p-6">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden">
        <BottomNav items={mobileNavItems} />
      </div>
    </div>
  );
}
