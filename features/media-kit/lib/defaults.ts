import type { MediaKitBlock, MediaKitBlockType } from "@/types";

export const generateId = () => {
  if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15);
};

export const defaultBlocks: MediaKitBlock[] = [
  {
    id: "block-bio",
    type: "bio",
    order: 0,
    visible: true,
    title: "About Me",
    content: {
      displayName: "Alex Chen",
      tagline: "Lifestyle & Tech Storyteller",
      bio: "I help brands connect with curious audiences through authentic visual storytelling across Instagram, TikTok, and YouTube. Based in San Francisco, CA.",
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
      coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=400&fit=crop",
      location: "San Francisco, CA",
      niche: ["Lifestyle", "Tech & Gadgets", "Travel", "Creative Coding"],
    },
  },
  {
    id: "block-social",
    type: "social",
    order: 1,
    visible: true,
    title: "Social Platforms",
    content: {
      title: "Social Performance",
      platforms: [
        {
          id: "soc-1",
          platform: "instagram",
          handle: "@alexchen",
          followers: 248000,
          engagement: 4.8,
          url: "https://instagram.com",
        },
        {
          id: "soc-2",
          platform: "tiktok",
          handle: "@alexchen",
          followers: 512000,
          engagement: 6.2,
          url: "https://tiktok.com",
        },
        {
          id: "soc-3",
          platform: "youtube",
          handle: "Alex Chen",
          followers: 89000,
          engagement: 3.5,
          url: "https://youtube.com",
        },
      ],
    },
  },
  {
    id: "block-demographics",
    type: "stats",
    order: 2,
    visible: true,
    title: "Audience Demographics",
    content: {
      title: "Who I Reach",
      metrics: [
        { label: "Core Age Bracket", value: "18-34 years" },
        { label: "Top Country", value: "United States (62%)" },
        { label: "Avg. Monthly Views", value: "1.2 Million" },
      ],
      genderSplit: [
        { category: "Female", percentage: 56 },
        { category: "Male", percentage: 41 },
        { category: "Non-binary", percentage: 3 },
      ],
      ageGroups: [
        { category: "13-17", percentage: 8 },
        { category: "18-24", percentage: 42 },
        { category: "25-34", percentage: 38 },
        { category: "35-44", percentage: 9 },
        { category: "45+", percentage: 3 },
      ],
      topLocations: [
        { country: "United States", percentage: 62 },
        { country: "United Kingdom", percentage: 14 },
        { country: "Canada", percentage: 8 },
        { country: "Germany", percentage: 6 },
        { country: "Others", percentage: 10 },
      ],
    },
  },
  {
    id: "block-gallery",
    type: "gallery",
    order: 3,
    visible: true,
    title: "Previous Collaborations",
    content: {
      title: "Featured Campaigns",
      brands: [
        {
          id: "collab-1",
          brandName: "Nike",
          brandLogoUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
          campaignTitle: "Air Max Campaign",
          metrics: "5.8% Engagement Rate",
        },
        {
          id: "collab-2",
          brandName: "Sony",
          brandLogoUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200&h=200&fit=crop",
          campaignTitle: "Alpha 7IV Launch",
          metrics: "450k Impressions",
        },
        {
          id: "collab-3",
          brandName: "Airbnb",
          brandLogoUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=200&fit=crop",
          campaignTitle: "Summer Getaways",
          metrics: "12% Link Click-Through",
        },
      ],
    },
  },
  {
    id: "block-testimonials",
    type: "testimonials",
    order: 4,
    visible: true,
    title: "What Brands Say",
    content: {
      title: "Testimonials",
      testimonials: [
        {
          id: "test-1",
          quote: "Alex was incredibly professional to work with. He understood our campaign brief perfectly and delivered content that felt completely organic to his channel while highlighting our core messages.",
          author: "Sarah Jenkins",
          role: "Senior Brand Manager",
          brandName: "Sony Electronics",
          avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
          rating: 5,
        },
        {
          id: "test-2",
          quote: "One of the best influencer ROI campaigns we've run this year. Alex's audience is highly engaged and trusts his recommendations implicitly.",
          author: "Marcus Vance",
          role: "Growth Marketing Lead",
          brandName: "Airbnb",
          avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
          rating: 5,
        },
      ],
    },
  },
  {
    id: "block-rates",
    type: "rates",
    order: 5,
    visible: true,
    title: "Pricing Packages",
    content: {
      title: "Services & Rates",
      packages: [
        {
          id: "pkg-1",
          title: "Dedicated YouTube Review",
          price: 1500,
          currency: "USD",
          description: "8-10 minute dedicated product review, link in description, social share cross-promotion.",
          deliverables: ["1x YouTube Video", "Link in description (30 days)", "Story cross-promotion"],
          deliveryTime: "10-14 Days",
        },
        {
          id: "pkg-2",
          title: "Instagram Carousel & Story",
          price: 850,
          currency: "USD",
          description: "High-quality lifestyle photography featuring your product in use, plus engaging story frame with sticker link.",
          deliverables: ["1x Carousel Post (3-4 slides)", "3x Story Frames with Links", "Usage rights (30 days)"],
          deliveryTime: "7 Days",
        },
        {
          id: "pkg-3",
          title: "TikTok Integration",
          price: 700,
          currency: "USD",
          description: "30-45 second native integration, link in bio, high energy demonstration showing real-world value.",
          deliverables: ["1x TikTok Video", "Link in Bio (7 days)"],
          deliveryTime: "7 Days",
        },
      ],
    },
  },
];

export const createNewBlock = (type: MediaKitBlockType, order: number): MediaKitBlock => {
  const id = `block-${type}-${generateId()}`;

  const blockTemplates: Record<MediaKitBlockType, Partial<MediaKitBlock>> = {
    hero: {
      title: "Hero Banner",
      content: {
        displayName: "New Creator",
        tagline: "Your tagline goes here",
        bio: "Brief intro about who you are and what makes your content unique.",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        coverUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=400&fit=crop",
        location: "World Wide",
        niche: ["Niche 1", "Niche 2"],
      },
    },
    bio: {
      title: "About Me",
      content: {
        displayName: "New Creator",
        tagline: "Your tagline goes here",
        bio: "Brief intro about who you are and what makes your content unique.",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
        coverUrl: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=1200&h=400&fit=crop",
        location: "United States",
        niche: ["Lifestyle", "Photography"],
      },
    },
    stats: {
      title: "Audience Demographics",
      content: {
        title: "Demographics & Metrics",
        metrics: [
          { label: "Metric 1", value: "Value 1" },
          { label: "Metric 2", value: "Value 2" },
        ],
        genderSplit: [
          { category: "Female", percentage: 50 },
          { category: "Male", percentage: 50 },
        ],
        ageGroups: [
          { category: "18-24", percentage: 60 },
          { category: "25-34", percentage: 40 },
        ],
        topLocations: [
          { country: "United States", percentage: 80 },
          { country: "Others", percentage: 20 },
        ],
      },
    },
    social: {
      title: "Social Links",
      content: {
        title: "Social Platforms",
        platforms: [
          {
            id: `soc-${generateId()}`,
            platform: "instagram",
            handle: "@yourhandle",
            followers: 10000,
            engagement: 4.5,
            url: "https://instagram.com",
          },
        ],
      },
    },
    gallery: {
      title: "Previous Collaborations",
      content: {
        title: "Featured Campaigns",
        brands: [
          {
            id: `collab-${generateId()}`,
            brandName: "Brand Name",
            brandLogoUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
            campaignTitle: "Campaign Name",
            metrics: "5.0% Engagement",
          },
        ],
      },
    },
    testimonials: {
      title: "Testimonials",
      content: {
        title: "Testimonials",
        testimonials: [
          {
            id: `test-${generateId()}`,
            quote: "A brief testimonial quote from a brand partner describing the awesome work you did.",
            author: "Partner Name",
            role: "Marketing Manager",
            brandName: "Brand Company",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            rating: 5,
          },
        ],
      },
    },
    rates: {
      title: "Pricing Packages",
      content: {
        title: "Rates & Packages",
        packages: [
          {
            id: `pkg-${generateId()}`,
            title: "New Package",
            price: 500,
            currency: "USD",
            description: "Package description outlining deliverables and timeline details.",
            deliverables: ["Deliverable 1", "Deliverable 2"],
            deliveryTime: "5 Days",
          },
        ],
      },
    },
    cta: {
      title: "Call to Action",
      content: {
        title: "Let's Collaborate",
        description: "Interested in working together? Reach out to start a conversation.",
        buttonText: "Get in touch",
        url: "mailto:collab@example.com",
      },
    },
  };

  return {
    id,
    type,
    order,
    visible: true,
    title: blockTemplates[type].title || "New Block",
    content: blockTemplates[type].content || {},
  };
};
