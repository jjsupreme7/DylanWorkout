"use client";

import { useState } from "react";

const workoutDays = [
  {
    name: "Push Day",
    tag: "Chest / Shoulders / Triceps",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8", weight: 185, rest: 120 },
      { name: "Overhead Press", sets: 3, reps: "10", weight: 115, rest: 90 },
      { name: "Incline DB Press", sets: 3, reps: "12", weight: 65, rest: 90 },
      { name: "Cable Flyes", sets: 3, reps: "15", weight: 30, rest: 60 },
      { name: "Lateral Raises", sets: 3, reps: "15", weight: 20, rest: 60 },
      { name: "Tricep Pushdowns", sets: 3, reps: "12", weight: 50, rest: 60 },
    ],
  },
  {
    name: "Pull Day",
    tag: "Back / Biceps",
    exercises: [
      { name: "Deadlift", sets: 4, reps: "5", weight: 315, rest: 180 },
      { name: "Barbell Rows", sets: 4, reps: "8", weight: 185, rest: 120 },
      { name: "Lat Pulldowns", sets: 3, reps: "12", weight: 140, rest: 90 },
      { name: "Face Pulls", sets: 3, reps: "15", weight: 40, rest: 60 },
      { name: "Barbell Curls", sets: 3, reps: "10", weight: 65, rest: 60 },
      { name: "Hammer Curls", sets: 3, reps: "12", weight: 30, rest: 60 },
    ],
  },
  {
    name: "Leg Day",
    tag: "Quads / Hamstrings / Glutes",
    exercises: [
      { name: "Barbell Squat", sets: 4, reps: "6", weight: 275, rest: 180 },
      { name: "Romanian Deadlift", sets: 3, reps: "10", weight: 205, rest: 120 },
      { name: "Leg Press", sets: 3, reps: "12", weight: 360, rest: 90 },
      { name: "Walking Lunges", sets: 3, reps: "12/leg", weight: 50, rest: 90 },
      { name: "Leg Curl", sets: 3, reps: "12", weight: 90, rest: 60 },
      { name: "Calf Raises", sets: 4, reps: "15", weight: 135, rest: 60 },
    ],
  },
];

export default function WorkoutPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [activeSession, setActiveSession] = useState(false);
  const [completedSets, setCompletedSets] = useState<Record<string, boolean[]>>({});

  const workout = workoutDays[selectedDay];

  const toggleSet = (exerciseName: string, setIndex: number) => {
    setCompletedSets((prev) => {
      const current = prev[exerciseName] || [];
      const updated = [...current];
      updated[setIndex] = !updated[setIndex];
      return { ...prev, [exerciseName]: updated };
    });
  };

  const totalSets = workout.exercises.reduce((sum, e) => sum + e.sets, 0);
  const completedCount = Object.values(completedSets).reduce(
    (sum, sets) => sum + sets.filter(Boolean).length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Workout</h1>
          <p className="text-dragon-muted mt-1">Week 4 of 8 — Upper/Lower Split</p>
        </div>
        {activeSession && (
          <div className="text-right">
            <p className="text-dragon-gold-light font-mono text-lg font-bold">
              {completedCount}/{totalSets}
            </p>
            <p className="text-dragon-muted text-xs">Sets Done</p>
          </div>
        )}
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {workoutDays.map((day, i) => (
          <button
            key={day.name}
            onClick={() => {
              setSelectedDay(i);
              setCompletedSets({});
              setActiveSession(false);
            }}
            className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              selectedDay === i
                ? "bg-dragon-red text-white shadow-red-glow"
                : "bg-dragon-card border border-dragon-border text-dragon-muted hover:text-white"
            }`}
          >
            {day.name}
          </button>
        ))}
      </div>

      {/* Progress Bar (during session) */}
      {activeSession && (
        <div>
          <div className="progress-bar">
            <div
              className="progress-fill bg-gradient-to-r from-dragon-red to-dragon-gold"
              style={{ width: `${(completedCount / totalSets) * 100}%` }}
            />
          </div>
          <p className="text-xs text-dragon-muted mt-2">
            {Math.round((completedCount / totalSets) * 100)}% complete
          </p>
        </div>
      )}

      {/* Workout Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="section-title">{workout.name}</h2>
            <p className="text-dragon-muted text-sm">{workout.tag}</p>
          </div>
          <span className="badge-gold">{workout.exercises.length} exercises</span>
        </div>

        <div className="space-y-3">
          {workout.exercises.map((exercise) => (
            <div
              key={exercise.name}
              className="bg-dragon-dark rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white font-medium">{exercise.name}</p>
                  <p className="text-dragon-muted text-xs mt-0.5">
                    {exercise.sets}x{exercise.reps} @ {exercise.weight} lbs
                    <span className="text-dragon-border mx-2">|</span>
                    Rest: {exercise.rest}s
                  </p>
                </div>
              </div>

              {activeSession && (
                <div className="flex gap-2 mt-2">
                  {Array.from({ length: exercise.sets }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => toggleSet(exercise.name, i)}
                      className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${
                        completedSets[exercise.name]?.[i]
                          ? "bg-dragon-red text-white"
                          : "bg-dragon-card border border-dragon-border text-dragon-muted hover:border-dragon-red/30"
                      }`}
                    >
                      Set {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      {!activeSession ? (
        <button
          onClick={() => setActiveSession(true)}
          className="btn-primary w-full text-lg py-4"
        >
          Start Workout
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => {
              setActiveSession(false);
              setCompletedSets({});
            }}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
          <button className="btn-gold flex-1">
            Complete Workout
          </button>
        </div>
      )}
    </div>
  );
}
