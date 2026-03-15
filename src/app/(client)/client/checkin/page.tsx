"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ClipboardCheck } from "lucide-react";

export default function CheckinPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(formData: FormData) {
    setSaving(true);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("checkins").insert({
      client_id: user.id,
      weight: parseFloat(formData.get("weight") as string) || null,
      adherence_training: parseInt(formData.get("adherence_training") as string) || null,
      wins: formData.get("wins") as string || null,
      struggles: formData.get("struggles") as string || null,
      questions: formData.get("questions") as string || null,
    } as any);

    if (error) {
      toast.error("Failed to submit check-in");
    } else {
      toast.success("Check-in submitted!");
      router.push("/client/dashboard");
    }
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-brand/10 p-2.5">
          <ClipboardCheck className="h-5 w-5 text-brand" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Weekly Check-in</h1>
          <p className="text-sm text-text-secondary">Update your coach on your training progress</p>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-4">
        <Card className="p-4 space-y-3">
          <CardTitle className="text-base">Body</CardTitle>
          <Input name="weight" label="Bodyweight (lbs)" type="number" inputMode="decimal" step="0.1" placeholder="0.0" />
        </Card>

        <Card className="p-4 space-y-3">
          <CardTitle className="text-base">Training</CardTitle>
          <Input
            name="adherence_training"
            label="Training Adherence %"
            type="number"
            inputMode="numeric"
            placeholder="How closely did you follow the program? (0-100)"
            min="0"
            max="100"
          />
        </Card>

        <Card className="p-4 space-y-3">
          <CardTitle className="text-base">Notes</CardTitle>
          <Textarea name="wins" label="PRs & Wins" placeholder="New PRs, strength gains, things that went well..." />
          <Textarea name="struggles" label="What held you back?" placeholder="Missed sessions, weak points, sticking points..." />
          <Textarea name="questions" label="Questions for coach" placeholder="Anything about your programming?" />
        </Card>

        <Button type="submit" loading={saving} className="w-full" size="lg">
          Submit Check-in
        </Button>
      </form>
    </div>
  );
}
