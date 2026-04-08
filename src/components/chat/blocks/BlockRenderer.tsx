"use client";

import type { ContentBlock } from "@/types/chat-blocks";
import TextBlock from "./TextBlock";
import KPICardBlock from "./KPICardBlock";
import ChartBlock from "./ChartBlock";
import TableBlock from "./TableBlock";
import ReportSlides from "./ReportSlides";
import ProgressBlock from "./ProgressBlock";
import FunnelBlock from "./FunnelBlock";
import ComparisonBlock from "./ComparisonBlock";
import ScorecardBlock from "./ScorecardBlock";
import AddToDashboard from "../AddToDashboard";
import { useState, useRef, useEffect } from "react";
import { Mail, Copy, Check, ChevronDown, ChevronUp, Code, HelpCircle, X, AlertTriangle, Loader2, CheckCircle2, XCircle } from "lucide-react";

// Click handler injected via window event so MessageThread can listen and re-send
function emitClick(message: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("kairo-suggestion-click", { detail: { message } }));
  }
}

function ClarificationBlock({ question, options, allowCustom }: { question: string; options: Array<{ label: string; value: string; description?: string }>; allowCustom?: boolean }) {
  var [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="rounded-xl border border-[#EAEAEA] bg-white overflow-hidden">
      <div className="px-4 py-2.5 bg-[#FAFAFA] border-b border-[#F0F0F0] flex items-center gap-2">
        <HelpCircle size={14} className="text-[#6366F1]" />
        <span className="text-[12px] font-semibold text-[#111]">Clarification needed</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-[13px] text-[#111] mb-3">{question}</p>
        <div className="space-y-1.5">
          {options.map(function(opt, i) {
            var isSelected = selected === opt.value;
            return (
              <button
                key={i}
                onClick={function() { setSelected(opt.value); emitClick(opt.value); }}
                disabled={selected !== null}
                className={"w-full text-left px-3 py-2 rounded-lg border transition-all " + (isSelected ? "border-[#6366F1] bg-[#EEF2FF]" : selected ? "border-[#F0F0F0] bg-[#FAFAFA] opacity-50 cursor-not-allowed" : "border-[#EAEAEA] hover:border-[#6366F1] hover:bg-[#FAFAFA]")}
              >
                <div className="flex items-center gap-2">
                  <div className={"h-3.5 w-3.5 rounded-full border-2 shrink-0 " + (isSelected ? "border-[#6366F1] bg-[#6366F1]" : "border-[#CCC]")}>
                    {isSelected && <div className="h-1 w-1 rounded-full bg-white m-auto mt-[3px]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-[#111]">{opt.label}</p>
                    {opt.description && <p className="text-[10px] text-[#999] mt-0.5">{opt.description}</p>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {allowCustom && !selected && (
          <p className="text-[10px] text-[#BBB] mt-2 text-center">Or type your own answer below</p>
        )}
      </div>
    </div>
  );
}

function ConfirmationBlock({ action, details, confirmText, cancelText, severity }: { action: string; details?: string; confirmText?: string; cancelText?: string; severity?: "info" | "warning" | "danger" }) {
  var [response, setResponse] = useState<"confirm" | "cancel" | null>(null);
  var sevColor = severity === "danger" ? "#EF4444" : severity === "warning" ? "#F59E0B" : "#6366F1";
  var sevBg = severity === "danger" ? "#FEF2F2" : severity === "warning" ? "#FFFBEB" : "#EEF2FF";
  return (
    <div className="rounded-xl border-2 overflow-hidden" style={{ borderColor: sevColor + "40", backgroundColor: sevBg }}>
      <div className="px-4 py-3 flex items-start gap-3">
        <AlertTriangle size={16} className="shrink-0 mt-0.5" style={{ color: sevColor }} />
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#111]">{action}</p>
          {details && <p className="text-[12px] text-[#555] mt-1 leading-relaxed">{details}</p>}
        </div>
      </div>
      <div className="px-4 pb-3 flex items-center gap-2 justify-end">
        <button
          onClick={function() { setResponse("cancel"); emitClick("Non, annule"); }}
          disabled={response !== null}
          className={"h-8 px-3 rounded-lg text-[12px] font-medium border transition-colors " + (response === "cancel" ? "bg-[#F5F5F5] border-[#EAEAEA] text-[#999]" : "bg-white border-[#EAEAEA] text-[#555] hover:border-[#CCC] disabled:opacity-50")}
        >
          {cancelText || "Cancel"}
        </button>
        <button
          onClick={function() { setResponse("confirm"); emitClick("Oui, confirme et execute"); }}
          disabled={response !== null}
          className={"h-8 px-3 rounded-lg text-[12px] font-semibold text-white transition-colors disabled:opacity-50"}
          style={{ backgroundColor: response === "confirm" ? "#22C55E" : sevColor }}
        >
          {response === "confirm" ? "✓ Confirmed" : (confirmText || "Confirm & Execute")}
        </button>
      </div>
    </div>
  );
}

function ActionResultBlock({ status, action, details }: { status: "success" | "error" | "pending"; action: string; details?: string }) {
  var Icon = status === "success" ? CheckCircle2 : status === "error" ? XCircle : Loader2;
  var color = status === "success" ? "#22C55E" : status === "error" ? "#EF4444" : "#6366F1";
  var bg = status === "success" ? "#F0FDF4" : status === "error" ? "#FEF2F2" : "#EEF2FF";
  return (
    <div className="rounded-lg border px-3 py-2 flex items-start gap-2.5" style={{ backgroundColor: bg, borderColor: color + "30" }}>
      <Icon size={14} className={status === "pending" ? "animate-spin" : ""} style={{ color: color }} />
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium" style={{ color: color }}>{action}</p>
        {details && <p className="text-[11px] text-[#555] mt-0.5">{details}</p>}
      </div>
    </div>
  );
}

function EmailPreviewBlock({ title, subject, html }: { title: string; subject?: string; html: string }) {
  var [showCode, setShowCode] = useState(false);
  var [copied, setCopied] = useState(false);
  var [collapsed, setCollapsed] = useState(false);
  var iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(function() {
    if (iframeRef.current) {
      var doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write('<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,sans-serif;}</style></head><body>' + html + '</body></html>');
        doc.close();
        // Auto-resize iframe to content height
        setTimeout(function() {
          if (iframeRef.current && iframeRef.current.contentDocument) {
            var h = iframeRef.current.contentDocument.body.scrollHeight;
            iframeRef.current.style.height = Math.min(h + 20, 600) + "px";
          }
        }, 100);
      }
    }
  }, [html, collapsed]);

  function copyHtml() {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(function() { setCopied(false); }, 2000);
  }

  return (
    <div className="rounded-xl border border-[#EAEAEA] bg-white overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#FAFAFA] border-b border-[#F0F0F0]">
        <div className="flex items-center gap-2 min-w-0">
          <Mail size={14} className="text-[#6366F1] shrink-0" />
          <span className="text-[13px] font-semibold text-[#111] truncate">{title}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button onClick={function() { setShowCode(!showCode); }} className={"h-7 px-2 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors " + (showCode ? "bg-[#111] text-white" : "text-[#999] hover:text-[#111] hover:bg-[#F0F0F0]")}>
            <Code size={11} /> {showCode ? "Preview" : "HTML"}
          </button>
          <button onClick={copyHtml} className="h-7 px-2 rounded-md text-[11px] font-medium text-[#999] hover:text-[#111] hover:bg-[#F0F0F0] flex items-center gap-1 transition-colors">
            {copied ? <><Check size={11} className="text-[#22C55E]" /> Copied</> : <><Copy size={11} /> Copy HTML</>}
          </button>
          <button onClick={function() { setCollapsed(!collapsed); }} className="h-7 w-7 rounded-md text-[#CCC] hover:text-[#111] hover:bg-[#F0F0F0] flex items-center justify-center transition-colors">
            {collapsed ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          </button>
        </div>
      </div>

      {/* Subject line */}
      {subject && !collapsed && (
        <div className="px-4 py-2 border-b border-[#F5F5F5] bg-[#FEFEFE]">
          <span className="text-[10px] uppercase tracking-wider text-[#BBB] font-semibold">Subject: </span>
          <span className="text-[12px] text-[#555]">{subject}</span>
        </div>
      )}

      {/* Content */}
      {!collapsed && (
        showCode ? (
          <div className="p-4 bg-[#1E1E1E] overflow-x-auto">
            <pre className="text-[11px] text-[#D4D4D4] font-mono whitespace-pre-wrap break-all leading-relaxed">{html}</pre>
          </div>
        ) : (
          <div className="bg-[#F5F5F5] p-4">
            <div className="max-w-[600px] mx-auto bg-white rounded-lg shadow-sm overflow-hidden border border-[#EAEAEA]">
              <iframe
                ref={iframeRef}
                sandbox="allow-same-origin"
                className="w-full border-0"
                style={{ height: "300px", minHeight: "200px" }}
                title={title}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}

function BlockWrapper({ block, children }: { block: ContentBlock; children: React.ReactNode }) {
  if (block.type === "text" || block.type === "alert" || block.type === "report" || block.type === "clarification" || block.type === "confirmation" || block.type === "action_result") {
    return <>{children}</>;
  }

  return (
    <div className="group/block relative">
      {children}
      <div className="absolute top-2 right-2 opacity-0 group-hover/block:opacity-100 transition-opacity flex items-center gap-0.5">
        <AddToDashboard
          block={block}
          blockTitle={
            block.type === "chart" ? block.title :
            block.type === "table" ? block.title :
            block.type === "kpi" ? block.label :
            block.type === "kpi_grid" ? "KPI Grid" :
            block.type === "funnel" ? block.title :
            block.type === "comparison" ? block.title :
            block.type === "scorecard" ? block.title :
            block.type === "progress" ? block.label :
            "Widget"
          }
        />
      </div>
    </div>
  );
}

export default function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map(function(block, i) {
        var content: React.ReactNode = null;

        switch (block.type) {
          case "text":
            content = <TextBlock text={block.text} />;
            break;
          case "kpi":
            content = <KPICardBlock label={block.label} value={block.value} change={block.change} trend={block.trend} />;
            break;
          case "kpi_grid":
            content = block.items && block.items.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {block.items.map(function(item, j) {
                  return <KPICardBlock key={j} label={item.label} value={item.value} change={item.change} trend={item.trend} />;
                })}
              </div>
            ) : null;
            break;
          case "chart":
            content = <ChartBlock chartType={block.chartType} title={block.title} data={block.data} xKey={block.xKey} yKey={block.yKey} yKeys={block.yKeys} colors={block.colors} />;
            break;
          case "table":
            content = <TableBlock title={block.title} headers={block.headers} rows={block.rows} sortable={block.sortable} searchable={block.searchable} pageSize={block.pageSize} />;
            break;
          case "report":
            content = block.sections ? <ReportSlides title={block.title} sections={block.sections} /> : null;
            break;
          case "alert":
            content = (
              <div className={"rounded-lg px-4 py-3 text-sm flex items-start gap-2 " + (
                block.severity === "critical"
                  ? "bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]"
                  : block.severity === "warning"
                  ? "bg-[#FFFBEB] text-[#F59E0B] border border-[#FDE68A]"
                  : "bg-[#F0FDF4] text-[#22C55E] border border-[#BBF7D0]"
              )}>
                <span className="shrink-0 mt-0.5">{block.severity === "critical" ? "🔴" : block.severity === "warning" ? "🟡" : "🟢"}</span>
                <span>{block.message}</span>
              </div>
            );
            break;
          case "progress":
            content = <ProgressBlock label={block.label} value={block.value} max={block.max} target={block.target} color={block.color} />;
            break;
          case "funnel":
            content = <FunnelBlock title={block.title} steps={block.steps} />;
            break;
          case "comparison":
            content = <ComparisonBlock title={block.title} items={block.items} />;
            break;
          case "scorecard":
            content = <ScorecardBlock title={block.title} value={block.value} target={block.target} score={block.score} breakdown={block.breakdown} />;
            break;
          case "email_preview":
            content = <EmailPreviewBlock title={block.title} subject={block.subject} html={block.html} />;
            break;
          case "clarification":
            content = <ClarificationBlock question={block.question} options={block.options} allowCustom={block.allowCustom} />;
            break;
          case "confirmation":
            content = <ConfirmationBlock action={block.action} details={block.details} confirmText={block.confirmText} cancelText={block.cancelText} severity={block.severity} />;
            break;
          case "action_result":
            content = <ActionResultBlock status={block.status} action={block.action} details={block.details} />;
            break;
          default:
            return null;
        }

        return (
          <BlockWrapper key={i} block={block}>
            {content}
          </BlockWrapper>
        );
      })}
    </div>
  );
}
