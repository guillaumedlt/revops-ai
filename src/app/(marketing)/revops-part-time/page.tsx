import Connector from "@/components/marketing/Connector";
import type { Metadata } from "next";
import Badge from "@/components/marketing/Badge";

export const metadata: Metadata = {
  title: "RevOps Part-Time — Un expert dédié chaque mois | Ceres",
  description:
    "Un ops RevOps & IA intégré à votre équipe au quotidien. Il gère votre CRM, automatise vos process, déploie l'IA et pilote votre roadmap revenue. Sans engagement.",
  keywords: [
    "revops part time", "revops externalisé", "ops commercial externalisé",
    "revops as a service", "consultant revops mensuel", "revops freelance",
    "directeur revops externalisé", "revenue operations france",
  ],
};

const painPoints = [
  "Vous n'avez pas le budget pour un Head of RevOps à 80K€",
  "Votre CRM est géré par quelqu'un qui fait ça en plus de son job",
  "Vous perdez du temps sur des tâches ops au lieu de vendre",
  "Vous savez qu'il faut structurer mais personne n'a le temps",
];

const whatYouGet = [
  { title: "Un ops dédié, pas un consultant", desc: "Il connaît vos deals, vos reps, vos process. Il est dans votre Slack, pas dans un slide deck.", color: "#4B5EFC" },
  { title: "Exécution, pas conseil", desc: "On ne vous dit pas quoi faire. On le fait. Chaque semaine, des livrables concrets dans vos outils.", color: "#FF7A59" },
  { title: "L'IA deployée pour vous", desc: "Agents Claude connectés à votre CRM via MCP. Qualification, résumés, enrichissement, scoring.", color: "#6D00CC" },
  { title: "Une équipe derrière", desc: "Votre ops est backed par +10 experts (IA, CRM, data). Pas un freelance seul sur son île.", color: "#22C55E" },
];

const monthly = [
  { title: "Gestion CRM", desc: "Maintenance, data quality, vues, rapports, support users", color: "#FF7A59" },
  { title: "Automatisation", desc: "Nouveaux workflows chaque semaine, tâches manuelles éliminées", color: "#4B5EFC" },
  { title: "Déploiement IA", desc: "Agents Claude, serveur MCP, enrichissement, scoring", color: "#6D00CC" },
  { title: "Roadmap RevOps", desc: "Plan trimestriel aligné sur vos objectifs revenue", color: "#6C5CE7" },
  { title: "Alignement équipes", desc: "SLA, définition MQL/SQL, lead routing, handoff documentés", color: "#D4A27F" },
  { title: "Reporting", desc: "Dashboards, forecasts, weekly review automatisé", color: "#22C55E" },
];

const timeline = [
  { num: "S1", title: "Audit flash & quick wins", desc: "On prend en main votre stack. Premiers résultats visibles." },
  { num: "M1", title: "Fondations posées", desc: "Pipeline restructuré, premiers workflows, dashboards clés." },
  { num: "M3", title: "Machine en place", desc: "Automatisations avancées, agents IA déployés, équipes formées." },
  { num: "M6+", title: "Optimisation continue", desc: "Itérations, nouvelles intégrations, scaling des process." },
];

const faqItems = [
  { q: "Combien de jours par mois ?", a: "De 2 à 5 jours par semaine selon vos besoins. On cadre le bon volume ensemble." },
  { q: "C'est toujours la même personne ?", a: "Oui. Un ops dédié qui connaît votre stack, vos process et vos équipes. Pas de rotation." },
  { q: "On peut arrêter quand on veut ?", a: "Oui. Préavis de 30 jours, c'est tout. Pas d'engagement long terme." },
  { q: "Différence avec un freelance ?", a: "Un freelance est seul. Votre ops Ceres est backed par une équipe de +10 experts. Plus de profondeur, plus de fiabilité." },
  { q: "Comment ça se passe au quotidien ?", a: "Channel Slack dédié pour le day-to-day. Call hebdo de 30 min pour prioriser. Review mensuelle pour ajuster la roadmap." },
  { q: "Vous travaillez dans nos outils ?", a: "Oui. On travaille directement dans votre HubSpot, votre Slack, votre Notion. Comme un membre de votre équipe." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service", name: "RevOps Part-Time", provider: { "@type": "Organization", name: "Ceres" }, description: "Un expert RevOps & IA dédié chaque mois, intégré à votre équipe.", serviceType: "Revenue Operations Outsourcing" },
    { "@type": "FAQPage", mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ],
};

export default function RevOpsPartTimePage() {
  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "20%", width: 320, height: 320, borderRadius: "50%", background: "#4B5EFC", opacity: 0.16, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "40%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.16, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "65%", width: 280, height: 280, borderRadius: "50%", background: "#6D00CC", opacity: 0.15, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "75%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.15, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "45%", width: 320, height: 320, borderRadius: "50%", background: "#D4A27F", opacity: 0.15, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "88%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.14, filter: "blur(70px)" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative z-10 max-w-[900px] mx-auto px-6">

        {/* Hero */}
        <section className="text-center mb-20">
          <div className="mb-4"><Badge>Offre phare</Badge></div>
          <h1 className="text-[36px] sm:text-[48px] font-semibold text-[#111] leading-[1.1] tracking-[-0.03em] mb-5">RevOps Part-Time</h1>
          <p className="text-[17px] text-[#666] max-w-[520px] mx-auto leading-[1.7] mb-8">
            Votre Head of RevOps & IA, sans le recrutement. Intégré à votre équipe, dès le mois prochain.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-[#EAEAEA] bg-white text-[13px] text-[#111] font-medium hover:border-[#CCC] hover:shadow-sm transition-all">
            <span className="w-2 h-2 rounded-sm bg-[#4B5EFC]" />
            Discuter de mon besoin
          </a>
        </section>
        <Connector />

        {/* Pain — why you need this */}
        <section className="">
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="mb-6">
              <div className="mb-4"><Badge>Le problème</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Vous vous reconnaissez ?</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {painPoints.map((p) => (
                <div key={p} className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#FAFAFA]">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#EF4444]"><path d="M8 3v6M8 11.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  <span className="text-[12px] text-[#555] leading-[1.5]">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* Comparator — visual gauges */}
        <section className="">
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="text-center mb-8">
              <div className="mb-4"><Badge>Comparatif</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Recruter vs Externaliser</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 justify-center">
              <div className="flex flex-col items-center">
                <svg width="130" height="130" viewBox="0 0 130 130">
                  <circle cx="65" cy="65" r="52" fill="none" stroke="#F0F0F0" strokeWidth="8" />
                  <circle cx="65" cy="65" r="52" fill="none" stroke="#EF4444" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`} strokeDashoffset={`${2 * Math.PI * 52 * 0.65}`}
                    transform="rotate(-90 65 65)" opacity="0.25" />
                  <text x="65" y="60" textAnchor="middle" fontSize="26" fontWeight="700" fill="#CCC" fontFamily="Inter, system-ui, sans-serif">35</text>
                  <text x="65" y="78" textAnchor="middle" fontSize="9" fill="#DDD" fontFamily="Inter, system-ui, sans-serif">/100</text>
                </svg>
                <span className="text-[13px] font-semibold text-[#CCC] mt-3">Recrutement</span>
                <div className="mt-4 space-y-2">
                  {["80K€/an chargé", "3-6 mois de ramp-up", "Risque de turnover", "Vision interne uniquement"].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-[11px] text-[#BBB]">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-[16px] font-bold text-[#F0F0F0]">VS</div>

              <div className="flex flex-col items-center">
                <svg width="130" height="130" viewBox="0 0 130 130">
                  <circle cx="65" cy="65" r="52" fill="none" stroke="#F0F0F0" strokeWidth="8" />
                  <circle cx="65" cy="65" r="52" fill="none" stroke="#4B5EFC" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`} strokeDashoffset={`${2 * Math.PI * 52 * 0.08}`}
                    transform="rotate(-90 65 65)" />
                  <text x="65" y="60" textAnchor="middle" fontSize="26" fontWeight="700" fill="#111" fontFamily="Inter, system-ui, sans-serif">92</text>
                  <text x="65" y="78" textAnchor="middle" fontSize="9" fill="#999" fontFamily="Inter, system-ui, sans-serif">/100</text>
                </svg>
                <span className="text-[13px] font-semibold text-[#4B5EFC] mt-3">Ceres Part-Time</span>
                <div className="mt-4 space-y-2">
                  {["Fraction du coût", "Opérationnel semaine 1", "Continuité garantie", "+250 clients, best practices"].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-[11px] text-[#555] font-medium">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#22C55E]"><path d="M2 5L4 7L8 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Connector />

        {/* Value prop — 4 key differentiators */}
        <section className="">
          <div className="text-center mb-10">
            <div className="mb-4"><Badge>La différence</Badge></div>
            <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#111] tracking-[-0.02em]">Ce qui change tout</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whatYouGet.map((item) => (
              <div key={item.title} className="rounded-lg border border-[#EAEAEA] bg-white p-6 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <h3 className="text-[15px] font-semibold text-[#111]">{item.title}</h3>
                </div>
                <p className="text-[12px] text-[#777] leading-[1.65]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <Connector />

        {/* What's included monthly */}
        <section className="">
          <div className="rounded-lg bg-[#111] p-6 md:p-10">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Chaque mois</span>
              <h2 className="text-[24px] sm:text-[30px] font-semibold text-white tracking-[-0.02em] mb-2">Ce que fait votre ops</h2>
              <p className="text-[13px] text-white/40">6 domaines couverts en continu.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {monthly.map((item) => (
                <div key={item.title} className="rounded-lg bg-white/5 border border-white/10 p-5">
                  <div className="w-3 h-3 rounded-sm mb-3" style={{ backgroundColor: item.color }} />
                  <h3 className="text-[13px] font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="text-[11px] text-white/40 leading-[1.6]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* Timeline — what happens over time */}
        <section className="">
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="mb-6">
              <div className="mb-4"><Badge>Timeline</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Ce qui se passe concrètement</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeline.map((s, i) => (
                <div key={s.num} className="relative rounded-lg border border-[#F2F2F2] p-4">
                  <span className="text-[18px] font-bold text-[#4B5EFC]">{s.num}</span>
                  <h3 className="text-[13px] font-semibold text-[#111] mt-2 mb-1">{s.title}</h3>
                  <p className="text-[11px] text-[#777] leading-[1.5]">{s.desc}</p>
                  {i < 3 && <div className="hidden md:block absolute -right-[9px] top-1/2 -translate-y-1/2 z-10 text-[#DDD]"><svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 1L6 4L2 7" fill="currentColor" /></svg></div>}
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* Results */}
        <section className="">
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="text-center mb-8">
              <div className="mb-4"><Badge>Résultats types</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Ce que nos clients obtiennent</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "92%", label: "Data quality CRM", color: "#FF7A59" },
                { value: "-3h", label: "Reporting / semaine", color: "#4B5EFC" },
                { value: "+40%", label: "Leads traités dans l'heure", color: "#6D00CC" },
                { value: "3 sem", label: "Ramp-up nouveaux reps", color: "#22C55E" },
              ].map((s) => (
                <div key={s.label} className="text-center p-4 rounded-lg bg-[#FAFAFA]">
                  <div className="text-[24px] font-bold tracking-[-0.02em] mb-1" style={{ color: s.color }}>{s.value}</div>
                  <p className="text-[11px] text-[#999]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* FAQ */}
        <section className="">
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="mb-8"><div className="mb-4"><Badge>FAQ</Badge></div><h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Questions fréquentes</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {faqItems.map((f, i) => (<div key={i} className="border-b border-[#F2F2F2] py-4"><h3 className="text-[13px] font-semibold text-[#111] mb-1.5">{f.q}</h3><p className="text-[12px] text-[#777] leading-[1.6]">{f.a}</p></div>))}
            </div>
          </div>
        </section>
        <Connector />

        {/* CTA */}
        <section id="contact">
          <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-8 md:p-12 text-center">
            <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Un ops dédié, dès le mois prochain ?</h2>
            <p className="text-[14px] text-[#999] mb-6 max-w-[420px] mx-auto">30 minutes pour cadrer vos besoins. On vous propose le bon format et le bon volume.</p>
            <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
              <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Réserver un appel
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
