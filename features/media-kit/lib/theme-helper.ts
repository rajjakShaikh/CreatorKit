import React from "react";
import type { ThemePreset } from "@/types";

export function getThemeStyles(preset: ThemePreset, customAccent: string | null) {
  const p = preset.colors;
  const isDark = preset.id === "studio";

  // Determine font family classes
  let fontClass = "font-sans";
  if (preset.fontFamily === "serif") fontClass = "font-serif";
  if (preset.fontFamily === "display") fontClass = "font-sans tracking-tight";

  // Determine border radius classes
  let radiusClass = "[--radius:0.625rem]";
  if (preset.radius === "sm") radiusClass = "[--radius:0.375rem]";
  if (preset.radius === "lg") radiusClass = "[--radius:1rem]";

  // Override standard tailwind theme variables locally so cards, bg, text react to preset selection
  const style = {
    "--background": p.background,
    "--foreground": p.foreground,
    "--card": isDark ? "oklch(0.18 0 0)" : "oklch(1 0 0)",
    "--card-foreground": p.foreground,
    "--muted": isDark ? "oklch(0.22 0.01 0)" : "oklch(0.96 0.01 0)",
    "--muted-foreground": isDark ? "oklch(0.65 0.01 0)" : "oklch(0.45 0.01 0)",
    "--border": isDark ? "oklch(1 0 0 / 10%)" : "oklch(0.90 0 0)",
    "--primary": p.primary,
    "--primary-foreground": isDark ? "oklch(0.12 0 0)" : "oklch(1 0 0)",
    "--accent": customAccent ?? p.accent,
    "--accent-foreground": isDark ? "oklch(0.12 0 0)" : "oklch(1 0 0)",
    // Also set specific brand properties for gradient utility classes
    "--brand-primary": p.primary,
    "--brand-accent": customAccent ?? p.accent,
    backgroundColor: p.background,
    color: p.foreground,
  } as React.CSSProperties;

  return {
    style,
    className: `${fontClass} ${radiusClass}`,
  };
}
