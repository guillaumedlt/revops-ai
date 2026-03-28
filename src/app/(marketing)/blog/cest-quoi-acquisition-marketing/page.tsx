"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "C&apos;est quoi l&apos;acquisition en marketing ? Guide complet",
  description: "Guide complet sur l&apos;acquisition marketing : definition, canaux (SEO, SEA, outbound, referral), metriques (CAC, LTV, payback period) et strategie pour structurer votre croissance.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-02-01",
  dateModified: "2026-02-01",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/cest-quoi-acquisition-marketing" },
  articleSection: "RevOps",
  wordCount: 2800,
  inLanguage: "fr",
};

const sections = [
  { id: "definition", title: "Definition" },
  { id: "acquisition-vs-retention", title: "Acquisition vs Retention" },
  { id: "canaux", title: "Les canaux d&apos;acquisition" },
  { id: "metriques", title: "Les metriques cles" },
  { id: "strategie", title: "Construire sa strategie" },
  { id: "b2b-vs-b2c", title: "B2B vs B2C" },
  { id: "erreurs", title: "Erreurs classiques" },
  { id: "revops", title: "Acquisition et RevOps" },
  { id: "outils", title: "La stack acquisition" },
  { id: "approche-ceres", title: "Notre approche" },
];

const relatedArticles = [
  { title: "Account-Based Marketing : le guide complet ABM", slug: "account-based-marketing-guide", category: "RevOps", color: "#FF7A59" },
  { title: "9 actions commerciales a automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "Automatisation", color: "#6C5CE7" },
  { title: "Comparatif des outils de generation de leads", slug: "comparatif-outils-generation-leads-enrichissement", category: "Process & Outils", color: "#4B5EFC" },
];

export default function AcquisitionMarketingGuidePage() {
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
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "25%", width: 280, height: 280, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "45%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "65%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "85%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.07, filter: "blur(70px)" }} />

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
              <span className="text-[#666]">Acquisition marketing</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>RevOps</Badge>
                <span className="text-[11px] text-[#CCC]">13 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                C&apos;est quoi l&apos;acquisition en marketing ? Guide complet
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                L&apos;acquisition marketing, c&apos;est l&apos;ensemble des actions qui permettent d&apos;attirer de nouveaux clients vers votre entreprise. Canaux, metriques, strategie, outils : ce guide couvre tout ce qu&apos;il faut savoir pour construire une machine d&apos;acquisition performante et rentable.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>1 fevrier 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 — Definition */}
              <section id="definition" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Qu&apos;est-ce que l&apos;acquisition marketing</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;acquisition marketing designe l&apos;ensemble des strategies, canaux et actions mis en place pour attirer de nouveaux prospects et les convertir en clients. C&apos;est le premier maillon de la chaine de croissance : sans acquisition, pas de revenus, pas d&apos;entreprise.</p>
                    <p>En termes simples, l&apos;acquisition repond a une question fondamentale : comment faire en sorte que des personnes qui ne vous connaissent pas deviennent vos clients ? Cela passe par la visibilite (se faire connaitre), l&apos;engagement (capter l&apos;attention), la conversion (transformer l&apos;interet en action) et la monetisation (generer du revenu).</p>
                    <p>L&apos;acquisition n&apos;est pas synonyme de marketing au sens large. Le marketing couvre aussi la notoriete de marque, le positionnement, la retention client ou la communication institutionnelle. L&apos;acquisition se concentre specifiquement sur la generation de nouveaux clients. C&apos;est une composante du marketing, orientee resultats et directement liee au chiffre d&apos;affaires.</p>
                    <p>Dans un contexte B2B, l&apos;acquisition marketing est souvent etroitement liee aux operations commerciales. Les equipes marketing generent des leads qualifies (MQL), les transmettent aux commerciaux qui les transforment en opportunites (SQL) puis en clients. Cette chaine acquisition-conversion est au coeur de toute strategie RevOps.</p>
                  </div>

                  {/* Funnel visual */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-4">L&apos;entonnoir d&apos;acquisition simplifie</p>
                    <div className="space-y-2">
                      {[
                        { step: "Visibilite", desc: "Se faire connaitre aupres de la cible", color: "#FF7A59", width: "100%" },
                        { step: "Engagement", desc: "Capter l&apos;attention et susciter l&apos;interet", color: "#FF7A59", width: "80%" },
                        { step: "Conversion", desc: "Transformer le visiteur en lead ou en client", color: "#FF7A59", width: "60%" },
                        { step: "Monetisation", desc: "Generer du revenu a partir du nouveau client", color: "#FF7A59", width: "40%" },
                      ].map((s) => (
                        <div key={s.step} className="flex items-center gap-3">
                          <div className="rounded-lg p-3 border border-[#EAEAEA] bg-white" style={{ width: s.width }}>
                            <p className="text-[11px] font-semibold" style={{ color: s.color }}>{s.step}</p>
                            <p className="text-[10px] text-[#999] mt-0.5">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 — Acquisition vs Retention vs Activation */}
              <section id="acquisition-vs-retention" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Acquisition vs Retention vs Activation</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Ces trois termes sont souvent confondus, pourtant ils designent des etapes tres differentes du cycle de vie client. Les comprendre est essentiel pour allouer vos budgets correctement.</p>
                    <p>L&apos;acquisition, c&apos;est attirer de nouveaux clients. La retention, c&apos;est les garder. L&apos;activation, c&apos;est transformer un utilisateur passif en utilisateur actif qui tire de la valeur de votre produit ou service. Les trois sont necessaires a une croissance saine.</p>
                    <p>Une erreur frequente est de surinvestir en acquisition au detriment de la retention. Or, acquerir un nouveau client coute en moyenne 5 a 7 fois plus cher que de retenir un client existant. Les entreprises les plus performantes construisent un equilibre entre les trois. L&apos;acquisition alimente la croissance, l&apos;activation transforme les leads en utilisateurs engages, et la retention maximise la valeur dans le temps.</p>
                    <p>En SaaS B2B, l&apos;equation est particulierement critique. Un taux de churn eleve annule les efforts d&apos;acquisition : vous remplissez un seau perce. Avant de doubler votre budget acquisition, verifiez que votre retention est solide. Un bon ratio LTV/CAC (superieur a 3) indique que l&apos;equilibre est sain.</p>
                  </div>

                  {/* Comparison table */}
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-[12px]">
                      <thead>
                        <tr className="border-b border-[#EAEAEA]">
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Critere</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Acquisition</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Activation</th>
                          <th className="text-left py-3 text-[#999] font-medium">Retention</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#555]">
                        {[
                          ["Objectif", "Attirer de nouveaux clients", "Engager les nouveaux utilisateurs", "Garder les clients existants"],
                          ["Metrique cle", "CAC, taux de conversion", "Time-to-value, activation rate", "Churn rate, NRR"],
                          ["Cout relatif", "Eleve (5-7x)", "Modere", "Faible (1x)"],
                          ["Impact revenu", "Croissance du volume", "Adoption et usage", "Stabilite et expansion"],
                          ["Horizon", "Court terme", "Court a moyen terme", "Long terme"],
                        ].map(([critere, acq, act, ret]) => (
                          <tr key={critere} className="border-b border-[#F5F5F5]">
                            <td className="py-2.5 pr-4 font-medium text-[#111]">{critere}</td>
                            <td className="py-2.5 pr-4">{acq}</td>
                            <td className="py-2.5 pr-4">{act}</td>
                            <td className="py-2.5">{ret}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 — Les canaux d&apos;acquisition */}
              <section id="canaux" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les canaux d&apos;acquisition : panorama complet</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Il n&apos;existe pas de canal magique qui fonctionne pour toutes les entreprises. Le bon canal depend de votre cible, de votre produit, de votre budget et de votre capacite d&apos;execution. Voici les principaux canaux, avec leurs forces et leurs limites.</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    {[
                      {
                        name: "SEO (referencement naturel)",
                        type: "Organique",
                        color: "#22C55E",
                        desc: "Optimiser votre site pour apparaitre dans les resultats de recherche Google. Le SEO est un canal d&apos;acquisition a moyen-long terme : il faut 4 a 12 mois pour voir des resultats, mais une fois positionne, le trafic est gratuit et stable. C&apos;est le canal le plus rentable a long terme pour la majorite des entreprises B2B.",
                        pros: "Cout marginal faible, trafic recurrent, credibilite",
                        cons: "Long a mettre en place, concurrence forte, dependance a Google",
                      },
                      {
                        name: "SEA / Google Ads",
                        type: "Paid",
                        color: "#4B5EFC",
                        desc: "Acheter de la visibilite sur les moteurs de recherche via des annonces payantes. Le SEA permet d&apos;obtenir des resultats immediats et de cibler des intentions de recherche precises. C&apos;est le canal ideal pour tester un marche ou capturer une demande existante. Attention au cout par clic qui augmente chaque annee.",
                        pros: "Resultats immediats, ciblage par intention, mesurable",
                        cons: "Cout croissant, pas d&apos;effet cumule, necessite une expertise",
                      },
                      {
                        name: "Social Ads (LinkedIn, Meta, TikTok)",
                        type: "Paid",
                        color: "#4B5EFC",
                        desc: "Diffuser des publicites sur les reseaux sociaux pour toucher votre audience. LinkedIn Ads est le canal paid dominant en B2B grace a son ciblage par poste, secteur et entreprise. Meta (Facebook/Instagram) fonctionne mieux en B2C mais peut marcher en B2B pour certains segments. TikTok Ads emerge pour les audiences plus jeunes.",
                        pros: "Ciblage demographique precis, format visuel, notoriete + conversion",
                        cons: "CPM eleve (surtout LinkedIn), fatigue publicitaire, volume limite en B2B",
                      },
                      {
                        name: "Content Marketing",
                        type: "Organique",
                        color: "#22C55E",
                        desc: "Creer et distribuer du contenu de valeur (articles, guides, videos, podcasts) pour attirer votre audience cible. Le content marketing est le moteur du SEO et de la credibilite. Il alimente aussi les sequences email et les reseaux sociaux. C&apos;est un investissement a long terme qui construit un actif durable.",
                        pros: "Construit l&apos;autorite, alimente tous les autres canaux, cout marginal decroissant",
                        cons: "Necessite consistance, resultats lents, qualite exigeante",
                      },
                      {
                        name: "Cold Email / Outbound",
                        type: "Outbound",
                        color: "#FF7A59",
                        desc: "Prospecter activement par email des contacts qui ne vous connaissent pas encore. L&apos;outbound email est un pilier de l&apos;acquisition B2B. Bien execute (sequences personnalisees, ciblage precis, proposition de valeur claire), il permet de generer des rendez-vous qualifies de maniere previsible. Mal execute, il detruit votre reputation d&apos;expediteur.",
                        pros: "Previsible, scalable, controle du volume, acces direct aux decideurs",
                        cons: "Delivrabilite fragile, necessite des outils specialises, reglementation RGPD",
                      },
                      {
                        name: "LinkedIn (organique)",
                        type: "Organique",
                        color: "#22C55E",
                        desc: "Publier du contenu et interagir sur LinkedIn pour developper votre audience professionnelle. En B2B, LinkedIn est le reseau social numero un pour la visibilite et la generation de leads. Les posts a forte valeur ajoutee, les commentaires strategiques et les messages directs constituent un canal d&apos;acquisition puissant et gratuit.",
                        pros: "Gratuit, acces direct aux decideurs B2B, personal branding",
                        cons: "Chronophage, resultats variables, algorithme imprevisible",
                      },
                      {
                        name: "Partenariats et affiliation",
                        type: "Partenariat",
                        color: "#6C5CE7",
                        desc: "Collaborer avec des entreprises complementaires ou des affilies pour acceder a leur audience. Les partenariats strategiques permettent de beneficier de la confiance deja etablie entre le partenaire et son audience. L&apos;affiliation repose sur un modele de commission : vous payez uniquement pour les clients effectivement apportes.",
                        pros: "Cout a la performance, acces a de nouvelles audiences, credibilite par association",
                        cons: "Moins de controle, complexite contractuelle, dependance au partenaire",
                      },
                      {
                        name: "Referral / Bouche-a-oreille",
                        type: "Organique",
                        color: "#22C55E",
                        desc: "Encourager vos clients satisfaits a recommander votre produit ou service a leur reseau. C&apos;est le canal d&apos;acquisition le plus puissant en termes de confiance et de taux de conversion. Un prospect recommande par un pair a 4 fois plus de chances de devenir client. Les programmes de parrainage structurent ce mecanisme.",
                        pros: "Cout tres faible, confiance maximale, taux de conversion eleve",
                        cons: "Difficile a scaler, imprevisible, depend de la satisfaction client",
                      },
                      {
                        name: "Evenements (physiques et webinaires)",
                        type: "Mixte",
                        color: "#6C5CE7",
                        desc: "Organiser ou participer a des evenements pour rencontrer vos prospects. Les salons professionnels, les conferences et les webinaires restent des canaux d&apos;acquisition efficaces en B2B, surtout pour les ventes complexes. Le contact humain cree un niveau de confiance difficile a reproduire en digital.",
                        pros: "Relation humaine, qualification immediate, impact fort",
                        cons: "Cout eleve (surtout physique), difficilement scalable, logistique lourde",
                      },
                    ].map((channel) => (
                      <div key={channel.name} className="p-5 rounded-lg border border-[#F0F0F0] bg-[#FAFAFA]">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: channel.color }} />
                          <span className="text-[14px] font-semibold text-[#111]">{channel.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#EAEAEA] bg-white text-[#999] ml-auto">{channel.type}</span>
                        </div>
                        <p className="text-[12px] text-[#666] leading-[1.7] mb-3">{channel.desc}</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <div className="flex-1 p-2.5 rounded-lg bg-white border border-[#EAEAEA]">
                            <p className="text-[10px] font-semibold text-[#22C55E] mb-1">Avantages</p>
                            <p className="text-[10px] text-[#777] leading-[1.5]">{channel.pros}</p>
                          </div>
                          <div className="flex-1 p-2.5 rounded-lg bg-white border border-[#EAEAEA]">
                            <p className="text-[10px] font-semibold text-[#EF4444] mb-1">Limites</p>
                            <p className="text-[10px] text-[#777] leading-[1.5]">{channel.cons}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 — Metriques cles */}
              <section id="metriques" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les metriques cles de l&apos;acquisition</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Sans metriques, l&apos;acquisition est un exercice a l&apos;aveugle. Vous devez mesurer chaque canal, chaque campagne et chaque euro depense pour identifier ce qui fonctionne et ce qui doit etre arrete. Voici les metriques incontournables.</p>
                  </div>

                  {/* Metrics dashboard */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        metric: "CAC",
                        fullName: "Cout d&apos;Acquisition Client",
                        formula: "Depenses marketing + sales / Nombre de nouveaux clients",
                        benchmark: "Varie par secteur. En SaaS B2B, un CAC de 200 a 1 500 EUR est courant.",
                        color: "#FF7A59",
                        desc: "Le CAC mesure combien il vous coute en moyenne d&apos;acquerir un nouveau client. C&apos;est la metrique fondamentale. Un CAC trop eleve par rapport a la valeur du client signifie que votre modele n&apos;est pas viable. Incluez tous les couts : salaires marketing et sales, outils, publicite, contenu, evenements.",
                      },
                      {
                        metric: "LTV",
                        fullName: "Lifetime Value (valeur vie client)",
                        formula: "Revenu moyen par client x Duree moyenne de la relation",
                        benchmark: "En SaaS B2B, visez un ratio LTV/CAC superieur a 3.",
                        color: "#4B5EFC",
                        desc: "La LTV represente le revenu total qu&apos;un client genere pendant toute sa relation avec votre entreprise. C&apos;est la metrique qui determine combien vous pouvez investir en acquisition. Si votre LTV est de 3 000 EUR, vous pouvez depenser jusqu&apos;a 1 000 EUR pour acquerir un client et rester rentable.",
                      },
                      {
                        metric: "LTV/CAC",
                        fullName: "Ratio Lifetime Value / CAC",
                        formula: "LTV / CAC",
                        benchmark: "< 1 : modele non viable. 1-3 : fragile. > 3 : sain. > 5 : sous-investissement probable.",
                        color: "#22C55E",
                        desc: "Le ratio LTV/CAC est le juge de paix de votre acquisition. Il vous dit si chaque euro investi en acquisition genere suffisamment de valeur. Un ratio inferieur a 3 signale un probleme : soit votre CAC est trop eleve, soit votre LTV est trop faible (churn, panier moyen insuffisant).",
                      },
                      {
                        metric: "Payback Period",
                        fullName: "Delai de recuperation du CAC",
                        formula: "CAC / Revenu mensuel par client",
                        benchmark: "En SaaS B2B, visez moins de 12 mois. Moins de 6 mois est excellent.",
                        color: "#6C5CE7",
                        desc: "Le payback period mesure le temps necessaire pour recuperer le cout d&apos;acquisition d&apos;un client. Plus il est court, plus votre tresorerie est saine. Un payback period de 18 mois signifie que vous financez 18 mois d&apos;acquisition avant de commencer a generer du profit sur chaque client.",
                      },
                    ].map((m) => (
                      <div key={m.metric} className="p-5 rounded-lg border border-[#F0F0F0] bg-[#FAFAFA]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: m.color }} />
                          <span className="text-[16px] font-bold" style={{ color: m.color }}>{m.metric}</span>
                        </div>
                        <p className="text-[11px] font-semibold text-[#111] mb-2">{m.fullName}</p>
                        <p className="text-[11px] text-[#666] leading-[1.6] mb-3">{m.desc}</p>
                        <div className="p-2.5 rounded-lg bg-white border border-[#EAEAEA] mb-2">
                          <p className="text-[10px] text-[#999] mb-0.5">Formule</p>
                          <p className="text-[10px] font-mono text-[#111]">{m.formula}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-[#EAEAEA]">
                          <p className="text-[10px] text-[#999] mb-0.5">Benchmark</p>
                          <p className="text-[10px] text-[#111]">{m.benchmark}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Conversion rate par canal */}
                  <div className="mt-6 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-4">Taux de conversion moyens par canal (B2B)</p>
                    <div className="space-y-2.5">
                      {[
                        { canal: "Referral", taux: "3.6%", bar: "90%" },
                        { canal: "SEO", taux: "2.8%", bar: "70%" },
                        { canal: "LinkedIn organique", taux: "2.4%", bar: "60%" },
                        { canal: "Google Ads", taux: "2.0%", bar: "50%" },
                        { canal: "Cold email", taux: "1.5%", bar: "38%" },
                        { canal: "LinkedIn Ads", taux: "1.2%", bar: "30%" },
                        { canal: "Social Ads (Meta)", taux: "0.8%", bar: "20%" },
                      ].map((c) => (
                        <div key={c.canal} className="flex items-center gap-3">
                          <span className="text-[11px] text-[#666] w-[130px] shrink-0">{c.canal}</span>
                          <div className="flex-1 h-2 bg-[#E8E8E8] rounded-full overflow-hidden">
                            <div className="h-full bg-[#FF7A59] rounded-full" style={{ width: c.bar }} />
                          </div>
                          <span className="text-[11px] font-semibold text-[#111] w-[40px] text-right">{c.taux}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-[#999] mt-3 italic">Sources : First Page Sage, HubSpot Benchmarks 2025. Taux visiteur-to-lead, variables selon les secteurs.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 — Construire sa strategie */}
              <section id="strategie" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Construire sa strategie d&apos;acquisition en 6 etapes</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Une strategie d&apos;acquisition ne se resume pas a ouvrir un compte Google Ads et voir ce qui se passe. C&apos;est un processus structure qui part de vos objectifs business et descend jusqu&apos;a l&apos;execution operationnelle. Voici les 6 etapes.</p>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      {
                        num: "01",
                        title: "Definir vos objectifs et votre budget",
                        desc: "Combien de nouveaux clients devez-vous acquerir ce trimestre pour atteindre vos objectifs de revenu ? Quel est votre CAC cible ? Quel budget total pouvez-vous allouer a l&apos;acquisition ? Ces chiffres cadrent tout le reste. Sans objectifs chiffres, vous ne pourrez pas mesurer le succes ni ajuster en cours de route.",
                      },
                      {
                        num: "02",
                        title: "Identifier votre cible (ICP et persona)",
                        desc: "Qui sont vos clients ideaux ? Definissez votre ICP (Ideal Customer Profile) au niveau de l&apos;entreprise : secteur, taille, maturite, budget. Puis construisez vos buyer personas : role, enjeux, motivations, objections. La precision de votre ciblage determine l&apos;efficacite de tous vos canaux.",
                      },
                      {
                        num: "03",
                        title: "Selectionner 2 a 3 canaux prioritaires",
                        desc: "Ne dispersez pas vos ressources sur 8 canaux en meme temps. Choisissez 2 a 3 canaux en fonction de votre cible (ou elle est), de votre budget (paid vs organique), et de vos competences internes. Maitrisez-les avant d&apos;en ajouter de nouveaux. Un canal bien execute vaut mieux que cinq canaux mediocres.",
                      },
                      {
                        num: "04",
                        title: "Creer votre contenu et vos assets",
                        desc: "Chaque canal necessite des assets specifiques. Le SEO demande des articles optimises. Google Ads demande des landing pages de conversion. L&apos;outbound demande des sequences email et des propositions de valeur. LinkedIn demande du contenu engageant. Construisez vos assets avant de lancer vos campagnes.",
                      },
                      {
                        num: "05",
                        title: "Mettre en place le tracking et les metriques",
                        desc: "Avant de depenser un seul euro, assurez-vous que vous pouvez mesurer les resultats. Configurez votre CRM (proprietes UTM, sources de leads, attribution). Installez le suivi de conversions sur votre site. Definissez vos KPI par canal. Sans tracking, vous investissez a l&apos;aveugle.",
                      },
                      {
                        num: "06",
                        title: "Lancer, mesurer, iterer",
                        desc: "Lancez vos campagnes avec des budgets modestes. Mesurez les resultats chaque semaine. Identifiez ce qui fonctionne (taux de conversion, cout par lead, qualite des leads). Doublez ce qui marche, coupez ce qui ne marche pas. L&apos;acquisition est un processus iteratif, pas un coup unique.",
                      },
                    ].map((step) => (
                      <div key={step.num} className="flex items-start gap-3 p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <span className="text-[18px] font-bold text-[#FF7A59] shrink-0">{step.num}</span>
                        <div>
                          <p className="text-[12px] font-semibold text-[#111] mb-1">{step.title}</p>
                          <p className="text-[11px] text-[#777] leading-[1.6]">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 — B2B vs B2C */}
              <section id="b2b-vs-b2c" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Acquisition B2B vs B2C : les differences</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;acquisition ne se pratique pas de la meme maniere en B2B et en B2C. Les cycles de vente, les decideurs, les canaux efficaces et les metriques pertinentes different fondamentalement. Comprendre ces differences evite d&apos;appliquer des recettes B2C a un contexte B2B, et inversement.</p>
                  </div>

                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-[12px]">
                      <thead>
                        <tr className="border-b border-[#EAEAEA]">
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Critere</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">B2B</th>
                          <th className="text-left py-3 text-[#999] font-medium">B2C</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#555]">
                        {[
                          ["Cycle de vente", "1 a 12 mois", "Minutes a quelques jours"],
                          ["Decideurs", "Comite d&apos;achat (3-10 personnes)", "Individu ou menage"],
                          ["Panier moyen", "1 000 a 100 000+ EUR", "10 a 500 EUR"],
                          ["Canaux dominants", "SEO, LinkedIn, Outbound, Events", "Social Ads, SEO, Influenceurs"],
                          ["Decision d&apos;achat", "Rationnelle, ROI, comparaison", "Emotionnelle, impulsive, sociale"],
                          ["Volume de leads", "Faible, haute qualite", "Eleve, qualification apres"],
                          ["Relation post-vente", "Account management, upsell", "Automatisee, self-service"],
                          ["CAC typique", "200 a 5 000 EUR", "5 a 100 EUR"],
                        ].map(([critere, b2b, b2c]) => (
                          <tr key={critere} className="border-b border-[#F5F5F5]">
                            <td className="py-2.5 pr-4 font-medium text-[#111]">{critere}</td>
                            <td className="py-2.5 pr-4">{b2b}</td>
                            <td className="py-2.5">{b2c}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>En B2B, l&apos;acquisition est un processus long qui implique de la confiance, de l&apos;education et de multiples touchpoints. Le contenu expert (guides, etudes de cas, webinaires) joue un role central pour etablir la credibilite. L&apos;alignement entre marketing et sales est indispensable pour transformer les leads en clients.</p>
                    <p>En B2C, le volume et la rapidite priment. Les publicites visuelles, les promotions et les mecanismes viraux sont les leviers principaux. La decision d&apos;achat est souvent emotionnelle et le cycle court. L&apos;acquisition B2C repose davantage sur l&apos;optimisation de funnels automatises et le testing a grande echelle.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 — Erreurs classiques */}
              <section id="erreurs" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les erreurs classiques en acquisition</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Apres avoir travaille avec des dizaines d&apos;entreprises B2B sur leur strategie d&apos;acquisition, voici les erreurs que nous observons le plus frequemment.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { num: "01", title: "Se disperser sur trop de canaux", desc: "Vouloir etre present partout en meme temps, c&apos;est etre mediocre partout. Mieux vaut maitriser 2 canaux que survoler 8. Concentrez vos ressources, obtenez des resultats, puis elargissez progressivement." },
                      { num: "02", title: "Ne pas mesurer le CAC par canal", desc: "Connaitre votre CAC global ne suffit pas. Vous devez savoir combien coute un client acquis via Google Ads, via LinkedIn, via l&apos;outbound. Sans cette granularite, vous ne pouvez pas optimiser votre mix." },
                      { num: "03", title: "Ignorer la qualite des leads", desc: "Generer 500 leads par mois ne sert a rien si 95% ne sont pas qualifies. Le volume flatte l&apos;ego mais c&apos;est le revenu qui compte. Mesurez le taux de conversion lead-to-client, pas juste le nombre de leads." },
                      { num: "04", title: "Pas de tracking en place avant de lancer", desc: "Lancer des campagnes sans tracking, c&apos;est jeter de l&apos;argent par la fenetre. Configurez vos UTM, votre CRM, votre attribution avant de depenser. Chaque lead doit etre tracable jusqu&apos;a sa source." },
                      { num: "05", title: "Copier la strategie d&apos;un concurrent", desc: "Ce qui fonctionne pour une entreprise ne fonctionnera pas forcement pour vous. Votre cible, votre produit, vos ressources et votre marque sont differents. Inspirez-vous, mais testez et adaptez a votre contexte." },
                      { num: "06", title: "Sous-estimer le temps du SEO", desc: "Attendre des resultats SEO en 30 jours, c&apos;est se condamner a l&apos;abandon premature. Le SEO est un investissement a 6-12 mois. Planifiez en consequence et combinez avec des canaux a resultats rapides (ads, outbound) en attendant." },
                      { num: "07", title: "Oublier l&apos;alignement marketing-sales", desc: "En B2B, le marketing genere des leads que les commerciaux doivent convertir. Si les deux equipes ne partagent pas la meme definition d&apos;un lead qualifie, le resultat est un pipeline de leads non traites et des commerciaux frustres." },
                    ].map((err) => (
                      <div key={err.num} className="flex items-start gap-3 p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <span className="text-[18px] font-bold text-[#E8E8E8] shrink-0">{err.num}</span>
                        <div>
                          <p className="text-[12px] font-semibold text-[#111] mb-1">{err.title}</p>
                          <p className="text-[11px] text-[#777] leading-[1.6]">{err.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 — Acquisition et RevOps */}
              <section id="revops" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">RevOps</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Acquisition et RevOps : structurer pour scaler</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Le RevOps (Revenue Operations) est l&apos;approche qui consiste a aligner les operations marketing, sales et customer success autour d&apos;un objectif commun : la croissance du revenu. L&apos;acquisition est la premiere brique de cette chaine.</p>
                    <p>Sans RevOps, l&apos;acquisition fonctionne en silo. Le marketing genere des leads sans savoir ce qui se passe apres. Les commerciaux reclaiment plus de leads sans feed-back sur la qualite. Le service client decouvre des clients mal qualifies qui churnent rapidement. Le resultat : du gaspillage a chaque etape.</p>
                    <p>Avec une approche RevOps, l&apos;acquisition est integree dans un systeme global. Le CRM est la source unique de verite. Chaque lead est trace de sa source jusqu&apos;au revenu genere. Les metriques sont partagees entre les equipes. Le feedback boucle : le service client remonte les profils qui churnent, le marketing ajuste son ciblage, les commerciaux affinent leurs criteres de qualification.</p>
                    <p>Concretement, structurer son acquisition en mode RevOps implique plusieurs choses : un CRM propre et bien configure (proprietes, lifecycle stages, pipelines), un modele d&apos;attribution clair (first touch, last touch, multi-touch), des SLA entre marketing et sales (definition d&apos;un MQL, delai de traitement, feedback), et un reporting unifie qui mesure le revenu, pas juste les leads.</p>
                    <p>Les entreprises qui adoptent une approche RevOps voient en moyenne une augmentation de 19% de leur vitesse de croissance et une reduction de 10% de leur CAC, selon les donnees de Forrester. Le gain vient de l&apos;elimination des frictions entre les equipes et de la meilleure allocation des ressources.</p>
                  </div>

                  {/* RevOps pillars */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { pillar: "Marketing Ops", items: "Attribution, tracking, scoring, nurturing, reporting campagnes", color: "#FF7A59" },
                      { pillar: "Sales Ops", items: "Pipeline management, SLA, qualification, previsions, coaching", color: "#4B5EFC" },
                      { pillar: "CS Ops", items: "Onboarding, health score, churn prevention, expansion, NPS", color: "#22C55E" },
                    ].map((p) => (
                      <div key={p.pillar} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: p.color }} />
                          <p className="text-[12px] font-semibold text-white">{p.pillar}</p>
                        </div>
                        <p className="text-[10px] text-white/40 leading-[1.5]">{p.items}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 — Les outils de la stack acquisition */}
              <section id="outils" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les outils de la stack acquisition</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La stack d&apos;acquisition est l&apos;ensemble des outils que vous utilisez pour executer, mesurer et optimiser votre acquisition. Le choix des outils depend de vos canaux prioritaires, de votre budget et de votre niveau de maturite. Voici les incontournables.</p>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      {
                        tool: "HubSpot",
                        category: "CRM & Marketing Automation",
                        color: "#FF7A59",
                        desc: "Le socle de votre stack acquisition. HubSpot centralise vos contacts, trace les interactions, automatise le nurturing et fournit le reporting. En B2B, c&apos;est l&apos;outil qui connecte le marketing a la vente. Le Marketing Hub gere vos landing pages, formulaires, emails et workflows. Le CRM gratuit suffit pour demarrer, les hubs payants sont necessaires pour scaler.",
                        useCase: "CRM central, tracking des leads, attribution, email marketing, reporting",
                      },
                      {
                        tool: "Google Ads",
                        category: "Search & Display Advertising",
                        color: "#4B5EFC",
                        desc: "La plateforme publicitaire de Google pour le search (mots-cles), le display (banniers) et YouTube. En acquisition B2B, Google Ads est surtout utilise pour capturer la demande existante : quand un prospect cherche votre type de solution, votre annonce apparait. Le search a le meilleur taux de conversion mais le cout par clic augmente chaque annee.",
                        useCase: "Captation de demande, tests de marche, remarketing, generation de leads",
                      },
                      {
                        tool: "LinkedIn Ads",
                        category: "Social Advertising B2B",
                        color: "#6C5CE7",
                        desc: "La plateforme publicitaire de LinkedIn, incontournable en B2B. Son principal atout : le ciblage par poste, fonction, anciennete, entreprise et secteur. Aucun autre canal publicitaire n&apos;offre cette precision en B2B. Les formats Sponsored Content, Message Ads et Document Ads sont les plus efficaces. Le CPM est eleve (30 a 80 EUR) mais la qualite des leads est superieure.",
                        useCase: "Ciblage de decideurs B2B, ABM paid, notoriete, generation de leads qualifies",
                      },
                      {
                        tool: "Clay",
                        category: "Enrichissement & Automatisation",
                        color: "#22C55E",
                        desc: "Clay est une plateforme d&apos;enrichissement et d&apos;automatisation des donnees de prospection. Elle agregue des informations de dizaines de sources (LinkedIn, Clearbit, Apollo, sites web) pour construire des listes de prospects enrichies. Clay permet aussi d&apos;automatiser des workflows de recherche et de personnalisation a l&apos;echelle.",
                        useCase: "Enrichissement de leads, construction de listes, personnalisation outbound, scoring",
                      },
                      {
                        tool: "Lemlist",
                        category: "Cold Email & Sequences",
                        color: "#FF7A59",
                        desc: "Lemlist est un outil de cold emailing concu pour la prospection B2B. Il gere la creation de sequences multi-etapes (email, LinkedIn, appel), la personalisation dynamique, le suivi des ouvertures et clics, et la gestion de la delivrabilite. Son integration avec les principaux CRM (dont HubSpot) permet de synchroniser les donnees de prospection.",
                        useCase: "Sequences outbound, cold email, prospection LinkedIn, suivi de delivrabilite",
                      },
                    ].map((t) => (
                      <div key={t.tool} className="p-5 rounded-lg border border-[#F0F0F0] bg-[#FAFAFA]">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: t.color }} />
                          <span className="text-[14px] font-semibold text-[#111]">{t.tool}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#EAEAEA] bg-white text-[#999] ml-auto">{t.category}</span>
                        </div>
                        <p className="text-[12px] text-[#666] leading-[1.7] mb-3">{t.desc}</p>
                        <div className="p-2.5 rounded-lg bg-white border border-[#EAEAEA]">
                          <p className="text-[10px] text-[#999] mb-0.5">Cas d&apos;usage</p>
                          <p className="text-[10px] text-[#111]">{t.useCase}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le piege classique est d&apos;empiler les outils sans les connecter entre eux. Votre stack n&apos;a de valeur que si les donnees circulent : les leads generes par Google Ads doivent remonter dans HubSpot avec la bonne source, les contacts enrichis par Clay doivent alimenter vos sequences Lemlist, et les resultats de prospection doivent mettre a jour le CRM. L&apos;integration est aussi importante que le choix des outils.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 — Notre approche */}
              <section id="approche-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Notre methode</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Notre approche acquisition chez Ceres</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Chez Ceres, nous accompagnons les entreprises B2B dans la structuration de leur acquisition. Notre conviction : une acquisition performante repose sur trois piliers que la plupart des entreprises negligent.</p>
                    <p>Premier pilier : les fondations. Avant de depenser un euro en acquisition, nous nous assurons que votre CRM est propre, que votre tracking est en place et que vos metriques sont definies. Sans ces fondations, tout investissement en acquisition est du gaspillage. Nous auditons votre HubSpot, configurons les proprietes, les lifecycle stages et l&apos;attribution pour que chaque lead soit tracable de sa source jusqu&apos;au revenu genere.</p>
                    <p>Deuxieme pilier : la strategie. Nous definissons avec vous vos canaux prioritaires en fonction de votre ICP, de votre budget et de vos objectifs. Nous construisons un plan d&apos;acquisition chiffre avec des objectifs par canal, des CAC cibles et des jalons de validation. Pas de strategie generique : chaque plan est adapte a votre contexte.</p>
                    <p>Troisieme pilier : l&apos;execution structuree. Nous mettons en place les outils (HubSpot, Clay, Lemlist, Google Ads, LinkedIn Ads), les workflows d&apos;automatisation et les dashboards de suivi. Nous formons vos equipes et les accompagnons dans l&apos;execution pendant les premiers mois, jusqu&apos;a ce qu&apos;elles soient autonomes.</p>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {[
                      "Audit CRM et mise en place du tracking d&apos;acquisition",
                      "Definition de l&apos;ICP et des buyer personas",
                      "Strategie d&apos;acquisition chiffree par canal",
                      "Configuration de la stack (HubSpot, Clay, Lemlist, Ads)",
                      "Modele d&apos;attribution et reporting unifie",
                      "Dashboards de suivi CAC, LTV et conversion par canal",
                      "Formation et accompagnement des equipes",
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
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Pret a structurer votre acquisition ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On audite votre stack, on definit vos canaux prioritaires et on met en place le tracking pour mesurer chaque euro investi. Premiers resultats en 6 semaines.</p>
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel decouverte
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
