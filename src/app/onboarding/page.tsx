"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ExternalLink } from "lucide-react";

export default function OnboardingPage() {
  var [step, setStep] = useState(0);
  var [name, setName] = useState("");
  var [saving, setSaving] = useState(false);
  var [hsConnected, setHsConnected] = useState(false);
  var router = useRouter();

  useEffect(function() {
    // Check HubSpot status
    fetch("/api/connectors/hubspot/status").then(r => r.json()).then(j => {
      setHsConnected(j.data?.connected ?? false);
    }).catch(() => {});
  }, []);

  async function handleSaveName() {
    if (!name.trim()) return;
    setSaving(true);
    setSaving(false);
    setStep(1);
  }

  async function handleConnectHubspot() {
    const res = await fetch("/api/auth/hubspot", { method: "POST" });
    const json = await res.json();
    if (json.data?.authUrl) {
      window.location.href = json.data.authUrl;
    }
  }

  function handleFinish(prompt?: string) {
    // Mark as onboarded
    fetch("/api/settings/automations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ onboarded: true }),
    }).catch(() => {});

    if (prompt) {
      // Store the prompt and go to chat
      sessionStorage.setItem("pending_message", JSON.stringify({ message: prompt, model: "kairo" }));
      // Create conversation then redirect
      fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: prompt.slice(0, 80) }),
      }).then(r => r.json()).then(j => {
        if (j.data?.id) router.push("/chat/" + j.data.id);
        else router.push("/chat");
      }).catch(() => router.push("/chat"));
    } else {
      router.push("/chat");
    }
  }

  var suggestions = [
    "Analyze my pipeline health",
    "What's my win rate?",
    "Show me at-risk deals",
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-12">
        {[0, 1, 2].map(function(i) {
          return (
            <div key={i} className={"h-2 rounded-full transition-all " + (i === step ? "w-8 bg-[#0A0A0A]" : i < step ? "w-2 bg-[#0A0A0A]" : "w-2 bg-[#E5E5E5]")} />
          );
        })}
      </div>

      {/* Step 0: Welcome */}
      {step === 0 && (
        <div className="w-full max-w-md text-center">
          <div className="h-14 w-14 rounded-2xl bg-[#0A0A0A] flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-xl font-bold">K</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0A0A0A] mb-2">Welcome to Kairo</h1>
          <p className="text-sm text-[#737373] mb-8">Your AI RevOps assistant. Let&apos;s get you set up.</p>
          <input
            type="text"
            value={name}
            onChange={function(e) { setName(e.target.value); }}
            onKeyDown={function(e) { if (e.key === "Enter") handleSaveName(); }}
            placeholder="Your name"
            className="w-full h-12 px-4 text-sm rounded-xl border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent mb-4 text-center"
            autoFocus
          />
          <button
            onClick={handleSaveName}
            disabled={!name.trim() || saving}
            className="w-full h-11 rounded-xl bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#333] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
          >
            Continue <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Step 1: Connect HubSpot */}
      {step === 1 && (
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-[#0A0A0A] mb-2">Connect your CRM</h1>
          <p className="text-sm text-[#737373] mb-8">Kairo needs access to your HubSpot to analyze your data.</p>

          {hsConnected ? (
            <div className="mb-8">
              <div className="h-12 w-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center mx-auto mb-3">
                <Check size={24} className="text-[#22C55E]" />
              </div>
              <p className="text-sm font-medium text-[#22C55E]">HubSpot connected</p>
            </div>
          ) : (
            <button
              onClick={handleConnectHubspot}
              className="w-full h-11 rounded-xl bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#333] transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <ExternalLink size={16} /> Connect HubSpot
            </button>
          )}

          <button
            onClick={function() { setStep(2); }}
            className={"w-full h-11 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 " + (hsConnected ? "bg-[#0A0A0A] text-white hover:bg-[#333]" : "border border-[#E5E5E5] text-[#737373] hover:bg-[#FAFAFA]")}
          >
            {hsConnected ? <>Continue <ArrowRight size={16} /></> : "Skip for now"}
          </button>
        </div>
      )}

      {/* Step 2: First question */}
      {step === 2 && (
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-[#0A0A0A] mb-2">You&apos;re all set!</h1>
          <p className="text-sm text-[#737373] mb-8">Try asking Kairo something to see it in action.</p>
          <div className="space-y-2 mb-6">
            {suggestions.map(function(s) {
              return (
                <button
                  key={s}
                  onClick={function() { handleFinish(s); }}
                  className="w-full h-11 rounded-xl border border-[#E5E5E5] text-sm text-[#525252] hover:bg-[#FAFAFA] hover:border-[#D4D4D4] transition-colors"
                >
                  {s}
                </button>
              );
            })}
          </div>
          <button
            onClick={function() { handleFinish(); }}
            className="w-full h-11 rounded-xl bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#333] transition-colors"
          >
            Go to Kairo
          </button>
        </div>
      )}
    </div>
  );
}
