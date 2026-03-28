"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Comment aligner marketing et sales en 30 jours avec le RevOps",
  description: "Plan d'action complet en 4 semaines pour aligner vos equipes marketing et sales. Definitions communes, SLA, lead scoring, dashboards partages et feedback loops. Methode RevOps concrete avec templates et mockups.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-10",
  dateModified: "2026-03-10",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/aligner-marketing-sales-revops" },
  articleSection: "RevOps",
  wordCount: 3000,
  inLanguage: "fr",
};

const sections = [
  { id: "cout-desalignement", title: "Le cout du desalignement" },
  { id: "symptomes", title: "Les symptomes" },
  { id: "semaine-1", title: "Semaine 1 : Definir" },
  { id: "semaine-2", title: "Semaine 2 : Aligner le funnel" },
  { id: "semaine-3", title: "Semaine 3 : Outiller" },
  { id: "semaine-4", title: "Semaine 4 : Mesurer" },
  { id: "sla-marketing-sales", title: "Le SLA marketing-sales" },
  { id: "outils-alignement", title: "Les outils" },
  { id: "maintenir-alignement", title: "Maintenir l&apos;alignement" },
  { id: "methode-ceres", title: "Notre methode" },
];

const relatedArticles = [
  { title: "TOFU, MOFU, BOFU : comprendre et optimiser votre strategie inbound", slug: "tofu-mofu-bofu-strategie-inbound", category: "RevOps", color: "#FF7A59" },
  { title: "Account-Based Marketing : le guide complet ABM", slug: "account-based-marketing-guide", category: "Process & Outils", color: "#6C5CE7" },
  { title: "9 actions commerciales a automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function AlignerMarketingSalesRevOpsPage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("cout-desalignement");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "8%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "20%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "35%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "50%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "65%", width: 280, height: 280, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "2%", top: "80%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.07, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet?text=Comment%20aligner%20marketing%20et%20sales%20en%2030%20jours%20avec%20le%20RevOps&url=https://www.ceres-revops.com/blog/aligner-marketing-sales-revops" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/aligner-marketing-sales-revops" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Aligner marketing et sales</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>RevOps</Badge>
                <span className="text-[11px] text-[#CCC]">14 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Comment aligner marketing et sales en 30 jours avec le RevOps
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Le desalignement marketing-sales coute cher : leads perdus, cycles de vente rallonges, revenue previsible en chute libre. Ce guide est un plan d&apos;action concret, semaine par semaine, pour aligner vos equipes en 30 jours. Definitions communes, SLA, lead scoring, dashboards partages, feedback loops. Tout ce qu&apos;il faut pour passer du blame game a la revenue machine.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>10 mars 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 -- Le cout du desalignement */}
              <section id="cout-desalignement" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Le cout reel du desalignement marketing-sales</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le desalignement entre marketing et sales n&apos;est pas un simple irritant organisationnel. C&apos;est un probleme de revenue. Selon une etude de Forrester, les entreprises dont les equipes marketing et commerciales ne sont pas alignees perdent en moyenne 10% de leur chiffre d&apos;affaires annuel. Sur une entreprise qui fait 5 millions d&apos;euros de revenu, cela represente 500 000 euros de manque a gagner chaque annee.</p>
                    <p>La realite est encore plus insidieuse que le chiffre brut. Le desalignement ne se manifeste pas par un evenement unique et visible. Il s&apos;installe progressivement, a travers des dizaines de micro-frictions quotidiennes. Le marketing genere des leads que les commerciaux jugent non qualifies. Les commerciaux ne travaillent pas les leads transmis, ou les travaillent trop tard. Les deux equipes reportent des chiffres differents au comite de direction. Personne n&apos;est d&apos;accord sur ce qu&apos;est un bon lead.</p>
                    <p>Le resultat est un cercle vicieux bien connu : le blame game. Le marketing accuse les sales de ne pas suivre les leads. Les sales accusent le marketing de generer des contacts non qualifies. Le management arbitre au cas par cas, sans donnees fiables pour trancher. Les decisions strategiques sont prises sur des intuitions plutot que sur des metriques partagees. Et le revenu stagne, ou pire, recule, sans que personne ne puisse identifier precisement la cause.</p>
                    <p>Le desalignement a aussi un cout humain. Les equipes se demotivent quand elles ont le sentiment que leur travail est ignore ou sous-valorise par l&apos;autre equipe. Les meilleurs elements partent. Le recrutement devient plus difficile. La culture d&apos;entreprise se fracture entre deux camps qui se considerent comme des adversaires plutot que des allies.</p>
                    <p>Chez les entreprises B2B en croissance, le probleme est amplifie par la vitesse. Quand vous recrutez des commerciaux, que vous augmentez le budget marketing et que vous lancez de nouveaux canaux d&apos;acquisition, le desalignement croit proportionnellement. Ce qui etait un desaccord mineur entre deux personnes devient un dysfonctionnement systemique entre deux departements entiers.</p>
                  </div>

                  {/* Impact stats */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "10%", label: "de revenu perdu en moyenne par les entreprises desalignees", color: "#FF7A59" },
                      { value: "79%", label: "des leads marketing ne sont jamais convertis en vente (MarketingSherpa)", color: "#4B5EFC" },
                      { value: "60%", label: "des commerciaux estiment que le marketing ne comprend pas leurs besoins", color: "#6C5CE7" },
                      { value: "3x", label: "plus de croissance pour les entreprises alignees (SiriusDecisions)", color: "#22C55E" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-4 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2]">
                        <div className="text-[22px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-[10px] text-[#999] mt-1 leading-[1.4]">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 -- Les symptomes */}
              <section id="symptomes" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les symptomes du desalignement : les reconnaissez-vous ?</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Avant de resoudre le probleme, il faut le diagnostiquer. Le desalignement marketing-sales se manifeste par des symptomes concrets que la plupart des entreprises B2B connaissent, mais qu&apos;elles normalisent a tort. Voici les signaux d&apos;alerte les plus frequents.</p>
                    <p>Premier symptome : les MQLs sont ignores par les commerciaux. Le marketing transmet des leads, mais les sales ne les contactent pas dans les delais convenus, ou pas du tout. Les raisons invoquees sont toujours les memes : &ldquo;ces leads ne sont pas qualifies&rdquo;, &ldquo;ce n&apos;est pas le bon timing&rdquo;, &ldquo;j&apos;ai des opportunites plus chaudes a traiter&rdquo;. Le probleme reel est souvent un desaccord sur la definition meme de ce qui constitue un lead qualifie.</p>
                    <p>Deuxieme symptome : les definitions sont floues ou inexistantes. Quand vous demandez au marketing ce qu&apos;est un MQL, vous obtenez une reponse. Quand vous posez la meme question aux sales, vous en obtenez une differente. Quand vous demandez au management, c&apos;est encore une troisieme version. Sans definitions communes, chaque equipe travaille avec ses propres criteres, et les metriques deviennent incomparables.</p>
                    <p>Troisieme symptome : le reporting est contradictoire. Le marketing annonce 150 MQLs ce mois-ci. Les sales disent n&apos;en avoir recu que 80 qui valaient la peine. Le management voit un troisieme chiffre dans le CRM. Les reunions de revue deviennent des debats sur la fiabilite des donnees plutot que des discussions sur la performance et l&apos;optimisation.</p>
                    <p>Quatrieme symptome : il n&apos;y a pas de feedback loop. Le marketing genere des leads et les transmet aux sales, point final. Il n&apos;y a aucun mecanisme pour que les commerciaux remontent de l&apos;information sur la qualite des leads, les objections rencontrees, les raisons de perte. Le marketing optimise a l&apos;aveugle, sans savoir ce qui fonctionne reellement en bas de funnel.</p>
                    <p>Cinquieme symptome : les outils ne communiquent pas. Le marketing utilise son outil d&apos;automation d&apos;un cote, les sales utilisent le CRM de l&apos;autre, et les deux systemes ne sont pas synchronises correctement. Les donnees sont fragmentees, les historiques d&apos;interaction sont incomplets, et personne n&apos;a une vue unifiee du parcours prospect.</p>
                  </div>

                  {/* Symptom diagnostic cards */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { symptome: "MQLs ignores", desc: "Moins de 50% des leads marketing sont contactes dans les 48h par les sales. Taux de suivi en chute libre.", severity: "Critique", color: "#FF7A59" },
                      { symptome: "Definitions floues", desc: "Aucun document partage ne definit MQL, SQL, Opportunity. Chaque equipe a ses propres criteres.", severity: "Critique", color: "#FF7A59" },
                      { symptome: "Reporting contradictoire", desc: "Marketing et sales presentent des chiffres differents au meme comite. Debats sur les donnees plutot que sur la strategie.", severity: "Eleve", color: "#6C5CE7" },
                      { symptome: "Pas de feedback loop", desc: "Aucun mecanisme structure pour que les sales remontent la qualite des leads au marketing. Optimisation a l&apos;aveugle.", severity: "Eleve", color: "#6C5CE7" },
                      { symptome: "Outils fragmentes", desc: "Marketing automation et CRM non synchronises. Donnees en silo. Pas de vue unifiee du parcours prospect.", severity: "Modere", color: "#4B5EFC" },
                      { symptome: "Blame game installe", desc: "Reunions tendues entre equipes. Chacun rejette la faute sur l&apos;autre. Culture de competition plutot que de collaboration.", severity: "Critique", color: "#FF7A59" },
                    ].map((item) => (
                      <div key={item.symptome} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[12px] font-semibold text-[#111]">{item.symptome}</p>
                          <span className="text-[9px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${item.color}15`, color: item.color }}>{item.severity}</span>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.6]">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Alignment Scorecard CSS Mockup */}
                  <div className="mt-8 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                        <span className="text-[12px] font-semibold text-white">Alignment Scorecard</span>
                      </div>
                      <span className="text-[10px] text-white/40">Score global</span>
                    </div>
                    <div className="bg-white p-5">
                      <div className="flex items-center justify-center mb-5">
                        <div className="relative w-20 h-20">
                          <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F0F0F0" strokeWidth="2.5" />
                            <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FF7A59" strokeWidth="2.5" strokeDasharray="42, 100" strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[18px] font-bold text-[#FF7A59]">42%</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          { critere: "Definitions communes (MQL/SQL)", score: 20, max: 100, color: "#FF7A59" },
                          { critere: "SLA documente et respecte", score: 15, max: 100, color: "#FF7A59" },
                          { critere: "Lead scoring operationnel", score: 55, max: 100, color: "#6C5CE7" },
                          { critere: "Dashboard partage", score: 40, max: 100, color: "#4B5EFC" },
                          { critere: "Feedback loop structure", score: 30, max: 100, color: "#FF7A59" },
                          { critere: "Meeting cadence reguliere", score: 65, max: 100, color: "#22C55E" },
                          { critere: "Reporting unifie", score: 45, max: 100, color: "#4B5EFC" },
                          { critere: "OKRs partages", score: 50, max: 100, color: "#6C5CE7" },
                        ].map((item) => (
                          <div key={item.critere}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[11px] text-[#555]">{item.critere}</span>
                              <span className="text-[11px] font-semibold" style={{ color: item.score < 40 ? "#FF7A59" : item.score < 60 ? "#6C5CE7" : "#22C55E" }}>{item.score}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-[#F0F0F0] overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${item.score}%`, backgroundColor: item.score < 40 ? "#FF7A59" : item.score < 60 ? "#6C5CE7" : "#22C55E" }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#F2F2F2] text-center">
                        <span className="text-[10px] text-[#BBB]">Evaluez votre alignement sur 8 criteres cles -- Score recommande : 75%+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 -- Semaine 1 : Definir les termes */}
              <section id="semaine-1" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FF7A59] flex items-center justify-center text-white text-[12px] font-bold">S1</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Semaine 1 : Definir les termes ensemble</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La premiere semaine est consacree au fondement de tout alignement : un langage commun. C&apos;est la etape la plus importante du plan. Sans definitions partagees, toutes les actions suivantes reposeront sur des malentendus. L&apos;objectif de cette semaine est de reunir marketing et sales autour d&apos;une table et de produire un document de reference que tout le monde signe.</p>
                    <p>Commencez par organiser un workshop d&apos;alignement. Reunissez les responsables marketing, le directeur commercial, et idealement deux ou trois commerciaux operationnels. Pas de PowerPoint, pas de presentation formelle. Mettez un tableau blanc (physique ou Miro) au centre et posez la question : &ldquo;qu&apos;est-ce qu&apos;un bon lead pour nous ?&rdquo;. Laissez la discussion se derouler. Vous allez decouvrir des divergences que personne n&apos;avait formalisees.</p>
                    <p>Le livrable principal de cette semaine est un glossaire partage qui definit chaque etape du cycle de vie prospect. La precision des definitions est essentielle. Un MQL n&apos;est pas simplement &ldquo;un lead qualifie par le marketing&rdquo;. C&apos;est un contact qui remplit des criteres specifiques et mesurables : taille d&apos;entreprise, secteur, niveau de seniority, nombre d&apos;interactions avec le contenu, score minimum atteint.</p>
                    <p>Definissez egalement les criteres de disqualification. Quand est-ce qu&apos;un lead n&apos;est PAS un MQL, meme s&apos;il a rempli un formulaire ? Par exemple : un etudiant qui telecharge un livre blanc, un concurrent qui consulte votre pricing, une entreprise en dehors de votre ICP. Ces exclusions sont aussi importantes que les criteres d&apos;inclusion.</p>
                    <p>Documentez tout dans un format accessible et referençable. Un document Notion ou une page HubSpot dediee fonctionne bien. Evitez les PDF enterres dans un Drive. Le glossaire doit etre vivant, consultable en un clic, et mis a jour chaque trimestre. Faites signer le document par les deux parties. Ce n&apos;est pas bureaucratique, c&apos;est un engagement.</p>
                  </div>

                  {/* Visual definition cards */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        stage: "MQL",
                        full: "Marketing Qualified Lead",
                        definition: "Contact qui correspond a l&apos;ICP et a atteint un score d&apos;engagement minimum via ses interactions avec le contenu marketing.",
                        criteres: ["Taille entreprise > 20 salaries", "Secteur dans la liste cible", "Score lead >= 50 points", "Au moins 3 interactions"],
                        color: "#FF7A59",
                      },
                      {
                        stage: "SQL",
                        full: "Sales Qualified Lead",
                        definition: "MQL valide par les sales apres un premier contact. Le prospect a confirme un besoin, un budget et un timeline.",
                        criteres: ["Besoin confirme par telephone", "Budget identifie ou prevu", "Decision dans les 6 mois", "Interlocuteur decisionnaire"],
                        color: "#4B5EFC",
                      },
                      {
                        stage: "Opportunity",
                        full: "Opportunite commerciale",
                        definition: "SQL entre dans le pipeline avec un montant estime, une date de closing prevue et un deal owner assigne.",
                        criteres: ["Montant estime renseigne", "Date de closing prevue", "Deal owner assigne", "Etape de pipeline definie"],
                        color: "#22C55E",
                      },
                    ].map((item) => (
                      <div key={item.stage} className="p-4 rounded-lg border-2 bg-white" style={{ borderColor: `${item.color}30` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[14px] font-bold" style={{ color: item.color }}>{item.stage}</span>
                          <span className="text-[9px] text-[#BBB] font-medium">{item.full}</span>
                        </div>
                        <p className="text-[11px] text-[#666] leading-[1.6] mb-3">{item.definition}</p>
                        <div className="space-y-1.5">
                          {item.criteres.map((c) => (
                            <div key={c} className="flex items-start gap-2 text-[10px] text-[#888]">
                              <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.color }} />
                              {c}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SLA Template preview */}
                  <div className="mt-6 rounded-lg bg-[#FF7A59]/5 border border-[#FF7A59]/15 p-5">
                    <p className="text-[12px] font-semibold text-[#FF7A59] mb-3">Template SLA Semaine 1 -- Engagements reciproques</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-[11px] font-semibold text-[#111] mb-2">Marketing s&apos;engage a :</p>
                        <ul className="space-y-1.5">
                          {["Transmettre X MQLs par mois", "Respecter les criteres de qualification definis", "Documenter le contexte d&apos;engagement du lead", "Alerter les sales dans les 2h via Slack"].map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[10px] text-[#777]">
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#FF7A59]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-[#111] mb-2">Sales s&apos;engage a :</p>
                        <ul className="space-y-1.5">
                          {["Contacter chaque MQL dans les 24h", "Logger la disposition dans le CRM", "Remonter la qualite du lead (accepted/rejected)", "Participer au review hebdomadaire"].map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[10px] text-[#777]">
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#4B5EFC]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Week 1 milestones */}
                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                    <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Milestones Semaine 1</p>
                    <div className="space-y-2">
                      {[
                        { jour: "Jour 1-2", action: "Workshop d&apos;alignement : reunir les equipes, identifier les divergences" },
                        { jour: "Jour 3", action: "Rediger le glossaire commun (MQL, SQL, Opportunity, lifecycle stages)" },
                        { jour: "Jour 4", action: "Definir les criteres d&apos;inclusion et d&apos;exclusion pour chaque etape" },
                        { jour: "Jour 5", action: "Validation et signature du glossaire par les deux equipes" },
                      ].map((m) => (
                        <div key={m.jour} className="flex items-start gap-3">
                          <span className="text-[10px] font-semibold text-[#FF7A59] w-16 shrink-0 pt-0.5">{m.jour}</span>
                          <span className="text-[11px] text-[#666] leading-[1.5]">{m.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 -- Semaine 2 : Aligner le funnel */}
              <section id="semaine-2" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#4B5EFC] flex items-center justify-center text-white text-[12px] font-bold">S2</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Semaine 2 : Aligner le funnel et le scoring</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La deuxieme semaine traduit les definitions en processus concrets. Vous avez un langage commun, il faut maintenant le materialiser dans vos outils et vos workflows. L&apos;objectif est de configurer le funnel de bout en bout : lifecycle stages dans le CRM, modele de lead scoring, et processus de handoff entre marketing et sales.</p>
                    <p>Commencez par mapper les lifecycle stages dans votre CRM. Dans HubSpot, cela correspond aux etapes : Subscriber, Lead, MQL, SQL, Opportunity, Customer. Chaque transition d&apos;une etape a l&apos;autre doit etre liee a un evenement mesurable, pas a un jugement subjectif. Par exemple, le passage de Lead a MQL se declenche quand le score atteint 50 points ET que le contact correspond a l&apos;ICP. Le passage de MQL a SQL se fait quand un commercial a effectue un premier appel et confirme le besoin.</p>
                    <p>Le lead scoring est le mecanisme central de l&apos;alignement du funnel. Il traduit le comportement et le profil du prospect en un chiffre unique que les deux equipes comprennent. Le modele doit combiner deux dimensions : le fit (le prospect correspond-il a votre ICP ?) et l&apos;engagement (le prospect interagit-il avec votre contenu ?). Un prospect qui a le bon profil mais aucun engagement n&apos;est pas un MQL. Un prospect tres engage mais hors cible non plus.</p>
                    <p>Definissez les criteres de scoring avec les deux equipes. Le marketing apporte sa connaissance des comportements digitaux (pages visitees, contenus telecharges, emails ouverts). Les sales apportent leur experience terrain (quels profils signent reellement, quels signaux indiquent une intention d&apos;achat). Le modele final doit refleter les deux perspectives.</p>
                    <p>Le processus de handoff est le moment critique ou un MQL devient un SQL. Il doit etre instantane, documente et traçable. Quand un lead atteint le score MQL, un workflow automatique doit : notifier le commercial assigne (via Slack ou email), creer une tache dans le CRM avec un delai de 24h, et logger l&apos;horodatage du handoff pour mesurer la vitesse de suivi.</p>
                    <p>Prevoyez aussi le processus inverse : le reject. Quand un commercial determine qu&apos;un MQL n&apos;est pas qualifie, il doit pouvoir le marquer comme &ldquo;rejected&rdquo; avec une raison obligatoire. Cette donnee est cruciale pour que le marketing affine son scoring et ses criteres de qualification. Sans ce mecanisme, le marketing ne sait jamais quels leads etaient reellement bons.</p>
                  </div>

                  {/* CSS Funnel handoff visualization */}
                  <div className="mt-8 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#4B5EFC]" />
                      <span className="text-[12px] font-semibold text-white">Funnel Handoff -- Lifecycle Stages</span>
                    </div>
                    <div className="bg-white p-5">
                      <div className="flex flex-col items-center gap-0">
                        {/* Stage 1 - Visitor */}
                        <div className="w-full max-w-[480px] rounded-t-xl bg-[#F8F8F8] border border-[#EAEAEA] p-3 text-center relative">
                          <p className="text-[12px] font-semibold text-[#999]">Visiteur</p>
                          <p className="text-[10px] text-[#BBB] mt-0.5">Trafic anonyme -- pas encore identifie</p>
                          <div className="absolute right-3 top-3 text-[9px] text-[#DDD] font-medium">MARKETING</div>
                        </div>
                        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#E8E8E8]" />

                        {/* Stage 2 - Lead */}
                        <div className="w-[90%] max-w-[432px] bg-[#FF7A59]/5 border-x border-b border-[#FF7A59]/20 p-3 text-center relative">
                          <p className="text-[12px] font-semibold text-[#FF7A59]">Lead</p>
                          <p className="text-[10px] text-[#BBB] mt-0.5">Formulaire rempli -- contact identifie</p>
                          <div className="absolute right-3 top-3 text-[9px] text-[#FF7A59]/40 font-medium">MARKETING</div>
                        </div>
                        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#FF7A59]/20" />

                        {/* Stage 3 - MQL */}
                        <div className="w-[78%] max-w-[374px] bg-[#FF7A59]/10 border-x border-b border-[#FF7A59]/30 p-3 text-center relative">
                          <p className="text-[12px] font-semibold text-[#FF7A59]">MQL</p>
                          <p className="text-[10px] text-[#BBB] mt-0.5">Score >= 50 + ICP match -- pret pour les sales</p>
                          <div className="absolute right-3 top-3 text-[9px] text-[#FF7A59]/50 font-medium">MARKETING</div>
                        </div>

                        {/* Handoff zone */}
                        <div className="w-[78%] max-w-[374px] border-2 border-dashed border-[#FF7A59]/40 bg-[#FF7A59]/5 p-2 text-center my-1">
                          <p className="text-[10px] font-bold text-[#FF7A59] uppercase tracking-wider">Handoff Zone -- Notification Slack + Tache CRM</p>
                        </div>

                        {/* Stage 4 - SQL */}
                        <div className="w-[65%] max-w-[312px] bg-[#4B5EFC]/10 border-x border-b border-[#4B5EFC]/30 p-3 text-center relative">
                          <p className="text-[12px] font-semibold text-[#4B5EFC]">SQL</p>
                          <p className="text-[10px] text-[#BBB] mt-0.5">Besoin confirme par les sales -- budget et timeline</p>
                          <div className="absolute right-3 top-3 text-[9px] text-[#4B5EFC]/50 font-medium">SALES</div>
                        </div>
                        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#4B5EFC]/30" />

                        {/* Stage 5 - Opportunity */}
                        <div className="w-[50%] max-w-[240px] bg-[#22C55E]/10 border-x border-b border-[#22C55E]/30 p-3 text-center relative">
                          <p className="text-[12px] font-semibold text-[#22C55E]">Opportunity</p>
                          <p className="text-[10px] text-[#BBB] mt-0.5">Dans le pipeline -- montant et closing prevus</p>
                          <div className="absolute right-3 top-3 text-[9px] text-[#22C55E]/50 font-medium">SALES</div>
                        </div>
                        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#22C55E]/30" />

                        {/* Stage 6 - Customer */}
                        <div className="w-[35%] max-w-[168px] rounded-b-xl bg-[#22C55E]/20 border-x border-b border-[#22C55E]/40 p-3 text-center">
                          <p className="text-[12px] font-semibold text-[#22C55E]">Client</p>
                          <p className="text-[10px] text-[#BBB] mt-0.5">Deal won -- onboarding</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lead scoring model */}
                  <div className="mt-6 rounded-lg bg-[#4B5EFC]/5 border border-[#4B5EFC]/15 p-5">
                    <p className="text-[12px] font-semibold text-[#4B5EFC] mb-4">Modele de Lead Scoring recommande</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-[11px] font-semibold text-[#111] mb-2">Criteres de Fit (profil)</p>
                        <div className="space-y-1.5">
                          {[
                            { critere: "Taille entreprise > 50 salaries", points: "+15" },
                            { critere: "Secteur dans la liste cible", points: "+10" },
                            { critere: "Poste C-level ou VP", points: "+15" },
                            { critere: "Zone geographique France", points: "+5" },
                            { critere: "Hors ICP (etudiant, concurrent)", points: "-50" },
                          ].map((item) => (
                            <div key={item.critere} className="flex items-center justify-between text-[10px]">
                              <span className="text-[#666]">{item.critere}</span>
                              <span className={`font-semibold ${item.points.startsWith("-") ? "text-[#FF7A59]" : "text-[#22C55E]"}`}>{item.points}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-[#111] mb-2">Criteres d&apos;Engagement (comportement)</p>
                        <div className="space-y-1.5">
                          {[
                            { critere: "Visite page pricing", points: "+20" },
                            { critere: "Telechargement livre blanc", points: "+10" },
                            { critere: "Inscription webinar", points: "+15" },
                            { critere: "Ouverture email nurturing", points: "+3" },
                            { critere: "Demande de demo", points: "+30" },
                          ].map((item) => (
                            <div key={item.critere} className="flex items-center justify-between text-[10px]">
                              <span className="text-[#666]">{item.critere}</span>
                              <span className="font-semibold text-[#22C55E]">{item.points}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#4B5EFC]/10 text-center">
                      <span className="text-[10px] text-[#999]">Seuil MQL : 50 points -- Seuil SQL : validation manuelle par les sales apres contact</span>
                    </div>
                  </div>

                  {/* Week 2 milestones */}
                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                    <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Milestones Semaine 2</p>
                    <div className="space-y-2">
                      {[
                        { jour: "Jour 8", action: "Mapper les lifecycle stages dans HubSpot avec les regles de transition" },
                        { jour: "Jour 9-10", action: "Construire le modele de lead scoring (fit + engagement) avec les deux equipes" },
                        { jour: "Jour 11", action: "Configurer le workflow de handoff : notification, tache, horodatage" },
                        { jour: "Jour 12", action: "Mettre en place le mecanisme de reject avec raisons obligatoires" },
                        { jour: "Jour 13-14", action: "Tester le funnel de bout en bout avec des leads reels" },
                      ].map((m) => (
                        <div key={m.jour} className="flex items-start gap-3">
                          <span className="text-[10px] font-semibold text-[#4B5EFC] w-16 shrink-0 pt-0.5">{m.jour}</span>
                          <span className="text-[11px] text-[#666] leading-[1.5]">{m.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 -- Semaine 3 : Outiller */}
              <section id="semaine-3" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center text-white text-[12px] font-bold">S3</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Semaine 3 : Mettre en place les outils</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La troisieme semaine est consacree a l&apos;outillage. Vous avez les definitions, vous avez le funnel, il faut maintenant que les outils refletent cette nouvelle organisation. L&apos;objectif est de creer un environnement ou l&apos;information circule automatiquement entre les equipes, sans dependance a la bonne volonte individuelle.</p>
                    <p>La premiere action est de creer des dashboards partages dans votre CRM. Marketing et sales doivent voir les memes chiffres, dans le meme outil, au meme moment. Fini les rapports Excel envoyes par email une fois par semaine. Le dashboard partage est la source de verite unique. Il doit inclure : le volume de leads par etape du funnel, les taux de conversion entre etapes, le temps moyen de traitement des MQLs par les sales, le taux d&apos;acceptation des MQLs, et le pipeline genere par le marketing.</p>
                    <p>Les alertes Slack sont le deuxieme pilier de l&apos;outillage. Configurez des notifications automatiques pour les evenements critiques : nouveau MQL assigne, MQL non contacte depuis 24h, MQL rejete (avec la raison), deal ferme provenant d&apos;un MQL marketing. Ces alertes maintiennent la pression positive et rendent les processus transparents. Quand tout le monde voit que le MQL n&apos;a pas ete contacte depuis 48h, la pression sociale fait le reste.</p>
                    <p>Installez une cadence de meeting reguliere. Un meeting hebdomadaire de 30 minutes entre le responsable marketing et le responsable commercial est le minimum. L&apos;agenda est simple et immuable : revue des chiffres de la semaine (leads generes, MQLs transmis, taux de suivi, pipeline ajoute), feedback des sales sur la qualite des leads, ajustements du scoring si necessaire, actions pour la semaine suivante. Ce meeting ne doit jamais sauter. C&apos;est la que les problemes se detectent et se resolvent avant de devenir des crises.</p>
                    <p>Ajoutez un meeting mensuel plus strategique, de 60 minutes, avec les directeurs des deux equipes et idealement le CEO ou COO. Ce meeting couvre : la performance du SLA (objectifs atteints ou non), l&apos;evolution des taux de conversion du funnel, les tendances du pipeline, et les decisions d&apos;investissement (plus de budget marketing, plus de SDR, changement de canaux d&apos;acquisition).</p>
                  </div>

                  {/* CSS Dashboard mockup */}
                  <div className="mt-8 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                        <span className="text-[12px] font-semibold text-white">Shared Dashboard -- Marketing + Sales</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40">Mars 2026</span>
                        <div className="w-5 h-5 rounded border border-white/10 flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-white/40"><path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-5">
                      {/* KPI Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                        {[
                          { label: "MQLs generes", value: "142", change: "+18%", positive: true },
                          { label: "Taux de suivi < 24h", value: "78%", change: "+12%", positive: true },
                          { label: "MQL -> SQL conversion", value: "34%", change: "+5%", positive: true },
                          { label: "Pipeline marketing", value: "285K", change: "+22%", positive: true },
                        ].map((kpi) => (
                          <div key={kpi.label} className="p-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2]">
                            <p className="text-[10px] text-[#999] mb-1">{kpi.label}</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-[18px] font-bold text-[#111]">{kpi.value}</span>
                              <span className={`text-[10px] font-medium ${kpi.positive ? "text-[#22C55E]" : "text-[#FF7A59]"}`}>{kpi.change}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Funnel bar chart mockup */}
                      <div className="mb-5">
                        <p className="text-[11px] font-semibold text-[#111] mb-3">Conversion funnel -- ce mois</p>
                        <div className="space-y-2">
                          {[
                            { stage: "Visiteurs", value: 12400, max: 12400, color: "#E8E8E8" },
                            { stage: "Leads", value: 890, max: 12400, color: "#FF7A59" },
                            { stage: "MQLs", value: 142, max: 12400, color: "#FF7A59" },
                            { stage: "SQLs", value: 48, max: 12400, color: "#4B5EFC" },
                            { stage: "Opportunities", value: 22, max: 12400, color: "#22C55E" },
                            { stage: "Clients", value: 8, max: 12400, color: "#22C55E" },
                          ].map((item) => (
                            <div key={item.stage} className="flex items-center gap-3">
                              <span className="text-[10px] text-[#999] w-20 text-right shrink-0">{item.stage}</span>
                              <div className="flex-1 h-4 bg-[#F8F8F8] rounded-sm overflow-hidden">
                                <div className="h-full rounded-sm transition-all" style={{ width: `${Math.max(3, (item.value / item.max) * 100)}%`, backgroundColor: item.color }} />
                              </div>
                              <span className="text-[10px] font-semibold text-[#555] w-14 shrink-0">{item.value.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Speed & quality row */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg border border-[#F0F0F0]">
                          <p className="text-[10px] text-[#999] mb-2">Vitesse de suivi MQL</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 space-y-1">
                              {[
                                { label: "< 1h", pct: 35, color: "#22C55E" },
                                { label: "1-24h", pct: 43, color: "#4B5EFC" },
                                { label: "> 24h", pct: 22, color: "#FF7A59" },
                              ].map((r) => (
                                <div key={r.label} className="flex items-center gap-2">
                                  <span className="text-[9px] text-[#999] w-10">{r.label}</span>
                                  <div className="flex-1 h-2 bg-[#F8F8F8] rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
                                  </div>
                                  <span className="text-[9px] font-medium text-[#666] w-8 text-right">{r.pct}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg border border-[#F0F0F0]">
                          <p className="text-[10px] text-[#999] mb-2">Qualite MQL (feedback sales)</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 space-y-1">
                              {[
                                { label: "Accepted", pct: 68, color: "#22C55E" },
                                { label: "Rejected", pct: 22, color: "#FF7A59" },
                                { label: "Pending", pct: 10, color: "#E8E8E8" },
                              ].map((r) => (
                                <div key={r.label} className="flex items-center gap-2">
                                  <span className="text-[9px] text-[#999] w-14">{r.label}</span>
                                  <div className="flex-1 h-2 bg-[#F8F8F8] rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${r.pct}%`, backgroundColor: r.color }} />
                                  </div>
                                  <span className="text-[9px] font-medium text-[#666] w-8 text-right">{r.pct}%</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Meeting cadence */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                      <p className="text-[12px] font-semibold text-[#22C55E] mb-2">Weekly Sync -- 30 min</p>
                      <p className="text-[10px] text-[#999] mb-2">Chaque lundi, 10h00</p>
                      <ul className="space-y-1.5">
                        {["Revue des KPIs de la semaine passee", "Feedback sales sur la qualite des MQLs", "Ajustements scoring si necessaire", "Actions pour la semaine a venir"].map((item) => (
                          <li key={item} className="flex items-start gap-2 text-[10px] text-[#777]">
                            <span className="w-1 h-1 rounded-full bg-[#22C55E] mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                      <p className="text-[12px] font-semibold text-[#4B5EFC] mb-2">Monthly Review -- 60 min</p>
                      <p className="text-[10px] text-[#999] mb-2">Premier vendredi du mois, 14h00</p>
                      <ul className="space-y-1.5">
                        {["Performance du SLA (atteint ou non)", "Evolution des taux de conversion", "Tendances du pipeline et du revenu", "Decisions d&apos;investissement et budget"].map((item) => (
                          <li key={item} className="flex items-start gap-2 text-[10px] text-[#777]">
                            <span className="w-1 h-1 rounded-full bg-[#4B5EFC] mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Week 3 milestones */}
                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                    <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Milestones Semaine 3</p>
                    <div className="space-y-2">
                      {[
                        { jour: "Jour 15-16", action: "Creer le dashboard partage dans HubSpot avec les KPIs d&apos;alignement" },
                        { jour: "Jour 17", action: "Configurer les alertes Slack (nouveau MQL, MQL en retard, reject, deal won)" },
                        { jour: "Jour 18", action: "Installer la cadence de meetings : weekly sync + monthly review" },
                        { jour: "Jour 19", action: "Documenter les templates d&apos;agenda et les process de review" },
                        { jour: "Jour 20-21", action: "Former les equipes aux nouveaux dashboards et aux alertes" },
                      ].map((m) => (
                        <div key={m.jour} className="flex items-start gap-3">
                          <span className="text-[10px] font-semibold text-[#22C55E] w-16 shrink-0 pt-0.5">{m.jour}</span>
                          <span className="text-[11px] text-[#666] leading-[1.5]">{m.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 -- Semaine 4 : Mesurer et iterer */}
              <section id="semaine-4" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#6C5CE7] flex items-center justify-center text-white text-[12px] font-bold">S4</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Semaine 4 : Mesurer et iterer</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La quatrieme semaine est celle de la verification et de l&apos;ajustement. Vous avez mis en place les definitions, le funnel, les outils et les processus. Maintenant il faut mesurer si tout fonctionne et commencer a iterer. L&apos;alignement n&apos;est pas un projet one-shot, c&apos;est un muscle qui se renforce avec la repetition.</p>
                    <p>Commencez par un bilan de mi-parcours. Reunissez les deux equipes et passez en revue les premiers resultats. Combien de MQLs ont ete transmis depuis le debut du mois ? Quel est le taux de suivi dans les 24h ? Combien de MQLs ont ete acceptes vs rejetes ? Quelles sont les raisons principales de rejet ? Le scoring est-il calibre correctement ? Les alertes Slack fonctionnent-elles ? Les meetings ont-ils eu lieu ?</p>
                    <p>Definissez les KPIs d&apos;alignement que vous suivrez chaque semaine et chaque mois. Ce ne sont pas les memes que les KPIs marketing ou sales individuels. Les KPIs d&apos;alignement mesurent la qualite de la collaboration entre les deux equipes. Ils incluent : le taux de suivi MQL (pourcentage de MQLs contactes dans le delai SLA), le taux d&apos;acceptation MQL (pourcentage de MQLs valides par les sales), le temps de cycle MQL-to-SQL (combien de jours entre le handoff et la qualification), et le taux de conversion MQL-to-Opportunity.</p>
                    <p>Mettez en place une boucle de feedback formalisee. Chaque semaine, les sales doivent qualifier les MQLs reçus comme &ldquo;accepted&rdquo;, &ldquo;rejected&rdquo; ou &ldquo;needs more nurturing&rdquo;. Pour chaque MQL rejete, la raison doit etre documentee dans le CRM. Le marketing utilise ces donnees pour ajuster le scoring, modifier les criteres de qualification, et optimiser les campagnes. La boucle doit etre bouclee : le marketing informe les sales des changements faits sur la base de leur feedback.</p>
                    <p>Creez un template de weekly review que vous utiliserez chaque semaine. Le template doit etre simple, repetable et factuel. Pas de prose, pas de justifications, juste les chiffres et les actions. Un bon template tient sur une page et se remplit en 10 minutes. Il est partage avant le meeting pour que tout le monde arrive prepare.</p>
                  </div>

                  {/* KPIs d'alignement */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { kpi: "Taux de suivi MQL", target: "> 85%", desc: "MQLs contactes dans le delai SLA", color: "#FF7A59" },
                      { kpi: "Taux acceptation", target: "> 70%", desc: "MQLs valides par les sales", color: "#4B5EFC" },
                      { kpi: "Cycle MQL-to-SQL", target: "< 5 jours", desc: "Temps entre handoff et qualification", color: "#6C5CE7" },
                      { kpi: "MQL-to-Opp rate", target: "> 25%", desc: "MQLs convertis en opportunites", color: "#22C55E" },
                    ].map((item) => (
                      <div key={item.kpi} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] text-center">
                        <p className="text-[11px] font-semibold text-[#111] mb-1">{item.kpi}</p>
                        <p className="text-[16px] font-bold" style={{ color: item.color }}>{item.target}</p>
                        <p className="text-[9px] text-[#999] mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Weekly review template */}
                  <div className="mt-6 rounded-lg bg-[#6C5CE7]/5 border border-[#6C5CE7]/15 p-5">
                    <p className="text-[12px] font-semibold text-[#6C5CE7] mb-3">Template Weekly Review</p>
                    <div className="space-y-3">
                      {[
                        { section: "1. Chiffres de la semaine", items: ["MQLs generes vs objectif", "Taux de suivi < 24h", "MQLs accepted / rejected / pending", "Pipeline ajoute via marketing"] },
                        { section: "2. Feedback qualite", items: ["Top 3 raisons de rejet", "Leads qui ont particulierement bien converti", "Signaux faibles detectes par les sales"] },
                        { section: "3. Ajustements", items: ["Modifications du scoring", "Changements de criteres MQL", "Optimisation des campagnes en cours"] },
                        { section: "4. Actions semaine prochaine", items: ["Actions marketing (contenu, campagnes, scoring)", "Actions sales (follow-up, feedback)", "Actions communes (process, outils)"] },
                      ].map((block) => (
                        <div key={block.section}>
                          <p className="text-[11px] font-semibold text-[#111] mb-1.5">{block.section}</p>
                          <div className="space-y-1">
                            {block.items.map((item) => (
                              <div key={item} className="flex items-start gap-2 text-[10px] text-[#777]">
                                <div className="w-3 h-3 rounded border border-[#DDD] shrink-0 mt-0.5" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Week 4 milestones */}
                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                    <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Milestones Semaine 4</p>
                    <div className="space-y-2">
                      {[
                        { jour: "Jour 22-23", action: "Premier bilan : analyser les donnees des 3 premieres semaines" },
                        { jour: "Jour 24", action: "Ajuster le lead scoring sur la base du feedback sales" },
                        { jour: "Jour 25", action: "Formaliser le template de weekly review et le tester" },
                        { jour: "Jour 26-27", action: "Documenter les KPIs d&apos;alignement et les targets" },
                        { jour: "Jour 28-30", action: "Premiere weekly review officielle avec le nouveau format" },
                      ].map((m) => (
                        <div key={m.jour} className="flex items-start gap-3">
                          <span className="text-[10px] font-semibold text-[#6C5CE7] w-16 shrink-0 pt-0.5">{m.jour}</span>
                          <span className="text-[11px] text-[#666] leading-[1.5]">{m.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 -- Le SLA marketing-sales */}
              <section id="sla-marketing-sales" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Le SLA marketing-sales : le contrat qui change tout</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le SLA (Service Level Agreement) marketing-sales est un document formel qui definit les engagements reciproques des deux equipes. Ce n&apos;est pas un document juridique, c&apos;est un accord operationnel. Mais il a la meme force contraignante qu&apos;un contrat : les deux parties s&apos;engagent sur des objectifs mesurables, et la performance est revue regulierement.</p>
                    <p>Le SLA repond a la question fondamentale qui genere 90% des conflits marketing-sales : &ldquo;qui est responsable de quoi ?&rdquo;. Il definit combien de MQLs le marketing doit generer chaque mois, avec quels criteres de qualite, dans quels delais. Il definit aussi comment les sales doivent traiter ces leads : delai de premier contact, obligation de feedback, taux de suivi minimum.</p>
                    <p>Un bon SLA est bidirectionnel. Les deux equipes ont des obligations. Si le marketing ne livre pas le volume de MQLs prevu, les sales ne peuvent pas atteindre leurs objectifs de pipeline. Si les sales ne traitent pas les MQLs dans les delais, le marketing gaspille son budget d&apos;acquisition. Le SLA rend ces interdependances explicites et mesurables.</p>
                    <p>Le SLA doit etre revise chaque trimestre. Les objectifs evoluent avec la croissance de l&apos;entreprise, les changements de marche et les leçons apprises. Un SLA qui ne change jamais est un SLA qui ne sert plus. Chaque revision trimestrielle est l&apos;occasion de recalibrer les objectifs, d&apos;integrer le feedback accumule, et de renforcer les points faibles identifies.</p>
                    <p>Rendez le SLA visible. Affichez les metriques cles du SLA dans le dashboard partage. Partagez un rapport mensuel de respect du SLA avec l&apos;ensemble des equipes. Quand les engagements ne sont pas tenus, adressez le probleme immediatement, pas dans une revue trimestrielle. Le SLA ne fonctionne que si tout le monde sait qu&apos;il sera suivi et que les ecarts seront discutes.</p>
                  </div>

                  {/* SLA Dashboard CSS Mockup */}
                  <div className="mt-8 rounded-lg border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                        <span className="text-[12px] font-semibold text-white">SLA Dashboard -- Mars 2026</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#22C55E]/20 text-[#22C55E] font-medium">SLA respecte</span>
                      </div>
                    </div>
                    <div className="bg-white p-5">
                      {/* SLA Status */}
                      <div className="grid grid-cols-2 gap-4 mb-5">
                        {/* Marketing SLA */}
                        <div className="p-4 rounded-lg border border-[#F0F0F0]">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-semibold text-[#FF7A59]">Engagements Marketing</span>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] font-medium">3/4 atteints</span>
                          </div>
                          <div className="space-y-3">
                            {[
                              { metric: "MQLs / mois", target: "120", actual: "142", status: "ok" },
                              { metric: "Delai handoff", target: "< 2h", actual: "1.4h", status: "ok" },
                              { metric: "Contexte renseigne", target: "100%", actual: "94%", status: "warning" },
                              { metric: "Qualite scoring", target: "> 70% accepted", actual: "68%", status: "ok" },
                            ].map((item) => (
                              <div key={item.metric} className="flex items-center justify-between">
                                <span className="text-[10px] text-[#666]">{item.metric}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-[#BBB]">{item.target}</span>
                                  <span className="text-[10px] font-semibold text-[#111]">{item.actual}</span>
                                  <div className={`w-2 h-2 rounded-full ${item.status === "ok" ? "bg-[#22C55E]" : item.status === "warning" ? "bg-[#F59E0B]" : "bg-[#FF7A59]"}`} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sales SLA */}
                        <div className="p-4 rounded-lg border border-[#F0F0F0]">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-semibold text-[#4B5EFC]">Engagements Sales</span>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] font-medium">4/4 atteints</span>
                          </div>
                          <div className="space-y-3">
                            {[
                              { metric: "Suivi < 24h", target: "> 85%", actual: "88%", status: "ok" },
                              { metric: "Feedback renseigne", target: "100%", actual: "96%", status: "ok" },
                              { metric: "Raison rejet logguee", target: "100%", actual: "100%", status: "ok" },
                              { metric: "Presence weekly sync", target: "100%", actual: "100%", status: "ok" },
                            ].map((item) => (
                              <div key={item.metric} className="flex items-center justify-between">
                                <span className="text-[10px] text-[#666]">{item.metric}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-[#BBB]">{item.target}</span>
                                  <span className="text-[10px] font-semibold text-[#111]">{item.actual}</span>
                                  <div className={`w-2 h-2 rounded-full ${item.status === "ok" ? "bg-[#22C55E]" : item.status === "warning" ? "bg-[#F59E0B]" : "bg-[#FF7A59]"}`} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* SLA Trend */}
                      <div className="rounded-lg border border-[#F0F0F0] p-4">
                        <p className="text-[10px] text-[#999] mb-3">Evolution du respect SLA -- 6 derniers mois</p>
                        <div className="flex items-end gap-2 h-16">
                          {[
                            { month: "Oct", pct: 45 },
                            { month: "Nov", pct: 58 },
                            { month: "Dec", pct: 62 },
                            { month: "Jan", pct: 71 },
                            { month: "Fev", pct: 78 },
                            { month: "Mar", pct: 88 },
                          ].map((item) => (
                            <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                              <div className="w-full rounded-t-sm" style={{ height: `${item.pct * 0.6}px`, backgroundColor: item.pct >= 75 ? "#22C55E" : item.pct >= 60 ? "#F59E0B" : "#FF7A59" }} />
                              <span className="text-[8px] text-[#BBB]">{item.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SLA contents */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Ce que contient un SLA complet</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        "Definitions partagees (MQL, SQL, Opportunity)",
                        "Objectifs de volume MQL par mois",
                        "Criteres de qualite et scoring minimum",
                        "Delai maximum de traitement par les sales",
                        "Obligation de feedback et raisons de rejet",
                        "KPIs d&apos;alignement et targets",
                        "Cadence de review (hebdo + mensuel)",
                        "Processus d&apos;escalade en cas de non-respect",
                        "Clause de revision trimestrielle",
                        "Signatures des deux responsables",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2 text-[11px] text-[#666]">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#FF7A59]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 -- Les outils de l'alignement */}
              <section id="outils-alignement" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les outils de l&apos;alignement marketing-sales</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;alignement est d&apos;abord un sujet de processus et de culture, pas d&apos;outils. Mais les bons outils, bien configures, rendent l&apos;alignement beaucoup plus facile a maintenir. Ils automatisent la circulation de l&apos;information, eliminent les taches manuelles sujettes a l&apos;erreur, et creent de la transparence par defaut.</p>
                    <p>Le CRM est la fondation. Sans un CRM partage et correctement configure, l&apos;alignement reste theorique. HubSpot est notre recommandation pour les PME et ETI B2B parce qu&apos;il integre nativement le marketing automation et le CRM sales dans une seule plateforme. Pas de synchronisation a gerer, pas de mapping de champs, pas de donnees qui divergent entre deux systemes. Le marketing et les sales voient la meme fiche contact, le meme historique, les memes proprietes.</p>
                    <p>Slack (ou Teams) est le canal de communication en temps reel. Les alertes automatiques depuis le CRM vers Slack permettent de reagir immediatement aux evenements critiques. Un nouveau MQL ? Le commercial reçoit un message avec le contexte complet. Un MQL rejete ? Le marketing est notifie. Un deal signe provenant du marketing ? Toute l&apos;equipe celebre. Ces micro-interactions quotidiennes construisent une culture de collaboration.</p>
                    <p>Notion (ou Confluence) est l&apos;outil de documentation. Le glossaire commun, le SLA, les templates de review, les playbooks de qualification, tout est centralise dans un espace partage que les deux equipes consultent et mettent a jour. La documentation vivante remplace les emails et les fichiers perdus dans les disques durs.</p>
                    <p>Claap ou Loom permettent d&apos;enregistrer et partager des retours video asynchrones. Un commercial qui veut montrer au marketing comment un lead s&apos;est comporte en demo peut enregistrer un court recap video. Le marketing peut partager une walkthrough des nouvelles campagnes avec les sales. Ces outils comblent le fossement de communication entre des equipes qui ne sont pas toujours au meme endroit au meme moment.</p>
                  </div>

                  {/* Tools grid */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { outil: "HubSpot", role: "CRM + Marketing Automation", desc: "Plateforme unifiee qui centralise le funnel. Lifecycle stages, lead scoring, workflows, dashboards partages. La source de verite unique pour les deux equipes.", color: "#FF7A59" },
                      { outil: "Slack", role: "Communication temps reel", desc: "Alertes automatiques (nouveau MQL, MQL en retard, deal won). Canal dedie #marketing-sales pour les discussions operationnelles quotidiennes.", color: "#4B5EFC" },
                      { outil: "Notion", role: "Documentation partagee", desc: "SLA, glossaire, playbooks, templates de review. Documentation vivante accessible en un clic par les deux equipes.", color: "#6C5CE7" },
                      { outil: "Claap", role: "Feedback video asynchrone", desc: "Retours de demo, walkthrough campagnes, recaps hebdo. Comble le fossement de communication entre equipes distribuees.", color: "#22C55E" },
                    ].map((item) => (
                      <div key={item.outil} className="p-4 rounded-lg border-2 bg-white" style={{ borderColor: `${item.color}30` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[13px] font-bold" style={{ color: item.color }}>{item.outil}</span>
                          <span className="text-[9px] text-[#BBB] font-medium">{item.role}</span>
                        </div>
                        <p className="text-[11px] text-[#666] leading-[1.6]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 -- Maintenir l'alignement */}
              <section id="maintenir-alignement" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Maintenir l&apos;alignement dans la duree</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Les 30 premiers jours mettent en place les fondations. Mais l&apos;alignement n&apos;est pas un projet ponctuel avec une date de fin. C&apos;est une discipline continue qui requiert de l&apos;attention, de la rigueur et des rituels. Les entreprises qui reussissent l&apos;alignement sur le long terme sont celles qui le traitent comme un processus permanent, pas comme un chantier a terminer.</p>
                    <p>Les reviews trimestrielles sont le mecanisme principal de maintien. Chaque trimestre, les deux equipes se retrouvent pour une session de 2 a 3 heures. L&apos;objectif est de prendre du recul : qu&apos;est-ce qui a fonctionne, qu&apos;est-ce qui n&apos;a pas fonctionne, qu&apos;est-ce qui doit changer. On revise le SLA, on ajuste les objectifs, on recalibre le scoring, on met a jour les definitions si necessaire.</p>
                    <p>Les OKRs partages sont un accelerateur puissant. Quand marketing et sales ont des objectifs communs au niveau trimestriel, les comportements s&apos;alignent naturellement. Un OKR comme &ldquo;generer 500K de pipeline qualifie ce trimestre&rdquo; oblige les deux equipes a collaborer. Le marketing ne peut pas se contenter de generer du volume sans qualite. Les sales ne peuvent pas ignorer les leads marketing et compter uniquement sur l&apos;outbound.</p>
                    <p>La rotation de poste temporaire est une pratique sous-estimee. Faites assister un marketeur a une semaine de calls commerciaux. Faites participer un commercial a une session de brainstorming contenu. Quand chaque equipe comprend concretement le quotidien de l&apos;autre, l&apos;empathie remplace le jugement, et la collaboration devient naturelle.</p>
                    <p>Celebrez les victoires communes. Quand un deal signe provient d&apos;un MQL marketing, les deux equipes doivent le savoir et le celebrer. Quand un retour commercial permet d&apos;ameliorer une campagne qui genere plus de SQLs, le merite est partage. La reconnaissance commune renforce la culture de collaboration et motive les equipes a maintenir l&apos;effort.</p>
                  </div>

                  {/* Shared OKRs example */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-4">Exemple d&apos;OKRs partages -- Q2 2026</p>
                    <div className="space-y-4">
                      {[
                        {
                          objective: "Generer 500K de pipeline qualifie",
                          keyResults: [
                            "Marketing : 400 MQLs avec un taux d&apos;acceptation > 70%",
                            "Sales : taux de suivi MQL < 24h > 90%",
                            "Commun : taux MQL-to-Opportunity > 30%",
                          ],
                          color: "#FF7A59",
                        },
                        {
                          objective: "Reduire le cycle de vente de 20%",
                          keyResults: [
                            "Marketing : 5 etudes de cas sectorielles pour accelerer le BOFU",
                            "Sales : premier appel dans les 4h pour les MQLs chauds",
                            "Commun : temps MQL-to-SQL < 3 jours",
                          ],
                          color: "#4B5EFC",
                        },
                      ].map((okr) => (
                        <div key={okr.objective} className="p-4 rounded-lg bg-white border border-[#EAEAEA]">
                          <p className="text-[12px] font-semibold mb-2" style={{ color: okr.color }}>{okr.objective}</p>
                          <div className="space-y-1.5">
                            {okr.keyResults.map((kr) => (
                              <div key={kr} className="flex items-start gap-2 text-[10px] text-[#777]">
                                <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: okr.color }} />
                                {kr}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quarterly review agenda */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { phase: "Revue (45 min)", items: ["Bilan des KPIs du trimestre", "Respect du SLA (objectifs vs actuel)", "Analyse des gains et des pertes", "Feedback croise des equipes"], color: "#FF7A59" },
                      { phase: "Ajustements (45 min)", items: ["Recalibrage du scoring", "Revision des criteres MQL/SQL", "Mise a jour du SLA", "Nouveaux objectifs trimestriels"], color: "#4B5EFC" },
                      { phase: "Planification (30 min)", items: ["OKRs communs Q+1", "Campagnes prevues", "Ressources et budget", "Prochaines etapes"], color: "#22C55E" },
                    ].map((p) => (
                      <div key={p.phase} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <p className="text-[12px] font-semibold mb-3" style={{ color: p.color }}>{p.phase}</p>
                        <ul className="space-y-1.5">
                          {p.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[10px] text-[#777]">
                              <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: p.color }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 -- Notre methode chez Ceres (dark section) */}
              <section id="methode-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Notre methode</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Notre methode d&apos;alignement chez Ceres</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Chez Ceres, l&apos;alignement marketing-sales est au coeur de notre mission RevOps. Nous avons deploye cette methodologie en 30 jours chez des dizaines de PME et ETI B2B, avec des resultats mesurables des le premier mois : augmentation du taux de suivi MQL de 40% en moyenne, reduction du cycle MQL-to-SQL de 3 jours, et hausse du pipeline marketing de 25%.</p>
                    <p>Notre approche est structuree, pragmatique et adaptee a votre contexte. Nous ne plaquons pas un framework generique. Nous commencons par un diagnostic approfondi de votre situation actuelle : comment fonctionnent vos equipes, quels outils sont en place, ou sont les frictions, quels sont les enjeux de revenu. Ce diagnostic prend 2 a 3 jours et produit une cartographie complete de votre niveau d&apos;alignement.</p>
                    <p>Ensuite, nous deroulons le plan en 4 semaines, en adaptant le rythme et les priorites a vos contraintes. Certaines entreprises ont deja un CRM bien configure mais pas de processus de handoff. D&apos;autres ont des definitions en place mais pas de dashboards. Nous identifions les gaps les plus critiques et nous les comblons en premier, pour generer des quick wins qui donnent de l&apos;elan au projet.</p>
                    <p>Nous restons aux cotes de nos clients apres le deploiement initial. Le premier mois installe les fondations, mais c&apos;est dans les mois qui suivent que l&apos;alignement se renforce et produit ses effets composes. Nous accompagnons les quarterly reviews, nous aidons a affiner le scoring, nous formons les nouveaux membres des equipes, et nous optimisons en continu les processus et les outils.</p>
                  </div>

                  {/* 30-day timeline visual */}
                  <div className="mt-8 rounded-lg bg-white/5 border border-white/10 p-5">
                    <p className="text-[12px] font-semibold text-white/80 mb-5">Timeline 30 jours -- Vue d&apos;ensemble</p>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-white/10" />

                      <div className="space-y-6">
                        {[
                          {
                            semaine: "Semaine 1",
                            titre: "Definir les termes",
                            actions: ["Workshop d&apos;alignement", "Glossaire commun (MQL, SQL, Opp)", "Criteres d&apos;inclusion et d&apos;exclusion", "Signature du SLA v1"],
                            color: "#FF7A59",
                          },
                          {
                            semaine: "Semaine 2",
                            titre: "Aligner le funnel",
                            actions: ["Lifecycle stages dans HubSpot", "Lead scoring (fit + engagement)", "Workflow de handoff automatise", "Mecanisme de reject"],
                            color: "#4B5EFC",
                          },
                          {
                            semaine: "Semaine 3",
                            titre: "Outiller",
                            actions: ["Dashboard partage dans le CRM", "Alertes Slack automatiques", "Cadence de meetings (weekly + monthly)", "Formation des equipes"],
                            color: "#22C55E",
                          },
                          {
                            semaine: "Semaine 4",
                            titre: "Mesurer et iterer",
                            actions: ["Premier bilan des donnees", "Ajustement du scoring", "Template weekly review", "Premiere review officielle"],
                            color: "#6C5CE7",
                          },
                        ].map((week) => (
                          <div key={week.semaine} className="relative pl-10">
                            {/* Timeline dot */}
                            <div className="absolute left-[10px] top-1 w-[12px] h-[12px] rounded-full border-2" style={{ borderColor: week.color, backgroundColor: "#111" }}>
                              <div className="absolute inset-[3px] rounded-full" style={{ backgroundColor: week.color }} />
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[11px] font-bold" style={{ color: week.color }}>{week.semaine}</span>
                                <span className="text-[11px] text-white/50">--</span>
                                <span className="text-[11px] text-white/70 font-medium">{week.titre}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-1.5">
                                {week.actions.map((action) => (
                                  <div key={action} className="flex items-start gap-2 text-[10px] text-white/40">
                                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" style={{ color: week.color }}><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    {action}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "+40%", label: "de taux de suivi MQL en moyenne", color: "#FF7A59" },
                      { value: "-3j", label: "sur le cycle MQL-to-SQL", color: "#4B5EFC" },
                      { value: "+25%", label: "de pipeline marketing", color: "#22C55E" },
                      { value: "30j", label: "pour installer les fondations", color: "#6C5CE7" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-[20px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-[10px] text-white/40 mt-1 leading-[1.4]">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {[
                      "Diagnostic complet de l&apos;alignement existant (2-3 jours)",
                      "Workshop de co-construction avec les deux equipes",
                      "Configuration HubSpot : scoring, workflows, dashboards",
                      "Integration Slack pour les alertes automatiques",
                      "Redaction du SLA et des playbooks de qualification",
                      "Formation des equipes aux nouveaux processus",
                      "Accompagnement post-deploiement et quarterly reviews",
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
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Pret a aligner marketing et sales ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On deploie notre methode d&apos;alignement en 30 jours. Diagnostic, definitions, SLA, scoring, dashboards, feedback loops. Premiers resultats mesurables des la semaine 3.</p>
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