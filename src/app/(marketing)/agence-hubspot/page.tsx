import Connector from "@/components/marketing/Connector";
import type { Metadata } from "next";
import Badge from "@/components/marketing/Badge";

export const metadata: Metadata = {
  title: "Agence HubSpot — Setup, Migration & Optimisation | Ceres",
  description: "Agence HubSpot spécialisée RevOps & IA en France. Configuration, migration Salesforce, optimisation, administration récurrente. Sales Hub, Marketing Hub, Service Hub, Operations Hub.",
  keywords: ["agence hubspot","agence hubspot france","partenaire hubspot","intégration hubspot","migration hubspot","migration salesforce hubspot","configuration hubspot","hubspot sales hub","hubspot marketing hub","consultant hubspot","optimisation hubspot","hubspot crm","hubspot vs salesforce","admin hubspot externalisé"],
};

const crmProblems = [
  "Votre CRM est un tableur géant que personne ne remplit correctement",
  "Sales, Marketing et CS utilisent 3 outils différents qui ne communiquent pas",
  "Vous avez Salesforce mais c'est devenu trop complexe et trop cher",
  "Votre HubSpot est configuré depuis 3 ans et personne n'a touché aux workflows",
  "Chaque équipe a sa propre source de vérité, les chiffres ne matchent jamais",
  "Vous envisagez un CRM mais vous ne savez pas par où commencer",
];

const whyHubSpot = [
  { title: "Une plateforme, pas 8 outils", desc: "Sales, Marketing, CS, Ops dans le même outil. Fini les silos. Tout le monde travaille sur la même donnée.", color: "#FF7A59" },
  { title: "Adoption immédiate", desc: "L'interface la plus intuitive du marché. Vos commerciaux l'utilisent vraiment, pas comme Salesforce où l'adoption tourne à 40%.", color: "#4B5EFC" },
  { title: "IA native intégrée", desc: "HubSpot intègre l'IA dans chaque Hub : rédaction d'emails, scoring prédictif, résumés de conversations, forecasting.", color: "#6D00CC" },
  { title: "Coût maîtrisé", desc: "Pas de consultants à 2 000€/jour pour chaque modification. HubSpot se configure sans code et évolue avec vous.", color: "#22C55E" },
  { title: "Écosystème ouvert", desc: "1 500+ intégrations natives. Make, Slack, Clay, Lemlist, Claap, Notion. Tout se connecte.", color: "#6C5CE7" },
  { title: "RevOps-ready", desc: "Le seul CRM pensé pour aligner Marketing, Sales et CS nativement. Lifecycle stages, SLA, attribution, reporting cross-équipes.", color: "#D4A27F" },
];

const hubs = [
  { title: "Sales Hub", desc: "Pipeline visuel, séquences de prospection, playbooks, devis, forecasting.", color: "#FF7A59", features: ["Pipeline deals sur-mesure","Séquences email & calls","Playbooks par étape","Forecasting & quotas","Devis et e-signatures"] },
  { title: "Marketing Hub", desc: "Emails, landing pages, workflows, segmentation, attribution multi-touch.", color: "#FF5C35", features: ["Workflows de nurturing","Segmentation comportementale","Landing pages & CTAs","Attribution multi-touch","Social & ads"] },
  { title: "Service Hub", desc: "Tickets, knowledge base, enquêtes NPS, SLA automatisés, portail client.", color: "#00BDA5", features: ["Système de tickets","Knowledge base","Enquêtes NPS & CSAT","SLA & escalation","Portail client"] },
  { title: "Operations Hub", desc: "Sync bidirectionnelle, data quality automatisée, custom coded actions.", color: "#6C5CE7", features: ["Sync bi-directionnelle","Data quality automation","Custom coded workflows","Datasets & reporting","Webhooks & API"] },
];

const interventions = [
  { title: "Implémentation de zéro", desc: "On configure HubSpot selon vos process, pas l'inverse.", items: ["Cadrage process avec vos équipes","Config pipelines, propriétés, vues","Workflows & automatisations","Intégrations stack","Formation utilisateurs"], color: "#FF7A59", duration: "3-4 sem" },
  { title: "Migration CRM", desc: "Vous quittez Salesforce ou Pipedrive. On migre tout proprement.", items: ["Audit existant & mapping","Migration contacts, entreprises, deals","Historique conservé","Reconstruction workflows","Double-run sécurisé"], color: "#4B5EFC", duration: "4-8 sem" },
  { title: "Connexion Salesforce + HubSpot", desc: "Salesforce pour Sales, HubSpot pour Marketing. On connecte les deux.", items: ["Mapping objets cross-CRM","Sync bi-directionnelle","Déduplication","Reporting unifié","Documentation"], color: "#6C5CE7", duration: "3-6 sem" },
  { title: "Audit & Optimisation", desc: "HubSpot mal configuré ou sous-exploité. On restructure.", items: ["Audit complet instance","Nettoyage données","Refonte workflows","Nouveaux dashboards","Quick wins immédiats"], color: "#D4A27F", duration: "2-3 sem" },
  { title: "Administration récurrente", desc: "On gère votre HubSpot au quotidien comme votre équipe.", items: ["Support users quotidien","Vues & rapports","Maintenance workflows","Évolutions continues","Slack dédié"], color: "#22C55E", duration: "Mensuel" },
];

const results = [
  { before: "CRM vide ou mal rempli", after: "Adoption 95%+", metric: "95%" },
  { before: "0 workflow actif", after: "30+ automatisations", metric: "30+" },
  { before: "Migration redoutée", after: "100% données migrées", metric: "100%" },
  { before: "Aucun reporting fiable", after: "Dashboards weekly", metric: "Weekly" },
  { before: "3 outils déconnectés", after: "Stack unifiée", metric: "1 outil" },
  { before: "Salesforce 2K€/user/an", after: "Fraction du coût", metric: "-60%" },
];

const faqItems = [
  { q: "Vous êtes partenaire officiel HubSpot ?", a: "On travaille avec HubSpot depuis 2019. +100 instances déployées. On connaît le produit en profondeur, des fonctionnalités de base aux custom coded actions." },
  { q: "Combien coûte une intégration HubSpot ?", a: "Au forfait, après cadrage. Dépend du nombre de Hubs, volume de données, intégrations tierces. L'appel de cadrage est gratuit." },
  { q: "On a Salesforce, on peut migrer ?", a: "Oui. On gère le mapping, la migration, la reconstruction des workflows et la formation. Période de double-run incluse." },
  { q: "On peut garder Salesforce ET HubSpot ?", a: "Absolument. Salesforce côté Sales, HubSpot côté Marketing. On configure la sync bi-directionnelle." },
  { q: "Notre HubSpot est mal configuré, vous reprenez ?", a: "C'est notre cas le plus fréquent. Audit, restructuration, nettoyage sans perdre vos données." },
  { q: "Vous formez nos équipes ?", a: "Oui, chaque mission inclut de la formation adaptée à VOS process, pas un tuto générique." },
  { q: "Et l'IA dans HubSpot ?", a: "HubSpot intègre Breeze (IA native) mais on va plus loin en connectant Claude via MCP pour du scoring et des résumés custom." },
];

const jsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "Service", name: "Agence HubSpot", provider: { "@type": "Organization", name: "Ceres" }, description: "Agence HubSpot spécialisée RevOps & IA. Configuration, migration, optimisation.", serviceType: "HubSpot Consulting" },
  { "@type": "FAQPage", mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
]};

export default function AgenceHubSpotPage() {
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

        <section className="text-center mb-20">
          <div className="mb-4"><Badge>Service</Badge></div>
          <h1 className="text-[36px] sm:text-[48px] font-semibold text-[#111] leading-[1.1] tracking-[-0.03em] mb-5">Agence HubSpot</h1>
          <p className="text-[17px] text-[#666] max-w-[540px] mx-auto leading-[1.7] mb-4">On configure, migre et optimise votre HubSpot. Le CRM qui aligne enfin Marketing, Sales et CS sur la même plateforme.</p>
          <div className="flex items-center justify-center gap-2 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=64" alt="HubSpot" width={22} height={22} className="rounded-sm" />
            <span className="text-[13px] text-[#999]">Partenaire certifié HubSpot · +100 instances déployées</span>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-[#E5E5E5] bg-white text-[13px] text-[#111] font-medium hover:border-[#CCC] hover:shadow-sm transition-all">
            <span className="w-2 h-2 rounded-sm bg-[#FF7A59]" />Discuter de mon projet
          </a>
        </section>
        <Connector />

        {/* Why HubSpot */}
        <section>
          <div className="text-center mb-10">
            <div className="mb-4"><Badge>Pourquoi HubSpot</Badge></div>
            <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#111] tracking-[-0.02em] mb-2">Le CRM pensé pour le RevOps</h2>
            <p className="text-[13px] text-[#999] max-w-[480px] mx-auto">Salesforce est puissant. HubSpot est puissant ET utilisable.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {whyHubSpot.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#E8E8E8] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <h3 className="text-[14px] font-semibold text-[#111]">{item.title}</h3>
                </div>
                <p className="text-[12px] text-[#777] leading-[1.65]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <Connector />

        <section><div className="text-center mb-10"><div className="mb-4"><Badge>Les 4 Hubs</Badge></div><h2 className="text-[24px] sm:text-[30px] font-semibold text-[#111] tracking-[-0.02em]">Tout dans une seule plateforme</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{hubs.map((h) => (<div key={h.title} className="rounded-2xl border border-[#E8E8E8] bg-white p-6 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]"><div className="flex items-center gap-2.5 mb-3"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: h.color }} /><h3 className="text-[15px] font-semibold text-[#111]">{h.title}</h3></div><p className="text-[12px] text-[#777] leading-[1.65] mb-4">{h.desc}</p><ul className="space-y-1.5">{h.features.map((f) => (<li key={f} className="flex items-center gap-2 text-[11px] text-[#666]"><svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{f}</li>))}</ul></div>))}</div>
        </section>
        <Connector />

        <section><div className="rounded-2xl bg-[#111] p-6 md:p-10">
          <div className="mb-8"><span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Nos interventions</span><h2 className="text-[24px] sm:text-[30px] font-semibold text-white tracking-[-0.02em] mb-2">5 façons d&apos;intervenir</h2><p className="text-[13px] text-white/40">De l&apos;implémentation from scratch à l&apos;admin quotidienne.</p></div>
          <div className="space-y-3">{interventions.map((item) => (<div key={item.title} className="rounded-xl bg-white/5 border border-white/10 p-5"><div className="flex items-center gap-2.5 mb-2"><div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} /><h3 className="text-[14px] font-semibold text-white">{item.title}</h3><span className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: item.color + "20", color: item.color }}>{item.duration}</span></div><p className="text-[12px] text-white/40 leading-[1.6] mb-3">{item.desc}</p><ul className="space-y-1.5">{item.items.map((i) => (<li key={i} className="flex items-center gap-2 text-[11px] text-white/30"><svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 text-white/20"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{i}</li>))}</ul></div>))}</div>
        </div></section>
        <Connector />

        <section><div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
          <div className="text-center mb-8"><div className="mb-4"><Badge>Résultats</Badge></div><h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Avant / Après</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{results.map((r) => (<div key={r.before} className="flex items-center gap-3 rounded-xl border border-[#F2F2F2] p-4"><div className="flex-1"><p className="text-[11px] text-[#999] line-through mb-1">{r.before}</p><p className="text-[12px] font-semibold text-[#111]">{r.after}</p></div><span className="text-[13px] font-bold text-[#22C55E] shrink-0">{r.metric}</span></div>))}</div>
        </div></section>
        <Connector />

        <section><div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
          <div className="mb-8"><div className="mb-4"><Badge>FAQ</Badge></div><h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Questions fréquentes</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">{faqItems.map((f, i) => (<div key={i} className="border-b border-[#F2F2F2] py-4"><h3 className="text-[13px] font-semibold text-[#111] mb-1.5">{f.q}</h3><p className="text-[12px] text-[#777] leading-[1.6]">{f.a}</p></div>))}</div>
        </div></section>
        <Connector />

        <section id="contact"><div className="rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-8 md:p-12 text-center">
          <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Un projet HubSpot ?</h2>
          <p className="text-[14px] text-[#999] mb-6 max-w-[420px] mx-auto">Config, migration, optimisation ou admin. On cadre ça en 30 min.</p>
          <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors"><span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Réserver un appel</a>
        </div></section>
      </div>
    </div>
  );
}
