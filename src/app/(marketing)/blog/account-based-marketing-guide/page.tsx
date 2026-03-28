"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Account-Based Marketing : le guide complet ABM",
  description: "Guide complet pour mettre en place une strategie ABM en B2B. De la definition de l'ICP a la mesure du ROI, en passant par l'orchestration multi-canal et l'alignement marketing-sales.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-08",
  dateModified: "2026-03-08",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/account-based-marketing-guide" },
  articleSection: "Process & Outils",
  wordCount: 2800,
  inLanguage: "fr",
};

const sections = [
  { id: "definition", title: "Qu&apos;est-ce que l&apos;ABM" },
  { id: "pourquoi-abm", title: "Pourquoi l&apos;ABM explose" },
  { id: "trois-niveaux", title: "Les 3 niveaux d&apos;ABM" },
  { id: "icp", title: "Definir votre ICP" },
  { id: "comptes-cibles", title: "Identifier les comptes" },
  { id: "intelligence", title: "Recherche commerciale" },
  { id: "personnalisation", title: "Personnaliser les messages" },
  { id: "orchestration", title: "Orchestrer les touchpoints" },
  { id: "mesurer-roi", title: "Mesurer le ROI" },
  { id: "stack-abm", title: "Les outils ABM" },
  { id: "abm-revops", title: "ABM + RevOps" },
  { id: "erreurs", title: "Les erreurs classiques" },
  { id: "approche-ceres", title: "Notre approche" },
];

const relatedArticles = [
  { title: "Les 50 points a verifier dans votre audit CRM", slug: "audit-crm-checklist", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "9 actions commerciales que vous devriez automatiser", slug: "9-actions-commerciales-automatiser", category: "Automatisation", color: "#6C5CE7" },
  { title: "HubSpot vs Salesforce en 2026", slug: "hubspot-vs-salesforce-2026", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function ABMGuidePage() {
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
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "25%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "45%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "65%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "85%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.07, filter: "blur(70px)" }} />

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
              <span className="text-[#666]">Account-Based Marketing</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>Process &amp; Outils</Badge>
                <span className="text-[11px] text-[#CCC]">20 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Account-Based Marketing : le guide complet ABM
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                L&apos;ABM est devenu la strategie de reference pour les entreprises B2B qui veulent cibler des comptes a fort potentiel. Ce guide couvre tout : de la definition de votre ICP a la mesure du ROI, en passant par l&apos;orchestration multi-canal et l&apos;alignement marketing-sales. Methode, outils, erreurs a eviter.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>8 mars 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 — Definition */}
              <section id="definition" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Qu&apos;est-ce que l&apos;Account-Based Marketing</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;Account-Based Marketing (ABM) est une strategie B2B qui consiste a concentrer les efforts marketing et commerciaux sur une liste restreinte de comptes cibles identifies comme strategiques. Plutot que de ratisser large avec de l&apos;inbound classique et d&apos;attendre que les bons prospects viennent a vous, l&apos;ABM inverse la logique : vous identifiez d&apos;abord les entreprises que vous voulez comme clients, puis vous creez des campagnes sur mesure pour les engager.</p>
                    <p>En inbound marketing, le processus suit un entonnoir : attirer du trafic, convertir en leads, qualifier, puis closer. En ABM, le processus est inverse. On commence par identifier les comptes, on les engage directement, puis on elargit l&apos;influence au sein de ces comptes. L&apos;image la plus parlante : l&apos;inbound est un filet de peche, l&apos;ABM est un harpon.</p>
                    <p>L&apos;ABM n&apos;est pas nouveau. Les meilleures equipes commerciales B2B font du &ldquo;target account selling&rdquo; depuis des decennies. Ce qui a change, c&apos;est l&apos;outillage. Avec des plateformes comme HubSpot, 6sense, Demandbase ou Clay, il est maintenant possible d&apos;executer une strategie ABM a l&apos;echelle, avec de la personnalisation a chaque touchpoint et une mesure precise du ROI par compte.</p>
                    <p>Point important : l&apos;ABM ne remplace pas l&apos;inbound. Les deux approches sont complementaires. L&apos;inbound genere du volume et nourrit la notoriete. L&apos;ABM concentre les ressources sur les comptes qui representent le plus de valeur. Les entreprises les plus performantes combinent les deux.</p>
                  </div>

                  {/* Comparison table */}
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-[12px]">
                      <thead>
                        <tr className="border-b border-[#EAEAEA]">
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Critere</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Inbound Marketing</th>
                          <th className="text-left py-3 text-[#999] font-medium">Account-Based Marketing</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#555]">
                        {[
                          ["Approche", "Attirer un maximum de leads", "Cibler des comptes specifiques"],
                          ["Volume", "Beaucoup de leads, qualification apres", "Peu de comptes, haute valeur"],
                          ["Personnalisation", "Segmentee (persona)", "Individualisee (par compte)"],
                          ["Cycle de vente", "Court a moyen", "Moyen a long"],
                          ["Panier moyen", "Variable", "Eleve (> 10K EUR/an)"],
                          ["Alignement sales", "Faible a moyen", "Indispensable"],
                          ["Mesure", "MQL, SQL, taux de conversion", "Engagement par compte, pipeline influence"],
                        ].map(([critere, inbound, abm]) => (
                          <tr key={critere} className="border-b border-[#F5F5F5]">
                            <td className="py-2.5 pr-4 font-medium text-[#111]">{critere}</td>
                            <td className="py-2.5 pr-4">{inbound}</td>
                            <td className="py-2.5">{abm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 — Pourquoi ABM explose */}
              <section id="pourquoi-abm" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi l&apos;ABM explose en B2B</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;ABM n&apos;est plus une niche reservee aux grands comptes. En 2026, c&apos;est devenu la strategie dominante pour les entreprises B2B qui vendent des solutions a plus de 10 000 euros par an. Plusieurs facteurs expliquent cette acceleration.</p>
                    <p>Premier facteur : l&apos;inbound a atteint ses limites. Les couts d&apos;acquisition par lead en B2B ont augmente de 30 a 50% entre 2022 et 2025, selon plusieurs benchmarks (HubSpot State of Marketing, Gartner). Le volume de contenu publie a explose, la concurrence sur les mots-cles est feroce, et les taux de conversion landing page ont baisse. Generer des MQL en masse ne suffit plus quand 95% de ces leads ne sont pas qualifies pour votre offre.</p>
                    <p>Deuxieme facteur : les acheteurs B2B sont de plus en plus autonomes. Gartner estime que 83% du parcours d&apos;achat B2B se fait sans interaction avec un commercial. Les comites d&apos;achat comprennent en moyenne 6 a 10 decideurs. Il faut pouvoir toucher plusieurs personnes dans le meme compte, avec des messages adaptes a leur role.</p>
                    <p>Troisieme facteur : la technologie a rendu l&apos;ABM accessible. Il y a 5 ans, seules les entreprises avec des budgets marketing a 6 chiffres pouvaient executer de l&apos;ABM. Aujourd&apos;hui, avec HubSpot ABM, Clay, LinkedIn Sales Navigator et quelques outils d&apos;enrichissement, une equipe de 3 personnes peut lancer un programme ABM operationnel.</p>
                  </div>

                  {/* Stats cards */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "87%", label: "des marketeurs B2B disent que l&apos;ABM surpasse les autres strategies en ROI", color: "#6C5CE7" },
                      { value: "171%", label: "d&apos;augmentation de la valeur contractuelle annuelle avec l&apos;ABM", color: "#4B5EFC" },
                      { value: "91%", label: "des entreprises ABM augmentent leur panier moyen", color: "#FF7A59" },
                      { value: "36%", label: "de taux de retention client superieur chez les praticiens ABM", color: "#22C55E" },
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

              {/* Section 3 — Les 3 niveaux */}
              <section id="trois-niveaux" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les 3 niveaux d&apos;ABM</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;ABM n&apos;est pas monolithique. Il existe trois approches, chacune avec un niveau de personnalisation et un investissement different. La plupart des entreprises combinent les trois.</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    {[
                      {
                        tier: "One-to-One",
                        subtitle: "ABM strategique",
                        accounts: "1 a 10 comptes",
                        effort: "Tres eleve",
                        color: "#6C5CE7",
                        desc: "Un plan marketing complet pour chaque compte. Contenu 100% personnalise, evenements dedies, cadeaux, executive sponsorship. Reserve aux comptes a tres fort potentiel (> 100K EUR/an). Necessite un binome marketing-sales dedie par compte. C&apos;est l&apos;ABM dans sa forme la plus pure.",
                      },
                      {
                        tier: "One-to-Few",
                        subtitle: "ABM par cluster",
                        accounts: "10 a 50 comptes",
                        effort: "Eleve",
                        color: "#4B5EFC",
                        desc: "Les comptes sont regroupes par industrie, taille ou problematique commune. On cree du contenu semi-personnalise par cluster. Par exemple, un livre blanc specifique pour les directeurs financiers du secteur SaaS. Les campagnes publicitaires ciblent ces clusters. L&apos;approche est plus scalable tout en restant relevante.",
                      },
                      {
                        tier: "One-to-Many",
                        subtitle: "ABM programmatique",
                        accounts: "50 a 500+ comptes",
                        effort: "Modere",
                        color: "#FF7A59",
                        desc: "On utilise la technologie pour personnaliser a l&apos;echelle. Ads ciblees par liste de comptes sur LinkedIn, emails automatises avec variables dynamiques, landing pages adaptees par segment. L&apos;investissement par compte est moindre, mais la couverture est large. C&apos;est souvent le meilleur point d&apos;entree pour les equipes qui debutent en ABM.",
                      },
                    ].map((level) => (
                      <div key={level.tier} className="p-5 rounded-lg border border-[#F0F0F0] bg-[#FAFAFA]">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: level.color }} />
                          <span className="text-[14px] font-semibold text-[#111]">{level.tier}</span>
                          <span className="text-[11px] text-[#999] ml-auto">{level.subtitle}</span>
                        </div>
                        <div className="flex gap-4 mb-3">
                          <div className="text-[11px]"><span className="text-[#999]">Comptes : </span><span className="text-[#111] font-medium">{level.accounts}</span></div>
                          <div className="text-[11px]"><span className="text-[#999]">Effort : </span><span className="text-[#111] font-medium">{level.effort}</span></div>
                        </div>
                        <p className="text-[12px] text-[#666] leading-[1.7]">{level.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 — ICP */}
              <section id="icp" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Etape 1 : Definir votre ICP (Ideal Customer Profile)</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Tout programme ABM commence par une question : quels sont les comptes qui ont la plus forte probabilite de devenir des clients a forte valeur ? Pour y repondre, vous devez construire votre ICP, le profil de votre client ideal au niveau de l&apos;entreprise (pas du contact).</p>
                    <p>L&apos;ICP n&apos;est pas un buyer persona. Le buyer persona decrit un individu (son role, ses motivations, ses frustrations). L&apos;ICP decrit une entreprise (sa taille, son secteur, sa maturite technologique, son budget). En ABM, l&apos;ICP vient en premier. Les personas viennent ensuite, pour personnaliser les messages a l&apos;interieur de chaque compte.</p>
                    <p>Pour construire un ICP solide, analysez vos 20 meilleurs clients existants. Cherchez les patterns : quel secteur, quelle taille, quelle stack technologique, quel modele economique, quel cycle de vente, quel panier moyen. Regardez aussi les deals perdus et les churns pour identifier les anti-patterns.</p>
                  </div>

                  {/* ICP framework */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-4">Framework ICP en 6 dimensions</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { dim: "Firmographiques", items: "Secteur, taille (CA, effectif), localisation, structure juridique" },
                        { dim: "Technographiques", items: "Stack actuelle, outils utilises, maturite digitale, budget IT" },
                        { dim: "Comportementaux", items: "Signaux d&apos;achat, croissance, recrutements, levees de fonds" },
                        { dim: "Relationnels", items: "Taille du comite d&apos;achat, processus de decision, cycle moyen" },
                        { dim: "Economiques", items: "Panier moyen potentiel, LTV estimee, capacite budgetaire" },
                        { dim: "Fit produit", items: "Cas d&apos;usage, problemes resolus, fonctionnalites requises" },
                      ].map((d) => (
                        <div key={d.dim} className="p-3 rounded-lg bg-white border border-[#EAEAEA]">
                          <p className="text-[11px] font-semibold text-[#6C5CE7] mb-1">{d.dim}</p>
                          <p className="text-[11px] text-[#777] leading-[1.5]">{d.items}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Une fois votre ICP defini, documentez-le clairement. Partagez-le avec les equipes marketing et sales. C&apos;est le filtre qui determinera chaque decision de votre programme ABM : quels comptes cibler, quel contenu creer, quels messages envoyer. Si votre ICP est flou, tout le reste sera flou.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 — Identifier comptes */}
              <section id="comptes-cibles" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Etape 2 : Identifier et prioriser les comptes cibles</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Avec votre ICP en main, il faut maintenant construire votre liste de comptes cibles. Ce n&apos;est pas une simple extraction de base de donnees. C&apos;est un processus qui combine donnees statiques (firmographiques), donnees dynamiques (signaux d&apos;intention) et intelligence humaine (insights sales).</p>
                    <p>Commencez par sourcer des comptes qui correspondent a votre ICP. Utilisez LinkedIn Sales Navigator pour filtrer par secteur, taille, localisation. Completez avec des bases comme Apollo, ZoomInfo ou Societeinfo pour le marche francais. Croisez avec votre CRM pour exclure les clients existants et les comptes deja en pipeline.</p>
                    <p>Ensuite, scorez chaque compte. Le scoring ABM est different du lead scoring classique. Il se fait au niveau de l&apos;entreprise, pas de l&apos;individu. Deux axes a croiser :</p>
                  </div>

                  {/* Scoring grid */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                      <p className="text-[12px] font-semibold text-[#4B5EFC] mb-2">Fit Score (statique)</p>
                      <ul className="space-y-1.5 text-[11px] text-[#666]">
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#4B5EFC] mt-1.5 shrink-0" />Correspondance avec l&apos;ICP</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#4B5EFC] mt-1.5 shrink-0" />Taille et chiffre d&apos;affaires</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#4B5EFC] mt-1.5 shrink-0" />Secteur d&apos;activite</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#4B5EFC] mt-1.5 shrink-0" />Stack technologique</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#4B5EFC] mt-1.5 shrink-0" />Historique relationnel</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                      <p className="text-[12px] font-semibold text-[#FF7A59] mb-2">Intent Score (dynamique)</p>
                      <ul className="space-y-1.5 text-[11px] text-[#666]">
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />Visites sur votre site web</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />Recherches de mots-cles (intent data)</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />Telechargements de contenu</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />Signaux de croissance ou recrutement</li>
                        <li className="flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />Activite LinkedIn ou engagement ads</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Les comptes avec un Fit Score eleve et un Intent Score eleve sont vos priorites Tier 1. Fit eleve + Intent faible va dans le Tier 2 (comptes a nourrir). Fit faible + Intent eleve va dans le Tier 3 (a surveiller). Le reste n&apos;est pas dans votre programme ABM.</p>
                    <p>Revoyez votre liste tous les trimestres. Les signaux d&apos;intention changent, les entreprises evoluent. Un compte Tier 2 peut devenir Tier 1 si un signal fort apparait (levee de fonds, recrutement d&apos;un VP Sales, changement de CRM).</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 — Intelligence commerciale */}
              <section id="intelligence" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Etape 3 : Recherche et intelligence commerciale</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Une fois vos comptes cibles identifies, vous devez les connaitre en profondeur. C&apos;est la phase de recherche, souvent negligee mais absolument critique. La qualite de votre personnalisation depend directement de la qualite de votre intelligence sur chaque compte.</p>
                    <p>Pour chaque compte Tier 1, constituez un dossier qui couvre :</p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {[
                      { title: "Structure organisationnelle", desc: "Qui sont les decideurs, les influenceurs, les utilisateurs finaux. Cartographiez le comite d&apos;achat. Identifiez le champion potentiel (la personne interne qui va porter votre solution)." },
                      { title: "Enjeux business", desc: "Quels sont les objectifs strategiques de l&apos;entreprise cette annee. Consultez les rapports annuels, les communiques de presse, les interviews du CEO. Identifiez les douleurs metier que votre solution adresse." },
                      { title: "Stack technologique", desc: "Quels outils utilisent-ils. Utilisez BuiltWith, Wappalyzer ou HG Insights pour detecter la stack. Un changement de technologie est un signal d&apos;achat fort." },
                      { title: "Actualites recentes", desc: "Levees de fonds, nominations, acquisitions, lancement de nouveaux produits, recrutements. Google Alerts, LinkedIn et la presse sectorielle sont vos amis." },
                      { title: "Relations existantes", desc: "Avez-vous des connexions en commun sur LinkedIn. Y a-t-il eu des interactions passees avec votre entreprise. Un ancien client, un participant a un webinaire, un visiteur du site." },
                    ].map((item) => (
                      <div key={item.title} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <p className="text-[12px] font-semibold text-[#111] mb-1">{item.title}</p>
                        <p className="text-[11px] text-[#777] leading-[1.6]">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Pour les comptes Tier 2 et 3, la recherche peut etre plus legere. Concentrez-vous sur le secteur, la taille et un ou deux enjeux cles. L&apos;objectif est d&apos;avoir suffisamment de contexte pour personnaliser le premier message sans y passer 2 heures par compte.</p>
                    <p>Des outils comme Clay permettent d&apos;automatiser une partie de cette recherche en agregeant des donnees de multiples sources (LinkedIn, Crunchbase, sites web, articles de presse) et en les structurant automatiquement.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 — Personnalisation */}
              <section id="personnalisation" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Etape 4 : Personnaliser les messages par compte</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La personnalisation est le coeur de l&apos;ABM. Et on ne parle pas d&apos;inserer le prenom du contact dans un email. On parle de creer des messages qui demontrent une comprehension reelle des enjeux specifiques de chaque compte.</p>
                    <p>Le niveau de personnalisation depend du tier. En One-to-One (Tier 1), chaque piece de contenu est creee pour un compte specifique : etude de cas personnalisee, proposition de valeur adaptee, demonstration sur mesure avec les donnees du prospect. En One-to-Few (Tier 2), on personnalise par cluster : un contenu par secteur ou par problematique. En One-to-Many (Tier 3), on utilise des variables dynamiques et des segments dans les outils de marketing automation.</p>
                  </div>

                  {/* Personalization levels */}
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-[12px]">
                      <thead>
                        <tr className="border-b border-[#EAEAEA]">
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Element</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Tier 1</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Tier 2</th>
                          <th className="text-left py-3 text-[#999] font-medium">Tier 3</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#555]">
                        {[
                          ["Email initial", "100% personnalise", "Par cluster", "Template + variables"],
                          ["Landing page", "Page dediee au compte", "Page par secteur", "Page generique"],
                          ["Contenu", "Etude de cas sur mesure", "Contenu sectoriel", "Contenu segmente"],
                          ["Demo", "Environnement personnalise", "Scenario sectoriel", "Demo standard"],
                          ["Ads", "Messages specifiques au compte", "Ads par cluster", "Ads par segment"],
                        ].map(([element, t1, t2, t3]) => (
                          <tr key={element} className="border-b border-[#F5F5F5]">
                            <td className="py-2.5 pr-4 font-medium text-[#111]">{element}</td>
                            <td className="py-2.5 pr-4">{t1}</td>
                            <td className="py-2.5 pr-4">{t2}</td>
                            <td className="py-2.5">{t3}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Quelques principes pour une personnalisation qui fonctionne :</p>
                    <ul className="space-y-2 pl-1">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" />Montrez que vous comprenez le probleme, pas que vous avez une solution</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" />Referencez des elements concrets : un post LinkedIn, un article de presse, une offre d&apos;emploi</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" />Adaptez le message au role du destinataire (le CFO ne se preoccupe pas des memes choses que le VP Marketing)</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" />Evitez la fausse personnalisation (&ldquo;J&apos;ai vu que vous etiez chez [Entreprise], impressionnant !&rdquo;)</li>
                    </ul>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 — Orchestration */}
              <section id="orchestration" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Etape 5 : Orchestrer les touchpoints multi-canal</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;ABM ne se limite pas a envoyer des emails. C&apos;est une orchestration multi-canal qui vise a creer une omnipresence maitrisee autour de vos comptes cibles. L&apos;objectif : que chaque decideur du compte voie votre marque et votre proposition de valeur sur plusieurs canaux, dans un timing coordonne.</p>
                    <p>Les canaux les plus utilises en ABM B2B :</p>
                  </div>

                  {/* Channel workflow */}
                  <div className="mt-5 space-y-3">
                    {[
                      { channel: "LinkedIn Ads", desc: "Campagnes matched audiences ciblant les entreprises de votre liste. Formats : Sponsored Content, Message Ads, Conversation Ads. Le reach est precis, le cout par impression est eleve mais le ciblage est imbattable.", week: "Semaine 1-2", color: "#4B5EFC" },
                      { channel: "Email personnalise", desc: "Sequences email envoyees par les sales (pas par le marketing). Le message vient d&apos;une personne reelle, avec une signature, un calendrier de prise de rendez-vous. Outils : HubSpot sequences, Lemlist, Emelia.", week: "Semaine 2-3", color: "#6C5CE7" },
                      { channel: "Contenu cible", desc: "Articles de blog, etudes de cas, webinaires ou livres blancs crees pour le segment. Distribues via ads, email et social selling. L&apos;objectif est d&apos;eduquer et de positionner votre expertise.", week: "Semaine 1-4", color: "#FF7A59" },
                      { channel: "Social selling", desc: "Interactions organiques sur LinkedIn : commenter les publications des decideurs, partager du contenu pertinent, envoyer des invitations personnalisees. Le travail du commercial, pas du marketing.", week: "Semaine 1-4", color: "#22C55E" },
                      { channel: "Events et direct mail", desc: "Pour les comptes Tier 1, des invitations a des diners, des envois physiques (livres, colis personnalises), des invitations a des evenements exclusifs. Fort impact, faible volume.", week: "Semaine 3-4", color: "#FF7A59" },
                    ].map((ch, i) => (
                      <div key={ch.channel} className="flex gap-4 items-start">
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold" style={{ backgroundColor: ch.color }}>{i + 1}</div>
                          {i < 4 && <div className="w-px h-full min-h-[20px] bg-[#E8E8E8]" />}
                        </div>
                        <div className="pb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[13px] font-semibold text-[#111]">{ch.channel}</span>
                            <span className="text-[10px] text-[#999] bg-[#F5F5F5] px-2 py-0.5 rounded">{ch.week}</span>
                          </div>
                          <p className="text-[12px] text-[#666] leading-[1.7]">{ch.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;orchestration est le point ou la collaboration marketing-sales est la plus critique. Le marketing cree la notoriete et le contenu. Le commercial execute les touchpoints directs. Les deux doivent etre synchronises : si le marketing lance une campagne LinkedIn sur un compte, le commercial doit envoyer son email dans la meme fenetre temporelle, avec un message coherent.</p>
                    <p>Utilisez un playbook partage qui definit le timing, les canaux et les responsabilites pour chaque tier. Sans playbook, l&apos;orchestration devient du chaos.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 — Mesurer ROI */}
              <section id="mesurer-roi" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Etape 6 : Mesurer le ROI de l&apos;ABM</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La mesure de l&apos;ABM ne fonctionne pas comme la mesure de l&apos;inbound classique. Oubliez le nombre de leads generes. En ABM, les metriques cles operent au niveau du compte, pas de l&apos;individu. Et le cycle de mesure est plus long : un programme ABM met generalement 3 a 6 mois avant de produire des resultats mesurables sur le pipeline.</p>
                  </div>

                  {/* Metrics cards */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { metric: "Account Engagement Score", desc: "Mesure l&apos;activite cumulee de tous les contacts d&apos;un compte : visites web, ouvertures email, clics ads, interactions social. C&apos;est le thermometre de l&apos;interet du compte.", category: "Engagement" },
                      { metric: "Pipeline Influence", desc: "Valeur du pipeline sur les comptes ABM vs les comptes non ABM. Permet de mesurer l&apos;impact direct du programme sur la generation de pipeline.", category: "Pipeline" },
                      { metric: "Account Penetration Rate", desc: "Nombre de contacts engages au sein de chaque compte cible. Un compte avec 1 contact engage est fragile. 3 a 5 contacts, c&apos;est un bon signe. Au-dela de 5, vous avez un champion.", category: "Couverture" },
                      { metric: "Deal Velocity", desc: "Vitesse de progression des deals ABM dans le pipeline vs les deals non ABM. Les deals ABM closent generalement 20 a 30% plus vite.", category: "Velocite" },
                      { metric: "Win Rate", desc: "Taux de closing sur les comptes ABM vs le reste. C&apos;est la metrique ultime. Si votre win rate ABM n&apos;est pas significativement superieur, quelque chose ne va pas.", category: "Conversion" },
                      { metric: "ACV (Annual Contract Value)", desc: "Valeur contractuelle annuelle moyenne des deals ABM. L&apos;ABM doit generer des deals plus gros. Si le panier moyen est le meme que l&apos;inbound, vous ne ciblez pas les bons comptes.", category: "Revenue" },
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
                    <p>Construisez un dashboard dedie a l&apos;ABM dans votre CRM. Dans HubSpot, utilisez les proprietes de compte (target account, tier, ABM campaign) pour filtrer vos rapports. Creez des vues separees : engagement par tier, pipeline ABM vs non-ABM, progression des comptes cibles dans le funnel.</p>
                    <p>Presentez les resultats mensuellement. L&apos;ABM est un investissement a moyen terme. Les stakeholders doivent voir les leading indicators (engagement, penetration) avant les lagging indicators (pipeline, revenue).</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 — Stack ABM */}
              <section id="stack-abm" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les outils de la stack ABM</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;outillage ABM a considerablement evolue. Il n&apos;est plus necessaire d&apos;investir dans une plateforme ABM dediee a 50 000 euros par an. Voici la stack que nous recommandons en fonction de votre maturite et de votre budget.</p>
                  </div>

                  {/* Tools table */}
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-[12px]">
                      <thead>
                        <tr className="border-b border-[#EAEAEA]">
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Categorie</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Outil</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Role dans l&apos;ABM</th>
                          <th className="text-left py-3 text-[#999] font-medium">Budget</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#555]">
                        {[
                          ["CRM & Orchestration", "HubSpot (ABM tools)", "Target accounts, company scoring, ABM dashboards, sequences", "A partir de 800 EUR/mois (Pro)"],
                          ["Enrichissement", "Clay", "Enrichissement automatise multi-sources, waterfall enrichment, IA", "A partir de 149 USD/mois"],
                          ["Intent Data", "6sense / Bombora", "Detection des signaux d&apos;intention d&apos;achat au niveau du compte", "A partir de 25 000 USD/an"],
                          ["Prospection", "LinkedIn Sales Navigator", "Identification des decideurs, filtrage par compte, InMail", "A partir de 80 EUR/mois"],
                          ["Ads", "LinkedIn Campaign Manager", "Matched audiences pour cibler les listes de comptes ABM", "Variable (CPM eleve)"],
                          ["Outbound", "Lemlist / Emelia", "Sequences email automatisees personnalisees", "A partir de 39 EUR/mois"],
                          ["Content", "Mutiny / Folloze", "Personnalisation du site web par compte ou segment", "A partir de 10 000 USD/an"],
                        ].map(([cat, tool, role, budget]) => (
                          <tr key={tool} className="border-b border-[#F5F5F5]">
                            <td className="py-2.5 pr-4 font-medium text-[#111]">{cat}</td>
                            <td className="py-2.5 pr-4 font-medium text-[#6C5CE7]">{tool}</td>
                            <td className="py-2.5 pr-4">{role}</td>
                            <td className="py-2.5 text-[11px] text-[#999]">{budget}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Notre recommandation pour demarrer : HubSpot Pro + Clay + LinkedIn Sales Navigator. C&apos;est la stack minimale pour executer un programme ABM serieux. HubSpot gere le CRM, les sequences et les dashboards. Clay automatise l&apos;enrichissement et la recherche. LinkedIn permet l&apos;identification des decideurs et le social selling.</p>
                    <p>Les outils d&apos;intent data comme 6sense ou Bombora sont un game-changer, mais leur cout les reserve aux equipes avec un budget marketing consequent. Si vous debutez, les signaux que vous pouvez capter manuellement (visites web, engagement LinkedIn, signaux de croissance) suffisent pour commencer.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 11 — ABM + RevOps */}
              <section id="abm-revops" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Alignement</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">ABM + RevOps : l&apos;alignement marketing-sales</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>L&apos;ABM ne fonctionne que si marketing et sales sont parfaitement alignes. Ce n&apos;est pas un voeu pieux. C&apos;est une condition structurelle. Et c&apos;est la ou le RevOps entre en jeu.</p>
                    <p>Le RevOps (Revenue Operations) est la fonction qui aligne les processus, les outils et les donnees entre marketing, sales et customer success autour d&apos;un objectif commun : la croissance du revenu. Dans un contexte ABM, le RevOps est le chef d&apos;orchestre qui s&apos;assure que chaque equipe joue la meme partition.</p>
                    <p>Concretement, l&apos;alignement ABM-RevOps se traduit par :</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { title: "Une definition commune de l&apos;ICP", desc: "Marketing et sales doivent etre d&apos;accord sur les criteres qui definissent un bon compte. Si le marketing cible des comptes que les sales ne veulent pas travailler, c&apos;est un echec programme." },
                      { title: "Un CRM propre et structure", desc: "Les proprietes de compte (tier, statut ABM, score) doivent etre rigoureusement maintenues. Le RevOps met en place les workflows de mise a jour, les regles de validation et les rapports." },
                      { title: "Un SLA marketing-sales", desc: "Quand le marketing identifie un compte engage, en combien de temps le commercial doit-il agir. Quel est le minimum de touchpoints par semaine sur un Tier 1. Sans SLA, pas d&apos;accountability." },
                      { title: "Des donnees partagees en temps reel", desc: "Le commercial doit voir l&apos;engagement marketing du compte (ouvertures email, visites web, engagement ads). Le marketing doit voir les feedbacks terrain du commercial. Un CRM bien configure est le fondement." },
                      { title: "Des reviews regulieres", desc: "Revue hebdomadaire des comptes Tier 1, mensuelle des Tier 2. Marketing et sales dans la meme piece. On passe en revue l&apos;engagement, les blocages, les prochaines actions." },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#FF7A59]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <div>
                          <p className="text-[12px] font-medium text-white/80">{item.title}</p>
                          <p className="text-[11px] text-white/50 leading-[1.6] mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>L&apos;erreur la plus frequente : lancer un programme ABM sans changer l&apos;organisation. Si le marketing continue a etre mesure sur les MQL et le sales sur le nombre de calls, l&apos;ABM est mort-ne. Il faut des metriques partagees : pipeline influence, engagement par compte, win rate sur les target accounts.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 12 — Erreurs classiques */}
              <section id="erreurs" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les erreurs classiques en ABM</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Apres avoir accompagne plusieurs dizaines d&apos;entreprises dans la mise en place de programmes ABM, voici les erreurs que nous voyons le plus souvent.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { num: "01", title: "Cibler trop de comptes", desc: "Commencer avec 500 comptes en Tier 1, c&apos;est se condamner a faire de l&apos;inbound deguise. Mieux vaut 20 comptes vraiment travailles que 200 a peine effleures. L&apos;ABM est un jeu de profondeur, pas de largeur." },
                      { num: "02", title: "Ne pas impliquer les sales des le debut", desc: "Si les commerciaux decouvrent la liste de comptes cibles le jour du lancement, c&apos;est trop tard. Ils doivent co-construire la liste, valider l&apos;ICP et s&apos;engager sur les actions. L&apos;ABM sans buy-in commercial est un exercice marketing steril." },
                      { num: "03", title: "Confondre personnalisation et mail merge", desc: "Inserer le nom de l&apos;entreprise dans un template generique n&apos;est pas de l&apos;ABM. La personnalisation ABM exige de la recherche, de la comprehension et un message qui montre que vous connaissez les enjeux specifiques du compte." },
                      { num: "04", title: "Negliger la mesure", desc: "Lancer un programme ABM sans dashboard, sans metriques definies et sans cadence de reporting, c&apos;est naviguer a l&apos;aveugle. Vous ne saurez jamais ce qui fonctionne ni ce qui doit etre ajuste." },
                      { num: "05", title: "Vouloir des resultats en 30 jours", desc: "L&apos;ABM est une strategie a moyen terme. Les premiers signaux d&apos;engagement apparaissent en 4 a 6 semaines. Le premier deal close peut prendre 3 a 9 mois. Si votre direction attend un ROI en un mois, alignez les attentes avant de commencer." },
                      { num: "06", title: "Sous-investir dans le contenu", desc: "L&apos;ABM a besoin de contenu de qualite et personnalise. Si vous n&apos;avez pas la capacite de produire des etudes de cas, des one-pagers sectoriels ou des demos personnalisees, votre programme manquera de carburant." },
                      { num: "07", title: "Ignorer le multi-threading", desc: "Cibler un seul contact par compte est risque. Si cette personne change de poste, votre deal meurt. Visez 3 a 5 contacts par compte, avec des roles et niveaux hierarchiques differents. C&apos;est la resilience de votre programme." },
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

              {/* Section 13 — Approche Ceres */}
              <section id="approche-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Notre methode</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Notre approche ABM chez Ceres</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Chez Ceres, nous accompagnons les entreprises B2B dans la mise en place de programmes ABM integres a leur stack HubSpot. Notre approche se distingue sur trois points.</p>
                    <p>D&apos;abord, nous partons toujours du CRM. Avant de lancer un programme ABM, nous auditons votre HubSpot : proprete des donnees, structure des proprietes, pipelines, workflows existants. Un ABM construit sur un CRM mal structure est un chateau de cartes. Nous nettoyons et structurons avant de construire.</p>
                    <p>Ensuite, nous automatisons au maximum avec une stack Clay + HubSpot. L&apos;enrichissement des comptes, le scoring, les alertes de signaux d&apos;intention, la rotation des comptes entre tiers, tout est automatise. Les equipes se concentrent sur l&apos;execution des touchpoints, pas sur la saisie manuelle.</p>
                    <p>Enfin, nous mettons en place le reporting des le jour 1. Dashboards ABM dans HubSpot, rapports automatises hebdomadaires, cadence de review avec les equipes. Chaque euro investi dans le programme est traçable jusqu&apos;au pipeline genere.</p>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {[
                      "Audit CRM et structuration des donnees comptes",
                      "Definition de l&apos;ICP et construction de la target account list",
                      "Mise en place du scoring ABM dans HubSpot",
                      "Configuration Clay pour l&apos;enrichissement automatise",
                      "Creation des playbooks d&apos;orchestration par tier",
                      "Dashboards ABM et cadence de reporting",
                      "Formation des equipes marketing et sales",
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
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Pret a lancer votre programme ABM ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On structure votre CRM, on definit vos comptes cibles et on met en place les outils pour executer votre ABM. Premiers resultats en 8 semaines.</p>
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