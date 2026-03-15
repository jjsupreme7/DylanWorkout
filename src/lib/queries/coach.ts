import { createClient } from "@/lib/supabase/server";

export async function getCoachClients(coachId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("coach_clients")
    .select(`
      *,
      client:profiles!coach_clients_client_id_fkey(
        id, full_name, email, avatar_url,
        streaks(*),
        checkins(submitted_at, status)
      )
    `)
    .eq("coach_id", coachId)
    .eq("status", "active");

  return data ?? [];
}

export async function getCoachClientDetail(coachId: string, clientId: string) {
  const supabase = await createClient();

  const [client, sessions, checkins, prs, foodLogs] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", clientId)
      .single(),
    supabase
      .from("workout_sessions")
      .select(`*, exercise_logs(*, exercise:exercises(name))`)
      .eq("client_id", clientId)
      .order("started_at", { ascending: false })
      .limit(20),
    supabase
      .from("checkins")
      .select(`*, checkin_photos(*)`)
      .eq("client_id", clientId)
      .order("submitted_at", { ascending: false })
      .limit(10),
    supabase
      .from("personal_records")
      .select(`*, exercise:exercises(name)`)
      .eq("client_id", clientId)
      .order("achieved_at", { ascending: false })
      .limit(20),
    supabase
      .from("food_logs")
      .select("*")
      .eq("client_id", clientId)
      .order("logged_at", { ascending: false })
      .limit(50),
  ]);

  return {
    client: client.data,
    sessions: sessions.data ?? [],
    checkins: checkins.data ?? [],
    prs: prs.data ?? [],
    foodLogs: foodLogs.data ?? [],
  };
}

export async function getCoachPrograms(coachId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("programs")
    .select(`
      *,
      program_days(
        *,
        program_exercises(
          *,
          exercise:exercises(*)
        )
      ),
      client_programs(
        client:profiles!client_programs_client_id_fkey(full_name)
      )
    `)
    .eq("coach_id", coachId)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function getCoachDashboardStats(coachId: string) {
  const supabase = await createClient();

  const [clients, pendingCheckins, applications] = await Promise.all([
    supabase
      .from("coach_clients")
      .select("id", { count: "exact" })
      .eq("coach_id", coachId)
      .eq("status", "active"),
    supabase
      .from("checkins")
      .select("id", { count: "exact" })
      .eq("status", "pending")
      .in(
        "client_id",
        (await supabase
          .from("coach_clients")
          .select("client_id")
          .eq("coach_id", coachId)
          .eq("status", "active")
        ).data?.map((c) => c.client_id) ?? []
      ),
    supabase
      .from("applications")
      .select("id", { count: "exact" })
      .eq("status", "pending"),
  ]);

  return {
    activeClients: clients.count ?? 0,
    pendingCheckins: pendingCheckins.count ?? 0,
    pendingApplications: applications.count ?? 0,
  };
}
