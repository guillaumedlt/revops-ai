"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import MessageThread from "@/components/chat/MessageThread";
import ChatInputBar from "@/components/chat/ChatInputBar";
import type { ContentBlock } from "@/types/chat-blocks";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  content_blocks?: ContentBlock[] | null;
  created_at: string;
}

export default function ConversationPage() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingText, setStreamingText] = useState("");
  const [streamingBlocks, setStreamingBlocks] = useState<ContentBlock[] | null>(null);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [selectedModel, setSelectedModel] = useState("revops-ai");
  const initialSent = useRef(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/conversations/${conversationId}`);
      if (res.ok) {
        const json = await res.json();
        setMessages(json.data?.messages ?? []);
      }
      setLoaded(true);
    }
    load();
  }, [conversationId]);

  const sendMessage = useCallback(
    async (message: string, model?: string) => {
      if (isStreaming) return;
      const useModel = model ?? selectedModel;
      setSelectedModel(useModel);

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsStreaming(true);
      setStreamingText("");
      setStreamingBlocks(null);
      setActiveTools([]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, conversationId, model: useModel }),
        });

        if (!res.ok || !res.body) {
          setIsStreaming(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let accText = "";
        let finalBlocks: ContentBlock[] | null = null;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const event = JSON.parse(line.slice(6));
              if (event.type === "token") {
                accText += event.token;
                setStreamingText(accText);
              } else if (event.type === "tool_start") {
                setActiveTools((prev) => [...prev, event.name]);
              } else if (event.type === "tool_result") {
                setActiveTools((prev) => prev.filter((t) => t !== event.name));
              } else if (event.type === "content_blocks") {
                finalBlocks = event.blocks;
                setStreamingBlocks(event.blocks);
              } else if (event.type === "done") {
                const assistantMsg: Message = {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content: accText,
                  content_blocks: finalBlocks,
                  created_at: new Date().toISOString(),
                };
                setMessages((prev) => [...prev, assistantMsg]);
                setStreamingText("");
                setStreamingBlocks(null);
                setActiveTools([]);
              }
            } catch {
              /* parse error */
            }
          }
        }
      } catch {
        /* network error */
      } finally {
        setIsStreaming(false);
      }
    },
    [conversationId, isStreaming, selectedModel]
  );

  useEffect(() => {
    if (loaded && !initialSent.current) {
      const initial = searchParams.get("initial");
      const model = searchParams.get("model") ?? "revops-ai";
      if (initial && messages.length === 0) {
        initialSent.current = true;
        sendMessage(initial, model);
      }
    }
  }, [loaded, searchParams, messages.length, sendMessage]);

  const handleSend = (message: string, model: string) => {
    sendMessage(message, model);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <MessageThread
        messages={messages}
        streamingText={streamingText}
        streamingBlocks={streamingBlocks}
        activeTools={activeTools}
      />
      <div className="shrink-0 pb-2">
        <ChatInputBar
          onSend={handleSend}
          disabled={isStreaming}
        />
      </div>
    </div>
  );
}
