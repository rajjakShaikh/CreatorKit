import type { ActivityType } from "@/features/dashboard/types";
import {
  Bell,
  DollarSign,
  Download,
  Handshake,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export const activityTypeConfig: Record<
  ActivityType,
  { icon: LucideIcon; colorClass: string }
> = {
  deal_update: {
    icon: Handshake,
    colorClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  profile_view: {
    icon: TrendingUp,
    colorClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  kit_download: {
    icon: Download,
    colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  inquiry: {
    icon: Bell,
    colorClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  payment: {
    icon: DollarSign,
    colorClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  milestone: {
    icon: Sparkles,
    colorClass: "bg-primary/10 text-primary",
  },
};
