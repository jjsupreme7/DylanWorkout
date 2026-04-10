"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Tabs } from "@/components/ui/tabs";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { programs } from "@/lib/data/programs";
import { Dumbbell, Calendar, Clock, Gauge } from "lucide-react";

const STAT_ICONS = [Calendar, Dumbbell, Clock, Gauge];

const tabs = programs.map((p) => ({ id: p.id, label: p.name }));

export function ProgramSelector() {
  const [activeId, setActiveId] = useState<string>(programs[0].id);
  const prefersReducedMotion = useReducedMotion();
  const active = programs.find((p) => p.id === activeId) ?? programs[0];

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-bg/80" />
      <div className="absolute inset-0 section-gradient" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-wider">
              Find Your <span className="text-brand">Program</span>
            </h2>
            <div className="w-24 h-1 bg-brand mx-auto mt-6 mb-6" />
            <p className="text-text-secondary text-base sm:text-lg max-w-[55ch] leading-relaxed mx-auto">
              Every client gets a custom plan, but the foundation starts with your goal. Pick a direction — we dial in the details.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 sm:mt-14">
            <Tabs
              tabs={tabs}
              activeTab={activeId}
              onChange={setActiveId}
              className="max-w-md"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8"
              >
                {/* Left — image + description */}
                <div>
                  <div className="rounded-lg overflow-hidden border border-brand/20">
                    <Image
                      src={active.image}
                      alt={active.name}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover aspect-[4/3]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <h3 className="mt-5 font-heading text-xl sm:text-2xl font-bold">
                    {active.tagline}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-text-secondary leading-relaxed">
                    {active.description}
                  </p>
                </div>

                {/* Right — sample week + stats */}
                <div className="flex flex-col gap-6">
                  {/* Sample week */}
                  <div className="rounded-lg border border-brand/20 bg-black/70 p-5 sm:p-6 hover:border-brand/80 transition-all duration-300">
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
                      Sample Week
                    </p>
                    <div className="space-y-3">
                      {active.sampleWeek.map((day) => (
                        <div
                          key={day.day}
                          className="flex items-center justify-between rounded-[--radius-md] bg-surface/60 px-3.5 py-2.5"
                        >
                          <div>
                            <span className="text-sm font-semibold text-brand mr-3">
                              {day.day}
                            </span>
                            <span className="text-sm text-text-secondary">
                              {day.focus}
                            </span>
                          </div>
                          <span className="text-xs text-text-muted">
                            {day.exercises} exercises
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {active.stats.map((stat, i) => {
                      const Icon = STAT_ICONS[i];
                      return (
                        <div
                          key={stat.label}
                          className="rounded-lg border border-brand/20 bg-black/70 p-4"
                        >
                          <Icon className="h-4 w-4 text-brand mb-2" strokeWidth={1.5} />
                          <p className="font-heading text-lg font-bold">{stat.value}</p>
                          <p className="text-xs text-text-muted">{stat.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
