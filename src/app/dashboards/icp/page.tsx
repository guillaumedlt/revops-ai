"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Target, Building2, Users, DollarSign, MapPin, AlertCircle, Loader2 } from "lucide-react";

interface IcpItem { name: string; count: number; percent: number }
interface RangeData { min: number; max: number; median: number }
interface IcpData {
  generatedAt: string;
  basedOn: { wonDeals: number; companiesMatched: number };
  criteria: {
    industries: IcpItem[];
    countries: IcpItem[];
    cities: IcpItem[];
    employeeRange: RangeData;
    revenueRange: RangeData;
    dealSize: { avg: number; median: number; min: number; max: number };
  };
  weights: { industry: number; companySize: number; revenue: number };
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function IcpPage() {
  const [icp, setIcp] = useState<IcpData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weights, setWeights] = useState({ industry: 40, companySize: 30, revenue: 30 });

  const fetchIcp = useCallback(async function () {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/icp");
      if (!res.ok) throw new Error("Failed to load ICP");
      const json = await res.json();
      if (json.data) {
        setIcp(json.data);
        if (json.data.weights) {
          setWeights(json.data.weights);
        }
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(function () {
    fetchIcp();
  }, [fetchIcp]);

  async function handleGenerate() {
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/icp", { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to generate ICP");
      setIcp(json.data);
      if (json.data.weights) setWeights(json.data.weights);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  }

  async function handleSaveWeights() {
    if (!icp) return;
    setSaving(true);
    try {
      const updated = { ...icp, weights };
      const res = await fetch("/api/icp", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to save");
      setIcp(updated);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  function handleWeightChange(key: "industry" | "companySize" | "revenue", value: number) {
    const others = (["industry", "companySize", "revenue"] as const).filter(function (k) { return k !== key; });
    const remaining = 100 - value;
    const otherTotal = weights[others[0]] + weights[others[1]];
    let w0: number, w1: number;
    if (otherTotal === 0) {
      w0 = Math.round(remaining / 2);
      w1 = remaining - w0;
    } else {
      w0 = Math.round((weights[others[0]] / otherTotal) * remaining);
      w1 = remaining - w0;
    }
    setWeights({ ...weights, [key]: value, [others[0]]: w0, [others[1]]: w1 });
  }

  const weightsChanged = icp && (
    weights.industry !== icp.weights.industry ||
    weights.companySize !== icp.weights.companySize ||
    weights.revenue !== icp.weights.revenue
  );

  // Skeleton loader
  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="h-7 w-64 bg-[#E5E5E5] rounded animate-pulse" />
              <div className="h-4 w-48 bg-[#E5E5E5] rounded animate-pulse mt-2" />
            </div>
            <div className="h-9 w-28 bg-[#E5E5E5] rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(function (i) {
              return <div key={i} className="h-48 bg-white border border-[#E5E5E5] rounded-xl animate-pulse" />;
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2.5">
              <Target size={20} className="text-[#0A0A0A]" />
              <h1 className="text-xl font-semibold text-[#0A0A0A]">Ideal Customer Profile</h1>
            </div>
            {icp && (
              <p className="text-sm text-[#737373] mt-1">
                Based on {icp.basedOn.wonDeals} won deals ({icp.basedOn.companiesMatched} companies matched) — Updated {formatDate(icp.generatedAt)}
              </p>
            )}
            {!icp && !error && (
              <p className="text-sm text-[#737373] mt-1">
                Generate your ICP from HubSpot won deals
              </p>
            )}
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 px-4 h-9 rounded-lg text-sm font-medium bg-[#0A0A0A] text-white hover:bg-[#262626] disabled:opacity-50 transition-colors"
          >
            {generating ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}
            {generating ? "Generating..." : icp ? "Regenerate" : "Generate from HubSpot"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#E5E5E5] bg-white mb-6">
            <AlertCircle size={16} className="text-[#737373] shrink-0" />
            <p className="text-sm text-[#525252]">{error}</p>
          </div>
        )}

        {/* No ICP yet */}
        {!icp && !error && (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-[#E5E5E5] rounded-xl">
            <Target size={40} className="text-[#E5E5E5] mb-4" />
            <h2 className="text-base font-medium text-[#0A0A0A] mb-1">No ICP configured yet</h2>
            <p className="text-sm text-[#737373] mb-6 text-center max-w-sm">
              Click "Generate from HubSpot" to automatically build your Ideal Customer Profile from won deals data.
            </p>
          </div>
        )}

        {/* ICP Data */}
        {icp && (
          <>
            {/* Main criteria cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Industry */}
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 size={14} className="text-[#737373]" />
                  <h3 className="text-sm font-medium text-[#0A0A0A]">Industry</h3>
                </div>
                <p className="text-[11px] text-[#A3A3A3] mb-3">Weight: {weights.industry}%</p>
                <div className="space-y-2">
                  {icp.criteria.industries.length === 0 && (
                    <p className="text-xs text-[#A3A3A3]">No industry data</p>
                  )}
                  {icp.criteria.industries.map(function (ind) {
                    return (
                      <div key={ind.name} className="flex items-center justify-between">
                        <span className="text-sm text-[#525252] truncate mr-2">{ind.name}</span>
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

              {/* Company Size */}
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={14} className="text-[#737373]" />
                  <h3 className="text-sm font-medium text-[#0A0A0A]">Company Size</h3>
                </div>
                <p className="text-[11px] text-[#A3A3A3] mb-3">Weight: {weights.companySize}%</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#A3A3A3] mb-0.5">Employee Range</p>
                    <p className="text-sm text-[#0A0A0A] font-medium">
                      {formatNumber(icp.criteria.employeeRange.min)} – {formatNumber(icp.criteria.employeeRange.max)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3A3A3] mb-0.5">Median</p>
                    <p className="text-sm text-[#0A0A0A] font-medium">
                      {formatNumber(icp.criteria.employeeRange.median)} employees
                    </p>
                  </div>
                </div>
              </div>

              {/* Revenue */}
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={14} className="text-[#737373]" />
                  <h3 className="text-sm font-medium text-[#0A0A0A]">Revenue</h3>
                </div>
                <p className="text-[11px] text-[#A3A3A3] mb-3">Weight: {weights.revenue}%</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#A3A3A3] mb-0.5">Annual Revenue Range</p>
                    <p className="text-sm text-[#0A0A0A] font-medium">
                      {formatNumber(icp.criteria.revenueRange.min)} – {formatNumber(icp.criteria.revenueRange.max)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3A3A3] mb-0.5">Median</p>
                    <p className="text-sm text-[#0A0A0A] font-medium">
                      {formatNumber(icp.criteria.revenueRange.median)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deal Size & Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Deal Size */}
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign size={14} className="text-[#737373]" />
                  <h3 className="text-sm font-medium text-[#0A0A0A]">Deal Size</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#A3A3A3] mb-0.5">Average</p>
                    <p className="text-lg font-semibold text-[#0A0A0A]">{formatNumber(icp.criteria.dealSize.avg)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3A3A3] mb-0.5">Median</p>
                    <p className="text-lg font-semibold text-[#0A0A0A]">{formatNumber(icp.criteria.dealSize.median)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3A3A3] mb-0.5">Min</p>
                    <p className="text-sm text-[#525252]">{formatNumber(icp.criteria.dealSize.min)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3A3A3] mb-0.5">Max</p>
                    <p className="text-sm text-[#525252]">{formatNumber(icp.criteria.dealSize.max)}</p>
                  </div>
                </div>
              </div>

              {/* Locations */}
              <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={14} className="text-[#737373]" />
                  <h3 className="text-sm font-medium text-[#0A0A0A]">Top Locations</h3>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-[#A3A3A3] mb-1">Countries</p>
                    <div className="flex flex-wrap gap-1.5">
                      {icp.criteria.countries.length === 0 && <span className="text-xs text-[#A3A3A3]">No data</span>}
                      {icp.criteria.countries.map(function (c) {
                        return (
                          <span key={c.name} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#F5F5F5] text-[#525252]">
                            {c.name} <span className="ml-1 text-[#A3A3A3]">{c.percent}%</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#A3A3A3] mb-1">Cities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {icp.criteria.cities.length === 0 && <span className="text-xs text-[#A3A3A3]">No data</span>}
                      {icp.criteria.cities.map(function (c) {
                        return (
                          <span key={c.name} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-[#F5F5F5] text-[#525252]">
                            {c.name} <span className="ml-1 text-[#A3A3A3]">{c.percent}%</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weight Sliders */}
            <div className="bg-white border border-[#E5E5E5] rounded-xl p-5">
              <h3 className="text-sm font-medium text-[#0A0A0A] mb-4">Scoring Weights</h3>
              <div className="space-y-4">
                {/* Industry weight */}
                <div className="flex items-center gap-4">
                  <label className="text-sm text-[#525252] w-28 shrink-0">Industry</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={weights.industry}
                    onChange={function (e) { handleWeightChange("industry", Number(e.target.value)); }}
                    className="flex-1 h-1.5 bg-[#E5E5E5] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0A0A0A] [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-sm font-medium text-[#0A0A0A] w-10 text-right">{weights.industry}%</span>
                </div>

                {/* Company Size weight */}
                <div className="flex items-center gap-4">
                  <label className="text-sm text-[#525252] w-28 shrink-0">Company Size</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={weights.companySize}
                    onChange={function (e) { handleWeightChange("companySize", Number(e.target.value)); }}
                    className="flex-1 h-1.5 bg-[#E5E5E5] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0A0A0A] [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-sm font-medium text-[#0A0A0A] w-10 text-right">{weights.companySize}%</span>
                </div>

                {/* Revenue weight */}
                <div className="flex items-center gap-4">
                  <label className="text-sm text-[#525252] w-28 shrink-0">Revenue</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={weights.revenue}
                    onChange={function (e) { handleWeightChange("revenue", Number(e.target.value)); }}
                    className="flex-1 h-1.5 bg-[#E5E5E5] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0A0A0A] [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="text-sm font-medium text-[#0A0A0A] w-10 text-right">{weights.revenue}%</span>
                </div>

                {/* Total indicator */}
                <div className="flex items-center justify-between pt-2 border-t border-[#F0F0F0]">
                  <span className="text-xs text-[#A3A3A3]">Total: {weights.industry + weights.companySize + weights.revenue}%</span>
                  <button
                    onClick={handleSaveWeights}
                    disabled={saving || !weightsChanged}
                    className="flex items-center gap-1.5 px-4 h-8 rounded-lg text-sm font-medium bg-[#0A0A0A] text-white hover:bg-[#262626] disabled:opacity-30 transition-colors"
                  >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                    {saving ? "Saving..." : "Save Weights"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
