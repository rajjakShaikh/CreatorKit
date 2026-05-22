import type { AnalyticsMetric, ChartDataPoint } from "@/types";

export const mockAnalyticsMetrics: AnalyticsMetric[] = [
  { label: "Profile views", value: 12480, change: 12.4, changeLabel: "vs last 30d" },
  { label: "Kit downloads", value: 342, change: 8.1, changeLabel: "vs last 30d" },
  { label: "Brand inquiries", value: 28, change: -3.2, changeLabel: "vs last 30d" },
  { label: "Link clicks", value: 1893, change: 22.6, changeLabel: "vs last 30d" },
];

export const mockChartData: ChartDataPoint[] = [
  { date: "Apr 1", views: 420, engagement: 38, clicks: 52 },
  { date: "Apr 8", views: 580, engagement: 45, clicks: 71 },
  { date: "Apr 15", views: 510, engagement: 41, clicks: 63 },
  { date: "Apr 22", views: 720, engagement: 52, clicks: 89 },
  { date: "Apr 29", views: 680, engagement: 48, clicks: 82 },
  { date: "May 6", views: 890, engagement: 61, clicks: 104 },
  { date: "May 13", views: 940, engagement: 58, clicks: 118 },
  { date: "May 20", views: 1020, engagement: 64, clicks: 131 },
];
