"use client";

import { Bell, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import { QuickActions } from "@/components/home/quick-actions";
import { Event, BlogPost } from "@/lib/database";

interface AppHomeProps {
    nextEvent?: Event;
    latestPost?: BlogPost;
}

export function AppHome({ nextEvent, latestPost }: AppHomeProps) {
    return (
        <div className="min-h-screen pb-24 pt-12 px-4">
            {/* Header / Identity */}
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight">
                        AIML <span className="text-[var(--neon-lime)]">Club</span>
                    </h1>
                    <p className="text-xs text-neutral-500 font-mono">Oriental College of Technology</p>
                </div>
                <button className="p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white relative">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--electric-cyan)] rounded-full animate-pulse" />
                </button>
            </header>

            {/* Next Event Card */}
            {nextEvent && (
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Up Next</h2>
                        <Link href="/events" className="text-xs text-[var(--electric-cyan)] font-bold">See All</Link>
                    </div>
                    <Link href={`/events`} className="block group">
                        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--neon-lime)]/10 via-[var(--electric-cyan)]/5 to-purple-500/10 border border-white/10 p-6">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <Calendar className="w-24 h-24 rotate-[-15deg]" />
                            </div>

                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 rounded-full bg-[var(--neon-lime)] text-black text-[10px] font-black uppercase mb-4">
                                    Upcoming Event
                                </span>
                                <h3 className="text-2xl font-black text-white mb-2 leading-tight max-w-[80%]">
                                    {nextEvent.title}
                                </h3>
                                <div className="flex items-center gap-2 text-neutral-400 text-sm mb-4">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        {new Date(nextEvent.date).toLocaleDateString("en-IN", {
                                            weekday: "short",
                                            month: "short",
                                            day: "numeric"
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-[var(--electric-cyan)] font-bold text-sm group-hover:gap-3 transition-all">
                                    View Details <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Quick Actions */}
            <QuickActions />

            {/* Latest Update */}
            {latestPost && (
                <section className="mt-4">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h2 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Latest Update</h2>
                        <Link href="/blog" className="text-xs text-[var(--electric-cyan)] font-bold">View Feed</Link>
                    </div>
                    <Link href={`/blog/${latestPost.slug}`} className="block">
                        <div className="p-6 rounded-[2rem] bg-neutral-900 border border-neutral-800 active:scale-98 transition-transform">
                            <p className="text-neutral-300 text-sm leading-relaxed line-clamp-2 mb-2">
                                {latestPost.title}
                            </p>
                            <p className="text-neutral-500 text-xs line-clamp-2 mb-4">
                                {latestPost.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-neutral-600 font-mono">
                                <span>{latestPost.$createdAt ? new Date(latestPost.$createdAt).toLocaleDateString() : "Recent Update"}</span>
                                <span className="text-[var(--electric-cyan)]">Read More &rarr;</span>
                            </div>
                        </div>
                    </Link>
                </section>
            )}
        </div>
    );
}
