import { createClient } from "@/lib/supabase/server";
import { ClientShell } from "@/components/layouts/client-shell";

// Mock profile for development preview (no auth required)
const MOCK_PROFILE = {
  id: "preview",
  role: "client" as const,
  full_name: "Preview User",
  email: "preview@enterthedragon.com",
  avatar_url: null,
  phone: null,
  date_of_birth: null,
  gender: null,
  bio: null,
  timezone: "America/Los_Angeles",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Use real profile if logged in, otherwise use mock for preview
  let profile = MOCK_PROFILE;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (data) profile = data;
  }

  return <ClientShell profile={profile}>{children}</ClientShell>;
}
