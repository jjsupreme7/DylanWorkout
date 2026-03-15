"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { PillSelector } from "@/components/ui/pill-selector";
import { Plus, Dumbbell, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { MUSCLE_GROUPS } from "@/lib/utils/constants";
import { toast } from "sonner";
import type { Tables } from "@/lib/types/database";

interface LibraryContentProps {
  exercises: Tables<"exercises">[];
  coachId: string;
}

export function LibraryContent({ exercises: initial, coachId }: LibraryContentProps) {
  const [exercises, setExercises] = useState(initial);
  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState("all");
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const groups = ["all", ...MUSCLE_GROUPS];
  const filtered = exercises.filter((e) => {
    const matchesSearch =
      !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      (e.equipment ?? "").toLowerCase().includes(search.toLowerCase());
    const matchesGroup = filterGroup === "all" || e.muscle_group === filterGroup;
    return matchesSearch && matchesGroup;
  });

  // Group by muscle group
  const grouped = filtered.reduce<Record<string, Tables<"exercises">[]>>((acc, ex) => {
    const group = ex.muscle_group ?? "Other";
    if (!acc[group]) acc[group] = [];
    acc[group].push(ex);
    return acc;
  }, {});

  async function handleCreate(formData: FormData) {
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("exercises")
      .insert({
        name: formData.get("name") as string,
        muscle_group: formData.get("muscle_group") as string || null,
        equipment: formData.get("equipment") as string || null,
        instructions: formData.get("instructions") as string || null,
        created_by: coachId,
      })
      .select()
      .single();

    if (data && !error) {
      setExercises((prev) => [...prev, data]);
      setShowNew(false);
      toast.success("Exercise created!");
    } else {
      toast.error("Failed to create exercise");
    }
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Exercise Library</h1>
        <Button onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4" />
          New Exercise
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-surface pl-10 pr-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/50"
        />
      </div>

      {/* Filter pills */}
      <div className="overflow-x-auto">
        <PillSelector
          options={groups.map((g) => ({ value: g, label: g === "all" ? "All" : g }))}
          value={filterGroup}
          onChange={setFilterGroup}
        />
      </div>

      {/* Exercise list */}
      {Object.keys(grouped).length > 0 ? (
        Object.entries(grouped).map(([group, exs]) => (
          <div key={group}>
            <h2 className="text-sm font-semibold text-text-secondary mb-2">{group}</h2>
            <div className="space-y-2">
              {exs.map((ex) => (
                <Card key={ex.id} className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{ex.name}</p>
                    <p className="text-xs text-text-muted">{ex.equipment ?? "No equipment"}</p>
                  </div>
                  <Badge variant="default">{ex.muscle_group ?? "Other"}</Badge>
                </Card>
              ))}
            </div>
          </div>
        ))
      ) : (
        <EmptyState
          icon={Dumbbell}
          title="No exercises found"
          description={search ? "Try a different search" : "Add exercises to build your library"}
          actionLabel="Add Exercise"
          onAction={() => setShowNew(true)}
        />
      )}

      <Modal open={showNew} onClose={() => setShowNew(false)} title="New Exercise">
        <form action={handleCreate} className="space-y-3">
          <Input name="name" label="Exercise Name" placeholder="e.g. Barbell Bench Press" required />
          <Select
            name="muscle_group"
            label="Muscle Group"
            options={MUSCLE_GROUPS.map((g) => ({ value: g, label: g }))}
            placeholder="Select"
          />
          <Input name="equipment" label="Equipment" placeholder="e.g. Barbell, Dumbbell" />
          <Textarea name="instructions" label="Instructions" placeholder="How to perform this exercise..." />
          <Button type="submit" loading={saving} className="w-full">
            Create Exercise
          </Button>
        </form>
      </Modal>
    </div>
  );
}
