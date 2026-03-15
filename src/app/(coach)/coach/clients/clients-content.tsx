"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/ui/empty-state";
import { Users, ChevronRight, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ClientsContentProps {
  clients: any[];
  coachId: string;
}

export function ClientsContent({ clients, coachId }: ClientsContentProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [addEmail, setAddEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const router = useRouter();

  async function handleAddClient() {
    if (!addEmail.trim()) return;
    setAdding(true);

    try {
      const res = await fetch("/api/coach/add-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: addEmail.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success(`Added ${data.clientName} to your roster!`);
      setShowAdd(false);
      setAddEmail("");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to add client");
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Button onClick={() => setShowAdd(true)} size="sm">
          <UserPlus className="h-4 w-4" />
          Add Client
        </Button>
      </div>

      {clients.length > 0 ? (
        <div className="space-y-2">
          {clients.map((cc: any) => {
            const workoutStreak = cc.client?.streaks?.find(
              (s: any) => s.streak_type === "workout"
            );

            return (
              <Link key={cc.id} href={`/coach/clients/${cc.client?.id}`}>
                <Card className="p-4 flex items-center gap-4 hover:border-brand/30 transition-colors">
                  <Avatar src={cc.client?.avatar_url} name={cc.client?.full_name ?? "Client"} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{cc.client?.full_name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {workoutStreak && workoutStreak.current_streak > 0 && (
                        <Badge variant="success">{workoutStreak.current_streak}d streak</Badge>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-text-muted shrink-0" />
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No clients yet"
          description="Add clients by email or approve applications"
          actionLabel="Add Client"
          onAction={() => setShowAdd(true)}
        />
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Client">
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            Enter the email of a client who has already signed up.
          </p>
          <Input
            label="Client Email"
            type="email"
            value={addEmail}
            onChange={(e) => setAddEmail(e.target.value)}
            placeholder="client@example.com"
          />
          <Button onClick={handleAddClient} loading={adding} disabled={!addEmail.trim()} className="w-full">
            Add to Roster
          </Button>
        </div>
      </Modal>
    </div>
  );
}
