import { createClient } from "@/lib/supabase/server";

export async function getClientDashboardData(clientId: string) {
  const supabase = await createClient();

  const [sessions, streaks, checkins, prs] = await Promise.all([
    supabase
      .from("workout_sessions")
      .select("*")
      .eq("client_id", clientId)
      .eq("status", "completed")
      .order("completed_at", { ascending: false })
      .limit(30),
    supabase.from("streaks").select("*").eq("client_id", clientId),
    supabase
      .from("checkins")
      .select("*")
      .eq("client_id", clientId)
      .order("submitted_at", { ascending: false })
      .limit(1),
    supabase
      .from("personal_records")
      .select("*")
      .eq("client_id", clientId)
      .order("achieved_at", { ascending: false })
      .limit(5),
  ]);

  return {
    recentSessions: sessions.data ?? [],
    streaks: streaks.data ?? [],
    lastCheckin: checkins.data?.[0] ?? null,
    recentPRs: prs.data ?? [],
    totalSessions: sessions.data?.length ?? 0,
  };
}

export async function getClientProgram(clientId: string) {
  const supabase = await createClient();

  const { data: clientProgram } = await supabase
    .from("client_programs")
    .select(`
      *,
      program:programs(
        *,
        program_days(
          *,
          program_exercises(
            *,
            exercise:exercises(*)
          )
        )
      )
    `)
    .eq("client_id", clientId)
    .eq("is_active", true)
    .single();

  return clientProgram;
}

export async function getClientWorkoutSessions(clientId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("workout_sessions")
    .select(`
      *,
      program_day:program_days(name),
      exercise_logs(
        *,
        exercise:exercises(name, muscle_group)
      )
    `)
    .eq("client_id", clientId)
    .order("started_at", { ascending: false })
    .limit(20);

  return data ?? [];
}

export async function getClientFoodLogs(clientId: string, date?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("food_logs")
    .select("*")
    .eq("client_id", clientId)
    .order("logged_at", { ascending: false });

  if (date) {
    query = query.gte("logged_at", `${date}T00:00:00`).lt("logged_at", `${date}T23:59:59`);
  } else {
    query = query.limit(50);
  }

  const { data } = await query;
  return data ?? [];
}

export async function getClientNutritionTargets(clientId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("nutrition_targets")
    .select("*")
    .eq("client_id", clientId)
    .order("effective_date", { ascending: false })
    .limit(1)
    .single();

  return data;
}

export async function getClientPRs(clientId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("personal_records")
    .select(`
      *,
      exercise:exercises(name, muscle_group)
    `)
    .eq("client_id", clientId)
    .order("achieved_at", { ascending: false });

  return data ?? [];
}

export async function getClientCheckins(clientId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("checkins")
    .select(`
      *,
      checkin_photos(*)
    `)
    .eq("client_id", clientId)
    .order("submitted_at", { ascending: false });

  return data ?? [];
}

export async function getClientBodyMeasurements(clientId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("body_measurements")
    .select("*")
    .eq("client_id", clientId)
    .order("measured_at", { ascending: true });

  return data ?? [];
}

export async function getClientExerciseHistory(clientId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("exercise_logs")
    .select(`
      *,
      exercise:exercises(name, muscle_group),
      session:workout_sessions(started_at, client_id)
    `)
    .order("created_at", { ascending: true });

  // Filter by client (since exercise_logs doesn't have client_id directly)
  const filtered = (data ?? []).filter(
    (log: any) => log.session?.client_id === clientId
  );

  return filtered;
}
