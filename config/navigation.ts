import type { NavItem } from "@/types";

export const dashboardNav: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { title: "Media Kit", href: "/media-kit", icon: "Palette" },
  { title: "Brand Deals", href: "/deals", icon: "Handshake" },
  { title: "Analytics", href: "/analytics", icon: "BarChart3" },
  { title: "Theme", href: "/settings/theme", icon: "Sparkles" },
];

export const marketingNav: NavItem[] = [
  { title: "Features", href: "#features", icon: "Zap" },
  { title: "Pricing", href: "#pricing", icon: "CreditCard" },
  { title: "Examples", href: "#examples", icon: "Eye" },
];
