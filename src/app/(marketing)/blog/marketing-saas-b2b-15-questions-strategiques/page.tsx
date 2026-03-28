"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Marketing SaaS B2B : 15 questions strategiques inevitables",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-02-12",
  dateModified: "2026-02-12",
  description: "Les 15 questions fondamentales a se poser avant de construire sa strategie marketing SaaS B2B. Positionnement, ICP, canaux, budget, metriques, equipe.",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/marketing-saas-b2b-15-questions-strategiques" },
  articleSection: "RevOps",
  wordCount: 2800,
};

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "positionnement-icp", title: "Positionnement & ICP" },
  { id: "q1", title: "Q1. Quel probleme resolvez-vous ?" },
  { id: "q2", title: "Q2. Qui est votre ICP ?" },
  { id: "q3", title: "Q3. Pourquoi vous ?" },
  { id: "q4", title: "Q4. Positionnement prix" },
  { id: "canaux-acquisition", title: "Canaux & Acquisition" },
  { id: "q5", title: "Q5. Quel canal privilegier ?" },
  { id: "q6", title: "Q6. CAC acceptable" },
  { id: "q7", title: "Q7. Content ou paid ?" },
  { id: "q8", title: "Q8. Cold outbound ?" },
  { id: "q9", title: "Q9. SEO des maintenant ?" },
  { id: "metriques-operations", title: "Metriques & Operations" },
  { id: "q10", title: "Q10. Quels KPI suivre ?" },
  { id: "q11", title: "Q11. Quel CRM ?" },
  { id: "q12", title: "Q12. Structurer le funnel" },
  { id: "q13", title: "Q13. Mesurer le ROI" },
  { id: "equipe-scaling", title: "Equipe & Scaling" },
  { id: "q14", title: "Q14. Premier marketeur" },
  { id: "q15", title: "Q15. RevOps des le debut ?" },
  { id: "conclusion", title: "Conclusion" },
];

const relatedArticles = [
  { title: "9 actions commerciales que vous devriez automatiser", slug: "9-actions-commerciales-automatiser", category: "Automatisation", color: "#6C5CE7" },
  { title: "Tracker les soumissions de formulaire HubSpot dans GA4", slug: "tracker-soumissions-formulaire-hubspot-google-analytics-google-tag-manager", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Emelia : notre test complet de l&apos;outil de cold emailing", slug: "emelia-test-outil-cold-emailing", category: "Process & Outils", color: "#6C5CE7" },
];

function QuestionCard({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-lg bg-[#FF7A59]/10 flex items-center justify-center shrink-0">
          <span className="text-[15px] font-bold text-[#FF7A59]">{number}</span>
        </div>
        <h3 className="text-[17px] font-semibold text-[#111] leading-[1.3] pt-2">{title}</h3>
      </div>
      <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
        {children}
      </div>
    </div>
  );
}

export default function MarketingSaaSB2BArticle() {
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
        <div className="h-full bg-[#FF7A59] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "8%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "25%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "45%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "65%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "82%", width: 240, height: 240, borderRadius: "50%", background: "#FF7A59", opacity: 0.06, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet?url=https://www.ceres-revops.com/blog/marketing-saas-b2b-15-questions-strategiques&text=Marketing%20SaaS%20B2B%20:%2015%20questions%20strat%C3%A9giques%20in%C3%A9vitables" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/marketing-saas-b2b-15-questions-strategiques" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Marketing SaaS B2B</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>RevOps</Badge>
                <span className="text-[11px] text-[#CCC]">16 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Marketing SaaS B2B : 15 questions strategiques inevitables
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Avant de lancer une campagne, choisir un canal ou recruter un marketeur, il faut repondre a 15 questions fondamentales. Positionnement, ICP, canaux d&apos;acquisition, budget, metriques, equipe. Ce sont les fondations de toute strategie marketing SaaS B2B. Sans elles, vous construisez sur du sable.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>12 fev 2026</span>
              </div>

              {/* Overview card */}
              <div className="mt-8 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                <p className="text-[13px] font-semibold text-[#111] mb-4">Les 4 piliers couverts dans cet article</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Positionnement & ICP", count: "4 questions", color: "#FF7A59" },
                    { label: "Canaux & Acquisition", count: "5 questions", color: "#4B5EFC" },
                    { label: "Metriques & Ops", count: "4 questions", color: "#6C5CE7" },
                    { label: "Equipe & Scaling", count: "2 questions", color: "#22C55E" },
                  ].map((p) => (
                    <div key={p.label} className="text-center rounded-lg bg-white border border-[#F2F2F2] p-3">
                      <div className="text-[16px] font-bold" style={{ color: p.color }}>{p.count}</div>
                      <div className="text-[10px] text-[#999] mt-1">{p.label}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[12px] text-[#777] leading-[1.6]">
                  Chaque question est accompagnee de son contexte, de la raison pour laquelle elle est critique, de la methode pour y repondre, des erreurs courantes a eviter, et de notre recommandation concrete. Ce n&apos;est pas un guide theorique. C&apos;est le framework que l&apos;on utilise chez Ceres avec nos clients SaaS B2B.
                </p>
              </div>
            </header>

            <article>
              {/* Intro */}
              <section id="intro" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi ces 15 questions avant toute strategie</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>On accompagne des SaaS B2B depuis 2021 chez Ceres. Des startups early-stage, des scaleups en Serie A, des PME tech qui cherchent a structurer leur croissance. Et on constate le meme schema a chaque fois.</p>
                    <p>La majorite des fondateurs SaaS commencent par les tactiques. Ils veulent lancer des ads LinkedIn, creer un blog, tester le cold email, ouvrir un canal Product Hunt. Mais quand on leur demande qui est leur ICP, quel est leur CAC cible, ou comment ils mesurent le ROI marketing, les reponses sont floues. Parfois inexistantes.</p>
                    <p>Le resultat est previsible. Des budgets dilapides sur des canaux mal adaptes. Des contenus qui ne generent pas de pipeline. Des equipes sales et marketing desalignees. Des metriques suivies par habitude plutot que par pertinence.</p>
                    <p>Ces 15 questions ne sont pas optionnelles. Ce sont les fondations. Elles couvrent quatre dimensions : le positionnement et l&apos;ICP, les canaux d&apos;acquisition, les metriques et les operations, l&apos;equipe et le scaling. Repondre a chacune d&apos;entre elles avant de depenser le moindre euro en marketing, c&apos;est ce qui separe les SaaS qui grandissent de ceux qui stagnent.</p>
                    <p>On vous partage le framework exact que l&apos;on utilise avec nos clients. Pour chaque question : le contexte, la methode pour y repondre, les erreurs les plus frequentes, et notre recommandation concrete.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* === BLOC 1 : Positionnement & ICP === */}
              <section id="positionnement-icp" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Bloc 1 sur 4</span>
                  <h2 className="text-[20px] font-semibold text-white mb-3">Positionnement &amp; ICP</h2>
                  <p className="text-[13px] text-white/60 leading-[1.75]">Les quatre premieres questions portent sur les fondations absolues. Si vous ne savez pas quel probleme vous resolvez, pour qui, et pourquoi on devrait vous choisir, aucune tactique marketing ne compensera ce manque de clarte. C&apos;est la base sur laquelle tout le reste repose.</p>
                  <div className="mt-5 grid grid-cols-4 gap-3">
                    {["Q1", "Q2", "Q3", "Q4"].map((q) => (
                      <div key={q} className="rounded-lg bg-white/5 p-3 text-center">
                        <span className="text-[14px] font-bold text-[#FF7A59]">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Q1 */}
              <section id="q1" className="mb-8">
                <QuestionCard number={1} title="Quel probleme resolvez-vous concretement ?">
                  <p><strong className="text-[#111]">Contexte.</strong> La plupart des SaaS B2B decrivent leur produit par ses fonctionnalites. &ldquo;On fait du reporting automatise&rdquo;, &ldquo;on centralise les donnees&rdquo;, &ldquo;on simplifie la collaboration&rdquo;. Ce n&apos;est pas un probleme, c&apos;est une description technique. Votre prospect ne cherche pas un outil. Il cherche a resoudre une douleur.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Le framework Jobs-to-be-Done (JTBD) de Clayton Christensen le formule bien : les gens n&apos;achetent pas un produit, ils le &ldquo;recrutent&rdquo; pour accomplir un travail. Si vous ne pouvez pas articuler ce travail en une phrase, votre marketing sera generique et inefficace. Chaque page, chaque email, chaque ad doit partir de cette douleur.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Interviewez 10 a 15 clients actuels. Posez-leur trois questions : quel probleme essayiez-vous de resoudre quand vous avez cherche une solution ? Qu&apos;est-ce que vous utilisiez avant nous ? Qu&apos;est-ce qui se passerait si vous n&apos;aviez plus notre outil demain ? Les reponses recurrentes forment votre positionnement.</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Decrire le produit au lieu du probleme. Lister 5 problemes differents au lieu d&apos;en choisir un principal. Rester trop vague (&ldquo;on aide les entreprises a gagner du temps&rdquo;). Confondre le probleme du fondateur avec celui du client.</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> Redigez votre proposition de valeur sous la forme : &ldquo;[Votre produit] aide [ICP] a [resultat concret] sans [friction principale]&rdquo;. Testez-la sur 5 prospects qui ne vous connaissent pas. Si ils comprennent en 10 secondes ce que vous faites, c&apos;est bon. Sinon, iterez.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* Q2 */}
              <section id="q2" className="mb-8">
                <QuestionCard number={2} title="Qui est votre ICP ?">
                  <p><strong className="text-[#111]">Contexte.</strong> L&apos;ICP (Ideal Customer Profilee) n&apos;est pas un persona marketing classique. Ce n&apos;est pas &ldquo;Marie, 35 ans, directrice marketing, aime le yoga&rdquo;. C&apos;est le profil d&apos;entreprise et de decideur pour lequel votre produit cree le plus de valeur et qui est le plus susceptible d&apos;acheter.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Un ICP mal defini, c&apos;est du budget marketing gaspille. Vous ciblez trop large, vos messages sont generiques, vos taux de conversion sont faibles. Un ICP precis permet de concentrer 100% de vos efforts sur les comptes qui ont la plus forte probabilite de conversion et le meilleur potentiel de retention.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Analysez vos 20 meilleurs clients sur quatre axes. Taille d&apos;entreprise (nombre d&apos;employes, CA). Secteur d&apos;activite. Persona decideur (titre, seniority). Budget et cycle de vente. Cherchez les patterns. Si 70% de vos meilleurs clients sont des PME tech de 50 a 200 employes ou le VP Sales est le decideur, c&apos;est votre ICP.</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Definir un ICP trop large (&ldquo;toutes les entreprises B2B&rdquo;). Avoir plusieurs ICP des le debut sans les prioriser. Ne pas distinguer l&apos;utilisateur du decideur et du champion interne. Dismiss les signaux negatifs (quels profils churnent le plus).</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> Commencez avec un seul ICP. Un segment, un persona, un message. Quand vous atteignez un product-market fit solide sur ce segment (NPS &gt; 40, retention nette &gt; 100%), alors seulement elargissez a un second ICP. Chez Ceres, on utilise un scoring ICP dans HubSpot pour qualifier automatiquement les leads entrants.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* Q3 */}
              <section id="q3" className="mb-8">
                <QuestionCard number={3} title="Pourquoi vous plutot qu&apos;un autre ?">
                  <p><strong className="text-[#111]">Contexte.</strong> Dans un marche SaaS B2B sature, votre prospect a toujours des alternatives. D&apos;autres outils, le statu quo (Excel, process manuels), ou simplement ne rien faire. Votre differenciateur n&apos;est pas une fonctionnalite en plus. C&apos;est la raison profonde pour laquelle un prospect rationnel devrait vous choisir.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Sans differenciateur clair, vous etes en competition sur le prix. Et en SaaS B2B, la competition sur le prix est une course vers le bas. Votre moat (avantage defensible) determine votre capacite a maintenir vos prix, a retenir vos clients, et a resister a l&apos;arrivee de nouveaux concurrents.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Listez vos 5 principaux concurrents. Pour chacun, identifiez leur force principale. Trouvez l&apos;axe sur lequel vous etes objectivement superieur. Les moats classiques en SaaS : la data proprietary, l&apos;integration profonde dans le workflow, l&apos;expertise verticale, le reseau d&apos;effets, la velocite d&apos;execution.</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Revendiquer un differenciateur que tout le monde revendique (&ldquo;interface simple&rdquo;, &ldquo;excellent support&rdquo;). Dismiss la concurrence indirecte (spreadsheets, process manuels). Se positionner sur un differenciateur non verifiable par le prospect avant l&apos;achat.</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> Formulez votre differenciateur comme une evidence testable. &ldquo;On est le seul outil qui [fait X] pour [ICP]&rdquo;. Si un concurrent peut dire la meme phrase en remplacant votre nom par le sien, ce n&apos;est pas un differenciateur. Validez-le en demandant a vos clients pourquoi ils vous ont choisi, pas pourquoi ils vous aiment.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* Q4 */}
              <section id="q4" className="mb-8">
                <QuestionCard number={4} title="Quel est votre positionnement prix ?">
                  <p><strong className="text-[#111]">Contexte.</strong> Le pricing n&apos;est pas un detail operationnel. C&apos;est une decision strategique qui conditionne tout le reste : les canaux d&apos;acquisition viables, la structure d&apos;equipe necessaire, le type de contenu a produire, et meme le produit que vous construisez. Freemium, PLG (Product-Led Growth), sales-assisted, enterprise : chaque modele implique une strategie marketing radicalement differente.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Un SaaS a 29 euros par mois ne peut pas se permettre un cycle de vente de 3 mois avec des demos personnalisees. Un SaaS enterprise a 50 000 euros par an ne peut pas compter uniquement sur le self-service. Le prix determine le CAC acceptable, qui determine les canaux viables, qui determine la strategie marketing.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Commencez par calculer votre ACV (Annual Contract Value) moyen. En dessous de 5 000 euros par an, vous etes sur un modele PLG ou freemium : le marketing doit generer du volume. Entre 5 000 et 50 000 euros, modele sales-assisted : le marketing genere des MQL que les sales convertissent. Au-dessus de 50 000 euros, modele enterprise : le marketing fait de l&apos;ABM (Account-Based Marketing).</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Proposer un plan freemium quand le produit est complexe a onboarder. Fixer un prix trop bas pour couvrir le CAC. Avoir 5 plans tarifaires des le debut. Copier la grille de prix d&apos;un concurrent sans adapter le modele a sa propre realite (CAC, retention, marge).</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> Commencez avec 2 plans maximum. Un plan principal (votre sweet spot) et un plan premium pour les comptes plus gros. Augmentez vos prix de 20% tous les 6 mois tant que le taux de conversion ne baisse pas. La majorite des SaaS B2B sous-facturent, surtout en early-stage.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* === BLOC 2 : Canaux & Acquisition === */}
              <section id="canaux-acquisition" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Bloc 2 sur 4</span>
                  <h2 className="text-[20px] font-semibold text-white mb-3">Canaux &amp; Acquisition</h2>
                  <p className="text-[13px] text-white/60 leading-[1.75]">Une fois le positionnement clair, la question suivante est : comment atteindre votre ICP ? Le choix des canaux d&apos;acquisition est la decision la plus impactante sur votre budget et votre velocity. Cinq questions pour la cadrer correctement.</p>
                  <div className="mt-5 grid grid-cols-5 gap-3">
                    {["Q5", "Q6", "Q7", "Q8", "Q9"].map((q) => (
                      <div key={q} className="rounded-lg bg-white/5 p-3 text-center">
                        <span className="text-[14px] font-bold text-[#4B5EFC]">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Q5 */}
              <section id="q5" className="mb-8">
                <QuestionCard number={5} title="Quel canal d&apos;acquisition privilegier ?">
                  <p><strong className="text-[#111]">Contexte.</strong> Inbound, outbound, PLG, partnerships, communaute, events. Les canaux d&apos;acquisition sont nombreux et chacun a ses propres regles du jeu. Le piege classique est de vouloir etre present partout en meme temps. Le resultat : des efforts dilues et aucun canal qui atteint la masse critique.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> La theorie du &ldquo;Bullseye Framework&rdquo; de Gabriel Weinberg (Traction) le montre bien : a un instant T, il n&apos;y a generalement qu&apos;un ou deux canaux qui fonctionnent vraiment pour votre entreprise. Les identifier rapidement et y concentrer vos ressources fait toute la difference.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Croisez trois variables. Votre ACV (les petits tickets imposent des canaux scalables comme le PLG ou le content ; les gros tickets permettent l&apos;outbound). Votre ICP (ou passe-t-il du temps ? LinkedIn, conferences, communautes Slack, podcasts ?). Votre timeline (vous avez besoin de resultats dans 3 mois ou vous pouvez investir sur 12 mois ?).</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Lancer 5 canaux en parallele avec une equipe de 2 personnes. Choisir un canal parce que &ldquo;tout le monde le fait&rdquo; sans verifier son adequation avec l&apos;ICP. Abandonner un canal avant de l&apos;avoir teste correctement (minimum 3 mois, 100 interactions).</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> Testez 3 canaux en parallele pendant 90 jours avec un budget minimal. Mesurez le CAC et le taux de conversion pour chaque canal. Doublez la mise sur le canal gagnant, maintenez le second, et arretez le troisieme. Ne diversifiez qu&apos;une fois qu&apos;un canal produit des resultats previsibles.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* Q6 */}
              <section id="q6" className="mb-8">
                <QuestionCard number={6} title="Quel est votre cout d&apos;acquisition acceptable ?">
                  <p><strong className="text-[#111]">Contexte.</strong> Le CAC (Customer Acquisition Cost) est le montant total que vous depensez pour acquerir un nouveau client : salaires marketing et sales, outils, publicites, creation de contenu. Le ratio CAC/LTV (Lifetime Value) est la metrique fondamentale qui determine si votre business model est viable.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Si vous ne connaissez pas votre CAC cible, vous ne pouvez pas evaluer la performance d&apos;un canal, la rentabilite d&apos;une campagne, ni decider du budget a allouer. Le benchmark SaaS B2B est un ratio LTV/CAC superieur a 3. En dessous, vous brulez du cash. Au-dessus de 5, vous sous-investissez probablement en acquisition.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Calculez votre LTV : revenu mensuel moyen par client multiplie par la duree de vie moyenne en mois. Divisez par 3 pour obtenir votre CAC cible. Par exemple, si votre ARPU est de 200 euros par mois et votre duree de vie moyenne est de 24 mois, votre LTV est de 4 800 euros. Votre CAC cible est donc d&apos;environ 1 600 euros.</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Ne pas inclure les salaires dans le calcul du CAC. Calculer un CAC global au lieu de le segmenter par canal. Dismiss le payback period (combien de mois pour rembourser le CAC). Comparer son CAC a des benchmarks sans tenir compte de son propre modele de pricing.</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> Suivez le CAC payback period plutot que le ratio LTV/CAC brut. Un payback de moins de 12 mois est excellent. De 12 a 18 mois, acceptable. Au-dela de 18 mois, il faut revoir soit le pricing, soit l&apos;efficacite des canaux d&apos;acquisition. Chez Ceres, on configure ce suivi directement dans HubSpot avec des proprietes calculees.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* Q7 */}
              <section id="q7" className="mb-8">
                <QuestionCard number={7} title="Content marketing ou paid ?">
                  <p><strong className="text-[#111]">Contexte.</strong> Le content marketing (blog, SEO, lead magnets, webinaires) est un investissement long terme. Le paid (Google Ads, LinkedIn Ads, Meta Ads) produit des resultats immediats mais s&apos;arrete quand vous coupez le budget. La question n&apos;est pas lequel est meilleur, c&apos;est lequel est adapte a votre situation actuelle.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Un SaaS early-stage qui met tout son budget en content marketing et attend 9 mois pour voir les premiers resultats SEO risque de manquer de cash. A l&apos;inverse, un SaaS qui ne fait que du paid sans construire d&apos;actifs (contenu, SEO, brand) reste dependant de son budget pub et voit son CAC augmenter avec le temps.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Si vous avez besoin de resultats dans les 3 prochains mois : privilegiez le paid (LinkedIn Ads pour le B2B, Google Ads sur les mots-cles intent). Si vous avez un horizon de 6 a 12 mois : lancez le content en parallele du paid. Si vous avez deja du trafic et des leads entrants : basculez progressivement le budget du paid vers le content.</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Lancer un blog sans strategie SEO (ecrire des articles que personne ne cherche). Investir en LinkedIn Ads sans avoir defini son ICP et ses audiences. Mesurer le ROI du content avec les memes KPIs que le paid (le content a un effet compose, pas lineaire). Considerer que le content est &ldquo;gratuit&rdquo; (le temps de production a un cout).</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> La repartition ideale pour un SaaS B2B en phase de croissance : 60% content, 30% paid, 10% experimental. Mais en phase de lancement (0 a 100 clients), inversez : 60% paid, 30% outbound, 10% content. Le content est un jeu de long terme, mais il faut survivre a court terme pour en beneficier.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* Q8 */}
              <section id="q8" className="mb-8">
                <QuestionCard number={8} title="Le cold outbound est-il pertinent pour vous ?">
                  <p><strong className="text-[#111]">Contexte.</strong> Le cold outbound (cold email, cold calling, LinkedIn outreach) est souvent presente comme la solution miracle pour les startups B2B. La realite est plus nuancee. Le cold outbound fonctionne tres bien dans certains contextes et tres mal dans d&apos;autres. Le critere principal : votre ACV.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Le cold outbound a un cout fixe eleve (outils, temps SDR, infrastructure email) mais un cout marginal faible. Si votre ACV est de 500 euros par an, le cout d&apos;un SDR ne sera jamais rentabilise. Si votre ACV est de 20 000 euros par an, un seul deal justifie des semaines de prospection.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Regle generale : le cold outbound devient rentable a partir d&apos;un ACV de 5 000 euros par an. En dessous, privilegiez le PLG, le content, ou le paid. Ajoutez un second critere : la complexite du cycle de vente. Si votre prospect a besoin d&apos;education avant d&apos;acheter, l&apos;outbound est un bon canal pour initier la conversation.</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Faire du cold email en masse sans ciblage precis (taux de reponse &lt; 1%). Utiliser des templates generiques copies de LinkedIn. Ne pas warmer ses domaines email avant de lancer les campagnes. Envoyer depuis son domaine principal au lieu de domaines secondaires. Ne pas avoir de CRM connecte pour suivre les reponses.</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> Si votre ACV est superieur a 5 000 euros et que votre ICP est identifiable sur LinkedIn ou via des bases B2B, testez le cold outbound sur 500 prospects avant de scaler. Objectif : 2 a 5% de taux de reponse positive. En dessous, retravaillez le ciblage et le messaging avant d&apos;augmenter le volume.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* Q9 */}
              <section id="q9" className="mb-8">
                <QuestionCard number={9} title="Faut-il investir dans le SEO des maintenant ?">
                  <p><strong className="text-[#111]">Contexte.</strong> Le SEO est le canal d&apos;acquisition le plus rentable a long terme pour un SaaS B2B. Les couts d&apos;acquisition marginaux tendent vers zero une fois le contenu positionne. Mais le time-to-value est long : 6 a 12 mois minimum avant de voir des resultats significatifs. Et la competition sur les mots-cles B2B est de plus en plus forte.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Chaque mois sans SEO est un mois de overdue sur vos concurrents qui investissent deja. L&apos;effet compose du SEO signifie que ceux qui commencent tot accumulent un avantage exponentiel. Mais investir en SEO trop tot (avant le product-market fit) revient a construire du trafic pour un produit que personne ne veut.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Si vous avez atteint le product-market fit (10 clients satisfaits minimum, retention saine) : oui, commencez le SEO immediatement. Si vous etes en phase de validation : concentrez-vous sur le paid et l&apos;outbound, et ne produisez que du contenu bottom-funnel (comparatifs, pages alternatives, cas d&apos;usage specifiques).</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Ecrire des articles top-funnel generiques (&ldquo;Qu&apos;est-ce que le B2B ?&rdquo;) qui attirent du trafic non qualifie. Dismiss le SEO technique (vitesse, indexation, structure). Ne pas avoir de strategie de mots-cles avant de commencer a ecrire. Publier 3 articles puis abandonner en attendant des resultats.</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> Commencez par le bottom-funnel. Creez une page pour chaque cas d&apos;usage, chaque alternative (&ldquo;[Votre outil] vs [Concurrent]&rdquo;), chaque integration. Ces pages convertissent mieux et se positionnent plus vite que les articles generiques. Puis construisez des pillar pages sur vos thematiques coeur. Publiez au minimum 2 articles par semaine pour creer de la traction.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* === BLOC 3 : Metriques & Operations === */}
              <section id="metriques-operations" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Bloc 3 sur 4</span>
                  <h2 className="text-[20px] font-semibold text-white mb-3">Metriques &amp; Operations</h2>
                  <p className="text-[13px] text-white/60 leading-[1.75]">Le marketing sans mesure n&apos;est pas du marketing, c&apos;est de l&apos;espoir. Quatre questions pour structurer vos operations, choisir vos outils, et mesurer ce qui compte vraiment.</p>
                  <div className="mt-5 grid grid-cols-4 gap-3">
                    {["Q10", "Q11", "Q12", "Q13"].map((q) => (
                      <div key={q} className="rounded-lg bg-white/5 p-3 text-center">
                        <span className="text-[14px] font-bold text-[#6C5CE7]">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Q10 */}
              <section id="q10" className="mb-8">
                <QuestionCard number={10} title="Quels KPI suivre en priorite ?">
                  <p><strong className="text-[#111]">Contexte.</strong> Les tableaux de bord marketing des SaaS B2B contiennent souvent 30, 40, parfois 50 metriques. Le nombre de visiteurs, les impressions LinkedIn, les taux d&apos;ouverture email, les likes, les partages. La plupart de ces metriques sont des vanity metrics. Elles bougent mais ne disent rien sur la croissance du business.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Vous ne pouvez pas optimiser ce que vous ne mesurez pas. Mais mesurer trop de choses revient a ne rien mesurer. L&apos;enjeu est d&apos;identifier votre North Star Metric (la metrique unique qui capture le mieux la valeur que vous delivrez) et les leading indicators qui la predisent.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Definissez une North Star Metric alignee avec la valeur client. Pour un SaaS d&apos;analytics : nombre de rapports generes par semaine. Pour un CRM : nombre de deals avances par utilisateur. Puis identifiez 3 a 5 leading indicators : trafic qualifie, MQL, demos bookees, taux de conversion demo-to-close, CAC payback.</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Suivre le nombre de MQL sans mesurer la qualite (quel pourcentage devient client). Celebrer la croissance du trafic sans verifier s&apos;il convertit. Confondre activite et impact (nombre d&apos;articles publies versus pipeline genere par le content). Changer de KPIs chaque mois sans laisser le temps aux tendances de se former.</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> Construisez un dashboard marketing en 3 niveaux. Niveau 1 (hebdomadaire) : 3 metriques maximum (pipeline genere, CAC, taux de conversion). Niveau 2 (mensuel) : 8 a 10 metriques par canal. Niveau 3 (trimestriel) : metriques strategiques (LTV/CAC, NRR, payback period). Chez Ceres, on configure ces dashboards directement dans HubSpot.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* Q11 */}
              <section id="q11" className="mb-8">
                <QuestionCard number={11} title="Quel CRM utiliser ?">
                  <p><strong className="text-[#111]">Contexte.</strong> Le CRM est l&apos;infrastructure centrale de votre stack marketing et sales. Le choix du CRM conditionne vos possibilites d&apos;automatisation, de reporting, d&apos;attribution, et d&apos;integration avec vos autres outils. Les trois options dominantes en SaaS B2B : HubSpot, Salesforce, Pipedrive.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Changer de CRM une fois que vous avez 500+ contacts et des workflows en place est un projet de 3 a 6 mois. Le choix initial est donc structurant. Un CRM mal configure, c&apos;est des donnees sales, des rapports faux, et des equipes qui finissent par travailler en dehors du CRM.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> HubSpot est le meilleur choix pour 80% des SaaS B2B de 0 a 100 employes. Le CRM est gratuit, le Marketing Hub est puissant, l&apos;ecosysteme d&apos;integrations est le plus large. Salesforce se justifie au-dela de 100 employes ou quand les besoins de customisation sont tres specifiques. Pipedrive est ideal pour les equipes de 1 a 10 commerciaux qui veulent un outil simple centre sur le pipeline.</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Choisir Salesforce trop tot (complexite et cout disproportionnes pour une startup). Utiliser HubSpot sans le configurer correctement (proprietes par defaut, pas de lifecycle stages, pas de lead scoring). Avoir le CRM et le marketing tool deconnectes (utiliser Mailchimp pour l&apos;email quand on a HubSpot Marketing Hub).</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> HubSpot Starter (50 euros par mois) est le sweet spot pour les SaaS B2B de 0 a 50 employes. A ce prix, vous avez le CRM, le marketing automation de base, le tracking de site, les formulaires, et le reporting. Faites-vous accompagner pour la configuration initiale : un CRM bien configure des le depart vous fait gagner des mois de retravail plus tard. C&apos;est exactement ce qu&apos;on fait chez Ceres.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* Q12 */}
              <section id="q12" className="mb-8">
                <QuestionCard number={12} title="Comment structurer votre funnel ?">
                  <p><strong className="text-[#111]">Contexte.</strong> Le funnel marketing-sales est le parcours qu&apos;un prospect suit entre la premiere interaction avec votre marque et la signature du contrat. Definir les stages de ce funnel, les criteres de passage, et les SLA entre marketing et sales est une decision operationnelle majeure.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Sans funnel structure, le marketing genere des &ldquo;leads&rdquo; que les sales ne traitent pas, les sales se plaignent de la qualite des leads, et personne ne sait ou ca coince. Le funnel donne un langage commun et des definitions partagees. Un visitor devient un lead. Un lead devient un MQL. Un MQL devient un SQL. Un SQL devient une opportunite.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Commencez par definir chaque stage avec des criteres objectifs. Un MQL n&apos;est pas &ldquo;quelqu&apos;un qui a l&apos;air interesse&rdquo;, c&apos;est &ldquo;un contact qui correspond a l&apos;ICP et qui a realise au moins 2 actions intent (demo demandee, pricing consulte, contenu telecharge)&rdquo;. Un SQL est un MQL qui a ete qualifie par un commercial lors d&apos;un appel de decouverte.</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Avoir 12 stages dans le funnel des le premier jour. Ne pas definir les criteres de passage entre les stages. Ne pas mettre en place de SLA (le marketing s&apos;engage sur un nombre de MQL, les sales s&apos;engagent sur un delai de prise en charge). Confondre le funnel marketing avec le pipeline de vente.</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> Commencez avec 5 stages : Visitor, Lead, MQL, SQL, Client. Definissez un SLA simple : le marketing delivre X MQL par mois, les sales contactent chaque MQL en moins de 24h. Mesurez les taux de conversion entre chaque stage. Quand un taux de conversion est anormalement bas, c&apos;est la que se trouve le goulot d&apos;etranglement a traiter en priorite.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* Q13 */}
              <section id="q13" className="mb-8">
                <QuestionCard number={13} title="Comment mesurer le ROI marketing ?">
                  <p><strong className="text-[#111]">Contexte.</strong> L&apos;attribution marketing en B2B est un probleme complexe. Le cycle de vente est long (3 a 12 mois), multi-touch (un prospect interagit avec 8 a 15 touchpoints avant d&apos;acheter), et multi-canal. Attribuer un deal a un seul canal est reducteur. Ne rien attribuer est inacceptable.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Si vous ne savez pas quel canal genere du pipeline et du revenu, vous ne pouvez pas prendre de decision d&apos;allocation de budget informee. Vous finissez par couper le budget du canal qui genere le plus de pipeline parce que vous ne mesurez que les leads, ou par doubler le budget du canal qui genere beaucoup de leads mais zero pipeline.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Mettez en place un modele d&apos;attribution hybride. First touch (quel canal a amene le prospect pour la premiere fois) et last touch (quel canal a declenche la conversion). Puis ajoutez de l&apos;attribution auto-declaree : demandez au prospect &ldquo;Comment avez-vous entendu parler de nous ?&rdquo; dans le formulaire de demo. La combinaison des donnees comportementales et declaratives donne la vue la plus fiable.</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Se fier uniquement au last-click (Google Analytics) pour mesurer l&apos;efficacite du content ou du social. Dismiss le dark funnel (les conversations privees, les recommandations, les podcasts ne sont pas trackables). Construire un modele d&apos;attribution multi-touch complexe avant d&apos;avoir 100 clients. Mesurer le ROI du marketing uniquement sur les leads generes et pas sur le pipeline influence.</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> Utilisez deux metriques complementaires : le pipeline source par le marketing (first touch) et le pipeline influence par le marketing (tout deal ou le prospect a interagi avec du contenu marketing). La somme des deux donne une vision juste de l&apos;impact marketing. Configurez ces rapports dans HubSpot avec les proprietes d&apos;attribution native et un champ &ldquo;source declaree&rdquo; sur le formulaire de contact.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* === BLOC 4 : Equipe & Scaling === */}
              <section id="equipe-scaling" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Bloc 4 sur 4</span>
                  <h2 className="text-[20px] font-semibold text-white mb-3">Equipe &amp; Scaling</h2>
                  <p className="text-[13px] text-white/60 leading-[1.75]">Les deux dernieres questions portent sur l&apos;execution. Quand recruter, quel profil, et quand structurer vos operations pour scaler. La strategie la plus brillante echoue sans les bonnes personnes et les bons process.</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {["Q14", "Q15"].map((q) => (
                      <div key={q} className="rounded-lg bg-white/5 p-3 text-center">
                        <span className="text-[14px] font-bold text-[#22C55E]">{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Q14 */}
              <section id="q14" className="mb-8">
                <QuestionCard number={14} title="Quand recruter votre premier marketeur ?">
                  <p><strong className="text-[#111]">Contexte.</strong> En early-stage, le marketing est souvent fait par le fondateur. LinkedIn posts, premiers articles, landing pages, cold email. La question du premier recrutement marketing est strategique : trop tot, vous brulez du cash sur un poste sans clarity sur ce qu&apos;il doit produire. Trop tard, vous laissez des opportunites de croissance sur la table.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Le premier marketeur n&apos;est pas un executant. C&apos;est la personne qui va definir et executer la strategie d&apos;acquisition, poser les fondations de la marque, et creer le playbook qui sera replique par l&apos;equipe qui suivra. Recruter le mauvais profil a ce stade peut couter 6 a 12 mois.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Le bon moment pour recruter votre premier marketeur est quand vous avez atteint le product-market fit (10 a 20 clients payants, retention saine), que vous avez valide au moins un canal d&apos;acquisition en founder-led mode, et que vous avez le budget pour un salaire pendant 12 mois minimum. Le profil ideal : un &ldquo;full-stack marketer&rdquo; capable de faire du content, du paid, et de l&apos;outbound.</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Recruter un CMO quand on a besoin d&apos;un executant. Recruter un specialiste (SEO, paid) quand on a besoin d&apos;un generaliste. Ne pas impliquer le fondateur dans le marketing apres le recrutement (le fondateur reste le meilleur porte-parole pendant longtemps). Fixer des objectifs uniquement en nombre de leads sans donner le contexte strategique.</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> Avant de recruter, externalisez. Travaillez avec une agence ou un freelance pendant 3 a 6 mois pour valider la strategie, les canaux, et le volume necessaire. Une fois que vous savez exactement ce que le poste doit produire, recrutez. Et recrutez un profil T-shaped : large en generaliste, profond sur un canal specifique aligne avec votre strategie.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* Q15 */}
              <section id="q15" className="mb-8">
                <QuestionCard number={15} title="RevOps des le debut ou plus tard ?">
                  <p><strong className="text-[#111]">Contexte.</strong> Le RevOps (Revenue Operations) unifie les operations marketing, sales et customer success sous un meme cadre : memes donnees, memes definitions, memes objectifs. Historiquement reserve aux entreprises de plus de 100 employes, le RevOps s&apos;impose de plus en plus tot dans le cycle de vie des SaaS B2B.</p>
                  <p><strong className="text-[#111]">Pourquoi c&apos;est critique.</strong> Les SaaS qui structurent leur RevOps tardivement passent des mois a nettoyer des donnees sales, a realigner des definitions entre les equipes, et a reconstruire des reportings. Ceux qui le font tot construisent sur des fondations propres et gagnent en velocite a chaque etape de croissance.</p>
                  <p><strong className="text-[#111]">Comment y repondre.</strong> Vous n&apos;avez pas besoin d&apos;un VP RevOps a 3 employes. Mais vous avez besoin de poser les bases : un CRM bien configure, des lifecycle stages definis, un funnel documente avec des criteres de passage, un modele d&apos;attribution minimal, et un dashboard de suivi. C&apos;est le socle RevOps minimum viable.</p>
                  <p><strong className="text-[#111]">Erreurs courantes.</strong> Attendre d&apos;avoir 50 employes pour structurer le RevOps (les mauvaises habitudes sont alors ancrees). Confondre RevOps et CRM admin (le RevOps est strategique, pas juste technique). Construire des process trop complexes trop tot (un workflow de lead routing a 12 branches quand on a 5 leads par semaine). Ne pas documenter les definitions et les process.</p>
                  <p><strong className="text-[#111]">Notre recommandation.</strong> Mettez en place le socle RevOps des que vous avez votre premier commercial, ou des que marketing et sales coexistent. Les 5 fondations : CRM configure proprement, lifecycle stages avec criteres clairs, dashboard partage entre marketing et sales, SLA marketing-sales documente, revue hebdomadaire pipeline. Chez Ceres, c&apos;est exactement ce qu&apos;on installe en premier chez nos clients. Le RevOps n&apos;est pas un luxe de grande entreprise, c&apos;est un avantage competitif pour ceux qui le mettent en place tot.</p>
                </QuestionCard>
              </section>
              <Connector />

              {/* Conclusion */}
              <section id="conclusion" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Conclusion</span>
                  <h2 className="text-[20px] font-semibold text-white mb-4">15 questions, un seul objectif</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Ces 15 questions ne sont pas un exercice academique. C&apos;est le travail de fondation que chaque SaaS B2B doit faire avant de depenser son premier euro en marketing. Elles forcent la clarte sur les decisions strategiques qui conditionnent tout le reste.</p>
                    <p>Le positionnement et l&apos;ICP determinent vos messages. Les canaux d&apos;acquisition determinent votre budget et votre equipe. Les metriques determinent votre capacite a iterer. L&apos;equipe et le RevOps determinent votre velocite d&apos;execution.</p>
                    <p>On voit trop de SaaS sauter ces etapes pour passer directement aux tactiques. Lancer des ads LinkedIn sans ICP clair. Publier du contenu sans strategie SEO. Recruter un marketeur sans savoir quel canal prioriser. Le resultat est toujours le meme : du budget brule, du temps perdu, et une frustration croissante.</p>
                    <p>Prenez le temps de repondre a ces 15 questions. Ecrivez les reponses. Partagez-les avec votre equipe. Revisitez-les chaque trimestre. Ce sont vos fondations. Tout ce que vous construirez par-dessus sera plus solide.</p>
                  </div>
                  <div className="mt-6 rounded-lg bg-white/5 p-4">
                    <p className="text-[12px] font-semibold text-white mb-2">Checklist rapide</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        "Probleme client articule en une phrase",
                        "ICP defini avec criteres objectifs",
                        "Differenciateur testable formule",
                        "Modele de pricing valide",
                        "1-2 canaux d'acquisition priorises",
                        "CAC cible et payback period calcules",
                        "Mix content/paid decide",
                        "Decision outbound prise",
                        "Strategie SEO cadree",
                        "3 KPIs prioritaires suivis",
                        "CRM configure et adopte",
                        "Funnel avec stages et criteres",
                        "Attribution marketing en place",
                        "Plan de recrutement marketing clair",
                        "Socle RevOps minimum installe",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-[11px] text-white/50">
                          <div className="w-3.5 h-3.5 rounded border border-white/20 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
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
                    <p className="text-[12px] font-semibold text-[#111] leading-[1.4] group-hover:text-[#FF7A59] transition-colors">{a.title}</p>
                    <p className="text-[10px] text-[#999] mt-2">{a.category}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section>
              <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin de structurer votre strategie marketing SaaS ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[450px] mx-auto">On accompagne les SaaS B2B de la definition de l&apos;ICP a la mise en place du RevOps. CRM, funnel, attribution, dashboards. Les fondations pour scaler.</p>
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