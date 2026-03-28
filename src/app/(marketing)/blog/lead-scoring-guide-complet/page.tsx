"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Lead scoring : le guide complet pour qualifier vos leads B2B",
  description: "Guide complet du lead scoring B2B : definition, modeles de scoring (fit + engagement), implementation dans HubSpot, predictive scoring IA, erreurs a eviter et methode Ceres pour qualifier vos leads.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-18",
  dateModified: "2026-03-18",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/lead-scoring-guide-complet" },
  articleSection: "Process & Outils",
  wordCount: 3200,
  inLanguage: "fr",
};

const sections = [
  { id: "definition", title: "Qu&apos;est-ce que le lead scoring" },
  { id: "pourquoi-indispensable", title: "Pourquoi c&apos;est indispensable" },
  { id: "deux-dimensions", title: "Les 2 dimensions du scoring" },
  { id: "fit-scoring", title: "Fit scoring (demographique)" },
  { id: "engagement-scoring", title: "Engagement scoring" },
  { id: "negative-scoring", title: "Negative scoring" },
  { id: "seuils", title: "Definir vos seuils" },
  { id: "hubspot-implementation", title: "Implementer dans HubSpot" },
  { id: "predictive-scoring", title: "Lead scoring + IA" },
  { id: "erreurs", title: "Erreurs classiques" },
  { id: "mesurer-efficacite", title: "Mesurer l&apos;efficacite" },
  { id: "modele-ceres", title: "Notre modele Ceres" },
];

const relatedArticles = [
  { title: "Account-Based Marketing : le guide complet ABM", slug: "account-based-marketing-guide", category: "Process & Outils", color: "#6C5CE7" },
  { title: "9 actions commerciales a automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "Automatisation", color: "#FF7A59" },
  { title: "TOFU, MOFU, BOFU : strategie inbound", slug: "tofu-mofu-bofu-strategie-inbound", category: "RevOps", color: "#4B5EFC" },
];

export default function LeadScoringGuidePage() {
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
        <div className="h-full bg-[#6C5CE7] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "8%", width: 300, height: 300, borderRadius: "50%", background: "#6C5CE7", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "22%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "38%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "55%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "72%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "88%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(70px)" }} />

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
                        ? "border-[#6C5CE7] text-[#111] font-medium"
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
              <span className="text-[#666]">Lead Scoring</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>Process &amp; Outils</Badge>
                <span className="text-[11px] text-[#CCC]">16 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Lead scoring : le guide complet pour qualifier vos leads B2B
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Le lead scoring est le systeme qui permet de distinguer un prospect pret a acheter d&apos;un simple curieux. Ce guide couvre tout : la theorie derriere le scoring, les deux dimensions (fit + engagement), la mise en place dans HubSpot etape par etape, le predictive scoring avec l&apos;IA, et les erreurs a eviter absolument. Methode concrete et actionnable.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>18 mars 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 — Definition */}
              <section id="definition" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">C&apos;est quoi le lead scoring</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le lead scoring est une methodologie qui consiste a attribuer un score numerique a chaque lead de votre base en fonction de criteres predetermines. L&apos;objectif est simple : hierarchiser vos prospects pour que vos commerciaux concentrent leur energie sur ceux qui ont la plus forte probabilite de devenir clients.</p>
                    <p>L&apos;analogie la plus parlante est celle du thermometre. Imaginez que chaque lead entre dans votre CRM avec une temperature de zero degre. A chaque action qu&apos;il realise (telecharger un livre blanc, visiter la page pricing, ouvrir un email) et a chaque critere qu&apos;il remplit (bonne taille d&apos;entreprise, bon secteur, bon poste), sa temperature monte. Quand il depasse un certain seuil, il est &ldquo;chaud&rdquo; et pret a etre contacte par un commercial.</p>
                    <p>Sans lead scoring, vos commerciaux traitent tous les leads de la meme maniere. Ils passent autant de temps sur un etudiant qui a telecharge un ebook que sur un directeur commercial d&apos;une entreprise de 200 personnes qui a visite votre page pricing trois fois cette semaine. Le resultat : un taux de conversion catastrophique, une equipe commerciale frustrée et un cycle de vente rallonge inutilement.</p>
                    <p>Le lead scoring resout ce probleme en creant un langage commun entre le marketing et les ventes. Le marketing genere des leads, le scoring les qualifie, et les ventes recoivent uniquement les leads qui meritent leur attention. C&apos;est le pont entre la generation de leads et la conversion en clients.</p>
                    <p>Le scoring peut etre manuel (des regles definies par vos equipes), automatise (via un outil comme HubSpot) ou predictif (via l&apos;intelligence artificielle qui analyse les patterns de vos clients existants). Les trois approches ne sont pas mutuellement exclusives. La plupart des entreprises combinent scoring a regles et scoring predictif.</p>
                  </div>

                  {/* Visual: scoring concept */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-4">Le principe du lead scoring en un schema</p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex-1 text-center p-4 rounded-lg bg-white border border-[#EAEAEA]">
                        <div className="text-[20px] font-bold text-[#6C5CE7] mb-1">Qui</div>
                        <p className="text-[11px] text-[#999]">Fit Score</p>
                        <p className="text-[10px] text-[#BBB] mt-1">Correspond-il a votre ICP ?</p>
                      </div>
                      <div className="text-[18px] text-[#DDD] font-bold">+</div>
                      <div className="flex-1 text-center p-4 rounded-lg bg-white border border-[#EAEAEA]">
                        <div className="text-[20px] font-bold text-[#FF7A59] mb-1">Quoi</div>
                        <p className="text-[11px] text-[#999]">Engagement Score</p>
                        <p className="text-[10px] text-[#BBB] mt-1">Montre-t-il de l&apos;interet ?</p>
                      </div>
                      <div className="text-[18px] text-[#DDD] font-bold">=</div>
                      <div className="flex-1 text-center p-4 rounded-lg bg-white border border-[#EAEAEA]">
                        <div className="text-[20px] font-bold text-[#22C55E] mb-1">Score</div>
                        <p className="text-[11px] text-[#999]">Lead Score Total</p>
                        <p className="text-[10px] text-[#BBB] mt-1">Priorite de traitement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 — Pourquoi indispensable */}
              <section id="pourquoi-indispensable" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi le lead scoring est indispensable en B2B</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>En B2B, le lead scoring n&apos;est pas un luxe. C&apos;est une necessite operationnelle. Les cycles de vente sont longs (3 a 9 mois en moyenne), les paniers moyens sont eleves, et les ressources commerciales sont limitees. Chaque heure passee sur un mauvais lead est une heure perdue sur un bon prospect.</p>
                    <p>Les chiffres parlent d&apos;eux-memes. Selon une etude Forrester, les entreprises qui utilisent le lead scoring voient leur taux de conversion lead-to-client augmenter de 77%. Le temps de qualification par les sales diminue de 40%. Et le cycle de vente se raccourcit de 14% en moyenne, parce que les commerciaux interviennent au bon moment, quand le prospect est receptif.</p>
                    <p>Le lead scoring est aussi le meilleur outil pour aligner marketing et ventes. Sans scoring, les deux equipes ne parlent pas le meme langage. Le marketing se felicite d&apos;avoir genere 500 leads ce mois-ci. Les sales se plaignent que 480 d&apos;entre eux ne valent rien. Avec un scoring bien calibre, les deux equipes s&apos;accordent sur ce qu&apos;est un lead qualifie, et le transfert du marketing aux ventes se fait sur des criteres objectifs.</p>
                    <p>Autre benefice souvent sous-estime : le lead scoring permet d&apos;optimiser vos depenses marketing. En analysant le score moyen des leads generes par chaque canal (SEO, ads, LinkedIn, evenements), vous identifiez rapidement quels canaux generent des leads de qualite et lesquels generent du volume sans valeur. Vous pouvez alors reallouer votre budget en connaissance de cause.</p>
                  </div>

                  {/* Stats cards */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "+77%", label: "de taux de conversion lead-to-client avec le lead scoring (Forrester)", color: "#6C5CE7" },
                      { value: "-40%", label: "de temps de qualification par les equipes commerciales", color: "#4B5EFC" },
                      { value: "-14%", label: "de reduction du cycle de vente en moyenne", color: "#FF7A59" },
                      { value: "79%", label: "des leads marketing ne sont jamais convertis faute de scoring (MarketingSherpa)", color: "#22C55E" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-4 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2]">
                        <div className="text-[22px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-[10px] text-[#999] mt-1 leading-[1.4]">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 — Les 2 dimensions */}
              <section id="deux-dimensions" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les 2 dimensions du scoring : Fit vs Engagement</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un systeme de lead scoring efficace repose sur deux axes complementaires. Le Fit Score (score demographique) mesure a quel point le lead correspond a votre profil de client ideal. L&apos;Engagement Score (score comportemental) mesure a quel point le lead montre de l&apos;interet pour votre solution. Les deux sont indispensables.</p>
                    <p>Un lead avec un excellent Fit Score mais zero engagement est un prospect potentiel qui ne vous connait pas encore. Il faut le nourrir. Un lead avec un fort Engagement Score mais un mauvais Fit (un etudiant qui telecharge tous vos ebooks, par exemple) ne deviendra jamais client. Il faut le filtrer. La magie opère quand les deux scores sont eleves : un decideur dans une entreprise cible qui montre activement de l&apos;interet pour votre solution.</p>
                    <p>C&apos;est pourquoi les systemes de scoring les plus performants utilisent une matrice a deux dimensions plutot qu&apos;un score unique. Cela permet de segmenter vos leads en quatre quadrants et d&apos;appliquer une strategie differente a chacun.</p>
                  </div>

                  {/* Scoring Matrix CSS Mockup */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-5">Matrice de scoring : Fit vs Engagement</p>
                    <div className="relative">
                      {/* Y-axis label */}
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-semibold text-[#999] tracking-wider uppercase whitespace-nowrap">Engagement Score</div>
                      <div className="ml-6">
                        {/* Top row */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div className="p-4 rounded-lg bg-[#FF7A59]/10 border border-[#FF7A59]/20 text-center">
                            <div className="text-[11px] font-semibold text-[#FF7A59] mb-1">Nourrir</div>
                            <p className="text-[10px] text-[#999] leading-[1.4]">Fit faible + Engagement eleve</p>
                            <p className="text-[9px] text-[#BBB] mt-1">Curieux mais pas dans votre cible. Nurturing leger, surveiller l&apos;evolution.</p>
                          </div>
                          <div className="p-4 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/25 text-center">
                            <div className="text-[11px] font-semibold text-[#22C55E] mb-1">Contacter maintenant</div>
                            <p className="text-[10px] text-[#999] leading-[1.4]">Fit eleve + Engagement eleve</p>
                            <p className="text-[9px] text-[#BBB] mt-1">Hot lead. Transfert immediat aux sales. Priorite maximale.</p>
                          </div>
                        </div>
                        {/* Bottom row */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-4 rounded-lg bg-[#E8E8E8]/40 border border-[#EAEAEA] text-center">
                            <div className="text-[11px] font-semibold text-[#999] mb-1">Dismiss</div>
                            <p className="text-[10px] text-[#BBB] leading-[1.4]">Fit faible + Engagement faible</p>
                            <p className="text-[9px] text-[#CCC] mt-1">Pas votre cible, pas interesse. Aucune action requise.</p>
                          </div>
                          <div className="p-4 rounded-lg bg-[#6C5CE7]/10 border border-[#6C5CE7]/20 text-center">
                            <div className="text-[11px] font-semibold text-[#6C5CE7] mb-1">Activer</div>
                            <p className="text-[10px] text-[#999] leading-[1.4]">Fit eleve + Engagement faible</p>
                            <p className="text-[9px] text-[#BBB] mt-1">Dans votre cible mais pas encore engage. Campagnes de nurturing ciblees.</p>
                          </div>
                        </div>
                        {/* X-axis label */}
                        <p className="text-center mt-3 text-[10px] font-semibold text-[#999] tracking-wider uppercase">Fit Score</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 — Fit scoring */}
              <section id="fit-scoring" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Fit scoring : les criteres demographiques</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le Fit Score evalue la correspondance entre le lead et votre Ideal Customer Profilee (ICP). Il se base sur des criteres statiques, c&apos;est-a-dire des informations qui ne changent pas (ou rarement) dans le temps : la taille de l&apos;entreprise, le secteur d&apos;activite, le poste occupe, la localisation geographique, le budget estime.</p>
                    <p>L&apos;idee est de repondre a une question simple : independamment de son niveau d&apos;interet, ce lead a-t-il le profil d&apos;un futur client ? Un directeur marketing dans une entreprise SaaS de 100 personnes a un meilleur profil qu&apos;un stagiaire dans une association de 3 personnes, meme si le second visite votre site tous les jours.</p>
                    <p>Pour construire votre Fit Score, analysez vos 20 a 50 meilleurs clients. Quels sont les patterns communs ? Quelle taille d&apos;entreprise, quel secteur, quel role, quel chiffre d&apos;affaires ? Ces patterns deviennent vos criteres de scoring. Chaque critere recoit un nombre de points proportionnel a son importance dans la prediction de la conversion.</p>
                  </div>

                  {/* Fit scoring point values table */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-4">Exemple de grille de Fit scoring (sur 50 points)</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[12px]">
                        <thead>
                          <tr className="border-b border-[#EAEAEA]">
                            <th className="text-left py-2.5 pr-4 text-[#999] font-medium">Critere</th>
                            <th className="text-left py-2.5 pr-4 text-[#999] font-medium">Valeur</th>
                            <th className="text-right py-2.5 text-[#999] font-medium">Points</th>
                          </tr>
                        </thead>
                        <tbody className="text-[#555]">
                          {[
                            { critere: "Taille entreprise", values: [{ val: "200+ salaries", pts: "+15" }, { val: "50-199 salaries", pts: "+10" }, { val: "10-49 salaries", pts: "+5" }, { val: "< 10 salaries", pts: "0" }] },
                            { critere: "Secteur d&apos;activite", values: [{ val: "SaaS / Tech", pts: "+10" }, { val: "Services B2B", pts: "+7" }, { val: "Industrie", pts: "+5" }, { val: "Hors cible", pts: "0" }] },
                            { critere: "Poste / Seniorite", values: [{ val: "C-Level / VP", pts: "+15" }, { val: "Directeur", pts: "+12" }, { val: "Manager", pts: "+8" }, { val: "Operationnel", pts: "+3" }] },
                            { critere: "Budget estime", values: [{ val: "> 50K EUR/an", pts: "+10" }, { val: "10-50K EUR/an", pts: "+7" }, { val: "< 10K EUR/an", pts: "+3" }, { val: "Inconnu", pts: "+2" }] },
                          ].map((row) => (
                            row.values.map((v, i) => (
                              <tr key={`${row.critere}-${i}`} className="border-b border-[#F5F5F5]">
                                {i === 0 && <td className="py-2 pr-4 font-medium text-[#111] align-top" rowSpan={row.values.length}>{row.critere}</td>}
                                <td className="py-2 pr-4">{v.val}</td>
                                <td className="py-2 text-right">
                                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${parseInt(v.pts) >= 10 ? "bg-[#22C55E]/10 text-[#22C55E]" : parseInt(v.pts) >= 5 ? "bg-[#6C5CE7]/10 text-[#6C5CE7]" : "bg-[#F0F0F0] text-[#999]"}`}>{v.pts}</span>
                                </td>
                              </tr>
                            ))
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Quelques regles pour un Fit Score qui fonctionne. Premierement, limitez-vous a 4 ou 5 criteres maximum. Chaque critere ajoute de la complexite et du bruit. Deuxiemement, ponderez en fonction de l&apos;impact reel sur la conversion. Si vos meilleurs clients sont tous dans le SaaS, le secteur merite un poids fort. Si la localisation n&apos;a pas d&apos;impact sur le closing, ne la scorez pas. Troisiemement, assurez-vous que les donnees necessaires sont disponibles dans votre CRM. Un critere que vous ne pouvez pas renseigner pour 80% de vos leads est inutile.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 — Engagement scoring */}
              <section id="engagement-scoring" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Engagement scoring : les signaux comportementaux</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;Engagement Score mesure le niveau d&apos;interet d&apos;un lead base sur ses actions. Contrairement au Fit Score qui est statique, l&apos;Engagement Score evolue en temps reel. Chaque interaction avec votre marque (visite de page, ouverture d&apos;email, telechargement de contenu, participation a un evenement) ajoute des points au score.</p>
                    <p>Tous les signaux comportementaux n&apos;ont pas la meme valeur. Un lead qui visite votre page pricing envoie un signal beaucoup plus fort qu&apos;un lead qui lit un article de blog. Un lead qui demande une demo envoie un signal d&apos;achat quasi explicite. Votre grille de scoring doit refleter cette hierarchie.</p>
                    <p>L&apos;Engagement Score a une particularite importante : il doit avoir une composante temporelle. Un lead qui a visite votre page pricing il y a 6 mois n&apos;est plus aussi chaud qu&apos;un lead qui l&apos;a visitee hier. C&apos;est pourquoi les systemes de scoring avances integrent un mecanisme de decroissance (decay) : les points accumules perdent de la valeur au fil du temps si le lead cesse d&apos;interagir.</p>
                  </div>

                  {/* Engagement scoring point values */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-4">Exemple de grille d&apos;Engagement scoring (sur 50 points)</p>
                    <div className="space-y-2">
                      {[
                        { action: "Demande de demo ou contact commercial", pts: "+20", color: "#22C55E", bar: 100 },
                        { action: "Visite de la page pricing (x2 ou plus)", pts: "+15", color: "#22C55E", bar: 75 },
                        { action: "Telechargement etude de cas", pts: "+10", color: "#6C5CE7", bar: 50 },
                        { action: "Participation webinar / evenement", pts: "+10", color: "#6C5CE7", bar: 50 },
                        { action: "Telechargement ebook / livre blanc", pts: "+7", color: "#4B5EFC", bar: 35 },
                        { action: "Visite de la page pricing (1 fois)", pts: "+7", color: "#4B5EFC", bar: 35 },
                        { action: "Ouverture email marketing (x3+)", pts: "+5", color: "#4B5EFC", bar: 25 },
                        { action: "Clic dans un email marketing", pts: "+5", color: "#4B5EFC", bar: 25 },
                        { action: "Visite blog (3+ articles)", pts: "+3", color: "#FF7A59", bar: 15 },
                        { action: "Inscription newsletter", pts: "+3", color: "#FF7A59", bar: 15 },
                        { action: "Visite site web (page d&apos;accueil seule)", pts: "+1", color: "#999", bar: 5 },
                      ].map((item) => (
                        <div key={item.action} className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[11px] text-[#555] truncate pr-2">{item.action}</span>
                              <span className="text-[11px] font-semibold shrink-0" style={{ color: item.color }}>{item.pts}</span>
                            </div>
                            <div className="h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${item.bar}%`, backgroundColor: item.color }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 p-4 rounded-lg bg-[#6C5CE7]/5 border border-[#6C5CE7]/15">
                    <p className="text-[12px] font-semibold text-[#6C5CE7] mb-1">Score decay : la decroissance temporelle</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Retirez automatiquement des points si le lead n&apos;interagit pas pendant une periode donnee. Exemple : -5 points apres 30 jours d&apos;inactivite, -10 points apres 60 jours, reset apres 90 jours sans interaction. Cela garantit que votre scoring reflète la realite, pas l&apos;historique.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 — Negative scoring */}
              <section id="negative-scoring" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Avance</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Negative scoring : quand retirer des points</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Le negative scoring est aussi important que le scoring positif. Son role : empecher les faux positifs. Un lead peut accumuler un score eleve en etant tres actif sur votre site sans pour autant etre un prospect qualifie. Le negative scoring corrige cela en retirant des points quand certains criteres sont remplis.</p>
                    <p>Sans negative scoring, vos commerciaux recevront regulierement des leads &ldquo;chauds&rdquo; qui ne devraient pas l&apos;etre. Des concurrents qui etudient votre offre. Des etudiants qui font des recherches. Des personnes en recherche d&apos;emploi qui visitent vos pages. Des leads qui se sont desabonnes de vos emails. Chacun de ces cas merite un malus.</p>
                    <p>Le negative scoring est aussi le meilleur outil pour gerer la decroissance du score dans le temps. Un lead qui n&apos;a montre aucun signe d&apos;activite depuis 60 jours ne devrait pas conserver le meme score qu&apos;il y a deux mois.</p>
                  </div>

                  <div className="mt-6 space-y-2">
                    {[
                      { critere: "Work email = adresse personnelle (gmail, hotmail)", pts: "-10", reason: "Probablement pas un decideur B2B" },
                      { critere: "Entreprise identifiee comme concurrent", pts: "-50", reason: "Disqualification immediate" },
                      { critere: "Poste : etudiant, stagiaire, freelance", pts: "-15", reason: "Hors cible, sauf exception" },
                      { critere: "Desabonnement emails marketing", pts: "-20", reason: "Signal de desinteret explicite" },
                      { critere: "30 jours sans activite", pts: "-5", reason: "Decroissance temporelle" },
                      { critere: "60 jours sans activite", pts: "-15", reason: "Lead froid" },
                      { critere: "90+ jours sans activite", pts: "-30", reason: "Reset quasi-total" },
                      { critere: "Formulaire rempli avec donnees fictives", pts: "-25", reason: "Lead de mauvaise qualite" },
                      { critere: "Pays hors zone geographique cible", pts: "-10", reason: "Pas dans votre marche adressable" },
                    ].map((item) => (
                      <div key={item.critere} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                        <span className="text-[12px] font-bold text-[#FF4757] shrink-0 w-10 text-right">{item.pts}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-white/70 font-medium">{item.critere}</p>
                          <p className="text-[10px] text-white/40 mt-0.5">{item.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 — Seuils */}
              <section id="seuils" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Definir vos seuils : MQL, SQL, Hot Lead</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Avoir un score ne sert a rien sans seuils de qualification. Les seuils definissent a quel moment un lead change de statut et declenche une action specifique. Trois seuils sont generalement necessaires : le seuil MQL (Marketing Qualified Lead), le seuil SQL (Sales Qualified Lead) et le seuil Hot Lead.</p>
                    <p>Le seuil MQL est le premier palier. Il signifie que le lead a suffisamment de points pour meriter une attention marketing poussee : il entre dans des workflows de nurturing, recoit du contenu plus avance et est surveille de pres. Le seuil SQL indique que le lead est pret a etre pris en charge par un commercial. Le seuil Hot Lead declenche une action immediate : le commercial doit contacter ce prospect dans les 24 heures.</p>
                    <p>Les seuils ne sont pas arbitraires. Ils doivent etre calibres sur vos donnees historiques. Analysez les scores des leads qui sont devenus clients dans le passe. Quel etait leur score moyen au moment du premier contact commercial ? Quel etait leur score moyen au moment de la signature ? Ces donnees vous donnent les reperes pour fixer vos seuils.</p>
                  </div>

                  {/* Lead Score Gauge / Meter CSS Mockup */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-5">Jauge de qualification des leads</p>
                    {/* Gauge meter */}
                    <div className="relative">
                      <div className="h-6 rounded-full overflow-hidden flex">
                        <div className="flex-[30] bg-[#E8E8E8] relative">
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold text-[#999]">0-30 pts</span>
                        </div>
                        <div className="flex-[20] bg-[#6C5CE7]/20 relative">
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold text-[#6C5CE7]">30-50 pts</span>
                        </div>
                        <div className="flex-[25] bg-[#FF7A59]/25 relative">
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold text-[#FF7A59]">50-75 pts</span>
                        </div>
                        <div className="flex-[25] bg-[#22C55E]/25 relative">
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold text-[#22C55E]">75-100 pts</span>
                        </div>
                      </div>

                      {/* Labels */}
                      <div className="flex mt-3">
                        <div className="flex-[30] text-center">
                          <p className="text-[10px] font-semibold text-[#BBB]">Froid</p>
                          <p className="text-[9px] text-[#CCC] mt-0.5">Pas d&apos;action</p>
                        </div>
                        <div className="flex-[20] text-center">
                          <p className="text-[10px] font-semibold text-[#6C5CE7]">MQL</p>
                          <p className="text-[9px] text-[#999] mt-0.5">Nurturing actif</p>
                        </div>
                        <div className="flex-[25] text-center">
                          <p className="text-[10px] font-semibold text-[#FF7A59]">SQL</p>
                          <p className="text-[9px] text-[#999] mt-0.5">Transfert sales</p>
                        </div>
                        <div className="flex-[25] text-center">
                          <p className="text-[10px] font-semibold text-[#22C55E]">Hot Lead</p>
                          <p className="text-[9px] text-[#999] mt-0.5">Action dans 24h</p>
                        </div>
                      </div>

                      {/* Threshold markers */}
                      <div className="flex mt-4 gap-2">
                        {[
                          { score: "30 pts", label: "Seuil MQL", desc: "Le marketing prend en charge. Workflows de nurturing actives, contenu MOFU envoye.", color: "#6C5CE7" },
                          { score: "50 pts", label: "Seuil SQL", desc: "Transfert aux sales. Le commercial recoit une notification et doit qualifier dans les 48h.", color: "#FF7A59" },
                          { score: "75 pts", label: "Seuil Hot Lead", desc: "Urgence. Le lead a montre des signaux d&apos;achat forts. Contact dans les 24h obligatoire.", color: "#22C55E" },
                        ].map((t) => (
                          <div key={t.label} className="flex-1 p-3 rounded-lg bg-white border border-[#EAEAEA]">
                            <div className="flex items-center gap-2 mb-1.5">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                              <span className="text-[11px] font-semibold" style={{ color: t.color }}>{t.score}</span>
                            </div>
                            <p className="text-[11px] font-medium text-[#111] mb-0.5">{t.label}</p>
                            <p className="text-[10px] text-[#999] leading-[1.4]">{t.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un conseil important : ne fixez pas vos seuils trop bas. Si tout le monde est un MQL, personne ne l&apos;est. Mieux vaut commencer avec des seuils conservateurs et les baisser progressivement si le volume de leads qualifies est insuffisant. L&apos;inverse (baisser les seuils pour &ldquo;gonfler les chiffres&rdquo;) est la pire erreur possible : vous inonderez les sales de leads non qualifies et detruirez leur confiance dans le systeme.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 — HubSpot Implementation */}
              <section id="hubspot-implementation" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Implementer le lead scoring dans HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>HubSpot offre un systeme de lead scoring natif dans les plans Marketing Hub Professional et Enterprise. L&apos;implementation se fait en quatre etapes : creer les proprietes de scoring, configurer les regles positives, configurer les regles negatives, et automatiser les actions basees sur les seuils.</p>
                    <p>Voici le processus complet, etape par etape.</p>
                  </div>

                  {/* HubSpot UI CSS Mockup */}
                  <div className="mt-6 rounded-lg border-2 border-[#EAEAEA] overflow-hidden">
                    {/* HubSpot-style header bar */}
                    <div className="bg-[#2D3E50] px-4 py-2.5 flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                      </div>
                      <div className="flex-1 bg-white/10 rounded px-3 py-1 text-[10px] text-white/60 font-mono">
                        app.hubspot.com/contacts/scoring
                      </div>
                    </div>

                    {/* HubSpot navigation tabs */}
                    <div className="bg-[#F5F8FA] border-b border-[#CBD6E2] px-4 flex gap-0">
                      <div className="px-4 py-2 text-[11px] font-medium text-[#33475B] border-b-2 border-[#FF7A59] bg-white -mb-px">Score de contact</div>
                      <div className="px-4 py-2 text-[11px] text-[#7C98B6]">Score d&apos;entreprise</div>
                      <div className="px-4 py-2 text-[11px] text-[#7C98B6]">Score de deal</div>
                    </div>

                    {/* Scoring rules mockup */}
                    <div className="bg-white p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-[13px] font-semibold text-[#33475B]">HubSpot Score</p>
                          <p className="text-[10px] text-[#7C98B6]">Propriete par defaut | Score maximum : 100</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1.5 rounded text-[11px] font-medium bg-[#FF7A59] text-white">+ Add des criteres</button>
                          <button className="px-3 py-1.5 rounded text-[11px] font-medium border border-[#CBD6E2] text-[#33475B]">Tester le scoring</button>
                        </div>
                      </div>

                      {/* Positive criteria section */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-[#00BDA5]" />
                          <span className="text-[11px] font-semibold text-[#33475B] uppercase tracking-wider">Criteres positifs</span>
                        </div>
                        <div className="space-y-1.5">
                          {[
                            { rule: "Taille entreprise est 200+ salaries", section: "Fit", points: "+15", active: true },
                            { rule: "Intitule de poste contient Directeur, VP, C-Level", section: "Fit", points: "+15", active: true },
                            { rule: "Secteur est SaaS, Tech, Services B2B", section: "Fit", points: "+10", active: true },
                            { rule: "A visite la page Pricing au moins 2 fois", section: "Engagement", points: "+15", active: true },
                            { rule: "A soumis le formulaire Demande de demo", section: "Engagement", points: "+20", active: true },
                            { rule: "A telecharge une etude de cas", section: "Engagement", points: "+10", active: true },
                            { rule: "A ouvert 3+ emails marketing", section: "Engagement", points: "+5", active: true },
                          ].map((rule, i) => (
                            <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-md bg-[#F5F8FA] border border-[#CBD6E2]/50">
                              <div className={`w-1.5 h-1.5 rounded-full ${rule.active ? "bg-[#00BDA5]" : "bg-[#CBD6E2]"}`} />
                              <span className="text-[11px] text-[#33475B] flex-1">{rule.rule}</span>
                              <span className="text-[9px] px-2 py-0.5 rounded bg-[#EAF0F6] text-[#7C98B6] font-medium">{rule.section}</span>
                              <span className="text-[11px] font-semibold text-[#00BDA5]">{rule.points}</span>
                              <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#CBD6E2]"><path d="M2 6h8M6 2v8" stroke="currentColor" strokeWidth="1" /></svg>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Negative criteria section */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-[#F2545B]" />
                          <span className="text-[11px] font-semibold text-[#33475B] uppercase tracking-wider">Criteres negatifs</span>
                        </div>
                        <div className="space-y-1.5">
                          {[
                            { rule: "Email contient gmail.com, hotmail.com, yahoo.com", points: "-10", active: true },
                            { rule: "Entreprise est dans la liste Concurrents", points: "-50", active: true },
                            { rule: "Derniere activite il y a plus de 30 jours", points: "-5", active: true },
                            { rule: "S&apos;est desabonne des emails marketing", points: "-20", active: true },
                          ].map((rule, i) => (
                            <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-md bg-[#FFF5F5] border border-[#F2545B]/20">
                              <div className={`w-1.5 h-1.5 rounded-full ${rule.active ? "bg-[#F2545B]" : "bg-[#CBD6E2]"}`} />
                              <span className="text-[11px] text-[#33475B] flex-1">{rule.rule}</span>
                              <span className="text-[11px] font-semibold text-[#F2545B]">{rule.points}</span>
                              <svg width="12" height="12" viewBox="0 0 12 12" className="text-[#CBD6E2]"><path d="M2 6h8M6 2v8" stroke="currentColor" strokeWidth="1" /></svg>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step by step */}
                  <div className="mt-6 space-y-3">
                    {[
                      { step: "1", title: "Creer la propriete de scoring", desc: "Dans HubSpot, allez dans Settings > Proprietes > Proprietes du contact. Cliquez sur Creer une propriete. Type : Score. Nom : HubSpot Score (ou Score personnalise si vous voulez un score dedie). Si vous utilisez deux scores separes (Fit + Engagement), creez deux proprietes distinctes.", color: "#6C5CE7" },
                      { step: "2", title: "Configurer les regles positives", desc: "Pour chaque critere de votre grille de scoring, ajoutez une regle positive. HubSpot permet de scorer sur les proprietes du contact, les proprietes de l&apos;entreprise, les soumissions de formulaire, les pages vues, les ouvertures email, et bien d&apos;autres. Associez un nombre de points a chaque regle.", color: "#4B5EFC" },
                      { step: "3", title: "Configurer les regles negatives", desc: "Ajoutez vos criteres de negative scoring : adresses email personnelles, concurrents, desabonnements, inactivite. HubSpot permet de creer des regles basees sur la date de derniere activite pour la decroissance temporelle.", color: "#FF7A59" },
                      { step: "4", title: "Automatiser les actions sur les seuils", desc: "Creez des workflows HubSpot declenches par le score. Quand le score depasse 30 (MQL), le lead entre dans un workflow de nurturing avance. Quand il depasse 50 (SQL), une tache est creee pour le commercial et le lead change de statut de cycle de vie. Quand il depasse 75, une notification urgente est envoyee au commercial.", color: "#22C55E" },
                      { step: "5", title: "Tester et calibrer", desc: "Avant de deployer, testez votre scoring sur vos 50 derniers clients. Leur score devrait etre superieur a votre seuil SQL. Testez aussi sur des leads connus comme non qualifies : leur score devrait rester bas. Ajustez les ponderations jusqu&apos;a obtenir une separation claire entre les deux groupes.", color: "#FF7A59" },
                    ].map((item, i) => (
                      <div key={item.step} className="flex gap-4 items-start">
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold" style={{ backgroundColor: item.color }}>{item.step}</div>
                          {i < 4 && <div className="w-px h-full min-h-[20px] bg-[#E8E8E8]" />}
                        </div>
                        <div className="pb-3">
                          <p className="text-[13px] font-semibold text-[#111] mb-1">{item.title}</p>
                          <p className="text-[12px] text-[#666] leading-[1.7]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un point technique important : HubSpot recalcule le score en temps reel a chaque interaction du lead. Cela signifie que vos workflows de seuil doivent utiliser le critere &ldquo;Score est superieur ou egal a&rdquo; plutot qu&apos;une valeur fixe. Et pensez a ajouter un delai (par exemple 1 minute) avant l&apos;action suivante pour laisser le score se stabiliser apres une rafale d&apos;actions.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 — Predictive scoring */}
              <section id="predictive-scoring" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Lead scoring + IA : le predictive scoring</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le scoring a regles (celui que nous avons decrit jusqu&apos;ici) fonctionne bien quand vos criteres sont clairs et votre volume de donnees est modere. Mais il a une limite fondamentale : ce sont des humains qui choisissent les criteres et les ponderations, ce qui introduit des biais et des angles morts.</p>
                    <p>Le predictive scoring utilise l&apos;intelligence artificielle pour analyser les patterns dans vos donnees historiques et decouvrir les combinaisons de facteurs qui predisent le mieux la conversion. L&apos;IA peut identifier des correlations invisibles a l&apos;oeil humain : peut-etre que les leads qui visitent votre blog le mardi entre 10h et 11h ont un taux de conversion 3x superieur. Aucun humain ne decouvrirait ce pattern, mais un algorithme de machine learning le detecte en quelques secondes.</p>
                    <p>HubSpot propose un predictive lead scoring natif dans ses plans Enterprise. Le systeme analyse automatiquement les proprietes de vos contacts, leurs interactions avec votre contenu et leurs similarites avec vos clients existants pour generer un score de probabilite de conversion. Le score est mis a jour quotidiennement et ne necessite aucune configuration manuelle.</p>
                  </div>

                  {/* AI scoring comparison */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-sm bg-[#6C5CE7]" />
                        <span className="text-[13px] font-semibold text-[#111]">Scoring a regles</span>
                      </div>
                      <ul className="space-y-2 text-[11px] text-[#666]">
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#6C5CE7] mt-1.5 shrink-0" />Criteres definis manuellement</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#6C5CE7] mt-1.5 shrink-0" />Transparence totale (on sait pourquoi un score est eleve)</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#6C5CE7] mt-1.5 shrink-0" />Necessite une maintenance reguliere</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#6C5CE7] mt-1.5 shrink-0" />Ideal pour les equipes avec moins de 500 leads/mois</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#6C5CE7] mt-1.5 shrink-0" />Disponible des HubSpot Marketing Pro</li>
                      </ul>
                    </div>
                    <div className="p-5 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-sm bg-[#FF7A59]" />
                        <span className="text-[13px] font-semibold text-[#111]">Predictive scoring (IA)</span>
                      </div>
                      <ul className="space-y-2 text-[11px] text-[#666]">
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />Criteres decouverts par l&apos;algorithme</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />Detecte des patterns complexes et non-lineaires</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />S&apos;ameliore automatiquement avec le temps</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />Necessite un volume de donnees suffisant (1000+ contacts)</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />HubSpot Enterprise ou outils tiers</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Notre recommandation : commencez par un scoring a regles. C&apos;est plus simple a mettre en place, plus transparent et parfaitement adapte si vous generez moins de 500 leads par mois. Une fois que votre processus de scoring est mature et que vos donnees historiques sont suffisantes (au moins 1 000 contacts avec un historique de conversion), activez le predictive scoring en complement. Les deux scores peuvent coexister dans HubSpot : le score a regles pour le pilotage quotidien, le score predictif pour challenger et affiner vos hypotheses.</p>
                    <p>Avec l&apos;emergence de l&apos;IA generative, de nouveaux cas d&apos;usage apparaissent. Des outils comme Clay integrent des modeles de langage (Claude, GPT) pour analyser les sites web des prospects, leurs profils LinkedIn et leurs actualites, puis generer un score de pertinence contextuel. Ce n&apos;est plus du scoring base sur des proprietes CRM, c&apos;est du scoring base sur la comprehension du langage naturel. Cette approche est encore emergente, mais elle represente l&apos;avenir du lead scoring.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 — Erreurs classiques */}
              <section id="erreurs" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les erreurs classiques du lead scoring</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le lead scoring semble simple en theorie. En pratique, les equipes tombent regulierement dans les memes pieges. Voici les sept erreurs que nous rencontrons le plus souvent chez nos clients, et comment les eviter.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { num: "01", title: "Un scoring trop complexe", desc: "Vous avez 35 criteres, 12 niveaux de points et des regles imbriquees dans tous les sens. Personne ne comprend pourquoi un lead a tel score. Resultat : les commerciaux ne font pas confiance au score et l&apos;ignorent. Restez simple. 4-5 criteres de Fit, 5-6 criteres d&apos;Engagement, c&apos;est largement suffisant pour commencer." },
                      { num: "02", title: "Pas de feedback loop avec les sales", desc: "Le marketing deploie le scoring sans jamais demander aux commerciaux si les leads transmis sont pertinents. Apres 3 mois, les sales ont completement decroche et traitent tous les leads de la meme maniere. Mettez en place une revue mensuelle : les sales qualifient les leads recus (bon lead / mauvais lead) et le marketing ajuste les criteres et les seuils." },
                      { num: "03", title: "Des seuils fixes dans le marbre", desc: "Vous avez defini vos seuils il y a un an et vous n&apos;y avez plus touche. Votre marche a change, votre offre a evolue, vos personas aussi. Un scoring qui n&apos;est pas revise au moins tous les trimestres devient obsolete. Planifiez une revue trimestrielle de vos criteres, ponderations et seuils." },
                      { num: "04", title: "Scorer ce que vous ne pouvez pas renseigner", desc: "Vous avez mis le budget comme critere, mais cette information n&apos;est renseignee que pour 8% de vos contacts. Le critere est inutile et fausse le score des 92% restants. Ne scorez que les proprietes dont le taux de remplissage depasse 70% dans votre CRM." },
                      { num: "05", title: "Pas de negative scoring", desc: "Votre scoring ne fait qu&apos;ajouter des points, jamais en retirer. Resultat : les concurrents, les etudiants et les leads inactifs depuis 6 mois atteignent des scores eleves. Le negative scoring est aussi important que le scoring positif." },
                      { num: "06", title: "Pas d&apos;alignement marketing-sales sur les definitions", desc: "Le marketing considere qu&apos;un MQL est un lead avec un score de 20. Les sales pensent qu&apos;un MQL devrait avoir un score de 60. Les deux equipes n&apos;ont jamais discute de ces definitions ensemble. C&apos;est la recette du conflit permanent. Alignez-vous avant de deployer." },
                      { num: "07", title: "Confondre activite et intention", desc: "Un lead qui ouvre tous vos emails marketing est actif, mais pas forcement interesse par votre solution. Il peut aimer vos contenus sans jamais avoir l&apos;intention d&apos;acheter. Le scoring doit donner plus de poids aux signaux d&apos;intention explicites (visite pricing, demande de demo) qu&apos;aux signaux d&apos;activite generiques (ouvertures email, visites blog)." },
                    ].map((err) => (
                      <div key={err.num} className="flex items-start gap-3 p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <span className="text-[18px] font-bold text-[#E8E8E8] shrink-0">{err.num}</span>
                        <div>
                          <p className="text-[12px] font-semibold text-[#111] mb-1">{err.title}</p>
                          <p className="text-[11px] text-[#777] leading-[1.6]">{err.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 11 — Mesurer l'efficacite */}
              <section id="mesurer-efficacite" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Mesurer l&apos;efficacite de votre scoring</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un systeme de lead scoring n&apos;a de valeur que s&apos;il est mesure et itere. Deployer un scoring et ne jamais verifier s&apos;il fonctionne est aussi inutile que ne pas avoir de scoring du tout. Voici les KPIs a suivre pour evaluer la performance de votre scoring et l&apos;ameliorer dans le temps.</p>
                  </div>

                  {/* KPI cards */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { metric: "Taux de conversion MQL > SQL", desc: "Quel pourcentage de vos MQLs sont acceptes par les sales et deviennent des SQLs ? Si ce taux est inferieur a 30%, votre seuil MQL est trop bas ou vos criteres ne sont pas pertinents. Cible : 40-60%.", category: "Conversion" },
                      { metric: "Taux de conversion SQL > Client", desc: "Parmi les leads que les sales acceptent de travailler, combien deviennent clients ? Ce taux mesure la qualite de votre seuil SQL. Cible : 20-35% en B2B.", category: "Closing" },
                      { metric: "Score moyen des clients signes", desc: "Quel etait le score moyen de vos clients au moment de la premiere prise de contact commercial ? Si ce score est systematiquement au-dessus de votre seuil SQL, votre scoring fonctionne.", category: "Calibrage" },
                      { metric: "Taux de rejet sales", desc: "Quel pourcentage des leads transmis aux sales sont rejetes comme non qualifies ? Si ce taux depasse 40%, votre scoring laisse passer trop de faux positifs. Le negative scoring doit etre renforce.", category: "Qualite" },
                      { metric: "Temps de conversion MQL > SQL", desc: "Combien de temps un lead reste-t-il en statut MQL avant de devenir SQL ? Si ce delai est trop long, vos workflows de nurturing ne sont pas assez efficaces ou vos seuils sont mal calibres.", category: "Velocite" },
                      { metric: "Distribution des scores", desc: "Comment les scores sont-ils repartis dans votre base ? Si 80% de vos leads ont un score entre 0 et 5, votre scoring manque de granularite. Si tout le monde est a 50+, vos criteres sont trop genereux. Visez une distribution en cloche avec un pic entre 20 et 40.", category: "Distribution" },
                    ].map((m) => (
                      <div key={m.metric} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] font-semibold text-[#6C5CE7] uppercase tracking-wider bg-[#6C5CE7]/10 px-2 py-0.5 rounded">{m.category}</span>
                        </div>
                        <p className="text-[12px] font-semibold text-[#111] mb-1">{m.metric}</p>
                        <p className="text-[11px] text-[#777] leading-[1.6]">{m.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le cycle d&apos;iteration recommande : revue mensuelle des KPIs de scoring avec les equipes marketing et sales. Revue trimestrielle approfondie des criteres, des ponderations et des seuils. Re-calibrage complet annuel en analysant les donnees de l&apos;annee ecoulee pour identifier les criteres qui predisent reellement la conversion et ceux qui ne servent a rien.</p>
                    <p>Un outil pratique pour evaluer votre scoring : la matrice de confusion. Prenez vos 100 derniers leads transmis aux sales et classez-les en quatre categories : vrais positifs (score eleve, devenu client), vrais negatifs (score bas, pas devenu client), faux positifs (score eleve, pas devenu client), faux negatifs (score bas, devenu client quand meme). Un bon scoring maximise les vrais positifs et minimise les faux positifs et faux negatifs.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 12 — Modele Ceres */}
              <section id="modele-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Notre methode</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Notre modele de scoring chez Ceres</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Chez Ceres, nous avons deploye des systemes de lead scoring pour des dizaines d&apos;entreprises B2B sur HubSpot. Notre approche se distingue sur plusieurs points, fruit de l&apos;experience accumulee et des erreurs observees chez nos clients.</p>
                    <p>Premier principe : le scoring est un projet a deux equipes. Nous ne deployons jamais un scoring sans impliquer les commerciaux des la phase de conception. Les criteres de Fit sont co-definis avec les sales. Les seuils sont valides sur des donnees reelles avant deploiement. Et un mecanisme de feedback (accepte / rejete par les sales) est integre des le jour 1.</p>
                    <p>Deuxieme principe : deux scores distincts. Nous recommandons systematiquement de separer le Fit Score et l&apos;Engagement Score dans deux proprietes HubSpot differentes. Cela permet de creer la matrice 2x2 (Fit x Engagement) et d&apos;appliquer des strategies differenciees : un lead avec un bon Fit mais peu d&apos;engagement doit etre active par du marketing, pas transfere aux sales.</p>
                    <p>Troisieme principe : le scoring est vivant. Nous planifions une revue trimestrielle du scoring avec chaque client. Nous analysons les taux de conversion par tranche de score, les taux de rejet sales, et nous ajustons les ponderations et les seuils en consequence. Un scoring non maintenu est un scoring mort.</p>
                    <p>Quatrieme principe : automatisation totale. Chaque seuil declenche une action automatique dans HubSpot. MQL : le lead entre dans un workflow de nurturing avance avec du contenu MOFU. SQL : une tache est creee pour le commercial, le statut de cycle de vie change, et le lead apparait dans la vue &ldquo;A contacter&rdquo;. Hot Lead : notification Slack au commercial + email avec le contexte complet du lead (score, derniere activite, entreprise, poste).</p>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {[
                      "Audit de votre base existante et analyse des patterns de conversion",
                      "Co-construction des criteres de scoring avec marketing et sales",
                      "Configuration du Fit Score + Engagement Score dans HubSpot",
                      "Mise en place du negative scoring et de la decroissance temporelle",
                      "Definition et validation des seuils MQL / SQL / Hot Lead",
                      "Creation des workflows d&apos;automatisation sur chaque seuil",
                      "Dashboards de suivi et cadence de revue trimestrielle",
                      "Formation des equipes a l&apos;utilisation et a l&apos;interpretation du score",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2 text-[12px] text-white/50">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        {item}
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
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Pret a mettre en place votre lead scoring ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On audite votre base, on construit votre grille de scoring et on deploie le tout dans HubSpot. Premiers resultats en 4 semaines.</p>
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel decouverte
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