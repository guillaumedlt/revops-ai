export interface Plan {
  id: string;
  name: string;
  price: number; // EUR/month, 0 for free
  credits: number;
  features: string[];
  stripePriceId: string | null; // null for free
}

export const PLANS: Record<string, Plan> = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    credits: 10,
    features: [
      "10 credits IA / mois",
      "Score d'adoption",
      "7 domaines de metriques",
      "1 utilisateur",
    ],
    stripePriceId: null,
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 49,
    credits: 200,
    features: [
      "200 credits IA / mois",
      "Toutes les metriques",
      "Rapport hebdomadaire auto",
      "Export PDF",
      "5 utilisateurs",
      "Support prioritaire",
    ],
    stripePriceId: process.env.STRIPE_PRICE_PRO || "",
  },
  business: {
    id: "business",
    name: "Business",
    price: 149,
    credits: 1000,
    features: [
      "1 000 credits IA / mois",
      "Toutes les metriques",
      "Agent IA avance (Sonnet)",
      "Coaching individuel",
      "API access",
      "Utilisateurs illimites",
      "Support dedie",
    ],
    stripePriceId: process.env.STRIPE_PRICE_BUSINESS || "",
  },
};

export function getPlanByStripePriceId(priceId: string): Plan | undefined {
  return Object.values(PLANS).find((p) => p.stripePriceId === priceId);
}

export function getPlanCredits(planId: string): number {
  return PLANS[planId]?.credits ?? 10;
}
