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
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [loaded, setLoaded] = useState(
    () => !!getCachedMessages(conversationId)
  );
  const [selectedModel, setSelectedModel] = useState("revops-ai");
  const pendingSent = useRef(false);

  // RAF-based streaming: accumulate in ref, flush at 60fps
  const streamingTextRef = useRef("");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    async function load() {
      const hadCache = !!getCachedMessages(conversationId);
      const res = await fetch("/api/conversations/" + conversationId);
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
      setMessages(function (prev) { return prev.concat([userMsg]); });
      appendCachedMessage(conversationId, userMsg);
      setIsStreaming(true);
      setStreamingText("");
      setActiveTools([]);
      streamingTextRef.current = "";

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: message,
            conversationId: conversationId,
            model: useModel,
            attachment: attachment,
          }),
        });

        if (!res.ok || !res.body) {
          setIsStreaming(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        var buffer = "";
        var accText = "";
        var finalBlocks: ContentBlock[] | null = null;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split(String.fromCharCode(10));
          buffer = lines.pop() ?? "";

          for (var li = 0; li < lines.length; li++) {
            var line = lines[li];
            if (!line.startsWith("data: ")) continue;
            try {
              var event = JSON.parse(line.slice(6));
              if (event.type === "token" && event.token) {
                accText += event.token;
                streamingTextRef.current = accText;

                // Use RAF for smooth 60fps updates instead of batched setTimeout
                if (!rafRef.current) {
                  rafRef.current = requestAnimationFrame(function () {
                    setStreamingText(streamingTextRef.current);
                    rafRef.current = null;
                  });
                }
              } else if (event.type === "tool_start") {
                setActiveTools(function (prev) { return prev.concat([event.name]); });
              } else if (event.type === "tool_result") {
                setActiveTools(function (prev) {
                  return prev.filter(function (t) { return t !== event.name; });
                });
              } else if (event.type === "content_blocks") {
                finalBlocks = event.blocks;
              } else if (event.type === "error") {
                accText += String.fromCharCode(10) + String.fromCharCode(10) + "**Error:** " + (event.error || "Something went wrong");
                streamingTextRef.current = accText;
                setStreamingText(accText);
              } else if (event.type === "done") {
                // Cancel any pending RAF
                if (rafRef.current) {
                  cancelAnimationFrame(rafRef.current);
                  rafRef.current = null;
                }

                var assistantMsg: Message = {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content: accText,
                  content_blocks: finalBlocks,
                  created_at: new Date().toISOString(),
                };
                setMessages(function (prev) { return prev.concat([assistantMsg]); });
                appendCachedMessage(conversationId, assistantMsg);
                setStreamingText("");
                setActiveTools([]);
              }
            } catch (e) {
              /* parse error */
            }
          }
        }
      } catch (e) {
        setStreamingText("");
        setActiveTools([]);
      } finally {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        streamingTextRef.current = "";
        setIsStreaming(false);
      }
    },
    [conversationId, isStreaming, selectedModel]
  );

  // Auto-send pending message from welcome page
  useEffect(function () {
    if (!loaded || pendingSent.current) return;
    if (typeof window === "undefined") return;

    var pending = sessionStorage.getItem("pending_message");
    if (pending && messages.length === 0) {
      pendingSent.current = true;
      sessionStorage.removeItem("pending_message");
      try {
        var parsed = JSON.parse(pending);
        setTimeout(function () {
          sendMessage(parsed.message, parsed.model, parsed.attachment);
        }, 100);
      } catch (e) {
        /* ignore */
      }
    }
  }, [loaded, messages.length, sendMessage]);

  var handleSend = function (
    message: string,
    model: string,
    attachment?: Attachment
  ) {
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
        activeTools={activeTools}
        streaming={isStreaming}
        conversationId={conversationId}
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
