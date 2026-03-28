"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Audit RevOps : la checklist complete (80 points)",
  description: "La checklist d'audit RevOps la plus complete en francais. 80 points de controle repartis en 8 categories, methodologie de scoring sur 100, niveaux de maturite et quick wins par score. Le guide de reference pour auditer vos operations revenue.",
  author: { "@type": "Person", name: "Guillaume Delachet", url: "https://www.ceres-revops.com" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com", logo: { "@type": "ImageObject", url: "https://www.ceres-revops.com/logo.png" } },
  datePublished: "2026-03-18",
  dateModified: "2026-03-18",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/audit-revops-checklist-complete" },
  articleSection: "RevOps",
  wordCount: 3200,
  inLanguage: "fr",
};

const sections = [
  { id: "pourquoi-audit", title: "Pourquoi un audit" },
  { id: "methodologie-scoring", title: "Methodologie de scoring" },
  { id: "cat-crm-donnees", title: "1. CRM et donnees" },
  { id: "cat-pipeline-vente", title: "2. Pipeline et vente" },
  { id: "cat-marketing-ops", title: "3. Marketing operations" },
  { id: "cat-automatisation", title: "4. Automatisation" },
  { id: "cat-reporting", title: "5. Reporting et analytics" },
  { id: "cat-alignement", title: "6. Alignement equipes" },
  { id: "cat-stack-tech", title: "7. Stack technologique" },
  { id: "cat-ia-innovation", title: "8. IA et innovation" },
  { id: "interpreter-score", title: "Interpreter votre score" },
  { id: "quick-wins", title: "Quick wins par score" },
  { id: "audit-ceres", title: "Notre audit Ceres" },
];

const relatedArticles = [
  { title: "Comment aligner marketing et sales en 30 jours avec le RevOps", slug: "aligner-marketing-sales-revops", category: "RevOps", color: "#FF7A59" },
  { title: "Data quality CRM : audit et nettoyage en 5 etapes", slug: "data-quality-crm-audit-nettoyage", category: "Data & Reporting", color: "#22C55E" },
  { title: "KPI commerciaux : les indicateurs de vente essentiels", slug: "kpi-commerciaux-indicateurs-vente", category: "Process & Outils", color: "#6C5CE7" },
];

interface ChecklistItem {
  id: number;
  label: string;
  description: string;
}

interface ChecklistCategory {
  id: string;
  title: string;
  points: number;
  color: string;
  icon: string;
  items: ChecklistItem[];
}

const checklistCategories: ChecklistCategory[] = [
  {
    id: "cat-crm-donnees",
    title: "CRM et donnees",
    points: 15,
    color: "#22C55E",
    icon: "database",
    items: [
      { id: 1, label: "Proprietes contacts standardisees", description: "Les proprietes contacts cles (nom, email, telephone, entreprise, poste) sont standardisees avec des formats definis et des dropdowns plutot que du texte libre." },
      { id: 2, label: "Proprietes entreprises completes", description: "Les fiches entreprises contiennent les informations essentielles : secteur, taille, CA, localisation, site web. Le taux de completude depasse 80%." },
      { id: 3, label: "Segmentation contacts active", description: "Les contacts sont segmentes par persona, lifecycle stage, et niveau d&apos;engagement. Les listes sont dynamiques et mises a jour automatiquement." },
      { id: 4, label: "Deduplication reguliere", description: "Un processus de deduplication est execute au moins une fois par mois. Les regles de fusion sont documentees et les doublons representent moins de 3% de la base." },
      { id: 5, label: "Enrichissement des donnees", description: "Un outil d&apos;enrichissement (Clearbit, Apollo, etc.) complete automatiquement les fiches contacts et entreprises avec des donnees firmographiques et technographiques." },
      { id: 6, label: "Lifecycle stages definis", description: "Les lifecycle stages sont clairement definis, documentes et correspondent a votre realite business. Les transitions sont automatisees et irreversibles." },
      { id: 7, label: "Conventions de nommage", description: "Des conventions de nommage existent pour les deals, les listes, les workflows et les proprietes custom. Elles sont documentees et respectees par toutes les equipes." },
      { id: 8, label: "Politique d&apos;archivage", description: "Les contacts inactifs depuis plus de 12 mois sont identifies et archives selon un processus defini. La base est nettoyee regulierement." },
      { id: 9, label: "Sources de donnees tracees", description: "Chaque contact a une source d&apos;acquisition identifiee (original source). Les sources sont standardisees et permettent une analyse fiable de l&apos;attribution." },
      { id: 10, label: "Imports controles", description: "Les imports CSV passent par un processus de validation : mapping des champs, verification des doublons, controle qualite avant injection en base." },
      { id: 11, label: "RGPD et consentement", description: "Le consentement marketing est collecte et stocke correctement. Les bases legales sont documentees. Les demandes de suppression sont traitees sous 30 jours." },
      { id: 12, label: "Score data quality mesure", description: "Un score de qualite des donnees est calcule et suivi dans le temps. Les dimensions mesurees incluent completude, exactitude, coherence et fraicheur." },
      { id: 13, label: "Proprietes custom documentees", description: "Chaque propriete custom a une description, un owner et un usage defini. Les proprietes obsoletes sont identifiees et supprimees." },
      { id: 14, label: "Associations correctement configurees", description: "Les associations entre contacts, entreprises et deals sont systematiquement creees. Les contacts orphelins (sans entreprise) representent moins de 10%." },
      { id: 15, label: "Formulaires mappes au CRM", description: "Tous les formulaires web sont connectes au CRM avec un mapping de champs correct. Aucun formulaire ne cree de proprietes en doublon ou des donnees non exploitables." },
    ],
  },
  {
    id: "cat-pipeline-vente",
    title: "Pipeline et processus de vente",
    points: 12,
    color: "#4B5EFC",
    icon: "pipeline",
    items: [
      { id: 16, label: "Stages pipeline definis et documentes", description: "Chaque stage du pipeline a une definition precise, des criteres d&apos;entree et de sortie documentes. L&apos;equipe commerciale comprend et applique ces definitions." },
      { id: 17, label: "Probabilites de closing calibrees", description: "Les probabilites de closing par stage sont basees sur des donnees historiques reelles, pas sur des estimations. Elles sont recalibrees au moins une fois par trimestre." },
      { id: 18, label: "Processus de qualification structure", description: "Un framework de qualification (BANT, MEDDIC, SPICED) est en place et utilise systematiquement. Les criteres de qualification sont documentes dans le CRM." },
      { id: 19, label: "SLA entre stages definis", description: "Des SLA de temps maximum par stage sont definis. Les deals qui depassent le SLA sont identifies et escalades automatiquement." },
      { id: 20, label: "Handoff marketing-sales documente", description: "Le processus de passage d&apos;un MQL a un SQL est documente. Les criteres de transfert sont clairs et la notification est automatique." },
      { id: 21, label: "Motifs de perte analyses", description: "Les motifs de perte (closed-lost reasons) sont obligatoires, standardises et analyses mensuellement pour identifier les patterns et ameliorer le processus." },
      { id: 22, label: "Forecast fiable et structure", description: "Le forecast utilise une methodologie consistante (weighted pipeline, commit/best case). L&apos;ecart entre forecast et realise est inferieur a 15%." },
      { id: 23, label: "Deal velocity mesuree", description: "Le temps moyen par stage et le cycle de vente total sont mesures et suivis. Les bottlenecks sont identifies et des actions correctives sont en place." },
      { id: 24, label: "Processus de relance defini", description: "Les deals stagnants declenchent des sequences de relance automatiques. Les taches de suivi sont creees automatiquement dans le CRM." },
      { id: 25, label: "Pipeline hygiene hebdomadaire", description: "Une revue de pipeline hebdomadaire est en place. Les deals obsoletes sont nettoyes, les montants mis a jour, les dates de closing ajustees." },
      { id: 26, label: "Multiple pipelines si necessaire", description: "Si l&apos;entreprise a des processus de vente differents (new business vs upsell vs renewal), des pipelines separes avec des stages adaptes sont en place." },
      { id: 27, label: "Champs obligatoires par stage", description: "Des proprietes obligatoires sont configurees a chaque changement de stage (montant, decision maker, date de closing, etc.) pour garantir la qualite des donnees." },
    ],
  },
  {
    id: "cat-marketing-ops",
    title: "Marketing operations",
    points: 12,
    color: "#6C5CE7",
    icon: "marketing",
    items: [
      { id: 28, label: "Lead generation multi-canal", description: "Au moins 3 canaux de generation de leads sont actifs et mesures (SEO, paid, social, events, referral). La dependance a un seul canal est inferieure a 50%." },
      { id: 29, label: "Lead scoring en place", description: "Un modele de lead scoring combine des criteres demographiques (fit) et comportementaux (engagement). Les seuils MQL sont definis et valides avec l&apos;equipe sales." },
      { id: 30, label: "Nurturing sequences actives", description: "Des sequences de nurturing sont en place pour chaque segment et chaque etape du funnel. Le contenu est personnalise selon le persona et le lifecycle stage." },
      { id: 31, label: "Attribution marketing mesuree", description: "Un modele d&apos;attribution (first-touch, last-touch ou multi-touch) est en place. Le ROI par canal et par campagne est mesurable." },
      { id: 32, label: "Formulaires optimises", description: "Les formulaires utilisent le progressive profiling. Le nombre de champs est adapte a l&apos;etape du funnel. Les taux de conversion sont mesures et optimises." },
      { id: 33, label: "Email deliverabilite saine", description: "Le taux de deliverabilite depasse 95%. Les hard bounces sont nettoyes automatiquement. Le domaine d&apos;envoi est authentifie (SPF, DKIM, DMARC)." },
      { id: 34, label: "Landing pages avec tracking", description: "Chaque campagne a des landing pages dediees avec UTM tracking. Les taux de conversion sont mesures et les pages sont A/B testees regulierement." },
      { id: 35, label: "Contenu mappe au funnel", description: "Le contenu marketing est organise par stage du funnel (TOFU, MOFU, BOFU). Chaque persona dispose de contenus adaptes a chaque etape." },
      { id: 36, label: "Desabonnements geres proprement", description: "Le processus de desabonnement est conforme, simple et immediat. Les preferences de communication sont granulaires (par type de contenu, par frequence)." },
      { id: 37, label: "Campagnes trackees dans le CRM", description: "Chaque campagne marketing est creee dans le CRM avec des objectifs, un budget et des resultats mesures. Le cout par lead par campagne est calculable." },
      { id: 38, label: "Webinaires et events integres", description: "Les inscriptions et participations aux events sont automatiquement remontees dans le CRM. Le suivi post-event est automatise." },
      { id: 39, label: "Reporting marketing-sales partage", description: "Un dashboard commun marketing-sales montre le funnel complet, de la visite au deal gagne. Les deux equipes ont acces aux memes donnees." },
    ],
  },
  {
    id: "cat-automatisation",
    title: "Automatisation",
    points: 10,
    color: "#FF7A59",
    icon: "automation",
    items: [
      { id: 40, label: "Workflows de lifecycle automatises", description: "Les transitions de lifecycle stage (subscriber → lead → MQL → SQL → opportunity → customer) sont automatisees avec des criteres clairs." },
      { id: 41, label: "Assignment leads automatique", description: "Les leads sont distribues automatiquement aux commerciaux selon des regles definies (territoire, taille, secteur, round-robin). Aucun lead ne reste non assigne." },
      { id: 42, label: "Sequences commerciales configurees", description: "Des sequences de prospection et de suivi sont en place dans le CRM. Les commerciaux les utilisent et les taux de reponse sont mesures." },
      { id: 43, label: "Notifications et alertes automatiques", description: "Les evenements cles (nouveau lead, deal qui avance, deal a risque, visite sur le site) declenchent des notifications automatiques aux bonnes personnes." },
      { id: 44, label: "Taches creees automatiquement", description: "Les taches de suivi, de relance et de qualification sont creees automatiquement avec des deadlines. Le taux de completion des taches est mesure." },
      { id: 45, label: "Integration outils connectee", description: "Les outils de la stack (CRM, emailing, calendrier, facturation, support) sont connectes. Les donnees circulent automatiquement sans saisie manuelle en doublon." },
      { id: 46, label: "Onboarding client automatise", description: "Le passage de deal gagne a client actif est automatise : creation du projet, envoi du kit de bienvenue, attribution au CSM, mise a jour du lifecycle." },
      { id: 47, label: "Workflows documentes et maintenus", description: "Chaque workflow est documente (objectif, declencheur, actions, owner). Une revue trimestrielle verifie que les workflows sont toujours pertinents et fonctionnels." },
      { id: 48, label: "Chatbot ou live chat en place", description: "Un chatbot ou un live chat qualifie les visiteurs en temps reel. Les conversations sont loguees dans le CRM et les leads qualifies sont routes automatiquement." },
      { id: 49, label: "Taches manuelles repetitives eliminees", description: "Les taches manuelles repetitives (saisie de donnees, envoi d&apos;emails de suivi, creation de rapports) sont identifiees et automatisees. Le temps gagne est mesure." },
    ],
  },
  {
    id: "cat-reporting",
    title: "Reporting et analytics",
    points: 10,
    color: "#EAB308",
    icon: "chart",
    items: [
      { id: 50, label: "Dashboard pipeline en temps reel", description: "Un dashboard pipeline montre en temps reel la valeur par stage, le nombre de deals, les taux de conversion inter-stages et la velocite. Il est consulte quotidiennement." },
      { id: 51, label: "KPIs definis et documentes", description: "Les KPIs cles (CAC, LTV, conversion rates, cycle de vente, win rate, churn) sont definis, mesures automatiquement et revus mensuellement." },
      { id: 52, label: "Reporting par commercial", description: "Chaque commercial a un dashboard individuel avec ses KPIs personnels : activites, pipeline, win rate, deal velocity, quota attainment." },
      { id: 53, label: "Funnel marketing complet", description: "Le funnel est mesure de bout en bout : visiteurs → leads → MQL → SQL → opportunity → client. Les taux de conversion entre chaque etape sont suivis." },
      { id: 54, label: "Forecast vs realise suivi", description: "L&apos;ecart entre le forecast et le revenue realise est mesure chaque mois. Les causes d&apos;ecart sont analysees et les actions correctives identifiees." },
      { id: 55, label: "Reporting revenue recurrent", description: "Si applicable, le MRR/ARR est suivi avec ses composantes : new business, expansion, contraction, churn. Les tendances sont analysees mensuellement." },
      { id: 56, label: "Rapports automatises et distribues", description: "Les rapports cles sont generes et envoyes automatiquement aux stakeholders a frequence fixe (quotidien, hebdomadaire, mensuel)." },
      { id: 57, label: "Donnees actionnables et non vanity", description: "Les metriques suivies sont des metriques actionnables (conversion rates, pipeline velocity) et non des vanity metrics (nombre de contacts total, emails envoyes)." },
      { id: 58, label: "Cohort analysis en place", description: "Les performances sont analysees par cohorte (mois d&apos;acquisition, segment, canal) pour identifier les tendances et optimiser l&apos;allocation des ressources." },
      { id: 59, label: "Revue de performance reguliere", description: "Une revue de performance structuree a lieu au moins mensuellement. Les donnees guident les decisions strategiques et operationnelles." },
    ],
  },
  {
    id: "cat-alignement",
    title: "Alignement equipes",
    points: 10,
    color: "#EC4899",
    icon: "team",
    items: [
      { id: 60, label: "SLA marketing-sales formalise", description: "Un SLA ecrit definit les engagements reciproques : volume et qualite des MQL fournis par le marketing, delai et processus de traitement par les sales." },
      { id: 61, label: "Definitions communes documentees", description: "Les termes cles (MQL, SQL, opportunity, customer) ont une definition unique partagee et comprise par les deux equipes. Ces definitions sont ecrites." },
      { id: 62, label: "Meeting revenus regulier", description: "Un meeting revenue regulier (hebdomadaire ou bi-mensuel) reunit marketing, sales et direction pour revoir les KPIs, le pipeline et les actions en cours." },
      { id: 63, label: "Feedback loop sales → marketing", description: "Les commerciaux remontent regulierement des feedbacks structures sur la qualite des leads, les objections recurrentes et les besoins en contenu." },
      { id: 64, label: "Feedback loop marketing → sales", description: "Le marketing partage les insights sur le comportement des prospects (contenus consommes, pages visitees, engagement) avant les appels commerciaux." },
      { id: 65, label: "Objectifs revenue partages", description: "Marketing et sales partagent un objectif de revenue commun, pas uniquement des objectifs de volume (leads) ou d&apos;activite (appels). L&apos;objectif final est le CA." },
      { id: 66, label: "Processus d&apos;escalade defini", description: "Quand un lead n&apos;est pas traite dans les delais ou quand la qualite des leads est insuffisante, un processus d&apos;escalade clair est en place." },
      { id: 67, label: "Onboarding RevOps pour nouveaux", description: "Les nouveaux collaborateurs (marketing et sales) recoivent une formation sur les processus RevOps, les outils et les definitions communes des leur arrivee." },
      { id: 68, label: "Customer success integre au funnel", description: "L&apos;equipe customer success est integree dans le processus RevOps. Les donnees post-vente (adoption, satisfaction, expansion) sont trackees dans le CRM." },
      { id: 69, label: "Documentation des processus a jour", description: "Les processus cles (qualification, handoff, escalade, onboarding) sont documentes dans un wiki accessible et mis a jour au moins trimestriellement." },
    ],
  },
  {
    id: "cat-stack-tech",
    title: "Stack technologique",
    points: 6,
    color: "#14B8A6",
    icon: "stack",
    items: [
      { id: 70, label: "Audit des outils realise", description: "Un inventaire complet des outils utilises par les equipes revenue est realise. Les doublons, les outils sous-utilises et les manques sont identifies." },
      { id: 71, label: "Integrations fonctionnelles", description: "Les integrations entre outils fonctionnent correctement. Les donnees circulent sans erreur et sans delai excessif. Les integrations sont monitorees." },
      { id: 72, label: "Adoption des outils mesuree", description: "Le taux d&apos;adoption de chaque outil est mesure (connexions, usage des fonctionnalites cles). Les outils sous-utilises sont identifies et le plan d&apos;action adapte." },
      { id: 73, label: "SSO et securite en place", description: "Les outils critiques sont securises : SSO, 2FA, permissions par role. Les acces des anciens collaborateurs sont revoques systematiquement." },
      { id: 74, label: "Stack rationalisee", description: "La stack est rationalisee : pas de doublons fonctionnels, pas d&apos;outils redondants. Chaque outil a un role clair et un owner identifie." },
      { id: 75, label: "Budget tech optimise", description: "Le budget tech est revu annuellement. Le ROI de chaque outil est evalue. Les licences inutilisees sont identifiees et resiliees." },
    ],
  },
  {
    id: "cat-ia-innovation",
    title: "IA et innovation",
    points: 5,
    color: "#8B5CF6",
    icon: "ai",
    items: [
      { id: 76, label: "IA utilisee dans le processus commercial", description: "L&apos;IA est utilisee pour au moins une tache du processus commercial : redaction d&apos;emails, recherche de prospects, analyse de calls, resume de meetings." },
      { id: 77, label: "Agents IA en place ou en test", description: "Au moins un agent IA est en place ou en phase de test pour automatiser des taches complexes : qualification automatique, enrichissement, analyse de pipeline." },
      { id: 78, label: "Donnees structurees pour l&apos;IA", description: "Les donnees du CRM sont suffisamment structurees et propres pour alimenter des modeles d&apos;IA (scoring predictif, forecasting, recommandations)." },
      { id: 79, label: "Veille techno active", description: "L&apos;equipe realise une veille active sur les innovations RevOps et IA. Les nouveaux outils et pratiques sont evalues et testes regulierement." },
      { id: 80, label: "Niveau d&apos;automatisation avance", description: "Plus de 70% des taches repetitives du processus revenue sont automatisees. L&apos;equipe se concentre sur les taches a haute valeur ajoutee." },
    ],
  },
];

const maturityLevels = [
  { range: "0-25", label: "Debutant", color: "#EF4444", bgColor: "#FEF2F2", borderColor: "#FECACA", description: "Les bases ne sont pas en place. Le CRM est un carnet d&apos;adresses glorifie, les processus sont informels et les equipes travaillent en silos. Les donnees sont peu fiables et le reporting quasi inexistant." },
  { range: "25-50", label: "En construction", color: "#EAB308", bgColor: "#FEFCE8", borderColor: "#FEF08A", description: "Les fondations sont posees mais fragiles. Certains processus existent, le CRM est utilise mais mal exploite. Le reporting est partiel et les equipes commencent a se parler mais sans cadre formalise." },
  { range: "50-75", label: "Structure", color: "#4B5EFC", bgColor: "#EEF2FF", borderColor: "#C7D2FE", description: "Les processus sont en place et documentes. Le CRM est bien configure, les equipes sont alignees avec des SLA et des definitions communes. Le reporting guide les decisions. Les optimisations sont possibles." },
  { range: "75-100", label: "Optimise", color: "#22C55E", bgColor: "#F0FDF4", borderColor: "#BBF7D0", description: "L&apos;excellence operationnelle. Les processus sont automatises et optimises en continu. Les donnees sont propres et actionnables. L&apos;IA est utilisee pour augmenter les performances. La revenue machine tourne a plein regime." },
];

export default function AuditRevOpsChecklistPage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("pourquoi-audit");
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [gaugeScore] = useState(67);

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

  const toggleCategory = (catId: string) => {
    setOpenCategories((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  const gaugeRotation = (gaugeScore / 100) * 180 - 90;

  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
        <div className="h-full bg-[#FF7A59] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "4%", width: 300, height: 300, borderRadius: "50%", background: "#FF7A59", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "12%", width: 280, height: 280, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "25%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "38%", width: 300, height: 300, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "52%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "2%", top: "65%", width: 260, height: 260, borderRadius: "50%", background: "#4B5EFC", opacity: 0.07, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "5%", top: "78%", width: 240, height: 240, borderRadius: "50%", background: "#22C55E", opacity: 0.06, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "90%", width: 260, height: 260, borderRadius: "50%", background: "#8B5CF6", opacity: 0.06, filter: "blur(70px)" }} />

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
                        ? "border-[#FF7A59] text-[#111] font-medium"
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
                  <a href="https://twitter.com/intent/tweet?text=Audit%20RevOps%20%3A%20la%20checklist%20complete%20(80%20points)&url=https://www.ceres-revops.com/blog/audit-revops-checklist-complete" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/audit-revops-checklist-complete" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Audit RevOps checklist</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>RevOps</Badge>
                <span className="text-[11px] text-[#CCC]">18 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Audit RevOps : la checklist complete (80 points)
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Votre CRM est rempli, vos equipes travaillent dur, les outils sont en place. Pourtant les resultats ne suivent pas. Pipeline flou, forecast imprecis, leads qui se perdent entre marketing et sales, reporting approximatif. Le probleme n&apos;est pas l&apos;effort. C&apos;est l&apos;absence d&apos;un diagnostic rigoureux de vos operations revenue. Cet article est la checklist d&apos;audit RevOps la plus complete en francais : 80 points de controle, repartis en 8 categories, avec une methodologie de scoring et des recommandations par niveau de maturite. C&apos;est exactement la grille que nous utilisons chez Ceres pour auditer les operations de nos clients.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>18 mars 2026</span>
              </div>
            </header>

            <article>
              {/* Section 1 : Pourquoi faire un audit RevOps */}
              <section id="pourquoi-audit" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi faire un audit RevOps</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Un audit RevOps n&apos;est pas un luxe reserve aux grandes entreprises. C&apos;est un diagnostic necessaire des que votre croissance commence a ralentir sans raison apparente, ou des que vos equipes passent plus de temps a se battre avec les outils qu&apos;a vendre.</p>
                    <p>Voici les symptomes les plus courants qui indiquent qu&apos;un audit est necessaire :</p>
                  </div>

                  {/* Symptomes cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 mb-6">
                    {[
                      { symptom: "Pipeline imprecis", detail: "Le montant total du pipeline change radicalement d&apos;une semaine a l&apos;autre. Les deals restent dans les memes stages pendant des mois. Le forecast est un exercice de fiction." },
                      { symptom: "Leads perdus entre les equipes", detail: "Le marketing genere des leads mais les commerciaux se plaignent de la qualite. Les MQL ne sont pas traites dans les temps. Personne ne sait qui doit faire quoi." },
                      { symptom: "Reporting chronophage et peu fiable", detail: "Creer un rapport prend des heures de compilation manuelle. Les chiffres ne correspondent pas entre le marketing et les sales. Personne ne fait confiance aux donnees." },
                      { symptom: "CRM sous-exploite", detail: "L&apos;equipe utilise 20% des fonctionnalites du CRM. Les commerciaux saisissent le minimum vital. Les donnees sont incompletes, obsoletes ou en doublon." },
                      { symptom: "Automatisations absentes ou cassees", detail: "Les taches repetitives sont faites a la main. Les workflows existants ne fonctionnent plus correctement. L&apos;equipe ne sait pas quels workflows sont actifs." },
                      { symptom: "Decisions prises au doigt mouille", detail: "Les decisions strategiques (recruter un commercial, investir dans un canal) sont prises sans donnees fiables. Le gut feeling remplace l&apos;analyse." },
                    ].map((s) => (
                      <div key={s.symptom} className="rounded-lg border border-[#F2F2F2] bg-[#FAFAFA] p-4">
                        <p className="text-[12px] font-semibold text-[#111] mb-2">{s.symptom}</p>
                        <p className="text-[11px] text-[#777] leading-[1.6]">{s.detail}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p><strong className="text-[#111]">Le bon timing pour un audit.</strong> L&apos;ideal est d&apos;auditer vos operations revenue a trois moments cles : quand vous atteignez un palier de croissance (passage de 5 a 15 commerciaux par exemple), lors d&apos;un changement d&apos;outil majeur (migration CRM, nouveau marketing automation), ou quand les resultats stagnent malgre des investissements croissants en sales et marketing.</p>
                    <p><strong className="text-[#111]">Le ROI d&apos;un audit.</strong> Les entreprises qui realisent un audit RevOps complet constatent en moyenne une amelioration de 15 a 25% de leur taux de conversion pipeline, une reduction de 20% de leur cycle de vente, et une augmentation de 30% de la productivite commerciale. Le retour sur investissement est generalement visible des le premier trimestre post-audit.</p>
                  </div>

                  {/* ROI bubble cards */}
                  <div className="grid grid-cols-3 gap-3 mt-5">
                    {[
                      { stat: "+15-25%", label: "Taux de conversion", color: "#22C55E" },
                      { stat: "-20%", label: "Cycle de vente", color: "#4B5EFC" },
                      { stat: "+30%", label: "Productivite commerciale", color: "#FF7A59" },
                    ].map((r) => (
                      <div key={r.label} className="rounded-lg border border-[#F2F2F2] bg-[#FAFAFA] p-4 text-center">
                        <p className="text-[18px] font-bold mb-1" style={{ color: r.color }}>{r.stat}</p>
                        <p className="text-[10px] text-[#999]">{r.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <Connector />

              {/* Section 2 : Methodologie de scoring */}
              <section id="methodologie-scoring" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Notre methodologie de scoring</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Notre audit utilise un scoring sur 100 points repartis en 8 categories. Chaque point de controle est evalue sur une echelle de 0 (inexistant), 0.5 (partiel) ou 1 (en place et fonctionnel). Le score total est pondere pour reflechir l&apos;importance relative de chaque categorie dans la performance revenue globale.</p>
                    <p>Cette methodologie est le fruit de dizaines d&apos;audits realises chez Ceres. Les ponderations reflectent notre experience : les fondations (CRM, donnees, pipeline) comptent plus que les aspects avances (IA, innovation) parce que sans fondations solides, les couches superieures ne peuvent pas fonctionner.</p>
                  </div>

                  {/* Gauge mockup */}
                  <div className="flex justify-center my-8">
                    <div className="relative w-[220px] h-[130px]">
                      {/* Gauge background arc */}
                      <svg width="220" height="130" viewBox="0 0 220 130" className="absolute inset-0">
                        {/* Background arc */}
                        <path d="M 20 120 A 90 90 0 0 1 200 120" fill="none" stroke="#F0F0F0" strokeWidth="16" strokeLinecap="round" />
                        {/* Red zone 0-25 */}
                        <path d="M 20 120 A 90 90 0 0 1 42.32 52.32" fill="none" stroke="#EF4444" strokeWidth="16" strokeLinecap="round" opacity="0.3" />
                        {/* Yellow zone 25-50 */}
                        <path d="M 42.32 52.32 A 90 90 0 0 1 110 30" fill="none" stroke="#EAB308" strokeWidth="16" strokeLinecap="round" opacity="0.3" />
                        {/* Blue zone 50-75 */}
                        <path d="M 110 30 A 90 90 0 0 1 177.68 52.32" fill="none" stroke="#4B5EFC" strokeWidth="16" strokeLinecap="round" opacity="0.3" />
                        {/* Green zone 75-100 */}
                        <path d="M 177.68 52.32 A 90 90 0 0 1 200 120" fill="none" stroke="#22C55E" strokeWidth="16" strokeLinecap="round" opacity="0.3" />
                      </svg>
                      {/* Needle */}
                      <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-[4px] h-[80px] origin-bottom transition-transform duration-1000" style={{ transform: `translateX(-50%) rotate(${gaugeRotation}deg)` }}>
                        <div className="w-full h-full bg-gradient-to-t from-[#111] to-[#555] rounded-full" />
                      </div>
                      {/* Center dot */}
                      <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full bg-[#111] border-2 border-white shadow" />
                      {/* Score display */}
                      <div className="absolute -bottom-[30px] left-1/2 -translate-x-1/2 text-center">
                        <p className="text-[24px] font-bold text-[#111]">{gaugeScore}<span className="text-[14px] text-[#999] font-normal">/100</span></p>
                        <p className="text-[10px] text-[#999] mt-0.5">Score exemple</p>
                      </div>
                      {/* Labels */}
                      <p className="absolute bottom-0 left-0 text-[9px] text-[#CCC]">0</p>
                      <p className="absolute -top-1 left-1/2 -translate-x-1/2 text-[9px] text-[#CCC]">50</p>
                      <p className="absolute bottom-0 right-0 text-[9px] text-[#CCC]">100</p>
                    </div>
                  </div>

                  {/* Scoring breakdown */}
                  <div className="mt-14 mb-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Repartition des 100 points</p>
                    <div className="space-y-2">
                      {checklistCategories.map((cat) => (
                        <div key={cat.id} className="flex items-center gap-3">
                          <div className="w-[120px] sm:w-[160px] text-[11px] text-[#666] truncate">{cat.title}</div>
                          <div className="flex-1 h-[6px] rounded-full bg-[#F5F5F5] overflow-hidden">
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${cat.points}%`, background: cat.color }} />
                          </div>
                          <div className="w-[40px] text-right text-[11px] font-semibold" style={{ color: cat.color }}>{cat.points} pts</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mt-6">
                    <p><strong className="text-[#111]">Comment utiliser cette checklist.</strong> Parcourez chaque categorie et evaluez honnement chaque point : 0 si le point n&apos;est pas du tout en place, 0.5 si c&apos;est partiellement fait, 1 si c&apos;est pleinement operationnel. Additionnez vos points pour obtenir votre score global. Referez-vous ensuite a la section &quot;Interpreter votre score&quot; pour comprendre votre niveau de maturite et savoir par ou commencer.</p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* Checklist categories - collapsible sections */}
              {checklistCategories.map((cat, catIndex) => (
                <section key={cat.id} id={cat.id} className="mb-8">
                  <div className="rounded-lg border border-[#EAEAEA] bg-white shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] overflow-hidden">
                    {/* Category header - clickable */}
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className="w-full p-5 md:p-8 flex items-center justify-between text-left hover:bg-[#FAFAFA] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[14px] font-bold shrink-0" style={{ background: cat.color }}>
                          {catIndex + 1}
                        </div>
                        <div>
                          <h2 className="text-[17px] font-semibold text-[#111]">Categorie {catIndex + 1} : {cat.title}</h2>
                          <p className="text-[12px] text-[#999] mt-0.5">{cat.items.length} points de controle / {cat.points} points</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium" style={{ background: `${cat.color}15`, color: cat.color }}>
                          {cat.points} pts
                        </div>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#999"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-transform duration-300 ${openCategories[cat.id] ? "rotate-180" : ""}`}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </button>

                    {/* Collapsible content */}
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        openCategories[cat.id] ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-5 md:px-8 pb-5 md:pb-8 border-t border-[#F2F2F2]">
                        <div className="space-y-3 mt-5">
                          {cat.items.map((item, idx) => (
                            <div key={item.id} className="group rounded-lg border border-[#F2F2F2] hover:border-[#E0E0E0] p-4 transition-colors">
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-lg border-2 border-[#E0E0E0] flex items-center justify-center shrink-0 mt-0.5 group-hover:border-current transition-colors" style={{ color: cat.color }}>
                                  <span className="text-[9px] font-bold text-[#CCC] group-hover:hidden">{idx + 1}</span>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="hidden group-hover:block"><path d="M20 6 9 17l-5-5" /></svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[12px] font-semibold text-[#111] mb-1">{item.label}</p>
                                  <p className="text-[11px] text-[#777] leading-[1.6]">{item.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add connector between certain categories */}
                  {catIndex === 3 && <div className="mb-8"><Connector /></div>}
                  {catIndex === 5 && <div className="mb-8"><Connector /></div>}
                </section>
              ))}

              <Connector />

              {/* Section : Interpreter votre score */}
              <section id="interpreter-score" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Interpreter votre score</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Votre score total sur 100 vous positionne sur l&apos;un des quatre niveaux de maturite RevOps. Chaque niveau correspond a un stade de developpement de vos operations revenue, avec des priorites et des actions differentes.</p>
                  </div>

                  {/* Maturity level visualization */}
                  <div className="relative mb-6">
                    {/* Progress bar visualization */}
                    <div className="flex rounded-full overflow-hidden h-[8px] mb-4">
                      <div className="w-1/4 bg-[#EF4444]" />
                      <div className="w-1/4 bg-[#EAB308]" />
                      <div className="w-1/4 bg-[#4B5EFC]" />
                      <div className="w-1/4 bg-[#22C55E]" />
                    </div>
                    <div className="flex justify-between text-[9px] text-[#CCC] mb-8">
                      <span>0</span>
                      <span>25</span>
                      <span>50</span>
                      <span>75</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Maturity cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {maturityLevels.map((level) => (
                      <div key={level.label} className="rounded-lg border p-5" style={{ borderColor: level.borderColor, background: level.bgColor }}>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold" style={{ background: level.color }}>
                            {level.range.split("-")[0]}
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold" style={{ color: level.color }}>{level.label}</p>
                            <p className="text-[10px] text-[#999]">{level.range} points</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-[#666] leading-[1.6]">{level.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mt-6">
                    <p>La majorite des entreprises B2B que nous auditons se situent entre 25 et 55 points. Ne soyez pas decourage par un score bas : c&apos;est justement le but de l&apos;audit. Identifier les lacunes est la premiere etape pour les combler. Et les gains les plus importants sont souvent les plus faciles a realiser.</p>
                  </div>
                </div>
              </section>

              <Connector />

              {/* Section : Quick wins par score */}
              <section id="quick-wins" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les quick wins par niveau de score</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75] mb-6">
                    <p>Selon votre score, les priorites ne sont pas les memes. Voici les actions a mettre en place en premier pour chaque niveau de maturite. L&apos;objectif n&apos;est pas de tout faire en meme temps, mais de commencer par les fondations qui auront le plus d&apos;impact.</p>
                  </div>

                  {/* Quick wins by level */}
                  <div className="space-y-4">
                    {/* Debutant */}
                    <div className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                        <p className="text-[13px] font-semibold text-[#EF4444]">Score 0-25 : poser les fondations</p>
                      </div>
                      <div className="space-y-2 text-[11px] text-[#666] leading-[1.6]">
                        <div className="flex items-start gap-2"><span className="text-[#EF4444] shrink-0 mt-0.5">1.</span><span>Definir les lifecycle stages et les criteres de passage d&apos;un stage a l&apos;autre. C&apos;est la fondation de tout le reste.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#EF4444] shrink-0 mt-0.5">2.</span><span>Nettoyer et standardiser les proprietes CRM essentielles (contacts et entreprises). Supprimer les doublons evidents.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#EF4444] shrink-0 mt-0.5">3.</span><span>Documenter le pipeline de vente avec des definitions claires pour chaque stage. Former l&apos;equipe.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#EF4444] shrink-0 mt-0.5">4.</span><span>Mettre en place un dashboard pipeline basique avec les metriques essentielles (volume, valeur, conversion).</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#EF4444] shrink-0 mt-0.5">5.</span><span>Organiser un premier meeting revenue hebdomadaire avec marketing et sales dans la meme salle.</span></div>
                      </div>
                    </div>

                    {/* En construction */}
                    <div className="rounded-lg border border-[#FEF08A] bg-[#FEFCE8] p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#EAB308]" />
                        <p className="text-[13px] font-semibold text-[#EAB308]">Score 25-50 : structurer les processus</p>
                      </div>
                      <div className="space-y-2 text-[11px] text-[#666] leading-[1.6]">
                        <div className="flex items-start gap-2"><span className="text-[#EAB308] shrink-0 mt-0.5">1.</span><span>Mettre en place le lead scoring pour prioriser les leads et definir les criteres MQL avec les sales.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#EAB308] shrink-0 mt-0.5">2.</span><span>Automatiser les transitions de lifecycle et l&apos;assignment des leads. Eliminer les taches manuelles repetitives.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#EAB308] shrink-0 mt-0.5">3.</span><span>Formaliser le SLA marketing-sales par ecrit. Definir les engagements reciproques et les mecanismes de feedback.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#EAB308] shrink-0 mt-0.5">4.</span><span>Deployer des sequences commerciales dans le CRM pour standardiser le suivi et la relance des prospects.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#EAB308] shrink-0 mt-0.5">5.</span><span>Mettre en place le tracking d&apos;attribution marketing pour mesurer le ROI par canal.</span></div>
                      </div>
                    </div>

                    {/* Structure */}
                    <div className="rounded-lg border border-[#C7D2FE] bg-[#EEF2FF] p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#4B5EFC]" />
                        <p className="text-[13px] font-semibold text-[#4B5EFC]">Score 50-75 : optimiser et automatiser</p>
                      </div>
                      <div className="space-y-2 text-[11px] text-[#666] leading-[1.6]">
                        <div className="flex items-start gap-2"><span className="text-[#4B5EFC] shrink-0 mt-0.5">1.</span><span>Auditer et rationaliser la stack technologique. Eliminer les doublons, optimiser les integrations.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#4B5EFC] shrink-0 mt-0.5">2.</span><span>Mettre en place la cohort analysis pour identifier les patterns de conversion par segment et par canal.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#4B5EFC] shrink-0 mt-0.5">3.</span><span>Automatiser le reporting : rapports generes et distribues automatiquement aux stakeholders.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#4B5EFC] shrink-0 mt-0.5">4.</span><span>Deployer le multi-touch attribution pour comprendre le parcours complet avant conversion.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#4B5EFC] shrink-0 mt-0.5">5.</span><span>Documenter tous les processus dans un wiki central et mettre en place un onboarding RevOps pour les nouveaux.</span></div>
                      </div>
                    </div>

                    {/* Optimise */}
                    <div className="rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                        <p className="text-[13px] font-semibold text-[#22C55E]">Score 75-100 : innover et scaler</p>
                      </div>
                      <div className="space-y-2 text-[11px] text-[#666] leading-[1.6]">
                        <div className="flex items-start gap-2"><span className="text-[#22C55E] shrink-0 mt-0.5">1.</span><span>Deployer des agents IA pour automatiser les taches complexes : qualification, enrichissement, analyse de pipeline.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#22C55E] shrink-0 mt-0.5">2.</span><span>Mettre en place le predictive scoring et le forecast assiste par IA pour gagner en precision.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#22C55E] shrink-0 mt-0.5">3.</span><span>Optimiser en continu avec des A/B tests systematiques sur les sequences, les workflows et le contenu.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#22C55E] shrink-0 mt-0.5">4.</span><span>Construire un revenue model predictif qui anticipe le pipeline et le revenue 2 a 3 trimestres en avance.</span></div>
                        <div className="flex items-start gap-2"><span className="text-[#22C55E] shrink-0 mt-0.5">5.</span><span>Devenir une organisation revenue-led : chaque decision est guidee par les donnees et chaque processus est optimise en continu.</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <Connector />

              {/* Section : Notre audit chez Ceres - Dark section */}
              <section id="audit-ceres" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-[#FF7A59]/20 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    </div>
                    <h2 className="text-[17px] font-semibold text-white">Notre audit RevOps chez Ceres</h2>
                  </div>
                  <div className="space-y-3 text-[13px] text-[#999] leading-[1.75] mb-6">
                    <p>La checklist que vous venez de lire est exactement la grille que nous utilisons chez Ceres pour auditer les operations revenue de nos clients. Mais un audit professionnel va au-dela d&apos;une simple checklist. C&apos;est l&apos;analyse contextuelle, l&apos;experience accumulee et la capacite a prioriser qui font la difference entre un diagnostic et un plan d&apos;action actionnable.</p>
                    <p>Voici ce que nos clients recoivent concretement quand ils font appel a notre service d&apos;audit RevOps :</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {[
                      { title: "Audit complet 80 points", desc: "Evaluation detaillee de chacun des 80 points de cette checklist, adaptee a votre contexte metier, votre taille d&apos;equipe et vos objectifs de croissance. Score global et scores par categorie.", color: "#FF7A59" },
                      { title: "Cartographie des processus", desc: "Mapping visuel de vos processus revenue actuels : du premier touchpoint marketing jusqu&apos;au renouvellement client. Identification des goulots d&apos;etranglement et des ruptures.", color: "#4B5EFC" },
                      { title: "Benchmark sectoriel", desc: "Comparaison de vos scores avec les benchmarks de votre secteur et de votre taille d&apos;entreprise. Identification des ecarts et des opportunites prioritaires.", color: "#6C5CE7" },
                      { title: "Plan d&apos;action priorise", desc: "Un document de 20 a 30 pages avec les actions correctives classees par impact et effort. Quick wins immediats, projets a moyen terme et vision strategique a 12 mois.", color: "#22C55E" },
                      { title: "Atelier de restitution", desc: "Presentation des resultats en atelier avec les equipes marketing, sales et direction. Discussion des priorites, validation du plan d&apos;action et definition du calendrier.", color: "#EAB308" },
                      { title: "Suivi a 90 jours", desc: "Un point de suivi 90 jours apres la restitution pour mesurer les progres, ajuster les priorites et verifier que les quick wins ont ete implementes correctement.", color: "#EC4899" },
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

                  {/* Timeline */}
                  <div className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4 mb-6">
                    <p className="text-[12px] font-semibold text-white mb-4">Timeline type de notre audit</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {[
                        { week: "Semaine 1", task: "Collecte des acces et premiere analyse des donnees CRM, pipeline et reporting", color: "#FF7A59" },
                        { week: "Semaine 2", task: "Interviews des equipes marketing, sales et management. Observation des processus en action", color: "#4B5EFC" },
                        { week: "Semaine 3", task: "Scoring des 80 points, redaction du rapport et preparation du plan d&apos;action priorise", color: "#6C5CE7" },
                        { week: "Semaine 4", task: "Atelier de restitution avec les parties prenantes et lancement des quick wins", color: "#22C55E" },
                      ].map((step) => (
                        <div key={step.week} className="flex-1 relative">
                          <div className="w-3 h-3 rounded-full mb-2" style={{ background: step.color }} />
                          <p className="text-[11px] font-semibold text-white mb-1">{step.week}</p>
                          <p className="text-[10px] text-[#666] leading-[1.5]">{step.task}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="rounded-lg border border-[#333] bg-[#1A1A1A] p-4 mb-6">
                    <p className="text-[12px] font-semibold text-white mb-3">Resultats moyens constates chez nos clients post-audit</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { stat: "+22%", label: "Taux de conversion", color: "#22C55E" },
                        { stat: "-18%", label: "Cycle de vente", color: "#4B5EFC" },
                        { stat: "+35%", label: "Productivite sales", color: "#FF7A59" },
                        { stat: "98%", label: "Satisfaction client", color: "#6C5CE7" },
                      ].map((r) => (
                        <div key={r.label} className="text-center">
                          <p className="text-[18px] font-bold mb-1" style={{ color: r.color }}>{r.stat}</p>
                          <p className="text-[10px] text-[#666]">{r.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 text-[13px] text-[#999] leading-[1.75]">
                    <p>L&apos;audit est la premiere etape de toute mission d&apos;optimisation RevOps. Sans diagnostic precis, vous risquez d&apos;investir du temps et de l&apos;argent sur les mauvais sujets. Notre audit vous donne la vision claire et le plan d&apos;action dont vous avez besoin pour transformer vos operations revenue.</p>
                    <p>Le prix de l&apos;audit depend de la complexite de votre setup (nombre d&apos;outils, taille des equipes, nombre de pipelines). Mais une chose est certaine : le cout de ne pas auditer est toujours superieur au cout de l&apos;audit lui-meme.</p>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <div className="mb-12 rounded-lg bg-gradient-to-br from-[#111] to-[#1A1A1A] p-6 md:p-8 text-center border border-[#333]">
                <h3 className="text-[17px] font-semibold text-white mb-3">Pret a auditer vos operations revenue ?</h3>
                <p className="text-[13px] text-[#999] leading-[1.7] mb-5 max-w-[500px] mx-auto">Chez Ceres, on audite vos operations revenue avec la meme rigueur et la meme grille que celle de cet article. Un diagnostic chiffre en 4 semaines, un plan d&apos;action priorise et un suivi a 90 jours. Commencez par un appel de 30 minutes pour evaluer votre niveau de maturite RevOps.</p>
                <Link href="https://calendly.com/ceres-revops/30min" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FF7A59] text-white rounded-lg text-[13px] font-medium hover:bg-[#E8694D] transition-colors">
                  Demander un audit RevOps gratuit
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
                        <p className="text-[12px] font-medium text-[#111] group-hover:text-[#FF7A59] transition-colors leading-[1.4]">{a.title}</p>
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