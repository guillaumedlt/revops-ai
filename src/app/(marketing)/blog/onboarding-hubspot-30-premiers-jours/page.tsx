"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

/* ---------- section data ---------- */
const sections = [
  { id: "pourquoi-30-jours", label: "Pourquoi 30 jours" },
  { id: "checklist-pre-onboarding", label: "Checklist pre-onboarding" },
  { id: "semaine-1", label: "Semaine 1 : Fondations" },
  { id: "semaine-2", label: "Semaine 2 : Donnees" },
  { id: "semaine-3", label: "Semaine 3 : Automatisation" },
  { id: "semaine-4", label: "Semaine 4 : Reporting" },
  { id: "erreurs", label: "10 erreurs courantes" },
  { id: "seul-vs-agence", label: "Seul vs agence" },
  { id: "checklist-30-jours", label: "Checklist 30 jours" },
  { id: "ceres", label: "Pourquoi Ceres" },
];

/* ---------- related articles ---------- */
const relatedArticles = [
  { title: "Marketing automation : les 7 workflows HubSpot incontournables", slug: "marketing-automation-7-workflows-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "9 actions commerciales a automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "Automatisation", color: "#FF7A59" },
  { title: "CRM pour PME en 2026 : le guide pour bien choisir", slug: "crm-pme-2026", category: "CRM & HubSpot", color: "#4B5EFC" },
];

/* ---------- JSON-LD ---------- */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Onboarding HubSpot : les 30 premiers jours pour bien demarrer",
  description: "Guide complet d&apos;onboarding HubSpot semaine par semaine. Checklist des 30 premiers jours, configuration du pipeline, import de donnees, automatisation et reporting. Evitez les erreurs classiques et maximisez l&apos;adoption de votre CRM.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-06",
  dateModified: "2026-03-06",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/onboarding-hubspot-30-premiers-jours" },
  wordCount: 2800,
  articleSection: "CRM & HubSpot",
  inLanguage: "fr",
};

/* ---------- component ---------- */
export default function OnboardingHubSpot30JoursArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("pourquoi-30-jours");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "6%", width: 320, height: 320, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "18%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "32%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "48%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "64%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "80%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.07, filter: "blur(70px)" }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="flex gap-10">
          {/* Sticky sidebar -- desktop */}
          <aside className="hidden lg:block w-[200px] shrink-0">
            <div className="sticky top-28">
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Sommaire</p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`}
                    className={"block text-[11px] py-1.5 pl-3 border-l-2 transition-all " +
                      (activeSection === s.id ? "border-[#FF7A59] text-[#111] font-medium" : "border-transparent text-[#999] hover:text-[#666]")}>
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
                  <a href="https://twitter.com/intent/tweet?text=Onboarding%20HubSpot%20%3A%20les%2030%20premiers%20jours&url=https://www.ceres-revops.com/blog/onboarding-hubspot-30-premiers-jours" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/onboarding-hubspot-30-premiers-jours" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Onboarding HubSpot 30 jours</span>
            </nav>

            {/* Hero */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">14 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Onboarding HubSpot : les 30 premiers jours pour bien demarrer
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Vous venez de souscrire a HubSpot. Les identifiants sont crees, le portail est vide, et la question se pose : par ou commencer ? Les 30 premiers jours d&apos;utilisation d&apos;un CRM determinent son adoption a long terme. Un onboarding mal structure, et votre equipe abandonne l&apos;outil en quelques semaines. Un onboarding rigoureux, et HubSpot devient le systeme nerveux de votre activite commerciale. Ce guide semaine par semaine vous donne la feuille de route exacte que nous utilisons chez Ceres pour deployer HubSpot chez nos clients.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>6 mars 2026</span>
              </div>
            </header>

            <article>
              {/* ============ SECTION 1 : POURQUOI 30 JOURS ============ */}
              <section id="pourquoi-30-jours" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi les 30 premiers jours sont critiques</h2>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>
                      Les chiffres sont sans appel. Selon une etude de Merkle Group, 63% des implementations CRM echouent. Et dans la grande majorite des cas, l&apos;echec ne vient pas du logiciel. Il vient d&apos;un onboarding baclee ou inexistant. Les 30 premiers jours sont la fenetre critique ou les habitudes se forment, ou l&apos;equipe decide inconsciemment si elle va adopter l&apos;outil ou le contourner.
                    </p>
                    <p>
                      HubSpot lui-meme publie des donnees revelateurs : les portails qui atteignent un taux d&apos;adoption de 80% dans les 30 premiers jours ont 4,5 fois plus de chances d&apos;etre encore activement utilises 12 mois plus tard. A l&apos;inverse, un portail ou seuls 2 utilisateurs sur 10 se connectent apres la premiere semaine est quasiment condamne.
                    </p>
                    <p>
                      Le probleme, c&apos;est que la plupart des entreprises abordent l&apos;onboarding HubSpot comme une liste de taches techniques. Installer le code de tracking, importer les contacts, creer un pipeline. Elles oublient que l&apos;onboarding est avant tout un projet de conduite du changement. Il faut convaincre l&apos;equipe, creer des habitudes, montrer la valeur rapidement.
                    </p>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                    {[
                      { value: "63%", label: "des implementations CRM echouent", color: "#EF4444" },
                      { value: "4,5x", label: "plus de retention avec un onboarding structure", color: "#22C55E" },
                      { value: "30j", label: "fenetre critique pour l&apos;adoption", color: "#FF7A59" },
                      { value: "80%", label: "taux d&apos;adoption cible a J+30", color: "#4B5EFC" },
                    ].map((s) => (
                      <div key={s.value} className="rounded-lg border border-[#F2F2F2] p-3 text-center">
                        <p className="text-[20px] font-bold" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-[10px] text-[#999] leading-[1.4] mt-1" dangerouslySetInnerHTML={{ __html: s.label }} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>
                      Les pieges classiques de l&apos;onboarding HubSpot sont toujours les memes. Le premier : vouloir tout configurer en meme temps. Le portail devient un chantier permanent, rien n&apos;est termine, l&apos;equipe ne sait pas quoi utiliser. Le deuxieme : ne pas definir de responsable du projet. Sans chef d&apos;orchestre, chacun configure son coin et les incoherences s&apos;accumulent. Le troisieme : negliger la formation. On pense que HubSpot est intuitif et qu&apos;il suffit de donner les identifiants. En realite, sans formation structuree, les utilisateurs n&apos;exploitent que 10% des fonctionnalites.
                    </p>
                    <p>
                      Ce guide est structure en quatre semaines. Chaque semaine a un objectif clair, des actions precises et des livrables mesurables. A la fin des 30 jours, votre portail HubSpot sera operationnel, vos donnees propres, vos automatisations en place et vos tableaux de bord configures. C&apos;est exactement la methodologie que nous appliquons chez Ceres pour chaque client.
                    </p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 2 : CHECKLIST PRE-ONBOARDING ============ */}
              <section id="checklist-pre-onboarding" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Avant de commencer : la checklist pre-onboarding</h2>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>
                      Avant de toucher a HubSpot, il y a un travail preparatoire indispensable. Cette phase est souvent negligee parce qu&apos;elle ne se passe pas dans l&apos;outil. Pourtant, c&apos;est elle qui determine la qualite de tout ce qui suit. Un onboarding rate commence presque toujours par une preparation insuffisante.
                    </p>
                    <p>
                      Prevoyez 2 a 5 jours pour cette phase, selon la taille de votre equipe et la complexite de votre processus commercial. Ne sautez aucune etape. Chacune a un impact direct sur la configuration de HubSpot.
                    </p>
                  </div>

                  {/* Checklist mockup */}
                  <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] overflow-hidden mb-5">
                    <div className="bg-[#F5F5F5] border-b border-[#EAEAEA] px-4 py-2.5 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                      </div>
                      <span className="text-[10px] text-[#999] ml-2 font-medium">Checklist pre-onboarding HubSpot</span>
                    </div>
                    <div className="p-4 space-y-2.5">
                      {[
                        { label: "Definir le responsable du projet (admin HubSpot)", done: true },
                        { label: "Cartographier le processus de vente actuel (etapes, criteres de passage)", done: true },
                        { label: "Lister les utilisateurs et leurs roles (admin, commercial, marketing, service)", done: true },
                        { label: "Exporter les donnees existantes (CRM actuel, fichiers Excel, boites mail)", done: false },
                        { label: "Nettoyer les donnees avant import (doublons, formats, champs vides)", done: false },
                        { label: "Definir les proprietes personnalisees necessaires", done: false },
                        { label: "Lister les outils a integrer (email, calendrier, telephone, site web)", done: false },
                        { label: "Planifier les sessions de formation (dates, duree, groupes)", done: false },
                        { label: "Definir les KPIs de succes de l&apos;onboarding", done: false },
                        { label: "Obtenir les acces DNS pour le domaine (tracking et emails)", done: false },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 px-3 py-2 rounded-lg bg-white border border-[#F0F0F0]">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 ${item.done ? "bg-[#22C55E] border-[#22C55E]" : "border-[#D1D5DB] bg-white"}`}>
                            {item.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span className={`text-[12px] leading-[1.5] ${item.done ? "text-[#999] line-through" : "text-[#111]"}`} dangerouslySetInnerHTML={{ __html: item.label }} />
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#F5F5F5] border-t border-[#EAEAEA] px-4 py-2 flex items-center justify-between">
                      <span className="text-[10px] text-[#999]">3/10 termines</span>
                      <div className="w-32 h-1.5 rounded-full bg-[#E5E7EB]">
                        <div className="w-[30%] h-full rounded-full bg-[#22C55E]" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>
                      <strong className="text-[#111]">La cartographie du processus de vente</strong> est l&apos;element le plus important de cette phase. Avant de creer un pipeline dans HubSpot, il faut comprendre exactement comment vos commerciaux vendent aujourd&apos;hui. Quelles sont les etapes reelles (pas les etapes ideales) ? Quels criteres font qu&apos;un deal passe d&apos;une etape a l&apos;autre ? Quel est le cycle de vente moyen ? Combien de touches faut-il avant de closer ? Cette cartographie se fait en reunissant vos commerciaux les plus performants pendant une heure.
                    </p>
                    <p>
                      <strong className="text-[#111]">Le nettoyage des donnees</strong> est le deuxieme point critique. Importer des donnees sales dans un CRM neuf, c&apos;est construire sur des fondations pourries. Avant tout import, eliminez les doublons, standardisez les formats (numeros de telephone, noms d&apos;entreprise, adresses), supprimez les contacts inactifs depuis plus de 2 ans, et verifiez que les emails sont valides. Un fichier propre de 1 000 contacts vaut infiniment mieux qu&apos;un fichier sale de 10 000.
                    </p>
                    <p>
                      <strong className="text-[#111]">La definition des KPIs de succes</strong> permet de mesurer objectivement si l&apos;onboarding fonctionne. Exemples de KPIs pertinents : taux de connexion quotidien des utilisateurs, nombre de deals crees dans la premiere semaine, nombre d&apos;activites loguees par commercial par jour, pourcentage de champs obligatoires remplis. Sans metriques, il est impossible de savoir si l&apos;adoption progresse.
                    </p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 3 : SEMAINE 1 ============ */}
              <section id="semaine-1" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] border-l-4 border-l-[#4B5EFC]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#4B5EFC]/10 text-[#4B5EFC] text-[14px] font-bold">S1</span>
                    <div>
                      <h2 className="text-[17px] font-semibold text-[#111]">Semaine 1 : Les fondations</h2>
                      <p className="text-[11px] text-[#999]">Jours 1 a 7 -- Configuration du compte et du pipeline</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>
                      La premiere semaine est entierement consacree aux fondations techniques. L&apos;objectif est simple : a la fin de la semaine, chaque utilisateur doit pouvoir se connecter, naviguer dans l&apos;interface et comprendre la structure du portail. Aucune donnee client n&apos;est encore importee. On construit d&apos;abord le conteneur avant de le remplir.
                    </p>
                    <p>
                      C&apos;est contre-intuitif pour beaucoup de dirigeants qui veulent voir les deals dans le pipeline des le jour 1. Mais importer des donnees dans un portail mal configure, c&apos;est la garantie de devoir tout refaire trois semaines plus tard. La patience de cette premiere semaine fait gagner des semaines entiere par la suite.
                    </p>
                  </div>

                  {/* Day by day plan */}
                  <div className="space-y-2 mb-5">
                    {[
                      { day: "Jour 1", tasks: "Creer le compte, configurer le fuseau horaire, la devise, la langue. Ajouter les utilisateurs avec les bons roles (admin, commercial, marketing). Activer l&apos;authentification a deux facteurs.", color: "#4B5EFC" },
                      { day: "Jour 2", tasks: "Configurer le domaine d&apos;envoi d&apos;emails (DKIM, SPF, DMARC). Connecter le domaine du site web pour le tracking. Installer le code de suivi HubSpot sur toutes les pages du site.", color: "#6C5CE7" },
                      { day: "Jour 3", tasks: "Creer les proprietes personnalisees (contacts, entreprises, deals). Definir les champs obligatoires. Configurer les vues par defaut pour chaque role.", color: "#FF7A59" },
                      { day: "Jour 4-5", tasks: "Configurer le pipeline de vente : etapes, probabilites, proprietes requises par etape. Creer les pipelines secondaires si necessaire (upsell, partenaires). Definir les regles d&apos;attribution des leads.", color: "#22C55E" },
                      { day: "Jour 6-7", tasks: "Connecter les boites mail individuelles (Gmail/Outlook). Configurer le calendrier de prise de rendez-vous. Premiere session de formation : navigation, creation de contacts et deals, loguer une activite.", color: "#4B5EFC" },
                    ].map((d) => (
                      <div key={d.day} className="flex gap-3 rounded-lg border border-[#F2F2F2] p-3">
                        <div className="w-16 shrink-0">
                          <span className="text-[11px] font-bold" style={{ color: d.color }}>{d.day}</span>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.6]">{d.tasks}</p>
                      </div>
                    ))}
                  </div>

                  {/* CSS Mockup: Pipeline setup */}
                  <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] overflow-hidden mb-5">
                    <div className="bg-[#F5F5F5] border-b border-[#EAEAEA] px-4 py-2.5 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                      </div>
                      <span className="text-[10px] text-[#999] ml-2 font-medium">HubSpot -- Configuration du pipeline de vente</span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-4 h-4 rounded bg-[#FF7A59] flex items-center justify-center">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /></svg>
                        </div>
                        <span className="text-[12px] font-semibold text-[#111]">Pipeline : Ventes B2B</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2E7D32] font-medium ml-auto">Actif</span>
                      </div>

                      {/* Pipeline stages */}
                      <div className="flex gap-1 mb-4 overflow-x-auto">
                        {[
                          { name: "Nouveau lead", prob: "10%", color: "#4B5EFC" },
                          { name: "Qualification", prob: "20%", color: "#6C5CE7" },
                          { name: "Discovery call", prob: "40%", color: "#FF7A59" },
                          { name: "Proposition", prob: "60%", color: "#F59E0B" },
                          { name: "Negociation", prob: "80%", color: "#22C55E" },
                          { name: "Gagne", prob: "100%", color: "#16A34A" },
                        ].map((stage, i) => (
                          <div key={i} className="flex-1 min-w-[90px]">
                            <div className="h-2 rounded-full mb-2" style={{ background: stage.color }} />
                            <p className="text-[10px] font-semibold text-[#111] truncate">{stage.name}</p>
                            <p className="text-[9px] text-[#999]">Proba. : {stage.prob}</p>
                          </div>
                        ))}
                      </div>

                      {/* Stage detail */}
                      <div className="rounded-lg border border-[#E0E0E0] bg-white p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-semibold text-[#111]">Etape selectionnee : Discovery call</span>
                          <span className="text-[9px] px-2 py-0.5 rounded bg-[#FFF3E0] text-[#E65100]">Probabilite 40%</span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-[#999] w-28 shrink-0">Proprietes requises :</span>
                            <div className="flex gap-1 flex-wrap">
                              {["Budget", "Autorite", "Besoin", "Timing"].map((p) => (
                                <span key={p} className="text-[9px] px-2 py-0.5 rounded bg-[#F5F5F5] text-[#666] border border-[#EAEAEA]">{p}</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-[#999] w-28 shrink-0">Duree moyenne :</span>
                            <span className="text-[9px] text-[#111]">7 jours</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-[#999] w-28 shrink-0">Action automatique :</span>
                            <span className="text-[9px] text-[#111]">Creer une tache de suivi pour le commercial</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>
                      <strong className="text-[#111]">La configuration du pipeline est l&apos;etape la plus strategique de la semaine 1.</strong> Un pipeline mal concu est le premier facteur d&apos;abandon du CRM. Les regles sont simples : entre 5 et 7 etapes maximum, des criteres de passage objectifs et verifiables (pas &ldquo;le deal avance bien&rdquo; mais &ldquo;le budget est valide et le decideur est identifie&rdquo;), des probabilites realistes basees sur vos donnees historiques.
                    </p>
                    <p>
                      L&apos;erreur la plus frequente : creer un pipeline qui reflete ce que le manager veut voir plutot que ce que les commerciaux font reellement. Si vos commerciaux n&apos;envoient jamais de proposition formelle avant de closer, ne creez pas d&apos;etape &ldquo;Proposition envoyee&rdquo;. Le pipeline doit refleter la realite du terrain, pas un processus ideal que personne ne suit.
                    </p>
                    <p>
                      Concernant les permissions, appliquez le principe du moindre privilege. Les commerciaux voient et modifient leurs propres deals et contacts. Les managers voient les deals de leur equipe. Les admins ont acces a tout. Trop de permissions creent du bruit. Pas assez creent des frustrations. HubSpot permet de configurer des equipes et des profils de permission granulaires : utilisez-les des le depart.
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="mt-5 rounded-lg bg-[#F7F7FF] border border-[#E8E8F8] p-4">
                    <p className="text-[11px] font-semibold text-[#4B5EFC] uppercase tracking-wider mb-2">Livrables fin de semaine 1</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { val: "100%", label: "Utilisateurs connectes" },
                        { val: "1", label: "Pipeline configure" },
                        { val: "5-7", label: "Etapes de vente" },
                        { val: "1h", label: "Formation initiale faite" },
                      ].map((d) => (
                        <div key={d.label} className="text-center">
                          <p className="text-[18px] font-bold text-[#4B5EFC]">{d.val}</p>
                          <p className="text-[10px] text-[#999]">{d.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 4 : SEMAINE 2 ============ */}
              <section id="semaine-2" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] border-l-4 border-l-[#22C55E]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#22C55E]/10 text-[#22C55E] text-[14px] font-bold">S2</span>
                    <div>
                      <h2 className="text-[17px] font-semibold text-[#111]">Semaine 2 : Les donnees</h2>
                      <p className="text-[11px] text-[#999]">Jours 8 a 14 -- Import, nettoyage et structuration</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>
                      Le portail est configure, les utilisateurs sont connectes, le pipeline est en place. Il est temps de remplir HubSpot avec vos donnees. Cette semaine est la plus sensible de l&apos;onboarding. Des donnees mal importees polluent le CRM pour des mois. Des donnees propres et bien structurees donnent immediatement confiance a l&apos;equipe.
                    </p>
                    <p>
                      La regle d&apos;or de l&apos;import : ne jamais importer tout d&apos;un coup. Procedez par lots, en commencant par les entreprises, puis les contacts, puis les deals. Chaque lot est verifie avant de passer au suivant. C&apos;est plus long, mais c&apos;est la seule facon de garantir la qualite.
                    </p>
                  </div>

                  {/* Day by day plan */}
                  <div className="space-y-2 mb-5">
                    {[
                      { day: "Jour 8", tasks: "Preparer les fichiers d&apos;import : standardiser les colonnes, verifier les formats (dates, telephones, emails). Creer un mapping entre les champs de l&apos;ancien systeme et les proprietes HubSpot.", color: "#22C55E" },
                      { day: "Jour 9", tasks: "Importer les entreprises (companies). Verifier les doublons avec l&apos;outil de deduplication HubSpot. Controler que les proprietes cles sont remplies : nom, secteur, taille, site web.", color: "#4B5EFC" },
                      { day: "Jour 10", tasks: "Importer les contacts. Associer chaque contact a son entreprise. Verifier les lifecycle stages et les proprietes de segmentation (source, persona, territoire).", color: "#6C5CE7" },
                      { day: "Jour 11-12", tasks: "Importer les deals en cours. Les placer dans les bonnes etapes du pipeline. Associer les contacts et entreprises concernes. Verifier les montants, dates de fermeture prevues et proprietaires.", color: "#FF7A59" },
                      { day: "Jour 13-14", tasks: "Configurer les integrations : synchronisation email bidirectionnelle, calendrier, telephone (si VoIP). Tester chaque integration. Deuxieme session de formation : creer un deal, loguer des activites, utiliser les filtres et vues.", color: "#22C55E" },
                    ].map((d) => (
                      <div key={d.day} className="flex gap-3 rounded-lg border border-[#F2F2F2] p-3">
                        <div className="w-16 shrink-0">
                          <span className="text-[11px] font-bold" style={{ color: d.color }}>{d.day}</span>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.6]" dangerouslySetInnerHTML={{ __html: d.tasks }} />
                      </div>
                    ))}
                  </div>

                  {/* CSS Mockup: Data import */}
                  <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] overflow-hidden mb-5">
                    <div className="bg-[#F5F5F5] border-b border-[#EAEAEA] px-4 py-2.5 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                      </div>
                      <span className="text-[10px] text-[#999] ml-2 font-medium">HubSpot -- Import de donnees</span>
                    </div>
                    <div className="p-5">
                      {/* Import progress */}
                      <div className="space-y-3 mb-4">
                        {[
                          { type: "Entreprises", count: "342", status: "Termine", pct: 100, color: "#22C55E" },
                          { type: "Contacts", count: "1 247", status: "Termine", pct: 100, color: "#22C55E" },
                          { type: "Deals", count: "89", status: "En cours...", pct: 65, color: "#FF7A59" },
                          { type: "Notes & activites", count: "---", status: "En attente", pct: 0, color: "#D1D5DB" },
                        ].map((imp) => (
                          <div key={imp.type} className="rounded-lg border border-[#EAEAEA] bg-white p-3">
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ background: imp.color }} />
                                <span className="text-[11px] font-semibold text-[#111]">{imp.type}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-[#999]">{imp.count} enregistrements</span>
                                <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: imp.pct === 100 ? "#E8F5E9" : imp.pct > 0 ? "#FFF3E0" : "#F5F5F5", color: imp.pct === 100 ? "#2E7D32" : imp.pct > 0 ? "#E65100" : "#999" }}>{imp.status}</span>
                              </div>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-[#F0F0F0]">
                              <div className="h-full rounded-full transition-all" style={{ width: `${imp.pct}%`, background: imp.color }} />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Data quality summary */}
                      <div className="rounded-lg border border-[#E0E0E0] bg-white p-3">
                        <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-2">Qualite des donnees importees</p>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center">
                            <p className="text-[16px] font-bold text-[#22C55E]">94%</p>
                            <p className="text-[9px] text-[#999]">Emails valides</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[16px] font-bold text-[#F59E0B]">23</p>
                            <p className="text-[9px] text-[#999]">Doublons detectes</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[16px] font-bold text-[#4B5EFC]">87%</p>
                            <p className="text-[9px] text-[#999]">Champs cles remplis</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>
                      <strong className="text-[#111]">Les proprietes personnalisees meritent une attention particuliere.</strong> HubSpot propose des centaines de proprietes par defaut, mais chaque entreprise a des specificites. Un SaaS aura besoin d&apos;une propriete &ldquo;MRR&rdquo; ou &ldquo;Plan actuel&rdquo; sur ses deals. Une agence aura besoin d&apos;un champ &ldquo;Type de projet&rdquo; ou &ldquo;Budget mensuel&rdquo;. La regle : ne creez que les proprietes que vous utiliserez reellement dans vos filtres, reports ou automatisations. Chaque propriete inutile est du bruit qui ralentit la saisie.
                    </p>
                    <p>
                      <strong className="text-[#111]">L&apos;association contacts-entreprises-deals</strong> est ce qui fait la puissance d&apos;un CRM. Un contact isole sans entreprise ni deal associe est une donnee morte. Lors de l&apos;import, assurez-vous que chaque contact est rattache a son entreprise, et que chaque deal est rattache a ses contacts et a son entreprise. HubSpot peut creer automatiquement les associations via le domaine email, mais il est preferable de les verifier manuellement pour les comptes strategiques.
                    </p>
                    <p>
                      A la fin de la semaine 2, vos commerciaux doivent voir leurs deals dans le pipeline, reconnaitre leurs contacts, et pouvoir commencer a utiliser HubSpot au quotidien. C&apos;est le point de bascule. Si les donnees sont propres et completes, la confiance s&apos;installe. Si les donnees sont incompletes ou erronees, la defiance s&apos;installe et ne part plus.
                    </p>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-[#FFFBF5] border border-[#F5E6D0]">
                    <p className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-wider mb-1">Conseil</p>
                    <p className="text-[12px] text-[#8B6914] leading-[1.65]">Faites un import test avec 50 enregistrements avant de lancer l&apos;import complet. Verifiez que les champs sont correctement mappes, que les associations fonctionnent et que les donnees s&apos;affichent comme prevu dans les fiches. Corrigez les problemes sur le lot test avant de traiter le fichier complet.</p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 5 : SEMAINE 3 ============ */}
              <section id="semaine-3" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] border-l-4 border-l-[#FF7A59]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#FF7A59]/10 text-[#FF7A59] text-[14px] font-bold">S3</span>
                    <div>
                      <h2 className="text-[17px] font-semibold text-[#111]">Semaine 3 : L&apos;automatisation</h2>
                      <p className="text-[11px] text-[#999]">Jours 15 a 21 -- Workflows, sequences, templates</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>
                      Le portail est configure, les donnees sont en place, l&apos;equipe commence a utiliser HubSpot au quotidien. La semaine 3 est celle ou vous commencez a automatiser les taches repetitives. C&apos;est la semaine ou HubSpot passe du statut de &ldquo;carnet d&apos;adresses glorifie&rdquo; a celui d&apos;outil de productivite.
                    </p>
                    <p>
                      L&apos;automatisation a ce stade doit rester simple. Il ne s&apos;agit pas de construire des workflows complexes a 15 branches. Il s&apos;agit de supprimer les frictions du quotidien : envoyer automatiquement un email de suivi, creer une tache quand un deal change d&apos;etape, notifier un manager quand un deal depasse un certain montant. Chaque automatisation doit faire gagner du temps mesurable a l&apos;equipe.
                    </p>
                  </div>

                  {/* Day by day plan */}
                  <div className="space-y-2 mb-5">
                    {[
                      { day: "Jour 15", tasks: "Creer les templates d&apos;emails commerciaux : premier contact, suivi post-call, envoi de proposition, relance, remerciement apres signature. Standardiser le ton et la structure.", color: "#FF7A59" },
                      { day: "Jour 16", tasks: "Configurer les snippets (blocs de texte reutilisables) : presentation entreprise, paragraphe tarifs, FAQ courantes, coordonnees. Les snippets font gagner 15 a 30 minutes par jour par commercial.", color: "#4B5EFC" },
                      { day: "Jour 17-18", tasks: "Creer les premieres sequences de prospection (3 a 5 etapes). Configurer les delais entre les etapes, les conditions d&apos;arret (reponse recue, meeting booke), les taches manuelles intercalees.", color: "#6C5CE7" },
                      { day: "Jour 19-20", tasks: "Mettre en place les workflows essentiels : notification quand un deal change d&apos;etape, creation automatique de tache de suivi, mise a jour du lifecycle stage, rotation des leads entre commerciaux.", color: "#22C55E" },
                      { day: "Jour 21", tasks: "Configurer les notifications internes : alertes Slack ou email quand un prospect visite la page pricing, quand un deal depasse X euros, quand un deal est inactif depuis 14 jours. Troisieme session de formation.", color: "#FF7A59" },
                    ].map((d) => (
                      <div key={d.day} className="flex gap-3 rounded-lg border border-[#F2F2F2] p-3">
                        <div className="w-16 shrink-0">
                          <span className="text-[11px] font-bold" style={{ color: d.color }}>{d.day}</span>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.6]" dangerouslySetInnerHTML={{ __html: d.tasks }} />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>
                      <strong className="text-[#111]">Les sequences vs les workflows</strong> : cette distinction est essentielle et souvent mal comprise. Les sequences sont des suites d&apos;emails et de taches liees a un contact specifique, declenchees manuellement par le commercial. Elles servent a la prospection et au suivi individuel. Les workflows sont des automatisations declenchees par des criteres (propriete modifiee, formulaire soumis, date atteinte). Ils servent au marketing, a la gestion interne et aux notifications.
                    </p>
                    <p>
                      <strong className="text-[#111]">Les templates d&apos;emails</strong> ne sont pas des emails generiques. Chaque template doit etre un point de depart que le commercial personnalise avant l&apos;envoi. Un template de premier contact doit avoir des espaces vides pour le contexte specifique du prospect (derniere actualite de l&apos;entreprise, point de douleur identifie, reference commune). Le commercial remplit ces espaces en 30 secondes au lieu de rediger un email de zero en 5 minutes.
                    </p>
                    <p>
                      <strong className="text-[#111]">Les notifications intelligentes</strong> sont le secret d&apos;un CRM vivant. La difference entre un CRM utilise et un CRM abandonne, c&apos;est souvent la qualite des notifications. Si le commercial recoit une alerte quand un prospect visite la page pricing, il peut reagir dans l&apos;heure au lieu de decouvrir l&apos;information trois jours plus tard. Configurez les notifications pour qu&apos;elles soient utiles et actionnables, pas pour qu&apos;elles noient l&apos;equipe sous un flot d&apos;alertes inutiles.
                    </p>
                  </div>

                  {/* Workflow diagram */}
                  <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4 mb-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-3">Exemple : workflow de notification deal inactif</p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-3 py-1.5 rounded-md bg-[#FF7A59] text-white font-medium">Declencheur : deal inactif 14 jours</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Creer tache : relancer le prospect</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Email au commercial : rappel de suivi</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Si inactif +7j : notifier le manager</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-[#EF4444] text-white font-medium">Si inactif +30j : passer en Perdu</span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-[#FFF5F0] border border-[#FFE0D0] p-4">
                    <p className="text-[11px] font-semibold text-[#FF7A59] uppercase tracking-wider mb-2">Livrables fin de semaine 3</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { val: "5-8", label: "Templates d&apos;emails crees" },
                        { val: "10+", label: "Snippets configures" },
                        { val: "2-3", label: "Sequences actives" },
                        { val: "3-5", label: "Workflows actifs" },
                      ].map((d) => (
                        <div key={d.label} className="text-center">
                          <p className="text-[18px] font-bold text-[#FF7A59]">{d.val}</p>
                          <p className="text-[10px] text-[#999]" dangerouslySetInnerHTML={{ __html: d.label }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 6 : SEMAINE 4 ============ */}
              <section id="semaine-4" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] border-l-4 border-l-[#6C5CE7]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#6C5CE7]/10 text-[#6C5CE7] text-[14px] font-bold">S4</span>
                    <div>
                      <h2 className="text-[17px] font-semibold text-[#111]">Semaine 4 : Le reporting</h2>
                      <p className="text-[11px] text-[#999]">Jours 22 a 30 -- Dashboards, rapports, objectifs</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>
                      La derniere semaine de l&apos;onboarding est consacree au reporting. C&apos;est la cerise sur le gateau, mais c&apos;est aussi ce qui rend le CRM indispensable pour le management. Un manager qui voit ses KPIs en temps reel dans HubSpot ne demande plus de reporting Excel le vendredi soir. Un commercial qui voit sa progression vers ses objectifs est plus motive que celui qui navigue a vue.
                    </p>
                    <p>
                      Le reporting HubSpot est puissant mais peut vite devenir un labyrinthe. La cle est de commencer par les 4 a 6 rapports essentiels et d&apos;en ajouter progressivement selon les besoins. Chaque rapport doit repondre a une question business precise. Si vous ne pouvez pas formuler la question, le rapport est inutile.
                    </p>
                  </div>

                  {/* Day by day plan */}
                  <div className="space-y-2 mb-5">
                    {[
                      { day: "Jour 22-23", tasks: "Creer le dashboard commercial principal : pipeline value par etape, nombre de deals crees cette semaine/ce mois, taux de conversion par etape, deals a relancer, activites par commercial.", color: "#6C5CE7" },
                      { day: "Jour 24-25", tasks: "Configurer les rapports de performance individuelle : objectifs vs realise, nombre d&apos;activites, deals gagnes/perdus, cycle de vente moyen. Creer un dashboard par equipe si necessaire.", color: "#4B5EFC" },
                      { day: "Jour 26-27", tasks: "Mettre en place les objectifs (goals) dans HubSpot : revenus par commercial, nombre de deals, nombre de meetings. Configurer les previsions de ventes (forecasting).", color: "#FF7A59" },
                      { day: "Jour 28-29", tasks: "Configurer les rapports marketing (si applicable) : sources de leads, taux de conversion par formulaire, performance des pages. Creer le dashboard de suivi marketing.", color: "#22C55E" },
                      { day: "Jour 30", tasks: "Session finale de formation et revue de l&apos;onboarding. Verifier tous les KPIs de succes. Documenter les conventions d&apos;utilisation. Planifier le premier audit qualite a J+60.", color: "#6C5CE7" },
                    ].map((d) => (
                      <div key={d.day} className="flex gap-3 rounded-lg border border-[#F2F2F2] p-3">
                        <div className="w-16 shrink-0">
                          <span className="text-[11px] font-bold" style={{ color: d.color }}>{d.day}</span>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.6]" dangerouslySetInnerHTML={{ __html: d.tasks }} />
                      </div>
                    ))}
                  </div>

                  {/* CSS Mockup: Dashboard */}
                  <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] overflow-hidden mb-5">
                    <div className="bg-[#F5F5F5] border-b border-[#EAEAEA] px-4 py-2.5 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                      </div>
                      <span className="text-[10px] text-[#999] ml-2 font-medium">HubSpot -- Dashboard commercial</span>
                    </div>
                    <div className="p-5">
                      {/* KPI row */}
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        {[
                          { label: "Pipeline total", value: "487 500 EUR", change: "+12%", up: true },
                          { label: "Deals en cours", value: "34", change: "+5", up: true },
                          { label: "Taux de conversion", value: "23%", change: "-2%", up: false },
                          { label: "Cycle moyen", value: "28j", change: "-3j", up: true },
                        ].map((kpi) => (
                          <div key={kpi.label} className="rounded-lg border border-[#EAEAEA] bg-white p-3">
                            <p className="text-[9px] text-[#999] mb-1">{kpi.label}</p>
                            <p className="text-[14px] font-bold text-[#111]">{kpi.value}</p>
                            <p className={`text-[9px] font-medium ${kpi.up ? "text-[#22C55E]" : "text-[#EF4444]"}`}>{kpi.change} vs mois precedent</p>
                          </div>
                        ))}
                      </div>

                      {/* Pipeline chart mockup */}
                      <div className="rounded-lg border border-[#EAEAEA] bg-white p-3 mb-3">
                        <p className="text-[10px] font-semibold text-[#111] mb-3">Pipeline par etape</p>
                        <div className="space-y-2">
                          {[
                            { stage: "Nouveau lead", value: 125000, pct: 100, color: "#4B5EFC" },
                            { stage: "Qualification", value: 97500, pct: 78, color: "#6C5CE7" },
                            { stage: "Discovery call", value: 87000, pct: 70, color: "#FF7A59" },
                            { stage: "Proposition", value: 112000, pct: 90, color: "#F59E0B" },
                            { stage: "Negociation", value: 66000, pct: 53, color: "#22C55E" },
                          ].map((s) => (
                            <div key={s.stage} className="flex items-center gap-2">
                              <span className="text-[9px] text-[#999] w-20 shrink-0 truncate">{s.stage}</span>
                              <div className="flex-1 h-4 rounded bg-[#F5F5F5] overflow-hidden">
                                <div className="h-full rounded transition-all" style={{ width: `${s.pct}%`, background: s.color }} />
                              </div>
                              <span className="text-[9px] font-medium text-[#111] w-20 text-right">{s.value.toLocaleString("fr-FR")} EUR</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Activity chart mockup */}
                      <div className="rounded-lg border border-[#EAEAEA] bg-white p-3">
                        <p className="text-[10px] font-semibold text-[#111] mb-3">Activites cette semaine</p>
                        <div className="flex items-end gap-1 h-16">
                          {[
                            { day: "Lun", val: 80, color: "#4B5EFC" },
                            { day: "Mar", val: 95, color: "#4B5EFC" },
                            { day: "Mer", val: 60, color: "#4B5EFC" },
                            { day: "Jeu", val: 100, color: "#4B5EFC" },
                            { day: "Ven", val: 45, color: "#4B5EFC" },
                          ].map((d) => (
                            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                              <div className="w-full rounded-t" style={{ height: `${d.val}%`, background: d.color, opacity: 0.7, minHeight: 4 }} />
                              <span className="text-[8px] text-[#999]">{d.day}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>
                      <strong className="text-[#111]">Les 6 rapports indispensables a configurer en priorite</strong> : (1) Pipeline value par etape, qui donne la vue d&apos;ensemble de votre activite commerciale. (2) Deals crees vs gagnes vs perdus par mois, qui mesure la dynamique de votre pipeline. (3) Activites par commercial (appels, emails, meetings), qui mesure l&apos;effort. (4) Taux de conversion par etape, qui identifie les goulots d&apos;etranglement. (5) Cycle de vente moyen, qui mesure la velocite. (6) Prevision de revenus, qui projette les resultats du mois/trimestre en cours.
                    </p>
                    <p>
                      <strong className="text-[#111]">Le forecasting dans HubSpot</strong> est souvent sous-utilise. Il permet de projeter les revenus en fonction de la valeur des deals dans le pipeline, ponderee par la probabilite de chaque etape. Pour que le forecast soit fiable, il faut que les probabilites des etapes soient calibrees sur vos donnees reelles (pas sur des estimations optimistes) et que les dates de fermeture prevues soient maintenues a jour par les commerciaux.
                    </p>
                    <p>
                      La session de cloture de l&apos;onboarding est un moment cle. C&apos;est le moment de valider que chaque utilisateur est autonome, que les conventions d&apos;utilisation sont documentees et partagees, et que les metriques cibles sont atteintes. C&apos;est aussi le moment de planifier la suite : un audit qualite a J+60 pour verifier que les bonnes pratiques sont maintenues, et un cycle d&apos;amelioration continue pour ajouter des automatisations et des rapports au fil des besoins.
                    </p>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#F5F3FF] border border-[#E8E0FF] p-4">
                    <p className="text-[11px] font-semibold text-[#6C5CE7] uppercase tracking-wider mb-2">Livrables fin de semaine 4</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { val: "2-3", label: "Dashboards configures" },
                        { val: "6+", label: "Rapports actifs" },
                        { val: "100%", label: "Objectifs definis" },
                        { val: "1", label: "Document de conventions" },
                      ].map((d) => (
                        <div key={d.label} className="text-center">
                          <p className="text-[18px] font-bold text-[#6C5CE7]">{d.val}</p>
                          <p className="text-[10px] text-[#999]">{d.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 7 : 10 ERREURS ============ */}
              <section id="erreurs" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les 10 erreurs d&apos;onboarding les plus courantes</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Apres avoir accompagne des dizaines d&apos;entreprises dans leur onboarding HubSpot, on a identifie les erreurs qui reviennent systematiquement. Les voici, classees par frequence et par impact sur l&apos;adoption.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        erreur: "Importer les donnees sans les nettoyer",
                        desc: "C&apos;est l&apos;erreur numero un. Les entreprises exportent tout depuis leur ancien systeme et importent tel quel dans HubSpot. Resultat : des milliers de doublons, des contacts sans email, des entreprises sans nom, des deals sans montant. Le CRM est pollue des le depart et l&apos;equipe perd confiance dans les donnees. Nettoyez AVANT d&apos;importer, pas apres.",
                        color: "#EF4444"
                      },
                      {
                        erreur: "Creer trop d&apos;etapes dans le pipeline",
                        desc: "Un pipeline a 12 etapes est un pipeline que personne ne met a jour. Chaque etape supplementaire est une friction. Visez 5 a 7 etapes maximum, avec des criteres de passage clairs et objectifs. Si vous ne pouvez pas expliquer en une phrase la difference entre deux etapes, fusionnez-les.",
                        color: "#FF7A59"
                      },
                      {
                        erreur: "Ne pas designer de responsable du projet",
                        desc: "L&apos;onboarding HubSpot ne peut pas etre un effort collectif sans leader. Il faut un responsable clairement identifie qui prend les decisions de configuration, tranche les debats et s&apos;assure que le calendrier est respecte. Sans chef de projet, chaque decision est repoussee et l&apos;onboarding s&apos;eternise.",
                        color: "#6C5CE7"
                      },
                      {
                        erreur: "Sauter la phase de formation",
                        desc: "HubSpot est intuitif, mais intuitif ne veut pas dire que l&apos;equipe sait l&apos;utiliser correctement. Sans formation, les commerciaux creent des contacts au lieu de deals, ne loguent pas leurs activites, n&apos;utilisent pas les filtres. Prevoyez au minimum 3 sessions d&apos;une heure sur les 30 premiers jours.",
                        color: "#4B5EFC"
                      },
                      {
                        erreur: "Vouloir tout automatiser des le debut",
                        desc: "L&apos;automatisation doit venir apres l&apos;adoption, pas avant. Si vos commerciaux ne maitrisent pas encore les bases (creer un deal, loguer un appel), inutile de deployer des workflows complexes. L&apos;automatisation prematuree cree de la confusion et des resultats inattendus que personne ne comprend.",
                        color: "#22C55E"
                      },
                      {
                        erreur: "Ne pas configurer les permissions",
                        desc: "Par defaut, HubSpot donne un acces assez large. Si un commercial junior peut supprimer des deals ou modifier les proprietes systeme, vous courez a la catastrophe. Configurez les equipes, les profils de permission et les restrictions d&apos;acces des la premiere semaine.",
                        color: "#EF4444"
                      },
                      {
                        erreur: "Ignorer le mobile",
                        desc: "Si vos commerciaux sont sur le terrain, l&apos;application mobile HubSpot doit etre installee et configuree des le jour 1. Un commercial qui ne peut pas consulter une fiche client avant un rendez-vous ou loguer une activite en sortant d&apos;un meeting n&apos;utilisera pas le CRM.",
                        color: "#FF7A59"
                      },
                      {
                        erreur: "Creer des proprietes en double",
                        desc: "HubSpot a deja des centaines de proprietes par defaut. Avant de creer une propriete personnalisee, verifiez qu&apos;elle n&apos;existe pas deja sous un autre nom. Les proprietes en double fragmentent les donnees et rendent le reporting impossible. Faites un inventaire des proprietes existantes avant d&apos;en creer de nouvelles.",
                        color: "#6C5CE7"
                      },
                      {
                        erreur: "Ne pas definir de conventions d&apos;utilisation",
                        desc: "Comment nommer un deal ? Quels champs sont obligatoires a chaque etape ? Quand loguer un appel vs un email ? Sans conventions ecrites et partagees, chaque commercial fait a sa maniere et les donnees deviennent inutilisables pour le reporting. Documentez les regles et faites-les appliquer.",
                        color: "#4B5EFC"
                      },
                      {
                        erreur: "Ne pas mesurer l&apos;adoption",
                        desc: "Si vous ne mesurez pas le taux de connexion, le nombre d&apos;activites loguees et le pourcentage de champs remplis, vous ne pouvez pas savoir si l&apos;onboarding fonctionne. Mettez en place des metriques d&apos;adoption des la premiere semaine et faites un point hebdomadaire. Un probleme d&apos;adoption detecte a J+7 se corrige facilement. A J+60, il est trop tard.",
                        color: "#22C55E"
                      },
                    ].map((e, i) => (
                      <div key={i} className="rounded-lg border-l-2 bg-[#FAFAFA] p-4" style={{ borderColor: e.color }}>
                        <p className="text-[12px] font-semibold text-[#111] mb-2">{i + 1}. {e.erreur}</p>
                        <p className="text-[11px] text-[#777] leading-[1.6]" dangerouslySetInnerHTML={{ __html: e.desc }} />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 8 : SEUL VS AGENCE ============ */}
              <section id="seul-vs-agence" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Onboarding seul vs avec une agence</h2>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>
                      La question revient systematiquement : faut-il faire l&apos;onboarding HubSpot en interne ou se faire accompagner par une agence ? La reponse depend de trois facteurs : la complexite de votre processus de vente, les ressources internes disponibles et le cout d&apos;opportunite du temps passe.
                    </p>
                    <p>
                      Soyons honnetes : un onboarding HubSpot CRM basique (plan gratuit ou Starter, equipe de 2-5 personnes, processus simple) peut tout a fait etre realise en interne en suivant ce guide. HubSpot propose par ailleurs un onboarding gratuit avec les plans Pro et Enterprise. Mais des que la complexite augmente (plusieurs pipelines, integrations multiples, migration de donnees volumineuse, equipe de plus de 10 personnes), l&apos;accompagnement par un partenaire HubSpot change fondamentalement la donne.
                    </p>
                  </div>

                  {/* Comparison table */}
                  <div className="rounded-lg border border-[#EAEAEA] overflow-hidden mb-5">
                    <div className="grid grid-cols-3">
                      <div className="p-3 bg-[#F9F9F9] border-b border-r border-[#EAEAEA]">
                        <span className="text-[10px] font-semibold text-[#999] uppercase">Critere</span>
                      </div>
                      <div className="p-3 bg-[#F9F9F9] border-b border-r border-[#EAEAEA] text-center">
                        <span className="text-[10px] font-semibold text-[#999] uppercase">Onboarding seul</span>
                      </div>
                      <div className="p-3 bg-[#FFF5F0] border-b border-[#EAEAEA] text-center">
                        <span className="text-[10px] font-semibold text-[#FF7A59] uppercase">Avec une agence</span>
                      </div>
                    </div>
                    {[
                      { critere: "Duree moyenne", seul: "6-10 semaines", agence: "3-4 semaines" },
                      { critere: "Temps interne mobilise", seul: "80-120 heures", agence: "20-30 heures" },
                      { critere: "Qualite de configuration", seul: "Variable", agence: "Best practices des le depart" },
                      { critere: "Risk d&apos;erreurs de configuration", seul: "Eleve (pas d&apos;experience)", agence: "Faible (experience multi-clients)" },
                      { critere: "Formation equipe", seul: "Autodidacte (Academy)", agence: "Personnalisee et contextualisee" },
                      { critere: "Adoption a J+90", seul: "40-60%", agence: "75-90%" },
                      { critere: "Cout", seul: "0 EUR (mais cout d&apos;opportunite)", agence: "2 000-8 000 EUR selon le perimetre" },
                      { critere: "ROI a 6 mois", seul: "Incertain", agence: "Mesurable et generalement positif" },
                    ].map((row, i) => (
                      <div key={i} className="grid grid-cols-3 border-b border-[#F2F2F2] last:border-0">
                        <div className="p-3 border-r border-[#F2F2F2]">
                          <span className="text-[11px] text-[#555]" dangerouslySetInnerHTML={{ __html: row.critere }} />
                        </div>
                        <div className="p-3 border-r border-[#F2F2F2] text-center">
                          <span className="text-[11px] text-[#777]">{row.seul}</span>
                        </div>
                        <div className="p-3 text-center bg-[#FFFCFA]">
                          <span className="text-[11px] text-[#111] font-medium">{row.agence}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>
                      <strong className="text-[#111]">Le vrai calcul du ROI de l&apos;accompagnement</strong> ne se fait pas en comparant le cout de l&apos;agence a zero. Il se fait en comparant le cout de l&apos;agence au cout des erreurs evitees et du temps gagne. Un onboarding mal fait qui doit etre repris de zero coute beaucoup plus cher qu&apos;un onboarding bien fait du premier coup. Le temps que votre equipe passe a configurer HubSpot au lieu de vendre est un cout d&apos;opportunite reel. Et les 3 a 6 semaines de delai supplementaire pour atteindre la vitesse de croisiere sont autant de revenus non generes.
                    </p>
                    <p>
                      En pratique, les entreprises qui obtiennent le meilleur resultat sont celles qui combinent accompagnement externe et implication interne. L&apos;agence apporte l&apos;expertise technique, les best practices et le cadrage du projet. L&apos;equipe interne apporte la connaissance du processus de vente, la culture d&apos;entreprise et la capacite a faire adopter l&apos;outil au quotidien. Les deux sont indispensables.
                    </p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 9 : CHECKLIST 30 JOURS ============ */}
              <section id="checklist-30-jours" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">La checklist visuelle des 30 jours</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Voici la vue d&apos;ensemble de votre plan d&apos;onboarding. Chaque jalon represente un livrable concret et verifiable. Utilisez cette timeline pour suivre votre progression et vous assurer que rien n&apos;est oublie.
                  </p>

                  {/* Visual timeline */}
                  <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] overflow-hidden">
                    {/* Timeline header */}
                    <div className="bg-[#F5F5F5] border-b border-[#EAEAEA] px-4 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#111]">Timeline onboarding HubSpot -- 30 jours</span>
                        <div className="flex items-center gap-3">
                          {[
                            { label: "Pre-onboarding", color: "#999" },
                            { label: "Fondations", color: "#4B5EFC" },
                            { label: "Donnees", color: "#22C55E" },
                            { label: "Automatisation", color: "#FF7A59" },
                            { label: "Reporting", color: "#6C5CE7" },
                          ].map((l) => (
                            <div key={l.label} className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                              <span className="text-[8px] text-[#999]">{l.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Timeline visualization */}
                      <div className="relative">
                        {/* Horizontal bar */}
                        <div className="h-3 rounded-full bg-[#F0F0F0] mb-6 flex overflow-hidden">
                          <div className="h-full bg-[#999]" style={{ width: "10%" }} />
                          <div className="h-full bg-[#4B5EFC]" style={{ width: "22%" }} />
                          <div className="h-full bg-[#22C55E]" style={{ width: "23%" }} />
                          <div className="h-full bg-[#FF7A59]" style={{ width: "23%" }} />
                          <div className="h-full bg-[#6C5CE7]" style={{ width: "22%" }} />
                        </div>

                        {/* Day markers */}
                        <div className="flex justify-between mb-6 px-1">
                          {["J-5", "J1", "J7", "J14", "J21", "J30"].map((d) => (
                            <span key={d} className="text-[9px] font-medium text-[#999]">{d}</span>
                          ))}
                        </div>
                      </div>

                      {/* Milestones by phase */}
                      <div className="space-y-4">
                        {[
                          {
                            phase: "Pre-onboarding (J-5 a J-1)",
                            color: "#999",
                            milestones: [
                              "Cartographie du processus de vente",
                              "Nettoyage des fichiers de donnees",
                              "Definition des roles et permissions",
                              "Planification des sessions de formation",
                            ]
                          },
                          {
                            phase: "Semaine 1 : Fondations (J1-J7)",
                            color: "#4B5EFC",
                            milestones: [
                              "Compte cree, utilisateurs ajoutes",
                              "Domaine et tracking configures",
                              "Pipeline de vente configure",
                              "Premiere session de formation realisee",
                            ]
                          },
                          {
                            phase: "Semaine 2 : Donnees (J8-J14)",
                            color: "#22C55E",
                            milestones: [
                              "Entreprises importees et verifiees",
                              "Contacts importes et associes",
                              "Deals en cours importes dans le pipeline",
                              "Integrations email et calendrier actives",
                            ]
                          },
                          {
                            phase: "Semaine 3 : Automatisation (J15-J21)",
                            color: "#FF7A59",
                            milestones: [
                              "Templates d&apos;emails crees",
                              "Snippets configures",
                              "Sequences de prospection actives",
                              "Workflows de notification deployes",
                            ]
                          },
                          {
                            phase: "Semaine 4 : Reporting (J22-J30)",
                            color: "#6C5CE7",
                            milestones: [
                              "Dashboard commercial operationnel",
                              "Objectifs et forecasting configures",
                              "Formation finale et revue d&apos;onboarding",
                              "Conventions documentees et partagees",
                            ]
                          },
                        ].map((phase) => (
                          <div key={phase.phase} className="rounded-lg border border-[#F0F0F0] bg-white p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-3 h-3 rounded-full" style={{ background: phase.color }} />
                              <span className="text-[11px] font-semibold text-[#111]" dangerouslySetInnerHTML={{ __html: phase.phase }} />
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 pl-5">
                              {phase.milestones.map((m) => (
                                <div key={m} className="flex items-start gap-1.5">
                                  <div className="w-3 h-3 rounded border border-[#D1D5DB] bg-white shrink-0 mt-0.5 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-sm" style={{ background: phase.color, opacity: 0.4 }} />
                                  </div>
                                  <span className="text-[10px] text-[#666] leading-[1.4]" dangerouslySetInnerHTML={{ __html: m }} />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ SECTION 10 : POURQUOI CERES (dark section) ============ */}
              <section id="ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <h2 className="text-[17px] font-semibold text-white mb-4">Pourquoi faire appel a Ceres pour votre onboarding HubSpot</h2>

                  <div className="space-y-3 text-[13px] text-[#999] leading-[1.75] mb-6">
                    <p>
                      Chez Ceres, nous sommes partenaires HubSpot et specialistes RevOps. Ce qui nous differencie d&apos;une agence web classique qui &ldquo;fait aussi du HubSpot&rdquo;, c&apos;est que HubSpot est notre coeur de metier. Chaque membre de notre equipe est certifie HubSpot et travaille quotidiennement sur la plateforme. Nous avons deploye HubSpot chez des dizaines d&apos;entreprises B2B, de la startup de 5 personnes a la PME de 200 collaborateurs.
                    </p>
                    <p>
                      Notre methodologie d&apos;onboarding en 30 jours est le fruit de cette experience terrain. Elle a ete testee, iteree et perfectionnee au fil des projets. Chaque etape est documentee, chaque livrable est mesurable, et chaque decision de configuration est justifiee par les best practices de l&apos;ecosysteme HubSpot.
                    </p>
                  </div>

                  {/* Methodology steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {[
                      { step: "01", title: "Audit & strategie", desc: "Analyse de votre processus commercial, de vos donnees existantes et de vos objectifs. Definition du perimetre d&apos;onboarding et du calendrier.", color: "#4B5EFC" },
                      { step: "02", title: "Configuration technique", desc: "Mise en place du portail HubSpot selon les best practices : pipeline, proprietes, permissions, integrations, domaine et tracking.", color: "#22C55E" },
                      { step: "03", title: "Migration & donnees", desc: "Import et nettoyage des donnees. Deduplication. Associations contacts-entreprises-deals. Controle qualite complet.", color: "#FF7A59" },
                      { step: "04", title: "Automatisation & reporting", desc: "Deploiement des workflows, sequences, templates. Creation des dashboards et rapports. Configuration des objectifs.", color: "#6C5CE7" },
                      { step: "05", title: "Formation & adoption", desc: "3 sessions de formation adaptees par role (commercial, manager, admin). Documentation des conventions. Support pendant 30 jours.", color: "#4B5EFC" },
                      { step: "06", title: "Suivi & optimisation", desc: "Audit qualite a J+60. Ajustements des configurations. Recommandations d&apos;amelioration. Support continu disponible.", color: "#22C55E" },
                    ].map((s) => (
                      <div key={s.step} className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[12px] font-bold" style={{ color: s.color }}>{s.step}</span>
                          <span className="text-[12px] font-semibold text-white">{s.title}</span>
                        </div>
                        <p className="text-[11px] text-[#888] leading-[1.6]" dangerouslySetInnerHTML={{ __html: s.desc }} />
                      </div>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4 mb-6">
                    <p className="text-[11px] font-semibold text-[#FF7A59] uppercase tracking-wider mb-3">Resultats moyens observes chez nos clients</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { val: "85%", label: "Taux d&apos;adoption a J+30" },
                        { val: "-60%", label: "Temps de saisie manuelle" },
                        { val: "+40%", label: "Visibilite sur le pipeline" },
                        { val: "3 sem.", label: "Delai moyen d&apos;onboarding" },
                      ].map((r) => (
                        <div key={r.label} className="text-center">
                          <p className="text-[20px] font-bold text-white">{r.val}</p>
                          <p className="text-[10px] text-[#888]" dangerouslySetInnerHTML={{ __html: r.label }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-[13px] text-[#999] leading-[1.7] mb-5 max-w-[500px] mx-auto">
                      Vous venez de souscrire a HubSpot ou vous envisagez de le faire ? Reservez un appel de 30 minutes avec notre equipe pour evaluer vos besoins et definir un plan d&apos;onboarding adapte a votre situation. L&apos;appel est gratuit et sans engagement.
                    </p>
                    <Link href="https://calendly.com/ceres-revops/30min" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF7A59] text-white rounded-lg text-[13px] font-medium hover:bg-[#E8694D] transition-colors">
                      Planifier un appel decouverte
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                    </Link>
                  </div>
                </div>
              </section>

              {/* Related articles */}
              <div>
                <h3 className="text-[14px] font-semibold text-[#111] mb-4">Articles complementaires</h3>
                <div className="grid gap-3">
                  {relatedArticles.map((a) => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="group flex items-center gap-4 rounded-lg border border-[#F2F2F2] p-4 hover:border-[#DDD] transition-colors">
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
