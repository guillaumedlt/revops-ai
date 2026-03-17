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

export default function DataQualityPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/metrics/data-quality")
      .then((r) => r.json())
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-sm text-muted-foreground">Chargement...</div>;
  if (!data) return <div className="text-sm text-muted-foreground">Aucune donnee disponible</div>;

  const overallScore = data.overallScore ?? 0;
  const grade = data.grade ?? "N/A";
  const missingFields = data.missingFields ?? {};
  const duplicates = data.duplicates ?? {};
  const staleness = data.staleness ?? {};

  const fieldData: { name: string; rate: number }[] =
    (missingFields.metadata?.fields ?? []).map((f: any) => ({
      name: f.field ?? "N/A",
      rate: Math.round((f.rate ?? 0) * 10) / 10,
    }));

  const noAmountCount = missingFields.metadata?.noAmount ?? staleness.metadata?.noAmount ?? 0;
  const noAmountTotal = missingFields.metadata?.total ?? staleness.metadata?.total ?? 0;
  const noAmountPct = noAmountTotal > 0 ? Math.round((noAmountCount / noAmountTotal) * 100) : 0;

  const overdueCount = staleness.metadata?.overdue ?? 0;
  const overdueTotal = staleness.metadata?.total ?? 0;
  const overduePct = overdueTotal > 0 ? Math.round((overdueCount / overdueTotal) * 100) : 0;

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-medium text-foreground tracking-tight">Data Quality</h1>

      <div className="grid grid-cols-4 gap-3">
        <KPICard
          label="Score Qualite"
          value={`${overallScore}% (${grade})`}
          status={overallScore >= 75 ? "good" : overallScore >= 50 ? "warning" : "critical"}
        />
        <KPICard
          label="Pipeline Hygiene"
          value={missingFields.displayValue ?? "N/A"}
          trend={missingFields.trend}
          trendDirection={missingFields.trendDirection}
          status={missingFields.status}
        />
        <KPICard
          label="Doublons"
          value={duplicates.displayValue ?? "0"}
          status={duplicates.status}
        />
        <KPICard
          label="Completude Deals Fermes"
          value={staleness.displayValue ?? "N/A"}
          trend={staleness.trend}
          trendDirection={staleness.trendDirection}
          status={staleness.status}
        />
      </div>

      <ChartCard title="Completude des Champs">
        {fieldData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fieldData} layout="vertical">
              <CartesianGrid stroke="#F0F0F0" strokeDasharray="0" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#737373" }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#737373" }} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rate" fill="#0A0A0A" radius={[0, 3, 3, 0]} name="Remplissage (%)" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">Aucune donnee</div>
        )}
      </ChartCard>

      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="Deals sans Montant">
          <div className="flex flex-col items-center justify-center h-[150px]">
            <div className="text-2xl font-semibold font-mono tabular-nums text-foreground">
              {noAmountCount}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {noAmountPct}% des deals ouverts
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Deals Perimes">
          <div className="flex flex-col items-center justify-center h-[150px]">
            <div className="text-2xl font-semibold font-mono tabular-nums text-foreground">
              {overdueCount}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {overduePct}% des deals ouverts
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
