"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, TrendingDown, TrendingUp, Minus, Zap, ChevronRight, Check, X, Plug, ArrowUpRight, ArrowDownRight, CheckSquare, Heart, ChevronDown, Upload, RefreshCw } from "lucide-react";

interface AlertData {
  id: string;
  alert_type: string;
  severity: "info" | "warning" | "critical";
  title: string;
  description: string;
  ai_suggestion?: string;
  domain?: string;
  current_value?: number;
  threshold?: number;
  created_at: string;
  status: string;
}

interface ScoreData {
  overallScore: number;
  grade: string;
  lastUpdated: string;
  dataDiscipline: number;
  pipelineRigor: number;
  activityLogging: number;
  processAdherence: number;
  toolUsage: number;
  dimensions: Record<string, { score: number; status: string; trend: string }>;
  domainHealth: { potentialRiskAreas: string[]; recommendations: string[] };
}

var DOMAIN_LABELS: Record<string, string> = {
  pipeline: "Pipeline",
  performance: "Performance",
  data_quality: "Data Quality",
  adoption: "Adoption",
};

var DIMENSION_LABELS: Record<string, { label: string; weight: string }> = {
  dataQuality: { label: "Data Discipline", weight: "30%" },
  pipelineRigor: { label: "Pipeline Rigor", weight: "25%" },
  activityLogging: { label: "Activity Logging", weight: "20%" },
  processAdherence: { label: "Process", weight: "15%" },
  toolUsage: { label: "Tool Usage", weight: "10%" },
};

function getScoreColor(score: number): string {
  if (score >= 80) return "#22C55E";
  if (score >= 60) return "#F59E0B";
  if (score >= 40) return "#F97316";
  return "#EF4444";
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "improving") return <ArrowUpRight size={12} className="text-[#22C55E]" />;
  if (trend === "declining") return <ArrowDownRight size={12} className="text-[#EF4444]" />;
  return <Minus size={12} className="text-[#BBB]" />;
}

function ScoreGauge({ score, size = 120 }: { score: number; size?: number }) {
  var radius = (size - 12) / 2;
  var circumference = 2 * Math.PI * radius;
  var dashOffset = circumference * (1 - score / 100);
  var color = getScoreColor(score);

  return (
    <svg width={size} height={size} viewBox={"0 0 " + size + " " + size}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F0F0F0" strokeWidth="8" />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={circumference} strokeDashoffset={dashOffset}
        transform={"rotate(-90 " + size / 2 + " " + size / 2 + ")"}
        className="transition-all duration-700"
      />
      <text x={size / 2} y={size / 2 - 6} textAnchor="middle" className="text-2xl font-bold" fill="#0A0A0A" fontSize="28">{score}</text>
      <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fill="#A3A3A3" fontSize="11">/100</text>
    </svg>
  );
}

function timeSince(date: string): string {
  var ms = Date.now() - new Date(date).getTime();
  if (isNaN(ms) || ms < 0) return "";
  var seconds = Math.floor(ms / 1000);
  if (seconds < 3600) return Math.max(1, Math.floor(seconds / 60)) + " min";
  if (seconds < 86400) return Math.floor(seconds / 3600) + "h";
  return Math.floor(seconds / 86400) + "j";
}

// ═══ Health Score types ═══
interface DealHealth {
  id: string; name: string; stage: string; amount: number; owner: string;
  healthScore: number; grade: string; emoji: string; numContacts: number; stageProb: number;
  breakdown: Record<string, { score: number; max: number; detail: string }>;
  risks: string[];
  daysSinceActivity: number; ageInDays: number;
}
interface HealthData {
  summary: { total: number; critical: number; needsAttention: number; atRisk: number; healthy: number; avgHealth: number; avgWonCycleDays: number };
  deals: DealHealth[];
  hubspotWrite?: { updated: number; failed: number };
}
interface Pipeline { id: string; label: string; stages: Array<{ id: string; label: string; displayOrder: number }>; }

function HealthScoreTab() {
  var [health, setHealth] = useState<HealthData | null>(null);
  var [pipelines, setPipelines] = useState<Pipeline[]>([]);
  var [selectedPipeline, setSelectedPipeline] = useState("");
  var [selectedClosedWon, setSelectedClosedWon] = useState("");
  var [loading, setLoading] = useState(true);
  var [writing, setWriting] = useState(false);
  var [writeResult, setWriteResult] = useState<{ updated: number; failed: number } | null>(null);

  useEffect(function() {
    // Load pipelines
    fetch("/api/connectors/hubspot/pipelines").then(function(r) { return r.json(); }).then(function(json) {
      if (json.data?.pipelines) {
        setPipelines(json.data.pipelines);
        if (json.data.pipelines.length > 0) {
          setSelectedPipeline(json.data.pipelines[0].id);
          // Auto-detect closed won stage
          var stages = json.data.pipelines[0].stages || [];
          var closedWon = stages.find(function(s: any) { return s.metadata?.probability === "1.0" || s.label.toLowerCase().includes("won") || s.id.includes("won"); });
          if (closedWon) setSelectedClosedWon(closedWon.id);
          else if (stages.length > 0) setSelectedClosedWon(stages[stages.length - 1].id);
        }
      }
    }).catch(function() {});

    // Load health scores
    fetch("/api/health-score").then(function(r) { return r.json(); }).then(function(json) {
      if (json.data) setHealth(json.data);
    }).catch(function() {}).finally(function() { setLoading(false); });
  }, []);

  function refreshScores() {
    setLoading(true);
    setWriteResult(null);
    fetch("/api/health-score").then(function(r) { return r.json(); }).then(function(json) {
      if (json.data) setHealth(json.data);
    }).catch(function() {}).finally(function() { setLoading(false); });
  }

  function writeToHubSpot() {
    setWriting(true);
    fetch("/api/health-score?write=true").then(function(r) { return r.json(); }).then(function(json) {
      if (json.data?.hubspotWrite) setWriteResult(json.data.hubspotWrite);
      if (json.data) setHealth(json.data);
    }).catch(function() {}).finally(function() { setWriting(false); });
  }

  var currentPipeline = pipelines.find(function(p) { return p.id === selectedPipeline; });
  var currentStages = currentPipeline?.stages || [];

  if (loading) return <div className="py-12 text-center"><div className="h-5 w-5 border-2 border-[#EAEAEA] border-t-[#111] rounded-full animate-spin mx-auto" /></div>;

  return (
    <div>
      {/* Pipeline + Closed Won selector */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#BBB] font-semibold block mb-1">Pipeline</label>
          <select value={selectedPipeline} onChange={function(e) { setSelectedPipeline(e.target.value); }} className="h-9 px-3 text-[12px] rounded-lg border border-[#EAEAEA] bg-white text-[#111] min-w-[180px]">
            {pipelines.map(function(p) { return <option key={p.id} value={p.id}>{p.label}</option>; })}
          </select>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wider text-[#BBB] font-semibold block mb-1">Closed Won Stage</label>
          <select value={selectedClosedWon} onChange={function(e) { setSelectedClosedWon(e.target.value); }} className="h-9 px-3 text-[12px] rounded-lg border border-[#EAEAEA] bg-white text-[#111] min-w-[180px]">
            {currentStages.map(function(s) { return <option key={s.id} value={s.id}>{s.label}</option>; })}
          </select>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <button onClick={refreshScores} className="h-9 px-3 rounded-lg border border-[#EAEAEA] text-[12px] text-[#555] hover:bg-[#F5F5F5] flex items-center gap-1.5 transition-colors">
            <RefreshCw size={12} /> Refresh
          </button>
          <button onClick={writeToHubSpot} disabled={writing || !health} className="h-9 px-3 rounded-lg bg-[#111] text-white text-[12px] font-medium flex items-center gap-1.5 hover:bg-[#333] transition-colors disabled:opacity-50">
            <Upload size={12} /> {writing ? "Writing..." : "Write to HubSpot"}
          </button>
        </div>
      </div>

      {writeResult && (
        <div className={"rounded-lg border px-4 py-2.5 mb-4 text-[12px] " + (writeResult.failed === 0 ? "bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]" : "bg-[#FFFBEB] border-[#FEF3C7] text-[#92400E]")}>
          {writeResult.failed === 0 ? "✅" : "⚠️"} {writeResult.updated} deals updated in HubSpot{writeResult.failed > 0 ? " (" + writeResult.failed + " failed)" : ""}. Scores are now visible on deal cards.
        </div>
      )}

      {!health || health.deals.length === 0 ? (
        <div className="text-center py-12 text-[#999] text-[13px]">No open deals found in this pipeline.</div>
      ) : (
        <>
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-4 text-center">
              <p className="text-2xl font-bold text-[#111]">{health.summary.avgHealth}</p>
              <p className="text-[10px] text-[#BBB] mt-1">Avg Score /100</p>
            </div>
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-4 text-center">
              <p className="text-2xl font-bold text-[#111]">{health.summary.total}</p>
              <p className="text-[10px] text-[#BBB] mt-1">Total Deals</p>
            </div>
            <div className="rounded-lg border border-[#22C55E20] bg-[#F0FDF4] p-4 text-center">
              <p className="text-2xl font-bold text-[#22C55E]">{health.summary.healthy}</p>
              <p className="text-[10px] text-[#22C55E] mt-1">🟢 Healthy</p>
            </div>
            <div className="rounded-lg border border-[#F59E0B20] bg-[#FFFBEB] p-4 text-center">
              <p className="text-2xl font-bold text-[#F59E0B]">{health.summary.atRisk}</p>
              <p className="text-[10px] text-[#F59E0B] mt-1">🟡 At Risk</p>
            </div>
            <div className="rounded-lg border border-[#F9731620] bg-[#FFF7ED] p-4 text-center">
              <p className="text-2xl font-bold text-[#F97316]">{health.summary.needsAttention}</p>
              <p className="text-[10px] text-[#F97316] mt-1">🟠 Needs Att.</p>
            </div>
            <div className="rounded-lg border border-[#EF444420] bg-[#FEF2F2] p-4 text-center">
              <p className="text-2xl font-bold text-[#EF4444]">{health.summary.critical}</p>
              <p className="text-[10px] text-[#EF4444] mt-1">🔴 Critical</p>
            </div>
          </div>

          {/* Deals table */}
          <div className="rounded-lg border border-[#EAEAEA] bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-[#EAEAEA] bg-[#FAFAFA]">
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-[#999] px-3 py-2.5">Deal</th>
                    <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-[#999] px-3 py-2.5">Score</th>
                    <th className="text-center text-[10px] font-semibold uppercase tracking-wider text-[#999] px-3 py-2.5">Grade</th>
                    <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-[#999] px-3 py-2.5">Amount</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-[#999] px-3 py-2.5">Owner</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-[#999] px-3 py-2.5 hidden lg:table-cell">Stage</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-[#999] px-3 py-2.5 hidden lg:table-cell">Momentum</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-[#999] px-3 py-2.5 hidden lg:table-cell">Activity</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-[#999] px-3 py-2.5 hidden xl:table-cell">Risks</th>
                  </tr>
                </thead>
                <tbody>
                  {health.deals.map(function(deal) {
                    var scoreColor = deal.healthScore >= 80 ? "#22C55E" : deal.healthScore >= 60 ? "#F59E0B" : deal.healthScore >= 40 ? "#F97316" : "#EF4444";
                    var gradeBg = deal.healthScore >= 80 ? "bg-[#F0FDF4] text-[#22C55E]" : deal.healthScore >= 60 ? "bg-[#FFFBEB] text-[#F59E0B]" : deal.healthScore >= 40 ? "bg-[#FFF7ED] text-[#F97316]" : "bg-[#FEF2F2] text-[#EF4444]";
                    return (
                      <tr key={deal.id} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#FAFAFA]">
                        <td className="px-3 py-2.5">
                          <p className="font-medium text-[#111] truncate max-w-[200px]">{deal.name}</p>
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-16 h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: deal.healthScore + "%", backgroundColor: scoreColor }} />
                            </div>
                            <span className="font-bold tabular-nums" style={{ color: scoreColor }}>{deal.healthScore}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          <span className={"text-[10px] font-semibold px-2 py-0.5 rounded " + gradeBg}>{deal.emoji} {deal.grade}</span>
                        </td>
                        <td className="px-3 py-2.5 text-right tabular-nums text-[#555]">{deal.amount > 0 ? (deal.amount / 1000).toFixed(0) + "K" : "—"}</td>
                        <td className="px-3 py-2.5 text-[#555] truncate max-w-[120px]">{deal.owner || "—"}</td>
                        <td className="px-3 py-2.5 text-[#999] hidden lg:table-cell truncate max-w-[100px]">{deal.stage || "—"}</td>
                        <td className="px-3 py-2.5 hidden lg:table-cell">
                          <span className="text-[10px] tabular-nums">{deal.breakdown.stageMomentum?.score}/{deal.breakdown.stageMomentum?.max}</span>
                        </td>
                        <td className="px-3 py-2.5 hidden lg:table-cell">
                          <span className="text-[10px] tabular-nums">{deal.breakdown.activityRecency?.score}/{deal.breakdown.activityRecency?.max}</span>
                        </td>
                        <td className="px-3 py-2.5 hidden xl:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {deal.risks.slice(0, 2).map(function(r, i) {
                              return <span key={i} className="text-[9px] bg-[#FEF2F2] text-[#EF4444] px-1.5 py-0.5 rounded truncate max-w-[150px]">{r}</span>;
                            })}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-3 py-2 bg-[#FAFAFA] border-t border-[#EAEAEA] text-[10px] text-[#999]">
              {health.deals.length} deals · Avg won cycle: {health.summary.avgWonCycleDays}d
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function AlertsPage() {
  var router = useRouter();
  var [tab, setTab] = useState<"alerts" | "health">("alerts");
  var [alerts, setAlerts] = useState<AlertData[]>([]);
  var [scores, setScores] = useState<ScoreData | null>(null);
  var [loading, setLoading] = useState(true);
  var [hubspotConnected, setHubspotConnected] = useState<boolean | null>(null);
  var [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");

  useEffect(function() {
    Promise.all([
      fetch("/api/connectors/hubspot/status").then(function(r) { return r.json(); }).then(function(json) {
        setHubspotConnected(json.data?.connected ?? false);
      }).catch(function() { setHubspotConnected(false); }),
      fetch("/api/alerts").then(function(r) { return r.json(); }).then(function(json) {
        setAlerts(json.data?.alerts ?? []);
      }).catch(function() {}),
      fetch("/api/metrics/adoption-score").then(function(r) { return r.json(); }).then(function(json) {
        if (json.data) setScores(json.data);
      }).catch(function() {}),
    ]).finally(function() { setLoading(false); });
  }, []);

  var [createdActions, setCreatedActions] = useState<Set<string>>(new Set());

  function handleDismiss(id: string) {
    setAlerts(function(prev) { return prev.filter(function(a) { return a.id !== id; }); });
    fetch("/api/alerts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ alertId: id, action: "dismissed" }) }).catch(function() {});
  }

  async function handleCreateAction(alert: AlertData) {
    var priorityMap: Record<string, string> = { critical: "urgent", warning: "high", info: "medium" };
    var res = await fetch("/api/pilot/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: alert.title,
        description: alert.ai_suggestion || alert.description,
        priority: priorityMap[alert.severity] || "medium",
        source: "alert",
        domain: alert.domain || "",
      }),
    });
    if (res.ok) {
      setCreatedActions(function(prev) { var n = new Set(prev); n.add(alert.id); return n; });
    }
  }

  function handleInvestigate(alert: AlertData) {
    var prompt = "A propos de cette alerte : " + alert.title + ". " + (alert.ai_suggestion || alert.description) + " Donne-moi les details, les causes possibles, et un plan d'action concret.";
    fetch("/api/conversations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title: alert.title.slice(0, 80) }) })
      .then(function(r) { return r.json(); }).then(function(json) {
        if (json.data?.id) {
          try { sessionStorage.setItem("pending_message", JSON.stringify({ message: prompt, model: "kairo" })); } catch {}
          router.push("/chat/" + json.data.id);
        }
      }).catch(function() {});
  }

  var filtered = filter === "all" ? alerts : alerts.filter(function(a) { return a.severity === filter; });
  var critical = alerts.filter(function(a) { return a.severity === "critical"; }).length;
  var warning = alerts.filter(function(a) { return a.severity === "warning"; }).length;
  var info = alerts.filter(function(a) { return a.severity === "info"; }).length;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="h-5 w-5 border-2 border-[#EAEAEA] border-t-[#111] rounded-full animate-spin" />
      </div>
    );
  }

  if (hubspotConnected === false) {
    return (
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="h-14 w-14 rounded-lg bg-[#F5F5F5] flex items-center justify-center mx-auto mb-4">
            <Plug size={28} className="text-[#BBB]" />
          </div>
          <h2 className="text-lg font-semibold text-[#111] mb-2">Connect HubSpot to enable alerts</h2>
          <p className="text-[13px] text-[#999] mb-6">
            Kairo analyzes your CRM data daily and automatically detects issues:
            stalled deals, insufficient pipeline, declining win rate, missing data...
          </p>
          <button
            onClick={function() { router.push("/settings?tab=connectors"); }}
            className="bg-[#111] text-white rounded-lg px-5 py-2.5 text-[13px] font-medium hover:bg-[#262626] transition-colors"
          >
            Connect HubSpot
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-[#111]">Command Center</h1>
          <p className="text-[13px] text-[#999] mt-0.5">CRM health, scores and alerts in real-time.</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0 border-b border-[#EAEAEA] mb-6">
          <button onClick={function() { setTab("alerts"); }} className={"px-4 py-2.5 text-[13px] -mb-px transition-colors " + (tab === "alerts" ? "text-[#111] font-medium border-b-2 border-[#111]" : "text-[#999] hover:text-[#111]")}>
            Alerts {alerts.length > 0 ? "(" + alerts.length + ")" : ""}
          </button>
          <button onClick={function() { setTab("health"); }} className={"px-4 py-2.5 text-[13px] -mb-px transition-colors flex items-center gap-1.5 " + (tab === "health" ? "text-[#111] font-medium border-b-2 border-[#111]" : "text-[#999] hover:text-[#111]")}>
            <Heart size={13} /> Health Score
          </button>
        </div>

        {/* Health Score Tab */}
        {tab === "health" && <HealthScoreTab />}

        {/* Alerts Tab */}
        {tab === "alerts" && <>
        {/* ═══ SCORES SECTION ═══ */}
        {scores && scores.overallScore > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-12 gap-4">
              {/* Main score gauge */}
              <div className="col-span-12 md:col-span-4 bg-white rounded-lg border border-[#EAEAEA] p-6 flex flex-col items-center">
                <ScoreGauge score={scores.overallScore} />
                <div className="mt-3 text-center">
                  <span className="inline-block px-3 py-1 rounded-full text-[13px] font-bold" style={{ color: getScoreColor(scores.overallScore), backgroundColor: getScoreColor(scores.overallScore) + "15" }}>
                    Grade {scores.grade}
                  </span>
                  <p className="text-[10px] text-[#BBB] mt-2">Adoption Score</p>
                </div>
              </div>

              {/* Dimension breakdown */}
              <div className="col-span-12 md:col-span-8 bg-white rounded-lg border border-[#EAEAEA] p-6">
                <h3 className="text-[13px] font-semibold text-[#111] mb-4">Dimensions</h3>
                <div className="space-y-3.5">
                  {Object.entries(scores.dimensions).map(function(entry) {
                    var key = entry[0];
                    var dim = entry[1];
                    var meta = DIMENSION_LABELS[key];
                    if (!meta) return null;
                    var color = getScoreColor(dim.score);
                    var pct = Math.min(100, dim.score);

                    return (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-medium text-[#111]">{meta.label}</span>
                            <span className="text-[10px] text-[#C0C0C0]">{meta.weight}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <TrendIcon trend={dim.trend} />
                            <span className="text-[13px] font-bold tabular-nums" style={{ color: color }}>{dim.score}</span>
                          </div>
                        </div>
                        <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: pct + "%", backgroundColor: color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {scores.domainHealth.recommendations.length > 0 && (
              <div className="mt-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-lg px-5 py-4">
                <h4 className="text-[12px] font-semibold text-[#92400E] mb-2">Priority recommendations</h4>
                <div className="space-y-1.5">
                  {scores.domainHealth.recommendations.map(function(rec, i) {
                    return (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[#F59E0B] mt-0.5 shrink-0">→</span>
                        <p className="text-[12px] text-[#78350F]">{rec}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ ALERTS SECTION ═══ */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#111]">
              Alertes
              {alerts.length > 0 && <span className="text-[13px] font-normal text-[#BBB] ml-2">({alerts.length})</span>}
            </h2>
          </div>

          {/* Severity filters */}
          {alerts.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <button onClick={function() { setFilter("all"); }} className={"px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors " + (filter === "all" ? "bg-[#111] text-white border-[#111]" : "text-[#999] border-[#EAEAEA] hover:border-[#D4D4D4]")}>
                All ({alerts.length})
              </button>
              {critical > 0 && (
                <button onClick={function() { setFilter("critical"); }} className={"px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors " + (filter === "critical" ? "bg-[#EF4444] text-white border-[#EF4444]" : "text-[#EF4444] border-[#FECACA] hover:bg-red-50")}>
                  Critical ({critical})
                </button>
              )}
              {warning > 0 && (
                <button onClick={function() { setFilter("warning"); }} className={"px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors " + (filter === "warning" ? "bg-[#F59E0B] text-white border-[#F59E0B]" : "text-[#F59E0B] border-[#FDE68A] hover:bg-amber-50")}>
                  Warning ({warning})
                </button>
              )}
              {info > 0 && (
                <button onClick={function() { setFilter("info"); }} className={"px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors " + (filter === "info" ? "bg-[#6366F1] text-white border-[#6366F1]" : "text-[#6366F1] border-[#C7D2FE] hover:bg-indigo-50")}>
                  Info ({info})
                </button>
              )}
            </div>
          )}

          {/* Empty state */}
          {alerts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-[#EAEAEA]">
              <div className="h-12 w-12 rounded-lg bg-[#F0FDF4] flex items-center justify-center mx-auto mb-3">
                <Check size={24} className="text-[#22C55E]" />
              </div>
              <p className="text-[13px] font-medium text-[#111]">No active alerts</p>
              <p className="text-xs text-[#BBB] mt-1">Kairo analyzes your CRM daily. Everything looks good.</p>
            </div>
          )}

          {/* Alert cards */}
          <div className="space-y-3">
            {filtered.map(function(alert) {
              var severityIcon = alert.severity === "critical"
                ? <TrendingDown size={16} className="text-[#EF4444]" />
                : alert.severity === "warning"
                ? <AlertTriangle size={16} className="text-[#F59E0B]" />
                : <Zap size={16} className="text-[#6366F1]" />;
              var borderColor = alert.severity === "critical" ? "border-l-[#EF4444]" : alert.severity === "warning" ? "border-l-[#F59E0B]" : "border-l-[#6366F1]";

              return (
                <div key={alert.id} className={"bg-white rounded-lg border border-[#EAEAEA] border-l-[3px] " + borderColor + " overflow-hidden"}>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">{severityIcon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[13px] font-medium text-[#111]">{alert.title}</h3>
                          {alert.domain && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#F5F5F5] text-[#999] shrink-0">
                              {DOMAIN_LABELS[alert.domain] || alert.domain}
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] text-[#555] leading-relaxed">{alert.description}</p>
                        {alert.ai_suggestion && (
                          <div className="mt-3 px-3 py-2.5 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                            <p className="text-[11px] font-medium text-[#BBB] uppercase tracking-wider mb-1">Kairo recommendation</p>
                            <p className="text-[12px] text-[#555] leading-relaxed">{alert.ai_suggestion}</p>
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-3">
                          <button onClick={function() { handleInvestigate(alert); }} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium bg-[#111] text-white hover:bg-[#333] transition-colors">
                            Investigate <ChevronRight size={11} />
                          </button>
                          {createdActions.has(alert.id) ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] text-[#22C55E] font-medium">
                              <Check size={11} /> Added to board
                            </span>
                          ) : (
                            <button onClick={function() { handleCreateAction(alert); }} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] text-[#555] border border-[#EAEAEA] hover:bg-[#F5F5F5] hover:text-[#111] transition-colors">
                              <CheckSquare size={11} /> Create action
                            </button>
                          )}
                          <button onClick={function() { handleDismiss(alert.id); }} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] text-[#BBB] hover:text-[#EF4444] hover:bg-red-50 transition-colors">
                            <X size={11} /> Dismiss
                          </button>
                          <span className="text-[10px] text-[#C0C0C0] ml-auto">{timeSince(alert.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </>}
      </div>
    </div>
  );
}
