import { createClient, createAdminClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ApplicationsContent } from "./applications-content";

export default async function ApplicationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const admin = createAdminClient();
  const { data: applications } = await admin
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  return <ApplicationsContent applications={applications ?? []} coachId={user.id} />;
}
