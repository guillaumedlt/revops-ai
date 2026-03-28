"use client";

import type { ContentBlock } from "@/types/chat-blocks";
import TextBlock from "./TextBlock";
import KPICardBlock from "./KPICardBlock";
import ChartBlock from "./ChartBlock";
import TableBlock from "./TableBlock";
import ReportSlides from "./ReportSlides";
import ProgressBlock from "./ProgressBlock";
import FunnelBlock from "./FunnelBlock";
import ComparisonBlock from "./ComparisonBlock";
import ScorecardBlock from "./ScorecardBlock";
import AddToDashboard from "../AddToDashboard";

function BlockWrapper({ block, children }: { block: ContentBlock; children: React.ReactNode }) {
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
            block.type === "funnel" ? block.title :
            block.type === "comparison" ? block.title :
            block.type === "scorecard" ? block.title :
            block.type === "progress" ? block.label :
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
      {blocks.map(function(block, i) {
        var content: React.ReactNode = null;

        switch (block.type) {
          case "text":
            content = <TextBlock text={block.text} />;
            break;
          case "kpi":
            content = <KPICardBlock label={block.label} value={block.value} change={block.change} trend={block.trend} />;
            break;
          case "kpi_grid":
            content = block.items && block.items.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {block.items.map(function(item, j) {
                  return <KPICardBlock key={j} label={item.label} value={item.value} change={item.change} trend={item.trend} />;
                })}
              </div>
            ) : null;
            break;
          case "chart":
            content = <ChartBlock chartType={block.chartType} title={block.title} data={block.data} xKey={block.xKey} yKey={block.yKey} yKeys={block.yKeys} colors={block.colors} />;
            break;
          case "table":
            content = <TableBlock title={block.title} headers={block.headers} rows={block.rows} sortable={block.sortable} searchable={block.searchable} pageSize={block.pageSize} />;
            break;
          case "report":
            content = block.sections ? <ReportSlides title={block.title} sections={block.sections} /> : null;
            break;
          case "alert":
            content = (
              <div className={"rounded-lg px-4 py-3 text-sm flex items-start gap-2 " + (
                block.severity === "critical"
                  ? "bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]"
                  : block.severity === "warning"
                  ? "bg-[#FFFBEB] text-[#F59E0B] border border-[#FDE68A]"
                  : "bg-[#F0FDF4] text-[#22C55E] border border-[#BBF7D0]"
              )}>
                <span className="shrink-0 mt-0.5">{block.severity === "critical" ? "🔴" : block.severity === "warning" ? "🟡" : "🟢"}</span>
                <span>{block.message}</span>
              </div>
            );
            break;
          case "progress":
            content = <ProgressBlock label={block.label} value={block.value} max={block.max} target={block.target} color={block.color} />;
            break;
          case "funnel":
            content = <FunnelBlock title={block.title} steps={block.steps} />;
            break;
          case "comparison":
            content = <ComparisonBlock title={block.title} items={block.items} />;
            break;
          case "scorecard":
            content = <ScorecardBlock title={block.title} value={block.value} target={block.target} score={block.score} breakdown={block.breakdown} />;
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
