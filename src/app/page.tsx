import Link from "next/link";
import { Dumbbell, Flame, Trophy, ChevronRight, Star, Zap, Shield } from "lucide-react";

const stats = [
  { value: "87%", label: "Avg Compliance" },
  { value: "14 lbs", label: "Avg Fat Loss" },
  { value: "5+", label: "PRs per Client" },
];

const steps = [
  { num: "01", title: "Apply", desc: "Fill out a quick application so we can learn about your goals." },
  { num: "02", title: "Get Your Plan", desc: "Receive a custom training & nutrition program built for you." },
  { num: "03", title: "Transform", desc: "Follow the plan, track progress, and hit goals you never thought possible." },
];

const plans = [
  {
    name: "Basic",
    price: 199,
    features: ["Custom training program", "Nutrition targets", "App access", "Weekly check-ins"],
    popular: false,
  },
  {
    name: "Standard",
    price: 299,
    features: [
      "Everything in Basic",
      "1:1 video calls (2x/mo)",
      "AI nutrition scanning",
      "Priority coach response",
      "Community access",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: 499,
    features: [
      "Everything in Standard",
      "Weekly video calls",
      "Real-time coach chat",
      "Custom meal plans",
      "Supplement guidance",
      "Accountability partner",
    ],
    popular: false,
  },
];

const testimonials = [
  { name: "Marcus T.", text: "Down 22 lbs and stronger than I've ever been. The program is intense but the coaching keeps you on track.", rating: 5 },
  { name: "Sarah K.", text: "Finally found a program that adapts to my schedule. The AI food scanner is a game-changer for tracking macros.", rating: 5 },
  { name: "Devon R.", text: "Hit 5 PRs in my first month. The workout tracking makes it easy to see progress every single session.", rating: 5 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold tracking-tight">
            ENTER THE <span className="text-brand">DRAGON</span>
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary hover:text-text transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/apply"
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9]">
            ENTER THE
            <br />
            <span className="text-brand">DRAGON</span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            Elite coaching that combines cutting-edge AI with proven training methodologies.
            Your transformation starts here.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-3.5 text-base font-semibold text-white hover:bg-brand-hover transition-colors"
            >
              Start Your Transformation
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 text-base font-medium text-text-secondary hover:bg-surface transition-colors"
            >
              I&apos;m Already a Member
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card py-12">
        <div className="mx-auto max-w-4xl grid grid-cols-3 gap-8 px-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-brand">{stat.value}</p>
              <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand text-lg font-bold">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-card border-y border-border">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Dumbbell, title: "Custom Programs", desc: "Training built for your goals, schedule, and experience level" },
              { icon: Zap, title: "AI-Powered Tracking", desc: "Scan meals with AI, auto-detect PRs, get smart insights" },
              { icon: Flame, title: "Streak System", desc: "Stay motivated with streaks, milestones, and achievements" },
              { icon: Trophy, title: "PR Detection", desc: "Automatic personal record tracking with celebrations" },
              { icon: Shield, title: "Coach Oversight", desc: "Your coach reviews every check-in and adjusts your plan" },
              { icon: Star, title: "Community", desc: "Connect with other clients, share wins, ask questions" },
            ].map((feature) => (
              <div key={feature.title} className="rounded-xl border border-border bg-bg p-5">
                <feature.icon className="h-6 w-6 text-brand mb-3" />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-1 text-sm text-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-center text-text-secondary mb-12">Choose the level of support you need</p>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl border p-6 ${
                  plan.popular
                    ? "border-brand bg-card shadow-lg shadow-brand/10 relative"
                    : "border-border bg-card"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-3">
                  <span className="text-4xl font-black">${plan.price}</span>
                  <span className="text-text-secondary">/mo</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <ChevronRight className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                      <span className="text-text-secondary">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/apply"
                  className={`mt-6 block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
                    plan.popular
                      ? "bg-brand text-white hover:bg-brand-hover"
                      : "border border-border text-text hover:bg-surface"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-card border-y border-border">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">What Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl border border-border bg-bg p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-3 text-sm font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform?</h2>
        <p className="text-text-secondary mb-8 max-w-lg mx-auto">
          Apply now and start your journey with a coach who understands where you want to go.
        </p>
        <Link
          href="/apply"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-3.5 text-base font-semibold text-white hover:bg-brand-hover transition-colors"
        >
          Apply Now
          <ChevronRight className="h-5 w-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 px-4">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold tracking-tight">
            ENTER THE <span className="text-brand">DRAGON</span>
          </span>
          <p className="text-xs text-text-muted">&copy; {new Date().getFullYear()} Enter the Dragon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
