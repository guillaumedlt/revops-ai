interface Props {
  label: string;
  value: string;
  change?: number;
  trend?: "up" | "down" | "flat";
}

export default function KPICardBlock({ label, value, change, trend }: Props) {
  return (
    <div className="border border-[#E5E5E5] rounded-lg p-4 bg-white">
      <div className="text-xs font-medium uppercase tracking-wide text-[#737373]">{label}</div>
      <div className="text-2xl font-semibold font-mono tabular-nums text-[#0A0A0A] mt-1">{value}</div>
      {change !== undefined && (
        <div className={`text-xs mt-1 font-medium ${
          trend === "up" ? "text-[#22C55E]" : trend === "down" ? "text-[#EF4444]" : "text-[#737373]"
        }`}>
          {trend === "up" ? "\u2191" : trend === "down" ? "\u2193" : "\u2192"}{" "}
          {change > 0 ? "+" : ""}{change}%
        </div>
      )}
    </div>
  );
}
