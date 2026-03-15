"use client";

import { useState, useRef } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Select } from "@/components/ui/select";
import { Trophy, TrendingUp, Ruler, Camera, Plus, Loader2 } from "lucide-react";
import { formatDate, formatWeight } from "@/lib/utils/format";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Tables } from "@/lib/types/database";

const tabs = [
  { id: "strength", label: "Strength" },
  { id: "body", label: "Body" },
  { id: "photos", label: "Photos" },
];

interface PR extends Tables<"personal_records"> {
  exercise: { name: string; muscle_group: string | null } | null;
}

interface ProgressContentProps {
  prs: PR[];
  streaks: Tables<"streaks">[];
  sessions: Tables<"workout_sessions">[];
  bodyMeasurements: Tables<"body_measurements">[];
  exerciseHistory: any[];
  userId: string;
}

export function ProgressContent({
  prs,
  streaks,
  sessions,
  bodyMeasurements,
  exerciseHistory,
  userId,
}: ProgressContentProps) {
  const [activeTab, setActiveTab] = useState("strength");
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const [showAddMeasurement, setShowAddMeasurement] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const workoutStreak = streaks.find((s) => s.streak_type === "workout");
  const totalPRs = prs.length;

  // Group PRs by exercise
  const prsByExercise = prs.reduce<Record<string, PR[]>>((acc, pr) => {
    const name = pr.exercise?.name ?? "Unknown";
    if (!acc[name]) acc[name] = [];
    acc[name].push(pr);
    return acc;
  }, {});

  // Build exercise strength data for charts
  const exerciseNames = [...new Set(exerciseHistory.map((l: any) => l.exercise?.name).filter(Boolean))];
  const currentExercise = selectedExercise || exerciseNames[0] || "";

  const strengthChartData = exerciseHistory
    .filter((l: any) => l.exercise?.name === currentExercise && l.weight)
    .reduce<{ date: string; weight: number; reps: number }[]>((acc, log: any) => {
      const date = format(new Date(log.session?.started_at || log.created_at), "MMM d");
      // Keep the heaviest set per session date
      const existing = acc.find((d) => d.date === date);
      if (existing) {
        if (log.weight > existing.weight) {
          existing.weight = log.weight;
          existing.reps = log.reps ?? 0;
        }
      } else {
        acc.push({ date, weight: log.weight, reps: log.reps ?? 0 });
      }
      return acc;
    }, []);

  // Body weight chart data
  const weightChartData = bodyMeasurements
    .filter((m) => m.weight)
    .map((m) => ({
      date: format(new Date(m.measured_at), "MMM d"),
      weight: m.weight,
    }));

  async function handleAddMeasurement(formData: FormData) {
    setSaving(true);
    const supabase = createClient();

    const { error } = await supabase.from("body_measurements").insert({
      client_id: userId,
      weight: parseFloat(formData.get("weight") as string) || null,
      body_fat_pct: parseFloat(formData.get("body_fat_pct") as string) || null,
      chest: parseFloat(formData.get("chest") as string) || null,
      waist: parseFloat(formData.get("waist") as string) || null,
      bicep: parseFloat(formData.get("bicep") as string) || null,
      thigh: parseFloat(formData.get("thigh") as string) || null,
    } as any);

    if (!error) {
      toast.success("Measurements logged!");
      setShowAddMeasurement(false);
      router.refresh();
    } else {
      toast.error("Failed to save measurements");
    }
    setSaving(false);
  }

  const latestMeasurement = bodyMeasurements[bodyMeasurements.length - 1];
  const previousMeasurement = bodyMeasurements.length > 1 ? bodyMeasurements[bodyMeasurements.length - 2] : null;

  function weightDiff() {
    if (!latestMeasurement?.weight || !previousMeasurement?.weight) return null;
    const diff = latestMeasurement.weight - previousMeasurement.weight;
    return diff;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Progress</h1>
        <div className="flex items-center gap-2">
          <Badge variant="default">{totalPRs} PRs</Badge>
          <Badge variant="default">{workoutStreak?.current_streak ?? 0}d streak</Badge>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* STRENGTH TAB */}
      {activeTab === "strength" && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Total PRs" value={totalPRs} />
            <StatCard label="Sessions" value={sessions.length} />
            <StatCard label="Exercises" value={exerciseNames.length} />
          </div>

          {/* Strength Chart */}
          {exerciseNames.length > 0 && (
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <CardTitle className="text-base">Strength Progression</CardTitle>
              </div>
              <Select
                value={currentExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                options={exerciseNames.map((name) => ({ value: name, label: name }))}
              />
              {strengthChartData.length > 1 ? (
                <div className="mt-4 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={strengthChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2e1a20" />
                      <XAxis dataKey="date" tick={{ fill: "#6b4f55", fontSize: 11 }} />
                      <YAxis tick={{ fill: "#6b4f55", fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#160a0d",
                          border: "1px solid #2e1a20",
                          borderRadius: "8px",
                          color: "#f8ecee",
                          fontSize: 12,
                        }}
                        formatter={(value: any) => [`${value} lbs`, "Weight"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#c0192e"
                        strokeWidth={2}
                        dot={{ fill: "#c0192e", r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-xs text-text-muted mt-3 text-center py-6">
                  Log more sessions to see your strength progression
                </p>
              )}
            </Card>
          )}

          {/* PRs by Exercise */}
          <div>
            <h2 className="text-base font-semibold mb-3">Personal Records</h2>
            {Object.keys(prsByExercise).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(prsByExercise).map(([name, exercisePRs]) => (
                  <Card key={name} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-sm">{name}</CardTitle>
                      <Badge variant="default">{exercisePRs[0]?.exercise?.muscle_group}</Badge>
                    </div>
                    <div className="space-y-1.5">
                      {exercisePRs.slice(0, 3).map((pr) => (
                        <div key={pr.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-3.5 w-3.5 text-gold" />
                            <span className="font-medium">
                              {formatWeight(pr.weight ?? 0, pr.weight_unit)}
                            </span>
                            <span className="text-text-muted">x{pr.reps}</span>
                          </div>
                          <span className="text-text-muted text-xs">{formatDate(pr.achieved_at)}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Trophy}
                title="No PRs yet"
                description="Hit the gym and crush some weight. PRs are auto-detected."
              />
            )}
          </div>
        </div>
      )}

      {/* BODY TAB */}
      {activeTab === "body" && (
        <div className="space-y-4">
          {/* Current Stats */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Body Measurements</h2>
            <Button size="sm" onClick={() => setShowAddMeasurement(true)}>
              <Plus className="h-4 w-4" />
              Log
            </Button>
          </div>

          {latestMeasurement ? (
            <>
              <div className="grid grid-cols-3 gap-3">
                <StatCard
                  label="Bodyweight"
                  value={latestMeasurement.weight ? `${latestMeasurement.weight}` : "—"}
                  trend={weightDiff() !== null ? (weightDiff()! > 0 ? "up" : weightDiff()! < 0 ? "down" : "flat") : "flat"}
                  trendValue={weightDiff() !== null ? `${weightDiff()! > 0 ? "+" : ""}${weightDiff()!.toFixed(1)} lbs` : undefined}
                />
                <StatCard
                  label="Body Fat"
                  value={latestMeasurement.body_fat_pct ? `${latestMeasurement.body_fat_pct}%` : "—"}
                />
                <StatCard
                  label="Arms"
                  value={latestMeasurement.bicep ? `${latestMeasurement.bicep}"` : "—"}
                />
              </div>

              {/* Detail measurements */}
              <Card className="p-4">
                <CardTitle className="text-sm mb-3">Latest — {formatDate(latestMeasurement.measured_at)}</CardTitle>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {latestMeasurement.chest && (
                    <div>
                      <p className="text-text-muted text-xs">Chest</p>
                      <p className="font-medium">{latestMeasurement.chest}&quot;</p>
                    </div>
                  )}
                  {latestMeasurement.waist && (
                    <div>
                      <p className="text-text-muted text-xs">Waist</p>
                      <p className="font-medium">{latestMeasurement.waist}&quot;</p>
                    </div>
                  )}
                  {latestMeasurement.bicep && (
                    <div>
                      <p className="text-text-muted text-xs">Arms</p>
                      <p className="font-medium">{latestMeasurement.bicep}&quot;</p>
                    </div>
                  )}
                  {latestMeasurement.thigh && (
                    <div>
                      <p className="text-text-muted text-xs">Thighs</p>
                      <p className="font-medium">{latestMeasurement.thigh}&quot;</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Weight Chart */}
              {weightChartData.length > 1 && (
                <Card className="p-4">
                  <CardTitle className="text-base mb-3">Bodyweight Trend</CardTitle>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weightChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2e1a20" />
                        <XAxis dataKey="date" tick={{ fill: "#6b4f55", fontSize: 11 }} />
                        <YAxis
                          domain={["dataMin - 5", "dataMax + 5"]}
                          tick={{ fill: "#6b4f55", fontSize: 11 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#160a0d",
                            border: "1px solid #2e1a20",
                            borderRadius: "8px",
                            color: "#f8ecee",
                            fontSize: 12,
                          }}
                          formatter={(value: any) => [`${value} lbs`, "Weight"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="weight"
                          stroke="#d4a017"
                          strokeWidth={2}
                          dot={{ fill: "#d4a017", r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}

              {/* History */}
              {bodyMeasurements.length > 1 && (
                <div>
                  <h2 className="text-sm font-semibold mb-2">History</h2>
                  <div className="space-y-2">
                    {[...bodyMeasurements].reverse().slice(0, 10).map((m) => (
                      <Card key={m.id} className="p-3 flex items-center justify-between text-sm">
                        <span className="text-text-secondary">{formatDate(m.measured_at)}</span>
                        <div className="flex items-center gap-3">
                          {m.weight && <span>{m.weight} lbs</span>}
                          {m.body_fat_pct && <span className="text-text-muted">{m.body_fat_pct}% bf</span>}
                          {m.bicep && <span className="text-text-muted">{m.bicep}&quot; arms</span>}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              icon={Ruler}
              title="No measurements yet"
              description="Log your bodyweight and measurements to track your gains"
              actionLabel="Log Measurements"
              onAction={() => setShowAddMeasurement(true)}
            />
          )}

          {/* Add Measurement Modal */}
          <Modal open={showAddMeasurement} onClose={() => setShowAddMeasurement(false)} title="Log Measurements">
            <form action={handleAddMeasurement} className="space-y-3">
              <Input name="weight" label="Bodyweight (lbs)" type="number" step="0.1" inputMode="decimal" placeholder="185.0" />
              <Input name="body_fat_pct" label="Body Fat %" type="number" step="0.1" inputMode="decimal" placeholder="15.0" />
              <div className="grid grid-cols-2 gap-3">
                <Input name="chest" label="Chest (in)" type="number" step="0.25" inputMode="decimal" placeholder="42" />
                <Input name="waist" label="Waist (in)" type="number" step="0.25" inputMode="decimal" placeholder="32" />
                <Input name="bicep" label="Arms (in)" type="number" step="0.25" inputMode="decimal" placeholder="16" />
                <Input name="thigh" label="Thighs (in)" type="number" step="0.25" inputMode="decimal" placeholder="24" />
              </div>
              <Button type="submit" loading={saving} className="w-full">
                Save Measurements
              </Button>
            </form>
          </Modal>
        </div>
      )}

      {/* PHOTOS TAB */}
      {activeTab === "photos" && (
        <div className="space-y-4">
          <EmptyState
            icon={Camera}
            title="Progress Photos"
            description="Upload front, side, and back photos to visually track your physique over time. Coming soon."
          />
        </div>
      )}
    </div>
  );
}
