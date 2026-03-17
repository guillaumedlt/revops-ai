"use client";

import { useState, useEffect } from "react";
import KPICard from "@/components/ui/KPICard";
import ChartCard from "@/components/ui/ChartCard";
import DataTable from "@/components/ui/DataTable";
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

export default function RevenuePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/metrics/revenue")
      .then((r) => r.json())
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-sm text-muted-foreground">Chargement...</div>;
  if (!data) return <div className="text-sm text-muted-foreground">Aucune donnee disponible</div>;

  const totalRevenue = data.totalRevenue ?? {};
  const byOwner = data.byOwner ?? {};
  const byAccount = data.byAccount ?? {};
  const forecast = data.forecast ?? {};

  const ownerData: { name: string; revenue: number }[] =
    (byOwner.metadata?.byOwner ?? []).map((o: any) => ({
      name: o.ownerId ?? "N/A",
      revenue: o.revenue ?? 0,
    }));

  const topAccounts: Record<string, unknown>[] =
    (byAccount.metadata?.top20 ?? []).map((a: any) => ({
      name: a.name ?? a.companyId ?? "N/A",
      revenue: new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(a.revenue ?? 0),
      deals: a.dealCount ?? 0,
    }));

  const acvData: { month: string; avg: number }[] =
    (forecast.metadata?.monthly ?? totalRevenue.metadata?.monthly ?? []).map((m: any) => ({
      month: m.month ?? "",
      avg: Math.round(m.avg ?? m.total ?? 0),
    }));

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-medium text-foreground tracking-tight">Revenue</h1>

      <div className="grid grid-cols-4 gap-3">
        <KPICard
          label="Revenue Won"
          value={totalRevenue.displayValue ?? "0 EUR"}
          trend={totalRevenue.trend}
          trendDirection={totalRevenue.trendDirection}
          status={totalRevenue.status}
        />
        <KPICard
          label="ACV Moyen"
          value={byOwner.displayValue ?? "0 EUR"}
        />
        <KPICard
          label="Forecast"
          value={forecast.displayValue ?? "0 EUR"}
          status={forecast.status}
        />
        <KPICard
          label="Concentration"
          value={byAccount.displayValue ?? "N/A"}
        />
      </div>

      <ChartCard title="Revenue par Owner">
        {ownerData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ownerData}>
              <CartesianGrid stroke="#F0F0F0" strokeDasharray="0" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#737373" }} />
              <YAxis tick={{ fontSize: 10, fill: "#737373" }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" fill="#0A0A0A" radius={[3, 3, 0, 0]} name="Revenue (EUR)" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">Aucune donnee</div>
        )}
      </ChartCard>

      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="Top Comptes">
          <DataTable
            columns={[
              { key: "name", header: "Compte" },
              { key: "revenue", header: "Revenue", align: "right", mono: true },
              { key: "deals", header: "Deals", align: "right", mono: true },
            ]}
            data={topAccounts}
            emptyMessage="Aucun compte"
          />
        </ChartCard>

        <ChartCard title="ACV Trend">
          {acvData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={acvData}>
                <CartesianGrid stroke="#F0F0F0" strokeDasharray="0" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#737373" }} />
                <YAxis tick={{ fontSize: 10, fill: "#737373" }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="avg"
                  stroke="#0A0A0A"
                  strokeWidth={1.5}
                  dot={false}
                  name="ACV (EUR)"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-sm text-muted-foreground">Aucune donnee</div>
          )}
        </ChartCard>
      </div>
    </div>
  );
}
