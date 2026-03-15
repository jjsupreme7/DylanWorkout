"use client";

import { create } from "zustand";
import type { Tables } from "@/lib/types/database";

interface AuthState {
  profile: Tables<"profiles"> | null;
  setProfile: (profile: Tables<"profiles"> | null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}));
