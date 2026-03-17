import { streamAnthropic } from "./anthropic";
import { streamOpenAI } from "./openai";
import { streamGemini } from "./gemini";

export type Provider = "anthropic" | "openai" | "gemini";

export interface ProviderConfig {
  provider: Provider;
  apiKey: string;
  model: string;
  systemPrompt: string;
  messages: Array<{ role: string; content: any }>;
  tools?: Array<{
    name: string;
    description: string;
    input_schema: Record<string, unknown>;
  }>;
}

/**
 * Map user-facing model names to provider configs.
 * Keys are checked in priority: tenant BYOK > server env vars.
 */
export function resolveModel(
  selectedModel: string,
  keys: { anthropic?: string; openai?: string; google?: string }
): { provider: Provider; model: string; apiKey: string } | { error: string } {
  switch (selectedModel) {
    case "revops-ai":
    case "claude":
    case "sonnet":
    case "haiku":
      if (!keys.anthropic)
        return { error: "No Anthropic API key configured" };
      return {
        provider: "anthropic",
        model:
          selectedModel === "haiku"
            ? "claude-haiku-4-5-20251001"
            : "claude-sonnet-4-20250514",
        apiKey: keys.anthropic,
      };

    case "gpt":
      if (!keys.openai)
        return {
          error:
            "No OpenAI API key configured. Add your key in Settings > LLM.",
        };
      return { provider: "openai", model: "gpt-4o", apiKey: keys.openai };

    case "gemini":
      if (!keys.google)
        return {
          error:
            "No Google AI key configured. Add your key in Settings > LLM.",
        };
      return {
        provider: "gemini",
        model: "gemini-2.0-flash",
        apiKey: keys.google,
      };

    default:
      if (!keys.anthropic)
        return { error: "No API key configured" };
      return {
        provider: "anthropic",
        model: "claude-sonnet-4-20250514",
        apiKey: keys.anthropic,
      };
  }
}

export async function callProvider(config: ProviderConfig): Promise<Response> {
  switch (config.provider) {
    case "anthropic":
      return streamAnthropic({
        apiKey: config.apiKey,
        model: config.model,
        systemPrompt: config.systemPrompt,
        messages: config.messages,
        tools: config.tools,
      });
    case "openai":
      return streamOpenAI({
        apiKey: config.apiKey,
        model: config.model,
        systemPrompt: config.systemPrompt,
        messages: config.messages,
        tools: config.tools?.map((t) => ({
          ...t,
          parameters: t.input_schema,
        })),
      });
    case "gemini":
      return streamGemini({
        apiKey: config.apiKey,
        model: config.model,
        systemPrompt: config.systemPrompt,
        messages: config.messages,
        tools: config.tools?.map((t) => ({
          ...t,
          parameters: t.input_schema,
        })),
      });
  }
}
