"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolCalls?: string[];
}

export default function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeTools]);

  async function handleSend() {
    if (!input.trim() || streaming) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStreaming(true);
    setActiveTools([]);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, conversationId }),
      });

      if (!response.ok || !response.body) {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: "Erreur de connexion." } : m))
        );
        setStreaming(false);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));

            if (event.type === "token") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: m.content + event.token } : m
                )
              );
            }

            if (event.type === "tool_start") {
              setActiveTools((prev) => [...prev, event.name]);
            }

            if (event.type === "tool_result") {
              setActiveTools((prev) => prev.filter((t) => t !== event.name));
            }

            if (event.type === "metadata") {
              setConversationId(event.conversationId);
            }

            if (event.type === "error") {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: m.content || event.error } : m
                )
              );
            }
          } catch { /* parse error */ }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: "Erreur reseau." } : m))
      );
    }

    setStreaming(false);
    setActiveTools([]);
  }

  return (
    <>
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] bg-[#0A0A0A] text-white transition-opacity hover:opacity-90"
        >
          <MessageSquare size={18} />
        </button>
      )}

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[380px] flex-col border-l border-[#E5E5E5] bg-white"
          >
            {/* Header */}
            <div className="flex h-12 items-center justify-between border-b border-[#E5E5E5] px-4">
              <span className="text-sm font-medium text-[#0A0A0A]">RevOps AI</span>
              <button onClick={() => setOpen(false)} className="text-[#737373] hover:text-[#0A0A0A]">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <p className="text-sm text-[#A3A3A3] text-center mt-8">
                  Pose une question sur tes donnees CRM.
                </p>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-md px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-[#0A0A0A] text-white"
                        : "border border-[#E5E5E5] bg-[#FAFAFA] text-[#0A0A0A]"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {/* Active tool calls */}
              {activeTools.length > 0 && (
                <div className="flex items-center gap-2 text-xs text-[#737373]">
                  <Loader2 size={12} className="animate-spin" />
                  {activeTools.map((t) => (
                    <span key={t} className="rounded bg-[#F5F5F5] px-2 py-0.5">{t}</span>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-[#E5E5E5] p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Pose une question..."
                  disabled={streaming}
                  className="flex-1 rounded border border-[#E5E5E5] px-3 py-2 text-sm placeholder:text-[#A3A3A3] focus:border-[#0A0A0A] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={streaming || !input.trim()}
                  className="flex h-8 w-8 items-center justify-center rounded bg-[#0A0A0A] text-white transition-opacity hover:opacity-90 disabled:opacity-30"
                >
                  {streaming ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
