"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";

/* ------------------------------------------------------------------ */
/*  JSON-LD                                                            */
/* ------------------------------------------------------------------ */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glossaire RevOps",
  description: "Tous les termes essentiels du RevOps, CRM, Sales, Marketing et IA expliques simplement.",
  url: "https://ceres-revops.fr/glossaire",
  publisher: { "@type": "Organization", name: "Ceres", url: "https://ceres-revops.fr" },
};

/* ------------------------------------------------------------------ */
/*  Terms data                                                         */
/* ------------------------------------------------------------------ */
type Term = { term: string; slug: string; definition: string; category: string; related?: string[]; blogLink?: string };

const categories = [
  { key: "all", label: "Tout", color: "#111" },
  { key: "revops", label: "RevOps", color: "#FF7A59" },
  { key: "crm", label: "CRM & Sales", color: "#4B5EFC" },
  { key: "marketing", label: "Marketing", color: "#6C5CE7" },
  { key: "data", label: "Data & Analytics", color: "#22C55E" },
  { key: "ia", label: "IA & Automatisation", color: "#6D00CC" },
];

const catColors: Record<string, string> = { revops: "#FF7A59", crm: "#4B5EFC", marketing: "#6C5CE7", data: "#22C55E", ia: "#6D00CC" };

const terms: Term[] = [
  // A
  { term: "ABM (Account-Based Marketing)", slug: "abm", definition: "Strategie marketing B2B qui concentre les ressources sur un ensemble de comptes cibles identifies, plutot que de cibler un marche large. L\u2019ABM aligne marketing et sales autour de comptes prioritaires avec des messages ultra-personnalises.", category: "marketing", related: ["ICP", "Lead Scoring", "MQL"], blogLink: "/blog/account-based-marketing-guide" },
  { term: "ACV (Annual Contract Value)", slug: "acv", definition: "Valeur annuelle moyenne d\u2019un contrat client. Se calcule en divisant la valeur totale du contrat par sa duree en annees. Metrique cle pour les entreprises SaaS et les modeles par abonnement.", category: "data", related: ["ARR", "MRR", "LTV"] },
  { term: "API (Application Programming Interface)", slug: "api", definition: "Interface de programmation qui permet a deux logiciels de communiquer entre eux. En RevOps, les API connectent le CRM aux outils d\u2019enrichissement, d\u2019automatisation et de reporting.", category: "ia", related: ["Integration", "iPaaS", "Webhook"] },
  { term: "ARR (Annual Recurring Revenue)", slug: "arr", definition: "Revenu recurrent annuel. C\u2019est le MRR multiplie par 12. Metrique fondamentale pour valoriser une entreprise SaaS et prevoir la croissance.", category: "data", related: ["MRR", "NRR", "Churn"], blogLink: "/blog/gerer-mrr-revenu-recurrent-hubspot" },
  { term: "Attribution", slug: "attribution", definition: "Processus qui identifie quels canaux, campagnes ou touchpoints ont contribue a une conversion. Les modeles courants sont : first touch, last touch, lineaire, en U, en W et time decay.", category: "data", related: ["UTM", "Conversion", "ROAS"], blogLink: "/blog/tracking-conversions-hubspot-guide-complet" },
  { term: "Automatisation", slug: "automatisation", definition: "Utilisation de logiciels pour executer des taches repetitives sans intervention humaine. En RevOps, cela inclut les workflows CRM, l\u2019enrichissement de donnees, les sequences email et les notifications.", category: "ia", related: ["Workflow", "iPaaS", "Make"], blogLink: "/blog/9-actions-commerciales-automatiser-hubspot" },

  // B
  { term: "BANT", slug: "bant", definition: "Framework de qualification commerciale : Budget, Authority (autorite decisionnaire), Need (besoin), Timeline (calendrier). Utilise par les SDR pour determiner si un lead est pret a avancer dans le pipeline.", category: "crm", related: ["SQL", "Lead Scoring", "MQL"] },
  { term: "BOFU (Bottom of Funnel)", slug: "bofu", definition: "Bas du funnel marketing. Etape ou le prospect est pret a acheter. Les contenus BOFU incluent les demos, les essais gratuits, les etudes de cas specifiques et les comparatifs detailles.", category: "marketing", related: ["TOFU", "MOFU", "Conversion"], blogLink: "/blog/tofu-mofu-bofu-strategie-inbound" },
  { term: "Bounce Rate", slug: "bounce-rate", definition: "En emailing, pourcentage d\u2019emails qui n\u2019ont pas ete delivres. Un hard bounce (adresse invalide) est plus grave qu\u2019un soft bounce (boite pleine). Un taux superieur a 3% signale un probleme de qualite de liste.", category: "marketing", related: ["Delivrabilite", "Warm-up", "Cold Email"] },
  { term: "Buyer Persona", slug: "buyer-persona", definition: "Representation semi-fictive du client ideal basee sur des donnees reelles. Inclut le poste, les objectifs, les frustrations, le processus de decision et les canaux preferes.", category: "marketing", related: ["ICP", "ABM", "Segmentation"] },

  // C
  { term: "CAC (Customer Acquisition Cost)", slug: "cac", definition: "Cout d\u2019acquisition client. Total des depenses marketing + sales divise par le nombre de nouveaux clients sur la periode. Le ratio LTV/CAC doit idealement etre superieur a 3.", category: "data", related: ["LTV", "Payback Period", "ROI"], blogLink: "/blog/cest-quoi-acquisition-marketing" },
  { term: "Churn (Taux d\u2019attrition)", slug: "churn", definition: "Pourcentage de clients qui arretent leur abonnement sur une periode donnee. Le churn mensuel se calcule : clients perdus / clients en debut de periode. Un churn annuel superieur a 10% en B2B SaaS est un signal d\u2019alerte.", category: "data", related: ["NRR", "GRR", "Retention"], blogLink: "/blog/gerer-mrr-revenu-recurrent-hubspot" },
  { term: "Clay", slug: "clay", definition: "Plateforme d\u2019enrichissement de donnees B2B qui combine plus de 75 sources de donnees via un systeme de waterfall enrichment. Permet de construire des listes de prospects ultra-qualifiees en croisant plusieurs providers.", category: "ia", related: ["Enrichissement", "Apollo", "Dropcontact"], blogLink: "/blog/comparatif-outils-generation-leads-enrichissement" },
  { term: "CLV / LTV (Customer Lifetime Value)", slug: "ltv", definition: "Valeur totale qu\u2019un client genere pendant toute sa relation avec l\u2019entreprise. Se calcule : ARPA x duree de vie moyenne (ou ARPA / churn rate). Metrique fondamentale pour calibrer le CAC acceptable.", category: "data", related: ["CAC", "Payback Period", "ARR"] },
  { term: "Cold Email", slug: "cold-email", definition: "Email de prospection envoye a un contact qui n\u2019a pas exprime d\u2019interet prealable. La delivrabilite, le warm-up et la personnalisation sont les 3 facteurs cles de succes.", category: "marketing", related: ["Delivrabilite", "Warm-up", "Sequence"], blogLink: "/blog/emelia-test-outil-cold-emailing" },
  { term: "Conversion", slug: "conversion", definition: "Action souhaitee realisee par un visiteur ou prospect : soumission de formulaire, demande de demo, signature de contrat. Le taux de conversion mesure l\u2019efficacite de chaque etape du funnel.", category: "data", related: ["Funnel", "Attribution", "CTA"], blogLink: "/blog/tracking-conversions-hubspot-guide-complet" },
  { term: "CRM (Customer Relationship Management)", slug: "crm", definition: "Logiciel de gestion de la relation client qui centralise les contacts, les deals, les activites et les communications. C\u2019est la colonne vertebrale du RevOps. Les principaux : HubSpot, Salesforce, Pipedrive.", category: "crm", related: ["HubSpot", "Pipeline", "Deal"], blogLink: "/blog/crm-pme-2026" },
  { term: "CRO (Chief Revenue Officer)", slug: "cro", definition: "Directeur des revenus. Role executif qui supervise l\u2019ensemble du cycle de revenu : marketing, ventes et customer success. Le RevOps reporte souvent au CRO.", category: "revops", related: ["RevOps", "VP Sales", "Revenue Engine"] },
  { term: "CTA (Call-to-Action)", slug: "cta", definition: "Element visuel (bouton, lien, banniere) qui incite le visiteur a realiser une action : telecharger un contenu, demander une demo, s\u2019inscrire. Chaque page doit avoir un CTA clair et unique.", category: "marketing", related: ["Conversion", "Landing Page", "Formulaire"] },

  // D
  { term: "Dashboard", slug: "dashboard", definition: "Tableau de bord qui affiche les KPIs et metriques cles en temps reel. En RevOps, le dashboard ideal couvre le pipeline, les activites, le revenue et la qualite des donnees.", category: "data", related: ["KPI", "Reporting", "Forecast"], blogLink: "/blog/kpi-commerciaux-indicateurs-vente" },
  { term: "Data Quality", slug: "data-quality", definition: "Mesure de la fiabilite des donnees CRM selon 5 dimensions : completude, exactitude, coherence, fraicheur et unicite. Une mauvaise qualite de donnees coute en moyenne 15% du revenu annuel.", category: "data", related: ["Deduplication", "Enrichissement", "CRM"], blogLink: "/blog/data-quality-crm-audit-nettoyage" },
  { term: "Deal", slug: "deal", definition: "Opportunite commerciale dans le CRM. Represente une vente potentielle avec un montant, une probabilite et une date de cloture previsionnelle. Les deals avancent dans le pipeline par stages.", category: "crm", related: ["Pipeline", "Forecast", "Win Rate"] },
  { term: "Deduplication", slug: "deduplication", definition: "Processus d\u2019identification et de fusion des doublons dans la base CRM. Les doublons faussent le reporting, creent des conflits d\u2019attribution et degradent l\u2019experience client.", category: "data", related: ["Data Quality", "CRM", "Enrichissement"] },
  { term: "Delivrabilite", slug: "delivrabilite", definition: "Capacite d\u2019un email a atteindre la boite de reception du destinataire (et non le spam). Depend de la reputation de l\u2019expediteur, du warm-up, du contenu et de l\u2019authentification (SPF, DKIM, DMARC).", category: "marketing", related: ["Warm-up", "Cold Email", "Bounce Rate"], blogLink: "/blog/emelia-test-outil-cold-emailing" },

  // E
  { term: "Enrichissement", slug: "enrichissement", definition: "Processus d\u2019ajout de donnees manquantes a un contact ou une entreprise dans le CRM : email, telephone, poste, taille d\u2019entreprise, technologie utilisee. Outils : Clay, Dropcontact, Apollo, Clearbit.", category: "ia", related: ["Clay", "Data Quality", "Scraping"], blogLink: "/blog/comparatif-outils-generation-leads-enrichissement" },
  { term: "Expansion Revenue", slug: "expansion-revenue", definition: "Revenu additionnel genere par les clients existants via l\u2019upsell (montee en gamme) ou le cross-sell (ventes croisees). L\u2019expansion revenue est le levier le plus rentable car il ne coute pas de CAC.", category: "data", related: ["NRR", "Upsell", "MRR"] },

  // F
  { term: "Forecast (Prevision de ventes)", slug: "forecast", definition: "Estimation du revenu que l\u2019equipe commerciale va generer sur une periode donnee. Les methodes : pipeline weighted, bottom-up, top-down, historique, IA predictive.", category: "data", related: ["Pipeline", "Win Rate", "Revenue"], blogLink: "/blog/forecasting-commercial-methodes-outils" },
  { term: "Formulaire", slug: "formulaire", definition: "Element web qui collecte les informations d\u2019un visiteur (nom, email, entreprise). En RevOps, chaque formulaire doit etre connecte au CRM et declencher des automations (attribution, scoring, notification).", category: "marketing", related: ["Conversion", "Landing Page", "CTA"] },
  { term: "Funnel (Entonnoir)", slug: "funnel", definition: "Representation du parcours d\u2019achat en etapes successives : visiteur, lead, MQL, SQL, opportunite, client. Chaque etape a un taux de conversion mesurable.", category: "marketing", related: ["TOFU", "MOFU", "BOFU", "Pipeline"], blogLink: "/blog/tofu-mofu-bofu-strategie-inbound" },

  // G
  { term: "Go-to-Market (GTM)", slug: "gtm", definition: "Strategie de mise sur le marche d\u2019un produit ou service. Definit le positionnement, le pricing, les canaux d\u2019acquisition, le modele de vente et les metriques de succes.", category: "revops", related: ["ICP", "Buyer Persona", "PLG"] },
  { term: "GRR (Gross Revenue Retention)", slug: "grr", definition: "Taux de retention brut du revenu. Mesure le revenu conserve sans compter l\u2019expansion. GRR = (MRR debut - Churn - Contraction) / MRR debut. Un GRR superieur a 90% est considere sain en B2B SaaS.", category: "data", related: ["NRR", "Churn", "MRR"] },

  // H
  { term: "HubSpot", slug: "hubspot", definition: "Plateforme CRM tout-en-un (Marketing Hub, Sales Hub, Service Hub, CMS Hub, Operations Hub). Leader du marche mid-market. Approche inbound, interface intuitive, ecosystem riche de 1 700+ integrations.", category: "crm", related: ["CRM", "Salesforce", "Pipeline"], blogLink: "/blog/hubspot-tarifs-prix-2026" },

  // I
  { term: "ICP (Ideal Customer Profile)", slug: "icp", definition: "Profil du client ideal au niveau entreprise : secteur, taille, revenu, technologie, maturite. L\u2019ICP se definit en analysant les meilleurs clients existants et guide toute la strategie d\u2019acquisition.", category: "revops", related: ["ABM", "Buyer Persona", "Segmentation"], blogLink: "/blog/account-based-marketing-guide" },
  { term: "Inbound Marketing", slug: "inbound", definition: "Strategie marketing qui attire les prospects via du contenu de valeur (blog, SEO, webinars) plutot que de les interrompre (pub, cold call). Methode popularisee par HubSpot.", category: "marketing", related: ["Content Marketing", "SEO", "TOFU"], blogLink: "/blog/tofu-mofu-bofu-strategie-inbound" },
  { term: "Integration", slug: "integration", definition: "Connexion entre deux logiciels qui permet le partage de donnees en temps reel. En RevOps, les integrations eliminent la saisie manuelle et assurent la coherence des donnees entre outils.", category: "ia", related: ["API", "iPaaS", "Webhook"] },
  { term: "iPaaS (Integration Platform as a Service)", slug: "ipaas", definition: "Plateforme d\u2019integration cloud qui connecte les applications entre elles sans code. Exemples : Make (ex-Integromat), n8n, Zapier, Tray.io, Workato.", category: "ia", related: ["Make", "API", "Automatisation"], blogLink: "/blog/stack-technologique-revops-2026" },

  // K
  { term: "KPI (Key Performance Indicator)", slug: "kpi", definition: "Indicateur cle de performance. Metrique quantifiable qui mesure l\u2019atteinte d\u2019un objectif. En RevOps, les KPIs couvrent l\u2019acquisition, le pipeline, le closing, le revenu et la retention.", category: "data", related: ["Dashboard", "OKR", "Reporting"], blogLink: "/blog/kpi-commerciaux-indicateurs-vente" },

  // L
  { term: "Lead", slug: "lead", definition: "Contact qui a exprime un interet pour votre produit ou service (soumission de formulaire, telechargement, inscription). Un lead n\u2019est pas encore qualifie, c\u2019est la matiere premiere du funnel.", category: "crm", related: ["MQL", "SQL", "Lead Scoring"] },
  { term: "Lead Scoring", slug: "lead-scoring", definition: "Systeme de notation des leads base sur 2 dimensions : le fit (correspondance avec l\u2019ICP) et l\u2019engagement (comportement). Un score eleve declenche le passage en MQL puis le transfert aux sales.", category: "revops", related: ["MQL", "SQL", "Fit Score"], blogLink: "/blog/lead-scoring-guide-complet" },
  { term: "Lifecycle Stage", slug: "lifecycle-stage", definition: "Etape du cycle de vie d\u2019un contact dans le CRM : Subscriber, Lead, MQL, SQL, Opportunity, Customer, Evangelist. Chaque transition doit etre automatisee et tracee.", category: "crm", related: ["Funnel", "MQL", "SQL"] },

  // M
  { term: "Make (ex-Integromat)", slug: "make", definition: "Plateforme d\u2019automatisation no-code qui connecte des centaines d\u2019applications via des scenarios visuels. Plus puissant et moins cher que Zapier pour les workflows complexes.", category: "ia", related: ["iPaaS", "Automatisation", "n8n"] },
  { term: "Marketing Ops", slug: "marketing-ops", definition: "Fonction qui gere la stack technologique marketing, les processus, les donnees et le reporting de l\u2019equipe marketing. Le Marketing Ops est une composante du RevOps.", category: "revops", related: ["RevOps", "Sales Ops", "CS Ops"], blogLink: "/blog/revops-vs-sales-ops-marketing-ops" },
  { term: "MCP (Model Context Protocol)", slug: "mcp", definition: "Protocole open-source developpe par Anthropic qui permet aux LLM (comme Claude) de se connecter a des sources de donnees externes et d\u2019executer des actions. Cle pour les agents IA RevOps.", category: "ia", related: ["Claude", "Agent IA", "API"] },
  { term: "MOFU (Middle of Funnel)", slug: "mofu", definition: "Milieu du funnel marketing. Le prospect connait son probleme et cherche des solutions. Contenus MOFU : webinars, etudes de cas, comparatifs, guides detailles.", category: "marketing", related: ["TOFU", "BOFU", "Nurturing"], blogLink: "/blog/tofu-mofu-bofu-strategie-inbound" },
  { term: "MQL (Marketing Qualified Lead)", slug: "mql", definition: "Lead qualifie par le marketing selon des criteres de fit et d\u2019engagement. Le MQL est pret a etre transfere aux sales. La definition exacte doit etre alignee entre marketing et sales via le SLA.", category: "revops", related: ["SQL", "Lead Scoring", "SLA"], blogLink: "/blog/aligner-marketing-sales-revops" },
  { term: "MRR (Monthly Recurring Revenue)", slug: "mrr", definition: "Revenu recurrent mensuel. La somme de tous les abonnements actifs sur un mois. Se decompose en : New MRR, Expansion MRR, Contraction MRR et Churn MRR.", category: "data", related: ["ARR", "NRR", "Churn"], blogLink: "/blog/gerer-mrr-revenu-recurrent-hubspot" },

  // N
  { term: "NRR (Net Revenue Retention)", slug: "nrr", definition: "Taux de retention net du revenu. Inclut l\u2019expansion et la contraction. NRR = (MRR debut + Expansion - Contraction - Churn) / MRR debut. Un NRR superieur a 110% signifie que la base client croit sans nouvelle acquisition.", category: "data", related: ["GRR", "Expansion Revenue", "Churn"] },
  { term: "Nurturing", slug: "nurturing", definition: "Processus d\u2019accompagnement d\u2019un lead dans son parcours d\u2019achat via des contenus cibles et personnalises. Le nurturing maintient l\u2019engagement des leads pas encore prets a acheter.", category: "marketing", related: ["MOFU", "Workflow", "Sequence"], blogLink: "/blog/marketing-automation-7-workflows-hubspot" },

  // O
  { term: "OKR (Objectives & Key Results)", slug: "okr", definition: "Framework de definition d\u2019objectifs : un objectif qualitatif ambitieux associe a 3-5 resultats cles mesurables. En RevOps, les OKR alignent marketing, sales et CS sur des objectifs communs.", category: "revops", related: ["KPI", "SLA", "Alignement"] },
  { term: "Onboarding", slug: "onboarding", definition: "Processus d\u2019accueil et de formation d\u2019un nouveau client (ou employe). En SaaS, un bon onboarding reduit le churn et accelere le time-to-value.", category: "crm", related: ["Churn", "Time to Value", "Customer Success"], blogLink: "/blog/onboarding-hubspot-30-premiers-jours" },
  { term: "Outbound", slug: "outbound", definition: "Strategie de prospection proactive ou l\u2019equipe commerciale contacte directement les prospects (cold email, cold call, LinkedIn). Oppose a l\u2019inbound ou le prospect vient a vous.", category: "marketing", related: ["Cold Email", "Sequence", "SDR"] },

  // P
  { term: "Payback Period", slug: "payback-period", definition: "Nombre de mois necessaires pour recuperer le cout d\u2019acquisition d\u2019un client (CAC). Se calcule : CAC / MRR par client. Un payback inferieur a 12 mois est l\u2019objectif en B2B SaaS.", category: "data", related: ["CAC", "MRR", "Unit Economics"] },
  { term: "Pipeline", slug: "pipeline", definition: "Representation visuelle de l\u2019ensemble des deals en cours dans le CRM, organises par etapes (stages). Le pipeline est l\u2019outil central du commercial et du RevOps Manager.", category: "crm", related: ["Deal", "Forecast", "Win Rate"], blogLink: "/blog/kpi-commerciaux-indicateurs-vente" },
  { term: "Pipeline Coverage", slug: "pipeline-coverage", definition: "Ratio entre la valeur totale du pipeline et l\u2019objectif de revenu. Un coverage de 3x signifie que vous avez 3 fois votre objectif en pipeline. Le minimum recommande est 3x, idealement 4x.", category: "data", related: ["Pipeline", "Forecast", "Win Rate"], blogLink: "/blog/metriques-revops-indicateurs-performance" },
  { term: "Pipeline Velocity", slug: "pipeline-velocity", definition: "Vitesse a laquelle le revenu traverse le pipeline. Formule : (Nombre de deals x Win rate x ACV) / Duree du cycle de vente. Augmenter la velocity est l\u2019objectif #1 du RevOps.", category: "data", related: ["Pipeline", "Win Rate", "Sales Cycle"], blogLink: "/blog/metriques-revops-indicateurs-performance" },
  { term: "PLG (Product-Led Growth)", slug: "plg", definition: "Strategie de croissance ou le produit est le principal moteur d\u2019acquisition, de conversion et de retention. Le free trial et le freemium sont les leviers PLG classiques.", category: "revops", related: ["Freemium", "Onboarding", "Activation"] },

  // R
  { term: "Revenue Engine", slug: "revenue-engine", definition: "Systeme complet qui genere, accelere et optimise le revenu. Combine les processus, les outils et les donnees de marketing, sales et customer success. Le RevOps est le mecanicien du revenue engine.", category: "revops", related: ["RevOps", "Funnel", "Pipeline"] },
  { term: "Revenue Operations (RevOps)", slug: "revops", definition: "Fonction strategique qui aligne les processus, les outils et les donnees des equipes marketing, sales et customer success pour optimiser le revenu. Le RevOps elimine les silos et cree un revenue engine unifie.", category: "revops", related: ["Sales Ops", "Marketing Ops", "Revenue Engine"], blogLink: "/blog/revops-manager-fiche-poste-salaire-competences" },
  { term: "ROAS (Return on Ad Spend)", slug: "roas", definition: "Retour sur investissement publicitaire. Se calcule : revenu genere par la pub / cout de la pub. Un ROAS de 5 signifie que chaque euro depense en pub genere 5 euros de revenu.", category: "data", related: ["CAC", "ROI", "Attribution"] },
  { term: "ROI (Return on Investment)", slug: "roi", definition: "Retour sur investissement. Se calcule : (Gain - Cout) / Cout x 100. En RevOps, le ROI se mesure sur les outils, les processus et les personnes.", category: "data", related: ["CAC", "LTV", "ROAS"] },
  { term: "Round-Robin", slug: "round-robin", definition: "Methode d\u2019attribution automatique des leads aux commerciaux a tour de role. Assure une repartition equitable de la charge et un temps de reponse minimal.", category: "crm", related: ["Attribution", "SLA", "Workflow"], blogLink: "/blog/9-actions-commerciales-automatiser-hubspot" },

  // S
  { term: "Sales Cycle (Cycle de vente)", slug: "sales-cycle", definition: "Duree moyenne entre le premier contact avec un prospect et la signature du contrat. En B2B, le cycle varie de 30 jours (SMB) a 12+ mois (enterprise).", category: "crm", related: ["Pipeline", "Velocity", "Win Rate"] },
  { term: "Sales Ops", slug: "sales-ops", definition: "Fonction qui optimise les processus, les outils et les donnees de l\u2019equipe commerciale. Le Sales Ops est une composante du RevOps, focus sur la vente.", category: "revops", related: ["RevOps", "Marketing Ops", "CRM"], blogLink: "/blog/revops-vs-sales-ops-marketing-ops" },
  { term: "Salesforce", slug: "salesforce", definition: "CRM leader du marche enterprise. Tres puissant et personnalisable, mais complexe et couteux. Adapte aux entreprises de 200+ personnes avec des besoins avances.", category: "crm", related: ["CRM", "HubSpot", "Pipedrive"], blogLink: "/blog/hubspot-vs-salesforce-comparatif" },
  { term: "SDR (Sales Development Representative)", slug: "sdr", definition: "Commercial charge de la prospection et de la qualification des leads. Le SDR genere des RDV qualifies pour les Account Executives. Role cle dans les equipes outbound.", category: "crm", related: ["BDR", "Outbound", "SQL"] },
  { term: "Segmentation", slug: "segmentation", definition: "Division de la base de contacts en groupes homogenes selon des criteres (secteur, taille, comportement, lifecycle stage). La segmentation permet de personnaliser les messages et d\u2019optimiser les conversions.", category: "marketing", related: ["ICP", "Buyer Persona", "ABM"] },
  { term: "Sequence", slug: "sequence", definition: "Serie d\u2019emails et de taches automatisees envoyees a un prospect selon un calendrier defini. Differente du workflow : la sequence est individuelle (1-to-1) et s\u2019arrete quand le prospect repond.", category: "crm", related: ["Cold Email", "Workflow", "Outbound"], blogLink: "/blog/meilleures-pratiques-sequences-hubspot" },
  { term: "SLA (Service Level Agreement)", slug: "sla", definition: "Accord formel entre marketing et sales qui definit les engagements de chaque equipe : volume et qualite des MQL cote marketing, vitesse et intensite du suivi cote sales.", category: "revops", related: ["MQL", "SQL", "Alignement"], blogLink: "/blog/sla-marketing-sales-template" },
  { term: "SQL (Sales Qualified Lead)", slug: "sql", definition: "Lead qualifie par l\u2019equipe commerciale et accepte dans le pipeline. Le SQL a ete valide comme ayant un besoin reel, un budget et un calendrier. C\u2019est le point de transfert formel du marketing aux sales.", category: "revops", related: ["MQL", "BANT", "Pipeline"] },

  // T
  { term: "Time to Value", slug: "time-to-value", definition: "Temps necessaire pour qu\u2019un nouveau client obtienne de la valeur avec votre produit. Reduire le time-to-value ameliore la retention et le NPS.", category: "crm", related: ["Onboarding", "Churn", "NPS"] },
  { term: "TOFU (Top of Funnel)", slug: "tofu", definition: "Haut du funnel marketing. Le prospect decouvre son probleme. Contenus TOFU : articles de blog, infographies, posts LinkedIn, podcasts. Objectif : attirer du trafic qualifie.", category: "marketing", related: ["MOFU", "BOFU", "Inbound"], blogLink: "/blog/tofu-mofu-bofu-strategie-inbound" },

  // U
  { term: "Unit Economics", slug: "unit-economics", definition: "Metriques economiques unitaires d\u2019une entreprise : CAC, LTV, ratio LTV/CAC, payback period, marge brute. Les unit economics determinent la viabilite et la scalabilite du business model.", category: "data", related: ["CAC", "LTV", "Payback Period"], blogLink: "/blog/cimetieres-startups-modeles-saas-b2b" },
  { term: "Upsell", slug: "upsell", definition: "Vente d\u2019un produit ou service de gamme superieure a un client existant. L\u2019upsell genere de l\u2019expansion revenue sans cout d\u2019acquisition additionnel.", category: "crm", related: ["Expansion Revenue", "Cross-sell", "NRR"] },
  { term: "UTM", slug: "utm", definition: "Parametres ajoutes aux URLs pour tracker l\u2019origine du trafic : utm_source, utm_medium, utm_campaign, utm_content, utm_term. Indispensables pour l\u2019attribution marketing.", category: "data", related: ["Attribution", "Conversion", "GA4"], blogLink: "/blog/tracking-conversions-hubspot-guide-complet" },

  // W
  { term: "Warm-up", slug: "warm-up", definition: "Processus de montee en temperature d\u2019une nouvelle adresse email avant d\u2019envoyer des campagnes. Le warm-up construit la reputation d\u2019expediteur en envoyant progressivement des emails a des boites qui repondent.", category: "marketing", related: ["Delivrabilite", "Cold Email", "Bounce Rate"], blogLink: "/blog/emelia-test-outil-cold-emailing" },
  { term: "Webhook", slug: "webhook", definition: "Notification HTTP automatique envoyee par une application quand un evenement se produit. Contrairement a l\u2019API (pull), le webhook pousse les donnees en temps reel (push).", category: "ia", related: ["API", "Integration", "iPaaS"] },
  { term: "Win Rate (Taux de conversion)", slug: "win-rate", definition: "Pourcentage de deals gagnes par rapport au total des deals crees. Win rate = deals won / (deals won + deals lost). Ne pas inclure les deals encore ouverts dans le calcul.", category: "data", related: ["Pipeline", "Forecast", "Sales Cycle"], blogLink: "/blog/kpi-commerciaux-indicateurs-vente" },
  { term: "Workflow", slug: "workflow", definition: "Automatisation declenchee par un evenement ou une condition dans le CRM. Contrairement a la sequence (1-to-1), le workflow est 1-to-many et s\u2019execute en continu tant que les criteres sont remplis.", category: "ia", related: ["Automatisation", "Sequence", "HubSpot"], blogLink: "/blog/marketing-automation-7-workflows-hubspot" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function GlossairePage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = terms;
    if (cat !== "all") result = result.filter((t) => t.category === cat);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q));
    }
    if (activeLetter) result = result.filter((t) => t.term[0].toUpperCase() === activeLetter);
    return result;
  }, [search, cat, activeLetter]);

  const letters = useMemo(() => {
    const available = new Set(terms.map((t) => t.term[0].toUpperCase()));
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => ({ letter: l, available: available.has(l) }));
  }, []);

  const grouped = useMemo(() => {
    const map: Record<string, Term[]> = {};
    filtered.forEach((t) => {
      const l = t.term[0].toUpperCase();
      if (!map[l]) map[l] = [];
      map[l].push(t);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "10%", width: 320, height: 320, borderRadius: "50%", background: "#FF7A59", opacity: 0.12, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "25%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "45%", width: 280, height: 280, borderRadius: "50%", background: "#6C5CE7", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "2%", top: "60%", width: 300, height: 300, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "3%", top: "78%", width: 280, height: 280, borderRadius: "50%", background: "#6D00CC", opacity: 0.07, filter: "blur(70px)" }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative z-10 max-w-[1000px] mx-auto px-6">
        {/* Header */}
        <section className="text-center mb-12">
          <nav className="mb-6 flex items-center justify-center gap-2 text-[12px] text-[#999]">
            <Link href="/" className="hover:text-[#111] transition-colors">Accueil</Link><span>/</span>
            <span className="text-[#666]">Glossaire</span>
          </nav>
          <div className="mb-4"><Badge>Glossaire</Badge></div>
          <h1 className="text-[36px] sm:text-[48px] font-semibold text-[#111] leading-[1.1] tracking-[-0.03em] mb-5">
            Glossaire RevOps
          </h1>
          <p className="text-[17px] text-[#666] max-w-[520px] mx-auto leading-[1.7] mb-8">
            {terms.length} termes essentiels du RevOps, CRM, Marketing, Data et IA expliques simplement. Avec des liens vers nos guides detailles.
          </p>

          {/* Search */}
          <div className="max-w-[440px] mx-auto relative mb-8">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#CCC]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input
              type="text"
              placeholder="Rechercher un terme..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActiveLetter(null); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E8E8] bg-white text-[13px] text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#DDD] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.06)]"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#CCC] hover:text-[#999]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => { setCat(c.key); setActiveLetter(null); }}
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

          {/* Alphabet nav */}
          <div className="flex flex-wrap justify-center gap-1">
            {letters.map((l) => (
              <button
                key={l.letter}
                onClick={() => {
                  if (l.available) setActiveLetter(activeLetter === l.letter ? null : l.letter);
                }}
                disabled={!l.available}
                className={`w-8 h-8 rounded-lg text-[12px] font-semibold transition-all ${
                  activeLetter === l.letter
                    ? "bg-[#111] text-white"
                    : l.available
                    ? "bg-white border border-[#F2F2F2] text-[#666] hover:border-[#DDD] hover:text-[#111] cursor-pointer"
                    : "bg-[#FAFAFA] text-[#DDD] cursor-not-allowed"
                }`}
              >
                {l.letter}
              </button>
            ))}
            {activeLetter && (
              <button onClick={() => setActiveLetter(null)} className="ml-2 px-3 h-8 rounded-lg bg-white border border-[#F2F2F2] text-[11px] text-[#999] hover:text-[#666] hover:border-[#DDD]">
                Tout afficher
              </button>
            )}
          </div>
        </section>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[12px] text-[#999]">
            {filtered.length} terme{filtered.length > 1 ? "s" : ""}{cat !== "all" ? ` en ${categories.find((c) => c.key === cat)?.label}` : ""}{activeLetter ? ` commencant par ${activeLetter}` : ""}
          </p>
        </div>

        {/* Terms grouped by letter */}
        {grouped.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[15px] text-[#999] mb-2">Aucun terme trouve</p>
            <p className="text-[12px] text-[#CCC]">Essayez un autre terme ou une autre categorie</p>
          </div>
        ) : (
          <div className="space-y-10">
            {grouped.map(([letter, letterTerms]) => (
              <section key={letter} id={`letter-${letter}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-[#111] text-white flex items-center justify-center text-[16px] font-bold">{letter}</span>
                  <div className="flex-1 h-px bg-[#F2F2F2]" />
                  <span className="text-[11px] text-[#CCC]">{letterTerms.length} terme{letterTerms.length > 1 ? "s" : ""}</span>
                </div>
                <div className="space-y-3">
                  {letterTerms.map((t) => (
                    <div key={t.slug} id={t.slug} className="rounded-2xl border border-[#E8E8E8] bg-white p-5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] hover:border-[#DDD] transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h2 className="text-[15px] font-semibold text-[#111]">{t.term}</h2>
                        <span
                          className="shrink-0 px-2 py-0.5 rounded text-[9px] font-semibold text-white"
                          style={{ background: catColors[t.category] || "#999" }}
                        >
                          {categories.find((c) => c.key === t.category)?.label || t.category}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#555] leading-[1.75] mb-3">{t.definition}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        {t.related?.map((r) => (
                          <button
                            key={r}
                            onClick={() => {
                              const target = terms.find((tt) => tt.term.includes(r));
                              if (target) {
                                setSearch("");
                                setCat("all");
                                setActiveLetter(null);
                                setTimeout(() => {
                                  document.getElementById(target.slug)?.scrollIntoView({ behavior: "smooth", block: "center" });
                                }, 100);
                              }
                            }}
                            className="text-[10px] px-2 py-0.5 rounded-md border border-[#F2F2F2] text-[#999] hover:text-[#666] hover:border-[#DDD] transition-colors cursor-pointer"
                          >
                            {r}
                          </button>
                        ))}
                        {t.blogLink && (
                          <Link href={t.blogLink} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-[#F5F5F5] text-[#666] hover:text-[#111] hover:bg-[#EEE] transition-colors">
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 3h7v7M13 3L6 10" /></svg>
                            Lire le guide
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Stats */}
        <section className="mt-16 mb-8">
          <div className="rounded-2xl bg-[#111] p-6 md:p-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { value: terms.length.toString(), label: "Termes definis" },
                { value: terms.filter((t) => t.blogLink).length.toString(), label: "Avec guide detaille" },
                { value: new Set(terms.map((t) => t.category)).size.toString(), label: "Categories" },
                { value: letters.filter((l) => l.available).length.toString(), label: "Lettres couvertes" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-[24px] font-bold text-white">{s.value}</div>
                  <div className="text-[11px] text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-white/50 leading-[1.7] text-center max-w-[500px] mx-auto">
              Ce glossaire est maintenu par l&apos;equipe Ceres et mis a jour regulierement. Chaque terme est relie a nos guides et articles pour aller plus loin.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="rounded-2xl border border-[#E8E8E8] bg-[#FAFAFA] p-6 md:p-10 text-center">
            <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Un terme vous manque ?</h2>
            <p className="text-[13px] text-[#999] mb-6 max-w-[400px] mx-auto">Dites-nous quel terme ajouter ou posez-nous directement votre question RevOps.</p>
            <div className="flex items-center justify-center gap-3">
              <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel
              </a>
              <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-[#E5E5E5] bg-white text-[#111] text-[13px] font-medium hover:border-[#CCC] transition-colors">
                Lire le blog
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
