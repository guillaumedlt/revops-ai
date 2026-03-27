"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

/* ---------- section data ---------- */
const sections = [
  { id: "intro", label: "Introduction" },
  { id: "site-commercial", label: "Votre meilleur commercial" },
  { id: "cms-hub-overview", label: "Qu&apos;est-ce que le CMS Hub" },
  { id: "comparatif", label: "CMS Hub vs WordPress vs Webflow" },
  { id: "fonctionnalites", label: "Fonctionnalites cles" },
  { id: "7-etapes", label: "7 etapes pour un site performant" },
  { id: "smart-content", label: "Smart content" },
  { id: "seo-performance", label: "SEO et performance" },
  { id: "cms-crm", label: "Integration CMS + CRM" },
  { id: "limites", label: "Limites du CMS" },
  { id: "avis", label: "Notre avis" },
];

/* ---------- related articles ---------- */
const relatedArticles = [
  { title: "Marketing automation : les 7 workflows HubSpot incontournables", slug: "marketing-automation-7-workflows-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Tracker les soumissions de formulaire HubSpot dans GA4", slug: "tracker-soumissions-formulaire-hubspot-google-analytics-google-tag-manager", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Tracking des conversions HubSpot : le guide complet", slug: "tracking-conversions-hubspot-guide-complet", category: "CRM & HubSpot", color: "#4B5EFC" },
];

/* ---------- JSON-LD ---------- */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "HubSpot CMS : les fondamentaux pour creer un site internet performant",
  description: "Guide complet du HubSpot CMS Hub : fonctionnalites, comparatif avec WordPress et Webflow, smart content, SEO, integration CRM et conseils pour creer un site B2B performant.",
  author: { "@type": "Person", name: "Guillaume Delachet" },
  publisher: { "@type": "Organization", name: "Ceres RevOps", url: "https://www.ceres-revops.com" },
  datePublished: "2026-02-10",
  dateModified: "2026-02-10",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/hubspot-cms-fondamentaux-site-internet-performant" },
  wordCount: 2800,
  articleSection: "CRM & HubSpot",
  inLanguage: "fr",
};

/* ---------- component ---------- */
export default function BlogPostPage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, pct));

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.getBoundingClientRect().top < 200) {
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
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 h-[3px] bg-[#F2F2F2]">
        <div className="h-full bg-[#4B5EFC] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "8%", width: 320, height: 320, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "25%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "45%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "65%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "82%", width: 240, height: 240, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="flex gap-10">
          {/* Sticky sidebar — desktop */}
          <aside className="hidden lg:block w-[200px] shrink-0">
            <div className="sticky top-28">
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Sommaire</p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`}
                    className={"block text-[11px] py-1.5 pl-3 border-l-2 transition-all " +
                      (activeSection === s.id ? "border-[#4B5EFC] text-[#111] font-medium" : "border-transparent text-[#999] hover:text-[#666]")}>
                    {s.label}
                  </a>
                ))}
              </nav>
              {/* Share */}
              <div className="mt-8 pt-6 border-t border-[#F2F2F2]">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Partager</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors cursor-pointer">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.04a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L5.25 9.068" /></svg>
                  </button>
                  <a href="https://twitter.com/intent/tweet?url=https://www.ceres-revops.com/blog/hubspot-cms-fondamentaux-site-internet-performant" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/hubspot-cms-fondamentaux-site-internet-performant" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Article content */}
          <div className="flex-1 min-w-0 max-w-[700px]">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-[12px] text-[#999]">
              <Link href="/" className="hover:text-[#111] transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#111] transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-[#666]">HubSpot CMS</span>
            </nav>

            {/* Hero */}
            <header className="mb-12" id="intro">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">14 min</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                HubSpot CMS : les fondamentaux pour creer un site internet performant
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Votre site web est le premier point de contact avec vos prospects. Pourtant, la majorite des sites B2B que nous auditons chez Ceres sont des vitrines statiques qui ne generent ni leads, ni donnees exploitables. HubSpot CMS Hub change la donne en fusionnant la gestion de contenu avec le CRM. Dans ce guide, nous decortiquons chaque fonctionnalite du CMS Hub, le comparons a WordPress et Webflow, et vous donnons les etapes concretes pour construire un site qui convertit.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                <span>10 fevrier 2026</span>
              </div>
            </header>

            {/* ============ SECTION 1 : Votre meilleur commercial ============ */}
            <article>
              <section id="site-commercial" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">1. Pourquoi votre site web est votre meilleur commercial</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                    En B2B, 70% du parcours d&apos;achat se fait avant le premier contact avec un commercial. Vos prospects lisent vos pages, comparent vos offres, consultent vos etudes de cas et se forgent une opinion avant meme de decrocher le telephone. Votre site web n&apos;est pas une brochure en ligne : c&apos;est un commercial qui travaille 24 heures sur 24, 7 jours sur 7.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                    Le probleme, c&apos;est que la plupart des sites B2B sont construits avec des outils qui ne parlent pas au CRM. Le marketing cree des pages dans WordPress, les leads arrivent dans un formulaire Typeform, les donnees sont exportees manuellement dans un tableur, puis saisies a la main dans HubSpot. A chaque etape, on perd des informations, du temps et des opportunites.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                    Un site performant en B2B, ce n&apos;est pas seulement un site rapide ou bien designe. C&apos;est un site qui capture chaque interaction visiteur, l&apos;associe a un contact dans le CRM, et alimente les equipes commerciales en donnees contextuelles pour closer plus vite.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75]">
                    C&apos;est exactement ce que permet HubSpot CMS Hub : un CMS nativement integre au CRM, ou chaque page, chaque formulaire et chaque CTA est connecte a votre base de donnees contacts. Plus besoin de plugins tiers, d&apos;integrations fragiles ou de synchronisations manuelles.
                  </p>
                </div>
              </section>

              {/* KPI impact card */}
              <section className="mb-8">
                <div className="rounded-xl bg-[#F7F7FF] border border-[#E8E8F8] p-5">
                  <p className="text-[11px] font-semibold text-[#4B5EFC] uppercase tracking-wider mb-3">Chiffres cles</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-[20px] font-bold text-[#111]">70%</p>
                      <p className="text-[10px] text-[#999]">du parcours B2B se fait en ligne avant un contact commercial</p>
                    </div>
                    <div>
                      <p className="text-[20px] font-bold text-[#111]">47%</p>
                      <p className="text-[10px] text-[#999]">des acheteurs consultent 3 a 5 contenus avant de parler a un vendeur</p>
                    </div>
                    <div>
                      <p className="text-[20px] font-bold text-[#111]">88%</p>
                      <p className="text-[10px] text-[#999]">des acheteurs B2B recherchent en ligne avant d&apos;acheter</p>
                    </div>
                    <div>
                      <p className="text-[20px] font-bold text-[#111]">2.6x</p>
                      <p className="text-[10px] text-[#999]">plus de leads pour les sites avec contenu personnalise</p>
                    </div>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 2 : Qu'est-ce que HubSpot CMS Hub ============ */}
              <section id="cms-hub-overview" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">2. Qu&apos;est-ce que HubSpot CMS Hub</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                    HubSpot CMS Hub est la plateforme de gestion de contenu web de HubSpot, lancee en 2020 comme un produit a part entiere (auparavant integree au Marketing Hub). Son positionnement est clair : offrir un CMS pensee pour les equipes marketing et commerciales, pas pour les developpeurs.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                    Contrairement a un CMS classique comme WordPress, le CMS Hub ne necessite aucun plugin pour gerer les formulaires, les CTAs, le tracking des visiteurs ou le reporting. Tout est natif. Chaque visite de page, chaque clic sur un bouton, chaque soumission de formulaire est automatiquement enregistre dans la fiche contact du CRM HubSpot.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Le CMS Hub est disponible en quatre editions, chacune avec un niveau de fonctionnalites croissant. Le choix de l&apos;edition depend de la taille de votre equipe, de vos besoins en personnalisation et de votre budget.
                  </p>

                  {/* Editions table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-[12px] border-collapse">
                      <thead>
                        <tr className="border-b border-[#E8E8E8]">
                          <th className="text-left py-3 pr-4 text-[#999] font-semibold uppercase tracking-wider text-[10px]">Edition</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-semibold uppercase tracking-wider text-[10px]">Prix / mois</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-semibold uppercase tracking-wider text-[10px]">Fonctionnalites cles</th>
                          <th className="text-left py-3 text-[#999] font-semibold uppercase tracking-wider text-[10px]">Pour qui</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#F0F0F0]">
                          <td className="py-3 pr-4 font-medium text-[#111]">Free</td>
                          <td className="py-3 pr-4 text-[#555]">0 EUR</td>
                          <td className="py-3 pr-4 text-[#555]">Site web basique, drag-and-drop, SSL, CDN, formulaires HubSpot</td>
                          <td className="py-3 text-[#555]">Startups en phase de test</td>
                        </tr>
                        <tr className="border-b border-[#F0F0F0]">
                          <td className="py-3 pr-4 font-medium text-[#111]">Starter</td>
                          <td className="py-3 pr-4 text-[#555]">25 EUR</td>
                          <td className="py-3 pr-4 text-[#555]">Domaine personnalise, suppression branding HubSpot, themes premium</td>
                          <td className="py-3 text-[#555]">PME avec site vitrine</td>
                        </tr>
                        <tr className="border-b border-[#F0F0F0]">
                          <td className="py-3 pr-4 font-medium text-[#111]">Pro</td>
                          <td className="py-3 pr-4 text-[#555]">400 EUR</td>
                          <td className="py-3 pr-4 text-[#555]">Smart content, A/B testing, SEO avance, staging, mot de passe pages</td>
                          <td className="py-3 text-[#555]">Equipes marketing structurees</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-medium text-[#111]">Enterprise</td>
                          <td className="py-3 pr-4 text-[#555]">1 200 EUR</td>
                          <td className="py-3 pr-4 text-[#555]">Multi-domaines, serverless functions, memberships, activity logs</td>
                          <td className="py-3 text-[#555]">Grandes entreprises, portails clients</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-5 p-3 rounded-lg bg-[#FFFBF5] border border-[#F5E6D0]">
                    <p className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-wider mb-1">Conseil</p>
                    <p className="text-[12px] text-[#8B6914] leading-[1.65]">Pour la majorite des PME B2B, l&apos;edition Starter suffit pour demarrer. Passez a Pro uniquement quand vous avez besoin du smart content, du staging ou de l&apos;A/B testing. Ne payez pas pour des fonctionnalites que vous n&apos;utiliserez pas dans les 6 prochains mois.</p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 3 : Comparatif CMS ============ */}
              <section id="comparatif" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">3. HubSpot CMS vs WordPress vs Webflow : comparatif detaille</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Le choix d&apos;un CMS est structurant. Il impacte votre capacite a generer des leads, a personnaliser l&apos;experience visiteur et a maintenir votre site dans le temps. Voici un comparatif objectif entre les trois plateformes les plus utilisees en B2B.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-[12px] border-collapse">
                      <thead>
                        <tr className="border-b border-[#E8E8E8]">
                          <th className="text-left py-3 pr-4 text-[#999] font-semibold uppercase tracking-wider text-[10px]">Critere</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-semibold uppercase tracking-wider text-[10px]">HubSpot CMS</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-semibold uppercase tracking-wider text-[10px]">WordPress</th>
                          <th className="text-left py-3 text-[#999] font-semibold uppercase tracking-wider text-[10px]">Webflow</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#F0F0F0]">
                          <td className="py-3 pr-4 font-medium text-[#111]">Integration CRM</td>
                          <td className="py-3 pr-4 text-[#22C55E] font-medium">Native, temps reel</td>
                          <td className="py-3 pr-4 text-[#555]">Via plugins (Zapier, WPForms)</td>
                          <td className="py-3 text-[#555]">Via Zapier ou API</td>
                        </tr>
                        <tr className="border-b border-[#F0F0F0]">
                          <td className="py-3 pr-4 font-medium text-[#111]">Facilite d&apos;utilisation</td>
                          <td className="py-3 pr-4 text-[#555]">Drag-and-drop intuitif</td>
                          <td className="py-3 pr-4 text-[#555]">Courbe d&apos;apprentissage avec Gutenberg</td>
                          <td className="py-3 text-[#22C55E] font-medium">Excellent editeur visuel</td>
                        </tr>
                        <tr className="border-b border-[#F0F0F0]">
                          <td className="py-3 pr-4 font-medium text-[#111]">Personnalisation design</td>
                          <td className="py-3 pr-4 text-[#555]">Bonne (themes + modules)</td>
                          <td className="py-3 pr-4 text-[#22C55E] font-medium">Illimitee (themes, plugins, code)</td>
                          <td className="py-3 text-[#22C55E] font-medium">Excellente (CSS visuel)</td>
                        </tr>
                        <tr className="border-b border-[#F0F0F0]">
                          <td className="py-3 pr-4 font-medium text-[#111]">Smart content</td>
                          <td className="py-3 pr-4 text-[#22C55E] font-medium">Natif (Pro+)</td>
                          <td className="py-3 pr-4 text-[#555]">Via plugins payants</td>
                          <td className="py-3 text-[#555]">Non disponible</td>
                        </tr>
                        <tr className="border-b border-[#F0F0F0]">
                          <td className="py-3 pr-4 font-medium text-[#111]">SEO</td>
                          <td className="py-3 pr-4 text-[#22C55E] font-medium">Outils integres + recommandations</td>
                          <td className="py-3 pr-4 text-[#22C55E] font-medium">Excellent (Yoast, Rank Math)</td>
                          <td className="py-3 text-[#555]">Correct, basique</td>
                        </tr>
                        <tr className="border-b border-[#F0F0F0]">
                          <td className="py-3 pr-4 font-medium text-[#111]">Securite</td>
                          <td className="py-3 pr-4 text-[#22C55E] font-medium">SSL, WAF, CDN inclus</td>
                          <td className="py-3 pr-4 text-[#555]">Responsabilite utilisateur (plugins)</td>
                          <td className="py-3 text-[#22C55E] font-medium">SSL, CDN inclus</td>
                        </tr>
                        <tr className="border-b border-[#F0F0F0]">
                          <td className="py-3 pr-4 font-medium text-[#111]">Hebergement</td>
                          <td className="py-3 pr-4 text-[#22C55E] font-medium">Inclus (CDN global)</td>
                          <td className="py-3 pr-4 text-[#555]">A gerer separement</td>
                          <td className="py-3 text-[#22C55E] font-medium">Inclus (AWS)</td>
                        </tr>
                        <tr className="border-b border-[#F0F0F0]">
                          <td className="py-3 pr-4 font-medium text-[#111]">Formulaires + tracking</td>
                          <td className="py-3 pr-4 text-[#22C55E] font-medium">Natif, lie au CRM</td>
                          <td className="py-3 pr-4 text-[#555]">Via plugins (Contact Form 7, Gravity)</td>
                          <td className="py-3 text-[#555]">Basique, pas de CRM</td>
                        </tr>
                        <tr className="border-b border-[#F0F0F0]">
                          <td className="py-3 pr-4 font-medium text-[#111]">A/B testing pages</td>
                          <td className="py-3 pr-4 text-[#22C55E] font-medium">Natif (Pro+)</td>
                          <td className="py-3 pr-4 text-[#555]">Via Google Optimize (arrete) ou plugins</td>
                          <td className="py-3 text-[#555]">Non disponible nativement</td>
                        </tr>
                        <tr className="border-b border-[#F0F0F0]">
                          <td className="py-3 pr-4 font-medium text-[#111]">Cout annuel (site PME)</td>
                          <td className="py-3 pr-4 text-[#555]">300 - 4 800 EUR</td>
                          <td className="py-3 pr-4 text-[#22C55E] font-medium">100 - 500 EUR (hebergement + plugins)</td>
                          <td className="py-3 text-[#555]">200 - 400 EUR</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-medium text-[#111]">Ecosysteme / marketplace</td>
                          <td className="py-3 pr-4 text-[#555]">Moyen (templates, modules)</td>
                          <td className="py-3 pr-4 text-[#22C55E] font-medium">Enorme (60 000+ plugins)</td>
                          <td className="py-3 text-[#555]">Limite (integrations tierces)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-[13px] text-[#555] leading-[1.75] mt-5">
                    Le verdict est nuance. WordPress reste imbattable en termes de flexibilite et de cout. Webflow est ideal pour les equipes design qui veulent un controle pixel-perfect. Mais si votre priorite est la generation de leads et l&apos;alignement marketing-ventes, HubSpot CMS est le seul a offrir une integration CRM native sans friction.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mt-3">
                    Concretement : si vous utilisez deja HubSpot CRM pour gerer vos contacts et vos deals, migrer votre site vers le CMS Hub eliminera des dizaines d&apos;heures de bricolage d&apos;integrations chaque mois. Chaque formulaire soumis cree ou met a jour un contact dans le CRM. Chaque page visitee est trackee dans la timeline du contact. C&apos;est cette continuite de la donnee qui fait la difference.
                  </p>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 4 : Fonctionnalites cles ============ */}
              <section id="fonctionnalites" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">4. Les fonctionnalites cles du CMS Hub</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Le CMS Hub n&apos;est pas qu&apos;un editeur de pages. C&apos;est une plateforme complete qui couvre la creation, l&apos;optimisation, la securite et la personnalisation de votre site. Voici les fonctionnalites a connaitre.
                  </p>

                  {/* Feature cards grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Drag-and-drop editor</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">L&apos;editeur visuel permet de creer et modifier des pages sans ecrire une seule ligne de code. Vous deposez des modules (texte, image, formulaire, CTA, video) dans une grille flexible. Chaque modification est visible en temps reel.</p>
                    </div>
                    <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Themes et templates</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">HubSpot propose une marketplace de themes pre-construits. Les developpeurs peuvent creer des themes sur mesure avec HubL (le langage de templating HubSpot), HTML, CSS et JavaScript. Les themes definissent la charte graphique globale du site.</p>
                    </div>
                    <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Modules personnalisables</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">Les modules sont des blocs reutilisables : temoignages clients, grilles de pricing, FAQ accordeons, sliders. Les developpeurs creent des modules custom que les marketeurs utilisent ensuite sans toucher au code.</p>
                    </div>
                    <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Smart content (contenu intelligent)</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">Affichez un contenu different selon le profil du visiteur : pays, appareil, lifecycle stage, liste CRM, source d&apos;acquisition. Un prospect qui revient verra un message different d&apos;un nouveau visiteur. Disponible a partir de l&apos;edition Pro.</p>
                    </div>
                    <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Outils SEO integres</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">L&apos;outil SEO analyse chaque page et donne des recommandations en temps reel : titre, meta description, structure Hn, mots-cles, liens internes. L&apos;outil Topic Clusters aide a organiser votre strategie de contenu autour de pilier pages et cluster pages.</p>
                    </div>
                    <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">CDN global et SSL</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">Chaque site HubSpot est heberge sur un CDN global avec SSL automatique. Pas de configuration serveur, pas de certificats a renouveler. Le CDN garantit des temps de chargement rapides partout dans le monde.</p>
                    </div>
                    <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Environnement de staging</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">Testez vos modifications sur un environnement de pre-production avant de les publier. Le staging est disponible a partir de l&apos;edition Pro. Vous pouvez y tester de nouveaux designs, des reorganisations de navigation ou des mises a jour de contenu.</p>
                    </div>
                    <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Formulaires et CTAs natifs</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">Creez des formulaires directement dans le CMS. Chaque soumission cree ou met a jour un contact dans le CRM. Les CTAs (call-to-action) sont des boutons trackables dont vous pouvez mesurer le taux de clic et le taux de conversion.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ============ SECTION 5 : 7 etapes ============ */}
              <section id="7-etapes" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">5. Creer un site performant en 7 etapes</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Construire un site sur HubSpot CMS ne s&apos;improvise pas. Voici la methodologie que nous utilisons chez Ceres pour livrer des sites B2B qui generent des leads des le premier mois.
                  </p>

                  {/* Step cards */}
                  <div className="space-y-4">
                    <div className="rounded-xl border border-[#E8E8E8] p-4 border-l-4 border-l-[#4B5EFC]">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#4B5EFC]/10 text-[#4B5EFC] text-[13px] font-bold">1</span>
                        <p className="text-[13px] font-semibold text-[#111]">Definir l&apos;arborescence et les parcours utilisateur</p>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.65] pl-10">Avant de toucher au CMS, cartographiez vos personas, leurs problematiques et le chemin qu&apos;ils doivent parcourir sur votre site pour passer de visiteur a lead. Definissez les pages piliers (accueil, produit, cas clients, pricing, blog) et les liens entre elles. Chaque page doit avoir un objectif clair et un CTA unique.</p>
                    </div>

                    <div className="rounded-xl border border-[#E8E8E8] p-4 border-l-4 border-l-[#4B5EFC]">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#4B5EFC]/10 text-[#4B5EFC] text-[13px] font-bold">2</span>
                        <p className="text-[13px] font-semibold text-[#111]">Choisir et personnaliser un theme</p>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.65] pl-10">Selectionnez un theme sur la marketplace HubSpot ou faites developper un theme sur mesure. Definissez les couleurs, typographies, espacements et styles de composants dans les parametres globaux du theme. Un bon theme permet aux marketeurs de creer de nouvelles pages sans solliciter un developpeur a chaque fois.</p>
                    </div>

                    <div className="rounded-xl border border-[#E8E8E8] p-4 border-l-4 border-l-[#4B5EFC]">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#4B5EFC]/10 text-[#4B5EFC] text-[13px] font-bold">3</span>
                        <p className="text-[13px] font-semibold text-[#111]">Rediger le contenu avec une approche SEO</p>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.65] pl-10">Chaque page doit etre ecrite pour un mot-cle cible. Utilisez l&apos;outil Topic Clusters pour organiser vos contenus en clusters semantiques. Redigez des titres H1 uniques, des meta descriptions de 150 caracteres, et structurez le contenu avec des H2 et H3 logiques. Le contenu doit repondre a une question precise que se pose votre persona.</p>
                    </div>

                    <div className="rounded-xl border border-[#E8E8E8] p-4 border-l-4 border-l-[#4B5EFC]">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#4B5EFC]/10 text-[#4B5EFC] text-[13px] font-bold">4</span>
                        <p className="text-[13px] font-semibold text-[#111]">Integrer les formulaires et CTAs</p>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.65] pl-10">Placez des formulaires HubSpot sur les pages cles : demande de demo, telechargement de contenu, inscription newsletter. Configurez des CTAs trackables sur chaque page. Chaque formulaire doit etre connecte a un workflow d&apos;automatisation (welcome series, notification equipe commerciale, lead scoring). Evitez de demander trop d&apos;informations au premier contact : nom, email et entreprise suffisent.</p>
                    </div>

                    <div className="rounded-xl border border-[#E8E8E8] p-4 border-l-4 border-l-[#4B5EFC]">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#4B5EFC]/10 text-[#4B5EFC] text-[13px] font-bold">5</span>
                        <p className="text-[13px] font-semibold text-[#111]">Optimiser la performance technique</p>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.65] pl-10">Compressez les images (format WebP, max 200 Ko par image). Minimisez le JavaScript custom. Verifiez les Core Web Vitals (LCP sous 2.5s, FID sous 100ms, CLS sous 0.1). Le CDN HubSpot gere la mise en cache, mais vous devez optimiser les ressources que vous uploadez. Utilisez le lazy loading pour les images sous le fold.</p>
                    </div>

                    <div className="rounded-xl border border-[#E8E8E8] p-4 border-l-4 border-l-[#4B5EFC]">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#4B5EFC]/10 text-[#4B5EFC] text-[13px] font-bold">6</span>
                        <p className="text-[13px] font-semibold text-[#111]">Configurer les analytics et le tracking</p>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.65] pl-10">Connectez Google Analytics 4 en parallele du tracking HubSpot natif. Configurez des evenements GA4 pour chaque soumission de formulaire et chaque clic CTA. Mettez en place des tableaux de bord HubSpot pour suivre le trafic par source, les conversions par page et le taux de rebond. Verifiez que le tracking code HubSpot est present sur toutes les pages.</p>
                    </div>

                    <div className="rounded-xl border border-[#E8E8E8] p-4 border-l-4 border-l-[#4B5EFC]">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#4B5EFC]/10 text-[#4B5EFC] text-[13px] font-bold">7</span>
                        <p className="text-[13px] font-semibold text-[#111]">Iterer et optimiser en continu</p>
                      </div>
                      <p className="text-[12px] text-[#555] leading-[1.65] pl-10">Un site n&apos;est jamais termine. Chaque mois, analysez les pages les plus visitees, celles qui convertissent le mieux et celles qui ont un taux de rebond eleve. Lancez des A/B tests sur les headlines, les CTAs et les formulaires. Mettez a jour le contenu obsolete. Ajoutez de nouvelles pages de blog pour alimenter le trafic organique.</p>
                    </div>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 6 : Smart content ============ */}
              <section id="smart-content" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">6. Le smart content : personnaliser l&apos;experience visiteur</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                    Le smart content est la fonctionnalite qui distingue fondamentalement le CMS Hub des autres CMS. Elle permet d&apos;afficher un contenu different sur une meme page en fonction du profil du visiteur. Ce n&apos;est pas de l&apos;A/B testing (ou l&apos;on compare deux versions au hasard) : c&apos;est de la personnalisation deterministe basee sur les donnees CRM.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Le smart content s&apos;appuie sur plusieurs criteres de segmentation que vous definissez dans HubSpot. Voici les principaux.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                    <div className="rounded-lg border border-[#E8E8E8] p-3">
                      <p className="text-[12px] font-semibold text-[#111] mb-1">Par pays / langue</p>
                      <p className="text-[11px] text-[#555] leading-[1.6]">Affichez le contenu dans la langue du visiteur. Montrez des references clients locales. Adaptez les prix a la devise du pays.</p>
                    </div>
                    <div className="rounded-lg border border-[#E8E8E8] p-3">
                      <p className="text-[12px] font-semibold text-[#111] mb-1">Par appareil</p>
                      <p className="text-[11px] text-[#555] leading-[1.6]">Affichez un CTA &quot;Appeler&quot; sur mobile et un formulaire complet sur desktop. Adaptez la longueur du contenu au format d&apos;ecran.</p>
                    </div>
                    <div className="rounded-lg border border-[#E8E8E8] p-3">
                      <p className="text-[12px] font-semibold text-[#111] mb-1">Par lifecycle stage</p>
                      <p className="text-[11px] text-[#555] leading-[1.6]">Un visiteur inconnu voit un formulaire de contact. Un lead identifie voit une offre de demo. Un client existant voit un lien vers le support.</p>
                    </div>
                    <div className="rounded-lg border border-[#E8E8E8] p-3">
                      <p className="text-[12px] font-semibold text-[#111] mb-1">Par liste CRM</p>
                      <p className="text-[11px] text-[#555] leading-[1.6]">Ciblez les contacts d&apos;une liste specifique (ex. : prospects chauds, clients Premium) pour leur montrer un contenu dedie.</p>
                    </div>
                    <div className="rounded-lg border border-[#E8E8E8] p-3">
                      <p className="text-[12px] font-semibold text-[#111] mb-1">Par source d&apos;acquisition</p>
                      <p className="text-[11px] text-[#555] leading-[1.6]">Un visiteur venant de Google Ads voit un message aligne avec l&apos;annonce. Un visiteur venant de LinkedIn voit un contenu adapte a un persona B2B.</p>
                    </div>
                    <div className="rounded-lg border border-[#E8E8E8] p-3">
                      <p className="text-[12px] font-semibold text-[#111] mb-1">Par nombre de visites</p>
                      <p className="text-[11px] text-[#555] leading-[1.6]">Premiere visite : presentation de l&apos;entreprise. Deuxieme visite : etude de cas. Troisieme visite : offre directe avec urgence.</p>
                    </div>
                  </div>

                  <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                    L&apos;impact est mesurable. Les sites qui utilisent le smart content affichent des taux de conversion 2 a 3 fois superieurs a ceux qui montrent le meme contenu a tous les visiteurs. La raison est simple : un message pertinent pour le visiteur a plus de chances de declencher une action qu&apos;un message generique.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75]">
                    Attention cependant : le smart content necessite des donnees CRM fiables. Si vos fiches contacts ne sont pas enrichies (lifecycle stage, secteur, taille d&apos;entreprise), vous n&apos;aurez pas assez de criteres pour personnaliser efficacement. C&apos;est pourquoi le smart content fonctionne mieux quand il est couple a une strategie de lead scoring et d&apos;enrichissement de donnees.
                  </p>
                </div>
              </section>

              {/* ============ SECTION 7 : SEO et performance ============ */}
              <section id="seo-performance" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">7. SEO et performance technique</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Un site qui ne se positionne pas dans les resultats de recherche est un site invisible. Le CMS Hub integre des outils SEO directement dans l&apos;editeur de pages, mais la performance technique depend aussi de vos pratiques de developpement et de creation de contenu.
                  </p>

                  {/* Core Web Vitals card */}
                  <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4 mb-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-3">Core Web Vitals - Objectifs</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-[18px] font-bold text-[#22C55E]">&lt; 2.5s</p>
                        <p className="text-[10px] text-[#999]">LCP (Largest Contentful Paint) - temps de chargement du plus grand element visible</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#22C55E]">&lt; 100ms</p>
                        <p className="text-[10px] text-[#999]">FID (First Input Delay) - temps de reponse a la premiere interaction utilisateur</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#22C55E]">&lt; 0.1</p>
                        <p className="text-[10px] text-[#999]">CLS (Cumulative Layout Shift) - stabilite visuelle de la page pendant le chargement</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                    Le CMS Hub gere automatiquement plusieurs aspects techniques du SEO : generation du sitemap XML, gestion des redirections 301, balises canonical, structure des URLs, et configuration du fichier robots.txt. Le CDN global de HubSpot assure des temps de chargement rapides, avec une disponibilite de 99.99%.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                    Les outils SEO integres analysent chaque page en temps reel et fournissent des recommandations actionnables : absence de meta description, titre trop long, pas de lien interne, images sans attribut alt, structure de heading incorrecte. L&apos;outil Topic Clusters permet de cartographier votre strategie de contenu en reliant des pages piliers a des articles de blog peripheriques.
                  </p>

                  <div className="space-y-3 mb-5">
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Bonnes pratiques SEO sur HubSpot CMS</p>
                      <ul className="text-[13px] text-[#555] leading-[1.75] space-y-1 list-disc pl-4">
                        <li>Un seul H1 par page, alignee avec le mot-cle cible</li>
                        <li>Meta description unique de 140 a 160 caracteres pour chaque page</li>
                        <li>URLs courtes et descriptives (eviter les parametres inutiles)</li>
                        <li>Images compressees en WebP avec attribut alt descriptif</li>
                        <li>Maillage interne : chaque page doit avoir au moins 2 liens entrants</li>
                        <li>Utiliser les Topic Clusters pour organiser le contenu par themes</li>
                        <li>Configurer les redirections 301 pour toutes les anciennes URLs apres migration</li>
                        <li>Verifier regulierement le rapport de performance dans Google Search Console</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-[13px] text-[#555] leading-[1.75]">
                    Un point important : le CMS Hub gere le SSL et la mise en cache automatiquement, mais il ne peut pas compenser un contenu de mauvaise qualite ou une architecture de site confuse. Le SEO technique est necessaire mais pas suffisant. Le contenu reste roi : des pages bien ecrites, qui repondent a des questions reelles de vos personas, se positionneront toujours mieux que des pages techniquement parfaites mais vides de substance.
                  </p>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 8 : Integration CMS + CRM ============ */}
              <section id="cms-crm" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">8. Integrer le CMS avec le CRM HubSpot</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                    C&apos;est le veritable avantage competitif du CMS Hub : l&apos;integration native avec le CRM HubSpot. Chaque interaction sur votre site alimente directement la fiche contact, sans configuration supplementaire, sans middleware, sans API custom.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Voici concretement comment le CMS et le CRM travaillent ensemble pour transformer votre site en machine a leads.
                  </p>

                  <div className="space-y-4 mb-5">
                    <div className="rounded-xl border border-[#E8E8E8] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Formulaires connectes au CRM</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">Chaque formulaire HubSpot place sur votre site cree automatiquement un contact dans le CRM (ou met a jour un contact existant si l&apos;email est deja connu). Les champs du formulaire sont mappes aux proprietes du CRM. Vous pouvez ajouter des champs progressifs (progressive profiling) qui s&apos;affichent uniquement aux visiteurs deja connus, pour enrichir progressivement leur fiche sans leur demander deux fois la meme information.</p>
                    </div>
                    <div className="rounded-xl border border-[#E8E8E8] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">CTAs trackables et mesurables</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">Les CTAs HubSpot ne sont pas de simples boutons. Ce sont des objets CRM mesurables : nombre de vues, nombre de clics, taux de clic, taux de conversion. Vous pouvez A/B tester deux versions d&apos;un meme CTA et voir laquelle genere le plus de conversions. Les donnees de clic sont enregistrees dans la timeline du contact.</p>
                    </div>
                    <div className="rounded-xl border border-[#E8E8E8] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Chatbot et live chat</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">Le chatbot HubSpot (disponible dans le CRM gratuit) peut etre ajoute a votre site CMS en un clic. Il qualifie les visiteurs avec des questions automatiques, cree des tickets ou des contacts, et transfere la conversation a un commercial si le visiteur est qualifie. Chaque conversation est enregistree dans le CRM.</p>
                    </div>
                    <div className="rounded-xl border border-[#E8E8E8] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Lead scoring depuis le site</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">Les visites de pages sont trackees et utilisees dans le lead scoring. Un prospect qui visite la page pricing trois fois en une semaine recoit un score plus eleve qu&apos;un prospect qui a seulement lu un article de blog. Vous pouvez configurer des regles de scoring basees sur les pages visitees, la frequence de visite et les actions effectuees sur le site.</p>
                    </div>
                  </div>

                  {/* Visual flow */}
                  <div className="rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-3">Flux de donnees CMS vers CRM</p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-3 py-1.5 rounded-md bg-[#4B5EFC] text-white font-medium">Visiteur sur le site</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#E8E8E8] text-[#555]">Tracking pages visitees</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#E8E8E8] text-[#555]">Soumission formulaire</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#E8E8E8] text-[#555]">Creation/MAJ contact CRM</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#E8E8E8] text-[#555]">Lead scoring automatique</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-[#22C55E] text-white font-medium">Notification commercial</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* ============ SECTION 9 : Limites ============ */}
              <section id="limites" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">9. Les limites du HubSpot CMS</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Le CMS Hub n&apos;est pas la solution ideale pour tout le monde. Il est important de connaitre ses limites avant de s&apos;engager, notamment parce que la migration depuis un autre CMS peut etre couteuse en temps et en argent.
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-xl border border-[#E8E8E8] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Personnalisation design limitee par rapport a WordPress ou Webflow</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">Le CMS Hub utilise un systeme de themes et de modules qui encadre les possibilites de personnalisation. Pour un design tres specifique ou une animation complexe, vous aurez besoin d&apos;un developpeur HubSpot qui maitrise HubL, le langage de templating proprietaire. La courbe d&apos;apprentissage de HubL est plus raide que celle de Liquid (Shopify) ou du PHP WordPress.</p>
                    </div>
                    <div className="rounded-xl border border-[#E8E8E8] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Cout eleve pour les fonctionnalites avancees</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">Le smart content, le staging et l&apos;A/B testing ne sont disponibles qu&apos;a partir de l&apos;edition Pro a 400 EUR/mois. Pour une PME qui debute, c&apos;est un investissement significatif. A titre de comparaison, un site WordPress heberge revient a 10-50 EUR/mois avec des fonctionnalites similaires (via des plugins).</p>
                    </div>
                    <div className="rounded-xl border border-[#E8E8E8] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Dependance a l&apos;ecosysteme HubSpot</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">Une fois votre site sur le CMS Hub, migrer vers un autre CMS est un projet en soi. Les templates HubL ne sont pas portables vers WordPress ou Webflow. Vos contenus (pages, blog posts) peuvent etre exportes, mais la mise en forme et les modules custom devront etre recrees. C&apos;est un lock-in a prendre en compte.</p>
                    </div>
                    <div className="rounded-xl border border-[#E8E8E8] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Migration depuis un CMS existant</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">Migrer un site WordPress de 50 pages vers le CMS Hub prend en general 4 a 8 semaines. Il faut recoder les templates en HubL, migrer le contenu, configurer les redirections 301 pour ne pas perdre le SEO, et tester chaque page. Le cout d&apos;une migration par une agence varie de 5 000 a 20 000 EUR selon la complexite du site.</p>
                    </div>
                    <div className="rounded-xl border border-[#E8E8E8] p-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-2">Marketplace de modules plus petite</p>
                      <p className="text-[12px] text-[#555] leading-[1.65]">L&apos;ecosysteme de modules et templates HubSpot est beaucoup plus petit que celui de WordPress (60 000+ plugins). Pour des besoins specifiques (e-commerce avance, forum, LMS), vous ne trouverez pas forcement de solution native. Il faudra developper sur mesure ou utiliser des integrations tierces.</p>
                    </div>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 10 : Notre avis - Dark section ============ */}
              <section id="avis" className="mb-8">
                <div className="rounded-2xl bg-[#111] p-5 md:p-8">
                  <h2 className="text-[17px] font-semibold text-white mb-4">10. Notre avis et recommandation</h2>
                  <p className="text-[13px] text-white/60 leading-[1.75] mb-4">
                    Apres avoir deploye et optimise des dizaines de sites sur le CMS Hub chez Ceres, notre position est claire : HubSpot CMS n&apos;est pas le meilleur CMS du marche en termes de flexibilite design ou de cout. Mais c&apos;est le meilleur choix pour les entreprises B2B qui veulent transformer leur site en un outil de generation de leads connecte a leur CRM.
                  </p>
                  <p className="text-[13px] text-white/60 leading-[1.75] mb-5">
                    Le choix depend de votre situation. Voici nos recommandations par profil.
                  </p>

                  <div className="space-y-3 mb-5">
                    {[
                      { profil: "Startup en phase de traction", reco: "Commencez avec le CMS Hub Free ou Starter. Le CRM gratuit + un site simple suffit pour valider votre marche. Ne surpayez pas des fonctionnalites premium que vous n&apos;utiliserez pas." },
                      { profil: "PME B2B avec 10-50 commerciaux", reco: "Le CMS Hub Pro est votre meilleur investissement. Le smart content, le staging et l&apos;integration CRM native vont generer un ROI mesurable en 3 a 6 mois. Le cout (400 EUR/mois) est largement amorti par les leads supplementaires." },
                      { profil: "Entreprise avec site WordPress existant", reco: "Ne migrez pas si votre site fonctionne bien et que vous n&apos;utilisez pas HubSpot CRM. Migrez si vous avez deja HubSpot CRM et que vous perdez du temps a synchroniser vos donnees entre WordPress et HubSpot." },
                      { profil: "Equipe design-first (agence, SaaS design-led)", reco: "Webflow est probablement un meilleur choix si votre priorite est le design. HubSpot CMS n&apos;offrira jamais le meme niveau de controle pixel-perfect." },
                    ].map((item) => (
                      <div key={item.profil} className="flex gap-3 text-[12px]">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#22C55E] mt-0.5"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <div>
                          <span className="text-white/80 font-medium">{item.profil}</span>
                          <span className="text-white/40 mx-2">-</span>
                          <span className="text-white/50">{item.reco}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-[13px] text-white/60 leading-[1.75] mb-3">
                    Le facteur decisif n&apos;est pas la technologie, c&apos;est la strategie. Un site mal concu sur HubSpot CMS ne convertira pas mieux qu&apos;un site mal concu sur WordPress. La difference se fait dans l&apos;execution : arborescence pensee pour la conversion, contenu redige pour les personas, formulaires optimises, smart content configure, et analytics suivies rigoureusement.
                  </p>
                  <p className="text-[13px] text-white/60 leading-[1.75]">
                    Chez Ceres, nous accompagnons les entreprises B2B dans la creation et l&apos;optimisation de leur site HubSpot CMS. De la strategie de contenu a la configuration du smart content, en passant par l&apos;integration CRM et le suivi des performances, nous prenons en charge l&apos;ensemble du projet pour que votre site devienne votre meilleur commercial.
                  </p>
                </div>
              </section>

              {/* Related articles */}
              <section className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-7 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
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
                <div className="rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 md:p-10 text-center">
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour votre site HubSpot CMS ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On cree et optimise votre site HubSpot CMS de A a Z. Strategie, design, contenu, integration CRM et suivi des performances inclus.</p>
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
