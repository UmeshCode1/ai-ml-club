import { getEvents } from "@/lib/database";
import { MOCK_EVENTS } from "@/lib/data";
import { Metadata } from "next";
import EventsPageClient from "./EventsPageClient";

export const metadata: Metadata = {
    title: "Events - AIML Club OCT",
    description: "Explore AIML Club OCT events - Expert Talks, Workshops, Hackathons, and Competitions. Join our AI & Machine Learning community at Oriental College of Technology, Bhopal.",
    keywords: [
        "AIML Club Events",
        "AI Events Bhopal",
        "ML Workshops OCT",
        "Tech Events Oriental College",
        "AI Hackathons Bhopal",
        "Coding Competitions OCT"
    ],
    openGraph: {
        title: "AIML Club Events - Workshops, Hackathons & More",
        description: "Discover exciting AI & ML events at Oriental College of Technology, Bhopal.",
        type: "website",
    },
};

// Server Component - fetches data on the server
export default async function EventsPage() {
    // Try to fetch events from Appwrite, fallback to mock data
    let events = [];
    try {
        events = await getEvents();
        // If Appwrite returns empty, use mock data
        if (!events || events.length === 0) {
            events = MOCK_EVENTS.map(e => ({
                $id: e.id,
                title: e.title,
                description: e.description,
                date: e.date,
                location: e.location,
                imageUrl: e.image,
                category: e.category || "Event",
                duration: e.duration || "",
                status: e.status || "completed",
                registrationLink: e.registrationLink || "",
                isUpcoming: e.status === "upcoming",
            }));
        }
    } catch (error) {
        console.error("Failed to fetch events from Appwrite:", error);
        // Fallback to mock data
        events = MOCK_EVENTS.map(e => ({
            $id: e.id,
            title: e.title,
            description: e.description,
            date: e.date,
            location: e.location,
            imageUrl: e.image,
            category: e.category || "Event",
            duration: e.duration || "",
            status: e.status || "completed",
            registrationLink: e.registrationLink || "",
            isUpcoming: e.status === "upcoming",
        }));
    }

    // Generate JSON-LD structured data for events
    const eventsJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "AIML Club Events",
        "description": "Events organized by AIML Club at Oriental College of Technology",
        "itemListElement": events.slice(0, 20).map((event, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Event",
                "name": event.title,
                "description": event.description,
                "startDate": event.date,
                "location": {
                    "@type": "Place",
                    "name": event.location,
                },
                "organizer": {
                    "@type": "Organization",
                    "name": "AIML Club OCT",
                    "url": "https://aimlclub.tech"
                },
            }
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
            />
            <EventsPageClient events={events} />
        </>
    );
}
