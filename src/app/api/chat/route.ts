import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { routeToModel } from "@/lib/ai/router";
import { SYSTEM_PROMPT, buildTenantContext } from "@/lib/ai/prompts/system";
import { aiTools } from "@/lib/ai/tools/index";
import { checkCredits, deductCredit } from "@/lib/ai/credits";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseContentBlocks } from "@/lib/ai/parse-blocks";
import { resolveModel, callProvider, Provider } from "@/lib/ai/providers";
import { getParser, StreamEvent } from "@/lib/ai/stream-parsers";

var AttachmentSchema = z.object({
  type: z.string(),
  content: z.string().optional(),
  base64: z.string().optional(),
  mediaType: z.string().optional(),
  fileName: z.string().optional(),
  mimeType: z.string().optional(),
}).optional();

var ChatSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().uuid().optional(),
  model: z.string().optional(),
  attachment: AttachmentSchema,
});

export async function POST(request: NextRequest) {
  var auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  var body = await request.json();
  var parsed = ChatSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  // Check credits
  var credits = await checkCredits(auth!.tenantId);
  if (!credits.allowed) {
    return NextResponse.json({ error: "Credit limit reached" }, { status: 402 });
  }

  var { message, conversationId, model: requestedModel, attachment } = parsed.data;
  var supabase = createAdminClient();

  // ── Slash command detection ───────────────────────────────────────
  var commandPrefix = "";
  if (message.startsWith("/report")) {
    commandPrefix = "The user wants a PPT-style report. Structure your response as numbered slides (Slide 1: Title, Slide 2: Overview with KPIs, etc.). Use :::kpi_grid for metrics and :::chart for visualizations. Make each section a clear slide." + String.fromCharCode(10) + String.fromCharCode(10);
    message = message.replace("/report", "").trim() || "Generate a comprehensive RevOps report";
  } else if (message.startsWith("/dashboard")) {
    commandPrefix = "The user wants dashboard widgets. Include multiple :::kpi_grid and :::chart blocks that can be pinned to a dashboard." + String.fromCharCode(10) + String.fromCharCode(10);
    message = message.replace("/dashboard", "").trim() || "Show key RevOps metrics";
  } else if (message.startsWith("/analyze")) {
    commandPrefix = "The user wants a deep, comprehensive analysis. Use all available tools to gather data, then provide detailed insights with numbers, trends, and actionable recommendations. Be thorough and data-driven." + String.fromCharCode(10) + String.fromCharCode(10);
    message = message.replace("/analyze", "").trim() || "Run a comprehensive RevOps analysis";
  } else if (message.startsWith("/compare")) {
    commandPrefix = "The user wants a comparison. Present data in side-by-side tables using :::table blocks. Include percentage differences and highlight winners/losers." + String.fromCharCode(10) + String.fromCharCode(10);
    message = message.replace("/compare", "").trim() || "Compare key segments";
  } else if (message.startsWith("/forecast")) {
    commandPrefix = "The user wants a revenue or pipeline forecast. Use historical data to project future numbers. Include :::chart blocks with trend lines and :::kpi_grid for key projections." + String.fromCharCode(10) + String.fromCharCode(10);
    message = message.replace("/forecast", "").trim() || "Generate a revenue forecast";
  } else if (message.startsWith("/audit")) {
    commandPrefix = "The user wants a CRM data quality audit. Check for missing fields, stale deals, incomplete contacts, and data hygiene issues. Provide a scored report card with specific fix recommendations." + String.fromCharCode(10) + String.fromCharCode(10);
    message = message.replace("/audit", "").trim() || "Run a full CRM data quality audit";
  }

  // Get or create conversation
  var convId = conversationId;
  if (!convId) {
    var { data: conv } = await supabase.from("conversations").insert({
      tenant_id: auth!.tenantId,
      user_id: auth!.userId,
      title: message.slice(0, 100),
    }).select("id").single();
    convId = conv?.id;
  }

  // Save user message
  await supabase.from("messages").insert({
    conversation_id: convId,
    tenant_id: auth!.tenantId,
    role: "user",
    content: message,
  });

  // ---------------------------------------------------------------------------
  // Resolve provider + API key
  // ---------------------------------------------------------------------------
  var tenantKeys: { openaiKey?: string; googleKey?: string } = {};
  try {
    var { data: tenant } = await supabase
      .from("tenants")
      .select("settings")
      .eq("id", auth!.tenantId)
      .single();
    if (tenant?.settings?.llm) {
      tenantKeys = tenant.settings.llm;
    }
  } catch {
    // No tenant settings
  }

  var selectedModel = requestedModel || routeToModel(message, 0);

  var resolved = resolveModel(selectedModel, {
    anthropic: process.env.ANTHROPIC_API_KEY,
    openai: tenantKeys.openaiKey || process.env.OPENAI_API_KEY,
    google: tenantKeys.googleKey || process.env.GOOGLE_AI_KEY,
  });

  if ("error" in resolved) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  var { provider, model: modelId, apiKey } = resolved;
  var parse = getParser(provider);

  // Build system prompt with optional command prefix
  var systemPrompt =
    selectedModel === "revops-ai"
      ? SYSTEM_PROMPT + buildTenantContext({ name: "Tenant" })
      : provider === "anthropic"
        ? SYSTEM_PROMPT + buildTenantContext({ name: "Tenant" })
        : SYSTEM_PROMPT;

  if (commandPrefix) {
    systemPrompt = commandPrefix + systemPrompt;
  }

  // Build tool definitions
  var toolDefs = Object.entries(aiTools).map(function(entry) {
    var name = entry[0];
    var tool = entry[1];
    return {
      name: name,
      description: tool.description,
      input_schema: zodToJsonSchema(tool.parameters),
    };
  });

  // Build user content with optional attachment
  var userContent: any;
  if (attachment) {
    if (attachment.type === "image" && attachment.base64 && attachment.mediaType) {
      userContent = [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: attachment.mediaType,
            data: attachment.base64,
          },
        },
        { type: "text", text: attachment.fileName ? "[File: " + attachment.fileName + "]" + String.fromCharCode(10) + String.fromCharCode(10) + message : message },
      ];
    } else if (attachment.type === "text" && attachment.content) {
      userContent = "[File: " + (attachment.fileName || "file") + "]" + String.fromCharCode(10) + attachment.content + String.fromCharCode(10) + String.fromCharCode(10) + message;
    } else if (attachment.type === "document" && attachment.base64) {
      userContent = "[File attached: " + (attachment.fileName || "document") + " (" + (attachment.mimeType || "unknown type") + ")]" + String.fromCharCode(10) + "The file content is provided as base64. Please analyze it." + String.fromCharCode(10) + "Base64 data: " + attachment.base64.slice(0, 10000) + "..." + String.fromCharCode(10) + String.fromCharCode(10) + message;
    } else {
      userContent = message;
    }
  } else {
    userContent = message;
  }

  // For non-Anthropic providers, flatten image attachments to text
  if (provider !== "anthropic" && Array.isArray(userContent)) {
    var textParts = userContent.filter(function(p: any) { return p.type === "text"; });
    userContent = textParts.map(function(p: any) { return p.text; }).join(String.fromCharCode(10));
  }

  // ---------------------------------------------------------------------------
  // Streaming response
  // ---------------------------------------------------------------------------
  var encoder = new TextEncoder();
  var stream = new ReadableStream({
    async start(controller) {
      try {
        var messages: Array<{ role: string; content: any }> = [
          { role: "user", content: userContent },
        ];
        var continueLoop = true;
        var finalText = "";

        while (continueLoop) {
          var response = await callProvider({
            provider,
            apiKey,
            model: modelId,
            systemPrompt,
            messages,
            tools: provider === "anthropic" ? toolDefs : toolDefs,
          });

          if (!response.ok || !response.body) {
            var errorDetail = provider + " API error (" + response.status + ")";
            try {
              var errBody = await response.text();
              console.error(provider + " API error:", response.status, errBody);
              errorDetail = "API error: " + response.status;
            } catch {}
            controller.enqueue(
              encoder.encode(
                "data: " + JSON.stringify({ type: "error", error: errorDetail }) + String.fromCharCode(10) + String.fromCharCode(10)
              )
            );
            break;
          }

          var reader = response.body.getReader();
          var decoder = new TextDecoder();
          var buffer = "";
          var fullText = "";
          var toolUseBlocks: Array<{ id: string; name: string; input: any }> = [];
          var currentToolUse: { id: string; name: string; inputJson: string } | null = null;
          var stopReason = "";

          while (true) {
            var { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            var lines = buffer.split(String.fromCharCode(10));
            buffer = lines.pop() ?? "";

            for (var li = 0; li < lines.length; li++) {
              var line = lines[li];
              if (!line.startsWith("data: ")) continue;
              var jsonStr = line.slice(6).trim();
              if (!jsonStr || jsonStr === "[DONE]") {
                if (jsonStr === "[DONE]") {
                  stopReason = stopReason || "end_turn";
                }
                continue;
              }

              var evt = parse(jsonStr);
              if (!evt) continue;

              switch (evt.type) {
                case "token":
                  fullText += evt.token || "";
                  controller.enqueue(
                    encoder.encode(
                      "data: " + JSON.stringify({ type: "token", token: evt.token }) + String.fromCharCode(10) + String.fromCharCode(10)
                    )
                  );
                  break;

                case "tool_start":
                  currentToolUse = {
                    id: evt.toolId || "",
                    name: evt.toolName || "",
                    inputJson: "",
                  };
                  controller.enqueue(
                    encoder.encode(
                      "data: " + JSON.stringify({ type: "tool_start", name: evt.toolName }) + String.fromCharCode(10) + String.fromCharCode(10)
                    )
                  );
                  break;

                case "tool_input":
                  if (currentToolUse) {
                    currentToolUse.inputJson += evt.toolInput || "";
                  }
                  break;

                case "tool_done":
                  if (currentToolUse) {
                    try {
                      var input = JSON.parse(currentToolUse.inputJson);
                      toolUseBlocks.push({
                        id: currentToolUse.id,
                        name: currentToolUse.name,
                        input: input,
                      });
                    } catch {
                      /* invalid JSON */
                    }
                    currentToolUse = null;
                  }
                  break;

                case "done":
                  stopReason = evt.stopReason || "end_turn";
                  break;
              }
            }
          }

          // Tool use loop
          if (
            stopReason === "tool_use" &&
            toolUseBlocks.length > 0 &&
            provider === "anthropic"
          ) {
            var assistantContent: any[] = [];
            if (fullText) {
              assistantContent.push({ type: "text", text: fullText });
            }
            for (var ti = 0; ti < toolUseBlocks.length; ti++) {
              assistantContent.push({
                type: "tool_use",
                id: toolUseBlocks[ti].id,
                name: toolUseBlocks[ti].name,
                input: toolUseBlocks[ti].input,
              });
            }
            messages.push({ role: "assistant", content: assistantContent });

            var toolResults: any[] = [];
            for (var tj = 0; tj < toolUseBlocks.length; tj++) {
              var toolCall = toolUseBlocks[tj];
              var tool = aiTools[toolCall.name as keyof typeof aiTools];
              var result: any = { error: "Unknown tool" };
              if (tool) {
                try {
                  result = await (tool.execute as any)(
                    toolCall.input,
                    auth!.tenantId
                  );
                  controller.enqueue(
                    encoder.encode(
                      "data: " + JSON.stringify({ type: "tool_result", name: toolCall.name }) + String.fromCharCode(10) + String.fromCharCode(10)
                    )
                  );
                } catch (e) {
                  result = {
                    error:
                      e instanceof Error ? e.message : "Tool execution failed",
                  };
                }
              }
              toolResults.push({
                type: "tool_result",
                tool_use_id: toolCall.id,
                content: JSON.stringify(result),
              });
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

        var parsedBlocks = parseContentBlocks(finalText);

        var modelLabel =
          provider === "anthropic"
            ? selectedModel === "haiku"
              ? "haiku"
              : "sonnet"
            : selectedModel;

        await supabase.from("messages").insert({
          conversation_id: convId,
          tenant_id: auth!.tenantId,
          role: "assistant",
          content: finalText,
          content_blocks: parsedBlocks,
          model: modelLabel,
        });

        await deductCredit(auth!.tenantId, auth!.userId);

        await supabase
          .from("conversations")
          .update({ last_message_at: new Date().toISOString() })
          .eq("id", convId);

        controller.enqueue(
          encoder.encode(
            "data: " + JSON.stringify({ type: "content_blocks", blocks: parsedBlocks }) + String.fromCharCode(10) + String.fromCharCode(10)
          )
        );
        controller.enqueue(
          encoder.encode(
            "data: " + JSON.stringify({
              type: "metadata",
              conversationId: convId,
              model: modelLabel,
              provider: provider,
              creditsRemaining: credits.remaining - 1,
            }) + String.fromCharCode(10) + String.fromCharCode(10)
          )
        );
        controller.enqueue(
          encoder.encode("data: " + JSON.stringify({ type: "done" }) + String.fromCharCode(10) + String.fromCharCode(10))
        );
        controller.close();
      } catch (error) {
        console.error("Chat route error:", error);
        controller.enqueue(
          encoder.encode(
            "data: " + JSON.stringify({ type: "error", error: "Internal error" }) + String.fromCharCode(10) + String.fromCharCode(10)
          )
        );
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
}

// Convert Zod schema to JSON Schema (simplified)
function zodToJsonSchema(schema: z.ZodType): Record<string, unknown> {
  if (schema instanceof z.ZodObject) {
    var shape = schema.shape;
    var properties: Record<string, unknown> = {};
    var required: string[] = [];
    for (var key of Object.keys(shape)) {
      var zodVal = shape[key] as z.ZodType;
      if (zodVal instanceof z.ZodString) {
        properties[key] = { type: "string", description: (zodVal as any)._def?.description };
      } else if (zodVal instanceof z.ZodNumber) {
        properties[key] = { type: "number" };
      } else if (zodVal instanceof z.ZodEnum) {
        properties[key] = { type: "string", enum: (zodVal as any)._def?.values };
      } else if (zodVal instanceof z.ZodOptional) {
        var inner = (zodVal as any)._def.innerType;
        if (inner instanceof z.ZodString) properties[key] = { type: "string" };
        else if (inner instanceof z.ZodNumber) properties[key] = { type: "number" };
        else if (inner instanceof z.ZodEnum) properties[key] = { type: "string", enum: inner._def?.values };
        else properties[key] = { type: "string" };
      } else if (zodVal instanceof z.ZodDefault) {
        var innerDef = (zodVal as any)._def.innerType;
        if (innerDef instanceof z.ZodNumber) properties[key] = { type: "number" };
        else properties[key] = { type: "string" };
      } else {
        properties[key] = { type: "string" };
      }
      if (!(zodVal instanceof z.ZodOptional) && !(zodVal instanceof z.ZodDefault)) {
        required.push(key);
      }
    }
    return { type: "object", properties: properties, ...(required.length > 0 ? { required: required } : {}) };
  }
  return { type: "object", properties: {} };
}
