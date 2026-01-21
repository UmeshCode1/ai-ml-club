"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, MapPin, Filter, ExternalLink, Sparkles, ChevronDown } from "lucide-react";

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
    const [showAllTimeline, setShowAllTimeline] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    // Detect device type
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

    // Filter events
    const filteredEvents = events.filter(event => {
        if (filter === "all") return true;
        if (filter === "upcoming") return event.isUpcoming || event.status === "upcoming";
        if (filter === "completed") return event.status === "completed" || event.status === "past";
        return event.status === filter;
    });

    // Sort events by date (newest first)
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
    });

    // Timeline events (sorted chronologically for timeline)
    const timelineEvents = [...events].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const displayedTimelineEvents = showAllTimeline ? timelineEvents : timelineEvents.slice(0, 5);

    // Stats
    const stats = {
        all: events.length,
        completed: events.filter(e => e.status === "completed" || e.status === "past").length,
        upcoming: events.filter(e => e.isUpcoming || e.status === "upcoming").length,
        ongoing: events.filter(e => e.status === "ongoing").length,
    };

    const filterButtons: { key: FilterType; label: string; mobileLabel: string; bgColor: string }[] = [
        { key: "all", label: "All Events", mobileLabel: "All", bgColor: "bg-neutral-500" },
        { key: "completed", label: "Completed", mobileLabel: "Done", bgColor: "bg-green-500" },
        { key: "upcoming", label: "Upcoming", mobileLabel: "Soon", bgColor: "bg-[var(--neon-lime)]" },
        { key: "ongoing", label: "Ongoing", mobileLabel: "Live", bgColor: "bg-[var(--electric-cyan)]" },
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

    const getNodeColor = (status: string | undefined) => {
        switch (status) {
            case "completed":
            case "past":
                return "bg-green-500";
            case "upcoming":
                return "bg-[var(--neon-lime)]";
            case "ongoing":
                return "bg-[var(--electric-cyan)]";
            default:
                return "bg-neutral-500";
        }
    };

    return (
        <div className="min-h-screen relative w-full flex flex-col items-center pt-16 sm:pt-20 md:pt-24 px-3 sm:px-4 md:px-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: animSettings.duration }}
                className="text-center mb-6 sm:mb-8 md:mb-10"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-[var(--neon-lime)]/10 border border-[var(--neon-lime)]/30 rounded-full mb-3 sm:mb-4"
                >
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[var(--neon-lime-text)]" />
                    <span className="text-[10px] sm:text-xs font-semibold text-[var(--neon-lime-text)]">{events.length} Events & Counting</span>
                </motion.div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-neutral-50 dark:to-neutral-500 mb-2 sm:mb-3">
                    Our Events
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
                    Workshops • Hackathons • Expert Talks • Competitions
                </p>
            </motion.div>

            {/* Vertical Timeline Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: animSettings.duration, delay: 0.2 }}
                className="w-full max-w-4xl mb-8 sm:mb-10 md:mb-12"
            >
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-4 sm:mb-6 text-center">
                    Event Timeline
                </h2>

                {/* Vertical Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-800 md:-translate-x-px">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(stats.completed / Math.max(stats.all, 1)) * 100}%` }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-green-500 via-[var(--neon-lime)] to-[var(--electric-cyan)]"
                        />
                    </div>

                    {/* Timeline Events */}
                    <div className="space-y-4 sm:space-y-6">
                        {displayedTimelineEvents.map((event, index) => (
                            <motion.div
                                key={event.$id}
                                initial={{ opacity: 0, x: isMobile ? -20 : (index % 2 === 0 ? -30 : 30) }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: animSettings.duration, delay: 0.3 + index * 0.1 }}
                                className={`relative flex items-start gap-3 sm:gap-4 md:gap-6 ${index % 2 === 0
                                        ? 'md:flex-row'
                                        : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Node */}
                                <div className="absolute left-4 sm:left-6 md:left-1/2 md:-translate-x-1/2 z-10">
                                    <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 border-white dark:border-neutral-900 shadow-lg ${getNodeColor(event.status)}`}>
                                        {(event.status === "upcoming" || event.isUpcoming) && !prefersReducedMotion && (
                                            <span className="absolute inset-0 rounded-full bg-[var(--neon-lime)] animate-ping opacity-40" />
                                        )}
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className={`ml-10 sm:ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                                    }`}>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm hover:border-[var(--neon-lime)]/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                    >
                                        {/* Date & Status */}
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <span className="text-[10px] sm:text-xs font-bold text-[var(--electric-cyan-text)]">
                                                {new Date(event.date).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold border ${getStatusColor(event.status)}`}>
                                                {(event.status || "Event").toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-[var(--neon-lime-text)] transition-colors line-clamp-1">
                                            {event.title}
                                        </h3>

                                        {/* Category & Duration */}
                                        <div className="flex items-center gap-2 text-[10px] sm:text-xs text-neutral-500">
                                            {event.category && (
                                                <span className="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800">
                                                    {event.category}
                                                </span>
                                            )}
                                            {event.duration && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {event.duration}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Show More Button */}
                    {timelineEvents.length > 5 && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            onClick={() => setShowAllTimeline(!showAllTimeline)}
                            className="mt-6 mx-auto flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-sm font-medium hover:bg-[var(--neon-lime)]/10 hover:text-[var(--neon-lime-text)] transition-all"
                        >
                            {showAllTimeline ? 'Show Less' : `Show All ${timelineEvents.length} Events`}
                            <ChevronDown className={`w-4 h-4 transition-transform ${showAllTimeline ? 'rotate-180' : ''}`} />
                        </motion.button>
                    )}
                </div>

                {/* Timeline Legend */}
                <div className="flex justify-center gap-4 sm:gap-6 mt-6 text-[10px] sm:text-xs text-neutral-500">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                        <span>Completed ({stats.completed})</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[var(--neon-lime)] ${!prefersReducedMotion ? 'animate-pulse' : ''}`} />
                        <span>Upcoming ({stats.upcoming})</span>
                    </div>
                </div>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: animSettings.duration, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 mb-6 sm:mb-8 md:mb-10"
            >
                {filterButtons.map((btn) => (
                    <motion.button
                        key={btn.key}
                        whileHover={!isMobile ? { scale: 1.05 } : {}}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFilter(btn.key)}
                        className={`relative px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold transition-all duration-200 border ${filter === btn.key
                                ? "bg-neutral-900 dark:bg-white text-white dark:text-black border-transparent shadow-lg"
                                : "bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700"
                            }`}
                    >
                        <span className="flex items-center gap-1 sm:gap-2">
                            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${btn.bgColor}`} />
                            <span className="sm:hidden">{btn.mobileLabel}</span>
                            <span className="hidden sm:inline">{btn.label}</span>
                            <span className="text-[8px] sm:text-xs opacity-60">({stats[btn.key]})</span>
                        </span>
                    </motion.button>
                ))}
            </motion.div>

            {/* Events Grid */}
            <div className="w-full max-w-7xl z-10 relative pb-24 sm:pb-20 md:pb-24">
                <AnimatePresence mode="popLayout">
                    {sortedEvents.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
                        >
                            {sortedEvents.map((event, index) => (
                                <motion.div
                                    key={event.$id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: animSettings.duration, delay: Math.min(index * animSettings.delay, 0.3) }}
                                    whileHover={!isMobile ? { y: -6 } : {}}
                                    whileTap={{ scale: 0.98 }}
                                    className="group"
                                >
                                    <div className="relative h-full rounded-xl sm:rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] overflow-hidden hover:shadow-xl hover:border-[var(--neon-lime)]/40 transition-all duration-300 flex flex-col">
                                        {/* Image */}
                                        <div className="aspect-[16/9] relative w-full overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
                                            {event.imageUrl && (
                                                <Image
                                                    src={event.imageUrl}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                            {/* Badges */}
                                            <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                                                <span className={`px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold backdrop-blur-md border ${getStatusColor(event.status)}`}>
                                                    {(event.status || "Event").toUpperCase()}
                                                </span>
                                            </div>
                                            {event.category && (
                                                <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                                                    <span className="px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-medium bg-black/50 backdrop-blur-md text-white">
                                                        {event.category}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Title on Image */}
                                            <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                                                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white line-clamp-2 group-hover:text-[var(--neon-lime)] transition-colors">
                                                    {event.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-3 sm:p-4 flex-1 flex flex-col">
                                            <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                                                <span className="flex items-center gap-1 text-[var(--electric-cyan-text)] text-[9px] sm:text-[10px] font-bold">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(event.date).toLocaleDateString("en-IN", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </span>
                                                {event.duration && (
                                                    <span className="flex items-center gap-1 text-neutral-500 text-[9px] sm:text-[10px]">
                                                        <Clock className="w-3 h-3" />
                                                        {event.duration}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-neutral-600 dark:text-neutral-400 text-[10px] sm:text-xs line-clamp-2 mb-2 sm:mb-3 flex-1">
                                                {event.description}
                                            </p>

                                            <div className="flex items-center justify-between gap-2 mt-auto">
                                                <div className="flex items-center gap-1 text-neutral-500 text-[9px] sm:text-[10px] min-w-0 flex-1">
                                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                                    <span className="truncate">{event.location}</span>
                                                </div>
                                                {event.registrationLink && (
                                                    <a
                                                        href={event.registrationLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--neon-lime)]/10 text-[var(--neon-lime-text)] text-[9px] font-semibold hover:bg-[var(--neon-lime)]/20 transition-colors"
                                                    >
                                                        <ExternalLink className="w-2.5 h-2.5" />
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
                            className="flex flex-col items-center justify-center py-16 text-center"
                        >
                            <Filter className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-4" />
                            <h3 className="text-lg font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                                No {filter} events found
                            </h3>
                            <button
                                onClick={() => setFilter("all")}
                                className="px-5 py-2 bg-[var(--neon-lime)] text-black rounded-full text-sm font-semibold"
                            >
                                View All
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Stats Bar */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="md:hidden fixed bottom-3 left-3 right-3 z-50"
            >
                <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-xl p-3 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
                    <div className="flex justify-around text-center">
                        <div>
                            <div className="text-lg font-bold text-green-500">{stats.completed}</div>
                            <div className="text-[9px] text-neutral-500">Done</div>
                        </div>
                        <div className="w-px bg-neutral-200 dark:bg-neutral-700" />
                        <div>
                            <div className="text-lg font-bold text-[var(--neon-lime-text)]">{stats.upcoming}</div>
                            <div className="text-[9px] text-neutral-500">Soon</div>
                        </div>
                        <div className="w-px bg-neutral-200 dark:bg-neutral-700" />
                        <div>
                            <div className="text-lg font-bold text-neutral-900 dark:text-white">{stats.all}</div>
                            <div className="text-[9px] text-neutral-500">Total</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
