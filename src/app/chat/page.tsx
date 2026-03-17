"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChatInput from "@/components/chat/ChatInput";

const suggestions = [
  "Analyse ma pipeline",
  "Quel est mon win rate ?",
  "Quels deals sont en risque ?",
  "Compare mes commerciaux",
];

export default function ChatWelcomePage() {
  const router = useRouter();
  const [sending, setSending] = useState(false);

  const handleSend = async (message: string) => {
    if (sending) return;
    setSending(true);

    try {
      // Create conversation
      const convRes = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: message.slice(0, 100) }),
      });
      const convJson = await convRes.json();
      const conversationId = convJson.data?.id;
      if (!conversationId) return;

      // Navigate to conversation — the page will send the first message
      router.push(`/chat/${conversationId}?initial=${encodeURIComponent(message)}`);
    } catch {
      setSending(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center mb-10">
        <div className="w-12 h-12 bg-[#0A0A0A] text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4">
          R
        </div>
        <h1 className="text-2xl font-semibold text-[#0A0A0A]">RevOps AI</h1>
        <p className="text-[#737373] mt-1">Que puis-je analyser pour toi ?</p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-lg w-full mb-8">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => handleSend(s)}
            disabled={sending}
            className="border border-[#E5E5E5] rounded-xl px-4 py-3 text-sm text-left text-[#0A0A0A] hover:bg-[#F5F5F5] transition-colors disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="w-full max-w-3xl">
        <ChatInput onSend={handleSend} disabled={sending} placeholder="Pose une question sur tes donnees CRM..." />
      </div>
    </div>
  );
}
