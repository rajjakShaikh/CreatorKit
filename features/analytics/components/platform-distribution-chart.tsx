"use client";

import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockPlatformShares } from "../mock-data";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

export function PlatformDistributionChart() {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const data = useMemo(() => {
    return mockPlatformShares.map((p) => {
      // Dynamic adjustments for colors to fit light vs dark modes
      let color = p.color;
      if (p.platform === "tiktok" && isDark) {
        color = "oklch(0.985 0 0)"; // light white/grey in dark mode
      } else if (p.platform === "tiktok" && !isDark) {
        color = "oklch(0.145 0 0)"; // black in light mode
      }
      return {
        ...p,
        color,
      };
    });
  }, [isDark]);

  const totalFollowers = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.followers, 0);
  }, [data]);

  return (
    <Card className="col-span-full md:col-span-1 xl:col-span-4 surface-elevated transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold">Platform Reach</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">
          Follower distribution percentage by platform
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-6 py-4">
        {/* Chart Donut container with central text overlay */}
        <div className="relative size-[160px] shrink-0 flex items-center justify-center">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const item = payload[0].payload;
                    return (
                      <div className="rounded-xl border bg-popover/90 px-3 py-2 text-xs shadow-md backdrop-blur-md">
                        <p className="font-bold capitalize text-foreground">{item.platform}</p>
                        <p className="text-muted-foreground mt-0.5">
                          Followers: <span className="font-bold text-foreground">{item.followers.toLocaleString()}</span>
                        </p>
                      </div>
                    );
                  }}
                />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="followers"
                  animationDuration={600}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-[10px] text-muted-foreground animate-pulse font-medium uppercase tracking-wider">
              Loading...
            </div>
          )}

          {/* Absolute Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Total</span>
            <span className="text-lg font-black text-foreground mt-0.5 tracking-tight tabular-nums">
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
                maximumFractionDigits: 1,
              }).format(totalFollowers)}
            </span>
          </div>
        </div>

        {/* Legend listing */}
        <div className="flex-1 space-y-3.5 w-full">
          {data.map((item) => (
            <div key={item.platform} className="flex items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-2">
                <span
                  className="size-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-bold capitalize text-foreground/80 leading-none">
                  {item.platform}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-foreground tabular-nums leading-none">
                  {item.percentage}%
                </p>
                <p className="text-[10px] text-muted-foreground font-semibold mt-1">
                  {new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    compactDisplay: "short",
                    maximumFractionDigits: 0,
                  }).format(item.followers)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
