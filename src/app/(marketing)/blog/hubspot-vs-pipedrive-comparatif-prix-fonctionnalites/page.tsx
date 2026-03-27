"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "HubSpot vs Pipedrive : comparatif complet prix et fonctionnalites 2026",
  description: "Comparaison detaillee HubSpot vs Pipedrive : prix de chaque plan, fonctionnalites CRM, marketing, automatisation, reporting, integrations, UX et scalabilite. Guide complet pour choisir le bon CRM selon votre profil.",
  author: { "@type": "Person", name: "Guillaume Delachet" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  datePublished: "2026-02-08",
  dateModified: "2026-02-08",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/hubspot-vs-pipedrive-comparatif-prix-fonctionnalites" },
  articleSection: "CRM & HubSpot",
  wordCount: 2800,
  inLanguage: "fr",
};

const sections = [
  { id: "philosophies", title: "Deux CRM, deux philosophies" },
  { id: "prix", title: "Comparaison des prix" },
  { id: "fonctionnalites-crm", title: "Fonctionnalites CRM" },
  { id: "marketing", title: "Marketing et inbound" },
  { id: "automatisation", title: "Automatisation et workflows" },
  { id: "reporting", title: "Reporting et analytics" },
  { id: "integrations", title: "Integrations et ecosysteme" },
  { id: "ux", title: "UX et prise en main" },
  { id: "scalabilite", title: "Scalabilite" },
  { id: "tableau-comparatif", title: "Tableau comparatif global" },
  { id: "verdict", title: "Notre verdict" },
];

const relatedArticles = [
  { title: "9 actions commerciales que vous devriez automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "Automatisation", color: "#FF7A59" },
  { title: "Marketing automation : 7 workflows HubSpot indispensables", slug: "marketing-automation-7-workflows-hubspot", category: "Automatisation", color: "#FF7A59" },
  { title: "Meilleures pratiques pour vos sequences HubSpot", slug: "meilleures-pratiques-sequences-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function HubSpotVsPipedriveArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("philosophies");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "6%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "20%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "40%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "55%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "72%", width: 260, height: 260, borderRadius: "50%", background: "#FF7A59", opacity: 0.09, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "88%", width: 240, height: 240, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet?text=HubSpot%20vs%20Pipedrive%20comparatif%20complet&url=https://www.ceres-revops.com/blog/hubspot-vs-pipedrive-comparatif-prix-fonctionnalites" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/hubspot-vs-pipedrive-comparatif-prix-fonctionnalites" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">HubSpot vs Pipedrive</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">15 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                HubSpot vs Pipedrive : comparatif complet prix et fonctionnalites
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Deux CRM dominent le marche des PME et scale-ups en 2026 : HubSpot et Pipedrive. L&apos;un se positionne comme une plateforme all-in-one couvrant ventes, marketing et service client. L&apos;autre mise sur la simplicite et l&apos;efficacite commerciale pure. On a utilise les deux en production chez nos clients. Voici notre comparatif detaille : prix reels, fonctionnalites, limites, et surtout, quel CRM choisir selon votre profil.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>8 fevrier 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 : Deux CRM, deux philosophies */}
              <section id="philosophies" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-5 h-5" />
                    <img src="https://www.google.com/s2/favicons?domain=pipedrive.com&sz=32" alt="Pipedrive" className="w-5 h-5" />
                    <h2 className="text-[17px] font-semibold text-[#111]">Deux CRM, deux philosophies</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>HubSpot et Pipedrive partent de deux visions fondamentalement differentes du CRM. Comprendre cette difference est essentiel avant de comparer les fonctionnalites et les prix, car elle explique pourquoi chaque outil excelle dans des contextes differents.</p>
                    <p><strong className="text-[#111]">HubSpot</strong> est ne en 2006 comme un outil de marketing inbound. L&apos;idee fondatrice : attirer les prospects via du contenu plutot que de les interrompre par de la prospection froide. Le CRM est arrive en 2014, comme une extension logique de la plateforme marketing. Aujourd&apos;hui, HubSpot est une plateforme complete qui couvre le marketing, les ventes, le service client, le CMS et les operations. C&apos;est un ecosysteme ferme ou chaque brique communique nativement avec les autres.</p>
                    <p><strong className="text-[#111]">Pipedrive</strong> a ete cree en 2010 par des commerciaux, pour des commerciaux. L&apos;outil est parti d&apos;un constat simple : les CRM existants etaient trop complexes et personne ne les remplissait. Pipedrive a donc ete construit autour du pipeline visuel, avec une obsession pour la simplicite et l&apos;adoption par les equipes de vente. Chaque fonctionnalite est pensee pour reduire le temps administratif des commerciaux.</p>
                    <p>Cette difference d&apos;ADN se retrouve partout : HubSpot pense en &ldquo;plateforme&rdquo; et cherche a centraliser l&apos;ensemble du parcours client. Pipedrive pense en &ldquo;outil de productivite commerciale&rdquo; et cherche a maximiser l&apos;efficacite des equipes de vente. Ni l&apos;un ni l&apos;autre n&apos;a tort, mais le bon choix depend de ce que vous cherchez reellement a accomplir.</p>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">HubSpot</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#FF7A59]/10 text-[#FF7A59]">Plateforme all-in-one</span>
                      </div>
                      <ul className="space-y-1.5">
                        {["CRM + Marketing + Sales + Service", "Inbound-first, contenu et SEO natifs", "Marketplace de 1 500+ integrations", "Gratuit genereux, payant premium", "Cible : PME a enterprise"].map((i) => (
                          <li key={i} className="text-[11px] text-[#777] leading-[1.5] flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />{i}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=pipedrive.com&sz=32" alt="Pipedrive" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Pipedrive</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#22C55E]/10 text-[#22C55E]">Sales-first</span>
                      </div>
                      <ul className="space-y-1.5">
                        {["CRM 100% oriente ventes", "Pipeline visuel, UX intuitive", "400+ integrations via Marketplace", "Tarifs accessibles, a la carte", "Cible : TPE a PME commerciales"].map((i) => (
                          <li key={i} className="text-[11px] text-[#777] leading-[1.5] flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#22C55E] mt-1.5 shrink-0" />{i}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 : Comparaison des prix */}
              <section id="prix" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Comparaison des prix : le vrai cout de chaque CRM</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Le pricing est souvent le premier critere de choix, et c&apos;est aussi la ou les surprises sont les plus frequentes. Les deux outils affichent des prix attractifs en entree de gamme, mais le cout reel depend du nombre d&apos;utilisateurs, des modules actifs et des add-ons.</p>
                    <p>Voici les grilles tarifaires actualisees en 2026, par utilisateur et par mois (facturation annuelle).</p>
                  </div>

                  {/* HubSpot pricing */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-4 h-4" />
                      <span className="text-[13px] font-semibold text-[#111]">HubSpot Sales Hub</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { plan: "Free", price: "0 eur", users: "Illimite", features: "CRM basique, pipeline, contacts, formulaires, email tracking (limites)" },
                        { plan: "Starter", price: "20 eur", users: "Par utilisateur", features: "Tout Free + objectifs, devises multiples, automatisation simple, support chat" },
                        { plan: "Pro", price: "100 eur", users: "Par utilisateur", features: "Tout Starter + sequences, workflows, reporting custom, playbooks, forecasting" },
                        { plan: "Enterprise", price: "150 eur", users: "Par utilisateur", features: "Tout Pro + objets custom, predictive lead scoring, hierarchie d&apos;equipes, sandboxes" },
                      ].map((t) => (
                        <div key={t.plan} className="rounded-xl border border-[#F2F2F2] p-3">
                          <p className="text-[10px] text-[#FF7A59] font-semibold uppercase mb-1">{t.plan}</p>
                          <p className="text-[18px] font-bold text-[#111] mb-0.5">{t.price}</p>
                          <p className="text-[9px] text-[#999] mb-2">{t.users}/mois</p>
                          <p className="text-[10px] text-[#888] leading-[1.5]">{t.features}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pipedrive pricing */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <img src="https://www.google.com/s2/favicons?domain=pipedrive.com&sz=32" alt="Pipedrive" className="w-4 h-4" />
                      <span className="text-[13px] font-semibold text-[#111]">Pipedrive</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { plan: "Essential", price: "14 eur", users: "Par utilisateur", features: "Pipeline visuel, gestion contacts, calendrier, import/export" },
                        { plan: "Advanced", price: "34 eur", users: "Par utilisateur", features: "Tout Essential + email sync, templates, automatisation, planification reunions" },
                        { plan: "Professional", price: "49 eur", users: "Par utilisateur", features: "Tout Advanced + e-signatures, revenue forecasting, gestion equipes, rapports avances" },
                        { plan: "Power", price: "64 eur", users: "Par utilisateur", features: "Tout Pro + support telephonique, controle permissions, CRM projet, scalabilite" },
                        { plan: "Enterprise", price: "99 eur", users: "Par utilisateur", features: "Tout Power + securite avancee, reporting illimite, support premium, implementation" },
                      ].map((t) => (
                        <div key={t.plan} className="rounded-xl border border-[#F2F2F2] p-3">
                          <p className="text-[10px] text-[#22C55E] font-semibold uppercase mb-1">{t.plan}</p>
                          <p className="text-[18px] font-bold text-[#111] mb-0.5">{t.price}</p>
                          <p className="text-[9px] text-[#999] mb-2">{t.users}/mois</p>
                          <p className="text-[10px] text-[#888] leading-[1.5]">{t.features}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Couts caches */}
                  <div className="rounded-2xl bg-[#111] p-5 md:p-6">
                    <h3 className="text-[14px] font-semibold text-white mb-3">Les couts caches a anticiper</h3>
                    <div className="space-y-3 text-[12px] text-white/60 leading-[1.7]">
                      <p>Le prix affiche ne raconte qu&apos;une partie de l&apos;histoire. Voici les couts supplementaires que l&apos;on constate systematiquement chez nos clients :</p>
                    </div>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 p-3">
                        <p className="text-[11px] font-semibold text-[#FF7A59] mb-2">HubSpot : couts supplementaires</p>
                        {["Onboarding obligatoire Pro : 500 eur", "Onboarding obligatoire Enterprise : 3 000 eur", "Contacts marketing (au-dela de 1 000) : 50 eur/1 000", "API calls limites sur les plans bas", "Add-ons : Reporting (200 eur/mois), Ads (revenu > 10K)"].map((i) => (
                          <p key={i} className="text-[10px] text-white/50 mb-1.5 flex items-start gap-2"><span className="text-[#FF7A59] mt-0.5 shrink-0">+</span>{i}</p>
                        ))}
                      </div>
                      <div className="rounded-xl border border-white/10 p-3">
                        <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Pipedrive : couts supplementaires</p>
                        {["LeadBooster add-on : 32,50 eur/mois", "Web Visitors add-on : 41 eur/mois", "Campaigns (emailing) : 13,33 eur/mois", "Smart Docs : 32,50 eur/mois", "Projects : 6,70 eur/mois"].map((i) => (
                          <p key={i} className="text-[10px] text-white/50 mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Cout total simule */}
                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Simulation : cout total pour une equipe de 10 commerciaux</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        {[
                          { label: "HubSpot Sales Hub Pro", value: "1 000 eur/mois" },
                          { label: "+ Marketing Hub Starter", value: "20 eur/mois" },
                          { label: "+ 5 000 contacts marketing", value: "250 eur/mois" },
                          { label: "+ Onboarding (amorti 12 mois)", value: "42 eur/mois" },
                          { label: "Total HubSpot", value: "~1 312 eur/mois" },
                        ].map((r) => (
                          <div key={r.label} className="flex justify-between">
                            <span className="text-[10px] text-[#999]">{r.label}</span>
                            <span className={`text-[10px] font-medium ${r.label.includes("Total") ? "text-[#FF7A59]" : "text-[#111]"}`}>{r.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1.5">
                        {[
                          { label: "Pipedrive Professional", value: "490 eur/mois" },
                          { label: "+ LeadBooster", value: "32,50 eur/mois" },
                          { label: "+ Campaigns", value: "13,33 eur/mois" },
                          { label: "+ Web Visitors", value: "41 eur/mois" },
                          { label: "Total Pipedrive", value: "~577 eur/mois" },
                        ].map((r) => (
                          <div key={r.label} className="flex justify-between">
                            <span className="text-[10px] text-[#999]">{r.label}</span>
                            <span className={`text-[10px] font-medium ${r.label.includes("Total") ? "text-[#22C55E]" : "text-[#111]"}`}>{r.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-[#888] leading-[1.6] mt-3">A fonctionnalites comparables pour une equipe de vente, Pipedrive revient environ 2 a 2,5 fois moins cher que HubSpot. Mais cette comparaison n&apos;a de sens que si vous n&apos;avez pas besoin des briques marketing et service client de HubSpot, qui n&apos;ont pas d&apos;equivalent chez Pipedrive.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 : Fonctionnalites CRM */}
              <section id="fonctionnalites-crm" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Fonctionnalites CRM : pipeline, contacts, deals, reporting</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Sur le coeur de metier CRM, les deux outils sont matures et couvrent l&apos;essentiel. Mais les differences apparaissent dans les details et dans la profondeur fonctionnelle.</p>
                    <p><strong className="text-[#111]">Gestion du pipeline.</strong> Pipedrive a popularise le pipeline visuel en drag-and-drop, et il reste aujourd&apos;hui l&apos;une des meilleures implementations du marche. La vue Kanban est fluide, les deals se deplacent naturellement d&apos;une etape a l&apos;autre, et les indicateurs de &ldquo;sante&rdquo; du deal (probabilite, date de cloture estimee, temps dans l&apos;etape) sont visibles d&apos;un coup d&apos;oeil. HubSpot propose un pipeline similaire, mais l&apos;interface est legerement plus lourde et les temps de chargement plus longs sur les gros volumes. En revanche, HubSpot permet de creer jusqu&apos;a 50 pipelines distincts sur le plan Pro, contre un seul pipeline sur le plan Essential de Pipedrive.</p>
                    <p><strong className="text-[#111]">Gestion des contacts.</strong> HubSpot a un avantage structurel ici. Sa fiche contact est probablement la plus complete du marche : timeline d&apos;activite, emails, appels, reunions, pages visitees, formulaires remplis, tickets de support. Le tout unifie dans une seule vue. Pipedrive propose une fiche contact fonctionnelle mais moins riche. L&apos;historique d&apos;interactions est limite aux activites commerciales : pas de donnees marketing, pas de tracking web, pas de vision service client.</p>
                    <p><strong className="text-[#111]">Deals et opportunites.</strong> Les deux outils gerent les deals de facon similaire : champs personnalises, associations multi-contacts, historique des modifications, pipeline progression. Pipedrive ajoute une fonctionnalite interessante avec ses &ldquo;deal rotting indicators&rdquo; qui alertent quand un deal stagne trop longtemps dans une etape. HubSpot compense avec le deal scoring predictif (Enterprise) et les playbooks qui guident les commerciaux etape par etape.</p>
                    <p><strong className="text-[#111]">Activites et taches.</strong> Pipedrive excelle sur la gestion des activites. L&apos;outil est construit autour du concept d&apos;&ldquo;activity-based selling&rdquo; : chaque deal doit toujours avoir une prochaine activite planifiee, et l&apos;interface rappelle constamment aux commerciaux quand ils ont des taches en retard. HubSpot propose un systeme de taches equivalent mais moins central dans l&apos;experience utilisateur.</p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: "Pipelines multiples", hubspot: "Jusqu&apos;a 50 (Pro)", pipedrive: "1 (Essential) a illimite (Pro+)" },
                      { label: "Champs personnalises", hubspot: "Illimites", pipedrive: "Illimites" },
                      { label: "Timeline contact", hubspot: "Complete (ventes + marketing + support)", pipedrive: "Activites commerciales uniquement" },
                      { label: "Deal scoring", hubspot: "Predictif IA (Enterprise)", pipedrive: "Manuel uniquement" },
                      { label: "Objets custom", hubspot: "Oui (Enterprise uniquement)", pipedrive: "Non" },
                      { label: "Deal rotting alerts", hubspot: "Non natif", pipedrive: "Oui, natif" },
                    ].map((r) => (
                      <div key={r.label} className="rounded-xl border border-[#F2F2F2] p-3">
                        <p className="text-[11px] font-semibold text-[#111] mb-2">{r.label}</p>
                        <div className="space-y-1">
                          <div className="flex items-start gap-2">
                            <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-3 h-3 mt-0.5" />
                            <span className="text-[10px] text-[#777]" dangerouslySetInnerHTML={{ __html: r.hubspot }} />
                          </div>
                          <div className="flex items-start gap-2">
                            <img src="https://www.google.com/s2/favicons?domain=pipedrive.com&sz=32" alt="Pipedrive" className="w-3 h-3 mt-0.5" />
                            <span className="text-[10px] text-[#777]" dangerouslySetInnerHTML={{ __html: r.pipedrive }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 : Marketing et inbound */}
              <section id="marketing" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Marketing et inbound : l&apos;avantage decisif de HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>C&apos;est probablement le point ou l&apos;ecart est le plus large entre les deux CRM. HubSpot a ete concu des le depart pour l&apos;inbound marketing, et cela se voit. Pipedrive est un CRM de vente qui a ajoute des briques marketing en option, sans jamais pretendre rivaliser sur ce terrain.</p>
                    <p><strong className="text-[#111]">HubSpot Marketing Hub</strong> est une suite marketing complete : landing pages, blog, SEO, email marketing, formulaires, CTAs, workflows de nurturing, lead scoring, attribution multi-touch, A/B testing, gestion des publicites (Google, Facebook, LinkedIn), social media management. Tout est integre nativement dans le CRM. Quand un prospect remplit un formulaire, visite une page de prix, ouvre un email de nurturing puis revient sur le site, toutes ces interactions sont tracees dans la timeline du contact. Le commercial voit exactement le parcours du prospect avant de le contacter.</p>
                    <p><strong className="text-[#111]">Pipedrive Campaigns</strong> est un add-on d&apos;emailing basique. Il permet d&apos;envoyer des newsletters et des emails de masse avec un editeur drag-and-drop, de segmenter les contacts et de suivre les ouvertures et clics. Mais il n&apos;y a pas de landing pages, pas de blog, pas de SEO, pas de lead scoring marketing, pas d&apos;attribution. Pour toute strategie inbound serieuse, Pipedrive doit etre combine avec des outils tiers : Mailchimp, ActiveCampaign, Brevo, ou un CMS externe.</p>
                    <p>En resume : si votre strategie d&apos;acquisition repose sur le contenu, le SEO et le nurturing, HubSpot est le choix evident. Si vous faites uniquement de la prospection outbound et que le marketing n&apos;est pas une priorite, Pipedrive suffit et vous evite de payer pour des fonctionnalites que vous n&apos;utiliserez pas.</p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#FFF5F0] p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-4 h-4" />
                        <p className="text-[11px] font-semibold text-[#FF7A59]">HubSpot Marketing</p>
                      </div>
                      {["Landing pages et blog integres", "SEO et content strategy", "Email marketing avance", "Lead scoring et nurturing", "Attribution multi-touch", "A/B testing natif", "Gestion des publicites", "Social media management"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#FF7A59] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#F5F5F5] p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=pipedrive.com&sz=32" alt="Pipedrive" className="w-4 h-4" />
                        <p className="text-[11px] font-semibold text-[#999]">Pipedrive Campaigns</p>
                      </div>
                      {["Emailing basique (add-on)", "Templates drag-and-drop", "Segmentation contacts", "Tracking ouvertures et clics", "Pas de landing pages", "Pas de blog ou CMS", "Pas de lead scoring marketing", "Pas d&apos;attribution"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#999] mt-0.5 shrink-0">{i.startsWith("Pas") ? "-" : "+"}</span>{i}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 : Automatisation et workflows */}
              <section id="automatisation" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Automatisation et workflows</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;automatisation est devenue un critere de choix majeur en 2026. Les equipes de vente veulent eliminer les taches repetitives : envoyer un email de suivi apres une reunion, mettre a jour un champ quand un deal change d&apos;etape, assigner un lead au bon commercial, creer une tache de relance automatiquement. Les deux CRM proposent de l&apos;automatisation, mais avec des niveaux de sophistication tres differents.</p>
                    <p><strong className="text-[#111]">HubSpot Workflows</strong> (a partir du plan Pro) est l&apos;un des moteurs d&apos;automatisation les plus puissants du marche CRM. Il permet de creer des workflows multi-branches bases sur n&apos;importe quelle propriete de contact, deal, entreprise ou ticket. On peut combiner des conditions if/then, des delais, des actions sur plusieurs objets, des notifications internes, des rotations de leads, des mises a jour de proprietes, des inscriptions dans des sequences. Les workflows peuvent etre declenches par des soumissions de formulaires, des actions sur le site web, des changements de proprietes ou des evenements temporels. On peut meme integrer des webhooks et du code custom (operations hub).</p>
                    <p><strong className="text-[#111]">Pipedrive Automations</strong> (a partir du plan Advanced) propose un editeur visuel d&apos;automatisations plus simple mais fonctionnel. Le principe : un declencheur, des conditions, une ou plusieurs actions. Les declencheurs couvrent les evenements courants : deal cree, deal deplace, activite completee, personne ajoutee. Les actions incluent : envoyer un email, creer une activite, mettre a jour un champ, deplacer un deal, envoyer un webhook. C&apos;est suffisant pour automatiser 80% des taches repetitives d&apos;une equipe commerciale, mais on atteint vite les limites pour des scenarios complexes multi-objets ou multi-branches.</p>
                    <p>Concretement, chez nos clients, on automatise environ 15 a 20 workflows dans HubSpot pour une equipe de vente structuree. Dans Pipedrive, on en met rarement plus de 8 a 10 en place, non pas par choix, mais parce que l&apos;outil ne permet pas certains scenarios avances (rotation de leads ponderee, workflows cross-objets, branch logic complexe).</p>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#F2F2F2] p-4">
                    <p className="text-[11px] font-semibold text-[#111] mb-3">Exemples d&apos;automatisations possibles</p>
                    <div className="space-y-2">
                      {[
                        { action: "Email de suivi apres reunion", hubspot: true, pipedrive: true },
                        { action: "Rotation de leads ponderee par territoire", hubspot: true, pipedrive: false },
                        { action: "Mise a jour champ quand deal change d&apos;etape", hubspot: true, pipedrive: true },
                        { action: "Workflow multi-branches if/then/else", hubspot: true, pipedrive: false },
                        { action: "Inscription automatique dans une sequence email", hubspot: true, pipedrive: false },
                        { action: "Notification Slack quand un deal depasse 10K", hubspot: true, pipedrive: true },
                        { action: "Lead scoring automatise", hubspot: true, pipedrive: false },
                        { action: "Creation de tache de relance automatique", hubspot: true, pipedrive: true },
                      ].map((r) => (
                        <div key={r.action} className="flex items-center justify-between py-1 border-b border-[#F5F5F5] last:border-0">
                          <span className="text-[10px] text-[#777] flex-1" dangerouslySetInnerHTML={{ __html: r.action }} />
                          <div className="flex items-center gap-4">
                            <span className={`text-[10px] font-medium ${r.hubspot ? "text-[#22C55E]" : "text-[#EF4444]"}`}>{r.hubspot ? "Oui" : "Non"}</span>
                            <span className={`text-[10px] font-medium ${r.pipedrive ? "text-[#22C55E]" : "text-[#EF4444]"}`}>{r.pipedrive ? "Oui" : "Non"}</span>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-[#999]" />
                        <div className="flex items-center gap-4">
                          <span className="text-[9px] text-[#999]">HubSpot</span>
                          <span className="text-[9px] text-[#999]">Pipedrive</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 : Reporting et analytics */}
              <section id="reporting" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Reporting et analytics</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le reporting est un autre domaine ou les deux CRM se distinguent nettement. La question n&apos;est pas seulement &ldquo;quels rapports puis-je generer ?&rdquo; mais aussi &ldquo;quelle profondeur d&apos;analyse puis-je atteindre sans exporter mes donnees dans un outil tiers ?&rdquo;</p>
                    <p><strong className="text-[#111]">HubSpot</strong> propose un module de reporting tres complet a partir du plan Pro. On peut creer des dashboards custom avec des rapports croisant les donnees de tous les Hubs : deals, contacts, entreprises, tickets, emails marketing, pages web, formulaires. Le report builder permet de construire des rapports multi-objets avec des filtres, des groupements et des visualisations variees (barres, lignes, camemberts, tableaux, funnels). L&apos;attribution revenue (quel canal marketing a genere quel revenu) est disponible sur le plan Pro Marketing et c&apos;est l&apos;un des rapports les plus precieux pour les equipes qui font de l&apos;inbound. Sur Enterprise, on accede au &ldquo;custom report builder&rdquo; encore plus avance, avec des jointures entre objets custom.</p>
                    <p><strong className="text-[#111]">Pipedrive</strong> propose des rapports de vente solides mais plus basiques. Les rapports pre-configures couvrent l&apos;essentiel : pipeline par etape, deals won/lost par periode, performance par commercial, temps moyen de closing, activites completees. Le module &ldquo;Insights&rdquo; permet de creer des rapports custom et des dashboards, mais les possibilites de croisement de donnees sont limitees par rapport a HubSpot. Il n&apos;y a pas de rapport multi-objets, pas d&apos;attribution marketing, et les visualisations sont moins variees.</p>
                    <p>En pratique, les directeurs commerciaux qui ont besoin de rapports de pipeline, de performance individuelle et de forecasting trouvent leur compte dans Pipedrive. Les VP Sales et les CMO qui veulent une vue unifiee du funnel complet (du premier contact marketing au revenu signe) ont besoin de HubSpot ou d&apos;un outil BI tiers branche sur Pipedrive.</p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#F2F2F2] p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Reporting HubSpot</span>
                      </div>
                      <div className="space-y-1.5">
                        {[
                          { label: "Dashboards custom", value: "Illimites (Pro+)" },
                          { label: "Rapports multi-objets", value: "Oui" },
                          { label: "Attribution revenue", value: "Oui (Marketing Pro)" },
                          { label: "Forecasting", value: "Oui (Sales Pro)" },
                          { label: "Custom report builder", value: "Oui (Enterprise)" },
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
                        <img src="https://www.google.com/s2/favicons?domain=pipedrive.com&sz=32" alt="Pipedrive" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Reporting Pipedrive</span>
                      </div>
                      <div className="space-y-1.5">
                        {[
                          { label: "Dashboards custom", value: "Oui (Insights)" },
                          { label: "Rapports multi-objets", value: "Non" },
                          { label: "Attribution revenue", value: "Non" },
                          { label: "Forecasting", value: "Oui (Professional+)" },
                          { label: "Rapports pre-configures", value: "30+ rapports vente" },
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

              {/* Section 7 : Integrations et ecosysteme */}
              <section id="integrations" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Integrations et ecosysteme</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un CRM ne fonctionne jamais seul. Il doit se connecter a votre stack existante : outils de prospection, emailing, facturation, support, productivite. La richesse de l&apos;ecosysteme d&apos;integrations est un critere determinant, surtout quand l&apos;equipe grandit et que les besoins se complexifient.</p>
                    <p><strong className="text-[#111]">HubSpot</strong> dispose du plus grand ecosysteme d&apos;integrations parmi les CRM mid-market, avec plus de 1 500 applications dans sa Marketplace. Les integrations natives sont souvent profondes : synchronisation bidirectionnelle, mapping de champs, declencheurs de workflows. Les outils les plus populaires (Slack, Gmail, Outlook, Zoom, Stripe, Salesforce, Shopify, WordPress, Zapier, Make) sont integres nativement avec un niveau de qualite eleve. L&apos;API HubSpot est egalement l&apos;une des mieux documentees du marche, avec des limites de rate genereuses (jusqu&apos;a 500 000 appels par jour sur Enterprise).</p>
                    <p><strong className="text-[#111]">Pipedrive</strong> propose environ 400 integrations dans sa Marketplace, un chiffre en croissance mais encore loin de HubSpot. Les integrations principales sont couvertes : Gmail, Outlook, Slack, Zoom, Trello, Asana, Mailchimp, QuickBooks, Xero. Mais les integrations sont souvent moins profondes qu&apos;avec HubSpot : synchronisation unidirectionnelle, moins de champs mappes, pas de declencheurs de workflows. L&apos;API Pipedrive est correcte mais avec des limites de rate plus restrictives (80 requetes par 2 secondes sur les plans standard).</p>
                    <p>Un point important : les deux CRM sont bien supportes par les outils d&apos;automatisation no-code (Make, Zapier, n8n), ce qui permet de combler les lacunes des integrations natives. Chez Ceres, on utilise frequemment Make pour connecter Pipedrive a des outils qui n&apos;ont pas d&apos;integration native, et ca fonctionne bien pour des volumes moderes.</p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#F2F2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#111] mb-2">Integrations HubSpot populaires</p>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { name: "Slack", domain: "slack.com" },
                          { name: "Gmail", domain: "gmail.com" },
                          { name: "Zoom", domain: "zoom.us" },
                          { name: "Stripe", domain: "stripe.com" },
                          { name: "Shopify", domain: "shopify.com" },
                          { name: "WordPress", domain: "wordpress.com" },
                          { name: "Salesforce", domain: "salesforce.com" },
                          { name: "Zapier", domain: "zapier.com" },
                        ].map((t) => (
                          <div key={t.name} className="flex items-center gap-1 rounded-md bg-[#F5F5F5] px-2 py-1">
                            <img src={`https://www.google.com/s2/favicons?domain=${t.domain}&sz=32`} alt={t.name} className="w-3 h-3" />
                            <span className="text-[9px] text-[#777]">{t.name}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-[#999] mt-2">1 500+ integrations au total</p>
                    </div>
                    <div className="rounded-xl border border-[#F2F2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#111] mb-2">Integrations Pipedrive populaires</p>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { name: "Slack", domain: "slack.com" },
                          { name: "Gmail", domain: "gmail.com" },
                          { name: "Zoom", domain: "zoom.us" },
                          { name: "Trello", domain: "trello.com" },
                          { name: "Mailchimp", domain: "mailchimp.com" },
                          { name: "Asana", domain: "asana.com" },
                          { name: "QuickBooks", domain: "quickbooks.intuit.com" },
                          { name: "Zapier", domain: "zapier.com" },
                        ].map((t) => (
                          <div key={t.name} className="flex items-center gap-1 rounded-md bg-[#F5F5F5] px-2 py-1">
                            <img src={`https://www.google.com/s2/favicons?domain=${t.domain}&sz=32`} alt={t.name} className="w-3 h-3" />
                            <span className="text-[9px] text-[#777]">{t.name}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-[#999] mt-2">400+ integrations au total</p>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 : UX et prise en main */}
              <section id="ux" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">UX et prise en main</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;experience utilisateur est un critere souvent sous-estime. Un CRM que les commerciaux n&apos;utilisent pas est un CRM inutile, quel que soit le nombre de fonctionnalites. L&apos;adoption depend directement de la facilite de prise en main et de l&apos;ergonomie au quotidien.</p>
                    <p><strong className="text-[#111]">Pipedrive</strong> remporte clairement le duel sur l&apos;UX. L&apos;interface est epuree, intuitive, et les commerciaux sont operationnels en quelques heures. Le pipeline visuel est le coeur de l&apos;application : on voit ses deals, on les deplace, on planifie les prochaines activites. Tout est a portee de clic. La courbe d&apos;apprentissage est douce, et les retours terrain de nos clients sont unanimes : les equipes adoptent Pipedrive naturellement, sans formation lourde. L&apos;application mobile est egalement tres reussie, rapide et bien pensee pour les commerciaux en deplacement.</p>
                    <p><strong className="text-[#111]">HubSpot</strong> est plus complexe a prendre en main, ce qui est logique vu l&apos;etendue de la plateforme. La navigation entre les Hubs (Marketing, Sales, Service, CMS, Operations) peut derouter les nouveaux utilisateurs. Les menus et sous-menus sont nombreux, et certaines fonctionnalites sont cachees dans des endroits contre-intuitifs. Un commercial qui n&apos;utilise que le CRM de vente peut etre frustre par la quantite d&apos;options qui ne le concernent pas. Cela dit, HubSpot a fait des progres significatifs ces dernieres annees : l&apos;interface a ete simplifiee, les vues sont personnalisables, et l&apos;onboarding guide aide les nouveaux utilisateurs a trouver leurs reperes.</p>
                    <p>En resume : comptez 2 a 4 heures pour former un commercial sur Pipedrive, contre 1 a 2 jours pour HubSpot (voire plus si on inclut les workflows et le reporting avance). C&apos;est un facteur important pour les equipes qui tournent souvent ou qui ont des profils moins techniques.</p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { critere: "Temps de prise en main", hubspot: "1 a 2 jours", pipedrive: "2 a 4 heures", winner: "pipedrive" },
                      { critere: "Complexite de l&apos;interface", hubspot: "Elevee (plateforme complete)", pipedrive: "Faible (epuree, focalisee)", winner: "pipedrive" },
                      { critere: "Application mobile", hubspot: "Correcte, fonctionnelle", pipedrive: "Excellente, rapide", winner: "pipedrive" },
                      { critere: "Personnalisation des vues", hubspot: "Tres avancee", pipedrive: "Bonne", winner: "hubspot" },
                      { critere: "Documentation et aide", hubspot: "HubSpot Academy (best-in-class)", pipedrive: "Knowledge base correct", winner: "hubspot" },
                      { critere: "Taux d&apos;adoption equipes", hubspot: "70-80% (variable)", pipedrive: "85-95% (eleve)", winner: "pipedrive" },
                    ].map((r) => (
                      <div key={r.critere} className={`rounded-xl border p-3 ${r.winner === "pipedrive" ? "border-[#22C55E]/30 bg-[#F0FDF4]/50" : "border-[#FF7A59]/30 bg-[#FFF5F0]/50"}`}>
                        <p className="text-[11px] font-semibold text-[#111] mb-2" dangerouslySetInnerHTML={{ __html: r.critere }} />
                        <div className="space-y-1">
                          <div className="flex items-start gap-2">
                            <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-3 h-3 mt-0.5" />
                            <span className="text-[10px] text-[#777]" dangerouslySetInnerHTML={{ __html: r.hubspot }} />
                          </div>
                          <div className="flex items-start gap-2">
                            <img src="https://www.google.com/s2/favicons?domain=pipedrive.com&sz=32" alt="Pipedrive" className="w-3 h-3 mt-0.5" />
                            <span className="text-[10px] text-[#777]" dangerouslySetInnerHTML={{ __html: r.pipedrive }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 : Scalabilite */}
              <section id="scalabilite" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Scalabilite : de la startup a l&apos;enterprise</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Choisir un CRM, c&apos;est aussi anticiper les besoins de demain. Un outil adapte a une equipe de 3 commerciaux ne sera peut-etre plus suffisant quand l&apos;equipe en comptera 30. Changer de CRM est un projet douloureux (migration des donnees, reapprentissage, perte de configurations). Mieux vaut choisir un outil qui grandira avec vous.</p>
                    <p><strong className="text-[#111]">HubSpot</strong> a l&apos;avantage de couvrir l&apos;ensemble du spectre, de la startup freemium a l&apos;enterprise de 500+ salaries. Le plan gratuit permet de demarrer sans investissement. Le plan Starter accompagne les premieres structurations. Le plan Pro supporte des equipes de 10 a 50 commerciaux avec des processus sophistiques. Le plan Enterprise gere des hierarchies complexes, des objets custom, du scoring predictif et des besoins de securite avances. La transition d&apos;un plan a l&apos;autre est transparente : pas de migration, pas de perte de donnees, juste un upgrade.</p>
                    <p><strong className="text-[#111]">Pipedrive</strong> est excellent pour les equipes de 2 a 30 commerciaux. Au-dela, on commence a rencontrer des limitations structurelles : l&apos;absence d&apos;objets custom rend difficile la modelisation de processus metier complexes, le reporting n&apos;est pas assez profond pour des RevOps exigeants, la gestion des permissions et des hierarchies d&apos;equipes est basique par rapport a HubSpot Enterprise, et l&apos;absence de module service client natif oblige a empiler des outils tiers. Pipedrive est conscient de ces limitations et fait evoluer sa plateforme, mais il reste positionne sur le segment PME commerciale.</p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      { phase: "Startup (1-5 pers.)", hubspot: "CRM gratuit, suffisant pour demarrer. Risque : la complexite peut freiner les petites equipes non techniques.", pipedrive: "Plan Essential a 14 eur. Interface simple, adoption immediate. Le meilleur rapport qualite-prix a ce stade.", color: "#22C55E", winner: "Pipedrive" },
                      { phase: "Scale-up (5-30 pers.)", hubspot: "Sales Hub Pro a 100 eur/pers. Workflows, sequences, reporting avance. Le ROI apparait quand les processus se complexifient.", pipedrive: "Professional a 49 eur/pers. Couvre 80% des besoins, mais les limites apparaissent sur l&apos;automatisation et le reporting.", color: "#4B5EFC", winner: "HubSpot" },
                      { phase: "Enterprise (30+ pers.)", hubspot: "Enterprise a 150 eur/pers. Objets custom, predictive scoring, hierarchies, sandboxes. Plateforme mature pour les grandes equipes.", pipedrive: "Enterprise a 99 eur/pers. Suffisant pour des equipes de vente pures, mais insuffisant pour des besoins RevOps complexes.", color: "#FF7A59", winner: "HubSpot" },
                    ].map((r) => (
                      <div key={r.phase} className="rounded-xl border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                          <p className="text-[12px] font-semibold text-[#111]">{r.phase}</p>
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${r.color}15`, color: r.color }}>Avantage {r.winner}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-3 h-3" />
                              <span className="text-[10px] font-medium text-[#111]">HubSpot</span>
                            </div>
                            <p className="text-[10px] text-[#888] leading-[1.6]" dangerouslySetInnerHTML={{ __html: r.hubspot }} />
                          </div>
                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              <img src="https://www.google.com/s2/favicons?domain=pipedrive.com&sz=32" alt="Pipedrive" className="w-3 h-3" />
                              <span className="text-[10px] font-medium text-[#111]">Pipedrive</span>
                            </div>
                            <p className="text-[10px] text-[#888] leading-[1.6]" dangerouslySetInnerHTML={{ __html: r.pipedrive }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 : Tableau comparatif global */}
              <section id="tableau-comparatif" className="mb-8">
                <div className="rounded-2xl bg-[#111] p-5 md:p-8">
                  <h2 className="text-[17px] font-semibold text-white mb-5">Tableau comparatif global : 16 criteres</h2>
                  <div className="space-y-1">
                    {/* Header */}
                    <div className="flex items-center py-2 border-b border-white/10">
                      <span className="text-[10px] text-white/40 font-semibold flex-1">Critere</span>
                      <div className="flex items-center gap-1 w-[140px]">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-3 h-3" />
                        <span className="text-[10px] text-white/60 font-semibold">HubSpot</span>
                      </div>
                      <div className="flex items-center gap-1 w-[140px]">
                        <img src="https://www.google.com/s2/favicons?domain=pipedrive.com&sz=32" alt="Pipedrive" className="w-3 h-3" />
                        <span className="text-[10px] text-white/60 font-semibold">Pipedrive</span>
                      </div>
                    </div>
                    {[
                      { critere: "Prix entree de gamme", hubspot: "Gratuit (CRM)", pipedrive: "14 eur/mois/user" },
                      { critere: "Prix plan professionnel", hubspot: "100 eur/mois/user", pipedrive: "49 eur/mois/user" },
                      { critere: "Pipeline visuel", hubspot: "Bon", pipedrive: "Excellent" },
                      { critere: "Gestion des contacts", hubspot: "Excellent (timeline unifiee)", pipedrive: "Bon (ventes uniquement)" },
                      { critere: "Marketing integre", hubspot: "Suite complete", pipedrive: "Add-on basique" },
                      { critere: "Automatisation", hubspot: "Tres avancee (Pro+)", pipedrive: "Correcte (Advanced+)" },
                      { critere: "Sequences email", hubspot: "Oui (Pro+)", pipedrive: "Non natif" },
                      { critere: "Reporting", hubspot: "Avance, multi-objets", pipedrive: "Correct, ventes uniquement" },
                      { critere: "Forecasting", hubspot: "Oui (Pro+)", pipedrive: "Oui (Professional+)" },
                      { critere: "Integrations", hubspot: "1 500+", pipedrive: "400+" },
                      { critere: "API", hubspot: "Excellente, bien documentee", pipedrive: "Correcte" },
                      { critere: "UX et prise en main", hubspot: "Complexe", pipedrive: "Intuitive" },
                      { critere: "Application mobile", hubspot: "Correcte", pipedrive: "Excellente" },
                      { critere: "Objets custom", hubspot: "Oui (Enterprise)", pipedrive: "Non" },
                      { critere: "Service client integre", hubspot: "Service Hub complet", pipedrive: "Non" },
                      { critere: "Scalabilite enterprise", hubspot: "Excellente", pipedrive: "Limitee (30+ users)" },
                    ].map((r) => (
                      <div key={r.critere} className="flex items-center py-2 border-b border-white/5">
                        <span className="text-[10px] text-white/60 flex-1">{r.critere}</span>
                        <span className="text-[10px] text-white/80 w-[140px]">{r.hubspot}</span>
                        <span className="text-[10px] text-white/80 w-[140px]">{r.pipedrive}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 11 : Verdict */}
              <section id="verdict" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Notre verdict : quel CRM choisir selon votre profil</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Apres avoir deploye les deux CRM chez des dizaines de clients, notre position est claire : il n&apos;y a pas de &ldquo;meilleur CRM&rdquo; dans l&apos;absolu. Le bon choix depend de votre contexte, de votre strategie d&apos;acquisition et de vos ambitions de croissance. Voici notre recommandation par profil.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-xl border border-[#22C55E]/30 bg-[#F0FDF4] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=pipedrive.com&sz=32" alt="Pipedrive" className="w-4 h-4" />
                        <p className="text-[12px] font-semibold text-[#22C55E]">Choisissez Pipedrive si...</p>
                      </div>
                      <ul className="space-y-1.5">
                        {[
                          "Votre equipe commerciale compte moins de 20 personnes",
                          "Votre modele d&apos;acquisition est principalement outbound (cold call, cold email, LinkedIn)",
                          "Le budget CRM est un critere important et vous voulez un ROI rapide",
                          "Vous avez besoin d&apos;un outil que les commerciaux adoptent sans formation lourde",
                          "Vous n&apos;avez pas de strategie inbound marketing structuree",
                          "La simplicite et la rapidite d&apos;execution priment sur la profondeur fonctionnelle",
                        ].map((i) => (
                          <li key={i} className="text-[11px] text-[#555] leading-[1.5] flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-1.5 shrink-0" /><span dangerouslySetInnerHTML={{ __html: i }} /></li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-[#FF7A59]/30 bg-[#FFF5F0] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-4 h-4" />
                        <p className="text-[12px] font-semibold text-[#FF7A59]">Choisissez HubSpot si...</p>
                      </div>
                      <ul className="space-y-1.5">
                        {[
                          "Vous voulez une plateforme unifiee ventes + marketing + service client",
                          "Votre strategie inclut de l&apos;inbound marketing (contenu, SEO, nurturing)",
                          "Vous avez besoin d&apos;automatisations complexes et de workflows multi-branches",
                          "Votre equipe depasse 20 personnes ou va s&apos;agrandir significativement",
                          "Vous avez un role de RevOps et avez besoin de reporting cross-fonctionnel",
                          "L&apos;attribution marketing et le tracking du parcours client complet sont importants",
                          "Vous etes pret a investir le temps et le budget pour exploiter une plateforme complete",
                        ].map((i) => (
                          <li key={i} className="text-[11px] text-[#555] leading-[1.5] flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" /><span dangerouslySetInnerHTML={{ __html: i }} /></li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Le cas hybride.</strong> Certains de nos clients utilisent Pipedrive pour la gestion commerciale pure et branchent des outils marketing tiers (Brevo, ActiveCampaign, Mailchimp). Cette approche fonctionne pour des equipes de 5 a 15 personnes qui veulent garder des couts bas tout en ayant un minimum de marketing automation. Mais au-dela, la multiplication des outils deconnectes cree des problemes de qualite de donnees, de duplication et de manque de visibilite. C&apos;est souvent le moment ou la migration vers HubSpot devient pertinente.</p>
                    <p><strong className="text-[#111]">Notre recommandation chez Ceres.</strong> Pour la majorite de nos clients B2B SaaS et services, on recommande HubSpot. Non pas parce que c&apos;est l&apos;outil le plus simple ou le moins cher, mais parce que la plupart de ces entreprises ont besoin d&apos;aligner ventes et marketing a un moment donne, et qu&apos;il est beaucoup plus facile de partir sur HubSpot des le depart que de migrer plus tard. Le cout initial est plus eleve, mais le cout total de possession sur 3 ans est souvent equivalent, voire inferieur, a celui d&apos;un Pipedrive + Mailchimp + un outil de landing pages + un outil de chat + un outil de support.</p>
                    <p>Pour les equipes purement commerciales (agences immobilieres, courtiers, forces de vente terrain) qui n&apos;ont aucun besoin marketing, Pipedrive reste le meilleur choix. L&apos;adoption est quasi-immediate, le ROI est visible des le premier mois, et les commerciaux adorent l&apos;outil.</p>
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
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour choisir et configurer votre CRM ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[500px] mx-auto">On deploie HubSpot et Pipedrive pour des equipes de vente B2B. Configuration, migration, automatisation, formation. Votre CRM operationnel en moins de 3 semaines.</p>
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
