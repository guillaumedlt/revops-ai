"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import MessageThread from "@/components/chat/MessageThread";
import ChatInputBar from "@/components/chat/ChatInputBar";
import type { ContentBlock } from "@/types/chat-blocks";
import { getCachedMessages, setCachedMessages, appendCachedMessage, updateCachedMessage } from "@/lib/chat-store";

interface Attachment {
  type: string;
  content?: string;
  base64?: string;
  mediaType?: string;
  fileName?: string;
  mimeType?: string;
}

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
  const [messages, setMessages] = useState<Message[]>(() => {
    const cached = getCachedMessages(conversationId);
    return (cached as Message[]) ?? [];
  });
  const [streamingText, setStreamingText] = useState("");
  const [streamingBlocks, setStreamingBlocks] = useState<ContentBlock[] | null>(null);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [loaded, setLoaded] = useState(() => !!getCachedMessages(conversationId));
  const [selectedModel, setSelectedModel] = useState("revops-ai");
  const initialSent = useRef(false);
  const pendingTextRef = useRef("");
  const updateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    async function load() {
      const hadCache = !!getCachedMessages(conversationId);
      const res = await fetch(`/api/conversations/${conversationId}`);
      if (res.ok) {
        const json = await res.json();
        const msgs = json.data?.messages ?? [];
        setMessages(msgs);
        setCachedMessages(conversationId, msgs);
      }
      if (!hadCache) setLoaded(true);
    }
    load();
  }, [conversationId]);

  const flushPendingText = useCallback(() => {
    if (pendingTextRef.current) {
      const text = pendingTextRef.current;
      pendingTextRef.current = "";
      setStreamingText((prev) => prev + text);
    }
  }, []);

  const sendMessage = useCallback(
    async (message: string, model?: string, attachment?: Attachment) => {
      if (isStreaming) return;
      const useModel = model ?? selectedModel;
      setSelectedModel(useModel);

      // 1. INSTANTLY show user message + typing indicator
      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      appendCachedMessage(conversationId, userMsg);
      setIsStreaming(true);
      setStreamingText("");
      setStreamingBlocks(null);
      setActiveTools([]);
      pendingTextRef.current = "";

      // 2. THEN make API call (user sees message + typing indicator immediately)
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, conversationId, model: useModel, attachment }),
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

          const lines = buffer.split("\\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const event = JSON.parse(line.slice(6));
              if (event.type === "token") {
                accText += event.token;
                pendingTextRef.current += event.token;
                if (!updateTimerRef.current) {
                  updateTimerRef.current = setTimeout(() => {
                    flushPendingText();
                    updateTimerRef.current = null;
                  }, 30);
                }
              } else if (event.type === "tool_start") {
                setActiveTools((prev) => [...prev, event.name]);
              } else if (event.type === "tool_result") {
                setActiveTools((prev) => prev.filter((t) => t !== event.name));
              } else if (event.type === "content_blocks") {
                finalBlocks = event.blocks;
                setStreamingBlocks(event.blocks);
              } else if (event.type === "error") {
                accText += `\n\n**Error:** ${event.error || "Something went wrong"}`;
                pendingTextRef.current += `\n\n**Error:** ${event.error || "Something went wrong"}`;
                flushPendingText();
              } else if (event.type === "done") {
                // Flush any remaining pending text
                if (updateTimerRef.current) {
                  clearTimeout(updateTimerRef.current);
                  updateTimerRef.current = null;
                }
                pendingTextRef.current = "";

                const assistantMsg: Message = {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content: accText,
                  content_blocks: finalBlocks,
                  created_at: new Date().toISOString(),
                };
                setMessages((prev) => [...prev, assistantMsg]);
                appendCachedMessage(conversationId, assistantMsg);
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
        setStreamingText("");
        setStreamingBlocks(null);
        setActiveTools([]);
      } finally {
        // Final cleanup
        if (updateTimerRef.current) {
          clearTimeout(updateTimerRef.current);
          updateTimerRef.current = null;
        }
        pendingTextRef.current = "";
        setIsStreaming(false);
      }
    },
    [conversationId, isStreaming, selectedModel, flushPendingText]
  );

  useEffect(() => {
    if (loaded && !initialSent.current) {
      const initial = searchParams.get("initial");
      const model = searchParams.get("model") ?? "revops-ai";
      if (initial && messages.length === 0) {
        initialSent.current = true;
        // Check for stored attachment
        let attachment: Attachment | undefined;
        try {
          const stored = sessionStorage.getItem(`attachment_${conversationId}`);
          if (stored) {
            attachment = JSON.parse(stored);
            sessionStorage.removeItem(`attachment_${conversationId}`);
          }
        } catch { /* ignore */ }
        sendMessage(initial, model, attachment);
      }
    }
  }, [loaded, searchParams, messages.length, sendMessage, conversationId]);

  const handleSend = (message: string, model: string, attachment?: Attachment) => {
    sendMessage(message, model, attachment);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <MessageThread
        messages={messages}
        streamingText={streamingText}
        streamingBlocks={streamingBlocks}
        activeTools={activeTools}
        streaming={isStreaming}
      />
      <div className="shrink-0 pb-2">
        <ChatInputBar onSend={handleSend} disabled={isStreaming} />
      </div>
    </div>
  );
}