import type { ContentBlock } from "@/types/chat-blocks";
import TextBlock from "./TextBlock";
import KPICardBlock from "./KPICardBlock";
import ChartBlock from "./ChartBlock";
import TableBlock from "./TableBlock";

export default function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "text":
            return <TextBlock key={i} text={block.text} />;
          case "kpi":
            return <KPICardBlock key={i} label={block.label} value={block.value} change={block.change} trend={block.trend} />;
          case "kpi_grid":
            return (
              <div key={i} className="grid grid-cols-3 gap-3">
                {block.items.map((item, j) => (
                  <KPICardBlock key={j} label={item.label} value={item.value} change={item.change} trend={item.trend} />
                ))}
              </div>
            );
          case "chart":
            return <ChartBlock key={i} chartType={block.chartType} title={block.title} data={block.data} xKey={block.xKey} yKey={block.yKey} />;
          case "table":
            return <TableBlock key={i} title={block.title} headers={block.headers} rows={block.rows} />;
          case "alert":
            return (
              <div
                key={i}
                className={`rounded-lg px-4 py-3 text-sm ${
                  block.severity === "critical"
                    ? "bg-[#FEF2F2] text-[#EF4444]"
                    : block.severity === "warning"
                    ? "bg-[#FFFBEB] text-[#F59E0B]"
                    : "bg-[#F0FDF4] text-[#22C55E]"
                }`}
              >
                {block.message}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
