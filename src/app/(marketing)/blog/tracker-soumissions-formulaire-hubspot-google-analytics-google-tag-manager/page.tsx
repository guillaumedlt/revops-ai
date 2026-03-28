"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const steps = [
  { num: "01", title: "Comprendre le problème", content: `Par défaut, HubSpot ne remonte pas les soumissions de formulaires dans Google Analytics 4. Vous avez des formulaires HubSpot sur votre site, des leads qui arrivent dans votre CRM, mais côté analytics vous êtes aveugle.\n\nRésultat : impossible de savoir quelle page, quelle campagne ou quelle source génère réellement des leads. Vous optimisez vos ads à l'aveugle.` },
  { num: "02", title: "Ce qu'on va mettre en place", content: `On va configurer un tracking qui envoie un événement "hubspot_form_submit" dans GA4 à chaque soumission de formulaire HubSpot. Cet événement contiendra :\n- Le nom du formulaire\n- L'URL de la page\n- L'ID du formulaire HubSpot\n\nVous pourrez ensuite l'utiliser comme conversion dans GA4, Google Ads ou tout autre outil d'attribution.` },
  { num: "03", title: "Ajouter le listener HubSpot", content: `HubSpot expose un événement global quand un formulaire est soumis. On va l'écouter et pousser les données dans le dataLayer de GTM.\n\nAjoutez ce script dans votre site (via GTM en tag HTML personnalisé, ou directement dans votre code) :`,
    code: `<script>
  window.addEventListener('message', function(event) {
    if (
      event.data.type === 'hsFormCallback' &&
      event.data.eventName === 'onFormSubmitted'
    ) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'hubspot_form_submit',
        hs_form_id: event.data.id,
        page_url: window.location.href,
        page_title: document.title
      });
    }
  });
</script>` },
  { num: "04", title: "Configurer les variables GTM", content: `Dans Google Tag Manager, créez 3 variables de type "Variable de couche de données" (Data Layer Variable) :\n\n1. hs_form_id — Nom de la variable : hs_form_id\n2. page_url — Nom de la variable : page_url\n3. page_title — Nom de la variable : page_title\n\nCes variables récupèrent automatiquement les valeurs poussées dans le dataLayer par le script ci-dessus.` },
  { num: "05", title: "Créer le déclencheur GTM", content: `Créez un nouveau déclencheur dans GTM :\n\n- Type : Événement personnalisé\n- Nom de l'événement : hubspot_form_submit\n- Ce déclencheur se déclenche sur : Tous les événements personnalisés\n\nCe déclencheur se lancera à chaque soumission de formulaire HubSpot détectée par le listener.` },
  { num: "06", title: "Créer la balise GA4", content: `Créez une nouvelle balise dans GTM :\n\n- Type : Google Analytics : événement GA4\n- ID de mesure : votre ID GA4 (G-XXXXXXXXXX)\n- Nom de l'événement : hubspot_form_submit\n- Paramètres d'événement :\n  — form_id → {{hs_form_id}}\n  — page_location → {{page_url}}\n- Déclencheur : le déclencheur "hubspot_form_submit" créé à l'étape 5` },
  { num: "07", title: "Tester avec le mode aperçu", content: `Avant de publier :\n\n1. Cliquez sur "Aperçu" dans GTM\n2. Allez sur une page avec un formulaire HubSpot\n3. Soumettez le formulaire\n4. Dans le panneau de debug GTM, vérifiez que l'événement "hubspot_form_submit" apparaît\n5. Vérifiez que la balise GA4 se déclenche\n6. Dans GA4 > Temps réel, confirmez que l'événement remonte\n\nSi tout est OK, publiez votre container GTM.` },
  { num: "08", title: "Marquer comme conversion", content: `Dernière étape : transformez l'événement en conversion.\n\n1. GA4 → Admin → Événements\n2. Trouvez "hubspot_form_submit"\n3. Activez "Marquer comme conversion"\n\nVous pouvez maintenant :\n- Voir quelles pages génèrent le plus de leads\n- Optimiser vos campagnes Google Ads sur les vraies conversions\n- Attribuer correctement chaque lead à sa source` },
];

const relatedArticles = [
  { title: "Les 50 points à vérifier dans votre audit CRM", slug: "audit-crm-checklist", category: "CRM & HubSpot", color: "#4B5EFC" },
  { title: "Automatiser son reporting HubSpot", slug: "automatiser-reporting-hubspot", category: "Data", color: "#22C55E" },
  { title: "HubSpot vs Salesforce en 2026", slug: "hubspot-vs-salesforce-2026", category: "CRM & HubSpot", color: "#4B5EFC" },
];

export default function BlogPostPage() {
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState("01");

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, pct));

      // Find active step
      for (let i = steps.length - 1; i >= 0; i--) {
        const el = document.getElementById(`step-${steps[i].num}`);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveStep(steps[i].num);
          break;
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative pt-[100px] pb-16 overflow-x-hidden">
      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 h-[3px] bg-[#F2F2F2]">
        <div className="h-full bg-[#4B5EFC] transition-all duration-150" style={{ width: `${progress}%` }} />
      </div>

      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "2%", top: "15%", width: 300, height: 300, borderRadius: "50%", background: "#4B5EFC", opacity: 0.10, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ right: "3%", top: "45%", width: 280, height: 280, borderRadius: "50%", background: "#FF7A59", opacity: 0.08, filter: "blur(70px)" }} />
      <div className="hidden lg:block absolute pointer-events-none" style={{ left: "4%", top: "70%", width: 260, height: 260, borderRadius: "50%", background: "#22C55E", opacity: 0.08, filter: "blur(70px)" }} />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6">
        <div className="flex gap-10">
          {/* Sticky TOC — desktop */}
          <aside className="hidden lg:block w-[200px] shrink-0">
            <div className="sticky top-28">
              <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-4">Sommaire</p>
              <nav className="space-y-1">
                {steps.map((s) => (
                  <a key={s.num} href={`#step-${s.num}`}
                    className={"block text-[11px] py-1.5 pl-3 border-l-2 transition-all " +
                      (activeStep === s.num ? "border-[#4B5EFC] text-[#111] font-medium" : "border-transparent text-[#999] hover:text-[#666]")}>
                    {s.title}
                  </a>
                ))}
              </nav>
              {/* Share */}
              <div className="mt-8 pt-6 border-t border-[#F2F2F2]">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wider mb-3">Partager</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors cursor-pointer">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.04a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L5.25 9.068" /></svg>
                  </button>
                  <a href="https://twitter.com/intent/tweet" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/sharing/share-offsite/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg border border-[#F0F0F0] flex items-center justify-center text-[#CCC] hover:text-[#666] hover:border-[#DDD] transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Article content */}
          <div className="flex-1 min-w-0 max-w-[700px]">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-[12px] text-[#999]">
              <Link href="/" className="hover:text-[#111] transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#111] transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-[#666]">Tracker formulaires HubSpot</span>
            </nav>

            {/* Hero */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <Badge>CRM &amp; HubSpot</Badge>
                <span className="text-[11px] text-[#CCC]">10 min</span>
              </div>
              <h1 className="text-[28px] sm:text-[36px] font-semibold text-[#111] leading-[1.15] tracking-[-0.025em] mb-5">
                Tracker les soumissions de formulaire HubSpot dans Google Analytics via GTM
              </h1>
              <p className="text-[16px] text-[#666] leading-[1.7] mb-6">
                Guide pas à pas pour envoyer un événement GA4 à chaque soumission de formulaire HubSpot. Code, config GTM et vérification.
              </p>
              <div className="flex items-center gap-4 text-[12px] text-[#999]">
                <span>Par <strong className="text-[#111]">Ceres</strong></span>
                <span>20 mars 2026</span>
              </div>
            </header>

            {/* Steps */}
            <article>
              {steps.map((step, i) => (
                <section key={step.num} id={`step-${step.num}`} className="mb-8">
                  <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[22px] font-bold text-[#F0F0F0]">{step.num}</span>
                      <h2 className="text-[17px] font-semibold text-[#111]">{step.title}</h2>
                    </div>
                    {step.content.split("\n\n").map((p, pi) => (
                      <p key={pi} className="text-[13px] text-[#555] leading-[1.75] mb-3">
                        {p.split("\n").map((line, li) => (
                          <span key={li}>{line}{li < p.split("\n").length - 1 && <br />}</span>
                        ))}
                      </p>
                    ))}
                    {step.code && (
                      <div className="mt-4 rounded-lg bg-[#0D0D0D] p-5 overflow-x-auto border border-[#222]">
                        <pre className="text-[12px] text-[#A0A0A0] leading-[1.7] font-mono whitespace-pre-wrap">{step.code}</pre>
                      </div>
                    )}
                  </div>
                  {i < steps.length - 1 && <Connector />}
                </section>
              ))}
            </article>

            {/* Pro tip */}
            <section className="mb-8">
              <div className="rounded-lg bg-[#111] p-5 md:p-8">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-[12px] font-medium text-white/60 mb-4">Aller plus loin</span>
                <h2 className="text-[17px] font-semibold text-white mb-3">Avec Ceres, on va plus loin</h2>
                <div className="space-y-2.5">
                  {["Attribution multi-touch complète reliée à HubSpot", "Agents IA (Claude) qui qualifient chaque soumission en temps réel", "Chaque lead tracé de la première visite au closing"].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-[12px] text-white/50">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5 text-[#22C55E]"><path d="M13.3 4.3L6 11.6L2.7 8.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Related */}
            <section className="mb-8">
              <div className="rounded-lg border border-[#EAEAEA] bg-white p-5 md:p-7 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                <h2 className="text-[14px] font-semibold text-[#111] mb-4">Articles liés</h2>
                <div className="space-y-2">
                  {relatedArticles.map((a) => (
                    <Link key={a.slug} href={`/blog/${a.slug}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#FAFAFA] transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: a.color }} />
                        <span className="text-[13px] font-medium text-[#111] group-hover:text-[#444] transition-colors">{a.title}</span>
                      </div>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[#DDD] group-hover:text-[#999] group-hover:translate-x-0.5 transition-all"><path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section>
              <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-6 md:p-10 text-center">
                <h2 className="text-[20px] sm:text-[24px] font-semibold text-[#111] tracking-[-0.02em] mb-3">Besoin d&apos;aide avec votre tracking ?</h2>
                <p className="text-[13px] text-[#999] mb-6 max-w-[380px] mx-auto">On configure votre tracking, votre attribution et vos conversions en 1 semaine.</p>
                <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#111] text-white text-[13px] font-medium hover:bg-[#222] transition-colors">
                  <span className="w-2 h-2 rounded-sm bg-[#22C55E]" />Réserver un appel
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
