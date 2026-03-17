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

export default function ActivityPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/metrics/activity")
      .then((r) => r.json())
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-sm text-muted-foreground">Chargement...</div>;
  if (!data) return <div className="text-sm text-muted-foreground">Aucune donnee disponible</div>;

  const activityVolume = data.activityVolume ?? {};
  const unworkedDeals = data.unworkedDeals ?? {};
  const contactEngagementRate = data.contactEngagementRate ?? {};

  const ownerData: { name: string; count: number }[] =
    (activityVolume.metadata?.byOwner ?? []).map((o: any) => ({
      name: o.ownerId ?? "N/A",
      count: o.count ?? 0,
    }));

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-medium text-foreground tracking-tight">Activite & Engagement</h1>

      <div className="grid grid-cols-3 gap-3">
        <KPICard
          label="Taux d'Engagement"
          value={contactEngagementRate.displayValue ?? "0%"}
          trend={contactEngagementRate.trend}
          trendDirection={contactEngagementRate.trendDirection}
          status={contactEngagementRate.status}
        />
        <KPICard
          label="Deals sans Activite"
          value={unworkedDeals.displayValue ?? "0%"}
          trend={unworkedDeals.trend}
          trendDirection={unworkedDeals.trendDirection}
          status={unworkedDeals.status}
        />
        <KPICard
          label="Volume Total"
          value={activityVolume.displayValue ?? "0"}
          status={activityVolume.status}
        />
      </div>

      <ChartCard title="Volume par Owner">
        {ownerData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ownerData}>
              <CartesianGrid stroke="#F0F0F0" strokeDasharray="0" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#737373" }} />
              <YAxis tick={{ fontSize: 10, fill: "#737373" }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#0A0A0A" radius={[3, 3, 0, 0]} name="Activites" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">Aucune donnee</div>
        )}
      </ChartCard>
    </div>
  );
}
