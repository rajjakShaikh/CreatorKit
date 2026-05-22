"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Minus, DollarSign, Heart, Handshake, Users } from "lucide-react";
import type { DashboardKpi } from "@/features/dashboard/types";
import {
  formatCompactNumber,
  formatCurrency,
  formatPercent,
} from "@/features/dashboard/lib/formatters";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { scaleIn } from "@/lib/animations";
import { AnimatedCounter } from "@/features/analytics/components/animated-counter";


const iconMap = {
  revenue: DollarSign,
  engagement: Heart,
  deals: Handshake,
  reach: Users,
} as const;

interface KpiStatCardProps {
  kpi: DashboardKpi;
  index?: number;
}

function formatKpiValue(kpi: DashboardKpi): string {
  switch (kpi.format) {
    case "currency":
      return formatCurrency(kpi.value, "USD", true);
    case "percent":
      return formatPercent(kpi.value);
    default:
      return formatCompactNumber(kpi.value);
  }
}

export function KpiStatCard({ kpi, index = 0 }: KpiStatCardProps) {
  const Icon = iconMap[kpi.icon];
  const TrendIcon =
    kpi.trend === "up"
      ? TrendingUp
      : kpi.trend === "down"
        ? TrendingDown
        : Minus;

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group surface-elevated border-0 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
              <Icon className="size-4" />
            </div>
            <div
              className={cn(
                "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                kpi.trend === "up" && "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                kpi.trend === "down" && "bg-rose-500/10 text-rose-700 dark:text-rose-400",
                kpi.trend === "neutral" && "bg-muted text-muted-foreground"
              )}
            >
              <TrendIcon className="size-3" />
              {kpi.changeFormat === "percent" ? (
                <>
                  {kpi.change > 0 && kpi.trend !== "down" ? "+" : ""}
                  {kpi.change}%
                </>
              ) : (
                <>+{kpi.change}</>
              )}
            </div>
          </div>
          <p className="mt-4 text-2xl font-semibold tracking-tight tabular-nums">
            <AnimatedCounter
              value={kpi.value}
              format={kpi.format === "currency" ? "currency" : kpi.format === "percent" ? "percent" : "compact"}
              decimals={kpi.format === "percent" ? 1 : 0}
            />
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{kpi.label}</p>
          <p className="mt-0.5 text-xs text-muted-foreground/80">
            {kpi.changeLabel}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
