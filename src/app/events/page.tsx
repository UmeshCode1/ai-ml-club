"use client";

import { MOCK_EVENTS } from "@/lib/data";
import { FloatingCard } from "@/components/ui/floating-card";
import Image from "next/image";

export default function EventsPage() {
    return (
        <div className="min-h-screen relative w-full flex flex-col items-center pt-24 px-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-neutral-50 dark:to-neutral-500 mb-12 text-center">
                Events
                <span className="block text-lg font-normal text-neutral-500 dark:text-neutral-400 mt-4 tracking-wide">
                    Workshops • Hackathons • Seminars
                </span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full z-10 relative pb-20">
                {MOCK_EVENTS.map((event, index) => (
                    <FloatingCard key={event.id} delay={index * 0.15}>
                        <div className="group relative h-full rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] overflow-hidden hover:shadow-2xl hover:border-[#00F0FF]/50 transition-all duration-500 flex flex-col">
                            <div className="aspect-video relative w-full overflow-hidden bg-black/5 dark:bg-white/5">
                                <div className="absolute inset-0 bg-neutral-200 dark:bg-white/5 animate-pulse" /> {/* Placeholder for image */}
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Overlay Badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${event.status === 'upcoming' ? 'bg-[#D4FF00]/20 border-[#D4FF00] text-black dark:text-[#D4FF00]' : 'bg-neutral-500/20 border-neutral-500/50 text-neutral-700 dark:text-neutral-300'}`}>
                                        {(event.status || 'Upcoming').toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <span className="text-[#00F0FF] text-xs font-bold tracking-widest uppercase mb-2 block">{new Date(event.date).toLocaleDateString()}</span>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-[#00F0FF] transition-colors">{event.title}</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2">{event.description}</p>
                            </div>
                        </div>
                    </FloatingCard>
                ))}
            </div>
        </div>
    );
}
