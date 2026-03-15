import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
  });
}

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  const stripe = getStripe();
  const PRICE_IDS: Record<string, string> = {
    basic: process.env.STRIPE_PRICE_BASIC ?? "",
    standard: process.env.STRIPE_PRICE_STANDARD ?? "",
    premium: process.env.STRIPE_PRICE_PREMIUM ?? "",
  };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plan } = await request.json();
  const priceId = PRICE_IDS[plan];

  if (!priceId) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    client_reference_id: user.id,
    metadata: { plan_name: plan },
    success_url: `${request.nextUrl.origin}/client/dashboard?checkout=success`,
    cancel_url: `${request.nextUrl.origin}/client/dashboard?checkout=canceled`,
  });

  return NextResponse.json({ url: session.url });
}
