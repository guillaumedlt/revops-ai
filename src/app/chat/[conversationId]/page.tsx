"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import MessageThread from "@/components/chat/MessageThread";
import ChatInputBar from "@/components/chat/ChatInputBar";
import type { ContentBlock } from "@/types/chat-blocks";
import {
  getCachedMessages,
  setCachedMessages,
  appendCachedMessage,
} from "@/lib/chat-store";

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
  const [messages, setMessages] = useState<Message[]>(() => {
    const cached = getCachedMessages(conversationId);
    return cached ?? [];
  });
  const [streamingText, setStreamingText] = useState("");
  const [streamingBlocks, setStreamingBlocks] = useState<ContentBlock[] | null>(
    null
  );
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [loaded, setLoaded] = useState(
    () => !!getCachedMessages(conversationId)
  );
  const [selectedModel, setSelectedModel] = useState("revops-ai");
  const pendingSent = useRef(false);
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

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            conversationId,
            model: useModel,
            attachment,
          }),
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

          const lines = buffer.split(String.fromCharCode(10));
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
                setActiveTools((prev) =>
                  prev.filter((t) => t !== event.name)
                );
              } else if (event.type === "content_blocks") {
                finalBlocks = event.blocks;
                setStreamingBlocks(event.blocks);
              } else if (event.type === "error") {
                accText += `\n\n**Error:** ${event.error || "Something went wrong"}`;
                pendingTextRef.current += `\n\n**Error:** ${event.error || "Something went wrong"}`;
                flushPendingText();
              } else if (event.type === "done") {
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
        setStreamingText("");
        setStreamingBlocks(null);
        setActiveTools([]);
      } finally {
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

  // Auto-send pending message from welcome page
  useEffect(() => {
    if (!loaded || pendingSent.current) return;
    if (typeof window === "undefined") return;

    const pending = sessionStorage.getItem("pending_message");
    if (pending && messages.length === 0) {
      pendingSent.current = true;
      sessionStorage.removeItem("pending_message");
      try {
        const { message, model, attachment } = JSON.parse(pending);
        setTimeout(() => sendMessage(message, model, attachment), 100);
      } catch {
        /* ignore */
      }
    }
  }, [loaded, messages.length, sendMessage]);

  const handleSend = (
    message: string,
    model: string,
    attachment?: Attachment
  ) => {
    sendMessage(message, model, attachment);
  };

  return (
    <motion.div
      className="flex flex-1 flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Messages area */}
      <MessageThread
        messages={messages}
        streamingText={streamingText}
        streamingBlocks={streamingBlocks}
        activeTools={activeTools}
        streaming={isStreaming}
      />

      {/* Input bar at bottom */}
      <div className="shrink-0 border-t border-[#F0F0F0] bg-white/80 backdrop-blur-sm pb-2">
        <div className="pt-3">
          <ChatInputBar onSend={handleSend} disabled={isStreaming} />
        </div>
      </div>
    </motion.div>
  );
}
