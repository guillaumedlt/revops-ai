import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ceres-revops.fr"),
  title: {
    default: "Ceres | Agence RevOps & IA — Accélérez votre croissance commerciale",
    template: "%s | Ceres",
  },
  description:
    "Ceres est l'agence RevOps & IA qui structure, automatise et optimise vos opérations commerciales. Audit HubSpot, automatisation des process, intelligence artificielle appliquée aux ventes. Basée en France.",
  keywords: [
    "agence RevOps",
    "agence RevOps France",
    "Revenue Operations",
    "consultant RevOps",
    "automatisation commerciale",
    "IA commerciale",
    "audit HubSpot",
    "intégration CRM",
    "optimisation pipeline",
    "forecasting ventes",
    "data quality CRM",
    "ops commerciales",
    "HubSpot partner",
    "intelligence artificielle B2B",
    "consultant HubSpot France",
  ],
  authors: [{ name: "Ceres" }],
  creator: "Ceres",
  publisher: "Ceres",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Ceres",
    title: "Ceres | Agence RevOps & IA — Accélérez votre croissance commerciale",
    description:
      "L'agence qui structure, automatise et optimise vos opérations commerciales grâce au RevOps et à l'intelligence artificielle.",
    url: "https://ceres-revops.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceres | Agence RevOps & IA",
    description:
      "Structurez, automatisez et optimisez vos opérations commerciales avec le RevOps et l'IA.",
  },
  alternates: {
    canonical: "https://ceres-revops.fr",
    languages: {
      "fr-FR": "https://ceres-revops.fr",
    },
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://ceres-revops.fr/#organization",
      name: "Ceres",
      url: "https://ceres-revops.fr",
      description:
        "Agence RevOps & IA spécialisée dans la structuration, l'automatisation et l'optimisation des opérations commerciales B2B en France.",
      foundingDate: "2024",
      areaServed: {
        "@type": "Country",
        name: "France",
      },
      serviceType: [
        "Audit CRM",
        "Revenue Operations",
        "Automatisation commerciale",
        "Intelligence Artificielle appliquée aux ventes",
        "Intégration HubSpot",
        "Optimisation pipeline commercial",
      ],
      knowsAbout: [
        "Revenue Operations",
        "Intelligence Artificielle",
        "CRM Automation",
        "HubSpot",
        "Sales Analytics",
        "Pipeline Management",
        "Data Quality",
        "Sales Forecasting",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://ceres-revops.fr/#website",
      url: "https://ceres-revops.fr",
      name: "Ceres — Agence RevOps & IA",
      publisher: { "@id": "https://ceres-revops.fr/#organization" },
      inLanguage: "fr-FR",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
