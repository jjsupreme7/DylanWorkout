import { createClient } from "@/lib/supabase/server";
import { NotificationsContent } from "./notifications-content";

export default async function NotificationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let notifications: Array<{
    id: string;
    user_id: string;
    title: string;
    body: string | null;
    type: string | null;
    read: boolean;
    created_at: string;
  }> = [];

  if (user) {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    notifications = data ?? [];
  }

  return <NotificationsContent notifications={notifications} />;
}
