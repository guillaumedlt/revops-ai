"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

export default function IcpPage() {
  var [icp, setIcp] = useState<any>(null);
  var [loading, setLoading] = useState(true);
  var [generating, setGenerating] = useState(false);

  useEffect(function() {
    fetch("/api/icp").then(function(r) { return r.json(); }).then(function(json) {
      if (json.data) setIcp(json.data);
      setLoading(false);
    }).catch(function() { setLoading(false); });
  }, []);

  var [error, setError] = useState<string | null>(null);

  function handleGenerate() {
    setGenerating(true);
    setError(null);
    fetch("/api/icp", { method: "POST" })
      .then(function(r) { return r.json().then(function(j) { return { ok: r.ok, data: j }; }); })
      .then(function(res) {
        if (!res.ok) {
          setError(res.data.error || "Failed to generate ICP");
        } else if (res.data.data) {
          setIcp(res.data.data);
        }
        setGenerating(false);
      })
      .catch(function(e) { setError("Network error: " + e.message); setGenerating(false); });
  }

  if (loading) {
    return <div className="flex-1 flex items-center justify-center"><div className="h-8 w-8 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin" /></div>;
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#0A0A0A]">Ideal Customer Profile</h1>
            <p className="text-sm text-[#737373] mt-1">
              {icp ? "Based on " + icp.basedOn.wonDeals + " won deals" : "Generate your ICP from HubSpot data"}
            </p>
          </div>
          <button onClick={handleGenerate} disabled={generating} className="flex items-center gap-2 px-4 h-9 rounded-lg bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#333] transition-colors disabled:opacity-50">
            <RefreshCw size={14} className={generating ? "animate-spin" : ""} />
            {generating ? "Generating..." : icp ? "Regenerate" : "Generate ICP"}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {!icp ? (
          <div className="text-center py-20">
            <p className="text-sm text-[#737373]">Click Generate to build your ICP from won deals</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
                <h3 className="text-xs font-medium text-[#737373] uppercase tracking-wide mb-3">Top Industries</h3>
                <div className="space-y-2">
                  {(icp.criteria.industries || []).map(function(ind: any) {
                    return (
                      <div key={ind.name} className="flex items-center justify-between">
                        <span className="text-sm text-[#0A0A0A]">{ind.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                            <div className="h-full bg-[#0A0A0A] rounded-full" style={{ width: ind.percent + "%" }} />
                          </div>
                          <span className="text-xs text-[#737373] w-8 text-right">{ind.percent}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
                <h3 className="text-xs font-medium text-[#737373] uppercase tracking-wide mb-3">Company Size</h3>
                <p className="text-3xl font-bold text-[#0A0A0A]">{icp.criteria.employeeRange.median}</p>
                <p className="text-xs text-[#737373] mt-1">median employees</p>
                <p className="text-xs text-[#A3A3A3] mt-2">{icp.criteria.employeeRange.min} - {icp.criteria.employeeRange.max} range</p>
              </div>

              <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
                <h3 className="text-xs font-medium text-[#737373] uppercase tracking-wide mb-3">Revenue</h3>
                <p className="text-3xl font-bold text-[#0A0A0A]">{icp.criteria.revenueRange.median.toLocaleString()} EUR</p>
                <p className="text-xs text-[#737373] mt-1">median annual revenue</p>
                <p className="text-xs text-[#A3A3A3] mt-2">{icp.criteria.revenueRange.min.toLocaleString()} - {icp.criteria.revenueRange.max.toLocaleString()} range</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
                <h3 className="text-xs font-medium text-[#737373] uppercase tracking-wide mb-3">Deal Size</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-[#0A0A0A]">{icp.criteria.dealSize.avg.toLocaleString()} EUR</p>
                    <p className="text-xs text-[#737373]">average</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0A0A0A]">{icp.criteria.dealSize.median.toLocaleString()} EUR</p>
                    <p className="text-xs text-[#737373]">median</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
                <h3 className="text-xs font-medium text-[#737373] uppercase tracking-wide mb-3">Top Locations</h3>
                <div className="flex flex-wrap gap-2">
                  {(icp.criteria.countries || []).map(function(c: any) {
                    return <span key={c.name} className="px-2.5 py-1 rounded-full bg-[#F5F5F5] text-xs text-[#525252]">{c.name} ({c.percent}%)</span>;
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
              <h3 className="text-xs font-medium text-[#737373] uppercase tracking-wide mb-4">Scoring Weights</h3>
              <p className="text-xs text-[#A3A3A3] mb-4">Adjust how each criteria impacts the ICP score</p>
              <div className="space-y-4">
                {[
                  { key: "industry", label: "Industry Match" },
                  { key: "companySize", label: "Company Size" },
                  { key: "revenue", label: "Revenue" },
                ].map(function(item) {
                  return (
                    <div key={item.key} className="flex items-center gap-4">
                      <span className="text-sm text-[#0A0A0A] w-32">{item.label}</span>
                      <div className="flex-1 h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                        <div className="h-full bg-[#0A0A0A] rounded-full transition-all" style={{ width: icp.weights[item.key] + "%" }} />
                      </div>
                      <span className="text-sm font-medium text-[#0A0A0A] w-10 text-right">{icp.weights[item.key]}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-[#A3A3A3] text-center">
              {"Generated on " + new Date(icp.generatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " from " + icp.basedOn.companiesMatched + " companies"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
