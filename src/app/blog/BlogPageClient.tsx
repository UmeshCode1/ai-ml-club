"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Search, BookOpen, User, Share2 } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { BlogPost } from "@/lib/database";

interface BlogPageClientProps {
    posts: BlogPost[];
}

type CategoryFilter = "all" | string;

export default function BlogPageClient({ posts }: BlogPageClientProps) {
    const [filter, setFilter] = useState<CategoryFilter>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const checkDevice = () => setIsMobile(window.innerWidth < 640);
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const animSettings = {
        duration: prefersReducedMotion ? 0 : (isMobile ? 0.3 : 0.5),
        delay: prefersReducedMotion ? 0 : (isMobile ? 0.05 : 0.08),
    };

    // Get unique categories
    const categories = ["all", ...new Set(posts.map(p => p.category).filter(Boolean))] as CategoryFilter[];

    // Filter and search posts
    const filteredPosts = posts.filter(post => {
        const matchesCategory = filter === "all" || post.category === filter;
        const matchesSearch = searchQuery === "" ||
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Featured posts
    const featuredPosts = posts.filter(p => p.isFeatured);

    return (
        {/* Scroll Progress Bar */ }
        < div className = "fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none" >
            <motion.div
                className="h-full bg-gradient-to-r from-[var(--neon-lime)] to-[var(--electric-cyan)]"
                style={{ width: `${scrollProgress}%` }}
            />
            </div >

        <div className="max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: animSettings.duration }}
                className="text-center mb-12 flex flex-col items-center"
            >
                <div className="flex flex-col gap-4 items-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--neon-lime)]/10 border border-[var(--neon-lime)]/20 w-fit">
                        <BookOpen className="w-3.5 h-3.5 text-[var(--neon-lime-text)]" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--neon-lime-text)]">{posts.length} Publications</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter text-center">
                        Technical <br /> Insights
                    </h1>
                    <div className="max-w-2xl mx-auto">
                        <BlurReveal
                            text="An analytical archive of artificial intelligence and machine learning research, peer-reviewed tutorials, and technical updates. Building a central knowledge hub for students and researchers to document experimental findings and architectural insights."
                            className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed font-medium text-center"
                            delay={0.4}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Search & Filters */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: animSettings.duration, delay: 0.2 }}
                className="mb-8"
            >
                {/* Search Bar */}
                <div className="relative max-w-md mx-auto mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 text-sm focus:outline-none focus:border-[var(--neon-lime)] transition-colors"
                    />
                </div>

                {/* Category Filters */}
                <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar px-6 -mx-6 md:px-0 md:mx-0 flex-nowrap items-center min-w-full">
                    {categories.map((cat) => (
                        <motion.button
                            key={cat}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFilter(cat)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-xs font-black uppercase transition-all whitespace-nowrap border-2 flex-shrink-0 min-w-fit",
                                filter === cat
                                    ? "bg-neutral-900 dark:bg-white text-white dark:text-black border-transparent"
                                    : "bg-white/80 dark:bg-neutral-900/80 text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-[var(--neon-lime)]"
                            )}
                        >
                            {cat === "all" ? "All Posts" : cat}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && filter === "all" && searchQuery === "" && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: animSettings.duration, delay: 0.3 }}
                    className="mb-10"
                >
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--neon-lime)]" />
                        Featured
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {featuredPosts.slice(0, 2).map((post, index) => (
                            <Link
                                key={post.$id}
                                href={`/blog/${post.slug}`}
                                className="group block"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="relative h-full rounded-2xl bg-gradient-to-br from-[var(--neon-lime)]/5 to-[var(--electric-cyan)]/5 border border-[var(--card-border)] hover:border-[var(--neon-lime)]/50 transition-all duration-300 p-5 overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--neon-lime)]/10 rounded-full blur-3xl" />
                                    <div className="relative z-10">
                                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--neon-lime)]/20 text-[var(--neon-lime-text)] mb-3">
                                            {post.category || "Featured"}
                                        </span>
                                        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-[var(--neon-lime-text)] transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                                                <User className="w-3 h-3" />
                                                <span>{post.author}</span>
                                            </div>
                                            <span className="flex items-center gap-1 text-xs font-semibold text-[var(--neon-lime-text)] group-hover:underline">
                                                Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* All Posts Grid */}
            <AnimatePresence mode="popLayout">
                {filteredPosts.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
                    >
                        {filteredPosts.map((post, index) => (
                            <motion.div
                                key={post.$id}
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: animSettings.duration, delay: Math.min(index * animSettings.delay, 0.3) }}
                                whileHover={!isMobile ? { y: -5 } : {}}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link href={`/blog/${post.slug}`} className="group block h-full">
                                    <CardSpotlight
                                        containerClassName="rounded-xl sm:rounded-2xl border border-[var(--card-border)] overflow-hidden hover:border-[var(--neon-lime)]/50 hover:shadow-lg transition-all duration-300"
                                        className="p-0"
                                        color="rgba(212, 255, 0, 0.1)"
                                    >
                                        <div className="relative h-full overflow-hidden">
                                            {/* Cover Image */}
                                            <div className="aspect-[16/9] relative w-full overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
                                                {post.coverImageUrl ? (
                                                    <Image
                                                        src={post.coverImageUrl}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <BookOpen className="w-12 h-12 text-neutral-300 dark:text-neutral-700" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                                                {/* Category */}
                                                {post.category && (
                                                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                                                        <span className="px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold bg-[var(--neon-lime)]/80 text-black">
                                                            {post.category}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-4 sm:p-5 relative z-20">
                                                {/* Date & Read Time */}
                                                <div className="flex items-center gap-3 text-[10px] sm:text-xs text-neutral-500 mb-2">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric"
                                                        }) : "Recently"}
                                                    </span>
                                                    {post.readTime && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {post.readTime} min read
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[var(--neon-lime-text)] transition-colors">
                                                    {post.title}
                                                </h3>

                                                {/* Excerpt */}
                                                <p className="text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
                                                    {post.excerpt}
                                                </p>

                                                {/* Author & Tags */}
                                                <div className="flex items-center justify-between mt-auto">
                                                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-neutral-500">
                                                        <User className="w-3 h-3" />
                                                        <span>{post.author}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="p-1.5 rounded-full hover:bg-[var(--neon-lime)]/10 text-neutral-400 hover:text-[var(--neon-lime-text)] transition-colors"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                navigator.share({
                                                                    title: post.title,
                                                                    text: post.excerpt,
                                                                    url: window.location.origin + `/blog/${post.slug}`
                                                                }).catch(() => { });
                                                            }}
                                                        >
                                                            <Share2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardSpotlight>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                    >
                        <BookOpen className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-4" />
                        <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                            No posts found
                        </h3>
                        <p className="text-sm text-neutral-500 mb-4">
                            {searchQuery ? "Try a different search term" : "No posts in this category yet"}
                        </p>
                        <button
                            onClick={() => { setFilter("all"); setSearchQuery(""); }}
                            className="px-5 py-2 bg-[var(--neon-lime)] text-black rounded-full text-sm font-semibold"
                        >
                            View All Posts
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
        </div >
    );
}
