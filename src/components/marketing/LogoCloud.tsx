"use client";

import Badge from "./Badge";

const clients = [
  { name: "Dougs", domain: "dougs.fr" },
  { name: "Total", domain: "totalenergies.com" },
  { name: "Edenred", domain: "edenred.com" },
  { name: "Manpower", domain: "manpower.fr" },
  { name: "Iroko", domain: "iroko.eu" },
  { name: "Spendesk", domain: "spendesk.com" },
  { name: "Alan", domain: "alan.com" },
  { name: "Payfit", domain: "payfit.com" },
  { name: "Swile", domain: "swile.co" },
];

const tools = [
  { name: "HubSpot", domain: "hubspot.com" },
  { name: "Salesforce", domain: "salesforce.com" },
  { name: "Clay", domain: "clay.com" },
  { name: "Lemlist", domain: "lemlist.com" },
  { name: "Make", domain: "make.com" },
  { name: "n8n", domain: "n8n.io" },
  { name: "Notion", domain: "notion.so" },
  { name: "Slack", domain: "slack.com" },
  { name: "Claap", domain: "claap.io" },
  { name: "Claude", domain: "claude.ai" },
];

function Logo({ domain, name }: { domain: string; name: string }) {
  return (
    <div className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt={name} width={18} height={18} className="rounded-sm" loading="lazy" />
      <span className="text-[13px] font-medium text-[#555]">{name}</span>
    </div>
  );
}

export default function LogoCloud() {
  return (
    <section className="relative z-10">
      <div className="max-w-[1000px] mx-auto px-6 relative">
        {/* Two lines from header to card */}
        <div className="hidden md:block absolute left-[20%] w-px bg-[#EAEAEA]" style={{ top: "-500px", bottom: "calc(100% - 1px)", pointerEvents: "none" }} />
        <div className="hidden md:block absolute right-[20%] w-px bg-[#EAEAEA]" style={{ top: "-500px", bottom: "calc(100% - 1px)", pointerEvents: "none" }} />

        {/* Blobs outside */}
        <div className="absolute -top-16 -left-20 w-[250px] h-[250px] rounded-full bg-[#FF7A59] opacity-[0.1] blur-[70px] pointer-events-none" style={{ animation: "blobFloat 8s 0s ease-in-out infinite" }} />
        <div className="absolute -bottom-16 -right-20 w-[280px] h-[280px] rounded-full bg-[#4B5EFC] opacity-[0.1] blur-[70px] pointer-events-none" style={{ animation: "blobFloat 8s 2s ease-in-out infinite" }} />
        <div className="absolute top-1/2 -right-32 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-[#6C5CE7] opacity-[0.08] blur-[60px] pointer-events-none" style={{ animation: "blobFloat 8s 4s ease-in-out infinite" }} />
        <div className="absolute top-1/2 -left-28 -translate-y-1/2 w-[180px] h-[180px] rounded-full bg-[#D4A27F] opacity-[0.08] blur-[60px] pointer-events-none" style={{ animation: "blobFloat 8s 6s ease-in-out infinite" }} />

        {/* Card */}
        <div className="relative rounded-lg border border-[#EAEAEA] bg-white p-6 md:p-10 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)]">
          <p className="relative text-center text-[14px] text-[#999] mb-10">
            Déjà <span className="font-semibold text-[#111]">+250 entreprises</span> accompagnées
          </p>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#F0F0F0]" />
            <div className="md:pr-14">
              <div className="flex justify-start mb-4"><Badge>Clients</Badge></div>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {clients.map((c) => <Logo key={c.name} {...c} />)}
              </div>
            </div>
            <div className="md:pl-14 border-t md:border-t-0 border-[#F0F0F0] pt-8 md:pt-0">
              <div className="flex justify-end mb-4"><Badge>Outils</Badge></div>
              <div className="flex flex-wrap justify-end gap-x-6 gap-y-4">
                {tools.map((t) => <Logo key={t.name} {...t} />)}
              </div>
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="hidden md:block mx-auto w-px h-10 bg-[#E0E0E0]" />
      </div>
    </section>
  );
}
