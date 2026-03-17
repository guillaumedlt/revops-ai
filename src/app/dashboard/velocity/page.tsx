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

export default function VelocityPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/metrics/velocity")
      .then((r) => r.json())
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-sm text-muted-foreground">Chargement...</div>;
  if (!data) return <div className="text-sm text-muted-foreground">Aucune donnee disponible</div>;

  const overallSalesCycle = data.overallSalesCycle ?? {};
  const byStage = data.byStage ?? {};
  const bottlenecks = data.bottlenecks ?? {};
  const timeDistribution = data.timeDistribution ?? {};

  const bottleneckName = bottlenecks.metadata?.bottleneck?.stageLabel ?? "N/A";

  const timePerStageData: { name: string; days: number }[] =
    (byStage.metadata?.perStage ?? []).map((s: any) => ({
      name: s.stageLabel ?? s.stageId ?? "N/A",
      days: Math.round((s.avgDays ?? 0) * 10) / 10,
    }));

  const ownerCycleData: { name: string; days: number }[] =
    (overallSalesCycle.metadata?.byOwner ?? []).map((o: any) => ({
      name: o.ownerId ?? "N/A",
      days: Math.round((o.median ?? 0) * 10) / 10,
    }));

  const conversionData: { name: string; rate: number }[] =
    (timeDistribution.metadata?.transitions ?? []).map((t: any) => ({
      name: `${t.fromLabel ?? ""} > ${t.toLabel ?? ""}`,
      rate: Math.round((t.rate ?? 0) * 10) / 10,
    }));

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-medium text-foreground tracking-tight">Velocity</h1>

      <div className="grid grid-cols-3 gap-3">
        <KPICard
          label="Cycle de Vente"
          value={overallSalesCycle.displayValue ?? "0 jours"}
          trend={overallSalesCycle.trend}
          trendDirection={overallSalesCycle.trendDirection}
          status={overallSalesCycle.status}
        />
        <KPICard
          label="Sales Velocity Index"
          value={byStage.displayValue ?? "0 EUR"}
          trend={byStage.trend}
          trendDirection={byStage.trendDirection}
          status={byStage.status}
        />
        <KPICard
          label="Goulot d'etranglement"
          value={bottleneckName}
          status={bottlenecks.status}
        />
      </div>

      <ChartCard title="Duree par Stage">
        {timePerStageData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timePerStageData} layout="vertical">
              <CartesianGrid stroke="#F0F0F0" strokeDasharray="0" />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#737373" }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#737373" }} width={120} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="days" fill="#0A0A0A" radius={[0, 3, 3, 0]} name="Jours" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">Aucune donnee</div>
        )}
      </ChartCard>

      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="Cycle par Owner">
          {ownerCycleData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ownerCycleData}>
                <CartesianGrid stroke="#F0F0F0" strokeDasharray="0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#737373" }} />
                <YAxis tick={{ fontSize: 10, fill: "#737373" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="days" fill="#0A0A0A" radius={[3, 3, 0, 0]} name="Jours" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-sm text-muted-foreground">Aucune donnee</div>
          )}
        </ChartCard>

        <ChartCard title="Conversion Stage-to-Stage">
          {conversionData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={conversionData}>
                <CartesianGrid stroke="#F0F0F0" strokeDasharray="0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#737373" }} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 10, fill: "#737373" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="rate" fill="#737373" radius={[3, 3, 0, 0]} name="Taux (%)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-sm text-muted-foreground">Aucune donnee</div>
          )}
        </ChartCard>
      </div>
    </div>
  );
}
