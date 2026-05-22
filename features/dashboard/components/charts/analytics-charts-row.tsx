"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type {
  EngagementDataPoint,
  RevenueDataPoint,
} from "@/features/dashboard/types";
import { DashboardSection } from "@/features/dashboard/components/widgets/dashboard-section";
import { RevenueChart } from "./revenue-chart";
import { EngagementChart } from "./engagement-chart";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";

interface AnalyticsChartsRowProps {
  revenue: RevenueDataPoint[];
  engagement: EngagementDataPoint[];
}

export function AnalyticsChartsRow({
  revenue,
  engagement,
}: AnalyticsChartsRowProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <DashboardSection
        title="Revenue"
        description="Monthly earnings from brand partnerships"
        delay={0.1}
        action={
          <Button
            variant="ghost"
            size="sm"
            render={<Link href={APP_ROUTES.analytics} />}
          >
            Details
            <ArrowRight className="size-3.5" />
          </Button>
        }
        contentClassName="pt-0"
      >
        <RevenueChart data={revenue} />
      </DashboardSection>

      <DashboardSection
        title="Engagement"
        description="Views, engagement, and link clicks over time"
        delay={0.15}
        action={
          <Button
            variant="ghost"
            size="sm"
            render={<Link href={APP_ROUTES.analytics} />}
          >
            Details
            <ArrowRight className="size-3.5" />
          </Button>
        }
        contentClassName="pt-0"
      >
        <EngagementChart data={engagement} />
      </DashboardSection>
    </div>
  );
}
