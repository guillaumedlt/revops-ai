/**
 * Unified SSE event type emitted by all provider parsers.
 * The chat route consumes these to stream tokens to the client.
 */
export interface StreamEvent {
  type:
    | "token"
    | "tool_start"
    | "tool_input"
    | "tool_done"
    | "done"
    | "error";
  token?: string;
  toolName?: string;
  toolId?: string;
  toolInput?: string;
  stopReason?: string;
  error?: string;
}

// ---------------------------------------------------------------------------
// Anthropic SSE parser
// ---------------------------------------------------------------------------
export function parseAnthropicEvent(jsonStr: string): StreamEvent | null {
  try {
    const event = JSON.parse(jsonStr);

    if (
      event.type === "content_block_start" &&
      event.content_block?.type === "tool_use"
    ) {
      return {
        type: "tool_start",
        toolName: event.content_block.name,
        toolId: event.content_block.id,
      };
    }

    if (event.type === "content_block_delta") {
      if (event.delta?.type === "text_delta") {
        return { type: "token", token: event.delta.text };
      }
      if (event.delta?.type === "input_json_delta") {
        return { type: "tool_input", toolInput: event.delta.partial_json };
      }
    }

    if (event.type === "content_block_stop") {
      return { type: "tool_done" };
    }

    if (event.type === "message_delta" && event.delta?.stop_reason) {
      return { type: "done", stopReason: event.delta.stop_reason };
    }

    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// OpenAI SSE parser
// ---------------------------------------------------------------------------
export function parseOpenAIEvent(jsonStr: string): StreamEvent | null {
  try {
    if (jsonStr === "[DONE]") {
      return { type: "done", stopReason: "end_turn" };
    }
    const event = JSON.parse(jsonStr);
    const choice = event.choices?.[0];
    if (!choice) return null;

    const delta = choice.delta;
    if (delta?.content) {
      return { type: "token", token: delta.content };
    }
    if (delta?.tool_calls?.[0]) {
      const tc = delta.tool_calls[0];
      if (tc.function?.name) {
        return {
          type: "tool_start",
          toolName: tc.function.name,
          toolId: tc.id,
        };
      }
      if (tc.function?.arguments) {
        return { type: "tool_input", toolInput: tc.function.arguments };
      }
    }
    if (choice.finish_reason === "tool_calls") {
      return { type: "done", stopReason: "tool_use" };
    }
    if (choice.finish_reason === "stop") {
      return { type: "done", stopReason: "end_turn" };
    }
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Gemini SSE parser
// ---------------------------------------------------------------------------
export function parseGeminiEvent(jsonStr: string): StreamEvent | null {
  try {
    const event = JSON.parse(jsonStr);
    const candidate = event.candidates?.[0];
    if (!candidate?.content?.parts) return null;

    for (const part of candidate.content.parts) {
      if (part.text) {
        return { type: "token", token: part.text };
      }
      if (part.functionCall) {
        return {
          type: "tool_start",
          toolName: part.functionCall.name,
          toolId: part.functionCall.name,
        };
      }
    }

    if (candidate.finishReason === "STOP") {
      return { type: "done", stopReason: "end_turn" };
    }
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------
export function getParser(
  provider: string
): (json: string) => StreamEvent | null {
  switch (provider) {
    case "openai":
      return parseOpenAIEvent;
    case "gemini":
      return parseGeminiEvent;
    default:
      return parseAnthropicEvent;
  }
}
