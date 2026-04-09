"use client";

import { useState } from "react";

const meals = [
  {
    type: "Breakfast",
    time: "7:30 AM",
    foods: [
      { name: "Scrambled Eggs (3)", calories: 234, protein: 18, carbs: 2, fat: 17 },
      { name: "Whole Wheat Toast (2)", calories: 160, protein: 6, carbs: 28, fat: 3 },
      { name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 },
    ],
  },
  {
    type: "Lunch",
    time: "12:00 PM",
    foods: [
      { name: "Grilled Chicken Breast", calories: 284, protein: 53, carbs: 0, fat: 6 },
      { name: "Brown Rice (1 cup)", calories: 216, protein: 5, carbs: 45, fat: 2 },
      { name: "Mixed Vegetables", calories: 85, protein: 4, carbs: 16, fat: 1 },
    ],
  },
  {
    type: "Snack",
    time: "3:30 PM",
    foods: [
      { name: "Protein Shake", calories: 160, protein: 30, carbs: 6, fat: 2 },
      { name: "Almonds (1 oz)", calories: 164, protein: 6, carbs: 6, fat: 14 },
    ],
  },
];

const targets = { calories: 2800, protein: 200, carbs: 300, fat: 80 };

export default function NutritionPage() {
  const [activeTab, setActiveTab] = useState<"log" | "scan">("log");

  const totals = meals.reduce(
    (acc, meal) => {
      meal.foods.forEach((food) => {
        acc.calories += food.calories;
        acc.protein += food.protein;
        acc.carbs += food.carbs;
        acc.fat += food.fat;
      });
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Nutrition</h1>
        <p className="text-dragon-muted mt-1">Track your meals and macros</p>
      </div>

      {/* Macro Summary */}
      <div className="card">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Calories", value: totals.calories, target: targets.calories, unit: "kcal", color: "from-dragon-red to-dragon-gold" },
            { label: "Protein", value: totals.protein, target: targets.protein, unit: "g", color: "from-red-500 to-red-600" },
            { label: "Carbs", value: totals.carbs, target: targets.carbs, unit: "g", color: "from-dragon-gold to-yellow-500" },
            { label: "Fat", value: totals.fat, target: targets.fat, unit: "g", color: "from-orange-500 to-orange-600" },
          ].map((macro) => (
            <div key={macro.label} className="text-center">
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#2a2a2a"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeDasharray={`${Math.min((macro.value / macro.target) * 100, 100)}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {Math.round((macro.value / macro.target) * 100)}%
                  </span>
                </div>
              </div>
              <p className="text-white font-bold text-sm">{macro.value}</p>
              <p className="text-dragon-muted text-[10px]">
                / {macro.target} {macro.unit}
              </p>
              <p className="text-dragon-muted text-[10px] uppercase tracking-wider mt-0.5">
                {macro.label}
              </p>
            </div>
          ))}
        </div>

        {/* SVG gradient definition */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#d4a017" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("log")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "log"
              ? "bg-dragon-red text-white"
              : "bg-dragon-card border border-dragon-border text-dragon-muted"
          }`}
        >
          Food Log
        </button>
        <button
          onClick={() => setActiveTab("scan")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "scan"
              ? "bg-dragon-red text-white"
              : "bg-dragon-card border border-dragon-border text-dragon-muted"
          }`}
        >
          AI Scan
        </button>
      </div>

      {activeTab === "log" ? (
        /* Food Log */
        <div className="space-y-4">
          {meals.map((meal) => (
            <div key={meal.type} className="card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold text-sm">{meal.type}</h3>
                  <p className="text-dragon-muted text-xs">{meal.time}</p>
                </div>
                <span className="text-dragon-gold-light text-sm font-mono">
                  {meal.foods.reduce((s, f) => s + f.calories, 0)} kcal
                </span>
              </div>
              <div className="space-y-2">
                {meal.foods.map((food) => (
                  <div
                    key={food.name}
                    className="flex items-center justify-between py-2 px-3 bg-dragon-dark rounded-lg"
                  >
                    <span className="text-sm text-dragon-text">{food.name}</span>
                    <div className="flex gap-4 text-xs text-dragon-muted">
                      <span>{food.protein}p</span>
                      <span>{food.carbs}c</span>
                      <span>{food.fat}f</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="text-dragon-red-glow text-xs font-medium mt-3 hover:underline">
                + Add food
              </button>
            </div>
          ))}

          <button className="btn-secondary w-full">
            + Add Meal
          </button>
        </div>
      ) : (
        /* AI Scan Tab */
        <div className="card">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-dragon-red/20 to-dragon-gold/20 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-dragon-gold-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">AI Food Scanner</h3>
            <p className="text-dragon-muted text-sm max-w-xs mb-6">
              Take a photo of your meal and our AI will identify the food and estimate macros instantly.
            </p>
            <button className="btn-primary">
              Scan Food
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
