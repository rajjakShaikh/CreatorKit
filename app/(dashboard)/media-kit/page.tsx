"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shared";
import { PageTransition } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMediaKitStore } from "@/features/media-kit";
import { blockRegistry } from "@/features/media-kit/blocks";
import { useMounted } from "@/hooks/use-mounted";
import { motion } from "framer-motion";
import {
  Palette,
  ExternalLink,
  Eye,
  MousePointerClick,
  Calendar,
  Sparkles,
  CheckCircle2,
  CircleDashed,
  ArrowRight,
  Share2,
  Download,
  Zap,
  BarChart3,
} from "lucide-react";
import { APP_ROUTES } from "@/lib/constants";
import type { MediaKitBlockType } from "@/types";

export default function MediaKitPage() {
  const mounted = useMounted();
  const { blocks, publishedBlocks } = useMediaKitStore();

  const stats = [
    { label: "Total Views", value: "2,840", icon: Eye, color: "text-violet-500", bg: "bg-violet-500/10" },
    { label: "Brand Clicks", value: "142", icon: MousePointerClick, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Kit Downloads", value: "38", icon: Download, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Last Updated", value: "Today", icon: Calendar, color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  // Calculate kit completion
  const requiredSections: MediaKitBlockType[] = ["bio", "stats", "social", "gallery", "testimonials", "rates"];
  const activeTypes = blocks.map((b) => b.type);
  const completedSections = requiredSections.filter((s) => activeTypes.includes(s));
  const completionPercent = Math.round((completedSections.length / requiredSections.length) * 100);

  const isPublished = publishedBlocks !== null;

  if (!mounted) {
    return (
      <PageTransition>
        <div className="flex min-h-[400px] items-center justify-center">
          <span className="animate-pulse text-xs text-muted-foreground">Loading media kit...</span>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageHeader
        title="Media Kit"
        description="Manage, share, and track your public-facing creator media kit."
      >
        <Button variant="outline" size="sm" className="gap-1.5 text-xs" render={<a href="/alex-chen" target="_blank" />}>
          <ExternalLink className="size-3.5" />
          View Live
        </Button>
        <Button render={<Link href={APP_ROUTES.mediaKitBuilder} />} className="gap-1.5">
          <Palette className="size-4" />
          Open Builder
        </Button>
      </PageHeader>

      {/* ── STATS ROW ── */}
      <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border/50 bg-card p-4 shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{s.label}</span>
              <div className={`flex size-7 items-center justify-center rounded-lg ${s.bg} ${s.color}`}>
                <s.icon className="size-3.5" />
              </div>
            </div>
            <p className="text-2xl font-extrabold tracking-tight text-foreground">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* ── KIT STATUS CARD ── */}
      <div className="mt-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border/50 bg-card p-6 shadow-xs"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-foreground">Alex Chen — Official Media Kit</h3>
                    <Badge
                      className={`text-[10px] font-bold px-2 py-0.5 ${
                        isPublished
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                      }`}
                    >
                      {isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground max-w-xl">
                    Your media kit showcases your bio, audience data, platform stats, brand collabs, testimonials, and rates.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    URL:{" "}
                    <span className="font-semibold text-foreground font-mono text-[11px]">
                      creatorkit.co/alex-chen
                    </span>
                  </p>
                </div>
              </div>

              {/* Completion Progress */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Kit Completion</span>
                  <span className="text-xs font-bold text-foreground">{completionPercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted/40 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercent}%` }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {completedSections.length} of {requiredSections.length} recommended sections complete
                </p>
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-2.5 shrink-0">
              <Button render={<Link href={APP_ROUTES.mediaKitBuilder} />} className="gap-1.5 flex-1 md:flex-none">
                <Sparkles className="size-3.5" />
                Edit Design
              </Button>
              <Button
                variant="outline"
                render={<a href="/alex-chen" target="_blank" rel="noopener noreferrer" />}
                className="gap-1.5 flex-1 md:flex-none"
              >
                View Live <ExternalLink className="size-3.5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── SECTION CHECKLIST ── */}
      <div className="mt-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Section Checklist</h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {requiredSections.map((sectionType) => {
            const reg = blockRegistry[sectionType as keyof typeof blockRegistry];
            const block = blocks.find((b) => b.type === sectionType);
            const isComplete = !!block;
            const isVisible = block?.visible ?? false;

            return (
              <motion.div
                key={sectionType}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                  isComplete
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-border/40 bg-muted/5"
                }`}
              >
                {isComplete ? (
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                ) : (
                  <CircleDashed className="size-4 text-muted-foreground/30 shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <p className={`text-xs font-bold truncate ${isComplete ? "text-foreground" : "text-muted-foreground"}`}>
                    {reg?.label || sectionType}
                  </p>
                  {isComplete && (
                    <p className="text-[10px] text-muted-foreground/70">
                      {isVisible ? "Visible on profile" : "Hidden from profile"}
                    </p>
                  )}
                </div>
                {!isComplete && (
                  <Link href={APP_ROUTES.mediaKitBuilder}>
                    <span className="text-[10px] font-bold text-primary whitespace-nowrap hover:underline">+ Add</span>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── TIPS GRID ── */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="p-4 rounded-xl border border-border/40 bg-muted/5 flex gap-3">
          <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Zap className="size-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Pro Tip: Rates</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              Creators who display clear pricing packages get booked <strong>40% faster</strong> by brand managers.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border/40 bg-muted/5 flex gap-3">
          <div className="size-8 rounded-lg bg-violet-500/10 text-violet-500 flex items-center justify-center shrink-0">
            <BarChart3 className="size-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Analytics Tip</h4>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
              Include audience demographics to help brands understand your reach. It increases inquiry conversion by 60%.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
