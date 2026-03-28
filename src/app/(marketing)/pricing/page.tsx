"use client";

import { useState } from "react";
import { Check } from "lucide-react";

var plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "",
    description: "Decouvre Kairo avec 50 credits/mois",
    credits: "50 credits",
    features: [
      "50 credits IA / mois",
      "Score d'adoption CRM",
      "7 domaines de metriques",
      "1 utilisateur",
      "Connecteur HubSpot",
    ],
    cta: "Commencer gratuitement",
    href: "/signup",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    period: "/mois",
    description: "Pour les equipes commerciales qui veulent performer",
    credits: "500 credits",
    features: [
      "500 credits IA / mois",
      "Toutes les metriques",
      "Alertes proactives",
      "Rapports automatiques",
      "Export PDF",
      "5 utilisateurs",
      "Connecteurs HubSpot + Notion + Lemlist",
      "Support prioritaire",
    ],
    cta: "Essai gratuit 14 jours",
    href: "/signup?plan=pro",
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    price: 149,
    period: "/mois",
    description: "Pour les equipes RevOps qui veulent scaler",
    credits: "2 000 credits",
    features: [
      "2 000 credits IA / mois",
      "Agent IA avance (Opus)",
      "Coaching individuel par rep",
      "Acces API",
      "Utilisateurs illimites",
      "Tous les connecteurs",
      "Support dedie",
      "Onboarding personnalise",
    ],
    cta: "Contacter les ventes",
    href: "/signup?plan=business",
    highlighted: false,
  },
];

var creditExamples = [
  { action: "Question simple", cost: "1 credit", example: "\"Quel est mon win rate ?\"" },
  { action: "Analyse avec tools", cost: "2 credits", example: "\"Analyse ma pipeline\"" },
  { action: "Rapport complet", cost: "5 credits", example: "\"/report audit CRM\"" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-[#111] mb-3">Pricing simple, sans surprise</h1>
          <p className="text-base text-[#999] max-w-lg mx-auto">
            Commence gratuitement. Upgrade quand tu veux. Pas d'engagement.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {plans.map(function(plan) {
            return (
              <div
                key={plan.id}
                className={"rounded-lg border p-6 flex flex-col " + (plan.highlighted ? "border-[#111] ring-1 ring-[#111] relative" : "border-[#EAEAEA]")}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Populaire
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-lg font-semibold text-[#111]">{plan.name}</h3>
                  <p className="text-[13px] text-[#999] mt-1">{plan.description}</p>
                </div>
                <div className="mb-5">
                  <span className="text-3xl font-bold text-[#111]">{plan.price === 0 ? "Gratuit" : plan.price + " EUR"}</span>
                  {plan.period && <span className="text-sm text-[#BBB]">{plan.period}</span>}
                  <div className="mt-1">
                    <span className="text-xs text-[#BBB]">{plan.credits} / mois</span>
                  </div>
                </div>
                <a
                  href={plan.href}
                  className={"block text-center rounded-lg h-11 flex items-center justify-center text-sm font-medium transition-colors mb-6 " + (plan.highlighted ? "bg-[#111] text-white hover:bg-[#333]" : "border border-[#EAEAEA] text-[#111] hover:bg-[#FAFAFA]")}
                >
                  {plan.cta}
                </a>
                <div className="space-y-2.5 flex-1">
                  {plan.features.map(function(f) {
                    return (
                      <div key={f} className="flex items-start gap-2">
                        <Check size={14} className="text-[#22C55E] mt-0.5 shrink-0" />
                        <span className="text-[13px] text-[#555]">{f}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Credit explainer */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold text-[#111] text-center mb-6">Comment marchent les credits ?</h2>
          <div className="bg-[#FAFAFA] rounded-lg border border-[#EAEAEA] overflow-hidden">
            <div className="grid grid-cols-3 gap-0 border-b border-[#EAEAEA] px-4 py-2.5 bg-[#F5F5F5]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#999]">Action</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#999]">Cout</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#999]">Exemple</span>
            </div>
            {creditExamples.map(function(ex) {
              return (
                <div key={ex.action} className="grid grid-cols-3 gap-0 px-4 py-3 border-b border-[#F0F0F0] last:border-0">
                  <span className="text-sm font-medium text-[#111]">{ex.action}</span>
                  <span className="text-sm text-[#111] font-semibold">{ex.cost}</span>
                  <span className="text-sm text-[#999] italic">{ex.example}</span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-[#BBB] text-center mt-3">
            Kairo optimise automatiquement le modele utilise (Haiku/Sonnet/Opus) selon ta question pour maximiser tes credits.
          </p>
        </div>
      </div>
    </div>
  );
}
