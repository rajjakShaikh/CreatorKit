import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { GripVertical, Calendar, CheckSquare, MessageSquare, Clock } from "lucide-react";
import type { CreatorBrandDeal } from "../types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface KanbanCardProps {
  deal: CreatorBrandDeal;
  onClick?: () => void;
}

export function KanbanCard({ deal, onClick }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: deal.id,
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Deliverables stats
  const totalDeliverables = deal.deliverables.length;
  const completedDeliverables = deal.checkedDeliverables.length;
  const completionPercentage = totalDeliverables > 0 ? (completedDeliverables / totalDeliverables) * 100 : 0;

  // Determine if deal is overdue (only if status is not paid)
  const isOverdue = () => {
    if (deal.status === "paid" || deal.status === "declined") return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(deal.dueDate);
    return due < today;
  };

  const overdue = isOverdue();

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layoutId={`card-${deal.id}`}
      className={`group relative rounded-xl border border-border bg-card/60 p-4 shadow-sm backdrop-blur-sm transition-colors hover:border-muted-foreground/30 hover:bg-card/90 ${
        isDragging ? "opacity-40 border-primary/50 shadow-lg ring-1 ring-primary/20" : ""
      }`}
    >
      {/* Top action/handle row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Brand Name */}
          <span className="font-semibold text-sm tracking-tight text-foreground">{deal.brandName}</span>
          {overdue && (
            <Badge variant="destructive" className="h-5 px-1.5 py-0 text-[10px] uppercase font-bold animate-pulse">
              Overdue
            </Badge>
          )}
        </div>

        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab text-muted-foreground/40 hover:text-foreground/80 active:cursor-grabbing p-1 rounded hover:bg-muted/40 transition-colors"
          title="Drag to reorder/move"
        >
          <GripVertical className="size-4" />
        </div>
      </div>

      {/* Main content click trigger */}
      <div
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${deal.brandName} - ${deal.title}`}
        className="mt-2 cursor-pointer select-none outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 transition-shadow p-1 -m-1"
      >
        <h4 className="font-medium text-xs text-muted-foreground line-clamp-1 group-hover:text-foreground transition-colors">
          {deal.title}
        </h4>

        {/* Budget */}
        <p className="mt-2 text-lg font-bold text-foreground tracking-tight">
          {formatCurrency(deal.budget, deal.currency)}
        </p>

        {/* Deliverables checklist progress */}
        {totalDeliverables > 0 && (
          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between items-center text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckSquare className="size-3 text-muted-foreground/70" />
                {completedDeliverables}/{totalDeliverables} Deliverables
              </span>
              <span>{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-1 bg-muted" />
          </div>
        )}

        {/* Bottom row details */}
        <div className="mt-4 flex items-center justify-between text-[10px] text-muted-foreground border-t border-muted/30 pt-3">
          {/* Due date */}
          <div className={`flex items-center gap-1.5 ${overdue ? "text-destructive font-medium" : ""}`}>
            {overdue ? <Clock className="size-3" /> : <Calendar className="size-3" />}
            <span>Due {deal.dueDate}</span>
          </div>

          {/* Comments count */}
          {deal.comments.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="size-3" />
              <span>{deal.comments.length}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
