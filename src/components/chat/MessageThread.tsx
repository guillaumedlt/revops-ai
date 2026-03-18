"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, LayoutDashboard, Plus, Check } from "lucide-react";
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
  isLoading?: boolean;
}

var TOOL_LABELS: Record<string, string> = {
  // HubSpot tools
  hubspot_search_deals: "Searching deals...",
  hubspot_get_pipeline: "Loading pipeline...",
  hubspot_get_contacts: "Searching contacts...",
  hubspot_get_companies: "Searching companies...",
  hubspot_get_owners: "Loading sales reps...",
  hubspot_get_deal_details: "Loading deal details...",
  hubspot_analytics: "Computing analytics...",
  // Lemlist tools
  lemlist_get_campaigns: "Loading campaigns...",
  lemlist_get_campaign_stats: "Loading campaign stats...",
  lemlist_get_leads: "Searching leads...",
  lemlist_search_lead: "Finding lead...",
  lemlist_get_team: "Loading team...",
  // New HubSpot tools
  hubspot_get_tickets: "Loading tickets...",
  hubspot_get_engagements: "Loading activities...",
  hubspot_get_line_items: "Loading products...",
  hubspot_get_forms: "Loading forms...",
  hubspot_search_all: "Searching HubSpot...",
  hubspot_build_icp: "Building ICP profile...",
  hubspot_score_company: "Scoring against ICP...",
  hubspot_deal_health: "Scoring deal health...",
  hubspot_update_deal: "Updating deal...",
  hubspot_create_task: "Creating task...",
  hubspot_create_note: "Adding note...",
  hubspot_meeting_prep: "Preparing meeting brief...",
  hubspot_win_loss_analysis: "Analyzing win/loss patterns...",
  // Internal tools
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

function SaveMessageToDashboard({ blocks, title }: { blocks: any[]; title: string }) {
  var [open, setOpen] = useState(false);
  var [dashboards, setDashboards] = useState<any[]>([]);
  var [adding, setAdding] = useState<string | null>(null);
  var [added, setAdded] = useState<Set<string>>(new Set());
  var ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(function() {
    if (!open) return;
    fetch("/api/dashboards").then(function(r) { return r.json(); }).then(function(res) {
      setDashboards(res.data?.dashboards ?? []);
    }).catch(function() {});
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return function() { document.removeEventListener("mousedown", handleClick); };
  }, [open]);

  async function addWidget(dashboardId: string) {
    setAdding(dashboardId);
    var nextY = 0;
    try {
      var dr = await fetch("/api/dashboards/" + dashboardId);
      var dd = await dr.json();
      var widgets = dd.data?.widgets || [];
      nextY = widgets.reduce(function(max: number, w: any) { return Math.max(max, (w.y || 0) + (w.h || 2)); }, 0);
    } catch {}

    await fetch("/api/dashboards/" + dashboardId + "/widgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ widget_type: "report", title: title, config: { blocks: blocks }, x: 0, y: nextY, w: 12, h: 8 }),
    });
    setAdding(null);
    setAdded(function(prev) { return new Set(prev).add(dashboardId); });
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={function() { setOpen(!open); }}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] text-[#737373] hover:text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors">
        <LayoutDashboard size={12} /> Save to Dashboard
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 w-[220px] rounded-xl border border-[#E5E5E5] bg-white shadow-lg p-2 z-50">
          <p className="px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-[#A3A3A3]">Save to Dashboard</p>
          {dashboards.length === 0 ? (
            <p className="px-2 py-2 text-xs text-[#737373]">No dashboards yet</p>
          ) : dashboards.map(function(d) {
            return (
              <button key={d.id} onClick={function() { addWidget(d.id); }} disabled={adding === d.id || added.has(d.id)}
                className="flex w-full items-center justify-between px-2 py-2 rounded-lg text-sm text-[#525252] hover:bg-[#FAFAFA] disabled:opacity-50">
                <span className="truncate">{d.name}</span>
                {added.has(d.id) ? <Check size={14} className="text-[#22C55E]" /> : adding === d.id ? <div className="h-3 w-3 border-2 border-[#E5E5E5] border-t-[#737373] rounded-full animate-spin" /> : <Plus size={14} className="text-[#A3A3A3]" />}
              </button>
            );
          })}
          <a href="/dashboards" className="flex items-center gap-1 px-2 py-2 text-xs text-[#737373] hover:text-[#0A0A0A]"><Plus size={12} /> New dashboard</a>
        </div>
      )}
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
  isLoading,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  // Show thinking state: only when parent signals loading and no text/error yet
  var isThinking = isLoading && !streamingText && !error;

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
              <div className="w-full bg-white border border-[#E5E5E5] rounded-2xl px-5 py-4 text-sm text-[#0A0A0A] group/msg">
                {msg.content_blocks && msg.content_blocks.length > 0 ? (
                  <>
                    <BlockRenderer blocks={msg.content_blocks} />
                    {msg.content_blocks.length > 2 && (
                      <div className="mt-4 pt-3 border-t border-[#F0F0F0] opacity-0 group-hover/msg:opacity-100 transition-opacity">
                        <SaveMessageToDashboard blocks={msg.content_blocks} title={msg.content.slice(0, 60)} />
                      </div>
                    )}
                  </>
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
