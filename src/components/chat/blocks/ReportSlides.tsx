"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, BookmarkPlus, ExternalLink } from "lucide-react";
import KPICardBlock from "./KPICardBlock";
import ChartBlock from "./ChartBlock";
import TableBlock from "./TableBlock";
import type { ContentBlock } from "@/types/chat-blocks";

interface ReportSlidesProps {
  title: string;
  sections: ContentBlock[][];
}

function SlideContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map(function(block, i) {
        switch (block.type) {
          case "text":
            return (
              <div key={i} className="text-[13px] text-[#333] leading-relaxed">
                {block.text.split("\n").map(function(line, li) {
                  if (line.startsWith("- ")) return <div key={li} className="flex gap-2 py-0.5"><span className="text-[#A3A3A3]">•</span><span>{line.slice(2)}</span></div>;
                  if (line.startsWith("**") && line.endsWith("**")) return <p key={li} className="font-semibold text-[#0A0A0A] mt-2">{line.slice(2, -2)}</p>;
                  if (line.trim() === "") return <div key={li} className="h-2" />;
                  return <p key={li}>{line}</p>;
                })}
              </div>
            );
          case "kpi":
            return <KPICardBlock key={i} label={block.label} value={block.value} change={block.change} trend={block.trend} />;
          case "kpi_grid":
            return (
              <div key={i} className="grid gap-3" style={{ gridTemplateColumns: "repeat(" + Math.min(block.items.length, 4) + ", 1fr)" }}>
                {block.items.map(function(item, j) {
                  return (
                    <div key={j} className="border border-[#E5E5E5] rounded-xl p-4 text-center bg-[#FAFAFA]">
                      <p className="text-2xl font-bold text-[#0A0A0A]">{item.value}</p>
                      <p className="text-[11px] text-[#737373] mt-1">{item.label}</p>
                      {item.change !== undefined && (
                        <p className={"text-[11px] mt-0.5 font-medium " + (item.change >= 0 ? "text-[#22C55E]" : "text-[#EF4444]")}>
                          {(item.change >= 0 ? "+" : "") + item.change + "%"}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          case "chart":
            return <ChartBlock key={i} chartType={block.chartType} title={block.title} data={block.data} xKey={block.xKey} yKey={block.yKey} />;
          case "table":
            return <TableBlock key={i} title={block.title || ""} headers={block.headers} rows={block.rows} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function getSlideTitle(slideBlocks: ContentBlock[]): { title: string; content: ContentBlock[] } {
  if (slideBlocks.length > 0 && slideBlocks[0].type === "text") {
    var m = slideBlocks[0].text.match(/^\*\*(.+)\*\*$/);
    if (m) return { title: m[1], content: slideBlocks.slice(1) };
  }
  return { title: "", content: slideBlocks };
}

function getSlideLayout(blocks: ContentBlock[]): string {
  var types = blocks.map(function(b) { return b.type; });
  if (types.includes("kpi_grid") || types.includes("kpi")) return "kpi_row";
  if (types.includes("chart")) return "chart_focus";
  if (types.includes("table")) return "table_focus";
  return "full";
}

export default function ReportSlides({ title, sections }: ReportSlidesProps) {
  var [current, setCurrent] = useState(0);
  var [saving, setSaving] = useState(false);
  var [saved, setSaved] = useState(false);
  var [savedId, setSavedId] = useState<string | null>(null);
  var [saveError, setSaveError] = useState<string | null>(null);
  if (!sections || !Array.isArray(sections)) return null;
  var total = sections.length;

  function prev() { setCurrent(function(c) { return Math.max(0, c - 1); }); }
  function next() { setCurrent(function(c) { return Math.min(total - 1, c + 1); }); }

  async function saveAsReport() {
    if (saving || saved) return;
    setSaving(true);
    setSaveError(null);
    try {
      var res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: title, description: "Generated from chat", theme: "light" }),
      });
      if (!res.ok) {
        var err = await res.json().catch(function() { return { error: "HTTP " + res.status }; });
        console.error("[ReportSlides] Create report failed:", err);
        setSaveError(err.error || "Failed");
        setSaving(false);
        return;
      }
      var json = await res.json();
      var reportId = json.data?.id;
      if (!reportId) { setSaveError("No ID returned"); setSaving(false); return; }
      setSavedId(reportId);

      for (var i = 0; i < sections.length; i++) {
        var p = getSlideTitle(sections[i]);
        var layout = getSlideLayout(p.content);
        if (i === 0 && p.content.length === 0) layout = "title";
        var sr = await fetch("/api/reports/" + reportId + "/slides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ layout: layout, title: p.title || "Slide " + (i + 1), content_blocks: p.content }),
        });
        if (!sr.ok) console.error("[ReportSlides] Slide " + i + " failed:", await sr.text());
      }
      setSaved(true);
    } catch (e) {
      console.error("[ReportSlides] Error:", e);
      setSaveError("Network error");
    } finally {
      setSaving(false);
    }
  }

  if (total === 0) return null;
  var slideBlocks = sections[current];
  if (!slideBlocks || !Array.isArray(slideBlocks)) return null;
  var parsed = getSlideTitle(slideBlocks);
  var isFirstSlide = current === 0 && !parsed.title;

  return (
    <div className="group/report relative">
      <div className="absolute -top-3 right-0 z-10 opacity-0 group-hover/report:opacity-100 transition-opacity">
        {saved ? (
          <a href={"/reports/" + savedId} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-sm transition-colors">
            <ExternalLink size={12} /> View Report
          </a>
        ) : (
          <button onClick={saveAsReport} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0A0A0A] text-white hover:bg-[#333] disabled:opacity-50 shadow-sm transition-colors">
            {saving ? <><div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : <><BookmarkPlus size={12} /> Save as Report</>}
          </button>
        )}
        {saveError && <p className="text-[10px] text-[#EF4444] mt-1 text-right">{saveError}</p>}
      </div>

      <div className="rounded-xl overflow-hidden border border-[#E5E5E5] shadow-sm mt-6">
        <div className="bg-white aspect-[16/9] flex flex-col overflow-hidden">
          {isFirstSlide ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
              <h1 className="text-2xl font-bold text-[#0A0A0A]">{title}</h1>
              <p className="text-sm text-[#737373] mt-2">Generated by Kairo AI</p>
            </div>
          ) : (
            <>
              <div className="px-8 pt-6 shrink-0">
                {parsed.title && <h2 className="text-lg font-bold text-[#0A0A0A] border-b border-[#F0F0F0] pb-2">{parsed.title}</h2>}
              </div>
              <div className="flex-1 px-8 py-4 overflow-y-auto min-h-0">
                <SlideContent blocks={parsed.content} />
              </div>
            </>
          )}
        </div>

        <div className="bg-[#FAFAFA] border-t border-[#E5E5E5] px-4 py-2 flex items-center justify-between">
          <span className="text-[10px] text-[#A3A3A3] font-medium truncate max-w-[40%]">{title}</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {sections.map(function(_, i) {
                return <button key={i} onClick={function() { setCurrent(i); }} className={"h-1.5 rounded-full transition-all " + (i === current ? "w-4 bg-[#0A0A0A]" : "w-1.5 bg-[#D4D4D4] hover:bg-[#A3A3A3]")} />;
              })}
            </div>
            <div className="flex items-center gap-0.5">
              <button onClick={prev} disabled={current === 0} className="h-6 w-6 flex items-center justify-center rounded text-[#525252] hover:bg-[#E5E5E5] disabled:opacity-30 transition-colors"><ChevronLeft size={14} /></button>
              <span className="text-[10px] text-[#A3A3A3] min-w-[28px] text-center">{(current + 1) + "/" + total}</span>
              <button onClick={next} disabled={current === total - 1} className="h-6 w-6 flex items-center justify-center rounded text-[#525252] hover:bg-[#E5E5E5] disabled:opacity-30 transition-colors"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
