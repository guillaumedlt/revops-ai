"use client";

interface BreakdownItem {
  label: string;
  score: number;
  maxScore: number;
}

interface Props {
  title: string;
  value: string;
  target?: string;
  score: number;
  breakdown?: BreakdownItem[];
}

function getScoreColor(score: number): string {
  if (score >= 80) return "#22C55E";
  if (score >= 60) return "#F59E0B";
  if (score >= 40) return "#F97316";
  return "#EF4444";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Needs work";
  return "Critical";
}

export default function ScorecardBlock({ title, value, target, score, breakdown }: Props) {
  var color = getScoreColor(score);
  var label = getScoreLabel(score);
  var circumference = 2 * Math.PI * 42;
  var dashOffset = circumference * (1 - score / 100);

  return (
    <div className="border border-[#EAEAEA] rounded-lg p-5 bg-white">
      <div className="flex items-start gap-5">
        {/* Score gauge */}
        <div className="relative shrink-0">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#F0F0F0" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke={color} strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 50 50)"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-[#111] tabular-nums">{score}</span>
            <span className="text-[9px] text-[#BBB]">/100</span>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[#111]">{title}</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#111]">{value}</span>
            {target && <span className="text-xs text-[#BBB]">target: {target}</span>}
          </div>
          <span className="inline-block mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ color: color, backgroundColor: color + "15" }}>
            {label}
          </span>

          {/* Breakdown bars */}
          {breakdown && breakdown.length > 0 && (
            <div className="mt-4 space-y-2.5">
              {breakdown.map(function(item, i) {
                var pct = Math.round((item.score / item.maxScore) * 100);
                var itemColor = getScoreColor(pct);
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-[#555]">{item.label}</span>
                      <span className="text-[11px] font-medium text-[#111] tabular-nums">{item.score}/{item.maxScore}</span>
                    </div>
                    <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: pct + "%", backgroundColor: itemColor }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
