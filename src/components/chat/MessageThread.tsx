"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import BlockRenderer from "./blocks/BlockRenderer";
import TextBlock from "./blocks/TextBlock";
import AddToDashboard from "./AddToDashboard";
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
  activeTools: string[];
  streaming?: boolean;
  conversationId?: string;
}

var PINNABLE_TYPES = ["kpi", "kpi_grid", "chart", "table"];

var BLOCK_REGEX = /:::\w+(?:\{[^}]*\})?[\s\S]*?:::/g;
function stripBlockSyntax(text: string): string {
  return text.replace(BLOCK_REGEX, "").trim();
}

function CopyButton({ text }: { text: string }) {
  var copied = React.useState(false);
  var isCopied = copied[0];
  var setCopied = copied[1];
  var handleCopy = function () {
    navigator.clipboard.writeText(text).then(function () {
      setCopied(true);
      setTimeout(function () { setCopied(false); }, 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="h-7 px-2 rounded-lg flex items-center gap-1 text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#525252] transition-colors"
      title="Copy"
    >
      {isCopied ? <Check size={13} className="text-[#22C55E]" /> : <Copy size={13} />}
      {isCopied && <span className="text-[10px] text-[#22C55E]">Copied</span>}
    </button>
  );
}

var TOOL_LABELS: Record<string, string> = {
  get_pipeline: "Analyzing pipeline...",
  get_deals: "Searching deals...",
  get_win_rate: "Calculating win rates...",
  get_velocity: "Measuring velocity...",
  get_adoption: "Checking adoption score...",
  get_alerts: "Scanning alerts...",
  get_revenue: "Computing revenue...",
  get_activity: "Reviewing activity...",
  get_data_quality: "Auditing data quality...",
  get_owner_performance: "Evaluating performance...",
  create_note: "Creating note...",
};

function AgentThinking({ activeTools }: { activeTools: string[] }) {
  if (activeTools.length === 0) {
    return (
      <div className="flex items-center gap-2 py-2">
        <div className="h-3 w-3 border-2 border-[#E5E5E5] border-t-[#737373] rounded-full animate-spin" />
        <span className="text-sm text-[#737373]">Thinking...</span>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {activeTools.map(function (tool) {
        return (
          <div key={tool} className="flex items-center gap-2 py-1">
            <div className="h-3 w-3 border-2 border-[#E5E5E5] border-t-[#737373] rounded-full animate-spin" />
            <span className="text-sm text-[#737373]">{TOOL_LABELS[tool] || tool}</span>
          </div>
        );
      })}
    </div>
  );
}

function AssistantBlocksWithPin({
  blocks,
  messageId,
  conversationId,
}: {
  blocks: ContentBlock[];
  messageId?: string;
  conversationId?: string;
}) {
  return (
    <div className="space-y-4">
      {blocks.map(function (block, i) {
        var isPinnable = PINNABLE_TYPES.includes(block.type);
        return (
          <div key={i} className={isPinnable ? "group/block relative" : ""}>
            <BlockRenderer blocks={[block]} />
            {isPinnable && (
              <div className="absolute top-2 right-2 hidden group-hover/block:flex">
                <AddToDashboard
                  block={block}
                  blockTitle={"title" in block ? (block as any).title : "label" in block ? (block as any).label : undefined}
                  messageId={messageId}
                  conversationId={conversationId}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Memoized message item to prevent re-renders during streaming
var MemoizedMessage = React.memo(function MemoizedMessage({
  msg,
  conversationId,
}: {
  msg: Message;
  conversationId?: string;
}) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[70%] bg-[#F5F5F5] text-[#0A0A0A] rounded-2xl px-4 py-2.5 text-sm">
          {msg.content}
        </div>
      </div>
    );
  }

  return (
    <div className="group w-full">
      <div className="text-sm text-[#0A0A0A] leading-relaxed">
        {msg.content_blocks && msg.content_blocks.length > 0 ? (
          <AssistantBlocksWithPin
            blocks={msg.content_blocks}
            messageId={msg.id}
            conversationId={conversationId}
          />
        ) : (
          <TextBlock text={msg.content} />
        )}
      </div>
      <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={msg.content} />
      </div>
    </div>
  );
});

export default function MessageThread({
  messages,
  streamingText,
  activeTools,
  streaming,
  conversationId,
}: Props) {
  var bottomRef = useRef<HTMLDivElement>(null);

  // Memoize the message list so it only re-renders when messages array changes,
  // NOT when streamingText changes
  var messageList = useMemo(function () {
    return messages.map(function (msg) {
      return (
        <div key={msg.id}>
          <MemoizedMessage msg={msg} conversationId={conversationId} />
        </div>
      );
    });
  }, [messages, conversationId]);

  useEffect(function () {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  return (
    <div className="flex-1 overflow-y-auto" style={{ willChange: "transform" }}>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {messageList}

        {/* Streaming state — separate from message list to avoid re-renders */}
        {streaming && (
          <div className="flex justify-start">
            <div className="group max-w-2xl w-full text-sm text-[#0A0A0A] leading-relaxed">
              {streamingText ? (
                <>
                  <TextBlock text={stripBlockSyntax(streamingText)} />
                  {streamingText.includes(":::") && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-[#A3A3A3]">
                      <div className="h-3 w-3 border-2 border-[#E5E5E5] border-t-[#737373] rounded-full animate-spin" />
                      Building report...
                    </div>
                  )}
                </>
              ) : (
                <AgentThinking activeTools={activeTools} />
              )}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
