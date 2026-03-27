"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Le meilleur CRM B2B en France en 2026",
  description: "Comparatif complet des 7 meilleurs CRM B2B disponibles en France en 2026 : HubSpot, Salesforce, Pipedrive, Microsoft Dynamics, Sellsy, Axonaut, Zoho CRM. Pipeline, gestion de comptes, forecasting, integrations, prix et recommandations par taille d entreprise.",
  author: { "@type": "Person", name: "Guillaume Delachet" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  datePublished: "2026-01-25",
  dateModified: "2026-01-25",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/meilleur-crm-b2b-france" },
  articleSection: "CRM & HubSpot",
  wordCount: 2800,
  inLanguage: "fr",
};

const sections = [
  { id: "b2b-vs-b2c", title: "Ce qu\u2019un CRM B2B doit faire" },
  { id: "criteres", title: "Les criteres de selection" },
  { id: "hubspot", title: "#1 HubSpot CRM" },
  { id: "salesforce", title: "#2 Salesforce" },
  { id: "pipedrive", title: "#3 Pipedrive" },
  { id: "dynamics", title: "#4 Microsoft Dynamics" },
  { id: "sellsy", title: "#5 Sellsy" },
  { id: "axonaut", title: "#6 Axonaut" },
  { id: "zoho", title: "#7 Zoho CRM" },
  { id: "comparatif", title: "Tableau comparatif" },
  { id: "recommandations", title: "Quel CRM selon votre profil" },
  { id: "choix-ceres", title: "Notre choix chez Ceres" },
];

const relatedArticles = [
  { title: "9 actions commerciales que vous devriez automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Comparatif outils de generation de leads et enrichissement B2B", slug: "comparatif-outils-generation-leads-enrichissement", category: "Process & Outils", color: "#6C5CE7" },
  { title: "Account-Based Marketing : le guide complet", slug: "account-based-marketing-guide", category: "Strategie", color: "#FF7A59" },
];

export default function MeilleurCRMB2BFranceArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("b2b-vs-b2c");

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

  const renderScore = (score: number) => {
    const full = Math.floor(score);
    const hasHalf = score % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: full }).map((_, i) => (
          <div key={`f${i}`} className="w-2.5 h-2.5 rounded-sm bg-[#4B5EFC]" />
        ))}
        {hasHalf && <div className="w-2.5 h-2.5 rounded-sm bg-[#4B5EFC]/40" />}
        {Array.from({ length: empty }).map((_, i) => (
          <div key={`e${i}`} className="w-2.5 h-2.5 rounded-sm bg-[#F0F0F0]" />
        ))}
        <span className="text-[12px] font-bold text-[#111] ml-1">{score}/5</span>
      </div>
    );
  };

  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
        <div className="h-full bg-[#4B5EFC] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "8%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "20%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "38%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "55%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "72%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "2%", top: "88%", width: 240, height: 240, borderRadius: "50%", background: "#FF7A59", opacity: 0.06, filter: "blur(70px)" }} />

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
                        ? "border-[#4B5EFC] text-[#111] font-medium"
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
                  <a href="https://twitter.com/intent/tweet?text=Le%20meilleur%20CRM%20B2B%20en%20France%20en%202026&url=https://www.ceres-revops.com/blog/meilleur-crm-b2b-france" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/meilleur-crm-b2b-france" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Meilleur CRM B2B France</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">15 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Le meilleur CRM B2B en France en 2026
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                HubSpot, Salesforce, Pipedrive, Microsoft Dynamics, Sellsy, Axonaut, Zoho CRM. On a compare les 7 CRM les plus utilises par les entreprises B2B en France. Pipeline multi-deals, gestion de comptes, forecasting, automatisation, integrations, prix. Voici notre classement complet et nos recommandations par taille d&apos;entreprise et budget.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>25 jan 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 : Ce qu'un CRM B2B doit faire */}
              <section id="b2b-vs-b2c" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Ce qu&apos;un CRM B2B doit faire (et pourquoi le B2C n&apos;est pas le meme sujet)</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Tous les CRM ne se valent pas. Et surtout, un CRM concu pour le B2C ne convient pas au B2B. La difference est structurelle : en B2C, vous gerez des individus isoles, des transactions rapides, du volume. En B2B, vous gerez des comptes entreprises, des cycles de vente de plusieurs mois, des comites d&apos;achat avec 5, 10, parfois 15 interlocuteurs impliques dans la decision.</p>
                    <p>Un CRM B2B doit repondre a des exigences specifiques que la plupart des comparatifs en ligne ignorent. On les detaille ici parce qu&apos;elles constituent la grille de lecture de tout ce qui suit.</p>
                    <p>Premiere exigence : la gestion multi-interlocuteurs par deal. En B2B, chaque opportunite implique plusieurs contacts. Il y a le champion interne qui porte le projet, le decision-maker qui signe, le financier qui valide le budget, l&apos;utilisateur final qui testera le produit, et parfois un procurement qui negociera les conditions. Un CRM B2B doit permettre d&apos;associer plusieurs contacts a un meme deal avec des roles distincts (champion, decision-maker, influenceur, bloqueur). C&apos;est la base d&apos;une approche de vente structuree.</p>
                    <p>Deuxieme exigence : la gestion de comptes. En B2C, un client = une fiche. En B2B, un client = une entreprise avec une hierarchie (maison-mere, filiales, bureaux regionaux), un historique d&apos;achats sur plusieurs annees, des contrats en cours, des contacts qui changent de poste. Le CRM doit offrir une vue compte complete avec l&apos;historique de tous les deals, tous les contacts, toutes les interactions.</p>
                    <p>Troisieme exigence : les cycles de vente longs et le forecasting. Quand un deal met 3 a 9 mois a se conclure, il faut pouvoir suivre sa progression dans un pipeline structure, estimer la probabilite de closing a chaque etape, et agreger ces probabilites pour prevoir le revenu a 30, 60, 90 jours. Le forecasting est critique pour les equipes commerciales B2B de plus de 3 personnes.</p>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "Multi-interlocuteurs", desc: "Associer plusieurs contacts a un deal avec des roles distincts : champion, decision-maker, influenceur, bloqueur. Indispensable pour le B2B complexe.", color: "#4B5EFC" },
                      { title: "Gestion de comptes (ABM)", desc: "Vue 360 par entreprise : hierarchie, historique, deals en cours, contacts cles, score de sante du compte. Base de l account-based selling.", color: "#6C5CE7" },
                      { title: "Pipeline multi-deals", desc: "Gerer plusieurs pipelines simultanement (new business, upsell, renouvellement) avec des etapes et probabilites differentes par pipeline.", color: "#FF7A59" },
                      { title: "Forecasting", desc: "Previsions de revenus pondees par probabilite d etape, avec vues mensuelles et trimestrielles. Engagement des commerciaux sur leurs previsions.", color: "#22C55E" },
                      { title: "Automatisation des processus", desc: "Workflows automatises : relances, changements d etape, notifications, creation de taches. Reduction du travail administratif des commerciaux.", color: "#4B5EFC" },
                      { title: "Reporting avance", desc: "Rapports personnalises sur la performance individuelle et collective : taux de conversion par etape, velocite, win rate, taille moyenne des deals.", color: "#6C5CE7" },
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

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Quatrieme exigence : les integrations. Un CRM B2B ne fonctionne jamais seul. Il doit se connecter a votre stack existante : outil de prospection (Apollo, Lemlist), marketing automation, facturation, support client, outils de communication (Slack, email). La qualite des integrations natives et la disponibilite d&apos;une API ouverte sont des criteres decisifs.</p>
                    <p>Cinquieme exigence : l&apos;Account-Based Marketing (ABM). Les equipes B2B les plus matures adoptent une approche ABM ou marketing et ventes collaborent pour cibler des comptes specifiques. Le CRM doit permettre de scorer les comptes, de segmenter par ICP (Ideal Customer Profile), et de coordonner les actions marketing et commerciales sur les memes comptes.</p>
                    <p>C&apos;est avec cette grille de lecture que nous avons evalue les 7 CRM de ce comparatif. Un outil peut etre excellent sur le papier mais inadapte au B2B s&apos;il ne coche pas ces cases fondamentales.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 : Les criteres de selection */}
              <section id="criteres" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les criteres de selection pour un CRM B2B</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Pour etablir ce classement, on a retenu 12 criteres concrets que l&apos;on evalue en situation reelle chez nos clients. Ces criteres ne sont pas theoriques : ce sont les points de friction que l&apos;on rencontre au quotidien quand on deploie et optimise des CRM pour des equipes B2B de 3 a 50 commerciaux.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { title: "Pipeline multi-deal", desc: "Capacite a gerer plusieurs pipelines (new business, upsell, renewal) avec des etapes et probabilites distinctes.", color: "#4B5EFC" },
                      { title: "Gestion de comptes", desc: "Vue compte 360 avec hierarchie, contacts associes, historique complet, scoring, sante du compte.", color: "#6C5CE7" },
                      { title: "Reporting avance", desc: "Tableaux de bord personnalisables, rapports de pipeline, forecasting, analyse de velocite et win rate.", color: "#FF7A59" },
                      { title: "Integrations", desc: "Connecteurs natifs (email, prospection, facturation, support) et qualite de l API pour les integrations custom.", color: "#22C55E" },
                      { title: "Automatisation", desc: "Workflows, sequences email, taches automatiques, notifications conditionnelles, lead routing.", color: "#4B5EFC" },
                      { title: "Prix et scalabilite", desc: "Cout par utilisateur, cout des fonctionnalites avancees, transparence tarifaire, rapport qualite-prix.", color: "#6C5CE7" },
                      { title: "Prise en main", desc: "Temps d onboarding, courbe d apprentissage, documentation, interface utilisateur, adoption par les equipes.", color: "#FF7A59" },
                      { title: "Personnalisation", desc: "Objets custom, proprietes custom, pipelines configurables, formulaires, vues personnalisees.", color: "#22C55E" },
                      { title: "Mobile", desc: "Application mobile pour les commerciaux terrain : acces aux fiches, prise de notes, journalisation d appels.", color: "#4B5EFC" },
                      { title: "Support et ecosysteme", desc: "Qualite du support client, communaute, marketplace d applications, partenaires d integration.", color: "#6C5CE7" },
                      { title: "RGPD et securite", desc: "Hebergement des donnees en Europe, conformite RGPD native, gestion du consentement, audit trail.", color: "#FF7A59" },
                      { title: "IA et innovation", desc: "Fonctionnalites d intelligence artificielle : scoring predictif, suggestions, resume de conversations, forecasting IA.", color: "#22C55E" },
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

              {/* Section 3 : #1 HubSpot CRM */}
              <section id="hubspot" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">#1 HubSpot CRM</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#4B5EFC]/10 text-[#4B5EFC]">Notre choix #1</span>
                  </div>
                  <div className="mb-4">{renderScore(4.7)}</div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>HubSpot est notre choix numero un pour les entreprises B2B en France, et de loin. Ce n&apos;est pas un parti pris commercial : c&apos;est le resultat de dizaines de deployments CRM realises chez Ceres ces trois dernieres annees. HubSpot est le seul CRM qui combine puissance fonctionnelle, facilite d&apos;adoption et rapport qualite-prix coherent pour les PME et ETI B2B.</p>
                    <p>La force principale de HubSpot en B2B, c&apos;est son CRM gratuit. Le coeur du systeme (contacts, entreprises, deals, taches, pipeline, email tracking) est disponible sans frais pour un nombre illimite d&apos;utilisateurs. C&apos;est un avantage decisif pour les startups et PME qui veulent structurer leur processus commercial sans investissement initial. Aucun autre CRM de cette qualite n&apos;offre un plan gratuit aussi genereux.</p>
                    <p>Pour les equipes B2B qui ont besoin de plus, Sales Hub Professional (a partir de 90 euros par mois et par utilisateur) debloque les fonctionnalites qui font la difference : sequences email automatisees, forecasting avance avec categories de previsions, playbooks de vente, scoring predictif des leads, ABM natif avec target accounts, workflows d&apos;automatisation avances, rapports custom et tableaux de bord illimites.</p>
                    <p>Le forecasting de HubSpot est particulierement bien pense pour le B2B. Les managers peuvent definir des categories de previsions (commit, best case, pipeline) et les commerciaux s&apos;engagent sur leurs chiffres chaque mois ou trimestre. Le systeme compare ensuite les previsions aux resultats reels, ce qui permet d&apos;affiner la precision du forecasting au fil du temps.</p>
                    <p>L&apos;autre avantage majeur de HubSpot, c&apos;est l&apos;ecosysteme. Marketing Hub, Service Hub, Operations Hub et Commerce Hub s&apos;integrent nativement avec Sales Hub. Une entreprise B2B peut gerer son marketing (inbound, email, landing pages), ses ventes (pipeline, sequences, forecasting) et son support client (ticketing, knowledge base) dans un seul outil. Cette unification des donnees est un avantage considerable pour le reporting et l&apos;alignement entre equipes.</p>
                    <p>Depuis le rachat de Clearbit en 2023, HubSpot integre nativement l&apos;enrichissement de donnees firmographiques. Les fiches contact et entreprise sont automatiquement enrichies avec les technologies utilisees, le nombre d&apos;employes, le chiffre d&apos;affaires estime, le secteur d&apos;activite. C&apos;est un gain de temps considerable pour la prospection et la segmentation.</p>
                    <p>Le point faible de HubSpot reste la personnalisation avancee. Les objets custom existent mais restent moins flexibles que ceux de Salesforce. Pour les entreprises avec des processus de vente tres specifiques (industrie, construction, neobanques), certaines adaptations peuvent etre limitantes. Et le prix monte vite quand on ajoute plusieurs Hubs en version Enterprise.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing HubSpot Sales Hub (jan 2026)</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { plan: "Free", price: "0 eur", users: "Utilisateurs illimites", note: "CRM de base, pipeline, email tracking" },
                        { plan: "Starter", price: "15 eur/mois/user", users: "A partir de 2 users", note: "Automatisation simple, devis" },
                        { plan: "Professional", price: "90 eur/mois/user", users: "A partir de 5 users", note: "Sequences, forecasting, ABM, playbooks" },
                        { plan: "Enterprise", price: "150 eur/mois/user", users: "A partir de 10 users", note: "Objets custom, predictive scoring, sandboxes" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["CRM gratuit pour utilisateurs illimites", "Interface intuitive, adoption rapide", "Forecasting B2B avance (Pro+)", "Ecosysteme complet (Marketing, Service, Ops)", "1 600+ integrations dans la marketplace", "Enrichissement Clearbit natif", "ABM et target accounts integres"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Faiblesses</p>
                      {["Objets custom moins flexibles que Salesforce", "Prix eleve en version Enterprise multi-Hubs", "Personnalisation avancee limitee (Free/Starter)", "Reporting basique sur les plans gratuit et Starter", "Pas de gestion de territoires native"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#C5CAF5] bg-[#EEF0FF] p-3">
                    <p className="text-[11px] font-semibold text-[#4B5EFC] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les PME et ETI B2B de 3 a 50 commerciaux qui veulent un CRM puissant, facile a adopter et integre avec le marketing. Notre recommandation par defaut pour toute entreprise B2B qui demarre ou qui veut migrer depuis un outil vieillissant.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 : #2 Salesforce Sales Cloud */}
              <section id="salesforce" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="https://www.google.com/s2/favicons?domain=salesforce.com&sz=32" alt="Salesforce" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">#2 Salesforce Sales Cloud</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#6C5CE7]/10 text-[#6C5CE7]">Reference enterprise</span>
                  </div>
                  <div className="mb-4">{renderScore(4.5)}</div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Salesforce reste la reference absolue du CRM enterprise. C&apos;est le leader mondial depuis plus de 20 ans, avec plus de 150 000 entreprises clientes. Sa force : une flexibilite quasi illimitee. Salesforce peut s&apos;adapter a pratiquement n&apos;importe quel processus de vente B2B, aussi complexe soit-il.</p>
                    <p>La gestion de comptes dans Salesforce est la meilleure du marche. Hierarchies d&apos;entreprises multi-niveaux, territories, team selling, partner relationship management. Les equipes enterprise qui gerent des cycles de vente de 6 a 18 mois avec des organigrammes d&apos;acheteurs complexes trouvent dans Salesforce tous les outils necessaires.</p>
                    <p>Le forecasting de Salesforce est extremement avance. Collaborative forecasting avec des categories personnalisables, forecasting par territoire, par produit, par equipe. Les managers peuvent driller dans les previsions a tous les niveaux de la hierarchie. L&apos;IA Einstein ajoute une couche de scoring predictif et de recommandations d&apos;actions.</p>
                    <p>Le revers de la medaille : la complexite. Salesforce n&apos;est pas un outil que l&apos;on deploie en une semaine. Il faut un administrateur dedie (ou un consultant externe) pour configurer, maintenir et faire evoluer la plateforme. Les couts d&apos;implementation depassent souvent le cout de la licence elle-meme. Et l&apos;interface, bien qu&apos;amelioree avec Lightning, reste plus complexe que celle de HubSpot ou Pipedrive.</p>
                    <p>En France, Salesforce est particulierement present dans les grandes entreprises et les scale-ups qui ont leve plus de 10 millions d&apos;euros. Pour les PME de moins de 20 personnes, le rapport cout/complexite/valeur est rarement justifie. On voit regulierement des entreprises qui ont achete Salesforce et qui n&apos;utilisent que 20% des fonctionnalites, tout en payant le prix fort.</p>
                    <p>L&apos;ecosysteme Salesforce est le plus riche du marche : AppExchange compte plus de 7 000 applications, et pratiquement tous les outils B2B s&apos;integrent nativement avec Salesforce. C&apos;est un avantage indeniable pour les entreprises qui ont une stack complexe.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Salesforce Sales Cloud (jan 2026)</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { plan: "Starter", price: "25 eur/mois/user", users: "Jusqu a 10 users", note: "CRM basique, pas de customisation" },
                        { plan: "Professional", price: "80 eur/mois/user", users: "Illimite", note: "Pipeline, forecasting basique" },
                        { plan: "Enterprise", price: "165 eur/mois/user", users: "Illimite", note: "Workflows, API, territory mgmt" },
                        { plan: "Unlimited", price: "330 eur/mois/user", users: "Illimite", note: "Einstein AI, sandbox, support premier" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Personnalisation quasi illimitee", "Gestion de comptes la plus avancee", "Forecasting multi-niveaux", "Ecosysteme de 7 000+ apps", "IA Einstein pour scoring et recommandations", "Reference pour les equipes 50+ commerciaux"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Faiblesses</p>
                      {["Complexite de mise en place et maintenance", "Necessite un admin Salesforce dedie", "Interface moins intuitive que HubSpot", "Couts caches (implementation, consulting, add-ons)", "Pas de plan gratuit fonctionnel", "Engagement annuel obligatoire"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#E0D4FC] bg-[#F8F5FF] p-3">
                    <p className="text-[11px] font-semibold text-[#6C5CE7] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les entreprises de plus de 50 commerciaux avec des processus de vente complexes, des hierarchies d&apos;acheteurs multi-niveaux et un budget CRM superieur a 50 000 euros par an. Indispensable dans les secteurs ou Salesforce est le standard (SaaS enterprise, conseil, services financiers).</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 : #3 Pipedrive */}
              <section id="pipedrive" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="https://www.google.com/s2/favicons?domain=pipedrive.com&sz=32" alt="Pipedrive" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">#3 Pipedrive</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#22C55E]/10 text-[#22C55E]">Meilleur UX pipeline</span>
                  </div>
                  <div className="mb-4">{renderScore(4.2)}</div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Pipedrive est ne d&apos;une frustration : ses fondateurs (anciens commerciaux) trouvaient les CRM existants trop complexes et mal adaptes au quotidien des vendeurs. Le resultat est un CRM construit autour du pipeline, avec la meilleure experience utilisateur du marche pour la gestion des deals.</p>
                    <p>L&apos;interface kanban de Pipedrive est un modele du genre. Les deals se deplacent d&apos;une colonne a l&apos;autre avec un drag-and-drop fluide. Chaque deal affiche les informations essentielles en un coup d&apos;oeil : montant, contact, prochaine activite, age du deal. Les commerciaux adorent Pipedrive parce qu&apos;il est concu pour eux, pas pour les managers ou les administrateurs.</p>
                    <p>Pour le B2B, Pipedrive couvre les bases : pipelines multiples, champs personnalises, suivi des emails, rappels d&apos;activites, rapports de pipeline. Le plan Advanced ajoute les automatisations de workflows et le plan Professional inclut la gestion d&apos;equipes et le forecasting par revenus.</p>
                    <p>Cependant, Pipedrive montre ses limites pour les processus de vente B2B complexes. La gestion de comptes est basique (pas de hierarchie d&apos;entreprises, pas de scoring de comptes natif). Le forecasting est moins avance que celui de HubSpot ou Salesforce. Et l&apos;ecosysteme marketing est inexistant : Pipedrive ne propose pas de solution de marketing automation integree.</p>
                    <p>Pipedrive est un excellent choix pour les equipes de 2 a 15 commerciaux qui vendent un produit ou service relativement simple (cycles de vente de 1 a 3 mois, un ou deux interlocuteurs par deal) et qui veulent un outil que les commerciaux utiliseront reellement. Pour du B2B complexe avec de l&apos;ABM et du multi-interlocuteurs, HubSpot ou Salesforce seront plus adaptes.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Pipedrive (jan 2026)</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { plan: "Essential", price: "14 eur/mois/user", users: "A partir de 1 user", note: "Pipeline, contacts, activites" },
                        { plan: "Advanced", price: "34 eur/mois/user", users: "A partir de 1 user", note: "Email sync, automatisations" },
                        { plan: "Professional", price: "49 eur/mois/user", users: "A partir de 1 user", note: "Forecasting, equipes, e-signatures" },
                        { plan: "Power", price: "64 eur/mois/user", users: "A partir de 1 user", note: "Projets, phone support, scalabilite" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Meilleure UX pipeline du marche", "Adoption immediate par les commerciaux", "Prix accessible et transparent", "App mobile excellente", "Pipeline visuel drag-and-drop"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Faiblesses</p>
                      {["Gestion de comptes basique", "Pas de marketing automation integre", "Forecasting limite vs HubSpot/Salesforce", "Pas d ABM natif", "Reporting moins avance"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#D4EDDA] bg-[#F0FDF4] p-3">
                    <p className="text-[11px] font-semibold text-[#22C55E] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les equipes commerciales B2B de 2 a 15 personnes avec des cycles de vente courts a moyens (1-3 mois) et qui privilegient la simplicite d&apos;utilisation. Excellent pour les entreprises de services, les agences et les ESN.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 : #4 Microsoft Dynamics 365 */}
              <section id="dynamics" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="https://www.google.com/s2/favicons?domain=microsoft.com&sz=32" alt="Microsoft Dynamics 365" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">#4 Microsoft Dynamics 365 Sales</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#111]/10 text-[#111]">Ecosysteme Microsoft</span>
                  </div>
                  <div className="mb-4">{renderScore(4.0)}</div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Microsoft Dynamics 365 Sales est le CRM de Microsoft, positionne comme une alternative directe a Salesforce pour les entreprises deja ancrees dans l&apos;ecosysteme Microsoft. Si votre entreprise utilise Outlook, Teams, SharePoint et Excel au quotidien, Dynamics offre une integration native que personne d&apos;autre ne peut egaler.</p>
                    <p>L&apos;integration avec Outlook est le point fort numero un. Les commerciaux peuvent gerer leurs deals, envoyer des emails trackes et consulter les fiches clients directement depuis Outlook, sans jamais ouvrir le CRM. L&apos;integration Teams permet de collaborer sur les deals en temps reel. Et les donnees CRM peuvent etre exploitees dans Excel et Power BI pour du reporting avance.</p>
                    <p>Fonctionnellement, Dynamics couvre tout ce qu&apos;un CRM B2B enterprise doit faire : pipeline multi-deals, gestion de comptes avec hierarchie, forecasting avance, territory management, lead scoring avec Dynamics 365 Sales Insights (IA). Les fonctionnalites B2B sont au niveau de Salesforce.</p>
                    <p>Le probleme de Dynamics, c&apos;est l&apos;experience utilisateur. L&apos;interface est plus lourde et moins intuitive que celle de HubSpot ou Pipedrive. La courbe d&apos;apprentissage est raide, et l&apos;adoption par les commerciaux est souvent plus difficile. L&apos;administration necessite des competences techniques (Power Platform, Dataverse) que peu de PME ont en interne.</p>
                    <p>Le pricing est aussi un point de friction. La tarification est complexe avec de nombreux modules complementaires (Sales Insights, LinkedIn Sales Navigator connector, Viva Sales). Le cout reel pour une equipe de 10 commerciaux avec toutes les fonctionnalites B2B pertinentes depasse souvent les 100 euros par utilisateur et par mois.</p>
                    <p>En France, Dynamics est surtout present dans les grandes entreprises et les ETI du secteur industriel qui ont deja standardise leur IT sur Microsoft. Pour les startups et les PME tech, HubSpot ou Pipedrive sont generalement de meilleurs choix.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Dynamics 365 Sales (jan 2026)</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { plan: "Professional", price: "60 eur/mois/user", users: "Illimite", note: "CRM standard, pipeline, forecasting" },
                        { plan: "Enterprise", price: "95 eur/mois/user", users: "Illimite", note: "IA, Sales Insights, playbooks" },
                        { plan: "Premium", price: "135 eur/mois/user", users: "Illimite", note: "Viva Sales, coaching IA" },
                        { plan: "Relationship Sales", price: "Sur devis", users: "Illimite", note: "LinkedIn Sales Navigator inclus" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Integration Outlook/Teams/Excel native", "Fonctionnalites B2B enterprise completes", "Power BI pour le reporting avance", "Hebergement EU natif (Azure)", "IA Copilot for Sales"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Faiblesses</p>
                      {["Interface lourde et peu intuitive", "Administration complexe (Power Platform)", "Adoption difficile par les commerciaux", "Tarification opaque avec de nombreux add-ons", "Ecosysteme d integrations moins riche"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#E5E5E5] bg-[#F9F9F9] p-3">
                    <p className="text-[11px] font-semibold text-[#111] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les ETI et grandes entreprises dont l&apos;infrastructure IT est deja 100% Microsoft (Outlook, Teams, SharePoint, Azure AD). Pertinent dans l&apos;industrie, la distribution et les services financiers ou Microsoft est le standard.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 : #5 Sellsy */}
              <section id="sellsy" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="https://www.google.com/s2/favicons?domain=sellsy.com&sz=32" alt="Sellsy" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">#5 Sellsy</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#FF7A59]/10 text-[#FF7A59]">Made in France</span>
                  </div>
                  <div className="mb-4">{renderScore(3.8)}</div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Sellsy est un outil francais cree a La Rochelle en 2009. Son positionnement est unique : c&apos;est un CRM qui integre nativement la facturation, la gestion commerciale et la comptabilite. Pour les PME francaises qui veulent un seul outil pour gerer la prospection, les devis, les factures et le suivi comptable, Sellsy est une option serieuse.</p>
                    <p>Le CRM de Sellsy couvre les bases de la gestion commerciale B2B : pipeline visuel, contacts et entreprises, suivi des opportunites, devis personnalises, emails trackes. L&apos;integration entre le CRM et la partie facturation est transparente : un devis signe dans le pipeline devient automatiquement une facture, qui s&apos;integre dans le suivi comptable. C&apos;est un gain de temps considerable pour les PME qui utilisent encore Excel ou deux outils separes pour la vente et la facturation.</p>
                    <p>Sellsy propose aussi un module marketing (email campaigns, landing pages) et un module de gestion de tresorerie. L&apos;idee est de centraliser toute la gestion commerciale dans un seul outil francais, avec un support en francais et des donnees hebergees en France.</p>
                    <p>Les limites pour le B2B avance sont reelles. Le forecasting est basique (pas de categories de previsions, pas de forecasting par equipe). L&apos;automatisation des workflows est moins puissante que chez HubSpot ou Salesforce. Les integrations avec l&apos;ecosysteme B2B (outils de prospection, marketing automation, analytics) sont limitees. Et le reporting personnalise reste en retrait par rapport aux leaders du marche.</p>
                    <p>Sellsy est un excellent choix pour les PME francaises de 5 a 30 personnes qui veulent un outil tout-en-un CRM + facturation + comptabilite, avec un support francophone et des donnees en France. Pour les equipes commerciales B2B qui ont besoin de fonctionnalites avancees (ABM, scoring, forecasting sophistique), HubSpot ou Pipedrive seront plus adaptes.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Sellsy (jan 2026)</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { plan: "Essentials", price: "29 eur/mois/user", users: "A partir de 2 users", note: "CRM + pipeline + devis" },
                        { plan: "Advanced", price: "49 eur/mois/user", users: "A partir de 2 users", note: "Facturation + automatisations" },
                        { plan: "Enterprise", price: "79 eur/mois/user", users: "A partir de 2 users", note: "Comptabilite + reporting avance" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["CRM + facturation + comptabilite integres", "100% francais, donnees hebergees en France", "Support francophone reactif", "Devis-a-facture automatique", "Conforme aux obligations legales francaises"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Faiblesses</p>
                      {["Fonctionnalites CRM B2B basiques vs leaders", "Pas de forecasting avance", "Integrations limitees avec l ecosysteme B2B", "Automatisation de workflows limitee", "Pas d ABM ni de scoring predictif"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#FFDDD2] bg-[#FFF5F0] p-3">
                    <p className="text-[11px] font-semibold text-[#FF7A59] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les PME francaises de 5 a 30 personnes qui veulent un outil unique CRM + facturation + comptabilite. Particulierement adapte aux societes de services, agences et ESN qui ont besoin de generer des devis et des factures directement depuis le pipeline commercial.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 : #6 Axonaut */}
              <section id="axonaut" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="https://www.google.com/s2/favicons?domain=axonaut.com&sz=32" alt="Axonaut" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">#6 Axonaut</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#FF7A59]/10 text-[#FF7A59]">PME francaises</span>
                  </div>
                  <div className="mb-4">{renderScore(3.6)}</div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Axonaut est un outil francais cree a Toulouse en 2017. Comme Sellsy, il combine CRM et gestion commerciale, mais avec un positionnement encore plus oriente TPE et PME. Axonaut se presente comme l&apos;ERP tout-en-un pour les petites entreprises : CRM, devis, facturation, comptabilite, gestion de tresorerie, RH et gestion de projet.</p>
                    <p>Le CRM d&apos;Axonaut est volontairement simple. Pipeline visuel, fiches contacts et entreprises, suivi des opportunites, envoi de devis, relances automatiques. L&apos;interface est claire et ne necessite aucune formation. C&apos;est un outil que l&apos;on peut prendre en main en une heure, ce qui est un avantage reel pour les petites structures sans equipe IT.</p>
                    <p>L&apos;integration CRM + comptabilite est le point fort d&apos;Axonaut. Les devis acceptes deviennent des factures, les factures payees s&apos;enregistrent automatiquement dans la comptabilite, et la tresorerie est mise a jour en temps reel. Pour un artisan, un consultant ou une petite agence, c&apos;est un gain de temps enorme.</p>
                    <p>Le tarif unique est un autre avantage. Axonaut propose un forfait a partir de 34,99 euros par mois pour un utilisateur, avec toutes les fonctionnalites incluses. Pas de modules supplementaires, pas de tiers differents. C&apos;est transparent et previsible.</p>
                    <p>Les limites pour le B2B sont significatives. Le pipeline est basique (pas de multi-pipeline natif, pas de forecasting). La gestion de comptes est rudimentaire. Les integrations sont tres limitees (pas de connexion native avec les outils de prospection B2B, pas d&apos;API ouverte pour les automatisations custom). Le reporting est minimal. Et l&apos;outil n&apos;est tout simplement pas concu pour des equipes commerciales de plus de 10 personnes.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Axonaut (jan 2026)</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { plan: "Mensuel", price: "49,99 eur/mois", users: "1 user inclus", note: "Toutes fonctionnalites" },
                        { plan: "Annuel", price: "34,99 eur/mois", users: "1 user inclus", note: "Toutes fonctionnalites" },
                        { plan: "User supp.", price: "+14,99 eur/mois", users: "Par utilisateur", note: "Acces complet" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Tout-en-un CRM + compta + facturation + RH", "Prix unique transparent", "Prise en main en 1 heure", "100% francais, support francophone", "Ideal pour TPE et independants"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Faiblesses</p>
                      {["Pipeline CRM tres basique", "Pas de forecasting ni de scoring", "Integrations tres limitees", "Pas concu pour plus de 10 users", "Reporting minimal"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#FFDDD2] bg-[#FFF5F0] p-3">
                    <p className="text-[11px] font-semibold text-[#FF7A59] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les TPE et independants francais (1 a 10 personnes) qui cherchent un outil unique pour gerer la relation client, la facturation et la comptabilite. Artisans, consultants, petites agences. Pas adapte pour des equipes commerciales B2B structurees.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 : #7 Zoho CRM */}
              <section id="zoho" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-2">
                    <img src="https://www.google.com/s2/favicons?domain=zoho.com&sz=32" alt="Zoho CRM" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">#7 Zoho CRM</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#22C55E]/10 text-[#22C55E]">Meilleur rapport qualite/prix</span>
                  </div>
                  <div className="mb-4">{renderScore(3.7)}</div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Zoho CRM est le CRM au meilleur rapport qualite-prix du marche. Pour 14 euros par utilisateur et par mois (plan Standard), Zoho offre des fonctionnalites que HubSpot et Salesforce reservent a leurs plans avances : workflows d&apos;automatisation, scoring de leads, rapports personnalises, multi-pipeline.</p>
                    <p>L&apos;ecosysteme Zoho est impressionnant par sa largeur. Zoho propose plus de 45 applications integrees : Zoho Desk (support), Zoho Campaigns (email marketing), Zoho Books (comptabilite), Zoho Projects, Zoho Analytics, Zoho Sign. Le tout avec une tarification coherente via la suite Zoho One (45 euros par utilisateur et par mois pour toutes les apps). C&apos;est une alternative credible a la combinaison HubSpot + outils tiers pour les entreprises sensibles au budget.</p>
                    <p>Pour le B2B, Zoho couvre les bases correctement. Le plan Professional (23 euros par mois et par utilisateur) inclut la gestion de processus de vente (blueprints), la validation de deals, l&apos;inventaire et les devis. Le plan Enterprise (40 euros) ajoute des portails clients, le multi-scoring, l&apos;IA Zia (assistant predictif) et des modules custom.</p>
                    <p>L&apos;IA Zia de Zoho merite une mention. Elle analyse les patterns de conversion, suggere le meilleur moment pour contacter un prospect, detecte les anomalies dans le pipeline et predit les probabilites de closing. Pour le prix demande, c&apos;est impressionnant.</p>
                    <p>Les limites de Zoho sont connues. L&apos;interface est fonctionnelle mais datee par rapport a HubSpot ou Pipedrive. L&apos;UX n&apos;est pas le point fort de Zoho. La documentation est parfois confuse (surtout en francais). Le support client est inegal selon les plans. Et les integrations avec les outils B2B non-Zoho sont moins fluides qu&apos;avec HubSpot ou Salesforce. En France, Zoho a une presence commerciale limitee et peu de partenaires integrateurs specialises.</p>
                    <p>Zoho est un choix pertinent pour les PME B2B soucieuses du budget qui veulent un CRM fonctionnellement riche sans payer le prix de HubSpot Pro ou Salesforce. Mais il faut accepter une experience utilisateur en retrait et un ecosysteme de partenaires moins developpe en France.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Zoho CRM (jan 2026)</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { plan: "Standard", price: "14 eur/mois/user", users: "A partir de 1 user", note: "Scoring, workflows, rapports" },
                        { plan: "Professional", price: "23 eur/mois/user", users: "A partir de 1 user", note: "Blueprints, validation, devis" },
                        { plan: "Enterprise", price: "40 eur/mois/user", users: "A partir de 1 user", note: "IA Zia, portails, multi-scoring" },
                        { plan: "Ultimate", price: "52 eur/mois/user", users: "A partir de 1 user", note: "Zoho Analytics avance, BI" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Meilleur rapport qualite-prix du marche", "Fonctionnalites avancees a prix bas", "Ecosysteme de 45+ apps Zoho", "IA Zia pour scoring et predictions", "Zoho One a 45 eur/mois (toutes apps)"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Faiblesses</p>
                      {["Interface datee et UX perfectible", "Documentation confuse en francais", "Peu de partenaires en France", "Integrations non-Zoho moins fluides", "Support inegal selon les plans"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#D4EDDA] bg-[#F0FDF4] p-3">
                    <p className="text-[11px] font-semibold text-[#22C55E] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les PME B2B de 5 a 30 personnes avec un budget CRM serre qui veulent des fonctionnalites avancees (scoring, IA, automatisation) sans payer le prix de HubSpot Pro ou Salesforce. Pertinent si vous etes pret a investir du temps dans la configuration.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 : Tableau comparatif */}
              <section id="comparatif" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Tableau comparatif des 7 CRM B2B</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">Vue d&apos;ensemble complete des 7 CRM compares sur 12 criteres B2B. Les scores refletent notre experience terrain avec ces outils.</p>

                  <div className="overflow-x-auto">
                    <div className="min-w-[900px]">
                      <div className="grid grid-cols-8 gap-2 pb-3 border-b border-[#E8E8E8]">
                        <span className="text-[10px] font-semibold text-[#999]">Critere</span>
                        {[
                          { name: "HubSpot", icon: "hubspot.com" },
                          { name: "Salesforce", icon: "salesforce.com" },
                          { name: "Pipedrive", icon: "pipedrive.com" },
                          { name: "Dynamics", icon: "microsoft.com" },
                          { name: "Sellsy", icon: "sellsy.com" },
                          { name: "Axonaut", icon: "axonaut.com" },
                          { name: "Zoho", icon: "zoho.com" },
                        ].map((t) => (
                          <div key={t.name} className="flex flex-col items-center gap-1">
                            <img src={`https://www.google.com/s2/favicons?domain=${t.icon}&sz=32`} alt={t.name} className="w-4 h-4" />
                            <span className="text-[9px] font-semibold text-[#4B5EFC] text-center">{t.name}</span>
                          </div>
                        ))}
                      </div>
                      {[
                        { critere: "Score global", values: ["4.7/5", "4.5/5", "4.2/5", "4.0/5", "3.8/5", "3.6/5", "3.7/5"] },
                        { critere: "Pipeline multi-deal", values: ["Excellent", "Excellent", "Bon", "Excellent", "Basique", "Basique", "Bon"] },
                        { critere: "Gestion de comptes", values: ["Bon", "Excellent", "Basique", "Excellent", "Basique", "Minimal", "Bon"] },
                        { critere: "Forecasting", values: ["Avance", "Avance", "Standard", "Avance", "Basique", "Non", "Standard"] },
                        { critere: "Automatisation", values: ["Avance", "Avance", "Bon", "Avance", "Basique", "Minimal", "Bon"] },
                        { critere: "Reporting", values: ["Excellent", "Excellent", "Bon", "Excellent", "Basique", "Minimal", "Bon"] },
                        { critere: "Integrations", values: ["1 600+", "7 000+", "400+", "Moyen", "Limite", "Limite", "Moyen"] },
                        { critere: "Prise en main", values: ["Facile", "Difficile", "Tres facile", "Difficile", "Facile", "Tres facile", "Moyen"] },
                        { critere: "IA integree", values: ["Oui", "Einstein", "Basique", "Copilot", "Non", "Non", "Zia"] },
                        { critere: "ABM natif", values: ["Oui", "Oui", "Non", "Partiel", "Non", "Non", "Non"] },
                        { critere: "Facturation", values: ["Add-on", "Non", "Non", "Non", "Natif", "Natif", "Via Zoho Books"] },
                        { critere: "Prix entree/user/mois", values: ["0 eur", "25 eur", "14 eur", "60 eur", "29 eur", "35 eur", "14 eur"] },
                        { critere: "Donnees en EU", values: ["Option", "Option", "EU", "Azure EU", "France", "France", "EU"] },
                      ].map((row) => (
                        <div key={row.critere} className="grid grid-cols-8 gap-2 py-2.5 border-b border-[#F5F5F5] items-center">
                          <span className="text-[10px] font-medium text-[#111]">{row.critere}</span>
                          {row.values.map((v, i) => (
                            <span key={i} className={`text-[10px] text-center ${
                              v === "Excellent" || v === "Avance" || v === "Tres facile" || v === "Oui" || v === "Natif" || v === "France"
                                ? "text-[#22C55E] font-medium"
                                : v === "Non" || v === "Minimal" || v === "Limite" || v === "Difficile"
                                ? "text-[#EF4444] font-medium"
                                : "text-[#555]"
                            }`}>{v}</span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Comment lire ce tableau</p>
                    <p className="text-[11px] text-[#777] leading-[1.65]">Les scores refletent notre experience avec ces outils en contexte B2B reel. Un outil note &ldquo;Basique&rdquo; sur un critere n&apos;est pas necessairement mauvais : il couvre les besoins de base mais ne permet pas les cas d&apos;usage avances. Les prix indiques sont les prix d&apos;entree par utilisateur et par mois, hors promotions et engagements annuels.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 11 : Quel CRM B2B selon votre taille et budget */}
              <section id="recommandations" className="mb-8">
                <div className="rounded-2xl bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Recommandations</span>
                  <h2 className="text-[20px] font-semibold text-white mb-4">Quel CRM B2B choisir selon votre taille et votre budget</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75] mb-6">
                    <p>Le meilleur CRM est celui qui sera adopte par votre equipe. Un outil surpuissant mais sous-utilise est pire qu&apos;un outil simple mais maitrise. Voici nos recommandations concretes par profil d&apos;entreprise.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        profil: "Startup early-stage (1-5 personnes)",
                        budget: "0 eur/mois",
                        crm: "HubSpot CRM Free",
                        desc: "Le CRM gratuit de HubSpot est le meilleur point de depart. Pipeline, contacts, email tracking, taches, tout est inclus pour un nombre illimite d utilisateurs. Vous pourrez passer sur un plan payant quand vos besoins evolueront, sans migration de donnees.",
                      },
                      {
                        profil: "PME avec besoin CRM + facturation (5-20 personnes)",
                        budget: "30-80 eur/user/mois",
                        crm: "Sellsy ou Axonaut",
                        desc: "Si votre priorite est d avoir un seul outil pour le CRM et la facturation, Sellsy (pour les equipes de 10+) ou Axonaut (pour les TPE de moins de 10) sont les choix les plus pertinents. 100% francais, support francophone, conformite legale native.",
                      },
                      {
                        profil: "PME B2B orientee vente (5-15 commerciaux)",
                        budget: "15-50 eur/user/mois",
                        crm: "Pipedrive Advanced ou HubSpot Starter",
                        desc: "Si l adoption par les commerciaux est votre priorite absolue, Pipedrive est imbattable. Si vous voulez aussi du marketing automation et un ecosysteme plus large, HubSpot Starter est le meilleur compromis.",
                      },
                      {
                        profil: "Scale-up B2B (15-50 commerciaux)",
                        budget: "90-150 eur/user/mois",
                        crm: "HubSpot Sales Hub Professional",
                        desc: "C est le sweet spot de HubSpot. Sequences, forecasting avance, ABM, playbooks, scoring predictif. Le tout avec une interface que les commerciaux adoptent en quelques jours. Combine avec Marketing Hub Pro pour un alignement marketing-ventes complet.",
                      },
                      {
                        profil: "Enterprise / grand compte (50+ commerciaux)",
                        budget: "150+ eur/user/mois",
                        crm: "Salesforce Enterprise ou HubSpot Enterprise",
                        desc: "A cette echelle, Salesforce est souvent le choix par defaut pour sa flexibilite et son ecosysteme. HubSpot Enterprise est une alternative credible si vous privilegiez l adoption et la simplicite. Dynamics 365 si vous etes 100% Microsoft.",
                      },
                      {
                        profil: "Budget serre, besoin de fonctionnalites avancees",
                        budget: "14-52 eur/user/mois",
                        crm: "Zoho CRM",
                        desc: "Zoho offre le meilleur ratio fonctionnalites/prix du marche. Scoring, IA, automatisation et reporting avance a un prix deux a trois fois inferieur a HubSpot Pro. Le compromis se fait sur l UX et l ecosysteme de partenaires en France.",
                      },
                    ].map((r) => (
                      <div key={r.profil} className="rounded-xl bg-white/5 border border-white/10 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[12px] font-semibold text-white">{r.profil}</span>
                          <span className="text-[10px] text-[#4B5EFC] font-medium">{r.budget}</span>
                        </div>
                        <p className="text-[11px] text-[#4B5EFC] font-medium mb-1">{r.crm}</p>
                        <p className="text-[11px] text-white/40 leading-[1.6]">{r.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 12 : Notre choix chez Ceres */}
              <section id="choix-ceres" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Notre choix chez Ceres : HubSpot, sans hesitation</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Chez Ceres, on deploie et optimise des CRM pour des entreprises B2B depuis trois ans. On a travaille avec HubSpot, Salesforce, Pipedrive et Zoho chez nos clients. Notre recommandation par defaut est HubSpot, et voici pourquoi.</p>
                    <p>Le premier critere, c&apos;est l&apos;adoption. Un CRM que les commerciaux n&apos;utilisent pas est un investissement perdu. HubSpot a le meilleur taux d&apos;adoption que l&apos;on constate sur le terrain. L&apos;interface est intuitive, la courbe d&apos;apprentissage est courte, et les commerciaux voient rapidement la valeur ajoutee (email tracking, sequences, notifications de consultation). En moyenne, nos deployments HubSpot atteignent 80% d&apos;adoption en 30 jours. Contre 50-60% pour Salesforce et 40-50% pour Dynamics.</p>
                    <p>Le deuxieme critere, c&apos;est le rapport puissance/complexite. HubSpot Sales Hub Professional offre tout ce dont une equipe B2B de 5 a 50 commerciaux a besoin : pipeline multi-deals, forecasting avance, sequences email, scoring predictif, ABM, playbooks, reporting custom. Le tout sans admin dedie et sans consultant externe permanent. C&apos;est le CRM ou l&apos;on passe le plus de temps a vendre et le moins de temps a administrer.</p>
                    <p>Le troisieme critere, c&apos;est l&apos;ecosysteme. HubSpot centralise les ventes, le marketing et le support dans un seul outil. Pour les equipes B2B, l&apos;alignement marketing-ventes est critique. Quand un prospect telechargee un livre blanc, le commercial le voit dans sa timeline. Quand un deal est signe, le marketing peut adapter ses campagnes. Cette unification des donnees est un avantage competitif reel.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        etape: "1. Setup initial gratuit",
                        desc: "On demarre toujours sur le CRM gratuit de HubSpot. Configuration du pipeline, import des contacts et entreprises, connexion des emails, parametrage des proprietes custom. En 3 a 5 jours, l equipe est operationnelle.",
                        icon: "hubspot.com",
                      },
                      {
                        etape: "2. Passage a Sales Hub Pro",
                        desc: "Quand l equipe depasse 5 commerciaux ou que les besoins en forecasting et automatisation deviennent critiques, on passe sur Sales Hub Professional. Configuration des sequences, des playbooks, du forecasting par categories.",
                        icon: "hubspot.com",
                      },
                      {
                        etape: "3. Integrations B2B",
                        desc: "On connecte HubSpot a la stack de prospection (Apollo, Clay, Lemlist), aux outils de communication (Slack, Zoom) et aux outils de facturation (Stripe, Pennylane). 95% des integrations sont natives ou via la marketplace.",
                        icon: "hubspot.com",
                      },
                      {
                        etape: "4. Reporting et optimisation",
                        desc: "On construit des dashboards personnalises pour les managers : pipeline par etape, velocite, win rate, forecasting, performance individuelle. On utilise RevOps AI pour automatiser l analyse et les alertes.",
                        icon: "hubspot.com",
                      },
                    ].map((s) => (
                      <div key={s.etape} className="flex gap-3 rounded-xl border border-[#F2F2F2] p-4">
                        <img src={`https://www.google.com/s2/favicons?domain=${s.icon}&sz=32`} alt={s.etape} className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-[11px] font-semibold text-[#4B5EFC] mb-0.5">{s.etape}</p>
                          <p className="text-[11px] text-[#888] leading-[1.6]">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Cout type d&apos;un deployment HubSpot B2B</p>
                    <p className="text-[11px] text-[#777] leading-[1.65]">Pour une equipe de 10 commerciaux : Sales Hub Professional (90 eur/user/mois x 10 = 900 eur/mois) + Marketing Hub Starter (15 eur/mois) + Operations Hub Starter (15 eur/mois). Total : environ 930 eur par mois, soit 93 eur par utilisateur. C&apos;est 40% moins cher que Salesforce Enterprise a fonctionnalites equivalentes, avec une adoption deux fois plus rapide.</p>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Ce choix n&apos;est pas dogmatique. On recommande Salesforce aux entreprises de plus de 50 commerciaux avec des processus tres specifiques. On recommande Pipedrive aux tres petites equipes qui veulent la simplicite absolue. Et on recommande Sellsy aux PME francaises qui ont besoin de la facturation integree.</p>
                    <p>Mais pour 80% des entreprises B2B que l&apos;on accompagne (startups, PME et ETI de 5 a 50 personnes), HubSpot est le meilleur compromis entre puissance fonctionnelle, facilite d&apos;adoption et cout total de possession. C&apos;est le CRM sur lequel on batit les meilleures operations commerciales.</p>
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
                    <p className="text-[12px] font-semibold text-[#111] leading-[1.4] group-hover:text-[#4B5EFC] transition-colors">{a.title}</p>
                    <p className="text-[10px] text-[#999] mt-2">{a.category}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section>
              <div className="rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour choisir et deployer votre CRM B2B ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[500px] mx-auto">On deploie HubSpot pour les equipes commerciales B2B. Configuration, migration de donnees, formation, integrations, reporting. Votre CRM operationnel en moins de 2 semaines.</p>
                <div className="flex items-center justify-center gap-3">
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel
                  </a>
                  <Link href="/agence-hubspot" className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-[#E5E5E5] bg-white text-[#111] text-[13px] font-medium hover:border-[#CCC] transition-colors">
                    Notre agence HubSpot
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
