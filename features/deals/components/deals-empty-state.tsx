import React from "react";
import { FolderOpen } from "lucide-react";

interface DealsEmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
}

export function DealsEmptyState({
  title = "No deals here",
  description = "Drag a card here or add a new partnership.",
  className,
}: DealsEmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/20 bg-muted/10 p-6 text-center select-none ${className}`}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-muted/40 text-muted-foreground/60 mb-2">
        <FolderOpen className="size-5" />
      </div>
      <h4 className="text-xs font-semibold text-muted-foreground">{title}</h4>
      <p className="text-[10px] text-muted-foreground/60 mt-1 max-w-[180px]">
        {description}
      </p>
    </div>
  );
}
