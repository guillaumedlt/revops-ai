"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Zap, ChevronRight, X } from "lucide-react";
import ChatInputBar from "@/components/chat/ChatInputBar";

var SUGGESTION_CATEGORIES = [
  {
    label: "Pipeline",
    items: [
      "Comment va ma pipeline ?",
      "Quels deals ont besoin d'attention ?",
    ],
  },
  {
    label: "Performance",
    items: [
      "Compare mes commerciaux",
      "Quel est mon win rate ?",
    ],
  },
  {
    label: "Forecast",
    items: [
      "Forecast revenue ce trimestre",
      "Pipeline coverage ratio",
    ],
  },
  {
    label: "Actions",
    items: [
      "Audit complet de mon CRM",
      "Redige un follow-up email",
    ],
  },
];

interface AlertData {
  id: string;
  alert_type: string;
  severity: "info" | "warning" | "critical";
  title: string;
  description: string;
  ai_suggestion?: string;
  domain?: string;
}

function AlertBanner({ alerts, onAsk, onDismiss }: { alerts: AlertData[]; onAsk: (text: string) => void; onDismiss: (id: string) => void }) {
  var [expanded, setExpanded] = useState(false);
  var critical = alerts.filter(function(a) { return a.severity === "critical"; });
  var warning = alerts.filter(function(a) { return a.severity === "warning"; });
  var info = alerts.filter(function(a) { return a.severity === "info"; });

  var topAlerts = expanded ? alerts : alerts.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mb-6"
    >
      {/* Summary bar */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-t-xl bg-[#0A0A0A] text-white">
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} />
          <span className="text-[12px] font-medium">
            {alerts.length} alerte{alerts.length > 1 ? "s" : ""} detectee{alerts.length > 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            {critical.length > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-300">{critical.length} critique{critical.length > 1 ? "s" : ""}</span>}
            {warning.length > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300">{warning.length} warning{warning.length > 1 ? "s" : ""}</span>}
            {info.length > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300">{info.length} info</span>}
          </div>
        </div>
        {alerts.length > 3 && (
          <button onClick={function() { setExpanded(!expanded); }} className="text-[10px] text-white/60 hover:text-white">
            {expanded ? "Reduire" : "Voir tout"}
          </button>
        )}
      </div>

      {/* Alert cards */}
      <div className="border border-[#E5E5E5] border-t-0 rounded-b-xl bg-white divide-y divide-[#F5F5F5] overflow-hidden">
        {topAlerts.map(function(alert) {
          var severityIcon = alert.severity === "critical"
            ? <TrendingDown size={14} className="text-[#EF4444]" />
            : alert.severity === "warning"
            ? <AlertTriangle size={14} className="text-[#F59E0B]" />
            : <Zap size={14} className="text-[#6366F1]" />;

          var bgClass = alert.severity === "critical" ? "bg-red-50/30" : alert.severity === "warning" ? "bg-amber-50/30" : "bg-white";

          return (
            <div key={alert.id} className={"px-4 py-3 " + bgClass}>
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 shrink-0">{severityIcon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-[#0A0A0A] leading-snug">{alert.title}</p>
                  <p className="text-[11px] text-[#737373] mt-0.5 line-clamp-2">{alert.description}</p>
                  {alert.ai_suggestion && (
                    <button
                      onClick={function() { onAsk("A propos de l'alerte : " + alert.title + ". " + alert.ai_suggestion + " Donne-moi les details et un plan d'action."); }}
                      className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-medium text-[#6366F1] hover:text-[#4F46E5]"
                    >
                      Investiguer avec Kairo <ChevronRight size={10} />
                    </button>
                  )}
                </div>
                <button
                  onClick={function() { onDismiss(alert.id); }}
                  className="shrink-0 h-5 w-5 flex items-center justify-center rounded text-[#C0C0C0] hover:text-[#737373] hover:bg-[#F5F5F5]"
                  title="Dismiss"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function ChatWelcome() {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  useEffect(function() {
    fetch("/api/alerts").then(function(r) { return r.json(); }).then(function(json) {
      if (json.data?.alerts) setAlerts(json.data.alerts);
    }).catch(function() {});
  }, []);

  async function handleSend(message: string, model?: string, attachment?: any) {
    if (sending) return;
    setSending(true);

    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: message.slice(0, 80) }),
      });
      if (!res.ok) {
        setSending(false);
        return;
      }
      const json = await res.json();
      if (!json.data?.id) {
        setSending(false);
        return;
      }

      try {
        sessionStorage.setItem(
          "pending_message",
          JSON.stringify({ message, model: model ?? "kairo", attachment })
        );
      } catch {}

      router.push("/chat/" + json.data.id);
    } catch {
      setSending(false);
    }
  }

  function handleSuggestion(text: string) {
    handleSend(text, "kairo");
  }

  function handleDismissAlert(id: string) {
    setAlerts(function(prev) { return prev.filter(function(a) { return a.id !== id; }); });
    fetch("/api/alerts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alertId: id, action: "dismissed" }),
    }).catch(function() {});
  }

  return (
    <div className="flex flex-1 flex-col h-full">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[#E5E5E5] bg-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">K</span>
          </div>
          <span className="text-sm font-semibold text-[#0A0A0A]">Kairo</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Title */}
          <h1 className="text-center text-3xl font-semibold text-[#0A0A0A] mb-6">
            Comment puis-je t&apos;aider ?
          </h1>

          {/* Proactive alerts banner */}
          {alerts.length > 0 && (
            <div className="flex justify-center">
              <AlertBanner
                alerts={alerts}
                onAsk={function(text) { handleSuggestion(text); }}
                onDismiss={handleDismissAlert}
              />
            </div>
          )}

          {/* Input bar */}
          <div className="mb-8">
            <ChatInputBar onSend={handleSend} disabled={sending} />
          </div>

          {/* Suggestion categories - 2x2 grid, stacks on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
    </div>
  );
}
