"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare, BarChart3, Zap, GraduationCap, Upload, Target, TrendingUp,
  Shield, FileText, Users, Search, ChevronRight, ChevronDown, BookOpen,
  LayoutDashboard, CheckSquare, Bell, Settings, CreditCard, HelpCircle,
  Sparkles, ArrowRight, Command, Layers,
} from "lucide-react";

interface Section {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  color: string;
  content: { title: string; description: string; command?: string; tip?: string }[];
}

var SECTIONS: Section[] = [
  {
    id: "chat",
    icon: MessageSquare,
    title: "Chat with Kairo",
    subtitle: "Your AI RevOps assistant — ask anything",
    color: "#6366F1",
    content: [
      { title: "Ask any RevOps question", description: "Kairo is a senior RevOps expert. Ask about pipeline management, forecasting, CRM hygiene, sales strategy, lead scoring, attribution models, or anything revenue operations related.", tip: "Works even without HubSpot connected — Kairo gives expert advice based on industry benchmarks." },
      { title: "Get rich visual reports", description: "Kairo responds with KPI cards, charts (bar, line, donut, funnel), tables, scorecards, and progress bars — not just text. Every analysis is visually structured." },
      { title: "Use slash commands", description: "Type / in the chat to see all available commands. Each command triggers a specialized analysis.", command: "/" },
      { title: "Upload files", description: "Attach CSV files for migration, data analysis, or bulk import. Kairo reads the file, maps the columns, and helps you act on it.", tip: "Click the + icon in the input bar to upload." },
      { title: "Switch AI models", description: "Click the model selector in the input bar. Kairo AI auto-picks the best model for your question. You can also use your own API keys for GPT or Gemini in Settings." },
    ],
  },
  {
    id: "commands",
    icon: Command,
    title: "Slash Commands",
    subtitle: "16 built-in commands for instant reports",
    color: "#F59E0B",
    content: [
      { title: "/pipeline", description: "Full pipeline review: value by stage, at-risk deals, coverage ratio, funnel conversion rates.", command: "/pipeline" },
      { title: "/forecast", description: "Revenue forecast with commit, best case, and upside scenarios. Pipeline coverage analysis.", command: "/forecast" },
      { title: "/coaching", description: "Per-rep performance analysis: win rate, velocity, strengths, weaknesses, and coaching actions.", command: "/coaching" },
      { title: "/deal [name]", description: "Deep-dive on a specific deal: MEDDPICC scoring, stakeholder map, activity history, risk assessment.", command: "/deal Acme Corp" },
      { title: "/report", description: "Full RevOps report with all KPIs, pipeline health, rep performance, data quality, and top 5 recommendations.", command: "/report", tip: "This triggers 4-5 agents working in parallel — the most comprehensive analysis." },
      { title: "/audit", description: "CRM health audit: missing fields, stale deals, data quality score, and a prioritized cleanup plan.", command: "/audit" },
      { title: "/cleanup", description: "Actionable cleanup plan with specific deals to close, fields to fill, and estimated time.", command: "/cleanup" },
      { title: "/score", description: "Score all leads/deals on 3 dimensions: ICP fit, engagement, and deal health. Composite score 0-100.", command: "/score", tip: "Kairo can write the scores back to HubSpot as custom properties." },
      { title: "/attribution", description: "Revenue attribution by channel: organic, paid, outbound, referral. 5 models available (first/last/linear/decay/U-shape).", command: "/attribution" },
      { title: "/compare", description: "Compare anything: reps, periods, segments, sources. Auto-detects what you're comparing.", command: "/compare Q1 vs Q2" },
      { title: "/outreach", description: "Lemlist campaign performance: open rates, reply rates, correlation with pipeline. Requires Lemlist connected.", command: "/outreach" },
      { title: "/icp", description: "Ideal Customer Profile based on your won deals: industries, company sizes, buyer personas, disqualifiers.", command: "/icp" },
      { title: "/tickets", description: "Support ticket analysis: volume, resolution time, SLA compliance, priority distribution.", command: "/tickets" },
      { title: "/brief [name]", description: "Meeting prep brief: deal context, stakeholders, risks, questions to ask, next steps.", command: "/brief Acme" },
      { title: "/learn [module]", description: "Interactive RevOps training with theory, quizzes, and exercises on your real data.", command: "/learn pipeline" },
      { title: "/migrate", description: "Guided CRM migration: CSV upload, field mapping, bulk import, association creation.", command: "/migrate" },
    ],
  },
  {
    id: "agents",
    icon: Layers,
    title: "AI Agents",
    subtitle: "14 specialized agents working for you",
    color: "#8B5CF6",
    content: [
      { title: "Standard Agents (auto-selected)", description: "Pipeline, Performance, Data Quality, Forecast, Outreach — these activate automatically based on your question. For /report, all 5 run in parallel." },
      { title: "Scoring & Attribution", description: "Lead Scorer scores contacts on ICP fit + engagement + deal health. Revenue Attribution analyzes which channels drive revenue." },
      { title: "Training Coach", description: "6 interactive modules: RevOps Fundamentals, Pipeline Management, Forecasting, CRM Hygiene, Sales Coaching, Marketing-Sales Alignment.", tip: "Works without HubSpot — theory and quizzes. With HubSpot — exercises on your real data." },
      { title: "Migration Pilot", description: "Guides you through importing data: CSV analysis, field mapping, custom property creation, batch import (100 at a time), association linking." },
      { title: "Premium Agents (downloadable deliverables)", description: "Architect (tracking plans), Email Designer (HTML templates), Playbook Writer (battle cards), Scoring Model (JSON config), Integration Builder (webhook/API code).", tip: "These use Opus for maximum quality and produce downloadable files." },
    ],
  },
  {
    id: "dashboards",
    icon: LayoutDashboard,
    title: "Dashboards",
    subtitle: "Pin and organize your reports",
    color: "#22C55E",
    content: [
      { title: "Create dashboards", description: "Go to Dashboards → New Dashboard. Name it (e.g. 'Weekly Pipeline Review') and start adding widgets." },
      { title: "Pin from chat", description: "After Kairo generates a chart, table, or KPI card — click the pin icon to save it to a dashboard. The widget updates when you refresh.", tip: "You can pin any visual block: charts, tables, scorecards, KPI grids." },
      { title: "Drag & resize widgets", description: "Dashboards support drag-and-drop and resize. Arrange your widgets however you want." },
      { title: "Export to PDF", description: "Click the export button on any dashboard to generate a PDF. Useful for sharing with stakeholders." },
    ],
  },
  {
    id: "actions",
    icon: CheckSquare,
    title: "Actions Board",
    subtitle: "Kanban board for your RevOps tasks",
    color: "#EC4899",
    content: [
      { title: "AI-generated actions", description: "When Kairo detects issues (stale deals, missing data, at-risk pipeline), it suggests actions. Click 'Add to Actions' and they appear on your board." },
      { title: "Manual actions", description: "Create your own tasks with title, priority (urgent/high/medium/low), domain (sales/marketing/service), and due date." },
      { title: "Drag between columns", description: "Three columns: To do → In progress → Done. Drag cards to update their status." },
      { title: "From Monitoring", description: "Alerts in Monitoring can be converted to actions with one click.", tip: "Use the 'Create Action' button on any alert." },
    ],
  },
  {
    id: "monitoring",
    icon: Bell,
    title: "Monitoring & Alerts",
    subtitle: "Daily CRM health checks",
    color: "#EF4444",
    content: [
      { title: "Automatic daily scan", description: "Kairo runs 12 alert rules every day: stalled deals, pipeline gaps, win rate drops, missing data, and more." },
      { title: "5 health dimensions", description: "Pipeline Health, Data Quality, Sales Activity, Deal Velocity, Forecast Accuracy — each scored 0-100 with trend arrows." },
      { title: "Severity levels", description: "Critical (red), Warning (orange), Info (blue). Critical alerts appear in the chat welcome screen." },
      { title: "Investigate with AI", description: "Click 'Investigate' on any alert to ask Kairo for a detailed analysis and action plan." },
    ],
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Training Center",
    subtitle: "Learn RevOps interactively",
    color: "#7C3AED",
    content: [
      { title: "6 modules", description: "RevOps Fundamentals, Pipeline Management, Forecasting, CRM Hygiene, Sales Coaching, Marketing-Sales Alignment." },
      { title: "Interactive learning", description: "Each module has 4 lessons: theory → real-data example → quiz → practical exercise. Kairo gives you a score /10." },
      { title: "Works without HubSpot", description: "Theory and quizzes work without data. With HubSpot connected, exercises use your real CRM data.", tip: "Type /learn pipeline in the chat to start immediately." },
      { title: "Track your progress", description: "The Training page shows your completion percentage per module." },
    ],
  },
  {
    id: "connectors",
    icon: Zap,
    title: "Connectors",
    subtitle: "Connect your tools",
    color: "#F97316",
    content: [
      { title: "HubSpot (OAuth)", description: "One-click connection. Kairo gets read + write access to deals, contacts, companies, pipeline, tickets, and engagements. Token auto-refreshes.", tip: "Go to Settings → Connectors → HubSpot → Connect" },
      { title: "Notion (API key)", description: "Create an internal integration at notion.so/my-integrations, share pages with it, paste the API key in Settings.", tip: "Kairo can search your Notion workspace and read databases." },
      { title: "Lemlist (API key)", description: "Find your API key in Lemlist → Settings → Integrations. Paste in Settings → Connectors.", tip: "Enables /outreach command for campaign analytics." },
      { title: "Without connectors", description: "Kairo still works as a RevOps expert: strategy, training, templates, benchmarks. Connect tools to unlock data-powered analysis." },
    ],
  },
  {
    id: "billing",
    icon: CreditCard,
    title: "Credits & Plans",
    subtitle: "How credits work",
    color: "#111",
    content: [
      { title: "Credit system", description: "Each chat message costs 1-5 credits depending on complexity. Simple questions: 1 credit (Haiku). Analysis: 2 credits (Sonnet). Deep reports: 5 credits (Opus)." },
      { title: "Free plan", description: "50 credits/month. Enough to explore Kairo and try the main features." },
      { title: "Pro plan — €49/month", description: "500 credits/month. Proactive alerts, all connectors, PDF export." },
      { title: "Business plan — €149/month", description: "2,000 credits/month. Priority support, unlimited users." },
      { title: "Credit packs", description: "Need more credits? Buy packs: 100 (€9), 500 (€39), or 1,000 (€69). Added instantly.", tip: "Go to Settings → Billing → Buy Credits" },
      { title: "Kairo auto-optimizer", description: "Kairo automatically picks the cheapest model that can handle your question. Simple lookups use Haiku (1 credit), complex analysis uses Sonnet (2), deep strategy uses Opus (5)." },
    ],
  },
];

function SectionCard({ section, isOpen, toggle }: { section: Section; isOpen: boolean; toggle: () => void }) {
  var Icon = section.icon;
  return (
    <div className="rounded-xl border border-[#EAEAEA] bg-white overflow-hidden">
      <button onClick={toggle} className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[#FAFAFA] transition-colors">
        <div className="h-9 w-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: section.color + "12" }}>
          <Icon size={17} style={{ color: section.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[14px] font-semibold text-[#111]">{section.title}</h3>
          <p className="text-[12px] text-[#999] mt-0.5">{section.subtitle}</p>
        </div>
        {isOpen ? <ChevronDown size={14} className="text-[#CCC]" /> : <ChevronRight size={14} className="text-[#CCC]" />}
      </button>

      {isOpen && (
        <div className="border-t border-[#F0F0F0] px-5 py-4 space-y-4">
          {section.content.map(function(item, i) {
            return (
              <div key={i} className="flex gap-3">
                <div className="h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-semibold" style={{ backgroundColor: section.color + "15", color: section.color }}>{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-medium text-[#111]">{item.title}</h4>
                  <p className="text-[12px] text-[#777] mt-0.5 leading-relaxed">{item.description}</p>
                  {item.command && (
                    <code className="inline-block mt-1.5 bg-[#F5F5F5] border border-[#EAEAEA] rounded px-2 py-0.5 text-[11px] text-[#555] font-mono">{item.command}</code>
                  )}
                  {item.tip && (
                    <p className="mt-1.5 text-[11px] text-[#999] flex items-start gap-1">
                      <Sparkles size={10} className="text-[#F59E0B] shrink-0 mt-0.5" />
                      {item.tip}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function GuidePage() {
  var router = useRouter();
  var [openSections, setOpenSections] = useState<Set<string>>(new Set(["chat"]));

  function toggle(id: string) {
    var next = new Set(openSections);
    if (next.has(id)) next.delete(id); else next.add(id);
    setOpenSections(next);
  }

  function expandAll() { setOpenSections(new Set(SECTIONS.map(function(s) { return s.id; }))); }
  function collapseAll() { setOpenSections(new Set()); }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-[#111] flex items-center justify-center">
            <HelpCircle size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#111]">Guide</h1>
            <p className="text-[13px] text-[#999]">Everything you can do with Kairo</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex items-center gap-2 mb-6">
        <button onClick={expandAll} className="text-[11px] text-[#6366F1] hover:text-[#4F46E5] font-medium">Expand all</button>
        <span className="text-[#DDD]">·</span>
        <button onClick={collapseAll} className="text-[11px] text-[#999] hover:text-[#555] font-medium">Collapse all</button>
        <div className="flex-1" />
        <button onClick={function() { router.push("/chat"); }} className="h-8 px-3 rounded-lg bg-[#111] text-white text-[12px] font-medium flex items-center gap-1.5 hover:bg-[#333] transition-colors">
          <MessageSquare size={12} /> Go to Chat <ArrowRight size={10} />
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-2">
        {SECTIONS.map(function(section) {
          return (
            <SectionCard
              key={section.id}
              section={section}
              isOpen={openSections.has(section.id)}
              toggle={function() { toggle(section.id); }}
            />
          );
        })}
      </div>

      {/* Footer tip */}
      <div className="mt-6 rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] px-5 py-4">
        <p className="text-[12px] text-[#999]">
          <span className="font-medium text-[#555]">Still stuck?</span> Just ask Kairo in the chat — type your question naturally and the AI will figure out the best way to help. No special syntax needed.
        </p>
      </div>
    </div>
  );
}
