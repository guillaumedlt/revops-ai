"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Le stack technologique RevOps ideal en 2026",
  description: "Guide complet du stack technologique RevOps en 2026. Les 7 couches essentielles (CRM, automation, enrichissement, analytics, communication, IA, integration), les meilleurs outils par fonction, les budgets par taille d'entreprise et les erreurs a eviter. Avec notre stack exact chez Ceres.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-20",
  dateModified: "2026-03-20",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/stack-technologique-revops-2026" },
  articleSection: "Process & Outils",
  wordCount: 3200,
  inLanguage: "fr",
};

const sections = [
  { id: "stack-strategique", title: "Pourquoi le stack est strategique" },
  { id: "sept-couches", title: "Les 7 couches du stack" },
  { id: "couche-crm", title: "Couche 1 : CRM" },
  { id: "couche-automation", title: "Couche 2 : Automation" },
  { id: "couche-enrichissement", title: "Couche 3 : Enrichissement" },
  { id: "couche-analytics", title: "Couche 4 : Analytics" },
  { id: "couche-communication", title: "Couche 5 : Communication" },
  { id: "couche-ia", title: "Couche 6 : IA" },
  { id: "couche-integration", title: "Couche 7 : Integration" },
  { id: "stack-par-taille", title: "Stack par taille d&apos;entreprise" },
  { id: "erreurs-stack", title: "Erreurs courantes" },
  { id: "stack-ceres", title: "Notre stack chez Ceres" },
];

const relatedArticles = [
  { title: "Comparatif outils de generation de leads et enrichissement B2B", slug: "comparatif-outils-generation-leads-enrichissement", category: "Process & Outils", color: "#6C5CE7" },
  { title: "CRM pour PME en 2026 : le guide pour bien choisir", slug: "crm-pme-2026", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "9 actions commerciales que vous devriez automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "Automatisation", color: "#FF7A59" },
];

export default function StackTechnologiqueRevOpsArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("stack-strategique");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "5%", width: 300, height: 300, borderRadius: "50%", background: "#6C5CE7", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "14%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "28%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "42%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "56%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "70%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "85%", width: 240, height: 240, borderRadius: "50%", background: "#4B5EFC", opacity: 0.06, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet?text=Le%20stack%20technologique%20RevOps%20ideal%20en%202026&url=https://www.ceres-revops.com/blog/stack-technologique-revops-2026" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/stack-technologique-revops-2026" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Stack technologique RevOps 2026</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>Process &amp; Outils</Badge>
                <span className="text-[11px] text-[#CCC]">16 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Le stack technologique RevOps ideal en 2026
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                CRM, automation, enrichissement, analytics, communication, IA, integration. Sept couches, des dizaines d&apos;outils possibles, et un budget qui peut vite exploser si vous faites les mauvais choix. Ce guide decortique le stack RevOps complet en 2026 : quels outils pour chaque fonction, comment les connecter entre eux, combien ca coute selon votre taille d&apos;entreprise, et quelles erreurs eviter. Base sur notre experience terrain chez Ceres aupres de dizaines de PME et ETI francaises.
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
              {/* Section 1 : Pourquoi votre stack RevOps est strategique */}
              <section id="stack-strategique" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi votre stack RevOps est strategique</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;entreprise B2B moyenne utilise 130 applications SaaS en 2026, selon Productiv. Pour les equipes revenue (marketing, sales, customer success), ce chiffre se situe entre 15 et 40 outils. Chaque outil a ete ajoute pour resoudre un probleme specifique, souvent dans l&apos;urgence, rarement dans une logique d&apos;ensemble. Le resultat est un empilement technologique fragile, couteux et mal integre.</p>
                    <p>Ce phenomene porte un nom : le tool sprawl. L&apos;accumulation non pilotee d&apos;outils qui ne communiquent pas entre eux, qui font doublon sur certaines fonctions, et qui creent des silos de donnees. Le tool sprawl est le premier obstacle a l&apos;alignement marketing-sales-CS, parce qu&apos;il rend impossible la creation d&apos;une source unique de verite sur le parcours client.</p>
                    <p>Le deuxieme probleme est la dette d&apos;integration. Chaque connexion entre deux outils qui n&apos;est pas maintenue, chaque workflow qui tourne sur une version obsolete d&apos;une API, chaque mapping de champs qui n&apos;a pas ete mis a jour depuis l&apos;ajout d&apos;une nouvelle propriete CRM. Cette dette s&apos;accumule silencieusement et explose un jour sous forme de donnees corrompues, de leads perdus ou de reportings faux.</p>
                    <p>Le stack RevOps n&apos;est pas une collection d&apos;outils. C&apos;est une architecture. Et comme toute architecture, elle doit etre concue avec intention, documentee, et maintenue. Une equipe qui choisit ses outils de maniere strategique depense en moyenne 35% de moins qu&apos;une equipe qui accumule les solutions au fil de l&apos;eau, tout en obtenant de meilleurs resultats operationnels.</p>
                    <p>Ce guide propose une approche structuree en sept couches. Chaque couche remplit une fonction precise dans la chaine de revenus. L&apos;objectif n&apos;est pas de lister tous les outils existants, mais d&apos;identifier ceux qui meritent votre attention en 2026, de comprendre quand utiliser chacun, et de montrer comment ils s&apos;articulent entre eux.</p>
                  </div>

                  {/* Key stats */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { stat: "130", label: "applications SaaS en moyenne par entreprise B2B", color: "#6C5CE7" },
                      { stat: "35%", label: "d'economie avec un stack bien architecture", color: "#22C55E" },
                      { stat: "40%", label: "des integrations sont mal maintenues", color: "#EF4444" },
                      { stat: "15-40", label: "outils pour les equipes revenue", color: "#FF7A59" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-lg border border-[#F2F2F2] p-4 text-center">
                        <p className="text-[20px] font-bold mb-1" style={{ color: s.color }}>{s.stat}</p>
                        <p className="text-[10px] text-[#999] leading-[1.4]">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 : Les 7 couches du stack RevOps */}
              <section id="sept-couches" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les 7 couches du stack RevOps</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Un stack RevOps mature se decompose en sept couches fonctionnelles. Chaque couche a un role precis, des outils dedies, et des interactions definies avec les autres couches. Penser en couches permet d&apos;evaluer la maturite de chaque fonction independamment et d&apos;identifier les maillons faibles de votre architecture.</p>
                    <p>Le schema ci-dessous represente l&apos;architecture cible. Le CRM est la fondation sur laquelle tout repose. Les couches superieures s&apos;appuient sur les precedentes. La couche d&apos;integration irrigue l&apos;ensemble en faisant circuler les donnees entre tous les etages.</p>
                  </div>

                  {/* CSS Architecture Diagram */}
                  <div className="rounded-lg border border-[#F2F2F2] bg-[#FAFAFA] p-5 mb-4">
                    <p className="text-[11px] font-semibold text-[#111] mb-5 text-center uppercase tracking-wider">Architecture du stack RevOps -- Vue en couches</p>
                    <div className="space-y-2 max-w-[520px] mx-auto">
                      {[
                        { label: "Couche 7 : Integration & iPaaS", color: "#111", textColor: "#FFF", tools: "Make, n8n, Tray.io, Workato" },
                        { label: "Couche 6 : Intelligence Artificielle", color: "#6C5CE7", textColor: "#FFF", tools: "Claude, ChatGPT, Agents custom" },
                        { label: "Couche 5 : Communication", color: "#4B5EFC", textColor: "#FFF", tools: "Slack, Notion, Claap, Loom" },
                        { label: "Couche 4 : Analytics & BI", color: "#22C55E", textColor: "#FFF", tools: "Looker Studio, Metabase, HubSpot Reports" },
                        { label: "Couche 3 : Enrichissement", color: "#FF7A59", textColor: "#FFF", tools: "Clay, Dropcontact, Apollo, Clearbit" },
                        { label: "Couche 2 : Automation", color: "#F59E0B", textColor: "#FFF", tools: "Make, n8n, Zapier, HubSpot Workflows" },
                        { label: "Couche 1 : CRM (fondation)", color: "#111", textColor: "#FFF", tools: "HubSpot, Salesforce, Pipedrive" },
                      ].map((layer, idx) => (
                        <div key={idx} className="relative">
                          <div
                            className="rounded-lg px-4 py-3 flex items-center justify-between"
                            style={{ background: layer.color, color: layer.textColor }}
                          >
                            <div>
                              <p className="text-[11px] font-semibold">{layer.label}</p>
                              <p className="text-[10px] opacity-70 mt-0.5">{layer.tools}</p>
                            </div>
                            {idx > 0 && idx < 6 && (
                              <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: layer.textColor, opacity: 0.4 }} />
                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: layer.textColor, opacity: 0.6 }} />
                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: layer.textColor, opacity: 0.8 }} />
                              </div>
                            )}
                          </div>
                          {idx < 6 && (
                            <div className="flex justify-center">
                              <div className="w-px h-2 bg-[#DDD]" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-[#999] text-center mt-4">Les donnees circulent de bas en haut. La couche Integration connecte l&apos;ensemble.</p>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;ordre des couches n&apos;est pas arbitraire. Vous ne pouvez pas faire d&apos;analytics fiable sans un CRM propre. Vous ne pouvez pas automatiser correctement sans comprendre vos processus. Vous ne pouvez pas deployer de l&apos;IA utile sans des donnees structurees. Chaque couche depend de la qualite de la precedente.</p>
                    <p>Detaillons maintenant chaque couche : les outils de reference, les criteres de choix, et les pieges a eviter.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 : Couche 1 - CRM */}
              <section id="couche-crm" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Couche 1 : CRM -- La fondation de votre stack</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Le CRM est la couche fondamentale. C&apos;est la source de verite sur vos contacts, entreprises, deals et interactions. Tout le reste du stack en depend. Un mauvais choix de CRM contamine l&apos;ensemble de votre architecture. Un CRM bien configure est le socle sur lequel vous construisez tout le reste.</p>
                    <p>En 2026, trois CRM dominent le marche B2B francais. Chacun a une philosophie differente et convient a un profil d&apos;entreprise precis.</p>
                  </div>

                  {/* Tool cards with favicons */}
                  <div className="space-y-3 mb-5">
                    {[
                      {
                        name: "HubSpot",
                        domain: "hubspot.com",
                        verdict: "Le choix par defaut pour les PME et ETI",
                        desc: "Ecosysteme complet (CRM + Marketing + Sales + Service + Operations) avec un plan gratuit genereux. Interface intuitive, adoption rapide par les equipes. Le meilleur rapport qualite/prix pour les entreprises de 5 a 200 personnes. Les plans payants (Starter a 15 EUR/mois/utilisateur, Pro a 90 EUR) ajoutent l&apos;automation avancee, le scoring et les sequences.",
                        price: "Gratuit a 90 EUR/utilisateur/mois",
                        ideal: "PME 5-200 personnes, equipes non techniques",
                        color: "#FF7A59",
                      },
                      {
                        name: "Salesforce",
                        domain: "salesforce.com",
                        verdict: "Pour les organisations complexes qui ont besoin de personnalisation poussee",
                        desc: "Le CRM le plus puissant et le plus personnalisable du marche. Mais cette puissance a un cout : complexite de mise en oeuvre, necessite d&apos;un admin dedie, et pricing opaque qui grimpe vite avec les add-ons (CPQ, Pardot, Einstein). Salesforce est justifie quand vous avez des processus commerciaux complexes, plusieurs business units, ou des besoins de reporting tres specifiques.",
                        price: "25 a 300+ EUR/utilisateur/mois",
                        ideal: "ETI 200+ personnes, processus complexes, admin dedie",
                        color: "#00A1E0",
                      },
                      {
                        name: "Pipedrive",
                        domain: "pipedrive.com",
                        verdict: "Le CRM des commerciaux terrain qui veulent de la simplicite",
                        desc: "Interface centree 100% sur le pipeline commercial. Prise en main en quelques heures, pas en quelques semaines. Pipedrive excelle pour les equipes de 3 a 20 commerciaux qui veulent un outil de suivi de deals sans la complexite d&apos;un HubSpot ou Salesforce. Limite en revanche sur le marketing automation et l&apos;analytics avancee.",
                        price: "14 a 99 EUR/utilisateur/mois",
                        ideal: "TPE/PME 3-20 commerciaux, usage terrain",
                        color: "#22C55E",
                      },
                    ].map((tool) => (
                      <div key={tool.name} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=32`} alt={tool.name} width={20} height={20} className="rounded" />
                          <span className="text-[13px] font-semibold text-[#111]">{tool.name}</span>
                          <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${tool.color}15`, color: tool.color }}>{tool.price}</span>
                        </div>
                        <p className="text-[12px] font-medium text-[#111] mb-2">{tool.verdict}</p>
                        <p className="text-[12px] text-[#666] leading-[1.7] mb-3">{tool.desc}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-[#999]">Ideal pour :</span>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F5F5F5] text-[#666]">{tool.ideal}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[11px] font-semibold text-[#111] mb-2">Notre recommandation</p>
                    <p className="text-[12px] text-[#666] leading-[1.7]">Pour 80% des entreprises B2B francaises de moins de 200 personnes, HubSpot est le meilleur choix. L&apos;ecosysteme natif est suffisamment riche pour eviter d&apos;empiler des outils tiers, le plan gratuit permet de demarrer sans risque, et la montee en gamme est progressive. N&apos;allez sur Salesforce que si vous avez un admin CRM a temps plein et des processus metier qui justifient la complexite.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 : Couche 2 - Automation */}
              <section id="couche-automation" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Couche 2 : Automation -- Automatiser sans sur-ingenierer</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>La couche d&apos;automation est celle qui genere le plus de ROI immediat. Chaque processus manuel supprime est du temps libere pour des taches a plus forte valeur ajoutee. Mais c&apos;est aussi la couche la plus dangereuse : une mauvaise automation peut corrompre vos donnees, spammer vos clients, ou creer des boucles infinies qui font exploser vos couts.</p>
                    <p>Il faut distinguer deux types d&apos;automation. L&apos;automation interne au CRM (workflows HubSpot, Salesforce Flow) qui gere les processus directement dans votre outil principal. Et l&apos;automation cross-app (Make, n8n, Zapier) qui connecte des outils distincts entre eux. Les deux sont complementaires, pas interchangeables.</p>
                  </div>

                  {/* Comparison table */}
                  <div className="rounded-lg border border-[#F2F2F2] overflow-hidden mb-5">
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="bg-[#FAFAFA] border-b border-[#F2F2F2]">
                            <th className="text-left px-4 py-3 font-semibold text-[#111]">Outil</th>
                            <th className="text-left px-4 py-3 font-semibold text-[#111]">Type</th>
                            <th className="text-left px-4 py-3 font-semibold text-[#111]">Force</th>
                            <th className="text-left px-4 py-3 font-semibold text-[#111]">Limite</th>
                            <th className="text-left px-4 py-3 font-semibold text-[#111]">Prix</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              name: "Make", domain: "make.com",
                              type: "Cross-app", force: "Interface visuelle, prix agressif, 1800+ connecteurs",
                              limite: "Debugging parfois fastidieux sur les scenarios complexes",
                              prix: "Gratuit a 29 EUR/mois"
                            },
                            {
                              name: "n8n", domain: "n8n.io",
                              type: "Cross-app", force: "Self-hosted possible, code natif (JS), gratuit en open source",
                              limite: "Courbe d&apos;apprentissage technique, moins de connecteurs natifs",
                              prix: "Gratuit (self) a 20 EUR/mois"
                            },
                            {
                              name: "Zapier", domain: "zapier.com",
                              type: "Cross-app", force: "Le plus grand ecosysteme de connecteurs (6000+), simplicite",
                              limite: "Cher a l&apos;echelle, pas de logique conditionnelle avancee sans code",
                              prix: "Gratuit a 69 EUR/mois"
                            },
                            {
                              name: "HubSpot Workflows", domain: "hubspot.com",
                              type: "Interne CRM", force: "Integration native parfaite, pas de mapping, pas de latence",
                              limite: "Limite au perimetre HubSpot, necessite plan Pro minimum",
                              prix: "Inclus dans HubSpot Pro"
                            },
                          ].map((row) => (
                            <tr key={row.name} className="border-b border-[#F8F8F8] hover:bg-[#FAFAFA] transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <img src={`https://www.google.com/s2/favicons?domain=${row.domain}&sz=32`} alt={row.name} width={16} height={16} className="rounded" />
                                  <span className="font-medium text-[#111]">{row.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-[#666]">{row.type}</td>
                              <td className="px-4 py-3 text-[#666]">{row.force}</td>
                              <td className="px-4 py-3 text-[#999]">{row.limite}</td>
                              <td className="px-4 py-3 text-[#666] whitespace-nowrap">{row.prix}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La regle d&apos;or : utilisez les workflows natifs de votre CRM pour tout ce qui concerne les donnees CRM (changement de statut, assignation de leads, envoi de sequences). Utilisez un outil cross-app (Make ou n8n) uniquement pour les flux qui impliquent des outils externes (enrichissement, notifications Slack, synchronisation avec la facturation).</p>
                    <p>Make est notre recommandation par defaut pour les PME. L&apos;interface visuelle est accessible aux profils non techniques, le pricing est raisonnable, et l&apos;ecosysteme de connecteurs couvre 95% des besoins. n8n est un excellent choix pour les equipes techniques qui veulent garder le controle total et heberger leurs automations.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 : Couche 3 - Enrichissement */}
              <section id="couche-enrichissement" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Couche 3 : Enrichissement -- La qualite des donnees a la source</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Un contact dans votre CRM avec juste un email et un prenom ne vaut pas grand-chose. L&apos;enrichissement consiste a completer automatiquement les fiches contacts et entreprises avec des donnees firmographiques (taille, secteur, CA, technologie utilisee), des donnees de contact (numero de telephone, profil LinkedIn, poste exact), et des signaux d&apos;intent (levee de fonds, recrutement, publication).</p>
                    <p>L&apos;enrichissement est devenu un enjeu strategique en 2026 pour deux raisons. D&apos;abord, la qualite de votre scoring depend directement de la completude de vos donnees. Un lead scoring base sur des champs vides est un scoring inutile. Ensuite, les outils d&apos;IA generative que vous deploierez dans la couche 6 ne peuvent produire des resultats pertinents que s&apos;ils disposent de donnees riches en entree.</p>
                  </div>

                  {/* Tool ecosystem map */}
                  <div className="rounded-lg border border-[#F2F2F2] bg-[#FAFAFA] p-5 mb-5">
                    <p className="text-[11px] font-semibold text-[#111] mb-4 text-center uppercase tracking-wider">Ecosysteme enrichissement B2B -- Positionnement</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          name: "Clay", domain: "clay.com", color: "#6C5CE7",
                          position: "Orchestrateur d&apos;enrichissement",
                          desc: "Agrege 75+ sources de donnees dans un tableur intelligent. Enrichissement waterfall : si la source A n&apos;a pas la donnee, il essaie la source B, puis C. Le plus puissant et le plus flexible du marche.",
                          prix: "A partir de 149$/mois"
                        },
                        {
                          name: "Dropcontact", domain: "dropcontact.com", color: "#22C55E",
                          position: "Enrichissement conforme RGPD",
                          desc: "Solution francaise specialisee dans l&apos;enrichissement d&apos;emails B2B. Ne revend pas de base de donnees : genere les emails par algorithme. Conforme RGPD nativement. Integration HubSpot native.",
                          prix: "A partir de 24 EUR/mois"
                        },
                        {
                          name: "Apollo", domain: "apollo.io", color: "#4B5EFC",
                          position: "Base de donnees + enrichissement + sequences",
                          desc: "275 millions de contacts dans la base. Combine prospection, enrichissement et sequences email dans un seul outil. Excellent rapport qualite/prix pour les equipes sales qui veulent un outil tout-en-un.",
                          prix: "Gratuit a 79$/mois/utilisateur"
                        },
                        {
                          name: "Clearbit", domain: "clearbit.com", color: "#FF7A59",
                          position: "Enrichissement et reveal entreprise",
                          desc: "Rachete par HubSpot en 2023. Enrichissement firmographique de reference et identification des visiteurs de site web (reveal). Integration native dans HubSpot. Le plus adapte si vous etes deja dans l&apos;ecosysteme HubSpot.",
                          prix: "Inclus dans HubSpot Breeze (plans Pro+)"
                        },
                      ].map((tool) => (
                        <div key={tool.name} className="rounded-lg border border-[#EAEAEA] bg-white p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <img src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=32`} alt={tool.name} width={18} height={18} className="rounded" />
                            <span className="text-[12px] font-semibold text-[#111]">{tool.name}</span>
                          </div>
                          <p className="text-[10px] font-medium mb-2 px-2 py-0.5 rounded-full inline-block" style={{ background: `${tool.color}12`, color: tool.color }}>{tool.position}</p>
                          <p className="text-[11px] text-[#666] leading-[1.65] mb-2">{tool.desc}</p>
                          <p className="text-[10px] text-[#999]">{tool.prix}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La tendance majeure en 2026 est l&apos;enrichissement waterfall, popularise par Clay. Plutot que de dependre d&apos;une seule source de donnees, vous enchainez plusieurs providers dans un ordre de priorite. Le taux de completude passe de 40-60% avec un seul provider a 80-90% avec une cascade de trois ou quatre sources. C&apos;est un changement de paradigme pour la qualite des donnees CRM.</p>
                    <p>Pour les entreprises francaises, Dropcontact reste incontournable pour la conformite RGPD. Combinee avec Clay ou Apollo pour les donnees firmographiques, c&apos;est la combinaison qui offre le meilleur equilibre entre richesse des donnees et conformite reglementaire.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 : Couche 4 - Analytics et BI */}
              <section id="couche-analytics" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Couche 4 : Analytics et BI -- Mesurer ce qui compte</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Les donnees sans analyse ne sont que du stockage. La couche analytics transforme les donnees brutes de votre CRM et de vos outils en insights actionnables. C&apos;est la couche qui permet aux dirigeants de prendre des decisions basees sur des faits, pas sur des intuitions.</p>
                    <p>En RevOps, les metriques cles se repartissent en trois familles : les metriques de pipeline (nombre de deals, valeur, vitesse de progression, taux de conversion par etape), les metriques d&apos;activite (appels, emails, reunions, taux de reponse) et les metriques de revenus (MRR, ARR, churn, LTV, CAC). Chaque outil d&apos;analytics a des forces differentes sur ces trois familles.</p>
                  </div>

                  <div className="space-y-3 mb-5">
                    {[
                      {
                        name: "Looker Studio",
                        domain: "lookerstudio.google.com",
                        desc: "L&apos;outil de BI gratuit de Google. Connexion native a Google Sheets, BigQuery, et via connecteurs tiers a HubSpot et Salesforce. Ideal pour les dashboards partages, les rapports clients, et les visualisations qui doivent etre accessibles a toute l&apos;organisation. Limite : temps reel complexe, pas d&apos;alertes automatiques.",
                        force: "Gratuit, partageable, connecteurs riches",
                        color: "#4B5EFC",
                      },
                      {
                        name: "Metabase",
                        domain: "metabase.com",
                        desc: "BI open source qui se connecte directement a votre base de donnees. Permet de creer des dashboards sans SQL (mode visuel) ou avec SQL pour les requetes avancees. Self-hosted ou cloud. L&apos;alternative open source a Tableau pour les equipes qui veulent garder le controle sur leurs donnees.",
                        force: "Open source, requetes SQL, self-hosted possible",
                        color: "#22C55E",
                      },
                      {
                        name: "HubSpot Reports",
                        domain: "hubspot.com",
                        desc: "Le reporting natif de HubSpot. Avantage decisif : les donnees sont deja la, pas de connecteur a maintenir, pas de mapping a gerer. Les rapports custom (disponibles a partir du plan Pro) couvrent 80% des besoins d&apos;une equipe RevOps. Limite : pas de croisement avec des donnees externes sans integration.",
                        force: "Zero integration, donnees temps reel, rapports custom",
                        color: "#FF7A59",
                      },
                    ].map((tool) => (
                      <div key={tool.name} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=32`} alt={tool.name} width={18} height={18} className="rounded" />
                          <span className="text-[12px] font-semibold text-[#111]">{tool.name}</span>
                          <span className="ml-auto text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${tool.color}15`, color: tool.color }}>{tool.force}</span>
                        </div>
                        <p className="text-[12px] text-[#666] leading-[1.7]">{tool.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;approche que nous recommandons : utilisez HubSpot Reports pour le reporting operationnel quotidien (pipeline, activite, forecasting). Ajoutez Looker Studio ou Metabase pour les dashboards strategiques qui croisent des donnees de plusieurs sources (CRM + facturation + marketing + produit). Ne dupliquez pas les memes rapports dans deux outils differents, c&apos;est une source garantie de confusion.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 : Couche 5 - Communication */}
              <section id="couche-communication" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Couche 5 : Communication -- Aligner les equipes en temps reel</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Le RevOps est par definition transversal. Il aligne marketing, sales et customer success autour d&apos;objectifs communs. Cet alignement ne peut pas reposer uniquement sur des reunions hebdomadaires et des emails. Il faut des outils de communication qui rendent l&apos;information visible, accessible et actionnable en temps reel.</p>
                    <p>La couche communication n&apos;est pas un nice-to-have. C&apos;est ce qui fait la difference entre une equipe qui reagit en 24 heures a un signal d&apos;alerte et une equipe qui reagit en 5 minutes. En B2B, cette difference se traduit directement en deals gagnes ou perdus.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      {
                        name: "Slack", domain: "slack.com", color: "#6C5CE7",
                        role: "Hub de communication temps reel",
                        desc: "Channels dedies par deal, par client, par equipe. Notifications CRM automatiques (nouveau lead, deal gagne, deal perdu). Integration native avec HubSpot, Make, et la quasi-totalite des outils SaaS. Le systeme nerveux de votre stack RevOps.",
                      },
                      {
                        name: "Notion", domain: "notion.so", color: "#111",
                        role: "Base de connaissances et documentation",
                        desc: "Playbooks de vente, fiches objections, process onboarding, documentation technique. Tout ce qui doit etre ecrit, structure et retrouvable. L&apos;alternative aux Google Docs eparpilles dans 15 dossiers differents.",
                      },
                      {
                        name: "Claap", domain: "claap.io", color: "#4B5EFC",
                        role: "Enregistrement et analyse des appels",
                        desc: "Enregistrement automatique des meetings, transcription IA, resume des points cles. Permet aux managers de coacher sans assister a chaque call. Analyse des patterns de vente (temps de parole, objections recurrentes, questions posees). Alternative francaise a Gong.",
                      },
                      {
                        name: "Loom", domain: "loom.com", color: "#FF7A59",
                        role: "Communication asynchrone video",
                        desc: "Videos rapides pour expliquer un process, faire un debriefing, presenter une analyse. Remplace les reunions inutiles. Integrable dans Slack et Notion. Particulierement utile pour les equipes distribuees ou en mode hybride.",
                      },
                    ].map((tool) => (
                      <div key={tool.name} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <img src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=32`} alt={tool.name} width={16} height={16} className="rounded" />
                          <span className="text-[12px] font-semibold text-[#111]">{tool.name}</span>
                        </div>
                        <p className="text-[10px] font-medium mb-2 px-2 py-0.5 rounded-full inline-block" style={{ background: `${tool.color}12`, color: tool.color }}>{tool.role}</p>
                        <p className="text-[11px] text-[#666] leading-[1.65]">{tool.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;erreur la plus courante sur cette couche est de ne pas connecter les outils de communication au CRM. Slack doit recevoir les notifications CRM critiques en temps reel : nouveau MQL, deal passe en negociation, client churne. Notion doit contenir les playbooks qui referencent les proprietes CRM et les etapes du pipeline. Sans cette connexion, vous avez deux mondes paralleles qui ne se parlent pas.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 : Couche 6 - IA */}
              <section id="couche-ia" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Couche 6 : Intelligence Artificielle -- L&apos;acceleration des operations</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>L&apos;IA generative a radicalement transforme les operations revenue en 18 mois. Ce qui etait un gadget en 2024 est devenu un avantage competitif mesurable en 2026. Les equipes qui deploient l&apos;IA de maniere structuree sur leurs processus commerciaux gagnent en moyenne 2 a 3 heures par jour et par commercial, selon McKinsey.</p>
                    <p>Mais attention : l&apos;IA n&apos;est pas une baguette magique. Elle amplifie ce qui existe deja. Si vos donnees CRM sont mauvaises, l&apos;IA produira des analyses fausses plus vite. Si vos processus sont bancals, l&apos;IA automatisera le chaos plus efficacement. C&apos;est pourquoi la couche IA arrive en sixieme position, pas en premiere : elle depend de la qualite de toutes les couches precedentes.</p>
                  </div>

                  <div className="space-y-3 mb-5">
                    {[
                      {
                        name: "Claude (Anthropic)",
                        domain: "anthropic.com",
                        color: "#6C5CE7",
                        usages: ["Analyse de donnees CRM et generation d&apos;insights", "Redaction d&apos;emails et sequences personnalisees", "Synthese de notes de meeting et d&apos;appels", "Creation de playbooks et documentation interne"],
                        force: "Raisonnement long, fiabilite, respect des instructions complexes. Le modele le plus adapte pour les taches analytiques et la generation de contenu structure.",
                      },
                      {
                        name: "ChatGPT (OpenAI)",
                        domain: "openai.com",
                        color: "#22C55E",
                        usages: ["Brainstorming et ideation", "Redaction rapide de contenu marketing", "Analyse de donnees via Code Interpreter", "Prototypage de prompts et workflows IA"],
                        force: "Ecosysteme GPTs, adoption large, Code Interpreter pour l&apos;analyse de fichiers. Le plus generaliste et le plus connu des equipes.",
                      },
                      {
                        name: "Agents IA custom",
                        domain: "make.com",
                        color: "#FF7A59",
                        usages: ["Scoring predictif automatise", "Alertes intelligentes sur le pipeline", "Qualification automatique des leads entrants", "Suggestions de next best action pour les commerciaux"],
                        force: "Construit sur mesure avec Make ou n8n + API Claude/GPT. Connecte directement a votre CRM et vos donnees. L&apos;investissement le plus strategique a moyen terme.",
                      },
                    ].map((tool) => (
                      <div key={tool.name} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=32`} alt={tool.name} width={18} height={18} className="rounded" />
                          <span className="text-[12px] font-semibold text-[#111]">{tool.name}</span>
                        </div>
                        <p className="text-[12px] text-[#666] leading-[1.7] mb-3">{tool.force}</p>
                        <div className="space-y-1.5">
                          {tool.usages.map((usage, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: tool.color }} />
                              <p className="text-[11px] text-[#666] leading-[1.5]">{usage}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;approche pragmatique en 2026 est de commencer par les usages a faible risque et fort impact : synthese de meetings, drafts d&apos;emails, analyse de pipeline. Puis de progresser vers les agents autonomes qui prennent des decisions (scoring, routing, qualification). Chaque etape doit etre mesuree en temps gagne et en impact sur le pipeline.</p>
                    <p>Notre conviction : Claude est le modele le plus adapte pour les cas d&apos;usage RevOps en 2026. Sa capacite a traiter de longs contextes (notes d&apos;appel, historique CRM, playbooks entiers) et a produire des analyses structurees en fait l&apos;outil ideal pour les equipes revenue. C&apos;est le modele que nous utilisons chez Ceres pour tous nos agents internes.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 : Couche 7 - Integration */}
              <section id="couche-integration" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Couche 7 : Integration et iPaaS -- Le ciment du stack</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>La couche d&apos;integration est ce qui transforme une collection d&apos;outils isoles en un systeme coherent. Sans elle, chaque outil fonctionne en silo, les donnees sont dupliquees et desynchronisees, et les equipes passent leur temps a copier-coller des informations d&apos;un outil a l&apos;autre.</p>
                    <p>Le terme iPaaS (Integration Platform as a Service) designe les plateformes qui permettent de connecter des applications entre elles sans developpement custom. C&apos;est la meme categorie d&apos;outils que la couche automation (Make, n8n, Zapier), mais utilisee ici dans une logique de synchronisation de donnees plutot que d&apos;automatisation de processus.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      {
                        name: "Make",
                        domain: "make.com",
                        color: "#6C5CE7",
                        tier: "PME",
                        desc: "Le meilleur rapport qualite/prix pour les PME. Interface visuelle, 1800+ connecteurs, pricing transparent. Gere a la fois l&apos;automation et la synchronisation de donnees. Notre outil de reference chez Ceres.",
                      },
                      {
                        name: "n8n",
                        domain: "n8n.io",
                        color: "#4B5EFC",
                        tier: "Equipes tech",
                        desc: "Open source, self-hosted possible, code natif (JavaScript/Python). Ideal pour les equipes avec un developpeur qui veut garder le controle total. Pas de vendor lock-in.",
                      },
                      {
                        name: "Tray.io",
                        domain: "tray.io",
                        color: "#FF7A59",
                        tier: "ETI/Enterprise",
                        desc: "Plateforme enterprise avec gouvernance, versionning, environnements de test. Concu pour les organisations qui ont besoin de controle, d&apos;audit trail et de gestion fine des droits.",
                      },
                      {
                        name: "Workato",
                        domain: "workato.com",
                        color: "#22C55E",
                        tier: "Enterprise",
                        desc: "Le leader du Gartner Magic Quadrant iPaaS. Capacites IT avancees (API management, governance, orchestration). Justifie uniquement pour les organisations avec 50+ integrations a gerer.",
                      },
                    ].map((tool) => (
                      <div key={tool.name} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <img src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=32`} alt={tool.name} width={16} height={16} className="rounded" />
                          <span className="text-[12px] font-semibold text-[#111]">{tool.name}</span>
                          <span className="ml-auto text-[9px] font-medium px-2 py-0.5 rounded-full" style={{ background: `${tool.color}12`, color: tool.color }}>{tool.tier}</span>
                        </div>
                        <p className="text-[11px] text-[#666] leading-[1.65]">{tool.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le principe fondamental de la couche integration est le single source of truth. Chaque type de donnee (contact, entreprise, deal, activite) doit avoir un seul systeme maitre. Les autres outils sont des consommateurs de cette donnee, pas des sources alternatives. Si le CRM est votre source de verite pour les contacts, alors l&apos;outil d&apos;enrichissement envoie ses donnees vers le CRM, pas l&apos;inverse.</p>
                    <p>Documentez chaque integration : quel outil envoie quoi a quel outil, dans quelle direction, a quelle frequence, et quel est le systeme maitre pour chaque type de donnee. Ce document, que nous appelons la cartographie d&apos;integration, est l&apos;un des livrables les plus precieux d&apos;un projet RevOps.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 : Le stack par taille d'entreprise */}
              <section id="stack-par-taille" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Le stack RevOps par taille d&apos;entreprise</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Le stack ideal depend de votre taille, de votre maturite technique et de votre budget. Voici trois configurations types, testees et validees sur le terrain. Chaque configuration couvre les sept couches avec un equilibre adapte entre fonctionnalites et cout.</p>
                  </div>

                  {/* Budget cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        title: "Startup / TPE",
                        subtitle: "2 a 10 personnes",
                        budget: "0 - 200 EUR/mois",
                        color: "#22C55E",
                        tools: [
                          { couche: "CRM", outil: "HubSpot Free" },
                          { couche: "Automation", outil: "Make (plan gratuit)" },
                          { couche: "Enrichissement", outil: "Apollo (plan gratuit)" },
                          { couche: "Analytics", outil: "HubSpot Reports" },
                          { couche: "Communication", outil: "Slack Free + Notion Free" },
                          { couche: "IA", outil: "Claude / ChatGPT (plan pro)" },
                          { couche: "Integration", outil: "Make (plan gratuit)" },
                        ],
                        note: "Privilegiez les plans gratuits. Investissez sur un seul outil payant a la fois. Le CRM et l&apos;IA generative sont les deux priorites.",
                      },
                      {
                        title: "PME",
                        subtitle: "10 a 100 personnes",
                        budget: "500 - 2 000 EUR/mois",
                        color: "#6C5CE7",
                        tools: [
                          { couche: "CRM", outil: "HubSpot Pro" },
                          { couche: "Automation", outil: "HubSpot Workflows + Make Pro" },
                          { couche: "Enrichissement", outil: "Dropcontact + Clay" },
                          { couche: "Analytics", outil: "HubSpot Reports + Looker Studio" },
                          { couche: "Communication", outil: "Slack Pro + Notion + Claap" },
                          { couche: "IA", outil: "Claude Team + agents custom" },
                          { couche: "Integration", outil: "Make (plan Team)" },
                        ],
                        note: "Le sweet spot du rapport fonctionnalites/prix. HubSpot Pro est le pivot central. Ajoutez Clay pour l&apos;enrichissement et investissez dans des agents IA custom.",
                      },
                      {
                        title: "ETI",
                        subtitle: "100 a 500 personnes",
                        budget: "5 000 - 15 000 EUR/mois",
                        color: "#FF7A59",
                        tools: [
                          { couche: "CRM", outil: "HubSpot Enterprise ou Salesforce" },
                          { couche: "Automation", outil: "HubSpot Workflows + Make Enterprise" },
                          { couche: "Enrichissement", outil: "Clay + Clearbit + Dropcontact" },
                          { couche: "Analytics", outil: "Metabase + Looker Studio + HubSpot" },
                          { couche: "Communication", outil: "Slack Business+ + Notion + Claap" },
                          { couche: "IA", outil: "Claude Enterprise + agents dedies" },
                          { couche: "Integration", outil: "Make Enterprise ou Tray.io" },
                        ],
                        note: "A cette echelle, vous avez besoin de gouvernance : droits d&apos;acces, audit trail, environnements de test. Prevoyez un budget admin/ops equivalent a 20% du cout des licences.",
                      },
                    ].map((config) => (
                      <div key={config.title} className="rounded-lg border-2 p-5 flex flex-col" style={{ borderColor: `${config.color}30` }}>
                        <div className="text-center mb-4">
                          <p className="text-[13px] font-semibold text-[#111]">{config.title}</p>
                          <p className="text-[10px] text-[#999] mb-2">{config.subtitle}</p>
                          <p className="text-[18px] font-bold" style={{ color: config.color }}>{config.budget}</p>
                        </div>
                        <div className="space-y-2 flex-1 mb-4">
                          {config.tools.map((t) => (
                            <div key={t.couche} className="flex items-start gap-2">
                              <span className="text-[9px] font-semibold text-[#999] uppercase w-[70px] shrink-0 mt-0.5">{t.couche}</span>
                              <span className="text-[10px] text-[#555] leading-[1.5]">{t.outil}</span>
                            </div>
                          ))}
                        </div>
                        <div className="rounded-lg bg-[#FAFAFA] p-3 mt-auto">
                          <p className="text-[10px] text-[#666] leading-[1.6]">{config.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 11 : Les erreurs de stack courantes */}
              <section id="erreurs-stack" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les erreurs de stack courantes</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>En accompagnant des dizaines d&apos;entreprises sur leur stack RevOps, nous voyons les memes erreurs revenir systematiquement. Voici les plus destructrices, et comment les eviter.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        title: "Over-tooling : accumuler les outils sans strategie",
                        color: "#EF4444",
                        desc: "Chaque nouveau probleme entraine l&apos;achat d&apos;un nouvel outil, sans verifier si un outil existant ne pourrait pas le resoudre. Resultat : 40% des licences SaaS sont sous-utilisees ou redondantes. Avant d&apos;acheter un nouvel outil, posez-vous trois questions. Est-ce que mon CRM ne fait pas deja ca ? Est-ce que je peux resoudre ce probleme avec une automation dans Make ? Est-ce qu&apos;un outil existant a un module ou un add-on pour ca ?",
                      },
                      {
                        title: "Zero integration : des outils qui ne se parlent pas",
                        color: "#FF7A59",
                        desc: "Avoir 15 outils sans qu&apos;aucun ne soit connecte au CRM. Les commerciaux saisissent les memes informations dans trois endroits differents. Les reportings sont faux parce que les donnees ne sont pas synchronisees. L&apos;integration n&apos;est pas un nice-to-have, c&apos;est un prerequis. Tout outil qui n&apos;est pas connecte a votre CRM dans les 30 premiers jours est un outil qui ne sera jamais adopte.",
                      },
                      {
                        title: "Shiny object syndrome : courir apres le dernier outil a la mode",
                        color: "#6C5CE7",
                        desc: "L&apos;ecosysteme SaaS lance un nouvel outil chaque semaine. La tentation est forte de tester le dernier outil d&apos;enrichissement IA, la derniere plateforme de sequencing, le dernier outil de call recording. Chaque migration a un cout : temps de configuration, transfert de donnees, reforming des equipes, adaptation des workflows. Ne changez d&apos;outil que si le ROI est clairement superieur au cout de migration.",
                      },
                      {
                        title: "Pas de documentation : le stack est dans la tete d&apos;une seule personne",
                        color: "#F59E0B",
                        desc: "Quand la personne qui a construit les automations quitte l&apos;entreprise, plus personne ne sait comment ca fonctionne. Les scenarios Make tournent en arriere-plan, personne ne sait ce qu&apos;ils font, et quand un bug apparait, c&apos;est la panique. Documentez chaque integration, chaque workflow, chaque mapping de champs. Ce n&apos;est pas du luxe, c&apos;est de la survie operationnelle.",
                      },
                      {
                        title: "Negliger la formation : deployer sans accompagner",
                        color: "#4B5EFC",
                        desc: "Acheter un outil ne suffit pas a generer de la valeur. Les equipes doivent etre formees, les processus adaptes, les habitudes changees. Un CRM a 10 000 EUR par an utilise a 30% de ses capacites est un gaspillage. Prevoyez un budget formation equivalent a 30% du cout de la premiere annee de licences. C&apos;est l&apos;investissement le plus rentable de votre stack.",
                      },
                    ].map((err) => (
                      <div key={err.title} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: err.color }} />
                          <div>
                            <p className="text-[12px] font-semibold text-[#111] mb-2">{err.title}</p>
                            <p className="text-[11px] text-[#666] leading-[1.7]">{err.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 12 : Notre stack chez Ceres (dark section) */}
              <section id="stack-ceres" className="mb-8">
                <div className="rounded-lg bg-gradient-to-br from-[#111] to-[#1A1A1A] p-5 md:p-8 border border-[#333]">
                  <h2 className="text-[17px] font-semibold text-white mb-2">Notre stack chez Ceres</h2>
                  <p className="text-[12px] text-[#999] leading-[1.7] mb-6">Transparence totale. Voici exactement les outils que nous utilisons en interne et que nous deployon chez nos clients. Pas de partenariats caches, pas de commissions sur les recommandations. Uniquement les outils que nous trouvons les plus efficaces en 2026.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {[
                      {
                        couche: "CRM",
                        outil: "HubSpot",
                        domain: "hubspot.com",
                        color: "#FF7A59",
                        detail: "Plan Pro pour nos clients, Enterprise pour les ETI. C&apos;est notre plateforme de reference. On le deploie, on le configure, on le maintient. 95% de nos clients sont sur HubSpot.",
                      },
                      {
                        couche: "Automation",
                        outil: "Make + HubSpot Workflows",
                        domain: "make.com",
                        color: "#6C5CE7",
                        detail: "HubSpot Workflows pour tout ce qui est interne au CRM. Make pour toutes les automations cross-app : enrichissement, notifications Slack, synchronisation facturation, agents IA.",
                      },
                      {
                        couche: "Enrichissement",
                        outil: "Clay + Dropcontact",
                        domain: "clay.com",
                        color: "#22C55E",
                        detail: "Clay pour l&apos;enrichissement waterfall multi-sources. Dropcontact pour les emails B2B conformes RGPD. Les deux combines donnent un taux de completude de 85%+ sur les fiches contact.",
                      },
                      {
                        couche: "Analytics",
                        outil: "HubSpot Reports + Looker Studio",
                        domain: "lookerstudio.google.com",
                        color: "#4B5EFC",
                        detail: "HubSpot Reports pour le quotidien operationnel. Looker Studio pour les dashboards strategiques qui croisent CRM + marketing + facturation. Notre produit RevOps AI pour l&apos;analytics augmentee par l&apos;IA.",
                      },
                      {
                        couche: "Communication",
                        outil: "Slack + Notion + Claap",
                        domain: "slack.com",
                        color: "#F59E0B",
                        detail: "Slack pour le temps reel et les alertes CRM. Notion pour la documentation et les playbooks. Claap pour l&apos;enregistrement et l&apos;analyse des appels commerciaux.",
                      },
                      {
                        couche: "IA",
                        outil: "Claude (Anthropic)",
                        domain: "anthropic.com",
                        color: "#6C5CE7",
                        detail: "Claude est notre modele principal pour tous les agents IA que nous construisons : analyse de pipeline, scoring, resume d&apos;appels, suggestions d&apos;actions. C&apos;est aussi le moteur de RevOps AI, notre produit.",
                      },
                      {
                        couche: "Integration",
                        outil: "Make (plan Team)",
                        domain: "make.com",
                        color: "#FF7A59",
                        detail: "Make gere toutes nos integrations : CRM vers facturation, CRM vers Slack, enrichissement vers CRM, agents IA vers CRM. Plus de 40 scenarios actifs en production.",
                      },
                      {
                        couche: "Prospection",
                        outil: "Apollo + Lemlist",
                        domain: "apollo.io",
                        color: "#4B5EFC",
                        detail: "Apollo pour la base de donnees prospects et l&apos;enrichissement. Lemlist pour les sequences multicanal (email + LinkedIn). Les deux connectes a HubSpot via Make.",
                      },
                    ].map((item) => (
                      <div key={item.couche} className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <img src={`https://www.google.com/s2/favicons?domain=${item.domain}&sz=32`} alt={item.outil} width={16} height={16} className="rounded opacity-80" />
                          <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: item.color }}>{item.couche}</span>
                        </div>
                        <p className="text-[12px] font-semibold text-white mb-1.5">{item.outil}</p>
                        <p className="text-[11px] text-[#888] leading-[1.65]">{item.detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-[13px] text-[#999] leading-[1.75]">
                    <p>Ce stack nous coute environ 1 200 EUR par mois pour une equipe de 5 personnes. C&apos;est un investissement significatif, mais chaque outil a un ROI mesure et documente. Le plus important n&apos;est pas le nombre d&apos;outils ni le budget : c&apos;est la coherence de l&apos;ensemble et la qualite des integrations entre chaque couche.</p>
                    <p>Nous ne recommandons jamais un outil que nous n&apos;utilisons pas nous-memes. C&apos;est la meilleure garantie que nos conseils sont bases sur l&apos;experience reelle, pas sur des fiches marketing.</p>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <div className="mb-12 rounded-lg bg-gradient-to-br from-[#111] to-[#1A1A1A] p-6 md:p-8 text-center border border-[#333]">
                <h3 className="text-[17px] font-semibold text-white mb-3">Besoin d&apos;auditer ou de repenser votre stack RevOps ?</h3>
                <p className="text-[13px] text-[#999] leading-[1.7] mb-5 max-w-[500px] mx-auto">Chez Ceres, on audite votre stack existant, on identifie les redondances et les maillons manquants, et on construit une architecture integree adaptee a votre taille et votre budget. Un diagnostic complet en 5 jours avec un plan d&apos;action priorise.</p>
                <Link href="https://calendly.com/ceres-revops/30min" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#6C5CE7] text-white rounded-lg text-[13px] font-medium hover:bg-[#5A4BD6] transition-colors">
                  Demander un audit stack
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </Link>
              </div>

              {/* Related articles */}
              <div>
                <h3 className="text-[14px] font-semibold text-[#111] mb-4">Articles complementaires</h3>
                <div className="grid gap-3">
                  {relatedArticles.map((a) => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="group flex items-center gap-4 rounded-lg border border-[#F2F2F2] p-4 hover:border-[#DDD] transition-colors">
                      <div className="w-1 h-10 rounded-full" style={{ background: a.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-medium mb-1" style={{ color: a.color }}>{a.category}</p>
                        <p className="text-[12px] font-medium text-[#111] group-hover:text-[#6C5CE7] transition-colors leading-[1.4]">{a.title}</p>
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