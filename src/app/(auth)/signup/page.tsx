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
    const freeProviders = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com", "me.com", "aol.com", "protonmail.com", "mail.com"];
    if (freeProviders.includes(domain.toLowerCase())) return "";
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
      setError("Please use a professional email address");
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
        setError("An account already exists with this email");
      } else {
        setError(signUpError.message);
      }
      setLoading(false);
      return;
    }

    if (data.user) {
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
        // Non-blocking
      }

      router.push("/chat");
      router.refresh();
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B1120]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white text-lg font-semibold">K</div>
          <h1 className="mt-4 text-xl font-medium text-white">Create your account</h1>
          <p className="mt-2 text-sm text-white/50">Professional email required</p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name" required
              className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none" />
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name" required
              className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none" />
          </div>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="email@company.com" required
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (8 characters min.)" required minLength={8}
            className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none" />
          <button type="submit" disabled={loading || !firstName.trim() || !lastName.trim() || !email.trim() || !password}
            className="w-full rounded-md bg-white px-4 py-2.5 text-sm font-medium text-[#0A0A0A] transition-opacity hover:opacity-90 disabled:opacity-50">
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/40">
          Already have an account?{" "}
          <Link href="/login" className="text-white/70 underline hover:text-white">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
