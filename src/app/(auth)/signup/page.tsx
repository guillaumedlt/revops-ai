"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight } from "lucide-react";

export default function SignupPage() {
  var [firstName, setFirstName] = useState("");
  var [lastName, setLastName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [loading, setLoading] = useState(false);
  var [error, setError] = useState<string | null>(null);
  var router = useRouter();

  function getCompanyFromEmail(e: string): string {
    var domain = e.split("@")[1] ?? "";
    var freeProviders = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com", "me.com", "aol.com", "protonmail.com", "mail.com"];
    if (freeProviders.includes(domain.toLowerCase())) return "";
    var name = domain.split(".")[0] ?? "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) return;
    setLoading(true);
    setError(null);

    var domain = email.split("@")[1] ?? "";
    var freeProviders = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com", "me.com", "aol.com", "protonmail.com", "mail.com"];
    if (freeProviders.includes(domain.toLowerCase())) {
      setError("Utilise ton email professionnel (pas gmail, outlook, etc.)");
      setLoading(false);
      return;
    }

    var supabase = createClient();
    var companyName = getCompanyFromEmail(email);

    var { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName, full_name: firstName + " " + lastName, company: companyName },
      },
    });

    if (signUpError) {
      setError(signUpError.message.includes("already registered")
        ? "Un compte existe deja avec cet email"
        : signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      try {
        await fetch("/api/auth/setup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: data.user.id, email, firstName, lastName, company: companyName }),
        });
      } catch {}
      router.push("/onboarding");
      router.refresh();
    }
  }

  return (
    <main className="flex min-h-screen">
      {/* Left — Brand panel */}
      <div className="hidden lg:flex w-[420px] bg-[#0A0A0A] items-center justify-center p-12">
        <div className="text-center">
          <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl font-bold">K</span>
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">Kairo</h2>
          <p className="text-sm text-white/50 leading-relaxed max-w-[280px] mx-auto">
            L&apos;assistant IA qui transforme ton HubSpot en machine a revenue.
          </p>
          <div className="mt-8 space-y-3 text-left max-w-[260px] mx-auto">
            {["Analyse pipeline en temps reel", "Alertes proactives quotidiennes", "Rapports en 1 question"].map(function(f) {
              return (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-white/40 shrink-0" />
                  <span className="text-[13px] text-white/60">{f}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-[380px]">
          <div className="mb-10">
            <div className="lg:hidden h-10 w-10 rounded-xl bg-[#0A0A0A] flex items-center justify-center mb-6">
              <span className="text-white text-sm font-bold">K</span>
            </div>
            <h1 className="text-2xl font-bold text-[#0A0A0A] tracking-tight">Creer ton compte</h1>
            <p className="text-sm text-[#737373] mt-1">Email professionnel requis</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] px-4 py-3 text-[13px] text-[#EF4444]">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-medium text-[#525252] mb-1.5">Prenom</label>
                <input type="text" value={firstName} onChange={function(e) { setFirstName(e.target.value); }}
                  placeholder="Guillaume" required
                  className="w-full h-11 rounded-xl border border-[#E5E5E5] bg-white px-4 text-sm text-[#0A0A0A] placeholder:text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-shadow" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#525252] mb-1.5">Nom</label>
                <input type="text" value={lastName} onChange={function(e) { setLastName(e.target.value); }}
                  placeholder="Dupont" required
                  className="w-full h-11 rounded-xl border border-[#E5E5E5] bg-white px-4 text-sm text-[#0A0A0A] placeholder:text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-shadow" />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#525252] mb-1.5">Email professionnel</label>
              <input type="email" value={email} onChange={function(e) { setEmail(e.target.value); }}
                placeholder="prenom@entreprise.com" required
                className="w-full h-11 rounded-xl border border-[#E5E5E5] bg-white px-4 text-sm text-[#0A0A0A] placeholder:text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-shadow" />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#525252] mb-1.5">Mot de passe</label>
              <input type="password" value={password} onChange={function(e) { setPassword(e.target.value); }}
                placeholder="8 caracteres minimum" required minLength={8}
                className="w-full h-11 rounded-xl border border-[#E5E5E5] bg-white px-4 text-sm text-[#0A0A0A] placeholder:text-[#C0C0C0] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent transition-shadow" />
            </div>
            <button type="submit" disabled={loading || !firstName.trim() || !lastName.trim() || !email.trim() || !password}
              className="w-full h-11 rounded-xl bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#262626] disabled:opacity-40 transition-colors flex items-center justify-center gap-2 mt-1">
              {loading ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Creer mon compte <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[13px] text-[#A3A3A3]">
            {"Deja un compte ? "}
            <Link href="/login" className="text-[#0A0A0A] font-medium hover:underline">Se connecter</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
