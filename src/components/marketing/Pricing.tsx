import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "",
    desc: "Pour découvrir Kairo",
    credits: "10 crédits / mois",
    features: [
      "Assistant IA conversationnel",
      "Intégration HubSpot",
      "Analytics de base",
      "1 utilisateur",
      "1 dashboard",
    ],
    cta: "Commencer gratuitement",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "49",
    period: "/ mois",
    desc: "Pour les équipes commerciales en croissance",
    credits: "200 crédits / mois",
    features: [
      "Tout le plan Free",
      "28 outils IA",
      "Forecasting & funnel",
      "Morning briefing",
      "Dashboards illimités",
      "5 utilisateurs",
      "Intégration Lemlist",
    ],
    cta: "Essai gratuit 14 jours",
    href: "/signup?plan=pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "149",
    period: "/ mois",
    desc: "Pour les organisations RevOps établies",
    credits: "1 000 crédits / mois",
    features: [
      "Tout le plan Pro",
      "Rapports d'audit complets",
      "ICP Builder",
      "Scores de qualité CRM",
      "Deal health scoring",
      "Utilisateurs illimités",
      "Support prioritaire",
    ],
    cta: "Essai gratuit 14 jours",
    href: "/signup?plan=business",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="tarifs" className="py-24 md:py-32">
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[13px] text-[#BBB] uppercase tracking-wider mb-4">
            Tarifs
          </p>
          <h2 className="text-[32px] sm:text-[40px] font-bold text-[#111] leading-tight tracking-tight mb-4">
            Simple, transparent,{" "}
            <span className="text-[#BBB]">sans engagement.</span>
          </h2>
          <p className="text-[17px] text-[#999]">
            Commencez gratuitement. Passez au plan supérieur quand vous en avez besoin.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                "rounded-lg p-7 flex flex-col transition-all " +
                (plan.highlight
                  ? "bg-[#111] text-white ring-1 ring-[#111] scale-[1.02]"
                  : "bg-white border border-[#EAEAEA] hover:border-[#D4D4D4]")
              }
            >
              <div>
                <h3
                  className={
                    "text-[18px] font-semibold " +
                    (plan.highlight ? "text-white" : "text-[#111]")
                  }
                >
                  {plan.name}
                </h3>
                <p
                  className={
                    "text-[13px] mt-1 " +
                    (plan.highlight ? "text-white/50" : "text-[#BBB]")
                  }
                >
                  {plan.desc}
                </p>
              </div>

              <div className="mt-6 mb-2">
                <span
                  className={
                    "text-[40px] font-bold tracking-tight " +
                    (plan.highlight ? "text-white" : "text-[#111]")
                  }
                >
                  {plan.price}&euro;
                </span>
                {plan.period && (
                  <span
                    className={
                      "text-[14px] ml-1 " +
                      (plan.highlight ? "text-white/50" : "text-[#BBB]")
                    }
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              <p
                className={
                  "text-[13px] font-medium mb-6 " +
                  (plan.highlight ? "text-white/60" : "text-[#999]")
                }
              >
                {plan.credits}
              </p>

              <Link
                href={plan.href}
                className={
                  "w-full h-11 flex items-center justify-center rounded-lg text-[14px] font-medium transition-all " +
                  (plan.highlight
                    ? "bg-white text-[#111] hover:bg-white/90"
                    : "bg-[#111] text-white hover:bg-[#1a1a1a]")
                }
              >
                {plan.cta}
              </Link>

              <ul className="mt-7 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={
                      "flex items-start gap-2.5 text-[13px] " +
                      (plan.highlight ? "text-white/70" : "text-[#999]")
                    }
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={
                        "mt-0.5 shrink-0 " +
                        (plan.highlight ? "text-white/40" : "text-[#D4D4D4]")
                      }
                    >
                      <path
                        d="M13.3 4.3L6 11.6L2.7 8.3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
