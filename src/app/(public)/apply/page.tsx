"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const STEPS = ["Personal Info", "Goals", "Training History"];

export default function ApplyPage() {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    goals: "",
    experience: "",
    injuries: "",
    dietary_restrictions: "",
    how_found_us: "",
  });

  function update(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from("applications").insert({
      full_name: formData.full_name,
      email: formData.email,
      phone: formData.phone || null,
      goals: formData.goals || null,
      experience: formData.experience || null,
      injuries: formData.injuries || null,
      dietary_restrictions: formData.dietary_restrictions || null,
      how_found_us: formData.how_found_us || null,
    });

    if (!error) {
      setSubmitted(true);
    } else {
      toast.error("Failed to submit application. Please try again.");
    }
    setSaving(false);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
            <Check className="h-7 w-7 text-success" />
          </div>
          <h2 className="text-xl font-bold">Application Submitted!</h2>
          <p className="mt-2 text-sm text-text-secondary">
            Thanks for applying! We&apos;ll review your application and get back to you within 48 hours.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 text-sm text-brand hover:text-brand-hover transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <Link href="/" className="text-sm text-text-secondary hover:text-brand transition-colors flex items-center gap-1 mb-4">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
          <h1 className="text-2xl font-bold">
            ENTER THE <span className="text-brand">DRAGON</span>
          </h1>
          <p className="text-sm text-text-secondary mt-1">Apply for coaching — takes about 2 minutes</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`h-1.5 flex-1 rounded-full ${
                  i <= step ? "bg-brand" : "bg-surface"
                }`}
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-text-muted mb-4">Step {step + 1} of {STEPS.length}: {STEPS[step]}</p>

        <Card className="p-6">
          {step === 0 && (
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={formData.full_name}
                onChange={(e) => update("full_name", e.target.value)}
                placeholder="John Doe"
                required
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                required
              />
              <Input
                label="Phone (optional)"
                type="tel"
                value={formData.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <Textarea
                label="What are your training goals?"
                value={formData.goals}
                onChange={(e) => update("goals", e.target.value)}
                placeholder="e.g. Add 50lbs to my squat, build bigger arms, hit a 315 bench..."
                rows={4}
              />
              <Select
                label="Training experience"
                value={formData.experience}
                onChange={(e) => update("experience", e.target.value)}
                options={[
                  { value: "beginner", label: "Beginner (0-1 year)" },
                  { value: "intermediate", label: "Intermediate (1-3 years)" },
                  { value: "advanced", label: "Advanced (3+ years)" },
                ]}
                placeholder="Select your level"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Textarea
                label="Any injuries or limitations?"
                value={formData.injuries}
                onChange={(e) => update("injuries", e.target.value)}
                placeholder="e.g. Bad knee, lower back pain, shoulder impingement..."
              />
              <Textarea
                label="Current lifts (if any)"
                value={formData.dietary_restrictions}
                onChange={(e) => update("dietary_restrictions", e.target.value)}
                placeholder="e.g. Bench: 225, Squat: 315, Deadlift: 405..."
              />
              <Select
                label="How did you find us?"
                value={formData.how_found_us}
                onChange={(e) => update("how_found_us", e.target.value)}
                options={[
                  { value: "instagram", label: "Instagram" },
                  { value: "referral", label: "Friend/Referral" },
                  { value: "google", label: "Google Search" },
                  { value: "youtube", label: "YouTube" },
                  { value: "other", label: "Other" },
                ]}
                placeholder="Select"
              />
            </div>
          )}

          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)} className="flex-1">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            {step < STEPS.length - 1 ? (
              <Button
                onClick={() => setStep(step + 1)}
                className="flex-1"
                disabled={step === 0 && (!formData.full_name || !formData.email)}
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} loading={saving} className="flex-1">
                Submit Application
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
