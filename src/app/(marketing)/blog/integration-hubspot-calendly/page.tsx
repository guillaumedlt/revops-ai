"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Integration HubSpot x Calendly : guide complet",
  author: { "@type": "Person", name: "Guillaume Delachet" },
  publisher: { "@type": "Organization", name: "Ceres", url: "https://www.ceres-revops.com" },
  datePublished: "2026-02-05",
  description: "Guide complet pour connecter Calendly a HubSpot. Integration native, workflows, automatisation post-RDV, comparaison avec HubSpot Meetings. Configuration pas a pas et bonnes pratiques.",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.ceres-revops.com/blog/integration-hubspot-calendly" },
  image: "https://www.ceres-revops.com/og/integration-hubspot-calendly.png",
};

const sections = [
  { id: "pourquoi", title: "Pourquoi connecter Calendly a HubSpot" },
  { id: "comparaison", title: "HubSpot Meetings vs Calendly" },
  { id: "configurer", title: "Configurer l\u2019integration native" },
  { id: "synchronisation", title: "Que synchronise l\u2019integration" },
  { id: "automatiser", title: "Automatiser apres la prise de RDV" },
  { id: "pipeline", title: "Tracker les RDV dans le pipeline" },
  { id: "limites", title: "Les limites de l\u2019integration" },
  { id: "tips", title: "Tips avances" },
  { id: "recommandation", title: "Notre recommandation" },
];

const relatedArticles = [
  { title: "9 actions commerciales que vous devriez automatiser", slug: "9-actions-commerciales-automatiser-hubspot", category: "Automatisation", color: "#6C5CE7" },
  { title: "7 workflows HubSpot pour votre marketing automation", slug: "marketing-automation-7-workflows-hubspot", category: "Automatisation", color: "#6C5CE7" },
  { title: "Integration HubSpot x WhatsApp : guide pas a pas", slug: "integration-hubspot-whatsapp", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function IntegrationHubSpotCalendlyArticle() {
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
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "30%", width: 280, height: 280, borderRadius: "50%", background: "#006BFF", opacity: 0.08, filter: "blur(70px)" }} />
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
                  <a href="https://twitter.com/intent/tweet?url=https://www.ceres-revops.com/blog/integration-hubspot-calendly&text=Integration%20HubSpot%20x%20Calendly%20:%20guide%20complet" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://www.ceres-revops.com/blog/integration-hubspot-calendly" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
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
              <span className="text-[#666]">Integration HubSpot x Calendly</span>
            </nav>

            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">10 min de lecture</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Integration HubSpot x Calendly : guide complet
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Calendly est devenu le standard pour la prise de rendez-vous en B2B. Mais sans connexion a votre CRM, chaque rendez-vous reste un evenement isole : pas d&apos;attribution, pas de deal cree automatiquement, pas de workflow post-RDV. Ce guide couvre tout ce qu&apos;il faut savoir pour connecter Calendly a HubSpot : integration native, comparaison avec HubSpot Meetings, automatisation des workflows apres la prise de rendez-vous, et les pieges a eviter. Avec notre retour d&apos;experience apres l&apos;avoir deploye chez plus de vingt clients.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center text-white text-[9px] font-bold">GD</div>
                  <span>Par <strong className="text-[#111]">Guillaume Delachet</strong></span>
                </div>
                <span>5 fevrier 2026</span>
              </div>

              {/* Tools involved */}
              <div className="mt-8 rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-5">
                <span className="text-[13px] font-semibold text-[#111] mb-4 block">Outils concernes</span>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: "HubSpot", domain: "hubspot.com" },
                    { name: "Calendly", domain: "calendly.com" },
                    { name: "HubSpot Meetings", domain: "hubspot.com" },
                    { name: "Slack", domain: "slack.com" },
                    { name: "Zoom", domain: "zoom.us" },
                    { name: "Google Calendar", domain: "calendar.google.com" },
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
              {/* Section 1 : Pourquoi connecter Calendly a HubSpot */}
              <section id="pourquoi" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Pourquoi connecter Calendly a HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Calendly est utilise par des millions d&apos;equipes commerciales et marketing pour planifier leurs rendez-vous. Le lien de booking est partout : dans les signatures d&apos;email, les landing pages, les sequences de prospection, les formulaires de contact. C&apos;est simple, rapide, et ca evite les allers-retours pour trouver un creneau.</p>
                    <p>Le probleme, c&apos;est que par defaut, Calendly et HubSpot vivent dans deux mondes separes. Un prospect prend rendez-vous via Calendly, mais dans HubSpot, rien ne se passe. Pas de contact cree, pas de deal ouvert, pas de notification au bon commercial, pas de workflow declenche. Le rendez-vous existe dans Google Calendar ou Outlook, mais votre CRM ne sait pas qu&apos;il a eu lieu.</p>
                    <p>Connecter Calendly a HubSpot permet de resoudre quatre problemes concrets :</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4B5EFC] mt-2 shrink-0" /><strong className="text-[#111]">Creer automatiquement des contacts.</strong> Chaque personne qui prend rendez-vous via Calendly est creee ou mise a jour dans HubSpot. Plus de saisie manuelle, plus de prospects qui passent entre les mailles du filet.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#006BFF] mt-2 shrink-0" /><strong className="text-[#111]">Declencher des workflows post-RDV.</strong> Assignation du contact au bon commercial, creation d&apos;un deal dans le pipeline, envoi d&apos;un email de preparation, notification Slack. Tout ca se fait automatiquement des que le rendez-vous est confirme.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#FF7A59] mt-2 shrink-0" /><strong className="text-[#111]">Tracker le parcours complet.</strong> D&apos;ou vient ce rendez-vous ? Quelle campagne, quelle page, quelle sequence a genere la prise de RDV ? Sans integration, l&apos;attribution est impossible. Avec l&apos;integration, vous pouvez mesurer le ROI de chaque canal.</li>
                      <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-2 shrink-0" /><strong className="text-[#111]">Gagner du temps.</strong> Les commerciaux ne creent plus de fiches contact manuellement apres chaque rendez-vous. Les managers n&apos;ont plus besoin de demander qui a combien de demos cette semaine. Tout est dans le CRM, en temps reel.</li>
                    </ul>
                    <p>Chez Ceres, on deploie cette integration chez pratiquement tous nos clients B2B. C&apos;est l&apos;une des premieres choses qu&apos;on met en place quand on configure un HubSpot pour une equipe commerciale. Le gain de temps est immediat, et la qualite des donnees CRM s&apos;ameliore considerablement des la premiere semaine.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 2 : HubSpot Meetings vs Calendly */}
              <section id="comparaison" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">HubSpot Meetings vs Calendly : quelle solution choisir ?</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Avant de parler d&apos;integration, il faut poser la question que tout le monde se pose : pourquoi ne pas simplement utiliser HubSpot Meetings, l&apos;outil de prise de rendez-vous natif de HubSpot ? C&apos;est une bonne question, et la reponse depend de votre contexte.</p>
                    <p>Voici un comparatif detaille des deux solutions :</p>
                  </div>

                  {/* Comparison table */}
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-[11px]">
                      <thead>
                        <tr className="border-b border-[#F2F2F2]">
                          <th className="text-left py-3 pr-4 font-semibold text-[#999] uppercase tracking-wider w-[35%]">Critere</th>
                          <th className="text-left py-3 px-4 font-semibold text-[#999] uppercase tracking-wider w-[32.5%]">
                            <div className="flex items-center gap-2">
                              <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-4 h-4" />
                              HubSpot Meetings
                            </div>
                          </th>
                          <th className="text-left py-3 pl-4 font-semibold text-[#999] uppercase tracking-wider w-[32.5%]">
                            <div className="flex items-center gap-2">
                              <img src="https://www.google.com/s2/favicons?domain=calendly.com&sz=32" alt="Calendly" className="w-4 h-4" />
                              Calendly
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-[#555]">
                        {[
                          { critere: "Prix", hubspot: "Inclus dans tous les plans (meme Free)", calendly: "Gratuit (1 type d\u2019event), Standard 10$/mois, Teams 16$/mois" },
                          { critere: "Integration CRM", hubspot: "Native, zero configuration", calendly: "Via integration officielle (setup en 5 min)" },
                          { critere: "Round-robin", hubspot: "Oui (a partir de Sales Hub Starter)", calendly: "Oui (a partir du plan Teams)" },
                          { critere: "Types d\u2019evenements", hubspot: "Limite (1:1, groupe, round-robin)", calendly: "Plus riche (1:1, groupe, round-robin, collective, routing)" },
                          { critere: "Pages de booking", hubspot: "Basiques, personnalisation limitee", calendly: "Tres personnalisables, branding avance" },
                          { critere: "Routing / qualification", hubspot: "Non (ou via formulaires externes)", calendly: "Oui (Calendly Routing, plan Teams+)" },
                          { critere: "Integrations tierces", hubspot: "Limitees (Google Meet, Zoom, Teams)", calendly: "Nombreuses (Stripe, Zapier, Slack, Salesforce, etc.)" },
                          { critere: "Rappels et follow-ups", hubspot: "Rappels email basiques", calendly: "Rappels email + SMS, workflows personnalises" },
                          { critere: "Embed sur site web", hubspot: "Widget basique", calendly: "Widget avance (inline, popup, badge)" },
                          { critere: "UTM tracking", hubspot: "Natif dans HubSpot", calendly: "Via parametres UTM dans l\u2019URL (a configurer)" },
                          { critere: "Paiement a la reservation", hubspot: "Non", calendly: "Oui (via Stripe, plan Pro+)" },
                          { critere: "API", hubspot: "API HubSpot complete", calendly: "API Calendly v2 (webhooks, events, users)" },
                        ].map((row, i) => (
                          <tr key={i} className="border-b border-[#F8F8F8]">
                            <td className="py-2.5 pr-4 font-semibold text-[#111]">{row.critere}</td>
                            <td className="py-2.5 px-4 text-[#777] leading-[1.5]">{row.hubspot}</td>
                            <td className="py-2.5 pl-4 text-[#777] leading-[1.5]">{row.calendly}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] p-4">
                      <p className="text-[12px] font-semibold text-[#111] mb-2">Quand utiliser HubSpot Meetings</p>
                      <p className="text-[11px] text-[#777] leading-[1.65]">Votre equipe est petite (1-5 commerciaux), vous n&apos;avez pas besoin de routing avance, et vous voulez eviter un outil supplementaire. HubSpot Meetings est gratuit, natif, et les donnees sont deja dans le CRM sans aucune configuration. C&apos;est le choix logique si la simplicite est votre priorite.</p>
                    </div>
                    <div className="rounded-lg bg-[#F0F0FF] border border-[#E0E0FF] p-4">
                      <p className="text-[12px] font-semibold text-[#111] mb-2">Quand utiliser Calendly</p>
                      <p className="text-[11px] text-[#777] leading-[1.65]">Votre equipe est plus grande (5+ commerciaux), vous avez besoin de routing intelligent (qualifier le prospect avant de l&apos;envoyer vers le bon commercial), vous voulez des pages de booking avec un branding pro, ou vous avez besoin de fonctionnalites avancees comme les paiements a la reservation ou les rappels SMS. Calendly est aussi le meilleur choix si vous utilisez d&apos;autres CRM en parallele ou si vous avez des processus de booking complexes (events collectifs, enchainements de meetings).</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Chez Ceres, on utilise les deux selon les cas. Pour les startups early-stage avec une equipe de 2-3 commerciaux, HubSpot Meetings fait parfaitement le travail. Pour les equipes de vente structurees avec du routing, du round-robin multi-equipes, et des besoins de personnalisation avances, Calendly est systematiquement notre recommandation.</p>
                    <p>La bonne nouvelle, c&apos;est que si vous choisissez Calendly, l&apos;integration avec HubSpot est mature et bien documentee. C&apos;est ce qu&apos;on va detailler dans les sections suivantes.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 3 : Configurer l'integration native */}
              <section id="configurer" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Configurer l&apos;integration native Calendly-HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Calendly propose une integration officielle avec HubSpot, disponible a partir du plan Calendly Standard (10$/mois par utilisateur). Le setup est rapide : comptez 10 a 15 minutes pour la connexion de base, et une heure supplementaire pour configurer les mappings de champs et les workflows.</p>
                    <p>Voici les etapes exactes :</p>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      {
                        step: "1",
                        title: "Verifier les prerequis",
                        details: "Vous avez besoin d\u2019un compte Calendly Standard ou superieur (l\u2019integration HubSpot n\u2019est pas disponible sur le plan gratuit). Cote HubSpot, l\u2019integration fonctionne avec tous les plans, y compris Free. Assurez-vous d\u2019avoir les droits d\u2019administrateur sur les deux comptes.",
                      },
                      {
                        step: "2",
                        title: "Connecter Calendly a HubSpot depuis le Marketplace",
                        details: "Allez dans le HubSpot App Marketplace et recherchez \"Calendly\". Cliquez sur \"Installer l\u2019application\". Vous serez redirige vers Calendly pour autoriser la connexion. Connectez-vous avec votre compte Calendly et autorisez l\u2019acces a votre compte HubSpot. La connexion OAuth est bidirectionnelle : Calendly peut lire et ecrire dans HubSpot.",
                      },
                      {
                        step: "3",
                        title: "Configurer le mapping des champs",
                        details: "Dans les parametres de l\u2019integration Calendly, vous pouvez mapper les champs de votre formulaire Calendly vers les proprietes HubSpot. Par defaut, l\u2019email, le nom et le prenom sont mappes automatiquement. Ajoutez les champs custom que vous collectez dans Calendly (entreprise, telephone, taille d\u2019equipe, etc.) et associez-les aux proprietes HubSpot correspondantes. Creez les proprietes dans HubSpot au prealable si elles n\u2019existent pas.",
                      },
                      {
                        step: "4",
                        title: "Choisir le comportement pour les contacts existants",
                        details: "L\u2019integration vous demande ce qu\u2019elle doit faire quand un invitee prend rendez-vous avec un email deja present dans HubSpot. Deux options : mettre a jour les proprietes du contact existant, ou ne rien ecraser. On recommande de mettre a jour uniquement les proprietes vides (ne pas ecraser les donnees existantes), pour eviter de perdre des informations enrichies par d\u2019autres sources.",
                      },
                      {
                        step: "5",
                        title: "Activer la synchronisation des evenements",
                        details: "Activez la synchronisation des events Calendly vers les activites HubSpot. Chaque rendez-vous planifie apparaitra comme une activite de type \"Meeting\" sur la timeline du contact dans HubSpot. Vous verrez le type d\u2019evenement, la date, le commercial associe, et le statut (planifie, termine, annule, no-show).",
                      },
                      {
                        step: "6",
                        title: "Tester la connexion",
                        details: "Creez un rendez-vous test via votre lien Calendly avec une adresse email de test. Verifiez dans HubSpot que le contact a ete cree (ou mis a jour), que l\u2019activite Meeting apparait sur la timeline, et que les proprietes mappees sont correctement remplies. Testez aussi l\u2019annulation et la reprogrammation pour verifier que les statuts se mettent a jour.",
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
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Astuce Ceres</p>
                    <p className="text-[11px] text-[#777] leading-[1.65]">Creez une propriete HubSpot dediee &ldquo;Source du rendez-vous&rdquo; (enumeration) avec des valeurs comme &ldquo;Calendly - Demo&rdquo;, &ldquo;Calendly - Decouverte&rdquo;, &ldquo;Calendly - Support&rdquo;. Mappez-la depuis le type d&apos;evenement Calendly. Ca vous permettra de filtrer vos rapports et vos workflows par type de rendez-vous, ce qui est indispensable quand votre equipe gere plusieurs types de meetings.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 4 : Que synchronise l'integration */}
              <section id="synchronisation" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Que synchronise l&apos;integration Calendly-HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Comprendre exactement ce qui est synchronise entre Calendly et HubSpot est essentiel pour configurer vos workflows correctement. Voici le detail complet de ce que l&apos;integration native transmet :</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        title: "Contacts",
                        color: "#4B5EFC",
                        items: [
                          "Creation automatique du contact si l\u2019email n\u2019existe pas dans HubSpot",
                          "Mise a jour des proprietes mappees (nom, prenom, telephone, entreprise, champs custom)",
                          "Association automatique avec le owner HubSpot qui correspond a l\u2019hote Calendly",
                          "Le lifecycle stage peut etre mis a jour automatiquement (configurable dans l\u2019integration)",
                        ],
                      },
                      {
                        title: "Activites (Meetings)",
                        color: "#006BFF",
                        items: [
                          "Chaque rendez-vous planifie cree une activite Meeting sur la timeline du contact",
                          "Le titre de l\u2019activite reprend le nom du type d\u2019evenement Calendly",
                          "La date, l\u2019heure, la duree et le fuseau horaire sont synchronises",
                          "Le statut est mis a jour : planifie, termine, annule, reprogramme",
                          "Les notes et reponses aux questions custom Calendly sont incluses dans le corps de l\u2019activite",
                        ],
                      },
                      {
                        title: "Proprietes custom synchronisees",
                        color: "#FF7A59",
                        items: [
                          "Calendly cree automatiquement des proprietes dans HubSpot : \"Calendly - Dernier type d\u2019evenement\", \"Calendly - Derniere date de RDV\"",
                          "Les reponses aux questions de votre formulaire Calendly sont mappees vers des proprietes HubSpot",
                          "Les parametres UTM captures dans l\u2019URL Calendly peuvent etre synchronises vers des proprietes HubSpot (configuration requise)",
                        ],
                      },
                      {
                        title: "Ce qui n\u2019est PAS synchronise",
                        color: "#EF4444",
                        items: [
                          "Les companies HubSpot ne sont pas creees automatiquement (il faut un workflow HubSpot pour ca)",
                          "Les deals ne sont pas crees par l\u2019integration (il faut un workflow HubSpot)",
                          "Les no-shows ne sont pas detectes automatiquement par Calendly (il faut marquer manuellement ou utiliser une integration Zoom)",
                          "L\u2019historique des echanges de messages pre-meeting (emails de confirmation/rappel Calendly) n\u2019est pas synchronise",
                        ],
                      },
                    ].map((block) => (
                      <div key={block.title} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: block.color }} />
                          <p className="text-[13px] font-semibold text-[#111]">{block.title}</p>
                        </div>
                        <div className="space-y-2">
                          {block.items.map((item) => (
                            <p key={item} className="text-[11px] text-[#777] flex items-start gap-2 leading-[1.6]">
                              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: block.color }} />
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FFF7ED] border border-[#FFEDD5] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Point d&apos;attention sur le matching des contacts</p>
                    <p className="text-[11px] text-[#777] leading-[1.65]">Le matching entre Calendly et HubSpot se fait exclusivement par email. Si un prospect prend rendez-vous avec un email personnel (gmail) puis revient avec son email professionnel, deux contacts differents seront crees dans HubSpot. Pensez a mettre en place un processus de deduplication regulier, ou configurez vos formulaires Calendly pour demander l&apos;email professionnel en priorite.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 5 : Automatiser apres la prise de RDV */}
              <section id="automatiser" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Automatiser apres la prise de rendez-vous</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;integration Calendly-HubSpot cree le contact et l&apos;activite. Mais la vraie valeur vient des workflows que vous construisez par-dessus. Voici les cinq automatisations qu&apos;on met en place systematiquement chez nos clients :</p>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      {
                        title: "Workflow 1 : Assigner le contact au bon owner",
                        trigger: "Declencheur : activite Meeting creee avec le type \"Calendly\"",
                        steps: [
                          "Verifier si le contact a deja un owner dans HubSpot",
                          "Si non, assigner le contact au commercial qui est l\u2019hote du rendez-vous Calendly",
                          "Si oui, ne pas ecraser (le commercial existant garde la main)",
                          "Mettre a jour le lifecycle stage en \"Sales Qualified Lead\" si le stage actuel est inferieur",
                        ],
                        color: "#4B5EFC",
                      },
                      {
                        title: "Workflow 2 : Creer un deal automatiquement",
                        trigger: "Declencheur : activite Meeting creee avec le type \"Calendly - Demo\"",
                        steps: [
                          "Verifier si un deal ouvert existe deja pour ce contact",
                          "Si non, creer un deal dans le pipeline \"Sales\" au stage \"Demo planifiee\"",
                          "Associer le deal au contact et a la company (si elle existe)",
                          "Definir le owner du deal = owner du contact",
                          "Remplir la propriete \"Source\" avec \"Inbound - Calendly\"",
                          "Definir le montant prevu si une taille d\u2019equipe a ete collectee dans Calendly",
                        ],
                        color: "#22C55E",
                      },
                      {
                        title: "Workflow 3 : Envoyer un email de preparation",
                        trigger: "Declencheur : activite Meeting creee (tous types Calendly)",
                        steps: [
                          "Attendre 5 minutes (laisser le temps a l\u2019integration de synchroniser toutes les donnees)",
                          "Envoyer un email automatise au prospect avec les informations de preparation",
                          "Inclure un lien vers un formulaire pre-meeting (budget, timeline, decision makers)",
                          "Personnaliser le contenu selon le type de rendez-vous (demo vs decouverte vs support)",
                        ],
                        color: "#FF7A59",
                      },
                      {
                        title: "Workflow 4 : Notification Slack a l\u2019equipe",
                        trigger: "Declencheur : activite Meeting creee avec le type \"Calendly\"",
                        steps: [
                          "Envoyer une notification dans le canal Slack #new-meetings",
                          "Inclure le nom du prospect, l\u2019entreprise, le type de rendez-vous, et la date",
                          "Ajouter un lien direct vers la fiche contact HubSpot",
                          "Si le prospect est une entreprise de plus de 50 employes, envoyer aussi au canal #enterprise",
                        ],
                        color: "#611F69",
                      },
                      {
                        title: "Workflow 5 : Gerer les annulations et no-shows",
                        trigger: "Declencheur : propriete \"Calendly - Statut RDV\" change en \"Annule\"",
                        steps: [
                          "Envoyer un email de relance avec un nouveau lien de booking",
                          "Si pas de reponse apres 3 jours, inscrire le contact dans une sequence de nurturing",
                          "Mettre a jour le deal stage en \"En attente\" si un deal existait",
                          "Logger une note sur la timeline avec le motif d\u2019annulation (si disponible)",
                        ],
                        color: "#EF4444",
                      },
                    ].map((wf) => (
                      <div key={wf.title} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: wf.color }} />
                          <p className="text-[13px] font-semibold text-[#111]">{wf.title}</p>
                        </div>
                        <p className="text-[10px] text-[#999] mb-3 ml-4">{wf.trigger}</p>
                        <div className="space-y-2 ml-4">
                          {wf.steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${wf.color}15` }}>
                                <span className="text-[10px] font-bold" style={{ color: wf.color }}>{i + 1}</span>
                              </div>
                              <p className="text-[11px] text-[#777] leading-[1.6]">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Ces cinq workflows couvrent 90% des cas d&apos;usage qu&apos;on rencontre chez nos clients. Le temps total de mise en place est d&apos;environ 2 a 3 heures pour un consultant HubSpot experimente. Le retour sur investissement est immediat : les commerciaux gagnent entre 15 et 30 minutes par jour en taches manuelles eliminees.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 6 : Tracker les RDV dans le pipeline */}
              <section id="pipeline" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Tracker les rendez-vous dans le pipeline</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;integration Calendly-HubSpot prend tout son sens quand vous l&apos;utilisez pour alimenter votre pipeline commercial. Voici comment on structure le tracking chez nos clients :</p>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FAFAFA] border border-[#F2F2F2] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-3">Pipeline type avec Calendly comme point d&apos;entree</p>
                    <div className="space-y-2">
                      {[
                        { stage: "RDV planifie", desc: "Le prospect a pris rendez-vous via Calendly. Le deal est cree automatiquement par le workflow.", color: "#4B5EFC" },
                        { stage: "RDV effectue", desc: "Le rendez-vous a eu lieu. Le commercial passe le deal a ce stage manuellement (ou via integration Zoom/calendrier).", color: "#006BFF" },
                        { stage: "Proposition envoyee", desc: "Suite au rendez-vous, une proposition commerciale a ete envoyee.", color: "#FF7A59" },
                        { stage: "Negociation", desc: "Le prospect a recu la proposition et les echanges sont en cours.", color: "#F59E0B" },
                        { stage: "Gagne / Perdu", desc: "Le deal est finalise. Le montant est confirme ou le deal est marque comme perdu avec un motif.", color: "#22C55E" },
                      ].map((p) => (
                        <div key={p.stage} className="flex gap-3 items-start py-2 border-b border-[#F5F5F5] last:border-0">
                          <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: p.color }} />
                          <div>
                            <span className="text-[12px] font-semibold text-[#111]">{p.stage}</span>
                            <p className="text-[11px] text-[#777] leading-[1.6]">{p.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Pour que ce pipeline fonctionne de maniere fiable, il faut automatiser la mise a jour du lifecycle stage. Voici la logique qu&apos;on applique :</p>
                  </div>

                  <div className="mt-3 space-y-2">
                    {[
                      "Quand un contact prend un RDV Calendly de type \"Decouverte\" : lifecycle stage = Lead",
                      "Quand un contact prend un RDV Calendly de type \"Demo\" ou \"Qualification\" : lifecycle stage = MQL",
                      "Quand le commercial accepte le rendez-vous et cree un deal : lifecycle stage = SQL",
                      "Quand le deal est gagne : lifecycle stage = Customer",
                    ].map((rule, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-md bg-[#4B5EFC]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-[10px] font-bold text-[#4B5EFC]">{i + 1}</span>
                        </div>
                        <p className="text-[12px] text-[#555] leading-[1.65]">{rule}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;avantage de cette approche, c&apos;est que vous pouvez construire des rapports HubSpot precis : combien de RDV Calendly se transforment en deals ? Quel est le taux de conversion RDV vers proposition ? Quel type d&apos;evenement Calendly genere les deals les plus qualifies ? Ces metriques sont essentielles pour optimiser votre process de vente.</p>
                    <p>On recommande aussi de creer un dashboard HubSpot dedie &ldquo;Pipeline Inbound&rdquo; qui affiche le funnel complet : nombre de RDV pris, nombre de RDV effectues, nombre de propositions envoyees, et taux de closing. C&apos;est le rapport que vos managers consultent chaque lundi matin pour piloter l&apos;activite.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 7 : Les limites de l'integration */}
              <section id="limites" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Les limites de l&apos;integration Calendly-HubSpot</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>L&apos;integration est solide et couvre la majorite des besoins, mais elle n&apos;est pas parfaite. Voici les limites et les frustrations qu&apos;on rencontre regulierement en deploiement :</p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      {
                        title: "Pas de creation de deal native",
                        desc: "L\u2019integration Calendly cree des contacts et des activites, mais pas de deals. Pour creer un deal automatiquement a la prise de rendez-vous, il faut construire un workflow HubSpot (ce qu\u2019on a detaille dans la section precedente). Ca fonctionne tres bien, mais c\u2019est une etape supplementaire a configurer et a maintenir.",
                      },
                      {
                        title: "Le plan Calendly Standard est requis",
                        desc: "L\u2019integration HubSpot n\u2019est pas disponible sur le plan gratuit de Calendly. A 10$ par utilisateur par mois, ca peut representer un cout significatif pour les grandes equipes. Si le budget est un enjeu, HubSpot Meetings (gratuit et natif) est une alternative serieuse.",
                      },
                      {
                        title: "Matching par email uniquement",
                        desc: "Le rapprochement entre Calendly et HubSpot se fait uniquement par adresse email. Si un prospect utilise deux emails differents, vous aurez deux contacts dans HubSpot. Il n\u2019y a pas de matching par nom, telephone, ou domaine d\u2019entreprise.",
                      },
                      {
                        title: "Les no-shows sont difficiles a tracker",
                        desc: "Calendly ne detecte pas automatiquement les no-shows (les prospects qui ne se presentent pas au rendez-vous). Pour tracker les no-shows, il faut soit le faire manuellement, soit utiliser une integration avec votre outil de visioconference (Zoom, Google Meet) pour verifier si le meeting a eu des participants.",
                      },
                      {
                        title: "Synchronisation unidirectionnelle",
                        desc: "Les donnees vont de Calendly vers HubSpot, mais pas dans l\u2019autre sens. Si vous modifiez un contact dans HubSpot, les changements ne sont pas refletes dans Calendly. Ca n\u2019est generalement pas un probleme, mais ca peut creer des incoherences si votre equipe utilise les deux outils en parallele.",
                      },
                      {
                        title: "Pas de support natif pour les companies HubSpot",
                        desc: "L\u2019integration ne cree pas de companies dans HubSpot. Si vous voulez associer automatiquement un contact a une company (basee sur le domaine email), il faut activer la fonctionnalite \"Creer et associer automatiquement des entreprises\" dans les parametres HubSpot, ou creer un workflow dedie.",
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

                  <div className="mt-5 rounded-lg bg-[#EFF6FF] border border-[#DBEAFE] p-4">
                    <p className="text-[12px] font-semibold text-[#111] mb-2">Notre avis</p>
                    <p className="text-[11px] text-[#777] leading-[1.65]">Ces limites sont reelles mais aucune n&apos;est bloquante. La plupart se resolvent avec un ou deux workflows HubSpot bien configures. L&apos;integration Calendly-HubSpot reste l&apos;une des plus matures et des plus fiables du marche. On la deploie depuis plus de deux ans chez nos clients et les incidents sont exceptionnels.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 8 : Tips avances */}
              <section id="tips" className="mb-8">
                <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                  <h2 className="text-[17px] font-semibold text-[#111] mb-4">Tips avances pour tirer le maximum de l&apos;integration</h2>
                  <div className="space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Une fois l&apos;integration de base en place, voici les techniques avancees qu&apos;on utilise chez Ceres pour en tirer le maximum :</p>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      {
                        title: "Routing intelligent avec Calendly Routing",
                        desc: "Calendly Routing (disponible sur le plan Teams a 16$/mois) permet de poser des questions de qualification avant la prise de rendez-vous et de router le prospect vers le bon commercial en fonction de ses reponses. Par exemple : \"Combien de commerciaux avez-vous ?\" Si la reponse est superieure a 10, le prospect est dirige vers un AE senior. Si c\u2019est moins de 10, il va vers un AE junior. Les reponses sont synchronisees vers HubSpot via l\u2019integration, ce qui alimente votre scoring et vos rapports.",
                        icon: "calendly.com",
                      },
                      {
                        title: "Round-robin multi-equipes",
                        desc: "Si vous avez plusieurs equipes commerciales (par region, par segment, ou par produit), configurez des event types Calendly distincts avec des pools de commerciaux differents. Chaque event type a son propre round-robin. L\u2019integration HubSpot associera automatiquement le contact au bon owner en fonction du commercial qui recoit le rendez-vous. Combinez ca avec des regles de routing pour que le prospect atterrisse toujours dans le bon event type.",
                        icon: "calendly.com",
                      },
                      {
                        title: "UTM tracking via les URLs Calendly",
                        desc: "Pour tracker d\u2019ou viennent vos rendez-vous, ajoutez des parametres UTM a vos liens Calendly. Par exemple : calendly.com/votre-equipe/demo?utm_source=linkedin&utm_medium=paid&utm_campaign=q1-2026. Calendly capture ces parametres et les transmet a HubSpot via l\u2019integration. Creez des proprietes HubSpot dediees (utm_source_calendly, utm_medium_calendly, utm_campaign_calendly) et mappez-les dans les parametres de l\u2019integration. C\u2019est la seule facon fiable de savoir si vos rendez-vous viennent de LinkedIn, de Google Ads, de votre site web, ou d\u2019une sequence email.",
                        icon: "hubspot.com",
                      },
                      {
                        title: "Embed Calendly conditionnel sur votre site",
                        desc: "Plutot que d\u2019utiliser un lien Calendly unique, embedez le widget directement sur votre site web avec des parametres dynamiques. Utilisez le mode inline pour les pages de pricing (le prospect voit les creneaux sans quitter la page), et le mode popup pour les CTA dans vos articles de blog. Ajoutez des champs caches (hidden fields) pour passer l\u2019identifiant de la page, le segment du visiteur, ou le score lead si vous avez un systeme de scoring cote site.",
                        icon: "calendly.com",
                      },
                      {
                        title: "Detecter les no-shows via Zoom",
                        desc: "Connectez Zoom a Calendly et a HubSpot. Quand un meeting Zoom se termine, Zoom envoie un webhook avec la liste des participants. Si l\u2019invitee Calendly n\u2019apparait pas dans la liste des participants, c\u2019est un no-show. Utilisez un scenario Make ou Zapier pour mettre a jour une propriete HubSpot \"No-show\" sur le contact et declencher un workflow de relance automatique.",
                        icon: "zoom.us",
                      },
                      {
                        title: "Scoring des leads base sur les RDV",
                        desc: "Integrez les donnees Calendly dans votre lead scoring HubSpot. Un contact qui a pris un RDV \"Demo\" vaut plus de points qu\u2019un contact qui a seulement telecharge un livre blanc. Un contact qui a reprogramme son RDV (pas annule, reprogramme) est probablement encore interesse. Un contact qui a fait un no-show deux fois de suite doit perdre des points. Ces regles de scoring rendent vos prioritisations commerciales beaucoup plus precises.",
                        icon: "hubspot.com",
                      },
                    ].map((tip) => (
                      <div key={tip.title} className="rounded-lg border border-[#F2F2F2] p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <img src={`https://www.google.com/s2/favicons?domain=${tip.icon}&sz=32`} alt="" className="w-4 h-4" />
                          <p className="text-[13px] font-semibold text-[#111]">{tip.title}</p>
                        </div>
                        <p className="text-[11px] text-[#777] leading-[1.65]">{tip.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-[#555] leading-[1.75]">
                    <p>Ces techniques avancees ne sont pas toutes necessaires des le depart. On recommande de commencer par l&apos;integration de base, de valider que les contacts et les activites sont bien synchronises, puis d&apos;ajouter les workflows post-RDV. Les tips avances (routing, UTM tracking, no-show detection) viennent dans un second temps, quand votre volume de rendez-vous justifie l&apos;investissement en configuration.</p>
                  </div>
                </div>
              </section>
              <Connector />

              {/* Section 9 : Notre recommandation */}
              <section id="recommandation" className="mb-8">
                <div className="rounded-lg bg-[#111] p-5 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Recommandation</span>
                  <h2 className="text-[20px] font-semibold text-white mb-4">Notre recommandation selon votre situation</h2>
                  <div className="space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Apres avoir deploye l&apos;integration Calendly-HubSpot chez plus de vingt clients, voici notre grille de decision :</p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=hubspot.com&sz=32" alt="HubSpot" className="w-4 h-4" />
                        <p className="text-[12px] font-semibold text-white">Equipe de 1-5 commerciaux, budget serre</p>
                      </div>
                      <p className="text-[11px] text-white/50 leading-[1.65]">Utilisez HubSpot Meetings. C&apos;est gratuit, natif, et les donnees sont automatiquement dans le CRM. Vous n&apos;avez pas besoin de configurer d&apos;integration, le round-robin est disponible des le plan Starter, et les rapports fonctionnent nativement. C&apos;est la solution la plus simple et la plus economique.</p>
                    </div>
                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=calendly.com&sz=32" alt="Calendly" className="w-4 h-4" />
                        <p className="text-[12px] font-semibold text-white">Equipe de 5+ commerciaux, besoins de routing et de branding</p>
                      </div>
                      <p className="text-[11px] text-white/50 leading-[1.65]">Passez a Calendly Teams (16$/utilisateur/mois). Le routing intelligent, les pages de booking personnalisees, les rappels SMS, et l&apos;integration HubSpot mature en font le meilleur choix pour les equipes de vente structurees. L&apos;investissement supplementaire est largement compense par le temps gagne et la qualite de l&apos;experience prospect.</p>
                    </div>
                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <img src="https://www.google.com/s2/favicons?domain=calendly.com&sz=32" alt="Calendly" className="w-4 h-4" />
                        <p className="text-[12px] font-semibold text-white">Vous utilisez deja Calendly dans votre equipe</p>
                      </div>
                      <p className="text-[11px] text-white/50 leading-[1.65]">Ne migrez pas vers HubSpot Meetings. L&apos;integration Calendly-HubSpot est suffisamment mature pour que les deux outils fonctionnent parfaitement ensemble. Concentrez-vous plutot sur la mise en place des workflows post-RDV (creation de deal, assignation, notifications) qui sont la vraie source de valeur ajoutee.</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[13px] text-white/60 leading-[1.75]">
                    <p>Dans tous les cas, la cle du succes n&apos;est pas l&apos;outil de booking que vous choisissez. C&apos;est ce que vous faites apres la prise de rendez-vous. Un Calendly bien integre a HubSpot avec des workflows d&apos;automatisation post-RDV bien configures, c&apos;est ce qui differencie une equipe de vente qui perd 30 minutes par jour en taches manuelles d&apos;une equipe qui peut se concentrer sur ce qui compte : preparer et closer ses rendez-vous.</p>
                    <p>L&apos;erreur la plus frequente qu&apos;on observe chez nos clients, c&apos;est de connecter Calendly a HubSpot et de s&apos;arreter la. L&apos;integration cree des contacts et des activites, c&apos;est bien. Mais sans les workflows d&apos;automatisation, sans le tracking dans le pipeline, et sans les rapports, vous n&apos;exploitez que 20% du potentiel de cette integration. Prenez le temps de configurer les cinq workflows qu&apos;on a detailles dans ce guide. C&apos;est un investissement de quelques heures qui se rentabilise en quelques jours.</p>
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
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide pour connecter Calendly a HubSpot ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[450px] mx-auto">On configure l&apos;integration Calendly-HubSpot de A a Z : connexion, mapping, workflows post-RDV, pipeline tracking. Operationnel en moins d&apos;une semaine.</p>
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
