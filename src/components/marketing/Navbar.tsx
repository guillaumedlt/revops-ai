"use client";

import Link from "next/link";
import { useState } from "react";

const services = [
  { label: "Audit RevOps", href: "/audit-revops", desc: "Diagnostic CRM, process & data", color: "#FF7A59",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> },
  { label: "RevOps Part-Time", href: "/revops-part-time", desc: "Un expert dédié chaque mois", color: "#4B5EFC",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg> },
  { label: "Agence HubSpot", href: "/agence-hubspot", desc: "Setup, migration & optimisation", color: "#FF7A59",
    icon: <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=64" alt="HubSpot" width={16} height={16} className="rounded-sm" /> },
  { label: "Agents IA", href: "/agents-ia", desc: "Claude, MCP & automatisation", color: "#6D00CC",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg> },
];

const resources = [
  { label: "Qu'est-ce que le RevOps ?", href: "/revops", desc: "Le guide complet", color: "#FF7A59",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg> },
  { label: "Blog", href: "/blog", desc: "Articles & analyses", color: "#4B5EFC",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg> },
  { label: "Guides", href: "/guides", desc: "Playbooks & frameworks", color: "#6C5CE7",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" /></svg> },
  { label: "Glossaire RevOps", href: "/glossaire", desc: "Tous les termes expliqués", color: "#22C55E",
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></svg> },
];

function Dropdown({ label, items, open, onOpen, onClose }: {
  label: string; items: typeof services; open: boolean; onOpen: () => void; onClose: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button type="button" className="flex items-center gap-1 text-[14px] text-[#666] hover:text-[#111] transition-colors">
        {label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={"transition-transform " + (open ? "rotate-180" : "")}>
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
          <div className="w-[340px] rounded-2xl border border-[#E8E8E8] bg-white p-2 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)]">
            {items.map((s) => (
              <Link key={s.href} href={s.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F7F7F7] transition-colors group">
                <div className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center" style={{ backgroundColor: s.color + "10", color: s.color }}>
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[13px] font-semibold text-[#111] block">{s.label}</span>
                  <span className="text-[11px] text-[#999]">{s.desc}</span>
                </div>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0 text-[#DDD] group-hover:text-[#999] group-hover:translate-x-0.5 transition-all">
                  <path d="M3 2L7 5L3 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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
          <Dropdown label="Services" items={services} open={openMenu === "services"} onOpen={() => setOpenMenu("services")} onClose={() => setOpenMenu(null)} />
          <Dropdown label="Ressources" items={resources} open={openMenu === "resources"} onOpen={() => setOpenMenu("resources")} onClose={() => setOpenMenu(null)} />
          <Link href="/cas-clients" className="text-[14px] text-[#666] hover:text-[#111] transition-colors">Cas clients</Link>
        </div>

        <a href="#contact" className="hidden md:inline-flex px-4 h-9 items-center rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#333] transition-colors">
          Prendre RDV
        </a>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2" aria-label="Menu">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#666" strokeWidth={2}>
            {mobileOpen ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white px-6 pb-5 pt-2 border-t border-[#F2F2F2]">
          <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2 mt-2">Services</p>
          {services.map((s) => (
            <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center" style={{ backgroundColor: s.color + "10", color: s.color }}>
                {s.icon}
              </div>
              <div>
                <span className="text-[14px] text-[#111] font-medium block leading-tight">{s.label}</span>
                <span className="text-[11px] text-[#999]">{s.desc}</span>
              </div>
            </Link>
          ))}

          <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-2 mt-4">Ressources</p>
          {resources.map((r) => (
            <Link key={r.href} href={r.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center" style={{ backgroundColor: r.color + "10", color: r.color }}>
                {r.icon}
              </div>
              <div>
                <span className="text-[14px] text-[#111] font-medium block leading-tight">{r.label}</span>
                <span className="text-[11px] text-[#999]">{r.desc}</span>
              </div>
            </Link>
          ))}

          <div className="border-t border-[#F2F2F2] mt-3 pt-3">
            <Link href="/cas-clients" onClick={() => setMobileOpen(false)} className="block text-[15px] text-[#666] py-1">Cas clients</Link>
          </div>
          <a href="#contact" onClick={() => setMobileOpen(false)} className="block text-center h-10 leading-[40px] rounded-md bg-[#111] text-white text-[14px] font-medium mt-3">Prendre RDV</a>
        </div>
      )}
    </header>
  );
}
