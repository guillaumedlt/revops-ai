import Connector from "@/components/marketing/Connector";
import type { Metadata } from "next";
import Badge from "@/components/marketing/Badge";

export const metadata: Metadata = {
  title: "Agents IA — Claude, MCP & Automatisation commerciale | Ceres",
  description:
    "On déploie des agents IA connectés à votre CRM via le protocole MCP. Qualification de leads, résumés de calls, enrichissement, scoring prédictif. Claude et Claude Code intégrés dans votre stack RevOps.",
  keywords: [
    "agents ia commerciaux", "ia commerciale", "claude ai crm",
    "mcp server hubspot", "automatisation ia ventes", "scoring ia",
    "qualification leads ia", "résumé calls ia", "enrichissement ia",
    "claude code", "model context protocol", "ia revops",
    "anthropic claude", "claude code api",
  ],
};

const problems = [
  "Vos commerciaux passent 30% de leur temps sur des tâches qui ne génèrent aucun revenu",
  "Personne n'exploite les centaines d'heures de calls enregistrés",
  "L'enrichissement de leads est manuel, lent et incomplet",
  "Vous n'avez aucun modèle de scoring, chaque lead est traité de la même façon",
  "Vos meilleurs reps ont des techniques qu'on pourrait répliquer, mais personne ne le fait",
  "Vous avez testé ChatGPT mais ça reste un gadget, pas un outil opérationnel",
];

const agents = [
  { title: "Qualification de leads", desc: "Claude analyse chaque lead entrant en temps réel : source, comportement, données firmographiques. Score attribué automatiquement. Les leads chauds sont routés à vos reps en moins d'une minute.", color: "#FF7A59", tools: ["claude.ai", "hubspot.com", "clay.com"], result: "+40% de leads traités dans l'heure" },
  { title: "Résumés de calls", desc: "Après chaque appel, l'agent analyse l'enregistrement Claap. Il génère un résumé structuré (contexte, objections, next steps, signaux d'achat) et l'injecte dans le deal HubSpot. Vos reps closent au lieu de rédiger.", color: "#4B5EFC", tools: ["claude.ai", "claap.io", "hubspot.com"], result: "15 min économisées par call" },
  { title: "Enrichissement automatique", desc: "Chaque nouveau contact est enrichi en 3 secondes : taille entreprise, secteur, technos utilisées, funding, décideurs. Clay agrège 50+ sources, Claude structure et qualifie. Fini les 30 min de recherche LinkedIn.", color: "#6C5CE7", tools: ["claude.ai", "clay.com", "hubspot.com"], result: "3 sec au lieu de 30 min" },
  { title: "Scoring prédictif", desc: "Claude analyse vos 12 derniers mois de deals gagnés et perdus. Il identifie les patterns invisibles à l'oeil nu et score chaque nouvelle opportunité. Vous savez exactement quels deals prioriser.", color: "#6D00CC", tools: ["claude.ai", "hubspot.com"], result: "+25% de win rate" },
  { title: "Analyse win/loss", desc: "Pourquoi vous gagnez certains deals et pas d'autres ? L'agent croise calls, emails, notes et propriétés CRM pour extraire les patterns. Il génère un playbook actualisé chaque mois.", color: "#D4A27F", tools: ["claude.ai", "hubspot.com", "claap.io"], result: "Patterns identifiés sur 12 mois" },
  { title: "Playbooks & onboarding IA", desc: "Les techniques de vos meilleurs reps sont codifiées par Claude en playbooks interactifs. Chaque nouveau commercial a un copilote IA dès le premier jour. Ramp-up divisé par 4.", color: "#22C55E", tools: ["claude.ai", "notion.so", "hubspot.com"], result: "Ramp-up de 3 mois à 3 semaines" },
];

const claudeAdvantages = [
  { title: "Claude, pas ChatGPT", desc: "Claude (Anthropic) est le LLM le plus fiable pour les tâches business : raisonnement structuré, respect des consignes, moins d'hallucinations. C'est notre choix depuis le jour 1.", color: "#D4A27F" },
  { title: "Claude Code pour le build", desc: "On utilise Claude Code en interne pour développer vos outils sur-mesure 10x plus vite : dashboards, API, intégrations, scripts d'automatisation. Ce qui prenait 2 semaines prend 2 jours.", color: "#6D00CC" },
  { title: "MCP : le pont vers vos outils", desc: "Le Model Context Protocol (créé par Anthropic) connecte Claude directement à votre CRM, Slack, bases de données. Pas de copier-coller, pas d'export CSV. L'IA agit dans vos outils.", color: "#4B5EFC" },
  { title: "Sécurité et contrôle", desc: "Les agents n'accèdent qu'aux données autorisées. Le serveur MCP est déployé dans votre infra ou sur un cloud dédié. Rien ne sort de votre périmètre. Vous gardez le contrôle.", color: "#22C55E" },
];

const stack = [
  { label: "Claude", desc: "Le LLM qui raisonne. Anthropic.", domain: "claude.ai" },
  { label: "Claude Code", desc: "Dev tools sur-mesure 10x plus vite.", domain: "claude.ai" },
  { label: "HubSpot", desc: "Votre CRM. Lecture et écriture temps réel.", domain: "hubspot.com" },
  { label: "Claap", desc: "Calls commerciaux. Transcriptions auto.", domain: "claap.io" },
  { label: "Clay", desc: "Enrichissement. 50+ sources agrégées.", domain: "clay.com" },
  { label: "Make / n8n", desc: "Orchestration des workflows.", domain: "make.com" },
];

const timeline = [
  { num: "S1", title: "Audit & use cases", desc: "On identifie vos 3 use cases IA les plus impactants. Quick wins priorisés." },
  { num: "S2", title: "Setup MCP", desc: "Serveur MCP déployé. Claude connecté à votre CRM et vos outils." },
  { num: "S3", title: "Premier agent en prod", desc: "Votre premier agent tourne en conditions réelles. Résultats mesurés." },
  { num: "M2+", title: "Scale & itération", desc: "Nouveaux agents déployés. Optimisation continue. Formation équipes." },
];

const faqItems = [
  { q: "C'est quoi un agent IA concrètement ?", a: "Un programme qui utilise Claude pour exécuter une tâche automatiquement : lire des données dans votre CRM, les analyser, prendre une décision et écrire le résultat. Pas un chatbot. Un assistant qui agit." },
  { q: "Pourquoi Claude et pas GPT ?", a: "Claude est meilleur sur les tâches business structurées : moins d'hallucinations, meilleur suivi des consignes, raisonnement plus fiable. Et le protocole MCP (créé par Anthropic) permet une connexion native avec vos outils." },
  { q: "C'est quoi MCP ?", a: "Model Context Protocol. Le standard d'Anthropic pour connecter Claude à des outils externes (CRM, bases de données, APIs). On met en place un serveur MCP qui donne à Claude un accès sécurisé à votre stack." },
  { q: "C'est quoi Claude Code ?", a: "L'outil de développement d'Anthropic qui permet de coder assisté par Claude. On l'utilise pour construire vos dashboards, intégrations et outils internes beaucoup plus rapidement." },
  { q: "C'est sécurisé ?", a: "Oui. Les agents n'ont accès qu'aux données autorisées. Serveur MCP déployé dans votre infra ou cloud dédié. Rien ne sort de votre périmètre." },
  { q: "Combien de temps pour déployer ?", a: "Premier agent simple (résumés, enrichissement) : 1-2 semaines. Agent complexe (scoring, qualification multi-critères) : 2-3 semaines. Serveur MCP inclus." },
  { q: "On a besoin de compétences tech en interne ?", a: "Non. On déploie, configure et maintient. Votre équipe utilise les résultats directement dans les outils qu'elle connaît déjà." },
  { q: "Ça marche avec Salesforce ?", a: "Oui. MCP est agnostique. On connecte Claude à HubSpot, Salesforce, Slack, Notion, et n'importe quel outil avec une API." },
];

const jsonLd = { "@context": "https://schema.org", "@graph": [
  { "@type": "Service", name: "Agents IA pour RevOps", provider: { "@type": "Organization", name: "Ceres" }, description: "Déploiement d'agents IA connectés au CRM via MCP. Claude et Claude Code.", serviceType: "AI Agent Deployment" },
  { "@type": "FAQPage", mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
]};

export default function AgentsIAPage() {
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
          <h1 className="text-[36px] sm:text-[48px] font-semibold text-[#111] leading-[1.1] tracking-[-0.03em] mb-5">Agents IA</h1>
          <p className="text-[17px] text-[#666] max-w-[540px] mx-auto leading-[1.7] mb-4">
            On connecte Claude à votre stack commerciale. Vos process sont augmentés par l&apos;IA, vos équipes se concentrent sur ce qui génère du revenu.
          </p>
          <div className="flex items-center justify-center gap-3 mb-8">
            {["claude.ai", "hubspot.com", "claap.io", "clay.com", "make.com"].map((d) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={d} src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`} alt="" width={20} height={20} className="rounded-sm" loading="lazy" />
            ))}
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-[#EAEAEA] bg-white text-[13px] text-[#111] font-medium hover:border-[#CCC] hover:shadow-sm transition-all">
            <span className="w-2 h-2 rounded-sm bg-[#6D00CC]" />Déployer des agents IA
          </a>
        </section>
        <Connector />

        {/* Problems */}
        <section>
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="mb-8">
              <div className="mb-4"><Badge>Le problème</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Vos équipes font le travail que l&apos;IA devrait faire</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {problems.map((p) => (
                <div key={p} className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#FAFAFA]">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#EF4444]"><path d="M8 3v6M8 11.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  <span className="text-[12px] text-[#555] leading-[1.5]">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* Why Claude */}
        <section>
          <div className="text-center mb-10">
            <div className="mb-4"><Badge>Pourquoi Claude</Badge></div>
            <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#111] tracking-[-0.02em] mb-2">Notre avantage technologique</h2>
            <p className="text-[13px] text-[#999] max-w-[480px] mx-auto">On ne fait pas du &ldquo;ChatGPT pour les ventes&rdquo;. On déploie une infra IA professionnelle avec Claude, MCP et Claude Code.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {claudeAdvantages.map((item) => (
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

        {/* Architecture — clean schematic */}
        <section>
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="text-center mb-8">
              <div className="mb-4"><Badge>Architecture</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Comment ça fonctionne</h2>
            </div>
            <div className="grid grid-cols-4 gap-3 items-center">
              {[
                { label: "Vos outils", sub: "CRM, Calls, Chat", color: "#FF7A59" },
                { label: "Serveur MCP", sub: "Pont sécurisé", color: "#4B5EFC" },
                { label: "Claude", sub: "Raisonne & agit", color: "#6D00CC" },
                { label: "Résultat", sub: "Dans vos outils", color: "#22C55E" },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="rounded-lg border border-[#F2F2F2] p-4 flex-1 text-center">
                    <div className="w-3 h-3 rounded-sm mx-auto mb-2" style={{ backgroundColor: step.color }} />
                    <h3 className="text-[12px] font-semibold text-[#111] mb-0.5">{step.label}</h3>
                    <p className="text-[10px] text-[#999]">{step.sub}</p>
                  </div>
                  {i < 3 && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[#DDD] hidden sm:block"><path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* Agents catalog */}
        <section>
          <div className="text-center mb-10">
            <div className="mb-4"><Badge>6 agents</Badge></div>
            <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#111] tracking-[-0.02em] mb-2">Ce qu&apos;on déploie pour vous</h2>
            <p className="text-[13px] text-[#999] max-w-[440px] mx-auto">Chaque agent est connecté à vos outils et agit en temps réel. Résultats concrets, mesurables.</p>
          </div>
          <div className="space-y-3">
            {agents.map((a) => (
              <article key={a.title} className="rounded-lg border border-[#EAEAEA] bg-white p-6 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: a.color }} />
                      <h3 className="text-[15px] font-semibold text-[#111]">{a.title}</h3>
                    </div>
                    <p className="text-[12px] text-[#777] leading-[1.65] mb-3">{a.desc}</p>
                    <div className="flex items-center gap-1.5">
                      {a.tools.map((d, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={`${d}-${i}`} src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`} alt="" width={14} height={14} className="rounded-sm" loading="lazy" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-[#22C55E] bg-[#F0FDF4] px-2.5 py-1 rounded-md shrink-0">{a.result}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
        <Connector />

        {/* Tech stack */}
        <section>
          <div className="rounded-lg bg-[#111] p-6 md:p-10">
            <div className="mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Stack technique</span>
              <h2 className="text-[24px] sm:text-[30px] font-semibold text-white tracking-[-0.02em] mb-2">Les briques qu&apos;on utilise</h2>
              <p className="text-[13px] text-white/40">Claude + Claude Code + MCP + vos outils. Tout connecté.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {stack.map((s) => (
                <div key={s.label} className="rounded-lg bg-white/5 border border-white/10 p-4 flex items-start gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://www.google.com/s2/favicons?domain=${s.domain}&sz=64`} alt={s.label} width={18} height={18} className="rounded-sm mt-0.5 shrink-0" loading="lazy" />
                  <div>
                    <h3 className="text-[13px] font-semibold text-white mb-0.5">{s.label}</h3>
                    <p className="text-[11px] text-white/40 leading-[1.5]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* Timeline */}
        <section>
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="mb-8">
              <div className="mb-4"><Badge>Timeline</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Premier agent en prod en 3 semaines</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeline.map((s, i) => (
                <div key={s.num} className="relative rounded-lg border border-[#F2F2F2] p-4">
                  <span className="text-[18px] font-bold text-[#6D00CC]">{s.num}</span>
                  <h3 className="text-[13px] font-semibold text-[#111] mt-2 mb-1">{s.title}</h3>
                  <p className="text-[11px] text-[#777] leading-[1.5]">{s.desc}</p>
                  {i < 3 && <div className="hidden md:block absolute -right-[9px] top-1/2 -translate-y-1/2 z-10 text-[#DDD]"><svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M2 1L6 4L2 7" fill="currentColor" /></svg></div>}
                </div>
              ))}
            </div>
          </div>
        </section>
        <Connector />

        {/* FAQ */}
        <section>
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="mb-8">
              <div className="mb-4"><Badge>FAQ</Badge></div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em]">Questions fréquentes</h2>
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
            <h2 className="text-[24px] sm:text-[30px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Prêt à déployer l&apos;IA dans votre stack ?</h2>
            <p className="text-[14px] text-[#999] mb-6 max-w-[420px] mx-auto">On identifie vos 3 premiers use cases IA en 30 minutes. Gratuit, sans engagement.</p>
            <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
              <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Réserver un appel
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
