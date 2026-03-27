"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Le Guide RevOps Ultime : 62 pages pour structurer vos operations revenue",
  description: "Le guide RevOps le plus complet en francais. 9 chapitres, 62 pages : audit, ICP, alignement marketing-sales-CS, funnel, lead scoring, stack technologique, 30 metriques et plan 90 jours.",
  author: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-25",
  dateModified: "2026-03-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/guide-revops-ultime/contenu" },
  articleSection: "RevOps",
  wordCount: 7200,
  inLanguage: "fr",
};

const chapters = [
  { id: "chapitre-1", num: "01", title: "Qu\u2019est-ce que le RevOps" },
  { id: "chapitre-2", num: "02", title: "Audit de votre situation" },
  { id: "chapitre-3", num: "03", title: "ICP et Personas" },
  { id: "chapitre-4", num: "04", title: "Alignement Marketing-Sales-CS" },
  { id: "chapitre-5", num: "05", title: "Construire votre funnel" },
  { id: "chapitre-6", num: "06", title: "Lead Scoring" },
  { id: "chapitre-7", num: "07", title: "Stack technologique" },
  { id: "chapitre-8", num: "08", title: "30 metriques RevOps" },
  { id: "chapitre-9", num: "09", title: "Plan 90 jours" },
];

const relatedGuides = [
  { title: "Lead scoring : le guide complet", slug: "/blog/lead-scoring-guide-complet", category: "Process & Outils", color: "#6C5CE7" },
  { title: "Aligner marketing et sales avec le RevOps", slug: "/blog/aligner-marketing-sales-revops", category: "RevOps", color: "#FF7A59" },
  { title: "Les 30 metriques RevOps essentielles", slug: "/blog/metriques-revops-indicateurs-performance", category: "RevOps", color: "#4B5EFC" },
];

export default function GuideRevOpsContenuPage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("chapitre-1");

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, pct));

      const sectionEls = chapters.map((c) => document.getElementById(c.id)).filter(Boolean);
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i];
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(chapters[i].id);
          break;
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
        <div className="h-full bg-[#FF7A59] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "4%", width: 320, height: 320, borderRadius: "50%", background: "#FF7A59", opacity: 0.12, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "12%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.09, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "25%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "38%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "52%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "65%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "78%", width: 300, height: 300, borderRadius: "50%", background: "#6C5CE7", opacity: 0.06, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "90%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.06, filter: "blur(70px)" }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="flex gap-10">
          {/* Sticky sidebar */}
          <aside className="hidden lg:block w-[220px] shrink-0">
            <div className="sticky top-28">
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Chapitres</p>
              <nav className="space-y-1">
                {chapters.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className={`block text-[11px] py-1.5 pl-3 border-l-2 transition-all ${
                      activeSection === c.id
                        ? "border-[#FF7A59] text-[#111] font-medium"
                        : "border-transparent text-[#999] hover:text-[#666] hover:border-[#DDD]"
                    }`}
                  >
                    <span className="text-[#BBB] mr-1.5">{c.num}</span>{c.title}
                  </a>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-[#F2F2F2]">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Partager</p>
                <div className="flex gap-2">
                  <a href="https://twitter.com/intent/tweet?text=Le%20Guide%20RevOps%20Ultime%20par%20Ceres&url=https://www.ceres-revops.com/guide-revops-ultime/contenu" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/guide-revops-ultime/contenu" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/guide-revops-ultime" className="text-[11px] text-[#FF7A59] hover:underline font-medium">
                  Telecharger le PDF
                </Link>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 max-w-[750px]">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-[12px] text-[#999]">
              <Link href="/" className="hover:text-[#111] transition-colors">Accueil</Link><span>/</span>
              <Link href="/guides" className="hover:text-[#111] transition-colors">Guides</Link><span>/</span>
              <Link href="/guide-revops-ultime" className="hover:text-[#111] transition-colors">Guide RevOps Ultime</Link><span>/</span>
              <span className="text-[#666]">Contenu complet</span>
            </nav>

            {/* Hero */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FF7A59]/10 text-[12px] font-medium text-[#FF7A59]">RevOps</span>
                <span className="text-[12px] text-[#999]">25 mars 2026</span>
                <span className="text-[12px] text-[#999]">Temps de lecture : 35 min</span>
              </div>
              <h1 className="text-[32px] sm:text-[44px] font-semibold text-[#111] leading-[1.1] tracking-[-0.03em] mb-4">
                Le Guide RevOps Ultime
              </h1>
              <p className="text-[17px] text-[#666] leading-[1.7] mb-2">
                62 pages de frameworks, templates et checklists pour structurer vos operations revenue. Du diagnostic a l\u2019implementation, en passant par l\u2019alignement des equipes, le scoring et les metriques.
              </p>
              <p className="text-[13px] text-[#999]">
                Par <span className="text-[#111] font-medium">Ceres</span> -- Le playbook que nous utilisons avec nos clients pour deployer le RevOps en 90 jours.
              </p>
            </div>

            <Connector />

            {/* ==================== CHAPITRE 1 ==================== */}
            <div id="chapitre-1" className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#FF7A59]/10 flex items-center justify-center text-[14px] font-bold text-[#FF7A59]">01</span>
                <div>
                  <h2 className="text-[22px] font-semibold text-[#111] leading-tight">Qu&apos;est-ce que le RevOps</h2>
                  <p className="text-[12px] text-[#999]">Pages 4-9 -- Definition, historique et impact mesurable</p>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Definition complete</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Le Revenue Operations (RevOps) est une fonction strategique qui unifie les processus, les donnees et la technologie des trois equipes generatrices de revenus : le marketing, les ventes et le customer success. L&apos;objectif est simple mais ambitieux : creer une machine a revenus previsible, scalable et efficiente en eliminant les silos organisationnels qui freinent la croissance.
              </p>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-6">
                Contrairement a une idee recue, le RevOps n\u2019est pas un simple rebranding des Sales Ops. C&apos;est un changement de paradigme : au lieu de trois equipes operations isolees (Marketing Ops, Sales Ops, CS Ops), une seule fonction transversale pilote l\u2019ensemble du cycle de revenu, du premier point de contact jusqu&apos;au renouvellement du contrat.
              </p>

              {/* Visual schema */}
              <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-6 mb-6">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4 text-center">Le modele RevOps unifie</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <div className="w-full md:w-[140px] rounded-lg bg-[#4B5EFC]/10 border border-[#4B5EFC]/20 p-4 text-center">
                    <p className="text-[13px] font-semibold text-[#4B5EFC]">Marketing</p>
                    <p className="text-[11px] text-[#888] mt-1">Generer la demande</p>
                  </div>
                  <div className="text-[18px] text-[#CCC] hidden md:block">+</div>
                  <div className="w-full md:w-[140px] rounded-lg bg-[#FF7A59]/10 border border-[#FF7A59]/20 p-4 text-center">
                    <p className="text-[13px] font-semibold text-[#FF7A59]">Sales</p>
                    <p className="text-[11px] text-[#888] mt-1">Convertir les deals</p>
                  </div>
                  <div className="text-[18px] text-[#CCC] hidden md:block">+</div>
                  <div className="w-full md:w-[140px] rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20 p-4 text-center">
                    <p className="text-[13px] font-semibold text-[#22C55E]">Customer Success</p>
                    <p className="text-[11px] text-[#888] mt-1">Retenir et developper</p>
                  </div>
                  <div className="text-[18px] text-[#CCC] hidden md:block">=</div>
                  <div className="w-full md:w-[160px] rounded-lg bg-[#111] p-4 text-center">
                    <p className="text-[13px] font-semibold text-white">RevOps</p>
                    <p className="text-[11px] text-white/60 mt-1">Revenus previsibles</p>
                  </div>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Historique : de Sales Ops au RevOps</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Le RevOps n\u2019est pas apparu du jour au lendemain. C&apos;est l\u2019evolution naturelle de trois decennies d\u2019operations commerciales. Comprendre cette evolution permet de saisir pourquoi le RevOps est devenu incontournable.
              </p>

              {/* Timeline */}
              <div className="space-y-4 mb-6">
                <div className="flex gap-4 items-start">
                  <div className="w-[80px] shrink-0 text-right">
                    <span className="text-[12px] font-semibold text-[#FF7A59]">1990s</span>
                  </div>
                  <div className="w-px bg-[#E8E8E8] self-stretch" />
                  <div className="flex-1 pb-4">
                    <p className="text-[13px] font-semibold text-[#111]">Sales Operations</p>
                    <p className="text-[13px] text-[#666] leading-[1.7]">Les premieres equipes Sales Ops emergent dans les grandes entreprises americaines. Leur mission : optimiser les territoires, gerer la remuneration variable, administrer le CRM (Siebel, puis Salesforce des 1999). L&apos;approche est centree exclusivement sur les ventes.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-[80px] shrink-0 text-right">
                    <span className="text-[12px] font-semibold text-[#4B5EFC]">2010s</span>
                  </div>
                  <div className="w-px bg-[#E8E8E8] self-stretch" />
                  <div className="flex-1 pb-4">
                    <p className="text-[13px] font-semibold text-[#111]">Marketing Operations</p>
                    <p className="text-[13px] text-[#666] leading-[1.7]">L&apos;explosion du marketing digital cree un besoin d\u2019operations marketing. HubSpot, Marketo et Pardot democratisent l\u2019automation. Les Marketing Ops gerent le stack martech, les workflows, le scoring et l\u2019attribution. Mais ils travaillent souvent en silo par rapport aux Sales Ops.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-[80px] shrink-0 text-right">
                    <span className="text-[12px] font-semibold text-[#22C55E]">2019+</span>
                  </div>
                  <div className="w-px bg-[#E8E8E8] self-stretch" />
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-[#111]">Revenue Operations</p>
                    <p className="text-[13px] text-[#666] leading-[1.7]">Gartner, Forrester et SiriusDecisions popularisent le concept de Revenue Operations. La logique : unifier marketing ops, sales ops et CS ops sous une meme fonction pour eliminer les frictions du parcours client. En 2025, 75% des entreprises SaaS a plus forte croissance ont adopte un modele RevOps.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Les 3 piliers du RevOps</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Le RevOps repose sur trois piliers fondamentaux. Chacun est necessaire, aucun n\u2019est suffisant seul. C&apos;est leur articulation qui cree de la valeur.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl border border-[#E8E8E8] p-5">
                  <div className="w-8 h-8 rounded-lg bg-[#FF7A59]/10 flex items-center justify-center mb-3">
                    <span className="text-[12px] font-bold text-[#FF7A59]">P</span>
                  </div>
                  <p className="text-[13px] font-semibold text-[#111] mb-1">Processus</p>
                  <p className="text-[12px] text-[#888] leading-[1.6]">Standardiser le parcours lead-to-cash. Definir les etapes, les criteres de passage, les SLA entre equipes, les handoffs et les rituels d\u2019alignement. Sans processus clair, chaque equipe invente ses propres regles.</p>
                </div>
                <div className="rounded-xl border border-[#E8E8E8] p-5">
                  <div className="w-8 h-8 rounded-lg bg-[#4B5EFC]/10 flex items-center justify-center mb-3">
                    <span className="text-[12px] font-bold text-[#4B5EFC]">D</span>
                  </div>
                  <p className="text-[13px] font-semibold text-[#111] mb-1">Donnees</p>
                  <p className="text-[12px] text-[#888] leading-[1.6]">Creer une source de verite unique. Hygiene des donnees, normalisation des champs, enrichissement automatique, gouvernance. 91% des donnees CRM se degradent chaque annee. Sans donnees fiables, aucune decision n\u2019est pertinente.</p>
                </div>
                <div className="rounded-xl border border-[#E8E8E8] p-5">
                  <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center mb-3">
                    <span className="text-[12px] font-bold text-[#22C55E]">T</span>
                  </div>
                  <p className="text-[13px] font-semibold text-[#111] mb-1">Technologie</p>
                  <p className="text-[12px] text-[#888] leading-[1.6]">Rationaliser le stack. CRM comme hub central, integrations bi-directionnelles, automatisations, reporting unifie. L&apos;entreprise moyenne utilise 12 outils go-to-market. 40% des donnees se perdent entre les outils non connectes.</p>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">RevOps vs Sales Ops vs Marketing Ops</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                La confusion est frequente. Voici un tableau comparatif pour clarifier les differences fondamentales entre ces trois fonctions.
              </p>

              {/* Comparison table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#E8E8E8]">
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Critere</th>
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Sales Ops</th>
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Marketing Ops</th>
                      <th className="text-left py-3 text-[#FF7A59] font-semibold">RevOps</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#555]">
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Perimetre</td>
                      <td className="py-2.5 pr-4">Equipe commerciale</td>
                      <td className="py-2.5 pr-4">Equipe marketing</td>
                      <td className="py-2.5 text-[#111] font-medium">Cycle complet du revenu</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Metriques</td>
                      <td className="py-2.5 pr-4">Win rate, cycle, quota</td>
                      <td className="py-2.5 pr-4">MQL, CAC, attribution</td>
                      <td className="py-2.5 text-[#111] font-medium">NRR, LTV/CAC, velocity</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Outils</td>
                      <td className="py-2.5 pr-4">CRM, CPQ, Sales engagement</td>
                      <td className="py-2.5 pr-4">MAP, CMS, Analytics</td>
                      <td className="py-2.5 text-[#111] font-medium">Stack go-to-market unifie</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Reporting</td>
                      <td className="py-2.5 pr-4">Pipeline, forecasting</td>
                      <td className="py-2.5 pr-4">Attribution, ROI campagnes</td>
                      <td className="py-2.5 text-[#111] font-medium">Revenue intelligence end-to-end</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Rattachement</td>
                      <td className="py-2.5 pr-4">VP Sales</td>
                      <td className="py-2.5 pr-4">CMO</td>
                      <td className="py-2.5 text-[#111] font-medium">CRO / CEO</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Vision</td>
                      <td className="py-2.5 pr-4">Optimiser les ventes</td>
                      <td className="py-2.5 pr-4">Optimiser l\u2019acquisition</td>
                      <td className="py-2.5 text-[#111] font-medium">Optimiser le revenu global</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">L&apos;impact mesurable du RevOps</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Les donnees sont sans appel. Les entreprises qui ont adopte une approche RevOps surperforment systematiquement celles qui maintiennent des operations en silos.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4 text-center">
                  <p className="text-[24px] font-bold text-[#FF7A59]">+19%</p>
                  <p className="text-[11px] text-[#888] mt-1">Croissance du revenu</p>
                </div>
                <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4 text-center">
                  <p className="text-[24px] font-bold text-[#4B5EFC]">+15%</p>
                  <p className="text-[11px] text-[#888] mt-1">Profitabilite</p>
                </div>
                <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4 text-center">
                  <p className="text-[24px] font-bold text-[#22C55E]">+10%</p>
                  <p className="text-[11px] text-[#888] mt-1">Productivite des equipes</p>
                </div>
                <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4 text-center">
                  <p className="text-[24px] font-bold text-[#6C5CE7]">-30%</p>
                  <p className="text-[11px] text-[#888] mt-1">Cycle de vente</p>
                </div>
              </div>
              <p className="text-[12px] text-[#999] italic mb-2">Sources : Boston Consulting Group, Forrester, SiriusDecisions/Gartner</p>
              <p className="text-[14px] text-[#555] leading-[1.8]">
                Ces chiffres ne sont pas des promesses marketing. Ils s\u2019expliquent mecaniquement : quand les equipes partagent les memes donnees, les memes definitions et les memes objectifs, les frictions disparaissent. Les leads sont traites plus vite, les deals avancent sans blocage, et les clients sont mieux suivis. Le resultat est une machine revenue plus previsible et plus efficiente.
              </p>
            </div>

            <Connector />

            {/* ==================== CHAPITRE 2 ==================== */}
            <div id="chapitre-2" className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#FF7A59]/10 flex items-center justify-center text-[14px] font-bold text-[#FF7A59]">02</span>
                <div>
                  <h2 className="text-[22px] font-semibold text-[#111] leading-tight">Audit de votre situation actuelle</h2>
                  <p className="text-[12px] text-[#999]">Pages 10-17 -- Framework 80 points, diagnostic et quick wins</p>
                </div>
              </div>

              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Avant de construire quoi que ce soit, il faut comprendre ou vous en etes. Notre framework d\u2019audit en 80 points couvre les 8 dimensions critiques du RevOps. Chaque dimension est evaluee sur 10 points, pour un score total sur 80 ramene ensuite a une note sur 100.
              </p>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Le framework d\u2019audit en 80 points</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Ce framework est celui que nous utilisons chez Ceres lors de chaque engagement client. Il prend en moyenne 2 a 3 jours de travail, implique des entretiens avec les equipes marketing, sales et CS, et produit un diagnostic actionnable.
              </p>

              {/* 8 categories */}
              <div className="space-y-3 mb-6">
                {[
                  { cat: "1. Qualite des donnees CRM", pts: "10 pts", items: ["Taux de champs vides sur les contacts et deals", "Doublons : pourcentage de contacts et entreprises en double", "Normalisation des champs (pays, secteur, taille)", "Enrichissement automatique en place", "Processus de nettoyage regulier documente"], flags: "Plus de 30% de champs vides, aucune regle de deduplication", wins: "Fusionner les doublons, rendre les champs critiques obligatoires" },
                  { cat: "2. Processus de vente", pts: "10 pts", items: ["Pipeline stages definis avec criteres objectifs", "Deal stages utilises correctement (pas de deals stagnants)", "Processus de qualification documente (BANT, MEDDIC)", "Cycle de vente moyen mesure et suivi", "Processus de handoff marketing-sales formalise"], flags: "Plus de 40% des deals stagnent dans le meme stage depuis plus de 30 jours", wins: "Definir des criteres de sortie obligatoires par stage" },
                  { cat: "3. Stack technologique", pts: "10 pts", items: ["CRM comme source de verite unique", "Integrations fonctionnelles entre outils cles", "Pas de donnees en double entre systemes", "Automatisations en place (workflows, sequences)", "Documentation technique du stack existante"], flags: "Equipes qui gerent des donnees dans des fichiers Excel paralleles", wins: "Mapper les integrations existantes, identifier les flux casses" },
                  { cat: "4. Alignement des equipes", pts: "10 pts", items: ["Definitions communes MQL/SQL/Opportunity", "SLA marketing-sales en place", "Rituels d\u2019alignement (weekly, monthly review)", "Objectifs communs sur le revenu", "Feedback loop formalise sales vers marketing"], flags: "Marketing et sales n\u2019utilisent pas la meme definition de MQL", wins: "Organiser un atelier de 2h pour aligner les definitions" },
                  { cat: "5. Reporting et analytics", pts: "10 pts", items: ["Dashboards operationnels pour chaque equipe", "Reporting unifie du funnel (marketing a CS)", "Attribution marketing en place", "Forecasting formalise et suivi", "Metriques de retention et expansion suivies"], flags: "Les chiffres marketing et sales ne coincident pas sur le nombre de leads", wins: "Creer un dashboard funnel unifie dans HubSpot" },
                  { cat: "6. Lead management", pts: "10 pts", items: ["Lead scoring implemente et utilise", "Routing automatique des leads", "Temps de reponse aux leads mesure", "Nurturing en place pour les leads non prets", "Processus de recyclage des leads existant"], flags: "Temps de reponse moyen superieur a 24h sur les leads inbound", wins: "Mettre en place un routing automatique avec notification" },
                  { cat: "7. Customer success", pts: "10 pts", items: ["Onboarding client structure", "Health score en place", "Processus de renouvellement formalise", "Upsell/cross-sell identifie et suivi", "Churn predit et anticipe"], flags: "Aucun suivi de l\u2019onboarding, decouvertes de churn au moment du renouvellement", wins: "Creer un pipeline CS avec etapes d\u2019onboarding" },
                  { cat: "8. Gouvernance et adoption", pts: "10 pts", items: ["Responsable RevOps ou equivalent identifie", "Politique d\u2019utilisation du CRM documentee", "Taux d\u2019adoption du CRM superieur a 80%", "Formation reguliere des equipes", "Roadmap RevOps a 90 jours existante"], flags: "Moins de 50% des commerciaux remplissent le CRM correctement", wins: "Nommer un owner RevOps, meme a temps partiel" },
                ].map((c, i) => (
                  <div key={i} className="rounded-xl border border-[#F0F0F0] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[13px] font-semibold text-[#111]">{c.cat}</p>
                      <span className="text-[11px] font-medium text-[#FF7A59] bg-[#FF7A59]/10 px-2 py-0.5 rounded">{c.pts}</span>
                    </div>
                    <ul className="space-y-1 mb-3">
                      {c.items.map((item, j) => (
                        <li key={j} className="text-[12px] text-[#666] flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#CCC] mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-2 text-[11px]">
                      <div className="flex-1 rounded-lg bg-red-50 px-3 py-2">
                        <span className="font-semibold text-red-600">Red flags : </span>
                        <span className="text-red-700">{c.flags}</span>
                      </div>
                      <div className="flex-1 rounded-lg bg-green-50 px-3 py-2">
                        <span className="font-semibold text-green-600">Quick win : </span>
                        <span className="text-green-700">{c.wins}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Score gauge */}
              <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-6 mb-6">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4 text-center">Votre score de maturite RevOps</p>
                <div className="relative h-6 rounded-full bg-[#E8E8E8] overflow-hidden mb-3">
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: "25%", background: "linear-gradient(90deg, #EF4444, #F97316)" }} />
                  <div className="absolute inset-y-0 rounded-full" style={{ left: "25%", width: "25%", background: "linear-gradient(90deg, #F97316, #EAB308)" }} />
                  <div className="absolute inset-y-0 rounded-full" style={{ left: "50%", width: "25%", background: "linear-gradient(90deg, #EAB308, #22C55E)" }} />
                  <div className="absolute inset-y-0 rounded-full" style={{ left: "75%", width: "25%", background: "linear-gradient(90deg, #22C55E, #16A34A)" }} />
                </div>
                <div className="flex justify-between text-[10px] text-[#999]">
                  <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Les 4 niveaux de maturite</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="rounded-xl border-2 border-red-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <p className="text-[13px] font-semibold text-[#111]">Debutant (0-25)</p>
                  </div>
                  <p className="text-[12px] text-[#666] leading-[1.6]">Pas de processus formalise. CRM mal utilise ou inexistant. Equipes en silos complets. Donnees peu fiables. Reporting manuel et irregulier. Chaque commercial a ses propres methodes.</p>
                </div>
                <div className="rounded-xl border-2 border-orange-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500" />
                    <p className="text-[13px] font-semibold text-[#111]">En construction (25-50)</p>
                  </div>
                  <p className="text-[12px] text-[#666] leading-[1.6]">CRM en place mais mal configure. Quelques processus documentes. Debut de lead scoring. Dashboards basiques. Equipes communiquent mais sans cadre formel. Quick wins identifies mais non deployes.</p>
                </div>
                <div className="rounded-xl border-2 border-yellow-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-500" />
                    <p className="text-[13px] font-semibold text-[#111]">Structure (50-75)</p>
                  </div>
                  <p className="text-[12px] text-[#666] leading-[1.6]">Pipeline structure avec criteres. SLA en place. Scoring fonctionnel. Reporting unifie. Rituels reguliers entre equipes. Stack integre. Quelques automatisations. Donnees globalement propres.</p>
                </div>
                <div className="rounded-xl border-2 border-green-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <p className="text-[13px] font-semibold text-[#111]">Optimise (75-100)</p>
                  </div>
                  <p className="text-[12px] text-[#666] leading-[1.6]">Machine revenue previsible. Forecasting precis a plus ou moins 10%. Automatisations avancees. IA utilisee pour le scoring et les insights. Equipes parfaitement alignees. Iteration continue basee sur les donnees.</p>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Comment conduire l\u2019audit</h3>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#E8E8E8]">
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Parametre</th>
                      <th className="text-left py-3 text-[#999] font-semibold">Recommandation</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#555]">
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Qui implique</td><td className="py-2.5">Head of Sales, Head of Marketing, CS Manager, 2-3 commerciaux terrain, 1 SDR</td></tr>
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Duree</td><td className="py-2.5">2 a 3 jours (entretiens + analyse CRM + synthese)</td></tr>
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Frequence</td><td className="py-2.5">Complet tous les 6 mois, mini-audit trimestriel</td></tr>
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Format entretiens</td><td className="py-2.5">30 min par personne, grille de questions standardisee</td></tr>
                    <tr><td className="py-2.5 pr-4 font-medium text-[#111]">Livrables</td><td className="py-2.5">Score sur 100, top 5 quick wins, roadmap 90 jours priorisee</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[14px] text-[#555] leading-[1.8]">
                L&apos;audit n\u2019est pas une fin en soi. C&apos;est le point de depart de votre roadmap RevOps. L&apos;objectif est de produire un plan d\u2019action priorise par impact et facilite de mise en oeuvre. Commencez toujours par les quick wins qui generent de la confiance aupres des equipes.
              </p>
            </div>

            <Connector />

            {/* ==================== CHAPITRE 3 ==================== */}
            <div id="chapitre-3" className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#FF7A59]/10 flex items-center justify-center text-[14px] font-bold text-[#FF7A59]">03</span>
                <div>
                  <h2 className="text-[22px] font-semibold text-[#111] leading-tight">Definir votre ICP et personas</h2>
                  <p className="text-[12px] text-[#999]">Pages 18-23 -- Framework ICP, buyer personas et anti-personas</p>
                </div>
              </div>

              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                L&apos;Ideal Customer Profile (ICP) est la pierre angulaire de toute strategie RevOps. Sans ICP clair, vos equipes marketing generent des leads non qualifies, vos commerciaux perdent du temps sur des deals sans potentiel, et votre customer success gere des clients qui ne renouvellent pas. Tout commence par la definition precise de votre client ideal.
              </p>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Le framework ICP Ceres</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Un ICP se construit sur deux dimensions : les criteres firmographiques (qui est l\u2019entreprise) et les signaux comportementaux (comment se comporte-t-elle). La combinaison des deux permet de predire la probabilite qu&apos;une entreprise devienne un bon client.
              </p>

              {/* ICP Card mockup */}
              <div className="rounded-xl border-2 border-[#FF7A59]/30 bg-[#FF7A59]/5 p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#FF7A59] flex items-center justify-center">
                    <span className="text-white text-[14px] font-bold">ICP</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-[#111]">Exemple : SaaS B2B en croissance</p>
                    <p className="text-[11px] text-[#888]">Ideal Customer Profile -- Ceres</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-semibold text-[#FF7A59] uppercase tracking-wider mb-2">Firmographique</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[12px]"><span className="text-[#666]">Secteur</span><span className="text-[#111] font-medium">SaaS B2B, Fintech, Martech</span></div>
                      <div className="flex justify-between text-[12px]"><span className="text-[#666]">Taille</span><span className="text-[#111] font-medium">20 a 200 salaries</span></div>
                      <div className="flex justify-between text-[12px]"><span className="text-[#666]">Chiffre d\u2019affaires</span><span className="text-[#111] font-medium">1M a 20M EUR ARR</span></div>
                      <div className="flex justify-between text-[12px]"><span className="text-[#666]">Geographie</span><span className="text-[#111] font-medium">France, Benelux, DACH</span></div>
                      <div className="flex justify-between text-[12px]"><span className="text-[#666]">Stack techno</span><span className="text-[#111] font-medium">HubSpot ou Salesforce</span></div>
                      <div className="flex justify-between text-[12px]"><span className="text-[#666]">Equipe commerciale</span><span className="text-[#111] font-medium">3 a 30 commerciaux</span></div>
                      <div className="flex justify-between text-[12px]"><span className="text-[#666]">Financement</span><span className="text-[#111] font-medium">Serie A a Serie C</span></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#4B5EFC] uppercase tracking-wider mb-2">Signaux comportementaux</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[12px]"><span className="text-[#666]">Signal fort</span><span className="text-[#111] font-medium">Recrutement Head of RevOps</span></div>
                      <div className="flex justify-between text-[12px]"><span className="text-[#666]">Signal fort</span><span className="text-[#111] font-medium">Migration CRM annoncee</span></div>
                      <div className="flex justify-between text-[12px]"><span className="text-[#666]">Signal moyen</span><span className="text-[#111] font-medium">Levee de fonds recente</span></div>
                      <div className="flex justify-between text-[12px]"><span className="text-[#666]">Signal moyen</span><span className="text-[#111] font-medium">Recrutement SDR/AE</span></div>
                      <div className="flex justify-between text-[12px]"><span className="text-[#666]">Signal faible</span><span className="text-[#111] font-medium">Visite page pricing</span></div>
                      <div className="flex justify-between text-[12px]"><span className="text-[#666]">Signal faible</span><span className="text-[#111] font-medium">Telechargement de contenu</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Buyer persona template</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                L&apos;ICP definit l\u2019entreprise ideale. Le buyer persona definit la personne a qui vous parlez dans cette entreprise. Vous aurez generalement 2 a 4 personas par ICP : le decisionnaire, l\u2019influenceur, l\u2019utilisateur final et parfois le bloqueur.
              </p>

              <div className="rounded-xl border border-[#E8E8E8] p-5 mb-6">
                <p className="text-[13px] font-semibold text-[#111] mb-3">Persona : &quot;Sophie, Head of Sales&quot;</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[12px]">
                  <div>
                    <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Demographics</p>
                    <ul className="space-y-1.5 text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#CCC] mt-1.5 shrink-0" />35-45 ans, diplome ecole de commerce</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#CCC] mt-1.5 shrink-0" />Manage 5 a 15 commerciaux</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#CCC] mt-1.5 shrink-0" />Reporte au CEO ou CRO</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#CCC] mt-1.5 shrink-0" />LinkedIn, podcasts business, webinaires</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Objectifs</p>
                    <ul className="space-y-1.5 text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#22C55E] mt-1.5 shrink-0" />Atteindre les quotas trimestriels</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#22C55E] mt-1.5 shrink-0" />Ameliorer la previsibilite du pipeline</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#22C55E] mt-1.5 shrink-0" />Reduire le cycle de vente</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#22C55E] mt-1.5 shrink-0" />Retenir ses meilleurs commerciaux</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Challenges</p>
                    <ul className="space-y-1.5 text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />Leads marketing de mauvaise qualite</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />CRM mal rempli par les equipes</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />Pas de visibilite sur le pipeline reel</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" />Processus de vente inconsistant</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Processus d\u2019achat</p>
                    <ul className="space-y-1.5 text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#4B5EFC] mt-1.5 shrink-0" />Recherche Google + recommandations pairs</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#4B5EFC] mt-1.5 shrink-0" />Evalue 2-3 solutions en parallele</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#4B5EFC] mt-1.5 shrink-0" />Decision en 30-60 jours</li>
                      <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#4B5EFC] mt-1.5 shrink-0" />Budget valide par le CEO si &gt; 5K EUR/mois</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Construire l\u2019ICP a partir des donnees</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Ne definissez jamais votre ICP sur des intuitions. Utilisez vos donnees existantes. Voici la methode en 4 etapes que nous recommandons :
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#FF7A59]/10 flex items-center justify-center text-[11px] font-bold text-[#FF7A59] shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#111]">Analysez vos 20 meilleurs clients</p>
                    <p className="text-[12px] text-[#666] leading-[1.6]">Classez vos clients par LTV, NPS et facilite de vente. Prenez le top 20 (ou le top 20%). Pour chacun, notez le secteur, la taille, le CA, le stack techno, le cycle de vente, le panier moyen, le taux de retention.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#FF7A59]/10 flex items-center justify-center text-[11px] font-bold text-[#FF7A59] shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#111]">Identifiez les patterns</p>
                    <p className="text-[12px] text-[#666] leading-[1.6]">Quels traits reviennent le plus souvent ? Taille d\u2019equipe ? Secteur ? Maturite technologique ? Budget ? Phase de croissance ? Ce sont ces patterns qui deviennent vos criteres ICP.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#FF7A59]/10 flex items-center justify-center text-[11px] font-bold text-[#FF7A59] shrink-0 mt-0.5">3</span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#111]">Validez avec vos pires clients</p>
                    <p className="text-[12px] text-[#666] leading-[1.6]">Faites le meme exercice avec vos 20 pires clients (churn, NPS bas, cycle de vente tres long). Les criteres qui les distinguent de vos meilleurs clients deviennent vos filtres negatifs.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#FF7A59]/10 flex items-center justify-center text-[11px] font-bold text-[#FF7A59] shrink-0 mt-0.5">4</span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#111]">Documentez et diffusez</p>
                    <p className="text-[12px] text-[#666] leading-[1.6]">Formalisez l\u2019ICP dans un document partage. Chaque commercial, chaque SDR, chaque marketeur doit pouvoir le citer de memoire. Mettez-le a jour tous les 6 mois en fonction de vos nouvelles donnees.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Les anti-personas : qui NE PAS cibler</h3>
              <div className="rounded-xl bg-[#111] p-5 mb-2">
                <p className="text-[13px] text-white font-semibold mb-3">Definir vos anti-personas est aussi important que definir votre ICP. Voici les profils a exclure systematiquement :</p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">--</span>
                    <p className="text-[12px] text-white/60"><span className="text-white/90 font-medium">Trop petits :</span> entreprises sous votre seuil de rentabilite (ex. : moins de 10 salaries si votre ACV est superieur a 10K)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">--</span>
                    <p className="text-[12px] text-white/60"><span className="text-white/90 font-medium">Mauvais secteur :</span> secteurs ou votre solution ne genere pas de valeur demontree (ex. : associations, administrations publiques si vous etes B2B SaaS)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">--</span>
                    <p className="text-[12px] text-white/60"><span className="text-white/90 font-medium">Pas de budget :</span> enterprises en pre-revenue ou en restructuration financiere</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">--</span>
                    <p className="text-[12px] text-white/60"><span className="text-white/90 font-medium">Stack incompatible :</span> entreprises utilisant un CRM custom ou un ERP monolithique sans API</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">--</span>
                    <p className="text-[12px] text-white/60"><span className="text-white/90 font-medium">Cycle trop long :</span> grands comptes avec des cycles de decision superieurs a 12 mois si votre tresorerie ne le permet pas</p>
                  </div>
                </div>
              </div>
            </div>

            <Connector />

            {/* ==================== CHAPITRE 4 ==================== */}
            <div id="chapitre-4" className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#FF7A59]/10 flex items-center justify-center text-[14px] font-bold text-[#FF7A59]">04</span>
                <div>
                  <h2 className="text-[22px] font-semibold text-[#111] leading-tight">Aligner Marketing, Sales et CS</h2>
                  <p className="text-[12px] text-[#999]">Pages 24-29 -- SLA, definitions communes et rituels d\u2019alignement</p>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Le cout du desalignement</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Le desalignement entre marketing et sales coute cher. Selon HubSpot, les entreprises desalignees perdent en moyenne 10% de leur chiffre d\u2019affaires chaque annee en leads mal traites, en efforts marketing gaspilles et en opportunites manquees. Selon LinkedIn, 90% des professionnels marketing et sales reconnaissent un desalignement dans leur strategie, leur contenu ou leurs processus.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-center">
                  <p className="text-[22px] font-bold text-red-600">10%</p>
                  <p className="text-[11px] text-red-700 mt-1">du CA perdu chaque annee a cause du desalignement</p>
                </div>
                <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-center">
                  <p className="text-[22px] font-bold text-red-600">60-70%</p>
                  <p className="text-[11px] text-red-700 mt-1">du contenu marketing jamais utilise par les sales</p>
                </div>
                <div className="rounded-xl bg-red-50 border border-red-100 p-4 text-center">
                  <p className="text-[22px] font-bold text-red-600">79%</p>
                  <p className="text-[11px] text-red-700 mt-1">des leads marketing jamais convertis en ventes</p>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Le SLA Marketing-Sales</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Le Service Level Agreement (SLA) est un contrat interne entre les equipes marketing et sales. Il definit les engagements de chaque partie. C&apos;est le document le plus important de votre strategie RevOps. Sans SLA, les accusations croisees persistent : &quot;les leads ne sont pas qualifies&quot; vs &quot;les commerciaux ne traitent pas les leads&quot;.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl border border-[#4B5EFC]/20 bg-[#4B5EFC]/5 p-5">
                  <p className="text-[13px] font-semibold text-[#4B5EFC] mb-3">Engagements Marketing</p>
                  <div className="space-y-2.5">
                    <div>
                      <p className="text-[12px] font-medium text-[#111]">Volume</p>
                      <p className="text-[11px] text-[#666]">Generer X MQL par mois (avec objectif par canal)</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#111]">Qualite</p>
                      <p className="text-[11px] text-[#666]">Taux de conversion MQL-to-SQL superieur a 30%</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#111]">Delai</p>
                      <p className="text-[11px] text-[#666]">Transfert du MQL aux sales en moins de 2h ouvrables</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#111]">Donnees</p>
                      <p className="text-[11px] text-[#666]">Champs obligatoires remplis : societe, poste, email, source</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#111]">Contenu</p>
                      <p className="text-[11px] text-[#666]">Fournir 2 cas clients et 1 battle card par trimestre</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-[#FF7A59]/20 bg-[#FF7A59]/5 p-5">
                  <p className="text-[13px] font-semibold text-[#FF7A59] mb-3">Engagements Sales</p>
                  <div className="space-y-2.5">
                    <div>
                      <p className="text-[12px] font-medium text-[#111]">Vitesse</p>
                      <p className="text-[11px] text-[#666]">Premier contact dans les 5 min pour les leads inbound hot</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#111]">Perseverance</p>
                      <p className="text-[11px] text-[#666]">Minimum 6 tentatives de contact en 14 jours avant disqualification</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#111]">Feedback</p>
                      <p className="text-[11px] text-[#666]">Renseigner le motif de disqualification dans le CRM sous 48h</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#111]">CRM</p>
                      <p className="text-[11px] text-[#666]">Mettre a jour le stage du deal dans les 24h suivant un changement</p>
                    </div>
                    <div>
                      <p className="text-[12px] font-medium text-[#111]">Reporting</p>
                      <p className="text-[11px] text-[#666]">Reporter sur la qualite des leads chaque semaine (note /5 par source)</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Definitions communes : le vocabulaire unifie</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Le probleme numero un du desalignement : les equipes n\u2019utilisent pas les memes mots pour les memes choses. Voici les definitions qui doivent etre unanimement acceptees.
              </p>

              {/* Funnel definitions visual */}
              <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-6 mb-6">
                <div className="space-y-3">
                  {[
                    { stage: "Lead", color: "#E8E8E8", text: "#666", def: "Tout contact identifie dans votre CRM. A fourni au moins un moyen de contact (email, telephone). Aucune qualification encore realisee.", crit: "Email valide + source identifiee" },
                    { stage: "MQL", color: "#4B5EFC", text: "white", def: "Marketing Qualified Lead. Lead ayant atteint le seuil de scoring defini. A montre un interet suffisant (engagement) et correspond au profil cible (fit).", crit: "Scoring >= 50 points (fit + engagement combines)" },
                    { stage: "SQL", color: "#FF7A59", text: "white", def: "Sales Qualified Lead. MQL accepte par les sales apres un premier contact. Le besoin, le budget et le timing ont ete valides par un SDR ou un AE.", crit: "BANT valide : Budget, Autorite, Need, Timing" },
                    { stage: "Opportunity", color: "#6C5CE7", text: "white", def: "Prospect engage dans un processus d\u2019achat actif. Une proposition commerciale a ete envoyee ou un POC a ete lance.", crit: "Proposition envoyee + decision attendue sous 60 jours" },
                    { stage: "Customer", color: "#22C55E", text: "white", def: "Contrat signe, revenu comptabilise. Le client entre dans le cycle d\u2019onboarding et de customer success.", crit: "Contrat signe + premier paiement recu" },
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-3 items-start">
                      <div className="w-full sm:w-[100px] shrink-0 rounded-lg py-2 px-3 text-center" style={{ background: s.color }}>
                        <span className="text-[12px] font-bold" style={{ color: s.text }}>{s.stage}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[12px] text-[#555] leading-[1.6]">{s.def}</p>
                        <p className="text-[11px] text-[#999] mt-1">Critere de passage : {s.crit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Cadence des rituels d\u2019alignement</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#E8E8E8]">
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Rituel</th>
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Frequence</th>
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Participants</th>
                      <th className="text-left py-3 text-[#999] font-semibold">Agenda</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#555]">
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Lead review</td>
                      <td className="py-2.5 pr-4">Hebdomadaire (30 min)</td>
                      <td className="py-2.5 pr-4">Marketing + SDR</td>
                      <td className="py-2.5">Volume MQL, qualite par source, feedback sur les leads de la semaine</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Pipeline review</td>
                      <td className="py-2.5 pr-4">Hebdomadaire (45 min)</td>
                      <td className="py-2.5 pr-4">Sales Manager + AE</td>
                      <td className="py-2.5">Deals en cours, blocages, next steps, forecast update</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Revenue review</td>
                      <td className="py-2.5 pr-4">Mensuelle (1h)</td>
                      <td className="py-2.5 pr-4">Marketing + Sales + CS</td>
                      <td className="py-2.5">KPIs funnel complet, SLA respect, churn analysis, actions correctives</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-[#111]">OKR review</td>
                      <td className="py-2.5 pr-4">Trimestrielle (2h)</td>
                      <td className="py-2.5 pr-4">Leadership + RevOps</td>
                      <td className="py-2.5">Bilan OKR, ajustement des objectifs, roadmap RevOps Q+1</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">La boucle de feedback Sales vers Marketing</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-2">
                Le feedback loop est le mecanisme le plus sous-estime de l\u2019alignement. Les commerciaux sont en premiere ligne : ils savent quels arguments fonctionnent, quelles objections reviennent, et quels contenus manquent. Ce retour doit etre systematise, pas laisse au hasard d\u2019une conversation de couloir.
              </p>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Implementez un champ &quot;Qualite du lead&quot; (note de 1 a 5) obligatoire dans le CRM a chaque disqualification ou conversion. Ajoutez un champ texte libre &quot;Feedback pour le marketing&quot;. Revoyez ces donnees en lead review hebdomadaire. C&apos;est ainsi que le marketing ajuste ses campagnes, son contenu et son scoring en continu.
              </p>

              {/* Feedback loop visual */}
              <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-6">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4 text-center">Boucle de feedback continue</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                  <div className="rounded-lg bg-[#4B5EFC]/10 border border-[#4B5EFC]/20 px-4 py-3 text-center">
                    <p className="text-[12px] font-semibold text-[#4B5EFC]">Marketing</p>
                    <p className="text-[10px] text-[#888]">Genere les MQL</p>
                  </div>
                  <span className="text-[#CCC] text-[16px]">--&gt;</span>
                  <div className="rounded-lg bg-[#FF7A59]/10 border border-[#FF7A59]/20 px-4 py-3 text-center">
                    <p className="text-[12px] font-semibold text-[#FF7A59]">Sales</p>
                    <p className="text-[10px] text-[#888]">Qualifie et convertit</p>
                  </div>
                  <span className="text-[#CCC] text-[16px]">--&gt;</span>
                  <div className="rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20 px-4 py-3 text-center">
                    <p className="text-[12px] font-semibold text-[#22C55E]">CS</p>
                    <p className="text-[10px] text-[#888]">Onboard et retient</p>
                  </div>
                </div>
                <div className="flex justify-center mt-3">
                  <div className="rounded-lg bg-[#111] px-4 py-2">
                    <p className="text-[11px] text-white/80 text-center">Feedback : qualite, objections, besoins contenu</p>
                  </div>
                </div>
              </div>
            </div>

            <Connector />

            {/* ==================== CHAPITRE 5 ==================== */}
            <div id="chapitre-5" className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#FF7A59]/10 flex items-center justify-center text-[14px] font-bold text-[#FF7A59]">05</span>
                <div>
                  <h2 className="text-[22px] font-semibold text-[#111] leading-tight">Construire votre funnel</h2>
                  <p className="text-[12px] text-[#999]">Pages 30-35 -- Stages, criteres de passage, benchmarks et automations</p>
                </div>
              </div>

              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Le funnel RevOps est different d\u2019un funnel marketing classique. Il couvre l\u2019integralite du parcours : de la premiere visite anonyme jusqu&apos;a l\u2019advocacy post-achat. Chaque stage a des criteres objectifs d\u2019entree et de sortie, des taux de conversion cibles, et des automatisations associees.
              </p>

              {/* CSS Funnel visual */}
              <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-6 mb-6">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4 text-center">Le funnel RevOps complet</p>
                <div className="space-y-2 max-w-[500px] mx-auto">
                  {[
                    { stage: "Visitor", pct: "100%", conv: "", bg: "#E8E8E8", w: "100%" },
                    { stage: "Lead", pct: "3-5%", conv: "Visitor-to-Lead : 3-5%", bg: "#CBD5E1", w: "85%" },
                    { stage: "MQL", pct: "15-25%", conv: "Lead-to-MQL : 15-25%", bg: "#4B5EFC", w: "70%" },
                    { stage: "SQL", pct: "30-40%", conv: "MQL-to-SQL : 30-40%", bg: "#FF7A59", w: "55%" },
                    { stage: "Opportunity", pct: "40-60%", conv: "SQL-to-Opp : 40-60%", bg: "#6C5CE7", w: "40%" },
                    { stage: "Customer", pct: "20-35%", conv: "Opp-to-Customer : 20-35%", bg: "#22C55E", w: "28%" },
                    { stage: "Advocate", pct: "10-20%", conv: "Customer-to-Advocate : 10-20%", bg: "#16A34A", w: "18%" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="rounded-md py-2 px-3 text-center" style={{ width: s.w, background: s.bg, minWidth: "120px" }}>
                        <span className="text-[12px] font-bold text-white">{s.stage}</span>
                      </div>
                      <span className="text-[10px] text-[#999] whitespace-nowrap">{s.conv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Detail de chaque stage</h3>

              <div className="space-y-4 mb-6">
                {[
                  { stage: "Visitor", def: "Utilisateur anonyme qui visite votre site. Non identifie dans le CRM.", critere: "Page vue sur le site, evenement trackeur", benchmark: "Taux de conversion en lead : 3-5% (B2B SaaS)", auto: "Tracking analytics, pixels de retargeting, chatbot proactif si plus de 3 pages vues" },
                  { stage: "Lead", def: "Contact identifie. A rempli un formulaire, telecharge un contenu ou s\u2019est inscrit a un webinaire. Aucune qualification encore effectuee.", critere: "Email valide + au moins un point de contact", benchmark: "Taux de conversion en MQL : 15-25%", auto: "Email de bienvenue automatique, sequence de nurturing, enrichissement CRM (Clearbit, Apollo)" },
                  { stage: "MQL", def: "Marketing Qualified Lead. A atteint le seuil de scoring combine (fit + engagement). Pret a etre transmis aux ventes.", critere: "Score >= 50 points selon la grille definie au chapitre 6", benchmark: "Taux de conversion en SQL : 30-40%", auto: "Notification Slack a l\u2019equipe SDR, creation de tache dans le CRM, ajout a la sequence de contact" },
                  { stage: "SQL", def: "Sales Qualified Lead. Un SDR ou AE a valide le besoin, le budget, l\u2019autorite et le timing par un premier echange.", critere: "BANT valide (ou MEDDIC pour les deals complexes)", benchmark: "Taux de conversion en opportunite : 40-60%", auto: "Creation automatique de l\u2019opportunite dans le pipeline, assignation a l\u2019AE via routing rules" },
                  { stage: "Opportunity", def: "Prospect engage dans un cycle d\u2019achat actif. Proposition envoyee ou POC en cours.", critere: "Proposition commerciale envoyee + prochaines etapes definies", benchmark: "Taux de conversion en customer : 20-35%", auto: "Alerte si deal stagnant depuis plus de 14 jours, rappel de relance automatique, mise a jour du forecast" },
                  { stage: "Customer", def: "Contrat signe, revenu actif. Le client est dans le cycle de customer success.", critere: "Contrat signe + paiement recu ou engagements confirmes", benchmark: "Retention nette : 90-120% (NRR)", auto: "Trigger de la sequence d\u2019onboarding, creation du pipeline CS, alerte au CSM" },
                  { stage: "Advocate", def: "Client satisfait qui genere du revenu indirect : referrals, temoignages, etudes de cas.", critere: "NPS >= 9, reference active, etude de cas publiee", benchmark: "Taux de referral actif : 10-20% de la base client", auto: "Demande automatique de NPS a J+90, proposition de programme de referral" },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl border border-[#F0F0F0] p-4">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">{s.stage}</p>
                    <p className="text-[12px] text-[#666] leading-[1.6] mb-2">{s.def}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                      <div className="rounded-lg bg-[#FAFAFA] px-3 py-2"><span className="font-medium text-[#111]">Critere : </span><span className="text-[#666]">{s.critere}</span></div>
                      <div className="rounded-lg bg-[#FAFAFA] px-3 py-2"><span className="font-medium text-[#111]">Benchmark : </span><span className="text-[#666]">{s.benchmark}</span></div>
                      <div className="rounded-lg bg-[#FAFAFA] px-3 py-2"><span className="font-medium text-[#111]">Automation : </span><span className="text-[#666]">{s.auto}</span></div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Erreurs classiques de construction de funnel</h3>
              <div className="rounded-xl bg-[#111] p-5">
                <div className="space-y-3">
                  {[
                    { err: "Trop de stages", desc: "Un funnel avec 12 stages cree de la confusion. 5 a 7 stages suffisent pour la plupart des entreprises B2B." },
                    { err: "Pas de criteres objectifs", desc: "Si le passage d\u2019un stage a l\u2019autre depend du feeling du commercial, votre pipeline n\u2019est pas fiable. Chaque transition doit avoir un critere mesurable." },
                    { err: "Pas de pipeline CS", desc: "Le funnel ne s\u2019arrete pas a la signature. Le pipeline customer success (onboarding, adoption, expansion, renouvellement) est essentiel." },
                    { err: "Ne pas mesurer le temps par stage", desc: "Connaitre le temps moyen a chaque etape permet d\u2019identifier les goulots d\u2019etranglement et de predire le revenu." },
                    { err: "Ignorer les deals perdus", desc: "Analyser les raisons de perte par stage revele des patterns : pricing, timing, concurrence, bad fit. Ces donnees sont precieuses pour le marketing et le produit." },
                  ].map((e, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-[10px] font-bold text-red-400 shrink-0 mt-0.5">{i + 1}</span>
                      <div>
                        <p className="text-[12px] font-semibold text-white">{e.err}</p>
                        <p className="text-[11px] text-white/60 leading-[1.6]">{e.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Connector />

            {/* ==================== CHAPITRE 6 ==================== */}
            <div id="chapitre-6" className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#FF7A59]/10 flex items-center justify-center text-[14px] font-bold text-[#FF7A59]">06</span>
                <div>
                  <h2 className="text-[22px] font-semibold text-[#111] leading-tight">Lead Scoring : Fit + Engagement</h2>
                  <p className="text-[12px] text-[#999]">Pages 36-41 -- Grille de scoring, seuils et implementation HubSpot</p>
                </div>
              </div>

              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Le lead scoring est le moteur de votre machine de qualification. Il permet de prioriser les leads en combinant deux dimensions : le Fit Score (est-ce que ce lead correspond a votre ICP) et l\u2019Engagement Score (est-ce que ce lead montre un interet reel pour votre solution). Seuls les leads qui scorent haut sur les deux dimensions meritent l\u2019attention immediate des commerciaux.
              </p>

              {/* Matrix visual */}
              <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-6 mb-6">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4 text-center">Matrice Fit x Engagement</p>
                <div className="grid grid-cols-3 gap-2 max-w-[400px] mx-auto">
                  <div className="text-[10px] text-[#999] flex items-end justify-center pb-1">Fit eleve</div>
                  <div className="rounded-lg bg-yellow-100 border border-yellow-200 p-3 text-center">
                    <p className="text-[11px] font-semibold text-yellow-700">Nurture</p>
                    <p className="text-[9px] text-yellow-600">Bon profil, peu engage</p>
                  </div>
                  <div className="rounded-lg bg-green-100 border border-green-200 p-3 text-center">
                    <p className="text-[11px] font-semibold text-green-700">Hot Lead</p>
                    <p className="text-[9px] text-green-600">Ideal : transferer aux sales</p>
                  </div>
                  <div className="text-[10px] text-[#999] flex items-end justify-center pb-1">Fit faible</div>
                  <div className="rounded-lg bg-red-100 border border-red-200 p-3 text-center">
                    <p className="text-[11px] font-semibold text-red-700">Deprioritiser</p>
                    <p className="text-[9px] text-red-600">Mauvais fit, pas engage</p>
                  </div>
                  <div className="rounded-lg bg-orange-100 border border-orange-200 p-3 text-center">
                    <p className="text-[11px] font-semibold text-orange-700">Evaluer</p>
                    <p className="text-[9px] text-orange-600">Engage mais mauvais profil</p>
                  </div>
                  <div />
                  <div className="text-[10px] text-[#999] text-center">Engagement faible</div>
                  <div className="text-[10px] text-[#999] text-center">Engagement eleve</div>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Grille de Fit Scoring (50 points maximum)</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#E8E8E8]">
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Critere</th>
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Match parfait</th>
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Match partiel</th>
                      <th className="text-left py-3 text-[#999] font-semibold">Pas de match</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#555]">
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Poste / Role</td>
                      <td className="py-2.5 pr-4"><span className="text-green-600 font-medium">+15 pts</span> (VP Sales, CRO, Head of Revenue)</td>
                      <td className="py-2.5 pr-4"><span className="text-yellow-600 font-medium">+8 pts</span> (Sales Manager, Marketing Director)</td>
                      <td className="py-2.5"><span className="text-red-600 font-medium">+0 pts</span> (Stagiaire, etudiant)</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Taille entreprise</td>
                      <td className="py-2.5 pr-4"><span className="text-green-600 font-medium">+10 pts</span> (20-200 salaries)</td>
                      <td className="py-2.5 pr-4"><span className="text-yellow-600 font-medium">+5 pts</span> (10-20 ou 200-500)</td>
                      <td className="py-2.5"><span className="text-red-600 font-medium">+0 pts</span> (&lt;10 ou &gt;5000)</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Secteur</td>
                      <td className="py-2.5 pr-4"><span className="text-green-600 font-medium">+10 pts</span> (SaaS, Tech, Fintech)</td>
                      <td className="py-2.5 pr-4"><span className="text-yellow-600 font-medium">+5 pts</span> (Services B2B, Conseil)</td>
                      <td className="py-2.5"><span className="text-red-600 font-medium">+0 pts</span> (B2C, Administration)</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Budget estime</td>
                      <td className="py-2.5 pr-4"><span className="text-green-600 font-medium">+10 pts</span> (&gt;2K EUR/mois)</td>
                      <td className="py-2.5 pr-4"><span className="text-yellow-600 font-medium">+5 pts</span> (500-2000 EUR/mois)</td>
                      <td className="py-2.5"><span className="text-red-600 font-medium">+0 pts</span> (&lt;500 EUR/mois)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Geographie</td>
                      <td className="py-2.5 pr-4"><span className="text-green-600 font-medium">+5 pts</span> (France)</td>
                      <td className="py-2.5 pr-4"><span className="text-yellow-600 font-medium">+3 pts</span> (Europe)</td>
                      <td className="py-2.5"><span className="text-red-600 font-medium">+0 pts</span> (Hors zone)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Grille d\u2019Engagement Scoring (50 points maximum)</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#E8E8E8]">
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Action</th>
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Points</th>
                      <th className="text-left py-3 text-[#999] font-semibold">Logique</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#555]">
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Visite page pricing</td><td className="py-2.5 pr-4 text-green-600 font-medium">+15 pts</td><td className="py-2.5">Signal d\u2019intention d\u2019achat tres fort</td></tr>
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Demande de demo</td><td className="py-2.5 pr-4 text-green-600 font-medium">+15 pts</td><td className="py-2.5">Intent direct, pret a acheter</td></tr>
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Telechargement guide/ebook</td><td className="py-2.5 pr-4 text-yellow-600 font-medium">+8 pts</td><td className="py-2.5">Interet pour le sujet, phase de recherche</td></tr>
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Inscription webinaire</td><td className="py-2.5 pr-4 text-yellow-600 font-medium">+8 pts</td><td className="py-2.5">Engagement temps significatif</td></tr>
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Ouverture email (x3+)</td><td className="py-2.5 pr-4 text-yellow-600 font-medium">+5 pts</td><td className="py-2.5">Engagement regulier avec la marque</td></tr>
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Clic email</td><td className="py-2.5 pr-4 text-yellow-600 font-medium">+5 pts</td><td className="py-2.5">Action deliberee, pas juste ouverture passive</td></tr>
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Visite blog (3+ articles)</td><td className="py-2.5 pr-4 text-[#999] font-medium">+3 pts</td><td className="py-2.5">Curiosite, debut d\u2019education</td></tr>
                    <tr><td className="py-2.5 pr-4 font-medium text-[#111]">Visite page d\u2019accueil</td><td className="py-2.5 pr-4 text-[#999] font-medium">+2 pts</td><td className="py-2.5">Premier contact, faible signal</td></tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Regles de scoring negatif</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-3">
                Le scoring negatif est aussi important que le scoring positif. Il permet de desqualifier les leads qui ne sont pas pertinents, meme s\u2019ils sont tres engages.
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#E8E8E8]">
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Critere</th>
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Points</th>
                      <th className="text-left py-3 text-[#999] font-semibold">Raison</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#555]">
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Email generique (gmail, yahoo)</td><td className="py-2.5 pr-4 text-red-600 font-medium">-10 pts</td><td className="py-2.5">Generalement pas un acheteur B2B serieux</td></tr>
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Concurrent identifie</td><td className="py-2.5 pr-4 text-red-600 font-medium">-50 pts</td><td className="py-2.5">Disqualification automatique</td></tr>
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Desinscription email</td><td className="py-2.5 pr-4 text-red-600 font-medium">-15 pts</td><td className="py-2.5">Signal de desengagement fort</td></tr>
                    <tr className="border-b border-[#F5F5F5]"><td className="py-2.5 pr-4 font-medium text-[#111]">Aucune activite depuis 90 jours</td><td className="py-2.5 pr-4 text-red-600 font-medium">-20 pts</td><td className="py-2.5">Decay temporel, le lead refroidit</td></tr>
                    <tr><td className="py-2.5 pr-4 font-medium text-[#111]">Page carrieres visitee</td><td className="py-2.5 pr-4 text-red-600 font-medium">-5 pts</td><td className="py-2.5">Cherche un emploi, pas une solution</td></tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Seuils de qualification</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                <div className="rounded-xl border-2 border-yellow-200 p-4 text-center">
                  <p className="text-[20px] font-bold text-yellow-600">50 pts</p>
                  <p className="text-[12px] font-semibold text-[#111] mt-1">Seuil MQL</p>
                  <p className="text-[11px] text-[#888] mt-1">Le lead entre dans la sequence de nurturing avancee et est visible par les SDR</p>
                </div>
                <div className="rounded-xl border-2 border-orange-200 p-4 text-center">
                  <p className="text-[20px] font-bold text-[#FF7A59]">70 pts</p>
                  <p className="text-[12px] font-semibold text-[#111] mt-1">Seuil SQL</p>
                  <p className="text-[11px] text-[#888] mt-1">Le lead est assigne a un AE pour qualification BANT dans les 24h</p>
                </div>
                <div className="rounded-xl border-2 border-red-200 p-4 text-center">
                  <p className="text-[20px] font-bold text-red-600">85 pts</p>
                  <p className="text-[12px] font-semibold text-[#111] mt-1">Hot Lead</p>
                  <p className="text-[11px] text-[#888] mt-1">Notification immediate au sales manager. Contact dans les 5 minutes</p>
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Implementation dans HubSpot : etape par etape</h3>
              <div className="space-y-3 mb-2">
                {[
                  { step: "1. Creer les proprietes", desc: "Dans HubSpot, allez dans Settings > Properties. Creez deux proprietes de type Score : &quot;Fit Score&quot; et &quot;Engagement Score&quot;. Creez une troisieme propriete calculee &quot;Total Score&quot; = Fit + Engagement." },
                  { step: "2. Configurer le Fit Score", desc: "Dans la propriete Fit Score, ajoutez les criteres positifs et negatifs. Utilisez les proprietes de contact existantes (Job Title, Company Size, Industry). Ajoutez les valeurs de points selon votre grille." },
                  { step: "3. Configurer l\u2019Engagement Score", desc: "Dans la propriete Engagement Score, configurez les regles basees sur les activites : page views, form submissions, email interactions, meeting bookings. Ajoutez le time decay (-5 pts tous les 30 jours sans activite)." },
                  { step: "4. Creer les workflows de transition", desc: "Workflow 1 : Si Total Score >= 50, passer lifecycle stage a MQL. Workflow 2 : Si Total Score >= 70, creer tache pour le SDR. Workflow 3 : Si Total Score >= 85, notifier le sales manager via Slack." },
                  { step: "5. Tester et calibrer", desc: "Appliquez le scoring retroactivement sur vos 100 derniers clients signes. Verifiez que 80% d\u2019entre eux auraient obtenu un score >= 70. Ajustez les poids si necessaire. Recalibrez tous les trimestres." },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl border border-[#F0F0F0] p-4">
                    <p className="text-[13px] font-semibold text-[#111] mb-1">{s.step}</p>
                    <p className="text-[12px] text-[#666] leading-[1.6]">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <Connector />

            {/* ==================== CHAPITRE 7 ==================== */}
            <div id="chapitre-7" className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#FF7A59]/10 flex items-center justify-center text-[14px] font-bold text-[#FF7A59]">07</span>
                <div>
                  <h2 className="text-[22px] font-semibold text-[#111] leading-tight">Stack technologique RevOps</h2>
                  <p className="text-[12px] text-[#999]">Pages 42-47 -- Les 7 couches, outils recommandes et budget par taille</p>
                </div>
              </div>

              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Le stack technologique est le systeme nerveux de votre machine RevOps. Il doit etre construit en couches, avec le CRM comme hub central et des integrations bi-directionnelles entre chaque outil. L&apos;erreur la plus courante est d\u2019accumuler des outils sans strategie d\u2019integration : chaque outil ajoute sans integration cree un silo de donnees supplementaire.
              </p>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Les 7 couches du stack RevOps</h3>

              {/* Architecture diagram */}
              <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-6 mb-6">
                <div className="space-y-2 max-w-[550px] mx-auto">
                  {[
                    { layer: "7. Intelligence Artificielle", color: "#6C5CE7", tools: "ChatGPT, Claude, Gong, Clari", desc: "Insights, forecasting predictif, coaching" },
                    { layer: "6. Integration & Orchestration", color: "#4B5EFC", tools: "Zapier, Make, n8n, Tray.io", desc: "Connecter tous les outils entre eux" },
                    { layer: "5. Communication", color: "#22C55E", tools: "Slack, Loom, Calendly, Zoom", desc: "Communication interne et externe" },
                    { layer: "4. Analytics & BI", color: "#EAB308", tools: "HubSpot Reports, Databox, Looker", desc: "Dashboards, reporting, data viz" },
                    { layer: "3. Enrichissement", color: "#F97316", tools: "Clearbit, Apollo, Lusha, Dropcontact", desc: "Enrichir et completer les donnees contacts" },
                    { layer: "2. Automation", color: "#FF7A59", tools: "HubSpot Workflows, Lemlist, Outreach", desc: "Automatiser les taches repetitives" },
                    { layer: "1. CRM (Hub Central)", color: "#111", tools: "HubSpot, Salesforce, Pipedrive", desc: "Source de verite unique pour toutes les donnees" },
                  ].map((l, i) => (
                    <div key={i} className="rounded-lg p-3 flex items-center gap-4" style={{ background: l.color, opacity: 0.9 }}>
                      <div className="flex-1">
                        <p className="text-[12px] font-bold text-white">{l.layer}</p>
                        <p className="text-[10px] text-white/70">{l.desc}</p>
                      </div>
                      <p className="text-[10px] text-white/50 text-right">{l.tools}</p>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Outils recommandes par couche</h3>
              <div className="space-y-3 mb-6">
                {[
                  { layer: "CRM", tools: [{ name: "HubSpot", note: "Notre recommandation pour les PME et ETI. Gratuit a 4 600 EUR/mois. Interface intuitive, ecosysteme riche." }, { name: "Salesforce", note: "Pour les organisations complexes (+200 utilisateurs). 25 a 300 EUR/utilisateur/mois. Plus puissant mais plus complexe." }, { name: "Pipedrive", note: "Pour les petites equipes sales-first. 14 a 99 EUR/utilisateur/mois. Simple et efficace pour le pipeline." }] },
                  { layer: "Automation", tools: [{ name: "HubSpot Workflows", note: "Natif dans HubSpot. Workflows marketing, sales et CS. Inclus a partir du Pro." }, { name: "Lemlist", note: "Sequences de prospection outbound multicanal. 59 a 99 EUR/mois/utilisateur." }, { name: "Outreach", note: "Reference enterprise pour le sales engagement. A partir de 100 USD/mois/utilisateur." }] },
                  { layer: "Enrichissement", tools: [{ name: "Apollo.io", note: "Base de donnees B2B de 275M de contacts. Enrichissement + prospection. 49 a 99 USD/mois." }, { name: "Clearbit (Breeze)", note: "Enrichissement temps reel integre nativement a HubSpot. Enrichit automatiquement les contacts." }, { name: "Dropcontact", note: "Solution francaise RGPD-friendly. Enrichissement et verification d\u2019emails B2B. A partir de 24 EUR/mois." }] },
                  { layer: "Analytics", tools: [{ name: "HubSpot Reports", note: "Dashboards natifs du CRM. Suffisant pour 80% des besoins. Inclus dans les plans Pro et Enterprise." }, { name: "Databox", note: "Agregateur de donnees multi-sources. Ideal pour les dashboards TV et rapports automatiques. 0 a 799 USD/mois." }, { name: "Looker Studio", note: "Outil Google gratuit pour les dashboards avances. Connecteurs pour la plupart des sources." }] },
                  { layer: "IA", tools: [{ name: "Ceres RevOps AI", note: "Assistant IA connecte a HubSpot. Analyse de pipeline, scoring et recommandations en temps reel." }, { name: "Gong", note: "Intelligence conversationnelle. Analyse des appels, coaching, deal intelligence. A partir de 100 USD/mois/utilisateur." }, { name: "Clari", note: "Revenue intelligence et forecasting predictif. Pour les equipes sales enterprise." }] },
                ].map((l, i) => (
                  <div key={i} className="rounded-xl border border-[#F0F0F0] p-4">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">{l.layer}</p>
                    <div className="space-y-2">
                      {l.tools.map((t, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />
                          <p className="text-[12px] text-[#666] leading-[1.6]"><span className="font-medium text-[#111]">{t.name}</span> -- {t.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Budget par taille d\u2019entreprise</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#E8E8E8]">
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Taille</th>
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Budget mensuel</th>
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Stack essentiel</th>
                      <th className="text-left py-3 text-[#999] font-semibold">Nombre d\u2019outils</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#555]">
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Startup (1-20)</td>
                      <td className="py-2.5 pr-4">0 -- 200 EUR</td>
                      <td className="py-2.5 pr-4">HubSpot Free + Lemlist + Apollo Free + Calendly</td>
                      <td className="py-2.5">4-5 outils</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">PME (20-100)</td>
                      <td className="py-2.5 pr-4">500 -- 2 000 EUR</td>
                      <td className="py-2.5 pr-4">HubSpot Pro + Lemlist + Apollo + Slack + Databox</td>
                      <td className="py-2.5">6-8 outils</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-[#111]">ETI (100-500)</td>
                      <td className="py-2.5 pr-4">5 000 -- 15 000 EUR</td>
                      <td className="py-2.5 pr-4">HubSpot Enterprise + Gong + Clari + Looker + n8n</td>
                      <td className="py-2.5">10-15 outils</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Erreurs courantes du stack technologique</h3>
              <div className="rounded-xl bg-[#111] p-5">
                <div className="space-y-3">
                  {[
                    { err: "Shiny object syndrome", desc: "Acheter un nouvel outil pour resoudre chaque probleme. Resultat : 15 outils dont 5 se chevauchent et aucun n\u2019est correctement configure." },
                    { err: "Pas de CRM comme hub", desc: "Si le CRM n\u2019est pas la source de verite unique, les donnees divergent entre les systemes et plus aucun reporting n\u2019est fiable." },
                    { err: "Integrations unidirectionnelles", desc: "Les donnees circulent du marketing vers le CRM mais pas en retour. Les rapports d\u2019attribution sont faux, le scoring est incomplet." },
                    { err: "Sous-utilisation", desc: "L&apos;entreprise moyenne utilise seulement 40% des fonctionnalites de ses outils. Avant d\u2019acheter un nouvel outil, exploitez ce que vous avez deja." },
                  ].map((e, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-[10px] font-bold text-red-400 shrink-0 mt-0.5">{i + 1}</span>
                      <div>
                        <p className="text-[12px] font-semibold text-white">{e.err}</p>
                        <p className="text-[11px] text-white/60 leading-[1.6]">{e.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Connector />

            {/* ==================== CHAPITRE 8 ==================== */}
            <div id="chapitre-8" className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#FF7A59]/10 flex items-center justify-center text-[14px] font-bold text-[#FF7A59]">08</span>
                <div>
                  <h2 className="text-[22px] font-semibold text-[#111] leading-tight">Les 30 metriques RevOps essentielles</h2>
                  <p className="text-[12px] text-[#999]">Pages 48-53 -- Formules, benchmarks et dashboards par categorie</p>
                </div>
              </div>

              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Ce qui ne se mesure pas ne s\u2019ameliore pas. Voici les 30 metriques que chaque organisation RevOps doit suivre, organisees en 6 categories. Pour chaque metrique : sa definition, sa formule, le benchmark B2B SaaS et ce qu&apos;elle revele sur votre machine revenue.
              </p>

              {/* Dashboard mockup */}
              <div className="rounded-xl bg-[#111] p-6 mb-6">
                <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-4">Dashboard RevOps -- Vue d\u2019ensemble</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "MRR", value: "127K EUR", trend: "+12%", color: "#22C55E" },
                    { label: "Pipeline", value: "845K EUR", trend: "+8%", color: "#4B5EFC" },
                    { label: "Win Rate", value: "28%", trend: "+3pts", color: "#FF7A59" },
                    { label: "NRR", value: "112%", trend: "+5pts", color: "#6C5CE7" },
                    { label: "Cycle moyen", value: "34 jours", trend: "-6j", color: "#22C55E" },
                    { label: "CAC", value: "2 400 EUR", trend: "-15%", color: "#22C55E" },
                    { label: "LTV/CAC", value: "4.2x", trend: "+0.8", color: "#4B5EFC" },
                    { label: "Churn", value: "2.1%", trend: "-0.4pts", color: "#22C55E" },
                  ].map((m, i) => (
                    <div key={i} className="rounded-lg bg-white/5 border border-white/10 p-3">
                      <p className="text-[10px] text-white/40">{m.label}</p>
                      <p className="text-[18px] font-bold text-white mt-0.5">{m.value}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: m.color }}>{m.trend}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6 categories of metrics */}
              {[
                { cat: "Acquisition", color: "#4B5EFC", metrics: [
                  { name: "Cout d\u2019acquisition client (CAC)", formula: "Depenses marketing + sales / Nombre de nouveaux clients", bench: "SaaS B2B : 5 000 -- 15 000 EUR", insight: "Si le CAC augmente sans que la LTV suive, votre croissance n\u2019est pas rentable." },
                  { name: "Taux de conversion Visitor-to-Lead", formula: "Nombre de leads / Nombre de visiteurs x 100", bench: "SaaS B2B : 2-5%", insight: "Mesure l\u2019efficacite de vos landing pages et CTAs. Sous 2%, revisez votre offre de contenu." },
                  { name: "Taux de conversion Lead-to-MQL", formula: "Nombre de MQL / Nombre de leads x 100", bench: "15-25%", insight: "Un taux bas indique un ciblage marketing trop large ou un scoring mal calibre." },
                  { name: "Cout par lead (CPL)", formula: "Depenses marketing / Nombre de leads generes", bench: "50-200 EUR par lead B2B", insight: "Comparez le CPL par canal pour optimiser l\u2019allocation budgetaire." },
                  { name: "Taux de conversion MQL-to-SQL", formula: "Nombre de SQL / Nombre de MQL x 100", bench: "30-40%", insight: "Le ratio cle de l\u2019alignement marketing-sales. Sous 25%, le scoring est a recalibrer." },
                  { name: "Marketing Sourced Pipeline", formula: "Valeur des opportunites sourcees par le marketing", bench: "40-60% du pipeline total", insight: "Mesure la contribution directe du marketing au revenu. Si inferieur a 30%, le marketing sous-performe." },
                ]},
                { cat: "Pipeline", color: "#FF7A59", metrics: [
                  { name: "Pipeline total", formula: "Somme des deals ouverts x probabilite de closing", bench: "3 a 5x l\u2019objectif de CA trimestriel", insight: "Un pipeline inferieur a 3x votre objectif est un signal d\u2019alarme sur l\u2019atteinte de vos quotas." },
                  { name: "Pipeline velocity", formula: "(Nb opportunites x Deal size x Win rate) / Cycle de vente", bench: "Variable par industrie", insight: "La metrique la plus complete du RevOps. Mesure le debit du revenu a travers le pipeline." },
                  { name: "Couverture pipeline", formula: "Pipeline total / Objectif CA trimestriel", bench: "3x -- 5x", insight: "Ratio de couverture. Sous 3x en debut de trimestre, le quota est en danger." },
                  { name: "Taux de creation d\u2019opportunites", formula: "Nb nouvelles opportunites / Periode", bench: "Varie selon le modele de vente", insight: "Mesure la capacite a generer de nouvelles affaires. Trend en baisse = probleme en amont du funnel." },
                  { name: "Age moyen du pipeline", formula: "Moyenne des jours d\u2019ouverture de toutes les opportunites", bench: "Inferieur a 1.5x le cycle de vente moyen", insight: "Si l\u2019age moyen depasse le cycle moyen, des deals zombies polluent votre pipeline." },
                  { name: "Taux de deals stagnants", formula: "Deals sans activite depuis 14 jours / Total des deals ouverts", bench: "Inferieur a 15%", insight: "Les deals stagnants gonflent artificiellement le pipeline et faussent le forecast." },
                ]},
                { cat: "Closing", color: "#6C5CE7", metrics: [
                  { name: "Win rate", formula: "Deals gagnes / (Deals gagnes + Deals perdus) x 100", bench: "20-30% SaaS B2B", insight: "Votre taux de transformation. Une baisse indique un probleme de qualification ou de competition." },
                  { name: "Cycle de vente moyen", formula: "Somme des jours de vente / Nombre de deals closes", bench: "30-90 jours (SaaS B2B PME)", insight: "Un cycle qui s\u2019allonge signale une complexite accrue ou un manque de qualification." },
                  { name: "Panier moyen (ACV)", formula: "CA annuel total / Nombre de clients", bench: "Varie selon le marche", insight: "Suivre l\u2019evolution du panier moyen revele la capacite a monter en gamme." },
                  { name: "Taux de slip (deals repousses)", formula: "Deals repousses au trimestre suivant / Total des deals prevus", bench: "Inferieur a 20%", insight: "Un taux eleve revele un probleme de qualification ou de forecast trop optimiste." },
                  { name: "Raisons de perte", formula: "Top 5 des motifs de perte classes par frequence", bench: "N/A -- qualitatif", insight: "La donnee la plus actionnable : chaque motif de perte est une opportunite d\u2019amelioration." },
                ]},
                { cat: "Revenue", color: "#22C55E", metrics: [
                  { name: "MRR / ARR", formula: "Somme des revenus recurrents mensuels / x12 pour l\u2019ARR", bench: "Croissance YoY de 50%+ pour les scale-ups", insight: "La metrique North Star pour les entreprises SaaS. Suivez le MRR new, expansion, contraction et churn." },
                  { name: "LTV (Lifetime Value)", formula: "ARPA x Marge brute / Taux de churn mensuel", bench: "LTV/CAC ratio de 3x minimum", insight: "La valeur totale d\u2019un client sur sa duree de vie. Le ratio LTV/CAC doit etre superieur a 3." },
                  { name: "NRR (Net Revenue Retention)", formula: "(MRR debut + Expansion - Contraction - Churn) / MRR debut x 100", bench: "SaaS top : 110-130%", insight: "Si NRR > 100%, votre base client croit meme sans nouveaux clients. C&apos;est le signe d\u2019un product-market fit fort." },
                  { name: "Revenue par commercial", formula: "CA total / Nombre de commerciaux full-time", bench: "250K-500K EUR/an pour les AE SaaS", insight: "Mesure la productivite individuelle. Permet de planifier les recrutements." },
                  { name: "Payback period", formula: "CAC / (ARPA x Marge brute)", bench: "Inferieur a 18 mois", insight: "Le temps necessaire pour recuperer l\u2019investissement d\u2019acquisition. Au-dela de 18 mois, la croissance brulle du cash." },
                ]},
                { cat: "Retention", color: "#EAB308", metrics: [
                  { name: "Taux de churn brut", formula: "Clients perdus sur la periode / Clients en debut de periode x 100", bench: "SaaS B2B : 5-7% annuel (logo churn)", insight: "Le churn est le killer silencieux. 5% de churn mensuel = vous perdez la moitie de vos clients en un an." },
                  { name: "Taux d\u2019expansion", formula: "Revenue additionnel des clients existants / MRR debut de periode", bench: "SaaS top : 20-30% du MRR mensuel", insight: "L&apos;expansion compense le churn et coute 5 a 25x moins cher que l\u2019acquisition." },
                  { name: "NPS (Net Promoter Score)", formula: "% Promoteurs (9-10) - % Detracteurs (0-6)", bench: "SaaS B2B : 30-50", insight: "Indicateur avance du churn. Un NPS en baisse precede generalement une hausse du churn de 2 a 3 trimestres." },
                  { name: "Time-to-value", formula: "Jours entre signature et premiere valeur livree", bench: "SaaS B2B : 14-30 jours", insight: "Plus le time-to-value est court, plus la retention est elevee. Optimisez l\u2019onboarding." },
                ]},
                { cat: "Operations", color: "#999", metrics: [
                  { name: "Taux d\u2019adoption CRM", formula: "Utilisateurs actifs quotidiens / Utilisateurs totaux x 100", bench: "Superieur a 80%", insight: "Si les commerciaux n\u2019utilisent pas le CRM, aucune donnee n\u2019est fiable et aucun processus ne fonctionne." },
                  { name: "Taux de champs vides (CRM)", formula: "Champs critiques vides / Total des champs critiques x 100", bench: "Inferieur a 10%", insight: "La qualite des donnees conditionne la qualite des decisions. Au-dela de 20%, le CRM n\u2019est pas fiable." },
                  { name: "Temps de reponse aux leads", formula: "Temps entre la soumission du formulaire et le premier contact", bench: "Inferieur a 5 min pour les leads hot", insight: "La probabilite de qualification chute de 80% apres les 5 premieres minutes. La vitesse est critique." },
                  { name: "Taux d\u2019automatisation", formula: "Taches automatisees / Total des taches repetitives x 100", bench: "Superieur a 60%", insight: "Chaque tache manuelle est une source d\u2019erreur et de perte de temps. Automatisez ou eliminez." },
                ]},
              ].map((cat, ci) => (
                <div key={ci} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                    <h3 className="text-[15px] font-semibold text-[#111]">{cat.cat} ({cat.metrics.length} metriques)</h3>
                  </div>
                  <div className="space-y-2">
                    {cat.metrics.map((m, mi) => (
                      <div key={mi} className="rounded-xl border border-[#F0F0F0] p-4">
                        <p className="text-[13px] font-semibold text-[#111] mb-1">{ci * 6 + mi + 1}. {m.name}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                          <div><span className="font-medium text-[#999]">Formule : </span><span className="text-[#666]">{m.formula}</span></div>
                          <div><span className="font-medium text-[#999]">Benchmark : </span><span className="text-[#666]">{m.bench}</span></div>
                          <div><span className="font-medium text-[#999]">Insight : </span><span className="text-[#666]">{m.insight}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">Quelles metriques par phase de croissance</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#E8E8E8]">
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Phase</th>
                      <th className="text-left py-3 pr-4 text-[#999] font-semibold">Focus metriques</th>
                      <th className="text-left py-3 text-[#999] font-semibold">Pourquoi</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#555]">
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Pre-PMF (0-1M ARR)</td>
                      <td className="py-2.5 pr-4">Win rate, cycle de vente, NPS, churn</td>
                      <td className="py-2.5">Valider que le produit se vend, se garde et satisfait</td>
                    </tr>
                    <tr className="border-b border-[#F5F5F5]">
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Scale (1-10M ARR)</td>
                      <td className="py-2.5 pr-4">CAC, LTV/CAC, pipeline velocity, NRR</td>
                      <td className="py-2.5">Valider que la croissance est rentable et repeatable</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-[#111]">Expansion (10M+ ARR)</td>
                      <td className="py-2.5 pr-4">Revenue/AE, taux expansion, payback, forecast accuracy</td>
                      <td className="py-2.5">Optimiser l\u2019efficience et la previsibilite a grande echelle</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Connector />

            {/* ==================== CHAPITRE 9 ==================== */}
            <div id="chapitre-9" className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] mb-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#FF7A59]/10 flex items-center justify-center text-[14px] font-bold text-[#FF7A59]">09</span>
                <div>
                  <h2 className="text-[22px] font-semibold text-[#111] leading-tight">Plan d\u2019implementation en 90 jours</h2>
                  <p className="text-[12px] text-[#999]">Pages 54-62 -- Semaine par semaine, KPIs de validation et Gantt</p>
                </div>
              </div>

              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                90 jours. C&apos;est le temps necessaire pour passer d\u2019une organisation en silos a une machine RevOps fonctionnelle. Pas parfaite -- fonctionnelle. Ce plan est concu pour etre execute semaine par semaine, avec des livrables concrets et des KPIs de validation a chaque etape. C&apos;est exactement le calendrier que nous suivons avec nos clients chez Ceres.
              </p>

              {/* Gantt mockup */}
              <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-6 mb-6 overflow-x-auto">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Timeline 90 jours</p>
                <div className="min-w-[600px]">
                  <div className="flex text-[9px] text-[#999] mb-2">
                    <div className="w-[140px] shrink-0" />
                    {Array.from({ length: 12 }, (_, i) => (
                      <div key={i} className="flex-1 text-center">S{i + 1}</div>
                    ))}
                  </div>
                  {[
                    { phase: "Audit + ICP", weeks: [1, 2], color: "#FF7A59" },
                    { phase: "SLA + Definitions + Scoring", weeks: [3, 4], color: "#4B5EFC" },
                    { phase: "CRM cleanup + Pipeline", weeks: [5, 6], color: "#6C5CE7" },
                    { phase: "Automation + Workflows", weeks: [7, 8], color: "#22C55E" },
                    { phase: "Dashboards + Reporting", weeks: [9, 10], color: "#EAB308" },
                    { phase: "Training + Adoption", weeks: [11, 12], color: "#F97316" },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center mb-1.5">
                      <div className="w-[140px] shrink-0 text-[10px] font-medium text-[#111] pr-3 truncate">{p.phase}</div>
                      <div className="flex-1 flex">
                        {Array.from({ length: 12 }, (_, w) => (
                          <div key={w} className="flex-1 h-5 mx-0.5 rounded-sm" style={{ background: p.weeks.includes(w + 1) ? p.color : "#E8E8E8" }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Week by week */}
              <div className="space-y-6">
                {/* Phase 1 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-[#FF7A59]" />
                    <h3 className="text-[15px] font-semibold text-[#111]">Phase 1 : Audit + ICP (Semaines 1-2)</h3>
                  </div>
                  <div className="rounded-xl border border-[#F0F0F0] p-4 mb-3">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">Semaine 1 : Diagnostic</p>
                    <ul className="space-y-1.5 text-[12px] text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Realiser l\u2019audit 80 points (chapitres 2)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Interviewer 3-5 parties prenantes (sales, marketing, CS)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Auditer le CRM : qualite des donnees, doublons, champs vides</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Mapper le stack technologique existant et les integrations</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Produire le rapport d\u2019audit avec le score de maturite</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[#F0F0F0] p-4 mb-3">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">Semaine 2 : ICP et segmentation</p>
                    <ul className="space-y-1.5 text-[12px] text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Analyser les 20 meilleurs et 20 pires clients</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Formaliser l\u2019ICP (firmographique + comportemental)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Creer 2-3 buyer personas documentes</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Definir les anti-personas et les criteres d\u2019exclusion</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Valider avec le leadership et partager avec toutes les equipes</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-[#FF7A59]/10 px-4 py-2 text-[11px]">
                    <span className="font-semibold text-[#FF7A59]">KPIs de validation : </span>
                    <span className="text-[#666]">Score de maturite calcule -- ICP documente et valide -- Rapport d\u2019audit livre -- Top 10 quick wins identifies</span>
                  </div>
                </div>

                {/* Phase 2 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-[#4B5EFC]" />
                    <h3 className="text-[15px] font-semibold text-[#111]">Phase 2 : SLA + Definitions + Scoring (Semaines 3-4)</h3>
                  </div>
                  <div className="rounded-xl border border-[#F0F0F0] p-4 mb-3">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">Semaine 3 : Alignement et definitions</p>
                    <ul className="space-y-1.5 text-[12px] text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Organiser l\u2019atelier de definitions communes (MQL, SQL, Opportunity)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Rediger le SLA marketing-sales (engagements des deux cotes)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Definir les criteres de passage entre chaque stage du funnel</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Planifier les rituels d\u2019alignement (weekly, monthly, quarterly)</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[#F0F0F0] p-4 mb-3">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">Semaine 4 : Lead scoring</p>
                    <ul className="space-y-1.5 text-[12px] text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Construire la grille de Fit Scoring (criteres et points)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Construire la grille d\u2019Engagement Scoring (actions et points)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Definir les seuils MQL, SQL et Hot Lead</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Tester le scoring retroactivement sur les 100 derniers deals</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Ajuster les poids et les seuils en fonction des resultats</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-[#4B5EFC]/10 px-4 py-2 text-[11px]">
                    <span className="font-semibold text-[#4B5EFC]">KPIs de validation : </span>
                    <span className="text-[#666]">SLA signe par les deux parties -- Definitions documentees et partagees -- Scoring valide retroactivement (80% des clients passes auraient ete qualifies)</span>
                  </div>
                </div>

                {/* Phase 3 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-[#6C5CE7]" />
                    <h3 className="text-[15px] font-semibold text-[#111]">Phase 3 : CRM cleanup + Pipeline (Semaines 5-6)</h3>
                  </div>
                  <div className="rounded-xl border border-[#F0F0F0] p-4 mb-3">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">Semaine 5 : Nettoyage CRM</p>
                    <ul className="space-y-1.5 text-[12px] text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Deduplication des contacts et entreprises</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Normalisation des champs cles (pays, secteur, taille, source)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Rendre les champs critiques obligatoires dans le CRM</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Configurer l\u2019enrichissement automatique (Clearbit, Apollo)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Archiver les contacts et deals morts (plus de 6 mois sans activite)</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[#F0F0F0] p-4 mb-3">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">Semaine 6 : Configuration pipeline</p>
                    <ul className="space-y-1.5 text-[12px] text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Configurer les stages du pipeline avec les criteres definis en phase 2</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Ajouter les proprietes obligatoires par stage (BANT, next steps, close date)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Implementer le scoring dans le CRM (proprietes HubSpot Score)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Configurer le lead routing automatique (round-robin ou par territoire)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Creer le pipeline CS (onboarding, adoption, expansion, renouvellement)</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-[#6C5CE7]/10 px-4 py-2 text-[11px]">
                    <span className="font-semibold text-[#6C5CE7]">KPIs de validation : </span>
                    <span className="text-[#666]">Taux de champs vides sous 10% -- Zero doublon dans le CRM -- Pipeline configure avec champs obligatoires -- Scoring live et fonctionnel</span>
                  </div>
                </div>

                {/* Phase 4 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-[#22C55E]" />
                    <h3 className="text-[15px] font-semibold text-[#111]">Phase 4 : Automation + Workflows (Semaines 7-8)</h3>
                  </div>
                  <div className="rounded-xl border border-[#F0F0F0] p-4 mb-3">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">Semaine 7 : Workflows marketing</p>
                    <ul className="space-y-1.5 text-[12px] text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Sequence de bienvenue (5 emails, 14 jours)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Workflow de nurturing MQL (contenu educatif, cas clients, webinaires)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Workflow de transition MQL vers SDR (notification + creation tache)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Workflow de recyclage des leads disqualifies (re-nurturing a 60 jours)</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[#F0F0F0] p-4 mb-3">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">Semaine 8 : Workflows sales et CS</p>
                    <ul className="space-y-1.5 text-[12px] text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Sequences de follow-up post-demo (3 touches, 7 jours)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Alerte deals stagnants (&gt;14 jours sans activite)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Workflow d\u2019onboarding client (sequence de 30 jours post-signature)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Alerte de renouvellement (90 jours avant echeance)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Demande NPS automatique a J+90 post-onboarding</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-[#22C55E]/10 px-4 py-2 text-[11px]">
                    <span className="font-semibold text-[#22C55E]">KPIs de validation : </span>
                    <span className="text-[#666]">Minimum 8 workflows actifs -- Taux de reponse aux leads sous 2h -- Sequence onboarding deployee -- Zero lead non traite apres 48h</span>
                  </div>
                </div>

                {/* Phase 5 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-[#EAB308]" />
                    <h3 className="text-[15px] font-semibold text-[#111]">Phase 5 : Dashboards + Reporting (Semaines 9-10)</h3>
                  </div>
                  <div className="rounded-xl border border-[#F0F0F0] p-4 mb-3">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">Semaine 9 : Dashboards operationnels</p>
                    <ul className="space-y-1.5 text-[12px] text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Dashboard marketing : MQL, CPL, conversion par canal, attribution</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Dashboard sales : pipeline, win rate, cycle, activite par AE</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Dashboard CS : onboarding, NPS, churn, expansion</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Dashboard funnel unifie : de visitor a advocate, un seul rapport</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[#F0F0F0] p-4 mb-3">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">Semaine 10 : Reporting et forecasting</p>
                    <ul className="space-y-1.5 text-[12px] text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Configurer le rapport hebdomadaire automatique (envoye par email chaque lundi)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Mettre en place le forecast pipeline (commit, best case, upside)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Creer le template de revenue review mensuelle</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Partager l\u2019acces aux dashboards avec toutes les equipes</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-[#EAB308]/10 px-4 py-2 text-[11px]">
                    <span className="font-semibold text-[#EAB308]">KPIs de validation : </span>
                    <span className="text-[#666]">4 dashboards operationnels live -- 1 rapport automatique hebdomadaire -- Forecast structure avec 3 categories -- 100% des equipes ont acces</span>
                  </div>
                </div>

                {/* Phase 6 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full bg-[#F97316]" />
                    <h3 className="text-[15px] font-semibold text-[#111]">Phase 6 : Training + Adoption + Iteration (Semaines 11-12)</h3>
                  </div>
                  <div className="rounded-xl border border-[#F0F0F0] p-4 mb-3">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">Semaine 11 : Formation des equipes</p>
                    <ul className="space-y-1.5 text-[12px] text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Session de formation CRM pour les commerciaux (2h : nouveau pipeline, champs obligatoires, bonnes pratiques)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Session de formation marketing (1h : scoring, SLA, reporting)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Session de formation CS (1h : pipeline CS, onboarding, NPS)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Creer la documentation interne (playbook RevOps de l\u2019entreprise)</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[#F0F0F0] p-4 mb-3">
                    <p className="text-[13px] font-semibold text-[#111] mb-2">Semaine 12 : Mesure et iteration</p>
                    <ul className="space-y-1.5 text-[12px] text-[#666]">
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Mesurer le score de maturite post-implementation (comparer avec le score initial)</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Analyser les taux d\u2019adoption du CRM et identifier les resistances</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Recalibrer le scoring si les taux de conversion MQL-SQL sont hors cible</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Definir la roadmap Q+1 : ce qui a fonctionne, ce qui doit etre ameliore</li>
                      <li className="flex items-start gap-2"><span className="w-4 h-4 rounded border border-[#DDD] flex items-center justify-center text-[9px] text-[#999] shrink-0 mt-0.5">--</span>Celebrer les wins avec les equipes (les quick wins realises, les metriques ameliorees)</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-[#F97316]/10 px-4 py-2 text-[11px]">
                    <span className="font-semibold text-[#F97316]">KPIs de validation : </span>
                    <span className="text-[#666]">Adoption CRM superieure a 80% -- Score de maturite en hausse d\u2019au moins 20 points -- Premier ritual d\u2019alignement realise -- Roadmap Q+1 validee</span>
                  </div>
                </div>
              </div>

              <Connector />

              <h3 className="text-[17px] font-semibold text-[#111] mb-3">A quoi ressemble le succes a J+90</h3>
              <div className="rounded-xl bg-[#111] p-5">
                <p className="text-[13px] text-white font-semibold mb-3">&quot;What good looks like&quot; -- Les 10 criteres de succes a jour 90</p>
                <div className="space-y-2">
                  {[
                    "Le CRM est propre, a jour et utilise quotidiennement par plus de 80% de l\u2019equipe",
                    "Chaque lead est score automatiquement et route au bon commercial en moins de 5 minutes",
                    "Les definitions MQL/SQL/Opportunity sont unanimement comprises et appliquees",
                    "Le SLA marketing-sales est signe, mesure et respecte",
                    "Le pipeline reflete la realite : pas de deals zombies, pas de stages gonfles artificiellement",
                    "4 dashboards operationnels sont consultes chaque semaine par les equipes",
                    "Le forecast trimestriel est precis a plus ou moins 15%",
                    "Les workflows d\u2019automatisation economisent 5h+ par semaine par commercial",
                    "Les rituels d\u2019alignement hebdomadaires et mensuels sont en place et respectes",
                    "L&apos;equipe a une roadmap claire pour le trimestre suivant basee sur des donnees",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#22C55E] text-[12px] mt-0.5 shrink-0">--</span>
                      <p className="text-[12px] text-white/70 leading-[1.6]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Connector />

            {/* ==================== CTA FINAL ==================== */}
            <div className="rounded-2xl bg-gradient-to-br from-[#FF7A59] to-[#FF5A36] p-6 md:p-10 text-center mb-8">
              <h2 className="text-[22px] md:text-[28px] font-semibold text-white leading-tight mb-3">
                Pret a deployer le RevOps dans votre organisation ?
              </h2>
              <p className="text-[14px] text-white/80 max-w-[500px] mx-auto leading-[1.7] mb-6">
                Nos experts RevOps vous accompagnent de l\u2019audit initial au deploiement complet en 90 jours. Meme playbook, adapte a votre contexte.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="https://meetings.hubspot.com/ceres-revops" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#FF7A59] text-[14px] font-semibold hover:bg-white/90 transition-colors">
                  Reserver un appel strategique
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
                <Link href="/guide-revops-ultime" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white text-[14px] font-medium hover:bg-white/20 transition-colors border border-white/20">
                  Telecharger le PDF gratuit
                </Link>
              </div>
            </div>

            {/* Related guides */}
            <div className="mb-8">
              <h3 className="text-[17px] font-semibold text-[#111] mb-4">Guides et articles complementaires</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedGuides.map((g, i) => (
                  <Link key={i} href={g.slug} className="group rounded-2xl border border-[#E8E8E8] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] hover:border-[#DDD] transition-all">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-medium mb-3" style={{ background: `${g.color}15`, color: g.color }}>{g.category}</span>
                    <p className="text-[13px] font-semibold text-[#111] group-hover:text-[#FF7A59] transition-colors leading-tight">{g.title}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Back link */}
            <div className="text-center">
              <Link href="/guide-revops-ultime" className="text-[13px] text-[#999] hover:text-[#FF7A59] transition-colors">
                Retour a la page du Guide RevOps Ultime
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
