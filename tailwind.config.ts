import type { Config } from "tailwindcss";

// Same tokens as the app (src/core/theme/tokens.palette.js in the Sable source): cyan primary and
// indigo secondary on deep-navy surfaces. Hex lives here and in globals.css only.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#070b16", card: "#111c33", sunken: "#040710", raised: "#16233f" },
        line: "#243350",
        cyan: { DEFAULT: "#22d3ee", deep: "#0891b2", soft: "#67e8f9" },
        indigo: { DEFAULT: "#6366f1", soft: "#818cf8" },
        ink: { DEFAULT: "#f8fafc", soft: "#a7b4c8", mute: "#7d8ba3" },
        good: "#34d399",
        warn: "#fbbf24",
        bad: "#f43f5e",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      maxWidth: { page: "72rem" },
    },
  },
  plugins: [],
};

export default config;
