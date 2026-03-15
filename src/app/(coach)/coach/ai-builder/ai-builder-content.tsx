"use client";

import { useState, useRef } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Upload,
  FileText,
  X,
  ChevronDown,
  ChevronRight,
  Dumbbell,
  Check,
  Loader2,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface GeneratedExercise {
  name: string;
  muscle_group: string | null;
  sets: number | null;
  reps: string | null;
  weight: number | null;
}

interface GeneratedDay {
  name: string;
  exercises: GeneratedExercise[];
}

interface GeneratedWorkout {
  name: string;
  description: string | null;
  difficulty: string | null;
  duration_weeks: number | null;
  days: GeneratedDay[];
}

interface AIBuilderContentProps {
  coachId: string;
}

export function AIBuilderContent({ coachId }: AIBuilderContentProps) {
  const [inputText, setInputText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [workout, setWorkout] = useState<GeneratedWorkout | null>(null);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());
  const [editingField, setEditingField] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function toggleDay(index: number) {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [".docx", ".xlsx", ".xls", ".csv", ".txt"];
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!validTypes.includes(ext)) {
      toast.error("Unsupported file type. Use .docx, .xlsx, .csv, or .txt");
      return;
    }

    setUploadedFile(file);
    setIsParsing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/import/parse-file", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setInputText(data.text);
      toast.success(`Imported "${file.name}" successfully`);
    } catch (err: any) {
      toast.error(err.message || "Failed to parse file");
      setUploadedFile(null);
    } finally {
      setIsParsing(false);
    }
  }

  function removeFile() {
    setUploadedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleGenerate() {
    if (!inputText.trim()) {
      toast.error("Enter workout text or upload a file first");
      return;
    }

    setIsGenerating(true);
    setWorkout(null);

    try {
      const res = await fetch("/api/ai/generate-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setWorkout(data.workout);
      // Expand all days by default
      setExpandedDays(new Set(data.workout.days.map((_: any, i: number) => i)));
      toast.success("Workout generated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to generate workout");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSave() {
    if (!workout) return;

    setIsSaving(true);

    try {
      const res = await fetch("/api/ai/save-workout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workout }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Program saved!");
      router.push(`/coach/programs/${data.programId}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to save program");
    } finally {
      setIsSaving(false);
    }
  }

  function updateWorkoutField(field: string, value: any) {
    if (!workout) return;
    setWorkout({ ...workout, [field]: value });
  }

  function updateExercise(dayIndex: number, exIndex: number, field: string, value: any) {
    if (!workout) return;
    const newDays = [...workout.days];
    const newExercises = [...newDays[dayIndex].exercises];
    newExercises[exIndex] = { ...newExercises[exIndex], [field]: value };
    newDays[dayIndex] = { ...newDays[dayIndex], exercises: newExercises };
    setWorkout({ ...workout, days: newDays });
  }

  function removeExercise(dayIndex: number, exIndex: number) {
    if (!workout) return;
    const newDays = [...workout.days];
    newDays[dayIndex] = {
      ...newDays[dayIndex],
      exercises: newDays[dayIndex].exercises.filter((_, i) => i !== exIndex),
    };
    setWorkout({ ...workout, days: newDays });
  }

  function removeDay(dayIndex: number) {
    if (!workout) return;
    setWorkout({
      ...workout,
      days: workout.days.filter((_, i) => i !== dayIndex),
    });
  }

  function addDay() {
    if (!workout) return;
    const newDay: GeneratedDay = {
      name: `Day ${workout.days.length + 1}`,
      exercises: [],
    };
    setWorkout({ ...workout, days: [...workout.days, newDay] });
    setExpandedDays((prev) => new Set([...prev, workout.days.length]));
  }

  function addExercise(dayIndex: number) {
    if (!workout) return;
    const newExercise: GeneratedExercise = {
      name: "New Exercise",
      muscle_group: null,
      sets: 3,
      reps: "8-12",
      weight: null,
    };
    const newDays = [...workout.days];
    newDays[dayIndex] = {
      ...newDays[dayIndex],
      exercises: [...newDays[dayIndex].exercises, newExercise],
    };
    setWorkout({ ...workout, days: newDays });
  }

  const totalExercises = workout?.days.reduce((sum, d) => sum + d.exercises.length, 0) ?? 0;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-6 w-6 text-brand" />
          <h1 className="text-2xl font-bold">AI Workout Builder</h1>
          <Badge variant="active" className="text-xs">Beta</Badge>
        </div>
        <p className="text-text-secondary text-sm">
          Type or paste a workout description, or upload a file. AI will convert it into a structured program.
        </p>
      </div>

      {/* Input Section */}
      {!workout && (
        <Card className="p-5 space-y-4">
          {/* File Upload */}
          <div>
            <label className="text-sm font-medium text-text mb-2 block">Import from file</label>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".docx,.xlsx,.xls,.csv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                disabled={isParsing}
                size="sm"
              >
                {isParsing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {isParsing ? "Parsing..." : "Upload File"}
              </Button>
              <span className="text-xs text-text-muted">.docx, .xlsx, .csv, .txt</span>
              {uploadedFile && (
                <div className="flex items-center gap-2 rounded-lg bg-surface px-3 py-1.5">
                  <FileText className="h-3.5 w-3.5 text-brand" />
                  <span className="text-xs font-medium">{uploadedFile.name}</span>
                  <button onClick={removeFile} className="text-text-muted hover:text-danger transition-colors">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Text Input */}
          <div>
            <label className="text-sm font-medium text-text mb-2 block">Workout description</label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Paste or type your workout here. For example:\n\nPush Day:\n- Bench Press: 4x8 @ 185lbs\n- Incline Dumbbell Press: 3x10\n- Cable Flyes: 3x12\n- Overhead Press: 4x8\n- Lateral Raises: 3x15\n- Tricep Pushdowns: 3x12`}
              rows={12}
              className="font-mono text-sm"
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !inputText.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating workout...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Workout
              </>
            )}
          </Button>
        </Card>
      )}

      {/* Generated Workout Preview */}
      {workout && (
        <div className="space-y-4">
          {/* Program Header */}
          <Card className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={workout.name}
                  onChange={(e) => updateWorkoutField("name", e.target.value)}
                  className="text-xl font-bold bg-transparent border-none outline-none w-full text-text focus:ring-0 p-0"
                />
                <input
                  type="text"
                  value={workout.description ?? ""}
                  onChange={(e) => updateWorkoutField("description", e.target.value || null)}
                  placeholder="Add description..."
                  className="text-sm text-text-secondary bg-transparent border-none outline-none w-full mt-1 focus:ring-0 p-0"
                />
              </div>
              <Button variant="secondary" size="sm" onClick={() => { setWorkout(null); setExpandedDays(new Set()); }}>
                <Pencil className="h-3.5 w-3.5" />
                Edit Text
              </Button>
            </div>
            <div className="flex items-center gap-3">
              {workout.difficulty && (
                <Badge variant="default" className="capitalize">{workout.difficulty}</Badge>
              )}
              {workout.duration_weeks && (
                <Badge variant="default">{workout.duration_weeks} weeks</Badge>
              )}
              <Badge variant="default">{workout.days.length} days</Badge>
              <Badge variant="default">{totalExercises} exercises</Badge>
            </div>
          </Card>

          {/* Days */}
          {workout.days.map((day, dayIndex) => (
            <Card key={dayIndex} className="overflow-hidden">
              {/* Day Header */}
              <button
                onClick={() => toggleDay(dayIndex)}
                className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-surface/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {expandedDays.has(dayIndex) ? (
                    <ChevronDown className="h-4 w-4 text-text-muted" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-text-muted" />
                  )}
                  <div className="text-left">
                    <p className="font-semibold text-sm">Day {dayIndex + 1}: {day.name}</p>
                    <p className="text-xs text-text-muted">{day.exercises.length} exercises</p>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeDay(dayIndex); }}
                  className="rounded-lg p-1.5 text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </button>

              {/* Exercises */}
              {expandedDays.has(dayIndex) && (
                <div className="border-t border-border">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-2 px-5 py-2 text-xs font-medium text-text-muted border-b border-border bg-surface/30">
                    <div className="col-span-5">Exercise</div>
                    <div className="col-span-2">Muscle Group</div>
                    <div className="col-span-1 text-center">Sets</div>
                    <div className="col-span-2 text-center">Reps</div>
                    <div className="col-span-1 text-center">Weight</div>
                    <div className="col-span-1"></div>
                  </div>

                  {day.exercises.map((ex, exIndex) => (
                    <div
                      key={exIndex}
                      className="grid grid-cols-12 gap-2 px-5 py-2.5 items-center border-b border-border/50 last:border-b-0 hover:bg-surface/30 transition-colors"
                    >
                      <div className="col-span-5">
                        <input
                          type="text"
                          value={ex.name}
                          onChange={(e) => updateExercise(dayIndex, exIndex, "name", e.target.value)}
                          className="w-full text-sm font-medium bg-transparent border-none outline-none text-text p-0"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={ex.muscle_group ?? ""}
                          onChange={(e) => updateExercise(dayIndex, exIndex, "muscle_group", e.target.value || null)}
                          placeholder="—"
                          className="w-full text-xs bg-transparent border-none outline-none text-text-secondary p-0"
                        />
                      </div>
                      <div className="col-span-1">
                        <input
                          type="number"
                          value={ex.sets ?? ""}
                          onChange={(e) => updateExercise(dayIndex, exIndex, "sets", parseInt(e.target.value) || null)}
                          className="w-full text-sm text-center bg-transparent border-none outline-none text-text p-0"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={ex.reps ?? ""}
                          onChange={(e) => updateExercise(dayIndex, exIndex, "reps", e.target.value || null)}
                          className="w-full text-sm text-center bg-transparent border-none outline-none text-text p-0"
                        />
                      </div>
                      <div className="col-span-1">
                        <input
                          type="number"
                          value={ex.weight ?? ""}
                          onChange={(e) => updateExercise(dayIndex, exIndex, "weight", parseFloat(e.target.value) || null)}
                          placeholder="—"
                          className="w-full text-sm text-center bg-transparent border-none outline-none text-text p-0"
                        />
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button
                          onClick={() => removeExercise(dayIndex, exIndex)}
                          className="rounded p-1 text-text-muted hover:text-danger hover:bg-danger/10 transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add exercise button */}
                  <button
                    onClick={() => addExercise(dayIndex)}
                    className="w-full px-5 py-2.5 flex items-center gap-2 text-xs text-text-muted hover:text-brand hover:bg-surface/50 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Exercise
                  </button>
                </div>
              )}
            </Card>
          ))}

          {/* Add Day button */}
          <button
            onClick={addDay}
            className="w-full rounded-xl border border-dashed border-border hover:border-brand/50 p-4 flex items-center justify-center gap-2 text-sm text-text-muted hover:text-brand transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Training Day
          </button>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleSave} disabled={isSaving} className="flex-1">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Save as Program
                </>
              )}
            </Button>
            <Button
              variant="secondary"
              onClick={() => { setWorkout(null); setExpandedDays(new Set()); }}
            >
              Start Over
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
