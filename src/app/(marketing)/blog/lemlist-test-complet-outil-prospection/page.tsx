"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: { "@type": "SoftwareApplication", name: "Lemlist", applicationCategory: "Sales Engagement Platform", operatingSystem: "Web" },
  author: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  reviewRating: { "@type": "Rating", ratingValue: "4.3", bestRating: "5" },
  datePublished: "2026-03-25",
  reviewBody: "Test complet de Lemlist apres 2 ans d'utilisation sur plus de 30 campagnes outbound. Un outil de prospection multicanal puissant avec la meilleure personnalisation du marche, une IA d'enrichissement impressionnante et un multicanal mature. Le prix par utilisateur reste eleve mais justifie pour les equipes qui exploitent tout le potentiel."
};

const sections = [
  { id: "intro", title: "Pourquoi on a teste Lemlist" },
  { id: "entreprise", title: "L'entreprise en chiffres" },
  { id: "prise-en-main", title: "Prise en main et interface" },
  { id: "features", title: "Les fonctionnalites cles" },
  { id: "personnalisation", title: "La personnalisation" },
  { id: "linkedin", title: "L'automatisation LinkedIn" },
  { id: "multicanal", title: "Le multicanal en pratique" },
  { id: "delivrabilite", title: "Lemwarm et delivrabilite" },
  { id: "base-donnees", title: "La base de donnees B2B" },
  { id: "ia", title: "L'IA dans Lemlist" },
  { id: "integrations", title: "Les integrations CRM" },
  { id: "pricing", title: "Prix : le vrai cout" },
  { id: "comparatif", title: "Lemlist vs alternatives" },
  { id: "limites", title: "Les limites rencontrees" },
  { id: "verdict", title: "Notre verdict" },
  { id: "pour-qui", title: "Pour qui Lemlist est fait" },
];

const relatedArticles = [
  { title: "Emelia : notre test complet de l'outil de cold emailing", slug: "emelia-test-outil-cold-emailing", category: "Process & Outils", color: "#6C5CE7" },
  { title: "Comparatif outils de generation de leads B2B", slug: "comparatif-outils-generation-leads-enrichissement", category: "Process & Outils", color: "#FF7A59" },
  { title: "Les meilleures pratiques pour vos sequences HubSpot", slug: "meilleures-pratiques-sequences-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function LemlistArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("intro");

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
        <div className="h-full bg-[#6C5CE7] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "8%", width: 300, height: 300, borderRadius: "50%", background: "#6C5CE7", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "22%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "40%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "58%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "75%", width: 270, height: 270, borderRadius: "50%", background: "#6C5CE7", opacity: 0.06, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "4%", top: "90%", width: 250, height: 250, borderRadius: "50%", background: "#FF7A59", opacity: 0.06, filter: "blur(70px)" }} />

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
                        ? "border-[#6C5CE7] text-[#111] font-medium"
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
                  <a href="https://twitter.com/intent/tweet" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Lemlist</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>Process &amp; Outils</Badge>
                <span className="text-[11px] text-[#CCC]">22 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Lemlist : notre test complet de l&apos;outil de prospection multicanal en 2026
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                On a utilise Lemlist pendant 2 ans sur plus de 30 campagnes outbound pour une dizaine de clients. Personnalisation, multicanal, delivrabilite, base B2B, IA, integrations CRM, prix. Un test exhaustif et honnete, avec les raisons pour lesquelles on a fini par switcher certains comptes vers des alternatives moins cheres.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>25 mars 2026</span>
              </div>

              {/* Quick verdict card */}
              <div className="mt-8 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src="https://www.google.com/s2/favicons?domain=lemlist.com&sz=32" alt="Lemlist" className="w-6 h-6" />
                    <span className="text-[13px] font-semibold text-[#111]">Verdict rapide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[22px] font-bold text-[#6C5CE7]">4.3</span>
                    <span className="text-[12px] text-[#999]">/5</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-7 gap-3">
                  {[
                    { label: "Personnalisation", score: "4.8", color: "#22C55E" },
                    { label: "Multicanal", score: "4.5", color: "#22C55E" },
                    { label: "IA & Enrichissement", score: "4.5", color: "#22C55E" },
                    { label: "Delivrabilite", score: "4.2", color: "#4B5EFC" },
                    { label: "Base B2B", score: "4.0", color: "#4B5EFC" },
                    { label: "Prix", score: "3.5", color: "#FF7A59" },
                    { label: "Integrations", score: "4.0", color: "#4B5EFC" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-[18px] font-bold" style={{ color: s.color }}>{s.score}</div>
                      <div className="text-[10px] text-[#999]">{s.label}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[12px] text-[#777] leading-[1.6]">
                  Lemlist est l&apos;outil de prospection multicanal le plus complet du marche en 2026. La personnalisation est inegalee, l&apos;IA d&apos;enrichissement et de generation de contenu impressionne, et le multicanal email + LinkedIn + WhatsApp est mature. Le prix par utilisateur est eleve mais justifie pour les equipes qui exploitent le multicanal et la personnalisation avancee. En tant que partenaire Lemlist, on le deploie pour nos clients qui ont des cycles de vente complexes.
                </p>
              </div>
            </header>

            <article>
              {/* Section 1 : Intro */}
              <section id="intro" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi on a teste Lemlist (et pourquoi on a fini par switcher)</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Chez Ceres, Lemlist est l&apos;un des outils centraux de notre stack outbound depuis plus de deux ans. On l&apos;a deploye sur une dizaine de comptes clients, lance plus de 30 campagnes, contacte des dizaines de milliers de prospects. On connait l&apos;outil dans ses moindres recoins. Et on est partenaire officiel Lemlist depuis 2025.</p>
                    <p>On a choisi Lemlist au depart pour une raison simple : la personnalisation. En 2024, quand on a commence a l&apos;utiliser, aucun concurrent ne proposait des images dynamiques, des videos personnalisees et des landing pages customisees dans les sequences email. C&apos;etait un vrai avantage concurrentiel pour les campagnes de nos clients.</p>
                    <p>Depuis, l&apos;outil a enormement evolue. L&apos;ajout de l&apos;IA pour l&apos;enrichissement des colonnes, la generation automatique de campagnes, les AI Variables pour la personnalisation a l&apos;echelle et le multicanal complet (email + LinkedIn + WhatsApp + appels) en font aujourd&apos;hui l&apos;un des outils les plus complets du marche.</p>
                    <p>Pour certains clients qui font du cold email pur a gros volume, on utilise Emelia en complement (plus economique pour l&apos;envoi massif). Mais pour les campagnes multicanal haut de gamme avec personnalisation avancee, Lemlist reste notre premier choix.</p>
                    <p>Cet article est le bilan complet de ces deux annees. Ce qui marche vraiment, les limites a connaitre, et pour qui Lemlist est le bon choix en 2026.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 : L'entreprise en chiffres */}
              <section id="entreprise" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">L&apos;entreprise Lemlist en chiffres</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Lemlist a ete fondee en 2018 a Paris par Guillaume Moubeche. L&apos;entreprise a connu une croissance rapide, portee par un positionnement clair sur la personnalisation email et une strategie de contenu tres agressive sur LinkedIn (ironie quand on connait la suite).</p>
                    <p>Voici les chiffres cles de l&apos;entreprise tels qu&apos;ils etaient publiquement disponibles fin 2025 :</p>
                  </div>
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "ARR (revenu annuel)", value: "$40M", sub: "2025" },
                      { label: "Clients payants", value: "10 000+", sub: "dans le monde" },
                      { label: "Employes", value: "173", sub: "equipe globale" },
                      { label: "Annee de creation", value: "2018", sub: "Paris, France" },
                    ].map((m) => (
                      <div key={m.label} className="text-center p-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2]">
                        <div className="text-[18px] font-bold text-[#111]">{m.value}</div>
                        <div className="text-[10px] text-[#999] mt-1">{m.label}</div>
                        <div className="text-[9px] text-[#CCC] mt-0.5">{m.sub}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Cote avis utilisateurs, les notes sont solides sans etre exceptionnelles :</p>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[12px] font-semibold text-[#111]">G2</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[16px] font-bold text-[#FF7A59]">4.4</span>
                          <span className="text-[10px] text-[#999]">/5</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#999]">2 500+ avis verifies</p>
                      <div className="mt-2 w-full h-1.5 rounded-full bg-[#F2F2F2]">
                        <div className="h-full rounded-full bg-[#FF7A59]" style={{ width: "88%" }} />
                      </div>
                    </div>
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[12px] font-semibold text-[#111]">Capterra</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[16px] font-bold text-[#FF7A59]">4.6</span>
                          <span className="text-[10px] text-[#999]">/5</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#999]">386 avis verifies</p>
                      <div className="mt-2 w-full h-1.5 rounded-full bg-[#F2F2F2]">
                        <div className="h-full rounded-full bg-[#FF7A59]" style={{ width: "92%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un point notable : la majorite des avis negatifs sur G2 mentionnent le prix, la complexite de l&apos;outil pour les fonctions avancees, et des problemes avec l&apos;automatisation LinkedIn. Les avis positifs saluent unanimement la qualite de la personnalisation et les ressources educatives (le blog de Lemlist et la lmsqzy community sont parmi les meilleures du secteur).</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 : Prise en main */}
              <section id="prise-en-main" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Prise en main et interface</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;interface de Lemlist a beaucoup evolue depuis notre premier acces en 2024. Le design est propre, moderne, avec une palette de couleurs vives (beaucoup de violet et d&apos;orange). La navigation laterale est bien organisee avec les sections principales : Campagnes, Leads, Enrichissement, Templates, Rapports et Parametres.</p>
                    <p>La premiere prise en main est agreable. Lemlist propose un onboarding guide qui vous accompagne sur les premieres etapes : connexion d&apos;une boite email, creation d&apos;une premiere campagne, import de contacts. Le processus est fluide et bien pense.</p>
                    <p>En revanche, la courbe d&apos;apprentissage se raidit significativement des qu&apos;on veut utiliser les fonctions avancees. La liquid syntax pour la personnalisation dynamique, les conditions dans les sequences multicanal, le paramétrage de l&apos;enrichissement waterfall, la configuration des landing pages : tout ca demande un vrai temps d&apos;apprentissage. Comptez 2 a 3 semaines pour maitriser l&apos;ensemble des fonctionnalites si vous partez de zero.</p>
                    <p>Un point positif : les ressources educatives sont excellentes. Le blog, les webinaires, la communaute lmsqzy, les templates de campagnes. Lemlist investit beaucoup dans l&apos;education de ses utilisateurs, et ca se voit. C&apos;est probablement le meilleur contenu educatif du marche en cold outbound.</p>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { label: "Temps de setup", value: "2-3h", icon: "horloge" },
                      { label: "Courbe d'apprentissage", value: "Moyenne-haute", icon: "courbe" },
                      { label: "Ressources educatives", value: "Excellentes", icon: "doc" },
                    ].map((m) => (
                      <div key={m.label} className="text-center p-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2]">
                        <div className="text-[14px] font-bold text-[#111]">{m.value}</div>
                        <div className="text-[10px] text-[#999] mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 : Features cles */}
              <section id="features" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les fonctionnalites cles</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Lemlist est un outil dense. Voici les 8 fonctionnalites principales, avec notre evaluation terrain pour chacune.</p>
                  </div>
                  <div className="space-y-5">
                    {[
                      {
                        title: "Sequences multicanal",
                        desc: "Le coeur de Lemlist. Vous creez des sequences qui combinent email, LinkedIn (visites de profil, connexions, messages, InMails, messages vocaux), WhatsApp et appels telephoniques. Chaque etape peut etre conditionnee par le comportement du prospect (ouverture, clic, reponse, connexion LinkedIn acceptee).",
                        detail: "En pratique, les sequences email fonctionnent tres bien. Les sequences multicanal avec LinkedIn sont plus fragiles (on y revient dans la section dediee). La possibilite de combiner 4 canaux dans une seule sequence est un vrai differenciateur, meme si on en utilise rarement plus de 2 simultanement.",
                      },
                      {
                        title: "Images et videos dynamiques",
                        desc: "La fonctionnalite signature de Lemlist. Vous pouvez integrer des images personnalisees dans vos emails avec le prenom, le nom de l'entreprise ou le logo du prospect incrustes dynamiquement. Meme chose pour les videos : vous enregistrez une video template et Lemlist personnalise le thumbnail avec les infos du prospect.",
                        detail: "C'est la ou Lemlist est imbattable. Aucun concurrent ne propose ce niveau de personnalisation visuelle. Sur nos campagnes SaaS, les emails avec images personnalisees ont genere 35% de taux de reponse en plus par rapport aux emails texte seul. Le ROI est reel.",
                      },
                      {
                        title: "Lemwarm (warm-up email)",
                        desc: "Inclus a partir du plan Email Pro. Lemwarm envoie et recoit automatiquement des emails depuis votre boite pour construire votre reputation d'expediteur. Le processus dure 3 a 5 semaines avant que la boite soit consideree comme 'chaude'.",
                        detail: "Lemwarm fonctionne bien mais est lent. 3 a 5 semaines avant de pouvoir envoyer des campagnes, c'est long quand vous devez lancer rapidement. Par comparaison, Mailreach (utilise par Emelia) chauffe une boite en 2 a 3 semaines. Un score de sante par boite vous indique quand vous etes pret.",
                      },
                      {
                        title: "Landing pages personnalisees",
                        desc: "Lemlist permet de creer des micro-landing pages pour chaque prospect, avec son prenom, son entreprise, son logo, et un calendrier de prise de rendez-vous integre. Le prospect clique sur le lien dans l'email et arrive sur une page qui semble faite sur mesure.",
                        detail: "C'est une fonctionnalite unique sur le marche. En pratique, on l'a utilisee sur 4-5 campagnes. Le taux de conversion est effectivement superieur aux emails classiques (+20% de prises de RDV). Mais la mise en place est plus longue et necessite une vraie reflexion sur le design de la page.",
                      },
                      {
                        title: "Liquid syntax et variables avancees",
                        desc: "Au-dela des variables basiques (prenom, entreprise), Lemlist supporte la liquid syntax complete. Conditions if/else, boucles, fallbacks, variables calculees. Vous pouvez creer des emails qui s'adaptent dynamiquement au profil du prospect.",
                        detail: "Puissant mais complexe. La liquid syntax demande un temps d'apprentissage reel. Pour des equipes techniques ou des agences, c'est un atout majeur. Pour un SDR lambda qui debute, c'est de la complexite inutile. On l'utilise sur environ la moitie de nos campagnes.",
                      },
                      {
                        title: "A/B testing",
                        desc: "Disponible a partir du plan Email Pro. Chaque etape d'une sequence peut avoir plusieurs variantes. Lemlist repartit les envois et mesure les performances par variante. Vous pouvez tester le sujet, le corps, les images, les CTA.",
                        detail: "L'A/B testing est solide et fiable. On l'utilise systematiquement sur la premiere etape de chaque campagne. Le reporting par variante est clair. Un manque : pas de fonctionnalite 'winner automatique' qui desactive les variantes perdantes apres un seuil statistique.",
                      },
                      {
                        title: "Base B2B et enrichissement",
                        desc: "Lemlist integre une base de 450 millions de contacts et 63 millions d'entreprises. L'enrichissement utilise un systeme 'waterfall' qui interroge 7 a 8 fournisseurs de donnees pour trouver les emails et numeros de telephone avec un taux de decouverte annonce de 80%.",
                        detail: "Le taux de decouverte email de 80% est globalement confirme sur le marche US/UK. En France et en Europe du Sud, on tombe plutot a 55-65%. La qualite des donnees est inegale : on a rencontre des contacts obsoletes, des entreprises fermees, des numeros de telephone errones. On y revient en detail dans la section dediee.",
                      },
                      {
                        title: "API et webhooks",
                        desc: "API REST complete pour gerer les campagnes, les leads, les rapports programmatiquement. Les webhooks permettent de declencher des actions dans vos outils tiers quand un evenement se produit dans Lemlist (email envoye, repondu, bounced).",
                        detail: "L'API est bien documentee et fonctionnelle. On l'utilise pour synchroniser Lemlist avec les CRM de certains clients via des workflows Make/n8n. Les webhooks sont fiables. C'est un point fort pour les equipes techniques.",
                      },
                    ].map((f) => (
                      <div key={f.title} className="pb-4 border-b border-[#F5F5F5] last:border-0 last:pb-0">
                        <h3 className="text-[14px] font-semibold text-[#111] mb-2">{f.title}</h3>
                        <p className="text-[12px] text-[#666] leading-[1.7] mb-2">{f.desc}</p>
                        <p className="text-[12px] text-[#888] leading-[1.65] italic">{f.detail}</p>
                      </div>
                    ))}
                  </div>

                  {/* Feature availability matrix by plan */}
                  <div className="mt-6">
                    <h3 className="text-[14px] font-semibold text-[#111] mb-3">Disponibilite par plan</h3>
                    <div className="overflow-x-auto">
                      <div className="min-w-[500px]">
                        <div className="grid grid-cols-5 gap-2 pb-3 border-b border-[#EAEAEA]">
                          <span className="text-[10px] font-semibold text-[#999]">Fonctionnalite</span>
                          <span className="text-[10px] font-semibold text-[#999] text-center">Email Starter</span>
                          <span className="text-[10px] font-semibold text-[#999] text-center">Email Pro</span>
                          <span className="text-[10px] font-semibold text-[#6C5CE7] text-center">Multichannel</span>
                          <span className="text-[10px] font-semibold text-[#999] text-center">Scale</span>
                        </div>
                        {[
                          { label: "Sequences email", starter: true, pro: true, expert: true, scale: true },
                          { label: "Lemwarm (warm-up)", starter: false, pro: true, expert: true, scale: true },
                          { label: "A/B testing", starter: false, pro: true, expert: true, scale: true },
                          { label: "AI email writer", starter: false, pro: true, expert: true, scale: true },
                          { label: "Images dynamiques", starter: true, pro: true, expert: true, scale: true },
                          { label: "Videos personnalisees", starter: true, pro: true, expert: true, scale: true },
                          { label: "Liquid syntax", starter: true, pro: true, expert: true, scale: true },
                          { label: "LinkedIn automation", starter: false, pro: false, expert: true, scale: true },
                          { label: "WhatsApp", starter: false, pro: false, expert: true, scale: true },
                          { label: "Appels telephoniques", starter: false, pro: false, expert: true, scale: true },
                          { label: "Landing pages", starter: false, pro: false, expert: true, scale: true },
                          { label: "Integration CRM", starter: false, pro: true, expert: true, scale: true },
                          { label: "Zapier / Make / n8n", starter: false, pro: false, expert: true, scale: true },
                          { label: "API", starter: false, pro: true, expert: true, scale: true },
                          { label: "Account manager dedie", starter: false, pro: false, expert: false, scale: true },
                        ].map((row) => (
                          <div key={row.label} className="grid grid-cols-5 gap-2 py-2 border-b border-[#F5F5F5]">
                            <span className="text-[11px] font-medium text-[#111]">{row.label}</span>
                            {[row.starter, row.pro, row.expert, row.scale].map((val, idx) => (
                              <span key={idx} className="text-center">
                                {val ? (
                                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="inline text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                ) : (
                                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="inline text-[#DDD]"><path d="M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                                )}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 : Personnalisation */}
              <section id="personnalisation" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">La personnalisation : le vrai point fort de Lemlist</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Si on ne devait retenir qu&apos;une seule raison de choisir Lemlist, c&apos;est la personnalisation. C&apos;est la fonctionnalite historique de l&apos;outil, celle qui l&apos;a fait connaitre, et elle reste la meilleure du marche en 2026.</p>
                    <p>Voici les 4 niveaux de personnalisation que propose Lemlist :</p>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-md bg-[#6C5CE7]/10 flex items-center justify-center text-[10px] font-bold text-[#6C5CE7]">1</div>
                        <h3 className="text-[13px] font-semibold text-[#111]">Variables et liquid syntax</h3>
                      </div>
                      <p className="text-[12px] text-[#777] leading-[1.65]">Les variables classiques (prenom, nom, entreprise, poste) sont le minimum. La liquid syntax ajoute des conditions : &ldquo;Si le prospect est CEO, ecrire X, sinon ecrire Y&rdquo;. On peut creer des fallbacks intelligents : si une variable est vide, un texte alternatif prend le relais. Ca evite les emails avec des &ldquo;Bonjour &#123;&#123;firstName&#125;&#125;&rdquo; non remplaces.</p>
                    </div>
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-md bg-[#4B5EFC]/10 flex items-center justify-center text-[10px] font-bold text-[#4B5EFC]">2</div>
                        <h3 className="text-[13px] font-semibold text-[#111]">Images dynamiques</h3>
                      </div>
                      <p className="text-[12px] text-[#777] leading-[1.65]">Vous uploadez un template d&apos;image (capture d&apos;ecran de votre produit, mockup, infographie) et Lemlist y incruste dynamiquement le nom du prospect, le logo de son entreprise, ou n&apos;importe quelle variable. Le resultat est une image qui semble creee manuellement pour chaque prospect. Sur nos campagnes SaaS, les emails avec images dynamiques ont systematiquement surperforme les emails texte : +35% de taux de reponse en moyenne.</p>
                    </div>
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-md bg-[#FF7A59]/10 flex items-center justify-center text-[10px] font-bold text-[#FF7A59]">3</div>
                        <h3 className="text-[13px] font-semibold text-[#111]">Videos personnalisees</h3>
                      </div>
                      <p className="text-[12px] text-[#777] leading-[1.65]">Vous enregistrez une video (webcam, screen recording) et Lemlist personnalise le thumbnail avec les informations du prospect. Le prospect recoit un email avec ce qui ressemble a une video enregistree specialement pour lui. Le taux de clic est tres eleve. En revanche, la production de la video template demande plus de travail que les images, et le format est moins adapte a certains secteurs (services financiers, juridique).</p>
                    </div>
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-md bg-[#22C55E]/10 flex items-center justify-center text-[10px] font-bold text-[#22C55E]">4</div>
                        <h3 className="text-[13px] font-semibold text-[#111]">Landing pages personnalisees</h3>
                      </div>
                      <p className="text-[12px] text-[#777] leading-[1.65]">Chaque prospect peut avoir sa propre micro-landing page avec son nom, son entreprise, un message personnalise et un bouton de prise de rendez-vous. Le prospect clique depuis l&apos;email et arrive sur une page qui semble faite sur mesure. C&apos;est puissant pour les cycles de vente complexes ou l&apos;ABM. Disponible uniquement sur le plan Multichannel Expert.</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Notre retour d&apos;experience</p>
                    <p className="text-[12px] text-[#777] leading-[1.65]">La personnalisation de Lemlist est reellement best-in-class. Sur les 30+ campagnes qu&apos;on a gerees, les campagnes avec personnalisation visuelle (images + liquid syntax) ont en moyenne genere 2 fois plus de reponses que les emails texte standard. Le probleme, c&apos;est que cette personnalisation avancee est aussi la raison pour laquelle Lemlist est plus cher. Si vous n&apos;utilisez pas ces fonctionnalites, vous payez pour quelque chose que vous ne consommez pas.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 : LinkedIn automation */}
              <section id="linkedin" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">L&apos;automatisation LinkedIn : ce qui marche, ce qui ne marche pas</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>C&apos;est la section la plus nuancee de cet article. L&apos;automatisation LinkedIn est un argument de vente majeur de Lemlist (plan Multichannel Expert a $99/mois), mais la realite terrain est plus complexe.</p>
                    <p>Voici ce que Lemlist propose sur LinkedIn :</p>
                  </div>

                  <div className="mt-4 space-y-2">
                    {[
                      { action: "Visite de profil", status: "Fonctionne", statusColor: "#22C55E", note: "Bonne facon de 'chauffer' un prospect avant le premier contact. Taux de visite retour de 15-20%." },
                      { action: "Demande de connexion", status: "Fonctionne, avec limites", statusColor: "#FF7A59", note: "LinkedIn limite a environ 100 connexions par semaine. Au-dela, risque de restriction du compte." },
                      { action: "Message LinkedIn", status: "Moyen", statusColor: "#FF7A59", note: "Fonctionne techniquement mais les messages automatises se voient. Le taux de reponse est inferieur aux messages manuels." },
                      { action: "InMail", status: "Fonctionne", statusColor: "#22C55E", note: "Necessite un abonnement LinkedIn Premium/Sales Navigator en plus de Lemlist. Cout supplementaire non negligeable." },
                      { action: "Messages vocaux", status: "Experimental", statusColor: "#EF4444", note: "Feature recente, basee sur l'IA. Le resultat est encore artificiel et la plupart des prospects le detectent." },
                    ].map((l) => (
                      <div key={l.action} className="flex gap-3 items-start rounded-lg border border-[#F2F2F2] p-3">
                        <div className="shrink-0">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md" style={{ color: l.statusColor, background: l.statusColor + "15" }}>{l.status}</span>
                        </div>
                        <div>
                          <p className="text-[12px] font-semibold text-[#111] mb-0.5">{l.action}</p>
                          <p className="text-[11px] text-[#888] leading-[1.6]">{l.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] p-4">
                    <p className="text-[12px] font-semibold text-[#EF4444] mb-2">Le risque de ban LinkedIn</p>
                    <div className="space-y-2 text-[12px] text-[#777] leading-[1.65]">
                      <p>L&apos;automatisation LinkedIn viole les conditions d&apos;utilisation de LinkedIn. Point final. Lemlist utilise une extension Chrome qui simule des actions humaines sur votre navigateur, mais LinkedIn detecte de mieux en mieux ces outils.</p>
                      <p>Sur nos 10 comptes clients, 3 ont eu des restrictions temporaires de leur compte LinkedIn en 2 ans d&apos;utilisation. Aucun ban permanent, mais des periodes de 1 a 2 semaines sans pouvoir envoyer de connexions ou de messages. Pour un commercial dont LinkedIn est un canal vital, c&apos;est problematique.</p>
                      <p>L&apos;ironie de la situation : Guillaume Moubeche, le fondateur de Lemlist, a lui-meme ete banni de LinkedIn. Son compte personnel, avec des centaines de milliers de followers, a ete suspendu par la plateforme. Il l&apos;a depuis recupere, mais l&apos;anecdote en dit long sur la fiabilite de l&apos;automatisation LinkedIn, meme pour celui qui la vend.</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Notre recommandation</p>
                    <p className="text-[12px] text-[#777] leading-[1.65]">Utilisez l&apos;automatisation LinkedIn de Lemlist avec moderation. Limitez-vous aux visites de profil et aux demandes de connexion (max 20-25 par jour). Evitez les messages automatises en masse. Et surtout, n&apos;utilisez jamais votre compte LinkedIn principal pour l&apos;automatisation. Si vous avez besoin d&apos;un outil LinkedIn dedie et plus fiable, regardez du cote de La Growth Machine qui gere mieux les limites et les proxys.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 : Multicanal en pratique */}
              <section id="multicanal" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Le multicanal en pratique</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Lemlist se positionne comme une plateforme de prospection multicanal : email, LinkedIn, WhatsApp et appels telephoniques dans une seule sequence. C&apos;est un vrai atout sur le papier. Voici comment ca fonctionne en realite.</p>
                  </div>

                  <div className="mt-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Exemple de sequence multicanal type (ce qu&apos;on utilise)</p>
                    <div className="space-y-3">
                      {[
                        { step: "Etape 1", delay: "J0", channel: "LinkedIn", action: "Visite de profil", channelColor: "#0A66C2", desc: "Le prospect voit votre visite dans ses notifications. Ca cree un premier point de contact passif." },
                        { step: "Etape 2", delay: "J+1", channel: "Email", action: "Email initial personnalise", channelColor: "#22C55E", desc: "Email court avec image dynamique. Le prospect vous a deja 'vu' sur LinkedIn, le taux d'ouverture est meilleur." },
                        { step: "Etape 3", delay: "J+3", channel: "LinkedIn", action: "Demande de connexion", channelColor: "#0A66C2", desc: "Message de connexion court, reference a l'email envoye. Taux d'acceptation de 30-40%." },
                        { step: "Etape 4", delay: "J+5", channel: "Email", action: "Relance email (si pas de reponse)", channelColor: "#22C55E", desc: "Nouveau sujet, nouvel angle. Apport de valeur (chiffre, etude de cas)." },
                        { step: "Etape 5", delay: "J+8", channel: "LinkedIn", action: "Message LinkedIn (si connexion acceptee)", channelColor: "#0A66C2", desc: "Message direct sur LinkedIn. Plus conversationnel, moins 'vendeur'." },
                        { step: "Etape 6", delay: "J+12", channel: "Email", action: "Email de cloture", channelColor: "#22C55E", desc: "'Est-ce que le sujet est toujours d'actualite ?' Dernier email, sans pression." },
                      ].map((s, i) => (
                        <div key={s.step} className="flex gap-4 items-start">
                          <div className="w-16 shrink-0 text-center">
                            <div className="text-[10px] font-semibold text-[#999]">{s.delay}</div>
                            {i < 5 && <div className="w-px h-6 bg-[#E8E8E8] mx-auto mt-1" />}
                          </div>
                          <div className="flex-1 rounded-lg border border-[#F2F2F2] p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded text-white" style={{ background: s.channelColor }}>{s.channel}</span>
                              <span className="text-[12px] font-semibold text-[#111]">{s.action}</span>
                            </div>
                            <p className="text-[11px] text-[#888] leading-[1.6]">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Sur nos campagnes multicanal, on a observe un taux de reponse global de 12-15%, contre 6-8% pour des campagnes email seul. Le multicanal fonctionne, mais il demande plus de setup, plus de suivi, et presente le risque LinkedIn evoque plus haut.</p>
                    <p>Concernant WhatsApp et les appels : ces canaux sont disponibles mais peu utilises en pratique par nos clients. WhatsApp est intrusif pour de la prospection B2B froide en France. Les appels necessitent une integration avec Aircall ou Ringover et un SDR disponible, ce qui casse le flux automatise.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 : Lemwarm et delivrabilite */}
              <section id="delivrabilite" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Lemwarm et delivrabilite</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La delivrabilite est le nerf de la guerre en cold email. Si vos emails finissent en spam, tout le reste ne sert a rien. Voici comment Lemlist gere ce sujet.</p>
                  </div>

                  {/* Deliverability score dashboard mockup */}
                  <div className="mt-5 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                    <p className="text-[12px] font-semibold text-[#111] mb-4">Dashboard de delivrabilite Lemwarm (ce que vous voyez)</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                      {[
                        { label: "Score de sante", value: "78/100", color: "#FF7A59", sub: "Correct" },
                        { label: "Emails en inbox", value: "72%", color: "#22C55E", sub: "Objectif : 85%+" },
                        { label: "Emails en spam", value: "18%", color: "#EF4444", sub: "Trop eleve" },
                        { label: "Emails en onglet promo", value: "10%", color: "#FF7A59", sub: "Acceptable" },
                      ].map((m) => (
                        <div key={m.label} className="text-center p-3 rounded-lg bg-white border border-[#F2F2F2]">
                          <div className="text-[16px] font-bold" style={{ color: m.color }}>{m.value}</div>
                          <div className="text-[10px] text-[#999] mt-1">{m.label}</div>
                          <div className="text-[9px] text-[#CCC] mt-0.5">{m.sub}</div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: "Google Workspace", inbox: 75, spam: 15, promo: 10, color: "#4285F4" },
                        { label: "Microsoft 365", inbox: 68, spam: 22, promo: 10, color: "#00A4EF" },
                        { label: "Yahoo / Autres", inbox: 71, spam: 19, promo: 10, color: "#6001D2" },
                      ].map((provider) => (
                        <div key={provider.label} className="flex items-center gap-3">
                          <span className="text-[10px] text-[#999] w-24 shrink-0">{provider.label}</span>
                          <div className="flex-1 h-3 rounded-full overflow-hidden flex">
                            <div className="h-full bg-[#22C55E]" style={{ width: `${provider.inbox}%` }} />
                            <div className="h-full bg-[#FF7A59]" style={{ width: `${provider.promo}%` }} />
                            <div className="h-full bg-[#EF4444]" style={{ width: `${provider.spam}%` }} />
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center gap-4 justify-end mt-1">
                        <span className="flex items-center gap-1 text-[9px] text-[#999]"><span className="w-2 h-2 rounded-sm bg-[#22C55E]" /> Inbox</span>
                        <span className="flex items-center gap-1 text-[9px] text-[#999]"><span className="w-2 h-2 rounded-sm bg-[#FF7A59]" /> Promo</span>
                        <span className="flex items-center gap-1 text-[9px] text-[#999]"><span className="w-2 h-2 rounded-sm bg-[#EF4444]" /> Spam</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Comment Lemwarm fonctionne :</strong> Lemwarm est le systeme de warm-up email integre de Lemlist, inclus a partir du plan Email Pro ($69/mois). Il envoie et recoit automatiquement des emails depuis un reseau de boites reelles pour construire la reputation de votre adresse. Le processus se deroule en 3 phases :</p>
                    <ol className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-md bg-[#F5F5F5] flex items-center justify-center text-[10px] font-bold text-[#999] shrink-0">1</span><span><strong className="text-[#111]">Phase initiale (semaine 1-2)</strong> : 5 a 10 emails de warm-up par jour. Votre boite commence a construire une reputation.</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-md bg-[#F5F5F5] flex items-center justify-center text-[10px] font-bold text-[#999] shrink-0">2</span><span><strong className="text-[#111]">Phase de montee (semaine 2-4)</strong> : 15 a 30 emails par jour. Interactions simulees (ouvertures, reponses, sortie de spam).</span></li>
                      <li className="flex items-start gap-2"><span className="w-5 h-5 rounded-md bg-[#F5F5F5] flex items-center justify-center text-[10px] font-bold text-[#999] shrink-0">3</span><span><strong className="text-[#111]">Phase de maintien (semaine 4+)</strong> : Le warm-up continue en parallele de vos campagnes pour maintenir la reputation.</span></li>
                    </ol>
                    <p><strong className="text-[#111]">Nos resultats concrets :</strong> Sur nos comptes, le score de sante Lemwarm oscille entre 70 et 85 sur 100. C&apos;est correct mais pas exceptionnel. Par comparaison, sur Emelia (qui utilise Mailreach), on obtient des scores de 85 a 95. La difference se ressent sur les taux d&apos;ouverture : 47-55% avec Lemlist contre 58-65% avec Emelia sur des listes comparables.</p>
                    <p><strong className="text-[#111]">Les bonnes pratiques delivrabilite :</strong></p>
                    <ul className="space-y-1.5 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" />Configurez SPF, DKIM et DMARC sur votre domaine (obligatoire)</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" />Utilisez un custom tracking domain (au lieu du domaine partage de Lemlist)</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" />Ne depassez pas 30-40 emails par boite par jour</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" />Activez la rotation de boites email (3 a 5 boites par campagne)</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6C5CE7] mt-2 shrink-0" />Laissez Lemwarm tourner au moins 3 semaines avant votre premiere campagne</li>
                    </ul>
                    <p>Point important : Lemwarm n&apos;est pas inclus dans le plan Email Starter ($39/mois). Si vous prenez le plan d&apos;entree, vous n&apos;avez pas de warm-up integre, ce qui est un probleme serieux pour la delivrabilite. On ne recommande pas le plan Starter pour cette raison.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 : Base de donnees B2B */}
              <section id="base-donnees" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">La base de donnees B2B : 450 millions de contacts, mais quelle qualite ?</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Lemlist a integre une base de donnees B2B directement dans la plateforme : 450 millions de contacts et 63 millions d&apos;entreprises. L&apos;enrichissement utilise un systeme &ldquo;waterfall&rdquo; qui interroge sequentiellement 7 a 8 fournisseurs de donnees (dont Dropcontact, Hunter, et d&apos;autres) pour maximiser le taux de decouverte.</p>
                    <p>Sur le papier, c&apos;est seduisant. Plus besoin d&apos;un outil tiers pour trouver les emails de vos prospects. En pratique, la realite est plus nuancee.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <p className="text-[12px] font-semibold text-[#111]">Nos tests sur la base de donnees (mars 2026)</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="rounded-lg border border-[#F2F2F2] p-4">
                        <p className="text-[12px] font-semibold text-[#22C55E] mb-3">Ce qui fonctionne bien</p>
                        <div className="space-y-2">
                          {[
                            { label: "Marche US/UK", value: "80% de find rate email", desc: "Conforme a l'annonce. La couverture anglophone est excellente." },
                            { label: "Grandes entreprises", value: "75-85% de find rate", desc: "Les entreprises de +500 employes sont bien couvertes." },
                            { label: "Waterfall enrichment", value: "7-8 sources", desc: "Le systeme interroge plusieurs providers, ce qui maximise les chances." },
                          ].map((t) => (
                            <div key={t.label} className="pb-2 border-b border-[#F5F5F5] last:border-0 last:pb-0">
                              <div className="flex justify-between items-center mb-0.5">
                                <span className="text-[11px] font-medium text-[#111]">{t.label}</span>
                                <span className="text-[10px] font-semibold text-[#22C55E]">{t.value}</span>
                              </div>
                              <p className="text-[10px] text-[#999] leading-[1.5]">{t.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-lg border border-[#F2F2F2] p-4">
                        <p className="text-[12px] font-semibold text-[#EF4444] mb-3">Ce qui pose probleme</p>
                        <div className="space-y-2">
                          {[
                            { label: "Marche francais/europe du sud", value: "55-65% de find rate", desc: "Nettement en dessous de l'annonce. Beaucoup de contacts manquants." },
                            { label: "PME et startups", value: "45-55% de find rate", desc: "Les petites structures sont mal couvertes." },
                            { label: "Contacts obsoletes", value: "8-12% de donnees perimees", desc: "Personnes qui ont change de poste, entreprises fermees." },
                          ].map((t) => (
                            <div key={t.label} className="pb-2 border-b border-[#F5F5F5] last:border-0 last:pb-0">
                              <div className="flex justify-between items-center mb-0.5">
                                <span className="text-[11px] font-medium text-[#111]">{t.label}</span>
                                <span className="text-[10px] font-semibold text-[#EF4444]">{t.value}</span>
                              </div>
                              <p className="text-[10px] text-[#999] leading-[1.5]">{t.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le point le plus frustrant concerne le systeme de credits. Chaque enrichissement consomme des credits : 5 credits par email recherche, 20 credits par numero de telephone. Les credits sont inclus dans votre plan mensuel mais ne roulent pas d&apos;un mois sur l&apos;autre. Et surtout, les credits sont consommes meme si Lemlist ne trouve pas l&apos;email. Vous payez pour la tentative, pas pour le resultat.</p>
                    <p>Pour le marche francais, on recommande de combiner Lemlist avec un outil specialise comme Dropcontact ou Societeinfo pour l&apos;enrichissement, plutot que de compter uniquement sur la base integree.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 : L'IA dans Lemlist */}
              <section id="ia" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">L&apos;IA dans Lemlist : un vrai avantage concurrentiel</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Lemlist a pris un virage IA ambitieux depuis fin 2025, et contrairement a beaucoup d&apos;outils qui collent un badge &ldquo;IA&rdquo; sur des fonctionnalites cosmetiques, ici l&apos;IA apporte une vraie valeur operationnelle. C&apos;est l&apos;un des domaines ou Lemlist a le plus progresse recemment.</p>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      {
                        name: "AI Enrichissement de colonnes",
                        score: "4.7/5",
                        scoreColor: "#22C55E",
                        desc: "C'est LA fonctionnalite qui change la donne. Lemlist permet d'ajouter des colonnes enrichies par IA directement dans vos listes de prospects. Vous pouvez demander a l'IA d'analyser le profil LinkedIn de chaque prospect et de generer : un resume de leur activite recente, leur stack technologique probable, un icebreaker personnalise, une analyse de leur entreprise, ou n'importe quelle donnee derivee. C'est comme avoir Clay integre directement dans votre outil de prospection.",
                        verdict: "Game-changer pour la personnalisation a l'echelle. On l'utilise pour generer des icebreakers, analyser les posts LinkedIn recents et identifier les signaux d'achat. Resultat : +35% de taux de reponse sur les campagnes enrichies par IA."
                      },
                      {
                        name: "AI Campaign Generator",
                        score: "4.2/5",
                        scoreColor: "#4B5EFC",
                        desc: "Vous decrivez votre cible, votre offre et votre ton, et l'IA genere une sequence complete : sujets, corps des emails, timing, conditions. La qualite des drafts a nettement progresse depuis le lancement. Les emails generes sont maintenant bien structures avec des hooks pertinents. Il faut toujours ajuster le ton et les details, mais le gain de temps est reel.",
                        verdict: "Un vrai accelerateur. On cree un premier draft de campagne en 10 minutes au lieu de 2 heures. Ideal comme point de depart que notre equipe affine ensuite."
                      },
                      {
                        name: "AI Variables dynamiques",
                        score: "4.5/5",
                        scoreColor: "#22C55E",
                        desc: "L'IA analyse le profil LinkedIn du prospect et genere des variables personnalisees pour chaque contact : un icebreaker contextuel, une reference a un post recent, une mention de leur actualite, un compliment sur un accomplissement. Le niveau de personnalisation est impressionnant et quasi impossible a reproduire manuellement a l'echelle.",
                        verdict: "C'est ce qui rend Lemlist unique. Aucun concurrent ne fait aussi bien la personnalisation IA a l'echelle. Les emails ressemblent a des messages ecrits a la main."
                      },
                      {
                        name: "AI Email Writer & Optimizer",
                        score: "4.0/5",
                        scoreColor: "#4B5EFC",
                        desc: "Disponible dans l'editeur de sequence, il propose des reformulations, des alternatives de sujets, optimise la longueur et le ton. L'IA analyse aussi les performances de vos emails precedents pour suggerer des ameliorations basees sur les donnees. Plus evolue qu'un simple wrapper ChatGPT.",
                        verdict: "Pratique au quotidien. L'analyse des performances passees pour guider les suggestions est un vrai plus par rapport aux outils generiques."
                      },
                      {
                        name: "AI Voice Messages LinkedIn",
                        score: "3.5/5",
                        scoreColor: "#FF7A59",
                        desc: "L'IA genere des messages vocaux personnalises pour LinkedIn dans plusieurs langues. La qualite vocale a progresse mais reste detectable comme artificielle par les oreilles exercees. Ca fonctionne mieux en anglais qu'en francais pour l'instant.",
                        verdict: "Concept prometteur, execution en progres. On l'utilise en complement des messages vocaux manuels sur les comptes prioritaires."
                      },
                      {
                        name: "AI Lookalike Finder",
                        score: "4.0/5",
                        scoreColor: "#4B5EFC",
                        desc: "Vous donnez un profil LinkedIn de votre meilleur client, et l'IA trouve des profils similaires dans la base B2B. Les resultats sont pertinents quand le profil de depart est bien defini. C'est un raccourci efficace pour construire des listes sans passer par des filtres complexes.",
                        verdict: "Tres utile pour les equipes qui ont du mal a definir leur ICP dans des filtres. On part d'un exemple concret et l'IA extrapole."
                      },
                    ].map((ai) => (
                      <div key={ai.name} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-[13px] font-semibold text-[#111]">{ai.name}</h3>
                          <span className="text-[12px] font-bold" style={{ color: ai.scoreColor }}>{ai.score}</span>
                        </div>
                        <p className="text-[12px] text-[#777] leading-[1.65] mb-2">{ai.desc}</p>
                        <p className="text-[11px] text-[#999] leading-[1.6] italic">{ai.verdict}</p>
                      </div>
                    ))}
                  </div>

                  {/* AI enrichment mockup */}
                  <div className="mt-5 rounded-lg border border-[#EAEAEA] overflow-hidden">
                    <div className="bg-[#6C5CE7] px-4 py-2 flex items-center gap-2">
                      <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-white/30" /><div className="w-2 h-2 rounded-full bg-white/30" /><div className="w-2 h-2 rounded-full bg-white/30" /></div>
                      <span className="text-[10px] text-white/70 font-medium">Lemlist AI Enrichment</span>
                    </div>
                    <div className="bg-white p-4 overflow-x-auto">
                      <table className="w-full text-[10px]">
                        <thead>
                          <tr className="border-b border-[#F2F2F2]">
                            <th className="text-left py-2 px-2 text-[#999] font-medium">Prospect</th>
                            <th className="text-left py-2 px-2 text-[#999] font-medium">Entreprise</th>
                            <th className="text-left py-2 px-2 text-[#6C5CE7] font-medium">AI Icebreaker</th>
                            <th className="text-left py-2 px-2 text-[#6C5CE7] font-medium">AI Pain Point</th>
                            <th className="text-left py-2 px-2 text-[#6C5CE7] font-medium">AI Stack</th>
                          </tr>
                        </thead>
                        <tbody className="text-[#555]">
                          <tr className="border-b border-[#F9F9F9]">
                            <td className="py-2 px-2 font-medium text-[#111]">Marie Dupont</td>
                            <td className="py-2 px-2">Doctolib</td>
                            <td className="py-2 px-2 text-[#6C5CE7]">Felicitations pour le lancement de votre nouveau module de teleconsultation</td>
                            <td className="py-2 px-2 text-[#6C5CE7]">Alignement marketing-sales sur un cycle de vente long (+90j)</td>
                            <td className="py-2 px-2 text-[#6C5CE7]">Salesforce, Pardot, Tableau</td>
                          </tr>
                          <tr className="border-b border-[#F9F9F9]">
                            <td className="py-2 px-2 font-medium text-[#111]">Thomas Martin</td>
                            <td className="py-2 px-2">Spendesk</td>
                            <td className="py-2 px-2 text-[#6C5CE7]">Votre post sur la gestion des depenses en hypercroissance etait tres pertinent</td>
                            <td className="py-2 px-2 text-[#6C5CE7]">Scaling de l&apos;equipe SDR de 5 a 15 avec maintien de la qualite</td>
                            <td className="py-2 px-2 text-[#6C5CE7]">HubSpot, Outreach, Looker</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-2 font-medium text-[#111]">Julie Renard</td>
                            <td className="py-2 px-2">Alan</td>
                            <td className="py-2 px-2 text-[#6C5CE7]">Impressionnant votre croissance de 40% sur le segment PME en 2025</td>
                            <td className="py-2 px-2 text-[#6C5CE7]">Attribution marketing multi-touch sur un funnel PLG + sales-assisted</td>
                            <td className="py-2 px-2 text-[#6C5CE7]">HubSpot, Segment, Amplitude</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-[#FAFAFA] px-4 py-2 border-t border-[#F2F2F2]">
                      <p className="text-[9px] text-[#999]">Les colonnes en violet sont generees automatiquement par l&apos;IA a partir du profil LinkedIn et des donnees entreprise</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#F0F0FF] border border-[#E0E0FF] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Notre avis global sur l&apos;IA Lemlist</p>
                    <p className="text-[12px] text-[#555] leading-[1.65]">L&apos;IA dans Lemlist est passee de gadget a vrai avantage concurrentiel en quelques mois. L&apos;enrichissement de colonnes par IA est la fonctionnalite phare : elle permet de generer des donnees contextuelles pour chaque prospect sans quitter l&apos;outil, comme un Clay integre. Les AI Variables et le Campaign Generator sont des accelerateurs reels au quotidien. C&apos;est aujourd&apos;hui l&apos;un des arguments les plus solides pour choisir Lemlist.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 11 : Integrations CRM */}
              <section id="integrations" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les integrations CRM</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Les integrations CRM sont disponibles a partir du plan Email Pro ($69/mois). Lemlist propose des integrations natives avec les principaux CRM du marche :</p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      {
                        tool: "HubSpot",
                        icon: "hubspot.com",
                        status: "Bon",
                        statusColor: "#22C55E",
                        desc: "Synchronisation bidirectionnelle des contacts. Les statuts Lemlist (contacte, repondu, interesse) se mappent aux proprietes HubSpot. On peut declencher des workflows HubSpot a partir des evenements Lemlist. C'est l'integration la plus aboutie.",
                        limits: "Pas de sync des deals. Le mapping des proprietes custom necessite un setup manuel. Pour un setup RevOps propre, on passe quand meme par Make pour les cas complexes.",
                      },
                      {
                        tool: "Salesforce",
                        icon: "salesforce.com",
                        status: "Correct",
                        statusColor: "#FF7A59",
                        desc: "Synchronisation des leads et contacts. Logging des activites (emails envoyes, ouverts, repondus). Integration fonctionnelle mais moins poussee que HubSpot.",
                        limits: "Setup plus complexe. Necessite des droits admin Salesforce. Quelques bugs de sync remontes par des utilisateurs sur G2.",
                      },
                      {
                        tool: "Pipedrive",
                        icon: "pipedrive.com",
                        status: "Basique",
                        statusColor: "#FF7A59",
                        desc: "Synchronisation unidirectionnelle Lemlist vers Pipedrive. Creation automatique de contacts quand un prospect repond ou montre de l'interet.",
                        limits: "Pas de sync bidirectionnelle. Pas de mapping avance. Fonctionnalites limitees par rapport a HubSpot et Salesforce.",
                      },
                      {
                        tool: "Zapier / Make / n8n",
                        icon: "zapier.com",
                        status: "Complet",
                        statusColor: "#22C55E",
                        desc: "Disponible a partir du plan Multichannel Expert ($99/mois). Triggers sur les evenements Lemlist, actions pour ajouter/retirer des leads, mettre a jour des statuts. C'est la solution qu'on recommande pour les setups complexes.",
                        limits: "Necessite le plan Expert (pas disponible sur Starter et Pro). Cout supplementaire de l'outil d'automatisation.",
                      },
                    ].map((int) => (
                      <div key={int.tool} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <img src={`https://www.google.com/s2/favicons?domain=${int.icon}&sz=32`} alt={int.tool} className="w-4 h-4" />
                          <span className="text-[13px] font-semibold text-[#111]">{int.tool}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md ml-auto" style={{ color: int.statusColor, background: int.statusColor + "15" }}>{int.status}</span>
                        </div>
                        <p className="text-[12px] text-[#777] leading-[1.65] mb-2">{int.desc}</p>
                        <p className="text-[11px] text-[#999] leading-[1.6] italic">{int.limits}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Lemlist integre aussi Aircall et Ringover pour les appels telephoniques, et Close.io pour les equipes qui utilisent ce CRM. Les integrations sont globalement fonctionnelles mais pas au niveau de ce que propose Apollo (qui a son propre mini-CRM integre) ou HubSpot (qui est un CRM avec des outils d&apos;outbound natifs).</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 12 : Pricing */}
              <section id="pricing" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Prix : le vrai cout de Lemlist en 2026</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le prix est le principal reproche qu&apos;on fait a Lemlist. Pas parce que l&apos;outil ne les vaut pas (il est puissant), mais parce que le modele per-seat fait exploser la facture des qu&apos;on scale.</p>
                  </div>

                  {/* Pricing cards */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        name: "Email Starter",
                        price: "39",
                        annual: null,
                        color: "#999",
                        features: ["1 boite email", "Envoi illimite", "Personnalisation avancee", "Pas de warm-up", "Pas de LinkedIn", "Pas de CRM"],
                        missing: ["Lemwarm", "A/B testing", "Integrations CRM", "LinkedIn automation"],
                        highlight: false,
                      },
                      {
                        name: "Email Pro",
                        price: "69",
                        annual: "$55/mois",
                        color: "#4B5EFC",
                        features: ["3 boites email", "Lemwarm inclus", "A/B testing", "AI email writer", "Integrations CRM", "API access"],
                        missing: ["LinkedIn automation", "WhatsApp", "Landing pages", "Zapier / Make"],
                        highlight: false,
                      },
                      {
                        name: "Multichannel Expert",
                        price: "99",
                        annual: "$79/mois",
                        color: "#6C5CE7",
                        features: ["5 boites email", "LinkedIn automation", "WhatsApp + appels", "Landing pages", "Zapier / Make / n8n", "Tout Email Pro +"],
                        missing: ["Account manager dedie", "15 boites email"],
                        highlight: true,
                      },
                      {
                        name: "Outreach Scale",
                        price: "159",
                        annual: null,
                        color: "#FF7A59",
                        features: ["15 boites email", "Account manager dedie", "Tout Expert +", "Support prioritaire", "Onboarding personnalise", "Volume eleve"],
                        missing: [],
                        highlight: false,
                      },
                    ].map((p) => (
                      <div key={p.name} className={`rounded-lg border p-4 ${p.highlight ? "border-[#6C5CE7] bg-[#6C5CE7]/[0.02] ring-1 ring-[#6C5CE7]/20" : "border-[#F2F2F2]"}`}>
                        <div className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: p.color }}>{p.name}</div>
                        <div className="flex items-baseline gap-1 mb-1">
                          <span className="text-[11px] text-[#999]">$</span>
                          <span className="text-[28px] font-bold text-[#111]">{p.price}</span>
                          <span className="text-[11px] text-[#999]">/user/mois</span>
                        </div>
                        {p.annual && <p className="text-[10px] text-[#22C55E] mb-3">{p.annual} en annuel</p>}
                        {!p.annual && <p className="text-[10px] text-[#CCC] mb-3">Pas de reduction annuelle</p>}
                        <div className="space-y-1.5 mb-3">
                          {p.features.map((f) => (
                            <p key={f} className="text-[11px] text-[#777] flex items-center gap-2">
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#22C55E] shrink-0"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              {f}
                            </p>
                          ))}
                        </div>
                        {p.missing.length > 0 && (
                          <div className="space-y-1.5 pt-2 border-t border-[#F5F5F5]">
                            {p.missing.map((m) => (
                              <p key={m} className="text-[11px] text-[#CCC] flex items-center gap-2">
                                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#DDD] shrink-0"><path d="M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                                {m}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Credit system calculator */}
                  <div className="mt-6 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                    <h3 className="text-[14px] font-semibold text-[#111] mb-2">Le systeme de credits : ce qu&apos;il faut comprendre</h3>
                    <p className="text-[12px] text-[#777] leading-[1.65] mb-4">Chaque plan inclut un quota de credits mensuels pour l&apos;enrichissement. 1 email = 5 credits, 1 numero de telephone = 20 credits. Les credits non utilises ne roulent pas au mois suivant. Les credits supplementaires coutent $0.01 chacun.</p>
                    <div className="overflow-x-auto">
                      <div className="min-w-[400px]">
                        <div className="grid grid-cols-4 gap-2 pb-3 border-b border-[#EAEAEA]">
                          <span className="text-[10px] font-semibold text-[#999]">Volume d&apos;enrichissement</span>
                          <span className="text-[10px] font-semibold text-[#999] text-center">Credits necessaires</span>
                          <span className="text-[10px] font-semibold text-[#999] text-center">Cout additionnel*</span>
                          <span className="text-[10px] font-semibold text-[#999] text-center">Cout par contact</span>
                        </div>
                        {[
                          { volume: "500 emails", credits: "2 500", extra: "~$25", perContact: "$0.05" },
                          { volume: "1 000 emails", credits: "5 000", extra: "~$50", perContact: "$0.05" },
                          { volume: "2 000 emails", credits: "10 000", extra: "~$100", perContact: "$0.05" },
                          { volume: "500 emails + 200 phones", credits: "6 500", extra: "~$65", perContact: "$0.09" },
                          { volume: "1 000 emails + 500 phones", credits: "15 000", extra: "~$150", perContact: "$0.10" },
                        ].map((row) => (
                          <div key={row.volume} className="grid grid-cols-4 gap-2 py-2 border-b border-[#F5F5F5]">
                            <span className="text-[11px] font-medium text-[#111]">{row.volume}</span>
                            <span className="text-[11px] text-[#999] text-center">{row.credits}</span>
                            <span className="text-[11px] text-[#FF7A59] font-medium text-center">{row.extra}</span>
                            <span className="text-[11px] text-[#999] text-center">{row.perContact}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] text-[#CCC] mt-3">*Cout additionnel si vous avez depasse votre quota de credits inclus. Les credits sont charges meme si l&apos;email n&apos;est pas trouve.</p>
                  </div>

                  {/* Simulation 5 SDR */}
                  <div className="mt-6 rounded-lg border border-[#EF4444]/20 bg-[#FEF2F2] p-5">
                    <h3 className="text-[14px] font-semibold text-[#111] mb-2">Simulation : le vrai cout pour une equipe de 5 SDR</h3>
                    <p className="text-[12px] text-[#777] leading-[1.65] mb-4">Voici ce que ca coute concretement pour une equipe de 5 commerciaux sur le plan Multichannel Expert :</p>
                    <div className="space-y-2">
                      {[
                        { label: "5 licences Multichannel Expert", cost: "$495/mois", detail: "5 x $99/mois" },
                        { label: "Credits enrichissement supplementaires", cost: "~$200/mois", detail: "Pour 4 000 emails enrichis" },
                        { label: "LinkedIn Sales Navigator", cost: "~$500/mois", detail: "5 licences pour l'automation LinkedIn" },
                        { label: "Domaines d'envoi supplementaires", cost: "~$50/mois", detail: "3-5 domaines pour la rotation" },
                      ].map((line) => (
                        <div key={line.label} className="flex items-center justify-between py-2 border-b border-[#EF4444]/10">
                          <div>
                            <span className="text-[12px] font-medium text-[#111]">{line.label}</span>
                            <span className="text-[10px] text-[#999] ml-2">{line.detail}</span>
                          </div>
                          <span className="text-[12px] font-bold text-[#EF4444]">{line.cost}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-3">
                        <span className="text-[13px] font-bold text-[#111]">Total mensuel estime</span>
                        <span className="text-[16px] font-bold text-[#EF4444]">~$1 245/mois</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-medium text-[#999]">Soit par an</span>
                        <span className="text-[14px] font-bold text-[#EF4444]">~$14 940/an</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#999] mt-3 leading-[1.6]">A titre de comparaison, la meme configuration avec Emelia + La Growth Machine (pour LinkedIn) couterait environ $600-700/mois. Et avec Instantly pour du cold email pur sans LinkedIn, environ $250-350/mois.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 13 : Comparatif */}
              <section id="comparatif" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Lemlist vs Emelia vs Apollo vs Instantly vs La Growth Machine</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le marche des outils de prospection outbound est dense en 2026. Voici une comparaison detaillee de Lemlist avec ses 4 principaux concurrents.</p>
                  </div>

                  {/* Big comparison table */}
                  <div className="mt-5 overflow-x-auto">
                    <div className="min-w-[600px]">
                      <div className="grid grid-cols-6 gap-2 pb-3 border-b border-[#EAEAEA]">
                        <span className="text-[10px] font-semibold text-[#999]">Critere</span>
                        {[
                          { name: "Lemlist", domain: "lemlist.com", color: "#6C5CE7" },
                          { name: "Emelia", domain: "emelia.io", color: "#22C55E" },
                          { name: "Apollo", domain: "apollo.io", color: "#4B5EFC" },
                          { name: "Instantly", domain: "instantly.ai", color: "#FF7A59" },
                          { name: "LGM", domain: "lagrowthmachine.com", color: "#999" },
                        ].map((t) => (
                          <div key={t.name} className="text-center">
                            <img src={`https://www.google.com/s2/favicons?domain=${t.domain}&sz=32`} alt={t.name} className="w-3 h-3 mx-auto mb-1" />
                            <span className="text-[10px] font-semibold" style={{ color: t.color }}>{t.name}</span>
                          </div>
                        ))}
                      </div>
                      {[
                        { label: "Prix entree (/user/mois)", lemlist: "$39", emelia: "37 EUR", apollo: "$49", instantly: "$30", lgm: "80 EUR" },
                        { label: "Prix multicanal", lemlist: "$99", emelia: "N/A", apollo: "$99", instantly: "N/A", lgm: "120 EUR" },
                        { label: "Personnalisation email", lemlist: "Excellent", emelia: "Bon", apollo: "Basique", instantly: "Bon", lgm: "Bon" },
                        { label: "Images dynamiques", lemlist: "Oui", emelia: "Non", apollo: "Non", instantly: "Non", lgm: "Non" },
                        { label: "LinkedIn automation", lemlist: "Oui (Expert)", emelia: "Non", apollo: "Non", instantly: "Non", lgm: "Oui (natif)" },
                        { label: "Delivrabilite", lemlist: "Bonne", emelia: "Excellente", apollo: "Moyenne", instantly: "Bonne", lgm: "Bonne" },
                        { label: "Warm-up inclus", lemlist: "Oui (Pro+)", emelia: "Oui", apollo: "Non", instantly: "Oui", lgm: "Oui" },
                        { label: "Base B2B integree", lemlist: "450M", emelia: "Non", apollo: "275M", instantly: "Non", lgm: "Non" },
                        { label: "CRM integre", lemlist: "Non", emelia: "Non", apollo: "Oui", instantly: "Non", lgm: "Non" },
                        { label: "Integration HubSpot", lemlist: "Bon", emelia: "Basique", apollo: "Excellent", instantly: "Basique", lgm: "Bon" },
                        { label: "Facilite d'utilisation", lemlist: "Moyenne", emelia: "Tres facile", apollo: "Moyenne", instantly: "Facile", lgm: "Complexe" },
                        { label: "Support en francais", lemlist: "Non", emelia: "Oui", apollo: "Non", instantly: "Non", lgm: "Oui" },
                        { label: "API", lemlist: "Oui", emelia: "Oui", apollo: "Oui", instantly: "Oui", lgm: "Limitee" },
                      ].map((row) => (
                        <div key={row.label} className="grid grid-cols-6 gap-2 py-2 border-b border-[#F5F5F5]">
                          <span className="text-[11px] font-medium text-[#111]">{row.label}</span>
                          <span className="text-[11px] text-[#6C5CE7] font-medium text-center">{row.lemlist}</span>
                          <span className="text-[11px] text-[#999] text-center">{row.emelia}</span>
                          <span className="text-[11px] text-[#999] text-center">{row.apollo}</span>
                          <span className="text-[11px] text-[#999] text-center">{row.instantly}</span>
                          <span className="text-[11px] text-[#999] text-center">{row.lgm}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed comparison cards */}
                  <div className="mt-6 space-y-4">
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=lemlist.com&sz=32" alt="Lemlist" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Lemlist vs Emelia</span>
                      </div>
                      <p className="text-[12px] text-[#777] leading-[1.65]">La difference de prix est le facteur decisif. Pour du cold email pur, Lemlist coute 3 a 10 fois plus cher qu&apos;Emelia pour un volume d&apos;envoi equivalent. Emelia offre une meilleure delivrabilite (warm-up Mailreach superieur a Lemwarm), une interface plus simple, et un support en francais. Lemlist gagne sur la personnalisation (images, videos, liquid syntax), le multicanal et la base B2B. Notre regle chez Ceres : si le client fait uniquement de l&apos;email, Emelia. Si le client a besoin de personnalisation avancee ou de multicanal, Lemlist.</p>
                    </div>
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=apollo.io&sz=32" alt="Apollo" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Lemlist vs Apollo</span>
                      </div>
                      <p className="text-[12px] text-[#777] leading-[1.65]">Apollo est le choix oppose a Lemlist. Ou Lemlist excelle sur la personnalisation, Apollo excelle sur les donnees. La base de donnees B2B d&apos;Apollo (275M contacts) est mieux maintenue et plus fiable que celle de Lemlist, avec un CRM leger integre qui evite d&apos;avoir un outil supplementaire. En revanche, Apollo est faible sur la personnalisation email (pas d&apos;images dynamiques, pas de liquid syntax), et la delivrabilite est moyenne. Si votre priorite est l&apos;enrichissement et les donnees, Apollo. Si c&apos;est la personnalisation et le multicanal, Lemlist.</p>
                    </div>
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=instantly.ai&sz=32" alt="Instantly" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Lemlist vs Instantly</span>
                      </div>
                      <p className="text-[12px] text-[#777] leading-[1.65]">Instantly est concu pour le volume. Son modele de prix (par workspace, pas par utilisateur) le rend beaucoup plus economique pour les equipes qui envoient en masse. La delivrabilite est bonne grace au warm-up integre et a la rotation de boites illimitee. Lemlist est superieur sur la personnalisation et le multicanal, mais si votre strategie repose sur le volume d&apos;emails plutot que sur la personnalisation unitaire, Instantly est plus adapte et moins cher.</p>
                    </div>
                    <div className="rounded-lg border border-[#F2F2F2] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=lagrowthmachine.com&sz=32" alt="LGM" className="w-4 h-4" />
                        <span className="text-[12px] font-semibold text-[#111]">Lemlist vs La Growth Machine</span>
                      </div>
                      <p className="text-[12px] text-[#777] leading-[1.65]">La Growth Machine (LGM) est le concurrent le plus direct de Lemlist sur le multicanal. LGM gere mieux l&apos;automatisation LinkedIn (meilleure gestion des limites, proxys dedies, moins de risques de ban). En revanche, Lemlist a une meilleure personnalisation email (images, videos, landing pages). LGM est aussi plus cher et plus complexe a prendre en main. Pour du multicanal LinkedIn-first, LGM. Pour du multicanal email-first avec personnalisation, Lemlist.</p>
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 14 : Limites */}
              <section id="limites" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les limites qu&apos;on a rencontrees en 2 ans</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Apres deux ans d&apos;utilisation intensive sur une dizaine de comptes clients, voici les problemes concrets que nous avons rencontres. Ce ne sont pas des defauts theoriques mais des irritants quotidiens.</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      {
                        title: "Le prix monte vite a l'echelle",
                        desc: "Le modele per-seat est le frein numero un. A $99/mois par utilisateur pour le plan Expert, une equipe de 5 SDR paie pres de $500/mois rien que pour les licences. Ajoutez les credits supplementaires et LinkedIn Sales Navigator, et la facture depasse facilement $1 200/mois. Pour une startup qui se lance en outbound, c'est un budget considerable.",
                      },
                      {
                        title: "Les credits ne roulent pas et sont charges meme sans resultat",
                        desc: "C'est le reproche le plus frequent qu'on entend de la part de nos clients. Vous payez 5 credits pour chercher un email, que l'email soit trouve ou non. Sur un lot de 1 000 prospects en France ou le find rate est de 60%, vous perdez 2 000 credits pour 400 resultats vides. Et ces credits non utilises en fin de mois disparaissent.",
                      },
                      {
                        title: "La qualite de la base de donnees est inegale",
                        desc: "Les 450 millions de contacts annonces sont impressionnants, mais la qualite varie enormement selon la geographie et la taille des entreprises. On a trouve des contacts qui avaient quitte leur poste depuis 2 ans, des entreprises fermees, des numeros de telephone errones. Sur le marche francais, c'est particulierement flagrant.",
                      },
                      {
                        title: "L'extension Chrome est buggy",
                        desc: "L'extension Chrome de Lemlist (necessaire pour l'automatisation LinkedIn) plante regulierement. Mise a jour qui casse la fonctionnalite, deconnexion aleatoire, conflits avec d'autres extensions. On a du reinstaller l'extension plusieurs fois par mois sur certains comptes. C'est agacant pour un outil qui coute $99/mois.",
                      },
                      {
                        title: "L'automatisation LinkedIn est peu fiable et risquee",
                        desc: "On en a parle en detail, mais il faut le repeter : l'automatisation LinkedIn viole les CGU de LinkedIn et expose vos comptes a des restrictions. Le fait que le CEO de Lemlist ait ete banni de LinkedIn illustre le niveau de risque. Sur 10 comptes en 2 ans, 3 ont subi des restrictions temporaires.",
                      },
                      {
                        title: "Analytics et reporting faibles",
                        desc: "Le reporting de Lemlist est basique. Pas de dashboard cross-campagnes digne de ce nom, pas de reporting par canal, pas d'attribution multi-touch, pas d'export automatise. Pour une agence qui doit rapporter des resultats a ses clients, c'est insuffisant. On exporte tout en CSV et on fait le reporting dans Google Sheets ou Looker Studio.",
                      },
                      {
                        title: "Courbe d'apprentissage raide pour les features avancees",
                        desc: "La liquid syntax, les conditions dans les sequences, le paramétrage de l'enrichissement waterfall, les landing pages : tout ca demande un temps d'apprentissage significatif. Les ressources educatives sont excellentes, mais comptez 2 a 3 semaines pour qu'un nouveau SDR soit autonome sur toutes les fonctionnalites.",
                      },
                      {
                        title: "Pas de plan gratuit",
                        desc: "Lemlist ne propose pas de plan gratuit. Le plan d'entree est a $39/mois, sans warm-up et sans CRM. Pour tester l'outil, il faut souscrire un abonnement. Par comparaison, Apollo propose un plan gratuit genereux et Instantly propose un trial de 14 jours.",
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

              {/* Section 15 : Verdict */}
              <section id="verdict" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Verdict</span>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[20px] font-semibold text-white">Notre avis final apres 2 ans</h2>
                    <div className="flex items-center gap-2">
                      <img src="https://www.google.com/s2/favicons?domain=lemlist.com&sz=32" alt="Lemlist" className="w-5 h-5" />
                      <span className="text-[24px] font-bold text-[#6C5CE7]">4.3</span>
                      <span className="text-[12px] text-white/40">/5</span>
                    </div>
                  </div>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Lemlist est l&apos;outil de prospection multicanal le plus complet et le plus innovant du marche en 2026. La personnalisation est inegalee, l&apos;IA d&apos;enrichissement de colonnes est un game-changer, le multicanal email + LinkedIn + WhatsApp est mature, et Lemwarm fait partie des meilleurs warm-up disponibles.</p>
                    <p>L&apos;evolution recente de l&apos;IA embarquee (enrichissement de colonnes, AI Variables, Campaign Generator) a considerablement renforce la proposition de valeur. Ce n&apos;est plus juste un outil d&apos;envoi, c&apos;est une plateforme d&apos;intelligence commerciale qui vous aide a personnaliser a l&apos;echelle de facon impressionnante.</p>
                    <p>Le prix par utilisateur est eleve, c&apos;est un fait. Mais pour les equipes qui exploitent le multicanal et la personnalisation avancee, le ROI est clairement au rendez-vous. En tant que partenaire Lemlist, on le deploie chez Ceres pour nos clients ayant des cycles de vente complexes, des ACV eleves ou un besoin de personnalisation poussee.</p>
                    <p>Pour les equipes qui font du cold email pur a gros volume, des alternatives comme Emelia offrent un meilleur rapport cout/volume. Mais des que vous avez besoin de multicanal ou de personnalisation IA, Lemlist est difficile a battre.</p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[12px] font-semibold text-[#22C55E] mb-3">On a aime</p>
                      {[
                        "Personnalisation best-in-class (images, videos, liquid syntax)",
                        "IA d'enrichissement de colonnes (comme Clay integre)",
                        "AI Variables et Campaign Generator tres efficaces",
                        "Multicanal email + LinkedIn + WhatsApp + appels en un outil",
                        "Lemwarm inclus a partir du plan Pro",
                        "AI Lookalike Finder pour construire des listes rapidement",
                        "Ressources educatives parmi les meilleures du marche",
                        "Waterfall enrichment 80% de find rate",
                        "API et webhooks complets",
                      ].map((p) => (
                        <div key={p} className="flex items-center gap-2 text-[11px] text-white/50 mb-2">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#22C55E] shrink-0"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{p}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-[#EF4444] mb-3">A ameliorer</p>
                      {[
                        "Prix eleve a l'echelle (per-seat, 5 SDR Expert = $495/mois)",
                        "Credits non reportables d'un mois a l'autre",
                        "Base de donnees B2B inegale sur certaines zones geographiques",
                        "Courbe d'apprentissage pour les features avancees",
                        "LinkedIn automation a utiliser avec precaution (CGU)",
                        "Reporting en progres mais encore perfectible",
                      ].map((p) => (
                        <div key={p} className="flex items-center gap-2 text-[11px] text-white/50 mb-2">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#EF4444] shrink-0"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>{p}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Score breakdown */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3">Notes detaillees</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { label: "Personnalisation", score: "4.8/5", color: "#22C55E" },
                        { label: "IA & Enrichissement", score: "4.5/5", color: "#22C55E" },
                        { label: "Multicanal", score: "4.5/5", color: "#22C55E" },
                        { label: "Delivrabilite", score: "4.2/5", color: "#4B5EFC" },
                        { label: "Base B2B", score: "4.0/5", color: "#4B5EFC" },
                        { label: "Integrations CRM", score: "4.0/5", color: "#4B5EFC" },
                        { label: "Rapport qualite/prix", score: "3.5/5", color: "#FF7A59" },
                      ].map((s) => (
                        <div key={s.label} className="flex items-center justify-between bg-white/5 rounded-lg p-2.5">
                          <span className="text-[11px] text-white/50">{s.label}</span>
                          <span className="text-[12px] font-bold" style={{ color: s.color }}>{s.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 16 : Pour qui */}
              <section id="pour-qui" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pour qui Lemlist est fait</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-lg bg-[#F0FDF4] p-4">
                      <p className="text-[12px] font-semibold text-[#22C55E] mb-3">Ideal pour</p>
                      {[
                        "Equipes qui exploitent la personnalisation avancee (images, videos, landing pages)",
                        "Strategies multicanal email + LinkedIn",
                        "Cycles de vente complexes ou ABM",
                        "Equipes avec un budget outbound confortable (>$500/mois)",
                        "SaaS B2B ciblant le marche US/UK (base B2B performante)",
                        "Agences qui facturent la valeur ajoutee de la personnalisation",
                        "Equipes matures en cold outbound avec un SDR manager",
                      ].map((i) => (
                        <p key={i} className="text-[11px] text-[#555] mb-2 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-lg bg-[#FEF2F2] p-4">
                      <p className="text-[12px] font-semibold text-[#EF4444] mb-3">Pas adapte si</p>
                      {[
                        "Vous faites uniquement du cold email (Emelia ou Instantly suffisent)",
                        "Le budget est votre priorite numero un",
                        "Vous envoyez en gros volume sans personnalisation poussee",
                        "Vous ciblez principalement le marche francais (base B2B faible)",
                        "Vous debutez en cold outbound (courbe d'apprentissage trop raide)",
                        "Vous avez besoin de reporting avance (le reporting natif est faible)",
                        "Vous avez une equipe de +10 SDR (le cout per-seat explose)",
                      ].map((i) => (
                        <p key={i} className="text-[11px] text-[#555] mb-2 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Notre recommandation en 2026</p>
                    <div className="space-y-2 text-[12px] text-[#777] leading-[1.65]">
                      <p>Si vous hesitez, posez-vous une question simple : allez-vous utiliser la personnalisation visuelle (images, videos, landing pages) et le multicanal LinkedIn ? Si oui, Lemlist est probablement le meilleur choix. Le plan Multichannel Expert a $99/mois est le sweet spot.</p>
                      <p>Si vous faites principalement de l&apos;email, regardez Emelia ($37-97/mois) pour sa delivrabilite superieure et son prix imbattable. Si votre priorite est les donnees et l&apos;enrichissement, regardez Apollo. Si vous avez besoin de volume pur, regardez Instantly.</p>
                      <p>Et si vous avez besoin d&apos;aide pour choisir, configurer et connecter ces outils a votre CRM, c&apos;est exactement ce qu&apos;on fait chez Ceres.</p>
                    </div>
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
                    <p className="text-[12px] font-semibold text-[#111] leading-[1.4] group-hover:text-[#6C5CE7] transition-colors">{a.title}</p>
                    <p className="text-[10px] text-[#999] mt-2">{a.category}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section>
              <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour choisir votre stack outbound ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[500px] mx-auto">On configure et connecte vos outils de prospection a votre CRM. Lemlist, Emelia, Apollo, Instantly, La Growth Machine, HubSpot. Audit, setup et optimisation en moins de 2 semaines.</p>
                <div className="flex items-center justify-center gap-3">
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel
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