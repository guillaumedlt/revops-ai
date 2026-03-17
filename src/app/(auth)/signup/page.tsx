"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Extract company domain from email
  function getCompanyFromEmail(email: string): string {
    const domain = email.split("@")[1] ?? "";
    // Exclude common free email providers
    const freeProviders = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com", "me.com", "aol.com", "protonmail.com", "mail.com"];
    if (freeProviders.includes(domain.toLowerCase())) return "";
    // Capitalize domain name without TLD
    const name = domain.split(".")[0] ?? "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) return;
    setLoading(true);
    setError(null);

    // Validate professional email
    const domain = email.split("@")[1] ?? "";
    const freeProviders = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com", "me.com", "aol.com", "protonmail.com", "mail.com"];
    if (freeProviders.includes(domain.toLowerCase())) {
      setError("Veuillez utiliser une adresse email professionnelle");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const companyName = getCompanyFromEmail(email);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
          company: companyName,
        },
      },
    });

    if (signUpError) {
      if (signUpError.message.includes("already registered")) {
        setError("Un compte existe deja avec cet email");
      } else {
        setError(signUpError.message);
      }
      setLoading(false);
      return;
    }

    if (data.user) {
      // Create tenant + user record in public tables
      // The auth callback or middleware will handle this
      // For now, create directly via admin-level call
      try {
        const res = await fetch("/api/auth/setup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: data.user.id,
            email,
            firstName,
            lastName,
            company: companyName,
          }),
        });
        if (!res.ok) {
          console.error("Setup failed:", await res.text());
        }
      } catch {
        // Non-blocking, will be handled on first dashboard visit
      }

      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1120]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white text-lg font-semibold">R</div>
          <h1 className="mt-4 text-xl font-medium text-white">Creer votre compte</h1>
          <p className="mt-2 text-sm text-white/50">Adresse email professionnelle requise</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
              placeholder="Prenom" required
              className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none" />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
              placeholder="Nom" required
              className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none" />
          </div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="email@entreprise.com" required
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe (8 caracteres min.)" required minLength={8}
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none" />
          <button type="submit" disabled={loading || !firstName.trim() || !lastName.trim() || !email.trim() || !password}
            className="w-full rounded-md bg-white px-4 py-2.5 text-sm font-medium text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:opacity-50">
            {loading ? "Creation..." : "Creer mon compte"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/40">
          Deja un compte ?{" "}
          <Link href="/login" className="text-white/70 underline hover:text-white">Se connecter</Link>
        </p>
      </div>
    </main>
  );
}
