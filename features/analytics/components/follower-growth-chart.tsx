"use client";

import React, { useState, useMemo } from "react";
import { useMounted } from "@/hooks/use-mounted";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockFollowerTrend } from "../mock-data";
import { chartAxisStyle, chartGridStyle } from "@/features/dashboard/lib/chart-theme";

type ViewPlatform = "all" | "instagram" | "tiktok" | "youtube";

export function FollowerGrowthChart() {
  const mounted = useMounted();
  const [platform, setPlatform] = useState<ViewPlatform>("all");

  const trendData = mockFollowerTrend;

  const currentPlatformInfo = useMemo(() => {
    switch (platform) {
      case "instagram":
        return {
          key: "instagram",
          name: "Instagram",
          color: "oklch(0.65 0.25 350)", // Pink-red
          gradientId: "instagramGrad",
        };
      case "tiktok":
        return {
          key: "tiktok",
          name: "TikTok",
          color: "oklch(0.6 0.18 200)", // Cyan/Teal
          gradientId: "tiktokGrad",
        };
      case "youtube":
        return {
          key: "youtube",
          name: "YouTube",
          color: "oklch(0.55 0.25 25)", // Brand red
          gradientId: "youtubeGrad",
        };
      default:
        return {
          key: "total",
          name: "Combined Total",
          color: "var(--brand-primary)",
          gradientId: "totalGrad",
        };
    }
  }, [platform]);

  const latestCount = trendData[trendData.length - 1][currentPlatformInfo.key as keyof typeof trendData[0]] as number;
  const initialCount = trendData[0][currentPlatformInfo.key as keyof typeof trendData[0]] as number;
  const growthAbsolute = latestCount - initialCount;
  const growthPercent = (growthAbsolute / initialCount) * 100;

  const formatYAxis = (value: number) => {
    return `${(value / 1000).toFixed(0)}k`;
  };

  return (
    <Card className="col-span-full xl:col-span-8 surface-elevated transition-all duration-300 hover:shadow-md">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            Follower Growth Trends
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Active reach accumulation across connected profiles
          </CardDescription>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-muted/30 p-1.5 rounded-xl border border-border/40 shrink-0 self-start sm:self-center">
          <Button
            variant={platform === "all" ? "secondary" : "ghost"}
            size="xs"
            onClick={() => setPlatform("all")}
            className="text-[10px] h-7 px-2.5 rounded-lg"
          >
            Total
          </Button>
          <Button
            variant={platform === "instagram" ? "secondary" : "ghost"}
            size="xs"
            onClick={() => setPlatform("instagram")}
            className="text-[10px] h-7 px-2.5 rounded-lg"
          >
            Instagram
          </Button>
          <Button
            variant={platform === "tiktok" ? "secondary" : "ghost"}
            size="xs"
            onClick={() => setPlatform("tiktok")}
            className="text-[10px] h-7 px-2.5 rounded-lg"
          >
            TikTok
          </Button>
          <Button
            variant={platform === "youtube" ? "secondary" : "ghost"}
            size="xs"
            onClick={() => setPlatform("youtube")}
            className="text-[10px] h-7 px-2.5 rounded-lg"
          >
            YouTube
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* KPI Subheading */}
        <div className="flex items-baseline gap-2.5 px-1">
          <span className="text-2xl font-extrabold tracking-tight text-foreground tabular-nums">
            {latestCount.toLocaleString()}
          </span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center bg-emerald-500/10 dark:bg-emerald-500/5 px-2 py-0.5 rounded-md border border-emerald-500/10">
            +{growthAbsolute.toLocaleString()} (+{growthPercent.toFixed(1)}%)
          </span>
          <span className="text-[10px] text-muted-foreground font-semibold">vs last 30d</span>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-[280px] w-full min-w-0 flex items-center justify-center bg-zinc-50/20 dark:bg-zinc-950/10 rounded-xl border border-border/5">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id={currentPlatformInfo.gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={currentPlatformInfo.color} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={currentPlatformInfo.color} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={chartGridStyle.stroke}
                  strokeOpacity={chartGridStyle.strokeOpacity}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={chartAxisStyle}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={chartAxisStyle}
                  tickFormatter={formatYAxis}
                  width={50}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    const item = payload[0];
                    return (
                      <div className="rounded-xl border bg-popover/90 px-3.5 py-2.5 text-xs shadow-md backdrop-blur-md">
                        <p className="font-bold text-foreground mb-1">{label}</p>
                        <div className="flex items-center gap-2">
                          <span
                            className="size-2 rounded-full"
                            style={{ backgroundColor: currentPlatformInfo.color }}
                          />
                          <span className="text-muted-foreground font-medium">
                            {currentPlatformInfo.name}:
                          </span>
                          <span className="font-extrabold text-foreground tabular-nums">
                            {Number(item.value).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={currentPlatformInfo.key}
                  stroke={currentPlatformInfo.color}
                  strokeWidth={2.5}
                  fill={`url(#${currentPlatformInfo.gradientId})`}
                  animationDuration={600}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-[10px] text-muted-foreground animate-pulse font-medium uppercase tracking-wider">
              Loading chart...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
