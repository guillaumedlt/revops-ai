"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, BookmarkPlus, Check } from "lucide-react";
import KPICardBlock from "./KPICardBlock";
import ChartBlock from "./ChartBlock";
import TableBlock from "./TableBlock";
import TextBlock from "./TextBlock";
import type { ContentBlock } from "@/types/chat-blocks";

interface ReportSlidesProps {
  title: string;
  sections: ContentBlock[][];
}

function SlideContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-3">
      {blocks.map(function (block, i) {
        switch (block.type) {
          case "text":
            return <TextBlock key={i} text={block.text} />;
          case "kpi":
            return (
              <KPICardBlock key={i} label={block.label} value={block.value} change={block.change} trend={block.trend} />
            );
          case "kpi_grid":
            return (
              <div key={i} className="grid gap-3" style={{ gridTemplateColumns: "repeat(" + Math.min(block.items.length, 3) + ", 1fr)" }}>
                {block.items.map(function (item, j) {
                  return (
                    <div key={j} className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-white">{item.value}</p>
                      <p className="text-xs text-white/60 mt-1">{item.label}</p>
                      {item.change !== undefined && (
                        <p className={"text-xs mt-0.5 " + (item.change >= 0 ? "text-emerald-400" : "text-red-400")}>
                          {(item.change >= 0 ? "+" : "") + item.change + "%"}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          case "chart":
            return (
              <div key={i} className="bg-white rounded-xl p-4">
                <ChartBlock chartType={block.chartType} title={block.title} data={block.data} xKey={block.xKey} yKey={block.yKey} />
              </div>
            );
          case "table":
            return (
              <div key={i} className="bg-white rounded-xl p-4 overflow-x-auto">
                <TableBlock title={block.title || ""} headers={block.headers} rows={block.rows} />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function getSlideTitle(slideBlocks: ContentBlock[]): { title: string; content: ContentBlock[] } {
  if (slideBlocks.length > 0 && slideBlocks[0].type === "text") {
    var firstText = slideBlocks[0].text;
    var boldMatch = firstText.match(/^\*\*(.+)\*\*$/);
    if (boldMatch) {
      return { title: boldMatch[1], content: slideBlocks.slice(1) };
    }
  }
  return { title: "", content: slideBlocks };
}

function getSlideLayout(blocks: ContentBlock[]): string {
  if (blocks.length === 0) return "full";
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
  var [savedReportId, setSavedReportId] = useState<string | null>(null);
  var totalSlides = sections.length;

  function prev() { setCurrent(function (c) { return Math.max(0, c - 1); }); }
  function next() { setCurrent(function (c) { return Math.min(totalSlides - 1, c + 1); }); }

  async function saveAsReport() {
    if (saving || saved) return;
    setSaving(true);
    try {
      // Create the report
      var res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: title, description: "Generated from chat", theme: "dark" }),
      });
      var json = await res.json();
      var reportId = json.data?.id;
      if (!reportId) { setSaving(false); return; }
      setSavedReportId(reportId);

      // Create each slide
      for (var i = 0; i < sections.length; i++) {
        var parsed = getSlideTitle(sections[i]);
        var layout = getSlideLayout(parsed.content);
        // For title slide (first slide with only text), use title layout
        if (i === 0 && parsed.content.length === 0) layout = "title";

        await fetch("/api/reports/" + reportId + "/slides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            layout: layout,
            title: parsed.title || "Slide " + (i + 1),
            content_blocks: parsed.content,
          }),
        });
      }

      setSaved(true);
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  }

  if (totalSlides === 0) return null;

  var slideBlocks = sections[current] || [];
  var parsed = getSlideTitle(slideBlocks);

  return (
    <div className="group/report rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-sm relative">
      {/* Save as Report button - appears on hover */}
      <div className="absolute top-14 right-3 z-10 opacity-0 group-hover/report:opacity-100 transition-opacity">
        <button
          onClick={saveAsReport}
          disabled={saving || saved}
          className={"flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all backdrop-blur " + (saved ? "bg-[#22C55E]/90 text-white" : "bg-white/90 text-[#0A0A0A] hover:bg-white shadow-sm border border-[#E5E5E5]")}
        >
          {saved ? (
            <>
              <Check size={13} />
              <a href={"/reports/" + savedReportId}>View Report</a>
            </>
          ) : saving ? (
            <>
              <div className="h-3 w-3 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <BookmarkPlus size={13} />
              Save as Report
            </>
          )}
        </button>
      </div>

      {/* Report title bar */}
      <div className="bg-[#0A0A0A] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
          <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
          <div className="h-2 w-2 rounded-full bg-[#22C55E]" />
          <span className="text-white/80 text-xs font-medium ml-2">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-[10px]">{(current + 1) + " / " + totalSlides}</span>
        </div>
      </div>

      {/* Slide area - 16:9 */}
      <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] aspect-[16/9] flex flex-col p-8 overflow-hidden">
        {parsed.title && (
          <h2 className="text-xl font-bold text-white mb-4 shrink-0">{parsed.title}</h2>
        )}
        <div className="flex-1 overflow-y-auto min-h-0">
          <SlideContent blocks={parsed.content} />
        </div>
        <div className="absolute bottom-3 right-4">
          <span className="text-white/20 text-[10px]">{"Slide " + (current + 1)}</span>
        </div>
      </div>

      {/* Navigation */}
      {totalSlides > 1 && (
        <div className="bg-[#FAFAFA] border-t border-[#E5E5E5] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {sections.map(function (_, i) {
              return (
                <button
                  key={i}
                  onClick={function () { setCurrent(i); }}
                  className={"h-1.5 rounded-full transition-all " + (i === current ? "w-4 bg-[#0A0A0A]" : "w-1.5 bg-[#D4D4D4] hover:bg-[#A3A3A3]")}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={prev} disabled={current === 0} className="h-7 w-7 flex items-center justify-center rounded-lg text-[#525252] hover:bg-[#E5E5E5] disabled:opacity-30 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} disabled={current === totalSlides - 1} className="h-7 w-7 flex items-center justify-center rounded-lg text-[#525252] hover:bg-[#E5E5E5] disabled:opacity-30 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
