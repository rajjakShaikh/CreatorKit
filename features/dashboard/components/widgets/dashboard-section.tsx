"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardSectionProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  delay?: number;
}

export function DashboardSection({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
  delay = 0,
}: DashboardSectionProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      <Card
        className={cn(
          "surface-elevated border-0 shadow-sm transition-shadow hover:shadow-md",
          className
        )}
      >
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          {action}
        </CardHeader>
        <CardContent className={cn(contentClassName)}>{children}</CardContent>
      </Card>
    </motion.div>
  );
}
