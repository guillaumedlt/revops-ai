"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Zap, ChevronRight, X, ArrowRight } from "lucide-react";
import ChatInputBar from "@/components/chat/ChatInputBar";

var SUGGESTIONS = [
  { label: "Pipeline", items: ["Comment va ma pipeline ?", "Quels deals ont besoin d'attention ?"] },
  { label: "Performance", items: ["Compare mes commerciaux", "Quel est mon win rate ?"] },
  { label: "Forecast", items: ["Forecast revenue ce trimestre", "Pipeline coverage ratio"] },
  { label: "Actions", items: ["Audit complet de mon CRM", "Redige un follow-up email"] },
];

interface AlertData {
  id: string;
  alert_type: string;
  severity: "info" | "warning" | "critical";
  title: string;
  description: string;
  ai_suggestion?: string;
}

export default function ChatWelcome() {
  var router = useRouter();
  var [sending, setSending] = useState(false);
  var [alerts, setAlerts] = useState<AlertData[]>([]);
  var [alertsExpanded, setAlertsExpanded] = useState(false);

  useEffect(function() {
    fetch("/api/alerts").then(function(r) { return r.json(); }).then(function(json) {
      if (json.data?.alerts) setAlerts(json.data.alerts);
    }).catch(function() {});
  }, []);

  async function handleSend(message: string, model?: string, attachment?: any) {
    if (sending) return;
    setSending(true);
    try {
      var res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: message.slice(0, 80) }),
      });
      if (!res.ok) { setSending(false); return; }
      var json = await res.json();
      if (!json.data?.id) { setSending(false); return; }
      try { sessionStorage.setItem("pending_message", JSON.stringify({ message, model: model ?? "kairo", attachment })); } catch {}
      router.push("/chat/" + json.data.id);
    } catch { setSending(false); }
  }

  function handleSuggestion(text: string) { handleSend(text, "kairo"); }

  function handleDismissAlert(id: string) {
    setAlerts(function(prev) { return prev.filter(function(a) { return a.id !== id; }); });
    fetch("/api/alerts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ alertId: id, action: "dismissed" }) }).catch(function() {});
  }

  var criticalAlerts = alerts.filter(function(a) { return a.severity === "critical"; });
  var topAlerts = alertsExpanded ? alerts.slice(0, 6) : alerts.slice(0, 3);

  return (
    <div className="flex flex-1 flex-col h-full">
      {/* Mobile header */}
      <div className="md:hidden flex items-center px-4 py-3 border-b border-[#EBEBEB] bg-white shrink-0">
        <div className="h-7 w-7 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">K</span>
        </div>
        <span className="text-[13px] font-semibold text-[#0A0A0A] ml-2">Kairo</span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-4 overflow-y-auto py-8">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {/* Greeting */}
          <div className="text-center mb-8">
            <div className="h-11 w-11 rounded-xl bg-[#0A0A0A] flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-sm font-bold">K</span>
            </div>
            <h1 className="text-[26px] font-bold text-[#0A0A0A] tracking-tight">
              {"Comment puis-je t'aider ?"}
            </h1>
            <p className="text-sm text-[#A3A3A3] mt-1.5">Pose une question sur ta pipeline, tes deals, ou tes performances.</p>
          </div>

          {/* Alerts summary */}
          {alerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-6"
            >
              <div className="rounded-xl border border-[#EBEBEB] bg-white overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#FAFAFA] border-b border-[#F0F0F0]">
                  <div className="flex items-center gap-2">
                    <div className={"h-2 w-2 rounded-full " + (criticalAlerts.length > 0 ? "bg-[#EF4444] animate-pulse" : "bg-[#F59E0B]")} />
                    <span className="text-[12px] font-semibold text-[#0A0A0A]">
                      {alerts.length} alerte{alerts.length > 1 ? "s" : ""} detectee{alerts.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {alerts.length > 3 && (
                      <button onClick={function() { setAlertsExpanded(!alertsExpanded); }} className="text-[11px] text-[#6366F1] hover:text-[#4F46E5] font-medium">
                        {alertsExpanded ? "Reduire" : "Voir tout"}
                      </button>
                    )}
                    <button
                      onClick={function() { router.push("/alerts"); }}
                      className="text-[11px] text-[#737373] hover:text-[#0A0A0A] flex items-center gap-0.5"
                    >
                      Monitoring <ChevronRight size={11} />
                    </button>
                  </div>
                </div>

                {/* Alert items */}
                <div className="divide-y divide-[#F5F5F5]">
                  {topAlerts.map(function(alert) {
                    var icon = alert.severity === "critical"
                      ? <TrendingDown size={13} className="text-[#EF4444]" />
                      : alert.severity === "warning"
                      ? <AlertTriangle size={13} className="text-[#F59E0B]" />
                      : <Zap size={13} className="text-[#6366F1]" />;

                    return (
                      <div key={alert.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FAFAFA] transition-colors">
                        <div className="shrink-0">{icon}</div>
                        <p className="flex-1 text-[12px] text-[#525252] truncate">{alert.title}</p>
                        <button
                          onClick={function() { handleSuggestion("A propos de l'alerte : " + alert.title + ". Donne-moi les details et un plan d'action."); }}
                          className="text-[10px] font-medium text-[#6366F1] hover:text-[#4F46E5] shrink-0 flex items-center gap-0.5"
                        >
                          Investiguer <ArrowRight size={9} />
                        </button>
                        <button
                          onClick={function() { handleDismissAlert(alert.id); }}
                          className="shrink-0 text-[#D4D4D4] hover:text-[#737373]"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Input bar */}
          <div className="mb-8">
            <ChatInputBar onSend={handleSend} disabled={sending} />
          </div>

          {/* Suggestions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SUGGESTIONS.map(function(cat) {
              return (
                <div key={cat.label} className="rounded-xl border border-[#EBEBEB] bg-white overflow-hidden hover:border-[#D4D4D4] transition-colors">
                  <div className="px-4 pt-3 pb-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#B0B0B0] font-semibold">{cat.label}</span>
                  </div>
                  <div>
                    {cat.items.map(function(item, idx) {
                      return (
                        <button
                          key={item}
                          onClick={function() { handleSuggestion(item); }}
                          disabled={sending}
                          className={"w-full text-left px-4 py-2.5 text-[13px] text-[#525252] hover:bg-[#FAFAFA] hover:text-[#0A0A0A] transition-colors disabled:opacity-40 " + (idx < cat.items.length - 1 ? "border-b border-[#F5F5F5]" : "")}
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
