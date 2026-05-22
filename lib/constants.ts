export const APP_ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  mediaKit: "/media-kit",
  mediaKitBuilder: "/media-kit/builder",
  deals: "/deals",
  analytics: "/analytics",
  theme: "/settings/theme",
  publicProfile: (username: string) => `/${username}`,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const ANIMATION = {
  duration: {
    fast: 0.15,
    normal: 0.25,
    slow: 0.4,
  },
  ease: [0.22, 1, 0.36, 1] as const,
} as const;
