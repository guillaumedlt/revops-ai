"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, ThumbsUp, Share2, ChevronDown } from "lucide-react";
import BlockRenderer from "./blocks/BlockRenderer";
import TextBlock from "./blocks/TextBlock";
import type { ContentBlock } from "@/types/chat-blocks";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  content_blocks?: ContentBlock[] | null;
}

interface Props {
  messages: Message[];
  streamingText: string;
  streamingBlocks?: ContentBlock[] | null;
  activeTools: string[];
  streaming?: boolean;
}

function MessageActions() {
  return (
    <div className="flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="h-7 w-7 rounded-lg flex items-center justify-center text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#525252] transition-colors" title="Copy">
        <Copy size={13} />
      </button>
      <button className="h-7 w-7 rounded-lg flex items-center justify-center text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#525252] transition-colors" title="Like">
        <ThumbsUp size={13} />
      </button>
      <button className="h-7 w-7 rounded-lg flex items-center justify-center text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#525252] transition-colors" title="Share">
        <Share2 size={13} />
      </button>
    </div>
  );
}

function ToolIndicator({ tools }: { tools: string[] }) {
  const [expanded, setExpanded] = useState(false);

  if (tools.length === 0) return null;

  const label = "Analyzing" + (tools.length > 0 ? " — " + tools.join(", ") : "");

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="flex items-center gap-1.5 text-xs text-[#A3A3A3] mb-2 hover:text-[#525252] transition-colors"
    >
      <span className="h-3 w-3 rounded-full border-2 border-[#A3A3A3] border-t-transparent animate-spin" />
      <span>{label}</span>
      <ChevronDown size={12} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
    </button>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-1 py-2">
      <span className="h-2 w-2 rounded-full bg-[#D4D4D4] animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="h-2 w-2 rounded-full bg-[#D4D4D4] animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="h-2 w-2 rounded-full bg-[#D4D4D4] animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  );
}

export default function MessageThread({
  messages,
  streamingText,
  streamingBlocks,
  activeTools,
  streaming,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={msg.role === "user" ? "flex justify-end" : "group"}
          >
            {msg.role === "user" ? (
              <div className="max-w-[70%] bg-[#F5F5F5] text-[#0A0A0A] rounded-2xl px-4 py-2.5 text-sm">
                {msg.content}
              </div>
            ) : (
              <div className="w-full">
                <div className="text-sm text-[#0A0A0A] leading-relaxed">
                  {msg.content_blocks && msg.content_blocks.length > 0 ? (
                    <BlockRenderer blocks={msg.content_blocks} />
                  ) : (
                    <TextBlock text={msg.content} />
                  )}
                </div>
                <MessageActions />
              </div>
            )}
          </div>
        ))}

        {/* Streaming state */}
        {(streamingText || activeTools.length > 0 || (streaming && !streamingText)) && (
          <div className="group">
            <ToolIndicator tools={activeTools} />
            {streamingText ? (
              <div className="text-sm text-[#0A0A0A] leading-relaxed">
                {streamingBlocks && streamingBlocks.length > 0 ? (
                  <BlockRenderer blocks={streamingBlocks} />
                ) : (
                  <TextBlock text={streamingText} />
                )}
              </div>
            ) : streaming && activeTools.length === 0 ? (
              <TypingIndicator />
            ) : null}
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
