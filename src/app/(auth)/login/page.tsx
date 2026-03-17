"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message === "Invalid login credentials"
        ? "Email ou mot de passe incorrect"
        : error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1120]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white text-lg font-semibold">R</div>
          <h1 className="mt-4 text-xl font-medium text-white">RevOps Command Center</h1>
          <p className="mt-2 text-sm text-white/50">Connectez-vous a votre compte</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="email@entreprise.com" required autoFocus
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe" required minLength={8}
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none" />
          <button type="submit" disabled={loading || !email.trim() || !password}
            className="w-full rounded-md bg-white px-4 py-2.5 text-sm font-medium text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:opacity-50">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/40">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="text-white/70 underline hover:text-white">Creer un compte</Link>
        </p>
      </div>
    </main>
  );
}
