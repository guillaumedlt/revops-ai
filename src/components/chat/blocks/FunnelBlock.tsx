"use client";

interface FunnelStep {
  label: string;
  value: number;
  rate?: number;
}

interface Props {
  title: string;
  steps: FunnelStep[];
}

var FUNNEL_COLORS = ["#0A0A0A", "#333333", "#525252", "#737373", "#A3A3A3", "#C0C0C0", "#D4D4D4"];

export default function FunnelBlock({ title, steps }: Props) {
  if (!steps || steps.length === 0) return null;

  var maxValue = steps[0].value || 1;

  return (
    <div className="border border-[#EAEAEA] rounded-lg p-5 bg-white">
      {title && <div className="text-sm font-semibold text-[#111] mb-4">{title}</div>}
      <div className="space-y-2">
        {steps.map(function(step, i) {
          var widthPct = Math.max(20, Math.round((step.value / maxValue) * 100));
          var convRate = step.rate !== undefined
            ? step.rate
            : (i > 0 && steps[i - 1].value > 0)
              ? Math.round((step.value / steps[i - 1].value) * 100)
              : null;

          return (
            <div key={i}>
              {/* Conversion rate arrow between steps */}
              {i > 0 && convRate !== null && (
                <div className="flex items-center gap-2 py-1 pl-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#BBB] shrink-0">
                    <path d="M6 2 L6 10 M3 7 L6 10 L9 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className={"text-[11px] font-medium " + (convRate >= 50 ? "text-[#22C55E]" : convRate >= 25 ? "text-[#F59E0B]" : "text-[#EF4444]")}>
                    {convRate}% conversion
                  </span>
                </div>
              )}
              {/* Funnel bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <div
                    className="h-10 rounded-lg flex items-center px-4 transition-all duration-300"
                    style={{
                      width: widthPct + "%",
                      backgroundColor: FUNNEL_COLORS[i % FUNNEL_COLORS.length],
                      minWidth: "120px",
                    }}
                  >
                    <span className="text-[12px] font-medium text-white truncate">{step.label}</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#111] tabular-nums shrink-0 w-16 text-right">
                  {step.value.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
