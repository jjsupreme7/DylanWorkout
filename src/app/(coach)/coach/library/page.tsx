import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LibraryContent } from "./library-content";

export default async function LibraryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: exercises } = await supabase
    .from("exercises")
    .select("*")
    .order("muscle_group")
    .order("name");

  return <LibraryContent exercises={exercises ?? []} coachId={user.id} />;
}
