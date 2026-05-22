"use client";

import { useState, useRef } from "react";
import { PageHeader } from "@/components/shared";
import { PageTransition } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { themePresets } from "@/data/mock/theme-presets";
import { useThemeStore } from "@/stores/theme-store";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";
import { motion } from "framer-motion";
import {
  Palette,
  Sun,
  Moon,
  Monitor,
  CheckCircle2,
  Upload,
  Type,
  Sparkles,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { APP_ROUTES } from "@/lib/constants";

const typographyOptions = [
  {
    id: "sans",
    label: "Modern Sans",
    description: "Clean, contemporary",
    sample: "Aa",
    fontStyle: "font-sans",
  },
  {
    id: "serif",
    label: "Editorial Serif",
    description: "Elegant, editorial",
    sample: "Aa",
    fontStyle: "font-serif",
  },
  {
    id: "display",
    label: "Display Bold",
    description: "High-impact, expressive",
    sample: "Aa",
    fontStyle: "font-sans tracking-tight",
  },
];

const radiusOptions = [
  { id: "sm", label: "Sharp", value: "4px", class: "rounded" },
  { id: "md", label: "Rounded", value: "8px", class: "rounded-lg" },
  { id: "lg", label: "Pill", value: "16px", class: "rounded-2xl" },
];

export function ThemeSettings() {
  const mounted = useMounted();
  const { mode, activePresetId, customAccent, setMode, setPreset, setCustomAccent, getActivePreset } =
    useThemeStore();
  const active = getActivePreset();

  const [selectedTypography, setSelectedTypography] = useState("sans");
  const [selectedRadius, setSelectedRadius] = useState("md");
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
  const [uploadedBanner, setUploadedBanner] = useState<string | null>(null);
  const [accentInput, setAccentInput] = useState(customAccent || "");

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (v: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setter(url);
  };

  if (!mounted) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <span className="animate-pulse text-xs text-muted-foreground">Loading theme settings...</span>
      </div>
    );
  }

  return (
    <PageTransition>
      <PageHeader
        title="Theme & Branding"
        description="Customize your media kit colors, typography, and profile appearance."
      >
        <Button
          variant="outline"
          size="sm"
          render={<Link href={`/alex-chen`} target="_blank" />}
          className="gap-1.5 text-xs"
        >
          <ExternalLink className="size-3.5" />
          Preview Profile
        </Button>
        <Button
          render={<Link href={APP_ROUTES.mediaKitBuilder} />}
          size="sm"
          className="gap-1.5 text-xs"
        >
          <Sparkles className="size-3.5" />
          Open Builder
        </Button>
      </PageHeader>

      <div className="mt-8 space-y-8">

        {/* ── SECTION 1: DARK / LIGHT MODE ── */}
        <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Monitor className="size-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">Color Mode</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Control how the UI and your profile look</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-sm">
            {[
              { id: "light", label: "Light", icon: Sun },
              { id: "dark", label: "Dark", icon: Moon },
              { id: "system", label: "System", icon: Monitor },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setMode(id as any)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border p-4 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5",
                  mode === id
                    ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20 shadow-xs"
                    : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                <Icon className="size-5" />
                {label}
                {mode === id && <CheckCircle2 className="size-3 text-primary" />}
              </button>
            ))}
          </div>
        </section>

        {/* ── SECTION 2: THEME PRESETS ── */}
        <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Palette className="size-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">Color Theme</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Choose a curated theme for your media kit and profile</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {themePresets.map((preset) => {
              const isActive = activePresetId === preset.id;
              return (
                <motion.button
                  key={preset.id}
                  onClick={() => setPreset(preset.id)}
                  whileHover={{ y: -2 }}
                  className={cn(
                    "relative flex flex-col items-start rounded-2xl border p-4 text-left transition-all duration-200",
                    isActive
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-sm"
                      : "border-border/50 hover:border-border hover:shadow-xs"
                  )}
                >
                  {isActive && (
                    <span className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-primary">
                      <CheckCircle2 className="size-3 text-primary-foreground" />
                    </span>
                  )}
                  {/* Color swatches */}
                  <div className="mb-3 flex gap-1.5">
                    {Object.values(preset.colors).slice(0, 3).map((color, i) => (
                      <span
                        key={i}
                        className="size-6 rounded-full border border-border/20 shadow-xs"
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-foreground">{preset.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{preset.description}</p>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* ── SECTION 3: CUSTOM ACCENT COLOR ── */}
        <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">Custom Accent Color</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Override the preset accent with your brand color</p>
            </div>
          </div>

          <div className="flex items-center gap-4 max-w-sm">
            <div className="relative">
              <input
                type="color"
                value={accentInput || "#6366f1"}
                onChange={(e) => {
                  setAccentInput(e.target.value);
                  setCustomAccent(e.target.value);
                }}
                className="size-12 cursor-pointer rounded-xl border border-border/50 p-1 bg-background"
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground mb-1.5 block">Hex Value</Label>
              <div className="flex gap-2">
                <Input
                  value={accentInput}
                  onChange={(e) => setAccentInput(e.target.value)}
                  placeholder="#6366f1"
                  className="h-9 text-xs font-mono"
                />
                <Button
                  size="sm"
                  className="h-9 text-xs px-3"
                  onClick={() => setCustomAccent(accentInput || null)}
                >
                  Apply
                </Button>
                {customAccent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 text-xs px-3 text-muted-foreground"
                    onClick={() => {
                      setCustomAccent(null);
                      setAccentInput("");
                    }}
                  >
                    <RotateCcw className="size-3.5" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {customAccent && (
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <span
                className="size-4 rounded-full border border-border/20"
                style={{ background: customAccent }}
              />
              Custom accent active: <span className="font-mono text-foreground">{customAccent}</span>
            </div>
          )}
        </section>

        {/* ── SECTION 4: TYPOGRAPHY ── */}
        <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Type className="size-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">Typography</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Select the typeface style for your media kit</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {typographyOptions.map((opt) => {
              const isSelected = selectedTypography === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedTypography(opt.id)}
                  className={cn(
                    "flex flex-col items-start rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5",
                    isSelected
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                      : "border-border/50 hover:border-border hover:shadow-xs"
                  )}
                >
                  <span className={cn("text-4xl font-bold text-foreground leading-none mb-2", opt.fontStyle)}>
                    {opt.sample}
                  </span>
                  <span className="text-xs font-bold text-foreground">{opt.label}</span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">{opt.description}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── SECTION 5: BORDER RADIUS ── */}
        <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-xs">
          <h2 className="text-sm font-bold text-foreground mb-1">Corner Radius</h2>
          <p className="text-xs text-muted-foreground mb-4">Controls how rounded your cards and buttons appear</p>

          <div className="flex gap-3">
            {radiusOptions.map((opt) => {
              const isSelected = selectedRadius === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedRadius(opt.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 border p-4 text-xs transition-all duration-200",
                    opt.class,
                    isSelected
                      ? "border-primary bg-primary/5 text-primary ring-2 ring-primary/20"
                      : "border-border/50 text-muted-foreground hover:border-border"
                  )}
                >
                  <div
                    className={cn("size-8 bg-primary/20", opt.class)}
                  />
                  <span className="font-semibold">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── SECTION 6: PROFILE IMAGES ── */}
        <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Upload className="size-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-foreground">Profile Images</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Upload your avatar and banner for the public profile</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Avatar Upload */}
            <div>
              <Label className="text-xs font-bold text-foreground mb-2 block">Profile Avatar</Label>
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-2xl border-2 border-dashed border-border/50 bg-muted/20 overflow-hidden flex items-center justify-center">
                  {uploadedAvatar ? (
                    <img src={uploadedAvatar} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xl font-bold text-muted-foreground/30">AC</span>
                  )}
                </div>
                <div className="space-y-2">
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, setUploadedAvatar)}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <Upload className="size-3 mr-1.5" />
                    Upload Photo
                  </Button>
                  <p className="text-[10px] text-muted-foreground">JPG, PNG, WebP. Max 5MB.</p>
                </div>
              </div>
            </div>

            {/* Banner Upload */}
            <div>
              <Label className="text-xs font-bold text-foreground mb-2 block">Profile Banner</Label>
              <div
                className="relative h-16 rounded-xl border-2 border-dashed border-border/50 bg-muted/20 overflow-hidden flex items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => bannerInputRef.current?.click()}
              >
                {uploadedBanner ? (
                  <img src={uploadedBanner} alt="Banner" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                    <Upload className="size-4" />
                    <span>Click to upload banner (1200×400px)</span>
                  </div>
                )}
                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, setUploadedBanner)}
                />
              </div>
              <p className="mt-1.5 text-[10px] text-muted-foreground">Recommended: 1200×400px, JPG or PNG.</p>
            </div>
          </div>
        </section>

        {/* ── LIVE PREVIEW SUMMARY ── */}
        <section className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-transparent p-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-sm font-bold text-foreground">Active Configuration</h2>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span
                    className="size-4 rounded-full border border-border/20"
                    style={{ background: active.colors.primary }}
                  />
                  {active.name} theme
                </span>
                <span>•</span>
                <span className="capitalize">{mode} mode</span>
                <span>•</span>
                <span className="capitalize">{selectedTypography} font</span>
                <span>•</span>
                <span className="capitalize">{selectedRadius} radius</span>
                {customAccent && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="size-3 rounded-full" style={{ background: customAccent }} />
                      Custom accent
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                render={<Link href={`/alex-chen`} target="_blank" />}
              >
                <ExternalLink className="size-3.5 mr-1.5" />
                Preview
              </Button>
              <Button
                size="sm"
                className="text-xs"
                render={<Link href={APP_ROUTES.mediaKitBuilder} />}
              >
                <Sparkles className="size-3.5 mr-1.5" />
                Apply in Builder
              </Button>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
