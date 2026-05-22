/** Recharts color tokens — aligned with shadcn chart CSS variables */
export const CHART_COLORS = {
  primary: "var(--chart-1)",
  secondary: "var(--chart-2)",
  tertiary: "var(--chart-3)",
  muted: "var(--chart-4)",
  accent: "var(--chart-5)",
  brand: "var(--brand-primary)",
  brandAccent: "var(--brand-accent)",
} as const;

export const chartGridStyle = {
  stroke: "var(--border)",
  strokeOpacity: 0.6,
};

export const chartAxisStyle = {
  fontSize: 11,
  fill: "var(--muted-foreground)",
};
