import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getCoachPrograms } from "@/lib/queries/coach";
import { ProgramsContent } from "./programs-content";

export default async function ProgramsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const programs = await getCoachPrograms(user.id);

  return <ProgramsContent programs={programs} coachId={user.id} />;
}
