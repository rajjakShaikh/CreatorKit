"use client";

import React from "react";
import { useMounted } from "@/hooks/use-mounted";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockAgeDemographics } from "../mock-data";
import { chartAxisStyle, chartGridStyle } from "@/features/dashboard/lib/chart-theme";

export function AudienceDemographicsChart() {
  const mounted = useMounted();
  const data = mockAgeDemographics;

  return (
    <Card className="col-span-full md:col-span-1 xl:col-span-4 surface-elevated transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold">Audience Demographics</CardTitle>
        <CardDescription className="text-xs text-muted-foreground mt-0.5">
          Age brackets and gender distribution splits (%)
        </CardDescription>
      </CardHeader>

      <CardContent className="py-4">
        <div className="h-[220px] w-full min-w-0 flex items-center justify-center bg-zinc-50/20 dark:bg-zinc-950/10 rounded-xl border border-border/5">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 0, left: -28, bottom: 0 }}>
                <defs>
                  <linearGradient id="maleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.15 220)" stopOpacity={0.85} />
                    <stop offset="100%" stopColor="oklch(0.65 0.15 220)" stopOpacity={0.35} />
                  </linearGradient>
                  <linearGradient id="femaleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.2 330)" stopOpacity={0.85} />
                    <stop offset="100%" stopColor="oklch(0.65 0.2 330)" stopOpacity={0.35} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={chartGridStyle.stroke}
                  strokeOpacity={chartGridStyle.strokeOpacity}
                />
                <XAxis
                  dataKey="ageGroup"
                  axisLine={false}
                  tickLine={false}
                  tick={chartAxisStyle}
                  dy={6}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={chartAxisStyle}
                  tickFormatter={(v) => `${v}%`}
                  width={40}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="rounded-xl border bg-popover/90 px-3 py-2.5 text-xs shadow-md backdrop-blur-md space-y-1">
                        <p className="font-bold text-foreground">Age {label}</p>
                        {payload.map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="size-2 rounded-full"
                                style={{ backgroundColor: p.fill }}
                              />
                              <span className="text-muted-foreground capitalize">{p.name}:</span>
                            </div>
                            <span className="font-extrabold text-foreground">{p.value}%</span>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: 10, paddingTop: 10 }}
                  iconType="circle"
                  iconSize={6}
                />
                <Bar
                  name="Male"
                  dataKey="maleShare"
                  fill="url(#maleGrad)"
                  radius={[3, 3, 0, 0]}
                  animationDuration={600}
                />
                <Bar
                  name="Female"
                  dataKey="femaleShare"
                  fill="url(#femaleGrad)"
                  radius={[3, 3, 0, 0]}
                  animationDuration={600}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-[10px] text-muted-foreground animate-pulse font-medium uppercase tracking-wider">
              Loading demographics...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

