import { AboutSection } from "@/components/home/about-section";
import { QuickActions } from "@/components/home/quick-actions";
import { SeoContentSection } from "@/components/home/seo-content-section";
import { ClubActivitiesSection } from "@/components/home/club-activities-section";
import { CTASection } from "@/components/home/cta-section";
import { FeaturesSection } from "@/components/home/features-section";
import { HeroSection } from "@/components/home/hero-section";
import { ImpactStatsSection } from "@/components/home/impact-stats-section";
import { TeamSection } from "@/components/home/team-section";
import { getMembers, getUpcomingEvents } from "@/lib/database";
import { unstable_noStore as noStore } from "next/cache";
import { AppHome } from "@/components/app/app-home";
import { SeoOnly, AppOnly } from "@/components/layout/dual-view";

// Force dynamic rendering - fetch fresh data on each request
export const dynamic = 'force-dynamic';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Machine Learning Club | Oriental College of Technology, Bhopal",
  description: "The official technical community of Oriental College of Technology (OCT), Bhopal. We foster student innovation through workshops, hackathons, and open-source AI projects. Join the premier tech club of Central India.",
  alternates: {
    canonical: "https://aimlclub.tech",
  },
};

export default async function Home() {
  // Disable caching
  noStore();

  // Fetch all members from Appwrite
  const allMembers = await getMembers();
  const upcomingEvents = await getUpcomingEvents();
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : undefined;

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
      <AppOnly>
        <AppHome nextEvent={nextEvent} />
      </AppOnly>

      <SeoOnly>
        <HeroSection />
        <QuickActions />
        <SeoContentSection />
        <AboutSection />
        <ImpactStatsSection />
        <FeaturesSection />
        <ClubActivitiesSection />
        <TeamSection members={teamMembers} autoSlideInterval={1000} />
        <CTASection />
      </SeoOnly>
    </main>
  );
}
