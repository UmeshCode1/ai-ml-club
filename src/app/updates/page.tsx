import { getBlogPosts, getEvents } from "@/lib/database";
import { Metadata } from "next";
import UpdatesPageClient from "./UpdatesPageClient";

export const metadata: Metadata = {
    title: "Latest Updates - AIML Club OCT",
    description: "Stay updated with the latest news, announcements, events, and technical articles from the AI & Machine Learning Club at Oriental College of Technology, Bhopal.",
};

export type UpdateItem = {
    id: string;
    type: 'blog' | 'event';
    title: string;
    description: string;
    date: string;
    category: string;
    image?: string;
    link: string;
    author?: string;
};

export default async function UpdatesPage() {
    let updates: UpdateItem[] = [];

    try {
        const [blogPosts, events] = await Promise.all([
            getBlogPosts(),
            getEvents()
        ]);

        const blogItems: UpdateItem[] = blogPosts.map((post, i) => ({
            id: post.$id || `blog-${i}`,
            type: 'blog',
            title: post.title || 'Untitled Post',
            description: post.excerpt || 'No description available.',
            date: post.publishedAt || new Date().toISOString(),
            category: post.category || 'Announcement',
            image: undefined,
            link: `/blog/${post.slug || post.$id}`,
            author: post.author || 'AIML Club Team'
        }));

        const eventItems: UpdateItem[] = events.map((event, i) => ({
            id: event.$id || `event-${i}`,
            type: 'event',
            title: event.title || 'Untitled Event',
            description: event.description || 'No description available.',
            date: event.date || new Date().toISOString(),
            category: event.category || 'Event',
            image: event.imageUrl || undefined,
            link: '/events',
            author: 'AIML Club'
        }));

        updates = [...blogItems, ...eventItems].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

    } catch (error) {
        console.error("Failed to fetch updates:", error);
    }

    return <UpdatesPageClient initialUpdates={updates} />;
}
