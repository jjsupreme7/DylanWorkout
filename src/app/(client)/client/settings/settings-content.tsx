"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { signOut } from "@/lib/actions/auth";
import {
  User,
  CreditCard,
  Bell,
  LogOut,
  ChevronRight,
  Shield,
} from "lucide-react";
import Link from "next/link";
import type { Tables } from "@/lib/types/database";

interface SettingsContentProps {
  profile: Tables<"profiles"> | null;
  subscription: Tables<"subscriptions"> | null;
}

export function SettingsContent({ profile, subscription }: SettingsContentProps) {
  return (
    <div className="space-y-6">
      {/* Profile header */}
      {profile && (
        <div className="flex items-center gap-4">
          <Avatar src={profile.avatar_url} name={profile.full_name} size="xl" />
          <div>
            <h1 className="font-heading text-xl font-bold">{profile.full_name}</h1>
            <p className="text-sm text-text-secondary">{profile.email}</p>
          </div>
        </div>
      )}

      {/* Settings sections */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider px-1 mb-3">Account</p>

        <Link href="/client/settings/profile">
          <Card interactive className="p-4 flex items-center gap-3">
            <div className="rounded-[--radius-md] bg-surface p-2.5">
              <User className="h-5 w-5 text-text-secondary" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Edit Profile</p>
              <p className="text-[11px] text-text-muted">Name, photo, timezone</p>
            </div>
            <ChevronRight className="h-4 w-4 text-text-muted" strokeWidth={1.5} />
          </Card>
        </Link>

        <Link href="/client/subscription">
          <Card interactive className="p-4 flex items-center gap-3">
            <div className="rounded-[--radius-md] bg-brand-muted p-2.5">
              <CreditCard className="h-5 w-5 text-brand" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Manage Subscription</p>
              <p className="text-[11px] text-text-muted">
                {subscription?.status === "active"
                  ? `${subscription.plan_name} — Active`
                  : "View plans & billing"}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-text-muted" strokeWidth={1.5} />
          </Card>
        </Link>

        <Link href="/client/notifications">
          <Card interactive className="p-4 flex items-center gap-3">
            <div className="rounded-[--radius-md] bg-surface p-2.5">
              <Bell className="h-5 w-5 text-text-secondary" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Notifications</p>
              <p className="text-[11px] text-text-muted">Reminders & alerts</p>
            </div>
            <ChevronRight className="h-4 w-4 text-text-muted" strokeWidth={1.5} />
          </Card>
        </Link>

        <Link href="/client/settings/privacy">
          <Card interactive className="p-4 flex items-center gap-3">
            <div className="rounded-[--radius-md] bg-surface p-2.5">
              <Shield className="h-5 w-5 text-text-secondary" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Privacy & Security</p>
              <p className="text-[11px] text-text-muted">Password, data</p>
            </div>
            <ChevronRight className="h-4 w-4 text-text-muted" strokeWidth={1.5} />
          </Card>
        </Link>
      </div>

      {/* Logout */}
      <form action={signOut}>
        <Button variant="danger" className="w-full" size="lg">
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          Sign Out
        </Button>
      </form>

      <p className="text-center text-[11px] text-text-muted">
        Enter the Dragon v1.0
      </p>
    </div>
  );
}
