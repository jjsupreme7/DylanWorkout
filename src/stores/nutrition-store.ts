"use client";

import { create } from "zustand";

interface NutritionState {
  activeTab: "log" | "scan" | "ask";
  setActiveTab: (tab: "log" | "scan" | "ask") => void;
}

export const useNutritionStore = create<NutritionState>()((set) => ({
  activeTab: "log",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
