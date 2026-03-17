"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Pencil, Check, X } from "lucide-react";
import BlockRenderer from "@/components/chat/blocks/BlockRenderer";
import KPICardBlock from "@/components/chat/blocks/KPICardBlock";
import ChartBlock from "@/components/chat/blocks/ChartBlock";
import TableBlock from "@/components/chat/blocks/TableBlock";
import TextBlock from "@/components/chat/blocks/TextBlock";
import type { ContentBlock } from "@/types/chat-blocks";

interface Widget {
  id: string;
  widget_type: string;
  title: string;
  config: Record<string, any>;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Dashboard {
  id: string;
  name: string;
  description: string | null;
}

function WidgetContent({ widget }: { widget: Widget }) {
  const config = widget.config as any;
  switch (widget.widget_type) {
    case "kpi":
      return <KPICardBlock label={config.label} value={config.value} change={config.change} trend={config.trend} />;
    case "kpi_grid":
      return (
        <div className="grid grid-cols-3 gap-3">
          {(config.items ?? []).map((item: any, i: number) => (
            <KPICardBlock key={i} label={item.label} value={item.value} change={item.change} trend={item.trend} />
          ))}
        </div>
      );
    case "chart":
      return <ChartBlock chartType={config.chartType} title="" data={config.data} xKey={config.xKey} yKey={config.yKey} />;
    case "table":
      return <TableBlock title="" headers={config.headers} rows={config.rows} />;
    case "text":
      return <TextBlock text={config.text || ""} />;
    default:
      return <p className="text-sm text-[#737373]">Unknown widget type</p>;
  }
}

function DashboardWidget({ widget, onDelete }: { widget: Widget; onDelete: () => void }) {
  return (
    <div
      className="border border-[#E5E5E5] rounded-xl bg-white overflow-hidden group"
      style={{
        gridColumn: "span " + widget.w,
        gridRow: "span " + widget.h,
      }}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#F0F0F0]">
        <h3 className="text-sm font-medium text-[#0A0A0A] truncate">{widget.title}</h3>
        <button
          onClick={onDelete}
          className="hidden group-hover:flex h-6 w-6 items-center justify-center rounded text-[#A3A3A3] hover:text-[#EF4444] hover:bg-[#FEF2F2]"
        >
          <Trash2 size={14} />
        </button>
      </div>
      {/* Content */}
      <div className="p-4">
        <WidgetContent widget={widget} />
      </div>
    </div>
  );
}

export default function DashboardViewPage() {
  const params = useParams();
  const dashboardId = params.id as string;
  const router = useRouter();

  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");

  const fetchDashboard = useCallback(async () => {
    const res = await fetch("/api/dashboards/" + dashboardId);
    if (!res.ok) {
      router.push("/dashboards");
      return;
    }
    const json = await res.json();
    setDashboard(json.data.dashboard);
    setWidgets(json.data.widgets ?? []);
    setEditName(json.data.dashboard.name);
    setLoading(false);
  }, [dashboardId, router]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  async function handleDeleteWidget(widgetId: string) {
    setWidgets((prev) => prev.filter((w) => w.id !== widgetId));
    await fetch("/api/dashboards/" + dashboardId + "/widgets/" + widgetId, {
      method: "DELETE",
    });
  }

  async function handleSaveName() {
    if (!editName.trim()) return;
    await fetch("/api/dashboards/" + dashboardId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });
    setDashboard((prev) => prev ? { ...prev, name: editName } : prev);
    setEditing(false);
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="h-5 w-5 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin" />
      </div>
    );
  }

  if (!dashboard) return null;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.push("/dashboards")}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors"
          >
            <ArrowLeft size={18} />
          </button>

          {editing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                autoFocus
                className="text-xl font-semibold text-[#0A0A0A] bg-transparent border-b border-[#0A0A0A] focus:outline-none"
              />
              <button onClick={handleSaveName} className="text-[#22C55E] hover:bg-[#F0FDF4] h-7 w-7 rounded flex items-center justify-center">
                <Check size={16} />
              </button>
              <button onClick={() => { setEditing(false); setEditName(dashboard.name); }} className="text-[#A3A3A3] hover:bg-[#F5F5F5] h-7 w-7 rounded flex items-center justify-center">
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-[#0A0A0A]">{dashboard.name}</h1>
              <button onClick={() => setEditing(true)} className="text-[#A3A3A3] hover:text-[#0A0A0A]">
                <Pencil size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Widget grid */}
        {widgets.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm text-[#525252] font-medium">No widgets yet</p>
            <p className="text-sm text-[#A3A3A3] mt-1">
              Go to Chat and use the pin icon on any report to add it here.
            </p>
            <button
              onClick={() => router.push("/chat")}
              className="mt-4 bg-[#0A0A0A] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#262626] transition-colors"
            >
              Go to Chat
            </button>
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: "repeat(12, minmax(0, 1fr))" }}
          >
            {widgets.map((widget) => (
              <DashboardWidget
                key={widget.id}
                widget={widget}
                onDelete={() => handleDeleteWidget(widget.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
