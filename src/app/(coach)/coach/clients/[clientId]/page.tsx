import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getCoachClientDetail, getCoachPrograms } from "@/lib/queries/coach";
import { ClientDetailContent } from "./client-detail-content";

interface Props {
  params: Promise<{ clientId: string }>;
}

export default async function ClientDetailPage({ params }: Props) {
  const { clientId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [data, programs] = await Promise.all([
    getCoachClientDetail(user.id, clientId),
    getCoachPrograms(user.id),
  ]);
  if (!data.client) redirect("/coach/clients");

  return <ClientDetailContent data={data} programs={programs} />;
}
