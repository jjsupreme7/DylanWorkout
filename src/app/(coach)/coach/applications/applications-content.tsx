"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { PillSelector } from "@/components/ui/pill-selector";
import { EmptyState } from "@/components/ui/empty-state";
import { FileText, Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/utils/format";
import { toast } from "sonner";
import type { Tables, ApplicationStatus } from "@/lib/types/database";

interface ApplicationsContentProps {
  applications: Tables<"applications">[];
  coachId: string;
}

export function ApplicationsContent({ applications: initial, coachId }: ApplicationsContentProps) {
  const [applications, setApplications] = useState(initial);
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Tables<"applications"> | null>(null);

  const filtered =
    filter === "all" ? applications : applications.filter((a) => a.status === filter);

  const statusVariant = (status: ApplicationStatus) => {
    switch (status) {
      case "pending": return "attention" as const;
      case "approved": return "success" as const;
      case "rejected": return "danger" as const;
    }
  };

  async function handleAction(id: string, status: "approved" | "rejected") {
    const supabase = createClient();
    const app = applications.find((a) => a.id === id);

    const { error } = await supabase
      .from("applications")
      .update({
        status,
        reviewed_by: coachId,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (!error) {
      // If approved, try to auto-link the client to this coach
      if (status === "approved" && app?.email) {
        const { data: clientProfile } = await supabase
          .from("profiles")
          .select("id, role")
          .eq("email", app.email)
          .single();

        if (clientProfile && clientProfile.role === "client") {
          await supabase.from("coach_clients").insert({
            coach_id: coachId,
            client_id: clientProfile.id,
            status: "active",
          });
        }
      }

      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status, reviewed_by: coachId } : a))
      );
      setSelected(null);
      toast.success(
        status === "approved"
          ? "Application approved! Client added to your roster."
          : "Application rejected"
      );
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Applications</h1>

      <PillSelector
        options={[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "approved", label: "Approved" },
          { value: "rejected", label: "Rejected" },
        ]}
        value={filter}
        onChange={setFilter}
      />

      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((app) => (
            <Card
              key={app.id}
              className="p-4 cursor-pointer hover:border-brand/30 transition-colors"
              onClick={() => setSelected(app)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{app.full_name}</p>
                  <p className="text-sm text-text-secondary">{app.email}</p>
                  <p className="text-xs text-text-muted mt-1">{formatDate(app.created_at)}</p>
                </div>
                <Badge variant={statusVariant(app.status)}>{app.status}</Badge>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon={FileText} title="No applications" description="No applications match this filter" />
      )}

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Application Details">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-text-muted text-xs">Name</p>
                <p className="font-medium">{selected.full_name}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Email</p>
                <p className="font-medium">{selected.email}</p>
              </div>
              {selected.phone && (
                <div>
                  <p className="text-text-muted text-xs">Phone</p>
                  <p>{selected.phone}</p>
                </div>
              )}
              <div>
                <p className="text-text-muted text-xs">Applied</p>
                <p>{formatDate(selected.created_at)}</p>
              </div>
            </div>

            {selected.goals && (
              <div>
                <p className="text-xs text-text-muted mb-1">Goals</p>
                <p className="text-sm">{selected.goals}</p>
              </div>
            )}
            {selected.experience && (
              <div>
                <p className="text-xs text-text-muted mb-1">Experience</p>
                <p className="text-sm">{selected.experience}</p>
              </div>
            )}
            {selected.injuries && (
              <div>
                <p className="text-xs text-text-muted mb-1">Injuries</p>
                <p className="text-sm">{selected.injuries}</p>
              </div>
            )}
            {selected.dietary_restrictions && (
              <div>
                <p className="text-xs text-text-muted mb-1">Dietary Restrictions</p>
                <p className="text-sm">{selected.dietary_restrictions}</p>
              </div>
            )}

            {selected.status === "pending" && (
              <div className="flex gap-3 pt-2">
                <Button
                  variant="danger"
                  onClick={() => handleAction(selected.id, "rejected")}
                  className="flex-1"
                >
                  <X className="h-4 w-4" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleAction(selected.id, "approved")}
                  className="flex-1"
                >
                  <Check className="h-4 w-4" />
                  Approve
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
