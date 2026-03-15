import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getCoachClients, getCoachPrograms } from "@/lib/queries/coach";
import { AutoflowContent } from "./autoflow-content";

export default async function AutoflowPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [clients, programs] = await Promise.all([
    getCoachClients(user.id),
    getCoachPrograms(user.id),
  ]);

  return (
    <AutoflowContent
      clients={clients}
      programs={programs}
      coachId={user.id}
    />
  );
}
