"use client";
import { useState, useEffect, useRef } from "react";
import { Lightbulb, Search, X } from "lucide-react";

interface TemplatesPopoverProps {
  onSelect: (prompt: string) => void;
}

var TEMPLATES = [
  {
    category: "Pipeline",
    items: [
      { label: "Pipeline Overview", prompt: "Give me a complete pipeline overview: total value, deal count, breakdown by stage, and top 10 deals." },
      { label: "Stalled Deals", prompt: "Which deals have been stalled for more than 14 days? List them with owner, amount, and last activity." },
      { label: "Deal Health Check", prompt: "Score all my open deals on health (0-100). Show the critical and at-risk ones first." },
      { label: "Top Deals", prompt: "Show me my top 10 deals by amount with stage, owner, and close date." },
    ],
  },
  {
    category: "Forecast",
    items: [
      { label: "Quarterly Forecast", prompt: "What's my revenue forecast for this quarter? Show commit, best case, and worst case scenarios." },
      { label: "Monthly Forecast", prompt: "What revenue can I expect to close this month? Break it down by scenario." },
      { label: "Pipeline Coverage", prompt: "What's my pipeline coverage ratio? Do I have enough pipeline to hit my target?" },
    ],
  },
  {
    category: "Performance",
    items: [
      { label: "Rep Comparison", prompt: "Compare all sales reps: win rate, pipeline value, average deal size, and sales cycle." },
      { label: "Win Rate Analysis", prompt: "What's our overall win rate? Break it down by deal size and owner." },
      { label: "Sales Velocity", prompt: "What's our sales velocity? Average cycle time, median deal size, and conversion rate." },
      { label: "Win/Loss Analysis", prompt: "Analyze why we win and lose deals. Compare patterns between won and lost deals." },
    ],
  },
  {
    category: "Funnel",
    items: [
      { label: "Funnel Conversion", prompt: "Show me the sales funnel with conversion rates between each stage." },
      { label: "Bottleneck Analysis", prompt: "Where are deals getting stuck in the funnel? Which stage has the lowest conversion?" },
    ],
  },
  {
    category: "CRM Quality",
    items: [
      { label: "CRM Hygiene Audit", prompt: "Audit my CRM data quality: missing fields, stale deals, incomplete records. Score each rep." },
      { label: "Data Cleanup List", prompt: "Give me a prioritized list of data issues to fix, sorted by impact." },
      { label: "Missing Data Report", prompt: "How many deals are missing amount, close date, or contact? Break it down by owner." },
    ],
  },
  {
    category: "ICP & Scoring",
    items: [
      { label: "Build My ICP", prompt: "Build my Ideal Customer Profile based on won deals. Show industries, company size, revenue patterns." },
      { label: "Score a Prospect", prompt: "Score this prospect against my ICP: " },
      { label: "Best Fit Deals", prompt: "Which open deals best match our ICP? Rank them by fit score." },
    ],
  },
  {
    category: "Contacts & Companies",
    items: [
      { label: "Search Contacts", prompt: "Search for contacts at " },
      { label: "Company Lookup", prompt: "What do we know about " },
      { label: "Key Stakeholders", prompt: "Who are the key contacts on my top 5 deals?" },
    ],
  },
  {
    category: "Outreach (Lemlist)",
    items: [
      { label: "Campaign Performance", prompt: "Show me all my Lemlist campaigns with open rates, reply rates, and click rates." },
      { label: "Best Campaign", prompt: "Which Lemlist campaign has the best performance? Show stats." },
      { label: "Lead Status", prompt: "Show me the leads from my latest Lemlist campaign with their status." },
    ],
  },
  {
    category: "Actions",
    items: [
      { label: "Create Follow-up", prompt: "Create a task to follow up on " },
      { label: "Log a Note", prompt: "Add a note on the deal " },
      { label: "Update Deal Stage", prompt: "Move the deal " },
    ],
  },
  {
    category: "Reports",
    items: [
      { label: "Full Audit", prompt: "/report Complete RevOps audit: pipeline, performance, forecast, deal health, CRM quality, and recommendations." },
      { label: "Weekly Summary", prompt: "/report Weekly sales summary with KPIs, closed deals, pipeline changes, and action items." },
      { label: "Pipeline Report", prompt: "/report Detailed pipeline report with stage breakdown, top deals, risks, and forecast." },
      { label: "Team Performance", prompt: "/report Team performance report: each rep's metrics, rankings, and coaching recommendations." },
    ],
  },
  {
    category: "Meeting Prep",
    items: [
      { label: "Prep My Call", prompt: "Prepare a meeting brief for my call with " },
      { label: "Deal Summary", prompt: "Give me a full summary of the deal " },
      { label: "Account Overview", prompt: "Everything we know about the account " },
    ],
  },
];

export default function TemplatesPopover({ onSelect }: TemplatesPopoverProps) {
  var [open, setOpen] = useState(false);
  var [search, setSearch] = useState("");
  var containerRef = useRef<HTMLDivElement>(null);
  var searchRef = useRef<HTMLInputElement>(null);

  useEffect(function() {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return function() { document.removeEventListener("mousedown", handleClick); };
  }, [open]);

  useEffect(function() {
    if (open && searchRef.current) searchRef.current.focus();
    if (!open) setSearch("");
  }, [open]);

  var filtered = TEMPLATES.map(function(cat) {
    if (!search.trim()) return cat;
    var q = search.toLowerCase();
    var items = cat.items.filter(function(item) {
      return item.label.toLowerCase().includes(q) || item.prompt.toLowerCase().includes(q) || cat.category.toLowerCase().includes(q);
    });
    return { category: cat.category, items: items };
  }).filter(function(cat) { return cat.items.length > 0; });

  return (
    <div ref={containerRef} className="relative">
      <button onClick={function() { setOpen(!open); }} type="button"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#737373] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors"
        title="Templates">
        <Lightbulb size={16} />
      </button>
      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-[380px] max-w-[calc(100vw-2rem)] rounded-xl border border-[#E5E5E5] bg-white shadow-lg z-50 overflow-hidden">
          {/* Header + Search */}
          <div className="p-3 border-b border-[#F0F0F0]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-[#0A0A0A]">Templates</h3>
              <button onClick={function() { setOpen(false); }} className="text-[#A3A3A3] hover:text-[#0A0A0A]"><X size={14} /></button>
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
              <input ref={searchRef} type="text" value={search} onChange={function(e) { setSearch(e.target.value); }}
                placeholder="Search templates..."
                className="w-full h-8 pl-9 pr-3 text-xs rounded-lg border border-[#E5E5E5] focus:outline-none focus:ring-1 focus:ring-[#D4D4D4]" />
            </div>
          </div>

          {/* Templates list */}
          <div className="max-h-[280px] overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <p className="text-xs text-[#A3A3A3] text-center py-4">No templates found</p>
            ) : filtered.map(function(cat) {
              return (
                <div key={cat.category} className="mb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A3A3A3] px-2 py-1.5">{cat.category}</p>
                  {cat.items.map(function(item) {
                    var needsInput = item.prompt.endsWith(" ");
                    return (
                      <button key={item.label} onClick={function() { onSelect(item.prompt); if (!needsInput) setOpen(false); }}
                        className="w-full text-left px-2 py-2 rounded-lg text-xs hover:bg-[#F5F5F5] transition-colors group flex items-center justify-between">
                        <span className="text-[#0A0A0A] group-hover:text-[#0A0A0A]">{item.label}</span>
                        {needsInput && <span className="text-[10px] text-[#D4D4D4]">type to complete</span>}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
