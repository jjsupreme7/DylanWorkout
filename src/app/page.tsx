"use client";

import Link from "next/link";
import {
  Dumbbell,
  Flame,
  Trophy,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Check,
  ChevronRight,
  Users,
  Target,
  BarChart3,
} from "lucide-react";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "@/components/ui/scroll-reveal";
import { motion, useReducedMotion } from "framer-motion";

/* ─── Data ─── */

const stats = [
  { value: "87%", label: "Average client compliance rate", icon: Target },
  { value: "14 lbs", label: "Average fat loss in 12 weeks", icon: Flame },
  { value: "5+", label: "Personal records per client monthly", icon: Trophy },
];

const features = [
  {
    icon: Dumbbell,
    title: "Programs built around your life",
    desc: "Not a template. Your training schedule, equipment access, and recovery capacity shape every session. Programs auto-adjust when life gets in the way.",
  },
  {
    icon: Zap,
    title: "AI that actually helps",
    desc: "Scan meals with your camera for instant macro breakdowns. Get smart workout suggestions when you miss a day. No gimmicks, just tools that save time.",
  },
  {
    icon: BarChart3,
    title: "Progress you can see",
    desc: "Auto-detected personal records. Strength curves over time. Body composition trends. The data that matters, without the spreadsheet headaches.",
  },
  {
    icon: Shield,
    title: "A coach who reviews everything",
    desc: "Every check-in gets a personal response. Every program gets adjusted based on your feedback. This is coaching, not a subscription to an app.",
  },
];

const plans = [
  {
    name: "Foundation",
    price: 199,
    period: "/mo",
    features: [
      "Custom training program",
      "Nutrition targets + macros",
      "Full app access",
      "Weekly written check-ins",
    ],
    cta: "Start with Foundation",
    popular: false,
  },
  {
    name: "Performance",
    price: 299,
    period: "/mo",
    features: [
      "Everything in Foundation",
      "2 video calls per month",
      "AI nutrition scanning",
      "Priority coach response (< 6 hrs)",
      "Community access",
    ],
    cta: "Go Performance",
    popular: true,
  },
  {
    name: "Elite",
    price: 499,
    period: "/mo",
    features: [
      "Everything in Performance",
      "Weekly video calls",
      "Direct coach messaging",
      "Custom meal plans",
      "Supplement protocol",
      "Dedicated accountability check-ins",
    ],
    cta: "Go Elite",
    popular: false,
  },
];

const testimonials = [
  {
    name: "Marcus T.",
    detail: "12 weeks in",
    text: "Down 22 lbs and I just hit a 315 deadlift for the first time. The program is tough but the coaching keeps you honest.",
    metric: "-22 lbs",
  },
  {
    name: "Sarah K.",
    detail: "6 months in",
    text: "I tried 3 other coaching programs before this. The difference is Dylan actually reads my check-ins and adjusts my plan every week.",
    metric: "5 PRs",
  },
  {
    name: "Devon R.",
    detail: "8 weeks in",
    text: "Hit 5 PRs in my first month. The workout tracking makes it easy to see progress every session. I actually look forward to logging now.",
    metric: "+40 lbs bench",
  },
];

/* ─── Page ─── */

export default function LandingPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-[100dvh]">
      {/* ──── Nav ──── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
          <span className="font-heading text-lg font-bold tracking-tight">
            ENTER THE <span className="text-brand">DRAGON</span>
          </span>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-[--radius-md] px-3 sm:px-4 py-2 text-sm font-medium text-text-secondary hover:text-text transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/apply"
              className="rounded-[--radius-md] bg-brand px-4 sm:px-5 py-2 text-sm font-medium text-white hover:bg-brand-hover transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      {/* ──── Hero — asymmetric split ──── */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background mesh */}
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-brand/[0.03] blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
            {/* Left — copy */}
            <div>
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 rounded-[--radius-full] bg-brand-muted border border-brand/20 px-3.5 py-1.5 text-xs font-medium text-brand mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                  Accepting new clients
                </div>
              </motion.div>

              <motion.h1
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]"
              >
                Training that
                <br />
                <span className="text-brand">changes how</span>
                <br />
                you move.
              </motion.h1>

              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 text-base sm:text-lg text-text-secondary max-w-[52ch] leading-relaxed"
              >
                Personalized programming, real coaching oversight, and AI-powered
                tracking — built for people who take their training seriously but
                don&apos;t have time to figure it all out alone.
              </motion.p>

              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-col sm:flex-row items-start gap-3"
              >
                <Link
                  href="/apply"
                  className="group inline-flex items-center gap-2.5 rounded-[--radius-md] bg-brand px-7 py-3.5 text-base font-semibold text-white hover:bg-brand-hover transition-all duration-150 shadow-brand"
                >
                  Apply for Coaching
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-[--radius-md] border border-border hover:border-border-hover px-7 py-3.5 text-base font-medium text-text-secondary hover:text-text hover:bg-surface transition-all duration-150"
                >
                  I&apos;m already a member
                </Link>
              </motion.div>

              {/* Trust signal inline */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 flex items-center gap-3"
              >
                <div className="flex">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-surface border-2 border-bg ring-1 ring-border flex items-center justify-center text-[10px] font-semibold text-brand"
                      style={{ marginLeft: i > 0 ? "-8px" : 0, zIndex: 4 - i }}
                    >
                      {["MT", "SK", "DR", "JC"][i]}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-text-muted mt-0.5">Trusted by 40+ active clients</p>
                </div>
              </motion.div>
            </div>

            {/* Right — visual element */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Abstract card stack showing the app */}
                <div className="rounded-[--radius-xl] border border-border bg-card p-6 shadow-[--shadow-elevated]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-[--radius-md] bg-brand-muted flex items-center justify-center">
                      <Dumbbell className="h-5 w-5 text-brand" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-heading text-sm font-semibold">Today&apos;s Session</p>
                      <p className="text-xs text-text-muted">Upper Body — Push Focus</p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { name: "Bench Press", sets: "4x6", weight: "185 lbs" },
                      { name: "OHP", sets: "3x8", weight: "115 lbs" },
                      { name: "Incline DB Press", sets: "3x10", weight: "65 lbs" },
                      { name: "Cable Flyes", sets: "3x12", weight: "30 lbs" },
                    ].map((ex) => (
                      <div key={ex.name} className="flex items-center justify-between rounded-[--radius-md] bg-surface/60 px-3.5 py-2.5">
                        <div>
                          <p className="text-sm font-medium">{ex.name}</p>
                          <p className="text-xs text-text-muted">{ex.sets}</p>
                        </div>
                        <span className="text-sm font-mono tabular-nums text-text-secondary">{ex.weight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating PR notification */}
                <div className="absolute -bottom-4 -left-4 rounded-[--radius-lg] border border-border bg-card px-4 py-3 shadow-[--shadow-elevated] flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gold-muted flex items-center justify-center">
                    <Trophy className="h-4.5 w-4.5 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gold">New PR!</p>
                    <p className="text-xs text-text-muted">Bench Press — 205 lbs</p>
                  </div>
                </div>

                {/* Floating streak badge */}
                <div className="absolute -top-3 -right-3 rounded-[--radius-lg] border border-border bg-card px-4 py-2.5 shadow-[--shadow-elevated] flex items-center gap-2">
                  <Flame className="h-4 w-4 text-brand" strokeWidth={1.5} />
                  <span className="text-sm font-semibold">12 day streak</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──── Stats ──── */}
      <section className="border-y border-border bg-card/50 py-10 sm:py-14">
        <ScrollRevealStagger className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <ScrollRevealItem key={stat.label}>
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 h-12 w-12 rounded-[--radius-lg] bg-brand-muted flex items-center justify-center">
                      <Icon className="h-5 w-5 text-brand" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">{stat.value}</p>
                      <p className="text-sm text-text-muted leading-snug">{stat.label}</p>
                    </div>
                  </div>
                </ScrollRevealItem>
              );
            })}
          </div>
        </ScrollRevealStagger>
      </section>

      {/* ──── How it works — vertical numbered ──── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
                From application to transformation
              </h2>
              <p className="mt-3 text-text-secondary text-base sm:text-lg max-w-[55ch] leading-relaxed">
                No long onboarding. No cookie-cutter PDFs. You apply, we build your plan, and you start training within 48 hours.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealStagger className="mt-12 sm:mt-16 grid grid-cols-1 gap-0">
            {[
              {
                num: "01",
                title: "Apply in 2 minutes",
                desc: "Tell us about your goals, training history, and schedule. We need enough to build something real — not a questionnaire that takes an hour.",
              },
              {
                num: "02",
                title: "Get your custom program",
                desc: "Within 48 hours, your training and nutrition plan lands in the app. Every exercise, every rep range, every macro target — tailored to where you are now.",
              },
              {
                num: "03",
                title: "Train, track, improve",
                desc: "Log workouts in the app. Check in weekly. Your coach reviews everything and adjusts the plan as you progress — not just when you ask.",
              },
            ].map((step, i) => (
              <ScrollRevealItem key={step.num}>
                <div className={`flex gap-6 sm:gap-8 py-8 sm:py-10 ${i > 0 ? "border-t border-border" : ""}`}>
                  <div className="shrink-0">
                    <span className="font-heading text-3xl sm:text-4xl font-bold text-brand/30">{step.num}</span>
                  </div>
                  <div className="max-w-xl">
                    <h3 className="font-heading text-lg sm:text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm sm:text-base text-text-secondary leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* ──── Features — 2-col zig-zag ──── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="max-w-2xl mb-12 sm:mb-16">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
                What you get
              </h2>
              <p className="mt-3 text-text-secondary text-base sm:text-lg leading-relaxed">
                Not features for the sake of features. Every tool here exists because clients asked for it.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={feature.title} delay={i * 0.08}>
                  <div className="group rounded-[--radius-xl] border border-border bg-bg p-6 sm:p-7 hover:border-border-hover transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[--shadow-card] h-full">
                    <div className="h-11 w-11 rounded-[--radius-lg] bg-brand-muted flex items-center justify-center mb-4 group-hover:bg-brand/15 transition-colors">
                      <Icon className="h-5 w-5 text-brand" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-base sm:text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──── Testimonials ──── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
              Real results, not marketing
            </h2>
            <p className="mt-3 text-text-secondary text-base sm:text-lg">
              From people currently in the program.
            </p>
          </ScrollReveal>

          <ScrollRevealStagger className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr_0.8fr] gap-5">
            {testimonials.map((t, i) => (
              <ScrollRevealItem key={t.name}>
                <div className={`rounded-[--radius-xl] border border-border bg-card p-6 h-full flex flex-col ${i === 0 ? "md:row-span-1" : ""}`}>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-text-muted">{t.detail}</p>
                    </div>
                    <span className="font-heading text-sm font-bold text-brand">{t.metric}</span>
                  </div>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* ──── Pricing ──── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
                Pick your level
              </h2>
              <p className="mt-3 text-text-secondary text-base sm:text-lg leading-relaxed">
                All plans include a custom program, app access, and real coaching.
                The difference is how much direct access you get.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <ScrollRevealItem key={plan.name}>
                <div
                  className={`relative rounded-[--radius-xl] border p-6 sm:p-7 flex flex-col h-full ${
                    plan.popular
                      ? "border-brand/40 bg-card shadow-brand"
                      : "border-border bg-card hover:border-border-hover transition-colors"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-6 rounded-[--radius-full] bg-brand px-3.5 py-1 text-xs font-semibold text-white shadow-brand">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <h3 className="font-heading text-lg font-semibold">{plan.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="font-heading text-4xl font-bold tabular-nums">${plan.price}</span>
                      <span className="text-text-muted text-sm">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" strokeWidth={2} />
                        <span className="text-text-secondary">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/apply"
                    className={`mt-7 block w-full rounded-[--radius-md] py-3 text-center text-sm font-semibold transition-all duration-150 ${
                      plan.popular
                        ? "bg-brand text-white hover:bg-brand-hover shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                        : "border border-border text-text hover:bg-surface hover:border-border-hover"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                  <p className="mt-3 text-center text-xs text-text-muted">No contract. Cancel anytime.</p>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* ──── Final CTA ──── */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <ScrollReveal className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
            Stop guessing.<br />Start training.
          </h2>
          <p className="mt-4 text-text-secondary text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Applications take 2 minutes. If we&apos;re a good fit, your custom
            program is ready within 48 hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/apply"
              className="group inline-flex items-center gap-2.5 rounded-[--radius-md] bg-brand px-8 py-3.5 text-base font-semibold text-white hover:bg-brand-hover transition-all duration-150 shadow-brand"
            >
              Apply Now
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <p className="mt-4 text-xs text-text-muted">
            Free consultation. No credit card required.
          </p>
        </ScrollReveal>
      </section>

      {/* ──── Footer ──── */}
      <footer className="border-t border-border bg-card/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading text-sm font-bold tracking-tight">
            ENTER THE <span className="text-brand">DRAGON</span>
          </span>
          <div className="flex items-center gap-6 text-xs text-text-muted">
            <Link href="/apply" className="hover:text-text-secondary transition-colors">Apply</Link>
            <Link href="/login" className="hover:text-text-secondary transition-colors">Sign In</Link>
            <span>&copy; {new Date().getFullYear()} Enter the Dragon</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
