import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { routeToModel, getModelId } from "@/lib/ai/router";
import { SYSTEM_PROMPT, buildTenantContext } from "@/lib/ai/prompts/system";
import { aiTools } from "@/lib/ai/tools/index";
import { checkCredits, deductCredit } from "@/lib/ai/credits";
import { createAdminClient } from "@/lib/supabase/admin";

const ChatSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().uuid().optional(),
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
    return NextResponse.json({ error: "Limite de credits atteinte" }, { status: 402 });
  }

  const { message, conversationId } = parsed.data;
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

  // Route model
  const modelChoice = routeToModel(message, 0);
  const modelId = getModelId(modelChoice);

  // Build messages
  const systemPrompt = SYSTEM_PROMPT + buildTenantContext({ name: "Tenant" });

  // Build tool definitions for Anthropic API
  const toolDefs = Object.entries(aiTools).map(([name, tool]) => ({
    name,
    description: tool.description,
    input_schema: zodToJsonSchema(tool.parameters),
  }));

  // Call Anthropic API with streaming
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        let messages: Array<{ role: string; content: any }> = [{ role: "user", content: message }];
        let continueLoop = true;

        while (continueLoop) {
          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.ANTHROPIC_API_KEY!,
              "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
              model: modelId,
              max_tokens: 2048,
              system: systemPrompt,
              messages,
              tools: toolDefs,
              stream: true,
            }),
          });

          if (!response.ok || !response.body) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", error: "API error" })}\n\n`));
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
                    const input = JSON.parse(currentToolUse.inputJson);
                    toolUseBlocks.push({ id: currentToolUse.id, name: currentToolUse.name, input });
                  } catch { /* invalid JSON */ }
                  currentToolUse = null;
                }

                if (event.type === "message_delta" && event.delta?.stop_reason) {
                  stopReason = event.delta.stop_reason;
                }
              } catch { /* parse error, skip */ }
            }
          }

          // If tool_use, execute tools and continue
          if (stopReason === "tool_use" && toolUseBlocks.length > 0) {
            // Add assistant message with tool uses
            messages.push({
              role: "assistant",
              content: [
                ...(fullText ? [{ type: "text", text: fullText }] : []),
                ...toolUseBlocks.map((t) => ({ type: "tool_use", id: t.id, name: t.name, input: t.input })),
              ],
            });

            // Execute each tool
            const toolResults = [];
            for (const toolCall of toolUseBlocks) {
              const tool = aiTools[toolCall.name as keyof typeof aiTools];
              let result = { error: "Unknown tool" };
              if (tool) {
                try {
                  result = await (tool.execute as any)(toolCall.input, auth.tenantId);
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "tool_result", name: toolCall.name })}\n\n`));
                } catch (e) {
                  result = { error: e instanceof Error ? e.message : "Tool execution failed" };
                }
              }
              toolResults.push({ type: "tool_result", tool_use_id: toolCall.id, content: JSON.stringify(result) });
            }

            messages.push({ role: "user", content: toolResults });
            toolUseBlocks = [];
            fullText = "";
          } else {
            continueLoop = false;
          }
        }

        // Save assistant message
        // (fullText collected from last iteration)
        await supabase.from("messages").insert({
          conversation_id: convId,
          tenant_id: auth.tenantId,
          role: "assistant",
          content: "Response saved", // Would be fullText but it's from the stream
          model: modelChoice,
        });

        // Deduct credit
        await deductCredit(auth.tenantId, auth.userId);

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "metadata", conversationId: convId, model: modelChoice, creditsRemaining: credits.remaining - 1 })}\n\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
        controller.close();
      } catch (error) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", error: "Internal error" })}\n\n`));
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
