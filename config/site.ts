export const siteConfig = {
  name: "CreatorKit",
  tagline: "Media kits & brand deals, beautifully simple",
  description:
    "Build stunning creator media kits, manage brand partnerships, and share your public profile — all in one premium workspace.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
  creator: {
    defaultUsername: "alex-chen",
  },
} as const;
