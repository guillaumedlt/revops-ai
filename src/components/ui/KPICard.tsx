"use client";

import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string;
  trend?: number | null;
  trendDirection?: "up" | "down" | "flat" | null;
  status?: "good" | "warning" | "critical";
  className?: string;
}

const trendColors: Record<string, string> = {
  good: "text-status-good",
  warning: "text-status-warning",
  critical: "text-status-critical",
};

function getTrendColor(
  status?: "good" | "warning" | "critical",
  direction?: "up" | "down" | "flat" | null
): string {
  if (status) return trendColors[status];
  if (direction === "up") return "text-status-good";
  if (direction === "down") return "text-status-critical";
  return "text-muted-foreground";
}

function TrendIcon({ direction }: { direction: "up" | "down" | "flat" | null | undefined }) {
  if (direction === "up") return <ArrowUp size={12} />;
  if (direction === "down") return <ArrowDown size={12} />;
  return <Minus size={12} />;
}

export default function KPICard({
  label,
  value,
  trend,
  trendDirection,
  status,
  className = "",
}: KPICardProps) {
  const hasTrend = trend != null && trendDirection != null;
  const colorClass = getTrendColor(status, trendDirection);

  return (
    <div className={`border border-border rounded p-4 ${className}`}>
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="text-2xl font-semibold text-foreground mt-1 font-mono tabular-nums">
        {value}
      </div>
      {hasTrend && (
        <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${colorClass}`}>
          <TrendIcon direction={trendDirection} />
          <span>{trend > 0 ? "+" : ""}{trend}%</span>
        </div>
      )}
    </div>
  );
}
