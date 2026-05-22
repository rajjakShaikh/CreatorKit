"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { BrandDeal } from "@/types";
import { DashboardSection } from "./dashboard-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDealStatus } from "@/features/dashboard/lib/deal-status";
import {
  formatCurrency,
  formatDueDate,
} from "@/features/dashboard/lib/formatters";
import { APP_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface UpcomingDealsProps {
  deals: BrandDeal[];
  activeCount: number;
  delay?: number;
}

export function UpcomingDeals({
  deals,
  activeCount,
  delay = 0.25,
}: UpcomingDealsProps) {
  return (
    <DashboardSection
      title="Upcoming deals"
      description="Brand partnerships sorted by due date"
      delay={delay}
      action={
        <Badge variant="secondary" className="shrink-0">
          {activeCount} active
        </Badge>
      }
    >
      <ul className="space-y-3">
        {deals.map((deal) => {
          const status = getDealStatus(deal);
          return (
            <li
              key={deal.id}
              className="group flex flex-col gap-2 rounded-lg border p-3 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{deal.brandName}</p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
                      status.className
                    )}
                  >
                    {status.label}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {deal.title}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="size-3" />
                  {formatDueDate(deal.dueDate)}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold tabular-nums sm:text-right">
                {formatCurrency(deal.budget, deal.currency)}
              </p>
            </li>
          );
        })}
      </ul>

      {deals.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No upcoming deals. You&apos;re all caught up.
        </p>
      )}

      <Button
        variant="ghost"
        className="mt-4 w-full"
        render={<Link href={APP_ROUTES.deals} />}
      >
        View all deals
        <ArrowRight className="size-4" />
      </Button>
    </DashboardSection>
  );
}
