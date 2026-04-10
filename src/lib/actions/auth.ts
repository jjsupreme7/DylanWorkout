"use server";

import { createClient, createAdminClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  // Get role to redirect properly
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Authentication failed" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const dest = profile?.role === "coach" ? "/coach/dashboard" : "/client/dashboard";
  redirect(dest);
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;
  const role = (formData.get("role") as string) || "client";

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role },
    },
  });

  if (error) return { error: error.message };
  if (!data.user) return { error: "Signup failed" };

  // Use admin client to bypass RLS for profile creation
  // (session isn't fully established yet after signup)
  const admin = createAdminClient();

  const { error: profileError } = await admin.from("profiles").insert({
    id: data.user.id,
    email,
    full_name: fullName,
    role: role as "client" | "coach",
  });

  if (profileError) return { error: profileError.message };

  // If coach, create coach_profiles row
  if (role === "coach") {
    await admin.from("coach_profiles").insert({ id: data.user.id });
  }

  const dest = role === "coach" ? "/coach/dashboard" : "/client/dashboard";
  redirect(dest);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/reset-password`,
  });

  if (error) return { error: error.message };
  return { success: true };
}

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };

  redirect("/login");
}
