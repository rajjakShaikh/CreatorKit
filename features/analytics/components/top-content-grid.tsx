"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Heart, Eye, ArrowUpRight } from "lucide-react";
import { mockTopContent } from "../mock-data";
import type { SocialPlatform } from "@/types";
import { FaInstagram, FaYoutube } from "react-icons/fa";

function PlatformIcon({ platform }: { platform: SocialPlatform }) {
  switch (platform) {
    case "youtube":
      return <FaYoutube className="size-4 text-red-500 fill-current" />;
    case "instagram":
      return <FaInstagram className="size-4 text-pink-500" />;
    default:
      return (
        <span className="font-bold text-[10px] bg-foreground text-background size-4 rounded-full flex items-center justify-center select-none font-mono">
          T
        </span>
      );
  }
}

export function TopContentGrid() {
  const content = mockTopContent;

  return (
    <Card className="col-span-full xl:col-span-6 surface-elevated transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold">Top Performing Content</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">
          Highest organic reach and interactive engagement rates
        </CardDescription>
      </CardHeader>

      <CardContent className="py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col rounded-xl border border-border/40 bg-muted/5 overflow-hidden hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-video w-full bg-muted overflow-hidden">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&q=80";
                  }}
                />

                {/* Platform Badge Overlay */}
                <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 bg-background/90 dark:bg-zinc-900/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm border border-border/30">
                  <PlatformIcon platform={item.platform} />
                  <span className="text-[10px] font-bold capitalize text-foreground/80 leading-none">
                    {item.platform}
                  </span>
                </div>

                {/* Engagement Float Indicator */}
                <div className="absolute bottom-2.5 right-2.5 z-10 bg-emerald-500 text-white text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
                  {item.engagementRate}% ER
                </div>
              </div>

              {/* Text metadata */}
              <div className="p-3 flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <h4 className="text-xs font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[9px] text-muted-foreground mt-1.5 font-medium">
                    Published {item.date}
                  </p>
                </div>

                {/* Stats Footer Row */}
                <div className="mt-4 pt-2.5 border-t border-border/30 flex items-center justify-between text-[10px] font-bold text-muted-foreground">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1 tabular-nums">
                      <Eye className="size-3 text-muted-foreground/60" />
                      {new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                      }).format(item.views)}
                    </span>
                    <span className="flex items-center gap-1 tabular-nums">
                      <Heart className="size-3 text-muted-foreground/60" />
                      {new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                      }).format(item.likes)}
                    </span>
                    <span className="flex items-center gap-1 tabular-nums">
                      <MessageSquare className="size-3 text-muted-foreground/60" />
                      {new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                      }).format(item.comments)}
                    </span>
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-0.5 text-primary hover:underline hover:text-primary-foreground leading-none"
                  >
                    <span>View</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
