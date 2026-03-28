import Connector from "@/components/marketing/Connector";
import type { Metadata } from "next";
import Badge from "@/components/marketing/Badge";

export const metadata: Metadata = {
  title: "Audit RevOps — Diagnostic CRM, Process & Data | Ceres",
  description:
    "Audit complet de votre stack RevOps : CRM HubSpot ou Salesforce, process commerciaux, data quality, intégrations et automatisations. Rapport actionnable avec plan d'action priorisé. Résultats en 2 semaines.",
  keywords: [
    "audit revops", "audit crm", "audit hubspot", "diagnostic commercial",
    "data quality crm", "audit process commercial", "optimisation pipeline",
    "consultant revops", "audit salesforce", "revops diagnostic",
    "audit ops commerciales", "revops france",
  ],
};

const auditPillars = [
  {
    title: "CRM & Data Quality",
    items: ["Taux de remplissage par champ", "Doublons et données orphelines", "Propriétés inutilisées ou redondantes", "Cohérence des données inter-objets"],
    color: "#FF7A59",
    score: "Score qualité /100",
  },
  {
    title: "Pipeline & Funnel",
    items: ["Pertinence des deal stages", "Taux de conversion par étape", "Vélocité et cycle de vente", "Écart forecast vs réel"],
    color: "#4B5EFC",
    score: "Analyse par stage",
  },
  {
    title: "Process & SLA",
    items: ["Alignement MQL/SQL entre équipes", "Lead routing et temps de réponse", "Handoff Sales → CS", "SLA documentés vs réalité"],
    color: "#6C5CE7",
    score: "Gap analysis",
  },
  {
    title: "Stack & Intégrations",
    items: ["Cartographie complète des outils", "Flux de données entre systèmes", "Automatisations actives et cassées", "Trous dans la chaîne de données"],
    color: "#D4A27F",
    score: "Cartographie visuelle",
  },
  {
    title: "Reporting & Métriques",
    items: ["Dashboards existants vs utilisés", "KPIs suivis par équipe", "Single source of truth ou pas", "Recommandations métriques clés"],
    color: "#6D00CC",
    score: "Benchmark secteur",
  },
  {
    title: "IA & Automatisation",
    items: ["Potentiel d'automatisation identifié", "Use cases IA prioritaires", "Connexions MCP possibles", "Quick wins IA à déployer"],
    color: "#22C55E",
    score: "Roadmap IA",
  },
];

const timeline = [
  { num: "01", title: "Cadrage", desc: "Appel de 30 min pour définir le périmètre, les accès nécessaires et les interlocuteurs clés.", duration: "J0", color: "#FF7A59" },
  { num: "02", title: "Collecte", desc: "On accède à votre CRM, vos outils et vos données. On planifie 2-3 interviews avec vos équipes.", duration: "J1-J3", color: "#4B5EFC" },
  { num: "03", title: "Analyse", desc: "Deep dive dans vos données, process et automatisations. On mesure, on benchmark, on identifie.", duration: "S1", color: "#6C5CE7" },
  { num: "04", title: "Restitution", desc: "Présentation live du rapport complet à votre équipe. Discussion des priorités et du plan d'action.", duration: "S2", color: "#22C55E" },
];

const deliverables = [
  { title: "Rapport d'audit", desc: "40 à 60 pages. Chaque pilier analysé avec captures, données et recommandations.", color: "#FF7A59" },
  { title: "Score de maturité", desc: "Note sur 100 avec benchmark par rapport à votre secteur et votre taille.", color: "#4B5EFC" },
  { title: "Cartographie stack", desc: "Schéma visuel de tous vos outils et flux de données entre eux.", color: "#6C5CE7" },
  { title: "Quick wins", desc: "5 à 10 actions à impact immédiat que vous pouvez exécuter cette semaine.", color: "#D4A27F" },
  { title: "Plan 90 jours", desc: "Roadmap priorisée avec effort/impact pour chaque chantier identifié.", color: "#6D00CC" },
  { title: "Restitution live", desc: "1h de présentation avec votre équipe. Questions, discussion, alignement.", color: "#22C55E" },
];

const beforeAfter = [
  { before: "Data quality à 45%", after: "Data quality à 92%", metric: "+47pts" },
  { before: "Forecast fiable à 30%", after: "Forecast fiable à 85%", metric: "+55pts" },
  { before: "8 outils déconnectés", after: "Stack unifiée 100%", metric: "100%" },
  { before: "3h reporting / semaine", after: "0 slide manuelle", metric: "-3h/sem" },
];

const faqItems = [
  { q: "Combien de temps dure un audit RevOps ?", a: "Entre 1 et 2 semaines selon la taille de votre stack. On a besoin d'accès à votre CRM, vos outils et de 2-3 interviews avec vos équipes." },
  { q: "Quelle est la différence avec un audit CRM ?", a: "On ne regarde pas que le CRM. On audite les process inter-équipes, les connexions entre outils, les SLA, la qualité des données et les automatisations. C'est une vue 360 de vos opérations revenue." },
  { q: "Ça marche avec Salesforce aussi ?", a: "Oui. Notre expertise principale est HubSpot mais on audite aussi Salesforce et les stacks mixtes HubSpot + Salesforce." },
  { q: "On doit fournir quoi ?", a: "Un accès admin à votre CRM, la liste de vos outils, et 1h de temps de 2-3 personnes clés (VP Sales, Head of Marketing, CS Lead) pour les interviews." },
  { q: "Et après l'audit ?", a: "Vous repartez avec un rapport actionnable. Vous pouvez l'exécuter en interne ou on vous accompagne avec une mission Build ou un RevOps Part-Time." },
  { q: "Quel est le prix ?", a: "Au forfait, après le cadrage. Dépend du nombre d'outils, d'utilisateurs et de la complexité de votre stack. L'appel de cadrage est gratuit." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Audit RevOps",
      provider: { "@type": "Organization", name: "Ceres", url: "https://ceres-revops.fr" },
      description: "Audit complet de votre stack RevOps : CRM, process, data quality, intégrations et automatisations.",
      areaServed: { "@type": "Country", name: "France" },
      serviceType: "Revenue Operations Audit",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

function ScoreGauge({ score, label, color }: { score: number; label: string; color: string }) {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r="36" fill="none" stroke="#F0F0F0" strokeWidth="6" />
        <circle cx="45" cy="45" r="36" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          transform="rotate(-90 45 45)" />
        <text x="45" y="42" textAnchor="middle" fontSize="18" fontWeight="700" fill="#111" fontFamily="Inter, system-ui, sans-serif">{score}</text>
        <text x="45" y="55" textAnchor="middle" fontSize="8" fill="#999" fontFamily="Inter, system-ui, sans-serif">/100</text>
      </svg>
      <span className="text-[11px] text-[#999] mt-1">{label}</span>
    </div>
  );
}

export default function AuditRevOpsPage() {
  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "15%", width: 340, height: 340, borderRadius: "50%", background: "#FF7A59", opacity: 0.16, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "25%", width: 300, height: 300, borderRadius: "50%", background: "#D4A27F", opacity: 0.15, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "45%", width: 320, height: 320, borderRadius: "50%", background: "#4B5EFC", opacity: 0.16, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "2%", top: "55%", width: 280, height: 280, borderRadius: "50%", background: "#6D00CC", opacity: 0.15, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "72%", width: 300, height: 300, borderRadius: "50%", background: "#6C5CE7", opacity: 0.15, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "85%", width: 320, height: 320, borderRadius: "50%", background: "#22C55E", opacity: 0.14, filter: "blur(70px)" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative z-10 max-w-[900px] mx-auto px-6">
        {/* Hero */}
        <section className="text-center mb-20">
          <div className="mb-4"><Badge>Service</Badge></div>
          <h1 className="text-[36px] sm:text-[48px] font-semibold text-[#111] leading-[1.1] tracking-[-0.03em] mb-5">
            Audit RevOps
          </h1>
          <p className="text-[17px] text-[#666] max-w-[540px] mx-auto leading-[1.7] mb-4">
            On passe votre CRM, vos process et votre stack au crible.
            Vous repartez avec un diagnostic clair et un plan d&apos;action priorisé en 2 semaines.
          </p>
          <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
            {["hubspot.com", "salesforce.com", "clay.com", "make.com", "notion.so", "slack.com"].map((d) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={d} src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`} alt="" width={18} height={18} className="rounded-sm opacity-40" loading="lazy" />
            ))}
          </div>
          <div className="flex items-center justify-center gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-[#EAEAEA] bg-white text-[13px] text-[#111] font-medium hover:border-[#CCC] hover:shadow-sm transition-all">
              <span className="w-2 h-2 rounded-sm bg-[#FF7A59]" />
              Demander un audit
            </a>
            <a href="/" className="inline-flex items-center px-4 py-1.5 rounded-md text-[13px] text-[#666] hover:text-[#111] hover:bg-[#F5F5F5] transition-colors">
              Retour accueil
            </a>
          </div>
        </section>
        <Connector />

        {/* Score illustration */}
        <section className="">
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="text-center mb-8">
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-2">Votre score de maturité RevOps</h2>
              <p className="text-[13px] text-[#999]">On mesure 6 piliers et on vous donne un score global benchmarké.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              <ScoreGauge score={72} label="Exemple client" color="#FF7A59" />
              <div className="hidden sm:block w-px h-16 bg-[#F0F0F0]" />
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "CRM", score: 85, color: "#FF7A59" },
                  { label: "Pipeline", score: 62, color: "#4B5EFC" },
                  { label: "Process", score: 45, color: "#6C5CE7" },
                  { label: "Stack", score: 78, color: "#D4A27F" },
                  { label: "Reporting", score: 55, color: "#6D00CC" },
                  { label: "IA", score: 30, color: "#22C55E" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-[18px] font-semibold" style={{ color: s.color }}>{s.score}</div>
                    <div className="text-[10px] text-[#999]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Connector />

        {/* 6 Pillars */}
        <section className="">
          <div className="text-center mb-10">
            <div className="mb-4"><Badge>6 piliers</Badge></div>
            <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#111] tracking-[-0.02em] mb-2">
              Ce qu&apos;on passe au crible
            </h2>
            <p className="text-[13px] text-[#999] max-w-[440px] mx-auto">Chaque pilier est analysé en profondeur avec données, captures et recommandations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {auditPillars.map((p) => (
              <div key={p.title} className="rounded-lg border border-[#EAEAEA] bg-white p-6 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: p.color }} />
                    <h3 className="text-[15px] font-semibold text-[#111]">{p.title}</h3>
                  </div>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: p.color + "12", color: p.color }}>{p.score}</span>
                </div>
                <ul className="space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[12px] text-[#666]">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <Connector />

        {/* Before / After */}
        <section className="">
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="text-center mb-8">
              <div className="mb-4"><Badge>Résultats types</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Avant / Après audit</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {beforeAfter.map((ba) => (
                <div key={ba.before} className="flex items-center gap-3 rounded-lg border border-[#F2F2F2] p-4">
                  <div className="flex-1">
                    <p className="text-[11px] text-[#999] line-through mb-1">{ba.before}</p>
                    <p className="text-[12px] font-semibold text-[#111]">{ba.after}</p>
                  </div>
                  <span className="text-[13px] font-bold text-[#22C55E] shrink-0">{ba.metric}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* Timeline */}
        <section className="">
          <div className="rounded-lg bg-[#111] p-6 md:p-10">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Timeline</span>
              <h2 className="text-[24px] sm:text-[30px] font-semibold text-white tracking-[-0.02em] mb-2">2 semaines, 4 étapes</h2>
              <p className="text-[13px] text-white/40">Du kick-off au plan d&apos;action, tout est cadré.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeline.map((s, i) => (
                <div key={s.num} className="relative rounded-lg bg-white/5 border border-white/10 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[20px] font-semibold text-white/10">{s.num}</span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: s.color + "20", color: s.color }}>{s.duration}</span>
                  </div>
                  <h3 className="text-[13px] font-semibold text-white mb-1">{s.title}</h3>
                  <p className="text-[11px] text-white/40 leading-[1.5]">{s.desc}</p>
                  {i < 3 && <div className="hidden md:block absolute -right-[9px] top-1/2 -translate-y-1/2 z-10 text-white/20"><svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 1L6 4L2 7" fill="currentColor" /></svg></div>}
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* Deliverables */}
        <section className="">
          <div className="text-center mb-10">
            <div className="mb-4"><Badge>Livrables</Badge></div>
            <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#111] tracking-[-0.02em]">Ce que vous recevez</h2>
            <p className="text-[13px] text-[#999] max-w-[400px] mx-auto mt-2">Pas un PowerPoint de 10 slides. Un vrai rapport opérationnel.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {deliverables.map((d) => (
              <div key={d.title} className="rounded-lg border border-[#EAEAEA] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: d.color }} />
                  <h3 className="text-[14px] font-semibold text-[#111]">{d.title}</h3>
                </div>
                <p className="text-[12px] text-[#777] leading-[1.6]">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <Connector />

        {/* Who is this for */}
        <section className="">
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="mb-6">
              <div className="mb-4"><Badge>Pour qui ?</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">L&apos;audit est fait pour vous si...</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Vous n'avez aucune visibilité sur la qualité de vos données CRM",
                "Vos forecasts ne collent jamais au réel",
                "Sales et Marketing ne sont pas alignés sur la définition d'un MQL",
                "Vous avez le sentiment que vos outils ne sont pas exploités à fond",
                "Vous envisagez une migration ou un changement de CRM",
                "Vous voulez déployer l'IA mais ne savez pas par où commencer",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAFAFA]">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#FF7A59]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="text-[12px] text-[#555] leading-[1.5]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* FAQ */}
        <section className="">
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="mb-6">
              <div className="mb-4"><Badge>FAQ</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Questions sur l&apos;audit</h2>
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
              Prêt pour votre audit RevOps ?
            </h2>
            <p className="text-[14px] text-[#999] mb-6 max-w-[400px] mx-auto">
              30 minutes de cadrage pour définir le périmètre. Gratuit, sans engagement.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a href="https://cal.com" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />
                Réserver un appel
              </a>
              <a href="mailto:hello@ceres-revops.fr" className="inline-flex items-center px-5 py-2 rounded-md text-[13px] text-[#666] hover:text-[#111] hover:bg-[#F0F0F0] transition-colors">
                Nous écrire
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
