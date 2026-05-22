"use client";

import type { CampaignPerformanceRow } from "@/features/dashboard/types";
import { DashboardSection } from "./dashboard-section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCompactNumber, formatPercent } from "@/features/dashboard/lib/formatters";
import { cn } from "@/lib/utils";

const statusVariant: Record<
  CampaignPerformanceRow["status"],
  { label: string; className: string }
> = {
  live: {
    label: "Live",
    className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  completed: {
    label: "Done",
    className: "bg-muted text-muted-foreground",
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  },
};

interface CampaignPerformanceProps {
  campaigns: CampaignPerformanceRow[];
  delay?: number;
}

export function CampaignPerformance({
  campaigns,
  delay = 0.3,
}: CampaignPerformanceProps) {
  return (
    <DashboardSection
      title="Campaign performance"
      description="Live and recent brand campaign metrics"
      delay={delay}
      contentClassName="p-0 sm:px-0"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-4">Campaign</TableHead>
              <TableHead className="hidden sm:table-cell">Platform</TableHead>
              <TableHead className="text-right">Impressions</TableHead>
              <TableHead className="hidden md:table-cell text-right">
                Eng. rate
              </TableHead>
              <TableHead className="pr-4 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((row) => {
              const status = statusVariant[row.status];
              return (
                <TableRow
                  key={row.id}
                  className="transition-colors hover:bg-muted/40"
                >
                  <TableCell className="pl-4">
                    <div>
                      <p className="font-medium">{row.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {row.brand}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {row.platform}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatCompactNumber(row.impressions)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right tabular-nums">
                    {formatPercent(row.engagementRate)}
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium",
                        status.className
                      )}
                    >
                      {status.label}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </DashboardSection>
  );
}
