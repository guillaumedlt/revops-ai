"use client";

import { useState, useRef, useEffect } from "react";
import { SlidersHorizontal, ArrowUp, FileText, LayoutDashboard, Search, GitCompare, TrendingUp, Shield, ChevronDown, Check, Sparkles } from "lucide-react";
import FileUpload from "./FileUpload";
import TemplatesPopover from "./TemplatesPopover";
import { CONNECTOR_REGISTRY } from "@/lib/connectors/registry";

interface Attachment {
  type: string;
  content?: string;
  base64?: string;
  mediaType?: string;
  fileName?: string;
  mimeType?: string;
}

interface ChatInputBarProps {
  onSend: (message: string, model: string, attachment?: Attachment) => void;
  disabled?: boolean;
  initialValue?: string;
}

interface ModelOption {
  id: string;
  label: string;
  description: string;
  provider: string;
}

var MODELS: ModelOption[] = [
  { id: "kairo", label: "Kairo AI", description: "Auto-selects the best model", provider: "kairo" },
  { id: "claude-opus", label: "Claude Opus 4", description: "Most capable, complex analysis", provider: "anthropic" },
  { id: "claude-sonnet", label: "Claude Sonnet 4", description: "Fast & smart", provider: "anthropic" },
  { id: "claude-haiku", label: "Claude Haiku 4", description: "Fastest, simple queries", provider: "anthropic" },
  { id: "gpt-4o", label: "GPT-4o", description: "Most capable", provider: "openai" },
  { id: "gpt-4o-mini", label: "GPT-4o Mini", description: "Fast & affordable", provider: "openai" },
  { id: "gemini-pro", label: "Gemini 2.5 Pro", description: "Most capable", provider: "google" },
  { id: "gemini-flash", label: "Gemini 2.5 Flash", description: "Fast", provider: "google" },
];

var PROVIDER_ORDER = ["kairo", "anthropic", "openai", "google"];

var PROVIDER_LABELS: Record<string, string> = {
  kairo: "",
  anthropic: "Anthropic",
  openai: "OpenAI",
  google: "Google",
};

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

var SLASH_COMMANDS = [
  { command: "/report", label: "Create Report", description: "Generate a PPT-style report from your data", icon: "FileText" },
  { command: "/dashboard", label: "Add to Dashboard", description: "Create a dashboard widget from the response", icon: "LayoutDashboard" },
  { command: "/analyze", label: "Deep Analysis", description: "Run a comprehensive analysis on a topic", icon: "Search" },
  { command: "/compare", label: "Compare", description: "Compare reps, periods, or segments", icon: "GitCompare" },
  { command: "/forecast", label: "Forecast", description: "Generate revenue or pipeline forecast", icon: "TrendingUp" },
  { command: "/audit", label: "CRM Audit", description: "Run a full CRM data quality audit", icon: "Shield" },
];

var ICON_MAP: Record<string, any> = {
  FileText: FileText,
  LayoutDashboard: LayoutDashboard,
  Search: Search,
  GitCompare: GitCompare,
  TrendingUp: TrendingUp,
  Shield: Shield,
};

export default function ChatInputBar({
  onSend,
  disabled,
  initialValue,
}: ChatInputBarProps) {
  var [value, setValue] = useState(initialValue ?? "");
  var [selectedModel, setSelectedModel] = useState("kairo");
  var [showModelPicker, setShowModelPicker] = useState(false);
  var [showConnectors, setShowConnectors] = useState(false);
  var [selectedFile, setSelectedFile] = useState<File | null>(null);
  var [uploading, setUploading] = useState(false);
  var [showSlash, setShowSlash] = useState(false);
  var [slashIndex, setSlashIndex] = useState(0);
  var textareaRef = useRef<HTMLTextAreaElement>(null);
  var modelRef = useRef<HTMLDivElement>(null);
  var connectorsRef = useRef<HTMLDivElement>(null);
  var slashRef = useRef<HTMLDivElement>(null);

  useEffect(function() {
    if (initialValue) setValue(initialValue);
  }, [initialValue]);

  useEffect(function() {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [value]);

  useEffect(function() {
    var handleClickOutside = function(e: MouseEvent) {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setShowModelPicker(false);
      }
      if (connectorsRef.current && !connectorsRef.current.contains(e.target as Node)) {
        setShowConnectors(false);
      }
      if (slashRef.current && !slashRef.current.contains(e.target as Node)) {
        setShowSlash(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return function() { document.removeEventListener("mousedown", handleClickOutside); };
  }, []);

  // Slash command detection
  var filteredSlash = SLASH_COMMANDS.filter(function(cmd) {
    if (!value.startsWith("/")) return false;
    var typed = value.split(" ")[0].toLowerCase();
    return cmd.command.startsWith(typed);
  });

  useEffect(function() {
    if (value.startsWith("/") && value.indexOf(" ") === -1 && filteredSlash.length > 0) {
      setShowSlash(true);
      setSlashIndex(0);
    } else {
      setShowSlash(false);
    }
  }, [value, filteredSlash.length]);

  function selectSlashCommand(cmd: typeof SLASH_COMMANDS[0]) {
    setValue(cmd.command + " ");
    setShowSlash(false);
    if (textareaRef.current) textareaRef.current.focus();
  }

  var handleSend = async function() {
    var trimmed = value.trim();
    if (!trimmed || disabled || uploading) return;

    var attachment: Attachment | undefined;

    if (selectedFile) {
      setUploading(true);
      try {
        var formData = new FormData();
        formData.append("file", selectedFile);
        var res = await fetch("/api/chat/upload", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          var json = await res.json();
          if (json.data) {
            attachment = json.data;
          }
        }
      } catch {
        // Upload failed, send without attachment
      } finally {
        setUploading(false);
        setSelectedFile(null);
      }
    }

    onSend(trimmed, selectedModel, attachment);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  var handleKeyDown = function(e: React.KeyboardEvent) {
    if (showSlash && filteredSlash.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSlashIndex(function(prev) { return Math.min(prev + 1, filteredSlash.length - 1); });
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSlashIndex(function(prev) { return Math.max(prev - 1, 0); });
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        selectSlashCommand(filteredSlash[slashIndex]);
        return;
      }
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  var handleVoiceTranscript = function(text: string) {
    setValue(function(prev) { return prev ? prev + " " + text : text; });
    if (textareaRef.current) textareaRef.current.focus();
  };

  var handleTemplateSelect = function(prompt: string) {
    setValue(prompt);
    if (textareaRef.current) textareaRef.current.focus();
  };

  var currentModel = MODELS.find(function(m) { return m.id === selectedModel; }) || MODELS[0];

  // Group models by provider
  var groupedModels = PROVIDER_ORDER.map(function(provider) {
    return {
      provider: provider,
      label: PROVIDER_LABELS[provider],
      models: MODELS.filter(function(m) { return m.provider === provider; }),
    };
  }).filter(function(g) { return g.models.length > 0; });

  return (
    <div className="relative w-full px-4 pb-4">
      <div className="mx-auto max-w-2xl">
        <div className="relative border border-[#E5E5E5] rounded-2xl bg-white shadow-sm focus-within:ring-1 focus-within:ring-[#D4D4D4] transition-shadow">
          {/* Slash command popover */}
          {showSlash && filteredSlash.length > 0 && (
            <div ref={slashRef} className="absolute bottom-full left-4 mb-2 w-[300px] rounded-xl border border-[#E5E5E5] bg-white shadow-lg z-50 py-1 overflow-hidden">
              {filteredSlash.map(function(cmd, i) {
                var Icon = ICON_MAP[cmd.icon] || FileText;
                return (
                  <button
                    key={cmd.command}
                    onClick={function() { selectSlashCommand(cmd); }}
                    className={"w-full flex items-center gap-3 px-3 py-2 text-left transition-colors " + (i === slashIndex ? "bg-[#F5F5F5]" : "hover:bg-[#FAFAFA]")}
                  >
                    <div className="h-8 w-8 rounded-lg bg-[#F5F5F5] flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#525252]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#0A0A0A]">{cmd.command}</p>
                      <p className="text-[11px] text-[#A3A3A3] truncate">{cmd.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* File preview chip */}
          {selectedFile && (
            <div className="px-4 pt-2">
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] px-3 py-1.5 text-xs text-[#525252]">
                <span className="max-w-[200px] truncate">
                  {selectedFile.name}
                </span>
                <span className="text-[#A3A3A3]">
                  {selectedFile.size < 1024
                    ? selectedFile.size + " B"
                    : selectedFile.size < 1048576
                      ? (selectedFile.size / 1024).toFixed(1) + " KB"
                      : (selectedFile.size / 1048576).toFixed(1) + " MB"}
                </span>
                <button
                  onClick={function() { setSelectedFile(null); }}
                  className="text-[#A3A3A3] hover:text-[#0A0A0A] text-sm leading-none"
                >
                  &times;
                </button>
              </div>
            </div>
          )}

          {/* Textarea row */}
          <div className="px-4 pt-3 pb-1">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={function(e) { setValue(e.target.value); }}
              onKeyDown={handleKeyDown}
              disabled={disabled || uploading}
              placeholder="Ask Kairo anything... (type / for commands)"
              rows={1}
              className="w-full resize-none bg-transparent text-sm text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none min-h-[36px] max-h-[200px] py-1"
            />
          </div>

          {/* Icon row */}
          <div className="px-3 pb-2.5 flex items-center justify-between">
            {/* Left icons */}
            <div className="relative flex items-center gap-0.5">
              <FileUpload
                onFileSelect={function(file) { setSelectedFile(file); }}
                selectedFile={null}
                onClear={function() { setSelectedFile(null); }}
              />
              <div className="relative" ref={connectorsRef}>
                <button
                  onClick={function() { setShowConnectors(!showConnectors); }}
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#737373] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors"
                  title="Connectors"
                >
                  <SlidersHorizontal size={16} />
                </button>
                {showConnectors && (
                  <div className="absolute bottom-full left-0 mb-2 w-[280px] rounded-xl border border-[#E5E5E5] bg-white shadow-lg z-50 overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-2.5 border-b border-[#F0F0F0]">
                      <p className="text-xs font-semibold text-[#0A0A0A]">Connectors</p>
                    </div>

                    {/* Connector list */}
                    <div className="p-1.5">
                      {CONNECTOR_REGISTRY.map(function(c) {
                        return (
                          <div
                            key={c.id}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#FAFAFA] transition-colors"
                          >
                            <img
                              src={c.logo}
                              alt=""
                              className="h-5 w-5 rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-[#0A0A0A]">
                                {c.name}
                              </p>
                              <p className="text-[10px] text-[#A3A3A3] truncate">
                                {c.description}
                              </p>
                            </div>
                            {c.connected ? (
                              <div className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-[#22C55E]" />
                                <span className="text-[10px] font-medium text-[#22C55E]">
                                  Connected
                                </span>
                              </div>
                            ) : (
                              <button className="text-[10px] text-[#0A0A0A] font-medium px-2.5 py-1 rounded-md border border-[#E5E5E5] hover:bg-[#F5F5F5] transition-colors">
                                Connect
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <TemplatesPopover onSelect={handleTemplateSelect} />

              {/* Model pill */}
              <div className="relative" ref={modelRef}>
                <button
                  onClick={function() { setShowModelPicker(!showModelPicker); }}
                  className="ml-1 h-7 px-2.5 rounded-full text-[11px] font-medium border border-[#E5E5E5] text-[#525252] hover:bg-[#F5F5F5] transition-colors flex items-center gap-1.5"
                >
                  <ProviderIcon provider={currentModel.provider} size={14} />
                  <span>{currentModel.label}</span>
                  <ChevronDown size={12} className="text-[#A3A3A3]" />
                </button>
                {showModelPicker && (
                  <div className="absolute bottom-full left-0 mb-1 bg-white border border-[#E5E5E5] rounded-xl shadow-lg py-1.5 w-[280px] z-50 overflow-hidden">
                    {groupedModels.map(function(group, gi) {
                      return (
                        <div key={group.provider}>
                          {gi > 0 && group.label && (
                            <div className="mx-3 my-1 border-t border-[#F0F0F0]" />
                          )}
                          {group.label && (
                            <div className="px-3 pt-1.5 pb-0.5">
                              <span className="text-[10px] uppercase tracking-wider text-[#A3A3A3] font-medium">{group.label}</span>
                            </div>
                          )}
                          {group.models.map(function(model) {
                            var isSelected = selectedModel === model.id;
                            return (
                              <button
                                key={model.id}
                                onClick={function() {
                                  setSelectedModel(model.id);
                                  setShowModelPicker(false);
                                }}
                                className={"w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors " + (isSelected ? "bg-[#F5F5F5]" : "hover:bg-[#FAFAFA]")}
                              >
                                <div className="shrink-0">
                                  <ProviderIcon provider={model.provider} size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={"text-sm " + (isSelected ? "font-medium text-[#0A0A0A]" : "text-[#525252]")}>{model.label}</p>
                                  <p className="text-[11px] text-[#A3A3A3] truncate">{model.description}</p>
                                </div>
                                {isSelected && (
                                  <Check size={14} className="text-[#0A0A0A] shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-0.5">
              {value.trim() ? (
                <button
                  onClick={handleSend}
                  disabled={disabled || uploading}
                  className="h-8 w-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[#333] transition-colors disabled:opacity-50"
                >
                  <ArrowUp size={16} />
                </button>
              ) : (
                <div className="h-8 w-8 rounded-full bg-[#E5E5E5] flex items-center justify-center">
                  <ArrowUp size={16} className="text-[#A3A3A3]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
