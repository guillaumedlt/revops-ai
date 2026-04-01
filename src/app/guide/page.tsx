"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare, BarChart3, Zap, GraduationCap, Upload, Target, TrendingUp,
  Shield, FileText, Users, Search, ChevronRight, BookOpen,
  LayoutDashboard, CheckSquare, Bell, Settings, CreditCard, HelpCircle,
  Sparkles, ArrowRight, Command, Layers, ExternalLink,
} from "lucide-react";

interface GuideItem { title: string; description: string; command?: string; tip?: string }

interface Section {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  color: string;
  content: GuideItem[];
}

var CATEGORIES = [
  {
    label: "Getting Started",
    sections: [
      {
        id: "overview",
        icon: Sparkles,
        title: "What is Kairo?",
        subtitle: "Your AI RevOps assistant",
        color: "#111",
        content: [
          { title: "AI-powered RevOps", description: "Kairo is a senior RevOps expert that connects to your CRM and tools. Ask questions in natural language and get instant analysis with charts, KPIs, and recommendations." },
          { title: "Works without connectors", description: "Even without HubSpot, Kairo answers any RevOps question: strategy, frameworks, templates, benchmarks, training. Connect your tools to unlock data-powered analysis." },
          { title: "Multi-agent system", description: "14 specialized AI agents handle different domains: pipeline analysis, forecasting, coaching, scoring, attribution, training, migration, and more. They activate automatically or via slash commands." },
          { title: "Credits system", description: "Each message costs 1-5 credits. Kairo auto-picks the cheapest model that can handle your question. Simple lookups: 1 credit. Analysis: 2. Deep reports: 5." },
        ],
      },
      {
        id: "quickstart",
        icon: ArrowRight,
        title: "Quick Start",
        subtitle: "Get productive in 2 minutes",
        color: "#22C55E",
        content: [
          { title: "1. Try the chat", description: "Go to Chat and ask anything: 'What's a good pipeline coverage ratio?' or 'Write me a cold email for SaaS prospects'. Kairo responds immediately.", command: "What's a good pipeline coverage ratio for B2B SaaS?" },
          { title: "2. Connect HubSpot", description: "Go to Settings → Connectors → HubSpot → Connect. One-click OAuth. Once connected, Kairo can analyze your real CRM data.", tip: "You need admin access to your HubSpot portal." },
          { title: "3. Run your first report", description: "Type /report in the chat. Kairo triggers 5 agents in parallel that analyze your pipeline, performance, data quality, forecast, and outreach.", command: "/report" },
          { title: "4. Pin to dashboard", description: "When Kairo shows a chart or KPI, click the pin icon to save it to a dashboard. Build your custom RevOps cockpit." },
          { title: "5. Set up alerts", description: "Go to Monitoring. Kairo runs daily checks on your CRM and flags issues: stalled deals, low pipeline, missing data. No setup needed — it's automatic." },
        ],
      },
    ],
  },
  {
    label: "Chat & AI",
    sections: [
      {
        id: "chat",
        icon: MessageSquare,
        title: "Chat Interface",
        subtitle: "How to get the most from Kairo",
        color: "#6366F1",
        content: [
          { title: "Ask naturally", description: "No special syntax needed. 'How's my pipeline?' works just as well as /pipeline. Kairo understands context and picks the right tools." },
          { title: "Rich visual responses", description: "Kairo responds with KPI cards, charts (bar, line, donut, funnel, area, stacked, horizontal), tables, scorecards, progress bars, and comparisons — not just text." },
          { title: "Upload files", description: "Click the + icon to attach CSV files. Kairo reads columns, suggests mappings, and can import data to HubSpot.", tip: "Supports CSV, images (screenshots for context)." },
          { title: "Switch AI models", description: "Click the model pill in the input bar. 'Kairo AI' auto-picks the best model. You can also use your own GPT or Gemini keys in Settings." },
          { title: "Conversation history", description: "All conversations are saved in the sidebar, grouped by date. Click any conversation to continue it." },
          { title: "Pin to dashboard", description: "After a visual block appears, click the pin icon to save it as a widget on a dashboard." },
        ],
      },
      {
        id: "commands",
        icon: Command,
        title: "Slash Commands",
        subtitle: "16 instant commands",
        color: "#F59E0B",
        content: [
          { title: "/pipeline", description: "Pipeline value by stage, at-risk deals, coverage ratio, funnel conversion.", command: "/pipeline" },
          { title: "/forecast", description: "Revenue forecast: commit, best case, upside. Pipeline coverage analysis.", command: "/forecast" },
          { title: "/coaching", description: "Per-rep analysis: win rate, velocity, strengths, weaknesses, coaching actions.", command: "/coaching" },
          { title: "/deal [name]", description: "Deep-dive: MEDDPICC scoring, stakeholders, activity history, risks.", command: "/deal Acme Corp" },
          { title: "/report", description: "Full RevOps report — triggers 5 agents in parallel. The most comprehensive analysis.", command: "/report" },
          { title: "/audit", description: "CRM health: missing fields, stale deals, data quality score, cleanup plan.", command: "/audit" },
          { title: "/cleanup", description: "Actionable cleanup: deals to close, fields to fill, estimated time.", command: "/cleanup" },
          { title: "/score", description: "Score leads/deals: ICP fit + engagement + deal health. Composite 0-100.", command: "/score", tip: "Can write scores back to HubSpot as custom properties." },
          { title: "/attribution", description: "Revenue by channel with 5 models: first/last/linear/decay/position-based.", command: "/attribution" },
          { title: "/compare [A vs B]", description: "Compare reps, periods, segments, sources. Auto-detects what to compare.", command: "/compare Q1 vs Q2" },
          { title: "/outreach", description: "Lemlist campaign stats: open/reply rates, pipeline correlation.", command: "/outreach" },
          { title: "/icp", description: "Ideal Customer Profile from won deals: industries, sizes, personas.", command: "/icp" },
          { title: "/tickets", description: "Support ticket analysis: volume, SLA, resolution time, priority.", command: "/tickets" },
          { title: "/brief [name]", description: "Meeting prep: deal context, stakeholders, risks, questions to ask.", command: "/brief Acme" },
          { title: "/learn [module]", description: "Interactive RevOps training: theory, quiz, exercises on real data.", command: "/learn pipeline" },
          { title: "/migrate", description: "CRM migration: CSV upload, field mapping, batch import.", command: "/migrate" },
        ],
      },
      {
        id: "agents",
        icon: Layers,
        title: "AI Agents",
        subtitle: "14 specialized agents",
        color: "#8B5CF6",
        content: [
          { title: "Auto-selected agents", description: "Kairo picks the right agents based on your question. You don't need to choose manually." },
          { title: "Standard (5)", description: "Pipeline, Performance, Data Quality, Forecast, Outreach. For /report, all 5 run in parallel and each produces its section." },
          { title: "Scoring & Attribution (2)", description: "Lead Scorer: ICP fit + engagement + deal health → composite 0-100. Revenue Attribution: which channels drive revenue." },
          { title: "Training Coach", description: "6 modules with interactive lessons. Works without HubSpot (theory + quiz). With HubSpot: exercises on your real data." },
          { title: "Migration Pilot", description: "Step-by-step CRM migration: analyze CSV → map fields → create properties → batch import → verify." },
          { title: "Premium (5)", description: "Architect (tracking plans), Email Designer (HTML templates), Playbook Writer (battle cards), Scoring Model (JSON), Integration Builder (API code). Produce downloadable deliverables.", tip: "Premium agents use Opus for maximum quality." },
        ],
      },
    ],
  },
  {
    label: "Features",
    sections: [
      {
        id: "dashboards",
        icon: LayoutDashboard,
        title: "Dashboards",
        subtitle: "Pin and organize reports",
        color: "#22C55E",
        content: [
          { title: "Create a dashboard", description: "Go to Dashboards → click 'Create Dashboard'. Name it (e.g. 'Weekly Pipeline Review')." },
          { title: "Pin widgets from chat", description: "After Kairo generates a chart, table, or KPI — click the pin icon. Choose which dashboard to save it to.", tip: "Any visual block can be pinned: charts, tables, scorecards, KPI grids, funnels." },
          { title: "Drag & resize", description: "Widgets support drag-and-drop repositioning and resize handles." },
          { title: "Export PDF", description: "Click export on any dashboard to generate a PDF for stakeholders." },
          { title: "Delete dashboards", description: "Click the trash icon on a dashboard card to delete it and all its widgets." },
        ],
      },
      {
        id: "actions",
        icon: CheckSquare,
        title: "Actions Board",
        subtitle: "Your RevOps task board",
        color: "#EC4899",
        content: [
          { title: "AI-generated actions", description: "When Kairo finds issues (stalled deals, missing data), it suggests actions. Click 'Add to Actions' to create a task." },
          { title: "Manual actions", description: "Click + to create tasks: title, priority (urgent/high/medium/low), domain (sales/marketing/service), due date." },
          { title: "Kanban board", description: "Three columns: To do → In progress → Done. Drag cards between columns to update status." },
          { title: "From monitoring", description: "Any alert in Monitoring can be converted to an action with one click." },
        ],
      },
      {
        id: "monitoring",
        icon: Bell,
        title: "Monitoring & Alerts",
        subtitle: "Automatic CRM health checks",
        color: "#EF4444",
        content: [
          { title: "Daily automatic scan", description: "Kairo runs 12 alert rules every day on your CRM: stalled deals, pipeline gaps, win rate drops, missing data, and more." },
          { title: "5 health dimensions", description: "Pipeline Health, Data Quality, Sales Activity, Deal Velocity, Forecast Accuracy — each scored 0-100." },
          { title: "Severity levels", description: "Critical (red pulse), Warning (orange), Info (blue). Critical alerts show on the chat welcome screen." },
          { title: "Investigate", description: "Click 'Investigate' on any alert → opens a chat with Kairo pre-filled to analyze that specific issue." },
        ],
      },
      {
        id: "training",
        icon: GraduationCap,
        title: "Training Center",
        subtitle: "Learn RevOps interactively",
        color: "#7C3AED",
        content: [
          { title: "6 learning modules", description: "RevOps Fundamentals, Pipeline Management, Forecasting, CRM Hygiene, Sales Coaching, Marketing-Sales Alignment." },
          { title: "Interactive format", description: "Each lesson: concept explanation → real-data example → quiz (2-3 questions) → practical exercise. Score /10 at the end." },
          { title: "With or without HubSpot", description: "Theory and quizzes always work. With HubSpot, exercises use your real CRM data for hands-on learning." },
          { title: "From chat", description: "Type /learn pipeline to start a training session directly in the chat. Say 'next' for the next lesson, 'quiz' for assessment.", command: "/learn pipeline" },
        ],
      },
    ],
  },
  {
    label: "Setup",
    sections: [
      {
        id: "connectors",
        icon: Zap,
        title: "Connectors",
        subtitle: "Connect your tools",
        color: "#F97316",
        content: [
          { title: "HubSpot", description: "Settings → Connectors → HubSpot → Connect. OAuth one-click. Gives Kairo read + write access to deals, contacts, companies, pipeline, tickets.", tip: "Token auto-refreshes. You need admin access to your HubSpot portal." },
          { title: "Notion", description: "Create an integration at notion.so/my-integrations. Share the pages you want with the integration. Paste the API key in Settings.", tip: "Kairo can search pages and read databases in your workspace." },
          { title: "Lemlist", description: "Lemlist → Settings → Integrations → copy API key. Paste in Settings → Connectors.", tip: "Enables /outreach for campaign analytics." },
          { title: "Without connectors", description: "Kairo works as a RevOps expert: strategy, training, templates, benchmarks, email drafting. Connect tools to unlock data analysis." },
        ],
      },
      {
        id: "billing",
        icon: CreditCard,
        title: "Credits & Plans",
        subtitle: "Pricing and credit system",
        color: "#111",
        content: [
          { title: "How credits work", description: "Each chat message costs 1-5 credits depending on complexity. Kairo auto-picks the cheapest model for your question." },
          { title: "Cost per model", description: "Haiku (simple lookups): 1 credit. Sonnet (analysis): 2 credits. Opus (deep reports, strategy): 5 credits." },
          { title: "Free plan", description: "50 credits/month. Explore Kairo and try the main features." },
          { title: "Pro — €49/month", description: "500 credits/month. Proactive alerts, all connectors, PDF export." },
          { title: "Business — €149/month", description: "2,000 credits/month. Priority support, unlimited users." },
          { title: "Credit packs", description: "Buy extra credits anytime: 100 (€9), 500 (€39), 1,000 (€69). Added instantly to your balance.", tip: "Settings → Billing → Buy Credits" },
        ],
      },
    ],
  },
];

export default function GuidePage() {
  var router = useRouter();
  var [activeSection, setActiveSection] = useState("overview");
  var contentRef = useRef<HTMLDivElement>(null);

  var allSections = CATEGORIES.flatMap(function(c) { return c.sections; });
  var current = allSections.find(function(s) { return s.id === activeSection; }) || allSections[0];
  var Icon = current.icon;

  function scrollToTop() {
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="flex h-full">
      {/* Left nav menu */}
      <div className="w-56 shrink-0 border-r border-[#EAEAEA] bg-[#FAFAFA] overflow-y-auto">
        <div className="px-4 pt-6 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle size={16} className="text-[#111]" />
            <h2 className="text-[14px] font-bold text-[#111]">Guide</h2>
          </div>
        </div>

        <nav className="px-2 pb-6">
          {CATEGORIES.map(function(cat) {
            return (
              <div key={cat.label} className="mb-3">
                <p className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-[#BBB] font-semibold">{cat.label}</p>
                {cat.sections.map(function(section) {
                  var SIcon = section.icon;
                  var isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={function() { setActiveSection(section.id); scrollToTop(); }}
                      className={"w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors " + (isActive ? "bg-white border border-[#EAEAEA] shadow-sm" : "hover:bg-white/60")}
                    >
                      <SIcon size={13} style={{ color: isActive ? section.color : "#BBB" }} className="shrink-0" />
                      <span className={"text-[12px] truncate " + (isActive ? "text-[#111] font-medium" : "text-[#777]")}>{section.title}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Right content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-8">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: current.color + "12" }}>
              <Icon size={20} style={{ color: current.color }} />
            </div>
            <div>
              <h1 className="text-[18px] font-bold text-[#111]">{current.title}</h1>
              <p className="text-[13px] text-[#999]">{current.subtitle}</p>
            </div>
            <div className="flex-1" />
            <button onClick={function() { router.push("/chat"); }} className="h-8 px-3 rounded-lg bg-[#111] text-white text-[11px] font-medium flex items-center gap-1.5 hover:bg-[#333] transition-colors">
              Open Chat <ArrowRight size={10} />
            </button>
          </div>

          {/* Content items */}
          <div className="space-y-5">
            {current.content.map(function(item, i) {
              return (
                <div key={i} className="flex gap-4">
                  <div className="h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold" style={{ backgroundColor: current.color + "12", color: current.color }}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-semibold text-[#111] mb-1">{item.title}</h3>
                    <p className="text-[13px] text-[#666] leading-relaxed">{item.description}</p>
                    {item.command && (
                      <button
                        onClick={function() { router.push("/chat?prompt=" + encodeURIComponent(item.command!)); }}
                        className="inline-flex items-center gap-1.5 mt-2 bg-[#F5F5F5] hover:bg-[#EAEAEA] border border-[#EAEAEA] rounded-md px-2.5 py-1 text-[11px] text-[#555] font-mono transition-colors"
                      >
                        {item.command} <ExternalLink size={9} className="text-[#BBB]" />
                      </button>
                    )}
                    {item.tip && (
                      <div className="mt-2 flex items-start gap-1.5 bg-[#FFFBEB] border border-[#FEF3C7] rounded-md px-2.5 py-1.5">
                        <Sparkles size={11} className="text-[#F59E0B] shrink-0 mt-0.5" />
                        <p className="text-[11px] text-[#92400E] leading-relaxed">{item.tip}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation between sections */}
          <div className="mt-10 pt-6 border-t border-[#EAEAEA] flex items-center justify-between">
            {(function() {
              var idx = allSections.findIndex(function(s) { return s.id === activeSection; });
              var prev = idx > 0 ? allSections[idx - 1] : null;
              var next = idx < allSections.length - 1 ? allSections[idx + 1] : null;
              return (
                <>
                  {prev ? (
                    <button onClick={function() { setActiveSection(prev!.id); scrollToTop(); }} className="flex items-center gap-2 text-[12px] text-[#999] hover:text-[#111] transition-colors">
                      <ChevronRight size={12} className="rotate-180" /> {prev.title}
                    </button>
                  ) : <div />}
                  {next ? (
                    <button onClick={function() { setActiveSection(next!.id); scrollToTop(); }} className="flex items-center gap-2 text-[12px] text-[#999] hover:text-[#111] transition-colors">
                      {next.title} <ChevronRight size={12} />
                    </button>
                  ) : <div />}
                </>
              );
            })()}
          </div>

          {/* Footer */}
          <div className="mt-6 rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] px-5 py-4">
            <p className="text-[12px] text-[#999]">
              <span className="font-medium text-[#555]">Still stuck?</span> Just ask Kairo in the chat — type your question naturally and the AI will figure out the best way to help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
