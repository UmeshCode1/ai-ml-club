import { AboutSection } from "@/components/home/about-section";
import { ClubActivitiesSection } from "@/components/home/club-activities-section";
import { CTASection } from "@/components/home/cta-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { ImpactStatsSection } from "@/components/home/impact-stats-section";
import { TeamSection } from "@/components/home/team-section";
import { SectionConnector } from "@/components/ui/section-connector";
import { getMembers, getHomeStats, getHomeFeatures, getHomeActivities } from "@/lib/database";
import { unstable_noStore as noStore } from "next/cache";

// Force dynamic rendering - fetch fresh data on each request
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Disable caching
  noStore();

  // Fetch all data from Appwrite
  const [allMembers, stats, features, activities] = await Promise.all([
    getMembers(),
    getHomeStats(),
    getHomeFeatures(),
    getHomeActivities()
  ]);

  // Get latest year (sorted descending)
  const years = [...new Set(allMembers.map(m => m.year).filter(Boolean))].sort().reverse();
  const latestYear = years[0] || "2025-26";

  // Get unique members for latest year (ALL members, not just leaders)
  const seen = new Set<string>();

  const teamMembers = allMembers
    .filter(m => {
      // Include if member is from latest year OR is active from any year
      const isLatestYear = m.year === latestYear;
      const isActive = m.status === "active";
      if (!isLatestYear && !isActive) return false;

      // Unique by name
      const key = m.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(m => ({
      name: m.name,
      role: m.role,
      image: m.imageUrl || "",
      linkedin: m.linkedin || "",
      github: m.github || "",
      instagram: m.instagram || "",
      email: m.email || "",
      team: m.team || "",
      enrollmentNo: m.enrollmentNo || "",
    }));

  return (
    <main className="flex flex-col min-h-screen bg-transparent">
      <HeroSection />
      <SectionConnector />
      <AboutSection />
      <ImpactStatsSection stats={stats} />
      <SectionConnector />
      <FeaturesSection features={features} />
      <SectionConnector />
      <ClubActivitiesSection activities={activities} />
      <TeamSection members={teamMembers} autoSlideInterval={4000} />
      <CTASection />
    </main>
  );
}
