import type {
  FollowerTrendPoint,
  PlatformShare,
  AgeDemographic,
  GeographicDistribution,
  FunnelStage,
  TopContentItem,
} from "./types";

export const mockFollowerTrend: FollowerTrendPoint[] = [
  { date: "Apr 01", instagram: 232000, tiktok: 480000, youtube: 82000, total: 794000 },
  { date: "Apr 08", instagram: 235000, tiktok: 485000, youtube: 83000, total: 803000 },
  { date: "Apr 15", instagram: 238000, tiktok: 492000, youtube: 84200, total: 814200 },
  { date: "Apr 22", instagram: 241000, tiktok: 498000, youtube: 85500, total: 824500 },
  { date: "Apr 29", instagram: 243500, tiktok: 504000, youtube: 87000, total: 834500 },
  { date: "May 06", instagram: 245000, tiktok: 508000, youtube: 88100, total: 841100 },
  { date: "May 13", instagram: 246800, tiktok: 510000, youtube: 88500, total: 845300 },
  { date: "May 20", instagram: 248000, tiktok: 512000, youtube: 89000, total: 849000 },
];

export const mockPlatformShares: PlatformShare[] = [
  { platform: "tiktok", followers: 512000, percentage: 60.3, color: "#000000" },
  { platform: "instagram", followers: 248000, percentage: 29.2, color: "#E1306C" },
  { platform: "youtube", followers: 89000, percentage: 10.5, color: "#FF0000" },
];

export const mockAgeDemographics: AgeDemographic[] = [
  { ageGroup: "13-17", maleShare: 4, femaleShare: 6 },
  { ageGroup: "18-24", maleShare: 28, femaleShare: 32 },
  { ageGroup: "25-34", maleShare: 18, femaleShare: 22 },
  { ageGroup: "35-44", maleShare: 8, femaleShare: 10 },
  { ageGroup: "45-54", maleShare: 3, femaleShare: 5 },
  { ageGroup: "55+", maleShare: 1, femaleShare: 3 },
];

export const mockGeography: GeographicDistribution[] = [
  { country: "United States", countryCode: "US", percentage: 46.2, followers: 392200 },
  { country: "United Kingdom", countryCode: "GB", percentage: 14.5, followers: 123100 },
  { country: "Canada", countryCode: "CA", percentage: 8.8, followers: 74700 },
  { country: "Germany", countryCode: "DE", percentage: 6.4, followers: 54300 },
  { country: "Australia", countryCode: "AU", percentage: 5.1, followers: 43300 },
];

export const mockFunnelConversions: FunnelStage[] = [
  { stage: "Profile Views", count: 12480, percentage: 100 },
  { stage: "Kit Downloads", count: 1842, percentage: 14.7 },
  { stage: "Inquiries Recieved", count: 320, percentage: 2.5 },
  { stage: "Negotiations Started", count: 86, percentage: 0.68 },
  { stage: "Deals Closed", count: 34, percentage: 0.27 },
];

export const mockTopContent: TopContentItem[] = [
  {
    id: "content_01",
    title: "My Desk Setup Tour 2026: Productivity Aesthetics & Ergonomics",
    platform: "youtube",
    url: "https://youtube.com/watch?v=mock1",
    thumbnailUrl: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=400&q=80",
    views: 45200,
    engagementRate: 8.4,
    likes: 3800,
    comments: 420,
    date: "2026-05-12",
  },
  {
    id: "content_02",
    title: "Minimalist Workspace Habits that Save 10 Hours a Week",
    platform: "instagram",
    url: "https://instagram.com/p/mock2",
    thumbnailUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80",
    views: 128000,
    engagementRate: 7.2,
    likes: 9100,
    comments: 280,
    date: "2026-05-08",
  },
  {
    id: "content_03",
    title: "5 tools I can't live without as an indie creator 🛠️",
    platform: "tiktok",
    url: "https://tiktok.com/@alexchen/video/mock3",
    thumbnailUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80",
    views: 312000,
    engagementRate: 9.1,
    likes: 28400,
    comments: 1150,
    date: "2026-05-15",
  },
  {
    id: "content_04",
    title: "A Day in the Life: remote travel blogging from Lisbon 🇵🇹",
    platform: "tiktok",
    url: "https://tiktok.com/@alexchen/video/mock4",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    views: 195000,
    engagementRate: 6.8,
    likes: 14200,
    comments: 720,
    date: "2026-04-28",
  },
];
