"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const errorParam = searchParams.get("error");
  const errorMessages: Record<string, string> = {
    missing_params: "Paramètres manquants. Réessayez.",
    invalid_state: "Session expirée. Réessayez.",
    oauth_failed: "La connexion HubSpot a échoué. Réessayez.",
    tenant_creation_failed: "Erreur lors de la création du compte.",
    user_creation_failed: "Erreur lors de la création de l'utilisateur.",
  };

  async function handleConnect() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/hubspot", { method: "POST" });
      const result = await response.json();

      if (result.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Redirect to HubSpot OAuth
      window.location.href = result.data.authUrl;
    } catch {
      setError("Erreur de connexion. Réessayez.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1120]">
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white text-lg font-semibold">
            R
          </div>
          <h1 className="mt-4 text-xl font-medium text-white">
            RevOps Command Center
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Pilotez votre machine commerciale
          </p>
        </div>

        {/* Error */}
        {(error || errorParam) && (
          <div className="mb-6 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {error || errorMessages[errorParam!] || "Une erreur est survenue."}
          </div>
        )}

        {/* Connect button */}
        <button
          onClick={handleConnect}
          disabled={loading}
          className="w-full rounded-md bg-[#FF7A59] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Connexion en cours..." : "Connecter mon HubSpot"}
        </button>

        <p className="mt-6 text-xs text-white/30">
          Pas de compte a creer. Connectez votre portail HubSpot et
          c&apos;est parti.
        </p>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-xs text-white/30">
            Fonctionne avec HubSpot Sales Hub
          </p>
          <p className="text-xs text-white/20">
            Free · Starter · Pro · Enterprise
          </p>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
