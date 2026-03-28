"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Check, Clock, Circle, X, AlertTriangle, Zap, ArrowRight, Sparkles, ChevronDown } from "lucide-react";

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

var PRIORITY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  urgent: { label: "Urgent", color: "#EF4444", bg: "#FEF2F2" },
  high: { label: "Haute", color: "#F97316", bg: "#FFF7ED" },
  medium: { label: "Moyenne", color: "#F59E0B", bg: "#FFFBEB" },
  low: { label: "Basse", color: "#22C55E", bg: "#F0FDF4" },
};

var SOURCE_LABELS: Record<string, string> = {
  ai_suggestion: "Kairo AI",
  alert: "Alerte",
  quick_win: "Quick Win",
  manual: "Manuel",
  weekly_review: "Revue hebdo",
};

function timeSince(date: string): string {
  var ms = Date.now() - new Date(date).getTime();
  if (isNaN(ms) || ms < 0) return "";
  var d = Math.floor(ms / 86400000);
  if (d === 0) return "Aujourd'hui";
  if (d === 1) return "Hier";
  return "Il y a " + d + "j";
}

function dueLabel(date: string): { text: string; overdue: boolean } {
  var diff = Math.floor((new Date(date).getTime() - Date.now()) / 86400000);
  if (diff < 0) return { text: "En retard (" + Math.abs(diff) + "j)", overdue: true };
  if (diff === 0) return { text: "Aujourd'hui", overdue: false };
  if (diff === 1) return { text: "Demain", overdue: false };
  return { text: "Dans " + diff + "j", overdue: false };
}

export default function ActionsPage() {
  var router = useRouter();
  var [actions, setActions] = useState<Action[]>([]);
  var [loading, setLoading] = useState(true);
  var [showAdd, setShowAdd] = useState(false);
  var [newTitle, setNewTitle] = useState("");
  var [newPriority, setNewPriority] = useState<"low" | "medium" | "high" | "urgent">("medium");
  var [filter, setFilter] = useState<"all" | "todo" | "in_progress" | "done">("all");
  var [adding, setAdding] = useState(false);

  useEffect(function() {
    fetch("/api/pilot/actions?perPage=100").then(function(r) { return r.json(); }).then(function(json) {
      setActions(json.data?.items ?? []);
    }).catch(function() {}).finally(function() { setLoading(false); });
  }, []);

  async function handleAdd() {
    if (!newTitle.trim() || adding) return;
    setAdding(true);
    var res = await fetch("/api/pilot/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, priority: newPriority, source: "manual" }),
    });
    if (res.ok) {
      var json = await res.json();
      if (json.data) setActions(function(prev) { return [json.data, ...prev]; });
      setNewTitle("");
      setShowAdd(false);
    }
    setAdding(false);
  }

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

  async function handleAskKairo() {
    var todoActions = actions.filter(function(a) { return a.status === "todo" || a.status === "in_progress"; });
    var prompt = "Voici mes actions en cours :\n" + todoActions.slice(0, 10).map(function(a, i) { return (i + 1) + ". " + a.title + " (priorite: " + a.priority + ")"; }).join("\n") + "\n\nAnalyse ces actions, priorise-les, et dis-moi par quoi commencer cette semaine. Ajoute des actions manquantes si tu detectes des problemes dans mes donnees.";
    var res = await fetch("/api/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Priorisation des actions" }),
    });
    var json = await res.json();
    if (json.data?.id) {
      try { sessionStorage.setItem("pending_message", JSON.stringify({ message: prompt, model: "kairo" })); } catch {}
      router.push("/chat/" + json.data.id);
    }
  }

  var todo = actions.filter(function(a) { return a.status === "todo"; });
  var inProgress = actions.filter(function(a) { return a.status === "in_progress"; });
  var done = actions.filter(function(a) { return a.status === "done"; });

  var filtered = filter === "all" ? actions.filter(function(a) { return a.status !== "cancelled"; }) :
    actions.filter(function(a) { return a.status === filter; });

  // Sort: urgent first, then high, medium, low
  var priorityOrder: Record<string, number> = { urgent: 0, high: 1, medium: 2, low: 3 };
  filtered.sort(function(a, b) { return (priorityOrder[a.priority] ?? 2) - (priorityOrder[b.priority] ?? 2); });

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="h-5 w-5 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-[#0A0A0A]">Actions</h1>
            <p className="text-sm text-[#737373] mt-0.5">
              {todo.length} a faire, {inProgress.length} en cours, {done.length} terminees
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAskKairo}
              className="h-9 px-3 rounded-lg text-[12px] font-medium text-[#6366F1] border border-[#C7D2FE] hover:bg-[#EEF2FF] transition-colors flex items-center gap-1.5"
            >
              <Sparkles size={13} /> Prioriser avec Kairo
            </button>
            <button
              onClick={function() { setShowAdd(true); }}
              className="h-9 px-3 rounded-lg text-[12px] font-medium text-white bg-[#0A0A0A] hover:bg-[#333] transition-colors flex items-center gap-1.5"
            >
              <Plus size={14} /> Nouvelle action
            </button>
          </div>
        </div>

        {/* Quick add */}
        {showAdd && (
          <div className="mb-6 bg-white rounded-xl border border-[#E5E5E5] p-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newTitle}
                onChange={function(e) { setNewTitle(e.target.value); }}
                onKeyDown={function(e) { if (e.key === "Enter") handleAdd(); }}
                placeholder="Titre de l'action..."
                autoFocus
                className="flex-1 h-10 px-3 text-sm rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent"
              />
              <select
                value={newPriority}
                onChange={function(e) { setNewPriority(e.target.value as any); }}
                className="h-10 px-2 text-xs rounded-lg border border-[#E5E5E5] bg-white text-[#525252] focus:outline-none"
              >
                <option value="urgent">Urgent</option>
                <option value="high">Haute</option>
                <option value="medium">Moyenne</option>
                <option value="low">Basse</option>
              </select>
              <button onClick={handleAdd} disabled={!newTitle.trim() || adding} className="h-10 px-4 rounded-lg bg-[#0A0A0A] text-white text-xs font-medium hover:bg-[#333] disabled:opacity-40">
                {adding ? "..." : "Ajouter"}
              </button>
              <button onClick={function() { setShowAdd(false); setNewTitle(""); }} className="text-[#A3A3A3] hover:text-[#737373]">
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: "A faire", count: todo.length, icon: Circle, color: "#525252", filterVal: "todo" as const },
            { label: "En cours", count: inProgress.length, icon: Clock, color: "#F59E0B", filterVal: "in_progress" as const },
            { label: "Terminees", count: done.length, icon: Check, color: "#22C55E", filterVal: "done" as const },
            { label: "Total", count: actions.filter(function(a) { return a.status !== "cancelled"; }).length, icon: Zap, color: "#0A0A0A", filterVal: "all" as const },
          ].map(function(stat) {
            var isActive = filter === stat.filterVal;
            var Icon = stat.icon;
            return (
              <button
                key={stat.label}
                onClick={function() { setFilter(stat.filterVal); }}
                className={"rounded-xl border p-4 text-left transition-all " + (isActive ? "border-[#0A0A0A] bg-[#FAFAFA] ring-1 ring-[#0A0A0A]" : "border-[#EBEBEB] hover:border-[#D4D4D4]")}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={16} style={{ color: stat.color }} />
                  <span className="text-2xl font-bold text-[#0A0A0A] tabular-nums">{stat.count}</span>
                </div>
                <p className="text-[11px] text-[#737373] font-medium">{stat.label}</p>
              </button>
            );
          })}
        </div>

        {/* Action list */}
        {filtered.length === 0 && (
          <div className="text-center py-12 bg-[#FAFAFA] rounded-xl border border-[#EBEBEB]">
            <Check size={24} className="text-[#22C55E] mx-auto mb-2" />
            <p className="text-sm font-medium text-[#0A0A0A]">Aucune action</p>
            <p className="text-xs text-[#A3A3A3] mt-1">Les actions creees par Kairo ou manuellement apparaitront ici.</p>
          </div>
        )}

        <div className="space-y-2">
          {filtered.map(function(action) {
            var prio = PRIORITY_CONFIG[action.priority] || PRIORITY_CONFIG.medium;
            var isDone = action.status === "done";
            var due = action.due_date ? dueLabel(action.due_date) : null;

            return (
              <div key={action.id} className={"rounded-xl border border-[#EBEBEB] bg-white px-4 py-3 transition-all " + (isDone ? "opacity-60" : "hover:border-[#D4D4D4]")}>
                <div className="flex items-start gap-3">
                  {/* Status toggle */}
                  <button
                    onClick={function() {
                      if (action.status === "todo") handleStatusChange(action.id, "in_progress");
                      else if (action.status === "in_progress") handleStatusChange(action.id, "done");
                      else if (action.status === "done") handleStatusChange(action.id, "todo");
                    }}
                    className="mt-0.5 shrink-0"
                  >
                    {action.status === "done" ? (
                      <div className="h-5 w-5 rounded-full bg-[#22C55E] flex items-center justify-center"><Check size={12} className="text-white" /></div>
                    ) : action.status === "in_progress" ? (
                      <div className="h-5 w-5 rounded-full border-2 border-[#F59E0B] flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-[#F59E0B]" /></div>
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-[#D4D4D4] hover:border-[#A3A3A3] transition-colors" />
                    )}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={"text-[13px] font-medium leading-snug " + (isDone ? "line-through text-[#A3A3A3]" : "text-[#0A0A0A]")}>{action.title}</p>
                    {action.description && (
                      <p className="text-[11px] text-[#737373] mt-0.5 line-clamp-1">{action.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ color: prio.color, backgroundColor: prio.bg }}>{prio.label}</span>
                      {action.source && action.source !== "manual" && (
                        <span className="text-[9px] text-[#A3A3A3] bg-[#F5F5F5] px-1.5 py-0.5 rounded">{SOURCE_LABELS[action.source] || action.source}</span>
                      )}
                      {action.domain && (
                        <span className="text-[9px] text-[#A3A3A3]">{action.domain}</span>
                      )}
                      {due && (
                        <span className={"text-[9px] font-medium " + (due.overdue ? "text-[#EF4444]" : "text-[#737373]")}>{due.text}</span>
                      )}
                      <span className="text-[9px] text-[#D4D4D4]">{timeSince(action.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
