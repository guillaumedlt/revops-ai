"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Data quality CRM : audit et nettoyage en 5 etapes",
  description: "Guide complet pour auditer, nettoyer et maintenir la qualite des donnees de votre CRM. Checklist en 50 points, processus de deduplication, standardisation, enrichissement et automatisation de la maintenance. Avec des exemples concrets sur HubSpot.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-08",
  dateModified: "2026-03-08",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/data-quality-crm-audit-nettoyage" },
  articleSection: "Data & Reporting",
  wordCount: 2800,
  inLanguage: "fr",
};

const sections = [
  { id: "cout-donnees-sales", title: "Le cout des donnees sales" },
  { id: "dimensions-qualite", title: "Les 5 dimensions" },
  { id: "etape-audit", title: "Etape 1 : Auditer" },
  { id: "etape-dedup", title: "Etape 2 : Dedupliquer" },
  { id: "etape-standardiser", title: "Etape 3 : Standardiser" },
  { id: "etape-enrichir", title: "Etape 4 : Enrichir" },
  { id: "etape-automatiser", title: "Etape 5 : Automatiser" },
  { id: "checklist", title: "Checklist 50 points" },
  { id: "outils", title: "Les outils" },
  { id: "audit-ceres", title: "Notre audit Ceres" },
];

const relatedArticles = [
  { title: "9 actions commerciales que vous devriez automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "Automatisation", color: "#FF7A59" },
  { title: "Comparatif outils de generation de leads et enrichissement B2B", slug: "comparatif-outils-generation-leads-enrichissement", category: "Process & Outils", color: "#6C5CE7" },
  { title: "Marketing Automation : 7 workflows HubSpot indispensables", slug: "marketing-automation-7-workflows-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function DataQualityCrmArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("cout-donnees-sales");
  const [openChecklist, setOpenChecklist] = useState<string | null>(null);

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
        <div className="h-full bg-[#22C55E] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "5%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "15%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "30%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "45%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "60%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "75%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "88%", width: 240, height: 240, borderRadius: "50%", background: "#22C55E", opacity: 0.06, filter: "blur(70px)" }} />

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
                        ? "border-[#22C55E] text-[#111] font-medium"
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
                  <a href="https://twitter.com/intent/tweet?text=Data%20quality%20CRM%20%3A%20audit%20et%20nettoyage%20en%205%20etapes&url=https://www.ceres-revops.com/blog/data-quality-crm-audit-nettoyage" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/data-quality-crm-audit-nettoyage" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Data quality CRM</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>Data &amp; Reporting</Badge>
                <span className="text-[11px] text-[#CCC]">13 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Data quality CRM : audit et nettoyage en 5 etapes
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Votre CRM contient des milliers de contacts. Mais combien sont reellement exploitables ? Doublons, champs vides, formats incoherents, donnees obsoletes : la qualite des donnees est le probleme silencieux qui sabote vos campagnes marketing, fausse vos reportings et fait perdre du temps a vos commerciaux. Ce guide vous donne un processus complet en 5 etapes pour auditer, nettoyer et maintenir votre base CRM. Avec une checklist de 50 points et des exemples concrets sur HubSpot.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>8 mars 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 : Le vrai cout des donnees sales */}
              <section id="cout-donnees-sales" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Le vrai cout des donnees sales dans votre CRM</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Les donnees de mauvaise qualite coutent en moyenne 12,9 millions de dollars par an aux entreprises, selon Gartner. Ce chiffre concerne les grandes organisations, mais ramene a l&apos;echelle d&apos;une PME B2B francaise, le probleme reste structurel. On estime que les donnees &ldquo;sales&rdquo; representent entre 15% et 25% du chiffre d&apos;affaires perdu, via des opportunites manquees, des campagnes mal ciblees et des decisions basees sur des metriques fausses.</p>
                    <p>Le phenomene est insidieux parce qu&apos;il est invisible. Personne ne recoit d&apos;alerte quand un email bounce parce que l&apos;adresse est obsolete. Personne ne mesure les deals perdus parce qu&apos;un commercial a contacte le mauvais interlocuteur. Personne ne quantifie le temps perdu a reconcilier des reportings qui ne collent pas entre eux.</p>
                    <p>Voici concretement ce que les donnees de mauvaise qualite coutent a une equipe commerciale :</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 shrink-0" /><strong className="text-[#111]">Perte de productivite.</strong> Un commercial passe en moyenne 30% de son temps a chercher, verifier et corriger des donnees. Sur une equipe de 5 commerciaux a 50 000 EUR de salaire annuel, c&apos;est 75 000 EUR par an gaspilles en nettoyage manuel.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] mt-2 shrink-0" /><strong className="text-[#111]">Erosion de la confiance.</strong> Quand un commercial appelle un contact et tombe sur la mauvaise personne, ou envoie un email avec le mauvais prenom, la credibilite de l&apos;entreprise en prend un coup. 44% des acheteurs B2B declarent ignorer les sollicitations contenant des erreurs de donnees.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" /><strong className="text-[#111]">Decisions faussees.</strong> Si votre pipeline affiche 500 000 EUR mais qu&apos;un quart des deals sont des doublons ou des contacts injoignables, votre forecast est faux. Les decisions strategiques basees sur des donnees incorrectes conduisent a des erreurs d&apos;allocation de ressources et des previsions non fiables.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" /><strong className="text-[#111]">Campagnes gaspillees.</strong> Un taux de delivrabilite email qui chute a cause d&apos;adresses invalides. Des sequences qui bombardent le meme contact en doublon. Des segmentations qui excluent des prospects qualifies parce que le champ industrie est vide. Chaque campagne mal ciblee est du budget marketing brule.</li>
                    </ul>
                    <p>La degradation des donnees est un phenomene naturel et continu. Chaque annee, environ 30% des donnees B2B deviennent obsoletes : les gens changent de poste, les entreprises fusionnent, les numeros de telephone sont modifies, les adresses email sont desactivees. Sans processus de maintenance actif, votre CRM se degrade mecaniquement.</p>
                    <p>La bonne nouvelle, c&apos;est que le nettoyage de donnees CRM n&apos;est pas un projet titanesque. C&apos;est un processus structure, reproductible, qui peut etre largement automatise. Les 5 etapes decrites dans cet article couvrent l&apos;ensemble du cycle, de l&apos;audit initial a la maintenance continue.</p>
                  </div>

                  {/* Key stats */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { stat: "12,9M$", label: "cout moyen annuel des mauvaises donnees (Gartner)", color: "#EF4444" },
                      { stat: "30%", label: "du temps commercial perdu a gerer des donnees", color: "#FF7A59" },
                      { stat: "44%", label: "des acheteurs ignorent les emails avec des erreurs", color: "#6C5CE7" },
                      { stat: "30%", label: "des donnees B2B deviennent obsoletes chaque annee", color: "#22C55E" },
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

              {/* Section 2 : Les 5 dimensions de la qualite des donnees */}
              <section id="dimensions-qualite" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les 5 dimensions de la qualite des donnees</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Avant de nettoyer quoi que ce soit, il faut comprendre ce que signifie &ldquo;qualite des donnees&rdquo;. Ce n&apos;est pas un concept vague. La qualite des donnees se decompose en cinq dimensions mesurables. Chaque dimension peut etre evaluee independamment, et chacune a un impact specifique sur vos operations commerciales et marketing.</p>
                    <p>Evaluer votre CRM sur ces cinq axes vous donne un diagnostic precis de l&apos;etat de sante de votre base. C&apos;est le point de depart indispensable avant toute action de nettoyage.</p>
                  </div>

                  {/* CSS Radar Chart Mockup */}
                  <div className="mb-6 rounded-lg border border-[#F2F2F2] bg-[#FAFAFA] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-4 text-center">Score qualite des donnees -- Exemple d&apos;audit</p>
                    <div className="relative w-[280px] h-[280px] mx-auto">
                      {/* Pentagon background */}
                      <svg viewBox="0 0 280 280" className="w-full h-full">
                        {/* Grid lines */}
                        {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, idx) => {
                          const cx = 140, cy = 140, r = 110 * scale;
                          const pts = [0, 1, 2, 3, 4].map((i) => {
                            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
                          }).join(" ");
                          return <polygon key={idx} points={pts} fill="none" stroke="#E8E8E8" strokeWidth="1" />;
                        })}
                        {/* Axis lines */}
                        {[0, 1, 2, 3, 4].map((i) => {
                          const cx = 140, cy = 140, r = 110;
                          const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                          return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)} stroke="#E8E8E8" strokeWidth="1" />;
                        })}
                        {/* Data polygon - example scores: completeness 45%, accuracy 60%, consistency 35%, timeliness 50%, uniqueness 40% */}
                        {(() => {
                          const scores = [0.45, 0.60, 0.35, 0.50, 0.40];
                          const cx = 140, cy = 140, r = 110;
                          const pts = scores.map((s, i) => {
                            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                            return `${cx + r * s * Math.cos(angle)},${cy + r * s * Math.sin(angle)}`;
                          }).join(" ");
                          return <polygon points={pts} fill="rgba(34,197,94,0.15)" stroke="#22C55E" strokeWidth="2" />;
                        })()}
                        {/* Score dots */}
                        {[0.45, 0.60, 0.35, 0.50, 0.40].map((s, i) => {
                          const cx = 140, cy = 140, r = 110;
                          const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                          return <circle key={i} cx={cx + r * s * Math.cos(angle)} cy={cy + r * s * Math.sin(angle)} r="4" fill="#22C55E" />;
                        })}
                      </svg>
                      {/* Labels */}
                      {[
                        { label: "Completude", score: "45%", x: "50%", y: "2%", transform: "translate(-50%, 0)" },
                        { label: "Exactitude", score: "60%", x: "95%", y: "38%", transform: "translate(-100%, -50%)" },
                        { label: "Coherence", score: "35%", x: "82%", y: "90%", transform: "translate(-50%, 0)" },
                        { label: "Fraicheur", score: "50%", x: "18%", y: "90%", transform: "translate(-50%, 0)" },
                        { label: "Unicite", score: "40%", x: "5%", y: "38%", transform: "translate(0, -50%)" },
                      ].map((d) => (
                        <div key={d.label} className="absolute text-center" style={{ left: d.x, top: d.y, transform: d.transform }}>
                          <p className="text-[10px] font-semibold text-[#111]">{d.label}</p>
                          <p className="text-[10px] text-[#22C55E] font-bold">{d.score}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-[#BBB] text-center mt-3">Exemple de diagnostic -- Score moyen typique avant nettoyage : 46%</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { title: "Completude (Completeness)", score: "45%", desc: "Quel pourcentage de vos fiches contacts ont les champs essentiels remplis ? Email, telephone, entreprise, poste, secteur d'activite, source d'acquisition. Dans la plupart des CRM que nous auditons, le taux de completude moyen est de 45%. Autrement dit, plus de la moitie des fiches sont inexploitables pour une campagne ciblee.", color: "#22C55E", impact: "Impossible de segmenter correctement, campagnes email limitees, scoring inoperant" },
                      { title: "Exactitude (Accuracy)", score: "60%", desc: "Les donnees presentes sont-elles justes ? Un email qui n'existe plus, un numero de telephone deconnecte, un titre de poste obsolete, un chiffre d'affaires qui date de trois ans : ce sont des donnees presentes mais fausses. L'exactitude est la dimension la plus difficile a mesurer car elle necessite une verification externe.", color: "#4B5EFC", impact: "Emails qui bouncent, appels qui tombent dans le vide, personnalisation erronee" },
                      { title: "Coherence (Consistency)", score: "35%", desc: "Les memes donnees sont-elles formatees de la meme maniere partout ? 'France', 'FR', 'fra', 'FRANCE' dans le champ pays. '06 12 34 56 78', '+33612345678', '0612345678' pour le telephone. 'PDG', 'CEO', 'Directeur General', 'DG' pour le meme poste. L'incoherence rend le filtrage, le tri et la segmentation impossibles.", color: "#6C5CE7", impact: "Filtres CRM qui ratent des contacts, listes de segmentation incompletes, rapports faux" },
                      { title: "Fraicheur (Timeliness)", score: "50%", desc: "A quand remonte la derniere mise a jour de vos fiches ? Si un contact n'a pas ete modifie depuis 18 mois et que la derniere interaction date de deux ans, cette donnee est probablement perimee. En B2B, la duree de vie moyenne d'une donnee est de 12 a 18 mois avant qu'un changement de poste, de numero ou d'entreprise ne la rende obsolete.", color: "#FF7A59", impact: "Base qui se degrade silencieusement, contacts injoignables, opportunites fantomes" },
                      { title: "Unicite (Uniqueness)", score: "40%", desc: "Combien de doublons existent dans votre base ? En moyenne, les CRM que nous auditons contiennent entre 10% et 25% de doublons. Meme contact, meme entreprise, crees par differents commerciaux ou importes depuis differentes sources. Les doublons faussent les reportings, creent de la confusion et generent des experiences client deplorables.", color: "#EF4444", impact: "Meme prospect contacte 3 fois, pipeline gonfle artificiellement, reportings non fiables" },
                    ].map((d) => (
                      <div key={d.title} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                            <span className="text-[12px] font-semibold text-[#111]">{d.title}</span>
                          </div>
                          <span className="text-[12px] font-bold" style={{ color: d.color }}>{d.score}</span>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.7] mb-2">{d.desc}</p>
                        <div className="flex items-start gap-2 rounded-lg bg-[#FEF2F2] p-2">
                          <span className="text-[10px] text-[#EF4444] font-semibold shrink-0 mt-0.5">Impact :</span>
                          <p className="text-[10px] text-[#888] leading-[1.5]">{d.impact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 : Etape 1 - Auditer votre base */}
              <section id="etape-audit" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center text-[14px] font-bold text-[#22C55E]">1</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Etape 1 : Auditer votre base</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Avant de nettoyer, il faut mesurer. Un audit data quality consiste a evaluer systematiquement l&apos;etat de sante de votre CRM sur les cinq dimensions decrites plus haut. L&apos;objectif est d&apos;obtenir un diagnostic chiffre, pas une impression subjective. Vous devez pouvoir dire : &ldquo;notre taux de completude est de 52%, notre taux de doublons est de 18%, notre taux de bounce est de 8%&rdquo;.</p>
                    <p>Voici les metriques a mesurer lors de l&apos;audit, et comment les obtenir dans HubSpot :</p>
                  </div>

                  {/* CSS Data Quality Score Gauge */}
                  <div className="my-6 rounded-lg border border-[#F2F2F2] bg-[#FAFAFA] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-4 text-center">Data Quality Score -- Tableau de bord d&apos;audit</p>
                    <div className="flex items-center justify-center gap-8 mb-6">
                      {/* Main gauge */}
                      <div className="relative w-[160px] h-[100px]">
                        <svg viewBox="0 0 160 100" className="w-full h-full">
                          {/* Background arc */}
                          <path d="M 15 90 A 65 65 0 0 1 145 90" fill="none" stroke="#F2F2F2" strokeWidth="12" strokeLinecap="round" />
                          {/* Red zone */}
                          <path d="M 15 90 A 65 65 0 0 1 48 32" fill="none" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
                          {/* Yellow zone */}
                          <path d="M 48 32 A 65 65 0 0 1 112 32" fill="none" stroke="#F59E0B" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
                          {/* Green zone */}
                          <path d="M 112 32 A 65 65 0 0 1 145 90" fill="none" stroke="#22C55E" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
                          {/* Score indicator - 46% = about 83 degrees into 180 degree arc */}
                          <path d="M 15 90 A 65 65 0 0 1 73 26" fill="none" stroke="#FF7A59" strokeWidth="12" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                          <p className="text-[28px] font-bold text-[#111]">46<span className="text-[14px] text-[#999]">/100</span></p>
                          <p className="text-[9px] text-[#FF7A59] font-medium">A ameliorer</p>
                        </div>
                      </div>
                    </div>
                    {/* Sub-scores */}
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { label: "Completude", score: 45, color: "#FF7A59" },
                        { label: "Exactitude", score: 60, color: "#F59E0B" },
                        { label: "Coherence", score: 35, color: "#EF4444" },
                        { label: "Fraicheur", score: 50, color: "#FF7A59" },
                        { label: "Unicite", score: 40, color: "#EF4444" },
                      ].map((s) => (
                        <div key={s.label} className="text-center">
                          <div className="w-full h-1.5 rounded-full bg-[#F2F2F2] mb-1.5">
                            <div className="h-full rounded-full" style={{ width: `${s.score}%`, background: s.color }} />
                          </div>
                          <p className="text-[9px] text-[#999]">{s.label}</p>
                          <p className="text-[11px] font-bold" style={{ color: s.color }}>{s.score}%</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Metriques de completude a verifier :</strong></p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Pourcentage de contacts avec email valide</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Pourcentage de contacts avec numero de telephone</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Pourcentage de contacts rattaches a une entreprise</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Pourcentage de contacts avec un owner (proprietaire) assigne</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Pourcentage de deals avec un montant renseigne</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Pourcentage de deals avec une date de closing estimee</li>
                    </ul>
                    <p><strong className="text-[#111]">Metriques d&apos;exactitude :</strong></p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" />Taux de bounce email (cible : moins de 2%)</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" />Nombre de contacts avec un email generique (info@, contact@, hello@)</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" />Contacts sans activite depuis plus de 12 mois</li>
                    </ul>
                    <p><strong className="text-[#111]">Metriques d&apos;unicite :</strong></p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 shrink-0" />Nombre de doublons contacts (meme email ou meme nom + entreprise)</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 shrink-0" />Nombre de doublons entreprises (meme domaine ou meme raison sociale)</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 shrink-0" />Nombre de deals dupliques (meme contact + meme montant + meme periode)</li>
                    </ul>
                    <p>Dans HubSpot, vous pouvez obtenir ces metriques via les rapports custom (Reports &gt; Create Report), les listes actives (Contacts &gt; Lists) ou l&apos;outil de gestion des doublons (Contacts &gt; Actions &gt; Manage duplicates). Pour un audit plus approfondi, exportez votre base en CSV et analysez-la dans un tableur avec des formules de comptage conditionnel.</p>
                    <p>L&apos;audit initial prend entre 2 et 4 heures pour une base de 5 000 a 20 000 contacts. C&apos;est un investissement de temps qui se recupere en quelques jours grace aux ameliorations de productivite qui en decoulent.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 : Etape 2 - Dedupliquer */}
              <section id="etape-dedup" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center text-[14px] font-bold text-[#22C55E]">2</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Etape 2 : Dedupliquer vos contacts et entreprises</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La deduplication est la premiere action de nettoyage a mener. Tant que des doublons existent, toutes les autres operations (standardisation, enrichissement, segmentation) produiront des resultats fausses. Vous enrichirez un doublon au lieu de l&apos;original. Vous enverrez deux fois le meme email au meme contact. Vous compterez deux fois le meme deal dans votre pipeline.</p>
                    <p><strong className="text-[#111]">Les causes principales de doublons dans un CRM :</strong></p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Imports CSV sans verification de doublons prealable</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Formulaires web qui creent un nouveau contact a chaque soumission</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Synchronisations d&apos;outils tiers (Calendly, Typeform, LinkedIn) sans mapping</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Commerciaux qui creent manuellement des contacts sans verifier s&apos;ils existent deja</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Migration depuis un ancien CRM avec des doublons preexistants</li>
                    </ul>
                    <p><strong className="text-[#111]">Processus de deduplication en 4 etapes :</strong></p>
                    <p>1. <strong className="text-[#111]">Identifier</strong> les doublons via les criteres de correspondance : email identique (le plus fiable), nom + prenom + entreprise, domaine email + nom, numero de telephone. Dans HubSpot, l&apos;outil natif de gestion des doublons (disponible en Starter et au-dessus) detecte automatiquement les paires potentielles et les presente pour revue.</p>
                    <p>2. <strong className="text-[#111]">Definir les regles de fusion.</strong> Avant de fusionner, etablissez des regles claires : quel enregistrement survit ? En general, on conserve le plus ancien (car il contient l&apos;historique des interactions) et on le complete avec les donnees du doublon. Les champs remplis du doublon ecrasent les champs vides du master, mais pas l&apos;inverse.</p>
                    <p>3. <strong className="text-[#111]">Fusionner</strong> par lots en commencant par les cas les plus evidents (meme email exact) puis en traitant les cas ambigus manuellement. Ne fusionnez jamais a l&apos;aveugle. Certains &ldquo;doublons&rdquo; sont en realite des personnes differentes avec des noms similaires.</p>
                    <p>4. <strong className="text-[#111]">Prevenir</strong> la recreation de doublons en mettant en place des regles de deduplication automatiques sur les imports et les formulaires. Dans HubSpot, activez la correspondance par email sur vos formulaires pour mettre a jour les fiches existantes au lieu d&apos;en creer de nouvelles.</p>
                  </div>

                  {/* Dedup rules card */}
                  <div className="mt-5 rounded-lg bg-[#F0FDF4] border border-[#D4EDDA] p-4">
                    <p className="text-[12px] font-semibold text-[#22C55E] mb-3">Regles de fusion recommandees</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { rule: "Email identique", action: "Fusion automatique", risk: "Faible" },
                        { rule: "Nom + First name + Entreprise", action: "Revue manuelle", risk: "Moyen" },
                        { rule: "Domaine email + Nom", action: "Revue manuelle", risk: "Moyen" },
                        { rule: "Telephone identique", action: "Fusion semi-auto", risk: "Faible" },
                      ].map((r) => (
                        <div key={r.rule} className="flex items-center gap-3 rounded-lg bg-white p-2.5 border border-[#F2F2F2]">
                          <div>
                            <p className="text-[11px] font-medium text-[#111]">{r.rule}</p>
                            <p className="text-[10px] text-[#999]">{r.action} -- Risque : {r.risk}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 : Etape 3 - Standardiser */}
              <section id="etape-standardiser" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center text-[14px] font-bold text-[#22C55E]">3</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Etape 3 : Standardiser les formats et conventions</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La standardisation est l&apos;etape la plus sous-estimee du nettoyage de donnees. Elle n&apos;est pas spectaculaire, mais elle est fondamentale. Sans formats standardises, vos filtres CRM ne fonctionnent pas correctement, vos segmentations sont incompletes et vos reportings sont faux.</p>
                    <p>Le probleme vient le plus souvent des champs en texte libre. Quand un commercial peut taper ce qu&apos;il veut dans un champ, il le fera de 15 manieres differentes. La solution est simple : remplacer au maximum les champs texte libre par des listes deroulantes (dropdowns) et des champs a valeurs predefinies.</p>
                    <p><strong className="text-[#111]">Les champs critiques a standardiser :</strong></p>
                  </div>

                  {/* Standardization examples table */}
                  <div className="my-5 rounded-lg border border-[#F2F2F2] overflow-hidden">
                    <div className="bg-[#FAFAFA] px-4 py-2.5 border-b border-[#F2F2F2]">
                      <p className="text-[11px] font-semibold text-[#111]">Avant / Apres standardisation</p>
                    </div>
                    <div className="divide-y divide-[#F2F2F2]">
                      {[
                        { field: "Pays", before: "France, FR, fra, FRANCE, france", after: "France (dropdown)", type: "Dropdown" },
                        { field: "Telephone", before: "06 12 34 56 78, +33612345678, 0612345678", after: "+33 6 12 34 56 78 (format E.164)", type: "Workflow" },
                        { field: "Secteur", before: "SaaS, saas, Software, Logiciel, Tech", after: "SaaS / Software (dropdown normalise)", type: "Dropdown" },
                        { field: "Titre de poste", before: "PDG, CEO, DG, Directeur General", after: "CEO / Directeur General (mapping)", type: "Dropdown" },
                        { field: "Source", before: "site web, Site, website, Inbound, inbound", after: "Site web (valeur unique)", type: "Dropdown" },
                        { field: "Taille entreprise", before: "petite, 10, 10-50, PME", after: "10-50 salaries (tranche numerique)", type: "Dropdown" },
                      ].map((r) => (
                        <div key={r.field} className="flex items-center gap-4 px-4 py-3">
                          <p className="text-[11px] font-semibold text-[#111] w-[80px] shrink-0">{r.field}</p>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] text-[#EF4444] line-through mb-0.5">{r.before}</p>
                            <p className="text-[10px] text-[#22C55E] font-medium">{r.after}</p>
                          </div>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F2F2F2] text-[#999] shrink-0">{r.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Regles de nommage a mettre en place :</strong></p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" /><strong className="text-[#111]">Noms et prenoms :</strong> Premiere lettre en majuscule, reste en minuscule. Pas d&apos;espace avant ou apres. Suppression des titres (M., Mme, Dr.) dans le champ nom.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" /><strong className="text-[#111]">Emails :</strong> Tout en minuscule. Suppression des espaces parasites. Verification du format avec une regex basique.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" /><strong className="text-[#111]">Numeros de telephone :</strong> Format international E.164 (+33 X XX XX XX XX pour la France). Suppression des tirets, points et espaces superflus.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" /><strong className="text-[#111]">Noms d&apos;entreprise :</strong> Capitalisation coherente. Suppression de la forme juridique (SAS, SARL, SA) sauf si pertinente. Un seul format pour les sigles.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" /><strong className="text-[#111]">Deals / Opportunites :</strong> Convention de nommage standardisee, par exemple &ldquo;[Entreprise] - [Produit] - [Date]&rdquo;. Facilite la recherche et le reporting.</li>
                    </ul>
                    <p>Dans HubSpot, la standardisation s&apos;implemente via trois mecanismes : la conversion des proprietes texte libre en proprietes dropdown, la creation de workflows de reformatage automatique (Operations Hub), et la definition de regles de validation sur les formulaires.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 : Etape 4 - Enrichir */}
              <section id="etape-enrichir" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center text-[14px] font-bold text-[#22C55E]">4</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Etape 4 : Enrichir les donnees manquantes</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Une fois les doublons supprimes et les formats standardises, il reste les trous. Les champs vides, les informations manquantes, les fiches incompletes. L&apos;enrichissement consiste type to complete automatiquement vos fiches contacts et entreprises avec des donnees provenant de sources externes.</p>
                    <p>L&apos;enrichissement de donnees a enormement progresse ces dernieres annees. Des outils comme Dropcontact, Clay, Clearbit, Apollo ou Lusha permettent de retrouver l&apos;email professionnel, le numero de telephone, le titre de poste, la taille de l&apos;entreprise, le secteur d&apos;activite et le chiffre d&apos;affaires a partir d&apos;un simple nom et d&apos;un nom d&apos;entreprise.</p>
                    <p><strong className="text-[#111]">Les trois principaux outils d&apos;enrichissement pour le marche francais :</strong></p>
                  </div>

                  {/* Tools comparison */}
                  <div className="my-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: "Dropcontact", price: "A partir de 24 EUR/mois", pros: ["RGPD compliant (pas de base de donnees)", "Integration HubSpot native", "Enrichissement + nettoyage automatique", "Tres bon sur le marche francais"], cons: ["Limité hors Europe", "Credits consommes rapidement"], color: "#22C55E" },
                      { name: "Clay", price: "A partir de 149$/mois", pros: ["50+ sources de donnees", "Workflows d'enrichissement sequentiels", "IA pour qualifier et scorer", "Waterfall enrichment (cascading)"], cons: ["Courbe d'apprentissage elevee", "Prix premium", "Moins bon sur la France"], color: "#6C5CE7" },
                      { name: "Clearbit (Breeze)", price: "Inclus dans HubSpot Breeze", pros: ["Integration native HubSpot", "Enrichissement automatique a la creation", "Donnees entreprise tres fiables", "Scoring intent integre"], cons: ["Necessite HubSpot payant", "Donnees B2C limitees", "Couverture France moyenne"], color: "#4B5EFC" },
                    ].map((t) => (
                      <div key={t.name} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                          <p className="text-[12px] font-semibold text-[#111]">{t.name}</p>
                        </div>
                        <p className="text-[10px] text-[#999] mb-3">{t.price}</p>
                        <div className="mb-2">
                          {t.pros.map((p) => (
                            <p key={p} className="text-[10px] text-[#555] mb-1 flex items-start gap-1.5"><span className="text-[#22C55E] shrink-0">+</span>{p}</p>
                          ))}
                        </div>
                        <div>
                          {t.cons.map((c) => (
                            <p key={c} className="text-[10px] text-[#555] mb-1 flex items-start gap-1.5"><span className="text-[#EF4444] shrink-0">-</span>{c}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Before / After Contact Record Mockup */}
                  <div className="my-6 rounded-lg border border-[#F2F2F2] bg-[#FAFAFA] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-4 text-center">Fiche contact : avant / apres enrichissement</p>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Before */}
                      <div className="rounded-lg border border-[#EF4444]/30 bg-white p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 rounded-full bg-[#EF4444]/10 flex items-center justify-center">
                            <span className="text-[10px] text-[#EF4444] font-bold">!</span>
                          </div>
                          <p className="text-[11px] font-semibold text-[#EF4444]">Avant</p>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FEF2F2] text-[#EF4444] ml-auto">32% complete</span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { label: "First name", value: "Marie", filled: true },
                            { label: "Name", value: "dupont", filled: true },
                            { label: "Email", value: "marie@gmail.com", filled: true },
                            { label: "Telephone", value: "--", filled: false },
                            { label: "Entreprise", value: "--", filled: false },
                            { label: "Poste", value: "--", filled: false },
                            { label: "Secteur", value: "--", filled: false },
                            { label: "Taille", value: "--", filled: false },
                            { label: "LinkedIn", value: "--", filled: false },
                            { label: "Ville", value: "--", filled: false },
                            { label: "Source", value: "Formulaire web", filled: true },
                          ].map((f) => (
                            <div key={f.label} className="flex items-center justify-between">
                              <span className="text-[9px] text-[#999]">{f.label}</span>
                              <span className={`text-[9px] ${f.filled ? "text-[#555]" : "text-[#DDD]"}`}>{f.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* After */}
                      <div className="rounded-lg border border-[#22C55E]/30 bg-white p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-5 h-5 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                          </div>
                          <p className="text-[11px] font-semibold text-[#22C55E]">Apres</p>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F0FDF4] text-[#22C55E] ml-auto">95% complete</span>
                        </div>
                        <div className="space-y-2">
                          {[
                            { label: "First name", value: "Marie", enriched: false },
                            { label: "Name", value: "Dupont", enriched: true },
                            { label: "Email", value: "m.dupont@techcorp.fr", enriched: true },
                            { label: "Telephone", value: "+33 6 45 67 89 10", enriched: true },
                            { label: "Entreprise", value: "TechCorp", enriched: true },
                            { label: "Poste", value: "Head of Marketing", enriched: true },
                            { label: "Secteur", value: "SaaS / Software", enriched: true },
                            { label: "Taille", value: "50-200 salaries", enriched: true },
                            { label: "LinkedIn", value: "linkedin.com/in/mdupont", enriched: true },
                            { label: "Ville", value: "Paris", enriched: true },
                            { label: "Source", value: "Formulaire web", enriched: false },
                          ].map((f) => (
                            <div key={f.label} className="flex items-center justify-between">
                              <span className="text-[9px] text-[#999]">{f.label}</span>
                              <span className={`text-[9px] ${f.enriched ? "text-[#22C55E] font-medium" : "text-[#555]"}`}>{f.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px] text-[#BBB] text-center mt-3">Enrichissement automatique via Dropcontact -- Temps de traitement : 30 secondes</p>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Processus d&apos;enrichissement recommande :</strong></p>
                    <p>1. Commencez par enrichir les contacts les plus strategiques : ceux qui sont dans votre pipeline actif, ceux qui ont interagi recemment avec votre contenu, ceux qui correspondent a votre ICP (Ideal Customer Profilee).</p>
                    <p>2. Utilisez un enrichissement en cascade (&ldquo;waterfall enrichment&rdquo;) : si Dropcontact ne trouve pas l&apos;email, essayez avec Clearbit, puis avec Apollo. Chaque source a ses forces et ses lacunes. La combinaison de plusieurs sources augmente significativement le taux de completude.</p>
                    <p>3. Verifiez les emails enrichis avec un outil de verification (NeverBounce, ZeroBounce, Bouncer) avant de les utiliser dans des campagnes. Un email trouve par enrichissement n&apos;est pas forcement valide.</p>
                    <p>4. Automatisez l&apos;enrichissement a l&apos;entree : configurez votre outil pour enrichir automatiquement chaque nouveau contact cree dans le CRM. C&apos;est beaucoup plus efficace que de faire des campagnes d&apos;enrichissement ponctuelles.</p>
                    <p>Notre recommandation pour les PME B2B francaises : Dropcontact pour l&apos;enrichissement de base (RGPD compliant, bon sur la France, integration HubSpot native). Si votre marche est international ou que vous avez besoin de donnees plus poussees (technographiques, intent data), combinez avec Clay ou Clearbit.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 : Etape 5 - Automatiser la maintenance */}
              <section id="etape-automatiser" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E]/10 flex items-center justify-center text-[14px] font-bold text-[#22C55E]">5</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Etape 5 : Automatiser la maintenance continue</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le nettoyage ponctuel est necessaire mais insuffisant. Si vous nettoyez votre base en mars et que vous ne mettez pas en place de processus de maintenance, elle sera de nouveau degradee en septembre. La cle de la qualite des donnees, c&apos;est l&apos;automatisation de la prevention et de la correction.</p>
                    <p><strong className="text-[#111]">Les 4 piliers de la maintenance automatisee :</strong></p>
                  </div>

                  <div className="my-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        title: "Validation a l'entree",
                        desc: "Empecher les donnees sales d'entrer dans le CRM. Champs obligatoires sur les formulaires, validation de format (email, telephone), listes deroulantes au lieu du texte libre, regles de deduplication a l'import.",
                        color: "#22C55E",
                        examples: ["Champ email obligatoire sur tous les formulaires", "Validation regex du format telephone", "Dropdown pour pays, secteur, source", "Dedup check automatique a l'import CSV"]
                      },
                      {
                        title: "Workflows de correction",
                        desc: "Des automatisations qui detectent et corrigent les anomalies en continu. Reformatage automatique des noms (majuscule initiale), standardisation des numeros de telephone, rattachement automatique contact-entreprise par domaine email.",
                        color: "#4B5EFC",
                        examples: ["Workflow : capitalize first name et last name", "Workflow : format phone to E.164", "Workflow : associate contact to company by email domain", "Workflow : set lifecycle stage based on deal stage"]
                      },
                      {
                        title: "Alertes de degradation",
                        desc: "Des notifications automatiques quand la qualite se degrade. Alerte quand le taux de bounce depasse 3%, quand le nombre de doublons augmente, quand le taux de completude baisse en dessous d'un seuil.",
                        color: "#FF7A59",
                        examples: ["Alerte Slack : bounce rate > 3%", "Rapport hebdomadaire : nouveaux doublons detectes", "Notification : contacts sans activite > 12 mois", "Dashboard data quality avec seuils d'alerte"]
                      },
                      {
                        title: "Routine d'hygiene periodique",
                        desc: "Un processus mensuel ou trimestriel de verification et de nettoyage. Revue des doublons, archivage des contacts inactifs, re-enrichissement des fiches incompletes, verification des bounces.",
                        color: "#6C5CE7",
                        examples: ["Mensuel : revue des doublons detectes", "Trimestriel : archivage contacts inactifs > 18 mois", "Trimestriel : re-enrichissement des fiches < 60% completes", "Semestriel : audit complet des 5 dimensions"]
                      },
                    ].map((p) => (
                      <div key={p.title} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                          <p className="text-[12px] font-semibold text-[#111]">{p.title}</p>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.6] mb-3">{p.desc}</p>
                        <div className="space-y-1">
                          {p.examples.map((e) => (
                            <p key={e} className="text-[10px] text-[#999] flex items-start gap-1.5">
                              <span className="shrink-0 mt-0.5" style={{ color: p.color }}>&#8226;</span>
                              {e}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Le calendrier d&apos;hygiene data recommande :</strong></p>
                    <p>Chaque semaine : verification rapide du taux de bounce des dernieres campagnes, revue des doublons automatiquement detectes. 15 minutes maximum.</p>
                    <p>Chaque mois : nettoyage des contacts non rattaches a une entreprise, verification des deals sans activite depuis plus de 30 jours, mise a jour des proprietes obsoletes. 1 heure.</p>
                    <p>Chaque trimestre : audit complet des 5 dimensions, archivage des contacts inactifs, re-enrichissement des fiches incompletes, revue des proprietes utilisees vs inutilisees. 2 a 4 heures.</p>
                    <p>Ce rythme peut paraitre contraignant, mais il est la difference entre un CRM qui se degrade progressivement et un CRM qui reste exploitable dans la duree. Et la bonne nouvelle, c&apos;est que 80% de ces taches peuvent etre automatisees avec les bons workflows.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 : La checklist data quality */}
              <section id="checklist" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-2">La checklist data quality : 50 points de controle</h2>
                  <p className="text-[13px] text-[#555] leading-[1.75] mb-5">Voici la checklist complete que nous utilisons chez Ceres lors de nos audits data quality. Cliquez sur chaque section pour derouler les points de controle.</p>

                  <div className="space-y-2">
                    {[
                      {
                        id: "check-contacts",
                        title: "Contacts (12 points)",
                        color: "#22C55E",
                        items: [
                          "Tous les contacts ont un email valide (pas de bounce)",
                          "Les emails generiques (info@, contact@) sont identifies et isoles",
                          "Chaque contact a un prenom et un nom correctement formates",
                          "Les numeros de telephone sont au format international",
                          "Chaque contact est rattache a une entreprise",
                          "Le lifecycle stage est renseigne et coherent avec le parcours",
                          "Le lead status est a jour pour les contacts en cours de qualification",
                          "Un owner est assigne a chaque contact actif",
                          "La source originale est renseignee (first touch attribution)",
                          "Les contacts inactifs (>18 mois sans interaction) sont archives",
                          "Pas de doublons sur le critere email",
                          "Les opt-out / desabonnements sont respectes et a jour",
                        ],
                      },
                      {
                        id: "check-entreprises",
                        title: "Entreprises (10 points)",
                        color: "#4B5EFC",
                        items: [
                          "Chaque entreprise a un nom standardise (pas de doublons orthographiques)",
                          "Le domaine web est renseigne et valide",
                          "Le secteur d'activite est renseigne via une liste deroulante",
                          "La taille d'entreprise (nombre de salaries) est renseignee",
                          "Le pays et la ville sont renseignes",
                          "Pas de doublons sur le critere domaine",
                          "Le chiffre d'affaires est renseigne quand disponible",
                          "Un owner est assigne a chaque entreprise active",
                          "Les entreprises sont associees aux bons contacts",
                          "Les entreprises sans contact actif sont identifiees",
                        ],
                      },
                      {
                        id: "check-deals",
                        title: "Deals / Opportunites (10 points)",
                        color: "#FF7A59",
                        items: [
                          "Chaque deal a un montant renseigne",
                          "Chaque deal a une date de closing estimee",
                          "Le pipeline stage est coherent avec la realite (pas de deals bloques)",
                          "Un owner est assigne a chaque deal",
                          "Chaque deal est associe a au moins un contact",
                          "Chaque deal est associe a une entreprise",
                          "La convention de nommage est respectee",
                          "Les deals perdus ont une raison de perte renseignee",
                          "Les deals inactifs (>60 jours sans activite) sont revus",
                          "Pas de deals dupliques (meme contact + meme montant)",
                        ],
                      },
                      {
                        id: "check-proprietes",
                        title: "Proprietes et champs (8 points)",
                        color: "#6C5CE7",
                        items: [
                          "Les proprietes critiques utilisent des dropdowns (pas de texte libre)",
                          "Les proprietes inutilisees sont archivees ou supprimees",
                          "Les noms de proprietes sont explicites et documentes",
                          "Les valeurs de dropdown sont coherentes et non redondantes",
                          "Les proprietes calculees fonctionnent correctement",
                          "Les champs obligatoires sont definis sur les formulaires cles",
                          "Les proprietes custom suivent une convention de nommage",
                          "Un dictionnaire de donnees est maintenu a jour",
                        ],
                      },
                      {
                        id: "check-process",
                        title: "Process et automatisations (10 points)",
                        color: "#22C55E",
                        items: [
                          "Un workflow de deduplication automatique est en place",
                          "L'enrichissement automatique est configure a l'entree",
                          "Les formulaires valident le format des champs obligatoires",
                          "Un workflow de reformatage (noms, telephones) est actif",
                          "Les imports CSV passent par un processus de nettoyage prealable",
                          "Les integrations tierces sont mappees correctement (pas de doublons a la synchro)",
                          "Des alertes de degradation sont configurees (bounce rate, doublons)",
                          "Un rapport data quality est genere automatiquement chaque mois",
                          "Une routine d'hygiene trimestrielle est planifiee et executee",
                          "Les roles et responsabilites data quality sont clairement definis",
                        ],
                      },
                    ].map((section) => (
                      <div key={section.id} className="rounded-lg border border-[#F2F2F2] overflow-hidden">
                        <button
                          onClick={() => setOpenChecklist(openChecklist === section.id ? null : section.id)}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#FAFAFA] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ background: section.color }} />
                            <span className="text-[12px] font-semibold text-[#111]">{section.title}</span>
                          </div>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#CCC"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform ${openChecklist === section.id ? "rotate-180" : ""}`}
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        {openChecklist === section.id && (
                          <div className="px-4 pb-3 border-t border-[#F2F2F2]">
                            <div className="pt-3 space-y-2">
                              {section.items.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <div className="w-4 h-4 rounded border border-[#DDD] shrink-0 mt-0.5 flex items-center justify-center">
                                    <span className="text-[8px] text-[#DDD]">{idx + 1}</span>
                                  </div>
                                  <p className="text-[11px] text-[#666] leading-[1.6]">{item}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 : Les outils pour maintenir la qualite */}
              <section id="outils" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les outils pour maintenir la qualite des donnees</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Le nettoyage manuel est necessaire lors de l&apos;audit initial. Mais pour la maintenance continue, vous avez besoin d&apos;outils qui automatisent la detection, la correction et la prevention des problemes de qualite. Voici les trois categories d&apos;outils essentiels et nos recommandations pour chaque.</p>
                  </div>

                  <div className="space-y-4">
                    {/* HubSpot Operations Hub */}
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                        <p className="text-[12px] font-semibold text-[#111]">HubSpot Operations Hub</p>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#FF7A59]/10 text-[#FF7A59]">Recommande si vous etes sur HubSpot</span>
                      </div>
                      <p className="text-[11px] text-[#777] leading-[1.7] mb-3">Operations Hub est le module HubSpot dedie a la qualite des donnees. Disponible en version gratuite (basique) et payante (Starter a 20 EUR/mois, Pro a 800 EUR/mois). Le plan Starter suffit pour la plupart des PME.</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["Reformatage automatique des proprietes", "Detection et fusion des doublons", "Synchronisation bidirectionnelle avec d'autres outils", "Workflows de nettoyage de donnees", "Data quality automation (Pro)", "Jeux de donnees et rapports data quality"].map((f) => (
                          <p key={f} className="text-[10px] text-[#555] flex items-start gap-1.5"><span className="text-[#FF7A59] shrink-0">+</span>{f}</p>
                        ))}
                      </div>
                    </div>

                    {/* Insycle */}
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#4B5EFC]" />
                        <p className="text-[12px] font-semibold text-[#111]">Insycle</p>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#4B5EFC]/10 text-[#4B5EFC]">Le plus complet</span>
                      </div>
                      <p className="text-[11px] text-[#777] leading-[1.7] mb-3">Insycle est un outil specialise dans la gestion de la qualite des donnees CRM. Il s&apos;integre nativement avec HubSpot, Salesforce et Intercom. A partir de 200$/mois. Son point fort : il couvre l&apos;ensemble du spectre data quality dans une seule interface.</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["Deduplication avancee (fuzzy matching)", "Nettoyage en masse avec regles personnalisees", "Standardisation automatique des champs", "Association automatique contacts-entreprises", "Audit data quality avec scoring", "Planification de nettoyages automatiques recurrents"].map((f) => (
                          <p key={f} className="text-[10px] text-[#555] flex items-start gap-1.5"><span className="text-[#4B5EFC] shrink-0">+</span>{f}</p>
                        ))}
                      </div>
                    </div>

                    {/* Dedupely */}
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                        <p className="text-[12px] font-semibold text-[#111]">Dedupely</p>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#22C55E]/10 text-[#22C55E]">Le plus simple pour la dedup</span>
                      </div>
                      <p className="text-[11px] text-[#777] leading-[1.7] mb-3">Dedupely fait une seule chose et le fait bien : la deduplication. C&apos;est l&apos;outil le plus simple pour detecter et fusionner les doublons dans HubSpot, Pipedrive ou Salesforce. A partir de 49$/mois. Ideal si votre probleme principal est les doublons et que vous n&apos;avez pas besoin d&apos;un outil plus complet.</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["Interface ultra-simple", "Detection par correspondance exacte et floue", "Fusion en masse avec regles de priorite", "Integration HubSpot, Pipedrive, Salesforce", "Detection automatique programmable", "Rapport de doublons avec scoring de confiance"].map((f) => (
                          <p key={f} className="text-[10px] text-[#555] flex items-start gap-1.5"><span className="text-[#22C55E] shrink-0">+</span>{f}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Notre stack recommandee pour les PME sur HubSpot :</strong></p>
                    <p>Pour une PME de 5 a 50 salaries sur HubSpot, notre recommandation est la suivante : HubSpot Operations Hub Starter (20 EUR/mois) pour le reformatage et les workflows de base + Dropcontact (24 EUR/mois) pour l&apos;enrichissement automatique + les outils natifs HubSpot de gestion des doublons. Cout total : moins de 50 EUR/mois pour une base de donnees propre et exploitable.</p>
                    <p>Si votre base depasse 50 000 contacts ou que vous avez des besoins avances de deduplication (fuzzy matching, regles complexes), ajoutez Insycle ou Dedupely. Si votre equipe fait de la prospection outbound intensive, Clay est un excellent complement pour l&apos;enrichissement avance.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 : Notre audit chez Ceres — Dark section */}
              <section id="audit-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E]/20 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-white">Notre audit data quality chez Ceres</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#999] leading-[1.75] mb-6">
                    <p>Chez Ceres, l&apos;audit data quality fait partie integrante de chaque mission d&apos;optimisation CRM. On ne peut pas optimiser un pipeline, ameliorer des sequences ou mettre en place du reporting fiable si les donnees sous-jacentes sont mauvaises. C&apos;est la fondation sur laquelle tout le reste repose.</p>
                    <p>Notre audit couvre les cinq dimensions decrites dans cet article, mais va plus loin avec une analyse specifique a votre contexte metier. Voici ce que nous verifions concretement :</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {[
                      { title: "Audit de completude", desc: "Analyse champ par champ du taux de remplissage sur les objets contacts, entreprises et deals. Identification des champs critiques manquants et recommandations de priorisation.", color: "#22C55E" },
                      { title: "Cartographie des doublons", desc: "Detection multi-criteres (email, nom+entreprise, telephone, domaine) avec scoring de confiance. Plan de fusion avec regles de priorite adaptees a votre historique.", color: "#4B5EFC" },
                      { title: "Analyse de coherence", desc: "Verification de la standardisation des champs cles. Identification des proprietes en texte libre a convertir en dropdown. Mapping des valeurs incoherentes.", color: "#6C5CE7" },
                      { title: "Score de fraicheur", desc: "Identification des contacts et entreprises obsoletes. Segmentation par date de derniere interaction. Plan d'archivage et de re-engagement.", color: "#FF7A59" },
                      { title: "Audit des workflows existants", desc: "Verification que les automatisations existantes ne creent pas de problemes de qualite. Identification des flux d'entree non controles (formulaires, imports, integrations).", color: "#22C55E" },
                      { title: "Plan d'action priorise", desc: "Livrable final : un document avec le diagnostic chiffre, les actions correctives classees par impact et effort, et le plan de maintenance recommande.", color: "#EF4444" },
                    ].map((item) => (
                      <div key={item.title} className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                          <p className="text-[12px] font-semibold text-white">{item.title}</p>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.6]">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4 mb-6">
                    <p className="text-[12px] font-semibold text-white mb-3">Resultats moyens constates apres notre audit + nettoyage</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { stat: "46% → 87%", label: "Score data quality", color: "#22C55E" },
                        { stat: "-65%", label: "Doublons supprimes", color: "#4B5EFC" },
                        { stat: "+40%", label: "Taux de completude", color: "#6C5CE7" },
                        { stat: "-80%", label: "Taux de bounce email", color: "#FF7A59" },
                      ].map((r) => (
                        <div key={r.label} className="text-center">
                          <p className="text-[18px] font-bold mb-1" style={{ color: r.color }}>{r.stat}</p>
                          <p className="text-[10px] text-[#666]">{r.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#999] leading-[1.75]">
                    <p>L&apos;audit prend generalement 1 a 2 semaines selon la taille de votre base. Le nettoyage initial est realise dans la foulee, et nous mettons en place les workflows de maintenance automatique pour que votre base reste propre sur la duree. Nos clients voient des resultats immediats : meilleure delivrabilite des emails, reportings plus fiables, commerciaux plus confiants dans les donnees de leur CRM.</p>
                    <p>La qualite des donnees n&apos;est pas un projet ponctuel. C&apos;est un processus continu. Mais avec les bonnes fondations, les bons outils et les bonnes habitudes, c&apos;est un processus qui tourne presque tout seul.</p>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <div className="mb-12 rounded-lg bg-gradient-to-br from-[#111] to-[#1A1A1A] p-6 md:p-8 text-center border border-[#333]">
                <h3 className="text-[17px] font-semibold text-white mb-3">Votre CRM a besoin d&apos;un audit data quality ?</h3>
                <p className="text-[13px] text-[#999] leading-[1.7] mb-5 max-w-[500px] mx-auto">Chez Ceres, on audite, nettoie et automatise la maintenance de votre base CRM. Un diagnostic chiffre en 5 jours, un plan d&apos;action priorise et des resultats mesurables. Commencez par un appel de 30 minutes pour evaluer l&apos;etat de sante de vos donnees.</p>
                <Link href="https://calendly.com/ceres-revops/30min" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#22C55E] text-white rounded-lg text-[13px] font-medium hover:bg-[#1EAD50] transition-colors">
                  Demander un audit gratuit
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
                        <p className="text-[12px] font-medium text-[#111] group-hover:text-[#22C55E] transition-colors leading-[1.4]">{a.title}</p>
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