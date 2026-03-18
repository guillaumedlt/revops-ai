import type { ContentBlock } from "@/types/chat-blocks";

function parseInnerBlocks(text: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];

  if (!text.includes(":::")) {
    if (text.trim()) blocks.push({ type: "text", text: text.trim() });
    return blocks;
  }

  const blockRegex = /:::(kpi_grid|kpi|chart|table|alert)(?:\{([^}]*)\})?\n([\s\S]*?):::/g;
  let lastIndex = 0;
  let match;

  while ((match = blockRegex.exec(text)) !== null) {
    const textBefore = text.slice(lastIndex, match.index).trim();
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

  const remaining = text.slice(lastIndex).trim();
  if (remaining) blocks.push({ type: "text", text: remaining });

  return blocks;
}

export function parseContentBlocks(rawText: string): ContentBlock[] {
  // Check for report block
  const reportMatch = rawText.match(/:::report(?:\{([^}]*)\})?\n([\s\S]*?):::end_report/);
  if (reportMatch) {
    const blocks: ContentBlock[] = [];

    // Text before the report
    const beforeReport = rawText.slice(0, reportMatch.index).trim();
    if (beforeReport) blocks.push({ type: "text", text: beforeReport });

    // Parse report params
    let reportParams: Record<string, string> = {};
    if (reportMatch[1]) {
      try {
        reportParams = JSON.parse(`{${reportMatch[1]}}`);
      } catch {
        reportParams = {};
      }
    }

    // Split sections by ---
    const reportContent = reportMatch[2].trim();
    const sectionTexts = reportContent.split(/\n---\n/);

    const sections: ContentBlock[][] = sectionTexts.map((sectionText) => {
      // Extract title from # heading
      const titleMatch = sectionText.match(/^#\s+(.+)/m);
      const cleanedText = sectionText.replace(/^#\s+.+\n?/m, "").trim();

      // Parse inner blocks recursively
      const innerBlocks = parseInnerBlocks(cleanedText);

      // If there was a title, prepend as text
      if (titleMatch) {
        return [{ type: "text" as const, text: "**" + titleMatch[1] + "**" }, ...innerBlocks];
      }
      return innerBlocks;
    });

    blocks.push({
      type: "report",
      title: reportParams.title || "Report",
      sections,
    });

    // Text after the report
    const afterReport = rawText.slice((reportMatch.index || 0) + reportMatch[0].length).trim();
    if (afterReport) blocks.push({ type: "text", text: afterReport });

    return blocks;
  }

  // Standard block parsing (no report)
  if (!rawText.includes(":::")) {
    return [{ type: "text", text: rawText }];
  }

  const result = parseInnerBlocks(rawText);
  return result.length > 0 ? result : [{ type: "text", text: rawText }];
}
