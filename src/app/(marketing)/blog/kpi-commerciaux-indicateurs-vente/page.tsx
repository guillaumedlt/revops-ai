"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "KPI commerciaux : les 25 indicateurs de vente a suivre en 2026",
  description: "Guide complet des 25 KPI commerciaux essentiels en 2026. Pour chaque indicateur : definition, formule de calcul, benchmark marche et configuration dans HubSpot. Pipeline, activite, revenue, productivite et qualite.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-16",
  dateModified: "2026-03-16",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/kpi-commerciaux-indicateurs-vente" },
  articleSection: "Data & Reporting",
  wordCount: 3500,
  inLanguage: "fr",
};

const sections = [
  { id: "pourquoi-kpi", title: "Pourquoi suivre des KPI" },
  { id: "kpi-pipeline", title: "KPIs Pipeline" },
  { id: "kpi-activite", title: "KPIs Activite" },
  { id: "kpi-revenue", title: "KPIs Revenue" },
  { id: "kpi-productivite", title: "KPIs Productivite" },
  { id: "kpi-qualite", title: "KPIs Qualite" },
  { id: "dashboard-mockup", title: "Dashboard ideal" },
  { id: "tracker-hubspot", title: "Tracker dans HubSpot" },
  { id: "kpi-par-stade", title: "KPIs selon votre stade" },
  { id: "setup-ceres", title: "Notre dashboard chez Ceres" },
];

const relatedArticles = [
  { title: "Comment gerer votre MRR dans HubSpot : le guide complet", slug: "gerer-mrr-revenu-recurrent-hubspot", category: "Data & Reporting", color: "#22C55E" },
  { title: "9 actions commerciales a automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "Automatisation", color: "#FF7A59" },
  { title: "CRM pour PME en 2026 : le guide pour bien choisir", slug: "crm-pme-2026", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function KpiCommerciauxArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("pourquoi-kpi");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "4%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "14%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "28%", width: 260, height: 260, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "42%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "56%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "70%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "85%", width: 240, height: 240, borderRadius: "50%", background: "#22C55E", opacity: 0.06, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet?text=KPI%20commerciaux%20%3A%20les%2025%20indicateurs%20de%20vente%20a%20suivre%20en%202026&url=https://www.ceres-revops.com/blog/kpi-commerciaux-indicateurs-vente" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/kpi-commerciaux-indicateurs-vente" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">KPI commerciaux</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>Data &amp; Reporting</Badge>
                <span className="text-[11px] text-[#CCC]">16 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                KPI commerciaux : les 25 indicateurs de vente a suivre en 2026
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Taux de conversion, pipeline velocity, CAC, NRR, forecast accuracy. Les equipes commerciales performantes ne pilotent pas au feeling. Elles mesurent. Ce guide detaille les 25 KPI commerciaux essentiels, organises par categorie, avec pour chacun la formule de calcul, les benchmarks du marche et la methode pour les tracker dans HubSpot. Un referentiel complet pour construire votre systeme de pilotage commercial.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>16 mars 2026</span>
              </div>

              {/* Quick KPI overview */}
              <div className="mt-8 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                <span className="text-[13px] font-semibold text-[#111] mb-4 block">Ce que vous allez decouvrir</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: "KPIs Pipeline", value: "6", color: "#22C55E" },
                    { label: "KPIs Activite", value: "5", color: "#4B5EFC" },
                    { label: "KPIs Revenue", value: "5", color: "#6C5CE7" },
                    { label: "KPIs Productivite", value: "5", color: "#FF7A59" },
                    { label: "KPIs Qualite", value: "4", color: "#F59E0B" },
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
              {/* ===================== SECTION 1 : Pourquoi suivre des KPI ===================== */}
              <section id="pourquoi-kpi" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi suivre des KPI commerciaux en 2026</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>En 2024, Gartner estimait que 72% des equipes commerciales B2B utilisaient moins de 5 indicateurs pour piloter leur activite. Deux ans plus tard, le constat n&apos;a pas fondamentalement change. La majorite des equipes de vente se contentent de suivre le chiffre d&apos;affaires signe et le nombre de deals en cours. C&apos;est insuffisant.</p>
                    <p>Le probleme n&apos;est pas un manque de donnees. Les CRM modernes comme HubSpot collectent des centaines de datapoints sur chaque interaction, chaque deal, chaque contact. Le probleme est un manque de structure. Sans un cadre clair de KPI, les equipes ne savent pas ou regarder, quoi optimiser, ni comment mesurer l&apos;impact de leurs actions.</p>
                    <p>Un systeme de KPI bien concu permet trois choses :</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        title: "Diagnostiquer les problemes avant qu&apos;ils ne deviennent critiques",
                        detail: "Un pipeline coverage ratio qui descend sous 3x est un signal d&apos;alerte. Si vous ne le mesurez pas, vous ne le voyez qu&apos;au moment ou les quotas ne sont plus atteints, c&apos;est-a-dire trop tard.",
                        color: "#22C55E",
                      },
                      {
                        title: "Comparer les performances de maniere objective",
                        detail: "Sans KPI standardises, les reviews commerciales se transforment en debats subjectifs. Avec des metriques claires, chaque rep sait ou il se situe par rapport a l&apos;equipe et aux benchmarks.",
                        color: "#4B5EFC",
                      },
                      {
                        title: "Prendre des decisions basees sur des faits",
                        detail: "Faut-il recruter un nouveau commercial ou ameliorer le taux de conversion ? La reponse depend de vos KPI de productivite et de pipeline, pas d&apos;une intuition.",
                        color: "#6C5CE7",
                      },
                    ].map((item) => (
                      <div key={item.title} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
                          <h3 className="text-[13px] font-semibold text-[#111]" dangerouslySetInnerHTML={{ __html: item.title }} />
                        </div>
                        <p className="text-[12px] text-[#666] leading-[1.7]" dangerouslySetInnerHTML={{ __html: item.detail }} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le passage a une culture data-driven ne se fait pas du jour au lendemain. On ne vous demande pas de tracker 25 KPI des demain. L&apos;objectif de cet article est de vous donner le referentiel complet. A vous de selectionner les 8 a 12 indicateurs qui correspondent a votre stade de croissance et a vos priorites.</p>
                    <p>Chaque KPI presente dans ce guide suit le meme format : une definition claire, la formule de calcul, un benchmark marche pour le B2B SaaS, et la methode pour le configurer et le suivre dans HubSpot. Pas de theorie abstraite, que du concret.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 2 : KPIs Pipeline ===================== */}
              <section id="kpi-pipeline" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#22C55E]" />
                    <span className="text-[11px] font-semibold text-[#22C55E] uppercase tracking-wider">Categorie 1 / 5</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">KPIs Pipeline (6 indicateurs)</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Le pipeline est le systeme nerveux de votre equipe commerciale. Ces 6 indicateurs vous disent si votre machine de vente a suffisamment de carburant, a la bonne vitesse, et avec le bon taux de transformation.</p>

                  <div className="space-y-5">
                    {/* KPI 1 — Volume Pipeline */}
                    <div className="rounded-lg border border-[#E8F5E9] bg-[#F6FBF6] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#22C55E] w-5 h-5 rounded-md flex items-center justify-center">1</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Volume de pipeline</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E]">Essentiel</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Valeur totale des deals ouverts dans votre pipeline a un instant T. C&apos;est l&apos;indicateur le plus basique mais aussi le plus fondamental. Un pipeline vide signifie zero closing dans les semaines a venir, quelle que soit la qualite de votre equipe.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">Volume Pipeline = SUM(montant de tous les deals ouverts)</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <div><span className="text-[#999]">Benchmark B2B SaaS :</span> <strong className="text-[#111]">3x a 5x le quota mensuel</strong></div>
                      </div>
                      <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Dans HubSpot</span>
                        <p className="text-[11px] text-[#666] mt-1 leading-[1.6]">Rapport standard &ldquo;Deal revenue forecast&rdquo; ou rapport personnalise avec filtre Deal Stage != Closed Won / Closed Lost. Agregation par montant total. Segmentez par pipeline si vous en avez plusieurs (new business vs renewal).</p>
                      </div>
                    </div>

                    {/* KPI 2 — Pipeline Velocity */}
                    <div className="rounded-lg border border-[#E8F5E9] bg-[#F6FBF6] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#22C55E] w-5 h-5 rounded-md flex items-center justify-center">2</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Pipeline velocity</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E]">Essentiel</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Mesure la vitesse a laquelle votre pipeline genere du revenu. C&apos;est l&apos;indicateur le plus complet du pipeline car il combine quatre variables : le nombre d&apos;opportunites, le montant moyen, le taux de conversion et la duree du cycle. Si un seul KPI devait resumer la sante de votre pipeline, ce serait celui-ci.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">Velocity = (Nb opportunites x Montant moyen x Win rate) / Duree cycle (jours)</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]">Croissance MoM positive = sain</strong></div>
                      </div>
                      <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Dans HubSpot</span>
                        <p className="text-[11px] text-[#666] mt-1 leading-[1.6]">Pas de rapport natif pour la pipeline velocity. Creez une propriete calculee avec Operations Hub, ou calculez-la manuellement a partir des 4 rapports sous-jacents. Chez Ceres, nous utilisons un dashboard dedie qui agrege les 4 composantes.</p>
                      </div>
                    </div>

                    {/* KPI 3 — Win Rate */}
                    <div className="rounded-lg border border-[#E8F5E9] bg-[#F6FBF6] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#22C55E] w-5 h-5 rounded-md flex items-center justify-center">3</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Win rate (taux de closing)</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E]">Essentiel</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Pourcentage de deals gagnes parmi tous les deals qui ont atteint un stade qualifie. Le win rate est le reflet direct de l&apos;efficacite commerciale de votre equipe. Un win rate en baisse indique un probleme de qualification, de positionnement prix ou de concurrence accrue.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">Win Rate = Deals Closed Won / (Deals Closed Won + Deals Closed Lost) x 100</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <div><span className="text-[#999]">Benchmark B2B SaaS :</span> <strong className="text-[#111]">20% a 30% (SMB), 15% a 25% (Enterprise)</strong></div>
                      </div>
                      <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Dans HubSpot</span>
                        <p className="text-[11px] text-[#666] mt-1 leading-[1.6]">Rapport &ldquo;Deal closed won vs closed lost&rdquo; avec la metrique &ldquo;Close rate&rdquo;. Filtrez par date de closing et par owner pour comparer les reps. Attention : excluez les deals disqualifies avant le stade &ldquo;Qualified&rdquo; pour ne pas fausser le ratio.</p>
                      </div>
                    </div>

                    {/* KPI 4 — Average Deal Size */}
                    <div className="rounded-lg border border-[#E8F5E9] bg-[#F6FBF6] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#22C55E] w-5 h-5 rounded-md flex items-center justify-center">4</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Montant moyen des deals (ACV)</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E]">Important</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Valeur moyenne annuelle des deals signes. Cet indicateur revele votre positionnement marche. Un ACV en hausse peut indiquer un mouvement vers l&apos;enterprise, une montee en gamme produit, ou simplement une meilleure negociation. Un ACV en baisse peut signaler une erosion des prix face a la concurrence.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">ACV = Total revenu Closed Won / Nombre de deals Closed Won</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]">Variable selon segment (SMB: 5-15K, Mid-Market: 25-80K, Enterprise: 100K+)</strong></div>
                      </div>
                      <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Dans HubSpot</span>
                        <p className="text-[11px] text-[#666] mt-1 leading-[1.6]">Rapport personnalise sur les deals Closed Won avec la metrique &ldquo;Average amount&rdquo;. Segmentez par mois pour suivre la tendance et par deal owner pour identifier les ecarts entre reps.</p>
                      </div>
                    </div>

                    {/* KPI 5 — Conversion par stage */}
                    <div className="rounded-lg border border-[#E8F5E9] bg-[#F6FBF6] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#22C55E] w-5 h-5 rounded-md flex items-center justify-center">5</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Taux de conversion par stage</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E]">Important</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Pourcentage de deals qui passent d&apos;une etape du pipeline a la suivante. C&apos;est l&apos;indicateur qui vous permet de localiser exactement ou votre pipeline fuit. Si 60% de vos deals passent de Discovery a Demo mais seulement 25% passent de Demo a Proposal, le probleme est clair : votre demo ne convainc pas.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">Conversion Stage N = Deals entrant Stage N+1 / Deals entrant Stage N x 100</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]">Qualification &rarr; Demo: 50-60% | Demo &rarr; Proposal: 40-50% | Proposal &rarr; Won: 30-40%</strong></div>
                      </div>
                      <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Dans HubSpot</span>
                        <p className="text-[11px] text-[#666] mt-1 leading-[1.6]">Rapport &ldquo;Deal stage funnel&rdquo; (type funnel). Active le mode &ldquo;Conversion rate&rdquo; pour afficher les pourcentages entre chaque etape. Pour un suivi mensuel, filtrez par date de creation du deal.</p>
                      </div>
                    </div>

                    {/* KPI 6 — Pipeline Coverage Ratio */}
                    <div className="rounded-lg border border-[#E8F5E9] bg-[#F6FBF6] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#22C55E] w-5 h-5 rounded-md flex items-center justify-center">6</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Pipeline coverage ratio</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#EF4444]/10 text-[#EF4444]">Critical</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Ratio entre la valeur totale du pipeline et le quota a atteindre. C&apos;est le thermometre de votre capacite a atteindre vos objectifs. Un ratio de 3x signifie que vous avez 3 euros de pipeline pour chaque euro de quota. En dessous de 3x, la probabilite d&apos;atteindre le quota chute drastiquement.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">Pipeline Coverage = Volume pipeline ouvert / Quota de la periode</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]">3x minimum, 4x ideal, 5x+ = pipeline gonfle a nettoyer</strong></div>
                      </div>
                      <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Dans HubSpot</span>
                        <p className="text-[11px] text-[#666] mt-1 leading-[1.6]">Combinez le rapport de pipeline total avec les objectifs (goals) definis par equipe dans HubSpot. Le ratio n&apos;est pas calcule nativement : creez un rapport personnalise ou utilisez l&apos;outil de forecasting avec les quotas configures.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 3 : KPIs Activite ===================== */}
              <section id="kpi-activite" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#4B5EFC]" />
                    <span className="text-[11px] font-semibold text-[#4B5EFC] uppercase tracking-wider">Categorie 2 / 5</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">KPIs Activite (5 indicateurs)</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Les KPI d&apos;activite mesurent l&apos;effort commercial au quotidien. Le pipeline est le resultat ; l&apos;activite est l&apos;input. Si votre pipeline est trop maigre, c&apos;est souvent ici que se trouve le probleme.</p>

                  <div className="space-y-5">
                    {[
                      {
                        num: "7",
                        title: "Appels par jour et par rep",
                        definition: "Nombre moyen d&apos;appels sortants effectues par commercial par jour. C&apos;est un indicateur de volume d&apos;activite pure. Il ne mesure pas la qualite des conversations mais la discipline de prospection. Les equipes qui sous-performent ont presque toujours un probleme de volume d&apos;activite avant d&apos;avoir un probleme de competences.",
                        formula: "Appels / jour = Total appels logges sur la periode / Nombre de jours ouvres / Nombre de reps",
                        benchmark: "SDR outbound : 40-60 appels/jour | AE : 8-15 appels/jour",
                        hubspot: "Rapport sur les activites de type &ldquo;Call&rdquo; avec regroupement par owner et par jour. Assurez-vous que vos reps loguent chaque appel, idealement via une integration telephonique (Aircall, Ringover) pour un tracking automatique.",
                      },
                      {
                        num: "8",
                        title: "Emails envoyes",
                        definition: "Nombre d&apos;emails commerciaux envoyes par rep par semaine. Cet indicateur inclut les emails one-to-one et les sequences automatisees. Distinguez les deux : un volume eleve de sequences ne compense pas l&apos;absence d&apos;emails personnalises sur les deals strategiques.",
                        formula: "Emails / semaine = Total emails trackes sur la periode / Nombre de semaines / Nombre de reps",
                        benchmark: "SDR : 200-300 emails/semaine (sequences incluses) | AE : 50-100 emails/semaine",
                        hubspot: "Rapport sur les activites de type &ldquo;Email&rdquo;. Utilisez le tracking d&apos;emails HubSpot pour capturer automatiquement les envois depuis Gmail ou Outlook. Segmentez par &ldquo;sequence enrollment&rdquo; vs emails manuels.",
                      },
                      {
                        num: "9",
                        title: "Meetings reserves",
                        definition: "Nombre de reunions qualifiees reservees par semaine et par rep. C&apos;est le KPI d&apos;activite le plus directement correle au revenue. Chaque meeting est une porte d&apos;entree dans le pipeline. Un SDR qui reserve 3 meetings par semaine genere potentiellement 12 a 15 opportunites qualifiees par mois.",
                        formula: "Meetings / semaine = Total meetings crees sur la periode / Nombre de semaines / Nombre de reps",
                        benchmark: "SDR : 3-5 meetings/semaine | AE (prospecting) : 2-3 meetings/semaine",
                        hubspot: "Rapport sur les meetings avec regroupement par date de creation et par owner. Integrez votre outil de prise de rendez-vous (Calendly, HubSpot Meetings) pour un tracking automatique. Filtrez les meetings annules ou no-show.",
                      },
                      {
                        num: "10",
                        title: "Propositions envoyees",
                        definition: "Nombre de propositions commerciales envoyees par mois. Cet indicateur mesure la vitesse a laquelle votre equipe transforme les opportunites en propositions concretes. Un ecart important entre le nombre de demos et le nombre de propositions revele un blocage dans le processus : soit les deals ne sont pas assez qualifies, soit les reps procrastinent sur la redaction des propositions.",
                        formula: "Propositions / mois = Nombre de deals passes au stade &ldquo;Proposal Sent&rdquo; sur la periode",
                        benchmark: "AE : 8-15 propositions/mois (varie selon le cycle de vente)",
                        hubspot: "Rapport sur les changements de deal stage. Filtrez par transition vers l&apos;etape &ldquo;Proposal Sent&rdquo;. Combinez avec l&apos;outil Quotes de HubSpot si vous l&apos;utilisez pour generer vos devis.",
                      },
                      {
                        num: "11",
                        title: "Taux de follow-up",
                        definition: "Pourcentage de leads ou d&apos;opportunites qui recoivent un follow-up dans le delai defini par votre process. C&apos;est un indicateur de discipline commerciale. Les etudes montrent que 80% des ventes necessitent 5 follow-ups minimum, mais que 44% des commerciaux abandonnent apres le premier contact sans reponse. Le taux de follow-up mesure si votre equipe applique cette discipline.",
                        formula: "Follow-up Rate = Leads avec au moins N activites dans les X jours / Total leads assignes x 100",
                        benchmark: "Objectif : 90%+ de taux de follow-up dans les 48h pour les inbound leads",
                        hubspot: "Creez un rapport personnalise croisant les contacts assignes avec les activites loguees. Utilisez les proprietes &ldquo;Last activity date&rdquo; et &ldquo;Number of times contacted&rdquo; pour identifier les leads sans follow-up. Un workflow d&apos;alerte peut notifier le manager en cas de lead non contacte apres 24h.",
                      },
                    ].map((kpi) => (
                      <div key={kpi.num} className="rounded-lg border border-[#E8EAF6] bg-[#F5F6FF] p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-white bg-[#4B5EFC] w-5 h-5 rounded-md flex items-center justify-center">{kpi.num}</span>
                            <h3 className="text-[14px] font-semibold text-[#111]">{kpi.title}</h3>
                          </div>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.7] mb-3" dangerouslySetInnerHTML={{ __html: kpi.definition }} />
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                          <p className="text-[13px] font-mono text-[#111] mt-1" dangerouslySetInnerHTML={{ __html: kpi.formula }} />
                        </div>
                        <div className="flex items-center gap-4 text-[11px] mb-3">
                          <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]" dangerouslySetInnerHTML={{ __html: kpi.benchmark }} /></div>
                        </div>
                        <div className="rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Dans HubSpot</span>
                          <p className="text-[11px] text-[#666] mt-1 leading-[1.6]" dangerouslySetInnerHTML={{ __html: kpi.hubspot }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 4 : KPIs Revenue ===================== */}
              <section id="kpi-revenue" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#6C5CE7]" />
                    <span className="text-[11px] font-semibold text-[#6C5CE7] uppercase tracking-wider">Categorie 3 / 5</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">KPIs Revenue (5 indicateurs)</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Les KPI de revenue mesurent le resultat final : l&apos;argent qui entre. En SaaS B2B, le revenu n&apos;est pas une ligne unique. Il se decompose en new business, expansion, contraction et churn. Comprendre cette decomposition est essentiel pour piloter la croissance.</p>

                  <div className="space-y-5">
                    {[
                      {
                        num: "12",
                        title: "MRR / ARR",
                        definition: "Le Monthly Recurring Revenue (MRR) est la somme des revenus recurrents mensuels de tous vos clients actifs. L&apos;ARR est simplement le MRR multiplie par 12. C&apos;est la metrique reine de toute entreprise SaaS. Elle mesure la taille reelle de votre business, independamment des variations one-shot.",
                        formula: "MRR = SUM(montant mensuel de tous les abonnements actifs) | ARR = MRR x 12",
                        benchmark: "Croissance MRR MoM : 10-15% (early stage), 5-8% (scale-up), 2-4% (mature)",
                        hubspot: "Pas de champ MRR natif dans HubSpot. Creez une propriete custom &ldquo;MRR&rdquo; sur les deals et utilisez des proprietes calculees (Operations Hub) pour agreger. Voir notre guide dedie pour le setup complet.",
                      },
                      {
                        num: "13",
                        title: "New business revenue",
                        definition: "Revenu genere par les nouveaux clients acquis sur la periode. C&apos;est le moteur principal de la croissance. Ce KPI doit etre suivi separement de l&apos;expansion car il mesure la capacite de votre equipe a ouvrir de nouveaux comptes, pas a developper les existants.",
                        formula: "New Business = SUM(MRR des deals Closed Won avec des contacts/companies nouveaux sur la periode)",
                        benchmark: "En early stage : 70-80% du revenue total | En scale-up : 50-60% | Mature : 30-40%",
                        hubspot: "Rapport sur les deals Closed Won filtre par &ldquo;Is a new customer&rdquo; (creez une propriete custom ou utilisez le champ &ldquo;First deal created date&rdquo; de la company). Segmentez par source pour comprendre quels canaux generent le plus de new business.",
                      },
                      {
                        num: "14",
                        title: "Expansion revenue",
                        definition: "Revenu additionnel genere par les clients existants via des upsells, cross-sells ou upgrades de plan. L&apos;expansion revenue est le signe d&apos;un product-market fit solide : vos clients existants tirent suffisamment de valeur de votre produit pour payer davantage. C&apos;est aussi le levier de croissance le plus rentable car le CAC est quasi nul.",
                        formula: "Expansion Revenue = SUM(MRR additionnel provenant de clients existants sur la periode)",
                        benchmark: "Expansion / New Business ratio : 30-50% pour les meilleures SaaS (signe de negative churn)",
                        hubspot: "Creez un pipeline &ldquo;Expansion&rdquo; separe pour les upsells et cross-sells. Rattachez chaque deal d&apos;expansion a la company existante. Rapport sur les deals Closed Won dans ce pipeline, segmente par type (upsell, cross-sell, upgrade).",
                      },
                      {
                        num: "15",
                        title: "Churn rate (taux d&apos;attrition)",
                        definition: "Pourcentage de revenu recurrent perdu sur une periode donnee a cause des resiliations clients. Le churn est l&apos;ennemi numero un de toute entreprise SaaS. Un churn de 5% par mois semble faible, mais il signifie que vous perdez 46% de votre base de revenus chaque annee. Chaque point de churn en moins a un impact exponentiel sur la valorisation.",
                        formula: "Churn Rate = MRR perdu (resiliations) / MRR total en debut de periode x 100",
                        benchmark: "B2B SaaS SMB : 3-5% mensuel | Mid-Market : 1-2% mensuel | Enterprise : &lt;1% mensuel",
                        hubspot: "Creez une propriete &ldquo;Churn date&rdquo; et un workflow qui se declenche quand un deal passe en &ldquo;Churned&rdquo;. Rapport mensuel sur le MRR perdu. Ajoutez une propriete &ldquo;Churn reason&rdquo; (dropdown) pour analyser les causes.",
                      },
                      {
                        num: "16",
                        title: "Net Revenue Retention (NRR)",
                        definition: "Pourcentage du revenu d&apos;une cohorte de clients conserve apres un an, en incluant l&apos;expansion et en soustrayant le churn et la contraction. Un NRR superieur a 100% signifie que vos clients existants generent plus de revenus cette annee que l&apos;annee derniere, sans compter les nouveaux clients. C&apos;est l&apos;indicateur qui separe les bonnes SaaS des excellentes.",
                        formula: "NRR = (MRR debut + Expansion - Contraction - Churn) / MRR debut x 100",
                        benchmark: "Bon : 100-110% | Excellent : 110-130% | Elite : 130%+ (Snowflake, Databricks)",
                        hubspot: "Le NRR necessite un suivi rigoureux des mouvements MRR par cohorte. Utilisez les proprietes custom MRR avec un workflow qui enregistre le MRR mensuel de chaque company. Le calcul final se fait generalement dans un spreadsheet ou un outil BI connecte a HubSpot.",
                      },
                    ].map((kpi) => (
                      <div key={kpi.num} className="rounded-lg border border-[#EDE7F6] bg-[#F8F5FF] p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-white bg-[#6C5CE7] w-5 h-5 rounded-md flex items-center justify-center">{kpi.num}</span>
                            <h3 className="text-[14px] font-semibold text-[#111]" dangerouslySetInnerHTML={{ __html: kpi.title }} />
                          </div>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.7] mb-3" dangerouslySetInnerHTML={{ __html: kpi.definition }} />
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                          <p className="text-[13px] font-mono text-[#111] mt-1" dangerouslySetInnerHTML={{ __html: kpi.formula }} />
                        </div>
                        <div className="flex items-center gap-4 text-[11px] mb-3">
                          <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]" dangerouslySetInnerHTML={{ __html: kpi.benchmark }} /></div>
                        </div>
                        <div className="rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Dans HubSpot</span>
                          <p className="text-[11px] text-[#666] mt-1 leading-[1.6]" dangerouslySetInnerHTML={{ __html: kpi.hubspot }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 5 : KPIs Productivite ===================== */}
              <section id="kpi-productivite" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#FF7A59]" />
                    <span className="text-[11px] font-semibold text-[#FF7A59] uppercase tracking-wider">Categorie 4 / 5</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">KPIs Productivite (5 indicateurs)</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Les KPI de productivite mesurent l&apos;efficience de votre equipe : le rapport entre les ressources investies et les resultats obtenus. Deux equipes peuvent avoir le meme chiffre d&apos;affaires mais des niveaux de productivite radicalement differents. C&apos;est ici que se cachent les plus gros leviers d&apos;optimisation.</p>

                  <div className="space-y-5">
                    {[
                      {
                        num: "17",
                        title: "Duree du cycle de vente (Sales Cycle Length)",
                        definition: "Nombre moyen de jours entre la creation d&apos;une opportunite et le closing (won ou lost). C&apos;est le temps que met votre machine commerciale a transformer un lead en client. Un cycle qui s&apos;allonge augmente le cout d&apos;acquisition, immobilise vos reps sur des deals qui stagnent, et overduee le cash-flow. A l&apos;inverse, un cycle qui raccourcit est un signal fort d&apos;amelioration du process de vente.",
                        formula: "Cycle moyen = SUM(jours entre creation et closing de chaque deal) / Nombre de deals closes",
                        benchmark: "SMB : 14-30 jours | Mid-Market : 30-90 jours | Enterprise : 90-180+ jours",
                        hubspot: "Rapport standard &ldquo;Time in deal stage&rdquo;. Utilisez le champ &ldquo;Days to close&rdquo; natif de HubSpot. Segmentez par deal owner, par source et par montant pour identifier les patterns. Les gros deals prennent naturellement plus de temps, ne les melangez pas avec le SMB.",
                      },
                      {
                        num: "18",
                        title: "Time to first contact (delai de premier contact)",
                        definition: "Temps ecoule entre la creation d&apos;un lead (soumission de formulaire, import, etc.) et le premier contact commercial. Les etudes de InsideSales.com ont montre que les chances de qualifier un lead chutent de 80% apres les 5 premieres minutes. Chaque heure de overdue reduit la probabilite de conversion de maniere significative. C&apos;est un des KPI les plus directement actionnables.",
                        formula: "Time to First Contact = Date/heure du premier appel ou email - Date/heure de creation du contact",
                        benchmark: "Objectif : &lt;5 minutes pour les leads inbound chauds | &lt;1 heure pour les MQL | &lt;24h pour les leads froids",
                        hubspot: "Creez une propriete calculee qui soustrait &ldquo;Create date&rdquo; de &ldquo;First activity date&rdquo;. Alternativement, un workflow peut enregistrer le timestamp du premier contact et calculer le delta. Rapport sur la distribution du time to first contact par tranche (0-5min, 5-30min, 30min-1h, 1h+).",
                      },
                      {
                        num: "19",
                        title: "Cout d&apos;acquisition client (CAC)",
                        definition: "Cout total pour acquerir un nouveau client, incluant les depenses marketing et commerciales. Le CAC est le KPI financier fondamental de toute equipe commerciale. Il inclut les salaires des sales et marketing, les outils, la publicite, les evenements et tout ce qui contribue a generer et closer un deal. Un CAC qui augmente sans que l&apos;ACV suive est un signal d&apos;alarme majeur.",
                        formula: "CAC = (Depenses Sales + Depenses Marketing) / Nombre de nouveaux clients acquis",
                        benchmark: "CAC Payback : 12-18 mois (sain) | &lt;12 mois (excellent) | &gt;24 mois (problematique)",
                        hubspot: "Le CAC n&apos;est pas calculable directement dans HubSpot car il necessite des donnees financieres (salaires, budgets). Exportez le nombre de deals Closed Won depuis HubSpot et croisez avec vos depenses dans un spreadsheet. Pour le CAC par canal, utilisez la propriete &ldquo;Original source&rdquo; des deals.",
                      },
                      {
                        num: "20",
                        title: "Ratio LTV / CAC",
                        definition: "Rapport entre la valeur vie client (Lifetime Value) et le cout d&apos;acquisition. C&apos;est l&apos;indicateur ultime de la rentabilite de votre modele commercial. Un ratio de 3x signifie que chaque euro investi en acquisition genere 3 euros de revenu sur la duree de vie du client. En dessous de 3x, votre modele n&apos;est pas viable a long terme. Au-dessus de 5x, vous sous-investissez probablement en acquisition.",
                        formula: "LTV = ARPA x Marge brute / Taux de churn mensuel | Ratio = LTV / CAC",
                        benchmark: "Minimum viable : 3x | Sain : 3-5x | Excellent : 5x+ (mais interrogez votre sous-investissement)",
                        hubspot: "Comme le CAC, le LTV/CAC necessite des donnees financieres externes. Utilisez HubSpot pour extraire l&apos;ARPA (propriete calculee sur les deals) et le taux de churn, puis combinez avec le CAC dans un outil BI ou un spreadsheet.",
                      },
                      {
                        num: "21",
                        title: "Revenue par commercial (Revenue per Rep)",
                        definition: "Chiffre d&apos;affaires total genere par commercial sur la periode. C&apos;est le KPI de productivite individuelle par excellence. Il permet de comparer l&apos;efficacite de chaque rep, d&apos;identifier les top performers, de detecter les reps en difficulte, et surtout de determiner quand il est temps de recruter. Si le revenue par rep stagne ou diminue malgre une croissance de l&apos;equipe, vous avez un probleme de scaling.",
                        formula: "Revenue / Rep = Total revenu Closed Won / Nombre de commerciaux actifs sur la periode",
                        benchmark: "SDR : 2-4x son salaire en pipeline genere | AE : 4-6x son OTE en revenu signe",
                        hubspot: "Rapport sur les deals Closed Won regroupes par &ldquo;Deal owner&rdquo; avec la metrique &ldquo;Sum of amount&rdquo;. Creez un tableau de classement (leaderboard) mensuel. Attention : ne comparez que des roles equivalents (AE vs AE, pas AE vs SDR).",
                      },
                    ].map((kpi) => (
                      <div key={kpi.num} className="rounded-lg border border-[#FBE9E7] bg-[#FFF8F6] p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-white bg-[#FF7A59] w-5 h-5 rounded-md flex items-center justify-center">{kpi.num}</span>
                            <h3 className="text-[14px] font-semibold text-[#111]" dangerouslySetInnerHTML={{ __html: kpi.title }} />
                          </div>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.7] mb-3" dangerouslySetInnerHTML={{ __html: kpi.definition }} />
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                          <p className="text-[13px] font-mono text-[#111] mt-1" dangerouslySetInnerHTML={{ __html: kpi.formula }} />
                        </div>
                        <div className="flex items-center gap-4 text-[11px] mb-3">
                          <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]" dangerouslySetInnerHTML={{ __html: kpi.benchmark }} /></div>
                        </div>
                        <div className="rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Dans HubSpot</span>
                          <p className="text-[11px] text-[#666] mt-1 leading-[1.6]" dangerouslySetInnerHTML={{ __html: kpi.hubspot }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 6 : KPIs Qualite ===================== */}
              <section id="kpi-qualite" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#F59E0B]" />
                    <span className="text-[11px] font-semibold text-[#F59E0B] uppercase tracking-wider">Categorie 5 / 5</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">KPIs Qualite (4 indicateurs)</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Les KPI de qualite sont souvent negliges au profit des KPI de volume. C&apos;est une erreur. Ils mesurent la fiabilite de votre processus commercial : la qualite de vos leads, la precision de vos previsions et l&apos;integrite de vos donnees. Sans donnees fiables, tous les autres KPI sont suspects.</p>

                  <div className="space-y-5">
                    {[
                      {
                        num: "22",
                        title: "Lead-to-customer rate",
                        definition: "Pourcentage de leads generes qui finissent par devenir clients. Cet indicateur mesure la qualite globale de votre funnel, de l&apos;acquisition au closing. Un taux faible peut indiquer un probleme a n&apos;importe quelle etape : leads mal qualifies, handoff marketing-sales defaillant, process de vente inadequat, ou pricing mal positionne.",
                        formula: "Lead-to-Customer = Nouveaux clients / Nouveaux leads sur la meme periode x 100",
                        benchmark: "Inbound : 2-5% | Outbound : 1-3% | Referral : 5-15%",
                        hubspot: "Rapport croisant le lifecycle stage &ldquo;Lead&rdquo; avec le lifecycle stage &ldquo;Customer&rdquo; sur une cohorte mensuelle. Attention au decalage temporel : un lead cree en janvier peut ne devenir client qu&apos;en avril. Utilisez une fenetre d&apos;attribution de 90 a 180 jours selon votre cycle de vente.",
                      },
                      {
                        num: "23",
                        title: "SQL acceptance rate",
                        definition: "Pourcentage de Sales Qualified Leads (SQL) acceptes par l&apos;equipe commerciale apres transmission par le marketing. C&apos;est le KPI qui mesure l&apos;alignement entre marketing et ventes. Un taux d&apos;acceptation inferieur a 70% signifie que le marketing envoie des leads que les sales jugent non qualifies. C&apos;est un symptome classique du desalignement marketing-ventes.",
                        formula: "SQL Acceptance = SQLs acceptes par les sales / Total SQLs transmis par le marketing x 100",
                        benchmark: "Bon : 70-80% | Excellent : 80-90% | &lt;60% : realignement necessaire",
                        hubspot: "Utilisez les lifecycle stages (MQL &rarr; SQL) et la propriete &ldquo;Lead status&rdquo; avec les valeurs &ldquo;Accepted&rdquo; et &ldquo;Rejected&rdquo;. Rapport sur les transitions de lifecycle stage avec le taux d&apos;acceptation. Ajoutez une propriete &ldquo;Rejection reason&rdquo; pour comprendre pourquoi les sales refusent certains leads.",
                      },
                      {
                        num: "24",
                        title: "Forecast accuracy",
                        definition: "Ecart entre le chiffre d&apos;affaires prevu (forecast) et le chiffre d&apos;affaires realise a la fin de la periode. C&apos;est le KPI de confiance. Un forecast fiable permet a l&apos;entreprise de planifier ses investissements, ses recrutements et sa croissance. Un forecast systematiquement optimiste ou pessimiste detruit la credibilite de l&apos;equipe commerciale aupres de la direction et des investisseurs.",
                        formula: "Forecast Accuracy = 1 - |Revenu prevu - Revenu realise| / Revenu realise x 100",
                        benchmark: "Bon : 80-90% | Excellent : 90%+ | &lt;70% : process de forecasting a revoir",
                        hubspot: "Utilisez l&apos;outil Forecasting natif de HubSpot (Sales Hub Pro+). Comparez les previsions de debut de mois/trimestre avec les resultats reels en fin de periode. Creez un rapport historique pour suivre l&apos;evolution de la precision du forecast sur 6-12 mois.",
                      },
                      {
                        num: "25",
                        title: "Data completeness (completude des donnees CRM)",
                        definition: "Pourcentage de champs obligatoires remplis dans votre CRM sur les fiches contacts, companies et deals. Sans donnees completes, aucun KPI n&apos;est fiable. Un deal sans montant fausse votre pipeline. Un contact sans source fausse votre attribution. Une company sans secteur d&apos;activite rend la segmentation impossible. La completude des donnees est le fondement invisible de tout systeme de pilotage.",
                        formula: "Data Completeness = Fiches avec tous les champs obligatoires remplis / Total fiches x 100",
                        benchmark: "Objectif minimum : 85% | Cible : 95%+ sur les champs critiques (montant, stage, source, owner)",
                        hubspot: "Creez des listes actives filtrant les contacts/deals avec des champs vides. Rapport sur le nombre de fiches incompletes par propriete. Utilisez les workflows pour forcer le remplissage (ex: un deal ne peut pas avancer au stade suivant si le montant est vide). HubSpot propose aussi un score de completude des donnees dans les parametres.",
                      },
                    ].map((kpi) => (
                      <div key={kpi.num} className="rounded-lg border border-[#FFF3E0] bg-[#FFFBF5] p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-white bg-[#F59E0B] w-5 h-5 rounded-md flex items-center justify-center">{kpi.num}</span>
                            <h3 className="text-[14px] font-semibold text-[#111]" dangerouslySetInnerHTML={{ __html: kpi.title }} />
                          </div>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.7] mb-3" dangerouslySetInnerHTML={{ __html: kpi.definition }} />
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                          <p className="text-[13px] font-mono text-[#111] mt-1" dangerouslySetInnerHTML={{ __html: kpi.formula }} />
                        </div>
                        <div className="flex items-center gap-4 text-[11px] mb-3">
                          <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]" dangerouslySetInnerHTML={{ __html: kpi.benchmark }} /></div>
                        </div>
                        <div className="rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Dans HubSpot</span>
                          <p className="text-[11px] text-[#666] mt-1 leading-[1.6]" dangerouslySetInnerHTML={{ __html: kpi.hubspot }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 7 : Dashboard Mockup ===================== */}
              <section id="dashboard-mockup" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Dashboard ideal</span>
                  <h2 className="text-[17px] font-semibold text-white mb-2">A quoi ressemble un dashboard commercial ideal</h2>
                  <p className="text-[12px] text-white/50 leading-[1.75] mb-6">Voici une representation du dashboard que nous deploiement chez nos clients. Chaque widget correspond a un ou plusieurs KPI decrits dans cet article. L&apos;objectif : avoir une vue complete de la performance commerciale en un seul ecran.</p>

                  {/* Dashboard mockup - Row 1: KPI cards */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Vue d&apos;ensemble -- Mars 2026</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] px-2 py-0.5 rounded bg-white/10 text-white/30">Filtre : Ce mois</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-white/10 text-white/30">Equipe : Tous</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: "Pipeline total", value: "847K", change: "+12%", up: true, color: "#22C55E" },
                        { label: "Win Rate", value: "24.3%", change: "+2.1pts", up: true, color: "#22C55E" },
                        { label: "MRR", value: "68.5K", change: "+8.4%", up: true, color: "#22C55E" },
                        { label: "Cycle moyen", value: "34j", change: "-3j", up: true, color: "#22C55E" },
                      ].map((kpi) => (
                        <div key={kpi.label} className="rounded-lg bg-white/5 border border-white/8 p-3">
                          <div className="text-[9px] text-white/30 mb-1">{kpi.label}</div>
                          <div className="text-[20px] font-bold text-white mb-1">{kpi.value}</div>
                          <div className="flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d={kpi.up ? "M5 2L8 6H2L5 2Z" : "M5 8L2 4H8L5 8Z"} fill={kpi.color} />
                            </svg>
                            <span className="text-[9px]" style={{ color: kpi.color }}>{kpi.change} vs M-1</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dashboard mockup - Row 2: Charts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Sparkline chart mockup - Pipeline evolution */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold text-white/60">Pipeline Evolution (6 mois)</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-[#22C55E]/20 text-[#22C55E]">+34% YoY</span>
                      </div>
                      {/* CSS sparkline */}
                      <div className="flex items-end gap-1.5 h-[80px]">
                        {[45, 52, 48, 65, 72, 85].map((val, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full rounded-sm transition-all"
                              style={{
                                height: `${val}%`,
                                backgroundColor: i === 5 ? "#22C55E" : "rgba(34, 197, 94, 0.3)",
                              }}
                            />
                            <span className="text-[8px] text-white/20">{["Oct", "Nov", "Dec", "Jan", "Fev", "Mar"][i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Funnel chart mockup */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold text-white/60">Funnel de conversion</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-white/10 text-white/30">Ce trimestre</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { stage: "Leads", value: 842, pct: 100, color: "#4B5EFC" },
                          { stage: "MQL", value: 315, pct: 37, color: "#6C5CE7" },
                          { stage: "SQL", value: 148, pct: 47, color: "#FF7A59" },
                          { stage: "Proposal", value: 67, pct: 45, color: "#F59E0B" },
                          { stage: "Won", value: 28, pct: 42, color: "#22C55E" },
                        ].map((s) => (
                          <div key={s.stage} className="flex items-center gap-2">
                            <span className="text-[9px] text-white/30 w-[50px] shrink-0">{s.stage}</span>
                            <div className="flex-1 h-3 rounded-sm bg-white/5 overflow-hidden">
                              <div className="h-full rounded-sm" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                            </div>
                            <span className="text-[9px] text-white/40 font-mono w-[30px] text-right">{s.value}</span>
                            <span className="text-[8px] text-white/20 w-[25px] text-right">{s.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dashboard mockup - Row 3: Activity & Revenue */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Activity metrics */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <span className="text-[11px] font-semibold text-white/60 mb-3 block">Activite cette semaine</span>
                      <div className="space-y-3">
                        {[
                          { label: "Appels passes", value: "247", target: "300", pct: 82, color: "#4B5EFC" },
                          { label: "Emails envoyes", value: "1,842", target: "2,000", pct: 92, color: "#6C5CE7" },
                          { label: "Meetings reserves", value: "18", target: "20", pct: 90, color: "#22C55E" },
                          { label: "Propositions", value: "12", target: "15", pct: 80, color: "#FF7A59" },
                        ].map((a) => (
                          <div key={a.label}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[9px] text-white/40">{a.label}</span>
                              <span className="text-[9px] text-white/50 font-mono">{a.value} <span className="text-white/20">/ {a.target}</span></span>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${a.pct}%`, backgroundColor: a.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Revenue breakdown */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <span className="text-[11px] font-semibold text-white/60 mb-3 block">Decomposition MRR</span>
                      <div className="space-y-2.5">
                        {[
                          { label: "MRR existant", value: "58.2K", color: "#6C5CE7" },
                          { label: "+ New Business", value: "+6.8K", color: "#22C55E" },
                          { label: "+ Expansion", value: "+4.2K", color: "#4B5EFC" },
                          { label: "- Contraction", value: "-0.4K", color: "#FF7A59" },
                          { label: "- Churn", value: "-0.3K", color: "#EF4444" },
                        ].map((r) => (
                          <div key={r.label} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: r.color }} />
                              <span className="text-[10px] text-white/40">{r.label}</span>
                            </div>
                            <span className="text-[11px] font-mono font-semibold" style={{ color: r.color }}>{r.value}</span>
                          </div>
                        ))}
                        <div className="border-t border-white/10 pt-2 mt-2 flex items-center justify-between">
                          <span className="text-[10px] text-white/60 font-semibold">MRR total</span>
                          <span className="text-[14px] font-mono font-bold text-[#22C55E]">68.5K</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard mockup - Row 4: Leaderboard & Gauges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Leaderboard */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <span className="text-[11px] font-semibold text-white/60 mb-3 block">Leaderboard -- Revenu signe (ce mois)</span>
                      <div className="space-y-2">
                        {[
                          { name: "Marie L.", revenue: "32.4K", quota: 108, rank: 1 },
                          { name: "Thomas D.", revenue: "28.1K", quota: 94, rank: 2 },
                          { name: "Julie M.", revenue: "24.7K", quota: 82, rank: 3 },
                          { name: "Pierre A.", revenue: "19.3K", quota: 64, rank: 4 },
                          { name: "Sophie R.", revenue: "15.8K", quota: 53, rank: 5 },
                        ].map((rep) => (
                          <div key={rep.name} className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-white/20 w-3">{rep.rank}</span>
                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[8px] text-white/40 font-bold">{rep.name.split(" ").map(n => n[0]).join("")}</div>
                            <span className="text-[10px] text-white/50 flex-1">{rep.name}</span>
                            <span className="text-[10px] font-mono text-white/60">{rep.revenue}</span>
                            <div className="w-[50px] h-1.5 rounded-full bg-white/5 overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${Math.min(rep.quota, 100)}%`, backgroundColor: rep.quota >= 100 ? "#22C55E" : rep.quota >= 80 ? "#F59E0B" : "#EF4444" }} />
                            </div>
                            <span className="text-[9px] font-mono" style={{ color: rep.quota >= 100 ? "#22C55E" : rep.quota >= 80 ? "#F59E0B" : "#EF4444" }}>{rep.quota}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gauge cards */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <span className="text-[11px] font-semibold text-white/60 mb-3 block">Indicateurs cles de sante</span>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Pipeline Coverage", value: "3.8x", status: "Sain", color: "#22C55E" },
                          { label: "Forecast Accuracy", value: "87%", status: "Bon", color: "#22C55E" },
                          { label: "Data Completeness", value: "92%", status: "Bon", color: "#22C55E" },
                          { label: "NRR", value: "112%", status: "Excellent", color: "#22C55E" },
                        ].map((g) => (
                          <div key={g.label} className="rounded-lg bg-white/5 border border-white/8 p-3 text-center">
                            <div className="text-[8px] text-white/25 mb-1">{g.label}</div>
                            <div className="text-[18px] font-bold text-white mb-1">{g.value}</div>
                            {/* CSS gauge arc */}
                            <div className="relative w-full h-2 rounded-full bg-white/5 overflow-hidden mx-auto">
                              <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: "85%", backgroundColor: g.color }} />
                            </div>
                            <div className="text-[8px] mt-1" style={{ color: g.color }}>{g.status}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* HubSpot report mockup */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-[#FF7A59] flex items-center justify-center">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        </div>
                        <span className="text-[11px] font-semibold text-white/60">Rapport HubSpot -- Deals par stage</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-[#FF7A59]/20 text-[#FF7A59]">HubSpot</span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { stage: "Qualified", deals: 45, amount: "234K", width: "100%" },
                        { stage: "Discovery Call", deals: 32, amount: "187K", width: "80%" },
                        { stage: "Demo / POC", deals: 21, amount: "156K", width: "67%" },
                        { stage: "Proposal Sent", deals: 14, amount: "112K", width: "48%" },
                        { stage: "Negotiation", deals: 8, amount: "89K", width: "38%" },
                        { stage: "Closed Won", deals: 6, amount: "68K", width: "29%" },
                      ].map((s) => (
                        <div key={s.stage} className="flex items-center gap-2">
                          <span className="text-[9px] text-white/30 w-[90px] shrink-0 truncate">{s.stage}</span>
                          <div className="flex-1 h-5 rounded-sm bg-white/5 overflow-hidden relative">
                            <div className="h-full rounded-sm bg-gradient-to-r from-[#FF7A59]/60 to-[#FF7A59]/30" style={{ width: s.width }} />
                            <div className="absolute inset-0 flex items-center px-2">
                              <span className="text-[8px] text-white/50 font-mono">{s.deals} deals</span>
                            </div>
                          </div>
                          <span className="text-[9px] text-white/40 font-mono w-[40px] text-right">{s.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-[12px] text-white/45 leading-[1.65]">
                      <strong className="text-white/60">Note :</strong> ce dashboard combine des donnees issues de HubSpot (pipeline, activites, deals) avec des calculs externes (CAC, LTV/CAC, NRR). Dans HubSpot natif, vous obtiendrez environ 70% de ces widgets. Pour les 30% restants (metriques financieres, cohortes), vous aurez besoin d&apos;Operations Hub Pro ou d&apos;un outil BI complementaire.
                    </p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 8 : Tracker dans HubSpot ===================== */}
              <section id="tracker-hubspot" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Comment tracker ces KPI dans HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>HubSpot est l&apos;outil central de la plupart de nos clients pour le suivi des KPI commerciaux. Mais entre les rapports standards, les rapports personnalises, les proprietes calculees et les dashboards, il est facile de s&apos;y perdre. Voici la methode structuree que nous utilisons.</p>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      {
                        num: "01",
                        title: "Creer les proprietes custom necessaires",
                        desc: "Avant de construire le moindre rapport, assurez-vous que vos donnees sont bien structurees. Les proprietes standards de HubSpot couvrent environ 60% des besoins. Pour le reste, creez des proprietes custom sur les objets Deal, Contact et Company.",
                        items: [
                          "Deal : MRR, ARR, deal_type (new business / renewal / expansion), churn_date, churn_reason",
                          "Contact : lead_source_detail, SQL_acceptance_status, SQL_rejection_reason, first_contact_timestamp",
                          "Company : segment (SMB / Mid-Market / Enterprise), industry, customer_since, total_mrr",
                        ],
                        color: "#22C55E",
                      },
                      {
                        num: "02",
                        title: "Configurer les rapports personnalises",
                        desc: "HubSpot propose deux types de rapports : les rapports standards (pre-configures) et les rapports custom (Custom Report Builder). Pour les 25 KPI de cet article, vous aurez besoin d&apos;environ 15 rapports custom. Regroupez-les par categorie pour faciliter la maintenance.",
                        items: [
                          "Pipeline : 4 rapports (volume, velocity components, win rate, stage conversion funnel)",
                          "Activite : 3 rapports (calls par rep, emails par rep, meetings par rep avec objectifs)",
                          "Revenue : 4 rapports (MRR evolution, new vs expansion, churn tracking, NRR par cohorte)",
                          "Productivite : 2 rapports (cycle length par segment, revenue par rep leaderboard)",
                          "Qualite : 2 rapports (lead-to-customer funnel, data completeness audit)",
                        ],
                        color: "#4B5EFC",
                      },
                      {
                        num: "03",
                        title: "Construire les dashboards",
                        desc: "Ne creez pas un seul dashboard avec 25 widgets. Personne ne le regardera. Creez 3 a 4 dashboards thematiques, chacun avec 6 a 8 widgets maximum. Chaque dashboard doit repondre a une question specifique et etre destine a un public precis.",
                        items: [
                          "Executive Dashboard : MRR, ARR, NRR, pipeline coverage, forecast accuracy (pour la direction)",
                          "Sales Manager Dashboard : win rate, cycle length, activite par rep, leaderboard (pour le manager)",
                          "Rep Dashboard : pipeline personnel, activites de la semaine, deals a relancer, objectifs (pour chaque rep)",
                          "Data Quality Dashboard : completude par objet, deals sans montant, contacts sans source (pour le RevOps)",
                        ],
                        color: "#6C5CE7",
                      },
                      {
                        num: "04",
                        title: "Automatiser les alertes et les mises a jour",
                        desc: "Un KPI sans action est une donnee morte. Configurez des workflows HubSpot pour declencher des alertes automatiques quand un indicateur depasse un seuil critique. Les alertes les plus utiles sont celles qui anticipent un probleme avant qu&apos;il ne se materialise dans les resultats.",
                        items: [
                          "Alerte pipeline coverage &lt; 3x : notification Slack au manager + tache de prospection pour les reps",
                          "Alerte time to first contact &gt; 1h : notification au rep + escalade manager si &gt; 4h",
                          "Alerte deal stagne &gt; 14 jours dans le meme stage : tache de suivi automatique",
                          "Rapport hebdomadaire automatique : email chaque lundi avec les KPI cles de la semaine precedente",
                        ],
                        color: "#FF7A59",
                      },
                    ].map((step) => (
                      <div key={step.num} className="rounded-lg border border-[#F2F2F2] p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[20px] font-bold" style={{ color: `${step.color}30` }}>{step.num}</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">{step.title}</h3>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.7] mb-3" dangerouslySetInnerHTML={{ __html: step.desc }} />
                        <div className="space-y-1.5">
                          {step.items.map((item, i) => (
                            <div key={i} className="flex items-start gap-2 text-[11px] text-[#666] leading-[1.6]">
                              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" style={{ color: step.color }}><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              <span dangerouslySetInnerHTML={{ __html: item }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un point important : le niveau de HubSpot requis impacte directement ce que vous pouvez tracker. Avec le plan gratuit ou Starter, vous avez acces aux rapports standards et a un nombre limite de rapports custom. Sales Hub Pro debloque le forecasting, les sequences et les rapports avances. Operations Hub Pro est necessaire pour les proprietes calculees cross-objects. Evaluez vos besoins avant d&apos;investir dans un plan superieur.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 9 : KPIs selon votre stade ===================== */}
              <section id="kpi-par-stade" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les KPI qui comptent selon votre stade de croissance</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Tous les KPI n&apos;ont pas la meme importance a chaque etape de la vie de votre entreprise. Une startup en pre-seed n&apos;a pas besoin de mesurer le NRR. Une scale-up a 50 commerciaux ne peut plus se contenter de suivre le nombre d&apos;appels. Voici notre grille de priorites par stade.</p>
                  </div>

                  <div className="space-y-5">
                    {/* Early Stage */}
                    <div className="rounded-lg border border-[#E8F5E9] bg-[#F6FBF6] p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-sm bg-[#22C55E]" />
                        <h3 className="text-[14px] font-semibold text-[#111]">Early Stage (0-10 commerciaux, &lt;1M ARR)</h3>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">A ce stade, la priorite est de valider le product-market fit et de trouver un process de vente repeatable. Vous n&apos;avez pas besoin de 25 KPI. Concentrez-vous sur 6 a 8 indicateurs essentiels qui repondent a la question : est-ce que notre approche commerciale fonctionne ?</p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Win rate", "Cycle de vente", "Pipeline volume", "Meetings reserves", "New business revenue", "Lead-to-customer rate", "Time to first contact", "Proposals sent"].map((k) => (
                          <span key={k} className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#22C55E]/10 text-[10px] font-medium text-[#22C55E] border border-[#22C55E]/20">{k}</span>
                        ))}
                      </div>
                      <p className="text-[11px] text-[#999] leading-[1.6] mt-3">Focus : est-ce que les deals closent ? A quelle vitesse ? D&apos;ou viennent les meilleurs clients ? Le reste viendra plus tard.</p>
                    </div>

                    {/* Scale-up */}
                    <div className="rounded-lg border border-[#E8EAF6] bg-[#F5F6FF] p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-sm bg-[#4B5EFC]" />
                        <h3 className="text-[14px] font-semibold text-[#111]">Scale-up (10-50 commerciaux, 1-10M ARR)</h3>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Le process est valide, maintenant il faut le scaler. Les KPI de productivite et de qualite deviennent critiques. Vous devez comparer les performances entre reps, entre equipes, et vous assurer que la croissance de l&apos;equipe ne dilue pas l&apos;efficacite. Le CAC et le LTV/CAC entrent en jeu.</p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Tous les KPI early stage", "Pipeline velocity", "Pipeline coverage", "CAC", "LTV / CAC", "Revenue par rep", "SQL acceptance rate", "Forecast accuracy", "MRR / ARR", "Churn rate", "Conversion par stage", "Data completeness"].map((k) => (
                          <span key={k} className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#4B5EFC]/10 text-[10px] font-medium text-[#4B5EFC] border border-[#4B5EFC]/20">{k}</span>
                        ))}
                      </div>
                      <p className="text-[11px] text-[#999] leading-[1.6] mt-3">Focus : est-ce que le modele est rentable ? Est-ce que la qualite tient quand on scale ? Ou sont les goulots d&apos;etranglement ?</p>
                    </div>

                    {/* Enterprise */}
                    <div className="rounded-lg border border-[#EDE7F6] bg-[#F8F5FF] p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-sm bg-[#6C5CE7]" />
                        <h3 className="text-[14px] font-semibold text-[#111]">Enterprise (50+ commerciaux, 10M+ ARR)</h3>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">A ce niveau, tous les 25 KPI sont pertinents. L&apos;enjeu n&apos;est plus de savoir quoi mesurer mais comment le mesurer de maniere fiable a grande echelle. La data quality, le NRR, le forecast accuracy et l&apos;expansion revenue deviennent les indicateurs differenciants. L&apos;equipe RevOps est indispensable.</p>
                      <div className="flex flex-wrap gap-1.5">
                        {["Les 25 KPI", "NRR", "Expansion revenue", "Forecast accuracy", "Data completeness", "Cohort analysis", "Segment-level metrics"].map((k) => (
                          <span key={k} className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#6C5CE7]/10 text-[10px] font-medium text-[#6C5CE7] border border-[#6C5CE7]/20">{k}</span>
                        ))}
                      </div>
                      <p className="text-[11px] text-[#999] leading-[1.6] mt-3">Focus : est-ce que la machine est previsible ? Est-ce que la retention compense l&apos;investissement en acquisition ? Ou investir le prochain euro ?</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] text-[#666] leading-[1.7]">
                      <strong className="text-[#111]">Regle d&apos;or :</strong> ne mesurez jamais un KPI sans avoir defini en amont qui le suit, a quelle frequence, et quelle action est declenchee quand il sort de la zone acceptable. Un KPI sans proprietaire et sans seuil d&apos;alerte est un chiffre de plus dans un tableau que personne ne regarde.
                    </p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 10 : Notre dashboard chez Ceres (dark section) ===================== */}
              <section id="setup-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Notre approche</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Notre dashboard commercial chez Ceres</h2>
                  <div className="space-y-3 text-[12px] text-white/50 leading-[1.75]">
                    <p>Chez Ceres, on a deploye des systemes de KPI commerciaux pour une trentaine de clients B2B. Le constat est toujours le meme : les equipes qui performent ne sont pas celles qui mesurent le plus de choses, mais celles qui mesurent les bonnes choses et agissent dessus.</p>
                    <p>Notre approche se resume en trois principes. Premierement, commencer avec 8 KPI maximum et ajouter les autres progressivement. Deuxiemement, chaque KPI a un proprietaire designe (le manager, le rep ou le RevOps). Troisiemement, chaque KPI est associe a un seuil d&apos;alerte et a une action concrete quand ce seuil est franchi.</p>
                    <p>Le setup complet prend 1 a 2 semaines selon la maturite CRM du client. Ca inclut l&apos;audit des donnees existantes, la creation des proprietes custom, la configuration des rapports et dashboards, la mise en place des workflows d&apos;alerte et la formation de l&apos;equipe.</p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Clients equipes", value: "32", color: "#22C55E" },
                      { label: "KPI par client (moy.)", value: "12", color: "#4B5EFC" },
                      { label: "Precision forecast", value: "89%", color: "#22C55E" },
                      { label: "Adoption du dashboard", value: "94%", color: "#6C5CE7" },
                    ].map((s) => (
                      <div key={s.label} className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-[20px] font-bold" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-[10px] text-white/35 mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {[
                      "Audit complet de votre CRM et de vos donnees existantes",
                      "Selection des KPI adaptes a votre stade et vos objectifs",
                      "Creation des proprietes custom et des rapports personnalises",
                      "Construction de 3 a 4 dashboards thematiques dans HubSpot",
                      "Configuration des workflows d&apos;alerte automatiques",
                      "Formation de l&apos;equipe commerciale et du management (2h)",
                      "Documentation interne et guide de reference des KPI",
                      "Support pendant 30 jours apres le deploiement",
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
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour mettre en place vos KPI commerciaux ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[460px] mx-auto">On deploie votre systeme de KPI complet en 1 a 2 semaines : audit CRM, proprietes custom, dashboards, alertes automatiques et formation equipe.</p>
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