"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Copy, ThumbsUp, Share2 } from "lucide-react";
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

function stripBlockSyntax(text: string): string {
  return text.replace(/:::\w+(?:\{[^}]*\})?\n[\s\S]*?:::/g, "").trim();
}

function MessageActions() {
  return (
    <div className="flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        className="h-7 w-7 rounded-lg flex items-center justify-center text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#525252] transition-colors"
        title="Copy"
      >
        <Copy size={13} />
      </button>
      <button
        className="h-7 w-7 rounded-lg flex items-center justify-center text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#525252] transition-colors"
        title="Like"
      >
        <ThumbsUp size={13} />
      </button>
      <button
        className="h-7 w-7 rounded-lg flex items-center justify-center text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#525252] transition-colors"
        title="Share"
      >
        <Share2 size={13} />
      </button>
    </div>
  );
}

const TOOL_AGENTS: Record<
  string,
  { name: string; icon: string; action: string }
> = {
  get_pipeline: {
    name: "Pipeline Agent",
    icon: "\u{1F4CA}",
    action: "Analyzing pipeline data...",
  },
  get_deals: {
    name: "Deal Agent",
    icon: "\u{1F4BC}",
    action: "Searching deals...",
  },
  get_win_rate: {
    name: "Closing Agent",
    icon: "\u{1F3AF}",
    action: "Calculating win rates...",
  },
  get_velocity: {
    name: "Velocity Agent",
    icon: "\u26A1",
    action: "Measuring sales velocity...",
  },
  get_adoption: {
    name: "Adoption Agent",
    icon: "\u{1F4C8}",
    action: "Checking adoption score...",
  },
  get_alerts: {
    name: "Alert Agent",
    icon: "\u{1F514}",
    action: "Scanning for alerts...",
  },
  get_revenue: {
    name: "Revenue Agent",
    icon: "\u{1F4B0}",
    action: "Computing revenue metrics...",
  },
  get_activity: {
    name: "Activity Agent",
    icon: "\u{1F4CB}",
    action: "Reviewing activity data...",
  },
  get_data_quality: {
    name: "Data Quality Agent",
    icon: "\u{1F9F9}",
    action: "Auditing data quality...",
  },
  get_owner_performance: {
    name: "Performance Agent",
    icon: "\u{1F464}",
    action: "Evaluating rep performance...",
  },
  create_note: {
    name: "Notes Agent",
    icon: "\u{1F4DD}",
    action: "Creating note...",
  },
};

function AgentThinking({
  activeTools,
  streamingText,
  streaming,
  streamingBlocks,
}: {
  activeTools: string[];
  streamingText: string;
  streaming?: boolean;
  streamingBlocks?: ContentBlock[] | null;
}) {
  const hasText =
    streamingText && stripBlockSyntax(streamingText).trim().length > 0;

  if (hasText) {
    return (
      <div className="text-sm text-[#0A0A0A] leading-relaxed">
        {streamingBlocks && streamingBlocks.length > 0 ? (
          <BlockRenderer blocks={streamingBlocks} />
        ) : (
          <>
            <TextBlock text={stripBlockSyntax(streamingText)} />
            {streaming && streamingText.includes(":::") && (
              <div className="flex items-center gap-2 mt-3 py-2 px-3 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                <div className="h-4 w-4 border-2 border-[#E5E5E5] border-t-[#0A0A0A] rounded-full animate-spin" />
                <span className="text-xs text-[#737373]">
                  Building report...
                </span>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  if (activeTools.length > 0) {
    return (
      <div className="space-y-2">
        {activeTools.map((tool) => {
          const agent = TOOL_AGENTS[tool] ?? {
            name: "RevOps Agent",
            icon: "\u{1F916}",
            action: \`Running \${tool}...\`,
          };
          return (
            <motion.div
              key={tool}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 py-2 px-3 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]"
            >
              <span className="text-base">{agent.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#0A0A0A]">
                  {agent.name}
                </p>
                <p className="text-[11px] text-[#737373]">{agent.action}</p>
              </div>
              <div className="h-3 w-3 border-2 border-[#E5E5E5] border-t-[#737373] rounded-full animate-spin" />
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 py-2 px-3 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]"
    >
      <div className="h-3 w-3 border-2 border-[#E5E5E5] border-t-[#737373] rounded-full animate-spin" />
      <span className="text-xs text-[#737373]">Thinking...</span>
    </motion.div>
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
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
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
          </motion.div>
        ))}

        {/* Streaming state */}
        {(streamingText ||
          activeTools.length > 0 ||
          (streaming && !streamingText)) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex justify-start"
          >
            <div className="max-w-2xl w-full">
              <AgentThinking
                activeTools={activeTools}
                streamingText={streamingText}
                streaming={streaming}
                streamingBlocks={streamingBlocks}
              />
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
