"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tracking des conversions HubSpot : le guide complet",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-12",
  dateModified: "2026-03-12",
  description: "Guide complet pour tracker vos conversions dans HubSpot : UTM, attribution multi-touch, formulaires, events personnalises, connexion GA4 et dashboard de conversion.",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/tracking-conversions-hubspot-guide-complet" },
  articleSection: "CRM & HubSpot",
  wordCount: 2800,
  inLanguage: "fr",
};

const sections = [
  { id: "pourquoi", title: "Pourquoi le tracking est critique" },
  { id: "utm", title: "Les UTM : la base de l\u2019attribution" },
  { id: "sources", title: "Configurer les sources HubSpot" },
  { id: "formulaires", title: "Tracker les soumissions de formulaires" },
  { id: "attribution", title: "Attribution multi-touch" },
  { id: "events", title: "Events personnalises" },
  { id: "ga4", title: "Connect HubSpot a GA4" },
  { id: "dashboard", title: "Dashboard de conversion" },
  { id: "erreurs", title: "Les erreurs courantes" },
  { id: "setup-ceres", title: "Notre setup chez Ceres" },
];

const relatedArticles = [
  { title: "Tracker les soumissions de formulaires HubSpot dans GA4 via GTM", slug: "tracker-soumissions-formulaire-hubspot-google-analytics-google-tag-manager", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "9 actions commerciales que vous devriez automatiser", slug: "9-actions-commerciales-automatiser", category: "Automatisation", color: "#6C5CE7" },
  { title: "Les meilleures pratiques pour vos sequences HubSpot", slug: "meilleures-pratiques-sequences-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function TrackingConversionsHubSpotArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("pourquoi");

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
        <div className="h-full bg-[#4B5EFC] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "8%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "25%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "45%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "65%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "6%", top: "82%", width: 240, height: 240, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />

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
                        ? "border-[#4B5EFC] text-[#111] font-medium"
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
                  <a href="https://twitter.com/intent/tweet?url=https://www.ceres-revops.com/blog/tracking-conversions-hubspot-guide-complet&text=Tracking%20des%20conversions%20HubSpot%20:%20le%20guide%20complet" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/tracking-conversions-hubspot-guide-complet" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Tracking des conversions HubSpot</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">15 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Tracking des conversions HubSpot : le guide complet
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Comment savoir quel canal, quelle campagne et quel contenu generent vraiment vos clients ? Ce guide couvre tout : UTM, attribution multi-touch, formulaires, events personnalises, connexion GA4, et le dashboard de conversion que nous utilisons chez Ceres pour nos clients HubSpot.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>12 mars 2026</span>
              </div>

              {/* Quick stats card */}
              <div className="mt-8 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                <span className="text-[13px] font-semibold text-[#111] mb-4 block">Ce que vous allez apprendre</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Settings UTM", value: "5 types", color: "#4B5EFC" },
                    { label: "Modeles d\u2019attribution", value: "6 modeles", color: "#6C5CE7" },
                    { label: "KPI a suivre", value: "12 metriques", color: "#22C55E" },
                    { label: "Erreurs courantes", value: "8 erreurs", color: "#FF7A59" },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-3 rounded-lg bg-white border border-[#F2F2F2]">
                      <div className="text-[18px] font-bold" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-[10px] text-[#999] mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </header>

            <article>
              {/* Section 1 - Pourquoi */}
              <section id="pourquoi" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi le tracking des conversions est critique</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La plupart des equipes marketing B2B investissent entre 5 000 et 50 000 euros par mois en acquisition. Google Ads, LinkedIn Ads, SEO, contenus, webinaires, evenements. Mais quand on leur demande quel canal genere leurs meilleurs clients, la reponse est souvent vague. &ldquo;On pense que c&apos;est LinkedIn.&rdquo; &ldquo;Google Ads marche bien.&rdquo; &ldquo;Le SEO ramene du trafic.&rdquo;</p>
                    <p>Penser n&apos;est pas savoir. Et dans un contexte ou chaque euro de budget marketing doit etre justifie, le tracking des conversions n&apos;est pas un luxe. C&apos;est une necessite operationnelle.</p>
                    <p>Concretement, tracker ses conversions dans HubSpot permet de repondre a trois questions fondamentales :</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" /><strong className="text-[#111]">D&apos;ou viennent mes leads ?</strong> Quelle source, quelle campagne, quel contenu a genere chaque contact dans le CRM.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" /><strong className="text-[#111]">Quel parcours mene a la conversion ?</strong> Un lead qui lit 3 articles de blog avant de remplir un formulaire n&apos;a pas le meme parcours qu&apos;un lead qui clique sur une annonce Google.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" /><strong className="text-[#111]">Quel est le ROI reel de chaque canal ?</strong> Pas le ROI en leads, mais le ROI en revenue. Combien de chiffre d&apos;affaires chaque canal a-t-il reellement genere ?</li>
                    </ul>
                    <p>Sans tracking fiable, vous optimisez a l&apos;aveugle. Vous risquez de doubler le budget sur un canal qui genere des leads mais pas de clients, et de couper un canal qui convertit lentement mais surement.</p>
                    <p>HubSpot offre un systeme de tracking natif tres puissant, mais qui necessite une configuration rigoureuse pour fonctionner correctement. C&apos;est exactement ce que nous allons detailler dans ce guide.</p>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { label: "Des equipes B2B n\u2019ont pas de tracking fiable", value: "67%", color: "#EF4444" },
                      { label: "D\u2019augmentation du ROI avec un tracking correct", value: "+23%", color: "#22C55E" },
                      { label: "Points de contact avant conversion B2B", value: "8.2", color: "#4B5EFC" },
                    ].map((m) => (
                      <div key={m.label} className="text-center p-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2]">
                        <div className="text-[18px] font-bold" style={{ color: m.color }}>{m.value}</div>
                        <div className="text-[10px] text-[#999] mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 - UTM */}
              <section id="utm" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les UTM : la base de l&apos;attribution</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Les parametres UTM (Urchin Tracking Module) sont des balises que vous ajoutez a vos URLs pour identifier l&apos;origine du trafic. C&apos;est le mecanisme fondamental sur lequel repose toute l&apos;attribution dans HubSpot et Google Analytics.</p>
                    <p>HubSpot lit automatiquement les parametres UTM presents dans l&apos;URL quand un visiteur arrive sur votre site. Ces valeurs sont ensuite stockees dans les proprietes du contact lorsqu&apos;il se convertit (soumission de formulaire, meeting booke, chat).</p>
                    <p>Il existe 5 parametres UTM standard :</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { param: "utm_source", desc: "La plateforme d\u2019origine du trafic. Exemples : google, linkedin, facebook, newsletter, hubspot.", example: "utm_source=linkedin" },
                      { param: "utm_medium", desc: "Le type de canal ou de support. Exemples : cpc, organic, social, email, referral, paid-social.", example: "utm_medium=paid-social" },
                      { param: "utm_campaign", desc: "Le nom de la campagne specifique. Utilisez un nommage coherent et lisible.", example: "utm_campaign=webinar-revops-mars-2026" },
                      { param: "utm_term", desc: "Le mot-cle cible (principalement pour le search payant). Utile pour identifier quel mot-cle a declenche la visite.", example: "utm_term=crm+hubspot+prix" },
                      { param: "utm_content", desc: "La variante de contenu ou de creative. Ideal pour l\u2019A/B testing de vos annonces.", example: "utm_content=banner-v2-blue" },
                    ].map((u) => (
                      <div key={u.param} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <code className="text-[12px] font-mono font-semibold text-[#4B5EFC] bg-[#F0F1FF] px-2 py-0.5 rounded">{u.param}</code>
                        </div>
                        <p className="text-[12px] text-[#666] leading-[1.7] mb-2">{u.desc}</p>
                        <code className="text-[11px] font-mono text-[#999] bg-[#FAFAFA] px-2 py-1 rounded block">{u.example}</code>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-lg bg-[#111] p-5">
                    <p className="text-[12px] font-semibold text-white mb-3">Convention de nommage recommandee</p>
                    <div className="space-y-2 text-[12px] text-white/60 leading-[1.7]">
                      <p>La coherence du nommage est la cle. Voici la convention que nous utilisons chez Ceres pour tous nos clients :</p>
                    </div>
                    <div className="mt-4 rounded-lg bg-white/5 p-4 overflow-x-auto">
                      <pre className="text-[11px] font-mono text-[#22C55E] leading-[1.8] whitespace-pre">{`# Structure
https://votresite.com/page?
  utm_source={plateforme}
  &utm_medium={type-canal}
  &utm_campaign={annee}-{mois}-{nom-campagne}
  &utm_content={variante}

# Exemple LinkedIn Ads
https://www.ceres-revops.com/demo?
  utm_source=linkedin
  &utm_medium=paid-social
  &utm_campaign=2026-03-webinar-revops
  &utm_content=carousel-v1

# Exemple Google Ads
https://www.ceres-revops.com/audit-crm?
  utm_source=google
  &utm_medium=cpc
  &utm_campaign=2026-03-audit-crm-search
  &utm_term=audit+crm+hubspot
  &utm_content=rsa-v2

# Exemple Newsletter
https://www.ceres-revops.com/blog/article?
  utm_source=hubspot
  &utm_medium=email
  &utm_campaign=2026-03-newsletter-12
  &utm_content=cta-footer`}</pre>
                    </div>
                    <div className="mt-4 space-y-1.5">
                      {[
                        "Tout en minuscules, sans accents, sans espaces (utilisez des tirets)",
                        "Prefixez les campagnes par la date (AAAA-MM) pour faciliter le tri",
                        "Soyez descriptif mais concis : linkedin est mieux que li ou ln",
                        "Documentez vos conventions dans un Google Sheet partage avec l\u2019equipe",
                        "Utilisez un outil de generation d\u2019UTM (Google Campaign URL Builder ou un template Sheets)",
                      ].map((r) => (
                        <p key={r} className="text-[11px] text-white/40 leading-[1.6] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-1.5 shrink-0" />{r}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Point critique :</strong> si vous utilisez des conventions differentes entre vos campagnes (par exemple &ldquo;LinkedIn&rdquo; et &ldquo;linkedin&rdquo; et &ldquo;LI&rdquo;), HubSpot les traitera comme trois sources distinctes. Vos rapports seront fragmentes et inexploitables. La rigueur sur le nommage est non-negociable.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 - Sources HubSpot */}
              <section id="sources" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Configurer les sources dans HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>HubSpot dispose d&apos;un systeme de categorisation automatique des sources de trafic. Quand un visiteur arrive sur votre site avec le code de suivi HubSpot installe, le CRM analyse l&apos;URL, le referrer et les parametres UTM pour determiner la source.</p>
                    <p>Le systeme repose sur trois niveaux de granularite :</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        level: "Original Source",
                        desc: "La categorie principale de la premiere visite du contact. HubSpot la determine automatiquement en combinant le referrer HTTP et les parametres UTM. Valeurs possibles : Organic Search, Paid Search, Paid Social, Email Marketing, Direct Traffic, Referrals, Social Media, Offline Sources, Other Campaigns.",
                        color: "#4B5EFC",
                      },
                      {
                        level: "Original Source Drill-Down 1",
                        desc: "Le premier niveau de detail. Pour Organic Search, ce sera le moteur (google, bing). Pour Paid Social, ce sera la plateforme (linkedin, facebook). Pour Email Marketing, ce sera le nom de la campagne email.",
                        color: "#6C5CE7",
                      },
                      {
                        level: "Original Source Drill-Down 2",
                        desc: "Le second niveau de detail. Generalement, c\u2019est la valeur de utm_campaign ou le nom specifique de la campagne publicitaire. C\u2019est ici que vous retrouvez le niveau de granularite le plus fin.",
                        color: "#22C55E",
                      },
                    ].map((l) => (
                      <div key={l.level} className="flex gap-3 items-start">
                        <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: l.color }} />
                        <div>
                          <p className="text-[13px] font-semibold text-[#111] mb-1">{l.level}</p>
                          <p className="text-[12px] text-[#777] leading-[1.65]">{l.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Mapping UTM vers les sources HubSpot</p>
                    <div className="overflow-x-auto">
                      <div className="min-w-[450px]">
                        <div className="grid grid-cols-4 gap-2 pb-3 border-b border-[#EAEAEA]">
                          <span className="text-[10px] font-semibold text-[#999]">utm_medium</span>
                          <span className="text-[10px] font-semibold text-[#999]">utm_source</span>
                          <span className="text-[10px] font-semibold text-[#4B5EFC]">Original Source</span>
                          <span className="text-[10px] font-semibold text-[#4B5EFC]">Drill-Down 1</span>
                        </div>
                        {[
                          { medium: "cpc", source: "google", os: "Paid Search", dd1: "google" },
                          { medium: "cpc", source: "bing", os: "Paid Search", dd1: "bing" },
                          { medium: "paid-social", source: "linkedin", os: "Paid Social", dd1: "linkedin" },
                          { medium: "paid-social", source: "facebook", os: "Paid Social", dd1: "facebook" },
                          { medium: "email", source: "hubspot", os: "Email Marketing", dd1: "Nom de la campagne" },
                          { medium: "social", source: "linkedin", os: "Social Media", dd1: "linkedin" },
                          { medium: "referral", source: "partner.com", os: "Referrals", dd1: "partner.com" },
                          { medium: "(none)", source: "(direct)", os: "Direct Traffic", dd1: "-" },
                        ].map((row) => (
                          <div key={`${row.medium}-${row.source}`} className="grid grid-cols-4 gap-2 py-2 border-b border-[#F5F5F5]">
                            <code className="text-[10px] font-mono text-[#999]">{row.medium}</code>
                            <code className="text-[10px] font-mono text-[#999]">{row.source}</code>
                            <span className="text-[10px] font-medium text-[#4B5EFC]">{row.os}</span>
                            <span className="text-[10px] text-[#666]">{row.dd1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Important :</strong> les proprietes &ldquo;Original Source&rdquo; sont figees. Elles capturent la premiere interaction du contact avec votre site. Meme si un contact revient 10 fois via des canaux differents, la source originale ne changera pas. C&apos;est pour cela que l&apos;attribution multi-touch (que nous verrons plus bas) est indispensable pour une vision complete.</p>
                    <p>Pour que le tracking fonctionne correctement, assurez-vous que le code de suivi HubSpot est bien installe sur toutes les pages de votre site, y compris les pages de remerciement et les sous-domaines. Verifiez dans Settings &gt; Tracking &amp; Analytics &gt; Code de suivi.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 - Formulaires */}
              <section id="formulaires" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Tracker les soumissions de formulaires</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Les formulaires sont le point de conversion principal en B2B. C&apos;est le moment ou un visiteur anonyme devient un contact identifie dans votre CRM. Le tracking des soumissions de formulaires doit etre impeccable.</p>
                    <p>HubSpot propose trois methodes pour tracker les soumissions de formulaires :</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        title: "Formulaires HubSpot natifs",
                        desc: "La methode la plus simple. Vous creez le formulaire directement dans HubSpot et l\u2019integrez a votre site via un embed code ou le CMS HubSpot. Chaque soumission est automatiquement enregistree comme un event dans la timeline du contact. La source, les UTM et la page de conversion sont captures automatiquement.",
                        pros: "Tracking automatique, zero configuration supplementaire. Les donnees sont directement dans le CRM.",
                        cons: "Moins de flexibilite sur le design. Les formulaires HubSpot sont personnalisables mais restent limites par rapport a un formulaire custom.",
                      },
                      {
                        title: "Formulaires non-HubSpot (collected forms)",
                        desc: "Si vous utilisez des formulaires natifs (HTML, React, WordPress) sans passer par HubSpot, le code de suivi HubSpot peut quand meme les detecter. Activez la collecte automatique dans Settings > Marketing > Formulaires > Formulaires non-HubSpot. HubSpot interceptera les soumissions et creera les contacts.",
                        pros: "Liberte totale sur le design. Compatible avec n\u2019importe quel framework front-end.",
                        cons: "Le tracking est moins fiable. Certains champs peuvent ne pas etre mappes correctement. Necessite une verification manuelle.",
                      },
                      {
                        title: "API de soumission de formulaires",
                        desc: "Pour un controle total, utilisez l\u2019API Form Submissions de HubSpot. Vous envoyez les donnees du formulaire via un appel API POST. C\u2019est la methode la plus robuste pour les sites headless ou les applications SPA.",
                        pros: "Controle total sur les donnees envoyees. Fiabilite maximale. Compatible avec n\u2019importe quelle architecture.",
                        cons: "Necessite du developpement. Il faut gerer le hutk (cookie de tracking HubSpot) manuellement pour maintenir le lien avec la session du visiteur.",
                      },
                    ].map((f) => (
                      <div key={f.title} className="pb-4 border-b border-[#F5F5F5] last:border-0 last:pb-0">
                        <h3 className="text-[14px] font-semibold text-[#111] mb-2">{f.title}</h3>
                        <p className="text-[12px] text-[#666] leading-[1.7] mb-2">{f.desc}</p>
                        <div className="flex gap-4 mt-2">
                          <p className="text-[11px] text-[#22C55E] leading-[1.6] flex-1"><strong>+</strong> {f.pros}</p>
                          <p className="text-[11px] text-[#FF7A59] leading-[1.6] flex-1"><strong>-</strong> {f.cons}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-lg bg-[#111] p-5">
                    <p className="text-[12px] font-semibold text-white mb-3">Exemple : soumission via API avec tracking du hutk</p>
                    <div className="rounded-lg bg-white/5 p-4 overflow-x-auto">
                      <pre className="text-[11px] font-mono text-[#22C55E] leading-[1.8] whitespace-pre">{`// Recuperer le hutk (cookie de tracking HubSpot)
const hutk = document.cookie
  .split("; ")
  .find(row => row.startsWith("hubspotutk="))
  ?.split("=")[1];

// Soumission via API
const response = await fetch(
  "https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: [
        { name: "email", value: formData.email },
        { name: "firstname", value: formData.firstName },
        { name: "company", value: formData.company },
      ],
      context: {
        hutk: hutk,
        pageUri: window.location.href,
        pageName: document.title,
      },
    }),
  }
);`}</pre>
                    </div>
                    <p className="mt-3 text-[11px] text-white/40 leading-[1.6]">Le hutk est essentiel. Sans lui, HubSpot ne peut pas associer la soumission du formulaire a la session de navigation du visiteur. Vous perdez alors toutes les donnees de source et de pages vues.</p>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Proprietes a configurer :</strong> pour chaque formulaire, verifiez que les champs sont bien mappes aux proprietes de contact HubSpot. Creez des proprietes personnalisees si necessaire (par exemple : &ldquo;Use case&rdquo;, &ldquo;Taille d&apos;equipe&rdquo;, &ldquo;Budget estime&rdquo;). Ces informations enrichissent le profil du lead et facilitent le scoring et le routage.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 - Attribution multi-touch */}
              <section id="attribution" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Attribution multi-touch dans HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;attribution single-touch (premiere ou derniere interaction) est insuffisante en B2B. Un cycle de vente dure en moyenne 3 a 6 mois et implique 8 a 12 points de contact. Attribuer 100% du credit a un seul point de contact est trompeur.</p>
                    <p>HubSpot propose des rapports d&apos;attribution multi-touch dans les plans Marketing Hub Professional et Enterprise. Voici les modeles disponibles et leurs cas d&apos;usage :</p>
                  </div>

                  <div className="mt-5 overflow-x-auto">
                    <div className="min-w-[500px]">
                      <div className="grid grid-cols-4 gap-2 pb-3 border-b border-[#EAEAEA]">
                        <span className="text-[10px] font-semibold text-[#999]">Modele</span>
                        <span className="text-[10px] font-semibold text-[#999]">Repartition du credit</span>
                        <span className="text-[10px] font-semibold text-[#999]">Cas d&apos;usage</span>
                        <span className="text-[10px] font-semibold text-[#4B5EFC] text-center">Notre avis</span>
                      </div>
                      {[
                        { model: "First Touch", repartition: "100% a la premiere interaction", usage: "Comprendre ce qui genere la decouverte de votre marque", avis: "Utile pour le branding" },
                        { model: "Last Touch", repartition: "100% a la derniere interaction avant conversion", usage: "Comprendre ce qui declenche la decision finale", avis: "Utile pour le bottom funnel" },
                        { model: "Lineaire", repartition: "Credit reparti egalement entre tous les touchpoints", usage: "Vision equilibree de l\u2019ensemble du parcours", avis: "Notre recommandation par defaut" },
                        { model: "En U (Position-based)", repartition: "40% premier, 40% dernier, 20% repartis au milieu", usage: "Valoriser la decouverte et la conversion sans ignorer le milieu", avis: "Excellent compromis" },
                        { model: "En W", repartition: "30% premier, 30% creation lead, 30% creation deal, 10% milieu", usage: "Cycles de vente longs avec etapes distinctes", avis: "Ideal pour le B2B complexe" },
                        { model: "Time Decay", repartition: "Plus de credit aux interactions recentes", usage: "Cycles courts ou le dernier mois compte le plus", avis: "Pour le transactionnel" },
                      ].map((row) => (
                        <div key={row.model} className="grid grid-cols-4 gap-2 py-2.5 border-b border-[#F5F5F5]">
                          <span className="text-[11px] font-medium text-[#111]">{row.model}</span>
                          <span className="text-[11px] text-[#666]">{row.repartition}</span>
                          <span className="text-[11px] text-[#888]">{row.usage}</span>
                          <span className="text-[11px] text-[#4B5EFC] text-center font-medium">{row.avis}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Notre recommandation :</strong> commencez par le modele lineaire. C&apos;est le plus neutre et le plus facile a interpreter. Une fois que vous avez accumule suffisamment de donnees (au moins 50 deals clos), passez au modele en U ou en W pour une vision plus fine.</p>
                    <p>Pour creer un rapport d&apos;attribution dans HubSpot : allez dans Rapports &gt; Rapports d&apos;attribution &gt; Creer un rapport. Choisissez le type de conversion (creation de contact ou creation de deal), selectionnez le modele d&apos;attribution, puis filtrez par periode et par campagne.</p>
                    <p><strong className="text-[#111]">Attention :</strong> les rapports d&apos;attribution HubSpot ne fonctionnent que si le tracking est correctement configure en amont. Si vos UTM sont inconsistants ou si le code de suivi n&apos;est pas installe sur toutes les pages, les donnees seront incompletes et le modele d&apos;attribution donnera des resultats faux.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 - Events personnalises */}
              <section id="events" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Events personnalises et behavioral events</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Au-dela des soumissions de formulaires, HubSpot permet de tracker des actions specifiques sur votre site grace aux custom behavioral events (disponibles en Marketing Hub Enterprise). C&apos;est un levier puissant pour comprendre le comportement de vos prospects avant la conversion.</p>
                    <p>Exemples d&apos;events que nous configurons systematiquement pour nos clients :</p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      { event: "Clic sur le CTA pricing", usage: "Identifier les contacts qui s\u2019interessent au prix. Signal d\u2019intention fort pour le scoring.", property: "clicked_pricing_cta = true" },
                      { event: "Vue de la page demo", usage: "Trigger pour un workflow d\u2019email automatique ou une notification Slack au commercial.", property: "viewed_demo_page = true" },
                      { event: "Telechargement de ressource", usage: "Enrichir le profil du contact avec les sujets qui l\u2019interessent. Utile pour la segmentation.", property: "downloaded_resource = {nom_ressource}" },
                      { event: "Scroll 75% sur un article", usage: "Mesurer l\u2019engagement reel sur vos contenus (vs un simple page view).", property: "deep_reader = true" },
                      { event: "Video vue a 50%+", usage: "Identifier les prospects engages sur vos contenus video. Signal de nurturing avance.", property: "video_engagement = high" },
                      { event: "Utilisation du calculateur/outil interactif", usage: "Capturer les inputs du prospect (taille d\u2019equipe, budget) comme donnees de qualification.", property: "calculator_used = true, team_size = {value}" },
                    ].map((e) => (
                      <div key={e.event} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-md bg-[#F0F1FF] flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC]" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#111] mb-1">{e.event}</p>
                          <p className="text-[12px] text-[#777] leading-[1.65]">{e.usage}</p>
                          <code className="text-[10px] font-mono text-[#999] mt-1 block">{e.property}</code>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-lg bg-[#111] p-5">
                    <p className="text-[12px] font-semibold text-white mb-3">Implementation via le tracking code HubSpot</p>
                    <div className="rounded-lg bg-white/5 p-4 overflow-x-auto">
                      <pre className="text-[11px] font-mono text-[#22C55E] leading-[1.8] whitespace-pre">{`// Tracker un event personnalise dans HubSpot
// Le visiteur doit etre identifie (cookie hutk actif)

// Methode 1 : via l'API JavaScript du tracking code
var _hsq = window._hsq = window._hsq || [];
_hsq.push(["trackCustomBehavioralEvent", {
  name: "pe12345_clicked_pricing_cta",
  properties: {
    page_url: window.location.href,
    cta_position: "hero",
    plan_viewed: "professional"
  }
}]);

// Methode 2 : declenchement via GTM (Google Tag Manager)
// Creez un tag HTML personnalise qui se declenche
// sur votre trigger GTM (clic, scroll, video, etc.)
// et executez le code ci-dessus.`}</pre>
                    </div>
                    <p className="mt-3 text-[11px] text-white/40 leading-[1.6]">Les events personnalises apparaissent dans la timeline du contact et peuvent etre utilises comme criteres de segmentation, de scoring et de declenchement de workflows.</p>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Conseil :</strong> ne creez pas trop d&apos;events. Concentrez-vous sur les 5 a 10 actions qui ont un impact reel sur la qualification et le scoring de vos leads. Chaque event doit repondre a une question business precise : &ldquo;Est-ce que ce contact est pret a acheter ?&rdquo; ou &ldquo;Quel sujet interesse le plus ce contact ?&rdquo;</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 - GA4 */}
              <section id="ga4" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Connect HubSpot a Google Analytics 4</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>HubSpot et Google Analytics 4 ne trackent pas les memes choses. HubSpot se concentre sur les contacts identifies et les deals. GA4 analyse le trafic global, les parcours de navigation et les micro-conversions. Les combiner donne une vision complete du funnel.</p>
                    <p>Il y a trois niveaux d&apos;integration possibles :</p>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-5 rounded-md bg-[#F5F5F5] flex items-center justify-center text-[10px] font-bold text-[#999]">1</span>
                        <h3 className="text-[13px] font-semibold text-[#111]">Partage des UTM (natif)</h3>
                      </div>
                      <p className="text-[12px] text-[#666] leading-[1.7]">Si vous utilisez les memes conventions UTM pour HubSpot et GA4, les deux outils categorisentles sources de la meme maniere. C&apos;est le niveau minimum d&apos;integration. Aucune configuration technique supplementaire n&apos;est requise, juste de la rigueur dans le nommage.</p>
                    </div>

                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-5 rounded-md bg-[#F5F5F5] flex items-center justify-center text-[10px] font-bold text-[#999]">2</span>
                        <h3 className="text-[13px] font-semibold text-[#111]">Envoi d&apos;events vers GA4 via GTM</h3>
                      </div>
                      <p className="text-[12px] text-[#666] leading-[1.7] mb-3">Utilisez Google Tag Manager pour envoyer des events a GA4 quand un formulaire HubSpot est soumis. Cela permet de tracker les conversions dans GA4 avec la meme granularite que dans HubSpot.</p>
                      <div className="rounded-lg bg-[#111] p-4 overflow-x-auto">
                        <pre className="text-[11px] font-mono text-[#22C55E] leading-[1.8] whitespace-pre">{`// Dans GTM : Tag HTML personnalise
// Trigger : HubSpot Form Submission (via listener)

// Listener pour les formulaires HubSpot
window.addEventListener("message", function(event) {
  if (
    event.data.type === "hsFormCallback" &&
    event.data.eventName === "onFormSubmitted"
  ) {
    // Envoyer l'event a GA4 via dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "hubspot_form_submission",
      form_id: event.data.id,
      form_name: event.data.data?.submissionValues?.hs_form_name || "",
      page_url: window.location.href,
    });
  }
});`}</pre>
                      </div>
                    </div>

                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-5 h-5 rounded-md bg-[#F5F5F5] flex items-center justify-center text-[10px] font-bold text-[#999]">3</span>
                        <h3 className="text-[13px] font-semibold text-[#111]">Import de donnees offline dans GA4</h3>
                      </div>
                      <p className="text-[12px] text-[#666] leading-[1.7]">Pour les equipes avancees : exportez les donnees de deals clos depuis HubSpot et importez-les dans GA4 comme conversions offline via le Measurement Protocol. Cela permet de voir le revenue reel dans GA4, pas seulement les leads. C&apos;est la methode la plus puissante mais aussi la plus complexe a maintenir.</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Mapping des events HubSpot vers GA4</p>
                    <div className="overflow-x-auto">
                      <div className="min-w-[400px]">
                        <div className="grid grid-cols-3 gap-2 pb-3 border-b border-[#EAEAEA]">
                          <span className="text-[10px] font-semibold text-[#999]">Action HubSpot</span>
                          <span className="text-[10px] font-semibold text-[#999]">Event GA4</span>
                          <span className="text-[10px] font-semibold text-[#999]">Type</span>
                        </div>
                        {[
                          { hs: "Soumission formulaire", ga4: "generate_lead", type: "Conversion" },
                          { hs: "Meeting booke", ga4: "book_meeting", type: "Conversion" },
                          { hs: "Clic CTA pricing", ga4: "view_pricing", type: "Event cle" },
                          { hs: "Telechargement ressource", ga4: "file_download", type: "Event cle" },
                          { hs: "Chat initie", ga4: "start_chat", type: "Event" },
                          { hs: "Page produit vue", ga4: "view_item", type: "Event" },
                        ].map((row) => (
                          <div key={row.hs} className="grid grid-cols-3 gap-2 py-2 border-b border-[#F5F5F5]">
                            <span className="text-[11px] text-[#111] font-medium">{row.hs}</span>
                            <code className="text-[10px] font-mono text-[#4B5EFC]">{row.ga4}</code>
                            <span className="text-[10px] text-[#999]">{row.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 - Dashboard */}
              <section id="dashboard" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Dashboard de conversion : les KPI a suivre</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un tracking bien configure ne sert a rien sans un dashboard qui rend les donnees actionnables. Voici les 12 KPI que nous suivons dans le dashboard de conversion que nous deplotons pour nos clients HubSpot.</p>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { kpi: "Taux de conversion global", formula: "Leads / Visiteurs uniques", target: "2-5% (B2B SaaS)", color: "#4B5EFC" },
                      { kpi: "Taux de conversion par source", formula: "Leads par canal / Visiteurs par canal", target: "Comparer entre canaux", color: "#6C5CE7" },
                      { kpi: "Cout par lead (CPL)", formula: "Budget canal / Leads generes", target: "Variable par industrie", color: "#FF7A59" },
                      { kpi: "Cout par MQL", formula: "Budget total / MQL generes", target: "1.5x a 3x le CPL", color: "#FF7A59" },
                      { kpi: "Lead-to-MQL rate", formula: "MQL / Leads totaux", target: "25-40%", color: "#22C55E" },
                      { kpi: "MQL-to-SQL rate", formula: "SQL / MQL", target: "30-50%", color: "#22C55E" },
                      { kpi: "SQL-to-Opportunity rate", formula: "Opportunities / SQL", target: "50-70%", color: "#4B5EFC" },
                      { kpi: "Opportunity-to-Close rate", formula: "Deals clos / Opportunities", target: "20-35%", color: "#4B5EFC" },
                      { kpi: "Cycle de vente moyen", formula: "Jours entre premiere interaction et close", target: "30-120 jours (B2B)", color: "#6C5CE7" },
                      { kpi: "Revenue par canal", formula: "CA genere attribue a chaque canal", target: "ROI > 3x", color: "#22C55E" },
                      { kpi: "CAC (Cout d\u2019acquisition client)", formula: "Budget total / Clients acquis", target: "< 1/3 du LTV", color: "#FF7A59" },
                      { kpi: "Ratio LTV/CAC", formula: "Lifetime Value / CAC", target: "> 3:1", color: "#22C55E" },
                    ].map((k) => (
                      <div key={k.kpi} className="rounded-lg border border-[#F2F2F2] p-3">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: k.color }} />
                          <span className="text-[12px] font-semibold text-[#111]">{k.kpi}</span>
                        </div>
                        <p className="text-[10px] text-[#999] leading-[1.5] mb-1">{k.formula}</p>
                        <p className="text-[10px] font-medium" style={{ color: k.color }}>Cible : {k.target}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Conseil de structuration :</strong> organisez votre dashboard en 4 sections. En haut, les KPI globaux (conversions totales, CPL moyen, revenue attribue). Ensuite, la repartition par canal. Puis, le funnel de conversion etape par etape. Enfin, les tendances sur les 6 derniers mois.</p>
                    <p>Dans HubSpot, creez un dashboard dedie avec des rapports personnalises. Utilisez les filtres par date (mois en cours vs mois precedent) et par equipe si vous avez plusieurs equipes marketing. Partagez ce dashboard avec les equipes sales pour aligner les deux departements sur les memes donnees.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 - Erreurs courantes */}
              <section id="erreurs" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les 8 erreurs courantes du tracking HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Apres avoir audite plus de 40 portails HubSpot, voici les erreurs que nous retrouvons le plus frequemment. Chacune d&apos;entre elles fausse vos rapports et vous fait prendre de mauvaises decisions.</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      {
                        title: "UTM inconsistants ou absents",
                        desc: "C\u2019est l\u2019erreur numero un. Les equipes utilisent \u201Clinkedin\u201D, \u201CLinkedIn\u201D et \u201CLI\u201D de maniere interchangeable. Resultat : 3 sources distinctes dans HubSpot au lieu d\u2019une seule. Solution : creez un document de reference partage avec les conventions exactes et imposez-le a toute l\u2019equipe.",
                      },
                      {
                        title: "Code de suivi HubSpot manquant sur certaines pages",
                        desc: "Le tracking code n\u2019est pas installe sur les sous-domaines, les landing pages externes ou les pages de remerciement. Les visiteurs qui naviguent sur ces pages ne sont pas trackes. Solution : verifiez avec l\u2019outil Sources de HubSpot et testez chaque page avec le HubSpot Tracking Checker.",
                      },
                      {
                        title: "Pas de distinction entre source originale et source recente",
                        desc: "Beaucoup d\u2019equipes ne regardent que l\u2019Original Source et ignorent les interactions subsequentes. Un lead venu par SEO il y a 6 mois qui revient via une campagne email et convertit : a qui attribuer la conversion ? Solution : utilisez l\u2019attribution multi-touch (modele lineaire ou en U).",
                      },
                      {
                        title: "Formulaires non-HubSpot non collectes",
                        desc: "Vous avez des formulaires natifs (WordPress, React) sur votre site mais la collecte automatique n\u2019est pas activee. Les soumissions ne remontent pas dans HubSpot. Solution : activez les \u201Ccollected forms\u201D dans les parametres ou migrez vers l\u2019API de soumission.",
                      },
                      {
                        title: "Pas de tracking des micro-conversions",
                        desc: "Vous ne trackez que les soumissions de formulaires et ignorez tous les signaux intermediaires : vue de la page pricing, clic sur le CTA demo, scroll profond sur un article. Solution : configurez 5 a 10 custom behavioral events sur les actions cles.",
                      },
                      {
                        title: "Redirect chains qui cassent les UTM",
                        desc: "Vos liens publicitaires passent par 2 ou 3 redirections (shortener, tracking externe, puis votre site). A chaque redirection, les parametres UTM peuvent etre perdus. Solution : testez chaque lien en navigation privee et verifiez que les UTM arrivent bien sur la page de destination finale.",
                      },
                      {
                        title: "Cookie consent mal configure",
                        desc: "Votre banniere de consentement aux cookies bloque le tracking HubSpot avant que le visiteur n\u2019accepte. Sur certains sites, 40 a 60% des visiteurs ne cliquent jamais sur la banniere. Solution : configurez le tracking HubSpot pour qu\u2019il respecte le consentement tout en maximisant le taux d\u2019acceptation (design, timing, texte clair).",
                      },
                      {
                        title: "Pas de rapport d\u2019attribution configure",
                        desc: "Le tracking est en place mais personne ne regarde les donnees. Il n\u2019y a pas de dashboard dedie, pas de rapport d\u2019attribution, pas de revue mensuelle. Solution : creez un dashboard de conversion (voir section precedente) et planifiez une revue bi-mensuelle avec les equipes marketing et sales.",
                      },
                    ].map((l) => (
                      <div key={l.title} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-md bg-[#FEF2F2] flex items-center justify-center shrink-0 mt-0.5">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#EF4444]"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#111] mb-1">{l.title}</p>
                          <p className="text-[12px] text-[#777] leading-[1.65]">{l.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 - Setup Ceres */}
              <section id="setup-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Notre methode</span>
                  <h2 className="text-[20px] font-semibold text-white mb-4">Notre setup de tracking chez Ceres</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Chez Ceres, chaque nouveau client passe par un audit de tracking avant toute chose. On ne commence jamais a optimiser l&apos;acquisition sans savoir si les donnees sont fiables. Voici la stack et la methode que nous deplotons systematiquement.</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    {[
                      {
                        step: "1. Audit initial",
                        desc: "On verifie le code de suivi HubSpot sur toutes les pages, on audite les formulaires, on passe en revue les UTM des 3 derniers mois, on identifie les trous dans le tracking. Livrable : un rapport d\u2019audit avec les actions correctives prioritaires.",
                      },
                      {
                        step: "2. Convention UTM",
                        desc: "On cree un document de reference avec toutes les conventions de nommage. On le partage avec l\u2019equipe marketing et on configure un template Google Sheets ou Notion pour generer les UTM automatiquement.",
                      },
                      {
                        step: "3. Configuration des formulaires",
                        desc: "On migre les formulaires critiques vers l\u2019API HubSpot si necessaire. On configure le tracking des formulaires non-HubSpot. On verifie le mapping des champs vers les proprietes de contact.",
                      },
                      {
                        step: "4. Events personnalises",
                        desc: "On configure entre 5 et 8 custom behavioral events via GTM. Clic pricing, vue demo, telechargement, scroll profond, video engagee. Chaque event est lie a un critere de scoring.",
                      },
                      {
                        step: "5. Connexion GA4",
                        desc: "On configure le listener de formulaires HubSpot dans GTM pour envoyer les conversions vers GA4. On mappe les events HubSpot aux events GA4 standard. On verifie que les donnees concordent entre les deux outils.",
                      },
                      {
                        step: "6. Dashboard de conversion",
                        desc: "On deploie un dashboard HubSpot avec les 12 KPI decrits plus haut. On configure les filtres par canal, par periode et par equipe. On planifie une revue bi-mensuelle avec le client.",
                      },
                      {
                        step: "7. Attribution multi-touch",
                        desc: "On active les rapports d\u2019attribution (modele lineaire par defaut). On attend 2 a 3 mois de donnees propres avant de passer a un modele plus avance (en U ou en W). On forme l\u2019equipe a lire et interpreter les rapports.",
                      },
                    ].map((s) => (
                      <div key={s.step} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC]" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-white mb-1">{s.step}</p>
                          <p className="text-[12px] text-white/40 leading-[1.65]">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { label: "Portails HubSpot audites", value: "40+", color: "#4B5EFC" },
                      { label: "Temps moyen de mise en place", value: "2 sem.", color: "#22C55E" },
                      { label: "Amelioration moyenne de la fiabilite des donnees", value: "+45%", color: "#6C5CE7" },
                    ].map((m) => (
                      <div key={m.label} className="text-center p-3 rounded-lg bg-white/5">
                        <div className="text-[18px] font-bold" style={{ color: m.color }}>{m.value}</div>
                        <div className="text-[10px] text-white/30 mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Le resultat : en 2 semaines, nos clients passent d&apos;un tracking approximatif a un systeme fiable qui leur permet de prendre des decisions basees sur des donnees reelles. Le ROI est immediat : ils arretent de gaspiller du budget sur des canaux qui ne convertissent pas et doublent la mise sur ceux qui fonctionnent.</p>
                    <p>Le tracking n&apos;est pas un projet ponctuel. C&apos;est un systeme vivant qui doit etre maintenu, audite et ajuste regulierement. A chaque nouvelle campagne, a chaque nouveau canal, a chaque changement de site, le tracking doit etre verifie.</p>
                  </div>
                </div>
              </section>
            </article>

            {/* Related articles */}
            <section className="mt-12 mb-8">
              <p className="text-[13px] font-semibold text-[#111] mb-4">Articles similaires</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedArticles.map((a) => (
                  <Link key={a.slug} href={`/blog/${a.slug}`} className="rounded-lg border border-[#F2F2F2] p-4 hover:border-[#DDD] transition-colors group">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white mb-3" style={{ background: a.color }}>
                      {a.category[0]}
                    </div>
                    <p className="text-[12px] font-semibold text-[#111] leading-[1.4] group-hover:text-[#4B5EFC] transition-colors">{a.title}</p>
                    <p className="text-[10px] text-[#999] mt-2">{a.category}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section>
              <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Votre tracking HubSpot est-il fiable ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[450px] mx-auto">On audite votre portail HubSpot, on corrige le tracking et on deploie un dashboard de conversion en moins de 2 semaines. Resultats mesurables des le premier mois.</p>
                <div className="flex items-center justify-center gap-3">
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un audit gratuit
                  </a>
                  <Link href="/agence-hubspot" className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-[#EAEAEA] bg-white text-[#111] text-[13px] font-medium hover:border-[#CCC] transition-colors">
                    Nos services
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
