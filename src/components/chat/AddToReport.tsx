"use client";

import { useState, useEffect, useRef } from "react";
import { FileText, Plus, Check } from "lucide-react";

interface AddToReportProps {
  block: any;
  blockTitle?: string;
}

function blockToSlide(block: any, title: string): { layout: string; title: string; content_blocks: any[] } {
  switch (block.type) {
    case "kpi":
    case "kpi_grid":
      return { layout: "kpi_row", title, content_blocks: [block] };
    case "chart":
      return { layout: "chart_focus", title: block.title || title, content_blocks: [block] };
    case "table":
      return { layout: "table_focus", title: block.title || title, content_blocks: [block] };
    default:
      return { layout: "full", title, content_blocks: [block] };
  }
}

export default function AddToReport({ block, blockTitle }: AddToReportProps) {
  var [open, setOpen] = useState(false);
  var [reports, setReports] = useState<any[]>([]);
  var [adding, setAdding] = useState<string | null>(null);
  var [added, setAdded] = useState<Set<string>>(new Set());
  var ref = useRef<HTMLDivElement>(null);

  useEffect(function() {
    if (!open) return;
    fetch("/api/reports").then(function(r) { return r.json(); }).then(function(res) {
      setReports(res.data || []);
    });
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return function() { document.removeEventListener("mousedown", handleClick); };
  }, [open]);

  async function addSlide(reportId: string) {
    setAdding(reportId);
    var title = blockTitle || block.title || block.label || "Slide";
    var slideData = blockToSlide(block, title);

    await fetch("/api/reports/" + reportId + "/slides", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slideData),
    });

    setAdding(null);
    setAdded(function(prev) { return new Set(prev).add(reportId); });
  }

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        onClick={function() { setOpen(!open); }}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-[#A3A3A3] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors"
        title="Add to Report"
      >
        <FileText size={14} />
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-1 w-[220px] rounded-xl border border-[#E5E5E5] bg-white shadow-lg p-2 z-50">
          <p className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-[#A3A3A3]">
            Add as Slide
          </p>
          {reports.length === 0 ? (
            <p className="px-2 py-2 text-xs text-[#737373]">No reports yet</p>
          ) : (
            reports.map(function(r) {
              return (
                <button
                  key={r.id}
                  onClick={function() { addSlide(r.id); }}
                  disabled={adding === r.id || added.has(r.id)}
                  className="flex w-full items-center justify-between px-2 py-2 rounded-lg text-sm text-[#525252] hover:bg-[#FAFAFA] disabled:opacity-50"
                >
                  <span className="truncate">{r.name}</span>
                  {added.has(r.id) ? (
                    <Check size={14} className="text-[#22C55E]" />
                  ) : adding === r.id ? (
                    <div className="h-3 w-3 border-2 border-[#E5E5E5] border-t-[#737373] rounded-full animate-spin" />
                  ) : (
                    <Plus size={14} className="text-[#A3A3A3]" />
                  )}
                </button>
              );
            })
          )}
          <a href="/reports" className="flex items-center gap-1 px-2 py-2 text-xs text-[#737373] hover:text-[#0A0A0A]">
            <Plus size={12} /> Create new report
          </a>
        </div>
      )}
    </div>
  );
}
