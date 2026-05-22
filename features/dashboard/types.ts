import type { BrandDeal, Creator } from "@/types";

export type KpiTrend = "up" | "down" | "neutral";

export interface DashboardKpi {
  id: string;
  label: string;
  value: number;
  format: "number" | "currency" | "percent";
  change: number;
  /** How to render the change badge */
  changeFormat: "percent" | "absolute";
  changeLabel: string;
  trend: KpiTrend;
  icon: "revenue" | "engagement" | "deals" | "reach";
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  projected?: number;
}

export interface EngagementDataPoint {
  date: string;
  views: number;
  engagement: number;
  clicks: number;
}

export interface CampaignPerformanceRow {
  id: string;
  name: string;
  brand: string;
  platform: string;
  impressions: number;
  engagementRate: number;
  conversions: number;
  status: "live" | "completed" | "scheduled";
}

export type ActivityType =
  | "deal_update"
  | "profile_view"
  | "kit_download"
  | "inquiry"
  | "payment"
  | "milestone";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  meta?: string;
}

export interface DashboardSnapshot {
  kpis: DashboardKpi[];
  revenueSeries: RevenueDataPoint[];
  engagementSeries: EngagementDataPoint[];
  upcomingDeals: BrandDeal[];
  campaigns: CampaignPerformanceRow[];
  recentActivity: ActivityItem[];
  creator: Creator;
  summary: {
    revenueThisMonth: number;
    revenueCurrency: string;
    activeDeals: number;
    kitCompletionPercent: number;
  };
}
