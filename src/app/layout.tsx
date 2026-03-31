import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Kairo — AI RevOps Assistant",
    template: "%s | Kairo",
  },
  description: "Your AI-powered RevOps assistant. Analyze your pipeline, coach your reps, and optimize your operations.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
