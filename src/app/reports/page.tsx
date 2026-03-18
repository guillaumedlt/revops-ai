"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Trash2 } from "lucide-react";

interface Report {
  id: string;
  name: string;
  description: string | null;
  theme: string;
  status: string;
  slideCount: number;
  updated_at: string;
}


export default function ReportsPage() {
  var [reports, setReports] = useState<Report[]>([]);
  var [loading, setLoading] = useState(true);
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

  function deleteReport(id: string) {
    fetch("/api/reports/" + id, { method: "DELETE" }).then(function() {
      setReports(function(prev) { return prev.filter(function(r) { return r.id !== id; }); });
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
            <p className="text-sm text-[#737373] mt-1">View and present your reports</p>
          </div>
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
            <p className="text-sm text-[#737373] mb-1">Ask Kairo to generate a report in the chat</p>
            <p className="text-xs text-[#A3A3A3]">Try: /report pipeline analysis</p>
            <a href="/chat" className="inline-block mt-4 px-4 h-9 leading-9 rounded-lg bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#333] transition-colors">
              Go to Chat
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map(function(report) {
              
              
              return (
                <div
                  key={report.id}
                  onClick={function() { router.push("/reports/" + report.id); }}
                  className="relative text-left rounded-xl border border-[#E5E5E5] overflow-hidden hover:shadow-md transition-all group cursor-pointer"
                >
                  <button
                    onClick={function(e) { e.stopPropagation(); deleteReport(report.id); }}
                    className="absolute top-2 right-2 hidden group-hover:flex h-7 w-7 items-center justify-center rounded-lg bg-white/80 text-[#A3A3A3] hover:text-[#EF4444] transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="h-32 flex items-center justify-center bg-white border-b border-[#E5E5E5]">
                    <FileText size={32} className={"text-[#D4D4D4]"} />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={"h-2 w-2 rounded-full shrink-0 bg-[#0A0A0A]"} />
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
