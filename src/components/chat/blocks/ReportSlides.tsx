"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, LayoutDashboard, Plus, Check } from "lucide-react";
import KPICardBlock from "./KPICardBlock";
import ChartBlock from "./ChartBlock";
import TableBlock from "./TableBlock";
import ProgressBlock from "./ProgressBlock";
import FunnelBlock from "./FunnelBlock";
import ComparisonBlock from "./ComparisonBlock";
import ScorecardBlock from "./ScorecardBlock";
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
              <div key={i} className="text-[13px] text-[#111] leading-relaxed">
                {block.text.split("\n").map(function(line, li) {
                  if (line.startsWith("- ")) return <div key={li} className="flex gap-2 py-0.5"><span className="text-[#BBB]">•</span><span>{line.slice(2)}</span></div>;
                  if (line.startsWith("**") && line.endsWith("**")) return <p key={li} className="font-semibold text-[#111] mt-2">{line.slice(2, -2)}</p>;
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
                    <div key={j} className="border border-[#EAEAEA] rounded-lg p-4 text-center bg-[#FAFAFA]">
                      <p className="text-2xl font-bold text-[#111]">{item.value}</p>
                      <p className="text-[11px] text-[#999] mt-1">{item.label}</p>
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
            return <ChartBlock key={i} chartType={block.chartType} title={block.title} data={block.data} xKey={block.xKey} yKey={block.yKey} yKeys={block.yKeys} colors={block.colors} />;
          case "table":
            return <TableBlock key={i} title={block.title || ""} headers={block.headers} rows={block.rows} sortable={block.sortable} searchable={block.searchable} pageSize={block.pageSize} />;
          case "progress":
            return <ProgressBlock key={i} label={block.label} value={block.value} max={block.max} target={block.target} color={block.color} />;
          case "funnel":
            return <FunnelBlock key={i} title={block.title} steps={block.steps} />;
          case "comparison":
            return <ComparisonBlock key={i} title={block.title} items={block.items} />;
          case "scorecard":
            return <ScorecardBlock key={i} title={block.title} value={block.value} target={block.target} score={block.score} breakdown={block.breakdown} />;
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

function AddReportToDashboard({ title, sections }: { title: string; sections: ContentBlock[][] }) {
  var [open, setOpen] = useState(false);
  var [dashboards, setDashboards] = useState<any[]>([]);
  var [adding, setAdding] = useState<string | null>(null);
  var [added, setAdded] = useState<Set<string>>(new Set());

  function handleOpen() {
    setOpen(!open);
    if (!open) {
      fetch("/api/dashboards").then(function(r) { return r.json(); }).then(function(res) {
        setDashboards(res.data?.dashboards ?? []);
      }).catch(function() {});
    }
  }

  async function addWidget(dashboardId: string) {
    setAdding(dashboardId);
    var nextY = 0;
    try {
      var dr = await fetch("/api/dashboards/" + dashboardId);
      var dd = await dr.json();
      var widgets = dd.data?.widgets || [];
      nextY = widgets.reduce(function(max: number, w: any) { return Math.max(max, (w.y || 0) + (w.h || 2)); }, 0);
    } catch {}

    await fetch("/api/dashboards/" + dashboardId + "/widgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        widget_type: "report",
        title: title,
        config: { title: title, sections: sections },
        x: 0, y: nextY, w: 12, h: 6,
      }),
    });
    setAdding(null);
    setAdded(function(prev) { return new Set(prev).add(dashboardId); });
  }

  return (
    <div className="relative">
      <button onClick={handleOpen} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#111] text-white hover:bg-[#333] shadow-sm transition-colors">
        <LayoutDashboard size={12} /> Ajouter au dashboard
      </button>
      {open && (
        <div className="absolute bottom-full right-0 mb-1 w-[220px] rounded-lg border border-[#EAEAEA] bg-white shadow-lg p-2 z-50">
          <p className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-[#BBB]">Ajouter au dashboard</p>
          {dashboards.length === 0 ? (
            <p className="px-2 py-2 text-xs text-[#999]">No dashboards yet</p>
          ) : dashboards.map(function(d) {
            return (
              <button key={d.id} onClick={function() { addWidget(d.id); }} disabled={adding === d.id || added.has(d.id)}
                className="flex w-full items-center justify-between px-2 py-2 rounded-lg text-sm text-[#555] hover:bg-[#FAFAFA] disabled:opacity-50">
                <span className="truncate">{d.name}</span>
                {added.has(d.id) ? <Check size={14} className="text-[#22C55E]" /> : adding === d.id ? <div className="h-3 w-3 border-2 border-[#EAEAEA] border-t-[#737373] rounded-full animate-spin" /> : <Plus size={14} className="text-[#BBB]" />}
              </button>
            );
          })}
          <a href="/dashboards" className="flex items-center gap-1 px-2 py-2 text-xs text-[#999] hover:text-[#111]"><Plus size={12} /> Create new dashboard</a>
        </div>
      )}
    </div>
  );
}

export default function ReportSlides({ title, sections }: ReportSlidesProps) {
  var [current, setCurrent] = useState(0);

  if (!sections || !Array.isArray(sections) || sections.length === 0) return null;
  var total = sections.length;

  function prev() { setCurrent(function(c) { return Math.max(0, c - 1); }); }
  function next() { setCurrent(function(c) { return Math.min(total - 1, c + 1); }); }

  var slideBlocks = sections[current];
  if (!slideBlocks || !Array.isArray(slideBlocks)) return null;
  var parsed = getSlideTitle(slideBlocks);
  var isFirstSlide = current === 0 && !parsed.title;

  return (
    <div className="group/report relative">
      {/* Ajouter au dashboard button on hover */}
      <div className="absolute -top-3 right-0 z-10 opacity-0 group-hover/report:opacity-100 transition-opacity">
        <AddReportToDashboard title={title} sections={sections} />
      </div>

      <div className="rounded-lg overflow-hidden border border-[#EAEAEA] shadow-sm mt-6">
        <div className="bg-white aspect-[16/9] flex flex-col overflow-hidden">
          {isFirstSlide ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
              <h1 className="text-2xl font-bold text-[#111]">{title}</h1>
              <p className="text-sm text-[#999] mt-2">Generated by Kairo AI</p>
            </div>
          ) : (
            <>
              <div className="px-8 pt-6 shrink-0">
                {parsed.title && <h2 className="text-lg font-bold text-[#111] border-b border-[#F0F0F0] pb-2">{parsed.title}</h2>}
              </div>
              <div className="flex-1 px-8 py-4 overflow-y-auto min-h-0">
                <SlideContent blocks={parsed.content} />
              </div>
            </>
          )}
        </div>

        <div className="bg-[#FAFAFA] border-t border-[#EAEAEA] px-4 py-2 flex items-center justify-between">
          <span className="text-[10px] text-[#BBB] font-medium truncate max-w-[40%]">{title}</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {sections.map(function(_, i) {
                return <button key={i} onClick={function() { setCurrent(i); }} className={"h-1.5 rounded-full transition-all " + (i === current ? "w-4 bg-[#111]" : "w-1.5 bg-[#D4D4D4] hover:bg-[#A3A3A3]")} />;
              })}
            </div>
            <div className="flex items-center gap-0.5">
              <button onClick={prev} disabled={current === 0} className="h-6 w-6 flex items-center justify-center rounded text-[#555] hover:bg-[#F0F0F0] disabled:opacity-30 transition-colors"><ChevronLeft size={14} /></button>
              <span className="text-[10px] text-[#BBB] min-w-[28px] text-center">{(current + 1) + "/" + total}</span>
              <button onClick={next} disabled={current === total - 1} className="h-6 w-6 flex items-center justify-center rounded text-[#555] hover:bg-[#F0F0F0] disabled:opacity-30 transition-colors"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
