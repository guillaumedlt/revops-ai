"use client";

interface ComparisonItem {
  label: string;
  current: string;
  previous: string;
  change?: number;
  trend?: "up" | "down" | "flat";
}

interface Props {
  title: string;
  items: ComparisonItem[];
}

export default function ComparisonBlock({ title, items }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <div className="border border-[#EAEAEA] rounded-lg overflow-hidden bg-white">
      {title && (
        <div className="px-4 py-2.5 bg-[#FAFAFA] border-b border-[#EAEAEA]">
          <p className="text-sm font-semibold text-[#111]">{title}</p>
        </div>
      )}
      <div className="divide-y divide-[#F5F5F5]">
        {/* Header */}
        <div className="grid grid-cols-4 gap-2 px-4 py-2 bg-[#FAFAFA]/50">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#BBB]">Metric</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#BBB] text-right">Current</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#BBB] text-right">Previous</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#BBB] text-right">Change</span>
        </div>
        {items.map(function(item, i) {
          var changeColor = "text-[#BBB]";
          var changePrefix = "";
          if (item.change !== undefined) {
            if (item.trend === "up" || (item.trend === undefined && item.change > 0)) {
              changeColor = "text-[#22C55E]";
              changePrefix = "+";
            } else if (item.trend === "down" || (item.trend === undefined && item.change < 0)) {
              changeColor = "text-[#EF4444]";
            }
          }

          return (
            <div key={i} className="grid grid-cols-4 gap-2 px-4 py-3 hover:bg-[#FAFAFA] transition-colors">
              <span className="text-sm font-medium text-[#111]">{item.label || "—"}</span>
              <span className="text-sm font-semibold text-[#111] text-right tabular-nums">{item.current ?? "—"}</span>
              <span className="text-sm text-[#999] text-right tabular-nums">{item.previous ?? "—"}</span>
              <span className={"text-sm font-medium text-right tabular-nums " + changeColor}>
                {item.change !== undefined ? changePrefix + item.change + "%" : "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
