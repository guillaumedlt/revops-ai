export interface Plan {
  id: string;
  name: string;
  price: number; // EUR/month, 0 for free
  credits: number;
  features: string[];
  stripePriceId: string | null; // null for free
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number; // EUR, one-time
  stripePriceId: string;
  popular?: boolean;
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

// One-time credit packs (bonus credits, never expire within billing period)
export const CREDIT_PACKS: CreditPack[] = [
  {
    id: "pack_100",
    name: "100 credits",
    credits: 100,
    price: 9,
    stripePriceId: process.env.STRIPE_PRICE_PACK_100 || "",
  },
  {
    id: "pack_500",
    name: "500 credits",
    credits: 500,
    price: 39,
    stripePriceId: process.env.STRIPE_PRICE_PACK_500 || "",
    popular: true,
  },
  {
    id: "pack_1000",
    name: "1 000 credits",
    credits: 1000,
    price: 69,
    stripePriceId: process.env.STRIPE_PRICE_PACK_1000 || "",
  },
];

export function getPlanByStripePriceId(priceId: string): Plan | undefined {
  return Object.values(PLANS).find((p) => p.stripePriceId === priceId);
}

export function getCreditPackByStripePriceId(priceId: string): CreditPack | undefined {
  return CREDIT_PACKS.find((p) => p.stripePriceId === priceId);
}

export function getPlanCredits(planId: string): number {
  return PLANS[planId]?.credits ?? 50;
}
