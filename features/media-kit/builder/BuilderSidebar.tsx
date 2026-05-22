"use client";

import React from "react";
import { useMediaKitStore } from "../store/media-kit-store";
import { blockRegistry } from "../blocks";
import { useThemeStore } from "@/stores/theme-store";
import { themePresets } from "@/data/mock/theme-presets";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  Plus,
  Trash2,
  Settings,
  Eye,
  EyeOff,
  Sparkles,
  GripVertical,
  Layers,
  Palette,
} from "lucide-react";
import type { MediaKitBlockType } from "@/types";

export function BuilderSidebar() {
  const {
    blocks,
    activeBlockId,
    setActiveBlockId,
    removeBlock,
    updateBlock,
    updateBlockContent,
    addBlock,
    resetToDefault,
  } = useMediaKitStore();

  const { activePresetId, setPreset } = useThemeStore();

  const activeBlock = blocks.find((b) => b.id === activeBlockId);

  // If a block is selected, show its editor
  if (activeBlock) {
    const registry = blockRegistry[activeBlock.type];
    if (!registry) return null;
    const EditorComponent = registry.editor;

    return (
      <div className="flex h-full w-80 flex-col border-r bg-card text-card-foreground shadow-xs">
        {/* Header */}
        <div className="flex items-center gap-3 border-b px-4 py-3 shrink-0 bg-muted/10">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setActiveBlockId(null)}
            className="size-8 rounded-lg hover:bg-muted/80 transition-colors"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="min-w-0 flex-1">
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-wider">
              Editing Section
            </h3>
            <p className="text-xs font-semibold truncate text-foreground mt-0.5">
              {activeBlock.title || registry.label}
            </p>
          </div>
        </div>

        {/* Scrollable controls */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-6">
            {/* General Section Controls */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="sectionName" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Section Title</Label>
                <Input
                  id="sectionName"
                  value={activeBlock.title || ""}
                  onChange={(e) => updateBlock(activeBlock.id, { title: e.target.value })}
                  placeholder="e.g. My Biography"
                  className="h-9 text-xs"
                />
              </div>

              <div className="flex items-center justify-between py-2 bg-muted/20 px-3 rounded-xl border border-border/40">
                <span className="text-xs font-semibold text-muted-foreground">Visible on profile</span>
                <Switch
                  checked={activeBlock.visible}
                  onCheckedChange={(checked) =>
                    updateBlock(activeBlock.id, { visible: checked })
                  }
                />
              </div>
            </div>

            <Separator className="bg-border/50" />

            {/* Custom Block editor fields */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-primary" />
                Content Properties
              </span>
              <div className="bg-muted/5 p-3 rounded-xl border border-border/30">
                <EditorComponent
                  content={activeBlock.content}
                  onChange={(updates) => updateBlockContent(activeBlock.id, updates)}
                />
              </div>
            </div>

            <Separator className="bg-border/50" />

            {/* Danger Zone */}
            <div className="pt-2">
              <Button
                variant="destructive"
                className="w-full text-xs h-9 rounded-lg gap-1.5 shadow-sm hover:shadow-xs transition-shadow"
                onClick={() => removeBlock(activeBlock.id)}
              >
                <Trash2 className="size-3.5" /> Delete Section
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Global Workspace panel (Adding blocks, global presets)
  return (
    <div className="flex h-full w-80 flex-col border-r bg-card text-card-foreground shrink-0 shadow-xs">
      {/* Header */}
      <div className="flex items-center gap-3 border-b px-4 py-4 shrink-0 bg-muted/10">
        <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shadow-2xs">
          <Settings className="size-4 animate-spin-slow" />
        </div>
        <div>
          <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">Builder Controls</h2>
          <p className="text-[10px] text-muted-foreground mt-0.5">Notion + Canva Creator Workspace</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-6">
          {/* Active Sections list */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider block flex items-center gap-1.5">
              <Layers className="size-3.5" />
              Active Sections
            </span>
            <div className="space-y-1.5">
              {blocks.map((b) => {
                const registry = blockRegistry[b.type];
                const isCurrentActive = activeBlockId === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setActiveBlockId(b.id)}
                    className={`relative flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xs ${isCurrentActive
                        ? "border-primary/40 bg-primary/5 ring-1 ring-primary/20 shadow-xs"
                        : "border-border/40 bg-muted/5 hover:bg-muted/10 hover:border-primary/10"
                      }`}
                  >
                    {isCurrentActive && (
                      <div className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-primary rounded-r-md" />
                    )}
                    <div className="flex items-center gap-2.5 min-w-0 pl-1.5">
                      <GripVertical className={`size-3.5 shrink-0 transition-colors ${isCurrentActive ? "text-primary/60" : "text-muted-foreground/30"}`} />
                      <span className={`text-xs truncate transition-colors ${isCurrentActive ? "font-bold text-foreground" : "font-semibold text-foreground/80"}`}>
                        {b.title || registry?.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 relative z-10">
                      {b.visible ? (
                        <span className="inline-flex size-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/10">
                          <Eye className="size-3" />
                        </span>
                      ) : (
                        <span className="inline-flex size-5 items-center justify-center rounded-full bg-destructive/10 text-destructive border border-destructive/10">
                          <EyeOff className="size-3" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
              {blocks.length === 0 && (
                <p className="text-xs text-muted-foreground italic py-4 text-center border border-dashed rounded-xl bg-muted/5">
                  No active sections. Add one below!
                </p>
              )}
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Theme customizer preset buttons */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider block flex items-center gap-1.5">
              <Palette className="size-3.5" />
              Theme Preset
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {themePresets.map((preset) => {
                const isActivePreset = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => setPreset(preset.id)}
                    className={`group flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs ${isActivePreset
                        ? "border-primary bg-primary/5 ring-2 ring-primary/10 shadow-xs"
                        : "border-border/50 bg-background/50 hover:bg-muted/20 hover:border-border/80"
                      }`}
                  >
                    <div className="flex gap-1 mb-2 items-center justify-between w-full">
                      <div className="flex gap-1">
                        {Object.values(preset.colors).slice(0, 2).map((col, idx) => (
                          <span
                              key={idx}
                              className="size-3.5 rounded-full border border-border/20 shadow-2xs transition-transform group-hover:scale-110"
                              style={{ backgroundColor: col }}
                          />
                        ))}
                      </div>
                      {isActivePreset && (
                        <span className="size-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-foreground group-hover:text-primary transition-colors">
                      {preset.name}
                    </span>
                    <span className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate w-full">
                      {preset.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Add block selector */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider block flex items-center gap-1.5">
              <Plus className="size-3.5" />
              Add Content Section
            </span>
            <div className="space-y-2">
              {(Object.keys(blockRegistry) as MediaKitBlockType[]).map((type) => {
                const reg = blockRegistry[type];
                return (
                  <button
                    key={type}
                    onClick={() => addBlock(type)}
                    className="group flex w-full items-start gap-3 rounded-xl border border-border/40 bg-background p-3 hover:-translate-y-0.5 hover:bg-muted/10 hover:border-primary/20 hover:shadow-xs text-left transition-all duration-200"
                  >
                    <div className="size-7 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-2xs group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                      <Plus className="size-4 transition-transform duration-300 group-hover:rotate-90" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                        {reg.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-tight mt-1 truncate">
                        {reg.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Reset Workspace */}
          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full text-xs h-9 rounded-xl text-muted-foreground hover:bg-muted/20 hover:text-foreground transition-all duration-200 border-dashed"
              onClick={resetToDefault}
            >
              Reset to Default Layout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
