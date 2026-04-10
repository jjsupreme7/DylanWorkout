"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { Dumbbell, Flame, Trophy, Calendar, ClipboardCheck, ArrowRight } from "lucide-react";
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
    <div className="space-y-5">
      {/* Today's workout */}
      <Card elevated className="hero-gradient border-t-2 border-t-brand/40">
        <div className="relative">
          <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">Today</p>
          {hasProgram ? (
            <>
              <CardTitle className="mt-1.5">Today&apos;s Workout</CardTitle>
              <p className="mt-1 text-sm text-text-secondary">Your program is ready — time to train.</p>
              <Link href="/client/workout">
                <Button className="mt-4 group" size="md">
                  <Dumbbell className="h-4 w-4" strokeWidth={1.5} />
                  Start Workout
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <CardTitle className="mt-1.5">No Program Assigned</CardTitle>
              <p className="mt-1 text-sm text-text-secondary">
                Your coach hasn&apos;t assigned a program yet. Check back soon.
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
          <div className="rounded-[--radius-md] bg-brand-muted p-2.5">
            <Flame className="h-5 w-5 text-brand" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[11px] text-text-muted">Best Streak</p>
            <p className="font-heading text-lg font-bold">{workoutStreak?.longest_streak ?? 0}</p>
          </div>
        </Card>
        <Link href="/client/checkin">
          <Card interactive className="p-4 flex items-center gap-3 h-full">
            <div className="rounded-[--radius-md] bg-gold-muted p-2.5">
              <ClipboardCheck className="h-5 w-5 text-gold" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[11px] text-text-muted">Check-in</p>
              <p className="text-sm font-medium">
                {data.lastCheckin ? formatDate(data.lastCheckin.submitted_at) : "Due now"}
              </p>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent PRs */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading text-base font-semibold">Recent PRs</h2>
          <Link href="/client/progress" className="text-xs font-medium text-brand hover:text-brand-hover transition-colors">
            View all
          </Link>
        </div>
        {data.recentPRs.length > 0 ? (
          <div className="space-y-2">
            {data.recentPRs.map((pr) => (
              <Card key={pr.id} className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gold-muted flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium font-mono tabular-nums">{pr.weight} {pr.weight_unit}</p>
                    <p className="text-[11px] text-text-muted">{pr.reps} reps</p>
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
            description="Complete your first workout to start tracking personal records"
          />
        )}
      </div>

      {/* Recent Sessions */}
      <div>
        <h2 className="font-heading text-base font-semibold mb-3">Recent Sessions</h2>
        {data.recentSessions.length > 0 ? (
          <div className="space-y-2">
            {data.recentSessions.slice(0, 5).map((session) => (
              <Card key={session.id} className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-surface flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-text-muted" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{formatDate(session.started_at)}</p>
                    <p className="text-[11px] text-text-muted">
                      {session.duration_minutes ? formatDuration(session.duration_minutes) : "In progress"}
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
