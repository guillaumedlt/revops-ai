"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, FileText, X } from "lucide-react";

interface Report {
  id: string;
  name: string;
  description: string | null;
  theme: string;
  status: string;
  slideCount: number;
  updated_at: string;
}

var THEME_PREVIEWS: Record<string, { bg: string; label: string; desc: string }> = {
  light: { bg: "bg-white border border-[#E5E5E5]", label: "Light", desc: "Clean white background" },
  dark: { bg: "bg-[#0A0A0A]", label: "Dark", desc: "Dark professional look" },
  gradient: { bg: "bg-gradient-to-br from-[#667eea] to-[#764ba2]", label: "Gradient", desc: "Modern gradient style" },
  minimal: { bg: "bg-[#FAFAF8] border border-[#E8E8E5]", label: "Minimal", desc: "Subtle and clean" },
};

var THEME_DOTS: Record<string, string> = {
  light: "bg-[#E5E5E5]",
  dark: "bg-[#0A0A0A]",
  gradient: "bg-gradient-to-r from-[#667eea] to-[#764ba2]",
  minimal: "bg-[#D4D4C8]",
};

export default function ReportsPage() {
  var [reports, setReports] = useState<Report[]>([]);
  var [loading, setLoading] = useState(true);
  var [showCreate, setShowCreate] = useState(false);
  var [newName, setNewName] = useState("");
  var [newDesc, setNewDesc] = useState("");
  var [newTheme, setNewTheme] = useState("light");
  var router = useRouter();

  useEffect(function() {
    fetch("/api/reports")
      .then(function(r) { return r.json(); })
      .then(function(res) {
        setReports(res.data || []);
        setLoading(false);
      })
      .catch(function() { setLoading(false); });
  }, []);

  function handleCreate() {
    fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName || "Untitled Report", description: newDesc || null, theme: newTheme }),
    })
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res.data) {
          router.push("/reports/" + res.data.id);
        }
      });
  }

  function formatDate(dateStr: string) {
    var d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#0A0A0A]">Reports</h1>
            <p className="text-sm text-[#737373] mt-1">Create presentation-style reports from your data</p>
          </div>
          <button
            onClick={function() { setShowCreate(true); }}
            className="flex items-center gap-2 px-4 h-9 rounded-lg bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#333] transition-colors"
          >
            <Plus size={16} />
            New Report
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(function(i) {
              return (
                <div key={i} className="rounded-xl border border-[#E5E5E5] overflow-hidden animate-pulse">
                  <div className="h-32 bg-[#F5F5F5]" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-[#F0F0F0] rounded w-2/3" />
                    <div className="h-3 bg-[#F5F5F5] rounded w-1/3" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-20">
            <div className="h-16 w-16 rounded-2xl bg-[#F5F5F5] flex items-center justify-center mx-auto mb-4">
              <FileText size={28} className="text-[#A3A3A3]" />
            </div>
            <h3 className="text-lg font-medium text-[#0A0A0A] mb-1">No reports yet</h3>
            <p className="text-sm text-[#737373] mb-4">Create your first report to get started</p>
            <button
              onClick={function() { setShowCreate(true); }}
              className="px-4 h-9 rounded-lg bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#333] transition-colors"
            >
              Create Report
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map(function(report) {
              var themeBg = THEME_PREVIEWS[report.theme] ? THEME_PREVIEWS[report.theme].bg : THEME_PREVIEWS.light.bg;
              var dotColor = THEME_DOTS[report.theme] || THEME_DOTS.light;
              return (
                <button
                  key={report.id}
                  onClick={function() { router.push("/reports/" + report.id); }}
                  className="text-left rounded-xl border border-[#E5E5E5] overflow-hidden hover:shadow-md transition-all group"
                >
                  <div className={"h-32 flex items-center justify-center " + themeBg}>
                    <FileText size={32} className={report.theme === "dark" || report.theme === "gradient" ? "text-white/30" : "text-[#D4D4D4]"} />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={"h-2 w-2 rounded-full shrink-0 " + dotColor} />
                      <h3 className="text-sm font-medium text-[#0A0A0A] truncate">{report.name}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                      <span>{report.slideCount + " slide" + (report.slideCount !== 1 ? "s" : "")}</span>
                      <span>{"\u00b7"}</span>
                      <span>{formatDate(report.updated_at)}</span>
                      {report.status === "published" && (
                        <>
                          <span>{"\u00b7"}</span>
                          <span className="text-[#22C55E]">Published</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
              <h2 className="text-lg font-semibold text-[#0A0A0A]">New Report</h2>
              <button onClick={function() { setShowCreate(false); }} className="text-[#A3A3A3] hover:text-[#0A0A0A]">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={function(e) { setNewName(e.target.value); }}
                  placeholder="Q1 Revenue Report"
                  className="w-full h-10 px-3 text-sm rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Description</label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={function(e) { setNewDesc(e.target.value); }}
                  placeholder="Optional description..."
                  className="w-full h-10 px-3 text-sm rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Theme</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(THEME_PREVIEWS).map(function(entry) {
                    var key = entry[0];
                    var val = entry[1];
                    return (
                      <button
                        key={key}
                        onClick={function() { setNewTheme(key); }}
                        className={"rounded-xl overflow-hidden transition-all " + (newTheme === key ? "ring-2 ring-[#0A0A0A] ring-offset-2" : "border border-[#E5E5E5] hover:border-[#D4D4D4]")}
                      >
                        <div className={"h-16 " + val.bg} />
                        <div className="px-3 py-2 bg-white">
                          <p className="text-xs font-medium text-[#0A0A0A]">{val.label}</p>
                          <p className="text-[10px] text-[#A3A3A3]">{val.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#E5E5E5] flex justify-end gap-2">
              <button
                onClick={function() { setShowCreate(false); }}
                className="px-4 h-9 rounded-lg text-sm text-[#525252] hover:bg-[#F5F5F5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 h-9 rounded-lg bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#333] transition-colors"
              >
                Create Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
