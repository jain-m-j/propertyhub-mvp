import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        gold: { 50:"#fdfbf0",100:"#faf4d3",200:"#f4e9a8",300:"#edd87a",400:"#e5c74e",500:"#c9a84c",600:"#a8873a",700:"#87682b",800:"#664f1f",900:"#453413" },
        obsidian: { 50:"#f5f5f6",100:"#e8e8ea",200:"#d0d0d5",300:"#a8a8b3",400:"#78788c",500:"#555568",600:"#3d3d50",700:"#2a2a3a",800:"#1a1a28",900:"#0f0f1a",950:"#07070f" },
      },
      animation: {
        "shimmer": "shimmer 2.5s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
      keyframes: {
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        fadeUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
    },
  },
  plugins: [],
};
export default config;
