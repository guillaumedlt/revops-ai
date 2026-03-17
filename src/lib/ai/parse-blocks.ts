import type { ContentBlock } from "@/types/chat-blocks";

export function parseContentBlocks(rawText: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  if (!rawText.includes(":::")) {
    return [{ type: "text", text: rawText }];
  }

  const blockRegex = /:::(kpi_grid|kpi|chart|table|alert)(?:\{([^}]*)\})?\n([\s\S]*?):::/g;
  let lastIndex = 0;
  let match;

  while ((match = blockRegex.exec(rawText)) !== null) {
    const textBefore = rawText.slice(lastIndex, match.index).trim();
    if (textBefore) blocks.push({ type: "text", text: textBefore });

    const blockType = match[1];
    let params: Record<string, string> = {};
    if (match[2]) {
      try {
        params = JSON.parse(`{${match[2]}}`);
      } catch {
        params = {};
      }
    }
    const content = match[3].trim();

    try {
      if (blockType === "kpi_grid") {
        const items = JSON.parse(content);
        blocks.push({ type: "kpi_grid", items });
      } else if (blockType === "kpi") {
        const data = JSON.parse(content);
        blocks.push({ type: "kpi", ...data } as ContentBlock);
      } else if (blockType === "chart") {
        const data = JSON.parse(content);
        blocks.push({
          type: "chart",
          chartType: (params.type as "bar" | "line" | "area" | "donut") || "bar",
          title: params.title || "",
          data,
          xKey: params.xKey,
          yKey: params.yKey,
        });
      } else if (blockType === "table") {
        const data = JSON.parse(content);
        blocks.push({
          type: "table",
          title: params.title,
          headers: data.headers || [],
          rows: data.rows || [],
        });
      } else if (blockType === "alert") {
        blocks.push({
          type: "alert",
          severity: (params.severity as "info" | "warning" | "critical") || "info",
          message: content,
        });
      }
    } catch {
      blocks.push({ type: "text", text: content });
    }

    lastIndex = match.index + match[0].length;
  }

  const remaining = rawText.slice(lastIndex).trim();
  if (remaining) blocks.push({ type: "text", text: remaining });

  return blocks.length > 0 ? blocks : [{ type: "text", text: rawText }];
}
