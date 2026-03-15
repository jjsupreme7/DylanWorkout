import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ClientShell } from "@/components/layouts/client-shell";

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");

  return <ClientShell profile={profile}>{children}</ClientShell>;
}
