"use client";

import React, { useMemo } from "react";
import { useMediaKitStore } from "../store/media-kit-store";
import { useThemeStore } from "@/stores/theme-store";
import { blockRegistry } from "../blocks";
import { getThemeStyles } from "../lib/theme-helper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PreviewRenderer() {
  const { blocks, previewMode, setPreviewMode } = useMediaKitStore();
  const activePresetId = useThemeStore((s) => s.activePresetId);
  const customAccent = useThemeStore((s) => s.customAccent);
  const getActivePreset = useThemeStore((s) => s.getActivePreset);

  const themePreset = useMemo(() => {
    return getActivePreset();
  }, [activePresetId, getActivePreset]);

  const visibleBlocks = useMemo(() => {
    return blocks
      .filter((b) => b.visible)
      .sort((a, b) => a.order - b.order);
  }, [blocks]);

  const bioBlock = useMemo(() => {
    return blocks.find((b) => b.type === "bio" || b.type === "hero");
  }, [blocks]);

  // Mapping theme values to CSS styles applied to the canvas frame wrapper
  const themeStyles = useMemo(() => {
    return getThemeStyles(themePreset, customAccent);
  }, [themePreset, customAccent]);

  return (
    <div className="flex flex-1 flex-col bg-muted/30 h-full overflow-hidden">
      {/* Top bar controls */}
      <div className="flex items-center justify-between border-b bg-card px-4 py-2 text-card-foreground shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground">Live Profile Preview</span>
          {previewMode === "desktop" && (
            <Button
              variant="outline"
              size="xs"
              onClick={() => setPreviewMode("mobile")}
              className="text-[10px] h-6 px-2 rounded-md font-bold"
            >
              Back to Editor
            </Button>
          )}
        </div>
        <div className="flex gap-1.5">
          <Button
            variant={previewMode === "desktop" ? "secondary" : "ghost"}
            size="icon-xs"
            onClick={() => setPreviewMode("desktop")}
            className="size-7"
            title="Desktop view"
          >
            <Monitor className="size-4" />
          </Button>
          <Button
            variant={previewMode === "mobile" ? "secondary" : "ghost"}
            size="icon-xs"
            onClick={() => setPreviewMode("mobile")}
            className="size-7"
            title="Mobile viewport"
          >
            <Smartphone className="size-4" />
          </Button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className={cn(
        "flex-1 px-4 py-6 flex justify-center items-start",
        previewMode === "mobile" ? "h-full overflow-hidden items-center" : "overflow-y-auto custom-scrollbar"
      )}>
        {previewMode === "mobile" ? (
          /* Mobile Phone Mockup Frame */
          <div className="relative mx-auto h-full max-h-[640px] w-[320px] rounded-[36px] border-[10px] border-neutral-900 bg-neutral-950 p-1.5 shadow-2xl transition-all duration-300 ring-4 ring-neutral-800 flex flex-col shrink-0 select-none">
            {/* Speaker bar / Notch / Dynamic Island */}
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 h-4.5 w-20 rounded-full bg-neutral-900 z-50 flex items-center justify-center border border-neutral-800/30">
              <span className="h-1 w-6 rounded-full bg-neutral-800" />
            </div>

            {/* Simulated Phone Side Buttons */}
            <div className="absolute top-20 -left-3.5 w-1 h-8 rounded-l bg-neutral-800 border-l border-neutral-700" title="Volume Up" />
            <div className="absolute top-30 -left-3.5 w-1 h-8 rounded-l bg-neutral-800 border-l border-neutral-700" title="Volume Down" />
            <div className="absolute top-24 -right-3.5 w-1 h-12 rounded-r bg-neutral-800 border-r border-neutral-700" title="Power Button" />

            {/* Inner Mobile Screen */}
            <div
              className={cn(
                "h-full w-full rounded-[24px] flex flex-col relative overflow-hidden",
                themeStyles.className
              )}
              style={themeStyles.style}
            >
              {/* Simulated iOS Status Bar */}
              <div className="flex justify-between items-center px-5 pt-3 pb-1.5 text-[9px] font-bold text-foreground/60 select-none shrink-0 z-40 bg-transparent">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  {/* Signal */}
                  <svg className="size-2.5 fill-current opacity-85" viewBox="0 0 24 24">
                    <path d="M2 22h20V2z"/>
                  </svg>
                  {/* Wifi */}
                  <svg className="size-2.5 fill-current opacity-85" viewBox="0 0 24 24">
                    <path d="M12 21a9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9 9 9 0 0 1-9 9zm0-15a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6z"/>
                  </svg>
                  {/* Battery */}
                  <div className="w-4.5 h-2.5 border border-foreground/40 rounded-xs p-0.5 flex items-center opacity-85">
                    <div className="h-full w-2.5 bg-foreground/75 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Scrollable Screen Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar px-3 pt-2 pb-6 space-y-4 relative">
                {visibleBlocks.map((block) => {
                  const reg = blockRegistry[block.type];
                  if (!reg) return null;
                  const Display = reg.display;
                  return (
                    <div key={block.id} className="w-full">
                      <Display content={block.content} />
                    </div>
                  );
                })}
                {visibleBlocks.length === 0 && (
                  <div className="py-20 text-center text-xs text-muted-foreground">
                    Your profile is empty. Turn on section visibility or add blocks.
                  </div>
                )}
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-foreground/20 z-40 select-none pointer-events-none" />
            </div>
          </div>
        ) : (
          /* Desktop Bento Canvas */
          <div
            className={cn(
              "w-full max-w-4xl min-h-[580px] rounded-2xl border p-8 shadow-md transition-all duration-300",
              themeStyles.className
            )}
            style={themeStyles.style}
          >
            {/* Sleek Top Navigation Bar */}
            <div className="mb-8 flex items-center justify-between pb-4 border-b border-border/20">
              <div className="flex items-center gap-3">
                {bioBlock && (
                  <div className="size-9 rounded-full overflow-hidden border border-border/50 bg-muted shrink-0 shadow-2xs">
                    {(bioBlock.content as any).avatarUrl ? (
                      <img
                        src={(bioBlock.content as any).avatarUrl}
                        alt={(bioBlock.content as any).displayName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {(bioBlock.content as any).displayName?.charAt(0)}
                      </div>
                    )}
                  </div>
                )}
                <div className="min-w-0">
                  <span className="text-sm font-bold text-foreground block leading-tight truncate">
                    {bioBlock ? ((bioBlock.content as any)?.displayName || "Creator Profile") : "Creator Profile"}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground block mt-0.5">
                    Verified Media Kit
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-2xs">
                  <span className="size-1 rounded-full bg-emerald-500 animate-ping" />
                  <span>Accepting Bookings</span>
                </span>
                <span className="inline-flex items-center justify-center rounded-xl bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
                  Work With Me
                </span>
              </div>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              {visibleBlocks.map((block) => {
                const reg = blockRegistry[block.type];
                if (!reg) return null;
                const Display = reg.display;
                
                let spanClass = "col-span-full";
                if (block.type === "social") spanClass = "md:col-span-2 col-span-full";
                if (block.type === "stats") spanClass = "md:col-span-1 col-span-full";
                if (block.type === "gallery") spanClass = "md:col-span-2 col-span-full";
                if (block.type === "testimonials") spanClass = "md:col-span-1 col-span-full";

                return (
                  <div
                    key={block.id}
                    className={cn("transition-all duration-300", spanClass)}
                    style={{ order: block.order }}
                  >
                    <Display content={block.content} />
                  </div>
                );
              })}
              {visibleBlocks.length === 0 && (
                <div className="col-span-full py-32 text-center text-sm text-muted-foreground">
                  Your profile is empty. Enable blocks or add content to preview.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
