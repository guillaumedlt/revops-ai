"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Users, MessageSquare, LayoutDashboard, Zap, Bell, CheckSquare, CreditCard, Link2, TrendingUp, Shield } from "lucide-react";

interface Stats {
  overview: {
    totalUsers: number; totalTenants: number; totalConversations: number;
    totalMessages: number; messages7d: number; messages30d: number;
    totalActions: number; activeAlerts: number; hubspotConnections: number; notionConnections: number;
  };
  credits: { totalAllocated: number; totalUsed: number; usagePercent: number };
  plans: Record<string, number>;
  topTenants: Array<{ id: string; name: string; plan: string; messages30d: number; created: string }>;
  recentSignups: Array<{ email: string; created: string }>;
  recentConversations: Array<{ title: string; tenantId: string; created: string }>;
  signupsByDay: Record<string, number>;
}

function StatCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-lg border border-[#EAEAEA] p-4">
      <div className="flex items-center justify-between mb-2">
        <Icon size={15} className="text-[#BBB]" />
        <span className="text-xl font-bold text-[#111] tabular-nums">{value}</span>
      </div>
      <p className="text-[11px] text-[#999] font-medium">{label}</p>
      {sub && <p className="text-[10px] text-[#CCC] mt-0.5">{sub}</p>}
    </div>
  );
}

function timeSince(date: string): string {
  var ms = Date.now() - new Date(date).getTime();
  if (isNaN(ms) || ms < 0) return "";
  var h = Math.floor(ms / 3600000);
  if (h < 1) return Math.max(1, Math.floor(ms / 60000)) + "m ago";
  if (h < 24) return h + "h ago";
  return Math.floor(h / 24) + "d ago";
}

export default function AdminPage() {
  var [stats, setStats] = useState<Stats | null>(null);
  var [loading, setLoading] = useState(true);
  var [forbidden, setForbidden] = useState(false);
  var router = useRouter();

  useEffect(function() {
    fetch("/api/admin/stats").then(function(r) {
      if (r.status === 403) { setForbidden(true); setLoading(false); return; }
      return r.json();
    }).then(function(json) {
      if (json?.data) setStats(json.data);
    }).catch(function() {}).finally(function() { setLoading(false); });
  }, []);

  if (loading) return <div className="flex-1 flex items-center justify-center"><div className="h-5 w-5 border-2 border-[#EAEAEA] border-t-[#111] rounded-full animate-spin" /></div>;
  if (forbidden) return <div className="flex-1 flex items-center justify-center"><div className="text-center"><Shield size={32} className="text-[#EF4444] mx-auto mb-3" /><p className="text-[15px] font-semibold text-[#111]">Access denied</p><p className="text-[13px] text-[#999] mt-1">Admin panel is restricted.</p></div></div>;
  if (!stats) return null;

  var o = stats.overview;
  var c = stats.credits;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-[#111]">Admin Panel</h1>
        <p className="text-[13px] text-[#999] mt-0.5">Kairo platform statistics</p>
      </div>

      {/* Overview KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        <StatCard icon={Users} label="Users" value={o.totalUsers} />
        <StatCard icon={LayoutDashboard} label="Tenants" value={o.totalTenants} />
        <StatCard icon={MessageSquare} label="Messages (30d)" value={o.messages30d} sub={o.messages7d + " last 7d"} />
        <StatCard icon={MessageSquare} label="Conversations" value={o.totalConversations} />
        <StatCard icon={CheckSquare} label="Actions" value={o.totalActions} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        <StatCard icon={Bell} label="Active alerts" value={o.activeAlerts} />
        <StatCard icon={Link2} label="HubSpot" value={o.hubspotConnections} sub="connections" />
        <StatCard icon={Link2} label="Notion" value={o.notionConnections} sub="connections" />
        <StatCard icon={CreditCard} label="Credits used" value={c.totalUsed.toLocaleString()} sub={c.usagePercent + "% of " + c.totalAllocated.toLocaleString()} />
        <StatCard icon={TrendingUp} label="Total messages" value={o.totalMessages.toLocaleString()} />
      </div>

      {/* Plans distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="rounded-lg border border-[#EAEAEA] p-5">
          <h3 className="text-[13px] font-semibold text-[#111] mb-4">Plan distribution</h3>
          <div className="space-y-3">
            {[
              { plan: "Free", count: stats.plans.free || 0, color: "#999" },
              { plan: "Pro", count: stats.plans.pro || 0, color: "#6366F1" },
              { plan: "Business", count: stats.plans.business || 0, color: "#111" },
            ].map(function(p) {
              var total = o.totalTenants || 1;
              var pct = Math.round((p.count / total) * 100);
              return (
                <div key={p.plan}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] text-[#555]">{p.plan}</span>
                    <span className="text-[12px] font-semibold text-[#111]">{p.count} <span className="text-[#CCC] font-normal">({pct}%)</span></span>
                  </div>
                  <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: pct + "%", backgroundColor: p.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Credit usage */}
        <div className="rounded-lg border border-[#EAEAEA] p-5">
          <h3 className="text-[13px] font-semibold text-[#111] mb-4">Credit usage</h3>
          <div className="text-center mb-4">
            <span className="text-3xl font-bold text-[#111]">{c.usagePercent}%</span>
            <p className="text-[11px] text-[#999] mt-1">{c.totalUsed.toLocaleString()} / {c.totalAllocated.toLocaleString()} credits</p>
          </div>
          <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-[#111]" style={{ width: c.usagePercent + "%" }} />
          </div>
        </div>

        {/* Recent signups */}
        <div className="rounded-lg border border-[#EAEAEA] p-5">
          <h3 className="text-[13px] font-semibold text-[#111] mb-3">Recent signups</h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {stats.recentSignups.length === 0 && <p className="text-[11px] text-[#CCC]">No signups yet</p>}
            {stats.recentSignups.map(function(u, i) {
              return (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[12px] text-[#111] truncate max-w-[180px]">{u.email}</span>
                  <span className="text-[10px] text-[#CCC] shrink-0">{timeSince(u.created)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top tenants */}
      <div className="rounded-lg border border-[#EAEAEA] overflow-hidden mb-8">
        <div className="px-4 py-3 bg-[#FAFAFA] border-b border-[#EAEAEA]">
          <h3 className="text-[13px] font-semibold text-[#111]">Top tenants (last 30 days)</h3>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[#EAEAEA] bg-[#FAFAFA]/50">
              <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-[#999] px-4 py-2">Tenant</th>
              <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-[#999] px-4 py-2">Plan</th>
              <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-[#999] px-4 py-2">Messages</th>
              <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-[#999] px-4 py-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {stats.topTenants.map(function(t) {
              return (
                <tr key={t.id} className="border-b border-[#F5F5F5] last:border-0 hover:bg-[#FAFAFA]">
                  <td className="px-4 py-2.5 font-medium text-[#111]">{t.name}</td>
                  <td className="px-4 py-2.5">
                    <span className={"text-[10px] font-medium px-1.5 py-0.5 rounded " + (t.plan === "business" ? "bg-[#111] text-white" : t.plan === "pro" ? "bg-[#EEF2FF] text-[#6366F1]" : "bg-[#F5F5F5] text-[#999]")}>
                      {t.plan}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-[#111] font-semibold">{t.messages30d}</td>
                  <td className="px-4 py-2.5 text-right text-[#999]">{timeSince(t.created)}</td>
                </tr>
              );
            })}
            {stats.topTenants.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-[#CCC] text-[12px]">No data yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Recent conversations */}
      <div className="rounded-lg border border-[#EAEAEA] overflow-hidden">
        <div className="px-4 py-3 bg-[#FAFAFA] border-b border-[#EAEAEA]">
          <h3 className="text-[13px] font-semibold text-[#111]">Recent conversations (last 7 days)</h3>
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {stats.recentConversations.length === 0 && <p className="px-4 py-6 text-center text-[#CCC] text-[12px]">No conversations yet</p>}
          {stats.recentConversations.map(function(c, i) {
            return (
              <div key={i} className="flex items-center justify-between px-4 py-2.5 border-b border-[#F5F5F5] last:border-0 hover:bg-[#FAFAFA]">
                <span className="text-[12px] text-[#111] truncate max-w-[300px]">{c.title || "Untitled"}</span>
                <span className="text-[10px] text-[#CCC] shrink-0">{timeSince(c.created)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
