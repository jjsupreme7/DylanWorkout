import { createClient } from "@/lib/supabase/server";
import { getClientProgram } from "@/lib/queries/client";
import { WorkoutLanding } from "./workout-landing";

export default async function WorkoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const activeProgram = user ? await getClientProgram(user.id) : null;

  return <WorkoutLanding program={activeProgram} userId={user?.id ?? "preview"} />;
}
