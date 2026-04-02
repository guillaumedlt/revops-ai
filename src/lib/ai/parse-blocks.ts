import type { ContentBlock } from "@/types/chat-blocks";

var BLOCK_TYPES = "kpi_grid|kpi|chart|table|alert|progress|funnel|comparison|scorecard|email_preview";

function parseInnerBlocks(text: string): ContentBlock[] {
  var blocks: ContentBlock[] = [];

  if (!text.includes(":::")) {
    if (text.trim()) blocks.push({ type: "text", text: text.trim() });
    return blocks;
  }

  var blockRegex = new RegExp(":::(" + BLOCK_TYPES + ")(?:\\{([^}]*)\\})?\\n([\\s\\S]*?):::", "g");
  var lastIndex = 0;
  var match;

  while ((match = blockRegex.exec(text)) !== null) {
    var textBefore = text.slice(lastIndex, match.index).trim();
    if (textBefore) blocks.push({ type: "text", text: textBefore });

    var blockType = match[1];
    var params: Record<string, any> = {};
    if (match[2]) {
      try {
        params = JSON.parse("{" + match[2] + "}");
      } catch {
        params = {};
      }
    }
    var content = match[3].trim();

    try {
      if (blockType === "kpi_grid") {
        var items = JSON.parse(content);
        blocks.push({ type: "kpi_grid", items: items });
      } else if (blockType === "kpi") {
        var kpiData = JSON.parse(content);
        blocks.push({ type: "kpi", ...kpiData } as ContentBlock);
      } else if (blockType === "chart") {
        var chartData = JSON.parse(content);
        blocks.push({
          type: "chart",
          chartType: (params.type as any) || "bar",
          title: params.title || "",
          data: chartData,
          xKey: params.xKey,
          yKey: params.yKey,
          yKeys: params.yKeys,
          colors: params.colors,
        });
      } else if (blockType === "table") {
        var tableData = JSON.parse(content);
        blocks.push({
          type: "table",
          title: params.title,
          headers: tableData.headers || [],
          rows: tableData.rows || [],
          sortable: params.sortable !== false,
          searchable: params.searchable !== false,
          pageSize: params.pageSize || 10,
        });
      } else if (blockType === "alert") {
        blocks.push({
          type: "alert",
          severity: (params.severity as any) || "info",
          message: content,
        });
      } else if (blockType === "progress") {
        var progressData = JSON.parse(content);
        blocks.push({
          type: "progress",
          label: progressData.label || params.label || "",
          value: progressData.value || 0,
          max: progressData.max || 100,
          target: progressData.target,
          color: progressData.color || params.color,
        });
      } else if (blockType === "funnel") {
        var funnelData = JSON.parse(content);
        blocks.push({
          type: "funnel",
          title: params.title || "",
          steps: Array.isArray(funnelData) ? funnelData : (funnelData.steps || []),
        });
      } else if (blockType === "comparison") {
        var compData = JSON.parse(content);
        blocks.push({
          type: "comparison",
          title: params.title || "",
          items: Array.isArray(compData) ? compData : (compData.items || []),
        });
      } else if (blockType === "scorecard") {
        var scoreData = JSON.parse(content);
        blocks.push({
          type: "scorecard",
          title: params.title || scoreData.title || "",
          value: scoreData.value || "",
          target: scoreData.target,
          score: scoreData.score || 0,
          breakdown: scoreData.breakdown,
        });
      } else if (blockType === "email_preview") {
        // Content is raw HTML — no JSON parsing
        blocks.push({
          type: "email_preview",
          title: params.title || params.subject || "Email Preview",
          subject: params.subject || "",
          html: content,
        } as ContentBlock);
      }
    } catch {
      blocks.push({ type: "text", text: content });
    }

    lastIndex = match.index + match[0].length;
  }

  var remaining = text.slice(lastIndex).trim();
  if (remaining) {
    // Convert markdown tables to table blocks
    var converted = convertMarkdownTables(remaining);
    blocks.push(...converted);
  }

  return blocks;
}

// Convert markdown tables (| col | col |) to structured table blocks
function convertMarkdownTables(text: string): ContentBlock[] {
  var blocks: ContentBlock[] = [];
  var lines = text.split("\n");
  var i = 0;

  while (i < lines.length) {
    // Detect markdown table: line starts with |
    if (lines[i].trim().startsWith("|") && i + 1 < lines.length && lines[i + 1].trim().match(/^\|[-\s|:]+\|$/)) {
      // Found a table — collect all rows
      var headerLine = lines[i].trim();
      var headers = headerLine.split("|").filter(function(c) { return c.trim(); }).map(function(c) { return c.trim(); });

      // Skip separator line
      var rowStart = i + 2;
      var rows: string[][] = [];
      while (rowStart < lines.length && lines[rowStart].trim().startsWith("|")) {
        var rowCells = lines[rowStart].trim().split("|").filter(function(c) { return c.trim(); }).map(function(c) { return c.trim(); });
        if (rowCells.length > 0) rows.push(rowCells);
        rowStart++;
      }

      // Check if there's a title in the line before
      var title = "";
      if (blocks.length > 0 && blocks[blocks.length - 1].type === "text") {
        var lastText = (blocks[blocks.length - 1] as any).text as string;
        var lastLines = lastText.split("\n");
        var candidate = lastLines[lastLines.length - 1].trim();
        if (candidate && (candidate.startsWith("**") || candidate.startsWith("##") || candidate.startsWith("✅") || candidate.startsWith("⚠"))) {
          title = candidate.replace(/^[#*✅⚠️🔴🟠🟡🟢\s]+/, "").replace(/\*+$/g, "").trim();
          lastLines.pop();
          var newText = lastLines.join("\n").trim();
          if (newText) { (blocks[blocks.length - 1] as any).text = newText; }
          else { blocks.pop(); }
        }
      }

      if (headers.length > 0 && rows.length > 0) {
        blocks.push({
          type: "table",
          title: title,
          headers: headers,
          rows: rows,
          sortable: true,
          searchable: rows.length > 5,
          pageSize: 10,
        } as ContentBlock);
      }
      i = rowStart;
    } else {
      // Not a table line — accumulate text
      var textLines: string[] = [];
      while (i < lines.length && !(lines[i].trim().startsWith("|") && i + 1 < lines.length && lines[i + 1]?.trim().match(/^\|[-\s|:]+\|$/))) {
        textLines.push(lines[i]);
        i++;
      }
      var t = textLines.join("\n").trim();
      if (t) blocks.push({ type: "text", text: t });
    }
  }
  return blocks;
}

export function parseContentBlocks(rawText: string): ContentBlock[] {
  // Check for report block
  var reportMatch = rawText.match(/:::report(?:\{([^}]*)\})?\n([\s\S]*?):::end_report/);
  if (reportMatch) {
    var blocks: ContentBlock[] = [];

    var beforeReport = rawText.slice(0, reportMatch.index ?? 0).trim();
    if (beforeReport) blocks.push({ type: "text", text: beforeReport });

    var reportParams: Record<string, string> = {};
    if (reportMatch[1]) {
      try {
        reportParams = JSON.parse("{" + reportMatch[1] + "}");
      } catch {
        reportParams = {};
      }
    }

    var reportContent = reportMatch[2].trim();
    var sectionTexts = reportContent.split(/\n---\n/);

    var sections: ContentBlock[][] = sectionTexts.map(function(sectionText) {
      var titleMatch = sectionText.match(/^#\s+(.+)/m);
      var cleanedText = sectionText.replace(/^#\s+.+\n?/m, "").trim();
      var innerBlocks = parseInnerBlocks(cleanedText);

      if (titleMatch) {
        return [{ type: "text" as const, text: "**" + titleMatch[1] + "**" }, ...innerBlocks];
      }
      return innerBlocks;
    });

    blocks.push({
      type: "report",
      title: reportParams.title || "Report",
      sections: sections,
    });

    var afterReport = rawText.slice((reportMatch.index || 0) + reportMatch[0].length).trim();
    if (afterReport) blocks.push({ type: "text", text: afterReport });

    return blocks;
  }

  if (!rawText.includes(":::")) {
    return [{ type: "text", text: rawText }];
  }

  var result = parseInnerBlocks(rawText);
  return result.length > 0 ? result : [{ type: "text", text: rawText }];
}
