"use client";

import { useState, useRef, useEffect } from "react";
import ConnectorPopover from "./ConnectorPopover";

interface ChatInputBarProps {
  onSend: (message: string, model: string) => void;
  disabled?: boolean;
  connectedTools?: string[];
  initialValue?: string;
}

const MODELS = [
  { id: "revops-ai", label: "RevOps AI" },
  { id: "claude", label: "Claude" },
  { id: "gpt", label: "GPT" },
  { id: "gemini", label: "Gemini" },
];

export default function ChatInputBar({ onSend, disabled, connectedTools = [], initialValue }: ChatInputBarProps) {
  const [value, setValue] = useState(initialValue ?? "");
  const [selectedModel, setSelectedModel] = useState("revops-ai");
  const [showConnectors, setShowConnectors] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialValue) setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (connectorRef.current && !connectorRef.current.contains(e.target as Node)) {
        setShowConnectors(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed, selectedModel);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto max-w-3xl w-full px-4 pb-6">
      <div className="border border-[#E5E5E5] rounded-2xl bg-white shadow-sm focus-within:ring-1 focus-within:ring-[#0A0A0A] transition-shadow">
        {/* Top row: icons + textarea + send */}
        <div className="flex items-end gap-2 px-4 pt-3 pb-2">
          <div className="flex items-center gap-1 shrink-0 pb-1" ref={connectorRef}>
            <button
              onClick={() => setShowConnectors(!showConnectors)}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-[#737373] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors relative"
              title="Connecteurs"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            {showConnectors && (
              <div className="absolute bottom-full left-0 mb-2 z-50">
                <ConnectorPopover onClose={() => setShowConnectors(false)} />
              </div>
            )}
            <button
              className="h-8 w-8 rounded-lg flex items-center justify-center text-[#737373] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors"
              title="Joindre un fichier"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Que veux-tu analyser ?"
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none min-h-[36px] max-h-[200px] py-1"
          />
          {value.trim() && (
            <button
              onClick={handleSend}
              disabled={disabled}
              className="h-8 w-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center shrink-0 hover:bg-[#333] transition-colors disabled:opacity-50 mb-1"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          )}
        </div>
        {/* Bottom row: model selector pills */}
        <div className="px-4 pb-3 pt-1 flex items-center gap-2 border-t border-[#F5F5F5]">
          {MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`h-7 px-3 rounded-full text-xs font-medium border cursor-pointer transition-colors ${
                selectedModel === model.id
                  ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                  : "bg-white text-[#737373] border-[#E5E5E5] hover:border-[#0A0A0A]"
              }`}
            >
              {model.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
