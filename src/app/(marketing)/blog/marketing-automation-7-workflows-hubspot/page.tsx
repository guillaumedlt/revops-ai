"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

/* ---------- section data ---------- */
const sections = [
  { id: "intro", label: "Introduction" },
  { id: "workflow-1", label: "Welcome series" },
  { id: "workflow-2", label: "Lead scoring" },
  { id: "workflow-3", label: "Nurturing MQL" },
  { id: "workflow-4", label: "Attribution leads" },
  { id: "workflow-5", label: "Relance devis" },
  { id: "workflow-6", label: "Re-engagement" },
  { id: "workflow-7", label: "Onboarding client" },
  { id: "synthese", label: "Synthese" },
];

/* ---------- related articles ---------- */
const relatedArticles = [
  { title: "Les 50 points a verifier dans votre audit CRM", slug: "audit-crm-checklist", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Tracker les soumissions de formulaire HubSpot dans GA4", slug: "tracker-soumissions-formulaire-hubspot-google-analytics-google-tag-manager", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "HubSpot vs Salesforce en 2026", slug: "hubspot-vs-salesforce-2026", category: "CRM & HubSpot", color: "#4B5EFC" },
];

/* ---------- JSON-LD ---------- */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Marketing automation : les 7 workflows HubSpot incontournables",
  description: "Decouvrez les 7 workflows HubSpot essentiels pour automatiser votre marketing B2B : welcome series, lead scoring, nurturing, attribution, relance, re-engagement et onboarding.",
  author: { "@type": "Person", name: "Guillaume Delachet" },
  publisher: { "@type": "Organization", name: "Ceres RevOps", url: "https://www.ceres-revops.com" },
  datePublished: "2026-03-01",
  dateModified: "2026-03-01",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/marketing-automation-7-workflows-hubspot" },
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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "10%", width: 320, height: 320, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "35%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "55%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "75%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet?url=https://www.ceres-revops.com/blog/marketing-automation-7-workflows-hubspot" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/marketing-automation-7-workflows-hubspot" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">7 workflows HubSpot</span>
            </nav>

            {/* Hero */}
            <header className="mb-12" id="intro">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">14 min</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Marketing automation : les 7 workflows HubSpot incontournables
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                En B2B, le marketing automation n&apos;est pas un luxe. C&apos;est le socle qui permet a votre equipe de scaler sans multiplier les effectifs. HubSpot propose un moteur de workflows puissant, mais encore faut-il savoir quels workflows mettre en place en priorite. Voici les 7 workflows que toute entreprise B2B devrait avoir dans son portail HubSpot, avec pour chacun : le declencheur, les actions, les KPIs a suivre et les erreurs a eviter.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                <span>1 mars 2026</span>
              </div>
            </header>

            {/* Intro context card */}
            <section className="mb-8">
              <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi automatiser avec HubSpot ?</h2>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Selon HubSpot, les entreprises qui utilisent le marketing automation generent 2x plus de leads qualifies que celles qui n&apos;en utilisent pas. Plus important encore : elles reduisent de 30% le temps passe par leurs equipes sur des taches repetitives (envoi d&apos;emails, qualification manuelle, attribution de leads).
                </p>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Le probleme, c&apos;est que la plupart des portails HubSpot que nous auditons chez Ceres ont soit zero workflow, soit des workflows mal configures qui tournent dans le vide. Le resultat : des leads qui tombent entre les mailles du filet, des commerciaux qui perdent du temps sur des taches manuelles, et un pipeline qui stagne.
                </p>
                <p className="text-[13px] text-[#555] leading-[1.75]">
                  Les 7 workflows presentes dans cet article couvrent l&apos;integralite du cycle de vie B2B : de la premiere interaction avec un prospect jusqu&apos;a l&apos;onboarding d&apos;un nouveau client. Chacun a ete teste et optimise sur des dizaines de portails HubSpot clients.
                </p>
              </div>
            </section>

            <Connector />

            <article>
              {/* ============ WORKFLOW 1 ============ */}
              <section id="workflow-1" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] border-l-4 border-l-[#4B5EFC]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#4B5EFC]/10 text-[#4B5EFC] text-[14px] font-bold">1</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Welcome series (sequence de bienvenue)</h2>
                  </div>

                  <p className="text-[13px] text-[#555] leading-[1.75] mb-4">
                    Le premier workflow a mettre en place, sans exception. Quand un nouveau contact entre dans votre CRM (via un formulaire, une inscription newsletter, un telechargement de contenu), il doit immediatement recevoir une sequence d&apos;emails qui presente votre entreprise, votre proposition de valeur et vos contenus cles.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Sans welcome series, vous laissez le contact dans le noir. Il a fait l&apos;effort de vous donner ses coordonnees, il attend quelque chose en retour. Un contact qui ne recoit rien dans les 24 premieres heures a 80% de chances de vous oublier.
                  </p>

                  {/* Workflow diagram */}
                  <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4 mb-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-3">Flux du workflow</p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-3 py-1.5 rounded-md bg-[#4B5EFC] text-white font-medium">Declencheur : nouveau contact cree</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Delai : immediat</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Email 1 : bienvenue + proposition de valeur</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Delai : 2 jours</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Email 2 : contenu phare (guide, etude de cas)</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Delai : 3 jours</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Email 3 : temoignage client + CTA demo</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-5">
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Declencheur</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Contact cree pour la premiere fois dans HubSpot (via formulaire, import ou integration). Condition d&apos;exclusion : contacts existants re-importes, contacts internes.</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Actions</p>
                      <ul className="text-[13px] text-[#555] leading-[1.75] space-y-1 list-disc pl-4">
                        <li>Envoyer email de bienvenue avec presentation de l&apos;entreprise</li>
                        <li>Attendre 2 jours, envoyer le contenu phare (guide, livre blanc ou etude de cas)</li>
                        <li>Attendre 3 jours, envoyer un temoignage client avec un CTA vers une demo ou un appel</li>
                        <li>Mettre a jour la propriete &quot;Lifecycle stage&quot; en &quot;Lead&quot; si elle n&apos;est pas deja definie</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Objectif du workflow</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Etablir la relation avec le prospect, positionner votre expertise et generer un premier engagement mesurable (clic, reponse, demande de demo).</p>
                    </div>
                  </div>

                  {/* KPI impact */}
                  <div className="rounded-lg bg-[#F7F7FF] border border-[#E8E8F8] p-4">
                    <p className="text-[11px] font-semibold text-[#4B5EFC] uppercase tracking-wider mb-2">Impact attendu</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">+45%</p>
                        <p className="text-[10px] text-[#999]">Taux d&apos;ouverture vs emails ponctuels</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">+30%</p>
                        <p className="text-[10px] text-[#999]">Engagement dans les 7 premiers jours</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">3x</p>
                        <p className="text-[10px] text-[#999]">Plus de chances de conversion en MQL</p>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="mt-4 p-3 rounded-lg bg-[#FFFBF5] border border-[#F5E6D0]">
                    <p className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-wider mb-1">Conseil</p>
                    <p className="text-[12px] text-[#8B6914] leading-[1.65]">Personnalisez l&apos;email 1 en fonction de la source d&apos;acquisition. Un contact qui vient d&apos;un webinar ne doit pas recevoir le meme email qu&apos;un contact qui a telecharge un ebook. Utilisez les branches if/then de HubSpot pour segmenter.</p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ WORKFLOW 2 ============ */}
              <section id="workflow-2" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] border-l-4 border-l-[#22C55E]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#22C55E]/10 text-[#22C55E] text-[14px] font-bold">2</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Lead scoring automatique</h2>
                  </div>

                  <p className="text-[13px] text-[#555] leading-[1.75] mb-4">
                    Le lead scoring est le mecanisme qui permet a vos equipes marketing et commerciales de parler le meme langage. Sans scoring, vos commerciaux passent la moitie de leur temps a trier des leads non qualifies. Avec un scoring bien configure, seuls les contacts qui ont atteint un seuil de maturite suffisant sont transmis aux ventes.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    HubSpot permet de construire un score base sur deux dimensions : les proprietes demographiques (taille d&apos;entreprise, secteur, poste) et les signaux comportementaux (pages visitees, emails ouverts, formulaires soumis). Le workflow met a jour le score en continu et declenche les actions appropriees quand un seuil est atteint.
                  </p>

                  {/* Workflow diagram */}
                  <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4 mb-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-3">Flux du workflow</p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-3 py-1.5 rounded-md bg-[#22C55E] text-white font-medium">Declencheur : propriete modifiee ou activite enregistree</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Calcul du score demographique</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Calcul du score comportemental</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Si score &gt; 50 : passer en MQL</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Notification equipe commerciale</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Declencheur</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Modification d&apos;une propriete de contact (taille d&apos;entreprise, secteur, poste) ou enregistrement d&apos;une activite (visite page pricing, ouverture email, soumission formulaire, clic CTA).</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Actions</p>
                      <ul className="text-[13px] text-[#555] leading-[1.75] space-y-1 list-disc pl-4">
                        <li>Attribuer des points demographiques : +10 pour le bon secteur, +15 pour la bonne taille d&apos;entreprise, +20 pour un poste decision-maker</li>
                        <li>Attribuer des points comportementaux : +5 par visite de page, +10 par email ouvert, +25 pour une visite de la page pricing, +30 pour une soumission de formulaire</li>
                        <li>Mettre a jour la propriete &quot;HubSpot Score&quot; avec le total</li>
                        <li>Si score depasse 50 : changer le lifecycle stage en &quot;MQL&quot;</li>
                        <li>Si score depasse 80 : notifier le commercial assigne par email et Slack</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Objectif du workflow</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Identifier automatiquement les contacts les plus susceptibles de convertir et les transmettre aux commerciaux au bon moment, ni trop tot (lead froid) ni trop tard (lead perdu).</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#F0FFF4] border border-[#D1FAE5] p-4">
                    <p className="text-[11px] font-semibold text-[#22C55E] uppercase tracking-wider mb-2">Impact attendu</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">+35%</p>
                        <p className="text-[10px] text-[#999]">Taux de conversion MQL vers SQL</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">-50%</p>
                        <p className="text-[10px] text-[#999]">Temps perdu sur des leads non qualifies</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">+20%</p>
                        <p className="text-[10px] text-[#999]">Productivite de l&apos;equipe commerciale</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-[#FFFBF5] border border-[#F5E6D0]">
                    <p className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-wider mb-1">Conseil</p>
                    <p className="text-[12px] text-[#8B6914] leading-[1.65]">Revisez votre modele de scoring chaque trimestre. Analysez les MQL qui ont effectivement converti en clients et ajustez les poids en consequence. Un scoring qui n&apos;evolue pas devient obsolete en 6 mois.</p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ WORKFLOW 3 ============ */}
              <section id="workflow-3" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] border-l-4 border-l-[#FF7A59]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FF7A59]/10 text-[#FF7A59] text-[14px] font-bold">3</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Nurturing MQL (sequence educative)</h2>
                  </div>

                  <p className="text-[13px] text-[#555] leading-[1.75] mb-4">
                    Tous les MQL ne sont pas prets a acheter immediatement. En realite, 73% des leads B2B ne sont pas prets pour la vente au moment ou ils entrent dans votre pipeline. Le workflow de nurturing prend en charge ces contacts qualifies mais pas encore murs et les accompagne avec du contenu pertinent jusqu&apos;a ce qu&apos;ils soient prets pour une conversation commerciale.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    L&apos;erreur classique : transmettre tous les MQL aux commerciaux sans distinction. Le commercial appelle, le prospect dit &quot;je ne suis pas pret&quot;, le lead est marque comme perdu. Avec un bon nurturing, ce meme contact aurait pu convertir 3 mois plus tard.
                  </p>

                  <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4 mb-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-3">Flux du workflow</p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-3 py-1.5 rounded-md bg-[#FF7A59] text-white font-medium">Declencheur : lifecycle stage = MQL</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Condition : pas de deal ouvert</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Email 1 : article de fond (J+0)</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Email 2 : etude de cas (J+5)</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Email 3 : comparatif (J+12)</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Email 4 : invitation demo (J+20)</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Declencheur</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Le lifecycle stage du contact passe a &quot;MQL&quot;. Condition supplementaire : aucun deal ouvert associe au contact (pour ne pas interrompre un cycle de vente en cours).</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Actions</p>
                      <ul className="text-[13px] text-[#555] leading-[1.75] space-y-1 list-disc pl-4">
                        <li>Envoyer un article de fond sur la problematique cle du prospect (J+0)</li>
                        <li>Envoyer une etude de cas client avec des resultats chiffres (J+5)</li>
                        <li>Envoyer un comparatif ou un guide de selection (J+12)</li>
                        <li>Envoyer une invitation a reserver une demo ou un appel strategie (J+20)</li>
                        <li>Si le contact clique sur le CTA demo : creer automatiquement un deal et notifier le commercial</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Objectif du workflow</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Eduquer progressivement le MQL, renforcer sa confiance dans votre solution et le mener naturellement vers une prise de contact commerciale.</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#FFF5F0] border border-[#FFE0D1] p-4">
                    <p className="text-[11px] font-semibold text-[#FF7A59] uppercase tracking-wider mb-2">Impact attendu</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">+25%</p>
                        <p className="text-[10px] text-[#999]">Taux de conversion MQL vers opportunite</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">-15j</p>
                        <p className="text-[10px] text-[#999]">Reduction du cycle de vente moyen</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">+40%</p>
                        <p className="text-[10px] text-[#999]">Taux d&apos;engagement sur les contenus</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-[#FFFBF5] border border-[#F5E6D0]">
                    <p className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-wider mb-1">Conseil</p>
                    <p className="text-[12px] text-[#8B6914] leading-[1.65]">Segmentez vos sequences de nurturing par persona ou par problematique. Un directeur financier ne consomme pas le meme contenu qu&apos;un directeur technique. Utilisez les proprietes de contact HubSpot pour creer des branches dans votre workflow.</p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ WORKFLOW 4 ============ */}
              <section id="workflow-4" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] border-l-4 border-l-[#8B5CF6]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6] text-[14px] font-bold">4</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Attribution de leads aux commerciaux</h2>
                  </div>

                  <p className="text-[13px] text-[#555] leading-[1.75] mb-4">
                    L&apos;attribution manuelle de leads est l&apos;un des plus gros gaspillages de temps en RevOps. Chaque minute passee a decider &quot;qui prend ce lead&quot; est une minute ou le prospect attend. Et un prospect qui attend, c&apos;est un prospect qui refroidit. Les etudes montrent que le taux de conversion chute de 80% si le premier contact commercial intervient plus de 5 minutes apres la demande.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Le workflow d&apos;attribution automatique elimine cette latence. Que vous utilisiez un modele round-robin (repartition equitable), une attribution par territoire geographique ou par segment de marche, HubSpot peut le gerer sans intervention humaine.
                  </p>

                  <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4 mb-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-3">Flux du workflow</p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-3 py-1.5 rounded-md bg-[#8B5CF6] text-white font-medium">Declencheur : lifecycle stage = SQL</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Branche : region du contact</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Attribution round-robin par equipe</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Creation de tache : premier appel</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Notification Slack + email</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Declencheur</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Le contact atteint le statut SQL (via le lead scoring ou une action manuelle). Alternative : soumission d&apos;un formulaire de demande de demo ou de contact commercial.</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Actions</p>
                      <ul className="text-[13px] text-[#555] leading-[1.75] space-y-1 list-disc pl-4">
                        <li>Verifier la region/le pays du contact pour determiner l&apos;equipe competente</li>
                        <li>Attribuer le contact owner via rotation round-robin au sein de l&apos;equipe</li>
                        <li>Creer automatiquement un deal dans le pipeline avec les informations du contact</li>
                        <li>Creer une tache &quot;Premier appel de qualification&quot; avec echeance J+1</li>
                        <li>Envoyer une notification au commercial par email et Slack avec le contexte du lead</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Objectif du workflow</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Show less le temps de premier contact a moins de 5 minutes et garantir une repartition equitable de la charge entre les commerciaux.</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#F5F3FF] border border-[#E5DEFF] p-4">
                    <p className="text-[11px] font-semibold text-[#8B5CF6] uppercase tracking-wider mb-2">Impact attendu</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">&lt;5min</p>
                        <p className="text-[10px] text-[#999]">Temps de premier contact commercial</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">+60%</p>
                        <p className="text-[10px] text-[#999]">Taux de prise de rendez-vous</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">0</p>
                        <p className="text-[10px] text-[#999]">Leads non attribues (vs 15% en moyenne)</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-[#FFFBF5] border border-[#F5E6D0]">
                    <p className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-wider mb-1">Conseil</p>
                    <p className="text-[12px] text-[#8B6914] leading-[1.65]">Prevoyez un mecanisme de fallback : si le commercial attribue ne traite pas le lead sous 24h, le workflow doit re-attribuer le lead au manager ou au commercial suivant dans la rotation. Aucun lead ne doit rester sans suite.</p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ WORKFLOW 5 ============ */}
              <section id="workflow-5" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] border-l-4 border-l-[#F59E0B]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] text-[14px] font-bold">5</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Relance devis et proposition</h2>
                  </div>

                  <p className="text-[13px] text-[#555] leading-[1.75] mb-4">
                    Un devis envoye et non relance est un devis perdu. C&apos;est aussi simple que cela. Pourtant, 48% des commerciaux n&apos;effectuent aucune relance apres l&apos;envoi d&apos;une proposition. Le workflow de relance automatique garantit que chaque proposition commerciale fait l&apos;objet d&apos;un suivi systematique, sans que le commercial ait a y penser.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Ce workflow se declenche quand un deal entre dans une etape specifique du pipeline (typiquement &quot;Proposition envoyee&quot; ou &quot;Devis envoye&quot;) et orchestre une sequence de relances espacees dans le temps, avec une escalade si le prospect ne repond pas.
                  </p>

                  <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4 mb-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-3">Flux du workflow</p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-3 py-1.5 rounded-md bg-[#F59E0B] text-white font-medium">Declencheur : deal stage = Proposition envoyee</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Delai : 3 jours</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Email 1 : relance douce</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Delai : 5 jours</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Tache : appel de suivi</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Delai : 7 jours</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Email 2 : derniere relance + urgence</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Declencheur</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Le deal passe dans l&apos;etape &quot;Proposition envoyee&quot; ou &quot;Devis envoye&quot; du pipeline. Condition d&apos;arret : le deal avance vers une autre etape (signe que le prospect a repondu).</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Actions</p>
                      <ul className="text-[13px] text-[#555] leading-[1.75] space-y-1 list-disc pl-4">
                        <li>Attendre 3 jours puis envoyer un email de relance douce (&quot;Avez-vous eu le temps de consulter notre proposition ?&quot;)</li>
                        <li>Attendre 5 jours supplementaires puis creer une tache d&apos;appel pour le commercial</li>
                        <li>Attendre 7 jours supplementaires puis envoyer un dernier email avec un element d&apos;urgence (disponibilite limitee, fin de tarif preferentiel)</li>
                        <li>Si toujours pas de reponse apres 21 jours : notifier le manager et deplacer le deal en &quot;Stalled&quot;</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Objectif du workflow</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Maximiser le taux de closing des propositions envoyees en maintenant un suivi systematique et en evitant que des deals tombent dans l&apos;oubli.</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#FFFBEB] border border-[#FDE68A] p-4">
                    <p className="text-[11px] font-semibold text-[#F59E0B] uppercase tracking-wider mb-2">Impact attendu</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">+22%</p>
                        <p className="text-[10px] text-[#999]">Taux de closing des propositions</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">-8j</p>
                        <p className="text-[10px] text-[#999]">Reduction du temps de decision</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">100%</p>
                        <p className="text-[10px] text-[#999]">Propositions avec suivi (vs 52%)</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-[#FFFBF5] border border-[#F5E6D0]">
                    <p className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-wider mb-1">Conseil</p>
                    <p className="text-[12px] text-[#8B6914] leading-[1.65]">Configurez une condition d&apos;arret (goal) sur votre workflow : si le deal change d&apos;etape, le contact sort automatiquement de la sequence de relance. Cela evite d&apos;envoyer un email de relance a un prospect qui vient de signer.</p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ WORKFLOW 6 ============ */}
              <section id="workflow-6" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] border-l-4 border-l-[#EF4444]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#EF4444]/10 text-[#EF4444] text-[14px] font-bold">6</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Re-engagement des contacts inactifs</h2>
                  </div>

                  <p className="text-[13px] text-[#555] leading-[1.75] mb-4">
                    Votre base de contacts est un actif precieux, mais elle se degrade avec le temps. En moyenne, 25 a 30% d&apos;une base B2B devient inactive chaque annee. Un contact inactif, c&apos;est un contact qui n&apos;a ouvert aucun email, visite aucune page et interagi avec aucun contenu depuis 90 jours ou plus.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Plutot que de les supprimer (et perdre tout l&apos;investissement d&apos;acquisition), un workflow de re-engagement tente de les reactiver avec un contenu specifiquement concu pour capter a nouveau leur attention. Les contacts qui ne repondent pas a cette derniere tentative sont alors nettoyes de votre base active pour ameliorer votre delivrabilite.
                  </p>

                  <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4 mb-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-3">Flux du workflow</p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-3 py-1.5 rounded-md bg-[#EF4444] text-white font-medium">Declencheur : aucune activite depuis 90 jours</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Email 1 : &quot;Vous nous manquez&quot;</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Delai : 7 jours</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Si ouverture : retour au nurturing</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Sinon : email final + nettoyage</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Declencheur</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Date de derniere activite du contact superieure a 90 jours. Criteres d&apos;activite : ouverture d&apos;email, visite de page, clic sur un lien, soumission de formulaire. Exclure les clients actifs et les contacts en cours de negociation.</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Actions</p>
                      <ul className="text-[13px] text-[#555] leading-[1.75] space-y-1 list-disc pl-4">
                        <li>Envoyer un email de re-engagement avec un objet accrocheur et un contenu exclusif (nouveau guide, nouveautes produit, invitation webinar)</li>
                        <li>Attendre 7 jours et verifier si le contact a interagi</li>
                        <li>Si oui : remettre le contact dans le workflow de nurturing standard et reinitialiser le score</li>
                        <li>Si non : envoyer un dernier email (&quot;Souhaitez-vous rester inscrit ?&quot;) avec un lien de confirmation</li>
                        <li>Apres 7 jours supplementaires sans reaction : marquer comme &quot;Non engage&quot; et exclure des campagnes marketing</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Objectif du workflow</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Reactiver les contacts dormants et nettoyer la base des contacts definitivement perdus pour ameliorer la delivrabilite et la qualite des metriques marketing.</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#FEF2F2] border border-[#FECACA] p-4">
                    <p className="text-[11px] font-semibold text-[#EF4444] uppercase tracking-wider mb-2">Impact attendu</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">10-15%</p>
                        <p className="text-[10px] text-[#999]">Taux de reactivation des contacts inactifs</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">+12%</p>
                        <p className="text-[10px] text-[#999]">Amelioration de la delivrabilite globale</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">-25%</p>
                        <p className="text-[10px] text-[#999]">Reduction de la base inactive</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-[#FFFBF5] border border-[#F5E6D0]">
                    <p className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-wider mb-1">Conseil</p>
                    <p className="text-[12px] text-[#8B6914] leading-[1.65]">Ne supprimez pas les contacts inactifs de HubSpot. Marquez-les avec une propriete dediee et excluez-les de vos listes actives. Vous conservez ainsi l&apos;historique et pouvez les reactiver plus tard si necessaire.</p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* ============ WORKFLOW 7 ============ */}
              <section id="workflow-7" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] border-l-4 border-l-[#06B6D4]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#06B6D4]/10 text-[#06B6D4] text-[14px] font-bold">7</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Onboarding client (post-signature)</h2>
                  </div>

                  <p className="text-[13px] text-[#555] leading-[1.75] mb-4">
                    L&apos;onboarding est le moment le plus critique de la relation client. Un client mal onboarde a 3 fois plus de chances de churner dans les 90 premiers jours. Pourtant, la majorite des entreprises B2B gerent l&apos;onboarding de maniere artisanale : un email de bienvenue envoye a la main, un appel de lancement planifie quand le CSM y pense, et c&apos;est tout.
                  </p>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">
                    Le workflow d&apos;onboarding automatise les etapes recurrentes du processus : emails de bienvenue, envoi de documentation, creation des taches pour l&apos;equipe Customer Success, rappels de formation et collecte de feedback. Le CSM peut ainsi se concentrer sur la relation humaine plutot que sur la logistique.
                  </p>

                  <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4 mb-5">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-3">Flux du workflow</p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="px-3 py-1.5 rounded-md bg-[#06B6D4] text-white font-medium">Declencheur : deal stage = Closed Won</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Lifecycle stage = Customer</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Email de bienvenue client</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Tache CSM : kick-off (J+2)</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Email formation (J+7)</span>
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-[#CCC] shrink-0"><path d="M0 4h14M11 1l3 3-3 3" stroke="currentColor" strokeWidth="1.2" /></svg>
                      <span className="px-3 py-1.5 rounded-md bg-white border border-[#EAEAEA] text-[#555]">Enquete satisfaction (J+30)</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Declencheur</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Le deal passe en &quot;Closed Won&quot; dans HubSpot. Le workflow s&apos;applique a tous les contacts associes au deal.</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Actions</p>
                      <ul className="text-[13px] text-[#555] leading-[1.75] space-y-1 list-disc pl-4">
                        <li>Mettre a jour le lifecycle stage en &quot;Customer&quot; pour tous les contacts associes</li>
                        <li>Envoyer un email de bienvenue client avec les prochaines etapes, la documentation et les contacts support</li>
                        <li>Creer une tache pour le CSM : &quot;Planifier le kick-off call&quot; avec echeance J+2</li>
                        <li>Envoyer un email de formation/tutoriel a J+7 avec les ressources pour demarrer</li>
                        <li>Envoyer une enquete de satisfaction NPS a J+30 pour mesurer la qualite de l&apos;onboarding</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-1">Objectif du workflow</p>
                      <p className="text-[13px] text-[#555] leading-[1.75]">Structurer les 30 premiers jours de la relation client pour maximiser l&apos;adoption du produit, reduire le churn precoce et poser les bases d&apos;un upsell futur.</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#ECFEFF] border border-[#CFFAFE] p-4">
                    <p className="text-[11px] font-semibold text-[#06B6D4] uppercase tracking-wider mb-2">Impact attendu</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">-40%</p>
                        <p className="text-[10px] text-[#999]">Churn dans les 90 premiers jours</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">+55%</p>
                        <p className="text-[10px] text-[#999]">Score NPS post-onboarding</p>
                      </div>
                      <div>
                        <p className="text-[18px] font-bold text-[#111]">2x</p>
                        <p className="text-[10px] text-[#999]">Plus de chances d&apos;upsell a 6 mois</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-[#FFFBF5] border border-[#F5E6D0]">
                    <p className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-wider mb-1">Conseil</p>
                    <p className="text-[12px] text-[#8B6914] leading-[1.65]">Adaptez la duree et la complexite de l&apos;onboarding en fonction du deal amount. Un client a 50K EUR/an merite un onboarding plus personnalise qu&apos;un client a 5K EUR/an. Utilisez les branches if/then de HubSpot pour creer des parcours differencies.</p>
                  </div>
                </div>
              </section>
            </article>

            <Connector />

            {/* ============ SYNTHESE ============ */}
            <section id="synthese" className="mb-8">
              <div className="rounded-lg bg-[#111] p-5 md:p-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Synthese</span>
                <h2 className="text-[17px] font-semibold text-white mb-4">Les 7 workflows en un coup d&apos;oeil</h2>
                <p className="text-[13px] text-white/50 leading-[1.75] mb-5">
                  Ces 7 workflows couvrent l&apos;integralite du cycle de vie B2B : acquisition, qualification, conversion, retention. Mis en place correctement, ils permettent a une equipe de 5 personnes de gerer le meme volume qu&apos;une equipe de 10, sans perte de qualite.
                </p>
                <div className="space-y-2.5">
                  {[
                    { num: "1", name: "Welcome series", result: "+45% taux d\u2019ouverture" },
                    { num: "2", name: "Lead scoring", result: "+35% conversion MQL vers SQL" },
                    { num: "3", name: "Nurturing MQL", result: "+25% conversion vers opportunite" },
                    { num: "4", name: "Attribution leads", result: "<5 min de temps de premier contact" },
                    { num: "5", name: "Relance devis", result: "+22% taux de closing" },
                    { num: "6", name: "Re-engagement", result: "10-15% de contacts reactives" },
                    { num: "7", name: "Onboarding client", result: "-40% churn precoce" },
                  ].map((w) => (
                    <div key={w.num} className="flex items-center gap-3 text-[12px]">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <span className="text-white/80 font-medium">{w.num}. {w.name}</span>
                      <span className="text-white/40">-</span>
                      <span className="text-white/50">{w.result}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[13px] text-white/50 leading-[1.75] mt-5">
                  L&apos;ordre de mise en place recommande : commencez par le lead scoring (workflow 2) et la welcome series (workflow 1), qui sont les fondations. Ajoutez ensuite l&apos;attribution (workflow 4) et le nurturing (workflow 3). Enfin, mettez en place les relances (workflow 5), le re-engagement (workflow 6) et l&apos;onboarding (workflow 7).
                </p>
                <p className="text-[13px] text-white/50 leading-[1.75] mt-3">
                  La cle du succes : ne pas tout lancer en meme temps. Implementez un workflow par semaine, testez-le, mesurez les resultats, puis passez au suivant. En 2 mois, vous aurez une machine marketing completement automatisee.
                </p>
              </div>
            </section>

            {/* Aller plus loin */}
            <section className="mb-8">
              <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[17px] font-semibold text-[#111] mb-4">Aller plus loin avec l&apos;IA</h2>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Les workflows HubSpot sont puissants, mais ils restent bases sur des regles statiques. La prochaine etape, c&apos;est d&apos;ajouter une couche d&apos;intelligence artificielle pour rendre ces workflows dynamiques.
                </p>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Chez Ceres, nous utilisons des agents IA (Claude) connectes directement a HubSpot pour analyser en temps reel la performance de chaque workflow, ajuster les scores de lead scoring, personnaliser le contenu des sequences de nurturing et predire quels deals ont le plus de chances de closer.
                </p>
                <p className="text-[13px] text-[#555] leading-[1.75]">
                  Le resultat : des workflows qui s&apos;optimisent en continu, sans intervention humaine. C&apos;est le passage du marketing automation au marketing intelligent.
                </p>
              </div>
            </section>

            {/* Related */}
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
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour vos workflows HubSpot ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On configure et optimise vos 7 workflows HubSpot en 2 semaines. Audit, implementation et suivi des KPIs inclus.</p>
                <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                  <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}