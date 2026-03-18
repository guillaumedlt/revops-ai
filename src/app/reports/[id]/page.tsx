"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Play, Check, Trash2, BarChart3, Table } from "lucide-react";
import ChartBlock from "@/components/chat/blocks/ChartBlock";
import TableBlock from "@/components/chat/blocks/TableBlock";

interface Slide {
  id: string;
  layout: string;
  title: string | null;
  content_blocks: any[];
  slide_order: number;
}

interface Report {
  id: string;
  name: string;
  description: string | null;
  theme: string;
  status: string;
  slides: Slide[];
}

var SLIDE = { bg: "bg-white", text: "text-[#0A0A0A]", accent: "text-[#737373]", border: "border-[#E5E5E5]", cardBg: "bg-[#FAFAFA]" };

function hasRealContentBlocks(blocks: any[]): boolean {
  if (!blocks || blocks.length === 0) return false;
  return blocks.some(function(b: any) {
    return b.type === "kpi" || b.type === "kpi_grid" || b.type === "chart" || b.type === "table";
  });
}

function SlideBlockRenderer({ blocks }: { blocks: any[] }) {
  var t = SLIDE;
  return (
    <div className="space-y-4 h-full">
      {blocks.map(function(block: any, i: number) {
        if (block.type === "kpi" || block.type === "kpi_grid") {
          var items = block.type === "kpi" ? [block] : (block.items || []);
          var cols = items.length <= 2 ? items.length : items.length <= 4 ? Math.min(items.length, 4) : 3;
          return (
            <div key={i} className="grid gap-4" style={{ gridTemplateColumns: "repeat(" + cols + ", 1fr)" }}>
              {items.map(function(item: any, j: number) {
                return (
                  <div key={j} className={"rounded-xl p-5 text-center " + t.cardBg + " " + t.border + " border"}>
                    <p className={"text-3xl font-bold " + t.text}>{item.value}</p>
                    <p className={"text-xs mt-1.5 " + t.accent}>{item.label}</p>
                    {item.change !== undefined && (
                      <p className={"text-xs mt-1 " + (item.change >= 0 ? "text-[#22C55E]" : "text-[#EF4444]")}>
                        {(item.change >= 0 ? "+" : "") + item.change + "%"}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          );
        }
        if (block.type === "chart") {
          return <ChartBlock key={i} chartType={block.chartType || "bar"} title="" data={block.data || []} xKey={block.xKey} yKey={block.yKey} />;
        }
        if (block.type === "table") {
          return <TableBlock key={i} title="" headers={block.headers || []} rows={block.rows || []} />;
        }
        if (block.type === "text") {
          return <p key={i} className={"text-sm whitespace-pre-wrap " + t.text}>{block.text || block.content || ""}</p>;
        }
        return null;
      })}
    </div>
  );
}

export default function ReportEditorPage({ params }: { params: Promise<{ id: string }> }) {
  var resolvedParams = use(params);
  var reportId = resolvedParams.id;
  var [report, setReport] = useState<Report | null>(null);
  var [loading, setLoading] = useState(true);
  var [activeSlide, setActiveSlide] = useState(0);
  var [editingName, setEditingName] = useState(false);
  var [nameValue, setNameValue] = useState("");
  var [editingSlideTitle, setEditingSlideTitle] = useState(false);
  var [slideTitleValue, setSlideTitleValue] = useState("");
  var [editingContent, setEditingContent] = useState(false);
  var [contentValue, setContentValue] = useState("");
  var router = useRouter();

  useEffect(function() {
    fetch("/api/reports/" + reportId)
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res.data) {
          setReport(res.data);
          setNameValue(res.data.name);
        }
        setLoading(false);
      })
      .catch(function() { setLoading(false); });
  }, [reportId]);

  function updateReport(updates: Record<string, any>) {
    fetch("/api/reports/" + reportId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }).then(function(r) { return r.json(); });
  }

  function deleteSlide(slideId: string) {
    if (!report) return;
    fetch("/api/reports/" + reportId + "/slides/" + slideId, { method: "DELETE" });
    var newSlides = report.slides.filter(function(s) { return s.id !== slideId; });
    setReport(Object.assign({}, report, { slides: newSlides }));
    if (activeSlide >= newSlides.length) setActiveSlide(Math.max(0, newSlides.length - 1));
  }

  function updateSlide(slideId: string, updates: Record<string, any>) {
    if (!report) return;
    fetch("/api/reports/" + reportId + "/slides/" + slideId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    var newSlides = report.slides.map(function(s) {
      if (s.id === slideId) return Object.assign({}, s, updates);
      return s;
    });
    setReport(Object.assign({}, report, { slides: newSlides }));
  }

  function handleSaveName() {
    setEditingName(false);
    if (report && nameValue !== report.name) {
      updateReport({ name: nameValue });
      setReport(Object.assign({}, report, { name: nameValue }));
    }
  }

  function handleSaveSlideTitle() {
    setEditingSlideTitle(false);
    if (report && report.slides[activeSlide]) {
      var slide = report.slides[activeSlide];
      updateSlide(slide.id, { title: slideTitleValue });
    }
  }

  function handleSaveContent() {
    setEditingContent(false);
    if (report && report.slides[activeSlide]) {
      var slide = report.slides[activeSlide];
      var blocks = [{ type: "text", content: contentValue }];
      updateSlide(slide.id, { content_blocks: blocks });
    }
  }



  function handlePublish() {
    if (!report) return;
    var newStatus = report.status === "published" ? "draft" : "published";
    updateReport({ status: newStatus });
    setReport(Object.assign({}, report, { status: newStatus }));
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-[#A3A3A3]">Report not found</p>
      </div>
    );
  }

  var s = SLIDE;
  var currentSlide = report.slides[activeSlide] || null;

  function getContentText(slide: Slide | null) {
    if (!slide || !slide.content_blocks || slide.content_blocks.length === 0) return "";
    var textBlock = slide.content_blocks.find(function(b: any) { return b.type === "text"; });
    return textBlock ? textBlock.content || "" : "";
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-14 border-b border-[#E5E5E5] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={function() { router.push("/reports"); }}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] text-[#737373]"
          >
            <ArrowLeft size={18} />
          </button>
          {editingName ? (
            <input
              value={nameValue}
              onChange={function(e) { setNameValue(e.target.value); }}
              onBlur={handleSaveName}
              onKeyDown={function(e) { if (e.key === "Enter") handleSaveName(); }}
              className="text-lg font-semibold text-[#0A0A0A] bg-transparent border-b-2 border-[#0A0A0A] focus:outline-none px-1"
              autoFocus
            />
          ) : (
            <button
              onClick={function() { setEditingName(true); setNameValue(report!.name); }}
              className="text-lg font-semibold text-[#0A0A0A] hover:bg-[#F5F5F5] rounded px-2 py-0.5 transition-colors"
            >
              {report.name}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">          {report.slides.length > 0 && (
            <button
              onClick={function() { router.push("/reports/" + reportId + "/present"); }}
              className="flex items-center gap-1.5 px-3 h-8 rounded-lg text-sm text-[#525252] hover:bg-[#F5F5F5] transition-colors"
            >
              <Play size={14} />
              Present
            </button>
          )}
          <button
            onClick={handlePublish}
            className={"flex items-center gap-1.5 px-3 h-8 rounded-lg text-sm font-medium transition-colors " + (report.status === "published" ? "bg-[#22C55E] text-white hover:bg-[#16A34A]" : "bg-[#0A0A0A] text-white hover:bg-[#333]")}
          >
            <Check size={14} />
            {report.status === "published" ? "Published" : "Publish"}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide thumbnails sidebar */}
        <div className="w-[180px] border-r border-[#E5E5E5] bg-[#FAFAFA] flex flex-col overflow-y-auto shrink-0">
          <div className="p-3 space-y-2 flex-1">
            {report.slides.map(function(slide, index) {
              var slideTheme = SLIDE;
              return (
                <div key={slide.id} className="group relative">
                  <button
                    onClick={function() { setActiveSlide(index); setEditingContent(false); setEditingSlideTitle(false); }}
                    className={"w-full rounded-lg overflow-hidden transition-all " + (activeSlide === index ? "ring-2 ring-[#0A0A0A] shadow-sm" : "border border-[#E5E5E5] hover:border-[#D4D4D4]")}
                  >
                    <div className={"h-20 flex items-center justify-center p-2 " + slideTheme.bg}>
                      <span className={"text-[8px] text-center truncate " + slideTheme.text}>
                        {slide.title || slide.layout}
                      </span>
                    </div>
                    <div className="bg-white px-2 py-1 border-t border-[#F0F0F0]">
                      <span className="text-[10px] text-[#A3A3A3]">{String(index + 1)}</span>
                    </div>
                  </button>
                  <button
                    onClick={function(e) { e.stopPropagation(); deleteSlide(slide.id); }}
                    className="absolute top-1 right-1 hidden group-hover:flex h-5 w-5 items-center justify-center rounded bg-white/80 text-[#A3A3A3] hover:text-[#EF4444] transition-colors"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slide preview */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentSlide ? (
            <>
              {/* Slide render area */}
              <div className="flex-1 flex items-center justify-center p-8 bg-[#F5F5F5] overflow-auto">
                <div className={"w-full max-w-3xl aspect-[16/9] rounded-xl shadow-lg overflow-hidden flex flex-col " + s.bg}>
                  {/* Slide content */}
                  <div className="flex-1 flex flex-col p-8">
                    {currentSlide.layout === "title" && (
                      <div className="flex-1 flex flex-col items-center justify-center text-center">
                        {editingSlideTitle ? (
                          <input
                            value={slideTitleValue}
                            onChange={function(e) { setSlideTitleValue(e.target.value); }}
                            onBlur={handleSaveSlideTitle}
                            onKeyDown={function(e) { if (e.key === "Enter") handleSaveSlideTitle(); }}
                            className={"text-3xl font-bold bg-transparent border-b-2 border-current focus:outline-none text-center w-full max-w-lg " + s.text}
                            autoFocus
                          />
                        ) : (
                          <button
                            onClick={function() { setEditingSlideTitle(true); setSlideTitleValue(currentSlide!.title || ""); }}
                            className={"text-3xl font-bold hover:opacity-70 transition-opacity " + s.text}
                          >
                            {currentSlide.title || "Click to edit title"}
                          </button>
                        )}
                        {editingContent ? (
                          <textarea
                            value={contentValue}
                            onChange={function(e) { setContentValue(e.target.value); }}
                            onBlur={handleSaveContent}
                            className={"mt-4 text-lg bg-transparent border-b border-current focus:outline-none text-center w-full max-w-md resize-none " + s.accent}
                            rows={2}
                            autoFocus
                          />
                        ) : (
                          <button
                            onClick={function() { setEditingContent(true); setContentValue(getContentText(currentSlide)); }}
                            className={"mt-4 text-lg hover:opacity-70 transition-opacity " + s.accent}
                          >
                            {getContentText(currentSlide) || "Click to edit subtitle"}
                          </button>
                        )}
                      </div>
                    )}

                    {currentSlide.layout === "full" && (
                      <div className="flex-1 flex flex-col">
                        {currentSlide.title && (
                          <h2 className={"text-xl font-semibold mb-4 " + s.text}>{currentSlide.title}</h2>
                        )}
                        {hasRealContentBlocks(currentSlide.content_blocks) ? (
                          <div className="flex-1">
                            <SlideBlockRenderer blocks={currentSlide.content_blocks} />
                          </div>
                        ) : editingContent ? (
                          <textarea
                            value={contentValue}
                            onChange={function(e) { setContentValue(e.target.value); }}
                            onBlur={handleSaveContent}
                            className={"flex-1 bg-transparent focus:outline-none resize-none text-sm " + s.text}
                            autoFocus
                          />
                        ) : (
                          <button
                            onClick={function() { setEditingContent(true); setContentValue(getContentText(currentSlide)); }}
                            className={"flex-1 text-left text-sm hover:opacity-70 transition-opacity " + s.text}
                          >
                            {getContentText(currentSlide) || "Click to edit content"}
                          </button>
                        )}
                      </div>
                    )}

                    {currentSlide.layout === "two_column" && (
                      <div className="flex-1 flex gap-6">
                        <div className={"flex-1 rounded-lg p-4 " + s.cardBg + " " + s.border + " border"}>
                          <p className={"text-xs " + s.accent}>Column 1</p>
                        </div>
                        <div className={"flex-1 rounded-lg p-4 " + s.cardBg + " " + s.border + " border"}>
                          <p className={"text-xs " + s.accent}>Column 2</p>
                        </div>
                      </div>
                    )}

                    {currentSlide.layout === "kpi_row" && (
                      <div className="flex-1 flex flex-col">
                        {currentSlide.title && (
                          <h2 className={"text-xl font-semibold mb-4 " + s.text}>{currentSlide.title}</h2>
                        )}
                        {hasRealContentBlocks(currentSlide.content_blocks) ? (
                          <div className="flex-1 flex items-center">
                            <div className="w-full">
                              <SlideBlockRenderer blocks={currentSlide.content_blocks} />
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1 flex items-center">
                            <div className="grid grid-cols-3 gap-4 w-full">
                              {[1, 2, 3].map(function(i) {
                                return (
                                  <div key={i} className={"rounded-lg p-4 text-center " + s.cardBg + " " + s.border + " border"}>
                                    <p className={"text-2xl font-bold " + s.text}>--</p>
                                    <p className={"text-xs mt-1 " + s.accent}>{"KPI " + i}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {currentSlide.layout === "chart_focus" && (
                      <div className="flex-1 flex flex-col">
                        {currentSlide.title && (
                          <h2 className={"text-xl font-semibold mb-4 " + s.text}>{currentSlide.title}</h2>
                        )}
                        {hasRealContentBlocks(currentSlide.content_blocks) ? (
                          <div className="flex-1">
                            <SlideBlockRenderer blocks={currentSlide.content_blocks} />
                          </div>
                        ) : (
                          <div className={"flex-1 rounded-lg flex items-center justify-center " + s.cardBg + " " + s.border + " border"}>
                            <BarChart3 size={48} className={s.accent} />
                          </div>
                        )}
                      </div>
                    )}

                    {currentSlide.layout === "table_focus" && (
                      <div className="flex-1 flex flex-col">
                        {currentSlide.title && (
                          <h2 className={"text-xl font-semibold mb-4 " + s.text}>{currentSlide.title}</h2>
                        )}
                        {hasRealContentBlocks(currentSlide.content_blocks) ? (
                          <div className="flex-1">
                            <SlideBlockRenderer blocks={currentSlide.content_blocks} />
                          </div>
                        ) : (
                          <div className={"flex-1 rounded-lg flex items-center justify-center " + s.cardBg + " " + s.border + " border"}>
                            <Table size={48} className={s.accent} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="h-12 border-t border-[#E5E5E5] flex items-center justify-center px-4 shrink-0 bg-white">
                <span className="text-xs text-[#A3A3A3]">
                  {"Slide " + (activeSlide + 1) + " of " + report.slides.length}
                </span>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-[#F5F5F5]">
              <div className="text-center">
                <p className="text-sm text-[#A3A3A3] mb-2">No slides in this report</p>
                <p className="text-xs text-[#D4D4D4]">Generate slides from the chat using /report</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
