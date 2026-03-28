"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Integration HubSpot x WhatsApp : guide pas a pas",
  author: { "@type": "Person", name: "Guillaume Delachet" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  datePublished: "2026-03-05",
  description: "Guide complet pour connecter WhatsApp Business a HubSpot. Integration native, Make, Zapier, Twilio. Messages automatises, suivi des conversations, integration pipeline.",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/integration-hubspot-whatsapp" },
  image: "https://www.ceres-revops.com/og/integration-hubspot-whatsapp.png",
};

const sections = [
  { id: "pourquoi", title: "Pourquoi connecter WhatsApp a HubSpot" },
  { id: "methodes", title: "Les 3 methodes d\u2019integration" },
  { id: "prerequis", title: "Prerequis : WhatsApp Business API" },
  { id: "methode-native", title: "Methode 1 : Integration native" },
  { id: "methode-make", title: "Methode 2 : Via Make/Zapier" },
  { id: "methode-twilio", title: "Methode 3 : Via Twilio" },
  { id: "automatiser", title: "Automatiser les messages" },
  { id: "tracker", title: "Tracker les conversations" },
  { id: "limites", title: "Les limites a connaitre" },
  { id: "recommandation", title: "Notre recommandation" },
];

const relatedArticles = [
  { title: "9 actions commerciales que vous devriez automatiser", slug: "9-actions-commerciales-automatiser", category: "Automatisation", color: "#6C5CE7" },
  { title: "Tracker les soumissions de formulaire HubSpot avec GTM", slug: "tracker-soumissions-formulaire-hubspot-google-analytics-google-tag-manager", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Emelia : notre test complet de l\u2019outil de cold emailing", slug: "emelia-test-outil-cold-emailing", category: "Process & Outils", color: "#FF7A59" },
];

export default function IntegrationHubSpotWhatsAppArticle() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("pourquoi");

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, pct));

      const sectionEls = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i];
        if (el && el.getBoundingClientRect().top <= 160) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50">
        <div className="h-full bg-[#4B5EFC] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Blobs */}
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "10%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "30%", width: 280, height: 280, borderRadius: "50%", background: "#25D366", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "55%", width: 260, height: 260, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "5%", top: "78%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.08, filter: "blur(70px)" }} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="flex gap-10">
          {/* Sticky sidebar */}
          <aside className="hidden lg:block w-[200px] shrink-0">
            <div className="sticky top-28">
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Sommaire</p>
              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`block text-[11px] py-1.5 pl-3 border-l-2 transition-all ${
                      activeSection === s.id
                        ? "border-[#4B5EFC] text-[#111] font-medium"
                        : "border-transparent text-[#999] hover:text-[#666] hover:border-[#DDD]"
                    }`}
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-[#F2F2F2]">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Partager</p>
                <div className="flex gap-2">
                  <a href="https://twitter.com/intent/tweet?url=https://www.ceres-revops.com/blog/integration-hubspot-whatsapp&text=Integration%20HubSpot%20x%20WhatsApp%20:%20guide%20pas%20a%20pas" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/integration-hubspot-whatsapp" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Article */}
          <div className="flex-1 min-w-0 max-w-[700px]">
            <nav className="mb-8 flex items-center gap-2 text-[12px] text-[#999]">
              <Link href="/" className="hover:text-[#111] transition-colors">Accueil</Link><span>/</span>
              <Link href="/blog" className="hover:text-[#111] transition-colors">Blog</Link><span>/</span>
              <span className="text-[#666]">Integration HubSpot x WhatsApp</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">10 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Integration HubSpot x WhatsApp : guide pas a pas
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                WhatsApp est devenu un canal de communication incontournable en B2B comme en B2C. Mais sans connexion avec votre CRM, les conversations restent isolees, les donnees se perdent, et vos commerciaux jonglent entre les outils. Ce guide couvre les trois methodes pour connecter WhatsApp Business a HubSpot : integration native, automatisation via Make/Zapier, et API Twilio. Avec les etapes concretes, les pieges a eviter, et notre retour d&apos;experience apres l&apos;avoir deploye chez plusieurs clients.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>5 mars 2026</span>
              </div>

              {/* Tools involved */}
              <div className="mt-8 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                <span className="text-[13px] font-semibold text-[#111] mb-4 block">Outils concernes</span>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "HubSpot", domain: "hubspot.com" },
                    { name: "WhatsApp Business", domain: "whatsapp.com" },
                    { name: "Make", domain: "make.com" },
                    { name: "Zapier", domain: "zapier.com" },
                    { name: "Twilio", domain: "twilio.com" },
                    { name: "Meta Business Suite", domain: "business.facebook.com" },
                  ].map((t) => (
                    <div key={t.name} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#F2F2F2] bg-white">
                      <img src={`https://www.google.com/s2/favicons?domain=${t.domain}&sz=32`} alt={t.name} className="w-4 h-4" />
                      <span className="text-[11px] font-medium text-[#555]">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </header>

            <article>
              {/* Section 1 : Pourquoi connecter WhatsApp a HubSpot */}
              <section id="pourquoi" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi connecter WhatsApp a HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>WhatsApp compte plus de 2 milliards d&apos;utilisateurs actifs dans le monde. En France, c&apos;est la deuxieme application de messagerie la plus utilisee. Et de plus en plus d&apos;equipes commerciales s&apos;en servent pour echanger avec leurs prospects et clients : relances, suivi de commandes, support rapide, envoi de documents.</p>
                    <p>Le probleme, c&apos;est que sans integration avec votre CRM, ces conversations n&apos;existent nulle part dans votre historique client. Un commercial echange 15 messages avec un prospect sur WhatsApp, mais rien n&apos;apparait dans la fiche contact HubSpot. Si ce commercial quitte l&apos;equipe ou part en vacances, l&apos;historique disparait avec lui.</p>
                    <p>Connecter WhatsApp a HubSpot permet de resoudre trois problemes concrets :</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" /><strong className="text-[#111]">Centraliser les conversations.</strong> Chaque message WhatsApp est enregistre sur la timeline du contact dans HubSpot. Plus de perte d&apos;information, plus de silos.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#25D366] mt-2 shrink-0" /><strong className="text-[#111]">Automatiser les messages.</strong> Envoyez des confirmations, des rappels de rendez-vous ou des notifications de changement de statut de deal directement via WhatsApp, declenches par des workflows HubSpot.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] mt-2 shrink-0" /><strong className="text-[#111]">Mesurer l&apos;impact.</strong> Combien de deals ont implique un echange WhatsApp ? Quel est le temps de reponse moyen ? Quel commercial utilise le plus ce canal ? Sans integration, ces donnees sont invisibles.</li>
                    </ul>
                    <p>Chez Ceres, on a deploye cette integration chez une dizaine de clients dans des secteurs differents : immobilier, services B2B, e-commerce, formation. Le constat est le meme partout : les equipes qui utilisent WhatsApp de maniere connectee a leur CRM ont un taux de reponse 3 a 5 fois superieur a l&apos;email pour les relances commerciales.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 : Les 3 methodes d'integration */}
              <section id="methodes" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les 3 methodes d&apos;integration</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Il n&apos;y a pas une seule facon de connecter WhatsApp a HubSpot. Selon votre plan HubSpot, votre volume de messages, et vos competences techniques, vous choisirez une approche differente. Voici un comparatif rapide avant d&apos;entrer dans le detail de chaque methode.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        method: "Integration native HubSpot",
                        icon: "hubspot.com",
                        complexity: "Facile",
                        complexityColor: "#22C55E",
                        cost: "Inclus (Sales/Service Hub Pro+)",
                        pros: "Setup rapide, conversations dans la boite de reception HubSpot, pas d\u2019outil tiers",
                        cons: "Necessite un plan Pro ou Enterprise, fonctionnalites limitees, pas de messages proactifs sortants",
                      },
                      {
                        method: "Make / Zapier",
                        icon: "make.com",
                        complexity: "Moyen",
                        complexityColor: "#FF7A59",
                        cost: "A partir de 9 eur/mois (Make) + WhatsApp API",
                        pros: "Flexible, workflows personnalisables, fonctionne avec tous les plans HubSpot",
                        cons: "Necessite un compte Meta Business, configuration plus longue, maintenance des scenarios",
                      },
                      {
                        method: "Twilio API",
                        icon: "twilio.com",
                        complexity: "Avance",
                        complexityColor: "#EF4444",
                        cost: "Pay-as-you-go (~0.005 eur/message)",
                        pros: "Controle total, personnalisation illimitee, scalable, logs detailles",
                        cons: "Necessite un developpeur, integration custom a maintenir, plus long a mettre en place",
                      },
                    ].map((m) => (
                      <div key={m.method} className="flex gap-3 rounded-lg border border-[#F2F2F2] p-4">
                        <img src={`https://www.google.com/s2/favicons?domain=${m.icon}&sz=32`} alt={m.method} className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[12px] font-semibold text-[#111]">{m.method}</span>
                            <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${m.complexityColor}15`, color: m.complexityColor }}>{m.complexity}</span>
                          </div>
                          <p className="text-[11px] text-[#999] mb-2">Cout : {m.cost}</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <p className="text-[10px] font-semibold text-[#22C55E] mb-1">Avantages</p>
                              <p className="text-[11px] text-[#777] leading-[1.6]">{m.pros}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-semibold text-[#EF4444] mb-1">Inconvenients</p>
                              <p className="text-[11px] text-[#777] leading-[1.6]">{m.cons}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">En resume</p>
                    <p className="text-[11px] text-[#777] leading-[1.65]">Si vous avez un plan HubSpot Pro ou Enterprise, commencez par l&apos;integration native. C&apos;est la plus simple a deployer et elle couvre 80% des cas d&apos;usage. Si vous etes sur un plan Starter ou Free, passez par Make. Si vous avez un developpeur et des besoins specifiques (messages transactionnels, chatbot, volumes importants), explorez Twilio.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 : Prerequis WhatsApp Business API */}
              <section id="prerequis" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Prerequis : WhatsApp Business API</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Avant de connecter quoi que ce soit, il faut comprendre la difference entre les trois versions de WhatsApp. C&apos;est la source de confusion numero un chez nos clients.</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        name: "WhatsApp Personnel",
                        desc: "L\u2019application que tout le monde utilise. Pas d\u2019API, pas de possibilite d\u2019integration. Impossible de la connecter a HubSpot de maniere fiable et legale.",
                        usable: false,
                      },
                      {
                        name: "WhatsApp Business (app gratuite)",
                        desc: "L\u2019application gratuite pour les petites entreprises. Profil entreprise, catalogue produits, reponses rapides. Mais toujours pas d\u2019API officielle. Certains outils tiers proposent des workarounds, mais ce n\u2019est pas supporte par Meta et ca peut entrainer la suspension de votre numero.",
                        usable: false,
                      },
                      {
                        name: "WhatsApp Business Platform (API)",
                        desc: "La version cloud de l\u2019API WhatsApp Business, hebergee par Meta. C\u2019est la seule version qui permet une integration fiable, legale et scalable avec HubSpot. Accessible via des partenaires comme Twilio, MessageBird, ou directement via l\u2019API Meta Cloud.",
                        usable: true,
                      },
                    ].map((v) => (
                      <div key={v.name} className={`rounded-lg border p-4 ${v.usable ? "border-[#22C55E] bg-[#F0FDF4]" : "border-[#F2F2F2]"}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[13px] font-semibold text-[#111]">{v.name}</span>
                          {v.usable ? (
                            <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#22C55E]/10 text-[#22C55E]">Compatible</span>
                          ) : (
                            <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#EF4444]/10 text-[#EF4444]">Non compatible</span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.65]">{v.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Pour acceder a l&apos;API WhatsApp Business, vous aurez besoin de :</p>
                  </div>

                  <div className="mt-3 space-y-2">
                    {[
                      "Un compte Meta Business Manager verifie (business.facebook.com)",
                      "Un numero de telephone dedie (qui n\u2019est pas deja utilise sur WhatsApp personnel ou Business app)",
                      "La validation de votre entreprise par Meta (nom, adresse, documents officiels) - comptez 2 a 5 jours ouvrables",
                      "L\u2019acceptation des conditions d\u2019utilisation de la WhatsApp Business Platform",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-md bg-[#4B5EFC]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-[#4B5EFC]">{i + 1}</span>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.65]">{step}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FFF7ED] border border-[#FFEDD5] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Point d&apos;attention</p>
                    <p className="text-[11px] text-[#777] leading-[1.65]">La verification Meta Business est la partie la plus longue du processus. Ne la laissez pas pour la fin. Lancez-la des le debut de votre projet d&apos;integration. Si votre compte Meta a deja ete restreint ou desactive par le passe, le processus peut prendre plus de temps, voire echouer. Dans ce cas, creez un nouveau Business Manager propre.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 : Methode 1 - Integration native HubSpot */}
              <section id="methode-native" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Methode 1 : Integration native HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Depuis fin 2024, HubSpot propose une integration native avec WhatsApp Business. C&apos;est la methode la plus simple si vous avez un plan Sales Hub Pro, Service Hub Pro, ou Marketing Hub Pro (ou superieur). L&apos;integration est incluse dans le prix, sans cout supplementaire.</p>
                    <p>Voici les etapes exactes pour la configurer :</p>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      {
                        step: "1",
                        title: "Connecter votre compte WhatsApp Business a HubSpot",
                        details: "Allez dans Parametres > Boite de reception et service d\u2019assistance > Canaux. Cliquez sur \"Connecter un canal\" puis selectionnez \"WhatsApp\". HubSpot vous redirigera vers Meta pour autoriser la connexion. Connectez-vous avec votre compte Meta Business Manager et selectionnez le numero WhatsApp Business a associer.",
                      },
                      {
                        step: "2",
                        title: "Configurer la boite de reception",
                        details: "Une fois le canal connecte, les messages WhatsApp entrants apparaissent dans la boite de reception HubSpot (Conversations > Boite de reception). Configurez les regles de routage : a quel commercial ou a quelle equipe les messages doivent etre attribues. Vous pouvez router par round-robin, par proprietaire du contact, ou par equipe.",
                      },
                      {
                        step: "3",
                        title: "Activer le suivi sur la timeline des contacts",
                        details: "Par defaut, les conversations WhatsApp sont enregistrees sur la timeline du contact dans HubSpot. Si le numero de telephone du message entrant correspond a un contact existant, la conversation est automatiquement associee. Sinon, HubSpot cree un nouveau contact. Verifiez que vos contacts ont bien le champ \"Numero de telephone\" renseigne au format international (+33 pour la France).",
                      },
                      {
                        step: "4",
                        title: "Creer vos templates de messages",
                        details: "WhatsApp impose d\u2019utiliser des modeles de messages pre-approuves pour envoyer des messages proactifs (hors fenetre de 24h). Allez dans Parametres > Boite de reception > WhatsApp > Modeles. Creez vos modeles et soumettez-les a Meta pour approbation. L\u2019approbation prend generalement entre 1 heure et 24 heures.",
                      },
                      {
                        step: "5",
                        title: "Tester la connexion",
                        details: "Envoyez un message WhatsApp depuis votre telephone personnel vers le numero connecte. Verifiez qu\u2019il apparait dans la boite de reception HubSpot et sur la timeline du contact. Repondez depuis HubSpot et verifiez que la reponse arrive bien sur WhatsApp. Testez egalement l\u2019envoi d\u2019un message sortant via un modele approuve.",
                      },
                    ].map((s) => (
                      <div key={s.step} className="flex gap-3 items-start">
                        <div className="w-7 h-7 rounded-lg bg-[#4B5EFC] flex items-center justify-center shrink-0">
                          <span className="text-[12px] font-bold text-white">{s.step}</span>
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#111] mb-1">{s.title}</p>
                          <p className="text-[12px] text-[#777] leading-[1.65]">{s.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#F0FDF4] border border-[#DCFCE7] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Ce que ca donne concretement</p>
                    <p className="text-[11px] text-[#777] leading-[1.65]">Une fois configure, vos commerciaux peuvent repondre aux messages WhatsApp directement depuis HubSpot, sans changer d&apos;outil. Les conversations sont enregistrees sur la fiche contact, les rapports de temps de reponse fonctionnent, et vous pouvez creer des workflows bases sur les interactions WhatsApp (ex: un deal passe en &ldquo;Negociation&rdquo; quand le prospect repond sur WhatsApp).</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 : Methode 2 - Via Make/Zapier */}
              <section id="methode-make" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Methode 2 : Via Make ou Zapier</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Si vous n&apos;avez pas un plan HubSpot Pro, ou si vous voulez plus de flexibilite dans la configuration, Make (ex-Integromat) et Zapier permettent de connecter WhatsApp Business API a HubSpot via des scenarios d&apos;automatisation.</p>
                    <p>C&apos;est la methode qu&apos;on utilise le plus chez Ceres, car elle fonctionne avec tous les plans HubSpot (y compris Free et Starter) et offre une personnalisation fine des flux de donnees.</p>
                    <p>Voici le workflow type qu&apos;on met en place :</p>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Architecture du workflow Make</p>
                    <div className="space-y-2">
                      {[
                        { label: "Trigger", desc: "Webhook WhatsApp Cloud API - reception d\u2019un message entrant" },
                        { label: "Etape 1", desc: "Extraire le numero, le contenu du message, et le timestamp" },
                        { label: "Etape 2", desc: "Rechercher le contact dans HubSpot par numero de telephone" },
                        { label: "Etape 3", desc: "Si le contact n\u2019existe pas, le creer avec le numero et le prefixe pays" },
                        { label: "Etape 4", desc: "Creer une note sur la timeline du contact avec le contenu du message" },
                        { label: "Etape 5", desc: "Mettre a jour la propriete \"Dernier canal utilise\" avec la valeur \"WhatsApp\"" },
                        { label: "Etape 6", desc: "(Optionnel) Envoyer une notification Slack a l\u2019equipe commerciale" },
                      ].map((e) => (
                        <div key={e.label} className="flex gap-3 items-start py-2 border-b border-[#F5F5F5] last:border-0">
                          <span className="text-[10px] font-bold text-[#4B5EFC] bg-[#4B5EFC]/10 px-2 py-0.5 rounded shrink-0">{e.label}</span>
                          <p className="text-[11px] text-[#777] leading-[1.6]">{e.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Pour le sens inverse (HubSpot vers WhatsApp), on cree un second scenario :</p>
                  </div>

                  <div className="mt-3 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Workflow sortant : HubSpot vers WhatsApp</p>
                    <div className="space-y-2">
                      {[
                        { label: "Trigger", desc: "Webhook HubSpot - changement de statut de deal (ex: passe en \"Proposition envoyee\")" },
                        { label: "Etape 1", desc: "Recuperer les informations du deal et du contact associe" },
                        { label: "Etape 2", desc: "Verifier que le contact a un numero WhatsApp valide" },
                        { label: "Etape 3", desc: "Envoyer un message WhatsApp via l\u2019API Cloud (template pre-approuve)" },
                        { label: "Etape 4", desc: "Logger l\u2019envoi comme activite sur la timeline HubSpot" },
                      ].map((e) => (
                        <div key={e.label} className="flex gap-3 items-start py-2 border-b border-[#F5F5F5] last:border-0">
                          <span className="text-[10px] font-bold text-[#FF7A59] bg-[#FF7A59]/10 px-2 py-0.5 rounded shrink-0">{e.label}</span>
                          <p className="text-[11px] text-[#777] leading-[1.6]">{e.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le cout total de cette approche depend de votre volume. Pour un usage modere (moins de 500 messages par mois), comptez environ 15 a 25 euros par mois (9 euros pour Make plan Core + les frais WhatsApp API qui sont de l&apos;ordre de 0.03 a 0.08 euro par conversation selon le pays).</p>
                    <p>Le setup prend environ 3 a 4 heures pour un scenario bien configure et teste. Chez Ceres, on standardise ce workflow pour tous nos clients et on l&apos;adapte en fonction du pipeline et des proprietes custom de chaque compte HubSpot.</p>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FFF7ED] border border-[#FFEDD5] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Piege courant</p>
                    <p className="text-[11px] text-[#777] leading-[1.65]">Les numeros de telephone doivent etre au format E.164 (+33612345678) dans HubSpot pour que le matching fonctionne. Si vos contacts ont des formats heterogenes (06 12 34 56 78, 0033612345678, etc.), ajoutez une etape de normalisation dans votre scenario Make avant la recherche HubSpot. Sinon, vous aurez des doublons et des messages non associes.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 : Methode 3 - Via Twilio */}
              <section id="methode-twilio" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Methode 3 : Via Twilio (pour les equipes techniques)</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Twilio est un fournisseur d&apos;API de communication (SMS, voix, WhatsApp, email). Leur API WhatsApp est l&apos;une des plus matures du marche. Si vous avez un developpeur dans votre equipe et des besoins avances, c&apos;est la methode qui offre le plus de controle.</p>
                    <p>Cette approche est pertinente dans trois cas :</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" />Vous envoyez plus de 1 000 messages par jour et avez besoin de performances optimales</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" />Vous voulez construire un chatbot WhatsApp connecte a HubSpot</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" />Vous avez besoin d&apos;une logique metier complexe (messages conditionnes par plusieurs proprietes HubSpot, enrichissement en temps reel, routing dynamique)</li>
                    </ul>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      {
                        step: "1",
                        title: "Creer un compte Twilio et activer le canal WhatsApp",
                        details: "Inscrivez-vous sur twilio.com, creez un projet, puis allez dans Messaging > WhatsApp. Twilio propose un Sandbox pour tester gratuitement avant d\u2019associer votre propre numero. Pour la production, vous devrez soumettre votre Business Profile a Meta via Twilio (le processus est guide).",
                      },
                      {
                        step: "2",
                        title: "Configurer les webhooks pour les messages entrants",
                        details: "Dans la console Twilio, configurez l\u2019URL de webhook qui recevra les messages entrants. Ce webhook doit pointer vers votre serveur ou une fonction serverless (AWS Lambda, Vercel Function, etc.) qui traitera le message et l\u2019enverra a HubSpot via l\u2019API.",
                      },
                      {
                        step: "3",
                        title: "Developper la logique d\u2019integration avec HubSpot",
                        details: "Votre code doit : (1) recevoir le message Twilio, (2) extraire le numero et le contenu, (3) chercher ou creer le contact dans HubSpot via l\u2019API CRM, (4) creer un engagement (note ou activite) sur la timeline, (5) optionnellement declencher un workflow HubSpot via l\u2019API Workflows.",
                      },
                      {
                        step: "4",
                        title: "Configurer les messages sortants",
                        details: "Pour les messages sortants, utilisez l\u2019API Twilio Messages. Creez un endpoint dans votre backend qui recoit un webhook HubSpot (declenchement de workflow) et envoie le message WhatsApp correspondant via Twilio. N\u2019oubliez pas de gerer les templates approuves et la fenetre de 24 heures.",
                      },
                    ].map((s) => (
                      <div key={s.step} className="flex gap-3 items-start">
                        <div className="w-7 h-7 rounded-lg bg-[#111] flex items-center justify-center shrink-0">
                          <span className="text-[12px] font-bold text-white">{s.step}</span>
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#111] mb-1">{s.title}</p>
                          <p className="text-[12px] text-[#777] leading-[1.65]">{s.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le cout avec Twilio est entierement variable : environ 0.005 euro par message envoye ou recu, plus les frais de conversation WhatsApp (0.03 a 0.08 euro par conversation de 24h selon la categorie). Pour 1 000 messages par mois, comptez environ 10 a 15 euros. C&apos;est la solution la plus economique a fort volume.</p>
                    <p>Le temps de developpement initial est d&apos;environ 2 a 5 jours pour un developpeur experimente. La maintenance est legere une fois le systeme en place, mais il faut prevoir une surveillance des erreurs (messages non delivres, tokens expires, rate limits).</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 : Automatiser les messages WhatsApp */}
              <section id="automatiser" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Automatiser les messages WhatsApp</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Une fois l&apos;integration en place, l&apos;objectif est d&apos;automatiser les messages recurrents pour gagner du temps et ameliorer l&apos;experience client. Mais attention : WhatsApp a des regles strictes sur les messages automatises.</p>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#111] p-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Regle fondamentale</span>
                    <h3 className="text-[15px] font-semibold text-white mb-3">La fenetre de 24 heures</h3>
                    <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                      <p>WhatsApp distingue deux types de messages :</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        <div className="rounded-lg bg-white/5 p-4">
                          <p className="text-[12px] font-semibold text-white mb-2">Messages de session</p>
                          <p className="text-[11px] text-white/50 leading-[1.65]">Vous pouvez envoyer des messages libres (non templateises) dans les 24 heures suivant le dernier message du client. Format libre, pas besoin d&apos;approbation.</p>
                        </div>
                        <div className="rounded-lg bg-white/5 p-4">
                          <p className="text-[12px] font-semibold text-white mb-2">Messages templates</p>
                          <p className="text-[11px] text-white/50 leading-[1.65]">En dehors de la fenetre de 24h, vous devez utiliser des templates pre-approuves par Meta. Ils sont categorises : marketing, utilitaire, authentification. Chaque categorie a un tarif different.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Voici les cas d&apos;usage d&apos;automatisation les plus courants qu&apos;on deploie chez nos clients :</p>
                  </div>

                  <div className="mt-3 space-y-3">
                    {[
                      {
                        title: "Confirmation de rendez-vous",
                        trigger: "Deal passe en \"RDV planifie\" dans HubSpot",
                        template: "Bonjour {{prenom}}, votre rendez-vous avec {{commercial}} est confirme pour le {{date}} a {{heure}}. Repondez OUI pour confirmer ou contactez-nous pour modifier.",
                        category: "Utilitaire",
                      },
                      {
                        title: "Rappel avant rendez-vous",
                        trigger: "1 heure avant la date/heure du rendez-vous (workflow HubSpot)",
                        template: "Bonjour {{prenom}}, petit rappel : votre rendez-vous avec {{commercial}} est dans 1 heure. A tout de suite.",
                        category: "Utilitaire",
                      },
                      {
                        title: "Suivi post-proposition",
                        trigger: "Deal en \"Proposition envoyee\" depuis plus de 3 jours sans reponse",
                        template: "Bonjour {{prenom}}, avez-vous eu le temps de consulter notre proposition ? N\u2019hesitez pas a nous repondre directement ici si vous avez des questions.",
                        category: "Marketing",
                      },
                      {
                        title: "Notification d\u2019expedition",
                        trigger: "Propriete custom \"Statut commande\" passe a \"Expediee\"",
                        template: "Bonjour {{prenom}}, votre commande {{ref}} a ete expediee. Vous pouvez suivre la livraison ici : {{lien_tracking}}.",
                        category: "Utilitaire",
                      },
                      {
                        title: "Bienvenue nouveau client",
                        trigger: "Deal passe en \"Gagne\" dans HubSpot",
                        template: "Bienvenue chez {{entreprise}}, {{prenom}} ! Votre interlocuteur principal est {{csm}}. N\u2019hesitez pas a utiliser ce canal pour toute question.",
                        category: "Marketing",
                      },
                    ].map((u) => (
                      <div key={u.title} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[12px] font-semibold text-[#111]">{u.title}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-medium bg-[#4B5EFC]/10 text-[#4B5EFC]">{u.category}</span>
                        </div>
                        <p className="text-[10px] text-[#999] mb-2">Declencheur : {u.trigger}</p>
                        <div className="rounded-lg bg-[#FAFAFA] p-3">
                          <p className="text-[11px] text-[#555] leading-[1.6] font-mono">{u.template}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FFF7ED] border border-[#FFEDD5] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Bonnes pratiques pour les templates</p>
                    <div className="space-y-1.5">
                      {[
                        "Gardez les messages courts (moins de 160 caracteres si possible)",
                        "Personnalisez avec le prenom et le contexte (deal, produit, date)",
                        "Incluez toujours un appel a l\u2019action clair",
                        "Evitez les messages purement promotionnels : Meta les rejette de plus en plus",
                        "Testez vos templates sur le Sandbox avant de les soumettre en production",
                      ].map((bp) => (
                        <p key={bp} className="text-[11px] text-[#777] flex items-start gap-2 leading-[1.6]">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#FF7A59] mt-0.5 shrink-0"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          {bp}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 : Tracker les conversations dans le CRM */}
              <section id="tracker" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Tracker les conversations dans le CRM</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;integration WhatsApp-HubSpot ne se limite pas a envoyer et recevoir des messages. L&apos;objectif est de transformer ces conversations en donnees exploitables pour vos rapports et vos decisions commerciales.</p>
                    <p>Voici ce qu&apos;on met en place systematiquement chez nos clients pour un tracking complet :</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        title: "Proprietes custom dans HubSpot",
                        items: [
                          "\"Dernier message WhatsApp\" (date) - mis a jour automatiquement a chaque message entrant",
                          "\"Nombre de messages WhatsApp\" (nombre) - incremente a chaque echange",
                          "\"Canal prefere\" (enumeration) - Email, Telephone, WhatsApp - determine par l\u2019historique d\u2019interaction",
                          "\"Opt-in WhatsApp\" (booleen) - indispensable pour la conformite RGPD",
                        ],
                      },
                      {
                        title: "Rapports HubSpot",
                        items: [
                          "Nombre de conversations WhatsApp par commercial (activite de l\u2019equipe)",
                          "Temps de reponse moyen sur WhatsApp vs email vs telephone",
                          "Taux de conversion des deals ayant implique WhatsApp vs ceux sans",
                          "Volume de messages par jour/semaine/mois (tendance d\u2019adoption)",
                        ],
                      },
                      {
                        title: "Workflows de suivi",
                        items: [
                          "Alerte manager si un message client n\u2019a pas recu de reponse depuis plus de 2 heures",
                          "Mise a jour automatique du deal stage si le prospect repond \"OK\" ou \"Oui\" a une proposition",
                          "Assignation automatique a un CSM quand un client existant envoie un message",
                        ],
                      },
                    ].map((block) => (
                      <div key={block.title} className="rounded-lg border border-[#F2F2F2] p-4">
                        <p className="text-[13px] font-semibold text-[#111] mb-3">{block.title}</p>
                        <div className="space-y-2">
                          {block.items.map((item) => (
                            <p key={item} className="text-[11px] text-[#777] flex items-start gap-2 leading-[1.6]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-1.5 shrink-0" />
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Le point cle, c&apos;est la discipline de donnees. Si vos numeros de telephone sont mal formates dans HubSpot, le matching entre les messages WhatsApp et les contacts ne fonctionnera pas. Avant de lancer l&apos;integration, nettoyez vos numeros et standardisez-les au format E.164. Un workflow HubSpot peut le faire automatiquement a la creation de chaque nouveau contact.</p>
                    <p>On constate chez nos clients que les equipes qui trackent les conversations WhatsApp dans le CRM ont une visibilite 2 a 3 fois meilleure sur l&apos;activite commerciale reelle. Les managers voient enfin ce qui se passe en dehors de l&apos;email, et les previsions de pipeline sont plus fiables.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 : Les limites a connaitre */}
              <section id="limites" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les limites a connaitre</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;integration WhatsApp-HubSpot n&apos;est pas parfaite. Voici les limites et les frustrations qu&apos;on rencontre regulierement en deploiement :</p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      {
                        title: "La fenetre de 24 heures est contraignante",
                        desc: "Vous ne pouvez pas envoyer de message libre a un contact qui n\u2019a pas ecrit dans les dernieres 24 heures. C\u2019est une regle Meta, pas HubSpot. Ca signifie que les relances froides par WhatsApp sont limitees aux templates approuves, qui sont moins personnalisables qu\u2019un email.",
                      },
                      {
                        title: "L\u2019approbation des templates prend du temps",
                        desc: "Meta peut refuser vos templates sans explication claire. Les messages trop commerciaux ou trop vagues sont souvent rejetes. Il faut parfois 3 ou 4 tentatives avant d\u2019obtenir l\u2019approbation. Prevoyez ce delai dans votre planning de deploiement.",
                      },
                      {
                        title: "Un seul numero par canal HubSpot",
                        desc: "L\u2019integration native HubSpot ne supporte qu\u2019un numero WhatsApp par boite de reception. Si vous avez besoin de plusieurs numeros (un par pays, un par equipe), il faudra creer plusieurs boites de reception ou passer par une solution tierce.",
                      },
                      {
                        title: "Pas de media riche dans les workflows",
                        desc: "Les workflows HubSpot ne permettent pas d\u2019envoyer des images, PDF, ou videos via WhatsApp de maniere native. Si vous avez besoin d\u2019envoyer des pieces jointes automatiquement, il faudra passer par Make ou l\u2019API Twilio.",
                      },
                      {
                        title: "RGPD et consentement",
                        desc: "WhatsApp est un canal personnel. Envoyer des messages commerciaux sans consentement explicite est non seulement une mauvaise pratique, c\u2019est aussi potentiellement illegal. Assurez-vous d\u2019avoir un opt-in clair et trace dans HubSpot avant d\u2019envoyer le moindre message.",
                      },
                      {
                        title: "Cout variable et difficile a prevoir",
                        desc: "Le modele de tarification de WhatsApp Business API est base sur les conversations (fenetres de 24h), avec des prix differents selon la categorie (marketing, utilitaire, service) et le pays. Ca rend la budgetisation difficile, surtout au debut.",
                      },
                    ].map((l) => (
                      <div key={l.title} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-md bg-[#FEF2F2] flex items-center justify-center shrink-0 mt-0.5">
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="text-[#EF4444]"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#111] mb-1">{l.title}</p>
                          <p className="text-[12px] text-[#777] leading-[1.65]">{l.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 10 : Notre recommandation */}
              <section id="recommandation" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Recommandation</span>
                  <h2 className="text-[20px] font-semibold text-white mb-4">Notre recommandation selon votre situation</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Apres avoir deploye l&apos;integration WhatsApp-HubSpot chez une dizaine de clients, voici notre grille de decision :</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-4 h-4" />
                        <p className="text-[12px] font-semibold text-white">Vous avez HubSpot Pro ou Enterprise</p>
                      </div>
                      <p className="text-[11px] text-white/50 leading-[1.65]">Utilisez l&apos;integration native. C&apos;est la plus simple, la plus fiable, et elle est incluse dans votre abonnement. Vous aurez les conversations dans la boite de reception, le tracking sur la timeline, et la possibilite de declencher des workflows. C&apos;est suffisant pour 80% des cas d&apos;usage.</p>
                    </div>
                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=make.com&sz=32" alt="Make" className="w-4 h-4" />
                        <p className="text-[12px] font-semibold text-white">Vous avez HubSpot Free ou Starter</p>
                      </div>
                      <p className="text-[11px] text-white/50 leading-[1.65]">Passez par Make ou Zapier. Le setup est un peu plus long mais le resultat est equivalent. Vous gardez le tracking, l&apos;automatisation, et les rapports. C&apos;est aussi la bonne option si vous voulez des workflows plus complexes que ce que propose l&apos;integration native (envoi multi-canal, enrichissement, routing avance).</p>
                    </div>
                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=twilio.com&sz=32" alt="Twilio" className="w-4 h-4" />
                        <p className="text-[12px] font-semibold text-white">Vous avez un developpeur et des besoins specifiques</p>
                      </div>
                      <p className="text-[11px] text-white/50 leading-[1.65]">Twilio est la bonne option si vous envoyez plus de 1 000 messages par jour, si vous avez besoin d&apos;un chatbot, ou si vous voulez un controle total sur la logique d&apos;envoi et le format des messages. Le cout par message est le plus bas, mais le cout de developpement initial est le plus eleve.</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Dans tous les cas, commencez petit. Deployez l&apos;integration sur un seul cas d&apos;usage (par exemple, la confirmation de rendez-vous) avec une equipe pilote. Mesurez les resultats pendant 2 semaines. Puis etendez a d&apos;autres cas d&apos;usage et d&apos;autres equipes.</p>
                    <p>L&apos;erreur la plus frequente qu&apos;on voit chez nos clients, c&apos;est de vouloir tout automatiser d&apos;un coup. On se retrouve avec 15 templates WhatsApp, 8 workflows, et un taux de desabonnement qui explose parce que les contacts recoivent trop de messages. WhatsApp est un canal intime. Il faut le traiter avec parcimonie et pertinence.</p>
                  </div>
                </div>
              </section>
            </article>

            {/* Related articles */}
            <section className="mt-12 mb-8">
              <p className="text-[13px] font-semibold text-[#111] mb-4">Articles similaires</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedArticles.map((a) => (
                  <Link key={a.slug} href={`/blog/${a.slug}`} className="rounded-lg border border-[#F2F2F2] p-4 hover:border-[#DDD] transition-colors group">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white mb-3" style={{ background: a.color }}>
                      {a.category[0]}
                    </div>
                    <p className="text-[12px] font-semibold text-[#111] leading-[1.4] group-hover:text-[#4B5EFC] transition-colors">{a.title}</p>
                    <p className="text-[10px] text-[#999] mt-2">{a.category}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section>
              <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour connecter WhatsApp a HubSpot ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[450px] mx-auto">On configure l&apos;integration WhatsApp-HubSpot de A a Z : compte Meta Business, templates, workflows, tracking. Operationnel en moins d&apos;une semaine.</p>
                <div className="flex items-center justify-center gap-3">
                  <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                    <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Reserver un appel
                  </a>
                  <Link href="/agence-hubspot" className="inline-flex items-center gap-2 px-5 py-2 rounded-md border border-[#EAEAEA] bg-white text-[#111] text-[13px] font-medium hover:border-[#CCC] transition-colors">
                    Nos services
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
