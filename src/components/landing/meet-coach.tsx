"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { coach } from "@/lib/data/coach";
import { Award } from "lucide-react";

export function MeetCoach() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-bg/80" />
      <div className="absolute inset-0 section-gradient" />

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-wider">
              Meet Your <span className="text-brand">Coach</span>
            </h2>
            <div className="w-24 h-1 bg-brand mx-auto mt-6 mb-6" />
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Not a chatbot. Not an algorithm. A real coach who reads every check-in and adjusts every program.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          {/* Left — portrait with pop-out frame */}
          <ScrollReveal>
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              <div className="rounded-lg overflow-hidden border-2 border-brand/40 shadow-brand rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover aspect-[4/5]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              {/* Floating credential badge */}
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 rounded-[--radius-lg] border border-border bg-card px-4 py-2.5 shadow-[--shadow-elevated] flex items-center gap-2">
                <Award className="h-4 w-4 text-terracotta" strokeWidth={1.5} />
                <span className="text-sm font-semibold">NASM Certified</span>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Right — bio, philosophy, stats */}
          <ScrollReveal delay={0.1}>
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold">
                {coach.name}
              </h3>
              <p className="text-sm text-terracotta font-medium mt-1">
                {coach.title}
              </p>

              <p className="mt-5 text-base text-text-secondary leading-relaxed">
                {coach.bio}
              </p>

              {/* Philosophy pull-quote */}
              <blockquote className="mt-6 pl-4 border-l-2 border-brand">
                <p className="text-base italic text-text leading-relaxed">
                  &ldquo;{coach.philosophy}&rdquo;
                </p>
              </blockquote>

              {/* Credentials */}
              <div className="mt-6 flex flex-wrap gap-2">
                {coach.credentials.map((cred) => (
                  <span
                    key={cred}
                    className="rounded-[--radius-full] bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary border border-border"
                  >
                    {cred}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {coach.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
