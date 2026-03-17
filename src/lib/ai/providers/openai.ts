export async function streamOpenAI(params: {
  apiKey: string;
  model: string;
  systemPrompt: string;
  messages: Array<{ role: string; content: any }>;
  tools?: Array<{ name: string; description: string; parameters: Record<string, unknown> }>;
}): Promise<Response> {
  // Convert messages to OpenAI format
  const openaiMessages = [
    { role: "system" as const, content: params.systemPrompt },
    ...params.messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: typeof m.content === "string" ? m.content : JSON.stringify(m.content),
    })),
  ];

  // Convert tools to OpenAI function calling format
  const openaiTools = params.tools?.map((t) => ({
    type: "function" as const,
    function: {
      name: t.name,
      description: t.description,
      parameters: t.parameters,
    },
  }));

  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.apiKey}`,
    },
    body: JSON.stringify({
      model: params.model,
      messages: openaiMessages,
      tools: openaiTools?.length ? openaiTools : undefined,
      stream: true,
    }),
  });
}
