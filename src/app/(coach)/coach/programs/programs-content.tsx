"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Plus, ClipboardList, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProgramsContentProps {
  programs: any[];
  coachId: string;
}

export function ProgramsContent({ programs: initialPrograms, coachId }: ProgramsContentProps) {
  const [programs, setPrograms] = useState(initialPrograms);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleCreate(formData: FormData) {
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("programs")
      .insert({
        coach_id: coachId,
        name: formData.get("name") as string,
        description: formData.get("description") as string || null,
        duration_weeks: parseInt(formData.get("duration_weeks") as string) || null,
        difficulty: formData.get("difficulty") as string || null,
      })
      .select()
      .single();

    if (data && !error) {
      setShowNew(false);
      toast.success("Program created!");
      router.push(`/coach/programs/${data.id}`);
    } else {
      toast.error("Failed to create program");
    }
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Programs</h1>
        <Button onClick={() => setShowNew(true)}>
          <Plus className="h-4 w-4" />
          New Program
        </Button>
      </div>

      {programs.length > 0 ? (
        <div className="space-y-3">
          {programs.map((program: any) => (
            <Link key={program.id} href={`/coach/programs/${program.id}`}>
              <Card className="p-4 hover:border-brand/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">{program.name}</CardTitle>
                    <p className="text-sm text-text-secondary mt-0.5">{program.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="default">
                        {program.program_days?.length ?? 0} days
                      </Badge>
                      {program.difficulty && (
                        <Badge variant="default" className="capitalize">
                          {program.difficulty}
                        </Badge>
                      )}
                      {program.client_programs?.length > 0 && (
                        <Badge variant="active">
                          {program.client_programs.length} assigned
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-text-muted shrink-0" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={ClipboardList}
          title="No programs yet"
          description="Create your first training program"
          actionLabel="Create Program"
          onAction={() => setShowNew(true)}
        />
      )}

      <Modal open={showNew} onClose={() => setShowNew(false)} title="New Program">
        <form action={handleCreate} className="space-y-3">
          <Input name="name" label="Program Name" placeholder="e.g. Hypertrophy Block" required />
          <Textarea name="description" label="Description" placeholder="Program overview..." />
          <div className="grid grid-cols-2 gap-3">
            <Input name="duration_weeks" label="Duration (weeks)" type="number" placeholder="8" />
            <Select
              name="difficulty"
              label="Difficulty"
              options={[
                { value: "beginner", label: "Beginner" },
                { value: "intermediate", label: "Intermediate" },
                { value: "advanced", label: "Advanced" },
              ]}
              placeholder="Select"
            />
          </div>
          <Button type="submit" loading={saving} className="w-full">
            Create Program
          </Button>
        </form>
      </Modal>
    </div>
  );
}
