"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/lib/actions/auth";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import type { Tables } from "@/lib/types/database";

interface SettingsContentProps {
  profile: Tables<"profiles">;
  coachProfile: Tables<"coach_profiles"> | null;
}

export function SettingsContent({ profile, coachProfile }: SettingsContentProps) {
  const [saving, setSaving] = useState(false);

  async function handleUpdateProfile(formData: FormData) {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.get("full_name") as string,
        phone: formData.get("phone") as string || null,
        bio: formData.get("bio") as string || null,
      })
      .eq("id", profile.id);

    if (!error) {
      toast.success("Profile updated!");
    } else {
      toast.error("Failed to update profile");
    }
    setSaving(false);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card className="p-5">
        <CardTitle className="mb-4">Profile</CardTitle>
        <form action={handleUpdateProfile} className="space-y-4">
          <Input name="full_name" label="Full Name" defaultValue={profile.full_name} required />
          <Input name="email" label="Email" defaultValue={profile.email} disabled />
          <Input name="phone" label="Phone" defaultValue={profile.phone ?? ""} />
          <Textarea name="bio" label="Bio" defaultValue={profile.bio ?? ""} placeholder="Tell clients about yourself..." />
          <Button type="submit" loading={saving}>
            Save Changes
          </Button>
        </form>
      </Card>

      <Card className="p-5">
        <CardTitle className="mb-2">Payments</CardTitle>
        <p className="text-sm text-text-secondary mb-4">
          Connect Stripe to accept payments from clients.
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-border">
            <div>
              <span className="text-sm font-medium">Stripe</span>
              <p className="text-xs text-text-muted">Accept subscriptions & one-time payments</p>
            </div>
            <Button size="sm" variant="secondary">
              Connect
            </Button>
          </div>
          <div className="rounded-lg bg-surface p-3">
            <p className="text-xs text-text-muted">
              Once connected, clients can subscribe to your plans directly from the app.
              You&apos;ll need to set up your pricing in the Stripe dashboard.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <CardTitle className="mb-2">Integrations</CardTitle>
        <p className="text-sm text-text-secondary mb-4">Connect third-party services.</p>
        <div className="space-y-3">
          {["Calendly", "Zoom"].map((service) => (
            <div key={service} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm font-medium">{service}</span>
              <Button size="sm" variant="secondary">
                Connect
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <CardTitle className="mb-4 text-danger">Danger Zone</CardTitle>
        <form action={signOut}>
          <Button variant="danger" type="submit">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </form>
      </Card>
    </div>
  );
}
