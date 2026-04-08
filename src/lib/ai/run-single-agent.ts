// Single agent runner — used by the report job worker
// Returns full text + tool calls without streaming

import { AGENTS, type AgentProfile } from "./agents";
import type { ConnectorTool } from "@/lib/connectors";

export interface AgentRunResult {
  text: string;
  toolCalls: Array<{ name: string; cached: boolean }>;
  error?: string;
  errorCode?: "RATE_LIMIT" | "API_ERROR" | "TIMEOUT" | "UNKNOWN";
  newCacheEntries: Record<string, any>;
}

export async function runSingleAgent(
  agent: AgentProfile,
  message: string,
  systemPrompt: string,
  allTools: Record<string, ConnectorTool>,
  anthropicApiKey: string,
  modelId: string,
  tenantId: string,
  toolCache: Record<string, any>,
): Promise<AgentRunResult> {
  // Filter tools to this agent's allowed list
  var agentTools: Record<string, ConnectorTool> = {};
  for (var name of agent.toolNames) {
    if (allTools[name]) agentTools[name] = allTools[name];
  }

  var toolDefs = Object.entries(agentTools).map(function(entry) {
    var zodSchema = entry[1].parameters;
    var schema: any = { type: "object", properties: {} };
    if (zodSchema && (zodSchema as any)._def?.shape) {
      var shape = (zodSchema as any)._def.shape();
      for (var key in shape) {
        var field = shape[key];
        var desc = (field as any)?._def?.description;
        schema.properties[key] = { type: "string", ...(desc ? { description: desc } : {}) };
      }
    }
    return { name: entry[0], description: entry[1].description, input_schema: schema };
  });

  var agentSystemPrompt = systemPrompt + "\n\n" + agent.systemPromptAddon;
  var messages: Array<{ role: string; content: any }> = [
    { role: "user", content: message },
  ];

  var finalText = "";
  var continueLoop = true;
  var iterCount = 0;
  var maxIterations = 8;
  var toolCallsLog: Array<{ name: string; cached: boolean }> = [];
  var newCacheEntries: Record<string, any> = {};

  while (continueLoop && iterCount < maxIterations) {
    iterCount++;

    // Retry loop for 429/529/503
    var response: Response | null = null;
    var retries = 0;
    var maxRetries = 3;
    while (retries < maxRetries) {
      try {
        response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          signal: AbortSignal.timeout(120000),
          headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropicApiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: modelId,
            max_tokens: 4096,
            system: agentSystemPrompt,
            messages,
            ...(toolDefs.length > 0 ? { tools: toolDefs } : {}),
          }),
        });
        if (response.status === 429 || response.status === 529 || response.status === 503) {
          retries++;
          if (retries >= maxRetries) break;
          var backoffs = [3000, 8000, 20000];
          await new Promise(function(r) { setTimeout(r, backoffs[retries - 1] + Math.random() * 1000); });
          continue;
        }
        break;
      } catch (e) {
        retries++;
        if (retries >= maxRetries) {
          return { text: finalText, toolCalls: toolCallsLog, newCacheEntries, error: "Network error", errorCode: "TIMEOUT" };
        }
        await new Promise(function(r) { setTimeout(r, 3000 * retries); });
      }
    }

    if (!response || !response.ok) {
      var status = response?.status || 0;
      if (status === 429) {
        return { text: finalText, toolCalls: toolCallsLog, newCacheEntries, error: "Anthropic rate limit (will retry later)", errorCode: "RATE_LIMIT" };
      }
      return { text: finalText, toolCalls: toolCallsLog, newCacheEntries, error: "API error " + status, errorCode: "API_ERROR" };
    }

    var data: any;
    try {
      data = await response.json();
    } catch {
      return { text: finalText, toolCalls: toolCallsLog, newCacheEntries, error: "Invalid response from Anthropic", errorCode: "API_ERROR" };
    }

    var stopReason = data.stop_reason || "";
    var contentBlocks = data.content || [];
    var textParts: string[] = [];
    var toolUseBlocks: Array<{ id: string; name: string; input: any }> = [];

    for (var block of contentBlocks) {
      if (block.type === "text") textParts.push(block.text || "");
      if (block.type === "tool_use") toolUseBlocks.push({ id: block.id, name: block.name, input: block.input });
    }

    var iterText = textParts.join("");
    finalText += iterText;

    if (stopReason === "tool_use" && toolUseBlocks.length > 0) {
      messages.push({
        role: "assistant",
        content: contentBlocks,
      });

      var toolResults = [];
      for (var toolCall of toolUseBlocks) {
        var tool = agentTools[toolCall.name];
        var result: any = { error: "Unknown tool" };
        var wasCached = false;
        if (tool) {
          var cacheKey = toolCall.name + ":" + JSON.stringify(toolCall.input);
          if (toolCache[cacheKey] !== undefined) {
            result = toolCache[cacheKey];
            wasCached = true;
          } else {
            try {
              result = await tool.execute(toolCall.input, tenantId);
              toolCache[cacheKey] = result;
              newCacheEntries[cacheKey] = result;
            } catch (e: any) {
              result = { error: e?.message || "Tool failed" };
            }
          }
        }
        toolCallsLog.push({ name: toolCall.name, cached: wasCached });
        toolResults.push({ type: "tool_result", tool_use_id: toolCall.id, content: JSON.stringify(result) });
      }
      messages.push({ role: "user", content: toolResults });
    } else {
      continueLoop = false;
    }
  }

  return { text: finalText, toolCalls: toolCallsLog, newCacheEntries };
}
