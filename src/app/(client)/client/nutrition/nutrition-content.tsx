"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs } from "@/components/ui/tabs";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Modal } from "@/components/ui/modal";
import { EmptyState } from "@/components/ui/empty-state";
import { Apple, Plus, Camera, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { MEAL_TYPES } from "@/lib/utils/constants";
import { toast } from "sonner";
import type { Tables } from "@/lib/types/database";

const tabs = [
  { id: "log", label: "Food Log" },
  { id: "scan", label: "AI Scan" },
  { id: "ask", label: "Ask AI" },
];

interface NutritionContentProps {
  foodLogs: Tables<"food_logs">[];
  targets: Tables<"nutrition_targets"> | null;
  userId: string;
}

export function NutritionContent({ foodLogs: initialLogs, targets, userId }: NutritionContentProps) {
  const [activeTab, setActiveTab] = useState("log");
  const [logs, setLogs] = useState(initialLogs);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);

  const totals = logs.reduce(
    (acc, log) => ({
      calories: acc.calories + (log.calories ?? 0),
      protein: acc.protein + (log.protein ?? 0),
      carbs: acc.carbs + (log.carbs ?? 0),
      fat: acc.fat + (log.fat ?? 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  async function handleAddFood(formData: FormData) {
    setSaving(true);
    const supabase = createClient();
    const entry = {
      client_id: userId,
      food_name: formData.get("food_name") as string,
      meal_type: formData.get("meal_type") as string,
      calories: parseInt(formData.get("calories") as string) || null,
      protein: parseFloat(formData.get("protein") as string) || null,
      carbs: parseFloat(formData.get("carbs") as string) || null,
      fat: parseFloat(formData.get("fat") as string) || null,
    };

    const { data, error } = await supabase.from("food_logs").insert(entry).select().single();
    if (data && !error) {
      setLogs((prev) => [data, ...prev]);
      setShowAdd(false);
      toast.success("Food logged!");
    } else {
      toast.error("Failed to log food");
    }
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "log" && (
        <div className="space-y-4">
          {/* Macro summary */}
          <Card className="p-4 space-y-3">
            <CardTitle className="text-base">Daily Summary</CardTitle>
            <div className="grid grid-cols-4 gap-3 text-center">
              {[
                { label: "Calories", value: totals.calories, target: targets?.calories, unit: "" },
                { label: "Protein", value: totals.protein, target: targets?.protein, unit: "g" },
                { label: "Carbs", value: totals.carbs, target: targets?.carbs, unit: "g" },
                { label: "Fat", value: totals.fat, target: targets?.fat, unit: "g" },
              ].map((macro) => (
                <div key={macro.label}>
                  <p className="text-xs text-text-muted">{macro.label}</p>
                  <p className="text-lg font-bold">
                    {Math.round(macro.value)}
                    <span className="text-xs text-text-muted">{macro.unit}</span>
                  </p>
                  {macro.target && (
                    <ProgressBar
                      value={macro.value}
                      max={macro.target}
                      color={macro.value > macro.target ? "danger" : "success"}
                      size="sm"
                      className="mt-1"
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Food list */}
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">Today&apos;s Food</h2>
            <Button size="sm" onClick={() => setShowAdd(true)}>
              <Plus className="h-3.5 w-3.5" />
              Add
            </Button>
          </div>

          {logs.length > 0 ? (
            <div className="space-y-2">
              {logs.map((log) => (
                <Card key={log.id} className="p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{log.food_name}</p>
                    <p className="text-xs text-text-muted capitalize">{log.meal_type ?? "Meal"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{log.calories ?? 0} cal</p>
                    <p className="text-xs text-text-muted">
                      P:{log.protein ?? 0} C:{log.carbs ?? 0} F:{log.fat ?? 0}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Apple}
              title="No food logged today"
              description="Track your meals to hit your macro targets"
              actionLabel="Add Food"
              onAction={() => setShowAdd(true)}
            />
          )}
        </div>
      )}

      {activeTab === "scan" && (
        <Card className="p-6">
          <EmptyState
            icon={Camera}
            title="AI Food Scanner"
            description="Take a photo of your meal and AI will estimate the macros. Coming soon!"
          />
        </Card>
      )}

      {activeTab === "ask" && (
        <Card className="p-6">
          <EmptyState
            icon={MessageCircle}
            title="Ask AI"
            description="Chat with an AI nutritionist about your diet. Coming soon!"
          />
        </Card>
      )}

      {/* Add food modal */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Log Food">
        <form action={handleAddFood} className="space-y-3">
          <Input name="food_name" label="Food" placeholder="e.g. Chicken breast" required />
          <Select
            name="meal_type"
            label="Meal"
            options={MEAL_TYPES.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))}
            placeholder="Select meal type"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input name="calories" label="Calories" type="number" inputMode="numeric" placeholder="0" />
            <Input name="protein" label="Protein (g)" type="number" inputMode="decimal" placeholder="0" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input name="carbs" label="Carbs (g)" type="number" inputMode="decimal" placeholder="0" />
            <Input name="fat" label="Fat (g)" type="number" inputMode="decimal" placeholder="0" />
          </div>
          <Button type="submit" loading={saving} className="w-full">
            Log Food
          </Button>
        </form>
      </Modal>
    </div>
  );
}
