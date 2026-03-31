"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ExternalLink, Sparkles, LayoutDashboard, Bell, CheckSquare, MessageSquare, Zap } from "lucide-react";

var STEPS = ["Connect", "Discover", "Start"];

export default function OnboardingPage() {
  var [step, setStep] = useState(0);
  var [hsConnected, setHsConnected] = useState(false);
  var [notionConnected, setNotionConnected] = useState(false);
  var [checking, setChecking] = useState(true);
  var router = useRouter();

  useEffect(function() {
    Promise.all([
      fetch("/api/connectors/hubspot/status").then(function(r) { return r.json(); }).then(function(j) { setHsConnected(j.data?.connected ?? false); }).catch(function() {}),
      fetch("/api/connectors/notion/status").then(function(r) { return r.json(); }).then(function(j) { setNotionConnected(j.data?.connected ?? false); }).catch(function() {}),
    ]).finally(function() { setChecking(false); });
  }, []);

  // Re-check after returning from OAuth
  useEffect(function() {
    function handleFocus() {
      fetch("/api/connectors/hubspot/status").then(function(r) { return r.json(); }).then(function(j) { setHsConnected(j.data?.connected ?? false); }).catch(function() {});
    }
    window.addEventListener("focus", handleFocus);
    return function() { window.removeEventListener("focus", handleFocus); };
  }, []);

  async function handleConnectHubspot() {
    window.location.href = "/api/auth/hubspot";
  }

  function handleFinish(prompt?: string) {
    if (prompt) {
      try { sessionStorage.setItem("pending_message", JSON.stringify({ message: prompt, model: "kairo" })); } catch {}
      fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: prompt.slice(0, 80) }),
      }).then(function(r) { return r.json(); }).then(function(j) {
        if (j.data?.id) router.push("/chat/" + j.data.id);
        else router.push("/chat");
      }).catch(function() { router.push("/chat"); });
    } else {
      router.push("/chat");
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#F0F0F0] z-10">
        <div className="h-full bg-[#111] transition-all duration-500 rounded-r-full" style={{ width: ((step + 1) / STEPS.length * 100) + "%" }} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-[#111] flex items-center justify-center"><span className="text-white text-[9px] font-bold">K</span></div>
          <span className="text-[13px] font-semibold text-[#111]">Kairo</span>
        </div>
        <div className="flex items-center gap-1">
          {STEPS.map(function(label, i) {
            return (
              <div key={i} className="flex items-center gap-1">
                <div className={"h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold " + (i < step ? "bg-[#111] text-white" : i === step ? "bg-[#111] text-white" : "bg-[#F0F0F0] text-[#BBB]")}>
                  {i < step ? <Check size={11} /> : i + 1}
                </div>
                <span className={"text-[11px] hidden sm:block " + (i <= step ? "text-[#111] font-medium" : "text-[#CCC]")}>{label}</span>
                {i < STEPS.length - 1 && <div className={"h-px w-6 " + (i < step ? "bg-[#111]" : "bg-[#EAEAEA]")} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-lg">

          {/* Step 0: Connect tools */}
          {step === 0 && (
            <div>
              <h1 className="text-xl font-bold text-[#111] mb-1 tracking-tight">Connect your tools</h1>
              <p className="text-[13px] text-[#999] mb-6">Kairo analyzes your data in real-time. Connect at least HubSpot to get started.</p>

              <div className="space-y-3 mb-6">
                {/* HubSpot */}
                <div className={"rounded-lg border p-4 flex items-center justify-between " + (hsConnected ? "border-[#BBF7D0] bg-[#F0FDF4]" : "border-[#EAEAEA]")}>
                  <div className="flex items-center gap-3">
                    <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=64" alt="" className="h-6 w-6 rounded" />
                    <div>
                      <p className="text-[13px] font-medium text-[#111]">HubSpot</p>
                      <p className="text-[11px] text-[#999]">{hsConnected ? "Connected" : "CRM, deals, contacts, pipeline"}</p>
                    </div>
                  </div>
                  {hsConnected ? (
                    <div className="flex items-center gap-1.5">
                      <Check size={14} className="text-[#22C55E]" />
                      <span className="text-[11px] font-medium text-[#22C55E]">Connected</span>
                    </div>
                  ) : (
                    <button onClick={handleConnectHubspot} className="h-8 px-3 rounded-md bg-[#FF7A59] text-white text-[12px] font-medium hover:bg-[#E5684A] transition-colors flex items-center gap-1.5">
                      <ExternalLink size={12} /> Connect
                    </button>
                  )}
                </div>

                {/* Notion */}
                <div className={"rounded-lg border p-4 flex items-center justify-between " + (notionConnected ? "border-[#BBF7D0] bg-[#F0FDF4]" : "border-[#EAEAEA]")}>
                  <div className="flex items-center gap-3">
                    <img src="https://www.google.com/s2/favicons?domain=notion.so&sz=64" alt="" className="h-6 w-6 rounded" />
                    <div>
                      <p className="text-[13px] font-medium text-[#111]">Notion</p>
                      <p className="text-[11px] text-[#999]">{notionConnected ? "Connected" : "Docs, databases, knowledge base"}</p>
                    </div>
                  </div>
                  {notionConnected ? (
                    <div className="flex items-center gap-1.5">
                      <Check size={14} className="text-[#22C55E]" />
                      <span className="text-[11px] font-medium text-[#22C55E]">Connected</span>
                    </div>
                  ) : (
                    <button onClick={function() { router.push("/settings?tab=connectors"); }} className="h-8 px-3 rounded-md border border-[#EAEAEA] text-[12px] text-[#555] hover:bg-[#F5F5F5] transition-colors">
                      Setup
                    </button>
                  )}
                </div>

                {/* Lemlist */}
                <div className="rounded-lg border border-[#EAEAEA] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="https://www.google.com/s2/favicons?domain=lemlist.com&sz=64" alt="" className="h-6 w-6 rounded" />
                    <div>
                      <p className="text-[13px] font-medium text-[#111]">Lemlist</p>
                      <p className="text-[11px] text-[#999]">Cold outreach, sequences</p>
                    </div>
                  </div>
                  <button onClick={function() { router.push("/settings?tab=connectors"); }} className="h-8 px-3 rounded-md border border-[#EAEAEA] text-[12px] text-[#555] hover:bg-[#F5F5F5] transition-colors">
                    Setup
                  </button>
                </div>
              </div>

              <button onClick={function() { setStep(1); }}
                className={"w-full h-10 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center gap-2 " + (hsConnected ? "bg-[#111] text-white hover:bg-[#333]" : "border border-[#EAEAEA] text-[#999] hover:bg-[#F5F5F5]")}>
                {hsConnected ? <>Continue <ArrowRight size={14} /></> : "Skip for now"}
              </button>
            </div>
          )}

          {/* Step 1: Discover what Kairo can do */}
          {step === 1 && (
            <div>
              <h1 className="text-xl font-bold text-[#111] mb-1 tracking-tight">What Kairo can do</h1>
              <p className="text-[13px] text-[#999] mb-6">Your AI RevOps assistant handles everything ops teams do manually.</p>

              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {[
                  { icon: MessageSquare, title: "AI Chat", desc: "Ask anything about your pipeline, deals, or reps" },
                  { icon: Bell, title: "Monitoring", desc: "Daily alerts: stalled deals, low coverage, data issues" },
                  { icon: LayoutDashboard, title: "Dashboards", desc: "Pin charts, KPIs, and reports from chat" },
                  { icon: CheckSquare, title: "Actions", desc: "Kanban board — AI creates tasks from analysis" },
                  { icon: Zap, title: "Multi-Agent", desc: "5 agents work in parallel on complex reports" },
                  { icon: Sparkles, title: "Smart Credits", desc: "Auto-picks the cheapest model for each query" },
                ].map(function(item) {
                  var Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-lg border border-[#EAEAEA] p-3.5">
                      <Icon size={16} className="text-[#111] mb-2" />
                      <p className="text-[12px] font-semibold text-[#111]">{item.title}</p>
                      <p className="text-[11px] text-[#999] mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <button onClick={function() { setStep(0); }} className="h-10 px-4 rounded-lg border border-[#EAEAEA] text-[13px] text-[#999] hover:bg-[#F5F5F5] transition-colors">Back</button>
                <button onClick={function() { setStep(2); }} className="flex-1 h-10 rounded-lg bg-[#111] text-white text-[13px] font-medium hover:bg-[#333] transition-colors flex items-center justify-center gap-2">
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Start using */}
          {step === 2 && (
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-[#F0FDF4] flex items-center justify-center mx-auto mb-5">
                <Sparkles size={24} className="text-[#22C55E]" />
              </div>
              <h1 className="text-xl font-bold text-[#111] mb-1 tracking-tight">{"You're all set!"}</h1>
              <p className="text-[13px] text-[#999] mb-6">Try one of these to see Kairo in action.</p>

              <div className="space-y-2 mb-6 text-left">
                {[
                  { prompt: "/pipeline", label: "Run a pipeline review", desc: "KPIs, funnel, at-risk deals", icon: "📊" },
                  { prompt: "/audit", label: "Audit your CRM", desc: "Data quality score, missing fields, cleanup plan", icon: "🔍" },
                  { prompt: "/coaching", label: "Coach your reps", desc: "Per-rep performance, strengths, actions", icon: "🏆" },
                  { prompt: "/report Full RevOps report", label: "Generate a full report", desc: "5 agents analyze everything in parallel", icon: "📈" },
                ].map(function(item) {
                  return (
                    <button key={item.prompt} onClick={function() { handleFinish(item.prompt); }}
                      className="w-full rounded-lg border border-[#EAEAEA] p-3.5 flex items-center gap-3 hover:bg-[#FAFAFA] hover:border-[#D4D4D4] transition-all text-left">
                      <span className="text-lg">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-[#111]">{item.label}</p>
                        <p className="text-[11px] text-[#999]">{item.desc}</p>
                      </div>
                      <ArrowRight size={14} className="text-[#CCC] shrink-0" />
                    </button>
                  );
                })}
              </div>

              <button onClick={function() { handleFinish(); }}
                className="w-full h-10 rounded-lg bg-[#111] text-white text-[13px] font-medium hover:bg-[#333] transition-colors flex items-center justify-center gap-2">
                Go to Kairo <ArrowRight size={14} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
