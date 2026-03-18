"use client";

import { useState, useEffect } from "react";
import { Search, RefreshCw, Globe, Users, DollarSign, MapPin, TrendingUp, Target, Zap } from "lucide-react";

var FREE_PROVIDERS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com", "aol.com", "mail.com", "protonmail.com", "gmx.com"];

function extractDomain(input: string): string | null {
  var t = input.trim().toLowerCase();
  if (!t) return null;
  if (t.includes("@")) {
    var d = t.split("@")[1];
    return FREE_PROVIDERS.includes(d) ? null : d;
  }
  return t.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] || null;
}

function fmt(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return Math.round(n / 1000) + "K";
  return String(n);
}

export default function IcpPage() {
  var [input, setInput] = useState("");
  var [loading, setLoading] = useState(false);
  var [initLoad, setInitLoad] = useState(true);
  var [error, setError] = useState<string | null>(null);
  var [data, setData] = useState<any>(null);
  var [step, setStep] = useState<"input" | "loading" | "result">("input");

  useEffect(function() {
    fetch("/api/icp").then(function(r) { return r.json(); }).then(function(j) {
      if (j.data && j.data.icp) { setData(j.data); setStep("result"); }
      setInitLoad(false);
    }).catch(function() { setInitLoad(false); });
  }, []);

  function handleSubmit() {
    var domain = extractDomain(input);
    if (!domain) { setError("Enter a company website or professional email"); return; }
    setError(null); setLoading(true); setStep("loading");

    fetch("/api/icp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ domain: domain }) })
      .then(function(r) { return r.json().then(function(j) { return { ok: r.ok, body: j }; }); })
      .then(function(r) {
        if (!r.ok) { setError(r.body.error || "Failed"); setStep("input"); }
        else if (r.body.data) { setData(r.body.data); setStep("result"); }
        setLoading(false);
      })
      .catch(function() { setError("Network error"); setStep("input"); setLoading(false); });
  }

  if (initLoad) return <div className="flex-1 flex items-center justify-center"><div className="h-8 w-8 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin" /></div>;

  if (step === "input") {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="h-14 w-14 rounded-2xl bg-[#0A0A0A] flex items-center justify-center mx-auto mb-5">
            <Target size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0A0A0A] mb-2">Build your ICP</h1>
          <p className="text-sm text-[#737373] mb-8">Enter your company website or email to generate your Ideal Customer Profile from your CRM data</p>
          <div className="relative mb-4">
            <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
            <input type="text" value={input} onChange={function(e) { setInput(e.target.value); setError(null); }} onKeyDown={function(e) { if (e.key === "Enter") handleSubmit(); }}
              placeholder="yourcompany.com or you@company.com"
              className="w-full h-12 pl-11 pr-4 text-sm rounded-xl border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent" autoFocus />
          </div>
          {error && <p className="text-sm text-[#EF4444] mb-4">{error}</p>}
          <button onClick={handleSubmit} disabled={loading || !input.trim()}
            className="w-full h-11 rounded-xl bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#333] disabled:opacity-40 transition-colors flex items-center justify-center gap-2">
            <Search size={16} /> Generate ICP
          </button>
          <p className="text-[11px] text-[#A3A3A3] mt-4">We analyze your won deals in HubSpot to find your ideal customer pattern</p>
        </div>
      </div>
    );
  }

  if (step === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="h-12 w-12 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Building your ICP...</h2>
          <div className="space-y-1.5 text-sm text-[#737373]">
            <p>Looking up your company</p>
            <p>Analyzing won deals</p>
            <p>Matching company profiles</p>
            <p>Computing patterns</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.icp) return null;
  var icp = data.icp;
  var co = data.company;
  var clients = data.clients || [];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0A0A0A]">Ideal Customer Profile</h1>
            <p className="text-sm text-[#737373] mt-1">{icp.basedOn.wonDeals + " won deals analyzed, " + icp.basedOn.companiesMatched + " companies matched"}</p>
          </div>
          <button onClick={function() { setStep("input"); setInput(""); }}
            className="flex items-center gap-2 px-4 h-9 rounded-lg border border-[#E5E5E5] text-sm text-[#525252] hover:bg-[#F5F5F5] transition-colors">
            <RefreshCw size={14} /> Regenerate
          </button>
        </div>

        {co && (
          <div className="bg-[#0A0A0A] rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-5">
              {co.favicon && <img src={co.favicon} alt="" className="h-10 w-10 rounded-xl bg-white p-1" />}
              <div>
                <h2 className="text-lg font-semibold text-white">{co.name}</h2>
                {co.domain && <p className="text-sm text-white/40">{co.domain}</p>}
              </div>
            </div>
            {co.description && <p className="text-sm text-white/60 mb-4">{co.description}</p>}
            <div className="grid grid-cols-4 gap-4">
              {co.industry && <div><p className="text-[10px] text-white/30 uppercase tracking-wide">Industry</p><p className="text-sm font-medium text-white mt-0.5">{co.industry}</p></div>}
              {co.employees && <div><p className="text-[10px] text-white/30 uppercase tracking-wide">Employees</p><p className="text-sm font-medium text-white mt-0.5">{fmt(co.employees)}</p></div>}
              {co.revenue && <div><p className="text-[10px] text-white/30 uppercase tracking-wide">Revenue</p><p className="text-sm font-medium text-white mt-0.5">{fmt(co.revenue)} EUR</p></div>}
              {co.country && <div><p className="text-[10px] text-white/30 uppercase tracking-wide">Location</p><p className="text-sm font-medium text-white mt-0.5">{[co.city, co.country].filter(Boolean).join(", ")}</p></div>}
            </div>
          </div>
        )}

        {clients.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 mb-6">
            <h3 className="text-sm font-semibold text-[#0A0A0A] mb-4">Top Clients (from won deals)</h3>
            <div className="grid grid-cols-4 gap-3">
              {clients.map(function(c: any) {
                return (
                  <div key={c.name} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAFAFA] border border-[#F0F0F0]">
                    {c.favicon && <img src={c.favicon} alt="" className="h-5 w-5 rounded" />}
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#0A0A0A] truncate">{c.name}</p>
                      <p className="text-[10px] text-[#A3A3A3] truncate">{c.industry || c.domain}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center"><Zap size={16} className="text-[#525252]" /></div>
              <div><h3 className="text-sm font-semibold text-[#0A0A0A]">Industry</h3><p className="text-[10px] text-[#A3A3A3]">Weight: {icp.weights.industry}%</p></div>
            </div>
            <div className="space-y-2.5">
              {(icp.criteria.industries || []).slice(0, 5).map(function(ind: any) {
                return (
                  <div key={ind.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-[#0A0A0A]">{ind.name}</span>
                      <span className="text-xs text-[#737373]">{ind.percent}%</span>
                    </div>
                    <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0A0A0A] rounded-full" style={{ width: ind.percent + "%" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center"><Users size={16} className="text-[#525252]" /></div>
              <div><h3 className="text-sm font-semibold text-[#0A0A0A]">Company Size</h3><p className="text-[10px] text-[#A3A3A3]">Weight: {icp.weights.companySize}%</p></div>
            </div>
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-[#0A0A0A]">{fmt(icp.criteria.employeeRange.median)}</p>
              <p className="text-xs text-[#737373] mt-1">median employees</p>
            </div>
            <div className="flex items-center justify-between text-xs text-[#A3A3A3] border-t border-[#F0F0F0] pt-3 mt-2">
              <span>Min: {fmt(icp.criteria.employeeRange.min)}</span>
              <span>Max: {fmt(icp.criteria.employeeRange.max)}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center"><DollarSign size={16} className="text-[#525252]" /></div>
              <div><h3 className="text-sm font-semibold text-[#0A0A0A]">Revenue</h3><p className="text-[10px] text-[#A3A3A3]">Weight: {icp.weights.revenue}%</p></div>
            </div>
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-[#0A0A0A]">{fmt(icp.criteria.revenueRange.median)}</p>
              <p className="text-xs text-[#737373] mt-1">median revenue (EUR)</p>
            </div>
            <div className="flex items-center justify-between text-xs text-[#A3A3A3] border-t border-[#F0F0F0] pt-3 mt-2">
              <span>Min: {fmt(icp.criteria.revenueRange.min)}</span>
              <span>Max: {fmt(icp.criteria.revenueRange.max)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center"><TrendingUp size={16} className="text-[#525252]" /></div>
              <h3 className="text-sm font-semibold text-[#0A0A0A]">Deal Size</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#0A0A0A]">{fmt(icp.criteria.dealSize.avg)}</p>
                <p className="text-xs text-[#737373] mt-1">average (EUR)</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#0A0A0A]">{fmt(icp.criteria.dealSize.median)}</p>
                <p className="text-xs text-[#737373] mt-1">median (EUR)</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center"><MapPin size={16} className="text-[#525252]" /></div>
              <h3 className="text-sm font-semibold text-[#0A0A0A]">Locations</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(icp.criteria.countries || []).map(function(c: any) {
                return <span key={c.name} className="px-3 py-1.5 rounded-full bg-[#F5F5F5] text-xs font-medium text-[#525252]">{c.name} <span className="text-[#A3A3A3]">{c.percent}%</span></span>;
              })}
              {(icp.criteria.cities || []).map(function(c: any) {
                return <span key={c.name} className="px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-[#F0F0F0] text-xs text-[#737373]">{c.name}</span>;
              })}
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#A3A3A3] text-center">
          {"Generated " + new Date(icp.generatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) + " — Used by Kairo AI to score prospects and prioritize deals"}
        </p>
      </div>
    </div>
  );
}
