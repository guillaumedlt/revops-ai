"use client";

import { useState } from "react";
import Badge from "./Badge";

type Problem = { title: string; desc: string; icons: string[]; cat: string };

const problems: Problem[] = [
  // CRM & Pipeline
  { title: "Ecart forecast vs réel", desc: "Vos prévisions ne collent jamais au réel. Le board perd confiance et chaque QBR est un exercise de rattrapage.", icons: ["hubspot.com", "salesforce.com"], cat: "crm" },
  { title: "CRM rempli n'importe comment", desc: "Chaque commercial a sa façon de remplir HubSpot. Les données sont inexploitables pour le management.", icons: ["hubspot.com", "clay.com"], cat: "crm" },
  { title: "Deals fantômes dans le pipe", desc: "Des opportunités ouvertes depuis 6 mois sans activité. Ça gonfle le pipe artificiellement.", icons: ["hubspot.com", "claap.io"], cat: "crm" },
  { title: "Aucune visibilité vélocité", desc: "Combien de temps un deal met de discovery à closing ? Personne ne peut répondre. Impossible d'optimiser.", icons: ["hubspot.com", "claude.ai"], cat: "crm" },
  { title: "Lead routing au doigt mouillé", desc: "Les leads sont assignés manuellement. Pas de round-robin, pas de règles, pas de SLA.", icons: ["hubspot.com", "salesforce.com"], cat: "crm" },
  { title: "Dashboards inutilisables", desc: "15 dashboards que personne ne regarde. Les métriques ne racontent rien et personne ne prend de décision avec.", icons: ["hubspot.com", "notion.so"], cat: "crm" },

  // Silos & Process
  { title: "MQL vs SQL : personne n'est d'accord", desc: "Marketing et Sales n'ont pas la même définition d'un lead qualifié. Les termes ne sont pas alignés, les SLA ne sont pas respectés.", icons: ["hubspot.com", "lemlist.com"], cat: "silos" },
  { title: "Données dupliquées partout", desc: "Les mêmes infos sont copiées dans 4 outils différents. Ça crée du bruit, des erreurs et personne ne sait quelle version est la bonne.", icons: ["make.com", "hubspot.com", "notion.so"], cat: "silos" },
  { title: "Pas de structure unifiée", desc: "Marketing, Sales et CS fonctionnent chacun avec leurs process, leurs outils, leurs métriques. Aucune vision transverse.", icons: ["hubspot.com", "slack.com"], cat: "silos" },
  { title: "Outils complètement déconnectés", desc: "HubSpot, Slack, Lemlist, Notion, Claap, rien ne se parle. Vos équipes jonglent entre 8 onglets.", icons: ["make.com", "slack.com", "hubspot.com"], cat: "silos" },
  { title: "3h de reporting chaque lundi", desc: "Les managers copient-collent des chiffres dans des slides au lieu de coacher leurs équipes.", icons: ["notion.so", "hubspot.com"], cat: "silos" },
  { title: "SLA inter-équipes inexistants", desc: "Aucun engagement de temps de réponse entre Marketing et Sales. Les leads refroidissent pendant que personne ne bouge.", icons: ["hubspot.com", "slack.com"], cat: "silos" },

  // IA & Automatisation
  { title: "L'IA ? Pas commencé", desc: "Vous savez que Claude peut aider mais personne n'a le temps ni le setup pour s'y mettre.", icons: ["claude.ai", "make.com"], cat: "ia" },
  { title: "Agents IA pas connectés", desc: "Vous avez testé ChatGPT mais vos agents ne sont pas branchés sur votre CRM, vos calls, vos données.", icons: ["claude.ai", "hubspot.com", "slack.com"], cat: "ia" },
  { title: "Enrichissement à la main", desc: "Vos SDR passent 30 min par prospect à chercher des infos sur LinkedIn. Clay + Claude pourraient le faire en 3 secondes.", icons: ["clay.com", "claude.ai", "hubspot.com"], cat: "ia" },
  { title: "Calls jamais analysés", desc: "Des centaines d'heures de calls commerciaux sans en extraire un seul pattern ou learning exploitable.", icons: ["claap.io", "claude.ai"], cat: "ia" },
  { title: "Pas de serveur MCP", desc: "Claude Code pourrait automatiser vos ops mais personne n'a mis en place l'infra MCP pour le connecter.", icons: ["claude.ai", "hubspot.com", "make.com"], cat: "ia" },
  { title: "Scoring inexistant", desc: "Aucun modèle de scoring IA sur vos leads. Du stagiaire au C-level, tout le monde est traité pareil.", icons: ["claude.ai", "clay.com", "hubspot.com"], cat: "ia" },
];

const tabs = [
  { key: "crm", label: "CRM & Pipeline" },
  { key: "silos", label: "Silos & Process" },
  { key: "ia", label: "IA & Automatisation" },
];

export default function Features() {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("crm");
  const count = selected.length;
  const visible = problems.filter((p) => p.cat === activeTab);

  return (
    <section id="services" className="relative z-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 md:p-10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)]">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <div className="mb-4"><Badge>Ça vous parle ?</Badge></div>
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
                type="button"
                onClick={() => { setActiveTab(tab.key); }}
                className={"px-3 py-1.5 rounded-md text-[12px] font-medium border cursor-pointer " +
                  (activeTab === tab.key
                    ? "border-[#111] bg-[#111] text-white"
                    : "border-[#F0F0F0] text-[#999] hover:border-[#DDD]")}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {visible.map((p) => {
              const isSel = selected.includes(p.title);
              const isDis = count >= 3 && !isSel;
              return (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => {
                    if (isDis) return;
                    setSelected((prev) =>
                      prev.includes(p.title)
                        ? prev.filter((t) => t !== p.title)
                        : prev.length < 3 ? [...prev, p.title] : prev
                    );
                  }}
                  className={
                    "rounded-xl border p-4 text-left cursor-pointer transition-all " +
                    (isSel ? "border-[#111] bg-[#FAFAFA] ring-1 ring-[#111]" : "border-[#F2F2F2] hover:border-[#E0E0E0]") +
                    (isDis ? " !opacity-30 !cursor-not-allowed" : "")
                  }
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className={"w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 " +
                      (isSel ? "bg-[#111] border-[#111]" : "border-[#DDD]")}>
                      {isSel && (
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {p.icons.map((d, j) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={`${d}-${j}`} src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`} alt="" width={14} height={14} className="rounded-sm rounded" loading="lazy" />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-[13px] font-semibold text-[#111] mb-1 leading-tight">{p.title}</h3>
                  <p className="text-[11px] text-[#999] leading-[1.5]">{p.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Bottom */}
          <div className="mt-6 pt-5 border-t border-[#F2F2F2] flex items-center justify-between">
            <p className="text-[12px] text-[#999]">
              {count === 0 && "Choisissez dans les 3 catégories"}
              {count === 1 && "Encore 2..."}
              {count === 2 && "Plus qu'un !"}
              {count === 3 && "Parfait, on peut en parler"}
            </p>
            <a
              href="#contact"
              className={"px-4 py-1.5 rounded-md text-[13px] font-medium " +
                (count === 3
                  ? "bg-[#111] text-white hover:bg-[#222]"
                  : "bg-[#F5F5F5] text-[#CCC] pointer-events-none")}
            >
              {count === 3 ? "On en discute →" : `${count}/3 sélectionnés`}
            </a>
          </div>
        </div>

        <div className="hidden md:block mx-auto w-px h-10 bg-[#E0E0E0]" />

        {/* SEO: all problems rendered hidden for crawlers */}
        <div className="sr-only" aria-hidden="true">
          {problems.map((p) => (
            <div key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
