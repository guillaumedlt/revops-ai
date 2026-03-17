"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ChatInputBar from "@/components/chat/ChatInputBar";

const SUGGESTIONS = [
  "Analyze my pipeline health and identify risks",
  "What's my win rate this quarter?",
  "Which deals are stalled and need attention?",
  "Compare my sales reps performance",
  "Run a CRM data quality audit",
  "Generate a weekly sales summary",
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
          JSON.stringify({ message, model: model ?? "revops-ai", attachment })
        );
      }

      router.push(`/chat/${data.id}`);
    } catch {
      setSending(false);
    }
  }

  function handleSuggestion(text: string) {
    handleSend(text, "revops-ai");
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
          What can I help you with?
        </h1>

        {/* Input bar - centered */}
        <div className="mb-6">
          <ChatInputBar onSend={handleSend} disabled={sending} />
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              disabled={sending}
              className="rounded-full border border-[#E5E5E5] bg-white px-4 py-2 text-sm text-[#525252] transition-all hover:border-[#D4D4D4] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
