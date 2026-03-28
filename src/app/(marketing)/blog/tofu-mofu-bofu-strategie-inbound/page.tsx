"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "TOFU, MOFU, BOFU : comprendre et optimiser votre strategie inbound",
  description: "Guide complet du funnel inbound marketing : TOFU, MOFU, BOFU. Contenus, KPIs, outils et alignement RevOps pour chaque etape du parcours d'achat B2B.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-02-03",
  dateModified: "2026-02-03",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/tofu-mofu-bofu-strategie-inbound" },
  articleSection: "RevOps",
  wordCount: 2700,
  inLanguage: "fr",
};

const sections = [
  { id: "definition", title: "Qu&apos;est-ce que le funnel" },
  { id: "pertinence-2026", title: "Pertinence en 2026" },
  { id: "tofu", title: "TOFU : attirer" },
  { id: "mofu", title: "MOFU : convertir" },
  { id: "bofu", title: "BOFU : transformer" },
  { id: "contenus-par-etape", title: "Contenus par etape" },
  { id: "crm-alignment", title: "Aligner avec le CRM" },
  { id: "erreurs", title: "Erreurs classiques" },
  { id: "revops", title: "Funnel et RevOps" },
  { id: "approche-ceres", title: "Notre approche" },
];

const relatedArticles = [
  { title: "Account-Based Marketing : le guide complet ABM", slug: "account-based-marketing-guide", category: "RevOps", color: "#FF7A59" },
  { title: "Marketing Automation : 7 workflows HubSpot indispensables", slug: "marketing-automation-7-workflows-hubspot", category: "Automatisation", color: "#6C5CE7" },
  { title: "9 actions commerciales a automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function TofuMofuBofuPage() {
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
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "25%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "45%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "65%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "85%", width: 280, height: 280, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(70px)" }} />

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
              <span className="text-[#666]">TOFU, MOFU, BOFU</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>RevOps</Badge>
                <span className="text-[11px] text-[#CCC]">14 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                TOFU, MOFU, BOFU : comprendre et optimiser votre strategie inbound
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Le funnel TOFU / MOFU / BOFU structure le parcours d&apos;achat de vos prospects, du premier contact jusqu&apos;a la signature. Ce guide couvre chaque etape en detail : types de contenus, KPIs a suivre, outils a deployer, et surtout comment aligner marketing et sales dans une logique RevOps. Methodologie concrete, exemples et erreurs a eviter.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>3 fevrier 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 — Definition du funnel */}
              <section id="definition" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">C&apos;est quoi le funnel TOFU / MOFU / BOFU</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le funnel TOFU / MOFU / BOFU est un modele qui decoupe le parcours d&apos;achat en trois grandes phases. Chaque acronyme correspond a une position dans l&apos;entonnoir de conversion : Top of Funnel (haut de l&apos;entonnoir), Middle of Funnel (milieu) et Bottom of Funnel (bas). L&apos;idee est simple : un prospect ne passe pas d&apos;inconnu a client en une seule etape. Il traverse un processus de decouverte, d&apos;evaluation puis de decision.</p>
                    <p>Au sommet du funnel (TOFU), le prospect ne vous connait pas encore. Il a un probleme ou une curiosite, et il cherche des reponses. Il n&apos;est pas pret a acheter. Il consomme du contenu educatif, decouvre des solutions possibles, et commence a identifier les acteurs du marche. L&apos;objectif marketing a ce stade est la visibilite : attirer un maximum de visiteurs qualifies.</p>
                    <p>Au milieu du funnel (MOFU), le prospect a identifie son probleme et explore activement les solutions. Il compare les approches, telecharge des ressources approfondies, s&apos;inscrit a des webinars. Il est devenu un lead. L&apos;objectif est la conversion : transformer ce visiteur en lead qualifie, puis en MQL (Marketing Qualified Lead) grace a du nurturing cible.</p>
                    <p>Au bas du funnel (BOFU), le prospect est en phase de decision. Il a retenu deux ou trois solutions, il demande des demos, consulte des etudes de cas specifiques a son secteur, negocie des propositions. L&apos;objectif est le closing : convaincre que votre solution est le meilleur choix et accompagner la signature.</p>
                    <p>Ce modele n&apos;est pas rigide. Les parcours d&apos;achat reels sont rarement lineaires, surtout en B2B ou les cycles sont longs et les comites de decision multiples. Mais le framework TOFU / MOFU / BOFU reste un outil de structuration extremement utile pour aligner vos contenus, vos KPIs et vos equipes sur un langage commun.</p>
                  </div>

                  {/* Visual funnel */}
                  <div className="mt-8 flex flex-col items-center gap-0">
                    <div className="w-full max-w-[400px] rounded-t-xl bg-[#FF7A59]/10 border border-[#FF7A59]/20 p-4 text-center">
                      <p className="text-[13px] font-semibold text-[#FF7A59] mb-1">TOFU - Top of Funnel</p>
                      <p className="text-[11px] text-[#999]">Decouverte et sensibilisation</p>
                      <p className="text-[10px] text-[#BBB] mt-1">Visiteurs, audience large, trafic organique et paye</p>
                    </div>
                    <div className="w-[85%] max-w-[340px] bg-[#4B5EFC]/10 border-x border-b border-[#4B5EFC]/20 p-4 text-center">
                      <p className="text-[13px] font-semibold text-[#4B5EFC] mb-1">MOFU - Middle of Funnel</p>
                      <p className="text-[11px] text-[#999]">Evaluation et consideration</p>
                      <p className="text-[10px] text-[#BBB] mt-1">Leads, MQLs, prospects engages</p>
                    </div>
                    <div className="w-[65%] max-w-[260px] rounded-b-xl bg-[#22C55E]/10 border-x border-b border-[#22C55E]/20 p-4 text-center">
                      <p className="text-[13px] font-semibold text-[#22C55E] mb-1">BOFU - Bottom of Funnel</p>
                      <p className="text-[11px] text-[#999]">Decision et achat</p>
                      <p className="text-[10px] text-[#BBB] mt-1">SQLs, opportunites, clients</p>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 — Pertinence en 2026 */}
              <section id="pertinence-2026" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi le funnel est encore pertinent en 2026</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>On entend regulierement que le funnel marketing est mort. Que le parcours d&apos;achat est devenu non-lineaire. Que les prospects ne suivent plus un chemin previsible. Tout cela est partiellement vrai, mais la conclusion est fausse. Le funnel n&apos;est pas mort, il a evolue.</p>
                    <p>Premier constat : les acheteurs B2B font 70 a 80% de leur parcours avant de parler a un commercial (etude Gartner 2025). Cela signifie que le contenu joue un role plus important que jamais dans chaque phase du funnel. Si vous ne produisez pas le bon contenu au bon moment, le prospect ira le chercher chez un concurrent.</p>
                    <p>Deuxieme constat : la multiplication des canaux (SEO, social, podcasts, newsletters, communautes, IA generative) rend le parcours plus complexe, mais ne supprime pas les phases. Un prospect passe toujours par la decouverte, l&apos;evaluation et la decision. Il le fait simplement via plus de points de contact et dans un ordre moins previsible.</p>
                    <p>Troisieme constat : avec l&apos;essor de l&apos;IA et du contenu genere a grande echelle, le volume de contenu TOFU a explose. La differenciation se fait desormais dans le MOFU et le BOFU, la ou le contenu exige de l&apos;expertise reelle, des donnees proprietaires et une comprehension fine du probleme du prospect. Les entreprises qui investissent dans tout le funnel, et pas uniquement dans le haut, prennent un avantage significatif.</p>
                    <p>Le modele TOFU / MOFU / BOFU reste le meilleur cadre operationnel pour structurer une strategie inbound. Ce qui change, c&apos;est la facon de l&apos;executer : plus de personnalisation, plus d&apos;automatisation, et surtout un alignement plus fin entre marketing et sales.</p>
                  </div>

                  {/* Stats cards */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "80%", label: "du parcours d&apos;achat B2B se fait sans commercial", color: "#FF7A59" },
                      { value: "6-10", label: "decideurs impliques dans un achat B2B moyen", color: "#4B5EFC" },
                      { value: "47%", label: "des acheteurs consultent 3 a 5 contenus avant de contacter un vendeur", color: "#22C55E" },
                      { value: "72%", label: "des marketeurs B2B utilisent le content marketing pour nourrir le funnel", color: "#6C5CE7" },
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

              {/* Section 3 — TOFU */}
              <section id="tofu" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-sm bg-[#FF7A59]" />
                    <h2 className="text-[17px] font-semibold text-[#111]">TOFU : attirer les visiteurs</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le Top of Funnel est la phase d&apos;attraction. Le prospect ne vous connait pas, et souvent il ne sait meme pas encore qu&apos;il a un probleme precis. Il explore, il s&apos;informe, il pose des questions generales sur Google ou LinkedIn. Votre objectif est d&apos;etre la quand il cherche.</p>
                    <p>Les contenus TOFU doivent etre educatifs, accessibles et non-promotionnels. Vous n&apos;etes pas encore en train de vendre. Vous etes en train de construire de la confiance et de la visibilite. Le prospect doit repartir avec une reponse utile et une premiere impression positive de votre marque.</p>
                    <p>Les formats les plus efficaces en TOFU sont les articles de blog optimises SEO, les posts LinkedIn educatifs, les infographies, les episodes de podcast, les videos courtes explicatives, et les publications sur les reseaux sociaux. Le denominateur commun : du contenu gratuit, sans barriere, qui repond a une question que se pose votre audience.</p>
                    <p>La strategie SEO est le pilier du TOFU. Identifiez les mots-cles informationnels que votre cible recherche (par exemple, &ldquo;comment ameliorer son taux de conversion&rdquo;, &ldquo;qu&apos;est-ce que le lead scoring&rdquo;). Creez du contenu qui repond mieux que la concurrence. Optimisez la structure technique de votre site. Le SEO genere du trafic qualifie en continu, sans cout marginal par visiteur.</p>
                    <p>Les campagnes paid (Google Ads, LinkedIn Ads, Meta Ads) peuvent completer le SEO pour accelerer la visibilite, notamment sur des sujets ou le positionnement organique prend du temps. Ciblez des audiences larges avec du contenu de valeur, pas des pages de vente.</p>
                  </div>

                  {/* TOFU content types */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { format: "Articles de blog", desc: "Contenus SEO longs (1500-3000 mots) repondant aux questions informationnelles de votre cible. Pilier de la strategie TOFU." },
                      { format: "Posts LinkedIn", desc: "Publications educatives, carrousels, partages d&apos;experience. Format court, forte viralite, ideal pour la notoriete." },
                      { format: "Podcasts / Videos", desc: "Episodes thematiques avec des experts ou interviews. Format immersif qui construit la credibilite sur la duree." },
                      { format: "Infographies", desc: "Visuels partageables qui synthetisent des donnees ou des processus. Fort potentiel de backlinks et de partages." },
                    ].map((item) => (
                      <div key={item.format} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <p className="text-[12px] font-semibold text-[#FF7A59] mb-1">{item.format}</p>
                        <p className="text-[11px] text-[#777] leading-[1.6]">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* KPIs TOFU */}
                  <div className="mt-5 rounded-lg bg-[#FF7A59]/5 border border-[#FF7A59]/15 p-4">
                    <p className="text-[12px] font-semibold text-[#FF7A59] mb-3">KPIs TOFU a suivre</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { kpi: "Trafic organique", desc: "Sessions via Google" },
                        { kpi: "Impressions", desc: "Visibilite totale" },
                        { kpi: "CTR", desc: "Taux de clic SERP" },
                        { kpi: "Nouveaux visiteurs", desc: "Part de l&apos;audience nouvelle" },
                      ].map((k) => (
                        <div key={k.kpi} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{k.kpi}</p>
                          <p className="text-[10px] text-[#999] mt-0.5">{k.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 — MOFU */}
              <section id="mofu" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-sm bg-[#4B5EFC]" />
                    <h2 className="text-[17px] font-semibold text-[#111]">MOFU : convertir en leads qualifies</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le Middle of Funnel est la phase de conversion et de qualification. Le prospect connait son probleme, il a explore les solutions possibles, et il cherche a approfondir. Il est pret a echanger ses coordonnees contre du contenu a forte valeur ajoutee. C&apos;est le moment ou un visiteur anonyme devient un lead identifie.</p>
                    <p>Les contenus MOFU doivent etre plus approfondis et plus specifiques que les contenus TOFU. On passe de l&apos;education generale a l&apos;expertise appliquee. Le prospect ne cherche plus &ldquo;qu&apos;est-ce que le CRM&rdquo; mais &ldquo;comment choisir un CRM pour une equipe de 20 commerciaux en SaaS B2B&rdquo;. Le contenu doit demontrer votre expertise et commencer a positionner votre solution comme une reponse credible.</p>
                    <p>Les formats cles du MOFU sont les lead magnets (livres blancs, templates, checklists), les webinars, les etudes de cas generales, les sequences de nurturing par email, les comparatifs et les guides approfondis. Le point commun : du contenu gate (derriere un formulaire) ou du contenu qui declenche une interaction (inscription, telechargement, replay).</p>
                    <p>Le nurturing est essentiel au MOFU. Un lead qui telecharge un livre blanc n&apos;est pas pret a acheter. Il faut l&apos;accompagner avec une sequence d&apos;emails educatifs, lui proposer du contenu complementaire, le scorer progressivement jusqu&apos;a ce qu&apos;il atteigne le seuil de qualification. C&apos;est le travail du marketing automation.</p>
                    <p>La segmentation devient critique au MOFU. Tous les leads n&apos;ont pas le meme profil, la meme maturite ni le meme cas d&apos;usage. Personnalisez vos sequences de nurturing par persona, par secteur ou par problematique. Un lead qui a telecharge un guide sur le lead scoring ne recevra pas les memes emails qu&apos;un lead interesse par le reporting pipeline.</p>
                  </div>

                  {/* MOFU content types */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { format: "Livres blancs", desc: "Guides approfondis sur un sujet specifique. Format reference du lead magnet B2B. Echanges contre email + informations de qualification." },
                      { format: "Webinars", desc: "Sessions en direct ou en replay sur des sujets d&apos;expertise. Excellent pour la credibilite et la collecte de leads qualifies." },
                      { format: "Etudes de cas", desc: "Resultats clients concrets avec methode et chiffres. Demontre la capacite a delivrer. Format tres persuasif au MOFU." },
                      { format: "Sequences email", desc: "Workflows automatises de nurturing. 5 a 8 emails espaces sur 2 a 4 semaines. Contenu educatif progressif menant vers le BOFU." },
                    ].map((item) => (
                      <div key={item.format} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <p className="text-[12px] font-semibold text-[#4B5EFC] mb-1">{item.format}</p>
                        <p className="text-[11px] text-[#777] leading-[1.6]">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* KPIs MOFU */}
                  <div className="mt-5 rounded-lg bg-[#4B5EFC]/5 border border-[#4B5EFC]/15 p-4">
                    <p className="text-[12px] font-semibold text-[#4B5EFC] mb-3">KPIs MOFU a suivre</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { kpi: "MQLs generes", desc: "Leads marketing qualifies" },
                        { kpi: "Taux de conversion", desc: "Visiteur vers lead" },
                        { kpi: "CPL", desc: "Cout par lead" },
                        { kpi: "Taux d&apos;ouverture", desc: "Emails de nurturing" },
                      ].map((k) => (
                        <div key={k.kpi} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{k.kpi}</p>
                          <p className="text-[10px] text-[#999] mt-0.5">{k.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 — BOFU */}
              <section id="bofu" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-sm bg-[#22C55E]" />
                    <h2 className="text-[17px] font-semibold text-[#111]">BOFU : transformer en clients</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le Bottom of Funnel est la phase de decision. Le prospect a fait ses recherches, il a identifie votre solution comme une option serieuse, et il est pret a evaluer concretement votre offre. C&apos;est a ce stade que le marketing et les sales collaborent le plus etroitement. Le contenu BOFU doit lever les dernieres objections et faciliter la prise de decision.</p>
                    <p>Les contenus BOFU sont les plus proches de la vente sans etre du contenu purement commercial. On parle de demonstrations personnalisees, de periodes d&apos;essai gratuites, de propositions commerciales detaillees, d&apos;etudes de cas specifiques au secteur ou a la taille du prospect, de comparatifs avec les concurrents, et de calculateurs de ROI.</p>
                    <p>La demonstration produit est souvent le moment de verite en B2B. Elle doit etre adaptee au cas d&apos;usage du prospect, pas generique. Montrez comment votre solution resout son probleme specifique, avec ses donnees ou des donnees similaires. Un prospect qui se projette dans l&apos;utilisation est beaucoup plus proche de signer.</p>
                    <p>Les etudes de cas BOFU sont differentes des etudes de cas MOFU. Au MOFU, une etude de cas montre que votre solution fonctionne en general. Au BOFU, elle montre que votre solution fonctionne pour des entreprises similaires au prospect : meme secteur, meme taille, meme problematique. La specificite est cle.</p>
                    <p>Le pricing et les conditions commerciales entrent en jeu au BOFU. Soyez transparent. Un prospect qui arrive en demo sans avoir aucune idee de votre tarification risque de decrocher a la decouverte du prix. Proposez des grilles tarifaires claires, des simulateurs, des options de paiement flexibles. Reduisez la friction a chaque etape.</p>
                    <p>Les temoignages clients et les preuves sociales jouent un role decisif au BOFU. Le prospect cherche a se rassurer avant de s&apos;engager. Des avis verifies, des logos clients, des notes sur des plateformes comme G2 ou Capterra, et surtout des conversations avec des clients existants (reference calls) peuvent faire basculer la decision.</p>
                  </div>

                  {/* BOFU content types */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { format: "Demos personnalisees", desc: "Presentations sur mesure adaptees au cas d&apos;usage du prospect. Le moment de verite du cycle de vente B2B." },
                      { format: "Essais gratuits", desc: "Periodes de test (7 a 30 jours) qui permettent au prospect de se projeter dans l&apos;utilisation quotidienne." },
                      { format: "Propositions detaillees", desc: "Documents commerciaux avec scope, deliverables, timeline et pricing. Professionnalisme et clarte sont essentiels." },
                      { format: "Calculateurs de ROI", desc: "Outils interactifs qui quantifient la valeur de votre solution par rapport a la situation actuelle du prospect." },
                    ].map((item) => (
                      <div key={item.format} className="p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <p className="text-[12px] font-semibold text-[#22C55E] mb-1">{item.format}</p>
                        <p className="text-[11px] text-[#777] leading-[1.6]">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* KPIs BOFU */}
                  <div className="mt-5 rounded-lg bg-[#22C55E]/5 border border-[#22C55E]/15 p-4">
                    <p className="text-[12px] font-semibold text-[#22C55E] mb-3">KPIs BOFU a suivre</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { kpi: "SQLs", desc: "Leads qualifies sales" },
                        { kpi: "Win rate", desc: "Taux de signature" },
                        { kpi: "CAC", desc: "Cout d&apos;acquisition client" },
                        { kpi: "Cycle de vente", desc: "Duree moyenne en jours" },
                      ].map((k) => (
                        <div key={k.kpi} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{k.kpi}</p>
                          <p className="text-[10px] text-[#999] mt-0.5">{k.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 — Contenus par etape */}
              <section id="contenus-par-etape" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les contenus par etape du funnel</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le mapping de contenu est l&apos;exercice le plus important de votre strategie inbound. Chaque piece de contenu doit avoir un objectif clair, un CTA adapte a l&apos;etape du funnel, et un KPI de mesure. Un contenu TOFU avec un CTA BOFU (&ldquo;Demandez une demo&rdquo; sur un article de blog generique) est une erreur frequente qui tue les taux de conversion.</p>
                    <p>Voici un tableau de reference pour mapper vos contenus a chaque etape du funnel. Utilisez-le comme base pour auditer votre bibliotheque de contenu existante et planifier votre calendrier editorial.</p>
                  </div>

                  {/* Detailed content mapping table */}
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-[12px]">
                      <thead>
                        <tr className="border-b border-[#EAEAEA]">
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Etape</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Format</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">Objectif</th>
                          <th className="text-left py-3 pr-4 text-[#999] font-medium">CTA</th>
                          <th className="text-left py-3 text-[#999] font-medium">KPI</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#555]">
                        {[
                          ["TOFU", "Article de blog", "Attirer du trafic qualifie", "Lire un autre article, s&apos;abonner", "Pages vues, temps passe"],
                          ["TOFU", "Post LinkedIn", "Notoriete et engagement", "Suivre la page, commenter", "Impressions, engagement rate"],
                          ["TOFU", "Podcast / Video", "Credibilite et audience", "S&apos;abonner au podcast", "Ecoutes, abonnes"],
                          ["TOFU", "Infographie", "Viralite et backlinks", "Partager, visiter le site", "Partages, backlinks"],
                          ["MOFU", "Livre blanc", "Generer des leads", "Telecharger (formulaire)", "Telechargements, MQLs"],
                          ["MOFU", "Webinar", "Expertise et qualification", "S&apos;inscrire", "Inscrits, participants, MQLs"],
                          ["MOFU", "Email nurturing", "Maturer les leads", "Cliquer sur le contenu suivant", "Taux d&apos;ouverture, taux de clic"],
                          ["MOFU", "Comparatif", "Aider a la selection", "Telecharger le guide complet", "Telechargements, CPL"],
                          ["BOFU", "Demo produit", "Convaincre de la valeur", "Commencer l&apos;essai", "Demos realisees, conversion"],
                          ["BOFU", "Etude de cas sectorielle", "Rassurer avec du social proof", "Demander une proposition", "SQLs generes"],
                          ["BOFU", "Calculateur ROI", "Quantifier la valeur", "Recevoir les resultats par email", "Utilisations, conversions"],
                          ["BOFU", "Proposition commerciale", "Declencher la signature", "Signer / valider", "Win rate, panier moyen"],
                        ].map(([etape, format, objectif, cta, kpi], i) => (
                          <tr key={i} className="border-b border-[#F5F5F5]">
                            <td className="py-2.5 pr-4 font-medium" style={{ color: etape === "TOFU" ? "#FF7A59" : etape === "MOFU" ? "#4B5EFC" : "#22C55E" }}>{etape}</td>
                            <td className="py-2.5 pr-4 font-medium text-[#111]">{format}</td>
                            <td className="py-2.5 pr-4">{objectif}</td>
                            <td className="py-2.5 pr-4">{cta}</td>
                            <td className="py-2.5">{kpi}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;erreur la plus courante est de produire massivement du contenu TOFU (articles de blog, posts LinkedIn) sans investir dans le MOFU et le BOFU. Resultat : beaucoup de trafic, mais tres peu de leads qualifies et encore moins de clients. Le funnel &ldquo;fuit&rdquo; parce qu&apos;il n&apos;y a rien pour accompagner le prospect vers la decision.</p>
                    <p>Auditez votre bibliotheque de contenu actuelle. Classez chaque piece par etape du funnel. Si plus de 70% de vos contenus sont TOFU, vous avez un probleme de desequilibre. Une repartition saine tourne autour de 40% TOFU, 30% MOFU, 30% BOFU, avec des variations selon votre modele business et votre maturite.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 — Aligner avec le CRM */}
              <section id="crm-alignment" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Aligner le funnel avec votre CRM</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le funnel TOFU / MOFU / BOFU ne vit pas que dans la tete du marketeur. Il doit etre materialise dans votre CRM. Sans cela, impossible de mesurer la progression des prospects, d&apos;automatiser le nurturing, ou de definir des regles de handoff entre marketing et sales.</p>
                    <p>Dans HubSpot, le funnel se traduit naturellement par les Lifecycle Stages. Chaque contact a un lifecycle stage qui evolue au fil de son parcours : Subscriber, Lead, Marketing Qualified Lead (MQL), Sales Qualified Lead (SQL), Opportunity, Customer. Ces stages correspondent directement aux phases du funnel.</p>
                  </div>

                  {/* Lifecycle stages mapping */}
                  <div className="mt-6 space-y-2">
                    {[
                      { stage: "Subscriber", funnel: "TOFU", desc: "Contact qui s&apos;est abonne a votre newsletter ou blog. Premier signe d&apos;interet.", color: "#FF7A59" },
                      { stage: "Lead", funnel: "TOFU / MOFU", desc: "Contact qui a rempli un formulaire ou telecharge du contenu. Identifie mais pas encore qualifie.", color: "#FF7A59" },
                      { stage: "MQL", funnel: "MOFU", desc: "Lead qui a atteint un seuil de scoring defini. Le marketing considere qu&apos;il est pret a etre contacte par les sales.", color: "#4B5EFC" },
                      { stage: "SQL", funnel: "MOFU / BOFU", desc: "Lead qualifie par les sales apres un premier echange. Besoin confirme, budget identifie, timeline defini.", color: "#4B5EFC" },
                      { stage: "Opportunity", funnel: "BOFU", desc: "Deal ouvert dans le pipeline. Proposition envoyee, negociation en cours.", color: "#22C55E" },
                      { stage: "Customer", funnel: "Post-BOFU", desc: "Deal signe. Le contact est maintenant un client. Debut de la phase de retention et d&apos;expansion.", color: "#22C55E" },
                    ].map((item) => (
                      <div key={item.stage} className="flex items-start gap-3 p-4 rounded-lg bg-[#FAFAFA] border border-[#F0F0F0]">
                        <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.color }} />
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[12px] font-semibold text-[#111]">{item.stage}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#999]">{item.funnel}</span>
                          </div>
                          <p className="text-[11px] text-[#777] leading-[1.6]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le lead scoring est le mecanisme qui fait avancer les contacts dans le funnel automatiquement. Attribuez des points en fonction des actions du contact (telechargement, visite de page pricing, participation a un webinar) et de ses caracteristiques firmographiques (taille de l&apos;entreprise, secteur, poste). Quand le score atteint un seuil defini, le contact passe en MQL et les sales sont notifies.</p>
                    <p>Le handoff marketing vers sales est le moment le plus critique du funnel. Un MQL qui arrive chez un commercial sans contexte est un MQL gaspille. Configurez des workflows HubSpot qui, au passage en MQL, envoient une notification au commercial assigne avec un resume complet : score, contenus consommes, pages visitees, formulaires remplis, entreprise et poste. Le commercial doit pouvoir qualifier en 30 secondes si ce lead merite un appel.</p>
                    <p>Definissez un SLA entre marketing et sales. Le marketing s&apos;engage a generer X MQLs par mois avec un score minimum de Y. Les sales s&apos;engagent a traiter chaque MQL dans un delai de Z heures et a renseigner le feedback dans le CRM (accepte, rejete + raison). Ce SLA cree la boucle de retour necessaire pour ameliorer la qualite des leads en continu.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 — Erreurs classiques */}
              <section id="erreurs" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les erreurs classiques du funnel inbound</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Apres des dizaines de projets inbound accompagnes, voici les erreurs que nous voyons le plus souvent. Elles sont previsibles, evitables, et pourtant tres repandues.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { num: "01", title: "Trop de TOFU, pas assez de BOFU", desc: "C&apos;est l&apos;erreur numero un. Publier 4 articles de blog par semaine sans aucun contenu de conversion, sans etude de cas, sans page de demo. Le trafic monte, mais les leads et les clients ne suivent pas. Investissez dans le bas du funnel autant que dans le haut." },
                      { num: "02", title: "Des contenus mal mappes aux etapes", desc: "Mettre un CTA &ldquo;Demandez une demo&rdquo; sur un article TOFU qui parle de tendances generales. Envoyer un livre blanc a un prospect qui est deja en phase de decision. Chaque contenu doit avoir un CTA coherent avec sa position dans le funnel." },
                      { num: "03", title: "Pas de nurturing entre MOFU et BOFU", desc: "Un lead telecharge un livre blanc, et ensuite rien. Pas de sequence email, pas de contenu de suivi, pas de scoring. Le lead refroidit et disparait. Le nurturing est le pont entre l&apos;interet et la decision." },
                      { num: "04", title: "Confondre quantite de leads et qualite", desc: "Generer 500 leads par mois ne sert a rien si 90% ne correspondent pas a votre ICP. Mieux vaut 50 MQLs qualifies que 500 leads hors cible. Affinez vos formulaires, votre scoring et vos criteres de qualification." },
                      { num: "05", title: "Marketing et sales desalignes", desc: "Le marketing genere des MQLs, les sales ne les rappellent pas. Les sales se plaignent de la qualite des leads, le marketing ne recoit pas de feedback. Sans SLA et sans cadence de review commune, le funnel est casse entre MOFU et BOFU." },
                      { num: "06", title: "Pas de mesure par etape", desc: "Beaucoup d&apos;equipes mesurent le trafic et le chiffre d&apos;affaires, mais rien entre les deux. Sans suivi des taux de conversion a chaque etape (visiteur vers lead, lead vers MQL, MQL vers SQL, SQL vers client), impossible d&apos;identifier ou le funnel fuit." },
                      { num: "07", title: "Dismiss le contenu post-BOFU", desc: "Le funnel ne s&apos;arrete pas a la signature. La retention, l&apos;upsell et le referral sont des sources de revenus majeures. Les clients satisfaits deviennent vos meilleurs ambassadeurs. Integrez le post-achat dans votre strategie de contenu." },
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

              {/* Section 9 — RevOps et funnel (dark section) */}
              <section id="revops" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">RevOps</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">TOFU / MOFU / BOFU et RevOps : l&apos;alignement complet</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Le funnel TOFU / MOFU / BOFU est fondamentalement un cadre marketing. Mais dans une logique RevOps, il s&apos;etend a l&apos;ensemble de la chaine de revenus : marketing, sales et customer success. Le RevOps consiste a aligner les processus, les outils et les donnees de ces trois equipes pour maximiser le revenu de facon previsible.</p>
                    <p>En pratique, l&apos;approche RevOps transforme le funnel en plusieurs manieres. D&apos;abord, elle unifie la donnee. Les interactions TOFU (visites, telechargements), MOFU (emails, scores) et BOFU (deals, propositions) sont tracees dans un seul CRM, avec une source de verite unique. Pas de silo entre l&apos;outil marketing et l&apos;outil commercial.</p>
                    <p>Ensuite, elle cree des boucles de feedback. Les donnees de closing (win/loss reasons, objections recurrentes, segments les plus rentables) remontent vers le marketing pour affiner le ciblage TOFU et le contenu MOFU. Un deal perdu parce que le prospect avait mal compris la tarification? Le marketing cree un contenu MOFU sur le pricing. Un segment qui convertit deux fois mieux que les autres? Le marketing concentre ses efforts TOFU sur ce segment.</p>
                    <p>Le RevOps introduit aussi la notion de revenue attribution. Il ne suffit plus de savoir combien de leads le marketing a genere. Il faut savoir quel contenu TOFU a genere les leads qui se sont transformes en MQLs qui ont ete acceptes par les sales et qui ont signe. L&apos;attribution multi-touch permet de valoriser chaque interaction dans le funnel et d&apos;optimiser l&apos;allocation budgetaire.</p>
                    <p>Enfin, l&apos;approche RevOps etend le funnel au-dela du BOFU. Le cycle de vie client continue apres la signature : onboarding, adoption, renouvellement, upsell, referral. Ces phases ont leurs propres contenus, KPIs et processus. Le customer success devient un moteur de revenu, pas juste un centre de cout. Et les clients satisfaits deviennent la meilleure source de leads TOFU via le bouche-a-oreille et les referrals.</p>
                  </div>

                  {/* RevOps alignment pillars */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { pillar: "Processus", items: ["Definitions communes (MQL, SQL)", "SLA marketing-sales", "Cadence de review hebdomadaire", "Playbooks par etape du funnel"], color: "#FF7A59" },
                      { pillar: "Outils", items: ["CRM unifie (HubSpot)", "Marketing automation integre", "Reporting cross-equipes", "Attribution multi-touch"], color: "#4B5EFC" },
                      { pillar: "Donnees", items: ["Source de verite unique", "Scoring standardise", "Boucles de feedback", "Revenue attribution"], color: "#22C55E" },
                    ].map((p) => (
                      <div key={p.pillar} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <p className="text-[12px] font-semibold mb-3" style={{ color: p.color }}>{p.pillar}</p>
                        <ul className="space-y-1.5">
                          {p.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[11px] text-white/50">
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

              {/* Section 10 — Approche Ceres (dark section) */}
              <section id="approche-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Notre methode</span>
                  <h2 className="text-[17px] font-semibold text-white mb-4">Notre approche du funnel inbound chez Ceres</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Chez Ceres, nous accompagnons les entreprises B2B dans la structuration et l&apos;optimisation de leur funnel inbound, de la strategie a l&apos;execution, avec HubSpot comme fondation technologique.</p>
                    <p>Notre approche commence toujours par un audit du funnel existant. Ou sont les trous? Quels contenus manquent a chaque etape? Quels taux de conversion sont anormalement bas? Ou se situe le decrochage entre marketing et sales? Nous analysons les donnees CRM, les workflows en place, le contenu existant et les processus de qualification pour identifier les points de friction.</p>
                    <p>Ensuite, nous construisons un plan d&apos;action structure autour de trois axes : le contenu (creer les pieces manquantes a chaque etape du funnel), les processus (lead scoring, nurturing, handoff, SLA) et la mesure (dashboards par etape, attribution, reporting). Chaque action a un responsable, une deadline et un KPI de succes.</p>
                    <p>Nous configurons HubSpot pour materialiser le funnel : lifecycle stages, lead scoring, workflows de nurturing, sequences de vente, dashboards de performance par etape. L&apos;objectif est que chaque equipe puisse voir ou en sont les prospects dans le funnel, ce qui fonctionne et ce qui doit etre ameliore, sans avoir a fouiller dans les donnees.</p>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {[
                      "Audit complet du funnel existant et identification des fuites",
                      "Mapping de contenu TOFU / MOFU / BOFU avec gap analysis",
                      "Configuration du lead scoring dans HubSpot",
                      "Creation des workflows de nurturing automatise",
                      "Definition du SLA marketing-sales et des criteres de qualification",
                      "Mise en place des dashboards de performance par etape",
                      "Cadence de review et optimisation continue",
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
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Pret a structurer votre funnel inbound ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On audite votre funnel, on identifie les fuites, et on met en place le contenu, les processus et les outils pour convertir plus de visiteurs en clients. Premiers resultats en 6 semaines.</p>
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