"use client";

import React from "react";
import { useMounted } from "@/hooks/use-mounted";
import {
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockFunnelConversions } from "../mock-data";
import { chartAxisStyle, chartGridStyle } from "@/features/dashboard/lib/chart-theme";

export function CampaignConversionChart() {
  const mounted = useMounted();
  const data = mockFunnelConversions;

  const colors = [
    "oklch(0.55 0.15 250)", // Blue
    "oklch(0.6 0.18 200)",  // Teal
    "oklch(0.65 0.18 160)", // Green-teal
    "oklch(0.7 0.15 120)",  // Lime
    "oklch(0.75 0.12 80)",   // Yellow
  ];

  return (
    <Card className="col-span-full xl:col-span-6 surface-elevated transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold">Deal Funnel & Conversions</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">
          Visitor actions leading to contracted and paid collaborations
        </CardDescription>
      </CardHeader>

      <CardContent className="py-4">
        <div className="h-[240px] w-full min-w-0 flex items-center justify-center bg-zinc-50/20 dark:bg-zinc-950/10 rounded-xl border border-border/5">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 8, right: 16, left: 16, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  horizontal={false}
                  stroke={chartGridStyle.stroke}
                  strokeOpacity={chartGridStyle.strokeOpacity}
                />
                <XAxis
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={chartAxisStyle}
                  tickFormatter={(v) => v.toLocaleString()}
                />
                <YAxis
                  type="category"
                  dataKey="stage"
                  axisLine={false}
                  tickLine={false}
                  tick={chartAxisStyle}
                  width={120}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const item = payload[0].payload;
                    return (
                      <div className="rounded-xl border bg-popover/90 px-3.5 py-2.5 text-xs shadow-md backdrop-blur-md space-y-1">
                        <p className="font-bold text-foreground">{item.stage}</p>
                        <p className="text-muted-foreground">
                          Volume: <span className="font-bold text-foreground">{item.count.toLocaleString()}</span>
                        </p>
                        <p className="text-muted-foreground">
                          Conversion: <span className="font-bold text-foreground">{item.percentage}%</span>
                        </p>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={16} animationDuration={600}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-[10px] text-muted-foreground animate-pulse font-medium uppercase tracking-wider">
              Loading conversion data...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

