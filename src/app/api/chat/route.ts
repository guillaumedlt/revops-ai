import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthFromHeaders } from "@/lib/api-helpers";
import { routeToModel, getModelId } from "@/lib/ai/router";
import { SYSTEM_PROMPT, buildTenantContext } from "@/lib/ai/prompts/system";
import { getToolsForTenant } from "@/lib/connectors";
import { checkCredits, deductCredit, CREDIT_COSTS, CreditAction } from "@/lib/ai/credits";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseContentBlocks } from "@/lib/ai/parse-blocks";

const ChatSchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().uuid().optional(),
  model: z.string().optional(),
});

function resolveModelId(model: string | undefined, message: string): { provider: string; modelId: string; displayName: string } {
  switch (model) {
    case "claude-opus":
      return { provider: "anthropic", modelId: "claude-opus-4-20250514", displayName: "opus" };
    case "claude-sonnet":
      return { provider: "anthropic", modelId: "claude-sonnet-4-20250514", displayName: "sonnet" };
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

export async function POST(request: NextRequest) {
  const auth = getAuthFromHeaders(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = ChatSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.message }, { status: 400 });

  const { message, conversationId } = parsed.data;

  // Resolve model from request
  const resolved = resolveModelId(parsed.data.model, message);

  // Determine credit action based on message and model
  let creditAction: CreditAction = "standard";
  if (message.startsWith("/report")) {
    creditAction = "report";
  } else if (resolved.displayName === "haiku" || (resolved.displayName === "kairo" && resolved.modelId.includes("haiku"))) {
    creditAction = "simple";
  }

  const credits = await checkCredits(auth.tenantId, creditAction);
  if (!credits.allowed) {
    return NextResponse.json({ error: "Credit limit reached", creditCost: CREDIT_COSTS[creditAction], creditsRemaining: credits.remaining }, { status: 402 });
  }

  const supabase = createAdminClient();

  let convId = conversationId;
  if (!convId) {
    const { data: conv } = await supabase.from("conversations").insert({
      tenant_id: auth.tenantId,
      user_id: auth.userId,
      title: message.slice(0, 100),
    }).select("id").single();
    convId = conv?.id;
  }

  await supabase.from("messages").insert({
    conversation_id: convId,
    tenant_id: auth.tenantId,
    role: "user",
    content: message,
  });

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
        let anthropicApiKey = process.env.ANTHROPIC_API_KEY!;

        if (resolved.provider === "anthropic" && resolved.displayName !== "kairo") {
          const userKey = llmSettings.anthropicKey;
          if (!userKey) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", error: "Anthropic API key not configured. Go to Settings > LLM to add your key, or use Kairo AI which is included." })}\n\n`));
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
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
            apiKey = llmSettings.openaiKey;
            providerLabel = "OpenAI";
          } else {
            apiKey = llmSettings.googleKey;
            providerLabel = "Google AI";
          }

          if (!apiKey) {
            const errorText = providerLabel + " API key not configured. Go to Settings > LLM to add your key.";
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", error: errorText })}\n\n`));
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
            controller.close();
            return;
          }

          // Key exists but full integration coming soon
          const comingSoonText = "Support for " + providerLabel + " models with tools is coming soon. For now, please use Kairo AI or Claude models which support all features including data analysis, reports, and CRM queries.";
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "token", token: comingSoonText })}\n\n`));

          const parsedBlocks = parseContentBlocks(comingSoonText);

          await supabase.from("messages").insert({
            conversation_id: convId,
            tenant_id: auth.tenantId,
            role: "assistant",
            content: comingSoonText,
            content_blocks: parsedBlocks,
            model: resolved.displayName,
          });

          await deductCredit(auth.tenantId, auth.userId, creditAction);

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "content_blocks", blocks: parsedBlocks })}\n\n`));
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "metadata", conversationId: convId, model: resolved.displayName, creditsRemaining: credits.remaining - CREDIT_COSTS[creditAction], creditCost: CREDIT_COSTS[creditAction] })}\n\n`));
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
          controller.close();
          return;
        }

        // Anthropic provider path (kairo, claude-opus, claude-sonnet, claude-haiku)
        let messages: Array<{ role: string; content: any }> = [{ role: "user", content: message }];
        let continueLoop = true;
        let finalText = "";
        let retryAttempt = 0;
        let usedTools = false;

        while (continueLoop) {
          const useTools = retryAttempt === 0 && toolDefs.length > 0;

          const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
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

            const friendlyError = response.status >= 500
              ? "The AI service is temporarily unavailable. Please try again."
              : "API error (" + response.status + ")";

            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", error: friendlyError, statusCode: response.status })}\n\n`));
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
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "error", error: "An unexpected error occurred." })}\n\n`));
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
