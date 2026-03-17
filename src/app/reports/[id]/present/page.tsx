"use client";

import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Table } from "lucide-react";

interface Slide {
  id: string;
  layout: string;
  title: string | null;
  content_blocks: any[];
  slide_order: number;
}

var THEMES: Record<string, { bg: string; text: string; accent: string; border: string; cardBg: string }> = {
  light: { bg: "bg-white", text: "text-[#0A0A0A]", accent: "text-[#0A0A0A]", border: "border-[#E5E5E5]", cardBg: "bg-[#FAFAFA]" },
  dark: { bg: "bg-[#0A0A0A]", text: "text-white", accent: "text-[#A3A3A3]", border: "border-[#333]", cardBg: "bg-[#1A1A1A]" },
  gradient: { bg: "bg-gradient-to-br from-[#667eea] to-[#764ba2]", text: "text-white", accent: "text-white/70", border: "border-white/20", cardBg: "bg-white/10" },
  minimal: { bg: "bg-[#FAFAF8]", text: "text-[#333]", accent: "text-[#666]", border: "border-[#E8E8E5]", cardBg: "bg-white" },
};

export default function PresentPage({ params }: { params: Promise<{ id: string }> }) {
  var resolvedParams = use(params);
  var reportId = resolvedParams.id;
  var [slides, setSlides] = useState<Slide[]>([]);
  var [theme, setTheme] = useState("light");
  var [current, setCurrent] = useState(0);
  var [loading, setLoading] = useState(true);
  var router = useRouter();

  useEffect(function() {
    fetch("/api/reports/" + reportId)
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res.data) {
          setSlides(res.data.slides || []);
          setTheme(res.data.theme || "light");
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
  var t = THEMES[theme] || THEMES.light;

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
              <p className={"text-lg whitespace-pre-wrap " + t.text}>{getContentText(slide)}</p>
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
            </div>
          )}

          {slide.layout === "chart_focus" && (
            <div className="w-full max-w-4xl">
              {slide.title && <h2 className={"text-3xl font-semibold mb-6 " + t.text}>{slide.title}</h2>}
              <div className={"h-80 rounded-xl flex items-center justify-center " + t.cardBg + " " + t.border + " border"}>
                <BarChart3 size={64} className={t.accent} />
              </div>
            </div>
          )}

          {slide.layout === "table_focus" && (
            <div className="w-full max-w-4xl">
              {slide.title && <h2 className={"text-3xl font-semibold mb-6 " + t.text}>{slide.title}</h2>}
              <div className={"h-80 rounded-xl flex items-center justify-center " + t.cardBg + " " + t.border + " border"}>
                <Table size={64} className={t.accent} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slide counter */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <div className={"px-3 py-1 rounded-full text-xs " + (theme === "light" || theme === "minimal" ? "bg-[#0A0A0A]/10 text-[#0A0A0A]/60" : "bg-white/10 text-white/60")}>
          {(current + 1) + " / " + slides.length}
        </div>
      </div>

      {/* ESC hint */}
      <div className="fixed top-4 right-4">
        <button
          onClick={function(e) { e.stopPropagation(); router.push("/reports/" + reportId); }}
          className={"px-2 py-1 rounded text-xs " + (theme === "light" || theme === "minimal" ? "bg-[#0A0A0A]/10 text-[#0A0A0A]/60 hover:bg-[#0A0A0A]/20" : "bg-white/10 text-white/60 hover:bg-white/20")}
        >
          ESC
        </button>
      </div>
    </div>
  );
}
