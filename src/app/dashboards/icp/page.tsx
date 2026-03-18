"use client";

import { useState, useEffect } from "react";
import { Search, RefreshCw, Globe, Building2, Users, DollarSign, MapPin, TrendingUp, Target, Zap } from "lucide-react";

var FREE_PROVIDERS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com", "aol.com", "mail.com", "protonmail.com", "gmx.com", "yandex.com", "zoho.com"];

function extractDomain(input: string): string | null {
  var trimmed = input.trim().toLowerCase();
  if (!trimmed) return null;

  // If it's an email
  if (trimmed.includes("@")) {
    var domain = trimmed.split("@")[1];
    if (FREE_PROVIDERS.includes(domain)) return null;
    return domain;
  }

  // If it's a URL
  trimmed = trimmed.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  return trimmed || null;
}

function formatNum(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return String(n);
}

interface IcpData {
  company: any;
  icp: {
    basedOn: { wonDeals: number; companiesMatched: number };
    criteria: {
      industries: Array<{ name: string; count: number; percent: number }>;
      countries: Array<{ name: string; count: number; percent: number }>;
      cities: Array<{ name: string; count: number; percent: number }>;
      employeeRange: { min: number; max: number; median: number };
      revenueRange: { min: number; max: number; median: number };
      dealSize: { avg: number; median: number; min: number; max: number };
    };
    weights: { industry: number; companySize: number; revenue: number };
    generatedAt: string;
  };
}

export default function IcpPage() {
  var [input, setInput] = useState("");
  var [loading, setLoading] = useState(false);
  var [initialLoading, setInitialLoading] = useState(true);
  var [error, setError] = useState<string | null>(null);
  var [data, setData] = useState<IcpData | null>(null);
  var [step, setStep] = useState<"input" | "loading" | "result">("input");

  // Load saved ICP on mount
  useEffect(function() {
    fetch("/api/icp").then(function(r) { return r.json(); }).then(function(json) {
      if (json.data && json.data.icp) {
        setData(json.data);
        setStep("result");
      }
      setInitialLoading(false);
    }).catch(function() { setInitialLoading(false); });
  }, []);

  function handleSubmit() {
    var domain = extractDomain(input);
    if (!domain) {
      setError("Enter a company website or professional email (not Gmail, Outlook, etc.)");
      return;
    }
    setError(null);
    setLoading(true);
    setStep("loading");

    fetch("/api/icp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: domain }),
    })
      .then(function(r) { return r.json().then(function(j) { return { ok: r.ok, body: j }; }); })
      .then(function(res) {
        if (!res.ok) {
          setError(res.body.error || "Failed to generate ICP");
          setStep("input");
        } else if (res.body.data) {
          setData(res.body.data);
          setStep("result");
        }
        setLoading(false);
      })
      .catch(function() { setError("Network error"); setStep("input"); setLoading(false); });
  }

  if (initialLoading) {
    return <div className="flex-1 flex items-center justify-center"><div className="h-8 w-8 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin" /></div>;
  }

  // Input step
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
            <input
              type="text"
              value={input}
              onChange={function(e) { setInput(e.target.value); setError(null); }}
              onKeyDown={function(e) { if (e.key === "Enter") handleSubmit(); }}
              placeholder="yourcompany.com or you@company.com"
              className="w-full h-12 pl-11 pr-4 text-sm rounded-xl border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-shadow"
              autoFocus
            />
          </div>

          {error && <p className="text-sm text-[#EF4444] mb-4">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="w-full h-11 rounded-xl bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#333] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
          >
            <Search size={16} />
            Generate ICP
          </button>

          <p className="text-[11px] text-[#A3A3A3] mt-4">We analyze your won deals in HubSpot to find your ideal customer pattern</p>
        </div>
      </div>
    );
  }

  // Loading step
  if (step === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="h-12 w-12 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-lg font-semibold text-[#0A0A0A] mb-2">Building your ICP...</h2>
          <div className="space-y-2 text-sm text-[#737373]">
            <p>Analyzing won deals</p>
            <p>Matching company profiles</p>
            <p>Computing patterns</p>
          </div>
        </div>
      </div>
    );
  }

  // Result step
  if (!data || !data.icp) return null;
  var icp = data.icp;
  var company = data.company;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0A0A0A]">Ideal Customer Profile</h1>
            <p className="text-sm text-[#737373] mt-1">
              {"Based on " + icp.basedOn.wonDeals + " won deals and " + icp.basedOn.companiesMatched + " companies"}
            </p>
          </div>
          <button
            onClick={function() { setStep("input"); setInput(""); }}
            className="flex items-center gap-2 px-4 h-9 rounded-lg border border-[#E5E5E5] text-sm text-[#525252] hover:bg-[#F5F5F5] transition-colors"
          >
            <RefreshCw size={14} />
            Regenerate
          </button>
        </div>

        {/* Company card */}
        {company && (
          <div className="bg-[#0A0A0A] rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Building2 size={22} className="text-white/80" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{company.name || "Your Company"}</h2>
                <p className="text-sm text-white/50">{company.domain || ""}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {company.industry && (
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wide">Industry</p>
                  <p className="text-sm font-medium mt-0.5">{company.industry}</p>
                </div>
              )}
              {company.employees && (
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wide">Employees</p>
                  <p className="text-sm font-medium mt-0.5">{formatNum(company.employees)}</p>
                </div>
              )}
              {company.revenue && (
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wide">Revenue</p>
                  <p className="text-sm font-medium mt-0.5">{formatNum(company.revenue)} EUR</p>
                </div>
              )}
              {company.country && (
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wide">Location</p>
                  <p className="text-sm font-medium mt-0.5">{[company.city, company.country].filter(Boolean).join(", ")}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ICP Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Industry */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                <Zap size={16} className="text-[#525252]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A0A0A]">Industry</h3>
                <p className="text-[10px] text-[#A3A3A3]">Weight: {icp.weights.industry}%</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {(icp.criteria.industries || []).slice(0, 5).map(function(ind) {
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
              {(!icp.criteria.industries || icp.criteria.industries.length === 0) && (
                <p className="text-xs text-[#A3A3A3]">No industry data</p>
              )}
            </div>
          </div>

          {/* Company Size */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                <Users size={16} className="text-[#525252]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A0A0A]">Company Size</h3>
                <p className="text-[10px] text-[#A3A3A3]">Weight: {icp.weights.companySize}%</p>
              </div>
            </div>
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-[#0A0A0A]">{formatNum(icp.criteria.employeeRange.median)}</p>
              <p className="text-xs text-[#737373] mt-1">median employees</p>
            </div>
            <div className="flex items-center justify-between text-xs text-[#A3A3A3] border-t border-[#F0F0F0] pt-3 mt-2">
              <span>Min: {formatNum(icp.criteria.employeeRange.min)}</span>
              <span>Max: {formatNum(icp.criteria.employeeRange.max)}</span>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                <DollarSign size={16} className="text-[#525252]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A0A0A]">Revenue</h3>
                <p className="text-[10px] text-[#A3A3A3]">Weight: {icp.weights.revenue}%</p>
              </div>
            </div>
            <div className="text-center py-4">
              <p className="text-4xl font-bold text-[#0A0A0A]">{formatNum(icp.criteria.revenueRange.median)}</p>
              <p className="text-xs text-[#737373] mt-1">median annual revenue (EUR)</p>
            </div>
            <div className="flex items-center justify-between text-xs text-[#A3A3A3] border-t border-[#F0F0F0] pt-3 mt-2">
              <span>Min: {formatNum(icp.criteria.revenueRange.min)}</span>
              <span>Max: {formatNum(icp.criteria.revenueRange.max)}</span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Deal Size */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                <TrendingUp size={16} className="text-[#525252]" />
              </div>
              <h3 className="text-sm font-semibold text-[#0A0A0A]">Deal Size</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#0A0A0A]">{formatNum(icp.criteria.dealSize.avg)}</p>
                <p className="text-xs text-[#737373] mt-1">average (EUR)</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-[#0A0A0A]">{formatNum(icp.criteria.dealSize.median)}</p>
                <p className="text-xs text-[#737373] mt-1">median (EUR)</p>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                <MapPin size={16} className="text-[#525252]" />
              </div>
              <h3 className="text-sm font-semibold text-[#0A0A0A]">Locations</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(icp.criteria.countries || []).map(function(c) {
                return <span key={c.name} className="px-3 py-1.5 rounded-full bg-[#F5F5F5] text-xs font-medium text-[#525252]">{c.name} <span className="text-[#A3A3A3]">{c.percent}%</span></span>;
              })}
              {(icp.criteria.cities || []).map(function(c) {
                return <span key={c.name} className="px-3 py-1.5 rounded-full bg-[#FAFAFA] text-xs text-[#737373]">{c.name}</span>;
              })}
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#A3A3A3] text-center">
          {"Generated " + new Date(icp.generatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          {" — This ICP is used by Kairo AI to score prospects and prioritize deals"}
        </p>
      </div>
    </div>
  );
}
