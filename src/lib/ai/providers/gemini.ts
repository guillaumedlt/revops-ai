export async function streamGemini(params: {
  apiKey: string;
  model: string;
  systemPrompt: string;
  messages: Array<{ role: string; content: any }>;
  tools?: Array<{ name: string; description: string; parameters: Record<string, unknown> }>;
}): Promise<Response> {
  const geminiModel = params.model || "gemini-2.0-flash";

  // Convert messages to Gemini format
  const contents = params.messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [
      {
        text: typeof m.content === "string" ? m.content : JSON.stringify(m.content),
      },
    ],
  }));

  // Convert tools to Gemini format
  const geminiTools = params.tools?.length
    ? [
        {
          functionDeclarations: params.tools.map((t) => ({
            name: t.name,
            description: t.description,
            parameters: t.parameters,
          })),
        },
      ]
    : undefined;

  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:streamGenerateContent?alt=sse&key=${params.apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: params.systemPrompt }] },
        contents,
        tools: geminiTools,
      }),
    }
  );
}
