"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RevenueDataPoint } from "@/features/dashboard/types";
import { ChartContainer } from "./chart-container";
import {
  CHART_COLORS,
  chartAxisStyle,
  chartGridStyle,
} from "@/features/dashboard/lib/chart-theme";
import { formatCurrency } from "@/features/dashboard/lib/formatters";

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; dataKey: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium text-popover-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-muted-foreground">
          {entry.dataKey === "revenue" ? "Revenue" : "Projected"}:{" "}
          <span className="font-medium text-foreground">
            {formatCurrency(entry.value)}
          </span>
        </p>
      ))}
    </div>
  );
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ChartContainer height={260}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS.brand} stopOpacity={0.25} />
              <stop offset="100%" stopColor={CHART_COLORS.brand} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={chartGridStyle.stroke}
            strokeOpacity={chartGridStyle.strokeOpacity}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={chartAxisStyle}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={chartAxisStyle}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            width={44}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={CHART_COLORS.brand}
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
          <Area
            type="monotone"
            dataKey="projected"
            stroke={CHART_COLORS.muted}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="none"
            connectNulls={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
