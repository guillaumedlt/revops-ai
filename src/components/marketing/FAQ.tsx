"use client";

import { useState } from "react";

const faqs = [
  { q: "C'est quoi le RevOps ?", a: "Aligner Sales, Marketing et CS autour de process, outils et données communs. Objectif : éliminer les silos et accélérer la croissance. On y ajoute l'IA." },
  { q: "On a déjà HubSpot, vous pouvez intervenir ?", a: "C'est notre cas le plus fréquent. CRM en place mais mal configuré ou sous-exploité. On audite, restructure et automatise sans tout casser." },
  { q: "Combien de temps dure une mission ?", a: "Audit : 1-2 semaines. Mission complète : 4-8 semaines. Accompagnement continu possible." },
  { q: "C'est quoi les agents IA ?", a: "Des assistants IA intégrés dans votre stack : qualification de leads, résumés de calls, enrichissement, détection d'anomalies." },
  { q: "Comment est calculé le prix ?", a: "Au forfait après cadrage. Dépend du périmètre, de la complexité et de la taille de vos équipes. Appel découverte gratuit." },
  { q: "Petite équipe (5-10), c'est pertinent ?", a: "C'est le moment idéal. Poser les bonnes fondations tôt évite de tout refaire à 30 ou 50 personnes." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-[620px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[13px] text-[#999] uppercase tracking-wider mb-4">FAQ</p>
          <h2 className="text-[32px] sm:text-[40px] font-semibold text-[#111] leading-[1.15] tracking-[-0.02em]">Questions fréquentes</h2>
        </div>

        <div>
          {faqs.map((f, i) => (
            <div key={i} className="border-b border-[#F2F2F2]">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full py-5 flex items-center justify-between text-left" aria-expanded={open === i}>
                <span className="text-[15px] font-medium text-[#111] pr-4">{f.q}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={"shrink-0 text-[#CCC] transition-transform duration-200 " + (open === i ? "rotate-45" : "")}>
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {open === i && <p className="pb-5 text-[14px] text-[#666] leading-[1.7]">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
