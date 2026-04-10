import { createClient } from "@/lib/supabase/server";
import { SettingsContent } from "./settings-content";

export default async function ClientSettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  let subscription = null;

  if (user) {
    const [profileRes, subRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase.from("subscriptions").select("*").eq("client_id", user.id).single(),
    ]);
    profile = profileRes.data;
    subscription = subRes.data;
  }

  return <SettingsContent profile={profile} subscription={subscription} />;
}
