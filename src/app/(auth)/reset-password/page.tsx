"use client";

export const dynamic = "force-dynamic";

import { updatePassword } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await updatePassword(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-2">Set New Password</h2>
      <p className="text-sm text-text-secondary mb-4">Enter your new password below.</p>
      <form action={handleSubmit} className="space-y-4">
        <Input name="password" label="New Password" type="password" placeholder="••••••••" required minLength={6} />
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" loading={loading} className="w-full">
          Update Password
        </Button>
      </form>
    </Card>
  );
}
