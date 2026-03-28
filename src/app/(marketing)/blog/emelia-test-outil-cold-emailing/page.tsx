"use client";

import { useEffect, useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: { "@type": "SoftwareApplication", name: "Emelia", applicationCategory: "Cold Email Tool", operatingSystem: "Web" },
  author: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  reviewRating: { "@type": "Rating", ratingValue: "4.2", bestRating: "5" },
  datePublished: "2026-03-15",
  reviewBody: "Test complet d'Emelia après 3 mois d'utilisation sur 4 campagnes outbound. Un outil de cold email français simple, efficace et très compétitif sur le prix."
};

const sections = [
  { id: "intro", title: "Pourquoi on a testé Emelia" },
  { id: "prise-en-main", title: "Prise en main et interface" },
  { id: "features", title: "Les fonctionnalités clés" },
  { id: "deliverability", title: "Délivrabilité et warm-up" },
  { id: "sequences", title: "Création de séquences" },
  { id: "enrichissement", title: "Enrichissement et scraping" },
  { id: "pricing", title: "Prix et rapport qualité/prix" },
  { id: "integrations", title: "Intégrations CRM et outils" },
  { id: "vs", title: "Emelia vs Lemlist vs LGM vs Apollo" },
  { id: "limites", title: "Les limites qu'on a rencontrées" },
  { id: "verdict", title: "Notre verdict" },
  { id: "pour-qui", title: "Pour qui Emelia est fait" },
];

const relatedArticles = [
  { title: "9 actions commerciales que vous devriez automatiser", slug: "9-actions-commerciales-automatiser", category: "Automatisation", color: "#6C5CE7" },
  { title: "Comparatif outils de génération de leads B2B", slug: "comparatif-outils-generation-leads", category: "Process & Outils", color: "#FF7A59" },
  { title: "Les meilleures pratiques pour vos séquences HubSpot", slug: "meilleures-pratiques-sequences-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function EmeliaArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "12%", width: 300, height: 300, borderRadius: "50%", background: "#6C5CE7", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "35%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "55%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "75%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Emelia</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>Process &amp; Outils</Badge>
                <span className="text-[11px] text-[#CCC]">18 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Emelia : notre test complet de l&apos;outil de cold emailing en 2026
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                On a utilisé Emelia pendant 3 mois sur 4 campagnes outbound (SaaS B2B, services, recrutement, immobilier). Délivrabilité, warm-up, séquences, enrichissement, intégrations CRM, prix. Tout ce que vous devez savoir avant de choisir votre outil de cold email.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>15 mars 2026</span>
                <span>Mis a jour le 20 mars 2026</span>
              </div>

              {/* Quick verdict card */}
              <div className="mt-8 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[13px] font-semibold text-[#111]">Verdict rapide</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[22px] font-bold text-[#6C5CE7]">4.2</span>
                    <span className="text-[12px] text-[#999]">/5</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: "Delivrabilite", score: "4.5", color: "#22C55E" },
                    { label: "Fonctionnalites", score: "4.0", color: "#4B5EFC" },
                    { label: "Prix", score: "4.8", color: "#22C55E" },
                    { label: "Integrations", score: "3.5", color: "#FF7A59" },
                    { label: "UX/Interface", score: "4.2", color: "#6C5CE7" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-[18px] font-bold" style={{ color: s.color }}>{s.score}</div>
                      <div className="text-[10px] text-[#999]">{s.label}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[12px] text-[#777] leading-[1.6]">
                  Emelia est l&apos;outil ideal pour les equipes qui veulent faire du cold email efficace sans se ruiner. La delivrabilite est excellente, le prix imbattable, l&apos;interface simple. Le manque d&apos;integrations CRM avancees et l&apos;absence de multi-canal sont ses principales limites.
                </p>
              </div>
            </header>

            <article>
              {/* Intro */}
              <section id="intro" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi on a teste Emelia</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Chez Ceres, on gere le cold emailing pour une dizaine de clients. Historiquement, on utilisait Lemlist sur la majorite des comptes. Ca marchait. Mais depuis 2025, plusieurs choses ont change.</p>
                    <p>D&apos;abord, Lemlist a augmente ses prix. Le plan &ldquo;Email Pro&rdquo; est passe a 69 euros par mois, et l&apos;ajout de comptes email supplementaires est devenu payant. Pour une agence qui gere 15 boites email par client, la facture monte vite. Ensuite, l&apos;interface est devenue plus complexe avec l&apos;ajout du multi-canal LinkedIn, des fonctionnalites d&apos;enrichissement, de la base de donnees B2B. Pour des clients qui ne veulent faire que de l&apos;email, c&apos;est de la complexite inutile.</p>
                    <p>On a donc decide de tester les alternatives serieusement. Emelia est un outil francais, lance en 2021 par une equipe basee a Montpellier. Leur positionnement est clair : du cold email simple, efficace, avec une delivrabilite au top et un prix agressif. Pas de LinkedIn, pas de multi-canal, pas de base de donnees integree. Juste de l&apos;email qui arrive en boite de reception.</p>
                    <p>On l&apos;a mis en production pendant 3 mois complets sur 4 campagnes outbound differentes :</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" />Un SaaS B2B qui cible des directeurs marketing (3 500 prospects)</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" />Une agence de services qui prospecte des PME (2 200 prospects)</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] mt-2 shrink-0" />Un cabinet de recrutement qui contacte des candidats passifs (1 800 prospects)</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Un promoteur immobilier qui cible des investisseurs (900 prospects)</li>
                    </ul>
                    <p>Au total, plus de 8 400 prospects contactes, 4 sequences differentes, 12 variantes testees en A/B. Voici notre retour complet.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Prise en main */}
              <section id="prise-en-main" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Prise en main et interface</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Premiere impression quand on se connecte : c&apos;est propre. L&apos;interface d&apos;Emelia est minimaliste, presque austere. Pas de tutoriels interminables, pas de pop-ups de bienvenue, pas de dashboard encombre. On arrive sur la page des campagnes et on peut commencer a travailler.</p>
                    <p>La navigation est organisee en 5 sections principales : Campagnes, Contacts, Boites email, Templates et Parametres. C&apos;est tout. Par comparaison, Lemlist a une dizaine d&apos;entrees dans son menu lateral.</p>
                    <p>Le temps de setup est rapide. Connecter une boite email prend 2 minutes (OAuth Google ou Microsoft). Importer une liste CSV, 3 minutes. Creer une premiere sequence, 10 minutes. On a pu lancer notre premiere campagne en moins d&apos;une heure apres la creation du compte.</p>
                    <p>Le seul point d&apos;attention : la documentation en ligne est legere. Pas de base de connaissances fournie comme chez Lemlist ou La Growth Machine. Si vous debutez en cold email, vous risquez de manquer de reperes sur les bonnes pratiques. Pour une equipe experimentee, c&apos;est un non-sujet.</p>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { label: "Temps de setup", value: "< 1h", icon: "horloge" },
                      { label: "Sections dans le menu", value: "5", icon: "menu" },
                      { label: "Courbe d'apprentissage", value: "Faible", icon: "courbe" },
                    ].map((m) => (
                      <div key={m.label} className="text-center p-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2]">
                        <div className="text-[18px] font-bold text-[#111]">{m.value}</div>
                        <div className="text-[10px] text-[#999] mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Features */}
              <section id="features" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les fonctionnalites cles</h2>
                  <div className="space-y-5">
                    {[
                      {
                        title: "Sequences multi-etapes",
                        desc: "Chaque campagne peut contenir jusqu'a 10 etapes. Emails initiaux, relances, conditions basees sur l'ouverture, le clic ou la reponse. L'editeur est drag-and-drop, on ajoute et reordonne les etapes facilement. On peut definir des delais personnalises entre chaque etape (en jours ou heures ouvrees).",
                        detail: "Sur nos campagnes, on a utilise des sequences de 4 a 6 etapes en moyenne. Le sweet spot qu'on a identifie : un email initial, une relance J+3 (si pas d'ouverture), une relance J+7 (si ouverture sans reponse), et un dernier email de cloture J+14. Au-dela de 6 etapes, on n'a pas constate d'amelioration du taux de reponse.",
                      },
                      {
                        title: "Rotation de boites email",
                        desc: "Fonctionnalite indispensable en 2026. Emelia permet de connecter plusieurs adresses email a une meme campagne et repartit automatiquement les envois. Ca evite de surcharger une seule boite et ameliore considerablement la delivrabilite.",
                        detail: "On recommande 3 a 5 boites email par campagne, avec un volume max de 30 emails par boite par jour. Emelia gere la rotation de facon intelligente et tient compte du warm-up de chaque boite.",
                      },
                      {
                        title: "Warm-up integre (Mailreach)",
                        desc: "Emelia a integre Mailreach directement dans la plateforme. Le warm-up demarre automatiquement quand vous connectez une nouvelle boite email. Les emails de warm-up sont echanges avec un reseau de boites reelles, ce qui construit une reputation d'expediteur solide.",
                        detail: "Le warm-up Mailreach est generalement considere comme l'un des meilleurs du marche. On recommande 2 a 3 semaines de warm-up avant de lancer une campagne sur une nouvelle boite. Emelia affiche un score de sante par boite pour savoir quand vous etes pret.",
                      },
                      {
                        title: "A/B testing natif",
                        desc: "Chaque etape d'une sequence peut avoir jusqu'a 5 variantes. Emelia repartit les envois equitablement et affiche les stats par variante : taux d'ouverture, de clic, de reponse. On peut ensuite garder la variante gagnante.",
                        detail: "Conseil : ne testez qu'une seule variable a la fois. Sujet seul, ou corps de l'email seul. Si vous changez les deux en meme temps, impossible de savoir ce qui a fait la difference.",
                      },
                      {
                        title: "Spintext et variables",
                        desc: "Le spintext permet de creer des alternatives de texte dans vos emails. Au lieu d'ecrire 'Bonjour', vous ecrivez '{Bonjour|Hello|Salut}' et Emelia choisit aleatoirement. Ca evite que tous vos emails soient identiques, ce qui est crucial pour les filtres anti-spam.",
                        detail: "Combinez le spintext avec les variables classiques (prenom, entreprise, poste) pour un maximum de personnalisation. On utilise entre 3 et 5 points de spintext par email.",
                      },
                      {
                        title: "Tracking et analytics",
                        desc: "Dashboard par campagne avec les KPI essentiels : emails envoyes, delivres, ouverts, cliques, repondus, bounces. Les stats sont mises a jour en temps reel. Pas de reporting exporte natif, mais on peut exporter les donnees en CSV.",
                        detail: "Les metriques sont fiables. On a compare les taux d'ouverture d'Emelia avec ceux mesures par un pixel de tracking externe et les ecarts etaient negligeables (moins de 2%).",
                      },
                    ].map((f) => (
                      <div key={f.title} className="pb-4 border-b border-[#F5F5F5] last:border-0 last:pb-0">
                        <h3 className="text-[14px] font-semibold text-[#111] mb-2">{f.title}</h3>
                        <p className="text-[12px] text-[#666] leading-[1.7] mb-2">{f.desc}</p>
                        <p className="text-[12px] text-[#888] leading-[1.65] italic">{f.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Deliverability */}
              <section id="deliverability" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Delivrabilite et warm-up</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>C&apos;est LE critere numero un pour un outil de cold email. Un outil peut avoir toutes les fonctionnalites du monde, si vos emails finissent en spam, c&apos;est de l&apos;argent jete par la fenetre.</p>
                    <p>Emelia envoie les emails depuis votre propre serveur SMTP (Google Workspace, Microsoft 365 ou SMTP custom). C&apos;est un avantage majeur par rapport aux outils qui envoient depuis des IP partagees. Vous gardez le controle total sur votre reputation d&apos;expediteur.</p>
                    <p>Voici nos resultats sur 3 mois, compares aux memes listes envoyees precedemment via Lemlist :</p>
                  </div>

                  {/* Detailed metrics comparison */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=emelia.io&sz=32" alt="Emelia" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Emelia (nos resultats)</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: "Taux d'ouverture", value: "62%", bar: 62, color: "#22C55E" },
                          { label: "Taux de reponse", value: "8.4%", bar: 42, color: "#4B5EFC" },
                          { label: "Taux de bounce", value: "1.2%", bar: 6, color: "#FF7A59" },
                          { label: "Taux de spam", value: "0.3%", bar: 1.5, color: "#EF4444" },
                        ].map((m) => (
                          <div key={m.label}>
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="text-[#999]">{m.label}</span>
                              <span className="font-semibold" style={{ color: m.color }}>{m.value}</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-[#F2F2F2]">
                              <div className="h-full rounded-full transition-all" style={{ width: `${m.bar}%`, background: m.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <img src="https://www.google.com/s2/favicons?domain=lemlist.com&sz=32" alt="Lemlist" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#999]">Lemlist (memes listes)</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: "Taux d'ouverture", value: "47%", bar: 47, color: "#22C55E" },
                          { label: "Taux de reponse", value: "5.1%", bar: 25, color: "#4B5EFC" },
                          { label: "Taux de bounce", value: "2.8%", bar: 14, color: "#FF7A59" },
                          { label: "Taux de spam", value: "1.1%", bar: 5.5, color: "#EF4444" },
                        ].map((m) => (
                          <div key={m.label}>
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="text-[#999]">{m.label}</span>
                              <span className="font-semibold text-[#999]">{m.value}</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-[#F2F2F2]">
                              <div className="h-full rounded-full transition-all bg-[#CCC]" style={{ width: `${m.bar}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Les chiffres parlent d&apos;eux-memes. Le delta sur le taux d&apos;ouverture (+15 points) s&apos;explique principalement par la qualite du warm-up Mailreach et le fait qu&apos;Emelia n&apos;utilise pas de tracking pixel partage.</p>
                    <p>Le warm-up integre fonctionne en 3 phases :</p>
                    <ol className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-md bg-[#F5F5F5] flex items-center justify-center text-[10px] font-bold text-[#999] shrink-0">1</span><span><strong className="text-[#111]">Phase de chauffe (J1-J7)</strong> : 5 a 10 emails de warm-up par jour, envoyes et recus depuis le reseau Mailreach</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-md bg-[#F5F5F5] flex items-center justify-center text-[10px] font-bold text-[#999] shrink-0">2</span><span><strong className="text-[#111]">Phase de montee (J7-J14)</strong> : 15 a 25 emails par jour, avec interactions (ouvertures, reponses, sortie de spam)</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-md bg-[#F5F5F5] flex items-center justify-center text-[10px] font-bold text-[#999] shrink-0">3</span><span><strong className="text-[#111]">Phase de maintien (J14+)</strong> : 30 a 40 emails par jour, la boite est consideree comme &ldquo;chaude&rdquo; et prete pour les campagnes</span></li>
                    </ol>
                    <p>Point important : le warm-up continue de tourner en parallele de vos campagnes. C&apos;est essentiel pour maintenir une bonne reputation sur le long terme.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Sequences detail */}
              <section id="sequences" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Creation de sequences : ce qui marche</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;editeur de sequences d&apos;Emelia est minimaliste mais efficace. Voici la structure qui a le mieux fonctionne sur nos 4 campagnes :</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { step: "Email 1", delay: "J0", subject: "Email initial", desc: "Court, personnalise, une seule question. Pas de lien, pas de signature longue. 3-4 lignes max.", rate: "62% ouverture", rateColor: "#22C55E" },
                      { step: "Email 2", delay: "J+3", subject: "Relance si pas d'ouverture", desc: "Meme thread, nouveau sujet. On change l'angle d'approche. Toujours court.", rate: "38% ouverture", rateColor: "#4B5EFC" },
                      { step: "Email 3", delay: "J+7", subject: "Relance si ouverture sans reponse", desc: "On apporte de la valeur : chiffre, etude de cas, resultat concret. Un peu plus long (5-6 lignes).", rate: "24% ouverture", rateColor: "#6C5CE7" },
                      { step: "Email 4", delay: "J+14", subject: "Email de cloture", desc: "'Est-ce que le sujet est toujours d'actualite ?' Court, direct, sans pression.", rate: "18% ouverture", rateColor: "#FF7A59" },
                    ].map((s, i) => (
                      <div key={s.step} className="flex gap-4 items-start">
                        <div className="w-16 shrink-0 text-center">
                          <div className="text-[10px] font-semibold text-[#999]">{s.delay}</div>
                          {i < 3 && <div className="w-px h-6 bg-[#E8E8E8] mx-auto mt-1" />}
                        </div>
                        <div className="flex-1 rounded-lg border border-[#F2F2F2] p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] font-semibold text-[#111]">{s.step} : {s.subject}</span>
                            <span className="text-[10px] font-medium" style={{ color: s.rateColor }}>{s.rate}</span>
                          </div>
                          <p className="text-[11px] text-[#888] leading-[1.6]">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Nos conseils pour des sequences performantes</p>
                    <div className="space-y-1.5">
                      {[
                        "Gardez vos emails courts : 50 a 120 mots max, pas plus",
                        "Personnalisez au moins le prenom, l'entreprise et un element specifique (actualite, recrutement, levee de fonds)",
                        "Evitez les liens dans le premier email (ca declenche les filtres anti-spam)",
                        "Utilisez du plain text, pas de HTML, pas d'images, pas de templates graphiques",
                        "Envoyez entre 8h et 10h du matin en semaine, les mardis et jeudis fonctionnent le mieux",
                        "Ne depassez pas 30 emails par boite par jour, 50 grand maximum",
                      ].map((c) => (
                        <p key={c} className="text-[11px] text-[#777] leading-[1.6] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-1.5 shrink-0" />
                          {c}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Enrichissement */}
              <section id="enrichissement" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Enrichissement et scraping LinkedIn</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Emelia propose deux fonctionnalites d&apos;enrichissement integrees :</p>

                    <div className="mt-3 space-y-3">
                      <div className="rounded-lg border border-[#F2F2F2] p-4">
                        <h3 className="text-[13px] font-semibold text-[#111] mb-2">Email Finder</h3>
                        <p className="text-[12px] text-[#777] leading-[1.65]">A partir d&apos;un prenom, nom et domaine d&apos;entreprise, Emelia trouve l&apos;adresse email professionnelle. Le taux de decouverte est correct (environ 60-65% sur nos tests) mais inferieur a des outils specialises comme Hunter.io (75%) ou Apollo (70%). La verification d&apos;email est incluse, ce qui evite les bounces sur les adresses trouvees.</p>
                      </div>

                      <div className="rounded-lg border border-[#F2F2F2] p-4">
                        <h3 className="text-[13px] font-semibold text-[#111] mb-2">Scraping LinkedIn</h3>
                        <p className="text-[12px] text-[#777] leading-[1.65]">Emelia permet de scraper des recherches LinkedIn Sales Navigator directement depuis l&apos;interface. Vous collez l&apos;URL de votre recherche, Emelia extrait les profils et tente de trouver les emails. C&apos;est pratique pour ne pas avoir a passer par un outil tiers comme Phantombuster ou Captain Data.</p>
                        <p className="text-[12px] text-[#777] leading-[1.65] mt-2">Attention : le scraping LinkedIn reste une zone grise. LinkedIn n&apos;apprecie pas et peut restreindre votre compte. Emelia utilise des proxys pour limiter les risques, mais le risque zero n&apos;existe pas.</p>
                      </div>
                    </div>

                    <p className="mt-2">Notre recommandation : utilisez l&apos;enrichissement d&apos;Emelia pour des volumes modestes (moins de 500 contacts). Pour de gros volumes, combinez avec Clay ou DropContact pour un meilleur taux de decouverte et des donnees plus fiables.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Pricing */}
              <section id="pricing" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Prix et rapport qualite/prix</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>C&apos;est la ou Emelia se demarque le plus. Le pricing est transparent, sans surprises, et significativement moins cher que les alternatives. Voici les plans au moment de notre test (mars 2026) :</p>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: "Starter", price: "37", features: ["1 boite email", "1 000 contacts actifs", "Warm-up inclus", "A/B testing", "Import CSV"], highlight: false },
                      { name: "Growth", price: "97", features: ["3 boites email", "5 000 contacts actifs", "Tout Starter +", "Rotation de boites", "Enrichissement email"], highlight: true },
                      { name: "Scale", price: "197", features: ["10 boites email", "25 000 contacts actifs", "Tout Growth +", "API access", "Support prioritaire"], highlight: false },
                    ].map((p) => (
                      <div key={p.name} className={`rounded-lg border p-4 ${p.highlight ? "border-[#6C5CE7] bg-[#6C5CE7]/[0.02]" : "border-[#F2F2F2]"}`}>
                        <div className="text-[13px] font-semibold text-[#111] mb-1">{p.name}</div>
                        <div className="flex items-baseline gap-1 mb-3">
                          <span className="text-[24px] font-bold text-[#6C5CE7]">{p.price}&#8364;</span>
                          <span className="text-[11px] text-[#999]">/mois</span>
                        </div>
                        <div className="space-y-1.5">
                          {p.features.map((f) => (
                            <p key={f} className="text-[11px] text-[#777] flex items-center gap-2">
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#22C55E] shrink-0"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              {f}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Pour mettre ces prix en perspective :</p>
                  </div>

                  <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <div className="grid grid-cols-4 gap-3 pb-3 border-b border-[#EAEAEA]">
                      <span className="text-[10px] font-semibold text-[#999]">Configuration</span>
                      <span className="text-[10px] font-semibold text-[#6C5CE7] text-center">Emelia</span>
                      <span className="text-[10px] font-semibold text-[#999] text-center">Lemlist</span>
                      <span className="text-[10px] font-semibold text-[#999] text-center">Apollo</span>
                    </div>
                    {[
                      { label: "3 boites, 5k contacts", emelia: "97 eur", lemlist: "165 eur", apollo: "99 eur" },
                      { label: "10 boites, 25k contacts", emelia: "197 eur", lemlist: "399 eur", apollo: "199 eur" },
                      { label: "Warm-up", emelia: "Inclus", lemlist: "+29 eur/boite", apollo: "Non inclus" },
                      { label: "Cout annuel (10 boites)", emelia: "2 364 eur", lemlist: "~7 200 eur", apollo: "2 388 eur" },
                    ].map((row) => (
                      <div key={row.label} className="grid grid-cols-4 gap-3 py-2 border-b border-[#F5F5F5]">
                        <span className="text-[11px] font-medium text-[#111]">{row.label}</span>
                        <span className="text-[11px] text-[#6C5CE7] font-semibold text-center">{row.emelia}</span>
                        <span className="text-[11px] text-[#999] text-center">{row.lemlist}</span>
                        <span className="text-[11px] text-[#999] text-center">{row.apollo}</span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-[13px] text-[#555] leading-[1.75]">Sur un an avec 10 boites email, la difference entre Emelia et Lemlist represente pres de 5 000 euros d&apos;economie. C&apos;est significatif, surtout pour des startups ou des agences qui gerent plusieurs comptes clients.</p>
                </div>
              </section>
              <Connector />

              {/* Integrations */}
              <section id="integrations" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Integrations CRM et outils</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>C&apos;est le point faible principal d&apos;Emelia. Les integrations natives existent mais restent basiques par rapport a la concurrence.</p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      {
                        tool: "HubSpot",
                        icon: "hubspot.com",
                        status: "Basique",
                        statusColor: "#FF7A59",
                        desc: "Synchronisation des contacts et des statuts (contacte, repondu, interesse, pas interesse). Pas de mapping avance des proprietes custom. Pas de sync des deals ou du pipeline. Pour une integration propre, il faut passer par Make ou n8n.",
                      },
                      {
                        tool: "Salesforce",
                        icon: "salesforce.com",
                        status: "Basique",
                        statusColor: "#FF7A59",
                        desc: "Integration similaire a HubSpot. Sync des contacts et des statuts. Pas de creation automatique d'opportunites ou de taches.",
                      },
                      {
                        tool: "Pipedrive",
                        icon: "pipedrive.com",
                        status: "Correct",
                        statusColor: "#22C55E",
                        desc: "L'integration Pipedrive est la plus aboutie. Sync bidirectionnelle des contacts, creation automatique d'activites, mapping de champs custom.",
                      },
                      {
                        tool: "Zapier / Make",
                        icon: "zapier.com",
                        status: "Via webhooks",
                        statusColor: "#4B5EFC",
                        desc: "Emelia supporte les webhooks sortants (nouveau contact, reponse, bounce). Ca permet de construire des automatisations avancees avec Make ou Zapier. C'est ce qu'on utilise chez Ceres pour pousser les donnees dans HubSpot.",
                      },
                    ].map((t) => (
                      <div key={t.tool} className="flex gap-3 rounded-lg border border-[#F2F2F2] p-3">
                        <img src={`https://www.google.com/s2/favicons?domain=${t.icon}&sz=32`} alt={t.tool} className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[12px] font-semibold text-[#111]">{t.tool}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${t.statusColor}15`, color: t.statusColor }}>{t.status}</span>
                          </div>
                          <p className="text-[11px] text-[#888] leading-[1.6]">{t.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FFF7ED] border border-[#FFEDD5] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Ce qu&apos;on a fait chez Ceres</p>
                    <p className="text-[11px] text-[#777] leading-[1.65]">On a construit un workflow Make qui ecoute les webhooks Emelia et synchronise les donnees dans HubSpot : creation de contact, mise a jour du statut de prospection, ajout de notes avec le contenu de la reponse, et creation d&apos;un deal quand le prospect repond positivement. Le setup prend environ 2 heures mais une fois en place, c&apos;est fiable et robuste.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Comparison */}
              <section id="vs" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Emelia vs Lemlist vs La Growth Machine vs Apollo</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>On a utilise les 4 outils en production. Voici notre comparatif honnete, critere par critere.</p>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="min-w-[500px]">
                      <div className="grid grid-cols-5 gap-2 pb-3 border-b border-[#EAEAEA]">
                        <span className="text-[10px] font-semibold text-[#999]">Critere</span>
                        <span className="text-[10px] font-semibold text-[#6C5CE7] text-center">Emelia</span>
                        <span className="text-[10px] font-semibold text-[#999] text-center">Lemlist</span>
                        <span className="text-[10px] font-semibold text-[#999] text-center">LGM</span>
                        <span className="text-[10px] font-semibold text-[#999] text-center">Apollo</span>
                      </div>
                      {[
                        { label: "Prix (entree)", emelia: "37 eur", lemlist: "69 eur", lgm: "80 eur", apollo: "49 eur" },
                        { label: "Delivrabilite", emelia: "Excellente", lemlist: "Bonne", lgm: "Bonne", apollo: "Moyenne" },
                        { label: "Multi-canal", emelia: "Email only", lemlist: "Email + LinkedIn", lgm: "Email + LinkedIn + Twitter", apollo: "Email + Appels" },
                        { label: "Integration CRM", emelia: "Basique", lemlist: "Bon", lgm: "Bon", apollo: "Excellent" },
                        { label: "Warm-up", emelia: "Inclus", lemlist: "Payant (+29 eur)", lgm: "Inclus", apollo: "Non inclus" },
                        { label: "Base de donnees B2B", emelia: "Non", lemlist: "Oui (450M)", lgm: "Non", apollo: "Oui (275M)" },
                        { label: "Enrichissement", emelia: "Basique", lemlist: "Bon", lgm: "Via integ.", apollo: "Excellent" },
                        { label: "Simplicite", emelia: "Tres simple", lemlist: "Moyen", lgm: "Complexe", apollo: "Moyen" },
                        { label: "Support", emelia: "Chat (FR)", lemlist: "Chat (EN)", lgm: "Chat (FR)", apollo: "Chat (EN)" },
                        { label: "API", emelia: "Oui", lemlist: "Oui", lgm: "Limitee", apollo: "Oui" },
                      ].map((row) => (
                        <div key={row.label} className="grid grid-cols-5 gap-2 py-2 border-b border-[#F5F5F5]">
                          <span className="text-[11px] font-medium text-[#111]">{row.label}</span>
                          <span className="text-[11px] text-[#6C5CE7] font-medium text-center">{row.emelia}</span>
                          <span className="text-[11px] text-[#999] text-center">{row.lemlist}</span>
                          <span className="text-[11px] text-[#999] text-center">{row.lgm}</span>
                          <span className="text-[11px] text-[#999] text-center">{row.apollo}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Emelia</strong> est le meilleur choix si vous faites exclusivement de l&apos;email et que le budget compte. C&apos;est notre recommandation par defaut pour les startups et les agences.</p>
                    <p><strong className="text-[#111]">Lemlist</strong> reste pertinent si vous avez besoin du multi-canal LinkedIn + email et de la base de donnees B2B integree.</p>
                    <p><strong className="text-[#111]">La Growth Machine</strong> est l&apos;outil le plus complet en multi-canal, mais aussi le plus complexe et le plus cher. Pour des equipes matures qui font du volume.</p>
                    <p><strong className="text-[#111]">Apollo</strong> est imbattable sur l&apos;enrichissement et la base de donnees B2B, avec un CRM leger integre. Moins bon sur la delivrabilite email pure.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Limites */}
              <section id="limites" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les limites qu&apos;on a rencontrees</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Apres 3 mois d&apos;utilisation intensive, voici les points de friction qu&apos;on a identifies :</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      {
                        title: "Pas de multi-canal",
                        desc: "Emelia fait de l'email et rien d'autre. Pas de LinkedIn automation, pas d'appels, pas de SMS. Si votre strategie outbound repose sur plusieurs canaux, ce n'est pas le bon outil. On le combine souvent avec La Growth Machine ou Waalaxy pour la partie LinkedIn.",
                      },
                      {
                        title: "Reporting limite",
                        desc: "Les stats par campagne sont suffisantes, mais il n'y a pas de dashboard global, pas de reporting cross-campagnes, pas d'export automatise. Pour un reporting consolide, on exporte les donnees en CSV et on les traite dans Google Sheets ou Looker Studio.",
                      },
                      {
                        title: "Integrations CRM trop basiques",
                        desc: "Comme mentionne plus haut, les integrations natives sont insuffisantes pour un setup RevOps propre. Le passage par Make ou n8n est quasi obligatoire si vous utilisez HubSpot ou Salesforce serieusement.",
                      },
                      {
                        title: "Pas de gestion d'equipe avancee",
                        desc: "Pas de roles et permissions, pas de validation de campagne, pas de vue manager. Chaque utilisateur a acces a tout. C'est un probleme pour les equipes de plus de 5 personnes ou les agences qui veulent cloisonner les acces clients.",
                      },
                      {
                        title: "Documentation legere",
                        desc: "La base de connaissances est sommaire. Pas de webinaires, pas d'academie, pas de certifications. Le support par chat est reactif (temps de reponse < 1h en semaine), mais il manque des ressources self-service.",
                      },
                    ].map((l) => (
                      <div key={l.title} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-md bg-[#FEF2F2] flex items-center justify-center shrink-0 mt-0.5">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#EF4444]"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#111] mb-1">{l.title}</p>
                          <p className="text-[12px] text-[#777] leading-[1.65]">{l.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Verdict */}
              <section id="verdict" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Verdict</span>
                  <h2 className="text-[20px] font-semibold text-white mb-4">Notre avis final apres 3 mois</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Emelia fait une chose et la fait bien : du cold email avec une delivrabilite excellente a un prix imbattable. L&apos;outil ne cherche pas a etre un couteau suisse de la prospection. C&apos;est un choix assume, et pour beaucoup d&apos;equipes c&apos;est exactement ce qu&apos;il faut.</p>
                    <p>Chez Ceres, on l&apos;a adopte pour 6 de nos 10 clients. Les 4 autres restent sur Lemlist ou LGM parce qu&apos;ils ont besoin du multi-canal LinkedIn. Pour le cold email pur, Emelia est devenu notre outil par defaut.</p>
                    <p>Le rapport qualite/prix est difficile a battre. Avec le warm-up Mailreach inclus (qui coute 29 euros par boite chez Lemlist), les economies sont substantielles. Et la delivrabilite est au rendez-vous, c&apos;est le plus important.</p>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[12px] font-semibold text-[#22C55E] mb-3">On a aime</p>
                      {[
                        "Delivrabilite excellente (62% ouverture)",
                        "Prix tres competitif (a partir de 37 eur/mois)",
                        "Warm-up Mailreach inclus",
                        "Interface simple et intuitive",
                        "Rotation de boites email native",
                        "Support reactif et en francais",
                        "A/B testing jusqu'a 5 variantes",
                      ].map((p) => (
                        <div key={p} className="flex items-center gap-2 text-[11px] text-white/50 mb-2">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#22C55E] shrink-0"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{p}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-[#EF4444] mb-3">A ameliorer</p>
                      {[
                        "Integrations CRM trop basiques",
                        "Pas de multi-canal (LinkedIn, appels)",
                        "Reporting limite, pas de dashboard global",
                        "Pas de gestion d'equipe avancee",
                        "Documentation et ressources legeres",
                        "Enrichissement email moyen (60-65%)",
                      ].map((p) => (
                        <div key={p} className="flex items-center gap-2 text-[11px] text-white/50 mb-2">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#EF4444] shrink-0"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>{p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Pour qui */}
              <section id="pour-qui" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pour qui Emelia est fait</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-lg bg-[#F0FDF4] p-4">
                      <p className="text-[12px] font-semibold text-[#22C55E] mb-3">Ideal pour</p>
                      {[
                        "Startups et PME qui font du cold email pur",
                        "Equipes commerciales de 1 a 5 personnes",
                        "Agences qui gerent plusieurs comptes clients",
                        "Freelances SDR qui prospectent pour leurs clients",
                        "Equipes avec un budget outbound limite",
                        "Entreprises qui utilisent deja un outil tiers pour LinkedIn",
                      ].map((i) => (
                        <p key={i} className="text-[11px] text-[#555] mb-2 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-lg bg-[#FEF2F2] p-4">
                      <p className="text-[12px] font-semibold text-[#EF4444] mb-3">Pas adapte si</p>
                      {[
                        "Vous avez besoin de LinkedIn automation integre",
                        "L'integration CRM native est critique pour vous",
                        "Vous voulez du reporting avance multi-campagnes",
                        "Vous gerez une equipe de plus de 10 SDR",
                        "Vous cherchez un outil all-in-one avec base B2B",
                        "Vous avez besoin de gestion de roles et permissions",
                      ].map((i) => (
                        <p key={i} className="text-[11px] text-[#555] mb-2 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Notre recommandation</p>
                    <p className="text-[12px] text-[#777] leading-[1.65]">Si vous faites du cold email et que votre budget est un critere, testez Emelia. Le plan Starter a 37 euros par mois vous permet de valider l&apos;outil sur une vraie campagne. Si vous avez besoin de connecter Emelia a HubSpot ou Salesforce de facon poussee, prevoyez un workflow Make/n8n ou faites-vous accompagner par une equipe RevOps.</p>
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
                    <p className="text-[12px] font-semibold text-[#111] leading-[1.4] group-hover:text-[#6C5CE7] transition-colors">{a.title}</p>
                    <p className="text-[10px] text-[#999] mt-2">{a.category}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section>
              <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide avec votre stack outbound ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[450px] mx-auto">On configure et connecte vos outils de prospection a votre CRM. Emelia, Lemlist, Clay, Apollo, HubSpot. Setup complet en moins de 2 semaines.</p>
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
