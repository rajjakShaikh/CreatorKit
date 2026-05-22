"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface FadeInProps extends HTMLMotionProps<"div"> {
  stagger?: boolean;
  delay?: number;
}

export function FadeIn({
  className,
  stagger = false,
  delay = 0,
  children,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={stagger ? staggerContainer : fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeInItem({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div className={cn(className)} variants={fadeInUp} {...props}>
      {children}
    </motion.div>
  );
}
