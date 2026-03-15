import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const image = formData.get("image") as File;

  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  // OpenAI Vision API call (requires OPENAI_API_KEY)
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      error: "AI food scanning not configured. Set OPENAI_API_KEY to enable.",
    }, { status: 503 });
  }

  const buffer = await image.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: 'Analyze this food image. Return JSON with: { "food_name": string, "calories": number, "protein": number, "carbs": number, "fat": number, "serving_size": string }. Be as accurate as possible with macro estimates.',
            },
            {
              type: "image_url",
              image_url: { url: `data:${image.type};base64,${base64}` },
            },
          ],
        },
      ],
      max_tokens: 300,
    }),
  });

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  try {
    const jsonMatch = content?.match(/\{[\s\S]*\}/);
    const macros = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    return NextResponse.json(macros ?? { error: "Could not parse food data" });
  } catch {
    return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
  }
}
