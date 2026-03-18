"use client";

import { useState, useEffect } from "react";
import { Search, RefreshCw, Globe, Users, DollarSign, MapPin, Target, Zap, UserCheck, AlertTriangle, ShieldCheck, Clock, ArrowRight } from "lucide-react";

var FREE_PROVIDERS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com", "aol.com", "protonmail.com"];

function extractDomain(input: string): string | null {
  var t = input.trim().toLowerCase();
  if (!t) return null;
  if (t.includes("@")) { var d = t.split("@")[1]; return FREE_PROVIDERS.includes(d) ? null : d; }
  return t.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] || null;
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
      if (j.data && j.data.company) { setData(j.data); setStep("result"); }
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
          <div className="h-14 w-14 rounded-2xl bg-[#0A0A0A] flex items-center justify-center mx-auto mb-5"><Target size={24} className="text-white" /></div>
          <h1 className="text-2xl font-bold text-[#0A0A0A] mb-2">Build your ICP</h1>
          <p className="text-sm text-[#737373] mb-8">Enter your company website and Kairo AI will analyze your business to define your Ideal Customer Profile</p>
          <div className="relative mb-4">
            <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
            <input type="text" value={input} onChange={function(e) { setInput(e.target.value); setError(null); }} onKeyDown={function(e) { if (e.key === "Enter") handleSubmit(); }}
              placeholder="yourcompany.com or you@company.com" className="w-full h-12 pl-11 pr-4 text-sm rounded-xl border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent" autoFocus />
          </div>
          {error && <p className="text-sm text-[#EF4444] mb-4">{error}</p>}
          <button onClick={handleSubmit} disabled={loading || !input.trim()} className="w-full h-11 rounded-xl bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#333] disabled:opacity-40 transition-colors flex items-center justify-center gap-2">
            <Search size={16} /> Analyze & Generate ICP
          </button>
        </div>
      </div>
    );
  }

  if (step === "loading") {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="h-12 w-12 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-lg font-semibold text-[#0A0A0A] mb-3">Analyzing your company...</h2>
          <div className="space-y-1.5 text-sm text-[#737373]">
            <p>Researching your business</p>
            <p>Identifying target market</p>
            <p>Building ideal customer profile</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;
  var co = data.company || {};
  var icp = data.icp || {};
  var criteria = icp.criteria || {};

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0A0A0A]">Ideal Customer Profile</h1>
            <p className="text-sm text-[#737373] mt-1">AI-generated from company analysis</p>
          </div>
          <button onClick={function() { setStep("input"); setInput(""); }} className="flex items-center gap-2 px-4 h-9 rounded-lg border border-[#E5E5E5] text-sm text-[#525252] hover:bg-[#F5F5F5] transition-colors">
            <RefreshCw size={14} /> Regenerate
          </button>
        </div>

        {/* Company Card */}
        <div className="bg-[#0A0A0A] rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            {co.favicon && <img src={co.favicon} alt="" className="h-11 w-11 rounded-xl bg-white p-1.5" />}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-white">{co.name || co.domain}</h2>
              <p className="text-sm text-white/40">{co.domain}</p>
            </div>
            {co.estimatedSize && <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/60">{co.estimatedSize} employees</span>}
          </div>
          {co.description && <p className="text-sm text-white/60 mb-4 leading-relaxed">{co.description}</p>}
          <div className="flex flex-wrap gap-2">
            {(co.services || []).map(function(s: string) { return <span key={s} className="px-2.5 py-1 rounded-lg bg-white/10 text-[11px] text-white/70">{s}</span>; })}
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/10">
            {co.industry && <div><p className="text-[10px] text-white/30 uppercase">Industry</p><p className="text-sm text-white/80">{co.industry}</p></div>}
            {co.targetMarket && <div><p className="text-[10px] text-white/30 uppercase">Target market</p><p className="text-sm text-white/80">{co.targetMarket}</p></div>}
            {co.location && <div><p className="text-[10px] text-white/30 uppercase">Location</p><p className="text-sm text-white/80">{co.location}</p></div>}
          </div>
        </div>

        {/* ICP Summary */}
        {icp.summary && (
          <div className="bg-[#FAFAFA] rounded-2xl border border-[#E5E5E5] p-5 mb-6">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center shrink-0 mt-0.5"><Target size={14} className="text-white" /></div>
              <div>
                <h3 className="text-sm font-semibold text-[#0A0A0A] mb-1">ICP Summary</h3>
                <p className="text-sm text-[#525252] leading-relaxed">{icp.summary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main criteria grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Industries */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center"><Zap size={16} className="text-[#525252]" /></div>
              <h3 className="text-sm font-semibold text-[#0A0A0A]">Target Industries</h3>
            </div>
            <div className="space-y-3">
              {(criteria.industries || []).map(function(ind: any) {
                return (
                  <div key={ind.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-[#0A0A0A]">{ind.name}</span>
                      <span className="text-xs text-[#737373]">{ind.percent}%</span>
                    </div>
                    <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0A0A0A] rounded-full" style={{ width: ind.percent + "%" }} />
                    </div>
                    {ind.reason && <p className="text-[10px] text-[#A3A3A3] mt-1">{ind.reason}</p>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Company Size */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center"><Users size={16} className="text-[#525252]" /></div>
              <h3 className="text-sm font-semibold text-[#0A0A0A]">Company Size</h3>
            </div>
            {criteria.companySize && (
              <div>
                <div className="text-center py-3">
                  <p className="text-3xl font-bold text-[#0A0A0A]">{criteria.companySize.sweet_spot}</p>
                  <p className="text-xs text-[#737373] mt-1">employees sweet spot</p>
                </div>
                <div className="flex items-center justify-between text-xs text-[#A3A3A3] border-t border-[#F0F0F0] pt-3 mt-2">
                  <span>Min: {criteria.companySize.min}</span>
                  <span>Max: {criteria.companySize.max}</span>
                </div>
                {criteria.companySize.reason && <p className="text-[10px] text-[#A3A3A3] mt-2">{criteria.companySize.reason}</p>}
              </div>
            )}
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center"><DollarSign size={16} className="text-[#525252]" /></div>
              <h3 className="text-sm font-semibold text-[#0A0A0A]">Revenue Range</h3>
            </div>
            {criteria.revenue && (
              <div>
                <div className="text-center py-3">
                  <p className="text-3xl font-bold text-[#0A0A0A]">{criteria.revenue.sweet_spot}</p>
                  <p className="text-xs text-[#737373] mt-1">revenue sweet spot</p>
                </div>
                {criteria.revenue.reason && <p className="text-[10px] text-[#A3A3A3] mt-3 border-t border-[#F0F0F0] pt-3">{criteria.revenue.reason}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Buyer Personas + Deal */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Buyer Personas */}
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center"><UserCheck size={16} className="text-[#525252]" /></div>
              <h3 className="text-sm font-semibold text-[#0A0A0A]">Buyer Personas</h3>
            </div>
            <div className="space-y-3">
              {(criteria.buyerPersonas || []).map(function(p: any) {
                return (
                  <div key={p.title} className="flex items-start gap-3 p-3 rounded-xl bg-[#FAFAFA]">
                    <div className={"h-2 w-2 rounded-full mt-1.5 shrink-0 " + (p.priority === "Primary" ? "bg-[#0A0A0A]" : "bg-[#D4D4D4]")} />
                    <div>
                      <p className="text-xs font-medium text-[#0A0A0A]">{p.title}</p>
                      <p className="text-[10px] text-[#737373]">{p.priority} — {p.reason}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deal Info + Geography */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center"><Clock size={14} className="text-[#525252]" /></div>
                <h3 className="text-sm font-semibold text-[#0A0A0A]">Deal Profile</h3>
              </div>
              {icp.dealSize && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-xl bg-[#FAFAFA]">
                    <p className="text-lg font-bold text-[#0A0A0A]">{icp.dealSize.range || "--"}</p>
                    <p className="text-[10px] text-[#737373]">range</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-[#FAFAFA]">
                    <p className="text-lg font-bold text-[#0A0A0A]">{icp.dealSize.average ? icp.dealSize.average.toLocaleString() + " EUR" : "--"}</p>
                    <p className="text-[10px] text-[#737373]">average</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-[#FAFAFA]">
                    <p className="text-lg font-bold text-[#0A0A0A]">{icp.dealSize.salesCycle || "--"}</p>
                    <p className="text-[10px] text-[#737373]">cycle</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center"><MapPin size={14} className="text-[#525252]" /></div>
                <h3 className="text-sm font-semibold text-[#0A0A0A]">Geography</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(criteria.geography || []).map(function(g: string) { return <span key={g} className="px-3 py-1.5 rounded-full bg-[#F5F5F5] text-xs font-medium text-[#525252]">{g}</span>; })}
              </div>
            </div>
          </div>
        </div>

        {/* Pain Points + Signals + Disqualifiers */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-red-50 flex items-center justify-center"><AlertTriangle size={14} className="text-red-400" /></div>
              <h3 className="text-sm font-semibold text-[#0A0A0A]">Pain Points</h3>
            </div>
            <div className="space-y-2">
              {(criteria.painPoints || []).map(function(p: string, i: number) { return <div key={i} className="flex items-start gap-2 text-xs text-[#525252]"><span className="text-red-400 mt-0.5 shrink-0">!</span>{p}</div>; })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-green-50 flex items-center justify-center"><ShieldCheck size={14} className="text-green-500" /></div>
              <h3 className="text-sm font-semibold text-[#0A0A0A]">Buying Signals</h3>
            </div>
            <div className="space-y-2">
              {(criteria.buyingSignals || []).map(function(s: string, i: number) { return <div key={i} className="flex items-start gap-2 text-xs text-[#525252]"><ArrowRight size={10} className="text-green-500 mt-0.5 shrink-0" />{s}</div>; })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center"><span className="text-sm text-[#A3A3A3]">X</span></div>
              <h3 className="text-sm font-semibold text-[#0A0A0A]">Disqualifiers</h3>
            </div>
            <div className="space-y-2">
              {(criteria.disqualifiers || []).map(function(d: string, i: number) { return <div key={i} className="flex items-start gap-2 text-xs text-[#737373]"><span className="text-[#A3A3A3] shrink-0">—</span>{d}</div>; })}
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#A3A3A3] text-center">
          {"Generated " + new Date(data.generatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) + " — Used by Kairo AI to score prospects and prioritize deals"}
        </p>
      </div>
    </div>
  );
}
