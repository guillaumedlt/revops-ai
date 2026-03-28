import Badge from "./Badge";

const testimonials = [
  {
    quote: "Avec Cérès, nous avons mis en place une véritable infrastructure RevOps, adaptée à notre modèle moderne de SCPI. Nous avons désormais une meilleure compréhension de nos clients et une visibilité accrue sur nos performances commerciales.",
    name: "Antoine Charbonneau",
    role: "Responsable Commercial",
    company: "Iroko",
    domain: "iroko.eu",
    result: "Infrastructure RevOps complète",
  },
  {
    quote: "L'équipe Cérès nous a aidés à structurer notre stratégie marketing et à exploiter pleinement HubSpot pour mieux piloter nos campagnes, segmenter notre base et automatiser nos actions. Ils ont également pris en charge l'administration complète de notre instance HubSpot, en agissant comme un véritable relais Ops de notre équipe marketing. Un vrai levier d'efficacité pour notre équipe.",
    name: "Ludovic Rateau",
    role: "CMO",
    company: "Ringover",
    domain: "ringover.com",
    result: "HubSpot Ops externalisé",
  },
  {
    quote: "Cérès nous a accompagnés dans un projet stratégique de migration de nos instances HubSpot US et APAC vers une instance marketing globale. Leur expertise a également été déterminante pour connecter HubSpot à Salesforce, assurant une synchronisation fluide entre nos équipes marketing et commerciales à l'échelle mondiale.",
    name: "Laisa Lopes",
    role: "Marketing Manager",
    company: "TotalEnergies",
    domain: "totalenergies.com",
    result: "Migration HubSpot globale",
  },
];

export default function Testimonials() {
  return (
    <section className="relative z-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)]">
          <div className="mb-8">
            <div className="mb-4"><Badge>Témoignages</Badge></div>
            <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] leading-[1.2] tracking-[-0.02em] mb-2">
              Ce que disent nos clients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-lg border border-[#F2F2F2] p-5 flex flex-col">
                {/* Result badge */}
                <div className="mb-4">
                  <span className="text-[10px] font-medium text-[#22C55E] bg-[#F0FDF4] px-2 py-0.5 rounded">{t.result}</span>
                </div>
                {/* Quote */}
                <blockquote className="flex-1 mb-5">
                  <p className="text-[12px] text-[#555] leading-[1.7]">&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                {/* Author */}
                <figcaption className="flex items-center gap-3 pt-4 border-t border-[#F2F2F2]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://www.google.com/s2/favicons?domain=${t.domain}&sz=64`} alt={t.company} width={20} height={20} className="rounded-sm" loading="lazy" />
                  <div>
                    <p className="text-[12px] font-semibold text-[#111]">{t.name}</p>
                    <p className="text-[11px] text-[#999]">{t.role} @ {t.company}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="hidden md:block mx-auto w-px h-10 bg-[#E0E0E0]" />
      </div>
    </section>
  );
}
