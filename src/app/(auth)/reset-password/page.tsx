"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Mail } from "lucide-react";

export default function ResetPasswordPage() {
  var [email, setEmail] = useState("");
  var [loading, setLoading] = useState(false);
  var [sent, setSent] = useState(false);
  var [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);

    var supabase = createClient();
    var { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: (window.location.origin || "https://revops-ai-six.vercel.app") + "/update-password",
    });

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-[13px] text-[#999] hover:text-[#111] mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to login
        </Link>

        {sent ? (
          <div className="text-center">
            <div className="h-12 w-12 rounded-lg bg-[#F0FDF4] flex items-center justify-center mx-auto mb-4">
              <Mail size={24} className="text-[#22C55E]" />
            </div>
            <h1 className="text-xl font-bold text-[#111] mb-2">Check your email</h1>
            <p className="text-[13px] text-[#999]">
              We sent a password reset link to <strong className="text-[#111]">{email}</strong>
            </p>
            <p className="text-[12px] text-[#CCC] mt-4">
              {"Didn't receive it? Check spam or "}
              <button onClick={function() { setSent(false); }} className="text-[#111] underline">try again</button>
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-xl font-bold text-[#111] mb-1">Reset password</h1>
            <p className="text-[13px] text-[#999] mb-6">{"Enter your email and we'll send you a reset link."}</p>

            {error && (
              <div className="mb-4 rounded-lg bg-[#FEF2F2] border border-[#FECACA] px-4 py-3 text-[13px] text-[#EF4444]">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[12px] font-medium text-[#555] mb-1.5">Email</label>
                <input
                  type="email" value={email} onChange={function(e) { setEmail(e.target.value); }}
                  placeholder="you@company.com" required autoFocus
                  className="w-full h-10 rounded-lg border border-[#EAEAEA] bg-white px-4 text-[13px] text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#111] transition-colors"
                />
              </div>
              <button
                type="submit" disabled={loading || !email.trim()}
                className="w-full h-10 rounded-lg bg-[#111] text-white text-[13px] font-medium hover:bg-[#333] disabled:opacity-40 transition-colors"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
