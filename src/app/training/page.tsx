"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, BookOpen, BarChart3, Target, Database, Users, Megaphone, ChevronRight, Clock, Star, Lock } from "lucide-react";

var MODULES = [
  {
    id: "fundamentals",
    title: "RevOps Fundamentals",
    description: "What is RevOps, the revenue funnel, key metrics, and how to align sales-marketing-CS.",
    icon: BookOpen,
    color: "#6366F1",
    difficulty: "Beginner",
    lessons: 4,
    duration: "20 min",
    topics: ["What is RevOps?", "The Revenue Funnel", "Key Metrics to Track", "Quiz & Assessment"],
    prompt: "/learn fundamentals",
  },
  {
    id: "pipeline",
    title: "Pipeline Management",
    description: "Pipeline coverage ratio, sales velocity formula, deal health scoring, and funnel optimization.",
    icon: BarChart3,
    color: "#F59E0B",
    difficulty: "Intermediate",
    lessons: 4,
    duration: "30 min",
    topics: ["Pipeline Coverage", "Sales Velocity Formula", "Deal Health Scoring", "Exercise: Analyze YOUR Pipeline"],
    prompt: "/learn pipeline",
  },
  {
    id: "forecasting",
    title: "Forecasting",
    description: "Commit vs best case vs upside, weighted pipeline, forecast accuracy, and revenue projections.",
    icon: Target,
    color: "#EF4444",
    difficulty: "Intermediate",
    lessons: 4,
    duration: "25 min",
    topics: ["Commit / Best Case / Upside", "Weighted Pipeline", "Forecast Accuracy", "Exercise: Build YOUR Forecast"],
    prompt: "/learn forecasting",
  },
  {
    id: "hygiene",
    title: "CRM Hygiene",
    description: "Data quality rules, MEDDPICC framework, deal stage definitions, and mandatory fields.",
    icon: Database,
    color: "#22C55E",
    difficulty: "Beginner",
    lessons: 4,
    duration: "20 min",
    topics: ["Data Quality Rules", "MEDDPICC Framework", "Deal Stage Definitions", "Exercise: Audit YOUR CRM"],
    prompt: "/learn hygiene",
  },
  {
    id: "coaching",
    title: "Sales Coaching",
    description: "Rep performance analysis, coaching conversations, territory planning, and team management.",
    icon: Users,
    color: "#EC4899",
    difficulty: "Advanced",
    lessons: 4,
    duration: "35 min",
    topics: ["Rep Performance Analysis", "Coaching Conversations", "Territory Planning", "Exercise: Coach YOUR Reps"],
    prompt: "/learn coaching",
  },
  {
    id: "alignment",
    title: "Marketing-Sales Alignment",
    description: "Lead scoring models, attribution, SLA between marketing and sales, and funnel handoff.",
    icon: Megaphone,
    color: "#8B5CF6",
    difficulty: "Advanced",
    lessons: 4,
    duration: "30 min",
    topics: ["Lead Scoring", "Attribution Models", "SLA Marketing-Sales", "Exercise: Analyze YOUR Funnel"],
    prompt: "/learn alignment",
  },
];

var DIFFICULTY_COLORS: Record<string, string> = {
  "Beginner": "bg-[#ECFDF5] text-[#059669]",
  "Intermediate": "bg-[#FFF7ED] text-[#EA580C]",
  "Advanced": "bg-[#FEF2F2] text-[#DC2626]",
};

export default function TrainingPage() {
  var router = useRouter();
  var [progress, setProgress] = useState<Record<string, number>>({});
  var [expandedModule, setExpandedModule] = useState<string | null>(null);

  useEffect(function() {
    try {
      var saved = localStorage.getItem("kairo-training-progress");
      if (saved) setProgress(JSON.parse(saved));
    } catch (e) {}
  }, []);

  function startModule(mod: typeof MODULES[0]) {
    // Create a new conversation with the training prompt
    router.push("/chat?prompt=" + encodeURIComponent(mod.prompt));
  }

  var totalLessons = MODULES.reduce(function(sum, m) { return sum + m.lessons; }, 0);
  var completedLessons = Object.values(progress).reduce(function(sum, v) { return sum + v; }, 0);
  var overallPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-[#8B5CF6] flex items-center justify-center">
            <GraduationCap size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#111]">Training Center</h1>
            <p className="text-[13px] text-[#999]">Learn RevOps with interactive lessons based on your real data</p>
          </div>
        </div>
      </div>

      {/* Overall progress */}
      <div className="rounded-xl border border-[#EAEAEA] p-5 mb-8 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[13px] font-medium text-[#111]">Your progress</p>
            <p className="text-[11px] text-[#999] mt-0.5">{completedLessons} of {totalLessons} lessons completed</p>
          </div>
          <span className="text-2xl font-bold text-[#111]">{overallPercent}%</span>
        </div>
        <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-[#8B5CF6] transition-all duration-500" style={{ width: overallPercent + "%" }} />
        </div>
      </div>

      {/* Modules grid */}
      <div className="space-y-3">
        {MODULES.map(function(mod) {
          var Icon = mod.icon;
          var moduleProgress = progress[mod.id] || 0;
          var percent = Math.round((moduleProgress / mod.lessons) * 100);
          var isExpanded = expandedModule === mod.id;

          return (
            <div key={mod.id} className="rounded-xl border border-[#EAEAEA] bg-white overflow-hidden hover:border-[#CCC] transition-colors">
              {/* Module header */}
              <button
                onClick={function() { setExpandedModule(isExpanded ? null : mod.id); }}
                className="w-full px-5 py-4 flex items-center gap-4 text-left"
              >
                <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: mod.color + "15" }}>
                  <Icon size={18} style={{ color: mod.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[14px] font-semibold text-[#111]">{mod.title}</h3>
                    <span className={"text-[10px] font-medium px-1.5 py-0.5 rounded " + DIFFICULTY_COLORS[mod.difficulty]}>{mod.difficulty}</span>
                  </div>
                  <p className="text-[12px] text-[#999] mt-0.5 truncate">{mod.description}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#999]">
                      <Clock size={11} />
                      <span>{mod.duration}</span>
                    </div>
                    {percent > 0 && <p className="text-[10px] font-medium mt-0.5" style={{ color: mod.color }}>{percent}%</p>}
                  </div>
                  <ChevronRight size={14} className={"text-[#CCC] transition-transform " + (isExpanded ? "rotate-90" : "")} />
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-[#F5F5F5] px-5 py-4">
                  <div className="space-y-2 mb-4">
                    {mod.topics.map(function(topic, i) {
                      var isCompleted = i < moduleProgress;
                      var isCurrent = i === moduleProgress;
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div className={"h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 " + (isCompleted ? "text-white" : isCurrent ? "border-2 text-[#111]" : "bg-[#F5F5F5] text-[#CCC]")} style={isCompleted ? { backgroundColor: mod.color } : isCurrent ? { borderColor: mod.color, color: mod.color } : {}}>
                            {isCompleted ? <Star size={10} /> : (i + 1)}
                          </div>
                          <span className={"text-[13px] " + (isCompleted ? "text-[#999] line-through" : isCurrent ? "text-[#111] font-medium" : "text-[#CCC]")}>{topic}</span>
                          {isCurrent && <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#555]">Next</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden mb-4">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: percent + "%", backgroundColor: mod.color }} />
                  </div>

                  <button
                    onClick={function() { startModule(mod); }}
                    className="h-9 px-4 rounded-lg text-[12px] font-medium text-white transition-colors"
                    style={{ backgroundColor: mod.color }}
                  >
                    {percent === 0 ? "Start module" : percent === 100 ? "Review module" : "Continue learning"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tip */}
      <div className="mt-6 rounded-xl border border-[#EAEAEA] bg-[#FAFAFA] px-5 py-4">
        <p className="text-[12px] text-[#999]">
          <span className="font-medium text-[#555]">Tip:</span> You can also type <code className="bg-[#F0F0F0] px-1 py-0.5 rounded text-[11px]">/learn pipeline</code> in the chat to start a training session anytime. Kairo will use your real HubSpot data for exercises.
        </p>
      </div>
    </div>
  );
}
