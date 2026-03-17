"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Tab = "general" | "llm" | "connectors" | "billing";

const TABS: { id: Tab; label: string }[] = [
  { id: "general", label: "General" },
  { id: "llm", label: "LLM" },
  { id: "connectors", label: "Connecteurs" },
  { id: "billing", label: "Facturation" },
];

interface LlmConfig {
  defaultModel: string;
  keys: {
    anthropic: { configured: boolean; last4?: string };
    openai: { configured: boolean; last4?: string };
    google: { configured: boolean; last4?: string };
  };
}

function SettingsContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as Tab) ?? "general";
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [llmConfig, setLlmConfig] = useState<LlmConfig | null>(null);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [hubspotConnected, setHubspotConnected] = useState(false);
  const [hubspotLoading, setHubspotLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? "");
      setUserName(data.user?.user_metadata?.full_name ?? "");
    });
  }, []);

  useEffect(() => {
    if (activeTab === "connectors") {
      fetch("/api/connectors/hubspot/status").then((r) => r.json()).then((json) => {
        setHubspotConnected(json.data?.connected ?? false);
      }).catch(() => {});
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "llm") {
      fetch("/api/settings/llm").then((r) => r.json()).then((json) => {
        if (json.data) setLlmConfig(json.data);
      }).catch(() => {});
    }
  }, [activeTab]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const handleConnectHubspot = async () => {
    setHubspotLoading(true);
    try {
      const res = await fetch("/api/auth/hubspot", { method: "POST" });
      const json = await res.json();
      if (json.data?.authUrl) {
        window.location.href = json.data.authUrl;
      }
    } catch {
      setHubspotLoading(false);
    }
  };

  const saveKey = async (provider: string) => {
    const bodyKey = provider === "anthropic" ? "anthropicKey" : provider === "openai" ? "openaiKey" : "googleKey";
    await fetch("/api/settings/llm", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [bodyKey]: keyInput }),
    });
    setEditingKey(null);
    setKeyInput("");
    // Refresh config
    const res = await fetch("/api/settings/llm");
    const json = await res.json();
    if (json.data) setLlmConfig(json.data);
  };

  const saveDefaultModel = async (model: string) => {
    await fetch("/api/settings/llm", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ defaultModel: model }),
    });
    setLlmConfig((prev) => prev ? { ...prev, defaultModel: model } : prev);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold text-[#0A0A0A]">Parametres</h1>
        <a href="/chat" className="text-sm text-[#737373] hover:text-[#0A0A0A] transition-colors">
          Retour au chat
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#E5E5E5] mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm transition-colors -mb-px ${
              activeTab === tab.id
                ? "text-[#0A0A0A] font-medium border-b-2 border-[#0A0A0A]"
                : "text-[#737373] hover:text-[#0A0A0A]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* General tab */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 space-y-4">
            <h2 className="text-sm font-medium text-[#0A0A0A]">Compte</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#737373]">Email</label>
                <p className="text-sm text-[#0A0A0A] mt-0.5">{userEmail}</p>
              </div>
              <div>
                <label className="text-xs text-[#737373]">Nom</label>
                <p className="text-sm text-[#0A0A0A] mt-0.5">{userName || "Non renseigne"}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm rounded-lg border border-[#E5E5E5] text-[#737373] hover:text-red-600 hover:border-red-200 transition-colors"
          >
            Se deconnecter
          </button>
        </div>
      )}

      {/* LLM tab */}
      {activeTab === "llm" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 space-y-4">
            <h2 className="text-sm font-medium text-[#0A0A0A]">Modele par defaut</h2>
            <div className="flex flex-wrap gap-2">
              {["revops-ai", "claude", "gpt", "gemini"].map((model) => (
                <button
                  key={model}
                  onClick={() => saveDefaultModel(model)}
                  className={`h-8 px-4 rounded-full text-xs font-medium border transition-colors ${
                    llmConfig?.defaultModel === model
                      ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                      : "bg-white text-[#737373] border-[#E5E5E5] hover:border-[#0A0A0A]"
                  }`}
                >
                  {model === "revops-ai" ? "RevOps AI" : model.charAt(0).toUpperCase() + model.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 space-y-4">
            <h2 className="text-sm font-medium text-[#0A0A0A]">Cles API</h2>
            <p className="text-xs text-[#737373]">
              Optionnel — si non configure, les cles RevOps AI seront utilisees
            </p>
            {[
              { id: "anthropic", name: "Anthropic (Claude)" },
              { id: "openai", name: "OpenAI (GPT)" },
              { id: "google", name: "Google (Gemini)" },
            ].map((provider) => {
              const config = llmConfig?.keys[provider.id as keyof typeof llmConfig.keys];
              return (
                <div
                  key={provider.id}
                  className="flex items-center justify-between py-3 border-t border-[#F5F5F5] first:border-0"
                >
                  <div>
                    <p className="text-sm text-[#0A0A0A]">{provider.name}</p>
                    <p className="text-xs text-[#737373] mt-0.5">
                      {config?.configured ? (
                        <span className="text-green-600">Connecte — ****{config.last4}</span>
                      ) : (
                        <span>Non configure</span>
                      )}
                    </p>
                  </div>
                  {editingKey === provider.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="sk-..."
                        className="h-8 px-3 border border-[#E5E5E5] rounded-lg text-xs w-48 focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
                      />
                      <button
                        onClick={() => saveKey(provider.id)}
                        className="h-8 px-3 rounded-lg bg-[#0A0A0A] text-white text-xs"
                      >
                        Sauver
                      </button>
                      <button
                        onClick={() => { setEditingKey(null); setKeyInput(""); }}
                        className="text-xs text-[#737373]"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingKey(provider.id)}
                      className="text-xs text-[#737373] hover:text-[#0A0A0A] transition-colors"
                    >
                      Modifier
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Connectors tab */}
      {activeTab === "connectors" && (
        <div className="space-y-4">
          {/* HubSpot — dynamic connection status */}
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">{"\uD83D\uDFE0"}</span>
              <div>
                <p className="text-sm font-medium text-[#0A0A0A]">HubSpot</p>
                <p className={`text-xs mt-0.5 ${hubspotConnected ? "text-green-600" : "text-[#A3A3A3]"}`}>
                  {hubspotConnected ? "Connecte — Portal sync active" : "Non connecte"}
                </p>
              </div>
            </div>
            <button
              onClick={handleConnectHubspot}
              disabled={hubspotLoading}
              className="text-xs text-[#737373] hover:text-[#0A0A0A] border border-[#E5E5E5] rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50"
            >
              {hubspotLoading ? "Redirection..." : hubspotConnected ? "Reconnecter" : "Connecter"}
            </button>
          </div>
          {/* Other connectors — coming soon */}
          {[
            { id: "salesforce", name: "Salesforce", icon: "\u2601\ufe0f", detail: "Bientot disponible" },
            { id: "google_sheets", name: "Google Sheets", icon: "\uD83D\uDCCA", detail: "Bientot disponible" },
            { id: "google_analytics", name: "Google Analytics", icon: "\uD83D\uDCC8", detail: "Bientot disponible" },
            { id: "slack", name: "Slack", icon: "\uD83D\uDCAC", detail: "Bientot disponible" },
          ].map((connector) => (
            <div
              key={connector.id}
              className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{connector.icon}</span>
                <div>
                  <p className="text-sm font-medium text-[#0A0A0A]">{connector.name}</p>
                  <p className="text-xs mt-0.5 text-[#A3A3A3]">{connector.detail}</p>
                </div>
              </div>
              <span className="text-xs text-[#A3A3A3]">Indisponible</span>
            </div>
          ))}
        </div>
      )}

      {/* Billing tab */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 space-y-4">
            <h2 className="text-sm font-medium text-[#0A0A0A]">Plan actuel</h2>
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-[#0A0A0A]">Free</span>
              <span className="text-xs bg-[#F5F5F5] text-[#737373] px-2 py-0.5 rounded-full">Actif</span>
            </div>
            <p className="text-xs text-[#737373]">50 messages / mois inclus</p>
          </div>
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 space-y-4">
            <h2 className="text-sm font-medium text-[#0A0A0A]">Credits restants</h2>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-semibold text-[#0A0A0A]">--</span>
              <span className="text-sm text-[#737373] mb-0.5">/ 50</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsContent />
    </Suspense>
  );
}
