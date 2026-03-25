"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Méthode", href: "#methode" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#F2F2F2]">
      <nav className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-[#111] flex items-center justify-center">
            <span className="text-white text-[12px] font-bold">C</span>
          </div>
          <span className="text-[16px] font-semibold text-[#111]">Ceres</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[14px] text-[#666] hover:text-[#111] transition-colors">{l.label}</a>
          ))}
        </div>

        <a href="#contact" className="hidden md:inline-flex px-4 h-9 items-center rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#333] transition-colors">
          Prendre RDV
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth={2}>
            {open ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-white px-6 pb-5 pt-2 border-t border-[#F2F2F2] space-y-3">
          {links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-[15px] text-[#666] py-1">{l.label}</a>)}
          <a href="#contact" onClick={() => setOpen(false)} className="block text-center h-10 leading-[40px] rounded-md bg-[#111] text-white text-[14px] font-medium mt-3">Prendre RDV</a>
        </div>
      )}
    </header>
  );
}
