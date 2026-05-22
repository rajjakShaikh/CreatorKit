"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

type MotionDivProps = HTMLMotionProps<"div"> & {
  preset?: "fadeIn" | "none";
};

export function MotionDiv({
  preset = "fadeIn",
  className,
  variants,
  initial = "hidden",
  animate = "visible",
  ...props
}: MotionDivProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={variants ?? (preset === "fadeIn" ? fadeIn : undefined)}
      initial={preset === "none" ? false : initial}
      animate={preset === "none" ? undefined : animate}
      {...props}
    />
  );
}
