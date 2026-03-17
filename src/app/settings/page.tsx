"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CONNECTOR_REGISTRY, CATEGORIES } from "@/lib/connectors/registry";

type Tab = "general" | "llm" | "connectors" | "billing";

const TABS: { id: Tab; label: string }[] = [
  { id: "general", label: "General" },
  { id: "llm", label: "LLM" },
  { id: "connectors", label: "Connectors" },
  { id: "billing", label: "Billing" },
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
  const [connectorToggles, setConnectorToggles] = useState<Record<string, boolean>>({
    hubspot: true,
  });
  const [connectorSearch, setConnectorSearch] = useState("");
  const [connectorCategory, setConnectorCategory] = useState("all");

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

  const handleToggleConnector = (connectorId: string) => {
    setConnectorToggles((prev) => ({
      ...prev,
      [connectorId]: !prev[connectorId],
    }));
    fetch("/api/settings/connectors", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ connectorId, enabled: !connectorToggles[connectorId] }),
    }).catch(() => {});
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

  const filteredConnectors = CONNECTOR_REGISTRY.filter((c) => {
    const matchesSearch =
      !connectorSearch ||
      c.name.toLowerCase().includes(connectorSearch.toLowerCase()) ||
      c.description.toLowerCase().includes(connectorSearch.toLowerCase());
    const matchesCategory =
      connectorCategory === "all" || c.category === connectorCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-semibold text-[#0A0A0A]">Settings</h1>
        <a href="/chat" className="text-sm text-[#737373] hover:text-[#0A0A0A] transition-colors">
          Back to chat
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#E5E5E5] mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              "px-4 py-2.5 text-sm transition-colors -mb-px " +
              (activeTab === tab.id
                ? "text-[#0A0A0A] font-medium border-b-2 border-[#0A0A0A]"
                : "text-[#737373] hover:text-[#0A0A0A]")
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* General tab */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 space-y-4">
            <h2 className="text-sm font-medium text-[#0A0A0A]">Account</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#737373]">Email</label>
                <p className="text-sm text-[#0A0A0A] mt-0.5">{userEmail}</p>
              </div>
              <div>
                <label className="text-xs text-[#737373]">Name</label>
                <p className="text-sm text-[#0A0A0A] mt-0.5">{userName || "Not set"}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm rounded-lg border border-[#E5E5E5] text-[#737373] hover:text-red-600 hover:border-red-200 transition-colors"
          >
            Log out
          </button>
        </div>
      )}

      {/* LLM tab */}
      {activeTab === "llm" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 space-y-4">
            <h2 className="text-sm font-medium text-[#0A0A0A]">Default model</h2>
            <div className="flex flex-wrap gap-2">
              {["revops-ai", "claude", "gpt", "gemini"].map((model) => (
                <button
                  key={model}
                  onClick={() => saveDefaultModel(model)}
                  className={
                    "h-8 px-4 rounded-full text-xs font-medium border transition-colors " +
                    (llmConfig?.defaultModel === model
                      ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                      : "bg-white text-[#737373] border-[#E5E5E5] hover:border-[#0A0A0A]")
                  }
                >
                  {model === "revops-ai" ? "RevOps AI" : model.charAt(0).toUpperCase() + model.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 space-y-4">
            <h2 className="text-sm font-medium text-[#0A0A0A]">API Keys</h2>
            <p className="text-xs text-[#737373]">
              Optional — if not configured, RevOps AI keys will be used
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
                        <span className="text-green-600">{"Connected — ****" + config.last4}</span>
                      ) : (
                        <span>Not configured</span>
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
                        Save
                      </button>
                      <button
                        onClick={() => { setEditingKey(null); setKeyInput(""); }}
                        className="text-xs text-[#737373]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingKey(provider.id)}
                      className="text-xs text-[#737373] hover:text-[#0A0A0A] transition-colors"
                    >
                      Edit
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
          {/* Search bar */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={connectorSearch}
              onChange={(e) => setConnectorSearch(e.target.value)}
              placeholder="Search connectors..."
              className="flex-1 px-4 py-2 text-sm border border-[#E5E5E5] rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#D4D4D4]"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setConnectorCategory(cat.id)}
                className={
                  "px-3 py-1 rounded-full text-xs font-medium transition-colors " +
                  (connectorCategory === cat.id
                    ? "bg-[#0A0A0A] text-white"
                    : "bg-[#F5F5F5] text-[#737373] hover:bg-[#E5E5E5]")
                }
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Connector list */}
          <div className="space-y-2">
            {filteredConnectors.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={c.logo} alt="" className="h-6 w-6 rounded" />
                  <div>
                    <p className="text-sm font-medium text-[#0A0A0A]">{c.name}</p>
                    <p className={"text-xs mt-0.5 " + (c.id === "hubspot" && hubspotConnected ? "text-green-600" : "text-[#A3A3A3]")}>
                      {c.id === "hubspot" && hubspotConnected
                        ? "Connected — Portal sync active"
                        : c.id === "hubspot"
                          ? "Not connected"
                          : c.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {c.id === "hubspot" ? (
                    <>
                      <button
                        onClick={() => handleToggleConnector("hubspot")}
                        className={
                          "relative inline-flex h-5 w-9 items-center rounded-full transition-colors " +
                          (connectorToggles.hubspot ? "bg-[#0A0A0A]" : "bg-[#E5E5E5]")
                        }
                      >
                        <span className={
                          "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform " +
                          (connectorToggles.hubspot ? "translate-x-[18px]" : "translate-x-[3px]")
                        } />
                      </button>
                      <button
                        onClick={handleConnectHubspot}
                        disabled={hubspotLoading}
                        className="text-xs text-[#737373] hover:text-[#0A0A0A] border border-[#E5E5E5] rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50"
                      >
                        {hubspotLoading ? "Redirecting..." : hubspotConnected ? "Reconnect" : "Connect"}
                      </button>
                    </>
                  ) : c.available ? (
                    <button className="text-xs text-[#0A0A0A] font-medium border border-[#E5E5E5] rounded-lg px-3 py-1.5 hover:bg-[#F5F5F5] transition-colors">
                      Connect
                    </button>
                  ) : (
                    <span className="text-xs text-[#D4D4D4]">Coming soon</span>
                  )}
                </div>
              </div>
            ))}
            {filteredConnectors.length === 0 && (
              <div className="bg-white rounded-xl border border-[#E5E5E5] p-8 text-center">
                <p className="text-sm text-[#A3A3A3]">No connectors found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Billing tab */}
      {activeTab === "billing" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 space-y-4">
            <h2 className="text-sm font-medium text-[#0A0A0A]">Current plan</h2>
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-[#0A0A0A]">Free</span>
              <span className="text-xs bg-[#F5F5F5] text-[#737373] px-2 py-0.5 rounded-full">Active</span>
            </div>
            <p className="text-xs text-[#737373]">50 messages / month included</p>
          </div>
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 space-y-4">
            <h2 className="text-sm font-medium text-[#0A0A0A]">Remaining credits</h2>
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
