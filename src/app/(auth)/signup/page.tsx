"use client";

import { signUp } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await signUp(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Create Account</h2>
      <form action={handleSubmit} className="space-y-4">
        <Input name="full_name" label="Full Name" placeholder="John Doe" required />
        <Input name="email" label="Email" type="email" placeholder="you@example.com" required />
        <Input name="password" label="Password" type="password" placeholder="••••••••" required minLength={6} />
        <Select
          name="role"
          label="I am a..."
          options={[
            { value: "client", label: "Client" },
            { value: "coach", label: "Coach" },
          ]}
        />
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" loading={loading} className="w-full">
          Create Account
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="text-brand hover:text-brand-hover transition-colors">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
