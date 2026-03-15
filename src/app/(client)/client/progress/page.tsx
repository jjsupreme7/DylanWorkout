import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getClientPRs, getClientDashboardData, getClientBodyMeasurements, getClientExerciseHistory } from "@/lib/queries/client";
import { ProgressContent } from "./progress-content";

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [prs, dashData, bodyMeasurements, exerciseHistory] = await Promise.all([
    getClientPRs(user.id),
    getClientDashboardData(user.id),
    getClientBodyMeasurements(user.id),
    getClientExerciseHistory(user.id),
  ]);

  return (
    <ProgressContent
      prs={prs}
      streaks={dashData.streaks}
      sessions={dashData.recentSessions}
      bodyMeasurements={bodyMeasurements}
      exerciseHistory={exerciseHistory}
      userId={user.id}
    />
  );
}
