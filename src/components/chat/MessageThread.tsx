"use client";

import { useEffect, useRef } from "react";
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
}

export default function MessageThread({ messages, streamingText, streamingBlocks, activeTools }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.role === "user" ? "flex justify-end" : ""}>
            {msg.role === "user" ? (
              <div className="max-w-[70%] bg-[#0A0A0A] text-white rounded-2xl px-4 py-2.5 text-sm">
                {msg.content}
              </div>
            ) : (
              <div className="w-full bg-white border border-[#E5E5E5] rounded-2xl px-5 py-4 text-sm text-[#0A0A0A]">
                {msg.content_blocks && msg.content_blocks.length > 0 ? (
                  <BlockRenderer blocks={msg.content_blocks} />
                ) : (
                  <TextBlock text={msg.content} />
                )}
              </div>
            )}
          </div>
        ))}

        {/* Streaming state */}
        {(streamingText || activeTools.length > 0) && (
          <div className="w-full bg-white border border-[#E5E5E5] rounded-2xl px-5 py-4 text-sm text-[#0A0A0A]">
            {activeTools.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {activeTools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1.5 text-xs bg-[#F5F5F5] text-[#737373] rounded-full px-2.5 py-1"
                  >
                    <span className="w-2 h-2 bg-[#0A0A0A] rounded-full animate-pulse" />
                    {tool}
                  </span>
                ))}
              </div>
            )}
            {streamingText && (
              streamingBlocks && streamingBlocks.length > 0 ? (
                <BlockRenderer blocks={streamingBlocks} />
              ) : (
                <TextBlock text={streamingText} />
              )
            )}
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
