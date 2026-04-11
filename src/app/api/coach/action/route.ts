import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";

// Centralized API route for coach actions that need admin privileges.
// All actions verify the caller is an authenticated coach first.

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = createAdminClient();

  // Verify coach role
  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "coach") {
    return NextResponse.json({ error: "Coaches only" }, { status: 403 });
  }

  const body = await request.json();
  const { action } = body;

  switch (action) {
    // ── Approve/reject application ──
    case "update_application": {
      const { applicationId, status } = body;

      const { error } = await admin
        .from("applications")
        .update({
          status,
          reviewed_by: user.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", applicationId);

      if (error) return NextResponse.json({ error: "Failed to update application" }, { status: 500 });

      // If approved, auto-link client to coach
      if (status === "approved") {
        const { data: app } = await admin
          .from("applications")
          .select("email")
          .eq("id", applicationId)
          .single();

        if (app?.email) {
          const { data: clientProfile } = await admin
            .from("profiles")
            .select("id, role")
            .eq("email", app.email)
            .single();

          if (clientProfile && clientProfile.role === "client") {
            await admin.from("coach_clients").insert({
              coach_id: user.id,
              client_id: clientProfile.id,
              status: "active",
            });
          }
        }
      }

      return NextResponse.json({ success: true });
    }

    // ── Send notifications to clients ──
    case "send_notifications": {
      const { notifications } = body;

      if (!notifications || !Array.isArray(notifications) || notifications.length === 0) {
        return NextResponse.json({ error: "No notifications to send" }, { status: 400 });
      }

      const { error } = await admin.from("notifications").insert(notifications);

      if (error) return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 });
      return NextResponse.json({ success: true, count: notifications.length });
    }

    // ── Submit checkin feedback ──
    case "checkin_feedback": {
      const { checkinId, feedback } = body;

      const { error } = await admin
        .from("checkins")
        .update({
          coach_feedback: feedback,
          status: "reviewed" as const,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", checkinId);

      if (error) return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
      return NextResponse.json({ success: true });
    }

    // ── Batch assign program ──
    case "batch_assign": {
      const { programId, clientIds, startDate } = body;

      const inserts = clientIds.map((clientId: string) => ({
        client_id: clientId,
        program_id: programId,
        start_date: startDate,
      }));

      const { error } = await admin.from("client_programs").insert(inserts);

      if (error) return NextResponse.json({ error: "Failed to assign program" }, { status: 500 });
      return NextResponse.json({ success: true, count: clientIds.length });
    }

    default:
      return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  }
}
