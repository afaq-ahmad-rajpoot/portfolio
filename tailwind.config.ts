import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        phosphor: "#00FF41",
        electric: "#00C2FF",
        amber: "#FFB000",
        danger: "#FF003C",
        haze: "#0a0a0a",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "scanline": "scanline 8s linear infinite",
        "flicker": "flicker 3s linear infinite",
        "pulse-dot": "pulseDot 1.6s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "41%": { opacity: "1" },
          "42%": { opacity: "0.6" },
          "43%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.4" },
          "94%": { opacity: "1" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(0,255,65,0.6)" },
          "50%": { opacity: "0.6", boxShadow: "0 0 0 6px rgba(0,255,65,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
