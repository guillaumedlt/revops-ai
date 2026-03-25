const stats = [
  { value: "50+", label: "Entreprises accompagnées" },
  { value: "3 sem", label: "Pour être opérationnel" },
  { value: "40%", label: "Temps gagné sur le reporting" },
  { value: "2.5x", label: "ROI moyen constaté" },
];

export default function Stats() {
  return (
    <section className="py-16 md:py-20 border-y border-[#F2F2F2]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-[36px] sm:text-[42px] font-semibold text-[#111] tracking-[-0.03em] leading-none mb-2">{s.value}</div>
              <p className="text-[13px] text-[#999]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
