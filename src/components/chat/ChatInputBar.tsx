"use client";

import { useState, useRef, useEffect } from "react";
import { SlidersHorizontal, ArrowUp, FileText, LayoutDashboard, Search, GitCompare, TrendingUp, Shield } from "lucide-react";
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

var MODELS = [
  { id: "revops-ai", label: "RevOps AI" },
  { id: "claude", label: "Claude" },
  { id: "gpt", label: "GPT" },
  { id: "gemini", label: "Gemini" },
];

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
  var [selectedModel, setSelectedModel] = useState("revops-ai");
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
              placeholder="Ask RevOps AI... (type / for commands)"
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
                  className="ml-1 h-7 px-2.5 rounded-full text-[11px] font-medium border border-[#E5E5E5] text-[#525252] hover:bg-[#F5F5F5] transition-colors"
                >
                  {currentModel.label}
                </button>
                {showModelPicker && (
                  <div className="absolute bottom-full left-0 mb-1 bg-white border border-[#E5E5E5] rounded-xl shadow-lg py-1 min-w-[140px] z-50">
                    {MODELS.map(function(model) {
                      return (
                        <button
                          key={model.id}
                          onClick={function() {
                            setSelectedModel(model.id);
                            setShowModelPicker(false);
                          }}
                          className={
                            "w-full text-left px-3 py-1.5 text-xs hover:bg-[#F5F5F5] transition-colors " +
                            (selectedModel === model.id
                              ? "text-[#0A0A0A] font-medium"
                              : "text-[#525252]")
                          }
                        >
                          {model.label}
                        </button>
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