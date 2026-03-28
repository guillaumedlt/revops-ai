"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
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
  const params = useParams<{ conversationId: string }>();
  const conversationId = params.conversationId || "";

  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingText, setStreamingText] = useState("");
  const [streamingBlocks, setStreamingBlocks] = useState<ContentBlock[] | null>(null);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [chatError, setChatError] = useState<{ message: string } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedModel, setSelectedModel] = useState("kairo");
  const initialSent = useRef(false);
  const lastMessageRef = useRef<string>("");
  const pendingText = useRef("");
  const rafId = useRef<number | null>(null);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

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
    async (message: string, model?: string, attachment?: any) => {
      if (isStreaming) return;

      // Track selected model from picker
      if (model) setSelectedModel(model);

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
          body: JSON.stringify({
            message,
            conversationId,
            model: model || selectedModel,
            ...(attachment ? { attachment } : {}),
          }),
        });

        if (!res.ok || !res.body) {
          let errMsg = "Server error (" + res.status + ")";
          try {
            const errJson = await res.json();
            errMsg = errJson.error || errMsg;
          } catch {}
          setChatError({ message: errMsg });
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
                pendingText.current = accText;
                if (!rafId.current) {
                  rafId.current = requestAnimationFrame(function() {
                    setStreamingText(pendingText.current);
                    rafId.current = null;
                  });
                }
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
                // Flush any pending RAF
                if (rafId.current) {
                  cancelAnimationFrame(rafId.current);
                  rafId.current = null;
                }
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
    [conversationId, isStreaming, selectedModel]
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
      sendMessage(lastMessageRef.current, selectedModel);
    }
  }, [isStreaming, sendMessage, selectedModel]);



  // Handle pending message from sessionStorage (welcome page)
  useEffect(() => {
    if (loaded && !initialSent.current && messages.length === 0) {
      try {
        const pending = sessionStorage.getItem("pending_message");
        if (pending) {
          sessionStorage.removeItem("pending_message");
          initialSent.current = true;
          const parsed = JSON.parse(pending);
          sendMessage(parsed.message, parsed.model || "kairo", parsed.attachment);
        }
      } catch {
        /* sessionStorage not available */
      }
    }
  }, [loaded, messages.length, sendMessage]);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Mobile header */}
      <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-[#E5E5E5] bg-white shrink-0">
        <a href="/chat" className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5]">
          <ChevronLeft size={18} className="text-[#525252]" />
        </a>
        <span className="text-sm font-medium text-[#0A0A0A] truncate">Kairo</span>
      </div>
      <MessageThread
        messages={messages}
        streamingText={streamingText}
        streamingBlocks={streamingBlocks}
        activeTools={activeTools}
        error={chatError}
        onRetry={handleRetry}
        isLoading={isStreaming}
        onSendSuggestion={function(text) { sendMessage(text, selectedModel); }}
      />
      <div className="shrink-0 pb-2">
        <ChatInputBar
          onSend={sendMessage}
          disabled={isStreaming}
        />
      </div>
    </div>
  );
}
