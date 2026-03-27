"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Guide IA pour Equipes Commerciales",
  description: "42 pages pour deployer l\u2019IA dans votre processus de vente B2B. Cas d\u2019usage, prompts, workflows et methode de deploiement progressive.",
  author: { "@type": "Organization", name: "Ceres" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://ceres-revops.fr" },
  numberOfPages: 42,
  inLanguage: "fr",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
};

const chapters = [
  { num: "01", title: "L\u2019IA commerciale en 2026", desc: "Etat des lieux, adoption, ce qui a change. Pourquoi les equipes qui n\u2019integrent pas l\u2019IA perdent en competitivite.", pages: "p. 4-8" },
  { num: "02", title: "Les 10 cas d\u2019usage a plus fort ROI", desc: "Enrichissement, scoring, emails, calls, win/loss, forecast, qualification, coaching, reporting, onboarding. Chacun avec impact mesure.", pages: "p. 9-18" },
  { num: "03", title: "Choisir votre LLM", desc: "Claude vs ChatGPT vs Gemini. Forces, faiblesses, pricing, cas d\u2019usage par modele. Notre matrice de decision.", pages: "p. 19-22" },
  { num: "04", title: "Enrichissement IA en pratique", desc: "Clay + Claude + Dropcontact. Comment enrichir 1 000 contacts en 30 minutes avec des donnees contextuelles.", pages: "p. 23-26" },
  { num: "05", title: "Emails personnalises par IA", desc: "Prompts, frameworks, A/B testing. Comment passer de 2% a 12% de taux de reponse avec la personnalisation IA.", pages: "p. 27-30" },
  { num: "06", title: "Resume de calls et intelligence", desc: "Claap, Modjo, Gong + Claude. Automatiser les comptes-rendus et extraire les insights commerciaux.", pages: "p. 31-33" },
  { num: "07", title: "Agents IA avec Make + Claude", desc: "Construire des agents autonomes : qualification, routing, enrichissement, alertes. 3 workflows prets a importer.", pages: "p. 34-37" },
  { num: "08", title: "Deploiement progressif en 3 phases", desc: "Phase 1 : quick wins (semaine 1-2). Phase 2 : automatisation (semaine 3-6). Phase 3 : agents autonomes (semaine 7-12).", pages: "p. 38-40" },
  { num: "09", title: "Mesurer le ROI de l\u2019IA", desc: "Les metriques a suivre, le calcul du temps gagne, l\u2019impact sur le pipeline et le revenue. Template de suivi inclus.", pages: "p. 41-42" },
];

const clients = [
  { name: "Iroko", domain: "iroko.eu" },
  { name: "Ringover", domain: "ringover.com" },
  { name: "TotalEnergies", domain: "totalenergies.com" },
  { name: "Dougs", domain: "dougs.fr" },
  { name: "Spendesk", domain: "spendesk.com" },
  { name: "Payfit", domain: "payfit.com" },
];

const tools = [
  { name: "Claude", domain: "claude.ai" },
  { name: "ChatGPT", domain: "chatgpt.com" },
  { name: "Clay", domain: "clay.com" },
  { name: "Make", domain: "make.com" },
  { name: "HubSpot", domain: "hubspot.com" },
  { name: "Claap", domain: "claap.io" },
  { name: "Lemlist", domain: "lemlist.com" },
  { name: "Notion", domain: "notion.so" },
];

export default function GuideIALandingPage() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((window as any).hbspt) {
      (window as any).hbspt.forms.create({
        portalId: "2703445",
        formId: "461a976f-66db-4946-9e3f-883c83d4a084",
        region: "na1",
        target: "#hs-guide-ia-form",
      });
      return;
    }
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      if ((window as any).hbspt) {
        (window as any).hbspt.forms.create({
          portalId: "2703445",
          formId: "461a976f-66db-4946-9e3f-883c83d4a084",
          region: "na1",
          target: "#hs-guide-ia-form",
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  function scrollToForm() {
    document.getElementById("telecharger")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      {/* Blobs */}
      <div className="hidden lg:block fixed pointer-events-none" style={{ left: "2%", top: "10%", width: 340, height: 340, borderRadius: "50%", background: "#6D00CC", opacity: 0.12, filter: "blur(70px)" }} />
      <div className="hidden lg:block fixed pointer-events-none" style={{ right: "3%", top: "25%", width: 300, height: 300, borderRadius: "50%", background: "#D4A27F", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block fixed pointer-events-none" style={{ left: "4%", top: "50%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block fixed pointer-events-none" style={{ right: "2%", top: "70%", width: 300, height: 300, borderRadius: "50%", background: "#6D00CC", opacity: 0.07, filter: "blur(70px)" }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative z-10 max-w-[900px] mx-auto px-6">

        {/* Hero */}
        <section className="text-center mb-16">
          <nav className="mb-6 flex items-center justify-center gap-2 text-[12px] text-[#999]">
            <Link href="/" className="hover:text-[#111] transition-colors">Accueil</Link><span>/</span>
            <Link href="/guides" className="hover:text-[#111] transition-colors">Guides</Link><span>/</span>
            <span className="text-[#666]">Guide IA Commercial</span>
          </nav>
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#6D00CC]/10 text-[12px] font-medium text-[#6D00CC]">Guide gratuit</span>
          </div>
          <h1 className="text-[36px] sm:text-[52px] font-semibold text-[#111] leading-[1.08] tracking-[-0.03em] mb-5">
            Guide IA pour Equipes Commerciales
          </h1>
          <p className="text-[18px] text-[#666] max-w-[560px] mx-auto leading-[1.7] mb-6">
            42 pages pour deployer l&apos;IA dans votre processus de vente B2B. Cas d&apos;usage concrets, 25 prompts prouves, 3 workflows Make prets a importer.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {[
              { value: "42", label: "pages" },
              { value: "25", label: "prompts inclus" },
              { value: "3", label: "workflows Make" },
              { value: "10", label: "cas d\u2019usage" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[24px] font-bold text-[#111]">{s.value}</div>
                <div className="text-[11px] text-[#999]">{s.label}</div>
              </div>
            ))}
          </div>

          <button onClick={scrollToForm} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6D00CC] text-white text-[14px] font-medium hover:bg-[#5B00AD] transition-colors shadow-[0_4px_12px_-4px_rgba(109,0,204,0.4)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 2v8M4 7l4 4 4-4M2 13h12" /></svg>
            Telecharger gratuitement
          </button>
          <p className="text-[11px] text-[#CCC] mt-3">Pas de spam. Juste le guide.</p>
        </section>

        {/* Book mockup + what you'll learn */}
        <section className="mb-16">
          <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 md:p-10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Book cover */}
              <div className="w-[200px] h-[260px] rounded-xl shadow-[8px_8px_30px_-10px_rgba(0,0,0,0.2)] shrink-0 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #6D00CC 0%, #8B5CF6 50%, #4C1D95 100%)" }}>
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <div>
                    <div className="w-8 h-0.5 bg-white/40 mb-3" />
                    <p className="text-white/60 text-[9px] font-medium uppercase tracking-wider">Ceres 2026</p>
                  </div>
                  <div>
                    <p className="text-white text-[15px] font-bold leading-[1.2] mb-1">Guide IA pour Equipes Commerciales</p>
                    <p className="text-white/60 text-[9px]">42 pages | 9 chapitres</p>
                  </div>
                </div>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-black/10" />
                {/* AI circuit decoration */}
                <div className="absolute top-12 right-4 opacity-20">
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="white" strokeWidth="1">
                    <circle cx="30" cy="30" r="8" /><circle cx="30" cy="30" r="20" /><path d="M30 10V2M30 58v-8M10 30H2M58 30h-8M16 16L10 10M50 50l-6-6M44 16l6-6M10 50l6-6" />
                  </svg>
                </div>
              </div>

              <div className="flex-1">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Ce que vous allez apprendre</p>
                <div className="space-y-2.5">
                  {[
                    "Identifier les 10 cas d\u2019usage IA a plus fort ROI pour votre equipe",
                    "Choisir entre Claude, ChatGPT et Gemini selon vos besoins",
                    "Enrichir 1 000 contacts en 30 min avec Clay + Claude",
                    "Rediger des emails qui obtiennent 12% de taux de reponse",
                    "Automatiser les resumes de calls et l\u2019intelligence commerciale",
                    "Construire des agents IA autonomes avec Make + Claude",
                    "Deployer l\u2019IA progressivement en 3 phases (12 semaines)",
                    "Mesurer le ROI reel de l\u2019IA sur votre pipeline",
                  ].map((item) => (
                    <p key={item} className="text-[13px] text-[#555] flex items-start gap-2.5 leading-[1.6]">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#6D00CC] shrink-0 mt-0.5"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools covered */}
        <section className="mb-16">
          <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider text-center mb-6">Les outils couverts dans le guide</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {tools.map((t) => (
              <div key={t.name} className="flex items-center gap-2 text-[#999]">
                <img src={`https://www.google.com/s2/favicons?domain=${t.domain}&sz=32`} alt={t.name} className="w-5 h-5" />
                <span className="text-[13px] font-medium">{t.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Clients */}
        <section className="mb-16">
          <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider text-center mb-6">Deploye chez</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {clients.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-[#999]">
                <img src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=32`} alt={c.name} className="w-5 h-5 grayscale opacity-60" />
                <span className="text-[13px] font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sommaire */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <Badge>Sommaire</Badge>
            <h2 className="text-[24px] sm:text-[32px] font-semibold text-[#111] tracking-[-0.02em] mt-4 mb-3">9 chapitres pour tout deployer</h2>
            <p className="text-[15px] text-[#666] max-w-[480px] mx-auto leading-[1.7]">De la decouverte des cas d&apos;usage au deploiement d&apos;agents IA autonomes. Progressif, actionnable, mesurable.</p>
          </div>
          <div className="space-y-3">
            {chapters.map((ch) => (
              <div key={ch.num} className="rounded-2xl border border-[#E8E8E8] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] hover:border-[#DDD] transition-colors">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#6D00CC]/10 flex items-center justify-center text-[#6D00CC] text-[13px] font-bold shrink-0">
                    {ch.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <h3 className="text-[14px] font-semibold text-[#111]">{ch.title}</h3>
                      <span className="text-[10px] text-[#CCC] shrink-0">{ch.pages}</span>
                    </div>
                    <p className="text-[12px] text-[#777] leading-[1.65]">{ch.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Templates inclus */}
        <section className="mb-16">
          <div className="rounded-2xl bg-[#111] p-6 md:p-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Inclus dans le guide</span>
            <h2 className="text-[20px] sm:text-[28px] font-semibold text-white tracking-[-0.02em] mb-6">Tout ce qui est inclus</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "25 prompts commerciaux prouves", desc: "Enrichissement, emails, analyse de deals, scoring, coaching. Testes sur nos campagnes clients.", color: "#6D00CC" },
                { title: "3 workflows Make prets a importer", desc: "Agent de qualification, agent d\u2019enrichissement, agent de resume de calls. JSON exportable.", color: "#4B5EFC" },
                { title: "Template de scoring IA", desc: "Grille de scoring predictif combinant regles et IA. Format Google Sheets.", color: "#22C55E" },
                { title: "Matrice de choix LLM", desc: "Claude vs ChatGPT vs Gemini : 12 criteres compares pour choisir le bon modele.", color: "#D4A27F" },
                { title: "Calculateur de ROI IA", desc: "Estimez le temps gagne et l\u2019impact revenue de l\u2019IA dans votre equipe. Sheets.", color: "#FF7A59" },
                { title: "Checklist de deploiement 3 phases", desc: "Quick wins, automatisation, agents autonomes. 12 semaines, etape par etape.", color: "#6C5CE7" },
                { title: "Bibliotheque de prompts par role", desc: "SDR, AE, CSM, RevOps Manager. Les prompts adaptes a chaque fonction.", color: "#6D00CC" },
              ].map((t) => (
                <div key={t.title} className="rounded-xl bg-white/5 p-4 flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-sm mt-1.5 shrink-0" style={{ background: t.color }} />
                  <div>
                    <p className="text-[12px] font-semibold text-white mb-0.5">{t.title}</p>
                    <p className="text-[10px] text-white/40 leading-[1.5]">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preview: prompt example */}
        <section className="mb-16">
          <div className="text-center mb-6">
            <Badge>Apercu</Badge>
            <h2 className="text-[20px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em] mt-4">Un exemple de prompt du guide</h2>
          </div>
          <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2 mb-4">
              <img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=32" alt="Claude" className="w-4 h-4" />
              <span className="text-[11px] font-semibold text-[#111]">Prompt #7 : Icebreaker personnalise</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#6D00CC]/10 text-[#6D00CC] font-medium">SDR</span>
            </div>
            <div className="rounded-xl bg-[#1a1a2e] p-4 mb-4">
              <pre className="text-[11px] text-[#E0E0E0] leading-[1.7] whitespace-pre-wrap font-mono">
{`Tu es un expert en prospection B2B. A partir du profil
LinkedIn suivant, genere un icebreaker de 1-2 phrases
maximum pour un cold email.

Regles :
- Reference un element SPECIFIQUE du profil (post recent,
  changement de poste, actualite de l'entreprise)
- Ton professionnel mais humain, pas de flatterie excessive
- Ne mentionne PAS que tu as "vu" leur profil LinkedIn
- Maximum 30 mots

Profil : {linkedin_summary}
Entreprise : {company_name}
Actualite recente : {recent_news}`}
              </pre>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[#999]">
              <span>Taux de reponse moyen : <strong className="text-[#22C55E]">11.2%</strong></span>
              <span>Teste sur <strong className="text-[#111]">2 400</strong> prospects</span>
            </div>
            <p className="mt-3 text-[11px] text-[#CCC]">24 autres prompts comme celui-ci dans le guide complet.</p>
          </div>
        </section>

        {/* Testimonial */}
        <section className="mb-16">
          <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <p className="text-[14px] text-[#555] leading-[1.75] mb-4">&ldquo;On a deploye les workflows Make + Claude du guide en 2 semaines. Les resumes de calls automatiques nous font gagner 45 minutes par jour par commercial. Le scoring IA a augmente notre taux de conversion SQL de 22%.&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#6D00CC]/10 flex items-center justify-center text-[#6D00CC] text-[10px] font-bold">LR</div>
              <div>
                <p className="text-[12px] font-semibold text-[#111]">Ludovic R.</p>
                <p className="text-[10px] text-[#999]">VP Sales, Ringover</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pour qui */}
        <section className="mb-16">
          <div className="text-center mb-6">
            <Badge>Pour qui</Badge>
            <h2 className="text-[20px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em] mt-4">Ce guide est fait pour vous si</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <p className="text-[12px] font-semibold text-[#22C55E] mb-3">Ideal pour</p>
              {[
                "Vous dirigez une equipe commerciale B2B (SDR, AE, CSM)",
                "Vous utilisez deja un CRM (HubSpot, Salesforce, Pipedrive)",
                "Vous voulez integrer l\u2019IA sans tout casser",
                "Vous cherchez des cas d\u2019usage concrets, pas de la theorie",
                "Vous voulez des prompts et workflows prets a l\u2019emploi",
                "Vous avez un budget IA de 0 a 500 euros par mois",
              ].map((i) => (
                <p key={i} className="text-[12px] text-[#555] mb-2 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
              ))}
            </div>
            <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <p className="text-[12px] font-semibold text-[#999] mb-3">Moins pertinent si</p>
              {[
                "Vous n\u2019avez pas encore de CRM en place",
                "Votre equipe fait moins de 3 personnes",
                "Vous cherchez un guide technique sur les API LLM",
                "Vous etes en B2C (le guide est 100% B2B)",
              ].map((i) => (
                <p key={i} className="text-[12px] text-[#999] mb-2 flex items-start gap-2"><span className="text-[#CCC] mt-0.5 shrink-0">-</span>{i}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Download form */}
        <section id="telecharger" className="mb-16 scroll-mt-24">
          <div className="rounded-2xl border-2 border-[#6D00CC]/20 bg-white p-6 md:p-10 shadow-[0_8px_30px_-10px_rgba(109,0,204,0.15)]">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#6D00CC]/10 text-[12px] font-medium text-[#6D00CC] mb-4">Gratuit</span>
                <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Telecharger le Guide IA Commercial</h2>
                <p className="text-[14px] text-[#666] leading-[1.7] mb-5">Remplissez le formulaire pour recevoir le guide complet par email. Acces instantane.</p>
                <div className="space-y-2.5 mb-6">
                  {[
                    "42 pages de methode + cas concrets",
                    "25 prompts commerciaux prouves",
                    "3 workflows Make prets a importer",
                    "Calculateur de ROI IA (Sheets)",
                    "Mises a jour gratuites",
                  ].map((item) => (
                    <p key={item} className="text-[13px] text-[#555] flex items-center gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#6D00CC] shrink-0"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {item}
                    </p>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-[11px] text-[#CCC]">
                  <span>Pas de spam</span>
                  <span>Desabonnement en 1 clic</span>
                  <span>RGPD compliant</span>
                </div>
              </div>

              <div className="lg:w-[380px] shrink-0">
                <div className="rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-5">
                  <p className="text-[12px] font-semibold text-[#111] mb-4">Acceder au guide</p>
                  <div ref={formRef} id="hs-guide-ia-form" className="min-h-[200px]">
                    <div className="flex items-center justify-center h-[200px] text-[#CCC]">
                      <div className="text-center">
                        <svg className="mx-auto mb-2 animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-6.219-8.56" /></svg>
                        <p className="text-[11px]">Chargement du formulaire...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <div className="text-center mb-6">
            <Badge>FAQ</Badge>
            <h2 className="text-[20px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em] mt-4">Questions frequentes</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Faut-il des competences techniques pour appliquer le guide ?", a: "Non. Les prompts sont prets a copier-coller, les workflows Make sont importables en 1 clic. Si vous savez utiliser votre CRM, vous pouvez appliquer le guide." },
              { q: "Quel LLM est recommande ?", a: "On recommande Claude (Anthropic) pour la majorite des cas d\u2019usage commerciaux. Le chapitre 3 detaille quand utiliser Claude, ChatGPT ou Gemini selon votre contexte." },
              { q: "Les workflows Make necessitent-ils un abonnement payant ?", a: "Le plan gratuit de Make suffit pour les workflows basiques. Pour les agents autonomes (chapitre 7), un plan Pro a 9 euros par mois est recommande." },
              { q: "Le guide est-il adapte a Salesforce ?", a: "Les prompts et la methodologie sont CRM-agnostiques. Les workflows Make sont illustres avec HubSpot mais fonctionnent aussi avec Salesforce et Pipedrive." },
              { q: "Peut-on etre accompagne par Ceres pour deployer l\u2019IA ?", a: "Oui, notre offre Agents IA inclut le deploiement des cas d\u2019usage du guide avec un consultant dedie. Le guide est un excellent point de depart pour cadrer vos besoins." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-[#E8E8E8] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <h3 className="text-[13px] font-semibold text-[#111] mb-2">{faq.q}</h3>
                <p className="text-[12px] text-[#777] leading-[1.65]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <div className="rounded-2xl bg-[#111] p-6 md:p-10 text-center">
            <h2 className="text-[20px] sm:text-[28px] font-semibold text-white tracking-[-0.02em] mb-3">Pret a deployer l&apos;IA dans votre equipe ?</h2>
            <p className="text-[14px] text-white/50 mb-6 max-w-[420px] mx-auto leading-[1.7]">Telechargez le guide ou reservez un appel pour un accompagnement sur mesure.</p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={scrollToForm} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#6D00CC] text-white text-[13px] font-medium hover:bg-[#5B00AD] transition-colors">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 2v8M4 7l4 4 4-4M2 13h12" /></svg>
                Telecharger le guide
              </button>
              <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-white text-[13px] font-medium hover:bg-white/5 transition-colors">
                <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
