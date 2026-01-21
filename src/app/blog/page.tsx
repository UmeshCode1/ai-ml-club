import { getBlogPosts, BlogPost } from "@/lib/database";
import { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
    title: "Blog - AIML Club OCT",
    description: "Technical deep-dives, event recaps, AI/ML tutorials, and industry insights from AIML Club at Oriental College of Technology, Bhopal.",
};

// Fallback blog posts if Appwrite is empty
const fallbackPosts: BlogPost[] = [
    {
        $id: "welcome-blog",
        title: "Welcome to AIML Club Blog",
        slug: "welcome-to-aiml-club",
        excerpt: "Introducing our new blog platform where we'll share tech insights, event recaps, and AI/ML tutorials.",
        content: "# Welcome to AIML Club Blog\n\nWe're excited to launch our official blog! Here, you'll find:\n\n- **Tech Tutorials**: Deep dives into AI, ML, and programming concepts\n- **Event Recaps**: Highlights from our workshops, competitions, and talks\n- **Industry Insights**: Latest trends in AI and technology\n- **Member Spotlights**: Stories from our amazing community\n\nStay tuned for more content!",
        author: "AIML Club Team",
        authorRole: "Core Team",
        category: "Announcements",
        tags: "welcome,aiml,blog,launch",
        readTime: 2,
        isPublished: true,
        isFeatured: true,
        publishedAt: "2025-08-09",
    },
    {
        $id: "intro-to-ml",
        title: "Introduction to Machine Learning",
        slug: "intro-to-machine-learning",
        excerpt: "A beginner-friendly guide to understanding the basics of Machine Learning and its applications.",
        content: "# Introduction to Machine Learning\n\nMachine Learning (ML) is a subset of Artificial Intelligence that enables computers to learn from data...\n\n## What is Machine Learning?\n\nMachine Learning is the science of getting computers to act without being explicitly programmed...\n\n## Types of ML\n\n1. **Supervised Learning**\n2. **Unsupervised Learning**\n3. **Reinforcement Learning**",
        author: "Tech Team",
        authorRole: "Content Writer",
        category: "AI & ML",
        tags: "machine learning,ai,tutorial,beginner",
        readTime: 5,
        isPublished: true,
        isFeatured: false,
        publishedAt: "2025-09-15",
    },
];

export default async function BlogPage() {
    // Fetch blog posts from Appwrite
    let posts: BlogPost[] = [];
    try {
        posts = await getBlogPosts();
    } catch (error) {
        console.error("Failed to fetch blog posts:", error);
    }

    // Use fallback if no posts in database
    if (!posts || posts.length === 0) {
        posts = fallbackPosts;
    }

    return <BlogPageClient posts={posts} />;
}
