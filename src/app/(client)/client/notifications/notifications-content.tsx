"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Bell, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { Tables } from "@/lib/types/database";

interface NotificationsContentProps {
  notifications: Tables<"notifications">[];
}

function formatTimestamp(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function NotificationsContent({ notifications: initialNotifications }: NotificationsContentProps) {
  const [notifications, setNotifications] = useState(initialNotifications);

  async function markAsRead(id: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);

    if (error) {
      toast.error("Failed to mark as read");
      return;
    }

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-xl font-bold">Notifications</h1>
          <p className="text-sm text-text-secondary mt-1">
            Stay up to date with your training
          </p>
        </div>
        <EmptyState
          icon={Bell}
          title="No notifications yet"
          description="When your coach sends you updates or you hit milestones, they'll appear here."
        />
      </div>
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl font-bold">Notifications</h1>
          <p className="text-sm text-text-secondary mt-1">
            Stay up to date with your training
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="attention">{unreadCount} new</Badge>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 flex items-start gap-3 ${
              !notification.read ? "border-brand/20 bg-brand-muted/30" : ""
            }`}
          >
            <div
              className={`mt-0.5 rounded-[--radius-md] p-2.5 shrink-0 ${
                !notification.read ? "bg-brand-muted" : "bg-surface"
              }`}
            >
              <Bell
                className={`h-4 w-4 ${
                  !notification.read ? "text-brand" : "text-text-muted"
                }`}
                strokeWidth={1.5}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">
                  {notification.title}
                </p>
                {!notification.read && (
                  <span className="h-2 w-2 rounded-full bg-brand shrink-0" />
                )}
              </div>
              {notification.body && (
                <p className="text-[11px] text-text-secondary mt-0.5 line-clamp-2">
                  {notification.body}
                </p>
              )}
              <p className="text-[11px] text-text-muted mt-1">
                {formatTimestamp(notification.created_at)}
              </p>
            </div>

            {!notification.read && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="shrink-0 rounded-[--radius-md] p-2 text-text-muted hover:text-text hover:bg-surface transition-colors"
                title="Mark as read"
              >
                <Check className="h-4 w-4" strokeWidth={1.5} />
              </button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
