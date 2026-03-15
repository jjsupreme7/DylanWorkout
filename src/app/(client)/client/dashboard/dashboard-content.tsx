"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Dumbbell, Flame, Trophy, Calendar, ClipboardCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import { formatDate, formatDuration } from "@/lib/utils/format";
import type { Tables } from "@/lib/types/database";

interface DashboardContentProps {
  data: {
    recentSessions: Tables<"workout_sessions">[];
    streaks: Tables<"streaks">[];
    lastCheckin: Tables<"checkins"> | null;
    recentPRs: Tables<"personal_records">[];
    totalSessions: number;
  };
  program: unknown;
}

export function DashboardContent({ data, program }: DashboardContentProps) {
  const workoutStreak = data.streaks.find((s) => s.streak_type === "workout");
  const hasProgram = !!program;

  return (
    <div className="space-y-6">
      {/* Today's workout */}
      <Card elevated className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -translate-y-8 translate-x-8" />
        <div className="relative">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Today</p>
          {hasProgram ? (
            <>
              <CardTitle className="mt-1">Today&apos;s Workout</CardTitle>
              <p className="mt-1 text-sm text-text-secondary">Your program is ready</p>
              <Link href="/client/workout">
                <Button className="mt-4">
                  <Dumbbell className="h-4 w-4" />
                  Start Workout
                </Button>
              </Link>
            </>
          ) : (
            <>
              <CardTitle className="mt-1">No Program Assigned</CardTitle>
              <p className="mt-1 text-sm text-text-secondary">
                Your coach hasn&apos;t assigned a program yet.
              </p>
            </>
          )}
        </div>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Sessions"
          value={data.totalSessions}
          trend={data.totalSessions > 0 ? "up" : "flat"}
          trendValue="This month"
        />
        <StatCard
          label="Streak"
          value={`${workoutStreak?.current_streak ?? 0} days`}
          trend={workoutStreak && workoutStreak.current_streak > 0 ? "up" : "flat"}
        />
      </div>

      {/* Streak + Check-in row */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 flex items-center gap-3">
          <div className="rounded-lg bg-brand/10 p-2.5">
            <Flame className="h-5 w-5 text-brand" />
          </div>
          <div>
            <p className="text-xs text-text-muted">Best Streak</p>
            <p className="text-lg font-bold">{workoutStreak?.longest_streak ?? 0}</p>
          </div>
        </Card>
        <Link href="/client/checkin">
          <Card className="p-4 flex items-center gap-3 hover:border-brand/30 transition-colors cursor-pointer h-full">
            <div className="rounded-lg bg-gold/10 p-2.5">
              <ClipboardCheck className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Check-in</p>
              <p className="text-sm font-medium">
                {data.lastCheckin ? formatDate(data.lastCheckin.submitted_at) : "Due"}
              </p>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent PRs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">Recent PRs</h2>
          <Link href="/client/progress" className="text-xs text-brand hover:text-brand-hover transition-colors">
            View all
          </Link>
        </div>
        {data.recentPRs.length > 0 ? (
          <div className="space-y-2">
            {data.recentPRs.map((pr) => (
              <Card key={pr.id} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="h-4 w-4 text-gold" />
                  <div>
                    <p className="text-sm font-medium">{pr.weight} {pr.weight_unit}</p>
                    <p className="text-xs text-text-muted">{pr.reps} reps</p>
                  </div>
                </div>
                <Badge variant="success">PR</Badge>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Trophy}
            title="No PRs yet"
            description="Start logging workouts to track personal records"
          />
        )}
      </div>

      {/* Subscription CTA */}
      <Link href="/client/subscription">
        <Card className="p-4 flex items-center gap-3 hover:border-brand/30 transition-colors">
          <div className="rounded-lg bg-brand/10 p-2.5">
            <CreditCard className="h-5 w-5 text-brand" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Manage Subscription</p>
            <p className="text-xs text-text-muted">View plans & billing</p>
          </div>
        </Card>
      </Link>

      {/* Recent Sessions */}
      <div>
        <h2 className="text-base font-semibold mb-3">Recent Sessions</h2>
        {data.recentSessions.length > 0 ? (
          <div className="space-y-2">
            {data.recentSessions.slice(0, 5).map((session) => (
              <Card key={session.id} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-text-muted" />
                  <div>
                    <p className="text-sm font-medium">{formatDate(session.started_at)}</p>
                    <p className="text-xs text-text-muted">
                      {session.duration_minutes ? formatDuration(session.duration_minutes) : "—"}
                    </p>
                  </div>
                </div>
                {session.rating && (
                  <Badge variant="default">{session.rating}/10</Badge>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Dumbbell}
            title="No sessions yet"
            description="Complete your first workout to see it here"
          />
        )}
      </div>
    </div>
  );
}
