import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "",
    desc: "Get started with Kairo",
    credits: "50 credits / month",
    features: ["AI chat assistant", "HubSpot integration", "Basic analytics", "1 user", "1 dashboard"],
    cta: "Start free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Pro",
    price: "49",
    period: "/ month",
    desc: "For growing sales teams",
    credits: "500 credits / month",
    features: ["Everything in Free", "All 28 AI tools", "Forecasting & funnel", "Morning briefing", "Unlimited dashboards", "5 users", "Lemlist integration"],
    cta: "Start free trial",
    href: "/signup?plan=pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "149",
    period: "/ month",
    desc: "For established RevOps",
    credits: "2,000 credits / month",
    features: ["Everything in Pro", "Full audit reports", "ICP builder", "CRM hygiene scores", "Deal health scoring", "Unlimited users", "Priority support"],
    cta: "Start free trial",
    href: "/signup?plan=business",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Simple pricing</h2>
          <p className="text-[#737373]">Start free. Upgrade when you need more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                "rounded-2xl p-6 " +
                (plan.highlight
                  ? "bg-[#0A0A0A] text-white ring-2 ring-[#0A0A0A]"
                  : "bg-white border border-[#E5E5E5]")
              }
            >
              <h3 className={"text-lg font-semibold " + (plan.highlight ? "text-white" : "text-[#0A0A0A]")}>
                {plan.name}
              </h3>
              <p className={"text-xs mt-1 " + (plan.highlight ? "text-white/50" : "text-[#A3A3A3]")}>
                {plan.desc}
              </p>
              <div className="mt-4 mb-6">
                <span className={"text-4xl font-bold " + (plan.highlight ? "text-white" : "text-[#0A0A0A]")}>
                  {"$" + plan.price}
                </span>
                {plan.period && (
                  <span className={"text-sm " + (plan.highlight ? "text-white/50" : "text-[#A3A3A3]")}>
                    {plan.period}
                  </span>
                )}
              </div>
              <p className={"text-xs font-medium mb-4 " + (plan.highlight ? "text-white/70" : "text-[#737373]")}>
                {plan.credits}
              </p>
              <Link
                href={plan.href}
                className={
                  "w-full h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-colors " +
                  (plan.highlight
                    ? "bg-white text-[#0A0A0A] hover:bg-white/90"
                    : "bg-[#0A0A0A] text-white hover:bg-[#333]")
                }
              >
                {plan.cta}
              </Link>
              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={"flex items-center gap-2 text-xs " + (plan.highlight ? "text-white/70" : "text-[#737373]")}
                  >
                    <span className={"shrink-0 " + (plan.highlight ? "text-white/40" : "text-[#D4D4D4]")}>
                      {"\u2713"}
                    </span>
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
