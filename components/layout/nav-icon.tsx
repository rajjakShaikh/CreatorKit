"use client";

import {
  BarChart3,
  Handshake,
  LayoutDashboard,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Palette,
  Handshake,
  BarChart3,
  Sparkles,
};

interface NavIconProps {
  name: string;
  className?: string;
}

export function NavIcon({ name, className }: NavIconProps) {
  const Icon = iconMap[name] ?? LayoutDashboard;
  return <Icon className={className} />;
}
