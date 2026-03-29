"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Check } from "lucide-react";

export default function UpdatePasswordPage() {
  var [password, setPassword] = useState("");
  var [confirm, setConfirm] = useState("");
  var [loading, setLoading] = useState(false);
  var [done, setDone] = useState(false);
  var [error, setError] = useState<string | null>(null);
  var router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) { setError("Password must be at least 8 characters"); return; }
    if (password !== confirm) { setError("Passwords do not match"); return; }
    setLoading(true);
    setError(null);

    var supabase = createClient();
    var { error: updateError } = await supabase.auth.updateUser({ password: password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      setDone(true);
      setTimeout(function() { router.push("/chat"); }, 2000);
    }
  }

  if (done) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <div className="h-12 w-12 rounded-lg bg-[#F0FDF4] flex items-center justify-center mx-auto mb-4">
            <Check size={24} className="text-[#22C55E]" />
          </div>
          <h1 className="text-xl font-bold text-[#111] mb-2">Password updated</h1>
          <p className="text-[13px] text-[#999]">Redirecting to Kairo...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-[380px]">
        <h1 className="text-xl font-bold text-[#111] mb-1">Set new password</h1>
        <p className="text-[13px] text-[#999] mb-6">Choose a strong password for your account.</p>

        {error && (
          <div className="mb-4 rounded-lg bg-[#FEF2F2] border border-[#FECACA] px-4 py-3 text-[13px] text-[#EF4444]">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[12px] font-medium text-[#555] mb-1.5">New password</label>
            <input
              type="password" value={password} onChange={function(e) { setPassword(e.target.value); }}
              placeholder="8 characters minimum" required minLength={8} autoFocus
              className="w-full h-10 rounded-lg border border-[#EAEAEA] bg-white px-4 text-[13px] text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#111] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[#555] mb-1.5">Confirm password</label>
            <input
              type="password" value={confirm} onChange={function(e) { setConfirm(e.target.value); }}
              placeholder="Repeat password" required minLength={8}
              className="w-full h-10 rounded-lg border border-[#EAEAEA] bg-white px-4 text-[13px] text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#111] transition-colors"
            />
          </div>
          <button
            type="submit" disabled={loading || password.length < 8}
            className="w-full h-10 rounded-lg bg-[#111] text-white text-[13px] font-medium hover:bg-[#333] disabled:opacity-40 transition-colors"
          >
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </main>
  );
}
