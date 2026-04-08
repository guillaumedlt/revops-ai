import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { routeToModel, getModelId, getCreditCostForChoice } from "@/lib/ai/router";
import { SYSTEM_PROMPT, buildTenantContext } from "@/lib/ai/prompts/system";
import { getToolsForTenant } from "@/lib/connectors";
import { checkCredits, deductCredit, CREDIT_COSTS, CreditAction } from "@/lib/ai/credits";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseContentBlocks } from "@/lib/ai/parse-blocks";
import { selectAgents, detectPremiumAgent } from "@/lib/ai/agents";
import { runMultiAgent } from "@/lib/ai/orchestrator";
import { decrypt } from "@/lib/crypto";
import { getErrorInfo, detectErrorCode } from "@/lib/errors";

const ChatSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().uuid().optional(),
  model: z.string().optional(),
});

function resolveModelId(model: string | undefined, message: string): { provider: string; modelId: string; displayName: string } {
  switch (model) {
    case "claude-opus":
      return { provider: "anthropic", modelId: "claude-opus-4-6", displayName: "opus" };
    case "claude-sonnet":
      return { provider: "anthropic", modelId: "claude-sonnet-4-6", displayName: "sonnet" };
    case "claude-haiku":
      return { provider: "anthropic", modelId: "claude-haiku-4-5-20251001", displayName: "haiku" };
    case "gpt-4o":
      return { provider: "openai", modelId: "gpt-4.1", displayName: "gpt-4o" };
    case "gpt-4o-mini":
      return { provider: "openai", modelId: "gpt-4.1-mini", displayName: "gpt-4o-mini" };
    case "gemini-pro":
      return { provider: "google", modelId: "gemini-2.5-pro", displayName: "gemini-pro" };
    case "gemini-flash":
      return { provider: "google", modelId: "gemini-2.5-flash", displayName: "gemini-flash" };
    case "kairo":
    default: {
      const choice = routeToModel(message, 0);
      return { provider: "anthropic", modelId: getModelId(choice), displayName: "kairo" };
    }
  }
}

// Helper to send a structured error event via SSE
function sendError(controller: ReadableStreamDefaultController, encoder: TextEncoder, code: any, context?: any) {
  var info = getErrorInfo(code, context);
  controller.enqueue(encoder.encode(`data: ${JSON.stringify({
    type: "error",
    errorCode: info.code,
    error: info.message,
    errorTitle: info.title,
    action: info.action,
    actionUrl: info.actionUrl,
  })}\n\n`));
  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
}

// Simple in-memory rate limiter — 10 requests per minute per tenant
var rateLimitMap = new Map<string, number[]>();
function checkRateLimit(tenantId: string): boolean {
  var now = Date.now();
  var windowMs = 60000;
  var maxRequests = 10;
  var timestamps = rateLimitMap.get(tenantId) || [];
  timestamps = timestamps.filter(function(t) { return now - t < windowMs; });
  if (timestamps.length >= maxRequests) return false;
  timestamps.push(now);
  rateLimitMap.set(tenantId, timestamps);
  // Cleanup old tenants every 100 calls
  if (rateLimitMap.size > 500) {
    rateLimitMap.forEach(function(v, k) { if (v.every(function(t) { return now - t > windowMs; })) rateLimitMap.delete(k); });
  }
  return true;
}

export async function POST(request: NextRequest) {
  try {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized — no auth headers from middleware" }, { status: 401 });

  // Rate limit check
  if (!checkRateLimit(auth.tenantId)) {
    var rlInfo = getErrorInfo("RATE_LIMITED");
    return NextResponse.json({ error: rlInfo.message, errorCode: rlInfo.code, errorTitle: rlInfo.title }, { status: 429 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = ChatSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Validation: " + parsed.error.issues.map(function(i: any) { return i.path.join(".") + " " + i.message; }).join(", ") }, { status: 400 });

  const { message, conversationId } = parsed.data;

  // Resolve model from request
  const resolved = resolveModelId(parsed.data.model, message);

  // Determine credit action based on routed model
  let creditAction: CreditAction = "standard";
  if (message.startsWith("/report")) {
    creditAction = "report";
  } else if (resolved.displayName === "kairo") {
    // Kairo auto-routes — use the router's credit cost
    var routerChoice = routeToModel(message, 0);
    if (routerChoice === "haiku") creditAction = "simple";
    else if (routerChoice === "opus") creditAction = "opus";
    else creditAction = "standard";
  } else if (resolved.modelId.includes("haiku")) {
    creditAction = "simple";
  } else if (resolved.modelId.includes("opus")) {
    creditAction = "opus";
  }

  const credits = await checkCredits(auth.tenantId, creditAction);
  if (!credits.allowed) {
    var info = getErrorInfo("INSUFFICIENT_CREDITS", { remaining: credits.remaining, cost: credits.cost });
    return NextResponse.json({
      error: info.message,
      errorCode: info.code,
      errorTitle: info.title,
      action: info.action,
      actionUrl: info.actionUrl,
      creditsRemaining: credits.remaining,
      creditCost: credits.cost,
    }, { status: 402 });
  }

  const supabase = createAdminClient();

  let convId = conversationId;
  if (!convId) {
    const { data: conv, error: convError } = await supabase.from("conversations").insert({
      tenant_id: auth.tenantId,
      user_id: auth.userId,
      title: message.slice(0, 100),
    }).select("id").single();
    if (convError || !conv?.id) {
      console.error("[chat] Conversation create error:", convError?.message || "no data");
      return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
    }
    convId = conv.id;
  }

  if (convId) {
    const { error: msgError } = await supabase.from("messages").insert({
      conversation_id: convId,
      tenant_id: auth.tenantId,
      role: "user",
      content: message,
    });
    if (msgError) {
      console.error("[chat] Message insert error:", msgError.message);
    }
  }

  // Load conversation history (last 20 messages for context)
  var historyMessages: Array<{ role: string; content: string }> = [];
  if (convId) {
    const { data: history } = await supabase
      .from("messages")
      .select("role, content")
      .eq("conversation_id", convId)
      .eq("tenant_id", auth.tenantId)
      .order("created_at", { ascending: true })
      .limit(20);

    if (history && history.length > 1) {
      // Exclude the last message (it's the current one we just inserted)
      historyMessages = history.slice(0, -1).map(function(m: any) {
        // Truncate long assistant responses to save tokens (keep first 500 chars)
        var content = m.content || "";
        if (m.role === "assistant" && content.length > 500) {
          // Strip block syntax from history to save tokens
          content = content.replace(/:::[a-z_]+(\{[^}]*\})?\n[\s\S]*?:::/g, "[bloc visuel]").slice(0, 500) + "...";
        }
        return { role: m.role, content: content };
      });
    }
  }

  // Get connector tools for this tenant
  const connectorTools = await getToolsForTenant(auth.tenantId);

  const systemPrompt = (SYSTEM_PROMPT + buildTenantContext({ name: "Tenant" })).trim();

  // Build tool definitions from connector tools
  const toolDefs = Object.entries(connectorTools).map(([name, tool]) => ({
    name,
    description: tool.description,
    input_schema: zodToJsonSchema(tool.parameters),
  }));

  console.log("[chat] Model:", resolved.modelId, "Provider:", resolved.provider, "Tools:", toolDefs.length, "CreditAction:", creditAction, "Cost:", CREDIT_COSTS[creditAction]);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Get tenant BYOK keys for provider routing
        const { data: tenant } = await supabase.from("tenants").select("settings").eq("id", auth.tenantId).single();
        const llmSettings = ((tenant?.settings as any)?.llm as any) ?? {};

        // Resolve API key: Kairo AI uses server key, everything else needs BYOK
        let anthropicApiKey = process.env.ANTHROPIC_API_KEY || "";
        if (!anthropicApiKey && (resolved.provider === "anthropic" || resolved.displayName === "kairo")) {
          sendError(controller, encoder, "ANTHROPIC_KEY_MISSING");
          controller.close();
          return;
        }

        if (resolved.provider === "anthropic" && resolved.displayName !== "kairo") {
          const userKey = llmSettings.anthropicKey ? decrypt(llmSettings.anthropicKey) : null;
          if (!userKey) {
            sendError(controller, encoder, "ANTHROPIC_KEY_MISSING");
            controller.close();
            return;
          }
          anthropicApiKey = userKey;
        }

        // For non-Anthropic providers, check BYOK key
        if (resolved.provider === "openai" || resolved.provider === "google") {
          let apiKey: string | undefined;

          let providerLabel: string;

          if (resolved.provider === "openai") {
            apiKey = llmSettings.openaiKey ? decrypt(llmSettings.openaiKey) : null;
            providerLabel = "OpenAI";
          } else {
            apiKey = llmSettings.googleKey ? decrypt(llmSettings.googleKey) : null;
            providerLabel = "Google AI";
          }

          if (!apiKey) {
            sendError(controller, encoder, resolved.provider === "openai" ? "OPENAI_KEY_MISSING" : "GOOGLE_KEY_MISSING");
            controller.close();
            return;
          }

          // Send conversationId early
          if (convId) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "conversation_id", conversationId: convId })}\n\n`));
          }

          // Convert tool defs to OpenAI format
          const openaiTools = toolDefs.map(function(t) {
            return { type: "function" as const, function: { name: t.name, description: t.description, parameters: t.input_schema } };
          });

          // Convert tool defs to Gemini format
          const geminiTools = toolDefs.length > 0 ? [{
            functionDeclarations: toolDefs.map(function(t) {
              const schema = t.input_schema as any;
              return { name: t.name, description: t.description, parameters: schema.properties && Object.keys(schema.properties).length > 0 ? schema : undefined };
            }),
          }] : [];

          let altText = "";

          if (resolved.provider === "openai") {
            // ── OpenAI with tool calling loop ──
            let oaiMessages: any[] = [
              { role: "system", content: systemPrompt },
              ...historyMessages,
              { role: "user", content: message },
            ];
            let oaiLoop = true;

            while (oaiLoop) {
              const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                signal: AbortSignal.timeout(120000),
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + apiKey },
                body: JSON.stringify({
                  model: resolved.modelId,
                  messages: oaiMessages,
                  max_tokens: creditAction === "report" ? 16000 : 4096,
                  stream: true,
                  ...(openaiTools.length > 0 ? { tools: openaiTools } : {}),
                }),
              });

              if (!openaiRes.ok || !openaiRes.body) {
                const errBody = await openaiRes.text().catch(() => "");
                console.error("[chat][openai]", openaiRes.status, errBody.slice(0, 300));
                sendError(controller, encoder, "OPENAI_API_ERROR", { provider: "OpenAI", statusCode: openaiRes.status });
                controller.close();
                return;
              }

              const oaiReader = openaiRes.body.getReader();
              const oaiDecoder = new TextDecoder();
              let oaiBuf = "";
              let chunkText = "";
              let toolCalls: Record<number, { id: string; name: string; args: string }> = {};
              let finishReason = "";

              while (true) {
                const { done, value } = await oaiReader.read();
                if (done) break;
                oaiBuf += oaiDecoder.decode(value, { stream: true });
                const oaiLines = oaiBuf.split("\n");
                oaiBuf = oaiLines.pop() ?? "";
                for (const line of oaiLines) {
                  if (!line.startsWith("data: ") || line.includes("[DONE]")) continue;
                  try {
                    const chunk = JSON.parse(line.slice(6));
                    const delta = chunk.choices?.[0]?.delta;
                    const fr = chunk.choices?.[0]?.finish_reason;
                    if (fr) finishReason = fr;
                    if (delta?.content) {
                      chunkText += delta.content;
                      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "token", token: delta.content })}\n\n`));
                    }
                    if (delta?.tool_calls) {
                      for (const tc of delta.tool_calls) {
                        const idx = tc.index ?? 0;
                        if (!toolCalls[idx]) toolCalls[idx] = { id: tc.id || "", name: "", args: "" };
                        if (tc.id) toolCalls[idx].id = tc.id;
                        if (tc.function?.name) toolCalls[idx].name = tc.function.name;
                        if (tc.function?.arguments) toolCalls[idx].args += tc.function.arguments;
                      }
                    }
                  } catch {}
                }
              }

              altText += chunkText;
              const toolCallList = Object.values(toolCalls);

              if (finishReason === "tool_calls" && toolCallList.length > 0) {
                // Build assistant message with tool calls
                oaiMessages.push({
                  role: "assistant",
                  content: chunkText || null,
                  tool_calls: toolCallList.map(function(tc) {
                    return { id: tc.id, type: "function", function: { name: tc.name, arguments: tc.args } };
                  }),
                });

                // Execute tools and add results
                for (const tc of toolCallList) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "tool_start", name: tc.name })}\n\n`));
                  const tool = connectorTools[tc.name];
                  let result: any = { error: "Unknown tool: " + tc.name };
                  if (tool) {
                    try {
                      const args = tc.args ? JSON.parse(tc.args) : {};
                      result = await tool.execute(args, auth.tenantId);
                    } catch (e) {
                      result = { error: e instanceof Error ? e.message : "Tool failed" };
                    }
                  }
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "tool_result", name: tc.name })}\n\n`));
                  oaiMessages.push({ role: "tool", tool_call_id: tc.id, content: JSON.stringify(result) });
                }
              } else {
                oaiLoop = false;
              }
            }

          } else {
            // ── Gemini with tool calling loop ──
            // Build Gemini history (user/model alternating)
            var gemHistory: any[] = [];
            for (var hi = 0; hi < historyMessages.length; hi++) {
              var hm = historyMessages[hi];
              gemHistory.push({ role: hm.role === "assistant" ? "model" : "user", parts: [{ text: hm.content }] });
            }
            let gemContents: any[] = [...gemHistory, { role: "user", parts: [{ text: message }] }];
            let gemLoop = true;

            while (gemLoop) {
              const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${resolved.modelId}:generateContent?key=${apiKey}`;
              const geminiRes = await fetch(geminiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  system_instruction: { parts: [{ text: systemPrompt }] },
                  contents: gemContents,
                  generationConfig: { maxOutputTokens: creditAction === "report" ? 16000 : 4096 },
                  ...(geminiTools.length > 0 ? { tools: geminiTools } : {}),
                }),
              });

              if (!geminiRes.ok) {
                const errBody = await geminiRes.text().catch(() => "");
                console.error("[chat][gemini]", geminiRes.status, errBody.slice(0, 300));
                sendError(controller, encoder, "GOOGLE_API_ERROR", { provider: "Gemini", statusCode: geminiRes.status });
                controller.close();
                return;
              }

              const gemData = await geminiRes.json();
              const candidate = gemData.candidates?.[0];
              const parts = candidate?.content?.parts || [];

              let chunkText = "";
              let functionCalls: Array<{ name: string; args: any }> = [];

              for (const part of parts) {
                if (part.text) {
                  chunkText += part.text;
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "token", token: part.text })}\n\n`));
                }
                if (part.functionCall) {
                  functionCalls.push({ name: part.functionCall.name, args: part.functionCall.args || {} });
                }
              }

              altText += chunkText;

              if (functionCalls.length > 0) {
                // Add model response to conversation
                gemContents.push({ role: "model", parts: parts });

                // Execute tools
                const functionResponses: any[] = [];
                for (const fc of functionCalls) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "tool_start", name: fc.name })}\n\n`));
                  const tool = connectorTools[fc.name];
                  let result: any = { error: "Unknown tool: " + fc.name };
                  if (tool) {
                    try {
                      result = await tool.execute(fc.args, auth.tenantId);
                    } catch (e) {
                      result = { error: e instanceof Error ? e.message : "Tool failed" };
                    }
                  }
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "tool_result", name: fc.name })}\n\n`));
                  functionResponses.push({ functionResponse: { name: fc.name, response: result } });
                }

                gemContents.push({ role: "user", parts: functionResponses });
              } else {
                gemLoop = false;
              }
            }
          }

          // Save and finish
          const parsedBlocks = parseContentBlocks(altText);

          if (convId) {
            await supabase.from("messages").insert({
              conversation_id: convId,
              tenant_id: auth.tenantId,
              role: "assistant",
              content: altText,
              content_blocks: parsedBlocks,
              model: resolved.displayName,
            });
          }

          await deductCredit(auth.tenantId, auth.userId, creditAction);

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "content_blocks", blocks: parsedBlocks })}\n\n`));
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "metadata", conversationId: convId, model: resolved.displayName })}\n\n`));
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
          controller.close();
          return;
        }

        // Send conversationId early so client can navigate
        if (convId) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "conversation_id", conversationId: convId })}\n\n`));
        }

        // Check if premium agent should be activated
        var premiumAgent = detectPremiumAgent(message);
        if (premiumAgent && resolved.displayName === "kairo") {
          // ═══ PREMIUM AGENT MODE ═══
          var premiumCost = premiumAgent.creditCost || 10;

          // Notify client about the premium agent + cost
          controller.enqueue(encoder.encode("data: " + JSON.stringify({
            type: "premium_agent",
            agent: { id: premiumAgent.id, name: premiumAgent.name, emoji: premiumAgent.emoji, color: premiumAgent.color, specialty: premiumAgent.specialty, creditCost: premiumCost, outputFormat: premiumAgent.outputFormat },
          }) + "\n\n"));

          // Run the premium agent with Opus
          var premiumText = await runMultiAgent(
            [premiumAgent.id],
            message,
            connectorTools,
            anthropicApiKey,
            premiumAgent.model || "claude-opus-4-6",
            auth.tenantId,
            encoder,
            controller,
          );

          var premiumBlocks = parseContentBlocks(premiumText);

          // Send the downloadable file
          controller.enqueue(encoder.encode("data: " + JSON.stringify({
            type: "premium_file",
            agentId: premiumAgent.id,
            fileName: premiumAgent.id + "-" + new Date().toISOString().split("T")[0] + "." + (premiumAgent.outputFormat === "json" ? "json" : premiumAgent.outputFormat === "html" ? "html" : premiumAgent.outputFormat === "csv" ? "csv" : "md"),
            content: premiumText,
            format: premiumAgent.outputFormat || "markdown",
          }) + "\n\n"));

          if (convId) {
            await supabase.from("messages").insert({
              conversation_id: convId, tenant_id: auth.tenantId,
              role: "assistant", content: premiumText, content_blocks: premiumBlocks, model: "kairo-premium",
            });
          }

          // Deduct premium credits
          await deductCredit(auth.tenantId, auth.userId, "report");

          controller.enqueue(encoder.encode("data: " + JSON.stringify({ type: "content_blocks", blocks: premiumBlocks }) + "\n\n"));
          controller.enqueue(encoder.encode("data: " + JSON.stringify({ type: "done" }) + "\n\n"));
          controller.close();
          return;
        }

        // Check if multi-agent should be activated
        var hasLemlist = !!connectorTools["lemlist_get_campaigns"];
        var selectedAgentIds = selectAgents(message, hasLemlist);

        if (selectedAgentIds.length >= 2 && resolved.displayName === "kairo") {
          // ═══ MULTI-AGENT MODE ═══
          var multiText = await runMultiAgent(
            selectedAgentIds,
            message,
            connectorTools,
            anthropicApiKey,
            "claude-sonnet-4-6", // Always use Sonnet for multi-agent
            auth.tenantId,
            encoder,
            controller,
          );

          if (!multiText || multiText.trim().length < 10) {
            // Orchestrator returned nothing — emit error
            sendError(controller, encoder, "UNKNOWN");
            controller.close();
            return;
          }

          var multiBlocks = parseContentBlocks(multiText);

          if (convId) {
            await supabase.from("messages").insert({
              conversation_id: convId,
              tenant_id: auth.tenantId,
              role: "assistant",
              content: multiText,
              content_blocks: multiBlocks,
              model: "kairo-multi",
            });
          }

          await deductCredit(auth.tenantId, auth.userId, "report"); // Multi-agent = report cost

          // Send the final text + blocks so it persists across page reload
          controller.enqueue(encoder.encode("data: " + JSON.stringify({ type: "text", text: multiText }) + "\n\n"));
          controller.enqueue(encoder.encode("data: " + JSON.stringify({ type: "content_blocks", blocks: multiBlocks }) + "\n\n"));
          controller.enqueue(encoder.encode("data: " + JSON.stringify({ type: "metadata", conversationId: convId, model: "kairo-multi", creditsRemaining: credits.remaining - CREDIT_COSTS.report, creditCost: CREDIT_COSTS.report }) + "\n\n"));
          controller.enqueue(encoder.encode("data: " + JSON.stringify({ type: "done" }) + "\n\n"));
          controller.close();
          return;
        }

        // ═══ SINGLE AGENT MODE (standard) ═══
        let messages: Array<{ role: string; content: any }> = [
          ...historyMessages,
          { role: "user", content: message },
        ];
        let continueLoop = true;
        let finalText = "";
        let retryAttempt = 0;
        let usedTools = false;

        while (continueLoop) {
          const useTools = retryAttempt === 0 && toolDefs.length > 0;

          const apiAbort = AbortSignal.timeout(120000); // 120s timeout
          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            signal: apiAbort,
            headers: {
              "Content-Type": "application/json",
              "x-api-key": anthropicApiKey,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: resolved.modelId,
              max_tokens: creditAction === "report" ? 16000 : 4096,
              system: systemPrompt,
              messages,
              ...(useTools ? { tools: toolDefs } : {}),
              stream: true,
            }),
          });

          if (!response.ok || !response.body) {
            let errorBody = "";
            try { errorBody = await response.text(); } catch {}

            console.error("[chat] Anthropic error:", response.status, errorBody.slice(0, 500));

            if (response.status >= 500 && retryAttempt === 0) {
              retryAttempt = 1;
              continue;
            }

            sendError(controller, encoder, "ANTHROPIC_API_ERROR", { provider: "Claude", statusCode: response.status });
            break;
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          let fullText = "";
          let toolUseBlocks: Array<{ id: string; name: string; input: any }> = [];
          let currentToolUse: { id: string; name: string; inputJson: string } | null = null;
          let stopReason = "";

          try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const jsonStr = line.slice(6).trim();
              if (jsonStr === "[DONE]") continue;

              try {
                const event = JSON.parse(jsonStr);

                if (event.type === "content_block_start" && event.content_block?.type === "tool_use") {
                  currentToolUse = { id: event.content_block.id, name: event.content_block.name, inputJson: "" };
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "tool_start", name: event.content_block.name })}\n\n`));
                }

                if (event.type === "content_block_delta") {
                  if (event.delta?.type === "text_delta") {
                    fullText += event.delta.text;
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "token", token: event.delta.text })}\n\n`));
                  }
                  if (event.delta?.type === "input_json_delta" && currentToolUse) {
                    currentToolUse.inputJson += event.delta.partial_json;
                  }
                }

                if (event.type === "content_block_stop" && currentToolUse) {
                  try {
                    const input = currentToolUse.inputJson.trim() ? JSON.parse(currentToolUse.inputJson) : {};
                    toolUseBlocks.push({ id: currentToolUse.id, name: currentToolUse.name, input });
                  } catch {
                    toolUseBlocks.push({ id: currentToolUse.id, name: currentToolUse.name, input: {} });
                  }
                  currentToolUse = null;
                }

                if (event.type === "message_delta" && event.delta?.stop_reason) {
                  stopReason = event.delta.stop_reason;
                }

                if (event.type === "error") {
                  console.error("[chat] Stream error:", event.error);
                }
              } catch {}
            }
          }

          } catch (streamErr) {
            console.error("[chat] Stream read error:", streamErr instanceof Error ? streamErr.message : streamErr);
            sendError(controller, encoder, "STREAM_INTERRUPTED");
            controller.close();
            return;
          }

          if (stopReason === "tool_use" && toolUseBlocks.length > 0) {
            usedTools = true;
            messages.push({
              role: "assistant",
              content: [
                ...(fullText ? [{ type: "text", text: fullText }] : []),
                ...toolUseBlocks.map((t) => ({ type: "tool_use", id: t.id, name: t.name, input: t.input })),
              ],
            });

            const toolResults = [];
            for (const toolCall of toolUseBlocks) {
              const tool = connectorTools[toolCall.name];
              let result: any = { error: "Unknown tool: " + toolCall.name };
              if (tool) {
                try {
                  result = await tool.execute(toolCall.input, auth.tenantId);
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "tool_result", name: toolCall.name })}\n\n`));
                } catch (e) {
                  console.error("[chat] Tool error:", toolCall.name, e instanceof Error ? e.message : e);
                  result = { error: e instanceof Error ? e.message : "Tool failed" };
                }
              }
              toolResults.push({ type: "tool_result", tool_use_id: toolCall.id, content: JSON.stringify(result) });
            }

            messages.push({ role: "user", content: toolResults });
            toolUseBlocks = [];
            finalText += fullText;
            fullText = "";
          } else {
            finalText += fullText;
            continueLoop = false;
          }
        }

        // If initially classified as "simple" but tools were used, upgrade to "standard"
        let finalAction = creditAction;
        if (creditAction === "simple" && usedTools) {
          finalAction = "standard";
        }

        const parsedBlocks = parseContentBlocks(finalText);

        await supabase.from("messages").insert({
          conversation_id: convId,
          tenant_id: auth.tenantId,
          role: "assistant",
          content: finalText,
          content_blocks: parsedBlocks,
          model: resolved.displayName,
        });

        await deductCredit(auth.tenantId, auth.userId, finalAction);

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "content_blocks", blocks: parsedBlocks })}\n\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "metadata", conversationId: convId, model: resolved.displayName, creditsRemaining: credits.remaining - CREDIT_COSTS[finalAction], creditCost: CREDIT_COSTS[finalAction] })}\n\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
        controller.close();
      } catch (error) {
        console.error("[chat] Error:", error instanceof Error ? error.message : error);
        var errCode = detectErrorCode(error);
        sendError(controller, encoder, errCode);
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
  } catch (topError) {
    console.error("[chat] Top-level error:", topError instanceof Error ? topError.message : topError);
    return NextResponse.json({ error: "Internal error: " + (topError instanceof Error ? topError.message : "unknown") }, { status: 500 });
  }
}

function zodToJsonSchema(schema: z.ZodType): Record<string, unknown> {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const properties: Record<string, unknown> = {};
    const required: string[] = [];
    for (const [key, val] of Object.entries(shape)) {
      const zodVal = val as z.ZodType;
      const prop = zodFieldToSchema(zodVal);
      properties[key] = prop;
      if (!(zodVal instanceof z.ZodOptional) && !(zodVal instanceof z.ZodDefault)) {
        required.push(key);
      }
    }
    return { type: "object", properties, ...(required.length > 0 ? { required } : {}) };
  }
  return { type: "object", properties: {} };
}

function zodFieldToSchema(zodVal: z.ZodType): Record<string, unknown> {
  if (zodVal instanceof z.ZodString) {
    const desc = (zodVal as any)._def?.description;
    return { type: "string", ...(desc ? { description: desc } : {}) };
  }
  if (zodVal instanceof z.ZodNumber) {
    const desc = (zodVal as any)._def?.description;
    return { type: "number", ...(desc ? { description: desc } : {}) };
  }
  if (zodVal instanceof z.ZodEnum) {
    return { type: "string", enum: (zodVal as any)._def?.values };
  }
  if (zodVal instanceof z.ZodOptional) {
    return zodFieldToSchema((zodVal as any)._def.innerType);
  }
  if (zodVal instanceof z.ZodDefault) {
    return zodFieldToSchema((zodVal as any)._def.innerType);
  }
  return { type: "string" };
}
