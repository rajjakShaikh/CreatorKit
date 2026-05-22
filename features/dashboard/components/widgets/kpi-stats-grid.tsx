"use client";

import type { DashboardKpi } from "@/features/dashboard/types";
import { KpiStatCard } from "./kpi-stat-card";

interface KpiStatsGridProps {
  kpis: DashboardKpi[];
}

export function KpiStatsGrid({ kpis }: KpiStatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi, index) => (
        <KpiStatCard key={kpi.id} kpi={kpi} index={index} />
      ))}
    </div>
  );
}
