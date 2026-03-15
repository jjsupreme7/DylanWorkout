"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 199,
    interval: "mo",
    features: [
      "Custom training program",
      "Macro targets",
      "App access",
      "Weekly check-ins",
    ],
    popular: false,
  },
  {
    id: "standard",
    name: "Standard",
    price: 299,
    interval: "mo",
    features: [
      "Everything in Basic",
      "1:1 video calls (2x/mo)",
      "AI workout builder",
      "Priority coach response",
      "Community access",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 499,
    interval: "mo",
    features: [
      "Everything in Standard",
      "Weekly video calls",
      "Real-time coach chat",
      "Custom meal plans",
      "Program adjustments anytime",
      "Dedicated accountability",
    ],
    popular: false,
  },
];

export default function SubscriptionPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleSubscribe(planId: string) {
    setLoading(planId);

    try {
      const res = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (data.error === "Stripe not configured") {
        toast.error("Payments are not set up yet. Contact your coach.");
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to start checkout");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Choose Your Plan</h1>
        <p className="text-sm text-text-secondary mt-1">
          Select the coaching tier that fits your goals
        </p>
      </div>

      <div className="grid gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`p-5 relative ${
              plan.popular ? "border-brand shadow-lg shadow-brand/5" : ""
            }`}
          >
            {plan.popular && (
              <Badge variant="active" className="absolute -top-2.5 right-4 text-xs">
                Most Popular
              </Badge>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold">{plan.name}</h2>
                <div className="mt-1">
                  <span className="text-3xl font-black">${plan.price}</span>
                  <span className="text-text-secondary text-sm">/{plan.interval}</span>
                </div>
              </div>
            </div>

            <ul className="space-y-2 mb-5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  <span className="text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleSubscribe(plan.id)}
              disabled={loading !== null}
              className="w-full"
              variant={plan.popular ? "primary" : "secondary"}
            >
              {loading === plan.id ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Redirecting...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4" />
                  Subscribe
                </>
              )}
            </Button>
          </Card>
        ))}
      </div>

      <p className="text-xs text-text-muted text-center">
        Payments are processed securely via Stripe. Cancel anytime.
      </p>
    </div>
  );
}
