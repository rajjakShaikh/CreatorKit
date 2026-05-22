"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Eye, EyeOff, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SortableBlockWrapperProps {
  id: string;
  isActive: boolean;
  isVisible: boolean;
  title: string;
  type: string;
  onClick: () => void;
  onDelete: () => void;
  onToggleVisibility: () => void;
  children: React.ReactNode;
}

export function SortableBlockWrapper({
  id,
  isActive,
  isVisible,
  title,
  type,
  onClick,
  onDelete,
  onToggleVisibility,
  children,
}: SortableBlockWrapperProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-xl border border-border bg-card p-4 transition-all duration-200",
        isActive ? "ring-2 ring-primary border-transparent" : "hover:border-primary/50",
        !isVisible && "opacity-60 bg-muted/30",
        isDragging && "opacity-50 border-primary ring-2 ring-primary/40 shadow-lg scale-[1.01] z-50 cursor-grabbing"
      )}
    >
      {/* Top action bar overlay on hover */}
      <div className="absolute -top-3.5 right-4 z-20 flex items-center gap-1.5 rounded-lg border border-border/80 bg-background/95 px-2 py-1 shadow-sm backdrop-blur-xs transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
        <span className="text-[10px] font-bold text-muted-foreground uppercase mr-2 tracking-wider">
          {type}
        </span>
        
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={(e) => {
            e.stopPropagation();
            onToggleVisibility();
          }}
          className={cn("h-6 w-6 text-muted-foreground hover:text-foreground")}
          title={isVisible ? "Hide section" : "Show section"}
        >
          {isVisible ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon-xs"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="h-6 w-6 text-muted-foreground hover:text-primary"
          title="Edit properties"
        >
          <Edit2 className="size-3.5" />
        </Button>

        <Button
          variant="ghost"
          size="icon-xs"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="h-6 w-6 text-muted-foreground hover:text-destructive"
          title="Delete section"
        >
          <Trash2 className="size-3.5" />
        </Button>
      </div>

      {/* Drag Handle and Card Details */}
      <div className="flex items-start gap-3">
        {/* Grip Handle */}
        <div
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab active:cursor-grabbing p-1 rounded-md hover:bg-muted text-muted-foreground/50 hover:text-foreground transition-colors shrink-0"
        >
          <GripVertical className="size-4" />
        </div>

        {/* Inner Content Block Display */}
        <div className="flex-1 min-w-0" onClick={onClick}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-foreground/80 tracking-tight uppercase">
              {title}
            </span>
            {!isVisible && (
              <span className="text-[10px] font-bold text-muted-foreground/70 uppercase">
                Hidden from public
              </span>
            )}
          </div>
          <div className="pointer-events-none relative select-none">
            {children}
            <div className="absolute inset-0 bg-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
