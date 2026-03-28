"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "RevOps : 10 quick wins a implementer en 30 jours",
  description: "10 actions concretes a mettre en place en moins de 30 jours pour structurer vos operations commerciales. Matrice effort/impact, setup pas a pas et resultats mesurables.",
  author: { "@type": "Person", name: "Guillaume Delachet" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  datePublished: "2026-03-16",
  dateModified: "2026-03-16",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/revops-10-quick-wins-30-jours" },
  articleSection: "RevOps",
  wordCount: 2800,
  timeRequired: "PT14M",
};

const wins = [
  {
    num: "01",
    title: "Nettoyer les doublons CRM",
    setupTime: "2h",
    impact: "-30% confusion",
    effort: "moyen",
    impactLevel: "fort",
    quadrant: "top-right" as const,
    problem: "Votre CRM contient des dizaines, parfois des centaines de fiches en double. Un meme prospect existe sous trois orthographes differentes, avec des informations reparties entre chaque fiche. Vos commerciaux perdent du temps a chercher la bonne fiche, envoient des emails en double, et vos rapports sont fausses. Le pipeline affiche un montant gonfle artificiellement parce que le meme deal apparait deux fois. La direction prend des decisions basees sur des donnees qui ne refletent pas la realite.",
    solution: "Lancez un audit de deduplication systematique de votre CRM. HubSpot propose un outil natif de gestion des doublons (Parametres > Contacts > Doublons) qui identifie automatiquement les fiches similaires par email, nom ou entreprise. Pour les cas complexes, des outils comme Dedupely ou Insycle permettent de definir des regles de fusion avancees : quel champ prioriser, comment fusionner les activites, comment conserver l&apos;historique.",
    setup: "1. Allez dans Parametres > Contacts > Doublons dans HubSpot\n2. Examinez les paires detectees automatiquement par l&apos;outil natif\n3. Definissez vos regles de fusion : conserver la fiche la plus recente, fusionner les activites\n4. Traitez les doublons par lot de 50 pour eviter les erreurs\n5. Configurez une regle de prevention : workflow qui alerte quand un doublon potentiel est cree\n6. Planifiez un audit mensuel de 30 minutes pour maintenir la base propre",
  },
  {
    num: "02",
    title: "Definir MQL/SQL avec les sales",
    setupTime: "1h",
    impact: "+25% alignment",
    effort: "faible",
    impactLevel: "fort",
    quadrant: "top-left" as const,
    problem: "Le marketing envoie des leads aux commerciaux, mais personne n&apos;est d&apos;accord sur ce qui constitue un lead qualifie. Pour le marketing, un MQL est quelqu&apos;un qui a telecharge un livre blanc. Pour les sales, c&apos;est quelqu&apos;un qui a un budget et un projet concret. Resultat : les commerciaux ignorent 60% des leads transmis par le marketing. Le marketing accuse les sales de ne pas suivre. Les sales accusent le marketing d&apos;envoyer des leads froids. Le cycle s&apos;auto-alimente et la frustration monte des deux cotes.",
    solution: "Organisez une reunion d&apos;une heure entre le responsable marketing et le directeur commercial. L&apos;objectif est de definir ensemble, noir sur blanc, les criteres exacts qui font passer un contact de MQL a SQL. Ces criteres doivent etre objectifs, mesurables, et acceptes par les deux equipes. Une fois definis, documentez-les dans un SLA (Service Level Agreement) interne et configurez les lifecycle stages correspondants dans votre CRM.",
    setup: "1. Reunissez le marketing et les sales dans une salle pendant 1 heure\n2. Listez les 5 criteres qui definissent un MQL (ex: secteur cible, taille entreprise, action sur le site)\n3. Listez les 5 criteres qui definissent un SQL (ex: budget confirme, timeline definie, decision-maker identifie)\n4. Documentez ces criteres dans un Google Doc partage, accessible a tous\n5. Configurez les lifecycle stages dans HubSpot pour refleter ces definitions\n6. Creez un workflow automatique qui passe un contact de MQL a SQL quand les criteres sont remplis",
  },
  {
    num: "03",
    title: "Automatiser l&apos;attribution de leads",
    setupTime: "1h",
    impact: "-80% response time",
    effort: "faible",
    impactLevel: "fort",
    quadrant: "top-left" as const,
    problem: "Chaque nouveau lead qui arrive dans le CRM attend d&apos;etre assigne manuellement a un commercial. Le responsable doit ouvrir HubSpot, regarder quel commercial est disponible, verifier la charge de chacun, et assigner le lead. En moyenne, ce processus prend entre 2 et 8 heures. Pendant ce temps, le prospect a deja oublie votre entreprise ou, pire, il a contacte un concurrent qui lui a repondu en 5 minutes. Chaque heure de delai reduit de 10% la probabilite de conversion.",
    solution: "Configurez un workflow d&apos;attribution automatique en round-robin dans HubSpot. Des qu&apos;un lead est cree ou atteint un score suffisant, il est immediatement assigne au prochain commercial dans la rotation. Le temps de reponse passe de plusieurs heures a quelques minutes. Pour les equipes plus avancees, segmentez l&apos;attribution par territoire, par taille d&apos;entreprise ou par secteur d&apos;activite.",
    setup: "1. Allez dans Automatisation > Workflows dans HubSpot\n2. Creez un workflow base sur les contacts, declencheur : creation de contact\n3. Ajoutez l&apos;action \"Faire tourner le proprietaire du contact\"\n4. Selectionnez les commerciaux a inclure dans la rotation\n5. Optionnel : ajoutez des branches pour segmenter par taille d&apos;entreprise ou secteur\n6. Activez le workflow et mesurez le temps de premier contact avant/apres",
  },
  {
    num: "04",
    title: "Creer un dashboard pipeline partage",
    setupTime: "2h",
    impact: "visibilite totale",
    effort: "moyen",
    impactLevel: "fort",
    quadrant: "top-right" as const,
    problem: "Le pipeline commercial existe dans le CRM, mais personne ne le regarde de la meme maniere. Le CEO demande un export Excel chaque lundi. Le directeur commercial ouvre HubSpot et filtre manuellement. Les commerciaux ne voient que leurs propres deals. Le marketing n&apos;a aucune visibilite sur ce qui se passe apres la transmission des leads. Chaque personne travaille avec sa propre version de la verite. Les reunions commerciales sont perdues a debattre des chiffres au lieu de discuter de strategie.",
    solution: "Creez un dashboard unique dans HubSpot qui centralise toutes les metriques du pipeline. Ce dashboard doit etre accessible a toutes les equipes concernees : sales, marketing, direction. Il devient la source unique de verite. Plus besoin d&apos;exports manuels, plus de debats sur les chiffres. Chaque reunion commence par l&apos;ouverture de ce dashboard.",
    setup: "1. Creez un nouveau tableau de bord dans HubSpot (Rapports > Tableaux de bord)\n2. Ajoutez les widgets essentiels : pipeline par stage, deals crees ce mois, valeur totale, forecast\n3. Ajoutez un widget de conversion par source pour le marketing\n4. Ajoutez un widget d&apos;activite par commercial pour le management\n5. Configurez les filtres par defaut (periode, pipeline, equipe)\n6. Partagez le dashboard avec toute l&apos;equipe et programmez un envoi hebdomadaire par email",
  },
  {
    num: "05",
    title: "Mettre en place le lead scoring basique",
    setupTime: "3h",
    impact: "+20% conversion",
    effort: "moyen",
    impactLevel: "fort",
    quadrant: "top-right" as const,
    problem: "Sans lead scoring, tous les leads sont traites de maniere identique. Le commercial passe autant de temps a rappeler un etudiant qui a telecharge un PDF qu&apos;un directeur commercial d&apos;une entreprise de 200 personnes qui a demande une demo. La priorisation se fait au feeling, a l&apos;instinct, ou tout simplement dans l&apos;ordre d&apos;arrivee. Les meilleurs leads ne sont pas traites en premier. Le taux de conversion stagne parce que l&apos;effort commercial n&apos;est pas alloue la ou il aurait le plus d&apos;impact.",
    solution: "Implementez un systeme de scoring simple dans HubSpot. Definissez des criteres demographiques (poste, taille entreprise, secteur) et comportementaux (pages visitees, formulaires remplis, emails ouverts) qui attribuent des points positifs ou negatifs a chaque contact. Les commerciaux voient immediatement quels leads sont chauds et concentrent leur energie sur les opportunites les plus prometteuses.",
    setup: "1. Allez dans Parametres > Proprietes > HubSpot Score\n2. Definissez les criteres positifs :\n   — Poste contient \"Directeur\" ou \"VP\" : +15 points\n   — Taille entreprise > 50 : +10 points\n   — A visite la page pricing : +20 points\n   — A demande une demo : +25 points\n3. Definissez les criteres negatifs :\n   — Email personnel (gmail, hotmail) : -10 points\n   — Etudiant ou stagiaire : -20 points\n4. Creez un workflow qui notifie le commercial quand un lead depasse 50 points\n5. Ajoutez une vue filtree dans les contacts : leads tries par score decroissant\n6. Revisez les criteres chaque mois en fonction des conversions reelles",
  },
  {
    num: "06",
    title: "Automatiser les relances de devis",
    setupTime: "1h",
    impact: "+15% close rate",
    effort: "faible",
    impactLevel: "fort",
    quadrant: "top-left" as const,
    problem: "Un devis a ete envoye il y a une semaine et le prospect n&apos;a pas repondu. Le commercial doit se souvenir de relancer, retrouver le bon email, rediger un message de suivi adapte. Entre les nouveaux leads a traiter, les demos a faire et les reunions internes, la relance passe a la trappe. A l&apos;echelle de l&apos;equipe, ce sont des dizaines de milliers d&apos;euros de devis qui tombent dans l&apos;oubli chaque mois. Le prospect, lui, attend simplement qu&apos;on le relance pour signer.",
    solution: "Configurez un workflow automatique qui detecte les devis en attente depuis plus de 5 jours et declenche une sequence de relance. Le premier email est envoye automatiquement. Si pas de reponse apres 3 jours, un second email part. Si toujours rien apres 7 jours, une tache est creee pour un appel telephonique. Si le devis est signe entre-temps, le workflow s&apos;arrete automatiquement.",
    setup: "1. Creez un workflow base sur les deals dans HubSpot\n2. Declencheur : un devis existe ET le statut est \"En attente\" depuis plus de 5 jours\n3. Action 1 : envoyer un email de relance personnalise (template pre-redige)\n4. Ajoutez un delai de 3 jours\n5. Condition : si le devis est toujours en attente, envoyer un second email avec une approche differente\n6. Action finale : creer une tache d&apos;appel pour le commercial si toujours pas de reponse apres 10 jours",
  },
  {
    num: "07",
    title: "Configurer les notifications Slack sur les deals",
    setupTime: "30min",
    impact: "rapidite",
    effort: "faible",
    impactLevel: "moyen",
    quadrant: "bottom-left" as const,
    problem: "Le manager commercial doit ouvrir HubSpot plusieurs fois par jour pour surveiller l&apos;evolution du pipeline. Un deal vient de passer en negociation ? Personne n&apos;est au courant avant la reunion hebdomadaire. Un gros deal vient d&apos;etre perdu ? L&apos;information met 48 heures a remonter. L&apos;equipe ne celebre pas les victoires ensemble parce qu&apos;elle n&apos;en est informee qu&apos;apres coup. La reactivite manque, et les problemes sont identifies trop tard pour etre corriges.",
    solution: "Connectez HubSpot a Slack via l&apos;integration native et configurez des notifications automatiques a chaque changement de stage significatif. Un deal passe en \"Proposition\" ? Le canal #pipeline est notifie. Un deal est gagne ? Toute l&apos;equipe le voit dans #wins. Un deal de plus de 10K est perdu ? Le manager recoit un message prive.",
    setup: "1. Installez l&apos;integration HubSpot x Slack depuis le Marketplace HubSpot\n2. Creez un canal Slack dedie : #pipeline-updates\n3. Creez un workflow base sur les deals, declencheur : propriete \"Deal Stage\" change\n4. Ajoutez l&apos;action \"Envoyer une notification Slack\"\n5. Personnalisez le message : nom du deal, nouveau stage, montant, proprietaire\n6. Optionnel : creez un second workflow pour les deals gagnes avec notification dans #wins",
  },
  {
    num: "08",
    title: "Standardiser les proprietes CRM",
    setupTime: "2h",
    impact: "data quality",
    effort: "moyen",
    impactLevel: "moyen",
    quadrant: "bottom-right" as const,
    problem: "Chaque commercial remplit le CRM a sa maniere. L&apos;un ecrit \"SaaS\" dans le champ secteur, l&apos;autre ecrit \"Logiciel\", un troisieme ecrit \"Tech/Software\". Le champ \"Montant\" contient parfois le montant mensuel, parfois l&apos;annuel, parfois le total du contrat. Les adresses sont saisies sans format standard. Quand vous essayez de segmenter vos contacts par secteur ou de calculer le revenu moyen par deal, les resultats sont inutilisables. Vos rapports deviennent de la fiction.",
    solution: "Auditez toutes les proprietes de votre CRM et standardisez-les. Remplacez les champs texte libre par des menus deroulants quand c&apos;est possible. Definissez des conventions de nommage claires. Creez un document de reference qui explique comment remplir chaque champ. Formez l&apos;equipe en 15 minutes et configurez des proprietes obligatoires pour les champs critiques.",
    setup: "1. Exportez la liste de toutes vos proprietes CRM (Parametres > Proprietes)\n2. Identifiez les champs texte libre qui devraient etre des menus deroulants\n3. Creez les options standardisees pour chaque champ (ex: secteur, source, raison de perte)\n4. Migrez les donnees existantes vers les nouvelles valeurs standardisees\n5. Configurez les champs obligatoires sur les fiches de deal (montant, date de cloture, source)\n6. Redigez un guide d&apos;une page qui explique les conventions et partagez-le avec l&apos;equipe",
  },
  {
    num: "09",
    title: "Creer un template de reporting hebdo",
    setupTime: "1h",
    impact: "gain de temps",
    effort: "faible",
    impactLevel: "moyen",
    quadrant: "bottom-left" as const,
    problem: "Chaque lundi matin, le responsable commercial passe une heure a compiler les chiffres de la semaine. Il ouvre HubSpot, exporte des donnees, les colle dans un Google Sheet, calcule les variations, met en forme un tableau, et envoie le tout par email a la direction. C&apos;est une heure de travail repetitif, chaque semaine, sans exception. Et si le responsable est en conge, personne ne fait le reporting. La direction n&apos;a aucune visibilite.",
    solution: "Creez un tableau de bord dans HubSpot avec tous les KPIs hebdomadaires et programmez un envoi automatique chaque lundi matin. Le rapport arrive dans les boites mail a 8h, avec les donnees a jour, sans intervention humaine. Meme quand le responsable est absent, le reporting continue.",
    setup: "1. Creez un tableau de bord dans HubSpot avec les KPIs cles de la semaine\n2. Incluez : deals crees, deals gagnes, valeur pipeline, taux de conversion, activites par commercial\n3. Configurez les filtres temporels sur \"Cette semaine\" ou \"7 derniers jours\"\n4. Cliquez sur Actions > Programmer un email recurrent\n5. Selectionnez la frequence : hebdomadaire, le lundi a 8h\n6. Ajoutez les destinataires : direction, managers, et les commerciaux eux-memes",
  },
  {
    num: "10",
    title: "Activer le warm-up sur vos boites outbound",
    setupTime: "15min",
    impact: "delivrabilite",
    effort: "faible",
    impactLevel: "moyen",
    quadrant: "bottom-left" as const,
    problem: "Vous avez configure votre strategie d&apos;outbound, redige vos sequences, cible vos prospects. Mais vos emails arrivent en spam. Votre domaine d&apos;envoi est neuf ou n&apos;a jamais ete utilise pour du volume. Les fournisseurs de messagerie (Google, Microsoft) ne lui font pas confiance. Votre taux d&apos;ouverture est en dessous de 10%. Vos efforts de prospection sont reduits a neant par un probleme technique que vous n&apos;avez meme pas identifie.",
    solution: "Activez un service de warm-up sur toutes vos boites d&apos;envoi outbound. Le warm-up simule des echanges d&apos;emails naturels pendant 2 a 4 semaines pour construire la reputation de votre domaine. Des outils comme Lemwarm (inclus dans Lemlist), Mailreach ou Warmbox envoient et recoivent des emails automatiquement, les sortent du spam, et augmentent progressivement le volume. Au bout de 3 semaines, votre delivrabilite passe de 60% a 95%+.",
    setup: "1. Connectez votre boite d&apos;envoi outbound a un outil de warm-up (Lemwarm, Mailreach ou Warmbox)\n2. Configurez le volume progressif : 5 emails/jour la premiere semaine, puis 10, puis 20\n3. Activez les reponses automatiques pour simuler des conversations reelles\n4. Attendez 2 a 3 semaines avant de lancer vos premieres sequences outbound\n5. Surveillez votre score de delivrabilite dans l&apos;outil (objectif : 95%+)\n6. Ne desactivez jamais le warm-up, meme quand vous envoyez vos campagnes",
  },
];

const relatedArticles = [
  { title: "Aligner marketing et sales avec le RevOps", slug: "aligner-marketing-sales-revops", category: "RevOps", color: "#FF7A59" },
  { title: "Data quality CRM : audit et nettoyage", slug: "data-quality-crm-audit-nettoyage", category: "Data", color: "#22C55E" },
  { title: "Lead scoring : le guide complet", slug: "lead-scoring-guide-complet", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function BlogPostPage() {
  const [progress, setProgress] = useState(0);
  const [activeWin, setActiveWin] = useState("01");

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, pct));

      for (let i = wins.length - 1; i >= 0; i--) {
        const el = document.getElementById(`win-${wins[i].num}`);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveWin(wins[i].num);
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
        <div className="h-full bg-[#FF7A59] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "6%", width: 320, height: 320, borderRadius: "50%", background: "#FF7A59", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "25%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "50%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "75%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.07, filter: "blur(70px)" }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="flex gap-10">
          {/* Sticky TOC -- desktop */}
          <aside className="hidden lg:block w-[200px] shrink-0">
            <div className="sticky top-28">
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Les 10 quick wins</p>
              <nav className="space-y-1">
                {wins.map((w) => (
                  <a key={w.num} href={`#win-${w.num}`}
                    className={"block text-[11px] py-1.5 pl-3 border-l-2 transition-all " +
                      (activeWin === w.num ? "border-[#FF7A59] text-[#111] font-medium" : "border-transparent text-[#999] hover:text-[#666]")}>
                    {w.num}. {w.title.split(" ").slice(0, 3).join(" ")}...
                  </a>
                ))}
                <a href="#matrice" className={"block text-[11px] py-1.5 pl-3 border-l-2 transition-all border-transparent text-[#999] hover:text-[#666]"}>
                  Matrice effort/impact
                </a>
                <a href="#bilan" className={"block text-[11px] py-1.5 pl-3 border-l-2 transition-all border-transparent text-[#999] hover:text-[#666]"}>
                  Bilan
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
              <span className="text-[#666]">10 quick wins RevOps en 30 jours</span>
            </nav>

            {/* Hero */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>RevOps</Badge>
                <span className="text-[11px] text-[#CCC]">14 min</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                RevOps : 10 quick wins a implementer en 30 jours
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Vous n&apos;avez pas besoin d&apos;un projet de 6 mois pour voir des resultats concrets sur vos operations commerciales. Voici 10 actions que vous pouvez mettre en place en moins de 30 jours, avec le temps de setup exact, l&apos;impact mesurable, et le pas a pas pour chacune. Total : moins de 16 heures de travail pour transformer votre machine revenue.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                <span>16 mars 2026</span>
              </div>
            </header>

            {/* Intro section */}
            <section className="mb-10">
              <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi des quick wins ?</h2>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Le RevOps ne se resume pas a des transformations massives de 12 mois. Les entreprises qui progressent le plus vite sont celles qui enchainent des petites victoires rapides, mesurent les resultats, et iterent. Un quick win, c&apos;est une action qui demande peu d&apos;effort mais qui produit un impact visible et mesurable sur vos operations.
                </p>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-3">
                  Les 10 actions presentees dans cet article ont ete selectionnees selon trois criteres : elles prennent moins de 3 heures a mettre en place, elles ne necessitent aucun outil supplementaire (votre CRM suffit), et elles produisent des resultats mesurables des la premiere semaine.
                </p>
                <p className="text-[13px] text-[#555] leading-[1.75]">
                  Pour chaque action, nous detaillons le probleme qu&apos;elle resout, la solution concrete, le setup pas a pas, le temps necessaire et l&apos;impact attendu. A la fin de l&apos;article, une matrice effort/impact vous aide a prioriser.
                </p>
              </div>
              <Connector />
            </section>

            {/* Bubble summary cards */}
            <section className="mb-10">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-[#FFF5F2] border border-[#FFE0D6] p-4 text-center">
                  <p className="text-[24px] font-bold text-[#FF7A59]">10</p>
                  <p className="text-[11px] text-[#666] mt-1">quick wins</p>
                </div>
                <div className="rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] p-4 text-center">
                  <p className="text-[24px] font-bold text-[#22C55E]">30j</p>
                  <p className="text-[11px] text-[#666] mt-1">pour tout deployer</p>
                </div>
                <div className="rounded-lg bg-[#F7F7FF] border border-[#E8E8F4] p-4 text-center">
                  <p className="text-[24px] font-bold text-[#4B5EFC]">~16h</p>
                  <p className="text-[11px] text-[#666] mt-1">de setup total</p>
                </div>
              </div>
              <Connector />
            </section>

            {/* Effort/Impact Matrix -- CSS mockup */}
            <section id="matrice" className="mb-10">
              <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[17px] font-semibold text-[#111] mb-2">Matrice effort / impact</h2>
                <p className="text-[12px] text-[#999] mb-6">Priorisez les quick wins selon votre contexte. Commencez par le quadrant superieur gauche.</p>

                <div className="relative">
                  {/* Axis labels */}
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Effort faible</span>
                    <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Effort eleve</span>
                  </div>

                  {/* Matrix grid */}
                  <div className="grid grid-cols-2 gap-[2px] rounded-lg overflow-hidden border border-[#EAEAEA]">
                    {/* Top-left: Low effort, High impact -- BEST */}
                    <div className="bg-[#F0FDF4] p-4 min-h-[140px]">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#22C55E]/10 text-[9px] font-bold text-[#16A34A] uppercase tracking-wider mb-3">Priorite 1</span>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#FF7A59] text-white text-[9px] font-bold">02</span>
                          <span className="text-[11px] text-[#333]">Definir MQL/SQL</span>
                          <span className="text-[9px] text-[#999] ml-auto">1h</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#FF7A59] text-white text-[9px] font-bold">03</span>
                          <span className="text-[11px] text-[#333]">Attribution leads</span>
                          <span className="text-[9px] text-[#999] ml-auto">1h</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#FF7A59] text-white text-[9px] font-bold">06</span>
                          <span className="text-[11px] text-[#333]">Relances devis</span>
                          <span className="text-[9px] text-[#999] ml-auto">1h</span>
                        </div>
                      </div>
                    </div>

                    {/* Top-right: High effort, High impact */}
                    <div className="bg-[#FFF7ED] p-4 min-h-[140px]">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#F97316]/10 text-[9px] font-bold text-[#EA580C] uppercase tracking-wider mb-3">Priorite 2</span>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#FF7A59] text-white text-[9px] font-bold">01</span>
                          <span className="text-[11px] text-[#333]">Nettoyer doublons</span>
                          <span className="text-[9px] text-[#999] ml-auto">2h</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#FF7A59] text-white text-[9px] font-bold">04</span>
                          <span className="text-[11px] text-[#333]">Dashboard pipeline</span>
                          <span className="text-[9px] text-[#999] ml-auto">2h</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#FF7A59] text-white text-[9px] font-bold">05</span>
                          <span className="text-[11px] text-[#333]">Lead scoring</span>
                          <span className="text-[9px] text-[#999] ml-auto">3h</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom-left: Low effort, Low impact */}
                    <div className="bg-[#F7F7FF] p-4 min-h-[140px]">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#4B5EFC]/10 text-[9px] font-bold text-[#4B5EFC] uppercase tracking-wider mb-3">Quick fixes</span>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#FF7A59] text-white text-[9px] font-bold">07</span>
                          <span className="text-[11px] text-[#333]">Notifs Slack</span>
                          <span className="text-[9px] text-[#999] ml-auto">30min</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#FF7A59] text-white text-[9px] font-bold">09</span>
                          <span className="text-[11px] text-[#333]">Template reporting</span>
                          <span className="text-[9px] text-[#999] ml-auto">1h</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#FF7A59] text-white text-[9px] font-bold">10</span>
                          <span className="text-[11px] text-[#333]">Warm-up outbound</span>
                          <span className="text-[9px] text-[#999] ml-auto">15min</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom-right: High effort, Low impact */}
                    <div className="bg-[#FAFAFA] p-4 min-h-[140px]">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#999]/10 text-[9px] font-bold text-[#999] uppercase tracking-wider mb-3">A planifier</span>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center justify-center w-5 h-5 rounded bg-[#FF7A59] text-white text-[9px] font-bold">08</span>
                          <span className="text-[11px] text-[#333]">Standardiser proprietes</span>
                          <span className="text-[9px] text-[#999] ml-auto">2h</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Axis arrows */}
                  <div className="flex items-center justify-between mt-2 px-1">
                    <span className="text-[10px] font-semibold text-[#22C55E] uppercase tracking-wider">Impact fort</span>
                    <span className="text-[10px] font-semibold text-[#999] uppercase tracking-wider">Impact modere</span>
                  </div>
                </div>
              </div>
              <Connector />
            </section>

            {/* Progress tracker */}
            <section className="mb-10">
              <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[17px] font-semibold text-[#111] mb-2">Planning sur 30 jours</h2>
                <p className="text-[12px] text-[#999] mb-5">Repartissez les quick wins sur 4 semaines pour un deploiement progressif.</p>

                <div className="space-y-4">
                  {/* Semaine 1 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#FF7A59] text-white text-[10px] font-bold">S1</span>
                      <span className="text-[12px] font-semibold text-[#111]">Semaine 1 -- Fondations</span>
                      <span className="text-[10px] text-[#999] ml-auto">~4h</span>
                    </div>
                    <div className="ml-8 space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] text-[#555]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
                        <span>Definir MQL/SQL avec les sales (1h)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#555]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
                        <span>Nettoyer les doublons CRM (2h)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#555]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
                        <span>Automatiser l&apos;attribution de leads (1h)</span>
                      </div>
                    </div>
                    <div className="ml-8 mt-2 h-1 rounded-full bg-[#F0F0F0] overflow-hidden">
                      <div className="h-full rounded-full bg-[#FF7A59]" style={{ width: "25%" }} />
                    </div>
                  </div>

                  {/* Semaine 2 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#FF7A59]/80 text-white text-[10px] font-bold">S2</span>
                      <span className="text-[12px] font-semibold text-[#111]">Semaine 2 -- Pipeline</span>
                      <span className="text-[10px] text-[#999] ml-auto">~5h</span>
                    </div>
                    <div className="ml-8 space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] text-[#555]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
                        <span>Creer un dashboard pipeline partage (2h)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#555]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
                        <span>Mettre en place le lead scoring basique (3h)</span>
                      </div>
                    </div>
                    <div className="ml-8 mt-2 h-1 rounded-full bg-[#F0F0F0] overflow-hidden">
                      <div className="h-full rounded-full bg-[#FF7A59]" style={{ width: "50%" }} />
                    </div>
                  </div>

                  {/* Semaine 3 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#FF7A59]/60 text-white text-[10px] font-bold">S3</span>
                      <span className="text-[12px] font-semibold text-[#111]">Semaine 3 -- Automatisation</span>
                      <span className="text-[10px] text-[#999] ml-auto">~4h30</span>
                    </div>
                    <div className="ml-8 space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] text-[#555]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
                        <span>Automatiser les relances de devis (1h)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#555]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
                        <span>Configurer les notifications Slack (30min)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#555]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
                        <span>Standardiser les proprietes CRM (2h)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#555]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
                        <span>Creer un template de reporting hebdo (1h)</span>
                      </div>
                    </div>
                    <div className="ml-8 mt-2 h-1 rounded-full bg-[#F0F0F0] overflow-hidden">
                      <div className="h-full rounded-full bg-[#FF7A59]" style={{ width: "75%" }} />
                    </div>
                  </div>

                  {/* Semaine 4 */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#FF7A59]/40 text-white text-[10px] font-bold">S4</span>
                      <span className="text-[12px] font-semibold text-[#111]">Semaine 4 -- Outbound</span>
                      <span className="text-[10px] text-[#999] ml-auto">~15min</span>
                    </div>
                    <div className="ml-8 space-y-1.5">
                      <div className="flex items-center gap-2 text-[11px] text-[#555]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A59]" />
                        <span>Activer le warm-up outbound (15min)</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-[#555]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                        <span className="text-[#22C55E] font-medium">Mesurer les resultats des 3 premieres semaines</span>
                      </div>
                    </div>
                    <div className="ml-8 mt-2 h-1 rounded-full bg-[#F0F0F0] overflow-hidden">
                      <div className="h-full rounded-full bg-[#22C55E]" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>
              </div>
              <Connector />
            </section>

            {/* Quick win cards */}
            <article>
              {wins.map((win, i) => (
                <section key={win.num} id={`win-${win.num}`} className="mb-8">
                  <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                    {/* Header with number, time and impact */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#FF7A59] text-white text-[14px] font-bold">{win.num}</span>
                        <h2 className="text-[17px] font-semibold text-[#111] leading-tight max-w-[400px]">{win.title}</h2>
                      </div>
                      <div className="shrink-0 ml-3 flex flex-col items-end gap-1.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFF5F2] border border-[#FFE0D6]">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                          <span className="text-[11px] font-semibold text-[#FF7A59]">{win.setupTime}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7]">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                          <span className="text-[11px] font-semibold text-[#22C55E]">{win.impact}</span>
                        </span>
                      </div>
                    </div>

                    {/* Le probleme */}
                    <div className="mb-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FEF2F2] text-[11px] font-medium text-[#DC2626] mb-3">Le probleme</span>
                      <p className="text-[13px] text-[#555] leading-[1.75]">{win.problem}</p>
                    </div>

                    {/* La solution */}
                    <div className="mb-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F0FDF4] text-[11px] font-medium text-[#16A34A] mb-3">La solution</span>
                      <p className="text-[13px] text-[#555] leading-[1.75]">{win.solution}</p>
                    </div>

                    {/* Le setup */}
                    <div className="rounded-lg bg-[#FAFAFA] border border-[#F0F0F0] p-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FFF5F2] text-[11px] font-medium text-[#FF7A59] mb-3">Setup pas a pas</span>
                      <div className="space-y-2">
                        {win.setup.split("\n").map((line, li) => {
                          const indent = line.startsWith("   ") ? "ml-4" : "";
                          return (
                            <div key={li} className={`flex items-start gap-2 ${indent}`}>
                              {!line.startsWith("   ") && (
                                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-1 text-[#FF7A59]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                              )}
                              <p className="text-[12px] text-[#555] leading-[1.7]">{line.replace(/^\d+\.\s*/, "").replace(/^—\s*/, "")}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {i < wins.length - 1 && <Connector />}
                </section>
              ))}
            </article>

            {/* Bilan -- dark section */}
            <section id="bilan" className="mb-8">
              <Connector />
              <div className="rounded-lg bg-[#111] p-5 md:p-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Bilan</span>
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-white mb-6">Recapitulatif des 10 quick wins</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  {wins.map((w) => (
                    <div key={w.num} className="rounded-lg bg-white/5 border border-white/10 p-3">
                      <p className="text-[11px] text-white/40 mb-1">{w.num}. {w.title.split(" ").slice(0, 3).join(" ")}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] font-bold text-[#FF7A59]">{w.setupTime}</p>
                        <p className="text-[10px] text-[#22C55E]">{w.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg bg-[#FF7A59]/10 border border-[#FF7A59]/20 p-5 text-center mb-6">
                  <p className="text-[11px] text-[#FF7A59]/60 uppercase tracking-wider mb-2">Temps total de setup</p>
                  <p className="text-[36px] font-bold text-[#FF7A59]">~15h 45min</p>
                  <p className="text-[13px] text-white/40 mt-2">reparties sur <strong className="text-white/70">4 semaines</strong>, soit moins de 4 heures par semaine</p>
                </div>

                <div className="space-y-3">
                  <p className="text-[13px] text-white/50 leading-[1.75]">
                    Ces 10 actions ne sont pas des projets strategiques de longue haleine. Ce sont des interventions chirurgicales qui produisent des resultats mesurables en quelques jours. L&apos;objectif n&apos;est pas de tout revolutionner, mais de poser les bases d&apos;une machine revenue qui fonctionne.
                  </p>
                  <p className="text-[13px] text-white/50 leading-[1.75]">
                    La cle du succes est la regularite. Implementez un quick win par semaine, mesurez l&apos;impact, ajustez si necessaire, puis passez au suivant. En 30 jours, vous aurez transforme vos operations sans avoir mobilise une equipe projet de 10 personnes pendant 6 mois.
                  </p>
                  <p className="text-[13px] text-white/50 leading-[1.75]">
                    Les resultats cumules sont significatifs : une base CRM propre, des leads qualifies et distribues instantanement, un pipeline visible par tous, des relances automatiques qui ne laissent plus aucun devis tomber dans l&apos;oubli, et une delivrabilite outbound optimisee. Ce sont les fondations sur lesquelles vous pourrez construire des optimisations plus avancees.
                  </p>
                </div>
              </div>
            </section>

            {/* Mesurer section */}
            <section className="mb-8">
              <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[17px] font-semibold text-[#111] mb-4">Comment mesurer l&apos;impact ?</h2>
                <p className="text-[13px] text-[#555] leading-[1.75] mb-4">
                  Chaque quick win doit etre mesure. Avant de commencer, notez vos metriques de reference. Apres 30 jours, comparez. Voici les KPIs a suivre :
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#FF7A59] text-white text-[10px] font-bold">1</span>
                    <div>
                      <p className="text-[13px] font-medium text-[#111]">Temps de reponse aux leads</p>
                      <p className="text-[12px] text-[#999]">Mesurez le delai entre la creation du contact et le premier appel. Objectif : passer sous les 5 minutes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#FF7A59] text-white text-[10px] font-bold">2</span>
                    <div>
                      <p className="text-[13px] font-medium text-[#111]">Taux de conversion MQL vers SQL</p>
                      <p className="text-[12px] text-[#999]">La definition commune doit augmenter l&apos;alignement. Cible : +25% sur 30 jours.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#FF7A59] text-white text-[10px] font-bold">3</span>
                    <div>
                      <p className="text-[13px] font-medium text-[#111]">Taux de signature des devis</p>
                      <p className="text-[12px] text-[#999]">Les relances automatiques doivent augmenter le close rate. Cible : +15%.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#FF7A59] text-white text-[10px] font-bold">4</span>
                    <div>
                      <p className="text-[13px] font-medium text-[#111]">Nombre de fiches en double</p>
                      <p className="text-[12px] text-[#999]">Lancez un audit avant et apres. Objectif : zero doublon sur les 30 derniers jours.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#FF7A59] text-white text-[10px] font-bold">5</span>
                    <div>
                      <p className="text-[13px] font-medium text-[#111]">Score de delivrabilite outbound</p>
                      <p className="text-[12px] text-[#999]">Votre outil de warm-up affiche un score. Cible : 95%+ apres 3 semaines.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Dark CTA section for Ceres */}
            <section className="mb-8">
              <div className="rounded-lg bg-[#111] p-5 md:p-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Aller plus loin avec Ceres</span>
                <h2 className="text-[17px] font-semibold text-white mb-3">On implemente vos quick wins en une semaine</h2>
                <p className="text-[13px] text-white/40 leading-[1.75] mb-4">
                  Vous n&apos;avez pas le temps de configurer ces 10 actions vous-meme ? Notre equipe RevOps prend en charge l&apos;implementation complete dans votre environnement HubSpot. En une semaine, tout est en place, teste, et documente.
                </p>
                <div className="space-y-2.5">
                  {[
                    "Audit de votre CRM et identification des quick wins prioritaires pour votre contexte",
                    "Configuration et test de chaque automatisation dans votre environnement HubSpot",
                    "Mise en place du dashboard pipeline et du lead scoring adaptes a votre cycle de vente",
                    "Formation de votre equipe sur les nouveaux processus (30 minutes)",
                    "Suivi a J+30 pour mesurer l&apos;impact et ajuster si necessaire",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-[12px] text-white/50">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#FF7A59]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Pret a lancer vos 10 quick wins ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[420px] mx-auto">On configure tout dans votre HubSpot en moins d&apos;une semaine. Resultats mesurables des J+7.</p>
                <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                  <span className="w-2 h-2 rounded-sm bg-[#FF7A59]" />Reserver un appel
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
