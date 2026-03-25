export default function CTA() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[#111]">
      <div className="max-w-[520px] mx-auto px-6 text-center">
        <h2 className="text-[32px] sm:text-[42px] font-semibold text-white leading-[1.15] tracking-[-0.02em] mb-5">
          Prêt à structurer votre croissance ?
        </h2>
        <p className="text-[15px] text-[#777] mb-8 leading-[1.7]">
          30 minutes pour auditer votre situation et identifier les quick wins.
        </p>
        <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-5 h-11 rounded-md bg-white text-[#111] text-[14px] font-medium hover:bg-[#F5F5F5] transition-colors">
          Réserver un appel
        </a>
        <p className="text-[12px] text-[#555] mt-4">Gratuit, sans engagement</p>
      </div>
    </section>
  );
}
