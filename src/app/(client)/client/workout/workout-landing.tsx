"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Dumbbell, Play } from "lucide-react";
import { useWorkoutStore } from "@/stores/workout-store";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface ProgramExercise {
  id: string;
  order_index: number;
  sets: number | null;
  reps: string | null;
  rest_seconds: number | null;
  rpe: number | null;
  notes: string | null;
  exercise: { id: string; name: string; muscle_group: string | null } | null;
}

interface ProgramDay {
  id: string;
  day_number: number;
  name: string;
  notes: string | null;
  program_exercises: ProgramExercise[];
}

interface Program {
  id: string;
  name: string;
  description: string | null;
  program_days: ProgramDay[];
}

interface WorkoutLandingProps {
  program: { program: Program } | null;
  userId: string;
}

export function WorkoutLanding({ program, userId }: WorkoutLandingProps) {
  const { isActive, sessionId } = useWorkoutStore();
  const router = useRouter();

  if (isActive && sessionId) {
    router.push(`/client/workout/${sessionId}`);
    return null;
  }

  if (!program?.program) {
    return (
      <EmptyState
        icon={Dumbbell}
        title="No Program Assigned"
        description="Your coach hasn't assigned a training program yet. Check back soon!"
      />
    );
  }

  const days = program.program.program_days.sort((a, b) => a.day_number - b.day_number);

  async function startWorkout(day: ProgramDay) {
    const supabase = createClient();
    const { data: session } = await supabase
      .from("workout_sessions")
      .insert({ client_id: userId, program_day_id: day.id })
      .select()
      .single();

    if (session) {
      const exercises = day.program_exercises
        .sort((a, b) => a.order_index - b.order_index)
        .map((pe) => ({
          id: pe.exercise?.id ?? pe.id,
          name: pe.exercise?.name ?? "Exercise",
          sets: pe.sets ?? 3,
        }));

      useWorkoutStore.getState().startSession(session.id, day.id, exercises);
      router.push(`/client/workout/${session.id}`);
    }
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title={program.program.name}
        subtitle={program.program.description ?? undefined}
      />

      <div className="space-y-3">
        {days.map((day) => (
          <Card key={day.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <CardTitle className="text-base">Day {day.day_number}: {day.name}</CardTitle>
                <p className="text-xs text-text-muted mt-0.5">
                  {day.program_exercises.length} exercises
                </p>
              </div>
              <Button size="sm" onClick={() => startWorkout(day)}>
                <Play className="h-3.5 w-3.5" />
                Start
              </Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {day.program_exercises
                .sort((a, b) => a.order_index - b.order_index)
                .map((pe) => (
                  <Badge key={pe.id} variant="default">
                    {pe.exercise?.name ?? "Exercise"}
                  </Badge>
                ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
