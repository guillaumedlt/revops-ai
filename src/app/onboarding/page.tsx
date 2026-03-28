"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, ExternalLink, Sparkles } from "lucide-react";

export default function OnboardingPage() {
  var [step, setStep] = useState(0);
  var [name, setName] = useState("");
  var [saving, setSaving] = useState(false);
  var [hsConnected, setHsConnected] = useState(false);
  var router = useRouter();

  useEffect(function() {
    fetch("/api/connectors/hubspot/status").then(function(r) { return r.json(); }).then(function(j) {
      setHsConnected(j.data?.connected ?? false);
    }).catch(function() {});
  }, []);

  async function handleSaveName() {
    if (!name.trim()) return;
    setSaving(true);
    try {
      await fetch("/api/settings/llm", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: name.trim() }),
      });
    } catch {}
    setSaving(false);
    setStep(1);
  }

  async function handleConnectHubspot() {
    var res = await fetch("/api/auth/hubspot");
    if (res.redirected) {
      window.location.href = res.url;
    } else {
      var json = await res.json().catch(function() { return {}; });
      if (json.data?.authUrl) window.location.href = json.data.authUrl;
    }
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

  var suggestions = [
    { text: "Analyse la sante de ma pipeline", icon: "📊" },
    { text: "Quel est mon win rate ?", icon: "🎯" },
    { text: "Quels deals sont en danger ?", icon: "⚠️" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#F0F0F0]">
        <div
          className="h-full bg-[#111] transition-all duration-500 rounded-r-full"
          style={{ width: ((step + 1) / 3 * 100) + "%" }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-3 mb-12">
        {["Profil", "CRM", "Premier pas"].map(function(label, i) {
          return (
            <div key={i} className="flex items-center gap-2">
              <div className={"h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all " + (
                i < step ? "bg-[#111] text-white" :
                i === step ? "bg-[#111] text-white ring-4 ring-[#111]/10" :
                "bg-[#F0F0F0] text-[#BBB]"
              )}>
                {i < step ? <Check size={13} /> : i + 1}
              </div>
              <span className={"text-[12px] hidden sm:block " + (i <= step ? "text-[#111] font-medium" : "text-[#C0C0C0]")}>{label}</span>
              {i < 2 && <div className={"h-px w-8 " + (i < step ? "bg-[#111]" : "bg-[#EBEBEB]")} />}
            </div>
          );
        })}
      </div>

      {/* Step 0: Welcome */}
      {step === 0 && (
        <div className="w-full max-w-md text-center">
          <div className="h-14 w-14 rounded-lg bg-[#111] flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-xl font-bold">K</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111] mb-2 tracking-tight">Bienvenue sur Kairo</h1>
          <p className="text-sm text-[#999] mb-8">Ton assistant IA RevOps. On configure tout en 2 minutes.</p>
          <div className="mb-4">
            <label className="block text-[12px] font-medium text-[#555] mb-1.5 text-left">Ton prenom</label>
            <input
              type="text" value={name}
              onChange={function(e) { setName(e.target.value); }}
              onKeyDown={function(e) { if (e.key === "Enter") handleSaveName(); }}
              placeholder="Guillaume"
              className="w-full h-12 px-4 text-sm rounded-lg border border-[#EAEAEA] focus:outline-none focus:ring-2 focus:ring-[#111] focus:border-transparent transition-shadow"
              autoFocus
            />
          </div>
          <button
            onClick={handleSaveName}
            disabled={!name.trim() || saving}
            className="w-full h-11 rounded-lg bg-[#111] text-white text-sm font-medium hover:bg-[#262626] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
          >
            {saving ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Continuer <ArrowRight size={15} /></>}
          </button>
        </div>
      )}

      {/* Step 1: Connect HubSpot */}
      {step === 1 && (
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-[#111] mb-2 tracking-tight">Connecte ton CRM</h1>
          <p className="text-sm text-[#999] mb-8">Kairo analyse tes donnees HubSpot pour te donner des insights.</p>

          {hsConnected ? (
            <div className="mb-8 py-6 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0]">
              <div className="h-12 w-12 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto mb-3">
                <Check size={24} className="text-[#22C55E]" />
              </div>
              <p className="text-sm font-semibold text-[#22C55E]">HubSpot connecte</p>
            </div>
          ) : (
            <button
              onClick={handleConnectHubspot}
              className="w-full h-12 rounded-lg bg-[#FF7A59] text-white text-sm font-medium hover:bg-[#E5684A] transition-colors flex items-center justify-center gap-2 mb-4"
            >
              <ExternalLink size={16} /> Connecter HubSpot
            </button>
          )}

          <button
            onClick={function() { setStep(2); }}
            className={"w-full h-11 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 " + (hsConnected ? "bg-[#111] text-white hover:bg-[#262626]" : "border border-[#EAEAEA] text-[#999] hover:bg-[#FAFAFA]")}
          >
            {hsConnected ? <>Continuer <ArrowRight size={15} /></> : "Passer pour l'instant"}
          </button>
        </div>
      )}

      {/* Step 2: First question */}
      {step === 2 && (
        <div className="w-full max-w-md text-center">
          <div className="h-12 w-12 rounded-lg bg-[#F0FDF4] flex items-center justify-center mx-auto mb-6">
            <Sparkles size={24} className="text-[#22C55E]" />
          </div>
          <h1 className="text-2xl font-bold text-[#111] mb-2 tracking-tight">{"C'est pret !"}</h1>
          <p className="text-sm text-[#999] mb-8">Pose ta premiere question a Kairo.</p>
          <div className="space-y-2.5 mb-6">
            {suggestions.map(function(s) {
              return (
                <button
                  key={s.text}
                  onClick={function() { handleFinish(s.text); }}
                  className="w-full h-12 rounded-lg border border-[#EAEAEA] text-sm text-[#555] hover:bg-[#FAFAFA] hover:border-[#D4D4D4] hover:text-[#111] transition-all flex items-center gap-3 px-4"
                >
                  <span className="text-base">{s.icon}</span>
                  <span>{s.text}</span>
                </button>
              );
            })}
          </div>
          <button
            onClick={function() { handleFinish(); }}
            className="w-full h-11 rounded-lg bg-[#111] text-white text-sm font-medium hover:bg-[#262626] transition-colors flex items-center justify-center gap-2"
          >
            Aller sur Kairo <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
