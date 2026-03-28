"use client";
import { useState, useEffect, useRef } from "react";
import { Lightbulb, Search, X } from "lucide-react";

interface TemplatesPopoverProps {
  onSelect: (prompt: string) => void;
}

var TEMPLATES = [
  {
    category: "Sales Ops",
    items: [
      { label: "Revue Pipeline", prompt: "/pipeline" },
      { label: "Forecast Revenue", prompt: "/forecast" },
      { label: "Coaching Reps", prompt: "/coaching" },
      { label: "Deals a risque", prompt: "Which deals are at risk? Montre les stalled, sans activite, et proches de la close date." },
      { label: "Sales Velocity", prompt: "Break down my sales velocity : nombre d'opportunites, deal size moyen, win rate, et cycle. Quel levier optimiser en priorite ?" },
      { label: "Win/Loss Patterns", prompt: "Analyse les patterns des deals gagnes vs perdus. Qu'est-ce qui differencie les deux ?" },
    ],
  },
  {
    category: "Marketing Ops",
    items: [
      { label: "Performance Outreach", prompt: "/outreach" },
      { label: "Profile Client Ideal", prompt: "/icp" },
      { label: "Pipeline par source", prompt: "D'ou viennent mes deals ? Repartition inbound vs outbound vs referral avec les taux de conversion par source." },
      { label: "Correlation outreach ↔ pipe", prompt: "Quel est le lien entre mes campagnes Lemlist et les deals en pipeline ? Combien de deals viennent de l'outbound ?" },
    ],
  },
  {
    category: "Service Ops",
    items: [
      { label: "Analyse Tickets", prompt: "/tickets" },
      { label: "SLA Check", prompt: "Combien de tickets depassent le SLA ? Liste-les par priorite avec le temps de depassement." },
      { label: "Satisfaction Client", prompt: "Analyse la relation avec mes clients : tickets recurrents, comptes a risque de churn, upsell potentiel." },
    ],
  },
  {
    category: "RevOps",
    items: [
      { label: "Rapport Complet", prompt: "/report Rapport RevOps complet : pipeline, forecast, performance reps, qualite CRM, outreach, et recommandations prioritaires." },
      { label: "Audit CRM", prompt: "/audit" },
      { label: "Cleanup CRM", prompt: "/cleanup" },
      { label: "Comparer Periodes", prompt: "/compare ce mois vs le mois dernier : pipeline, win rate, revenue, cycle de vente." },
    ],
  },
  {
    category: "Actions",
    items: [
      { label: "Brief Meeting", prompt: "/brief " },
      { label: "Review un Deal", prompt: "/deal " },
      { label: "Creer une tache", prompt: "Cree une tache de follow-up pour " },
      { label: "Rediger un email", prompt: "Redige un email de relance pour le deal " },
      { label: "Mettre a jour un deal", prompt: "Passe le deal " },
      { label: "Chercher dans Notion", prompt: "Cherche dans Notion " },
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
        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#999] hover:bg-[#F5F5F5] hover:text-[#111] transition-colors"
        title="Templates">
        <Lightbulb size={16} />
      </button>
      {open && (
        <div className="absolute bottom-full left-0 mb-2 w-[380px] max-w-[calc(100vw-2rem)] rounded-lg border border-[#EAEAEA] bg-white shadow-lg z-50 overflow-hidden">
          {/* Header + Search */}
          <div className="p-3 border-b border-[#F0F0F0]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-[#111]">Templates</h3>
              <button onClick={function() { setOpen(false); }} className="text-[#BBB] hover:text-[#111]"><X size={14} /></button>
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#BBB]" />
              <input ref={searchRef} type="text" value={search} onChange={function(e) { setSearch(e.target.value); }}
                placeholder="Search..."
                className="w-full h-8 pl-9 pr-3 text-xs rounded-lg border border-[#EAEAEA] focus:outline-none focus:ring-1 focus:ring-[#D4D4D4]" />
            </div>
          </div>

          {/* Templates list */}
          <div className="max-h-[280px] overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <p className="text-xs text-[#BBB] text-center py-4">No templates found</p>
            ) : filtered.map(function(cat) {
              return (
                <div key={cat.category} className="mb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#BBB] px-2 py-1.5">{cat.category}</p>
                  {cat.items.map(function(item) {
                    var needsInput = item.prompt.endsWith(" ");
                    return (
                      <button key={item.label} onClick={function() { onSelect(item.prompt); if (!needsInput) setOpen(false); }}
                        className="w-full text-left px-2 py-2 rounded-lg text-xs hover:bg-[#F5F5F5] transition-colors group flex items-center justify-between">
                        <span className="text-[#111] group-hover:text-[#111]">{item.label}</span>
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
