"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Comment utiliser l'IA dans votre processus commercial B2B",
  description: "Guide complet sur l'utilisation de l'intelligence artificielle dans le processus de vente B2B. 8 cas d'usage concrets avec exemples : enrichissement de leads, scoring predictif, redaction d'emails, resume de calls, analyse win/loss, prevision de revenus, qualification automatique et coaching commercial. Stack IA 2026, implementation progressive et ROI mesurable.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-14",
  dateModified: "2026-03-14",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/ia-processus-commercial-vente-b2b" },
  articleSection: "IA & Automatisation",
  wordCount: 3500,
  inLanguage: "fr",
};

const sections = [
  { id: "ia-plus-gadget", title: "L'IA n'est plus un gadget" },
  { id: "enrichissement", title: "Enrichissement de leads" },
  { id: "scoring", title: "Scoring predictif" },
  { id: "emails", title: "Emails personnalises" },
  { id: "resume-calls", title: "Resume de calls" },
  { id: "win-loss", title: "Analyse win/loss" },
  { id: "prevision", title: "Prevision de revenus" },
  { id: "qualification", title: "Qualification automatique" },
  { id: "coaching", title: "Coaching commercial" },
  { id: "stack-ia", title: "La stack IA en 2026" },
  { id: "implementation", title: "Implementer sans tout casser" },
  { id: "pieges", title: "Les pieges a eviter" },
  { id: "roi", title: "ROI de l'IA commerciale" },
  { id: "approche-ceres", title: "Notre approche Ceres" },
];

const relatedArticles = [
  { title: "9 actions commerciales que vous devriez automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "Automatisation", color: "#FF7A59" },
  { title: "Marketing Automation : 7 workflows HubSpot indispensables", slug: "marketing-automation-7-workflows-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Comparatif outils de generation de leads et enrichissement B2B", slug: "comparatif-outils-generation-leads-enrichissement", category: "Process & Outils", color: "#6C5CE7" },
];

export default function IAProcessusCommercialArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("ia-plus-gadget");

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
        <div className="h-full bg-[#6D00CC] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "4%", width: 320, height: 320, borderRadius: "50%", background: "#6D00CC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "12%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "24%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "36%", width: 300, height: 300, borderRadius: "50%", background: "#6D00CC", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "50%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "64%", width: 280, height: 280, borderRadius: "50%", background: "#6D00CC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "78%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.06, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "90%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.07, filter: "blur(70px)" }} />

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
                        ? "border-[#6D00CC] text-[#111] font-medium"
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
                  <a href="https://twitter.com/intent/tweet?text=Comment%20utiliser%20l%27IA%20dans%20votre%20processus%20commercial%20B2B&url=https://www.ceres-revops.com/blog/ia-processus-commercial-vente-b2b" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/ia-processus-commercial-vente-b2b" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">IA et processus commercial B2B</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>IA &amp; Automatisation</Badge>
                <span className="text-[11px] text-[#CCC]">16 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Comment utiliser l&apos;IA dans votre processus commercial B2B
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                L&apos;intelligence artificielle transforme la vente B2B en profondeur. Mais entre les promesses marketing et la realite terrain, il y a un gouffre. Ce guide detaille 8 cas d&apos;usage concrets de l&apos;IA dans le cycle de vente, avec des exemples reels, les outils a utiliser, et une methode pour implementer le tout sans destabiliser votre equipe. Base sur notre experience chez Ceres avec Claude, HubSpot et Make.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>14 mars 2026</span>
              </div>
            </header>

            <article>
              {/* ============================================ */}
              {/* Section 1 : L'IA n'est plus un gadget */}
              {/* ============================================ */}
              <section id="ia-plus-gadget" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">L&apos;IA n&apos;est plus un gadget commercial</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>En 2024, l&apos;IA generative etait un sujet de curiosite. Les equipes commerciales testaient ChatGPT pour rediger des emails, jouaient avec des prompts, et la majorite des tentatives restaient anecdotiques. Deux ans plus tard, le paysage a radicalement change.</p>
                    <p>Selon McKinsey, 72% des entreprises B2B ont integre au moins un outil d&apos;IA dans leur processus commercial en 2026, contre 28% en 2024. Ce n&apos;est plus une experimentation : c&apos;est devenu un avantage concurrentiel mesurable. Les equipes qui utilisent l&apos;IA dans leur cycle de vente ferment 35% de deals supplementaires, reduisent leur cycle de vente de 22%, et passent 40% moins de temps sur les taches administratives.</p>
                    <p>Ces chiffres ne sont pas de la science-fiction. On les observe directement chez nos clients. Une entreprise SaaS de 15 commerciaux que l&apos;on accompagne chez Ceres a reduit son temps de qualification de 4 heures a 45 minutes par semaine grace a l&apos;enrichissement automatique des leads. Un cabinet de conseil B2B a augmente son taux de reponse aux emails de prospection de 3.2% a 11.8% grace a la personnalisation par IA.</p>
                    <p>Mais il ne suffit pas de &ldquo;mettre de l&apos;IA partout&rdquo;. L&apos;erreur la plus frequente est d&apos;adopter des outils IA sans repenser le processus commercial. L&apos;IA est un accelerateur, pas un remplacement. Elle fonctionne quand elle est integree dans un workflow precis, avec des donnees propres, et un humain qui supervise les sorties.</p>
                    <p>Ce guide passe en revue les 8 cas d&apos;usage les plus concrets et les plus rentables de l&apos;IA dans un processus de vente B2B. Pour chacun, on vous donne l&apos;outil, la methode, et le resultat attendu. Pas de theorie abstraite : du terrain.</p>
                  </div>

                  {/* Adoption curve mockup */}
                  <div className="mt-6 rounded-lg border border-[#F2F2F2] bg-[#FAFAFA] p-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-4">Adoption de l&apos;IA dans les equipes commerciales B2B</p>
                    <div className="flex items-end gap-3 h-[120px]">
                      {[
                        { year: "2023", pct: 12, color: "#E8E8E8" },
                        { year: "2024", pct: 28, color: "#D0D0D0" },
                        { year: "2025", pct: 54, color: "#9B59B6" },
                        { year: "2026", pct: 72, color: "#6D00CC" },
                      ].map((d) => (
                        <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[10px] font-bold" style={{ color: d.color }}>{d.pct}%</span>
                          <div className="w-full rounded-t-lg transition-all" style={{ height: `${d.pct * 1.4}px`, background: d.color }} />
                          <span className="text-[9px] text-[#999]">{d.year}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[9px] text-[#BBB] mt-3 text-right">Source : McKinsey State of AI Report 2026</p>
                  </div>

                  {/* Key stats */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { stat: "+35%", label: "de deals fermes avec l'IA", color: "#6D00CC" },
                      { stat: "-22%", label: "sur la duree du cycle de vente", color: "#4B5EFC" },
                      { stat: "-40%", label: "de temps sur les taches admin", color: "#22C55E" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-lg border border-[#F2F2F2] p-4 text-center">
                        <p className="text-[22px] font-bold mb-1" style={{ color: s.color }}>{s.stat}</p>
                        <p className="text-[10px] text-[#999] leading-[1.4]">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ============================================ */}
              {/* Section 2a : Enrichissement automatique */}
              {/* ============================================ */}
              <section id="enrichissement" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[10px] font-bold">1</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Enrichissement automatique des leads</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le premier cas d&apos;usage, et souvent le plus immediat, c&apos;est l&apos;enrichissement automatique des leads entrants. Quand un prospect remplit un formulaire sur votre site, vous avez generalement son nom, son email et son entreprise. C&apos;est insuffisant pour personnaliser l&apos;approche commerciale.</p>
                    <p>Avec un workflow IA (Clay + Claude + HubSpot), chaque nouveau lead est automatiquement enrichi en moins de 30 secondes. L&apos;IA va chercher le profil LinkedIn du prospect, les actualites recentes de son entreprise, sa taille, son secteur, les technologies qu&apos;elle utilise, et genere un resume de contexte directement dans la fiche CRM.</p>
                    <p>Le commercial ne passe plus 15 minutes a googler chaque prospect. Il ouvre la fiche HubSpot et trouve un brief complet : &ldquo;SaaS B2B, 45 employes, leve 3M EUR en Series A il y a 6 mois, utilise Salesforce mais cherche a migrer, CEO a publie un article sur LinkedIn la semaine derniere sur les problemes de data quality.&rdquo;</p>
                    <p>Chez l&apos;un de nos clients, cette automatisation a reduit le temps de recherche pre-appel de 15 minutes a 2 minutes par lead, soit un gain de 10 heures par semaine pour une equipe de 8 commerciaux.</p>
                  </div>

                  {/* CSS Mockup: AI enrichment workflow */}
                  <div className="mt-6 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-4">Workflow d&apos;enrichissement IA</p>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      {/* Step 1 */}
                      <div className="flex-1 w-full rounded-lg border border-[#EAEAEA] bg-white p-3 text-center">
                        <div className="w-8 h-8 rounded-full bg-[#FF7A59] mx-auto mb-2 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        </div>
                        <p className="text-[10px] font-semibold text-[#111]">Lead entrant</p>
                        <p className="text-[9px] text-[#999]">Formulaire HubSpot</p>
                      </div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2" className="shrink-0 hidden sm:block"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                      <div className="sm:hidden w-px h-4 bg-[#E8E8E8]" />
                      {/* Step 2 */}
                      <div className="flex-1 w-full rounded-lg border border-[#EAEAEA] bg-white p-3 text-center">
                        <div className="w-8 h-8 rounded-full bg-[#6D00CC] mx-auto mb-2 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                        </div>
                        <p className="text-[10px] font-semibold text-[#111]">Clay + Claude</p>
                        <p className="text-[9px] text-[#999]">Enrichissement IA</p>
                      </div>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2" className="shrink-0 hidden sm:block"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                      <div className="sm:hidden w-px h-4 bg-[#E8E8E8]" />
                      {/* Step 3 */}
                      <div className="flex-1 w-full rounded-lg border border-[#EAEAEA] bg-white p-3 text-center">
                        <div className="w-8 h-8 rounded-full bg-[#22C55E] mx-auto mb-2 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4 12 14.01l-3-3" /></svg>
                        </div>
                        <p className="text-[10px] font-semibold text-[#111]">Fiche CRM enrichie</p>
                        <p className="text-[9px] text-[#999]">Brief contextuel pret</p>
                      </div>
                    </div>

                    {/* Enrichment result mockup */}
                    <div className="mt-4 rounded-lg border border-[#EAEAEA] bg-white p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded bg-[#6D00CC] flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 2v10l7-4" /></svg>
                        </div>
                        <span className="text-[10px] font-semibold text-[#111]">Resultat de l&apos;enrichissement IA</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="rounded bg-[#F8F8F8] p-2">
                          <span className="text-[#999]">Entreprise</span>
                          <p className="font-medium text-[#111]">TechFlow SAS</p>
                        </div>
                        <div className="rounded bg-[#F8F8F8] p-2">
                          <span className="text-[#999]">Taille</span>
                          <p className="font-medium text-[#111]">45 employes</p>
                        </div>
                        <div className="rounded bg-[#F8F8F8] p-2">
                          <span className="text-[#999]">Derniere levee</span>
                          <p className="font-medium text-[#111]">3M EUR Series A (sept. 2025)</p>
                        </div>
                        <div className="rounded bg-[#F8F8F8] p-2">
                          <span className="text-[#999]">CRM actuel</span>
                          <p className="font-medium text-[#111]">Salesforce (migration envisagee)</p>
                        </div>
                      </div>
                      <div className="mt-2 rounded bg-[#F0EBFF] border border-[#E0D4FF] p-2">
                        <p className="text-[9px] font-semibold text-[#6D00CC] mb-1">Brief IA genere par Claude</p>
                        <p className="text-[9px] text-[#555] leading-[1.5]">&ldquo;TechFlow est un SaaS B2B en croissance rapide, post Series A. Le CEO Thomas Martin a publie un article LinkedIn le 8 mars sur les problemes de data quality dans leur CRM. Angle recommande : positionner notre solution comme reponse a ses frustrations Salesforce. Mentionner la migration zero-downtime.&rdquo;</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ============================================ */}
              {/* Section 2b : Scoring predictif */}
              {/* ============================================ */}
              <section id="scoring" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[10px] font-bold">2</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Scoring predictif des deals</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le lead scoring traditionnel, base sur des regles manuelles (&ldquo;si le prospect a plus de 50 employes ET a visite la page pricing, alors score = 80&rdquo;), atteint ses limites. Il est statique, subjectif, et ne capture pas les patterns complexes qui predisent reellement une conversion.</p>
                    <p>Le scoring IA analyse des centaines de signaux en parallele : historique d&apos;engagement, similarite avec les clients existants qui ont ferme, timing des interactions, contenu des echanges, donnees firmographiques, intent data. Il produit un score dynamique qui evolue a chaque nouvelle interaction.</p>
                    <p>La difference fondamentale : le scoring par regles vous dit ce que vous avez decide de mesurer. Le scoring IA decouvre ce qui predit reellement la conversion, y compris des patterns que vous n&apos;auriez pas identifies vous-meme. Par exemple, un de nos clients a decouvert que les prospects qui posaient des questions sur l&apos;API dans les 48 premieres heures avaient 4x plus de chances de fermer.</p>
                    <p>Outils : HubSpot Predictive Lead Scoring (Pro+), 6sense, Clari. Pour les equipes avancees, un modele custom avec Claude qui analyse les notes de deal et les transcriptions d&apos;appels.</p>
                  </div>

                  {/* CSS Mockup: AI scoring vs rule-based comparison */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Rule-based */}
                    <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 rounded bg-[#E8E8E8]" />
                        <span className="text-[10px] font-semibold text-[#999]">Scoring par regles</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { rule: "Taille entreprise > 50", pts: "+20", active: true },
                          { rule: "Page pricing visitee", pts: "+15", active: true },
                          { rule: "Email ouvert 3x", pts: "+10", active: false },
                          { rule: "Formulaire soumis", pts: "+25", active: true },
                        ].map((r) => (
                          <div key={r.rule} className="flex items-center justify-between text-[9px] py-1 border-b border-[#F2F2F2]">
                            <span className={r.active ? "text-[#555]" : "text-[#CCC]"}>{r.rule}</span>
                            <span className={`font-mono ${r.active ? "text-[#111]" : "text-[#CCC]"}`}>{r.pts}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[9px] text-[#999]">Score total</span>
                        <span className="text-[14px] font-bold text-[#999]">60/100</span>
                      </div>
                      <div className="mt-2 rounded bg-[#FFF3E0] p-2">
                        <p className="text-[8px] text-[#E65100]">Statique. Ne capture pas les signaux implicites. Necessite une maintenance manuelle des regles.</p>
                      </div>
                    </div>
                    {/* AI-based */}
                    <div className="rounded-lg border border-[#6D00CC] bg-[#FAFBFF] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-4 h-4 rounded bg-[#6D00CC]" />
                        <span className="text-[10px] font-semibold text-[#6D00CC]">Scoring IA predictif</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { signal: "Similarite firmographique", weight: "92%", color: "#6D00CC" },
                          { signal: "Engagement content (pattern)", weight: "87%", color: "#4B5EFC" },
                          { signal: "Question API dans 48h", weight: "4x close rate", color: "#22C55E" },
                          { signal: "Timing interaction optimal", weight: "78%", color: "#6D00CC" },
                        ].map((s) => (
                          <div key={s.signal} className="flex items-center justify-between text-[9px] py-1 border-b border-[#F0EBFF]">
                            <span className="text-[#555]">{s.signal}</span>
                            <span className="font-mono font-medium" style={{ color: s.color }}>{s.weight}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[9px] text-[#999]">Probabilite de closing</span>
                        <span className="text-[14px] font-bold text-[#6D00CC]">84%</span>
                      </div>
                      <div className="mt-2 rounded bg-[#F0EBFF] p-2">
                        <p className="text-[8px] text-[#6D00CC]">Dynamique. Decouvre des patterns invisibles. S&apos;ameliore avec chaque deal ferme.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ============================================ */}
              {/* Section 2c : Redaction d'emails */}
              {/* ============================================ */}
              <section id="emails" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[10px] font-bold">3</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Redaction d&apos;emails personnalises</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La personnalisation des emails de prospection est le cas d&apos;usage ou l&apos;IA a le plus d&apos;impact immediat. Un commercial envoie en moyenne 40 a 60 emails de prospection par jour. Personnaliser chacun manuellement prendrait des heures. Ne pas les personnaliser condamne les taux de reponse a rester sous les 2%.</p>
                    <p>L&apos;IA resout cette equation. En combinant les donnees d&apos;enrichissement (entreprise, actualites, poste du prospect) avec un prompt bien construit, Claude genere un email hyper-personnalise en 3 secondes. Le commercial relit, ajuste le ton si necessaire, et envoie. Le temps par email passe de 8 minutes a 45 secondes.</p>
                    <p>L&apos;element cle est le prompt. Un mauvais prompt produit des emails generiques detectables a des kilometres. Un bon prompt integre le contexte du prospect, le pain point specifique, et une reference concrete a une actualite ou un contenu publie par le prospect. La difference de taux de reponse entre un email IA mal prompte et un email IA bien prompte est de 3x.</p>
                    <p>Attention : l&apos;IA ne doit jamais envoyer un email sans validation humaine. Le risque d&apos;hallucination (informations incorrectes sur le prospect) est reel. Le workflow optimal est : IA redige, humain valide, CRM envoie.</p>
                  </div>

                  {/* CSS Mockup: Before/After email */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Before */}
                    <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                        <span className="text-[10px] font-semibold text-[#EF4444]">AVANT : Email generique</span>
                      </div>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3">
                        <p className="text-[9px] text-[#999] mb-1">De : commercial@acme.com</p>
                        <p className="text-[9px] text-[#999] mb-2">Objet : Solution CRM pour votre entreprise</p>
                        <div className="text-[9px] text-[#666] leading-[1.6] space-y-2">
                          <p>Bonjour [First name],</p>
                          <p>Je me permets de vous contacter car notre solution pourrait vous interesser. Nous aidons les entreprises comme la votre a ameliorer leur processus commercial.</p>
                          <p>Seriez-vous disponible pour un appel de 15 minutes cette semaine ?</p>
                          <p>Cordialement,<br/>Martin Dupont</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[9px] px-2 py-0.5 rounded bg-[#FDEAEA] text-[#EF4444]">Taux de reponse : 1.8%</span>
                      </div>
                    </div>
                    {/* After */}
                    <div className="rounded-lg border border-[#6D00CC] bg-[#FAFBFF] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                        <span className="text-[10px] font-semibold text-[#22C55E]">APRES : Email personnalise par IA</span>
                      </div>
                      <div className="rounded-lg bg-white border border-[#E0D4FF] p-3">
                        <p className="text-[9px] text-[#999] mb-1">De : commercial@acme.com</p>
                        <p className="text-[9px] text-[#999] mb-2">Objet : Data quality chez TechFlow - une piste</p>
                        <div className="text-[9px] text-[#666] leading-[1.6] space-y-2">
                          <p>Bonjour Thomas,</p>
                          <p>J&apos;ai lu votre article LinkedIn du 8 mars sur les problemes de data quality dans votre CRM. Le point sur les doublons qui polluent vos reportings m&apos;a parle - c&apos;est exactement ce qu&apos;on a resolu chez DataPulse (45 pers., SaaS B2B comme vous) le mois dernier.</p>
                          <p>On a reduit leurs doublons de 34% a 2% en 3 semaines, sans migration. Ca vaut un call de 15 min si le sujet est toujours d&apos;actualite ?</p>
                          <p>Martin</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[9px] px-2 py-0.5 rounded bg-[#E8F5E9] text-[#22C55E]">Taux de reponse : 11.8%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-[#F0EBFF] border border-[#E0D4FF] p-4">
                    <p className="text-[11px] font-semibold text-[#6D00CC] mb-2">Le prompt qui fait la difference</p>
                    <p className="text-[10px] text-[#555] leading-[1.6]">Le secret n&apos;est pas dans l&apos;outil mais dans le prompt. Integrez systematiquement : (1) une reference concrete a un contenu ou une actualite du prospect, (2) un cas client similaire avec un resultat chiffre, (3) un CTA non-engageant. L&apos;email doit faire moins de 100 mots.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ============================================ */}
              {/* Section 2d : Resume automatique des calls */}
              {/* ============================================ */}
              <section id="resume-calls" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[10px] font-bold">4</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Resume automatique des appels commerciaux</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un commercial fait en moyenne 6 a 10 appels par jour. Apres chaque appel, il devrait idealement ecrire un resume dans le CRM : points discutes, objections, prochaines etapes, besoins identifies. En realite, 60% des notes d&apos;appel ne sont jamais ecrites, et celles qui le sont sont souvent incompletes ou redigees de memoire 2 heures apres.</p>
                    <p>Les outils de conversation intelligence (Gong, Claap, Fireflies, Granola) transcrivent automatiquement chaque appel, puis l&apos;IA genere un resume structure : points cles, objections soulevees, engagement du prospect, prochaines etapes, et meme un score de sentiment. Ce resume est automatiquement pousse dans la fiche CRM via une integration.</p>
                    <p>L&apos;impact va au-dela du gain de temps. Les managers commerciaux peuvent enfin coacher sur la base de donnees objectives, pas d&apos;impressions. Un directeur commercial que l&apos;on accompagne a decouvert grace a Gong que ses commerciaux passaient en moyenne 72% du temps a parler contre 28% pour le prospect. Le ratio optimal est 40/60. En six semaines de coaching base sur les donnees, le taux de conversion au stage &ldquo;proposal&rdquo; a augmente de 18%.</p>
                    <p>Le setup le plus efficace que l&apos;on deploie : Claap ou Granola pour la transcription, Claude pour le resume structure, Make pour pousser le tout dans HubSpot. Cout : moins de 30 EUR par commercial et par mois.</p>
                  </div>

                  {/* CSS Mockup: Call summary flowing to CRM */}
                  <div className="mt-6 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-4">Resume IA d&apos;un appel commercial</p>
                    <div className="rounded-lg bg-white border border-[#EAEAEA] p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded bg-[#6D00CC] flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /></svg>
                          </div>
                          <span className="text-[10px] font-semibold text-[#111]">Appel avec Thomas Martin - TechFlow</span>
                        </div>
                        <span className="text-[9px] text-[#999]">23 min</span>
                      </div>
                      <div className="space-y-2">
                        <div className="rounded bg-[#F8F8F8] p-2">
                          <p className="text-[9px] font-semibold text-[#6D00CC] mb-1">Points cles</p>
                          <ul className="text-[9px] text-[#555] space-y-1 leading-[1.5]">
                            <li>- Migration Salesforce envisagee depuis 3 mois, bloquee par la complexite</li>
                            <li>- Budget CRM annuel actuel : 18K EUR (veut reduire a 10K)</li>
                            <li>- Pain point principal : doublons et data quality degradee</li>
                          </ul>
                        </div>
                        <div className="rounded bg-[#F8F8F8] p-2">
                          <p className="text-[9px] font-semibold text-[#FF7A59] mb-1">Objections</p>
                          <ul className="text-[9px] text-[#555] space-y-1 leading-[1.5]">
                            <li>- &ldquo;On a deja essaye un audit CRM, ca n&apos;a rien change&rdquo;</li>
                            <li>- Inquietude sur le temps de migration (veut zero downtime)</li>
                          </ul>
                        </div>
                        <div className="rounded bg-[#E8F5E9] p-2">
                          <p className="text-[9px] font-semibold text-[#22C55E] mb-1">Prochaines etapes</p>
                          <ul className="text-[9px] text-[#555] space-y-1 leading-[1.5]">
                            <li>- Envoyer le case study DataPulse (migration zero-downtime)</li>
                            <li>- Demo technique jeudi 20 mars a 14h avec le CTO</li>
                          </ul>
                        </div>
                        <div className="flex items-center gap-4 mt-2 pt-2 border-t border-[#F2F2F2]">
                          <div className="flex items-center gap-1">
                            <span className="text-[8px] text-[#999]">Sentiment</span>
                            <span className="text-[9px] font-semibold text-[#22C55E]">Positif (78%)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[8px] text-[#999]">Talk ratio</span>
                            <span className="text-[9px] font-semibold text-[#6D00CC]">35/65</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[8px] text-[#999]">Score deal</span>
                            <span className="text-[9px] font-semibold text-[#4B5EFC]">72/100</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[8px] text-[#BBB] mt-2 text-center">Automatiquement synchronise dans la fiche HubSpot via Make</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ============================================ */}
              {/* Section 2e : Analyse win/loss */}
              {/* ============================================ */}
              <section id="win-loss" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[10px] font-bold">5</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Analyse win/loss par IA</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Pourquoi perdez-vous des deals ? La plupart des equipes commerciales n&apos;ont pas de reponse factuelle a cette question. Les raisons de perte dans le CRM sont generalement &ldquo;prix trop eleve&rdquo;, &ldquo;pas de budget&rdquo; ou &ldquo;timing&rdquo; - des categories trop vagues pour etre actionnables.</p>
                    <p>L&apos;IA change la donne en analysant l&apos;ensemble des donnees d&apos;un deal perdu : transcriptions d&apos;appels, emails echanges, duree de chaque etape, engagement du prospect, et comparaison avec les deals gagnes similaires. Elle identifie des patterns invisibles a l&apos;oeil nu.</p>
                    <p>Exemple concret chez un de nos clients (editeur SaaS, ACV 15K EUR) : l&apos;analyse IA de 120 deals fermes sur 6 mois a revele que les deals perdus avaient un point commun : le champion interne (la personne qui pousse votre solution en interne) n&apos;etait jamais identifie avant le stage &ldquo;proposal&rdquo;. Les deals ou le champion etait identifie en &ldquo;discovery&rdquo; avaient un win rate de 62% contre 18% sinon. Ce type d&apos;insight actionnable est impossible a obtenir manuellement quand on gere 200+ deals par trimestre.</p>
                    <p>L&apos;implementation : exportez vos deals fermes (won + lost) des 12 derniers mois, avec toutes les notes et les metadonnees. Injectez le tout dans Claude avec un prompt d&apos;analyse win/loss. Les resultats sont souvent revelateurs.</p>
                  </div>

                  {/* CSS Mockup: Win/Loss insights dashboard */}
                  <div className="mt-6 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-4">Dashboard Win/Loss IA - Insights Q1 2026</p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 text-center">
                        <p className="text-[9px] text-[#999]">Deals analyses</p>
                        <p className="text-[18px] font-bold text-[#111]">127</p>
                      </div>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 text-center">
                        <p className="text-[9px] text-[#999]">Win rate global</p>
                        <p className="text-[18px] font-bold text-[#6D00CC]">34%</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[9px] font-semibold text-[#111]">Patterns identifies par l&apos;IA</p>
                      {[
                        { pattern: "Champion identifie en Discovery", impact: "Win rate 62% vs 18%", severity: "high", color: "#6D00CC" },
                        { pattern: "Demo technique avant le proposal", impact: "Win rate +28%", severity: "high", color: "#22C55E" },
                        { pattern: "Plus de 3 interlocuteurs impliques", impact: "Cycle +45 jours en moyenne", severity: "medium", color: "#FF7A59" },
                        { pattern: "Pas de relance dans les 48h post-demo", impact: "Win rate -35%", severity: "high", color: "#EF4444" },
                        { pattern: "Mention du concurrent X en call", impact: "Win rate 22% (vs 41% moyenne)", severity: "medium", color: "#FF7A59" },
                      ].map((p) => (
                        <div key={p.pattern} className="flex items-center gap-3 rounded-lg bg-white border border-[#EAEAEA] p-3">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] font-medium text-[#111]">{p.pattern}</p>
                            <p className="text-[8px] text-[#999]">{p.impact}</p>
                          </div>
                          <span className={`text-[7px] px-1.5 py-0.5 rounded font-medium ${p.severity === "high" ? "bg-[#FDEAEA] text-[#EF4444]" : "bg-[#FFF3E0] text-[#E65100]"}`}>
                            {p.severity === "high" ? "Impact fort" : "Impact moyen"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ============================================ */}
              {/* Section 2f : Prevision de revenus */}
              {/* ============================================ */}
              <section id="prevision" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[10px] font-bold">6</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Prevision de revenus par IA</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La prevision de revenus est le talon d&apos;Achille de la plupart des equipes commerciales B2B. La methode classique : chaque commercial estime ses chances de fermer chaque deal, le manager applique un coefficient de confiance, et on obtient un forecast souvent faux de 30 a 40%.</p>
                    <p>L&apos;IA de forecasting (Clari, Gong Forecast, BoostUp) analyse les donnees objectives du pipeline - pas les estimations subjectives. Elle examine la progression reelle de chaque deal : temps passe a chaque etape, niveau d&apos;engagement du prospect, comparaison avec les deals similaires fermes, signaux de risque (ralentissement des echanges, ghost du champion, etc.).</p>
                    <p>Le resultat : un forecast avec une marge d&apos;erreur de 5 a 10%, contre 30 a 40% pour le forecast manuel. Pour un directeur commercial ou un CFO, c&apos;est la difference entre piloter a vue et piloter avec des instruments.</p>
                    <p>Pour les equipes qui n&apos;ont pas le budget d&apos;un outil dedie (Clari coute 40-80 EUR/user/mois), on construit chez Ceres un systeme de forecast IA custom avec Claude + les donnees HubSpot. Moins sophistique qu&apos;un Clari, mais 10x plus fiable qu&apos;un tableur Excel.</p>
                  </div>

                  {/* CSS Mockup: AI forecast vs spreadsheet */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-4">
                      <p className="text-[10px] font-semibold text-[#999] mb-3">Forecast Excel classique</p>
                      <div className="space-y-2 mb-3">
                        {[
                          { deal: "TechFlow", amount: "24K", proba: "70%", weighted: "16.8K" },
                          { deal: "DataPulse", amount: "18K", proba: "50%", weighted: "9K" },
                          { deal: "CloudSync", amount: "35K", proba: "30%", weighted: "10.5K" },
                        ].map((d) => (
                          <div key={d.deal} className="flex items-center justify-between text-[9px] py-1 border-b border-[#F2F2F2]">
                            <span className="text-[#555]">{d.deal}</span>
                            <span className="text-[#999]">{d.amount} x {d.proba}</span>
                            <span className="font-mono text-[#111]">{d.weighted}</span>
                          </div>
                        ))}
                      </div>
                      <div className="rounded bg-[#F8F8F8] p-2 text-center">
                        <p className="text-[9px] text-[#999]">Forecast Q1</p>
                        <p className="text-[14px] font-bold text-[#999]">36.3K EUR</p>
                        <p className="text-[8px] text-[#EF4444]">Marge d&apos;erreur : +/- 35%</p>
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#6D00CC] bg-[#FAFBFF] p-4">
                      <p className="text-[10px] font-semibold text-[#6D00CC] mb-3">Forecast IA predictif</p>
                      <div className="space-y-2 mb-3">
                        {[
                          { deal: "TechFlow", signals: "Champion actif, demo CTO planifiee", proba: "84%", color: "#22C55E" },
                          { deal: "DataPulse", signals: "Engagement en baisse, ghost 5j", proba: "28%", color: "#EF4444" },
                          { deal: "CloudSync", signals: "Multi-thread, POC demande", proba: "61%", color: "#FF7A59" },
                        ].map((d) => (
                          <div key={d.deal} className="flex items-center gap-2 text-[9px] py-1 border-b border-[#F0EBFF]">
                            <div className="flex-1">
                              <span className="font-medium text-[#111]">{d.deal}</span>
                              <p className="text-[8px] text-[#999]">{d.signals}</p>
                            </div>
                            <span className="font-mono font-bold" style={{ color: d.color }}>{d.proba}</span>
                          </div>
                        ))}
                      </div>
                      <div className="rounded bg-[#F0EBFF] p-2 text-center">
                        <p className="text-[9px] text-[#6D00CC]">Forecast Q1 (intervalle de confiance)</p>
                        <p className="text-[14px] font-bold text-[#6D00CC]">41.2K EUR</p>
                        <p className="text-[8px] text-[#22C55E]">Marge d&apos;erreur : +/- 8%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ============================================ */}
              {/* Section 2g : Qualification automatique */}
              {/* ============================================ */}
              <section id="qualification" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[10px] font-bold">7</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Qualification automatique et routing intelligent</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Quand un lead arrive sur votre site, le temps de reponse est critique. Les etudes montrent qu&apos;un lead contacte dans les 5 minutes a 21x plus de chances d&apos;etre qualifie qu&apos;un lead contacte apres 30 minutes. Pourtant, le temps moyen de premiere reponse en B2B est de 42 heures.</p>
                    <p>Un chatbot IA (pas un chatbot scriptee a l&apos;ancienne, un vrai agent conversationnel base sur un LLM) peut qualifier un lead en temps reel directement sur votre site. Il pose les bonnes questions (taille d&apos;equipe, budget, besoin, timeline), repond aux questions du prospect sur votre offre, et route le lead vers le bon commercial en fonction du segment.</p>
                    <p>La cle est de ne pas essayer de vendre avec le chatbot. Son role est de qualifier et de router, pas de closer. Le prospect doit avoir l&apos;impression de parler a un assistant intelligent, pas a un vendeur agressif. Le chatbot collecte les informations de qualification, cree la fiche dans le CRM avec un resume structure, et declenche une notification au commercial assigne.</p>
                    <p>Le workflow optimal : chatbot IA sur le site (Intercom, Drift, ou custom avec Claude) + qualification BANT automatique + creation de deal dans HubSpot + notification Slack au commercial + booking Calendly automatique si le lead est qualifie. Le tout en moins de 3 minutes, 24h/24.</p>
                    <p>Un de nos clients a remplace son formulaire de contact par un chatbot IA. Resultat : le taux de qualification est passe de 12% (formulaire) a 34% (chatbot), et le temps de premiere reponse de 6 heures a 15 secondes.</p>
                  </div>

                  {/* CSS Mockup: Chatbot qualification interface */}
                  <div className="mt-6 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-4">Interface de qualification IA</p>
                    <div className="max-w-[320px] mx-auto rounded-lg bg-white border border-[#EAEAEA] overflow-hidden shadow-sm">
                      {/* Chat header */}
                      <div className="bg-[#6D00CC] px-4 py-3 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-white">Assistant Ceres</p>
                          <p className="text-[8px] text-white/60">En ligne</p>
                        </div>
                      </div>
                      {/* Messages */}
                      <div className="p-3 space-y-2 h-[220px] overflow-y-auto">
                        <div className="flex gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#6D00CC] shrink-0 flex items-center justify-center">
                            <span className="text-[7px] text-white font-bold">IA</span>
                          </div>
                          <div className="rounded-lg bg-[#F5F5F5] px-3 py-2 max-w-[80%]">
                            <p className="text-[9px] text-[#555] leading-[1.5]">Bonjour ! Je suis l&apos;assistant Ceres. Vous cherchez a optimiser votre processus commercial ? Je peux vous orienter vers la bonne personne en 2 minutes.</p>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <div className="rounded-lg bg-[#6D00CC] px-3 py-2 max-w-[80%]">
                            <p className="text-[9px] text-white leading-[1.5]">Oui, on cherche a ameliorer notre CRM HubSpot, on est 12 commerciaux.</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#6D00CC] shrink-0 flex items-center justify-center">
                            <span className="text-[7px] text-white font-bold">IA</span>
                          </div>
                          <div className="rounded-lg bg-[#F5F5F5] px-3 py-2 max-w-[80%]">
                            <p className="text-[9px] text-[#555] leading-[1.5]">Parfait. Une equipe de 12 commerciaux sur HubSpot, c&apos;est exactement notre coeur de metier. Quel est votre plus gros pain point aujourd&apos;hui ?</p>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <div className="rounded-lg bg-[#6D00CC] px-3 py-2 max-w-[80%]">
                            <p className="text-[9px] text-white leading-[1.5]">Les commerciaux n&apos;utilisent pas bien le CRM, les donnees sont sales, et on n&apos;a aucune visibilite sur le pipeline.</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#6D00CC] shrink-0 flex items-center justify-center">
                            <span className="text-[7px] text-white font-bold">IA</span>
                          </div>
                          <div className="rounded-lg bg-[#F5F5F5] px-3 py-2 max-w-[80%]">
                            <p className="text-[9px] text-[#555] leading-[1.5]">Compris. Adoption CRM + data quality + reporting pipeline. C&apos;est un cas classique que Guillaume traite regulierement. Je vous propose un creneau de 30 min cette semaine ?</p>
                          </div>
                        </div>
                      </div>
                      {/* Qualification badge */}
                      <div className="border-t border-[#EAEAEA] px-3 py-2 bg-[#F0EBFF]">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] text-[#6D00CC] font-semibold">Lead qualifie BANT</span>
                          <div className="flex gap-1">
                            {["Budget", "Autorite", "Besoin", "Timing"].map((b) => (
                              <span key={b} className="text-[7px] px-1 py-0.5 rounded bg-[#6D00CC] text-white">{b}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ============================================ */}
              {/* Section 2h : Coaching commercial */}
              {/* ============================================ */}
              <section id="coaching" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[10px] font-bold">8</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Coaching commercial en temps reel</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le coaching commercial est traditionnellement un processus lent et subjectif. Le manager ecoute un appel de temps en temps, fait un debrief, et donne des conseils bases sur son impression. Avec 8 a 15 commerciaux a gerer, il est impossible de coacher tout le monde de maniere reguliere.</p>
                    <p>L&apos;IA de coaching analyse chaque appel automatiquement et fournit un feedback structure au commercial, sans intervention du manager. Elle evalue la structure de l&apos;appel (opening, discovery, pitch, closing), le ratio talk/listen, la gestion des objections, l&apos;utilisation des questions ouvertes, et compare avec les meilleures pratiques des top performers de l&apos;equipe.</p>
                    <p>Gong fait ca nativement avec son &ldquo;Smart Trackers&rdquo; et ses scorecards. Pour les equipes avec un budget plus serre, on peut reproduire une version simplifiee avec Claap + Claude : la transcription est analysee par un prompt de coaching qui genere un rapport avec 3 points forts et 3 axes d&apos;amelioration.</p>
                    <p>L&apos;impact est mesurable. Un de nos clients a deploye du coaching IA sur une equipe de 10 SDR. En 8 semaines : le taux de conversion discovery-to-demo est passe de 24% a 38%, le talk ratio moyen est passe de 68/32 a 45/55, et le nombre moyen de questions ouvertes par appel est passe de 2.3 a 5.1. Le manager passe toujours du temps en coaching, mais il se concentre sur les situations complexes au lieu de repeter les fondamentaux.</p>
                  </div>

                  {/* CSS Mockup: AI coaching scorecard */}
                  <div className="mt-6 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-4">Scorecard de coaching IA - Appel #247</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                      {[
                        { label: "Structure", score: 82, color: "#22C55E" },
                        { label: "Ecoute", score: 91, color: "#6D00CC" },
                        { label: "Objections", score: 64, color: "#FF7A59" },
                        { label: "Closing", score: 73, color: "#4B5EFC" },
                      ].map((s) => (
                        <div key={s.label} className="rounded-lg bg-white border border-[#EAEAEA] p-3 text-center">
                          <p className="text-[18px] font-bold" style={{ color: s.color }}>{s.score}</p>
                          <p className="text-[8px] text-[#999]">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3">
                        <p className="text-[9px] font-semibold text-[#22C55E] mb-2">Points forts</p>
                        <ul className="text-[9px] text-[#555] space-y-1 leading-[1.5]">
                          <li>+ Excellent ratio d&apos;ecoute (35/65)</li>
                          <li>+ 5 questions ouvertes posees</li>
                          <li>+ Discovery structuree (pain, impact, timeline)</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3">
                        <p className="text-[9px] font-semibold text-[#EF4444] mb-2">Axes d&apos;amelioration</p>
                        <ul className="text-[9px] text-[#555] space-y-1 leading-[1.5]">
                          <li>- Objection &ldquo;prix&rdquo; non traitee (esquivee)</li>
                          <li>- Pas de next step concret en fin d&apos;appel</li>
                          <li>- Reformulation insuffisante des besoins</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ============================================ */}
              {/* Section 3 : La stack IA en 2026 */}
              {/* ============================================ */}
              <section id="stack-ia" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">La stack IA commerciale en 2026</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Le paysage des outils IA pour la vente evolue a une vitesse folle. En 2024, la question etait &ldquo;faut-il utiliser l&apos;IA ?&rdquo;. En 2026, la question est &ldquo;quels outils combiner pour construire une stack coherente ?&rdquo;. Voici les categories d&apos;outils et nos recommandations pour chaque cas d&apos;usage.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        category: "LLM / IA generative",
                        tools: [
                          { name: "Claude (Anthropic)", desc: "Notre choix par defaut. Meilleur sur l'analyse longue, le raisonnement et la redaction B2B. Moins d'hallucinations que GPT.", color: "#6D00CC", pick: true },
                          { name: "ChatGPT (OpenAI)", desc: "Plus versatile, ecosysteme GPTs. Bon pour la generation de contenu et les taches grand public.", color: "#10A37F", pick: false },
                          { name: "Gemini (Google)", desc: "Integre a Google Workspace. Bon pour les equipes 100% Google.", color: "#4285F4", pick: false },
                        ]
                      },
                      {
                        category: "Conversation Intelligence",
                        tools: [
                          { name: "Gong", desc: "La reference. Transcription, coaching, forecast. Mais cher (100+ EUR/user/mois).", color: "#7C3AED", pick: false },
                          { name: "Claap", desc: "Alternative francaise, excellente. Transcription + resume IA. 15 EUR/user/mois.", color: "#4B5EFC", pick: true },
                          { name: "Granola", desc: "Ideal pour les reunions internes et les notes. Leger et rapide.", color: "#22C55E", pick: false },
                        ]
                      },
                      {
                        category: "Enrichissement & Intent Data",
                        tools: [
                          { name: "Clay", desc: "Le couteau suisse de l'enrichissement. 50+ sources de donnees, waterfall, IA integree.", color: "#FF7A59", pick: true },
                          { name: "6sense", desc: "Intent data + ABM. Identifie les comptes en phase de recherche active.", color: "#1E40AF", pick: false },
                          { name: "Apollo.io", desc: "Base de donnees + sequences. Bon rapport qualite/prix pour la prospection outbound.", color: "#6366F1", pick: false },
                        ]
                      },
                      {
                        category: "Forecasting & RevOps",
                        tools: [
                          { name: "Clari", desc: "La reference du forecast IA. Pipeline inspection + revenue intelligence.", color: "#0EA5E9", pick: false },
                          { name: "HubSpot Forecasting", desc: "Integre, suffisant pour les PME. Forecast par equipe, par pipeline, par periode.", color: "#FF7A59", pick: true },
                          { name: "Ceres RevOps AI", desc: "Notre outil. Analyse IA du CRM, scoring, alertes automatiques.", color: "#6D00CC", pick: true },
                        ]
                      },
                    ].map((cat) => (
                      <div key={cat.category} className="rounded-lg border border-[#F2F2F2] p-4">
                        <p className="text-[11px] font-semibold text-[#111] mb-3">{cat.category}</p>
                        <div className="space-y-2">
                          {cat.tools.map((t) => (
                            <div key={t.name} className={`flex items-start gap-3 rounded-lg p-2.5 ${t.pick ? "bg-[#F0EBFF] border border-[#E0D4FF]" : "bg-[#FAFAFA]"}`}>
                              <div className="w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-white text-[8px] font-bold" style={{ background: t.color }}>
                                {t.name.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-semibold text-[#111]">{t.name}</span>
                                  {t.pick && <span className="text-[7px] px-1.5 py-0.5 rounded bg-[#6D00CC] text-white font-medium">Notre choix</span>}
                                </div>
                                <p className="text-[9px] text-[#777] leading-[1.5] mt-0.5">{t.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ============================================ */}
              {/* Section 4 : Implementer sans tout casser */}
              {/* ============================================ */}
              <section id="implementation" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Implementer l&apos;IA sans tout casser : l&apos;approche en 3 phases</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>L&apos;erreur la plus frequente est de vouloir deployer l&apos;IA partout en meme temps. Trop de changements simultanement garantissent la resistance de l&apos;equipe et l&apos;echec du projet. L&apos;approche qui fonctionne est progressive : on commence par les quick wins, on prouve la valeur, et on etend progressivement.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        phase: "Phase 1 : Quick wins (semaines 1-4)",
                        color: "#22C55E",
                        items: [
                          "Deployer la transcription automatique des appels (Claap/Granola)",
                          "Activer le resume IA des calls dans le CRM",
                          "Mettre en place l'enrichissement automatique des leads (Clay + Claude)",
                          "Former l'equipe a utiliser Claude pour la redaction d'emails",
                        ],
                        result: "Resultat attendu : 5-8h gagnees par commercial et par semaine. L'equipe commence a voir la valeur concrete de l'IA.",
                      },
                      {
                        phase: "Phase 2 : Optimisation (semaines 5-12)",
                        color: "#6D00CC",
                        items: [
                          "Deployer le scoring IA sur les deals (HubSpot Predictive ou custom)",
                          "Mettre en place l'analyse win/loss trimestrielle par IA",
                          "Automatiser le forecast avec les donnees CRM",
                          "Creer des templates de prompts standardises pour l'equipe",
                        ],
                        result: "Resultat attendu : win rate en hausse de 10-20%, forecast fiable a +/- 10%, meilleure allocation du temps commercial.",
                      },
                      {
                        phase: "Phase 3 : Transformation (mois 4-6)",
                        color: "#4B5EFC",
                        items: [
                          "Deployer un chatbot IA de qualification sur le site",
                          "Mettre en place le coaching IA systematique",
                          "Integrer le forecast IA dans les reviews hebdomadaires",
                          "Construire un dashboard IA qui alerte sur les deals a risque",
                        ],
                        result: "Resultat attendu : processus commercial augmente par l'IA de bout en bout. Chaque etape du cycle de vente est assistee par l'IA sans etre dependante.",
                      },
                    ].map((p) => (
                      <div key={p.phase} className="rounded-lg border-l-4 bg-[#FAFAFA] p-5" style={{ borderColor: p.color }}>
                        <p className="text-[12px] font-semibold text-[#111] mb-3">{p.phase}</p>
                        <ul className="space-y-1.5 mb-3">
                          {p.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[11px] text-[#555] leading-[1.6]">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: p.color }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="rounded-lg p-2.5" style={{ background: `${p.color}10` }}>
                          <p className="text-[10px] font-medium" style={{ color: p.color }}>{p.result}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ============================================ */}
              {/* Section 5 : Les pieges a eviter */}
              {/* ============================================ */}
              <section id="pieges" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les 5 pieges a eviter avec l&apos;IA commerciale</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>L&apos;IA commerciale est un accelerateur puissant, mais mal utilisee, elle peut faire plus de degats que de bien. Voici les pieges dans lesquels tombent la majorite des equipes, et comment les eviter.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        piege: "Les hallucinations dans les emails de prospection",
                        desc: "L'IA invente parfois des informations : une levee de fonds qui n'a pas eu lieu, un article que le prospect n'a jamais ecrit, un chiffre d'affaires incorrect. Envoyer un email avec une information fausse detruit instantanement votre credibilite. La regle absolue : chaque email genere par IA doit etre relu et valide par un humain avant envoi. Jamais d'envoi automatique sans validation.",
                        solution: "Workflow : IA redige en draft, commercial relit et valide, CRM envoie. Jamais de boucle fermee sans humain.",
                        color: "#EF4444"
                      },
                      {
                        piege: "La sur-automatisation du processus de vente",
                        desc: "Automatiser chaque interaction deshumanise la relation commerciale. Un prospect B2B qui recoit un email IA, puis un follow-up IA, puis un chatbot IA, puis une demo scripte, va sentir qu'il parle a une machine. La vente B2B repose sur la confiance et la relation humaine. L'IA doit rester invisible : elle prepare, elle assiste, mais elle ne remplace pas l'humain face au client.",
                        solution: "Regle des 80/20 : l'IA gere 80% de la preparation et de l'administratif, l'humain gere 100% de l'interaction directe avec le prospect.",
                        color: "#FF7A59"
                      },
                      {
                        piege: "La resistance de l'equipe commerciale",
                        desc: "Beaucoup de commerciaux voient l'IA comme une menace pour leur emploi ou une remise en question de leurs competences. Si l'implementation est mal geree, vous obtiendrez de la resistance passive : les outils sont deployes mais personne ne les utilise. La cle est d'impliquer l'equipe des le debut, de montrer que l'IA les aide (pas les remplace), et de commencer par les taches qu'ils detestent (saisie CRM, redaction de notes).",
                        solution: "Commencez par les pain points de l'equipe, pas par les objectifs du management. Un commercial qui gagne 2h par jour grace a l'IA deviendra votre meilleur ambassadeur.",
                        color: "#6D00CC"
                      },
                      {
                        piege: "Des donnees CRM trop sales pour l'IA",
                        desc: "L'IA est aussi bonne que les donnees qu'elle recoit. Si votre CRM est rempli de fiches incompletes, de deals au mauvais stage, de contacts sans email, l'IA produira des analyses fausses et des scores incoherents. Avant de deployer l'IA, il faut nettoyer le CRM. C'est moins sexy que de brancher un outil IA, mais c'est la condition sine qua non.",
                        solution: "Audit de data quality avant tout deploiement IA. Objectif minimum : 80% des fiches contacts avec email + entreprise + poste, 90% des deals au bon stage avec un montant renseigne.",
                        color: "#4B5EFC"
                      },
                      {
                        piege: "Mesurer l'adoption, pas l'impact",
                        desc: "Beaucoup d'equipes mesurent le succes de l'IA par le nombre de personnes qui utilisent l'outil. C'est une vanity metric. Ce qui compte, c'est l'impact sur les metriques business : le temps de qualification a-t-il baisse ? Le win rate a-t-il augmente ? Le cycle de vente s'est-il raccourci ? Si l'outil est utilise par tout le monde mais que les KPIs ne bougent pas, c'est un echec.",
                        solution: "Definissez 3 KPIs business avant le deploiement. Mesurez-les a M+1, M+3, M+6. Si pas d'impact mesurable, changez d'approche.",
                        color: "#22C55E"
                      },
                    ].map((e, i) => (
                      <div key={i} className="rounded-lg border-l-2 bg-[#FAFAFA] p-4" style={{ borderColor: e.color }}>
                        <p className="text-[12px] font-semibold text-[#111] mb-2">{i + 1}. {e.piege}</p>
                        <p className="text-[11px] text-[#777] leading-[1.6] mb-2">{e.desc}</p>
                        <div className="rounded-lg bg-white border border-[#F2F2F2] p-2">
                          <p className="text-[9px] font-semibold mb-0.5" style={{ color: e.color }}>Solution</p>
                          <p className="text-[10px] text-[#555] leading-[1.5]">{e.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ============================================ */}
              {/* Section 6 : ROI de l'IA commerciale */}
              {/* ============================================ */}
              <section id="roi" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">ROI de l&apos;IA commerciale : les chiffres reels</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Au-dela des promesses marketing, quel est le retour sur investissement reel de l&apos;IA dans un processus de vente B2B ? Voici les chiffres que l&apos;on observe chez nos clients apres 6 mois de deploiement, avec une equipe de 10 commerciaux.</p>
                  </div>

                  {/* Time savings breakdown */}
                  <div className="rounded-lg border border-[#F2F2F2] bg-[#FAFAFA] p-5 mb-4">
                    <p className="text-[11px] font-semibold text-[#111] mb-3">Temps gagne par commercial et par semaine</p>
                    <div className="space-y-2">
                      {[
                        { task: "Recherche et enrichissement leads", before: "5h", after: "0.5h", saved: "4.5h", pct: 90 },
                        { task: "Redaction d'emails de prospection", before: "6h", after: "1.5h", saved: "4.5h", pct: 75 },
                        { task: "Notes et resumes d'appels", before: "3h", after: "0.5h", saved: "2.5h", pct: 83 },
                        { task: "Mise a jour CRM", before: "4h", after: "1h", saved: "3h", pct: 75 },
                        { task: "Preparation de reunions", before: "2h", after: "0.5h", saved: "1.5h", pct: 75 },
                      ].map((t) => (
                        <div key={t.task} className="rounded-lg bg-white border border-[#EAEAEA] p-3">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-medium text-[#111]">{t.task}</span>
                            <span className="text-[10px] font-bold text-[#6D00CC]">-{t.saved}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-[#F2F2F2] rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-[#6D00CC]" style={{ width: `${t.pct}%` }} />
                            </div>
                            <span className="text-[8px] text-[#999]">{t.before} → {t.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-lg bg-[#F0EBFF] border border-[#E0D4FF] p-3 text-center">
                      <p className="text-[10px] text-[#6D00CC]">Total gagne par commercial</p>
                      <p className="text-[20px] font-bold text-[#6D00CC]">16h / semaine</p>
                      <p className="text-[9px] text-[#999]">Soit 2 jours complets reinvestis en vente active</p>
                    </div>
                  </div>

                  {/* Revenue impact */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[
                      { metric: "Win rate", before: "28%", after: "37%", change: "+32%", color: "#6D00CC" },
                      { metric: "Cycle de vente", before: "68j", after: "52j", change: "-24%", color: "#4B5EFC" },
                      { metric: "Taux de reponse emails", before: "3.2%", after: "11.8%", change: "+269%", color: "#22C55E" },
                      { metric: "Pipeline genere", before: "180K", after: "295K", change: "+64%", color: "#FF7A59" },
                    ].map((m) => (
                      <div key={m.metric} className="rounded-lg border border-[#F2F2F2] p-3 text-center">
                        <p className="text-[9px] text-[#999] mb-1">{m.metric}</p>
                        <p className="text-[8px] text-[#CCC] line-through">{m.before}</p>
                        <p className="text-[16px] font-bold" style={{ color: m.color }}>{m.after}</p>
                        <p className="text-[9px] font-semibold" style={{ color: m.color }}>{m.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* ROI calculation */}
                  <div className="rounded-lg border border-[#F2F2F2] bg-[#FAFAFA] p-4">
                    <p className="text-[11px] font-semibold text-[#111] mb-3">Calcul du ROI pour une equipe de 10 commerciaux</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3">
                        <p className="text-[9px] text-[#999] mb-2">Investissement annuel</p>
                        <div className="space-y-1 text-[9px]">
                          <div className="flex justify-between"><span className="text-[#555]">Claap (10 users)</span><span className="text-[#111]">1 800 EUR</span></div>
                          <div className="flex justify-between"><span className="text-[#555]">Clay (enrichissement)</span><span className="text-[#111]">3 600 EUR</span></div>
                          <div className="flex justify-between"><span className="text-[#555]">Claude API</span><span className="text-[#111]">2 400 EUR</span></div>
                          <div className="flex justify-between"><span className="text-[#555]">Make (automatisations)</span><span className="text-[#111]">1 200 EUR</span></div>
                          <div className="flex justify-between border-t border-[#F2F2F2] pt-1 mt-1"><span className="font-semibold text-[#111]">Total</span><span className="font-bold text-[#111]">9 000 EUR/an</span></div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-[#F0EBFF] border border-[#E0D4FF] p-3">
                        <p className="text-[9px] text-[#6D00CC] mb-2">Valeur generee annuelle</p>
                        <div className="space-y-1 text-[9px]">
                          <div className="flex justify-between"><span className="text-[#555]">Temps gagne (valeur salariale)</span><span className="text-[#6D00CC]">48 000 EUR</span></div>
                          <div className="flex justify-between"><span className="text-[#555]">Pipeline additionnel (+64%)</span><span className="text-[#6D00CC]">115 000 EUR</span></div>
                          <div className="flex justify-between"><span className="text-[#555]">Win rate ameliore (+32%)</span><span className="text-[#6D00CC]">72 000 EUR</span></div>
                          <div className="flex justify-between border-t border-[#E0D4FF] pt-1 mt-1"><span className="font-semibold text-[#6D00CC]">Total</span><span className="font-bold text-[#6D00CC]">235 000 EUR/an</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-[10px] text-[#999]">Retour sur investissement</p>
                      <p className="text-[24px] font-bold text-[#6D00CC]">26x</p>
                      <p className="text-[9px] text-[#999]">Pour 9 000 EUR investis, 235 000 EUR de valeur generee</p>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ============================================ */}
              {/* Section 7 : Notre approche Ceres (dark) */}
              {/* ============================================ */}
              <section id="approche-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8 border border-[#222]">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-[#6D00CC] flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-white">Notre approche chez Ceres : Claude + HubSpot + Make</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#999] leading-[1.75] mb-6">
                    <p>Chez Ceres, on ne vend pas de l&apos;IA pour vendre de l&apos;IA. On l&apos;utilise au quotidien dans nos propres processus et dans ceux de nos clients. Notre stack repose sur trois piliers : <strong className="text-white">Claude</strong> comme cerveau IA, <strong className="text-white">HubSpot</strong> comme CRM central, et <strong className="text-white">Make</strong> comme orchestrateur d&apos;automatisations.</p>
                    <p>Pourquoi Claude plutot que ChatGPT ? Parce que Claude est meilleur sur les taches qui comptent en B2B : l&apos;analyse de donnees longues (transcriptions d&apos;appels, historiques de deals), le raisonnement structure (win/loss analysis, scoring), et la redaction naturelle (emails qui ne sonnent pas comme un robot). Apres avoir teste les deux sur des centaines de cas, Claude produit 30% moins d&apos;hallucinations et des analyses plus nuancees.</p>
                    <p>Pourquoi HubSpot ? Parce que c&apos;est le CRM qui offre le meilleur equilibre entre puissance et facilite d&apos;utilisation pour les PME B2B francaises. Son ecosysteme d&apos;integrations est le plus riche du marche, ce qui permet de brancher Claude et Make sans friction. Et son plan Starter a 15 EUR/mois/user est imbattable pour demarrer.</p>
                    <p>Pourquoi Make ? Parce que c&apos;est l&apos;outil d&apos;automatisation no-code le plus flexible pour orchestrer des workflows complexes. Un lead arrive dans HubSpot, Make declenche l&apos;enrichissement Clay, envoie le contexte a Claude pour generer un brief, et pousse le resultat dans la fiche CRM. Le tout en moins de 30 secondes, sans une ligne de code.</p>
                  </div>

                  {/* CSS Mockup: Claude analyzing a deal */}
                  <div className="rounded-lg bg-[#151515] border border-[#333] p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded bg-[#6D00CC] flex items-center justify-center">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                      </div>
                      <span className="text-[10px] font-semibold text-[#999]">Claude analyse un deal HubSpot en temps reel</span>
                    </div>
                    <div className="space-y-2">
                      {/* User message */}
                      <div className="flex justify-end">
                        <div className="rounded-lg bg-[#6D00CC] px-3 py-2 max-w-[85%]">
                          <p className="text-[9px] text-white leading-[1.5]">Analyse le deal TechFlow (24K EUR). Quels sont les risques et les prochaines actions recommandees ?</p>
                        </div>
                      </div>
                      {/* AI response */}
                      <div className="rounded-lg bg-[#1A1A1A] border border-[#333] px-3 py-2">
                        <p className="text-[9px] text-[#CCC] leading-[1.6] mb-2">J&apos;ai analyse le deal TechFlow en croisant les donnees CRM, les transcriptions d&apos;appels et l&apos;historique d&apos;engagement. Voici mon analyse :</p>
                        <div className="grid grid-cols-3 gap-2 mb-2">
                          <div className="rounded bg-[#222] p-2 text-center">
                            <p className="text-[8px] text-[#666]">Probabilite</p>
                            <p className="text-[12px] font-bold text-[#22C55E]">84%</p>
                          </div>
                          <div className="rounded bg-[#222] p-2 text-center">
                            <p className="text-[8px] text-[#666]">Sante du deal</p>
                            <p className="text-[12px] font-bold text-[#FF7A59]">Medium</p>
                          </div>
                          <div className="rounded bg-[#222] p-2 text-center">
                            <p className="text-[8px] text-[#666]">Closing estime</p>
                            <p className="text-[12px] font-bold text-[#4B5EFC]">28 mars</p>
                          </div>
                        </div>
                        <div className="rounded bg-[#1F1A2E] border border-[#2D2540] p-2 mb-2">
                          <p className="text-[8px] text-[#FF7A59] font-semibold mb-1">Risques identifies</p>
                          <ul className="text-[8px] text-[#999] space-y-0.5">
                            <li>- Le CTO n&apos;a pas ete implique depuis 12 jours (risque de blocage technique)</li>
                            <li>- Le prospect a mentionne un concurrent 2x dans le dernier call</li>
                            <li>- Pas de relance depuis la demo du 10 mars (5 jours)</li>
                          </ul>
                        </div>
                        <div className="rounded bg-[#1A2E1A] border border-[#254025] p-2">
                          <p className="text-[8px] text-[#22C55E] font-semibold mb-1">Actions recommandees</p>
                          <ul className="text-[8px] text-[#999] space-y-0.5">
                            <li>1. Relancer Thomas avec le case study DataPulse (migration zero-downtime)</li>
                            <li>2. Demander un call avec le CTO pour adresser les objections techniques</li>
                            <li>3. Envoyer une proposition chiffree avant vendredi pour maintenir le momentum</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Workflow diagram */}
                  <div className="rounded-lg bg-[#151515] border border-[#333] p-4">
                    <p className="text-[10px] font-semibold text-[#666] uppercase tracking-wider mb-4">Notre workflow IA type pour un client B2B</p>
                    <div className="flex flex-col gap-2">
                      {[
                        { step: "1", label: "Lead entrant (HubSpot)", sub: "Formulaire, import, ou chatbot", color: "#FF7A59", icon: "H" },
                        { step: "2", label: "Enrichissement (Clay + Claude)", sub: "Firmographique, intent, brief contextuel", color: "#6D00CC", icon: "C" },
                        { step: "3", label: "Scoring IA (Ceres RevOps AI)", sub: "Score predictif multi-signaux", color: "#6D00CC", icon: "S" },
                        { step: "4", label: "Email personnalise (Claude)", sub: "Draft IA, validation humaine, envoi CRM", color: "#6D00CC", icon: "E" },
                        { step: "5", label: "Call transcrit (Claap)", sub: "Resume + next steps auto dans HubSpot", color: "#4B5EFC", icon: "T" },
                        { step: "6", label: "Analyse continue (Claude)", sub: "Alertes risques, coaching, forecast", color: "#6D00CC", icon: "A" },
                      ].map((s, i) => (
                        <div key={s.step} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-white text-[10px] font-bold" style={{ background: s.color }}>
                            {s.icon}
                          </div>
                          <div className="flex-1 rounded-lg bg-[#1A1A1A] border border-[#333] p-2.5">
                            <p className="text-[10px] font-medium text-white">{s.label}</p>
                            <p className="text-[8px] text-[#666]">{s.sub}</p>
                          </div>
                          {i < 5 && (
                            <div className="hidden sm:block">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" className="rotate-90"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 rounded-lg bg-[#1F1A2E] border border-[#2D2540] p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#6D00CC] shrink-0 flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-white">Orchestration : Make (zero code)</p>
                        <p className="text-[8px] text-[#999]">Tous les steps sont connectes par Make. Aucune intervention manuelle entre les etapes. Le commercial recoit une fiche enrichie, scoree, avec un draft d&apos;email pret a envoyer.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#999] leading-[1.75]">
                    <p>Ce que l&apos;on propose chez Ceres, c&apos;est l&apos;implementation complete de cette stack, adaptee a votre contexte. On ne deploy pas un outil generique : on configure chaque brique pour votre ICP, votre cycle de vente, et votre equipe. L&apos;objectif est que l&apos;IA devienne invisible - integree dans le quotidien de vos commerciaux sans changer leurs habitudes.</p>
                    <p>Le deploiement prend 4 a 8 semaines selon la complexite. On forme l&apos;equipe, on mesure les resultats a M+1 et M+3, et on ajuste. Pas de contrat longue duree : si les resultats ne sont pas au rendez-vous, on arrete.</p>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <div className="mb-12 rounded-lg bg-gradient-to-br from-[#6D00CC] to-[#4B0E8A] p-6 md:p-8 text-center">
                <h3 className="text-[17px] font-semibold text-white mb-3">Pret a integrer l&apos;IA dans votre processus commercial ?</h3>
                <p className="text-[13px] text-white/70 leading-[1.7] mb-5 max-w-[500px] mx-auto">Chez Ceres, on deploie la stack Claude + HubSpot + Make pour les equipes commerciales B2B. Un audit gratuit de 30 minutes pour identifier les quick wins IA dans votre processus de vente.</p>
                <Link href="https://calendly.com/ceres-revops/30min" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-[#6D00CC] rounded-lg text-[13px] font-medium hover:bg-[#F5F5F5] transition-colors">
                  Prendre rendez-vous
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </Link>
              </div>

              {/* Related articles */}
              <div>
                <h3 className="text-[14px] font-semibold text-[#111] mb-4">Articles complementaires</h3>
                <div className="grid gap-3">
                  {relatedArticles.map((a) => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="group flex items-center gap-4 rounded-lg border border-[#F2F2F2] p-4 hover:border-[#DDD] transition-colors">
                      <div className="w-1 h-10 rounded-full" style={{ background: a.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-medium mb-1" style={{ color: a.color }}>{a.category}</p>
                        <p className="text-[12px] font-medium text-[#111] group-hover:text-[#6D00CC] transition-colors leading-[1.4]">{a.title}</p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}