"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "HubSpot vs Salesforce : le comparatif honnete en 2026",
  description: "Comparaison detaillee HubSpot vs Salesforce en 2026 : interface, fonctionnalites CRM, marketing automation, reporting, workflows, integrations, implementation, prix, scalabilite. Avec des mockups d'interface et un tableau de 20+ criteres. Guide complet pour faire le bon choix.",
  author: { "@type": "Person", name: "Guillaume Delachet" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  datePublished: "2026-03-20",
  dateModified: "2026-03-20",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/hubspot-vs-salesforce-comparatif" },
  articleSection: "CRM & HubSpot",
  wordCount: 3500,
  inLanguage: "fr",
};

const sections = [
  { id: "deux-visions", title: "Deux geants, deux visions" },
  { id: "interface-ux", title: "Interface et UX" },
  { id: "fonctionnalites-crm", title: "Fonctionnalites CRM" },
  { id: "marketing-automation", title: "Marketing automation" },
  { id: "reporting", title: "Reporting et analytics" },
  { id: "automatisation", title: "Automatisation et workflows" },
  { id: "integrations", title: "Integrations et ecosysteme" },
  { id: "implementation", title: "Implementation et time-to-value" },
  { id: "prix", title: "Prix : le vrai comparatif" },
  { id: "scalabilite", title: "Scalabilite" },
  { id: "tableau-comparatif", title: "Tableau comparatif global" },
  { id: "verdict", title: "Notre verdict" },
];

const relatedArticles = [
  { title: "HubSpot vs Pipedrive : comparatif complet prix et fonctionnalites", slug: "hubspot-vs-pipedrive-comparatif-prix-fonctionnalites", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "CRM pour PME en 2026 : le guide pour bien choisir", slug: "crm-pme-2026", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "9 actions commerciales que vous devriez automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "Automatisation", color: "#FF7A59" },
];

export default function HubSpotVsSalesforceArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("deux-visions");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "24%", width: 260, height: 260, borderRadius: "50%", background: "#00A1E0", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "38%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "52%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "66%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "80%", width: 240, height: 240, borderRadius: "50%", background: "#00A1E0", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "92%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.07, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet?text=HubSpot%20vs%20Salesforce%20comparatif%20honnete%202026&url=https://www.ceres-revops.com/blog/hubspot-vs-salesforce-comparatif" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/hubspot-vs-salesforce-comparatif" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">HubSpot vs Salesforce</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">18 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                HubSpot vs Salesforce : le comparatif honnete en 2026
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Deux titans du CRM, deux philosophies radicalement differentes. HubSpot mise sur la simplicite et l&apos;experience all-in-one. Salesforce mise sur la puissance et la personnalisation infinie. On a deploye les deux en production chez nos clients B2B. Pas de parti pris, pas de lien d&apos;affiliation : voici notre comparatif honnete, critere par critere, avec des mockups d&apos;interface et un tableau de 20+ dimensions pour vous aider a faire le bon choix.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>20 mars 2026</span>
              </div>
            </header>

            <article>
              {/* ================================================================ */}
              {/* Section 1 : Deux geants, deux visions */}
              {/* ================================================================ */}
              <section id="deux-visions" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-5 h-5" />
                    <img src="https://www.google.com/s2/favicons?domain=salesforce.com&sz=32" alt="Salesforce" className="w-5 h-5" />
                    <h2 className="text-[17px] font-semibold text-[#111]">Deux geants, deux visions du CRM</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Comparer HubSpot et Salesforce, c&apos;est comparer deux ecoles de pensee sur ce que devrait etre un CRM. Les deux dominent le marche mondial, mais leurs origines, leur ADN et leur public cible sont fondamentalement differents. Comprendre cette difference philosophique est indispensable avant de rentrer dans le detail des fonctionnalites et des prix.</p>
                    <p><strong className="text-[#111]">HubSpot</strong> est ne en 2006 comme une plateforme d&apos;inbound marketing. L&apos;idee fondatrice de Brian Halligan et Dharmesh Shah etait simple : les entreprises doivent attirer les clients via du contenu utile plutot que de les interrompre par de la prospection agressive. Le CRM gratuit est arrive en 2014, comme un socle pour connecter marketing, ventes et service client dans une seule plateforme. En 2026, HubSpot est une plateforme complete avec six hubs (Marketing, Sales, Service, CMS, Operations, Commerce) qui communiquent nativement entre eux. Son obsession : que chaque utilisateur puisse etre operationnel rapidement, sans avoir besoin d&apos;un consultant pour configurer l&apos;outil.</p>
                    <p><strong className="text-[#111]">Salesforce</strong> a ete fonde en 1999 par Marc Benioff avec une vision revolutionnaire pour l&apos;epoque : le logiciel en tant que service (SaaS). Salesforce a littéralement invente le modele cloud CRM. Vingt-sept ans plus tard, c&apos;est un ecosysteme colossal avec plus de 150 000 clients, des milliards de transactions quotidiennes et une plateforme (Lightning Platform) qui permet de construire pratiquement n&apos;importe quelle application metier. Son obsession : la flexibilite absolue. Chaque objet, chaque champ, chaque processus peut etre personnalise, automatise et etendu. Il n&apos;y a quasiment aucune limite a ce que vous pouvez construire sur Salesforce.</p>
                    <p>Cette difference d&apos;ADN cree un paradoxe interessant. HubSpot est plus facile a utiliser mais moins flexible. Salesforce est infiniment personnalisable mais exige un investissement significatif en temps, en argent et en expertise technique. Ni l&apos;un ni l&apos;autre n&apos;a tort. Le bon choix depend de votre taille, de votre complexite operationnelle et de vos ambitions de croissance.</p>
                    <p>Precision importante : nous sommes partenaires HubSpot chez Ceres, et nous le disons ouvertement. Mais nous avons aussi deploye Salesforce chez des clients ou c&apos;etait le bon choix. Cet article reflete notre experience terrain, pas un discours commercial.</p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">HubSpot</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#FF7A59]/10 text-[#FF7A59]">Ease + All-in-one</span>
                      </div>
                      <ul className="space-y-1.5">
                        {["Plateforme unifiee (6 hubs natifs)", "UX intuitive, adoption rapide", "CRM gratuit genereux", "Inbound-first, contenu et SEO", "Marketplace 1 700+ integrations", "Cible : startup a ETI (2-2 000 users)"].map((i) => (
                          <li key={i} className="text-[11px] text-[#777] leading-[1.5] flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />{i}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=salesforce.com&sz=32" alt="Salesforce" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Salesforce</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#00A1E0]/10 text-[#00A1E0]">Power + Customization</span>
                      </div>
                      <ul className="space-y-1.5">
                        {["Personnalisation quasi-illimitee", "Lightning Platform (low-code)", "AppExchange 7 000+ apps", "Einstein AI et Agentforce", "Ecosysteme de consultants massif", "Cible : PME a grand groupe (5-100 000+ users)"].map((i) => (
                          <li key={i} className="text-[11px] text-[#777] leading-[1.5] flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#00A1E0] mt-1.5 shrink-0" />{i}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Key stats */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { stat: "228K+", label: "clients HubSpot dans le monde", color: "#FF7A59" },
                      { stat: "150K+", label: "clients Salesforce dans le monde", color: "#00A1E0" },
                      { stat: "73%", label: "du marche CRM cloud domine par les deux", color: "#4B5EFC" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-lg border border-[#F2F2F2] p-4 text-center">
                        <p className="text-[22px] font-bold mb-1" style={{ color: s.color }}>{s.stat}</p>
                        <p className="text-[10px] text-[#999] leading-[1.4]">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ================================================================ */}
              {/* Section 2 : Interface et experience utilisateur */}
              {/* ================================================================ */}
              <section id="interface-ux" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Interface et experience utilisateur</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>L&apos;interface est le critere le plus sous-estime dans le choix d&apos;un CRM, et pourtant c&apos;est celui qui determine si vos equipes vont reellement utiliser l&apos;outil au quotidien. Un CRM mal adopte, meme puissant, ne sert a rien. La difference d&apos;approche UX entre HubSpot et Salesforce est frappante.</p>
                    <p><strong className="text-[#111]">HubSpot</strong> a investi massivement dans le design de son interface. Chaque ecran est epure, les menus sont clairs, la navigation est logique. Un commercial non technique peut creer une fiche contact, deplacer un deal dans le pipeline et envoyer un email depuis le CRM en moins de 30 minutes sans formation. L&apos;interface est coherente entre les differents hubs : une fois que vous comprenez la logique de navigation dans le Sales Hub, vous retrouvez la meme dans le Marketing Hub ou le Service Hub.</p>
                    <p><strong className="text-[#111]">Salesforce Lightning</strong> est une interface puissante mais dense. La courbe d&apos;apprentissage est significativement plus longue. La barre de navigation, les layouts d&apos;enregistrement, les listes de vues, les composants Lightning : tout est personnalisable, ce qui est a la fois la force et la faiblesse de l&apos;outil. Un admin Salesforce competent peut creer une interface parfaitement adaptee a votre metier. Mais sans cette personnalisation, l&apos;experience par defaut peut sembler deconcertante pour un utilisateur non forme.</p>
                  </div>

                  {/* CSS Mockup : Pipeline views side by side */}
                  <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Comparaison des vues pipeline</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {/* HubSpot Pipeline Mockup */}
                    <div className="rounded-lg border border-[#F2F2F2] overflow-hidden">
                      <div className="bg-[#2D3E50] px-3 py-2 flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                        </div>
                        <span className="text-[9px] text-white/60 font-medium ml-1">HubSpot - Pipeline des ventes</span>
                      </div>
                      <div className="bg-[#F8FAFB] p-3">
                        {/* Tab bar */}
                        <div className="flex gap-2 mb-3 border-b border-[#E5E8EB]">
                          <div className="text-[8px] font-semibold text-[#FF7A59] border-b-2 border-[#FF7A59] pb-1.5 px-1">Board</div>
                          <div className="text-[8px] text-[#999] pb-1.5 px-1">Table</div>
                        </div>
                        {/* Kanban columns */}
                        <div className="flex gap-2">
                          {[
                            { stage: "Qualification", color: "#E8F0FE", deals: ["Acme Corp - 12K", "Beta SAS - 8K"] },
                            { stage: "Demo", color: "#FFF3E0", deals: ["Gamma Ltd - 25K"] },
                            { stage: "Proposition", color: "#E8F5E9", deals: ["Delta SA - 45K", "Echo Inc - 18K"] },
                            { stage: "Closing", color: "#FCE4EC", deals: ["Foxtrot - 60K"] },
                          ].map((col) => (
                            <div key={col.stage} className="flex-1 min-w-0">
                              <div className="text-[7px] font-semibold text-[#111] mb-1.5 truncate">{col.stage}</div>
                              <div className="space-y-1">
                                {col.deals.map((d) => (
                                  <div key={d} className="rounded px-1.5 py-1 text-[6px] text-[#444] font-medium truncate" style={{ background: col.color }}>{d}</div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Total bar */}
                        <div className="mt-3 pt-2 border-t border-[#E5E8EB] flex justify-between">
                          <span className="text-[7px] text-[#999]">6 deals</span>
                          <span className="text-[7px] font-semibold text-[#FF7A59]">168 000 EUR</span>
                        </div>
                      </div>
                    </div>

                    {/* Salesforce Pipeline Mockup */}
                    <div className="rounded-lg border border-[#F2F2F2] overflow-hidden">
                      <div className="bg-[#032D60] px-3 py-2 flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                        </div>
                        <span className="text-[9px] text-white/60 font-medium ml-1">Salesforce - Opportunity Kanban</span>
                      </div>
                      <div className="bg-[#F4F6F9] p-3">
                        {/* Path component */}
                        <div className="flex mb-3">
                          {["Prospecting", "Needs Analysis", "Proposal", "Negotiation", "Closed Won"].map((s, i) => (
                            <div key={s} className={`flex-1 text-center text-[6px] py-1 font-medium ${i < 2 ? "bg-[#00A1E0] text-white" : "bg-[#D8DDE6] text-[#666]"} ${i === 0 ? "rounded-l" : ""} ${i === 4 ? "rounded-r" : ""}`}>{s}</div>
                          ))}
                        </div>
                        {/* Kanban columns */}
                        <div className="flex gap-2">
                          {[
                            { stage: "Prospecting", color: "#E3F2FD", deals: ["Omega Group - $15K", "Sigma Tech - $9K"] },
                            { stage: "Needs Analysis", color: "#E0F7FA", deals: ["Lambda Corp - $32K"] },
                            { stage: "Proposal", color: "#F3E5F5", deals: ["Kappa SA - $55K", "Mu Inc - $22K"] },
                            { stage: "Negotiation", color: "#FFF8E1", deals: ["Nu Ltd - $78K"] },
                          ].map((col) => (
                            <div key={col.stage} className="flex-1 min-w-0">
                              <div className="text-[7px] font-semibold text-[#111] mb-1.5 truncate">{col.stage}</div>
                              <div className="space-y-1">
                                {col.deals.map((d) => (
                                  <div key={d} className="rounded px-1.5 py-1 text-[6px] text-[#444] font-medium truncate" style={{ background: col.color }}>{d}</div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#D8DDE6] flex justify-between">
                          <span className="text-[7px] text-[#999]">6 opportunities</span>
                          <span className="text-[7px] font-semibold text-[#00A1E0]">$211,000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CSS Mockup : Contact records side by side */}
                  <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Comparaison des fiches contact</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* HubSpot Contact Record */}
                    <div className="rounded-lg border border-[#F2F2F2] overflow-hidden">
                      <div className="bg-[#2D3E50] px-3 py-2 flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                        </div>
                        <span className="text-[9px] text-white/60 font-medium ml-1">HubSpot - Fiche contact</span>
                      </div>
                      <div className="bg-white p-3">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 rounded-full bg-[#FF7A59] flex items-center justify-center text-white text-[8px] font-bold">JD</div>
                          <div>
                            <p className="text-[9px] font-semibold text-[#111]">Jean Dupont</p>
                            <p className="text-[7px] text-[#999]">CEO - Acme Corp</p>
                          </div>
                        </div>
                        <div className="space-y-1.5 mb-3">
                          {[
                            { label: "Email", value: "jean@acme.com" },
                            { label: "Telephone", value: "+33 6 12 34 56 78" },
                            { label: "Lifecycle stage", value: "SQL" },
                            { label: "Lead score", value: "85/100" },
                          ].map((f) => (
                            <div key={f.label} className="flex justify-between">
                              <span className="text-[7px] text-[#999]">{f.label}</span>
                              <span className="text-[7px] font-medium text-[#111]">{f.value}</span>
                            </div>
                          ))}
                        </div>
                        {/* Timeline */}
                        <div className="border-t border-[#F2F2F2] pt-2">
                          <p className="text-[7px] font-semibold text-[#999] mb-1.5">Timeline</p>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
                              <span className="text-[6px] text-[#666]">Email ouvert : &ldquo;Proposition commerciale&rdquo;</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC]" />
                              <span className="text-[6px] text-[#666]">Reunion planifiee : 22 mars 14h</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                              <span className="text-[6px] text-[#666]">Page visitee : /pricing (3 fois)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Salesforce Contact Record */}
                    <div className="rounded-lg border border-[#F2F2F2] overflow-hidden">
                      <div className="bg-[#032D60] px-3 py-2 flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                        </div>
                        <span className="text-[9px] text-white/60 font-medium ml-1">Salesforce - Contact Record</span>
                      </div>
                      <div className="bg-white p-3">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 rounded-full bg-[#00A1E0] flex items-center justify-center text-white text-[8px] font-bold">JD</div>
                          <div>
                            <p className="text-[9px] font-semibold text-[#111]">Jean Dupont</p>
                            <p className="text-[7px] text-[#999]">CEO - Omega Group</p>
                          </div>
                          <div className="ml-auto">
                            <span className="text-[6px] px-1.5 py-0.5 rounded bg-[#E3F2FD] text-[#00A1E0] font-medium">Lightning</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3">
                          {[
                            { label: "Email", value: "jean@omega.com" },
                            { label: "Phone", value: "+33 6 98 76 54 32" },
                            { label: "Account", value: "Omega Group" },
                            { label: "Lead Source", value: "Website" },
                            { label: "Owner", value: "Marie Martin" },
                            { label: "Last Activity", value: "18 mars 2026" },
                          ].map((f) => (
                            <div key={f.label}>
                              <span className="text-[6px] text-[#999] block">{f.label}</span>
                              <span className="text-[7px] font-medium text-[#111]">{f.value}</span>
                            </div>
                          ))}
                        </div>
                        {/* Related lists */}
                        <div className="border-t border-[#F2F2F2] pt-2">
                          <p className="text-[7px] font-semibold text-[#999] mb-1.5">Related Lists</p>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[6px] text-[#00A1E0]">Opportunities (2)</span>
                              <span className="text-[6px] text-[#666]">$47,000</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[6px] text-[#00A1E0]">Cases (1)</span>
                              <span className="text-[6px] text-[#666]">Open</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-[6px] text-[#00A1E0]">Activities (12)</span>
                              <span className="text-[6px] text-[#666]">Last 30 days</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Le verdict UX.</strong> HubSpot est objectivement plus agreable a utiliser au quotidien. Le design est moderne, les interactions sont fluides, et la courbe d&apos;apprentissage est douce. Les equipes sont operationnelles en quelques jours. Salesforce Lightning est fonctionnel mais plus austere. La densite d&apos;information par ecran est superieure, ce qui est un avantage pour les power users mais un frein pour les utilisateurs occasionnels. En termes d&apos;adoption, HubSpot gagne systematiquement : on observe des taux d&apos;adoption de 85-95% chez nos clients HubSpot contre 60-75% chez les clients Salesforce dans les six premiers mois.</p>
                    <p>Cela dit, Salesforce compense par la personnalisation. Un admin competent peut creer des page layouts, des record types et des Lightning pages sur mesure qui surpassent l&apos;experience HubSpot par defaut. Le probleme, c&apos;est que cette personnalisation prend du temps et coute de l&apos;argent.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ================================================================ */}
              {/* Section 3 : Fonctionnalites CRM */}
              {/* ================================================================ */}
              <section id="fonctionnalites-crm" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Fonctionnalites CRM : pipeline, contacts, deals</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le coeur d&apos;un CRM, c&apos;est la gestion des contacts, des entreprises et des opportunites. Sur ce terrain, les deux outils sont excellents, mais avec des approches differentes.</p>

                    <p><strong className="text-[#111]">Gestion des contacts.</strong> HubSpot centralise tout dans une timeline unifiee : emails, appels, reunions, visites de pages, soumissions de formulaires, interactions sur les reseaux sociaux. Chaque contact est enrichi automatiquement par la base HubSpot Insights (secteur, taille de l&apos;entreprise, technologies utilisees). Le lifecycle stage (Subscriber, Lead, MQL, SQL, Opportunity, Customer) permet de suivre la progression de chaque contact dans le funnel. Salesforce offre une gestion des contacts extremement detaillee avec des record types differents selon le profil, des page layouts personnalisables et des formules de champ calculees. La relation entre Contacts, Accounts et Opportunities est plus structuree et permet des hierarchies d&apos;entreprises complexes (groupes, filiales, entites).</p>

                    <p><strong className="text-[#111]">Pipeline et deals.</strong> HubSpot permet de creer plusieurs pipelines avec des etapes personnalisees, des proprietes conditionnelles par etape et des probabilites de closing automatiques. La vue Board est intuitive et le drag-and-drop fonctionne parfaitement. Depuis 2025, les deal scores bases sur l&apos;IA predisent la probabilite de closing avec une precision remarquable. Salesforce va plus loin dans la personnalisation : les sales processes peuvent etre differents par record type, les validation rules empechent les commerciaux de deplacer un deal sans remplir les champs obligatoires, et les approval processes permettent de creer des circuits de validation pour les deals au-dessus d&apos;un certain montant. Le forecasting natif de Salesforce (avec les categories Commit, Best Case, Pipeline) est aussi plus mature que celui de HubSpot.</p>

                    <p><strong className="text-[#111]">Objets personnalises.</strong> C&apos;est un point de differenciation majeur. Salesforce permet de creer des objets custom avec des relations, des champs, des layouts et des automatisations depuis toujours. C&apos;est la base meme de la plateforme. HubSpot a introduit les objets personnalises en 2021, mais ils restent reserves au plan Enterprise et sont plus limites en termes de relations et de logique metier. Si votre entreprise a des modeles de donnees complexes (abonnements, installations, equipements, certifications), Salesforce est nettement superieur.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { critere: "Gestion des contacts", hubspot: "Timeline unifiee, enrichissement automatique, lifecycle stages. Simple et efficace pour 90% des cas.", salesforce: "Record types, page layouts, hierarchies d'entreprise, formules. Plus structure mais plus complexe a configurer.", winner: "HubSpot", winColor: "#FF7A59" },
                      { critere: "Pipeline et deals", hubspot: "Multi-pipeline, Board view intuitive, deal scoring IA. Parfait pour des cycles de vente standards.", salesforce: "Sales processes par record type, validation rules, approval processes, forecasting avance. Superieur pour les cycles complexes.", winner: "Salesforce", winColor: "#00A1E0" },
                      { critere: "Objets personnalises", hubspot: "Disponibles en Enterprise, relations limitees, pas de triggers custom. Suffisant pour des besoins simples.", salesforce: "Natifs depuis le debut, relations N-N, triggers Apex, layouts dedies. La reference absolue.", winner: "Salesforce", winColor: "#00A1E0" },
                      { critere: "Recherche et filtres", hubspot: "Filtres avances, listes actives/statiques, vues enregistrees. Interface claire mais requetes limitees.", salesforce: "SOQL, list views, reports as filters, dynamic dashboards. Puissance de requetage superieure.", winner: "Salesforce", winColor: "#00A1E0" },
                      { critere: "Gestion de territoire", hubspot: "Basique (equipes et vues). Pas de territory management natif.", salesforce: "Territory Management Enterprise natif. Hierarchies, regles d'attribution, forecasting par territoire.", winner: "Salesforce", winColor: "#00A1E0" },
                    ].map((r) => (
                      <div key={r.critere} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <p className="text-[12px] font-semibold text-[#111] flex-1">{r.critere}</p>
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${r.winColor}15`, color: r.winColor }}>Avantage {r.winner}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-3 h-3" />
                              <span className="text-[10px] font-medium text-[#111]">HubSpot</span>
                            </div>
                            <p className="text-[10px] text-[#888] leading-[1.6]">{r.hubspot}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              <img src="https://www.google.com/s2/favicons?domain=salesforce.com&sz=32" alt="Salesforce" className="w-3 h-3" />
                              <span className="text-[10px] font-medium text-[#111]">Salesforce</span>
                            </div>
                            <p className="text-[10px] text-[#888] leading-[1.6]">{r.salesforce}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ================================================================ */}
              {/* Section 4 : Marketing automation */}
              {/* ================================================================ */}
              <section id="marketing-automation" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Marketing automation : HubSpot natif vs Salesforce + Pardot/MCAE</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>C&apos;est probablement le domaine ou la difference entre les deux est la plus marquee. HubSpot a ete construit comme une plateforme marketing avant d&apos;etre un CRM. Salesforce, a l&apos;inverse, a acquis ses capacites marketing par acquisitions successives (Pardot en 2013, ExactTarget devenu Marketing Cloud en 2014).</p>

                    <p><strong className="text-[#111]">HubSpot Marketing Hub.</strong> Tout est natif et integre dans la meme plateforme. Les landing pages, les formulaires, le blog, les emails, les workflows d&apos;automatisation, le lead scoring, l&apos;attribution marketing, le SEO, les reseaux sociaux : tout communique nativement avec le CRM. Un marketeur peut creer une campagne complete (annonce, landing page, formulaire, email de nurturing, notification au commercial) sans quitter HubSpot et sans ecrire une seule ligne de code. Les donnees marketing et commerciales vivent dans la meme base, ce qui elimine les problemes de synchronisation. Le plan Marketing Hub Professional (800 EUR/mois pour 2 000 contacts marketing) est le sweet spot pour la plupart des PME B2B.</p>

                    <p><strong className="text-[#111]">Salesforce + Marketing Cloud Account Engagement (ex-Pardot).</strong> C&apos;est un outil separe de Salesforce CRM, avec sa propre interface, son propre systeme de login et sa propre logique. L&apos;integration avec Salesforce CRM est bonne mais pas native : il y a un connecteur qui synchronise les donnees entre les deux systemes, avec parfois des latences et des conflits. Pardot/MCAE est puissant pour le lead scoring, le nurturing B2B et l&apos;engagement tracking, mais l&apos;experience utilisateur est en retard sur HubSpot. La creation de landing pages et d&apos;emails est moins intuitive, et certaines fonctionnalites (A/B testing avance, attribution multi-touch) necessitent des plans superieurs. Le prix est aussi significativement plus eleve : a partir de 1 250 EUR/mois pour le plan Growth.</p>

                    <p><strong className="text-[#111]">Marketing Cloud (ex-ExactTarget).</strong> Pour les grandes entreprises avec des besoins B2C ou omnicanal (email, SMS, push, social, advertising, journeys complexes), Salesforce Marketing Cloud est une machine de guerre. Mais c&apos;est un outil completement different de MCAE, avec une courbe d&apos;apprentissage tres longue et des prix qui demarrent a plusieurs milliers d&apos;euros par mois. Ce n&apos;est pas pertinent pour la majorite des PME B2B.</p>
                  </div>

                  {/* Comparison bubbles */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-lg bg-[#FFF5F0] border border-[#FF7A59]/20 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#FF7A59]">HubSpot Marketing Hub</span>
                      </div>
                      <ul className="space-y-1.5">
                        {[
                          "Landing pages drag-and-drop (natif)",
                          "Blog et CMS integres",
                          "Formulaires et pop-ups sans code",
                          "Email marketing + A/B testing",
                          "Workflows d'automatisation visuels",
                          "Lead scoring natif",
                          "Attribution multi-touch",
                          "SEO et recommandations de contenu",
                          "Reseaux sociaux (planification, monitoring)",
                          "A partir de 800 EUR/mois (Professional)",
                        ].map((i) => (
                          <li key={i} className="text-[10px] text-[#666] leading-[1.5] flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" />{i}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg bg-[#E8F4FD] border border-[#00A1E0]/20 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=salesforce.com&sz=32" alt="Salesforce" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#00A1E0]">Salesforce MCAE (Pardot)</span>
                      </div>
                      <ul className="space-y-1.5">
                        {[
                          "Landing pages (editeur basique)",
                          "Pas de CMS natif",
                          "Formulaires et handlers",
                          "Email marketing + A/B testing",
                          "Engagement Studio (workflows)",
                          "Lead scoring et grading",
                          "Attribution B2B Analytics (add-on)",
                          "Pas de SEO natif",
                          "Pas de gestion reseaux sociaux",
                          "A partir de 1 250 EUR/mois (Growth)",
                        ].map((i) => (
                          <li key={i} className="text-[10px] text-[#666] leading-[1.5] flex items-start gap-2"><span className="w-1 h-1 rounded-full bg-[#00A1E0] mt-1.5 shrink-0" />{i}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg border border-[#22C55E]/30 bg-[#F0FDF4] p-4">
                    <p className="text-[12px] font-semibold text-[#22C55E] mb-2">Verdict marketing automation</p>
                    <p className="text-[11px] text-[#555] leading-[1.6]">HubSpot gagne largement sur le marketing automation pour les PME B2B. L&apos;experience native, la coherence de l&apos;interface et le rapport qualite/prix sont superieurs. Salesforce + MCAE est une option viable pour les entreprises deja sur Salesforce CRM qui veulent eviter une migration, mais le cout et la complexite sont plus eleves pour un resultat souvent equivalent. La seule exception : si vous avez des besoins B2C ou omnicanal avances, Marketing Cloud (pas MCAE) est plus puissant que HubSpot.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ================================================================ */}
              {/* Section 5 : Reporting et analytics */}
              {/* ================================================================ */}
              <section id="reporting" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Reporting et analytics</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Le reporting est un domaine ou les deux outils excellent, mais avec des niveaux de profondeur tres differents. HubSpot a fait d&apos;enormes progres ces dernieres annees, mais Salesforce reste la reference en matiere de reporting et d&apos;analytics CRM.</p>
                    <p><strong className="text-[#111]">HubSpot</strong> propose des dashboards preconstruits par hub (ventes, marketing, service) et un editeur de rapports custom qui permet de croiser les donnees entre les differents objets. Les rapports sont visuels, faciles a creer et a partager. Le custom report builder (Professional+) permet des jointures multi-objets et des metriques calculees. Les limites apparaissent quand on veut des rapports tres specifiques : le nombre de dimensions par rapport est limite, les formules de champ sont basiques, et il n&apos;y a pas de SQL natif.</p>
                    <p><strong className="text-[#111]">Salesforce</strong> offre un moteur de reporting nettement plus puissant. Les reports supportent des groupements multi-niveaux (summary, matrix), des formules complexes, des cross-filters et des bucket fields. Les dashboards peuvent etre dynamiques (filtres en temps reel, drill-down). Et surtout, Salesforce propose CRM Analytics (ex-Tableau CRM/Einstein Analytics), un outil de BI integre qui permet des analyses predictives, des datasets custom et des dashboards interactifs de niveau enterprise. Pour les organisations qui ont besoin de reporting avance, c&apos;est un avantage considerable.</p>
                  </div>

                  {/* CSS Mockup : Dashboard views side by side */}
                  <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Comparaison des dashboards</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* HubSpot Dashboard Mockup */}
                    <div className="rounded-lg border border-[#F2F2F2] overflow-hidden">
                      <div className="bg-[#2D3E50] px-3 py-2 flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                        </div>
                        <span className="text-[9px] text-white/60 font-medium ml-1">HubSpot - Sales Dashboard</span>
                      </div>
                      <div className="bg-[#F8FAFB] p-3">
                        {/* KPI row */}
                        <div className="grid grid-cols-3 gap-1.5 mb-3">
                          {[
                            { label: "Revenue", value: "245K EUR", change: "+12%", color: "#22C55E" },
                            { label: "Deals won", value: "34", change: "+8%", color: "#22C55E" },
                            { label: "Avg deal size", value: "7.2K EUR", change: "-3%", color: "#EF4444" },
                          ].map((k) => (
                            <div key={k.label} className="bg-white rounded p-2 border border-[#E5E8EB]">
                              <p className="text-[6px] text-[#999]">{k.label}</p>
                              <p className="text-[9px] font-bold text-[#111]">{k.value}</p>
                              <p className="text-[6px] font-medium" style={{ color: k.color }}>{k.change}</p>
                            </div>
                          ))}
                        </div>
                        {/* Bar chart mockup */}
                        <div className="bg-white rounded p-2 border border-[#E5E8EB] mb-2">
                          <p className="text-[7px] font-semibold text-[#111] mb-2">Pipeline par etape</p>
                          <div className="flex items-end gap-1 h-[40px]">
                            {[65, 45, 80, 35, 55, 25].map((h, i) => (
                              <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i % 2 === 0 ? "#FF7A59" : "#FFB49A" }} />
                            ))}
                          </div>
                        </div>
                        {/* Donut mockup */}
                        <div className="bg-white rounded p-2 border border-[#E5E8EB]">
                          <p className="text-[7px] font-semibold text-[#111] mb-1">Win rate par source</p>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full border-[3px] border-[#FF7A59]" style={{ borderRightColor: "#FFE0D6", borderBottomColor: "#FFE0D6" }} />
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" /><span className="text-[6px] text-[#666]">Inbound 42%</span></div>
                              <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[#FFE0D6]" /><span className="text-[6px] text-[#666]">Outbound 28%</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Salesforce Dashboard Mockup */}
                    <div className="rounded-lg border border-[#F2F2F2] overflow-hidden">
                      <div className="bg-[#032D60] px-3 py-2 flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                          <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
                          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
                        </div>
                        <span className="text-[9px] text-white/60 font-medium ml-1">Salesforce - Sales Dashboard</span>
                      </div>
                      <div className="bg-[#F4F6F9] p-3">
                        {/* KPI row */}
                        <div className="grid grid-cols-3 gap-1.5 mb-3">
                          {[
                            { label: "Closed Won", value: "$312K", sub: "Q1 2026" },
                            { label: "Pipeline", value: "$1.2M", sub: "All stages" },
                            { label: "Win Rate", value: "31%", sub: "vs 28% LQ" },
                          ].map((k) => (
                            <div key={k.label} className="bg-white rounded p-2 border border-[#D8DDE6]">
                              <p className="text-[6px] text-[#999]">{k.label}</p>
                              <p className="text-[9px] font-bold text-[#111]">{k.value}</p>
                              <p className="text-[6px] text-[#999]">{k.sub}</p>
                            </div>
                          ))}
                        </div>
                        {/* Stacked bar chart */}
                        <div className="bg-white rounded p-2 border border-[#D8DDE6] mb-2">
                          <p className="text-[7px] font-semibold text-[#111] mb-2">Forecast par categorie</p>
                          <div className="space-y-1">
                            {[
                              { label: "Commit", widths: [70], colors: ["#00A1E0"] },
                              { label: "Best Case", widths: [50, 25], colors: ["#00A1E0", "#80D0F0"] },
                              { label: "Pipeline", widths: [30, 20, 35], colors: ["#00A1E0", "#80D0F0", "#D0EEFA"] },
                            ].map((row) => (
                              <div key={row.label} className="flex items-center gap-1">
                                <span className="text-[6px] text-[#999] w-10 shrink-0">{row.label}</span>
                                <div className="flex-1 flex h-2.5 rounded overflow-hidden">
                                  {row.widths.map((w, i) => (
                                    <div key={i} style={{ width: `${w}%`, background: row.colors[i] }} />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Table mockup */}
                        <div className="bg-white rounded p-2 border border-[#D8DDE6]">
                          <p className="text-[7px] font-semibold text-[#111] mb-1">Top reps by revenue</p>
                          <div className="space-y-0.5">
                            {[
                              { name: "M. Martin", val: "$98K" },
                              { name: "P. Bernard", val: "$85K" },
                              { name: "L. Petit", val: "$72K" },
                            ].map((r) => (
                              <div key={r.name} className="flex justify-between">
                                <span className="text-[6px] text-[#00A1E0]">{r.name}</span>
                                <span className="text-[6px] font-medium text-[#111]">{r.val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Le verdict reporting.</strong> Pour les equipes de 5 a 50 personnes avec des besoins de reporting standards (pipeline, activite commerciale, performance marketing, conversion), HubSpot Professional est largement suffisant. Les dashboards sont beaux, faciles a creer et a partager. Pour les organisations qui ont besoin de reporting multi-entites, de forecasting avance, de drill-down complexe ou d&apos;analytics predictives, Salesforce est objectivement superieur. CRM Analytics (inclus dans certains plans Enterprise) est un outil de BI qui rivalise avec des solutions autonomes comme Tableau ou Looker.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ================================================================ */}
              {/* Section 6 : Automatisation et workflows */}
              {/* ================================================================ */}
              <section id="automatisation" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Automatisation et workflows</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;automatisation est devenue le nerf de la guerre dans les operations commerciales et marketing. Les deux plateformes proposent des outils puissants, mais avec des philosophies differentes.</p>

                    <p><strong className="text-[#111]">HubSpot Workflows</strong> est un editeur visuel drag-and-drop qui permet de creer des automatisations sans code. On peut automatiser l&apos;attribution de leads, le nurturing par email, la mise a jour de proprietes, les notifications internes, la creation de taches, la rotation de leads et bien plus. Les workflows peuvent etre declenches par des criteres de contact, d&apos;entreprise, de deal, de ticket ou meme de custom objects. L&apos;interface est intuitive : on voit le flux entier, les branches conditionnelles (if/then), les delais et les actions dans un canvas visuel. La limite principale : les workflows HubSpot sont lineaires ou branches, mais ne gerent pas bien les boucles, les sous-workflows ou les logiques tres complexes. Pour 80% des cas d&apos;usage B2B, c&apos;est largement suffisant.</p>

                    <p><strong className="text-[#111]">Salesforce Flow</strong> (ex-Process Builder + Flow Builder) est un moteur d&apos;automatisation beaucoup plus puissant mais aussi plus complexe. Flow Builder permet de creer des automatisations declenchees par des enregistrements (record-triggered flows), des automatisations planifiees (scheduled flows) et des ecrans interactifs (screen flows). On peut manipuler des collections d&apos;enregistrements, creer des boucles, appeler des sous-flows, faire des requetes SOQL et meme appeler des classes Apex. Pour les organisations avec des processus metier complexes (approbations multi-niveaux, calculs de commission, provisioning automatique), Salesforce Flow est imbattable. La contrepartie : la courbe d&apos;apprentissage est significative. Un admin debutant peut creer des automatisations simples, mais les flows avances necessitent une vraie expertise technique.</p>

                    <p><strong className="text-[#111]">IA et automatisation.</strong> Les deux plateformes ont integre l&apos;IA dans leurs automatisations en 2025-2026. HubSpot propose Breeze AI pour la suggestion d&apos;actions, la redaction d&apos;emails et le scoring predictif. Salesforce a lance Agentforce, des agents IA autonomes qui peuvent executer des taches complexes (qualification de leads, reponse aux demandes de support, generation de rapports). Agentforce est plus ambitieux dans sa vision, mais aussi plus cher et plus complexe a configurer.</p>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">HubSpot Workflows</span>
                      </div>
                      <div className="space-y-1.5">
                        {[
                          { cap: "Editeur visuel", note: "Drag-and-drop, branches if/then" },
                          { cap: "Declencheurs", note: "Contact, deal, ticket, company, custom object" },
                          { cap: "Actions", note: "Email, tache, notification, mise a jour, webhook" },
                          { cap: "Limites", note: "Pas de boucles, sous-workflows limites" },
                          { cap: "IA", note: "Breeze AI (suggestions, scoring, redaction)" },
                          { cap: "Disponibilite", note: "A partir du plan Professional" },
                        ].map((c) => (
                          <div key={c.cap} className="flex items-start gap-2">
                            <span className="text-[9px] font-semibold text-[#FF7A59] w-16 shrink-0">{c.cap}</span>
                            <span className="text-[10px] text-[#777] leading-[1.5]">{c.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=salesforce.com&sz=32" alt="Salesforce" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Salesforce Flow</span>
                      </div>
                      <div className="space-y-1.5">
                        {[
                          { cap: "Editeur visuel", note: "Flow Builder, canvas avance" },
                          { cap: "Declencheurs", note: "Record, schedule, platform event, API" },
                          { cap: "Actions", note: "CRUD, email, approval, Apex, sous-flows" },
                          { cap: "Puissance", note: "Boucles, collections, SOQL, invocable actions" },
                          { cap: "IA", note: "Agentforce (agents autonomes, actions complexes)" },
                          { cap: "Disponibilite", note: "Inclus dans toutes les editions" },
                        ].map((c) => (
                          <div key={c.cap} className="flex items-start gap-2">
                            <span className="text-[9px] font-semibold text-[#00A1E0] w-16 shrink-0">{c.cap}</span>
                            <span className="text-[10px] text-[#777] leading-[1.5]">{c.note}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ================================================================ */}
              {/* Section 7 : Integrations et ecosysteme */}
              {/* ================================================================ */}
              <section id="integrations" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Integrations et ecosysteme</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un CRM n&apos;existe pas en isolation. Il doit se connecter a votre stack technologique : email, telephonie, facturation, ERP, outils de prospection, BI, service client. La richesse de l&apos;ecosysteme d&apos;integrations est un critere decisif.</p>

                    <p><strong className="text-[#111]">Salesforce AppExchange</strong> est la plus grande marketplace d&apos;applications business au monde avec plus de 7 000 apps et composants. On y trouve des solutions pour absolument tout : CPQ (Configure Price Quote), signature electronique, enrichissement de donnees, telephonie, gestion de projet, compliance, et des centaines de connecteurs vers des ERP (SAP, Oracle, Microsoft Dynamics). L&apos;AppExchange est aussi un ecosysteme de composants Lightning que les developpeurs peuvent integrer directement dans l&apos;interface Salesforce. La qualite des integrations est generalement elevee, car Salesforce impose des standards stricts de securite et de performance pour les apps listees.</p>

                    <p><strong className="text-[#111]">HubSpot App Marketplace</strong> compte environ 1 700 integrations en 2026. C&apos;est significativement moins que Salesforce, mais le marketplace couvre les besoins de la grande majorite des PME B2B. Les integrations natives avec Gmail, Outlook, Slack, Zoom, Stripe, Shopify, WordPress, LinkedIn et les principaux outils de prospection (Apollo, Lemlist, Waalaxy) sont excellentes. HubSpot mise aussi sur son Operations Hub, qui permet de synchroniser des donnees bidirectionnellement entre HubSpot et d&apos;autres outils, de nettoyer les donnees et de creer des automatisations programmables en JavaScript.</p>

                    <p><strong className="text-[#111]">API et developpement.</strong> Les deux plateformes disposent d&apos;APIs REST completes et bien documentees. Salesforce ajoute SOAP, Bulk API, Streaming API et Metadata API, ce qui donne une flexibilite superieure pour les integrations complexes. HubSpot a considerablement ameliore son API ces dernieres annees avec des endpoints v3 plus coherents, des webhooks et des extensions CRM. Pour des integrations standard (Zapier, Make, n8n), les deux se valent. Pour des integrations enterprise (ERP, Data Warehouse, middleware), Salesforce a un avantage net grace a des connecteurs natifs et des patterns d&apos;integration eprouves.</p>
                  </div>

                  {/* Ecosysteme comparison */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      { platform: "AppExchange", count: "7 000+", logo: "salesforce.com", color: "#00A1E0", examples: ["Conga", "DocuSign", "Gong", "Outreach", "LeanData", "Salesforce CPQ"] },
                      { platform: "HubSpot Marketplace", count: "1 700+", logo: "hubspot.com", color: "#FF7A59", examples: ["Aircall", "PandaDoc", "Databox", "Vidyard", "Drift", "Clearbit"] },
                    ].map((e) => (
                      <div key={e.platform} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <img src={`https://www.google.com/s2/favicons?domain=${e.logo}&sz=32`} alt={e.platform} className="w-4 h-4" />
                          <span className="text-[12px] font-semibold text-[#111]">{e.platform}</span>
                        </div>
                        <p className="text-[20px] font-bold mb-2" style={{ color: e.color }}>{e.count}</p>
                        <p className="text-[9px] text-[#999] mb-2">Apps populaires :</p>
                        <div className="flex flex-wrap gap-1">
                          {e.examples.map((app) => (
                            <span key={app} className="text-[8px] px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#666]">{app}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ================================================================ */}
              {/* Section 8 : Implementation et time-to-value */}
              {/* ================================================================ */}
              <section id="implementation" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Implementation et time-to-value</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le time-to-value, c&apos;est le temps necessaire entre la signature du contrat et le moment ou votre equipe utilise reellement le CRM au quotidien et en tire de la valeur. C&apos;est un critere fondamental que beaucoup d&apos;entreprises sous-estiment lors du choix.</p>

                    <p><strong className="text-[#111]">HubSpot : des semaines, pas des mois.</strong> Une implementation HubSpot standard (Sales Hub + Marketing Hub Professional, 10-30 utilisateurs) prend entre 2 et 6 semaines selon la complexite. Le onboarding peut etre fait en interne par un ops competent ou avec l&apos;aide d&apos;un partenaire certifie. Les etapes classiques : configuration du pipeline, import des contacts et des entreprises, connexion des emails et du calendrier, creation des sequences et des workflows de base, formation des equipes. HubSpot impose un onboarding obligatoire pour les plans Professional et Enterprise (entre 1 500 et 7 000 EUR), ce qui est souvent critique par les clients mais qui garantit un minimum de configuration correcte.</p>

                    <p><strong className="text-[#111]">Salesforce : des mois, voire des trimestres.</strong> Une implementation Salesforce standard (Sales Cloud Enterprise, 20-100 utilisateurs) prend entre 2 et 6 mois, et souvent plus si les besoins sont complexes. Les raisons : la personnalisation des objets et des layouts, la configuration des profils et des permissions (bien plus granulaires que HubSpot), la creation des flows d&apos;automatisation, l&apos;integration avec les outils existants, le developpement de composants Lightning custom si necessaire, la migration des donnees, et la formation des utilisateurs et des admins. La plupart des projets Salesforce necessitent un integrateur certifie (consulting partner), dont les tarifs journaliers varient entre 800 et 1 500 EUR selon l&apos;expertise.</p>

                    <p><strong className="text-[#111]">Le facteur humain.</strong> HubSpot peut etre administre par un profil marketing ou sales ops generaliste. La documentation est excellente, la HubSpot Academy propose des certifications gratuites, et la communaute est active. Salesforce necessite un admin dedie (ou au minimum un profil qui y consacre 50% de son temps) a partir de 20-30 utilisateurs. Un Salesforce Admin certifie coute entre 45 000 et 65 000 EUR/an en France. Pour les organisations plus grandes, il faut aussi des Salesforce Developers et potentiellement un architecte.</p>
                  </div>

                  {/* Timeline comparison */}
                  <div className="mt-5 space-y-3">
                    <div className="rounded-lg border border-[#FF7A59]/20 bg-[#FFF5F0] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#FF7A59]">HubSpot : timeline d&apos;implementation</span>
                      </div>
                      <div className="flex gap-1">
                        {[
                          { week: "S1", label: "Setup & import", pct: 100 },
                          { week: "S2", label: "Pipeline & emails", pct: 100 },
                          { week: "S3", label: "Workflows & sequences", pct: 100 },
                          { week: "S4", label: "Formation equipes", pct: 100 },
                          { week: "S5", label: "Go-live", pct: 60 },
                          { week: "S6", label: "Optimisation", pct: 30 },
                        ].map((s) => (
                          <div key={s.week} className="flex-1 text-center">
                            <div className="h-6 rounded mb-1 relative overflow-hidden bg-[#FFE0D6]">
                              <div className="absolute inset-0 bg-[#FF7A59] rounded" style={{ width: `${s.pct}%` }} />
                            </div>
                            <p className="text-[7px] font-bold text-[#FF7A59]">{s.week}</p>
                            <p className="text-[6px] text-[#999] leading-tight">{s.label}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-[#888] mt-2">Time-to-value moyen : 3-6 semaines</p>
                    </div>

                    <div className="rounded-lg border border-[#00A1E0]/20 bg-[#E8F4FD] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=salesforce.com&sz=32" alt="Salesforce" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#00A1E0]">Salesforce : timeline d&apos;implementation</span>
                      </div>
                      <div className="flex gap-1">
                        {[
                          { month: "M1", label: "Discovery & design", pct: 100 },
                          { month: "M2", label: "Configuration & custom", pct: 100 },
                          { month: "M3", label: "Integrations & flows", pct: 100 },
                          { month: "M4", label: "Migration & test", pct: 100 },
                          { month: "M5", label: "Formation & UAT", pct: 80 },
                          { month: "M6", label: "Go-live & hypercare", pct: 50 },
                        ].map((s) => (
                          <div key={s.month} className="flex-1 text-center">
                            <div className="h-6 rounded mb-1 relative overflow-hidden bg-[#D0EEFA]">
                              <div className="absolute inset-0 bg-[#00A1E0] rounded" style={{ width: `${s.pct}%` }} />
                            </div>
                            <p className="text-[7px] font-bold text-[#00A1E0]">{s.month}</p>
                            <p className="text-[6px] text-[#999] leading-tight">{s.label}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-[#888] mt-2">Time-to-value moyen : 3-6 mois</p>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ================================================================ */}
              {/* Section 9 : Prix - le vrai comparatif */}
              {/* ================================================================ */}
              <section id="prix" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Prix : le vrai comparatif (total cost of ownership)</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Comparer les prix de HubSpot et Salesforce sur la base des licences seules est trompeur. Le vrai cout d&apos;un CRM, c&apos;est le TCO (Total Cost of Ownership) qui inclut les licences, l&apos;implementation, la maintenance, les add-ons et les ressources internes necessaires.</p>

                    <p><strong className="text-[#111]">Licences HubSpot.</strong> HubSpot propose un CRM gratuit (vraiment gratuit, pas un essai) avec des fonctionnalites limitees mais utilisables. Les plans payants par hub : Starter a 20 EUR/mois/utilisateur, Professional a partir de 100 EUR/mois/utilisateur (avec des frais de plateforme), Enterprise a partir de 150 EUR/mois/utilisateur. Le Marketing Hub est tarife differemment : par nombre de contacts marketing (pas par utilisateur), ce qui peut faire grimper la facture rapidement si votre base depasse les 2 000 contacts inclus dans le plan Professional.</p>

                    <p><strong className="text-[#111]">Licences Salesforce.</strong> Salesforce Sales Cloud demarre a 25 EUR/mois/utilisateur (Starter Suite), 100 EUR/mois/utilisateur (Professional), 165 EUR/mois/utilisateur (Enterprise) et 330 EUR/mois/utilisateur (Unlimited). Mais attention : la majorite des fonctionnalites utiles (workflows, forecasting, territory management, custom objects avances) ne sont disponibles qu&apos;a partir du plan Enterprise. En pratique, tres peu d&apos;entreprises deploient Salesforce sur le plan Professional, car les limitations sont trop contraignantes.</p>

                    <p><strong className="text-[#111]">Le vrai cout cache.</strong> C&apos;est la ou la comparaison devient interessante. Chez Salesforce, il faut ajouter au prix des licences : le cout de l&apos;integrateur pour l&apos;implementation (15 000 a 80 000 EUR selon la complexite), le salaire d&apos;un admin Salesforce dedie (45 000 a 65 000 EUR/an), les add-ons incontournables (CPQ, Pardot, Data Cloud, Einstein AI sont des produits separes avec des tarifications propres), et les couts de maintenance et d&apos;evolution (l&apos;outil doit etre continuellement administre). Chez HubSpot, les couts supplementaires sont : l&apos;onboarding obligatoire (1 500 a 7 000 EUR one-shot), un partenaire eventuel pour la configuration avancee (5 000 a 20 000 EUR), et les contacts marketing additionnels si votre base grandit.</p>
                  </div>

                  {/* TCO comparison */}
                  <div className="mt-5 rounded-lg bg-[#111] p-4">
                    <p className="text-[12px] font-semibold text-white mb-3">TCO annuel estime pour 20 utilisateurs commerciaux + marketing</p>
                    <div className="space-y-1">
                      <div className="flex items-center py-2 border-b border-white/10">
                        <span className="text-[10px] text-white/40 font-semibold flex-1">Poste de cout</span>
                        <div className="flex items-center gap-1 w-[130px]">
                          <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-3 h-3" />
                          <span className="text-[10px] text-white/60 font-semibold">HubSpot</span>
                        </div>
                        <div className="flex items-center gap-1 w-[130px]">
                          <img src="https://www.google.com/s2/favicons?domain=salesforce.com&sz=32" alt="Salesforce" className="w-3 h-3" />
                          <span className="text-[10px] text-white/60 font-semibold">Salesforce</span>
                        </div>
                      </div>
                      {[
                        { poste: "Licences CRM/Sales (20 users)", hubspot: "24 000 EUR", salesforce: "39 600 EUR" },
                        { poste: "Marketing automation", hubspot: "9 600 EUR", salesforce: "15 000 EUR" },
                        { poste: "Implementation (an 1)", hubspot: "5 000 - 15 000 EUR", salesforce: "25 000 - 80 000 EUR" },
                        { poste: "Admin/ops dedie", hubspot: "0 - 20 000 EUR *", salesforce: "45 000 - 65 000 EUR" },
                        { poste: "Add-ons essentiels", hubspot: "~3 000 EUR", salesforce: "~12 000 EUR" },
                        { poste: "Formation", hubspot: "Gratuit (Academy)", salesforce: "3 000 - 8 000 EUR" },
                      ].map((r) => (
                        <div key={r.poste} className="flex items-center py-2 border-b border-white/5">
                          <span className="text-[10px] text-white/60 flex-1">{r.poste}</span>
                          <span className="text-[10px] text-white/80 w-[130px]">{r.hubspot}</span>
                          <span className="text-[10px] text-white/80 w-[130px]">{r.salesforce}</span>
                        </div>
                      ))}
                      <div className="flex items-center py-3 border-t border-white/20 mt-1">
                        <span className="text-[11px] text-white font-semibold flex-1">TCO annee 1 (estime)</span>
                        <span className="text-[11px] font-bold text-[#FF7A59] w-[130px]">42 000 - 72 000 EUR</span>
                        <span className="text-[11px] font-bold text-[#00A1E0] w-[130px]">140 000 - 220 000 EUR</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-white/40 mt-3">* Un ops generaliste peut gerer HubSpot a mi-temps. Salesforce necessite generalement un admin certifie dedie.</p>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Le verdict prix.</strong> Sur le TCO, HubSpot est generalement 2 a 3 fois moins cher que Salesforce pour une organisation equivalente. L&apos;ecart vient principalement des couts d&apos;implementation, des ressources internes et des add-ons. A noter que cet ecart se reduit significativement a mesure que l&apos;organisation grandit et complexifie ses besoins : au-dela de 200 utilisateurs, les plans HubSpot Enterprise deviennent eux aussi tres couteux, et l&apos;ecart avec Salesforce se resserre.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ================================================================ */}
              {/* Section 10 : Scalabilite */}
              {/* ================================================================ */}
              <section id="scalabilite" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Scalabilite : quand HubSpot suffit, quand Salesforce s&apos;impose</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La question de la scalabilite est centrale dans le choix entre HubSpot et Salesforce. Beaucoup d&apos;entreprises choisissent Salesforce &ldquo;au cas ou&rdquo; elles grossissent, et se retrouvent avec un outil surdimensionne qu&apos;elles n&apos;exploitent qu&apos;a 20% de ses capacites. A l&apos;inverse, certaines entreprises restent sur HubSpot trop longtemps et finissent par se heurter aux limites de la plateforme.</p>

                    <p><strong className="text-[#111]">HubSpot scale bien jusqu&apos;a un certain point.</strong> La plateforme gere tres bien les organisations de 2 a 200 utilisateurs. Les limites commencent a apparaitre dans trois situations : (1) des modeles de donnees complexes qui necessitent plus d&apos;objets personnalises et de relations que ce que HubSpot Enterprise permet, (2) des besoins de segmentation et de permissions granulaires (HubSpot est plus &ldquo;flat&rdquo; que Salesforce en termes de hierarchie de permissions), (3) des volumes de donnees tres importants (au-dela de 15 millions de contacts, les performances peuvent se degrader). En 2026, HubSpot a fait d&apos;enormes progres sur la scalabilite, et des entreprises comme Trello, Reddit et Monday.com l&apos;utilisent avec succes. Mais les cas d&apos;usage enterprise les plus complexes restent mieux servis par Salesforce.</p>

                    <p><strong className="text-[#111]">Salesforce n&apos;a quasiment aucune limite de scalabilite.</strong> La plateforme gere des organisations de 5 a 100 000+ utilisateurs, des volumes de donnees massifs (milliards d&apos;enregistrements avec Big Objects et Data Cloud) et des architectures multi-entites, multi-devises, multi-langues. Les plus grandes entreprises du monde (Amazon Web Services, Toyota, Adidas, L&apos;Oreal) utilisent Salesforce. La plateforme Lightning permet de construire des applications metier completes qui vont bien au-dela du CRM. C&apos;est cette capacite d&apos;extension qui justifie l&apos;investissement pour les grandes organisations.</p>

                    <p><strong className="text-[#111]">Le moment de la bascule.</strong> D&apos;apres notre experience, la migration HubSpot vers Salesforce devient pertinente quand : votre equipe commerciale depasse 100-150 personnes avec des territoires et des hierarchies complexes, votre modele de donnees necessite des objets personnalises avec des logiques metier avancees (triggers, validation rules complexes), vous avez besoin de CPQ (devis complexes avec des regles de pricing), ou votre stack technique exige des integrations profondes avec un ERP (SAP, Oracle). En dessous de ces seuils, HubSpot Enterprise couvre la tres grande majorite des besoins.</p>
                  </div>

                  {/* Scale spectrum */}
                  <div className="mt-5 rounded-lg border border-[#F2F2F2] p-4">
                    <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Spectre de scalabilite</p>
                    <div className="space-y-3">
                      {[
                        { label: "1-10 utilisateurs", hubspot: "Ideal (CRM gratuit ou Starter)", salesforce: "Surdimensionne et couteux", rec: "hubspot" },
                        { label: "10-50 utilisateurs", hubspot: "Ideal (Professional)", salesforce: "Viable si besoins complexes", rec: "hubspot" },
                        { label: "50-200 utilisateurs", hubspot: "Excellent (Enterprise)", salesforce: "Excellent (Enterprise)", rec: "both" },
                        { label: "200-500 utilisateurs", hubspot: "Possible mais limites potentielles", salesforce: "Zone de confort", rec: "salesforce" },
                        { label: "500+ utilisateurs", hubspot: "Cas par cas, limites probables", salesforce: "Ideal, architecture enterprise", rec: "salesforce" },
                      ].map((s) => (
                        <div key={s.label} className="flex items-start gap-3">
                          <span className="text-[10px] font-semibold text-[#111] w-[100px] shrink-0 pt-0.5">{s.label}</span>
                          <div className="flex-1 grid grid-cols-2 gap-2">
                            <div className={`rounded px-2 py-1.5 text-[9px] leading-[1.5] ${s.rec === "hubspot" || s.rec === "both" ? "bg-[#FFF5F0] text-[#CC5A30] font-medium" : "bg-[#F9F9F9] text-[#999]"}`}>
                              {s.hubspot}
                            </div>
                            <div className={`rounded px-2 py-1.5 text-[9px] leading-[1.5] ${s.rec === "salesforce" || s.rec === "both" ? "bg-[#E8F4FD] text-[#006EAF] font-medium" : "bg-[#F9F9F9] text-[#999]"}`}>
                              {s.salesforce}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* ================================================================ */}
              {/* Section 11 : Tableau comparatif global (dark section) */}
              {/* ================================================================ */}
              <section id="tableau-comparatif" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <h2 className="text-[17px] font-semibold text-white mb-5">Tableau comparatif global : 22 criteres</h2>
                  <div className="space-y-1">
                    {/* Header */}
                    <div className="flex items-center py-2 border-b border-white/10">
                      <span className="text-[10px] text-white/40 font-semibold flex-1">Critere</span>
                      <div className="flex items-center gap-1 w-[140px]">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-3 h-3" />
                        <span className="text-[10px] text-white/60 font-semibold">HubSpot</span>
                      </div>
                      <div className="flex items-center gap-1 w-[140px]">
                        <img src="https://www.google.com/s2/favicons?domain=salesforce.com&sz=32" alt="Salesforce" className="w-3 h-3" />
                        <span className="text-[10px] text-white/60 font-semibold">Salesforce</span>
                      </div>
                    </div>
                    {[
                      { critere: "Prix entree de gamme", hubspot: "Gratuit (CRM)", salesforce: "25 EUR/mois/user" },
                      { critere: "Prix plan business", hubspot: "~100 EUR/mois/user", salesforce: "165 EUR/mois/user" },
                      { critere: "TCO annuel (20 users)", hubspot: "42-72K EUR", salesforce: "140-220K EUR" },
                      { critere: "Interface utilisateur", hubspot: "Excellent (moderne, epure)", salesforce: "Correct (dense, personnalisable)" },
                      { critere: "Courbe d'apprentissage", hubspot: "Douce (jours)", salesforce: "Raide (semaines/mois)" },
                      { critere: "Taux d'adoption moyen", hubspot: "85-95%", salesforce: "60-75%" },
                      { critere: "Pipeline et deals", hubspot: "Tres bon (Board view)", salesforce: "Excellent (avance, configurable)" },
                      { critere: "Gestion des contacts", hubspot: "Timeline unifiee, enrichissement", salesforce: "Record types, hierarchies complexes" },
                      { critere: "Objets personnalises", hubspot: "Enterprise uniquement, limites", salesforce: "Natifs, illimites, relations N-N" },
                      { critere: "Marketing automation", hubspot: "Suite complete native", salesforce: "MCAE/Pardot (outil separe)" },
                      { critere: "Landing pages et CMS", hubspot: "Natif, drag-and-drop", salesforce: "Non natif" },
                      { critere: "Email marketing", hubspot: "Inclus, editeur moderne", salesforce: "Via MCAE (cout additionnel)" },
                      { critere: "Workflows / automatisation", hubspot: "Visuel, simple, efficace", salesforce: "Flow Builder (puissant, complexe)" },
                      { critere: "Reporting", hubspot: "Bon (custom report builder)", salesforce: "Excellent (avance, CRM Analytics)" },
                      { critere: "Forecasting", hubspot: "Bon (Professional+)", salesforce: "Excellent (categories, AI)" },
                      { critere: "IA integree", hubspot: "Breeze AI (suggestions, scoring)", salesforce: "Agentforce + Einstein (agents autonomes)" },
                      { critere: "Integrations / marketplace", hubspot: "1 700+ apps", salesforce: "7 000+ apps (AppExchange)" },
                      { critere: "API", hubspot: "REST v3, webhooks", salesforce: "REST, SOAP, Bulk, Streaming, Metadata" },
                      { critere: "Implementation", hubspot: "2-6 semaines", salesforce: "2-6 mois" },
                      { critere: "Admin necessaire", hubspot: "Ops generaliste mi-temps", salesforce: "Admin certifie dedie" },
                      { critere: "Scalabilite max", hubspot: "~200 users (au-dela = cas par cas)", salesforce: "100 000+ users" },
                      { critere: "Territory management", hubspot: "Basique (equipes)", salesforce: "Enterprise natif" },
                    ].map((r) => (
                      <div key={r.critere} className="flex items-center py-2 border-b border-white/5">
                        <span className="text-[10px] text-white/60 flex-1">{r.critere}</span>
                        <span className="text-[10px] text-white/80 w-[140px]">{r.hubspot}</span>
                        <span className="text-[10px] text-white/80 w-[140px]">{r.salesforce}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* ================================================================ */}
              {/* Section 12 : Notre verdict selon votre profil */}
              {/* ================================================================ */}
              <section id="verdict" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Notre verdict : quel CRM choisir selon votre profil</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Apres avoir deploye les deux plateformes chez des dizaines de clients, notre conviction est claire : il n&apos;y a pas de meilleur CRM dans l&apos;absolu. Le debat &ldquo;HubSpot vs Salesforce&rdquo; est un faux debat si on ne le contextualise pas. Le bon choix depend de votre taille, de votre complexite operationnelle, de votre budget et de vos ambitions de croissance. Voici notre recommandation par profil.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-lg border border-[#FF7A59]/30 bg-[#FFF5F0] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-4 h-4" />
                        <p className="text-[12px] font-semibold text-[#FF7A59]">Choisissez HubSpot si...</p>
                      </div>
                      <ul className="space-y-1.5">
                        {[
                          "Votre equipe compte entre 2 et 200 utilisateurs CRM",
                          "Vous voulez une plateforme unifiee ventes + marketing + service client sans integration a gerer",
                          "Votre strategie inclut de l&apos;inbound marketing (contenu, SEO, nurturing, reseaux sociaux)",
                          "Le time-to-value est critique : vous voulez etre operationnel en semaines, pas en mois",
                          "Votre budget total (TCO) est un critere important de decision",
                          "Vous n&apos;avez pas d&apos;admin technique dedie et votre equipe ops est generaliste",
                          "Vos processus commerciaux sont standards (pipeline lineaire, cycle de vente moyen)",
                          "L&apos;adoption par les equipes est votre priorite numero un",
                        ].map((i) => (
                          <li key={i} className="text-[11px] text-[#555] leading-[1.5] flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] mt-1.5 shrink-0" /><span dangerouslySetInnerHTML={{ __html: i }} /></li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border border-[#00A1E0]/30 bg-[#E8F4FD] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=salesforce.com&sz=32" alt="Salesforce" className="w-4 h-4" />
                        <p className="text-[12px] font-semibold text-[#00A1E0]">Choisissez Salesforce si...</p>
                      </div>
                      <ul className="space-y-1.5">
                        {[
                          "Votre equipe depasse 100-200 utilisateurs avec des hierarchies et territoires complexes",
                          "Votre modele de donnees necessite des objets personnalises avances avec des logiques metier specifiques",
                          "Vous avez besoin de CPQ (devis complexes, configurations de produits, regles de pricing)",
                          "Votre organisation fonctionne en multi-entites, multi-devises ou multi-langues",
                          "Vous avez un budget pour un admin Salesforce dedie et un integrateur certifie",
                          "Vos processus commerciaux sont complexes (approbations multi-niveaux, commissions, territory management)",
                          "Vous avez besoin d&apos;integrations profondes avec un ERP (SAP, Oracle, Microsoft Dynamics)",
                          "Vous voulez une plateforme capable de supporter votre croissance jusqu&apos;a des milliers d&apos;utilisateurs",
                        ].map((i) => (
                          <li key={i} className="text-[11px] text-[#555] leading-[1.5] flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00A1E0] mt-1.5 shrink-0" /><span dangerouslySetInnerHTML={{ __html: i }} /></li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">L&apos;erreur la plus frequente.</strong> Choisir Salesforce &ldquo;parce que c&apos;est le leader du marche&rdquo; ou &ldquo;parce qu&apos;on en aura besoin quand on sera plus grands&rdquo;. On a vu trop d&apos;entreprises de 20-30 personnes deployer Salesforce Enterprise, investir 100 000 EUR+ dans l&apos;implementation, puis n&apos;utiliser que 15% des fonctionnalites parce que personne n&apos;a le temps ou l&apos;expertise pour administrer l&apos;outil. Le resultat : un CRM sous-utilise, des commerciaux frustres et un ROI negatif. A l&apos;inverse, une entreprise sur HubSpot Professional qui exploite 80% des fonctionnalites obtiendra un meilleur retour sur investissement qu&apos;une entreprise sur Salesforce Enterprise qui n&apos;en utilise que 15%.</p>

                    <p><strong className="text-[#111]">La question de la migration future.</strong> &ldquo;Et si on demarre sur HubSpot et qu&apos;on doit migrer vers Salesforce plus tard ?&rdquo; C&apos;est une question legitime. La realite : la migration HubSpot vers Salesforce est faisable et relativement courante. Les donnees se transferent bien, les workflows doivent etre recrees dans Flow Builder, et les equipes doivent etre reformees. Le cout typique d&apos;une migration est de 20 000 a 60 000 EUR. C&apos;est un investissement, mais c&apos;est souvent moins cher que d&apos;avoir surpaye Salesforce pendant 3 ans quand on n&apos;en avait pas besoin.</p>

                    <p><strong className="text-[#111]">Notre recommandation chez Ceres.</strong> Pour 80% des PME et ETI B2B francaises que nous accompagnons, HubSpot est le bon choix. La plateforme all-in-one, l&apos;experience utilisateur superieure, le time-to-value rapide et le TCO maitrise en font le choix le plus rationnel pour les organisations de 5 a 200 utilisateurs. Nous recommandons Salesforce pour les organisations qui ont des besoins reels et documentes de personnalisation avancee, de scalabilite enterprise ou d&apos;integration ERP profonde. Le mot cle est &ldquo;besoins reels&rdquo;, pas &ldquo;besoins hypothetiques futurs&rdquo;.</p>

                    <p>Quelle que soit votre decision, le facteur critique de succes n&apos;est pas l&apos;outil mais la qualite de l&apos;implementation, l&apos;adoption par les equipes et la gouvernance des donnees. Un CRM mal deploye, qu&apos;il s&apos;appelle HubSpot ou Salesforce, ne resoudra aucun de vos problemes commerciaux.</p>
                  </div>
                </div>
              </section>
            </article>

            {/* Related articles */}
            <section className="mt-12 mb-8">
              <p className="text-[13px] font-semibold text-[#111] mb-4">Articles similaires</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedArticles.map((a) => (
                  <Link key={a.slug} href={`/blog/${a.slug}`} className="rounded-lg border border-[#F2F2F2] p-4 hover:border-[#DDD] transition-colors group">
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
              <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour choisir entre HubSpot et Salesforce ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[500px] mx-auto">On vous aide a evaluer vos besoins reels, a choisir le bon CRM et a le deployer correctement. Pas de discours commercial : une recommandation honnete basee sur votre contexte.</p>
                <div className="flex items-center justify-center gap-3">
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel
                  </a>
                  <Link href="/agence-hubspot" className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-[#EAEAEA] bg-white text-[#111] text-[13px] font-medium hover:border-[#CCC] transition-colors">
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
