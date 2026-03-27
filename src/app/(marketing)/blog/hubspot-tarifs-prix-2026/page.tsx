"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "HubSpot tarifs 2026 : tous les prix decryptes hub par hub",
  description: "Guide complet des tarifs HubSpot 2026 : prix detailles de chaque hub (Marketing, Sales, Service, CMS, Operations, Commerce), tous les paliers (Free, Starter, Pro, Enterprise), couts caches, bundles CRM Suite, simulations de budget et conseils pour optimiser vos depenses.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-22",
  dateModified: "2026-03-22",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/hubspot-tarifs-prix-2026" },
  articleSection: "CRM & HubSpot",
  wordCount: 4200,
  inLanguage: "fr",
};

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "modele-tarifaire", title: "Le modele tarifaire" },
  { id: "marketing-hub", title: "Marketing Hub" },
  { id: "sales-hub", title: "Sales Hub" },
  { id: "service-hub", title: "Service Hub" },
  { id: "cms-hub", title: "CMS Hub" },
  { id: "operations-hub", title: "Operations Hub" },
  { id: "commerce-hub", title: "Commerce Hub" },
  { id: "crm-suite", title: "Bundles CRM Suite" },
  { id: "couts-caches", title: "Couts caches" },
  { id: "simulation", title: "Simulation de budget" },
  { id: "economiser", title: "Astuces pour economiser" },
  { id: "notre-avis", title: "Notre avis global" },
];

const relatedArticles = [
  { title: "HubSpot vs Pipedrive : comparatif complet prix et fonctionnalites", slug: "hubspot-vs-pipedrive-comparatif-prix-fonctionnalites", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "CRM pour PME en 2026 : le guide pour bien choisir", slug: "crm-pme-2026", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "9 actions commerciales que vous devriez automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "Automatisation", color: "#FF7A59" },
];

/* ─── Pricing card helper ─── */
function PricingCard({ tier, price, period, features, color, popular }: { tier: string; price: string; period?: string; features: string[]; color: string; popular?: boolean }) {
  return (
    <div className={`relative rounded-xl border ${popular ? "border-[#FF7A59] shadow-[0_0_0_1px_#FF7A59]" : "border-[#E8E8E8]"} bg-white overflow-hidden`}>
      {popular && <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#FF7A59]" />}
      <div className="p-4 text-center" style={{ background: `linear-gradient(135deg, ${color}08, ${color}15)` }}>
        <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color }}>{tier}</p>
        <p className="text-[22px] font-bold text-[#111]">{price}</p>
        {period && <p className="text-[10px] text-[#999]">{period}</p>}
      </div>
      <div className="p-4 space-y-2">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
            <span className="text-[11px] text-[#555] leading-[1.5]">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Simulation card helper ─── */
function SimulationCard({ profile, description, hubs, monthly, annual, color }: { profile: string; description: string; hubs: { name: string; tier: string; price: string }[]; monthly: string; annual: string; color: string }) {
  return (
    <div className="rounded-xl border border-[#E8E8E8] bg-white overflow-hidden shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
      <div className="p-4 border-b border-[#F2F2F2]" style={{ background: `linear-gradient(135deg, ${color}08, ${color}12)` }}>
        <p className="text-[13px] font-bold text-[#111] mb-1">{profile}</p>
        <p className="text-[11px] text-[#777]">{description}</p>
      </div>
      <div className="p-4 space-y-2">
        {hubs.map((h, i) => (
          <div key={i} className="flex items-center justify-between text-[11px]">
            <span className="text-[#555]">{h.name} <span className="text-[#999]">({h.tier})</span></span>
            <span className="font-medium text-[#111]">{h.price}</span>
          </div>
        ))}
        <div className="pt-3 mt-3 border-t border-[#F2F2F2]">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-semibold text-[#111]">Total mensuel</span>
            <span className="font-bold text-[16px]" style={{ color }}>{monthly}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] mt-1">
            <span className="text-[#999]">Total annuel</span>
            <span className="text-[#999]">{annual}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HubSpotTarifsPrix2026Article() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("introduction");

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
        <div className="h-full bg-[#4B5EFC] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "4%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "12%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "24%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "36%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "48%", width: 260, height: 260, borderRadius: "50%", background: "#FF7A59", opacity: 0.09, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "60%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "72%", width: 240, height: 240, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "84%", width: 260, height: 260, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet?text=HubSpot%20tarifs%202026%20%3A%20tous%20les%20prix%20decryptes%20hub%20par%20hub&url=https://www.ceres-revops.com/blog/hubspot-tarifs-prix-2026" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/hubspot-tarifs-prix-2026" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">HubSpot tarifs 2026</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">20 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                HubSpot tarifs 2026 : tous les prix decryptes hub par hub
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Six hubs, quatre paliers tarifaires par hub, des add-ons, des frais d&apos;onboarding, une tarification au contact qui change selon le hub, des bundles CRM Suite avec des remises variables. La grille tarifaire de HubSpot en 2026 est un labyrinthe. On l&apos;a demontee piece par piece pour vous donner une vision claire de ce que coute reellement HubSpot selon votre usage, votre taille d&apos;equipe et vos objectifs. Pas de jargon commercial, juste les chiffres et notre avis terrain sur chaque hub.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>22 mars 2026</span>
              </div>
            </header>

            <article>
              {/* ═══════════════════════════════════════════════ */}
              {/* Section 1 : Introduction */}
              {/* ═══════════════════════════════════════════════ */}
              <section id="introduction" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FF7A59]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Pourquoi cet article existe</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>HubSpot est devenu la plateforme CRM de reference pour les entreprises B2B en France. Mais comprendre ses tarifs est devenu un exercice de patience. La page pricing officielle affiche des prix d&apos;appel qui ne refletent pas la realite une fois que l&apos;on ajoute les contacts supplementaires, les utilisateurs payants, les frais d&apos;onboarding obligatoires et les add-ons.</p>
                    <p>En tant qu&apos;agence RevOps partenaire HubSpot, on deploie la plateforme chez des startups, des PME et des ETI chaque semaine. On connait les prix reels, les pieges tarifaires, et surtout les leviers pour optimiser la facture. Cet article est le guide que l&apos;on aurait aime avoir quand on a commence.</p>
                    <p>Toutes les donnees sont a jour en mars 2026. Les prix sont indiques en euros, en facturation mensuelle sauf mention contraire. La facturation annuelle offre generalement une remise de 10 a 25 % selon les hubs.</p>
                  </div>

                  {/* Quick overview table */}
                  <div className="mt-6 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] overflow-hidden">
                    <div className="p-3 bg-[#111] text-white">
                      <p className="text-[11px] font-semibold">Vue d&apos;ensemble des prix HubSpot 2026 (facturation mensuelle)</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="border-b border-[#F2F2F2]">
                            <th className="text-left p-3 text-[#999] font-medium">Hub</th>
                            <th className="text-center p-3 text-[#999] font-medium">Free</th>
                            <th className="text-center p-3 text-[#999] font-medium">Starter</th>
                            <th className="text-center p-3 text-[#999] font-medium">Pro</th>
                            <th className="text-center p-3 text-[#999] font-medium">Enterprise</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { hub: "Marketing Hub", free: "0 EUR", starter: "20 EUR/mois", pro: "890 EUR/mois", enterprise: "3 600 EUR/mois" },
                            { hub: "Sales Hub", free: "0 EUR", starter: "20 EUR/mois", pro: "100 EUR/mois/siege", enterprise: "150 EUR/mois/siege" },
                            { hub: "Service Hub", free: "0 EUR", starter: "20 EUR/mois", pro: "100 EUR/mois/siege", enterprise: "150 EUR/mois/siege" },
                            { hub: "CMS Hub", free: "0 EUR", starter: "20 EUR/mois", pro: "490 EUR/mois", enterprise: "1 470 EUR/mois" },
                            { hub: "Operations Hub", free: "0 EUR", starter: "20 EUR/mois", pro: "790 EUR/mois", enterprise: "2 000 EUR/mois" },
                            { hub: "Commerce Hub", free: "0 EUR", starter: "20 EUR/mois", pro: "-", enterprise: "-" },
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-[#F2F2F2] last:border-0">
                              <td className="p-3 font-medium text-[#111]">{row.hub}</td>
                              <td className="p-3 text-center text-[#22C55E] font-medium">{row.free}</td>
                              <td className="p-3 text-center text-[#555]">{row.starter}</td>
                              <td className="p-3 text-center text-[#555]">{row.pro}</td>
                              <td className="p-3 text-center text-[#555]">{row.enterprise}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-3 bg-[#F9F9F9] border-t border-[#F2F2F2]">
                      <p className="text-[10px] text-[#999]">Prix indicatifs en euros TTC, facturation mensuelle. Les prix en facturation annuelle sont inferieurs de 10 a 25 %. Source : hubspot.com, mars 2026.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════════ */}
              {/* Section 2 : Le modele tarifaire */}
              {/* ═══════════════════════════════════════════════ */}
              <section id="modele-tarifaire" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#4B5EFC]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B5EFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20" /><path d="M5 20V10" /><path d="M10 20V4" /><path d="M15 20v-8" /><path d="M20 20V14" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Comprendre le modele tarifaire de HubSpot</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Avant de plonger dans les prix hub par hub, il faut comprendre la logique tarifaire de HubSpot. Elle repose sur quatre axes qui se combinent et peuvent faire exploser la facture si l&apos;on n&apos;y prend pas garde.</p>

                    <div className="grid gap-3 mt-4">
                      {[
                        { title: "1. Le hub", desc: "Chaque produit (Marketing, Sales, Service, CMS, Operations, Commerce) est vendu separement. Vous pouvez n&apos;acheter qu&apos;un seul hub ou les combiner via le bundle CRM Suite.", color: "#FF7A59" },
                        { title: "2. Le palier (tier)", desc: "Chaque hub existe en quatre versions : Free, Starter, Professional et Enterprise. Les fonctionnalites augmentent significativement entre chaque palier, tout comme le prix.", color: "#4B5EFC" },
                        { title: "3. Les contacts marketing", desc: "Pour le Marketing Hub uniquement, vous payez en fonction du nombre de contacts marketing (ceux a qui vous envoyez des emails). Le prix de base inclut 1 000 contacts en Starter et 2 000 en Pro. Au-dela, chaque tranche supplementaire est facturee.", color: "#6C5CE7" },
                        { title: "4. Les sieges (seats)", desc: "Pour Sales Hub et Service Hub en Pro et Enterprise, chaque utilisateur payant necessite un siege. Le prix affiche est par siege. C&apos;est le facteur multiplicateur le plus sous-estime.", color: "#22C55E" },
                      ].map((item, i) => (
                        <div key={i} className="rounded-xl border-l-2 bg-[#FAFAFA] p-4" style={{ borderColor: item.color }}>
                          <p className="text-[12px] font-semibold text-[#111] mb-1">{item.title}</p>
                          <p className="text-[11px] text-[#777] leading-[1.6]">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <p className="mt-4">La complexite vient de la combinaison de ces quatre axes. Une entreprise de 10 commerciaux qui veut Sales Hub Pro + Marketing Hub Pro avec 10 000 contacts marketing ne paie pas 990 EUR/mois. Elle paie bien plus. C&apos;est ce que l&apos;on va detailler pour chaque hub.</p>
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════════ */}
              {/* Section 3 : Marketing Hub */}
              {/* ═══════════════════════════════════════════════ */}
              <section id="marketing-hub" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FF7A59]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Marketing Hub : tarifs et fonctionnalites</h2>
                  </div>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Le Marketing Hub est le produit historique de HubSpot et celui dont la tarification est la plus complexe. Le prix varie en fonction du palier mais aussi du nombre de contacts marketing, ce qui peut faire doubler ou tripler la facture initiale.</p>

                  {/* Pricing cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <PricingCard
                      tier="Free"
                      price="0 EUR"
                      features={[
                        "Formulaires",
                        "Email marketing (2 000 envois/mois)",
                        "Landing pages (20 pages)",
                        "Live chat",
                        "Gestion des contacts basique",
                        "Pub Facebook, Google, LinkedIn (limites)",
                        "Tableau de bord de reporting basique",
                      ]}
                      color="#22C55E"
                    />
                    <PricingCard
                      tier="Starter"
                      price="20 EUR/mois"
                      period="1 000 contacts marketing inclus"
                      features={[
                        "Tout le Free +",
                        "Retrait du branding HubSpot",
                        "Email marketing (5x quota contacts)",
                        "Segmentation par listes (25 listes actives)",
                        "Automatisation simple (email de suivi)",
                        "Reporting sur les landing pages",
                        "Paiements integres (Stripe)",
                        "SDK de conversations",
                      ]}
                      color="#4B5EFC"
                    />
                    <PricingCard
                      tier="Professional"
                      price="890 EUR/mois"
                      period="2 000 contacts marketing inclus"
                      popular
                      features={[
                        "Tout le Starter +",
                        "Marketing automation (workflows)",
                        "Campagnes omnicanal",
                        "SEO et strategie de contenu",
                        "A/B testing",
                        "Reporting multi-touch attribution",
                        "Scoring des leads",
                        "Smart content",
                        "Social media (publication + reporting)",
                        "Blog integre",
                        "Sous-domaines multiples",
                        "CTAs personnalises",
                      ]}
                      color="#FF7A59"
                    />
                    <PricingCard
                      tier="Enterprise"
                      price="3 600 EUR/mois"
                      period="10 000 contacts marketing inclus"
                      features={[
                        "Tout le Pro +",
                        "Attribution de revenus multi-touch",
                        "Adaptive testing (IA)",
                        "Partitionnement des contenus par equipe",
                        "Evenements comportementaux personnalises",
                        "Hierarchie d&apos;equipes",
                        "Objets personnalises",
                        "Sandbox",
                        "Single sign-on (SSO)",
                        "Limite a 10 000 listes actives",
                      ]}
                      color="#111"
                    />
                  </div>

                  {/* Contact pricing breakdown */}
                  <div className="rounded-xl bg-[#FFF7F5] border border-[#FFE0D6] p-4 mb-6">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Tarification des contacts marketing supplementaires</p>
                    <div className="space-y-1.5 text-[11px] text-[#555]">
                      <p><strong className="text-[#111]">Starter :</strong> +20 EUR/mois par tranche de 1 000 contacts supplementaires</p>
                      <p><strong className="text-[#111]">Professional :</strong> +250 EUR/mois par tranche de 5 000 contacts supplementaires</p>
                      <p><strong className="text-[#111]">Enterprise :</strong> +100 EUR/mois par tranche de 10 000 contacts supplementaires</p>
                      <p className="text-[#999] mt-2">Exemple concret : Marketing Hub Pro avec 25 000 contacts = 890 EUR + (5 x 250 EUR) = 2 140 EUR/mois</p>
                    </div>
                  </div>

                  {/* Notre avis */}
                  <div className="rounded-xl bg-[#111] p-4">
                    <p className="text-[12px] font-semibold text-white mb-2">Notre avis sur le Marketing Hub</p>
                    <p className="text-[11px] text-white/60 leading-[1.7]">Le Marketing Hub est excellent a partir du tier Pro. C&apos;est la que l&apos;on debloque les workflows, l&apos;A/B testing et l&apos;attribution multi-touch qui justifient vraiment l&apos;investissement. Le Starter est trop limite pour du marketing serieux : pas de workflows, pas de scoring. Le saut de prix entre Starter (20 EUR) et Pro (890 EUR) est le plus violent de toute la gamme HubSpot. Il n&apos;y a pas d&apos;entre-deux. Attention egalement au cout des contacts qui peut doubler la facture du Pro si votre base depasse les 10 000 contacts marketing. Nettoyez vos listes regulierement, c&apos;est de l&apos;argent reel.</p>
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════════ */}
              {/* Section 4 : Sales Hub */}
              {/* ═══════════════════════════════════════════════ */}
              <section id="sales-hub" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#4B5EFC]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B5EFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Sales Hub : tarifs et fonctionnalites</h2>
                  </div>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Le Sales Hub est le hub le plus deploye chez nos clients. Sa tarification a evolue en 2024 avec l&apos;introduction du modele par siege (seat-based pricing) pour les niveaux Pro et Enterprise, ce qui change fondamentalement le calcul pour les equipes commerciales de plus de 5 personnes.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <PricingCard
                      tier="Free"
                      price="0 EUR"
                      features={[
                        "Gestion des contacts et deals",
                        "Pipeline de vente (1 pipeline)",
                        "Devis (limites)",
                        "Planification de reunions (1 lien)",
                        "Live chat",
                        "Tableau de bord de reporting basique",
                        "Snippets (5)",
                        "Documents (5)",
                      ]}
                      color="#22C55E"
                    />
                    <PricingCard
                      tier="Starter"
                      price="20 EUR/mois"
                      period="2 utilisateurs inclus"
                      features={[
                        "Tout le Free +",
                        "2 pipelines de vente",
                        "Automatisation simple (taches, notifications)",
                        "Objectifs commerciaux",
                        "Devises multiples",
                        "Sequences email (limites)",
                        "Repetition de taches",
                        "File d&apos;attente de taches",
                      ]}
                      color="#4B5EFC"
                    />
                    <PricingCard
                      tier="Professional"
                      price="100 EUR/mois/siege"
                      period="Minimum 1 siege"
                      popular
                      features={[
                        "Tout le Starter +",
                        "15 pipelines de vente",
                        "Sequences avancees (500 envois/jour)",
                        "Workflows d&apos;automatisation complets",
                        "Playbooks (guides de vente)",
                        "Devis avec signature electronique",
                        "Previsions de ventes",
                        "Scoring predictif",
                        "Coaching conversationnel (IA)",
                        "Reporting personnalise avance",
                        "ABM (Account-Based Marketing)",
                        "Produits et tarifs",
                      ]}
                      color="#FF7A59"
                    />
                    <PricingCard
                      tier="Enterprise"
                      price="150 EUR/mois/siege"
                      period="Minimum 10 sieges"
                      features={[
                        "Tout le Pro +",
                        "100 pipelines de vente",
                        "Intelligence conversationnelle avancee",
                        "Objets personnalises",
                        "Scoring predictif avance (IA)",
                        "Suivi des revenus recurrents",
                        "Hierarchie d&apos;equipes avancee",
                        "Sandbox",
                        "Single sign-on (SSO)",
                        "Journaux d&apos;audit avances",
                        "Gestion des permissions granulaire",
                      ]}
                      color="#111"
                    />
                  </div>

                  {/* Seat pricing warning */}
                  <div className="rounded-xl bg-[#FFF7F5] border border-[#FFE0D6] p-4 mb-6">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Le vrai cout par equipe (Sales Hub Pro)</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="border-b border-[#FFE0D6]">
                            <th className="text-left p-2 text-[#999] font-medium">Taille equipe</th>
                            <th className="text-center p-2 text-[#999] font-medium">Prix mensuel</th>
                            <th className="text-center p-2 text-[#999] font-medium">Prix annuel</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { team: "3 commerciaux", monthly: "300 EUR/mois", annual: "3 600 EUR/an" },
                            { team: "5 commerciaux", monthly: "500 EUR/mois", annual: "6 000 EUR/an" },
                            { team: "10 commerciaux", monthly: "1 000 EUR/mois", annual: "12 000 EUR/an" },
                            { team: "20 commerciaux", monthly: "2 000 EUR/mois", annual: "24 000 EUR/an" },
                            { team: "50 commerciaux", monthly: "5 000 EUR/mois", annual: "60 000 EUR/an" },
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-[#FFF0EB] last:border-0">
                              <td className="p-2 text-[#555]">{row.team}</td>
                              <td className="p-2 text-center font-medium text-[#111]">{row.monthly}</td>
                              <td className="p-2 text-center text-[#999]">{row.annual}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#111] p-4">
                    <p className="text-[12px] font-semibold text-white mb-2">Notre avis sur le Sales Hub</p>
                    <p className="text-[11px] text-white/60 leading-[1.7]">Le Sales Hub est le meilleur rapport qualite/prix de HubSpot. Le Free est deja tres fonctionnel pour une petite equipe. Le Starter a 20 EUR/mois est une affaire pour les TPE. Le Pro a 100 EUR/siege est competitif face a Salesforce (qui demarre a 80 EUR/siege en Sales Cloud mais avec beaucoup moins de fonctionnalites incluses). Le point d&apos;attention : le minimum de 10 sieges en Enterprise, soit 1 500 EUR/mois minimum, ce qui reserve ce palier aux equipes de 10+ commerciaux. Conseil : ne mettez en siege Pro que les commerciaux qui utilisent activement les sequences et les workflows. Les managers peuvent souvent rester en visualisation gratuite.</p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ═══════════════════════════════════════════════ */}
              {/* Section 5 : Service Hub */}
              {/* ═══════════════════════════════════════════════ */}
              <section id="service-hub" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Service Hub : tarifs et fonctionnalites</h2>
                  </div>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Le Service Hub suit le meme modele tarifaire que le Sales Hub : tarification par siege pour les niveaux Pro et Enterprise. Il a ete profondement refondu en 2024 avec l&apos;ajout du Help Desk unifie et des outils IA pour le support client.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <PricingCard
                      tier="Free"
                      price="0 EUR"
                      features={[
                        "Ticketing basique",
                        "Live chat",
                        "Boite de reception partagee",
                        "Base de connaissances limitee",
                        "Snippets (5)",
                        "Tableau de bord de reporting basique",
                      ]}
                      color="#22C55E"
                    />
                    <PricingCard
                      tier="Starter"
                      price="20 EUR/mois"
                      period="2 utilisateurs inclus"
                      features={[
                        "Tout le Free +",
                        "2 pipelines de tickets",
                        "Automatisation simple (routage de tickets)",
                        "Conversations multi-canal",
                        "Retrait du branding HubSpot sur le chat",
                        "SDK de conversations",
                        "Mesure de la satisfaction basique",
                      ]}
                      color="#4B5EFC"
                    />
                    <PricingCard
                      tier="Professional"
                      price="100 EUR/mois/siege"
                      period="Minimum 1 siege"
                      popular
                      features={[
                        "Tout le Starter +",
                        "Help Desk unifie",
                        "Base de connaissances avancee",
                        "Enquetes NPS, CSAT, CES",
                        "Portail client",
                        "SLA (accords de niveau de service)",
                        "Workflows d&apos;automatisation",
                        "Reporting personnalise avance",
                        "Playbooks de service",
                        "Intelligence conversationnelle (IA)",
                      ]}
                      color="#FF7A59"
                    />
                    <PricingCard
                      tier="Enterprise"
                      price="150 EUR/mois/siege"
                      period="Minimum 10 sieges"
                      features={[
                        "Tout le Pro +",
                        "Objets personnalises",
                        "Gestion des equipes avancee",
                        "Roles et permissions granulaires",
                        "Single sign-on (SSO)",
                        "Sandbox",
                        "Intelligence conversationnelle avancee",
                        "Bots conversationnels avances",
                        "Journaux d&apos;audit",
                      ]}
                      color="#111"
                    />
                  </div>

                  <div className="rounded-xl bg-[#111] p-4">
                    <p className="text-[12px] font-semibold text-white mb-2">Notre avis sur le Service Hub</p>
                    <p className="text-[11px] text-white/60 leading-[1.7]">Le Service Hub a longtemps ete le parent pauvre de HubSpot. Depuis la refonte de 2024, il est devenu serieux. Le Help Desk unifie en Pro est un vrai concurrent a Zendesk et Intercom, avec l&apos;avantage de partager la meme base de donnees que le CRM et le Marketing Hub. Le portail client est un atout majeur pour les entreprises B2B. Cela dit, si le support client est votre besoin principal et que vous n&apos;utilisez pas d&apos;autres hubs HubSpot, des outils specialises comme Zendesk ou Freshdesk offrent souvent un meilleur rapport fonctionnalites/prix pour un usage isole.</p>
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════════ */}
              {/* Section 6 : CMS Hub */}
              {/* ═══════════════════════════════════════════════ */}
              <section id="cms-hub" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#6C5CE7]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-[#111]">CMS Hub : tarifs et fonctionnalites</h2>
                  </div>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Le CMS Hub (Content Hub depuis 2024) est le systeme de gestion de contenu de HubSpot. Il heberge votre site web et votre blog directement dans HubSpot, avec des outils de personnalisation et d&apos;optimisation integres. La tarification est forfaitaire, sans tarification au siege.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <PricingCard
                      tier="Free"
                      price="0 EUR"
                      features={[
                        "Pages de site web (25 pages)",
                        "Blog (1 blog)",
                        "Certificat SSL standard",
                        "Templates de base",
                        "Branding HubSpot affiche",
                      ]}
                      color="#22C55E"
                    />
                    <PricingCard
                      tier="Starter"
                      price="20 EUR/mois"
                      features={[
                        "Tout le Free +",
                        "Retrait du branding HubSpot",
                        "50 pages de site web",
                        "Theme premium",
                        "Reporting basique",
                        "1 domaine personnalise",
                      ]}
                      color="#4B5EFC"
                    />
                    <PricingCard
                      tier="Professional"
                      price="490 EUR/mois"
                      popular
                      features={[
                        "Tout le Starter +",
                        "Smart content (personnalisation)",
                        "A/B testing de pages",
                        "SEO avance (recommandations)",
                        "Reporting de trafic avance",
                        "Sous-domaines multiples",
                        "Blog avance (clustering de contenus)",
                        "Editeur drag-and-drop avance",
                        "Contenus generes par IA",
                        "Password-protected pages",
                      ]}
                      color="#FF7A59"
                    />
                    <PricingCard
                      tier="Enterprise"
                      price="1 470 EUR/mois"
                      features={[
                        "Tout le Pro +",
                        "Sites web multiples",
                        "Partitionnement de contenus",
                        "Applications web (serverless functions)",
                        "Environnement de staging",
                        "CDN personnalise",
                        "Reverse proxy",
                        "Memberships et gated content avances",
                        "Roles et permissions avances",
                      ]}
                      color="#111"
                    />
                  </div>

                  <div className="rounded-xl bg-[#111] p-4">
                    <p className="text-[12px] font-semibold text-white mb-2">Notre avis sur le CMS Hub</p>
                    <p className="text-[11px] text-white/60 leading-[1.7]">Le CMS Hub a un vrai avantage : l&apos;integration native avec le CRM HubSpot. Chaque visiteur de votre site est automatiquement lie a sa fiche contact. Le smart content permet de personnaliser les pages selon le profil du visiteur. C&apos;est puissant. Mais le prix du Pro (490 EUR/mois) est eleve compare a WordPress + un bon hebergeur (50-100 EUR/mois). Le CMS Hub se justifie quand vous utilisez deja HubSpot pour le marketing et les ventes, et que vous voulez centraliser l&apos;ensemble. Pour un site vitrine sans besoin de personnalisation, WordPress reste plus economique et plus flexible.</p>
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════════ */}
              {/* Section 7 : Operations Hub */}
              {/* ═══════════════════════════════════════════════ */}
              <section id="operations-hub" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Operations Hub : tarifs et fonctionnalites</h2>
                  </div>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">L&apos;Operations Hub est le hub le plus meconnu de HubSpot, mais c&apos;est celui qui fait la difference pour les entreprises ayant un ecosysteme d&apos;outils complexe. Il gere la synchronisation des donnees, la qualite des donnees et les automatisations programmables (code custom dans les workflows).</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <PricingCard
                      tier="Free"
                      price="0 EUR"
                      features={[
                        "Synchronisation des donnees (bidirectionnelle)",
                        "Mapping de champs par defaut",
                        "Synchronisation historique",
                        "Integrations marketplace",
                      ]}
                      color="#22C55E"
                    />
                    <PricingCard
                      tier="Starter"
                      price="20 EUR/mois"
                      features={[
                        "Tout le Free +",
                        "Mapping de champs personnalise",
                        "Filtrage des synchronisations",
                        "Listes additionnelles",
                      ]}
                      color="#4B5EFC"
                    />
                    <PricingCard
                      tier="Professional"
                      price="790 EUR/mois"
                      popular
                      features={[
                        "Tout le Starter +",
                        "Actions de workflow programmables (JavaScript)",
                        "Webhooks dans les workflows",
                        "Automatisation de la qualite des donnees",
                        "Formatage automatique des donnees",
                        "Deduplication assistee",
                        "Bots programmables",
                        "Datasets (ensembles de donnees calcules)",
                      ]}
                      color="#FF7A59"
                    />
                    <PricingCard
                      tier="Enterprise"
                      price="2 000 EUR/mois"
                      features={[
                        "Tout le Pro +",
                        "Datasets avances",
                        "Intelligence business avancee",
                        "Partage de donnees Snowflake",
                        "Objets personnalises avances",
                        "Sandbox",
                        "Permissions avancees",
                        "Journaux d&apos;audit avances",
                      ]}
                      color="#111"
                    />
                  </div>

                  <div className="rounded-xl bg-[#111] p-4">
                    <p className="text-[12px] font-semibold text-white mb-2">Notre avis sur l&apos;Operations Hub</p>
                    <p className="text-[11px] text-white/60 leading-[1.7]">L&apos;Operations Hub est un hub de niche mais redoutablement utile. Le Free est deja precieux pour la synchronisation bidirectionnelle avec vos autres outils. Le Pro est indispensable si vous avez besoin d&apos;executer du code custom dans vos workflows (appels API, transformations de donnees complexes). Le partage Snowflake en Enterprise est un game-changer pour les entreprises data-driven. Cependant, 790 EUR/mois pour le Pro est eleve si vous n&apos;utilisez que les actions programmables. Evaluez d&apos;abord si des outils tiers comme Make ou Zapier ne couvrent pas votre besoin a moindre cout.</p>
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════════ */}
              {/* Section 8 : Commerce Hub */}
              {/* ═══════════════════════════════════════════════ */}
              <section id="commerce-hub" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FF7A59]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Commerce Hub : tarifs et fonctionnalites</h2>
                  </div>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Le Commerce Hub est le dernier-ne de la gamme HubSpot, lance en 2023 et enrichi en 2024-2025. Il permet de gerer les paiements, les abonnements et la facturation directement dans HubSpot. Sa tarification est la plus simple de tous les hubs, avec seulement deux niveaux.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <PricingCard
                      tier="Free"
                      price="0 EUR"
                      features={[
                        "Liens de paiement (via Stripe)",
                        "Devis avec paiement integre",
                        "Gestion des produits",
                        "Commission Stripe standard",
                      ]}
                      color="#22C55E"
                    />
                    <PricingCard
                      tier="Starter"
                      price="20 EUR/mois"
                      features={[
                        "Tout le Free +",
                        "Facturation native HubSpot",
                        "Abonnements recurrents",
                        "Automatisation des factures",
                        "Tableaux de bord de revenus",
                        "Comptabilite simplifiee",
                      ]}
                      color="#4B5EFC"
                    />
                  </div>

                  <div className="rounded-xl bg-[#FFF7F5] border border-[#FFE0D6] p-4 mb-6">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Frais de transaction</p>
                    <div className="space-y-1.5 text-[11px] text-[#555]">
                      <p><strong className="text-[#111]">HubSpot Payments (US uniquement) :</strong> 2,9 % + 0,30 USD par transaction carte. 0,5 % par transaction ACH (plafond 10 USD).</p>
                      <p><strong className="text-[#111]">Stripe (via integration) :</strong> Frais Stripe standard (1,5 % + 0,25 EUR en Europe). HubSpot ne preleve pas de frais supplementaires sur les transactions Stripe.</p>
                      <p className="text-[#999] mt-2">En Europe, l&apos;integration Stripe est la seule option. HubSpot Payments n&apos;est pas encore disponible hors des Etats-Unis.</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#111] p-4">
                    <p className="text-[12px] font-semibold text-white mb-2">Notre avis sur le Commerce Hub</p>
                    <p className="text-[11px] text-white/60 leading-[1.7]">Le Commerce Hub est encore jeune. Pour les entreprises B2B qui font de la facturation recurrente (SaaS, abonnements), il est interessant d&apos;avoir les factures directement liees aux deals dans le CRM. Mais les fonctionnalites restent limitees comparees a des outils specialises comme Chargebee ou Stripe Billing. Notre recommandation : utilisez-le si vous avez des besoins de facturation simples et que vous etes deja sur HubSpot. Si la facturation et la gestion des abonnements sont au coeur de votre activite, un outil dedie sera plus adapte.</p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ═══════════════════════════════════════════════ */}
              {/* Section 9 : Bundles CRM Suite */}
              {/* ═══════════════════════════════════════════════ */}
              <section id="crm-suite" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#4B5EFC]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B5EFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Bundles CRM Suite : economisez en combinant les hubs</h2>
                  </div>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">HubSpot propose des bundles (CRM Suite) qui combinent plusieurs hubs a un prix reduit par rapport a l&apos;achat separe. C&apos;est souvent la meilleure option si vous avez besoin de deux hubs ou plus au meme palier.</p>

                  <div className="grid gap-4 mb-6">
                    {[
                      {
                        tier: "CRM Suite Starter",
                        price: "20 EUR/mois",
                        includes: "Marketing Hub Starter + Sales Hub Starter + Service Hub Starter + CMS Hub Starter + Operations Hub Starter + Commerce Hub Starter",
                        saving: "Economie : environ 80 % vs achat separe des 6 hubs Starter",
                        color: "#4B5EFC",
                      },
                      {
                        tier: "CRM Suite Professional",
                        price: "1 781 EUR/mois",
                        includes: "Marketing Hub Pro + Sales Hub Pro (1 siege) + Service Hub Pro (1 siege) + CMS Hub Pro + Operations Hub Pro + Commerce Hub Starter",
                        saving: "Economie : environ 25 % vs achat separe des hubs Pro",
                        color: "#FF7A59",
                      },
                      {
                        tier: "CRM Suite Enterprise",
                        price: "5 000 EUR/mois",
                        includes: "Marketing Hub Enterprise + Sales Hub Enterprise (10 sieges) + Service Hub Enterprise (10 sieges) + CMS Hub Enterprise + Operations Hub Enterprise + Commerce Hub Starter",
                        saving: "Economie : environ 30 % vs achat separe des hubs Enterprise",
                        color: "#111",
                      },
                    ].map((bundle, i) => (
                      <div key={i} className="rounded-xl border p-4" style={{ borderColor: bundle.color === "#111" ? "#333" : bundle.color + "40", background: bundle.color === "#111" ? "#111" : bundle.color + "05" }}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[13px] font-bold" style={{ color: bundle.color === "#111" ? "#FFF" : bundle.color }}>{bundle.tier}</p>
                          <p className="text-[16px] font-bold" style={{ color: bundle.color === "#111" ? "#FFF" : "#111" }}>{bundle.price}</p>
                        </div>
                        <p className="text-[11px] leading-[1.6] mb-2" style={{ color: bundle.color === "#111" ? "rgba(255,255,255,0.6)" : "#555" }}>{bundle.includes}</p>
                        <p className="text-[10px] font-medium" style={{ color: bundle.color === "#111" ? "#22C55E" : "#22C55E" }}>{bundle.saving}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Quand prendre un bundle vs des hubs separement ?</p>
                    <div className="space-y-2 text-[11px] text-[#555] leading-[1.6]">
                      <p><strong className="text-[#111]">Prenez le bundle si :</strong> vous avez besoin de 3 hubs ou plus au meme palier. L&apos;economie est significative, surtout en Starter ou le bundle a 20 EUR/mois inclut les 6 hubs.</p>
                      <p><strong className="text-[#111]">Achetez separement si :</strong> vous n&apos;avez besoin que de 1 ou 2 hubs, ou si vous avez besoin de paliers differents (ex : Sales Hub Pro + Marketing Hub Starter). Le bundle impose le meme palier pour tous les hubs.</p>
                      <p><strong className="text-[#111]">Astuce :</strong> Vous pouvez mixer un bundle CRM Suite Starter (20 EUR/mois pour les 6 hubs) + des upgrades individuelles. Par exemple, CRM Suite Starter + upgrade Sales Hub Pro. C&apos;est souvent la configuration la plus economique.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════════ */}
              {/* Section 10 : Couts caches */}
              {/* ═══════════════════════════════════════════════ */}
              <section id="couts-caches" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#EF4444]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Les couts caches de HubSpot (a lire avant de signer)</h2>
                  </div>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">La page pricing de HubSpot affiche des prix d&apos;appel attractifs. Mais plusieurs couts complementaires viennent alourdir la facture reelle. Les voici, classes par impact financier.</p>

                  <div className="space-y-3">
                    {[
                      {
                        title: "Frais d&apos;onboarding obligatoires",
                        desc: "HubSpot impose un onboarding payant pour les plans Pro et Enterprise. Marketing Hub Pro : 3 000 EUR. Marketing Hub Enterprise : 6 000 EUR. Sales Hub Pro : 500 EUR. Service Hub Pro : 500 EUR. CMS Hub Pro : pas d&apos;onboarding obligatoire. Operations Hub Pro : pas d&apos;onboarding obligatoire. Ces frais sont payes une seule fois et ne sont pas negociables directement aupres de HubSpot. En revanche, vous pouvez choisir de faire cet onboarding avec un partenaire HubSpot agree (comme Ceres) qui peut souvent offrir un accompagnement plus personnalise au meme prix, voire inclus dans une prestation plus large.",
                        color: "#EF4444",
                        icon: "M12 2v20M2 12h20",
                      },
                      {
                        title: "Contacts marketing supplementaires",
                        desc: "Comme detaille dans la section Marketing Hub, chaque tranche de contacts supplementaires est facturee. C&apos;est le poste de cout cache le plus frequent. Une entreprise avec 50 000 contacts marketing en Pro paie 890 EUR + environ 2 400 EUR de contacts supplementaires = 3 290 EUR/mois pour le Marketing Hub seul. Conseil : distinguez contacts marketing et contacts non-marketing. Seuls les contacts marketing sont factures. Un contact dans votre CRM a qui vous n&apos;envoyez pas d&apos;emails marketing est gratuit.",
                        color: "#FF7A59",
                        icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
                      },
                      {
                        title: "Limites API",
                        desc: "Les appels API HubSpot sont limites. En standard : 100 requetes par 10 secondes par cle privee, et 500 000 requetes par jour. Pour les applications OAuth : 100 requetes par 10 secondes par compte. Si vous avez beaucoup d&apos;integrations ou des synchronisations frequentes, ces limites peuvent devenir un goulot d&apos;etranglement. L&apos;add-on API est disponible a partir de 500 EUR/mois pour augmenter ces limites.",
                        color: "#6C5CE7",
                        icon: "M18 20V10M12 20V4M6 20v-6",
                      },
                      {
                        title: "Add-ons payants",
                        desc: "Plusieurs fonctionnalites utiles sont vendues en add-on : Reporting avance (200 EUR/mois), API supplement (500 EUR/mois), Ads supplement (contacts publicitaires additionnels), Dedicated IP pour l&apos;envoi d&apos;emails (500 EUR/mois), Transactional email add-on (a partir de 20 EUR/mois). Ces add-ons s&apos;ajoutent au prix des hubs et peuvent representer 20 a 40 % du budget supplementaire.",
                        color: "#4B5EFC",
                        icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
                      },
                      {
                        title: "Engagement annuel et preavis",
                        desc: "Les plans Pro et Enterprise sont vendus avec un engagement annuel. Il n&apos;y a pas d&apos;option mensuelle sans engagement pour ces paliers. Si vous voulez downgrade ou annuler, vous devez respecter un preavis de 45 jours avant la fin de votre periode contractuelle. Sinon, vous etes renouvele automatiquement pour un an. C&apos;est un piege classique : beaucoup d&apos;entreprises oublient cette echeance et se retrouvent engagees une annee supplementaire.",
                        color: "#22C55E",
                        icon: "M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
                      },
                      {
                        title: "Migration et nettoyage de donnees",
                        desc: "Si vous migrez depuis un autre CRM, prevoyez un budget de migration. HubSpot ne facture pas la migration en elle-meme, mais le travail de nettoyage, mapping et import de donnees necessite generalement un accompagnement. Comptez entre 2 000 et 15 000 EUR selon la complexite (nombre d&apos;objets, historique a migrer, integrations a reconfigurer).",
                        color: "#999",
                        icon: "M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9",
                      },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl border-l-2 bg-[#FAFAFA] p-4" style={{ borderColor: item.color }}>
                        <p className="text-[12px] font-semibold text-[#111] mb-2">{item.title}</p>
                        <p className="text-[11px] text-[#777] leading-[1.65]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════════ */}
              {/* Section 11 : Simulation de budget */}
              {/* ═══════════════════════════════════════════════ */}
              <section id="simulation" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#6C5CE7]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Simulation de budget : 3 scenarios concrets</h2>
                  </div>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-6">Pour passer de la grille tarifaire a un budget reel, voici trois simulations basees sur des profils d&apos;entreprises que l&apos;on accompagne regulierement.</p>

                  <div className="grid gap-4">
                    <SimulationCard
                      profile="Scenario 1 : Startup early-stage"
                      description="5 salaries, 2 commerciaux, 1 000 contacts, besoin CRM + email marketing"
                      hubs={[
                        { name: "CRM Suite Starter", tier: "Bundle", price: "20 EUR/mois" },
                        { name: "Onboarding", tier: "Non requis (Starter)", price: "0 EUR" },
                        { name: "Contacts supplementaires", tier: "Aucun", price: "0 EUR" },
                      ]}
                      monthly="20 EUR"
                      annual="240 EUR"
                      color="#22C55E"
                    />
                    <SimulationCard
                      profile="Scenario 2 : PME en croissance"
                      description="30 salaries, 8 commerciaux, 15 000 contacts marketing, besoin ventes + marketing + support"
                      hubs={[
                        { name: "Marketing Hub Pro", tier: "Professional", price: "890 EUR/mois" },
                        { name: "Contacts supplementaires", tier: "+13 000 contacts", price: "750 EUR/mois" },
                        { name: "Sales Hub Pro", tier: "8 sieges", price: "800 EUR/mois" },
                        { name: "Service Hub Starter", tier: "Starter", price: "20 EUR/mois" },
                        { name: "Onboarding Marketing Pro", tier: "One-time", price: "250 EUR/mois *" },
                        { name: "Onboarding Sales Pro", tier: "One-time", price: "42 EUR/mois *" },
                      ]}
                      monthly="2 752 EUR"
                      annual="33 024 EUR"
                      color="#FF7A59"
                    />
                    <SimulationCard
                      profile="Scenario 3 : ETI / Scale-up"
                      description="150 salaries, 25 commerciaux, 80 000 contacts marketing, besoin multi-hub avance"
                      hubs={[
                        { name: "Marketing Hub Enterprise", tier: "Enterprise", price: "3 600 EUR/mois" },
                        { name: "Contacts supplementaires", tier: "+70 000 contacts", price: "700 EUR/mois" },
                        { name: "Sales Hub Enterprise", tier: "25 sieges", price: "3 750 EUR/mois" },
                        { name: "Service Hub Pro", tier: "10 sieges", price: "1 000 EUR/mois" },
                        { name: "Operations Hub Pro", tier: "Professional", price: "790 EUR/mois" },
                        { name: "CMS Hub Pro", tier: "Professional", price: "490 EUR/mois" },
                        { name: "Onboarding (lisse sur 12 mois)", tier: "One-time", price: "583 EUR/mois *" },
                      ]}
                      monthly="10 913 EUR"
                      annual="130 956 EUR"
                      color="#6C5CE7"
                    />
                  </div>

                  <div className="mt-4 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[10px] text-[#999] leading-[1.6]">* Les frais d&apos;onboarding sont payes une seule fois. Nous les avons lisses sur 12 mois pour donner un cout mensualise equivalent. Les prix sont en facturation mensuelle. La facturation annuelle offre 10 a 25 % de remise selon les hubs. Simulation indicative basee sur les tarifs publics de mars 2026.</p>
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════════ */}
              {/* Section 12 : Astuces pour economiser */}
              {/* ═══════════════════════════════════════════════ */}
              <section id="economiser" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-[#111]">10 astuces pour reduire votre facture HubSpot</h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        tip: "1. Passez en facturation annuelle",
                        desc: "La remise est de 10 a 25 % selon les hubs. Sur un budget de 2 000 EUR/mois, cela represente 2 400 a 6 000 EUR d&apos;economie par an. C&apos;est le levier le plus simple et le plus immediat.",
                      },
                      {
                        tip: "2. Nettoyez vos contacts marketing regulierement",
                        desc: "Desabonnez les contacts inactifs (pas d&apos;ouverture email depuis 6 mois) et passez-les en contacts non-marketing. Chaque tranche de 5 000 contacts en moins sur le Marketing Hub Pro vous fait economiser 250 EUR/mois.",
                      },
                      {
                        tip: "3. Optimisez le nombre de sieges payants",
                        desc: "Seuls les utilisateurs qui ont besoin des fonctionnalites Pro/Enterprise doivent avoir un siege payant. Les managers qui consultent les rapports et les tableaux de bord peuvent souvent se contenter d&apos;un acces gratuit en lecture.",
                      },
                      {
                        tip: "4. Commencez Starter, montez Pro quand c&apos;est justifie",
                        desc: "Ne prenez pas le Pro par anticipation. Le Starter a 20 EUR/mois permet de valider l&apos;adoption de HubSpot par l&apos;equipe avant d&apos;investir dans le Pro. Trop d&apos;entreprises achetent le Pro au lancement et sous-utilisent les fonctionnalites.",
                      },
                      {
                        tip: "5. Utilisez le bundle CRM Suite Starter comme base",
                        desc: "A 20 EUR/mois pour les 6 hubs en Starter, c&apos;est une affaire. Combinez-le avec des upgrades individuelles (ex : Sales Hub Pro uniquement) plutot que d&apos;acheter le bundle Pro complet.",
                      },
                      {
                        tip: "6. Negociez a la signature et au renouvellement",
                        desc: "HubSpot negocie, surtout en fin de trimestre (mars, juin, septembre, decembre). Les remises peuvent aller de 10 a 30 % sur les plans Pro et Enterprise. Demandez toujours, le pire qui puisse arriver est un refus.",
                      },
                      {
                        tip: "7. Exploitez les programmes startups et nonprofits",
                        desc: "HubSpot for Startups offre jusqu&apos;a 90 % de remise la premiere annee (30 % la deuxieme, 15 % la troisieme) pour les startups eligibles. Le programme Nonprofits offre 40 % de remise permanente. Verifiez votre eligibilite avant d&apos;acheter.",
                      },
                      {
                        tip: "8. Faites l&apos;onboarding avec un partenaire",
                        desc: "L&apos;onboarding obligatoire peut etre realise par un partenaire HubSpot agree au lieu de l&apos;equipe interne HubSpot. Souvent, vous obtenez un accompagnement plus personnalise et adapte a votre contexte, parfois au meme prix ou inclus dans une prestation plus large.",
                      },
                      {
                        tip: "9. Evaluez les alternatives pour chaque hub",
                        desc: "Vous n&apos;etes pas oblige de tout prendre chez HubSpot. Utilisez HubSpot pour le CRM et les ventes, mais gardez Mailchimp pour l&apos;email marketing si votre besoin est simple. Gardez WordPress pour le site web si vous n&apos;avez pas besoin du smart content.",
                      },
                      {
                        tip: "10. Planifiez votre croissance tarifaire",
                        desc: "Projetez votre budget HubSpot sur 3 ans en incluant la croissance des contacts, des utilisateurs et des besoins fonctionnels. Une planification en amont evite les mauvaises surprises au renouvellement.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 rounded-xl bg-[#FAFAFA] p-4">
                        <div className="w-6 h-6 rounded-full bg-[#22C55E]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-[#22C55E]">{i + 1}</span>
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-[#111] mb-1">{item.tip}</p>
                          <p className="text-[11px] text-[#777] leading-[1.65]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ═══════════════════════════════════════════════ */}
              {/* Section 13 : Notre avis global */}
              {/* ═══════════════════════════════════════════════ */}
              <section id="notre-avis" className="mb-8">
                <div className="rounded-2xl border border-[#4B5EFC] bg-gradient-to-br from-[#F8F9FF] to-[#EEF0FF] p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(75,94,252,0.15)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Notre avis global sur les tarifs HubSpot en 2026</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Apres avoir deploye HubSpot chez des dizaines d&apos;entreprises de toutes tailles, voici notre position sur la tarification de la plateforme en 2026.</p>

                    <p><strong className="text-[#111]">HubSpot est cher, mais pas tant que ca.</strong> Le reflexe naturel est de comparer le prix affiche de HubSpot a celui d&apos;alternatives comme Pipedrive (15 EUR/mois/utilisateur) ou Zoho CRM (20 EUR/mois/utilisateur). Mais cette comparaison est trompeuse. HubSpot est une plateforme, pas un outil. Quand vous achetez le Sales Hub Pro + le Marketing Hub Pro, vous remplacez potentiellement un CRM + un outil de marketing automation + un outil d&apos;email marketing + un outil de live chat + un outil de gestion de contenu. Le cout total de possession (TCO) est souvent comparable, voire inferieur, a celui d&apos;un stack d&apos;outils separes.</p>

                    <p><strong className="text-[#111]">Le Free et le Starter sont d&apos;excellentes portes d&apos;entree.</strong> Le CRM gratuit de HubSpot est le meilleur du marche. Le bundle Starter a 20 EUR/mois pour 6 hubs est imbattable. C&apos;est la strategie de HubSpot : vous faire entrer a bas cout puis vous faire monter en palier quand les besoins grandissent.</p>

                    <p><strong className="text-[#111]">Le saut Starter vers Pro est le point de friction.</strong> Le passage de 20 EUR a 890 EUR (Marketing Hub) ou de 20 EUR a 100 EUR/siege (Sales Hub) est brutal. Il n&apos;y a pas de palier intermediaire. C&apos;est la principale critique que l&apos;on adresse a HubSpot depuis des annees. Pour les entreprises entre 10 et 30 salaries, ce gap est souvent le moment ou la decision se complique.</p>

                    <p><strong className="text-[#111]">L&apos;Enterprise n&apos;est rentable qu&apos;a partir d&apos;une certaine taille.</strong> Les fonctionnalites Enterprise (objets personnalises, SSO, sandbox, partitionnement) sont puissantes mais leur cout ne se justifie que pour des equipes de 20+ utilisateurs et des processus complexes. En dessous, le Pro suffit largement.</p>

                    <div className="mt-4 p-4 rounded-xl bg-white border border-[#E0E4FF]">
                      <p className="text-[12px] font-semibold text-[#111] mb-2">Notre recommandation par taille d&apos;entreprise</p>
                      <div className="space-y-2">
                        {[
                          { size: "1-5 salaries", reco: "CRM Suite Starter (20 EUR/mois). Suffisant pour demarrer et valider l&apos;outil.", color: "#22C55E" },
                          { size: "5-15 salaries", reco: "CRM Suite Starter + Sales Hub Pro pour les commerciaux actifs. Budget : 120-520 EUR/mois.", color: "#4B5EFC" },
                          { size: "15-50 salaries", reco: "Sales Hub Pro + Marketing Hub Pro. Le sweet spot de HubSpot. Budget : 1 500-3 500 EUR/mois.", color: "#FF7A59" },
                          { size: "50-200 salaries", reco: "CRM Suite Pro ou mix Pro/Enterprise selon les besoins. Budget : 3 000-8 000 EUR/mois.", color: "#6C5CE7" },
                          { size: "200+ salaries", reco: "CRM Suite Enterprise. A ce stade, HubSpot concurrence Salesforce. Budget : 8 000-20 000 EUR/mois.", color: "#111" },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: item.color }} />
                            <p className="text-[11px] text-[#555] leading-[1.6]"><strong className="text-[#111]">{item.size} :</strong> {item.reco}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="mt-4">Le plus important : ne choisissez pas votre palier HubSpot en fonction de ce que vous pensez avoir besoin dans 2 ans. Choisissez en fonction de vos besoins actuels et montez en palier quand la valeur ajoutee est demontree. HubSpot est concu pour evoluer avec votre entreprise. Profitez de cette flexibilite au lieu de surinvestir des le depart.</p>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <div className="mb-12 rounded-2xl bg-[#111] p-6 md:p-8 text-center">
                <h3 className="text-[17px] font-semibold text-white mb-3">Besoin d&apos;aide pour choisir le bon plan HubSpot ?</h3>
                <p className="text-[13px] text-[#999] leading-[1.7] mb-5 max-w-[500px] mx-auto">En tant que partenaire HubSpot, on accompagne les entreprises dans le choix du bon palier, la negociation tarifaire et l&apos;implementation. Un audit gratuit de 30 minutes pour identifier la configuration optimale selon votre situation et votre budget.</p>
                <Link href="https://calendly.com/ceres-revops/30min" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4B5EFC] text-white rounded-lg text-[13px] font-medium hover:bg-[#3A4DE0] transition-colors">
                  Prendre rendez-vous
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </Link>
              </div>

              {/* Related articles */}
              <div>
                <h3 className="text-[14px] font-semibold text-[#111] mb-4">Articles complementaires</h3>
                <div className="grid gap-3">
                  {relatedArticles.map((a) => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="group flex items-center gap-4 rounded-xl border border-[#F2F2F2] p-4 hover:border-[#DDD] transition-colors">
                      <div className="w-1 h-10 rounded-full" style={{ background: a.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-medium mb-1" style={{ color: a.color }}>{a.category}</p>
                        <p className="text-[12px] font-medium text-[#111] group-hover:text-[#4B5EFC] transition-colors leading-[1.4]">{a.title}</p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}