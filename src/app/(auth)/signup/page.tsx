"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight } from "lucide-react";

var COMPANY_SIZES = [
  { value: "1-10", label: "1–10" },
  { value: "11-50", label: "11–50" },
  { value: "51-200", label: "51–200" },
  { value: "201-1000", label: "201–1,000" },
  { value: "1000+", label: "1,000+" },
];

var ROLES = [
  { value: "ceo", label: "CEO / Founder" },
  { value: "vp_sales", label: "VP Sales / Head of Sales" },
  { value: "revops", label: "RevOps / Sales Ops" },
  { value: "marketing", label: "Marketing / Growth" },
  { value: "sales_rep", label: "Sales Rep / AE" },
  { value: "cs", label: "Customer Success" },
  { value: "other", label: "Other" },
];

var SOURCES = [
  { value: "google", label: "Google" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "referral", label: "Referral" },
  { value: "twitter", label: "Twitter / X" },
  { value: "podcast", label: "Podcast" },
  { value: "event", label: "Event / Webinar" },
  { value: "other", label: "Other" },
];

export default function SignupPage() {
  var [step, setStep] = useState(1);
  var [firstName, setFirstName] = useState("");
  var [lastName, setLastName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [companyName, setCompanyName] = useState("");
  var [companySize, setCompanySize] = useState("");
  var [role, setRole] = useState("");
  var [source, setSource] = useState("");
  var [loading, setLoading] = useState(false);
  var [error, setError] = useState<string | null>(null);
  var router = useRouter();

  function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) return;
    var domain = email.split("@")[1] ?? "";
    var freeProviders = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "icloud.com", "me.com", "aol.com", "protonmail.com", "mail.com"];
    if (freeProviders.includes(domain.toLowerCase())) {
      setError("Please use a professional email address");
      return;
    }
    setError(null);
    // Auto-fill company name from email domain
    if (!companyName) {
      var name = domain.split(".")[0] ?? "";
      setCompanyName(name.charAt(0).toUpperCase() + name.slice(1));
    }
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName.trim() || !companySize || !role) return;
    setLoading(true);
    setError(null);

    var supabase = createClient();
    var { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: firstName + " " + lastName,
          company: companyName,
          company_size: companySize,
          role: role,
          source: source,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message.includes("already registered")
        ? "An account already exists with this email"
        : signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      try {
        await fetch("/api/auth/setup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: data.user.id,
            email,
            firstName,
            lastName,
            company: companyName,
            companySize: companySize,
            role: role,
            source: source,
          }),
        });
      } catch {}
      router.push("/onboarding");
      router.refresh();
    }
  }

  var inputClass = "w-full h-10 rounded-lg border border-[#EAEAEA] bg-white px-3 text-[13px] text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#111] transition-colors";
  var selectClass = "w-full h-10 rounded-lg border border-[#EAEAEA] bg-white px-3 text-[13px] text-[#111] focus:outline-none focus:border-[#111] transition-colors appearance-none cursor-pointer";

  return (
    <main className="flex min-h-screen">
      {/* Left — Brand panel */}
      <div className="hidden lg:flex w-[400px] bg-[#111] items-center justify-center p-12">
        <div className="text-center">
          <div className="h-14 w-14 rounded-lg bg-white/10 flex items-center justify-center mx-auto mb-5">
            <span className="text-white text-xl font-bold">K</span>
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">Kairo</h2>
          <p className="text-[13px] text-white/50 leading-relaxed max-w-[260px] mx-auto">
            The AI assistant that turns your HubSpot into a revenue machine.
          </p>
          <div className="mt-8 space-y-2.5 text-left max-w-[240px] mx-auto">
            {["Real-time pipeline analysis", "Daily proactive alerts", "Multi-agent reports", "Action board with AI"].map(function(f) {
              return (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-white/40 shrink-0" />
                  <span className="text-[12px] text-white/60">{f}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-[380px]">
          <div className="lg:hidden h-8 w-8 rounded bg-[#111] flex items-center justify-center mb-6">
            <span className="text-white text-[10px] font-bold">K</span>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className={"h-1 flex-1 rounded-full " + (step >= 1 ? "bg-[#111]" : "bg-[#EAEAEA]")} />
            <div className={"h-1 flex-1 rounded-full " + (step >= 2 ? "bg-[#111]" : "bg-[#EAEAEA]")} />
          </div>

          <h1 className="text-xl font-bold text-[#111] tracking-tight">{step === 1 ? "Create your account" : "About your company"}</h1>
          <p className="text-[13px] text-[#999] mt-1 mb-6">{step === 1 ? "Professional email required" : "Help us personalize your experience"}</p>

          {error && (
            <div className="mb-4 rounded-lg bg-[#FEF2F2] border border-[#FECACA] px-3 py-2.5 text-[12px] text-[#EF4444]">{error}</div>
          )}

          {/* Step 1: Account info */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#555] mb-1">First name</label>
                  <input type="text" value={firstName} onChange={function(e) { setFirstName(e.target.value); }}
                    placeholder="Guillaume" required autoFocus className={inputClass} />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#555] mb-1">Last name</label>
                  <input type="text" value={lastName} onChange={function(e) { setLastName(e.target.value); }}
                    placeholder="Dupont" required className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#555] mb-1">Work email</label>
                <input type="email" value={email} onChange={function(e) { setEmail(e.target.value); }}
                  placeholder="you@company.com" required className={inputClass} />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#555] mb-1">Password</label>
                <input type="password" value={password} onChange={function(e) { setPassword(e.target.value); }}
                  placeholder="8 characters minimum" required minLength={8} className={inputClass} />
              </div>
              <button type="submit"
                disabled={!firstName.trim() || !lastName.trim() || !email.trim() || !password}
                className="w-full h-10 rounded-lg bg-[#111] text-white text-[13px] font-medium hover:bg-[#333] disabled:opacity-40 transition-colors flex items-center justify-center gap-2 mt-1">
                Continue <ArrowRight size={14} />
              </button>
            </form>
          )}

          {/* Step 2: Company info */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-[#555] mb-1">Company name</label>
                <input type="text" value={companyName} onChange={function(e) { setCompanyName(e.target.value); }}
                  placeholder="Acme Inc." required autoFocus className={inputClass} />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#555] mb-1">Company size</label>
                <select value={companySize} onChange={function(e) { setCompanySize(e.target.value); }} required className={selectClass + (!companySize ? " text-[#CCC]" : "")}>
                  <option value="" disabled>Select team size</option>
                  {COMPANY_SIZES.map(function(s) { return <option key={s.value} value={s.value}>{s.label} employees</option>; })}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#555] mb-1">Your role</label>
                <select value={role} onChange={function(e) { setRole(e.target.value); }} required className={selectClass + (!role ? " text-[#CCC]" : "")}>
                  <option value="" disabled>Select your role</option>
                  {ROLES.map(function(r) { return <option key={r.value} value={r.value}>{r.label}</option>; })}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-[#555] mb-1">How did you hear about Kairo? <span className="text-[#CCC]">(optional)</span></label>
                <select value={source} onChange={function(e) { setSource(e.target.value); }} className={selectClass + (!source ? " text-[#CCC]" : "")}>
                  <option value="">Select</option>
                  {SOURCES.map(function(s) { return <option key={s.value} value={s.value}>{s.label}</option>; })}
                </select>
              </div>
              <div className="flex gap-2 mt-1">
                <button type="button" onClick={function() { setStep(1); }}
                  className="h-10 px-4 rounded-lg border border-[#EAEAEA] text-[13px] text-[#999] hover:bg-[#F5F5F5] transition-colors">
                  Back
                </button>
                <button type="submit"
                  disabled={loading || !companyName.trim() || !companySize || !role}
                  className="flex-1 h-10 rounded-lg bg-[#111] text-white text-[13px] font-medium hover:bg-[#333] disabled:opacity-40 transition-colors flex items-center justify-center gap-2">
                  {loading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create account <ArrowRight size={14} /></>}
                </button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-[13px] text-[#BBB]">
            {"Already have an account? "}
            <Link href="/login" className="text-[#111] font-medium hover:underline">Sign in</Link>
          </p>
          <p className="mt-3 text-center text-[11px] text-[#CCC]">
            {"By signing up, you agree to our "}
            <Link href="/legal/terms" className="underline hover:text-[#999]">Terms</Link>
            {" and "}
            <Link href="/legal/privacy" className="underline hover:text-[#999]">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
