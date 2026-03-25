"use client";

import { useState } from "react";
import Badge from "./Badge";

const problems = [
  // Page 1 — CRM & Pipeline
  { title: "Pipeline imprévisible", desc: "Vos forecasts changent chaque semaine. Impossible de donner un chiffre fiable au board.", color: "#FF7A59", icons: ["hubspot.com", "salesforce.com"], cat: "crm" },
  { title: "CRM rempli n'importe comment", desc: "Chaque commercial a sa façon de remplir HubSpot. Données inexploitables pour le management.", color: "#FF7A59", icons: ["hubspot.com", "clay.com"], cat: "crm" },
  { title: "Deals fantômes dans le pipe", desc: "Des opportunités ouvertes depuis 6 mois sans activité. Mortes ou vivantes, personne ne sait.", color: "#FF7A59", icons: ["hubspot.com", "claap.io"], cat: "crm" },
  { title: "Aucune visibilité vélocité", desc: "Combien de temps un deal met de discovery à closing ? Personne ne peut répondre.", color: "#FF7A59", icons: ["hubspot.com", "claude.ai"], cat: "crm" },
  { title: "Lead routing au doigt mouillé", desc: "Les leads sont assignés manuellement. Pas de round-robin, pas de SLA entre équipes.", color: "#FF7A59", icons: ["hubspot.com", "salesforce.com"], cat: "crm" },
  { title: "Dashboards inutilisables", desc: "15 dashboards HubSpot et personne ne les regarde. Les métriques ne racontent rien.", color: "#FF7A59", icons: ["hubspot.com", "notion.so"], cat: "crm" },

  // Page 2 — Silos & Process
  { title: "Sales ≠ Marketing", desc: "Le marketing génère des leads que les sales ne rappellent jamais. Zéro boucle de feedback.", color: "#4B5EFC", icons: ["hubspot.com", "lemlist.com"], cat: "silos" },
  { title: "Outils complètement déconnectés", desc: "HubSpot, Slack, Lemlist, Notion, Claap — rien ne se parle. 8 onglets ouverts en permanence.", color: "#4B5EFC", icons: ["make.com", "slack.com", "hubspot.com"], cat: "silos" },
  { title: "CS complètement silotée", desc: "Le customer success n'a aucune visibilité sur ce qui a été vendu. Churn évitable, upsell raté.", color: "#4B5EFC", icons: ["hubspot.com", "slack.com"], cat: "silos" },
  { title: "3h de reporting chaque lundi", desc: "Les managers copient-collent des chiffres dans des slides au lieu de coacher leurs équipes.", color: "#4B5EFC", icons: ["notion.so", "hubspot.com"], cat: "silos" },
  { title: "Pas de single source of truth", desc: "Les chiffres ne matchent jamais entre le CRM, le tableur du VP et le board deck du CEO.", color: "#4B5EFC", icons: ["hubspot.com", "notion.so"], cat: "silos" },
  { title: "Séquences email sans data", desc: "Vos séquences Lemlist ne sont pas alimentées par le CRM. Pas de perso, taux de réponse faible.", color: "#4B5EFC", icons: ["lemlist.com", "clay.com", "hubspot.com"], cat: "silos" },

  // Page 3 — IA & Automatisation
  { title: "L'IA ? On n'a pas commencé", desc: "Vous savez que Claude peut aider mais personne n'a le temps ni le setup pour s'y mettre.", color: "#6D00CC", icons: ["claude.ai", "make.com"], cat: "ia" },
  { title: "Agents IA pas connectés", desc: "Vous avez testé ChatGPT mais vos agents ne sont pas branchés sur votre CRM ni vos données.", color: "#6D00CC", icons: ["claude.ai", "hubspot.com", "slack.com"], cat: "ia" },
  { title: "Calls jamais analysés", desc: "Des centaines d'heures de calls sans en extraire un seul pattern ou learning exploitable.", color: "#6D00CC", icons: ["claap.io", "claude.ai"], cat: "ia" },
  { title: "Enrichissement à la main", desc: "Vos SDR passent 30 min par prospect à chercher des infos sur LinkedIn avant d'écrire.", color: "#6D00CC", icons: ["clay.com", "claude.ai", "hubspot.com"], cat: "ia" },
  { title: "Pas de serveur MCP", desc: "Claude Code pourrait automatiser vos ops mais personne n'a mis en place l'infra MCP.", color: "#6D00CC", icons: ["claude.ai", "hubspot.com", "make.com"], cat: "ia" },
  { title: "Emails génériques", desc: "Vos séquences ne sont pas personnalisées par l'IA. Chaque prospect reçoit le même template.", color: "#6D00CC", icons: ["claude.ai", "lemlist.com"], cat: "ia" },
  { title: "Scoring inexistant", desc: "Aucun modèle de scoring IA sur vos leads. Tout le monde est traité pareil, du stagiaire au C-level.", color: "#6D00CC", icons: ["claude.ai", "clay.com", "hubspot.com"], cat: "ia" },
  { title: "Résumés de meeting manuels", desc: "Après chaque call, le rep passe 15 min à rédiger un résumé dans le CRM au lieu de closer.", color: "#6D00CC", icons: ["claap.io", "claude.ai", "hubspot.com"], cat: "ia" },
  { title: "Pas de playbook IA", desc: "Vos meilleurs reps ont des techniques qu'on pourrait codifier avec l'IA. Personne ne l'a fait.", color: "#6D00CC", icons: ["claude.ai", "notion.so"], cat: "ia" },
  { title: "Onboarding sans assistant", desc: "Chaque nouveau rep met 3 mois à performer. Un copilote IA réduirait ça à 3 semaines.", color: "#6D00CC", icons: ["claude.ai", "hubspot.com", "notion.so"], cat: "ia" },
  { title: "Analyse win/loss absente", desc: "Vous ne savez pas pourquoi vous gagnez ou perdez des deals. L'IA pourrait identifier les patterns.", color: "#6D00CC", icons: ["claude.ai", "hubspot.com", "claap.io"], cat: "ia" },
  { title: "Données non structurées", desc: "Notes, emails, calls — une mine d'or de données que personne n'exploite faute d'outils IA.", color: "#6D00CC", icons: ["claude.ai", "hubspot.com"], cat: "ia" },
];

const tabs = [
  { key: "crm", label: "CRM & Pipeline", color: "#FF7A59" },
  { key: "silos", label: "Silos & Process", color: "#4B5EFC" },
  { key: "ia", label: "IA & Automatisation", color: "#6D00CC" },
];

export default function Features() {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState("crm");
  const count = selected.size;

  const visible = problems.filter((p) => p.cat === activeTab);

  function toggle(title: string) {
    const idx = problems.findIndex((p) => p.title === title);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else if (next.size < 3) next.add(idx);
      return next;
    });
  }

  return (
    <section id="services">
      <div className="pb-14 pt-[1px]">
        <div className="max-w-[1000px] mx-auto px-6 relative">
          {/* Blobs */}
          <div className="absolute -bottom-20 -left-16 w-[220px] h-[220px] rounded-full bg-[#4B5EFC] opacity-[0.06] blur-[60px] pointer-events-none" style={{ animation: "blobFloat 8s 1s ease-in-out infinite" }} />
          <div className="absolute -bottom-16 -right-20 w-[200px] h-[200px] rounded-full bg-[#FF7A59] opacity-[0.06] blur-[60px] pointer-events-none" style={{ animation: "blobFloat 8s 3s ease-in-out infinite" }} />

          <div className="relative rounded-2xl border border-[#E8E8E8] bg-white p-6 md:p-10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08),0_2px_6px_-2px_rgba(0,0,0,0.03)]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <div className="mb-3"><Badge>Ça vous parle ?</Badge></div>
                <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] leading-[1.2] tracking-[-0.02em] mb-1">
                  Sélectionnez vos 3 problèmes
                </h2>
                <p className="text-[13px] text-[#999]">On construit votre plan d&apos;action autour.</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex gap-1">
                  {[0, 1, 2].map((n) => (
                    <div key={n} className={"w-2 h-2 rounded-full transition-colors " + (n < count ? "bg-[#111]" : "bg-[#E5E5E5]")} />
                  ))}
                </div>
                <span className="text-[12px] text-[#999]">{count}/3</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-5">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all border " +
                    (activeTab === tab.key
                      ? "border-[#111] bg-[#111] text-white"
                      : "border-[#F0F0F0] text-[#999] hover:border-[#DDD] hover:text-[#666]")}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeTab === tab.key ? "white" : tab.color, opacity: activeTab === tab.key ? 0.7 : 0.5 }} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {visible.map((p) => {
                const realIdx = problems.findIndex((x) => x.title === p.title);
                const isSelected = selected.has(realIdx);
                const isDisabled = count >= 3 && !isSelected;
                return (
                  <button
                    key={p.title}
                    onClick={() => toggle(p.title)}
                    disabled={isDisabled}
                    className={
                      "rounded-xl border p-4 text-left transition-all " +
                      (isSelected
                        ? "border-[#111] bg-[#FAFAFA] shadow-[0_0_0_1px_#111]"
                        : "border-[#F2F2F2] hover:border-[#E0E0E0] hover:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)]") +
                      (isDisabled ? " opacity-30 cursor-not-allowed" : " cursor-pointer")
                    }
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className={"w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors " +
                          (isSelected ? "bg-[#111] border-[#111]" : "border-[#DDD]")}>
                          {isSelected && (
                            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex -space-x-1">
                        {p.icons.map((d, j) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={`${d}-${j}`} src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`} alt="" width={14} height={14} className="rounded-sm ring-1 ring-white" loading="lazy" />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-[13px] font-semibold text-[#111] mb-1 leading-tight">{p.title}</h3>
                    <p className="text-[11px] text-[#999] leading-[1.5]">{p.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-6 pt-5 border-t border-[#F2F2F2] flex items-center justify-between">
              <p className="text-[12px] text-[#999]">
                {count === 0 && "Choisissez dans les 3 catégories"}
                {count === 1 && "Encore 2..."}
                {count === 2 && "Plus qu'un !"}
                {count === 3 && "Parfait — on peut en parler"}
              </p>
              <a
                href="#contact"
                className={"inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-[13px] font-medium transition-all " +
                  (count === 3
                    ? "bg-[#111] text-white hover:bg-[#222]"
                    : "bg-[#F5F5F5] text-[#CCC] pointer-events-none")}
              >
                {count === 3 ? "On en discute →" : `${count}/3 sélectionnés`}
              </a>
            </div>
          </div>

          {/* Connector to next section */}
          <div className="hidden md:block mx-auto w-px h-[60px] bg-[#EAEAEA]" />
        </div>
      </div>
    </section>
  );
}
