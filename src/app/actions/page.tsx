"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Check, Clock, Circle, X, Sparkles, GripVertical, Trash2, Calendar } from "lucide-react";

interface Action {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in_progress" | "done" | "cancelled";
  source?: string;
  domain?: string;
  deal_id?: string;
  due_date?: string;
  created_at: string;
  completed_at?: string;
}

var COLUMNS: Array<{ id: Action["status"]; label: string; icon: any; color: string; emptyText: string }> = [
  { id: "todo", label: "To do", icon: Circle, color: "#525252", emptyText: "Drop an action here" },
  { id: "in_progress", label: "In progress", icon: Clock, color: "#F59E0B", emptyText: "Drag an action here" },
  { id: "done", label: "Done", icon: Check, color: "#22C55E", emptyText: "Nothing done yet" },
];

var PRIORITY_DOT: Record<string, string> = {
  urgent: "#EF4444",
  high: "#F97316",
  medium: "#F59E0B",
  low: "#22C55E",
};

var PRIORITY_LABEL: Record<string, string> = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
};

var SOURCE_LABELS: Record<string, string> = {
  ai_suggestion: "Kairo",
  alert: "Alerte",
  quick_win: "Quick Win",
  manual: "",
  weekly_review: "Revue",
};

function dueLabel(date: string): { text: string; overdue: boolean } {
  var diff = Math.floor((new Date(date).getTime() - Date.now()) / 86400000);
  if (diff < 0) return { text: Math.abs(diff) + "j overdue", overdue: true };
  if (diff === 0) return { text: "Today", overdue: false };
  if (diff === 1) return { text: "Tomorrow", overdue: false };
  return { text: diff + "j", overdue: false };
}

export default function ActionsPage() {
  var router = useRouter();
  var [actions, setActions] = useState<Action[]>([]);
  var [loading, setLoading] = useState(true);
  var [dragId, setDragId] = useState<string | null>(null);
  var [dragOver, setDragOver] = useState<string | null>(null);
  var [addingIn, setAddingIn] = useState<string | null>(null);
  var [newTitle, setNewTitle] = useState("");
  var addInputRef = useRef<HTMLInputElement>(null);

  useEffect(function() {
    fetch("/api/pilot/actions?perPage=100").then(function(r) { return r.json(); }).then(function(json) {
      setActions(json.data?.items ?? []);
    }).catch(function() {}).finally(function() { setLoading(false); });
  }, []);

  useEffect(function() {
    if (addingIn && addInputRef.current) addInputRef.current.focus();
  }, [addingIn]);

  async function handleStatusChange(id: string, status: string) {
    setActions(function(prev) {
      return prev.map(function(a) { return a.id === id ? { ...a, status: status as Action["status"] } : a; });
    });
    await fetch("/api/pilot/actions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  async function handleAdd(status: string) {
    if (!newTitle.trim()) return;
    var res = await fetch("/api/pilot/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, priority: "medium", status, source: "manual" }),
    });
    if (res.ok) {
      var json = await res.json();
      if (json.data) setActions(function(prev) { return [json.data, ...prev]; });
    }
    setNewTitle("");
    setAddingIn(null);
  }

  async function handleDelete(id: string) {
    setActions(function(prev) { return prev.filter(function(a) { return a.id !== id; }); });
    await fetch("/api/pilot/actions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: "cancelled" }),
    });
  }

  async function handleAskKairo() {
    var active = actions.filter(function(a) { return a.status === "todo" || a.status === "in_progress"; });
    var prompt = "Voici mes " + active.length + " actions en cours :\n" + active.slice(0, 15).map(function(a, i) { return (i + 1) + ". [" + a.priority.toUpperCase() + "] " + a.title; }).join("\n") + "\n\nAnalyse, repriorise si necessaire, et identifie les actions manquantes en checkant mes donnees HubSpot. Cree les actions manquantes directement.";
    var res = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Priorisation actions" }),
    });
    var json = await res.json();
    if (json.data?.id) {
      try { sessionStorage.setItem("pending_message", JSON.stringify({ message: prompt, model: "kairo" })); } catch {}
      router.push("/chat/" + json.data.id);
    }
  }

  // Drag handlers
  function onDragStart(e: React.DragEvent, id: string) {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    // Make drag image semi-transparent
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "0.5";
    }
  }

  function onDragEnd(e: React.DragEvent) {
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = "1";
    }
    setDragId(null);
    setDragOver(null);
  }

  function onDragOver(e: React.DragEvent, colId: string) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOver(colId);
  }

  function onDragLeave() {
    setDragOver(null);
  }

  function onDrop(e: React.DragEvent, colId: string) {
    e.preventDefault();
    var id = e.dataTransfer.getData("text/plain");
    if (id) handleStatusChange(id, colId);
    setDragId(null);
    setDragOver(null);
  }

  // Sort actions by priority within each column
  var priorityOrder: Record<string, number> = { urgent: 0, high: 1, medium: 2, low: 3 };

  var todo = actions.filter(function(a) { return a.status === "todo"; }).sort(function(a, b) { return (priorityOrder[a.priority] ?? 2) - (priorityOrder[b.priority] ?? 2); });
  var inProgress = actions.filter(function(a) { return a.status === "in_progress"; }).sort(function(a, b) { return (priorityOrder[a.priority] ?? 2) - (priorityOrder[b.priority] ?? 2); });
  var done = actions.filter(function(a) { return a.status === "done"; }).sort(function(a, b) { return new Date(b.completed_at || b.created_at).getTime() - new Date(a.completed_at || a.created_at).getTime(); });

  var columnData: Record<string, Action[]> = { todo: todo, in_progress: inProgress, done: done };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="h-5 w-5 border-2 border-[#EAEAEA] border-t-[#111] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-6 pt-6 pb-4 border-b border-[#EAEAEA] bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-[#111]">Actions</h1>
            <p className="text-[13px] text-[#999] mt-0.5">
              {todo.length + inProgress.length} active{todo.length + inProgress.length > 1 ? "s" : ""} · {done.length} completed{done.length > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={handleAskKairo}
            className="h-9 px-4 rounded-lg text-[12px] font-medium text-[#6366F1] border border-[#C7D2FE] hover:bg-[#EEF2FF] transition-colors flex items-center gap-1.5"
          >
            <Sparkles size={13} /> Prioritize with Kairo
          </button>
        </div>
      </div>

      {/* Kanban board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4 h-full min-h-0">
          {COLUMNS.map(function(col) {
            var items = columnData[col.id] || [];
            var Icon = col.icon;
            var isOver = dragOver === col.id;

            return (
              <div
                key={col.id}
                className="flex flex-col min-h-0"
                onDragOver={function(e) { onDragOver(e, col.id); }}
                onDragLeave={onDragLeave}
                onDrop={function(e) { onDrop(e, col.id); }}
              >
                {/* Column header */}
                <div className="flex items-center justify-between mb-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <Icon size={14} style={{ color: col.color }} />
                    <span className="text-[13px] font-semibold text-[#111]">{col.label}</span>
                    <span className="text-[11px] text-[#BBB] bg-[#F5F5F5] rounded-full h-5 min-w-[20px] flex items-center justify-center px-1.5 font-medium">
                      {items.length}
                    </span>
                  </div>
                  {col.id !== "done" && (
                    <button
                      onClick={function() { setAddingIn(addingIn === col.id ? null : col.id); }}
                      className="h-6 w-6 rounded-md text-[#C0C0C0] hover:text-[#111] hover:bg-[#F5F5F5] flex items-center justify-center transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  )}
                </div>

                {/* Drop zone */}
                <div className={"flex-1 rounded-lg border-2 border-dashed p-2 space-y-2 overflow-y-auto transition-colors " + (isOver ? "border-[#6366F1] bg-[#EEF2FF]" : "border-transparent bg-[#FAFAFA]")}>
                  {/* Quick add inline */}
                  {addingIn === col.id && (
                    <div className="bg-white rounded-lg border border-[#EAEAEA] p-2.5">
                      <input
                        ref={addInputRef}
                        type="text"
                        value={newTitle}
                        onChange={function(e) { setNewTitle(e.target.value); }}
                        onKeyDown={function(e) {
                          if (e.key === "Enter") handleAdd(col.id);
                          if (e.key === "Escape") { setAddingIn(null); setNewTitle(""); }
                        }}
                        placeholder="Action title..."
                        className="w-full text-[13px] bg-transparent focus:outline-none text-[#111] placeholder:text-[#C0C0C0]"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <button
                          onClick={function() { handleAdd(col.id); }}
                          disabled={!newTitle.trim()}
                          className="text-[11px] font-medium text-white bg-[#111] rounded-md px-2.5 py-1 hover:bg-[#333] disabled:opacity-40"
                        >
                          Add
                        </button>
                        <button onClick={function() { setAddingIn(null); setNewTitle(""); }} className="text-[11px] text-[#BBB]">Cancel</button>
                      </div>
                    </div>
                  )}

                  {/* Cards */}
                  {items.map(function(action) {
                    var dotColor = PRIORITY_DOT[action.priority] || "#F59E0B";
                    var isDragging = dragId === action.id;
                    var due = action.due_date ? dueLabel(action.due_date) : null;
                    var sourceLabel = action.source ? SOURCE_LABELS[action.source] : "";

                    return (
                      <div
                        key={action.id}
                        draggable
                        onDragStart={function(e) { onDragStart(e, action.id); }}
                        onDragEnd={onDragEnd}
                        className={"group bg-white rounded-lg border border-[#EAEAEA] p-3 cursor-grab active:cursor-grabbing hover:border-[#D4D4D4] hover:shadow-sm transition-all select-none " + (isDragging ? "opacity-50 ring-2 ring-[#6366F1]" : "") + (col.id === "done" ? " opacity-70" : "")}
                      >
                        {/* Top row: grip + title + delete */}
                        <div className="flex items-start gap-2">
                          <GripVertical size={12} className="text-[#D4D4D4] mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <p className={"flex-1 text-[13px] font-medium leading-snug " + (col.id === "done" ? "line-through text-[#BBB]" : "text-[#111]")}>
                            {action.title}
                          </p>
                          <button
                            onClick={function(e) { e.stopPropagation(); handleDelete(action.id); }}
                            className="shrink-0 opacity-0 group-hover:opacity-100 h-5 w-5 flex items-center justify-center rounded text-[#D4D4D4] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-all"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>

                        {/* Meta row */}
                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          {/* Priority dot */}
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: dotColor }} />
                            <span className="text-[9px] text-[#BBB]">{PRIORITY_LABEL[action.priority]}</span>
                          </div>

                          {/* Source */}
                          {sourceLabel && (
                            <span className="text-[9px] text-[#6366F1] bg-[#EEF2FF] px-1.5 py-0.5 rounded font-medium">{sourceLabel}</span>
                          )}

                          {/* Domain */}
                          {action.domain && (
                            <span className="text-[9px] text-[#BBB] bg-[#F5F5F5] px-1.5 py-0.5 rounded">{action.domain}</span>
                          )}

                          {/* Due date */}
                          {due && (
                            <span className={"text-[9px] font-medium flex items-center gap-0.5 " + (due.overdue ? "text-[#EF4444]" : "text-[#999]")}>
                              <Calendar size={8} /> {due.text}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Empty state */}
                  {items.length === 0 && !addingIn && (
                    <div className="flex items-center justify-center h-24 text-[11px] text-[#C0C0C0]">
                      {col.emptyText}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
