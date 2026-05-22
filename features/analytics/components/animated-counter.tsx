"use client";

import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // duration in ms
  format?: "currency" | "percent" | "number" | "compact";
  currency?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  duration = 800,
  format = "number",
  currency = "USD",
  decimals = 1,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  const formatValue = (num: number) => {
    if (format === "currency") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(num);
    }
    
    if (format === "percent") {
      return `${num.toFixed(decimals)}%`;
    }
    
    if (format === "compact") {
      return new Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1,
      }).format(num);
    }
    
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(num);
  };

  return <span className="tabular-nums font-bold tracking-tight">{formatValue(count)}</span>;
}
