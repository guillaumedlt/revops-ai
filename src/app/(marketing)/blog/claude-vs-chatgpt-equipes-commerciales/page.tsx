"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Claude vs ChatGPT pour les equipes commerciales : le comparatif complet 2026",
  description: "Comparaison detaillee de Claude et ChatGPT pour les equipes de vente B2B : redaction d'emails, analyse CRM, resume de calls, enrichissement de comptes, coaching commercial, API et integrations, prix. Retour d'experience d'une equipe RevOps qui utilise les deux au quotidien.",
  author: { "@type": "Person", name: "Guillaume Delachet" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  datePublished: "2026-03-04",
  dateModified: "2026-03-04",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/claude-vs-chatgpt-equipes-commerciales" },
  articleSection: "IA & Automatisation",
  wordCount: 3200,
  inLanguage: "fr",
};

const sections = [
  { id: "pourquoi-comparer", title: "Pourquoi comparer pour la vente" },
  { id: "modeles-2026", title: "Les modeles en 2026" },
  { id: "emails-prospection", title: "Emails de prospection" },
  { id: "analyse-crm", title: "Analyse de donnees CRM" },
  { id: "resume-calls", title: "Resume de calls" },
  { id: "enrichissement", title: "Enrichissement de comptes" },
  { id: "coaching", title: "Coaching commercial" },
  { id: "api-integration", title: "API et integrations" },
  { id: "prix-tokens", title: "Prix et tokens" },
  { id: "tableau-comparatif", title: "Tableau comparatif global" },
  { id: "choix-ceres", title: "Notre choix chez Ceres" },
];

const relatedArticles = [
  { title: "Comparatif outils de generation de leads et enrichissement B2B", slug: "comparatif-outils-generation-leads-enrichissement", category: "Process & Outils", color: "#6C5CE7" },
  { title: "9 actions commerciales a automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "Automatisation", color: "#FF7A59" },
  { title: "Meilleures pratiques pour vos sequences HubSpot", slug: "meilleures-pratiques-sequences-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function ClaudeVsChatGPTArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("pourquoi-comparer");

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
        <div className="h-full bg-[#6D00CC] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "6%", width: 300, height: 300, borderRadius: "50%", background: "#6D00CC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "18%", width: 280, height: 280, borderRadius: "50%", background: "#10A37F", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "35%", width: 260, height: 260, borderRadius: "50%", background: "#D97757", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "52%", width: 300, height: 300, borderRadius: "50%", background: "#6D00CC", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "70%", width: 260, height: 260, borderRadius: "50%", background: "#10A37F", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "85%", width: 240, height: 240, borderRadius: "50%", background: "#D97757", opacity: 0.07, filter: "blur(70px)" }} />

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
                        ? "border-[#6D00CC] text-[#111] font-medium"
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
                  <a href="https://twitter.com/intent/tweet?text=Claude%20vs%20ChatGPT%20pour%20les%20equipes%20commerciales&url=https://www.ceres-revops.com/blog/claude-vs-chatgpt-equipes-commerciales" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/claude-vs-chatgpt-equipes-commerciales" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Claude vs ChatGPT</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>IA &amp; Automatisation</Badge>
                <span className="text-[11px] text-[#CCC]">14 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Claude vs ChatGPT pour les equipes commerciales : le comparatif
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                On utilise Claude et ChatGPT tous les jours chez Ceres pour nos missions RevOps. Redaction d&apos;emails de prospection, analyse de donnees CRM, resume de calls, enrichissement de comptes, coaching commercial. Deux outils differents, deux philosophies, des forces complementaires. Voici notre comparatif honnete, cas d&apos;usage par cas d&apos;usage, pour les equipes de vente B2B.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>4 mars 2026</span>
              </div>

              {/* Interface comparison hero */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#D97757]/30 bg-[#FDF4EF] p-4 text-center">
                  <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-[13px] font-semibold text-[#111]">Claude</p>
                  <p className="text-[10px] text-[#999] mt-1">Anthropic</p>
                </div>
                <div className="rounded-xl border border-[#10A37F]/30 bg-[#F0FAF6] p-4 text-center">
                  <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-[13px] font-semibold text-[#111]">ChatGPT</p>
                  <p className="text-[10px] text-[#999] mt-1">OpenAI</p>
                </div>
              </div>
            </header>

            <article>
              {/* Section 1 : Pourquoi comparer */}
              <section id="pourquoi-comparer" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi comparer Claude et ChatGPT pour la vente</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Depuis fin 2024, l&apos;IA generative est devenue un outil de travail quotidien pour les equipes commerciales B2B. On ne parle plus d&apos;un gadget ou d&apos;une curiosite technologique. On parle d&apos;un levier concret qui permet a un commercial de rediger un email de prospection en 30 secondes, d&apos;analyser un pipeline de 200 deals en deux minutes, ou de preparer un rendez-vous client a partir d&apos;un transcript de call.</p>
                    <p>Deux plateformes dominent le marche : ChatGPT d&apos;OpenAI, et Claude d&apos;Anthropic. Les deux sont excellentes. Les deux evoluent a une vitesse vertigineuse. Mais elles n&apos;ont pas les memes forces, les memes faiblesses, ni la meme philosophie.</p>
                    <p>Le probleme des comparatifs que vous trouverez en ligne, c&apos;est qu&apos;ils comparent les deux outils de facon generique : &ldquo;Claude est meilleur pour le raisonnement&rdquo;, &ldquo;ChatGPT a plus de plugins&rdquo;. Ce genre de generalite ne vous aide pas a decider lequel utiliser pour rediger vos sequences de cold email ou pour analyser votre taux de conversion par etape de pipeline.</p>
                    <p>Chez Ceres, on utilise les deux. Chaque jour. Sur des cas d&apos;usage reels, avec des vrais clients B2B, des vrais deals dans HubSpot, et des vrais objectifs de revenue. Ce comparatif n&apos;est pas un benchmark synthetique. C&apos;est un retour d&apos;experience pratique, structure autour des 5 cas d&apos;usage les plus frequents pour une equipe de vente B2B.</p>
                    <p>Precisons d&apos;emblee : nous utilisons Claude comme outil principal et Claude Code pour le developpement de nos outils internes. Nous expliquerons pourquoi dans la derniere section. Mais nous continuons d&apos;utiliser ChatGPT pour certains cas d&apos;usage ou il excelle. L&apos;objectif ici n&apos;est pas de designer un &ldquo;gagnant&rdquo; mais de vous aider a choisir le bon outil selon votre contexte.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Ce que cet article couvre</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Redaction d'emails de prospection",
                        "Analyse de donnees CRM et pipeline",
                        "Resume de calls et meeting notes",
                        "Recherche et enrichissement de comptes",
                        "Coaching commercial et roleplay",
                        "API, integrations et cout reel",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6D00CC] shrink-0" />
                          <span className="text-[11px] text-[#777]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 : Les modeles en 2026 */}
              <section id="modeles-2026" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les modeles en 2026 : ou en est-on ?</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Avant de plonger dans les cas d&apos;usage, un point rapide sur les modeles disponibles de chaque cote. Les deux ecosystemes proposent une gamme de modeles adaptes a differents besoins en termes de performance, de vitesse et de cout.</p>
                    <p>Cote Anthropic, la gamme Claude s&apos;articule autour de trois niveaux. <strong className="text-[#111]">Claude Opus</strong> est le modele le plus puissant : raisonnement profond, analyse complexe, redaction de haut niveau. C&apos;est celui qu&apos;on utilise pour les taches qui demandent de la reflexion, comme l&apos;analyse d&apos;un pipeline complet ou la redaction d&apos;une proposition commerciale. <strong className="text-[#111]">Claude Sonnet</strong> est le modele equilibre : tres bon niveau de performance avec une vitesse de reponse plus rapide et un cout inferieur. C&apos;est notre modele par defaut pour la majorite des taches commerciales quotidiennes. <strong className="text-[#111]">Claude Haiku</strong> est le modele rapide et economique : ideal pour les taches simples et repetitives comme la classification de leads ou l&apos;extraction de donnees structurees.</p>
                    <p>Cote OpenAI, la gamme s&apos;est complexifiee. <strong className="text-[#111]">GPT-4o</strong> reste le modele polyvalent par excellence : rapide, multimodal (texte, image, audio), et tres competent sur un large spectre de taches. <strong className="text-[#111]">o1</strong> est le modele de raisonnement avance, concu pour les problemes qui necessitent une reflexion en plusieurs etapes. <strong className="text-[#111]">o3</strong> pousse le raisonnement encore plus loin avec des capacites accrues sur les taches mathematiques et logiques. OpenAI propose egalement <strong className="text-[#111]">GPT-4o mini</strong> comme alternative economique.</p>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#D97757]/20 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Gamme Claude</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { name: "Opus", desc: "Raisonnement profond, analyse complexe", tag: "Premium", color: "#6D00CC" },
                          { name: "Sonnet", desc: "Equilibre performance / vitesse", tag: "Standard", color: "#D97757" },
                          { name: "Haiku", desc: "Rapide, economique, taches simples", tag: "Leger", color: "#999" },
                        ].map((m) => (
                          <div key={m.name} className="flex items-start gap-2 rounded-lg bg-[#FAFAFA] p-2.5">
                            <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ background: m.color }} />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-semibold text-[#111]">{m.name}</span>
                                <span className="text-[8px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${m.color}15`, color: m.color }}>{m.tag}</span>
                              </div>
                              <p className="text-[10px] text-[#888] mt-0.5">{m.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#10A37F]/20 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Gamme OpenAI</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { name: "o3", desc: "Raisonnement avance, logique complexe", tag: "Premium", color: "#10A37F" },
                          { name: "GPT-4o", desc: "Polyvalent, multimodal, rapide", tag: "Standard", color: "#10A37F" },
                          { name: "o1", desc: "Raisonnement en chaine, problemes etapes", tag: "Raisonnement", color: "#6366F1" },
                          { name: "GPT-4o mini", desc: "Economique, taches simples", tag: "Leger", color: "#999" },
                        ].map((m) => (
                          <div key={m.name} className="flex items-start gap-2 rounded-lg bg-[#FAFAFA] p-2.5">
                            <div className="w-2 h-2 rounded-full mt-1 shrink-0" style={{ background: m.color }} />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-semibold text-[#111]">{m.name}</span>
                                <span className="text-[8px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${m.color}15`, color: m.color }}>{m.tag}</span>
                              </div>
                              <p className="text-[10px] text-[#888] mt-0.5">{m.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>En pratique, pour les equipes commerciales, la comparaison pertinente se fait principalement entre <strong className="text-[#111]">Claude Sonnet et GPT-4o</strong>. Ce sont les deux modeles que vous utiliserez 90% du temps : suffisamment puissants pour des taches complexes, suffisamment rapides pour ne pas casser le rythme de travail, et a un cout raisonnable via API.</p>
                    <p>Les modeles de raisonnement (Opus, o1, o3) sont reserves aux taches qui necessitent une reflexion en profondeur : analyse strategique d&apos;un pipeline, construction d&apos;un plan de compte complexe, ou resolution de problemes de forecasting multi-variables. Ils sont plus lents et plus couteux, mais la qualite de sortie justifie le surcout sur ces cas precis.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 : Emails de prospection */}
              <section id="emails-prospection" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-6 h-6 rounded-md bg-[#6D00CC] flex items-center justify-center text-white text-[10px] font-bold">1</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Redaction d&apos;emails de prospection</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>C&apos;est le cas d&apos;usage numero un des equipes commerciales avec l&apos;IA. Rediger un email de cold outreach personnalise, pertinent, et qui genere des reponses. On a teste les deux sur le meme prompt, des dizaines de fois, sur differents secteurs et personas.</p>
                    <p>Voici un exemple concret. Le meme prompt, soumis aux deux outils, pour un SDR qui cible des VP Sales de SaaS B2B en France.</p>
                  </div>

                  {/* Side-by-side prompt */}
                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-2">Prompt identique</p>
                    <p className="text-[11px] text-[#555] leading-[1.6] font-mono bg-white rounded-lg border border-[#E8E8E8] p-3">&ldquo;Redige un email de prospection pour un VP Sales d&apos;une entreprise SaaS B2B de 50-200 salaries en France. Notre produit est un outil d&apos;analytics RevOps qui se connecte a HubSpot. L&apos;email doit faire moins de 100 mots, etre direct, sans jargon marketing, et terminer par une question ouverte. Ton : professionnel mais decontracte.&rdquo;</p>
                  </div>

                  {/* Side-by-side mockup responses */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Claude response mockup */}
                    <div className="rounded-xl border border-[#D97757]/30 overflow-hidden">
                      <div className="bg-[#FDF4EF] px-3 py-2 flex items-center gap-2 border-b border-[#D97757]/20">
                        <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold text-[#111]">Claude Sonnet</span>
                      </div>
                      <div className="p-3 bg-white">
                        <div className="text-[10px] text-[#555] leading-[1.7] space-y-2">
                          <p><strong className="text-[#111]">Objet :</strong> Question sur votre visibilite pipeline</p>
                          <p>Bonjour [Prenom],</p>
                          <p>Je regarde votre profil et je vois que vous gerez une equipe commerciale chez [Entreprise]. Question directe : est-ce que vous avez une vue fiable sur votre taux de conversion par etape de pipeline ?</p>
                          <p>On a construit un outil qui se branche sur HubSpot et donne aux VP Sales les metriques RevOps que le CRM seul ne fournit pas. Pas de dashboards compliques, juste les chiffres qui comptent.</p>
                          <p>Ca vaut 15 minutes de votre temps pour voir si c&apos;est pertinent pour [Entreprise] ?</p>
                          <p className="text-[#888]">[Signature]</p>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#6D00CC]/10 text-[#6D00CC] font-medium">87 mots</span>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] font-medium">Direct, naturel</span>
                        </div>
                      </div>
                    </div>

                    {/* ChatGPT response mockup */}
                    <div className="rounded-xl border border-[#10A37F]/30 overflow-hidden">
                      <div className="bg-[#F0FAF6] px-3 py-2 flex items-center gap-2 border-b border-[#10A37F]/20">
                        <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold text-[#111]">GPT-4o</span>
                      </div>
                      <div className="p-3 bg-white">
                        <div className="text-[10px] text-[#555] leading-[1.7] space-y-2">
                          <p><strong className="text-[#111]">Objet :</strong> Optimiser la performance de votre equipe commerciale</p>
                          <p>Bonjour [Prenom],</p>
                          <p>En tant que VP Sales chez [Entreprise], vous savez a quel point il est crucial d&apos;avoir une visibilite claire sur les performances de votre equipe. C&apos;est exactement ce que notre outil d&apos;analytics RevOps vous apporte.</p>
                          <p>Nous nous connectons directement a HubSpot pour vous fournir des insights actionnables sur votre pipeline, vos taux de conversion et la productivite de vos commerciaux.</p>
                          <p>Seriez-vous disponible pour un echange de 15 minutes cette semaine ?</p>
                          <p className="text-[#888]">[Signature]</p>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#10A37F]/10 text-[#10A37F] font-medium">96 mots</span>
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#FF7A59]/10 text-[#FF7A59] font-medium">Plus marketing</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Notre analyse.</strong> Les deux reponses sont correctes et utilisables. Mais la difference de ton est flagrante et revele la philosophie de chaque modele.</p>
                    <p>Claude produit un email qui ressemble a ce qu&apos;un commercial senior ecrirait vraiment. Le ton est direct, la question d&apos;accroche (&ldquo;est-ce que vous avez une vue fiable...&rdquo;) est specifique et provoque la reflexion. L&apos;email ne &ldquo;vend&rdquo; pas, il engage une conversation. C&apos;est exactement ce qu&apos;on veut en cold outreach B2B.</p>
                    <p>ChatGPT produit un email plus structure, plus &ldquo;propre&rdquo;, mais aussi plus generique. Le &ldquo;vous savez a quel point il est crucial&rdquo; est un pattern classique de copywriting marketing que tout VP Sales a deja vu cent fois. L&apos;email fonctionne, mais il se fondra plus facilement dans la masse d&apos;emails de prospection que ce VP recoit chaque jour.</p>
                    <p>Sur des centaines de tests, notre constat est le suivant : <strong className="text-[#111]">Claude excelle a reproduire un ton humain, naturel, peu &ldquo;AI-like&rdquo;</strong>. Les emails generes par Claude necessitent moins de retouches avant envoi. ChatGPT a tendance a ajouter des formules marketing, des superlatifs, et une structure plus &ldquo;template&rdquo; qu&apos;il faut ensuite epurer.</p>
                    <p>Cela dit, ChatGPT reprend l&apos;avantage quand on lui donne des exemples dans le prompt (few-shot). Sa capacite a imiter un style a partir d&apos;exemples est legerement superieure. Si vous avez un email de reference qui performe bien, ChatGPT reproduira le pattern de facon plus fidele.</p>
                  </div>

                  <div className="mt-4 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Verdict : emails de prospection</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-4 h-4" />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-[#111]">Claude</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#6D00CC]/10 text-[#6D00CC] font-medium">9/10</span>
                          </div>
                          <p className="text-[9px] text-[#999]">Ton naturel, moins de retouches</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-4 h-4" />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-[#111]">ChatGPT</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#10A37F]/10 text-[#10A37F] font-medium">7/10</span>
                          </div>
                          <p className="text-[9px] text-[#999]">Correct mais plus marketing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 : Analyse CRM */}
              <section id="analyse-crm" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-6 h-6 rounded-md bg-[#6D00CC] flex items-center justify-center text-white text-[10px] font-bold">2</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Analyse de donnees CRM</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Deuxieme cas d&apos;usage majeur : coller un export CSV de votre CRM (ou un tableau de donnees pipeline) dans l&apos;IA et lui demander une analyse. Taux de conversion par etape, velocity, win rate par commercial, deals a risque, anomalies dans le pipeline. C&apos;est une tache que les sales managers font quotidiennement.</p>
                    <p>Ici, la comparaison est particulierement interessante car les deux outils n&apos;abordent pas le probleme de la meme facon.</p>
                  </div>

                  {/* Side-by-side analysis mockup */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#D97757]/30 overflow-hidden">
                      <div className="bg-[#FDF4EF] px-3 py-2 flex items-center gap-2 border-b border-[#D97757]/20">
                        <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold text-[#111]">Claude : approche narrative</span>
                      </div>
                      <div className="p-3 bg-white text-[10px] text-[#555] leading-[1.6] space-y-2">
                        <p className="font-semibold text-[#111]">3 constats principaux :</p>
                        <p>1. Votre taux de conversion Discovery &rarr; Proposal chute a 23% (vs 35% au Q3). Le probleme est concentre sur les deals &gt;50K EUR ou les cycles s&apos;allongent de 12 jours en moyenne.</p>
                        <p>2. Les deals de Marc et Sarah stagnent en &ldquo;Negotiation&rdquo; depuis &gt;30 jours. 4 deals representent 180K EUR de pipeline a risque.</p>
                        <p>3. Votre win rate sur le segment PME est monte a 42% (+8 pts) mais votre panier moyen baisse de 15%. Vous gagnez plus de deals mais pour moins cher.</p>
                        <p className="text-[#888] italic">Analyse structuree, contextuelle, actionnable.</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#10A37F]/30 overflow-hidden">
                      <div className="bg-[#F0FAF6] px-3 py-2 flex items-center gap-2 border-b border-[#10A37F]/20">
                        <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold text-[#111]">ChatGPT : approche analytique</span>
                      </div>
                      <div className="p-3 bg-white text-[10px] text-[#555] leading-[1.6] space-y-2">
                        <p className="font-semibold text-[#111]">Analyse du pipeline :</p>
                        <div className="bg-[#F8F8F8] rounded p-2 font-mono text-[9px]">
                          <p>| Etape | Deals | Valeur | Conv. |</p>
                          <p>|-------|-------|--------|-------|</p>
                          <p>| Discovery | 45 | 890K | 100% |</p>
                          <p>| Proposal | 18 | 420K | 40% |</p>
                          <p>| Negotiation | 8 | 310K | 18% |</p>
                          <p>| Closed Won | 5 | 180K | 11% |</p>
                        </div>
                        <p>Le taux de conversion global est de 11.1%. La principale perte se situe entre Discovery et Proposal (60% de perte).</p>
                        <p className="text-[#888] italic">Tableaux structures, chiffres precis, moins d&apos;interpretation.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Notre analyse.</strong> Sur les donnees structurees, ChatGPT a un avantage historique : Code Interpreter. Cette fonctionnalite permet a ChatGPT d&apos;executer du code Python en arriere-plan pour manipuler vos donnees, generer des graphiques, et faire des calculs precis. Quand vous uploadez un CSV de 500 lignes avec vos deals HubSpot, ChatGPT peut reellement calculer des moyennes, des medianes, des ecarts-types, et produire des visualisations.</p>
                    <p>Claude ne dispose pas d&apos;un equivalent aussi mature de Code Interpreter (l&apos;outil Analysis existe mais est plus recent). En revanche, Claude excelle sur l&apos;interpretation qualitative des donnees. Quand vous lui donnez les memes chiffres, Claude identifie mieux les patterns business, les correlations contre-intuitives, et surtout, il formule des recommandations actionnables. Claude ne se contente pas de dire &ldquo;le taux de conversion baisse&rdquo;, il explique pourquoi et propose des actions concretes.</p>
                    <p>En pratique, notre workflow optimal est le suivant : on utilise ChatGPT pour le traitement numerique brut (calculs, tableaux, graphiques) quand on a un gros fichier CSV, puis on passe le resultat a Claude pour l&apos;interpretation strategique et les recommandations. Mais pour une analyse conversationnelle rapide (&ldquo;voici mes 50 deals, qu&apos;est-ce qui cloche ?&rdquo;), Claude est plus efficace car il va droit aux insights.</p>
                  </div>

                  <div className="mt-4 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Verdict : analyse CRM</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-4 h-4" />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-[#111]">Claude</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#6D00CC]/10 text-[#6D00CC] font-medium">8/10</span>
                          </div>
                          <p className="text-[9px] text-[#999]">Meilleure interpretation business</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-4 h-4" />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-[#111]">ChatGPT</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#10A37F]/10 text-[#10A37F] font-medium">8.5/10</span>
                          </div>
                          <p className="text-[9px] text-[#999]">Code Interpreter pour gros CSV</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 : Resume de calls */}
              <section id="resume-calls" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-6 h-6 rounded-md bg-[#6D00CC] flex items-center justify-center text-white text-[10px] font-bold">3</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Resume de calls et meeting notes</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Troisieme cas d&apos;usage critique : transformer un transcript de call commercial de 45 minutes en un resume structure, avec les next steps, les objections identifiees, et les signaux d&apos;achat detectes. C&apos;est une tache que les commerciaux detestent faire manuellement mais qui est essentielle pour la qualite des donnees CRM.</p>
                    <p>On utilise des outils comme Granola, Gong ou Modjo pour la transcription. La question est : une fois qu&apos;on a le texte brut du call, quel LLM fait le meilleur travail de synthese ?</p>
                    <p><strong className="text-[#111]">Claude a un avantage structurel majeur ici : la fenetre de contexte.</strong> Claude accepte des contextes de 200K tokens, ce qui represente environ 150 000 mots, soit l&apos;equivalent de 5 a 8 heures de transcription. Vous pouvez coller l&apos;integralite d&apos;un call de 90 minutes sans aucun decoupage. Mieux encore, vous pouvez fournir plusieurs calls d&apos;un meme compte et demander une synthese croisee.</p>
                    <p>GPT-4o accepte 128K tokens, ce qui reste confortable pour un call unique mais devient limitant quand on veut analyser une serie de calls ou fournir du contexte additionnel (historique du compte, notes precedentes, etc.).</p>
                    <p>Sur la qualite de la synthese elle-meme, Claude se distingue par sa capacite a extraire les nuances. Les objections implicites, les signaux d&apos;achat faibles, le changement de ton du prospect a un moment precis du call. Claude capte ces elements et les restitue dans le resume. ChatGPT produit des resumes plus factuels, plus lineaires, qui suivent la chronologie du call mais manquent parfois les signaux entre les lignes.</p>
                    <p>Un autre point important : la structuration. Quand on demande un resume avec des sections specifiques (contexte, besoins exprimes, objections, budget, decision makers, next steps, score de probabilite), Claude respecte mieux la structure demandee et remplit chaque section de facon equilibree. ChatGPT a tendance a surponderer les parties factuelles et a sous-developper les sections interpretatives.</p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { critere: "Fenetre de contexte", claude: "200K tokens (5-8h de calls)", gpt: "128K tokens (2-3h de calls)", winner: "claude" },
                      { critere: "Detection d'objections implicites", claude: "Excellent, nuance", gpt: "Correct, factuel", winner: "claude" },
                      { critere: "Structure du resume", claude: "Sections equilibrees", gpt: "Surpondere les faits", winner: "claude" },
                      { critere: "Extraction de next steps", claude: "Tres precis", gpt: "Tres precis", winner: "egalite" },
                      { critere: "Vitesse de traitement", claude: "Rapide", gpt: "Tres rapide", winner: "gpt" },
                      { critere: "Integration outils de call", claude: "API disponible", gpt: "Plugins natifs Gong/Chorus", winner: "gpt" },
                    ].map((r) => (
                      <div key={r.critere} className={`rounded-xl border p-3 ${r.winner === "claude" ? "border-[#D97757]/20 bg-[#FDF4EF]/30" : r.winner === "gpt" ? "border-[#10A37F]/20 bg-[#F0FAF6]/30" : "border-[#F2F2F2]"}`}>
                        <p className="text-[11px] font-semibold text-[#111] mb-2">{r.critere}</p>
                        <div className="space-y-1">
                          <div className="flex items-start gap-2">
                            <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-3 h-3 mt-0.5" />
                            <span className="text-[10px] text-[#777]">{r.claude}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-3 h-3 mt-0.5" />
                            <span className="text-[10px] text-[#777]">{r.gpt}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Verdict : resume de calls</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-4 h-4" />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-[#111]">Claude</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#6D00CC]/10 text-[#6D00CC] font-medium">9.5/10</span>
                          </div>
                          <p className="text-[9px] text-[#999]">Contexte long, nuances, structure</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-4 h-4" />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-[#111]">ChatGPT</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#10A37F]/10 text-[#10A37F] font-medium">7.5/10</span>
                          </div>
                          <p className="text-[9px] text-[#999]">Rapide, factuel mais moins de nuance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 : Enrichissement de comptes */}
              <section id="enrichissement" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-6 h-6 rounded-md bg-[#6D00CC] flex items-center justify-center text-white text-[10px] font-bold">4</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Recherche et enrichissement de comptes</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Avant un rendez-vous client ou pour qualifier un lead entrant, les commerciaux ont besoin de rassembler rapidement des informations sur un compte : taille de l&apos;entreprise, levees de fonds recentes, stack technologique, concurrents, enjeux sectoriels, organigramme de la decision. C&apos;est un travail de recherche qui peut prendre 30 minutes manuellement. Avec l&apos;IA, il tombe a 2 minutes.</p>
                    <p><strong className="text-[#111]">ChatGPT a un avantage significatif ici : la navigation web.</strong> Avec le mode browse, ChatGPT peut acceder a des pages web en temps reel, lire des articles recents, consulter des sites d&apos;entreprise, et synthetiser des informations fraiches. C&apos;est un avantage considerable pour la recherche de comptes, ou l&apos;actualite de l&apos;information est critique.</p>
                    <p>Claude a acces a la recherche web egalement, mais l&apos;experience est differente. Claude tend a etre plus prudent dans ses reponses : il distingue clairement ce qu&apos;il sait de ses donnees d&apos;entrainement et ce qu&apos;il a pu verifier en ligne. Cette prudence est une qualite (moins de risque de fausse information) mais peut etre frustante quand on veut juste un brief rapide sur un compte.</p>
                    <p>En revanche, Claude surpasse ChatGPT sur l&apos;analyse strategique du compte une fois les informations collectees. Demandez aux deux de construire un &ldquo;plan de compte&rdquo; a partir des memes informations : Claude produira une analyse plus fine des enjeux business, une meilleure cartographie des decision makers, et des angles d&apos;approche plus pertinents pour votre proposition de valeur.</p>
                    <p>Notre usage en pratique : on utilise ChatGPT pour la collecte d&apos;informations brutes (parcours du site web, derniers articles de presse, profils LinkedIn des dirigeants), puis Claude pour structurer ces informations en un plan de compte actionnable avec des angles d&apos;approche specifiques.</p>
                  </div>

                  <div className="mt-4 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Verdict : enrichissement de comptes</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-4 h-4" />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-[#111]">Claude</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#6D00CC]/10 text-[#6D00CC] font-medium">7.5/10</span>
                          </div>
                          <p className="text-[9px] text-[#999]">Meilleure analyse strategique</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-4 h-4" />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-[#111]">ChatGPT</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#10A37F]/10 text-[#10A37F] font-medium">8.5/10</span>
                          </div>
                          <p className="text-[9px] text-[#999]">Navigation web superieure</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 : Coaching commercial */}
              <section id="coaching" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-6 h-6 rounded-md bg-[#6D00CC] flex items-center justify-center text-white text-[10px] font-bold">5</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Coaching commercial et roleplay</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un cas d&apos;usage en forte croissance : utiliser l&apos;IA comme partenaire de roleplay pour preparer un rendez-vous client. Le commercial decrit le contexte (profil du prospect, objections anticipees, enjeux) et l&apos;IA joue le role du prospect. C&apos;est un entrainement accessible a tout moment, sans mobiliser un manager ou un collegue.</p>
                    <p><strong className="text-[#111]">C&apos;est le cas d&apos;usage ou Claude se demarque le plus nettement.</strong> La qualite du roleplay depend de la capacite du modele a maintenir un personnage coherent, a reagir de facon realiste aux arguments du commercial, et a simuler des objections credibles. Claude excelle sur ces trois dimensions.</p>
                    <p>En mode roleplay, Claude maintient le personnage du prospect sur des conversations longues sans &ldquo;casser&rdquo; le role. Il reagit de facon nuancee : si le commercial donne un argument faible, Claude (en tant que prospect) va poser une question inconfortable mais realiste. Si l&apos;argument est fort, Claude va montrer de l&apos;interet tout en exprimant des reserves credibles. Le comportement est naturel et pedagogique.</p>
                    <p>ChatGPT fait du roleplay correct mais a tendance a etre plus &ldquo;accommodant&rdquo;. Le prospect simule par ChatGPT accepte plus facilement les arguments, pose des objections moins incisives, et finit souvent par etre &ldquo;convaincu&rdquo; trop rapidement. C&apos;est agreable pour l&apos;ego du commercial, mais moins utile pour la preparation reelle.</p>
                    <p>Un autre avantage de Claude pour le coaching : la qualite du debriefing post-roleplay. Demandez a Claude d&apos;analyser la conversation qu&apos;il vient d&apos;avoir avec le commercial et de donner un feedback structure. Claude identifie les moments ou le commercial a ete efficace, les objections mal gerees, les opportunites de rebond manquees, et propose des formulations alternatives concretes. Ce debriefing est souvent aussi utile que le roleplay lui-meme.</p>
                    <p>ChatGPT peut egalement faire du debriefing, mais ses retours sont plus generiques, avec des formulations du type &ldquo;vous avez bien gere l&apos;objection prix&rdquo; sans expliquer specifiquement pourquoi ni comment ameliorer la formulation.</p>
                  </div>

                  {/* Roleplay quality comparison */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#D97757]/30 overflow-hidden">
                      <div className="bg-[#FDF4EF] px-3 py-2 flex items-center gap-2 border-b border-[#D97757]/20">
                        <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold text-[#111]">Roleplay Claude</span>
                      </div>
                      <div className="p-3 bg-white text-[10px] text-[#555] leading-[1.6] space-y-2">
                        <p className="text-[#888] italic">[En tant que VP Sales sceptique]</p>
                        <p>&ldquo;Ecoutez, on a deja HubSpot et Salesforce Reporting. Je ne vois pas ce que votre outil apporte de plus. Et franchement, ajouter un enieme dashboard a ma stack, ca ne m&apos;enthousiasme pas. Mon equipe a deja du mal a remplir le CRM correctement.&rdquo;</p>
                        <p className="text-[#888] italic">Objection realiste, specifique, avec un sous-texte (probleme d&apos;adoption). Force le commercial a adresser le vrai probleme.</p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#10A37F]/30 overflow-hidden">
                      <div className="bg-[#F0FAF6] px-3 py-2 flex items-center gap-2 border-b border-[#10A37F]/20">
                        <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold text-[#111]">Roleplay ChatGPT</span>
                      </div>
                      <div className="p-3 bg-white text-[10px] text-[#555] leading-[1.6] space-y-2">
                        <p className="text-[#888] italic">[En tant que VP Sales sceptique]</p>
                        <p>&ldquo;Interessant. Nous utilisons deja quelques outils d&apos;analytics. Pouvez-vous m&apos;expliquer en quoi votre solution se differencie des autres sur le marche ? Je suis curieux de voir ce que ca pourrait apporter a mon equipe.&rdquo;</p>
                        <p className="text-[#888] italic">Correct mais trop ouvert, pas assez resistant. Le &ldquo;je suis curieux&rdquo; est trop accommodant pour un vrai roleplay.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Verdict : coaching commercial</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-4 h-4" />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-[#111]">Claude</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#6D00CC]/10 text-[#6D00CC] font-medium">9.5/10</span>
                          </div>
                          <p className="text-[9px] text-[#999]">Roleplay realiste, debriefing precis</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-4 h-4" />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-[#111]">ChatGPT</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#10A37F]/10 text-[#10A37F] font-medium">6.5/10</span>
                          </div>
                          <p className="text-[9px] text-[#999]">Trop accommodant, generique</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 : API et integrations */}
              <section id="api-integration" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-5 h-5" />
                    <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-5 h-5" />
                    <h2 className="text-[17px] font-semibold text-[#111]">API et integration dans votre stack</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Au-dela de l&apos;usage en interface web, la vraie puissance de ces outils se revele quand on les integre dans les workflows existants via API. Un commercial ne devrait pas avoir a copier-coller des donnees entre HubSpot et ChatGPT. L&apos;IA devrait etre integree nativement dans son CRM, son outil de sequencing, son Slack.</p>
                    <p><strong className="text-[#111]">Cote Anthropic : l&apos;API Claude + MCP.</strong> L&apos;API Claude est propre, bien documentee, et stable. Mais la vraie innovation recente, c&apos;est le protocole MCP (Model Context Protocol). MCP est un standard ouvert qui permet a Claude de se connecter directement a des outils externes : HubSpot, Slack, Notion, bases de donnees, APIs internes. Au lieu de construire des integrations custom pour chaque outil, on definit un &ldquo;serveur MCP&rdquo; qui expose les donnees et actions disponibles, et Claude sait les utiliser de facon autonome.</p>
                    <p>C&apos;est exactement ce qu&apos;on a construit chez Ceres avec notre outil RevOps AI : Claude se connecte a HubSpot via MCP, recupere les donnees pipeline en temps reel, et genere des analyses sans qu&apos;on ait a exporter quoi que ce soit. Le protocole est ouvert, ce qui signifie que n&apos;importe quel developpeur peut creer un connecteur MCP pour son outil interne.</p>
                    <p><strong className="text-[#111]">Cote OpenAI : l&apos;API + plugins + GPTs.</strong> L&apos;ecosysteme OpenAI est plus mature en termes d&apos;integrations pre-existantes. Le GPT Store propose des milliers de GPTs specialises, dont certains sont deja connectes a des outils sales (HubSpot, Salesforce, Apollo). L&apos;API OpenAI est egalement tres bien documentee et largement supportee par les outils no-code (Make, Zapier, n8n). Si vous construisez des automatisations avec Make et que vous voulez ajouter de l&apos;IA dans un workflow, OpenAI sera probablement le chemin de moindre resistance car les modules sont deja disponibles.</p>
                    <p>La difference fondamentale de philosophie : OpenAI mise sur un ecosysteme de plugins et d&apos;applications pre-construites. Anthropic mise sur un protocole ouvert (MCP) qui laisse plus de controle aux developpeurs mais demande plus d&apos;effort initial de configuration. Pour une equipe avec des ressources techniques, MCP offre une flexibilite superieure. Pour une equipe qui veut des integrations cle en main, l&apos;ecosysteme OpenAI est plus accessible.</p>
                  </div>

                  {/* Code concept mockups */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#D97757]/20 overflow-hidden">
                      <div className="bg-[#FDF4EF] px-3 py-2 border-b border-[#D97757]/20">
                        <span className="text-[10px] font-semibold text-[#111]">Claude API + MCP</span>
                      </div>
                      <div className="p-3 bg-[#1E1E1E]">
                        <pre className="text-[9px] text-[#D4D4D4] leading-[1.7] overflow-x-auto">
{`// Serveur MCP HubSpot
const tools = [{
  name: "hubspot_search_deals",
  description: "Rechercher des deals",
  input_schema: {
    type: "object",
    properties: {
      stage: { type: "string" },
      owner: { type: "string" },
      min_amount: { type: "number" }
    }
  }
}];

// Claude appelle les outils
// automatiquement selon le contexte
const response = await anthropic
  .messages.create({
    model: "claude-sonnet-4-20250514",
    tools: tools,
    messages: [{ role: "user",
      content: "Quels deals sont
      bloques en negotiation ?"
    }]
  });`}
                        </pre>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#10A37F]/20 overflow-hidden">
                      <div className="bg-[#F0FAF6] px-3 py-2 border-b border-[#10A37F]/20">
                        <span className="text-[10px] font-semibold text-[#111]">OpenAI API + Plugins</span>
                      </div>
                      <div className="p-3 bg-[#1E1E1E]">
                        <pre className="text-[9px] text-[#D4D4D4] leading-[1.7] overflow-x-auto">
{`// Function calling OpenAI
const tools = [{
  type: "function",
  function: {
    name: "search_deals",
    description: "Rechercher des deals",
    parameters: {
      type: "object",
      properties: {
        stage: { type: "string" },
        owner: { type: "string" },
        min_amount: { type: "number" }
      }
    }
  }
}];

const response = await openai
  .chat.completions.create({
    model: "gpt-4o",
    tools: tools,
    messages: [{ role: "user",
      content: "Quels deals sont
      bloques en negotiation ?"
    }]
  });`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un point notable : <strong className="text-[#111]">Claude Code</strong>, l&apos;outil de developpement d&apos;Anthropic, est devenu un atout majeur pour les equipes techniques qui construisent des outils internes. Chez Ceres, on utilise Claude Code pour developper et maintenir notre plateforme RevOps AI. La capacite de Claude Code a comprendre une codebase complete, a naviguer dans les fichiers, et a produire du code production-ready est significativement superieure a ce que propose Copilot (base sur les modeles OpenAI). C&apos;est un facteur indirect mais important : si vous construisez des outils custom pour votre equipe commerciale, Claude Code accelere considerablement le developpement.</p>
                  </div>

                  <div className="mt-4 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Verdict : API et integrations</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-4 h-4" />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-[#111]">Claude</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#6D00CC]/10 text-[#6D00CC] font-medium">8.5/10</span>
                          </div>
                          <p className="text-[9px] text-[#999]">MCP innovant, Claude Code puissant</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-4 h-4" />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-[11px] font-semibold text-[#111]">ChatGPT</span>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#10A37F]/10 text-[#10A37F] font-medium">8/10</span>
                          </div>
                          <p className="text-[9px] text-[#999]">Ecosysteme mature, plus de plugins</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 : Prix et tokens */}
              <section id="prix-tokens" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Prix et tokens : le cout reel pour une equipe sales</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La question du prix est incontournable. Elle se pose a deux niveaux : le cout des abonnements web (pour un usage en interface) et le cout API (pour un usage integre dans vos outils).</p>
                  </div>

                  {/* Pricing comparison */}
                  <div className="mt-5 space-y-3">
                    <p className="text-[12px] font-semibold text-[#111]">Abonnements web (par utilisateur, par mois)</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-xl border border-[#D97757]/20 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-4 h-4" />
                          <span className="text-[12px] font-semibold text-[#111]">Claude</span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { plan: "Free", prix: "0 $", limite: "Usage limite, Sonnet" },
                            { plan: "Pro", prix: "20 $/mois", limite: "Usage etendu, tous modeles" },
                            { plan: "Team", prix: "30 $/mois/user", limite: "Admin, partage, priorite" },
                            { plan: "Enterprise", prix: "Sur devis", limite: "SSO, SAML, SLA" },
                          ].map((p) => (
                            <div key={p.plan} className="flex items-center justify-between py-1.5 border-b border-[#F2F2F2] last:border-0">
                              <div>
                                <span className="text-[11px] font-medium text-[#111]">{p.plan}</span>
                                <span className="text-[9px] text-[#999] ml-2">{p.limite}</span>
                              </div>
                              <span className="text-[11px] font-semibold text-[#111]">{p.prix}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-xl border border-[#10A37F]/20 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-4 h-4" />
                          <span className="text-[12px] font-semibold text-[#111]">ChatGPT</span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { plan: "Free", prix: "0 $", limite: "GPT-4o mini, limite" },
                            { plan: "Plus", prix: "20 $/mois", limite: "GPT-4o, o1, DALL-E" },
                            { plan: "Team", prix: "30 $/mois/user", limite: "Admin, GPTs prives" },
                            { plan: "Enterprise", prix: "Sur devis", limite: "SSO, audit logs, SLA" },
                          ].map((p) => (
                            <div key={p.plan} className="flex items-center justify-between py-1.5 border-b border-[#F2F2F2] last:border-0">
                              <div>
                                <span className="text-[11px] font-medium text-[#111]">{p.plan}</span>
                                <span className="text-[9px] text-[#999] ml-2">{p.limite}</span>
                              </div>
                              <span className="text-[11px] font-semibold text-[#111]">{p.prix}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Les abonnements web sont identiques en prix. La difference se fait sur ce qui est inclus : ChatGPT Plus inclut DALL-E (generation d&apos;images) et un usage plus genereux de Code Interpreter. Claude Pro inclut une fenetre de contexte plus large et l&apos;acces a tous les modeles de la gamme.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <p className="text-[12px] font-semibold text-[#111]">Cout API (pour 1 million de tokens, en USD)</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[10px]">
                        <thead>
                          <tr className="border-b border-[#E8E8E8]">
                            <th className="text-left py-2 text-[#999] font-semibold">Modele</th>
                            <th className="text-left py-2 text-[#999] font-semibold">Input / 1M tokens</th>
                            <th className="text-left py-2 text-[#999] font-semibold">Output / 1M tokens</th>
                            <th className="text-left py-2 text-[#999] font-semibold">Usage type</th>
                          </tr>
                        </thead>
                        <tbody className="text-[#555]">
                          {[
                            { modele: "Claude Haiku", input: "0.25 $", output: "1.25 $", usage: "Classification, extraction" },
                            { modele: "Claude Sonnet", input: "3 $", output: "15 $", usage: "Taches quotidiennes" },
                            { modele: "Claude Opus", input: "15 $", output: "75 $", usage: "Analyse complexe" },
                            { modele: "GPT-4o mini", input: "0.15 $", output: "0.60 $", usage: "Classification, extraction" },
                            { modele: "GPT-4o", input: "2.50 $", output: "10 $", usage: "Taches quotidiennes" },
                            { modele: "o1", input: "15 $", output: "60 $", usage: "Raisonnement avance" },
                          ].map((r) => (
                            <tr key={r.modele} className="border-b border-[#F5F5F5]">
                              <td className="py-2 font-medium text-[#111]">{r.modele}</td>
                              <td className="py-2">{r.input}</td>
                              <td className="py-2">{r.output}</td>
                              <td className="py-2 text-[#999]">{r.usage}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Estimation pour une equipe de 10 commerciaux</strong> qui utilisent l&apos;IA pour rediger 20 emails par jour, analyser le pipeline une fois par semaine, et resumer 3 calls par semaine chacun :</p>
                  </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#D97757]/20 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-3 h-3" />
                        <span className="text-[11px] font-semibold text-[#111]">Claude (Sonnet principal)</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-[#777]">Abonnements Team (10 users)</span>
                          <span className="text-[#111] font-medium">300 $/mois</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                          <span className="text-[#777]">ou API seule (estimation)</span>
                          <span className="text-[#111] font-medium">~150-250 $/mois</span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#10A37F]/20 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-3 h-3" />
                        <span className="text-[11px] font-semibold text-[#111]">ChatGPT (GPT-4o principal)</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-[#777]">Abonnements Team (10 users)</span>
                          <span className="text-[#111] font-medium">300 $/mois</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                          <span className="text-[#777]">ou API seule (estimation)</span>
                          <span className="text-[#111] font-medium">~120-200 $/mois</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>En resume : les couts sont tres proches. GPT-4o est legerement moins cher que Claude Sonnet en API, et GPT-4o mini est legerement moins cher que Haiku. La difference est marginale et ne devrait pas etre le critere de decision principal. A cette echelle, on parle de quelques dizaines de dollars par mois de difference pour une equipe de 10 commerciaux. Le ROI d&apos;un seul deal gagne grace a un meilleur email de prospection depasse largement cette difference.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 : Tableau comparatif global - DARK SECTION */}
              <section id="tableau-comparatif" className="mb-8">
                <div className="rounded-2xl bg-[#111] p-5 md:p-8">
                  <h2 className="text-[17px] font-semibold text-white mb-5">Tableau comparatif global : 16 criteres</h2>
                  <div className="space-y-1">
                    {/* Header */}
                    <div className="flex items-center py-2 border-b border-white/10">
                      <span className="text-[10px] text-white/40 font-semibold flex-1">Critere</span>
                      <div className="flex items-center gap-1 w-[120px]">
                        <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-3 h-3" />
                        <span className="text-[10px] text-white/60 font-semibold">Claude</span>
                      </div>
                      <div className="flex items-center gap-1 w-[120px]">
                        <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=32" alt="ChatGPT" className="w-3 h-3" />
                        <span className="text-[10px] text-white/60 font-semibold">ChatGPT</span>
                      </div>
                      <span className="text-[10px] text-white/40 font-semibold w-[60px] text-center">Verdict</span>
                    </div>
                    {[
                      { critere: "Emails de prospection", claude: "9/10", gpt: "7/10", winner: "Claude" },
                      { critere: "Ton naturel / humain", claude: "9.5/10", gpt: "7/10", winner: "Claude" },
                      { critere: "Analyse CRM (interpretation)", claude: "8.5/10", gpt: "7/10", winner: "Claude" },
                      { critere: "Analyse CRM (calculs bruts)", claude: "7/10", gpt: "9/10", winner: "ChatGPT" },
                      { critere: "Resume de calls", claude: "9.5/10", gpt: "7.5/10", winner: "Claude" },
                      { critere: "Fenetre de contexte", claude: "200K", gpt: "128K", winner: "Claude" },
                      { critere: "Recherche web / comptes", claude: "7.5/10", gpt: "8.5/10", winner: "ChatGPT" },
                      { critere: "Coaching / roleplay", claude: "9.5/10", gpt: "6.5/10", winner: "Claude" },
                      { critere: "Imitation de style (few-shot)", claude: "8/10", gpt: "8.5/10", winner: "ChatGPT" },
                      { critere: "Code Interpreter / calcul", claude: "7/10", gpt: "9/10", winner: "ChatGPT" },
                      { critere: "Generation d'images", claude: "Non", gpt: "DALL-E 3", winner: "ChatGPT" },
                      { critere: "API qualite / stabilite", claude: "9/10", gpt: "9/10", winner: "Egalite" },
                      { critere: "Protocole MCP", claude: "Natif", gpt: "Non", winner: "Claude" },
                      { critere: "Ecosysteme plugins / GPTs", claude: "Limite", gpt: "Tres riche", winner: "ChatGPT" },
                      { critere: "Prix abonnement", claude: "20 $/mois", gpt: "20 $/mois", winner: "Egalite" },
                      { critere: "Suivi d'instructions longues", claude: "Excellent", gpt: "Bon", winner: "Claude" },
                    ].map((r) => (
                      <div key={r.critere} className="flex items-center py-2 border-b border-white/5">
                        <span className="text-[10px] text-white/60 flex-1">{r.critere}</span>
                        <span className={`text-[10px] w-[120px] ${r.winner === "Claude" ? "text-[#D97757] font-medium" : "text-white/70"}`}>{r.claude}</span>
                        <span className={`text-[10px] w-[120px] ${r.winner === "ChatGPT" ? "text-[#10A37F] font-medium" : "text-white/70"}`}>{r.gpt}</span>
                        <span className={`text-[9px] w-[60px] text-center font-medium px-1.5 py-0.5 rounded ${
                          r.winner === "Claude" ? "bg-[#D97757]/20 text-[#D97757]" :
                          r.winner === "ChatGPT" ? "bg-[#10A37F]/20 text-[#10A37F]" :
                          "bg-white/10 text-white/50"
                        }`}>{r.winner}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { label: "Victoires Claude", count: "9", color: "#D97757" },
                      { label: "Victoires ChatGPT", count: "5", color: "#10A37F" },
                      { label: "Egalites", count: "2", color: "#666" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl bg-white/5 p-3 text-center">
                        <p className="text-[20px] font-bold" style={{ color: s.color }}>{s.count}</p>
                        <p className="text-[9px] text-white/40 mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 11 : Notre choix chez Ceres - DARK SECTION */}
              <section id="choix-ceres" className="mb-8">
                <div className="rounded-2xl bg-[#111] p-5 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#6D00CC] flex items-center justify-center">
                      <span className="text-white text-[11px] font-bold">C</span>
                    </div>
                    <h2 className="text-[17px] font-semibold text-white">Notre choix chez Ceres</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-white/70 leading-[1.75]">
                    <p>Chez Ceres, Claude est notre outil principal. On l&apos;utilise pour la majorite de nos taches quotidiennes : redaction de contenus, analyse de donnees clients, preparation de recommandations RevOps, coaching de nos equipes, et surtout, comme moteur d&apos;intelligence de notre plateforme RevOps AI. Notre outil se connecte a HubSpot via le protocole MCP de Claude et fournit des analyses en temps reel a nos clients.</p>
                    <p>On utilise egalement <strong className="text-white">Claude Code</strong> comme outil de developpement principal. La capacite de Claude Code a comprendre une codebase complete, a naviguer dans des centaines de fichiers, et a produire du code TypeScript / Next.js de qualite production a transforme notre velocite de developpement. C&apos;est un avantage que ChatGPT / Copilot ne peut pas encore egaliser sur les projets complexes.</p>
                    <p>Les raisons principales de notre choix :</p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {[
                      { raison: "Qualite de redaction superieure", desc: "Le ton naturel de Claude est crucial pour nos contenus et pour les emails de prospection de nos clients. Moins de retouches, plus de productivite." },
                      { raison: "MCP pour nos integrations", desc: "Le protocole MCP nous permet de connecter Claude a HubSpot, Notion, Slack et nos bases de donnees internes de facon native. C'est l'architecture de notre produit." },
                      { raison: "Fenetre de contexte de 200K tokens", desc: "On traite regulierement des transcripts de calls, des exports CRM et des documents longs. La fenetre de contexte de Claude est un avantage operationnel quotidien." },
                      { raison: "Claude Code pour le developpement", desc: "Notre plateforme est entierement developpee avec Claude Code. La productivite est incomparable sur les projets Next.js / TypeScript complexes." },
                      { raison: "Suivi d'instructions precis", desc: "Quand on donne un prompt detaille avec des contraintes specifiques (format, ton, longueur, structure), Claude les respecte mieux. C'est essentiel pour des workflows automatises." },
                    ].map((r) => (
                      <div key={r.raison} className="flex gap-3 rounded-xl bg-white/5 p-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6D00CC] mt-2 shrink-0" />
                        <div>
                          <p className="text-[12px] font-semibold text-white mb-0.5">{r.raison}</p>
                          <p className="text-[11px] text-white/50 leading-[1.6]">{r.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4">
                    <p className="text-[12px] font-semibold text-white mb-3">Mais on utilise aussi ChatGPT pour...</p>
                    <div className="space-y-2">
                      {[
                        { cas: "Traitement de gros CSV avec Code Interpreter", desc: "Quand on a un export de 10 000 lignes a analyser, Code Interpreter est plus efficace pour les calculs bruts et la generation de graphiques." },
                        { cas: "Recherche web rapide sur un compte", desc: "Le mode browse de ChatGPT est pratique pour une recherche rapide d'informations fraiches avant un rendez-vous client." },
                        { cas: "Generation d'images pour des presentations", desc: "DALL-E est integre a ChatGPT. Quand on a besoin d'un visuel rapide pour une presentation client, c'est plus simple que de sortir vers un outil externe." },
                        { cas: "Prototypage d'automatisations Make/Zapier", desc: "L'ecosysteme OpenAI est mieux supporte par les outils no-code. Pour un workflow Make rapide avec de l'IA, on utilise l'API OpenAI." },
                      ].map((r) => (
                        <div key={r.cas} className="flex gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-2 shrink-0" />
                          <div>
                            <p className="text-[11px] font-medium text-[#10A37F]">{r.cas}</p>
                            <p className="text-[10px] text-white/40 leading-[1.6]">{r.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 text-[13px] text-white/70 leading-[1.75]">
                    <p>Le message principal de cet article est le suivant : <strong className="text-white">ne choisissez pas un seul outil, comprenez les forces de chacun et utilisez le bon outil pour le bon cas d&apos;usage.</strong> Claude est notre choix principal pour les raisons detaillees ci-dessus, mais nous serions moins efficaces si nous n&apos;avions pas ChatGPT en complement.</p>
                    <p>Si vous deviez choisir un seul abonnement pour une equipe commerciale B2B et que le budget est contraint, nous recommanderions Claude Pro. La qualite de redaction, le coaching par roleplay et la fenetre de contexte sont des avantages qui comptent davantage au quotidien pour un commercial que Code Interpreter ou le browse web.</p>
                    <p>Si le budget le permet, les deux abonnements a 40 $ par mois et par commercial representent un investissement ridicule compare a la productivite gagnee. Un commercial qui gagne une heure par jour grace a l&apos;IA, c&apos;est 20 heures par mois reinvesties en appels, en meetings, en closing. Le ROI est immediat.</p>
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
                    <p className="text-[12px] font-semibold text-[#111] leading-[1.4] group-hover:text-[#6D00CC] transition-colors">{a.title}</p>
                    <p className="text-[10px] text-[#999] mt-2">{a.category}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section>
              <div className="rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Envie d&apos;integrer l&apos;IA dans vos processus commerciaux ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[500px] mx-auto">On aide les equipes B2B a connecter Claude et ChatGPT a leur CRM, automatiser la redaction, analyser le pipeline, et structurer le coaching commercial avec l&apos;IA.</p>
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
