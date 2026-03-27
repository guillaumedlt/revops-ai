import Badge from "./Badge";

const stats = [
  { value: "250+", label: "Entreprises accompagnées" },
  { value: "3 sem", label: "Pour être opérationnel" },
  { value: "40%", label: "Temps gagné sur le reporting" },
  { value: "2.5x", label: "ROI moyen constaté" },
];

export default function Stats() {
  return (
    <section className="relative z-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="rounded-2xl border border-[#E8E8E8] bg-[#111] p-6 md:p-10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.15)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[28px] sm:text-[36px] font-semibold text-white tracking-[-0.03em] leading-none mb-1.5">{s.value}</div>
                <p className="text-[11px] text-white/40">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:block mx-auto w-px h-10 bg-[#E0E0E0]" />
      </div>
    </section>
  );
}
