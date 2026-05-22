import type { Creator } from "@/types";

export const mockCreator: Creator = {
  id: "creator_01",
  username: "alex-chen",
  displayName: "Alex Chen",
  tagline: "Lifestyle & tech storyteller",
  bio: "I help brands connect with curious audiences through authentic visual storytelling across Instagram, TikTok, and YouTube.",
  avatarUrl: "/avatars/placeholder.svg",
  coverUrl: "/covers/placeholder.svg",
  niche: ["Lifestyle", "Tech", "Travel"],
  location: "San Francisco, CA",
  socials: [
    {
      platform: "instagram",
      url: "https://instagram.com",
      handle: "@alexchen",
      followers: 248000,
    },
    {
      platform: "tiktok",
      url: "https://tiktok.com",
      handle: "@alexchen",
      followers: 512000,
    },
    {
      platform: "youtube",
      url: "https://youtube.com",
      handle: "Alex Chen",
      followers: 89000,
    },
  ],
  stats: {
    totalReach: 849000,
    engagementRate: 4.8,
    avgViews: 42000,
    completedDeals: 34,
  },
};
