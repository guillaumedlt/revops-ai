"use client";
import { useState } from "react";
import { Lightbulb, X } from "lucide-react";

interface TemplatesPopoverProps {
  onSelect: (prompt: string) => void;
}

const TEMPLATES = [
  {
    category: "Pipeline",
    items: [
      { label: "Pipeline Review", prompt: "Give me a complete pipeline review: total value, deals by stage, stalled deals, and coverage ratio." },
      { label: "Stalled Deals", prompt: "Which deals have been stalled for more than 14 days? List them with owner and amount." },
      { label: "Pipeline Forecast", prompt: "Based on current pipeline and win rates, what revenue can we expect to close this quarter?" },
    ],
  },
  {
    category: "Performance",
    items: [
      { label: "Rep Comparison", prompt: "Compare all sales reps: win rate, average deal size, sales cycle, and pipeline value." },
      { label: "Win Rate Analysis", prompt: "Analyze our win rate trends. Break it down by source, deal size, and owner." },
      { label: "Lost Deal Analysis", prompt: "What are the top reasons we lose deals? Show amounts and trends." },
    ],
  },
  {
    category: "Data Quality",
    items: [
      { label: "CRM Health Check", prompt: "Run a complete CRM health check: missing fields, overdue deals, unworked leads, duplicates." },
      { label: "Data Cleanup List", prompt: "Give me a prioritized list of data issues to fix, sorted by impact on our metrics." },
    ],
  },
  {
    category: "Reports",
    items: [
      { label: "Weekly Summary", prompt: "Generate a weekly sales summary with KPIs, highlights, and action items." },
      { label: "Revenue Report", prompt: "Create a revenue report: closed won this month, by owner, by account, MRR trend." },
      { label: "Activity Report", prompt: "Show me the activity report: engagement rates, unworked deals, effort vs results by rep." },
    ],
  },
];

export default function TemplatesPopover({ onSelect }: TemplatesPopoverProps) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} type="button"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#737373] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors">
        <Lightbulb size={18} />
      </button>
    );
  }

  return (
    <div className="absolute bottom-full left-0 mb-2 w-[400px] max-h-[400px] overflow-y-auto rounded-xl border border-[#E5E5E5] bg-white shadow-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-[#0A0A0A]">RevOps Templates</h3>
        <button onClick={() => setOpen(false)} className="text-[#A3A3A3] hover:text-[#0A0A0A]"><X size={16} /></button>
      </div>
      {TEMPLATES.map((cat) => (
        <div key={cat.category} className="mb-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-[#A3A3A3] px-2 mb-1">{cat.category}</p>
          {cat.items.map((item) => (
            <button key={item.label} onClick={() => { onSelect(item.prompt); setOpen(false); }}
              className="w-full text-left px-2 py-1.5 rounded-lg text-sm text-[#525252] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors">
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
