import Link from "next/link";

const cols = {
  Services: [
    { label: "Audit CRM", href: "#services" },
    { label: "Architecture RevOps", href: "#services" },
    { label: "Automatisation", href: "#services" },
    { label: "Agents IA", href: "#services" },
  ],
  Ressources: [
    { label: "Blog", href: "#" },
    { label: "Guides", href: "#" },
    { label: "Études de cas", href: "#" },
  ],
  Agence: [
    { label: "À propos", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Carrières", href: "#" },
  ],
  Légal: [
    { label: "Mentions légales", href: "#" },
    { label: "Confidentialité", href: "#" },
    { label: "CGV", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#F2F2F2]">
      <div className="max-w-[1100px] mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-md bg-[#111] flex items-center justify-center">
                <span className="text-white text-[12px] font-bold">C</span>
              </div>
              <span className="text-[16px] font-semibold text-[#111]">Ceres</span>
            </Link>
            <p className="text-[13px] text-[#999] leading-relaxed">RevOps & IA pour<br />équipes B2B.</p>
          </div>
          {Object.entries(cols).map(([t, links]) => (
            <div key={t}>
              <h4 className="text-[12px] font-semibold text-[#111] uppercase tracking-wider mb-3">{t}</h4>
              <ul className="space-y-2">
                {links.map((l) => <li key={l.label}><Link href={l.href} className="text-[13px] text-[#999] hover:text-[#111] transition-colors">{l.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-[#F2F2F2] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[#CCC]">&copy; {new Date().getFullYear()} Ceres</p>
          <div className="flex items-center gap-5">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#CCC] hover:text-[#111] transition-colors" aria-label="X">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#CCC] hover:text-[#111] transition-colors" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
