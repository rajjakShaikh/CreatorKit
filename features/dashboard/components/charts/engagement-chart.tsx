"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { EngagementDataPoint } from "@/features/dashboard/types";
import { ChartContainer } from "./chart-container";
import {
  CHART_COLORS,
  chartAxisStyle,
  chartGridStyle,
} from "@/features/dashboard/lib/chart-theme";

interface EngagementChartProps {
  data: EngagementDataPoint[];
}

export function EngagementChart({ data }: EngagementChartProps) {
  return (
    <ChartContainer height={260}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
            width={36}
          />
          <Tooltip
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              fontSize: 12,
            }}
            labelStyle={{ color: "var(--foreground)" }}
          />
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
            iconType="circle"
            iconSize={8}
          />
          <Line
            type="monotone"
            dataKey="views"
            name="Views"
            stroke={CHART_COLORS.primary}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="engagement"
            name="Engagement"
            stroke={CHART_COLORS.brandAccent}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="clicks"
            name="Clicks"
            stroke={CHART_COLORS.secondary}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
