"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Dumbbell,
  Flame,
  Trophy,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Check,
  Target,
  BarChart3,
} from "lucide-react";
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from "@/components/ui/scroll-reveal";
import { motion, useReducedMotion } from "framer-motion";
import { HeroImage } from "@/components/landing/hero-image";
import { ProgramSelector } from "@/components/landing/program-selector";
import { MeetCoach } from "@/components/landing/meet-coach";
import { ImageWithOverlay } from "@/components/ui/image-with-overlay";
import { Avatar } from "@/components/ui/avatar";
import { SectionDivider } from "@/components/landing/section-divider";
import { SectionIndicator } from "@/components/landing/section-indicator";

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
    name: "Bronze",
    price: 199,
    period: "/mo",
    color: "#cd7f32",
    features: [
      "Custom training program",
      "Nutrition targets + macros",
      "Full app access",
      "Weekly written check-ins",
    ],
    cta: "Start with Bronze",
    tier: "bronze" as const,
  },
  {
    name: "Silver",
    price: 299,
    period: "/mo",
    color: "#C0C0C0",
    features: [
      "Everything in Bronze",
      "2 video calls per month",
      "AI nutrition scanning",
      "Priority coach response (< 6 hrs)",
      "Community access",
    ],
    cta: "Go Silver",
    tier: "silver" as const,
  },
  {
    name: "Gold",
    price: 499,
    period: "/mo",
    color: "#F5A623",
    features: [
      "Everything in Silver",
      "Weekly video calls",
      "Direct coach messaging",
      "Custom meal plans",
      "Supplement protocol",
      "Dedicated accountability check-ins",
    ],
    cta: "Go Gold",
    tier: "gold" as const,
  },
];

const testimonials = [
  {
    name: "Marcus T.",
    avatar: "/images/testimonials/marcus-t.jpg",
    detail: "12 weeks in",
    text: "Down 22 lbs and I just hit a 315 deadlift for the first time. The program is tough but the coaching keeps you honest.",
    metric: "-22 lbs",
  },
  {
    name: "Sarah K.",
    avatar: "/images/testimonials/sarah-k.jpg",
    detail: "6 months in",
    text: "I tried 3 other coaching programs before this. The difference is Dylan actually reads my check-ins and adjusts my plan every week.",
    metric: "5 PRs",
  },
  {
    name: "Devon R.",
    avatar: "/images/testimonials/devon-r.jpg",
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
      {/* ──── Fixed Background ──── */}
      <div className="fixed inset-0 z-[-2]">
        <Image
          src="/images/backgrounds/website-background.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="fixed inset-0 z-[-1] bg-bg/80" />

      {/* ──── Scroll Indicator ──── */}
      <SectionIndicator />

      {/* ──── Nav ──── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-brand/20 py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-1.5">
          <span className="font-heading text-lg font-bold tracking-wider">
            ENTER THE <span className="text-brand">DRAGON</span>
          </span>
          <div className="hidden md:flex items-center gap-2">
            {[
              { label: "PROGRAMS", href: "#programs" },
              { label: "FEATURES", href: "#features" },
              { label: "COACH", href: "#coach" },
              { label: "RESULTS", href: "#results" },
              { label: "PRICING", href: "#pricing" },
            ].map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                className="font-heading text-sm tracking-wider px-3.5 py-2 rounded-[--radius-md] border border-brand/30 text-text hover:bg-brand/10 hover:text-brand hover:border-brand transition-all duration-300"
              >
                {tab.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-[--radius-md] px-3 sm:px-4 py-2 text-sm font-medium text-text-secondary hover:text-brand transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/apply"
              className="rounded-[--radius-md] bg-brand px-4 sm:px-5 py-2 text-sm font-bold text-black hover:bg-brand-hover hover:scale-105 transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      {/* ──── Hero ──── */}
      <section id="home" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/5 to-black/20" />

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
                className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-wider leading-[1.1]"
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
                  className="group inline-flex items-center gap-2.5 rounded-[--radius-md] bg-brand px-7 py-3.5 text-base font-bold text-black hover:bg-brand-hover hover:scale-105 transition-all duration-300 shadow-brand"
                >
                  Apply for Coaching
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-[--radius-md] border border-brand/50 text-brand hover:bg-brand/10 px-7 py-3.5 text-base font-medium hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  I&apos;m already a member
                </Link>
              </motion.div>

              {/* Trust signal */}
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
                      <Star key={i} className="h-3.5 w-3.5 fill-brand text-brand" />
                    ))}
                  </div>
                  <p className="text-text-muted mt-0.5">Trusted by 40+ active clients</p>
                </div>
              </motion.div>
            </div>

            {/* Right — hero image */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden lg:block"
            >
              <HeroImage />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──── Stats ──── */}
      <section className="relative py-10 sm:py-14">
        <div className="absolute inset-0 bg-bg/80" />
        <div className="absolute inset-0 section-gradient" />
        <ScrollRevealStagger className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <ScrollRevealItem key={stat.label}>
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-brand" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-heading text-2xl sm:text-3xl font-bold tracking-wider">{stat.value}</p>
                      <p className="text-sm text-text-muted leading-snug">{stat.label}</p>
                    </div>
                  </div>
                </ScrollRevealItem>
              );
            })}
          </div>
        </ScrollRevealStagger>
      </section>

      <SectionDivider />

      {/* ──── Program Selector ──── */}
      <div id="programs" className="scroll-mt-16">
        <ProgramSelector />
      </div>

      <SectionDivider />

      {/* ──── Features ──── */}
      <section id="features" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 bg-bg/80" />
        <div className="absolute inset-0 section-gradient" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-wider">
                What You <span className="text-brand">Get</span>
              </h2>
              <div className="w-24 h-1 bg-brand mx-auto mt-6 mb-6" />
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                Not features for the sake of features. Every tool here exists because clients asked for it.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <ScrollReveal key={feature.title} delay={i * 0.08}>
                  <div className="group rounded-lg border border-brand/20 bg-black/70 p-6 sm:p-7 hover:border-brand/80 transition-all duration-300 hover:shadow-lg hover:shadow-brand/20 h-full">
                    <div className="h-14 w-14 rounded-full bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                      <Icon className="h-6 w-6 text-brand" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-semibold tracking-wider">{feature.title}</h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ──── Meet Your Coach ──── */}
      <div id="coach" className="scroll-mt-16">
        <MeetCoach />
      </div>

      <SectionDivider />

      {/* ──── Testimonials ──── */}
      <section id="results" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-16">
        <div className="absolute inset-0 bg-bg/80" />
        <div className="absolute inset-0 section-gradient" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-wider">
                Real <span className="text-brand">Results</span>
              </h2>
              <div className="w-24 h-1 bg-brand mx-auto mt-6 mb-6" />
              <p className="text-text-secondary text-base sm:text-lg">
                From people currently in the program.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr_0.8fr] gap-5">
            {testimonials.map((t) => (
              <ScrollRevealItem key={t.name}>
                <div className="rounded-lg border border-brand/20 bg-black/70 p-6 h-full flex flex-col hover:border-brand/80 transition-all duration-300 hover:shadow-lg hover:shadow-brand/20">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-brand text-brand" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-brand/20">
                    <div className="flex items-center gap-3">
                      <Avatar src={t.avatar} name={t.name} size="sm" />
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-text-muted">{t.detail}</p>
                      </div>
                    </div>
                    <span className="font-heading text-sm font-bold text-brand">{t.metric}</span>
                  </div>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      <SectionDivider />

      {/* ──── Pricing — Metallic Tiers ──── */}
      <section id="pricing" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 scroll-mt-16">
        <div className="absolute inset-0 bg-bg/80" />
        <div className="absolute inset-0 section-gradient" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-wider">
                Pick Your <span className="text-brand">Level</span>
              </h2>
              <div className="w-24 h-1 bg-brand mx-auto mt-6 mb-6" />
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                All plans include a custom program, app access, and real coaching.
                The difference is how much direct access you get.
              </p>
            </div>
          </ScrollReveal>

          <ScrollRevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <ScrollRevealItem key={plan.name}>
                <div
                  className="rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    border: `2px solid ${plan.color}`,
                    background: `linear-gradient(to bottom, ${plan.color}20, #000000)`,
                    boxShadow: `0 0 15px 5px ${plan.color}30, -8px 0 20px -3px ${plan.color}40, 8px 0 20px -3px ${plan.color}40`,
                  }}
                >
                  <div className="p-4 text-center" style={{ backgroundColor: plan.color }}>
                    <h3 className="text-2xl font-bold text-black font-heading tracking-wider">{plan.name}</h3>
                    <p className="text-xl font-bold text-black mt-1">${plan.price}{plan.period}</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm">
                          <Check className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={2} style={{ color: plan.color }} />
                          <span className="text-text-secondary">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/apply"
                      className="mt-7 block w-full rounded-[--radius-md] py-3 text-center text-sm font-bold text-black transition-all duration-300 hover:scale-105"
                      style={{ backgroundColor: plan.color }}
                    >
                      {plan.cta}
                    </Link>
                    <p className="mt-3 text-center text-xs text-text-muted">No contract. Cancel anytime.</p>
                  </div>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* ──── Final CTA ──── */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-bg/80" />
        <div className="absolute inset-0 mesh-gradient" />
        <ScrollReveal className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-wider">
            Stop Guessing.<br /><span className="text-brand">Start Training.</span>
          </h2>
          <div className="w-24 h-1 bg-brand mx-auto mt-6 mb-6" />
          <p className="text-text-secondary text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Applications take 2 minutes. If we&apos;re a good fit, your custom
            program is ready within 48 hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/apply"
              className="group inline-flex items-center gap-2.5 rounded-[--radius-md] bg-brand px-8 py-3.5 text-base font-bold text-black hover:bg-brand-hover hover:scale-105 transition-all duration-300 shadow-brand"
            >
              Apply Now
              <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-[--radius-md] border border-brand/50 text-brand hover:bg-brand/10 px-8 py-3.5 text-base font-medium transition-all duration-300 bg-transparent"
            >
              I&apos;m a Member
            </Link>
          </div>
          <p className="mt-4 text-xs text-text-muted">
            Free consultation. No credit card required.
          </p>
        </ScrollReveal>
      </section>

      {/* ──── Footer ──── */}
      <footer className="border-t border-brand/20 bg-black py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-heading text-sm font-bold tracking-wider">
            ENTER THE <span className="text-brand">DRAGON</span>
          </span>
          <div className="flex items-center gap-6 text-xs text-text-muted">
            <Link href="/apply" className="hover:text-brand transition-colors">Apply</Link>
            <Link href="/login" className="hover:text-brand transition-colors">Sign In</Link>
            <span>&copy; {new Date().getFullYear()} Enter the Dragon</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
