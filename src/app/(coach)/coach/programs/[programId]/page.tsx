import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProgramBuilderContent } from "./program-builder-content";

interface Props {
  params: Promise<{ programId: string }>;
}

export default async function ProgramBuilderPage({ params }: Props) {
  const { programId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const programRes = await supabase
    .from("programs")
    .select(`
      *,
      program_days(
        *,
        program_exercises(
          *,
          exercise:exercises(*)
        )
      )
    `)
    .eq("id", programId)
    .single();

  const exercisesRes = await supabase.from("exercises").select("*").order("name");

  const clientsRes = await supabase
    .from("coach_clients")
    .select(`
      client:profiles!coach_clients_client_id_fkey(id, full_name)
    `)
    .eq("coach_id", user.id)
    .eq("status", "active");

  if (!programRes.data) redirect("/coach/programs");

  return (
    <ProgramBuilderContent
      program={programRes.data}
      exercises={exercisesRes.data ?? []}
      clients={(clientsRes.data ?? []).map((c: any) => c.client).filter(Boolean)}
      coachId={user.id}
    />
  );
}
