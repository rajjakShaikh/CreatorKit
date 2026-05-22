"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared";
import { PageTransition } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { staggerContainer } from "@/lib/animations";
import { APP_ROUTES } from "@/lib/constants";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";
import { DashboardSkeleton } from "./dashboard-skeleton";
import { KpiStatsGrid } from "./widgets/kpi-stats-grid";
import { AnalyticsChartsRow } from "./charts/analytics-charts-row";
import { CreatorProfileSummary } from "./widgets/creator-profile-summary";
import { UpcomingDeals } from "./widgets/upcoming-deals";
import { CampaignPerformance } from "./widgets/campaign-performance";
import { RecentActivityFeed } from "./widgets/recent-activity-feed";

export function DashboardOverview() {
  const { data, isLoading } = useDashboardData({ simulateLoading: true });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const { creator, summary } = data;

  return (
    <PageTransition>
      <PageHeader
        title={`Welcome back, ${creator.displayName.split(" ")[0]}`}
        description="Here's what's happening with your media kit and brand deals."
      >
        <Button render={<Link href={APP_ROUTES.mediaKitBuilder} />}>
          <Plus className="size-4" />
          Edit media kit
        </Button>
      </PageHeader>

      <motion.div
        className="mt-8 space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <KpiStatsGrid kpis={data.kpis} />

        <AnalyticsChartsRow
          revenue={data.revenueSeries}
          engagement={data.engagementSeries}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-8">
            <UpcomingDeals
              deals={data.upcomingDeals}
              activeCount={summary.activeDeals}
            />
            <CampaignPerformance campaigns={data.campaigns} />
          </div>

          <aside className="space-y-6 xl:col-span-4">
            <CreatorProfileSummary
              creator={creator}
              revenueThisMonth={summary.revenueThisMonth}
              revenueCurrency={summary.revenueCurrency}
              kitCompletionPercent={summary.kitCompletionPercent}
            />
            <RecentActivityFeed activities={data.recentActivity} />
          </aside>
        </div>
      </motion.div>
    </PageTransition>
  );
}
