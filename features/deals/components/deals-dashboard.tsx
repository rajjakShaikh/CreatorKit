"use client";

import React, { useState } from "react";
import { useDealsStore, getStageFromStatus } from "../store/deals-store";
import { KanbanBoard } from "./kanban-board";
import { DealDetailsModal } from "./deal-details-modal";
import { AddDealModal } from "./add-deal-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  DollarSign,
  Briefcase,
  TrendingUp,
  Award,
  Filter,
  RefreshCw,
} from "lucide-react";

export function DealsDashboard() {
  const deals = useDealsStore((state) => state.deals);
  const searchQuery = useDealsStore((state) => state.searchQuery);
  const minBudget = useDealsStore((state) => state.minBudget);
  const selectedStageFilter = useDealsStore((state) => state.selectedStageFilter);

  const setSearchQuery = useDealsStore((state) => state.setSearchQuery);
  const setMinBudget = useDealsStore((state) => state.setMinBudget);
  const setSelectedStageFilter = useDealsStore((state) => state.setSelectedStageFilter);
  const resetDeals = useDealsStore((state) => state.resetDeals);

  // Modal control states
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Filter logic
  const filteredDeals = deals.filter((deal) => {
    // 1. Search Query filter (matches brand name or campaign title)
    const matchesSearch =
      deal.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.title.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Budget filter
    const matchesBudget = minBudget === null || deal.budget >= minBudget;

    // 3. Stage filter
    const stage = getStageFromStatus(deal.status);
    let matchesStage = true;
    if (selectedStageFilter === "declined") {
      matchesStage = deal.status === "declined";
    } else if (selectedStageFilter !== "all") {
      matchesStage = stage === selectedStageFilter;
    } else {
      // By default, exclude "declined" from "all" view in active pipeline
      matchesStage = deal.status !== "declined";
    }

    return matchesSearch && matchesBudget && matchesStage;
  });

  // Calculate Pipeline Metrics
  const activePipelineDeals = deals.filter((d) => d.status !== "declined" && d.status !== "paid");
  const totalActiveBudget = activePipelineDeals.reduce((sum, d) => sum + d.budget, 0);

  const completedDeals = deals.filter((d) => d.status === "paid");
  const totalEarnings = completedDeals.reduce((sum, d) => sum + d.budget, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCardClick = (deal: any) => {
    setSelectedDealId(deal.id);
    setIsDetailsOpen(true);
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Stats KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-border/80 bg-card/40 p-5 shadow-sm backdrop-blur-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Active Pipeline</span>
            <h3 className="text-2xl font-extrabold tracking-tight text-foreground">{formatCurrency(totalActiveBudget)}</h3>
            <span className="text-[10px] text-muted-foreground font-medium block">
              {activePipelineDeals.length} brand partnerships in progress
            </span>
          </div>
          <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Briefcase className="size-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl border border-border/80 bg-card/40 p-5 shadow-sm backdrop-blur-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Completed Earnings</span>
            <h3 className="text-2xl font-extrabold tracking-tight text-foreground">{formatCurrency(totalEarnings)}</h3>
            <span className="text-[10px] text-muted-foreground font-medium block">
              From {completedDeals.length} fully resolved deals
            </span>
          </div>
          <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <Award className="size-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-border/80 bg-card/40 p-5 shadow-sm backdrop-blur-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Avg Deal Budget</span>
            <h3 className="text-2xl font-extrabold tracking-tight text-foreground">
              {formatCurrency(deals.length > 0 ? deals.reduce((sum, d) => sum + d.budget, 0) / deals.length : 0)}
            </h3>
            <span className="text-[10px] text-muted-foreground font-medium block">
              Based on {deals.length} tracked campaigns
            </span>
          </div>
          <div className="flex size-11 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
            <TrendingUp className="size-5" />
          </div>
        </div>
      </div>

      {/* Pipeline Controller Row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border border-border/60 bg-muted/5 p-4 rounded-2xl">
        {/* Filters and Search Container */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center flex-1 max-w-3xl">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search brand or campaign..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs bg-background"
            />
          </div>

          {/* Budget Limit Slider/Input */}
          <div className="relative w-full sm:w-[180px]">
            <DollarSign className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Min budget (USD)"
              value={minBudget || ""}
              onChange={(e) => setMinBudget(e.target.value === "" ? null : Number(e.target.value))}
              className="pl-7 h-9 text-xs bg-background"
            />
          </div>

          {/* Column Stage Filter */}
          <select
            value={selectedStageFilter}
            onChange={(e) => setSelectedStageFilter(e.target.value as any)}
            className="h-9 px-3 text-xs rounded-md border border-input bg-background shadow-xs focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-[150px]"
          >
            <option value="all">All Stages</option>
            <option value="inquiry">Inquiry Only</option>
            <option value="negotiation">Negotiation Only</option>
            <option value="active">Active Only</option>
            <option value="completed">Completed Only</option>
            <option value="declined">Declined Deals</option>
          </select>
        </div>

        {/* Action triggers */}
        <div className="flex items-center gap-2 lg:justify-end shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={resetDeals}
            className="h-9 px-3 text-xs text-muted-foreground hover:text-foreground"
            title="Reset board state"
          >
            <RefreshCw className="size-3.5" />
          </Button>

          <Button onClick={() => setIsAddOpen(true)} size="sm" className="h-9 text-xs font-bold gap-1 bg-primary text-primary-foreground">
            <Plus className="size-4" /> Add Deal
          </Button>
        </div>
      </div>

      {/* Kanban Board Canvas */}
      <div className="w-full">
        <KanbanBoard
          deals={filteredDeals}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Sheet details drawer */}
      <DealDetailsModal
        dealId={selectedDealId}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedDealId(null);
        }}
      />

      {/* Add Deal drawer */}
      <AddDealModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />
    </div>
  );
}
