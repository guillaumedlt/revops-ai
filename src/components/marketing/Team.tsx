"use client";

import Badge from "./Badge";

const team = [
  {
    name: "Guillaume Delachet",
    role: "Co-fondateur",
    desc: "RevOps & IA. Construit les stacks qui alignent sales, marketing et CS.",
    color: "#FF7A59",
    image: "/team/guillaume.jpg",
  },
  {
    name: "Simon Toussaint",
    role: "Co-fondateur",
    desc: "Architecture CRM et automatisation. Fait tourner les machines commerciales.",
    color: "#4B5EFC",
    image: "/team/simon.jpg",
  },
  {
    name: "Bruno Teixeira",
    role: "Partner",
    desc: "Stratégie revenue et déploiement IA. Accompagne les scale-ups ambitieuses.",
    color: "#6C5CE7",
    image: "/team/bruno.jpg",
  },
  {
    name: "Stéphane Morel",
    role: "COO",
    desc: "Operations et delivery. S'assure que chaque mission livre des résultats concrets.",
    color: "#22C55E",
    image: "/team/stephane.jpg",
  },
];

export default function Team() {
  return (
    <section className="relative z-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 md:p-10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)]">
          <div className="mb-8">
            <div className="mb-4"><Badge>L&apos;équipe</Badge></div>
            <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] leading-[1.2] tracking-[-0.02em] mb-2">
              Les gens derrière Ceres
            </h2>
            <p className="text-[13px] text-[#999]">Une équipe d&apos;ops seniors qui ont vécu vos problèmes. Voici ceux qui pilotent.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((t) => {
              const initials = t.name.split(" ").map(n => n[0]).join("");
              return (
                <div key={t.name} className="text-center">
                  <div className="w-20 h-20 rounded-2xl mx-auto mb-3 overflow-hidden flex items-center justify-center" style={{ backgroundColor: t.color + "12" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.image}
                      alt={t.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover grayscale"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.style.display = "none";
                        if (el.nextElementSibling) (el.nextElementSibling as HTMLElement).style.display = "flex";
                      }}
                    />
                    <span className="text-[18px] font-bold hidden items-center justify-center w-full h-full" style={{ color: t.color, display: "none" }}>{initials}</span>
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#111] mb-0.5">{t.name}</h3>
                  <p className="text-[11px] font-medium mb-1.5" style={{ color: t.color }}>{t.role}</p>
                  <p className="text-[11px] text-[#999] leading-[1.5]">{t.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 pt-5 border-t border-[#F2F2F2] text-center">
            <p className="text-[12px] text-[#999]">
              Et une équipe de <span className="font-semibold text-[#666]">+10 experts</span> RevOps, CRM, data et IA qui interviennent sur vos projets.
            </p>
          </div>
        </div>
        <div className="hidden md:block mx-auto w-px h-10 bg-[#E0E0E0]" />
      </div>
    </section>
  );
}
