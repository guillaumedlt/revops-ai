"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Les metriques RevOps : 30 indicateurs pour piloter votre revenue engine",
  description: "Guide complet des 30 metriques RevOps essentielles en 2026. Pour chaque indicateur : definition, formule, benchmark et ce qu&apos;il revele. Acquisition, pipeline, closing, revenue, retention et efficacite operationnelle. Avec dashboard mockup et framework de priorisation.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-08",
  dateModified: "2026-03-08",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/metriques-revops-indicateurs-performance" },
  articleSection: "RevOps",
  wordCount: 3500,
  inLanguage: "fr",
};

const sections = [
  { id: "pourquoi-differentes", title: "Pourquoi c&apos;est different" },
  { id: "metriques-acquisition", title: "Acquisition (6)" },
  { id: "metriques-pipeline", title: "Pipeline (6)" },
  { id: "metriques-closing", title: "Closing (5)" },
  { id: "metriques-revenue", title: "Revenue (5)" },
  { id: "metriques-retention", title: "Retention (4)" },
  { id: "metriques-efficacite", title: "Efficacite ops (4)" },
  { id: "dashboard-revops", title: "Dashboard ideal" },
  { id: "prioriser-par-stade", title: "Prioriser par stade" },
  { id: "framework-ceres", title: "Framework Ceres" },
];

const relatedArticles = [
  { title: "KPI commerciaux : les 25 indicateurs de vente a suivre en 2026", slug: "kpi-commerciaux-indicateurs-vente", category: "Data & Reporting", color: "#22C55E" },
  { title: "Comment gerer votre MRR dans HubSpot : le guide complet", slug: "gerer-mrr-revenu-recurrent-hubspot", category: "Data & Reporting", color: "#4B5EFC" },
  { title: "Data quality CRM : audit et nettoyage en 5 etapes", slug: "data-quality-crm-audit-nettoyage", category: "Data & Reporting", color: "#6C5CE7" },
];

export default function MetriquesRevopsArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("pourquoi-differentes");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "4%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "14%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "28%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "42%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.07, filter: "blur(70px)" }} />
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
                        ? "border-[#FF7A59] text-[#111] font-medium"
                        : "border-transparent text-[#999] hover:text-[#666] hover:border-[#DDD]"
                    }`}
                    dangerouslySetInnerHTML={{ __html: s.title }}
                  />
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-[#F2F2F2]">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Partager</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors cursor-pointer">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.04a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L5.25 9.068" /></svg>
                  </button>
                  <a href="https://twitter.com/intent/tweet?text=Les%20metriques%20RevOps%20%3A%2030%20indicateurs%20pour%20piloter%20votre%20revenue%20engine&url=https://www.ceres-revops.com/blog/metriques-revops-indicateurs-performance" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/metriques-revops-indicateurs-performance" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Metriques RevOps</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>RevOps</Badge>
                <span className="text-[11px] text-[#CCC]">16 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Les metriques RevOps : 30 indicateurs pour piloter votre revenue engine
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                CAC, pipeline velocity, NRR, churn rate, automation rate. Les equipes RevOps performantes ne pilotent pas uniquement les ventes. Elles mesurent l&apos;integralite du revenue engine, de l&apos;acquisition a la retention en passant par l&apos;efficacite operationnelle. Ce guide detaille les 30 metriques RevOps essentielles, organisees par fonction, avec pour chacune la definition, la formule de calcul, un benchmark marche et ce qu&apos;elle revele reellement sur la sante de votre organisation.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>8 mars 2026</span>
              </div>

              {/* Quick overview */}
              <div className="mt-8 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                <span className="text-[13px] font-semibold text-[#111] mb-4 block">Ce que vous allez decouvrir</span>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                  {[
                    { label: "Acquisition", value: "6", color: "#FF7A59" },
                    { label: "Pipeline", value: "6", color: "#4B5EFC" },
                    { label: "Closing", value: "5", color: "#6C5CE7" },
                    { label: "Revenue", value: "5", color: "#22C55E" },
                    { label: "Retention", value: "4", color: "#F59E0B" },
                    { label: "Efficacite ops", value: "4", color: "#EF4444" },
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
              {/* ===================== SECTION 1 : Pourquoi les metriques RevOps sont differentes ===================== */}
              <section id="pourquoi-differentes" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi les metriques RevOps sont differentes des KPI sales classiques</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La plupart des entreprises B2B suivent des KPI commerciaux : pipeline, win rate, nombre d&apos;appels, quota attainment. C&apos;est necessaire mais insuffisant. Ces indicateurs ne couvrent qu&apos;un tiers de l&apos;equation. Ils mesurent la performance de l&apos;equipe de vente. Pas celle du revenue engine dans son ensemble.</p>
                    <p>Le RevOps, par definition, embrasse l&apos;ensemble du cycle de revenu. De la premiere interaction marketing jusqu&apos;au renouvellement du contrat, en passant par la vente, l&apos;onboarding et l&apos;expansion. Le probleme des KPI sales classiques, c&apos;est qu&apos;ils creent des angles morts. Vous savez que votre win rate est a 22%. Mais savez-vous combien coute l&apos;acquisition d&apos;un lead qualifie ? Combien de temps il faut pour que ce lead devienne un MQL ? Quel est votre taux de retention net apres 12 mois ? Quel pourcentage de vos processus sont automatises ?</p>
                    <p>Sans ces reponses, vous optimisez une partie du systeme tout en ignorant le reste. Vous pouvez avoir un win rate exceptionnel et une retention catastrophique. Un CAC faible et un time to value qui tue l&apos;experience client. Un pipeline sain et un tech stack qui coute plus cher que ce qu&apos;il rapporte.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        title: "Les KPI sales mesurent l&apos;equipe de vente",
                        detail: "Pipeline, win rate, activites, quota attainment. Ce sont des indicateurs de performance commerciale pure. Ils repondent a la question : est-ce que mes commerciaux performent ? C&apos;est essentiel mais partiel.",
                        color: "#FF7A59",
                      },
                      {
                        title: "Les metriques RevOps mesurent le systeme de revenu",
                        detail: "Acquisition, conversion, revenue, retention, efficacite operationnelle. Elles repondent a une question plus large : est-ce que notre machine a generer du revenu est saine, efficace et scalable ? C&apos;est la difference entre mesurer un joueur et mesurer l&apos;equipe entiere.",
                        color: "#4B5EFC",
                      },
                      {
                        title: "Le RevOps connecte les silos",
                        detail: "Marketing genere des leads. Sales les convertit. Customer Success les retient. Sans metriques transverses, chaque equipe optimise son propre perimetre sans vision globale. Le CAC n&apos;a de sens que rapporte au LTV. Le pipeline velocity n&apos;a de sens que rapporte au NRR.",
                        color: "#22C55E",
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
                    <p>Ce guide est structure en 6 categories qui couvrent l&apos;integralite du revenue engine. Chaque metrique suit le meme format : definition, formule de calcul, benchmark marche pour le B2B SaaS et ce qu&apos;elle revele concretement sur votre business. L&apos;objectif n&apos;est pas de tout tracker des demain. C&apos;est de comprendre le referentiel complet pour selectionner les 10 a 15 metriques qui correspondent a votre stade de croissance.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 2 : Metriques d&apos;acquisition (6) ===================== */}
              <section id="metriques-acquisition" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#FF7A59]" />
                    <span className="text-[11px] font-semibold text-[#FF7A59] uppercase tracking-wider">Categorie 1 / 6</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Metriques d&apos;acquisition (6 indicateurs)</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">L&apos;acquisition est le sommet du funnel. Ces metriques mesurent l&apos;efficacite avec laquelle votre organisation transforme des inconnus en prospects qualifies. Un dysfonctionnement ici se repercute sur l&apos;ensemble du revenue engine en aval.</p>

                  <div className="space-y-5">
                    {/* Metrique 1 — CAC */}
                    <div className="rounded-lg border border-[#FFE8E0] bg-[#FFF8F6] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#FF7A59] w-5 h-5 rounded-md flex items-center justify-center">1</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Customer Acquisition Cost (CAC)</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FF7A59]/10 text-[#FF7A59]">Critical</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Cout total pour acquerir un nouveau client, incluant les depenses marketing et commerciales. Le CAC est la metrique fondatrice de toute analyse d&apos;acquisition. Il ne suffit pas de generer du revenu, il faut le generer de maniere rentable. Un CAC qui augmente trimestre apres trimestre sans que le LTV suive est le signe d&apos;un modele qui s&apos;essouffle.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">CAC = (Depenses marketing + Depenses sales) / Nombre de nouveaux clients</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <div><span className="text-[#999]">Benchmark B2B SaaS :</span> <strong className="text-[#111]">Ratio LTV:CAC superieur a 3:1</strong></div>
                      </div>
                      <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Ce que ca revele</span>
                        <p className="text-[11px] text-[#666] mt-1 leading-[1.6]">Un CAC eleve peut indiquer un ciblage trop large, des canaux d&apos;acquisition inefficaces, un cycle de vente trop long ou un manque d&apos;alignement marketing-sales. Segmentez-le par canal, par segment client et par cohorte pour identifier les leviers d&apos;optimisation.</p>
                      </div>
                    </div>

                    {/* Metrique 2 — CPL */}
                    <div className="rounded-lg border border-[#FFE8E0] bg-[#FFF8F6] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#FF7A59] w-5 h-5 rounded-md flex items-center justify-center">2</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Cout par lead (CPL)</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FF7A59]/10 text-[#FF7A59]">Essentiel</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Cout moyen pour generer un lead, tout canal confondu ou par canal specifique. Le CPL est la decomposition du CAC au niveau du funnel superieur. Il permet de comparer l&apos;efficacite economique de vos differents canaux d&apos;acquisition : inbound, outbound, paid, events, referral.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">CPL = Depenses marketing du canal / Nombre de leads generes par ce canal</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]">Inbound : 30-80 EUR | Paid : 50-200 EUR | Events : 100-400 EUR</strong></div>
                      </div>
                      <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Ce que ca revele</span>
                        <p className="text-[11px] text-[#666] mt-1 leading-[1.6]">Un CPL isole n&apos;a pas de sens. Il doit etre rapporte a la qualite du lead (taux de conversion en MQL puis en client). Un canal a CPL eleve mais a taux de conversion fort peut etre plus rentable qu&apos;un canal a CPL faible mais a conversion mediocre.</p>
                      </div>
                    </div>

                    {/* Metrique 3 — Taux de conversion par canal */}
                    <div className="rounded-lg border border-[#FFE8E0] bg-[#FFF8F6] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#FF7A59] w-5 h-5 rounded-md flex items-center justify-center">3</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Taux de conversion par canal</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FF7A59]/10 text-[#FF7A59]">Essentiel</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Pourcentage de visiteurs ou de prospects qui se convertissent en leads qualifies, segmente par canal d&apos;acquisition. Cette metrique revele la qualite reelle de chaque source de trafic. Deux canaux peuvent generer le meme volume de leads mais avec des taux de conversion radicalement differents vers le MQL et le SQL.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">Conversion canal = Leads qualifies du canal / Total leads du canal x 100</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]">Organic : 2-5% | Paid : 3-8% | Referral : 5-15%</strong></div>
                      </div>
                      <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Ce que ca revele</span>
                        <p className="text-[11px] text-[#666] mt-1 leading-[1.6]">Un canal avec un taux de conversion en baisse peut signaler un changement dans la qualite de l&apos;audience, un message decale par rapport a l&apos;ICP, ou un probleme technique (landing page, formulaire). C&apos;est le premier signal d&apos;alerte avant que le CPL et le CAC ne degradent.</p>
                      </div>
                    </div>

                    {/* Metrique 4 — Volume MQL */}
                    <div className="rounded-lg border border-[#FFE8E0] bg-[#FFF8F6] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#FF7A59] w-5 h-5 rounded-md flex items-center justify-center">4</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Volume de MQL</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FF7A59]/10 text-[#FF7A59]">Essentiel</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Nombre de Marketing Qualified Leads generes sur une periode donnee. Le volume de MQL est le pouls de votre machine d&apos;acquisition. C&apos;est le carburant brut qui alimente le pipeline. Un volume de MQL en baisse se traduit mecaniquement par un pipeline en contraction 30 a 60 jours plus tard.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">Volume MQL = Nombre de leads atteignant le statut MQL sur la periode</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]">Croissance MoM de 5 a 15% selon stade de maturite</strong></div>
                      </div>
                      <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Ce que ca revele</span>
                        <p className="text-[11px] text-[#666] mt-1 leading-[1.6]">Le volume brut ne suffit pas. Croisez-le avec le taux de conversion MQL-to-SQL pour evaluer la qualite. Un volume de MQL en hausse mais un taux de conversion en baisse signifie que vos criteres de qualification sont trop laxistes ou que votre lead scoring a besoin d&apos;un recalibrage.</p>
                      </div>
                    </div>

                    {/* Metrique 5 — Lead Velocity Rate */}
                    <div className="rounded-lg border border-[#FFE8E0] bg-[#FFF8F6] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#FF7A59] w-5 h-5 rounded-md flex items-center justify-center">5</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Lead Velocity Rate (LVR)</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#EF4444]/10 text-[#EF4444]">Critical</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Taux de croissance mensuel du nombre de leads qualifies. Le LVR est considere par beaucoup de VCs et de dirigeants SaaS comme le meilleur predicteur de croissance future. Contrairement au MRR qui est un indicateur overduee, le LVR est un indicateur avance. Si votre LVR est positif et constant, votre revenu futur est quasiment assure.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">LVR = (MQL ce mois - MQL mois precedent) / MQL mois precedent x 100</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]">LVR positif et stable (&gt;10% = croissance forte)</strong></div>
                      </div>
                      <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Ce que ca revele</span>
                        <p className="text-[11px] text-[#666] mt-1 leading-[1.6]">Un LVR negatif sur 2 mois consecutifs est un signal d&apos;alerte majeur. Cela signifie que votre pipeline futur va se contracter, meme si votre MRR actuel est en hausse. C&apos;est la metrique qui permet d&apos;anticiper les creux de revenu avant qu&apos;ils ne se materialisent.</p>
                      </div>
                    </div>

                    {/* Metrique 6 — Time to MQL */}
                    <div className="rounded-lg border border-[#FFE8E0] bg-[#FFF8F6] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#FF7A59] w-5 h-5 rounded-md flex items-center justify-center">6</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Time to MQL</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FF7A59]/10 text-[#FF7A59]">Important</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Duree moyenne entre la premiere interaction d&apos;un lead et son passage au statut MQL. Le time to MQL mesure l&apos;efficacite de votre nurturing. Un time to MQL court indique que vos contenus, vos sequences et votre lead scoring fonctionnent bien. Un time to MQL long peut signaler un decalage entre votre contenu et les attentes de votre audience.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">Time to MQL = Medium(Date MQL - Date de creation du contact)</p>
                      </div>
                      <div className="flex items-center gap-4 text-[11px]">
                        <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]">Inbound : 7-14 jours | Outbound : 21-45 jours</strong></div>
                      </div>
                      <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Ce que ca revele</span>
                        <p className="text-[11px] text-[#666] mt-1 leading-[1.6]">Si votre time to MQL s&apos;allonge, regardez vos sequences de nurturing, vos criteres de scoring et la pertinence de vos contenus. Un time to MQL qui passe de 10 a 25 jours signifie que vous attirez des leads moins qualifies ou que votre processus de maturation s&apos;enlise.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 3 : Metriques de pipeline (6) ===================== */}
              <section id="metriques-pipeline" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#4B5EFC]" />
                    <span className="text-[11px] font-semibold text-[#4B5EFC] uppercase tracking-wider">Categorie 2 / 6</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Metriques de pipeline (6 indicateurs)</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Le pipeline est le coeur du revenue engine. Ces 6 metriques vous donnent une vision complete de la vitesse, de la couverture et de la qualite de conversion de vos opportunites en cours. Un pipeline sain est un pipeline qui avance vite, qui est suffisamment couvert et dont les taux de conversion sont stables.</p>

                  <div className="space-y-5">
                    {[
                      {
                        num: "7",
                        title: "Pipeline velocity",
                        definition: "Mesure la vitesse a laquelle votre pipeline genere du revenu. La pipeline velocity combine quatre variables en une seule metrique : nombre d&apos;opportunites, montant moyen, win rate et duree du cycle. C&apos;est l&apos;indicateur synthetique le plus puissant pour evaluer la sante globale de votre pipeline.",
                        formula: "Velocity = (Nb opportunites x Montant moyen x Win rate) / Duree cycle (jours)",
                        benchmark: "Croissance MoM positive = pipeline sain",
                        reveals: "Une velocity en baisse indique qu&apos;au moins une des 4 composantes se degrade. Decomposez-la pour identifier laquelle. Si le montant moyen baisse, c&apos;est un probleme de positionnement. Si le cycle s&apos;allonge, c&apos;est un probleme de processus.",
                      },
                      {
                        num: "8",
                        title: "Pipeline coverage ratio",
                        definition: "Ratio entre la valeur totale du pipeline ouvert et le quota a atteindre sur la periode. Le pipeline coverage est le thermometre de votre capacite a atteindre vos objectifs. En dessous de 3x, la probabilite d&apos;atteindre le quota chute drastiquement, quel que soit le talent de vos commerciaux.",
                        formula: "Pipeline Coverage = Volume pipeline ouvert / Quota de la periode",
                        benchmark: "3x minimum, 4x ideal, 5x+ = pipeline gonfle a nettoyer",
                        reveals: "Un coverage trop faible est un probleme d&apos;acquisition ou de generation de pipeline. Un coverage trop eleve (au-dessus de 6x) signifie que des deals zombie encombrent votre pipeline et faussent vos previsions. Les deux sont problematiques.",
                      },
                      {
                        num: "9",
                        title: "Taux de conversion par stage",
                        definition: "Pourcentage de deals qui passent d&apos;une etape du pipeline a la suivante. C&apos;est l&apos;indicateur qui vous permet de localiser exactement ou votre pipeline fuit. Chaque transition entre stages est un point de friction potentiel. Mesurer chacun permet d&apos;identifier les goulots d&apos;etranglement.",
                        formula: "Conversion Stage N = Deals entrant Stage N+1 / Deals entrant Stage N x 100",
                        benchmark: "Qualification vers Demo : 50-60% | Demo vers Proposal : 40-50% | Proposal vers Won : 30-40%",
                        reveals: "Un taux de conversion anormalement bas sur une transition specifique pointe vers un probleme precis. Demo vers Proposal faible = votre demo ne convainc pas. Proposal vers Won faible = vos propositions commerciales ne sont pas calibrees ou la concurrence est trop forte.",
                      },
                      {
                        num: "10",
                        title: "Sales cycle (duree du cycle de vente)",
                        definition: "Duree moyenne entre la creation d&apos;une opportunite et son closing (won ou lost). Le sales cycle impacte directement la pipeline velocity et la predictibilite de votre revenu. Un cycle long immobilise vos commerciaux, reduit leur capacite a traiter de nouveaux deals et complique le forecasting.",
                        formula: "Sales Cycle = Medium(Date closing - Date creation opportunite)",
                        benchmark: "SMB : 14-30 jours | Mid-Market : 30-90 jours | Enterprise : 90-180 jours",
                        reveals: "Un cycle qui s&apos;allonge peut signaler des deals mal qualifies qui trainent, un processus de decision client qui se complexifie, ou un manque de pression commerciale. Segmentez par taille de deal et par segment pour identifier les causes.",
                      },
                      {
                        num: "11",
                        title: "Average Contract Value (ACV)",
                        definition: "Valeur annuelle moyenne des contrats signes. L&apos;ACV revele votre positionnement marche et l&apos;evolution de votre strategie commerciale. Une ACV en hausse peut indiquer un mouvement vers l&apos;enterprise, une montee en gamme produit ou une meilleure capacite a vendre de la valeur.",
                        formula: "ACV = Total revenu annuel Closed Won / Nombre de deals Closed Won",
                        benchmark: "SMB : 5-15K EUR | Mid-Market : 25-80K EUR | Enterprise : 100K+ EUR",
                        reveals: "Un ACV en baisse systematique signale une erosion des prix, une concurrence accrue sur le segment ou un manque de formation des commerciaux a la vente de valeur. Croisez avec le discount rate pour comprendre si c&apos;est un probleme de pricing ou de negociation.",
                      },
                      {
                        num: "12",
                        title: "Weighted pipeline (pipeline pondere)",
                        definition: "Valeur du pipeline ajustee par la probabilite de closing de chaque deal selon son stage actuel. Le pipeline brut est un chiffre trompeur car il traite un deal en discovery et un deal en negociation comme equivalents. Le weighted pipeline donne une image bien plus realiste du revenu a attendre.",
                        formula: "Weighted Pipeline = SUM(Montant deal x Probabilite du stage)",
                        benchmark: "Le weighted pipeline devrait representer 1.2x a 1.5x le quota pour etre confortable",
                        reveals: "Un ecart important entre pipeline brut et pipeline pondere indique que la majorite de vos deals sont dans les stages precoces. Si votre pipeline brut est a 5x mais votre weighted pipeline a 1x, vous avez beaucoup d&apos;opportunites peu matures et un risque eleve de sous-performance.",
                      },
                    ].map((kpi) => (
                      <div key={kpi.num} className="rounded-lg border border-[#E0E4FF] bg-[#F6F7FF] p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-white bg-[#4B5EFC] w-5 h-5 rounded-md flex items-center justify-center">{kpi.num}</span>
                            <h3 className="text-[14px] font-semibold text-[#111]">{kpi.title}</h3>
                          </div>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.7] mb-3" dangerouslySetInnerHTML={{ __html: kpi.definition }} />
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                          <p className="text-[13px] font-mono text-[#111] mt-1">{kpi.formula}</p>
                        </div>
                        <div className="flex items-center gap-4 text-[11px] mb-3">
                          <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]">{kpi.benchmark}</strong></div>
                        </div>
                        <div className="rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Ce que ca revele</span>
                          <p className="text-[11px] text-[#666] mt-1 leading-[1.6]" dangerouslySetInnerHTML={{ __html: kpi.reveals }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 4 : Metriques de closing (5) ===================== */}
              <section id="metriques-closing" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#6C5CE7]" />
                    <span className="text-[11px] font-semibold text-[#6C5CE7] uppercase tracking-wider">Categorie 3 / 6</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Metriques de closing (5 indicateurs)</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Le closing est le moment de verite. Ces 5 metriques mesurent l&apos;efficacite avec laquelle votre equipe transforme les opportunites en revenu signe. Elles revelent non seulement la performance individuelle des commerciaux mais aussi la qualite du processus de vente, du pricing et du positionnement concurrentiel.</p>

                  <div className="space-y-5">
                    {[
                      {
                        num: "13",
                        title: "Win rate",
                        definition: "Pourcentage de deals gagnes parmi tous les deals qui ont atteint un stade qualifie. Le win rate est le reflet direct de l&apos;efficacite commerciale. Un win rate en baisse sur plusieurs mois consecutifs est un signal d&apos;alerte qui merite une analyse approfondie : qualification, pricing, concurrence ou execution commerciale.",
                        formula: "Win Rate = Deals Closed Won / (Deals Closed Won + Deals Closed Lost) x 100",
                        benchmark: "20-30% (SMB) | 15-25% (Mid-Market) | 10-20% (Enterprise)",
                        reveals: "Comparez le win rate par rep, par segment et par source de lead. Les ecarts revelent des problemes specifiques. Si un rep a un win rate de 35% et un autre de 12%, le probleme n&apos;est pas le marche mais l&apos;execution.",
                      },
                      {
                        num: "14",
                        title: "Distribution des raisons de perte",
                        definition: "Repartition des motifs pour lesquels les deals sont perdus (budget, timing, concurrence, no decision, fonctionnalites). Cette metrique est souvent negligee alors qu&apos;elle contient les informations les plus actionnables. Si 40% de vos pertes sont dues au &ldquo;no decision&rdquo;, votre probleme n&apos;est pas la concurrence mais la qualification.",
                        formula: "Distribution = Nb deals perdus par raison / Total deals perdus x 100",
                        benchmark: "No decision : &lt;25% | Budget : &lt;20% | Concurrence : &lt;20% | Fonctionnalites : &lt;15%",
                        reveals: "Les raisons de perte sont votre roadmap d&apos;amelioration. No decision trop eleve = vous vendez a des gens qui n&apos;ont pas de douleur urgente. Concurrence trop elevee = votre differentiation n&apos;est pas claire. Budget = votre pricing ou votre vente de valeur est a revoir.",
                      },
                      {
                        num: "15",
                        title: "Discount rate (taux de remise moyen)",
                        definition: "Pourcentage moyen de remise accorde sur les deals signes par rapport au prix catalogue. Le discount rate est le thermometre de votre pouvoir de pricing. Un taux de remise qui augmente erode vos marges et envoie un signal negatif au marche sur la valeur percue de votre produit.",
                        formula: "Discount Rate = (Prix catalogue - Prix signe) / Prix catalogue x 100",
                        benchmark: "5-15% acceptable | &gt;20% = signal d&apos;alerte | &gt;30% = probleme structurel",
                        reveals: "Segmentez le discount rate par commercial pour identifier qui vend a prix et qui brade. Par segment pour voir si l&apos;enterprise negocie plus durement. Et par trimestre pour detecter une derive. Un discount rate en hausse progressive est souvent le signe d&apos;une pression concurrentielle croissante.",
                      },
                      {
                        num: "16",
                        title: "Proposal-to-close rate",
                        definition: "Pourcentage de propositions commerciales envoyees qui aboutissent a un deal signe. Cette metrique isole l&apos;efficacite de la derniere phase du cycle de vente. Si vous envoyez beaucoup de propositions mais en signez peu, le probleme est probablement dans le contenu de vos propositions, votre pricing ou votre capacite a creer de l&apos;urgence.",
                        formula: "Proposal-to-Close = Deals Closed Won / Propositions envoyees x 100",
                        benchmark: "40-60% pour les equipes performantes | &lt;30% = processus a revoir",
                        reveals: "Un ratio bas signale que vous envoyez des propositions trop tot (le prospect n&apos;est pas pret), trop souvent (sans qualification suffisante) ou que vos propositions ne convainquent pas (mauvais cadrage, pricing deconnecte de la valeur percue).",
                      },
                      {
                        num: "17",
                        title: "Competitive win rate",
                        definition: "Taux de victoire specifiquement sur les deals ou un concurrent identifie etait en competition. Le competitive win rate est distinct du win rate global car il exclut les deals perdus pour &ldquo;no decision&rdquo; ou &ldquo;budget&rdquo; et se concentre sur les face-a-face concurrentiels.",
                        formula: "Competitive Win Rate = Wins en competition / (Wins + Losses en competition) x 100",
                        benchmark: "50%+ face a chaque concurrent = position dominante",
                        reveals: "Suivez ce taux par concurrent nomme. Si votre win rate contre le Concurrent A est de 65% mais de 28% contre le Concurrent B, vous savez exactement ou concentrer votre effort de differentiation et vos battle cards.",
                      },
                    ].map((kpi) => (
                      <div key={kpi.num} className="rounded-lg border border-[#E8E0FF] bg-[#F8F6FF] p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-white bg-[#6C5CE7] w-5 h-5 rounded-md flex items-center justify-center">{kpi.num}</span>
                            <h3 className="text-[14px] font-semibold text-[#111]">{kpi.title}</h3>
                          </div>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.7] mb-3" dangerouslySetInnerHTML={{ __html: kpi.definition }} />
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                          <p className="text-[13px] font-mono text-[#111] mt-1">{kpi.formula}</p>
                        </div>
                        <div className="flex items-center gap-4 text-[11px] mb-3">
                          <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]">{kpi.benchmark}</strong></div>
                        </div>
                        <div className="rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Ce que ca revele</span>
                          <p className="text-[11px] text-[#666] mt-1 leading-[1.6]" dangerouslySetInnerHTML={{ __html: kpi.reveals }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 5 : Metriques de revenue (5) ===================== */}
              <section id="metriques-revenue" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#22C55E]" />
                    <span className="text-[11px] font-semibold text-[#22C55E] uppercase tracking-wider">Categorie 4 / 6</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Metriques de revenue (5 indicateurs)</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Les metriques de revenue sont le resultat final de votre revenue engine. Elles mesurent non seulement le volume de revenu genere mais aussi sa qualite, sa composition et sa durabilite. Pour un modele SaaS, comprendre la dynamique du MRR (nouveau, expansion, contraction, churn) est fondamental.</p>

                  <div className="space-y-5">
                    {[
                      {
                        num: "18",
                        title: "MRR / ARR (Monthly / Annual Recurring Revenue)",
                        definition: "Revenu recurrent mensuel ou annuel. Le MRR est la metrique fondamentale de tout business SaaS. Il mesure le revenu previsible et recurrent, hors one-shots. L&apos;ARR est simplement le MRR x 12. C&apos;est la metrique que regardent en premier les investisseurs, les boards et les equipes dirigeantes.",
                        formula: "MRR = SUM(montant mensuel de tous les abonnements actifs) | ARR = MRR x 12",
                        benchmark: "Croissance YoY de 50-100% en early stage, 30-50% en growth, 15-30% en scale-up",
                        reveals: "Le MRR brut ne suffit pas. Decomposez-le en 4 composantes : new MRR (nouveaux clients), expansion MRR (upsells et cross-sells), contraction MRR (downgrades) et churned MRR (clients perdus). Cette decomposition revele la dynamique reelle de votre revenu.",
                      },
                      {
                        num: "19",
                        title: "Net Revenue Retention (NRR)",
                        definition: "Pourcentage du revenu des clients existants conserve apres 12 mois, incluant expansion, contraction et churn. Le NRR est considere comme la metrique de qualite ultime d&apos;un business SaaS. Un NRR superieur a 100% signifie que vos clients existants depensent plus chaque annee, meme sans nouveau client.",
                        formula: "NRR = (MRR debut + Expansion - Contraction - Churn) / MRR debut x 100",
                        benchmark: "Best-in-class : &gt;120% | Bon : 100-120% | Problematique : &lt;100%",
                        reveals: "Un NRR inferieur a 100% signifie que votre base de clients retrecit en valeur. Meme si vous signez de nouveaux clients, vous courez apres votre ombre. C&apos;est le signe le plus clair d&apos;un probleme de product-market fit post-acquisition, d&apos;un onboarding defaillant ou d&apos;un manque de strategie d&apos;expansion.",
                      },
                      {
                        num: "20",
                        title: "Expansion rate",
                        definition: "Pourcentage du revenu additionnel genere par les clients existants via upsell, cross-sell ou augmentation d&apos;usage. L&apos;expansion est le moteur de croissance le plus efficient car il ne coute quasiment rien en acquisition. Les meilleures entreprises SaaS generent 30 a 40% de leur croissance via l&apos;expansion.",
                        formula: "Expansion Rate = Expansion MRR du mois / MRR debut du mois x 100",
                        benchmark: "Best-in-class : &gt;5% mensuel | Bon : 2-5% | A ameliorer : &lt;2%",
                        reveals: "Un expansion rate faible revele un manque de strategie d&apos;upsell structuree, un produit dont le pricing ne capture pas la valeur additionnelle, ou une equipe customer success trop focalisee sur la retention defensive au detriment de la croissance organique.",
                      },
                      {
                        num: "21",
                        title: "Contraction rate",
                        definition: "Pourcentage de revenu perdu par les clients qui downgrade leur abonnement sans partir completement. La contraction est un signal d&apos;alerte precoce. Les clients qui downgrade sont souvent des futurs churners. C&apos;est une perte de revenu insidieuse car elle ne declenche pas les memes alertes que le churn pur.",
                        formula: "Contraction Rate = Contraction MRR du mois / MRR debut du mois x 100",
                        benchmark: "Sain : &lt;1% mensuel | Attention : 1-2% | Critical : &gt;2%",
                        reveals: "Analysez les patterns de contraction. Quelles features les clients cessent-ils d&apos;utiliser avant de downgrade ? Quels segments sont les plus touches ? La contraction est souvent le meilleur feedback produit que vous pouvez obtenir. Chaque downgrade est une conversation a avoir.",
                      },
                      {
                        num: "22",
                        title: "Revenue per employee",
                        definition: "Revenu annuel genere divise par le nombre total d&apos;employes. Cet indicateur mesure l&apos;efficacite globale de votre organisation a generer du revenu. Il est particulierement utile pour comparer votre efficacite a des benchmarks sectoriels et pour planifier vos recrutements.",
                        formula: "Revenue per Employee = ARR / Nombre total d&apos;employes",
                        benchmark: "Early stage : 50-100K EUR | Growth : 100-200K EUR | Scale-up : 200-400K EUR",
                        reveals: "Un revenue per employee en baisse sur plusieurs trimestres signale que vous recrutez plus vite que votre revenu ne croit. C&apos;est un signal d&apos;alerte sur la scalabilite de votre organisation. Les entreprises les plus efficaces maintiennent ce ratio en hausse constante.",
                      },
                    ].map((kpi) => (
                      <div key={kpi.num} className="rounded-lg border border-[#E0F5E5] bg-[#F5FBF6] p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-white bg-[#22C55E] w-5 h-5 rounded-md flex items-center justify-center">{kpi.num}</span>
                            <h3 className="text-[14px] font-semibold text-[#111]">{kpi.title}</h3>
                          </div>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.7] mb-3" dangerouslySetInnerHTML={{ __html: kpi.definition }} />
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                          <p className="text-[13px] font-mono text-[#111] mt-1">{kpi.formula}</p>
                        </div>
                        <div className="flex items-center gap-4 text-[11px] mb-3">
                          <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]">{kpi.benchmark}</strong></div>
                        </div>
                        <div className="rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Ce que ca revele</span>
                          <p className="text-[11px] text-[#666] mt-1 leading-[1.6]" dangerouslySetInnerHTML={{ __html: kpi.reveals }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 6 : Metriques de retention (4) ===================== */}
              <section id="metriques-retention" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#F59E0B]" />
                    <span className="text-[11px] font-semibold text-[#F59E0B] uppercase tracking-wider">Categorie 5 / 6</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Metriques de retention (4 indicateurs)</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">La retention est la face cachee du revenue engine. Acquerir un client coute 5 a 7 fois plus cher que de le retenir. Ces 4 metriques mesurent votre capacite a conserver et a satisfaire votre base clients existante. Elles sont le reflet direct de votre product-market fit et de la qualite de votre experience client post-vente.</p>

                  <div className="space-y-5">
                    {[
                      {
                        num: "23",
                        title: "Churn rate (taux d&apos;attrition)",
                        definition: "Pourcentage de clients ou de revenu perdu sur une periode donnee. Le churn est l&apos;ennemi numero un de la croissance SaaS. Un churn eleve transforme votre acquisition en exercice de Sisyphe : vous recrutez de nouveaux clients mais votre base se vide par le bas. Distinguez le logo churn (nombre de clients) et le revenue churn (valeur perdue).",
                        formula: "Churn Rate = Clients perdus sur la periode / Clients au debut de la periode x 100",
                        benchmark: "Mensuel : &lt;2% | Annuel : &lt;10% (SMB) | Annuel : &lt;5% (Enterprise)",
                        reveals: "Un churn qui augmente est le signal le plus urgent a traiter. Analysez les cohortes : le churn est-il concentre sur les premiers mois (probleme d&apos;onboarding) ou apres le renouvellement (probleme de valeur percue) ? Les raisons de churn sont votre feuille de route produit et CS la plus fiable.",
                      },
                      {
                        num: "24",
                        title: "Gross Revenue Retention (GRR)",
                        definition: "Pourcentage du revenu des clients existants conserve apres 12 mois, sans compter l&apos;expansion. Le GRR isole votre capacite a retenir le revenu existant, independamment de votre capacite a vendre plus. C&apos;est le plancher de votre retention. Si votre GRR est a 80%, vous perdez 20% de votre base chaque annee avant meme de compter le churn pur.",
                        formula: "GRR = (MRR debut - Contraction - Churn) / MRR debut x 100",
                        benchmark: "Best-in-class : &gt;95% | Bon : 85-95% | A ameliorer : &lt;85%",
                        reveals: "Le GRR est la metrique que les investisseurs regardent en deuxieme apres le NRR. Un GRR inferieur a 85% indique un probleme structurel de product-market fit ou d&apos;experience client. Aucune strategie d&apos;expansion ne compense un GRR defaillant a long terme.",
                      },
                      {
                        num: "25",
                        title: "Net Promoter Score (NPS)",
                        definition: "Mesure de la satisfaction et de la loyaute client sur une echelle de -100 a 100. Le NPS est un indicateur de perception, pas de comportement reel. Mais il est fortement correle aux taux de retention et d&apos;expansion. Les promoteurs (score 9-10) ont un taux de renouvellement 2 a 3 fois superieur aux detracteurs (score 0-6).",
                        formula: "NPS = % Promoteurs (9-10) - % Detracteurs (0-6)",
                        benchmark: "B2B SaaS : &gt;40 = excellent | 20-40 = bon | &lt;20 = a ameliorer",
                        reveals: "Le NPS moyen ne suffit pas. Segmentez par cohorte, par segment client, par plan et par usage. Un NPS eleve chez les enterprise et bas chez les SMB revele que votre produit n&apos;est pas adapte a tous les segments. Les commentaires des detracteurs sont souvent plus utiles que le score lui-meme.",
                      },
                      {
                        num: "26",
                        title: "Time to Value (TTV)",
                        definition: "Duree entre la signature du contrat et le moment ou le client atteint son premier &ldquo;aha moment&rdquo; ou sa premiere valeur tangible. Le time to value est l&apos;indicateur le plus predictif du churn a 90 jours. Plus un client met de temps a percevoir de la valeur, plus la probabilite qu&apos;il churne est elevee.",
                        formula: "TTV = Medium(Date premier milestone atteint - Date de signature)",
                        benchmark: "Self-service : &lt;24h | SMB : &lt;7 jours | Enterprise : &lt;30 jours",
                        reveals: "Un TTV qui s&apos;allonge signale un onboarding trop complexe, un produit trop difficile a configurer ou un manque d&apos;accompagnement post-vente. Show less le TTV de 50% peut avoir un impact plus fort sur le churn que n&apos;importe quelle fonctionnalite produit.",
                      },
                    ].map((kpi) => (
                      <div key={kpi.num} className="rounded-lg border border-[#FFF0D0] bg-[#FFFBF0] p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-white bg-[#F59E0B] w-5 h-5 rounded-md flex items-center justify-center">{kpi.num}</span>
                            <h3 className="text-[14px] font-semibold text-[#111]" dangerouslySetInnerHTML={{ __html: kpi.title }} />
                          </div>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.7] mb-3" dangerouslySetInnerHTML={{ __html: kpi.definition }} />
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                          <p className="text-[13px] font-mono text-[#111] mt-1">{kpi.formula}</p>
                        </div>
                        <div className="flex items-center gap-4 text-[11px] mb-3">
                          <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]" dangerouslySetInnerHTML={{ __html: kpi.benchmark }} /></div>
                        </div>
                        <div className="rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Ce que ca revele</span>
                          <p className="text-[11px] text-[#666] mt-1 leading-[1.6]" dangerouslySetInnerHTML={{ __html: kpi.reveals }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 7 : Metriques d&apos;efficacite operationnelle (4) ===================== */}
              <section id="metriques-efficacite" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#EF4444]" />
                    <span className="text-[11px] font-semibold text-[#EF4444] uppercase tracking-wider">Categorie 6 / 6</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Metriques d&apos;efficacite operationnelle (4 indicateurs)</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Ces metriques sont specifiques au RevOps en tant que fonction. Elles mesurent l&apos;efficacite de votre infrastructure technique, de vos automatisations, de la qualite de vos donnees et de l&apos;adherence de vos equipes aux processus definis. C&apos;est ici que le RevOps se differencie le plus nettement du simple management commercial.</p>

                  <div className="space-y-5">
                    {[
                      {
                        num: "27",
                        title: "Tech stack ROI",
                        definition: "Ratio entre le cout annuel total de votre stack d&apos;outils (CRM, marketing automation, outreach, BI, integrations) et le revenu genere via ces outils. La plupart des entreprises B2B depensent entre 3 et 8% de leur ARR en outils go-to-market. Au-dela, la question de la consolidation ou de l&apos;optimisation se pose serieusement.",
                        formula: "Tech Stack ROI = ARR / Cout annuel total des outils go-to-market",
                        benchmark: "ROI &gt;10x = efficient | 5-10x = acceptable | &lt;5x = a optimiser",
                        reveals: "Un ROI faible revele une sur-outillage (trop d&apos;outils redondants), une sous-utilisation (licences payees mais pas utilisees) ou un manque d&apos;integration (les outils ne communiquent pas entre eux, creant des pertes de donnees et des processus manuels). Auditez l&apos;adoption reelle de chaque outil.",
                      },
                      {
                        num: "28",
                        title: "Automation rate",
                        definition: "Pourcentage des taches operationnelles repetitives qui sont automatisees versus executees manuellement. Le taux d&apos;automatisation mesure directement la maturite operationnelle de votre organisation. Les taches repetitives non automatisees sont du temps commercial gaspille et une source d&apos;erreurs humaines evitables.",
                        formula: "Automation Rate = Taches automatisees / Total taches operationnelles x 100",
                        benchmark: "Mature : &gt;70% | En progression : 40-70% | Immature : &lt;40%",
                        reveals: "Cartographiez vos processus par famille (lead routing, data entry, follow-up, reporting, notifications) et evaluez le taux d&apos;automatisation de chacun. Le gain de temps moyen est de 8 a 12 heures par commercial par semaine dans les organisations bien automatisees.",
                      },
                      {
                        num: "29",
                        title: "Data quality score",
                        definition: "Score composite mesurant la qualite des donnees dans votre CRM : completude des champs, fraicheur des donnees, taux de doublons, standardisation des formats. Les donnees sont le carburant de toutes vos metriques. Si la qualite des donnees est mauvaise, chaque metrique presentee dans cet article perd en fiabilite.",
                        formula: "Data Quality Score = (Completude + Exactitude + Fraicheur + Unicite) / 4",
                        benchmark: "&gt;85% = bon | 70-85% = acceptable | &lt;70% = nettoyage urgent",
                        reveals: "Un score de qualite en baisse sur plusieurs mois indique un relachement dans la discipline de saisie, un manque de validation automatique sur les champs critiques ou une absence de processus de maintenance. C&apos;est la metrique meta qui conditionne la fiabilite de toutes les autres.",
                      },
                      {
                        num: "30",
                        title: "Process adherence rate",
                        definition: "Pourcentage des equipes qui respectent les processus definis : mise a jour des deals dans les delais, qualification selon les criteres, utilisation des templates, suivi des sequences. Le meilleur processus du monde est inutile s&apos;il n&apos;est pas suivi. Cette metrique mesure l&apos;adoption reelle par les equipes terrain.",
                        formula: "Process Adherence = Actions conformes au processus / Total actions x 100",
                        benchmark: "&gt;80% = discipline solide | 60-80% = a renforcer | &lt;60% = processus inadapte ou non adopte",
                        reveals: "Un taux d&apos;adherence faible n&apos;est pas toujours un probleme de discipline. C&apos;est souvent le signe que le processus est trop complexe, mal documente ou qu&apos;il ne genere pas de valeur percue par les utilisateurs. Avant de renforcer la discipline, questionnez la pertinence du processus lui-meme.",
                      },
                    ].map((kpi) => (
                      <div key={kpi.num} className="rounded-lg border border-[#FFE0E0] bg-[#FFF6F6] p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-white bg-[#EF4444] w-5 h-5 rounded-md flex items-center justify-center">{kpi.num}</span>
                            <h3 className="text-[14px] font-semibold text-[#111]">{kpi.title}</h3>
                          </div>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.7] mb-3" dangerouslySetInnerHTML={{ __html: kpi.definition }} />
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                          <p className="text-[13px] font-mono text-[#111] mt-1">{kpi.formula}</p>
                        </div>
                        <div className="flex items-center gap-4 text-[11px] mb-3">
                          <div><span className="text-[#999]">Benchmark :</span> <strong className="text-[#111]" dangerouslySetInnerHTML={{ __html: kpi.benchmark }} /></div>
                        </div>
                        <div className="rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-3">
                          <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Ce que ca revele</span>
                          <p className="text-[11px] text-[#666] mt-1 leading-[1.6]" dangerouslySetInnerHTML={{ __html: kpi.reveals }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 8 : Dashboard RevOps ideal (dark section) ===================== */}
              <section id="dashboard-revops" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Dashboard ideal</span>
                  <h2 className="text-[17px] font-semibold text-white mb-2">Le RevOps dashboard ideal</h2>
                  <p className="text-[12px] text-white/50 leading-[1.75] mb-6">Voici une representation du dashboard RevOps que nous deployons chez nos clients. Contrairement a un dashboard commercial classique, il couvre l&apos;integralite du revenue engine : de l&apos;acquisition a la retention, en passant par le revenue waterfall et le health score operationnel.</p>

                  {/* Dashboard mockup - Row 1: Revenue Health Score */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Revenue Health Score -- Mars 2026</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] px-2 py-0.5 rounded bg-white/10 text-white/30">Periode : Ce mois</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-white/10 text-white/30">Segment : Tous</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[
                        { label: "ARR", value: "1.24M", change: "+18%", up: true, color: "#22C55E" },
                        { label: "NRR", value: "112%", change: "+3pts", up: true, color: "#22C55E" },
                        { label: "CAC Payback", value: "11mo", change: "-2mo", up: true, color: "#22C55E" },
                        { label: "Pipeline Velocity", value: "42K/j", change: "+8%", up: true, color: "#22C55E" },
                        { label: "Churn Rate", value: "1.2%", change: "-0.3pts", up: true, color: "#22C55E" },
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

                  {/* Dashboard mockup - Row 2: Revenue Waterfall + Funnel */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Revenue Waterfall */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold text-white/60">Revenue Waterfall (MRR)</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-[#22C55E]/20 text-[#22C55E]">Net +8.3K</span>
                      </div>
                      <div className="flex items-end gap-2 h-[120px] mb-2">
                        {[
                          { label: "Debut", value: 65, color: "#6C5CE7", height: 55 },
                          { label: "+New", value: 12, color: "#22C55E", height: 20 },
                          { label: "+Expansion", value: 8, color: "#4B5EFC", height: 14 },
                          { label: "-Contraction", value: -3, color: "#FF7A59", height: 10 },
                          { label: "-Churn", value: -2, color: "#EF4444", height: 7 },
                          { label: "Fin", value: 80, color: "#22C55E", height: 68 },
                        ].map((bar, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
                            <span className="text-[8px] text-white/30 font-mono">{bar.value > 0 ? `${bar.value}K` : `${bar.value}K`}</span>
                            <div
                              className="w-full rounded-sm"
                              style={{
                                height: `${bar.height}%`,
                                backgroundColor: bar.color,
                                opacity: i === 0 || i === 5 ? 1 : 0.7,
                              }}
                            />
                            <span className="text-[7px] text-white/20">{bar.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Full Funnel Conversion */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold text-white/60">Full-funnel conversion</span>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-white/10 text-white/30">Ce trimestre</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { stage: "Visitors", value: "24.5K", pct: 100, color: "#FF7A59" },
                          { stage: "Leads", value: "1,842", pct: 75, color: "#4B5EFC" },
                          { stage: "MQL", value: "612", pct: 50, color: "#6C5CE7" },
                          { stage: "SQL", value: "234", pct: 35, color: "#F59E0B" },
                          { stage: "Proposal", value: "98", pct: 22, color: "#FF7A59" },
                          { stage: "Won", value: "42", pct: 12, color: "#22C55E" },
                        ].map((s) => (
                          <div key={s.stage} className="flex items-center gap-2">
                            <span className="text-[9px] text-white/30 w-[50px] shrink-0">{s.stage}</span>
                            <div className="flex-1 h-3 rounded-sm bg-white/5 overflow-hidden">
                              <div className="h-full rounded-sm" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
                            </div>
                            <span className="text-[9px] text-white/40 font-mono w-[40px] text-right">{s.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dashboard mockup - Row 3: Acquisition efficiency + Retention health */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Acquisition efficiency */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <span className="text-[11px] font-semibold text-white/60 mb-3 block">Efficacite acquisition</span>
                      <div className="space-y-3">
                        {[
                          { label: "CAC", value: "2,840 EUR", target: "< 3,000", pct: 95, color: "#22C55E" },
                          { label: "CPL moyen", value: "68 EUR", target: "< 80", pct: 85, color: "#4B5EFC" },
                          { label: "LVR", value: "+12%", target: "> 10%", pct: 100, color: "#22C55E" },
                          { label: "Time to MQL", value: "9j", target: "< 14j", pct: 64, color: "#6C5CE7" },
                        ].map((a) => (
                          <div key={a.label}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[9px] text-white/40">{a.label}</span>
                              <span className="text-[9px] text-white/50 font-mono">{a.value} <span className="text-white/20">({a.target})</span></span>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${a.pct}%`, backgroundColor: a.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Retention health */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <span className="text-[11px] font-semibold text-white/60 mb-3 block">Sante retention</span>
                      <div className="space-y-2.5">
                        {[
                          { label: "GRR", value: "92%", color: "#22C55E" },
                          { label: "NRR", value: "112%", color: "#4B5EFC" },
                          { label: "Churn rate", value: "1.2%", color: "#22C55E" },
                          { label: "NPS", value: "+48", color: "#6C5CE7" },
                          { label: "Time to Value", value: "4.2 jours", color: "#FF7A59" },
                        ].map((r) => (
                          <div key={r.label} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: r.color }} />
                              <span className="text-[10px] text-white/40">{r.label}</span>
                            </div>
                            <span className="text-[11px] font-mono font-semibold" style={{ color: r.color }}>{r.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Dashboard mockup - Row 4: Ops Health + Revenue per channel */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Ops health gauges */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <span className="text-[11px] font-semibold text-white/60 mb-3 block">Sante operationnelle</span>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Data Quality", value: "87%", color: "#22C55E" },
                          { label: "Automation Rate", value: "72%", color: "#4B5EFC" },
                          { label: "Process Adherence", value: "81%", color: "#6C5CE7" },
                          { label: "Tech Stack ROI", value: "14x", color: "#FF7A59" },
                        ].map((g) => (
                          <div key={g.label} className="text-center p-2 rounded-lg bg-white/5">
                            <div className="text-[16px] font-bold" style={{ color: g.color }}>{g.value}</div>
                            <div className="text-[8px] text-white/25 mt-0.5">{g.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Revenue by channel */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <span className="text-[11px] font-semibold text-white/60 mb-3 block">Revenue par canal (ce trimestre)</span>
                      <div className="flex items-end gap-1.5 h-[80px]">
                        {[
                          { label: "Inbound", value: 65, color: "#22C55E" },
                          { label: "Outbound", value: 48, color: "#4B5EFC" },
                          { label: "Referral", value: 35, color: "#6C5CE7" },
                          { label: "Partner", value: 22, color: "#FF7A59" },
                          { label: "Expansion", value: 85, color: "#F59E0B" },
                        ].map((bar, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full rounded-sm"
                              style={{
                                height: `${bar.value}%`,
                                backgroundColor: bar.color,
                              }}
                            />
                            <span className="text-[7px] text-white/20">{bar.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 9 : Prioriser par stade de croissance ===================== */}
              <section id="prioriser-par-stade" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Comment prioriser vos metriques par stade de croissance</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Tracker 30 metriques des le premier jour n&apos;a aucun sens. Cela genere de la confusion, dilue l&apos;attention et surcharge vos dashboards. La bonne approche consiste a selectionner un ensemble de metriques adapte a votre stade de croissance et a l&apos;elargir progressivement a mesure que votre organisation murit.</p>
                    <p>Voici notre recommandation, validee aupres de plusieurs dizaines de clients B2B SaaS.</p>
                  </div>

                  <div className="mt-5 space-y-4">
                    {/* Early Stage */}
                    <div className="rounded-lg border border-[#F2F2F2] p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-sm bg-[#FF7A59]" />
                        <h3 className="text-[13px] font-semibold text-[#111]">Early Stage (0-1M ARR) -- 8 metriques</h3>
                      </div>
                      <p className="text-[12px] text-[#666] leading-[1.7] mb-3">A ce stade, la priorite est de valider le product-market fit et de construire un processus de vente reproductible. Concentrez-vous sur les metriques qui vous disent si votre acquisition fonctionne et si vos clients restent.</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["MRR/ARR", "CAC", "Win Rate", "Sales Cycle", "Churn Rate", "NPS", "MQL Volume", "Time to Value"].map((m) => (
                          <div key={m} className="text-[11px] text-[#555] bg-[#FAFAFA] rounded-lg px-3 py-2 text-center border border-[#F0F0F0]">{m}</div>
                        ))}
                      </div>
                    </div>

                    {/* Growth */}
                    <div className="rounded-lg border border-[#F2F2F2] p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-sm bg-[#4B5EFC]" />
                        <h3 className="text-[13px] font-semibold text-[#111]">Growth (1-5M ARR) -- 18 metriques</h3>
                      </div>
                      <p className="text-[12px] text-[#666] leading-[1.7] mb-3">Le product-market fit est valide. L&apos;enjeu est maintenant de scaler le revenue engine. Ajoutez les metriques de pipeline, d&apos;efficacite et de composition du revenu pour identifier les leviers de croissance.</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["+ Pipeline Velocity", "+ Coverage Ratio", "+ LVR", "+ NRR", "+ Expansion Rate", "+ ACV", "+ Conversion/stage", "+ Discount Rate", "+ Data Quality", "+ Automation Rate"].map((m) => (
                          <div key={m} className="text-[11px] text-[#555] bg-[#FAFAFA] rounded-lg px-3 py-2 text-center border border-[#F0F0F0]">{m}</div>
                        ))}
                      </div>
                    </div>

                    {/* Scale-up */}
                    <div className="rounded-lg border border-[#F2F2F2] p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-sm bg-[#22C55E]" />
                        <h3 className="text-[13px] font-semibold text-[#111]">Scale-up (5M+ ARR) -- 30 metriques</h3>
                      </div>
                      <p className="text-[12px] text-[#666] leading-[1.7] mb-3">A ce stade, l&apos;exhaustivite devient necessaire. Les decisions strategiques (recrutement, pricing, expansion geographique, investissement tech) necessitent un referentiel complet. Ajoutez les metriques avancees de closing, de retention et d&apos;operations.</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {["+ GRR", "+ Contraction Rate", "+ Competitive Win", "+ Revenue/Employee", "+ Proposal-to-Close", "+ Weighted Pipeline", "+ CPL par canal", "+ Conversion par canal", "+ Process Adherence", "+ Tech Stack ROI", "+ Loss Reasons", "+ Time to MQL"].map((m) => (
                          <div key={m} className="text-[11px] text-[#555] bg-[#FAFAFA] rounded-lg px-3 py-2 text-center border border-[#F0F0F0]">{m}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La regle d&apos;or : chaque metrique que vous ajoutez doit avoir un proprietaire designe, un seuil d&apos;alerte et une action concrete associee. Si vous ne savez pas quoi faire quand une metrique passe au rouge, elle ne sert a rien dans votre dashboard. Mieux vaut 8 metriques actionnees que 30 metriques observees passivement.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 10 : Framework Ceres (dark section) ===================== */}
              <section id="framework-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Notre approche</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Notre framework metriques RevOps chez Ceres</h2>
                  <div className="space-y-3 text-[12px] text-white/50 leading-[1.75]">
                    <p>Chez Ceres, on a deploye des systemes de metriques RevOps pour une quarantaine de clients B2B SaaS et services. Le constat est toujours le meme : les entreprises qui performent ne sont pas celles qui mesurent le plus de choses, mais celles qui mesurent les bonnes choses au bon moment et reagissent vite quand les indicateurs bougent.</p>
                    <p>Notre framework repose sur trois piliers. Premierement, le diagnostic : on cartographie le revenue engine complet du client pour identifier les angles morts de mesure. Deuxiemement, la priorisation : on selectionne les 10 a 15 metriques adaptees au stade de croissance, chacune avec un owner, un seuil et un playbook d&apos;action. Troisiemement, l&apos;activation : on deploie les dashboards, les alertes automatiques et la cadence de review (weekly, monthly, quarterly) pour que les metriques deviennent des leviers de decision et pas juste des chiffres affiches au mur.</p>
                    <p>Le deployment complet prend 2 a 3 semaines. Il inclut l&apos;audit des donnees existantes, la creation des proprietes custom dans HubSpot, la configuration des rapports, la construction des dashboards, la mise en place des workflows d&apos;alerte et la formation des equipes (RevOps, sales, marketing, CS).</p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Clients equipes", value: "42", color: "#22C55E" },
                      { label: "Metriques par client (moy.)", value: "14", color: "#4B5EFC" },
                      { label: "Adoption dashboard", value: "92%", color: "#22C55E" },
                      { label: "Amelioration NRR (moy.)", value: "+8pts", color: "#6C5CE7" },
                    ].map((s) => (
                      <div key={s.label} className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-[20px] font-bold" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-[10px] text-white/35 mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {[
                      "Audit complet du revenue engine : acquisition, pipeline, closing, retention, operations",
                      "Cartographie des donnees existantes et identification des angles morts",
                      "Selection des metriques adaptees au stade de croissance et aux priorites strategiques",
                      "Creation des proprietes custom, formules calculees et rapports personnalises dans HubSpot",
                      "Construction de 4 a 6 dashboards thematiques (acquisition, pipeline, revenue, retention, ops)",
                      "Configuration des workflows d&apos;alerte automatiques avec seuils personnalises",
                      "Definition de la cadence de review : weekly ops, monthly management, quarterly strategic",
                      "Formation des equipes RevOps, sales, marketing et CS (3h)",
                      "Documentation complete et playbooks d&apos;action par metrique",
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
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour deployer vos metriques RevOps ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[460px] mx-auto">On deploie votre systeme de metriques RevOps complet en 2 a 3 semaines : audit revenue engine, dashboards, alertes automatiques, cadence de review et formation equipes.</p>
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#FF7A59]" />Reserver un appel
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