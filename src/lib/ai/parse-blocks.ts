import type { ContentBlock } from "@/types/chat-blocks";

var BLOCK_TYPES = "kpi_grid|kpi|chart|table|alert|progress|funnel|comparison|scorecard|email_preview|clarification|confirmation|action_result";

// Pre-process: convert orphan JSON tables (no :::table wrapper) into proper blocks.
// AI sometimes outputs the table title as a heading + raw JSON, like:
//   ## 🏆 Top 10 Deals
//   {"headers":[...],"rows":[...]}
function fixOrphanJsonTables(text: string): string {
  // Match: optional title line, then a JSON object with headers + rows
  // Pattern: a line starting with #, **, or emoji + emoji-like, followed by a JSON line starting with {"headers"
  var lines = text.split("\n");
  var result: string[] = [];
  var i = 0;
  var insideBlock = false; // Track if we're inside a :::block ::: section
  while (i < lines.length) {
    var line = lines[i];
    var trimmed = line.trim();

    // Track block boundaries — don't process JSON inside already-wrapped blocks
    if (trimmed.startsWith(":::")) {
      // Closing tags: ::: alone, :::end_xxx
      if (trimmed === ":::" || trimmed.startsWith(":::end_")) {
        insideBlock = false;
      } else {
        insideBlock = true;
      }
      result.push(line);
      i++;
      continue;
    }
    if (insideBlock) {
      result.push(line);
      i++;
      continue;
    }

    // Detect orphan JSON table: line starting with {"headers"
    if (trimmed.startsWith('{"headers"') || trimmed.startsWith("{ \"headers\"")) {
      // Collect the full JSON (might span multiple lines if pretty-printed)
      var jsonStart = i;
      var jsonStr = trimmed;
      // If it doesn't end with }, keep collecting lines
      var braceCount = 0;
      for (var ch of jsonStr) {
        if (ch === "{") braceCount++;
        if (ch === "}") braceCount--;
      }
      while (braceCount > 0 && i + 1 < lines.length) {
        i++;
        jsonStr += "\n" + lines[i];
        for (var ch2 of lines[i]) {
          if (ch2 === "{") braceCount++;
          if (ch2 === "}") braceCount--;
        }
      }

      // Check the previous line for a title
      var title = "";
      if (result.length > 0) {
        var prevLine = result[result.length - 1].trim();
        // Match: ## Title, **Title**, or starts with emoji + text
        var titleMatch = prevLine.match(/^(?:#{1,4}\s*)?(.+?)(?:\*+)?$/);
        // Only treat as title if it's heading-like (starts with #, contains emoji, or is bold)
        if (prevLine.startsWith("#") || /^[\p{Emoji}🏆📊📈📉💰🎯⚠️✅❌🔴🟠🟡🟢]/u.test(prevLine) || prevLine.startsWith("**")) {
          title = prevLine.replace(/^[#*\s]+/, "").replace(/\*+$/, "").trim();
          result.pop(); // Remove the title line, it'll go into the block params
        }
      }

      // Validate JSON
      try {
        var parsed = JSON.parse(jsonStr);
        if (parsed && Array.isArray(parsed.headers) && Array.isArray(parsed.rows)) {
          var paramStr = title ? '{"title":"' + title.replace(/"/g, '\\"') + '"}' : "";
          result.push(":::table" + paramStr);
          result.push(jsonStr);
          result.push(":::");
          i++;
          continue;
        }
      } catch {
        // Not valid JSON, leave as-is
      }
      // Fall through if invalid
      result.push(line);
      i = jsonStart + 1;
      continue;
    }

    // Detect orphan JSON object {"type":..., ...} (any single block)
    if (trimmed.startsWith("{") && !trimmed.startsWith("{{")) {
      var jsonStart2 = i;
      var jsonStr2 = trimmed;
      var braceCount2 = 0;
      for (var ch4 of jsonStr2) {
        if (ch4 === "{") braceCount2++;
        if (ch4 === "}") braceCount2--;
      }
      while (braceCount2 > 0 && i + 1 < lines.length) {
        i++;
        jsonStr2 += "\n" + lines[i];
        for (var ch5 of lines[i]) {
          if (ch5 === "{") braceCount2++;
          if (ch5 === "}") braceCount2--;
        }
      }
      try {
        var parsedObj = JSON.parse(jsonStr2);
        if (parsedObj && typeof parsedObj === "object") {
          // Detect block type from structure
          var blockType: string | null = null;
          if (Array.isArray(parsedObj.headers) && Array.isArray(parsedObj.rows)) blockType = "table";
          else if (Array.isArray(parsedObj.steps)) blockType = "funnel";
          else if (parsedObj.score !== undefined && parsedObj.value !== undefined) blockType = "scorecard";
          else if (Array.isArray(parsedObj.items) && parsedObj.items.length > 0 && parsedObj.items[0].current !== undefined) blockType = "comparison";
          else if (parsedObj.label && parsedObj.value !== undefined && parsedObj.max !== undefined) blockType = "progress";

          if (blockType) {
            var prevTitle = "";
            if (result.length > 0) {
              var prevT = result[result.length - 1].trim();
              if (prevT.startsWith("#") || /^[\p{Emoji}🏆📊📈📉💰🎯⚠️✅❌🔴🟠🟡🟢]/u.test(prevT) || prevT.startsWith("**")) {
                prevTitle = prevT.replace(/^[#*\s]+/, "").replace(/\*+$/, "").trim();
                result.pop();
              }
            }
            var paramsObj: any = {};
            if (prevTitle) paramsObj.title = prevTitle;
            var paramsStr = Object.keys(paramsObj).length > 0 ? JSON.stringify(paramsObj) : "";
            result.push(":::" + blockType + paramsStr);
            result.push(jsonStr2);
            result.push(":::");
            i++;
            continue;
          }
        }
      } catch {}
      i = jsonStart2;
    }

    // Detect orphan JSON kpi_grid: line starting with [{
    // Could be [{"label":...,"value":...}] OR [{"value":...,"label":...}]
    if (trimmed.startsWith("[{") && (trimmed.includes('"label"') || trimmed.includes('"value"'))) {
      // Walk to collect full multi-line JSON
      var jsonStart = i;
      var jsonStr = trimmed;
      var brackCount = 0;
      for (var ch of jsonStr) {
        if (ch === "[" || ch === "{") brackCount++;
        if (ch === "]" || ch === "}") brackCount--;
      }
      while (brackCount > 0 && i + 1 < lines.length) {
        i++;
        jsonStr += "\n" + lines[i];
        for (var ch3 of lines[i]) {
          if (ch3 === "[" || ch3 === "{") brackCount++;
          if (ch3 === "]" || ch3 === "}") brackCount--;
        }
      }

      try {
        var parsedKpi = JSON.parse(jsonStr);
        if (Array.isArray(parsedKpi) && parsedKpi.length > 0 && parsedKpi.every(function(p: any) {
          return p && typeof p === "object" && (
            (p.label ?? p.title ?? p.name) !== undefined ||
            (p.value ?? p.amount ?? p.val) !== undefined
          );
        })) {
          // Normalize keys: AI may use name/title/amount/val variants
          var normalized = parsedKpi.map(function(p: any) {
            return {
              label: p.label ?? p.title ?? p.name ?? "",
              value: String(p.value ?? p.amount ?? p.val ?? ""),
              change: p.change,
              trend: p.trend,
            };
          });

          // Check previous line for title (optional)
          var kpiTitle = "";
          if (result.length > 0) {
            var prevK = result[result.length - 1].trim();
            if (prevK.startsWith("#") || /^[\p{Emoji}🏆📊📈📉💰🎯⚠️✅❌🔴🟠🟡🟢]/u.test(prevK) || prevK.startsWith("**")) {
              kpiTitle = prevK.replace(/^[#*\s]+/, "").replace(/\*+$/, "").trim();
              result.pop();
            }
          }
          result.push(":::kpi_grid" + (kpiTitle ? '{"title":"' + kpiTitle.replace(/"/g, '\\"') + '"}' : ""));
          result.push(JSON.stringify(normalized));
          result.push(":::");
          i++;
          continue;
        }
      } catch {}
      // Fall through if not valid
      i = jsonStart;
    }

    result.push(line);
    i++;
  }
  return result.join("\n");
}

// Try to parse JSON, with fallback that fixes common AI mistakes
function safeParseJSON(str: string): any {
  try {
    return JSON.parse(str);
  } catch {}
  // Try cleanup: remove trailing commas, smart quotes
  try {
    var cleaned = str
      .replace(/,(\s*[}\]])/g, "$1") // trailing commas
      .replace(/[\u201C\u201D]/g, '"') // smart quotes "" → "
      .replace(/[\u2018\u2019]/g, "'"); // smart quotes '' → '
    return JSON.parse(cleaned);
  } catch {}
  return null;
}

function parseInnerBlocks(text: string): ContentBlock[] {
  // Step 1: Extract email_preview blocks FIRST using a specific delimiter
  // (their HTML content can contain ::: which would break the generic regex)
  var emailBlocks: Array<{ placeholder: string; params: any; html: string }> = [];
  // Match :::email_preview{...} ... :::end_email_preview OR :::email_preview ... ::: (fallback)
  var emailRegex = /:::email_preview(\{[^}]*\})?\n([\s\S]*?):::end_email_preview/g;
  var emailMatch;
  var idx = 0;
  while ((emailMatch = emailRegex.exec(text)) !== null) {
    var placeholder = "\x00EMAIL_BLOCK_" + (idx++) + "\x00";
    var emailParams: any = {};
    if (emailMatch[1]) {
      try { emailParams = JSON.parse(emailMatch[1]); } catch { emailParams = {}; }
    }
    emailBlocks.push({ placeholder: placeholder, params: emailParams, html: emailMatch[2].trim() });
    text = text.slice(0, emailMatch.index) + placeholder + text.slice(emailMatch.index + emailMatch[0].length);
    emailRegex.lastIndex = emailMatch.index + placeholder.length;
  }

  // Step 2: Pre-process: wrap orphan JSON tables/kpi_grids in proper :::block syntax
  text = fixOrphanJsonTables(text);

  var blocks: ContentBlock[] = [];

  if (!text.includes(":::") && emailBlocks.length === 0) {
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
        var items = safeParseJSON(content);
        if (items && Array.isArray(items)) {
          blocks.push({ type: "kpi_grid", items: items });
        } else {
          blocks.push({ type: "text", text: content });
        }
      } else if (blockType === "kpi") {
        var kpiData = safeParseJSON(content);
        if (kpiData) {
          blocks.push({ type: "kpi", ...kpiData } as ContentBlock);
        } else {
          blocks.push({ type: "text", text: content });
        }
      } else if (blockType === "chart") {
        var chartData = safeParseJSON(content);
        if (chartData) {
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
        } else {
          blocks.push({ type: "text", text: content });
        }
      } else if (blockType === "table") {
        var tableData = safeParseJSON(content);
        if (tableData && tableData.headers) {
          blocks.push({
            type: "table",
            title: params.title,
            headers: tableData.headers || [],
            rows: tableData.rows || [],
            sortable: params.sortable !== false,
            searchable: params.searchable !== false,
            pageSize: params.pageSize || 10,
          });
        } else {
          blocks.push({ type: "text", text: content });
        }
      } else if (blockType === "alert") {
        blocks.push({
          type: "alert",
          severity: (params.severity as any) || "info",
          message: content,
        });
      } else if (blockType === "progress") {
        var progressData = safeParseJSON(content);
        if (progressData) {
          blocks.push({
            type: "progress",
            label: progressData.label || params.label || "",
            value: progressData.value || 0,
            max: progressData.max || 100,
            target: progressData.target,
            color: progressData.color || params.color,
          });
        } else {
          blocks.push({ type: "text", text: content });
        }
      } else if (blockType === "funnel") {
        var funnelData = safeParseJSON(content);
        if (funnelData) {
          blocks.push({
            type: "funnel",
            title: params.title || "",
            steps: Array.isArray(funnelData) ? funnelData : (funnelData.steps || []),
          });
        } else {
          blocks.push({ type: "text", text: content });
        }
      } else if (blockType === "comparison") {
        var compData = safeParseJSON(content);
        if (compData) {
          blocks.push({
            type: "comparison",
            title: params.title || "",
            items: Array.isArray(compData) ? compData : (compData.items || []),
          });
        } else {
          blocks.push({ type: "text", text: content });
        }
      } else if (blockType === "scorecard") {
        var scoreData = safeParseJSON(content);
        if (scoreData) {
          blocks.push({
            type: "scorecard",
            title: params.title || scoreData.title || "",
            value: scoreData.value || "",
            target: scoreData.target,
            score: scoreData.score || 0,
            breakdown: scoreData.breakdown,
          });
        } else {
          blocks.push({ type: "text", text: content });
        }
      } else if (blockType === "email_preview") {
        // Content is raw HTML — no JSON parsing
        blocks.push({
          type: "email_preview",
          title: params.title || params.subject || "Email Preview",
          subject: params.subject || "",
          html: content,
        } as ContentBlock);
      } else if (blockType === "clarification") {
        var clarData = safeParseJSON(content);
        if (clarData) {
          blocks.push({
            type: "clarification",
            question: clarData.question || params.question || "",
            options: clarData.options || [],
            allowCustom: clarData.allowCustom !== false,
          } as ContentBlock);
        }
      } else if (blockType === "confirmation") {
        var confData = safeParseJSON(content);
        if (confData) {
          blocks.push({
            type: "confirmation",
            action: confData.action || "",
            details: confData.details,
            confirmText: confData.confirmText || "Confirm",
            cancelText: confData.cancelText || "Cancel",
            severity: confData.severity || params.severity || "warning",
          } as ContentBlock);
        }
      } else if (blockType === "action_result") {
        var resData = safeParseJSON(content);
        if (resData) {
          blocks.push({
            type: "action_result",
            status: resData.status || "success",
            action: resData.action || "",
            details: resData.details,
          } as ContentBlock);
        }
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

  // Step 3: Replace email_preview placeholders with their actual blocks
  if (emailBlocks.length > 0) {
    var expandedBlocks: ContentBlock[] = [];
    for (var b of blocks) {
      if (b.type === "text") {
        var txt = (b as any).text;
        // Find any placeholder in this text block
        var hasPlaceholder = false;
        for (var eb of emailBlocks) {
          if (txt.includes(eb.placeholder)) {
            hasPlaceholder = true;
            // Split text around placeholder
            var parts = txt.split(eb.placeholder);
            if (parts[0] && parts[0].trim()) expandedBlocks.push({ type: "text", text: parts[0].trim() });
            expandedBlocks.push({
              type: "email_preview",
              title: eb.params.title || eb.params.subject || "Email Preview",
              subject: eb.params.subject || "",
              html: eb.html,
            } as ContentBlock);
            txt = parts.slice(1).join(eb.placeholder);
          }
        }
        if (hasPlaceholder) {
          if (txt && txt.trim()) expandedBlocks.push({ type: "text", text: txt.trim() });
        } else {
          expandedBlocks.push(b);
        }
      } else {
        expandedBlocks.push(b);
      }
    }
    blocks = expandedBlocks;
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
