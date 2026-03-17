"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
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
  error?: { message: string } | null;
  onRetry?: () => void;
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

var THINKING_STEPS = [
  { label: "Analyzing your request...", delay: 0 },
  { label: "Querying connected tools...", delay: 2000 },
  { label: "Building response...", delay: 5000 },
];

function PulsingDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3A3A3] opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#737373]" />
    </span>
  );
}

function ThinkingIndicator({ activeTools }: { activeTools: string[] }) {
  var [visibleSteps, setVisibleSteps] = useState(1);

  useEffect(function () {
    var timers: ReturnType<typeof setTimeout>[] = [];
    for (var i = 1; i < THINKING_STEPS.length; i++) {
      (function (step) {
        timers.push(
          setTimeout(function () {
            setVisibleSteps(step + 1);
          }, THINKING_STEPS[step].delay)
        );
      })(i);
    }
    return function () {
      timers.forEach(clearTimeout);
    };
  }, []);

  // If tools are active, show tool-specific steps
  if (activeTools.length > 0) {
    return (
      <div className="space-y-2 py-1">
        <AnimatePresence>
          {activeTools.map(function (tool) {
            return (
              <motion.div
                key={tool}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2.5 py-0.5"
              >
                <PulsingDot />
                <span className="text-sm text-[#737373]">
                  {TOOL_LABELS[tool] || tool}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    );
  }

  // Show progressive thinking steps
  return (
    <div className="space-y-2 py-1">
      <AnimatePresence>
        {THINKING_STEPS.slice(0, visibleSteps).map(function (step, i) {
          var isLatest = i === visibleSteps - 1;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: isLatest ? 1 : 0.5, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2.5 py-0.5"
            >
              {isLatest ? (
                <PulsingDot />
              ) : (
                <span className="flex h-2 w-2">
                  <span className="inline-flex rounded-full h-2 w-2 bg-[#D4D4D4]" />
                </span>
              )}
              <span
                className={
                  "text-sm " + (isLatest ? "text-[#737373]" : "text-[#C0C0C0]")
                }
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function ErrorCard({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-red-100 bg-red-50/60 px-4 py-3 text-sm"
    >
      <p className="text-red-700 mb-2">
        Something went wrong. Please try again.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-800 transition-colors bg-white border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50"
        >
          <RotateCcw size={12} />
          Retry
        </button>
      )}
    </motion.div>
  );
}

export default function MessageThread({
  messages,
  streamingText,
  streamingBlocks,
  activeTools,
  error,
  onRetry,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  // Show thinking state: when streaming has started but no text yet
  var isThinking = activeTools.length > 0 || (
    !streamingText && messages.length > 0 && messages[messages.length - 1]?.role === "user" && !error
  );

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

        {/* Streaming / thinking state */}
        {streamingText ? (
          <div className="w-full bg-white border border-[#E5E5E5] rounded-2xl px-5 py-4 text-sm text-[#0A0A0A]">
            {activeTools.length > 0 && (
              <div className="mb-3">
                <ThinkingIndicator activeTools={activeTools} />
              </div>
            )}
            {streamingBlocks && streamingBlocks.length > 0 ? (
              <BlockRenderer blocks={streamingBlocks} />
            ) : (
              <TextBlock text={streamingText} />
            )}
          </div>
        ) : isThinking && !error ? (
          <div className="w-full bg-white border border-[#E5E5E5] rounded-2xl px-5 py-4 text-sm text-[#0A0A0A]">
            <ThinkingIndicator activeTools={activeTools} />
          </div>
        ) : null}

        {/* Error state with retry */}
        {error && (
          <ErrorCard message={error.message} onRetry={onRetry} />
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
