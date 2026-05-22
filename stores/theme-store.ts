import { create } from "zustand";
import { persist } from "zustand/middleware";
import { themePresets } from "@/data/mock/theme-presets";
import type { ThemePreset } from "@/types";

interface ThemeState {
  mode: "light" | "dark" | "system";
  activePresetId: string;
  customAccent: string | null;
  setMode: (mode: ThemeState["mode"]) => void;
  setPreset: (presetId: string) => void;
  setCustomAccent: (color: string | null) => void;
  getActivePreset: () => ThemePreset;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "system",
      activePresetId: themePresets[0].id,
      customAccent: null,
      setMode: (mode) => set({ mode }),
      setPreset: (activePresetId) => set({ activePresetId }),
      setCustomAccent: (customAccent) => set({ customAccent }),
      getActivePreset: () => {
        const { activePresetId } = get();
        return (
          themePresets.find((p) => p.id === activePresetId) ?? themePresets[0]
        );
      },
    }),
    { name: "creatorkit-theme" }
  )
);
