// Smart model router for Kairo — optimizes cost vs quality
// Haiku: 1 credit — simple lookups, greetings, short factual answers
// Sonnet: 2 credits — analysis with tools, comparisons, standard queries
// Opus: 5 credits — deep strategy, multi-tool reports, complex reasoning

export type ModelChoice = "haiku" | "sonnet" | "opus";

// ── Tier 1: Haiku (cheapest) — factual lookups, greetings, yes/no ──
var HAIKU_PATTERNS = [
  // Simple data lookups
  /^(quel|quelle|quels|quelles)\b/i,
  /^combien\b/i,
  /^(montre|affiche|donne|liste)\b/i,
  /^(c'est quoi|qu'est.ce que)\b/i,
  // Specific metrics
  /\b(win rate|taux de|montant|nombre de|pipeline value|chiffre)\b/i,
  /\b(dernier|dernière|derniers|dernières)\s+(deal|contact|activit)/i,
  // Greetings and short
  /^(salut|hello|bonjour|hey|merci|ok|d'accord|oui|non)\b/i,
  // Direct commands
  /^(cherche|trouve|search|get)\b/i,
  /\b(score d'adoption|adoption score)\b/i,
];

// ── Tier 2: Sonnet (mid) — analysis, tools, standard work ──
var SONNET_PATTERNS = [
  // Analysis keywords
  /\b(analyse|analyser|analyze)\b/i,
  /\b(compare|comparer|comparaison|versus|vs\.?)\b/i,
  /\b(tendance|trend|evolution|évolution)\b/i,
  /\b(pipeline|funnel|entonnoir)\b/i,
  /\b(performance|performer|classement|ranking)\b/i,
  // Tool-heavy queries
  /\b(deals? (stall|bloqu|at risk|en danger|critique))/i,
  /\b(top|bottom|meilleur|pire)\s+\d/i,
  /\b(forecast|prévision|projection)\b/i,
  /\b(velocity|vélocité|cycle de vente|temps de conversion)\b/i,
  /\b(health|santé|hygiene|hygiène|audit|qualité)\b/i,
  /\b(win.?loss|gagné.?perdu)\b/i,
  // ICP and scoring
  /\b(icp|profil client|scorer|scoring)\b/i,
  // Email and prep
  /\b(email|mail|follow.?up|relance)\b/i,
  /\b(meeting|réunion|call|appel|brief)\b/i,
  // Notion queries
  /\b(notion|database|page|workspace)\b/i,
  // Lemlist
  /\b(campagne|campaign|outreach|séquence|sequence)\b/i,
];

// ── Tier 3: Opus (premium) — deep reasoning, strategy, reports ──
var OPUS_PATTERNS = [
  // Reports
  /^\/(report|audit)\b/i,
  /\b(rapport|report) (complet|détaillé|full|exhaustif)/i,
  /\b(audit complet|full audit)\b/i,
  // Strategy and recommendations
  /\b(stratégie|strategy|recommand|recommendation|plan d'action|action plan)\b/i,
  /\b(comment (améliorer|optimiser|booster|augmenter|réduire))\b/i,
  /\b(pourquoi.*(baisse|chute|stagne|bloqué|problème))/i,
  /\b(que (faire|suggère|recommande|propose))\b/i,
  /\b(coaching|former|onboard)\b/i,
  // Multi-dimensional analysis
  /\b(corrél|correlation|impact|cause|root cause)\b/i,
  /\b(segment|segmenter|cohort|cohorte)\b/i,
  /\b(benchmark|compétition|marché|industrie)\b/i,
  // Long-form generation
  /\b(rédige|draft|écris|write).*(long|détaillé|complet)/i,
  /\b(présentation|slide|deck|ppt)\b/i,
];

export function routeToModel(message: string, historyLength: number): ModelChoice {
  var msg = message.trim();

  // Short messages (< 20 chars) are almost always simple
  if (msg.length < 20 && !OPUS_PATTERNS.some(function(p) { return p.test(msg); })) {
    return "haiku";
  }

  // Check Opus first (most specific)
  if (OPUS_PATTERNS.some(function(p) { return p.test(msg); })) return "opus";

  // Check Sonnet
  if (SONNET_PATTERNS.some(function(p) { return p.test(msg); })) return "sonnet";

  // Check Haiku
  if (HAIKU_PATTERNS.some(function(p) { return p.test(msg); })) return "haiku";

  // Long conversations get upgraded to Sonnet (needs more context)
  if (historyLength >= 8) return "sonnet";

  // Default: Sonnet (best balance for RevOps questions)
  return "sonnet";
}

export function getModelId(choice: ModelChoice): string {
  switch (choice) {
    case "opus": return "claude-opus-4-6";
    case "sonnet": return "claude-sonnet-4-6";
    case "haiku": return "claude-haiku-4-5-20251001";
  }
}

export function getCreditCostForChoice(choice: ModelChoice): number {
  switch (choice) {
    case "opus": return 5;
    case "sonnet": return 2;
    case "haiku": return 1;
  }
}
