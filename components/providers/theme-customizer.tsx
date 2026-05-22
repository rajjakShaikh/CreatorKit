"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";
import { useThemeStore } from "@/stores/theme-store";

function adjustColorForDarkMode(oklchColor: string, isDark: boolean) {
  if (!isDark) return oklchColor;
  // Parse oklch(L C H) or oklch(L C H / alpha)
  const match = oklchColor.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.%]+))?\)/);
  if (!match) return oklchColor;
  const l = parseFloat(match[1]);
  const c = parseFloat(match[2]);
  const h = parseFloat(match[3]);
  const alpha = match[4];

  // If lightness is dark, make it lighter for dark mode
  if (l < 0.7) {
    const newL = Math.max(l + 0.3, 0.75);
    return `oklch(${newL.toFixed(3)} ${c} ${h}${alpha ? ` / ${alpha}` : ""})`;
  }
  return oklchColor;
}

function getContrastColor(oklchColor: string) {
  const match = oklchColor.match(/oklch\(([\d.]+)/);
  if (match) {
    const l = parseFloat(match[1]);
    if (l >= 0.75) {
      return "oklch(0.15 0 0)"; // dark text on light backgrounds
    }
  }
  return "oklch(0.985 0 0)"; // light text on dark backgrounds
}

/** Applies Zustand theme preset tokens to document CSS variables */
export function ThemeCustomizer() {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const { mode, activePresetId, getActivePreset, customAccent } = useThemeStore();

  useEffect(() => {
    if (!mounted) return;

    const preset = getActivePreset();
    const root = document.documentElement;
    const isDark = resolvedTheme === "dark";

    const basePrimary = preset.colors.primary;
    const baseAccent = customAccent ?? preset.colors.accent;

    // Adjust colors for dark mode to ensure high contrast in the dashboard UI
    const adjustedPrimary = adjustColorForDarkMode(basePrimary, isDark);
    const adjustedAccent = adjustColorForDarkMode(baseAccent, isDark);

    const primaryForeground = getContrastColor(adjustedPrimary);
    const accentForeground = getContrastColor(adjustedAccent);

    // Set brand-specific variables
    root.style.setProperty("--brand-primary", basePrimary);
    root.style.setProperty("--brand-accent", baseAccent);
    root.style.setProperty(
      "--brand-radius",
      preset.radius === "sm" ? "0.375rem" : preset.radius === "lg" ? "1rem" : "0.625rem"
    );
    root.dataset.fontFamily = preset.fontFamily;

    // Apply globally so that buttons, badges, and focus rings react to theme preset changes
    root.style.setProperty("--primary", adjustedPrimary);
    root.style.setProperty("--primary-foreground", primaryForeground);
    root.style.setProperty("--accent", adjustedAccent);
    root.style.setProperty("--accent-foreground", accentForeground);
    root.style.setProperty(
      "--radius",
      preset.radius === "sm" ? "0.375rem" : preset.radius === "lg" ? "1rem" : "0.625rem"
    );
  }, [mounted, mode, resolvedTheme, activePresetId, getActivePreset, customAccent]);

  return null;
}

