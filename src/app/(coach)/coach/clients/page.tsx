import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getCoachClients } from "@/lib/queries/coach";
import { ClientsContent } from "./clients-content";

export default async function CoachClientsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const clients = await getCoachClients(user.id);

  return <ClientsContent clients={clients} coachId={user.id} />;
}
