"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChatInputBar from "@/components/chat/ChatInputBar";

export default function ChatWelcomePage() {
  const router = useRouter();
  const [sending, setSending] = useState(false);

  const handleSend = async (message: string, model: string, attachment?: any) => {
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
      if (!conversationId) {
        setSending(false);
        return;
      }

      // Store attachment in sessionStorage if present
      if (attachment) {
        try {
          sessionStorage.setItem(`attachment_${conversationId}`, JSON.stringify(attachment));
        } catch { /* storage full, skip */ }
      }

      router.push(
        `/chat/${conversationId}?initial=${encodeURIComponent(message)}&model=${model}`
      );
    } catch {
      setSending(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Center area */}
      <div className="flex-1 flex items-center justify-center">
        <span className="text-lg text-[#D4D4D4] select-none">RevOps AI</span>
      </div>

      {/* Input bar at bottom */}
      <div className="shrink-0 pb-2">
        <ChatInputBar onSend={handleSend} disabled={sending} />
      </div>
    </div>
  );
}
