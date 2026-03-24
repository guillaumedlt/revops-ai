"use client";

interface Props {
  label: string;
  value: number;
  max: number;
  target?: number;
  color?: string;
}

export default function ProgressBlock({ label, value, max, target, color }: Props) {
  var pct = Math.min(100, Math.round((value / max) * 100));
  var targetPct = target ? Math.min(100, Math.round((target / max) * 100)) : null;
  var barColor = color || (pct >= 80 ? "#22C55E" : pct >= 50 ? "#F59E0B" : "#EF4444");

  return (
    <div className="border border-[#E5E5E5] rounded-xl p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-[#A3A3A3]">{label}</span>
        <span className="text-sm font-bold text-[#0A0A0A] tabular-nums">{value.toLocaleString()} / {max.toLocaleString()}</span>
      </div>
      <div className="relative h-3 bg-[#F0F0F0] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: pct + "%", backgroundColor: barColor }}
        />
        {targetPct !== null && (
          <div
            className="absolute top-0 h-full w-0.5 bg-[#0A0A0A]"
            style={{ left: targetPct + "%" }}
            title={"Target: " + target}
          />
        )}
      </div>
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[11px] font-semibold tabular-nums" style={{ color: barColor }}>{pct}%</span>
        {target !== undefined && (
          <span className="text-[10px] text-[#A3A3A3]">Target: {target.toLocaleString()}</span>
        )}
      </div>
    </div>
  );
}
