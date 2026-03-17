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
  domainHealth?: Array<{ domain: string; status: "good" | "warning" | "critical" }>;
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

  useEffect(() => {
    fetch("/api/metrics/adoption-score")
      .then((r) => r.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-sm text-[#737373]">Chargement...</div>;
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

      {/* Domain health + trend placeholder */}
      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="Sante par Domaine">
          <div className="space-y-2">
            {(data.domainHealth ?? DOMAINS.map((d) => ({ domain: d, status: "good" as const }))).map(
              (item) => (
                <div
                  key={item.domain}
                  className="flex items-center justify-between py-1"
                >
                  <span className="text-sm text-[#525252]">{item.domain}</span>
                  <StatusBadge status={item.status} label={item.status} />
                </div>
              )
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
