export const RPE_LABELS: Record<number, string> = {
  6: "Light",
  7: "Moderate",
  8: "Hard",
  9: "Very Hard",
  10: "Max Effort",
};

export const MEAL_TYPES = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
] as const;

export const MUSCLE_GROUPS = [
  "Chest",
  "Back",
  "Shoulders",
  "Biceps",
  "Triceps",
  "Quadriceps",
  "Hamstrings",
  "Glutes",
  "Calves",
  "Core",
  "Full Body",
] as const;

export const TIER_DEFINITIONS = {
  basic: { name: "Basic", price: 199, color: "text-text-secondary" },
  standard: { name: "Standard", price: 299, color: "text-brand" },
  premium: { name: "Premium", price: 499, color: "text-gold" },
} as const;

export const MILESTONES = [
  { id: "first_workout", label: "First Workout", icon: "Dumbbell" },
  { id: "week_streak_3", label: "3 Week Streak", icon: "Flame" },
  { id: "week_streak_8", label: "8 Week Streak", icon: "Flame" },
  { id: "prs_5", label: "5 Personal Records", icon: "Trophy" },
  { id: "prs_10", label: "10 Personal Records", icon: "Trophy" },
  { id: "checkins_4", label: "4 Check-ins", icon: "CheckCircle" },
  { id: "weight_goal", label: "Goal Weight Reached", icon: "Target" },
] as const;

export const MOVEMENT_PATTERNS = [
  "Squat",
  "Hinge",
  "Horizontal Push",
  "Horizontal Pull",
  "Vertical Push",
  "Vertical Pull",
  "Single Leg",
  "Isolation",
] as const;

export const TRAINING_GOALS = {
  strength: {
    name: "Strength",
    description: "Build maximal strength through heavy compound lifts",
    rpeRange: "6-9",
    repRange: "1-5",
    setsPerExercise: "3-5",
    frequency: "2-3x/week per movement",
  },
  hypertrophy: {
    name: "Hypertrophy",
    description:
      "Build muscle through tension and progressive overload to failure",
    rpeRange: "8-10",
    repRange: "5-12",
    setsPerExercise: "2-4",
    frequency: "2x/week per muscle",
  },
  rehab: {
    name: "Mobility/Rehab",
    description: "Restore movement, reduce pain, build range of motion",
    rpeRange: "6-8",
    repRange: "10-20",
    setsPerExercise: "2-4",
    frequency: "2-3x/week",
  },
  hybrid: {
    name: "Hybrid",
    description:
      "Balanced strength, muscle, and mobility through strict technique",
    rpeRange: "6-10",
    repRange: "3-15",
    setsPerExercise: "2-3",
    frequency: "2-4x/week",
  },
} as const;
