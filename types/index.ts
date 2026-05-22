/** Shared domain types — import from `@/types` across features */

export type CreatorId = string;
export type DealId = string;
export type MediaKitBlockId = string;

export type SocialPlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "twitter"
  | "linkedin"
  | "pinterest";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  handle: string;
  followers?: number;
}

export interface Creator {
  id: CreatorId;
  username: string;
  displayName: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  coverUrl?: string;
  niche: string[];
  location?: string;
  socials: SocialLink[];
  stats: CreatorStats;
}

export interface CreatorStats {
  totalReach: number;
  engagementRate: number;
  avgViews: number;
  completedDeals: number;
}

export type DealStatus =
  | "inquiry"
  | "negotiating"
  | "contracted"
  | "in_progress"
  | "delivered"
  | "paid"
  | "declined";

export interface BrandDeal {
  id: DealId;
  brandName: string;
  brandLogoUrl?: string;
  title: string;
  budget: number;
  currency: string;
  status: DealStatus;
  dueDate: string;
  deliverables: string[];
  notes?: string;
}

export type MediaKitBlockType =
  | "hero"
  | "bio"
  | "stats"
  | "gallery"
  | "rates"
  | "testimonials"
  | "cta"
  | "social";

export interface MediaKitBlock {
  id: MediaKitBlockId;
  type: MediaKitBlockType;
  order: number;
  visible: boolean;
  title?: string;
  content: Record<string, unknown>;
}

export interface MediaKit {
  id: string;
  creatorId: CreatorId;
  slug: string;
  title: string;
  blocks: MediaKitBlock[];
  published: boolean;
  updatedAt: string;
}

export interface AnalyticsMetric {
  label: string;
  value: number;
  change?: number;
  changeLabel?: string;
}

export interface ChartDataPoint {
  date: string;
  views: number;
  engagement: number;
  clicks: number;
}

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  fontFamily: "sans" | "serif" | "display";
  radius: "sm" | "md" | "lg";
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string;
  disabled?: boolean;
}
