"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "RevOps pour startups : par ou commencer quand on est petit",
  description: "Guide pratique du RevOps pour startups de 5 a 50 personnes. Quoi prioriser, quoi ignorer, quel budget, recruter ou externaliser. Roadmap par phase de croissance avec stack, processus et KPIs adaptes aux contraintes startup.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-10",
  dateModified: "2026-03-10",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/revops-startups-par-ou-commencer" },
  articleSection: "RevOps",
  wordCount: 2800,
  inLanguage: "fr",
};

const sections = [
  { id: "pas-que-grands-groupes", title: "Pas que pour les grands" },
  { id: "trois-erreurs", title: "Les 3 erreurs classiques" },
  { id: "phase-1", title: "Phase 1 : 5-15 personnes" },
  { id: "phase-2", title: "Phase 2 : 15-30 personnes" },
  { id: "phase-3", title: "Phase 3 : 30-50 personnes" },
  { id: "stack-startup", title: "Le stack RevOps startup" },
  { id: "recruter-vs-externaliser", title: "Recruter vs externaliser" },
  { id: "cinq-chantiers", title: "Les 5 premiers chantiers" },
  { id: "roi-revops", title: "Mesurer le ROI" },
  { id: "offre-startups", title: "Notre offre startups" },
];

const relatedArticles = [
  { title: "Comment aligner marketing et sales en 30 jours avec le RevOps", slug: "aligner-marketing-sales-revops", category: "RevOps", color: "#FF7A59" },
  { title: "Les KPIs commerciaux essentiels a suivre", slug: "kpi-commerciaux-indicateurs-vente", category: "Process & Outils", color: "#6C5CE7" },
  { title: "Onboarding HubSpot : les 30 premiers jours", slug: "onboarding-hubspot-30-premiers-jours", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function RevOpsStartupsPage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("pas-que-grands-groupes");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "6%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "18%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "32%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "48%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "64%", width: 280, height: 280, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(70px)" }} />
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
                  <a href="https://twitter.com/intent/tweet?text=RevOps%20pour%20startups%20%3A%20par%20o%C3%B9%20commencer%20quand%20on%20est%20petit&url=https://www.ceres-revops.com/blog/revops-startups-par-ou-commencer" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/revops-startups-par-ou-commencer" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">RevOps pour startups</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>RevOps</Badge>
                <span className="text-[11px] text-[#CCC]">13 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                RevOps pour startups : par ou commencer quand on est petit
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Le RevOps n&apos;est pas reserve aux entreprises de 200 personnes avec un VP Revenue Operations. Meme a 5, meme a 15, structurer ses operations revenue fait la difference entre une startup qui galere a scaler et une startup qui accelere proprement. Ce guide est une roadmap concrete, phase par phase, de 5 a 50 personnes. Quoi prioriser, quoi ignorer, quel budget, et quand faire appel a quelqu&apos;un.
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
              {/* Section 1 -- Le RevOps n'est pas que pour les grands groupes */}
              <section id="pas-que-grands-groupes" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Le RevOps n&apos;est pas que pour les grands groupes</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Il y a un mythe tenace dans l&apos;ecosysteme startup : le RevOps, c&apos;est pour les boites qui ont deja 100 commerciaux, un CRM a 6 chiffres et une equipe operations dediee. C&apos;est faux. Le RevOps n&apos;est pas une couche de complexite qu&apos;on ajoute quand on est gros. C&apos;est un cadre de pensee qui structure la croissance des le depart. Et plus on l&apos;installe tot, moins on aura de dette technique et organisationnelle a rembourser plus tard.</p>
                    <p>Quand on est 5 dans une startup, le fondateur fait tout : il prospecte, il vend, il onboarde les clients, il envoie les factures. Il n&apos;y a pas de process parce que tout tient dans la tete d&apos;une seule personne. Ca fonctionne. Mais le jour ou on passe a 10, puis a 20, cette approche s&apos;effondre. Les leads tombent entre les mailles, les deals ne sont plus suivis, le forecasting est un exercice de fiction, et chaque nouveau commercial reinvente sa propre methode de travail.</p>
                    <p>Le RevOps a ce stade, ce n&apos;est pas deployer Salesforce Enterprise avec 47 workflows. C&apos;est poser trois choses simples : un CRM proprement configure, un pipeline de vente defini, et un minimum de reporting pour savoir ou on en est. Ca prend deux jours, pas six mois. Et ca change tout pour la suite.</p>
                    <p>Les chiffres parlent d&apos;eux-memes. Les startups qui structurent leurs operations revenue tot ont un taux de conversion lead-to-deal 2 a 3 fois superieur a celles qui attendent. Leur cycle de vente est 30% plus court. Et surtout, quand elles levent des fonds et doivent scaler rapidement, les fondations sont deja la. Elles n&apos;ont pas besoin de tout reconstruire sous la pression.</p>
                    <p>Le probleme n&apos;est pas de savoir si vous avez besoin de RevOps. Vous en avez besoin. Le probleme est de savoir par ou commencer, quoi prioriser avec des ressources limitees, et quand passer a l&apos;etape suivante. C&apos;est exactement ce que ce guide couvre.</p>
                  </div>

                  {/* Bubble stat cards */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "x2.5", label: "taux de conversion lead-to-deal", color: "#FF7A59" },
                      { value: "-30%", label: "sur le cycle de vente moyen", color: "#4B5EFC" },
                      { value: "85%", label: "des startups scalent sans RevOps et le regrettent", color: "#6C5CE7" },
                      { value: "2j", label: "pour poser les fondations", color: "#22C55E" },
                    ].map((stat) => (
                      <div key={stat.label} className="p-4 rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] text-center">
                        <div className="text-[20px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-[10px] text-[#999] mt-1 leading-[1.4]">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 -- Les 3 erreurs des startups sans RevOps */}
              <section id="trois-erreurs" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les 3 erreurs des startups sans RevOps</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Avant de parler de ce qu&apos;il faut faire, parlons de ce qui se passe quand on ne fait rien. Trois schemas reviennent systematiquement chez les startups qui n&apos;ont pas structure leurs operations revenue. Ces erreurs semblent anodines au debut. Elles deviennent des problemes structurels des qu&apos;on depasse 10 personnes.</p>
                  </div>

                  {/* Error cards */}
                  <div className="mt-6 space-y-4">
                    {[
                      {
                        num: "01",
                        title: "Le chaos des spreadsheets",
                        color: "#FF7A59",
                        desc: "Le pipeline est dans un Google Sheet. Les contacts sont dans un autre. Le suivi client dans un troisieme. Le fondateur a un fichier a part avec ses notes. Le commercial qui arrive ne sait pas ou chercher l&apos;information. Les doublons se multiplient. Personne n&apos;a la meme version de la verite. Quand un investisseur demande le MRR par cohorte, il faut deux jours pour reconstituer le chiffre.",
                        impact: "Perte de 15-20% de deals par manque de suivi"
                      },
                      {
                        num: "02",
                        title: "L&apos;absence de processus de vente",
                        color: "#4B5EFC",
                        desc: "Chaque commercial vend a sa maniere. Il n&apos;y a pas d&apos;etapes definies dans le pipeline, pas de criteres pour qualifier un lead, pas de templates d&apos;email, pas de cadence de relance. Quand un commercial part, il emporte son process avec lui. Quand un nouveau arrive, il met 3 mois avant d&apos;etre autonome. Le forecasting est impossible parce que chaque deal a une definition differente de &laquo; en cours &raquo;.",
                        impact: "Cycle de vente 40% plus long que la moyenne du secteur"
                      },
                      {
                        num: "03",
                        title: "La proliferation d&apos;outils deconnectes",
                        color: "#6C5CE7",
                        desc: "Un outil de prospection ici, un CRM la, un outil d&apos;emailing par-dessus, un tableau Notion a cote. Aucune integration entre eux. Les donnees ne circulent pas. Les equipes passent 30% de leur temps a copier-coller de l&apos;information d&apos;un outil a l&apos;autre. L&apos;automatisation est impossible parce que le stack est fragmente. Et a chaque outil ajoute, la dette technique augmente.",
                        impact: "30% du temps commercial perdu en taches administratives"
                      },
                    ].map((err) => (
                      <div key={err.num} className="p-5 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA]">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[12px] font-bold" style={{ backgroundColor: err.color }}>{err.num}</div>
                          <h3 className="text-[14px] font-semibold text-[#111]">{err.title}</h3>
                        </div>
                        <p className="text-[12px] text-[#666] leading-[1.7] mb-3">{err.desc}</p>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[#E8E8E8]">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: err.color }} />
                          <span className="text-[11px] font-medium" style={{ color: err.color }}>{err.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 -- Phase 1 : 5-15 personnes */}
              <section id="phase-1" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FF7A59] flex items-center justify-center text-white text-[12px] font-bold">P1</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Phase 1 : 5-15 personnes -- le minimum vital</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>A ce stade, l&apos;equipe commerciale c&apos;est le fondateur et peut-etre un ou deux commerciaux. Le marketing est balbutiant, souvent gere par le fondateur ou un profil junior polyvalent. Il n&apos;y a pas de customer success dedie. L&apos;objectif n&apos;est pas de construire une machine. C&apos;est de poser les fondations minimum pour ne pas perdre d&apos;information et pouvoir mesurer la performance.</p>
                    <p>La premiere action est de choisir un CRM et d&apos;y mettre toutes les donnees. Pas un Google Sheet, un vrai CRM. HubSpot en version gratuite est le choix evident pour les startups : c&apos;est gratuit, c&apos;est puissant, et ca scale. Pipedrive est une alternative si vous voulez quelque chose de plus simple. L&apos;important est de tout centraliser dans un seul outil. Plus aucun deal, plus aucun contact ne doit vivre en dehors du CRM.</p>
                    <p>La deuxieme action est de definir un pipeline de vente simple. 5 a 7 etapes maximum : Lead entrant, Premier contact, Qualification, Demo/Proposition, Negociation, Gagne, Perdu. Chaque etape a un critere d&apos;entree clair et un critere de sortie. Un deal ne passe a &laquo; Qualification &raquo; que quand le budget, le besoin et le timeline sont confirmes. Un deal ne passe a &laquo; Demo &raquo; que quand un rendez-vous est planifie avec le decideur.</p>
                    <p>La troisieme action est de mettre en place un reporting basique. Trois chiffres suffisent a ce stade : le nombre de deals en cours (pipeline), le montant total du pipeline pondere, et le taux de conversion global lead-to-client. Si vous avez ces trois chiffres a jour en permanence, vous avez plus de visibilite que 80% des startups de votre taille.</p>
                    <p>Ce qu&apos;il faut ignorer a ce stade : le lead scoring, les workflows d&apos;automatisation complexes, les dashboards avances, la segmentation par persona. Tout ca viendra plus tard. Pour l&apos;instant, la priorite est la discipline de remplir le CRM et de suivre chaque deal a travers le pipeline.</p>
                  </div>

                  {/* Maturity roadmap -- CSS timeline */}
                  <div className="mt-8 rounded-xl border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF7A59]" />
                        <span className="text-[12px] font-semibold text-white">Roadmap de maturite RevOps -- 5 a 50 personnes</span>
                      </div>
                    </div>
                    <div className="bg-white p-5">
                      {/* Timeline */}
                      <div className="relative">
                        {/* Line */}
                        <div className="absolute left-0 right-0 top-[18px] h-[3px] bg-[#F0F0F0] rounded-full" />
                        <div className="absolute left-0 top-[18px] h-[3px] rounded-full" style={{ width: "100%", background: "linear-gradient(to right, #FF7A59 0%, #FF7A59 30%, #4B5EFC 30%, #4B5EFC 65%, #22C55E 65%, #22C55E 100%)" }} />

                        {/* Nodes */}
                        <div className="relative flex justify-between mb-8">
                          {[
                            { label: "5", color: "#FF7A59", position: "0%" },
                            { label: "15", color: "#FF7A59", position: "30%" },
                            { label: "30", color: "#4B5EFC", position: "65%" },
                            { label: "50", color: "#22C55E", position: "100%" },
                          ].map((node) => (
                            <div key={node.label} className="flex flex-col items-center" style={{ position: "absolute", left: node.position, transform: "translateX(-50%)" }}>
                              <div className="w-9 h-9 rounded-full border-[3px] flex items-center justify-center text-[10px] font-bold bg-white z-10" style={{ borderColor: node.color, color: node.color }}>
                                {node.label}
                              </div>
                              <span className="text-[9px] text-[#999] mt-1.5">pers.</span>
                            </div>
                          ))}
                        </div>

                        {/* Phase descriptions */}
                        <div className="grid grid-cols-3 gap-3 mt-14">
                          {[
                            { phase: "Phase 1", range: "5-15 pers.", color: "#FF7A59", items: ["CRM centralise", "Pipeline 5-7 etapes", "Reporting basique", "1 outil unique"] },
                            { phase: "Phase 2", range: "15-30 pers.", color: "#4B5EFC", items: ["Lead scoring", "Automatisations", "SLA marketing-sales", "Dashboards par equipe"] },
                            { phase: "Phase 3", range: "30-50 pers.", color: "#22C55E", items: ["RevOps dedie", "BI et forecasting", "Automation avancee", "Attribution multi-touch"] },
                          ].map((p) => (
                            <div key={p.phase} className="p-3 rounded-lg border border-[#F0F0F0]">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                                <span className="text-[11px] font-semibold" style={{ color: p.color }}>{p.phase}</span>
                              </div>
                              <p className="text-[10px] text-[#999] mb-2">{p.range}</p>
                              <ul className="space-y-1">
                                {p.items.map((item) => (
                                  <li key={item} className="flex items-start gap-1.5 text-[10px] text-[#666]">
                                    <svg width="8" height="8" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" style={{ color: p.color }}><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 1 checklist */}
                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                    <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Checklist Phase 1</p>
                    <div className="space-y-2">
                      {[
                        { action: "Ouvrir un compte HubSpot Free et importer tous les contacts existants" },
                        { action: "Creer le pipeline de vente avec 5 a 7 etapes et des criteres de passage clairs" },
                        { action: "Migrer tous les deals des spreadsheets vers le CRM" },
                        { action: "Mettre en place un dashboard avec 3 KPIs : pipeline, montant pondere, conversion" },
                        { action: "Definir la cadence : chaque deal est mis a jour dans le CRM chaque semaine" },
                      ].map((m) => (
                        <div key={m.action} className="flex items-start gap-3">
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#FF7A59]"><rect x="1" y="1" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.2" /><path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          <span className="text-[11px] text-[#666] leading-[1.5]">{m.action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 -- Phase 2 : 15-30 personnes */}
              <section id="phase-2" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#4B5EFC] flex items-center justify-center text-white text-[12px] font-bold">P2</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Phase 2 : 15-30 personnes -- structurer</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Vous avez desormais une equipe sales de 3 a 5 personnes, un responsable marketing, peut-etre un premier CSM. Le volume de leads augmente, les processus manuels commencent a craquer, et la question de la qualite des leads se pose. C&apos;est le moment de passer du minimum vital a une structure reelle.</p>
                    <p>Le lead scoring devient indispensable. Quand vous aviez 20 leads par mois, le fondateur pouvait tous les qualifier manuellement. A 100 leads par mois, c&apos;est impossible. Il faut un systeme qui distingue automatiquement les leads chauds des leads froids. Un scoring simple a deux dimensions suffit : le fit (est-ce que le profil correspond a votre ICP) et l&apos;engagement (est-ce que le lead a des comportements d&apos;achat). Commencez avec 5-10 criteres maximum. Vous affinerez au fil du temps.</p>
                    <p>L&apos;automatisation fait son entree. Pas des workflows de 47 etapes, mais des automatisations simples qui eliminent le travail repetitif : un email de bienvenue automatique quand un lead remplit un formulaire, une notification Slack quand un deal passe en negociation, un rappel automatique quand un deal stagne depuis 14 jours, l&apos;attribution automatique des leads au bon commercial selon le territoire ou le segment.</p>
                    <p>Le SLA marketing-sales doit etre formalise. Le marketing s&apos;engage sur un volume et une qualite de MQLs. Les sales s&apos;engagent sur un delai de suivi et un taux de contact. Ce n&apos;est pas un document bureaucratique, c&apos;est un accord de travail qui evite les &laquo; le marketing ne nous envoie que des leads pourris &raquo; et les &laquo; les sales ne rappellent jamais nos leads &raquo;. Les meilleurs SLA tiennent sur une page.</p>
                    <p>Les dashboards se segmentent. Un dashboard marketing (leads generes, canaux, cout par lead), un dashboard sales (pipeline, velocity, win rate), un dashboard commun (funnel global, handoff quality, SLA compliance). Chaque equipe voit ses propres metriques et les metriques partagees. Le meeting hebdomadaire marketing-sales s&apos;installe naturellement autour de ces dashboards.</p>
                  </div>

                  {/* KPIs Phase 2 */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { kpi: "Lead scoring", target: "2 dimensions", desc: "Fit + engagement", color: "#FF7A59" },
                      { kpi: "Automations", target: "5-10 workflows", desc: "Nurturing, alerts, attribution", color: "#4B5EFC" },
                      { kpi: "SLA", target: "< 24h suivi", desc: "Engagement sales sur les MQLs", color: "#6C5CE7" },
                      { kpi: "Dashboards", target: "3 vues", desc: "Marketing, sales, commun", color: "#22C55E" },
                    ].map((item) => (
                      <div key={item.kpi} className="p-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2]">
                        <p className="text-[10px] text-[#999] mb-1">{item.kpi}</p>
                        <div className="text-[16px] font-bold" style={{ color: item.color }}>{item.target}</div>
                        <p className="text-[9px] text-[#BBB] mt-0.5">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 -- Phase 3 : 30-50 personnes */}
              <section id="phase-3" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#22C55E] flex items-center justify-center text-white text-[12px] font-bold">P3</div>
                    <h2 className="text-[17px] font-semibold text-[#111]">Phase 3 : 30-50 personnes -- optimiser</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>A 30 personnes et plus, l&apos;equipe revenue atteint une complexite qui justifie un profil dedie. Vous avez probablement 8 a 15 commerciaux, une equipe marketing de 3-5 personnes, des CSM, peut-etre des SDR. Les interactions entre equipes se multiplient, les donnees explosent, et les processus manuels ne suffisent plus.</p>
                    <p>C&apos;est le moment de recruter ou d&apos;externaliser un profil RevOps. Cette personne devient le chef d&apos;orchestre des operations revenue. Elle gere le CRM, les integrations, le reporting, les processus, l&apos;attribution, et sert de pont entre les equipes. Sans ce profil, chaque equipe optimise son propre silo, et les gains se font au detriment des autres.</p>
                    <p>Le forecasting passe au niveau superieur. On ne se contente plus de sommer les montants du pipeline. On utilise des modeles bases sur les taux de conversion historiques par etape, le temps moyen dans chaque etape, la saisonnalite, et la performance individuelle des commerciaux. Le forecast devient un outil de pilotage fiable, pas un exercice de divination.</p>
                    <p>L&apos;automatisation s&apos;intensifie. Les workflows couvrent desormais l&apos;ensemble du cycle de vie client : lead nurturing multi-canal, sequences de relance intelligentes, onboarding client automatise, alertes de risque de churn basees sur l&apos;usage produit, expansion automatique des comptes a fort potentiel. L&apos;objectif est de liberer les equipes du travail repetitif pour qu&apos;elles se concentrent sur la vente et la relation client.</p>
                    <p>La Business Intelligence fait son apparition. Les donnees du CRM, du produit, de la facturation et du support sont connectees dans un entrepot de donnees commun. Les dashboards deviennent analytiques : cohortes de clients, unit economics, customer lifetime value, attribution multi-touch. C&apos;est a ce stade que les decisions se prennent vraiment sur la base des donnees et plus sur l&apos;intuition.</p>
                  </div>

                  {/* Phase 3 capabilities grid */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "RevOps dedie", desc: "Un profil a temps plein qui orchestre les operations revenue entre marketing, sales et CS. Il est le garant de la data, des processus et de la stack technique.", icon: "R", color: "#22C55E" },
                      { title: "Forecasting avance", desc: "Modeles predictifs bases sur les donnees historiques, les taux de conversion par etape, la saisonnalite et la performance individuelle des reps.", icon: "F", color: "#4B5EFC" },
                      { title: "BI et data warehouse", desc: "Connexion CRM + produit + facturation + support. Cohortes, unit economics, LTV, attribution multi-touch. Les decisions se prennent sur les donnees.", icon: "B", color: "#6C5CE7" },
                      { title: "Automation avancee", desc: "Workflows multi-canaux couvrant le cycle complet : nurturing, onboarding, churn prevention, expansion. 50+ automatisations actives.", icon: "A", color: "#FF7A59" },
                    ].map((cap) => (
                      <div key={cap.title} className="p-4 rounded-xl bg-[#FAFAFA] border border-[#F0F0F0]">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px] font-bold" style={{ backgroundColor: cap.color }}>{cap.icon}</div>
                          <span className="text-[12px] font-semibold text-[#111]">{cap.title}</span>
                        </div>
                        <p className="text-[10px] text-[#777] leading-[1.6]">{cap.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 -- Le stack RevOps startup */}
              <section id="stack-startup" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Le stack RevOps startup : quel budget pour quels outils</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le choix du stack technique est critique pour une startup. Trop d&apos;outils tue l&apos;efficacite. Pas assez d&apos;outils limite la croissance. La regle d&apos;or : commencez avec le minimum, ajoutez un outil uniquement quand la douleur est insupportable, et privilegiez toujours les outils qui s&apos;integrent nativement les uns avec les autres.</p>
                    <p>Voici trois scenarios de stack adaptes a chaque niveau de budget. Ces montants sont par mois et par utilisateur sauf indication contraire.</p>
                  </div>

                  {/* Budget allocation chart -- CSS mockup */}
                  <div className="mt-6 rounded-xl border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3">
                      <span className="text-[12px] font-semibold text-white">Budget allocation par phase</span>
                    </div>
                    <div className="bg-white p-5">
                      <div className="space-y-5">
                        {[
                          {
                            budget: "0-100 EUR/mois",
                            phase: "Phase 1",
                            color: "#FF7A59",
                            pct: 15,
                            tools: [
                              { name: "HubSpot CRM Free", cost: "0 EUR", desc: "CRM, pipeline, contacts, reporting basique" },
                              { name: "Google Workspace", cost: "6 EUR/u/mois", desc: "Email, agenda, docs, sheets" },
                              { name: "Calendly Free", cost: "0 EUR", desc: "Prise de rendez-vous" },
                              { name: "Notion Free", cost: "0 EUR", desc: "Documentation, playbooks" },
                            ]
                          },
                          {
                            budget: "100-500 EUR/mois",
                            phase: "Phase 2",
                            color: "#4B5EFC",
                            pct: 50,
                            tools: [
                              { name: "HubSpot Starter", cost: "20 EUR/u/mois", desc: "Automatisations, scoring, sequences" },
                              { name: "Lemlist ou LaGrowthMachine", cost: "80-100 EUR/mois", desc: "Prospection multicanale" },
                              { name: "Slack Pro", cost: "7 EUR/u/mois", desc: "Notifications, integrations" },
                              { name: "Zapier Starter", cost: "20 EUR/mois", desc: "Integrations entre outils" },
                            ]
                          },
                          {
                            budget: "500-2000 EUR/mois",
                            phase: "Phase 3",
                            color: "#22C55E",
                            pct: 100,
                            tools: [
                              { name: "HubSpot Pro", cost: "90 EUR/u/mois", desc: "Workflows avances, reporting, forecasting" },
                              { name: "Datawarehouse (BigQuery)", cost: "50-200 EUR/mois", desc: "Centralisation des donnees" },
                              { name: "BI (Metabase / Looker)", cost: "0-300 EUR/mois", desc: "Dashboards analytiques avances" },
                              { name: "Outreach ou Salesloft", cost: "100 EUR/u/mois", desc: "Sales engagement platform" },
                            ]
                          },
                        ].map((tier) => (
                          <div key={tier.budget}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tier.color }} />
                                <span className="text-[12px] font-semibold" style={{ color: tier.color }}>{tier.budget}</span>
                                <span className="text-[10px] text-[#BBB] ml-1">({tier.phase})</span>
                              </div>
                            </div>
                            {/* Progress bar */}
                            <div className="h-2 bg-[#F5F5F5] rounded-full mb-3 overflow-hidden">
                              <div className="h-full rounded-full transition-all" style={{ width: `${tier.pct}%`, backgroundColor: tier.color }} />
                            </div>
                            {/* Tool cards */}
                            <div className="grid grid-cols-2 gap-2">
                              {tier.tools.map((tool) => (
                                <div key={tool.name} className="p-3 rounded-lg border border-[#F0F0F0] bg-[#FAFAFA]">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-[11px] font-semibold text-[#111]">{tool.name}</span>
                                    <span className="text-[10px] font-medium" style={{ color: tier.color }}>{tool.cost}</span>
                                  </div>
                                  <p className="text-[9px] text-[#999] leading-[1.4]">{tool.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 -- Recruter un RevOps vs externaliser */}
              <section id="recruter-vs-externaliser" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Recruter un RevOps vs externaliser : que choisir</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>C&apos;est la question que chaque fondateur se pose a un moment : est-ce que je recrute un profil RevOps en interne, ou est-ce que je fais appel a un prestataire externe ? La reponse depend de trois facteurs : votre stade de croissance, votre budget, et l&apos;urgence de votre besoin.</p>
                    <p>En dessous de 20 personnes, le recrutement d&apos;un RevOps a temps plein est rarement justifie. Le volume de travail ne remplit pas un poste a 100%. Vous avez besoin de quelqu&apos;un 2 jours par semaine pendant 3 mois pour structurer les fondations, pas d&apos;un salarie a temps plein pendant 12 mois. L&apos;externalisation est le choix rationnel : vous achetez de l&apos;expertise senior a la demande, sans le cout fixe d&apos;un recrutement.</p>
                    <p>Entre 20 et 40 personnes, le choix se complexifie. Si votre croissance est rapide et que les operations revenue sont au coeur de votre modele (SaaS B2B par exemple), un profil interne commence a se justifier. Si votre croissance est plus lente ou que votre modele est plus simple, l&apos;externalisation reste pertinente avec un volume de jours plus important.</p>
                    <p>Au-dela de 40 personnes, un RevOps interne est quasi indispensable. La complexite des operations, le volume de donnees, et la vitesse d&apos;iteration necessitent une presence quotidienne. L&apos;externe peut intervenir en complement sur des sujets specifiques : migration CRM, mise en place BI, audit de process.</p>
                  </div>

                  {/* Comparison table */}
                  <div className="mt-6 rounded-xl border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3">
                      <span className="text-[12px] font-semibold text-white">Comparatif : recrutement interne vs externalisation</span>
                    </div>
                    <div className="bg-white">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#F0F0F0]">
                            <th className="text-left text-[10px] font-semibold text-[#999] uppercase tracking-wider px-5 py-3 w-[35%]">Critere</th>
                            <th className="text-left text-[10px] font-semibold text-[#FF7A59] uppercase tracking-wider px-4 py-3 w-[32.5%]">Recrutement interne</th>
                            <th className="text-left text-[10px] font-semibold text-[#4B5EFC] uppercase tracking-wider px-4 py-3 w-[32.5%]">Externalisation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { critere: "Cout annuel", interne: "55-75K EUR (salaire + charges)", externe: "15-40K EUR (selon volume)" },
                            { critere: "Delai de mise en place", interne: "2-4 mois (recrutement + onboarding)", externe: "1-2 semaines" },
                            { critere: "Niveau d&apos;expertise", interne: "Junior-Mid (budget startup)", externe: "Senior (experience multi-clients)" },
                            { critere: "Flexibilite", interne: "Fixe (temps plein)", externe: "Variable (ajustable selon besoins)" },
                            { critere: "Connaissance produit", interne: "Profonde (immersion quotidienne)", externe: "Moderee (necesssite transfert)" },
                            { critere: "Scalabilite", interne: "Limitee (1 personne)", externe: "Forte (equipe disponible)" },
                            { critere: "Risque", interne: "Depart = tout a refaire", externe: "Continuite de service" },
                          ].map((row) => (
                            <tr key={row.critere} className="border-b border-[#F8F8F8] last:border-0">
                              <td className="text-[11px] font-medium text-[#333] px-5 py-3">{row.critere}</td>
                              <td className="text-[10px] text-[#666] px-4 py-3">{row.interne}</td>
                              <td className="text-[10px] text-[#666] px-4 py-3">{row.externe}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="mt-5 p-4 rounded-xl bg-[#FAFAFA] border border-[#F0F0F0]">
                    <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2">Notre recommandation</p>
                    <div className="space-y-2">
                      {[
                        { range: "5-20 personnes", reco: "100% externalisation. Budget : 1-3 jours/mois.", color: "#FF7A59" },
                        { range: "20-40 personnes", reco: "Externalisation + formation interne. Un profil ops part-time en interne.", color: "#4B5EFC" },
                        { range: "40+ personnes", reco: "Recrutement RevOps interne + externe en complement sur les projets.", color: "#22C55E" },
                      ].map((r) => (
                        <div key={r.range} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: r.color }} />
                          <div>
                            <span className="text-[11px] font-semibold" style={{ color: r.color }}>{r.range}</span>
                            <span className="text-[11px] text-[#666] ml-2">{r.reco}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 -- Les 5 premiers chantiers */}
              <section id="cinq-chantiers" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les 5 premiers chantiers a lancer</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Si vous ne retenez qu&apos;une chose de cet article, retenez cette matrice. Elle classe les chantiers RevOps par impact et par effort. L&apos;objectif est de commencer par le coin en haut a gauche : fort impact, faible effort. Les quick wins qui generent des resultats visibles rapidement et qui creent le momentum pour les chantiers suivants.</p>
                    <p>Chaque chantier est decrit avec son impact estime, l&apos;effort requis, et le delai de mise en place. Ces estimations sont basees sur notre experience avec des dizaines de startups. Votre contexte peut varier, mais l&apos;ordre de priorite reste generalement le meme.</p>
                  </div>

                  {/* Prioritization matrix CSS mockup */}
                  <div className="mt-6 rounded-xl border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                        <span className="text-[12px] font-semibold text-white">Matrice de priorisation -- Impact vs Effort</span>
                      </div>
                    </div>
                    <div className="bg-white p-5">
                      {/* Matrix grid */}
                      <div className="relative">
                        {/* Axis labels */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] text-[#BBB] uppercase tracking-wider">Effort faible</span>
                          <span className="text-[9px] text-[#BBB] uppercase tracking-wider">Effort fort</span>
                        </div>

                        {/* Matrix */}
                        <div className="grid grid-cols-2 gap-[2px] bg-[#F0F0F0] rounded-lg overflow-hidden">
                          {/* High impact, Low effort */}
                          <div className="bg-[#F0FDF4] p-4 min-h-[140px]">
                            <p className="text-[9px] font-semibold text-[#22C55E] uppercase tracking-wider mb-3">Quick wins</p>
                            <div className="space-y-2">
                              {[
                                { num: "1", name: "CRM centralise", delay: "1-2 jours" },
                                { num: "2", name: "Pipeline defini", delay: "1 jour" },
                              ].map((item) => (
                                <div key={item.num} className="flex items-center gap-2 p-2 rounded-md bg-white border border-[#D1FAE5]">
                                  <div className="w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center text-white text-[9px] font-bold shrink-0">{item.num}</div>
                                  <div>
                                    <span className="text-[10px] font-medium text-[#111] block">{item.name}</span>
                                    <span className="text-[8px] text-[#999]">{item.delay}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* High impact, High effort */}
                          <div className="bg-[#FFF7ED] p-4 min-h-[140px]">
                            <p className="text-[9px] font-semibold text-[#FF7A59] uppercase tracking-wider mb-3">Projets strategiques</p>
                            <div className="space-y-2">
                              {[
                                { num: "4", name: "Automatisations", delay: "2-4 semaines" },
                                { num: "5", name: "SLA marketing-sales", delay: "2-3 semaines" },
                              ].map((item) => (
                                <div key={item.num} className="flex items-center gap-2 p-2 rounded-md bg-white border border-[#FED7AA]">
                                  <div className="w-5 h-5 rounded-full bg-[#FF7A59] flex items-center justify-center text-white text-[9px] font-bold shrink-0">{item.num}</div>
                                  <div>
                                    <span className="text-[10px] font-medium text-[#111] block">{item.name}</span>
                                    <span className="text-[8px] text-[#999]">{item.delay}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Low impact, Low effort */}
                          <div className="bg-[#F8FAFC] p-4 min-h-[120px]">
                            <p className="text-[9px] font-semibold text-[#999] uppercase tracking-wider mb-3">Nice to have</p>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 p-2 rounded-md bg-white border border-[#E8E8E8]">
                                <div className="w-5 h-5 rounded-full bg-[#CCC] flex items-center justify-center text-white text-[9px] font-bold shrink-0">-</div>
                                <div>
                                  <span className="text-[10px] text-[#999] block">Templates email</span>
                                  <span className="text-[8px] text-[#BBB]">0.5 jour</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Low impact, High effort */}
                          <div className="bg-[#FAFAFA] p-4 min-h-[120px]">
                            <p className="text-[9px] font-semibold text-[#999] uppercase tracking-wider mb-3">A eviter (pour l&apos;instant)</p>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 p-2 rounded-md bg-white border border-[#E8E8E8]">
                                <div className="w-5 h-5 rounded-full bg-[#E8E8E8] flex items-center justify-center text-[#999] text-[9px] font-bold shrink-0">x</div>
                                <div>
                                  <span className="text-[10px] text-[#999] block">BI / data warehouse</span>
                                  <span className="text-[8px] text-[#BBB]">Premature avant 30 pers.</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Y axis */}
                        <div className="flex justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-3 rounded-full bg-[#22C55E]" />
                            <span className="text-[8px] text-[#BBB]">Impact fort (haut)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-1 h-3 rounded-full bg-[#E8E8E8]" />
                            <span className="text-[8px] text-[#BBB]">Impact faible (bas)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 5 chantiers detailed */}
                  <div className="mt-6 space-y-3">
                    {[
                      { num: "01", title: "Centraliser toutes les donnees dans le CRM", impact: "Critique", effort: "1-2 jours", desc: "Plus aucun contact, aucun deal, aucune interaction ne vit en dehors du CRM. Migration des spreadsheets, import des contacts, nettoyage des doublons. C&apos;est le fondement de tout le reste.", color: "#22C55E" },
                      { num: "02", title: "Definir le pipeline et les etapes de vente", impact: "Critique", effort: "0.5 jour", desc: "5 a 7 etapes avec des criteres d&apos;entree et de sortie clairs. Formation de l&apos;equipe. Revue hebdomadaire du pipeline. Le pipeline est l&apos;outil de pilotage numero un.", color: "#22C55E" },
                      { num: "03", title: "Installer le reporting minimum", impact: "Fort", effort: "1 jour", desc: "Trois KPIs : pipeline total, montant pondere, taux de conversion. Un dashboard accessible a toute l&apos;equipe, mis a jour en temps reel. Pas de reporting Excel manuel.", color: "#4B5EFC" },
                      { num: "04", title: "Automatiser les taches repetitives", impact: "Fort", effort: "2-4 semaines", desc: "Commencer par les quick wins : notifications de nouveaux leads, relances automatiques pour les deals en retard, attribution automatique. Chaque automatisation liberee du temps commercial pur.", color: "#FF7A59" },
                      { num: "05", title: "Formaliser le handoff marketing-sales", impact: "Fort", effort: "2-3 semaines", desc: "Definir ce qu&apos;est un MQL, un SQL. Fixer les delais de suivi. Mettre en place les alertes. Installer le meeting hebdomadaire. C&apos;est la que les leads arretent de tomber entre les mailles.", color: "#FF7A59" },
                    ].map((chantier) => (
                      <div key={chantier.num} className="p-4 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA]">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px] font-bold" style={{ backgroundColor: chantier.color }}>{chantier.num}</div>
                          <span className="text-[12px] font-semibold text-[#111] flex-1">{chantier.title}</span>
                        </div>
                        <p className="text-[10px] text-[#777] leading-[1.6] mb-2 pl-10">{chantier.desc}</p>
                        <div className="flex items-center gap-4 pl-10">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] text-[#BBB]">Impact :</span>
                            <span className="text-[9px] font-semibold" style={{ color: chantier.color }}>{chantier.impact}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] text-[#BBB]">Effort :</span>
                            <span className="text-[9px] font-semibold text-[#666]">{chantier.effort}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 -- Comment mesurer le ROI du RevOps en startup */}
              <section id="roi-revops" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Comment mesurer le ROI du RevOps en startup</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le ROI du RevOps ne se mesure pas comme celui d&apos;une campagne marketing. C&apos;est un investissement structurel dont les benefices s&apos;accumulent dans le temps. Mais il existe des metriques concretes qui permettent de quantifier l&apos;impact des le premier trimestre.</p>
                    <p>La premiere metrique est le taux de conversion lead-to-client. Avant le RevOps, la plupart des startups ont un taux entre 2 et 5%. Avec un CRM propre, un pipeline defini, et un suivi rigoureux, ce taux monte a 8-15% dans les 3 premiers mois. Sur un volume de 100 leads par mois avec un panier moyen de 5 000 EUR, ca represente 15 000 a 50 000 EUR de revenu supplementaire par mois.</p>
                    <p>La deuxieme metrique est le cycle de vente. Sans process, un deal traine en moyenne 45 a 60 jours dans le pipeline. Avec des etapes claires, des criteres de passage, et des relances automatiques, le cycle descend a 25-35 jours. Ca signifie que les deals se ferment plus vite, que le cash rentre plus tot, et que les commerciaux peuvent traiter plus de volume.</p>
                    <p>La troisieme metrique est le temps administratif des commerciaux. Un commercial sans CRM passe 30 a 40% de son temps sur des taches administratives : chercher des informations, mettre a jour des spreadsheets, rediger des rapports manuels. Avec un stack RevOps correct, ce pourcentage descend a 10-15%. Sur une equipe de 5 commerciaux, c&apos;est l&apos;equivalent d&apos;un commercial supplementaire a temps plein, sans recrutement.</p>
                    <p>Le calcul est simple. Prenez le cout de votre investissement RevOps (externalisation ou recrutement). Mesurez l&apos;evolution de ces trois metriques sur un trimestre. Dans 90% des cas, le ROI est positif des le premier trimestre, et il s&apos;amplifie chaque trimestre suivant a mesure que les processus s&apos;affinent et que les automatisations montent en puissance.</p>
                  </div>

                  {/* Benchmarks */}
                  <div className="mt-6 rounded-xl border border-[#E0E0E0] overflow-hidden">
                    <div className="bg-[#111] px-5 py-3">
                      <span className="text-[12px] font-semibold text-white">Benchmarks : avant / apres RevOps (startups 10-50 pers.)</span>
                    </div>
                    <div className="bg-white p-5">
                      <div className="space-y-4">
                        {[
                          { metric: "Taux de conversion lead-to-client", before: "2-5%", after: "8-15%", improvement: "+200%", color: "#22C55E" },
                          { metric: "Cycle de vente moyen", before: "45-60 jours", after: "25-35 jours", improvement: "-40%", color: "#4B5EFC" },
                          { metric: "Temps admin commercial", before: "30-40%", after: "10-15%", improvement: "-60%", color: "#FF7A59" },
                          { metric: "Fiabilite du forecast", before: "30-40%", after: "70-85%", improvement: "+100%", color: "#6C5CE7" },
                          { metric: "Delai de suivi lead", before: "48-72h", after: "< 4h", improvement: "-90%", color: "#22C55E" },
                        ].map((bench) => (
                          <div key={bench.metric}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[11px] font-medium text-[#333]">{bench.metric}</span>
                              <span className="text-[10px] font-bold" style={{ color: bench.color }}>{bench.improvement}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-0.5">
                                  <span className="text-[9px] text-[#BBB]">Avant</span>
                                  <span className="text-[9px] text-[#999]">{bench.before}</span>
                                </div>
                                <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                                  <div className="h-full rounded-full bg-[#E0E0E0]" style={{ width: "35%" }} />
                                </div>
                              </div>
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[#CCC]"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-0.5">
                                  <span className="text-[9px] text-[#BBB]">Apres</span>
                                  <span className="text-[9px] font-semibold" style={{ color: bench.color }}>{bench.after}</span>
                                </div>
                                <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden">
                                  <div className="h-full rounded-full" style={{ width: "80%", backgroundColor: bench.color }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ROI calculation */}
                  <div className="mt-5 p-4 rounded-xl bg-[#FAFAFA] border border-[#F0F0F0]">
                    <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Calcul du ROI -- Exemple concret</p>
                    <div className="space-y-2 text-[11px] text-[#666]">
                      <div className="flex justify-between"><span>Investissement RevOps externalisee (3 mois)</span><span className="font-semibold text-[#FF7A59]">9 000 EUR</span></div>
                      <div className="flex justify-between"><span>Revenue supplementaire (conversion +10pts sur 100 leads/mois x 5K EUR)</span><span className="font-semibold text-[#22C55E]">+75 000 EUR</span></div>
                      <div className="flex justify-between"><span>Temps commercial economise (equiv. 0.5 FTE sur 3 mois)</span><span className="font-semibold text-[#22C55E]">+22 500 EUR</span></div>
                      <div className="border-t border-[#E8E8E8] pt-2 mt-2 flex justify-between">
                        <span className="font-semibold text-[#111]">ROI sur 3 mois</span>
                        <span className="font-bold text-[#22C55E] text-[13px]">+983%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 -- Notre offre pour les startups (dark section) */}
              <section id="offre-startups" className="mb-8">
                <div className="rounded-2xl bg-[#111] p-5 md:p-8 border border-[#222]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FF7A59] flex items-center justify-center text-white text-[12px] font-bold">C</div>
                    <h2 className="text-[17px] font-semibold text-white">Notre offre pour les startups : Ceres RevOps Part-Time</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>On a concu une offre specifiquement pour les startups de 5 a 50 personnes. L&apos;idee est simple : vous n&apos;avez pas besoin d&apos;un RevOps a temps plein, vous avez besoin d&apos;un RevOps expert a temps partiel. Quelqu&apos;un qui connait les problematiques startup, qui a deja deploye des dizaines de stacks, et qui peut structurer vos operations revenue en quelques semaines au lieu de quelques mois.</p>
                    <p>Le format Ceres RevOps Part-Time est flexible. On intervient entre 2 et 8 jours par mois, selon votre stade et vos besoins. On commence toujours par un diagnostic de 2 jours pour cartographier l&apos;existant, identifier les quick wins, et construire la roadmap. Ensuite, on execute. CRM, pipeline, reporting, automatisations, lead scoring, SLA, dashboards. Tout ce qui est couvert dans ce guide, on le deploie pour vous.</p>
                    <p>Le cout est entre 2 000 et 6 000 EUR par mois, en fonction du volume de jours. C&apos;est 3 a 5 fois moins cher qu&apos;un recrutement interne, avec un niveau d&apos;expertise superieur et une mise en place immediate. Et surtout, c&apos;est sans engagement de duree. Si au bout de 3 mois les fondations sont posees et que vous n&apos;avez plus besoin de nous, on se quitte en bons termes.</p>
                  </div>

                  {/* Offer cards */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: "Starter", days: "2 jours/mois", price: "2 000 EUR/mois", desc: "Diagnostic, CRM setup, pipeline, reporting basique", color: "#FF7A59", features: ["Diagnostic initial (2j)", "Configuration CRM", "Pipeline et etapes", "Dashboard 3 KPIs", "Support email"] },
                      { name: "Growth", days: "4 jours/mois", price: "3 800 EUR/mois", desc: "Starter + automatisations, scoring, SLA, dashboards", color: "#4B5EFC", features: ["Tout Starter +", "Lead scoring", "5-10 automatisations", "SLA marketing-sales", "3 dashboards", "Weekly sync call"] },
                      { name: "Scale", days: "8 jours/mois", price: "6 000 EUR/mois", desc: "Growth + BI, forecasting, integrations avancees", color: "#22C55E", features: ["Tout Growth +", "Forecasting avance", "Integrations BI", "Attribution multi-touch", "Formation equipes", "Slack dedie"] },
                    ].map((offer) => (
                      <div key={offer.name} className="rounded-xl p-4 border border-white/10 bg-white/5">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: offer.color }} />
                          <span className="text-[13px] font-semibold text-white">{offer.name}</span>
                        </div>
                        <p className="text-[10px] text-white/30 mb-3">{offer.days}</p>
                        <div className="text-[20px] font-bold mb-2" style={{ color: offer.color }}>{offer.price}</div>
                        <p className="text-[10px] text-white/40 mb-4 leading-[1.5]">{offer.desc}</p>
                        <div className="space-y-1.5">
                          {offer.features.map((f) => (
                            <div key={f} className="flex items-start gap-2 text-[10px] text-white/40">
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5" style={{ color: offer.color }}><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: "47", label: "startups accompagnees", color: "#FF7A59" },
                      { value: "+180%", label: "de conversion en moyenne", color: "#4B5EFC" },
                      { value: "< 2 sem", label: "pour les premieres fondations", color: "#22C55E" },
                      { value: "4.8/5", label: "note de satisfaction client", color: "#6C5CE7" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-[20px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="text-[10px] text-white/40 mt-1 leading-[1.4]">{stat.label}</div>
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
                  <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Pret a structurer votre RevOps startup ?</h2>
                  <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On deploie les fondations RevOps en 2 semaines. Diagnostic, CRM, pipeline, reporting, automatisations. Adapte a votre stade et votre budget. Premiers resultats mesurables des le premier mois.</p>
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#FF7A59]" />Reserver un diagnostic gratuit
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
