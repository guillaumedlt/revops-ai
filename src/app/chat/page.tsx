"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChatInputBar from "@/components/chat/ChatInputBar";

const suggestions = [
  "Analyse ma pipeline",
  "Win rate ce mois",
  "Deals en risque",
  "Rapport hebdo",
];

export default function ChatWelcomePage() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSend = async (message: string, model: string) => {
    if (sending) return;
    setSending(true);

    try {
      const convRes = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: message.slice(0, 100) }),
      });
      const convJson = await convRes.json();
      const conversationId = convJson.data?.id;
      if (!conversationId) return;

      router.push(`/chat/${conversationId}?initial=${encodeURIComponent(message)}&model=${model}`);
    } catch {
      setSending(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-[#0A0A0A] text-white rounded-xl flex items-center justify-center text-xl font-bold mb-4">
          R
        </div>
        <h1 className="text-2xl font-semibold text-[#0A0A0A]">RevOps AI</h1>
        <p className="text-sm text-[#737373] mt-1">Votre assistant CRO autonome</p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setInputValue(s)}
            disabled={sending}
            className="inline-flex px-3 py-1.5 rounded-full border border-[#E5E5E5] text-xs text-[#525252] hover:bg-[#F5F5F5] cursor-pointer transition-colors disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="w-full">
        <ChatInputBar onSend={handleSend} disabled={sending} initialValue={inputValue} />
      </div>
    </div>
  );
}
