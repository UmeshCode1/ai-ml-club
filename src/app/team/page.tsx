import { getMembers } from "@/lib/database";
import { Metadata } from "next";
import TeamPageClient from "./TeamPageClient";
import { AppCommunity } from "@/components/app/app-community";
import { SeoOnly, AppOnly } from "@/components/layout/dual-view";
import { ClientMember } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Our Team - AIML Club Leaders & Members",
    description: "Meet the talented team behind AIML Club OCT. Our council members, technical leads, and passionate student innovators driving AI & Machine Learning at Oriental College of Technology, Bhopal.",
    keywords: [
        "AIML Club Team",
        "AIML Club OCT Members",
        "AI Club Leaders Bhopal",
        "Oriental College Tech Team",
        "Student AI Leaders India",
        "AIML Club Council",
        "Tech Leaders OCT Bhopal"
    ],
    openGraph: {
        title: "Meet the AIML Club Team - OCT Bhopal",
        description: "Meet our passionate team of AI & ML enthusiasts at Oriental College of Technology, Bhopal.",
        type: "website",
    },
};

// Server Component - fetches data on the server
export default async function TeamPage() {
    // Fetch members from Appwrite on the server
    let members: ClientMember[] = [];
    try {
        const dbMembers = await getMembers();
        members = dbMembers.map(m => ({
            $id: m.$id || `temp-${Math.random()}`,
            name: m.name,
            role: m.role,
            team: m.team || "",
            email: m.email || "",
            enrollmentNo: m.enrollmentNo,
            contactNo: m.contactNo,
            linkedin: m.linkedin,
            github: m.github,
            imageUrl: m.imageUrl,
            year: m.year,
            status: m.status,
        }));
    } catch (error) {
        console.error("Failed to fetch members from Appwrite:", error);
        // Fallback to static data if Appwrite fails
        const { TEAM_DATA } = await import("@/lib/data");
        members = TEAM_DATA.map(m => ({
            $id: m.id || `mock-${Math.random()}`,
            name: m.name,
            role: m.role,
            team: m.team || "",
            email: m.email || "",
            enrollmentNo: m.enrollmentNo,
            contactNo: m.contactNo,
            linkedin: m.linkedin,
            github: m.github,
            imageUrl: m.image,
        }));
    }

    // Generate JSON-LD structured data for team members
    const teamJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "AIML Club - AI & Machine Learning Club OCT",
        "url": "https://aimlclub.tech",
        "logo": "https://aimlclub.tech/aiml-club-logo-new.png",
        "description": "Student-driven AI & Machine Learning Club at Oriental College of Technology, Bhopal",
        "member": members.slice(0, 30).map(member => ({
            "@type": "Person",
            "name": member.name,
            "jobTitle": member.role,
            "worksFor": {
                "@type": "Organization",
                "name": "AIML Club OCT"
            },
            ...(member.linkedin && { "sameAs": member.linkedin }),
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
            />

            <AppOnly>
                <AppCommunity members={members} />
            </AppOnly>

            <SeoOnly>
                <TeamPageClient members={members} />
            </SeoOnly>
        </>
    );
}
