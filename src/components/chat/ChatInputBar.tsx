"use client";

import { useState, useRef, useEffect } from "react";
import {
  Plus,
  SlidersHorizontal,
  Lightbulb,
  Mic,
  ArrowUp,
} from "lucide-react";

interface ChatInputBarProps {
  onSend: (message: string, model: string) => void;
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

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
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
        setShowModelPicker(false);
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

  const currentModel = MODELS.find((m) => m.id === selectedModel) ?? MODELS[0];

  return (
    <div className="mx-auto max-w-2xl w-full px-4 pb-4">
      <div className="border border-[#E5E5E5] rounded-2xl bg-white shadow-sm focus-within:ring-1 focus-within:ring-[#D4D4D4] transition-shadow">
        {/* Textarea row */}
        <div className="px-4 pt-3 pb-1">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Ask RevOps AI..."
            rows={1}
            className="w-full resize-none bg-transparent text-sm text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none min-h-[36px] max-h-[200px] py-1"
          />
        </div>

        {/* Icon row */}
        <div className="px-3 pb-2.5 flex items-center justify-between">
          {/* Left icons */}
          <div className="flex items-center gap-0.5">
            <button
              className="h-8 w-8 rounded-lg flex items-center justify-center text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#525252] transition-colors"
              title="Attach file"
            >
              <Plus size={18} />
            </button>
            <button
              className="h-8 w-8 rounded-lg flex items-center justify-center text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#525252] transition-colors"
              title="Filters"
            >
              <SlidersHorizontal size={16} />
            </button>
            <button
              className="h-8 w-8 rounded-lg flex items-center justify-center text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#525252] transition-colors"
              title="Suggestions"
            >
              <Lightbulb size={16} />
            </button>

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
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#F5F5F5] transition-colors ${
                        selectedModel === model.id
                          ? "text-[#0A0A0A] font-medium"
                          : "text-[#525252]"
                      }`}
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
            <button
              className="h-8 w-8 rounded-lg flex items-center justify-center text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#525252] transition-colors"
              title="Voice input"
            >
              <Mic size={16} />
            </button>
            {value.trim() ? (
              <button
                onClick={handleSend}
                disabled={disabled}
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
  );
}
