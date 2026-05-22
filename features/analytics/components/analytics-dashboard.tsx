"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared";
import { PageTransition } from "@/components/motion";
import { CalendarRange, TrendingUp, TrendingDown, Users, Download, MessageSquare, Handshake } from "lucide-react";
import { FollowerGrowthChart } from "./follower-growth-chart";
import { PlatformDistributionChart } from "./platform-distribution-chart";
import { AudienceDemographicsChart } from "./audience-demographics-chart";
import { AudienceGeographyList } from "./audience-geography-list";
import { CampaignConversionChart } from "./campaign-conversion-chart";
import { TopContentGrid } from "./top-content-grid";
import { AnimatedCounter } from "./animated-counter";
import { AnalyticsSkeleton } from "./analytics-skeleton";
import { staggerContainer } from "@/lib/animations";

export function AnalyticsDashboard() {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");
  const [isLoading, setIsLoading] = useState(false);

  // Mock fetching data on range changes to show loading transitions
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [range]);

  const kpiData = [
    {
      id: "views",
      label: "Profile Views",
      value: range === "7d" ? 3120 : range === "90d" ? 39800 : 12480,
      change: range === "7d" ? 4.2 : range === "90d" ? 18.5 : 12.4,
      icon: Users,
      trend: "up",
    },
    {
      id: "downloads",
      label: "Kit Downloads",
      value: range === "7d" ? 420 : range === "90d" ? 5120 : 1842,
      change: range === "7d" ? 8.5 : range === "90d" ? 11.2 : 14.7,
      icon: Download,
      trend: "up",
    },
    {
      id: "inquiries",
      label: "Brand Inquiries",
      value: range === "7d" ? 72 : range === "90d" ? 840 : 320,
      change: range === "7d" ? -2.1 : range === "90d" ? 6.4 : 8.1,
      icon: MessageSquare,
      trend: range === "7d" ? "down" : "up",
    },
    {
      id: "deals",
      label: "Closed Deals",
      value: range === "7d" ? 6 : range === "90d" ? 94 : 34,
      change: range === "7d" ? 12.0 : range === "90d" ? 24.1 : 22.6,
      icon: Handshake,
      trend: "up",
    },
  ];

  if (isLoading) {
    return (
      <PageTransition>
        <AnalyticsSkeleton />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageHeader
        title="Analytics"
        description="Monitor profile engagement, kit downloads, and monetization pipeline."
      >
        {/* Date Range Selector */}
        <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-xl border border-border/50 shrink-0">
          <Button
            variant={range === "7d" ? "secondary" : "ghost"}
            size="xs"
            onClick={() => setRange("7d")}
            className="text-[10px] h-7 px-2.5 rounded-lg"
          >
            7 Days
          </Button>
          <Button
            variant={range === "30d" ? "secondary" : "ghost"}
            size="xs"
            onClick={() => setRange("30d")}
            className="text-[10px] h-7 px-2.5 rounded-lg"
          >
            30 Days
          </Button>
          <Button
            variant={range === "90d" ? "secondary" : "ghost"}
            size="xs"
            onClick={() => setRange("90d")}
            className="text-[10px] h-7 px-2.5 rounded-lg"
          >
            90 Days
          </Button>
        </div>
      </PageHeader>

      <motion.div
        className="mt-8 space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* KPI Row Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi) => {
            const Icon = kpi.icon;
            const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
            return (
              <Card key={kpi.id} className="surface-elevated transition-all duration-300 hover:shadow-xs hover:border-primary/20">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      {kpi.label}
                    </span>
                    <div className="size-7 bg-primary/10 text-primary rounded-lg flex items-center justify-center shadow-2xs">
                      <Icon className="size-4" />
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-extrabold tracking-tight text-foreground">
                      <AnimatedCounter value={kpi.value} format="number" />
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] font-bold">
                    <span
                      className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded ${kpi.trend === "up"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-destructive/10 text-destructive dark:text-red-400"
                        }`}
                    >
                      <TrendIcon className="size-3" />
                      <span>{Math.abs(kpi.change)}%</span>
                    </span>
                    <span className="text-muted-foreground/75 font-semibold">vs last period</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* First Bento Grid Row */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Follower Growth Chart */}
          <FollowerGrowthChart />

          {/* Donut reach chart */}
          <PlatformDistributionChart />
        </div>

        {/* Second Bento Grid Row */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Demographics chart */}
          <AudienceDemographicsChart />

          {/* Geography Distribution list */}
          <AudienceGeographyList />

          {/* Campaign Funnel Chart */}
          <CampaignConversionChart />
        </div>

        {/* Third Row: Top Performing Content Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <TopContentGrid />
        </div>
      </motion.div>
    </PageTransition>
  );
}
