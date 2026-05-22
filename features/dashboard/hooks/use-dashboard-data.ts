"use client";

import { useEffect, useState } from "react";
import { mockDashboardSnapshot } from "@/data/mock/dashboard";
import type { DashboardSnapshot } from "@/features/dashboard/types";

interface UseDashboardDataOptions {
  /** Simulate network latency for skeleton demo */
  simulateLoading?: boolean;
  loadingMs?: number;
}

interface UseDashboardDataResult {
  data: DashboardSnapshot;
  isLoading: boolean;
}

export function useDashboardData(
  options: UseDashboardDataOptions = {}
): UseDashboardDataResult {
  const { simulateLoading = false, loadingMs = 400 } = options;
  const [isLoading, setIsLoading] = useState(simulateLoading);

  useEffect(() => {
    if (!simulateLoading) return;
    const timer = setTimeout(() => setIsLoading(false), loadingMs);
    return () => clearTimeout(timer);
  }, [simulateLoading, loadingMs]);

  return {
    data: mockDashboardSnapshot,
    isLoading,
  };
}
