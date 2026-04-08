// Multi-agent orchestrator — runs specialized agents in parallel

import { AGENTS, type AgentProfile } from "./agents";
import { SYSTEM_PROMPT, buildTenantContext } from "./prompts/system";
import type { ConnectorTool } from "@/lib/connectors";

interface AgentResult {
  agentId: string;
  text: string;
  error?: string;
}

// Run a single agent with its own API call and tool loop
async function runAgent(
  agent: AgentProfile,
  message: string,
  systemPrompt: string,
  allTools: Record<string, ConnectorTool>,
  anthropicApiKey: string,
  modelId: string,
  onToken: (agentId: string, token: string) => void,
  onToolStart: (agentId: string, toolName: string) => void,
  onToolResult: (agentId: string, toolName: string) => void,
  onDone: (agentId: string) => void,
  tenantId: string,
): Promise<AgentResult> {
  // Filter tools to only this agent's tools
  var agentTools: Record<string, ConnectorTool> = {};
  for (var name of agent.toolNames) {
    if (allTools[name]) agentTools[name] = allTools[name];
  }

  var toolDefs = Object.entries(agentTools).map(function(entry) {
    var zodSchema = entry[1].parameters;
    // Simple zod-to-json conversion
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
  var maxIterations = 8; // Prevent infinite tool loops

  while (continueLoop && iterCount < maxIterations) {
    iterCount++;
    var response: Response;
    try {
      response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        signal: AbortSignal.timeout(90000), // 90s per iteration
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
          stream: true,
        }),
      });
    } catch (e) {
      console.error("[orchestrator] Fetch error agent=" + agent.id, e);
      return { agentId: agent.id, text: finalText, error: "Network timeout" };
    }

    if (!response.ok || !response.body) {
      console.error("[orchestrator] API error agent=" + agent.id, response.status);
      return { agentId: agent.id, text: finalText, error: "API error " + response.status };
    }

    var reader = response.body.getReader();
    var decoder = new TextDecoder();
    var buffer = "";
    var fullText = "";
    var toolUseBlocks: Array<{ id: string; name: string; input: any }> = [];
    var currentToolUse: { id: string; name: string; inputJson: string } | null = null;
    var stopReason = "";

    try {
    while (true) {
      var { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      var lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (var line of lines) {
        if (!line.startsWith("data: ")) continue;
        var jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          var event = JSON.parse(jsonStr);
          if (event.type === "content_block_start" && event.content_block?.type === "tool_use") {
            currentToolUse = { id: event.content_block.id, name: event.content_block.name, inputJson: "" };
            onToolStart(agent.id, event.content_block.name);
          }
          if (event.type === "content_block_delta") {
            if (event.delta?.type === "text_delta") {
              fullText += event.delta.text;
              onToken(agent.id, event.delta.text);
            }
            if (event.delta?.type === "input_json_delta" && currentToolUse) {
              currentToolUse.inputJson += event.delta.partial_json;
            }
          }
          if (event.type === "content_block_stop" && currentToolUse) {
            try {
              var input = currentToolUse.inputJson.trim() ? JSON.parse(currentToolUse.inputJson) : {};
              toolUseBlocks.push({ id: currentToolUse.id, name: currentToolUse.name, input });
            } catch {
              toolUseBlocks.push({ id: currentToolUse.id, name: currentToolUse.name, input: {} });
            }
            currentToolUse = null;
          }
          if (event.type === "message_delta" && event.delta?.stop_reason) {
            stopReason = event.delta.stop_reason;
          }
        } catch {}
      }
    }
    } catch (streamErr) {
      console.error("[orchestrator] Stream error agent=" + agent.id, streamErr);
      finalText += fullText;
      onDone(agent.id);
      return { agentId: agent.id, text: finalText, error: "Stream interrupted" };
    }

    if (stopReason === "tool_use" && toolUseBlocks.length > 0) {
      messages.push({
        role: "assistant",
        content: [
          ...(fullText ? [{ type: "text", text: fullText }] : []),
          ...toolUseBlocks.map(function(t) { return { type: "tool_use", id: t.id, name: t.name, input: t.input }; }),
        ],
      });

      var toolResults = [];
      for (var toolCall of toolUseBlocks) {
        var tool = agentTools[toolCall.name];
        var result: any = { error: "Unknown tool" };
        if (tool) {
          try {
            result = await tool.execute(toolCall.input, tenantId);
            onToolResult(agent.id, toolCall.name);
          } catch (e) {
            result = { error: e instanceof Error ? e.message : "Tool failed" };
          }
        }
        toolResults.push({ type: "tool_result", tool_use_id: toolCall.id, content: JSON.stringify(result) });
      }

      messages.push({ role: "user", content: toolResults });
      finalText += fullText;
      toolUseBlocks = [];
    } else {
      finalText += fullText;
      continueLoop = false;
    }
  }

  onDone(agent.id);
  return { agentId: agent.id, text: finalText };
}

// Run multiple agents in parallel
export async function runMultiAgent(
  agentIds: string[],
  message: string,
  allTools: Record<string, ConnectorTool>,
  anthropicApiKey: string,
  modelId: string,
  tenantId: string,
  encoder: TextEncoder,
  controller: ReadableStreamDefaultController,
) {
  var systemPrompt = (SYSTEM_PROMPT + buildTenantContext({ name: "Tenant" })).trim();
  var agents = agentIds.map(function(id) { return AGENTS[id]; }).filter(Boolean);

  // Notify client which agents are starting
  controller.enqueue(encoder.encode("data: " + JSON.stringify({
    type: "agents_start",
    agents: agents.map(function(a) { return { id: a.id, name: a.name, emoji: a.emoji, color: a.color, specialty: a.specialty }; }),
  }) + "\n\n"));

  // Run all agents in parallel — use allSettled so one failure doesn't kill all
  var settled = await Promise.allSettled(agents.map(function(agent) {
    return runAgent(
      agent,
      message,
      systemPrompt,
      allTools,
      anthropicApiKey,
      modelId,
      function(agentId, token) {
        try { controller.enqueue(encoder.encode("data: " + JSON.stringify({ type: "agent_token", agentId: agentId, token: token }) + "\n\n")); } catch {}
      },
      function(agentId, toolName) {
        try { controller.enqueue(encoder.encode("data: " + JSON.stringify({ type: "agent_tool_start", agentId: agentId, name: toolName }) + "\n\n")); } catch {}
      },
      function(agentId, toolName) {
        try { controller.enqueue(encoder.encode("data: " + JSON.stringify({ type: "agent_tool_result", agentId: agentId, name: toolName }) + "\n\n")); } catch {}
      },
      function(agentId) {
        try { controller.enqueue(encoder.encode("data: " + JSON.stringify({ type: "agent_done", agentId: agentId }) + "\n\n")); } catch {}
      },
      tenantId,
    );
  }));

  // Convert settled results to AgentResult format
  var results: AgentResult[] = settled.map(function(s, i) {
    if (s.status === "fulfilled") return s.value;
    console.error("[orchestrator] Agent " + agents[i].id + " rejected:", s.reason);
    return { agentId: agents[i].id, text: "", error: "Agent crashed: " + (s.reason?.message || "unknown") };
  });

  // Combine all agent results into final text
  var sections = results.map(function(r) {
    var agent = AGENTS[r.agentId];
    if (!agent) return "";
    if (!r.text || r.text.trim() === "") {
      // Agent returned nothing — show error placeholder
      return "## " + agent.emoji + " " + agent.name + "\n\n*" + (r.error || "No data returned for this section.") + "*";
    }
    return "## " + agent.emoji + " " + agent.name + "\n\n" + r.text;
  }).filter(Boolean);

  if (sections.length === 0) {
    // All agents failed — return a clear error
    return "# Report failed\n\nAll agents failed to generate content. This can happen if:\n- HubSpot connection is broken (reconnect in Settings)\n- Anthropic API is overloaded (try again in a moment)\n- The request was too complex (try a simpler query first)\n\nPlease retry, and if the issue persists, check Settings → Connectors.";
  }

  var combinedText = sections.join("\n\n---\n\n");
  return combinedText;
}
