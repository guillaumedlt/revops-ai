"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "CRM pour PME en 2026 : le guide pour bien choisir",
  description: "Guide complet pour choisir le meilleur CRM pour votre PME en 2026. Comparatif detaille de HubSpot, Pipedrive, Salesforce, Zoho, Monday CRM, Folk et noCRM. Criteres de selection, pricing, fonctionnalites, erreurs a eviter et recommandations par profil.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-01-28",
  dateModified: "2026-01-28",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/crm-pme-2026" },
  articleSection: "CRM & HubSpot",
  wordCount: 3500,
  inLanguage: "fr",
};

const sections = [
  { id: "pourquoi-crm", title: "Pourquoi un CRM en 2026" },
  { id: "criteres", title: "Les 7 criteres de choix" },
  { id: "hubspot", title: "HubSpot CRM" },
  { id: "pipedrive", title: "Pipedrive" },
  { id: "salesforce", title: "Salesforce Essentials" },
  { id: "zoho", title: "Zoho CRM" },
  { id: "monday", title: "Monday CRM" },
  { id: "folk", title: "Folk CRM" },
  { id: "nocrm", title: "noCRM.io" },
  { id: "comparatif", title: "Tableau comparatif" },
  { id: "profil", title: "Quel CRM selon votre profil" },
  { id: "erreurs", title: "Erreurs a eviter" },
  { id: "recommandation", title: "Notre recommandation" },
];

const relatedArticles = [
  { title: "Comparatif outils de generation de leads et enrichissement B2B", slug: "comparatif-outils-generation-leads-enrichissement", category: "Process & Outils", color: "#6C5CE7" },
  { title: "9 actions commerciales que vous devriez automatiser dans HubSpot", slug: "9-actions-commerciales-automatiser-hubspot", category: "Automatisation", color: "#FF7A59" },
  { title: "Marketing Automation : 7 workflows HubSpot indispensables", slug: "marketing-automation-7-workflows-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function CrmPme2026Article() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("pourquoi-crm");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "6%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "18%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "32%", width: 260, height: 260, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "48%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "64%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "80%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.07, filter: "blur(70px)" }} />

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
                  <a href="https://twitter.com/intent/tweet?text=CRM%20pour%20PME%20en%202026%20%3A%20le%20guide%20pour%20bien%20choisir&url=https://www.ceres-revops.com/blog/crm-pme-2026" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/crm-pme-2026" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">CRM pour PME en 2026</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">18 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                CRM pour PME en 2026 : le guide pour bien choisir
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                HubSpot, Pipedrive, Salesforce, Zoho, Monday CRM, Folk, noCRM. Sept CRM, sept philosophies differentes. Lequel correspond vraiment a votre PME ? On a compare les fonctionnalites, les prix, les limites et les cas d&apos;usage de chaque outil pour vous aider a faire le bon choix. Un guide base sur notre experience terrain aupres de dizaines de PME francaises.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>28 janvier 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 : Pourquoi un CRM est indispensable pour une PME en 2026 */}
              <section id="pourquoi-crm" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi un CRM est indispensable pour une PME en 2026</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>En 2026, gerer ses clients et prospects sur Excel ou Google Sheets n&apos;est plus une option viable. Les PME qui continuent a fonctionner sans CRM perdent en moyenne 27% de leurs opportunites commerciales par manque de suivi, selon une etude Forrester. Ce n&apos;est pas un chiffre theorique : on le constate chaque semaine chez les PME que l&apos;on accompagne.</p>
                    <p>Le probleme fondamental est simple. Sans CRM, les informations clients sont dispersees : dans la boite mail du commercial, dans un fichier Excel partage, dans les notes du telephone, dans la tete du dirigeant. Quand un commercial quitte l&apos;entreprise, il emporte avec lui la moitie de la connaissance client. Quand un prospect rappelle trois semaines apres un premier contact, personne ne retrouve l&apos;historique.</p>
                    <p>Un CRM resout ces trois problemes structurels :</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" /><strong className="text-[#111]">Centralisation.</strong> Toutes les interactions clients (emails, appels, reunions, devis) sont stockees dans un seul endroit accessible a toute l&apos;equipe. Plus de perte d&apos;information, plus de silos.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" /><strong className="text-[#111]">Visibilite pipeline.</strong> Le dirigeant voit en temps reel combien de deals sont en cours, a quelle etape, pour quel montant. Il peut prevoir le chiffre d&apos;affaires a 30, 60 et 90 jours et prendre des decisions eclairees.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] mt-2 shrink-0" /><strong className="text-[#111]">Automatisation.</strong> Les relances, les suivis, les attributions de leads, les notifications internes : tout ce qui etait fait manuellement peut etre automatise. Un commercial passe en moyenne 65% de son temps sur des taches non commerciales. Le CRM compresse ce chiffre.</li>
                    </ul>
                    <p>Mais en 2026, le CRM n&apos;est plus seulement un carnet d&apos;adresses ameliore. Les attentes ont evolue. Les PME veulent un outil qui integre l&apos;email, le telephonique, le marketing, le devis et la facturation. Elles veulent de l&apos;intelligence artificielle pour suggerer les prochaines actions, scorer les leads et rediger des emails. Elles veulent une application mobile qui fonctionne vraiment, pas une version degradee du desktop.</p>
                    <p>Le marche a explose en consequence. Il existe aujourd&apos;hui plus de 800 solutions CRM dans le monde. Pour une PME francaise de 5 a 200 salaries, le choix se reduit a une dizaine d&apos;options serieuses. Ce guide analyse les sept qui reviennent le plus souvent dans les conversations que nous avons avec nos clients.</p>
                  </div>

                  {/* Key stats */}
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                      { stat: "27%", label: "d'opportunites perdues sans CRM", color: "#4B5EFC" },
                      { stat: "65%", label: "du temps commercial sur des taches non-vente", color: "#FF7A59" },
                      { stat: "800+", label: "solutions CRM sur le marche mondial", color: "#6C5CE7" },
                    ].map((s) => (
                      <div key={s.label} className="rounded-xl border border-[#F2F2F2] p-4 text-center">
                        <p className="text-[22px] font-bold mb-1" style={{ color: s.color }}>{s.stat}</p>
                        <p className="text-[10px] text-[#999] leading-[1.4]">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 : Les 7 criteres pour choisir un CRM PME */}
              <section id="criteres" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les 7 criteres pour choisir un CRM PME</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Avant de comparer les outils un par un, il faut savoir sur quels criteres les evaluer. On a identifie sept dimensions qui comptent vraiment pour une PME. Ce ne sont pas des criteres theoriques : ce sont les points qui reviennent systematiquement quand on aide nos clients a choisir et a deployer un CRM.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: "Facilite de prise en main", desc: "Temps necessaire pour que l'equipe commerciale utilise vraiment l'outil au quotidien. Un CRM que personne n'utilise ne sert a rien. La prise en main doit etre possible en moins d'une semaine, sans formation lourde.", color: "#4B5EFC" },
                      { title: "Prix et transparence tarifaire", desc: "Cout reel par utilisateur et par mois, incluant les fonctionnalites necessaires. Attention aux prix d'appel qui explosent quand on ajoute les modules indispensables (sequences, reporting, automatisation).", color: "#6C5CE7" },
                      { title: "Integrations ecosysteme", desc: "Connexion native avec vos outils existants : messagerie (Gmail/Outlook), telephonie, facturation, marketing, LinkedIn. Plus l'ecosysteme est riche, moins vous aurez besoin de bricoler.", color: "#FF7A59" },
                      { title: "Application mobile", desc: "Pour les equipes terrain, la qualite de l'application mobile est decisive. L'app doit permettre de consulter les fiches contacts, loguer des appels et mettre a jour les deals en deplacement.", color: "#22C55E" },
                      { title: "Interface en francais et support FR", desc: "L'interface est-elle disponible en francais ? Le support client repond-il en francais et dans des horaires europeens ? Pour les PME non anglophones, c'est un critere eliminatoire.", color: "#4B5EFC" },
                      { title: "Scalabilite", desc: "Le CRM doit pouvoir accompagner la croissance de votre entreprise sans migration douloureuse. Passer de 3 a 30 utilisateurs, ajouter du marketing automation, integrer de la facturation : tout ca doit etre possible sans changer d'outil.", color: "#6C5CE7" },
                      { title: "Support et accompagnement", desc: "Qualite du support technique, disponibilite d'une documentation en francais, existence d'un reseau de partenaires locaux pour l'implementation et la formation. Un CRM mal deploye est pire que pas de CRM.", color: "#FF7A59" },
                    ].map((c) => (
                      <div key={c.title} className="rounded-xl border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                          <span className="text-[12px] font-semibold text-[#111]">{c.title}</span>
                        </div>
                        <p className="text-[11px] text-[#888] leading-[1.6]">{c.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 : HubSpot CRM */}
              <section id="hubspot" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">HubSpot CRM</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#4B5EFC]/10 text-[#4B5EFC]">Notre recommandation</span>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>HubSpot est devenu la reference CRM pour les PME en France et en Europe. La raison est simple : c&apos;est le seul CRM qui propose un plan gratuit reellement utilisable, avec un pipeline de vente, la gestion des contacts, le tracking des emails et un tableau de bord de base. Pour une PME qui demarre, c&apos;est imbattable.</p>
                    <p>La force de HubSpot reside dans son ecosysteme complet. Le CRM gratuit est la porte d&apos;entree, mais la plateforme couvre l&apos;ensemble du cycle client : marketing (landing pages, emails, SEO), ventes (sequences, devis, playbooks), service client (ticketing, base de connaissances) et operations (sync de donnees, automatisation). Tout est nativement integre, sans avoir besoin de connecter des outils tiers.</p>
                    <p>L&apos;interface est intuitive. Un commercial peut etre operationnel en deux a trois jours. Le drag-and-drop sur le pipeline, la synchronisation automatique des emails Gmail/Outlook, le tracking des ouvertures et clics : tout fonctionne sans configuration complexe. L&apos;application mobile est solide et permet de gerer les deals en deplacement.</p>
                    <p>Le point de friction, c&apos;est le prix des versions payantes. Le plan Starter a 20 euros par mois et par utilisateur est accessible. Mais les fonctionnalites avancees (sequences email, scoring predictif, reporting custom, workflows complexes) necessitent le plan Pro a 100 euros par mois et par utilisateur. Et le plan Enterprise demarre a 150 euros par mois et par utilisateur. Pour une equipe de 10 commerciaux, la facture Pro atteint 1 000 euros par mois.</p>
                    <p>L&apos;autre limite concerne la personnalisation. HubSpot est puissant mais opinionne. Il impose une certaine facon de travailler (objets standards, pipeline lineaire, logique contact-centric). Les entreprises avec des processus de vente tres specifiques ou atypiques peuvent se sentir contraintes. Salesforce offre plus de flexibilite a ce niveau, mais au prix d&apos;une complexite bien superieure.</p>
                    <p>En 2026, HubSpot a considerablement renforce son offre IA. L&apos;assistant Breeze genere des emails, resume les conversations, suggere des prochaines etapes et identifie les deals a risque. Le scoring predictif est desormais disponible sur le plan Pro. Ce sont des fonctionnalites qui font une vraie difference au quotidien pour les equipes commerciales.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing HubSpot Sales Hub (janvier 2026)</p>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { plan: "Free", price: "0 EUR", users: "Illimite", note: "Pipeline, contacts, email tracking" },
                        { plan: "Starter", price: "20 EUR/mois", users: "Par utilisateur", note: "Devis, objectifs, devises" },
                        { plan: "Pro", price: "100 EUR/mois", users: "Par utilisateur", note: "Sequences, workflows, reporting" },
                        { plan: "Enterprise", price: "150 EUR/mois", users: "Par utilisateur", note: "Predictif, playbooks, SSO" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Plan gratuit reellement utilisable", "Ecosysteme complet (vente, marketing, service)", "Interface intuitive, prise en main rapide", "1 600+ integrations dans le marketplace", "IA Breeze integree (redaction, scoring)", "Application mobile excellente", "Support en francais, large reseau de partenaires FR"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Limites</p>
                      {["Prix eleve sur les plans Pro et Enterprise", "Personnalisation limitee vs Salesforce", "Sequences reservees au plan Pro (100 EUR/mois)", "Reporting avance necessite le plan Pro minimum", "Cout des onboarding obligatoire (plans Pro/Enterprise)"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#C5CAF5] bg-[#EEF0FF] p-3">
                    <p className="text-[11px] font-semibold text-[#4B5EFC] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les PME de 2 a 100 salaries qui veulent un outil tout-en-un couvrant vente, marketing et service client. Particulierement adapte si vous prevoyez de grandir et avez besoin d&apos;un ecosysteme qui evolue avec vous. Le plan gratuit en fait le meilleur point de depart pour les equipes qui debutent avec un CRM.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 : Pipedrive */}
              <section id="pipedrive" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=pipedrive.com&sz=32" alt="Pipedrive" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">Pipedrive</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#22C55E]/10 text-[#22C55E]">Le plus commercial</span>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Pipedrive est ne avec une obsession : simplifier la gestion du pipeline commercial. Cree en 2010 par d&apos;anciens commerciaux, l&apos;outil a ete concu pour les vendeurs, pas pour les administrateurs. Et ca se sent immediatement dans l&apos;interface.</p>
                    <p>Le pipeline visuel en Kanban est le coeur du produit. Chaque deal est une carte que l&apos;on deplace d&apos;etape en etape. La vue est claire, epuree, et on comprend en un coup d&apos;oeil ou en sont toutes les affaires en cours. Les actions requises (relances, appels, reunions) sont mises en avant : Pipedrive pousse le commercial a agir plutot qu&apos;a observer.</p>
                    <p>L&apos;approche &ldquo;activity-based selling&rdquo; est la vraie valeur ajoutee de Pipedrive. L&apos;outil mesure le nombre d&apos;activites (appels, emails, reunions) par commercial et par deal. L&apos;idee est que le resultat depend du volume et de la qualite des actions. Cette philosophie convient parfaitement aux equipes commerciales dont le cycle de vente est court a moyen (1 a 3 mois) et base sur du volume.</p>
                    <p>Le pricing est simple et competitif. Le plan Essential a 14 euros par mois et par utilisateur donne acces a l&apos;essentiel : pipeline, contacts, emails, calendrier. Le plan Advanced a 39 euros integre les automatisations et les sequences email. Le plan Professional a 49 euros ajoute le reporting avance et les signatures electroniques. Pas de mauvaise surprise.</p>
                    <p>La limite principale de Pipedrive concerne le marketing. Il n&apos;y a pas de module marketing natif serieux. Pas de landing pages, pas d&apos;email marketing avance, pas de blog. Si vous avez besoin d&apos;aligner marketing et ventes dans un seul outil, Pipedrive ne suffira pas. Il faudra ajouter un Mailchimp, un Brevo ou un ActiveCampaign a cote, ce qui complexifie la stack et multiplie les couts.</p>
                    <p>Le support en francais est correct mais perfectible. L&apos;interface est entierement traduite, mais le support technique est principalement en anglais aux horaires US. Le reseau de partenaires en France est plus limite que celui de HubSpot ou Salesforce.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Pipedrive (janvier 2026)</p>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { plan: "Essential", price: "14 EUR/mois", users: "Par utilisateur", note: "Pipeline, contacts, calendrier" },
                        { plan: "Advanced", price: "39 EUR/mois", users: "Par utilisateur", note: "Automatisations, sequences" },
                        { plan: "Professional", price: "49 EUR/mois", users: "Par utilisateur", note: "Reporting, e-signature" },
                        { plan: "Power", price: "64 EUR/mois", users: "Par utilisateur", note: "Gestion de projet, tel." },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Pipeline visuel Kanban excellent", "Approche activity-based selling", "Prix competitif et transparent", "Prise en main tres rapide (1-2 jours)", "API ouverte et marketplace riche", "Application mobile bien pensee"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Limites</p>
                      {["Pas de module marketing natif", "Support en francais limite", "Reporting basique sur les petits plans", "Pas de plan gratuit", "Moins d'integrations natives que HubSpot", "Fonctionnalites IA en retard"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#D4EDDA] bg-[#F0FDF4] p-3">
                    <p className="text-[11px] font-semibold text-[#22C55E] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les equipes commerciales pures de 3 a 30 personnes avec un cycle de vente court a moyen. Ideal pour les PME qui veulent un CRM simple, centre sur le pipeline, sans avoir besoin de marketing automation integre. Excellent rapport qualite/prix pour les budgets serres.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 : Salesforce Essentials */}
              <section id="salesforce" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=salesforce.com&sz=32" alt="Salesforce" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">Salesforce Essentials</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#FF7A59]/10 text-[#FF7A59]">Souvent trop pour une PME</span>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Salesforce est le leader mondial du CRM avec plus de 20% de parts de marche. C&apos;est l&apos;outil de reference pour les grandes entreprises et les ETI. Mais qu&apos;en est-il pour les PME ? Salesforce propose un plan Essentials (rebaptise Starter en 2024) cense rendre la plateforme accessible aux petites structures. La realite est plus nuancee.</p>
                    <p>Salesforce Starter demarre a 25 euros par mois et par utilisateur. A ce prix, on obtient un CRM fonctionnel avec gestion des contacts, des opportunites, des comptes, un pipeline visuel et un reporting de base. L&apos;integration email est correcte et le mobile fonctionne. Sur le papier, c&apos;est competitif.</p>
                    <p>Le probleme, c&apos;est que Salesforce n&apos;a pas ete concu pour les PME. L&apos;interface est plus complexe que celle de HubSpot ou Pipedrive. La terminologie est specifique (Opportunities au lieu de Deals, Leads vs Contacts, Accounts vs Companies). La configuration initiale demande plus de temps et souvent l&apos;intervention d&apos;un consultant certifie.</p>
                    <p>Surtout, les fonctionnalites avancees dont vous aurez rapidement besoin (automatisations, sequences, reporting custom, integrations avancees) sont reservees aux plans superieurs. Le plan Pro a 80 euros par mois et par utilisateur et le plan Enterprise a 165 euros par mois et par utilisateur. A ce niveau de prix, la facture pour une equipe de 10 personnes atteint 800 a 1 650 euros par mois, sans compter les couts d&apos;implementation et de maintenance.</p>
                    <p>La vraie force de Salesforce reste sa personnalisation quasi illimitee. Objets custom, champs calcules, workflows complexes, Apex (langage de programmation proprietaire), Lightning Components : on peut construire pratiquement n&apos;importe quoi. Mais cette flexibilite a un cout. Il faut un administrateur Salesforce dedie ou un partenaire pour maintenir et faire evoluer l&apos;instance.</p>
                    <p>Notre constat apres avoir accompagne plusieurs dizaines de PME : dans 80% des cas, Salesforce est surdimensionne pour une PME de moins de 50 salaries. Les equipes sous-utilisent l&apos;outil, la complexite freine l&apos;adoption, et le cout total de possession (licence + implementation + maintenance + formation) est 2 a 3 fois superieur a celui de HubSpot ou Pipedrive pour un resultat comparable.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Salesforce Sales Cloud (janvier 2026)</p>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { plan: "Starter", price: "25 EUR/mois", users: "Par utilisateur", note: "CRM basique, max 10 users" },
                        { plan: "Pro", price: "80 EUR/mois", users: "Par utilisateur", note: "Pipeline, forecast" },
                        { plan: "Enterprise", price: "165 EUR/mois", users: "Par utilisateur", note: "Automatisations avancees" },
                        { plan: "Unlimited", price: "330 EUR/mois", users: "Par utilisateur", note: "IA Einstein, sandbox" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Personnalisation quasi illimitee", "Ecosysteme AppExchange (7 000+ apps)", "Scalabilite maximale (de 2 a 10 000 users)", "Leader du marche, standard de l'industrie", "IA Einstein puissante (plans hauts)"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Limites</p>
                      {["Interface complexe, prise en main longue", "Prix total eleve (licence + imple + maintenance)", "Surdimensionne pour la plupart des PME", "Necessite souvent un admin dedie", "Plan Starter limite a 10 utilisateurs", "Support en francais perfectible"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#FFDDD2] bg-[#FFF5F0] p-3">
                    <p className="text-[11px] font-semibold text-[#FF7A59] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les PME de plus de 50 salaries avec des processus de vente complexes, des besoins de personnalisation avances et un budget suffisant pour l&apos;implementation et la maintenance. Ou les PME qui anticipent une croissance forte et veulent un outil qui peut scaler jusqu&apos;a des centaines d&apos;utilisateurs sans migration.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 : Zoho CRM */}
              <section id="zoho" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=zoho.com&sz=32" alt="Zoho CRM" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">Zoho CRM</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#6C5CE7]/10 text-[#6C5CE7]">Meilleur rapport qualite/prix</span>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Zoho CRM est le challenger discret du marche. Moins mediatise que HubSpot ou Salesforce, il equipe pourtant plus de 250 000 entreprises dans le monde. Sa proposition de valeur : un CRM complet a un prix defiant toute concurrence, adosse a une suite de plus de 55 applications couvrant tous les besoins d&apos;une entreprise.</p>
                    <p>Le plan Standard a 14 euros par mois et par utilisateur offre deja beaucoup : pipeline visuel, workflows d&apos;automatisation basiques, reporting, scoring des leads, integration email. Le plan Professional a 23 euros par mois ajoute les formulaires web, la gestion des stocks et l&apos;integration Google Ads. Le plan Enterprise a 40 euros par mois integre l&apos;IA Zia, les portails clients et la personnalisation avancee. A titre de comparaison, ces fonctionnalites coutent 100 euros par mois chez HubSpot et 165 euros chez Salesforce.</p>
                    <p>L&apos;ecosysteme Zoho est un avantage enorme pour les PME qui veulent tout centraliser chez un seul editeur. Zoho Mail, Zoho Books (comptabilite), Zoho Desk (support client), Zoho Campaigns (email marketing), Zoho Analytics (BI) : tout s&apos;integre nativement sans surcout. Pour une PME qui utilise deja une application Zoho, adopter le CRM est une evidence.</p>
                    <p>Le point faible principal est l&apos;experience utilisateur. L&apos;interface de Zoho CRM est fonctionnelle mais datee. Elle manque de la fluidite et de l&apos;elegance de HubSpot ou Pipedrive. Les menus sont denses, les options nombreuses, et la navigation peut derouter les utilisateurs non techniques. Zoho a fait des progres avec son interface Canvas (personnalisation visuelle), mais on reste en dessous des standards du marche.</p>
                    <p>Le support en francais est un point a verifier. L&apos;interface est traduite, mais le support technique est principalement en anglais. Le reseau de partenaires en France est encore limite, meme s&apos;il se developpe. Pour une PME qui a besoin d&apos;accompagnement, cela peut etre un frein.</p>
                    <p>L&apos;IA Zia, disponible sur le plan Enterprise, est competente sans etre revolutionnaire. Elle propose de la prediction de conversion, de la detection d&apos;anomalies et de la suggestion de prochaines actions. C&apos;est un plus, mais en retard par rapport aux capacites de HubSpot Breeze ou de Salesforce Einstein.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Zoho CRM (janvier 2026)</p>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { plan: "Standard", price: "14 EUR/mois", users: "Par utilisateur", note: "Pipeline, workflows, scoring" },
                        { plan: "Professional", price: "23 EUR/mois", users: "Par utilisateur", note: "Formulaires, stocks, Google Ads" },
                        { plan: "Enterprise", price: "40 EUR/mois", users: "Par utilisateur", note: "IA Zia, portails, Canvas" },
                        { plan: "Ultimate", price: "52 EUR/mois", users: "Par utilisateur", note: "BI avance, 5 Go/user" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Prix tres competitif a fonctionnalites egales", "Suite Zoho complete (55+ apps integrees)", "Personnalisation poussee (Canvas, API)", "Plan gratuit pour 3 utilisateurs", "RGPD compliant, serveurs en EU", "Automatisations disponibles des le plan Standard"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Limites</p>
                      {["Interface datee, moins fluide que la concurrence", "Support en francais limite", "Reseau de partenaires FR restreint", "IA Zia en retard sur Breeze/Einstein", "Integrations tierces moins riches que HubSpot", "Courbe d'apprentissage moyenne"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#E0D4FC] bg-[#F8F5FF] p-3">
                    <p className="text-[11px] font-semibold text-[#6C5CE7] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les PME soucieuses du budget qui veulent un CRM complet sans exploser les couts. Particulierement pertinent si vous utilisez deja d&apos;autres produits Zoho (Mail, Books, Desk). Un choix rationnel pour les equipes de 5 a 50 personnes qui privilegient le rapport fonctionnalites/prix.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 : Monday CRM */}
              <section id="monday" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=monday.com&sz=32" alt="Monday CRM" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">Monday CRM</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#FF7A59]/10 text-[#FF7A59]">Le plus visuel</span>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Monday.com est avant tout un outil de gestion de projet. Le CRM est un module ajoute en 2022, construit sur la meme plateforme visuelle et collaborative qui a fait le succes de Monday dans la gestion de projet. C&apos;est a la fois sa force et sa limite.</p>
                    <p>La force, c&apos;est la flexibilite de l&apos;interface. Monday CRM permet de visualiser le pipeline sous forme de tableau, de Kanban, de timeline, de calendrier ou de carte geographique. On peut creer des vues personnalisees, des dashboards en drag-and-drop, des automatisations sans code. L&apos;outil est extremement visuel et coloré, ce qui plait aux equipes qui trouvent les CRM traditionnels austeres.</p>
                    <p>Monday CRM est particulierement pertinent pour les entreprises qui utilisent deja Monday pour la gestion de projet. La transition entre le projet et le commercial est fluide : un deal gagne peut automatiquement generer un projet, les equipes avant-vente et delivery partagent la meme plateforme, et les tableaux de bord aggregent les donnees des deux mondes.</p>
                    <p>Le pricing est correct. Le plan CRM Standard a 12 euros par mois et par utilisateur (minimum 3 users) inclut les pipelines, les contacts, les activites et un systeme de scoring basique. Le plan Pro a 28 euros par mois ajoute les emails, les devis et les previsions de vente. Le plan Enterprise est sur devis.</p>
                    <p>La limite, c&apos;est que Monday CRM n&apos;est pas un CRM au sens strict. Il manque des fonctionnalites que les vrais CRM proposent nativement : sequences email, tracking avance des emails, scoring predictif, integration telephonique native, gestion avancee des devis et des produits. L&apos;outil est excellent pour visualiser un pipeline et collaborer dessus, mais il est en dessous de HubSpot ou Pipedrive pour l&apos;execution commerciale pure.</p>
                    <p>L&apos;ecosysteme d&apos;integrations est correct mais moins riche que HubSpot ou Salesforce. L&apos;integration Gmail/Outlook fonctionne, mais le tracking email est basique. Il n&apos;y a pas de marketplace d&apos;apps aussi fournie que chez les leaders.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Monday CRM (janvier 2026)</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { plan: "Standard", price: "12 EUR/mois", users: "Par utilisateur (min. 3)", note: "Pipelines, contacts, activites" },
                        { plan: "Pro", price: "28 EUR/mois", users: "Par utilisateur (min. 3)", note: "Emails, devis, previsions" },
                        { plan: "Enterprise", price: "Sur devis", users: "Par utilisateur", note: "HIPAA, analytics avance" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Interface visuelle et coloree, tres ergonomique", "Flexibilite des vues (tableau, Kanban, timeline)", "Ideal si vous utilisez deja Monday pour les projets", "Automatisations no-code puissantes", "Dashboards personnalisables en drag-and-drop", "Prix d'entree competitif"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Limites</p>
                      {["Pas un CRM natif, fonctionnalites CRM limitees", "Pas de sequences email avancees", "Tracking email basique", "Minimum 3 utilisateurs payants", "Integrations CRM-specifiques moins riches", "Pas de plan gratuit pour le CRM"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#FFDDD2] bg-[#FFF5F0] p-3">
                    <p className="text-[11px] font-semibold text-[#FF7A59] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les PME qui utilisent deja Monday pour la gestion de projet et veulent integrer un CRM dans la meme plateforme. Adapte aux equipes qui privilegient la collaboration visuelle et qui ont un processus commercial simple, sans besoin de sequences email ou de scoring avance.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 : Folk CRM */}
              <section id="folk" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=folk.app&sz=32" alt="Folk" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">Folk CRM</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#4B5EFC]/10 text-[#4B5EFC]">CRM francais leger</span>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Folk est un CRM francais cree en 2020 par Simo Lemhandez et Jean-Baptiste Daguerre. Le positionnement est clair : un CRM leger, moderne et intuitif, a mi-chemin entre un carnet d&apos;adresses intelligent et un outil de gestion de relations. Folk s&apos;adresse aux equipes qui trouvent HubSpot ou Salesforce trop lourds pour leurs besoins.</p>
                    <p>L&apos;interface de Folk est son principal atout. L&apos;outil ressemble davantage a Notion ou Airtable qu&apos;a un CRM classique. Les contacts sont organises dans des listes personnalisables, avec des vues en tableau ou en Kanban. L&apos;extension Chrome permet d&apos;ajouter des contacts directement depuis LinkedIn, Gmail ou un site web en un clic. C&apos;est rapide, fluide et agreable a utiliser.</p>
                    <p>Folk integre un systeme de mail merge qui permet d&apos;envoyer des emails personnalises a une liste de contacts directement depuis le CRM. C&apos;est basique par rapport aux sequences de HubSpot ou Pipedrive, mais ca couvre le besoin pour des campagnes simples de suivi ou de relance.</p>
                    <p>Le prix est accessible : 20 euros par mois et par utilisateur sur le plan Standard, 40 euros sur le plan Premium. Il existe un plan gratuit limite a 100 contacts. L&apos;outil cible clairement les petites equipes (2 a 15 personnes) qui veulent un CRM sans la complexite d&apos;un outil enterprise.</p>
                    <p>Les limites sont claires. Folk n&apos;est pas un CRM full-stack. Il n&apos;y a pas de pipeline de vente au sens classique (avec des etapes, des montants, des previsions). Pas de reporting avance. Pas d&apos;automatisations complexes. Pas d&apos;integration telephonique. L&apos;outil est concu pour gerer des relations, pas pour piloter une activite commerciale structuree avec des objectifs et des KPIs.</p>
                    <p>En tant que produit francais, Folk offre une interface nativement en francais, un support reactif dans la langue, et une conformite RGPD native (serveurs en Europe). C&apos;est un avantage reel pour les PME francaises sensibles a ces sujets.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing Folk (janvier 2026)</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { plan: "Free", price: "0 EUR", users: "1 utilisateur", note: "100 contacts, fonctions de base" },
                        { plan: "Standard", price: "20 EUR/mois", users: "Par utilisateur", note: "Contacts illimites, mail merge" },
                        { plan: "Premium", price: "40 EUR/mois", users: "Par utilisateur", note: "Enrichissement, analytics" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Interface moderne, prise en main instantanee", "Extension Chrome (LinkedIn, Gmail, web)", "Mail merge integre", "Produit francais, support FR, RGPD natif", "Prix accessible", "Design type Notion/Airtable"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Limites</p>
                      {["Pas de pipeline de vente classique", "Reporting et analytics tres basiques", "Pas d'automatisations avancees", "Pas d'integration telephonique", "Peu d'integrations natives", "Limite pour les equipes de plus de 15 personnes"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#C5CAF5] bg-[#EEF0FF] p-3">
                    <p className="text-[11px] font-semibold text-[#4B5EFC] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les tres petites equipes (2 a 10 personnes), les freelances, les cabinets de conseil et les agences qui veulent un CRM leger pour gerer leurs relations et envoyer des campagnes email simples. Parfait pour les fondateurs qui cherchent un carnet d&apos;adresses intelligent sans la complexite d&apos;un CRM enterprise.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 : noCRM.io */}
              <section id="nocrm" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3 mb-4">
                    <img src="https://www.google.com/s2/favicons?domain=nocrm.io&sz=32" alt="noCRM.io" className="w-6 h-6" />
                    <h2 className="text-[17px] font-semibold text-[#111]">noCRM.io</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#22C55E]/10 text-[#22C55E]">Pour les commerciaux purs</span>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>noCRM.io est un outil francais cree en 2014 par Sunny Paris et Guven Urganci. Le nom dit tout : c&apos;est un outil de prospection qui refuse la complexite des CRM traditionnels. noCRM ne parle pas de &ldquo;contacts&rdquo; ou de &ldquo;comptes&rdquo;, mais de &ldquo;leads&rdquo; (opportunites). La philosophie est radicale : chaque lead doit toujours avoir une prochaine action planifiee. Si une action est en retard, le lead passe en rouge. Impossible de l&apos;ignorer.</p>
                    <p>Cette approche convient parfaitement aux equipes commerciales dont le metier est la prospection pure. Pas besoin de remplir des dizaines de champs ou de naviguer dans des menus complexes. On cree un lead (depuis un email, un fichier Excel, un scan de carte de visite ou manuellement), on planifie la prochaine action, on avance. C&apos;est tout.</p>
                    <p>noCRM integre un systeme de prospection par fichier qui est unique sur le marche. On importe un fichier CSV de prospects, et l&apos;outil les presente un par un au commercial. Celui-ci decide en un clic : interessant (creer un lead) ou pas interessant (suivant). C&apos;est une mecanique de qualification rapide qui fait gagner un temps considerable aux equipes qui traitent du volume.</p>
                    <p>Le prix est agressif : 22 euros par mois et par utilisateur sur le plan Starter, 33 euros sur le plan Expert. Le plan Dream Team a 39 euros ajoute le management d&apos;equipe et les objectifs. Il n&apos;y a pas de plan gratuit, mais un essai de 15 jours est disponible.</p>
                    <p>La limite majeure de noCRM est son positionnement meme. C&apos;est un outil de prospection, pas un CRM complet. Il n&apos;y a pas de gestion de la relation client apres la vente. Pas de ticketing, pas de base de connaissances, pas de marketing automation. Le reporting est correct mais basique. Les integrations sont limitees (pas de marketplace comparable a HubSpot ou Pipedrive).</p>
                    <p>En tant qu&apos;outil francais, noCRM offre une interface nativement en francais, un support excellent en francais, et une communaute active. La documentation est complete et bien ecrite. L&apos;equipe est reactive et a l&apos;ecoute des retours utilisateurs.</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pricing noCRM.io (janvier 2026)</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { plan: "Starter", price: "22 EUR/mois", users: "Par utilisateur", note: "Leads, pipeline, email" },
                        { plan: "Expert", price: "33 EUR/mois", users: "Par utilisateur", note: "Prospection fichier, API" },
                        { plan: "Dream Team", price: "39 EUR/mois", users: "Par utilisateur", note: "Management, objectifs" },
                      ].map((p) => (
                        <div key={p.plan} className="text-center">
                          <p className="text-[11px] font-semibold text-[#111]">{p.plan}</p>
                          <p className="text-[14px] font-bold text-[#4B5EFC] my-1">{p.price}</p>
                          <p className="text-[10px] text-[#999]">{p.users}</p>
                          <p className="text-[9px] text-[#BBB] mt-1">{p.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-3">
                      <p className="text-[11px] font-semibold text-[#22C55E] mb-2">Forces</p>
                      {["Philosophie 'prochaine action' anti-procrastination", "Prospection par fichier unique et efficace", "Prise en main en 30 minutes", "Produit francais, support FR excellent", "Prix simple et transparent", "Ideal pour les equipes terrain"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-3">
                      <p className="text-[11px] font-semibold text-[#EF4444] mb-2">Limites</p>
                      {["Pas un CRM complet (prospection seulement)", "Pas de gestion post-vente", "Reporting basique", "Peu d'integrations natives", "Pas de marketing automation", "Pas de plan gratuit"].map((i) => (
                        <p key={i} className="text-[10px] text-[#555] mb-1.5 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-[#D4EDDA] bg-[#F0FDF4] p-3">
                    <p className="text-[11px] font-semibold text-[#22C55E] mb-1">Ideal pour</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Les equipes commerciales pures (3 a 20 personnes) dont le quotidien est la prospection telephonique ou terrain. Parfait pour les forces de vente qui veulent un outil anti-gas-prise-de-tete, sans administration, centre sur l&apos;action. Excellent pour les PME du batiment, de l&apos;immobilier ou des services B2B avec du cycle court.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 : Tableau comparatif global */}
              <section id="comparatif" className="mb-8">
                <div className="rounded-2xl border border-[#1A1A2E] bg-[#1A1A2E] p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.2)]">
                  <h2 className="text-[17px] font-semibold text-white mb-2">Tableau comparatif global</h2>
                  <p className="text-[12px] text-[#999] mb-5">Les 7 CRM compares sur 12 criteres. Evaluation basee sur notre experience terrain aupres de PME francaises.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[11px]">
                      <thead>
                        <tr className="border-b border-[#333]">
                          <th className="text-left py-3 pr-3 text-[#888] font-medium min-w-[120px]">Critere</th>
                          {[
                            { name: "HubSpot", domain: "hubspot.com" },
                            { name: "Pipedrive", domain: "pipedrive.com" },
                            { name: "Salesforce", domain: "salesforce.com" },
                            { name: "Zoho", domain: "zoho.com" },
                            { name: "Monday", domain: "monday.com" },
                            { name: "Folk", domain: "folk.app" },
                            { name: "noCRM", domain: "nocrm.io" },
                          ].map((tool) => (
                            <th key={tool.name} className="text-center py-3 px-2 text-[#888] font-medium min-w-[80px]">
                              <div className="flex flex-col items-center gap-1">
                                <img src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=32`} alt={tool.name} className="w-4 h-4" />
                                <span>{tool.name}</span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="text-[#CCC]">
                        {[
                          ["Prix d'entree/user/mois", "0 EUR", "14 EUR", "25 EUR", "14 EUR", "12 EUR", "0 EUR", "22 EUR"],
                          ["Plan gratuit", "Oui (complet)", "Non", "Non", "Oui (3 users)", "Non", "Oui (limite)", "Non"],
                          ["Facilite de prise en main", "Excellente", "Excellente", "Moyenne", "Moyenne", "Bonne", "Excellente", "Excellente"],
                          ["Pipeline visuel", "Oui", "Oui (best)", "Oui", "Oui", "Oui", "Basique", "Oui"],
                          ["Sequences email", "Pro (100 EUR)", "Advanced (39 EUR)", "Pro (80 EUR)", "Pro (23 EUR)", "Non", "Mail merge", "Non"],
                          ["Marketing automation", "Oui (natif)", "Non", "Pardot (surcout)", "Oui (Zoho)", "Non", "Non", "Non"],
                          ["IA integree", "Breeze", "AI (basique)", "Einstein", "Zia", "AI (basique)", "Non", "Non"],
                          ["Application mobile", "Excellente", "Bonne", "Bonne", "Correcte", "Bonne", "Basique", "Bonne"],
                          ["Interface en francais", "Oui", "Oui", "Oui", "Oui", "Oui", "Oui (natif)", "Oui (natif)"],
                          ["Support francais", "Oui", "Limite", "Limite", "Limite", "Oui", "Oui (natif)", "Oui (natif)"],
                          ["Integrations", "1 600+", "400+", "7 000+", "500+", "200+", "50+", "100+"],
                          ["Scalabilite", "Excellente", "Bonne", "Maximale", "Bonne", "Bonne", "Limitee", "Limitee"],
                        ].map(([critere, ...vals]) => (
                          <tr key={critere} className="border-b border-[#2A2A40]">
                            <td className="py-2.5 pr-3 font-medium text-[#EEE]">{critere}</td>
                            {vals.map((v, i) => (
                              <td key={i} className="py-2.5 px-2 text-center">{v}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Score summary */}
                  <div className="mt-6 grid grid-cols-7 gap-2">
                    {[
                      { name: "HubSpot", score: "9/10", color: "#4B5EFC" },
                      { name: "Pipedrive", score: "8/10", color: "#22C55E" },
                      { name: "Salesforce", score: "6/10", color: "#FF7A59" },
                      { name: "Zoho", score: "7.5/10", color: "#6C5CE7" },
                      { name: "Monday", score: "6.5/10", color: "#FF7A59" },
                      { name: "Folk", score: "7/10", color: "#4B5EFC" },
                      { name: "noCRM", score: "7/10", color: "#22C55E" },
                    ].map((s) => (
                      <div key={s.name} className="rounded-xl border border-[#333] p-3 text-center">
                        <p className="text-[10px] text-[#999] mb-1">{s.name}</p>
                        <p className="text-[16px] font-bold" style={{ color: s.color }}>{s.score}</p>
                        <p className="text-[9px] text-[#666]">Score PME</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 11 : Quel CRM choisir selon votre profil */}
              <section id="profil" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Quel CRM choisir selon votre profil</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Plutot que de chercher le &ldquo;meilleur CRM&rdquo; en absolu, la bonne question est : quel CRM correspond a votre situation ? Voici notre matrice de decision basee sur les trois variables qui comptent le plus : la taille de votre equipe, votre budget et votre besoin principal.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { profil: "Freelance / solopreneur", budget: "0 EUR", besoin: "Gerer ses contacts et relances", reco: "Folk (gratuit) ou HubSpot (gratuit)", color: "#4B5EFC" },
                      { profil: "Startup early-stage (2-5 pers.)", budget: "< 50 EUR/mois", besoin: "Pipeline simple + email tracking", reco: "HubSpot Free ou Pipedrive Essential", color: "#6C5CE7" },
                      { profil: "PME commerciale (5-20 pers.)", budget: "50-200 EUR/mois", besoin: "Pipeline + sequences + reporting", reco: "HubSpot Starter ou Pipedrive Advanced", color: "#FF7A59" },
                      { profil: "PME structuree (20-50 pers.)", budget: "200-1 000 EUR/mois", besoin: "CRM + marketing + service client", reco: "HubSpot Pro ou Zoho Enterprise", color: "#22C55E" },
                      { profil: "Equipe terrain / prospection pure", budget: "100-400 EUR/mois", besoin: "Gestion de leads, action-driven", reco: "noCRM.io Expert ou Pipedrive", color: "#4B5EFC" },
                      { profil: "Equipe deja sur Monday", budget: "Variable", besoin: "CRM integre a la gestion de projet", reco: "Monday CRM Pro", color: "#6C5CE7" },
                      { profil: "PME budget-conscious", budget: "< 30 EUR/user/mois", besoin: "Maximum de fonctionnalites au moindre cout", reco: "Zoho CRM Professional", color: "#FF7A59" },
                      { profil: "PME en forte croissance (50+ pers.)", budget: "1 000+ EUR/mois", besoin: "Scalabilite, personnalisation, IA", reco: "HubSpot Enterprise ou Salesforce Pro", color: "#22C55E" },
                    ].map((p) => (
                      <div key={p.profil} className="rounded-xl border border-[#F2F2F2] p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: p.color }} />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className="text-[12px] font-semibold text-[#111]">{p.profil}</span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#999]">{p.budget}</span>
                            </div>
                            <p className="text-[11px] text-[#888] mb-1">{p.besoin}</p>
                            <p className="text-[11px] font-medium" style={{ color: p.color }}>{p.reco}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">La regle d&apos;or</p>
                    <p className="text-[11px] text-[#777] leading-[1.6]">Choisissez toujours le CRM le plus simple qui repond a vos besoins actuels, pas a vos besoins dans trois ans. Il est plus facile de migrer vers un outil plus complet quand le besoin se fait sentir que de supporter au quotidien un outil surdimensionne que personne n&apos;utilise. L&apos;adoption par l&apos;equipe est le critere numero un.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 12 : Les erreurs a eviter */}
              <section id="erreurs" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les erreurs a eviter lors du choix et de l&apos;implementation</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Apres avoir accompagne des dizaines de PME dans le choix et le deploiement de leur CRM, on a identifie les erreurs qui reviennent systematiquement. Les voici, avec les solutions pour les eviter.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        erreur: "Choisir le CRM le plus complet plutot que le plus adapte",
                        desc: "C'est l'erreur numero un. On voit des PME de 5 personnes acheter Salesforce Enterprise parce que c'est 'le meilleur CRM du marche'. Six mois plus tard, deux personnes sur cinq l'utilisent, les donnees sont incompletes, et le dirigeant ne regarde plus les tableaux de bord. Le meilleur CRM est celui que votre equipe utilise vraiment, pas celui qui a le plus de fonctionnalites.",
                        color: "#EF4444"
                      },
                      {
                        erreur: "Negliger la phase d'implementation",
                        desc: "Acheter le CRM n'est que 20% du travail. Les 80% restants, c'est l'implementation : definir les etapes du pipeline, configurer les champs obligatoires, importer les donnees existantes, former l'equipe, definir les regles d'utilisation. Une implementation baclee condamne le projet. Prevoyez 2 a 4 semaines pour un deploiement serieux, meme sur un outil simple comme Pipedrive.",
                        color: "#FF7A59"
                      },
                      {
                        erreur: "Vouloir tout migrer d'un coup",
                        desc: "L'envie de migrer toutes les donnees historiques (5 ans d'emails, 10 000 contacts, des centaines de notes) dans le nouveau CRM est comprehensible mais rarement pertinente. Migrez le strict necessaire : les contacts actifs, les deals en cours, les informations essentielles. Le reste, archivez-le. Un CRM propre des le depart vaut mieux qu'un CRM encombre de donnees obsoletes.",
                        color: "#6C5CE7"
                      },
                      {
                        erreur: "Ne pas definir de convention de saisie",
                        desc: "Sans regles claires, chaque commercial remplit le CRM a sa maniere. L'un met le prenom en majuscules, l'autre non. L'un remplit le champ 'source', l'autre l'ignore. En six mois, la base de donnees est un champ de bataille. Definissez des conventions de saisie ecrites, rendez certains champs obligatoires, et faites des audits mensuels de la qualite des donnees.",
                        color: "#4B5EFC"
                      },
                      {
                        erreur: "Sous-estimer le cout total de possession",
                        desc: "Le prix de la licence n'est qu'une partie du cout. Ajoutez les frais d'implementation (souvent 2 000 a 10 000 EUR pour un consultant), la formation (1 a 3 jours par utilisateur), les integrations tierces (parfois payantes), et la maintenance continue. Un CRM 'gratuit' peut couter plus cher qu'un CRM payant si l'implementation est mal faite.",
                        color: "#22C55E"
                      },
                      {
                        erreur: "Ignorer l'application mobile",
                        desc: "Si vos commerciaux sont sur le terrain (rendez-vous clients, salons, visites), l'application mobile n'est pas un nice-to-have. C'est un critere eliminatoire. Testez l'application mobile avant de choisir votre CRM. Verifiez qu'elle permet de consulter les fiches contacts, loguer des appels et mettre a jour les deals en deplacement, meme sans connexion.",
                        color: "#FF7A59"
                      },
                      {
                        erreur: "Ne pas impliquer l'equipe commerciale dans le choix",
                        desc: "Le CRM est l'outil quotidien des commerciaux. Si le choix est impose par la direction ou le marketing sans consulter les utilisateurs finaux, le risque de rejet est eleve. Faites tester 2 a 3 outils par vos commerciaux pendant une semaine chacun. Leur retour est le meilleur indicateur d'adoption future.",
                        color: "#4B5EFC"
                      },
                    ].map((e, i) => (
                      <div key={i} className="rounded-xl border-l-2 bg-[#FAFAFA] p-4" style={{ borderColor: e.color }}>
                        <p className="text-[12px] font-semibold text-[#111] mb-2">{i + 1}. {e.erreur}</p>
                        <p className="text-[11px] text-[#777] leading-[1.6]">{e.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 13 : Notre recommandation */}
              <section id="recommandation" className="mb-8">
                <div className="rounded-2xl border border-[#4B5EFC] bg-gradient-to-br from-[#F8F9FF] to-[#EEF0FF] p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(75,94,252,0.15)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Notre recommandation : HubSpot pour la majorite des PME</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Apres avoir deploye des CRM chez des dizaines de PME francaises de 3 a 200 salaries, notre recommandation par defaut est <strong className="text-[#111]">HubSpot CRM</strong>. Pas parce que c&apos;est le plus complet (Salesforce l&apos;est davantage). Pas parce que c&apos;est le moins cher (Zoho l&apos;est). Mais parce que c&apos;est celui qui offre le meilleur equilibre entre puissance, facilite d&apos;utilisation et ecosysteme.</p>
                    <p>Le plan gratuit de HubSpot est le meilleur point de depart du marche. Il permet de tester l&apos;outil sans engagement, de former l&apos;equipe et de valider que le CRM repond aux besoins avant d&apos;investir. Quand la PME grandit, HubSpot evolue avec elle : Starter pour les premiers besoins d&apos;automatisation, Pro pour le marketing et le reporting, Enterprise pour la personnalisation avancee.</p>
                    <p>Cela dit, HubSpot n&apos;est pas la bonne reponse dans tous les cas :</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" />Si votre equipe fait de la <strong className="text-[#111]">prospection terrain pure</strong> et a besoin d&apos;un outil action-driven sans fioritures, <strong className="text-[#111]">noCRM.io</strong> est souvent plus pertinent.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" />Si votre <strong className="text-[#111]">budget est tres serre</strong> et que vous avez besoin de fonctionnalites avancees, <strong className="text-[#111]">Zoho CRM</strong> offre le meilleur rapport qualite/prix du marche.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] mt-2 shrink-0" />Si vous etes une <strong className="text-[#111]">tres petite equipe</strong> (2-5 personnes) qui veut un CRM simple et visuel, <strong className="text-[#111]">Pipedrive</strong> est excellent.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" />Si vous avez des <strong className="text-[#111]">processus complexes</strong> et une equipe technique pour administrer l&apos;outil, <strong className="text-[#111]">Salesforce</strong> reste la reference en personnalisation.</li>
                    </ul>
                    <p>Le plus important n&apos;est pas l&apos;outil que vous choisissez. C&apos;est la qualite de l&apos;implementation et l&apos;adoption par l&apos;equipe. Un CRM mal deploye, aussi puissant soit-il, ne sert a rien. Un CRM simple bien deploye transforme la performance commerciale.</p>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <div className="mb-12 rounded-2xl bg-[#111] p-6 md:p-8 text-center">
                <h3 className="text-[17px] font-semibold text-white mb-3">Besoin d&apos;aide pour choisir et deployer votre CRM ?</h3>
                <p className="text-[13px] text-[#999] leading-[1.7] mb-5 max-w-[500px] mx-auto">Chez Ceres, on accompagne les PME dans le choix, l&apos;implementation et l&apos;optimisation de leur CRM. On est partenaires HubSpot et on connait les alternatives. Un audit gratuit de 30 minutes pour identifier la meilleure solution pour votre situation.</p>
                <Link href="https://calendly.com/ceres-revops/30min" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4B5EFC] text-white rounded-lg text-[13px] font-medium hover:bg-[#3A4DE0] transition-colors">
                  Prendre rendez-vous
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </Link>
              </div>

              {/* Related articles */}
              <div>
                <h3 className="text-[14px] font-semibold text-[#111] mb-4">Articles complementaires</h3>
                <div className="grid gap-3">
                  {relatedArticles.map((a) => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="group flex items-center gap-4 rounded-xl border border-[#F2F2F2] p-4 hover:border-[#DDD] transition-colors">
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
