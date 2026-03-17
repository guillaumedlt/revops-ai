"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/client";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const supabase = createClient();

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  if (sent) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B1120]">
        <div className="w-full max-w-sm text-center">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white text-lg font-semibold">
            R
          </div>
          <h1 className="mt-4 text-xl font-medium text-white">
            Verifie ta boite mail
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Un lien de connexion a ete envoye a {email}
          </p>
          <button
            onClick={() => setSent(false)}
            className="mt-6 text-xs text-white/30 underline"
          >
            Utiliser une autre adresse
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1120]">
      <div className="w-full max-w-sm text-center">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white text-lg font-semibold">
          R
        </div>
        <h1 className="mt-4 text-xl font-medium text-white">
          RevOps Command Center
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Pilotez votre machine commerciale
        </p>

        {(error || errorParam) && (
          <div className="mt-6 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {error || "Une erreur est survenue. Reessayez."}
          </div>
        )}

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="mt-6 w-full rounded-md border border-white/20 bg-white px-4 py-2.5 text-sm font-medium text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Continuer avec Google
        </button>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/30">ou</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Magic link */}
        <form onSubmit={handleMagicLink} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@entreprise.com"
            required
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full rounded-md bg-white px-4 py-2.5 text-sm font-medium text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Recevoir un lien de connexion"}
          </button>
        </form>

        <p className="mt-8 text-xs text-white/20">
          Pas de mot de passe. Un lien securise est envoye par email.
        </p>
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
