import { getEvents, Event as DbEvent } from "@/lib/database";
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

// Type expected by EventsPageClient
interface ClientEvent {
    $id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    imageUrl?: string;
    category?: string;
    duration?: string;
    status?: string;
    registrationLink?: string;
    isUpcoming?: boolean;
}

// Convert database/mock event to client event format
function toClientEvent(event: DbEvent | typeof MOCK_EVENTS[0], id: string): ClientEvent {
    const dbEvent = event as DbEvent;
    const mockEvent = event as typeof MOCK_EVENTS[0];

    return {
        $id: id,
        title: dbEvent.title || mockEvent.title,
        description: dbEvent.description || mockEvent.description,
        date: dbEvent.date || mockEvent.date,
        location: dbEvent.location || dbEvent.venue || mockEvent.location || "OCT Campus",
        imageUrl: dbEvent.imageUrl || mockEvent.image,
        category: dbEvent.category || mockEvent.category || "Event",
        duration: dbEvent.duration || mockEvent.duration || "",
        status: dbEvent.status || mockEvent.status || "completed",
        registrationLink: dbEvent.registrationLink || mockEvent.registrationLink || "",
        isUpcoming: dbEvent.isUpcoming || mockEvent.status === "upcoming",
    };
}

// Server Component - fetches data on the server
export default async function EventsPage() {
    let events: ClientEvent[] = [];

    try {
        const dbEvents = await getEvents();

        if (dbEvents && dbEvents.length > 0) {
            events = dbEvents.map((e, i) => toClientEvent(e, e.$id || `db-${i}`));
        } else {
            // Fallback to mock data
            events = MOCK_EVENTS.map((e, i) => toClientEvent(e as unknown as DbEvent, e.id || `mock-${i}`));
        }
    } catch (error) {
        console.error("Failed to fetch events from Appwrite:", error);
        // Fallback to mock data
        events = MOCK_EVENTS.map((e, i) => toClientEvent(e as unknown as DbEvent, e.id || `mock-${i}`));
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
