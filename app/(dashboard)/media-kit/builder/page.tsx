"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BuilderSidebar,
  BuilderCanvas,
  PreviewRenderer,
  useMediaKitStore,
} from "@/features/media-kit";
import { useThemeStore } from "@/stores/theme-store";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/motion";
import {
  ArrowLeft,
  CloudLightning,
  Sparkles,
  Eye,
  Settings,
} from "lucide-react";
import { APP_ROUTES } from "@/lib/constants";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export default function MediaKitBuilderPage() {
  const mounted = useMounted();
  const { blocks, publish, previewMode } = useMediaKitStore();
  const { activePresetId, customAccent } = useThemeStore();
  const [isPublishing, setIsPublishing] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");

  useEffect(() => {
    // Whenever layout changes, flash a "saving..." state
    setSaveStatus("saving");
    const t = setTimeout(() => {
      setSaveStatus("saved");
    }, 600);
    return () => clearTimeout(t);
  }, [blocks, activePresetId, customAccent]);

  if (!mounted) {
    return (
      <div className="flex h-full items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <span className="animate-pulse font-medium text-xs text-primary">Loading Builder Workspace...</span>
          <span className="text-[10px] text-muted-foreground">Hydrating your layout blocks</span>
        </div>
      </div>
    );
  }

  const handlePublish = () => {
    setIsPublishing(true);
    // Snapshot active layout and theme preset
    publish(activePresetId, customAccent);
    setTimeout(() => {
      setIsPublishing(false);
      alert("Media kit published successfully!");
    }, 800);
  };

  return (
    <PageTransition className="flex h-full w-full flex-col overflow-hidden">
      {/* Builder Top Bar Header */}
      <header className="flex h-14 items-center justify-between border-b bg-card px-4 text-card-foreground shrink-0 select-none">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            render={<Link href={APP_ROUTES.mediaKit} />}
            className="size-8"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-sm font-bold text-foreground flex items-center gap-1.5">
              Profile Builder <Sparkles className="size-3.5 text-primary fill-current" />
            </h1>
            <div className="mt-0.5 text-[10px] text-muted-foreground flex items-center gap-1">
              {saveStatus === "saving" ? (
                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/10">
                  <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>Saving changes...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/10">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span>All changes saved</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile View Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMobilePreview(!showMobilePreview)}
            className="flex lg:hidden text-xs gap-1"
          >
            <Eye className="size-3.5" />
            <span>{showMobilePreview ? "Edit blocks" : "View preview"}</span>
          </Button>

          <Button
            size="sm"
            onClick={handlePublish}
            disabled={isPublishing}
            className="text-xs"
          >
            {isPublishing ? "Publishing..." : "Publish Page"}
          </Button>
        </div>
      </header>

      {/* Main Workspace panels */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Side: Sidebar controls */}
        <div className={cn("h-full shrink-0", (showMobilePreview || previewMode === "desktop") ? "hidden" : "flex")}>
          <BuilderSidebar />
        </div>

        {/* Center: Canvas drag drop */}
        <div className={cn("h-full flex-1 flex flex-col min-w-0", (showMobilePreview || previewMode === "desktop") ? "hidden" : "flex")}>
          <BuilderCanvas />
        </div>

        {/* Right Side: Live device preview */}
        <div
          className={cn(
            "h-full flex-col border-l border-border bg-muted/20 min-w-0",
            showMobilePreview ? "flex" : (previewMode === "desktop" ? "flex flex-1" : "hidden lg:flex w-[400px] shrink-0")
          )}
        >
          <PreviewRenderer />
        </div>
      </div>
    </PageTransition>
  );
}
