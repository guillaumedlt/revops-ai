"use client";

import { useState, useEffect } from "react";
import KPICard from "@/components/ui/KPICard";
import ChartCard from "@/components/ui/ChartCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md bg-[#0A0A0A] px-3 py-2 text-xs text-white">
      <p className="font-medium">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export default function PipelinePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/metrics/pipeline")
      .then((r) => r.json())
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-sm text-muted-foreground">Chargement...</div>;
  if (!data) return <div className="text-sm text-muted-foreground">Aucune donnee disponible</div>;

  const pipelineValue = data.pipelineValue ?? {};
  const weightedPipeline = data.weightedPipeline ?? {};
  const pipelineCoverage = data.pipelineCoverage ?? {};
  const averageDealSize = data.averageDealSize ?? {};
  const pipelineByStage = data.pipelineByStage ?? {};
  const pipelineByOwner = data.pipelineByOwner ?? {};
  const stalledDeals = data.stalledDeals ?? {};

  const stageData: { name: string; value: number }[] =
    (pipelineByStage.metadata?.stages ?? []).map((s: any) => ({
      name: s.stage ?? "N/A",
      value: s.value ?? 0,
    }));

  const ownerData: { name: string; value: number }[] =
    (pipelineByOwner.metadata?.byOwner ?? []).map((o: any) => ({
      name: o.ownerId ?? "N/A",
      value: o.value ?? 0,
    }));

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-medium text-foreground tracking-tight">Pipeline</h1>

      <div className="grid grid-cols-4 gap-3">
        <KPICard
          label="Pipeline Total"
          value={pipelineValue.displayValue ?? "0 EUR"}
          trend={pipelineValue.trend}
          trendDirection={pipelineValue.trendDirection}
          status={pipelineValue.status}
        />
        <KPICard
          label="Pipeline Pondere"
          value={weightedPipeline.displayValue ?? "0 EUR"}
          trend={weightedPipeline.trend}
          trendDirection={weightedPipeline.trendDirection}
          status={weightedPipeline.status}
        />
        <KPICard
          label="Couverture Pipeline"
          value={pipelineCoverage.displayValue ?? "0x"}
          status={pipelineCoverage.status}
        />
        <KPICard
          label="Taille Moyenne Deal"
          value={averageDealSize.displayValue ?? "0 EUR"}
          trend={averageDealSize.trend}
          trendDirection={averageDealSize.trendDirection}
          status={averageDealSize.status}
        />
      </div>

      <ChartCard title="Pipeline par Stage">
        {stageData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stageData} layout="vertical">
              <CartesianGrid stroke="#F0F0F0" strokeDasharray="0" />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#737373" }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#737373" }} width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#0A0A0A" radius={[0, 3, 3, 0]} name="Valeur (EUR)" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">Aucune donnee</div>
        )}
      </ChartCard>

      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="Pipeline par Owner">
          {ownerData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ownerData}>
                <CartesianGrid stroke="#F0F0F0" strokeDasharray="0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#737373" }} />
                <YAxis tick={{ fontSize: 10, fill: "#737373" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#0A0A0A" radius={[3, 3, 0, 0]} name="Valeur (EUR)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-sm text-muted-foreground">Aucune donnee</div>
          )}
        </ChartCard>

        <ChartCard title="Deals Stalled">
          <div className="flex flex-col items-center justify-center h-[250px]">
            <div className="text-2xl font-semibold font-mono tabular-nums text-foreground">
              {stalledDeals.metadata?.stalled ?? 0}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              deals en stagnation ({stalledDeals.displayValue ?? "0%"})
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
