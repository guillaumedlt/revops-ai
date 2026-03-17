"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import MessageThread from "@/components/chat/MessageThread";
import ChatInput from "@/components/chat/ChatInput";
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
  const [chatError, setChatError] = useState<{ message: string } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const initialSent = useRef(false);
  const lastMessageRef = useRef<string>("");

  // Fetch existing messages
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
    async (message: string) => {
      if (isStreaming) return;

      // Clear any previous error
      setChatError(null);
      lastMessageRef.current = message;

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
          body: JSON.stringify({ message, conversationId }),
        });

        if (!res.ok || !res.body) {
          setChatError({ message: "Failed to connect to the server. Please try again." });
          setIsStreaming(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let accText = "";
        let finalBlocks: ContentBlock[] | null = null;
        let hadError = false;

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
              } else if (event.type === "error") {
                hadError = true;
                setChatError({ message: event.error || "Something went wrong. Please try again." });
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

        // If stream ended without a "done" event and no text was received, show error
        if (!accText && !hadError) {
          setChatError({ message: "No response received. Please try again." });
        }
      } catch {
        setChatError({ message: "Network error. Please check your connection and try again." });
      } finally {
        setIsStreaming(false);
      }
    },
    [conversationId, isStreaming]
  );

  const handleRetry = useCallback(() => {
    if (lastMessageRef.current && !isStreaming) {
      // Remove the last user message (will be re-added by sendMessage)
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "user") {
          return prev.slice(0, -1);
        }
        return prev;
      });
      setChatError(null);
      sendMessage(lastMessageRef.current);
    }
  }, [isStreaming, sendMessage]);

  // Handle initial message from query param
  useEffect(() => {
    if (loaded && !initialSent.current) {
      const initial = searchParams.get("initial");
      if (initial && messages.length === 0) {
        initialSent.current = true;
        sendMessage(initial);
      }
    }
  }, [loaded, searchParams, messages.length, sendMessage]);

  return (
    <div className="flex-1 flex flex-col h-full">
      <MessageThread
        messages={messages}
        streamingText={streamingText}
        streamingBlocks={streamingBlocks}
        activeTools={activeTools}
        error={chatError}
        onRetry={handleRetry}
      />
      <div className="shrink-0 pb-2">
        <ChatInput
          onSend={sendMessage}
          disabled={isStreaming}
          placeholder="Pose une question..."
        />
      </div>
    </div>
  );
}
