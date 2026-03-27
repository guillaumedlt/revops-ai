"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "SLA marketing-sales : template complet et mise en place",
  description: "Guide pratique pour creer un SLA marketing-sales : template complet, engagements reciproques, tracking dans HubSpot, reunion hebdomadaire, escalation et revision trimestrielle. Methode Ceres incluse.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-12",
  dateModified: "2026-03-12",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/sla-marketing-sales-template" },
  articleSection: "RevOps",
  wordCount: 2800,
  inLanguage: "fr",
};

const sections = [
  { id: "definition", title: "C&apos;est quoi un SLA" },
  { id: "prerequis", title: "Les prerequis" },
  { id: "engagements-marketing", title: "Engagements marketing" },
  { id: "engagements-sales", title: "Engagements sales" },
  { id: "template-complet", title: "Le template complet" },
  { id: "tracker-hubspot", title: "Tracker dans HubSpot" },
  { id: "reunion-hebdomadaire", title: "Reunion hebdomadaire" },
  { id: "non-respect", title: "Quand le SLA n&apos;est pas respecte" },
  { id: "faire-evoluer", title: "Faire evoluer le SLA" },
  { id: "template-ceres", title: "Notre template Ceres" },
];

const relatedArticles = [
  { title: "Comment aligner marketing et sales en 30 jours avec le RevOps", slug: "aligner-marketing-sales-revops", category: "RevOps", color: "#FF7A59" },
  { title: "Lead scoring : le guide complet pour qualifier vos leads B2B", slug: "lead-scoring-guide-complet", category: "Process & Outils", color: "#6C5CE7" },
  { title: "KPI commerciaux : les indicateurs de vente a suivre", slug: "kpi-commerciaux-indicateurs-vente", category: "RevOps", color: "#4B5EFC" },
];

export default function SlaMarketingSalesTemplatePage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("definition");

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
                  <a href="https://twitter.com/intent/tweet?text=SLA%20marketing-sales%20:%20template%20complet%20et%20mise%20en%20place&url=https://www.ceres-revops.com/blog/sla-marketing-sales-template" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/sla-marketing-sales-template" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">SLA marketing-sales</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>RevOps</Badge>
                <span className="text-[11px] text-[#CCC]">12 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                SLA marketing-sales : template complet et mise en place
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Le SLA marketing-sales est le document qui transforme la relation entre vos equipes de vagues promesses en engagements mesurables. Ce guide couvre tout : les prerequis, les engagements de chaque cote, un template complet pret a l&apos;emploi, le tracking dans HubSpot, la reunion hebdomadaire de suivi, et la gestion des ecarts. Methode concrete et actionnable.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>12 mars 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 -- Definition */}
              <section id="definition" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">C&apos;est quoi un SLA marketing-sales</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un SLA (Service Level Agreement) marketing-sales est un accord operationnel formel entre les equipes marketing et commerciales. Il definit les engagements reciproques de chaque equipe, les metriques utilisees pour mesurer le respect de ces engagements, et les consequences en cas de non-respect. Ce n&apos;est pas un document juridique. C&apos;est un contrat de confiance interne, signe par les responsables des deux equipes, qui rend explicite ce que chacun doit a l&apos;autre.</p>
                    <p>Le SLA repond a une question simple qui genere 90% des conflits entre marketing et sales : qui est responsable de quoi, et comment on le mesure. Sans SLA, le marketing reproche aux sales de ne pas traiter ses leads. Les sales reprochent au marketing de generer des leads non qualifies. Chacun a l&apos;impression de faire son travail pendant que l&apos;autre equipe sabote les efforts. Le SLA met fin a ce blame game en posant des chiffres sur la table.</p>
                    <p>Concretement, un SLA marketing-sales contient deux parties symetriques. La partie marketing definit combien de leads qualifies (MQL) l&apos;equipe s&apos;engage a generer chaque mois, avec quels criteres de qualite, et dans quel delai de transmission aux sales. La partie sales definit comment les commerciaux doivent traiter ces leads : delai de premier contact, nombre de tentatives de contact, obligation de renseigner un feedback, et reporting regulier.</p>
                    <p>L&apos;interet du SLA ne reside pas dans le document lui-meme, mais dans le processus qu&apos;il cree. Une fois le SLA en place, les deux equipes partagent un tableau de bord commun ou les metriques sont suivies en temps reel. Chaque semaine, un meeting de 30 minutes passe en revue le respect des engagements. Quand un ecart est detecte, il est traite immediatement, pas dans une reunion trimestrielle. Le SLA installe une discipline de collaboration qui transforme la relation marketing-sales.</p>
                    <p>Les entreprises qui ont un SLA en place voient des resultats concrets. Selon HubSpot, les equipes alignees avec un SLA generent 208% de revenus en plus via le marketing. Le taux de suivi des leads augmente de 30 a 50% des le premier mois. Les cycles de vente raccourcissent parce que les leads arrivent mieux qualifies et sont traites plus rapidement. Le SLA n&apos;est pas un luxe bureaucratique. C&apos;est un levier de revenue direct.</p>
                  </div>

                  {/* Bubble cards: Before vs After SLA */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#FFF5F3] border border-[#FF7A59]/15">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-[#FF7A59]/10 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-[#FF7A59]"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" transform="rotate(45 8 8)" /></svg>
                        </div>
                        <span className="text-[12px] font-semibold text-[#FF7A59]">Sans SLA</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          "Leads transmis sans criteres de qualite",
                          "Pas de delai de suivi defini",
                          "Blame game permanent entre equipes",
                          "Pas de donnees pour arbitrer les conflits",
                          "Revenue imprevisible",
                        ].map((item) => (
                          <div key={item} className="flex items-start gap-2 text-[10px] text-[#999]">
                            <span className="w-1 h-1 rounded-full bg-[#FF7A59]/40 mt-1.5 shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#22C55E]/15">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                        <span className="text-[12px] font-semibold text-[#22C55E]">Avec SLA</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          "Criteres MQL definis et mesures",
                          "Delai de premier contact garanti",
                          "Responsabilites claires et chiffrees",
                          "Dashboard partage, donnees en temps reel",
                          "Pipeline previsible et croissant",
                        ].map((item) => (
                          <div key={item} className="flex items-start gap-2 text-[10px] text-[#666]">
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 -- Les prerequis */}
              <section id="prerequis" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les prerequis avant de creer un SLA</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un SLA ne peut pas etre redige dans le vide. Avant de definir des engagements chiffres, trois fondations doivent etre en place. Sans elles, votre SLA sera un document theorique que personne ne respectera parce que personne ne comprendra les memes termes de la meme maniere.</p>
                    <p>La premiere fondation est un glossaire commun. Marketing et sales doivent partager exactement les memes definitions pour chaque etape du funnel. Qu&apos;est-ce qu&apos;un MQL ? Qu&apos;est-ce qu&apos;un SQL ? A quel moment un lead devient une opportunite ? Quand est-il considere comme perdu ? Ces definitions semblent evidentes, mais dans la majorite des entreprises, les deux equipes utilisent les memes mots avec des significations differentes. Le marketing appelle MQL tout contact qui remplit un formulaire. Les sales considerent qu&apos;un MQL est un prospect avec un budget confirme et un timeline. Cette divergence est la source numero un des conflits. Reunissez les deux equipes dans une salle, ecrivez les definitions ensemble, et faites signer le document par les deux responsables.</p>
                    <p>La deuxieme fondation est une baseline de donnees. Vous ne pouvez pas fixer des objectifs MQL mensuels si vous ne savez pas combien de MQLs vous generez actuellement. Vous ne pouvez pas exiger un delai de contact de 24 heures si vous ne mesurez pas le delai actuel. Avant de rediger le SLA, extrayez 3 a 6 mois de donnees historiques : volume de leads par mois, taux de conversion entre etapes, delai moyen de premier contact, taux d&apos;acceptation des MQLs par les sales, taux de conversion MQL vers SQL. Ces chiffres deviennent votre point de reference. Les objectifs du SLA seront des ameliorations incrementales par rapport a cette baseline, pas des cibles fantasmees.</p>
                    <p>La troisieme fondation est l&apos;alignement strategique. Les deux equipes doivent partager le meme objectif de revenue. Si le marketing est mesure sur le volume de leads et les sales sur le revenue signe, les incitations sont desalignees. Le SLA doit etre construit en partant de l&apos;objectif de revenue annuel, puis en remontant le funnel pour calculer combien de deals, d&apos;opportunites, de SQLs et de MQLs sont necessaires pour atteindre cet objectif. Ce calcul inverse rend les objectifs du SLA coherents et credibles.</p>
                  </div>

                  {/* Prerequis cards */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { num: "01", titre: "Glossaire commun", desc: "Definitions partagees de MQL, SQL, Opportunity, lifecycle stages. Validees et signees par les deux equipes.", color: "#FF7A59" },
                      { num: "02", titre: "Data baseline", desc: "3 a 6 mois de donnees historiques : volumes, taux de conversion, delais de traitement, taux d&apos;acceptation.", color: "#4B5EFC" },
                      { num: "03", titre: "Alignement strategique", desc: "Objectif de revenue partage. Calcul inverse : revenue cible, deals necessaires, SQLs, MQLs.", color: "#22C55E" },
                    ].map((item) => (
                      <div key={item.num} className="p-4 rounded-xl border-2 bg-white" style={{ borderColor: `${item.color}30` }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[12px] font-bold mb-3" style={{ backgroundColor: item.color }}>{item.num}</div>
                        <p className="text-[12px] font-semibold text-[#111] mb-1.5">{item.titre}</p>
                        <p className="text-[10px] text-[#777] leading-[1.6]">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reverse funnel calculation */}
                  <div className="mt-6 rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#333] mb-4">Calcul inverse : de l&apos;objectif revenue aux MQLs</p>
                    <div className="flex flex-col items-center gap-0">
                      {[
                        { etape: "Objectif revenue annuel", valeur: "1 200 000 EUR", bg: "#111", text: "white" },
                        { etape: "Panier moyen", valeur: "15 000 EUR", bg: "#333", text: "white" },
                        { etape: "Deals necessaires / an", valeur: "80 deals", bg: "#FF7A59", text: "white" },
                        { etape: "Taux Opp -> Deal (40%)", valeur: "200 opportunites", bg: "#FF7A59", text: "white" },
                        { etape: "Taux SQL -> Opp (50%)", valeur: "400 SQLs", bg: "#4B5EFC", text: "white" },
                        { etape: "Taux MQL -> SQL (35%)", valeur: "1 143 MQLs / an", bg: "#22C55E", text: "white" },
                        { etape: "Objectif MQL / mois", valeur: "~95 MQLs / mois", bg: "#22C55E", text: "white" },
                      ].map((row, i) => (
                        <div key={row.etape} className="w-full flex flex-col items-center">
                          <div className="w-full max-w-[420px] flex items-center justify-between rounded-lg px-4 py-2.5" style={{ backgroundColor: row.bg, width: `${100 - i * 5}%` }}>
                            <span className="text-[10px] font-medium" style={{ color: row.text === "white" ? "rgba(255,255,255,0.7)" : "#666" }}>{row.etape}</span>
                            <span className="text-[11px] font-bold" style={{ color: row.text }}>{row.valeur}</span>
                          </div>
                          {i < 6 && (
                            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#DDD] my-0.5" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 -- Engagements marketing */}
              <section id="engagements-marketing" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Le SLA marketing : les engagements</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La partie marketing du SLA definit ce que l&apos;equipe marketing s&apos;engage a livrer aux sales chaque mois. Ce n&apos;est pas une liste de voeux ou d&apos;intentions. Ce sont des engagements mesurables, avec des chiffres precis et des delais. Le marketing s&apos;engage sur trois axes : le volume, la qualite et le delai de transfert.</p>
                    <p>L&apos;engagement de volume est le nombre de MQLs que le marketing s&apos;engage a generer chaque mois. Ce chiffre decoule directement du calcul inverse fait a partir de l&apos;objectif de revenue. Si les sales ont besoin de 95 MQLs par mois pour atteindre leur objectif, c&apos;est le chiffre qui figure dans le SLA. Ce n&apos;est pas un objectif &ldquo;aspirationnel&rdquo;. C&apos;est un engagement ferme. Si le marketing ne livre pas le volume, les sales ne peuvent pas atteindre leur objectif de pipeline, et toute la chaine de revenue est impactee.</p>
                    <p>L&apos;engagement de qualite est tout aussi important que le volume. Generer 95 MQLs par mois ne sert a rien si 60% sont rejetes par les sales. Le SLA doit inclure un critere de qualite mesurable : par exemple, un taux d&apos;acceptation minimum de 70% par les sales, ou un score de lead scoring minimum de 50 points. Cet engagement pousse le marketing a travailler sur la precision de son ciblage et de son scoring plutot que de se concentrer uniquement sur le volume.</p>
                    <p>L&apos;engagement de transfert definit le delai maximum entre le moment ou un lead atteint le statut MQL et le moment ou il est transmis aux sales avec toutes les informations necessaires. Le SLA doit specifier que le transfert est automatique (via un workflow CRM), que la fiche contact contient un minimum d&apos;informations (source, score, historique d&apos;engagement, contexte), et que le delai de transfert ne depasse pas 2 heures. Un MQL qui traine 3 jours dans une file d&apos;attente perd toute sa valeur. La vitesse de transfert est un multiplicateur de conversion.</p>
                  </div>

                  {/* CSS Commitment cards - Marketing */}
                  <div className="mt-6 space-y-3">
                    {[
                      {
                        engagement: "Volume de MQLs",
                        metric: "95 MQLs / mois",
                        detail: "Base sur le calcul inverse du revenue target. Revu chaque trimestre en fonction des taux de conversion reels.",
                        mesure: "Comptage automatique dans HubSpot via lifecycle stage = MQL",
                        color: "#FF7A59",
                      },
                      {
                        engagement: "Qualite des MQLs",
                        metric: "Taux d&apos;acceptation > 70%",
                        detail: "Les sales marquent chaque MQL comme accepte ou rejete avec une raison. Le taux d&apos;acceptation est calcule mensuellement.",
                        mesure: "Propriete custom HubSpot : MQL_status (accepted / rejected / pending)",
                        color: "#FF7A59",
                      },
                      {
                        engagement: "Delai de transfert",
                        metric: "< 2 heures",
                        detail: "Temps entre le passage en MQL et la notification au commercial assigne. Workflow automatique, pas de transfert manuel.",
                        mesure: "Workflow HubSpot avec horodatage : MQL_timestamp vs notification_timestamp",
                        color: "#FF7A59",
                      },
                      {
                        engagement: "Contexte renseigne",
                        metric: "100% des MQLs",
                        detail: "Chaque MQL transmis doit avoir : source d&apos;acquisition, lead score, dernieres interactions (pages, emails, contenus telecharges).",
                        mesure: "Checklist de proprietes obligatoires dans le workflow de handoff",
                        color: "#FF7A59",
                      },
                    ].map((card) => (
                      <div key={card.engagement} className="rounded-xl border-2 p-4" style={{ borderColor: `${card.color}25`, backgroundColor: `${card.color}03` }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[13px] font-semibold text-[#111]">{card.engagement}</span>
                          <span className="text-[11px] font-bold px-3 py-1 rounded-md" style={{ backgroundColor: `${card.color}10`, color: card.color }}>{card.metric}</span>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.6] mb-2">{card.detail}</p>
                        <div className="flex items-start gap-1.5 text-[10px] text-[#BBB]">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5"><path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg>
                          <span>Mesure : {card.mesure}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 -- Engagements sales */}
              <section id="engagements-sales" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Le SLA sales : les engagements</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un SLA bidirectionnel impose des engagements aux deux parties. Les sales ont tendance a penser que le SLA est un outil du marketing pour les contraindre. C&apos;est l&apos;inverse. Le SLA protege les sales en garantissant la qualite des leads qu&apos;ils recoivent. En contrepartie, les sales s&apos;engagent a traiter ces leads avec la rigueur qu&apos;ils meritent. Les engagements sales portent sur quatre axes : la vitesse, la perseverance, le feedback et le reporting.</p>
                    <p>L&apos;engagement de vitesse de contact est le plus critique. Un MQL contacte dans les 5 premieres minutes a 21 fois plus de chances de se convertir qu&apos;un MQL contacte apres 30 minutes. Le SLA doit fixer un delai maximum de premier contact : typiquement, moins de 4 heures pour les MQLs standards et moins d&apos;une heure pour les MQLs chauds (demande de demo, demande de pricing). Ce delai est mesure automatiquement dans le CRM grace aux horodatages de la premiere activite loggee apres la reception du MQL.</p>
                    <p>L&apos;engagement de perseverance definit le nombre minimum de tentatives de contact avant qu&apos;un MQL puisse etre marque comme &ldquo;injoignable&rdquo;. Un commercial qui envoie un email et attend une reponse pendant une semaine avant de passer au suivant gaspille le MQL. Le SLA doit imposer un minimum de 6 tentatives de contact reparties sur 2 semaines, en combinant appel, email et LinkedIn. Chaque tentative est loggee dans le CRM pour garantir la traçabilite.</p>
                    <p>L&apos;engagement de feedback est ce qui boucle la boucle. Chaque MQL traite doit recevoir un statut final : accepte (converti en SQL), rejete (avec une raison obligatoire parmi une liste predefinee : hors cible, pas de budget, pas de besoin, timing, doublon), ou en cours. Ce feedback est la matiere premiere qui permet au marketing d&apos;ameliorer son scoring et ses campagnes. Sans ce retour, le marketing travaille en aveugle.</p>
                    <p>L&apos;engagement de reporting impose aux sales de maintenir leur CRM a jour. Pas de deals caches dans un fichier Excel. Pas d&apos;opportunites sans montant ou sans date de closing estimee. Pas de notes de reunion oubliees. Le CRM est la source de verite unique, et le SLA impose des standards de qualite de donnees que chaque commercial doit respecter.</p>
                  </div>

                  {/* CSS Commitment cards - Sales */}
                  <div className="mt-6 space-y-3">
                    {[
                      {
                        engagement: "Delai de premier contact",
                        metric: "< 4h (standard) / < 1h (chaud)",
                        detail: "Le premier contact doit etre logge dans le CRM dans le delai imparti. Appel prioritaire, email en backup si injoignable.",
                        mesure: "Difference entre MQL_timestamp et first_activity_timestamp",
                        color: "#4B5EFC",
                      },
                      {
                        engagement: "Nombre de tentatives",
                        metric: "6 tentatives minimum / 2 semaines",
                        detail: "Combinaison appel + email + LinkedIn. Chaque tentative loggee dans le CRM avec le canal utilise.",
                        mesure: "Comptage des activites loggees par contact dans la periode de suivi",
                        color: "#4B5EFC",
                      },
                      {
                        engagement: "Feedback obligatoire",
                        metric: "100% des MQLs statues sous 15 jours",
                        detail: "Chaque MQL reçoit un statut final : accepte, rejete (avec raison obligatoire parmi la liste), ou en cours. Pas de MQL sans statut apres 15 jours.",
                        mesure: "Propriete MQL_status + MQL_reject_reason dans HubSpot",
                        color: "#4B5EFC",
                      },
                      {
                        engagement: "Qualite CRM",
                        metric: "100% des deals a jour",
                        detail: "Chaque deal a un montant, une date de closing estimee, une etape correcte, et des notes de derniere interaction. Pas de donnees manquantes.",
                        mesure: "Rapport de completude CRM hebdomadaire (proprietes obligatoires remplies)",
                        color: "#4B5EFC",
                      },
                    ].map((card) => (
                      <div key={card.engagement} className="rounded-xl border-2 p-4" style={{ borderColor: `${card.color}25`, backgroundColor: `${card.color}03` }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[13px] font-semibold text-[#111]">{card.engagement}</span>
                          <span className="text-[11px] font-bold px-3 py-1 rounded-md" style={{ backgroundColor: `${card.color}10`, color: card.color }}>{card.metric}</span>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.6] mb-2">{card.detail}</p>
                        <div className="flex items-start gap-1.5 text-[10px] text-[#BBB]">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5"><path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg>
                          <span>Mesure : {card.mesure}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 -- Template complet */}
              <section id="template-complet" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Le template complet du SLA marketing-sales</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Voici le template complet que nous utilisons chez Ceres pour formaliser le SLA entre marketing et sales. Ce document est concu pour etre adapte a votre contexte : les chiffres sont des exemples, les sections sont toutes necessaires. Copiez-le, remplissez-le avec vos donnees, et faites-le valider par les deux equipes.</p>
                  </div>

                  {/* CSS Document Mockup */}
                  <div className="mt-6 rounded-xl border border-[#E0E0E0] overflow-hidden shadow-[0_8px_30px_-10px_rgba(0,0,0,0.1)]">
                    {/* Document header bar */}
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                        <span className="text-[12px] font-semibold text-white">SLA Marketing-Sales -- [Votre Entreprise]</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/40">v1.0 -- Q1 2026</span>
                      </div>
                    </div>

                    <div className="bg-white p-6 md:p-8">
                      {/* Document title */}
                      <div className="text-center mb-8 pb-6 border-b border-[#F0F0F0]">
                        <p className="text-[9px] text-[#BBB] uppercase tracking-[0.2em] mb-2">Service Level Agreement</p>
                        <h3 className="text-[18px] font-bold text-[#111] mb-1">SLA Marketing-Sales</h3>
                        <p className="text-[11px] text-[#999]">[Nom de l&apos;entreprise] -- Valable du [date debut] au [date fin]</p>
                      </div>

                      {/* Section 1: Objectifs */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold text-[#FF7A59] bg-[#FF7A59]/10 px-2 py-0.5 rounded">SECTION 1</span>
                          <span className="text-[13px] font-semibold text-[#111]">Objectifs partages</span>
                        </div>
                        <div className="pl-4 border-l-2 border-[#F0F0F0] space-y-2 text-[11px] text-[#666] leading-[1.7]">
                          <p>Objectif de revenue annuel : __________ EUR</p>
                          <p>Nombre de deals necessaires : __________ / an</p>
                          <p>Pipeline cible marketing : __________ EUR / trimestre</p>
                          <p>Taux de conversion cible MQL vers Client : __________ %</p>
                        </div>
                      </div>

                      {/* Section 2: Definitions */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold text-[#FF7A59] bg-[#FF7A59]/10 px-2 py-0.5 rounded">SECTION 2</span>
                          <span className="text-[13px] font-semibold text-[#111]">Definitions communes</span>
                        </div>
                        <div className="pl-4 border-l-2 border-[#F0F0F0] space-y-3">
                          {[
                            { terme: "Lead", def: "Contact identifie ayant rempli un formulaire ou interagi avec un contenu. Pas encore qualifie." },
                            { terme: "MQL", def: "Marketing Qualified Lead. Lead atteignant un score de [X] points ET correspondant a l&apos;ICP defini." },
                            { terme: "SQL", def: "Sales Qualified Lead. MQL valide par les sales apres un premier contact. Besoin confirme." },
                            { terme: "Opportunity", def: "SQL avec un montant estime, un timeline, et un decision-maker identifie. Dans le pipeline." },
                          ].map((item) => (
                            <div key={item.terme}>
                              <span className="text-[11px] font-semibold text-[#333]">{item.terme} : </span>
                              <span className="text-[11px] text-[#666]">{item.def}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 3: Engagements marketing */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold text-[#FF7A59] bg-[#FF7A59]/10 px-2 py-0.5 rounded">SECTION 3</span>
                          <span className="text-[13px] font-semibold text-[#111]">Engagements Marketing</span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-[10px]">
                            <thead>
                              <tr className="border-b border-[#F0F0F0]">
                                <th className="text-left py-2 pr-3 text-[#999] font-semibold">Engagement</th>
                                <th className="text-left py-2 pr-3 text-[#999] font-semibold">Cible</th>
                                <th className="text-left py-2 text-[#999] font-semibold">Mesure</th>
                              </tr>
                            </thead>
                            <tbody className="text-[#666]">
                              {[
                                { eng: "Volume MQLs / mois", cible: "_____ MQLs", mesure: "Lifecycle stage HubSpot" },
                                { eng: "Taux d&apos;acceptation", cible: "> _____% ", mesure: "MQL_status property" },
                                { eng: "Delai de transfert", cible: "< _____ heures", mesure: "Workflow timestamps" },
                                { eng: "Contexte renseigne", cible: "100%", mesure: "Checklist proprietes" },
                                { eng: "Score minimum", cible: "> _____ pts", mesure: "HubSpot lead score" },
                              ].map((row) => (
                                <tr key={row.eng} className="border-b border-[#F8F8F8]">
                                  <td className="py-2 pr-3 font-medium text-[#333]">{row.eng}</td>
                                  <td className="py-2 pr-3">{row.cible}</td>
                                  <td className="py-2">{row.mesure}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Section 4: Engagements sales */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold text-[#4B5EFC] bg-[#4B5EFC]/10 px-2 py-0.5 rounded">SECTION 4</span>
                          <span className="text-[13px] font-semibold text-[#111]">Engagements Sales</span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-[10px]">
                            <thead>
                              <tr className="border-b border-[#F0F0F0]">
                                <th className="text-left py-2 pr-3 text-[#999] font-semibold">Engagement</th>
                                <th className="text-left py-2 pr-3 text-[#999] font-semibold">Cible</th>
                                <th className="text-left py-2 text-[#999] font-semibold">Mesure</th>
                              </tr>
                            </thead>
                            <tbody className="text-[#666]">
                              {[
                                { eng: "Premier contact (standard)", cible: "< _____ heures", mesure: "First activity timestamp" },
                                { eng: "Premier contact (chaud)", cible: "< _____ heure", mesure: "First activity timestamp" },
                                { eng: "Tentatives minimum", cible: "_____ tentatives / 2 sem.", mesure: "Activity count / contact" },
                                { eng: "Feedback MQL", cible: "100% sous 15 jours", mesure: "MQL_status + reason" },
                                { eng: "Qualite CRM", cible: "100% proprietes remplies", mesure: "Rapport completude" },
                              ].map((row) => (
                                <tr key={row.eng} className="border-b border-[#F8F8F8]">
                                  <td className="py-2 pr-3 font-medium text-[#333]">{row.eng}</td>
                                  <td className="py-2 pr-3">{row.cible}</td>
                                  <td className="py-2">{row.mesure}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Section 5: KPIs */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded">SECTION 5</span>
                          <span className="text-[13px] font-semibold text-[#111]">KPIs de suivi</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pl-4 border-l-2 border-[#F0F0F0]">
                          {[
                            "Taux de conversion MQL vers SQL",
                            "Taux de conversion SQL vers Opportunity",
                            "Pipeline genere par le marketing (EUR)",
                            "Delai moyen MQL vers premier contact",
                            "Taux d&apos;acceptation des MQLs",
                            "Revenue influence par le marketing",
                          ].map((kpi) => (
                            <div key={kpi} className="flex items-start gap-1.5 text-[10px] text-[#666]">
                              <span className="w-1 h-1 rounded-full bg-[#22C55E] mt-1.5 shrink-0" />
                              {kpi}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 6: Revisions */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold text-[#6C5CE7] bg-[#6C5CE7]/10 px-2 py-0.5 rounded">SECTION 6</span>
                          <span className="text-[13px] font-semibold text-[#111]">Cadence de revision</span>
                        </div>
                        <div className="pl-4 border-l-2 border-[#F0F0F0] space-y-2 text-[11px] text-[#666] leading-[1.7]">
                          <p>Review hebdomadaire : 30 min, chaque [jour], [heure]</p>
                          <p>Review mensuelle : 60 min, premier [jour] du mois</p>
                          <p>Revision trimestrielle : SLA complet revu et ajuste</p>
                          <p>Clause d&apos;urgence : revision immediate si un engagement n&apos;est pas atteint 2 mois consecutifs</p>
                        </div>
                      </div>

                      {/* Signatures */}
                      <div className="pt-6 border-t border-[#F0F0F0]">
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <p className="text-[10px] text-[#BBB] mb-4">Responsable Marketing</p>
                            <div className="border-b border-[#E8E8E8] pb-1 mb-1">
                              <span className="text-[10px] text-[#DDD]">Signature : _______________</span>
                            </div>
                            <span className="text-[9px] text-[#DDD]">Date : ___/___/______</span>
                          </div>
                          <div>
                            <p className="text-[10px] text-[#BBB] mb-4">Responsable Sales</p>
                            <div className="border-b border-[#E8E8E8] pb-1 mb-1">
                              <span className="text-[10px] text-[#DDD]">Signature : _______________</span>
                            </div>
                            <span className="text-[9px] text-[#DDD]">Date : ___/___/______</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 -- Tracker dans HubSpot */}
              <section id="tracker-hubspot" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Comment tracker le SLA dans HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un SLA sans tracking est un document qui finit dans un tiroir. Tout l&apos;interet du SLA est d&apos;etre mesure en temps reel, avec des dashboards visibles par les deux equipes et des alertes automatiques quand un engagement n&apos;est pas respecte. HubSpot offre tous les outils necessaires pour tracker un SLA marketing-sales sans aucun developpement custom.</p>
                    <p>La premiere etape est de creer les proprietes custom necessaires dans HubSpot. Vous avez besoin de trois proprietes sur l&apos;objet Contact : MQL_timestamp (date/heure du passage en MQL), MQL_status (dropdown : pending, accepted, rejected), et MQL_reject_reason (dropdown : hors cible, pas de budget, pas de besoin, mauvais timing, doublon, autre). Ces proprietes sont remplies automatiquement par des workflows ou manuellement par les sales lors du traitement des MQLs.</p>
                    <p>La deuxieme etape est de configurer les workflows d&apos;automatisation. Le workflow principal se declenche quand un contact atteint le statut MQL. Il enregistre le timestamp, assigne le contact au commercial responsable (via round-robin ou territoire), envoie une notification Slack avec le contexte complet (nom, entreprise, score, source, dernieres interactions), et cree une tache dans le CRM avec un delai de 4 heures. Un deuxieme workflow surveille les MQLs non contactes : si aucune activite n&apos;est loggee dans les 4 heures, une alerte est envoyee au manager commercial.</p>
                    <p>La troisieme etape est de construire le dashboard SLA. Ce dashboard est partage entre les deux equipes et visible par tous. Il contient les metriques cles du SLA : volume de MQLs generes vs objectif, taux d&apos;acceptation des MQLs, delai moyen de premier contact, nombre de MQLs en attente de feedback, pipeline genere par les leads marketing. Chaque metrique est accompagnee de sa cible SLA pour que l&apos;ecart soit immediatement visible.</p>
                  </div>

                  {/* CSS Dashboard Mockup */}
                  <div className="mt-8 rounded-xl border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                        <span className="text-[12px] font-semibold text-white">SLA Tracking Dashboard -- Mars 2026</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#22C55E]/20 text-[#22C55E] font-medium">7/8 engagements respectes</span>
                      </div>
                    </div>
                    <div className="bg-white p-5">
                      {/* KPI Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                        {[
                          { label: "MQLs generes", value: "102", target: "95", status: "ok" },
                          { label: "Taux acceptation", value: "74%", target: "70%", status: "ok" },
                          { label: "Delai moyen contact", value: "3.2h", target: "< 4h", status: "ok" },
                          { label: "Feedback renseigne", value: "91%", target: "100%", status: "warning" },
                        ].map((kpi) => (
                          <div key={kpi.label} className="p-3 rounded-xl border border-[#F0F0F0]">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[9px] text-[#BBB]">{kpi.label}</span>
                              <div className={`w-2 h-2 rounded-full ${kpi.status === "ok" ? "bg-[#22C55E]" : "bg-[#F59E0B]"}`} />
                            </div>
                            <p className="text-[16px] font-bold text-[#111]">{kpi.value}</p>
                            <p className="text-[9px] text-[#CCC] mt-0.5">Cible : {kpi.target}</p>
                          </div>
                        ))}
                      </div>

                      {/* Two columns: Marketing vs Sales */}
                      <div className="grid grid-cols-2 gap-4 mb-5">
                        <div className="p-4 rounded-xl border border-[#F0F0F0]">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-semibold text-[#FF7A59]">Marketing SLA</span>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-[#22C55E]/10 text-[#22C55E] font-medium">4/4</span>
                          </div>
                          <div className="space-y-2.5">
                            {[
                              { metric: "Volume MQLs", actual: "102 / 95", ok: true },
                              { metric: "Taux acceptation", actual: "74% / 70%", ok: true },
                              { metric: "Delai transfert", actual: "1.1h / 2h", ok: true },
                              { metric: "Contexte renseigne", actual: "97% / 100%", ok: true },
                            ].map((item) => (
                              <div key={item.metric} className="flex items-center justify-between">
                                <span className="text-[10px] text-[#666]">{item.metric}</span>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-medium text-[#333]">{item.actual}</span>
                                  <div className={`w-1.5 h-1.5 rounded-full ${item.ok ? "bg-[#22C55E]" : "bg-[#F59E0B]"}`} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 rounded-xl border border-[#F0F0F0]">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-semibold text-[#4B5EFC]">Sales SLA</span>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-[#F59E0B]/10 text-[#F59E0B] font-medium">3/4</span>
                          </div>
                          <div className="space-y-2.5">
                            {[
                              { metric: "Contact < 4h", actual: "88% / 85%", ok: true },
                              { metric: "6 tentatives", actual: "82% / 80%", ok: true },
                              { metric: "Feedback MQL", actual: "91% / 100%", ok: false },
                              { metric: "CRM a jour", actual: "95% / 100%", ok: true },
                            ].map((item) => (
                              <div key={item.metric} className="flex items-center justify-between">
                                <span className="text-[10px] text-[#666]">{item.metric}</span>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-medium text-[#333]">{item.actual}</span>
                                  <div className={`w-1.5 h-1.5 rounded-full ${item.ok ? "bg-[#22C55E]" : "bg-[#F59E0B]"}`} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* SLA Trend bars */}
                      <div className="rounded-lg border border-[#F0F0F0] p-4">
                        <p className="text-[10px] text-[#999] mb-3">Evolution du respect SLA -- 6 derniers mois</p>
                        <div className="flex items-end gap-2 h-16">
                          {[
                            { month: "Oct", pct: 50 },
                            { month: "Nov", pct: 58 },
                            { month: "Dec", pct: 65 },
                            { month: "Jan", pct: 72 },
                            { month: "Fev", pct: 81 },
                            { month: "Mar", pct: 88 },
                          ].map((item) => (
                            <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                              <span className="text-[8px] font-medium" style={{ color: item.pct >= 75 ? "#22C55E" : item.pct >= 60 ? "#F59E0B" : "#FF7A59" }}>{item.pct}%</span>
                              <div className="w-full rounded-t-sm" style={{ height: `${item.pct * 0.55}px`, backgroundColor: item.pct >= 75 ? "#22C55E" : item.pct >= 60 ? "#F59E0B" : "#FF7A59" }} />
                              <span className="text-[8px] text-[#BBB]">{item.month}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Workflows list */}
                  <div className="mt-6 rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#333] mb-4">Les 4 workflows HubSpot essentiels</p>
                    <div className="space-y-3">
                      {[
                        { nom: "MQL Handoff", trigger: "Lifecycle stage = MQL", actions: "Enregistrer timestamp, assigner commercial, notification Slack, creer tache (delai 4h)", color: "#FF7A59" },
                        { nom: "MQL Overdue Alert", trigger: "MQL sans activite depuis 4h", actions: "Alerte manager commercial par email et Slack, escalade si 24h sans contact", color: "#F59E0B" },
                        { nom: "MQL Feedback Reminder", trigger: "MQL sans statut apres 10 jours", actions: "Rappel au commercial, notification manager si 15 jours sans feedback", color: "#4B5EFC" },
                        { nom: "SLA Weekly Report", trigger: "Chaque lundi a 8h", actions: "Generer le rapport SLA de la semaine, envoyer par email aux 2 managers, poster dans Slack", color: "#22C55E" },
                      ].map((wf) => (
                        <div key={wf.nom} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#E8E8E8]">
                          <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: wf.color }} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] font-semibold text-[#333]">{wf.nom}</span>
                              <span className="text-[9px] text-[#BBB]">Trigger : {wf.trigger}</span>
                            </div>
                            <p className="text-[10px] text-[#777] leading-[1.5]">{wf.actions}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 -- Reunion hebdomadaire */}
              <section id="reunion-hebdomadaire" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">La reunion SLA hebdomadaire</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le SLA ne fonctionne que s&apos;il est suivi regulierement. La reunion hebdomadaire est le rituel qui maintient la pression positive et empeche les petits ecarts de devenir des problemes structurels. C&apos;est un meeting de 30 minutes, chaque semaine, toujours le meme jour et la meme heure, qui ne saute jamais. C&apos;est la que les deux equipes regardent les chiffres ensemble, identifient les ecarts, et decidement des actions correctives immediates.</p>
                    <p>Le format est simple et immuable. Les 10 premieres minutes sont consacrees a la revue des chiffres de la semaine : combien de MQLs generes, combien traites, quel delai moyen de contact, quel taux d&apos;acceptation. Les 10 minutes suivantes sont dediees au feedback qualitatif des sales : quels leads etaient bons, lesquels n&apos;auraient pas du etre transmis, quels patterns emergent. Les 10 dernieres minutes servent a definir les actions pour la semaine suivante.</p>
                    <p>La reunion doit avoir un format strict pour eviter de deriver en session de plaintes. Pas de discussions strategiques (c&apos;est pour le meeting mensuel). Pas de reproches personnels (on discute des processus, pas des personnes). Pas de deraillement sur des sujets annexes (un parking lot pour les sujets hors scope). Le responsable de la reunion tourne chaque semaine entre marketing et sales pour eviter le sentiment qu&apos;une equipe domine l&apos;autre.</p>
                    <p>Les participants obligatoires sont : le responsable marketing (ou le demand gen manager), le responsable commercial (ou le sales manager), et idealement un representant RevOps ou operations qui facilite et prend les notes. Les commerciaux individuels ne participent pas a ce meeting (sauf invitation ponctuelle pour un feedback specifique). Le compte-rendu est partage dans un canal Slack dedie dans l&apos;heure qui suit.</p>
                  </div>

                  {/* Meeting agenda mockup */}
                  <div className="mt-6 rounded-xl border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#4B5EFC]" />
                        <span className="text-[12px] font-semibold text-white">SLA Weekly Review -- Agenda type</span>
                      </div>
                      <span className="text-[10px] text-white/40">30 min / chaque mardi 9h30</span>
                    </div>
                    <div className="bg-white p-5">
                      <div className="space-y-4">
                        {[
                          {
                            duree: "0-10 min",
                            titre: "Revue des chiffres",
                            items: ["MQLs generes vs objectif SLA", "Taux d&apos;acceptation de la semaine", "Delai moyen de premier contact", "MQLs en attente de feedback"],
                            color: "#FF7A59",
                            responsable: "Marketing",
                          },
                          {
                            duree: "10-20 min",
                            titre: "Feedback qualitatif",
                            items: ["Qualite des MQLs reçus cette semaine", "Leads remarquables (bons ou mauvais)", "Patterns identifies (source, scoring, secteur)", "Suggestions d&apos;ajustement du scoring"],
                            color: "#4B5EFC",
                            responsable: "Sales",
                          },
                          {
                            duree: "20-30 min",
                            titre: "Actions correctives",
                            items: ["Ecarts SLA identifies et root causes", "Actions pour la semaine suivante (owner + deadline)", "Points a escalader au meeting mensuel", "Tour de table : un mot chacun"],
                            color: "#22C55E",
                            responsable: "RevOps / alternance",
                          },
                        ].map((block) => (
                          <div key={block.duree} className="flex gap-4">
                            <div className="w-20 shrink-0 text-right">
                              <span className="text-[10px] font-bold" style={{ color: block.color }}>{block.duree}</span>
                              <p className="text-[9px] text-[#CCC] mt-0.5">{block.responsable}</p>
                            </div>
                            <div className="flex-1 pl-4 border-l-2" style={{ borderColor: `${block.color}30` }}>
                              <p className="text-[12px] font-semibold text-[#111] mb-2">{block.titre}</p>
                              <div className="space-y-1.5">
                                {block.items.map((item) => (
                                  <div key={item} className="flex items-start gap-2 text-[10px] text-[#777]">
                                    <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: block.color }} />
                                    {item}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Attendees */}
                      <div className="mt-5 pt-4 border-t border-[#F0F0F0]">
                        <p className="text-[10px] text-[#999] mb-2">Participants obligatoires</p>
                        <div className="flex items-center gap-3">
                          {[
                            { role: "Head of Marketing", initials: "HM", color: "#FF7A59" },
                            { role: "Sales Manager", initials: "SM", color: "#4B5EFC" },
                            { role: "RevOps", initials: "RO", color: "#22C55E" },
                          ].map((person) => (
                            <div key={person.role} className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold" style={{ backgroundColor: person.color }}>{person.initials}</div>
                              <span className="text-[10px] text-[#666]">{person.role}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 -- Quand le SLA n'est pas respecte */}
              <section id="non-respect" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Que faire quand le SLA n&apos;est pas respecte</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un SLA sera transgresse. C&apos;est inevitable et c&apos;est normal. L&apos;important n&apos;est pas d&apos;atteindre une perfection permanente, mais d&apos;avoir un processus clair pour gerer les ecarts quand ils surviennent. Le pire scenario n&apos;est pas un SLA non respecte, c&apos;est un SLA non respecte dont personne ne parle. Le processus de gestion des ecarts est aussi important que le SLA lui-meme.</p>
                    <p>La premiere etape est la detection, qui doit etre automatique. Les workflows HubSpot et le dashboard SLA doivent rendre les ecarts visibles en temps reel. Pas besoin d&apos;attendre la reunion hebdomadaire pour savoir qu&apos;un commercial n&apos;a pas contacte un MQL depuis 48 heures, ou que le marketing n&apos;a genere que 60 MQLs alors qu&apos;on est au 25 du mois. Les alertes automatiques permettent une reaction rapide.</p>
                    <p>La deuxieme etape est le diagnostic de la root cause. Un ecart ponctuel et un ecart structurel ne se traitent pas de la meme maniere. Si un commercial est en retard sur ses contacts parce qu&apos;il etait malade, ce n&apos;est pas un probleme de processus. Si le taux d&apos;acceptation des MQLs chute regulierement sous les 70%, c&apos;est probablement un probleme de scoring ou de ciblage qui necessite une analyse approfondie. La reunion hebdomadaire est le bon moment pour distinguer les incidents des tendances.</p>
                    <p>La troisieme etape est l&apos;escalade. Si un engagement SLA n&apos;est pas respecte pendant deux mois consecutifs, il faut escalader au niveau de la direction. Le SLA n&apos;est pas un document que les equipes peuvent silencieusement ignorer. L&apos;escalade ne vise pas a punir, mais a obtenir les ressources ou les decisions necessaires pour resoudre le probleme. Peut-etre que le marketing a besoin de plus de budget publicitaire. Peut-etre que les sales ont besoin d&apos;un SDR supplementaire. L&apos;escalade met le sujet sur la table au bon niveau.</p>
                    <p>La quatrieme etape est l&apos;ajustement. Un SLA qui n&apos;est jamais atteint n&apos;est pas un SLA ambitieux, c&apos;est un SLA mal calibre. Si les objectifs sont systematiquement inatteignables malgre des efforts reels, il faut les revoir. L&apos;objectif du SLA n&apos;est pas de creer de la frustration, c&apos;est de creer une dynamique d&apos;amelioration continue. Des objectifs legerement au-dessus de la performance actuelle tirent les equipes vers le haut. Des objectifs irrealistes les decouragent.</p>
                  </div>

                  {/* Escalation process */}
                  <div className="mt-6 space-y-3">
                    {[
                      { niveau: "Niveau 1", titre: "Detection automatique", desc: "Alertes HubSpot et Slack des qu&apos;un engagement est en risque. Reaction en temps reel, pas d&apos;attente.", duree: "Immediat", color: "#22C55E" },
                      { niveau: "Niveau 2", titre: "Discussion en weekly review", desc: "L&apos;ecart est discute dans la reunion hebdomadaire. Root cause identifiee, action corrective definie avec un owner et une deadline.", duree: "Sous 7 jours", color: "#F59E0B" },
                      { niveau: "Niveau 3", titre: "Escalade management", desc: "Si l&apos;engagement n&apos;est pas respecte 2 mois de suite, escalade au directeur marketing et au directeur commercial. Decision sur les ressources.", duree: "Sous 60 jours", color: "#FF7A59" },
                      { niveau: "Niveau 4", titre: "Revision du SLA", desc: "Si malgre les actions correctives et les ressources supplementaires, l&apos;objectif reste inatteignable, revision formelle du SLA.", duree: "Trimestriel", color: "#6C5CE7" },
                    ].map((level) => (
                      <div key={level.niveau} className="flex items-start gap-4 p-4 rounded-xl border border-[#F0F0F0]">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${level.color}15` }}>
                          <span className="text-[10px] font-bold" style={{ color: level.color }}>{level.niveau.split(" ")[1]}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] font-semibold text-[#111]">{level.titre}</span>
                            <span className="text-[9px] px-2 py-0.5 rounded font-medium" style={{ backgroundColor: `${level.color}10`, color: level.color }}>{level.duree}</span>
                          </div>
                          <p className="text-[11px] text-[#777] leading-[1.6]">{level.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 -- Faire evoluer le SLA */}
              <section id="faire-evoluer" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Faire evoluer le SLA dans le temps</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un SLA n&apos;est pas un document fige. Il evolue avec votre entreprise, votre marche et votre maturite. Le SLA v1, celui que vous signez au demarrage, sera tres different du SLA v4 que vous utiliserez un an plus tard. Et c&apos;est parfaitement normal. Un SLA qui ne change jamais est un SLA qui ne sert plus, parce que le contexte a change autour de lui.</p>
                    <p>La revision trimestrielle est le mecanisme formel d&apos;evolution du SLA. Chaque trimestre, les deux equipes se retrouvent pour une session de 2 heures. L&apos;objectif est triple : evaluer la performance du trimestre echoue par rapport aux engagements, identifier ce qui a fonctionne et ce qui doit changer, et definir les nouveaux objectifs pour le trimestre a venir.</p>
                    <p>La recalibration des objectifs se fait en fonction des donnees reelles, pas des intuitions. Si le marketing a regulierement depasse son objectif de 95 MQLs par mois (par exemple, 110 en moyenne), il est temps de monter l&apos;objectif a 115. Si le taux d&apos;acceptation stagne a 68% malgre des efforts sur le scoring, il faut peut-etre revoir la definition du MQL plutot que de maintenir un objectif de 70% qui genere de la frustration. La recalibration est un equilibre entre ambition et realisme.</p>
                    <p>Les definitions doivent aussi evoluer. Au fur et a mesure que votre equipe gagne en maturite, les criteres de qualification deviennent plus fins. Le MQL de la v1 du SLA etait peut-etre simplement &ldquo;un contact qui telecharge un livre blanc et qui est dans l&apos;ICP&rdquo;. Le MQL de la v4 integre un modele de scoring plus sophistique avec des scores de fit et d&apos;engagement separes, du negative scoring, et des criteres d&apos;exclusion plus precis. L&apos;evolution du SLA reflète l&apos;evolution de votre intelligence commerciale.</p>
                    <p>Ajoutez de nouveaux engagements au fil du temps. Le SLA v1 couvre les fondamentaux (volume, qualite, delais). Les versions suivantes peuvent integrer des engagements plus avances : taux de conversion MQL vers Opportunity, pipeline influence par le marketing en euros, temps moyen du cycle de vente pour les leads marketing vs outbound, Net Promoter Score des sales sur la qualite des leads. Chaque nouvelle metrique rend le SLA plus precis et plus utile.</p>
                  </div>

                  {/* SLA Evolution timeline */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { version: "v1.0", trimestre: "Q1", focus: "Fondamentaux", items: ["Volume MQL mensuel", "Delai de premier contact", "Feedback obligatoire", "Definitions communes"], color: "#FF7A59" },
                      { version: "v2.0", trimestre: "Q2", focus: "Qualite", items: ["Taux d&apos;acceptation MQL", "Score minimum ajuste", "Raisons de rejet codifiees", "Dashboard SLA partage"], color: "#4B5EFC" },
                      { version: "v3.0", trimestre: "Q3", focus: "Performance", items: ["Pipeline marketing (EUR)", "Taux MQL vers Opportunity", "Cycle moyen marketing leads", "Alertes proactives"], color: "#22C55E" },
                      { version: "v4.0", trimestre: "Q4", focus: "Excellence", items: ["Predictive scoring integre", "Revenue attribution marketing", "NPS sales sur leads", "SLA auto-ajuste par l&apos;IA"], color: "#6C5CE7" },
                    ].map((v) => (
                      <div key={v.version} className="p-4 rounded-xl bg-[#FAFAFA] border border-[#F0F0F0]">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[11px] font-bold" style={{ color: v.color }}>{v.version}</span>
                          <span className="text-[9px] text-[#CCC]">{v.trimestre}</span>
                        </div>
                        <p className="text-[11px] font-semibold text-[#333] mb-2">{v.focus}</p>
                        <div className="space-y-1.5">
                          {v.items.map((item) => (
                            <div key={item} className="flex items-start gap-1.5 text-[10px] text-[#777]">
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" style={{ color: v.color }}><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 -- Notre template chez Ceres (dark section) */}
              <section id="template-ceres" className="mb-8">
                <div className="rounded-2xl bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Notre methode</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Notre template SLA chez Ceres</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Chez Ceres, le SLA marketing-sales est la premiere brique que nous mettons en place dans chaque mission RevOps. Nous avons affine notre template au fil de dizaines de deployements chez des PME et ETI B2B. Ce template n&apos;est pas un document generique. Il est adapte a chaque contexte, calibre sur des donnees reelles, et concu pour produire des resultats mesurables des le premier mois.</p>
                    <p>Notre approche se distingue sur trois points. Premierement, nous ne redigeons jamais un SLA dans une tour d&apos;ivoire. Nous organisons un workshop de co-construction avec les deux equipes, ou chaque engagement est discute, challenge et valide par les personnes qui devront le respecter. Un SLA impose par le management sans concertation ne tient pas. Un SLA co-construit est respecte parce que chacun l&apos;a valide.</p>
                    <p>Deuxiemement, nous deployon le SLA dans HubSpot en parallele. Les proprietes custom, les workflows, les dashboards et les alertes sont configures pendant que le document est redige. Le jour ou le SLA est signe, tout le tracking est deja operationnel. Pas de decalage entre la signature et la mise en production. Le SLA est vivant des le jour 1.</p>
                    <p>Troisiemement, nous accompagnons l&apos;evolution. Nous participons aux 4 premieres weekly reviews pour coacher les equipes sur le format et s&apos;assurer que le rituel s&apos;installe. Nous facilitons la premiere quarterly review et la premiere revision du SLA. Nous restons disponibles pour des ajustements de scoring ou de workflows quand les donnees revelent des optimisations possibles.</p>
                  </div>

                  {/* Timeline */}
                  <div className="mt-8 rounded-xl bg-white/5 border border-white/10 p-5">
                    <p className="text-[12px] font-semibold text-white/80 mb-5">Timeline de deploiement SLA</p>
                    <div className="relative">
                      <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-white/10" />
                      <div className="space-y-6">
                        {[
                          {
                            phase: "Semaine 1",
                            titre: "Diagnostic et donnees",
                            actions: ["Audit de la situation actuelle (processus, outils, donnees)", "Extraction de la baseline (3-6 mois de metriques)", "Identification des gaps et des quick wins", "Preparation du workshop"],
                            color: "#FF7A59",
                          },
                          {
                            phase: "Semaine 2",
                            titre: "Co-construction du SLA",
                            actions: ["Workshop avec marketing et sales (3h)", "Redaction du glossaire commun", "Definition des engagements et des cibles", "Validation et signature du SLA v1"],
                            color: "#4B5EFC",
                          },
                          {
                            phase: "Semaine 3",
                            titre: "Implementation technique",
                            actions: ["Creation des proprietes custom HubSpot", "Configuration des 4 workflows essentiels", "Construction du dashboard SLA", "Test de bout en bout"],
                            color: "#22C55E",
                          },
                          {
                            phase: "Semaine 4",
                            titre: "Lancement et coaching",
                            actions: ["Formation des equipes aux nouveaux processus", "Premiere weekly review (coachere par Ceres)", "Ajustements en temps reel", "Bilan de la premiere semaine en production"],
                            color: "#6C5CE7",
                          },
                        ].map((week) => (
                          <div key={week.phase} className="relative pl-10">
                            <div className="absolute left-[10px] top-1 w-[12px] h-[12px] rounded-full border-2" style={{ borderColor: week.color, backgroundColor: "#111" }}>
                              <div className="absolute inset-[3px] rounded-full" style={{ backgroundColor: week.color }} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[11px] font-bold" style={{ color: week.color }}>{week.phase}</span>
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
                      { value: "4 sem.", label: "pour un SLA operationnel", color: "#FF7A59" },
                      { value: "+35%", label: "de taux de suivi MQL", color: "#4B5EFC" },
                      { value: "-2j", label: "sur le cycle MQL vers SQL", color: "#22C55E" },
                      { value: "88%", label: "de respect SLA au mois 3", color: "#6C5CE7" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[20px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-[10px] text-white/40 mt-1 leading-[1.4]">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {[
                      "Diagnostic complet de l&apos;alignement marketing-sales existant",
                      "Workshop de co-construction du SLA avec les deux equipes",
                      "Configuration HubSpot : proprietes, workflows, dashboards, alertes",
                      "Template SLA complet adapte a votre contexte",
                      "Coaching des 4 premieres weekly reviews",
                      "Facilitation de la premiere quarterly review",
                      "Support continu pour les ajustements de scoring et workflows",
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
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-7 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
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
                <div className="rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 md:p-10 text-center">
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Pret a mettre en place votre SLA ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On deploie votre SLA marketing-sales en 4 semaines. Diagnostic, co-construction, implementation HubSpot, coaching. Premiers resultats mesurables des le mois 1.</p>
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