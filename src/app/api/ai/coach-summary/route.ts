import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "AI not configured" }, { status: 503 });
  }

  const { clientId } = await request.json();

  // Verify coach has access to this client
  const { data: relationship } = await supabase
    .from("coach_clients")
    .select("id")
    .eq("coach_id", user.id)
    .eq("client_id", clientId)
    .single();

  if (!relationship) {
    return NextResponse.json({ error: "Not your client" }, { status: 403 });
  }

  // Gather client data
  const [sessions, checkins, prs] = await Promise.all([
    supabase
      .from("workout_sessions")
      .select("*")
      .eq("client_id", clientId)
      .order("started_at", { ascending: false })
      .limit(10),
    supabase
      .from("checkins")
      .select("*")
      .eq("client_id", clientId)
      .order("submitted_at", { ascending: false })
      .limit(4),
    supabase
      .from("personal_records")
      .select("*, exercise:exercises(name)")
      .eq("client_id", clientId)
      .order("achieved_at", { ascending: false })
      .limit(5),
  ]);

  const prompt = `Summarize this client's recent progress for their coach. Be concise and actionable.

Recent sessions: ${JSON.stringify(sessions.data?.slice(0, 5))}
Recent check-ins: ${JSON.stringify(checkins.data?.slice(0, 2))}
Recent PRs: ${JSON.stringify(prs.data)}

Provide:
1. Overall trend (improving/plateauing/declining)
2. Key highlights
3. Areas of concern
4. Suggested coaching actions`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an experienced fitness coach assistant." },
        { role: "user", content: prompt },
      ],
    }),
  });

  const data = await response.json();
  const summary = data.choices?.[0]?.message?.content ?? "Unable to generate summary.";

  return NextResponse.json({ summary });
}
