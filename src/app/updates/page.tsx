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

        const blogItems: UpdateItem[] = blogPosts.map(post => ({
            id: post.$id,
            type: 'blog',
            title: post.title,
            description: post.excerpt,
            date: post.publishedAt,
            category: post.category,
            image: undefined, // Blogs usually use placeholders or specific covers if added later
            link: `/blog/${post.slug}`,
            author: post.author
        }));

        const eventItems: UpdateItem[] = events.map(event => ({
            id: event.$id,
            type: 'event',
            title: event.title,
            description: event.description,
            date: event.date,
            category: event.category || 'Event',
            image: event.imageUrl,
            link: '/events', // Focus on linking to the event list or specific event details if needed
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
