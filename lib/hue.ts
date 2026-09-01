import type { Hue } from "@/constants/data";

// Tailwind can't build class names dynamically, so every hue → class mapping lives here, spelled out.
export const hueText: Record<Hue, string> = {
  blue: "text-hue-blue",
  violet: "text-hue-violet",
  emerald: "text-hue-emerald",
  amber: "text-hue-amber",
  rose: "text-hue-rose",
  cyan: "text-hue-cyan",
};
export const hueBg: Record<Hue, string> = {
  blue: "bg-hue-blue",
  violet: "bg-hue-violet",
  emerald: "bg-hue-emerald",
  amber: "bg-hue-amber",
  rose: "bg-hue-rose",
  cyan: "bg-hue-cyan",
};
export const hueBgSoft: Record<Hue, string> = {
  blue: "bg-hue-blue/10",
  violet: "bg-hue-violet/10",
  emerald: "bg-hue-emerald/10",
  amber: "bg-hue-amber/10",
  rose: "bg-hue-rose/10",
  cyan: "bg-hue-cyan/10",
};
export const hueBorder: Record<Hue, string> = {
  blue: "border-hue-blue",
  violet: "border-hue-violet",
  emerald: "border-hue-emerald",
  amber: "border-hue-amber",
  rose: "border-hue-rose",
  cyan: "border-hue-cyan",
};
export const hueBorderSoft: Record<Hue, string> = {
  blue: "border-hue-blue/40",
  violet: "border-hue-violet/40",
  emerald: "border-hue-emerald/40",
  amber: "border-hue-amber/40",
  rose: "border-hue-rose/40",
  cyan: "border-hue-cyan/40",
};
export const hueStroke: Record<Hue, string> = {
  blue: "stroke-hue-blue",
  violet: "stroke-hue-violet",
  emerald: "stroke-hue-emerald",
  amber: "stroke-hue-amber",
  rose: "stroke-hue-rose",
  cyan: "stroke-hue-cyan",
};
export const hueVar = (h: Hue) => `rgb(var(--hue-${h}))`;
