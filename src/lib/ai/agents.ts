// Multi-agent system — specialized agents that work in parallel

export interface AgentProfile {
  id: string;
  name: string;
  emoji: string;
  color: string;          // Hex color for UI
  specialty: string;      // Short description
  toolNames: string[];    // Which tools this agent can use
  systemPromptAddon: string; // Added to base system prompt
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
};

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
