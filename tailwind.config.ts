import type { Config } from "tailwindcss";

// Every colour resolves to a CSS variable declared in app/globals.css:
// light = DESIGN.md (Vercel), dark = DESIGN.dark.md (Linear). Components never branch on theme.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: v("canvas"),
        surface: { 1: v("surface-1"), 2: v("surface-2"), 3: v("surface-3"), 4: v("surface-4") },
        hairline: { DEFAULT: v("hairline"), strong: v("hairline-strong"), tertiary: v("hairline-tertiary") },
        ink: { DEFAULT: v("ink"), muted: v("ink-muted"), subtle: v("ink-subtle"), tertiary: v("ink-tertiary") },
        primary: { DEFAULT: v("primary"), hover: v("primary-hover"), focus: v("primary-focus") },
        accent: v("accent"),
        success: v("success"),
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "SF Pro Display", "-apple-system", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: { site: "1280px" },
    },
  },
  plugins: [],
};

export default config;
