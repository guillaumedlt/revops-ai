"use client";

import { useState, useRef, useEffect } from "react";
import { SlidersHorizontal, ArrowUp } from "lucide-react";
import FileUpload from "./FileUpload";
import TemplatesPopover from "./TemplatesPopover";
import { CONNECTOR_REGISTRY, CATEGORIES } from "@/lib/connectors/registry";

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

const MODELS = [
  { id: "revops-ai", label: "RevOps AI" },
  { id: "claude", label: "Claude" },
  { id: "gpt", label: "GPT" },
  { id: "gemini", label: "Gemini" },
];

export default function ChatInputBar({
  onSend,
  disabled,
  initialValue,
}: ChatInputBarProps) {
  const [value, setValue] = useState(initialValue ?? "");
  const [selectedModel, setSelectedModel] = useState("revops-ai");
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [showConnectors, setShowConnectors] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [connectorSearch, setConnectorSearch] = useState("");
  const [connectorCategory, setConnectorCategory] = useState("all");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const connectorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialValue) setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modelRef.current &&
        !modelRef.current.contains(e.target as Node)
      ) {
        setShowModelPicker(false);
      }
      if (
        connectorsRef.current &&
        !connectorsRef.current.contains(e.target as Node)
      ) {
        setShowConnectors(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset search/category when popover closes
  useEffect(() => {
    if (!showConnectors) {
      setConnectorSearch("");
      setConnectorCategory("all");
    }
  }, [showConnectors]);

  const filteredConnectors = CONNECTOR_REGISTRY.filter((c) => {
    const matchesSearch =
      !connectorSearch ||
      c.name.toLowerCase().includes(connectorSearch.toLowerCase()) ||
      c.description.toLowerCase().includes(connectorSearch.toLowerCase());
    const matchesCategory =
      connectorCategory === "all" || c.category === connectorCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSend = async () => {
    const trimmed = value.trim();
    if (!trimmed || disabled || uploading) return;

    let attachment: Attachment | undefined;

    if (selectedFile) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const res = await fetch("/api/chat/upload", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          const json = await res.json();
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setValue((prev) => (prev ? prev + " " + text : text));
    textareaRef.current?.focus();
  };

  const handleTemplateSelect = (prompt: string) => {
    setValue(prompt);
    textareaRef.current?.focus();
  };

  const currentModel =
    MODELS.find((m) => m.id === selectedModel) ?? MODELS[0];

  return (
    <div className="relative w-full px-4 pb-4">
      <div className="mx-auto max-w-2xl">
        <div className="relative border border-[#E5E5E5] rounded-2xl bg-white shadow-sm focus-within:ring-1 focus-within:ring-[#D4D4D4] transition-shadow">
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
                  onClick={() => setSelectedFile(null)}
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
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled || uploading}
              placeholder="Ask RevOps AI..."
              rows={1}
              className="w-full resize-none bg-transparent text-sm text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none min-h-[36px] max-h-[200px] py-1"
            />
          </div>

          {/* Icon row */}
          <div className="px-3 pb-2.5 flex items-center justify-between">
            {/* Left icons */}
            <div className="relative flex items-center gap-0.5">
              <FileUpload
                onFileSelect={(file) => setSelectedFile(file)}
                selectedFile={null}
                onClear={() => setSelectedFile(null)}
              />
              <div className="relative" ref={connectorsRef}>
                <button
                  onClick={() => setShowConnectors(!showConnectors)}
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#737373] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors"
                  title="Connected Tools"
                >
                  <SlidersHorizontal size={16} />
                </button>
                {showConnectors && (
                  <div className="absolute bottom-full left-0 mb-2 w-[340px] max-h-[450px] flex flex-col rounded-xl border border-[#E5E5E5] bg-white shadow-lg z-50">
                    {/* Search */}
                    <div className="p-3 border-b border-[#F0F0F0]">
                      <input
                        type="text"
                        value={connectorSearch}
                        onChange={(e) => setConnectorSearch(e.target.value)}
                        placeholder="Search connectors..."
                        className="w-full px-3 py-1.5 text-sm border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#D4D4D4]"
                        autoFocus
                      />
                    </div>

                    {/* Category pills */}
                    <div className="px-3 py-2 flex gap-1 flex-wrap border-b border-[#F0F0F0]">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setConnectorCategory(cat.id)}
                          className={
                            "px-2 py-0.5 rounded-full text-[10px] font-medium transition-colors " +
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
                    <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: "320px" }}>
                      {filteredConnectors.map((c) => (
                        <div
                          key={c.id}
                          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#FAFAFA]"
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
                          {c.id === "hubspot" ? (
                            <div className="flex items-center gap-1">
                              <div className="h-2 w-2 rounded-full bg-[#22C55E]" />
                              <span className="text-[10px] text-[#22C55E]">
                                Active
                              </span>
                            </div>
                          ) : c.available ? (
                            <button className="text-[10px] text-[#0A0A0A] font-medium px-2 py-0.5 rounded border border-[#E5E5E5] hover:bg-[#F5F5F5]">
                              Connect
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#D4D4D4]">
                              Soon
                            </span>
                          )}
                        </div>
                      ))}
                      {filteredConnectors.length === 0 && (
                        <p className="text-xs text-[#A3A3A3] text-center py-4">
                          No connectors found
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <TemplatesPopover onSelect={handleTemplateSelect} />

              {/* Model pill */}
              <div className="relative" ref={modelRef}>
                <button
                  onClick={() => setShowModelPicker(!showModelPicker)}
                  className="ml-1 h-7 px-2.5 rounded-full text-[11px] font-medium border border-[#E5E5E5] text-[#525252] hover:bg-[#F5F5F5] transition-colors"
                >
                  {currentModel.label}
                </button>
                {showModelPicker && (
                  <div className="absolute bottom-full left-0 mb-1 bg-white border border-[#E5E5E5] rounded-xl shadow-lg py-1 min-w-[140px] z-50">
                    {MODELS.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
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
                    ))}
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
