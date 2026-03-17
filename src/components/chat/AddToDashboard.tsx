"use client";

import { useState, useEffect, useRef } from "react";
import { LayoutDashboard, Plus, Check } from "lucide-react";

interface AddToDashboardProps {
  block: any;
  blockTitle?: string;
  messageId?: string;
  conversationId?: string;
}

export default function AddToDashboard({ block, blockTitle, messageId, conversationId }: AddToDashboardProps) {
  const [open, setOpen] = useState(false);
  const [dashboards, setDashboards] = useState<any[]>([]);
  const [adding, setAdding] = useState<string | null>(null);
  const [added, setAdded] = useState<Set<string>>(new Set());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    fetch("/api/dashboards").then((r) => r.json()).then((res) => {
      setDashboards(res.data?.dashboards ?? []);
    });

    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  async function addWidget(dashboardId: string) {
    setAdding(dashboardId);

    const widgetType = block.type === "kpi_grid" ? "kpi_grid" : block.type;
    const title = blockTitle || block.title || block.label || "Widget";
    const defaultW = widgetType === "table" ? 12 : widgetType === "chart" ? 6 : 4;
    const defaultH = widgetType === "table" ? 6 : widgetType === "chart" ? 5 : 3;

    await fetch("/api/dashboards/" + dashboardId + "/widgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        widget_type: widgetType,
        title,
        config: block,
        x: 0,
        y: 0,
        w: defaultW,
        h: defaultH,
        source_message_id: messageId,
        source_conversation_id: conversationId,
      }),
    });

    setAdding(null);
    setAdded((prev) => new Set(prev).add(dashboardId));
  }

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-[#A3A3A3] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors"
        title="Add to Dashboard"
      >
        <LayoutDashboard size={14} />
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-1 w-[220px] rounded-xl border border-[#E5E5E5] bg-white shadow-lg p-2 z-50">
          <p className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-[#A3A3A3]">
            Add to Dashboard
          </p>
          {dashboards.length === 0 ? (
            <p className="px-2 py-2 text-xs text-[#737373]">No dashboards yet</p>
          ) : (
            dashboards.map((d) => (
              <button
                key={d.id}
                onClick={() => addWidget(d.id)}
                disabled={adding === d.id || added.has(d.id)}
                className="flex w-full items-center justify-between px-2 py-2 rounded-lg text-sm text-[#525252] hover:bg-[#FAFAFA] disabled:opacity-50"
              >
                <span className="truncate">{d.name}</span>
                {added.has(d.id) ? (
                  <Check size={14} className="text-[#22C55E]" />
                ) : adding === d.id ? (
                  <div className="h-3 w-3 border-2 border-[#E5E5E5] border-t-[#737373] rounded-full animate-spin" />
                ) : (
                  <Plus size={14} className="text-[#A3A3A3]" />
                )}
              </button>
            ))
          )}
          <a href="/dashboards" className="flex items-center gap-1 px-2 py-2 text-xs text-[#737373] hover:text-[#0A0A0A]">
            <Plus size={12} /> Create new dashboard
          </a>
        </div>
      )}
    </div>
  );
}
