import { getGalleryAlbums, GalleryAlbum } from "@/lib/database";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import GalleryPageClient from "./GalleryPageClient";

export const metadata: Metadata = {
    title: "Gallery - AIML Club OCT",
    description: "Browse photos and memories from AIML Club events - Workshops, Competitions, Expert Talks, and more at Oriental College of Technology, Bhopal.",
};

// Fallback albums if Appwrite is empty
const fallbackAlbums: GalleryAlbum[] = [
    {
        eventName: "Expert Talk - Coding Thinker",
        description: "Insightful session on coding practices and tech industry insights",
        posterUrl: "/images/events/expert-talk.jpg",
        driveLink: siteConfig.links.drive,
        eventDate: "2025-08-26",
        category: "Expert Talk",
        photoCount: 15,
        isVisible: true,
    },
    {
        eventName: "DSPL Session & Workshop",
        description: "Deep dive into Data Structures and Problem Solving Logic",
        posterUrl: "/images/events/dspl.jpg",
        driveLink: siteConfig.links.drive,
        eventDate: "2025-09-15",
        category: "Workshop",
        photoCount: 20,
        isVisible: true,
    },
    {
        eventName: "Apfity Competition",
        description: "Exciting AI aptitude and fitness competition",
        posterUrl: "/images/events/apfity.jpg",
        driveLink: siteConfig.links.drive,
        eventDate: "2025-10-20",
        category: "Competition",
        photoCount: 30,
        isVisible: true,
    },
    {
        eventName: "Codify Competition",
        description: "Coding competition to test programming skills",
        posterUrl: "/images/events/codify.jpg",
        driveLink: siteConfig.links.drive,
        eventDate: "2025-11-14",
        category: "Competition",
        photoCount: 25,
        isVisible: true,
    },
    {
        eventName: "Expert Talk - Reinforcement Learning",
        description: "Expert session on Reinforcement Learning concepts and applications",
        posterUrl: "/images/events/rl-talk.jpg",
        driveLink: siteConfig.links.drive,
        eventDate: "2025-11-25",
        category: "Expert Talk",
        photoCount: 12,
        isVisible: true,
    },
    {
        eventName: "WordPress Tour Workshop",
        description: "Complete workshop on website creation with WordPress",
        posterUrl: "/images/events/wordpress.jpg",
        driveLink: siteConfig.links.drive,
        eventDate: "2025-12-13",
        category: "Workshop",
        photoCount: 18,
        isVisible: true,
    },
    {
        eventName: "Core Team Orientation",
        description: "Onboarding and orientation session for new core team members",
        posterUrl: "/images/events/orientation.jpg",
        driveLink: siteConfig.links.drive,
        eventDate: "2025-12-30",
        category: "Orientation",
        photoCount: 10,
        isVisible: true,
    },
];

export default async function GalleryPage() {
    // Fetch albums from Appwrite
    let albums: GalleryAlbum[] = [];
    try {
        albums = await getGalleryAlbums();
    } catch (error) {
        console.error("Failed to fetch gallery albums:", error);
    }

    // Use fallback if no albums in database
    if (!albums || albums.length === 0) {
        albums = fallbackAlbums;
    }

    return <GalleryPageClient albums={albums} driveLink={siteConfig.links.drive} />;
}
