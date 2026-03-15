import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface GeneratedExercise {
  name: string;
  muscle_group: string | null;
  sets: number | null;
  reps: string | null;
  weight: number | null;
}

interface GeneratedDay {
  name: string;
  exercises: GeneratedExercise[];
}

interface GeneratedWorkout {
  name: string;
  description: string | null;
  difficulty: string | null;
  duration_weeks: number | null;
  days: GeneratedDay[];
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "coach") {
    return NextResponse.json({ error: "Coaches only" }, { status: 403 });
  }

  const { workout } = (await request.json()) as { workout: GeneratedWorkout };

  if (!workout || !workout.name || !workout.days) {
    return NextResponse.json({ error: "Invalid workout data" }, { status: 400 });
  }

  try {
    // 1. Create the program
    const { data: program, error: programError } = await supabase
      .from("programs")
      .insert({
        coach_id: user.id,
        name: workout.name,
        description: workout.description,
        duration_weeks: workout.duration_weeks,
        difficulty: workout.difficulty,
      })
      .select()
      .single();

    if (programError || !program) {
      return NextResponse.json(
        { error: programError?.message || "Failed to create program" },
        { status: 500 }
      );
    }

    // 2. Create days and exercises
    for (let dayIndex = 0; dayIndex < workout.days.length; dayIndex++) {
      const day = workout.days[dayIndex];

      const { data: programDay, error: dayError } = await supabase
        .from("program_days")
        .insert({
          program_id: program.id,
          day_number: dayIndex + 1,
          name: day.name,
        })
        .select()
        .single();

      if (dayError || !programDay) continue;

      // 3. For each exercise, find or create it, then add to program day
      for (let exIndex = 0; exIndex < day.exercises.length; exIndex++) {
        const ex = day.exercises[exIndex];

        // Try to find existing exercise by name (case-insensitive)
        let { data: existingExercise } = await supabase
          .from("exercises")
          .select("id")
          .ilike("name", ex.name)
          .limit(1)
          .single();

        let exerciseId: string;

        if (existingExercise) {
          exerciseId = existingExercise.id;
        } else {
          // Create the exercise
          const { data: newExercise, error: exError } = await supabase
            .from("exercises")
            .insert({
              name: ex.name,
              muscle_group: ex.muscle_group,
              created_by: user.id,
            })
            .select()
            .single();

          if (exError || !newExercise) continue;
          exerciseId = newExercise.id;
        }

        // Add to program day
        await supabase.from("program_exercises").insert({
          program_day_id: programDay.id,
          exercise_id: exerciseId,
          order_index: exIndex + 1,
          sets: ex.sets,
          reps: ex.reps,
        });
      }
    }

    return NextResponse.json({ programId: program.id });
  } catch (error: any) {
    console.error("Save workout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save workout" },
      { status: 500 }
    );
  }
}
