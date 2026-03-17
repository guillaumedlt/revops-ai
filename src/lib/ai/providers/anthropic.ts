export async function streamAnthropic(params: {
  apiKey: string;
  model: string;
  systemPrompt: string;
  messages: Array<{ role: string; content: any }>;
  tools?: Array<{ name: string; description: string; input_schema: Record<string, unknown> }>;
  maxTokens?: number;
}): Promise<Response> {
  return fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": params.apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: params.model,
      max_tokens: params.maxTokens || 4096,
      system: params.systemPrompt,
      messages: params.messages,
      tools: params.tools,
      stream: true,
    }),
  });
}
