import { mockCreator } from "@/data/mock/creator";
import { mockDeals } from "@/data/mock/deals";
import { mockChartData } from "@/data/mock/analytics";
import type { DashboardSnapshot } from "@/features/dashboard/types";

export const mockDashboardSnapshot: DashboardSnapshot = {
  creator: mockCreator,
  summary: {
    revenueThisMonth: 18400,
    revenueCurrency: "USD",
    activeDeals: mockDeals.filter(
      (d) => !["paid", "declined"].includes(d.status)
    ).length,
    kitCompletionPercent: 86,
  },
  kpis: [
    {
      id: "revenue",
      label: "Revenue (30d)",
      value: 28400,
      format: "currency",
      change: 18.2,
      changeFormat: "percent",
      changeLabel: "vs last period",
      trend: "up",
      icon: "revenue",
    },
    {
      id: "engagement",
      label: "Engagement rate",
      value: 4.8,
      format: "percent",
      change: 0.6,
      changeFormat: "percent",
      changeLabel: "vs last period",
      trend: "up",
      icon: "engagement",
    },
    {
      id: "deals",
      label: "Active deals",
      value: 4,
      format: "number",
      change: 1,
      changeFormat: "absolute",
      changeLabel: "new this month",
      trend: "up",
      icon: "deals",
    },
    {
      id: "reach",
      label: "Total reach",
      value: 849000,
      format: "number",
      change: 5.4,
      changeFormat: "percent",
      changeLabel: "vs last period",
      trend: "up",
      icon: "reach",
    },
  ],
  revenueSeries: [
    { month: "Dec", revenue: 14200 },
    { month: "Jan", revenue: 16800 },
    { month: "Feb", revenue: 15400 },
    { month: "Mar", revenue: 19200 },
    { month: "Apr", revenue: 22100 },
    { month: "May", revenue: 28400, projected: 31000 },
  ],
  engagementSeries: mockChartData.map((d) => ({
    date: d.date,
    views: d.views,
    engagement: d.engagement,
    clicks: d.clicks,
  })),
  upcomingDeals: [...mockDeals]
    .filter((d) => !["paid", "declined"].includes(d.status))
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
    .slice(0, 5),
  campaigns: [
    {
      id: "camp_01",
      name: "Notion Workflow",
      brand: "Notion",
      platform: "Instagram",
      impressions: 124000,
      engagementRate: 5.2,
      conversions: 842,
      status: "live",
    },
    {
      id: "camp_02",
      name: "Away Summer",
      brand: "Away",
      platform: "TikTok",
      impressions: 890000,
      engagementRate: 6.1,
      conversions: 2100,
      status: "live",
    },
    {
      id: "camp_03",
      name: "Figma Spotlight",
      brand: "Figma",
      platform: "YouTube",
      impressions: 67000,
      engagementRate: 4.4,
      conversions: 312,
      status: "scheduled",
    },
    {
      id: "camp_04",
      name: "Arc Review",
      brand: "Arc",
      platform: "YouTube",
      impressions: 45200,
      engagementRate: 7.8,
      conversions: 589,
      status: "completed",
    },
  ],
  recentActivity: [
    {
      id: "act_01",
      type: "inquiry",
      title: "New brand inquiry",
      description: "Spotify reached out about a playlist discovery campaign.",
      timestamp: "2026-05-20T14:32:00Z",
      meta: "Spotify",
    },
    {
      id: "act_02",
      type: "deal_update",
      title: "Deal status updated",
      description: "Notion campaign moved to In Progress.",
      timestamp: "2026-05-20T09:15:00Z",
      meta: "Notion",
    },
    {
      id: "act_03",
      type: "kit_download",
      title: "Media kit downloaded",
      description: "A brand downloaded your media kit from your public profile.",
      timestamp: "2026-05-19T18:40:00Z",
    },
    {
      id: "act_04",
      type: "payment",
      title: "Payment received",
      description: "Arc Browser deal marked as paid — $3,200.",
      timestamp: "2026-05-19T11:00:00Z",
      meta: "$3,200",
    },
    {
      id: "act_05",
      type: "profile_view",
      title: "Profile view spike",
      description: "142% increase in profile views compared to last week.",
      timestamp: "2026-05-18T16:22:00Z",
    },
    {
      id: "act_06",
      type: "milestone",
      title: "Reach milestone",
      description: "You crossed 800K combined followers across platforms.",
      timestamp: "2026-05-17T08:00:00Z",
    },
  ],
};
