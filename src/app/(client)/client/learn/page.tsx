"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Download,
  FileText,
  ExternalLink,
} from "lucide-react";

const tabs = [
  { id: "principles", label: "Principles" },
  { id: "movements", label: "Movements" },
  { id: "nutrition", label: "Nutrition" },
  { id: "progression", label: "Progression" },
  { id: "health", label: "Health" },
  { id: "technique", label: "Technique" },
  { id: "manual", label: "Manual" },
];

interface LessonCard {
  title: string;
  content: string[];
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
  {
    title: "Training Myths Debunked",
    content: [
      "\"Lifting makes you bulky\" — Building muscle takes years of effort. You won't accidentally get too big.",
      "\"Lifting is bad for your joints\" — The opposite. Strength training is the best thing for joint health, stability, and pain reduction.",
      "\"Cardio is better for fat loss\" — Strength training builds metabolism long-term. Cardio without lifting can lower your metabolism.",
      "\"It's not for me\" — Strength training is the most customizable form of exercise. It can be tailored to any age, size, goal, or limitation.",
      "\"You need to go a lot\" — You can train 2-3x/week and get most of the results. Intensity matters more than frequency.",
      "\"It makes you slow and inflexible\" — Strength through full range of motion builds mobility. Look up Jujimufu and Tom Platz.",
    ],
  },
  {
    title: "Male vs. Female Training",
    content: [
      "Strength training is human training. There is no \"female training\" or \"male training.\"",
      "Men and women are more similar than they are different in how they should train.",
      "The main difference is the desired goal — the training itself is largely the same.",
      "Men: bias towards shoulders, upper chest, back, lats, arms, then strong legs.",
      "Women: bias towards lower body — glutes, hips, legs, calves, then upper back, shoulders, arms, chest.",
      "Simply become stronger within the domain of your genuine goals, and the physique follows.",
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
  {
    title: "Body Part Functions",
    content: [
      "Shoulders — Raise the upper arm in front, out to the sides, and behind",
      "Upper Back (Traps) — Control and elevate the shoulder blades",
      "Lats — Pull the upper arm downward and into the torso",
      "Chest — Move the upper arm across the torso",
      "Biceps — Flex (bend) the elbow",
      "Triceps — Extend (straighten) the elbow",
      "Abs — Flex and stabilize the spine",
      "Glutes — Extend the hips, stabilize, rotate thighs outward",
      "Quads — Extend (straighten) the knee",
      "Hamstrings — Bend the knee and extend the hips",
      "Calves — Point the toes down",
      "Understanding these functions helps you apply proper tension to each muscle.",
    ],
  },
  {
    title: "Biomechanics Basics",
    content: [
      "Only 3 things matter for exercise technique: basic muscle function, range of motion, and control.",
      "The muscle you want to grow is the muscle you should stretch (or lengthen) most before you squeeze.",
      "Go as deep as you can with the target muscle, as if you were trying to rip or pry it apart.",
      "Two basic parts of an exercise: the concentric (squeeze) and eccentric (stretch). Both build muscle.",
      "Explode on the concentric, stay in control on the eccentric. Don't let gravity do the work.",
      "Your bones are the framework. Your muscles move your bones. Your joints connect them. Understand how each part moves to apply tension properly.",
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
  {
    title: "Daily Calorie Breakdown",
    content: [
      "Basal Metabolic Rate (BMR): 60-70% of calories — just keeping you alive. Maximized by building muscle.",
      "Thermic Effect of Food (TEF): ~10% — calories burned digesting food. Protein burns the most.",
      "Exercise Activity (EAT): 5-10% — calories from purposeful exercise. Shows why exercise alone isn't enough for fat loss.",
      "Non-Exercise Activity (NEAT): 15-30% — walking, chores, fidgeting. The most controllable factor after diet.",
      "Key insight: increasing daily movement (NEAT) makes losing fat dramatically easier.",
    ],
  },
  {
    title: "Why We Overeat",
    content: [
      "You're bored and have too many food options around",
      "Past experience with extreme, unsustainable diets creates a yo-yo cycle",
      "You eat a lot of processed foods — designed to be addictive, high calorie, low volume",
      "You didn't sleep well — stress and brain fog increase hunger",
      "You're stressed, depressed, or using food as emotional comfort",
      "You eat out of habit without putting thought into it",
      "Awareness is the first step — then use the replacement principle to fix it.",
    ],
  },
  {
    title: "Reverse Dieting",
    content: [
      "For people who undereat, feel fatigued, have crazy cravings, but are still unhappy with their weight.",
      "Extreme diets slow your metabolism. Your body adapts to conserve energy — more fatigue, less movement, more hunger.",
      "Instead of dieting harder: add 50-100 calories per week while monitoring your scale.",
      "Focus on strength training and don't do too much cardio during this phase.",
      "Once cravings are gone, energy is back, and weight is stable — go back into a gentle deficit.",
      "Follow all the same nutrition principles above when you resume cutting.",
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

const healthCards: LessonCard[] = [
  {
    title: "Cardio & Daily Activity",
    content: [
      "Cardio alone is not the best tool for fat loss — it can slow your metabolism if overdone.",
      "NEAT (non-exercise activity) is far more powerful: walking, chores, fidgeting burn 15-30% of daily calories.",
      "Walking 10k steps/day burns 300-500 calories without increasing hunger. That deficit alone causes fat loss.",
      "Minimum: 8k-10k steps per day (4-5 miles, or 1-2 hours of walking).",
      "Alternative: Japanese walking protocol — 30 seconds fast, 30 seconds slow, for 30 minutes.",
      "Don't just 'do cardio' — find physical activities you enjoy and make movement a lifestyle.",
      "Go for short walks after meals. Park farther away. Take the stairs. Play with kids and pets.",
    ],
  },
  {
    title: "Sleep Guide",
    content: [
      "Muscle growth happens in your sleep. You must sleep as hard as you train.",
      "Without adequate sleep: more hunger, more stress, less recovery, less self-control, less energy.",
      "Sleep 7-9 hours per night. Take 15-30 minute naps when needed.",
      "Avoid caffeine after 2 PM.",
      "Limit alcohol: 2 drinks max, 2 nights per week.",
      "Sleep and wake at the same time daily.",
      "Process your thoughts and emotions during the day before bed — this is key.",
      "Make your room dark and cool. Practice deep belly breathing. Relax your neck, tongue, and face.",
      "Try magnesium instead of melatonin.",
    ],
  },
  {
    title: "Why Weight Training is Superior",
    content: [
      "Musculoskeletal: builds muscle, increases bone density, strengthens joints, improves posture and mobility.",
      "Metabolic: increases resting metabolic rate, improves insulin sensitivity, enhances fat oxidation.",
      "Cardiovascular: healthier heart, reduced blood pressure, improved circulation.",
      "Neurological: increases neuroplasticity, improves cognitive function and memory, better balance.",
      "Mental Health: 1.5x more effective than therapy or medication for depression and anxiety. Better sleep, confidence, and stress resilience.",
      "Hormonal: increases growth hormone, balances testosterone, better cortisol regulation.",
      "Longevity: reduced sarcopenia, maintained independence, increased lifespan potential.",
      "Only exercise allowing precise, measurable progression. Customizable to any age, size, or limitation.",
      "Common to every athlete, sport, military, and law enforcement — for good reason.",
    ],
  },
];

const techniqueCards: LessonCard[] = [
  {
    title: "How to Brace (Proper Breathing)",
    content: [
      "Think of a soda can: a full, pressurized can is harder to crush than an empty one. Be the full can.",
      "Before any heavy movement: take a big, deep BELLY breath, creating pressure in your stomach.",
      "Think of bracing like you're about to go underwater or get punched in the stomach.",
      "DO NOT breathe out until you get back to the resting position.",
      "This keeps you tight, protects your spine, and lets you lift heavier safely.",
      "Rinse and repeat for every rep of every heavy set.",
    ],
  },
  {
    title: "Squat Technique",
    content: [
      "Stand hip to shoulder width, toes pointed out as much as needed to go all the way down.",
      "Brace your core with ribs down, like you're about to be punched in the stomach.",
      "Drop down naturally — hips and knees bending together, staying as upright as possible.",
      "Think of squatting like using the bathroom in the woods — natural and deep.",
      "At the bottom, drive through your midfoot and explode out. Push knees outward.",
      "Common mistakes: standing too wide/narrow, not bracing, knees caving, rising with hips first, not going deep enough, rounding at the spine.",
    ],
  },
  {
    title: "Bench & Overhead Press Technique",
    content: [
      "BENCH: Find a comfortable grip at or slightly outside shoulder width.",
      "Pack your shoulders back — squeeze a pen in the middle of your back, into your 'back pocket.'",
      "Lower the bar to your chest at nipple level. Puff your chest up to stretch the muscles.",
      "Elbows at 45 degrees. Drive elbows up, not your hands. Use leg drive.",
      "OVERHEAD PRESS: Grip right outside shoulder width. Bar tight against your throat.",
      "Tighten abs and glutes. Keep elbows forward to prevent the bar from dropping.",
      "Move your head out of the way (double chin). Press vertically, then pull your head through the window.",
      "Always press the bar as close to your body as possible in a straight line upward.",
    ],
  },
  {
    title: "Deadlift & Row Technique",
    content: [
      "DEADLIFT: Position mid-foot under the bar, toes slightly out.",
      "Grab the bar without moving it (key!). Bend legs just enough to touch the bar, push hips back.",
      "Brace core. Think about pushing the world away, not pulling the bar up. Drive hips forward, keep bar close.",
      "Common mistakes: bending legs too much, moving the bar during setup, not keeping bar against legs.",
      "ROW: Load hips back like a deadlift. Brace core and back.",
      "Pull explosively toward your belly button/sternum. Drive elbows back behind you.",
      "Raise your chest, squeeze your shoulder blades down into your back pocket.",
      "Common mistakes: too upright, too heavy, rounded back, using biceps instead of back.",
    ],
  },
];

const allContent: Record<string, LessonCard[]> = {
  principles,
  movements,
  nutrition: nutritionCards,
  progression: progressionCards,
  health: healthCards,
  technique: techniqueCards,
};

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

  const isManual = activeTab === "manual";
  const currentCards = allContent[activeTab] ?? [];

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

      {isManual ? (
        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                <FileText className="h-6 w-6 text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-base">Enter the Dragon v.2</h2>
                <p className="text-sm text-text-secondary mt-1">
                  The Complete Strength & Health Guide by Delan Chan. 60 pages covering philosophy, nutrition,
                  sleep, cardio, resistance training, biomechanics, technique cues, and the full exercise index.
                </p>
                <p className="text-xs text-text-muted mt-2">PDF - 2.2 MB</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href="/enter-the-dragon-guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-black hover:bg-brand-hover hover:scale-[1.02] transition-all duration-200"
              >
                <ExternalLink className="h-4 w-4" />
                Read Guide
              </a>
              <a
                href="/enter-the-dragon-guide.pdf"
                download="Enter the Dragon v2 - Complete Guide.pdf"
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-brand/30 px-4 py-2.5 text-sm font-medium text-brand hover:bg-brand/10 transition-all duration-200"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </Card>

          <Card className="p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">What's Inside</p>
            <div className="space-y-2.5">
              {[
                { part: "Part I", title: "The Why", desc: "Philosophy and principles" },
                { part: "Part II", title: "The How", desc: "Cardio, nutrition, sleep, and resistance training guides" },
                { part: "Part III", title: "The What", desc: "Training truths, programming, and exercise selection" },
                { part: "Part IV", title: "Where This Applies", desc: "Biomechanics, technique cues, and exercise index" },
              ].map((section) => (
                <div key={section.part} className="flex items-start gap-3 py-1.5">
                  <span className="text-xs font-mono text-brand shrink-0 mt-0.5">{section.part}</span>
                  <div>
                    <p className="text-sm font-medium">{section.title}</p>
                    <p className="text-xs text-text-muted">{section.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
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
      )}
    </div>
  );
}
