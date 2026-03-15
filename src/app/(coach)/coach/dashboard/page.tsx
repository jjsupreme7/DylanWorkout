import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getCoachDashboardStats, getCoachClients } from "@/lib/queries/coach";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { Users, ClipboardCheck, FileText, ChevronRight } from "lucide-react";

export default async function CoachDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [stats, clients] = await Promise.all([
    getCoachDashboardStats(user.id),
    getCoachClients(user.id),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">Welcome back, Coach</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Active Clients" value={stats.activeClients} />
        <StatCard
          label="Pending Check-ins"
          value={stats.pendingCheckins}
          trend={stats.pendingCheckins > 0 ? "up" : "flat"}
        />
        <StatCard
          label="Applications"
          value={stats.pendingApplications}
          trend={stats.pendingApplications > 0 ? "up" : "flat"}
        />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3">
        <Link href="/coach/clients">
          <Card className="p-4 flex flex-col items-center gap-2 hover:border-brand/30 transition-colors text-center">
            <Users className="h-5 w-5 text-brand" />
            <span className="text-xs font-medium">Clients</span>
          </Card>
        </Link>
        <Link href="/coach/applications">
          <Card className="p-4 flex flex-col items-center gap-2 hover:border-brand/30 transition-colors text-center">
            <FileText className="h-5 w-5 text-gold" />
            <span className="text-xs font-medium">Applications</span>
          </Card>
        </Link>
        <Link href="/coach/programs">
          <Card className="p-4 flex flex-col items-center gap-2 hover:border-brand/30 transition-colors text-center">
            <ClipboardCheck className="h-5 w-5 text-success" />
            <span className="text-xs font-medium">Programs</span>
          </Card>
        </Link>
      </div>

      {/* Recent clients */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold">Your Clients</h2>
          <Link href="/coach/clients" className="text-xs text-brand hover:text-brand-hover transition-colors">
            View all
          </Link>
        </div>
        {clients.length > 0 ? (
          <div className="space-y-2">
            {clients.slice(0, 5).map((cc: any) => (
              <Link key={cc.id} href={`/coach/clients/${cc.client?.id}`}>
                <Card className="p-3 flex items-center gap-3 hover:border-brand/30 transition-colors">
                  <Avatar src={cc.client?.avatar_url} name={cc.client?.full_name ?? "Client"} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{cc.client?.full_name}</p>
                    <p className="text-xs text-text-muted">{cc.client?.email}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-text-muted" />
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center">
            <p className="text-sm text-text-secondary">No clients yet. Approve applications to get started.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
