"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

/* ------------------------------------------------------------------ */
/*  JSON-LD Article schema                                            */
/* ------------------------------------------------------------------ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Guide IA pour Equipes Commerciales : D\u00e9ployer l\u2019IA dans la vente B2B en 2026",
  description:
    "Le guide le plus complet en fran\u00e7ais pour int\u00e9grer l\u2019intelligence artificielle dans votre processus commercial B2B. 9 chapitres, 42 pages, 25 prompts, 3 workflows Make.",
  author: { "@type": "Organization", name: "Ceres", url: "https://ceres-revops.fr" },
  publisher: {
    "@type": "Organization",
    name: "Ceres",
    url: "https://ceres-revops.fr",
    logo: { "@type": "ImageObject", url: "https://ceres-revops.fr/logo.png" },
  },
  datePublished: "2026-03-25",
  dateModified: "2026-03-25",
  inLanguage: "fr",
  mainEntityOfPage: "https://ceres-revops.fr/guide-ia-commercial/contenu",
  articleSection: "IA & Automatisation",
  wordCount: 7200,
};

/* ------------------------------------------------------------------ */
/*  Chapters sidebar data                                             */
/* ------------------------------------------------------------------ */
const chapters = [
  { id: "ch1", num: "01", title: "L\u2019IA commerciale en 2026" },
  { id: "ch2", num: "02", title: "Les 10 cas d\u2019usage \u00e0 plus fort ROI" },
  { id: "ch3", num: "03", title: "Choisir votre LLM" },
  { id: "ch4", num: "04", title: "Enrichissement IA en pratique" },
  { id: "ch5", num: "05", title: "Emails personnalis\u00e9s par IA" },
  { id: "ch6", num: "06", title: "R\u00e9sum\u00e9 de calls et intelligence" },
  { id: "ch7", num: "07", title: "Agents IA avec Make + Claude" },
  { id: "ch8", num: "08", title: "D\u00e9ploiement progressif en 3 phases" },
  { id: "ch9", num: "09", title: "Mesurer le ROI de l\u2019IA" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function GuideIAContenuPage() {
  const [activeSection, setActiveSection] = useState("ch1");
  const [progress, setProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  /* Track scroll progress + active section */
  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? Math.min(100, Math.round((scrollY / docH) * 100)) : 0);

      let current = "ch1";
      for (const ch of chapters) {
        const el = document.getElementById(ch.id);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = ch.id;
        }
      }
      setActiveSection(current);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* Share helpers */
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://ceres-revops.fr/guide-ia-commercial/contenu";
  const shareText = "Guide IA pour Equipes Commerciales \u2014 le guide le plus complet en fran\u00e7ais pour d\u00e9ployer l\u2019IA dans la vente B2B";

  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#F0F0F0]">
        <div className="h-full bg-[#6D00CC] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block fixed pointer-events-none" style={{ left: "1%", top: "8%", width: 360, height: 360, borderRadius: "50%", background: "#6D00CC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block fixed pointer-events-none" style={{ right: "2%", top: "22%", width: 300, height: 300, borderRadius: "50%", background: "#D4A27F", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block fixed pointer-events-none" style={{ left: "3%", top: "48%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block fixed pointer-events-none" style={{ right: "1%", top: "68%", width: 320, height: 320, borderRadius: "50%", background: "#6D00CC", opacity: 0.06, filter: "blur(70px)" }} />
      <div className="hidden lg:block fixed pointer-events-none" style={{ left: "10%", top: "85%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.05, filter: "blur(70px)" }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 flex gap-8">

        {/* ============================================================ */}
        {/*  Sticky sidebar                                              */}
        {/* ============================================================ */}
        <aside className="hidden lg:block w-[260px] shrink-0">
          <div className="sticky top-[80px] max-h-[calc(100vh-100px)] overflow-y-auto pr-2">
            <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-3">Sommaire</p>
            <nav className="space-y-0.5 mb-6">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => scrollTo(ch.id)}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] transition-colors ${
                    activeSection === ch.id
                      ? "bg-[#6D00CC]/10 text-[#6D00CC] font-semibold"
                      : "text-[#777] hover:text-[#111] hover:bg-[#F5F5F5]"
                  }`}
                >
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-bold shrink-0 ${
                    activeSection === ch.id ? "bg-[#6D00CC] text-white" : "bg-[#F0F0F0] text-[#999]"
                  }`}>{ch.num}</span>
                  <span className="truncate">{ch.title}</span>
                </button>
              ))}
            </nav>

            {/* Progress indicator */}
            <div className="px-3 mb-6">
              <div className="flex items-center justify-between text-[10px] text-[#CCC] mb-1">
                <span>Progression</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 bg-[#F0F0F0] rounded-full overflow-hidden">
                <div className="h-full bg-[#6D00CC] rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Share */}
            <div className="px-3 mb-4">
              <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-2">Partager</p>
              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-[#EAEAEA] flex items-center justify-center text-[#999] hover:text-[#111] hover:border-[#CCC] transition-colors"
                  title="Partager sur X"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-[#EAEAEA] flex items-center justify-center text-[#999] hover:text-[#0A66C2] hover:border-[#CCC] transition-colors"
                  title="Partager sur LinkedIn"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
              </div>
            </div>

            {/* Back link */}
            <div className="px-3">
              <Link href="/guide-ia-commercial" className="text-[11px] text-[#6D00CC] hover:underline flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M10 4l-4 4 4 4" /></svg>
                Retour au guide
              </Link>
            </div>
          </div>
        </aside>

        {/* ============================================================ */}
        {/*  Main content                                                */}
        {/* ============================================================ */}
        <main className="flex-1 min-w-0 max-w-[820px]" ref={contentRef}>

          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-[12px] text-[#999]">
            <Link href="/" className="hover:text-[#111] transition-colors">Accueil</Link><span>/</span>
            <Link href="/guide-ia-commercial" className="hover:text-[#111] transition-colors">Guide IA</Link><span>/</span>
            <span className="text-[#666]">Contenu complet</span>
          </nav>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#6D00CC]/10 text-[12px] font-medium text-[#6D00CC]">IA &amp; Automatisation</span>
              <span className="text-[11px] text-[#CCC]">25 mars 2026</span>
              <span className="text-[11px] text-[#CCC]">35 min de lecture</span>
            </div>
            <h1 className="text-[32px] sm:text-[44px] font-semibold text-[#111] leading-[1.1] tracking-[-0.03em] mb-5">
              Guide IA pour Equipes Commerciales
            </h1>
            <p className="text-[17px] text-[#666] leading-[1.75] max-w-[640px]">
              Le guide le plus complet en fran&ccedil;ais pour d&eacute;ployer l&apos;intelligence artificielle dans votre processus de vente B2B. 9 chapitres, 42 pages, 25 prompts, 3 workflows Make pr&ecirc;ts &agrave; importer.
            </p>
            <div className="flex items-center gap-4 mt-6 text-[12px] text-[#999]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#6D00CC]/10 flex items-center justify-center text-[#6D00CC] text-[10px] font-bold">C</div>
                <span>Par <strong className="text-[#111]">Ceres</strong></span>
              </div>
              <span>|</span>
              <span>42 pages</span>
              <span>|</span>
              <span>9 chapitres</span>
            </div>
          </header>

          <Connector />

          {/* ========================================================== */}
          {/*  CHAPTER 1                                                  */}
          {/* ========================================================== */}
          <section id="ch1" className="scroll-mt-[100px] mb-10">
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[13px] font-bold shrink-0">01</div>
                <div>
                  <p className="text-[10px] text-[#CCC] uppercase tracking-wider">Chapitre 1 &mdash; p. 4-8</p>
                  <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em]">L&apos;IA commerciale en 2026</h2>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">L&apos;adoption de l&apos;IA dans la vente B2B : un point de bascule</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                En 2026, nous avons franchi un seuil irr&eacute;versible. Selon le dernier rapport de McKinsey sur l&apos;IA g&eacute;n&eacute;rative, 72% des &eacute;quipes commerciales B2B utilisent d&eacute;sormais au moins un outil d&apos;IA dans leur quotidien. Ce chiffre &eacute;tait de 28% fin 2023. Les &eacute;quipes les plus matures, celles qui ont d&eacute;ploy&eacute; l&apos;IA de mani&egrave;re syst&eacute;matique, observent un multiplicateur de productivit&eacute; de 3x sur les t&acirc;ches r&eacute;p&eacute;titives : enrichissement de donn&eacute;es, r&eacute;daction d&apos;emails, qualification de leads, compte-rendus de calls.
              </p>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Plus frappant encore : Gartner pr&eacute;dit que d&apos;ici fin 2027, 85% des interactions initiales entre un acheteur B2B et un fournisseur se feront sans intervention humaine directe. Les chatbots de qualification, les agents d&apos;enrichissement et les s&eacute;quences email pilot&eacute;es par IA sont d&eacute;j&agrave; la norme dans les entreprises SaaS de plus de 50 collaborateurs.
              </p>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-6">
                Ce qui a fondamentalement chang&eacute; par rapport &agrave; 2023, ce n&apos;est pas uniquement la technologie. C&apos;est la convergence de trois facteurs : la fiabilit&eacute; des LLM (les hallucinations ont diminu&eacute; de 60% entre GPT-4 et Claude 3.5/GPT-4o), l&apos;accessibilit&eacute; des API (un appel &agrave; Claude co&ucirc;te d&eacute;sormais moins de 0,01 euro pour un enrichissement complet de fiche contact), et l&apos;int&eacute;gration native dans les outils (HubSpot, Salesforce, Lemlist, Clay int&egrave;grent tous des fonctionnalit&eacute;s IA directement dans leur interface).
              </p>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Les 3 vagues de l&apos;IA commerciale</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Pour comprendre o&ugrave; nous en sommes, il faut comprendre le chemin parcouru. L&apos;IA commerciale s&apos;est d&eacute;ploy&eacute;e en trois vagues successives, chacune avec ses caract&eacute;ristiques et son niveau de maturit&eacute;.
              </p>

              {/* Timeline visualization */}
              <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5 mb-6">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Chronologie d&apos;adoption</p>
                <div className="space-y-4">
                  {/* Wave 1 */}
                  <div className="flex items-start gap-4">
                    <div className="w-[80px] shrink-0 text-right">
                      <span className="text-[11px] font-bold text-[#6D00CC]">2023</span>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[#6D00CC] z-10" />
                      <div className="w-0.5 h-full bg-[#E0E0E0] absolute top-3" />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-1">Vague 1 : Les chatbots</p>
                      <p className="text-[12px] text-[#777] leading-[1.65]">
                        ChatGPT lance la r&eacute;volution. Les commerciaux d&eacute;couvrent qu&apos;ils peuvent g&eacute;n&eacute;rer des emails, r&eacute;sumer des notes, cr&eacute;er des pr&eacute;sentations. Utilisation opportuniste, non syst&eacute;matique. Chaque commercial fait sa propre exploration. Aucune int&eacute;gration CRM. R&eacute;sultats in&eacute;gaux.
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="h-2 rounded-full bg-[#6D00CC]/20 flex-1 max-w-[200px]">
                          <div className="h-full rounded-full bg-[#6D00CC]" style={{ width: "28%" }} />
                        </div>
                        <span className="text-[10px] text-[#999]">28% d&apos;adoption</span>
                      </div>
                    </div>
                  </div>
                  {/* Wave 2 */}
                  <div className="flex items-start gap-4">
                    <div className="w-[80px] shrink-0 text-right">
                      <span className="text-[11px] font-bold text-[#4B5EFC]">2024</span>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[#4B5EFC] z-10" />
                      <div className="w-0.5 h-full bg-[#E0E0E0] absolute top-3" />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-[13px] font-semibold text-[#111] mb-1">Vague 2 : Les copilotes</p>
                      <p className="text-[12px] text-[#777] leading-[1.65]">
                        L&apos;IA s&apos;int&egrave;gre dans les outils existants. HubSpot lance Breeze AI, Salesforce d&eacute;ploie Einstein GPT, Gong et Modjo ajoutent des r&eacute;sum&eacute;s automatiques. Clay connecte les LLM &agrave; l&apos;enrichissement de donn&eacute;es. L&apos;IA devient un copilote int&eacute;gr&eacute; au workflow, pas un outil s&eacute;par&eacute;. Adoption syst&eacute;matique au niveau &eacute;quipe.
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="h-2 rounded-full bg-[#4B5EFC]/20 flex-1 max-w-[200px]">
                          <div className="h-full rounded-full bg-[#4B5EFC]" style={{ width: "52%" }} />
                        </div>
                        <span className="text-[10px] text-[#999]">52% d&apos;adoption</span>
                      </div>
                    </div>
                  </div>
                  {/* Wave 3 */}
                  <div className="flex items-start gap-4">
                    <div className="w-[80px] shrink-0 text-right">
                      <span className="text-[11px] font-bold text-[#22C55E]">2025-26</span>
                    </div>
                    <div className="relative flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[#22C55E] z-10" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold text-[#111] mb-1">Vague 3 : Les agents autonomes</p>
                      <p className="text-[12px] text-[#777] leading-[1.65]">
                        L&apos;IA ne se contente plus d&apos;assister : elle ex&eacute;cute. Les agents IA qualifient les leads 24/7, enrichissent automatiquement chaque nouveau contact, g&eacute;n&egrave;rent et envoient des s&eacute;quences personnalis&eacute;es, r&eacute;sument chaque call et mettent &agrave; jour le CRM sans intervention humaine. Make, n8n et Zapier deviennent les orchestrateurs d&apos;agents. Le MCP (Model Context Protocol) d&apos;Anthropic permet aux agents de se connecter directement aux outils business.
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="h-2 rounded-full bg-[#22C55E]/20 flex-1 max-w-[200px]">
                          <div className="h-full rounded-full bg-[#22C55E]" style={{ width: "72%" }} />
                        </div>
                        <span className="text-[10px] text-[#999]">72% d&apos;adoption</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Pourquoi les &eacute;quipes sans IA d&eacute;crochent</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Le probl&egrave;me n&apos;est plus de savoir si l&apos;IA fonctionne. Le probl&egrave;me est que vos concurrents l&apos;utilisent d&eacute;j&agrave;. Quand un SDR &eacute;quip&eacute; d&apos;IA enrichit 200 contacts par heure pendant que votre SDR en enrichit 15 manuellement, l&apos;&eacute;cart se creuse chaque jour. Quand un AE r&eacute;cup&egrave;re un r&eacute;sum&eacute; structur&eacute; de chaque call en 30 secondes pendant que votre AE passe 20 minutes &agrave; r&eacute;diger des notes, c&apos;est du temps de vente perdu.
              </p>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Les chiffres sont sans appel. D&apos;apr&egrave;s Salesforce State of Sales 2026, les &eacute;quipes utilisant l&apos;IA de mani&egrave;re syst&eacute;matique enregistrent en moyenne : 34% de temps de vente en plus (lib&eacute;r&eacute; des t&acirc;ches administratives), 27% de taux de conversion sup&eacute;rieur (gr&acirc;ce au scoring et &agrave; la personnalisation), 41% de r&eacute;duction du cycle de vente (gr&acirc;ce aux follow-ups automatis&eacute;s et aux insights en temps r&eacute;el). Ne pas adopter l&apos;IA en 2026, ce n&apos;est pas rester stable : c&apos;est reculer activement face &agrave; des concurrents qui acc&eacute;l&egrave;rent.
              </p>

              {/* Stats bar chart CSS */}
              <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5 mb-4">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Impact mesur&eacute; de l&apos;IA sur les &eacute;quipes commerciales</p>
                <div className="space-y-3">
                  {[
                    { label: "Temps de vente lib\u00e9r\u00e9", value: 34, color: "#6D00CC" },
                    { label: "Taux de conversion", value: 27, color: "#4B5EFC" },
                    { label: "R\u00e9duction cycle de vente", value: 41, color: "#22C55E" },
                    { label: "Productivit\u00e9 SDR", value: 58, color: "#D4A27F" },
                    { label: "Pr\u00e9cision forecasting", value: 15, color: "#FF7A59" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-[#555]">{s.label}</span>
                        <span className="font-semibold text-[#111]">+{s.value}%</span>
                      </div>
                      <div className="h-2.5 bg-[#E8E8E8] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.value}%`, background: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-[#CCC] mt-3">Sources : McKinsey 2025, Salesforce State of Sales 2026, Forrester B2B Sales Report</p>
              </div>

              <p className="text-[14px] text-[#555] leading-[1.8]">
                Ce guide est con&ccedil;u pour vous accompagner pas &agrave; pas dans cette transition. Que vous d&eacute;butiez avec l&apos;IA ou que vous souhaitiez passer au niveau sup&eacute;rieur, chaque chapitre est actionnable et ind&eacute;pendant. Vous pouvez commencer par le cas d&apos;usage qui vous parle le plus et progresser &agrave; votre rythme.
              </p>
            </div>
          </section>

          <Connector />

          {/* ========================================================== */}
          {/*  CHAPTER 2                                                  */}
          {/* ========================================================== */}
          <section id="ch2" className="scroll-mt-[100px] mb-10">
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[13px] font-bold shrink-0">02</div>
                <div>
                  <p className="text-[10px] text-[#CCC] uppercase tracking-wider">Chapitre 2 &mdash; p. 9-18</p>
                  <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em]">Les 10 cas d&apos;usage &agrave; plus fort ROI</h2>
                </div>
              </div>

              <p className="text-[14px] text-[#555] leading-[1.8] mb-6">
                Tous les cas d&apos;usage IA ne se valent pas. Apr&egrave;s avoir d&eacute;ploy&eacute; l&apos;IA chez plus de 40 &eacute;quipes commerciales B2B, nous avons identifi&eacute; les 10 cas d&apos;usage qui g&eacute;n&egrave;rent le ROI le plus &eacute;lev&eacute; et le plus rapide. Pour chacun, nous d&eacute;taillons la description, les outils n&eacute;cessaires, le temps de mise en place, le retour sur investissement estim&eacute; et le niveau de difficult&eacute;.
              </p>

              {/* Use case 1 */}
              <div className="rounded-lg border border-[#F0F0F0] bg-[#FAFAFA] p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] text-white text-[10px] font-bold flex items-center justify-center">1</span>
                    <h4 className="text-[14px] font-semibold text-[#111]">Enrichissement automatique de contacts</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#22C55E]/10 text-[#22C55E] font-medium">ROI rapide</span>
                </div>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Au lieu de chercher manuellement des informations sur chaque prospect (taille d&apos;entreprise, technologies utilis&eacute;es, actualit&eacute;s r&eacute;centes, pain points probables), vous laissez Clay + Claude analyser automatiquement le site web, le profil LinkedIn et les articles r&eacute;cents de chaque contact. L&apos;IA g&eacute;n&egrave;re un r&eacute;sum&eacute; du contexte business, un icebreaker personnalis&eacute; et une liste de pain points potentiels. R&eacute;sultat : chaque fiche contact est enrichie en profondeur en quelques secondes au lieu de 15-20 minutes de recherche manuelle.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Outils</p>
                    <p className="text-[11px] font-semibold text-[#111]">Clay + Claude</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Setup</p>
                    <p className="text-[11px] font-semibold text-[#111]">2 heures</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Temps gagn&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#22C55E]">3h / jour</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Difficult&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#111]">Facile</p>
                  </div>
                </div>
              </div>

              {/* Use case 2 */}
              <div className="rounded-lg border border-[#F0F0F0] bg-[#FAFAFA] p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] text-white text-[10px] font-bold flex items-center justify-center">2</span>
                    <h4 className="text-[14px] font-semibold text-[#111]">Scoring pr&eacute;dictif hybride</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#6D00CC]/10 text-[#6D00CC] font-medium">Fort impact</span>
                </div>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Le scoring traditionnel bas&eacute; uniquement sur des r&egrave;gles (taille d&apos;entreprise, secteur, engagement email) est limit&eacute;. Le scoring purement IA est une bo&icirc;te noire. La solution : un mod&egrave;le hybride. Vous d&eacute;finissez les crit&egrave;res de base (ICP fit, engagement, timing) et l&apos;IA affine le score en analysant les signaux faibles : ton des emails, questions pos&eacute;es en d&eacute;mo, comparaison avec les deals gagn&eacute;s pr&eacute;c&eacute;demment. Ce scoring pr&eacute;dictif augmente le taux de conversion de 25% en moyenne car les commerciaux se concentrent sur les bons deals.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Outils</p>
                    <p className="text-[11px] font-semibold text-[#111]">CRM + Claude API</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Setup</p>
                    <p className="text-[11px] font-semibold text-[#111]">1-2 semaines</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Impact</p>
                    <p className="text-[11px] font-semibold text-[#22C55E]">+25% conversion</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Difficult&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#111]">Interm&eacute;diaire</p>
                  </div>
                </div>
              </div>

              {/* Use case 3 */}
              <div className="rounded-lg border border-[#F0F0F0] bg-[#FAFAFA] p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] text-white text-[10px] font-bold flex items-center justify-center">3</span>
                    <h4 className="text-[14px] font-semibold text-[#111]">Emails personnalis&eacute;s par IA</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#22C55E]/10 text-[#22C55E] font-medium">ROI rapide</span>
                </div>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  L&apos;email de prospection g&eacute;n&eacute;rique est mort. Les taux de r&eacute;ponse des s&eacute;quences templat&eacute;es s&apos;effondrent (&lt;1% en moyenne). La personnalisation par IA change la donne : Claude analyse le profil du prospect, son entreprise, ses enjeux probables et g&eacute;n&egrave;re un email unique avec un icebreaker pertinent, une proposition de valeur adapt&eacute;e et un CTA contextuel. Combin&eacute; avec Lemlist pour l&apos;envoi automatis&eacute;, les taux de r&eacute;ponse doublent en moyenne (de 3-4% &agrave; 8-12%).
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Outils</p>
                    <p className="text-[11px] font-semibold text-[#111]">Claude + Lemlist</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Setup</p>
                    <p className="text-[11px] font-semibold text-[#111]">3 heures</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Impact</p>
                    <p className="text-[11px] font-semibold text-[#22C55E]">2x r&eacute;ponses</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Difficult&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#111]">Facile</p>
                  </div>
                </div>
              </div>

              {/* Use case 4 */}
              <div className="rounded-lg border border-[#F0F0F0] bg-[#FAFAFA] p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] text-white text-[10px] font-bold flex items-center justify-center">4</span>
                    <h4 className="text-[14px] font-semibold text-[#111]">R&eacute;sum&eacute; automatique des calls</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#22C55E]/10 text-[#22C55E] font-medium">ROI rapide</span>
                </div>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Chaque call commercial contient des informations pr&eacute;cieuses : objections, signaux d&apos;achat, besoins non exprim&eacute;s, engagements pris. Mais la r&eacute;alit&eacute; est que 80% de ces informations sont perdues car les commerciaux ne prennent pas de notes assez d&eacute;taill&eacute;es. Avec Claap ou Modjo pour l&apos;enregistrement et la transcription, puis Claude pour l&apos;analyse structur&eacute;e, chaque call g&eacute;n&egrave;re automatiquement un r&eacute;sum&eacute; avec les points cl&eacute;s, les actions &agrave; suivre, les objections identifi&eacute;es et le sentiment global du prospect. Le gain moyen est de 45 minutes par jour par commercial.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Outils</p>
                    <p className="text-[11px] font-semibold text-[#111]">Claap/Modjo + Claude</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Setup</p>
                    <p className="text-[11px] font-semibold text-[#111]">4 heures</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Temps gagn&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#22C55E]">45 min / jour</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Difficult&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#111]">Facile</p>
                  </div>
                </div>
              </div>

              {/* Use case 5 */}
              <div className="rounded-lg border border-[#F0F0F0] bg-[#FAFAFA] p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] text-white text-[10px] font-bold flex items-center justify-center">5</span>
                    <h4 className="text-[14px] font-semibold text-[#111]">Analyse win/loss automatis&eacute;e</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#4B5EFC]/10 text-[#4B5EFC] font-medium">Strat&eacute;gique</span>
                </div>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Pourquoi perdez-vous des deals ? La plupart des &eacute;quipes ne le savent pas vraiment. Le champ &laquo; raison de perte &raquo; du CRM est rarement rempli correctement. En demandant &agrave; Claude d&apos;analyser l&apos;historique complet de chaque deal (emails, notes de calls, dur&eacute;e des &eacute;tapes, interactions), l&apos;IA identifie des patterns actionables : &laquo; Les deals perdus au stade n&eacute;gociation impliquent 60% du temps un concurrent qui propose un prix 20% inf&eacute;rieur &raquo;, ou &laquo; Les deals o&ugrave; le d&eacute;cideur technique n&apos;est pas impliqu&eacute; avant l&apos;&eacute;tape de proposition ont 3x plus de chances d&apos;&ecirc;tre perdus &raquo;. Ces insights transforment votre processus de vente.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Outils</p>
                    <p className="text-[11px] font-semibold text-[#111]">Claude + donn&eacute;es CRM</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Setup</p>
                    <p className="text-[11px] font-semibold text-[#111]">1 semaine</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Impact</p>
                    <p className="text-[11px] font-semibold text-[#22C55E]">Patterns actionnables</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Difficult&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#111]">Interm&eacute;diaire</p>
                  </div>
                </div>
              </div>

              {/* Use case 6 */}
              <div className="rounded-lg border border-[#F0F0F0] bg-[#FAFAFA] p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] text-white text-[10px] font-bold flex items-center justify-center">6</span>
                    <h4 className="text-[14px] font-semibold text-[#111]">Pr&eacute;vision de revenus par IA</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#4B5EFC]/10 text-[#4B5EFC] font-medium">Strat&eacute;gique</span>
                </div>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Le forecasting traditionnel repose sur l&apos;intuition des commerciaux et les stades du pipeline. C&apos;est structurellement biais&eacute; : les commerciaux sont optimistes, les stades ne refl&egrave;tent pas la r&eacute;alit&eacute;. L&apos;IA analyse les signaux objectifs de chaque deal (v&eacute;locit&eacute; entre &eacute;tapes, fr&eacute;quence des interactions, nombre de stakeholders impliqu&eacute;s, comparaison avec les deals pass&eacute;s similaires) pour attribuer une probabilit&eacute; de cl&ocirc;ture ajust&eacute;e. Chez nos clients, la pr&eacute;cision du forecast s&apos;am&eacute;liore de 15% en moyenne, ce qui permet de meilleures d&eacute;cisions d&apos;allocation des ressources et de recrutement.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Outils</p>
                    <p className="text-[11px] font-semibold text-[#111]">Claude API + CRM</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Setup</p>
                    <p className="text-[11px] font-semibold text-[#111]">2 semaines</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Impact</p>
                    <p className="text-[11px] font-semibold text-[#22C55E]">+15% pr&eacute;cision</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Difficult&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#111]">Avanc&eacute;</p>
                  </div>
                </div>
              </div>

              {/* Use case 7 */}
              <div className="rounded-lg border border-[#F0F0F0] bg-[#FAFAFA] p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] text-white text-[10px] font-bold flex items-center justify-center">7</span>
                    <h4 className="text-[14px] font-semibold text-[#111]">Qualification automatique 24/7</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#6D00CC]/10 text-[#6D00CC] font-medium">Fort impact</span>
                </div>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Un visiteur arrive sur votre site &agrave; 22h. Il a des questions. Sans chatbot IA, il repart et ne revient probablement jamais. Avec un agent de qualification IA, le visiteur est engag&eacute; imm&eacute;diatement. L&apos;agent pose les bonnes questions (taille d&apos;&eacute;quipe, budget, timeline, probl&eacute;matique), qualifie le lead selon vos crit&egrave;res BANT ou MEDDIC, et route automatiquement vers le bon commercial avec un r&eacute;sum&eacute; complet. Si le lead n&apos;est pas qualifi&eacute;, l&apos;agent propose du contenu pertinent et l&apos;ajoute &agrave; une s&eacute;quence de nurturing adapt&eacute;e.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Outils</p>
                    <p className="text-[11px] font-semibold text-[#111]">Chatbot IA + CRM</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Setup</p>
                    <p className="text-[11px] font-semibold text-[#111]">1 semaine</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Impact</p>
                    <p className="text-[11px] font-semibold text-[#22C55E]">Qualification 24/7</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Difficult&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#111]">Interm&eacute;diaire</p>
                  </div>
                </div>
              </div>

              {/* Use case 8 */}
              <div className="rounded-lg border border-[#F0F0F0] bg-[#FAFAFA] p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] text-white text-[10px] font-bold flex items-center justify-center">8</span>
                    <h4 className="text-[14px] font-semibold text-[#111]">Coaching commercial par IA</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#4B5EFC]/10 text-[#4B5EFC] font-medium">Strat&eacute;gique</span>
                </div>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Le coaching commercial est le levier de performance le plus sous-exploit&eacute;. Les managers n&apos;ont pas le temps d&apos;&eacute;couter chaque call. L&apos;IA le fait pour eux. En analysant les transcriptions de calls, Claude identifie les points d&apos;am&eacute;lioration sp&eacute;cifiques pour chaque commercial : ratio talk/listen, gestion des objections, utilisation de la d&eacute;couverte, techniques de closing. Chaque commercial re&ccedil;oit un feedback personnalis&eacute; apr&egrave;s chaque call avec des suggestions concr&egrave;tes. Les &eacute;quipes qui d&eacute;ploient le coaching IA observent une am&eacute;lioration moyenne de 18% de la performance individuelle en 3 mois.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Outils</p>
                    <p className="text-[11px] font-semibold text-[#111]">Gong/Modjo + Claude</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Setup</p>
                    <p className="text-[11px] font-semibold text-[#111]">1-2 semaines</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Impact</p>
                    <p className="text-[11px] font-semibold text-[#22C55E]">+18% performance</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Difficult&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#111]">Interm&eacute;diaire</p>
                  </div>
                </div>
              </div>

              {/* Use case 9 */}
              <div className="rounded-lg border border-[#F0F0F0] bg-[#FAFAFA] p-5 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] text-white text-[10px] font-bold flex items-center justify-center">9</span>
                    <h4 className="text-[14px] font-semibold text-[#111]">Reporting automatis&eacute;</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#22C55E]/10 text-[#22C55E] font-medium">ROI rapide</span>
                </div>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Les commerciaux et les managers passent en moyenne 2 &agrave; 4 heures par semaine &agrave; compiler des rapports : pipeline review, forecast, activit&eacute; de l&apos;&eacute;quipe, progression des objectifs. Avec un workflow Make + Claude, un rapport complet est g&eacute;n&eacute;r&eacute; automatiquement chaque lundi matin. L&apos;IA extrait les donn&eacute;es du CRM, calcule les m&eacute;triques cl&eacute;s, compare avec la semaine pr&eacute;c&eacute;dente et les objectifs, identifie les points d&apos;attention et les wins, et g&eacute;n&egrave;re un rapport structur&eacute; envoy&eacute; par email ou Slack. Plus besoin de compiler manuellement des donn&eacute;es dans des spreadsheets.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Outils</p>
                    <p className="text-[11px] font-semibold text-[#111]">Make + Claude + CRM</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Setup</p>
                    <p className="text-[11px] font-semibold text-[#111]">4 heures</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Temps gagn&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#22C55E]">2h / semaine</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Difficult&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#111]">Facile</p>
                  </div>
                </div>
              </div>

              {/* Use case 10 */}
              <div className="rounded-lg border border-[#F0F0F0] bg-[#FAFAFA] p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#6D00CC] text-white text-[10px] font-bold flex items-center justify-center">10</span>
                    <h4 className="text-[14px] font-semibold text-[#111]">Onboarding acc&eacute;l&eacute;r&eacute; des commerciaux</h4>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#6D00CC]/10 text-[#6D00CC] font-medium">Fort impact</span>
                </div>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Le ramp-up d&apos;un nouveau commercial prend en moyenne 3 &agrave; 6 mois. Pendant ce temps, il ne produit qu&apos;une fraction de sa capacit&eacute;. Une base de connaissances IA change compl&egrave;tement la dynamique. Le nouveau commercial peut interroger l&apos;IA sur n&apos;importe quel sujet : &laquo; Comment r&eacute;pondre &agrave; l&apos;objection prix face au concurrent X ? &raquo;, &laquo; Quel est notre processus pour les deals enterprise ? &raquo;, &laquo; Montre-moi les 5 meilleurs calls de d&eacute;mo &raquo;. L&apos;IA puise dans la documentation interne, les transcriptions de calls, les emails gagn&eacute;s et le CRM pour fournir des r&eacute;ponses contextuelles et pr&eacute;cises. Le ramp-up est r&eacute;duit de 50% en moyenne.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Outils</p>
                    <p className="text-[11px] font-semibold text-[#111]">Claude + Notion + CRM</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Setup</p>
                    <p className="text-[11px] font-semibold text-[#111]">1 semaine</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Impact</p>
                    <p className="text-[11px] font-semibold text-[#22C55E]">-50% ramp time</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2.5">
                    <p className="text-[10px] text-[#999] mb-0.5">Difficult&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#111]">Interm&eacute;diaire</p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          <Connector />

          {/* ========================================================== */}
          {/*  CHAPTER 3                                                  */}
          {/* ========================================================== */}
          <section id="ch3" className="scroll-mt-[100px] mb-10">
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[13px] font-bold shrink-0">03</div>
                <div>
                  <p className="text-[10px] text-[#CCC] uppercase tracking-wider">Chapitre 3 &mdash; p. 19-22</p>
                  <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em]">Choisir votre LLM</h2>
                </div>
              </div>

              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Le choix du mod&egrave;le de langage est une d&eacute;cision structurante. Il n&apos;existe pas de &laquo; meilleur &raquo; LLM universel : chaque mod&egrave;le excelle dans certains domaines et pr&eacute;sente des faiblesses dans d&apos;autres. Ce chapitre vous donne une analyse objective des trois acteurs majeurs pour un usage commercial B2B, avec une comparaison sur 12 crit&egrave;res concrets.
              </p>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Claude (Anthropic)</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-3">
                Claude est devenu le mod&egrave;le de r&eacute;f&eacute;rence pour les usages commerciaux B2B en 2025-2026. Ses forces principales sont sa capacit&eacute; de raisonnement (il comprend les nuances, suit des instructions complexes, maintient la coh&eacute;rence sur de longs &eacute;changes), son contexte long (200K tokens, ce qui permet d&apos;analyser un historique complet de deal en une seule requ&ecirc;te), sa s&eacute;curit&eacute; (Anthropic est le leader en alignment AI, crucial quand on manipule des donn&eacute;es clients) et le MCP (Model Context Protocol) qui permet &agrave; Claude de se connecter directement &agrave; vos outils business sans d&eacute;veloppement custom.
              </p>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Ses faiblesses : l&apos;interface web est moins riche que ChatGPT (pas de Code Interpreter natif), et l&apos;&eacute;cosyst&egrave;me de plugins est plus r&eacute;cent. Pricing : Claude Pro &agrave; 20 USD/mois pour un usage individuel, API &agrave; partir de 3 USD / million de tokens en entr&eacute;e pour Claude Sonnet.
              </p>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">ChatGPT (OpenAI)</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-3">
                ChatGPT reste l&apos;outil le plus connu et le plus utilis&eacute;. GPT-4o offre une excellente vitesse de r&eacute;ponse, le Code Interpreter permet d&apos;analyser des fichiers Excel et CSV directement dans le chat, et l&apos;&eacute;cosyst&egrave;me de plugins est le plus d&eacute;velopp&eacute; du march&eacute;. Les Custom GPTs permettent de cr&eacute;er des assistants sp&eacute;cialis&eacute;s facilement.
              </p>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Ses faiblesses : le raisonnement est l&eacute;g&egrave;rement inf&eacute;rieur &agrave; Claude sur les t&acirc;ches complexes (analyse de deals multi-variables, strat&eacute;gie commerciale), les hallucinations sont plus fr&eacute;quentes sur les donn&eacute;es sp&eacute;cifiques, et les pr&eacute;occupations de confidentialit&eacute; sont plus fortes (OpenAI utilise les donn&eacute;es pour l&apos;entra&icirc;nement par d&eacute;faut, sauf d&eacute;sactivation explicite). Pricing : ChatGPT Plus &agrave; 20 USD/mois, API &agrave; partir de 2,50 USD / million de tokens pour GPT-4o.
              </p>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Gemini (Google)</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Gemini est le challenger. Ses forces : une capacit&eacute; multimodale native (analyse d&apos;images, vid&eacute;os, documents), une int&eacute;gration profonde avec Google Workspace (Sheets, Docs, Slides, Gmail) et un contexte tr&egrave;s long (jusqu&apos;&agrave; 1M tokens avec Gemini 1.5 Pro). Si votre &eacute;quipe vit dans Google Workspace, Gemini est un choix pertinent. Faiblesses : la qualit&eacute; de g&eacute;n&eacute;ration de texte commercial est inf&eacute;rieure &agrave; Claude et ChatGPT, l&apos;&eacute;cosyst&egrave;me tiers est limit&eacute;, et les outils de prompt engineering sont moins matures. Pricing : Gemini Advanced &agrave; 21,99 USD/mois, API &agrave; partir de 1,25 USD / million de tokens pour Gemini 1.5 Pro.
              </p>

              {/* Comparison table */}
              <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5 mb-6 overflow-x-auto">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Comparaison sur 12 crit&egrave;res</p>
                <table className="w-full text-[11px] min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#EAEAEA]">
                      <th className="text-left py-2 pr-4 text-[#999] font-semibold">Crit&egrave;re</th>
                      <th className="text-center py-2 px-3 text-[#6D00CC] font-semibold">Claude</th>
                      <th className="text-center py-2 px-3 text-[#111] font-semibold">ChatGPT</th>
                      <th className="text-center py-2 px-3 text-[#4285F4] font-semibold">Gemini</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#555]">
                    {[
                      { c: "Raisonnement complexe", claude: "Excellent", gpt: "Tr\u00e8s bon", gemini: "Bon" },
                      { c: "R\u00e9daction commerciale", claude: "Excellent", gpt: "Tr\u00e8s bon", gemini: "Bon" },
                      { c: "Suivi d\u2019instructions", claude: "Excellent", gpt: "Bon", gemini: "Bon" },
                      { c: "Contexte long", claude: "200K tokens", gpt: "128K tokens", gemini: "1M tokens" },
                      { c: "Vitesse de r\u00e9ponse", claude: "Rapide", gpt: "Tr\u00e8s rapide", gemini: "Rapide" },
                      { c: "Multimodal", claude: "Bon", gpt: "Tr\u00e8s bon", gemini: "Excellent" },
                      { c: "Int\u00e9grations tierces", claude: "MCP (croissant)", gpt: "Plugins (large)", gemini: "Google Workspace" },
                      { c: "Confidentialit\u00e9", claude: "Excellent", gpt: "Bon (opt-out)", gemini: "Bon" },
                      { c: "Analyse de fichiers", claude: "Bon", gpt: "Excellent (Code Int.)", gemini: "Bon" },
                      { c: "Hallucinations", claude: "Tr\u00e8s rares", gpt: "Rares", gemini: "Mod\u00e9r\u00e9es" },
                      { c: "Prix API (1M tokens)", claude: "3 USD (Sonnet)", gpt: "2,50 USD (4o)", gemini: "1,25 USD (1.5 Pro)" },
                      { c: "Facilit\u00e9 d\u2019usage", claude: "Tr\u00e8s simple", gpt: "Tr\u00e8s simple", gemini: "Simple" },
                    ].map((row) => (
                      <tr key={row.c} className="border-b border-[#F0F0F0]">
                        <td className="py-2 pr-4 font-medium text-[#111]">{row.c}</td>
                        <td className="py-2 px-3 text-center">{row.claude}</td>
                        <td className="py-2 px-3 text-center">{row.gpt}</td>
                        <td className="py-2 px-3 text-center">{row.gemini}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Decision matrix */}
              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Matrice de d&eacute;cision par cas d&apos;usage</h3>
              <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5 mb-6">
                <div className="space-y-2">
                  {[
                    { use: "Enrichissement de contacts", rec: "Claude", why: "Meilleure compr\u00e9hension contextuelle, moins d\u2019hallucinations" },
                    { use: "R\u00e9daction d\u2019emails", rec: "Claude", why: "Ton plus naturel, meilleur suivi du framework de prompt" },
                    { use: "Analyse de fichiers Excel", rec: "ChatGPT", why: "Code Interpreter natif pour manipuler les donn\u00e9es" },
                    { use: "R\u00e9sum\u00e9 de calls", rec: "Claude", why: "Contexte long pour les transcriptions, extraction structur\u00e9e" },
                    { use: "Scoring pr\u00e9dictif", rec: "Claude", why: "Raisonnement sup\u00e9rieur pour l\u2019analyse multi-crit\u00e8res" },
                    { use: "Analyse de documents", rec: "Gemini", why: "Contexte 1M tokens, int\u00e9gration Google Docs" },
                    { use: "Coaching commercial", rec: "Claude", why: "Feedback plus nuanc\u00e9, meilleure compr\u00e9hension des dynamiques" },
                    { use: "Automatisation Make", rec: "Claude", why: "API stable, r\u00e9ponses structur\u00e9es fiables" },
                  ].map((m) => (
                    <div key={m.use} className="flex items-start gap-3 py-2 border-b border-[#F0F0F0] last:border-0">
                      <p className="text-[12px] font-medium text-[#111] w-[180px] shrink-0">{m.use}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium shrink-0 ${m.rec === "Claude" ? "bg-[#6D00CC]/10 text-[#6D00CC]" : m.rec === "ChatGPT" ? "bg-[#111]/10 text-[#111]" : "bg-[#4285F4]/10 text-[#4285F4]"}`}>{m.rec}</span>
                      <p className="text-[11px] text-[#777]">{m.why}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Ceres chose Claude */}
              <div className="rounded-lg bg-[#6D00CC]/5 border border-[#6D00CC]/15 p-5">
                <h4 className="text-[13px] font-semibold text-[#6D00CC] mb-2">Pourquoi Ceres a choisi Claude</h4>
                <p className="text-[13px] text-[#555] leading-[1.75]">
                  Apr&egrave;s avoir test&eacute; les trois mod&egrave;les sur des centaines de cas d&apos;usage commerciaux, nous avons choisi Claude comme mod&egrave;le par d&eacute;faut pour trois raisons : le MCP (Model Context Protocol) qui permet une int&eacute;gration directe avec HubSpot, Notion et les outils business sans d&eacute;veloppement custom, la qualit&eacute; de raisonnement sur les donn&eacute;es commerciales complexes (scoring, analyse win/loss, forecasting), et Claude Code qui nous permet de construire et it&eacute;rer rapidement sur nos agents IA. Cela ne signifie pas que Claude est le meilleur dans tous les cas : nous utilisons ChatGPT pour l&apos;analyse de fichiers Excel complexes et Gemini pour le traitement de documents Google Workspace massifs.
                </p>
              </div>
            </div>
          </section>

          <Connector />

          {/* ========================================================== */}
          {/*  CHAPTER 4                                                  */}
          {/* ========================================================== */}
          <section id="ch4" className="scroll-mt-[100px] mb-10">
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[13px] font-bold shrink-0">04</div>
                <div>
                  <p className="text-[10px] text-[#CCC] uppercase tracking-wider">Chapitre 4 &mdash; p. 23-26</p>
                  <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em]">Enrichissement IA en pratique</h2>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Le workflow Clay + Claude &eacute;tape par &eacute;tape</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Clay est l&apos;outil d&apos;enrichissement le plus puissant du march&eacute; pour les &eacute;quipes commerciales B2B. Sa force : il connecte plus de 75 sources de donn&eacute;es (LinkedIn, Clearbit, Apollo, sites web, etc.) et permet d&apos;ajouter des colonnes IA qui utilisent Claude pour analyser et synth&eacute;tiser les donn&eacute;es collect&eacute;es. Voici le workflow complet, de l&apos;import &agrave; l&apos;export vers votre CRM.
              </p>

              <p className="text-[14px] text-[#555] leading-[1.8] mb-2">
                <strong className="text-[#111]">&Eacute;tape 1 : Import des contacts.</strong> Importez votre liste depuis votre CRM (HubSpot, Salesforce) ou un fichier CSV. Clay se synchronise nativement avec HubSpot pour un import en temps r&eacute;el. Assurez-vous d&apos;avoir au minimum le nom, le pr&eacute;nom, l&apos;email et l&apos;entreprise.
              </p>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-2">
                <strong className="text-[#111]">&Eacute;tape 2 : Enrichissement classique.</strong> Ajoutez les colonnes d&apos;enrichissement standard : profil LinkedIn (via l&apos;email), taille d&apos;entreprise, secteur, technologies utilis&eacute;es (BuiltWith), lev&eacute;es de fonds r&eacute;centes (Crunchbase), offres d&apos;emploi (pour d&eacute;tecter la croissance).
              </p>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-2">
                <strong className="text-[#111]">&Eacute;tape 3 : Colonnes IA avec Claude.</strong> C&apos;est l&agrave; que la magie op&egrave;re. Ajoutez des colonnes &laquo; AI Enrichment &raquo; qui utilisent Claude pour analyser les donn&eacute;es collect&eacute;es et g&eacute;n&eacute;rer des insights.
              </p>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                <strong className="text-[#111]">&Eacute;tape 4 : Export vers le CRM.</strong> Configurez un push automatique vers HubSpot (ou export CSV pour Salesforce). Les champs enrichis se mappent directement sur les propri&eacute;t&eacute;s de contact dans votre CRM.
              </p>

              {/* Clay mockup table */}
              <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5 mb-6 overflow-x-auto">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Aper&ccedil;u d&apos;un tableau Clay enrichi par IA</p>
                <table className="w-full text-[11px] min-w-[700px]">
                  <thead>
                    <tr className="border-b-2 border-[#EAEAEA]">
                      <th className="text-left py-2 pr-3 text-[#999] font-semibold">Nom</th>
                      <th className="text-left py-2 pr-3 text-[#999] font-semibold">Entreprise</th>
                      <th className="text-left py-2 pr-3 text-[#999] font-semibold">Taille</th>
                      <th className="text-left py-2 pr-3 text-[#6D00CC] font-semibold">Contexte IA</th>
                      <th className="text-left py-2 pr-3 text-[#6D00CC] font-semibold">Icebreaker IA</th>
                      <th className="text-left py-2 text-[#6D00CC] font-semibold">Pain points IA</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#555]">
                    <tr className="border-b border-[#F0F0F0]">
                      <td className="py-2 pr-3 font-medium text-[#111]">Marie D.</td>
                      <td className="py-2 pr-3">Qonto</td>
                      <td className="py-2 pr-3">450</td>
                      <td className="py-2 pr-3 text-[#6D00CC]">S&eacute;rie C en 2024, expansion EU, recrutement SDR massif</td>
                      <td className="py-2 pr-3 text-[#6D00CC]">Votre expansion EU doit cr&eacute;er des d&eacute;fis d&apos;harmonisation des process sales</td>
                      <td className="py-2 text-[#6D00CC]">Scaling &eacute;quipe, process multi-pays, reporting consolid&eacute;</td>
                    </tr>
                    <tr className="border-b border-[#F0F0F0]">
                      <td className="py-2 pr-3 font-medium text-[#111]">Thomas L.</td>
                      <td className="py-2 pr-3">Doctolib</td>
                      <td className="py-2 pr-3">2800</td>
                      <td className="py-2 pr-3 text-[#6D00CC]">Lancement B2B entreprises, pivot strat&eacute;gique, CRO en poste depuis 6 mois</td>
                      <td className="py-2 pr-3 text-[#6D00CC]">Le pivot B2B entreprises est un virage passionnant pour vos &eacute;quipes sales</td>
                      <td className="py-2 text-[#6D00CC]">Nouveau segment, formation &eacute;quipe, attribution marketing</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-medium text-[#111]">Sarah M.</td>
                      <td className="py-2 pr-3">Payfit</td>
                      <td className="py-2 pr-3">1100</td>
                      <td className="py-2 pr-3 text-[#6D00CC]">Restructuration 2025, focus rentabilit&eacute;, nouveau VP Sales</td>
                      <td className="py-2 pr-3 text-[#6D00CC]">Le focus rentabilit&eacute; implique souvent d&apos;optimiser chaque &eacute;tape du funnel</td>
                      <td className="py-2 text-[#6D00CC]">Efficacit&eacute; commerciale, r&eacute;duction CAC, pr&eacute;dictibilit&eacute; pipeline</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-[10px] text-[#CCC] mt-3">Les colonnes en violet sont g&eacute;n&eacute;r&eacute;es automatiquement par Claude via Clay</p>
              </div>

              {/* Prompt */}
              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Prompt d&apos;enrichissement pour Clay + Claude</h3>
              <div className="rounded-lg bg-[#1a1a2e] p-4 mb-6">
                <pre className="text-[11px] text-[#E0E0E0] leading-[1.7] whitespace-pre-wrap font-mono">{`Tu es un expert en prospection B2B. A partir des informations
suivantes sur un contact et son entreprise, genere :

1. CONTEXTE (2-3 phrases) : resume le contexte business actuel
   de l'entreprise (actualites, croissance, defis probables)
2. ICEBREAKER (1 phrase, max 25 mots) : une accroche
   personnalisee pour un cold email, qui reference un element
   specifique et recent
3. PAIN POINTS (3 bullet points) : les problematiques
   probables liees a notre solution

Regles :
- Sois factuel, ne fabrique pas d'informations
- Ton professionnel mais humain
- Si une information manque, indique "Donnee non disponible"
- Ne mentionne jamais LinkedIn ou le fait d'avoir "recherche"

Donnees du contact :
- Nom : {first_name} {last_name}
- Poste : {job_title}
- Entreprise : {company_name}
- Secteur : {industry}
- Taille : {company_size} employes
- Site web : {website_summary}
- Actualites recentes : {recent_news}
- Technologies : {tech_stack}`}</pre>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Volume : enrichir 1 000 contacts en 30 minutes</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Clay ex&eacute;cute les enrichissements en parall&egrave;le. Un enrichissement standard (LinkedIn + entreprise) prend environ 2 secondes par contact. L&apos;enrichissement IA via Claude prend environ 3-5 secondes par contact. Pour 1 000 contacts : l&apos;enrichissement classique prend environ 10 minutes, l&apos;enrichissement IA environ 20 minutes suppl&eacute;mentaires. Total : environ 30 minutes pour une liste compl&egrave;tement enrichie avec des insights IA personnalis&eacute;s. Le co&ucirc;t API Claude pour 1 000 enrichissements est d&apos;environ 3 &agrave; 5 euros.
              </p>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Contr&ocirc;le qualit&eacute; et validation</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                L&apos;IA n&apos;est pas infaillible. Mettez en place ces contr&ocirc;les : v&eacute;rifiez un &eacute;chantillon de 20 contacts avant de lancer un enrichissement massif, filtrez les r&eacute;sultats o&ugrave; Claude indique &laquo; donn&eacute;e non disponible &raquo; pour un enrichissement manuel compl&eacute;mentaire, et cr&eacute;ez un champ &laquo; qualit&eacute; enrichissement &raquo; dans votre CRM (A/B/C) pour tracker la pertinence au fil du temps.
              </p>

              <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                <h4 className="text-[12px] font-semibold text-[#111] mb-2">Alternative : Lemlist AI Enrichment</h4>
                <p className="text-[12px] text-[#777] leading-[1.65]">
                  Si vous utilisez d&eacute;j&agrave; Lemlist pour vos s&eacute;quences, leur enrichissement IA int&eacute;gr&eacute; est une alternative plus simple. Moins puissant que Clay (moins de sources, personnalisation limit&eacute;e des prompts), mais l&apos;avantage est l&apos;int&eacute;gration native : l&apos;enrichissement alimente directement les variables de vos s&eacute;quences email. Id&eacute;al pour les &eacute;quipes de moins de 5 SDR qui veulent rester dans un seul outil.
                </p>
              </div>
            </div>
          </section>

          <Connector />

          {/* ========================================================== */}
          {/*  CHAPTER 5                                                  */}
          {/* ========================================================== */}
          <section id="ch5" className="scroll-mt-[100px] mb-10">
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[13px] font-bold shrink-0">05</div>
                <div>
                  <p className="text-[10px] text-[#CCC] uppercase tracking-wider">Chapitre 5 &mdash; p. 27-30</p>
                  <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em]">Emails personnalis&eacute;s par IA</h2>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Le framework de prompt pour les emails commerciaux</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Un bon prompt email suit une structure pr&eacute;cise que nous appelons le framework CREO : Contexte (qui est le prospect, son entreprise, ses enjeux), R&egrave;gles (ton, longueur, &eacute;l&eacute;ments &agrave; &eacute;viter, contraintes), Exemples (2-3 emails r&eacute;ussis pass&eacute;s pour calibrer le ton et le style), Output (format exact attendu : objet + corps + CTA). Ce framework garantit une coh&eacute;rence de qualit&eacute; &agrave; l&apos;&eacute;chelle.
              </p>

              {/* Prompt examples */}
              <h4 className="text-[13px] font-semibold text-[#111] mb-3">Prompt 1 : Cold email premier contact</h4>
              <div className="rounded-lg bg-[#1a1a2e] p-4 mb-4">
                <pre className="text-[11px] text-[#E0E0E0] leading-[1.7] whitespace-pre-wrap font-mono">{`Tu es un SDR senior en B2B SaaS. Redige un cold email
de premier contact.

CONTEXTE PROSPECT :
- Nom : {first_name} {last_name}, {job_title}
- Entreprise : {company_name} ({industry}, {size} employes)
- Enjeu identifie : {pain_point}
- Icebreaker : {icebreaker}

REGLES :
- Maximum 120 mots (corps uniquement)
- Ton : direct, professionnel, pas de flatterie
- Structure : icebreaker (1 phrase) + constat/probleme
  (2 phrases) + proposition de valeur (1 phrase) + CTA
  question ouverte (1 phrase)
- PAS de "j'espere que vous allez bien"
- PAS de liste de features
- PAS de "je me permets de vous contacter"
- Tutoiement SI la personne a moins de 35 ans et
  est dans la tech, sinon vouvoiement

OUTPUT : Objet (max 6 mots) + Corps de l'email`}</pre>
              </div>

              <h4 className="text-[13px] font-semibold text-[#111] mb-3">Prompt 2 : Follow-up apr&egrave;s non-r&eacute;ponse</h4>
              <div className="rounded-lg bg-[#1a1a2e] p-4 mb-4">
                <pre className="text-[11px] text-[#E0E0E0] leading-[1.7] whitespace-pre-wrap font-mono">{`Redige un email de relance (follow-up #2) pour un
prospect qui n'a pas repondu au premier email.

CONTEXTE :
- Premier email envoye il y a 5 jours
- Sujet du premier email : {first_email_subject}
- Proposition de valeur : {value_prop}

REGLES :
- Maximum 80 mots
- Ne PAS repeter le premier email
- Apporter un element de valeur nouveau (stat, insight,
  cas client anonymise)
- CTA encore plus simple (oui/non, choix binaire)
- Ton leger, pas de culpabilisation
- Ne jamais dire "je me permets de relancer"

OUTPUT : Objet court + Corps`}</pre>
              </div>

              <h4 className="text-[13px] font-semibold text-[#111] mb-3">Prompt 3 : Email post-event/webinar</h4>
              <div className="rounded-lg bg-[#1a1a2e] p-4 mb-4">
                <pre className="text-[11px] text-[#E0E0E0] leading-[1.7] whitespace-pre-wrap font-mono">{`Redige un email de suivi pour un participant a notre
dernier webinar/event.

CONTEXTE :
- Event : {event_name}
- Theme : {event_topic}
- Participation : {attended_live / watched_replay}
- Profil : {first_name}, {job_title} chez {company}

REGLES :
- Faire reference a un point specifique du webinar
- Proposer une ressource complementaire
- CTA vers un echange de 15 min (pas de demo)
- Maximum 100 mots
- Ton chaleureux mais pas familier`}</pre>
              </div>

              <h4 className="text-[13px] font-semibold text-[#111] mb-3">Prompt 4 : Email de reactivation (deal perdu)</h4>
              <div className="rounded-lg bg-[#1a1a2e] p-4 mb-4">
                <pre className="text-[11px] text-[#E0E0E0] leading-[1.7] whitespace-pre-wrap font-mono">{`Redige un email pour reactiver un prospect dont le deal
a ete perdu il y a 3-6 mois.

CONTEXTE :
- Raison de perte : {loss_reason}
- Derniere interaction : {last_interaction_date}
- Ce qui a change depuis : {what_changed}

REGLES :
- Reconnaitre le timing precedent sans s'excuser
- Presenter ce qui a change (nouvelle feature, nouveau
  pricing, cas client similaire)
- Maximum 90 mots
- CTA : proposer un quick call de 10 min
- Pas de pression, ton respectueux`}</pre>
              </div>

              <h4 className="text-[13px] font-semibold text-[#111] mb-3">Prompt 5 : Intro par referral</h4>
              <div className="rounded-lg bg-[#1a1a2e] p-4 mb-6">
                <pre className="text-[11px] text-[#E0E0E0] leading-[1.7] whitespace-pre-wrap font-mono">{`Redige un email d'introduction via un referral
(recommandation d'un client existant).

CONTEXTE :
- Referral : {referrer_name} ({referrer_company})
- Prospect : {prospect_name}, {job_title}
- Point commun : {common_ground}
- Resultat obtenu avec le referrer : {result}

REGLES :
- Mentionner le referral des la premiere phrase
- Etre specifique sur le resultat obtenu (chiffre)
- Maximum 100 mots
- CTA souple : "Si ca fait sens, on pourrait
  echanger 15 min cette semaine ?"
- Ton confiant mais pas arrogant`}</pre>
              </div>

              {/* Before/After comparison */}
              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Avant / Apr&egrave;s : email g&eacute;n&eacute;rique vs email IA</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg border border-red-200 bg-red-50/50 p-4">
                  <p className="text-[11px] font-semibold text-red-500 mb-2">AVANT : Email g&eacute;n&eacute;rique</p>
                  <div className="text-[12px] text-[#555] leading-[1.7] space-y-2">
                    <p><strong>Objet :</strong> Solution CRM pour votre entreprise</p>
                    <p>Bonjour Marie,</p>
                    <p>Je me permets de vous contacter car je pense que notre solution pourrait vous int&eacute;resser. Nous aidons les entreprises comme la v&ocirc;tre &agrave; am&eacute;liorer leur processus commercial gr&acirc;ce &agrave; notre plateforme tout-en-un.</p>
                    <p>Nos fonctionnalit&eacute;s incluent : gestion de pipeline, reporting automatis&eacute;, int&eacute;gration email...</p>
                    <p>Seriez-vous disponible pour un call de 30 min ?</p>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[10px] text-red-400">
                    <span>Taux de r&eacute;ponse : 1,8%</span>
                  </div>
                </div>
                <div className="rounded-lg border border-green-200 bg-green-50/50 p-4">
                  <p className="text-[11px] font-semibold text-green-600 mb-2">APRES : Email personnalis&eacute; par IA</p>
                  <div className="text-[12px] text-[#555] leading-[1.7] space-y-2">
                    <p><strong>Objet :</strong> Scaling EU et process sales</p>
                    <p>Marie,</p>
                    <p>L&apos;expansion europ&eacute;enne de Qonto implique de structurer les process sales pour chaque march&eacute; sans perdre en v&eacute;locit&eacute;. C&apos;est souvent l&agrave; que le pipeline devient opaque.</p>
                    <p>On a aid&eacute; une fintech de taille similaire &agrave; r&eacute;duire leur cycle de vente de 22% en harmonisant leur RevOps sur 3 pays.</p>
                    <p>Est-ce que l&apos;harmonisation des process est un sujet chez vous en ce moment ?</p>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[10px] text-green-500">
                    <span>Taux de r&eacute;ponse : 11,4%</span>
                  </div>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">M&eacute;thodologie A/B testing pour les emails IA</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                L&apos;IA ne remplace pas le testing, elle l&apos;acc&eacute;l&egrave;re. Voici notre m&eacute;thodologie : cr&eacute;ez 3 variantes de prompt avec des approches diff&eacute;rentes (direct vs storytelling vs question), testez chaque variante sur un &eacute;chantillon de 100 prospects minimum, mesurez le taux d&apos;ouverture, de r&eacute;ponse et de conversion en meeting, identifiez la variante gagnante en 2 semaines puis d&eacute;ployez &agrave; l&apos;&eacute;chelle. Recommencez chaque mois car les approches s&apos;usent avec le temps.
              </p>

              <div className="rounded-lg bg-[#22C55E]/5 border border-[#22C55E]/15 p-5">
                <h4 className="text-[13px] font-semibold text-[#22C55E] mb-2">R&eacute;sultats des campagnes Ceres</h4>
                <p className="text-[13px] text-[#555] leading-[1.75]">
                  Sur l&apos;ensemble de nos campagnes clients entre janvier et mars 2026, le passage d&apos;emails templat&eacute;s &agrave; des emails personnalis&eacute;s par IA a produit les r&eacute;sultats suivants : taux de r&eacute;ponse moyen pass&eacute; de 2,1% &agrave; 11,8% (x5,6), taux de booking meeting pass&eacute; de 0,8% &agrave; 4,2% (x5,2), co&ucirc;t par meeting r&eacute;duit de 340 euros &agrave; 65 euros (-81%). Le volume de personnalisation rendu possible par l&apos;IA est le facteur cl&eacute; : chaque email est unique, ce qui &eacute;tait impossible manuellement &agrave; l&apos;&eacute;chelle.
                </p>
              </div>
            </div>
          </section>

          <Connector />

          {/* ========================================================== */}
          {/*  CHAPTER 6                                                  */}
          {/* ========================================================== */}
          <section id="ch6" className="scroll-mt-[100px] mb-10">
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[13px] font-bold shrink-0">06</div>
                <div>
                  <p className="text-[10px] text-[#CCC] uppercase tracking-wider">Chapitre 6 &mdash; p. 31-33</p>
                  <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em]">R&eacute;sum&eacute; de calls et intelligence commerciale</h2>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Setup : Claap/Modjo/Gong + Claude</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                L&apos;architecture est simple : un outil d&apos;enregistrement et de transcription (Claap pour les &eacute;quipes fran&ccedil;aises, Modjo pour les mid-market, Gong pour les enterprise) g&eacute;n&egrave;re une transcription textuelle de chaque call. Cette transcription est ensuite envoy&eacute;e &agrave; Claude via une API (ou via un workflow Make) pour une analyse structur&eacute;e. Claap et Modjo proposent des int&eacute;grations natives avec les LLM, mais l&apos;utilisation directe de Claude via Make offre plus de contr&ocirc;le sur le format et le contenu de l&apos;analyse.
              </p>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Ce qu&apos;il faut extraire de chaque call</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Un bon r&eacute;sum&eacute; de call ne se limite pas &agrave; une synth&egrave;se. Il doit extraire des informations structur&eacute;es et actionnables. Voici les 6 dimensions que nous recommandons d&apos;extraire syst&eacute;matiquement : le r&eacute;sum&eacute; ex&eacute;cutif (3-5 phrases sur les points cl&eacute;s), les actions &agrave; suivre (avec responsable et deadline), le sentiment du prospect (de 1 &agrave; 5, avec justification), les objections identifi&eacute;es (avec la r&eacute;ponse apport&eacute;e ou non), les signaux d&apos;achat (urgence, budget confirm&eacute;, timeline mentionn&eacute;e, d&eacute;cideur impliqu&eacute;) et les informations de qualification (BANT/MEDDIC mis &agrave; jour).
              </p>

              {/* Call summary mockup */}
              <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5 mb-6">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Exemple de r&eacute;sum&eacute; structur&eacute; g&eacute;n&eacute;r&eacute; par Claude</p>
                <div className="space-y-4">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-3">
                    <p className="text-[10px] font-semibold text-[#6D00CC] uppercase tracking-wider mb-1">R&eacute;sum&eacute; ex&eacute;cutif</p>
                    <p className="text-[12px] text-[#555] leading-[1.65]">
                      Call de d&eacute;couverte avec Marie D. (VP Sales, Qonto). L&apos;&eacute;quipe de 12 AE rencontre des probl&egrave;mes de visibilit&eacute; pipeline et de pr&eacute;dictibilit&eacute; du forecast. Utilise HubSpot Sales Hub Pro mais pas de RevOps en place. Budget valid&eacute; pour Q2 2026, d&eacute;cision attendue fin avril. Int&eacute;ress&eacute;e par le scoring IA et le reporting automatis&eacute;.
                    </p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-3">
                    <p className="text-[10px] font-semibold text-[#22C55E] uppercase tracking-wider mb-1">Actions &agrave; suivre</p>
                    <div className="space-y-1 text-[12px] text-[#555]">
                      <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> Envoyer case study fintech - Responsable : nous - Deadline : 28 mars</p>
                      <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> Planifier d&eacute;mo technique avec le Head of Ops - Responsable : Marie - Deadline : 2 avril</p>
                      <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> Pr&eacute;parer proposition commerciale - Responsable : nous - Deadline : 4 avril</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white border border-[#EAEAEA] p-3">
                      <p className="text-[10px] font-semibold text-[#FF7A59] uppercase tracking-wider mb-1">Objections</p>
                      <div className="space-y-1 text-[12px] text-[#555]">
                        <p>&laquo; On a d&eacute;j&agrave; essay&eacute; des outils de reporting, &ccedil;a n&apos;a pas march&eacute; &raquo; - R&eacute;pondu avec cas client</p>
                        <p>&laquo; Notre &eacute;quipe est r&eacute;sistante au changement &raquo; - Non r&eacute;pondu (aborder en d&eacute;mo)</p>
                      </div>
                    </div>
                    <div className="rounded-lg bg-white border border-[#EAEAEA] p-3">
                      <p className="text-[10px] font-semibold text-[#4B5EFC] uppercase tracking-wider mb-1">Signaux d&apos;achat</p>
                      <div className="space-y-1 text-[12px] text-[#555]">
                        <p className="flex items-center gap-1"><span className="text-[#22C55E]">+</span> Budget confirm&eacute; Q2 2026</p>
                        <p className="flex items-center gap-1"><span className="text-[#22C55E]">+</span> Timeline : d&eacute;cision fin avril</p>
                        <p className="flex items-center gap-1"><span className="text-[#22C55E]">+</span> A demand&eacute; un pricing d&eacute;taill&eacute;</p>
                        <p className="flex items-center gap-1"><span className="text-[#FF7A59]">-</span> D&eacute;cideur technique pas encore impliqu&eacute;</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-3">
                    <p className="text-[10px] font-semibold text-[#999] uppercase tracking-wider mb-1">Sentiment &amp; scoring</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-[12px] text-[#555]">Sentiment :</span>
                        <div className="flex gap-0.5">
                          {[1,2,3,4].map((i) => <div key={i} className="w-2 h-2 rounded-full bg-[#22C55E]" />)}
                          <div className="w-2 h-2 rounded-full bg-[#E8E8E8]" />
                        </div>
                        <span className="text-[11px] font-semibold text-[#111]">4/5</span>
                      </div>
                      <div className="text-[12px] text-[#555]">Probabilit&eacute; : <strong className="text-[#22C55E]">65%</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Workflow automatis&eacute; : call &rarr; CRM</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Le workflow complet fonctionne ainsi : le commercial termine son call, Claap g&eacute;n&egrave;re automatiquement la transcription (2-3 minutes), un webhook d&eacute;clenche le workflow Make, Make envoie la transcription &agrave; Claude avec le prompt d&apos;extraction, Claude retourne l&apos;analyse structur&eacute;e en JSON, Make cr&eacute;e une note dans HubSpot avec le r&eacute;sum&eacute; format&eacute;, met &agrave; jour les propri&eacute;t&eacute;s du deal (stade, prochaine action, probabilit&eacute;), et envoie une notification Slack au manager si des signaux critiques sont d&eacute;tect&eacute;s. Le tout prend moins de 5 minutes apr&egrave;s la fin du call, sans aucune intervention du commercial.
              </p>

              {/* Make workflow diagram mockup */}
              <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Workflow Make : Call &rarr; Analyse &rarr; CRM</p>
                <div className="flex items-center justify-between gap-2 overflow-x-auto">
                  {[
                    { label: "Claap Webhook", sub: "Transcription pr\u00eate", color: "#4B5EFC" },
                    { label: "Claude API", sub: "Analyse structur\u00e9e", color: "#6D00CC" },
                    { label: "Router", sub: "JSON parsing", color: "#FF7A59" },
                    { label: "HubSpot", sub: "Cr\u00e9er note + MAJ deal", color: "#FF7A59" },
                    { label: "Slack", sub: "Notification manager", color: "#22C55E" },
                  ].map((step, i) => (
                    <div key={step.label} className="flex items-center gap-2">
                      <div className="w-[120px] rounded-lg border border-[#EAEAEA] bg-white p-2.5 text-center shrink-0">
                        <div className="w-6 h-6 rounded-md mx-auto mb-1.5 flex items-center justify-center text-white text-[9px] font-bold" style={{ background: step.color }}>{i + 1}</div>
                        <p className="text-[10px] font-semibold text-[#111]">{step.label}</p>
                        <p className="text-[9px] text-[#999]">{step.sub}</p>
                      </div>
                      {i < 4 && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#CCC" strokeWidth="1.5" strokeLinecap="round" className="shrink-0"><path d="M4 8h8M10 5l3 3-3 3" /></svg>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Connector />

          {/* ========================================================== */}
          {/*  CHAPTER 7                                                  */}
          {/* ========================================================== */}
          <section id="ch7" className="scroll-mt-[100px] mb-10">
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[13px] font-bold shrink-0">07</div>
                <div>
                  <p className="text-[10px] text-[#CCC] uppercase tracking-wider">Chapitre 7 &mdash; p. 34-37</p>
                  <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em]">Agents IA avec Make + Claude</h2>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Qu&apos;est-ce qu&apos;un agent IA ?</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Un agent IA se distingue d&apos;un simple prompt par son autonomie. Un prompt ex&eacute;cute une t&acirc;che unique &agrave; la demande. Un agent observe, d&eacute;cide et agit de mani&egrave;re continue sans intervention humaine. Il y a 4 niveaux d&apos;autonomie : Niveau 1 (r&eacute;actif), l&apos;agent r&eacute;pond &agrave; un trigger (nouveau contact, formulaire soumis). Niveau 2 (proactif), l&apos;agent surveille des conditions et agit quand elles sont remplies (deal bloqu&eacute; depuis 10 jours). Niveau 3 (adaptatif), l&apos;agent ajuste son comportement en fonction des r&eacute;sultats (si le taux de r&eacute;ponse baisse, il modifie son approche). Niveau 4 (strat&eacute;gique), l&apos;agent prend des d&eacute;cisions complexes qui impactent le pipeline (allocation des leads, pricing dynamique). Nous allons construire 3 agents de niveaux 1 et 2, qui sont les plus adapt&eacute;s pour commencer.
              </p>

              {/* Agent 1 */}
              <div className="rounded-lg bg-[#111] p-5 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#6D00CC] text-white font-medium">Agent 1</span>
                  <h4 className="text-[14px] font-semibold text-white">Agent de qualification</h4>
                </div>
                <p className="text-[13px] text-white/60 leading-[1.75] mb-4">
                  Cet agent qualifie automatiquement chaque nouveau lead qui soumet un formulaire sur votre site. Il analyse les donn&eacute;es du formulaire, enrichit le profil via Clay, applique votre matrice de scoring ICP et route le lead vers le bon commercial avec un r&eacute;sum&eacute; complet.
                </p>
                <div className="rounded-lg bg-white/5 p-4 mb-3">
                  <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-3">Workflow Make</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { label: "Webhook", sub: "Formulaire soumis" },
                      { label: "Clay", sub: "Enrichissement" },
                      { label: "Claude", sub: "Scoring + analyse" },
                      { label: "Router", sub: "Score > 70 ?" },
                      { label: "HubSpot", sub: "Cr\u00e9er contact + deal" },
                      { label: "Slack", sub: "Notifier le commercial" },
                    ].map((s, i) => (
                      <div key={s.label} className="flex items-center gap-2">
                        <div className="rounded-md bg-white/10 px-2.5 py-1.5 text-center">
                          <p className="text-[10px] font-semibold text-white">{s.label}</p>
                          <p className="text-[8px] text-white/40">{s.sub}</p>
                        </div>
                        {i < 5 && <span className="text-white/20 text-[10px]">&rarr;</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-[9px] text-white/40">Trigger</p>
                    <p className="text-[11px] text-white font-medium">Formulaire web</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-[9px] text-white/40">Output</p>
                    <p className="text-[11px] text-white font-medium">Lead qualifi&eacute; + rout&eacute;</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-[9px] text-white/40">Setup</p>
                    <p className="text-[11px] text-white font-medium">4 heures</p>
                  </div>
                </div>
              </div>

              {/* Agent 2 */}
              <div className="rounded-lg bg-[#111] p-5 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#4B5EFC] text-white font-medium">Agent 2</span>
                  <h4 className="text-[14px] font-semibold text-white">Agent d&apos;enrichissement continu</h4>
                </div>
                <p className="text-[13px] text-white/60 leading-[1.75] mb-4">
                  Chaque fois qu&apos;un nouveau contact est cr&eacute;&eacute; dans HubSpot (import, formulaire, API), cet agent se d&eacute;clenche automatiquement. Il enrichit le contact via Clay, g&eacute;n&egrave;re les insights IA via Claude et met &agrave; jour la fiche HubSpot avec toutes les donn&eacute;es enrichies. Plus jamais de fiches contacts vides.
                </p>
                <div className="rounded-lg bg-white/5 p-4 mb-3">
                  <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-3">Workflow Make</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { label: "HubSpot", sub: "Nouveau contact" },
                      { label: "Filtre", sub: "Email pro uniquement" },
                      { label: "Clay", sub: "Enrichissement 75+ sources" },
                      { label: "Claude", sub: "Contexte + icebreaker + pain points" },
                      { label: "HubSpot", sub: "MAJ propri\u00e9t\u00e9s contact" },
                    ].map((s, i) => (
                      <div key={s.label + i} className="flex items-center gap-2">
                        <div className="rounded-md bg-white/10 px-2.5 py-1.5 text-center">
                          <p className="text-[10px] font-semibold text-white">{s.label}</p>
                          <p className="text-[8px] text-white/40">{s.sub}</p>
                        </div>
                        {i < 4 && <span className="text-white/20 text-[10px]">&rarr;</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-[9px] text-white/40">Trigger</p>
                    <p className="text-[11px] text-white font-medium">Nouveau contact CRM</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-[9px] text-white/40">Output</p>
                    <p className="text-[11px] text-white font-medium">Fiche enrichie IA</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-[9px] text-white/40">Setup</p>
                    <p className="text-[11px] text-white font-medium">3 heures</p>
                  </div>
                </div>
              </div>

              {/* Agent 3 */}
              <div className="rounded-lg bg-[#111] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#22C55E] text-white font-medium">Agent 3</span>
                  <h4 className="text-[14px] font-semibold text-white">Agent de r&eacute;sum&eacute; de calls</h4>
                </div>
                <p className="text-[13px] text-white/60 leading-[1.75] mb-4">
                  Cet agent traite automatiquement chaque transcription de call. Il g&eacute;n&egrave;re le r&eacute;sum&eacute; structur&eacute; (cf. chapitre 6), cr&eacute;e une note dans HubSpot rattach&eacute;e au deal, met &agrave; jour le stade du deal si des signaux forts sont d&eacute;tect&eacute;s, et alerte le manager en cas d&apos;objection non r&eacute;solue ou de risque de churn.
                </p>
                <div className="rounded-lg bg-white/5 p-4 mb-3">
                  <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-3">Workflow Make</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {[
                      { label: "Claap", sub: "Transcription pr\u00eate" },
                      { label: "Claude", sub: "Analyse 6 dimensions" },
                      { label: "JSON Parse", sub: "Extraction structur\u00e9e" },
                      { label: "HubSpot", sub: "Note + MAJ deal" },
                      { label: "Slack", sub: "Alerte si risque" },
                    ].map((s, i) => (
                      <div key={s.label} className="flex items-center gap-2">
                        <div className="rounded-md bg-white/10 px-2.5 py-1.5 text-center">
                          <p className="text-[10px] font-semibold text-white">{s.label}</p>
                          <p className="text-[8px] text-white/40">{s.sub}</p>
                        </div>
                        {i < 4 && <span className="text-white/20 text-[10px]">&rarr;</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-[9px] text-white/40">Trigger</p>
                    <p className="text-[11px] text-white font-medium">Fin de call (webhook)</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-[9px] text-white/40">Output</p>
                    <p className="text-[11px] text-white font-medium">R&eacute;sum&eacute; + MAJ CRM</p>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2">
                    <p className="text-[9px] text-white/40">Setup</p>
                    <p className="text-[11px] text-white font-medium">3 heures</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Connector />

          {/* ========================================================== */}
          {/*  CHAPTER 8                                                  */}
          {/* ========================================================== */}
          <section id="ch8" className="scroll-mt-[100px] mb-10">
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[13px] font-bold shrink-0">08</div>
                <div>
                  <p className="text-[10px] text-[#CCC] uppercase tracking-wider">Chapitre 8 &mdash; p. 38-40</p>
                  <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em]">D&eacute;ploiement progressif en 3 phases</h2>
                </div>
              </div>

              <p className="text-[14px] text-[#555] leading-[1.8] mb-6">
                L&apos;erreur la plus fr&eacute;quente : vouloir tout d&eacute;ployer en m&ecirc;me temps. L&apos;IA dans la vente fonctionne mieux quand elle est adopt&eacute;e progressivement. Chaque phase construit sur la pr&eacute;c&eacute;dente, permettant &agrave; l&apos;&eacute;quipe de s&apos;adapter et de valider les r&eacute;sultats avant de passer &agrave; la suite.
              </p>

              {/* CSS Timeline */}
              <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5 mb-6">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Roadmap de d&eacute;ploiement sur 12 semaines</p>
                <div className="flex items-start gap-0 mb-6">
                  <div className="flex-1 h-3 rounded-l-full bg-[#22C55E]/30 relative">
                    <div className="absolute inset-0 rounded-l-full bg-[#22C55E]" style={{ width: "100%" }} />
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-[#22C55E]">Phase 1</span>
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[8px] text-[#999] whitespace-nowrap">Sem. 1-2</span>
                  </div>
                  <div className="flex-[2] h-3 bg-[#4B5EFC]/30 relative">
                    <div className="absolute inset-0 bg-[#4B5EFC]" style={{ width: "100%" }} />
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-[#4B5EFC]">Phase 2</span>
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[8px] text-[#999] whitespace-nowrap">Sem. 3-6</span>
                  </div>
                  <div className="flex-[3] h-3 rounded-r-full bg-[#6D00CC]/30 relative">
                    <div className="absolute inset-0 rounded-r-full bg-[#6D00CC]" style={{ width: "100%" }} />
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-[#6D00CC]">Phase 3</span>
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[8px] text-[#999] whitespace-nowrap">Sem. 7-12</span>
                  </div>
                </div>
              </div>

              {/* Phase 1 */}
              <div className="rounded-lg border-2 border-[#22C55E]/20 bg-[#22C55E]/5 p-5 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-lg bg-[#22C55E] text-white text-[10px] font-bold flex items-center justify-center">1</span>
                  <h4 className="text-[14px] font-semibold text-[#111]">Phase 1 : Quick wins (Semaines 1-2)</h4>
                </div>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  L&apos;objectif de cette phase est de d&eacute;montrer la valeur de l&apos;IA rapidement et de cr&eacute;er l&apos;adh&eacute;sion de l&apos;&eacute;quipe. On commence par les cas d&apos;usage les plus simples et les plus visibles.
                </p>
                <div className="space-y-2 mb-3">
                  {[
                    "Former l\u2019\u00e9quipe aux prompts de base (1h de workshop)",
                    "D\u00e9ployer les r\u00e9sum\u00e9s automatiques de calls (Claap + Claude)",
                    "Lancer un premier enrichissement Clay sur 200 contacts",
                    "Tester 3 variantes d\u2019emails IA sur 100 prospects chacune",
                    "Mettre en place le prompt de coaching post-call",
                  ].map((item) => (
                    <p key={item} className="text-[12px] text-[#555] flex items-start gap-2 leading-[1.6]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-1.5 shrink-0" />
                      {item}
                    </p>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2">
                    <p className="text-[9px] text-[#999]">Effort</p>
                    <p className="text-[11px] font-semibold text-[#111]">10-15h total</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2">
                    <p className="text-[9px] text-[#999]">KPI cl&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#22C55E]">Temps gagn&eacute; / jour</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2">
                    <p className="text-[9px] text-[#999]">Objectif</p>
                    <p className="text-[11px] font-semibold text-[#111]">1h gagn&eacute;e / jour / rep</p>
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="rounded-lg border-2 border-[#4B5EFC]/20 bg-[#4B5EFC]/5 p-5 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-lg bg-[#4B5EFC] text-white text-[10px] font-bold flex items-center justify-center">2</span>
                  <h4 className="text-[14px] font-semibold text-[#111]">Phase 2 : Automatisation (Semaines 3-6)</h4>
                </div>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Les quick wins sont valid&eacute;s, l&apos;&eacute;quipe est convaincue. Il est temps de syst&eacute;matiser. On passe des prompts manuels aux workflows automatis&eacute;s avec Make.
                </p>
                <div className="space-y-2 mb-3">
                  {[
                    "D\u00e9ployer le workflow d\u2019enrichissement automatique (Agent 2)",
                    "Mettre en place le scoring IA hybride dans le CRM",
                    "Automatiser les emails personnalis\u00e9s via Lemlist + Claude",
                    "Configurer le reporting hebdomadaire automatis\u00e9",
                    "Lancer l\u2019analyse win/loss sur les 50 derniers deals",
                    "D\u00e9ployer le workflow r\u00e9sum\u00e9 de calls automatis\u00e9 (Agent 3)",
                  ].map((item) => (
                    <p key={item} className="text-[12px] text-[#555] flex items-start gap-2 leading-[1.6]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-1.5 shrink-0" />
                      {item}
                    </p>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2">
                    <p className="text-[9px] text-[#999]">Effort</p>
                    <p className="text-[11px] font-semibold text-[#111]">20-30h total</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2">
                    <p className="text-[9px] text-[#999]">KPI cl&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#4B5EFC]">Taux r&eacute;ponse emails</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2">
                    <p className="text-[9px] text-[#999]">Objectif</p>
                    <p className="text-[11px] font-semibold text-[#111]">+25% conversion SQL</p>
                  </div>
                </div>
              </div>

              {/* Phase 3 */}
              <div className="rounded-lg border-2 border-[#6D00CC]/20 bg-[#6D00CC]/5 p-5 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-lg bg-[#6D00CC] text-white text-[10px] font-bold flex items-center justify-center">3</span>
                  <h4 className="text-[14px] font-semibold text-[#111]">Phase 3 : Agents autonomes (Semaines 7-12)</h4>
                </div>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  L&apos;automatisation fonctionne, les m&eacute;triques s&apos;am&eacute;liorent. C&apos;est le moment de passer aux agents autonomes qui fonctionnent 24/7 sans intervention.
                </p>
                <div className="space-y-2 mb-3">
                  {[
                    "D\u00e9ployer l\u2019agent de qualification automatique (Agent 1)",
                    "Mettre en place le forecasting IA et les alertes proactives",
                    "Lancer le coaching IA individualis\u00e9 par commercial",
                    "D\u00e9ployer la base de connaissances IA pour l\u2019onboarding",
                    "Configurer les agents de monitoring (deals bloqu\u00e9s, churn risk)",
                    "Cr\u00e9er le dashboard ROI IA pour le management",
                  ].map((item) => (
                    <p key={item} className="text-[12px] text-[#555] flex items-start gap-2 leading-[1.6]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6D00CC] mt-1.5 shrink-0" />
                      {item}
                    </p>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2">
                    <p className="text-[9px] text-[#999]">Effort</p>
                    <p className="text-[11px] font-semibold text-[#111]">30-50h total</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2">
                    <p className="text-[9px] text-[#999]">KPI cl&eacute;</p>
                    <p className="text-[11px] font-semibold text-[#6D00CC]">Pipeline velocity</p>
                  </div>
                  <div className="rounded-lg bg-white border border-[#EAEAEA] p-2">
                    <p className="text-[9px] text-[#999]">Objectif</p>
                    <p className="text-[11px] font-semibold text-[#111]">+40% productivit&eacute;</p>
                  </div>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Conseils de conduite du changement</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                La technologie ne repr&eacute;sente que 30% du succ&egrave;s. Les 70% restants sont humains. Voici nos recommandations issues de 40+ d&eacute;ploiements : identifiez un &laquo; champion IA &raquo; dans l&apos;&eacute;quipe (g&eacute;n&eacute;ralement un SDR ou AE curieux et tech-savvy) qui deviendra l&apos;ambassadeur interne. Montrez les r&eacute;sultats chaque semaine en standup (temps gagn&eacute;, r&eacute;ponses obtenues). Ne forcez pas l&apos;adoption : laissez les r&eacute;sultats parler. Cr&eacute;ez un canal Slack d&eacute;di&eacute; o&ugrave; l&apos;&eacute;quipe partage ses d&eacute;couvertes et ses meilleurs prompts. Pr&eacute;voyez 1 heure par semaine de &laquo; lab IA &raquo; o&ugrave; chacun explore de nouveaux cas d&apos;usage. Mesurez syst&eacute;matiquement le temps gagn&eacute; et l&apos;impact sur les KPIs pour maintenir l&apos;engagement.
              </p>
            </div>
          </section>

          <Connector />

          {/* ========================================================== */}
          {/*  CHAPTER 9                                                  */}
          {/* ========================================================== */}
          <section id="ch9" className="scroll-mt-[100px] mb-10">
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#6D00CC] flex items-center justify-center text-white text-[13px] font-bold shrink-0">09</div>
                <div>
                  <p className="text-[10px] text-[#CCC] uppercase tracking-wider">Chapitre 9 &mdash; p. 41-42</p>
                  <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] tracking-[-0.02em]">Mesurer le ROI de l&apos;IA</h2>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Temps gagn&eacute; par cas d&apos;usage</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Le ROI de l&apos;IA commerciale se mesure sur deux axes : le temps lib&eacute;r&eacute; (qui peut &ecirc;tre r&eacute;allou&eacute; &agrave; la vente pure) et l&apos;impact direct sur le revenu (pipeline velocity, win rate, ACV). Voici le d&eacute;tail par cas d&apos;usage, bas&eacute; sur les mesures r&eacute;elles de nos clients.
              </p>

              {/* Time saved breakdown */}
              <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5 mb-6">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Temps gagn&eacute; par cas d&apos;usage (par commercial, par jour/semaine)</p>
                <div className="space-y-2.5">
                  {[
                    { use: "Enrichissement automatique", time: "3h / jour", annual: "660h / an", color: "#6D00CC", width: "90%" },
                    { use: "R\u00e9sum\u00e9s de calls", time: "45 min / jour", annual: "165h / an", color: "#4B5EFC", width: "50%" },
                    { use: "Emails personnalis\u00e9s", time: "1h / jour", annual: "220h / an", color: "#22C55E", width: "65%" },
                    { use: "Reporting automatis\u00e9", time: "2h / semaine", annual: "100h / an", color: "#D4A27F", width: "30%" },
                    { use: "Qualification automatique", time: "30 min / jour", annual: "110h / an", color: "#FF7A59", width: "35%" },
                    { use: "Coaching IA", time: "20 min / jour", annual: "73h / an", color: "#6C5CE7", width: "22%" },
                  ].map((item) => (
                    <div key={item.use}>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-[#555]">{item.use}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-[#111]">{item.time}</span>
                          <span className="text-[#999]">({item.annual})</span>
                        </div>
                      </div>
                      <div className="h-2 bg-[#E8E8E8] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: item.width, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-[#EAEAEA] flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#111]">Total estim&eacute;</span>
                  <span className="text-[14px] font-bold text-[#6D00CC]">1 328h / an / commercial</span>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Impact sur le revenu</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Au-del&agrave; du temps gagn&eacute;, l&apos;IA impacte directement les m&eacute;triques de revenu. La pipeline velocity augmente car les deals progressent plus vite (follow-ups automatis&eacute;s, qualification imm&eacute;diate, r&eacute;activit&eacute; accrue). Le win rate s&apos;am&eacute;liore gr&acirc;ce au scoring pr&eacute;dictif (les commerciaux se concentrent sur les bons deals) et au coaching (am&eacute;lioration continue des skills). L&apos;ACV (Average Contract Value) augmente car les deals sont mieux pr&eacute;par&eacute;s (enrichissement profond, compr&eacute;hension des pain points, personnalisation de la proposition).
              </p>

              {/* ROI Calculator mockup */}
              <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5 mb-6">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Simulateur de ROI (exemple pour une &eacute;quipe de 8 commerciaux)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-3">
                    <p className="text-[11px] font-semibold text-[#111]">Param&egrave;tres</p>
                    <div className="rounded-lg bg-white border border-[#EAEAEA] p-3 space-y-2">
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#555]">Taille &eacute;quipe</span>
                        <span className="font-semibold text-[#111]">8 commerciaux</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#555]">Co&ucirc;t horaire charg&eacute;</span>
                        <span className="font-semibold text-[#111]">55 EUR / h</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#555]">Pipeline actuel</span>
                        <span className="font-semibold text-[#111]">800 000 EUR / trimestre</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#555]">Win rate actuel</span>
                        <span className="font-semibold text-[#111]">22%</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#555]">ACV actuel</span>
                        <span className="font-semibold text-[#111]">18 000 EUR</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[11px] font-semibold text-[#22C55E]">Impact estim&eacute; (annuel)</p>
                    <div className="rounded-lg bg-white border border-[#22C55E]/20 p-3 space-y-2">
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#555]">Temps lib&eacute;r&eacute;</span>
                        <span className="font-semibold text-[#22C55E]">10 624 heures</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#555]">Valeur temps gagn&eacute;</span>
                        <span className="font-semibold text-[#22C55E]">584 320 EUR</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#555]">Win rate am&eacute;lior&eacute;</span>
                        <span className="font-semibold text-[#22C55E]">22% &rarr; 28% (+27%)</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#555]">Revenu additionnel</span>
                        <span className="font-semibold text-[#22C55E]">+192 000 EUR / trimestre</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px] pt-2 border-t border-[#EAEAEA]">
                        <span className="font-semibold text-[#111]">ROI total estim&eacute;</span>
                        <span className="font-bold text-[#22C55E] text-[14px]">+1,35M EUR / an</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-white border border-[#EAEAEA] p-3">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[#555]">Co&ucirc;t total outils IA (Claude + Clay + Make + Claap)</span>
                    <span className="font-semibold text-[#111]">~ 1 800 EUR / mois = 21 600 EUR / an</span>
                  </div>
                  <div className="flex items-center justify-between text-[12px] mt-1">
                    <span className="text-[#555]">Ratio co&ucirc;t / b&eacute;n&eacute;fice</span>
                    <span className="font-bold text-[#6D00CC]">1 : 62</span>
                  </div>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Template de suivi mensuel</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Pour suivre le ROI de l&apos;IA dans la dur&eacute;e, nous recommandons un suivi mensuel structur&eacute;. Voici les m&eacute;triques &agrave; tracker chaque mois : temps moyen de recherche par prospect (avant/apr&egrave;s), nombre de contacts enrichis automatiquement, taux de r&eacute;ponse des emails IA vs templates classiques, nombre de calls r&eacute;sum&eacute;s automatiquement, taux de conversion par stade (avant/apr&egrave;s scoring IA), pr&eacute;cision du forecast (pr&eacute;vu vs r&eacute;alis&eacute;), temps de ramp-up des nouveaux commerciaux, et NPS de l&apos;&eacute;quipe sur les outils IA.
              </p>

              <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-5 mb-6 overflow-x-auto">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Grille de suivi mensuel</p>
                <table className="w-full text-[11px] min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#EAEAEA]">
                      <th className="text-left py-2 pr-4 text-[#999] font-semibold">M&eacute;trique</th>
                      <th className="text-center py-2 px-3 text-[#999] font-semibold">Baseline</th>
                      <th className="text-center py-2 px-3 text-[#999] font-semibold">Mois 1</th>
                      <th className="text-center py-2 px-3 text-[#999] font-semibold">Mois 2</th>
                      <th className="text-center py-2 px-3 text-[#999] font-semibold">Mois 3</th>
                      <th className="text-center py-2 px-3 text-[#22C55E] font-semibold">Objectif</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#555]">
                    {[
                      { m: "Temps recherche / prospect", b: "18 min", m1: "8 min", m2: "4 min", m3: "2 min", obj: "< 3 min" },
                      { m: "Taux r\u00e9ponse cold email", b: "2,1%", m1: "6,4%", m2: "9,8%", m3: "11,2%", obj: "> 10%" },
                      { m: "Contacts enrichis / sem.", b: "50", m1: "300", m2: "800", m3: "1000+", obj: "> 500" },
                      { m: "Calls r\u00e9sum\u00e9s auto", b: "0%", m1: "60%", m2: "90%", m3: "98%", obj: "> 95%" },
                      { m: "Pr\u00e9cision forecast", b: "62%", m1: "68%", m2: "74%", m3: "77%", obj: "> 75%" },
                      { m: "Conversion SQL \u2192 Won", b: "22%", m1: "24%", m2: "27%", m3: "29%", obj: "> 28%" },
                    ].map((row) => (
                      <tr key={row.m} className="border-b border-[#F0F0F0]">
                        <td className="py-2 pr-4 font-medium text-[#111]">{row.m}</td>
                        <td className="py-2 px-3 text-center">{row.b}</td>
                        <td className="py-2 px-3 text-center">{row.m1}</td>
                        <td className="py-2 px-3 text-center">{row.m2}</td>
                        <td className="py-2 px-3 text-center">{row.m3}</td>
                        <td className="py-2 px-3 text-center font-semibold text-[#22C55E]">{row.obj}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-[16px] font-semibold text-[#111] mb-3">Quand passer &agrave; l&apos;&eacute;chelle vs quand it&eacute;rer</h3>
              <p className="text-[14px] text-[#555] leading-[1.8] mb-4">
                Passez &agrave; l&apos;&eacute;chelle quand : un cas d&apos;usage montre un ROI positif mesurable sur 2 mois cons&eacute;cutifs, l&apos;adoption par l&apos;&eacute;quipe d&eacute;passe 80% (les commerciaux utilisent activement l&apos;outil), et la qualit&eacute; des outputs IA est jug&eacute;e satisfaisante par l&apos;&eacute;quipe (NPS > 7/10). It&eacute;rez quand : le taux de r&eacute;ponse plafonne (changez les prompts, testez de nouvelles approches), la qualit&eacute; de l&apos;enrichissement baisse (affinez les sources, ajoutez des contr&ocirc;les), ou l&apos;adoption stagne (identifiez les freins, simplifiez les workflows, investissez en formation). L&apos;IA dans la vente n&apos;est pas un projet one-shot : c&apos;est un processus d&apos;am&eacute;lioration continue. Les meilleures &eacute;quipes consacrent 2 &agrave; 4 heures par mois &agrave; optimiser leurs prompts, workflows et processus IA.
              </p>
            </div>
          </section>

          <Connector />

          {/* ========================================================== */}
          {/*  CTA Final                                                  */}
          {/* ========================================================== */}
          <section className="mb-10">
            <div className="rounded-lg bg-[#111] p-6 md:p-10 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Prochaine &eacute;tape</span>
              <h2 className="text-[22px] sm:text-[30px] font-semibold text-white tracking-[-0.02em] mb-3">
                Pr&ecirc;t &agrave; d&eacute;ployer l&apos;IA dans votre &eacute;quipe ?
              </h2>
              <p className="text-[14px] text-white/50 mb-6 max-w-[520px] mx-auto leading-[1.7]">
                Ce guide vous a donn&eacute; les fondations. Pour un accompagnement sur mesure, nos consultants RevOps peuvent d&eacute;ployer ces cas d&apos;usage dans votre &eacute;quipe en 4 &agrave; 8 semaines.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                <a
                  href="https://cal.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6D00CC] text-white text-[14px] font-medium hover:bg-[#5B00AD] transition-colors shadow-[0_4px_12px_-4px_rgba(109,0,204,0.4)]"
                >
                  <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />
                  R&eacute;server un appel strat&eacute;gique
                </a>
                <Link
                  href="/guide-ia-commercial"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white text-[14px] font-medium hover:bg-white/5 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 2v8M4 7l4 4 4-4M2 13h12" /></svg>
                  T&eacute;l&eacute;charger le PDF complet
                </Link>
              </div>
              <div className="flex items-center justify-center gap-4 text-[11px] text-white/30">
                <span>Audit gratuit de 30 min</span>
                <span>|</span>
                <span>Plan d&apos;action personnalis&eacute;</span>
                <span>|</span>
                <span>Sans engagement</span>
              </div>
            </div>
          </section>

          {/* Related / back links */}
          <section className="mb-8">
            <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
              <h3 className="text-[14px] font-semibold text-[#111] mb-4">Ressources compl&eacute;mentaires</h3>
              <div className="space-y-3">
                <Link href="/guide-ia-commercial" className="flex items-center gap-3 text-[13px] text-[#555] hover:text-[#6D00CC] transition-colors group">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-[#CCC] group-hover:text-[#6D00CC]"><path d="M8 2v8M4 7l4 4 4-4M2 13h12" /></svg>
                  <span>T&eacute;l&eacute;charger le guide au format PDF (42 pages)</span>
                </Link>
                <Link href="/services" className="flex items-center gap-3 text-[13px] text-[#555] hover:text-[#6D00CC] transition-colors group">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-[#CCC] group-hover:text-[#6D00CC]"><path d="M6 4l4 4-4 4" /></svg>
                  <span>D&eacute;couvrir nos services RevOps et Agents IA</span>
                </Link>
                <Link href="/blog" className="flex items-center gap-3 text-[13px] text-[#555] hover:text-[#6D00CC] transition-colors group">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-[#CCC] group-hover:text-[#6D00CC]"><path d="M6 4l4 4-4 4" /></svg>
                  <span>Lire nos articles sur l&apos;IA commerciale</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Footer meta */}
          <div className="text-center text-[11px] text-[#CCC]">
            <p>Guide publi&eacute; le 25 mars 2026 par Ceres. Derni&egrave;re mise &agrave; jour le 25 mars 2026.</p>
            <p className="mt-1">Cat&eacute;gorie : IA &amp; Automatisation | 42 pages | 9 chapitres | 35 min de lecture</p>
          </div>

        </main>
      </div>
    </div>
  );
}
