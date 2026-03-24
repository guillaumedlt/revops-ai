"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CONNECTOR_REGISTRY } from "@/lib/connectors/registry";
import { Check, HelpCircle, ExternalLink, X as XIcon } from "lucide-react";

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

interface ModelOption {
  id: string;
  label: string;
  description: string;
  provider: string;
}

const MODELS: ModelOption[] = [
  { id: "kairo", label: "Kairo AI", description: "Auto-selects the best model", provider: "kairo" },
  { id: "claude-opus", label: "Claude Opus 4.6", description: "Most capable, complex analysis", provider: "anthropic" },
  { id: "claude-sonnet", label: "Claude Sonnet 4.6", description: "Fast & smart", provider: "anthropic" },
  { id: "claude-haiku", label: "Claude Haiku 4.5", description: "Fastest, simple queries", provider: "anthropic" },
  { id: "gpt-4o", label: "GPT-4.1", description: "Most capable", provider: "openai" },
  { id: "gpt-4o-mini", label: "GPT-4.1 Mini", description: "Fast & affordable", provider: "openai" },
  { id: "gemini-pro", label: "Gemini 2.5 Pro", description: "Most capable", provider: "google" },
  { id: "gemini-flash", label: "Gemini 2.5 Flash", description: "Fast", provider: "google" },
];

function ProviderIcon({ provider, size = 16 }: { provider: string; size?: number }) {
  if (provider === "kairo") {
    return (
      <div className="flex items-center justify-center rounded bg-[#0A0A0A] text-white" style={{ width: size, height: size }}>
        <span style={{ fontSize: size * 0.6, fontWeight: 700, lineHeight: 1 }}>K</span>
      </div>
    );
  }
  if (provider === "anthropic") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M13.827 3.52l5.51 16.96H16.1L10.59 3.52h3.237zm-7.164 0l5.51 16.96h3.237L9.9 3.52H6.663z" fill="#0A0A0A"/>
      </svg>
    );
  }
  if (provider === "openai") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.998 5.998 0 0 0-3.998 2.9 6.042 6.042 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#0A0A0A"/>
      </svg>
    );
  }
  if (provider === "google") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 11v3.2h5.5c-.2 1.3-1.6 3.9-5.5 3.9-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5L18.6 4c-1.8-1.7-4.2-2.7-6.6-2.7C6.5 1.3 2 5.8 2 12s4.5 10.7 10 10.7c5.8 0 9.6-4.1 9.6-9.8 0-.7-.1-1.2-.2-1.7H12z" fill="#0A0A0A"/>
      </svg>
    );
  }
  return null;
}

function Step({ n, text, sub, link }: { n: string; text: string; sub?: string; link?: string }) {
  return (
    <div className="flex items-start gap-2 flex-1 min-w-0">
      <span className="h-5 w-5 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{n}</span>
      <div className="min-w-0">
        <p className="text-[11px] text-[#333] leading-snug">{text}</p>
        {sub && <p className="text-[10px] text-[#A3A3A3] leading-snug mt-0.5">{sub}</p>}
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-[10px] text-[#6366F1] hover:underline mt-0.5">
            Open <ExternalLink size={9} />
          </a>
        )}
      </div>
    </div>
  );
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

  // Lemlist state
  const [lemlistConnected, setLemlistConnected] = useState(false);
  const [lemlistKeyInput, setLemlistKeyInput] = useState("");
  const [lemlistConnecting, setLemlistConnecting] = useState(false);
  const [showLemlistInput, setShowLemlistInput] = useState(false);

  // Notion state
  const [notionConnected, setNotionConnected] = useState(false);
  const [notionKeyInput, setNotionKeyInput] = useState("");
  const [notionConnecting, setNotionConnecting] = useState(false);
  const [showNotionInput, setShowNotionInput] = useState(false);

  // Help guide popover
  const [showGuide, setShowGuide] = useState<string | null>(null);

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
      fetch("/api/connectors/notion/status").then((r) => r.json()).then((json) => {
        setNotionConnected(json.data?.connected ?? false);
      }).catch(() => {});
      fetch("/api/connectors/lemlist/status").then((r) => r.json()).then((json) => {
        setLemlistConnected(json.data?.connected ?? false);
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

  const handleConnectLemlist = async () => {
    setLemlistConnecting(true);
    try {
      const res = await fetch("/api/connectors/lemlist/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: lemlistKeyInput }),
      });
      if (res.ok) {
        setLemlistConnected(true);
        setShowLemlistInput(false);
        setLemlistKeyInput("");
      }
    } finally {
      setLemlistConnecting(false);
    }
  };

  const handleDisconnectLemlist = async () => {
    await fetch("/api/connectors/lemlist/connect", { method: "DELETE" });
    setLemlistConnected(false);
  };

  const handleConnectNotion = async () => {
    setNotionConnecting(true);
    try {
      const res = await fetch("/api/connectors/notion/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: notionKeyInput }),
      });
      if (res.ok) {
        setNotionConnected(true);
        setShowNotionInput(false);
        setNotionKeyInput("");
      } else {
        const err = await res.json();
        alert(err.error || "Failed to connect");
      }
    } finally {
      setNotionConnecting(false);
    }
  };

  const handleDisconnectNotion = async () => {
    await fetch("/api/connectors/notion/connect", { method: "DELETE" });
    setNotionConnected(false);
  };


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
            <p className="text-xs text-[#737373]">Choose which model Kairo uses by default</p>
            <div className="space-y-1">
              {MODELS.map((model) => {
                const isSelected = llmConfig?.defaultModel === model.id;
                return (
                  <button
                    key={model.id}
                    onClick={() => saveDefaultModel(model.id)}
                    className={
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors " +
                      (isSelected ? "bg-[#F5F5F5] ring-1 ring-[#0A0A0A]" : "hover:bg-[#FAFAFA]")
                    }
                  >
                    <div className="shrink-0">
                      <ProviderIcon provider={model.provider} size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={"text-sm " + (isSelected ? "font-medium text-[#0A0A0A]" : "text-[#525252]")}>{model.label}</p>
                      <p className="text-[11px] text-[#A3A3A3]">{model.description}</p>
                    </div>
                    {isSelected && (
                      <Check size={16} className="text-[#0A0A0A] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E5E5E5] p-6 space-y-4">
            <h2 className="text-sm font-medium text-[#0A0A0A]">API Keys</h2>
            <p className="text-xs text-[#737373]">
              Optional — if not configured, Kairo platform keys will be used
            </p>
            {[
              { id: "anthropic", name: "Anthropic", sub: "Claude models", provider: "anthropic" },
              { id: "openai", name: "OpenAI", sub: "GPT models", provider: "openai" },
              { id: "google", name: "Google", sub: "Gemini models", provider: "google" },
            ].map((provider) => {
              const config = llmConfig?.keys[provider.id as keyof typeof llmConfig.keys];
              return (
                <div
                  key={provider.id}
                  className="flex items-center justify-between py-3 border-t border-[#F5F5F5] first:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0">
                      <ProviderIcon provider={provider.provider} size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-[#0A0A0A] font-medium">{provider.name}</p>
                      <p className="text-xs text-[#737373] mt-0.5">
                        {config?.configured ? (
                          <span className="text-green-600">{"Connected — ****" + config.last4}</span>
                        ) : (
                          <span>{provider.sub}</span>
                        )}
                      </p>
                    </div>
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
        <div className="space-y-3">
          <p className="text-xs text-[#737373] mb-4">
            Connect your tools to let Kairo query your data in real-time.
          </p>
          {CONNECTOR_REGISTRY.map(function(c) {
            var isConnected = (c.id === "hubspot" && hubspotConnected) || (c.id === "notion" && notionConnected) || (c.id === "lemlist" && lemlistConnected);
            var statusText = c.id === "hubspot" && hubspotConnected ? "Connected — SSO active"
              : c.id === "notion" && notionConnected ? "Connected — Workspace linked"
              : c.id === "lemlist" && lemlistConnected ? "Connected — API key active"
              : c.description;

            return (
              <div key={c.id} className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
                {/* Main row */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={c.logo} alt="" className="h-6 w-6 rounded" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-[#0A0A0A]">{c.name}</p>
                        {c.toolCount > 0 && (
                          <span className="text-[10px] bg-[#F5F5F5] text-[#737373] px-1.5 py-0.5 rounded-full">{c.toolCount} tools</span>
                        )}
                      </div>
                      <p className={"text-xs mt-0.5 " + (isConnected ? "text-[#22C55E]" : "text-[#A3A3A3]")}>{statusText}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Help button */}
                    <button
                      onClick={function() { setShowGuide(showGuide === c.id ? null : c.id); }}
                      className={"h-7 w-7 flex items-center justify-center rounded-lg transition-colors " + (showGuide === c.id ? "bg-[#F0F0F0] text-[#0A0A0A]" : "text-[#C0C0C0] hover:text-[#737373] hover:bg-[#F5F5F5]")}
                      title="How to connect"
                    >
                      <HelpCircle size={15} />
                    </button>

                    {/* Action buttons */}
                    {c.id === "hubspot" ? (
                      <button
                        onClick={handleConnectHubspot}
                        disabled={hubspotLoading}
                        className={"text-xs font-medium rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50 " + (hubspotConnected ? "text-[#737373] border border-[#E5E5E5] hover:bg-[#F5F5F5]" : "text-white bg-[#0A0A0A] hover:bg-[#333]")}
                      >
                        {hubspotLoading ? "Redirecting..." : hubspotConnected ? "Reconnect" : "Connect"}
                      </button>
                    ) : c.id === "notion" ? (
                      notionConnected ? (
                        <button onClick={handleDisconnectNotion} className="text-[11px] text-[#737373] hover:text-red-500 border border-[#E5E5E5] rounded-lg px-2.5 py-1.5 transition-colors">Disconnect</button>
                      ) : showNotionInput ? (
                        <div className="flex items-center gap-1.5">
                          <input type="password" value={notionKeyInput} onChange={function(e) { setNotionKeyInput(e.target.value); }} placeholder="ntn_..." className="h-7 px-2 border border-[#E5E5E5] rounded-lg text-xs w-36 focus:outline-none focus:ring-1 focus:ring-[#D4D4D4]" />
                          <button onClick={handleConnectNotion} disabled={notionConnecting || !notionKeyInput.trim()} className="text-[11px] text-white bg-[#0A0A0A] rounded-lg px-2.5 py-1 hover:bg-[#333] disabled:opacity-50">{notionConnecting ? "..." : "Save"}</button>
                          <button onClick={function() { setShowNotionInput(false); setNotionKeyInput(""); }} className="text-[11px] text-[#A3A3A3]">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={function() { setShowNotionInput(true); setShowGuide("notion"); }} className="text-xs font-medium text-white bg-[#0A0A0A] rounded-lg px-3 py-1.5 hover:bg-[#333] transition-colors">Connect</button>
                      )
                    ) : c.id === "lemlist" ? (
                      lemlistConnected ? (
                        <button onClick={handleDisconnectLemlist} className="text-[11px] text-[#737373] hover:text-red-500 border border-[#E5E5E5] rounded-lg px-2.5 py-1.5 transition-colors">Disconnect</button>
                      ) : showLemlistInput ? (
                        <div className="flex items-center gap-1.5">
                          <input type="password" value={lemlistKeyInput} onChange={function(e) { setLemlistKeyInput(e.target.value); }} placeholder="API key..." className="h-7 px-2 border border-[#E5E5E5] rounded-lg text-xs w-32 focus:outline-none focus:ring-1 focus:ring-[#D4D4D4]" />
                          <button onClick={handleConnectLemlist} disabled={lemlistConnecting || !lemlistKeyInput.trim()} className="text-[11px] text-white bg-[#0A0A0A] rounded-lg px-2.5 py-1 hover:bg-[#333] disabled:opacity-50">{lemlistConnecting ? "..." : "Save"}</button>
                          <button onClick={function() { setShowLemlistInput(false); setLemlistKeyInput(""); }} className="text-[11px] text-[#A3A3A3]">Cancel</button>
                        </div>
                      ) : (
                        <button onClick={function() { setShowLemlistInput(true); setShowGuide("lemlist"); }} className="text-xs font-medium text-white bg-[#0A0A0A] rounded-lg px-3 py-1.5 hover:bg-[#333] transition-colors">Connect</button>
                      )
                    ) : null}
                  </div>
                </div>

                {/* Setup guide — slides down */}
                {showGuide === c.id && (
                  <div className="border-t border-[#F0F0F0] bg-[#FAFAFA] px-4 py-3">
                    {c.id === "hubspot" && (
                      <div className="space-y-2">
                        <p className="text-[11px] font-semibold text-[#525252]">Setup in 1 click</p>
                        <div className="flex gap-4">
                          <Step n="1" text='Click "Connect" above' />
                          <Step n="2" text="Log in to HubSpot" />
                          <Step n="3" text="Authorize Kairo" />
                        </div>
                        <p className="text-[10px] text-[#A3A3A3] mt-1">Kairo connects via OAuth SSO — no API key needed. Your data stays in HubSpot, Kairo queries it in real-time.</p>
                      </div>
                    )}
                    {c.id === "notion" && (
                      <div className="space-y-2">
                        <p className="text-[11px] font-semibold text-[#525252]">Setup in 3 steps</p>
                        <div className="flex gap-4">
                          <Step n="1" text="Create an integration on Notion" link="https://www.notion.so/profile/integrations" />
                          <Step n="2" text="Share pages with your integration" sub='Page > "..." > Connections' />
                          <Step n="3" text="Paste the API key above" sub="Starts with ntn_" />
                        </div>
                        <p className="text-[10px] text-[#A3A3A3] mt-1">Create an Internal integration, give it Read access, then share the pages you want Kairo to access.</p>
                      </div>
                    )}
                    {c.id === "lemlist" && (
                      <div className="space-y-2">
                        <p className="text-[11px] font-semibold text-[#525252]">Setup in 2 steps</p>
                        <div className="flex gap-4">
                          <Step n="1" text="Copy your API key from Lemlist" link="https://app.lemlist.com/settings/integrations" />
                          <Step n="2" text="Paste it above and click Save" />
                        </div>
                        <p className="text-[10px] text-[#A3A3A3] mt-1">Find it in Lemlist Settings &gt; Integrations &gt; API. Kairo will read your campaigns, leads, and team stats.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
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
            <p className="text-xs text-[#737373]">50 credits / month included</p>
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
