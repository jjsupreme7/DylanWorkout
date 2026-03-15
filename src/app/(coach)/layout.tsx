import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { CoachShell } from "@/components/layouts/coach-shell";

export default async function CoachLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "coach") redirect("/login");

  return <CoachShell profile={profile}>{children}</CoachShell>;
}
