import Badge from "./Badge";

export default function CTA() {
  return (
    <section id="contact" className="relative z-20 pb-16">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="rounded-lg bg-[#111] p-8 md:p-14 text-center">
          <div className="max-w-[480px] mx-auto">
            <div className="mb-5 flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60">
                Prêt ?
              </span>
            </div>
            <h2 className="text-[24px] sm:text-[32px] font-semibold text-white leading-[1.2] tracking-[-0.02em] mb-4">
              Structurons votre croissance ensemble
            </h2>
            <p className="text-[14px] text-white/50 mb-8 leading-[1.65]">
              30 minutes pour auditer votre situation et identifier les quick wins. Gratuit, sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://cal.com" target="_blank" rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-white text-[#111] text-[13px] font-medium hover:bg-white/90 transition-colors cursor-pointer">
                <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />
                Réserver un appel
              </a>
              <a href="mailto:hello@ceres.fr"
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2 rounded-md text-[13px] text-white/60 hover:text-white/80 transition-colors">
                Nous écrire
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
