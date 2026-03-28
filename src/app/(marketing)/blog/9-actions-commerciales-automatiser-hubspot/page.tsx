"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "9 actions commerciales a automatiser avec HubSpot",
  description: "Decouvrez 9 taches commerciales repetitives que vous pouvez automatiser des aujourd&apos;hui dans HubSpot. Gain de temps estime : plus de 12 heures par semaine.",
  author: { "@type": "Person", name: "Guillaume Delachet" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  datePublished: "2026-02-20",
  dateModified: "2026-02-20",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/9-actions-commerciales-automatiser-hubspot" },
  articleSection: "CRM & HubSpot",
  wordCount: 2200,
  timeRequired: "PT12M",
};

const actions = [
  {
    num: "01",
    title: "Attribution automatique des leads (round-robin)",
    timeSaved: "2h / semaine",
    problem: "Chaque nouveau lead qui arrive dans HubSpot doit etre attribue manuellement a un commercial. Le responsable commercial passe en revue chaque contact, verifie la disponibilite de l&apos;equipe, et assigne un a un. Resultat : des leads qui attendent parfois plusieurs heures avant d&apos;etre contactes, une repartition desequilibree entre les commerciaux, et un temps precieux perdu sur une tache purement administrative.",
    solution: "HubSpot permet de creer un workflow d&apos;attribution automatique base sur la rotation (round-robin). Des qu&apos;un lead est cree ou qu&apos;il atteint un certain score, il est automatiquement assigne au prochain commercial disponible dans la rotation.",
    setup: "1. Allez dans Automatisation > Workflows\n2. Creez un workflow base sur les contacts\n3. Definissez le declencheur : creation de contact OU lead score superieur a X\n4. Ajoutez l&apos;action \"Faire tourner le proprietaire du contact\"\n5. Selectionnez les membres de l&apos;equipe commerciale a inclure\n6. Activez le workflow",
  },
  {
    num: "02",
    title: "Creation de taches de suivi apres un call",
    timeSaved: "1h / semaine",
    problem: "Apres chaque appel commercial, le representant doit creer manuellement une tache de suivi dans le CRM. Entre deux appels, cette etape est souvent oubliee ou repoussee. Les relances tombent dans l&apos;oubli, les opportunites refroidissent, et la qualite du suivi commercial chute.",
    solution: "Un workflow HubSpot peut detecter automatiquement la fin d&apos;un appel enregistre et creer une tache de suivi avec une echeance definie. Le commercial retrouve sa tache dans sa file d&apos;attente sans avoir a y penser.",
    setup: "1. Creez un workflow base sur les appels (Call outcome = Connected)\n2. Ajoutez l&apos;action \"Creer une tache\"\n3. Configurez le titre : \"Suivi post-appel — [Nom du contact]\"\n4. Definissez l&apos;echeance a J+2 (ou J+3 selon votre cycle)\n5. Assignez la tache au proprietaire du contact\n6. Ajoutez une priorite haute si le deal est superieur a un certain montant",
  },
  {
    num: "03",
    title: "Mise a jour du stage de deal apres une action",
    timeSaved: "45min / semaine",
    problem: "Les commerciaux oublient regulierement de mettre a jour le stage de leurs deals dans le pipeline. Un devis a ete envoye mais le deal est toujours en \"Qualification\". Une demo a ete faite mais le deal reste en \"Prise de contact\". Le pipeline devient imprecis, le forecast est fausse, et le management navigue a vue.",
    solution: "HubSpot peut automatiquement faire avancer un deal dans le pipeline quand certaines conditions sont remplies : un document a ete envoye, un meeting a ete programme, un devis a ete cree. L&apos;integrite des donnees du pipeline est preservee sans effort manuel.",
    setup: "1. Creez un workflow base sur les deals\n2. Declencheur : un devis est associe au deal (ou un meeting est enregistre)\n3. Action : mettre a jour la propriete \"Deal Stage\"\n4. Selectionnez le stage cible (ex: \"Proposition envoyee\")\n5. Ajoutez des branches si necessaire pour gerer plusieurs transitions\n6. Testez avec un deal existant avant d&apos;activer",
  },
  {
    num: "04",
    title: "Envoi d&apos;un email de confirmation apres RDV",
    timeSaved: "30min / semaine",
    problem: "Apres chaque prise de rendez-vous, le commercial doit envoyer un email de confirmation avec le recap, le lien visio et les documents prepares. C&apos;est une tache repetitive qui prend 3 a 5 minutes par RDV. Multipliez par 10 rendez-vous par semaine et vous avez presque une heure perdue.",
    solution: "Un workflow declenche par la creation d&apos;un meeting dans HubSpot peut envoyer automatiquement un email de confirmation personnalise au contact. L&apos;email contient les tokens de personnalisation (nom, date, lien meeting) et peut inclure des documents pertinents.",
    setup: "1. Creez un workflow base sur les meetings\n2. Declencheur : un meeting est cree\n3. Action : envoyer un email automatise\n4. Redigez le template avec les tokens : {{contact.firstname}}, {{meeting.start_date}}\n5. Incluez le lien de la visio et les documents utiles\n6. Ajoutez un delai de 5 minutes pour eviter les envois si annulation immediate",
  },
  {
    num: "05",
    title: "Notification Slack quand un deal change de stage",
    timeSaved: "20min / semaine",
    problem: "Le manager commercial doit constamment surveiller le pipeline pour savoir quand un deal avance ou recule. Il ouvre HubSpot plusieurs fois par jour, filtre par stage, compare avec la veille. Les commerciaux, eux, doivent parfois envoyer un message Slack manuellement pour informer l&apos;equipe qu&apos;un deal a progresse.",
    solution: "L&apos;integration native HubSpot x Slack permet d&apos;envoyer une notification dans un canal dedie a chaque changement de stage. L&apos;equipe est informee en temps reel sans quitter Slack.",
    setup: "1. Connectez Slack a HubSpot via le Marketplace\n2. Creez un workflow base sur les deals\n3. Declencheur : la propriete \"Deal Stage\" change\n4. Action : envoyer une notification Slack\n5. Selectionnez le canal (ex: #pipeline-updates)\n6. Personnalisez le message : nom du deal, nouveau stage, montant, proprietaire",
  },
  {
    num: "06",
    title: "Enrichissement automatique des contacts (via API)",
    timeSaved: "3h / semaine",
    problem: "Quand un nouveau lead arrive avec juste un email et un nom, le commercial doit aller chercher manuellement les informations manquantes : entreprise, poste, taille de l&apos;equipe, secteur d&apos;activite, LinkedIn. Cette recherche prend 5 a 10 minutes par contact. Avec 20 nouveaux leads par semaine, c&apos;est un gouffre de temps.",
    solution: "En connectant HubSpot a un outil d&apos;enrichissement (Clearbit, Apollo, ou une API custom via Operations Hub), chaque nouveau contact est automatiquement enrichi avec les donnees firmographiques disponibles. Le commercial recoit un contact complet, pret a etre qualifie.",
    setup: "1. Choisissez votre source d&apos;enrichissement (Clearbit, Apollo, FullContact)\n2. Si vous avez Operations Hub Pro : utilisez les Actions de code custom\n3. Creez un workflow declenche par la creation d&apos;un contact\n4. Ajoutez l&apos;action de code custom qui appelle l&apos;API d&apos;enrichissement\n5. Mappez les champs retournes vers les proprietes HubSpot (poste, secteur, taille)\n6. Ajoutez une condition : ne pas ecraser les donnees existantes",
  },
  {
    num: "07",
    title: "Relance automatique des devis non signes",
    timeSaved: "1h30 / semaine",
    problem: "Un devis a ete envoye il y a 5 jours et le prospect n&apos;a pas repondu. Le commercial doit se souvenir de relancer, retrouver le devis, rediger un email de suivi. Certains devis tombent dans l&apos;oubli. A l&apos;echelle de l&apos;equipe, ce sont des dizaines de milliers d&apos;euros de revenus potentiels qui s&apos;evaporent chaque mois.",
    solution: "Un workflow peut detecter les devis en attente depuis X jours et envoyer automatiquement une sequence de relance au prospect. Si le devis est signe entre-temps, le workflow s&apos;arrete automatiquement.",
    setup: "1. Creez un workflow base sur les deals\n2. Declencheur : un devis existe ET le statut du devis est \"En attente\" depuis plus de 5 jours\n3. Action 1 : envoyer un email de relance personnalise\n4. Ajoutez un delai de 3 jours\n5. Condition : si le devis est toujours en attente, envoyer un second email\n6. Action finale : creer une tache pour un appel de relance si toujours pas signe apres 10 jours",
  },
  {
    num: "08",
    title: "Scoring automatique des leads",
    timeSaved: "2h / semaine",
    problem: "Sans lead scoring, tous les leads sont traites de la meme maniere. Le commercial passe autant de temps sur un etudiant qui a telecharge un livre blanc que sur un directeur commercial d&apos;une entreprise de 200 personnes qui a demande une demo. La priorisation se fait au feeling, et les meilleurs leads ne sont pas toujours traites en premier.",
    solution: "HubSpot propose un systeme de scoring natif (ou predictif avec l&apos;edition Enterprise). Vous definissez des criteres positifs (poste de decision, taille d&apos;entreprise, pages visitees) et negatifs (email personnel, secteur hors cible) qui calculent automatiquement un score pour chaque lead.",
    setup: "1. Allez dans Settings > Proprietes > HubSpot Score\n2. Definissez les criteres positifs :\n   — Poste contient \"Directeur\" ou \"VP\" : +15 points\n   — Taille entreprise > 50 : +10 points\n   — A visite la page pricing : +20 points\n   — A demande une demo : +25 points\n3. Definissez les criteres negatifs :\n   — Email personnel (gmail, hotmail) : -10 points\n   — Etudiant/stagiaire : -20 points\n4. Creez un workflow qui notifie l&apos;equipe quand un lead depasse 50 points\n5. Ajoutez une vue filtree dans les contacts pour voir les leads chauds en priorite",
  },
  {
    num: "09",
    title: "Reporting hebdomadaire automatise",
    timeSaved: "1h / semaine",
    problem: "Chaque lundi matin, le responsable commercial passe une heure a compiler les chiffres de la semaine precedente : nombre de deals crees, deals gagnes, valeur du pipeline, taux de conversion par stage. Il exporte des CSV, les met en forme dans un Google Sheet, et envoie un email a la direction. C&apos;est une heure de travail repetitif qui pourrait etre eliminee.",
    solution: "HubSpot permet de creer des tableaux de bord personnalises et de programmer l&apos;envoi automatique par email a une frequence definie. Le rapport arrive dans les boites mail chaque lundi a 8h, avec les donnees a jour, sans intervention humaine.",
    setup: "1. Creez un tableau de bord dans HubSpot avec les KPIs cles :\n   — Deals crees cette semaine\n   — Deals gagnes et revenus\n   — Pipeline par stage\n   — Activites par commercial\n2. Cliquez sur \"Actions\" > \"Programmer un email recurrent\"\n3. Selectionnez la frequence : hebdomadaire, le lundi a 8h\n4. Ajoutez les destinataires (direction, managers)\n5. Personnalisez l&apos;objet de l&apos;email\n6. Activez l&apos;envoi",
  },
];

const relatedArticles = [
  { title: "Marketing Automation : 7 workflows HubSpot indispensables", slug: "marketing-automation-7-workflows-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Meilleures pratiques pour les sequences HubSpot", slug: "meilleures-pratiques-sequences-hubspot", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Gerer son MRR et revenu recurrent dans HubSpot", slug: "gerer-mrr-revenu-recurrent-hubspot", category: "Data", color: "#22C55E" },
];

export default function BlogPostPage() {
  const [progress, setProgress] = useState(0);
  const [activeAction, setActiveAction] = useState("01");

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, pct));

      for (let i = actions.length - 1; i >= 0; i--) {
        const el = document.getElementById(`action-${actions[i].num}`);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveAction(actions[i].num);
          break;
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 h-[3px] bg-[#F2F2F2]">
        <div className="h-full bg-[#4B5EFC] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "8%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "30%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "55%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "78%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.07, filter: "blur(70px)" }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="flex gap-10">
          {/* Sticky TOC -- desktop */}
          <aside className="hidden lg:block w-[200px] shrink-0">
            <div className="sticky top-28">
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Les 9 actions</p>
              <nav className="space-y-1">
                {actions.map((a) => (
                  <a key={a.num} href={`#action-${a.num}`}
                    className={"block text-[11px] py-1.5 pl-3 border-l-2 transition-all " +
                      (activeAction === a.num ? "border-[#4B5EFC] text-[#111] font-medium" : "border-transparent text-[#999] hover:text-[#666]")}>
                    {a.num}. {a.title.split(" ").slice(0, 3).join(" ")}...
                  </a>
                ))}
                <a href="#total" className={"block text-[11px] py-1.5 pl-3 border-l-2 transition-all border-transparent text-[#999] hover:text-[#666]"}>
                  Bilan total
                </a>
              </nav>
              {/* Share */}
              <div className="mt-8 pt-6 border-t border-[#F2F2F2]">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Partager</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors cursor-pointer">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.04a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L5.25 9.068" /></svg>
                  </button>
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

          {/* Article content */}
          <div className="flex-1 min-w-0 max-w-[700px]">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-[12px] text-[#999]">
              <Link href="/" className="hover:text-[#111] transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#111] transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-[#666]">9 actions commerciales a automatiser</span>
            </nav>

            {/* Hero */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">12 min</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                9 actions commerciales a automatiser avec HubSpot
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Vos commerciaux passent en moyenne 12 heures par semaine sur des taches repetitives qui n&apos;ont rien a voir avec la vente. Attribution des leads, mises a jour du CRM, relances manuelles, reporting... Autant de temps qui pourrait etre consacre a closer des deals. Voici les 9 actions que vous pouvez automatiser des aujourd&apos;hui dans HubSpot, avec le detail du setup et le gain de temps concret pour chacune.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                <span>20 fev 2026</span>
              </div>
            </header>

            {/* Intro section */}
            <section className="mb-10">
              <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi automatiser vos actions commerciales ?</h2>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Selon une etude de HubSpot, les commerciaux ne passent que 33% de leur temps a vendre. Le reste est consomme par des taches administratives : saisie de donnees, mise a jour du CRM, creation de rapports, envoi d&apos;emails de routine.
                </p>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  L&apos;automatisation ne remplace pas le commercial. Elle lui rend le temps necessaire pour faire ce qu&apos;il fait le mieux : construire des relations, comprendre les besoins, et conclure des affaires.
                </p>
                <p className="text-[13px] text-[#555] leading-[1.75]">
                  Dans cet article, nous detaillons 9 automatisations concretes et immediatement actionnables dans HubSpot. Pour chacune : le probleme, la solution, le setup pas a pas, et le temps gagne chaque semaine.
                </p>
              </div>
              <Connector />
            </section>

            {/* Bubble summary cards */}
            <section className="mb-10">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-[#F7F7FF] border border-[#E8E8F4] p-4 text-center">
                  <p className="text-[24px] font-bold text-[#4B5EFC]">9</p>
                  <p className="text-[11px] text-[#666] mt-1">actions a automatiser</p>
                </div>
                <div className="rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] p-4 text-center">
                  <p className="text-[24px] font-bold text-[#22C55E]">12h+</p>
                  <p className="text-[11px] text-[#666] mt-1">gagnees / semaine</p>
                </div>
                <div className="rounded-lg bg-[#FFF7ED] border border-[#FFEDD5] p-4 text-center">
                  <p className="text-[24px] font-bold text-[#F97316]">0</p>
                  <p className="text-[11px] text-[#666] mt-1">code requis</p>
                </div>
              </div>
              <Connector />
            </section>

            {/* Action cards */}
            <article>
              {actions.map((action, i) => (
                <section key={action.num} id={`action-${action.num}`} className="mb-8">
                  <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                    {/* Header with number and time saved */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#4B5EFC] text-white text-[14px] font-bold">{action.num}</span>
                        <h2 className="text-[17px] font-semibold text-[#111] leading-tight max-w-[400px]">{action.title}</h2>
                      </div>
                      <span className="shrink-0 ml-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        <span className="text-[11px] font-semibold text-[#22C55E]">{action.timeSaved}</span>
                      </span>
                    </div>

                    {/* Le probleme */}
                    <div className="mb-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FEF2F2] text-[11px] font-medium text-[#DC2626] mb-3">Le probleme</span>
                      <p className="text-[13px] text-[#555] leading-[1.75]">{action.problem}</p>
                    </div>

                    {/* La solution */}
                    <div className="mb-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F0FDF4] text-[11px] font-medium text-[#16A34A] mb-3">La solution HubSpot</span>
                      <p className="text-[13px] text-[#555] leading-[1.75]">{action.solution}</p>
                    </div>

                    {/* Le setup */}
                    <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#EEF2FF] text-[11px] font-medium text-[#4B5EFC] mb-3">Setup pas a pas</span>
                      <div className="space-y-2">
                        {action.setup.split("\n").map((line, li) => {
                          const indent = line.startsWith("   ") ? "ml-4" : "";
                          return (
                            <div key={li} className={`flex items-start gap-2 ${indent}`}>
                              {!line.startsWith("   ") && (
                                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-1 text-[#4B5EFC]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              )}
                              <p className="text-[12px] text-[#555] leading-[1.7]">{line.replace(/^\d+\.\s*/, "").replace(/^—\s*/, "")}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {i < actions.length - 1 && <Connector />}
                </section>
              ))}
            </article>

            {/* Total time saved -- dark section */}
            <section id="total" className="mb-8">
              <Connector />
              <div className="rounded-lg bg-[#111] p-5 md:p-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Bilan</span>
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-white mb-6">Temps total recupere chaque semaine</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {actions.map((a) => (
                    <div key={a.num} className="rounded-lg bg-white/5 border border-white/10 p-3">
                      <p className="text-[11px] text-white/40 mb-1">{a.num}. {a.title.split(" ").slice(0, 3).join(" ")}</p>
                      <p className="text-[16px] font-bold text-[#22C55E]">{a.timeSaved}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20 p-5 text-center">
                  <p className="text-[11px] text-[#22C55E]/60 uppercase tracking-wider mb-2">Total estime</p>
                  <p className="text-[36px] font-bold text-[#22C55E]">12h 05min</p>
                  <p className="text-[13px] text-white/40 mt-2">par semaine, soit plus de <strong className="text-white/70">625 heures par an</strong> pour votre equipe commerciale</p>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-[13px] text-white/50 leading-[1.75]">
                    Ces 12 heures ne sont pas une estimation theorique. Elles sont basees sur les retours de nos clients apres implementation. Certaines equipes gagnent encore plus, selon la taille de l&apos;equipe et le volume de leads traites.
                  </p>
                  <p className="text-[13px] text-white/50 leading-[1.75]">
                    Le plus important n&apos;est pas le temps gagne en soi, mais ce que vos commerciaux font de ce temps retrouve : plus d&apos;appels de decouverte, plus de demos, plus de deals closes.
                  </p>
                </div>
              </div>
            </section>

            {/* Priority section */}
            <section className="mb-8">
              <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[17px] font-semibold text-[#111] mb-4">Par ou commencer ?</h2>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-4">
                  Vous n&apos;avez pas besoin d&apos;implementer les 9 automatisations en une seule fois. Voici notre recommandation pour commencer :
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#DC2626] text-white text-[10px] font-bold">1</span>
                    <div>
                      <p className="text-[13px] font-medium text-[#111]">Attribution des leads + Lead scoring</p>
                      <p className="text-[12px] text-[#999]">Impact immediat sur la vitesse de traitement et la priorisation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#F97316] text-white text-[10px] font-bold">2</span>
                    <div>
                      <p className="text-[13px] font-medium text-[#111]">Relance des devis + Taches de suivi</p>
                      <p className="text-[12px] text-[#999]">Previent la perte de deals par oubli de relance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#4B5EFC] text-white text-[10px] font-bold">3</span>
                    <div>
                      <p className="text-[13px] font-medium text-[#111]">Mise a jour des stages + Notifications Slack</p>
                      <p className="text-[12px] text-[#999]">Ameliore la qualite des donnees et la visibilite pipeline</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#22C55E] text-white text-[10px] font-bold">4</span>
                    <div>
                      <p className="text-[13px] font-medium text-[#111]">Enrichissement + Emails de confirmation + Reporting</p>
                      <p className="text-[12px] text-[#999]">Optimisation avancee une fois les bases en place</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Dark pro tip */}
            <section className="mb-8">
              <div className="rounded-lg bg-[#111] p-5 md:p-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Aller plus loin</span>
                <h2 className="text-[17px] font-semibold text-white mb-3">Avec Ceres, on automatise et on mesure</h2>
                <p className="text-[13px] text-white/40 leading-[1.75] mb-4">
                  Ces 9 automatisations sont un point de depart. Notre equipe configure, optimise et monitore vos workflows HubSpot pour s&apos;assurer qu&apos;ils produisent les resultats attendus.
                </p>
                <div className="space-y-2.5">
                  {[
                    "Audit complet de votre CRM et identification des automatisations prioritaires",
                    "Configuration et test de chaque workflow dans votre environnement HubSpot",
                    "Tableau de bord de suivi pour mesurer le temps gagne et l&apos;impact sur le pipeline",
                    "Accompagnement continu et ajustements trimestriels",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-[12px] text-white/50">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Related articles */}
            <section className="mb-8">
              <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-7 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[14px] font-semibold text-[#111] mb-4">Articles lies</h2>
                <div className="space-y-2">
                  {relatedArticles.map((a) => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FAFAFA] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: a.color }} />
                        <span className="text-[13px] font-medium text-[#111] group-hover:text-[#444] transition-colors">{a.title}</span>
                      </div>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[#DDD] group-hover:text-[#999] group-hover:translate-x-0.5 transition-all"><path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section>
              <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Pret a automatiser vos actions commerciales ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On configure vos 9 automatisations HubSpot en moins de 2 semaines. Resultat garanti sur le temps gagne.</p>
                <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                  <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
