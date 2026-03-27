"use client";

import { useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";

/* ------------------------------------------------------------------ */
/*  JSON-LD                                                            */
/* ------------------------------------------------------------------ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Guides RevOps, CRM & IA",
  description: "Guides premium telechargeables pour structurer vos operations commerciales. Frameworks, templates, checklists et methodologies.",
  url: "https://ceres-revops.fr/guides",
  publisher: { "@type": "Organization", name: "Ceres", url: "https://ceres-revops.fr" },
};

/* ------------------------------------------------------------------ */
/*  Guides data                                                        */
/* ------------------------------------------------------------------ */
type Guide = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  pages: number;
  format: string;
  color: string;
  icon: string;
  chapters: string[];
  includes: string[];
  forWho: string[];
  featured?: boolean;
  landingUrl?: string;
};

/* SVG icons for each guide */
const guideIcons: Record<string, React.ReactNode> = {
  "guide-revops-complet": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  ),
  "playbook-hubspot-setup": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
    </svg>
  ),
  "guide-prospection-outbound": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  "template-audit-crm": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  "guide-ia-commerciale": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z" /><circle cx="12" cy="15" r="2" />
    </svg>
  ),
  "kit-metriques-revops": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  ),
  "framework-lead-scoring": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20" /><path d="M5 20V8l5-6 5 6v12" /><path d="M19 20V14l-4-4" /><path d="M9 12h2" /><path d="M9 16h2" />
    </svg>
  ),
  "playbook-migration-crm": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14h6v6" /><path d="M14 4h6v6" /><path d="M10 20L20 4" />
    </svg>
  ),
};

const categories = [
  { key: "all", label: "Tout", color: "#111" },
  { key: "revops", label: "RevOps", color: "#FF7A59" },
  { key: "crm", label: "CRM & HubSpot", color: "#4B5EFC" },
  { key: "outbound", label: "Outbound & Prospection", color: "#6C5CE7" },
  { key: "data", label: "Data & Analytics", color: "#22C55E" },
  { key: "ia", label: "IA & Automatisation", color: "#6D00CC" },
];

const guides: Guide[] = [
  {
    slug: "guide-revops-complet",
    title: "Le Guide RevOps Complet",
    subtitle: "De 0 a un revenue engine structure",
    description: "Le guide de reference pour implementer le RevOps dans votre entreprise. De la definition de votre ICP a la mise en place de dashboards automatises, en passant par l\u2019alignement marketing-sales et le lead scoring. Utilise en interne chez Ceres pour onboarder chaque nouveau client.",
    category: "revops",
    pages: 62,
    format: "PDF + Notion",
    color: "#FF7A59",
    icon: "R",
    featured: true,
    landingUrl: "/guide-revops-ultime",
    chapters: [
      "Qu\u2019est-ce que le RevOps et pourquoi c\u2019est strategique",
      "Audit de votre situation actuelle (framework 80 points)",
      "Definir votre ICP et vos buyer personas",
      "Aligner marketing, sales et customer success",
      "Construire votre funnel et definir chaque stage",
      "Mettre en place le lead scoring (fit + engagement)",
      "Creer votre SLA marketing-sales",
      "Choisir et configurer votre stack technologique",
      "Les 30 metriques RevOps a suivre",
      "Plan d\u2019implementation en 90 jours",
    ],
    includes: [
      "62 pages de contenu actionnable",
      "Template SLA marketing-sales pret a l\u2019emploi",
      "Grille de scoring des leads (Excel/Sheets)",
      "Checklist audit RevOps 80 points",
      "Dashboard template HubSpot (10 rapports)",
      "Framework ICP sur Notion",
      "Matrice RACI marketing-sales",
    ],
    forWho: [
      "Founders et CEOs qui veulent structurer leur croissance",
      "VP Sales / VP Marketing qui veulent aligner leurs equipes",
      "RevOps Managers qui cherchent un framework complet",
      "Equipes de 15 a 200 personnes en phase de structuration",
    ],
  },
  {
    slug: "guide-ia-commerciale",
    title: "Guide IA pour Equipes Commerciales",
    subtitle: "Deployer l\u2019IA dans votre processus de vente",
    description: "Le guide pratique pour integrer l\u2019IA dans votre processus commercial sans tout casser. Cas d\u2019usage concrets, prompts prouves, workflows automatises et methode de deploiement progressive. Base sur notre experience avec Claude, Make et HubSpot.",
    category: "ia",
    pages: 42,
    format: "PDF + Prompts",
    color: "#6D00CC",
    icon: "IA",
    landingUrl: "/guide-ia-commercial",
    featured: true,
    chapters: [
      "L\u2019IA commerciale en 2026 : etat des lieux",
      "Les 10 cas d\u2019usage a plus fort ROI",
      "Choisir votre LLM : Claude vs ChatGPT vs Gemini",
      "Enrichissement IA : Clay + Claude en pratique",
      "Redaction d\u2019emails personnalises par IA",
      "Resume automatique des calls (Claap + Claude)",
      "Scoring predictif et qualification automatique",
      "Construire des agents IA avec Make + Claude",
      "Deploiement progressif en 3 phases",
      "Mesurer le ROI de l\u2019IA commerciale",
    ],
    includes: [
      "42 pages de methode + cas concrets",
      "25 prompts commerciaux prouves (enrichissement, emails, analyse)",
      "3 workflows Make prets a importer",
      "Template de scoring IA",
      "Guide de choix LLM (matrice de decision)",
      "Calculateur de ROI IA (Sheets)",
      "Checklist de deploiement en 3 phases",
    ],
    forWho: [
      "Directeurs commerciaux curieux de l\u2019IA",
      "RevOps Managers qui veulent automatiser",
      "Equipes qui utilisent deja un LLM et veulent structurer",
      "Founders tech-savvy en B2B",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Download Modal                                                     */
/* ------------------------------------------------------------------ */
function DownloadModal({ guide, onClose }: { guide: Guide; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#CCC] hover:text-[#999] transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
        </button>

        {!submitted ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: guide.color }}>
                {guideIcons[guide.slug]}
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#111]">{guide.title}</p>
                <p className="text-[11px] text-[#999]">{guide.pages} pages | {guide.format}</p>
              </div>
            </div>
            <p className="text-[12px] text-[#777] leading-[1.6] mb-5">
              Remplissez le formulaire pour recevoir le guide gratuitement par email.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Prenom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-[#E8E8E8] text-[13px] text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#DDD]"
              />
              <input
                type="email"
                placeholder="Email professionnel"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-[#E8E8E8] text-[13px] text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#DDD]"
              />
              <input
                type="text"
                placeholder="Entreprise"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#E8E8E8] text-[13px] text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#DDD]"
              />
              <button type="submit" className="w-full py-2.5 rounded-lg text-white text-[13px] font-medium transition-colors" style={{ background: guide.color }}>
                Telecharger le guide
              </button>
              <p className="text-[10px] text-[#CCC] text-center">Pas de spam. On vous envoie le guide et c&apos;est tout.</p>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <p className="text-[16px] font-semibold text-[#111] mb-2">Guide envoye</p>
            <p className="text-[13px] text-[#777] leading-[1.6] mb-4">Verifiez votre boite email ({email}). Le guide arrive dans les 2 minutes.</p>
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-[#E8E8E8] text-[12px] text-[#666] hover:border-[#DDD] transition-colors">
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function GuidesPage() {
  const [cat, setCat] = useState("all");
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);

  const filtered = cat === "all" ? guides : guides.filter((g) => g.category === cat);
  const featured = guides.filter((g) => g.featured);

  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "8%", width: 320, height: 320, borderRadius: "50%", background: "#FF7A59", opacity: 0.14, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "25%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.12, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "45%", width: 280, height: 280, borderRadius: "50%", background: "#6D00CC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "2%", top: "65%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "82%", width: 280, height: 280, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {activeGuide && <DownloadModal guide={activeGuide} onClose={() => setActiveGuide(null)} />}

      <div className="relative z-10 max-w-[1000px] mx-auto px-6">
        {/* Header */}
        <section className="text-center mb-14">
          <nav className="mb-6 flex items-center justify-center gap-2 text-[12px] text-[#999]">
            <Link href="/" className="hover:text-[#111] transition-colors">Accueil</Link><span>/</span>
            <span className="text-[#666]">Guides</span>
          </nav>
          <div className="mb-4"><Badge>Ressources</Badge></div>
          <h1 className="text-[36px] sm:text-[48px] font-semibold text-[#111] leading-[1.1] tracking-[-0.03em] mb-5">
            Guides &amp; Templates
          </h1>
          <p className="text-[17px] text-[#666] max-w-[520px] mx-auto leading-[1.7] mb-4">
            Nos frameworks, playbooks et templates utilises en interne chez Ceres. Telechargeables gratuitement.
          </p>
          <div className="flex items-center justify-center gap-6 text-[13px] text-[#999]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />
              <span>{guides.length} guides</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-[#4B5EFC]" />
              <span>{guides.reduce((a, g) => a + g.pages, 0)}+ pages</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-[#FF7A59]" />
              <span>100% gratuit</span>
            </div>
          </div>
        </section>

        {/* Featured guides */}
        <section className="mb-14">
          <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Les plus populaires</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((g) => {
              const Wrapper = g.landingUrl ? ({ children, ...props }: any) => <Link href={g.landingUrl!} {...props}>{children}</Link> : ({ children, ...props }: any) => <button {...props} onClick={() => setActiveGuide(g)}>{children}</button>;
              return (
                <Wrapper
                  key={g.slug}
                  className="text-left rounded-2xl border-2 p-5 transition-all hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.12)] group block"
                  style={{ borderColor: `${g.color}30` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ background: g.color }}>
                      {guideIcons[g.slug]}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium text-white" style={{ background: g.color }}>{g.pages} pages</span>
                      <span className="text-[10px] text-[#999]">{g.format}</span>
                    </div>
                  </div>
                  <h3 className="text-[15px] font-semibold text-[#111] mb-1 group-hover:opacity-80 transition-opacity">{g.title}</h3>
                  <p className="text-[12px] text-[#666] mb-3">{g.subtitle}</p>
                  <p className="text-[11px] text-[#999] leading-[1.6] line-clamp-2">{g.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-[11px] font-medium transition-colors" style={{ color: g.color }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 2v8M4 7l4 4 4-4M2 13h12" /></svg>
                    {g.landingUrl ? "Voir le guide" : "Telecharger gratuitement"}
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </section>

        {/* Categories filter */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
                  cat === c.key
                    ? "text-white shadow-sm"
                    : "text-[#999] bg-white border border-[#F2F2F2] hover:border-[#DDD] hover:text-[#666]"
                }`}
                style={cat === c.key ? { background: c.color } : {}}
              >
                {c.label}
              </button>
            ))}
          </div>
        </section>

        {/* All guides */}
        <section className="space-y-6 mb-16">
          {filtered.map((g) => (
            <div key={g.slug} className="rounded-2xl border border-[#E8E8E8] bg-white shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="p-5 md:p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0" style={{ background: g.color }}>
                        {guideIcons[g.slug]}
                      </div>
                      <div>
                        <h2 className="text-[17px] font-semibold text-[#111]">{g.title}</h2>
                        <p className="text-[12px] text-[#999]">{g.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#555] leading-[1.75] mb-4">{g.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-[10px] px-2 py-0.5 rounded-md border border-[#F2F2F2] text-[#999]">{g.pages} pages</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md border border-[#F2F2F2] text-[#999]">{g.format}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#22C55E]/10 text-[#22C55E] font-medium">Gratuit</span>
                    </div>

                    {/* Chapters */}
                    <div className="mb-4">
                      <p className="text-[11px] font-semibold text-[#111] mb-2">Sommaire</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {g.chapters.map((ch, i) => (
                          <p key={i} className="text-[11px] text-[#777] flex items-start gap-2">
                            <span className="w-4 h-4 rounded bg-[#F5F5F5] flex items-center justify-center text-[8px] font-bold text-[#999] shrink-0 mt-0.5">{i + 1}</span>
                            {ch}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Includes + CTA */}
                  <div className="lg:w-[280px] shrink-0">
                    <div className="rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4 mb-4">
                      <p className="text-[11px] font-semibold text-[#111] mb-3">Ce qui est inclus</p>
                      {g.includes.map((inc) => (
                        <p key={inc} className="text-[11px] text-[#777] mb-1.5 flex items-start gap-2">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#22C55E] shrink-0 mt-0.5"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          {inc}
                        </p>
                      ))}
                    </div>

                    <div className="rounded-xl bg-[#F5F5F5] border border-[#EBEBEB] p-4 mb-4">
                      <p className="text-[11px] font-semibold text-[#111] mb-2">Pour qui</p>
                      {g.forWho.map((fw) => (
                        <p key={fw} className="text-[10px] text-[#888] mb-1.5 flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: g.color }} />
                          {fw}
                        </p>
                      ))}
                    </div>

                    {g.landingUrl ? (
                      <Link
                        href={g.landingUrl}
                        className="w-full py-2.5 rounded-lg text-white text-[13px] font-medium transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                        style={{ background: g.color }}
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 3h7v7M13 3L6 10" /></svg>
                        Voir le guide
                      </Link>
                    ) : (
                      <button
                        onClick={() => setActiveGuide(g)}
                        className="w-full py-2.5 rounded-lg text-white text-[13px] font-medium transition-colors flex items-center justify-center gap-2 hover:opacity-90"
                        style={{ background: g.color }}
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M8 2v8M4 7l4 4 4-4M2 13h12" /></svg>
                        Telecharger gratuitement
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Why our guides */}
        <section className="mb-12">
          <div className="rounded-2xl bg-[#111] p-6 md:p-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Pourquoi nos guides</span>
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-white tracking-[-0.02em] mb-4">
              Pas des ebooks generiques. Des outils de travail.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { title: "Utilises en interne", desc: "Chaque guide est le meme framework que nos consultants utilisent au quotidien chez Ceres. Teste sur des dizaines de clients." },
                { title: "Actionnables", desc: "Pas de theorie vague. Des templates, des checklists, des formules et des exemples concrets que vous pouvez appliquer demain." },
                { title: "Mis a jour", desc: "Nos guides sont mis a jour a chaque changement majeur dans les outils ou les pratiques. Vous recevez les mises a jour gratuitement." },
              ].map((p) => (
                <div key={p.title} className="rounded-xl bg-white/5 p-4">
                  <p className="text-[13px] font-semibold text-white mb-2">{p.title}</p>
                  <p className="text-[11px] text-white/50 leading-[1.65]">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: guides.reduce((a, g) => a + g.pages, 0).toString() + "+", label: "Pages de contenu" },
                { value: guides.length.toString(), label: "Guides disponibles" },
                { value: "50+", label: "Templates inclus" },
                { value: "0\u20AC", label: "Le prix de chaque guide" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-[24px] font-bold text-white">{s.value}</div>
                  <div className="text-[11px] text-white/40">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 md:p-10 text-center">
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;un accompagnement personnalise ?</h2>
            <p className="text-[13px] text-[#999] mb-6 max-w-[450px] mx-auto">Nos guides sont un excellent point de depart. Si vous voulez aller plus vite, notre equipe peut deployer ces frameworks directement dans votre entreprise.</p>
            <div className="flex items-center justify-center gap-3">
              <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel
              </a>
              <Link href="/audit-revops" className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-[#E5E5E5] bg-white text-[#111] text-[13px] font-medium hover:border-[#CCC] transition-colors">
                Demander un audit
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
