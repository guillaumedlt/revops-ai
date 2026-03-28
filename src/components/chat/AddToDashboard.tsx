"use client";

import { useState, useEffect, useRef } from "react";
import { LayoutDashboard, Plus, Check } from "lucide-react";

interface AddToDashboardProps {
  block: any;
  blockTitle?: string;
  messageId?: string;
  conversationId?: string;
}

function getDefaultSize(block: any): { w: number; h: number } {
  switch (block.type) {
    case "kpi":
      return { w: 3, h: 2 };
    case "kpi_grid": {
      var count = block.items?.length || 3;
      if (count <= 3) return { w: 12, h: 2 };
      if (count <= 6) return { w: 12, h: 3 };
      return { w: 12, h: 4 };
    }
    case "chart":
      return { w: 6, h: 4 };
    case "table": {
      var rows = block.rows?.length || 0;
      if (rows <= 5) return { w: 12, h: 4 };
      return { w: 12, h: 6 };
    }
    case "text":
      return { w: 6, h: 3 };
    case "progress":
      return { w: 6, h: 2 };
    case "funnel":
      return { w: 6, h: 5 };
    case "comparison":
      return { w: 12, h: 4 };
    case "scorecard":
      return { w: 6, h: 5 };
    default:
      return { w: 6, h: 4 };
  }
}

export default function AddToDashboard({ block, blockTitle, messageId, conversationId }: AddToDashboardProps) {
  var [open, setOpen] = useState(false);
  var [dashboards, setDashboards] = useState<any[]>([]);
  var [adding, setAdding] = useState<string | null>(null);
  var [added, setAdded] = useState<Set<string>>(new Set());
  var ref = useRef<HTMLDivElement>(null);

  useEffect(function () {
    if (!open) return;
    fetch("/api/dashboards").then(function (r) { return r.json(); }).then(function (res) {
      setDashboards(res.data?.dashboards ?? []);
    });

    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return function () { document.removeEventListener("mousedown", handleClick); };
  }, [open]);

  async function addWidget(dashboardId: string) {
    setAdding(dashboardId);

    var size = getDefaultSize(block);
    var title = blockTitle || block.title || block.label || "Widget";

    // Fetch current layout to find next available Y position
    var nextY = 0;
    try {
      var dashRes = await fetch("/api/dashboards/" + dashboardId);
      var dashData = await dashRes.json();
      var existingWidgets = dashData.data?.widgets || [];
      nextY = existingWidgets.reduce(function (max: number, w: any) {
        return Math.max(max, (w.y || 0) + (w.h || 2));
      }, 0);
    } catch (e) {
      // Fall back to y=0 if fetch fails
    }

    await fetch("/api/dashboards/" + dashboardId + "/widgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        widget_type: block.type,
        title: title,
        config: block,
        x: 0,
        y: nextY,
        w: size.w,
        h: size.h,
        source_message_id: messageId,
        source_conversation_id: conversationId,
      }),
    });

    setAdding(null);
    setAdded(function (prev) { return new Set(prev).add(dashboardId); });
  }

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        onClick={function () { setOpen(!open); }}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-[#BBB] hover:text-[#111] hover:bg-[#F5F5F5] transition-colors"
        title="Add to Dashboard"
      >
        <LayoutDashboard size={14} />
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-1 w-[220px] rounded-lg border border-[#EAEAEA] bg-white shadow-lg p-2 z-50">
          <p className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-[#BBB]">
            Add to Dashboard
          </p>
          {dashboards.length === 0 ? (
            <p className="px-2 py-2 text-xs text-[#999]">No dashboards yet</p>
          ) : (
            dashboards.map(function (d) {
              return (
                <button
                  key={d.id}
                  onClick={function () { addWidget(d.id); }}
                  disabled={adding === d.id || added.has(d.id)}
                  className="flex w-full items-center justify-between px-2 py-2 rounded-lg text-sm text-[#555] hover:bg-[#FAFAFA] disabled:opacity-50"
                >
                  <span className="truncate">{d.name}</span>
                  {added.has(d.id) ? (
                    <Check size={14} className="text-[#22C55E]" />
                  ) : adding === d.id ? (
                    <div className="h-3 w-3 border-2 border-[#EAEAEA] border-t-[#737373] rounded-full animate-spin" />
                  ) : (
                    <Plus size={14} className="text-[#BBB]" />
                  )}
                </button>
              );
            })
          )}
          <a href="/dashboards" className="flex items-center gap-1 px-2 py-2 text-xs text-[#999] hover:text-[#111]">
            <Plus size={12} /> Create new dashboard
          </a>
        </div>
      )}
    </div>
  );
}
