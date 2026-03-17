"use client";

import { useState, useEffect } from "react";
import KPICard from "@/components/ui/KPICard";
import ChartCard from "@/components/ui/ChartCard";
import StatusBadge from "@/components/ui/StatusBadge";

interface AdoptionData {
  overallScore: number;
  grade: string;
  dataDiscipline: number;
  pipelineRigor: number;
  activityLogging: number;
  processAdherence: number;
  toolUsage: number;
  dimensions?: Record<
    string,
    { score: number; status: string; trend: string }
  >;
  domainHealth?: {
    potentialRiskAreas: string[];
    recommendations: string[];
  };
}

const DOMAINS = [
  "Lead Management",
  "Pipeline",
  "Velocity",
  "Closing",
  "Revenue",
  "Activity",
  "Data Quality",
];

export default function DashboardHome() {
  const [data, setData] = useState<AdoptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/metrics/adoption-score")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setData(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-sm text-[#737373]">Chargement du score...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-700">
          Erreur lors du chargement : {error}
        </p>
        <p className="mt-1 text-xs text-red-500">
          Verifiez que HubSpot est connecte dans Settings.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-sm text-[#737373]">
        Connectez HubSpot pour voir votre score.
      </div>
    );
  }

  const scoreColor =
    data.overallScore >= 80
      ? "#22C55E"
      : data.overallScore >= 60
        ? "#F59E0B"
        : "#EF4444";

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium tracking-tight text-[#0A0A0A]">
        Score d&apos;Adoption
      </h1>

      {/* Main score */}
      <div className="flex items-center gap-6 rounded border border-[#E5E5E5] p-6">
        <div
          className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4"
          style={{ borderColor: scoreColor }}
        >
          <span className="text-3xl font-bold text-[#0A0A0A]">
            {data.overallScore}
          </span>
        </div>
        <div>
          <p className="text-lg font-medium text-[#0A0A0A]">
            Note : {data.grade}
          </p>
          <p className="text-sm text-[#737373]">
            Score global de votre adoption CRM
          </p>
        </div>
      </div>

      {/* Sub-scores */}
      <div className="grid grid-cols-5 gap-3">
        <KPICard label="Data Discipline" value={`${data.dataDiscipline}`} />
        <KPICard label="Pipeline Rigor" value={`${data.pipelineRigor}`} />
        <KPICard label="Activity Logging" value={`${data.activityLogging}`} />
        <KPICard label="Process Adherence" value={`${data.processAdherence}`} />
        <KPICard label="Tool Usage" value={`${data.toolUsage}`} />
      </div>

      {/* Risk areas + trend */}
      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="Zones de Risque">
          <div className="space-y-2">
            {data.domainHealth?.potentialRiskAreas &&
            data.domainHealth.potentialRiskAreas.length > 0 ? (
              data.domainHealth.potentialRiskAreas.map((area, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-1"
                >
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="text-sm text-[#525252]">{area}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-[#A3A3A3]">Aucune zone de risque detectee</p>
            )}
            {data.domainHealth?.recommendations &&
              data.domainHealth.recommendations.length > 0 && (
                <div className="mt-3 border-t border-[#F0F0F0] pt-3">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[#737373] mb-2">
                    Recommandations
                  </p>
                  {data.domainHealth.recommendations.map((rec, i) => (
                    <p key={i} className="text-xs text-[#525252] mb-1">
                      {rec}
                    </p>
                  ))}
                </div>
              )}
          </div>
        </ChartCard>

        <ChartCard title="Tendance 12 Semaines">
          <div className="flex h-[200px] items-center justify-center">
            <span className="text-sm text-[#A3A3A3]">
              Disponible apres 12 semaines de donnees
            </span>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
