"use client";

import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

interface ChartContainerProps {
  children: React.ReactNode;
  className?: string;
  height?: number;
}

export function ChartContainer({
  children,
  className,
  height = 280,
}: ChartContainerProps) {
  const mounted = useMounted();

  return (
    <div
      className={cn("w-full min-w-0 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/20 rounded-xl border border-border/10", className)}
      style={{ height }}
      aria-hidden={false}
    >
      {mounted ? (
        children
      ) : (
        <div className="text-[10px] text-muted-foreground animate-pulse font-medium uppercase tracking-wider">
          Loading analytics...
        </div>
      )}
    </div>
  );
}
