"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Check } from "lucide-react";

interface TenantInfo {
  plan: string;
  credits_remaining: number;
  credits_allocated: number;
  hubspot_connected: boolean;
  hubspot_portal_id?: string;
  last_sync_at?: string;
}

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    credits: 10,
    features: [
      "10 credits IA / mois",
      "Score d\'adoption",
      "7 domaines de metriques",
      "1 utilisateur",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    credits: 200,
    popular: true,
    features: [
      "200 credits IA / mois",
      "Toutes les metriques",
      "Rapport hebdo auto",
      "Export PDF",
      "5 utilisateurs",
      "Support prioritaire",
    ],
  },
  {
    id: "business",
    name: "Business",
    price: 149,
    credits: 1000,
    features: [
      "1 000 credits IA / mois",
      "Agent IA avance",
      "Coaching individuel",
      "API access",
      "Utilisateurs illimites",
      "Support dedie",
    ],
  },
];

function SettingsContent() {
  const [tenant, setTenant] = useState<TenantInfo | null>(null);
  const [upgrading, setUpgrading] = useState<string | null>(null);
  const [connectingHubSpot, setConnectingHubSpot] = useState(false);
  const searchParams = useSearchParams();
  const hubspotStatus = searchParams.get("hubspot");

  useEffect(() => {
    // Default state -- in production this would fetch from API
    setTenant({
      plan: "free",
      credits_remaining: 10,
      credits_allocated: 10,
      hubspot_connected: false,
    });
  }, []);

  async function handleConnectHubSpot() {
    setConnectingHubSpot(true);
    try {
      const res = await fetch("/api/auth/hubspot", { method: "POST" });
      const data = await res.json();
      if (data.data?.authUrl) {
        window.location.href = data.data.authUrl;
      }
    } catch {
      /* error */
    }
    setConnectingHubSpot(false);
  }

  async function handleUpgrade(planId: string) {
    setUpgrading(planId);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.data?.checkoutUrl) window.location.href = data.data.checkoutUrl;
    } catch {
      /* error */
    }
    setUpgrading(null);
  }

  async function handleManageBilling() {
    const res = await fetch("/api/billing/portal", { method: "POST" });
    const data = await res.json();
    if (data.data?.portalUrl) window.location.href = data.data.portalUrl;
  }

  const currentPlan = tenant?.plan ?? "free";

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium tracking-tight text-[#0A0A0A]">
        Parametres
      </h1>

      {/* HubSpot success/error banners */}
      {hubspotStatus === "success" && (
        <div className="rounded border border-[#22C55E]/20 bg-[#F0FDF4] px-4 py-3 text-sm text-[#22C55E]">
          HubSpot connecte avec succes. Le premier sync demarre
          automatiquement.
        </div>
      )}
      {hubspotStatus === "error" && (
        <div className="rounded border border-[#EF4444]/20 bg-[#FEF2F2] px-4 py-3 text-sm text-[#EF4444]">
          Erreur de connexion HubSpot. Reessayez.
        </div>
      )}

      {/* HubSpot Integration */}
      <div className="rounded border border-[#E5E5E5] p-4">
        <h2 className="text-base font-medium text-[#0A0A0A] mb-3">
          Integration HubSpot
        </h2>
        {tenant?.hubspot_connected ? (
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#22C55E]" />
                <span className="text-sm text-[#0A0A0A]">
                  Connecte -- Portal {tenant.hubspot_portal_id}
                </span>
              </div>
              {tenant.last_sync_at && (
                <p className="mt-1 text-xs text-[#737373]">
                  Dernier sync :{" "}
                  {new Date(tenant.last_sync_at).toLocaleString("fr-FR")}
                </p>
              )}
            </div>
            <button
              onClick={handleConnectHubSpot}
              className="rounded border border-[#E5E5E5] px-3 py-1.5 text-xs font-medium text-[#525252] hover:bg-[#F5F5F5]"
            >
              Reconnecter
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#737373]">
              Connectez votre CRM pour commencer l&apos;analyse.
            </p>
            <button
              onClick={handleConnectHubSpot}
              disabled={connectingHubSpot}
              className="rounded bg-[#FF7A59] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              {connectingHubSpot ? "Connexion..." : "Connecter HubSpot"}
            </button>
          </div>
        )}
      </div>

      {/* Credit usage */}
      <div className="rounded border border-[#E5E5E5] p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[#737373]">
          Credits IA ce mois
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-semibold font-mono tabular-nums text-[#0A0A0A]">
            {tenant?.credits_remaining ?? 0}
          </span>
          <span className="text-sm text-[#737373]">
            / {tenant?.credits_allocated ?? 0}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-[#F5F5F5]">
          <div
            className="h-full rounded-full bg-[#0A0A0A]"
            style={{
              width: `${Math.min(
                100,
                ((tenant?.credits_remaining ?? 0) /
                  Math.max(1, tenant?.credits_allocated ?? 1)) *
                  100
              )}%`,
            }}
          />
        </div>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-base font-medium text-[#0A0A0A] mb-4">
          Abonnement
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {PLANS.map((plan) => {
            const isCurrent = currentPlan === plan.id;
            return (
              <div
                key={plan.id}
                className={`rounded border p-4 ${
                  plan.popular ? "border-[#0A0A0A]" : "border-[#E5E5E5]"
                } ${isCurrent ? "bg-[#FAFAFA]" : ""}`}
              >
                {plan.popular && (
                  <span className="mb-2 inline-block rounded-sm bg-[#0A0A0A] px-2 py-0.5 text-[10px] font-medium text-white">
                    Populaire
                  </span>
                )}
                <h3 className="text-base font-medium text-[#0A0A0A]">
                  {plan.name}
                </h3>
                <div className="mt-1 flex items-baseline gap-1">
                  {plan.price === 0 ? (
                    <span className="text-2xl font-semibold text-[#0A0A0A]">
                      Gratuit
                    </span>
                  ) : (
                    <>
                      <span className="text-2xl font-semibold font-mono text-[#0A0A0A]">
                        {plan.price}
                      </span>
                      <span className="text-sm text-[#737373]">EUR/mois</span>
                    </>
                  )}
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-[#525252]"
                    >
                      <Check size={14} className="mt-0.5 text-[#22C55E]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  {isCurrent ? (
                    <button
                      onClick={handleManageBilling}
                      className="w-full rounded border border-[#E5E5E5] px-3 py-2 text-sm font-medium text-[#525252] hover:bg-[#F5F5F5]"
                    >
                      Plan actuel
                    </button>
                  ) : plan.price === 0 ? null : (
                    <button
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={upgrading === plan.id}
                      className="w-full rounded bg-[#0A0A0A] px-3 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                    >
                      {upgrading === plan.id
                        ? "Redirection..."
                        : "Choisir ce plan"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {currentPlan !== "free" && (
        <button
          onClick={handleManageBilling}
          className="text-sm text-[#737373] underline hover:text-[#0A0A0A]"
        >
          Gerer mon abonnement et mes factures
        </button>
      )}
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense>
      <SettingsContent />
    </Suspense>
  );
}
