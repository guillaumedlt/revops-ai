"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Migration CRM : comment changer de CRM sans tout casser",
  description: "Guide complet pour reussir votre migration CRM etape par etape. Audit, nettoyage, mapping des champs, outils de migration, tests, formation et adoption. Avec un focus sur les migrations vers HubSpot (Salesforce, Pipedrive, Excel).",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-12",
  dateModified: "2026-03-12",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/migration-crm-guide-complet" },
  articleSection: "CRM & HubSpot",
  wordCount: 2900,
  inLanguage: "fr",
};

const sections = [
  { id: "quand-changer", title: "Quand faut-il changer" },
  { id: "risques", title: "Les risques" },
  { id: "audit-existant", title: "Etape 1 : Audit" },
  { id: "choix-crm", title: "Etape 2 : Choix du CRM" },
  { id: "nettoyage", title: "Etape 3 : Nettoyage" },
  { id: "mapping", title: "Etape 4 : Mapping" },
  { id: "migration-technique", title: "Etape 5 : Migration" },
  { id: "tests-validation", title: "Etape 6 : Tests" },
  { id: "formation-adoption", title: "Etape 7 : Formation" },
  { id: "migrations-courantes", title: "Migrations courantes" },
  { id: "timeline-budget", title: "Timeline et budget" },
  { id: "methode-ceres", title: "Notre methode Ceres" },
];

const relatedArticles = [
  { title: "Data quality CRM : audit et nettoyage en 5 etapes", slug: "data-quality-crm-audit-nettoyage", category: "Data & Reporting", color: "#22C55E" },
  { title: "HubSpot vs Salesforce : le comparatif complet", slug: "hubspot-vs-salesforce-comparatif", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Onboarding HubSpot : les 30 premiers jours", slug: "onboarding-hubspot-30-premiers-jours", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function MigrationCrmGuidePage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("quand-changer");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "5%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "15%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "30%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "45%", width: 300, height: 300, borderRadius: "50%", background: "#6C5CE7", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "60%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "75%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "88%", width: 240, height: 240, borderRadius: "50%", background: "#22C55E", opacity: 0.06, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet?text=Migration%20CRM%20%3A%20comment%20changer%20de%20CRM%20sans%20tout%20casser&url=https://www.ceres-revops.com/blog/migration-crm-guide-complet" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/migration-crm-guide-complet" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Migration CRM</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">15 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Migration CRM : comment changer de CRM sans tout casser
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Changer de CRM est l&apos;un des projets les plus structurants pour une equipe commerciale. C&apos;est aussi l&apos;un des plus risques. Perte de donnees, historique incomplet, equipes perdues, pipeline paralyse pendant des semaines : les histoires d&apos;horreur ne manquent pas. Ce guide couvre les 7 etapes d&apos;une migration reussie, de l&apos;audit initial au deploiement final. Avec un focus particulier sur les migrations vers HubSpot, les outils a utiliser, les pieges a eviter et une timeline realiste pour votre projet.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>12 mars 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 : Quand faut-il changer de CRM */}
              <section id="quand-changer" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Quand faut-il changer de CRM ?</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>La decision de changer de CRM ne se prend jamais a la legere. C&apos;est un investissement en temps, en budget et en energie pour toute l&apos;equipe. La question n&apos;est pas de savoir si votre CRM actuel a des defauts (ils en ont tous), mais si ces defauts sont devenus des freins structurels a votre croissance.</p>
                    <p>Voici les cinq signaux d&apos;alerte qui indiquent qu&apos;il est temps de migrer. Si vous en reconnaissez trois ou plus, la migration n&apos;est probablement plus une option mais une necessite.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { signal: "Votre equipe contourne le CRM", desc: "Les commerciaux utilisent des fichiers Excel en parallele, notent leurs suivis dans des post-it ou des carnets. Le CRM n&apos;est plus la source unique de verite mais un outil administratif rempli a contrecoeur. Taux d&apos;adoption en dessous de 40%.", color: "#FF7A59" },
                      { signal: "Les couts explosent sans valeur ajoutee", desc: "Vous payez pour des fonctionnalites que personne n&apos;utilise, des licences par utilisateur qui grimpent chaque annee, des modules complementaires pour des besoins basiques. Le ratio cout/valeur s&apos;est inverse depuis longtemps.", color: "#EF4444" },
                      { signal: "Les integrations sont un cauchemar", desc: "Votre CRM ne se connecte pas nativement a vos outils metier (marketing automation, facturation, support). Chaque integration necessite un connecteur custom, un middleware couteux ou des exports/imports manuels hebdomadaires.", color: "#6C5CE7" },
                      { signal: "Le reporting est insuffisant ou inexistant", desc: "Impossible de sortir un tableau de bord fiable sans passer par un outil tiers. Les metriques cles (taux de conversion, cycle de vente, velocity) necessitent des calculs manuels. Votre directeur commercial prend ses decisions a l&apos;instinct.", color: "#4B5EFC" },
                      { signal: "L&apos;outil ne suit plus votre croissance", desc: "Ce qui fonctionnait pour 5 commerciaux ne tient plus a 20. Les pipelines sont devenus illisibles, les automatisations basiques sont impossibles, la gestion des territoires n&apos;existe pas. Le CRM est devenu un frein, pas un accelerateur.", color: "#22C55E" },
                    ].map((item) => (
                      <div key={item.signal} className="rounded-lg border-l-4 bg-[#FAFAFA] p-4" style={{ borderLeftColor: item.color }}>
                        <div className="flex items-center gap-2 mb-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                          <p className="text-[12px] font-semibold text-[#111]">{item.signal}</p>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.7]">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un seul de ces signaux ne suffit pas a justifier une migration. Mais la combinaison de plusieurs d&apos;entre eux cree un effet cumulatif qui coute bien plus cher que le projet de migration lui-meme. En moyenne, un CRM mal adapte fait perdre 5,5 heures par semaine et par commercial en taches administratives evitables.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 : Les risques d'une migration mal geree */}
              <section id="risques" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les risques d&apos;une migration mal geree</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Avant de foncer tete baissee, il faut comprendre ce qui peut mal tourner. Une migration CRM ratee ne se repare pas facilement. Les degats sont souvent irreversibles ou extremement couteux a corriger. Voici les trois scenarios catastrophes les plus frequents que nous avons observes chez nos clients.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { title: "Perte de donnees historiques", desc: "Une entreprise de 80 commerciaux migre de Salesforce vers un autre CRM. L&apos;equipe technique exporte les contacts et les deals, mais oublie les notes, les emails logges, les activites et les pieces jointes. Resultat : 3 ans d&apos;historique de relation client effaces. Les commerciaux appellent des prospects deja contactes, reproposent des offres deja refusees. La confiance dans le CRM tombe a zero.", impact: "Perte de 3 ans d&apos;historique, 6 mois pour reconstituer partiellement" },
                      { title: "Downtime prolonge du pipeline", desc: "Une startup SaaS decide de migrer un vendredi pour que tout soit pret lundi. Le mapping des champs n&apos;a pas ete teste. Les deals changent de stage, les montants disparaissent, les dates de closing sont ecrasees. L&apos;equipe commerciale passe 3 semaines a reconstituer son pipeline manuellement. Pendant ce temps, aucun reporting fiable, aucune prevision possible.", impact: "3 semaines de pipeline aveugle, 2 deals perdus par manque de suivi" },
                      { title: "Echec d&apos;adoption par les equipes", desc: "Une PME migre vers un CRM plus puissant sans former ses equipes. L&apos;interface est differente, les habitudes sont brisees, les raccourcis n&apos;existent plus. Les commerciaux regressent vers Excel. Apres 6 mois, le taux d&apos;adoption est a 25%. L&apos;entreprise paie deux outils (le nouveau CRM et les licences Excel/Google Sheets que tout le monde utilise en parallele).", impact: "25% d&apos;adoption apres 6 mois, ROI negatif sur le projet" },
                    ].map((item) => (
                      <div key={item.title} className="rounded-lg border-2 border-[#FEE2E2] bg-[#FFF5F5] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 rounded-full bg-[#EF4444]/10 flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                          </div>
                          <p className="text-[12px] font-semibold text-[#111]">{item.title}</p>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.7] mb-3">{item.desc}</p>
                        <div className="rounded-lg bg-[#EF4444]/5 border border-[#EF4444]/10 px-3 py-2">
                          <p className="text-[10px] text-[#EF4444] font-medium">{item.impact}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 text-[13px] text-[#555] leading-[1.75]">
                    <p>Ces trois scenarios ne sont pas des cas extremes. Ce sont les erreurs les plus courantes. La bonne nouvelle : elles sont toutes evitables avec un processus structure. C&apos;est exactement ce que couvrent les 7 etapes suivantes.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 : Etape 1 - Audit de l'existant */}
              <section id="audit-existant" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#4B5EFC] bg-[#4B5EFC]/10 px-2 py-0.5 rounded">ETAPE 1</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Audit de l&apos;existant</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Avant de toucher a quoi que ce soit, vous devez documenter precisement ce que contient votre CRM actuel. Pas seulement les contacts et les deals, mais tout l&apos;ecosysteme : les proprietes custom, les workflows, les integrations, les rapports, les vues sauvegardees et les automatisations. Sans cet inventaire exhaustif, vous migrerez a l&apos;aveugle.</p>
                    <p>L&apos;audit doit couvrir quatre dimensions : les donnees (volume et qualite), la structure (objets et proprietes), les process (workflows et automatisations) et les integrations (outils connectes).</p>
                  </div>

                  {/* CSS Mockup: Data Inventory Table */}
                  <div className="rounded-lg border border-[#EAEAEA] overflow-hidden mb-5">
                    <div className="bg-[#FAFAFA] border-b border-[#EAEAEA] px-4 py-2.5">
                      <p className="text-[11px] font-semibold text-[#111]">Inventaire des donnees a documenter</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="border-b border-[#F2F2F2]">
                            <th className="text-left px-4 py-2.5 text-[#999] font-medium">Objet CRM</th>
                            <th className="text-left px-4 py-2.5 text-[#999] font-medium">Volume</th>
                            <th className="text-left px-4 py-2.5 text-[#999] font-medium">Proprietes custom</th>
                            <th className="text-left px-4 py-2.5 text-[#999] font-medium">Taux remplissage</th>
                            <th className="text-left px-4 py-2.5 text-[#999] font-medium">Priorite migration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { obj: "Contacts", vol: "12 450", props: "34", rate: "67%", priority: "Critical", pColor: "#EF4444" },
                            { obj: "Entreprises", vol: "3 280", props: "18", rate: "72%", priority: "Critical", pColor: "#EF4444" },
                            { obj: "Deals", vol: "1 845", props: "22", rate: "58%", priority: "Critical", pColor: "#EF4444" },
                            { obj: "Activites / Notes", vol: "45 600", props: "5", rate: "91%", priority: "High", pColor: "#FF7A59" },
                            { obj: "Emails logges", vol: "89 200", props: "0", rate: "100%", priority: "High", pColor: "#FF7A59" },
                            { obj: "Tickets / Support", vol: "2 100", props: "12", rate: "45%", priority: "Medium", pColor: "#4B5EFC" },
                            { obj: "Produits / Line items", vol: "340", props: "8", rate: "80%", priority: "Low", pColor: "#22C55E" },
                          ].map((row) => (
                            <tr key={row.obj} className="border-b border-[#F8F8F8] hover:bg-[#FAFAFA]">
                              <td className="px-4 py-2.5 font-medium text-[#111]">{row.obj}</td>
                              <td className="px-4 py-2.5 text-[#555]">{row.vol}</td>
                              <td className="px-4 py-2.5 text-[#555]">{row.props}</td>
                              <td className="px-4 py-2.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 h-1.5 rounded-full bg-[#F2F2F2]">
                                    <div className="h-full rounded-full bg-[#4B5EFC]" style={{ width: row.rate }} />
                                  </div>
                                  <span className="text-[#555]">{row.rate}</span>
                                </div>
                              </td>
                              <td className="px-4 py-2.5">
                                <span className="text-[9px] font-medium px-1.5 py-0.5 rounded" style={{ background: `${row.pColor}15`, color: row.pColor }}>{row.priority}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Ce qu&apos;il faut documenter en plus des donnees :</strong></p>
                    <p>Les workflows actifs et leur logique (declencheurs, conditions, actions). Les rapports et dashboards utilises par le management. Les vues personnalisees de chaque utilisateur. Les integrations actives (outil de marketing automation, facturation, support, enrichissement). Les permissions et roles utilisateurs. Les templates d&apos;emails et sequences de prospection. C&apos;est un travail fastidieux mais indispensable. Chaque element oublie a ce stade sera un probleme lors du deploiement.</p>
                    <p>Comptez 3 a 5 jours pour un audit complet sur un CRM de taille moyenne (5 000 a 30 000 contacts, 10 a 30 utilisateurs).</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 : Etape 2 - Choix du nouveau CRM */}
              <section id="choix-crm" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#4B5EFC] bg-[#4B5EFC]/10 px-2 py-0.5 rounded">ETAPE 2</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Choix du nouveau CRM</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Le choix du CRM cible ne doit pas etre un concours de fonctionnalites. C&apos;est un choix strategique qui depend de la taille de votre equipe, de la complexite de votre cycle de vente, de votre stack technique existante et de votre budget. Voici les criteres reellement discriminants :</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {[
                      { critere: "Facilite d&apos;adoption", desc: "L&apos;interface est-elle intuitive ? Combien de temps faut-il pour former un commercial ? Un CRM que personne n&apos;utilise n&apos;a aucune valeur.", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
                      { critere: "Ecosysteme d&apos;integrations", desc: "Le CRM se connecte-t-il nativement a vos outils ? Combien d&apos;integrations dans le marketplace ? La qualite des APIs est-elle suffisante ?", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
                      { critere: "Cout total de possession", desc: "Pas seulement la licence. Ajoutez les couts d&apos;implementation, de formation, d&apos;integrations tierces et de maintenance annuelle. Un CRM a 50 EUR/mois peut couter plus cher qu&apos;un CRM a 100 EUR/mois.", icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
                      { critere: "Scalabilite", desc: "Le CRM tiendra-t-il quand vous passerez de 10 a 50 commerciaux ? De 5 000 a 100 000 contacts ? Les limites techniques arrivent souvent plus vite que prevu.", icon: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
                    ].map((item) => (
                      <div key={item.critere} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4B5EFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
                          <p className="text-[12px] font-semibold text-[#111]">{item.critere}</p>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.7]">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-[#4B5EFC]/20 bg-[#4B5EFC]/5 p-4 mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#4B5EFC]" />
                      <p className="text-[12px] font-semibold text-[#111]">Pourquoi HubSpot gagne souvent la comparaison</p>
                    </div>
                    <div className="space-y-2 text-[11px] text-[#555] leading-[1.7]">
                      <p>Pour les PME et ETI de 5 a 200 collaborateurs, HubSpot presente un equilibre rare entre puissance fonctionnelle et facilite d&apos;utilisation. Le CRM de base est gratuit (illimite en nombre de contacts et d&apos;utilisateurs). L&apos;ecosysteme de plus de 1 600 integrations couvre la quasi-totalite des besoins. L&apos;interface est la plus intuitive du marche, ce qui se traduit par des taux d&apos;adoption superieurs a 80% en moyenne.</p>
                      <p>HubSpot est aussi le seul CRM a proposer une plateforme tout-en-un (marketing, ventes, service, CMS, operations) avec des donnees unifiees. Cela elimine les problemes de synchronisation entre outils et offre une vue complete du parcours client. C&apos;est pour ces raisons que la majorite des migrations que nous accompagnons sont des migrations vers HubSpot.</p>
                    </div>
                  </div>

                  <div className="text-[13px] text-[#555] leading-[1.75]">
                    <p>Ne choisissez pas un CRM seul. Impliquez au minimum un commercial, un manager et un responsable marketing dans la decision. Demandez des demos personnalisees (pas des demos generiques) et faites un essai reel de 2 semaines avec vos propres donnees avant de vous engager.</p>
                  </div>
                </div>
              </section>

              {/* Section 5 : Etape 3 - Nettoyage des donnees */}
              <section id="nettoyage" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#4B5EFC] bg-[#4B5EFC]/10 px-2 py-0.5 rounded">ETAPE 3</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Nettoyage des donnees avant migration</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Regle d&apos;or de la migration CRM : ne migrez jamais des donnees sales vers un CRM propre. La migration est le meilleur moment pour faire le menage. Si vous importez vos doublons, vos formats incoherents et vos contacts obsoletes dans le nouveau CRM, vous aurez les memes problemes qu&apos;avant, mais dans un outil que personne ne maitrise encore.</p>
                    <p>Le nettoyage porte sur trois axes : deduplication, standardisation des formats et enrichissement des donnees manquantes.</p>
                  </div>

                  {/* Before/After Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    {/* Before */}
                    <div className="rounded-lg border-2 border-[#FEE2E2] bg-[#FFF5F5] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded-full bg-[#EF4444]/10 flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                        </div>
                        <p className="text-[12px] font-semibold text-[#EF4444]">Avant nettoyage</p>
                      </div>
                      <div className="space-y-2">
                        {[
                          { field: "Name", value: "jean-pierre DUPONT" },
                          { field: "Email", value: "jp.dupont@acme.COM" },
                          { field: "Telephone", value: "06 12 34 56 78" },
                          { field: "Entreprise", value: "Acme SAS" },
                          { field: "Ville", value: "paris" },
                          { field: "Secteur", value: "(vide)" },
                        ].map((item) => (
                          <div key={item.field} className="flex items-center justify-between">
                            <span className="text-[10px] text-[#999]">{item.field}</span>
                            <span className="text-[10px] text-[#EF4444] font-mono bg-[#EF4444]/5 px-1.5 py-0.5 rounded">{item.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-[#FEE2E2]">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#999]">Doublons</span>
                          <span className="text-[10px] text-[#EF4444] font-semibold">3 fiches pour ce contact</span>
                        </div>
                      </div>
                    </div>

                    {/* After */}
                    <div className="rounded-lg border-2 border-[#DCFCE7] bg-[#F0FFF4] p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <p className="text-[12px] font-semibold text-[#22C55E]">Apres nettoyage</p>
                      </div>
                      <div className="space-y-2">
                        {[
                          { field: "Name", value: "Jean-Pierre Dupont" },
                          { field: "Email", value: "jp.dupont@acme.com" },
                          { field: "Telephone", value: "+33612345678" },
                          { field: "Entreprise", value: "Acme" },
                          { field: "Ville", value: "Paris" },
                          { field: "Secteur", value: "SaaS / Logiciel" },
                        ].map((item) => (
                          <div key={item.field} className="flex items-center justify-between">
                            <span className="text-[10px] text-[#999]">{item.field}</span>
                            <span className="text-[10px] text-[#22C55E] font-mono bg-[#22C55E]/5 px-1.5 py-0.5 rounded">{item.value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-[#DCFCE7]">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#999]">Doublons</span>
                          <span className="text-[10px] text-[#22C55E] font-semibold">1 fiche unique fusionnee</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Deduplication :</strong> identifiez les doublons par email (critere principal), puis par combinaison nom + entreprise, puis par telephone. Definissez des regles de fusion : quelle fiche prime quand deux fiches ont des informations contradictoires ? En general, on conserve la fiche la plus recente et la plus complete.</p>
                    <p><strong className="text-[#111]">Standardisation :</strong> uniformisez les formats de telephone (E.164 international), les noms (Title Case), les emails (minuscules), les noms d&apos;entreprises (sans les formes juridiques), les adresses et les valeurs de dropdown. Etablissez un dictionnaire de reference pour chaque champ critique.</p>
                    <p><strong className="text-[#111]">Enrichissement :</strong> profitez de la migration pour combler les champs vides. Utilisez des outils comme Dropcontact, Clearbit ou Apollo pour enrichir automatiquement le secteur d&apos;activite, la taille d&apos;entreprise, le chiffre d&apos;affaires, le poste et le profil LinkedIn. Un enrichissement systematique avant la migration ameliore immediatement la qualite de votre nouvelle base.</p>
                    <p>Comptez 1 a 2 semaines pour le nettoyage complet d&apos;une base de 10 000 a 50 000 contacts.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 : Etape 4 - Mapping des champs */}
              <section id="mapping" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#4B5EFC] bg-[#4B5EFC]/10 px-2 py-0.5 rounded">ETAPE 4</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Mapping des champs</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Le mapping est l&apos;etape la plus technique et la plus critique. Il s&apos;agit de definir la correspondance exacte entre chaque champ de l&apos;ancien CRM et chaque champ du nouveau. Un mapping incomplet ou incorrect est la premiere cause de perte de donnees lors d&apos;une migration.</p>
                    <p>Chaque objet (contacts, entreprises, deals, activites) doit avoir son propre tableau de mapping. Voici un exemple pour l&apos;objet Contact :</p>
                  </div>

                  {/* CSS Visual Field Mapping Table */}
                  <div className="rounded-lg border border-[#EAEAEA] overflow-hidden mb-5">
                    <div className="bg-[#FAFAFA] border-b border-[#EAEAEA] px-4 py-2.5">
                      <p className="text-[11px] font-semibold text-[#111]">Mapping des champs Contact : Salesforce vers HubSpot</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-[11px]">
                        <thead>
                          <tr className="border-b border-[#F2F2F2]">
                            <th className="text-left px-4 py-2.5 text-[#999] font-medium">Champ source (Salesforce)</th>
                            <th className="text-center px-2 py-2.5 text-[#999] font-medium w-10"></th>
                            <th className="text-left px-4 py-2.5 text-[#999] font-medium">Champ cible (HubSpot)</th>
                            <th className="text-left px-4 py-2.5 text-[#999] font-medium">Type</th>
                            <th className="text-left px-4 py-2.5 text-[#999] font-medium">Transformation</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { source: "FirstName", target: "firstname", type: "Texte", transform: "Aucune", color: "#22C55E" },
                            { source: "LastName", target: "lastname", type: "Texte", transform: "Aucune", color: "#22C55E" },
                            { source: "Email", target: "email", type: "Email", transform: "Lowercase", color: "#4B5EFC" },
                            { source: "Phone", target: "phone", type: "Telephone", transform: "Format E.164", color: "#FF7A59" },
                            { source: "Account.Name", target: "company", type: "Texte", transform: "Suppr. forme juridique", color: "#FF7A59" },
                            { source: "Title", target: "jobtitle", type: "Texte", transform: "Aucune", color: "#22C55E" },
                            { source: "LeadSource", target: "hs_lead_source", type: "Dropdown", transform: "Remapping valeurs", color: "#EF4444" },
                            { source: "Industry", target: "industry", type: "Dropdown", transform: "Remapping valeurs", color: "#EF4444" },
                            { source: "Rating", target: "hs_lead_status", type: "Dropdown", transform: "Conversion echelle", color: "#EF4444" },
                            { source: "Description", target: "notes_description", type: "Texte long", transform: "Aucune", color: "#22C55E" },
                            { source: "CreatedDate", target: "createdate", type: "Date", transform: "Format ISO 8601", color: "#4B5EFC" },
                            { source: "Custom__c", target: "propriete_custom", type: "Variable", transform: "Creer la propriete", color: "#6C5CE7" },
                          ].map((row) => (
                            <tr key={row.source} className="border-b border-[#F8F8F8] hover:bg-[#FAFAFA]">
                              <td className="px-4 py-2.5">
                                <span className="font-mono text-[#111] bg-[#F5F5F5] px-1.5 py-0.5 rounded text-[10px]">{row.source}</span>
                              </td>
                              <td className="text-center px-2 py-2.5">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={row.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                              </td>
                              <td className="px-4 py-2.5">
                                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${row.color}10`, color: row.color }}>{row.target}</span>
                              </td>
                              <td className="px-4 py-2.5 text-[#555]">{row.type}</td>
                              <td className="px-4 py-2.5">
                                <span className={`text-[10px] ${row.transform === "Aucune" ? "text-[#999]" : "text-[#111] font-medium"}`}>{row.transform}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="rounded-lg bg-[#FFF7ED] border border-[#FFEDD5] p-4 mb-5">
                    <div className="flex items-start gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                      <div>
                        <p className="text-[11px] font-semibold text-[#111] mb-1">Attention aux champs Dropdown</p>
                        <p className="text-[10px] text-[#777] leading-[1.6]">Les champs a valeurs predefinies (dropdown, radio, checkbox) necessitent un remapping individuel des valeurs. Chaque valeur du CRM source doit correspondre a une valeur exacte dans le CRM cible. Par exemple, &quot;Enterprise&quot; dans Salesforce doit etre mappe vers &quot;Entreprise (250+ salaries)&quot; dans HubSpot. Documentez chaque correspondance dans un fichier separe.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Creez les proprietes custom dans le CRM cible avant de lancer la migration. Verifiez que les types de champs sont compatibles (un champ texte libre dans Salesforce mappe vers un dropdown dans HubSpot necessite un nettoyage prealable). Et n&apos;oubliez pas les associations : un deal dans Salesforce peut etre associe a un contact et une entreprise, cette relation doit etre preservee dans HubSpot.</p>
                    <p>Le mapping prend generalement 2 a 4 jours. C&apos;est un investissement qui evite des semaines de corrections post-migration.</p>
                  </div>
                </div>
              </section>

              {/* Section 7 : Etape 5 - Migration technique */}
              <section id="migration-technique" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#4B5EFC] bg-[#4B5EFC]/10 px-2 py-0.5 rounded">ETAPE 5</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Migration technique</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>L&apos;execution technique de la migration peut se faire de plusieurs facons, du plus simple au plus complexe. Le choix depend du volume de donnees, de la complexite des objets a migrer et du budget disponible. Voici les quatre approches principales avec leurs avantages et limites.</p>
                  </div>

                  <div className="space-y-3 mb-5">
                    {[
                      { tool: "Import CSV natif HubSpot", desc: "L&apos;approche la plus simple. Exportez vos donnees en CSV depuis l&apos;ancien CRM, mappez les colonnes lors de l&apos;import dans HubSpot. Gratuit et integre. Limite a des migrations simples (contacts, entreprises). Ne gere pas les associations complexes ni les activites.", price: "Gratuit", complexity: "Simple", best: "Bases de moins de 5 000 contacts, peu de proprietes custom", color: "#22C55E" },
                      { tool: "Import2 / Trujay", desc: "Outils SaaS specialises dans la migration CRM. Ils connectent directement les deux CRM et transferent les donnees en preservant les associations, l&apos;historique des activites et les pieces jointes. Interface guidee etape par etape. Gestion du mapping dans l&apos;outil.", price: "A partir de 500 EUR", complexity: "Medium", best: "Migrations standard Salesforce/Pipedrive/Zoho vers HubSpot", color: "#4B5EFC" },
                      { tool: "Make (ex-Integromat) / Zapier", desc: "Outils d&apos;automatisation qui permettent de creer des flux de migration personnalises. Plus flexibles que les outils dedies mais necessitent une configuration manuelle des scenarios. Bons pour les migrations incrementales ou les synchronisations en continu pendant la phase de transition.", price: "A partir de 50 EUR/mois", complexity: "Medium-haute", best: "Migrations avec logique conditionnelle, synchronisation bidirectionnelle temporaire", color: "#6C5CE7" },
                      { tool: "Scripts custom (API)", desc: "Developpement sur mesure de scripts de migration via les APIs des deux CRM. Flexibilite totale sur la logique de transformation, le mapping complexe et les regles de deduplication. Necessite un developpeur et du temps de tests. L&apos;approche la plus fiable pour les migrations complexes.", price: "2 000 a 15 000 EUR", complexity: "High", best: "Migrations complexes, gros volumes, logique metier specifique", color: "#FF7A59" },
                    ].map((item) => (
                      <div key={item.tool} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                          <p className="text-[12px] font-semibold text-[#111]">{item.tool}</p>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.7] mb-3">{item.desc}</p>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="rounded-lg bg-[#FAFAFA] px-2.5 py-2 text-center">
                            <p className="text-[9px] text-[#999] mb-0.5">Cout</p>
                            <p className="text-[10px] font-semibold text-[#111]">{item.price}</p>
                          </div>
                          <div className="rounded-lg bg-[#FAFAFA] px-2.5 py-2 text-center">
                            <p className="text-[9px] text-[#999] mb-0.5">Complexite</p>
                            <p className="text-[10px] font-semibold text-[#111]">{item.complexity}</p>
                          </div>
                          <div className="rounded-lg bg-[#FAFAFA] px-2.5 py-2 text-center">
                            <p className="text-[9px] text-[#999] mb-0.5">Ideal pour</p>
                            <p className="text-[10px] font-medium text-[#555] leading-[1.4]">{item.best}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Notre recommandation :</strong> pour une migration de PME vers HubSpot (5 000 a 50 000 contacts), la combinaison Import2 pour les donnees principales + Make pour les flux specifiques offre le meilleur rapport qualite/prix. Pour les ETI avec des besoins complexes, les scripts custom via les APIs restent la solution la plus fiable.</p>
                    <p>Quelle que soit l&apos;approche choisie, commencez toujours par une migration de test sur un echantillon de 500 a 1 000 enregistrements. Validez chaque champ, chaque association et chaque historique avant de lancer la migration complete.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 : Etape 6 - Tests et validation */}
              <section id="tests-validation" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#4B5EFC] bg-[#4B5EFC]/10 px-2 py-0.5 rounded">ETAPE 6</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Tests et validation</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>La phase de tests est ce qui separe une migration reussie d&apos;une catastrophe. Ne la sacrifiez jamais pour gagner du temps. Chaque heure investie en tests economise des jours de corrections post-deploiement. Voici la checklist complete des verifications a effectuer avant, pendant et apres la migration.</p>
                  </div>

                  <div className="space-y-4 mb-5">
                    {[
                      {
                        phase: "Avant la migration (pre-checks)",
                        color: "#4B5EFC",
                        items: [
                          "Verifier que toutes les proprietes custom existent dans le CRM cible",
                          "Valider que les valeurs de dropdown sont correctement mappees",
                          "Confirmer les regles de deduplication et de fusion",
                          "Tester le mapping sur un echantillon de 500 enregistrements",
                          "Verifier que les associations (contact-entreprise-deal) sont preservees",
                          "Sauvegarder l&apos;integralite de la base source (export complet en CSV)",
                        ],
                      },
                      {
                        phase: "Pendant la migration (monitoring)",
                        color: "#FF7A59",
                        items: [
                          "Suivre le taux d&apos;erreur en temps reel (objectif : moins de 1%)",
                          "Verifier que les volumes correspondent (nombre de contacts, deals, activites)",
                          "Controler les enregistrements rejetes et documenter les raisons",
                          "Valider que la migration ne genere pas de doublons",
                        ],
                      },
                      {
                        phase: "Apres la migration (validation)",
                        color: "#22C55E",
                        items: [
                          "Comparer les totaux : source vs cible pour chaque objet",
                          "Verifier 50 fiches au hasard en detail (tous les champs)",
                          "Tester les rapports cles : pipeline, forecast, activite commerciale",
                          "Valider que les workflows et automatisations fonctionnent",
                          "Verifier les integrations tierces (marketing automation, facturation)",
                          "Faire tester par 2-3 commerciaux pilotes pendant 48 heures",
                          "Valider la coherence des montants (somme pipeline, CA cloture)",
                        ],
                      },
                    ].map((phase) => (
                      <div key={phase.phase} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full" style={{ background: phase.color }} />
                          <p className="text-[12px] font-semibold text-[#111]">{phase.phase}</p>
                        </div>
                        <div className="space-y-2">
                          {phase.items.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div className="w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center" style={{ borderColor: phase.color }}>
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={phase.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                              </div>
                              <p className="text-[11px] text-[#555] leading-[1.6]">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Le test ultime :</strong> demandez a vos commerciaux pilotes de retrouver 10 contacts specifiques et de verifier que toutes les informations sont presentes (coordonnees, historique des echanges, deals associes, notes). Si un commercial ne retrouve pas ses donnees en moins de 30 secondes, il y a un probleme.</p>
                    <p>Prevoyez 3 a 5 jours pour la phase de tests. N&apos;hesitez pas a faire plusieurs iterations de migration de test si necessaire. Il vaut mieux overdueer le deploiement d&apos;une semaine que de deployer une base incomplete.</p>
                  </div>
                </div>
              </section>

              {/* Section 9 : Etape 7 - Formation et adoption */}
              <section id="formation-adoption" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#4B5EFC] bg-[#4B5EFC]/10 px-2 py-0.5 rounded">ETAPE 7</span>
                  </div>
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Formation et adoption</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>La migration technique peut etre parfaite, si vos equipes n&apos;utilisent pas le nouveau CRM, le projet est un echec. L&apos;adoption est le facteur numero un de succes d&apos;une migration CRM. Et l&apos;adoption ne se decrète pas : elle se construit methodiquement avant, pendant et apres le deploiement.</p>
                    <p>Le changement de CRM est un changement d&apos;habitudes. Et les humains detestent changer d&apos;habitudes. Voici les leviers qui fonctionnent reellement pour assurer une adoption rapide.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    {[
                      { title: "Impliquer les equipes des le depart", desc: "Ne faites pas la migration dans votre coin. Identifiez 2-3 champions par equipe (commerciaux, marketing, support) qui participent aux decisions, testent en avance et deviennent les ambassadeurs internes du nouveau CRM.", color: "#4B5EFC" },
                      { title: "Former par role, pas par fonctionnalite", desc: "Un commercial n&apos;a pas besoin de la meme formation qu&apos;un manager. Creez des parcours de formation par profil utilisateur. 2 heures pour les utilisateurs basiques, 4 heures pour les managers, 1 journee pour les administrateurs.", color: "#22C55E" },
                      { title: "Creer des guides visuels accessibles", desc: "Des documents de reference courts (1-2 pages max) avec des captures d&apos;ecran pour les actions quotidiennes : creer un contact, logger un appel, avancer un deal, sortir un rapport. Disponibles dans un wiki interne ou un canal Slack dedie.", color: "#6C5CE7" },
                      { title: "Mesurer et suivre l&apos;adoption", desc: "Definissez des metriques d&apos;adoption claires : nombre de connexions quotidiennes, taux de remplissage des champs obligatoires, nombre d&apos;activites loggees par semaine. Faites un point hebdomadaire les 4 premieres semaines.", color: "#FF7A59" },
                    ].map((item) => (
                      <div key={item.title} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                          <p className="text-[12px] font-semibold text-[#111]">{item.title}</p>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.7]">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Le piege classique :</strong> une session de formation unique de 3 heures le jour du deploiement. Les equipes retiennent 20% de ce qui a ete montre, et oublient tout en une semaine. Preferez des micro-sessions de 30 minutes etalees sur 2-3 semaines, avec des exercices pratiques sur de vraies donnees.</p>
                    <p><strong className="text-[#111]">Le conseil qui change tout :</strong> coupez l&apos;acces a l&apos;ancien CRM 2 semaines apres le deploiement. Tant que l&apos;ancien outil est accessible, une partie de l&apos;equipe continuera a l&apos;utiliser. La date de coupure doit etre annoncee a l&apos;avance et non negociable.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 : Les migrations courantes */}
              <section id="migrations-courantes" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les migrations courantes vers HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Chaque migration a ses specificites selon le CRM d&apos;origine. Voici les trois scenarios que nous rencontrons le plus souvent, avec les points d&apos;attention specifiques a chacun.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Salesforce → HubSpot */}
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded bg-[#00A1E0]/10 flex items-center justify-center text-[9px] font-bold text-[#00A1E0]">SF</div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                            <div className="w-6 h-6 rounded bg-[#FF7A59]/10 flex items-center justify-center text-[9px] font-bold text-[#FF7A59]">HS</div>
                          </div>
                          <p className="text-[12px] font-semibold text-[#111]">Salesforce vers HubSpot</p>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#EF4444]/10 text-[#EF4444]">Complexite haute</span>
                      </div>
                      <p className="text-[11px] text-[#777] leading-[1.7] mb-3">La migration la plus complexe mais aussi la plus courante. Salesforce a une architecture tres differente de HubSpot : objets custom, formules, validation rules, Apex triggers. Le mapping des objets custom Salesforce vers des proprietes HubSpot necessite une reflexion approfondie sur le modele de donnees cible.</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["Mapper les objets custom vers des proprietes ou des objets custom HubSpot", "Convertir les formules Salesforce en proprietes calculees HubSpot", "Migrer les Opportunities avec les Contact Roles (associations)", "Recreer les rapports Salesforce dans le tableau de bord HubSpot", "Migrer les fichiers attaches (Salesforce Files)", "Reconfigurer les regles d&apos;attribution (assignment rules)"].map((f) => (
                          <p key={f} className="text-[10px] text-[#555] flex items-start gap-1.5"><span className="text-[#00A1E0] shrink-0">+</span>{f}</p>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-[#F2F2F2]">
                        <p className="text-[10px] text-[#999]"><strong className="text-[#111]">Duree moyenne :</strong> 6 a 12 semaines | <strong className="text-[#111]">Budget :</strong> 5 000 a 25 000 EUR</p>
                      </div>
                    </div>

                    {/* Pipedrive → HubSpot */}
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded bg-[#017737]/10 flex items-center justify-center text-[9px] font-bold text-[#017737]">PD</div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                            <div className="w-6 h-6 rounded bg-[#FF7A59]/10 flex items-center justify-center text-[9px] font-bold text-[#FF7A59]">HS</div>
                          </div>
                          <p className="text-[12px] font-semibold text-[#111]">Pipedrive vers HubSpot</p>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#FF7A59]/10 text-[#FF7A59]">Complexite moyenne</span>
                      </div>
                      <p className="text-[11px] text-[#777] leading-[1.7] mb-3">Migration relativement fluide car les deux outils ont une philosophie similaire orientee vente. Le modele de donnees est proche. Les principales difficultes portent sur les champs Pipedrive &quot;Organizations&quot; (qui deviennent des Companies dans HubSpot) et la migration des activites et des emails logges.</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["Mapper Organizations vers Companies (logique similaire)", "Migrer les Deals avec le pipeline et les stages", "Convertir les filtres Pipedrive en vues HubSpot", "Migrer les fichiers et notes attaches aux deals", "Reconfigurer les automatisations (Pipedrive Automations vers Workflows)", "Migrer les templates d&apos;emails et sequences"].map((f) => (
                          <p key={f} className="text-[10px] text-[#555] flex items-start gap-1.5"><span className="text-[#017737] shrink-0">+</span>{f}</p>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-[#F2F2F2]">
                        <p className="text-[10px] text-[#999]"><strong className="text-[#111]">Duree moyenne :</strong> 3 a 6 semaines | <strong className="text-[#111]">Budget :</strong> 2 000 a 8 000 EUR</p>
                      </div>
                    </div>

                    {/* Excel → HubSpot */}
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded bg-[#217346]/10 flex items-center justify-center text-[9px] font-bold text-[#217346]">XL</div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                            <div className="w-6 h-6 rounded bg-[#FF7A59]/10 flex items-center justify-center text-[9px] font-bold text-[#FF7A59]">HS</div>
                          </div>
                          <p className="text-[12px] font-semibold text-[#111]">Excel / Google Sheets vers HubSpot</p>
                        </div>
                        <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#22C55E]/10 text-[#22C55E]">Complexite basse</span>
                      </div>
                      <p className="text-[11px] text-[#777] leading-[1.7] mb-3">La migration la plus simple techniquement mais souvent la plus sale en termes de qualite de donnees. Les fichiers Excel n&apos;ont aucune contrainte de format, ce qui genere des incoherences massives. Le nettoyage prealable est d&apos;autant plus critique. L&apos;import natif HubSpot suffit dans la majorite des cas.</p>
                      <div className="grid grid-cols-2 gap-2">
                        {["Nettoyer et standardiser les colonnes avant import", "Creer les proprietes custom dans HubSpot avant l&apos;import", "Gerer les doublons (pas de cle unique dans Excel)", "Separer les contacts et les entreprises dans des fichiers distincts", "Definir les associations contact-entreprise via une colonne commune", "Verifier les formats de dates (attention au format FR vs US)"].map((f) => (
                          <p key={f} className="text-[10px] text-[#555] flex items-start gap-1.5"><span className="text-[#217346] shrink-0">+</span>{f}</p>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-[#F2F2F2]">
                        <p className="text-[10px] text-[#999]"><strong className="text-[#111]">Duree moyenne :</strong> 1 a 3 semaines | <strong className="text-[#111]">Budget :</strong> 500 a 3 000 EUR</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 11 : Timeline et budget — Dark section */}
              <section id="timeline-budget" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <h2 className="text-[17px] font-semibold text-white mb-4">Timeline et budget d&apos;une migration CRM</h2>
                  <div className="space-y-3 text-[13px] text-[#999] leading-[1.75] mb-6">
                    <p>Une migration CRM bien geree prend entre 8 et 12 semaines pour une PME de taille moyenne. C&apos;est plus long que ce que la plupart des entreprises anticipent, mais c&apos;est le temps necessaire pour faire les choses correctement. Voici la timeline type avec la repartition des efforts.</p>
                  </div>

                  {/* CSS Gantt-like Timeline */}
                  <div className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4 mb-6 overflow-x-auto">
                    <p className="text-[11px] font-semibold text-white mb-4">Timeline type : migration CRM en 10 semaines</p>
                    <div className="space-y-2 min-w-[500px]">
                      {/* Week headers */}
                      <div className="flex items-center gap-0">
                        <div className="w-[140px] shrink-0" />
                        {Array.from({ length: 10 }, (_, i) => (
                          <div key={i} className="flex-1 text-center">
                            <span className="text-[8px] text-[#666]">S{i + 1}</span>
                          </div>
                        ))}
                      </div>
                      {[
                        { phase: "Audit de l&apos;existant", start: 0, duration: 2, color: "#4B5EFC" },
                        { phase: "Choix CRM + setup", start: 1, duration: 2, color: "#6C5CE7" },
                        { phase: "Nettoyage donnees", start: 2, duration: 3, color: "#FF7A59" },
                        { phase: "Mapping des champs", start: 3, duration: 2, color: "#4B5EFC" },
                        { phase: "Migration de test", start: 5, duration: 1, color: "#22C55E" },
                        { phase: "Corrections + ajustements", start: 6, duration: 1, color: "#FF7A59" },
                        { phase: "Migration finale", start: 7, duration: 1, color: "#EF4444" },
                        { phase: "Tests + validation", start: 7, duration: 2, color: "#22C55E" },
                        { phase: "Formation equipes", start: 8, duration: 2, color: "#6C5CE7" },
                        { phase: "Support post-migration", start: 9, duration: 1, color: "#4B5EFC" },
                      ].map((item) => (
                        <div key={item.phase} className="flex items-center gap-0">
                          <div className="w-[140px] shrink-0 text-[10px] text-[#999] pr-3 text-right">{item.phase}</div>
                          <div className="flex-1 flex items-center relative h-5">
                            <div
                              className="absolute h-4 rounded-full opacity-80"
                              style={{
                                left: `${(item.start / 10) * 100}%`,
                                width: `${(item.duration / 10) * 100}%`,
                                background: item.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      {/* Week grid lines */}
                      <div className="flex items-center gap-0">
                        <div className="w-[140px] shrink-0" />
                        <div className="flex-1 flex">
                          {Array.from({ length: 10 }, (_, i) => (
                            <div key={i} className="flex-1 border-l border-[#333] h-1" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cost Breakdown Table */}
                  <div className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4 mb-6">
                    <p className="text-[11px] font-semibold text-white mb-3">Estimation budgetaire par poste</p>
                    <div className="space-y-0">
                      {[
                        { poste: "Audit et conseil strategique", fourchette: "1 500 - 4 000 EUR", pct: "15%" },
                        { poste: "Nettoyage et preparation des donnees", fourchette: "1 000 - 3 000 EUR", pct: "15%" },
                        { poste: "Mapping et configuration CRM cible", fourchette: "2 000 - 6 000 EUR", pct: "25%" },
                        { poste: "Migration technique (outils + scripts)", fourchette: "1 500 - 8 000 EUR", pct: "25%" },
                        { poste: "Tests et validation", fourchette: "500 - 2 000 EUR", pct: "10%" },
                        { poste: "Formation et accompagnement", fourchette: "1 000 - 3 000 EUR", pct: "10%" },
                      ].map((item, idx) => (
                        <div key={item.poste} className={`flex items-center justify-between py-2.5 ${idx < 5 ? "border-b border-[#333]" : ""}`}>
                          <span className="text-[11px] text-[#999]">{item.poste}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-[11px] text-white font-medium">{item.fourchette}</span>
                            <span className="text-[9px] text-[#666] w-8 text-right">{item.pct}</span>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#555]">
                        <span className="text-[11px] text-white font-semibold">Total migration</span>
                        <span className="text-[13px] text-[#4B5EFC] font-bold">7 500 - 26 000 EUR</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#999] leading-[1.75]">
                    <p>Ces fourchettes correspondent a une migration accompagnee par un prestataire specialise pour une PME de 10 a 50 utilisateurs. Les couts varient principalement en fonction du volume de donnees, du nombre de proprietes custom et de la complexite des integrations a reconfigurer.</p>
                    <p>A ces couts s&apos;ajoutent les licences du nouveau CRM et le cout interne (temps passe par vos equipes sur le projet). Prevoyez que votre responsable CRM/ops y consacre 30 a 50% de son temps pendant les 10 semaines du projet.</p>
                  </div>
                </div>
              </section>

              {/* Section 12 : Notre methode chez Ceres — Dark section */}
              <section id="methode-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-[#4B5EFC]/20 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B5EFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-white">Notre methode de migration chez Ceres</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#999] leading-[1.75] mb-6">
                    <p>Chez Ceres, nous avons accompagne des dizaines de migrations CRM vers HubSpot. De la startup en pre-seed qui quitte un tableur Excel a l&apos;ETI de 200 commerciaux qui migre depuis Salesforce. Chaque migration est differente, mais notre methode reste la meme : un processus structure en 7 etapes, avec des checkpoints de validation a chaque phase et zero improvisation.</p>
                    <p>Voici ce qui nous differencie des prestataires generiques :</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {[
                      { title: "Audit exhaustif avant devis", desc: "Nous auditons votre CRM actuel gratuitement avant de vous proposer un devis. Pas d&apos;estimation a l&apos;aveugle : nous connaissons le volume exact, la complexite reelle et les points de friction specifiques a votre migration.", color: "#4B5EFC" },
                      { title: "Nettoyage integre au processus", desc: "Nous ne migrons jamais de donnees sales. Le nettoyage (deduplication, standardisation, enrichissement) est integre a chaque migration. Vous partez avec une base propre et exploitable des le jour 1 dans HubSpot.", color: "#22C55E" },
                      { title: "Migration de test systematique", desc: "Nous faisons toujours une migration de test complete avant la migration finale. Vos equipes valident les donnees dans un environnement sandbox. Les corrections sont faites avant le deploiement, pas apres.", color: "#6C5CE7" },
                      { title: "Formation sur mesure par role", desc: "Nous formons chaque profil utilisateur sur ses cas d&apos;usage reels, pas sur une demo generique. Commerciaux, managers, marketing, support : chacun recoit une formation adaptee a son quotidien.", color: "#FF7A59" },
                      { title: "Support post-migration de 30 jours", desc: "Nous restons disponibles 30 jours apres le deploiement pour corriger les ajustements, repondre aux questions des utilisateurs et optimiser les premieres semaines d&apos;utilisation. Pas de migration livree et oubliee.", color: "#4B5EFC" },
                      { title: "Garantie zero perte de donnees", desc: "Nous nous engageons contractuellement sur l&apos;integralite de vos donnees. Chaque enregistrement migre est verifie. En cas de probleme, nous avons les sauvegardes et les scripts pour corriger immediatement.", color: "#EF4444" },
                    ].map((item) => (
                      <div key={item.title} className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                          <p className="text-[12px] font-semibold text-white">{item.title}</p>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.6]">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4 mb-6">
                    <p className="text-[12px] font-semibold text-white mb-3">Resultats moyens de nos migrations</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { stat: "100%", label: "Donnees migrees sans perte", color: "#22C55E" },
                        { stat: "85%", label: "Taux d&apos;adoption a J+30", color: "#4B5EFC" },
                        { stat: "-40%", label: "Doublons elimines au passage", color: "#6C5CE7" },
                        { stat: "8 sem.", label: "Duree moyenne du projet", color: "#FF7A59" },
                      ].map((r) => (
                        <div key={r.label} className="text-center">
                          <p className="text-[18px] font-bold mb-1" style={{ color: r.color }}>{r.stat}</p>
                          <p className="text-[10px] text-[#666]">{r.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#999] leading-[1.75]">
                    <p>Une migration CRM reussie, c&apos;est une equipe qui utilise son nouveau CRM avec confiance des la premiere semaine. Des donnees propres, completes et bien structurees. Des automatisations qui fonctionnent. Et un reporting fiable des le premier jour. C&apos;est exactement ce que nous livrons a chaque mission.</p>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <div className="mb-12 rounded-lg bg-gradient-to-br from-[#111] to-[#1A1A1A] p-6 md:p-8 text-center border border-[#333]">
                <h3 className="text-[17px] font-semibold text-white mb-3">Vous envisagez une migration CRM ?</h3>
                <p className="text-[13px] text-[#999] leading-[1.7] mb-5 max-w-[500px] mx-auto">Chez Ceres, on audite votre CRM actuel, on planifie la migration et on l&apos;execute de A a Z. Un premier audit gratuit de 30 minutes pour evaluer la complexite de votre migration et vous donner une estimation realiste.</p>
                <Link href="https://calendly.com/ceres-revops/30min" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4B5EFC] text-white rounded-lg text-[13px] font-medium hover:bg-[#3D4FD9] transition-colors">
                  Planifier un audit migration
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </Link>
              </div>

              {/* Related articles */}
              <div>
                <h3 className="text-[14px] font-semibold text-[#111] mb-4">Articles complementaires</h3>
                <div className="grid gap-3">
                  {relatedArticles.map((a) => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="group flex items-center gap-4 rounded-lg border border-[#F2F2F2] p-4 hover:border-[#DDD] transition-colors">
                      <div className="w-1 h-10 rounded-full" style={{ background: a.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-medium mb-1" style={{ color: a.color }}>{a.category}</p>
                        <p className="text-[12px] font-medium text-[#111] group-hover:text-[#4B5EFC] transition-colors leading-[1.4]">{a.title}</p>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}