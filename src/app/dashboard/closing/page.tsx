"use client";

import { useState, useEffect } from "react";
import KPICard from "@/components/ui/KPICard";
import ChartCard from "@/components/ui/ChartCard";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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

export default function ClosingPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/metrics/closing")
      .then((r) => r.json())
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-sm text-muted-foreground">Chargement...</div>;
  if (!data) return <div className="text-sm text-muted-foreground">Aucune donnee disponible</div>;

  const winRate = data.winRate ?? {};
  const competitiveWinRate = data.competitiveWinRate ?? {};
  const revenueLost = data.revenueLost ?? {};
  const dealSizeWonVsLost = data.dealSizeWonVsLost ?? {};
  const winLossTrend = data.winLossTrend ?? {};
  const winRateByOwner = data.winRateByOwner ?? {};
  const lostReasons = data.lostReasons ?? {};

  const trendData: { month: string; rate: number }[] =
    (winLossTrend.metadata?.monthly ?? []).map((m: any) => ({
      month: m.month ?? "",
      rate: Math.round((m.rate ?? 0) * 10) / 10,
    }));

  const ownerData: { name: string; rate: number }[] =
    (winRateByOwner.metadata?.byOwner ?? []).map((o: any) => ({
      name: o.ownerId ?? "N/A",
      rate: Math.round((o.rate ?? 0) * 10) / 10,
    }));

  const reasonsData: { name: string; count: number }[] =
    (lostReasons.metadata?.reasons ?? []).map((r: any) => ({
      name: r.reason ?? "N/A",
      count: r.count ?? 0,
    }));

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-medium text-foreground tracking-tight">Closing & Win Rate</h1>

      <div className="grid grid-cols-4 gap-3">
        <KPICard
          label="Win Rate"
          value={winRate.displayValue ?? "0%"}
          trend={winRate.trend}
          trendDirection={winRate.trendDirection}
          status={winRate.status}
        />
        <KPICard
          label="Win Rate Competitif"
          value={competitiveWinRate.displayValue ?? "0%"}
          trend={competitiveWinRate.trend}
          trendDirection={competitiveWinRate.trendDirection}
          status={competitiveWinRate.status}
        />
        <KPICard
          label="Revenue Perdu"
          value={revenueLost.displayValue ?? "0 EUR"}
          trend={revenueLost.trend}
          trendDirection={revenueLost.trendDirection}
        />
        <KPICard
          label="Taille Won vs Lost"
          value={dealSizeWonVsLost.displayValue ?? "N/A"}
        />
      </div>

      <ChartCard title="Win Rate Trend">
        {trendData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid stroke="#F0F0F0" strokeDasharray="0" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#737373" }} />
              <YAxis tick={{ fontSize: 10, fill: "#737373" }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#0A0A0A"
                strokeWidth={1.5}
                dot={false}
                name="Win Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">Aucune donnee</div>
        )}
      </ChartCard>

      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="Win Rate par Owner">
          {ownerData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ownerData}>
                <CartesianGrid stroke="#F0F0F0" strokeDasharray="0" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#737373" }} />
                <YAxis tick={{ fontSize: 10, fill: "#737373" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="rate" fill="#0A0A0A" radius={[3, 3, 0, 0]} name="Win Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-sm text-muted-foreground">Aucune donnee</div>
          )}
        </ChartCard>

        <ChartCard title="Raisons de Perte">
          {reasonsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={reasonsData} layout="vertical">
                <CartesianGrid stroke="#F0F0F0" strokeDasharray="0" />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#737373" }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: "#737373" }} width={140} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#737373" radius={[0, 3, 3, 0]} name="Deals perdus" />
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
