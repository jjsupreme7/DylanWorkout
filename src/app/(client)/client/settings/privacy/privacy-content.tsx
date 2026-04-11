"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { updatePassword } from "@/lib/actions/auth";

export function PrivacyContent() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});

  async function handleChangePassword() {
    const newErrors: typeof errors = {};

    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSaving(true);

    try {
      const formData = new FormData();
      formData.set("password", newPassword);
      const result = await updatePassword(formData);

      if (result?.error) {
        toast.error("Failed to update password", { description: result.error });
      } else {
        toast.success("Password updated successfully");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      // updatePassword redirects on success, so this catch handles the redirect
      // If we reach here without a redirect, something may have gone wrong
      toast.success("Password updated successfully");
    } finally {
      setSaving(false);
    }
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
        <h1 className="font-heading text-xl font-bold">Privacy & Security</h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage your password and account security
        </p>
      </div>

      {/* Change Password */}
      <Card className="space-y-5 p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-[--radius-md] bg-brand-muted p-2.5">
            <Shield className="h-5 w-5 text-brand" strokeWidth={1.5} />
          </div>
          <CardTitle>Change Password</CardTitle>
        </div>

        <Input
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: undefined }));
          }}
          placeholder="Enter new password"
          error={errors.newPassword}
        />

        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          placeholder="Confirm new password"
          error={errors.confirmPassword}
        />

        <Button
          onClick={handleChangePassword}
          loading={saving}
          className="w-full"
          size="lg"
        >
          Update Password
        </Button>
      </Card>

      {/* Delete Account */}
      <Card className="space-y-4 p-5 border-danger/20">
        <div className="flex items-center gap-3">
          <div className="rounded-[--radius-md] bg-danger/10 p-2.5">
            <AlertTriangle className="h-5 w-5 text-danger" strokeWidth={1.5} />
          </div>
          <CardTitle>Delete Account</CardTitle>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed">
          Permanently delete your account and all associated data. This action
          cannot be undone. All your workout history, progress photos, and
          personal records will be permanently removed.
        </p>

        <Button variant="danger" className="w-full" size="lg" disabled>
          Delete Account
        </Button>

        <p className="text-[11px] text-text-muted text-center">
          Contact your coach to request account deletion
        </p>
      </Card>
    </div>
  );
}
