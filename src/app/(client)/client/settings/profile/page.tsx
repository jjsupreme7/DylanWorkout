import { createClient } from "@/lib/supabase/server";
import { ProfileContent } from "./profile-content";

export default async function EditProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  return <ProfileContent profile={profile} />;
}
