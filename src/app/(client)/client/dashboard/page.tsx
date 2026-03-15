import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getClientDashboardData, getClientProgram } from "@/lib/queries/client";
import { DashboardContent } from "./dashboard-content";

export default async function ClientDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [dashboardData, activeProgram] = await Promise.all([
    getClientDashboardData(user.id),
    getClientProgram(user.id),
  ]);

  return <DashboardContent data={dashboardData} program={activeProgram} />;
}
