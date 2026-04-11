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

      // Send notifications to all assigned clients
      const { data: prog } = await admin.from("programs").select("name").eq("id", programId).single();
      if (prog) {
        const notifications = clientIds.map((clientId: string) => ({
          user_id: clientId,
          title: "New program assigned!",
          body: `Your coach assigned you: ${prog.name}. Check your Workout tab!`,
          type: "program_assigned",
        }));
        await admin.from("notifications").insert(notifications);
      }

      return NextResponse.json({ success: true, count: clientIds.length });
    }

    // ── Unassign program from client ──
    case "unassign_program": {
      const { clientProgramId, clientId } = body;

      const { data: cp, error } = await admin
        .from("client_programs")
        .update({ is_active: false, end_date: new Date().toISOString().split("T")[0] })
        .eq("id", clientProgramId)
        .select("program:programs(name)")
        .single();

      if (error) return NextResponse.json({ error: "Failed to unassign program" }, { status: 500 });

      // Notify client
      if (cp?.program) {
        await admin.from("notifications").insert({
          user_id: clientId,
          title: "Program update",
          body: `Your program "${(cp.program as any).name}" has been unassigned. Your coach will assign a new one soon.`,
          type: "program_unassigned",
        });
      }

      return NextResponse.json({ success: true });
    }

    // ── Swap program for client ──
    case "swap_program": {
      const { clientId: swapClientId, oldClientProgramId, newProgramId, startDate } = body;

      // Deactivate old program
      if (oldClientProgramId) {
        await admin
          .from("client_programs")
          .update({ is_active: false, end_date: new Date().toISOString().split("T")[0] })
          .eq("id", oldClientProgramId);
      }

      // Assign new program
      const { error } = await admin.from("client_programs").insert({
        client_id: swapClientId,
        program_id: newProgramId,
        start_date: startDate,
      });

      if (error) return NextResponse.json({ error: "Failed to swap program" }, { status: 500 });

      // Notify client
      const { data: newProg } = await admin.from("programs").select("name").eq("id", newProgramId).single();
      if (newProg) {
        await admin.from("notifications").insert({
          user_id: swapClientId,
          title: "New program assigned!",
          body: `Your coach switched you to: ${newProg.name}. Check your Workout tab!`,
          type: "program_assigned",
        });
      }

      return NextResponse.json({ success: true });
    }

    // ── Duplicate program ──
    case "duplicate_program": {
      const { programId: dupProgramId } = body;

      // Fetch original program with full structure
      const { data: original, error: fetchErr } = await admin
        .from("programs")
        .select(`*, program_days(*, program_exercises(*))`)
        .eq("id", dupProgramId)
        .single();

      if (fetchErr || !original) return NextResponse.json({ error: "Program not found" }, { status: 404 });

      // Create new program
      const { data: newProgram, error: progErr } = await admin
        .from("programs")
        .insert({
          coach_id: user.id,
          name: `${original.name} (Copy)`,
          description: original.description,
          duration_weeks: original.duration_weeks,
          difficulty: original.difficulty,
          is_template: false,
        })
        .select()
        .single();

      if (progErr || !newProgram) return NextResponse.json({ error: "Failed to duplicate program" }, { status: 500 });

      // Copy all days and exercises
      for (const day of (original.program_days ?? [])) {
        const { data: newDay } = await admin
          .from("program_days")
          .insert({
            program_id: newProgram.id,
            day_number: day.day_number,
            name: day.name,
            notes: day.notes,
          })
          .select()
          .single();

        if (newDay && day.program_exercises?.length) {
          const exerciseInserts = day.program_exercises.map((pe: any) => ({
            program_day_id: newDay.id,
            exercise_id: pe.exercise_id,
            order_index: pe.order_index,
            sets: pe.sets,
            reps: pe.reps,
            rest_seconds: pe.rest_seconds,
            tempo: pe.tempo,
            rpe: pe.rpe,
            notes: pe.notes,
          }));
          await admin.from("program_exercises").insert(exerciseInserts);
        }
      }

      return NextResponse.json({ success: true, programId: newProgram.id });
    }

    default:
      return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  }
}
