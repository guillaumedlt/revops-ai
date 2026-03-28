"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "RevOps vs Sales Ops vs Marketing Ops : quelles differences ?",
  description: "Definitions completes de Sales Ops, Marketing Ops, Customer Success Ops et RevOps. Modeles organisationnels (silos, hub-and-spoke, unifie), tableau comparatif sur 12 criteres, signaux pour passer au RevOps et impact mesurable sur le revenu.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-22",
  dateModified: "2026-03-22",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/revops-vs-sales-ops-marketing-ops" },
  articleSection: "RevOps",
  wordCount: 2800,
  inLanguage: "fr",
};

const sections = [
  { id: "evolution-operations", title: "L\u2019evolution des operations" },
  { id: "sales-ops", title: "Sales Ops" },
  { id: "marketing-ops", title: "Marketing Ops" },
  { id: "cs-ops", title: "Customer Success Ops" },
  { id: "revops-vision-unifiee", title: "RevOps : vision unifiee" },
  { id: "tableau-comparatif", title: "Tableau comparatif" },
  { id: "modeles-organisationnels", title: "Modeles organisationnels" },
  { id: "quand-passer-revops", title: "Quand passer au RevOps" },
  { id: "impact-mesurable", title: "Impact mesurable" },
  { id: "recommandation", title: "Notre recommandation" },
];

const relatedArticles = [
  { title: "Comment aligner marketing et sales en 30 jours avec le RevOps", slug: "aligner-marketing-sales-revops", category: "RevOps", color: "#FF7A59" },
  { title: "KPI commerciaux : les indicateurs de vente a suivre", slug: "kpi-commerciaux-indicateurs-vente", category: "RevOps", color: "#FF7A59" },
  { title: "Lead scoring : le guide complet", slug: "lead-scoring-guide-complet", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function RevOpsVsSalesOpsMarketingOpsPage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("evolution-operations");

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, pct));

      const sectionEls = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i];
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(sections[i].id);
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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "8%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "20%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "35%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "50%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "65%", width: 280, height: 280, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "2%", top: "80%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.07, filter: "blur(70px)" }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="flex gap-10">
          {/* Sticky sidebar */}
          <aside className="hidden lg:block w-[200px] shrink-0">
            <div className="sticky top-28">
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Sommaire</p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`block text-[11px] py-1.5 pl-3 border-l-2 transition-all ${
                      activeSection === s.id
                        ? "border-[#FF7A59] text-[#111] font-medium"
                        : "border-transparent text-[#999] hover:text-[#666] hover:border-[#DDD]"
                    }`}
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-[#F2F2F2]">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Partager</p>
                <div className="flex gap-2">
                  <a href="https://twitter.com/intent/tweet?text=RevOps%20vs%20Sales%20Ops%20vs%20Marketing%20Ops%20%3A%20quelles%20differences&url=https://www.ceres-revops.com/blog/revops-vs-sales-ops-marketing-ops" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/revops-vs-sales-ops-marketing-ops" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Article */}
          <div className="flex-1 min-w-0 max-w-[700px]">
            <nav className="mb-8 flex items-center gap-2 text-[12px] text-[#999]">
              <Link href="/" className="hover:text-[#111] transition-colors">Accueil</Link><span>/</span>
              <Link href="/blog" className="hover:text-[#111] transition-colors">Blog</Link><span>/</span>
              <span className="text-[#666]">RevOps vs Sales Ops vs Marketing Ops</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>RevOps</Badge>
                <span className="text-[11px] text-[#CCC]">12 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                RevOps vs Sales Ops vs Marketing Ops : quelles differences ?
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Sales Ops, Marketing Ops, Customer Success Ops, RevOps. Quatre termes qui circulent dans toutes les entreprises B2B en croissance. Mais quelles sont les vraies differences ? Quand faut-il des equipes Ops separees et quand faut-il unifier sous une vision RevOps ? Ce guide pose les definitions, compare les modeles organisationnels et vous aide a choisir la bonne structure pour votre entreprise.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>22 mars 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 -- L'evolution des operations commerciales */}
              <section id="evolution-operations" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">L&apos;evolution des operations commerciales : du Sales Ops au RevOps</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;histoire des operations commerciales est celle d&apos;une specialisation progressive, suivie d&apos;une reunification necessaire. Pour comprendre le RevOps, il faut d&apos;abord comprendre comment on en est arrive la. Les trois dernieres decennies ont vu emerger, l&apos;une apres l&apos;autre, des fonctions operationnelles dediees a chaque departement generateur de revenu.</p>
                    <p>Tout commence dans les annees 1990 avec le Sales Operations. A cette epoque, les equipes commerciales grandissent, les CRM apparaissent (Siebel, puis Salesforce en 1999), et les entreprises realisent qu&apos;elles ont besoin de quelqu&apos;un pour gerer les processus de vente, les territoires, les quotas et les previsions. Le Sales Ops nait de cette necessite : c&apos;est la premiere fonction operationnelle dediee au revenu.</p>
                    <p>Dans les annees 2000-2010, le marketing digital explose. Les outils d&apos;automation (Marketo, HubSpot, Pardot) arrivent sur le marche. Le volume de donnees marketing augmente de maniere exponentielle. Les equipes marketing ont besoin de leur propre support operationnel pour gerer les campagnes, le lead scoring, les workflows de nurturing et l&apos;attribution. Le Marketing Ops emerge comme discipline distincte du Sales Ops.</p>
                    <p>A partir de 2015, le modele SaaS et l&apos;economie de l&apos;abonnement changent la donne. Le revenu ne s&apos;arrete plus a la signature du contrat initial. Le renouvellement, l&apos;upsell et le cross-sell deviennent des leviers de croissance majeurs. Les equipes Customer Success se structurent et, naturellement, le Customer Success Ops apparait pour outiller cette troisieme fonction.</p>
                    <p>Le probleme devient evident vers 2018-2020 : trois equipes operationnelles travaillent en parallele, chacune avec ses propres outils, ses propres metriques et ses propres processus. Les donnees sont fragmentees. Les objectifs sont parfois contradictoires. Le parcours client est coupe en trois morceaux que personne ne pilote de bout en bout. C&apos;est dans ce contexte que le RevOps emerge comme reponse a la fragmentation. Non pas une quatrieme fonction qui s&apos;ajoute, mais une vision unifiee qui englobe les trois.</p>
                  </div>

                  {/* CSS Timeline */}
                  <div className="mt-8 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                      <span className="text-[12px] font-semibold text-white">Evolution des Operations -- Timeline</span>
                    </div>
                    <div className="bg-white p-5 md:p-6">
                      <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-[18px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF7A59] via-[#4B5EFC] via-[#6C5CE7] to-[#22C55E]" />
                        <div className="space-y-6">
                          {[
                            { year: "1990s", label: "Sales Ops", desc: "Naissance des operations commerciales. Gestion des CRM, territoires, quotas et forecasting. Premiere equipe Ops dediee au revenu.", color: "#FF7A59" },
                            { year: "2005-10", label: "Marketing Ops", desc: "Explosion du marketing digital et des outils d&apos;automation. Besoin de gerer les campagnes, le lead scoring, les workflows et l&apos;attribution a grande echelle.", color: "#4B5EFC" },
                            { year: "2015-18", label: "CS Ops", desc: "Economie de l&apos;abonnement et modele SaaS. Le Customer Success se structure. Besoin d&apos;outiller le renouvellement, l&apos;upsell et la retention.", color: "#6C5CE7" },
                            { year: "2019+", label: "RevOps", desc: "Reunification des trois fonctions sous une vision unique. Pilotage du cycle de revenu de bout en bout. Donnees, processus et objectifs alignes.", color: "#22C55E" },
                          ].map((item) => (
                            <div key={item.year} className="flex items-start gap-4 relative">
                              <div className="w-9 h-9 rounded-full border-2 bg-white flex items-center justify-center shrink-0 z-10" style={{ borderColor: item.color }}>
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                              </div>
                              <div className="pt-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[11px] font-bold" style={{ color: item.color }}>{item.year}</span>
                                  <span className="text-[12px] font-semibold text-[#111]">{item.label}</span>
                                </div>
                                <p className="text-[11px] text-[#777] leading-[1.6]">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 -- Sales Ops */}
              <section id="sales-ops" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FF7A59] flex items-center justify-center text-white text-[12px] font-bold">SO</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Sales Ops : definition et perimetre</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le Sales Operations est la fonction qui structure, outille et optimise le travail des equipes commerciales. Le Sales Ops ne vend pas. Il cree les conditions pour que les commerciaux vendent mieux, plus vite et de maniere previsible. Son objectif fondamental est de retirer les frictions du processus de vente et de maximiser le temps que les commerciaux passent a vendre effectivement.</p>
                    <p>Le perimetre du Sales Ops couvre quatre grands domaines. Le premier est la gestion du CRM. Le Sales Ops est le garant de la donnee commerciale : architecture des proprietes, pipelines, regles d&apos;hygiene, automatisations, rapports. C&apos;est lui qui s&apos;assure que le CRM est un outil d&apos;aide a la vente et non un fardeau administratif. Il configure les pipelines, definit les etapes obligatoires, met en place les automations qui reduisent la saisie manuelle.</p>
                    <p>Le deuxieme domaine est le forecasting et la planification. Le Sales Ops construit les modeles de prevision de revenu, definit les quotas individuels et par equipe, planifie les territoires et segmente le portefeuille client. Il transforme les objectifs strategiques de la direction en plans operationnels que chaque commercial peut executer au quotidien.</p>
                    <p>Le troisieme domaine est l&apos;analyse de performance. Le Sales Ops suit les KPIs commerciaux, identifie les goulots d&apos;etranglement dans le pipeline, analyse les taux de conversion par etape, mesure la productivite individuelle et collective. Il fournit au management les donnees necessaires pour prendre des decisions eclairees sur le recrutement, la formation et la strategie commerciale.</p>
                    <p>Le quatrieme domaine est l&apos;enablement operationnel. Le Sales Ops gere la stack technologique de vente (sequences, outils de prospection, integrations), cree les playbooks de qualification, documente les processus et forme les nouveaux commerciaux aux outils et aux workflows. Il est le pont entre la strategie commerciale et son execution quotidienne.</p>
                    <p>Les limites du Sales Ops apparaissent quand on regarde au-dela de l&apos;equipe commerciale. Le Sales Ops a une vision qui s&apos;arrete aux frontieres du departement sales. Il ne controle ni la qualite des leads generes par le marketing, ni l&apos;experience client post-vente. C&apos;est un operateur de silo, aussi performant soit-il dans son perimetre.</p>
                  </div>

                  {/* Sales Ops scope cards */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { domaine: "Gestion CRM", kpis: ["Architecture des proprietes", "Configuration des pipelines", "Regles d&apos;hygiene de donnees", "Automatisations de saisie"], outils: "HubSpot, Salesforce, Pipedrive", color: "#FF7A59" },
                      { domaine: "Forecasting", kpis: ["Prevision de revenu mensuel/trimestriel", "Definition des quotas", "Planification des territoires", "Segmentation du portefeuille"], outils: "Clari, Gong Forecast, Excel", color: "#FF7A59" },
                      { domaine: "Analyse de performance", kpis: ["Taux de conversion par etape", "Cycle de vente moyen", "Win rate par commercial", "Pipeline coverage ratio"], outils: "CRM dashboards, Looker, Tableau", color: "#FF7A59" },
                      { domaine: "Enablement operationnel", kpis: ["Stack technologique de vente", "Playbooks de qualification", "Onboarding des nouveaux reps", "Sequences et templates"], outils: "Outreach, Salesloft, Notion", color: "#FF7A59" },
                    ].map((item) => (
                      <div key={item.domaine} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <p className="text-[12px] font-semibold text-[#111] mb-2">{item.domaine}</p>
                        <div className="space-y-1.5 mb-3">
                          {item.kpis.map((k) => (
                            <div key={k} className="flex items-start gap-2 text-[10px] text-[#777]">
                              <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.color }} />
                              {k}
                            </div>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-[#F0F0F0]">
                          <span className="text-[9px] text-[#BBB]">Outils : {item.outils}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 -- Marketing Ops */}
              <section id="marketing-ops" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#4B5EFC] flex items-center justify-center text-white text-[12px] font-bold">MO</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Marketing Ops : definition et perimetre</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le Marketing Operations est la fonction qui structure l&apos;infrastructure technologique, les donnees et les processus du departement marketing. Si le marketing cree les campagnes, le Marketing Ops cree le systeme qui permet a ces campagnes de fonctionner a grande echelle, d&apos;etre mesurables et de s&apos;ameliorer dans le temps.</p>
                    <p>Le premier pilier du Marketing Ops est la gestion de la stack marketing. Le Marketing Ops selectionne, configure et maintient l&apos;ensemble des outils du departement : plateforme d&apos;automation (HubSpot, Marketo, ActiveCampaign), outils d&apos;analytics (Google Analytics, Mixpanel), gestion publicitaire (Google Ads, LinkedIn Ads), outils de contenu et de social media. Il s&apos;assure que ces outils communiquent entre eux et que les donnees circulent correctement d&apos;un systeme a l&apos;autre.</p>
                    <p>Le deuxieme pilier est le lead management. Le Marketing Ops definit les regles de lead scoring, configure les workflows de nurturing, segmente les bases de contacts et gere le processus de qualification marketing. C&apos;est lui qui determine quand et comment un contact devient un MQL, et comment ce MQL est transmis aux equipes commerciales. Il est le garant de la qualite et du volume du flux de leads.</p>
                    <p>Le troisieme pilier est l&apos;attribution et la mesure de performance. Le Marketing Ops met en place les modeles d&apos;attribution (first touch, last touch, multi-touch), configure le tracking des conversions, construit les dashboards de performance marketing et produit les rapports qui permettent a l&apos;equipe marketing de comprendre le ROI de chaque canal et de chaque campagne.</p>
                    <p>Le quatrieme pilier est la gestion des donnees marketing. Le Marketing Ops s&apos;occupe de la segmentation, de la conformite RGPD, de l&apos;hygiene des bases de contacts, de la deduplication et de l&apos;enrichissement. Dans un monde ou le volume de donnees double tous les deux ans, cette mission est devenue critique.</p>
                    <p>Comme le Sales Ops, le Marketing Ops a une limite structurelle : il opere dans son silo. Il optimise la machine marketing sans visibilite sur ce qui se passe apres le handoff aux sales, ni sur la retention client. Il peut generer des MQLs en masse sans savoir s&apos;ils se convertissent en revenu reel.</p>
                  </div>

                  {/* Marketing Ops scope cards */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { domaine: "Stack marketing", kpis: ["Selection et configuration des outils", "Integrations inter-systemes", "Synchronisation des donnees", "Maintenance et mises a jour"], outils: "HubSpot, Marketo, Zapier", color: "#4B5EFC" },
                      { domaine: "Lead management", kpis: ["Lead scoring et grading", "Workflows de nurturing", "Segmentation des bases", "Processus de qualification MQL"], outils: "HubSpot Workflows, Pardot", color: "#4B5EFC" },
                      { domaine: "Attribution et analytics", kpis: ["Modeles d&apos;attribution multi-touch", "Tracking des conversions", "ROI par canal et par campagne", "Dashboards de performance"], outils: "GA4, HubSpot Reports, Looker", color: "#4B5EFC" },
                      { domaine: "Gestion des donnees", kpis: ["Conformite RGPD", "Hygiene et deduplication", "Enrichissement des contacts", "Segmentation avancee"], outils: "Clearbit, ZoomInfo, Clay", color: "#4B5EFC" },
                    ].map((item) => (
                      <div key={item.domaine} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <p className="text-[12px] font-semibold text-[#111] mb-2">{item.domaine}</p>
                        <div className="space-y-1.5 mb-3">
                          {item.kpis.map((k) => (
                            <div key={k} className="flex items-start gap-2 text-[10px] text-[#777]">
                              <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.color }} />
                              {k}
                            </div>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-[#F0F0F0]">
                          <span className="text-[9px] text-[#BBB]">Outils : {item.outils}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 -- Customer Success Ops */}
              <section id="cs-ops" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#6C5CE7] flex items-center justify-center text-white text-[12px] font-bold">CS</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Customer Success Ops : definition et perimetre</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le Customer Success Operations est la plus recente des trois fonctions Ops. Il structure et optimise tout ce qui se passe apres la signature du contrat : onboarding, adoption, renouvellement, upsell et gestion du churn. Dans une economie ou le cout d&apos;acquisition d&apos;un nouveau client est cinq a sept fois superieur au cout de retention d&apos;un client existant, cette fonction est devenue indispensable.</p>
                    <p>Le CS Ops gere d&apos;abord les processus d&apos;onboarding. Il definit les etapes structurees pour amener un nouveau client de la signature a l&apos;usage actif du produit. Il configure les workflows de bienvenue, les sequences de formation, les jalons d&apos;adoption et les alertes quand un client n&apos;atteint pas les etapes prevues dans les delais attendus.</p>
                    <p>Le deuxieme domaine est le health scoring. Le CS Ops construit des modeles qui evaluent la sante de chaque compte client en combinant des signaux d&apos;usage produit (frequence de connexion, fonctionnalites utilisees, tickets support), des signaux contractuels (date de renouvellement, valeur du contrat) et des signaux relationnels (NPS, satisfaction, engagement des stakeholders). Ce score permet de prioriser l&apos;attention des CSMs sur les comptes a risque.</p>
                    <p>Le troisieme domaine est la gestion du renouvellement et de l&apos;expansion. Le CS Ops met en place les processus et les alertes pour que chaque renouvellement soit anticipe et prepare. Il identifie les opportunites d&apos;upsell en analysant l&apos;usage et le potentiel de chaque compte. Il cree les playbooks qui permettent aux CSMs de conduire des conversations de valeur plutot que des relances administratives.</p>
                    <p>La limite du CS Ops est la meme que celle de ses homologues : il n&apos;a pas de visibilite sur l&apos;ensemble du parcours client. Il ne sait pas quelles promesses ont ete faites pendant le cycle de vente. Il ne connait pas les attentes creees par le contenu marketing. Il gere les consequences en aval sans pouvoir influencer les causes en amont.</p>
                  </div>

                  {/* CS Ops KPIs */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "NRR", label: "Net Revenue Retention : revenu conserve + expansion vs churn", color: "#6C5CE7" },
                      { value: "TTV", label: "Time to Value : delai entre la signature et le premier usage actif", color: "#4B5EFC" },
                      { value: "CSAT", label: "Customer Satisfaction : satisfaction globale mesuree regulierement", color: "#22C55E" },
                      { value: "Churn", label: "Taux d&apos;attrition : pourcentage de clients ou revenu perdu", color: "#FF7A59" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-4 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2]">
                        <div className="text-[18px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-[10px] text-[#999] mt-1 leading-[1.4]">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 -- RevOps : la vision unifiee */}
              <section id="revops-vision-unifiee" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">RevOps : la vision unifiee du cycle de revenu</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le Revenue Operations n&apos;est pas simplement la somme du Sales Ops, du Marketing Ops et du CS Ops. C&apos;est une refonte fondamentale de la maniere dont une entreprise pense et pilote ses operations generatrices de revenu. Le RevOps part d&apos;un constat : le client ne voit pas vos silos internes. Pour lui, il y a une seule experience, de la premiere interaction marketing jusqu&apos;au renouvellement de son abonnement. Vos operations doivent refleter cette realite.</p>
                    <p>Le RevOps repose sur trois piliers fondamentaux. Le premier est l&apos;unification des donnees. Au lieu de trois bases de donnees separees (marketing automation, CRM, plateforme CS), le RevOps construit une source unique de verite. Chaque interaction, chaque point de contact, chaque metrique est accessible dans un referentiel commun. Cela elimine les contradictions entre les rapports des differentes equipes et permet une visibilite complete sur le parcours client.</p>
                    <p>Le deuxieme pilier est l&apos;alignement des processus. Le RevOps definit un processus de bout en bout, du premier point de contact marketing jusqu&apos;au renouvellement. Chaque transition entre les equipes (marketing vers sales, sales vers CS) est documentee, automatisee et mesurable. Il n&apos;y a plus de zone grise ou le prospect tombe entre deux departements. Le handoff n&apos;est plus une rupture, c&apos;est une continuite orchestree.</p>
                    <p>Le troisieme pilier est la gouvernance de la stack technologique. Au lieu de trois equipes qui choisissent et configurent leurs outils independamment, le RevOps pilote une stack integree. Les outils sont selectionnes pour leur capacite a communiquer entre eux. Les flux de donnees sont architectures de maniere globale. Les investissements technologiques sont rationalises : plus de doublons, plus d&apos;integrations bricolees, plus de licences inutilisees.</p>
                    <p>Le RevOps change aussi fondamentalement les metriques. Au lieu de mesurer les MQLs d&apos;un cote, les SQLs de l&apos;autre et le NRR dans un troisieme dashboard, le RevOps suit le revenu de bout en bout. La metrique nord star devient le revenu previsible : combien l&apos;entreprise va generer dans les 3, 6 et 12 prochains mois, en tenant compte de l&apos;acquisition, de la conversion et de la retention. Toutes les equipes travaillent vers ce meme chiffre.</p>
                    <p>En pratique, le RevOps se materialise souvent par une equipe transverse qui rapporte directement au CEO ou au CRO, et non a un directeur commercial ou marketing. Cette independance est essentielle : elle permet au RevOps d&apos;arbitrer les priorites entre les departements sans biais et de prendre des decisions qui servent le revenu global plutot que les interets d&apos;une equipe particuliere.</p>
                  </div>

                  {/* CSS Venn Diagram - 3 circles converging */}
                  <div className="mt-8 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                      <span className="text-[12px] font-semibold text-white">RevOps -- Convergence des 3 fonctions Ops</span>
                    </div>
                    <div className="bg-white p-6 md:p-8">
                      <div className="relative w-full max-w-[380px] mx-auto" style={{ height: 320 }}>
                        {/* Sales Ops circle */}
                        <div className="absolute rounded-full border-2 border-[#FF7A59]/40 flex items-start justify-center pt-6" style={{ width: 200, height: 200, top: 0, left: "50%", transform: "translateX(-65%)", background: "radial-gradient(circle at 50% 40%, rgba(255,122,89,0.12), rgba(255,122,89,0.03))" }}>
                          <div className="text-center">
                            <p className="text-[12px] font-bold text-[#FF7A59]">Sales Ops</p>
                            <p className="text-[9px] text-[#FF7A59]/60 mt-1 max-w-[100px] mx-auto leading-[1.4]">CRM, pipeline, forecasting, quotas</p>
                          </div>
                        </div>
                        {/* Marketing Ops circle */}
                        <div className="absolute rounded-full border-2 border-[#4B5EFC]/40 flex items-start justify-center pt-6" style={{ width: 200, height: 200, top: 0, right: "50%", transform: "translateX(65%)", background: "radial-gradient(circle at 50% 40%, rgba(75,94,252,0.12), rgba(75,94,252,0.03))" }}>
                          <div className="text-center">
                            <p className="text-[12px] font-bold text-[#4B5EFC]">Marketing Ops</p>
                            <p className="text-[9px] text-[#4B5EFC]/60 mt-1 max-w-[100px] mx-auto leading-[1.4]">Automation, leads, attribution, stack</p>
                          </div>
                        </div>
                        {/* CS Ops circle */}
                        <div className="absolute rounded-full border-2 border-[#6C5CE7]/40 flex items-end justify-center pb-6" style={{ width: 200, height: 200, bottom: 0, left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle at 50% 60%, rgba(108,92,231,0.12), rgba(108,92,231,0.03))" }}>
                          <div className="text-center">
                            <p className="text-[12px] font-bold text-[#6C5CE7]">CS Ops</p>
                            <p className="text-[9px] text-[#6C5CE7]/60 mt-1 max-w-[100px] mx-auto leading-[1.4]">Onboarding, retention, upsell, health</p>
                          </div>
                        </div>
                        {/* Center intersection = RevOps */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 z-10">
                          <div className="w-[90px] h-[90px] rounded-full bg-[#22C55E]/15 border-2 border-[#22C55E]/50 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-[13px] font-bold text-[#22C55E]">RevOps</p>
                              <p className="text-[8px] text-[#22C55E]/60 mt-0.5">Vision unifiee</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Legend */}
                      <div className="mt-4 pt-4 border-t border-[#F2F2F2] flex flex-wrap justify-center gap-4">
                        {[
                          { label: "Donnees unifiees", color: "#22C55E" },
                          { label: "Processus de bout en bout", color: "#22C55E" },
                          { label: "Stack integree", color: "#22C55E" },
                          { label: "Metriques partagees", color: "#22C55E" },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-[9px] text-[#999]">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 -- Tableau comparatif */}
              <section id="tableau-comparatif" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Tableau comparatif : Sales Ops vs Marketing Ops vs RevOps</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Pour clarifier les differences, voici une comparaison detaillee sur douze criteres cles. Ce tableau permet de comprendre en un coup d&apos;oeil ce qui releve de chaque fonction et ou le RevOps apporte une rupture par rapport aux Ops en silo.</p>
                  </div>

                  {/* Comparison table */}
                  <div className="rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="bg-[#111]">
                            <th className="text-left py-3 px-4 text-[10px] font-semibold text-white/60 uppercase tracking-wider w-[25%]">Critere</th>
                            <th className="text-left py-3 px-4 text-[10px] font-semibold uppercase tracking-wider w-[25%]" style={{ color: "#FF7A59" }}>Sales Ops</th>
                            <th className="text-left py-3 px-4 text-[10px] font-semibold uppercase tracking-wider w-[25%]" style={{ color: "#4B5EFC" }}>Marketing Ops</th>
                            <th className="text-left py-3 px-4 text-[10px] font-semibold uppercase tracking-wider w-[25%]" style={{ color: "#22C55E" }}>RevOps</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { critere: "Perimetre", sales: "Equipe commerciale", marketing: "Equipe marketing", revops: "Marketing + Sales + CS" },
                            { critere: "Objectif principal", sales: "Maximiser la productivite des reps", marketing: "Maximiser le volume et la qualite des leads", revops: "Maximiser le revenu previsible de bout en bout" },
                            { critere: "Metrique nord star", sales: "Quota attainment / Win rate", marketing: "MQLs / Cout par lead / Attribution", revops: "Revenue previsible / NRR" },
                            { critere: "Reporting", sales: "Rapporte au VP Sales ou CRO", marketing: "Rapporte au CMO", revops: "Rapporte au CEO, CRO ou COO" },
                            { critere: "Donnees gerees", sales: "CRM (deals, contacts, activites)", marketing: "Marketing automation, analytics web", revops: "Source unique de verite cross-departement" },
                            { critere: "Stack technologique", sales: "CRM + outils de vente", marketing: "Automation + analytics + ads", revops: "Stack integree de bout en bout" },
                            { critere: "Handoff", sales: "Recoit les leads du marketing", marketing: "Transmet les MQLs aux sales", revops: "Orchestre chaque transition comme un continuum" },
                            { critere: "Vision client", sales: "Prospect en cours de vente", marketing: "Visiteur et lead pre-vente", revops: "Client de bout en bout (acquisition a retention)" },
                            { critere: "Optimisation", sales: "Pipeline et conversion", marketing: "Campagnes et attribution", revops: "Cycle de revenu complet" },
                            { critere: "Arbitrage", sales: "Optimise pour les sales", marketing: "Optimise pour le marketing", revops: "Arbitre entre les departements sans biais" },
                            { critere: "Maturite requise", sales: "Equipe sales de 3+ reps", marketing: "Budget marketing significatif", revops: "Organisation de 50+ personnes ou forte croissance" },
                            { critere: "Risque principal", sales: "Silo sales deconnecte du marketing", marketing: "Silo marketing deconnecte du revenu reel", revops: "Complexite de mise en oeuvre et conduite du changement" },
                          ].map((row, i) => (
                            <tr key={row.critere} className={i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}>
                              <td className="py-2.5 px-4 font-semibold text-[#111]">{row.critere}</td>
                              <td className="py-2.5 px-4 text-[#666]">{row.sales}</td>
                              <td className="py-2.5 px-4 text-[#666]">{row.marketing}</td>
                              <td className="py-2.5 px-4 text-[#444] font-medium">{row.revops}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 -- Les 3 modeles organisationnels */}
              <section id="modeles-organisationnels" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les 3 modeles organisationnels : silos, hub-and-spoke, unifie</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Il n&apos;existe pas un seul moyen d&apos;organiser les operations de revenu. Selon la taille de l&apos;entreprise, la maturite des equipes et les ressources disponibles, trois modeles sont possibles. Chacun a ses avantages, ses inconvenients et ses conditions de reussite. Les voici en detail.</p>
                  </div>

                  {/* CSS Org Chart - Model 1: Silos */}
                  <div className="mt-6 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                        <span className="text-[12px] font-semibold text-white">Modele 1 : Operations en silos</span>
                      </div>
                      <span className="text-[9px] text-white/30 font-medium">Le plus courant</span>
                    </div>
                    <div className="bg-white p-5 md:p-6">
                      {/* CEO box */}
                      <div className="flex justify-center mb-2">
                        <div className="px-4 py-2 rounded-lg bg-[#FAFAFA] border border-[#EAEAEA] text-center">
                          <p className="text-[11px] font-semibold text-[#111]">CEO / Direction</p>
                        </div>
                      </div>
                      <div className="flex justify-center mb-2">
                        <div className="w-[1px] h-4 bg-[#E0E0E0]" />
                      </div>
                      {/* Three separate branches */}
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {
                            head: "VP Marketing",
                            ops: "Marketing Ops",
                            members: ["Automation", "Analytics", "Lead scoring"],
                            color: "#4B5EFC",
                          },
                          {
                            head: "VP Sales",
                            ops: "Sales Ops",
                            members: ["CRM", "Forecasting", "Enablement"],
                            color: "#FF7A59",
                          },
                          {
                            head: "VP CS",
                            ops: "CS Ops",
                            members: ["Onboarding", "Health score", "Renewals"],
                            color: "#6C5CE7",
                          },
                        ].map((branch) => (
                          <div key={branch.head} className="text-center">
                            <div className="px-3 py-2 rounded-lg border text-center mb-1" style={{ borderColor: `${branch.color}30`, backgroundColor: `${branch.color}08` }}>
                              <p className="text-[10px] font-semibold" style={{ color: branch.color }}>{branch.head}</p>
                            </div>
                            <div className="flex justify-center mb-1"><div className="w-[1px] h-3 bg-[#E0E0E0]" /></div>
                            <div className="px-3 py-1.5 rounded-md border text-center mb-1" style={{ borderColor: `${branch.color}20`, backgroundColor: `${branch.color}05` }}>
                              <p className="text-[9px] font-medium" style={{ color: branch.color }}>{branch.ops}</p>
                            </div>
                            <div className="flex justify-center mb-1"><div className="w-[1px] h-2 bg-[#E0E0E0]" /></div>
                            <div className="space-y-1">
                              {branch.members.map((m) => (
                                <div key={m} className="px-2 py-1 rounded bg-[#FAFAFA] border border-[#F0F0F0] text-[8px] text-[#999]">{m}</div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Pros/Cons */}
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-[#22C55E]/5 border border-[#22C55E]/15">
                          <p className="text-[10px] font-semibold text-[#22C55E] mb-1.5">Avantages</p>
                          <div className="space-y-1">
                            {["Simplicite de mise en place", "Chaque Ops connait son departement en profondeur", "Autonomie des equipes"].map((p) => (
                              <div key={p} className="flex items-start gap-1.5 text-[9px] text-[#777]">
                                <span className="w-1 h-1 rounded-full bg-[#22C55E] mt-1 shrink-0" />
                                {p}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#FF7A59]/5 border border-[#FF7A59]/15">
                          <p className="text-[10px] font-semibold text-[#FF7A59] mb-1.5">Inconvenients</p>
                          <div className="space-y-1">
                            {["Donnees fragmentees entre les silos", "Pas de vision du parcours client complet", "Conflits de priorites entre departements"].map((c) => (
                              <div key={c} className="flex items-start gap-1.5 text-[9px] text-[#777]">
                                <span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1 shrink-0" />
                                {c}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CSS Org Chart - Model 2: Hub and Spoke */}
                  <div className="mt-4 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#4B5EFC]" />
                        <span className="text-[12px] font-semibold text-white">Modele 2 : Hub-and-spoke</span>
                      </div>
                      <span className="text-[9px] text-white/30 font-medium">Transition courante</span>
                    </div>
                    <div className="bg-white p-5 md:p-6">
                      <div className="flex justify-center mb-2">
                        <div className="px-4 py-2 rounded-lg bg-[#FAFAFA] border border-[#EAEAEA] text-center">
                          <p className="text-[11px] font-semibold text-[#111]">CEO / Direction</p>
                        </div>
                      </div>
                      <div className="flex justify-center mb-2"><div className="w-[1px] h-4 bg-[#E0E0E0]" /></div>
                      {/* RevOps coordinator hub */}
                      <div className="flex justify-center mb-2">
                        <div className="px-5 py-2.5 rounded-lg bg-[#22C55E]/10 border-2 border-[#22C55E]/30 text-center">
                          <p className="text-[11px] font-bold text-[#22C55E]">RevOps Lead (Hub)</p>
                          <p className="text-[8px] text-[#22C55E]/60 mt-0.5">Coordination, donnees, strategie</p>
                        </div>
                      </div>
                      <div className="flex justify-center mb-2"><div className="w-[1px] h-3 bg-[#22C55E]/30" /></div>
                      {/* Spokes still embedded */}
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { dept: "Marketing", ops: "Mktg Ops (spoke)", color: "#4B5EFC" },
                          { dept: "Sales", ops: "Sales Ops (spoke)", color: "#FF7A59" },
                          { dept: "CS", ops: "CS Ops (spoke)", color: "#6C5CE7" },
                        ].map((branch) => (
                          <div key={branch.dept} className="text-center">
                            <div className="px-3 py-2 rounded-lg border text-center mb-1" style={{ borderColor: `${branch.color}30`, backgroundColor: `${branch.color}08` }}>
                              <p className="text-[10px] font-semibold" style={{ color: branch.color }}>{branch.dept}</p>
                            </div>
                            <div className="flex justify-center mb-1"><div className="w-[1px] h-3" style={{ backgroundColor: `${branch.color}30` }} /></div>
                            <div className="px-3 py-1.5 rounded-md border-2 border-dashed text-center" style={{ borderColor: `${branch.color}25` }}>
                              <p className="text-[9px] font-medium" style={{ color: branch.color }}>{branch.ops}</p>
                              <p className="text-[7px] text-[#BBB] mt-0.5">Rattache au departement + RevOps Lead</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Pros/Cons */}
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-[#22C55E]/5 border border-[#22C55E]/15">
                          <p className="text-[10px] font-semibold text-[#22C55E] mb-1.5">Avantages</p>
                          <div className="space-y-1">
                            {["Vision transverse grace au RevOps Lead", "Les Ops restent proches de leur departement", "Transition progressive depuis le modele en silos"].map((p) => (
                              <div key={p} className="flex items-start gap-1.5 text-[9px] text-[#777]">
                                <span className="w-1 h-1 rounded-full bg-[#22C55E] mt-1 shrink-0" />
                                {p}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#FF7A59]/5 border border-[#FF7A59]/15">
                          <p className="text-[10px] font-semibold text-[#FF7A59] mb-1.5">Inconvenients</p>
                          <div className="space-y-1">
                            {["Double reporting (departement + RevOps)", "Le hub peut manquer d&apos;autorite reelle", "Risque de coordination sans pouvoir de decision"].map((c) => (
                              <div key={c} className="flex items-start gap-1.5 text-[9px] text-[#777]">
                                <span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1 shrink-0" />
                                {c}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CSS Org Chart - Model 3: Unified RevOps */}
                  <div className="mt-4 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                        <span className="text-[12px] font-semibold text-white">Modele 3 : RevOps unifie</span>
                      </div>
                      <span className="text-[9px] text-white/30 font-medium">Best practice</span>
                    </div>
                    <div className="bg-white p-5 md:p-6">
                      <div className="flex justify-center mb-2">
                        <div className="px-4 py-2 rounded-lg bg-[#FAFAFA] border border-[#EAEAEA] text-center">
                          <p className="text-[11px] font-semibold text-[#111]">CEO / CRO</p>
                        </div>
                      </div>
                      <div className="flex justify-center mb-2"><div className="w-[1px] h-4 bg-[#E0E0E0]" /></div>
                      {/* Unified RevOps team */}
                      <div className="flex justify-center mb-2">
                        <div className="px-6 py-3 rounded-lg bg-[#22C55E]/10 border-2 border-[#22C55E]/40 text-center">
                          <p className="text-[12px] font-bold text-[#22C55E]">VP Revenue Operations</p>
                          <p className="text-[8px] text-[#22C55E]/60 mt-0.5">Equipe centralisee -- tous les Ops</p>
                        </div>
                      </div>
                      <div className="flex justify-center mb-2"><div className="w-[1px] h-3 bg-[#22C55E]/30" /></div>
                      {/* All ops under one roof */}
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { role: "Systems & Data", desc: "Stack tech, integrations, data quality", color: "#22C55E" },
                          { role: "Process & Strategy", desc: "Funnel, handoffs, SLAs, playbooks", color: "#22C55E" },
                          { role: "Analytics & Insights", desc: "Dashboards, forecasting, attribution", color: "#22C55E" },
                          { role: "Enablement", desc: "Formation, documentation, adoption", color: "#22C55E" },
                        ].map((item) => (
                          <div key={item.role} className="text-center px-2 py-2.5 rounded-lg bg-[#22C55E]/5 border border-[#22C55E]/15">
                            <p className="text-[9px] font-semibold text-[#22C55E]">{item.role}</p>
                            <p className="text-[7px] text-[#999] mt-0.5 leading-[1.4]">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center my-2"><div className="w-[1px] h-3 bg-[#E0E0E0]" /></div>
                      {/* Departments served */}
                      <div className="flex justify-center">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FAFAFA] border border-[#EAEAEA]">
                          <span className="text-[9px] font-medium text-[#999]">Sert :</span>
                          <span className="px-2 py-0.5 rounded text-[8px] font-medium" style={{ backgroundColor: "#4B5EFC15", color: "#4B5EFC" }}>Marketing</span>
                          <span className="px-2 py-0.5 rounded text-[8px] font-medium" style={{ backgroundColor: "#FF7A5915", color: "#FF7A59" }}>Sales</span>
                          <span className="px-2 py-0.5 rounded text-[8px] font-medium" style={{ backgroundColor: "#6C5CE715", color: "#6C5CE7" }}>CS</span>
                        </div>
                      </div>
                      {/* Pros/Cons */}
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-[#22C55E]/5 border border-[#22C55E]/15">
                          <p className="text-[10px] font-semibold text-[#22C55E] mb-1.5">Avantages</p>
                          <div className="space-y-1">
                            {["Source unique de verite pour toutes les donnees", "Arbitrage neutre entre departements", "Optimisation du cycle de revenu complet", "Economies d&apos;echelle sur la stack tech"].map((p) => (
                              <div key={p} className="flex items-start gap-1.5 text-[9px] text-[#777]">
                                <span className="w-1 h-1 rounded-full bg-[#22C55E] mt-1 shrink-0" />
                                {p}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-[#FF7A59]/5 border border-[#FF7A59]/15">
                          <p className="text-[10px] font-semibold text-[#FF7A59] mb-1.5">Inconvenients</p>
                          <div className="space-y-1">
                            {["Necessite un leader RevOps senior", "Conduite du changement significative", "Les departements peuvent se sentir demunis", "Complexite de gestion d&apos;une equipe transverse"].map((c) => (
                              <div key={c} className="flex items-start gap-1.5 text-[9px] text-[#777]">
                                <span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1 shrink-0" />
                                {c}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 -- Quand passer au RevOps */}
              <section id="quand-passer-revops" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Quand passer au RevOps ? Les signaux et les seuils</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Toutes les entreprises n&apos;ont pas besoin d&apos;un modele RevOps unifie des le premier jour. Une startup de 10 personnes avec un commercial et un marketeur n&apos;a pas les memes besoins qu&apos;une scale-up de 200 personnes avec des equipes sales, marketing et CS structurees. La question n&apos;est pas &ldquo;faut-il faire du RevOps ?&rdquo; mais &ldquo;quand est-ce que le cout de ne pas le faire depasse le cout de le mettre en place ?&rdquo;.</p>
                    <p>Le premier signal est la fragmentation des donnees. Si vos equipes passent plus de temps a debattre des chiffres qu&apos;a les analyser, c&apos;est un indicateur fort. Quand le marketing presente un nombre de MQLs different de ce que les sales voient dans le CRM, quand le CS ne sait pas quelles promesses ont ete faites pendant la vente, quand personne ne peut tracer le parcours complet d&apos;un client de la premiere visite au renouvellement, le besoin de RevOps est reel.</p>
                    <p>Le deuxieme signal est la croissance de l&apos;equipe. A partir de 5 commerciaux, 3 personnes en marketing et 2 CSMs, les frictions inter-equipes deviennent significatives. Les processus informels qui fonctionnaient quand tout le monde etait dans la meme piece ne tiennent plus. Il faut des processus documentes, des handoffs automatises et une gouvernance des donnees. C&apos;est typiquement le moment ou le besoin d&apos;un premier profil RevOps se fait sentir.</p>
                    <p>Le troisieme signal est la complexite du funnel. Si votre cycle de vente implique plusieurs points de contact marketing, des sequences de nurturing, un processus de qualification en plusieurs etapes, un onboarding structure et des renouvellements periodiques, la coordination entre les equipes est trop complexe pour etre geree de maniere informelle. Chaque rupture dans le processus est une perte de revenu potentiel.</p>
                    <p>Le quatrieme signal est la maturite technologique. Quand vous avez plus de 5 outils dans votre stack go-to-market (CRM, marketing automation, outils de prospection, CS platform, analytics) et que ces outils ne sont pas correctement integres, vous avez besoin de quelqu&apos;un qui pense la stack de maniere globale. C&apos;est le role du RevOps.</p>
                  </div>

                  {/* Readiness assessment */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { signal: "Donnees fragmentees", desc: "Marketing et sales ne s&apos;accordent pas sur les chiffres. Rapports contradictoires en comite.", seuil: "3+ sources de verite differentes", severity: "Critical", color: "#FF7A59" },
                      { signal: "Equipe en croissance", desc: "Plus de 5 commerciaux, 3 marketeurs, 2 CSMs. Les processus informels ne tiennent plus.", seuil: "10+ personnes en go-to-market", severity: "Eleve", color: "#FF7A59" },
                      { signal: "Funnel complexe", desc: "Cycle de vente multi-touch, nurturing, qualification en etapes, onboarding et renouvellements.", seuil: "Cycle > 30 jours, 5+ touchpoints", severity: "Eleve", color: "#6C5CE7" },
                      { signal: "Stack eclatee", desc: "Plus de 5 outils go-to-market mal integres. Donnees en silo, synchronisation manuelle.", seuil: "5+ outils sans integration native", severity: "Modere", color: "#4B5EFC" },
                      { signal: "Blame game installe", desc: "Marketing accuse les sales, les sales accusent le marketing. Les reunions sont tendues.", seuil: "Desaccords recurrents", severity: "Critical", color: "#FF7A59" },
                      { signal: "Churn inexplique", desc: "Perte de clients sans comprendre les causes. Pas de visibilite sur les promesses faites en avant-vente.", seuil: "Churn > 10% annuel sans diagnostic", severity: "Eleve", color: "#6C5CE7" },
                    ].map((item) => (
                      <div key={item.signal} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[12px] font-semibold text-[#111]">{item.signal}</p>
                          <span className="text-[9px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${item.color}15`, color: item.color }}>{item.severity}</span>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.6] mb-2">{item.desc}</p>
                        <div className="pt-2 border-t border-[#F0F0F0]">
                          <span className="text-[9px] text-[#BBB]">Seuil : {item.seuil}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 -- Impact mesurable (dark section) */}
              <section id="impact-mesurable" className="mb-8">
                <div className="rounded-lg bg-[#111] text-white p-5 md:p-8">
                  <h2 className="text-[17px] font-semibold text-white mb-4">L&apos;impact mesurable du RevOps : les chiffres qui comptent</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Le RevOps n&apos;est pas une mode organisationnelle. C&apos;est un levier de performance dont l&apos;impact est mesurable et documente. Les entreprises qui ont fait la transition d&apos;un modele en silos vers un modele RevOps unifie rapportent des resultats significatifs sur plusieurs indicateurs cles.</p>
                    <p>Selon une etude de Boston Consulting Group, les entreprises qui ont adopte le RevOps voient leur revenu augmenter 19% plus rapidement que celles qui conservent des operations en silos. Cette croissance s&apos;explique par la reduction des frictions dans le parcours client, l&apos;amelioration du handoff entre les equipes et une meilleure exploitation des donnees pour prendre des decisions.</p>
                    <p>La productivite des equipes augmente egalement de maniere significative. Forrester rapporte une augmentation de 10 a 20% de la productivite commerciale dans les organisations qui ont deploye le RevOps. Les commerciaux passent moins de temps a chercher des informations, a se battre avec des outils mal integres et a attendre des leads qualifies. Ils vendent plus, avec moins d&apos;effort administratif.</p>
                    <p>L&apos;impact sur la qualite des donnees est egalement considerable. Les organisations RevOps rapportent une reduction de 30 a 50% des erreurs dans les donnees CRM, une amelioration de la precision du forecasting de 15 a 25%, et une reduction du temps passe en reconciliation de donnees de 40 a 60%. La source unique de verite elimine les debats sur la fiabilite des chiffres et libere du temps pour l&apos;analyse et l&apos;action.</p>
                    <p>Cote satisfaction client, les entreprises RevOps voient leur NPS augmenter en moyenne de 15 a 20 points. Le client beneficie d&apos;une experience coherente de bout en bout : pas de repetition d&apos;informations entre les equipes, pas de promesses non tenues, pas de rupture de suivi entre l&apos;avant-vente et l&apos;apres-vente.</p>
                  </div>

                  {/* Impact stats grid */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "+19%", label: "de croissance du revenu vs entreprises en silos (BCG)", color: "#FF7A59" },
                      { value: "+15%", label: "de productivite commerciale en moyenne (Forrester)", color: "#4B5EFC" },
                      { value: "-40%", label: "d&apos;erreurs dans les donnees CRM apres unification", color: "#22C55E" },
                      { value: "+20pts", label: "de NPS grace a une experience client coherente", color: "#6C5CE7" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-[20px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-[10px] text-white/40 mt-1 leading-[1.4]">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* ROI breakdown */}
                  <div className="mt-6 rounded-lg bg-white/5 border border-white/10 p-5">
                    <p className="text-[12px] font-semibold text-white mb-4">ROI du RevOps -- les leviers d&apos;impact</p>
                    <div className="space-y-3">
                      {[
                        { levier: "Reduction du cycle de vente", impact: "15-25%", desc: "Meilleurs handoffs, qualification plus rapide, moins de friction dans le processus", color: "#FF7A59", pct: 70 },
                        { levier: "Amelioration du win rate", impact: "10-15%", desc: "Leads mieux qualifies, meilleur alignement entre promesse marketing et execution commerciale", color: "#4B5EFC", pct: 55 },
                        { levier: "Reduction du churn", impact: "20-30%", desc: "Continuite entre avant-vente et apres-vente, attentes clients mieux gerees", color: "#6C5CE7", pct: 65 },
                        { levier: "Augmentation du revenu par client", impact: "15-20%", desc: "Meilleure identification des opportunites d&apos;upsell et cross-sell", color: "#22C55E", pct: 60 },
                        { levier: "Precision du forecast", impact: "+25%", desc: "Source unique de verite, donnees propres, modeles predictifs fiables", color: "#FF7A59", pct: 75 },
                      ].map((item) => (
                        <div key={item.levier}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] text-white/70">{item.levier}</span>
                            <span className="text-[11px] font-semibold" style={{ color: item.color }}>{item.impact}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                          </div>
                          <p className="text-[9px] text-white/30 mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 -- Notre recommandation */}
              <section id="recommandation" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Notre recommandation : comment choisir le bon modele</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La question n&apos;est pas de choisir entre Sales Ops, Marketing Ops et RevOps comme si c&apos;etaient des options mutuellement exclusives. La bonne approche depend de votre stade de maturite, de la taille de votre equipe et de la complexite de votre cycle de revenu. Voici notre grille de decision.</p>
                    <p>Si vous etes une startup ou une PME avec moins de 20 personnes en go-to-market, vous n&apos;avez probablement pas besoin d&apos;une equipe RevOps dediee. Commencez par un profil polyvalent capable de gerer le CRM, les workflows marketing et les processus de base. Donnez-lui une vision transverse des le depart, meme s&apos;il est rattache a une equipe en particulier. L&apos;important est de poser les fondations : une source de donnees fiable, des definitions communes et des processus documentes.</p>
                    <p>Si vous avez entre 20 et 100 personnes et des equipes marketing, sales et CS distinctes, le modele hub-and-spoke est generalement le plus adapte. Nommez un RevOps Lead qui coordonne les Ops de chaque departement. Il n&apos;a pas besoin de manager hierarchiquement tous les profils Ops, mais il doit avoir la legitimite et le mandat pour aligner les processus, unifier les donnees et arbitrer les priorites cross-departement.</p>
                    <p>Au-dela de 100 personnes, le modele unifie devient pertinent. Creez une equipe RevOps centralisee qui rapporte au CEO ou au CRO, avec des specialistes en systemes et donnees, en processus et strategie, en analytics et en enablement. Cette equipe sert les trois departements de maniere equitable et optimise le cycle de revenu dans son ensemble.</p>
                    <p>Quelle que soit la taille de votre entreprise, une chose est certaine : plus vous attendez pour penser &ldquo;RevOps&rdquo;, plus la dette operationnelle s&apos;accumule. Les donnees se fragmentent, les processus divergent, les outils se multiplient sans coherence. Mieux vaut poser les fondations tot et les renforcer progressivement que de devoir tout reconstruire quand les frictions deviennent insupportables.</p>
                    <p>Chez Ceres, nous accompagnons les entreprises B2B dans cette transition, quel que soit leur stade de maturite. Notre approche est pragmatique : on commence par un audit de votre organisation operationnelle actuelle, on identifie les quick wins et on construit une feuille de route progressive vers un modele RevOps adapte a votre contexte. Pas de revolution du jour au lendemain, mais une evolution structuree et mesurable.</p>
                  </div>

                  {/* Maturity grid */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        stade: "Early stage",
                        taille: "< 20 personnes GTM",
                        modele: "Ops polyvalent",
                        actions: ["1 profil Ops multi-casquette", "Vision transverse des le depart", "CRM bien configure comme fondation", "Definitions et processus documentes"],
                        color: "#4B5EFC",
                      },
                      {
                        stade: "Growth",
                        taille: "20-100 personnes GTM",
                        modele: "Hub-and-spoke",
                        actions: ["RevOps Lead en coordination", "Ops specialises par departement", "Donnees unifiees progressivement", "SLAs et handoffs automatises"],
                        color: "#6C5CE7",
                      },
                      {
                        stade: "Scale",
                        taille: "100+ personnes GTM",
                        modele: "RevOps unifie",
                        actions: ["Equipe RevOps centralisee", "Reporting au CEO/CRO", "Source unique de verite", "Optimisation du cycle complet"],
                        color: "#22C55E",
                      },
                    ].map((item) => (
                      <div key={item.stade} className="p-4 rounded-lg border-2 bg-white" style={{ borderColor: `${item.color}30` }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[13px] font-bold" style={{ color: item.color }}>{item.stade}</span>
                        </div>
                        <p className="text-[10px] text-[#BBB] mb-1">{item.taille}</p>
                        <p className="text-[11px] font-semibold text-[#111] mb-3">Modele : {item.modele}</p>
                        <div className="space-y-1.5">
                          {item.actions.map((a) => (
                            <div key={a} className="flex items-start gap-2 text-[10px] text-[#888]">
                              <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.color }} />
                              {a}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Ceres method */}
                  <div className="mt-6 rounded-lg bg-[#FF7A59]/5 border border-[#FF7A59]/15 p-5">
                    <p className="text-[12px] font-semibold text-[#FF7A59] mb-3">Notre methode d&apos;accompagnement RevOps</p>
                    <div className="space-y-2">
                      {[
                        { etape: "Semaine 1-2", action: "Audit de l&apos;organisation Ops actuelle : processus, donnees, outils, equipes" },
                        { etape: "Semaine 3", action: "Restitution et recommandation : modele cible, quick wins, feuille de route" },
                        { etape: "Semaine 4-8", action: "Deploiement progressif : unification des donnees, processus de handoff, dashboards" },
                        { etape: "Ongoing", action: "Accompagnement continu : optimisation, formation, quarterly reviews" },
                      ].map((m) => (
                        <div key={m.etape} className="flex items-start gap-3">
                          <span className="text-[10px] font-semibold text-[#FF7A59] w-20 shrink-0 pt-0.5">{m.etape}</span>
                          <span className="text-[11px] text-[#666] leading-[1.5]">{m.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Related articles */}
              <section className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-7 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[14px] font-semibold text-[#111] mb-4">Articles lies</h2>
                  <div className="space-y-2">
                    {relatedArticles.map((a) => (
                      <Link key={a.slug} href={`/blog/${a.slug}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FAFAFA] transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: a.color }} />
                          <span className="text-[13px] font-medium text-[#111] group-hover:text-[#444] transition-colors">{a.title}</span>
                        </div>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[#DDD] group-hover:text-[#999] group-hover:translate-x-0.5 transition-all"><path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section>
                <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-6 md:p-10 text-center">
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Pret a structurer vos operations de revenu ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On vous aide a choisir le bon modele organisationnel et a deployer une approche RevOps adaptee a votre stade de maturite. Audit, recommandation, deploiement.</p>
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#FF7A59]" />Reserver un appel decouverte
                  </a>
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
