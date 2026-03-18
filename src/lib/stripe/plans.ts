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
    credits: 50,
    features: [
      "50 AI credits / month",
      "Adoption score",
      "7 metric domains",
      "1 user",
    ],
    stripePriceId: null,
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 49,
    credits: 500,
    features: [
      "500 AI credits / month",
      "All metrics",
      "Auto weekly report",
      "PDF export",
      "5 users",
      "Priority support",
    ],
    stripePriceId: process.env.STRIPE_PRICE_PRO || "",
  },
  business: {
    id: "business",
    name: "Business",
    price: 149,
    credits: 2000,
    features: [
      "2,000 AI credits / month",
      "All metrics",
      "Advanced AI agent (Sonnet)",
      "Individual coaching",
      "API access",
      "Unlimited users",
      "Dedicated support",
    ],
    stripePriceId: process.env.STRIPE_PRICE_BUSINESS || "",
  },
};

export function getPlanByStripePriceId(priceId: string): Plan | undefined {
  return Object.values(PLANS).find((p) => p.stripePriceId === priceId);
}

export function getPlanCredits(planId: string): number {
  return PLANS[planId]?.credits ?? 50;
}
