import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "AI chat not configured" }, { status: 503 });
  }

  const { message, history } = await request.json();

  // Fetch user's nutrition targets for context
  const { data: targets } = await supabase
    .from("nutrition_targets")
    .select("*")
    .eq("client_id", user.id)
    .order("effective_date", { ascending: false })
    .limit(1)
    .single();

  const systemPrompt = `You are a helpful nutrition coach AI assistant. ${
    targets
      ? `The user's macro targets are: ${targets.calories} cal, ${targets.protein}g protein, ${targets.carbs}g carbs, ${targets.fat}g fat.`
      : ""
  } Give concise, practical nutrition advice. Be encouraging but honest.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        ...(history ?? []),
        { role: "user", content: message },
      ],
    }),
  });

  // Return the stream directly
  return new NextResponse(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
