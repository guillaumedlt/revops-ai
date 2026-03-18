const features = [
  { title: "AI Chat", desc: "Ask anything about your pipeline. Get instant answers with real data, charts, and KPIs." },
  { title: "Pipeline Intelligence", desc: "Deal health scoring, at-risk detection, and stage conversion analysis." },
  { title: "Revenue Forecasting", desc: "Commit, best case, and worst case scenarios based on weighted pipeline." },
  { title: "CRM Hygiene", desc: "Audit data quality per rep. Find missing fields, stale deals, and compliance gaps." },
  { title: "ICP Builder", desc: "AI analyzes your company and builds your Ideal Customer Profile automatically." },
  { title: "Win/Loss Analysis", desc: "Understand why you win and lose deals. Compare patterns and optimize." },
  { title: "Meeting Prep", desc: "'Prep my call with X' -- get deal context, contacts, risks, and talking points." },
  { title: "Actions", desc: "Update deals, create tasks, log notes -- directly from the chat." },
  { title: "Morning Briefing", desc: "Daily automated summary: pipeline changes, at-risk deals, action items." },
];

export default function Features() {
  return (
    <section id="features" className="bg-[#FAFAFA] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0A0A0A] mb-4">Everything a RevOps team does.<br />Automated.</h2>
          <p className="text-[#737373] max-w-xl mx-auto">28 AI tools that analyze your HubSpot and Lemlist data in real-time. Ask questions, get reports, take actions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-[#E5E5E5] p-6 hover:shadow-sm transition-shadow">
              <div className="h-10 w-10 rounded-xl bg-[#0A0A0A] flex items-center justify-center text-white text-sm font-bold mb-4">
                {f.title.charAt(0)}
              </div>
              <h3 className="text-base font-semibold text-[#0A0A0A] mb-2">{f.title}</h3>
              <p className="text-sm text-[#737373] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Connectors */}
        <div className="mt-16 text-center">
          <p className="text-xs text-[#A3A3A3] uppercase tracking-wider mb-4">Connects with</p>
          <div className="flex items-center justify-center gap-8">
            {["HubSpot", "Lemlist", "Notion", "Slack"].map((name) => (
              <span key={name} className="text-sm font-medium text-[#525252]">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
