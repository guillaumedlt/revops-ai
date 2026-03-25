const steps = [
  {
    n: "01",
    title: "Diagnostic",
    desc: "On audite votre CRM, vos process et votre stack. Quick wins et chantiers structurants identifiés.",
  },
  {
    n: "02",
    title: "Build",
    desc: "Architecture RevOps, automatisations, intégrations, dashboards. L'IA déployée là où elle a un vrai impact.",
  },
  {
    n: "03",
    title: "Accompagnement",
    desc: "Formation des équipes, itération sur les process, mesure des résultats. On reste jusqu'à l'autonomie.",
  },
];

export default function HowItWorks() {
  return (
    <section id="methode" className="py-24 md:py-32">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="max-w-[480px] mx-auto text-center mb-16">
          <p className="text-[13px] text-[#999] uppercase tracking-wider mb-4">Méthode</p>
          <h2 className="text-[32px] sm:text-[40px] font-semibold text-[#111] leading-[1.15] tracking-[-0.02em]">
            Pas de théorie. Du concret.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {steps.map((s) => (
            <div key={s.n} className="text-center md:text-left">
              <span className="inline-block text-[13px] font-semibold text-[#999] bg-[#F5F5F5] rounded-md px-2.5 py-1 mb-5">{s.n}</span>
              <h3 className="text-[18px] font-semibold text-[#111] mb-3">{s.title}</h3>
              <p className="text-[14px] text-[#666] leading-[1.7]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
