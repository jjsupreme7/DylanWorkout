import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AIBuilderContent } from "./ai-builder-content";

export default async function AIBuilderPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return <AIBuilderContent coachId={user.id} />;
}
