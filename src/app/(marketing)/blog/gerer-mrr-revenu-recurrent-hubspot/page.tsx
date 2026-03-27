"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Comment gerer votre MRR dans HubSpot : le guide complet",
  description: "Guide complet pour configurer le suivi du MRR (Monthly Recurring Revenue) dans HubSpot. Proprietes de deal, champs calcules, dashboards, forecasting et automatisations.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-02-22",
  dateModified: "2026-02-22",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/gerer-mrr-revenu-recurrent-hubspot" },
  articleSection: "Data & Reporting",
  wordCount: 2200,
  inLanguage: "fr",
};

const sections = [
  { id: "pourquoi-mrr", title: "Pourquoi suivre le MRR dans votre CRM" },
  { id: "metriques-cles", title: "Les metriques cles du revenu recurrent" },
  { id: "proprietes-deal", title: "Configurer les proprietes de deal" },
  { id: "proprietes-calculees", title: "Creer des proprietes calculees" },
  { id: "pipeline-saas", title: "Le pipeline adapte au SaaS" },
  { id: "dashboards", title: "Les 5 dashboards MRR essentiels" },
  { id: "forecasting", title: "Forecasting et previsions de revenus" },
  { id: "automatiser-alertes", title: "Automatiser les alertes" },
  { id: "limites-hubspot", title: "Les limites de HubSpot pour le MRR" },
  { id: "setup-ceres", title: "Notre setup chez Ceres" },
];

const relatedArticles = [
  { title: "Les 50 points a verifier dans votre audit CRM", slug: "audit-crm-checklist", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Automatiser son reporting HubSpot", slug: "automatiser-reporting-hubspot", category: "Data & Reporting", color: "#22C55E" },
  { title: "HubSpot vs Salesforce en 2026", slug: "hubspot-vs-salesforce-2026", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function MRRHubSpotArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("pourquoi-mrr");

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
        <div className="h-full bg-[#22C55E] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "10%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "30%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "50%", width: 260, height: 260, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "72%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />

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
                        ? "border-[#22C55E] text-[#111] font-medium"
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
                  <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors cursor-pointer">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.04a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L5.25 9.068" /></svg>
                  </button>
                  <a href="https://twitter.com/intent/tweet" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Gerer le MRR dans HubSpot</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>Data &amp; Reporting</Badge>
                <span className="text-[11px] text-[#CCC]">11 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Comment gerer votre MRR dans HubSpot : le guide complet
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Le Monthly Recurring Revenue est la metrique fondamentale de toute entreprise SaaS. Pourtant, HubSpot ne propose pas de champ MRR natif. Ce guide detaille comment configurer vos proprietes, vos dashboards et vos automatisations pour suivre votre MRR directement dans votre CRM.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>22 fevrier 2026</span>
              </div>

              {/* Quick KPI overview */}
              <div className="mt-8 rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-5">
                <span className="text-[13px] font-semibold text-[#111] mb-4 block">Ce que vous allez mettre en place</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Proprietes custom", value: "8", color: "#22C55E" },
                    { label: "Dashboards", value: "5", color: "#4B5EFC" },
                    { label: "Workflows", value: "3", color: "#FF7A59" },
                    { label: "Temps de setup", value: "2h", color: "#22C55E" },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-3 rounded-xl bg-white border border-[#F2F2F2]">
                      <div className="text-[22px] font-bold" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-[10px] text-[#999] mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </header>

            <article>
              {/* Section 1 — Pourquoi suivre le MRR */}
              <section id="pourquoi-mrr" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi suivre le MRR dans votre CRM</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La plupart des equipes SaaS suivent leur MRR dans un spreadsheet. Un Google Sheet partage entre le CEO, le VP Sales et le head of finance, mis a jour manuellement une fois par semaine. Ca fonctionne quand vous avez 20 clients. A 200, c&apos;est un cauchemar operationnel.</p>
                    <p>Le probleme fondamental : votre CRM contient deja toutes les donnees necessaires pour calculer le MRR. Les deals, les montants, les dates de renouvellement, les upsells, les churns. Mais HubSpot ne propose pas de champ MRR natif. Il n&apos;y a pas de propriete &ldquo;Monthly Recurring Revenue&rdquo; prête a l&apos;emploi.</p>
                    <p>Resultat : les equipes dupliquent les donnees, perdent du temps en saisie manuelle, et finissent avec des ecarts entre le CRM et la realite financiere. Le reporting trimestriel devient un exercice de reconciliation plutot qu&apos;un outil de pilotage.</p>
                    <p>Suivre le MRR directement dans HubSpot resout trois problemes concrets :</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Source unique de verite : plus d&apos;ecarts entre le CRM, le spreadsheet et l&apos;outil de facturation</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" />Reporting en temps reel : le MRR se met a jour automatiquement a chaque deal cloture, upsell ou churn</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] mt-2 shrink-0" />Forecasting fiable : vos previsions de revenus s&apos;appuient sur des donnees fraiches, pas sur un fichier date de la semaine derniere</li>
                    </ul>
                    <p>Dans ce guide, on va configurer un setup complet : proprietes custom, champs calcules, pipeline optimise, dashboards et automatisations. Le tout dans HubSpot, sans outil tiers.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 — Metriques cles */}
              <section id="metriques-cles" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les metriques cles du revenu recurrent</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Avant de configurer quoi que ce soit dans HubSpot, il faut s&apos;aligner sur les definitions. Le revenu recurrent se decompose en plusieurs metriques qui racontent chacune une partie de l&apos;histoire. Voici les cinq metriques fondamentales que chaque equipe SaaS doit suivre.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        metric: "MRR (Monthly Recurring Revenue)",
                        definition: "Le revenu mensuel recurrent total. C&apos;est la somme de tous les abonnements actifs, ramenee au mois. Si un client paie 12 000 euros par an, son MRR est de 1 000 euros.",
                        formula: "MRR = Somme de tous les abonnements mensuels actifs",
                        color: "#22C55E",
                      },
                      {
                        metric: "ARR (Annual Recurring Revenue)",
                        definition: "Le MRR multiplie par 12. C&apos;est la metrique que regardent les investisseurs et les boards. Elle donne une projection annualisee de vos revenus recurrents.",
                        formula: "ARR = MRR x 12",
                        color: "#4B5EFC",
                      },
                      {
                        metric: "Net New MRR",
                        definition: "Le MRR net gagne sur une periode donnee. C&apos;est la difference entre les nouveaux revenus (new business + expansion) et les revenus perdus (churn + contraction). C&apos;est l&apos;indicateur de croissance par excellence.",
                        formula: "Net New MRR = New MRR + Expansion MRR - Churn MRR - Contraction MRR",
                        color: "#22C55E",
                      },
                      {
                        metric: "Churn MRR",
                        definition: "Le MRR perdu chaque mois a cause des clients qui annulent leur abonnement. Un churn MRR de 5% signifie que vous perdez 5% de votre base de revenus chaque mois. Au-dela de 3% mensuel, vous avez un probleme de retention serieux.",
                        formula: "Churn MRR = MRR perdu / MRR debut de periode",
                        color: "#EF4444",
                      },
                      {
                        metric: "Expansion MRR",
                        definition: "Le MRR additionnel genere par les clients existants : upsells, cross-sells, ajout de sieges ou passage a un plan superieur. L&apos;expansion MRR est la metrique la plus sous-estimee. Quand elle depasse le churn, vous avez atteint le negative churn, le graal du SaaS.",
                        formula: "Expansion MRR = MRR additionnel des clients existants",
                        color: "#6C5CE7",
                      },
                    ].map((m) => (
                      <div key={m.metric} className="rounded-xl border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: m.color }} />
                          <h3 className="text-[14px] font-semibold text-[#111]">{m.metric}</h3>
                        </div>
                        <p className="text-[12px] text-[#666] leading-[1.7] mb-2">{m.definition}</p>
                        <div className="rounded-lg bg-[#FAFAFA] px-3 py-2">
                          <code className="text-[11px] text-[#888] font-mono">{m.formula}</code>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Ces cinq metriques forment le socle de votre reporting MRR. Chacune d&apos;entre elles va correspondre a une propriete custom dans HubSpot, que nous allons creer dans la section suivante.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 — Proprietes de deal */}
              <section id="proprietes-deal" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Configurer les proprietes de deal pour le MRR</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>HubSpot utilise la propriete &ldquo;Amount&rdquo; (Montant) par defaut sur les deals. Le probleme : ce montant represente generalement la valeur totale du contrat, pas le revenu mensuel recurrent. Un deal a 24 000 euros sur 2 ans represente un MRR de 1 000 euros, mais HubSpot affiche 24 000 euros dans vos rapports.</p>
                    <p>Il faut creer des proprietes custom dediees au MRR. Voici les 8 proprietes que nous recommandons de creer sur l&apos;objet Deal dans HubSpot :</p>
                  </div>

                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-[12px]">
                      <thead>
                        <tr className="border-b border-[#F2F2F2]">
                          <th className="text-left py-2 pr-4 text-[#999] font-medium">Propriete</th>
                          <th className="text-left py-2 pr-4 text-[#999] font-medium">Type</th>
                          <th className="text-left py-2 text-[#999] font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#555]">
                        {[
                          { name: "mrr_amount", type: "Nombre", desc: "Montant MRR du deal en euros" },
                          { name: "arr_amount", type: "Calcul", desc: "MRR x 12 (calcule automatiquement)" },
                          { name: "contract_duration_months", type: "Nombre", desc: "Duree du contrat en mois" },
                          { name: "billing_frequency", type: "Dropdown", desc: "Mensuel / Trimestriel / Annuel" },
                          { name: "renewal_date", type: "Date", desc: "Date de renouvellement du contrat" },
                          { name: "mrr_type", type: "Dropdown", desc: "New / Expansion / Contraction / Churn" },
                          { name: "previous_mrr", type: "Nombre", desc: "MRR avant modification (pour upsell/downgrade)" },
                          { name: "mrr_delta", type: "Calcul", desc: "Difference entre MRR actuel et precedent" },
                        ].map((p) => (
                          <tr key={p.name} className="border-b border-[#F8F8F8]">
                            <td className="py-2.5 pr-4"><code className="text-[11px] text-[#22C55E] font-mono bg-[#F0FDF4] px-1.5 py-0.5 rounded">{p.name}</code></td>
                            <td className="py-2.5 pr-4 text-[#888]">{p.type}</td>
                            <td className="py-2.5">{p.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Pour creer ces proprietes : Parametres HubSpot &gt; Proprietes &gt; Proprietes du deal &gt; Creer une propriete. Groupez-les dans un groupe custom &ldquo;Revenu Recurrent&rdquo; pour les retrouver facilement.</p>
                    <p>Point important : la propriete <code className="text-[11px] text-[#22C55E] font-mono bg-[#F0FDF4] px-1.5 py-0.5 rounded">mrr_type</code> est essentielle. C&apos;est elle qui vous permettra de filtrer vos rapports entre new business, expansion et churn. Les valeurs du dropdown doivent etre exactes : New, Expansion, Contraction, Renewal, Churn.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 — Proprietes calculees */}
              <section id="proprietes-calculees" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Creer des proprietes calculees (formules HubSpot)</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>HubSpot Operations Hub (edition Pro ou Enterprise) permet de creer des proprietes calculees avec des formules. C&apos;est indispensable pour automatiser le calcul du MRR a partir du montant total et de la duree du contrat.</p>
                    <p>Voici les trois formules essentielles a configurer :</p>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      {
                        title: "Calcul automatique du MRR",
                        desc: "Si votre equipe commerciale saisit le montant total du contrat et la duree, cette formule calcule le MRR automatiquement. Plus de risque d&apos;erreur manuelle.",
                        formula: "if(is_known(billing_frequency),\n  if(billing_frequency = \"Annuel\", amount / 12,\n    if(billing_frequency = \"Trimestriel\", amount / 3,\n      amount)),\n  amount / contract_duration_months)",
                      },
                      {
                        title: "ARR a partir du MRR",
                        desc: "Simple mais indispensable. L&apos;ARR est la metrique que vos investisseurs veulent voir en premier.",
                        formula: "mrr_amount * 12",
                      },
                      {
                        title: "Delta MRR (pour upsell et downgrade)",
                        desc: "Calcule automatiquement la variation de MRR quand un client change de plan. Positif pour un upsell, negatif pour un downgrade.",
                        formula: "mrr_amount - previous_mrr",
                      },
                    ].map((f) => (
                      <div key={f.title} className="rounded-xl border border-[#F2F2F2] overflow-hidden">
                        <div className="p-4">
                          <h3 className="text-[14px] font-semibold text-[#111] mb-1">{f.title}</h3>
                          <p className="text-[12px] text-[#666] leading-[1.7]">{f.desc}</p>
                        </div>
                        <div className="bg-[#0D0D0D] p-4 border-t border-[#222]">
                          <pre className="text-[11px] text-[#A0A0A0] leading-[1.7] font-mono whitespace-pre-wrap">{f.formula}</pre>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FFFBEB] border border-[#FEF3C7] p-4">
                    <p className="text-[12px] text-[#92400E] leading-[1.65]">
                      <strong>Prerequis :</strong> Les proprietes calculees avec formules necessitent HubSpot Operations Hub Pro (800 euros/mois) ou Enterprise. Si vous etes sur le plan Starter ou Free, vous devrez utiliser des workflows pour calculer ces valeurs (voir section suivante).
                    </p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 — Pipeline SaaS */}
              <section id="pipeline-saas" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Le pipeline adapte au SaaS</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le pipeline par defaut de HubSpot est concu pour des cycles de vente classiques. Pour une entreprise SaaS, il faut un pipeline qui reflete la realite de votre modele : acquisition, renouvellement et expansion sont trois processus distincts.</p>
                    <p>Nous recommandons de creer deux pipelines separes dans HubSpot :</p>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-sm bg-[#22C55E]" />
                        <span className="text-[13px] font-semibold text-[#111]">Pipeline New Business</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { stage: "Qualified Lead", prob: "10%", color: "#E5E5E5" },
                          { stage: "Discovery Call", prob: "20%", color: "#D4D4D4" },
                          { stage: "Demo / POC", prob: "40%", color: "#A3A3A3" },
                          { stage: "Proposal Sent", prob: "60%", color: "#737373" },
                          { stage: "Negotiation", prob: "80%", color: "#525252" },
                          { stage: "Closed Won", prob: "100%", color: "#22C55E" },
                          { stage: "Closed Lost", prob: "0%", color: "#EF4444" },
                        ].map((s) => (
                          <div key={s.stage} className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                              <span className="text-[#555]">{s.stage}</span>
                            </div>
                            <span className="text-[#999] font-mono">{s.prob}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-sm bg-[#4B5EFC]" />
                        <span className="text-[13px] font-semibold text-[#111]">Pipeline Renewal / Expansion</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { stage: "Renewal Upcoming (90j)", prob: "70%", color: "#D4D4D4" },
                          { stage: "Renewal Upcoming (30j)", prob: "80%", color: "#A3A3A3" },
                          { stage: "Upsell Identified", prob: "30%", color: "#737373" },
                          { stage: "Proposal Sent", prob: "60%", color: "#525252" },
                          { stage: "Renewed", prob: "100%", color: "#22C55E" },
                          { stage: "Churned", prob: "0%", color: "#EF4444" },
                        ].map((s) => (
                          <div key={s.stage} className="flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                              <span className="text-[#555]">{s.stage}</span>
                            </div>
                            <span className="text-[#999] font-mono">{s.prob}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Pourquoi deux pipelines ? Parce que les metriques ne sont pas les memes. Sur le new business, vous mesurez le cycle de vente et le taux de conversion. Sur le renewal, vous mesurez le churn et l&apos;expansion. Melanger les deux dans un seul pipeline rend vos rapports inexploitables.</p>
                    <p>Les probabilites associees a chaque etape sont utilisees par HubSpot pour le forecasting. Soyez realistes : analysez vos taux de conversion historiques sur les 6 derniers mois et ajustez les probabilites en consequence. Des probabilites fantasmees donnent des previsions fantasmees.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 — Dashboards (dark section) */}
              <section id="dashboards" className="mb-8">
                <div className="rounded-2xl bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Dashboards</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Les 5 dashboards MRR essentiels</h2>
                  <p className="text-[12px] text-white/50 leading-[1.75] mb-6">Une fois vos proprietes configurees, vous pouvez creer des dashboards dedies au suivi du MRR. Voici les 5 que nous installons systematiquement chez nos clients SaaS.</p>

                  <div className="space-y-4">
                    {[
                      {
                        num: "01",
                        title: "MRR Overview",
                        desc: "Vue d&apos;ensemble avec le MRR total, l&apos;ARR, le Net New MRR du mois et la tendance sur 12 mois. C&apos;est le dashboard que votre CEO regarde chaque lundi matin. Il repond a une seule question : est-ce qu&apos;on grandit ?",
                        widgets: ["KPI: MRR total actuel", "KPI: ARR actuel", "KPI: Net New MRR (mois en cours)", "Graphique: Evolution MRR sur 12 mois", "Graphique: Repartition MRR par plan"],
                      },
                      {
                        num: "02",
                        title: "MRR Movements",
                        desc: "Decomposition du MRR par type de mouvement : new business, expansion, contraction et churn. Ce dashboard raconte l&apos;histoire derriere le chiffre global. Un MRR en hausse peut cacher un churn inquietant compense par de l&apos;acquisition agressive.",
                        widgets: ["Graphique en barres empilees: Mouvements MRR par mois", "KPI: New MRR", "KPI: Expansion MRR", "KPI: Churn MRR", "KPI: Contraction MRR"],
                      },
                      {
                        num: "03",
                        title: "Churn Analysis",
                        desc: "Dashboard dedie a la retention. Taux de churn MRR, nombre de clients churnes, raisons de churn (si vous avez un champ dedie), et cohorte analysis. C&apos;est le dashboard que votre CS team doit suivre quotidiennement.",
                        widgets: ["KPI: Taux de churn MRR mensuel", "KPI: Clients churnes ce mois", "Graphique: Evolution du taux de churn", "Tableau: Derniers clients churnes", "Graphique: Churn par raison"],
                      },
                      {
                        num: "04",
                        title: "Expansion & Upsell",
                        desc: "Suivi de la croissance organique. MRR additionnel provenant des clients existants, taux d&apos;expansion, et pipeline d&apos;upsell en cours. Ce dashboard identifie les opportunites de croissance au sein de votre base existante.",
                        widgets: ["KPI: Expansion MRR total", "KPI: Taux d&apos;expansion", "Graphique: Expansion vs Churn par mois", "Tableau: Deals expansion en cours", "KPI: Negative churn atteint (oui/non)"],
                      },
                      {
                        num: "05",
                        title: "Forecasting",
                        desc: "Projection du MRR sur les 3 prochains mois basee sur le pipeline en cours et les renouvellements a venir. Ce dashboard est critique pour la planification financiere et les discussions avec les investisseurs.",
                        widgets: ["Graphique: MRR projete sur 3 mois", "KPI: Pipeline weighted MRR", "Tableau: Renouvellements a venir (90 jours)", "KPI: MRR at risk (renouvellements incertains)", "Graphique: Forecast vs Realise (historique)"],
                      },
                    ].map((d) => (
                      <div key={d.num} className="rounded-xl border border-white/10 bg-white/5 p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[20px] font-bold text-white/15">{d.num}</span>
                          <h3 className="text-[14px] font-semibold text-white">{d.title}</h3>
                        </div>
                        <p className="text-[12px] text-white/45 leading-[1.7] mb-3">{d.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {d.widgets.map((w) => (
                            <span key={w} className="inline-flex items-center px-2 py-1 rounded-md bg-white/5 text-[10px] text-white/35 border border-white/8">{w}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-[12px] text-white/45 leading-[1.65]">
                      <strong className="text-white/60">Astuce :</strong> dans HubSpot, creez un seul rapport personnalise pour chaque dashboard et dupliquez-le avec des filtres differents. Ca vous evite de reconfigurer les memes parametres a chaque fois. Utilisez les filtres de date relatifs (&ldquo;ce mois&rdquo;, &ldquo;trimestre en cours&rdquo;) pour que les rapports se mettent a jour automatiquement.
                    </p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 — Forecasting */}
              <section id="forecasting" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Forecasting et previsions de revenus</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le forecasting MRR repose sur trois composantes : le pipeline de new business, les renouvellements a venir, et l&apos;expansion attendue. HubSpot propose un outil de forecasting natif, mais il a des limites pour le modele SaaS. Voici comment l&apos;exploiter au maximum.</p>
                    <p>Le principe est simple : chaque deal dans votre pipeline a un montant MRR et une probabilite de closing (definie par l&apos;etape du pipeline). Le MRR weighted est le produit des deux. La somme des MRR weighted de tous les deals ouverts donne votre forecast.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-5">
                    <h3 className="text-[13px] font-semibold text-[#111] mb-3">Formule de forecasting</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#555]">MRR base (clients actuels)</span>
                        <span className="font-mono text-[#22C55E] font-semibold">42 000 EUR</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#555]">+ Pipeline weighted (new business)</span>
                        <span className="font-mono text-[#4B5EFC] font-semibold">+ 8 500 EUR</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#555]">+ Expansion pipeline weighted</span>
                        <span className="font-mono text-[#6C5CE7] font-semibold">+ 3 200 EUR</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#555]">- Churn prevu (renouvellements a risque)</span>
                        <span className="font-mono text-[#EF4444] font-semibold">- 2 100 EUR</span>
                      </div>
                      <div className="border-t border-[#E5E5E5] pt-3 flex items-center justify-between text-[13px]">
                        <span className="font-semibold text-[#111]">MRR projete (M+1)</span>
                        <span className="font-mono text-[#22C55E] font-bold text-[15px]">51 600 EUR</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Pour que ce forecast soit fiable, trois conditions doivent etre remplies :</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" /><strong className="text-[#111]">Probabilites calibrees :</strong> vos taux de conversion par etape doivent refleter la realite historique. Revoyez-les chaque trimestre.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" /><strong className="text-[#111]">Pipeline hygiene :</strong> les deals morts doivent etre fermes. Un pipeline gonfle artificiellement donne des forecasts optimistes et dangereux.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] mt-2 shrink-0" /><strong className="text-[#111]">Dates de closing realistes :</strong> si 60% de vos deals ont une date de closing &ldquo;fin de mois&rdquo; et que 80% slippent au mois suivant, votre forecast est systematiquement faux.</li>
                    </ul>
                    <p>HubSpot permet de creer des objectifs de revenu par equipe et par representant. Combinez ces objectifs avec le pipeline weighted pour obtenir une vue &ldquo;forecast vs objectif&rdquo; en temps reel. C&apos;est un outil puissant pour les weekly sales meetings.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 — Automatiser les alertes */}
              <section id="automatiser-alertes" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Automatiser les alertes (churn risk, expansion signals)</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le suivi du MRR ne sert a rien si personne n&apos;agit sur les signaux. HubSpot Workflows permet d&apos;automatiser les alertes et les actions basees sur les proprietes MRR que vous avez creees. Voici les trois workflows indispensables.</p>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      {
                        title: "Alerte churn risk (renouvellement a 90 jours)",
                        trigger: "Date de renouvellement dans 90 jours + aucune activite commerciale depuis 30 jours",
                        actions: [
                          "Creer une tache pour le CSM : \"Planifier un point de renouvellement\"",
                          "Envoyer un email interne au manager avec le MRR a risque",
                          "Ajouter le deal au pipeline Renewal avec l&apos;etape \"Renewal Upcoming (90j)\"",
                        ],
                        color: "#EF4444",
                      },
                      {
                        title: "Signal expansion (usage eleve)",
                        trigger: "Propriete custom \"usage_score\" superieur a 80% + plan actuel != Enterprise",
                        actions: [
                          "Creer une tache pour l&apos;AE : \"Proposer un upsell\"",
                          "Enregistrer une note automatique avec le score d&apos;usage",
                          "Ajouter le deal au pipeline Expansion avec l&apos;etape \"Upsell Identified\"",
                        ],
                        color: "#22C55E",
                      },
                      {
                        title: "Alerte contraction (downgrade detecte)",
                        trigger: "mrr_delta negatif + deal en etape Closed Won",
                        actions: [
                          "Envoyer un email interne au CSM et au VP Sales",
                          "Creer une tache prioritaire : \"Comprendre les raisons du downgrade\"",
                          "Mettre a jour la propriete mrr_type en \"Contraction\"",
                        ],
                        color: "#FF7A59",
                      },
                    ].map((w) => (
                      <div key={w.title} className="rounded-xl border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: w.color }} />
                          <h3 className="text-[14px] font-semibold text-[#111]">{w.title}</h3>
                        </div>
                        <div className="rounded-lg bg-[#FAFAFA] px-3 py-2 mb-3">
                          <span className="text-[11px] text-[#999]">Declencheur : </span>
                          <span className="text-[11px] text-[#555]">{w.trigger}</span>
                        </div>
                        <div className="space-y-1.5">
                          {w.actions.map((a, i) => (
                            <div key={i} className="flex items-start gap-2 text-[12px] text-[#666]">
                              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" style={{ color: w.color }}><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              {a}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Ces workflows necessitent HubSpot Sales Hub Pro ou Enterprise. Sur le plan Starter, vous pouvez creer des workflows simples mais sans les conditions avancees (proprietes calculees, combinaisons de criteres).</p>
                    <p>Un conseil : ne creez pas 15 workflows le premier jour. Commencez par l&apos;alerte de renouvellement a 90 jours, c&apos;est de loin la plus impactante. Ajoutez les autres progressivement une fois que votre equipe a pris l&apos;habitude de traiter les alertes.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 — Limites de HubSpot */}
              <section id="limites-hubspot" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les limites de HubSpot pour le MRR (et les alternatives)</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Soyons honnetes : HubSpot n&apos;a pas ete concu comme un outil de revenue analytics pour le SaaS. Le setup que nous venons de decrire fonctionne bien pour 80% des cas, mais il a des limites qu&apos;il faut connaitre.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        limite: "Pas de cohort analysis native",
                        detail: "HubSpot ne permet pas de suivre les cohortes de clients (MRR par mois d&apos;acquisition) sans passer par des rapports custom complexes ou un outil BI externe. Pour une entreprise qui veut analyser la retention par cohorte, c&apos;est un vrai manque.",
                        severity: "Elevee",
                        severityColor: "#EF4444",
                      },
                      {
                        limite: "Formules calculees limitees",
                        detail: "Les formules HubSpot ne supportent pas les agregations cross-objects. Vous ne pouvez pas calculer le MRR total de tous les deals d&apos;un client directement dans une propriete de contact. Il faut passer par des workflows ou des outils tiers.",
                        severity: "Elevee",
                        severityColor: "#EF4444",
                      },
                      {
                        limite: "Pas de gestion native des abonnements",
                        detail: "HubSpot ne distingue pas un deal one-shot d&apos;un abonnement recurrent. La notion de recurrence, de renouvellement et de modification d&apos;abonnement doit etre entierement modelisee avec des proprietes custom.",
                        severity: "Moyenne",
                        severityColor: "#FF7A59",
                      },
                      {
                        limite: "Reporting historique complexe",
                        detail: "Calculer le MRR a une date passee precise est difficile dans HubSpot. Les rapports standard montrent les deals closes a une date, pas le MRR cumulatif. Il faut des rapports custom avec des filtres de date sophistiques.",
                        severity: "Moyenne",
                        severityColor: "#FF7A59",
                      },
                      {
                        limite: "Cout des plans avances",
                        detail: "Operations Hub Pro (pour les formules calculees) coute 800 euros par mois. Sales Hub Enterprise (pour le forecasting avance) coute encore plus. Pour une startup early-stage, c&apos;est un budget consequent.",
                        severity: "Variable",
                        severityColor: "#F59E0B",
                      },
                    ].map((l) => (
                      <div key={l.limite} className="rounded-xl border border-[#F2F2F2] p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-[13px] font-semibold text-[#111]">{l.limite}</h3>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ color: l.severityColor, backgroundColor: `${l.severityColor}15` }}>Impact {l.severity}</span>
                        </div>
                        <p className="text-[12px] text-[#666] leading-[1.7]">{l.detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Les alternatives a considerer si HubSpot ne suffit plus :</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" /><strong className="text-[#111]">ChartMogul / Baremetrics :</strong> outils dedies au revenue analytics SaaS. Ils se connectent a Stripe, Chargebee ou Recurly et calculent automatiquement le MRR, le churn, les cohortes. Parfait en complement de HubSpot.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" /><strong className="text-[#111]">Looker / Metabase / Power BI :</strong> outils BI qui se connectent directement a la base de donnees HubSpot (via Fivetran ou Airbyte). Plus de flexibilite, mais demande des competences data.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] mt-2 shrink-0" /><strong className="text-[#111]">RevOps AI (notre outil) :</strong> un assistant IA qui se connecte a HubSpot et calcule le MRR, les cohortes et les previsions en temps reel, directement dans une interface conversationnelle.</li>
                    </ul>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 — Setup Ceres (dark section) */}
              <section id="setup-ceres" className="mb-8">
                <div className="rounded-2xl bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Notre approche</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Notre setup chez Ceres</h2>
                  <div className="space-y-3 text-[12px] text-white/50 leading-[1.75]">
                    <p>Chez Ceres, on a deploye ce setup MRR pour une vingtaine de clients SaaS. Voici ce qu&apos;on a appris apres des dizaines d&apos;implementations.</p>
                    <p>Le setup de base prend 2 heures : creation des proprietes, configuration du pipeline, et mise en place des 3 workflows essentiels. Le dashboard MRR Overview est operationnel dans la foulee. Les dashboards avances (churn analysis, cohort) necessitent generalement une demi-journee supplementaire de configuration et de calibration.</p>
                    <p>Ce qui fait la difference entre un setup qui fonctionne et un setup qui finit abandonne, c&apos;est l&apos;adoption par les equipes. Nous formons systematiquement les sales reps a remplir correctement les proprietes MRR. Sans donnees fiables en entree, le plus beau dashboard du monde est inutile.</p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Clients SaaS equipes", value: "22", color: "#22C55E" },
                      { label: "Temps de setup moyen", value: "2h", color: "#4B5EFC" },
                      { label: "Precision du forecast", value: "87%", color: "#22C55E" },
                      { label: "Reduction du churn", value: "-34%", color: "#6C5CE7" },
                    ].map((s) => (
                      <div key={s.label} className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[20px] font-bold" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-[10px] text-white/35 mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {[
                      "Setup complet des proprietes MRR en 2h",
                      "5 dashboards operationnels des le premier jour",
                      "Workflows d&apos;alerte configures et testes",
                      "Formation equipe incluse (1h)",
                      "Documentation interne personnalisee",
                      "Connexion avec votre outil de billing (Stripe, Chargebee)",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2 text-[12px] text-white/50">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span dangerouslySetInnerHTML={{ __html: item }} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Related articles */}
              <section className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-7 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
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
                <div className="rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 md:p-10 text-center">
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour configurer votre MRR dans HubSpot ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On deploie votre setup MRR complet en 1 semaine : proprietes, dashboards, workflows et formation equipe.</p>
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel
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
