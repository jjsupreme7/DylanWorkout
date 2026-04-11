"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatCard } from "@/components/ui/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Trophy, Dumbbell, ClipboardCheck, ClipboardList, ArrowLeft, RefreshCw, XCircle, Calendar } from "lucide-react";
import { formatDate, formatWeight, formatDuration } from "@/lib/utils/format";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Tables } from "@/lib/types/database";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "program", label: "Program" },
  { id: "sessions", label: "Sessions" },
  { id: "checkins", label: "Check-ins" },
  { id: "prs", label: "PRs" },
];

interface ClientDetailData {
  client: Tables<"profiles"> | null;
  sessions: any[];
  checkins: any[];
  prs: any[];
  activeProgram: any | null;
}

interface ClientDetailProps {
  data: ClientDetailData;
  programs: any[];
}

export function ClientDetailContent({ data, programs }: ClientDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [feedbackText, setFeedbackText] = useState("");
  const [savingFeedback, setSavingFeedback] = useState<string | null>(null);
  const [showUnassign, setShowUnassign] = useState(false);
  const [showSwap, setShowSwap] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const router = useRouter();

  const client = data.client!;

  async function handleCheckinFeedback(checkinId: string) {
    setSavingFeedback(checkinId);
    try {
      const res = await fetch("/api/coach/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "checkin_feedback", checkinId, feedback: feedbackText }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }

      toast.success("Feedback saved!");
      setFeedbackText("");
    } catch (err: any) {
      toast.error(err.message || "Failed to save feedback");
    }
    setSavingFeedback(null);
  }

  async function handleUnassign() {
    setActionLoading(true);
    try {
      const res = await fetch("/api/coach/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "unassign_program",
          clientProgramId: data.activeProgram.id,
          clientId: client.id,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast.success("Program unassigned");
      setShowUnassign(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to unassign");
    }
    setActionLoading(false);
  }

  async function handleSwap(formData: FormData) {
    setActionLoading(true);
    const newProgramId = formData.get("program_id") as string;
    const startDate = formData.get("start_date") as string;
    try {
      const res = await fetch("/api/coach/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "swap_program",
          clientId: client.id,
          oldClientProgramId: data.activeProgram?.id,
          newProgramId,
          startDate,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      toast.success("Program swapped!");
      setShowSwap(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to swap program");
    }
    setActionLoading(false);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/coach/clients" className="rounded-lg p-2 hover:bg-surface transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Avatar src={client.avatar_url} name={client.full_name} size="lg" />
        <div>
          <h1 className="text-xl font-bold">{client.full_name}</h1>
          <p className="text-sm text-text-secondary">{client.email}</p>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Sessions" value={data.sessions.length} />
            <StatCard label="PRs" value={data.prs.length} />
            <StatCard label="Check-ins" value={data.checkins.length} />
          </div>
        </div>
      )}

      {activeTab === "program" && (
        <div className="space-y-4">
          {data.activeProgram ? (
            <>
              <Card className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{data.activeProgram.program?.name}</CardTitle>
                  <Badge variant="active">Active</Badge>
                </div>
                {data.activeProgram.program?.description && (
                  <p className="text-sm text-text-secondary">{data.activeProgram.program.description}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Started {formatDate(data.activeProgram.start_date)}
                  </span>
                  {data.activeProgram.program?.program_days && (
                    <span>{data.activeProgram.program.program_days.length} training days</span>
                  )}
                  {data.activeProgram.program?.difficulty && (
                    <Badge variant="default" className="capitalize">{data.activeProgram.program.difficulty}</Badge>
                  )}
                </div>
              </Card>

              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" onClick={() => setShowSwap(true)}>
                  <RefreshCw className="h-3.5 w-3.5" />
                  Swap Program
                </Button>
                <Button variant="secondary" size="sm" onClick={() => setShowUnassign(true)} className="text-danger hover:bg-danger/10">
                  <XCircle className="h-3.5 w-3.5" />
                  Unassign
                </Button>
              </div>

              {/* Unassign confirmation modal */}
              <Modal open={showUnassign} onClose={() => setShowUnassign(false)} title="Unassign Program">
                <div className="space-y-4">
                  <p className="text-sm text-text-secondary">
                    Remove <strong>{data.activeProgram.program?.name}</strong> from{" "}
                    <strong>{client.full_name}</strong>? They will no longer see this program in their Workout tab.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="secondary" onClick={() => setShowUnassign(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleUnassign} loading={actionLoading} className="flex-1 bg-danger hover:bg-danger/90">
                      Unassign
                    </Button>
                  </div>
                </div>
              </Modal>

              {/* Swap program modal */}
              <Modal open={showSwap} onClose={() => setShowSwap(false)} title="Swap Program">
                <form action={handleSwap} className="space-y-3">
                  <p className="text-sm text-text-secondary">
                    Replace <strong>{data.activeProgram.program?.name}</strong> with a new program.
                  </p>
                  <Select
                    name="program_id"
                    label="New Program"
                    options={programs
                      .filter((p: any) => p.id !== data.activeProgram?.program?.id)
                      .map((p: any) => ({ value: p.id, label: p.name }))}
                    placeholder="Select program"
                  />
                  <Input name="start_date" label="Start Date" type="date" required />
                  <Button type="submit" loading={actionLoading} className="w-full">
                    Swap Program
                  </Button>
                </form>
              </Modal>
            </>
          ) : (
            <EmptyState
              icon={ClipboardList}
              title="No active program"
              description="Assign a training program from your programs page"
              actionLabel="Go to Programs"
              onAction={() => router.push("/coach/programs")}
            />
          )}
        </div>
      )}

      {activeTab === "sessions" && (
        <div className="space-y-2">
          {data.sessions.length > 0 ? (
            data.sessions.map((session: any) => (
              <Card key={session.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sm">{formatDate(session.started_at)}</p>
                  <div className="flex items-center gap-2">
                    {session.duration_minutes && (
                      <Badge variant="default">{formatDuration(session.duration_minutes)}</Badge>
                    )}
                    {session.rating && <Badge variant="success">{session.rating}/10</Badge>}
                  </div>
                </div>
                {session.exercise_logs && session.exercise_logs.length > 0 && (
                  <div className="space-y-1 mt-2">
                    {session.exercise_logs.slice(0, 5).map((log: any) => (
                      <p key={log.id} className="text-xs text-text-secondary">
                        {log.exercise?.name}: {log.weight}{log.weight_unit} x{log.reps}
                      </p>
                    ))}
                  </div>
                )}
              </Card>
            ))
          ) : (
            <EmptyState icon={Dumbbell} title="No sessions yet" />
          )}
        </div>
      )}

      {activeTab === "checkins" && (
        <div className="space-y-3">
          {data.checkins.length > 0 ? (
            data.checkins.map((checkin: any) => (
              <Card key={checkin.id} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{formatDate(checkin.submitted_at)}</p>
                  <Badge variant={checkin.status === "pending" ? "attention" : "success"}>
                    {checkin.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-text-muted text-xs">Bodyweight</p>
                    <p className="font-medium">{checkin.weight ? `${checkin.weight} lbs` : "—"}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs">Training Adherence</p>
                    <p className="font-medium">{checkin.adherence_training ? `${checkin.adherence_training}%` : "—"}</p>
                  </div>
                </div>
                {checkin.wins && (
                  <div>
                    <p className="text-xs text-text-muted">Wins</p>
                    <p className="text-sm">{checkin.wins}</p>
                  </div>
                )}
                {checkin.struggles && (
                  <div>
                    <p className="text-xs text-text-muted">Struggles</p>
                    <p className="text-sm">{checkin.struggles}</p>
                  </div>
                )}

                {/* Coach feedback */}
                {checkin.coach_feedback ? (
                  <div className="bg-surface rounded-lg p-3">
                    <p className="text-xs text-text-muted mb-1">Your Feedback</p>
                    <p className="text-sm">{checkin.coach_feedback}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Write feedback for this check-in..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      rows={3}
                    />
                    <Button
                      size="sm"
                      onClick={() => handleCheckinFeedback(checkin.id)}
                      loading={savingFeedback === checkin.id}
                      disabled={!feedbackText.trim()}
                    >
                      Send Feedback
                    </Button>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <EmptyState icon={ClipboardCheck} title="No check-ins yet" />
          )}
        </div>
      )}

      {activeTab === "prs" && (
        <div className="space-y-2">
          {data.prs.length > 0 ? (
            data.prs.map((pr: any) => (
              <Card key={pr.id} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="h-4 w-4 text-gold" />
                  <div>
                    <p className="text-sm font-medium">{pr.exercise?.name}</p>
                    <p className="text-xs text-text-muted">
                      {formatWeight(pr.weight ?? 0, pr.weight_unit)} x{pr.reps}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-text-muted">{formatDate(pr.achieved_at)}</span>
              </Card>
            ))
          ) : (
            <EmptyState icon={Trophy} title="No PRs yet" />
          )}
        </div>
      )}
    </div>
  );
}
