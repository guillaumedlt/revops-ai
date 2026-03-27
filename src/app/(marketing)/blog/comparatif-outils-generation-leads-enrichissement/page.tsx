"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Comparatif outils de generation de leads et enrichissement B2B en 2026",
  description: "Comparaison detaillee de 12 outils de generation de leads et enrichissement B2B : Clay, Apollo, Dropcontact, Kaspr, Captain Data, Phantombuster, Hunter.io, Snov.io, Cognism, ZoomInfo, Lusha, Clearbit. Prix, fonctionnalites, limites et recommandations par cas d'usage.",
  author: { "@type": "Person", name: "Guillaume Delachet" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  datePublished: "2026-03-10",
  dateModified: "2026-03-10",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/comparatif-outils-generation-leads-enrichissement" },
  articleSection: "Process & Outils",
  wordCount: 2800,
  inLanguage: "fr",
};

const sections = [
  { id: "pourquoi", title: "Pourquoi l'enrichissement est indispensable" },
  { id: "criteres", title: "Les criteres de comparaison" },
  { id: "clay", title: "Clay" },
  { id: "apollo", title: "Apollo.io" },
  { id: "dropcontact", title: "Dropcontact" },
  { id: "kaspr", title: "Kaspr" },
  { id: "scraping", title: "Captain Data / Phantombuster" },
  { id: "email-finders", title: "Hunter.io / Snov.io" },
  { id: "enterprise", title: "Cognism / ZoomInfo / Lusha / Clearbit" },
  { id: "comparatif", title: "Tableau comparatif global" },
  { id: "recommandations", title: "Quelle stack recommander" },
  { id: "stack-ceres", title: "Notre stack chez Ceres" },
];

const relatedArticles = [
  { title: "Emelia : notre test complet de l'outil de cold emailing", slug: "emelia-test-outil-cold-emailing", category: "Process & Outils", color: "#6C5CE7" },
  { title: "Tracker les soumissions de formulaire HubSpot avec GA4 et GTM", slug: "tracker-soumissions-formulaire-hubspot-google-analytics-google-tag-manager", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "9 actions commerciales que vous devriez automatiser", slug: "9-actions-commerciales-automatiser", category: "Automatisation", color: "#FF7A59" },
];

export default function ComparatifOutilsLeadsArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("pourquoi");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "25%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "45%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "60%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "78%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet?text=Comparatif%20outils%20de%20generation%20de%20leads%20B2B&url=https://www.ceres-revops.com/blog/comparatif-outils-generation-leads-enrichissement" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/comparatif-outils-generation-leads-enrichissement" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Comparatif outils de leads</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>Process &amp; Outils</Badge>
                <span className="text-[11px] text-[#CCC]">18 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Comparatif outils de generation de leads et enrichissement B2B en 2026
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Clay, Apollo, Dropcontact, Kaspr, Captain Data, Phantombuster, Hunter.io, Snov.io, Cognism, ZoomInfo, Lusha, Clearbit. On a teste et compare 12 outils de generation de leads et d&apos;enrichissement de donnees B2B. Prix, fonctionnalites, limites, conformite RGPD, integrations CRM. Voici notre analyse complete pour vous aider a construire la bonne stack.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>10 mars 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 : Pourquoi l'enrichissement est indispensable */}
              <section id="pourquoi" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi l&apos;enrichissement est devenu indispensable</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>En 2026, prospecter sans enrichissement revient a tirer a l&apos;aveugle. Les bases de donnees statiques achetees il y a deux ans sont obsoletes. Les contacts ont change de poste, les entreprises ont leve, pivote ou ferme. Selon une etude Gartner, 30% des donnees B2B deviennent obsoletes chaque annee. Sans enrichissement continu, votre CRM se degrade mecaniquement.</p>
                    <p>L&apos;enrichissement de donnees B2B consiste a completer automatiquement les informations de vos prospects : email professionnel, numero de telephone, poste actuel, taille de l&apos;entreprise, technologies utilisees, signaux d&apos;achat. C&apos;est la brique fondamentale de toute strategie outbound moderne.</p>
                    <p>Mais le marche des outils d&apos;enrichissement a explose. Il existe aujourd&apos;hui des dizaines de solutions, chacune avec un positionnement different : certaines sont specialisees dans la recherche d&apos;emails, d&apos;autres dans le scraping LinkedIn, d&apos;autres encore proposent des bases de donnees proprietaires de centaines de millions de contacts.</p>
                    <p>Le probleme, c&apos;est que la plupart des comparatifs que vous trouverez en ligne sont sponsorises ou superficiels. Ils comparent des fonctionnalites sur le papier sans les avoir testees en conditions reelles. Chez Ceres, on utilise ces outils au quotidien pour nos clients. On les connecte a HubSpot, on mesure les taux de validite des emails, on calcule le cout reel par lead enrichi. Ce comparatif est base sur cette experience terrain.</p>
                    <p>Trois tendances de fond structurent le marche en 2026 :</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" /><strong className="text-[#111]">La convergence scraping + enrichissement + sequencage.</strong> Des outils comme Clay ou Apollo combinent desormais la generation de listes, l&apos;enrichissement et l&apos;envoi dans une meme plateforme.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" /><strong className="text-[#111]">Le RGPD comme avantage concurrentiel.</strong> Les outils europeens comme Dropcontact ou Kaspr misent sur la conformite RGPD pour se differencier des acteurs americains.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] mt-2 shrink-0" /><strong className="text-[#111]">L&apos;IA dans les workflows d&apos;enrichissement.</strong> Clay a popularise les &ldquo;AI agents&rdquo; qui orchestrent plusieurs sources de donnees pour maximiser la couverture et la precision.</li>
                    </ul>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 : Les criteres de comparaison */}
              <section id="criteres" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les criteres de comparaison</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Pour comparer ces 12 outils de facon objective, on a retenu 8 criteres concrets que l&apos;on mesure en production chez nos clients :</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "Taux de validite email", desc: "Pourcentage d'emails trouves qui sont reellement delivrables. On le mesure en envoyant un echantillon via notre stack de cold email.", color: "#6C5CE7" },
                      { title: "Couverture", desc: "Capacite de l'outil a trouver des donnees sur un marche donne. Un outil peut etre excellent aux US mais mediocre en France.", color: "#4B5EFC" },
                      { title: "Prix par lead enrichi", desc: "Le cout reel par prospect enrichi, en tenant compte des credits consommes et des limites de chaque plan.", color: "#FF7A59" },
                      { title: "Integrations CRM", desc: "Qualite de l'integration native avec HubSpot, Salesforce et Pipedrive. Mapping de champs, sync bidirectionnelle, deduplication.", color: "#22C55E" },
                      { title: "Conformite RGPD", desc: "Traitement des donnees personnelles, localisation des serveurs, consentement, droit a l'effacement, DPA disponible.", color: "#6C5CE7" },
                      { title: "Facilite d'utilisation", desc: "Temps de prise en main, complexite de l'interface, documentation, courbe d'apprentissage pour une equipe non technique.", color: "#4B5EFC" },
                      { title: "API et automatisation", desc: "Qualite de l'API, limites de rate, disponibilite de webhooks, connecteurs Make/Zapier natifs.", color: "#FF7A59" },
                      { title: "Profondeur des donnees", desc: "Au-dela de l'email : telephone, technologies, signaux d'achat, donnees firmographiques, intent data.", color: "#22C55E" },
                    ].map((c) => (
                      <div key={c.title} className="rounded-xl border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                          <span className="text-[12px] font-semibold text-[#111]">{c.title}</span>
                        </div>
                        <p className="text-[11px] text-[#888] leading-[1.6]">{c.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 : Clay */}
              <section id="clay" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=clay.com&sz=32" alt="Clay" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">Clay</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#6C5CE7]/10 text-[#6C5CE7]">Notre favori</span>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Clay est l&apos;outil qui a le plus change la donne dans l&apos;enrichissement B2B ces deux dernieres annees. Son approche est radicalement differente : au lieu d&apos;avoir une seule base de donnees proprietaire, Clay agrege plus de 75 sources de donnees differentes (Clearbit, Apollo, Hunter, Lusha, Dropcontact, etc.) et utilise un systeme de &ldquo;waterfall enrichment&rdquo; pour maximiser la couverture.</p>
                    <p>Concretement, quand vous cherchez l&apos;email d&apos;un prospect, Clay interroge successivement plusieurs providers. Si le premier ne trouve rien, il passe au deuxieme, puis au troisieme, et ainsi de suite. Le resultat : des taux de couverture de 85 a 95% la ou un outil unique plafonne a 60-70%.</p>
                    <p>L&apos;autre force de Clay, c&apos;est son systeme de tableaux dynamiques. Chaque colonne peut etre une action : enrichissement, recherche Google, appel API, scoring IA. On peut construire des workflows d&apos;enrichissement complexes sans ecrire une seule ligne de code. Chez Ceres, on l&apos;utilise pour construire des listes ultra-ciblees : on part d&apos;une liste de sites web, on enrichit les donnees firmographiques, on identifie les decision-makers, on trouve leurs emails et numeros, et on pousse le tout dans HubSpot.</p>
                    <p>Le point faible : la complexite. Clay a une courbe d&apos;apprentissage raide. L&apos;interface est puissante mais dense. Il faut compter 2 a 3 semaines pour maitriser les fonctionnalites avancees. Et le prix monte vite quand on fait du volume.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Clay (mars 2026)</p>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { plan: "Starter", price: "149 $/mois", credits: "2 000 credits", note: "Enrichissement basique" },
                        { plan: "Explorer", price: "349 $/mois", credits: "10 000 credits", note: "Waterfall + AI" },
                        { plan: "Pro", price: "800 $/mois", credits: "50 000 credits", note: "Volume + integrations" },
                        { plan: "Enterprise", price: "Sur devis", credits: "Illimite", note: "SSO + support dedie" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#6C5CE7] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.credits}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Waterfall enrichment (75+ sources)", "AI agents pour scoring et personnalisation", "Taux de couverture 85-95%", "Integrations CRM excellentes", "Workflows visuels sans code"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Faiblesses</p>
                      {["Courbe d'apprentissage raide", "Prix eleve en volume (800+ $/mois)", "Complexe pour des besoins simples", "Pas de base de donnees propre", "Credits consommes rapidement"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#E0D4FC] bg-[#F8F5FF] p-3">
                    <p className="text-[11px] font-semibold text-[#6C5CE7] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les equipes growth et RevOps qui font de l&apos;outbound en volume et veulent maximiser la couverture d&apos;enrichissement. Necessaire si vous combinez plusieurs sources de donnees et avez besoin de workflows d&apos;enrichissement personnalises.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 : Apollo.io */}
              <section id="apollo" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=apollo.io&sz=32" alt="Apollo.io" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">Apollo.io</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#22C55E]/10 text-[#22C55E]">Meilleur rapport qualite/prix</span>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Apollo est devenu la reference pour les equipes commerciales B2B qui cherchent un outil tout-en-un. La plateforme combine une base de donnees de plus de 275 millions de contacts, un moteur d&apos;enrichissement, un outil de sequencage email et un CRM leger. Le tout a un prix qui defie la concurrence.</p>
                    <p>La base de donnees Apollo est particulierement solide sur le marche nord-americain. On obtient des taux de validite email autour de 85-90% sur les cibles US et UK. Sur le marche francais, les resultats sont plus variables : 65-75% de validite selon les segments. Les numeros de telephone directs sont moins fiables (50-60% de precision en France).</p>
                    <p>Le moteur de recherche d&apos;Apollo est son plus grand atout. Les filtres sont d&apos;une precision rare : taille d&apos;entreprise, technologies utilisees, levees de fonds recentes, recrutements en cours, changements de poste. On peut construire des listes hyper-ciblees en quelques minutes.</p>
                    <p>L&apos;integration HubSpot est l&apos;une des meilleures du marche : sync bidirectionnelle, mapping de champs custom, deduplication intelligente, enrichissement automatique des contacts existants. Chez Ceres, c&apos;est l&apos;outil qu&apos;on recommande par defaut aux equipes qui debutent en outbound.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Apollo (mars 2026)</p>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { plan: "Free", price: "0 $", credits: "10 000 credits/mois", note: "Recherche limitee" },
                        { plan: "Basic", price: "49 $/mois", credits: "Illimite", note: "Enrichissement + sequences" },
                        { plan: "Professional", price: "99 $/mois", credits: "Illimite", note: "Integrations avancees" },
                        { plan: "Organization", price: "149 $/mois/user", credits: "Illimite", note: "API + SSO + support" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#6C5CE7] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.credits}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Base de 275M+ contacts", "Plan gratuit tres genereux", "Integration HubSpot excellente", "Filtres de recherche tres precis", "Sequencage email integre"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Faiblesses</p>
                      {["Donnees moins fiables en France", "Conformite RGPD discutable", "Delivrabilite email moyenne", "Interface parfois lente", "Numeros FR peu fiables"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#D4EDDA] bg-[#F0FDF4] p-3">
                    <p className="text-[11px] font-semibold text-[#22C55E] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les equipes commerciales de 2 a 20 personnes qui veulent un outil tout-en-un (base de donnees + enrichissement + sequences) a un prix accessible. Particulierement pertinent pour les cibles US/UK.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 : Dropcontact */}
              <section id="dropcontact" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=dropcontact.com&sz=32" alt="Dropcontact" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">Dropcontact</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#4B5EFC]/10 text-[#4B5EFC]">RGPD compliant</span>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Dropcontact est un outil francais cree par Denis Cohen en 2017. Son positionnement est unique sur le marche : l&apos;enrichissement d&apos;emails professionnels 100% conforme RGPD, sans base de donnees nominative. Dropcontact ne stocke pas de base de contacts. Il genere et verifie les emails en temps reel a partir d&apos;algorithmes proprietaires.</p>
                    <p>Comment ca marche ? Vous fournissez un prenom, un nom et un nom d&apos;entreprise (ou un domaine). Dropcontact teste des combinaisons d&apos;emails (prenom.nom@domaine.com, p.nom@domaine.com, etc.) et verifie en temps reel si l&apos;adresse existe via des checks SMTP. Pas de scraping, pas de base achetee, pas de donnees stockees.</p>
                    <p>Cette approche a un avantage majeur pour les entreprises europeennes : la conformite RGPD est native. Dropcontact est certifie RGPD, les serveurs sont en France, et le DPA est inclus dans tous les plans. C&apos;est un argument decisif pour les equipes juridiques qui bloquent souvent l&apos;utilisation d&apos;outils americains.</p>
                    <p>En termes de resultats, on observe des taux de validite de 85-92% sur les emails trouves. La couverture est un peu plus faible que les outils bases sur des bases de donnees (on estime que Dropcontact trouve un email pour 60-70% des requetes), mais les emails trouves sont generalement plus fiables. L&apos;integration HubSpot native est bien faite : enrichissement automatique des contacts a la creation, nettoyage et deduplication.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Dropcontact (mars 2026)</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { plan: "Search", price: "24 eur/mois", credits: "1 000 recherches/mois", note: "Recherche email" },
                        { plan: "Premium", price: "49 eur/mois", credits: "5 000 recherches/mois", note: "Email + telephone" },
                        { plan: "Business", price: "99 eur/mois", credits: "25 000 recherches/mois", note: "Volume + API + CRM" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#6C5CE7] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.credits}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["100% conforme RGPD", "Serveurs en France", "Taux de validite eleve (85-92%)", "Integration HubSpot native", "Nettoyage et deduplication CRM"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Faiblesses</p>
                      {["Couverture plus faible (60-70%)", "Pas de base de donnees de prospection", "Pas de numeros de telephone fiables", "Necessite prenom + nom + entreprise", "Pas de filtres de recherche avances"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#C5CAF5] bg-[#EEF0FF] p-3">
                    <p className="text-[11px] font-semibold text-[#4B5EFC] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les entreprises europeennes qui ont des contraintes RGPD fortes. Excellent comme brique d&apos;enrichissement dans un workflow plus large (par exemple dans Clay, ou en complement d&apos;Apollo). Indispensable si votre DPO ou votre equipe juridique exige une conformite sans compromis.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 : Kaspr */}
              <section id="kaspr" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=kaspr.io&sz=32" alt="Kaspr" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">Kaspr</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#FF7A59]/10 text-[#FF7A59]">LinkedIn focused</span>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Kaspr est un outil francais (acquis par Cognism en 2022) specialise dans l&apos;extraction de donnees de contact directement depuis LinkedIn. Son extension Chrome est l&apos;une des plus utilisees en France : en visitant un profil LinkedIn, vous obtenez instantanement l&apos;email professionnel et le numero de telephone du prospect.</p>
                    <p>La force de Kaspr reside dans sa simplicite. Pas besoin de construire des workflows complexes ou de gerer des tableaux d&apos;enrichissement. Un clic sur un profil LinkedIn et les donnees apparaissent. C&apos;est l&apos;outil ideal pour les commerciaux terrain qui prospectent manuellement sur LinkedIn et veulent passer rapidement au cold call ou au cold email.</p>
                    <p>Les resultats sont corrects sur le marche francais : 70-80% de couverture pour les emails professionnels, 50-65% pour les numeros de telephone directs. La qualite depend beaucoup du secteur et de la taille de l&apos;entreprise cible. Les contacts dans les grandes entreprises et la tech sont mieux couverts que les PME ou les secteurs traditionnels.</p>
                    <p>L&apos;integration avec les CRM est basique mais fonctionnelle. Kaspr propose une sync HubSpot et Salesforce qui permet de pousser les contacts enrichis directement dans le CRM. Les plans incluent un systeme de credits par type de donnees (email, telephone) ce qui permet de maitriser le budget.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Kaspr (mars 2026)</p>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { plan: "Free", price: "0 eur", credits: "5 credits/mois", note: "Test uniquement" },
                        { plan: "Starter", price: "49 eur/mois", credits: "1 200 credits email", note: "+ 60 credits tel" },
                        { plan: "Business", price: "79 eur/mois", credits: "2 400 credits email", note: "+ 120 credits tel" },
                        { plan: "Organization", price: "99 eur/mois/user", credits: "12 000 credits email", note: "+ 600 credits tel" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#6C5CE7] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.credits}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Extension LinkedIn tres simple", "Bonne couverture FR (70-80% emails)", "Numeros de telephone directs", "Plan gratuit pour tester", "Integration CRM basique incluse"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Faiblesses</p>
                      {["Depend de LinkedIn (risque de ban)", "Credits limites sur les plans bas", "Pas de waterfall enrichment", "Pas d'enrichissement en masse natif", "API limitee sur les petits plans"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#FFDDD2] bg-[#FFF5F0] p-3">
                    <p className="text-[11px] font-semibold text-[#FF7A59] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les commerciaux individuels ou les petites equipes qui prospectent principalement via LinkedIn. Parfait pour du cold calling : Kaspr est l&apos;un des rares outils a fournir des numeros de telephone directs fiables en France.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 : Captain Data / Phantombuster */}
              <section id="scraping" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=captaindata.co&sz=32" alt="Captain Data" className="w-5 h-5" />
                    <img src="https://www.google.com/s2/favicons?domain=phantombuster.com&sz=32" alt="Phantombuster" className="w-5 h-5" />
                    <h2 className="text-[17px] font-semibold text-[#111]">Captain Data &amp; Phantombuster</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#111]/10 text-[#111]">Scraping &amp; automation</span>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Captain Data et Phantombuster sont des outils de scraping et d&apos;automatisation. Ils ne font pas d&apos;enrichissement a proprement parler : ils extraient des donnees de sources web (LinkedIn, Google Maps, sites web, annuaires) et les structurent dans des formats exploitables.</p>
                    <p><strong className="text-[#111]">Phantombuster</strong> est le pionnier du scraping LinkedIn en France. L&apos;outil propose plus de 100 &ldquo;Phantoms&rdquo; (scripts pre-configures) pour extraire des donnees de LinkedIn, Sales Navigator, Google, Instagram, et d&apos;autres plateformes. Le cas d&apos;usage le plus courant : extraire les membres d&apos;une recherche Sales Navigator, puis enrichir les emails avec un outil tiers (Dropcontact, Hunter). Prix : a partir de 69 $/mois pour 500 executions.</p>
                    <p><strong className="text-[#111]">Captain Data</strong> est un outil francais plus recent, positionne comme une alternative plus propre et plus structuree a Phantombuster. L&apos;interface est mieux pensee, les workflows sont plus visuels, et l&apos;outil integre nativement plusieurs providers d&apos;enrichissement (Dropcontact, Hunter, Clearbit). Le gros avantage : Captain Data gere la rotation de proxies et de comptes LinkedIn, ce qui reduit considerablement le risque de ban. Prix : a partir de 399 eur/mois.</p>
                    <p>Ces outils sont complementaires aux solutions d&apos;enrichissement. Ils servent a constituer les listes de prospects (scraping), que l&apos;on enrichit ensuite avec Clay, Dropcontact ou Apollo. Chez Ceres, on utilise Captain Data pour l&apos;extraction Sales Navigator et on passe les resultats dans Clay pour l&apos;enrichissement.</p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#F2F2F2] p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=phantombuster.com&sz=32" alt="Phantombuster" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Phantombuster</span>
                      </div>
                      <p className="text-[10px] text-[#888] leading-[1.6] mb-2">A partir de 69 $/mois. 100+ Phantoms pre-configures. Ideal pour du scraping ponctuel ou des equipes techniques qui maitrisent le paramethrage. Interface vieillissante mais fonctionnelle.</p>
                      <div className="flex gap-1 flex-wrap">
                        {["LinkedIn", "Sales Nav", "Google Maps", "Instagram"].map((t) => (
                          <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#999]">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#F2F2F2] p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=captaindata.co&sz=32" alt="Captain Data" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Captain Data</span>
                      </div>
                      <p className="text-[10px] text-[#888] leading-[1.6] mb-2">A partir de 399 eur/mois. Workflows visuels, rotation de proxies native, enrichissement integre. Plus cher mais plus fiable et plus propre pour du volume. Interface moderne.</p>
                      <div className="flex gap-1 flex-wrap">
                        {["LinkedIn", "Sales Nav", "Google", "Enrichissement"].map((t) => (
                          <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#999]">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 : Hunter.io / Snov.io */}
              <section id="email-finders" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=hunter.io&sz=32" alt="Hunter.io" className="w-5 h-5" />
                    <img src="https://www.google.com/s2/favicons?domain=snov.io&sz=32" alt="Snov.io" className="w-5 h-5" />
                    <h2 className="text-[17px] font-semibold text-[#111]">Hunter.io &amp; Snov.io</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#4B5EFC]/10 text-[#4B5EFC]">Email finders</span>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Hunter.io et Snov.io sont des outils specialises dans la recherche d&apos;emails professionnels. Ils existent depuis plus longtemps que la plupart des outils de cette liste et restent des references pour une utilisation simple et ponctuelle.</p>
                    <p><strong className="text-[#111]">Hunter.io</strong> est l&apos;outil le plus connu pour trouver des emails a partir d&apos;un nom de domaine. La fonction &ldquo;Domain Search&rdquo; liste tous les emails connus associes a un domaine, avec un score de confiance. La fonction &ldquo;Email Finder&rdquo; trouve l&apos;email d&apos;une personne specifique a partir de son prenom, nom et domaine. L&apos;API est propre et bien documentee, ce qui en fait un excellent choix comme provider dans Clay ou dans des workflows Make/n8n. Prix : gratuit pour 25 recherches/mois, puis a partir de 49 $/mois pour 500 recherches.</p>
                    <p><strong className="text-[#111]">Snov.io</strong> va un peu plus loin que Hunter en proposant egalement un outil de sequencage email et un CRM leger. La base de donnees est plus large (environ 100 millions de contacts) et l&apos;outil inclut la verification d&apos;emails en masse. Le point fort de Snov.io est son extension Chrome qui fonctionne sur LinkedIn, les sites web et Gmail. Prix : a partir de 39 $/mois pour 1 000 credits.</p>
                    <p>Ces deux outils sont solides pour de la recherche d&apos;emails ponctuelle, mais ils sont de plus en plus concurrences par des plateformes plus completes comme Apollo ou Clay. Leur force reste leur simplicite et leur prix accessible pour des besoins limites.</p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#F2F2F2] p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=hunter.io&sz=32" alt="Hunter.io" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Hunter.io</span>
                      </div>
                      <div className="space-y-1.5">
                        {[
                          { label: "Prix", value: "49 $/mois (500 rech.)" },
                          { label: "Couverture email", value: "65-75%" },
                          { label: "Taux de validite", value: "80-88%" },
                          { label: "API", value: "Excellente" },
                          { label: "RGPD", value: "Conforme (siege FR)" },
                        ].map((r) => (
                          <div key={r.label} className="flex justify-between">
                            <span className="text-[10px] text-[#999]">{r.label}</span>
                            <span className="text-[10px] font-medium text-[#111]">{r.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#F2F2F2] p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=snov.io&sz=32" alt="Snov.io" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Snov.io</span>
                      </div>
                      <div className="space-y-1.5">
                        {[
                          { label: "Prix", value: "39 $/mois (1 000 cr.)" },
                          { label: "Couverture email", value: "60-70%" },
                          { label: "Taux de validite", value: "75-85%" },
                          { label: "API", value: "Bonne" },
                          { label: "RGPD", value: "Partiel" },
                        ].map((r) => (
                          <div key={r.label} className="flex justify-between">
                            <span className="text-[10px] text-[#999]">{r.label}</span>
                            <span className="text-[10px] font-medium text-[#111]">{r.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 : Enterprise (Cognism, ZoomInfo, Lusha, Clearbit) */}
              <section id="enterprise" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Cognism, ZoomInfo, Lusha &amp; Clearbit : les solutions enterprise</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Ces quatre outils ciblent les equipes commerciales de 20 personnes et plus, avec des budgets d&apos;enrichissement consequents (10 000 a 100 000+ euros par an). Ils offrent des bases de donnees massives, des donnees d&apos;intention d&apos;achat, et des integrations profondes avec les CRM enterprise.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        tool: "Cognism",
                        icon: "cognism.com",
                        price: "A partir de ~25 000 eur/an",
                        desc: "Base de donnees europeenne de reference. Excellente couverture en France, UK et DACH. Numeros de telephone verifies manuellement (Diamond Data). Conforme RGPD avec des equipes juridiques dediees. La meilleure option enterprise pour le marche europeen.",
                        tags: ["400M+ contacts", "RGPD", "Numeros verifies", "Intent data"],
                        color: "#6C5CE7",
                      },
                      {
                        tool: "ZoomInfo",
                        icon: "zoominfo.com",
                        price: "A partir de ~30 000 $/an",
                        desc: "Le leader mondial de l'enrichissement B2B. Base de donnees de 600M+ de contacts. Les donnees les plus completes du marche : firmographiques, technographiques, intent data, organigrammes. Couverture imbattable aux US, correcte en Europe. Tres cher et engagement annuel obligatoire.",
                        tags: ["600M+ contacts", "Intent data", "Technographics", "US focused"],
                        color: "#4B5EFC",
                      },
                      {
                        tool: "Lusha",
                        icon: "lusha.com",
                        price: "A partir de 49 $/mois/user",
                        desc: "Positionne entre les outils PME et les solutions enterprise. Extension Chrome simple et efficace, bonne couverture email et telephone. L'avantage de Lusha est son accessibilite : pas d'engagement annuel, pas de negociation commerciale. Le plan gratuit permet de tester rapidement.",
                        tags: ["200M+ contacts", "Extension Chrome", "Pas d'engagement", "API"],
                        color: "#FF7A59",
                      },
                      {
                        tool: "Clearbit (HubSpot)",
                        icon: "clearbit.com",
                        price: "Inclus avec HubSpot (certains plans)",
                        desc: "Rachete par HubSpot en 2023, Clearbit est devenu la brique d'enrichissement native de HubSpot. Si vous utilisez deja HubSpot Marketing Hub ou Sales Hub Enterprise, l'enrichissement Clearbit est inclus. Les donnees firmographiques sont excellentes (technologies, revenus, nombre d'employes). L'enrichissement email est moins complet que les outils dedies.",
                        tags: ["Natif HubSpot", "Firmographics", "Technographics", "Reveal (IP)"],
                        color: "#22C55E",
                      },
                    ].map((t) => (
                      <div key={t.tool} className="flex gap-3 rounded-xl border border-[#F2F2F2] p-4">
                        <img src={`https://www.google.com/s2/favicons?domain=${t.icon}&sz=32`} alt={t.tool} className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[12px] font-semibold text-[#111]">{t.tool}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${t.color}15`, color: t.color }}>{t.price}</span>
                          </div>
                          <p className="text-[11px] text-[#888] leading-[1.6] mb-2">{t.desc}</p>
                          <div className="flex gap-1 flex-wrap">
                            {t.tags.map((tag) => (
                              <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#999]">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Notre avis sur les outils enterprise</p>
                    <p className="text-[11px] text-[#777] leading-[1.65]">Pour la majorite de nos clients (PME et scale-ups europeennes), ces outils sont surdimensionnes et trop chers. On les recommande uniquement aux equipes de plus de 20 commerciaux avec un budget outbound superieur a 100 000 euros par an. Pour les autres, la combinaison Clay + Apollo + Dropcontact offre une couverture equivalente a une fraction du prix.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 : Tableau comparatif global */}
              <section id="comparatif" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Tableau comparatif global</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">Vue d&apos;ensemble des 12 outils compares, avec les criteres qui comptent en production.</p>

                  <div className="overflow-x-auto">
                    <div className="min-w-[700px]">
                      <div className="grid grid-cols-7 gap-2 pb-3 border-b border-[#E8E8E8]">
                        <span className="text-[10px] font-semibold text-[#999]">Outil</span>
                        <span className="text-[10px] font-semibold text-[#6C5CE7] text-center">Prix entree</span>
                        <span className="text-[10px] font-semibold text-[#6C5CE7] text-center">Couverture FR</span>
                        <span className="text-[10px] font-semibold text-[#6C5CE7] text-center">Validite email</span>
                        <span className="text-[10px] font-semibold text-[#6C5CE7] text-center">RGPD</span>
                        <span className="text-[10px] font-semibold text-[#6C5CE7] text-center">Integration CRM</span>
                        <span className="text-[10px] font-semibold text-[#6C5CE7] text-center">Categorie</span>
                      </div>
                      {[
                        { tool: "Clay", icon: "clay.com", price: "149 $/mois", couverture: "85-95%", validite: "90%+", rgpd: "Partiel", crm: "Excellent", cat: "Enrichissement" },
                        { tool: "Apollo.io", icon: "apollo.io", price: "0-49 $/mois", couverture: "65-75%", validite: "85-90%", rgpd: "Partiel", crm: "Excellent", cat: "All-in-one" },
                        { tool: "Dropcontact", icon: "dropcontact.com", price: "24 eur/mois", couverture: "60-70%", validite: "85-92%", rgpd: "Complet", crm: "Bon", cat: "Enrichissement" },
                        { tool: "Kaspr", icon: "kaspr.io", price: "0-49 eur/mois", couverture: "70-80%", validite: "80-85%", rgpd: "Bon", crm: "Basique", cat: "LinkedIn" },
                        { tool: "Captain Data", icon: "captaindata.co", price: "399 eur/mois", couverture: "Variable", validite: "Variable", rgpd: "Partiel", crm: "Via API", cat: "Scraping" },
                        { tool: "Phantombuster", icon: "phantombuster.com", price: "69 $/mois", couverture: "Variable", validite: "Variable", rgpd: "Partiel", crm: "Via API", cat: "Scraping" },
                        { tool: "Hunter.io", icon: "hunter.io", price: "0-49 $/mois", couverture: "65-75%", validite: "80-88%", rgpd: "Bon", crm: "Basique", cat: "Email finder" },
                        { tool: "Snov.io", icon: "snov.io", price: "39 $/mois", couverture: "60-70%", validite: "75-85%", rgpd: "Partiel", crm: "Basique", cat: "Email finder" },
                        { tool: "Cognism", icon: "cognism.com", price: "~25k eur/an", couverture: "80-90%", validite: "90%+", rgpd: "Complet", crm: "Excellent", cat: "Enterprise" },
                        { tool: "ZoomInfo", icon: "zoominfo.com", price: "~30k $/an", couverture: "60-70%", validite: "85-90%", rgpd: "Partiel", crm: "Excellent", cat: "Enterprise" },
                        { tool: "Lusha", icon: "lusha.com", price: "49 $/mois", couverture: "65-75%", validite: "80-85%", rgpd: "Partiel", crm: "Bon", cat: "Enrichissement" },
                        { tool: "Clearbit", icon: "clearbit.com", price: "Incl. HubSpot", couverture: "55-65%", validite: "80-85%", rgpd: "Bon", crm: "Natif HubSpot", cat: "Firmographics" },
                      ].map((row) => (
                        <div key={row.tool} className="grid grid-cols-7 gap-2 py-2.5 border-b border-[#F5F5F5] items-center">
                          <div className="flex items-center gap-2">
                            <img src={`https://www.google.com/s2/favicons?domain=${row.icon}&sz=32`} alt={row.tool} className="w-4 h-4" />
                            <span className="text-[11px] font-medium text-[#111]">{row.tool}</span>
                          </div>
                          <span className="text-[10px] text-[#555] text-center">{row.price}</span>
                          <span className="text-[10px] text-[#555] text-center">{row.couverture}</span>
                          <span className="text-[10px] text-[#555] text-center">{row.validite}</span>
                          <span className={`text-[10px] text-center font-medium ${row.rgpd === "Complet" ? "text-[#22C55E]" : row.rgpd === "Bon" ? "text-[#4B5EFC]" : "text-[#FF7A59]"}`}>{row.rgpd}</span>
                          <span className="text-[10px] text-[#555] text-center">{row.crm}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#999] text-center">{row.cat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 11 : Quelle stack recommander */}
              <section id="recommandations" className="mb-8">
                <div className="rounded-2xl bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Recommandations</span>
                  <h2 className="text-[20px] font-semibold text-white mb-4">Quelle stack recommander selon votre cas</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75] mb-6">
                    <p>Il n&apos;existe pas d&apos;outil unique qui couvre tous les besoins. La bonne approche est de construire une stack adaptee a votre contexte : taille d&apos;equipe, marche cible, budget, contraintes RGPD. Voici nos recommandations par profil.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        profil: "Freelance / solopreneur",
                        budget: "< 100 eur/mois",
                        stack: "Apollo (gratuit) + Hunter.io (gratuit) + Kaspr (gratuit)",
                        desc: "Les trois offrent des plans gratuits genereux. Apollo pour la base de donnees et les sequences, Hunter pour la recherche d'email ponctuelle, Kaspr pour LinkedIn. Cout total : 0 euros.",
                      },
                      {
                        profil: "Startup / PME (2-10 commerciaux)",
                        budget: "200-500 eur/mois",
                        stack: "Apollo (Basic) + Dropcontact + Kaspr (Starter)",
                        desc: "Apollo comme base de donnees principale et outil de sequences. Dropcontact pour l'enrichissement RGPD des contacts europeens. Kaspr pour le cold calling via LinkedIn. Integration HubSpot via Apollo.",
                      },
                      {
                        profil: "Scale-up / agence (10-30 personnes)",
                        budget: "500-2000 eur/mois",
                        stack: "Clay (Explorer) + Apollo + Dropcontact + Captain Data",
                        desc: "Clay comme orchestrateur d'enrichissement (waterfall). Apollo et Dropcontact comme providers dans Clay. Captain Data pour le scraping Sales Navigator en volume. C'est la stack qu'on utilise chez Ceres.",
                      },
                      {
                        profil: "Enterprise (30+ commerciaux)",
                        budget: "2000+ eur/mois",
                        stack: "Cognism + Clay + Clearbit (via HubSpot)",
                        desc: "Cognism pour la base de donnees et les numeros de telephone verifies. Clay pour les workflows d'enrichissement custom. Clearbit natif dans HubSpot pour l'enrichissement continu du CRM.",
                      },
                      {
                        profil: "Marche francais uniquement",
                        budget: "Variable",
                        stack: "Dropcontact + Kaspr + Captain Data",
                        desc: "Stack 100% franco-europeenne, conforme RGPD. Dropcontact pour les emails, Kaspr pour LinkedIn et les telephones, Captain Data pour le scraping. Pas besoin d'outils US si vous ne prospectez qu'en France.",
                      },
                    ].map((r) => (
                      <div key={r.profil} className="rounded-xl bg-white/5 border border-white/10 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[12px] font-semibold text-white">{r.profil}</span>
                          <span className="text-[10px] text-[#6C5CE7] font-medium">{r.budget}</span>
                        </div>
                        <p className="text-[11px] text-[#6C5CE7] font-medium mb-1">{r.stack}</p>
                        <p className="text-[11px] text-white/40 leading-[1.6]">{r.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 12 : Notre stack chez Ceres */}
              <section id="stack-ceres" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Notre stack chez Ceres</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Chez Ceres, on gere la prospection outbound et l&apos;enrichissement de donnees pour une dizaine de clients B2B. Notre stack a evolue avec le temps et les besoins. Voici ce qu&apos;on utilise aujourd&apos;hui en production.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        etape: "1. Constitution des listes",
                        outil: "Captain Data + Sales Navigator",
                        icon: "captaindata.co",
                        desc: "On utilise Captain Data pour extraire les resultats de recherches Sales Navigator. Les listes sont automatiquement nettoyees et deduplicquees avant enrichissement. On gere la rotation des comptes LinkedIn pour eviter les bans.",
                      },
                      {
                        etape: "2. Enrichissement waterfall",
                        outil: "Clay (avec Apollo + Dropcontact + Hunter)",
                        icon: "clay.com",
                        desc: "Les listes passent dans Clay ou on a configure un workflow de waterfall enrichment. Clay interroge successivement Apollo, Dropcontact et Hunter pour maximiser la couverture email. On obtient des taux de 90%+ sur les marches FR et US.",
                      },
                      {
                        etape: "3. Verification des emails",
                        outil: "Dropcontact + verification SMTP",
                        icon: "dropcontact.com",
                        desc: "Tous les emails passes par le waterfall sont verifies une seconde fois via Dropcontact. On elimine les catch-all et les emails non verifiables. Le taux de bounce final est inferieur a 2%.",
                      },
                      {
                        etape: "4. Push vers le CRM",
                        outil: "Clay vers HubSpot (via integration native)",
                        icon: "hubspot.com",
                        desc: "Les contacts enrichis et verifies sont pousses dans HubSpot avec un mapping precis : prenom, nom, email, telephone, poste, entreprise, taille, secteur, source d'acquisition. On cree automatiquement les entreprises associees.",
                      },
                      {
                        etape: "5. Sequencage",
                        outil: "Emelia ou HubSpot Sequences",
                        icon: "emelia.io",
                        desc: "Selon le client, on utilise Emelia (pour du cold email pur avec un budget serre) ou les sequences HubSpot (pour les equipes qui veulent tout centraliser dans le CRM). Les contacts non-repondeurs sont recycles dans des campagnes nurturing.",
                      },
                    ].map((s) => (
                      <div key={s.etape} className="flex gap-3 rounded-xl border border-[#F2F2F2] p-4">
                        <img src={`https://www.google.com/s2/favicons?domain=${s.icon}&sz=32`} alt={s.outil} className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-[11px] font-semibold text-[#6C5CE7] mb-0.5">{s.etape}</p>
                          <p className="text-[12px] font-semibold text-[#111] mb-1">{s.outil}</p>
                          <p className="text-[11px] text-[#888] leading-[1.6]">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Cout total de la stack</p>
                    <p className="text-[11px] text-[#777] leading-[1.65]">Pour un client type qui enrichit 5 000 contacts par mois : Clay Explorer (349 $) + Captain Data (399 eur) + Dropcontact Premium (49 eur) + Apollo Basic (49 $). Total : environ 850 eur par mois. C&apos;est un investissement significatif, mais le cout par lead enrichi et verifie revient a environ 0,17 eur, ce qui reste tres competitif compare aux solutions enterprise (Cognism ou ZoomInfo sont 3 a 5 fois plus chers a volume equivalent).</p>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le point cle de cette stack, c&apos;est la combinaison de plusieurs sources de donnees via Clay. Aucun outil seul ne fournit une couverture suffisante pour de la prospection en volume. Le waterfall enrichment est la seule approche qui garantit des taux de couverture superieurs a 85% de facon constante.</p>
                    <p>L&apos;autre avantage de cette architecture : la modularite. Si demain un nouvel outil d&apos;enrichissement sort (et il y en a tous les mois), on peut l&apos;ajouter comme provider supplementaire dans Clay sans changer le reste du workflow. On a fait exactement ca quand Dropcontact a ameliore sa couverture sur les numeros de telephone en 2025.</p>
                    <p>Le choix des outils depend aussi du marche cible. Pour un client qui prospecte exclusivement en France, on privilege Dropcontact et Kaspr. Pour un client qui cible les US, Apollo et Clearbit sont plus pertinents. Clay sert de couche d&apos;orchestration dans les deux cas.</p>
                  </div>
                </div>
              </section>
            </article>

            {/* Related articles */}
            <section className="mt-12 mb-8">
              <p className="text-[13px] font-semibold text-[#111] mb-4">Articles similaires</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedArticles.map((a) => (
                  <Link key={a.slug} href={`/blog/${a.slug}`} className="rounded-xl border border-[#F2F2F2] p-4 hover:border-[#DDD] transition-colors group">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white mb-3" style={{ background: a.color }}>
                      {a.category[0]}
                    </div>
                    <p className="text-[12px] font-semibold text-[#111] leading-[1.4] group-hover:text-[#6C5CE7] transition-colors">{a.title}</p>
                    <p className="text-[10px] text-[#999] mt-2">{a.category}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section>
              <div className="rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour construire votre stack d&apos;enrichissement ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[500px] mx-auto">On configure Clay, Apollo, Dropcontact et vos outils de prospection. Enrichissement waterfall, integration HubSpot, workflows automatises. Setup complet en moins de 2 semaines.</p>
                <div className="flex items-center justify-center gap-3">
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel
                  </a>
                  <Link href="/agence-hubspot" className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-[#E5E5E5] bg-white text-[#111] text-[13px] font-medium hover:border-[#CCC] transition-colors">
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
