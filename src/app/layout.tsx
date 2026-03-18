import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kairo",
  description:
    "Your AI RevOps assistant. Pipeline intelligence, forecasting, deal scoring, and CRM automation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
