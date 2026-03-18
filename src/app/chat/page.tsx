"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ChatInputBar from "@/components/chat/ChatInputBar";

var SUGGESTION_CATEGORIES = [
  {
    label: "Pipeline",
    items: [
      "How's my pipeline looking?",
      "Which deals need attention?",
    ],
  },
  {
    label: "Performance",
    items: [
      "Compare my sales reps",
      "What's my win rate?",
    ],
  },
  {
    label: "Forecast",
    items: [
      "Quarterly revenue forecast",
      "Pipeline coverage ratio",
    ],
  },
  {
    label: "Actions",
    items: [
      "Run a CRM data audit",
      "Draft a follow-up email",
    ],
  },
];

export default function ChatWelcome() {
  const router = useRouter();
  const [sending, setSending] = useState(false);

  async function handleSend(message: string, model?: string, attachment?: any) {
    if (sending) return;
    setSending(true);

    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: message.slice(0, 80) }),
      });
      const { data } = await res.json();
      if (!data?.id) {
        setSending(false);
        return;
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "pending_message",
          JSON.stringify({ message, model: model ?? "kairo", attachment })
        );
      }

      router.push(`/chat/${data.id}`);
    } catch {
      setSending(false);
    }
  }

  function handleSuggestion(text: string) {
    handleSend(text, "kairo");
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Title */}
        <h1 className="text-center text-3xl font-semibold text-[#0A0A0A] mb-8">
          How can I help you today?
        </h1>

        {/* Input bar */}
        <div className="mb-8">
          <ChatInputBar onSend={handleSend} disabled={sending} />
        </div>

        {/* Suggestion categories - 2x2 grid */}
        <div className="grid grid-cols-2 gap-3">
          {SUGGESTION_CATEGORIES.map(function(category) {
            return (
              <div
                key={category.label}
                className="rounded-xl border border-[#E5E5E5] bg-white overflow-hidden"
              >
                <div className="px-4 pt-3 pb-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#A3A3A3] font-medium">
                    {category.label}
                  </span>
                </div>
                <div>
                  {category.items.map(function(item, idx) {
                    return (
                      <button
                        key={item}
                        onClick={function() { handleSuggestion(item); }}
                        disabled={sending}
                        className={"w-full text-left px-4 py-2.5 text-sm text-[#525252] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] transition-colors disabled:opacity-50" + (idx < category.items.length - 1 ? " border-b border-[#F5F5F5]" : "")}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
