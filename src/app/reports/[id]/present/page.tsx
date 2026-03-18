"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Table } from "lucide-react";
import ChartBlock from "@/components/chat/blocks/ChartBlock";
import TableBlock from "@/components/chat/blocks/TableBlock";

interface Slide {
  id: string;
  layout: string;
  title: string | null;
  content_blocks: any[];
  slide_order: number;
}

var S = { bg: "bg-white", text: "text-[#0A0A0A]", accent: "text-[#737373]", border: "border-[#E5E5E5]", cardBg: "bg-[#FAFAFA]" };

function hasRealContentBlocks(blocks: any[]): boolean {
  if (!blocks || blocks.length === 0) return false;
  return blocks.some(function(b: any) {
    return b.type === "kpi" || b.type === "kpi_grid" || b.type === "chart" || b.type === "table";
  });
}

function SlideBlockRenderer({ blocks, theme: themeName }: { blocks: any[]; theme: string }) {
  var t = THEMES[themeName] || THEMES.light;
  return (
    <div className="space-y-6 h-full">
      {blocks.map(function(block: any, i: number) {
        if (block.type === "kpi" || block.type === "kpi_grid") {
          var items = block.type === "kpi" ? [block] : (block.items || []);
          var cols = items.length <= 2 ? items.length : items.length <= 4 ? Math.min(items.length, 4) : 3;
          return (
            <div key={i} className="grid gap-6" style={{ gridTemplateColumns: "repeat(" + cols + ", 1fr)" }}>
              {items.map(function(item: any, j: number) {
                return (
                  <div key={j} className={"rounded-xl p-6 text-center " + t.cardBg + " " + t.border + " border"}>
                    <p className={"text-4xl font-bold " + t.text}>{item.value}</p>
                    <p className={"text-sm mt-2 " + t.accent}>{item.label}</p>
                    {item.change !== undefined && (
                      <p className={"text-sm mt-1 " + (item.change >= 0 ? "text-[#22C55E]" : "text-[#EF4444]")}>
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
          return <p key={i} className={"text-lg whitespace-pre-wrap " + t.text}>{block.text || block.content || ""}</p>;
        }
        return null;
      })}
    </div>
  );
}

export default function PresentPage({ params }: { params: Promise<{ id: string }> }) {
  var resolvedParams = use(params);
  var reportId = resolvedParams.id;
  var [slides, setSlides] = useState<Slide[]>([]);
  
  var [current, setCurrent] = useState(0);
  var [loading, setLoading] = useState(true);
  var router = useRouter();

  useEffect(function() {
    fetch("/api/reports/" + reportId)
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res.data) {
          setSlides(res.data.slides || []);
          
        }
        setLoading(false);
      })
      .catch(function() { setLoading(false); });
  }, [reportId]);

  var handleKeyDown = useCallback(function(e: KeyboardEvent) {
    if (e.key === "Escape") {
      router.push("/reports/" + reportId);
    } else if (e.key === "ArrowRight" || e.key === " ") {
      setCurrent(function(prev) { return Math.min(prev + 1, slides.length - 1); });
    } else if (e.key === "ArrowLeft") {
      setCurrent(function(prev) { return Math.max(prev - 1, 0); });
    }
  }, [slides.length, reportId, router]);

  useEffect(function() {
    document.addEventListener("keydown", handleKeyDown);
    return function() { document.removeEventListener("keydown", handleKeyDown); };
  }, [handleKeyDown]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0A0A0A] flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-[#333] border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="fixed inset-0 bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-white/50 text-sm">No slides to present</p>
      </div>
    );
  }

  var slide = slides[current];
  var t = S;

  function getContentText(s: Slide) {
    if (!s.content_blocks || s.content_blocks.length === 0) return "";
    var textBlock = s.content_blocks.find(function(b: any) { return b.type === "text"; });
    return textBlock ? textBlock.content || "" : "";
  }

  return (
    <div
      className={"fixed inset-0 flex items-center justify-center cursor-pointer " + t.bg}
      onClick={function() { setCurrent(function(prev) { return Math.min(prev + 1, slides.length - 1); }); }}
    >
      <div className="w-full h-full flex flex-col p-12">
        <div className="flex-1 flex flex-col items-center justify-center">
          {slide.layout === "title" && (
            <div className="text-center">
              <h1 className={"text-5xl font-bold " + t.text}>{slide.title || ""}</h1>
              {getContentText(slide) && (
                <p className={"text-2xl mt-6 " + t.accent}>{getContentText(slide)}</p>
              )}
            </div>
          )}

          {slide.layout === "full" && (
            <div className="w-full max-w-4xl">
              {slide.title && <h2 className={"text-3xl font-semibold mb-6 " + t.text}>{slide.title}</h2>}
              {hasRealContentBlocks(slide.content_blocks) ? (
                <SlideBlockRenderer blocks={slide.content_blocks} theme={theme} />
              ) : (
                <p className={"text-lg whitespace-pre-wrap " + t.text}>{getContentText(slide)}</p>
              )}
            </div>
          )}

          {slide.layout === "two_column" && (
            <div className="w-full max-w-4xl flex gap-8">
              <div className={"flex-1 rounded-xl p-6 " + t.cardBg + " " + t.border + " border"}>
                <p className={t.accent}>Column 1</p>
              </div>
              <div className={"flex-1 rounded-xl p-6 " + t.cardBg + " " + t.border + " border"}>
                <p className={t.accent}>Column 2</p>
              </div>
            </div>
          )}

          {slide.layout === "kpi_row" && (
            <div className="w-full max-w-4xl">
              {slide.title && <h2 className={"text-3xl font-semibold mb-8 text-center " + t.text}>{slide.title}</h2>}
              {hasRealContentBlocks(slide.content_blocks) ? (
                <SlideBlockRenderer blocks={slide.content_blocks} theme={theme} />
              ) : (
                <div className="grid grid-cols-3 gap-6">
                  {[1, 2, 3].map(function(i) {
                    return (
                      <div key={i} className={"rounded-xl p-6 text-center " + t.cardBg + " " + t.border + " border"}>
                        <p className={"text-4xl font-bold " + t.text}>--</p>
                        <p className={"text-sm mt-2 " + t.accent}>{"KPI " + i}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {slide.layout === "chart_focus" && (
            <div className="w-full max-w-4xl">
              {slide.title && <h2 className={"text-3xl font-semibold mb-6 " + t.text}>{slide.title}</h2>}
              {hasRealContentBlocks(slide.content_blocks) ? (
                <SlideBlockRenderer blocks={slide.content_blocks} theme={theme} />
              ) : (
                <div className={"h-80 rounded-xl flex items-center justify-center " + t.cardBg + " " + t.border + " border"}>
                  <BarChart3 size={64} className={t.accent} />
                </div>
              )}
            </div>
          )}

          {slide.layout === "table_focus" && (
            <div className="w-full max-w-4xl">
              {slide.title && <h2 className={"text-3xl font-semibold mb-6 " + t.text}>{slide.title}</h2>}
              {hasRealContentBlocks(slide.content_blocks) ? (
                <SlideBlockRenderer blocks={slide.content_blocks} theme={theme} />
              ) : (
                <div className={"h-80 rounded-xl flex items-center justify-center " + t.cardBg + " " + t.border + " border"}>
                  <Table size={64} className={t.accent} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Slide counter */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <div className={"px-3 py-1 rounded-full text-xs " + (true ? "bg-[#0A0A0A]/10 text-[#0A0A0A]/60" : "bg-white/10 text-white/60")}>
          {(current + 1) + " / " + slides.length}
        </div>
      </div>

      {/* ESC hint */}
      <div className="fixed top-4 right-4">
        <button
          onClick={function(e) { e.stopPropagation(); router.push("/reports/" + reportId); }}
          className={"px-2 py-1 rounded text-xs " + (true ? "bg-[#0A0A0A]/10 text-[#0A0A0A]/60 hover:bg-[#0A0A0A]/20" : "bg-white/10 text-white/60 hover:bg-white/20")}
        >
          ESC
        </button>
      </div>
    </div>
  );
}
