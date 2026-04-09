import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dragon: {
          black: "#0a0a0a",
          dark: "#121212",
          card: "#1a1a1a",
          border: "#2a2a2a",
          muted: "#6b7280",
          text: "#e5e5e5",
          red: {
            DEFAULT: "#dc2626",
            dark: "#991b1b",
            glow: "#ef4444",
          },
          gold: {
            DEFAULT: "#d4a017",
            light: "#fbbf24",
            dark: "#92700c",
          },
        },
      },
      fontFamily: {
        heading: ["'Inter'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        "red-glow": "0 0 20px rgba(220, 38, 38, 0.3)",
        "gold-glow": "0 0 20px rgba(212, 160, 23, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
