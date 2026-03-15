import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getCoachClientDetail } from "@/lib/queries/coach";
import { ClientDetailContent } from "./client-detail-content";

interface Props {
  params: Promise<{ clientId: string }>;
}

export default async function ClientDetailPage({ params }: Props) {
  const { clientId } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const data = await getCoachClientDetail(user.id, clientId);
  if (!data.client) redirect("/coach/clients");

  return <ClientDetailContent data={data} />;
}
