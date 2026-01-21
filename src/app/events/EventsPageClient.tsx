"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
    Calendar, Clock, MapPin, Filter, ExternalLink,
    Sparkles, ChevronRight, ChevronLeft, ArrowRight,
    Circle, CheckCircle2, PlayCircle, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurReveal } from "@/components/ui/blur-reveal";

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
    const [isMobile, setIsMobile] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIdx, setActiveIdx] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    // Detect device type
    useEffect(() => {
        const checkDevice = () => setIsMobile(window.innerWidth < 768);
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    // Process Timeline Data
    // Group 1: Completed, Group 2: Ongoing, Group 3: Upcoming
    const timelineData = [...events].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    ).map(e => {
        let status = e.status?.toLowerCase() || "upcoming";
        if (e.isUpcoming) status = "upcoming";
        return { ...e, status };
    });

    // Find the center point (Ongoing or first Upcoming)
    const findCenterIdx = () => {
        const ongoingIdx = timelineData.findIndex(e => e.status === "ongoing");
        if (ongoingIdx !== -1) return ongoingIdx;
        const upcomingIdx = timelineData.findIndex(e => e.status === "upcoming");
        if (upcomingIdx !== -1) return upcomingIdx;
        return timelineData.length - 1; // Default to last if all completed
    };

    useEffect(() => {
        const centerIdx = findCenterIdx();
        setActiveIdx(centerIdx);

        // Auto scroll to center on mount
        setTimeout(() => {
            if (scrollRef.current) {
                const item = scrollRef.current.children[centerIdx] as HTMLElement;
                if (item) {
                    const scrollAmount = item.offsetLeft - (scrollRef.current.offsetWidth / 2) + (item.offsetWidth / 2);
                    scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
                }
            }
        }, 800);
    }, []);

    // Filtered events for the grid below timeline
    const filteredEvents = events.filter(event => {
        if (filter === "all") return true;
        const s = event.status?.toLowerCase();
        if (filter === "upcoming") return event.isUpcoming || s === "upcoming";
        if (filter === "completed") return s === "completed" || s === "past";
        return s === filter;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const stats = {
        all: events.length,
        completed: events.filter(e => e.status === "completed" || e.status === "past").length,
        upcoming: events.filter(e => e.isUpcoming || e.status === "upcoming").length,
        ongoing: events.filter(e => e.status === "ongoing").length,
    };

    const scrollTimeline = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const amount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen relative w-full overflow-hidden bg-neutral-50 dark:bg-black">
            {/* 1. FUTURISTIC HERO SECTION */}
            <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--neon-lime)]/5 rounded-full blur-[120px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--electric-cyan)]/5 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center text-center"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-md mb-6 shadow-2xl"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--neon-lime)] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--neon-lime)]"></span>
                            </span>
                            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-neutral-600 dark:text-neutral-400">
                                {stats.ongoing > 0 ? `${stats.ongoing} LIVE EVENT NOW` : "EVOLUTION IN PROGRESS"}
                            </span>
                        </motion.div>

                        <div className="mb-6">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                                Engineering <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--neon-lime-text)] via-[var(--electric-cyan-text)] to-[var(--neon-lime-text)] bg-[length:200%_auto] animate-gradient-flow font-black italic">
                                    MEMORIES
                                </span>
                            </h1>
                        </div>

                        <div className="max-w-2xl">
                            <BlurReveal
                                text="Explore the nexus of AI innovation at Oriental College of Technology. From high-stakes hackathons to expert deep-dives, witness our journey through time."
                                className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base lg:text-lg leading-relaxed justify-center"
                                delay={0.4}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="mt-8 flex items-center gap-8 text-[10px] md:text-xs font-mono text-neutral-500"
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white">{stats.completed}</span>
                                <span>COMPLETED</span>
                            </div>
                            <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-800" />
                            <div className="flex flex-col items-center">
                                <span className="text-lg md:text-xl font-bold text-[var(--neon-lime-text)]">{stats.upcoming}</span>
                                <span>UPCOMING</span>
                            </div>
                            <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-800" />
                            <div className="flex flex-col items-center">
                                <span className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white">{stats.all}</span>
                                <span>TOTAL</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* 2. COMPREHENSIVE HORIZONTAL TIMELINE */}
            <div className="w-full relative py-12 bg-neutral-100/50 dark:bg-neutral-900/30 backdrop-blur-3xl border-y border-neutral-200 dark:border-neutral-800/50">
                <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter flex items-center gap-2">
                            The Timeline
                            <Circle className="w-2 h-2 fill-[var(--neon-lime)] text-[var(--neon-lime)] animate-pulse" />
                        </h2>
                        <p className="text-xs text-neutral-500 font-mono">SCROLL HORIZONTALLY TO NAVIGATE HISTORY</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scrollTimeline('left')}
                            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:border-[var(--neon-lime)] transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => scrollTimeline('right')}
                            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 hover:border-[var(--neon-lime)] transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Timeline Container */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto overflow-y-hidden gap-8 px-[10vw] pb-12 cursor-grab active:cursor-grabbing hide-scrollbar snap-x no-scrollbar"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {/* Connecting Line */}
                    <div className="absolute top-[calc(50%+4rem)] sm:top-[calc(50%+2rem)] left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent z-0 overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-[var(--neon-lime)]"
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            style={{ width: `${(stats.completed / stats.all) * 100}%` }}
                        />
                    </div>

                    {timelineData.map((event, idx) => {
                        const isPast = event.status === "completed" || event.status === "past";
                        const isOngoing = event.status === "ongoing";
                        const isUpcoming = event.status === "upcoming";

                        return (
                            <motion.div
                                key={event.$id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={cn(
                                    "flex-shrink-0 w-72 sm:w-80 relative z-10 flex flex-col snap-center",
                                    isOngoing ? "scale-105" : "scale-95"
                                )}
                            >
                                {/* Event Node */}
                                <div className="mx-auto mb-10 flex flex-col items-center">
                                    <div className={cn(
                                        "w-4 h-4 rounded-full border-4 relative mb-4 transition-all duration-500",
                                        isPast ? "bg-green-500 border-green-500/30" :
                                            isOngoing ? "bg-[var(--neon-lime)] border-[var(--neon-lime)]/50 scale-125" :
                                                "bg-neutral-300 dark:bg-neutral-800 border-transparent"
                                    )}>
                                        {isOngoing && <span className="absolute inset-0 animate-ping bg-[var(--neon-lime)] rounded-full opacity-40" />}
                                        {isUpcoming && <div className="absolute top-10 w-px h-12 bg-dashed border-l border-dashed border-neutral-300 dark:border-neutral-700" />}
                                    </div>
                                    <span className={cn(
                                        "text-[10px] font-mono tracking-tighter uppercase",
                                        isPast ? "text-green-500" : isOngoing ? "text-[var(--neon-lime-text)]" : "text-neutral-500"
                                    )}>
                                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>

                                {/* Event Card */}
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className={cn(
                                        "p-5 rounded-2xl border backdrop-blur-xl transition-all duration-300 group cursor-pointer h-full flex flex-col",
                                        isOngoing ? "bg-white dark:bg-neutral-900 border-[var(--neon-lime)] shadow-[0_0_20px_rgba(212,255,0,0.15)] ring-1 ring-[var(--neon-lime)]" :
                                            isPast ? "bg-neutral-50 dark:bg-neutral-900/40 border-neutral-200 dark:border-neutral-800 opacity-80" :
                                                "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800"
                                    )}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={cn(
                                            "px-2 py-0.5 rounded-full text-[8px] font-black tracking-widest uppercase flex items-center gap-1",
                                            isOngoing ? "bg-[var(--neon-lime)] text-black" :
                                                isPast ? "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400" :
                                                    "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                                        )}>
                                            {isOngoing ? <PlayCircle className="w-2 h-2" /> : isPast ? <CheckCircle2 className="w-2 h-2" /> : <Circle className="w-2 h-2" />}
                                            {event.status}
                                        </div>
                                        <div className="text-[10px] font-bold text-neutral-400">{event.category}</div>
                                    </div>

                                    <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2 leading-tight group-hover:text-[var(--neon-lime-text)] transition-colors">
                                        {event.title}
                                    </h3>

                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-3 mb-4 flex-1">
                                        {event.description}
                                    </p>

                                    <div className="mt-auto flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800/50">
                                        <div className="flex items-center gap-1 text-[10px] font-medium text-neutral-400">
                                            <Clock className="w-3 h-3" /> {event.duration || "N/A"}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-medium text-neutral-400 truncate max-w-[120px]">
                                            <MapPin className="w-3 h-3" /> {event.location}
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}

                    {/* Padding so it can center properly */}
                    <div className="flex-shrink-0 w-[30vw]" />
                </div>
            </div>

            {/* 3. EVENT GRID & FILTERING */}
            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">
                            Discovery <br /> Board
                        </h2>
                        <div className="w-12 h-1 bg-[var(--neon-lime)] mt-2" />
                    </div>

                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar">
                        {(["all", "completed", "ongoing", "upcoming"] as FilterType[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-5 py-2 rounded-full text-xs font-bold uppercase transition-all whitespace-nowrap",
                                    filter === f
                                        ? "bg-neutral-900 dark:bg-white text-white dark:text-black"
                                        : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-[var(--neon-lime)]"
                                )}
                            >
                                {f} <span className="opacity-40 ml-1">{(stats as any)[f]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="popLayout">
                    {filteredEvents.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredEvents.map((event, index) => (
                                <motion.div
                                    key={event.$id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                                    className="group relative"
                                >
                                    <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800/80 rounded-3xl overflow-hidden hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(212,255,0,0.05)] transition-all duration-500 h-full flex flex-col group/card">
                                        {/* Image Section */}
                                        <div className="aspect-[16/10] relative w-full overflow-hidden">
                                            {event.imageUrl ? (
                                                <Image
                                                    src={event.imageUrl}
                                                    alt={event.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                                    <Loader2 className="w-8 h-8 animate-spin text-neutral-300 dark:text-neutral-700" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                            <div className="absolute top-4 left-4 flex gap-2">
                                                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-tight">
                                                    {event.category}
                                                </span>
                                            </div>

                                            <div className="absolute bottom-4 left-4 right-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-[var(--neon-lime)] text-[10px] font-mono">
                                                        {new Date(event.date).getFullYear()}
                                                    </span>
                                                    <div className="h-px w-4 bg-[var(--neon-lime)]" />
                                                </div>
                                                <h3 className="text-lg font-black text-white leading-tight uppercase group-hover/card:text-[var(--neon-lime)] transition-colors">
                                                    {event.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Info Section */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <p className="text-neutral-500 dark:text-neutral-400 text-xs mb-6 line-clamp-2">
                                                {event.description}
                                            </p>

                                            <div className="mt-auto space-y-3">
                                                <div className="flex items-center gap-4 text-[10px] font-bold text-neutral-400 dark:text-neutral-500 overflow-hidden">
                                                    <div className="flex items-center gap-1.5 shrink-0">
                                                        <Calendar className="w-3.5 h-3.5 text-[var(--neon-lime)]" />
                                                        {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 truncate">
                                                        <MapPin className="w-3.5 h-3.5 text-[var(--electric-cyan)]" />
                                                        {event.location}
                                                    </div>
                                                </div>

                                                {event.registrationLink && (
                                                    <a
                                                        href={event.registrationLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group/btn flex items-center justify-between w-full p-1 pl-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-[var(--neon-lime)] transition-all"
                                                    >
                                                        <span className="text-[10px] font-black uppercase text-neutral-600 dark:text-neutral-300 group-hover/btn:text-black">
                                                            View Insights
                                                        </span>
                                                        <div className="p-2 rounded-lg bg-white dark:bg-neutral-700 text-black dark:text-white group-hover/btn:bg-black group-hover/btn:text-[var(--neon-lime)]">
                                                            <ArrowRight className="w-3 h-3" />
                                                        </div>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-20 bg-neutral-100 dark:bg-neutral-900/40 rounded-[2rem] border-2 border-dashed border-neutral-200 dark:border-neutral-800">
                            <div className="inline-flex p-4 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-4">
                                <Filter className="w-8 h-8 text-neutral-300 dark:text-neutral-700" />
                            </div>
                            <h3 className="text-xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">No Events Found</h3>
                            <p className="text-xs text-neutral-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                            <button
                                onClick={() => setFilter('all')}
                                className="px-6 py-2 bg-[var(--neon-lime)] text-black rounded-full text-xs font-bold uppercase"
                            >
                                Reset Filter
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
