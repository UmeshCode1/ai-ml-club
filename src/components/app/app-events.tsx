"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { ClientEvent } from "@/lib/types";

interface AppEventsProps {
    events: ClientEvent[];
}

export function AppEvents({ events }: AppEventsProps) {
    const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

    // Filter events based on tab
    const filteredEvents = events.filter(e => {
        if (activeTab === "upcoming") return e.isUpcoming;
        return !e.isUpcoming;
    });

    return (
        <div className="min-h-screen pb-24 pt-12 px-4">
            <header className="px-2 mb-6">
                <h1 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
                    Club <span className="text-[var(--neon-lime)]">Events</span>
                </h1>
                <p className="text-xs text-neutral-500 font-mono">Workshops, Hackathons & Meetups</p>
            </header>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-2xl w-fit">
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={cn(
                        "px-6 py-2.5 rounded-xl text-xs font-bold transition-all",
                        activeTab === "upcoming"
                            ? "bg-[var(--neon-lime)] text-black shadow-lg"
                            : "text-neutral-400 hover:text-white"
                    )}
                >
                    Upcoming
                </button>
                <button
                    onClick={() => setActiveTab("past")}
                    className={cn(
                        "px-6 py-2.5 rounded-xl text-xs font-bold transition-all",
                        activeTab === "past"
                            ? "bg-white text-black shadow-lg"
                            : "text-neutral-400 hover:text-white"
                    )}
                >
                    Past
                </button>
            </div>

            {/* Timeline */}
            <div className="space-y-6 relative">
                {/* Vertical Line */}
                <div className="absolute left-[19px] top-4 bottom-0 w-0.5 bg-white/10" />

                <AnimatePresence mode="popLayout">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event, index) => (
                            <motion.div
                                key={event.$id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="relative flex gap-6"
                            >
                                {/* Timeline Dot */}
                                <div className="flex-shrink-0 z-10 mt-1">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center border-4 border-[#050505]",
                                        activeTab === "upcoming" ? "bg-[var(--neon-lime)] text-black" : "bg-neutral-800 text-neutral-500"
                                    )}>
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="flex-1">
                                    <div className="bg-neutral-900/80 border border-white/5 p-5 rounded-2xl active:scale-98 transition-transform">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--electric-cyan)] bg-[var(--electric-cyan)]/10 px-2 py-0.5 rounded">
                                                {event.category || "Event"}
                                            </span>
                                            {event.status === "ongoing" && (
                                                <span className="text-[10px] font-bold text-red-500 animate-pulse flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> LIVE
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                                            {event.title}
                                        </h3>

                                        <div className="flex flex-col gap-1.5 mb-4">
                                            <div className="flex items-center gap-2 text-xs text-neutral-400">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>
                                                    {new Date(event.date).toLocaleDateString("en-IN", {
                                                        weekday: "short", day: "numeric", month: "long"
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-neutral-400">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>

                                        {event.description && (
                                            <p className="text-xs text-neutral-500 line-clamp-2 mb-4 leading-relaxed">
                                                {event.description}
                                            </p>
                                        )}

                                        {activeTab === "upcoming" ? (
                                            <Link
                                                href={event.registrationLink || "#"}
                                                target="_blank"
                                                className="flex items-center justify-center w-full py-3 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wide gap-2 hover:bg-neutral-200 transition-colors"
                                            >
                                                Register Now <ChevronRight className="w-3 h-3" />
                                            </Link>
                                        ) : (
                                            <Link
                                                href="/gallery"
                                                className="flex items-center justify-center w-full py-3 rounded-xl bg-white/5 text-neutral-300 text-xs font-bold uppercase tracking-wide gap-2 border border-white/5"
                                            >
                                                View Highlights <ChevronRight className="w-3 h-3" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 ml-10"
                        >
                            <p className="text-neutral-500 text-sm">No {activeTab} events found.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
