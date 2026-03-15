"use client";

import { useWorkoutStore } from "@/stores/workout-store";
import { useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Collapsible } from "@/components/ui/collapsible";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { PillSelector } from "@/components/ui/pill-selector";
import { Badge } from "@/components/ui/badge";
import { Timer, CheckCircle, Trophy, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

const RPE_OPTIONS = [6, 7, 8, 9, 10].map((v) => ({
  value: String(v),
  label: String(v),
}));

export default function ActiveWorkoutPage() {
  const params = useParams();
  const router = useRouter();
  const store = useWorkoutStore();
  const [showComplete, setShowComplete] = useState(false);
  const [rating, setRating] = useState("7");
  const [showPR, setShowPR] = useState(false);
  const [saving, setSaving] = useState(false);

  const { exercises, elapsed, isActive, tick, updateSet, toggleExercise } = store;

  useEffect(() => {
    if (!isActive) {
      router.push("/client/workout");
      return;
    }
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isActive, tick, router]);

  const formatTimer = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, []);

  const completedCount = exercises.filter((ex) => ex.sets.every((s) => s.completed)).length;
  const totalCount = exercises.length;

  async function handleComplete() {
    setSaving(true);
    const supabase = createClient();
    const sessionId = params.sessionId as string;

    // Save all exercise logs
    const logs = exercises.flatMap((ex) =>
      ex.sets
        .filter((s) => s.completed)
        .map((s, i) => ({
          session_id: sessionId,
          exercise_id: ex.exerciseId,
          set_number: i + 1,
          weight: s.weight ? parseFloat(s.weight) : null,
          reps: s.reps ? parseInt(s.reps) : null,
          rpe: s.rpe ? parseFloat(s.rpe) : null,
        }))
    );

    if (logs.length > 0) {
      await supabase.from("exercise_logs").insert(logs);
    }

    // Update session
    await supabase
      .from("workout_sessions")
      .update({
        status: "completed" as const,
        completed_at: new Date().toISOString(),
        duration_minutes: Math.floor(elapsed / 60),
        rating: parseInt(rating),
      })
      .eq("id", sessionId);

    store.resetSession();
    toast.success("Workout complete!");
    setSaving(false);
    router.push("/client/dashboard");
  }

  if (!isActive) return null;

  return (
    <div className="space-y-4">
      {/* Timer bar */}
      <Card className="p-3 flex items-center justify-between sticky top-16 z-20 bg-card/95 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-brand" />
          <span className="font-mono text-lg font-bold">{formatTimer(elapsed)}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-text-muted">
            {completedCount}/{totalCount}
          </span>
          <Button size="sm" variant="danger" onClick={() => setShowComplete(true)}>
            Finish
          </Button>
        </div>
      </Card>

      {/* Progress */}
      <ProgressBar value={completedCount} max={totalCount} color="brand" showLabel />

      {/* Exercise cards */}
      <div className="space-y-3">
        {exercises.map((exercise, exIdx) => {
          const allDone = exercise.sets.every((s) => s.completed);
          return (
            <Collapsible
              key={exIdx}
              open={exercise.expanded}
              onToggle={() => toggleExercise(exIdx)}
              trigger={
                <div className="flex items-center gap-3">
                  {allDone ? (
                    <CheckCircle className="h-5 w-5 text-success shrink-0" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-border shrink-0" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{exercise.exerciseName}</p>
                    <p className="text-xs text-text-muted">
                      {exercise.sets.filter((s) => s.completed).length}/{exercise.sets.length} sets
                    </p>
                  </div>
                </div>
              }
            >
              <div className="space-y-3">
                {/* Header row */}
                <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-2 text-xs text-text-muted px-1">
                  <span className="w-6">Set</span>
                  <span>Weight</span>
                  <span>Reps</span>
                  <span>RPE</span>
                  <span className="w-8" />
                </div>

                {exercise.sets.map((set, setIdx) => (
                  <div
                    key={setIdx}
                    className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-2 items-center"
                  >
                    <span className="w-6 text-center text-sm text-text-muted font-medium">
                      {setIdx + 1}
                    </span>
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="lbs"
                      value={set.weight}
                      onChange={(e) => updateSet(exIdx, setIdx, "weight", e.target.value)}
                      className="w-full rounded-lg border border-border bg-surface px-2 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-brand/50"
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="reps"
                      value={set.reps}
                      onChange={(e) => updateSet(exIdx, setIdx, "reps", e.target.value)}
                      className="w-full rounded-lg border border-border bg-surface px-2 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-brand/50"
                    />
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="RPE"
                      value={set.rpe}
                      onChange={(e) => updateSet(exIdx, setIdx, "rpe", e.target.value)}
                      className="w-full rounded-lg border border-border bg-surface px-2 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-brand/50"
                    />
                    <button
                      onClick={() => updateSet(exIdx, setIdx, "completed", !set.completed)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        set.completed
                          ? "bg-success/20 text-success"
                          : "bg-surface text-text-muted hover:text-text"
                      }`}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Collapsible>
          );
        })}
      </div>

      {/* Complete session modal */}
      <Modal open={showComplete} onClose={() => setShowComplete(false)} title="Complete Workout">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            How would you rate this session? ({completedCount}/{totalCount} exercises completed)
          </p>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Session Rating
            </label>
            <PillSelector
              options={Array.from({ length: 10 }, (_, i) => ({
                value: String(i + 1),
                label: String(i + 1),
              }))}
              value={rating}
              onChange={setRating}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowComplete(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleComplete} loading={saving} className="flex-1">
              Complete
            </Button>
          </div>
        </div>
      </Modal>

      {/* PR celebration modal */}
      <Modal open={showPR} onClose={() => setShowPR(false)}>
        <div className="text-center py-4">
          <Trophy className="h-12 w-12 text-gold mx-auto mb-3" />
          <h2 className="text-xl font-bold">New Personal Record!</h2>
          <p className="text-sm text-text-secondary mt-1">You just crushed your previous best!</p>
          <Button onClick={() => setShowPR(false)} className="mt-4">
            Keep Going
          </Button>
        </div>
      </Modal>
    </div>
  );
}
