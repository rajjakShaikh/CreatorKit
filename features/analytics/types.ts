import type { SocialPlatform } from "@/types";

export interface FollowerTrendPoint {
  date: string;
  instagram: number;
  tiktok: number;
  youtube: number;
  total: number;
}

export interface PlatformShare {
  platform: SocialPlatform;
  followers: number;
  percentage: number;
  color: string;
}

export interface AgeDemographic {
  ageGroup: string;
  maleShare: number;
  femaleShare: number;
}

export interface GeographicDistribution {
  country: string;
  countryCode: string;
  percentage: number;
  followers: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
}

export interface TopContentItem {
  id: string;
  title: string;
  platform: SocialPlatform;
  url: string;
  thumbnailUrl: string;
  views: number;
  engagementRate: number;
  likes: number;
  comments: number;
  date: string;
}
