"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Plus, ArrowLeft, Trash2, GripVertical, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import Link from "next/link";
import type { Tables } from "@/lib/types/database";

interface ProgramBuilderProps {
  program: any;
  exercises: Tables<"exercises">[];
  clients: { id: string; full_name: string }[];
  coachId: string;
}

export function ProgramBuilderContent({
  program,
  exercises: allExercises,
  clients,
  coachId,
}: ProgramBuilderProps) {
  const [days, setDays] = useState<any[]>(
    (program.program_days ?? []).sort((a: any, b: any) => a.day_number - b.day_number)
  );
  const [activeDay, setActiveDay] = useState(days[0]?.id ?? "");
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [showAddDay, setShowAddDay] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentDay = days.find((d) => d.id === activeDay);
  const dayTabs = days.map((d: any) => ({ id: d.id, label: `Day ${d.day_number}` }));

  const filteredExercises = searchQuery
    ? allExercises.filter(
        (e) =>
          e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (e.muscle_group ?? "").toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allExercises;

  async function handleAddDay(formData: FormData) {
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("program_days")
      .insert({
        program_id: program.id,
        day_number: days.length + 1,
        name: formData.get("name") as string,
      })
      .select()
      .single();

    if (data && !error) {
      const newDay = { ...data, program_exercises: [] };
      setDays((prev) => [...prev, newDay]);
      setActiveDay(data.id);
      setShowAddDay(false);
      toast.success("Day added!");
    }
    setSaving(false);
  }

  async function handleAddExercise(exerciseId: string) {
    if (!currentDay) return;
    setSaving(true);
    const supabase = createClient();
    const orderIndex = (currentDay.program_exercises?.length ?? 0) + 1;

    const { data, error } = await supabase
      .from("program_exercises")
      .insert({
        program_day_id: currentDay.id,
        exercise_id: exerciseId,
        order_index: orderIndex,
        sets: 3,
        reps: "8-12",
        rest_seconds: 90,
      })
      .select(`*, exercise:exercises(*)`)
      .single();

    if (data && !error) {
      setDays((prev) =>
        prev.map((d) =>
          d.id === currentDay.id
            ? { ...d, program_exercises: [...(d.program_exercises ?? []), data] }
            : d
        )
      );
      setShowAddExercise(false);
      toast.success("Exercise added!");
    }
    setSaving(false);
  }

  async function handleRemoveExercise(peId: string) {
    const supabase = createClient();
    await supabase.from("program_exercises").delete().eq("id", peId);
    setDays((prev) =>
      prev.map((d) =>
        d.id === activeDay
          ? { ...d, program_exercises: d.program_exercises.filter((pe: any) => pe.id !== peId) }
          : d
      )
    );
    toast.success("Exercise removed");
  }

  async function handleUpdateExercise(peId: string, field: string, value: string | number | null) {
    const supabase = createClient();
    await supabase.from("program_exercises").update({ [field]: value }).eq("id", peId);
    setDays((prev) =>
      prev.map((d) =>
        d.id === activeDay
          ? {
              ...d,
              program_exercises: d.program_exercises.map((pe: any) =>
                pe.id === peId ? { ...pe, [field]: value } : pe
              ),
            }
          : d
      )
    );
  }

  async function handleAssign(formData: FormData) {
    setSaving(true);
    const supabase = createClient();
    const clientId = formData.get("client_id") as string;
    const startDate = formData.get("start_date") as string;

    const { error } = await supabase.from("client_programs").insert({
      client_id: clientId,
      program_id: program.id,
      start_date: startDate,
    });

    if (!error) {
      // Send notification to client (fire-and-forget)
      fetch("/api/coach/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send_notifications",
          notifications: [{
            user_id: clientId,
            title: "New program assigned!",
            body: `Your coach assigned you: ${program.name}. Check your Workout tab!`,
            type: "program_assigned",
          }],
        }),
      }).catch(() => {});

      toast.success("Program assigned!");
      setShowAssign(false);
    } else {
      toast.error("Failed to assign program");
    }
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/coach/programs" className="rounded-lg p-2 hover:bg-surface transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{program.name}</h1>
            <p className="text-sm text-text-secondary">{program.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setShowAssign(true)} size="sm">
            <UserPlus className="h-3.5 w-3.5" />
            Assign
          </Button>
          <Button onClick={() => setShowAddDay(true)} size="sm">
            <Plus className="h-3.5 w-3.5" />
            Add Day
          </Button>
        </div>
      </div>

      {/* Day tabs */}
      {days.length > 0 ? (
        <>
          <Tabs tabs={dayTabs} activeTab={activeDay} onChange={setActiveDay} />

          {currentDay && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{currentDay.name}</h2>
                <Button size="sm" variant="secondary" onClick={() => setShowAddExercise(true)}>
                  <Plus className="h-3.5 w-3.5" />
                  Exercise
                </Button>
              </div>

              {(currentDay.program_exercises ?? [])
                .sort((a: any, b: any) => a.order_index - b.order_index)
                .map((pe: any) => (
                  <Card key={pe.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <GripVertical className="h-5 w-5 text-text-muted mt-0.5 shrink-0 cursor-grab" />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{pe.exercise?.name}</p>
                            <p className="text-xs text-text-muted">{pe.exercise?.muscle_group}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveExercise(pe.id)}
                            className="rounded-lg p-1.5 text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div>
                            <label className="text-xs text-text-muted">Sets</label>
                            <input
                              type="number"
                              value={pe.sets ?? ""}
                              onChange={(e) =>
                                handleUpdateExercise(pe.id, "sets", parseInt(e.target.value) || null)
                              }
                              className="w-full mt-1 rounded-lg border border-border bg-surface px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand/50"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-text-muted">Reps</label>
                            <input
                              type="text"
                              value={pe.reps ?? ""}
                              onChange={(e) =>
                                handleUpdateExercise(pe.id, "reps", e.target.value || null)
                              }
                              className="w-full mt-1 rounded-lg border border-border bg-surface px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand/50"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-text-muted">Rest (s)</label>
                            <input
                              type="number"
                              value={pe.rest_seconds ?? ""}
                              onChange={(e) =>
                                handleUpdateExercise(pe.id, "rest_seconds", parseInt(e.target.value) || null)
                              }
                              className="w-full mt-1 rounded-lg border border-border bg-surface px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand/50"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-text-muted">RPE</label>
                            <input
                              type="number"
                              step="0.5"
                              min="6"
                              max="10"
                              value={pe.rpe ?? ""}
                              onChange={(e) =>
                                handleUpdateExercise(pe.id, "rpe", parseFloat(e.target.value) || null)
                              }
                              className="w-full mt-1 rounded-lg border border-border bg-surface px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand/50"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

              {(currentDay.program_exercises ?? []).length === 0 && (
                <EmptyState
                  icon={Plus}
                  title="No exercises yet"
                  description="Add exercises to this training day"
                  actionLabel="Add Exercise"
                  onAction={() => setShowAddExercise(true)}
                />
              )}
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={Plus}
          title="No training days"
          description="Add days to build out your program"
          actionLabel="Add Day"
          onAction={() => setShowAddDay(true)}
        />
      )}

      {/* Add day modal */}
      <Modal open={showAddDay} onClose={() => setShowAddDay(false)} title="Add Training Day">
        <form action={handleAddDay} className="space-y-3">
          <Input name="name" label="Day Name" placeholder="e.g. Push Day, Upper Body A" required />
          <Button type="submit" loading={saving} className="w-full">
            Add Day
          </Button>
        </form>
      </Modal>

      {/* Add exercise modal */}
      <Modal open={showAddExercise} onClose={() => setShowAddExercise(false)} title="Add Exercise">
        <div className="space-y-3">
          <Input
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="max-h-72 overflow-y-auto space-y-1">
            {filteredExercises.map((ex) => (
              <button
                key={ex.id}
                onClick={() => handleAddExercise(ex.id)}
                className="w-full text-left rounded-lg px-3 py-2 hover:bg-surface transition-colors"
              >
                <p className="text-sm font-medium">{ex.name}</p>
                <p className="text-xs text-text-muted">{ex.muscle_group ?? "General"}</p>
              </button>
            ))}
            {filteredExercises.length === 0 && (
              <p className="text-sm text-text-muted text-center py-4">No exercises found</p>
            )}
          </div>
        </div>
      </Modal>

      {/* Assign modal */}
      <Modal open={showAssign} onClose={() => setShowAssign(false)} title="Assign to Client">
        <form action={handleAssign} className="space-y-3">
          <Select
            name="client_id"
            label="Client"
            options={clients.map((c) => ({ value: c.id, label: c.full_name }))}
            placeholder="Select client"
          />
          <Input name="start_date" label="Start Date" type="date" required />
          <Button type="submit" loading={saving} className="w-full">
            Assign Program
          </Button>
        </form>
      </Modal>
    </div>
  );
}
