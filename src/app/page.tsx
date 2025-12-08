import { AboutSection } from "@/components/home/about-section";
import { CTASection } from "@/components/home/cta-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { TeamSection } from "@/components/home/team-section";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-transparent">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TeamSection />
      <CTASection />
    </main>
  );
}
