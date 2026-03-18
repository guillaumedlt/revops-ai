interface Props {
  label: string;
  value: string;
  change?: number;
  trend?: "up" | "down" | "flat";
}

export default function KPICardBlock({ label, value, change, trend }: Props) {
  return (
    <div className="border border-[#E5E5E5] rounded-xl p-4 bg-[#FAFAFA] hover:bg-white transition-colors">
      <p className="text-[11px] font-medium uppercase tracking-wider text-[#A3A3A3] mb-1.5">{label}</p>
      <p className="text-2xl font-bold text-[#0A0A0A] tabular-nums tracking-tight">{value}</p>
      {change !== undefined && (
        <div className={"flex items-center gap-1 mt-1.5 text-xs font-medium " + (
          trend === "up" || (trend === undefined && change > 0) ? "text-[#22C55E]" :
          trend === "down" || (trend === undefined && change < 0) ? "text-[#EF4444]" :
          "text-[#A3A3A3]"
        )}>
          <span>{change > 0 ? "+" : ""}{change}%</span>
        </div>
      )}
    </div>
  );
}
