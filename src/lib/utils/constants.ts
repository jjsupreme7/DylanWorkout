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
