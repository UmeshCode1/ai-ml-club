"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, BookOpen, Clock, ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { UpdateItem } from "./page";
import { GradientBorder } from "@/components/ui/gradient-border";

interface UpdatesPageClientProps {
    initialUpdates: UpdateItem[];
}

export default function UpdatesPageClient({ initialUpdates }: UpdatesPageClientProps) {
    const [filter, setFilter] = useState<'all' | 'blog' | 'event'>('all');
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUpdates = initialUpdates.filter(update => {
        const matchesType = filter === 'all' || update.type === filter;
        const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            update.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block px-3 py-1 rounded-full bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--neon-lime)]/20">
                        Stay Informed
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
                        Latest <span className="text-[var(--neon-lime-text)]">Updates</span>
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
                        The ultimate source for all club news, technical insights, and upcoming events at Oriental College of Technology.
                    </p>
                </motion.div>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                    <div className="flex bg-neutral-100 dark:bg-white/5 p-1 rounded-xl border border-neutral-200 dark:border-white/10 w-full md:w-auto">
                        {(['all', 'blog', 'event'] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type)}
                                className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all duration-300 flex-1 md:flex-none ${filter === type
                                    ? 'bg-white dark:bg-white/10 text-[var(--neon-lime-text)] shadow-sm'
                                    : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                                    }`}
                            >
                                {type === 'all' ? 'All Feed' : type + 's'}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-[var(--neon-lime-text)] transition-colors" />
                        <input
                            type="text"
                            placeholder="Search updates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 focus:border-[var(--neon-lime)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--neon-lime)]/10 transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Updates Feed Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredUpdates.map((update, index) => (
                            <UpdateCard key={update.id} update={update} index={index} />
                        ))}
                    </AnimatePresence>
                </div>

                {filteredUpdates.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-neutral-500 dark:text-neutral-400">No updates found matching your criteria.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

function UpdateCard({ update, index }: { update: UpdateItem; index: number }) {
    const isBlog = update.type === 'blog';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            <GradientBorder
                containerClassName="rounded-3xl h-full shadow-lg"
                className="bg-white/50 dark:bg-neutral-900/40 backdrop-blur-xl h-full flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2"
                duration={8}
            >
                {/* Image Section */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                    {update.image ? (
                        <Image
                            src={update.image}
                            alt={update.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${isBlog ? 'from-purple-500/20 to-blue-500/20' : 'from-[var(--neon-lime)]/20 to-[var(--electric-cyan)]/20'}`}>
                            {isBlog ? <BookOpen className="w-12 h-12 text-blue-500/40" /> : <Calendar className="w-12 h-12 text-[var(--neon-lime)]/40" />}
                        </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md shadow-lg ${isBlog
                            ? 'bg-purple-500/10 text-purple-600 border-purple-500/20'
                            : 'bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)] border-[var(--neon-lime)]/20'
                            }`}>
                            {update.type}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 mb-4 font-medium">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(update.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                        <span className="truncate">{update.category}</span>
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-[var(--neon-lime-text)] transition-colors line-clamp-2 leading-tight">
                        {update.title}
                    </h3>

                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-6 flex-1">
                        {update.description}
                    </p>

                    <Link
                        href={update.link}
                        className="inline-flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white/80 hover:text-[var(--neon-lime-text)] transition-all group/link"
                    >
                        Read More
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                </div>
            </GradientBorder>
        </motion.div>
    );
}
