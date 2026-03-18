"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, X, Target, TrendingUp, Calendar, User } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  metric: "revenue" | "deals_won" | "pipeline_value";
  period: "month" | "quarter" | "year";
  ownerId?: string;
  createdAt: string;
}

const METRIC_LABELS: Record<string, string> = {
  revenue: "Revenue",
  deals_won: "Deals Won",
  pipeline_value: "Pipeline Value",
};

const PERIOD_LABELS: Record<string, string> = {
  month: "This Month",
  quarter: "This Quarter",
  year: "This Year",
};

function formatValue(value: number, metric: string): string {
  if (metric === "deals_won") return String(value);
  if (value >= 1000000) return (value / 1000000).toFixed(1) + "M EUR";
  if (value >= 1000) return Math.round(value / 1000) + "K EUR";
  return value.toLocaleString() + " EUR";
}

export default function GoalsPage() {
  var [goals, setGoals] = useState<Goal[]>([]);
  var [loading, setLoading] = useState(true);
  var [showModal, setShowModal] = useState(false);
  var [saving, setSaving] = useState(false);
  var [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    metric: "revenue" as Goal["metric"],
    period: "quarter" as Goal["period"],
    ownerId: "",
  });
  var router = useRouter();

  async function loadGoals() {
    setLoading(true);
    try {
      var res = await fetch("/api/goals/progress");
      if (res.ok) {
        var json = await res.json();
        setGoals(json.data || []);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }

  useEffect(function () {
    loadGoals();
  }, []);

  async function handleAddGoal() {
    if (!newGoal.name || !newGoal.target) return;
    setSaving(true);
    var goal: Goal = {
      id: crypto.randomUUID(),
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      current: 0,
      metric: newGoal.metric,
      period: newGoal.period,
      ownerId: newGoal.ownerId || undefined,
      createdAt: new Date().toISOString(),
    };
    var updated = [...goals, goal];
    await fetch("/api/goals", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goals: updated }),
    });
    setShowModal(false);
    setNewGoal({ name: "", target: "", metric: "revenue", period: "quarter", ownerId: "" });
    setSaving(false);
    loadGoals();
  }

  async function handleDeleteGoal(id: string) {
    var updated = goals.filter(function (g) { return g.id !== id; });
    setGoals(updated);
    await fetch("/api/goals", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goals: updated }),
    });
  }

  return (
    <div className="flex-1 overflow-auto bg-[#FAFAFA]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#E5E5E5]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={function () { router.push("/dashboards"); }}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] transition-colors"
            >
              <ArrowLeft size={18} className="text-[#737373]" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-[#0A0A0A]">Goals & Quotas</h1>
              <p className="text-xs text-[#A3A3A3]">Track your team targets against live HubSpot data</p>
            </div>
          </div>
          <button
            onClick={function () { setShowModal(true); }}
            className="flex items-center gap-2 px-4 h-9 rounded-lg bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#262626] transition-colors"
          >
            <Plus size={16} />
            Add Goal
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(function (i) {
              return (
                <div key={i} className="bg-white rounded-xl border border-[#E5E5E5] p-6 animate-pulse">
                  <div className="h-4 bg-[#F0F0F0] rounded w-2/3 mb-4" />
                  <div className="h-8 bg-[#F0F0F0] rounded w-1/3 mb-3" />
                  <div className="h-2 bg-[#F0F0F0] rounded w-full" />
                </div>
              );
            })}
          </div>
        ) : goals.length === 0 ? (
          <div className="text-center py-20">
            <div className="h-14 w-14 rounded-2xl bg-[#F5F5F5] flex items-center justify-center mx-auto mb-4">
              <Target size={24} className="text-[#A3A3A3]" />
            </div>
            <h2 className="text-base font-medium text-[#0A0A0A] mb-1">No goals yet</h2>
            <p className="text-sm text-[#737373] mb-4">Create your first goal to start tracking progress</p>
            <button
              onClick={function () { setShowModal(true); }}
              className="px-4 h-9 rounded-lg bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#262626] transition-colors"
            >
              Create Goal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map(function (goal) {
              var pct = goal.target > 0 ? Math.min(100, Math.round((goal.current / goal.target) * 100)) : 0;
              var barColor = pct >= 80 ? "#22C55E" : pct >= 50 ? "#F59E0B" : "#EF4444";
              return (
                <div key={goal.id} className="bg-white rounded-xl border border-[#E5E5E5] p-6 group relative">
                  <button
                    onClick={function () { handleDeleteGoal(goal.id); }}
                    className="absolute top-3 right-3 h-7 w-7 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[#FEF2F2] text-[#A3A3A3] hover:text-[#EF4444] transition-all"
                  >
                    <X size={14} />
                  </button>

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-semibold text-[#0A0A0A] mb-1">{goal.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-[#A3A3A3]">
                        <span className="flex items-center gap-1">
                          <TrendingUp size={12} />
                          {METRIC_LABELS[goal.metric]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {PERIOD_LABELS[goal.period]}
                        </span>
                        {goal.ownerId && (
                          <span className="flex items-center gap-1">
                            <User size={12} />
                            {goal.ownerId}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold text-[#0A0A0A]">{formatValue(goal.current, goal.metric)}</div>
                      <div className="text-xs text-[#A3A3A3]">of {formatValue(goal.target, goal.metric)}</div>
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: barColor }}
                    >
                      {pct}%
                    </div>
                  </div>

                  <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: pct + "%", backgroundColor: barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Goal Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-semibold text-[#0A0A0A]">New Goal</h2>
              <button
                onClick={function () { setShowModal(false); }}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] text-[#A3A3A3]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#525252] mb-1.5">Goal Name</label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={function (e) { setNewGoal({ ...newGoal, name: e.target.value }); }}
                  placeholder="e.g. Q1 Revenue Target"
                  className="w-full h-10 px-3 rounded-lg border border-[#E5E5E5] text-sm text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#525252] mb-1.5">Target Value</label>
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={function (e) { setNewGoal({ ...newGoal, target: e.target.value }); }}
                  placeholder="e.g. 100000"
                  className="w-full h-10 px-3 rounded-lg border border-[#E5E5E5] text-sm text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#525252] mb-1.5">Metric</label>
                <select
                  value={newGoal.metric}
                  onChange={function (e) { setNewGoal({ ...newGoal, metric: e.target.value as Goal["metric"] }); }}
                  className="w-full h-10 px-3 rounded-lg border border-[#E5E5E5] text-sm text-[#0A0A0A] bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                >
                  <option value="revenue">Revenue (Won Deals)</option>
                  <option value="deals_won">Deals Won (Count)</option>
                  <option value="pipeline_value">Pipeline Value (Open)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#525252] mb-1.5">Period</label>
                <select
                  value={newGoal.period}
                  onChange={function (e) { setNewGoal({ ...newGoal, period: e.target.value as Goal["period"] }); }}
                  className="w-full h-10 px-3 rounded-lg border border-[#E5E5E5] text-sm text-[#0A0A0A] bg-white focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                >
                  <option value="month">Monthly</option>
                  <option value="quarter">Quarterly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#525252] mb-1.5">Owner ID (optional)</label>
                <input
                  type="text"
                  value={newGoal.ownerId}
                  onChange={function (e) { setNewGoal({ ...newGoal, ownerId: e.target.value }); }}
                  placeholder="HubSpot owner ID"
                  className="w-full h-10 px-3 rounded-lg border border-[#E5E5E5] text-sm text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={function () { setShowModal(false); }}
                className="flex-1 h-10 rounded-lg border border-[#E5E5E5] text-sm font-medium text-[#525252] hover:bg-[#F5F5F5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                disabled={saving || !newGoal.name || !newGoal.target}
                className="flex-1 h-10 rounded-lg bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#262626] transition-colors disabled:opacity-40"
              >
                {saving ? "Saving..." : "Create Goal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
