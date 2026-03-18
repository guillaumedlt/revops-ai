"use client";

import type { ContentBlock } from "@/types/chat-blocks";
import TextBlock from "./TextBlock";
import KPICardBlock from "./KPICardBlock";
import ChartBlock from "./ChartBlock";
import TableBlock from "./TableBlock";
import ReportSlides from "./ReportSlides";
import AddToDashboard from "../AddToDashboard";
import AddToReport from "../AddToReport";

function BlockWrapper({ block, children }: { block: ContentBlock; children: React.ReactNode }) {
  // Only show AddToDashboard for actionable blocks (not text, alert, or report)
  if (block.type === "text" || block.type === "alert" || block.type === "report") {
    return <>{children}</>;
  }

  return (
    <div className="group/block relative">
      {children}
      <div className="absolute top-2 right-2 opacity-0 group-hover/block:opacity-100 transition-opacity flex items-center gap-0.5">
        <AddToDashboard
          block={block}
          blockTitle={
            block.type === "chart" ? block.title :
            block.type === "table" ? block.title :
            block.type === "kpi" ? block.label :
            block.type === "kpi_grid" ? "KPI Grid" :
            "Widget"
          }
        />
        <AddToReport
          block={block}
          blockTitle={
            block.type === "chart" ? block.title :
            block.type === "table" ? block.title :
            block.type === "kpi" ? block.label :
            block.type === "kpi_grid" ? "KPI Grid" :
            "Widget"
          }
        />
      </div>
    </div>
  );
}

export default function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        let content: React.ReactNode = null;

        switch (block.type) {
          case "text":
            content = <TextBlock text={block.text} />;
            break;
          case "kpi":
            content = <KPICardBlock label={block.label} value={block.value} change={block.change} trend={block.trend} />;
            break;
          case "kpi_grid":
            content = (
              <div className="grid grid-cols-3 gap-3">
                {block.items.map((item, j) => (
                  <KPICardBlock key={j} label={item.label} value={item.value} change={item.change} trend={item.trend} />
                ))}
              </div>
            );
            break;
          case "chart":
            content = <ChartBlock chartType={block.chartType} title={block.title} data={block.data} xKey={block.xKey} yKey={block.yKey} />;
            break;
          case "table":
            content = <TableBlock title={block.title} headers={block.headers} rows={block.rows} />;
            break;
          case "report":
            content = block.sections ? <ReportSlides title={block.title} sections={block.sections} /> : null;
            break;
          case "alert":
            content = (
              <div className={`rounded-lg px-4 py-3 text-sm ${
                block.severity === "critical"
                  ? "bg-[#FEF2F2] text-[#EF4444]"
                  : block.severity === "warning"
                  ? "bg-[#FFFBEB] text-[#F59E0B]"
                  : "bg-[#F0FDF4] text-[#22C55E]"
              }`}>
                {block.message}
              </div>
            );
            break;
          default:
            return null;
        }

        return (
          <BlockWrapper key={i} block={block}>
            {content}
          </BlockWrapper>
        );
      })}
    </div>
  );
}
