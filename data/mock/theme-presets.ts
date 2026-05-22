import type { ThemePreset } from "@/types";

export const themePresets: ThemePreset[] = [
  {
    id: "link",
    name: "Link",
    description: "Linktree-ready vibrant green",
    colors: {
      primary: "oklch(0.50 0.22 145)",
      accent: "oklch(0.65 0.18 165)",
      background: "oklch(0.97 0.015 145)",
      foreground: "oklch(0.18 0.03 145)",
    },
    fontFamily: "sans",
    radius: "lg",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean Notion-inspired neutrals",
    colors: {
      primary: "oklch(0.45 0.02 260)",
      accent: "oklch(0.55 0.08 260)",
      background: "oklch(0.99 0 0)",
      foreground: "oklch(0.18 0 0)",
    },
    fontFamily: "sans",
    radius: "md",
  },
  {
    id: "studio",
    name: "Studio",
    description: "Bold Behance-style contrast",
    colors: {
      primary: "oklch(0.55 0.22 25)",
      accent: "oklch(0.72 0.18 55)",
      background: "oklch(0.12 0 0)",
      foreground: "oklch(0.96 0 0)",
    },
    fontFamily: "display",
    radius: "sm",
  },
  {
    id: "bloom",
    name: "Bloom",
    description: "Soft Canva gradients & warmth",
    colors: {
      primary: "oklch(0.58 0.16 330)",
      accent: "oklch(0.75 0.12 180)",
      background: "oklch(0.98 0.01 330)",
      foreground: "oklch(0.22 0.02 330)",
    },
    fontFamily: "serif",
    radius: "lg",
  },
];

