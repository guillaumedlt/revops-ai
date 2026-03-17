import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RevOps AI — Command Center",
  description:
    "Pilotez votre machine commerciale. Score d'adoption CRM, 87 métriques, agent IA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
