"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Trash2, GripVertical, ArrowLeft, Pencil, Check, X } from "lucide-react";
import KPICardBlock from "@/components/chat/blocks/KPICardBlock";
import ChartBlock from "@/components/chat/blocks/ChartBlock";
import TableBlock from "@/components/chat/blocks/TableBlock";
import TextBlock from "@/components/chat/blocks/TextBlock";
import ProgressBlock from "@/components/chat/blocks/ProgressBlock";
import FunnelBlock from "@/components/chat/blocks/FunnelBlock";
import ComparisonBlock from "@/components/chat/blocks/ComparisonBlock";
import ScorecardBlock from "@/components/chat/blocks/ScorecardBlock";
import BlockRenderer from "@/components/chat/blocks/BlockRenderer";

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

interface DragState {
  widgetId: string;
  type: "move" | "resize";
  startX: number;
  startY: number;
  startGridX: number;
  startGridY: number;
  startW: number;
  startH: number;
}

const COL_COUNT = 12;
const ROW_HEIGHT = 80;
const GAP = 12;

function WidgetContent({ widget }: { widget: Widget }) {
  const c = widget.config as any;
  switch (widget.widget_type) {
    case "kpi":
      return <KPICardBlock label={c.label || ""} value={c.value || ""} change={c.change} trend={c.trend} />;
    case "kpi_grid":
      return (
        <div className="grid grid-cols-3 gap-2">
          {(c.items ?? []).map((item: any, i: number) => (
            <KPICardBlock key={i} label={item.label} value={item.value} change={item.change} trend={item.trend} />
          ))}
        </div>
      );
    case "chart":
      return <ChartBlock chartType={c.chartType || "bar"} title="" data={c.data || []} xKey={c.xKey} yKey={c.yKey} yKeys={c.yKeys} colors={c.colors} />;
    case "table":
      return <TableBlock title="" headers={c.headers || []} rows={c.rows || []} sortable={c.sortable} searchable={c.searchable} pageSize={c.pageSize} />;
    case "text":
      return <TextBlock text={c.text || ""} />;
    case "progress":
      return <ProgressBlock label={c.label || ""} value={c.value || 0} max={c.max || 100} target={c.target} color={c.color} />;
    case "funnel":
      return <FunnelBlock title="" steps={c.steps || []} />;
    case "comparison":
      return <ComparisonBlock title="" items={c.items || []} />;
    case "scorecard":
      return <ScorecardBlock title="" value={c.value || ""} target={c.target} score={c.score || 0} breakdown={c.breakdown} />;
    case "report":
      return c.blocks ? <BlockRenderer blocks={c.blocks} /> : <p className="text-xs text-[#BBB]">Empty report</p>;
    default:
      return <p className="text-xs text-[#BBB]">Unknown widget</p>;
  }
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
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [previewPos, setPreviewPos] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const previewRef = useRef<typeof previewPos>(null);
  const widgetsRef = useRef<Widget[]>([]);

  // Keep refs in sync
  useEffect(() => {
    dragRef.current = dragState;
  }, [dragState]);
  useEffect(() => {
    previewRef.current = previewPos;
  }, [previewPos]);
  useEffect(() => {
    widgetsRef.current = widgets;
  }, [widgets]);

  // Load dashboard
  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboards/" + dashboardId);
      if (!res.ok) {
        router.push("/dashboards");
        return;
      }
      const json = await res.json();
      setDashboard(json.data.dashboard);
      setWidgets(json.data.widgets ?? []);
      setEditName(json.data.dashboard.name);
    } finally {
      setLoading(false);
    }
  }, [dashboardId, router]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Calculate grid position from pointer coordinates
  const getGridPos = useCallback(
    (clientX: number, clientY: number) => {
      if (!gridRef.current) return { col: 0, row: 0 };
      const rect = gridRef.current.getBoundingClientRect();
      const colWidth = (rect.width - GAP * (COL_COUNT - 1)) / COL_COUNT;
      const col = Math.max(
        0,
        Math.min(
          COL_COUNT - 1,
          Math.floor((clientX - rect.left) / (colWidth + GAP))
        )
      );
      const row = Math.max(
        0,
        Math.floor((clientY - rect.top) / (ROW_HEIGHT + GAP))
      );
      return { col, row };
    },
    []
  );

  // Save layout to API
  const saveLayout = useCallback(
    (updatedWidgets: Widget[]) => {
      const payload = updatedWidgets.map((w) => ({
        id: w.id,
        x: w.x,
        y: w.y,
        w: w.w,
        h: w.h,
      }));
      fetch("/api/dashboards/" + dashboardId + "/layout", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ widgets: payload }),
      });
    },
    [dashboardId]
  );

  // Pointer event handlers for drag/resize
  useEffect(() => {
    function handleMove(e: PointerEvent) {
      const ds = dragRef.current;
      if (!ds) return;
      const { col, row } = getGridPos(e.clientX, e.clientY);

      if (ds.type === "move") {
        const newX = Math.max(0, Math.min(COL_COUNT - ds.startW, col));
        const newY = Math.max(0, row);
        setPreviewPos({ x: newX, y: newY, w: ds.startW, h: ds.startH });
      } else {
        const newW = Math.max(
          3,
          Math.min(COL_COUNT - ds.startGridX, col - ds.startGridX + 1)
        );
        const newH = Math.max(2, row - ds.startGridY + 1);
        setPreviewPos({ x: ds.startGridX, y: ds.startGridY, w: newW, h: newH });
      }
    }

    function handleUp() {
      const ds = dragRef.current;
      const pp = previewRef.current;
      if (ds && pp) {
        const updated = widgetsRef.current.map((w) =>
          w.id === ds.widgetId
            ? { ...w, x: pp.x, y: pp.y, w: pp.w, h: pp.h }
            : w
        );
        setWidgets(updated);
        saveLayout(updated);
      }
      setDragState(null);
      setPreviewPos(null);
    }

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
    };
  }, [getGridPos, saveLayout]);

  function startDrag(
    e: React.PointerEvent,
    widget: Widget,
    type: "move" | "resize"
  ) {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setDragState({
      widgetId: widget.id,
      type,
      startX: e.clientX,
      startY: e.clientY,
      startGridX: widget.x,
      startGridY: widget.y,
      startW: widget.w,
      startH: widget.h,
    });
    setPreviewPos({ x: widget.x, y: widget.y, w: widget.w, h: widget.h });
  }

  async function handleDeleteWidget(widgetId: string) {
    setWidgets((prev) => prev.filter((w) => w.id !== widgetId));
    await fetch(
      "/api/dashboards/" + dashboardId + "/widgets/" + widgetId,
      { method: "DELETE" }
    );
  }

  async function handleSaveName() {
    if (!editName.trim()) return;
    await fetch("/api/dashboards/" + dashboardId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName }),
    });
    setDashboard((prev) => (prev ? { ...prev, name: editName } : prev));
    setEditing(false);
  }

  const maxRow = widgets.reduce((max, w) => Math.max(max, w.y + w.h), 6);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="h-5 w-5 border-2 border-[#EAEAEA] border-t-[#111] rounded-full animate-spin" />
      </div>
    );
  }

  if (!dashboard) return null;

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-[#F0F0F0] px-6 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/dashboards")}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-[#BBB] hover:bg-[#F5F5F5] hover:text-[#111] transition-colors"
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
                  className="text-lg font-semibold text-[#111] bg-transparent border-b border-[#111] focus:outline-none"
                />
                <button
                  onClick={handleSaveName}
                  className="text-[#22C55E] hover:bg-[#F0FDF4] h-7 w-7 rounded flex items-center justify-center"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setEditName(dashboard.name);
                  }}
                  className="text-[#BBB] hover:bg-[#F5F5F5] h-7 w-7 rounded flex items-center justify-center"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-[#111]">
                  {dashboard.name}
                </h1>
                <button
                  onClick={() => setEditing(true)}
                  className="text-[#BBB] hover:text-[#111]"
                >
                  <Pencil size={14} />
                </button>
              </div>
            )}
          </div>
          <span className="text-xs text-[#BBB]">
            {widgets.length} widget{widgets.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 py-4 max-w-7xl mx-auto">
        {widgets.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm text-[#555] font-medium">
              No widgets yet
            </p>
            <p className="text-sm text-[#BBB] mt-1">
              Go to Chat and pin reports here.
            </p>
            <button
              onClick={() => router.push("/chat")}
              className="mt-4 bg-[#111] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#262626] transition-colors"
            >
              Go to Chat
            </button>
          </div>
        ) : (
          <div
            ref={gridRef}
            className="relative"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridAutoRows: ROW_HEIGHT + "px",
              gap: GAP + "px",
              minHeight: maxRow * (ROW_HEIGHT + GAP) + "px",
            }}
          >
            {/* Drop preview ghost */}
            {dragState && previewPos && (
              <div
                className="rounded-lg border-2 border-dashed border-blue-400 bg-blue-50/50 pointer-events-none z-10"
                style={{
                  gridColumn:
                    previewPos.x + 1 + " / span " + previewPos.w,
                  gridRow:
                    previewPos.y + 1 + " / span " + previewPos.h,
                }}
              />
            )}

            {/* Widgets */}
            {widgets.map((widget) => {
              const isDragging = dragState?.widgetId === widget.id;
              return (
                <div
                  key={widget.id}
                  className={
                    "relative border border-[#EAEAEA] rounded-lg bg-white overflow-hidden group " +
                    (isDragging
                      ? "opacity-40 shadow-lg ring-2 ring-blue-300"
                      : "hover:shadow-sm transition-shadow duration-200")
                  }
                  style={{
                    gridColumn:
                      widget.x + 1 + " / span " + widget.w,
                    gridRow:
                      widget.y + 1 + " / span " + widget.h,
                    transition: isDragging
                      ? "none"
                      : "box-shadow 0.2s, opacity 0.2s",
                  }}
                >
                  {/* Title bar — drag handle */}
                  <div
                    className="flex items-center justify-between px-3 py-2 border-b border-[#F0F0F0] cursor-grab active:cursor-grabbing select-none"
                    onPointerDown={(e) => startDrag(e, widget, "move")}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <GripVertical
                        size={14}
                        className="text-[#D4D4D4] flex-shrink-0"
                      />
                      <h3 className="text-xs font-medium text-[#111] truncate">
                        {widget.title}
                      </h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteWidget(widget.id);
                      }}
                      className="hidden group-hover:flex h-6 w-6 items-center justify-center rounded text-[#BBB] hover:text-[#EF4444] hover:bg-[#FEF2F2]"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  {/* Content */}
                  <div
                    className="p-3 overflow-hidden"
                    style={{ height: "calc(100% - 36px)" }}
                  >
                    <WidgetContent widget={widget} />
                  </div>

                  {/* Resize handle — bottom-right corner */}
                  <div
                    className="absolute bottom-0 right-0 w-5 h-5 cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity"
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      startDrag(e, widget, "resize");
                    }}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="w-4 h-4 text-[#D4D4D4] ml-1 mt-1"
                    >
                      <path
                        d="M14 14L8 14L14 8Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
