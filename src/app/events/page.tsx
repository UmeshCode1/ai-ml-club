"use client";

import { useState } from "react";
import { MOCK_EVENTS } from "@/lib/data";
import { FloatingCard } from "@/components/ui/floating-card";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, MapPin, Filter, ChevronLeft, ChevronRight } from "lucide-react";

type FilterType = "all" | "completed" | "upcoming" | "ongoing";

export default function EventsPage() {
    const [filter, setFilter] = useState<FilterType>("all");

    // Filter events based on status
    const filteredEvents = MOCK_EVENTS.filter(event => {
        if (filter === "all") return true;
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
        all: MOCK_EVENTS.length,
        completed: MOCK_EVENTS.filter(e => e.status === "completed" || e.status === "past").length,
        upcoming: MOCK_EVENTS.filter(e => e.status === "upcoming").length,
        ongoing: MOCK_EVENTS.filter(e => e.status === "ongoing").length,
    };

    const filterButtons: { key: FilterType; label: string; color: string }[] = [
        { key: "all", label: "All Events", color: "bg-neutral-500" },
        { key: "completed", label: "Completed", color: "bg-green-500" },
        { key: "upcoming", label: "Upcoming", color: "bg-[var(--neon-lime)]" },
        { key: "ongoing", label: "Ongoing", color: "bg-[var(--electric-cyan)]" },
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

    return (
        <div className="min-h-screen relative w-full flex flex-col items-center pt-20 sm:pt-24 px-4">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 sm:mb-12"
            >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-neutral-50 dark:to-neutral-500 mb-4">
                    Events
                </h1>
                <p className="text-sm sm:text-lg text-neutral-500 dark:text-neutral-400 tracking-wide">
                    Workshops • Hackathons • Expert Talks • Competitions
                </p>
            </motion.div>

            {/* Horizontal Timeline - Desktop */}
            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hidden md:block w-full max-w-6xl mb-12 relative"
            >
                <div className="relative h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.completed / stats.all) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-[var(--neon-lime)] rounded-full"
                    />
                </div>
                <div className="flex justify-between mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                    <span>Started</span>
                    <span className="font-bold text-[var(--neon-lime-text)]">{stats.completed} Completed</span>
                    <span>{stats.upcoming} Upcoming</span>
                </div>
            </motion.div>

            {/* Filter Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
            >
                {filterButtons.map((btn) => (
                    <button
                        key={btn.key}
                        onClick={() => setFilter(btn.key)}
                        className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${filter === btn.key
                                ? "bg-neutral-900 dark:bg-white text-white dark:text-black border-transparent shadow-lg"
                                : "bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-[var(--neon-lime)]/50"
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${btn.color}`} />
                            {btn.label}
                            <span className="text-xs opacity-60">({stats[btn.key]})</span>
                        </span>
                    </button>
                ))}
            </motion.div>

            {/* Events Grid */}
            <div className="w-full max-w-7xl z-10 relative pb-20">
                <AnimatePresence mode="popLayout">
                    {sortedEvents.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                        >
                            {sortedEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                >
                                    <div className="group relative h-full rounded-2xl sm:rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] overflow-hidden hover:shadow-2xl hover:shadow-[var(--neon-lime)]/10 hover:border-[var(--electric-cyan)]/50 transition-all duration-500 flex flex-col">
                                        {/* Image */}
                                        <div className="aspect-[16/10] sm:aspect-video relative w-full overflow-hidden bg-black/5 dark:bg-white/5">
                                            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
                                            <Image
                                                src={event.image}
                                                alt={event.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Status Badge */}
                                            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                                                <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold backdrop-blur-md border ${getStatusColor(event.status)}`}>
                                                    {(event.status || "Upcoming").toUpperCase()}
                                                </span>
                                            </div>

                                            {/* Category Badge */}
                                            {event.category && (
                                                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
                                                    <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-black/50 backdrop-blur-md text-white border border-white/20">
                                                        {event.category}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                            {/* Date & Duration */}
                                            <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3 flex-wrap">
                                                <span className="flex items-center gap-1.5 text-[var(--electric-cyan-text)] text-[10px] sm:text-xs font-bold">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(event.date).toLocaleDateString("en-IN", {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                </span>
                                                {event.duration && (
                                                    <span className="flex items-center gap-1.5 text-neutral-500 text-[10px] sm:text-xs">
                                                        <Clock className="w-3 h-3" />
                                                        {event.duration}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-base sm:text-xl font-bold text-neutral-900 dark:text-white mb-2 sm:mb-3 group-hover:text-[var(--neon-lime-text)] transition-colors line-clamp-2">
                                                {event.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 flex-1">
                                                {event.description}
                                            </p>

                                            {/* Location */}
                                            <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] sm:text-xs mt-auto">
                                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                                <span className="truncate">{event.location}</span>
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
                            <Filter className="w-12 h-12 text-neutral-400 mb-4" />
                            <h3 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                                No {filter} events found
                            </h3>
                            <p className="text-neutral-500 text-sm">
                                Try selecting a different filter
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Stats Section - Mobile */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="md:hidden fixed bottom-4 left-4 right-4 z-50"
            >
                <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 shadow-2xl">
                    <div className="flex justify-around text-center">
                        <div>
                            <div className="text-2xl font-bold text-[var(--neon-lime-text)]">{stats.completed}</div>
                            <div className="text-[10px] text-neutral-500">Completed</div>
                        </div>
                        <div className="w-px bg-neutral-200 dark:bg-neutral-700" />
                        <div>
                            <div className="text-2xl font-bold text-[var(--electric-cyan-text)]">{stats.upcoming}</div>
                            <div className="text-[10px] text-neutral-500">Upcoming</div>
                        </div>
                        <div className="w-px bg-neutral-200 dark:bg-neutral-700" />
                        <div>
                            <div className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.all}</div>
                            <div className="text-[10px] text-neutral-500">Total</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
