"use client";

import { resetPassword } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await resetPassword(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  if (sent) {
    return (
      <Card className="p-6 text-center">
        <h2 className="text-lg font-semibold mb-2">Check Your Email</h2>
        <p className="text-sm text-text-secondary mb-4">
          We sent a password reset link to your email address.
        </p>
        <Link href="/login" className="text-brand hover:text-brand-hover text-sm transition-colors">
          Back to sign in
        </Link>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-2">Reset Password</h2>
      <p className="text-sm text-text-secondary mb-4">
        Enter your email and we'll send you a reset link.
      </p>
      <form action={handleSubmit} className="space-y-4">
        <Input name="email" label="Email" type="email" placeholder="you@example.com" required />
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" loading={loading} className="w-full">
          Send Reset Link
        </Button>
      </form>
      <p className="mt-4 text-center text-sm">
        <Link href="/login" className="text-text-secondary hover:text-brand transition-colors">
          Back to sign in
        </Link>
      </p>
    </Card>
  );
}
