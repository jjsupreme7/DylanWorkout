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
      <div className="text-center">
        <Card className="p-8 backdrop-blur-xl bg-card/80 border-border/60">
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
    <div>
      {/* Mobile-only branding */}
      <div className="mb-6 lg:hidden">
        <Link href="/" className="text-sm text-text-secondary hover:text-brand transition-colors flex items-center gap-1 mb-4">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>
        <h1 className="text-2xl font-bold">
          ENTER THE <span className="text-brand">DRAGON</span>
        </h1>
        <p className="text-sm text-text-secondary mt-1">Apply for coaching — takes about 2 minutes</p>
      </div>

      {/* Desktop heading */}
      <div className="hidden lg:block mb-6">
        <h1 className="text-2xl font-bold">Apply for Coaching</h1>
        <p className="text-sm text-text-secondary mt-1">Takes about 2 minutes</p>
      </div>

      {/* Step indicator — numbered circles */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  i < step
                    ? "bg-brand text-white"
                    : i === step
                    ? "bg-brand text-white ring-4 ring-brand/20"
                    : "bg-surface text-text-muted border border-border"
                }`}
              >
                {i < step ? (
                  <Check className="h-4 w-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span className="hidden sm:block text-[10px] text-text-muted mt-1.5 whitespace-nowrap">{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 rounded-full transition-colors ${
                  i < step ? "bg-brand" : "bg-surface"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="p-6 backdrop-blur-xl bg-card/80 border-border/60">
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
  );
}
