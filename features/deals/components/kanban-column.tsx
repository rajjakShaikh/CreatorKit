import React from "react";
import { useDroppable } from "@dnd-kit/core";
import type { CreatorBrandDeal, KanbanStage } from "../types";
import { DealsEmptyState } from "./deals-empty-state";
import { Badge } from "@/components/ui/badge";

interface KanbanColumnProps {
  stage: KanbanStage;
  title: string;
  deals: CreatorBrandDeal[];
  children: React.ReactNode;
}

export function KanbanColumn({ stage, title, deals, children }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage,
  });

  // Calculate sum of budgets in this column
  const totalBudget = deals.reduce((acc, deal) => acc + deal.budget, 0);
  const currency = deals[0]?.currency || "USD";

  const formatCurrency = (amount: number, curr: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: curr,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Stage indicator coloring classes
  const getStageHeaderColors = (s: KanbanStage) => {
    switch (s) {
      case "inquiry":
        return "border-blue-500/20 bg-blue-500/5 text-blue-500 dark:text-blue-400";
      case "negotiation":
        return "border-amber-500/20 bg-amber-500/5 text-amber-500 dark:text-amber-400";
      case "active":
        return "border-emerald-500/20 bg-emerald-500/5 text-emerald-500 dark:text-emerald-400";
      case "completed":
        return "border-purple-500/20 bg-purple-500/5 text-purple-500 dark:text-purple-400";
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col w-[285px] sm:w-[320px] lg:w-auto shrink-0 rounded-2xl border bg-muted/20 p-4 transition-all duration-300 ${
        isOver
          ? "border-primary/50 bg-primary/5 ring-1 ring-primary/10 shadow-md scale-[1.01]"
          : "border-border"
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between gap-3 mb-4 select-none pb-2 border-b border-border/40">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`font-semibold capitalize text-[10px] ${getStageHeaderColors(stage)}`}>
            {title}
          </Badge>
          <span className="text-xs text-muted-foreground font-semibold">{deals.length}</span>
        </div>
        {deals.length > 0 && (
          <span className="text-[11px] font-bold text-muted-foreground/80 tracking-tight">
            {formatCurrency(totalBudget, currency)}
          </span>
        )}
      </div>

      {/* Column Content Scroll Area */}
      <div className="flex-1 flex flex-col gap-3 min-h-[300px]">
        {deals.length > 0 ? (
          children
        ) : (
          <DealsEmptyState
            title={`No deals in ${title}`}
            description={
              stage === "inquiry"
                ? "New inquiries will appear here."
                : stage === "negotiation"
                ? "Drag pitches here to negotiate terms."
                : stage === "active"
                ? "Active productions go here."
                : "Completed sponsorships will land here."
            }
            className="flex-1 min-h-[220px]"
          />
        )}
      </div>
    </div>
  );
}
