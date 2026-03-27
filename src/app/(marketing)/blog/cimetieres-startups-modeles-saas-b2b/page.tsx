"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Le cimetiere des startups : les modeles SaaS B2B qui ne marchent pas",
  author: { "@type": "Person", name: "Guillaume Delachet" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  datePublished: "2026-02-15",
  dateModified: "2026-02-15",
  description: "Analyse des patterns recurrents d'echec dans les startups SaaS B2B. Pricing, go-to-market, product-market fit, over-engineering, silos marketing-sales, burn-rate et absence de RevOps.",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/cimetieres-startups-modeles-saas-b2b" },
  image: "https://www.ceres-revops.com/og/cimetieres-startups.png",
  articleSection: "RevOps",
  wordCount: 2800,
  inLanguage: "fr-FR"
};

const sections = [
  { id: "chiffres", title: "Les chiffres qui font peur" },
  { id: "pricing", title: "Pattern 1 : Le pricing qui tue" },
  { id: "go-to-market", title: "Pattern 2 : Le go-to-market premature" },
  { id: "produit-sans-marche", title: "Pattern 3 : Le produit sans marche" },
  { id: "over-engineering", title: "Pattern 4 : L'over-engineering" },
  { id: "silos", title: "Pattern 5 : Les silos marketing-sales" },
  { id: "burn-rate", title: "Pattern 6 : Le burn-rate incontrole" },
  { id: "absence-revops", title: "Pattern 7 : L'absence de RevOps" },
  { id: "signaux", title: "Les signaux d'alerte" },
  { id: "eviter-cimetiere", title: "Comment eviter le cimetiere" },
  { id: "conclusion", title: "Conclusion" },
];

const relatedArticles = [
  { title: "9 actions commerciales que vous devriez automatiser", slug: "9-actions-commerciales-automatiser", category: "Automatisation", color: "#6C5CE7" },
  { title: "Comment structurer votre pipeline HubSpot pour le B2B", slug: "structurer-pipeline-hubspot-b2b", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Les KPIs RevOps que chaque SaaS B2B devrait suivre", slug: "kpis-revops-saas-b2b", category: "RevOps", color: "#FF7A59" },
];

export default function CimetieresStartupsArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("chiffres");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "10%", width: 320, height: 320, borderRadius: "50%", background: "#FF7A59", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "30%", width: 280, height: 280, borderRadius: "50%", background: "#EF4444", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "50%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "70%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.06, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "6%", top: "88%", width: 240, height: 240, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet?text=Le%20cimetiere%20des%20startups%20SaaS%20B2B" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/cimetieres-startups-modeles-saas-b2b" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Le cimetiere des startups SaaS B2B</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>RevOps</Badge>
                <span className="text-[11px] text-[#CCC]">14 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Le cimetiere des startups : les modeles SaaS B2B qui ne marchent pas
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                90% des startups echouent. Dans le SaaS B2B, les raisons sont souvent les memes : pricing mal calibre, go-to-market premature, produit sans marche, silos entre equipes. Analyse des 7 patterns d&apos;echec les plus frequents et comment le RevOps permet de les eviter.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>15 fev 2026</span>
              </div>

              {/* Stats overview card */}
              <div className="mt-8 rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[13px] font-semibold text-[#111]">Ce que disent les chiffres</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Taux d&apos;echec startups", value: "90%", color: "#EF4444" },
                    { label: "Echec par manque de marche", value: "42%", color: "#FF7A59" },
                    { label: "Echec par cash burn", value: "29%", color: "#6C5CE7" },
                    { label: "Echec par mauvaise equipe", value: "23%", color: "#4B5EFC" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-[22px] font-bold" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-[10px] text-[#999]" dangerouslySetInnerHTML={{ __html: s.label }} />
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[12px] text-[#777] leading-[1.6]">
                  Sources : CB Insights, Failory, Startup Genome Report 2025. Les chiffres varient selon les etudes mais les tendances sont constantes depuis 10 ans.
                </p>
              </div>
            </header>

            <article>
              {/* Section 1 : Les chiffres qui font peur */}
              <section id="chiffres" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les chiffres qui font peur</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Avant de plonger dans les patterns d&apos;echec, posons les chiffres. 90% des startups echouent dans les 5 premieres annees. Ce chiffre, repete a l&apos;infini dans l&apos;ecosysteme, est devenu un lieu commun. Mais quand on creuse les donnees du SaaS B2B specifiquement, la realite est encore plus brutale.</p>
                    <p>Selon le Startup Genome Report 2025, 74% des startups SaaS B2B echouent non pas parce que le produit est mauvais, mais parce que le modele commercial ne fonctionne pas. Le produit marche. Les utilisateurs sont satisfaits. Mais l&apos;entreprise ne gagne pas d&apos;argent, ou pas assez vite par rapport a ce qu&apos;elle depense.</p>
                    <p>Le SaaS B2B a une particularite cruelle : les cycles de vente sont longs, les couts d&apos;acquisition eleves, et la patience des investisseurs limitee. Entre le moment ou vous signez votre premier client et celui ou vous atteignez la rentabilite, il peut se passer 3 a 5 ans. Beaucoup de startups n&apos;y arrivent jamais.</p>
                  </div>
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { stat: "74%", label: "echouent pour des raisons commerciales, pas produit", color: "#EF4444" },
                      { stat: "18 mois", label: "duree de vie moyenne d&apos;une startup SaaS sans PMF", color: "#FF7A59" },
                      { stat: "3-5 ans", label: "pour atteindre la rentabilite en SaaS B2B", color: "#6C5CE7" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4 text-center">
                        <div className="text-[20px] font-bold mb-1" style={{ color: s.color }}>{s.stat}</div>
                        <div className="text-[10px] text-[#999] leading-[1.5]" dangerouslySetInnerHTML={{ __html: s.label }} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Et le pire : ces echecs sont previsibles. Les memes erreurs reviennent, annee apres annee, startup apres startup. On les a identifiees, documentees, analysees. Pourtant, chaque nouvelle generation de fondateurs les repete. Voici les 7 patterns les plus destructeurs.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Pattern 1 : Le pricing qui tue */}
              <section id="pricing" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-md bg-[#FEF2F2] flex items-center justify-center text-[11px] font-bold text-[#EF4444]">1</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Le pricing qui tue</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le pricing est la premiere cause de mort lente en SaaS B2B. Pas le produit. Pas la technologie. Le prix. Et les erreurs viennent presque toujours du meme endroit : la peur de facturer ce que le produit vaut vraiment.</p>
                    <p><strong className="text-[#111]">Le piege du freemium.</strong> Offrir un plan gratuit semble logique. On reduit la friction, on attire des utilisateurs, on espere les convertir en clients payants. Sauf que dans le B2B, le freemium cree un probleme structurel. Vos utilisateurs gratuits consomment du support, de l&apos;infrastructure, du temps d&apos;equipe. Et le taux de conversion freemium vers payant en B2B est rarement superieur a 3-5%. Vous financez 95% d&apos;utilisateurs qui ne paieront jamais.</p>
                    <p><strong className="text-[#111]">La course au prix bas.</strong> Face a la concurrence, beaucoup de startups reagissent en baissant leurs prix. C&apos;est une spirale mortelle. En SaaS B2B, le prix bas envoie un signal de faible valeur. Un outil a 9 euros par mois ne sera jamais pris au serieux par un directeur commercial qui gere un budget de 500K euros. Pire, un prix bas vous empeche de financer une equipe commerciale, du support, du marketing. Vous etes condamne au self-service pur, ce qui fonctionne rarement en B2B complexe.</p>
                    <p><strong className="text-[#111]">Le feature creep tarifaire.</strong> A chaque renouvellement difficile, vous ajoutez une fonctionnalite au plan de base. Peu a peu, votre offre premium se vide de sa valeur, votre plan gratuit ou starter fait tout, et personne n&apos;a de raison de passer au plan superieur. C&apos;est la cannibalisation interne.</p>
                  </div>
                  <div className="mt-5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-4">
                    <p className="text-[12px] font-semibold text-[#EF4444] mb-2">Erreur classique</p>
                    <p className="text-[12px] text-[#777] leading-[1.65]">Fixer son prix en fonction de ses couts plutot qu&apos;en fonction de la valeur delivree au client. Un outil qui fait gagner 50 heures par mois a une equipe de 5 commerciaux peut justifier 500 euros par mois, meme si vos couts d&apos;infrastructure sont de 12 euros.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Pattern 2 : Le go-to-market premature */}
              <section id="go-to-market" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-md bg-[#FFF7ED] flex items-center justify-center text-[11px] font-bold text-[#FF7A59]">2</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Le go-to-market premature</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Scaler avant d&apos;avoir trouve le product-market fit, c&apos;est mettre de l&apos;essence sur un feu qui n&apos;existe pas encore. Pourtant, c&apos;est exactement ce que font la majorite des startups SaaS B2B apres leur premiere levee de fonds.</p>
                    <p>Le scenario est toujours le meme. Vous levez 2 millions d&apos;euros en seed. Le board vous pousse a recruter 5 commerciaux immediatement. Vous lancez des campagnes outbound massives. Vous achetez du trafic payant. Vous signez 3 salons par trimestre. Et 6 mois plus tard, votre CAC est a 15 000 euros, votre churn a 8% mensuel, et votre LTV ne couvre meme pas le cout d&apos;acquisition.</p>
                    <p>Le probleme n&apos;est pas l&apos;execution. Le probleme, c&apos;est que vous scalez un modele qui n&apos;est pas valide. Vous n&apos;avez pas 30 clients satisfaits qui renouvellent spontanement. Vous n&apos;avez pas un cycle de vente previsible. Vous n&apos;avez pas identifie votre ICP avec precision. Mais vous depensez comme si tout cela etait acquis.</p>
                    <p><strong className="text-[#111]">Le bon timing.</strong> Le go-to-market devrait commencer quand vous avez au minimum 20-30 clients qui paient, renouvellent et recommandent votre produit. Pas avant. Chaque euro depense en acquisition avant ce seuil est un euro brule.</p>
                  </div>
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-4">
                      <p className="text-[12px] font-semibold text-[#22C55E] mb-3">Signes que vous etes pret</p>
                      {[
                        "20+ clients qui paient et renouvellent",
                        "NPS superieur a 40",
                        "Cycle de vente previsible et documentee",
                        "Au moins 3 canaux d&apos;acquisition testes",
                        "ICP defini avec des criteres mesurables",
                      ].map((i) => (
                        <p key={i} className="text-[11px] text-[#555] mb-2 flex items-start gap-2">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#22C55E] shrink-0 mt-0.5"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          <span dangerouslySetInnerHTML={{ __html: i }} />
                        </p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-4">
                      <p className="text-[12px] font-semibold text-[#EF4444] mb-3">Signes que c&apos;est trop tot</p>
                      {[
                        "Moins de 10 clients payants",
                        "Churn mensuel superieur a 5%",
                        "Pas de renouvellement automatique",
                        "Chaque deal necessite du sur-mesure",
                        "L&apos;ICP change a chaque trimestre",
                      ].map((i) => (
                        <p key={i} className="text-[11px] text-[#555] mb-2 flex items-start gap-2">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#EF4444] shrink-0 mt-0.5"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                          <span dangerouslySetInnerHTML={{ __html: i }} />
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Pattern 3 : Le produit sans marche */}
              <section id="produit-sans-marche" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-md bg-[#EEF2FF] flex items-center justify-center text-[11px] font-bold text-[#4B5EFC]">3</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Le produit sans marche</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>42% des startups echouent parce qu&apos;il n&apos;y a pas de besoin reel pour leur produit. C&apos;est la raison numero un dans toutes les etudes, et pourtant c&apos;est la plus ignoree. Parce que les fondateurs tombent amoureux de leur solution avant de verifier que le probleme existe.</p>
                    <p>En SaaS B2B, le phenomene est encore plus insidieux. Vous pouvez construire un outil techniquement impressionnant, obtenir des feedbacks positifs en demo, et meme signer quelques clients early adopters. Mais les early adopters ne sont pas un marche. Ce sont des gens curieux, ouverts a la nouveaute, qui testent tout. Le vrai test, c&apos;est la majorite pragmatique : les entreprises qui acherent un outil uniquement quand le probleme est douloureux et que la solution est evidente.</p>
                    <p><strong className="text-[#111]">Le syndrome de la solution qui cherche un probleme.</strong> Vous avez une technologie interessante, vous cherchez des cas d&apos;usage. Vous pivotez tous les 3 mois. Vous multipliez les verticales. Chaque prospect a un besoin different et vous dites oui a tout. Au bout de 18 mois, votre produit fait 15 choses et aucune correctement.</p>
                    <p><strong className="text-[#111]">Le test qui ne trompe pas.</strong> Posez la question a vos prospects : &quot;Si cet outil disparaissait demain, quel serait l&apos;impact sur votre activite ?&quot; Si la reponse est &quot;on s&apos;adapterait&quot; ou &quot;on trouverait une alternative facilement&quot;, vous n&apos;avez pas de product-market fit. Vous avez un nice-to-have, pas un must-have.</p>
                  </div>
                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Le framework du PMF en SaaS B2B</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                      {[
                        { phase: "Exploration", desc: "0-10 clients. Vous cherchez le probleme. Chaque deal est unique. Normal.", color: "#FF7A59" },
                        { phase: "Validation", desc: "10-30 clients. Les patterns emergent. Vous identifiez votre ICP. Le cycle de vente se stabilise.", color: "#6C5CE7" },
                        { phase: "Traction", desc: "30+ clients. Les clients viennent a vous. Le bouche-a-oreille demarre. Le renouvellement est naturel.", color: "#22C55E" },
                      ].map((p) => (
                        <div key={p.phase} className="rounded-lg border border-[#F0F0F0] p-3">
                          <div className="text-[11px] font-bold mb-1" style={{ color: p.color }}>{p.phase}</div>
                          <p className="text-[10px] text-[#777] leading-[1.5]">{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Pattern 4 : L'over-engineering */}
              <section id="over-engineering" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-md bg-[#F3E8FF] flex items-center justify-center text-[11px] font-bold text-[#6C5CE7]">4</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">L&apos;over-engineering</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Construire pour le scale avant d&apos;avoir de la traction. C&apos;est le biais naturel des equipes techniques. Vous concevez une architecture microservices, vous implementez du Kubernetes, vous mettez en place du CI/CD avec 200 tests unitaires. Pour 12 utilisateurs.</p>
                    <p>Le probleme n&apos;est pas la qualite technique. C&apos;est le cout d&apos;opportunite. Chaque semaine passee a refactorer votre architecture est une semaine que vous ne passez pas a parler a des prospects, a tester votre pricing, a iterer sur votre onboarding. Et au stade seed, c&apos;est la vitesse d&apos;apprentissage qui determine votre survie, pas la qualite de votre code.</p>
                    <p><strong className="text-[#111]">La regle du &quot;do things that don&apos;t scale&quot;.</strong> Paul Graham avait raison. A 50 clients, vous n&apos;avez pas besoin d&apos;un systeme automatise de provisioning. Vous avez besoin de comprendre pourquoi le client 47 a churne et pourquoi le client 23 a recommande votre produit a 3 personnes. L&apos;infrastructure viendra plus tard.</p>
                    <p><strong className="text-[#111]">Le vrai signal.</strong> Quand votre serveur tombe parce que vous avez trop de trafic, c&apos;est un bon probleme a avoir. Quand votre architecture est parfaite mais que personne ne l&apos;utilise, c&apos;est un probleme fatal.</p>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      { label: "Temps moyen passe en engineering vs discovery", value: "80% / 20%", sublabel: "Startups qui echouent", color: "#EF4444" },
                      { label: "Temps moyen passe en engineering vs discovery", value: "40% / 60%", sublabel: "Startups qui reussissent", color: "#22C55E" },
                    ].map((s) => (
                      <div key={s.sublabel} className="rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4 text-center">
                        <div className="text-[18px] font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-[10px] text-[#999] mb-1">{s.label}</div>
                        <div className="text-[9px] font-medium" style={{ color: s.color }}>{s.sublabel}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Pattern 5 : Les silos marketing-sales */}
              <section id="silos" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-md bg-[#FEF3C7] flex items-center justify-center text-[11px] font-bold text-[#D97706]">5</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Les silos marketing-sales</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le marketing genere des leads. Les sales disent qu&apos;ils sont mauvais. Le marketing repond que les sales ne les traitent pas. C&apos;est le blame game classique, et il tue plus de startups qu&apos;on ne le pense.</p>
                    <p>Dans une startup SaaS B2B, le desalignement marketing-sales se manifeste de maniere concrete. Le marketing cible des entreprises de 10 salaries parce qu&apos;elles convertissent bien en MQL. Les sales veulent des entreprises de 200+ salaries parce que les deals sont plus gros. Resultat : le marketing depense 80% de son budget sur un segment que les sales ne veulent pas traiter.</p>
                    <p><strong className="text-[#111]">Le probleme de la definition du lead.</strong> Qu&apos;est-ce qu&apos;un lead qualifie ? Pour le marketing, c&apos;est quelqu&apos;un qui a telecharge un ebook et laisse son email. Pour les sales, c&apos;est quelqu&apos;un qui a un budget, un besoin identifie et une decision a prendre dans les 3 mois. Ces deux definitions n&apos;ont rien a voir. Et sans alignement sur cette definition, chaque equipe travaille dans le vide.</p>
                    <p><strong className="text-[#111]">L&apos;absence de SLA.</strong> Combien de temps les sales ont-ils pour traiter un lead entrant ? Quel est le nombre minimum de tentatives de contact ? Quel est le taux de conversion attendu par source ? Sans SLA entre marketing et sales, il n&apos;y a pas de responsabilite, pas de mesure, pas d&apos;amelioration possible.</p>
                  </div>
                  <div className="mt-5 rounded-xl bg-[#FFF7ED] border border-[#FFEDD5] p-4">
                    <p className="text-[12px] font-semibold text-[#D97706] mb-2">Le cout du desalignement</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                      {[
                        { stat: "60-70%", desc: "du contenu marketing n&apos;est jamais utilise par les sales" },
                        { stat: "45 min", desc: "delai moyen de traitement d&apos;un lead (vs 5 min recommande)" },
                        { stat: "79%", desc: "des MQL ne sont jamais convertis en clients" },
                      ].map((s) => (
                        <div key={s.desc} className="text-center">
                          <div className="text-[18px] font-bold text-[#D97706]">{s.stat}</div>
                          <p className="text-[10px] text-[#999] leading-[1.5] mt-1" dangerouslySetInnerHTML={{ __html: s.desc }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Pattern 6 : Le burn-rate incontrole */}
              <section id="burn-rate" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-md bg-[#FEF2F2] flex items-center justify-center text-[11px] font-bold text-[#EF4444]">6</span>
                    <h2 className="text-[17px] font-semibold text-[#111]">Le burn-rate incontrole</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>29% des startups echouent parce qu&apos;elles manquent de cash. Ce n&apos;est pas un probleme de revenus. C&apos;est un probleme de depenses. Le burn-rate augmente plus vite que le MRR, et un jour la tresorerie est a zero.</p>
                    <p><strong className="text-[#111]">Le ratio CAC / LTV.</strong> C&apos;est le ratio qui determine si votre modele SaaS est viable. Si votre cout d&apos;acquisition client (CAC) est de 5 000 euros et que votre client rapporte 4 000 euros sur toute sa duree de vie (LTV), vous perdez 1 000 euros a chaque client signe. Plus vous vendez, plus vous perdez. Et pourtant, beaucoup de startups continuent a recruter des commerciaux pour &quot;accelerer la croissance&quot;.</p>
                    <p><strong className="text-[#111]">La regle du 3:1.</strong> En SaaS B2B sain, votre LTV devrait etre au minimum 3 fois superieure a votre CAC. En dessous de ce ratio, vous detruisez de la valeur a chaque acquisition. Et le CAC doit etre recupere en moins de 12 mois (payback period). Au-dela, vous avez un probleme de tresorerie structurel.</p>
                    <p><strong className="text-[#111]">Les depenses cachees.</strong> Le burn-rate ne se resume pas aux salaires et au marketing. Les outils SaaS pour votre propre equipe (CRM, analytics, project management, cloud) peuvent representer 2 000 a 5 000 euros par mois. Les frais juridiques, comptables, administratifs s&apos;accumulent. Et chaque recrutement premature ajoute 6 a 12 mois de runway consomme.</p>
                  </div>
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "Unit economics sains", items: ["LTV / CAC > 3x", "Payback period < 12 mois", "Gross margin > 70%", "Net revenue retention > 100%"], color: "#22C55E", bg: "#F0FDF4" },
                      { title: "Unit economics toxiques", items: ["LTV / CAC < 1.5x", "Payback period > 18 mois", "Gross margin < 50%", "Churn mensuel > 5%"], color: "#EF4444", bg: "#FEF2F2" },
                    ].map((block) => (
                      <div key={block.title} className="rounded-xl p-4" style={{ background: block.bg }}>
                        <p className="text-[12px] font-semibold mb-3" style={{ color: block.color }}>{block.title}</p>
                        {block.items.map((item) => (
                          <p key={item} className="text-[11px] text-[#555] mb-2 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: block.color }} />{item}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Pattern 7 : L'absence de RevOps */}
              <section id="absence-revops" className="mb-8">
                <div className="rounded-2xl bg-[#111] p-5 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[11px] font-bold text-[#FF7A59]">7</span>
                    <h2 className="text-[17px] font-semibold text-white">L&apos;absence de RevOps</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Et voici le pattern qui les relie tous. L&apos;absence de Revenue Operations, c&apos;est l&apos;absence de systeme nerveux central dans votre entreprise. Pas de donnees fiables, pas de processus documentes, pas d&apos;alignement entre les equipes.</p>
                    <p>Le RevOps, ce n&apos;est pas un outil. Ce n&apos;est pas un poste. C&apos;est une discipline qui consiste a aligner les processus, les donnees et la technologie autour d&apos;un seul objectif : la croissance previsible du revenu. Sans RevOps, chaque equipe optimise son propre silo. Le marketing optimise les MQL. Les sales optimisent les meetings. Le CS optimise le NPS. Mais personne n&apos;optimise le revenu de bout en bout.</p>
                    <p><strong className="text-white/80">Les symptomes concrets.</strong> Votre CRM est une poubelle de donnees. Personne ne sait combien de temps prend votre cycle de vente. Votre taux de conversion varie de 1 a 10 selon qui le calcule. Les forecasts sont faux chaque mois. Les commerciaux passent 40% de leur temps sur de l&apos;administratif au lieu de vendre.</p>
                    <p><strong className="text-white/80">Le cout reel.</strong> Une etude de Forrester montre que les entreprises avec une fonction RevOps mature croissent 19% plus vite et sont 15% plus rentables que celles qui n&apos;en ont pas. Ce n&apos;est pas un avantage marginal. C&apos;est la difference entre survivre et mourir.</p>
                  </div>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: "Processus", desc: "Pipeline standardise, SLA definis, playbooks documentes, handoff clairs entre equipes", color: "#FF7A59" },
                      { label: "Donnees", desc: "Source de verite unique (CRM), metriques partagees, reporting automatise, data quality", color: "#6C5CE7" },
                      { label: "Technologie", desc: "Stack integree, automatisations, workflows, outils connectes entre eux", color: "#4B5EFC" },
                    ].map((pillar) => (
                      <div key={pillar.label} className="rounded-xl bg-white/5 border border-white/10 p-4">
                        <div className="text-[12px] font-bold mb-2" style={{ color: pillar.color }}>{pillar.label}</div>
                        <p className="text-[10px] text-white/40 leading-[1.6]">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Les signaux d'alerte */}
              <section id="signaux" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les signaux d&apos;alerte a surveiller</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Les startups ne meurent pas du jour au lendemain. Elles s&apos;affaiblissent progressivement pendant des mois avant de s&apos;effondrer. Voici les metriques qui doivent declencher une alerte rouge dans votre tableau de bord.</p>
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      { metric: "Churn mensuel > 5%", desc: "Vous perdez plus de la moitie de vos clients chaque annee. Aucune croissance ne compense un tel niveau d&apos;attrition. Priorite absolue : comprendre pourquoi les clients partent avant de chercher a en acquerir de nouveaux.", level: "Critique", color: "#EF4444" },
                      { metric: "CAC payback > 18 mois", desc: "Chaque client vous coute plus cher a acquerir qu&apos;il ne vous rapporte pendant un an et demi. Votre tresorerie est sous pression constante. Revoyez vos canaux d&apos;acquisition ou augmentez vos prix.", level: "Critique", color: "#EF4444" },
                      { metric: "LTV / CAC < 2x", desc: "Vous etes dans la zone de destruction de valeur. Chaque euro investi en acquisition ne genere pas assez de retour. Votre modele n&apos;est pas viable en l&apos;etat.", level: "Alerte haute", color: "#FF7A59" },
                      { metric: "Net Revenue Retention < 90%", desc: "Vos clients existants depensent moins au fil du temps. Pas d&apos;upsell, pas d&apos;expansion. Vous courez sur un tapis roulant : chaque mois, vous devez acquerir de nouveaux clients juste pour maintenir votre MRR.", level: "Alerte haute", color: "#FF7A59" },
                      { metric: "Taux de conversion lead-client < 2%", desc: "Vous generez beaucoup de leads mais tres peu deviennent clients. Soit vos leads ne sont pas qualifies, soit votre processus de vente est defaillant, soit votre produit ne convainc pas en demo.", level: "Alerte", color: "#D97706" },
                      { metric: "Runway < 6 mois", desc: "Vous avez moins de 6 mois de tresorerie devant vous. Il est temps de couper les depenses non essentielles et de concentrer toutes vos ressources sur ce qui genere du revenu immediatement.", level: "Urgence", color: "#EF4444" },
                    ].map((alert) => (
                      <div key={alert.metric} className="flex gap-3 items-start rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                        <div className="w-16 shrink-0">
                          <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold text-white" style={{ background: alert.color }}>{alert.level}</span>
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#111] mb-1">{alert.metric}</p>
                          <p className="text-[11px] text-[#777] leading-[1.65]">{alert.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Comment eviter le cimetiere */}
              <section id="eviter-cimetiere" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Comment eviter le cimetiere</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La bonne nouvelle, c&apos;est que tous ces patterns d&apos;echec sont evitables. Pas avec de la chance ou de l&apos;intuition, mais avec de la methode. Et c&apos;est exactement ce que le RevOps apporte : une methodologie operationnelle pour piloter la croissance du revenu.</p>
                    <p>Voici les fondamentaux qui separent les startups SaaS B2B qui survivent de celles qui finissent au cimetiere.</p>
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      {
                        title: "1. Validez avant de scaler",
                        desc: "Ne depensez pas 1 euro en acquisition payante avant d&apos;avoir 20 clients qui paient, renouvellent et recommandent. Utilisez les 12 premiers mois pour apprendre, pas pour croitre.",
                        color: "#FF7A59"
                      },
                      {
                        title: "2. Mettez en place votre CRM des le jour 1",
                        desc: "Pas dans 6 mois. Pas quand vous aurez 50 clients. Maintenant. Chaque interaction prospect doit etre tracee, chaque deal documente, chaque conversion mesuree. HubSpot gratuit suffit pour commencer.",
                        color: "#4B5EFC"
                      },
                      {
                        title: "3. Definissez vos unit economics",
                        desc: "Connaissez votre CAC, votre LTV, votre payback period, votre churn. Si vous ne pouvez pas calculer ces 4 metriques, vous pilotez a l&apos;aveugle. Faites-le meme avec des approximations.",
                        color: "#6C5CE7"
                      },
                      {
                        title: "4. Alignez marketing et sales sur un funnel unique",
                        desc: "Un seul pipeline, une seule definition du lead qualifie, des SLA documentes. Le marketing sait exactement ce que les sales attendent. Les sales savent exactement ce que le marketing delivre.",
                        color: "#22C55E"
                      },
                      {
                        title: "5. Automatisez les processus repetitifs",
                        desc: "Chaque tache manuelle est une source d&apos;erreur et de perte de temps. Assignation des leads, relances, mise a jour du CRM, reporting. Automatisez tout ce qui peut l&apos;etre pour que vos equipes se concentrent sur ce qui genere du revenu.",
                        color: "#D97706"
                      },
                      {
                        title: "6. Mesurez ce qui compte",
                        desc: "Pas les vanity metrics (nombre de leads, trafic web, followers). Les metriques qui predisent votre survie : pipeline weighted, win rate, sales velocity, net revenue retention. Regardez-les chaque semaine.",
                        color: "#EF4444"
                      },
                    ].map((step) => (
                      <div key={step.title} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: step.color }} />
                        <div>
                          <p className="text-[13px] font-semibold text-[#111] mb-1">{step.title}</p>
                          <p className="text-[12px] text-[#777] leading-[1.65]">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Le RevOps comme prevention</p>
                    <p className="text-[12px] text-[#777] leading-[1.65]">Le RevOps n&apos;est pas un luxe reserve aux entreprises de 100 personnes. C&apos;est une discipline qui se met en place des les premiers clients. Un CRM bien configure, des processus documentes, des metriques suivies chaque semaine. C&apos;est la difference entre piloter une startup avec un tableau de bord et piloter a l&apos;aveugle en esperant que ca marche.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Conclusion */}
              <section id="conclusion" className="mb-8">
                <div className="rounded-2xl bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Conclusion</span>
                  <h2 className="text-[20px] font-semibold text-white mb-4">Le cimetiere n&apos;est pas une fatalite</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>90% des startups echouent. C&apos;est un fait. Mais ce chiffre cache une realite plus nuancee : la majorite de ces echecs ne sont pas des surprises. Ce sont des patterns connus, documentes, previsibles. Le pricing qui ne fonctionne pas, le go-to-market premature, le produit sans marche, l&apos;over-engineering, les silos entre equipes, le burn-rate incontrole, l&apos;absence de processus.</p>
                    <p>Chacun de ces patterns laisse des traces dans vos donnees. Un churn qui augmente, un CAC qui explose, un pipeline qui stagne, des forecasts qui ne se realisent jamais. Si vous savez ou regarder, vous pouvez les detecter 6 a 12 mois avant qu&apos;ils ne deviennent fatals.</p>
                    <p>C&apos;est tout l&apos;enjeu du RevOps. Pas un outil magique. Pas un buzzword. Une discipline operationnelle qui force l&apos;alignement, la mesure et l&apos;amelioration continue. Les startups SaaS B2B qui mettent en place une fonction RevOps des leurs premiers clients ne sont pas a l&apos;abri de l&apos;echec. Mais elles voient venir les problemes et peuvent reagir avant qu&apos;il ne soit trop tard.</p>
                    <p>Le cimetiere des startups est plein d&apos;entreprises qui avaient un bon produit mais pas de systeme pour le vendre. Ne soyez pas la prochaine.</p>
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
                    <p className="text-[12px] font-semibold text-[#111] leading-[1.4] group-hover:text-[#FF7A59] transition-colors">{a.title}</p>
                    <p className="text-[10px] text-[#999] mt-2">{a.category}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section>
              <div className="rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Votre startup merite mieux que le cimetiere</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[450px] mx-auto">On aide les startups SaaS B2B a structurer leurs processus RevOps, aligner leurs equipes et piloter leur croissance avec les bonnes metriques. Avant qu&apos;il ne soit trop tard.</p>
                <div className="flex items-center justify-center gap-3">
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#FF7A59]" />Diagnostic RevOps gratuit
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