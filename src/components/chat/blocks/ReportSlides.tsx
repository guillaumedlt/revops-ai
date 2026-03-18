"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
              <KPICardBlock
                key={i}
                label={block.label}
                value={block.value}
                change={block.change}
                trend={block.trend}
              />
            );
          case "kpi_grid":
            return (
              <div
                key={i}
                className="grid gap-3"
                style={{
                  gridTemplateColumns:
                    "repeat(" + Math.min(block.items.length, 3) + ", 1fr)",
                }}
              >
                {block.items.map(function (item, j) {
                  return (
                    <div
                      key={j}
                      className="bg-white/10 backdrop-blur rounded-xl p-4 text-center"
                    >
                      <p className="text-2xl font-bold text-white">
                        {item.value}
                      </p>
                      <p className="text-xs text-white/60 mt-1">{item.label}</p>
                      {item.change !== undefined && (
                        <p
                          className={
                            "text-xs mt-0.5 " +
                            (item.change >= 0
                              ? "text-emerald-400"
                              : "text-red-400")
                          }
                        >
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
                <ChartBlock
                  chartType={block.chartType}
                  title={block.title}
                  data={block.data}
                  xKey={block.xKey}
                  yKey={block.yKey}
                />
              </div>
            );
          case "table":
            return (
              <div key={i} className="bg-white rounded-xl p-4 overflow-x-auto">
                <TableBlock
                  title={block.title || ""}
                  headers={block.headers}
                  rows={block.rows}
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default function ReportSlides({ title, sections }: ReportSlidesProps) {
  const [current, setCurrent] = useState(0);
  const totalSlides = sections.length;

  function prev() {
    setCurrent(function (c) {
      return Math.max(0, c - 1);
    });
  }
  function next() {
    setCurrent(function (c) {
      return Math.min(totalSlides - 1, c + 1);
    });
  }

  if (totalSlides === 0) return null;

  const slideBlocks = sections[current] || [];
  // Get slide title from first text block if it starts with **
  let slideTitle = "";
  let contentBlocks = slideBlocks;
  if (slideBlocks.length > 0 && slideBlocks[0].type === "text") {
    const firstText = slideBlocks[0].text;
    const boldMatch = firstText.match(/^\*\*(.+)\*\*$/);
    if (boldMatch) {
      slideTitle = boldMatch[1];
      contentBlocks = slideBlocks.slice(1);
    }
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-sm">
      {/* Report title bar */}
      <div className="bg-[#0A0A0A] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#EF4444]" />
          <div className="h-2 w-2 rounded-full bg-[#F59E0B]" />
          <div className="h-2 w-2 rounded-full bg-[#22C55E]" />
          <span className="text-white/80 text-xs font-medium ml-2">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-[10px]">
            {current + 1 + " / " + totalSlides}
          </span>
        </div>
      </div>

      {/* Slide area - 16:9 aspect ratio */}
      <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] aspect-[16/9] flex flex-col p-8 overflow-hidden">
        {/* Slide title */}
        {slideTitle && (
          <h2 className="text-xl font-bold text-white mb-4 shrink-0">
            {slideTitle}
          </h2>
        )}

        {/* Slide content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <SlideContent blocks={contentBlocks} />
        </div>

        {/* Slide number indicator */}
        <div className="absolute bottom-3 right-4">
          <span className="text-white/20 text-[10px]">
            {"Slide " + (current + 1)}
          </span>
        </div>
      </div>

      {/* Navigation */}
      {totalSlides > 1 && (
        <div className="bg-[#FAFAFA] border-t border-[#E5E5E5] px-4 py-2 flex items-center justify-between">
          {/* Slide dots */}
          <div className="flex items-center gap-1.5">
            {sections.map(function (_, i) {
              return (
                <button
                  key={i}
                  onClick={function () {
                    setCurrent(i);
                  }}
                  className={
                    "h-1.5 rounded-full transition-all " +
                    (i === current
                      ? "w-4 bg-[#0A0A0A]"
                      : "w-1.5 bg-[#D4D4D4] hover:bg-[#A3A3A3]")
                  }
                />
              );
            })}
          </div>
          {/* Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              disabled={current === 0}
              className="h-7 w-7 flex items-center justify-center rounded-lg text-[#525252] hover:bg-[#E5E5E5] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              disabled={current === totalSlides - 1}
              className="h-7 w-7 flex items-center justify-center rounded-lg text-[#525252] hover:bg-[#E5E5E5] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
