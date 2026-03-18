import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Nav */}
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
            <span className="text-white text-sm font-bold">K</span>
          </div>
          <span className="text-lg font-semibold text-[#0A0A0A]">Kairo</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-[#525252] hover:text-[#0A0A0A] transition-colors">Log in</Link>
          <Link href="/signup" className="px-4 h-9 inline-flex items-center rounded-lg bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#333] transition-colors">Start free</Link>
        </div>
      </nav>

      {/* Hero content */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F5] border border-[#E5E5E5] text-xs text-[#525252] mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
          Now with 28 AI-powered tools
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold text-[#0A0A0A] leading-tight tracking-tight mb-6">
          Your AI RevOps<br />assistant
        </h1>

        <p className="text-lg text-[#737373] max-w-2xl mx-auto mb-10 leading-relaxed">
          Kairo connects to your CRM and sales tools, analyzes your data in real-time, and gives you the insights, forecasts, and actions a RevOps team would — in seconds.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link href="/signup" className="px-6 h-11 inline-flex items-center rounded-xl bg-[#0A0A0A] text-white text-sm font-medium hover:bg-[#333] transition-colors">
            Get started free
          </Link>
          <Link href="#features" className="px-6 h-11 inline-flex items-center rounded-xl border border-[#E5E5E5] text-sm text-[#525252] hover:bg-[#FAFAFA] transition-colors">
            See features
          </Link>
        </div>

        <p className="text-xs text-[#A3A3A3] mt-4">No credit card required — 50 free credits</p>
      </div>
    </section>
  );
}
