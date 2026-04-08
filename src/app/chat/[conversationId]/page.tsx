"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import MessageThread from "@/components/chat/MessageThread";
import ChatInputBar from "@/components/chat/ChatInputBar";
import type { ContentBlock } from "@/types/chat-blocks";
import { markStreaming, unmarkStreaming } from "@/lib/streaming-tracker";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  content_blocks?: ContentBlock[] | null;
  created_at: string;
}

export default function ConversationPage() {
  const params = useParams<{ conversationId: string }>();
  const conversationId = params.conversationId || "";

  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingText, setStreamingText] = useState("");
  const [streamingBlocks, setStreamingBlocks] = useState<ContentBlock[] | null>(null);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeAgents, setActiveAgents] = useState<Array<{ id: string; name: string; emoji: string; color: string; specialty: string; status: string; text: string }>>([]);
  const [chatError, setChatError] = useState<{ message: string; title?: string; action?: string; actionUrl?: string; code?: string } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedModel, setSelectedModel] = useState("kairo");
  const initialSent = useRef(false);
  const lastMessageRef = useRef<string>("");
  const pendingText = useRef("");
  const rafId = useRef<number | null>(null);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Fetch existing messages
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/conversations/${conversationId}`);
      if (res.ok) {
        const json = await res.json();
        setMessages(json.data?.messages ?? []);
      }
      setLoaded(true);
    }
    load();
  }, [conversationId]);

  const sendMessage = useCallback(
    async (message: string, model?: string, attachment?: any) => {
      if (isStreaming) return;

      // Track selected model from picker
      if (model) setSelectedModel(model);

      // Clear any previous error
      setChatError(null);
      lastMessageRef.current = message;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsStreaming(true);
      markStreaming(conversationId);
      setStreamingText("");
      setStreamingBlocks(null);
      setActiveTools([]);

      // Use the job system for /report (resumable, queueable, retryable)
      if (message.trim().toLowerCase().startsWith("/report")) {
        try {
          const startRes = await fetch("/api/reports/start", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, conversationId }),
          });
          if (!startRes.ok) {
            const err = await startRes.json().catch(() => ({}));
            setChatError({
              message: err.error || "Failed to start report",
              title: err.errorTitle,
              action: err.action,
              actionUrl: err.actionUrl,
              code: err.errorCode,
            });
            setIsStreaming(false); unmarkStreaming(conversationId);
            return;
          }
          const { data } = await startRes.json();
          var jobId = data.jobId;
          var jobAgentIds: string[] = data.agentIds || [];

          // Initialize active agents from the job (will be filled by polling)
          setActiveAgents(jobAgentIds.map(function(id) {
            return { id: id, name: id, emoji: "🤖", color: "#999", specialty: "", status: "pending", text: "" };
          }));

          // Poll the job until done
          var pollAttempts = 0;
          var maxPolls = 600; // 600 * 2s = 20 min max
          var pollInterval = setInterval(async function() {
            pollAttempts++;
            if (pollAttempts > maxPolls) {
              clearInterval(pollInterval);
              setChatError({ message: "Report timed out after 20 minutes. Please retry.", title: "Timeout", code: "TIMEOUT" });
              setIsStreaming(false); unmarkStreaming(conversationId);
              return;
            }
            try {
              const pollRes = await fetch("/api/reports/" + jobId);
              const pollJson = await pollRes.json();
              if (!pollJson.data) return;
              var jobData = pollJson.data;

              // Update active agents UI
              setActiveAgents(jobData.agents.map(function(a: any) {
                return { id: a.id, name: a.name, emoji: a.emoji, color: a.color, specialty: "", status: a.status === "running" ? "working" : a.status, text: a.text || "" };
              }));

              // Job done?
              if (jobData.status === "completed" || jobData.status === "partial" || jobData.status === "failed") {
                clearInterval(pollInterval);

                if (jobData.status === "failed" && !jobData.finalText) {
                  setChatError({
                    message: jobData.error || "All agents failed. Click retry to try the failed ones again.",
                    title: "Report failed",
                    code: jobData.errorCode || "UNKNOWN",
                  });
                  setIsStreaming(false); unmarkStreaming(conversationId);
                  setActiveAgents([]);
                  return;
                }

                // Add the final message
                const assistantMsg: Message = {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content: jobData.finalText || "(Report generated)",
                  content_blocks: jobData.finalBlocks,
                  created_at: new Date().toISOString(),
                };
                setMessages((prev) => [...prev, assistantMsg]);
                setActiveAgents([]);
                setIsStreaming(false); unmarkStreaming(conversationId);
              }
            } catch (e) {
              console.error("[poll]", e);
            }
          }, 2000);
        } catch (e: any) {
          setChatError({ message: e?.message || "Failed to start report" });
          setIsStreaming(false); unmarkStreaming(conversationId);
        }
        return;
      }

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            conversationId,
            model: model || selectedModel,
            ...(attachment ? { attachment } : {}),
          }),
        });

        if (!res.ok || !res.body) {
          let errMsg = "Server error (" + res.status + ")";
          let errTitle: string | undefined;
          let errAction: string | undefined;
          let errActionUrl: string | undefined;
          let errCode: string | undefined;
          try {
            const errJson = await res.json();
            errMsg = errJson.error || errMsg;
            errTitle = errJson.errorTitle;
            errAction = errJson.action;
            errActionUrl = errJson.actionUrl;
            errCode = errJson.errorCode;
          } catch {}
          setChatError({ message: errMsg, title: errTitle, action: errAction, actionUrl: errActionUrl, code: errCode });
          setIsStreaming(false); unmarkStreaming(conversationId);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let accText = "";
        let finalBlocks: ContentBlock[] | null = null;
        let hadError = false;

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
                accText += event.token;
                pendingText.current = accText;
                if (!rafId.current) {
                  rafId.current = requestAnimationFrame(function() {
                    setStreamingText(pendingText.current);
                    rafId.current = null;
                  });
                }
              } else if (event.type === "tool_start") {
                setActiveTools((prev) => [...prev, event.name]);
              } else if (event.type === "tool_result") {
                setActiveTools((prev) => prev.filter((t) => t !== event.name));
              } else if (event.type === "content_blocks") {
                finalBlocks = event.blocks;
                setStreamingBlocks(event.blocks);
              } else if (event.type === "agents_start") {
                setActiveAgents(event.agents.map(function(a: any) { return { ...a, status: "working", text: "" }; }));
              } else if (event.type === "agent_token") {
                setActiveAgents(function(prev) { return prev.map(function(a) { return a.id === event.agentId ? { ...a, text: a.text + event.token } : a; }); });
              } else if (event.type === "agent_tool_start") {
                setActiveAgents(function(prev) { return prev.map(function(a) { return a.id === event.agentId ? { ...a, status: "tool:" + event.name } : a; }); });
              } else if (event.type === "agent_tool_result") {
                setActiveAgents(function(prev) { return prev.map(function(a) { return a.id === event.agentId ? { ...a, status: "working" } : a; }); });
              } else if (event.type === "agent_done") {
                setActiveAgents(function(prev) { return prev.map(function(a) { return a.id === event.agentId ? { ...a, status: "done" } : a; }); });
              } else if (event.type === "premium_agent") {
                // Show premium agent working
                setActiveAgents([{ id: event.agent.id, name: event.agent.name, emoji: event.agent.emoji, color: event.agent.color, specialty: event.agent.specialty + " (" + event.agent.creditCost + " credits)", status: "working", text: "" }]);
              } else if (event.type === "premium_file") {
                // Store file for download button in message
                if (typeof window !== "undefined") {
                  (window as any).__kairo_last_file = { fileName: event.fileName, content: event.content, format: event.format };
                }
              } else if (event.type === "error") {
                hadError = true;
                setChatError({
                  message: event.error || "Something went wrong. Please try again.",
                  title: event.errorTitle,
                  action: event.action,
                  actionUrl: event.actionUrl,
                  code: event.errorCode,
                });
              } else if (event.type === "text") {
                // Final text from multi-agent or premium agent
                accText = event.text || accText;
              } else if (event.type === "done") {
                // Flush any pending RAF
                if (rafId.current) {
                  cancelAnimationFrame(rafId.current);
                  rafId.current = null;
                }
                // Use accText OR fallback to extracting from blocks
                var msgContent = accText;
                if (!msgContent && finalBlocks && finalBlocks.length > 0) {
                  msgContent = finalBlocks.map(function(b: any) { return b.type === "text" ? b.text : ""; }).filter(Boolean).join("\n\n");
                }
                if (!msgContent && finalBlocks && finalBlocks.length > 0) {
                  msgContent = "(Report generated — see content below)";
                }
                const assistantMsg: Message = {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content: msgContent,
                  content_blocks: finalBlocks,
                  created_at: new Date().toISOString(),
                };
                setMessages((prev) => [...prev, assistantMsg]);
                setStreamingText("");
                setStreamingBlocks(null);
                setActiveTools([]);
                setActiveAgents([]);
              }
            } catch {
              /* parse error */
            }
          }
        }

        // If stream ended without text AND without blocks AND without error, show error
        if (!accText && !finalBlocks && !hadError) {
          setChatError({
            message: "The AI didn't return a response. This usually happens when the request is too complex or HubSpot is slow. Try again or break it into smaller questions.",
            title: "No response received",
            code: "STREAM_INTERRUPTED",
          });
        }
      } catch {
        setChatError({ message: "Network error. Please check your connection and try again." });
      } finally {
        setIsStreaming(false); unmarkStreaming(conversationId);
      }
    },
    [conversationId, isStreaming, selectedModel]
  );

  const handleRetry = useCallback(() => {
    if (lastMessageRef.current && !isStreaming) {
      // Remove the last user message (will be re-added by sendMessage)
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "user") {
          return prev.slice(0, -1);
        }
        return prev;
      });
      setChatError(null);
      sendMessage(lastMessageRef.current, selectedModel);
    }
  }, [isStreaming, sendMessage, selectedModel]);



  // Handle pending message from sessionStorage (welcome page)
  useEffect(() => {
    if (loaded && !initialSent.current && messages.length === 0) {
      try {
        const pending = sessionStorage.getItem("pending_message");
        if (pending) {
          sessionStorage.removeItem("pending_message");
          initialSent.current = true;
          const parsed = JSON.parse(pending);
          sendMessage(parsed.message, parsed.model || "kairo", parsed.attachment);
        }
      } catch {
        /* sessionStorage not available */
      }
    }
  }, [loaded, messages.length, sendMessage]);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Mobile header */}
      <div className="md:hidden flex items-center gap-3 px-4 h-[49px] border-b border-[#EAEAEA] bg-white shrink-0">
        <a href="/chat" className="h-7 w-7 flex items-center justify-center rounded hover:bg-[#F5F5F5]">
          <ChevronLeft size={16} className="text-[#999]" />
        </a>
        <span className="text-[13px] font-medium text-[#111] truncate">Kairo</span>
      </div>
      <MessageThread
        messages={messages}
        streamingText={streamingText}
        streamingBlocks={streamingBlocks}
        activeTools={activeTools}
        error={chatError}
        onRetry={handleRetry}
        isLoading={isStreaming}
        onSendSuggestion={function(text) { sendMessage(text, selectedModel); }}
        conversationId={conversationId}
        activeAgents={activeAgents}
      />
      <div className="shrink-0 pb-2">
        <ChatInputBar
          onSend={sendMessage}
          disabled={isStreaming}
        />
      </div>
    </div>
  );
}
