"use client";

import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";
import type { Creator } from "@/types";
import { DashboardSection } from "./dashboard-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  formatCompactNumber,
  formatCurrency,
} from "@/features/dashboard/lib/formatters";
import { APP_ROUTES } from "@/lib/constants";

interface CreatorProfileSummaryProps {
  creator: Creator;
  revenueThisMonth: number;
  revenueCurrency: string;
  kitCompletionPercent: number;
  delay?: number;
}

export function CreatorProfileSummary({
  creator,
  revenueThisMonth,
  revenueCurrency,
  kitCompletionPercent,
  delay = 0.2,
}: CreatorProfileSummaryProps) {
  return (
    <DashboardSection
      title="Creator profile"
      description="Your public presence at a glance"
      delay={delay}
      className="h-full"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <Avatar className="size-14 ring-2 ring-background shadow-md">
            <AvatarImage src={creator.avatarUrl} alt={creator.displayName} />
            <AvatarFallback className="text-lg">
              {creator.displayName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="font-semibold tracking-tight">{creator.displayName}</p>
            <p className="text-sm text-muted-foreground">@{creator.username}</p>
            {creator.location && (
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                {creator.location}
              </p>
            )}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {creator.tagline}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {creator.niche.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-lg border bg-muted/30 p-3">
          <div>
            <p className="text-xs text-muted-foreground">Reach</p>
            <p className="text-sm font-semibold tabular-nums">
              {formatCompactNumber(creator.stats.totalReach)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Engagement</p>
            <p className="text-sm font-semibold tabular-nums">
              {creator.stats.engagementRate}%
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">This month</p>
            <p className="text-sm font-semibold tabular-nums">
              {formatCurrency(revenueThisMonth, revenueCurrency)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Deals done</p>
            <p className="text-sm font-semibold tabular-nums">
              {creator.stats.completedDeals}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Media kit completion</span>
            <span className="font-medium tabular-nums">{kitCompletionPercent}%</span>
          </div>
          <Progress value={kitCompletionPercent} className="h-1.5" />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            className="flex-1"
            render={<Link href={APP_ROUTES.mediaKitBuilder} />}
          >
            Edit media kit
          </Button>
          <Button
            variant="outline"
            size="icon"
            render={
              <Link
                href={APP_ROUTES.publicProfile(creator.username)}
                target="_blank"
              />
            }
            aria-label="View public profile"
          >
            <ExternalLink className="size-4" />
          </Button>
        </div>
      </div>
    </DashboardSection>
  );
}
