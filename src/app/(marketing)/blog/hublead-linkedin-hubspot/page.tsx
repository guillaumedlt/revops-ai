"use client";

import { useEffect, useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: { "@type": "SoftwareApplication", name: "Hublead", applicationCategory: "CRM Integration Tool", operatingSystem: "Web, Chrome Extension" },
  author: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  reviewRating: { "@type": "Rating", ratingValue: "4.0", bestRating: "5" },
  datePublished: "2026-03-03",
  reviewBody: "Test complet de Hublead, l'extension Chrome qui connecte LinkedIn a HubSpot. Import de contacts, enrichissement, synchronisation des conversations et automatisation. Comparaison avec Surfe, Kaspr et PhantomBuster."
};

const sections = [
  { id: "probleme", title: "Le probleme" },
  { id: "presentation", title: "Qu'est-ce que Hublead" },
  { id: "installation", title: "Installation et prise en main" },
  { id: "features", title: "Les fonctionnalites cles" },
  { id: "workflow", title: "Hublead en action" },
  { id: "limites", title: "Les limites" },
  { id: "pricing", title: "Prix et plans" },
  { id: "vs", title: "Hublead vs Surfe vs Kaspr" },
  { id: "verdict", title: "Notre verdict" },
  { id: "pour-qui", title: "Pour qui c'est fait" },
];

const relatedArticles = [
  { title: "Emelia : notre test complet de l'outil de cold emailing", slug: "emelia-test-outil-cold-emailing", category: "Process & Outils", color: "#6C5CE7" },
  { title: "Tracker les soumissions de formulaires HubSpot dans GA4", slug: "tracker-soumissions-formulaire-hubspot-google-analytics-google-tag-manager", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Les meilleures pratiques pour vos sequences HubSpot", slug: "meilleures-pratiques-sequences-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function HubleadArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("probleme");

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
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "12%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "35%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "55%", width: 260, height: 260, borderRadius: "50%", background: "#0077B5", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "75%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.07, filter: "blur(70px)" }} />

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
              <span className="text-[#666]">Hublead</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">8 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Hublead : connecter LinkedIn a HubSpot pour ne plus perdre de leads
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Vos commerciaux passent des heures sur LinkedIn sans que les contacts remontent dans HubSpot. Hublead est une extension Chrome qui resout ce probleme en synchronisant profils LinkedIn, conversations et notes directement dans votre CRM. Test complet, fonctionnalites, limites et comparaison avec Surfe, Kaspr et PhantomBuster.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>3 mars 2026</span>
              </div>

              {/* Quick verdict card */}
              <div className="mt-8 rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[13px] font-semibold text-[#111]">Verdict rapide</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[22px] font-bold text-[#4B5EFC]">4.0</span>
                    <span className="text-[12px] text-[#999]">/5</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: "Integration HubSpot", score: "4.5", color: "#22C55E" },
                    { label: "Fonctionnalites", score: "3.8", color: "#4B5EFC" },
                    { label: "Prix", score: "3.5", color: "#FF7A59" },
                    { label: "Enrichissement", score: "3.8", color: "#4B5EFC" },
                    { label: "UX/Interface", score: "4.4", color: "#22C55E" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-[18px] font-bold" style={{ color: s.color }}>{s.score}</div>
                      <div className="text-[10px] text-[#999]">{s.label}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[12px] text-[#777] leading-[1.6]">
                  Hublead est l&apos;extension la plus proprement integree a HubSpot pour importer des contacts LinkedIn. La synchronisation bidirectionnelle, le log des conversations et l&apos;enrichissement des fiches contacts sont ses points forts. Le prix eleve et l&apos;absence de scraping massif sont ses principales limites.
                </p>
              </div>
            </header>

            <article>
              {/* Le probleme */}
              <section id="probleme" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Le probleme : LinkedIn et HubSpot ne se parlent pas</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La situation est la meme dans presque toutes les equipes commerciales B2B. Vos SDR et Account Executives passent 2 a 3 heures par jour sur LinkedIn. Ils identifient des prospects, envoient des messages, recoivent des reponses, prennent des notes mentales sur les echanges. Et rien de tout cela ne remonte dans le CRM.</p>
                    <p>Le resultat est previsible. Les fiches contacts HubSpot sont incompletes. Les managers n&apos;ont aucune visibilite sur l&apos;activite LinkedIn de leurs equipes. Quand un commercial quitte l&apos;entreprise, ses conversations LinkedIn partent avec lui. Et quand deux commerciaux contactent le meme prospect sur LinkedIn sans le savoir, c&apos;est l&apos;image de l&apos;entreprise qui en patit.</p>
                    <p>HubSpot propose bien une integration LinkedIn native, mais elle se limite a l&apos;affichage du profil dans la sidebar. Pas d&apos;import en un clic, pas de synchronisation des messages, pas d&apos;enrichissement automatique. Pour une plateforme qui coute entre 800 et 3 600 euros par mois en licence Sales Hub, c&apos;est un manque flagrant.</p>
                    <p>C&apos;est dans ce contexte que des outils comme Hublead ont emerge. L&apos;objectif est simple : creer un pont entre LinkedIn et HubSpot pour que chaque interaction commerciale soit tracee, centralisee et exploitable.</p>
                    <p>Chez Ceres, on a deploye Hublead sur 3 comptes clients HubSpot avec des equipes de 4 a 12 commerciaux. Voici notre retour apres 2 mois d&apos;utilisation.</p>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { label: "Temps perdu par SDR/jour", value: "45 min", icon: "horloge" },
                      { label: "Contacts non traces", value: "~60%", icon: "perte" },
                      { label: "Visibilite manager", value: "0%", icon: "aveugle" },
                    ].map((m) => (
                      <div key={m.label} className="text-center p-3 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2]">
                        <div className="text-[18px] font-bold text-[#111]">{m.value}</div>
                        <div className="text-[10px] text-[#999] mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Presentation */}
              <section id="presentation" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Qu&apos;est-ce que Hublead</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Hublead est une extension Chrome qui se superpose a l&apos;interface LinkedIn pour ajouter des fonctionnalites de synchronisation avec HubSpot. Concretement, quand vous visitez un profil LinkedIn, Hublead affiche un panneau lateral qui vous permet d&apos;importer le contact dans HubSpot, de voir s&apos;il existe deja dans votre CRM, et de synchroniser les donnees entre les deux plateformes.</p>
                    <p>L&apos;outil a ete cree specifiquement pour HubSpot. Ce n&apos;est pas un connecteur multi-CRM comme Surfe (ex-Leadjet) qui supporte aussi Salesforce et Pipedrive. Cette specialisation est a la fois sa force et sa limite : l&apos;integration HubSpot est plus profonde, mais vous etes verrouille sur un seul CRM.</p>
                    <p>Hublead fonctionne sur LinkedIn classique et LinkedIn Sales Navigator. L&apos;extension injecte ses elements directement dans l&apos;interface LinkedIn, ce qui donne une experience fluide sans avoir a basculer entre plusieurs onglets ou applications.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { label: "Type", value: "Extension Chrome", color: "#4B5EFC" },
                      { label: "CRM supporte", value: "HubSpot uniquement", color: "#FF7A59" },
                      { label: "Compatibilite", value: "LinkedIn + Sales Navigator", color: "#0077B5" },
                      { label: "Equipe", value: "Startup basee en Europe", color: "#22C55E" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#F5F5F5] last:border-0">
                        <span className="text-[12px] text-[#999]">{item.label}</span>
                        <span className="text-[12px] font-medium" style={{ color: item.color }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Installation */}
              <section id="installation" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Installation et prise en main</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;installation de Hublead est rapide et ne demande aucune competence technique. Le processus complet prend moins de 5 minutes.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { step: "1", title: "Installer l'extension Chrome", desc: "Rendez-vous sur le Chrome Web Store et ajoutez Hublead. L'extension pese quelques megaoctets et ne ralentit pas le navigateur de facon perceptible.", delay: "30 sec" },
                      { step: "2", title: "Connecter votre compte HubSpot", desc: "Cliquez sur l'icone Hublead dans la barre Chrome et authentifiez-vous avec vos identifiants HubSpot via OAuth. L'extension demande les permissions de lecture et d'ecriture sur les contacts, entreprises et activites.", delay: "1 min" },
                      { step: "3", title: "Configurer les preferences", desc: "Choisissez les proprietes HubSpot a synchroniser, definissez le comportement par defaut pour les doublons (fusionner, ignorer ou creer nouveau), et configurez le mapping des champs LinkedIn vers HubSpot.", delay: "3 min" },
                      { step: "4", title: "Naviguer sur LinkedIn", desc: "Ouvrez LinkedIn. Le panneau Hublead apparait automatiquement sur chaque profil. Vous pouvez commencer a importer des contacts immediatement.", delay: "Immediat" },
                    ].map((s, i) => (
                      <div key={s.step} className="flex gap-4 items-start">
                        <div className="w-16 shrink-0 text-center">
                          <div className="w-7 h-7 rounded-lg bg-[#4B5EFC] flex items-center justify-center text-white text-[11px] font-bold mx-auto">{s.step}</div>
                          {i < 3 && <div className="w-px h-6 bg-[#E8E8E8] mx-auto mt-1" />}
                        </div>
                        <div className="flex-1 rounded-xl border border-[#F2F2F2] p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[12px] font-semibold text-[#111]">{s.title}</span>
                            <span className="text-[10px] font-medium text-[#4B5EFC]">{s.delay}</span>
                          </div>
                          <p className="text-[11px] text-[#888] leading-[1.6]">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>La prise en main est intuitive. Le panneau lateral sur LinkedIn affiche clairement si le contact existe deja dans HubSpot (avec un lien direct vers sa fiche) ou s&apos;il s&apos;agit d&apos;un nouveau prospect. Les boutons d&apos;action sont bien places et l&apos;experience ne perturbe pas la navigation LinkedIn habituelle.</p>
                    <p>Pour le deploiement en equipe, un administrateur HubSpot peut configurer les parametres par defaut et chaque commercial installe ensuite l&apos;extension sur son poste. Comptez une demi-journee pour deployer Hublead sur une equipe de 10 personnes, formation incluse.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Features */}
              <section id="features" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les fonctionnalites cles</h2>
                  <div className="space-y-5">
                    {[
                      {
                        title: "Import de contacts en un clic",
                        desc: "Depuis n'importe quel profil LinkedIn, un clic suffit pour creer le contact dans HubSpot. Hublead recupere automatiquement le nom, prenom, titre de poste, entreprise, localisation et URL du profil LinkedIn. Si l'entreprise n'existe pas dans HubSpot, elle est creee automatiquement et associee au contact.",
                        detail: "Sur nos tests, le taux de reussite de l'import est de 98%. Les 2% d'echec concernent des profils LinkedIn tres restreints ou le nom est masque. Le mapping des champs est configurable : vous pouvez decider quelle propriete HubSpot correspond a chaque donnee LinkedIn.",
                      },
                      {
                        title: "Enrichissement des fiches contacts",
                        desc: "Au-dela des donnees visibles sur LinkedIn, Hublead enrichit les fiches avec des informations supplementaires : adresse email professionnelle (quand disponible), numero de telephone, taille de l'entreprise, secteur d'activite. L'enrichissement est automatique lors de l'import.",
                        detail: "Le taux de decouverte email est d'environ 55-60%, ce qui est correct mais inferieur a des outils specialises comme Kaspr (70%) ou Apollo (68%). L'enrichissement consomme des credits sur les plans payants.",
                      },
                      {
                        title: "Synchronisation des conversations LinkedIn",
                        desc: "C'est la fonctionnalite qui differencie vraiment Hublead. L'extension synchronise vos messages LinkedIn directement dans la timeline HubSpot du contact. Chaque message envoye ou recu apparait comme une activite dans le CRM, avec la date et le contenu.",
                        detail: "Cette synchronisation est quasi temps reel (delai de quelques minutes). Elle fonctionne pour les messages texte. Les messages vocaux et les InMails sont egalement synchronises. C'est un gain de temps enorme pour les managers qui veulent suivre l'activite de prospection LinkedIn sans demander de reporting manuel.",
                      },
                      {
                        title: "Notes et taches depuis LinkedIn",
                        desc: "Directement depuis le profil LinkedIn d'un prospect, vous pouvez creer des notes HubSpot et planifier des taches de suivi. Plus besoin d'ouvrir HubSpot dans un autre onglet pour logger une information. Le panneau Hublead integre un editeur de notes et un selecteur de date pour les taches.",
                        detail: "Les notes sont rattachees au contact et a l'entreprise dans HubSpot. Vous pouvez aussi assigner des taches a d'autres membres de l'equipe directement depuis LinkedIn, ce qui fluidifie la collaboration.",
                      },
                      {
                        title: "Detection de doublons",
                        desc: "Avant chaque import, Hublead verifie si le contact existe deja dans HubSpot en se basant sur le nom, l'email et l'URL LinkedIn. Si un doublon est detecte, l'extension propose de mettre a jour la fiche existante plutot que de creer un nouveau contact.",
                        detail: "La detection fonctionne bien dans la majorite des cas. On a note quelques faux negatifs quand le contact a change d'entreprise et que son email a ete mis a jour dans HubSpot mais pas sur LinkedIn. Globalement, c'est fiable et evite la multiplication des doublons qui plombe la qualite des donnees CRM.",
                      },
                      {
                        title: "Vue sidebar HubSpot sur LinkedIn",
                        desc: "Pour chaque profil LinkedIn, Hublead affiche un panneau avec les informations HubSpot du contact : proprietaire du contact, derniere activite, deals en cours, score de lead, listes d'appartenance. Vous avez le contexte CRM complet sans quitter LinkedIn.",
                        detail: "Cette vue contextuelle est particulierement utile pour les commerciaux qui recoivent des demandes de connexion. En un coup d'oeil, ils savent si le prospect est deja dans le pipeline, qui le gere, et quel est l'historique des interactions.",
                      },
                    ].map((f) => (
                      <div key={f.title} className="pb-4 border-b border-[#F5F5F5] last:border-0 last:pb-0">
                        <h3 className="text-[14px] font-semibold text-[#111] mb-2">{f.title}</h3>
                        <p className="text-[12px] text-[#666] leading-[1.7] mb-2">{f.desc}</p>
                        <p className="text-[12px] text-[#888] leading-[1.65] italic">{f.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Workflow */}
              <section id="workflow" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Hublead en action : notre workflow quotidien</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Chez Ceres, on a standardise un workflow LinkedIn + HubSpot pour les equipes commerciales de nos clients. Voici comment Hublead s&apos;integre dans le processus quotidien d&apos;un SDR.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { time: "9h00", action: "Recherche Sales Navigator", desc: "Le SDR lance sa recherche Sales Navigator avec ses filtres habituels (titre, secteur, taille d'entreprise, geographie). Il parcourt les resultats et identifie les profils pertinents." },
                      { time: "9h30", action: "Import des prospects via Hublead", desc: "Pour chaque profil interessant, un clic sur le bouton Hublead cree le contact dans HubSpot avec toutes les donnees LinkedIn. Le SDR ajoute une note rapide sur la raison du ciblage." },
                      { time: "10h00", action: "Envoi des demandes de connexion", desc: "Le SDR envoie ses demandes de connexion LinkedIn avec un message personnalise. Hublead log automatiquement l'activite dans HubSpot." },
                      { time: "14h00", action: "Suivi des reponses", desc: "Les reponses aux messages LinkedIn sont synchronisees dans HubSpot. Le SDR peut voir l'ensemble de ses conversations LinkedIn depuis le CRM et prioriser les suivis." },
                      { time: "17h00", action: "Reporting automatique", desc: "Le manager consulte HubSpot pour voir l'activite LinkedIn de l'equipe : nombre de contacts importes, messages envoyes, reponses recues. Plus besoin de demander un reporting manuel." },
                    ].map((w, i) => (
                      <div key={w.time} className="flex gap-4 items-start">
                        <div className="w-14 shrink-0 text-center">
                          <div className="text-[11px] font-bold text-[#4B5EFC]">{w.time}</div>
                          {i < 4 && <div className="w-px h-6 bg-[#E8E8E8] mx-auto mt-1" />}
                        </div>
                        <div className="flex-1 rounded-xl border border-[#F2F2F2] p-3">
                          <span className="text-[12px] font-semibold text-[#111] mb-1 block">{w.action}</span>
                          <p className="text-[11px] text-[#888] leading-[1.6]">{w.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Resultats mesures sur 2 mois</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: "Temps gagne par SDR", value: "35 min/j", color: "#22C55E" },
                        { label: "Contacts traces", value: "95%", color: "#4B5EFC" },
                        { label: "Visibilite manager", value: "100%", color: "#22C55E" },
                        { label: "Doublons evites", value: "~200/mois", color: "#FF7A59" },
                      ].map((r) => (
                        <div key={r.label} className="text-center">
                          <div className="text-[16px] font-bold" style={{ color: r.color }}>{r.value}</div>
                          <div className="text-[10px] text-[#999] mt-1">{r.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Limites */}
              <section id="limites" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les limites qu&apos;on a rencontrees</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Apres 2 mois d&apos;utilisation sur 3 comptes clients, voici les points de friction identifies :</p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      {
                        title: "Pas de scraping en masse",
                        desc: "Hublead fonctionne profil par profil. Impossible d'importer une liste de 500 prospects en une fois depuis une recherche Sales Navigator. Pour du volume, il faut combiner avec PhantomBuster ou Captain Data. C'est une limitation importante pour les equipes qui font de la prospection a grande echelle.",
                      },
                      {
                        title: "Prix eleve pour les grandes equipes",
                        desc: "Le pricing est par utilisateur et par mois. A 30-50 euros par siege, une equipe de 10 commerciaux represente 300 a 500 euros par mois. C'est significatif, surtout quand on ajoute le cout de HubSpot Sales Hub et de Sales Navigator.",
                      },
                      {
                        title: "Enrichissement email limite",
                        desc: "Le taux de decouverte des emails professionnels (55-60%) est inferieur a celui des outils specialises. Si l'enrichissement email est votre priorite, des outils comme Kaspr, Lusha ou Apollo seront plus performants.",
                      },
                      {
                        title: "Dependance au navigateur Chrome",
                        desc: "L'outil ne fonctionne que sur Chrome. Les utilisateurs de Firefox, Safari ou Edge ne peuvent pas l'utiliser. De plus, si LinkedIn modifie sa structure HTML (ce qui arrive regulierement), l'extension peut temporairement dysfonctionner.",
                      },
                      {
                        title: "Pas d'automatisation avancee",
                        desc: "Hublead ne permet pas d'automatiser les actions LinkedIn (envoi de connexions, messages automatiques, sequences). C'est un outil de synchronisation, pas d'automatisation. Pour des sequences LinkedIn automatisees, il faut se tourner vers Waalaxy, Expandi ou La Growth Machine.",
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

              {/* Pricing */}
              <section id="pricing" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Prix et plans</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Hublead propose un modele de tarification par utilisateur et par mois. Le plan gratuit existe mais reste tres limite. Voici les plans au moment de notre test (mars 2026) :</p>
                  </div>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: "Free", price: "0", features: ["1 utilisateur", "5 imports/mois", "Sync manuelle", "Vue profil basique", "Pas d'enrichissement"], highlight: false },
                      { name: "Pro", price: "39", features: ["Par utilisateur", "Imports illimites", "Sync conversations", "Enrichissement email", "Notes et taches", "Detection doublons"], highlight: true },
                      { name: "Team", price: "59", features: ["Par utilisateur", "Tout Pro +", "Dashboard equipe", "Parametres admin", "Support prioritaire", "API access"], highlight: false },
                    ].map((p) => (
                      <div key={p.name} className={`rounded-xl border p-4 ${p.highlight ? "border-[#4B5EFC] bg-[#4B5EFC]/[0.02]" : "border-[#F2F2F2]"}`}>
                        <div className="text-[13px] font-semibold text-[#111] mb-1">{p.name}</div>
                        <div className="flex items-baseline gap-1 mb-3">
                          <span className="text-[24px] font-bold text-[#4B5EFC]">{p.price}&#8364;</span>
                          <span className="text-[11px] text-[#999]">/mois</span>
                        </div>
                        <div className="space-y-1.5">
                          {p.features.map((f) => (
                            <p key={f} className="text-[11px] text-[#777] flex items-center gap-2">
                              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#22C55E] shrink-0"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              {f}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Pour une equipe de 5 commerciaux sur le plan Pro, le budget mensuel est de 195 euros. Sur le plan Team, c&apos;est 295 euros. A cela s&apos;ajoutent les credits d&apos;enrichissement si vous depassez le quota inclus dans votre plan.</p>
                    <p>Le plan gratuit est utile pour tester l&apos;outil, mais les 5 imports par mois le rendent inutilisable en production. On recommande de demarrer directement sur le plan Pro pour evaluer correctement les fonctionnalites.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Comparison */}
              <section id="vs" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Hublead vs Surfe vs Kaspr vs PhantomBuster</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-5">
                    <p>Ces 4 outils adressent le meme probleme (connecter LinkedIn a un CRM) mais avec des approches differentes. Voici notre comparatif base sur une utilisation reelle de chacun.</p>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="min-w-[500px]">
                      <div className="grid grid-cols-5 gap-2 pb-3 border-b border-[#E8E8E8]">
                        <span className="text-[10px] font-semibold text-[#999]">Critere</span>
                        <div className="flex items-center justify-center gap-1.5">
                          <img src="https://www.google.com/s2/favicons?domain=hublead.io&sz=32" alt="Hublead" className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-semibold text-[#4B5EFC]">Hublead</span>
                        </div>
                        <div className="flex items-center justify-center gap-1.5">
                          <img src="https://www.google.com/s2/favicons?domain=surfe.com&sz=32" alt="Surfe" className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-semibold text-[#999]">Surfe</span>
                        </div>
                        <div className="flex items-center justify-center gap-1.5">
                          <img src="https://www.google.com/s2/favicons?domain=kaspr.io&sz=32" alt="Kaspr" className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-semibold text-[#999]">Kaspr</span>
                        </div>
                        <div className="flex items-center justify-center gap-1.5">
                          <img src="https://www.google.com/s2/favicons?domain=phantombuster.com&sz=32" alt="PhantomBuster" className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-semibold text-[#999]">Phantom.</span>
                        </div>
                      </div>
                      {[
                        { label: "Prix (entree)", hublead: "39 eur/mois", surfe: "29 eur/mois", kaspr: "49 eur/mois", phantom: "69 eur/mois" },
                        { label: "CRM supportes", hublead: "HubSpot", surfe: "HubSpot, SF, Pipe.", kaspr: "HubSpot, SF, Pipe.", phantom: "Via integration" },
                        { label: "Import contacts", hublead: "1 par 1", surfe: "1 par 1", kaspr: "1 par 1 + listes", phantom: "En masse" },
                        { label: "Enrichissement email", hublead: "Correct (55-60%)", surfe: "Bon (60-65%)", kaspr: "Excellent (70%)", phantom: "Via API tierce" },
                        { label: "Sync conversations", hublead: "Oui (natif)", surfe: "Oui (natif)", kaspr: "Non", phantom: "Non" },
                        { label: "Notes/taches CRM", hublead: "Oui", surfe: "Oui", kaspr: "Non", phantom: "Non" },
                        { label: "Scraping en masse", hublead: "Non", surfe: "Non", kaspr: "Oui (listes)", phantom: "Oui (illimite)" },
                        { label: "Automatisation LinkedIn", hublead: "Non", surfe: "Non", kaspr: "Non", phantom: "Oui" },
                        { label: "Detection doublons", hublead: "Oui", surfe: "Oui", kaspr: "Basique", phantom: "Non" },
                        { label: "Profondeur integ. HubSpot", hublead: "Excellente", surfe: "Bonne", kaspr: "Correcte", phantom: "Basique" },
                      ].map((row) => (
                        <div key={row.label} className="grid grid-cols-5 gap-2 py-2 border-b border-[#F5F5F5]">
                          <span className="text-[11px] font-medium text-[#111]">{row.label}</span>
                          <span className="text-[11px] text-[#4B5EFC] font-medium text-center">{row.hublead}</span>
                          <span className="text-[11px] text-[#999] text-center">{row.surfe}</span>
                          <span className="text-[11px] text-[#999] text-center">{row.kaspr}</span>
                          <span className="text-[11px] text-[#999] text-center">{row.phantom}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Hublead</strong> est le meilleur choix si vous etes 100% HubSpot et que la synchronisation des conversations LinkedIn est prioritaire. L&apos;integration est la plus profonde du marche pour ce CRM.</p>
                    <p><strong className="text-[#111]">Surfe</strong> (ex-Leadjet) est l&apos;alternative polyvalente. Il supporte HubSpot, Salesforce et Pipedrive avec une bonne qualite d&apos;integration sur chaque CRM. C&apos;est le choix par defaut si vous n&apos;etes pas certain de rester sur HubSpot a long terme.</p>
                    <p><strong className="text-[#111]">Kaspr</strong> est le meilleur pour l&apos;enrichissement. Si votre objectif principal est de trouver les emails et numeros de telephone de vos prospects LinkedIn, Kaspr a le meilleur taux de decouverte. L&apos;integration CRM existe mais reste secondaire.</p>
                    <p><strong className="text-[#111]">PhantomBuster</strong> est l&apos;outil de scraping et d&apos;automatisation. Il ne se positionne pas comme un connecteur CRM mais comme une plateforme d&apos;extraction de donnees. Ideal pour du volume, mais necessite des competences techniques et un pipeline d&apos;integration a construire soi-meme.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Verdict */}
              <section id="verdict" className="mb-8">
                <div className="rounded-2xl bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Verdict</span>
                  <h2 className="text-[20px] font-semibold text-white mb-4">Notre avis final apres 2 mois</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Hublead resout un vrai probleme que HubSpot ne traite pas nativement : la synchronisation entre LinkedIn et le CRM. L&apos;extension fait bien ce qu&apos;elle promet. L&apos;import de contacts est fiable, la synchronisation des conversations est un vrai differenciateur, et l&apos;experience utilisateur sur LinkedIn est fluide.</p>
                    <p>Pour les equipes commerciales qui utilisent HubSpot et LinkedIn quotidiennement, le gain de temps est reel et mesurable. On a constate 35 minutes gagnees par SDR par jour, ce qui represente environ 12 heures par mois. A l&apos;echelle d&apos;une equipe de 8 commerciaux, c&apos;est pres de 100 heures de travail manuel economisees chaque mois.</p>
                    <p>Le principal frein reste le prix. A 39 euros par utilisateur par mois, le budget monte vite. Et l&apos;absence de scraping en masse oblige a conserver un outil complementaire (PhantomBuster, Captain Data) pour les campagnes de prospection a grand volume.</p>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[12px] font-semibold text-[#22C55E] mb-3">On a aime</p>
                      {[
                        "Integration HubSpot la plus profonde du marche",
                        "Sync des conversations LinkedIn en temps reel",
                        "Detection de doublons fiable",
                        "Notes et taches depuis LinkedIn",
                        "Vue sidebar HubSpot tres pratique",
                        "Installation et deploiement rapides",
                        "Interface propre et intuitive",
                      ].map((p) => (
                        <div key={p} className="flex items-center gap-2 text-[11px] text-white/50 mb-2">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#22C55E] shrink-0"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>{p}
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-[#EF4444] mb-3">A ameliorer</p>
                      {[
                        "Prix eleve pour les grandes equipes",
                        "Pas de scraping en masse",
                        "Enrichissement email moyen (55-60%)",
                        "HubSpot uniquement (pas de multi-CRM)",
                        "Pas d'automatisation LinkedIn",
                        "Dependance a Chrome exclusivement",
                      ].map((p) => (
                        <div key={p} className="flex items-center gap-2 text-[11px] text-white/50 mb-2">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#EF4444] shrink-0"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>{p}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Pour qui */}
              <section id="pour-qui" className="mb-8">
                <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pour qui Hublead est fait</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl bg-[#F0FDF4] p-4">
                      <p className="text-[12px] font-semibold text-[#22C55E] mb-3">Ideal pour</p>
                      {[
                        "Equipes commerciales B2B sur HubSpot",
                        "SDR et AE qui prospectent activement sur LinkedIn",
                        "Managers qui veulent tracer l'activite LinkedIn",
                        "Equipes de 2 a 15 commerciaux",
                        "Entreprises qui veulent un CRM LinkedIn propre",
                        "Organisations qui utilisent Sales Navigator",
                      ].map((i) => (
                        <p key={i} className="text-[11px] text-[#555] mb-2 flex items-start gap-2"><span className="text-[#22C55E] mt-0.5 shrink-0">+</span>{i}</p>
                      ))}
                    </div>
                    <div className="rounded-xl bg-[#FEF2F2] p-4">
                      <p className="text-[12px] font-semibold text-[#EF4444] mb-3">Pas adapte si</p>
                      {[
                        "Vous utilisez Salesforce ou Pipedrive",
                        "Vous avez besoin de scraping en masse",
                        "Votre priorite est l'enrichissement email",
                        "Vous cherchez de l'automatisation LinkedIn",
                        "Votre budget outbound est tres serre",
                        "Vous n'utilisez pas Chrome comme navigateur",
                      ].map((i) => (
                        <p key={i} className="text-[11px] text-[#555] mb-2 flex items-start gap-2"><span className="text-[#EF4444] mt-0.5 shrink-0">-</span>{i}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Notre recommandation</p>
                    <p className="text-[12px] text-[#777] leading-[1.65]">Si vous etes sur HubSpot et que vos commerciaux passent du temps sur LinkedIn, Hublead merite d&apos;etre teste. Le plan Pro a 39 euros par mois par utilisateur permet de valider rapidement la valeur ajoutee. Pour les equipes qui font de la prospection a grand volume, combinez Hublead (pour la synchronisation CRM) avec PhantomBuster ou Captain Data (pour le scraping en masse). Et si l&apos;enrichissement email est critique, ajoutez Kaspr ou DropContact dans votre stack.</p>
                  </div>
                </div>
              </section>
            </article>

            {/* Related articles */}
            <section className="mt-12 mb-8">
              <p className="text-[13px] font-semibold text-[#111] mb-4">Articles similaires</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedArticles.map((a) => (
                  <Link key={a.slug} href={`/blog/${a.slug}`} className="rounded-xl border border-[#F2F2F2] p-4 hover:border-[#DDD] transition-colors group">
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
              <div className="rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin de connecter LinkedIn a votre CRM HubSpot ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[450px] mx-auto">On configure et optimise votre stack de prospection LinkedIn + HubSpot. Hublead, Surfe, PhantomBuster, workflows et automatisations. Setup complet en moins de 2 semaines.</p>
                <div className="flex items-center justify-center gap-3">
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel
                  </a>
                  <Link href="/agence-hubspot" className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-[#E5E5E5] bg-white text-[#111] text-[13px] font-medium hover:border-[#CCC] transition-colors">
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
