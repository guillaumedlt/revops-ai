"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  name: "Le Guide RevOps Ultime",
  description: "62 pages pour structurer vos operations commerciales. Frameworks, templates, checklists et plan d\u2019implementation en 90 jours.",
  author: { "@type": "Organization", name: "Ceres" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://ceres-revops.fr" },
  numberOfPages: 62,
  inLanguage: "fr",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", availability: "https://schema.org/InStock" },
};

const chapters = [
  { num: "01", title: "Qu\u2019est-ce que le RevOps", desc: "Definition, historique, pourquoi c\u2019est devenu strategique. La difference entre RevOps, Sales Ops et Marketing Ops.", pages: "p. 4-9" },
  { num: "02", title: "Audit de votre situation actuelle", desc: "Notre framework 80 points pour evaluer votre maturite RevOps. Scoring, diagnostic et identification des quick wins.", pages: "p. 10-17" },
  { num: "03", title: "Definir votre ICP et personas", desc: "Comment construire un Ideal Customer Profilee data-driven. Template ICP, buyer personas et segmentation.", pages: "p. 18-23" },
  { num: "04", title: "Aligner marketing, sales et CS", desc: "Le SLA marketing-sales, les definitions communes (MQL, SQL), le funnel unifie et les rituels d\u2019alignement.", pages: "p. 24-29" },
  { num: "05", title: "Construire votre funnel", desc: "Definir chaque stage du funnel, les criteres de passage, les taux de conversion cibles et les automations.", pages: "p. 30-35" },
  { num: "06", title: "Lead scoring : fit + engagement", desc: "Mettre en place un scoring qui convertit. Grille de points, seuils MQL/SQL, implementation HubSpot.", pages: "p. 36-41" },
  { num: "07", title: "Stack technologique", desc: "Choisir et configurer vos outils. CRM, automation, enrichissement, analytics, IA. Par taille d\u2019entreprise.", pages: "p. 42-47" },
  { num: "08", title: "Les 30 metriques RevOps", desc: "Acquisition, pipeline, closing, revenue, retention, operations. Formules, benchmarks et dashboards.", pages: "p. 48-53" },
  { num: "09", title: "Plan d\u2019implementation 90 jours", desc: "Semaine par semaine : quoi deployer, dans quel ordre, avec quels KPIs de validation. Pret a executer.", pages: "p. 54-62" },
];

const clients = [
  { name: "Iroko", domain: "iroko.eu" },
  { name: "Ringover", domain: "ringover.com" },
  { name: "TotalEnergies", domain: "totalenergies.com" },
  { name: "Dougs", domain: "dougs.fr" },
  { name: "Edenred", domain: "edenred.com" },
  { name: "Manpower", domain: "manpower.fr" },
  { name: "Spendesk", domain: "spendesk.com" },
  { name: "Payfit", domain: "payfit.com" },
];

const testimonials = [
  { quote: "Ce guide nous a permis de structurer notre RevOps en 3 mois. Les templates sont directement actionnables.", author: "Antoine C.", role: "Head of Revenue", company: "Iroko" },
  { quote: "Le framework d\u2019audit 80 points nous a ouvert les yeux sur nos lacunes. On a gagne 6 mois de structuration.", author: "Ludovic R.", role: "VP Sales", company: "Ringover" },
];

export default function GuideRevOpsLandingPage() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if script already loaded
    if ((window as any).hbspt) {
      (window as any).hbspt.forms.create({
        portalId: "2703445",
        formId: "461a976f-66db-4946-9e3f-883c83d4a084",
        region: "na1",
        target: "#hs-guide-form",
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
          target: "#hs-guide-form",
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
      <div className="hidden lg:block fixed pointer-events-none" style={{ left: "2%", top: "10%", width: 340, height: 340, borderRadius: "50%", background: "#FF7A59", opacity: 0.14, filter: "blur(70px)" }} />
      <div className="hidden lg:block fixed pointer-events-none" style={{ right: "3%", top: "25%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block fixed pointer-events-none" style={{ left: "4%", top: "50%", width: 280, height: 280, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block fixed pointer-events-none" style={{ right: "2%", top: "70%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative z-10 max-w-[900px] mx-auto px-6">

        {/* Hero */}
        <section className="text-center mb-16">
          <nav className="mb-6 flex items-center justify-center gap-2 text-[12px] text-[#999]">
            <Link href="/" className="hover:text-[#111] transition-colors">Accueil</Link><span>/</span>
            <Link href="/guides" className="hover:text-[#111] transition-colors">Guides</Link><span>/</span>
            <span className="text-[#666]">Le Guide RevOps Ultime</span>
          </nav>
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FF7A59]/10 text-[12px] font-medium text-[#FF7A59]">Guide gratuit</span>
          </div>
          <h1 className="text-[36px] sm:text-[52px] font-semibold text-[#111] leading-[1.08] tracking-[-0.03em] mb-5">
            Le Guide RevOps Ultime
          </h1>
          <p className="text-[18px] text-[#666] max-w-[560px] mx-auto leading-[1.7] mb-6">
            62 pages de frameworks, templates et checklists pour structurer vos operations commerciales. Le meme playbook qu&apos;on utilise chez Ceres avec nos clients.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {[
              { value: "62", label: "pages" },
              { value: "9", label: "chapitres" },
              { value: "7", label: "templates inclus" },
              { value: "90j", label: "plan d\u2019action" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[24px] font-bold text-[#111]">{s.value}</div>
                <div className="text-[11px] text-[#999]">{s.label}</div>
              </div>
            ))}
          </div>

          <button onClick={scrollToForm} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FF7A59] text-white text-[14px] font-medium hover:bg-[#E86D4F] transition-colors shadow-[0_4px_12px_-4px_rgba(255,122,89,0.4)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 2v8M4 7l4 4 4-4M2 13h12" /></svg>
            Telecharger gratuitement
          </button>
          <p className="text-[11px] text-[#CCC] mt-3">Pas de spam. Juste le guide.</p>
        </section>

        {/* Book mockup */}
        <section className="mb-16">
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Book cover mockup */}
              <div className="w-[200px] h-[260px] rounded-lg shadow-[8px_8px_30px_-10px_rgba(0,0,0,0.2)] shrink-0 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FF7A59 0%, #FF5733 50%, #C0392B 100%)" }}>
                <div className="absolute inset-0 flex flex-col justify-between p-5">
                  <div>
                    <div className="w-8 h-0.5 bg-white/40 mb-3" />
                    <p className="text-white/60 text-[9px] font-medium uppercase tracking-wider">Ceres 2026</p>
                  </div>
                  <div>
                    <p className="text-white text-[16px] font-bold leading-[1.2] mb-1">Le Guide RevOps Ultime</p>
                    <p className="text-white/60 text-[9px]">62 pages | 9 chapitres</p>
                  </div>
                </div>
                {/* Spine effect */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-black/10" />
              </div>

              {/* What you'll learn */}
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Ce que vous allez apprendre</p>
                <div className="space-y-2.5">
                  {[
                    "Auditer votre maturite RevOps avec notre framework 80 points",
                    "Definir un ICP data-driven et des personas actionnables",
                    "Creer un SLA marketing-sales qui fonctionne vraiment",
                    "Mettre en place un lead scoring qui convertit",
                    "Choisir la bonne stack technologique selon votre taille",
                    "Suivre les 30 metriques RevOps essentielles",
                    "Deployer le tout en 90 jours avec un plan semaine par semaine",
                  ].map((item) => (
                    <p key={item} className="text-[13px] text-[#555] flex items-start gap-2.5 leading-[1.6]">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#FF7A59] shrink-0 mt-0.5"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="mb-16">
          <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider text-center mb-6">Utilise par les equipes RevOps de</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {clients.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-[#999]">
                <img src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=32`} alt={c.name} className="w-5 h-5 grayscale opacity-60" />
                <span className="text-[13px] font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sommaire detaille */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <Badge>Sommaire</Badge>
            <h2 className="text-[24px] sm:text-[32px] font-semibold text-[#111] tracking-[-0.02em] mt-4 mb-3">9 chapitres pour tout structurer</h2>
            <p className="text-[15px] text-[#666] max-w-[480px] mx-auto leading-[1.7]">Chaque chapitre est independant. Vous pouvez lire le guide de A a Z ou aller directement au chapitre qui vous concerne.</p>
          </div>

          <div className="space-y-3">
            {chapters.map((ch, i) => (
              <div key={ch.num} className="rounded-lg border border-[#EAEAEA] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] hover:border-[#DDD] transition-colors">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-[#FF7A59]/10 flex items-center justify-center text-[#FF7A59] text-[13px] font-bold shrink-0">
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
          <div className="rounded-lg bg-[#111] p-6 md:p-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Inclus dans le guide</span>
            <h2 className="text-[20px] sm:text-[28px] font-semibold text-white tracking-[-0.02em] mb-6">7 templates prets a l&apos;emploi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Template SLA Marketing-Sales", desc: "Document complet avec engagements, KPIs et processus d\u2019escalade. Format Notion.", icon: "doc" },
                { title: "Grille de Lead Scoring", desc: "Matrice fit + engagement avec points, seuils et regles. Format Google Sheets.", icon: "grid" },
                { title: "Checklist Audit RevOps 80 points", desc: "80 points de controle en 8 categories avec scoring automatique. Format Sheets.", icon: "check" },
                { title: "Dashboard HubSpot (10 rapports)", desc: "10 rapports pre-configures couvrant pipeline, activite et revenue. Importable.", icon: "chart" },
                { title: "Framework ICP", desc: "Template structure pour definir votre Ideal Customer Profilee. Format Notion.", icon: "target" },
                { title: "Matrice RACI Marketing-Sales", desc: "Qui fait quoi entre marketing et sales. Responsabilites claires. Format Sheets.", icon: "users" },
                { title: "Plan 90 jours", desc: "Roadmap semaine par semaine avec milestones et KPIs de validation. Format Notion.", icon: "cal" },
              ].map((t) => (
                <div key={t.title} className="rounded-lg bg-white/5 p-4 flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-lg bg-[#FF7A59]/20 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#FF7A59" strokeWidth="1.5" strokeLinecap="round">
                      {t.icon === "doc" && <><path d="M9 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6z" /><path d="M9 2v4h4" /></>}
                      {t.icon === "grid" && <><path d="M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z" /></>}
                      {t.icon === "check" && <><path d="M13.3 4.3L6 11.6L2.7 8.3" /></>}
                      {t.icon === "chart" && <><path d="M12 20V10M18 20V4M6 20v-4" /></>}
                      {t.icon === "target" && <><circle cx="8" cy="8" r="6" /><circle cx="8" cy="8" r="2" /><path d="M8 2v2M8 12v2" /></>}
                      {t.icon === "users" && <><path d="M5 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 14s-1 0-1-1 1-4 4-4 4 3 4 4-1 1-1 1z" /><path d="M11 6a3 3 0 1 1 .7 4M14 14s1 0 1-1-1-4-4-4" /></>}
                      {t.icon === "cal" && <><rect x="2" y="3" width="12" height="11" rx="1" /><path d="M2 7h12M5 1v4M11 1v4" /></>}
                    </svg>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-white mb-0.5">{t.title}</p>
                    <p className="text-[10px] text-white/40 leading-[1.5]">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <div className="text-center mb-6">
            <Badge>Temoignages</Badge>
            <h2 className="text-[20px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em] mt-4">Ce qu&apos;en disent nos clients</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div key={t.author} className="rounded-lg border border-[#EAEAEA] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <p className="text-[13px] text-[#555] leading-[1.75] mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF7A59]/10 flex items-center justify-center text-[#FF7A59] text-[10px] font-bold">
                    {t.author.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#111]">{t.author}</p>
                    <p className="text-[10px] text-[#999]">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Ceres */}
        <section className="mb-16">
          <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-lg bg-[#111] flex items-center justify-center text-white text-[14px] font-bold shrink-0">C</div>
              <div>
                <h3 className="text-[15px] font-semibold text-[#111] mb-2">A propos de Ceres</h3>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">Ceres est une agence RevOps et IA basee en France. On accompagne les entreprises B2B de 15 a 500 personnes pour structurer leurs operations commerciales, deployer HubSpot et integrer l&apos;IA dans leurs processus de vente.</p>
                <div className="flex flex-wrap gap-4 text-[12px] text-[#999]">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-[#FF7A59]" />40+ clients accompagnes</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-[#4B5EFC]" />Partenaire HubSpot</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-[#6D00CC]" />Experts Claude &amp; IA</span>
                </div>
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
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <p className="text-[12px] font-semibold text-[#22C55E] mb-3">Ideal pour</p>
              {[
                "Vous dirigez une entreprise B2B de 15 a 200 personnes",
                "Votre CRM est mal configure ou sous-utilise",
                "Marketing et sales ne sont pas alignes",
                "Vous n\u2019avez pas de process de qualification clair",
                "Vous voulez mettre en place le RevOps sans recruter",
                "Vous cherchez un framework structure et actionnable",
              ].map((i) => (
                <p key={i} className="text-[12px] text-[#555] mb-2 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
              ))}
            </div>
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <p className="text-[12px] font-semibold text-[#999] mb-3">Moins pertinent si</p>
              {[
                "Votre equipe fait moins de 5 personnes (trop tot)",
                "Vous avez deja un RevOps senior en place",
                "Vous cherchez un guide specifique a Salesforce",
                "Vous etes en B2C pur (le guide est B2B)",
              ].map((i) => (
                <p key={i} className="text-[12px] text-[#999] mb-2 flex items-start gap-2"><span className="text-[#CCC] mt-0.5 shrink-0">-</span>{i}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Download form section */}
        <section id="telecharger" className="mb-16 scroll-mt-24">
          <div className="rounded-lg border-2 border-[#FF7A59]/20 bg-white p-6 md:p-10 shadow-[0_8px_30px_-10px_rgba(255,122,89,0.15)]">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left: recap */}
              <div className="flex-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FF7A59]/10 text-[12px] font-medium text-[#FF7A59] mb-4">Gratuit</span>
                <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Telecharger le Guide RevOps Ultime</h2>
                <p className="text-[14px] text-[#666] leading-[1.7] mb-5">Remplissez le formulaire pour recevoir le guide complet par email. Acces instantane.</p>

                <div className="space-y-2.5 mb-6">
                  {[
                    "62 pages de contenu actionnable",
                    "7 templates prets a l\u2019emploi (Notion + Sheets)",
                    "Plan d\u2019implementation 90 jours",
                    "Mises a jour gratuites incluses",
                  ].map((item) => (
                    <p key={item} className="text-[13px] text-[#555] flex items-center gap-2.5">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#FF7A59] shrink-0"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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

              {/* Right: HubSpot form */}
              <div className="lg:w-[380px] shrink-0">
                <div className="rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-5">
                  <p className="text-[12px] font-semibold text-[#111] mb-4">Acceder au guide</p>
                  <div ref={formRef} id="hs-guide-form" className="min-h-[200px]">
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
              { q: "Le guide est-il vraiment gratuit ?", a: "Oui, 100% gratuit. On vous demande juste votre email professionnel pour vous l\u2019envoyer. Pas de piege, pas d\u2019abonnement cache." },
              { q: "A qui s\u2019adresse ce guide ?", a: "Aux founders, VP Sales, VP Marketing et RevOps Managers d\u2019entreprises B2B de 15 a 200 personnes qui veulent structurer leurs operations commerciales." },
              { q: "Faut-il utiliser HubSpot pour appliquer le guide ?", a: "Le guide est CRM-agnostique dans sa methodologie. Les templates et captures sont sur HubSpot, mais les frameworks s\u2019appliquent a Salesforce, Pipedrive ou tout autre CRM." },
              { q: "En combien de temps peut-on implementer le guide ?", a: "Le plan d\u2019implementation est concu pour 90 jours. Vous pouvez aller plus vite sur certains chapitres si vous avez deja des bases en place." },
              { q: "Les templates sont-ils personnalisables ?", a: "Oui, tous les templates sont en Notion ou Google Sheets et sont entierement modifiables. Vous les adaptez a votre contexte." },
              { q: "Peut-on etre accompagne par Ceres pour implementer le guide ?", a: "Oui, c\u2019est meme ce qu\u2019on recommande. Le guide est un excellent point de depart. Si vous voulez aller plus vite, notre offre RevOps Part-Time permet de deployer ces frameworks avec un consultant dedie." },
            ].map((faq) => (
              <div key={faq.q} className="rounded-lg border border-[#EAEAEA] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <h3 className="text-[13px] font-semibold text-[#111] mb-2">{faq.q}</h3>
                <p className="text-[12px] text-[#777] leading-[1.65]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <div className="rounded-lg bg-[#111] p-6 md:p-10 text-center">
            <h2 className="text-[20px] sm:text-[28px] font-semibold text-white tracking-[-0.02em] mb-3">Pret a structurer votre RevOps ?</h2>
            <p className="text-[14px] text-white/50 mb-6 max-w-[400px] mx-auto leading-[1.7]">Telechargez le guide gratuitement ou reservez un appel avec notre equipe pour un accompagnement personnalise.</p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={scrollToForm} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF7A59] text-white text-[13px] font-medium hover:bg-[#E86D4F] transition-colors">
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
