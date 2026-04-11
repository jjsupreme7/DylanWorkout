import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "coach") {
    return NextResponse.json({ error: "Coaches only" }, { status: 403 });
  }

  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Find the client by email (use admin client to bypass RLS —
  // coach can't see the profile until they're linked)
  const admin = createAdminClient();
  const { data: clientProfile } = await admin
    .from("profiles")
    .select("id, full_name, role")
    .eq("email", email)
    .single();

  if (!clientProfile) {
    return NextResponse.json(
      { error: "No account found with that email. The client needs to sign up first." },
      { status: 404 }
    );
  }

  if (clientProfile.role !== "client") {
    return NextResponse.json(
      { error: "That account is not a client account." },
      { status: 400 }
    );
  }

  // Check if already linked
  const { data: existing } = await admin
    .from("coach_clients")
    .select("id")
    .eq("coach_id", user.id)
    .eq("client_id", clientProfile.id)
    .single();

  if (existing) {
    return NextResponse.json(
      { error: "This client is already on your roster." },
      { status: 409 }
    );
  }

  // Create the coach-client link
  const { error } = await admin.from("coach_clients").insert({
    coach_id: user.id,
    client_id: clientProfile.id,
    status: "active",
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to add client" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    clientId: clientProfile.id,
    clientName: clientProfile.full_name,
  });
}
