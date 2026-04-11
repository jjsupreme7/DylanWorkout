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
  let unreadCount = 0;
  if (user) {
    const [profileRes, notifRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase.from("notifications").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("read", false),
    ]);
    if (profileRes.data) profile = profileRes.data;
    unreadCount = notifRes.count ?? 0;
  }

  return <ClientShell profile={profile} unreadCount={unreadCount}>{children}</ClientShell>;
}
