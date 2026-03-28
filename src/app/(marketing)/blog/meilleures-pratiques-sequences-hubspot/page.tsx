"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Badge from "@/components/marketing/Badge";
import Connector from "@/components/marketing/Connector";

const ARTICLE_COLOR = "#4B5EFC";

const sections = [
  { id: "sequences-vs-workflows", title: "Sequences vs Workflows" },
  { id: "anatomie-sequence", title: "Anatomie d&apos;une sequence" },
  { id: "timing-ideal", title: "Le timing ideal" },
  { id: "personnalisation", title: "La personnalisation" },
  { id: "ab-testing", title: "A/B tester ses sequences" },
  { id: "templates-sequences", title: "5 templates qui marchent" },
  { id: "mesurer-performance", title: "Mesurer la performance" },
  { id: "erreurs-sequences", title: "Les erreurs a eviter" },
  { id: "automatiser-suivi", title: "Automatiser le suivi" },
];

const relatedArticles = [
  {
    title: "Pipeline HubSpot : structurer ses deals pour mieux convertir",
    href: "/blog/pipeline-hubspot-structurer-deals",
    category: "CRM & HubSpot",
    readTime: "8 min",
  },
  {
    title: "Scoring de leads HubSpot : methodes et bonnes pratiques",
    href: "/blog/scoring-leads-hubspot",
    category: "CRM & HubSpot",
    readTime: "12 min",
  },
  {
    title: "Automatisation marketing : workflows HubSpot avances",
    href: "/blog/automatisation-workflows-hubspot",
    category: "Automatisation",
    readTime: "9 min",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Sequences HubSpot : les meilleures pratiques",
  description:
    "Guide complet pour structurer, optimiser et automatiser vos sequences de prospection dans HubSpot. Timing, personnalisation, A/B testing et templates concrets.",
  author: {
    "@type": "Person",
    name: "Guillaume Delachet",
  },
  publisher: {
    "@type": "Organization",
    name: "Ceres RevOps",
    logo: {
      "@type": "ImageObject",
      url: "https://www.ceres-revops.com/logo.png",
    },
  },
  datePublished: "2026-02-25",
  dateModified: "2026-02-25",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      "https://www.ceres-revops.com/blog/meilleures-pratiques-sequences-hubspot",
  },
  articleSection: "CRM & HubSpot",
  wordCount: 2200,
  inLanguage: "fr",
};

export default function SequencesHubSpotArticle() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const el = articleRef.current;
      const top = el.offsetTop;
      const height = el.scrollHeight;
      const scrollY = window.scrollY - top;
      const windowH = window.innerHeight;
      const pct = Math.min(
        100,
        Math.max(0, (scrollY / (height - windowH)) * 100)
      );
      setProgress(pct);

      const sectionEls = sections
        .map((s) => document.getElementById(s.id))
        .filter(Boolean);
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const rect = sectionEls[i]!.getBoundingClientRect();
        if (rect.top <= 150) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  };

  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent("Sequences HubSpot : les meilleures pratiques")}`,
      "_blank"
    );
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200/30">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{ width: `${progress}%`, backgroundColor: ARTICLE_COLOR }}
        />
      </div>

      {/* Blobs decoratifs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-[0.04] blur-3xl"
          style={{ backgroundColor: ARTICLE_COLOR }}
        />
        <div
          className="absolute top-1/3 -left-48 w-80 h-80 rounded-full opacity-[0.03] blur-3xl"
          style={{ backgroundColor: ARTICLE_COLOR }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full opacity-[0.03] blur-3xl"
          style={{ backgroundColor: ARTICLE_COLOR }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <Link
            href="/blog"
            className="hover:text-gray-900 transition-colors"
          >
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">
            Sequences HubSpot : les meilleures pratiques
          </span>
        </nav>

        <div className="flex gap-12">
          {/* Sticky sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Sommaire
              </p>
              <nav className="flex flex-col gap-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`text-sm py-1.5 px-3 rounded-lg transition-all duration-200 border-l-2 ${
                      activeSection === s.id
                        ? "font-semibold text-white border-transparent"
                        : "text-gray-500 hover:text-gray-900 border-transparent hover:border-gray-300"
                    }`}
                    style={
                      activeSection === s.id
                        ? { backgroundColor: ARTICLE_COLOR, borderColor: ARTICLE_COLOR }
                        : {}
                    }
                  >
                    {s.title}
                  </a>
                ))}
              </nav>

              {/* Share buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Partager
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleShareLinkedIn}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Partager sur LinkedIn"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button
                    onClick={handleShareTwitter}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Partager sur Twitter"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Copier le lien"
                  >
                    {copied ? (
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <article ref={articleRef} className="flex-1 min-w-0 max-w-3xl">
            {/* Header */}
            <header className="mb-12">
              <Badge>CRM &amp; HubSpot</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-4 mb-6 leading-tight">
                Sequences HubSpot : les meilleures pratiques
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Comment structurer, personnaliser et optimiser vos sequences de prospection
                pour maximiser vos taux de reponse. Guide complet avec templates et benchmarks
                issus de nos accompagnements clients.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: ARTICLE_COLOR }}
                  >
                    GD
                  </div>
                  <span className="font-medium text-gray-900">Guillaume Delachet</span>
                </div>
                <span>25 fevrier 2026</span>
                <span>10 min de lecture</span>
              </div>
            </header>

            <Connector />

            {/* Section 1 */}
            <section id="sequences-vs-workflows" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                1. Sequences vs Workflows : quelle difference ?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                La confusion entre Sequences et Workflows est l&apos;une des erreurs les plus frequentes
                que nous rencontrons chez nos clients. Pourtant, ces deux outils repondent a des logiques
                radicalement differentes, et les utiliser a mauvais escient peut nuire a votre prospection.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Les <strong>Sequences</strong> sont concues pour la prospection one-to-one. Elles permettent
                a un commercial d&apos;envoyer une serie d&apos;emails personnalises depuis sa propre boite mail,
                avec des relances automatiques qui s&apos;arretent des qu&apos;un prospect repond. Les <strong>Workflows</strong>,
                en revanche, sont des automatisations marketing orientees nurturing, capables de gerer des milliers
                de contacts simultanement via des emails marketing.
              </p>

              {/* Comparison table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse rounded-lg overflow-hidden">
                  <thead>
                    <tr style={{ backgroundColor: ARTICLE_COLOR }}>
                      <th className="text-left text-white text-sm font-semibold px-4 py-3">Critere</th>
                      <th className="text-left text-white text-sm font-semibold px-4 py-3">Sequences</th>
                      <th className="text-left text-white text-sm font-semibold px-4 py-3">Workflows</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium bg-gray-50">Usage principal</td>
                      <td className="px-4 py-3">Prospection commerciale</td>
                      <td className="px-4 py-3">Nurturing marketing</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium bg-gray-50">Email envoye depuis</td>
                      <td className="px-4 py-3">Boite mail du commercial</td>
                      <td className="px-4 py-3">Adresse marketing generique</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium bg-gray-50">Arret automatique</td>
                      <td className="px-4 py-3">Oui, des la reponse</td>
                      <td className="px-4 py-3">Non (sauf criteres manuels)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium bg-gray-50">Volume</td>
                      <td className="px-4 py-3">Dizaines de contacts</td>
                      <td className="px-4 py-3">Milliers de contacts</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium bg-gray-50">Personnalisation</td>
                      <td className="px-4 py-3">Tres elevee (tokens + manuel)</td>
                      <td className="px-4 py-3">Moyenne (tokens uniquement)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed">
                La regle d&apos;or : utilisez les Sequences pour tout ce qui ressemble a une conversation commerciale
                directe, et les Workflows pour l&apos;education de vos leads a grande echelle. Chez un de nos clients
                dans le SaaS B2B, cette distinction a permis d&apos;augmenter les taux de reponse de 34% en seulement
                deux mois.
              </p>
            </section>

            <Connector />

            {/* Section 2 */}
            <section id="anatomie-sequence" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                2. Anatomie d&apos;une sequence performante
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Une sequence performante ne se limite pas a empiler des emails. Elle suit une structure pensee
                pour capter l&apos;attention, apporter de la valeur et provoquer l&apos;action. Voici les composants
                essentiels que nous recommandons a chaque client Ceres.
              </p>

              {/* Bubble cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    step: "Etape 1",
                    title: "Email d&apos;accroche",
                    desc: "Court, personnalise, centree sur un pain point precis du prospect. Pas de pitch produit.",
                  },
                  {
                    step: "Etape 2",
                    title: "Relance avec valeur",
                    desc: "Partage d&apos;une ressource (etude de cas, article, benchmark) en lien avec le pain point identifie.",
                  },
                  {
                    step: "Etape 3",
                    title: "Approche multi-canal",
                    desc: "Tache LinkedIn (demande de connexion ou commentaire sur un post) pour diversifier les points de contact.",
                  },
                  {
                    step: "Etape 4",
                    title: "Email de preuve sociale",
                    desc: "Resultats concrets obtenus avec un client similaire. Chiffres, metriques, temoignage.",
                  },
                  {
                    step: "Etape 5",
                    title: "Relance douce",
                    desc: "Message court et direct. Question ouverte pour faciliter la reponse.",
                  },
                  {
                    step: "Etape 6",
                    title: "Email de cloture",
                    desc: "Derniere tentative avec un angle different. Permission de clore la conversation.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow"
                  >
                    <span
                      className="inline-block text-xs font-bold text-white px-2.5 py-1 rounded-full mb-3"
                      style={{ backgroundColor: ARTICLE_COLOR }}
                    >
                      {item.step}
                    </span>
                    <h3
                      className="font-semibold text-gray-900 mb-2"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p
                      className="text-sm text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                  </div>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">
                L&apos;objectif n&apos;est pas d&apos;etre exhaustif des le premier email. Chaque etape doit apporter
                un nouvel element : une information, une preuve, un angle different. Le prospect doit sentir que
                vous avez fait l&apos;effort de comprendre son contexte, pas que vous deroulez un script generique.
              </p>
            </section>

            <Connector />

            {/* Section 3 */}
            <section id="timing-ideal" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                3. Le timing ideal : jours, heures et delais entre etapes
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Le timing est le facteur invisible qui peut doubler ou diviser par deux vos taux d&apos;ouverture.
                Apres avoir analyse plus de 15 000 emails envoyes via les sequences de nos clients, voici les
                patterns qui ressortent systematiquement.
              </p>

              {/* Metrics cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {[
                  { metric: "Mardi", label: "Meilleur jour d&apos;envoi", sub: "Taux d&apos;ouverture +18%" },
                  { metric: "9h-10h", label: "Creneau optimal", sub: "Heure locale du prospect" },
                  { metric: "3 jours", label: "Delai ideal 1ere relance", sub: "Entre etape 1 et 2" },
                  { metric: "5-7 jours", label: "Delai relances suivantes", sub: "Eviter la fatigue" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg border border-gray-200 bg-white text-center"
                  >
                    <p
                      className="text-2xl font-bold mb-1"
                      style={{ color: ARTICLE_COLOR }}
                    >
                      {item.metric}
                    </p>
                    <p
                      className="text-xs font-medium text-gray-900 mb-1"
                      dangerouslySetInnerHTML={{ __html: item.label }}
                    />
                    <p
                      className="text-xs text-gray-500"
                      dangerouslySetInnerHTML={{ __html: item.sub }}
                    />
                  </div>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Nos donnees montrent clairement que le mardi et le jeudi sont les jours ou les taux d&apos;ouverture
                sont les plus eleves en B2B. Le lundi est souvent encombre, et le vendredi voit une chute notable
                de l&apos;engagement. Pour les creneaux horaires, le debut de matinee (9h-10h) et la fin d&apos;apres-midi
                (16h-17h) surpassent systematiquement les autres plages.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Pour les delais entre etapes, la regle est progressive : 3 jours entre le premier et le deuxieme
                email, puis 5 jours, puis 7 jours. Cette acceleration donne de l&apos;espace au prospect tout en
                maintenant la pression commerciale. Une erreur courante est de relancer trop vite (24-48h),
                ce qui donne une impression d&apos;insistance plutot que de professionnalisme.
              </p>

              {/* Dark section */}
              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <h3 className="font-semibold text-lg mb-3">
                  Conseil Ceres : la regle du fuseau horaire
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Si vous prospectez a l&apos;international, configurez vos sequences pour envoyer en fonction
                  du fuseau horaire du prospect, pas du votre. HubSpot ne le fait pas nativement pour les
                  Sequences (contrairement aux Workflows). La solution : segmentez vos listes par region
                  et creez des sequences dedies avec des heures d&apos;envoi adaptees. Un de nos clients
                  a vu ses taux d&apos;ouverture passer de 22% a 38% simplement en appliquant cette methode.
                </p>
              </div>
            </section>

            <Connector />

            {/* Section 4 */}
            <section id="personnalisation" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                4. La personnalisation qui fait la difference
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                La personnalisation ne se limite pas a inserer le prenom du prospect dans l&apos;objet de l&apos;email.
                Les sequences les plus performantes que nous avons deployees integrent trois niveaux de
                personnalisation distincts.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    level: "Niveau 1 : Tokens HubSpot",
                    desc: "Prenom, nom de l&apos;entreprise, secteur, poste. Le minimum vital. Taux d&apos;ouverture moyen : +12% par rapport a un email generique.",
                  },
                  {
                    level: "Niveau 2 : Contexte business",
                    desc: "Reference a une actualite de l&apos;entreprise (levee de fonds, recrutement, lancement produit). Necessite un travail de recherche en amont. Taux de reponse : +28%.",
                  },
                  {
                    level: "Niveau 3 : Insight personnalise",
                    desc: "Observation specifique sur un challenge business, basee sur l&apos;analyse de leur site, leur LinkedIn ou leur marche. Taux de reponse : +45% par rapport au niveau 1.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 rounded-lg border border-gray-200 bg-white"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: ARTICLE_COLOR }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-gray-900 mb-1"
                        dangerouslySetInnerHTML={{ __html: item.level }}
                      />
                      <p
                        className="text-sm text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.desc }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Chez Ceres, nous recommandons de viser au minimum le niveau 2 pour les comptes strategiques.
                Le niveau 3 est reserve aux cibles a fort potentiel ou le retour sur investissement justifie
                le temps de recherche supplementaire. Pour un client dans le conseil RH, cette approche a
                permis d&apos;obtenir un taux de reponse de 31% sur une sequence de 6 etapes, contre 8% avec
                une approche uniquement basee sur les tokens.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Un point crucial : la personnalisation doit etre credible. Un prospect detecte immediatement
                un email qui pretend etre personnalise mais qui ne l&apos;est pas. Mieux vaut un email court et
                authentique qu&apos;un long message truffee de fausse personnalisation.
              </p>
            </section>

            <Connector />

            {/* Section 5 */}
            <section id="ab-testing" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                5. A/B tester ses sequences : sujet, contenu, CTA
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                L&apos;A/B testing sur les sequences est souvent neglige car HubSpot ne propose pas de fonctionnalite
                native d&apos;A/B test pour les Sequences (contrairement aux emails marketing). Pourtant, c&apos;est
                l&apos;un des leviers les plus puissants pour ameliorer vos performances de prospection.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Methode : le test par cohorte
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                La technique que nous utilisons chez Ceres consiste a creer deux versions de la meme
                sequence, avec une seule variable modifiee. On inscrit 50% des prospects dans la version A
                et 50% dans la version B, puis on compare les resultats apres un volume statistiquement
                significatif (minimum 50 contacts par version).
              </p>

              {/* Comparison table */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
                  <thead>
                    <tr style={{ backgroundColor: ARTICLE_COLOR }}>
                      <th className="text-left text-white font-semibold px-4 py-3">Variable testee</th>
                      <th className="text-left text-white font-semibold px-4 py-3">Impact observe</th>
                      <th className="text-left text-white font-semibold px-4 py-3">Priorite</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium bg-gray-50">Objet de l&apos;email</td>
                      <td className="px-4 py-3">+15% a +40% sur le taux d&apos;ouverture</td>
                      <td className="px-4 py-3"><span className="text-xs font-bold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: "#22c55e" }}>Haute</span></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium bg-gray-50">Longueur de l&apos;email</td>
                      <td className="px-4 py-3">+10% a +25% sur le taux de reponse</td>
                      <td className="px-4 py-3"><span className="text-xs font-bold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: "#22c55e" }}>Haute</span></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium bg-gray-50">CTA (question vs lien)</td>
                      <td className="px-4 py-3">+5% a +15% sur le taux de reponse</td>
                      <td className="px-4 py-3"><span className="text-xs font-bold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: "#f59e0b" }}>Moyenne</span></td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-3 font-medium bg-gray-50">Nombre d&apos;etapes</td>
                      <td className="px-4 py-3">Variable selon le secteur</td>
                      <td className="px-4 py-3"><span className="text-xs font-bold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: "#f59e0b" }}>Moyenne</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium bg-gray-50">Ton (formel vs decontracte)</td>
                      <td className="px-4 py-3">+5% a +20% selon la cible</td>
                      <td className="px-4 py-3"><span className="text-xs font-bold text-white px-2 py-0.5 rounded-full" style={{ backgroundColor: "#ef4444" }}>A tester</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Resultat concret : un client Ceres dans l&apos;edition logicielle a teste deux objets d&apos;email
                sur sa premiere etape. La version A (&quot;Question rapide sur votre processus de recrutement&quot;)
                a obtenu 42% d&apos;ouverture, contre 28% pour la version B (&quot;[Nom entreprise] - optimisation
                recrutement&quot;). Sur 200 contacts, cette difference a genere 14 conversations supplementaires.
              </p>
            </section>

            <Connector />

            {/* Section 6 */}
            <section id="templates-sequences" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                6. Les 5 templates de sequences qui marchent
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Voici les cinq modeles de sequences que nous deployons le plus frequemment chez nos clients,
                avec leurs taux de performance moyens. Chaque template a ete affine au fil de dizaines
                d&apos;iterations.
              </p>

              <div className="space-y-6 mb-6">
                {[
                  {
                    name: "La sequence \"Probleme-Solution\"",
                    steps: "5 etapes | 14 jours",
                    desc: "Identifie un probleme precis du prospect, apporte une preuve sociale, propose une solution. Ideale pour les cycles de vente courts (PME, SaaS).",
                    rate: "Taux de reponse moyen : 18%",
                  },
                  {
                    name: "La sequence \"Contenu-Expert\"",
                    steps: "6 etapes | 21 jours",
                    desc: "Partage progressivement du contenu a forte valeur (etudes, benchmarks, analyses). Positionne le commercial comme expert du sujet. Ideale pour les cycles longs (enterprise, conseil).",
                    rate: "Taux de reponse moyen : 14%",
                  },
                  {
                    name: "La sequence \"Evenement-Trigger\"",
                    steps: "4 etapes | 10 jours",
                    desc: "Declenchee par un evenement (levee de fonds, recrutement, changement de poste). Capitalise sur l&apos;actualite du prospect pour maximiser la pertinence.",
                    rate: "Taux de reponse moyen : 24%",
                  },
                  {
                    name: "La sequence \"Re-engagement\"",
                    steps: "3 etapes | 7 jours",
                    desc: "Cible les prospects deja contactes mais non convertis (3 a 6 mois apres). Nouvel angle, nouvelle offre ou nouveau resultat client.",
                    rate: "Taux de reponse moyen : 11%",
                  },
                  {
                    name: "La sequence \"Multi-canal\"",
                    steps: "7 etapes | 25 jours",
                    desc: "Combine emails, taches LinkedIn et appels telephoniques. La plus complexe mais la plus efficace sur les comptes strategiques.",
                    rate: "Taux de reponse moyen : 27%",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3
                        className="font-semibold text-gray-900 text-lg"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                      <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {item.steps}
                      </span>
                    </div>
                    <p
                      className="text-sm text-gray-600 leading-relaxed mb-3"
                      dangerouslySetInnerHTML={{ __html: item.desc }}
                    />
                    <p
                      className="text-sm font-semibold"
                      style={{ color: ARTICLE_COLOR }}
                      dangerouslySetInnerHTML={{ __html: item.rate }}
                    />
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <h3 className="font-semibold text-lg mb-3">
                  Exemple reel : client Ceres dans la cybersecurite
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  En combinant la sequence &quot;Evenement-Trigger&quot; (declenchee par des alertes de
                  vulnerabilites publiees) avec une personnalisation de niveau 3, notre client a obtenu
                  un taux de reponse de 32% sur 180 prospects DSI/RSSI. 12 rendez-vous qualifies ont ete
                  generes en 6 semaines, dont 4 se sont transformes en opportunites pour un total de
                  240 000 euros de pipeline.
                </p>
              </div>
            </section>

            <Connector />

            {/* Section 7 */}
            <section id="mesurer-performance" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                7. Mesurer la performance : KPI et benchmarks
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Sans metriques claires, il est impossible d&apos;ameliorer vos sequences. Voici les indicateurs
                que nous suivons systematiquement pour chaque client, avec les benchmarks B2B que nous avons
                etablis sur notre base de donnees.
              </p>

              {/* KPI cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { kpi: "Taux d&apos;ouverture", benchmark: "45-60%", good: "> 50%", bad: "< 30%" },
                  { kpi: "Taux de reponse", benchmark: "12-20%", good: "> 15%", bad: "< 8%" },
                  { kpi: "Taux de meeting", benchmark: "5-10%", good: "> 7%", bad: "< 3%" },
                  { kpi: "Taux de desabonnement", benchmark: "< 3%", good: "< 2%", bad: "> 5%" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-lg border border-gray-200 bg-white"
                  >
                    <p
                      className="text-sm font-medium text-gray-500 mb-2"
                      dangerouslySetInnerHTML={{ __html: item.kpi }}
                    />
                    <p
                      className="text-3xl font-bold mb-3"
                      style={{ color: ARTICLE_COLOR }}
                      dangerouslySetInnerHTML={{ __html: item.benchmark }}
                    />
                    <div className="flex gap-4 text-xs">
                      <span className="text-green-600">
                        Bon : <span dangerouslySetInnerHTML={{ __html: item.good }} />
                      </span>
                      <span className="text-red-500">
                        Alerte : <span dangerouslySetInnerHTML={{ __html: item.bad }} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Au-dela de ces metriques de base, nous recommandons de suivre deux indicateurs avances :
                le <strong>taux de reponse par etape</strong> (pour identifier a quel moment de la sequence
                les prospects decrochent) et le <strong>taux de conversion sequence-vers-pipeline</strong>
                (pour mesurer la qualite reelle des rendez-vous generes).
              </p>
              <p className="text-gray-700 leading-relaxed">
                Un point important : ne jugez pas une sequence uniquement sur son taux de reponse.
                Un taux de reponse eleve avec des reponses negatives n&apos;a aucune valeur. Chez Ceres,
                nous categorisons les reponses en trois types : positives (interet confirme), neutres
                (demande d&apos;info) et negatives (refus). Seules les reponses positives et neutres comptent
                dans le calcul de la performance.
              </p>
            </section>

            <Connector />

            {/* Section 8 */}
            <section id="erreurs-sequences" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                8. Les erreurs qui tuent vos sequences
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Apres avoir audite plus de 200 sequences HubSpot chez nos clients, voici les erreurs
                les plus frequentes et les plus couteuses que nous rencontrons.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    error: "Envoyer trop tot, trop souvent",
                    impact: "Taux de desabonnement x3",
                    fix: "Respectez un delai minimum de 3 jours entre chaque etape. Limitez vos sequences a 6-7 etapes maximum.",
                  },
                  {
                    error: "Ignorer la delivrabilite",
                    impact: "Taux d&apos;ouverture en chute libre",
                    fix: "Chauffez vos adresses email progressivement. Limitez les envois a 40-50 emails/jour par boite. Evitez les mots spam dans vos objets.",
                  },
                  {
                    error: "Le syndrome du pitch des le premier email",
                    impact: "Taux de reponse < 5%",
                    fix: "Le premier email doit poser une question ou identifier un probleme. Le pitch vient apres, quand le prospect a montre un interet.",
                  },
                  {
                    error: "Ne pas segmenter ses listes",
                    impact: "Personnalisation impossible",
                    fix: "Creez des sequences differentes par persona, secteur et taille d&apos;entreprise. Une sequence generique ne performera jamais autant qu&apos;une sequence ciblee.",
                  },
                  {
                    error: "Oublier le multi-canal",
                    impact: "Points de contact insuffisants",
                    fix: "Integrez des taches LinkedIn et des appels dans vos sequences. Les prospects qui vous voient sur plusieurs canaux sont 3x plus susceptibles de repondre.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-lg border border-red-100 bg-red-50/50"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.error}</h3>
                        <p
                          className="text-xs text-red-600 font-medium mb-2"
                          dangerouslySetInnerHTML={{ __html: `Impact : ${item.impact}` }}
                        />
                        <p
                          className="text-sm text-gray-600 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: `Solution : ${item.fix}` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">
                L&apos;erreur la plus subtile reste le manque de suivi post-sequence. Trop de commerciaux
                considerent qu&apos;un prospect qui n&apos;a pas repondu a 6 emails est perdu. En realite,
                30% des conversions dans nos donnees proviennent de prospects recontactes 3 a 6 mois
                apres la premiere sequence.
              </p>
            </section>

            <Connector />

            {/* Section 9 */}
            <section id="automatiser-suivi" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                9. Automatiser le suivi post-sequence
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                La fin d&apos;une sequence ne devrait jamais signifier la fin de la relation avec un prospect.
                C&apos;est ici que la combinaison intelligente entre Sequences et Workflows prend tout son sens.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Voici le processus que nous mettons en place chez chaque client Ceres pour maximiser
                la valeur de chaque prospect contacte :
              </p>

              <div className="space-y-4 mb-8">
                {[
                  {
                    action: "Categorisation automatique",
                    desc: "A la fin de la sequence, le commercial categorise le prospect : interesse, a recontacter plus tard, non pertinent. Cette donnee est stockee dans une propriete HubSpot dediee.",
                  },
                  {
                    action: "Workflow de nurturing",
                    desc: "Les prospects \"a recontacter\" sont automatiquement inscrits dans un workflow de nurturing qui leur envoie du contenu pertinent (newsletter, etudes de cas) pendant 3 a 6 mois.",
                  },
                  {
                    action: "Re-inscription automatique",
                    desc: "Un workflow detecte les signaux d&apos;engagement (ouverture d&apos;email, visite du site, telechargement) et alerte le commercial pour relancer avec une nouvelle sequence.",
                  },
                  {
                    action: "Reporting consolide",
                    desc: "Un tableau de bord regroupe les performances de toutes les sequences par commercial, par segment et par periode. Les insights alimentent l&apos;amelioration continue.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 rounded-lg border border-gray-200 bg-white"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: ARTICLE_COLOR }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.action}</h3>
                      <p
                        className="text-sm text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.desc }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <h3 className="font-semibold text-lg mb-3">
                  Resultat client : +62% de pipeline en 4 mois
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Un de nos clients dans le conseil en transformation digitale a mis en place ce systeme
                  complet : sequences structurees, A/B testing systematique et suivi post-sequence automatise.
                  En 4 mois, le pipeline genere par la prospection outbound est passe de 180 000 euros a
                  292 000 euros, soit une augmentation de 62%. Le nombre de rendez-vous qualifies a progresse
                  de 8 a 19 par mois, avec un taux de conversion en opportunite de 42%.
                </p>
              </div>
            </section>

            <Connector />

            {/* CTA */}
            <section className="mb-16">
              <div
                className="rounded-lg p-8 sm:p-12 text-center text-white"
                style={{ backgroundColor: ARTICLE_COLOR }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Optimisez vos sequences HubSpot avec Ceres
                </h2>
                <p className="text-white/80 max-w-xl mx-auto mb-6 leading-relaxed">
                  Nous auditons vos sequences existantes, identifions les axes d&apos;amelioration
                  et deployons les meilleures pratiques pour maximiser vos taux de reponse
                  et votre pipeline commercial.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                  style={{ color: ARTICLE_COLOR }}
                >
                  Demander un audit gratuit
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </Link>
              </div>
            </section>

            {/* Related articles */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Articles associes
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedArticles.map((article, i) => (
                  <Link
                    key={i}
                    href={article.href}
                    className="group p-5 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all"
                  >
                    <span
                      className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3"
                      style={{
                        backgroundColor: `${ARTICLE_COLOR}15`,
                        color: ARTICLE_COLOR,
                      }}
                    >
                      {article.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#4B5EFC] transition-colors text-sm leading-snug mb-2">
                      {article.title}
                    </h3>
                    <span className="text-xs text-gray-500">{article.readTime} de lecture</span>
                  </Link>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
