"use client";

import { useEffect, useState } from "react";
import Badge from "./Badge";

const tools = [
  { name: "HubSpot", domain: "hubspot.com", bg: "#FFF4F1" },
  { name: "Claude", domain: "claude.ai", bg: "#FDF6F0" },
  { name: "Clay", domain: "clay.com", bg: "#F5F5F5" },
  { name: "Lemlist", domain: "lemlist.com", bg: "#F3F0FF" },
  { name: "Make", domain: "make.com", bg: "#F5EEFF" },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % tools.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative pt-[120px] pb-6 md:pt-[140px] md:pb-8">
      {/* Blobs are now in the page layout */}

      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="max-w-[720px] mx-auto text-center">
          <div className="mb-5"><Badge>Agence RevOps &amp; IA</Badge></div>
          <h1 className="text-[32px] sm:text-[42px] lg:text-[52px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
            Alignez vos revenus,
            <br />
            <span className="relative inline-flex items-center justify-center align-middle w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] lg:w-[52px] lg:h-[52px] mx-1 -mt-1">
              {tools.map((t, i) => (
                <span key={t.name} className="absolute inset-0 flex items-center justify-center rounded-lg transition-all duration-500" style={{ backgroundColor: t.bg, opacity: i === idx ? 1 : 0, transform: i === idx ? "translateY(0) scale(1)" : "translateY(6px) scale(0.85)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://www.google.com/s2/favicons?domain=${t.domain}&sz=128`} alt={t.name} width={28} height={28} className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] lg:w-[26px] lg:h-[26px]" />
                </span>
              ))}
            </span>{" "}
            pas vos slides.
          </h1>
          <p className="text-[16px] text-[#666] max-w-[440px] mx-auto mb-8 leading-[1.7]">
            On structure vos process, connecte vos outils et déploie l&apos;IA pour que vos équipes avancent ensemble.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-[#EAEAEA] bg-white text-[13px] text-[#111] font-medium hover:border-[#CCC] hover:shadow-sm transition-all">
              <span className="w-2 h-2 rounded-sm bg-[#D4A27F]" />
              Réserver un appel
            </a>
            <a href="#services" className="inline-flex items-center justify-center px-4 py-1.5 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
              En savoir plus
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
