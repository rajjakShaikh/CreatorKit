"use client";

import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMediaKitStore, blockRegistry, getThemeStyles } from "@/features/media-kit";
import { themePresets } from "@/data/mock/theme-presets";
import { defaultBlocks } from "@/features/media-kit/lib/defaults";
import { mockCreator } from "@/data/mock/creator";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Camera,
  Video,
  Users,
  TrendingUp,
  Eye,
  Handshake,
  CheckCircle2,
  Star,
  ArrowRight,
  ExternalLink,
  Play,
  Heart,
  Share2,
  Mail,
} from "lucide-react";

// Platform icon components
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.26 8.26 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z" />
    </svg>
  );
}

const platformIcons: Record<string, React.ReactNode> = {
  instagram: <Camera className="size-4" />,
  tiktok: <TikTokIcon className="size-4" />,
  youtube: <Video className="size-4" />,
};

const platformColors: Record<string, string> = {
  instagram: "bg-gradient-to-br from-purple-500 to-pink-500",
  tiktok: "bg-[#010101]",
  youtube: "bg-red-600",
};

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

// Featured content mock
const featuredContent = [
  {
    id: "1",
    title: "NYC Tech Week Vlog",
    platform: "youtube",
    views: "248K",
    engagement: "8.2%",
    type: "Video",
    thumbnail: null,
    gradient: "from-blue-600 to-violet-600",
  },
  {
    id: "2",
    title: "iPhone 16 Review",
    platform: "instagram",
    views: "189K",
    engagement: "11.4%",
    type: "Reel",
    thumbnail: null,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    id: "3",
    title: "Morning Routine 2024",
    platform: "tiktok",
    views: "512K",
    engagement: "14.7%",
    type: "Short",
    thumbnail: null,
    gradient: "from-emerald-500 to-teal-600",
  },
];

export function PublicProfileView() {
  const [mounted, setMounted] = useState(false);
  const { publishedBlocks, publishedPresetId, publishedCustomAccent } = useMediaKitStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const activePreset = useMemo(() => {
    return themePresets.find((p) => p.id === publishedPresetId) ?? themePresets[0];
  }, [publishedPresetId]);

  const themeStyles = useMemo(() => {
    return getThemeStyles(activePreset, publishedCustomAccent);
  }, [activePreset, publishedCustomAccent]);

  const blocksToRender = useMemo(() => {
    const source = publishedBlocks !== null ? publishedBlocks : defaultBlocks;
    return source.filter((b) => b.visible).sort((a, b) => a.order - b.order);
  }, [publishedBlocks]);

  const bioBlock = useMemo(() => {
    const source = publishedBlocks !== null ? publishedBlocks : defaultBlocks;
    return source.find((b) => b.type === "bio" || b.type === "hero");
  }, [publishedBlocks]);

  const bioContent = bioBlock?.content as any;

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-xs text-muted-foreground">Loading profile...</span>
        </div>
      </div>
    );
  }

  const displayName = bioContent?.displayName || mockCreator.displayName;
  const tagline = bioContent?.tagline || mockCreator.tagline;
  const bio = bioContent?.bio || mockCreator.bio;
  const location = bioContent?.location || mockCreator.location;

  return (
    <div
      className={cn("min-h-screen w-full transition-all duration-300", themeStyles.className)}
      style={themeStyles.style}
    >
      {/* ─── HERO SECTION ─── */}
      <section className="relative overflow-hidden">
        {/* Banner */}
        <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10">
          {bioContent?.bannerUrl ? (
            <img
              src={bioContent.bannerUrl}
              alt="Profile banner"
              className="h-full w-full object-cover"
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: `linear-gradient(135deg, ${activePreset.colors.primary}40, ${activePreset.colors.accent}30, transparent)`,
              }}
            >
              {/* Decorative patterns */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, ${activePreset.colors.primary} 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${activePreset.colors.accent} 0%, transparent 40%)`
                }}
              />
            </div>
          )}

          {/* Top nav bar overlay */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground/70 bg-background/30 backdrop-blur-md rounded-full px-3 py-1.5 border border-border/20">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for collaborations
            </div>
            <div className="flex items-center gap-2">
              <button className="size-8 rounded-full bg-background/30 backdrop-blur-md border border-border/20 flex items-center justify-center text-foreground/70 hover:bg-background/50 transition-colors">
                <Share2 className="size-3.5" />
              </button>
              <a
                href="#section-cta"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-md hover:opacity-90 transition-opacity"
              >
                Work With Me <ArrowRight className="size-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative -mt-14 pb-6 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="size-24 md:size-28 rounded-2xl overflow-hidden border-4 border-background bg-muted shadow-xl">
                {bioContent?.avatarUrl ? (
                  <img
                    src={bioContent.avatarUrl}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div
                    className="h-full w-full flex items-center justify-center text-3xl font-extrabold text-primary"
                    style={{ background: `${activePreset.colors.primary}20` }}
                  >
                    {displayName.charAt(0)}
                  </div>
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-emerald-500 border-2 border-background shadow-sm">
                <CheckCircle2 className="size-3 text-white" />
              </span>
            </div>

            {/* Name & Info */}
            <div className="flex-1 min-w-0 pt-2 sm:pt-14">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                      {displayName}
                    </h1>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary border border-primary/20">
                      <CheckCircle2 className="size-2.5" />
                      Verified Creator
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground font-medium">{tagline}</p>
                  {location && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground/70">
                      <MapPin className="size-3" />
                      {location}
                    </p>
                  )}
                </div>

                {/* Desktop CTA */}
                <div className="hidden sm:flex items-center gap-2 shrink-0">
                  <a
                    href="#section-cta"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
                  >
                    <Mail className="size-3.5" />
                    Work With Me
                  </a>
                </div>
              </div>

              {/* Niche Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {mockCreator.niche.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold border border-border/50 bg-muted/30 text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile CTA */}
          <a
            href="#section-cta"
            className="sm:hidden mb-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-sm"
          >
            <Mail className="size-4" />
            Work With Me
          </a>
        </div>
      </section>

      {/* ─── ANALYTICS HIGHLIGHTS BAR ─── */}
      <section className="border-y border-border/30 bg-muted/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Users, label: "Total Reach", value: formatFollowers(mockCreator.stats.totalReach), color: "text-violet-500" },
              { icon: TrendingUp, label: "Engagement Rate", value: `${mockCreator.stats.engagementRate}%`, color: "text-emerald-500" },
              { icon: Eye, label: "Avg. Views", value: formatFollowers(mockCreator.stats.avgViews), color: "text-blue-500" },
              { icon: Handshake, label: "Completed Deals", value: `${mockCreator.stats.completedDeals}+`, color: "text-amber-500" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className={`flex size-9 items-center justify-center rounded-xl bg-muted/40 ${stat.color}`}>
                  <stat.icon className="size-4" />
                </div>
                <div>
                  <p className="text-lg font-extrabold tracking-tight text-foreground leading-none">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* ─── SOCIAL PLATFORMS ROW ─── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Social Platforms</h2>
            <div className="flex-1 h-px bg-border/30" />
          </div>
          <div className="flex flex-wrap gap-3">
            {mockCreator.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-border/40 bg-card/50 px-4 py-3 transition-all hover:border-border hover:shadow-sm hover:-translate-y-0.5"
              >
                <div className={`flex size-8 items-center justify-center rounded-xl text-white ${platformColors[social.platform] || "bg-muted"}`}>
                  {platformIcons[social.platform] || social.platform[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground capitalize">{social.platform}</p>
                  <p className="text-[10px] text-muted-foreground">{formatFollowers(social.followers ?? 0)} followers</p>
                </div>
                <ExternalLink className="size-3 text-muted-foreground/40 group-hover:text-muted-foreground ml-1 transition-colors" />
              </a>
            ))}
          </div>
        </section>

        {/* ─── MEDIA KIT BLOCKS (from builder) ─── */}
        {blocksToRender.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Creator Profile</h2>
              <div className="flex-1 h-px bg-border/30" />
            </div>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
              {blocksToRender.map((block) => {
                const reg = blockRegistry[block.type];
                if (!reg) return null;
                const Display = reg.display;

                let spanClass = "col-span-full";
                if (block.type === "social") spanClass = "md:col-span-2 col-span-full";
                if (block.type === "stats") spanClass = "md:col-span-1 col-span-full";
                if (block.type === "gallery") spanClass = "md:col-span-2 col-span-full";
                if (block.type === "testimonials") spanClass = "md:col-span-1 col-span-full";

                return (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className={cn("transition-all duration-300", spanClass)}
                    style={{ order: block.order }}
                  >
                    <div
                      id={block.type === "cta" ? "section-cta" : undefined}
                      className="h-full hover:shadow-md transition-shadow duration-300 rounded-xl overflow-hidden"
                    >
                      <Display content={block.content} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* ─── FEATURED CONTENT ─── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Featured Content</h2>
            <div className="flex-1 h-px bg-border/30" />
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
            {featuredContent.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="group relative rounded-2xl overflow-hidden border border-border/40 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Thumbnail / placeholder */}
                <div className={`h-32 w-full bg-gradient-to-br ${item.gradient} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <Play className="size-10 text-white" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center rounded-full bg-black/50 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold text-white">
                      {item.type}
                    </span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <div className={`flex size-6 items-center justify-center rounded-lg text-white ${platformColors[item.platform] || "bg-muted"}`}>
                      {platformIcons[item.platform]}
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-xs font-bold text-foreground truncate">{item.title}</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Eye className="size-3" />{item.views} views
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                      <Heart className="size-3" />{item.engagement} eng.
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── BRAND PARTNERSHIP CTA ─── */}
        <section id="section-cta">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-3xl overflow-hidden border border-border/40 p-8 md:p-12 text-center"
            style={{
              background: `linear-gradient(135deg, ${activePreset.colors.primary}15, ${activePreset.colors.accent}10, ${activePreset.colors.primary}08)`,
            }}
          >
            {/* Background glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${activePreset.colors.primary}, transparent)`,
              }}
            />

            <div className="relative z-10">
              {/* Star ratings */}
              <div className="mb-4 flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-xs text-muted-foreground font-medium">
                  {mockCreator.stats.completedDeals}+ successful brand partnerships
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                Let&apos;s create something{" "}
                <span className="text-primary">remarkable together</span>
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
                I&apos;m open to brand partnerships, sponsored content, product reviews, and
                long-term ambassador programs. Let&apos;s connect.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`mailto:collab@${mockCreator.username}.com`}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md hover:opacity-90 transition-opacity"
                >
                  <Mail className="size-4" />
                  Send Collaboration Inquiry
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted/30 transition-colors"
                >
                  Download Media Kit PDF
                  <ArrowRight className="size-4" />
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/60">
                {["Lifestyle", "Tech", "Travel", "Food", "Finance"].map((niche) => (
                  <span key={niche} className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    {niche} campaigns welcome
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/20 pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/50">
          <span>© 2025 {displayName}. Created with CreatorKit.</span>
          <div className="flex items-center gap-1 text-[10px] font-bold text-primary/60">
            <span className="size-1.5 rounded-full bg-primary/40" />
            Powered by CreatorKit
          </div>
        </footer>
      </div>
    </div>
  );
}
