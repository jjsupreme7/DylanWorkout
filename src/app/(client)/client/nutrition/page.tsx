import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getClientFoodLogs, getClientNutritionTargets } from "@/lib/queries/client";
import { NutritionContent } from "./nutrition-content";

export default async function NutritionPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const today = new Date().toISOString().split("T")[0];
  const [foodLogs, targets] = await Promise.all([
    getClientFoodLogs(user.id, today),
    getClientNutritionTargets(user.id),
  ]);

  return <NutritionContent foodLogs={foodLogs} targets={targets} userId={user.id} />;
}
