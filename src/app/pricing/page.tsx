"use client";

import Link from "next/link";
import { Check } from "lucide-react";

var plans = [
  {
    id: "free", name: "Free", price: 0, period: "",
    description: "Try Kairo with 50 credits/month",
    credits: "50 credits",
    features: ["50 AI credits / month", "Adoption score", "HubSpot connector", "1 user"],
    cta: "Get started free", href: "/signup", highlighted: false,
  },
  {
    id: "pro", name: "Pro", price: 49, period: "/mo",
    description: "For sales teams that want to perform",
    credits: "500 credits",
    features: ["500 AI credits / month", "All metrics & alerts", "Proactive monitoring", "PDF export", "5 users", "HubSpot + Notion + Lemlist", "Priority support"],
    cta: "Start 14-day trial", href: "/signup?plan=pro", highlighted: true,
  },
  {
    id: "business", name: "Business", price: 149, period: "/mo",
    description: "For RevOps teams that want to scale",
    credits: "2,000 credits",
    features: ["2,000 AI credits / month", "Multi-agent analysis (Opus)", "Per-rep coaching", "API access", "Unlimited users", "All connectors", "Dedicated support"],
    cta: "Contact sales", href: "/signup?plan=business", highlighted: false,
  },
];

var creditExamples = [
  { action: "Simple question", cost: "1 credit", example: "\"What's my win rate?\"" },
  { action: "Analysis with tools", cost: "2 credits", example: "\"Analyze my pipeline\"" },
  { action: "Full report", cost: "5 credits", example: "\"/report full audit\"" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/login" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-[#111] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">K</span>
            </div>
            <span className="text-[14px] font-semibold text-[#111]">Kairo</span>
          </Link>
          <Link href="/login" className="text-[13px] text-[#999] hover:text-[#111]">Sign in</Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-[#111] mb-2">Simple pricing, no surprises</h1>
          <p className="text-[14px] text-[#999]">Start free. Upgrade anytime. No commitment.</p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {plans.map(function(plan) {
            return (
              <div key={plan.id} className={"rounded-lg border p-5 flex flex-col " + (plan.highlighted ? "border-[#111] ring-1 ring-[#111] relative" : "border-[#EAEAEA]")}>
                {plan.highlighted && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#111] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">Popular</div>
                )}
                <h3 className="text-[15px] font-semibold text-[#111]">{plan.name}</h3>
                <p className="text-[12px] text-[#999] mt-1">{plan.description}</p>
                <div className="mt-4 mb-4">
                  <span className="text-2xl font-bold text-[#111]">{plan.price === 0 ? "Free" : plan.price + "€"}</span>
                  {plan.period && <span className="text-[13px] text-[#BBB]">{plan.period}</span>}
                  <div className="mt-0.5"><span className="text-[11px] text-[#BBB]">{plan.credits} / month</span></div>
                </div>
                <Link href={plan.href} className={"block text-center rounded-md h-9 flex items-center justify-center text-[13px] font-medium transition-colors mb-5 " + (plan.highlighted ? "bg-[#111] text-white hover:bg-[#333]" : "border border-[#EAEAEA] text-[#111] hover:bg-[#F5F5F5]")}>
                  {plan.cta}
                </Link>
                <div className="space-y-2 flex-1">
                  {plan.features.map(function(f) {
                    return (
                      <div key={f} className="flex items-start gap-2">
                        <Check size={13} className="text-[#22C55E] mt-0.5 shrink-0" />
                        <span className="text-[12px] text-[#555]">{f}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Credit explainer */}
        <div className="max-w-lg mx-auto">
          <h2 className="text-[15px] font-semibold text-[#111] text-center mb-4">How credits work</h2>
          <div className="rounded-lg border border-[#EAEAEA] overflow-hidden">
            <div className="grid grid-cols-3 border-b border-[#EAEAEA] px-4 py-2 bg-[#FAFAFA]">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#999]">Action</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#999]">Cost</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#999]">Example</span>
            </div>
            {creditExamples.map(function(ex) {
              return (
                <div key={ex.action} className="grid grid-cols-3 px-4 py-2.5 border-b border-[#F5F5F5] last:border-0">
                  <span className="text-[12px] font-medium text-[#111]">{ex.action}</span>
                  <span className="text-[12px] font-semibold text-[#111]">{ex.cost}</span>
                  <span className="text-[12px] text-[#999] italic">{ex.example}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-[#CCC] text-center mt-3">Kairo auto-picks the cheapest model (Haiku/Sonnet/Opus) for each query.</p>
        </div>
      </div>
    </div>
  );
}
