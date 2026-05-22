"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/components/shared";

export function AnalyticsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <PageHeader
        title="Analytics"
        description="Profile performance, kit engagement, and brand interest."
      />

      {/* KPI Cards Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="rounded-xl border bg-card p-4 space-y-3">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-8 w-32 rounded-md" />
            <div className="flex gap-2 items-center">
              <Skeleton className="h-3.5 w-10 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Bento Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Follower growth chart */}
        <div className="col-span-full xl:col-span-8 rounded-xl border bg-card p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-36 rounded" />
              <Skeleton className="h-3.5 w-52 rounded" />
            </div>
            <Skeleton className="h-8 w-44 rounded-xl" />
          </div>
          <Skeleton className="h-[280px] w-full rounded-xl" />
        </div>

        {/* Platform reach donut */}
        <div className="col-span-full xl:col-span-4 rounded-xl border bg-card p-6 space-y-4">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-28 rounded" />
            <Skeleton className="h-3.5 w-44 rounded" />
          </div>
          <div className="flex items-center justify-between gap-6 py-4">
            <Skeleton className="size-36 rounded-full shrink-0" />
            <div className="flex-1 space-y-3 w-full">
              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-6 w-full rounded-lg" />
              <Skeleton className="h-6 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Second Row Bento Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Demographics */}
        <div className="col-span-full xl:col-span-4 rounded-xl border bg-card p-6 space-y-4">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-32 rounded" />
            <Skeleton className="h-3.5 w-48 rounded" />
          </div>
          <Skeleton className="h-[220px] w-full rounded-xl" />
        </div>

        {/* Territories */}
        <div className="col-span-full xl:col-span-4 rounded-xl border bg-card p-6 space-y-4">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-28 rounded" />
            <Skeleton className="h-3.5 w-44 rounded" />
          </div>
          <div className="space-y-4 py-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-3 w-10 rounded" />
                </div>
                <Skeleton className="h-2 w-full rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Funnel Conversions */}
        <div className="col-span-full xl:col-span-4 rounded-xl border bg-card p-6 space-y-4">
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-36 rounded" />
            <Skeleton className="h-3.5 w-52 rounded" />
          </div>
          <Skeleton className="h-[220px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
