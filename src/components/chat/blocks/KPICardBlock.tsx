interface Props {
  label: string;
  value: string;
  change?: number;
  trend?: "up" | "down" | "flat";
}

export default function KPICardBlock({ label, value, change, trend }: Props) {
  return (
    <div className="border border-[#EAEAEA] rounded-lg p-4 bg-[#FAFAFA] hover:bg-white transition-colors">
      <p className="text-[11px] font-medium uppercase tracking-wider text-[#BBB] mb-1.5">{label}</p>
      <p className="text-2xl font-bold text-[#111] tabular-nums tracking-tight">{value}</p>
      {change !== undefined && (
        <div className={"flex items-center gap-1 mt-1.5 text-xs font-medium " + (
          trend === "up" || (trend === undefined && change > 0) ? "text-[#22C55E]" :
          trend === "down" || (trend === undefined && change < 0) ? "text-[#EF4444]" :
          "text-[#BBB]"
        )}>
          <span>{change > 0 ? "+" : ""}{change}%</span>
        </div>
      )}
    </div>
  );
}
