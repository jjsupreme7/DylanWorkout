"use client";

import { useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dumbbell,
  Target,
  TrendingUp,
  Utensils,
  Zap,
  ChevronDown,
  ChevronRight,
  BookOpen,
} from "lucide-react";

const tabs = [
  { id: "principles", label: "Principles" },
  { id: "movements", label: "Movements" },
  { id: "nutrition", label: "Nutrition" },
  { id: "progression", label: "Progression" },
];

interface LessonCard {
  title: string;
  content: string[];
  icon?: any;
}

const principles: LessonCard[] = [
  {
    title: "Strength is the Mother Quality",
    content: [
      "Without strength, there is no muscle, endurance, stability, mobility, or athleticism.",
      "The answer to almost every training goal: BUILD STRENGTH.",
      "Getting stronger over time is the single most important factor for changing your body.",
      "Muscle growth is an adaptation for strength — build strength and the muscle follows.",
    ],
  },
  {
    title: "Tension is Everything",
    content: [
      "The driving factor that grows muscle and builds strength is tension.",
      "Progressive tension overload — applying more tension over time — is how you grow.",
      "More weight, more reps, deeper stretch, slower tempo — these are all ways to increase tension.",
      "Simply adding weight and reps over time is the simplest and most guaranteed path to growth.",
    ],
  },
  {
    title: "Simplicity is Brilliance",
    content: [
      "Pick 3-5 exercises you love and master them. More is not always more.",
      "2-3 exercises per muscle, 2-6 sets per workout. That's it.",
      "If you train truly hard, less is more. High effort, total volume, and frequency have an inverse relationship.",
      "Most people get 90% of their results from 2-3x/week full body or upper/lower training.",
    ],
  },
  {
    title: "Quality Over Quantity",
    content: [
      "Range of motion is the most important aspect of any exercise — go deep.",
      "Pause at the bottom to build strength in the stretched position.",
      "Control the eccentric (lowering phase) — don't let gravity do the work.",
      "Explode on the concentric, control the eccentric. Simple.",
    ],
  },
  {
    title: "Beat Your Log Book",
    content: [
      "ALWAYS track your training. This is key to making consistent progress.",
      "Come in with a goal: 5 more pounds, one more rep, better technique.",
      "The only thing that matters at the end of the day is steady progress in the logbook.",
      "Track: exercises, sets, reps, weight, technique notes, and RPE.",
    ],
  },
];

const movements: LessonCard[] = [
  {
    title: "The 6 Basic Movement Patterns",
    content: [
      "Squat — Quads, glutes, sometimes hamstrings",
      "Hinge — Hamstrings, glutes, lower back, upper back",
      "Horizontal Push — Chest, shoulders, triceps",
      "Horizontal Pull — Upper back, lats, biceps",
      "Vertical Push — Shoulders, triceps, upper chest",
      "Vertical Pull — Lats, upper back, biceps",
      "Cover all 6 patterns weekly for a complete physique.",
    ],
  },
  {
    title: "Compound Movements are King",
    content: [
      "Squats, deadlifts, bench press, overhead press, rows, pull-ups — these are your foundation.",
      "Compound movements train multiple systems simultaneously. Maximum efficiency.",
      "Prioritize heavy compound movements in the big 6 patterns.",
      "Isolations are accessories — they support the compounds, not the other way around.",
    ],
  },
  {
    title: "Exercise Depth vs. Width",
    content: [
      "Stop trying to do every exercise known to man.",
      "Instead, find 3-5 exercises you like and get strong at those through full ROM.",
      "For each workout, you need no more than 2-3 exercises per muscle.",
      "1-2 exercises taken to failure can be enough if you train with true intensity.",
    ],
  },
];

const nutritionCards: LessonCard[] = [
  {
    title: "The Simple Formula",
    content: [
      "Training is the primary mover of your results. Nutrition permits and reveals what training builds.",
      "The only thing that matters for body composition: calories in and out.",
      "Maintenance calories = Bodyweight (lbs) x 15",
      "To cut: subtract 200-600 calories (lower if less to lose, higher if more)",
      "To bulk: add 200-400 calories (always start on the lower side)",
    ],
  },
  {
    title: "Protein is Priority #1",
    content: [
      "Aim for 0.7-1g of protein per pound of bodyweight.",
      "Protein is the most satiating macronutrient — it keeps you full on fewer calories.",
      "Protein has a 20% thermic effect — 80 of every 400 calories are burned digesting it.",
      "Eat protein first at every meal, then veggies, then starches.",
    ],
  },
  {
    title: "Replacement, Not Restriction",
    content: [
      "Don't try to eat less of the 'bad stuff' — replace it with food that satisfies and sustains you.",
      "Swap processed foods for whole, single-ingredient foods seasoned well.",
      "Learn to cook and season well — this makes healthy eating effortless and enjoyable.",
      "Figure out 5-7 meals you love and rotate them. Most people eat the same meals anyway.",
    ],
  },
  {
    title: "Hand Portion Guide",
    content: [
      "Protein: about the size of your hand (or palm minimum) — half the plate",
      "Vegetables: about the size of your fist",
      "Starches: about one cupped handful",
      "Fats: about a thumb size",
      "This scales to your body and is reliably accurate without counting.",
    ],
  },
];

const progressionCards: LessonCard[] = [
  {
    title: "The Cycle of Progression",
    content: [
      "1. Add weight",
      "2. Add reps",
      "3. Add sets if needed",
      "4. Master the weight — once you need momentum, practice strict form until you own it",
      "5. Rinse and repeat",
    ],
  },
  {
    title: "Rate of Progression",
    content: [
      "Beginner: add 5-10 lbs and 1-2 reps every 1-2 weeks (linear progression)",
      "Intermediate: add 5-10 lbs or 1-2 reps every 3-5 weeks (double progression)",
      "Advanced: progress every 6-8 weeks (triple progression)",
      "The only thing that matters: are you making steady progress in the logbook?",
    ],
  },
  {
    title: "Signs You're Training Hard Enough",
    content: [
      "Change of facial expression or color",
      "Slowing of the movement pattern",
      "Difficulty at the sticking point — shaking, squirming",
      "Losing 3+ reps in subsequent sets",
      "Low-grade anxiety before the next set",
      "Your ENTIRE body gets stiff and tight to make big weights move",
    ],
  },
  {
    title: "Breaking Plateaus",
    content: [
      "Three reasons you plateau: not training hard enough, training too much, or going through the motions.",
      "Key principle: Stimulus vs. Fatigue",
      "Feeling fresh? DO MORE — more weight, reps, frequency, effort",
      "Feeling beat up? DO LESS — less weight, fewer sets, lower frequency",
      "Pick 2-3 things to focus on at a time. Don't try to get good at everything at once.",
    ],
  },
];

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState("principles");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  function toggleCard(id: string) {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const currentCards =
    activeTab === "principles"
      ? principles
      : activeTab === "movements"
      ? movements
      : activeTab === "nutrition"
      ? nutritionCards
      : progressionCards;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <BookOpen className="h-5 w-5 text-brand" />
        <h1 className="text-xl font-bold">Training Knowledge</h1>
      </div>
      <p className="text-sm text-text-secondary">
        Core principles from the Enter the Dragon training philosophy
      </p>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="space-y-3">
        {currentCards.map((card, i) => {
          const id = `${activeTab}-${i}`;
          const isExpanded = expandedCards.has(id);

          return (
            <Card key={id} className="overflow-hidden">
              <button
                onClick={() => toggleCard(id)}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-surface/50 transition-colors text-left"
              >
                <p className="font-semibold text-sm">{card.title}</p>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-text-muted shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-text-muted shrink-0" />
                )}
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border pt-3">
                  <ul className="space-y-2">
                    {card.content.map((line, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-brand mt-1 shrink-0">-</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
