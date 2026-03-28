"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Forecasting commercial : methodes, outils et bonnes pratiques",
  description: "Guide complet du forecasting commercial en 2026. Les 5 methodes de prevision (bottom-up, top-down, pipeline weighted, historical, IA predictive), les outils (HubSpot, Clari, Gong), les biais a eviter et le template de meeting forecast hebdomadaire.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-14",
  dateModified: "2026-03-14",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/forecasting-commercial-methodes-outils" },
  articleSection: "Data & Reporting",
  wordCount: 2900,
  inLanguage: "fr",
};

const sections = [
  { id: "pourquoi-forecasting", title: "Pourquoi le forecasting est critique" },
  { id: "cinq-methodes", title: "Les 5 methodes" },
  { id: "pipeline-weighted", title: "Pipeline weighted" },
  { id: "forecasting-hubspot", title: "Forecasting dans HubSpot" },
  { id: "mesurer-precision", title: "Mesurer la precision" },
  { id: "biais-forecasting", title: "Les biais du forecasting" },
  { id: "forecast-ia", title: "Forecast + IA" },
  { id: "meeting-forecast", title: "Meeting hebdomadaire" },
  { id: "outils-forecasting", title: "Les outils" },
  { id: "approche-ceres", title: "Notre approche chez Ceres" },
];

const relatedArticles = [
  { title: "KPI commerciaux : les 25 indicateurs de vente a suivre en 2026", slug: "kpi-commerciaux-indicateurs-vente", category: "Data & Reporting", color: "#22C55E" },
  { title: "Comment gerer votre MRR dans HubSpot : le guide complet", slug: "gerer-mrr-revenu-recurrent-hubspot", category: "Data & Reporting", color: "#22C55E" },
  { title: "IA et processus commercial : transformer la vente B2B", slug: "ia-processus-commercial-vente-b2b", category: "IA & Sales", color: "#6C5CE7" },
];

export default function ForecastingCommercialArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("pourquoi-forecasting");

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
                  <a href="https://twitter.com/intent/tweet?text=Forecasting%20commercial%20%3A%20methodes%2C%20outils%20et%20bonnes%20pratiques&url=https://www.ceres-revops.com/blog/forecasting-commercial-methodes-outils" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/forecasting-commercial-methodes-outils" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Forecasting commercial</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>Data &amp; Reporting</Badge>
                <span className="text-[11px] text-[#CCC]">15 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Forecasting commercial : methodes, outils et bonnes pratiques
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Un forecast fiable, c&apos;est la difference entre une entreprise qui anticipe et une entreprise qui subit. Pipeline weighted, bottom-up, top-down, IA predictive : ce guide detaille les 5 methodes de prevision commerciale, leurs forces et limites, les outils pour les mettre en place (HubSpot, Clari, Gong) et les biais cognitifs qui faussent vos projections. Avec en bonus le template du meeting de forecast hebdomadaire.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>14 mars 2026</span>
              </div>

              {/* Quick overview */}
              <div className="mt-8 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                <span className="text-[13px] font-semibold text-[#111] mb-4 block">Ce que vous allez decouvrir</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: "Methodes de forecast", value: "5", color: "#22C55E" },
                    { label: "Biais a eviter", value: "4", color: "#EF4444" },
                    { label: "Outils compares", value: "4", color: "#4B5EFC" },
                    { label: "Formules de calcul", value: "6", color: "#6C5CE7" },
                    { label: "Templates", value: "2", color: "#FF7A59" },
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
              {/* ===================== SECTION 1 : Pourquoi le forecasting est critique ===================== */}
              <section id="pourquoi-forecasting" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi le forecasting commercial est critique</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le forecasting commercial, c&apos;est l&apos;art de predire le revenu que votre equipe va generer sur une periode donnee. En theorie, c&apos;est simple. En pratique, 68% des entreprises B2B declarent que leurs previsions commerciales sont imprecises a plus de 10% (Gartner, 2025). Et les consequences d&apos;un mauvais forecast sont en cascade.</p>
                    <p>Un forecast trop optimiste entraine du surrecrutement, des investissements marketing surdimensionnes et un cash burn accelere. Un forecast trop conservateur freine la croissance : on sous-investit en recrutement, on rate des opportunites de marche, on laisse de l&apos;argent sur la table. Dans les deux cas, le resultat est le meme : des decisions basees sur des chiffres faux.</p>
                    <p>Le probleme n&apos;est pas un manque de donnees. Les CRM modernes comme HubSpot collectent chaque interaction, chaque mouvement de deal, chaque activite. Le probleme est un manque de methode. La plupart des equipes font leur forecast en demandant aux reps &ldquo;tu penses closer combien ce mois-ci ?&rdquo; et en additionnant les reponses. C&apos;est du wishful thinking, pas du forecasting.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        title: "Impact financier direct",
                        detail: "Une erreur de forecast de 15% sur un trimestre a 1M EUR de target, c&apos;est 150K EUR de deviation. Assez pour fausser votre plan de tresorerie, vos objectifs de recrutement et vos projections aux investisseurs.",
                        color: "#22C55E",
                      },
                      {
                        title: "Perte de credibilite interne",
                        detail: "Quand le VP Sales annonce 800K EUR au board et livre 620K EUR, la confiance s&apos;erode. Apres deux ou trois trimestres de miss, le management commence a appliquer un &ldquo;haircut&rdquo; systematique sur les chiffres, ce qui rend le forecast encore moins utile.",
                        color: "#4B5EFC",
                      },
                      {
                        title: "Decisions operationnelles faussees",
                        detail: "Le forecast alimente le capacity planning (combien de reps recruter), le budget marketing (combien investir en generation de leads), et la production (combien de customer success prevoir). Un forecast faux, c&apos;est toute la chaine qui deraille.",
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

                  {/* CSS Mockup : Forecast vs Actual vs Target */}
                  <div className="mt-6 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-semibold text-[#999] uppercase tracking-wider">Forecast vs Realise vs Target - Q1 2026</span>
                      <span className="text-[10px] text-[#CCC]">Visualisation</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { month: "Janvier", forecast: 280, actual: 310, target: 300, fW: "70%", aW: "77.5%", tW: "75%" },
                        { month: "Fevrier", forecast: 320, actual: 275, target: 300, fW: "80%", aW: "68.75%", tW: "75%" },
                        { month: "Mars", forecast: 350, actual: 340, target: 350, fW: "87.5%", aW: "85%", tW: "87.5%" },
                      ].map((m) => (
                        <div key={m.month}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-medium text-[#555]">{m.month}</span>
                            <div className="flex items-center gap-3 text-[10px] text-[#999]">
                              <span>Forecast: <strong className="text-[#4B5EFC]">{m.forecast}K</strong></span>
                              <span>Realise: <strong className="text-[#22C55E]">{m.actual}K</strong></span>
                              <span>Target: <strong className="text-[#999]">{m.target}K</strong></span>
                            </div>
                          </div>
                          <div className="relative h-5 rounded-md bg-[#F0F0F0] overflow-hidden">
                            <div className="absolute inset-y-0 left-0 rounded-md bg-[#4B5EFC]/20" style={{ width: m.fW }} />
                            <div className="absolute inset-y-0 left-0 rounded-md bg-[#22C55E]/40 h-3 top-1" style={{ width: m.aW }} />
                            <div className="absolute top-0 bottom-0 w-[2px] bg-[#999]" style={{ left: m.tW }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-[10px] text-[#999]">
                      <div className="flex items-center gap-1.5"><div className="w-3 h-2 rounded-sm bg-[#4B5EFC]/20" /> Forecast</div>
                      <div className="flex items-center gap-1.5"><div className="w-3 h-2 rounded-sm bg-[#22C55E]/40" /> Realise</div>
                      <div className="flex items-center gap-1.5"><div className="w-3 h-[2px] bg-[#999]" /> Target</div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La bonne nouvelle : le forecasting n&apos;est pas de la divination. C&apos;est un processus structurable, mesurable et ameliorable. Les equipes qui atteignent une precision de forecast superieure a 90% n&apos;ont pas de boule de cristal. Elles ont une methode rigoureuse, des donnees propres et un processus de review regulier.</p>
                    <p>Cet article couvre les 5 methodes de forecasting, la plus repandue en detail (pipeline weighted), les outils disponibles, les biais a eviter, et le processus concret pour mettre en place un forecast fiable dans votre entreprise.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 2 : Les 5 methodes de forecasting ===================== */}
              <section id="cinq-methodes" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#22C55E]" />
                    <span className="text-[11px] font-semibold text-[#22C55E] uppercase tracking-wider">Methodes</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Les 5 methodes de forecasting commercial</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Il n&apos;existe pas de methode universelle. Le choix depend de la maturite de vos donnees, de la longueur de votre cycle de vente et de la taille de votre equipe. Voici les 5 approches principales, de la plus simple a la plus avancee.</p>

                  <div className="space-y-4">
                    {/* Method 1 — Bottom-up */}
                    <div className="rounded-lg border border-[#E8F5E9] bg-[#F6FBF6] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#22C55E] w-5 h-5 rounded-md flex items-center justify-center">1</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Bottom-up (remontee terrain)</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E]">Debutant</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Chaque commercial estime son propre closing pour la periode. Le manager additionne les estimations individuelles. C&apos;est la methode la plus courante dans les PME car elle ne necessite aucun outil specifique. Son defaut majeur : elle repose entierement sur le jugement subjectif des reps.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">Forecast = SUM(estimation de chaque rep)</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                          <span className="text-[10px] font-semibold text-[#22C55E]">Forces</span>
                          <p className="text-[#666] mt-1">Simple, rapide, implique les reps, capture le contexte terrain</p>
                        </div>
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                          <span className="text-[10px] font-semibold text-[#EF4444]">Limites</span>
                          <p className="text-[#666] mt-1">Biais individuels (optimisme, sandbagging), pas reproductible</p>
                        </div>
                      </div>
                    </div>

                    {/* Method 2 — Top-down */}
                    <div className="rounded-lg border border-[#EDE9FE] bg-[#F8F6FF] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#6C5CE7] w-5 h-5 rounded-md flex items-center justify-center">2</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Top-down (objectif descendant)</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#6C5CE7]/10 text-[#6C5CE7]">Debutant</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">On part du marche total adressable (TAM) ou de l&apos;objectif de l&apos;entreprise, et on decline en targets par equipe puis par rep. C&apos;est une methode de planification plus que de prevision. Elle repond a la question &ldquo;combien devrait-on faire ?&rdquo; plutot que &ldquo;combien va-t-on faire ?&rdquo;.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">Forecast = Objectif annuel / 4 trimestres x coefficient saisonnier</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                          <span className="text-[10px] font-semibold text-[#22C55E]">Forces</span>
                          <p className="text-[#666] mt-1">Alignement strategique, cadre clair pour les equipes</p>
                        </div>
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                          <span className="text-[10px] font-semibold text-[#EF4444]">Limites</span>
                          <p className="text-[#666] mt-1">Deconnecte de la realite terrain, ne detecte pas les signaux faibles</p>
                        </div>
                      </div>
                    </div>

                    {/* Method 3 — Pipeline weighted */}
                    <div className="rounded-lg border border-[#DBEAFE] bg-[#F0F7FF] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#4B5EFC] w-5 h-5 rounded-md flex items-center justify-center">3</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Pipeline weighted (pondere par stage)</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#4B5EFC]/10 text-[#4B5EFC]">Intermediaire</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Chaque deal est pondere par sa probabilite de closing, basee sur son stade dans le pipeline. Un deal en Discovery a 10% de chances, un deal en Negotiation a 70%. Le forecast est la somme des montants ponderes. C&apos;est la methode la plus repandue et celle que la plupart des CRM integrent nativement.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">Forecast = SUM(montant deal x probabilite du stage)</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                          <span className="text-[10px] font-semibold text-[#22C55E]">Forces</span>
                          <p className="text-[#666] mt-1">Objectif, base sur le pipeline reel, automatisable dans le CRM</p>
                        </div>
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                          <span className="text-[10px] font-semibold text-[#EF4444]">Limites</span>
                          <p className="text-[#666] mt-1">Les probabilites par stage sont des moyennes, chaque deal est unique</p>
                        </div>
                      </div>
                    </div>

                    {/* Method 4 — Historical run rate */}
                    <div className="rounded-lg border border-[#FFF3E0] bg-[#FFFBF5] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#FF7A59] w-5 h-5 rounded-md flex items-center justify-center">4</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">Historical run rate (tendance historique)</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FF7A59]/10 text-[#FF7A59]">Intermediaire</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">On utilise les performances passees pour projeter le futur. Si votre equipe a signe en moyenne 280K EUR par mois sur les 6 derniers mois avec un taux de croissance de 5% MoM, on projette 294K EUR le mois suivant. Cette methode fonctionne bien quand le marche est stable et que l&apos;equipe ne change pas.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">Forecast M+1 = Medium des 6 derniers mois x (1 + taux croissance MoM)</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                          <span className="text-[10px] font-semibold text-[#22C55E]">Forces</span>
                          <p className="text-[#666] mt-1">Base sur des faits, pas des opinions, facile a calculer</p>
                        </div>
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                          <span className="text-[10px] font-semibold text-[#EF4444]">Limites</span>
                          <p className="text-[#666] mt-1">Ne prend pas en compte les changements (nouveau produit, nouveau marche, churn equipe)</p>
                        </div>
                      </div>
                    </div>

                    {/* Method 5 — AI predictive */}
                    <div className="rounded-lg border border-[#F3E8FF] bg-[#FAF5FF] p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-white bg-[#A855F7] w-5 h-5 rounded-md flex items-center justify-center">5</span>
                          <h3 className="text-[14px] font-semibold text-[#111]">IA predictive (machine learning)</h3>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#A855F7]/10 text-[#A855F7]">Avance</span>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.7] mb-3">Des algorithmes de machine learning analysent l&apos;ensemble des signaux (emails, appels, mouvements de stage, engagement du prospect, historique de deals similaires) pour attribuer une probabilite de closing a chaque deal. C&apos;est la methode la plus precise mais elle necessite un volume de donnees significatif pour fonctionner.</p>
                      <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-3">
                        <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Fonctionnement</span>
                        <p className="text-[13px] font-mono text-[#111] mt-1">Probabilite = f(activites, engagement, historique, timing, signaux)</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                          <span className="text-[10px] font-semibold text-[#22C55E]">Forces</span>
                          <p className="text-[#666] mt-1">Precision superieure (85-95%), detection des patterns invisibles, pas de biais humains</p>
                        </div>
                        <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                          <span className="text-[10px] font-semibold text-[#EF4444]">Limites</span>
                          <p className="text-[#666] mt-1">Necessite 500+ deals historiques, &ldquo;black box&rdquo;, cout eleve</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] text-[#666] leading-[1.7]">
                      <strong className="text-[#111]">Notre recommandation :</strong> commencez par le pipeline weighted (methode 3). Ajoutez le historical run rate (methode 4) comme point de comparaison. Et quand vous aurez suffisamment de donnees historiques (12+ mois, 200+ deals closes), explorez l&apos;IA predictive (methode 5). Le bottom-up ne devrait etre qu&apos;un complement qualitatif, jamais votre methode principale.
                    </p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 3 : Pipeline weighted en detail ===================== */}
              <section id="pipeline-weighted" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#4B5EFC]" />
                    <span className="text-[11px] font-semibold text-[#4B5EFC] uppercase tracking-wider">Deep dive</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Pipeline weighted : la methode la plus courante</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">Le principe est elegant : chaque deal dans votre pipeline a une probabilite de closing qui depend de son stade. Plus le deal avance dans le pipeline, plus la probabilite augmente. Le forecast est la somme de tous les montants ponderes par leur probabilite.</p>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Prenons un exemple concret. Vous avez 5 deals dans votre pipeline, chacun a un stade different. Votre pipeline a 5 stages avec des probabilites calibrees sur vos donnees historiques.</p>
                  </div>

                  {/* CSS Mockup : Pipeline weighted calculation */}
                  <div className="mt-5 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-semibold text-[#999] uppercase tracking-wider">Calcul du forecast pondere - Exemple</span>
                      <span className="text-[10px] text-[#CCC]">Pipeline weighted</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { deal: "Acme Corp", stage: "Discovery", amount: "45 000", prob: "10%", weighted: "4 500", probColor: "#EF4444", barW: "10%" },
                        { deal: "Beta SaaS", stage: "Demo", amount: "32 000", prob: "30%", weighted: "9 600", probColor: "#FF7A59", barW: "30%" },
                        { deal: "Gamma Tech", stage: "Proposal", amount: "78 000", prob: "50%", weighted: "39 000", probColor: "#F59E0B", barW: "50%" },
                        { deal: "Delta Corp", stage: "Negotiation", amount: "55 000", prob: "70%", weighted: "38 500", probColor: "#22C55E", barW: "70%" },
                        { deal: "Epsilon IO", stage: "Verbal commit", amount: "25 000", prob: "90%", weighted: "22 500", probColor: "#4B5EFC", barW: "90%" },
                      ].map((d, i) => (
                        <div key={i} className="rounded-lg bg-white border border-[#EAEAEA] p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[12px] font-semibold text-[#111]">{d.deal}</span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#999]">{d.stage}</span>
                            </div>
                            <span className="text-[12px] font-mono text-[#111]">{d.amount} EUR</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 rounded-full bg-[#F0F0F0] overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: d.barW, backgroundColor: d.probColor }} />
                            </div>
                            <span className="text-[10px] font-semibold" style={{ color: d.probColor }}>{d.prob}</span>
                            <span className="text-[11px] font-mono text-[#555]">= <strong className="text-[#111]">{d.weighted} EUR</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 rounded-lg bg-[#111] p-3 flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-white/60">Forecast pondere total</span>
                      <span className="text-[16px] font-bold text-[#22C55E]">114 100 EUR</span>
                    </div>
                    <p className="mt-2 text-[10px] text-[#999]">Pipeline total brut : 235 000 EUR. Forecast pondere : 114 100 EUR (48.6% du pipeline brut).</p>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;element critique de cette methode est la calibration des probabilites par stage. Beaucoup d&apos;equipes utilisent des probabilites par defaut (20%, 40%, 60%, 80%) qui ne refletent pas leur realite. La bonne approche est de calculer vos probabilites historiques reelles.</p>
                    <p>Pour chaque stage, divisez le nombre de deals qui ont fini Closed Won par le nombre total de deals qui sont passes par ce stage. Si sur les 12 derniers mois, 120 deals sont passes par &ldquo;Demo&rdquo; et 34 ont fini Closed Won, votre probabilite reelle pour &ldquo;Demo&rdquo; est 28%, pas 40%.</p>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] text-[#666] leading-[1.7]">
                      <strong className="text-[#111]">Attention :</strong> recalibrez vos probabilites tous les trimestres. Les taux de conversion evoluent avec les changements de marche, de produit et d&apos;equipe. Des probabilites datees de 12 mois faussent completement le forecast.
                    </p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 4 : Forecasting dans HubSpot ===================== */}
              <section id="forecasting-hubspot" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#FF7A59]" />
                    <span className="text-[11px] font-semibold text-[#FF7A59] uppercase tracking-wider">HubSpot</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Forecasting dans HubSpot : configuration et utilisation</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">HubSpot propose un outil de forecasting natif depuis Sales Hub Pro. Il combine trois approches : le pipeline weighted automatique, les categories de forecast manuelles (remplies par les reps), et les objectifs (goals). Voici comment le configurer correctement.</p>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Etape 1 : Definir les categories de forecast.</strong> HubSpot utilise 4 categories par defaut que les reps assignent manuellement a chaque deal : &ldquo;Omit&rdquo; (exclus du forecast), &ldquo;Pipeline&rdquo; (en cours, pas encore probable), &ldquo;Best Case&rdquo; (probable si tout va bien), et &ldquo;Commit&rdquo; (quasi-certain de closer). Ces categories s&apos;ajoutent a la probabilite du stage pour donner une double dimension au forecast.</p>
                    <p><strong className="text-[#111]">Etape 2 : Configurer les objectifs (Goals).</strong> Dans Settings &rarr; Tracking &amp; Analytics &rarr; Goals, definissez le target de revenu par utilisateur et par periode. Ces objectifs servent de reference pour mesurer l&apos;ecart entre le forecast et le target.</p>
                    <p><strong className="text-[#111]">Etape 3 : Activer les soumissions de forecast.</strong> Chaque mois ou trimestre, les reps soumettent leur estimation via l&apos;outil Forecast. Le manager valide ou ajuste. Cette soumission cree un historique qui permet de mesurer la precision au fil du temps.</p>
                  </div>

                  {/* CSS Mockup : HubSpot forecast view */}
                  <div className="mt-5 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-semibold text-[#999] uppercase tracking-wider">HubSpot Forecast - Mars 2026</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF7A59]/10 text-[#FF7A59]">Sales Hub Pro</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="grid grid-cols-5 gap-1 text-[9px] font-semibold text-[#999] uppercase tracking-wider px-2">
                        <span>Rep</span>
                        <span>Pipeline</span>
                        <span>Best Case</span>
                        <span>Commit</span>
                        <span>Closed Won</span>
                      </div>
                      {[
                        { rep: "Alice M.", pipeline: "85K", bestCase: "62K", commit: "38K", closed: "28K", closedPct: "35%" },
                        { rep: "Thomas R.", pipeline: "120K", bestCase: "78K", commit: "52K", closed: "45K", closedPct: "56%" },
                        { rep: "Sarah L.", pipeline: "65K", bestCase: "45K", commit: "30K", closed: "22K", closedPct: "27%" },
                      ].map((r) => (
                        <div key={r.rep} className="grid grid-cols-5 gap-1 rounded-lg bg-white border border-[#EAEAEA] p-2.5 items-center">
                          <span className="text-[11px] font-medium text-[#111]">{r.rep}</span>
                          <div>
                            <span className="text-[11px] font-mono text-[#555]">{r.pipeline}</span>
                            <div className="h-1.5 rounded-full bg-[#F0F0F0] mt-1 w-full"><div className="h-full rounded-full bg-[#DDD]" style={{ width: "100%" }} /></div>
                          </div>
                          <div>
                            <span className="text-[11px] font-mono text-[#F59E0B]">{r.bestCase}</span>
                            <div className="h-1.5 rounded-full bg-[#F0F0F0] mt-1 w-full"><div className="h-full rounded-full bg-[#F59E0B]" style={{ width: "70%" }} /></div>
                          </div>
                          <div>
                            <span className="text-[11px] font-mono text-[#22C55E]">{r.commit}</span>
                            <div className="h-1.5 rounded-full bg-[#F0F0F0] mt-1 w-full"><div className="h-full rounded-full bg-[#22C55E]" style={{ width: "45%" }} /></div>
                          </div>
                          <div>
                            <span className="text-[11px] font-mono text-[#4B5EFC]">{r.closed}</span>
                            <div className="h-1.5 rounded-full bg-[#F0F0F0] mt-1 w-full"><div className="h-full rounded-full bg-[#4B5EFC]" style={{ width: r.closedPct }} /></div>
                          </div>
                        </div>
                      ))}
                      <div className="grid grid-cols-5 gap-1 rounded-lg bg-[#111] p-2.5 items-center mt-1">
                        <span className="text-[11px] font-semibold text-white">Total equipe</span>
                        <span className="text-[11px] font-mono text-white/60">270K</span>
                        <span className="text-[11px] font-mono text-[#F59E0B]">185K</span>
                        <span className="text-[11px] font-mono text-[#22C55E]">120K</span>
                        <span className="text-[11px] font-mono text-[#4B5EFC]">95K</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[10px] text-[#999]">
                      <span>Goal mensuel : <strong className="text-[#111]">200K EUR</strong></span>
                      <span>|</span>
                      <span>Commit coverage : <strong className="text-[#22C55E]">60%</strong></span>
                      <span>|</span>
                      <span>Best case coverage : <strong className="text-[#F59E0B]">92.5%</strong></span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le point cle avec HubSpot est de ne pas se fier uniquement au pipeline weighted automatique. La vraie valeur vient de la combinaison des categories manuelles (le jugement du rep) et de la probabilite du stage (la donnee objective). Un deal en &ldquo;Negotiation&rdquo; (70%) mais categorise &ldquo;Pipeline&rdquo; par le rep est un signal : le rep ne croit pas que ce deal va closer malgre son stade avance. C&apos;est ce type de dissonance qu&apos;il faut creuser en forecast review.</p>
                    <p>Limitation importante : l&apos;outil de forecast natif de HubSpot ne propose pas d&apos;IA predictive. Pour ca, il faut passer par des outils tiers comme Clari ou Gong, ou utiliser Operations Hub Enterprise pour construire vos propres modeles.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 5 : Mesurer la precision ===================== */}
              <section id="mesurer-precision" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#22C55E]" />
                    <span className="text-[11px] font-semibold text-[#22C55E] uppercase tracking-wider">Precision</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Forecast vs reality : mesurer la precision</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">Un forecast n&apos;a de valeur que s&apos;il est fiable. La metrique cle est le Forecast Accuracy, qui mesure l&apos;ecart entre la prevision et le realise. L&apos;objectif pour une equipe mature est d&apos;etre entre 90% et 100% de precision.</p>

                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 mb-5">
                    <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Formule</span>
                    <p className="text-[13px] font-mono text-[#111] mt-1">Forecast Accuracy = 1 - |Forecast - Realise| / Realise x 100</p>
                  </div>

                  {/* CSS Mockup : Accuracy gauge */}
                  <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-semibold text-[#999] uppercase tracking-wider">Forecast Accuracy - Q1 2026</span>
                      <span className="text-[10px] text-[#CCC]">Jauge de precision</span>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative w-[200px] h-[100px] overflow-hidden">
                        {/* Gauge background */}
                        <div className="absolute inset-0" style={{ borderRadius: "100px 100px 0 0", background: "conic-gradient(from 180deg at 50% 100%, #EF4444 0deg, #F59E0B 60deg, #22C55E 120deg, #22C55E 180deg)", opacity: 0.2 }} />
                        {/* Gauge fill */}
                        <div className="absolute inset-[8px] bottom-0 bg-[#FAFAFA]" style={{ borderRadius: "92px 92px 0 0" }} />
                        {/* Value */}
                        <div className="absolute bottom-0 left-0 right-0 text-center">
                          <span className="text-[32px] font-bold text-[#22C55E]">87%</span>
                          <p className="text-[10px] text-[#999] -mt-1">Forecast Accuracy</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { month: "Janvier", forecast: "280K", actual: "310K", accuracy: "90%", color: "#22C55E" },
                        { month: "Fevrier", forecast: "320K", actual: "275K", accuracy: "84%", color: "#F59E0B" },
                        { month: "Mars", forecast: "350K", actual: "340K", accuracy: "97%", color: "#22C55E" },
                      ].map((m) => (
                        <div key={m.month} className="rounded-lg bg-white border border-[#EAEAEA] p-2.5 text-center">
                          <span className="text-[10px] text-[#999]">{m.month}</span>
                          <div className="text-[18px] font-bold mt-0.5" style={{ color: m.color }}>{m.accuracy}</div>
                          <div className="text-[9px] text-[#CCC] mt-0.5">F: {m.forecast} | R: {m.actual}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[9px] text-[#999]">
                      <div className="flex items-center justify-center gap-1"><div className="w-2 h-2 rounded-full bg-[#EF4444]" /> &lt;80% Faible</div>
                      <div className="flex items-center justify-center gap-1"><div className="w-2 h-2 rounded-full bg-[#F59E0B]" /> 80-90% Correct</div>
                      <div className="flex items-center justify-center gap-1"><div className="w-2 h-2 rounded-full bg-[#22C55E]" /> &gt;90% Excellent</div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Quelques points importants sur la mesure de la precision. D&apos;abord, mesurez la precision a la date de soumission du forecast, pas a la fin de la periode. Un forecast qui demarre a 60% de precision le 1er du mois et finit a 95% le dernier jour n&apos;est pas un bon forecast, c&apos;est une observation tardive.</p>
                    <p>Ensuite, mesurez aussi bien les &ldquo;miss to the upside&rdquo; (forecast inferieur au realise) que les &ldquo;miss to the downside&rdquo; (forecast superieur au realise). Un miss de 15% a la hausse est aussi problematique qu&apos;un miss de 15% a la baisse. Le premier indique du sandbagging, le second de l&apos;optimisme excessif.</p>
                    <p>Enfin, suivez la precision par rep, pas uniquement au niveau de l&apos;equipe. Les erreurs individuelles s&apos;annulent souvent au niveau agrege, ce qui masque le vrai probleme. Un rep qui forecast systematiquement 30% au-dessus et un autre 30% en dessous donnent un forecast equipe &ldquo;precis&rdquo; mais completement inutile au niveau individuel.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 6 : Les biais du forecasting ===================== */}
              <section id="biais-forecasting" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#EF4444]" />
                    <span className="text-[11px] font-semibold text-[#EF4444] uppercase tracking-wider">Biais cognitifs</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Les 4 biais qui faussent vos forecasts</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">Meme avec la meilleure methode et les meilleurs outils, le facteur humain reste le maillon faible du forecasting. Voici les 4 biais cognitifs les plus frequents chez les commerciaux et les managers, et comment les neutraliser.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        title: "Sandbagging",
                        icon: "S",
                        color: "#EF4444",
                        bgColor: "#FEF2F2",
                        borderColor: "#FECACA",
                        description: "Le rep sous-estime volontairement son forecast pour depasser plus facilement son objectif et toucher sa surperformance. C&apos;est le biais le plus toxique car il fausse le forecast a la baisse tout en donnant l&apos;illusion d&apos;une equipe performante.",
                        antidote: "Mesurez et affichez le forecast accuracy par rep. Integrez la precision du forecast comme critere de la variable remuneration.",
                      },
                      {
                        title: "Happy ears",
                        icon: "H",
                        color: "#F59E0B",
                        bgColor: "#FFFBEB",
                        borderColor: "#FDE68A",
                        description: "Le rep n&apos;entend que les signaux positifs du prospect et ignore les signaux de risque. &ldquo;Le prospect a dit que c&apos;etait super&rdquo; devient &ldquo;c&apos;est un commit&rdquo;. Ce biais est particulierement present chez les reps juniors ou ceux sous pression de quota.",
                        antidote: "Exigez des preuves factuelles pour chaque changement de categorie. Pas de commit sans champion identifie, budget confirme et timeline validee.",
                      },
                      {
                        title: "Recency bias",
                        icon: "R",
                        color: "#6C5CE7",
                        bgColor: "#F5F3FF",
                        borderColor: "#DDD6FE",
                        description: "Le dernier deal gagne ou perdu influence excessivement la perception du reste du pipeline. Un rep qui vient de closer un gros deal va surestimer ses probabilites sur les autres deals. Inversement apres un gros loss.",
                        antidote: "Utilisez des donnees historiques, pas des impressions recentes. Comparez les projections du rep avec les taux de conversion reels des 6 derniers mois.",
                      },
                      {
                        title: "Champion bias",
                        icon: "C",
                        color: "#4B5EFC",
                        bgColor: "#EFF6FF",
                        borderColor: "#BFDBFE",
                        description: "Le rep confond son contact principal avec le decision maker. &ldquo;Mon contact est a fond&rdquo; ne signifie pas que le CFO ou le CEO qui signe le cheque est convaincu. Ce biais produit des deals qui restent bloques en Negotiation pendant des mois.",
                        antidote: "Exigez un mapping du comite d&apos;achat pour tout deal superieur a un certain montant. Validez que le champion a acces au decision maker et a presente l&apos;offre.",
                      },
                    ].map((bias) => (
                      <div key={bias.title} className="rounded-lg border p-4" style={{ backgroundColor: bias.bgColor, borderColor: bias.borderColor }}>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="text-[11px] font-bold text-white w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: bias.color }}>{bias.icon}</span>
                          <h3 className="text-[13px] font-semibold text-[#111]">{bias.title}</h3>
                        </div>
                        <p className="text-[11px] text-[#555] leading-[1.7] mb-3" dangerouslySetInnerHTML={{ __html: bias.description }} />
                        <div className="rounded-lg bg-white/60 border border-white p-2.5">
                          <span className="text-[9px] font-semibold text-[#999] uppercase tracking-wider">Antidote</span>
                          <p className="text-[10px] text-[#666] mt-1 leading-[1.6]" dangerouslySetInnerHTML={{ __html: bias.antidote }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] text-[#666] leading-[1.7]">
                      <strong className="text-[#111]">Le meilleur remede contre les biais :</strong> croisez toujours le jugement humain (bottom-up) avec une methode data-driven (pipeline weighted ou IA). Quand l&apos;ecart entre les deux est superieur a 20%, c&apos;est un signal d&apos;alerte qui merite une investigation.
                    </p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 7 : Forecast + IA ===================== */}
              <section id="forecast-ia" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#A855F7]" />
                    <span className="text-[11px] font-semibold text-[#A855F7] uppercase tracking-wider">Intelligence artificielle</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Forecast + IA : le predictif au service de la precision</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">L&apos;IA transforme le forecasting en passant d&apos;un modele base sur des regles statiques (probabilite par stage) a un modele base sur des signaux dynamiques. Au lieu de dire &ldquo;un deal en Negotiation a 70% de chances de closer&rdquo;, l&apos;IA dit &ldquo;ce deal specifique a 43% de chances de closer parce que l&apos;engagement email a chute, le champion n&apos;a pas repondu depuis 8 jours et les deals similaires dans ce segment ont un win rate de 22%&rdquo;.</p>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Comment fonctionne le forecast IA.</strong> Les algorithmes de machine learning analysent des centaines de signaux par deal : frequence des emails echanges, temps de reponse du prospect, nombre de participants aux meetings, mouvements dans le CRM, taille du comite d&apos;achat, similarite avec des deals passes (gagnes et perdus). A partir de ces signaux, le modele calcule une probabilite de closing individualisee, bien plus precise qu&apos;une probabilite moyenne par stage.</p>
                    <p><strong className="text-[#111]">HubSpot et l&apos;IA predictive.</strong> HubSpot ne propose pas encore de forecast IA natif au meme niveau que Clari ou Gong Forecast. En revanche, avec Operations Hub Enterprise et l&apos;integration de modeles externes (via API), il est possible de construire un scoring predictif personnalise. HubSpot Breeze AI commence a integrer des fonctionnalites d&apos;intelligence, mais reste limite sur le forecasting pur.</p>
                    <p><strong className="text-[#111]">Claude et les LLMs pour le forecast.</strong> Les grands modeles de langage comme Claude peuvent analyser qualitativement les notes de deals, les emails et les comptes-rendus de meetings pour extraire des signaux de risque. Un LLM peut lire les 50 dernieres notes de votre pipeline et vous dire &ldquo;3 deals sont a risque parce que le champion a change de poste, le budget n&apos;est pas valide, et le concurrent X a ete mentionne deux fois&rdquo;. C&apos;est un complement puissant au scoring quantitatif.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        title: "Prerequis pour l&apos;IA predictive",
                        items: ["500+ deals historiques (Closed Won + Closed Lost)", "12+ mois de donnees CRM propres", "Activites tracees (emails, appels, meetings)", "Budget outil dedie (Clari, Gong, ou custom)"],
                        color: "#A855F7",
                      },
                      {
                        title: "Gains attendus",
                        items: ["Precision forecast : +10 a 20 points vs pipeline weighted", "Detection precoce des deals a risque (2 a 3 semaines avant le stall)", "Reduction des biais humains", "Allocation de temps plus efficace pour les reps"],
                        color: "#22C55E",
                      },
                    ].map((block) => (
                      <div key={block.title} className="rounded-lg border border-[#F2F2F2] p-4">
                        <h3 className="text-[13px] font-semibold text-[#111] mb-2" dangerouslySetInnerHTML={{ __html: block.title }} />
                        <div className="space-y-1.5">
                          {block.items.map((item) => (
                            <div key={item} className="flex items-start gap-2 text-[11px] text-[#666]">
                              <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: block.color }} />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 8 : Meeting de forecast hebdomadaire ===================== */}
              <section id="meeting-forecast" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#4B5EFC]" />
                    <span className="text-[11px] font-semibold text-[#4B5EFC] uppercase tracking-wider">Processus</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Le meeting de forecast hebdomadaire</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">Le forecast n&apos;est pas un exercice ponctuel de fin de mois. C&apos;est un processus vivant, rythme par un meeting hebdomadaire entre le manager et les reps. Ce meeting est le coeur du systeme. Sans lui, meme le meilleur outil et la meilleure methode produisent des chiffres inutiles.</p>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le meeting de forecast ne doit pas etre un interrogatoire. C&apos;est un exercice collaboratif ou manager et rep examinent le pipeline ensemble, identifient les risques et definissent les actions. La duree ideale est 30 minutes par rep, ou 45 minutes en equipe (si moins de 5 reps).</p>
                  </div>

                  {/* Meeting agenda template */}
                  <div className="mt-5 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-semibold text-[#999] uppercase tracking-wider">Template - Agenda du meeting forecast</span>
                      <span className="text-[10px] text-[#CCC]">30 min / rep</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { time: "0-5 min", topic: "Revue du forecast soumis", detail: "Le rep presente son forecast pour la periode. Commit, best case, pipeline. Le manager note les ecarts avec la semaine precedente.", color: "#22C55E" },
                        { time: "5-15 min", topic: "Review des deals Commit", detail: "Pour chaque deal en Commit : quelle est la prochaine etape ? Qui est le champion ? Le budget est-il valide ? Quand est la decision ? Y a-t-il un risque ?", color: "#4B5EFC" },
                        { time: "15-22 min", topic: "Review des deals Best Case", detail: "Quels deals pourraient passer en Commit cette semaine ? Quels sont les bloqueurs ? Quelles actions concretes pour les debloquer ?", color: "#F59E0B" },
                        { time: "22-27 min", topic: "Deals a risque et deals stalles", detail: "Quels deals n&apos;ont pas bouge depuis 2+ semaines ? Faut-il les deprioriser, les relancer ou les passer en Closed Lost ?", color: "#EF4444" },
                        { time: "27-30 min", topic: "Actions et engagements", detail: "3 actions maximum pour la semaine. Qui fait quoi, pour quand. On note dans le CRM.", color: "#6C5CE7" },
                      ].map((item) => (
                        <div key={item.time} className="flex gap-3 rounded-lg bg-white border border-[#EAEAEA] p-3">
                          <div className="shrink-0 w-[60px]">
                            <span className="text-[10px] font-mono font-semibold" style={{ color: item.color }}>{item.time}</span>
                          </div>
                          <div>
                            <h4 className="text-[12px] font-semibold text-[#111] mb-0.5">{item.topic}</h4>
                            <p className="text-[10px] text-[#666] leading-[1.6]" dangerouslySetInnerHTML={{ __html: item.detail }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Les questions cles a poser en forecast review :</strong></p>
                  </div>

                  <div className="mt-3 space-y-2">
                    {[
                      "Qu&apos;est-ce qui a change depuis la semaine derniere sur ce deal ?",
                      "Quand est le prochain meeting avec le prospect ? Qui participe cote prospect ?",
                      "Le champion a-t-il presente votre solution en interne ? Quel feedback ?",
                      "Y a-t-il un concurrent identifie ? Ou en sont-ils dans le processus ?",
                      "Le budget est-il alloue ou encore en discussion ?",
                      "Quelle est la date de decision ? Est-elle reelle ou aspirationnelle ?",
                      "Quel est le next step concret et quand ?",
                    ].map((q) => (
                      <div key={q} className="flex items-start gap-2 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-2.5">
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#4B5EFC]"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" /><path d="M6.5 6a1.5 1.5 0 113 0c0 .83-.67 1.15-1 1.5-.33.35-.5.72-.5 1.17M8 11h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                        <span className="text-[11px] text-[#555] leading-[1.6]" dangerouslySetInnerHTML={{ __html: q }} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] text-[#666] leading-[1.7]">
                      <strong className="text-[#111]">Regle d&apos;or :</strong> le forecast meeting n&apos;est pas un pipeline review. On ne passe pas en revue tous les deals. On se concentre sur les deals Commit et Best Case, les changements depuis la derniere semaine, et les deals a risque. Le pipeline review est un exercice separe, moins frequent (bimensuel ou mensuel).
                    </p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 9 : Les outils de forecasting ===================== */}
              <section id="outils-forecasting" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-sm bg-[#FF7A59]" />
                    <span className="text-[11px] font-semibold text-[#FF7A59] uppercase tracking-wider">Outils</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">Les outils de forecasting compares</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">Le choix de l&apos;outil depend de votre CRM, de la taille de votre equipe et de votre budget. Voici les 4 options principales en 2026, de la plus accessible a la plus avancee.</p>

                  <div className="space-y-3">
                    {[
                      {
                        name: "Google Sheets / Excel",
                        tag: "Gratuit",
                        tagColor: "#22C55E",
                        description: "Le point de depart pour les equipes de moins de 5 reps. Un spreadsheet avec les deals, les probabilites et une formule SUMPRODUCT suffit pour un forecast pipeline weighted basique. Le probleme : la mise a jour est manuelle, les erreurs sont frequentes et il n&apos;y a pas d&apos;historique.",
                        ideal: "Equipe de 1 a 3 reps, pas de CRM, budget zero.",
                        scores: { precision: "50-65%", automatisation: "Faible", integration: "Aucune", cout: "0 EUR" },
                      },
                      {
                        name: "HubSpot Forecasting",
                        tag: "Sales Hub Pro+",
                        tagColor: "#FF7A59",
                        description: "L&apos;outil natif de HubSpot combine pipeline weighted, categories manuelles et objectifs. Suffisant pour 80% des equipes B2B. Avantage majeur : tout est dans le CRM, pas de sync a gerer. Limitation : pas d&apos;IA predictive et peu de flexibilite dans les modeles de calcul.",
                        ideal: "Equipe de 3 a 20 reps, deja sur HubSpot, besoin standard.",
                        scores: { precision: "70-85%", automatisation: "High", integration: "Native HubSpot", cout: "Inclus Sales Hub Pro (90 EUR/mois/utilisateur)" },
                      },
                      {
                        name: "Clari",
                        tag: "Enterprise",
                        tagColor: "#4B5EFC",
                        description: "La reference du revenue intelligence. Clari agrege les donnees du CRM, des emails, des calendriers et des appels pour generer un forecast IA. Le point fort : la visibilite sur les changements de pipeline (coverage change, deal slippage, commit gaps). Le point faible : le prix et la complexite du deploiement.",
                        ideal: "Equipe de 20+ reps, cycle de vente complexe, budget enterprise.",
                        scores: { precision: "85-95%", automatisation: "Tres haute", integration: "Salesforce, HubSpot, Microsoft", cout: "A partir de 30 000 EUR/an" },
                      },
                      {
                        name: "Gong Forecast",
                        tag: "IA conversationnelle",
                        tagColor: "#6C5CE7",
                        description: "Gong combine l&apos;analyse des conversations (appels, emails) avec le forecasting. L&apos;avantage unique : l&apos;IA analyse ce qui se dit dans les appels pour evaluer le risque de chaque deal. Si le prospect mentionne un concurrent ou repousse une decision, Gong le detecte et ajuste la probabilite.",
                        ideal: "Equipe de 10+ reps, beaucoup d&apos;appels, besoin de conversation intelligence.",
                        scores: { precision: "85-92%", automatisation: "Tres haute", integration: "Salesforce, HubSpot", cout: "A partir de 20 000 EUR/an" },
                      },
                    ].map((tool) => (
                      <div key={tool.name} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2">
                            <h3 className="text-[13px] font-semibold text-[#111]">{tool.name}</h3>
                            <span className="text-[9px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${tool.tagColor}15`, color: tool.tagColor }}>{tool.tag}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#555] leading-[1.7] mb-3">{tool.description}</p>
                        <div className="text-[10px] text-[#999] mb-2"><strong className="text-[#111]">Ideal pour :</strong> {tool.ideal}</div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                          {Object.entries(tool.scores).map(([key, val]) => (
                            <div key={key} className="rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-2 text-center">
                              <span className="text-[9px] text-[#999] uppercase">{key === "cout" ? "Cout" : key.charAt(0).toUpperCase() + key.slice(1)}</span>
                              <div className="text-[11px] font-semibold text-[#111] mt-0.5">{val}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] text-[#666] leading-[1.7]">
                      <strong className="text-[#111]">Notre recommandation :</strong> si vous etes sur HubSpot, utilisez d&apos;abord l&apos;outil natif. Il couvre 80% des besoins. N&apos;ajoutez Clari ou Gong que si votre equipe depasse 15 reps, que vos cycles de vente sont longs (3+ mois) et que le forecast accuracy avec HubSpot seul reste sous 80% malgre un processus rigoureux.
                    </p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ===================== SECTION 10 : Notre approche chez Ceres (dark section) ===================== */}
              <section id="approche-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Notre approche</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Comment on met en place le forecasting chez Ceres</h2>
                  <div className="space-y-3 text-[12px] text-white/50 leading-[1.75]">
                    <p>Le forecasting est un des sujets les plus demandes par nos clients. Et c&apos;est logique : c&apos;est souvent la ou le ROI d&apos;un bon setup CRM est le plus visible. Un forecast precis a 90%+ change la donne pour le management, le board et les equipes operationnelles.</p>
                    <p>Notre approche se deroule en 4 phases. D&apos;abord, l&apos;audit du pipeline : on analyse les stages, les probabilites historiques reelles, les deals stalles et la qualite des donnees. Ensuite, la calibration : on recalcule les probabilites par stage a partir des 12 derniers mois de donnees, on definit les categories de forecast et on configure les objectifs dans HubSpot. Puis, le processus : on met en place le meeting de forecast hebdomadaire, on cree le template et on forme les managers. Enfin, le suivi : on mesure le forecast accuracy chaque mois et on ajuste les probabilites trimestriellement.</p>
                    <p>En moyenne, nos clients passent d&apos;un forecast accuracy de 55-65% (avant intervention) a 85-92% (apres 3 mois de suivi). La cle n&apos;est pas l&apos;outil, c&apos;est la rigueur du processus et la qualite des donnees.</p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Clients accompagnes", value: "28", color: "#22C55E" },
                      { label: "Accuracy moyenne apres", value: "89%", color: "#4B5EFC" },
                      { label: "Gain de precision", value: "+27pts", color: "#22C55E" },
                      { label: "Delai de mise en place", value: "3 sem.", color: "#6C5CE7" },
                    ].map((s) => (
                      <div key={s.label} className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-[20px] font-bold" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-[10px] text-white/35 mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {[
                      "Audit complet du pipeline et des donnees historiques",
                      "Calcul des probabilites reelles par stage (pas les defauts CRM)",
                      "Configuration de l&apos;outil de forecast dans HubSpot",
                      "Definition des categories et des objectifs par rep",
                      "Mise en place du meeting forecast hebdomadaire",
                      "Template d&apos;agenda et grille de questions pour les managers",
                      "Dashboard de suivi du forecast accuracy",
                      "Formation equipe commerciale et management (2h)",
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
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour fiabiliser votre forecast commercial ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[460px] mx-auto">On deploie votre systeme de forecasting complet en 3 semaines : audit pipeline, calibration des probabilites, configuration HubSpot, meeting process et formation equipe.</p>
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
