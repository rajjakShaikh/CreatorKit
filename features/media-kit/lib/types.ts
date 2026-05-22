import type { MediaKitBlockType, MediaKitBlockId, SocialPlatform } from "@/types";

export interface AboutCreatorContent {
  displayName: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  location: string;
  niche: string[];
}

export interface DemographicsMetric {
  label: string;
  value: string;
}

export interface DemographicsChartItem {
  category: string;
  percentage: number;
}

export interface DemographicsContent {
  title: string;
  metrics: DemographicsMetric[];
  genderSplit: DemographicsChartItem[];
  ageGroups: DemographicsChartItem[];
  topLocations: { country: string; percentage: number }[];
}

export interface SocialPlatformItem {
  id: string;
  platform: SocialPlatform;
  handle: string;
  followers: number;
  engagement: number; // e.g. 4.8 for 4.8%
  url: string;
}

export interface SocialPlatformsContent {
  title: string;
  platforms: SocialPlatformItem[];
}

export interface CollaborationItem {
  id: string;
  brandName: string;
  brandLogoUrl: string;
  campaignTitle: string;
  metrics: string; // e.g. "5.2% CTR", "1.2M Views"
}

export interface CollaborationsContent {
  title: string;
  brands: CollaborationItem[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string; // e.g. "Brand Manager"
  brandName: string;
  avatarUrl: string;
  rating?: number; // 1-5 stars
}

export interface TestimonialsContent {
  title: string;
  testimonials: TestimonialItem[];
}

export interface PricingPackageItem {
  id: string;
  title: string;
  price: number;
  currency: string;
  description: string;
  deliverables: string[];
  deliveryTime: string; // e.g. "7 days"
}

export interface PricingPackagesContent {
  title: string;
  packages: PricingPackageItem[];
}

// Strong type map helper
export type BlockContentMap = {
  hero: AboutCreatorContent; // hero behaves as about creator or we can use it interchangeably
  bio: AboutCreatorContent;
  stats: DemographicsContent;
  social: SocialPlatformsContent;
  gallery: CollaborationsContent;
  testimonials: TestimonialsContent;
  rates: PricingPackagesContent;
  cta: { title: string; buttonText: string; url: string; description: string };
};
