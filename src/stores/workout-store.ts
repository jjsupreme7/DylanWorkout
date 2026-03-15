"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SetData {
  weight: string;
  reps: string;
  rpe: string;
  completed: boolean;
}

interface ExerciseState {
  exerciseId: string;
  exerciseName: string;
  sets: SetData[];
  expanded: boolean;
}

interface WorkoutState {
  sessionId: string | null;
  programDayId: string | null;
  exercises: ExerciseState[];
  startTime: number | null;
  elapsed: number;
  isActive: boolean;

  startSession: (sessionId: string, programDayId: string | null, exercises: { id: string; name: string; sets: number }[]) => void;
  updateSet: (exerciseIndex: number, setIndex: number, field: keyof SetData, value: string | boolean) => void;
  toggleExercise: (exerciseIndex: number) => void;
  tick: () => void;
  completeSession: () => void;
  resetSession: () => void;
  completedExerciseCount: () => number;
  totalExerciseCount: () => number;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      sessionId: null,
      programDayId: null,
      exercises: [],
      startTime: null,
      elapsed: 0,
      isActive: false,

      startSession: (sessionId, programDayId, exercises) => {
        set({
          sessionId,
          programDayId,
          exercises: exercises.map((ex) => ({
            exerciseId: ex.id,
            exerciseName: ex.name,
            sets: Array.from({ length: ex.sets }, () => ({
              weight: "",
              reps: "",
              rpe: "",
              completed: false,
            })),
            expanded: false,
          })),
          startTime: Date.now(),
          elapsed: 0,
          isActive: true,
        });
      },

      updateSet: (exerciseIndex, setIndex, field, value) => {
        set((state) => {
          const exercises = [...state.exercises];
          const exercise = { ...exercises[exerciseIndex] };
          const sets = [...exercise.sets];
          sets[setIndex] = { ...sets[setIndex], [field]: value };
          exercise.sets = sets;
          exercises[exerciseIndex] = exercise;
          return { exercises };
        });
      },

      toggleExercise: (exerciseIndex) => {
        set((state) => {
          const exercises = [...state.exercises];
          exercises[exerciseIndex] = {
            ...exercises[exerciseIndex],
            expanded: !exercises[exerciseIndex].expanded,
          };
          return { exercises };
        });
      },

      tick: () => {
        const { startTime } = get();
        if (startTime) {
          set({ elapsed: Math.floor((Date.now() - startTime) / 1000) });
        }
      },

      completeSession: () => {
        set({ isActive: false });
      },

      resetSession: () => {
        set({
          sessionId: null,
          programDayId: null,
          exercises: [],
          startTime: null,
          elapsed: 0,
          isActive: false,
        });
      },

      completedExerciseCount: () => {
        return get().exercises.filter((ex) =>
          ex.sets.every((s) => s.completed)
        ).length;
      },

      totalExerciseCount: () => get().exercises.length,
    }),
    {
      name: "etd-workout-session",
    }
  )
);
