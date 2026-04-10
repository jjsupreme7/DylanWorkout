export interface Program {
  id: "strength" | "hypertrophy" | "athletic";
  name: string;
  tagline: string;
  description: string;
  image: string;
  sampleWeek: {
    day: string;
    focus: string;
    exercises: number;
  }[];
  stats: {
    label: string;
    value: string;
  }[];
}

export const programs: Program[] = [
  {
    id: "strength",
    name: "Strength",
    tagline: "Build raw power with progressive overload",
    description:
      "Heavy compound movements with structured periodization. Squat, bench, deadlift, and overhead press form the backbone — accessories fill in weak points. Every rep has a purpose, every week builds on the last.",
    image: "/images/programs/strength.jpg",
    sampleWeek: [
      { day: "Mon", focus: "Squat + Accessories", exercises: 5 },
      { day: "Wed", focus: "Bench + Upper Pull", exercises: 6 },
      { day: "Fri", focus: "Deadlift + Posterior Chain", exercises: 5 },
      { day: "Sat", focus: "OHP + Arms", exercises: 5 },
    ],
    stats: [
      { label: "Sessions/week", value: "4" },
      { label: "Rep range", value: "1–5" },
      { label: "Avg session", value: "60–75 min" },
      { label: "RPE target", value: "7–9" },
    ],
  },
  {
    id: "hypertrophy",
    name: "Hypertrophy",
    tagline: "Maximize muscle growth through smart volume",
    description:
      "Higher volume, controlled tempos, and progressive overload to failure. Each muscle gets hit twice per week with enough variety to keep adapting. The goal is size — we train for it specifically.",
    image: "/images/programs/hypertrophy.jpg",
    sampleWeek: [
      { day: "Mon", focus: "Chest + Triceps", exercises: 6 },
      { day: "Tue", focus: "Back + Biceps", exercises: 6 },
      { day: "Thu", focus: "Legs + Glutes", exercises: 7 },
      { day: "Fri", focus: "Shoulders + Arms", exercises: 6 },
      { day: "Sat", focus: "Weak Point Focus", exercises: 4 },
    ],
    stats: [
      { label: "Sessions/week", value: "5" },
      { label: "Rep range", value: "6–12" },
      { label: "Avg session", value: "50–65 min" },
      { label: "RPE target", value: "8–10" },
    ],
  },
  {
    id: "athletic",
    name: "Athletic",
    tagline: "Move better, faster, and more explosively",
    description:
      "A hybrid approach combining strength work with power development, agility, and conditioning. Built for people who want to perform — not just look good. Periodized around your sport or activity goals.",
    image: "/images/programs/athletic.jpg",
    sampleWeek: [
      { day: "Mon", focus: "Power + Plyometrics", exercises: 5 },
      { day: "Tue", focus: "Upper Strength", exercises: 5 },
      { day: "Thu", focus: "Lower Strength + Speed", exercises: 6 },
      { day: "Fri", focus: "Conditioning + Core", exercises: 5 },
    ],
    stats: [
      { label: "Sessions/week", value: "4" },
      { label: "Rep range", value: "3–8" },
      { label: "Avg session", value: "55–70 min" },
      { label: "RPE target", value: "7–9" },
    ],
  },
];
