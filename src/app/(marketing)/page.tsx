import Hero from "@/components/marketing/Hero";
import LogoCloud from "@/components/marketing/LogoCloud";
import Features from "@/components/marketing/Features";
import Services from "@/components/marketing/Services";
import HowItWorks from "@/components/marketing/HowItWorks";
import Testimonials from "@/components/marketing/Testimonials";
import Stats from "@/components/marketing/Stats";
import ForWho from "@/components/marketing/ForWho";
import Team from "@/components/marketing/Team";
import FAQ from "@/components/marketing/FAQ";
import CTA from "@/components/marketing/CTA";

const blobs = [
  { x: "2%", y: "12%", w: 320, h: 320, color: "#FF7A59", delay: 0 },
  { x: "80%", y: "10%", w: 300, h: 300, color: "#D4A27F", delay: 1 },
  { x: "85%", y: "28%", w: 340, h: 340, color: "#4B5EFC", delay: 2.5 },
  { x: "1%", y: "33%", w: 280, h: 280, color: "#6C5CE7", delay: 3.5 },
  { x: "78%", y: "46%", w: 320, h: 320, color: "#6D00CC", delay: 1.5 },
  { x: "4%", y: "52%", w: 300, h: 300, color: "#FF7A59", delay: 4 },
  { x: "82%", y: "60%", w: 320, h: 320, color: "#22C55E", delay: 0.5 },
  { x: "0%", y: "68%", w: 340, h: 340, color: "#4B5EFC", delay: 3 },
  { x: "80%", y: "76%", w: 300, h: 300, color: "#D4A27F", delay: 2 },
  { x: "3%", y: "86%", w: 280, h: 280, color: "#6C5CE7", delay: 4.5 },
];

export default function LandingPage() {
  return (
    <main className="relative overflow-x-hidden">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="hidden lg:block fixed pointer-events-none"
          style={{
            left: b.x,
            top: b.y,
            width: b.w,
            height: b.h,
            borderRadius: "50%",
            background: b.color,
            opacity: 0.15,
            filter: "blur(70px)",
            animation: `blobFloat 10s ${b.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      <Hero />
      <LogoCloud />
      <Features />
      <Services />
      <HowItWorks />
      <Testimonials />
      <Stats />
      <ForWho />
      <Team />
      <FAQ />
      <CTA />
    </main>
  );
}
