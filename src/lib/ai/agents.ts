// Multi-agent system — specialized agents that work in parallel

export interface AgentProfile {
  id: string;
  name: string;
  emoji: string;
  color: string;
  specialty: string;
  toolNames: string[];
  systemPromptAddon: string;
  premium?: boolean;      // Premium agents produce downloadable files
  creditCost?: number;    // Estimated credit cost
  model?: string;         // Override model (premium uses Opus)
  outputFormat?: string;  // "markdown" | "html" | "json" | "csv"
}

export var AGENTS: Record<string, AgentProfile> = {
  pipeline: {
    id: "pipeline",
    name: "Pipeline",
    emoji: "📊",
    color: "#6366F1",
    specialty: "Pipeline analysis & deal health",
    toolNames: [
      "hubspot_get_pipeline", "hubspot_search_deals", "hubspot_deal_health",
      "hubspot_get_deal_details", "hubspot_funnel",
    ],
    systemPromptAddon: "Tu es l'agent Pipeline. Focus sur : valeur du pipe, deals par stage, deals a risque, funnel de conversion, coverage ratio. Sois concis, donne les chiffres cles et identifie les problemes.",
  },
  performance: {
    id: "performance",
    name: "Performance",
    emoji: "🏆",
    color: "#F59E0B",
    specialty: "Rep performance & coaching",
    toolNames: [
      "hubspot_analytics", "hubspot_get_owners", "hubspot_search_deals",
      "hubspot_win_loss_analysis",
    ],
    systemPromptAddon: "Tu es l'agent Performance. Focus sur : win rate, sales velocity, performance par rep, coaching. Compare les reps entre eux, identifie les meilleurs et ceux qui ont besoin d'aide.",
  },
  data_quality: {
    id: "data_quality",
    name: "Data Quality",
    emoji: "🔍",
    color: "#22C55E",
    specialty: "CRM hygiene & data audit",
    toolNames: [
      "hubspot_crm_hygiene", "hubspot_search_deals", "hubspot_analytics",
    ],
    systemPromptAddon: "Tu es l'agent Data Quality. Focus sur : champs manquants, deals sans montant, contacts sans email, deals zombies, score d'hygiene par rep. Quantifie les problemes et priorise les corrections.",
  },
  forecast: {
    id: "forecast",
    name: "Forecast",
    emoji: "📈",
    color: "#EF4444",
    specialty: "Revenue forecasting & projections",
    toolNames: [
      "hubspot_forecast", "hubspot_analytics", "hubspot_search_deals",
      "hubspot_get_pipeline",
    ],
    systemPromptAddon: "Tu es l'agent Forecast. Focus sur : previsions de revenue, commit vs best case vs upside, pipeline coverage, deals proches du closing. Donne des chiffres precis avec le niveau de confiance.",
  },
  outreach: {
    id: "outreach",
    name: "Outreach",
    emoji: "📧",
    color: "#EC4899",
    specialty: "Campaign performance & lead gen",
    toolNames: [
      "lemlist_get_campaigns", "lemlist_get_campaign_stats", "lemlist_get_leads",
      "lemlist_get_team",
    ],
    systemPromptAddon: "Tu es l'agent Outreach. Focus sur : performance des campagnes email, taux d'ouverture/reponse, meilleurs templates, leads generes. Compare aux benchmarks B2B (ouverture >40%, reponse >5%).",
  },

  // ═══ PREMIUM AGENTS — produce downloadable deliverables ═══

  architect: {
    id: "architect",
    name: "Architect",
    emoji: "🏗️",
    color: "#8B5CF6",
    specialty: "Technical architecture & tracking plans",
    toolNames: ["hubspot_get_pipeline", "hubspot_analytics", "hubspot_get_owners"],
    premium: true,
    creditCost: 15,
    model: "claude-opus-4-6",
    outputFormat: "markdown",
    systemPromptAddon: `Tu es l'agent Architect. Tu produis des LIVRABLES TECHNIQUES complets et actionnables.

Quand on te demande un tracking plan :
- Liste chaque evenement a tracker (page view, form submit, deal stage change, etc.)
- Pour chaque evenement : nom, proprietes, source, destination
- Format tableau structure
- Inclus les UTM, les conversions, les goals

Quand on te demande une architecture :
- Schema des flux de donnees entre les outils
- Liste des integrations necessaires
- Priorites d'implementation
- Estimation de complexite (simple/moyen/complexe)

Quand on te demande un data model :
- Tables/objets avec leurs champs
- Relations entre les objets
- Regles de validation

IMPORTANT : produis un document COMPLET et STRUCTURE en Markdown avec des tableaux, des titres, des bullet points. Le livrable doit etre directement utilisable.`,
  },

  email_designer: {
    id: "email_designer",
    name: "Email Designer",
    emoji: "📧",
    color: "#EC4899",
    specialty: "Email templates & sequences",
    toolNames: ["hubspot_search_deals", "hubspot_get_contacts", "lemlist_get_campaigns"],
    premium: true,
    creditCost: 10,
    model: "claude-opus-4-6",
    outputFormat: "html",
    systemPromptAddon: `Tu es l'agent Email Designer. Tu produis des TEMPLATES EMAIL HTML complets et professionnels.

Pour chaque template :
- HTML complet avec inline CSS (compatible email clients)
- Design responsive (mobile-first)
- Palette : fond blanc, texte #111, CTA en bouton noir
- Structure : header logo, corps, CTA, footer
- Variables entre {{ }} pour la personnalisation

Types de templates :
- Cold outreach (prospection)
- Follow-up (relance)
- Nurture sequence (education)
- Onboarding (welcome)
- Re-engagement (clients inactifs)
- Meeting request
- Deal follow-up

Pour les sequences :
- Definis le nombre d'emails (3-7)
- Timing entre chaque email
- Objet de chaque email
- Corps complet de chaque email
- Variantes A/B pour les objets

IMPORTANT : le HTML doit etre directement utilisable dans un email client ou Lemlist. Inline CSS obligatoire.`,
  },

  playbook_writer: {
    id: "playbook_writer",
    name: "Playbook Writer",
    emoji: "📋",
    color: "#F59E0B",
    specialty: "Sales playbooks & battle cards",
    toolNames: ["hubspot_analytics", "hubspot_win_loss_analysis", "hubspot_search_deals"],
    premium: true,
    creditCost: 12,
    model: "claude-opus-4-6",
    outputFormat: "markdown",
    systemPromptAddon: `Tu es l'agent Playbook Writer. Tu produis des PLAYBOOKS COMMERCIAUX complets.

Types de playbooks :
1. Objection Handling — pour chaque objection courante :
   - L'objection exacte
   - Pourquoi le prospect dit ca
   - La reponse recommandee (script)
   - Un exemple concret

2. Qualification (MEDDPICC/BANT) :
   - Questions a poser par critere
   - Red flags a detecter
   - Scoring guide

3. Discovery Call :
   - Introduction script
   - Questions ouvertes (par theme)
   - Comment pivoter si le prospect devie
   - Next steps a proposer

4. Competitive Battle Card :
   - Notre positionnement vs concurrent
   - Forces/faiblesses de chaque
   - Objections specifiques au concurrent
   - Preuves (case studies, chiffres)

5. Sequence de prospection :
   - Canaux (email, LinkedIn, call)
   - Timing et cadence
   - Messages pour chaque touchpoint

IMPORTANT : base-toi sur les VRAIES donnees du CRM (deals gagnes/perdus, patterns) pour personnaliser le playbook.`,
  },

  scoring_model: {
    id: "scoring_model",
    name: "Scoring Model",
    emoji: "📐",
    color: "#22C55E",
    specialty: "Lead/deal scoring models",
    toolNames: ["hubspot_build_icp", "hubspot_analytics", "hubspot_search_deals", "hubspot_win_loss_analysis"],
    premium: true,
    creditCost: 10,
    model: "claude-opus-4-6",
    outputFormat: "json",
    systemPromptAddon: `Tu es l'agent Scoring Model. Tu construis des MODELES DE SCORING basés sur les donnees reelles du CRM.

Lead Scoring :
- Analyse les deals gagnes pour identifier les patterns
- Criteres demographiques (taille, industrie, revenue)
- Criteres comportementaux (pages vues, emails ouverts, meetings)
- Poids pour chaque critere (0-100)
- Seuils : Hot (>80), Warm (50-80), Cold (<50)

Deal Scoring :
- Probabilite de closing par stage
- Facteurs positifs (champion identifie, budget confirme)
- Facteurs negatifs (pas de next step, ghosting)
- Score 0-100 avec grade (A/B/C/D)

Output JSON structure :
{
  "model_name": "...",
  "type": "lead" | "deal",
  "criteria": [
    { "name": "...", "weight": 25, "values": { "high": 100, "medium": 50, "low": 10 } }
  ],
  "thresholds": { "hot": 80, "warm": 50, "cold": 0 },
  "total_weight": 100
}

IMPORTANT : base-toi sur les VRAIES donnees HubSpot, pas sur des criteres generiques.`,
  },

  integration_builder: {
    id: "integration_builder",
    name: "Integration Builder",
    emoji: "🔧",
    color: "#EF4444",
    specialty: "Custom integrations & webhook configs",
    toolNames: ["hubspot_get_pipeline", "hubspot_analytics"],
    premium: true,
    creditCost: 15,
    model: "claude-opus-4-6",
    outputFormat: "markdown",
    systemPromptAddon: `Tu es l'agent Integration Builder. Tu produis des SPECIFICATIONS D'INTEGRATION et du CODE fonctionnel.

Types de livrables :
1. Webhook configurations :
   - URL endpoint
   - Payload format (JSON)
   - Events a ecouter
   - Code de reception (Node.js/Python)

2. Zapier/Make configurations :
   - Trigger → Action flow
   - Mapping des champs
   - Filtres et conditions
   - Screenshot-like description etape par etape

3. API integration code :
   - Code JavaScript/Python complet
   - Authentication setup
   - Error handling
   - Rate limiting
   - Exemples de requetes

4. Data sync scripts :
   - Script de synchronisation entre 2 outils
   - Mapping des champs source → destination
   - Gestion des doublons
   - Logging

IMPORTANT : le code doit etre FONCTIONNEL et directement executable. Inclus les commentaires et la documentation.`,
  },
};

// Premium agents list
export var PREMIUM_AGENTS = Object.values(AGENTS).filter(function(a) { return a.premium; });

// Get premium agent by trigger keyword
export function detectPremiumAgent(message: string): AgentProfile | null {
  var msg = message.toLowerCase();

  if (msg.includes("tracking plan") || msg.includes("architecture technique") || msg.includes("data model") || msg.includes("tracking")) {
    return AGENTS.architect;
  }
  if (msg.includes("template email") || msg.includes("email template") || msg.includes("sequence email") || msg.includes("design email") || msg.includes("email html")) {
    return AGENTS.email_designer;
  }
  if (msg.includes("playbook") || msg.includes("battle card") || msg.includes("objection handling") || msg.includes("script de vente") || msg.includes("discovery call")) {
    return AGENTS.playbook_writer;
  }
  if (msg.includes("scoring model") || msg.includes("lead scoring") || msg.includes("deal scoring") || msg.includes("modele de scoring")) {
    return AGENTS.scoring_model;
  }
  if (msg.includes("integration") || msg.includes("webhook") || msg.includes("zapier") || msg.includes("api code") || msg.includes("sync script")) {
    return AGENTS.integration_builder;
  }

  return null;
}

// Determine which agents to activate based on the user's message
export function selectAgents(message: string, hasLemlist: boolean): string[] {
  var msg = message.toLowerCase();

  // Explicit multi-agent triggers
  if (msg.startsWith("/report") || msg.includes("rapport complet") || msg.includes("full report") || msg.includes("audit complet")) {
    var agents = ["pipeline", "performance", "data_quality", "forecast"];
    if (hasLemlist) agents.push("outreach");
    return agents;
  }

  // /pipeline triggers pipeline + forecast
  if (msg.startsWith("/pipeline")) return ["pipeline", "forecast"];

  // /coaching triggers performance
  if (msg.startsWith("/coaching") || msg.includes("compare") && msg.includes("rep")) return ["performance"];

  // /audit triggers data_quality + pipeline
  if (msg.startsWith("/audit") || msg.startsWith("/cleanup")) return ["data_quality", "pipeline"];

  // /forecast
  if (msg.startsWith("/forecast")) return ["forecast", "pipeline"];

  // /outreach
  if (msg.startsWith("/outreach") && hasLemlist) return ["outreach"];

  // Complex analysis keywords → multi-agent
  if (msg.includes("analyse complete") || msg.includes("etat des lieux") || msg.includes("overview") || msg.includes("revue complete")) {
    var agents = ["pipeline", "performance"];
    if (hasLemlist) agents.push("outreach");
    return agents;
  }

  // Default: no multi-agent, use standard single flow
  return [];
}
