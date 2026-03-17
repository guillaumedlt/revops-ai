// Route simple questions to Haiku (cheaper), complex to Sonnet

export type ModelChoice = "haiku" | "sonnet";

const SIMPLE_PATTERNS = [
  /quel(le)?.*win rate/i,
  /combien.*deals/i,
  /pipeline.*value/i,
  /score.*adoption/i,
  /montant.*moyen/i,
  /nombre de.*leads/i,
  /qui.*owner.*plus/i,
  /donne.moi/i,
  /affiche/i,
];

const COMPLEX_PATTERNS = [
  /pourquoi/i,
  /comment.*am[ée]liorer/i,
  /analyse/i,
  /compare/i,
  /tendance/i,
  /recommand/i,
  /strat[ée]gie/i,
  /coaching/i,
  /que.*faire/i,
  /corr[ée]l/i,
];

export function routeToModel(message: string, historyLength: number): ModelChoice {
  if (COMPLEX_PATTERNS.some((p) => p.test(message))) return "sonnet";
  if (historyLength >= 6) return "sonnet";
  if (SIMPLE_PATTERNS.some((p) => p.test(message))) return "haiku";
  return "haiku"; // default cheaper
}

export function getModelId(choice: ModelChoice): string {
  return choice === "sonnet"
    ? "claude-sonnet-4-20250514"
    : "claude-haiku-4-5-20251001";
}
