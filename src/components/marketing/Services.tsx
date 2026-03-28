"use client";

import { useState } from "react";
import Badge from "./Badge";

const stackBricks = [
  { id: "audit", label: "Audit CRM", color: "#FF7A59" },
  { id: "archi", label: "Architecture", color: "#4B5EFC" },
  { id: "auto", label: "Automatisation", color: "#D4A27F" },
  { id: "ia", label: "Agents IA", color: "#6D00CC" },
  { id: "report", label: "Reporting", color: "#6C5CE7" },
  { id: "formation", label: "Formation", color: "#22C55E" },
];

const hubsList = [
  { id: "sales", label: "Sales Hub", color: "#FF7A59" },
  { id: "marketing", label: "Marketing Hub", color: "#FF5C35" },
  { id: "service", label: "Service Hub", color: "#00BDA5" },
  { id: "ops", label: "Operations Hub", color: "#6C5CE7" },
  { id: "cms", label: "CMS Hub", color: "#4B5EFC" },
];

const crmOptions = [
  { id: "migration", label: "Migration données" },
  { id: "config", label: "Config avancée" },
  { id: "workflow", label: "Workflows" },
  { id: "formation", label: "Formation" },
  { id: "integration", label: "Intégrations" },
  { id: "custom", label: "Custom & API" },
];

const iaCapabilities = [
  { id: "qualify", label: "Qualification leads", color: "#6D00CC" },
  { id: "summary", label: "Résumés de calls", color: "#6C5CE7" },
  { id: "enrich", label: "Enrichissement", color: "#4B5EFC" },
  { id: "score", label: "Scoring prédictif", color: "#FF7A59" },
  { id: "mcp", label: "Serveur MCP", color: "#D4A27F" },
  { id: "playbook", label: "Playbooks IA", color: "#22C55E" },
];

const offers = [
  { id: "audit", title: "Audit RevOps", subtitle: "Diagnostic complet", desc: "On passe votre CRM, vos process et votre stack au crible. Rapport actionnable en 2 semaines.", color: "#FF7A59", features: ["Rapport 40-60 pages", "Score de maturité RevOps", "Plan d'action à 90 jours"] },
  { id: "parttime", title: "RevOps Part-Time", subtitle: "Un expert dédié chaque mois", desc: "Un ops RevOps & IA intégré à votre équipe qui gère votre CRM, automatise vos process et déploie l'IA au quotidien.", color: "#4B5EFC", features: ["Channel Slack dédié", "Itérations hebdomadaires", "Roadmap trimestrielle", "Déploiement IA continu", "Sans engagement"], badge: "Populaire" },
  { id: "crm", title: "Agence HubSpot", subtitle: "Setup, migration & optimisation", desc: "On configure, migre et optimise votre HubSpot de A à Z. Choisissez vos Hubs et vos options.", color: "#6C5CE7", features: ["Opérationnel en 4 semaines", "Support 30 jours post-launch", "Documentation complète"] },
  { id: "ia", title: "Agents IA", subtitle: "Claude, MCP & automatisation", desc: "On connecte Claude à votre stack via MCP. Qualification, résumés de calls, enrichissement, scoring.", color: "#6D00CC", features: ["Agents connectés au CRM", "Serveur MCP déployé", "Résultats en 2 semaines", "Formation incluse"] },
];

function CardStack({ colors }: { colors: string[] }) {
  const visibleColors = colors.slice(0, 7);
  const count = visibleColors.length;
  const mid = (count - 1) / 2;

  if (count === 0) return <p className="text-[11px] text-[#CCC]">Sélectionnez des options</p>;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {visibleColors.map((c, i) => {
        const offset = i - mid;
        const isCenter = Math.abs(offset) < 0.6;
        const rotate = offset * (count <= 3 ? 10 : 6);
        const scale = isCenter ? 1 : Math.max(0.78, 1 - Math.abs(offset) * 0.07);
        const z = 10 - Math.abs(Math.round(offset));
        const spreadX = offset * Math.min(28, 140 / Math.max(count, 2));
        const spreadY = Math.abs(offset) * 3;

        return (
          <div
            key={`${c}-${i}`}
            className="absolute w-[56px] h-[56px] rounded-lg bg-white flex items-center justify-center transition-all duration-500 ease-out"
            style={{
              transform: `translateX(${spreadX}px) translateY(${spreadY}px) rotate(${rotate}deg) scale(${scale})`,
              zIndex: z,
              boxShadow: isCenter
                ? "0 6px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)"
                : "0 2px 10px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)",
            }}
          >
            <div className="w-4 h-4 rounded-lg transition-colors duration-300" style={{ backgroundColor: c }} />
          </div>
        );
      })}
    </div>
  );
}

function ToggleChip({ label, color, active, onClick }: { label: string; color?: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={"flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[11px] font-medium cursor-pointer transition-all " +
        (active ? "border-[#111] bg-[#FAFAFA] text-[#111]" : "border-[#F2F2F2] text-[#999] hover:border-[#E0E0E0]")}>
      {color && <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: color }} />}
      {label}
    </button>
  );
}

export default function Services() {
  const [active, setActive] = useState("parttime");
  const [selectedHubs, setSelectedHubs] = useState<string[]>(["sales", "marketing"]);
  const [selectedCrmOpts, setSelectedCrmOpts] = useState<string[]>(["migration", "workflow", "formation"]);
  const [selectedIA, setSelectedIA] = useState<string[]>(["qualify", "summary", "mcp"]);

  const offer = offers.find((o) => o.id === active)!;

  function toggle(list: string[], item: string, setter: (v: string[]) => void) {
    setter(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  }

  // Card colors based on active offer
  function getColors() {
    switch (active) {
      case "audit": return ["#FF7A59", "#4B5EFC", "#6C5CE7", "#D4A27F", "#22C55E"];
      case "parttime": return ["#FF7A59", "#4B5EFC", "#22C55E"];
      case "crm": return selectedHubs.map((id) => hubsList.find((h) => h.id === id)?.color || "#CCC");
      case "ia": return selectedIA.map((id) => iaCapabilities.find((c) => c.id === id)?.color || "#CCC");
      default: return [];
    }
  }

  return (
    <section id="solutions" className="relative z-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)]">
          <div className="mb-8">
            <div className="mb-4"><Badge>Nos offres</Badge></div>
            <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] leading-[1.2] tracking-[-0.02em] mb-2">Choisissez votre formule</h2>
            <p className="text-[13px] text-[#999]">4 façons de travailler avec nous selon vos besoins.</p>
          </div>

          {/* Tabs — 4 columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
            {offers.map((o) => (
              <button key={o.id} type="button" onClick={() => setActive(o.id)}
                className={"relative p-3.5 rounded-lg border text-left transition-all cursor-pointer " + (active === o.id ? "border-[#111] bg-[#FAFAFA] ring-1 ring-[#111]" : "border-[#F2F2F2] hover:border-[#E0E0E0]")}>
                {o.badge && <span className="absolute -top-2 right-3 text-[9px] font-semibold bg-[#111] text-white px-2 py-0.5 rounded-full">{o.badge}</span>}
                <div className="w-2.5 h-2.5 rounded-sm mb-2.5" style={{ backgroundColor: o.color }} />
                <h3 className="text-[13px] font-semibold text-[#111] mb-0.5 leading-tight">{o.title}</h3>
                <p className="text-[10px] text-[#999]">{o.subtitle}</p>
              </button>
            ))}
          </div>

          {/* Content — illustration left, details right */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Illustration */}
            <div className="w-full md:w-[220px] h-[160px] shrink-0 bg-[#F5F5F5] rounded-lg flex items-center justify-center">
              <CardStack colors={getColors()} />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-[#666] leading-[1.65] mb-5">{offer.desc}</p>

              {/* CRM: hubs + options */}
              {active === "crm" && (
                <>
                  <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Hubs</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {hubsList.map((h) => (
                      <ToggleChip key={h.id} label={h.label} color={h.color} active={selectedHubs.includes(h.id)} onClick={() => toggle(selectedHubs, h.id, setSelectedHubs)} />
                    ))}
                  </div>
                  <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Options</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {crmOptions.map((o) => (
                      <ToggleChip key={o.id} label={o.label} active={selectedCrmOpts.includes(o.id)} onClick={() => toggle(selectedCrmOpts, o.id, setSelectedCrmOpts)} />
                    ))}
                  </div>
                </>
              )}

              {/* IA: capabilities */}
              {active === "ia" && (
                <>
                  <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Capacités</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {iaCapabilities.map((c) => (
                      <ToggleChip key={c.id} label={c.label} color={c.color} active={selectedIA.includes(c.id)} onClick={() => toggle(selectedIA, c.id, setSelectedIA)} />
                    ))}
                  </div>
                </>
              )}

              {/* Features */}
              <div className="space-y-1.5">
                {offer.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-[12px] text-[#666]">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 pt-5 border-t border-[#F2F2F2] flex items-center justify-between">
            <p className="text-[12px] text-[#999]">On s&apos;adapte à votre taille et vos enjeux.</p>
            <a href="#contact" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors cursor-pointer">Discuter de mon projet →</a>
          </div>
        </div>

        <div className="hidden md:block mx-auto w-px h-10 bg-[#E0E0E0]" />

        {/* SEO hidden */}
        <div className="sr-only" aria-hidden="true">
          {offers.map((o) => (
            <article key={o.id}>
              <h3>{o.title}</h3>
              <p>{o.desc}</p>
              <ul>{o.features.map((f) => <li key={f}>{f}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
