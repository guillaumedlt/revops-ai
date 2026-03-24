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
    <div className="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
      {title && (
        <div className="px-4 py-2.5 bg-[#FAFAFA] border-b border-[#E5E5E5]">
          <p className="text-sm font-semibold text-[#0A0A0A]">{title}</p>
        </div>
      )}
      <div className="divide-y divide-[#F5F5F5]">
        {/* Header */}
        <div className="grid grid-cols-4 gap-2 px-4 py-2 bg-[#FAFAFA]/50">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3]">Metric</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3] text-right">Current</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3] text-right">Previous</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3] text-right">Change</span>
        </div>
        {items.map(function(item, i) {
          var changeColor = "text-[#A3A3A3]";
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
              <span className="text-sm font-medium text-[#0A0A0A]">{item.label}</span>
              <span className="text-sm font-semibold text-[#0A0A0A] text-right tabular-nums">{item.current}</span>
              <span className="text-sm text-[#737373] text-right tabular-nums">{item.previous}</span>
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
