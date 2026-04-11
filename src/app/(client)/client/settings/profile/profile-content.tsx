"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import type { Tables } from "@/lib/types/database";

interface ProfileContentProps {
  profile: Tables<"profiles"> | null;
}

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

const TIMEZONE_OPTIONS = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
  { value: "America/Phoenix", label: "Arizona (no DST)" },
];

export function ProfileContent({ profile }: ProfileContentProps) {
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [dateOfBirth, setDateOfBirth] = useState(profile?.date_of_birth ?? "");
  const [gender, setGender] = useState(profile?.gender ?? "");
  const [timezone, setTimezone] = useState(profile?.timezone ?? "America/Los_Angeles");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!profile) return;

    setSaving(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          phone: phone || null,
          date_of_birth: dateOfBirth || null,
          gender: gender || null,
          timezone,
          bio: bio || null,
        })
        .eq("id", profile.id);

      if (error) {
        toast.error("Failed to save profile", { description: error.message });
      } else {
        toast.success("Profile updated successfully");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (!profile) {
    return (
      <div className="space-y-6">
        <Link
          href="/client/settings"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text transition-colors"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Back to Settings
        </Link>
        <p className="text-sm text-text-muted">Unable to load profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/client/settings"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text transition-colors"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        Back to Settings
      </Link>

      <div>
        <h1 className="font-heading text-xl font-bold">Edit Profile</h1>
        <p className="text-sm text-text-secondary mt-1">
          Update your personal information
        </p>
      </div>

      {/* Avatar section */}
      <Card className="flex items-center gap-4 p-5">
        <Avatar src={profile.avatar_url} name={profile.full_name} size="xl" />
        <div>
          <p className="text-sm font-medium">{profile.full_name}</p>
          <p className="text-[11px] text-text-muted mt-0.5">
            Profile photo
          </p>
        </div>
      </Card>

      {/* Form fields */}
      <Card className="space-y-5 p-5">
        <CardTitle>Personal Information</CardTitle>

        <Input
          label="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your full name"
        />

        <Input
          label="Email"
          value={profile.email}
          disabled
          className="opacity-60 cursor-not-allowed"
        />

        <Input
          label="Phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(555) 123-4567"
        />

        <Input
          label="Date of Birth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        <Select
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={GENDER_OPTIONS}
          placeholder="Select gender"
        />

        <Select
          label="Timezone"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          options={TIMEZONE_OPTIONS}
        />

        <Textarea
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell your coach a little about yourself..."
          rows={4}
        />
      </Card>

      <Button
        onClick={handleSave}
        loading={saving}
        className="w-full"
        size="lg"
      >
        Save Changes
      </Button>
    </div>
  );
}
