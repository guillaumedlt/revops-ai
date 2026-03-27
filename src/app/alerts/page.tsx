"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, TrendingDown, TrendingUp, Minus, Zap, ChevronRight, Check, X, Plug, ArrowUpRight, ArrowDownRight } from "lucide-react";

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
  return <Minus size={12} className="text-[#A3A3A3]" />;
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
  var seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 3600) return Math.floor(seconds / 60) + " min";
  if (seconds < 86400) return Math.floor(seconds / 3600) + "h";
  return Math.floor(seconds / 86400) + "j";
}

export default function AlertsPage() {
  var router = useRouter();
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

  function handleDismiss(id: string) {
    setAlerts(function(prev) { return prev.filter(function(a) { return a.id !== id; }); });
    fetch("/api/alerts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ alertId: id, action: "dismissed" }) }).catch(function() {});
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
        <div className="h-5 w-5 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin" />
      </div>
    );
  }

  if (hubspotConnected === false) {
    return (
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="h-14 w-14 rounded-2xl bg-[#F5F5F5] flex items-center justify-center mx-auto mb-4">
            <Plug size={28} className="text-[#A3A3A3]" />
          </div>
          <h2 className="text-lg font-semibold text-[#0A0A0A] mb-2">Connecte HubSpot pour activer les alertes</h2>
          <p className="text-sm text-[#737373] mb-6">
            Kairo analyse tes donnees CRM chaque jour et detecte automatiquement les problemes :
            deals bloques, pipeline insuffisant, win rate en baisse, donnees manquantes...
          </p>
          <button
            onClick={function() { router.push("/settings?tab=connectors"); }}
            className="bg-[#0A0A0A] text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-[#262626] transition-colors"
          >
            Connecter HubSpot
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#0A0A0A]">Command Center</h1>
          <p className="text-sm text-[#737373] mt-0.5">Sante de ton CRM, scores et alertes en temps reel.</p>
        </div>

        {/* ═══ SCORES SECTION ═══ */}
        {scores && scores.overallScore > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-12 gap-4">
              {/* Main score gauge */}
              <div className="col-span-12 md:col-span-4 bg-white rounded-xl border border-[#E5E5E5] p-6 flex flex-col items-center">
                <ScoreGauge score={scores.overallScore} />
                <div className="mt-3 text-center">
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-bold" style={{ color: getScoreColor(scores.overallScore), backgroundColor: getScoreColor(scores.overallScore) + "15" }}>
                    Grade {scores.grade}
                  </span>
                  <p className="text-[10px] text-[#A3A3A3] mt-2">Adoption Score</p>
                </div>
              </div>

              {/* Dimension breakdown */}
              <div className="col-span-12 md:col-span-8 bg-white rounded-xl border border-[#E5E5E5] p-6">
                <h3 className="text-sm font-semibold text-[#0A0A0A] mb-4">Dimensions</h3>
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
                            <span className="text-[13px] font-medium text-[#0A0A0A]">{meta.label}</span>
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
              <div className="mt-4 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl px-5 py-4">
                <h4 className="text-[12px] font-semibold text-[#92400E] mb-2">Recommandations prioritaires</h4>
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
            <h2 className="text-lg font-semibold text-[#0A0A0A]">
              Alertes
              {alerts.length > 0 && <span className="text-sm font-normal text-[#A3A3A3] ml-2">({alerts.length})</span>}
            </h2>
          </div>

          {/* Severity filters */}
          {alerts.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <button onClick={function() { setFilter("all"); }} className={"px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors " + (filter === "all" ? "bg-[#0A0A0A] text-white border-[#0A0A0A]" : "text-[#737373] border-[#E5E5E5] hover:border-[#D4D4D4]")}>
                Tout ({alerts.length})
              </button>
              {critical > 0 && (
                <button onClick={function() { setFilter("critical"); }} className={"px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors " + (filter === "critical" ? "bg-[#EF4444] text-white border-[#EF4444]" : "text-[#EF4444] border-[#FECACA] hover:bg-red-50")}>
                  Critique ({critical})
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
            <div className="text-center py-12 bg-white rounded-xl border border-[#E5E5E5]">
              <div className="h-12 w-12 rounded-2xl bg-[#F0FDF4] flex items-center justify-center mx-auto mb-3">
                <Check size={24} className="text-[#22C55E]" />
              </div>
              <p className="text-sm font-medium text-[#0A0A0A]">Aucune alerte active</p>
              <p className="text-xs text-[#A3A3A3] mt-1">Kairo analyse ton CRM chaque jour. Tout est en ordre.</p>
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
                <div key={alert.id} className={"bg-white rounded-xl border border-[#E5E5E5] border-l-[3px] " + borderColor + " overflow-hidden"}>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">{severityIcon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-medium text-[#0A0A0A]">{alert.title}</h3>
                          {alert.domain && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#F5F5F5] text-[#737373] shrink-0">
                              {DOMAIN_LABELS[alert.domain] || alert.domain}
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] text-[#525252] leading-relaxed">{alert.description}</p>
                        {alert.ai_suggestion && (
                          <div className="mt-3 px-3 py-2.5 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                            <p className="text-[11px] font-medium text-[#A3A3A3] uppercase tracking-wider mb-1">Recommandation Kairo</p>
                            <p className="text-[12px] text-[#525252] leading-relaxed">{alert.ai_suggestion}</p>
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-3">
                          <button onClick={function() { handleInvestigate(alert); }} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium bg-[#0A0A0A] text-white hover:bg-[#333] transition-colors">
                            Investiguer <ChevronRight size={11} />
                          </button>
                          <button onClick={function() { handleDismiss(alert.id); }} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] text-[#A3A3A3] hover:text-[#EF4444] hover:bg-red-50 transition-colors">
                            <X size={11} /> Ignorer
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
      </div>
    </div>
  );
}
