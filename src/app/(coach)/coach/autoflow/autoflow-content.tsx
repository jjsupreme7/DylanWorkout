"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Zap,
  Users,
  ClipboardList,
  Bell,
  Send,
  CheckCircle,
  UserPlus,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AutoflowContentProps {
  clients: any[];
  programs: any[];
  coachId: string;
}

export function AutoflowContent({ clients, programs, coachId }: AutoflowContentProps) {
  const [showBatchAssign, setShowBatchAssign] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showBroadcast, setShowBroadcast] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());
  const [startDate, setStartDate] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  function toggleClient(clientId: string) {
    setSelectedClients((prev) => {
      const next = new Set(prev);
      if (next.has(clientId)) next.delete(clientId);
      else next.add(clientId);
      return next;
    });
  }

  function selectAllClients() {
    if (selectedClients.size === clients.length) {
      setSelectedClients(new Set());
    } else {
      setSelectedClients(new Set(clients.map((c: any) => c.client?.id).filter(Boolean)));
    }
  }

  async function handleBatchAssign() {
    if (!selectedProgram || selectedClients.size === 0 || !startDate) {
      toast.error("Select a program, clients, and start date");
      return;
    }

    setSaving(true);
    const supabase = createClient();
    let successCount = 0;

    for (const clientId of selectedClients) {
      const { error } = await supabase.from("client_programs").insert({
        client_id: clientId,
        program_id: selectedProgram,
        start_date: startDate,
      });
      if (!error) successCount++;
    }

    toast.success(`Program assigned to ${successCount} client${successCount !== 1 ? "s" : ""}!`);
    setShowBatchAssign(false);
    setSelectedClients(new Set());
    setSelectedProgram("");
    setStartDate("");
    setSaving(false);
    router.refresh();
  }

  async function handleSendReminder(formData: FormData) {
    setSaving(true);
    const supabase = createClient();
    const message = formData.get("message") as string;
    const reminderType = formData.get("reminder_type") as string;

    const targetClients =
      selectedClients.size > 0
        ? [...selectedClients]
        : clients.map((c: any) => c.client?.id).filter(Boolean);

    const notifications = targetClients.map((clientId) => ({
      user_id: clientId,
      title: reminderType === "checkin" ? "Check-in Reminder" : "Training Reminder",
      body: message,
      type: reminderType,
    }));

    const { error } = await supabase.from("notifications").insert(notifications);

    if (!error) {
      toast.success(`Reminder sent to ${targetClients.length} client${targetClients.length !== 1 ? "s" : ""}!`);
      setShowReminder(false);
      setSelectedClients(new Set());
    } else {
      toast.error("Failed to send reminders");
    }
    setSaving(false);
  }

  async function handleBroadcast(formData: FormData) {
    setSaving(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const content = formData.get("content") as string;

    // Post to community
    const { error: postError } = await supabase.from("community_posts").insert({
      author_id: user.id,
      content,
      post_type: "general",
      pinned: true,
    });

    // Also send as notification to all clients
    const allClientIds = clients.map((c: any) => c.client?.id).filter(Boolean);
    if (allClientIds.length > 0) {
      await supabase.from("notifications").insert(
        allClientIds.map((clientId: string) => ({
          user_id: clientId,
          title: "Coach Announcement",
          body: content.slice(0, 200),
          type: "broadcast",
        }))
      );
    }

    if (!postError) {
      toast.success("Broadcast sent to all clients!");
      setShowBroadcast(false);
    } else {
      toast.error("Failed to send broadcast");
    }
    setSaving(false);
  }

  const programOptions = programs.map((p: any) => ({
    value: p.id,
    label: `${p.name} (${p.program_days?.length ?? 0} days)`,
  }));

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Zap className="h-6 w-6 text-gold" />
          <h1 className="text-2xl font-bold">Autoflow</h1>
        </div>
        <p className="text-text-secondary text-sm">
          Automate repetitive tasks. Assign programs, send reminders, and broadcast to all clients at once.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold">{clients.length}</p>
          <p className="text-xs text-text-muted">Active Clients</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold">{programs.length}</p>
          <p className="text-xs text-text-muted">Programs</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold">
            {programs.reduce((sum: number, p: any) => sum + (p.client_programs?.length ?? 0), 0)}
          </p>
          <p className="text-xs text-text-muted">Assignments</p>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="space-y-3">
        {/* Batch Assign */}
        <Card
          className="p-5 hover:border-brand/30 transition-colors cursor-pointer"
          onClick={() => setShowBatchAssign(true)}
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-brand/10 p-3">
              <ClipboardList className="h-5 w-5 text-brand" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Batch Assign Program</h3>
              <p className="text-sm text-text-secondary mt-0.5">
                Assign a training program to multiple clients at once. Save time when onboarding groups.
              </p>
            </div>
          </div>
        </Card>

        {/* Send Reminders */}
        <Card
          className="p-5 hover:border-brand/30 transition-colors cursor-pointer"
          onClick={() => setShowReminder(true)}
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-gold/10 p-3">
              <Bell className="h-5 w-5 text-gold" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Send Reminders</h3>
              <p className="text-sm text-text-secondary mt-0.5">
                Push check-in or training reminders to selected clients or everyone.
              </p>
            </div>
          </div>
        </Card>

        {/* Broadcast */}
        <Card
          className="p-5 hover:border-brand/30 transition-colors cursor-pointer"
          onClick={() => setShowBroadcast(true)}
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-success/10 p-3">
              <Send className="h-5 w-5 text-success" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Broadcast Message</h3>
              <p className="text-sm text-text-secondary mt-0.5">
                Post an announcement to the community feed and notify all clients.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Batch Assign Modal */}
      <Modal
        open={showBatchAssign}
        onClose={() => {
          setShowBatchAssign(false);
          setSelectedClients(new Set());
        }}
        title="Batch Assign Program"
      >
        <div className="space-y-4">
          <Select
            label="Program"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            options={programOptions}
            placeholder="Select a program"
          />
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">
                Clients ({selectedClients.size}/{clients.length})
              </label>
              <button
                onClick={selectAllClients}
                className="text-xs text-brand hover:text-brand-hover transition-colors"
              >
                {selectedClients.size === clients.length ? "Deselect All" : "Select All"}
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1 rounded-lg border border-border p-2">
              {clients.length > 0 ? (
                clients.map((cc: any) => {
                  const clientId = cc.client?.id;
                  const selected = selectedClients.has(clientId);
                  return (
                    <button
                      key={cc.id}
                      onClick={() => toggleClient(clientId)}
                      className={`w-full text-left rounded-lg px-3 py-2 text-sm flex items-center justify-between transition-colors ${
                        selected ? "bg-brand/10 text-brand" : "hover:bg-surface"
                      }`}
                    >
                      <span>{cc.client?.full_name}</span>
                      {selected && <CheckCircle className="h-4 w-4" />}
                    </button>
                  );
                })
              ) : (
                <p className="text-xs text-text-muted text-center py-3">No clients yet</p>
              )}
            </div>
          </div>

          <Button
            onClick={handleBatchAssign}
            loading={saving}
            disabled={!selectedProgram || selectedClients.size === 0 || !startDate}
            className="w-full"
          >
            Assign to {selectedClients.size} Client{selectedClients.size !== 1 ? "s" : ""}
          </Button>
        </div>
      </Modal>

      {/* Send Reminder Modal */}
      <Modal
        open={showReminder}
        onClose={() => {
          setShowReminder(false);
          setSelectedClients(new Set());
        }}
        title="Send Reminders"
      >
        <form action={handleSendReminder} className="space-y-4">
          <Select
            name="reminder_type"
            label="Reminder Type"
            options={[
              { value: "checkin", label: "Check-in Reminder" },
              { value: "workout_reminder", label: "Training Reminder" },
            ]}
          />
          <Textarea
            name="message"
            label="Message"
            placeholder="e.g., Don't forget to submit your weekly check-in!"
            rows={3}
            required
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">
                Send to ({selectedClients.size > 0 ? selectedClients.size : "All"} clients)
              </label>
              {clients.length > 0 && (
                <button
                  type="button"
                  onClick={selectAllClients}
                  className="text-xs text-brand hover:text-brand-hover transition-colors"
                >
                  {selectedClients.size === clients.length ? "Send to All" : "Select Specific"}
                </button>
              )}
            </div>
            {selectedClients.size > 0 && (
              <div className="max-h-32 overflow-y-auto space-y-1 rounded-lg border border-border p-2">
                {clients.map((cc: any) => {
                  const clientId = cc.client?.id;
                  const selected = selectedClients.has(clientId);
                  return (
                    <button
                      key={cc.id}
                      type="button"
                      onClick={() => toggleClient(clientId)}
                      className={`w-full text-left rounded-lg px-3 py-1.5 text-sm flex items-center justify-between transition-colors ${
                        selected ? "bg-brand/10 text-brand" : "hover:bg-surface"
                      }`}
                    >
                      <span>{cc.client?.full_name}</span>
                      {selected && <CheckCircle className="h-3.5 w-3.5" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <Button type="submit" loading={saving} className="w-full">
            <Bell className="h-4 w-4" />
            Send Reminder
          </Button>
        </form>
      </Modal>

      {/* Broadcast Modal */}
      <Modal open={showBroadcast} onClose={() => setShowBroadcast(false)} title="Broadcast Message">
        <form action={handleBroadcast} className="space-y-4">
          <Textarea
            name="content"
            label="Message"
            placeholder="Write your announcement..."
            rows={5}
            required
          />
          <p className="text-xs text-text-muted">
            This will be posted to the community feed and sent as a notification to all {clients.length} clients.
          </p>
          <Button type="submit" loading={saving} className="w-full">
            <Send className="h-4 w-4" />
            Send to All Clients
          </Button>
        </form>
      </Modal>
    </div>
  );
}
