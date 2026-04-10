import { EXERCISE_SEED } from "./exercise-seed";

export interface TechniqueCue {
  name: string;
  instructions: string;
  commonMistakes: string[];
}

const cueMap = new Map<string, TechniqueCue>();

for (const exercise of EXERCISE_SEED) {
  if (exercise.instructions) {
    cueMap.set(exercise.name.toLowerCase(), {
      name: exercise.name,
      instructions: exercise.instructions,
      commonMistakes: exercise.common_mistakes ?? [],
    });
  }
}

export function getTechniqueCue(exerciseName: string): TechniqueCue | null {
  return cueMap.get(exerciseName.toLowerCase()) ?? null;
}
