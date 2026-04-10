import { createClient } from "@/lib/supabase/server";
import { getClientDashboardData, getClientProgram } from "@/lib/queries/client";
import { DashboardContent } from "./dashboard-content";

const EMPTY_DASHBOARD = {
  recentSessions: [],
  streaks: [],
  lastCheckin: null,
  recentPRs: [],
  totalSessions: 0,
};

export default async function ClientDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <DashboardContent data={EMPTY_DASHBOARD} program={null} />;
  }

  const [dashboardData, activeProgram] = await Promise.all([
    getClientDashboardData(user.id),
    getClientProgram(user.id),
  ]);

  return <DashboardContent data={dashboardData} program={activeProgram} />;
}
