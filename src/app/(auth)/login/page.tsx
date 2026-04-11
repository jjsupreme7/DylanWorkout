"use client";

import { signIn } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await signIn(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold">Welcome back</h2>
      <p className="mt-1.5 text-sm text-text-secondary">Sign in to access your training dashboard</p>

      <form action={handleSubmit} className="mt-7 space-y-4">
        <Input name="email" label="Email" type="email" placeholder="you@example.com" required />
        <Input name="password" label="Password" type="password" placeholder="Your password" required />
        {error && (
          <div className="rounded-[--radius-md] bg-danger/10 border border-danger/20 px-3.5 py-2.5 text-sm text-danger">
            {error}
          </div>
        )}
        <Button type="submit" loading={loading} className="w-full" size="lg">
          Sign In
        </Button>
      </form>

      {/* Dev preview bypass */}
      <div className="mt-6 border-t border-border pt-5 space-y-2.5">
        <p className="text-xs text-text-muted text-center mb-3">Preview mode</p>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => router.push("/client/dashboard")}
        >
          Preview as Client
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => router.push("/coach/dashboard")}
        >
          Preview as Coach
        </Button>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <Link href="/forgot-password" className="text-text-secondary hover:text-text transition-colors">
          Forgot password?
        </Link>
        <Link href="/signup" className="text-brand hover:text-brand-hover font-medium transition-colors">
          Create account
        </Link>
      </div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
          &larr; Back to website
        </Link>
      </div>
    </div>
  );
}
