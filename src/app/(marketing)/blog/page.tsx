"use client";

import { useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";

const categories = [
  { key: "all", label: "Tout", color: "#111" },
  { key: "revops", label: "RevOps", color: "#FF7A59" },
  { key: "crm", label: "CRM & HubSpot", color: "#4B5EFC" },
  { key: "ia", label: "IA & Automatisation", color: "#6D00CC" },
  { key: "process", label: "Process & Silos", color: "#6C5CE7" },
  { key: "data", label: "Data & Reporting", color: "#22C55E" },
];

const articles = [
  // Top performers
  { slug: "emelia-test-outil-cold-emailing", title: "Emelia : notre test complet de l'outil de cold emailing", excerpt: "On a testé Emelia pendant 3 mois sur nos campagnes outbound. Fonctionnalités, délivrabilité, prix, intégrations CRM et verdict honnête.", category: "process", date: "15 mars 2026", readTime: "12 min", featured: true, stats: "111 clics" },
  { slug: "tracking-conversions-hubspot-guide-complet", title: "Tracking des conversions HubSpot : le guide complet", excerpt: "Comment suivre automatiquement vos conversions dans HubSpot. UTM, attribution, formulaires, événements custom et reporting.", category: "crm", date: "12 mars 2026", readTime: "15 min", featured: true, stats: "97 clics" },
  { slug: "comparatif-outils-generation-leads-enrichissement", title: "Comparatif outils de génération de leads et enrichissement", excerpt: "Clay, Apollo, Lusha, Clearbit, Dropcontact, Kaspr. On compare les 12 meilleurs outils d'enrichissement et de génération de leads B2B.", category: "process", date: "10 mars 2026", readTime: "18 min", featured: true, stats: "95 clics · 16.9K imp" },
  // High potential
  { slug: "account-based-marketing-guide", title: "Account-Based Marketing : le guide complet ABM", excerpt: "Stratégie ABM de A à Z. Identification des comptes cibles, personnalisation, orchestration multi-canal et mesure du ROI.", category: "process", date: "8 mars 2026", readTime: "20 min", stats: "66 clics · 24.6K imp" },
  { slug: "integration-hubspot-whatsapp", title: "Intégration HubSpot x WhatsApp : guide pas à pas", excerpt: "Comment connecter WhatsApp Business à HubSpot. Messages automatisés, suivi des conversations et intégration dans votre pipeline.", category: "crm", date: "5 mars 2026", readTime: "10 min", stats: "68 clics" },
  { slug: "hublead-linkedin-hubspot", title: "Hublead : connecter LinkedIn à HubSpot", excerpt: "Test complet de Hublead pour synchroniser vos contacts LinkedIn avec HubSpot. Import, enrichissement et automatisation.", category: "crm", date: "3 mars 2026", readTime: "8 min", stats: "67 clics" },
  { slug: "marketing-automation-7-workflows-hubspot", title: "Marketing automation : les 7 workflows HubSpot incontournables", excerpt: "Les 7 workflows à mettre en place en priorité sur HubSpot. Welcome series, lead scoring, nurturing, réengagement et plus.", category: "crm", date: "1 mars 2026", readTime: "14 min", stats: "47 clics · 24.5K imp" },
  { slug: "meilleures-pratiques-sequences-hubspot", title: "Séquences HubSpot : les meilleures pratiques", excerpt: "Comment structurer vos séquences de prospection HubSpot. Timing, personnalisation, A/B testing et taux de réponse.", category: "crm", date: "25 fév 2026", readTime: "10 min", stats: "48 clics" },
  { slug: "gerer-mrr-revenu-recurrent-hubspot", title: "Comment gérer votre MRR dans HubSpot", excerpt: "Mettre en place le suivi du revenu récurrent mensuel dans HubSpot. Deal properties, reporting, forecasting et dashboards.", category: "data", date: "22 fév 2026", readTime: "11 min", stats: "48 clics" },
  { slug: "9-actions-commerciales-automatiser-hubspot", title: "9 actions commerciales à automatiser avec HubSpot", excerpt: "Les 9 tâches commerciales que vous pouvez automatiser dès aujourd'hui dans HubSpot. Gain de temps concret par action.", category: "crm", date: "20 fév 2026", readTime: "12 min", stats: "45 clics" },
  { slug: "skag-single-keyword-ad-group-google-ads", title: "SKAG pour Google Ads : bonne idée ou pas ?", excerpt: "Le Single Keyword Ad Group décortiqué. Avantages, inconvénients, alternatives et notre verdict pour 2026.", category: "data", date: "18 fév 2026", readTime: "9 min", stats: "62 clics" },
  { slug: "cimetieres-startups-modeles-saas-b2b", title: "Le cimetière des startups : les modèles SaaS B2B qui ne marchent pas", excerpt: "Analyse des patterns d'échec récurrents dans les startups SaaS B2B. Pricing, go-to-market, product-market fit.", category: "revops", date: "15 fév 2026", readTime: "14 min", stats: "59 clics · 5.1% CTR" },
  { slug: "marketing-saas-b2b-15-questions-strategiques", title: "Marketing SaaS B2B : 15 questions stratégiques inévitables", excerpt: "Les 15 questions fondamentales à se poser avant de construire sa stratégie marketing SaaS. Positionnement, ICP, canaux, budget.", category: "revops", date: "12 fév 2026", readTime: "16 min", stats: "53 clics · 8.8K imp" },
  // SEO high-impression articles
  { slug: "hubspot-cms-fondamentaux-site-internet-performant", title: "HubSpot CMS : les fondamentaux pour créer un site performant", excerpt: "Guide complet du CMS Hub HubSpot. Fonctionnalités, comparaison WordPress/Webflow, smart content, SEO et bonnes pratiques.", category: "crm", date: "10 fév 2026", readTime: "14 min", stats: "9.6K imp" },
  { slug: "hubspot-vs-pipedrive-comparatif-prix-fonctionnalites", title: "HubSpot vs Pipedrive : comparatif prix et fonctionnalités", excerpt: "Comparatif complet HubSpot vs Pipedrive. Prix, fonctionnalités CRM, automatisation, reporting et verdict selon votre profil.", category: "crm", date: "8 fév 2026", readTime: "15 min", stats: "7K imp · 3 clics" },
  { slug: "integration-hubspot-calendly", title: "Intégration HubSpot x Calendly : guide complet", excerpt: "Comment connecter Calendly à HubSpot. Configuration, synchronisation, workflows automatisés et comparaison avec HubSpot Meetings.", category: "crm", date: "5 fév 2026", readTime: "10 min", stats: "6.7K imp" },
  { slug: "tofu-mofu-bofu-strategie-inbound", title: "TOFU, MOFU, BOFU : comprendre et optimiser votre stratégie inbound", excerpt: "Guide complet du funnel inbound marketing. Contenus, KPIs et outils pour chaque étape du parcours d'achat B2B.", category: "revops", date: "3 fév 2026", readTime: "14 min", stats: "6.5K imp" },
  { slug: "cest-quoi-acquisition-marketing", title: "C'est quoi l'acquisition en marketing ? Guide complet", excerpt: "Définition, canaux, métriques (CAC, LTV) et stratégie d'acquisition marketing B2B. Tout ce qu'il faut savoir.", category: "revops", date: "1 fév 2026", readTime: "13 min", stats: "4.3K imp" },
  { slug: "crm-pme-2026", title: "CRM pour PME en 2026 : le guide pour bien choisir", excerpt: "Comparatif des meilleurs CRM pour PME. HubSpot, Pipedrive, Zoho, Monday, Folk, noCRM. Critères, prix et recommandations.", category: "crm", date: "28 jan 2026", readTime: "18 min", stats: "2.4K imp · position 5.5" },
  { slug: "meilleur-crm-b2b-france", title: "Le meilleur CRM B2B en France en 2026", excerpt: "Classement des meilleurs CRM B2B pour le marché français. HubSpot, Salesforce, Pipedrive, Sellsy, Axonaut comparés.", category: "crm", date: "25 jan 2026", readTime: "15 min" },
  // Strategic SEO articles
  { slug: "hubspot-tarifs-prix-2026", title: "HubSpot tarifs 2026 : tous les prix décryptés hub par hub", excerpt: "Guide complet des prix HubSpot. Marketing Hub, Sales Hub, Service Hub, CMS Hub, Operations Hub. Tous les plans comparés avec les coûts cachés.", category: "crm", date: "22 mars 2026", readTime: "20 min", featured: true },
  { slug: "hubspot-vs-salesforce-comparatif", title: "HubSpot vs Salesforce : le comparatif honnête en 2026", excerpt: "Comparatif complet HubSpot vs Salesforce. Interface, fonctionnalités, prix, implémentation et verdict selon votre profil.", category: "crm", date: "20 mars 2026", readTime: "18 min", featured: true },
  { slug: "lead-scoring-guide-complet", title: "Lead scoring : le guide complet pour qualifier vos leads B2B", excerpt: "Tout sur le lead scoring. Fit score, engagement score, implémentation HubSpot, scoring prédictif et erreurs à éviter.", category: "process", date: "18 mars 2026", readTime: "16 min" },
  { slug: "kpi-commerciaux-indicateurs-vente", title: "KPI commerciaux : les 25 indicateurs de vente à suivre", excerpt: "Les 25 KPIs commerciaux essentiels. Pipeline, activité, revenue, productivité. Formules, benchmarks et dashboard.", category: "data", date: "16 mars 2026", readTime: "16 min" },
  { slug: "ia-processus-commercial-vente-b2b", title: "Comment utiliser l'IA dans votre processus commercial B2B", excerpt: "8 cas d'usage concrets de l'IA en vente B2B. Enrichissement, scoring, emails, résumés de calls, analyse win/loss.", category: "ia", date: "14 mars 2026", readTime: "16 min" },
  { slug: "migration-crm-guide-complet", title: "Migration CRM : comment changer de CRM sans tout casser", excerpt: "Guide complet de la migration CRM. Audit, nettoyage, mapping, migration technique, tests et adoption.", category: "crm", date: "12 mars 2026", readTime: "15 min" },
  { slug: "aligner-marketing-sales-revops", title: "Comment aligner marketing et sales en 30 jours", excerpt: "Plan d'action en 4 semaines pour aligner vos équipes marketing et sales avec le RevOps. SLA, scoring, dashboards.", category: "revops", date: "10 mars 2026", readTime: "14 min" },
  { slug: "data-quality-crm-audit-nettoyage", title: "Data quality CRM : audit et nettoyage en 5 étapes", excerpt: "Comment auditer et nettoyer votre base CRM. Déduplication, standardisation, enrichissement et maintenance automatisée.", category: "data", date: "8 mars 2026", readTime: "13 min" },
  { slug: "onboarding-hubspot-30-premiers-jours", title: "Onboarding HubSpot : les 30 premiers jours", excerpt: "Plan semaine par semaine pour bien démarrer sur HubSpot. Setup, données, automatisation, reporting.", category: "crm", date: "6 mars 2026", readTime: "14 min" },
  { slug: "claude-vs-chatgpt-equipes-commerciales", title: "Claude vs ChatGPT pour les équipes commerciales", excerpt: "Comparatif honnête Claude vs ChatGPT pour la vente B2B. Emails, analyse CRM, résumés de calls, coaching.", category: "ia", date: "4 mars 2026", readTime: "14 min" },
  // Guides & reviews
  { slug: "lemlist-test-complet-outil-prospection", title: "Lemlist : notre test complet de l'outil de prospection multicanal", excerpt: "Test détaillé de Lemlist après 2 ans d'utilisation. Pricing, personnalisation, LinkedIn, délivrabilité, base B2B, IA et verdict honnête.", category: "process", date: "25 mars 2026", readTime: "22 min", featured: true, stats: "Guide" },
  // Top ranking article
  { slug: "top-agences-revops-france", title: "Top 10 des agences RevOps en France en 2026", excerpt: "Classement détaillé des meilleures agences RevOps en France. Critères, spécialités, prix, clients et verdict pour chaque agence.", category: "revops", date: "25 mars 2026", readTime: "22 min", featured: true },
  // RevOps articles
  { slug: "revops-manager-fiche-poste-salaire-competences", title: "RevOps Manager : fiche de poste, salaire et compétences", excerpt: "Tout sur le métier de RevOps Manager en France. Missions, compétences, salaire, parcours et comment recruter.", category: "revops", date: "24 mars 2026", readTime: "16 min", featured: true },
  { slug: "revops-vs-sales-ops-marketing-ops", title: "RevOps vs Sales Ops vs Marketing Ops : quelles différences ?", excerpt: "Définitions, périmètres, modèles organisationnels. Quand passer des Ops en silo au RevOps unifié.", category: "revops", date: "22 mars 2026", readTime: "12 min" },
  { slug: "stack-technologique-revops-2026", title: "Le stack technologique RevOps idéal en 2026", excerpt: "Les 7 couches du stack RevOps. CRM, automation, enrichissement, analytics, communication, IA, intégration.", category: "process", date: "20 mars 2026", readTime: "16 min" },
  { slug: "audit-revops-checklist-complete", title: "Audit RevOps : la checklist complète (80 points)", excerpt: "80 points d'audit organisés en 8 catégories. Scoring, niveaux de maturité et quick wins par score.", category: "revops", date: "18 mars 2026", readTime: "18 min" },
  { slug: "revops-10-quick-wins-30-jours", title: "RevOps : 10 quick wins à implémenter en 30 jours", excerpt: "10 actions concrètes pour améliorer vos opérations commerciales. Effort, impact et setup pas à pas.", category: "revops", date: "16 mars 2026", readTime: "14 min" },
  { slug: "forecasting-commercial-methodes-outils", title: "Forecasting commercial : méthodes, outils et bonnes pratiques", excerpt: "Les 5 méthodes de prévision de ventes. Pipeline weighted, IA prédictive, HubSpot forecasting et biais à éviter.", category: "data", date: "14 mars 2026", readTime: "15 min" },
  { slug: "sla-marketing-sales-template", title: "SLA marketing-sales : template complet et mise en place", excerpt: "Comment créer et tracker un SLA marketing-sales. Template, engagements, KPIs et réunion hebdomadaire.", category: "revops", date: "12 mars 2026", readTime: "12 min" },
  { slug: "revops-startups-par-ou-commencer", title: "RevOps pour startups : par où commencer", excerpt: "Guide RevOps pour startups de 5 à 50 personnes. Priorités, stack, budget et quand recruter vs externaliser.", category: "revops", date: "10 mars 2026", readTime: "13 min" },
  { slug: "metriques-revops-indicateurs-performance", title: "Les métriques RevOps : 30 indicateurs pour piloter votre revenue engine", excerpt: "30 métriques RevOps : acquisition, pipeline, closing, revenue, rétention et efficacité opérationnelle.", category: "revops", date: "8 mars 2026", readTime: "16 min" },
  { slug: "structurer-equipe-revops", title: "Comment structurer une équipe RevOps selon votre taille", excerpt: "De 0 à 200+ personnes. Org charts, rôles, ordre de recrutement et modèle hybride interne + agence.", category: "revops", date: "6 mars 2026", readTime: "14 min" },
  // New articles
  { slug: "tracker-soumissions-formulaire-hubspot-google-analytics-google-tag-manager", title: "Tracker les formulaires HubSpot dans GA4 via GTM", excerpt: "Guide pas à pas pour envoyer un événement GA4 à chaque soumission de formulaire HubSpot.", category: "crm", date: "20 mars 2026", readTime: "10 min" },
  { slug: "agents-ia-commerciaux", title: "Les 6 agents IA qui changent la vente B2B", excerpt: "Qualification, résumés de calls, enrichissement, scoring, playbooks, win/loss. Ce que l'IA fait concrètement.", category: "ia", date: "10 mars 2026", readTime: "10 min" },
  { slug: "claude-code-outils-internes", title: "Claude Code : des outils internes 10x plus vite", excerpt: "Dashboards, API, scripts d'automatisation. Comment Claude Code accélère le développement RevOps.", category: "ia", date: "8 mars 2026", readTime: "8 min" },
];

const categoryColors: Record<string, string> = { revops: "#FF7A59", crm: "#4B5EFC", ia: "#6D00CC", process: "#6C5CE7", data: "#22C55E" };
const categoryLetters: Record<string, string> = {
  revops: "R",
  crm: "C",
  ia: "IA",
  process: "P",
  data: "D",
};

export default function BlogPage() {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = articles.filter((a) => {
    const matchesCat = cat === "all" || a.category === cat;
    const matchesSearch = search === "" || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featured = articles.filter((a) => a.featured);
  const showFeatured = cat === "all" && search === "";

  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "10%", width: 320, height: 320, borderRadius: "50%", background: "#FF7A59", opacity: 0.14, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "30%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.12, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "55%", width: 280, height: 280, borderRadius: "50%", background: "#6D00CC", opacity: 0.12, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "2%", top: "75%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "85%", width: 280, height: 280, borderRadius: "50%", background: "#D4A27F", opacity: 0.10, filter: "blur(70px)" }} />

      <div className="relative z-10 max-w-[1000px] mx-auto px-6">
        {/* Hero */}
        <section className="text-center mb-14">
          <div className="mb-4"><Badge>Blog</Badge></div>
          <h1 className="text-[36px] sm:text-[48px] font-semibold text-[#111] leading-[1.1] tracking-[-0.03em] mb-5">
            RevOps, CRM & IA
          </h1>
          <p className="text-[17px] text-[#666] max-w-[480px] mx-auto leading-[1.7] mb-8">
            Articles, guides et analyses pour structurer vos opérations commerciales et déployer l&apos;IA.
          </p>

          {/* Search inside hero */}
          <div className="max-w-[440px] mx-auto relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCC]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-2xl border border-[#E8E8E8] bg-white text-[14px] text-[#111] placeholder-[#CCC] focus:outline-none focus:border-[#DDD] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] transition-colors"
            />
          </div>
        </section>

        {/* Categories */}
        <section className="mb-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((c) => (
              <button key={c.key} type="button" onClick={() => setCat(c.key)}
                className={"inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-[12px] font-medium cursor-pointer transition-all " +
                  (cat === c.key ? "border-[#111] bg-[#111] text-white" : "border-[#E8E8E8] bg-white text-[#999] hover:border-[#DDD] hover:text-[#666] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.04)]")}>
                {c.key !== "all" && <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: cat === c.key ? "white" : c.color, opacity: cat === c.key ? 0.7 : 0.5 }} />}
                {c.label}
              </button>
            ))}
          </div>
        </section>

        {/* Featured — bento grid */}
        {showFeatured && (
          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {featured.map((a, i) => {
                const color = categoryColors[a.category];
                const letter = categoryLetters[a.category];
                const isLarge = i === 0;
                return (
                  <Link key={a.slug} href={`/blog/${a.slug}`}
                    className={"rounded-2xl border border-[#E8E8E8] bg-white overflow-hidden hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] transition-all group " +
                      (isLarge ? "md:col-span-7 md:row-span-2" : "md:col-span-5")}>
                    {/* Visual header */}
                    <div className="p-6 pb-0" style={{ background: `linear-gradient(135deg, ${color}08 0%, ${color}03 100%)` }}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + "12" }}>
                          <span className="text-[13px] font-bold" style={{ color }}>{letter}</span>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md" style={{ backgroundColor: color + "12", color }}>{a.readTime}</span>
                      </div>
                    </div>
                    <div className={isLarge ? "p-6 md:p-8" : "p-5"}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>{categories.find((c) => c.key === a.category)?.label}</span>
                        <span className="text-[10px] text-[#DDD]">&bull;</span>
                        <span className="text-[10px] text-[#CCC]">{a.date}</span>
                      </div>
                      <h2 className={`font-semibold text-[#111] group-hover:text-[#444] transition-colors mb-2 leading-tight ${isLarge ? "text-[20px] sm:text-[26px]" : "text-[16px]"}`}>{a.title}</h2>
                      <p className={"text-[#777] leading-[1.65] " + (isLarge ? "text-[14px]" : "text-[12px]")}>{a.excerpt}</p>
                      <div className="flex items-center gap-1.5 mt-4 text-[12px] font-medium group-hover:gap-2.5 transition-all" style={{ color }}>
                        Lire l&apos;article
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* All articles */}
        <section>
          {!showFeatured && <p className="text-[13px] text-[#999] mb-6">{filtered.length} article{filtered.length > 1 ? "s" : ""}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(showFeatured ? filtered.filter((a) => !a.featured) : filtered).map((a) => {
              const color = categoryColors[a.category];
              const letter = categoryLetters[a.category];
              return (
                <Link key={a.slug} href={`/blog/${a.slug}`}
                  className="rounded-2xl border border-[#E8E8E8] bg-white overflow-hidden hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)] transition-all group">
                  {/* Mini visual */}
                  <div className="px-5 pt-5 pb-0" style={{ background: `linear-gradient(135deg, ${color}06 0%, transparent 100%)` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: color + "10" }}>
                      <span className="text-[11px] font-bold" style={{ color }}>{letter}</span>
                    </div>
                  </div>
                  <div className="p-5 pt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>{categories.find((c) => c.key === a.category)?.label}</span>
                      <span className="text-[10px] text-[#CCC]">{a.readTime}</span>
                    </div>
                    <h3 className="text-[14px] font-semibold text-[#111] group-hover:text-[#444] transition-colors mb-2 leading-tight">{a.title}</h3>
                    <p className="text-[12px] text-[#777] leading-[1.6] mb-3">{a.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#CCC]">{a.date}</span>
                      <div className="flex items-center gap-1 text-[11px] font-medium group-hover:gap-2 transition-all" style={{ color }}>
                        Lire
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 2L7 5L3 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[15px] text-[#999] mb-2">Aucun article trouvé</p>
              <button type="button" onClick={() => { setSearch(""); setCat("all"); }} className="text-[13px] text-[#4B5EFC] hover:underline cursor-pointer">Réinitialiser les filtres</button>
            </div>
          )}
        </section>

        {/* Newsletter */}
        <section className="mt-16">
          <div className="rounded-2xl border border-[#E8E8E8] bg-white p-8 md:p-12 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="mb-3"><Badge>Newsletter</Badge></div>
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-2">Le meilleur du RevOps & de l&apos;IA, chaque mois</h2>
                <p className="text-[13px] text-[#999] leading-[1.6]">Un email par mois. Articles, guides, outils et retours d&apos;expérience. Pas de spam.</p>
              </div>
              <div className="w-full md:w-auto shrink-0">
                <div className="flex gap-2">
                  <input type="email" placeholder="votre@email.com" className="w-full md:w-[220px] h-10 px-4 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] text-[13px] text-[#111] placeholder-[#CCC] focus:outline-none focus:border-[#DDD]" />
                  <button type="button" className="px-4 h-10 rounded-lg bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors cursor-pointer shrink-0">
                    S&apos;abonner
                  </button>
                </div>
                <p className="text-[10px] text-[#CCC] mt-2">Rejoignez +500 ops et leaders revenue</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
