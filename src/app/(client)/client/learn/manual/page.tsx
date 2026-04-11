"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  FileText,
  Download,
  ExternalLink,
  ArrowLeft,
  BookOpen,
  Dumbbell,
  Utensils,
  Moon,
  Activity,
  Target,
  Shield,
} from "lucide-react";

const TABLE_OF_CONTENTS = [
  {
    part: "Part I",
    title: "The Why",
    subtitle: "Philosophy and principles",
    icon: BookOpen,
    topics: [
      "Why weight training is superior to all forms of training",
      "Comprehensive health benefits across 10 body systems",
      "Why weight training beats other exercise modalities",
    ],
  },
  {
    part: "Part II",
    title: "The How",
    subtitle: "Strategy, method, and execution",
    icon: Target,
    topics: [
      "The Cardio & Daily Activity Guide — NEAT, 10k steps, movement as lifestyle",
      "The Nutrition Guide — calorie formulas, protein priority, reverse dieting",
      "The Sleep Guide — 7-9 hours, caffeine/alcohol rules, recovery optimization",
      "The Resistance Training Guide — myths debunked, progressive overload, quality vs quantity",
    ],
  },
  {
    part: "Part III",
    title: "The What",
    subtitle: "Exercises, movements, and programming",
    icon: Dumbbell,
    topics: [
      "43 Major Training Truths",
      "Picking a program and making it work",
      "Biasing towards different goals (Rehab, Strength, Hypertrophy, Hybrid)",
      "Male vs. female training differences",
      "Styles of strength — powerlifting, bodybuilding, calisthenics, Olympic lifting, CrossFit",
    ],
  },
  {
    part: "Part IV",
    title: "Where This Applies",
    subtitle: "Biomechanics, technique, and exercise index",
    icon: Shield,
    topics: [
      "Basic biomechanics of strength movements",
      "Body parts and their functions",
      "Technique cues for the Big 7 — Squat, Deadlift, RDL, Bench, OHP, Row, Pull-up",
      "Addressing weaknesses and sticking points",
      "Complete exercise index organized by movement pattern and muscle group",
    ],
  },
];

const KEY_PRINCIPLES = [
  {
    icon: Dumbbell,
    title: "Build Strength",
    desc: "Strength is the mother quality. Without it, there is no muscle, endurance, stability, or athleticism.",
  },
  {
    icon: Utensils,
    title: "Eat Smart",
    desc: "Replace processed foods with well-seasoned whole foods. Protein first, then veggies, then starches.",
  },
  {
    icon: Moon,
    title: "Sleep Hard",
    desc: "Muscle growth happens during sleep. 7-9 hours, dark room, no caffeine after 2 PM.",
  },
  {
    icon: Activity,
    title: "Move Daily",
    desc: "8-12k steps per day. Make movement a lifestyle, not an event. NEAT beats cardio for fat loss.",
  },
];

export default function ManualPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/client/learn"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-brand transition-colors mb-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Learn
        </Link>
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
            <FileText className="h-5.5 w-5.5 text-brand" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Enter the Dragon v.2</h1>
            <p className="text-sm text-text-secondary">The Complete Strength & Health Guide by Delan Chan</p>
          </div>
        </div>
      </div>

      {/* Download / Read actions */}
      <Card className="p-5">
        <p className="text-sm text-text-secondary leading-relaxed">
          60 pages covering everything you need to know about training, nutrition, sleep, cardio,
          biomechanics, and exercise technique. This is the guide you&apos;ll come back to again and again.
        </p>
        <p className="text-xs text-text-muted mt-2">PDF - 2.2 MB</p>
        <div className="flex gap-3 mt-4">
          <a
            href="/enter-the-dragon-guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-bold text-black hover:bg-brand-hover hover:scale-[1.02] transition-all duration-200"
          >
            <ExternalLink className="h-4 w-4" />
            Read Guide
          </a>
          <a
            href="/enter-the-dragon-guide.pdf"
            download="Enter the Dragon v2 - Complete Guide.pdf"
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-brand/30 px-4 py-3 text-sm font-medium text-brand hover:bg-brand/10 transition-all duration-200"
          >
            <Download className="h-4 w-4" />
            Download
          </a>
        </div>
      </Card>

      {/* Key Principles */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">The 4 Pillars</p>
        <div className="grid grid-cols-2 gap-3">
          {KEY_PRINCIPLES.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.title} className="p-4">
                <Icon className="h-5 w-5 text-brand mb-2" strokeWidth={1.5} />
                <p className="text-sm font-semibold">{p.title}</p>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">{p.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Table of Contents */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">What&apos;s Inside</p>
        <div className="space-y-3">
          {TABLE_OF_CONTENTS.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.part} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-4.5 w-4.5 text-brand" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-brand tracking-wider">{section.part}</span>
                    </div>
                    <p className="text-sm font-semibold mt-0.5">{section.title}</p>
                    <p className="text-xs text-text-muted">{section.subtitle}</p>
                    <ul className="mt-2.5 space-y-1.5">
                      {section.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2 text-xs text-text-secondary">
                          <span className="text-brand mt-0.5 shrink-0">-</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
