import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are an expert fitness coach AI that converts text descriptions of workouts into structured JSON workout data.

Given a text description of a workout program, extract and structure the following information:

1. Program name (infer from context if not explicitly stated)
2. Program description
3. Difficulty level (beginner, intermediate, or advanced)
4. Duration in weeks (if mentioned)
5. Training days, each containing:
   - Day name (e.g., "Push Day", "Upper Body A")
   - Exercises with: name, sets, reps, weight (if mentioned)

Rules:
- If reps are a range like "8-12", keep it as a string
- If weight is mentioned, include it as a number in lbs
- If sets aren't specified, default to 3
- If reps aren't specified, default to "8-12"
- Muscle group should be one of: Chest, Back, Shoulders, Biceps, Triceps, Quadriceps, Hamstrings, Glutes, Calves, Core, Full Body
- Keep exercise names clean and standard (e.g., "Barbell Bench Press" not "bench")

Respond with ONLY valid JSON in this exact format:
{
  "name": "Program Name",
  "description": "Brief description",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "duration_weeks": number | null,
  "days": [
    {
      "name": "Day Name",
      "exercises": [
        {
          "name": "Exercise Name",
          "muscle_group": "Muscle Group",
          "sets": 3,
          "reps": "8-12",
          "weight": null
        }
      ]
    }
  ]
}`;

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

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "AI not configured. Set ANTHROPIC_API_KEY in your environment." },
      { status: 503 }
    );
  }

  const { text } = await request.json();
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json({ error: "No workout text provided" }, { status: 400 });
  }

  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Convert this workout description into structured JSON:\n\n${text}`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Extract JSON from the response (handle markdown code blocks)
    let jsonStr = responseText;
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    const workout = JSON.parse(jsonStr);

    return NextResponse.json({ workout });
  } catch (error: any) {
    console.error("AI workout generation error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "AI returned invalid format. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to generate workout" },
      { status: 500 }
    );
  }
}
