"use client";

import { useState } from "react";
import Badge from "./Badge";

const faqs = [
  { q: "C'est quoi le RevOps ?", a: "Aligner Sales, Marketing et CS autour de process, outils et données communs. On y ajoute l'IA pour aller plus loin dans l'automatisation." },
  { q: "On a déjà HubSpot, vous pouvez intervenir ?", a: "C'est notre cas le plus fréquent. CRM en place mais mal configuré ou sous-exploité. On audite, restructure et automatise sans tout casser." },
  { q: "Combien de temps dure une mission ?", a: "Audit : 1 à 2 semaines. Mission complète : 4 à 8 semaines. Accompagnement continu possible avec le RevOps Part-Time." },
  { q: "C'est quoi les agents IA que vous déployez ?", a: "Des assistants IA connectés à votre stack via MCP : qualification de leads, résumés de calls, enrichissement, détection d'anomalies." },
  { q: "Comment est calculé le prix ?", a: "Au forfait après cadrage. Dépend du périmètre, de la complexité et de la taille de vos équipes. L'appel découverte est gratuit." },
  { q: "Petite équipe (5-10), c'est pertinent ?", a: "C'est le moment idéal. Poser les bonnes fondations tôt évite de tout refaire à 30 ou 50 personnes." },
  { q: "C'est quoi un serveur MCP ?", a: "Un protocole qui permet à Claude (ou d'autres LLM) de se connecter directement à vos outils : CRM, Slack, bases de données. On le met en place pour vous." },
  { q: "Vous travaillez uniquement avec HubSpot ?", a: "HubSpot est notre expertise principale. On intervient aussi sur Salesforce et les stacks composites (CRM + Make + Notion + Slack)." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative z-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="rounded-2xl border border-[#E8E8E8] bg-white p-6 md:p-10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)]">
          <div className="mb-8">
            <div className="mb-4"><Badge>FAQ</Badge></div>
            <h2 className="text-[22px] sm:text-[28px] font-semibold text-[#111] leading-[1.2] tracking-[-0.02em]">
              Questions fréquentes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-[#F2F2F2]">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer"
                >
                  <span className="text-[13px] font-medium text-[#111] pr-4">{f.q}</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
                    className={"shrink-0 text-[#CCC] transition-transform duration-200 " + (open === i ? "rotate-45" : "")}>
                    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <div className={open === i ? "pb-4" : "h-0 overflow-hidden"}>
                  <p className="text-[12px] text-[#777] leading-[1.65]">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block mx-auto w-px h-10 bg-[#E0E0E0]" />
      </div>
    </section>
  );
}
