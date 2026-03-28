"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "RevOps Manager : fiche de poste, salaire et competences en 2026",
  description: "Guide complet du metier de RevOps Manager en France en 2026. Fiche de poste detaillee, salaire par experience et region, competences requises, outils, journee type, parcours de carriere et alternative externalisation.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-24",
  dateModified: "2026-03-24",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/revops-manager-fiche-poste-salaire-competences" },
  articleSection: "RevOps",
  wordCount: 3500,
  inLanguage: "fr",
};

const jobPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "RevOps Manager",
  description: "Le RevOps Manager est responsable de l&apos;alignement et de l&apos;optimisation des processus, outils et donnees des equipes Sales, Marketing et Customer Success pour maximiser le revenu.",
  datePosted: "2026-03-24",
  employmentType: "FULL_TIME",
  hiringOrganization: { "@type": "Organization", name: "Entreprise B2B type", sameAs: "https://www.ceres-revops.com" },
  jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "FR", addressLocality: "Paris" } },
  baseSalary: { "@type": "MonetaryAmount", currency: "EUR", value: { "@type": "QuantitativeValue", minValue: 42000, maxValue: 95000, unitText: "YEAR" } },
  occupationalCategory: "Revenue Operations",
  skills: "CRM, Data Analysis, Marketing Automation, Process Optimization, HubSpot, Salesforce",
  industry: "B2B SaaS / Technology",
};

const sections = [
  { id: "definition", title: "Definition" },
  { id: "croissance-2026", title: "Croissance en 2026" },
  { id: "fiche-de-poste", title: "Fiche de poste" },
  { id: "competences", title: "Competences" },
  { id: "journee-type", title: "Journee type" },
  { id: "outils", title: "Outils" },
  { id: "salaire", title: "Salaire en France" },
  { id: "parcours", title: "Parcours type" },
  { id: "recruter", title: "Recruter un RevOps" },
  { id: "externaliser", title: "Externaliser le RevOps" },
  { id: "vision-ceres", title: "Notre vision" },
];

const relatedArticles = [
  { title: "Comment aligner marketing et sales en 30 jours avec le RevOps", slug: "aligner-marketing-sales-revops", category: "RevOps", color: "#FF7A59" },
  { title: "KPI commerciaux : les 25 indicateurs de vente a suivre en 2026", slug: "kpi-commerciaux-indicateurs-vente", category: "Data & Reporting", color: "#22C55E" },
  { title: "Lead Scoring : le guide complet pour qualifier vos prospects", slug: "lead-scoring-guide-complet", category: "RevOps", color: "#4B5EFC" },
];

export default function RevOpsManagerFichePostePage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("definition");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "3%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "10%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "20%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "30%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "42%", width: 280, height: 280, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "55%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "68%", width: 240, height: 240, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "2%", top: "80%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.06, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "90%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(70px)" }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }} />

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
                  <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors cursor-pointer">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.04a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L5.25 9.068" /></svg>
                  </button>
                  <a href="https://twitter.com/intent/tweet?text=RevOps%20Manager%20%3A%20fiche%20de%20poste%2C%20salaire%20et%20competences%20en%202026&url=https://www.ceres-revops.com/blog/revops-manager-fiche-poste-salaire-competences" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/revops-manager-fiche-poste-salaire-competences" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">RevOps Manager</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>RevOps</Badge>
                <span className="text-[11px] text-[#CCC]">16 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                RevOps Manager : fiche de poste, salaire et competences en 2026
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Le RevOps Manager est devenu l&apos;un des postes les plus recherches dans les entreprises B2B en France. Ce guide couvre tout ce qu&apos;il faut savoir sur ce role : definition precise, missions detaillees, competences requises, grille salariale par experience et region, outils du quotidien, parcours de carriere et alternative externalisation. Le referentiel complet pour recruter, devenir ou externaliser un RevOps Manager en 2026.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>24 mars 2026</span>
              </div>

              {/* Quick overview */}
              <div className="mt-8 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                <span className="text-[13px] font-semibold text-[#111] mb-4 block">Le RevOps Manager en chiffres</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Salaire median", value: "58K", color: "#FF7A59" },
                    { label: "Croissance demande", value: "+45%", color: "#22C55E" },
                    { label: "Offres LinkedIn FR", value: "1 200+", color: "#4B5EFC" },
                    { label: "Outils maitrises", value: "8-12", color: "#6C5CE7" },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-3 rounded-lg bg-white border border-[#F0F0F0]">
                      <div className="text-[22px] font-bold" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-[10px] text-[#999] mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </header>

            <article>
              {/* ===================== SECTION 1 : Definition ===================== */}
              <section id="definition" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">C&apos;est quoi un RevOps Manager ?</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le RevOps Manager, pour Revenue Operations Manager, est le responsable de l&apos;alignement operationnel des equipes qui generent du revenu dans l&apos;entreprise : Sales, Marketing et Customer Success. Son role est de s&apos;assurer que ces trois departements travaillent avec les memes processus, les memes outils, les memes donnees et les memes objectifs. L&apos;objectif final est simple : maximiser le revenu de maniere previsible et scalable.</p>
                    <p>Contrairement a ce que beaucoup pensent, le RevOps Manager n&apos;est pas un administrateur CRM glorifie. C&apos;est un role strategique qui se situe a l&apos;intersection de la technologie, des donnees et des processus business. Il ne se contente pas de configurer des outils. Il concoit l&apos;architecture operationnelle qui permet a l&apos;entreprise de croitre efficacement. Il identifie les frictions dans le parcours client, automatise les taches repetitives, standardise les processus et fournit aux equipes les donnees dont elles ont besoin pour prendre des decisions eclairees.</p>
                    <p>Le concept de Revenue Operations est ne aux Etats-Unis vers 2018-2019, porte par des entreprises SaaS en hypercroissance qui ont realise que les silos entre Sales Ops, Marketing Ops et CS Ops coutaient cher. Chaque equipe avait ses propres outils, ses propres metriques, ses propres processus. Le resultat : des donnees fragmentees, des processus incoherents et une incapacite a avoir une vue unifiee du revenu. Le RevOps est la reponse a ce probleme.</p>
                    <p>En France, le role a commence a se structurer vers 2022-2023 dans les startups B2B les plus avancees. En 2026, il s&apos;est generalise a l&apos;ensemble de l&apos;ecosysteme tech et commence a penetrer les ETI et les grands groupes. Toute entreprise B2B qui depasse 2 a 3 millions d&apos;euros de revenu recurrent commence a avoir besoin d&apos;un RevOps Manager, que ce soit en interne ou via une agence specialisee.</p>
                    <p>Le RevOps Manager se distingue des autres roles operations par sa vision transversale. Tandis qu&apos;un Sales Ops se concentre sur l&apos;equipe commerciale et qu&apos;un Marketing Ops se focalise sur l&apos;acquisition, le RevOps Manager embrasse l&apos;ensemble du cycle de revenu, de la premiere interaction marketing jusqu&apos;au renouvellement client. Cette vision de bout en bout est ce qui rend le role si precieux et si difficile a pourvoir.</p>
                  </div>

                  {/* RevOps vs traditional ops comparison */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                      <p className="text-[11px] font-semibold text-[#999] mb-3">Avant : Operations en silo</p>
                      <div className="space-y-2">
                        {[
                          "Sales Ops gere le CRM et les quotas",
                          "Marketing Ops gere l&apos;automation et les campagnes",
                          "CS Ops gere l&apos;onboarding et le churn",
                          "3 stacks differentes, 3 reportings differents",
                          "Pas de vision unifiee du revenu",
                        ].map((item) => (
                          <div key={item} className="flex items-start gap-2 text-[10px] text-[#888]">
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#DDD]"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                            <span dangerouslySetInnerHTML={{ __html: item }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-[#FF7A59]/20 bg-[#FF7A59]/5">
                      <p className="text-[11px] font-semibold text-[#FF7A59] mb-3">Apres : Revenue Operations unifie</p>
                      <div className="space-y-2">
                        {[
                          "Un RevOps Manager aligne les 3 equipes",
                          "Stack technologique unifiee et integree",
                          "Donnees centralisees, source de verite unique",
                          "Processus end-to-end du lead au renouvellement",
                          "Vue 360 du revenu et forecasting fiable",
                        ].map((item) => (
                          <div key={item} className="flex items-start gap-2 text-[10px] text-[#666]">
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#FF7A59]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 2 : Croissance en 2026 ===================== */}
              <section id="croissance-2026" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi le role de RevOps Manager explose en 2026</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le RevOps Manager n&apos;est plus un poste de niche reserve aux licornes de la Silicon Valley. En 2026, c&apos;est l&apos;un des roles qui croit le plus rapidement dans l&apos;ecosysteme B2B francais et mondial. Les chiffres sont sans ambiguite.</p>
                    <p>Sur LinkedIn, les offres d&apos;emploi mentionnant &ldquo;RevOps&rdquo; ou &ldquo;Revenue Operations&rdquo; en France ont augmente de 45% entre 2024 et 2026. La France comptait environ 800 offres actives fin 2024. En mars 2026, on depasse les 1 200 offres, sans compter les postes qui integrent des missions RevOps sous d&apos;autres intitules (Head of Operations, Business Operations Manager, Growth Ops). Si on inclut ces postes adjacents, la demande reelle est probablement 2 a 3 fois superieure.</p>
                    <p>Gartner prevoyait des 2023 que 75% des entreprises SaaS a plus forte croissance deploieraient un modele RevOps d&apos;ici 2025. Cette prediction s&apos;est largement realisee dans le monde anglo-saxon, et la France suit avec 12 a 18 mois de decalage. Les ETI et les grands groupes francais commencent a creer des postes de RevOps Manager ou de VP Revenue Operations, un signal fort de la maturation du marche.</p>
                    <p>Plusieurs facteurs expliquent cette acceleration. Premierement, la pression sur l&apos;efficacite operationnelle. Apres des annees de croissance a tout prix financee par du capital-risque abondant, les entreprises B2B sont entrees dans une ere de croissance rentable. Chaque euro investi dans l&apos;acquisition doit etre optimise. Le RevOps est la fonction qui rend cette optimisation possible en eliminant les pertes de conversion entre les equipes.</p>
                    <p>Deuxiemement, la complexite croissante de la stack technologique. Une entreprise B2B moyenne utilise entre 15 et 25 outils SaaS dans sa chaine de revenu. Sans quelqu&apos;un pour orchestrer ces outils, les integrations se deteriorent, les donnees divergent et les equipes passent plus de temps a se battre avec la technologie qu&apos;a vendre. Le RevOps Manager est le chef d&apos;orchestre de cet ecosysteme.</p>
                    <p>Troisiemement, l&apos;arrivee de l&apos;IA dans les processus commerciaux. Les outils d&apos;intelligence artificielle (scoring predictif, agents conversationnels, enrichissement automatise) necessitent des donnees propres et des processus structures pour fonctionner correctement. Le RevOps Manager est celui qui prepare le terrain pour l&apos;IA en s&apos;assurant que la fondation operationnelle est solide.</p>
                  </div>

                  {/* Growth stats */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "+45%", label: "de croissance des offres RevOps en France (2024-2026)", color: "#FF7A59" },
                      { value: "75%", label: "des SaaS a forte croissance ont adopte le RevOps (Gartner)", color: "#4B5EFC" },
                      { value: "1 200+", label: "offres actives sur LinkedIn France en mars 2026", color: "#22C55E" },
                      { value: "10-25%", label: "de gain de productivite commerciale apres implementation", color: "#6C5CE7" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-4 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2]">
                        <div className="text-[22px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-[10px] text-[#999] mt-1 leading-[1.4]">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Growth trend mini chart */}
                  <div className="mt-5 rounded-lg border border-[#F0F0F0] p-4">
                    <p className="text-[10px] text-[#999] mb-3">Evolution des offres RevOps en France -- 2021-2026</p>
                    <div className="flex items-end gap-3 h-24">
                      {[
                        { year: "2021", value: 120, pct: 10 },
                        { year: "2022", value: 280, pct: 23 },
                        { year: "2023", value: 450, pct: 38 },
                        { year: "2024", value: 680, pct: 57 },
                        { year: "2025", value: 950, pct: 79 },
                        { year: "2026", value: 1200, pct: 100 },
                      ].map((item) => (
                        <div key={item.year} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[8px] text-[#999] font-medium">{item.value}</span>
                          <div className="w-full rounded-t-sm transition-all" style={{ height: `${item.pct * 0.7}px`, backgroundColor: item.year === "2026" ? "#FF7A59" : "#E8E8E8" }} />
                          <span className="text-[8px] text-[#BBB]">{item.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 3 : Fiche de poste ===================== */}
              <section id="fiche-de-poste" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Fiche de poste complete du RevOps Manager</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le RevOps Manager porte une responsabilite large qui couvre trois grands domaines : les processus, la technologie et les donnees. Il est le garant de la coherence operationnelle entre les equipes revenue. Voici le detail de ses missions principales et de son rattachement dans l&apos;organisation.</p>
                  </div>

                  {/* Missions principales */}
                  <div className="mt-6 space-y-3">
                    {[
                      {
                        title: "Alignement des processus revenue",
                        detail: "Concevoir et maintenir les processus de bout en bout : lead-to-opportunity, opportunity-to-close, close-to-renewal. Definir les lifecycle stages, les criteres de qualification (MQL, SQL, PQL), les SLA inter-equipes, les regles de routing et les workflows de handoff. S&apos;assurer que chaque etape du parcours client est documentee, mesuree et optimisee.",
                        color: "#FF7A59",
                      },
                      {
                        title: "Administration et optimisation de la stack technologique",
                        detail: "Gerer le CRM (HubSpot, Salesforce) et l&apos;ensemble des outils connectes : marketing automation, enrichissement, sequencing, analytics, facturation. Maintenir les integrations, configurer les automatisations, deployer de nouveaux outils et former les equipes. Garantir que la stack est fiable, performante et adoptee par les utilisateurs.",
                        color: "#4B5EFC",
                      },
                      {
                        title: "Data management et reporting",
                        detail: "Mettre en place et maintenir un systeme de reporting unifie. Construire les dashboards operationnels et strategiques. Assurer la qualite des donnees : deduplication, normalisation, enrichissement, hygiene. Fournir aux equipes et au management des metriques fiables pour piloter l&apos;activite : pipeline, conversion, velocity, CAC, LTV, NRR.",
                        color: "#22C55E",
                      },
                      {
                        title: "Forecasting et planification du revenu",
                        detail: "Construire les modeles de prevision de revenu. Analyser les tendances pipeline, les taux de conversion historiques et la saisonnalite pour produire des forecasts fiables. Alerter le management en cas de deviation et proposer des plans d&apos;action correctifs. Participer a la planification annuelle et trimestrielle des objectifs.",
                        color: "#6C5CE7",
                      },
                      {
                        title: "Enablement et conduite du changement",
                        detail: "Former les equipes aux outils et aux processus. Documenter les playbooks operationnels. Communiquer les changements de processus et s&apos;assurer de leur adoption. Mesurer l&apos;adoption des outils et des processus via des metriques dediees. Etre l&apos;interlocuteur central pour toute question operationnelle des equipes revenue.",
                        color: "#F59E0B",
                      },
                    ].map((item) => (
                      <div key={item.title} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
                          <h3 className="text-[13px] font-semibold text-[#111]">{item.title}</h3>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.7]" dangerouslySetInnerHTML={{ __html: item.detail }} />
                      </div>
                    ))}
                  </div>

                  {/* CSS Org Chart Mockup */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-5">Rattachement hierarchique -- ou se situe le RevOps</p>
                    <div className="flex flex-col items-center gap-0">
                      {/* CEO level */}
                      <div className="px-4 py-2 rounded-lg bg-[#111] text-white text-[10px] font-semibold">CEO / COO</div>
                      <div className="w-[2px] h-5 bg-[#DDD]" />
                      {/* VP level */}
                      <div className="flex items-start gap-0">
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-[2px] bg-[#DDD]" />
                        </div>
                      </div>
                      <div className="flex items-start gap-4 sm:gap-8">
                        <div className="flex flex-col items-center gap-0">
                          <div className="px-3 py-1.5 rounded-lg bg-[#E8E8E8] text-[#666] text-[9px] font-medium text-center">VP Sales</div>
                          <div className="w-[2px] h-4 bg-[#E8E8E8]" />
                          <div className="px-2 py-1 rounded bg-[#F5F5F5] text-[8px] text-[#999]">Sales Team</div>
                        </div>
                        <div className="flex flex-col items-center gap-0">
                          <div className="px-3 py-1.5 rounded-lg border-2 border-[#FF7A59] bg-[#FF7A59]/10 text-[#FF7A59] text-[9px] font-bold text-center">RevOps Manager</div>
                          <div className="w-[2px] h-4 bg-[#FF7A59]/30" />
                          <div className="flex gap-2">
                            <div className="px-2 py-1 rounded bg-[#FF7A59]/10 text-[7px] text-[#FF7A59] font-medium">Processus</div>
                            <div className="px-2 py-1 rounded bg-[#FF7A59]/10 text-[7px] text-[#FF7A59] font-medium">Data</div>
                            <div className="px-2 py-1 rounded bg-[#FF7A59]/10 text-[7px] text-[#FF7A59] font-medium">Outils</div>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-0">
                          <div className="px-3 py-1.5 rounded-lg bg-[#E8E8E8] text-[#666] text-[9px] font-medium text-center">VP Marketing</div>
                          <div className="w-[2px] h-4 bg-[#E8E8E8]" />
                          <div className="px-2 py-1 rounded bg-[#F5F5F5] text-[8px] text-[#999]">Mkt Team</div>
                        </div>
                        <div className="flex flex-col items-center gap-0">
                          <div className="px-3 py-1.5 rounded-lg bg-[#E8E8E8] text-[#666] text-[9px] font-medium text-center">VP CS</div>
                          <div className="w-[2px] h-4 bg-[#E8E8E8]" />
                          <div className="px-2 py-1 rounded bg-[#F5F5F5] text-[8px] text-[#999]">CS Team</div>
                        </div>
                      </div>
                      {/* Dotted lines annotation */}
                      <div className="mt-4 flex items-center gap-2">
                        <div className="w-8 border-t-2 border-dashed border-[#FF7A59]/40" />
                        <span className="text-[8px] text-[#999]">Le RevOps Manager collabore avec toutes les equipes revenue, rattache au CEO/COO ou au CRO</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le rattachement hierarchique varie selon la taille et la maturite de l&apos;entreprise. Dans les startups early-stage (moins de 50 salaries), le RevOps Manager est generalement rattache directement au CEO ou au COO. Dans les scale-ups et ETI, il reporte au CRO (Chief Revenue Officer) quand ce poste existe, ou au VP Sales. Dans les grands groupes, il peut integrer une equipe Revenue Operations plus large avec des specialistes Sales Ops, Marketing Ops et CS Ops sous sa responsabilite.</p>
                    <p>Le point essentiel est que le RevOps Manager doit avoir un mandat transversal et une autorite fonctionnelle sur les processus et les outils des trois equipes revenue. S&apos;il est rattache a une seule equipe sans mandat transversal, il devient de facto un Sales Ops ou un Marketing Ops, et perd la valeur ajoutee centrale du role.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 4 : Competences ===================== */}
              <section id="competences" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les competences requises pour etre RevOps Manager</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le RevOps Manager est un profil hybride qui combine des competences techniques, analytiques et relationnelles. C&apos;est ce qui rend le recrutement si difficile : trouver quelqu&apos;un qui maitrise a la fois le CRM, l&apos;analyse de donnees, l&apos;automatisation et la gestion de projet, tout en etant un excellent communicant capable de travailler avec des profils tres differents (commerciaux, marketeurs, developpeurs, direction). Les candidats qui cochent toutes les cases sont rares, d&apos;ou la tension sur le marche.</p>
                  </div>

                  {/* CSS Skills Radar Mockup */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-4">Radar de competences -- Profil ideal</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { skill: "CRM / Admin", level: 95, color: "#FF7A59" },
                        { skill: "Data / SQL", level: 80, color: "#4B5EFC" },
                        { skill: "Automatisation", level: 85, color: "#22C55E" },
                        { skill: "Analytics", level: 80, color: "#6C5CE7" },
                        { skill: "Process Design", level: 90, color: "#F59E0B" },
                        { skill: "Communication", level: 85, color: "#FF7A59" },
                        { skill: "Gestion de projet", level: 80, color: "#4B5EFC" },
                        { skill: "Business Acumen", level: 75, color: "#22C55E" },
                      ].map((s) => (
                        <div key={s.skill} className="p-3 rounded-lg bg-white border border-[#EAEAEA]">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-semibold text-[#555]">{s.skill}</span>
                            <span className="text-[9px] font-bold" style={{ color: s.color }}>{s.level}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[#F0F0F0]">
                            <div className="h-full rounded-full transition-all" style={{ width: `${s.level}%`, backgroundColor: s.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hard Skills */}
                  <div className="mt-6">
                    <h3 className="text-[14px] font-semibold text-[#111] mb-4">Hard skills</h3>
                    <div className="space-y-3">
                      {[
                        {
                          title: "Maitrise CRM avancee",
                          desc: "HubSpot et/ou Salesforce en administration avancee. Configuration des objets personnalises, workflows complexes, permissions, proprietes calculees. Capacite a architecturer un CRM qui supporte les processus metier, pas l&apos;inverse. La plupart des offres exigent 3 a 5 ans d&apos;experience sur au moins un CRM majeur.",
                          color: "#FF7A59",
                        },
                        {
                          title: "Analyse de donnees et SQL",
                          desc: "Capacite a extraire, transformer et analyser des donnees pour prendre des decisions. SQL courant pour interroger les bases de donnees et construire des rapports avances. Maitrise d&apos;au moins un outil de BI (Looker Studio, Metabase, Tableau). Comprehension des metriques SaaS : MRR, ARR, churn, NRR, CAC, LTV.",
                          color: "#4B5EFC",
                        },
                        {
                          title: "Marketing automation et sequencing",
                          desc: "Configuration et optimisation des workflows d&apos;automation : lead nurturing, lead scoring, lifecycle management, alertes, sequences de prospection. Comprehension des logiques de segmentation, de personnalisation et de timing. Experience avec au moins un outil d&apos;automation (HubSpot, Marketo, Pardot, ActiveCampaign).",
                          color: "#22C55E",
                        },
                        {
                          title: "Integrations et no-code/low-code",
                          desc: "Capacite a connecter les outils entre eux via des plateformes d&apos;integration (Make, Zapier, n8n) ou des APIs natives. Comprehension des concepts d&apos;API, de webhook et de synchronisation de donnees. Le no-code/low-code est devenu indispensable pour prototyper rapidement des solutions sans dependre de l&apos;equipe technique.",
                          color: "#6C5CE7",
                        },
                        {
                          title: "Modelisation de processus",
                          desc: "Capacite a documenter, analyser et optimiser des processus operationnels complexes. Maitrise des notations de process mapping. Experience dans la conduite de projets de transformation : migration CRM, refonte du funnel, deploiement d&apos;outils. Approche structuree et methodique.",
                          color: "#F59E0B",
                        },
                      ].map((item) => (
                        <div key={item.title} className="rounded-lg border border-[#F2F2F2] p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
                            <h4 className="text-[12px] font-semibold text-[#111]">{item.title}</h4>
                          </div>
                          <p className="text-[11px] text-[#777] leading-[1.7]">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Soft Skills */}
                  <div className="mt-6">
                    <h3 className="text-[14px] font-semibold text-[#111] mb-4">Soft skills</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { title: "Communication transversale", desc: "Parler le langage du sales, du marketeur, du dev et du CEO. Vulgariser les sujets techniques. Convaincre sans autorite hierarchique directe.", color: "#FF7A59" },
                        { title: "Gestion de projet", desc: "Mener plusieurs chantiers en parallele (migration CRM, refonte scoring, nouveau dashboard). Prioriser, planifier, livrer dans les delais.", color: "#4B5EFC" },
                        { title: "Esprit analytique", desc: "Raisonner en donnees et en metriques. Identifier les patterns, les anomalies et les opportunites d&apos;optimisation dans les chiffres.", color: "#22C55E" },
                        { title: "Conduite du changement", desc: "Faire adopter de nouveaux outils et processus par des equipes resistantes au changement. Patience, pedagogie et persistence.", color: "#6C5CE7" },
                      ].map((item) => (
                        <div key={item.title} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-[11px] font-semibold text-[#111]">{item.title}</span>
                          </div>
                          <p className="text-[10px] text-[#888] leading-[1.6]" dangerouslySetInnerHTML={{ __html: item.desc }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 5 : Journee type ===================== */}
              <section id="journee-type" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">La journee type d&apos;un RevOps Manager</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Aucune journee ne se ressemble pour un RevOps Manager, mais certaines activites reviennent systematiquement. Voici a quoi ressemble une journee type, de 8h a 18h, pour un RevOps Manager dans une scale-up B2B de 50 a 200 salaries.</p>
                  </div>

                  {/* CSS Timeline Mockup: Day-in-the-life */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-5">Timeline -- Une journee type</p>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-[40px] top-2 bottom-2 w-[2px] bg-[#E8E8E8]" />

                      <div className="space-y-4">
                        {[
                          { time: "8h00", title: "Check dashboards et alertes", desc: "Verification des KPI overnight : deals bloques, leads non traites, anomalies data quality. Revue des alertes Slack automatiques.", color: "#FF7A59", type: "Data" },
                          { time: "8h30", title: "Hygiene CRM et data quality", desc: "Traitement des doublons detectes, correction des donnees manquantes, verification des imports de la veille. 30 minutes par jour pour maintenir la qualite.", color: "#4B5EFC", type: "Data" },
                          { time: "9h00", title: "Daily standup Sales", desc: "Participation au standup commercial. Ecoute des blocages operationnels, des besoins en donnees et des retours sur les outils.", color: "#22C55E", type: "Processus" },
                          { time: "9h30", title: "Travail de fond : workflows et automations", desc: "Bloc de deep work pour configurer de nouveaux workflows, optimiser les existants, deployer des automatisations. Pas de reunions.", color: "#6C5CE7", type: "Tech" },
                          { time: "11h00", title: "Sync Marketing", desc: "Point hebdomadaire avec le marketing sur les campagnes en cours, le scoring, la qualite des MQLs et les retours des commerciaux.", color: "#FF7A59", type: "Processus" },
                          { time: "12h00", title: "Dejeuner", desc: "", color: "#E8E8E8", type: "" },
                          { time: "13h00", title: "Reporting et dashboards", desc: "Construction ou mise a jour des dashboards. Preparation des chiffres pour le weekly revenue review. Analyse des tendances pipeline.", color: "#4B5EFC", type: "Data" },
                          { time: "14h30", title: "Projet transverse", desc: "Avancement sur un projet en cours : migration CRM, deploiement d&apos;un nouvel outil, refonte du lead scoring, optimisation du funnel.", color: "#22C55E", type: "Tech" },
                          { time: "16h00", title: "Support equipes et formation", desc: "Reponse aux questions des commerciaux et marketeurs. Mini-session de formation sur une fonctionnalite CRM. Resolution de tickets outils.", color: "#6C5CE7", type: "Enablement" },
                          { time: "17h00", title: "Documentation et planification", desc: "Mise a jour des playbooks, documentation des changements du jour, planification des taches du lendemain.", color: "#F59E0B", type: "Processus" },
                          { time: "17h30", title: "Veille techno et communaute", desc: "Lecture des nouveautes outils, participation aux communautes RevOps (Slack, LinkedIn), benchmark des meilleures pratiques.", color: "#FF7A59", type: "Veille" },
                        ].map((item) => (
                          <div key={item.time} className="relative pl-[70px]">
                            {/* Time label */}
                            <div className="absolute left-0 top-0 w-[35px] text-right">
                              <span className="text-[10px] font-bold text-[#999]">{item.time}</span>
                            </div>
                            {/* Timeline dot */}
                            <div className="absolute left-[35px] top-1 w-[12px] h-[12px] rounded-full border-2 bg-white" style={{ borderColor: item.color }}>
                              <div className="absolute inset-[3px] rounded-full" style={{ backgroundColor: item.color }} />
                            </div>

                            <div className="pb-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[11px] font-semibold text-[#111]">{item.title}</span>
                                {item.type && <span className="text-[8px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${item.color}15`, color: item.color }}>{item.type}</span>}
                              </div>
                              {item.desc && <p className="text-[10px] text-[#888] leading-[1.5]" dangerouslySetInnerHTML={{ __html: item.desc }} />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Cette journee type revele une realite importante : le RevOps Manager partage son temps entre des activites reactives (support, resolution de problemes, reunions) et des activites proactives (automatisation, optimisation, documentation). Les meilleurs RevOps Managers protegent leur temps de deep work pour eviter d&apos;etre entierement absorbes par le support quotidien. La regle des 60/40 est un bon objectif : 60% de travail proactif et strategique, 40% de support reactif et operationnel.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 6 : Outils ===================== */}
              <section id="outils" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les outils du RevOps Manager</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La stack technologique du RevOps Manager est vaste. Il n&apos;a pas besoin de maitriser chaque outil au niveau expert, mais il doit avoir une comprehension fonctionnelle de l&apos;ecosysteme et une expertise approfondie sur 3 a 4 outils cles. Voici les categories d&apos;outils et les solutions les plus courantes en 2026.</p>
                  </div>

                  {/* Tool cards grid */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { outil: "HubSpot", categorie: "CRM & Marketing Automation", desc: "La plateforme all-in-one la plus populaire en France pour les PME et scale-ups B2B. CRM, marketing automation, sales tools, service hub. L&apos;outil de reference du RevOps Manager pour les entreprises de 10 a 500 salaries.", color: "#FF7A59", essential: true },
                      { outil: "Salesforce", categorie: "CRM Enterprise", desc: "Le leader mondial du CRM pour les entreprises de plus grande taille. Ecosysteme d&apos;integrations massif. Plus complexe a administrer que HubSpot mais plus flexible pour les configurations tres specifiques.", color: "#00A1E0", essential: true },
                      { outil: "Clay", categorie: "Enrichissement & Data", desc: "Plateforme d&apos;enrichissement de donnees et de workflow no-code. Permet d&apos;enrichir les contacts et companies depuis plus de 75 sources. Incontournable pour maintenir la qualite des donnees CRM.", color: "#111", essential: false },
                      { outil: "Make (ex-Integromat)", categorie: "Integration & Automation", desc: "Plateforme d&apos;integration no-code pour connecter les outils entre eux. Scenarios complexes multi-etapes. Plus puissant que Zapier pour les workflows avances. L&apos;outil d&apos;orchestration prefere des RevOps.", color: "#6D25BA", essential: true },
                      { outil: "Looker Studio", categorie: "BI & Reporting", desc: "Outil de business intelligence de Google, gratuit et connecte a de multiples sources. Dashboards personnalises, rapports partageables. Ideal pour le reporting executive et les vues consolidees.", color: "#4285F4", essential: false },
                      { outil: "Notion", categorie: "Documentation & Wiki", desc: "Base de connaissances pour la documentation des processus, playbooks, SOP et wikis internes. Espace collaboratif ou toutes les equipes retrouvent les regles operationnelles et les templates.", color: "#111", essential: false },
                      { outil: "Slack", categorie: "Communication & Alertes", desc: "Canal de communication principal pour les alertes automatiques (nouveaux MQLs, deals bloques, data quality issues). Integrations CRM pour les notifications en temps reel aux equipes revenue.", color: "#4A154B", essential: true },
                      { outil: "Gong / Modjo", categorie: "Revenue Intelligence", desc: "Plateformes d&apos;analyse conversationnelle pour les appels commerciaux. Insights sur les objections, les patterns de vente gagnants et la performance individuelle. Donnees complementaires au CRM.", color: "#7B4FCF", essential: false },
                    ].map((item) => (
                      <div key={item.outil} className="p-4 rounded-lg border-2 bg-white" style={{ borderColor: `${item.color}30` }}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold" style={{ color: item.color }}>{item.outil}</span>
                            {item.essential && <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-[#FF7A59]/10 text-[#FF7A59] font-bold uppercase">Essentiel</span>}
                          </div>
                          <span className="text-[8px] text-[#BBB] font-medium">{item.categorie}</span>
                        </div>
                        <p className="text-[10px] text-[#666] leading-[1.6]" dangerouslySetInnerHTML={{ __html: item.desc }} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un point important : le RevOps Manager ne doit pas tomber dans le piege de l&apos;outil miracle. La stack ideale est la plus simple possible. Chaque outil ajoute est une integration a maintenir, une source de donnees a synchroniser et une formation a dispenser. Avant d&apos;ajouter un outil, le RevOps Manager doit toujours se demander : est-ce que le CRM existant ne peut pas couvrir ce besoin ? La reponse est souvent oui, a condition de bien configurer l&apos;outil en place.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 7 : Salaire ===================== */}
              <section id="salaire" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Salaire du RevOps Manager en France en 2026</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le salaire du RevOps Manager en France varie significativement selon quatre facteurs : le niveau d&apos;experience, la localisation geographique (Paris vs regions), la taille de l&apos;entreprise (startup vs corporate) et la stack technologique maitrisee. Voici les fourchettes observees sur le marche en mars 2026, basees sur notre analyse des offres LinkedIn, Welcome to the Jungle, et les remontees de notre reseau de candidats et clients.</p>
                  </div>

                  {/* CSS Salary Bar Chart Mockup */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Salaire brut annuel par niveau d&apos;experience -- Paris</p>
                    <p className="text-[9px] text-[#BBB] mb-5">En milliers d&apos;euros, package fixe + variable</p>
                    <div className="space-y-4">
                      {[
                        { level: "Junior (0-2 ans)", min: 38, max: 48, median: 42, color: "#4B5EFC" },
                        { level: "Confirme (2-5 ans)", min: 48, max: 65, median: 55, color: "#22C55E" },
                        { level: "Senior (5-8 ans)", min: 62, max: 82, median: 72, color: "#FF7A59" },
                        { level: "Head of (8+ ans)", min: 78, max: 110, median: 95, color: "#6C5CE7" },
                      ].map((item) => (
                        <div key={item.level}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-semibold text-[#555]">{item.level}</span>
                            <span className="text-[10px] font-bold" style={{ color: item.color }}>{item.min}K - {item.max}K</span>
                          </div>
                          <div className="relative h-6 rounded-lg bg-[#E8E8E8]/50">
                            {/* Range bar */}
                            <div
                              className="absolute top-0 h-full rounded-lg opacity-25"
                              style={{
                                left: `${(item.min / 120) * 100}%`,
                                width: `${((item.max - item.min) / 120) * 100}%`,
                                backgroundColor: item.color,
                              }}
                            />
                            {/* Median marker */}
                            <div
                              className="absolute top-0 h-full w-1 rounded-full"
                              style={{
                                left: `${(item.median / 120) * 100}%`,
                                backgroundColor: item.color,
                              }}
                            />
                            {/* Median label */}
                            <div
                              className="absolute -top-3.5 text-[8px] font-bold"
                              style={{
                                left: `${(item.median / 120) * 100}%`,
                                color: item.color,
                                transform: "translateX(-50%)",
                              }}
                            >
                              {item.median}K
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* Scale */}
                      <div className="flex justify-between text-[8px] text-[#CCC] mt-1">
                        <span>0K</span><span>30K</span><span>60K</span><span>90K</span><span>120K</span>
                      </div>
                    </div>
                  </div>

                  {/* Paris vs Regions comparison */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg bg-white border border-[#F0F0F0]">
                      <p className="text-[11px] font-semibold text-[#FF7A59] mb-3">Paris / Ile-de-France</p>
                      <div className="space-y-2">
                        {[
                          { level: "Junior", range: "38K - 48K" },
                          { level: "Confirme", range: "48K - 65K" },
                          { level: "Senior", range: "62K - 82K" },
                          { level: "Head of RevOps", range: "78K - 110K" },
                        ].map((item) => (
                          <div key={item.level} className="flex items-center justify-between text-[10px]">
                            <span className="text-[#666]">{item.level}</span>
                            <span className="font-semibold text-[#111]">{item.range}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-white border border-[#F0F0F0]">
                      <p className="text-[11px] font-semibold text-[#4B5EFC] mb-3">Regions (Lyon, Nantes, Bordeaux, Toulouse)</p>
                      <div className="space-y-2">
                        {[
                          { level: "Junior", range: "34K - 42K" },
                          { level: "Confirme", range: "42K - 55K" },
                          { level: "Senior", range: "52K - 70K" },
                          { level: "Head of RevOps", range: "65K - 90K" },
                        ].map((item) => (
                          <div key={item.level} className="flex items-center justify-between text-[10px]">
                            <span className="text-[#666]">{item.level}</span>
                            <span className="font-semibold text-[#111]">{item.range}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Startup vs Corporate */}
                  <div className="mt-5 rounded-lg border border-[#F0F0F0] p-4">
                    <p className="text-[11px] font-semibold text-[#111] mb-3">Startup / Scale-up vs Grand Groupe</p>
                    <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                      <p className="text-[11px] text-[#777] leading-[1.7]">Les startups et scale-ups proposent generalement un package fixe plus bas de 10 a 15% par rapport aux grands groupes, mais compensent avec des BSPCE (stock-options) et une autonomie plus grande. Un RevOps Manager confirme dans une scale-up parisienne gagnera typiquement 50K-60K fixe + BSPCE, contre 55K-70K fixe dans un grand groupe sans equity. Les scales-ups leves en Serie B+ commencent a s&apos;aligner sur les salaires corporate pour attirer les meilleurs profils.</p>
                      <p className="text-[11px] text-[#777] leading-[1.7]">Le variable est rare dans les postes RevOps en France (contrairement aux US ou 10-20% de variable est courant). Quand il existe, il est generalement indexe sur des KPIs operationnels : adoption CRM, data quality score, respect des SLA, plutot que sur le chiffre d&apos;affaires directement.</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un facteur souvent sous-estime dans la remuneration est la certification. Un RevOps Manager certifie HubSpot Solutions Architect ou Salesforce Administrator gagne en moyenne 8 a 12% de plus qu&apos;un profil equivalent sans certification. Les certifications avancees (HubSpot Revenue Operations, Salesforce Revenue Cloud) sont encore plus valorisees car elles attestent d&apos;une expertise specifique au domaine RevOps.</p>
                    <p>Enfin, le marche est clairement en faveur des candidats en 2026. La demande depasse largement l&apos;offre, surtout pour les profils seniors. Les entreprises qui tardent dans leur processus de recrutement perdent regulierement leurs candidats au profit de concurrents plus rapides. Le delai moyen de recrutement d&apos;un RevOps Manager en France est de 3 a 4 mois, contre 6 a 8 semaines pour un poste commercial classique.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 8 : Parcours ===================== */}
              <section id="parcours" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Le parcours type pour devenir RevOps Manager</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Il n&apos;existe pas de formation academique &ldquo;Revenue Operations&rdquo; en France en 2026. Le RevOps Manager est un role emergent, et les profils qui l&apos;occupent viennent de parcours varies. C&apos;est a la fois une difficulte pour les recruteurs (les CV ne correspondent jamais exactement a la fiche de poste) et une opportunite pour les candidats (de nombreux profils peuvent pivoter vers le RevOps). Voici les quatre parcours les plus courants.</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    {[
                      {
                        origine: "Sales Operations",
                        pct: "35%",
                        desc: "Le chemin le plus courant. Le Sales Ops maitrise deja le CRM, les processus de vente, le reporting pipeline et le forecasting. Il doit elargir son perimetre au marketing automation, a la donnee client post-vente et a la vision end-to-end du revenu. Transition naturelle qui necessite principalement d&apos;acquerir des competences marketing et customer success.",
                        forces: ["CRM avance", "Pipeline management", "Forecasting"],
                        gaps: ["Marketing automation", "Vision customer lifecycle", "Data engineering"],
                        color: "#FF7A59",
                      },
                      {
                        origine: "Marketing Operations",
                        pct: "25%",
                        desc: "Le Marketing Ops connait l&apos;automation, le lead scoring, la segmentation et l&apos;attribution. Il doit acquerir une comprehension approfondie des processus commerciaux et du cycle de vente. La transition demande de passer du temps avec les equipes sales pour comprendre leur quotidien et leurs metriques.",
                        forces: ["Automation", "Lead scoring", "Attribution"],
                        gaps: ["Processus sales", "Forecasting", "Negociation de SLA"],
                        color: "#4B5EFC",
                      },
                      {
                        origine: "Business Analyst / Data Analyst",
                        pct: "20%",
                        desc: "Le Business Analyst apporte une expertise data forte : SQL, BI, modelisation. Il doit developper sa connaissance des outils CRM et des processus operationnels. Transition tres pertinente car la data est au coeur du RevOps, mais il faut acquerir la dimension &ldquo;builder&rdquo; (configurer des outils, pas seulement analyser des donnees).",
                        forces: ["SQL et data", "BI et dashboards", "Analyse quantitative"],
                        gaps: ["Administration CRM", "Process design", "Change management"],
                        color: "#22C55E",
                      },
                      {
                        origine: "Growth / Growth Hacker",
                        pct: "20%",
                        desc: "Le profil Growth apporte une mentalite d&apos;experimentation, une connaissance des outils no-code et une vision full-funnel. Il doit structurer son approche (le RevOps est plus systematique que le growth hacking) et approfondir sa maitrise du CRM et des processus scalables. Transition frequente dans les startups ou le growth evolue naturellement vers le RevOps.",
                        forces: ["Experimentation", "No-code / automation", "Vision full-funnel"],
                        gaps: ["Rigueur processus", "CRM avance", "Governance data"],
                        color: "#6C5CE7",
                      },
                    ].map((item) => (
                      <div key={item.origine} className="rounded-lg border border-[#F2F2F2] p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                            <h3 className="text-[13px] font-semibold text-[#111]">{item.origine}</h3>
                          </div>
                          <span className="text-[11px] font-bold" style={{ color: item.color }}>{item.pct} des RevOps</span>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.7] mb-3" dangerouslySetInnerHTML={{ __html: item.desc }} />
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-[9px] font-semibold text-[#22C55E] mb-1.5 uppercase tracking-wide">Forces</p>
                            <div className="space-y-1">
                              {item.forces.map((f) => (
                                <div key={f} className="flex items-center gap-1.5 text-[9px] text-[#888]">
                                  <div className="w-1 h-1 rounded-full bg-[#22C55E]" />
                                  {f}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[9px] font-semibold text-[#FF7A59] mb-1.5 uppercase tracking-wide">A developper</p>
                            <div className="space-y-1">
                              {item.gaps.map((g) => (
                                <div key={g} className="flex items-center gap-1.5 text-[9px] text-[#888]">
                                  <div className="w-1 h-1 rounded-full bg-[#FF7A59]" />
                                  {g}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Quel que soit le parcours d&apos;origine, la transition vers le RevOps prend typiquement 6 a 18 mois. Les candidats les plus efficaces sont ceux qui cumulent une experience operationnelle dans au moins deux des trois piliers (Sales Ops, Marketing Ops, CS Ops) et qui ont travaille dans un environnement B2B SaaS ou le concept de revenu recurrent est central. La certification HubSpot Revenue Operations ou le RevOps certification de Pavilion sont des accelerateurs utiles pour valider les competences et credibiliser le profil.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 9 : Recruter un RevOps ===================== */}
              <section id="recruter" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Comment recruter un RevOps Manager</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Recruter un RevOps Manager est l&apos;un des recrutements les plus difficiles en 2026 pour les entreprises B2B en France. Le vivier de candidats est restreint, la concurrence est forte et les profils senior sont sollicites en permanence. Voici une approche structuree pour maximiser vos chances de trouver le bon profil.</p>
                    <p>Commencez par definir precisement le scope du poste. Le RevOps Manager peut couvrir un spectre tres large de responsabilites. Si vous attendez un profil qui gere le CRM, construit les dashboards, configure les automatisations, forme les equipes, pilote la data quality et fait le forecasting, vous cherchez une licorne. Priorisez 3 a 4 missions critiques et soyez transparent dans l&apos;offre d&apos;emploi.</p>
                    <p>Sourcez sur les bons canaux. LinkedIn est le canal principal (filtrez par &ldquo;Sales Operations&rdquo;, &ldquo;Marketing Operations&rdquo;, &ldquo;Revenue Operations&rdquo;, &ldquo;Business Operations&rdquo;). Les communautes Slack RevOps France et RevOps Co-op sont des sources qualifiees. Welcome to the Jungle fonctionne bien pour les startups et scale-ups. Le bouche-a-oreille via votre reseau est souvent le canal le plus efficace pour les profils seniors.</p>
                  </div>

                  {/* Interview questions */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-4">10 questions d&apos;entretien pour evaluer un RevOps Manager</p>
                    <div className="space-y-2.5">
                      {[
                        { q: "Decrivez un processus lead-to-close que vous avez concu de A a Z. Quels etaient les resultats mesurables ?", cat: "Process", color: "#FF7A59" },
                        { q: "Comment structureriez-vous notre CRM si vous deviez repartir de zero ? Quels objets, quelles proprietes, quelles automatisations ?", cat: "CRM", color: "#4B5EFC" },
                        { q: "Quel est votre workflow de data quality au quotidien ? Comment maintenez-vous un CRM propre a l&apos;echelle ?", cat: "Data", color: "#22C55E" },
                        { q: "Comment definiriez-vous un MQL, un SQL et une Opportunity pour notre type de business ? Justifiez vos criteres.", cat: "Process", color: "#FF7A59" },
                        { q: "Vous constatez que 40% des MQLs ne sont pas suivis par les commerciaux dans les 48h. Que faites-vous ?", cat: "Problem Solving", color: "#6C5CE7" },
                        { q: "Montrez-moi un dashboard que vous avez construit. Expliquez le choix des metriques et comment il est utilise.", cat: "Data", color: "#22C55E" },
                        { q: "Comment gerez-vous la resistance au changement quand vous deployez un nouveau processus dans le CRM ?", cat: "Soft Skill", color: "#F59E0B" },
                        { q: "Ecrivez une requete SQL pour extraire le taux de conversion par source et par trimestre sur les 12 derniers mois.", cat: "Technique", color: "#4B5EFC" },
                        { q: "Decrivez une integration complexe que vous avez mise en place entre deux outils. Quels etaient les pieges ?", cat: "Tech", color: "#6C5CE7" },
                        { q: "Si vous aviez un budget de 50K pour des outils, comment le repartiriez-vous pour maximiser l&apos;impact RevOps ?", cat: "Strategie", color: "#FF7A59" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#EAEAEA]">
                          <span className="text-[10px] font-bold text-[#CCC] mt-0.5 shrink-0 w-4">{idx + 1}.</span>
                          <div className="flex-1">
                            <p className="text-[11px] text-[#555] leading-[1.6]" dangerouslySetInnerHTML={{ __html: item.q }} />
                          </div>
                          <span className="text-[8px] px-1.5 py-0.5 rounded-full font-medium shrink-0" style={{ backgroundColor: `${item.color}15`, color: item.color }}>{item.cat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Red flags */}
                  <div className="mt-5 rounded-lg border border-[#FF7A59]/20 bg-[#FF7A59]/5 p-5">
                    <p className="text-[12px] font-semibold text-[#FF7A59] mb-3">Red flags en entretien</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Ne mentionne jamais les metriques ou les resultats de ses actions precedentes",
                        "Confond RevOps avec administration CRM basique (ne voit que l&apos;outil, pas le processus)",
                        "N&apos;a jamais travaille avec les equipes sales ou marketing directement",
                        "Ne pose aucune question sur votre stack actuelle, vos processus ou vos objectifs business",
                        "Propose des solutions generiques sans chercher a comprendre votre contexte specifique",
                        "N&apos;a aucune opinion sur les bonnes pratiques de data quality ou de process design",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-[10px] text-[#888]">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#FF7A59]"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                          <span dangerouslySetInnerHTML={{ __html: item }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 10 : Externaliser le RevOps ===================== */}
              <section id="externaliser" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">L&apos;alternative : externaliser le RevOps a une agence</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Recruter un RevOps Manager en interne n&apos;est pas toujours la bonne option. Le recrutement prend 3 a 4 mois, le salaire annuel charges se situe entre 55K et 130K selon le profil, et il faut du temps pour que la personne soit productive (onboarding de 2 a 3 mois en moyenne). Pour les entreprises de 10 a 100 salaries qui n&apos;ont pas encore de fonction RevOps structuree, l&apos;externalisation a une agence specialisee est souvent la meilleure option pour demarrer.</p>
                    <p>Le modele &ldquo;RevOps Part-Time&rdquo; ou &ldquo;Fractional RevOps&rdquo; consiste a confier tout ou partie des missions RevOps a une agence qui intervient de maniere recurrente (typiquement 2 a 4 jours par semaine). L&apos;agence apporte l&apos;expertise, les frameworks eprouves et la capacite d&apos;execution immediate. L&apos;entreprise beneficie d&apos;un RevOps Manager senior sans le cout et le risque d&apos;un recrutement permanent.</p>
                  </div>

                  {/* Comparison table */}
                  <div className="mt-6 rounded-lg border border-[#F0F0F0] overflow-hidden">
                    <div className="grid grid-cols-3">
                      {/* Header */}
                      <div className="p-3 bg-[#FAFAFA] border-b border-r border-[#F0F0F0]">
                        <span className="text-[10px] font-semibold text-[#999]">Critere</span>
                      </div>
                      <div className="p-3 bg-[#FAFAFA] border-b border-r border-[#F0F0F0] text-center">
                        <span className="text-[10px] font-semibold text-[#4B5EFC]">Recrutement interne</span>
                      </div>
                      <div className="p-3 bg-[#FF7A59]/5 border-b border-[#F0F0F0] text-center">
                        <span className="text-[10px] font-semibold text-[#FF7A59]">Ceres RevOps Part-Time</span>
                      </div>

                      {/* Rows */}
                      {[
                        { critere: "Cout annuel", interne: "65K - 130K charges", externe: "36K - 72K HT", winner: "externe" },
                        { critere: "Delai de demarrage", interne: "3-6 mois (recrutement + onboarding)", externe: "2-3 semaines", winner: "externe" },
                        { critere: "Niveau d&apos;expertise", interne: "Depend du profil recrute", externe: "Senior, multi-clients, multi-stacks", winner: "externe" },
                        { critere: "Flexibilite", interne: "CDI, engagement long terme", externe: "Ajustable mois par mois", winner: "externe" },
                        { critere: "Connaissance interne", interne: "Immersion totale, contexte permanent", externe: "Vision externe, moins de contexte", winner: "interne" },
                        { critere: "Disponibilite", interne: "Full-time, 100% dedie", externe: "2-4 jours/semaine", winner: "interne" },
                        { critere: "Risque", interne: "Depart, erreur de casting, formation", externe: "Pas d&apos;engagement long terme", winner: "externe" },
                        { critere: "Scalabilite", interne: "Recruter plus de profils", externe: "Equipe elargie sans recrutement", winner: "externe" },
                      ].map((row, idx) => (
                        <div key={idx} className="contents">
                          <div className="p-3 border-b border-r border-[#F0F0F0] flex items-center">
                            <span className="text-[10px] font-medium text-[#555]" dangerouslySetInnerHTML={{ __html: row.critere }} />
                          </div>
                          <div className={`p-3 border-b border-r border-[#F0F0F0] text-center ${row.winner === "interne" ? "bg-[#4B5EFC]/5" : ""}`}>
                            <span className="text-[10px] text-[#777]" dangerouslySetInnerHTML={{ __html: row.interne }} />
                          </div>
                          <div className={`p-3 border-b border-[#F0F0F0] text-center ${row.winner === "externe" ? "bg-[#FF7A59]/5" : ""}`}>
                            <span className="text-[10px] text-[#777]" dangerouslySetInnerHTML={{ __html: row.externe }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le scenario le plus courant est de commencer par externaliser le RevOps pour poser les fondations (processus, CRM, reporting, automations), puis de recruter un RevOps Manager interne une fois que le perimetre est clarifie et que l&apos;entreprise a une meilleure idee du profil dont elle a besoin. L&apos;agence peut alors accompagner la transition, former le nouveau RevOps Manager et rester disponible en support pour les projets ponctuels ou les pics d&apos;activite.</p>
                    <p>L&apos;externalisation est particulierement pertinente dans trois cas : les entreprises en phase de structuration (passage de 10 a 50 salaries) qui n&apos;ont pas encore de fonction operations, les entreprises qui ont recrute un RevOps junior et ont besoin d&apos;un senior pour le mentorer et structurer le perimetre, et les entreprises qui ont un projet ponctuel (migration CRM, refonte du funnel) qui necessite une expertise qu&apos;elles ne possedent pas en interne.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 11 : Vision Ceres (dark) ===================== */}
              <section id="vision-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Notre vision</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Notre vision du RevOps chez Ceres</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Chez Ceres, nous sommes convaincus que le RevOps n&apos;est pas un luxe reserve aux scale-ups financees. C&apos;est une necessite pour toute entreprise B2B qui veut croitre de maniere structuree et previsible. Le probleme, c&apos;est que la plupart des PME et ETI n&apos;ont ni le budget ni le temps de recruter un RevOps Manager senior. C&apos;est pour cela que nous avons cree le modele Ceres RevOps Part-Time.</p>
                    <p>Notre equipe intervient chez nos clients comme un RevOps Manager integre, mais avec les avantages d&apos;une agence : expertise senior, frameworks eprouves sur des dizaines de deployments, connaissance approfondie de l&apos;ecosysteme HubSpot, et capacite a livrer des resultats rapidement. Nous ne vendons pas du conseil. Nous executons. Nous mettons les mains dans le CRM, nous construisons les dashboards, nous configurons les automatisations, nous formons les equipes.</p>
                    <p>Chaque engagement commence par un audit complet de votre maturite operationnelle. Nous evaluons vos processus, votre stack technologique, la qualite de vos donnees et l&apos;alignement de vos equipes. Cet audit produit un plan d&apos;action priorise avec des quick wins a 30 jours et une roadmap a 6 mois. Ensuite, nous deroulons le plan, semaine apres semaine, avec un reporting mensuel sur les KPI d&apos;impact.</p>
                    <p>Nos clients constatent en moyenne une amelioration de 30% de leur pipeline velocity et une reduction de 25% du temps passe par les equipes sur les taches administratives dans les 3 premiers mois. Le RevOps n&apos;est pas un centre de cout. C&apos;est un multiplicateur de revenu. Et c&apos;est exactement ce que nous delivrons chez Ceres.</p>
                  </div>

                  {/* Results stats */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "+30%", label: "de pipeline velocity en moyenne", color: "#FF7A59" },
                      { value: "-25%", label: "de temps sur les taches admin", color: "#4B5EFC" },
                      { value: "2 sem.", label: "pour demarrer l&apos;accompagnement", color: "#22C55E" },
                      { value: "40+", label: "entreprises B2B accompagnees", color: "#6C5CE7" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-[20px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-[10px] text-white/40 mt-1 leading-[1.4]" dangerouslySetInnerHTML={{ __html: stat.label }} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {[
                      "Audit complet de votre maturite RevOps (processus, outils, data, equipes)",
                      "Plan d&apos;action priorise avec quick wins a 30 jours",
                      "Configuration et optimisation CRM (HubSpot, Salesforce)",
                      "Construction de dashboards operationnels et strategiques",
                      "Automatisation des workflows et integrations inter-outils",
                      "Lead scoring, lifecycle management, SLA inter-equipes",
                      "Formation et enablement des equipes revenue",
                      "Reporting mensuel sur les KPI d&apos;impact",
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
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;un RevOps Manager sans recruter ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">Ceres vous apporte l&apos;expertise d&apos;un RevOps Manager senior, en part-time, pour une fraction du cout d&apos;un recrutement. Audit, CRM, dashboards, automations, formation. Premiers resultats en 30 jours.</p>
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
