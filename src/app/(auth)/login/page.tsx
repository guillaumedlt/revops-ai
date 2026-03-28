"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [loading, setLoading] = useState(false);
  var [error, setError] = useState<string | null>(null);
  var router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    setError(null);

    var supabase = createClient();
    var { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message === "Invalid login credentials"
        ? "Email ou mot de passe incorrect"
        : authError.message);
      setLoading(false);
    } else {
      router.refresh();
      router.push("/chat");
    }
  }

  return (
    <main className="flex min-h-screen">
      {/* Left — Form */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-[380px]">
          <div className="mb-10">
            <div className="h-10 w-10 rounded-xl bg-[#0A0A0A] flex items-center justify-center mb-6">
              <span className="text-white text-sm font-bold">K</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0A0A0A] tracking-tight">Bon retour</h1>
            <p className="text-sm text-[#737373] mt-1">Connecte-toi pour acceder a Kairo</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] px-4 py-3 text-[13px] text-[#EF4444]">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[12px] font-medium text-[#525252] mb-1.5">Email</label>
              <input
                type="email" value={email} onChange={function(e) { setEmail(e.target.value); }}
                placeholder="prenom@entreprise.com" required autoFocus
                className="w-full h-11 rounded-xl border border-[#E5E5E5] bg-white px-4 text-sm text-[#0A0A0A] placeholder:text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-shadow"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#525252] mb-1.5">Mot de passe</label>
              <input
                type="password" value={password} onChange={function(e) { setPassword(e.target.value); }}
                placeholder="••••••••" required minLength={8}
                className="w-full h-11 rounded-xl border border-[#E5E5E5] bg-white px-4 text-sm text-[#0A0A0A] placeholder:text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-shadow"
              />
            </div>
            <button
              type="submit" disabled={loading || !email.trim() || !password}
              className="w-full h-11 rounded-xl bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#262626] disabled:opacity-40 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Se connecter <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[13px] text-[#A3A3A3]">
            {"Pas encore de compte ? "}
            <Link href="/signup" className="text-[#0A0A0A] font-medium hover:underline">Creer un compte</Link>
          </p>
        </div>
      </div>

      {/* Right — Brand panel */}
      <div className="hidden lg:flex w-[420px] bg-[#0A0A0A] items-center justify-center p-12">
        <div className="text-center">
          <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl font-bold">K</span>
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">Ton RevOps IA</h2>
          <p className="text-sm text-white/50 leading-relaxed max-w-[280px] mx-auto">
            Analyse ta pipeline, detecte les problemes, et prends de meilleures decisions commerciales — propulse par l&apos;IA.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">24+</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Tools</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">LLMs</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Alertes</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
