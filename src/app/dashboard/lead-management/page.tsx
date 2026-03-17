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
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface LeadData {
  leadVolume?: { value: number; displayValue: string; trend: number | null; trendDirection: string };
  leadToDealRate?: { value: number; displayValue: string; status: string };
  speedToLead?: { value: number; displayValue: string; status: string };
  unworkedLeads?: { value: number; displayValue: string; status: string };
  sourceDistribution?: { metadata: { bySource: Array<{ source: string; count: number }> } };
  leadAging?: { metadata: { buckets: Array<{ label: string; count: number }> } };
}

const COLORS = ["#0A0A0A", "#525252", "#737373", "#A3A3A3", "#D4D4D4", "#E5E5E5"];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color?: string }>; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md bg-[#0A0A0A] px-3 py-2 text-xs text-white">
      <p className="font-medium">{label}</p>
      {payload.map((p, i) => (
        <p key={i}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export default function LeadManagementPage() {
  const [data, setData] = useState<LeadData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/metrics/lead-management")
      .then((r) => r.json())
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-sm text-[#737373]">Chargement...</div>;
  if (!data) return <div className="text-sm text-[#737373]">Aucune donnee disponible</div>;

  const sources = data.sourceDistribution?.metadata?.bySource ?? [];
  const agingBuckets = data.leadAging?.metadata?.buckets ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-medium tracking-tight text-[#0A0A0A]">Lead Management</h1>

      <div className="grid grid-cols-4 gap-3">
        <KPICard
          label="Volume Leads"
          value={data.leadVolume?.displayValue ?? "0"}
          trend={data.leadVolume?.trend}
          trendDirection={data.leadVolume?.trendDirection as "up" | "down" | "flat" | undefined}
        />
        <KPICard
          label="Conversion L-to-D"
          value={data.leadToDealRate?.displayValue ?? "0%"}
          status={data.leadToDealRate?.status as "good" | "warning" | "critical" | undefined}
        />
        <KPICard
          label="Speed to Lead"
          value={data.speedToLead?.displayValue ?? "-"}
          status={data.speedToLead?.status as "good" | "warning" | "critical" | undefined}
        />
        <KPICard
          label="Leads Non Travailles"
          value={data.unworkedLeads?.displayValue ?? "0%"}
          status={data.unworkedLeads?.status as "good" | "warning" | "critical" | undefined}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <ChartCard title="Sources">
          {sources.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={sources}
                  dataKey="count"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  strokeWidth={1}
                  stroke="#FFFFFF"
                >
                  {sources.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[280px] items-center justify-center text-sm text-[#A3A3A3]">
              Pas de donnees sources
            </div>
          )}
        </ChartCard>

        <ChartCard title="Lead Aging">
          {agingBuckets.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={agingBuckets}>
                <CartesianGrid stroke="#F0F0F0" strokeDasharray="0" horizontal vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#737373" }} axisLine={{ stroke: "#E5E5E5" }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#737373" }} axisLine={{ stroke: "#E5E5E5" }} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#0A0A0A" radius={[3, 3, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-[280px] items-center justify-center text-sm text-[#A3A3A3]">
              Pas de donnees aging
            </div>
          )}
        </ChartCard>
      </div>
    </div>
  );
}
