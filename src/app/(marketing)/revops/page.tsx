import Connector from "@/components/marketing/Connector";
import type { Metadata } from "next";
import Badge from "@/components/marketing/Badge";
import RevOpsQuiz from "@/components/marketing/RevOpsQuiz";

export const metadata: Metadata = {
  title: "Qu'est-ce que le RevOps ? — Guide complet Revenue Operations | Ceres",
  description:
    "Le RevOps (Revenue Operations) aligne Sales, Marketing et Customer Success autour de process, outils et données communs. Définition, enjeux, mise en place et bénéfices concrets pour les entreprises B2B.",
  keywords: [
    "revops", "revenue operations", "qu'est-ce que le revops",
    "revops définition", "revenue operations définition",
    "revops c'est quoi", "revops explication", "revops guide",
    "alignement sales marketing", "operations commerciales",
    "revops vs sales ops", "revops france", "revops b2b",
  ],
};

const pillars = [
  { title: "Process", desc: "Des règles claires partagées entre les équipes. Lead routing, SLA, handoff, lifecycle stages. Tout le monde joue avec les mêmes règles.", color: "#FF7A59" },
  { title: "Outils", desc: "Une stack connectée avec un CRM central. Fini les 8 outils qui ne se parlent pas. Les données circulent automatiquement.", color: "#4B5EFC" },
  { title: "Data", desc: "Une seule source de vérité. Les mêmes définitions (MQL, SQL, pipeline), les mêmes chiffres, les mêmes dashboards.", color: "#6D00CC" },
  { title: "Personnes", desc: "Des équipes alignées sur les mêmes objectifs revenue. Marketing, Sales et CS qui collaborent au lieu de se blâmer.", color: "#22C55E" },
];

const withoutRevOps = [
  "Marketing génère des leads que Sales ne rappelle pas",
  "Sales reproche à Marketing la qualité des leads",
  "CS découvre ce qui a été vendu au moment de l'onboarding",
  "Chaque équipe a ses propres métriques et ses propres outils",
  "Les forecasts changent chaque semaine et personne ne les croit",
  "Le CEO demande un chiffre et reçoit 3 réponses différentes",
  "Personne ne sait combien de temps un deal met à closer",
  "Les données sont dupliquées dans 4 outils différents",
];

const withRevOps = [
  "Les leads sont qualifiés, scorés et routés automatiquement",
  "Marketing et Sales partagent la même définition de MQL/SQL",
  "CS a une visibilité complète sur l'historique du deal et du client",
  "Une seule source de vérité pour toutes les équipes",
  "Forecasts fiables basés sur la data, pas le feeling",
  "Reporting automatisé, 0 slide manuelle chaque lundi",
  "Cycle de vente mesuré et optimisé à chaque étape",
  "L'IA automatise les tâches répétitives et enrichit les données",
];

const vsTable = [
  { label: "Périmètre", salesOps: "Sales uniquement", revops: "Sales + Marketing + CS" },
  { label: "Objectif", salesOps: "Optimiser les ventes", revops: "Optimiser le revenu global" },
  { label: "Données", salesOps: "CRM Sales", revops: "Stack complète unifiée" },
  { label: "Reporting", salesOps: "Dashboards Sales", revops: "Reporting cross-équipes" },
  { label: "IA", salesOps: "Rarement", revops: "Intégrée dans les process" },
  { label: "Impact", salesOps: "Productivité des reps", revops: "Croissance revenue globale" },
];

const metrics = [
  { label: "Croissance du revenu", value: "+19%", source: "Boston Consulting Group" },
  { label: "Réduction du cycle de vente", value: "-15%", source: "Forrester Research" },
  { label: "Efficacité des équipes", value: "+30%", source: "SiriusDecisions" },
  { label: "Forecast accuracy", value: "+25%", source: "Gartner" },
];

const maturityLevels = [
  { level: "1", title: "Réactif", desc: "Pas de RevOps formalisé. Chaque équipe fonctionne en silo avec ses propres process et outils. Données fragmentées.", color: "#EF4444" },
  { level: "2", title: "Émergent", desc: "Premiers efforts d'alignement. Un CRM est en place mais mal configuré. Quelques automatisations basiques.", color: "#F59E0B" },
  { level: "3", title: "Structuré", desc: "Process documentés, stack connectée, SLA définis. Reporting unifié. Premiers use cases IA déployés.", color: "#4B5EFC" },
  { level: "4", title: "Optimisé", desc: "RevOps mature. Agents IA en production, scoring prédictif, données enrichies automatiquement. Revenue prévisible.", color: "#22C55E" },
];

const steps = [
  { num: "01", title: "Auditer l'existant", desc: "Cartographier vos outils, process et données. Identifier les silos, les trous et les quick wins." },
  { num: "02", title: "Aligner les définitions", desc: "MQL, SQL, lifecycle stages, pipeline stages. Tout le monde parle le même langage." },
  { num: "03", title: "Connecter la stack", desc: "Un CRM central (HubSpot), des intégrations qui marchent, des données qui circulent automatiquement." },
  { num: "04", title: "Automatiser", desc: "Workflows, lead routing, reporting, enrichissement. Chaque tâche manuelle est un candidat à l'automatisation." },
  { num: "05", title: "Déployer l'IA", desc: "Agents Claude connectés via MCP. Qualification, résumés, scoring. L'IA dans vos process, pas à côté." },
  { num: "06", title: "Itérer", desc: "Mesurer, optimiser, scaler. Le RevOps n'est pas un projet one-shot, c'est une discipline continue." },
];

const faqItems = [
  { q: "Le RevOps remplace-t-il les Sales Ops ?", a: "Non, il les englobe. Le RevOps intègre Sales Ops, Marketing Ops et CS Ops dans une fonction unifiée. Les Sales Ops deviennent une composante du RevOps, pas un rôle séparé." },
  { q: "Quelle taille d'entreprise a besoin de RevOps ?", a: "Dès que vous avez une équipe Sales et une équipe Marketing (à partir de 10-15 personnes). Plus vous structurez tôt, moins vous aurez à refondre plus tard." },
  { q: "Faut-il recruter un Head of RevOps ?", a: "Pas nécessairement. Beaucoup d'entreprises commencent avec un RevOps Part-Time externalisé pour poser les fondations avant de recruter en interne." },
  { q: "Quel CRM pour faire du RevOps ?", a: "HubSpot est le CRM le plus adapté au RevOps grâce à sa plateforme unifiée (Sales, Marketing, Service, Operations Hub). Salesforce fonctionne aussi mais nécessite plus de configuration." },
  { q: "Combien de temps pour mettre en place du RevOps ?", a: "Un audit et les premiers quick wins : 2-4 semaines. Une fondation solide : 2-3 mois. Un RevOps mature avec IA : 6-12 mois d'itérations continues." },
  { q: "Quel est le ROI du RevOps ?", a: "Les entreprises avec une fonction RevOps mature voient en moyenne +19% de croissance revenue (BCG), -15% de cycle de vente (Forrester) et +30% d'efficacité des équipes (SiriusDecisions)." },
  { q: "Quel lien entre RevOps et IA ?", a: "L'IA est le levier qui rend le RevOps exponentiel. Scoring prédictif, résumés de calls, enrichissement automatique, qualification. Le RevOps fournit les données propres dont l'IA a besoin pour être efficace." },
  { q: "C'est quoi le MCP dans le contexte RevOps ?", a: "Le Model Context Protocol (MCP) est le standard d'Anthropic pour connecter Claude à vos outils (CRM, Slack, bases de données). C'est le pont technique qui permet à l'IA d'agir dans vos process RevOps." },
];

const jsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "Article", headline: "Qu'est-ce que le RevOps ? Guide complet Revenue Operations", author: { "@type": "Organization", name: "Ceres" }, publisher: { "@type": "Organization", name: "Ceres" }, description: "Guide complet sur le RevOps : définition, piliers, mise en place, bénéfices et rôle de l'IA.", inLanguage: "fr-FR" },
  { "@type": "FAQPage", mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
]};

export default function RevOpsPage() {
  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "15%", width: 320, height: 320, borderRadius: "50%", background: "#FF7A59", opacity: 0.16, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "35%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.16, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "60%", width: 280, height: 280, borderRadius: "50%", background: "#6D00CC", opacity: 0.15, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "80%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.15, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "45%", width: 320, height: 320, borderRadius: "50%", background: "#D4A27F", opacity: 0.15, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "90%", width: 300, height: 300, borderRadius: "50%", background: "#6C5CE7", opacity: 0.14, filter: "blur(70px)" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative z-10 max-w-[900px] mx-auto px-6">

        {/* Hero */}
        <section className="text-center mb-20">
          <div className="mb-4"><Badge>Guide</Badge></div>
          <h1 className="text-[36px] sm:text-[48px] font-semibold text-[#111] leading-[1.1] tracking-[-0.03em] mb-5">
            Qu&apos;est-ce que le RevOps ?
          </h1>
          <p className="text-[17px] text-[#666] max-w-[560px] mx-auto leading-[1.7]">
            Le guide complet sur le Revenue Operations : définition, piliers, mise en place et impact concret sur votre croissance.
          </p>
        </section>
        <Connector />

        {/* Quick definition — snippet-friendly */}
        <section>
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="mb-4">
              <div className="mb-4"><Badge>Définition</Badge></div>
            </div>
            <blockquote className="border-l-[3px] border-[#111] pl-5 mb-6">
              <p className="text-[16px] sm:text-[18px] font-semibold text-[#111] leading-[1.5]">
                Le RevOps (Revenue Operations) est la discipline qui aligne les équipes Sales, Marketing et Customer Success autour de process, outils et données communs pour maximiser le revenu.
              </p>
            </blockquote>
            <p className="text-[13px] text-[#777] leading-[1.7]">
              Concrètement, le RevOps casse les silos entre les équipes qui touchent au revenu. Au lieu que chaque département fonctionne avec ses propres outils, ses propres métriques et ses propres process, le RevOps crée une infrastructure commune : un CRM central, des définitions partagées, des automatisations transverses et une vision unifiée du client de la prospection au renouvellement.
            </p>
          </div>
        </section>
        <Connector />

        {/* Auto-diagnostic quiz */}
        <section>
          <RevOpsQuiz />
        </section>
        <Connector />

        {/* 4 Pillars */}
        <section>
          <div className="text-center mb-10">
            <div className="mb-4"><Badge>Les 4 piliers</Badge></div>
            <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#111] tracking-[-0.02em] mb-2">Sur quoi repose le RevOps</h2>
            <p className="text-[13px] text-[#999] max-w-[440px] mx-auto">Le RevOps repose sur 4 fondamentaux. Si un pilier manque, l&apos;alignement ne tient pas.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-lg border border-[#EAEAEA] bg-white p-6 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: p.color }} />
                  <h3 className="text-[15px] font-semibold text-[#111]">{p.title}</h3>
                </div>
                <p className="text-[12px] text-[#777] leading-[1.65]">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <Connector />

        {/* Without vs With */}
        <section>
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="text-center mb-8">
              <div className="mb-4"><Badge>Avant / Après</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Sans RevOps vs Avec RevOps</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[13px] font-semibold text-[#EF4444] mb-4 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  Sans RevOps
                </h3>
                <div className="space-y-2">
                  {withoutRevOps.map((item) => (
                    <p key={item} className="text-[12px] text-[#999] leading-[1.5] pl-4 border-l-2 border-[#F0F0F0]">{item}</p>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-[#22C55E] mb-4 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Avec RevOps
                </h3>
                <div className="space-y-2">
                  {withRevOps.map((item) => (
                    <p key={item} className="text-[12px] text-[#555] leading-[1.5] pl-4 border-l-2 border-[#22C55E]/20 font-medium">{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Connector />

        {/* RevOps vs Sales Ops */}
        <section>
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="mb-8">
              <div className="mb-4"><Badge>Comparatif</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">RevOps vs Sales Ops</h2>
              <p className="text-[13px] text-[#999] mt-2">Le Sales Ops est une composante du RevOps, pas un synonyme.</p>
            </div>
            <div className="space-y-0">
              <div className="grid grid-cols-3 gap-4 pb-3 border-b border-[#F2F2F2]">
                <span className="text-[11px] font-semibold text-[#999]"></span>
                <span className="text-[11px] font-semibold text-[#999] text-center">Sales Ops</span>
                <span className="text-[11px] font-semibold text-[#4B5EFC] text-center">RevOps</span>
              </div>
              {vsTable.map((row) => (
                <div key={row.label} className="grid grid-cols-3 gap-4 py-3 border-b border-[#F2F2F2]">
                  <span className="text-[12px] font-semibold text-[#111]">{row.label}</span>
                  <span className="text-[12px] text-[#999] text-center">{row.salesOps}</span>
                  <span className="text-[12px] text-[#111] font-medium text-center">{row.revops}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* Impact numbers */}
        <section>
          <div className="rounded-lg bg-[#111] p-6 md:p-10">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Impact mesuré</span>
              <h2 className="text-[24px] sm:text-[30px] font-semibold text-white tracking-[-0.02em] mb-2">Le RevOps en chiffres</h2>
              <p className="text-[13px] text-white/40">Sources : BCG, Forrester, Gartner, SiriusDecisions.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((m) => (
                <div key={m.label} className="text-center rounded-lg bg-white/5 border border-white/10 p-5">
                  <div className="text-[28px] font-bold text-white tracking-[-0.02em] mb-1">{m.value}</div>
                  <p className="text-[11px] text-white/50 mb-2">{m.label}</p>
                  <p className="text-[9px] text-white/25">{m.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* Maturity levels */}
        <section>
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="mb-8">
              <div className="mb-4"><Badge>Maturité</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Où en êtes-vous ?</h2>
              <p className="text-[13px] text-[#999] mt-2">4 niveaux de maturité RevOps. La plupart des entreprises sont entre 1 et 2.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {maturityLevels.map((l) => (
                <div key={l.level} className="rounded-lg border border-[#F2F2F2] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[18px] font-bold" style={{ color: l.color }}>{l.level}</span>
                    <h3 className="text-[13px] font-semibold text-[#111]">{l.title}</h3>
                  </div>
                  <p className="text-[11px] text-[#777] leading-[1.6]">{l.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* How to implement */}
        <section>
          <div className="text-center mb-10">
            <div className="mb-4"><Badge>Mise en place</Badge></div>
            <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#111] tracking-[-0.02em] mb-2">Comment mettre en place du RevOps</h2>
            <p className="text-[13px] text-[#999] max-w-[460px] mx-auto">6 étapes pour passer d&apos;une organisation en silos à un RevOps structuré.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {steps.map((s) => (
              <div key={s.num} className="rounded-lg border border-[#EAEAEA] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <span className="text-[20px] font-bold text-[#F0F0F0]">{s.num}</span>
                <h3 className="text-[14px] font-semibold text-[#111] mt-2 mb-1.5">{s.title}</h3>
                <p className="text-[12px] text-[#777] leading-[1.6]">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <Connector />

        {/* Role of AI */}
        <section>
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="mb-8">
              <div className="mb-4"><Badge>RevOps + IA</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">L&apos;IA, le levier qui change tout</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[13px] text-[#666] leading-[1.7] mb-4">
                  Le RevOps crée les conditions pour que l&apos;IA soit efficace : des données propres, des process structurés, une stack connectée. Sans RevOps, l&apos;IA n&apos;a pas de fondation solide pour travailler.
                </p>
                <p className="text-[13px] text-[#666] leading-[1.7] mb-4">
                  Avec un RevOps mature, l&apos;IA peut qualifier vos leads en temps réel, résumer vos calls automatiquement, scorer vos opportunités et enrichir vos données en 3 secondes.
                </p>
                <p className="text-[13px] text-[#666] leading-[1.7]">
                  Chez Ceres, on utilise Claude (Anthropic) connecté via le protocole MCP pour déployer des agents IA directement dans votre CRM. Claude Code nous permet de construire des outils sur-mesure 10x plus vite.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Qualification de leads", desc: "Claude score chaque lead en temps réel" },
                  { label: "Résumés de calls", desc: "Transcription + résumé structuré automatique" },
                  { label: "Enrichissement", desc: "Clay + Claude = fiche complète en 3 sec" },
                  { label: "Scoring prédictif", desc: "Patterns identifiés sur 12 mois de deals" },
                  { label: "Playbooks IA", desc: "Techniques des meilleurs reps codifiées" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAFAFA]">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#6D00CC]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <div>
                      <span className="text-[12px] font-semibold text-[#111]">{item.label}</span>
                      <span className="text-[11px] text-[#999] ml-1">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Connector />

        {/* FAQ */}
        <section>
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="mb-8">
              <div className="mb-4"><Badge>FAQ</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Questions fréquentes sur le RevOps</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {faqItems.map((f, i) => (
                <div key={i} className="border-b border-[#F2F2F2] py-4">
                  <h3 className="text-[13px] font-semibold text-[#111] mb-1.5">{f.q}</h3>
                  <p className="text-[12px] text-[#777] leading-[1.6]">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* CTA */}
        <section id="contact">
          <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-8 md:p-12 text-center">
            <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#111] tracking-[-0.02em] mb-3">
              Prêt à structurer votre RevOps ?
            </h2>
            <p className="text-[14px] text-[#999] mb-6 max-w-[440px] mx-auto">
              On audite votre situation et on identifie vos quick wins en 30 minutes. Gratuit, sans engagement.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Réserver un appel
              </a>
              <a href="/audit-revops" className="inline-flex items-center px-5 py-2 rounded-md text-[13px] text-[#666] hover:text-[#111] hover:bg-[#F0F0F0] transition-colors">
                Voir l&apos;audit RevOps
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
