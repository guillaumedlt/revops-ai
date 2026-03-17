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

const AttachmentSchema = z.object({
  type: z.string(),
  content: z.string().optional(),
  base64: z.string().optional(),
  mediaType: z.string().optional(),
  fileName: z.string().optional(),
  mimeType: z.string().optional(),
}).optional();

const ChatSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().uuid().optional(),
  model: z.string().optional(),
  attachment: AttachmentSchema,
});

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = ChatSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  // Check credits
  const credits = await checkCredits(auth.tenantId);
  if (!credits.allowed) {
    return NextResponse.json({ error: "Credit limit reached" }, { status: 402 });
  }

  const { message, conversationId, model: requestedModel, attachment } = parsed.data;
  const supabase = createAdminClient();

  // Get or create conversation
  let convId = conversationId;
  if (!convId) {
    const { data: conv } = await supabase.from("conversations").insert({
      tenant_id: auth.tenantId,
      user_id: auth.userId,
      title: message.slice(0, 100),
    }).select("id").single();
    convId = conv?.id;
  }

  // Save user message
  await supabase.from("messages").insert({
    conversation_id: convId,
    tenant_id: auth.tenantId,
    role: "user",
    content: message,
  });

  // ---------------------------------------------------------------------------
  // Resolve provider + API key
  // Priority: tenant BYOK keys > server env vars
  // ---------------------------------------------------------------------------
  let tenantKeys: { openaiKey?: string; googleKey?: string } = {};
  try {
    const { data: tenant } = await supabase
      .from("tenants")
      .select("settings")
      .eq("id", auth.tenantId)
      .single();
    if (tenant?.settings?.llm) {
      tenantKeys = tenant.settings.llm;
    }
  } catch {
    // No tenant settings — fall through to env vars
  }

  // Determine the selected model string
  const selectedModel = requestedModel || routeToModel(message, 0);

  const resolved = resolveModel(selectedModel, {
    anthropic: process.env.ANTHROPIC_API_KEY,
    openai: tenantKeys.openaiKey || process.env.OPENAI_API_KEY,
    google: tenantKeys.googleKey || process.env.GOOGLE_AI_KEY,
  });

  if ("error" in resolved) {
    return NextResponse.json({ error: resolved.error }, { status: 400 });
  }

  const { provider, model: modelId, apiKey } = resolved;
  const parse = getParser(provider);

  // Build system prompt — enhanced for RevOps AI, basic for others
  const systemPrompt =
    selectedModel === "revops-ai"
      ? SYSTEM_PROMPT + buildTenantContext({ name: "Tenant" })
      : provider === "anthropic"
        ? SYSTEM_PROMPT + buildTenantContext({ name: "Tenant" })
        : SYSTEM_PROMPT;

  // Build tool definitions for Anthropic API format (canonical)
  const toolDefs = Object.entries(aiTools).map(([name, tool]) => ({
    name,
    description: tool.description,
    input_schema: zodToJsonSchema(tool.parameters),
  }));

  // Build user content with optional attachment
  let userContent: any;
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
        { type: "text", text: attachment.fileName ? `[File: ${attachment.fileName}]\n\n${message}` : message },
      ];
    } else if (attachment.type === "text" && attachment.content) {
      userContent = `[File: ${attachment.fileName || "file"}]\n${attachment.content}\n\n${message}`;
    } else if (attachment.type === "document" && attachment.base64) {
      userContent = `[File attached: ${attachment.fileName || "document"} (${attachment.mimeType || "unknown type"})]\nThe file content is provided as base64. Please analyze it.\nBase64 data: ${attachment.base64.slice(0, 10000)}...\n\n${message}`;
    } else {
      userContent = message;
    }
  } else {
    userContent = message;
  }

  // For non-Anthropic providers, flatten image attachments to text
  if (provider !== "anthropic" && Array.isArray(userContent)) {
    const textParts = userContent.filter((p: any) => p.type === "text");
    userContent = textParts.map((p: any) => p.text).join("\n");
  }

  // ---------------------------------------------------------------------------
  // Streaming response
  // ---------------------------------------------------------------------------
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        let messages: Array<{ role: string; content: any }> = [
          { role: "user", content: userContent },
        ];
        let continueLoop = true;
        let finalText = "";

        while (continueLoop) {
          const response = await callProvider({
            provider,
            apiKey,
            model: modelId,
            systemPrompt,
            messages,
            tools: provider === "anthropic" ? toolDefs : toolDefs,
            // All providers get tools — format conversion is handled in callProvider
          });

          if (!response.ok || !response.body) {
            let errorDetail = `${provider} API error (${response.status})`;
            try {
              const errBody = await response.text();
              console.error(`${provider} API error:`, response.status, errBody);
              errorDetail = `API error: ${response.status}`;
            } catch {}
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "error", error: errorDetail })}\n\n`
              )
            );
            break;
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          let fullText = "";
          let toolUseBlocks: Array<{ id: string; name: string; input: any }> = [];
          let currentToolUse: { id: string; name: string; inputJson: string } | null = null;
          let stopReason = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const jsonStr = line.slice(6).trim();
              if (!jsonStr || jsonStr === "[DONE]") {
                if (jsonStr === "[DONE]") {
                  stopReason = stopReason || "end_turn";
                }
                continue;
              }

              const evt = parse(jsonStr);
              if (!evt) continue;

              switch (evt.type) {
                case "token":
                  fullText += evt.token || "";
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ type: "token", token: evt.token })}\n\n`
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
                      `data: ${JSON.stringify({ type: "tool_start", name: evt.toolName })}\n\n`
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
                      const input = JSON.parse(currentToolUse.inputJson);
                      toolUseBlocks.push({
                        id: currentToolUse.id,
                        name: currentToolUse.name,
                        input,
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

          // ---------------------------------------------------------------
          // Tool use loop — currently only supported for Anthropic
          // TODO: Add tool execution support for OpenAI and Gemini providers
          // ---------------------------------------------------------------
          if (
            stopReason === "tool_use" &&
            toolUseBlocks.length > 0 &&
            provider === "anthropic"
          ) {
            messages.push({
              role: "assistant",
              content: [
                ...(fullText
                  ? [{ type: "text", text: fullText }]
                  : []),
                ...toolUseBlocks.map((t) => ({
                  type: "tool_use",
                  id: t.id,
                  name: t.name,
                  input: t.input,
                })),
              ],
            });

            const toolResults = [];
            for (const toolCall of toolUseBlocks) {
              const tool = aiTools[toolCall.name as keyof typeof aiTools];
              let result = { error: "Unknown tool" };
              if (tool) {
                try {
                  result = await (tool.execute as any)(
                    toolCall.input,
                    auth.tenantId
                  );
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ type: "tool_result", name: toolCall.name })}\n\n`
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

        const parsedBlocks = parseContentBlocks(finalText);

        // Determine model label for storage
        const modelLabel =
          provider === "anthropic"
            ? selectedModel === "haiku"
              ? "haiku"
              : "sonnet"
            : selectedModel;

        await supabase.from("messages").insert({
          conversation_id: convId,
          tenant_id: auth.tenantId,
          role: "assistant",
          content: finalText,
          content_blocks: parsedBlocks,
          model: modelLabel,
        });

        await deductCredit(auth.tenantId, auth.userId);

        // Update conversation last_message_at for sidebar ordering
        await supabase
          .from("conversations")
          .update({ last_message_at: new Date().toISOString() })
          .eq("id", convId);

        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "content_blocks", blocks: parsedBlocks })}\n\n`
          )
        );
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: "metadata",
              conversationId: convId,
              model: modelLabel,
              provider,
              creditsRemaining: credits.remaining - 1,
            })}\n\n`
          )
        );
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`)
        );
        controller.close();
      } catch (error) {
        console.error("Chat route error:", error);
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ type: "error", error: "Internal error" })}\n\n`
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
    const shape = schema.shape;
    const properties: Record<string, unknown> = {};
    const required: string[] = [];
    for (const [key, val] of Object.entries(shape)) {
      const zodVal = val as z.ZodType;
      if (zodVal instanceof z.ZodString) {
        properties[key] = { type: "string", description: (zodVal as any)._def?.description };
      } else if (zodVal instanceof z.ZodNumber) {
        properties[key] = { type: "number" };
      } else if (zodVal instanceof z.ZodEnum) {
        properties[key] = { type: "string", enum: (zodVal as any)._def?.values };
      } else if (zodVal instanceof z.ZodOptional) {
        const inner = (zodVal as any)._def.innerType;
        if (inner instanceof z.ZodString) properties[key] = { type: "string" };
        else if (inner instanceof z.ZodNumber) properties[key] = { type: "number" };
        else if (inner instanceof z.ZodEnum) properties[key] = { type: "string", enum: inner._def?.values };
        else properties[key] = { type: "string" };
      } else if (zodVal instanceof z.ZodDefault) {
        const inner = (zodVal as any)._def.innerType;
        if (inner instanceof z.ZodNumber) properties[key] = { type: "number" };
        else properties[key] = { type: "string" };
      } else {
        properties[key] = { type: "string" };
      }
      if (!(zodVal instanceof z.ZodOptional) && !(zodVal instanceof z.ZodDefault)) {
        required.push(key);
      }
    }
    return { type: "object", properties, ...(required.length > 0 ? { required } : {}) };
  }
  return { type: "object", properties: {} };
}
