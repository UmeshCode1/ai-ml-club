import { getMembers } from "@/lib/database";
import TeamPageClient from "./TeamPageClient";

// Server Component - fetches data on the server
export default async function TeamPage() {
    // Fetch members from Appwrite on the server
    let members = [];
    try {
        members = await getMembers();
    } catch (error) {
        console.error("Failed to fetch members from Appwrite:", error);
        // Fallback to static data if Appwrite fails
        const { TEAM_DATA } = await import("@/lib/data");
        members = TEAM_DATA.map(m => ({
            $id: m.id,
            name: m.name,
            role: m.role,
            team: m.team || "",
            email: m.email || "",
            enrollmentNo: m.enrollmentNo,
            contactNo: m.contactNo,
            linkedin: m.socials?.linkedin,
            github: m.socials?.github,
            imageUrl: m.image,
        }));
    }

    return <TeamPageClient members={members} />;
}
