const testimonials = [
  {
    quote: "Ceres a structuré nos ops en 3 semaines. Pipeline propre, forecasts fiables. L'équipe a enfin une vision claire.",
    name: "Sophie M.",
    role: "VP Sales, TechFlow",
  },
  {
    quote: "Migration HubSpot + agents IA pour qualifier nos leads. 35% de temps gagné par SDR. Le CRM est enfin utilisé.",
    name: "Thomas D.",
    role: "COO, DataScale",
  },
  {
    quote: "Approche pragmatique, pas de bullshit. Ils ont audité, construit et livré. Le reporting tourne tout seul.",
    name: "Camille L.",
    role: "Head of Revenue, GrowthLab",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#FAFAFA]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="max-w-[480px] mx-auto text-center mb-16">
          <p className="text-[13px] text-[#999] uppercase tracking-wider mb-4">Témoignages</p>
          <h2 className="text-[32px] sm:text-[40px] font-semibold text-[#111] leading-[1.15] tracking-[-0.02em]">
            Ils recommenceraient.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <figure key={t.name} className="bg-white rounded-xl p-7 border border-[#F2F2F2]">
              <blockquote className="mb-6">
                <p className="text-[14px] text-[#444] leading-[1.75]">&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-5 border-t border-[#F2F2F2]">
                <div className="h-8 w-8 rounded-full bg-[#111] flex items-center justify-center text-white text-[11px] font-semibold">{t.name.charAt(0)}</div>
                <div>
                  <p className="text-[13px] font-semibold text-[#111]">{t.name}</p>
                  <p className="text-[12px] text-[#999]">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
