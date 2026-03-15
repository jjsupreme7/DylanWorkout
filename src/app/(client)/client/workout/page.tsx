import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getClientProgram } from "@/lib/queries/client";
import { WorkoutLanding } from "./workout-landing";

export default async function WorkoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const activeProgram = await getClientProgram(user.id);

  return <WorkoutLanding program={activeProgram} userId={user.id} />;
}
