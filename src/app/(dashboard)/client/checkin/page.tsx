"use client";

import { useState } from "react";

export default function CheckinPage() {
  const [weight, setWeight] = useState("182");
  const [sleepHours, setSleepHours] = useState("7.5");
  const [stressLevel, setStressLevel] = useState(4);
  const [energyLevel, setEnergyLevel] = useState(7);
  const [trainingAdherence, setTrainingAdherence] = useState(90);
  const [nutritionAdherence, setNutritionAdherence] = useState(85);
  const [wins, setWins] = useState("");
  const [struggles, setStruggles] = useState("");
  const [questions, setQuestions] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Weekly Check-in</h1>
        <p className="text-dragon-muted mt-1">Submit your progress for coach review</p>
      </div>

      {/* Status Banner */}
      <div className="card border-dragon-gold/30 bg-dragon-gold/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-dragon-gold/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-dragon-gold-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-dragon-gold-light font-semibold text-sm">Check-in Due</p>
            <p className="text-dragon-muted text-xs">Next check-in due by Sunday 11:59 PM</p>
          </div>
        </div>
      </div>

      {/* Body Stats */}
      <div className="card">
        <h2 className="section-title mb-4">Body Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-dragon-muted text-xs uppercase tracking-wider block mb-2">
              Weight (lbs)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="text-dragon-muted text-xs uppercase tracking-wider block mb-2">
              Sleep (hours)
            </label>
            <input
              type="number"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Levels */}
      <div className="card">
        <h2 className="section-title mb-4">How are you feeling?</h2>
        <div className="space-y-5">
          {/* Stress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-dragon-muted text-xs uppercase tracking-wider">
                Stress Level
              </label>
              <span className="text-dragon-red-glow font-bold text-sm">{stressLevel}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(Number(e.target.value))}
              className="w-full accent-dragon-red"
            />
            <div className="flex justify-between text-[10px] text-dragon-muted mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {/* Energy */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-dragon-muted text-xs uppercase tracking-wider">
                Energy Level
              </label>
              <span className="text-dragon-gold-light font-bold text-sm">{energyLevel}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="w-full accent-dragon-gold"
            />
            <div className="flex justify-between text-[10px] text-dragon-muted mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </div>
      </div>

      {/* Adherence */}
      <div className="card">
        <h2 className="section-title mb-4">Adherence</h2>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-dragon-text">Training</span>
              <span className="text-green-400 font-bold text-sm">{trainingAdherence}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill bg-green-500"
                style={{ width: `${trainingAdherence}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={trainingAdherence}
              onChange={(e) => setTrainingAdherence(Number(e.target.value))}
              className="w-full accent-green-500 mt-2"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-dragon-text">Nutrition</span>
              <span className="text-dragon-gold-light font-bold text-sm">{nutritionAdherence}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill bg-dragon-gold"
                style={{ width: `${nutritionAdherence}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={nutritionAdherence}
              onChange={(e) => setNutritionAdherence(Number(e.target.value))}
              className="w-full accent-yellow-500 mt-2"
            />
          </div>
        </div>
      </div>

      {/* Reflections */}
      <div className="card">
        <h2 className="section-title mb-4">Reflections</h2>
        <div className="space-y-4">
          <div>
            <label className="text-dragon-muted text-xs uppercase tracking-wider block mb-2">
              Wins this week
            </label>
            <textarea
              value={wins}
              onChange={(e) => setWins(e.target.value)}
              placeholder="What went well?"
              rows={3}
              className="input-field resize-none"
            />
          </div>
          <div>
            <label className="text-dragon-muted text-xs uppercase tracking-wider block mb-2">
              Struggles
            </label>
            <textarea
              value={struggles}
              onChange={(e) => setStruggles(e.target.value)}
              placeholder="What was challenging?"
              rows={3}
              className="input-field resize-none"
            />
          </div>
          <div>
            <label className="text-dragon-muted text-xs uppercase tracking-wider block mb-2">
              Questions for coach
            </label>
            <textarea
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              placeholder="Anything you want to ask?"
              rows={3}
              className="input-field resize-none"
            />
          </div>
        </div>
      </div>

      {/* Progress Photos */}
      <div className="card">
        <h2 className="section-title mb-4">Progress Photos</h2>
        <div className="grid grid-cols-3 gap-3">
          {["Front", "Side", "Back"].map((view) => (
            <button
              key={view}
              className="aspect-[3/4] bg-dragon-dark rounded-lg border border-dashed border-dragon-border flex flex-col items-center justify-center gap-2 hover:border-dragon-red/30 transition-colors"
            >
              <svg className="w-8 h-8 text-dragon-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-dragon-muted text-xs">{view}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button className="btn-primary w-full text-lg py-4">
        Submit Check-in
      </button>
    </div>
  );
}
