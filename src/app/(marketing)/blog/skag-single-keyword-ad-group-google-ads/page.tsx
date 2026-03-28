"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "SKAG pour Google Ads : bonne idee ou pas ?",
  description: "Analyse complete de la strategie Single Keyword Ad Group (SKAG) pour Google Ads en 2026. Avantages, inconvenients, alternatives modernes et verdict.",
  author: { "@type": "Person", name: "Guillaume Delachet" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-02-18",
  dateModified: "2026-02-18",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/skag-single-keyword-ad-group-google-ads" },
  articleSection: "Data & Reporting",
  wordCount: 1900,
  inLanguage: "fr",
};

const sections = [
  { id: "definition", title: "C\u2019est quoi un SKAG" },
  { id: "popularite", title: "Pourquoi les SKAG ont ete populaires" },
  { id: "avantages", title: "Les avantages des SKAG" },
  { id: "inconvenients", title: "Les inconvenients des SKAG" },
  { id: "comparaison", title: "SKAG vs STAG vs Thematic" },
  { id: "pmax-smart", title: "Performance Max et Smart Bidding" },
  { id: "quand-utiliser", title: "Quand utiliser les SKAG en 2026" },
  { id: "alternatives", title: "Les alternatives modernes" },
  { id: "verdict", title: "Notre verdict" },
];

const relatedArticles = [
  { title: "Tracker les soumissions de formulaire HubSpot dans Google Analytics", slug: "tracker-soumissions-formulaire-hubspot-google-analytics-google-tag-manager", category: "Data & Reporting", color: "#22C55E" },
  { title: "9 actions commerciales que vous devriez automatiser", slug: "9-actions-commerciales-automatiser", category: "Automatisation", color: "#6C5CE7" },
  { title: "Les meilleures pratiques pour vos sequences HubSpot", slug: "meilleures-pratiques-sequences-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function SkagArticle() {
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
        <div className="h-full bg-[#22C55E] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "12%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "35%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "55%", width: 260, height: 260, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "75%", width: 300, height: 300, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(70px)" }} />

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
              <span className="text-[#666]">SKAG Google Ads</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>Data &amp; Reporting</Badge>
                <span className="text-[11px] text-[#CCC]">9 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                SKAG pour Google Ads : bonne idee ou pas ?
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Les Single Keyword Ad Groups ont longtemps ete consideres comme la structure de compte Google Ads la plus performante. Mais en 2026, entre les Responsive Search Ads, le Smart Bidding et Performance Max, cette strategie a-t-elle encore du sens ? Analyse complete, avantages, limites et alternatives.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>18 fevrier 2026</span>
              </div>

              {/* Quick summary card */}
              <div className="mt-8 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                <span className="text-[13px] font-semibold text-[#111] mb-4 block">En resume</span>
                <div className="space-y-2">
                  {[
                    { label: "Strategie", value: "1 mot-cle = 1 ad group", color: "#22C55E" },
                    { label: "Pertinence en 2026", value: "Limitee", color: "#FF7A59" },
                    { label: "Alternative recommandee", value: "STAG + Smart Bidding", color: "#4B5EFC" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between py-2 border-b border-[#F2F2F2] last:border-0">
                      <span className="text-[12px] text-[#999]">{s.label}</span>
                      <span className="text-[12px] font-semibold" style={{ color: s.color }}>{s.value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[12px] text-[#777] leading-[1.6]">
                  Les SKAG restent une approche valide dans certains contextes tres precis, mais la majorite des annonceurs gagneront a adopter des structures plus consolidees qui tirent parti des algorithmes de Google. Ce guide vous aide a trancher.
                </p>
              </div>
            </header>

            <article>
              {/* Section 1 : Definition */}
              <section id="definition" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">C&apos;est quoi un SKAG ?</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>SKAG signifie Single Keyword Ad Group, soit &ldquo;groupe d&apos;annonces a mot-cle unique&rdquo; en francais. Le principe est simple : au lieu de regrouper plusieurs mots-cles dans un meme ad group, on cree un ad group distinct pour chaque mot-cle individuel.</p>
                    <p>Concretement, si vous vendez des chaussures de running, au lieu d&apos;avoir un ad group &ldquo;Chaussures running&rdquo; contenant 15 mots-cles differents, vous creez 15 ad groups separes. Chaque ad group ne contient qu&apos;un seul mot-cle, decline dans ses differents types de correspondance (exact, expression, large modifie).</p>
                    <p>L&apos;objectif : maximiser la pertinence entre le mot-cle, le texte de l&apos;annonce et la page de destination. Dans la logique historique de Google Ads, plus cette chaine est coherente, meilleurs sont le Quality Score, le taux de clic et le cout par conversion.</p>
                  </div>

                  {/* Structure example */}
                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Exemple de structure SKAG</p>
                    <div className="space-y-2">
                      {[
                        { group: "Ad Group : chaussures running", keyword: "[chaussures running]", match: "Exact", annonce: "Titre contient \"Chaussures Running\"" },
                        { group: "Ad Group : baskets course a pied", keyword: "[baskets course a pied]", match: "Exact", annonce: "Titre contient \"Baskets Course a Pied\"" },
                        { group: "Ad Group : sneakers running homme", keyword: "[sneakers running homme]", match: "Exact", annonce: "Titre contient \"Sneakers Running Homme\"" },
                      ].map((ex) => (
                        <div key={ex.group} className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-3 rounded-lg border border-[#F0F0F0] bg-white">
                          <div className="flex-1">
                            <div className="text-[11px] font-semibold text-[#111]">{ex.group}</div>
                            <div className="text-[10px] text-[#999] mt-1">Mot-cle : {ex.keyword} ({ex.match})</div>
                          </div>
                          <div className="text-[10px] text-[#22C55E] font-medium self-center">{ex.annonce}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-[#999] mt-3 italic">Chaque ad group = 1 mot-cle = 1 annonce parfaitement alignee</p>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Cette approche a ete popularisee dans les annees 2015-2020 par des experts comme Perry Marshall et des agences PPC specialisees. A l&apos;epoque, c&apos;etait la methode de reference pour structurer un compte Google Ads de maniere &ldquo;propre&rdquo;. Mais Google a fondamentalement change la facon dont ses algorithmes fonctionnent depuis, et cette strategie merite d&apos;etre reexaminee.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 : Popularite */}
              <section id="popularite" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi les SKAG ont ete populaires</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Pour comprendre l&apos;engouement autour des SKAG, il faut se remettre dans le contexte de Google Ads avant 2020. A cette epoque, le Quality Score etait le graal absolu. Un bon Quality Score (7/10 ou plus) permettait de payer moins cher par clic et d&apos;obtenir de meilleures positions d&apos;annonce. Et le Quality Score dependait directement de trois facteurs : le taux de clic attendu, la pertinence de l&apos;annonce et l&apos;experience de la page de destination.</p>
                    <p>Les SKAG cochaient toutes les cases. En ayant un seul mot-cle par ad group, on pouvait ecrire une annonce dont le titre reprenait exactement le mot-cle recherche par l&apos;internaute. Le taux de clic montait mecaniquement, la pertinence de l&apos;annonce etait maximale et le Quality Score suivait.</p>
                    <p>A l&apos;epoque des Expanded Text Ads (ETA), cette strategie etait redoutable. On controlait exactement quels titres et quelles descriptions s&apos;affichaient. Un ad group avec le mot-cle [logiciel crm gratuit] pouvait avoir une annonce dont le Titre 1 etait &ldquo;Logiciel CRM Gratuit&rdquo; et le Titre 2 &ldquo;Testez Sans Engagement&rdquo;. La coherence etait parfaite.</p>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { label: "Quality Score moyen", value: "8-9/10", color: "#22C55E" },
                      { label: "CTR moyen constate", value: "+15-25%", color: "#4B5EFC" },
                      { label: "CPC moyen observe", value: "-10-20%", color: "#FF7A59" },
                    ].map((m) => (
                      <div key={m.label} className="text-center p-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2]">
                        <div className="text-[18px] font-bold" style={{ color: m.color }}>{m.value}</div>
                        <div className="text-[10px] text-[#999] mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Les resultats etaient reels et mesurables. Les comptes structures en SKAG affichaient generalement des Quality Scores superieurs de 2 a 3 points par rapport aux structures classiques, avec des taux de clic 15 a 25% plus eleves et des couts par clic reduits de 10 a 20%. C&apos;etait un avantage competitif tangible.</p>
                    <p>Mais cette logique reposait sur deux hypotheses qui ne sont plus vraies aujourd&apos;hui : que l&apos;annonceur controle integralement le texte de ses annonces, et que Google a besoin qu&apos;on lui &ldquo;mache le travail&rdquo; en matiere de pertinence. Ces deux hypotheses se sont effondrees avec l&apos;arrivee des RSA et du machine learning.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 : Avantages */}
              <section id="avantages" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les avantages des SKAG</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Meme en 2026, les SKAG conservent des avantages structurels qu&apos;il ne faut pas ignorer. Ils ne sont pas devenus &ldquo;mauvais&rdquo; du jour au lendemain. Voici ce qui reste valide.</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      {
                        title: "Controle granulaire des encheres",
                        desc: "Avec un mot-cle par ad group, vous savez exactement combien vous payez pour chaque terme de recherche. Pas de dilution, pas de confusion. Si le mot-cle [crm pme] convertit mieux que [logiciel crm], vous pouvez ajuster les encheres individuellement sans impact sur les autres termes.",
                      },
                      {
                        title: "Pertinence maximale de l\u2019annonce",
                        desc: "Le texte de l\u2019annonce peut reprendre mot pour mot le terme recherche. Le Dynamic Keyword Insertion (DKI) n\u2019est meme pas necessaire puisque le titre est deja parfaitement aligne. Ca se traduit par un meilleur taux de clic et un Quality Score plus eleve.",
                      },
                      {
                        title: "Reporting ultra-precis",
                        desc: "Chaque ad group = un mot-cle = un ensemble de metriques parfaitement isole. Pas besoin de creuser dans les rapports de termes de recherche pour comprendre quel mot-cle performe ou non. Le reporting est limpide et les decisions d\u2019optimisation sont plus rapides.",
                      },
                      {
                        title: "Tests A/B facilites",
                        desc: "Tester deux variantes d\u2019annonce sur un seul mot-cle donne des resultats plus propres que sur un ad group contenant 20 mots-cles differents. On sait exactement ce qui fonctionne pour quelle intention de recherche.",
                      },
                      {
                        title: "Landing pages specifiques",
                        desc: "En associant chaque ad group a une landing page dediee, on cree une experience post-clic parfaitement alignee avec l\u2019intention de recherche. C\u2019est un facteur de conversion important que les structures consolidees peuvent diluer.",
                      },
                    ].map((a) => (
                      <div key={a.title} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-md bg-[#F0FDF4] flex items-center justify-center shrink-0 mt-0.5">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#111] mb-1">{a.title}</p>
                          <p className="text-[12px] text-[#777] leading-[1.65]">{a.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 : Inconvenients */}
              <section id="inconvenients" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les inconvenients des SKAG</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>C&apos;est ici que le debat devient interessant. Les inconvenients des SKAG ne sont pas simplement des &ldquo;desagrements&rdquo; mineurs. Certains sont devenus des problemes structurels qui impactent directement la performance.</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      {
                        title: "Complexite de gestion explosive",
                        desc: "Un compte avec 500 mots-cles signifie 500 ad groups. Chaque ad group necessite ses propres annonces, ses propres extensions, ses propres ajustements d\u2019encheres. La maintenance devient un travail a temps plein. Pour une equipe de 2-3 personnes, c\u2019est rarement soutenable sur le long terme.",
                      },
                      {
                        title: "Conflit avec le Smart Bidding",
                        desc: "C\u2019est le probleme majeur en 2026. Les strategies d\u2019encheres automatiques (Target CPA, Target ROAS, Maximize Conversions) ont besoin de volume de donnees pour fonctionner. Un ad group avec 5 conversions par mois ne donne pas assez de signal aux algorithmes. Google recommande un minimum de 30 conversions par mois au niveau de la campagne. Avec des SKAG, ce volume est fragmente en dizaines d\u2019ad groups, chacun avec trop peu de donnees.",
                      },
                      {
                        title: "Incompatibilite avec les RSA",
                        desc: "Les Responsive Search Ads ont remplace les Expanded Text Ads depuis juin 2022. Avec les RSA, Google teste automatiquement differentes combinaisons de titres et descriptions. L\u2019avantage historique des SKAG, le controle total sur le texte affiche, n\u2019existe plus. Google choisit quels titres montrer, et il le fait souvent mieux que nous.",
                      },
                      {
                        title: "Cannibalisation entre ad groups",
                        desc: "Avec des centaines d\u2019ad groups sur des mots-cles proches, vos propres ad groups se font concurrence entre eux lors des encheres. Google doit choisir lequel declencher pour une requete donnee, ce qui cree de la confusion algorithmique et peut degrader les performances.",
                      },
                      {
                        title: "Temps de setup disproportionne",
                        desc: "Creer 200 ad groups avec leurs annonces respectives prend un temps considerable. Et ce n\u2019est que le debut : les mises a jour, les ajouts de mots-cles negatifs, la creation de nouvelles annonces pour les tests A/B, tout est multiplie par le nombre d\u2019ad groups. Le ROI du temps investi est de plus en plus discutable.",
                      },
                    ].map((l) => (
                      <div key={l.title} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-md bg-[#FEF2F2] flex items-center justify-center shrink-0 mt-0.5">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#EF4444]"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#111] mb-1">{l.title}</p>
                          <p className="text-[12px] text-[#777] leading-[1.65]">{l.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 : Comparaison SKAG vs STAG vs Thematic */}
              <section id="comparaison" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">SKAG vs STAG vs Thematic Ad Groups</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Avant de trancher, il est important de comprendre les trois grandes approches de structuration d&apos;un compte Google Ads et ce qui les differencie concretement.</p>
                  </div>

                  <div className="overflow-x-auto mt-5">
                    <div className="min-w-[500px]">
                      <div className="grid grid-cols-4 gap-2 pb-3 border-b border-[#EAEAEA]">
                        <span className="text-[10px] font-semibold text-[#999]">Critere</span>
                        <span className="text-[10px] font-semibold text-[#22C55E] text-center">SKAG</span>
                        <span className="text-[10px] font-semibold text-[#4B5EFC] text-center">STAG</span>
                        <span className="text-[10px] font-semibold text-[#FF7A59] text-center">Thematic</span>
                      </div>
                      {[
                        { label: "Mots-cles par ad group", skag: "1", stag: "1 theme", thematic: "5-20" },
                        { label: "Nombre d\u2019ad groups", skag: "Tres eleve", stag: "Modere", thematic: "Faible" },
                        { label: "Pertinence annonce", skag: "Maximale", stag: "Elevee", thematic: "Moyenne" },
                        { label: "Compatibilite Smart Bidding", skag: "Faible", stag: "Bonne", thematic: "Excellente" },
                        { label: "Compatibilite RSA", skag: "Faible", stag: "Bonne", thematic: "Excellente" },
                        { label: "Complexite de gestion", skag: "Tres elevee", stag: "Moderee", thematic: "Faible" },
                        { label: "Volume de donnees par AG", skag: "Faible", stag: "Correct", thematic: "Eleve" },
                        { label: "Controle granulaire", skag: "Maximal", stag: "Bon", thematic: "Limite" },
                        { label: "Scalabilite", skag: "Difficile", stag: "Bonne", thematic: "Excellente" },
                        { label: "Recommandation 2026", skag: "Cas precis", stag: "Par defaut", thematic: "Gros budgets" },
                      ].map((row) => (
                        <div key={row.label} className="grid grid-cols-4 gap-2 py-2 border-b border-[#F5F5F5]">
                          <span className="text-[11px] font-medium text-[#111]">{row.label}</span>
                          <span className="text-[11px] text-[#22C55E] font-medium text-center">{row.skag}</span>
                          <span className="text-[11px] text-[#4B5EFC] font-medium text-center">{row.stag}</span>
                          <span className="text-[11px] text-[#FF7A59] font-medium text-center">{row.thematic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">STAG (Single Theme Ad Group)</strong> represente le compromis optimal en 2026. On regroupe les mots-cles par intention de recherche plutot que par mot-cle individuel. Par exemple, [crm gratuit], [logiciel crm gratuit] et [crm gratuit pour pme] partagent la meme intention et vont dans le meme ad group. On garde une bonne pertinence d&apos;annonce tout en donnant assez de volume aux algorithmes.</p>
                    <p><strong className="text-[#111]">Les Thematic Ad Groups</strong> vont plus loin dans la consolidation. On regroupe tous les mots-cles lies a un theme large (ex : tout ce qui concerne le CRM) dans un seul ad group. C&apos;est l&apos;approche recommandee par Google pour les comptes a gros budget qui utilisent les strategies d&apos;encheres automatiques a plein regime.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 : Performance Max et Smart Bidding */}
              <section id="pmax-smart" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Contexte 2026</span>
                  <h2 className="text-[20px] font-semibold text-white mb-4">L&apos;impact de Performance Max et du Smart Bidding</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>L&apos;evolution la plus fondamentale de Google Ads ces dernieres annees, c&apos;est le passage d&apos;un systeme ou l&apos;annonceur controle tout a un systeme ou les algorithmes de Google prennent les decisions. Et cette tendance s&apos;accelere.</p>
                    <p>Le Smart Bidding (Target CPA, Target ROAS, Maximize Conversions, Maximize Conversion Value) utilise le machine learning pour ajuster les encheres en temps reel, en se basant sur des centaines de signaux : appareil, localisation, heure, historique de navigation, intention estimee. Pour fonctionner, ces algorithmes ont besoin de volume. Google recommande au moins 30 conversions par mois au niveau de la campagne, idealement 50 ou plus.</p>
                    <p>Avec une structure SKAG, les conversions sont dispersees entre des dizaines ou des centaines d&apos;ad groups. Chaque ad group n&apos;a que quelques conversions par mois, parfois zero. L&apos;algorithme n&apos;a pas assez de donnees pour apprendre et optimiser. Resultat : le Smart Bidding sous-performe, et l&apos;annonceur conclut a tort que &ldquo;le Smart Bidding ne marche pas&rdquo;.</p>
                    <p>Performance Max va encore plus loin en automatisant non seulement les encheres mais aussi le ciblage, les placements et les creations. Dans ce contexte, la granularite extreme des SKAG devient contre-productive. Google veut des signaux consolides, pas des micro-segments isoles.</p>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-white/5 p-4">
                      <p className="text-[12px] font-semibold text-[#22C55E] mb-3">Ce que le Smart Bidding fait bien</p>
                      {[
                        "Ajuste les encheres en temps reel",
                        "Utilise des signaux invisibles pour l\u2019annonceur",
                        "Optimise sur la conversion, pas le clic",
                        "S\u2019ameliore avec le volume de donnees",
                      ].map((p) => (
                        <div key={p} className="flex items-center gap-2 text-[11px] text-white/50 mb-2">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#22C55E] shrink-0"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{p}
                        </div>
                      ))}
                    </div>
                    <div className="rounded-lg bg-white/5 p-4">
                      <p className="text-[12px] font-semibold text-[#FF7A59] mb-3">Pourquoi les SKAG le freinent</p>
                      {[
                        "Fragmentent les donnees de conversion",
                        "Empechent l\u2019apprentissage algorithmique",
                        "Creent trop de micro-segments",
                        "Reduisent le volume par ad group",
                      ].map((p) => (
                        <div key={p} className="flex items-center gap-2 text-[11px] text-white/50 mb-2">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#FF7A59] shrink-0"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>{p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 : Quand utiliser les SKAG en 2026 */}
              <section id="quand-utiliser" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Quand utiliser les SKAG en 2026</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Dire que les SKAG sont &ldquo;morts&rdquo; serait excessif. Il existe encore des scenarios ou cette approche apporte une vraie valeur ajoutee. Mais ces scenarios sont devenus nettement plus restreints qu&apos;il y a cinq ans.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        scenario: "Mots-cles a tres haute valeur",
                        desc: "Si un seul mot-cle represente plusieurs milliers d\u2019euros de revenus par mois, il merite son propre ad group avec une annonce et une landing page dediees. C\u2019est le cas dans des secteurs comme l\u2019assurance, le juridique ou le SaaS enterprise.",
                        applicable: true,
                      },
                      {
                        scenario: "Budgets tres limites (< 1000 EUR/mois)",
                        desc: "Avec un petit budget, vous ciblez forcement peu de mots-cles. Une structure SKAG sur 10-15 mots-cles reste gerable et vous donne un controle maximal sur chaque euro depense. Le probleme de complexite ne se pose pas a cette echelle.",
                        applicable: true,
                      },
                      {
                        scenario: "Tests de nouvelles niches",
                        desc: "Quand vous explorez un nouveau segment de marche et que vous voulez comprendre precisement quelle intention de recherche convertit le mieux, les SKAG offrent une lisibilite incomparable. C\u2019est un excellent outil de diagnostic avant de consolider.",
                        applicable: true,
                      },
                      {
                        scenario: "Encheres manuelles uniquement",
                        desc: "Si pour une raison specifique vous n\u2019utilisez pas le Smart Bidding (donnees de conversion insuffisantes, vertical tres niche), les SKAG restent pertinents car leur principal inconvenient, le manque de donnees pour l\u2019algorithme, ne s\u2019applique pas.",
                        applicable: true,
                      },
                      {
                        scenario: "Comptes a gros volume (> 500 mots-cles)",
                        desc: "A cette echelle, la complexite des SKAG devient intenable. Le temps passe en gestion ne justifie pas le gain marginal de pertinence. Consolidez en STAG.",
                        applicable: false,
                      },
                      {
                        scenario: "Campagnes Performance Max",
                        desc: "Performance Max gere ses propres placements et ciblages. Appliquer une logique SKAG dans ce contexte n\u2019a aucun sens. Laissez l\u2019algorithme travailler.",
                        applicable: false,
                      },
                    ].map((s) => (
                      <div key={s.scenario} className="flex gap-3 items-start p-3 rounded-lg border border-[#F2F2F2]">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${s.applicable ? "bg-[#F0FDF4]" : "bg-[#FEF2F2]"}`}>
                          {s.applicable ? (
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          ) : (
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#EF4444]"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                          )}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#111] mb-1">{s.scenario}</p>
                          <p className="text-[12px] text-[#777] leading-[1.65]">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 : Alternatives modernes */}
              <section id="alternatives" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les alternatives modernes aux SKAG</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Si les SKAG ne sont plus la reponse par defaut, quelles structures adopter en 2026 ? Voici les trois approches que nous recommandons chez Ceres, en fonction du contexte.</p>
                  </div>

                  <div className="mt-5 space-y-5">
                    {[
                      {
                        title: "STAG (Single Theme Ad Group)",
                        tag: "Recommande",
                        tagColor: "#22C55E",
                        desc: "Regroupez les mots-cles qui partagent la meme intention de recherche dans un seul ad group. Par exemple, [crm pme], [logiciel crm petite entreprise] et [crm pour pme gratuit] vont dans le meme ad group car l\u2019intention est identique : trouver un CRM adapte aux PME.",
                        details: [
                          "3 a 8 mots-cles par ad group, tous lies par l\u2019intention",
                          "Une RSA avec 10-15 titres couvrant les variantes",
                          "Assez de volume pour le Smart Bidding",
                          "Gestion raisonnable, meme sur un gros compte",
                        ],
                      },
                      {
                        title: "Broad Match + Smart Bidding",
                        tag: "Avance",
                        tagColor: "#4B5EFC",
                        desc: "L\u2019approche poussee par Google depuis 2023. On utilise des mots-cles en correspondance large (broad match) et on laisse le Smart Bidding optimiser les encheres en fonction des signaux de conversion. Google identifie lui-meme les requetes les plus susceptibles de convertir.",
                        details: [
                          "Necessite un historique de conversion solide (50+ conversions/mois)",
                          "Fonctionne tres bien en combinaison avec les audiences",
                          "Surveillance reguliere du rapport de termes de recherche obligatoire",
                          "A eviter si le budget est trop serre ou les conversions trop rares",
                        ],
                      },
                      {
                        title: "Structure hybride",
                        tag: "Pragmatique",
                        tagColor: "#FF7A59",
                        desc: "La realite de la plupart des comptes, c\u2019est un mix. On garde des ad groups tres cibles (quasi-SKAG) pour les 5-10 mots-cles les plus strategiques, et on consolide le reste en STAG. Ca combine le meilleur des deux mondes sans les inconvenients extremes de chaque approche.",
                        details: [
                          "SKAG pour les top-mots-cles a fort CPA",
                          "STAG pour le milieu de l\u2019entonnoir",
                          "Broad match pour la decouverte et l\u2019expansion",
                          "Revue mensuelle pour consolider ou separer selon les performances",
                        ],
                      },
                    ].map((alt) => (
                      <div key={alt.title} className="pb-5 border-b border-[#F5F5F5] last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-[14px] font-semibold text-[#111]">{alt.title}</h3>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md" style={{ background: `${alt.tagColor}15`, color: alt.tagColor }}>{alt.tag}</span>
                        </div>
                        <p className="text-[12px] text-[#666] leading-[1.7] mb-3">{alt.desc}</p>
                        <div className="space-y-1.5">
                          {alt.details.map((d) => (
                            <p key={d} className="text-[11px] text-[#777] leading-[1.6] flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: alt.tagColor }} />
                              {d}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Conseil pratique</p>
                    <p className="text-[12px] text-[#777] leading-[1.65]">
                      Si vous gerez actuellement un compte en SKAG et que vous souhaitez migrer vers une structure STAG, ne le faites pas d&apos;un coup. Procedez campagne par campagne. Consolidez les ad groups qui partagent la meme intention, gardez vos meilleurs SKAG intacts, et mesurez l&apos;impact sur 4 a 6 semaines avant de continuer. La transition progressive minimise les risques de perte de performance.
                    </p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 : Verdict */}
              <section id="verdict" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Verdict</span>
                  <h2 className="text-[20px] font-semibold text-white mb-4">Notre verdict sur les SKAG en 2026</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Les SKAG ne sont pas une mauvaise strategie. Ils ont ete une excellente strategie pendant des annees, et ils conservent des merites reels en termes de controle et de pertinence. Mais le contexte a profondement change.</p>
                    <p>Google Ads en 2026, c&apos;est un ecosysteme qui recompense la consolidation des donnees, pas la fragmentation. Les algorithmes de Smart Bidding, les Responsive Search Ads, Performance Max : tout pousse vers des structures plus larges qui donnent aux machines assez de signal pour optimiser.</p>
                    <p>Notre recommandation chez Ceres est claire. Pour la majorite des annonceurs, la structure STAG (Single Theme Ad Group) est le meilleur compromis. Elle maintient une bonne pertinence d&apos;annonce, permet au Smart Bidding de fonctionner correctement et reste gerable operationnellement. Les SKAG restent pertinents sur vos 5 a 10 mots-cles les plus strategiques, en complement d&apos;une structure STAG sur le reste du compte.</p>
                    <p>L&apos;erreur serait de rester dogmatique. Ni &ldquo;tout SKAG&rdquo; ni &ldquo;zero SKAG&rdquo; n&apos;est la bonne reponse. La structure ideale depend de votre budget, de votre volume de conversions, de votre secteur et de vos ressources internes. Testez, mesurez, ajustez.</p>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[12px] font-semibold text-[#22C55E] mb-3">Gardez les SKAG si</p>
                      {[
                        "Petit budget (< 1000 EUR/mois)",
                        "Mots-cles a tres haute valeur unitaire",
                        "Besoin de diagnostic precis par mot-cle",
                        "Encheres manuelles sans Smart Bidding",
                        "10-15 mots-cles maximum dans le compte",
                      ].map((p) => (
                        <div key={p} className="flex items-center gap-2 text-[11px] text-white/50 mb-2">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#22C55E] shrink-0"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{p}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-[#FF7A59] mb-3">Passez aux STAG si</p>
                      {[
                        "Compte avec plus de 50 mots-cles",
                        "Utilisation du Smart Bidding",
                        "Volume de conversions suffisant (30+/mois)",
                        "Equipe reduite sans temps pour la maintenance",
                        "Objectif de scaling du compte",
                      ].map((p) => (
                        <div key={p} className="flex items-center gap-2 text-[11px] text-white/50 mb-2">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#FF7A59] shrink-0"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>{p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </article>

            {/* Related articles */}
            <section className="mt-12 mb-8">
              <p className="text-[13px] font-semibold text-[#111] mb-4">Articles similaires</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedArticles.map((a) => (
                  <Link key={a.slug} href={`/blog/${a.slug}`} className="rounded-lg border border-[#F2F2F2] p-4 hover:border-[#DDD] transition-colors group">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white mb-3" style={{ background: a.color }}>
                      {a.category[0]}
                    </div>
                    <p className="text-[12px] font-semibold text-[#111] leading-[1.4] group-hover:text-[#22C55E] transition-colors">{a.title}</p>
                    <p className="text-[10px] text-[#999] mt-2">{a.category}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section>
              <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;optimiser votre compte Google Ads ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[450px] mx-auto">On audite et restructure vos campagnes Google Ads pour maximiser votre ROI. Structure de compte, Smart Bidding, tracking, reporting. Resultats mesurables en 30 jours.</p>
                <div className="flex items-center justify-center gap-3">
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel
                  </a>
                  <Link href="/agence-hubspot" className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-[#EAEAEA] bg-white text-[#111] text-[13px] font-medium hover:border-[#CCC] transition-colors">
                    Nos services
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}