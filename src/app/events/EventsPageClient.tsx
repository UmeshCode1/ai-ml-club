"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
    Calendar, Clock, MapPin, Filter,
    ChevronRight, ChevronLeft, ArrowRight,
    Circle, CheckCircle2, PlayCircle, Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { useDeviceType } from "@/hooks/use-device-type";
import { createScrollVariants, getViewportConfig } from "@/lib/animation-variants";

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
    const scrollRef = useRef<HTMLDivElement>(null);
    const { device, prefersReducedMotion } = useDeviceType();
    const variants = createScrollVariants(device, prefersReducedMotion);
    const viewportConfig = getViewportConfig(device);

    // Process Timeline Data
    const timelineData = [...events].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    ).map(e => {
        let status = e.status?.toLowerCase() || "upcoming";
        if (e.isUpcoming) status = "upcoming";
        return { ...e, status };
    });

    // Find the center point
    const findCenterIdx = useCallback(() => {
        const ongoingIdx = timelineData.findIndex(e => e.status === "ongoing");
        if (ongoingIdx !== -1) return ongoingIdx;
        const upcomingIdx = timelineData.findIndex(e => e.status === "upcoming");
        if (upcomingIdx !== -1) return upcomingIdx;
        return timelineData.length > 0 ? timelineData.length - 1 : 0;
    }, [timelineData]);

    useEffect(() => {
        const centerIdx = findCenterIdx();

        // Quick auto-scroll to center
        const timer = setTimeout(() => {
            if (scrollRef.current) {
                const items = scrollRef.current.querySelectorAll('.timeline-item');
                const item = items[centerIdx] as HTMLElement;
                if (item) {
                    const scrollAmount = item.offsetLeft - (scrollRef.current.offsetWidth / 2) + (item.offsetWidth / 2);
                    scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
                }
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [findCenterIdx]);

    // Filtered events for the grid below timeline
    const filteredEvents = events.filter(event => {
        if (filter === "all") return true;
        const s = event.status?.toLowerCase();
        if (filter === "upcoming") return event.isUpcoming || s === "upcoming";
        if (filter === "completed") return s === "completed" || s === "past";
        return s === filter;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const stats: Record<FilterType, number> = {
        all: events.length,
        completed: events.filter(e => e.status === "completed" || e.status === "past").length,
        upcoming: events.filter(e => e.isUpcoming || e.status === "upcoming").length,
        ongoing: events.filter(e => e.status === "ongoing").length,
    };

    const scrollTimeline = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const amount = direction === 'left' ? -400 : 400;
            scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen relative w-full overflow-hidden bg-neutral-50 dark:bg-black">
            {/* 1. HERO SECTION */}
            <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--neon-lime)]/5 rounded-full blur-[120px] -z-10 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--electric-cyan)]/5 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-md mb-6"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--neon-lime)] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--neon-lime)]"></span>
                            </span>
                            <span className="text-[10px] md:text-xs font-bold uppercase text-neutral-600 dark:text-neutral-400">
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
                                text="The official timeline of Artificial Intelligence and Machine Learning Club initiatives at Oriental College of Technology. Tracking our impact through high-stakes hackathons, expert-led sessions, and technical innovation."
                                className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base lg:text-lg leading-relaxed justify-center font-medium"
                                delay={0.4}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
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

            {/* 2. TIMELINE SECTION */}
            <div className="w-full relative py-16 bg-neutral-100/50 dark:bg-neutral-900/10 backdrop-blur-3xl border-y border-neutral-200 dark:border-neutral-800/50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between">
                    <div className="max-w-[70%]">
                        <h2 className="text-xl md:text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter flex items-center gap-2">
                            The Timeline
                            <Circle className="w-2 h-2 fill-green-500 text-green-500 animate-pulse" />
                        </h2>
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest truncate">Navigate our legacy of innovation</p>
                    </div>
                    <div className="flex gap-2">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => scrollTimeline('left')}
                            className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 hover:border-[var(--neon-lime)] hover:bg-[var(--neon-lime)]/10 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => scrollTimeline('right')}
                            className="p-3 rounded-full border border-neutral-200 dark:border-neutral-800 hover:border-[var(--neon-lime)] hover:bg-[var(--neon-lime)]/10 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>

                <div className="relative w-full">
                    {/* The horizontal line aligned with dots at 12px (center of 24px dot container) */}
                    <div className="absolute top-[12px] left-0 right-0 h-[2px] bg-neutral-200 dark:bg-neutral-800/50 z-0" />

                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto overflow-y-hidden gap-8 md:gap-12 px-6 md:px-[15vw] pb-12 cursor-grab active:cursor-grabbing hide-scrollbar snap-x no-scrollbar relative z-10"
                    >
                        {timelineData.map((event, idx) => {
                            const isPast = event.status === "completed" || event.status === "past";
                            const isOngoing = event.status === "ongoing";

                            return (
                                <motion.div
                                    key={event.$id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                                    className={cn(
                                        "timeline-item flex-shrink-0 w-72 sm:w-80 flex flex-col snap-center",
                                        isOngoing ? "z-20 scale-105" : "z-10 scale-95 opacity-80"
                                    )}
                                >
                                    {/* Dot & Date */}
                                    <div className="flex flex-col items-center mb-10">
                                        <div className={cn(
                                            "w-6 h-6 rounded-full transition-all duration-500 relative flex items-center justify-center bg-white dark:bg-black border-[3px]",
                                            isPast ? "border-green-500" :
                                                isOngoing ? "border-[var(--neon-lime)] scale-110" :
                                                    "border-neutral-300 dark:border-neutral-800"
                                        )}>
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full",
                                                isPast ? "bg-green-500" :
                                                    isOngoing ? "bg-[var(--neon-lime)]" :
                                                        "bg-neutral-400 dark:bg-neutral-800"
                                            )} />
                                            {isOngoing && <span className="absolute inset-0 animate-ping bg-[var(--neon-lime)] rounded-full opacity-30" />}
                                        </div>
                                        <div className="mt-4 text-center">
                                            <span className={cn(
                                                "text-[10px] font-mono tracking-widest uppercase font-black",
                                                isPast ? "text-green-600/80" : isOngoing ? "text-[var(--neon-lime)]" : "text-neutral-500"
                                            )}>
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card */}
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        className={cn(
                                            "p-6 rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-500 group cursor-pointer flex flex-col h-full grow",
                                            isOngoing ? "bg-white dark:bg-neutral-900 border-[var(--neon-lime)] shadow-[0_20px_40px_rgba(212,255,0,0.1)]" :
                                                "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800"
                                        )}
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={cn(
                                                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter flex items-center gap-1.5",
                                                isOngoing ? "bg-[var(--neon-lime)] text-black" :
                                                    isPast ? "bg-green-500/10 text-green-600 border border-green-500/20" :
                                                        "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                                            )}>
                                                {isOngoing ? <PlayCircle className="w-3 h-3" /> : isPast ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                                                {event.status}
                                            </div>
                                            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{event.category}</div>
                                        </div>

                                        <h3 className="text-lg font-black text-neutral-900 dark:text-white mb-3 leading-tight group-hover:text-[var(--neon-lime)] transition-colors line-clamp-2">
                                            {event.title}
                                        </h3>

                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-3 mb-6 flex-1 leading-relaxed">
                                            {event.description}
                                        </p>

                                        <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-neutral-100 dark:border-neutral-800/50">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500">
                                                <Clock className="w-4 h-4 text-[var(--neon-lime)]" />
                                                <span>{event.duration || "TBA"}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400">
                                                <MapPin className="w-4 h-4 text-[var(--electric-cyan)]" />
                                                <span className="truncate">{event.location}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                        <div className="flex-shrink-0 w-[40vw]" />
                    </div>
                </div>
            </div>

            {/* 3. GRID SECTION */}
            <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">
                            Discovery <br /> Board
                        </h2>
                        <div className="w-16 h-1.5 bg-[var(--neon-lime)] mt-4" />
                    </div>

                    <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar px-6 -mx-6 md:px-0 md:mx-0 flex-nowrap items-center min-w-full">
                        {(["all", "completed", "ongoing", "upcoming"] as FilterType[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-xs font-black uppercase transition-all whitespace-nowrap border-2 flex-shrink-0 min-w-fit",
                                    filter === f
                                        ? "bg-neutral-900 dark:bg-white text-white dark:text-black border-transparent"
                                        : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-[var(--neon-lime)]"
                                )}
                            >
                                {f} <span className="opacity-40 ml-1">{stats[f]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="popLayout">
                    {filteredEvents.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredEvents.map((event, index) => (
                                <motion.div
                                    key={event.$id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="group"
                                >
                                    <div className="bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-700 h-full flex flex-col group/card">
                                        <div className="aspect-[16/11] relative w-full overflow-hidden">
                                            {event.imageUrl ? (
                                                <Image
                                                    src={event.imageUrl}
                                                    alt={event.title}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                                    <Loader2 className="w-10 h-10 animate-spin text-neutral-300 dark:text-neutral-700" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-widest">
                                                    {event.category}
                                                </span>
                                            </div>

                                            <div className="absolute bottom-6 left-6 right-6">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-[var(--neon-lime)] text-xs font-mono font-bold">
                                                        {new Date(event.date).getFullYear()}
                                                    </span>
                                                    <div className="h-[2px] w-6 bg-[var(--neon-lime)]" />
                                                </div>
                                                <h3 className="text-xl font-black text-white leading-tight uppercase group-hover/card:text-[var(--neon-lime)] transition-colors">
                                                    {event.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="p-8 flex-1 flex flex-col">
                                            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8 line-clamp-2 leading-relaxed">
                                                {event.description}
                                            </p>

                                            <div className="mt-auto space-y-4">
                                                <div className="flex items-center gap-6 text-[11px] font-black text-neutral-500 uppercase tracking-tighter">
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <Calendar className="w-4 h-4 text-[var(--neon-lime)]" />
                                                        {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                                    </div>
                                                    <div className="flex items-center gap-2 truncate">
                                                        <MapPin className="w-4 h-4 text-[var(--electric-cyan)]" />
                                                        {event.location}
                                                    </div>
                                                </div>

                                                {event.registrationLink && (
                                                    <a
                                                        href={event.registrationLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group/btn flex items-center justify-between w-full p-1.5 pl-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-[var(--neon-lime)] transition-all duration-500"
                                                    >
                                                        <span className="text-[10px] font-black uppercase text-neutral-600 dark:text-neutral-300 group-hover/btn:text-black">
                                                            Experience Now
                                                        </span>
                                                        <div className="p-3 rounded-xl bg-white dark:bg-neutral-700 text-black dark:text-white group-hover/btn:bg-black group-hover/btn:text-[var(--neon-lime)] transition-all duration-500">
                                                            <ArrowRight className="w-4 h-4" />
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
                        <div className="text-center py-24 bg-neutral-100/50 dark:bg-neutral-900/30 rounded-[4rem] border-2 border-dashed border-neutral-200 dark:border-neutral-800">
                            <div className="inline-flex p-6 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 mb-6">
                                <Filter className="w-10 h-10 text-neutral-300 dark:text-neutral-700" />
                            </div>
                            <h3 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter">Void Detected</h3>
                            <p className="text-sm text-neutral-500 mb-8 font-medium">Your filter criteria matched no entries in our legacy.</p>
                            <button
                                onClick={() => setFilter('all')}
                                className="px-8 py-3 bg-[var(--neon-lime)] text-black rounded-full text-xs font-black uppercase"
                            >
                                Clear Archive
                            </button>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
