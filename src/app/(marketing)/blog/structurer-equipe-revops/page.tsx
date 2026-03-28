"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Comment structurer une equipe RevOps selon votre taille",
  description: "Guide organisationnel complet pour structurer votre equipe RevOps de 0 a 200+ personnes. Organigrammes, roles, ordre de recrutement, lignes hierarchiques et profils types. Avec 4 organigrammes CSS et une timeline de recrutement.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-06",
  dateModified: "2026-03-06",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/structurer-equipe-revops" },
  articleSection: "RevOps",
  wordCount: 2800,
  inLanguage: "fr",
};

const sections = [
  { id: "pas-de-modele-unique", title: "Pas de modele unique" },
  { id: "phase-0", title: "Phase 0 : 0-15 personnes" },
  { id: "phase-1", title: "Phase 1 : 15-30 personnes" },
  { id: "phase-2", title: "Phase 2 : 30-80 personnes" },
  { id: "phase-3", title: "Phase 3 : 80-200 personnes" },
  { id: "phase-4", title: "Phase 4 : 200+ personnes" },
  { id: "reporting", title: "A qui reporter ?" },
  { id: "ordre-recrutement", title: "Ordre de recrutement" },
  { id: "profils-types", title: "Les profils types" },
  { id: "modele-hybride", title: "Le modele hybride" },
];

const relatedArticles = [
  { title: "Comment aligner marketing et sales en 30 jours avec le RevOps", slug: "aligner-marketing-sales-revops", category: "RevOps", color: "#FF7A59" },
  { title: "KPI commerciaux : les indicateurs de vente a suivre", slug: "kpi-commerciaux-indicateurs-vente", category: "Data & Reporting", color: "#22C55E" },
  { title: "Lead scoring : le guide complet pour qualifier vos prospects", slug: "lead-scoring-guide-complet", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function StructurerEquipeRevOpsPage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("pas-de-modele-unique");

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
        <div className="h-full bg-[#FF7A59] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "5%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "15%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "30%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "45%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "60%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "75%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "88%", width: 240, height: 240, borderRadius: "50%", background: "#FF7A59", opacity: 0.06, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet?text=Comment%20structurer%20une%20equipe%20RevOps%20selon%20votre%20taille&url=https://www.ceres-revops.com/blog/structurer-equipe-revops" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/structurer-equipe-revops" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Structurer une equipe RevOps</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>RevOps</Badge>
                <span className="text-[11px] text-[#CCC]">14 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Comment structurer une equipe RevOps selon votre taille
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                A quel moment recruter votre premier RevOps ? Faut-il un generaliste ou un specialiste ? A qui doit-il reporter ? Ce guide couvre l&apos;evolution de l&apos;equipe RevOps de 0 a 200+ personnes, avec des organigrammes concrets, l&apos;ordre de recrutement ideal, les profils types et les lignes hierarchiques qui fonctionnent. Pas de theorie abstraite : des schemas, des roles et des decisions pragmatiques adaptees a chaque phase de croissance.
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
              {/* Section 1 -- Il n'y a pas de modele unique */}
              <section id="pas-de-modele-unique" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Il n&apos;y a pas de modele unique</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La question &ldquo;comment structurer mon equipe RevOps ?&rdquo; est la plus frequente que l&apos;on recoit chez Ceres. Et la reponse commence toujours par la meme chose : ca depend. Ca depend de votre taille, de votre maturite commerciale, de votre stack technique, de votre secteur et de votre vitesse de croissance. Une startup de 20 personnes en pre-Series A n&apos;a pas les memes besoins qu&apos;une ETI de 300 collaborateurs avec trois lignes de produit.</p>
                    <p>Ce qui est universel, en revanche, c&apos;est la trajectoire. Toutes les entreprises passent par les memes phases d&apos;evolution de leur fonction RevOps, meme si le timing varie. Comprendre ces phases permet d&apos;anticiper les recrutements, d&apos;eviter les erreurs de casting, et de construire une equipe qui evolue au rythme de l&apos;entreprise plutot que de courir apres la croissance.</p>
                    <p>Le piege classique est de copier l&apos;organigramme d&apos;une entreprise admiree sans tenir compte du contexte. Le modele RevOps de Salesforce ne s&apos;applique pas a une PME de 50 personnes. A l&apos;inverse, une startup qui attend d&apos;avoir 100 collaborateurs pour nommer son premier RevOps accumule une dette operationnelle considerable. Les processus bricolees, les donnees mal structurees et les outils mal configures coutent beaucoup plus cher a corriger apres coup qu&apos;a prevenir.</p>
                    <p>Dans ce guide, nous detaillons cinq phases distinctes, de l&apos;entreprise sans RevOps au departement structure de 10+ personnes. Pour chaque phase, vous trouverez l&apos;organigramme recommande, les missions prioritaires, les competences cles a rechercher et les signaux qui indiquent qu&apos;il est temps de passer a la phase suivante. Nous couvrons ensuite les questions transversales : a qui le RevOps doit-il reporter, dans quel ordre recruter, et quels profils privilegier.</p>
                  </div>

                  {/* Key factors */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { factor: "Taille de l&apos;entreprise", desc: "Le nombre de collaborateurs determine la complexite des processus et le volume de donnees a gerer.", color: "#FF7A59" },
                      { factor: "Maturite commerciale", desc: "Une entreprise avec un funnel etabli et des metriques suivies a des besoins differents d&apos;une entreprise en exploration.", color: "#4B5EFC" },
                      { factor: "Stack technique", desc: "Le nombre d&apos;outils, leur niveau d&apos;integration et la dette technique existante impactent directement les besoins en RevOps.", color: "#22C55E" },
                    ].map((item) => (
                      <div key={item.factor} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <p className="text-[12px] font-semibold mb-2" style={{ color: item.color }}>{item.factor}</p>
                        <p className="text-[10px] text-[#777] leading-[1.6]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 -- Phase 0 : Pas de RevOps (0-15 personnes) */}
              <section id="phase-0" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#999] flex items-center justify-center text-white text-[12px] font-bold">P0</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Phase 0 : Pas de RevOps (0-15 personnes)</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>A ce stade, il n&apos;y a pas de RevOps. Et c&apos;est normal. L&apos;entreprise est petite, les equipes sont reduites, et le fondateur ou le directeur commercial gere tout : le CRM, les process de vente, le pipeline, les rapports, la configuration des outils. Il porte la casquette RevOps sans le savoir, en plus de ses 15 autres casquettes.</p>
                    <p>Cette approche fonctionne tant que la complexite reste gerale. Avec 2 a 5 commerciaux, un seul produit et un pipeline simple, le fondateur peut maintenir le systeme a bout de bras. Les donnees sont a peu pres propres parce qu&apos;il n&apos;y a pas beaucoup de volume. Les processus tiennent parce que tout le monde est dans la meme piece et communique en direct.</p>
                    <p>Les problemes commencent quand l&apos;entreprise grandit. Les premiers symptomes sont toujours les memes : les donnees du CRM se degradent (champs vides, doublons, formats incoherents), les processus divergent entre commerciaux (chacun utilise le CRM a sa maniere), les rapports deviennent peu fiables, et le fondateur passe de plus en plus de temps sur des taches operationnelles au lieu de vendre ou de piloter la strategie.</p>
                    <p>Le signal le plus clair qu&apos;il est temps de recruter un premier RevOps : quand le fondateur passe plus de 5 heures par semaine sur des taches de configuration, de nettoyage de donnees et de creation de rapports. Ce temps perdu est un cout d&apos;opportunite enorme pour une entreprise en phase de croissance.</p>
                  </div>

                  {/* CSS Org Chart -- Phase 0: Flat structure */}
                  <div className="mt-8 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#999]" />
                        <span className="text-[12px] font-semibold text-white">Organigramme -- Phase 0 (0-15 pers.)</span>
                      </div>
                      <span className="text-[10px] text-white/40">Structure plate</span>
                    </div>
                    <div className="bg-white p-6">
                      <div className="flex flex-col items-center">
                        {/* CEO/Fondateur */}
                        <div className="px-5 py-3 rounded-lg bg-[#111] text-white text-center">
                          <p className="text-[12px] font-bold">CEO / Fondateur</p>
                          <p className="text-[9px] text-white/50 mt-0.5">Fait le RevOps en plus du reste</p>
                        </div>
                        <div className="w-[2px] h-6 bg-[#E0E0E0]" />
                        <div className="flex items-center gap-1">
                          <div className="w-20 h-[2px] bg-[#E0E0E0]" />
                          <div className="w-20 h-[2px] bg-[#E0E0E0]" />
                          <div className="w-20 h-[2px] bg-[#E0E0E0]" />
                        </div>
                        <div className="flex gap-4 mt-1">
                          {[
                            { role: "Sales Rep", count: "2-4", color: "#4B5EFC" },
                            { role: "Marketing", count: "1", color: "#FF7A59" },
                            { role: "CS / Support", count: "0-1", color: "#22C55E" },
                          ].map((r) => (
                            <div key={r.role} className="flex flex-col items-center">
                              <div className="w-[2px] h-4 bg-[#E0E0E0]" />
                              <div className="px-4 py-2.5 rounded-lg border-2 text-center" style={{ borderColor: `${r.color}40`, backgroundColor: `${r.color}08` }}>
                                <p className="text-[11px] font-semibold" style={{ color: r.color }}>{r.role}</p>
                                <p className="text-[9px] text-[#BBB] mt-0.5">{r.count} pers.</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-5 flex items-center gap-2 justify-center">
                        <div className="w-3 h-3 rounded-sm bg-[#FF7A59]/20 border border-[#FF7A59]/30" />
                        <span className="text-[9px] text-[#999]">Pas de role RevOps dedie -- le fondateur cumule les fonctions</span>
                      </div>
                    </div>
                  </div>

                  {/* Pain points */}
                  <div className="mt-5 rounded-lg bg-[#FF7A59]/5 border border-[#FF7A59]/15 p-5">
                    <p className="text-[12px] font-semibold text-[#FF7A59] mb-3">Quand ca casse : les signaux d&apos;alerte</p>
                    <div className="space-y-2">
                      {[
                        "Le fondateur passe plus de 5h/semaine sur la maintenance du CRM",
                        "Les commerciaux remplissent le CRM de maniere incoherente",
                        "Les rapports de pipeline sont peu fiables et contestables",
                        "L&apos;onboarding d&apos;un nouveau commercial prend plus de 3 semaines",
                        "Les leads marketing ne sont pas trackes correctement dans le CRM",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-[11px] text-[#FF7A59]/80">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#FF7A59]"><path d="M8 4V8M8 11H8.01M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 -- Phase 1 : Le premier RevOps (15-30) */}
              <section id="phase-1" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FF7A59] flex items-center justify-center text-white text-[12px] font-bold">P1</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Phase 1 : Le premier RevOps (15-30 personnes)</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>C&apos;est le recrutement le plus critique de toute la trajectoire RevOps. Ce premier profil va poser les fondations sur lesquelles tout le reste sera construit. Il doit etre un generaliste : quelqu&apos;un capable de toucher a tout, du CRM au reporting en passant par les processus de vente et l&apos;automatisation. Ce n&apos;est pas le moment de chercher un specialiste de la data ou un expert en integrations. Il faut un couteau suisse avec une vision business.</p>
                    <p>Le profil ideal a ce stade est un RevOps Manager junior a mid-level, avec 2 a 5 ans d&apos;experience. Il a deja configure un CRM de bout en bout, il comprend le cycle de vente B2B, il sait construire des rapports exploitables et il a une appetence pour les outils et l&apos;automatisation. Ce qui le distingue d&apos;un admin CRM, c&apos;est la capacite a raisonner en termes de revenue et de processus, pas seulement en termes de configuration technique.</p>
                    <p>La question du rattachement est importante des le depart. Dans la majorite des cas, le premier RevOps reporte directement au CEO ou au fondateur. C&apos;est la position la plus efficace a ce stade parce qu&apos;elle donne la visibilite transversale necessaire et le levier politique pour imposer des changements de processus. Rattacher le RevOps au directeur commercial est une erreur frequente : il sera percu comme un support sales et perdra sa legitimite aupres du marketing et du customer success.</p>
                    <p>Les missions prioritaires sont claires : nettoyer et structurer le CRM, definir les etapes du pipeline, creer les premiers dashboards de suivi, documenter les processus de vente, et mettre en place les automatisations de base (assignation de leads, notifications, sequences). L&apos;objectif est de creer une source de verite unique et fiable pour le revenue de l&apos;entreprise.</p>
                  </div>

                  {/* CSS Org Chart -- Phase 1: Solo RevOps */}
                  <div className="mt-8 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                        <span className="text-[12px] font-semibold text-white">Organigramme -- Phase 1 (15-30 pers.)</span>
                      </div>
                      <span className="text-[10px] text-white/40">Premier RevOps dedie</span>
                    </div>
                    <div className="bg-white p-6">
                      <div className="flex flex-col items-center">
                        {/* CEO */}
                        <div className="px-5 py-3 rounded-lg bg-[#111] text-white text-center">
                          <p className="text-[12px] font-bold">CEO</p>
                        </div>
                        <div className="w-[2px] h-5 bg-[#E0E0E0]" />
                        {/* Row with VP Sales, RevOps, Head Marketing */}
                        <div className="flex items-start gap-6">
                          <div className="flex flex-col items-center">
                            <div className="px-4 py-2.5 rounded-lg border-2 border-[#4B5EFC]/30 bg-[#4B5EFC]/5 text-center">
                              <p className="text-[11px] font-semibold text-[#4B5EFC]">VP Sales</p>
                              <p className="text-[9px] text-[#BBB] mt-0.5">5-8 reps</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="px-4 py-2.5 rounded-lg border-2 border-[#FF7A59]/40 bg-[#FF7A59]/10 text-center shadow-[0_0_12px_-2px_rgba(255,122,89,0.2)]">
                              <p className="text-[11px] font-bold text-[#FF7A59]">RevOps Manager</p>
                              <p className="text-[9px] text-[#FF7A59]/60 mt-0.5">Generaliste -- 1 personne</p>
                            </div>
                            <div className="mt-2 px-3 py-1.5 rounded-md bg-[#FF7A59]/5 border border-[#FF7A59]/10">
                              <p className="text-[8px] text-[#FF7A59]/70 text-center">Reporte au CEO</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="px-4 py-2.5 rounded-lg border-2 border-[#22C55E]/30 bg-[#22C55E]/5 text-center">
                              <p className="text-[11px] font-semibold text-[#22C55E]">Head Marketing</p>
                              <p className="text-[9px] text-[#BBB] mt-0.5">2-3 pers.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Missions du premier RevOps */}
                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Missions du premier RevOps</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { mission: "CRM : nettoyage, structure, pipeline", priority: "Critique", color: "#FF7A59" },
                        { mission: "Reporting : dashboards vente et pipeline", priority: "Critique", color: "#FF7A59" },
                        { mission: "Process : documentation et standardisation", priority: "Haute", color: "#4B5EFC" },
                        { mission: "Automatisation : assignation, notifications", priority: "Haute", color: "#4B5EFC" },
                        { mission: "Data quality : deduplication, enrichissement", priority: "Moyenne", color: "#22C55E" },
                        { mission: "Onboarding : playbooks pour nouveaux reps", priority: "Moyenne", color: "#22C55E" },
                      ].map((m) => (
                        <div key={m.mission} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#EAEAEA]">
                          <span className="text-[8px] font-bold px-1.5 py-0.5 rounded shrink-0 mt-0.5" style={{ color: m.color, backgroundColor: `${m.color}15` }}>{m.priority}</span>
                          <span className="text-[11px] text-[#555] leading-[1.5]">{m.mission}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 -- Phase 2 : L'equipe naissante (30-80) */}
              <section id="phase-2" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#4B5EFC] flex items-center justify-center text-white text-[12px] font-bold">P2</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Phase 2 : L&apos;equipe naissante (30-80 personnes)</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;entreprise a depasse les 30 collaborateurs. Le pipeline se complexifie, les outils se multiplient, et le RevOps solo ne peut plus tout faire. C&apos;est le moment de construire une petite equipe. Le generaliste initial devient RevOps Manager et manage 1 a 2 specialistes qui prennent en charge des domaines specifiques.</p>
                    <p>La premiere specialisation a operer depend du contexte, mais dans la majorite des cas, c&apos;est un profil analytique qu&apos;il faut recruter en premier : un RevOps Analyst capable de prendre en charge le reporting, l&apos;analyse du funnel, la qualite des donnees et les previsions. Cela libere le RevOps Manager pour se concentrer sur la strategie des processus, la gouvernance et la coordination inter-equipes.</p>
                    <p>Le deuxieme recrutement est souvent un profil plus technique : un RevOps Engineer ou un CRM Specialist qui gere les integrations, les workflows avances, les automatisations complexes et la maintenance de la stack technique. A ce stade, l&apos;entreprise utilise probablement 5 a 10 outils differents (CRM, marketing automation, enrichissement, facturation, support) et les faire communiquer entre eux devient un travail a part entiere.</p>
                    <p>La specialisation par fonction (sales ops, marketing ops, CS ops) n&apos;est pas encore necessaire a ce stade. L&apos;equipe reste transversale et travaille pour l&apos;ensemble des equipes revenue. C&apos;est un point crucial : si vous commencez a creer des silos operationnels trop tot, vous perdez l&apos;un des benefices majeurs du RevOps, qui est justement la vision unifiee du cycle de revenue.</p>
                    <p>Le RevOps Manager reporte toujours idealement au CEO ou au COO a ce stade. Il participe aux comites de direction et a une voix dans les decisions strategiques qui touchent au go-to-market. Son role evolue : il devient moins executant et plus architecte des processus. Il definit les standards, les KPIs, la gouvernance des donnees et la roadmap des outils.</p>
                  </div>

                  {/* CSS Org Chart -- Phase 2: Small team */}
                  <div className="mt-8 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#4B5EFC]" />
                        <span className="text-[12px] font-semibold text-white">Organigramme -- Phase 2 (30-80 pers.)</span>
                      </div>
                      <span className="text-[10px] text-white/40">Equipe naissante : 3 personnes</span>
                    </div>
                    <div className="bg-white p-6">
                      <div className="flex flex-col items-center">
                        {/* CEO/COO */}
                        <div className="px-5 py-3 rounded-lg bg-[#111] text-white text-center">
                          <p className="text-[12px] font-bold">CEO / COO</p>
                        </div>
                        <div className="w-[2px] h-5 bg-[#E0E0E0]" />

                        {/* Top row: VP Sales, RevOps Manager, CMO */}
                        <div className="flex items-start gap-8">
                          <div className="flex flex-col items-center">
                            <div className="px-4 py-2.5 rounded-lg border-2 border-[#4B5EFC]/30 bg-[#4B5EFC]/5 text-center">
                              <p className="text-[11px] font-semibold text-[#4B5EFC]">VP Sales</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="px-5 py-3 rounded-lg border-2 border-[#FF7A59]/40 bg-[#FF7A59]/10 text-center shadow-[0_0_12px_-2px_rgba(255,122,89,0.2)]">
                              <p className="text-[12px] font-bold text-[#FF7A59]">RevOps Manager</p>
                              <p className="text-[9px] text-[#FF7A59]/60 mt-0.5">Pilote l&apos;equipe</p>
                            </div>
                            <div className="w-[2px] h-5 bg-[#FF7A59]/30" />
                            {/* Sub-team */}
                            <div className="flex gap-4">
                              {[
                                { role: "RevOps Analyst", focus: "Reporting, data quality", color: "#4B5EFC" },
                                { role: "CRM Specialist", focus: "Integrations, workflows", color: "#6C5CE7" },
                              ].map((sub) => (
                                <div key={sub.role} className="flex flex-col items-center">
                                  <div className="w-[2px] h-3 bg-[#E0E0E0]" />
                                  <div className="px-3 py-2 rounded-lg border-2 text-center" style={{ borderColor: `${sub.color}30`, backgroundColor: `${sub.color}08` }}>
                                    <p className="text-[10px] font-semibold" style={{ color: sub.color }}>{sub.role}</p>
                                    <p className="text-[8px] text-[#BBB] mt-0.5">{sub.focus}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="px-4 py-2.5 rounded-lg border-2 border-[#22C55E]/30 bg-[#22C55E]/5 text-center">
                              <p className="text-[11px] font-semibold text-[#22C55E]">CMO</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 -- Phase 3 : L'equipe structuree (80-200) */}
              <section id="phase-3" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#6C5CE7] flex items-center justify-center text-white text-[12px] font-bold">P3</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Phase 3 : L&apos;equipe structuree (80-200 personnes)</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>A ce stade, l&apos;entreprise a une equipe commerciale de 15 a 40 personnes, souvent repartie sur plusieurs segments ou geographies. Le marketing est structure avec des fonctions dediees (demand gen, content, growth). Le customer success a sa propre equipe. La complexite operationnelle justifie une equipe RevOps de 4 a 6 personnes, pilotee par un Head of RevOps.</p>
                    <p>C&apos;est le moment ou la specialisation par fonction devient pertinente. L&apos;equipe se structure generalement autour de trois poles : Sales Operations, Marketing Operations et Business Intelligence. Chaque pole a un ou deux membres dedies qui travaillent en etroite collaboration avec l&apos;equipe metier correspondante, tout en restant rattaches au Head of RevOps pour garantir la coherence transversale.</p>
                    <p>Le Head of RevOps est un profil senior avec 5 a 10 ans d&apos;experience. Il ne fait plus d&apos;execution au quotidien. Son role est strategique : il definit la roadmap operationnelle, il participe au comite de direction, il negocie les budgets outils, il assure la gouvernance des donnees et des processus, et il manage l&apos;equipe. Il est le garant de l&apos;alignement entre les fonctions revenue.</p>
                    <p>Un role emerge souvent a ce stade : le Revenue Architect ou Systems Architect. C&apos;est le profil technique le plus senior de l&apos;equipe, charge de la vision globale de la stack technique, de l&apos;architecture des integrations, et de la gestion des projets de migration ou d&apos;implementation d&apos;outils majeurs. C&apos;est une competence rare et tres recherchee.</p>
                    <p>Le reporting du Head of RevOps evolue. Il ne reporte plus au CEO directement dans la plupart des cas, mais au CRO (Chief Revenue Officer) ou au COO. Cette evolution est naturelle : le CEO a de moins en moins de bande passante pour piloter une equipe operationnelle, et le CRO ou COO a la vision transversale necessaire pour superviser le RevOps efficacement.</p>
                  </div>

                  {/* CSS Org Chart -- Phase 3: Medium team */}
                  <div className="mt-8 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#6C5CE7]" />
                        <span className="text-[12px] font-semibold text-white">Organigramme -- Phase 3 (80-200 pers.)</span>
                      </div>
                      <span className="text-[10px] text-white/40">Equipe structuree : 5-6 personnes</span>
                    </div>
                    <div className="bg-white p-6">
                      <div className="flex flex-col items-center">
                        {/* CRO / COO */}
                        <div className="px-5 py-3 rounded-lg bg-[#111] text-white text-center">
                          <p className="text-[12px] font-bold">CRO / COO</p>
                        </div>
                        <div className="w-[2px] h-5 bg-[#E0E0E0]" />

                        {/* Head of RevOps */}
                        <div className="px-6 py-3 rounded-lg border-2 border-[#FF7A59]/40 bg-[#FF7A59]/10 text-center shadow-[0_0_12px_-2px_rgba(255,122,89,0.2)]">
                          <p className="text-[13px] font-bold text-[#FF7A59]">Head of RevOps</p>
                          <p className="text-[9px] text-[#FF7A59]/60 mt-0.5">Strategie, gouvernance, budget</p>
                        </div>
                        <div className="w-[2px] h-5 bg-[#FF7A59]/30" />

                        {/* Three pods */}
                        <div className="flex gap-4 flex-wrap justify-center">
                          {[
                            { pod: "Sales Ops", members: ["Sales Ops Specialist", "Deal Desk Analyst"], color: "#4B5EFC", focus: "Pipeline, forecast, comp plans" },
                            { pod: "Marketing Ops", members: ["Marketing Ops Specialist"], color: "#FF7A59", focus: "Funnel, attribution, nurturing" },
                            { pod: "BI & Data", members: ["Revenue Analyst", "Systems Architect"], color: "#22C55E", focus: "Dashboards, integrations, data" },
                          ].map((p) => (
                            <div key={p.pod} className="flex flex-col items-center">
                              <div className="w-[2px] h-3 bg-[#E0E0E0]" />
                              <div className="px-4 py-3 rounded-lg border-2 text-center min-w-[140px]" style={{ borderColor: `${p.color}30`, backgroundColor: `${p.color}05` }}>
                                <p className="text-[11px] font-bold" style={{ color: p.color }}>{p.pod}</p>
                                <p className="text-[8px] text-[#BBB] mt-0.5 mb-2">{p.focus}</p>
                                <div className="space-y-1">
                                  {p.members.map((m) => (
                                    <div key={m} className="px-2 py-1 rounded bg-white border border-[#EAEAEA] text-[8px] text-[#666]">{m}</div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key evolution */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { change: "Du generaliste au specialiste", desc: "L&apos;equipe se structure en poles dedies avec des expertises specifiques.", icon: "M" },
                      { change: "De l&apos;execution a la strategie", desc: "Le Head of RevOps ne fait plus d&apos;admin CRM. Il definit la vision et la roadmap.", icon: "S" },
                      { change: "Du reporting ad hoc au BI", desc: "Les dashboards sont automatises, les previsions modelisees, les analyses proactives.", icon: "D" },
                      { change: "Des outils isoles a la stack integree", desc: "Un Systems Architect gere l&apos;architecture globale et les flux de donnees.", icon: "T" },
                    ].map((item) => (
                      <div key={item.change} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 rounded bg-[#6C5CE7]/10 flex items-center justify-center text-[9px] font-bold text-[#6C5CE7]">{item.icon}</div>
                          <p className="text-[11px] font-semibold text-[#111]">{item.change}</p>
                        </div>
                        <p className="text-[10px] text-[#777] leading-[1.6]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 -- Phase 4 : Le departement RevOps (200+) */}
              <section id="phase-4" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center text-white text-[12px] font-bold">P4</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Phase 4 : Le departement RevOps (200+ personnes)</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Au-dela de 200 personnes, le RevOps devient un veritable departement avec un VP RevOps a sa tete, des Directors pour chaque fonction, et une equipe de 10 a 15 personnes ou plus. C&apos;est l&apos;echelle a laquelle les entreprises les plus performantes investissent dans le RevOps. Le ratio typique est de 1 RevOps pour 8 a 12 personnes dans les equipes revenue (sales + marketing + CS).</p>
                    <p>Le VP RevOps est un executif C-level ou C-1 qui siege au comite de direction. Il est responsable de la strategie operationnelle globale, de la planification du revenu, de la gouvernance des donnees et des processus, et de l&apos;optimisation continue de la machine revenue. Il reporte au CRO, au COO ou directement au CEO selon la structure de l&apos;entreprise.</p>
                    <p>L&apos;equipe se structure en quatre poles : Sales Operations dirige par un Director, Marketing Operations dirige par un Director, Customer Operations (CS + renewal ops) dirige par un Director ou un Senior Manager, et Revenue Intelligence (BI, analytics, data engineering) dirige par un Director. Chaque pole a 2 a 4 membres.</p>
                    <p>A cette echelle, de nouveaux roles apparaissent. Le Revenue Strategy Analyst travaille directement avec le VP RevOps sur la planification annuelle, la modelisation du revenu et l&apos;analyse strategique. Le Deal Desk Manager gere les validations de deals complexes, les derogations commerciales et le pricing. L&apos;Enablement Specialist (souvent rattache au RevOps plutot qu&apos;au Sales) gere la formation continue des equipes sur les outils et les processus.</p>
                    <p>Le danger a cette echelle est la bureaucratie. Plus l&apos;equipe grandit, plus le risque de creer une fonction support lourde et lente augmente. Le VP RevOps doit maintenir une culture d&apos;execution rapide, de pragmatisme et de proximite avec les equipes operationnelles. Le RevOps qui se deconnecte du terrain perd sa raison d&apos;etre.</p>
                  </div>

                  {/* CSS Org Chart -- Phase 4: Full department */}
                  <div className="mt-8 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                        <span className="text-[12px] font-semibold text-white">Organigramme -- Phase 4 (200+ pers.)</span>
                      </div>
                      <span className="text-[10px] text-white/40">Departement : 10-15 personnes</span>
                    </div>
                    <div className="bg-white p-6 overflow-x-auto">
                      <div className="flex flex-col items-center min-w-[500px]">
                        {/* CRO */}
                        <div className="px-5 py-2.5 rounded-lg bg-[#111] text-white text-center">
                          <p className="text-[11px] font-bold">CRO</p>
                        </div>
                        <div className="w-[2px] h-4 bg-[#E0E0E0]" />

                        {/* VP RevOps */}
                        <div className="px-6 py-3 rounded-lg border-2 border-[#FF7A59]/40 bg-[#FF7A59]/10 text-center shadow-[0_0_16px_-3px_rgba(255,122,89,0.25)]">
                          <p className="text-[13px] font-bold text-[#FF7A59]">VP RevOps</p>
                          <p className="text-[8px] text-[#FF7A59]/50 mt-0.5">Comite de direction -- 10-15 directs/indirects</p>
                        </div>
                        <div className="w-[2px] h-4 bg-[#FF7A59]/20" />

                        {/* Strategy analyst - staff role */}
                        <div className="px-3 py-1.5 rounded-md border border-[#FF7A59]/20 bg-[#FF7A59]/5 text-center mb-3">
                          <p className="text-[9px] font-semibold text-[#FF7A59]/70">Revenue Strategy Analyst (staff)</p>
                        </div>

                        {/* Four directors */}
                        <div className="flex gap-3 flex-wrap justify-center">
                          {[
                            { dir: "Dir. Sales Ops", members: ["Sales Ops Manager", "Deal Desk Manager", "Enablement Specialist"], color: "#4B5EFC" },
                            { dir: "Dir. Marketing Ops", members: ["Mktg Ops Manager", "Marketing Analyst"], color: "#FF7A59" },
                            { dir: "Dir. Customer Ops", members: ["CS Ops Specialist", "Renewal Ops Analyst"], color: "#22C55E" },
                            { dir: "Dir. Rev. Intelligence", members: ["Data Engineer", "Revenue Analyst", "BI Developer"], color: "#6C5CE7" },
                          ].map((d) => (
                            <div key={d.dir} className="flex flex-col items-center">
                              <div className="w-[2px] h-3 bg-[#E0E0E0]" />
                              <div className="px-3 py-2.5 rounded-lg border-2 text-center min-w-[120px]" style={{ borderColor: `${d.color}30`, backgroundColor: `${d.color}05` }}>
                                <p className="text-[10px] font-bold" style={{ color: d.color }}>{d.dir}</p>
                                <div className="mt-2 space-y-1">
                                  {d.members.map((m) => (
                                    <div key={m} className="px-2 py-0.5 rounded bg-white border border-[#EAEAEA] text-[7px] text-[#666]">{m}</div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scale metrics */}
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "1:10", label: "Ratio RevOps / equipes revenue", color: "#FF7A59" },
                      { value: "4", label: "Poles specialises", color: "#4B5EFC" },
                      { value: "10-15", label: "Membres de l&apos;equipe", color: "#22C55E" },
                      { value: "C-1", label: "Niveau hierarchique du VP", color: "#6C5CE7" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-3 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <div className="text-[18px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-[9px] text-[#999] mt-1 leading-[1.4]">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 -- A qui le RevOps doit-il reporter */}
              <section id="reporting" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">A qui le RevOps doit-il reporter ?</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La question du rattachement hierarchique est l&apos;une des plus debattues dans le monde du RevOps. La reponse n&apos;est pas unique et depend de la maturite de l&apos;entreprise, de la culture interne et de la structure existante. Mais il y a des principes clairs et des erreurs a eviter.</p>
                    <p>Le principe fondamental est simple : le RevOps doit reporter a quelqu&apos;un qui a une vision transversale du cycle de revenue. Si le RevOps est enferme dans un silo fonctionnel (uniquement sales, uniquement marketing), il perd sa capacite a optimiser l&apos;ensemble du funnel et devient un simple support operationnel pour une equipe. C&apos;est la negation meme de la philosophie RevOps.</p>
                    <p>Quatre options sont courantes. Chacune a ses avantages et ses inconvenients, et la meilleure depend de votre contexte specifique. L&apos;erreur la plus frequente est de rattacher le RevOps au VP Sales par defaut, simplement parce que le premier projet RevOps concernait le CRM des commerciaux. Cette decision de facilite cree des problemes durables de legitimite et de perimetre.</p>
                  </div>

                  {/* Reporting options */}
                  <div className="mt-6 space-y-3">
                    {[
                      {
                        to: "CEO",
                        context: "Startups de 15 a 50 personnes",
                        pros: ["Visibilite maximale et acces direct a la strategie", "Legitimite forte aupres de toutes les equipes", "Decisions rapides sans intermediaire"],
                        cons: ["Le CEO a peu de bande passante pour superviser", "Risque de micro-management ou au contraire d&apos;abandon", "Non scalable au-dela de 50 personnes"],
                        verdict: "Ideal en phase 1, a faire evoluer ensuite",
                        color: "#FF7A59",
                      },
                      {
                        to: "CRO (Chief Revenue Officer)",
                        context: "Scale-ups de 80 a 500 personnes",
                        pros: ["Vision unifiee du revenue (sales + marketing + CS)", "Alignement naturel avec les objectifs de croissance", "Le CRO a le poids politique pour imposer les changements"],
                        cons: ["Peu d&apos;entreprises en France ont un CRO", "Le CRO peut privilegier le court terme (quotas) vs. long terme (process)", "Confusion possible avec le role du VP Sales"],
                        verdict: "Le meilleur choix quand le role de CRO existe reellement",
                        color: "#4B5EFC",
                      },
                      {
                        to: "COO (Chief Operating Officer)",
                        context: "ETI et entreprises de 100+ personnes",
                        pros: ["Vision operationnelle transversale", "Le COO comprend naturellement les enjeux de processus", "Independance vis-a-vis des equipes revenue"],
                        cons: ["Le COO peut manquer de sensibilite revenue/GTM", "Risque de traiter le RevOps comme une fonction support generique", "Distance avec le terrain commercial"],
                        verdict: "Bon choix si le COO a une forte culture GTM",
                        color: "#22C55E",
                      },
                      {
                        to: "CFO (Chief Financial Officer)",
                        context: "Entreprises tres orientees donnees financieres",
                        pros: ["Rigueur analytique et data-driven", "Alignement naturel sur les previsions de revenue", "Budget et ROI au centre des decisions"],
                        cons: ["Le CFO raisonne en comptabilite, pas en operations", "Deconnexion avec la realite terrain des equipes sales et marketing", "Tendance a sous-investir dans les outils et les processus"],
                        verdict: "A eviter sauf cas tres specifiques",
                        color: "#6C5CE7",
                      },
                    ].map((opt) => (
                      <div key={opt.to} className="p-5 rounded-lg border-2" style={{ borderColor: `${opt.color}20`, backgroundColor: `${opt.color}03` }}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: opt.color }}>{opt.to.split(" ")[0]}</div>
                            <div>
                              <p className="text-[13px] font-bold" style={{ color: opt.color }}>{opt.to}</p>
                              <p className="text-[10px] text-[#999]">{opt.context}</p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-[10px] font-semibold text-[#22C55E] mb-1.5">Avantages</p>
                            <div className="space-y-1">
                              {opt.pros.map((p) => (
                                <div key={p} className="flex items-start gap-1.5 text-[10px] text-[#666]">
                                  <span className="text-[#22C55E] mt-0.5 shrink-0">+</span>
                                  {p}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-[#FF7A59] mb-1.5">Inconvenients</p>
                            <div className="space-y-1">
                              {opt.cons.map((c) => (
                                <div key={c} className="flex items-start gap-1.5 text-[10px] text-[#666]">
                                  <span className="text-[#FF7A59] mt-0.5 shrink-0">-</span>
                                  {c}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="pt-2 border-t" style={{ borderColor: `${opt.color}15` }}>
                          <p className="text-[10px] font-medium" style={{ color: opt.color }}>{opt.verdict}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 -- L'ordre de recrutement ideal */}
              <section id="ordre-recrutement" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">L&apos;ordre de recrutement ideal</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;ordre dans lequel vous recrutez votre equipe RevOps est aussi important que les profils que vous choisissez. Recruter dans le mauvais ordre cree des desequilibres : trop de strategie sans execution, trop de technique sans vision business, trop d&apos;analyse sans personne pour implementer les recommandations. Voici la sequence qui fonctionne pour la majorite des entreprises B2B en croissance.</p>
                    <p>Le premier recrutement est toujours un generaliste. Un RevOps Manager qui peut tout faire a 70% plutot qu&apos;un specialiste qui fait une chose a 100%. La polyvalence est la qualite numero un a ce stade. Les six premiers mois, cette personne va toucher au CRM, au reporting, aux processus, aux automatisations, a la data quality et meme parfois a l&apos;enablement. Il faut quelqu&apos;un de confortable avec cette diversite.</p>
                    <p>Le deuxieme recrutement depend du point de douleur le plus aigu. Si les donnees sont en mauvais etat et le reporting insuffisant, recrutez un RevOps Analyst. Si les integrations et les workflows sont le goulet d&apos;etranglement, recrutez un RevOps Engineer. Si les deux sont critiques, priorisez les donnees : des donnees propres avec des outils imparfaits, c&apos;est gerale. Des outils parfaits avec des donnees sales, c&apos;est inutile.</p>
                    <p>Le troisieme recrutement complete le triangle : si vous avez pris un Analyst en second, prenez un Engineer en troisieme, et vice versa. A trois, vous avez un noyau capable de couvrir toute la surface RevOps avec un niveau de specialisation suffisant.</p>
                    <p>Les recrutements suivants (quatrieme, cinquieme, sixieme) sont des specialisations fonctionnelles : un Sales Ops dedie qui travaille au plus pres des commerciaux, un Marketing Ops dedie qui optimise les campagnes et l&apos;attribution, et un Revenue Analyst senior qui prend en charge la planification et la prevision. Le Head of RevOps, s&apos;il n&apos;a pas ete recrute comme tel des le depart, se nomme generalement quand l&apos;equipe atteint 4 personnes.</p>
                  </div>

                  {/* Hiring Timeline CSS Mockup */}
                  <div className="mt-8 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                        <span className="text-[12px] font-semibold text-white">Timeline de recrutement -- RevOps</span>
                      </div>
                      <span className="text-[10px] text-white/40">Ordre recommande</span>
                    </div>
                    <div className="bg-white p-6">
                      <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-[#F0F0F0]" />

                        <div className="space-y-6">
                          {[
                            {
                              order: "#1",
                              role: "RevOps Manager (generaliste)",
                              timing: "15-20 collaborateurs",
                              why: "Pose les fondations : CRM, pipeline, reporting, premiers processus. Doit tout savoir faire a 70%.",
                              color: "#FF7A59",
                              skills: ["CRM admin", "Reporting", "Process design", "Automation basics"],
                            },
                            {
                              order: "#2",
                              role: "RevOps Analyst",
                              timing: "30-40 collaborateurs",
                              why: "Prend en charge la data quality, le reporting avance et les previsions. Libere le Manager pour la strategie.",
                              color: "#4B5EFC",
                              skills: ["SQL / BI tools", "Data cleaning", "Forecasting", "Dashboard design"],
                            },
                            {
                              order: "#3",
                              role: "RevOps Engineer",
                              timing: "40-60 collaborateurs",
                              why: "Gere les integrations, workflows complexes, API et architecture technique de la stack.",
                              color: "#6C5CE7",
                              skills: ["API / iPaaS", "Workflows", "Data modeling", "System architecture"],
                            },
                            {
                              order: "#4",
                              role: "Sales Ops Specialist",
                              timing: "60-100 collaborateurs",
                              why: "Dedie a l&apos;equipe commerciale : territories, quotas, comp plans, deal desk, forecast.",
                              color: "#22C55E",
                              skills: ["Comp plans", "Territory design", "Deal desk", "Sales forecast"],
                            },
                            {
                              order: "#5",
                              role: "Marketing Ops Specialist",
                              timing: "80-120 collaborateurs",
                              why: "Optimise le funnel marketing : attribution, nurturing, scoring, campagnes, tech stack marketing.",
                              color: "#FF7A59",
                              skills: ["Attribution", "Lead scoring", "Campaign ops", "Martech stack"],
                            },
                            {
                              order: "#6",
                              role: "Head of RevOps (promotion ou recrutement externe)",
                              timing: "100+ collaborateurs / equipe de 4+",
                              why: "Pilote l&apos;equipe, definit la strategie, participe au comite de direction. Ne fait plus d&apos;execution.",
                              color: "#111",
                              skills: ["Leadership", "GTM strategy", "Budget management", "Exec communication"],
                            },
                          ].map((hire) => (
                            <div key={hire.order} className="relative pl-10">
                              {/* Timeline dot */}
                              <div className="absolute left-[8px] top-1 w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center" style={{ borderColor: hire.color, backgroundColor: "white" }}>
                                <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: hire.color }} />
                              </div>

                              <div className="p-4 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA]">
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ color: hire.color, backgroundColor: `${hire.color}12` }}>{hire.order}</span>
                                  <span className="text-[12px] font-semibold text-[#111]">{hire.role}</span>
                                </div>
                                <p className="text-[10px] font-medium text-[#999] mb-1.5">{hire.timing}</p>
                                <p className="text-[11px] text-[#666] leading-[1.6] mb-3">{hire.why}</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {hire.skills.map((s) => (
                                    <span key={s} className="text-[8px] font-medium px-2 py-0.5 rounded-full border" style={{ color: hire.color, borderColor: `${hire.color}30`, backgroundColor: `${hire.color}08` }}>{s}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 -- Les profils types */}
              <section id="profils-types" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les profils types du RevOps</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le RevOps regroupe des profils tres differents, du generaliste business-oriented au specialiste technique pur. Comprendre ces profils est essentiel pour recruter les bonnes personnes au bon moment et eviter les erreurs de casting qui coutent cher en temps perdu et en frustration des deux cotes.</p>
                    <p>Quatre grandes familles de profils composent l&apos;univers RevOps. Chacune a ses forces, ses limites, son positionnement dans l&apos;equipe et son evolution de carriere. Il est rare de trouver un profil qui excelle dans les quatre dimensions simultanement, d&apos;ou l&apos;importance de construire une equipe complementaire plutot que de chercher le mouton a cinq pattes.</p>
                  </div>

                  {/* Role cards */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: "RevOps Manager",
                        subtitle: "Le generaliste strategique",
                        experience: "2-7 ans",
                        salary: "45-75K EUR",
                        color: "#FF7A59",
                        skills: ["Vision 360 du cycle revenue", "Gestion de projet", "Communication inter-equipes", "CRM + automation", "Process design"],
                        strengths: "Capacite a faire le lien entre business et technique. Il traduit les enjeux de revenue en specifications operationnelles et vice versa.",
                        evolution: "Head of RevOps, COO de startup, VP Operations",
                      },
                      {
                        title: "RevOps Analyst",
                        subtitle: "Le data storyteller",
                        experience: "1-5 ans",
                        salary: "38-60K EUR",
                        color: "#4B5EFC",
                        skills: ["SQL, Excel avance, BI tools", "Data visualization", "Forecasting", "Data quality management", "Statistical analysis"],
                        strengths: "Transforme les donnees brutes en insights actionnables. C&apos;est lui qui detecte les tendances, les anomalies et les opportunites cachees dans les chiffres.",
                        evolution: "Senior Analyst, Revenue Analyst, Head of BI",
                      },
                      {
                        title: "RevOps Engineer",
                        subtitle: "L&apos;architecte technique",
                        experience: "3-8 ans",
                        salary: "50-80K EUR",
                        color: "#6C5CE7",
                        skills: ["APIs, webhooks, iPaaS", "Workflow automation", "Data modeling", "System architecture", "Code (Python, JS)"],
                        strengths: "Construit et maintient l&apos;infrastructure technique du RevOps. Il resout les problemes d&apos;integration complexes et cree les automatisations qui font gagner des heures chaque semaine.",
                        evolution: "Systems Architect, CTO de startup, Principal Engineer",
                      },
                      {
                        title: "Revenue Architect",
                        subtitle: "Le stratege senior",
                        experience: "8-15 ans",
                        salary: "80-120K EUR",
                        color: "#22C55E",
                        skills: ["GTM strategy", "Change management", "Vendor management", "Revenue modeling", "Cross-functional leadership"],
                        strengths: "Definit la vision a long terme de l&apos;infrastructure revenue. Il orchestre les grands projets de transformation : migration CRM, refonte du GTM, mise en place de nouveaux canaux.",
                        evolution: "VP RevOps, CRO, COO, consultant independant",
                      },
                    ].map((role) => (
                      <div key={role.title} className="p-5 rounded-lg border-2" style={{ borderColor: `${role.color}25`, backgroundColor: `${role.color}03` }}>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-[14px] font-bold" style={{ color: role.color }}>{role.title}</p>
                            <p className="text-[10px] text-[#999]">{role.subtitle}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] font-medium text-[#666]">{role.experience}</p>
                            <p className="text-[9px] text-[#BBB]">{role.salary}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {role.skills.map((s) => (
                            <span key={s} className="text-[8px] font-medium px-2 py-0.5 rounded-full" style={{ color: role.color, backgroundColor: `${role.color}10` }}>{s}</span>
                          ))}
                        </div>

                        <p className="text-[10px] text-[#666] leading-[1.6] mb-3">{role.strengths}</p>

                        <div className="pt-2 border-t" style={{ borderColor: `${role.color}12` }}>
                          <p className="text-[9px] text-[#999]"><span className="font-semibold">Evolution :</span> {role.evolution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 -- Le modele hybride (dark section) */}
              <section id="modele-hybride" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">L&apos;alternative</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Le modele hybride : equipe interne + agence RevOps</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Il existe une alternative au tout interne que de plus en plus d&apos;entreprises adoptent avec succes : le modele hybride. L&apos;idee est simple : garder en interne les roles qui necessitent une presence quotidienne et une connaissance intime du business, et externaliser les competences techniques ou strategiques qu&apos;il est difficile ou couteux de recruter a plein temps.</p>
                    <p>Le modele hybride est particulierement pertinent dans trois situations. Premierement, pour les entreprises de 15 a 80 personnes qui n&apos;ont pas le budget pour une equipe RevOps complete mais qui ont besoin de competences avancees. Deuxiemement, pour les entreprises qui traversent une phase de transformation (migration CRM, refonte du GTM, mise en place d&apos;un nouveau segment) et qui ont besoin de renforts temporaires. Troisiemement, pour les entreprises qui veulent accelerer leur maturite RevOps sans attendre de recruter tous les profils necessaires.</p>
                    <p>Chez Ceres, nous travaillons en modele hybride avec la majorite de nos clients. Nous ne remplacons pas l&apos;equipe interne, nous la completons. Le RevOps Manager interne garde la main sur le quotidien, la relation avec les equipes et la connaissance business. Nous apportons l&apos;expertise technique pointue, la vision strategique, les bonnes pratiques du marche et la capacite d&apos;execution sur les projets structurants.</p>
                    <p>Concretement, le modele fonctionne comme suit. L&apos;equipe interne gere l&apos;administration quotidienne du CRM, le support aux equipes, le reporting recurrent et la maintenance des processus existants. L&apos;agence prend en charge l&apos;architecture technique, les integrations complexes, les migrations, la mise en place de nouveaux processus, l&apos;audit regulier et l&apos;optimisation continue. Les deux travaillent ensemble avec une cadence de synchronisation hebdomadaire.</p>
                    <p>Ce modele presente un avantage economique significatif. Le cout d&apos;un RevOps Engineer senior a plein temps (salaire + charges + management + outils) est souvent superieur a celui d&apos;un accompagnement d&apos;agence qui couvre les memes besoins avec plus de flexibilite. Et l&apos;agence apporte en bonus la vision multi-clients : les bonnes pratiques observees chez d&apos;autres entreprises, les erreurs a eviter, et les benchmarks du marche.</p>
                  </div>

                  {/* Hybrid model visual */}
                  <div className="mt-8 rounded-lg bg-white/5 border border-white/10 p-5">
                    <p className="text-[12px] font-semibold text-white/80 mb-5">Modele hybride -- Repartition des responsabilites</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-lg bg-[#4B5EFC] flex items-center justify-center text-white text-[9px] font-bold">INT</div>
                          <p className="text-[12px] font-semibold text-[#4B5EFC]">Equipe interne</p>
                        </div>
                        <div className="space-y-1.5">
                          {[
                            "Administration quotidienne du CRM",
                            "Support aux equipes (sales, marketing, CS)",
                            "Reporting recurrent et dashboards",
                            "Maintenance des workflows existants",
                            "Onboarding des nouveaux collaborateurs",
                            "Connaissance business et contexte",
                          ].map((item) => (
                            <div key={item} className="flex items-start gap-2 text-[10px] text-white/40">
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#4B5EFC]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-lg bg-[#FF7A59] flex items-center justify-center text-white text-[9px] font-bold">AG</div>
                          <p className="text-[12px] font-semibold text-[#FF7A59]">Agence Ceres</p>
                        </div>
                        <div className="space-y-1.5">
                          {[
                            "Architecture technique et integrations",
                            "Audit et optimisation des processus",
                            "Migration CRM et projets structurants",
                            "Mise en place de nouveaux workflows",
                            "Strategie RevOps et roadmap",
                            "Benchmarks et bonnes pratiques marche",
                          ].map((item) => (
                            <div key={item} className="flex items-start gap-2 text-[10px] text-white/40">
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#FF7A59]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "-40%", label: "de cout vs. equipe full interne", color: "#FF7A59" },
                      { value: "2x", label: "de vitesse d&apos;execution sur les projets", color: "#4B5EFC" },
                      { value: "+50", label: "clients dont Ceres tire les bonnes pratiques", color: "#22C55E" },
                      { value: "1 sem.", label: "pour demarrer vs. 3 mois de recrutement", color: "#6C5CE7" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-[20px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-[10px] text-white/40 mt-1 leading-[1.4]">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {[
                      "Audit initial de votre maturite RevOps et de votre stack",
                      "Recommandation de structure d&apos;equipe adaptee a votre phase",
                      "Mise en place des fondations : CRM, pipeline, reporting, processus",
                      "Accompagnement continu en complement de votre equipe interne",
                      "Transfert de competences progressif vers vos collaborateurs",
                      "Revues trimestrielles et optimisation de la roadmap",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2 text-[12px] text-white/50">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Related articles */}
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
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour structurer votre equipe RevOps ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On vous aide a definir la bonne structure, recruter les bons profils et mettre en place les processus adaptes a votre phase de croissance. Premier echange sans engagement.</p>
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#FF7A59]" />Reserver un appel decouverte
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