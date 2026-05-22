"use client";

import type { ActivityItem } from "@/features/dashboard/types";
import { activityTypeConfig } from "@/features/dashboard/lib/activity-config";
import { formatRelativeTime } from "@/features/dashboard/lib/formatters";
import { DashboardSection } from "./dashboard-section";
import { cn } from "@/lib/utils";

interface RecentActivityFeedProps {
  activities: ActivityItem[];
  delay?: number;
}

export function RecentActivityFeed({
  activities,
  delay = 0.35,
}: RecentActivityFeedProps) {
  return (
    <DashboardSection
      title="Recent activity"
      description="Latest updates across your creator workspace"
      delay={delay}
      className="h-full"
    >
      <ul className="relative space-y-0">
        {activities.map((item, index) => {
          const config = activityTypeConfig[item.type];
          const Icon = config.icon;
          const isLast = index === activities.length - 1;

          return (
            <li key={item.id} className="relative flex gap-3 pb-6 last:pb-0">
              {!isLast && (
                <span
                  className="absolute left-[17px] top-9 bottom-0 w-px bg-border"
                  aria-hidden
                />
              )}
              <div
                className={cn(
                  "relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full",
                  config.colorClass
                )}
              >
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium leading-snug">{item.title}</p>
                  <time
                    className="shrink-0 text-[10px] text-muted-foreground tabular-nums"
                    dateTime={item.timestamp}
                  >
                    {formatRelativeTime(item.timestamp)}
                  </time>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                {item.meta && (
                  <p className="mt-1 text-xs font-medium text-primary/80">
                    {item.meta}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </DashboardSection>
  );
}
