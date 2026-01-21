"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, MapPin, Filter, ChevronLeft, ChevronRight, ExternalLink, Sparkles } from "lucide-react";

interface Event {
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

type FilterType = "all" | "completed" | "upcoming" | "ongoing";

interface EventsPageClientProps {
    events: Event[];
}

export default function EventsPageClient({ events }: EventsPageClientProps) {
    const [filter, setFilter] = useState<FilterType>("all");
    const timelineRef = useRef<HTMLDivElement>(null);
    const isTimelineInView = useInView(timelineRef, { once: true });

    // Filter events based on status
    const filteredEvents = events.filter(event => {
        if (filter === "all") return true;
        if (filter === "upcoming") return event.isUpcoming || event.status === "upcoming";
        if (filter === "completed") return event.status === "completed" || event.status === "past";
        return event.status === filter;
    });

    // Sort events by date (newest first for completed, oldest first for upcoming)
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (filter === "upcoming") return dateA - dateB;
        return dateB - dateA;
    });

    // Stats for each filter
    const stats = {
        all: events.length,
        completed: events.filter(e => e.status === "completed" || e.status === "past").length,
        upcoming: events.filter(e => e.isUpcoming || e.status === "upcoming").length,
        ongoing: events.filter(e => e.status === "ongoing").length,
    };

    const filterButtons: { key: FilterType; label: string; color: string; bgColor: string }[] = [
        { key: "all", label: "All Events", color: "text-neutral-700 dark:text-neutral-300", bgColor: "bg-neutral-500" },
        { key: "completed", label: "Completed", color: "text-green-600 dark:text-green-400", bgColor: "bg-green-500" },
        { key: "upcoming", label: "Upcoming", color: "text-[var(--neon-lime-text)]", bgColor: "bg-[var(--neon-lime)]" },
        { key: "ongoing", label: "Ongoing", color: "text-[var(--electric-cyan-text)]", bgColor: "bg-[var(--electric-cyan)]" },
    ];

    const getStatusColor = (status: string | undefined) => {
        switch (status) {
            case "completed":
            case "past":
                return "bg-green-500/20 border-green-500 text-green-600 dark:text-green-400";
            case "upcoming":
                return "bg-[var(--neon-lime)]/20 border-[var(--neon-lime)] text-[var(--neon-lime-text)]";
            case "ongoing":
                return "bg-[var(--electric-cyan)]/20 border-[var(--electric-cyan)] text-[var(--electric-cyan-text)]";
            default:
                return "bg-neutral-500/20 border-neutral-500 text-neutral-600 dark:text-neutral-400";
        }
    };

    // Timeline scroll functionality
    const scrollTimeline = (direction: 'left' | 'right') => {
        if (timelineRef.current) {
            const scrollAmount = 300;
            timelineRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen relative w-full flex flex-col items-center pt-20 sm:pt-24 px-4">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 sm:mb-12"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--neon-lime)]/10 border border-[var(--neon-lime)]/30 rounded-full mb-4"
                >
                    <Sparkles className="w-4 h-4 text-[var(--neon-lime-text)]" />
                    <span className="text-xs font-semibold text-[var(--neon-lime-text)]">{events.length} Events & Counting</span>
                </motion.div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-neutral-50 dark:to-neutral-500 mb-4">
                    Our Events
                </h1>
                <p className="text-sm sm:text-lg text-neutral-500 dark:text-neutral-400 tracking-wide max-w-2xl mx-auto">
                    From Expert Talks to Hackathons — Explore our journey of learning & innovation
                </p>
            </motion.div>

            {/* Horizontal Timeline with Events */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full max-w-7xl mb-12 relative"
            >
                {/* Timeline Container */}
                <div className="relative">
                    {/* Scroll Buttons - Desktop */}
                    <button
                        onClick={() => scrollTimeline('left')}
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 items-center justify-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-full shadow-lg hover:border-[var(--neon-lime)] transition-all"
                    >
                        <ChevronLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </button>
                    <button
                        onClick={() => scrollTimeline('right')}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 items-center justify-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-full shadow-lg hover:border-[var(--neon-lime)] transition-all"
                    >
                        <ChevronRight className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </button>

                    {/* Timeline Track */}
                    <div
                        ref={timelineRef}
                        className="overflow-x-auto scrollbar-hide pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <div className="relative min-w-max px-4">
                            {/* Timeline Line */}
                            <div className="absolute left-0 right-0 top-[45px] h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: isTimelineInView ? `${(stats.completed / stats.all) * 100}%` : 0 }}
                                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 via-[var(--neon-lime)] to-[var(--electric-cyan)] rounded-full"
                                />
                            </div>

                            {/* Event Nodes */}
                            <div className="flex gap-6 pt-2">
                                {events.slice(0, 10).map((event, index) => (
                                    <motion.div
                                        key={event.$id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: isTimelineInView ? 1 : 0, y: isTimelineInView ? 0 : 20 }}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                        className="relative flex flex-col items-center w-32 sm:w-40"
                                    >
                                        {/* Node Dot */}
                                        <div className={`relative z-10 w-6 h-6 rounded-full border-4 border-white dark:border-neutral-900 shadow-lg ${event.status === "completed" || event.status === "past"
                                                ? "bg-green-500"
                                                : event.status === "upcoming"
                                                    ? "bg-[var(--neon-lime)]"
                                                    : "bg-[var(--electric-cyan)]"
                                            }`}>
                                            {(event.status === "upcoming" || event.isUpcoming) && (
                                                <span className="absolute inset-0 rounded-full bg-[var(--neon-lime)] animate-ping opacity-50" />
                                            )}
                                        </div>

                                        {/* Date */}
                                        <div className="mt-3 text-[10px] sm:text-xs font-bold text-neutral-500 dark:text-neutral-400">
                                            {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                        </div>

                                        {/* Event Card Mini */}
                                        <div className="mt-2 p-2 sm:p-3 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm hover:border-[var(--neon-lime)]/50 transition-all duration-300 cursor-pointer group">
                                            <div className={`text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 inline-block ${getStatusColor(event.status)}`}>
                                                {event.category || "Event"}
                                            </div>
                                            <h4 className="text-[10px] sm:text-xs font-semibold text-neutral-900 dark:text-white line-clamp-2 group-hover:text-[var(--neon-lime-text)] transition-colors">
                                                {event.title}
                                            </h4>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline Legend */}
                <div className="flex justify-center gap-6 mt-4 text-xs text-neutral-500">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span>Completed ({stats.completed})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--neon-lime)] animate-pulse" />
                        <span>Upcoming ({stats.upcoming})</span>
                    </div>
                </div>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
            >
                {filterButtons.map((btn) => (
                    <motion.button
                        key={btn.key}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilter(btn.key)}
                        className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border overflow-hidden ${filter === btn.key
                                ? "bg-neutral-900 dark:bg-white text-white dark:text-black border-transparent shadow-lg"
                                : "bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-[var(--neon-lime)]/50"
                            }`}
                    >
                        <span className="flex items-center gap-2 relative z-10">
                            <span className={`w-2 h-2 rounded-full ${btn.bgColor}`} />
                            {btn.label}
                            <span className="text-xs opacity-60">({stats[btn.key]})</span>
                        </span>
                    </motion.button>
                ))}
            </motion.div>

            {/* Events Grid */}
            <div className="w-full max-w-7xl z-10 relative pb-20 sm:pb-32">
                <AnimatePresence mode="popLayout">
                    {sortedEvents.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                        >
                            {sortedEvents.map((event, index) => (
                                <motion.div
                                    key={event.$id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -30 }}
                                    transition={{ duration: 0.5, delay: index * 0.08, type: "spring", bounce: 0.3 }}
                                    whileHover={{ y: -8 }}
                                    className="group"
                                >
                                    <div className="relative h-full rounded-2xl sm:rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] overflow-hidden hover:shadow-2xl hover:shadow-[var(--neon-lime)]/10 hover:border-[var(--neon-lime)]/50 transition-all duration-500 flex flex-col">
                                        {/* Image */}
                                        <div className="aspect-[16/10] sm:aspect-video relative w-full overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-lime)]/5 to-[var(--electric-cyan)]/5" />
                                            {event.imageUrl && (
                                                <Image
                                                    src={event.imageUrl}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            )}

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                            {/* Status Badge */}
                                            <motion.div
                                                initial={{ x: 20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 + index * 0.1 }}
                                                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10"
                                            >
                                                <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold backdrop-blur-md border ${getStatusColor(event.status)}`}>
                                                    {(event.status || "Event").toUpperCase()}
                                                </span>
                                            </motion.div>

                                            {/* Category Badge */}
                                            {event.category && (
                                                <motion.div
                                                    initial={{ x: -20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: 0.4 + index * 0.1 }}
                                                    className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10"
                                                >
                                                    <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-black/50 backdrop-blur-md text-white border border-white/20">
                                                        {event.category}
                                                    </span>
                                                </motion.div>
                                            )}

                                            {/* Bottom Info */}
                                            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-10">
                                                <h3 className="text-base sm:text-xl font-bold text-white drop-shadow-lg line-clamp-2 group-hover:text-[var(--neon-lime)] transition-colors">
                                                    {event.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                            {/* Date & Duration */}
                                            <div className="flex items-center gap-3 sm:gap-4 mb-3 flex-wrap">
                                                <span className="flex items-center gap-1.5 text-[var(--electric-cyan-text)] text-[10px] sm:text-xs font-bold">
                                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                                    {new Date(event.date).toLocaleDateString("en-IN", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </span>
                                                {event.duration && (
                                                    <span className="flex items-center gap-1.5 text-neutral-500 text-[10px] sm:text-xs">
                                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                                        {event.duration}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Description */}
                                            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm line-clamp-2 mb-4 flex-1">
                                                {event.description}
                                            </p>

                                            {/* Location & Action */}
                                            <div className="flex items-center justify-between gap-2 mt-auto">
                                                <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] sm:text-xs flex-1 min-w-0">
                                                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                                    <span className="truncate">{event.location}</span>
                                                </div>
                                                {event.registrationLink && (
                                                    <a
                                                        href={event.registrationLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)] text-[10px] sm:text-xs font-semibold hover:bg-[var(--neon-lime)]/20 transition-colors"
                                                    >
                                                        <ExternalLink className="w-3 h-3" />
                                                        View
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-center"
                        >
                            <Filter className="w-16 h-16 text-neutral-300 dark:text-neutral-700 mb-4" />
                            <h3 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                                No {filter} events found
                            </h3>
                            <p className="text-neutral-500 text-sm mb-4">
                                Try selecting a different filter
                            </p>
                            <button
                                onClick={() => setFilter("all")}
                                className="px-6 py-2 bg-[var(--neon-lime)] text-black rounded-full text-sm font-semibold hover:shadow-lg transition-shadow"
                            >
                                View All Events
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Stats Bar */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="md:hidden fixed bottom-4 left-4 right-4 z-50"
            >
                <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
                    <div className="flex justify-around text-center">
                        <div className="flex flex-col items-center">
                            <div className="text-xl sm:text-2xl font-bold text-green-500">{stats.completed}</div>
                            <div className="text-[10px] text-neutral-500">Completed</div>
                        </div>
                        <div className="w-px bg-neutral-200 dark:bg-neutral-700" />
                        <div className="flex flex-col items-center">
                            <div className="text-xl sm:text-2xl font-bold text-[var(--neon-lime-text)]">{stats.upcoming}</div>
                            <div className="text-[10px] text-neutral-500">Upcoming</div>
                        </div>
                        <div className="w-px bg-neutral-200 dark:bg-neutral-700" />
                        <div className="flex flex-col items-center">
                            <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">{stats.all}</div>
                            <div className="text-[10px] text-neutral-500">Total</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
